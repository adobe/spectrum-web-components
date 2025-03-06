/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    elementUpdated,
    expect,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import { isFirefox } from '@spectrum-web-components/shared';

export type DescribedNode = {
    name: string;
    description: string;
};

export const findDescribedNode = async (
    name: string,
    description: string,
    debug?: boolean
): Promise<void> => {
    await nextFrame();
    const snapshot = (await a11ySnapshot({})) as unknown as DescribedNode & {
        children: DescribedNode[];
    };

    const node = findAccessibilityNode(
        snapshot,
        (node) => node.name === name && node.description === description
    );

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `findDescribedNode(${name}, ${description}, ${debug}) returns null`,
            snapshot,
            'document',
            document.body
        );
    }

    expect(!!node, 'has node').to.be.true;
};

export type NamedNode = {
    name: string;
};

export type RoleNode = {
    description?: string;
    disabled?: boolean;
    name?: string;
    role: string;
};

export const findNodeByRole = async (
    role: string,
    name?: string,
    debug?: boolean
): Promise<RoleNode> => {
    const snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
        children: NamedNode[];
    };

    const node = findAccessibilityNode(snapshot, (node) => {
        const roleNode = node as RoleNode;
        return roleNode.role === role && (name ? roleNode.name === name : true);
    });

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `findNodeByRole(${role}, ${name}, ${debug}) returns null`,
            snapshot,
            'document',
            document.body
        );
    }
    return (node ? node : undefined) as RoleNode;
};

type MenuItemNode = {
    description: string;
    disabled: boolean;
    focused: boolean;
    name: string;
    role: string;
};

type MenuButtonNode = {
    description: string;
    name: string;
    role: string;
    hasPopup: string;
    expanded: boolean;
    focused: boolean;
    disabled: boolean;
};

type MenuNode = {
    children: [];
    description: string;
    name: string;
    orientation?: string;
    role: string;
};

export type MenuTestConfig = {
    // element with `role="menu"`
    menuElement: HTMLElement;
    // array of elements with `role="menuitem"`
    menuItemElements: HTMLElement[];
    // expected label for menu element
    menuLabel?: string;
};

export type MenuButtonTestConfig = {
    // element that contains button, menu, and menuitems
    el: HTMLElement;
    // element with `role="menu"`
    menuElement: HTMLElement;
    // expected label for menu element
    menuLabel?: string;
    // element with `role="button"`
    menuButtonElement: HTMLElement;
    // array of elements with `role="menuitem"`
    menuItemElements: HTMLElement[];
    // expected label for menu button
    menuButtonLabel?: string;
};

const getMenuNode = async (debug = false, menuLabel?: string) =>
    (await findNodeByRole('menu', menuLabel, debug)) as MenuNode;

const getMenuItems = (menuNode: MenuNode) =>
    [...(menuNode?.children || [])].filter((node) => {
        const roleNode = node as RoleNode;
        return roleNode.role === 'menuitem';
    }) as MenuItemNode[];

export const testMenuA11y = async (
    config: MenuTestConfig,
    debug = false
): Promise<void> => {
    if (debug) {
        // eslint-disable-next-line no-console
        console.log(`testMenuA11y`, config);
    }
    const { menuLabel } = config;
    const focusableMenuItemElements = [
        ...(config?.menuItemElements || []),
    ].filter((item) => !item.hasAttribute('disabled'));

    focusableMenuItemElements[0]?.focus();
    await elementUpdated(focusableMenuItemElements[0]);

    let menu = await getMenuNode(debug, menuLabel);
    const arrowKeys =
        menu?.orientation === 'horizontal'
            ? ['ArrowLeft', 'ArrowRight']
            : ['ArrowUp', 'ArrowDown'];
    expect(!!menu, 'menu exists in accessibility tree').to.be.true;

    let menuItems = getMenuItems(menu);
    expect(menuItems.length, 'all menuitems in accessibility tree').to.equal(
        [...(config?.menuItemElements || [])].length
    );

    let focusableItems = [...menuItems].filter((node) => !node.disabled);
    expect(
        focusableItems.length,
        'items that are not disabled are focusable'
    ).to.equal(focusableMenuItemElements.length);

    const focusedItem = [...focusableItems].find((node) => node.focused);
    expect(!!focusedItem, 'an item is focused').to.be.true;

    // test arrow keys as they cycle through every menu item
    await arrowKeys.forEach(async (key) => {
        focusableItems = [...menuItems].filter((node) => !node.disabled);
        const totalItems = focusableItems.length;
        let focusedIndex = [...focusableItems].findIndex(
            (node) => node.focused
        );
        if (debug) {
            // eslint-disable-next-line no-console
            console.log(
                `looping through ${totalItems} focusableItems, starting with ${focusedIndex}`,
                focusableItems
            );
        }
        for (let i = 0; i < totalItems; i++) {
            const direction = key === arrowKeys[0] ? -1 : 1;
            let newIndex = focusedIndex + direction;
            if (focusedIndex + direction < 0) {
                newIndex += totalItems;
            }
            if (focusedIndex + direction > totalItems) {
                newIndex -= totalItems;
            }
            await sendKeys({ press: key });
            if (debug) {
                // eslint-disable-next-line no-console
                console.log(
                    `pressing ${key} should move us ${direction} from ${focusedIndex} to ${newIndex}`
                );
            }
            menu = await getMenuNode(debug, menuLabel);
            if (debug) {
                // eslint-disable-next-line no-console
                console.log(`menu ${menuLabel}`, menu);
            }
            menuItems = getMenuItems(menu);
            focusableItems = [...menuItems].filter((node) => !node.disabled);
            focusedIndex = [...focusableItems].findIndex(
                (node) => node.focused
            );
            expect(
                focusableItems[focusedIndex],
                `focused menu item after ${key}`
            ).to.equal(focusableItems[newIndex]);
            expect(
                focusedItem?.name.length,
                `menu item should have a name: ${focusedItem?.name}`
            ).to.be.greaterThan(0);
        }
    });
};

