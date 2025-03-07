/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { elementUpdated, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type { RoleNode } from '../../../test/testing-helpers-a11y.js';
import { findNodeByRole } from '../../../test/testing-helpers-a11y.js';

export type MenuItemA11yNode = {
    description: string;
    disabled: boolean;
    focused: boolean;
    name: string;
    role: string;
};

export type MenuA11yNode = {
    children: [];
    description: string;
    name: string;
    orientation?: string;
    role: string;
};

export type MenuA11yTestConfig = {
    // element with `role="menu"`
    menuElement: HTMLElement;
    // array of elements with `role="menuitem"`
    menuItemElements: HTMLElement[];
    // expected label for menu element
    menuLabel?: string;
};

export const getMenuA11yNode = async (
    debug = false,
    menuLabel?: string,
    role: 'menu' | 'listbox' = 'menu'
): Promise<MenuA11yNode> =>
    (await findNodeByRole(role, menuLabel, debug)) as MenuA11yNode;

export const getMenuItemA11yNodes = (
    MenuA11yNode?: MenuA11yNode
): MenuItemA11yNode[] =>
    !MenuA11yNode
        ? []
        : ([...(MenuA11yNode?.children || [])].filter((node) => {
              const roleNode = node as RoleNode;
              return roleNode.role === 'menuitem';
          }) as MenuItemA11yNode[]);

export const testMenuA11y = async (
    config: MenuA11yTestConfig,
    debug = false
): Promise<void> => {
    const { menuLabel, menuElement } = config;
    const menuRole = menuElement?.role === 'listbox' ? 'listbox' : 'menu';
    const focusableMenuItemElements = [
        ...(config?.menuItemElements || []),
    ].filter((item) => !item.hasAttribute('disabled'));

    menuElement?.focus();
    await elementUpdated(menuElement);

    let menu = await getMenuA11yNode(debug, menuLabel, menuRole);
    expect(!!menu, 'menu exists in accessibility tree').to.be.true;

    let menuItems = getMenuItemA11yNodes(menu);
    expect(menuItems.length, 'all menuitems in accessibility tree').to.equal(
        [...(config?.menuItemElements || [])].length
    );

    let focusableItems = [...menuItems].filter((node) => !node.disabled);
    expect(
        focusableItems.length,
        'items that are not disabled are focusable'
    ).to.equal(focusableMenuItemElements.length);

    const focusableTotal = focusableItems.length;

    let focusedItem = [...focusableItems].find((node) => node.focused);
    expect(!!focusedItem, 'an item is focused').to.be.true;

    const testArrowKey = async (key: string): Promise<void> => {
        const currentIndex = [...focusableItems].findIndex(
            (node) => node.focused
        );
        const direction = ['ArrowUp', 'ArrowLeft'].includes(key) ? -1 : 1;
        const newIndex =
            currentIndex + direction < 0
                ? focusableTotal - 1
                : currentIndex + direction >= focusableTotal
                  ? 0
                  : currentIndex + direction;

        await sendKeys({ press: key });
        await elementUpdated(menuElement);
        await nextFrame();

        menu = await getMenuA11yNode(debug, menuLabel, menuRole);
        expect(!!menu, `after ${key} menu exists in accessibility tree`).to.be
            .true;

        menuItems = getMenuItemA11yNodes(menu);
        expect(
            menuItems.length,
            `after ${key} menu items exist in accessibility tree`
        ).to.equal([...(config?.menuItemElements || [])].length);

        focusableItems = [...menuItems].filter((node) => !node.disabled);
        focusedItem = [...focusableItems].find((node) => node.focused);
        expect(!!focusedItem, `after ${key} an item is focused`).to.be.true;
        expect(focusedItem, `after ${key} correct item focused`).to.equal(
            focusableItems[newIndex]
        );
    };

    const testArrowKeys = async (key: string): Promise<void> => {
        for (let i = 0; i < focusableTotal; i++) await testArrowKey(key);
        menu = await getMenuA11yNode(debug, menuLabel, menuRole);
        expect(!!menu, `after ${key} menu exists in accessibility tree`).to.be
            .true;
    };
    if (menu?.orientation === 'horizontal') {
        await testArrowKeys('ArrowRight');
        await testArrowKeys('ArrowLeft');
    } else {
        await testArrowKeys('ArrowDown');
        await testArrowKeys('ArrowUp');
    }
};
