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

import '../sp-menu.js';
import '../sp-menu-item.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { spy } from 'sinon';
import { Theme } from '@spectrum-web-components/theme';
import { TemplateResult } from '@spectrum-web-components/base';
import { sendKeys } from '@web/test-runner-commands';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';

async function styledFixture<T extends Element>(
    story: TemplateResult,
    dir: 'ltr' | 'rtl' | 'auto' = 'ltr'
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme dir=${dir} scale="medium" color="dark">${story}</sp-theme>
    `);
    document.documentElement.dir = dir;
    return test.children[0] as T;
}

describe('Submenu', () => {
    it('selects - pointer', async () => {
        const rootChanged = spy();
        const submenuChanged = spy();
        const el = await styledFixture<Menu>(
            html`
                <sp-menu
                    @change=${(event: Event & { target: Menu }) => {
                        rootChanged(event.target.value);
                    }}
                >
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu
                            slot="submenu"
                            @change=${(event: Event & { target: Menu }) => {
                                submenuChanged(event.target.value);
                            }}
                        >
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        const opened = oneEvent(rootItem, 'sp-opened');
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        expect(rootItem.open).to.be.true;

        const item2 = document.querySelector('.submenu-item-2') as MenuItem;
        const item2BoundingRect = item2.getBoundingClientRect();

        const closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        item2BoundingRect.left + item2BoundingRect.width / 2,
                        item2BoundingRect.top + item2BoundingRect.height / 2,
                    ],
                },
            ],
        });
        await closed;
        await nextFrame();

        expect(rootChanged.calledWith('Has submenu'), 'root changed').to.be
            .true;
        expect(submenuChanged.calledWith('Two'), 'submenu changed').to.be.true;
    });
    it('closes deep tree on selection', async () => {
        const rootChanged = spy();
        const submenuChanged = spy();
        const subSubmenuChanged = spy();
        const el = await styledFixture<Menu>(
            html`
                <sp-menu
                    @change=${(event: Event & { target: Menu }) => {
                        rootChanged(event.target.value);
                    }}
                >
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu
                            slot="submenu"
                            @change=${(event: Event & { target: Menu }) => {
                                submenuChanged(event.target.value);
                            }}
                        >
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                                <sp-menu
                                    slot="submenu"
                                    @change=${(
                                        event: Event & { target: Menu }
                                    ) => {
                                        subSubmenuChanged(event.target.value);
                                    }}
                                >
                                    <sp-menu-item class="sub-submenu-item-1">
                                        A
                                    </sp-menu-item>
                                    <sp-menu-item class="sub-submenu-item-2">
                                        B
                                    </sp-menu-item>
                                    <sp-menu-item class="sub-submenu-item-3">
                                        C
                                    </sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        const opened = oneEvent(rootItem, 'sp-opened');
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        expect(rootItem.open).to.be.true;

        const item2 = document.querySelector('.submenu-item-2') as MenuItem;
        const item2BoundingRect = item2.getBoundingClientRect();

        let closed = oneEvent(item2, 'sp-opened');
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        item2BoundingRect.left + item2BoundingRect.width / 2,
                        item2BoundingRect.top + item2BoundingRect.height / 2,
                    ],
                },
            ],
        });
        await closed;
        await nextFrame();

        expect(item2.open).to.be.true;

        const itemC = document.querySelector('.sub-submenu-item-3') as MenuItem;
        const itemCBoundingRect = itemC.getBoundingClientRect();

        closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        itemCBoundingRect.left + itemCBoundingRect.width / 2,
                        itemCBoundingRect.top + itemCBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await closed;
        await nextFrame();

        expect(rootChanged.calledWith('Has submenu'), 'root changed').to.be
            .true;
        expect(submenuChanged.calledWith('Two'), 'submenu changed').to.be.true;
        expect(subSubmenuChanged.calledWith('C'), 'sub submenu changed').to.be
            .true;
    });
    (
        [
            {
                dir: 'ltr',
                openKey: 'ArrowRight',
                closeKey: 'ArrowLeft',
            },
            {
                dir: 'rtl',
                openKey: 'ArrowLeft',
                closeKey: 'ArrowRight',
            },
        ] as {
            dir: 'ltr' | 'rtl' | 'auto';
            openKey: 'ArrowRight' | 'ArrowLeft';
            closeKey: 'ArrowRight' | 'ArrowLeft';
        }[]
    ).map((testData) => {
        it(`selects - keyboard: ${testData.dir}`, async () => {
            const rootChanged = spy();
            const submenuChanged = spy();
            const el = await styledFixture<Menu>(
                html`
                    <sp-menu
                        @change=${(event: Event & { target: Menu }) => {
                            rootChanged(event.target.value);
                        }}
                    >
                        <sp-menu-item class="root">
                            Has submenu
                            <sp-menu
                                slot="submenu"
                                @change=${(event: Event & { target: Menu }) => {
                                    submenuChanged(event.target.value);
                                }}
                            >
                                <sp-menu-item class="submenu-item-1">
                                    One
                                </sp-menu-item>
                                <sp-menu-item class="submenu-item-2">
                                    Two
                                </sp-menu-item>
                                <sp-menu-item class="submenu-item-3">
                                    Three
                                </sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                    </sp-menu>
                `,
                testData.dir
            );

            await elementUpdated(el);
            const rootItem = el.querySelector('.root') as MenuItem;
            expect(rootItem.open).to.be.false;
            el.focus();
            await elementUpdated(el);

            let opened = oneEvent(rootItem, 'sp-opened');
            sendKeys({
                press: testData.openKey,
            });
            await opened;

            expect(rootItem.open).to.be.true;

            let closed = oneEvent(rootItem, 'sp-closed');
            sendKeys({
                press: testData.closeKey,
            });
            await closed;

            expect(rootItem.open).to.be.false;

            opened = oneEvent(rootItem, 'sp-opened');
            sendKeys({
                press: testData.openKey,
            });
            await opened;

            expect(rootItem.open).to.be.true;

            await sendKeys({
                press: 'ArrowDown',
            });

            closed = oneEvent(rootItem, 'sp-closed');
            sendKeys({
                press: 'Enter',
            });
            await closed;

            expect(rootChanged.calledWith('Has submenu'), 'root changed').to.be
                .true;
            expect(submenuChanged.calledWith('Two'), 'submenu changed').to.be
                .true;
        });
    });
    it('closes on `pointerleave`', async () => {
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        const opened = oneEvent(rootItem, 'sp-opened');
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        expect(rootItem.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height * 2,
                    ],
                },
            ],
        });
        await closed;

        expect(rootItem.open).to.be.false;
    });
    it('stays open when mousing off menu item and back again', async () => {
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        const opened = oneEvent(rootItem, 'sp-opened');
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height * 2,
                    ],
                },
            ],
        });
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        expect(rootItem.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height * 2,
                    ],
                },
            ],
        });
        await closed;
    });
    it('stays open when mousing between menu item and submenu', async () => {
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        const opened = oneEvent(rootItem, 'sp-opened');
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height * 2,
                    ],
                },
            ],
        });
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width * 1.5,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;

        expect(rootItem.open).to.be.true;
    });
    it('not opens if disabled', async () => {
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item disabled class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-2">
                                Two
                            </sp-menu-item>
                            <sp-menu-item class="submenu-item-3">
                                Three
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        expect(rootItem.open).to.be.false;

        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect.left +
                            rootItemBoundingRect.width / 2,
                        rootItemBoundingRect.top +
                            rootItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        // wait 200ms for open
        await new Promise((r) => setTimeout(r, 200));

        expect(rootItem.open).to.be.false;
    });
    it('closes all decendent submenus when closing a ancestor menu', async () => {
        const el = await styledFixture<ActionMenu>(html`
            <sp-action-menu>
                <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
                <sp-menu-group role="none">
                    <span slot="header">New York</span>
                    <sp-menu-item>Bronx</sp-menu-item>
                    <sp-menu-item id="submenu-item-1">
                        Brooklyn
                        <sp-menu slot="submenu">
                            <sp-menu-item id="submenu-item-2">
                                Ft. Greene
                                <sp-menu slot="submenu">
                                    <sp-menu-item>S. Oxford St</sp-menu-item>
                                    <sp-menu-item>S. Portland Ave</sp-menu-item>
                                    <sp-menu-item>S. Elliot Pl</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item disabled>Park Slope</sp-menu-item>
                            <sp-menu-item>Williamsburg</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                    <sp-menu-item id="submenu-item-3">
                        Manhattan
                        <sp-menu slot="submenu">
                            <sp-menu-item disabled>SoHo</sp-menu-item>
                            <sp-menu-item>
                                Union Square
                                <sp-menu slot="submenu">
                                    <sp-menu-item>14th St</sp-menu-item>
                                    <sp-menu-item>Broadway</sp-menu-item>
                                    <sp-menu-item>Park Ave</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item>Upper East Side</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu-group>
            </sp-action-menu>
        `);

        const rootMenu1 = el.querySelector('#submenu-item-1') as Menu;
        const rootMenu2 = el.querySelector('#submenu-item-3') as Menu;
        const childMenu2 = el.querySelector('#submenu-item-2') as Menu;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        let activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(1);
        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(2);

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(3);

        const overlaysManaged = Promise.all([
            oneEvent(childMenu2, 'sp-closed'),
            oneEvent(rootMenu1, 'sp-closed'),
            oneEvent(rootMenu2, 'sp-opened'),
        ]);
        rootMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await overlaysManaged;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(2);
    });

    it('closes back to the first overlay without a `root` when clicking away', async () => {
        const el = await styledFixture<ActionMenu>(html`
            <sp-action-menu>
                <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
                <sp-menu-group role="none">
                    <span slot="header">New York</span>
                    <sp-menu-item>Bronx</sp-menu-item>
                    <sp-menu-item id="submenu-item-1">
                        Brooklyn
                        <sp-menu slot="submenu">
                            <sp-menu-item id="submenu-item-2">
                                Ft. Greene
                                <sp-menu slot="submenu">
                                    <sp-menu-item>S. Oxford St</sp-menu-item>
                                    <sp-menu-item>S. Portland Ave</sp-menu-item>
                                    <sp-menu-item>S. Elliot Pl</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item disabled>Park Slope</sp-menu-item>
                            <sp-menu-item>Williamsburg</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                    <sp-menu-item id="submenu-item-3">
                        Manhattan
                        <sp-menu slot="submenu">
                            <sp-menu-item disabled>SoHo</sp-menu-item>
                            <sp-menu-item>
                                Union Square
                                <sp-menu slot="submenu">
                                    <sp-menu-item>14th St</sp-menu-item>
                                    <sp-menu-item>Broadway</sp-menu-item>
                                    <sp-menu-item>Park Ave</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item>Upper East Side</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu-group>
            </sp-action-menu>
        `);

        const rootMenu1 = el.querySelector('#submenu-item-1') as Menu;
        const childMenu2 = el.querySelector('#submenu-item-2') as Menu;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        let activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(1);
        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(2);

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(3);

        const closed = Promise.all([
            oneEvent(childMenu2, 'sp-closed'),
            oneEvent(rootMenu1, 'sp-closed'),
            oneEvent(el, 'sp-closed'),
        ]);
        document.body.click();
        await closed;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(0);
    });

    it('closes decendent menus when Menu Item in ancestor is clicked', async () => {
        const el = await styledFixture<ActionMenu>(html`
            <sp-action-menu>
                <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
                <sp-menu-group role="none">
                    <span slot="header">New York</span>
                    <sp-menu-item>Bronx</sp-menu-item>
                    <sp-menu-item id="submenu-item-1">
                        Brooklyn
                        <sp-menu slot="submenu">
                            <sp-menu-item id="submenu-item-2">
                                Ft. Greene
                                <sp-menu slot="submenu">
                                    <sp-menu-item>S. Oxford St</sp-menu-item>
                                    <sp-menu-item>S. Portland Ave</sp-menu-item>
                                    <sp-menu-item>S. Elliot Pl</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item disabled>Park Slope</sp-menu-item>
                            <sp-menu-item id="ancestor-item">
                                Williamsburg
                            </sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                    <sp-menu-item id="submenu-item-3">
                        Manhattan
                        <sp-menu slot="submenu">
                            <sp-menu-item disabled>SoHo</sp-menu-item>
                            <sp-menu-item>
                                Union Square
                                <sp-menu slot="submenu">
                                    <sp-menu-item>14th St</sp-menu-item>
                                    <sp-menu-item>Broadway</sp-menu-item>
                                    <sp-menu-item>Park Ave</sp-menu-item>
                                </sp-menu>
                            </sp-menu-item>
                            <sp-menu-item>Upper East Side</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu-group>
            </sp-action-menu>
        `);

        const rootMenu1 = el.querySelector('#submenu-item-1') as MenuItem;
        const childMenu2 = el.querySelector('#submenu-item-2') as MenuItem;
        const ancestorItem = el.querySelector('#ancestor-item') as MenuItem;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        let activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(1);
        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(2);

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(3);

        const closed = Promise.all([
            oneEvent(childMenu2, 'sp-closed'),
            oneEvent(rootMenu1, 'sp-closed'),
            oneEvent(el, 'sp-closed'),
        ]);
        ancestorItem.click();
        await closed;
        activeOverlays = document.querySelectorAll('active-overlay');
        expect(activeOverlays.length).to.equal(0);
    });
});
