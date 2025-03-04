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

import { expect, nextFrame, waitUntil } from '@open-wc/testing';
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
            snapshot
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
    searchNode?: NamedNode & {
        children: NamedNode[];
    },
    debug?: boolean
): Promise<RoleNode> => {
    const snapshot =
        searchNode ||
        ((await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        });

    const node = findAccessibilityNode(snapshot, (node) => {
        const roleNode = node as RoleNode;
        return roleNode.role === role && (name ? roleNode.name === name : true);
    });

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `findNodeByRole(${role}, ${name}, ${debug}) returns null`,
            searchNode
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
    // provide snapshot details in console
    debug?: boolean;
    // element that contains button, menu, and menuitems
    el: HTMLElement;
    // element with `role="menu"`
    menuElement: HTMLElement;
    // element with `role="button"`
    menuButtonElement: HTMLElement;
    // array of elements with `role="menuitem"`
    menuItemElements: HTMLElement[];
    // expected label for menu button
    menuButtonLabel?: string;
    // function that will indicate when menu is open
    openCondition?: () => Promise<unknown>;
    // function that will indicate when menu is closed
    closedCondition?: () => Promise<unknown>;
};

export const testMenu = async (config: MenuTestConfig): Promise<void> => {
    let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
        children: NamedNode[];
    };
    let menuButton = (await findNodeByRole(
        isFirefox() ? 'buttonmenu' : 'button',
        config.menuButtonLabel,
        snapshot,
        config.debug
    )) as MenuButtonNode;
    expect(!!menuButton, 'has menu button').to.be.true;
    await expect(
        menuButton.hasPopup === 'menu' || menuButton.hasPopup === 'true',
        `menu button has popup equals 'menu' or 'true'`
    );
    let menu: MenuNode;
    let menuItems: MenuItemNode[];
    let focusableMenuItems: MenuItemNode[];
    let focusedIndex: number;

    const updateSnapshot = async (): Promise<void> => {
        snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };

        menuButton = (await findNodeByRole(
            isFirefox() ? 'buttonmenu' : 'button',
            config.menuButtonLabel,
            snapshot,
            config.debug
        )) as MenuButtonNode;

        menu = (await findNodeByRole(
            'menu',
            undefined,
            snapshot,
            config.debug
        )) as MenuNode;

        if (config.debug && (!menuButton || (menuButton.expanded && !menu))) {
            // eslint-disable-next-line no-console
            console.log('testMenu.updateSnapshot error', snapshot);
        }

        menuItems = [...(menu?.children || [])].filter((node) => {
            const roleNode = node as RoleNode;
            return roleNode.role === 'menuitem';
        }) as MenuItemNode[];
        focusableMenuItems = menuItems.filter((node) => !node.disabled);
        focusedIndex = focusableMenuItems.findIndex((node) => node.focused);
    };

    const snapshotAfter = async (
        message = 'ready for snapshot',
        predicate?: () => Promise<unknown>
    ): Promise<void> => {
        await waitUntil(
            async () => {
                if (predicate) {
                    await predicate;
                }
            },
            message,
            { timeout: 100 }
        );
        await updateSnapshot();
    };

    // test expanded menu
    const testExpanded = async (): Promise<void> => {
        await updateSnapshot();
        expect(menu, 'has menu').to.not.be.null;
        const arrowKeys =
            menu?.orientation === 'horizontal'
                ? ['ArrowLeft', 'ArrowRight']
                : ['ArrowUp', 'ArrowDown'];

        expect(menuItems.length, `all menu items exist`).to.equal(
            config.menuItemElements.length
        );

        expect(
            focusableMenuItems.length,
            `all focusable menu items are focusable`
        ).to.equal(
            config.menuItemElements.filter(
                (item) => !item.hasAttribute('disabled')
            ).length
        );

        const nextFocusableIndex = (index = 0, prev = false) => {
            const dir = prev ? -1 : 1;
            let newIndex = index + dir;
            if (index + dir < 0) {
                newIndex += focusableMenuItems.length;
            }
            if (index + dir > focusableMenuItems.length) {
                newIndex -= focusableMenuItems.length;
            }
            return newIndex;
        };

        if (!focusedIndex) {
            config.menuItemElements
                .find((el) => !el.hasAttribute('disabled'))
                ?.focus();
            await snapshotAfter('menu item focused');
            focusedIndex = focusableMenuItems.findIndex((node) => node.focused);
        }

        expect(focusableMenuItems[focusedIndex], 'focus is on a menu item').to
            .not.be.null;

        // test arrow keys as they cycle through every menu item
        await arrowKeys.forEach(async (key) => {
            let nextItem: number;
            for (let i = 0; i < focusableMenuItems.length; i++) {
                nextItem = nextFocusableIndex(
                    focusedIndex,
                    key === arrowKeys[0]
                );
                await sendKeys({ press: key });
                await updateSnapshot();
                focusedIndex = focusableMenuItems.findIndex(
                    (node) => node.focused
                );
                expect(
                    focusableMenuItems[focusedIndex],
                    `after ${key}`
                ).to.equal(focusableMenuItems[nextItem]);
                expect(
                    focusableMenuItems[focusedIndex].name.length,
                    `menu item should have a name: ${focusableMenuItems[focusedIndex].name}`
                ).to.be.greaterThan(0);
            }
        });

        expect(focusableMenuItems[focusedIndex], 'focus is on a menu item').to
            .not.be.null;
        const focusedEl = config.menuItemElements.find((el) =>
            el.matches(':focus, :focused-within')
        );
        focusedEl?.click();
        await snapshotAfter('menu item focused', config.closedCondition);
        expect(
            menuButton?.expanded,
            'clicking menu button when menu is open closes menu'
        ).to.be.false;

        expect(menuButton.focused, 'focus is on menu button').to.be.true;
    };

    // test a collapsed menu
    const testCollapsed = async (): Promise<void> => {
        await updateSnapshot();
        await ['ArrowUp', 'ArrowDown'].forEach(async (key) => {
            config.menuButtonElement.focus();
            await sendKeys({ press: key });
            await snapshotAfter(
                `after pressing '${key}'`,
                config.openCondition
            );
            const focusedItem =
                key === 'ArrowUp'
                    ? focusableMenuItems[focusableMenuItems.length - 1]
                    : focusableMenuItems[0];
            expect(menuButton.expanded, `opens with '${key}'`).to.true;
            expect(
                focusedItem.focused,
                `using '${key}' sets focus on ${focusedItem}`
            ).to.be.true;
            await sendKeys({ press: 'Enter' });
            await snapshotAfter(
                `after pressing 'Enter'`,
                config.closedCondition
            );
            expect(menuButton.expanded, `closes on 'Enter'`).to.be.false;
            expect(menuButton.focused, 'focus is on the button').to.be.true;
        });
        await ['Enter', 'Space'].forEach(async (key) => {
            config.menuButtonElement.focus();
            await sendKeys({ press: key });
            await snapshotAfter(
                `after pressing '${key}'`,
                config.openCondition
            );
            expect(menuButton.expanded, `toggles with '${key}'`).to.be.true;
            await snapshotAfter(
                `after pressing 'Escape'`,
                config.closedCondition
            );
            expect(menuButton.expanded, `closes on 'Escape'`).to.be.false;
            expect(menuButton.focused, 'focus is on the button').to.be.true;
        });
    };

    // find out if menu is expanded
    let expanded = menuButton.expanded;

    const ensureMenuIsToggled = async (): Promise<void> => {
        // make sure menu is opposite of what was already tested
        if (menuButton.expanded === expanded) {
            config.menuButtonElement.click();
            await snapshotAfter(
                `after click`,
                expanded ? config.closedCondition : config.openCondition
            );
            updateSnapshot();
            expect(
                menuButton.expanded,
                `set expanded to ${menuButton.expanded} to run next set of tests`
            ).to.not.be.equal(expanded);
        }
    };

    // test accordingly
    expanded ? await testExpanded() : await testCollapsed();

    // get ready to test menu the opposite way we found it
    ensureMenuIsToggled();

    expanded = menuButton.expanded;
    expanded ? await testExpanded() : await testCollapsed();

    // leave element the way we found it
    ensureMenuIsToggled();
};