export const testMenuButtonA11y = async (
    config: MenuButtonTestConfig,
    debug = false
): Promise<void> => {
    let menuButton = (await findNodeByRole(
        isFirefox() ? 'buttonmenu' : 'button',
        config.menuButtonLabel,
        debug
    )) as MenuButtonNode;

    expect(!!menuButton, 'has menu button').to.be.true;
    expect(
        menuButton.hasPopup === 'menu' || menuButton.hasPopup === 'true',
        `menu button has popup equals 'menu' or 'true'`
    );

    // ensures that menu is open
    const opened = async (prefix = 'after opening') => {
        const isOpened = oneEvent(config.el, 'sp-opened');
        await waitUntil(() => isOpened, `${prefix} menu is opened`, {
            timeout: 100,
        });
    };

    // ensures that menu is closed
    const closed = async (prefix = 'after closing') => {
        const isClosed = oneEvent(config.el, 'sp-closed');
        await waitUntil(() => isClosed, `${prefix} menu is closed`, {
            timeout: 100,
        });
    };

    // tests a closed menu
    const testMenuClosed = async (prefix = 'after menu is open') => {
        menuButton = (await findNodeByRole(
            isFirefox() ? 'buttonmenu' : 'button',
            config.menuButtonLabel,
            debug
        )) as MenuButtonNode;
        const menu = await getMenuNode(debug, config.menuLabel);
        expect(!!menu, 'has menu').to.be.false;
        expect(menuButton.expanded, `${prefix} menu is expanded`).to.be.false;
    };

    // tests an open menu
    const testMenuOpened = async (prefix = 'after menu is open') => {
        menuButton = (await findNodeByRole(
            isFirefox() ? 'buttonmenu' : 'button',
            config.menuButtonLabel,
            debug
        )) as MenuButtonNode;
        const menu = await getMenuNode(debug, config.menuLabel);
        if (debug) {
            // eslint-disable-next-line no-console
            console.log(menu);
        }
        expect(!!menu, 'has menu').to.be.true;
        expect(menuButton.expanded, `${prefix} menu is expanded`).to.be.true;
    };

    // start with an expanded menu
    if (!menuButton.expanded) {
        config.menuButtonElement.focus();
        await sendKeys({ press: 'Enter' });
        await opened;
    }

    await testMenuOpened();
    await testMenuA11y(config, debug);

    // test all the ways a menu can be toggled
    ['ArrowUp', 'ArrowDown', 'Enter', 'Space'].forEach(async (key) => {
        config.menuButtonElement.focus();

        if (menuButton.expanded) {
            await sendKeys({ press: 'Escape' });
            await closed(`after pressing 'Escape'`);
        }

        await testMenuClosed(`before pressing ${key}`);

        sendKeys({ press: key });
        await testMenuOpened(`after pressing ${key}`);

        const menu = await getMenuNode(debug, config.menuLabel);
        const menuItems = await getMenuItems(menu);
        const focusableItems = [...menuItems].filter((node) => !node.disabled);
        const focusedIndex = [...focusableItems].findIndex(
            (node) => node.focused
        );

        expect(
            focusedIndex,
            `using '${key}' sets focus on the correct item`
        ).to.equal(key === 'ArrowUp' ? focusableItems.length - 1 : 0);
        await sendKeys({ press: 'Enter' });
        await closed(`after pressing 'Enter'`);

        await testMenuClosed(`after pressing 'Enter'`);
    });
};
