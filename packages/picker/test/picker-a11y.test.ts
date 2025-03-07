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

import { expect, nextFrame, oneEvent, waitUntil } from '@open-wc/testing';
import { findNodeByRole } from '../../../test/testing-helpers-a11y.js';
import {
    getMenuA11yNode,
    testMenuA11y,
} from '../../menu/test/menu-a11y.test.js';
import { isFirefox, isWebKit } from '@spectrum-web-components/shared';

type MenuButtonA11yNode = {
    description: string;
    name: string;
    role: string;
    hasPopup: string;
    expanded: boolean;
    focused: boolean;
    disabled: boolean;
};

export type MenuButtonA11yTestConfig = {
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

export const testMenuButtonA11y = async (
    config: MenuButtonA11yTestConfig,
    debug = false
): Promise<void> => {
    // returns menu menu button accessibility node from a mew snapshot
    const getMenuButtonNode = async (): Promise<MenuButtonA11yNode> => {
        return (await findNodeByRole(
            isFirefox() ? 'buttonmenu' : 'button',
            config.menuButtonLabel,
            debug
        )) as MenuButtonA11yNode;
    };

    await nextFrame();
    let menuButton = await getMenuButtonNode();

    expect(!!menuButton, 'has menu button').to.be.true;
    expect(
        menuButton.hasPopup === 'menu' || menuButton.hasPopup === 'true',
        `menu button has popup equals 'menu' or 'true'`
    );

    // tests a closed menu
    const testMenuClosed = async (
        prefix = 'after menu is fully closed, '
    ): Promise<void> => {
        menuButton = await getMenuButtonNode();
        const menu = await getMenuA11yNode(debug, config.menuLabel);
        expect(
            !menu,
            `${prefix}does NOT have menu node${config.menuLabel ? `named "${config.menuLabel}"` : ''}`
        ).to.be.true;
        expect(
            !menuButton.expanded,
            `${prefix}menu button node is NOT expanded: ${JSON.stringify(menuButton)}`
        ).to.be.true;
    };

    // tests an open menu
    const testMenuOpened = async (
        prefix = 'after menu is fully opened, '
    ): Promise<void> => {
        menuButton = await getMenuButtonNode();
        const menu = await getMenuA11yNode(debug, config.menuLabel);
        expect(
            !!menu,
            `${prefix}HAS menu node${config.menuLabel ? `named "${config.menuLabel}"` : ''}`
        ).to.be.true;
        expect(
            !!menuButton.expanded || isWebKit(),
            `${prefix}menu button node IS expanded: ${JSON.stringify(menuButton)}`
        ).to.be.true;
    };

    config.menuButtonElement.focus();

    // start with an expanded menu
    if (!menuButton.expanded) {
        if (isWebKit()) {
            const menu = await getMenuA11yNode(debug, config.menuLabel);
            if (!!menu) return;
        }
        await testMenuClosed();
        const isOpened = oneEvent(config.el, 'sp-opened');
        await sendKeys({ press: 'Enter' });
        await isOpened;
    }

    await testMenuOpened();
    await waitUntil(
        async () => await testMenuA11y(config, debug),
        'testing menu accessibility',
        { timeout: 20000 }
    );
};
