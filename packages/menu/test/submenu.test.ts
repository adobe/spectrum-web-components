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

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    aTimeout,
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
        <sp-theme dir=${dir} scale="medium" color="dark">
            ${story}
            <style>
                sp-theme {
                    --spectrum-global-animation-duration-100: 50ms;
                    --spectrum-global-animation-duration-200: 50ms;
                    --spectrum-global-animation-duration-300: 50ms;
                    --spectrum-global-animation-duration-400: 50ms;
                    --spectrum-global-animation-duration-500: 50ms;
                    --spectrum-global-animation-duration-600: 50ms;
                    --spectrum-global-animation-duration-700: 50ms;
                    --spectrum-global-animation-duration-800: 50ms;
                    --spectrum-global-animation-duration-900: 50ms;
                    --spectrum-global-animation-duration-1000: 50ms;
                    --spectrum-global-animation-duration-2000: 50ms;
                    --spectrum-global-animation-duration-4000: 50ms;
                    --spectrum-animation-duration-0: 50ms;
                    --spectrum-animation-duration-100: 50ms;
                    --spectrum-animation-duration-200: 50ms;
                    --spectrum-animation-duration-300: 50ms;
                    --spectrum-animation-duration-400: 50ms;
                    --spectrum-animation-duration-500: 50ms;
                    --spectrum-animation-duration-600: 50ms;
                    --spectrum-animation-duration-700: 50ms;
                    --spectrum-animation-duration-800: 50ms;
                    --spectrum-animation-duration-900: 50ms;
                    --spectrum-animation-duration-1000: 50ms;
                    --spectrum-animation-duration-2000: 50ms;
                    --spectrum-animation-duration-4000: 50ms;
                    --spectrum-coachmark-animation-indicator-ring-duration: 50ms;
                    --swc-test-duration: 1ms;
                }
            </style>
        </sp-theme>
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

        expect(submenuChanged.withArgs('Two').calledOnce, 'submenu changed').to
            .be.true;
        expect(rootChanged.withArgs('Has submenu').calledOnce, 'root changed')
            .to.be.true;
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
        const rootItem = el.querySelector('.root') as MenuItem;
        const rootItemBoundingRect = rootItem.getBoundingClientRect();
        const item2 = document.querySelector('.submenu-item-2') as MenuItem;
        const itemC = document.querySelector('.sub-submenu-item-3') as MenuItem;
        expect(rootItem.open).to.be.false;

        let opened = oneEvent(rootItem, 'sp-opened');
        // Hover the root menu item to open a submenu
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

        const item2BoundingRect = item2.getBoundingClientRect();

        opened = oneEvent(item2, 'sp-opened');
        // Click the submenu item to open a submenu
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
        await opened;

        expect(item2.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        // click to select and close
        itemC.click();
        await closed;

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
        it(`selects - keyboard: ${testData.dir}`, async function () {
            const rootChanged = spy();
            const submenuChanged = spy();
            const el = await styledFixture<Menu>(
                html`
                    <sp-menu
                        id="base"
                        @change=${(event: Event & { target: Menu }) => {
                            rootChanged(event.target.value);
                        }}
                    >
                        <sp-menu-item class="root">
                            Has submenu
                            <sp-menu
                                id="sub"
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
            const submenu = el.querySelector('[slot="submenu"]') as Menu;
            const submenuItem = el.querySelector('.submenu-item-2') as MenuItem;
            expect(rootItem.open).to.be.false;
            el.focus();
            await elementUpdated(el);

            let opened = oneEvent(rootItem, 'sp-opened');
            sendKeys({
                press: testData.openKey,
            });
            await opened;

            expect(rootItem.open).to.be.true;
            expect(
                submenu === document.activeElement,
                `${document.activeElement?.id}`
            ).to.be.true;

            let closed = oneEvent(rootItem, 'sp-closed');
            sendKeys({
                press: testData.closeKey,
            });
            await closed;

            expect(rootItem.open).to.be.false;
            expect(
                el === document.activeElement,
                `${document.activeElement?.id}`
            ).to.be.true;

            opened = oneEvent(rootItem, 'sp-opened');
            sendKeys({
                press: testData.openKey,
            });
            await opened;

            expect(rootItem.open).to.be.true;

            await sendKeys({
                press: 'ArrowDown',
            });
            await elementUpdated(submenuItem);
            await nextFrame();
            await nextFrame();

            expect(submenu.getAttribute('aria-activedescendant')).to.equal(
                submenuItem.id
            );

            closed = oneEvent(rootItem, 'sp-closed');
            sendKeys({
                press: 'Enter',
            });
            await closed;

            expect(submenuChanged.calledWith('Two'), 'submenu changed').to.be
                .true;
            expect(rootChanged.called, 'root has changed').to.be.true;
            expect(
                rootChanged.calledWith('Has submenu'),
                'root specifically changed'
            ).to.be.true;
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
    it('continues to open when mousing between menu item and submenu', async () => {
        const clickSpy = spy();
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item
                                class="submenu-item-2"
                                @click=${() => clickSpy()}
                            >
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
        const subItem = el.querySelector('.submenu-item-2') as MenuItem;
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
        await nextFrame();
        await nextFrame();
        const subItemBoundingRect = subItem.getBoundingClientRect();
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        subItemBoundingRect.left +
                            subItemBoundingRect.width / 2,
                        subItemBoundingRect.top +
                            subItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await opened;
        expect(rootItem.open).to.be.true;
        // Ensure it _doesn't_ get closed.
        await aTimeout(150);

        expect(rootItem.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        subItemBoundingRect.left +
                            subItemBoundingRect.width / 2,
                        subItemBoundingRect.top +
                            subItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await closed;

        expect(clickSpy.callCount).to.equal(1);
    });
    it('stays open when mousing between menu item and submenu', async () => {
        const clickSpy = spy();
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item class="submenu-item-1">
                                One
                            </sp-menu-item>
                            <sp-menu-item
                                class="submenu-item-2"
                                @click=${() => clickSpy()}
                            >
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
        const subItem = el.querySelector('.submenu-item-2') as MenuItem;
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
        await opened;
        await nextFrame();
        await nextFrame();
        const subItemBoundingRect = subItem.getBoundingClientRect();
        expect(rootItem.open).to.be.true;

        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        subItemBoundingRect.left +
                            subItemBoundingRect.width / 2,
                        subItemBoundingRect.top +
                            subItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        expect(rootItem.open).to.be.true;
        // Ensure it _doesn't_ get closed.
        await aTimeout(150);

        expect(rootItem.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        subItemBoundingRect.left +
                            subItemBoundingRect.width / 2,
                        subItemBoundingRect.top +
                            subItemBoundingRect.height / 2,
                    ],
                },
            ],
        });
        await closed;

        expect(clickSpy.callCount).to.equal(1);
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
                <sp-menu-group role="none" id="group">
                    <span slot="header">New York</span>
                    <sp-menu-item>Bronx</sp-menu-item>
                    <sp-menu-item id="submenu-item-1">
                        Brooklyn
                        <sp-menu slot="submenu" id="submenu-1">
                            <sp-menu-item id="submenu-item-2">
                                Ft. Greene
                                <sp-menu slot="submenu" id="submenu-2">
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
                        <sp-menu slot="submenu" id="submenu-3">
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
        const rootMenu2 = el.querySelector('#submenu-item-3') as MenuItem;
        const childMenu2 = el.querySelector('#submenu-item-2') as MenuItem;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        expect(rootMenu1.open).to.be.true;

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        expect(childMenu2.open).to.be.true;

        const childMenu2Closed = oneEvent(childMenu2, 'sp-closed');
        const rootMenu1Closed = oneEvent(rootMenu1, 'sp-closed');
        const rootMenu2Opened = oneEvent(rootMenu2, 'sp-opened');
        rootMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await childMenu2Closed;
        await rootMenu1Closed;
        await rootMenu2Opened;
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

        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        const closed = Promise.all([
            oneEvent(childMenu2, 'sp-closed'),
            oneEvent(rootMenu1, 'sp-closed'),
            oneEvent(el, 'sp-closed'),
        ]);
        sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [600, 5],
                },
            ],
        });
        await closed;
    });

    it('closes decendent menus when Menu Item in ancestor without a submenu is pointerentered', async () => {
        const el = await styledFixture<ActionMenu>(html`
            <sp-action-menu>
                <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
                <sp-menu-group role="none">
                    <span slot="header">New York</span>
                    <sp-menu-item id="no-submenu">Bronx</sp-menu-item>
                    <sp-menu-item id="submenu-item-1">
                        Brooklyn
                        <sp-menu slot="submenu">
                            <sp-menu-item id="submenu-item-2">
                                Ft. Greene
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
                            <sp-menu-item>Union Square</sp-menu-item>
                            <sp-menu-item>Upper East Side</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu-group>
            </sp-action-menu>
        `);

        const rootMenu = el.querySelector('#submenu-item-1') as MenuItem;
        const noSubmenu = el.querySelector('#no-submenu') as MenuItem;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        opened = oneEvent(rootMenu, 'sp-opened');
        rootMenu.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;

        const closed = oneEvent(rootMenu, 'sp-closed');
        noSubmenu.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await closed;
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
        await nextFrame();

        const rootMenu1 = el.querySelector('#submenu-item-1') as MenuItem;
        const childMenu2 = el.querySelector('#submenu-item-2') as MenuItem;
        const ancestorItem = el.querySelector('#ancestor-item') as MenuItem;

        expect(el.open).to.be.false;
        let opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        expect(el.open).to.be.true;

        opened = oneEvent(rootMenu1, 'sp-opened');
        rootMenu1.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;

        opened = oneEvent(childMenu2, 'sp-opened');
        childMenu2.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;

        const closed = Promise.all([
            oneEvent(childMenu2, 'sp-closed'),
            oneEvent(rootMenu1, 'sp-closed'),
            oneEvent(el, 'sp-closed'),
        ]);
        const rect = ancestorItem.getBoundingClientRect();
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
            ],
        });
        await closed;
    });
    it('cleans up submenus that close before they are "open"', async () => {
        if ('showPopover' in document.createElement('div')) {
            return;
        }
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [-5, -5],
                },
            ],
        });
        const el = await styledFixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item class="root-1">
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
                    <sp-menu-item class="root-2">
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
        const rootItem1 = el.querySelector('.root-1') as MenuItem;
        const rootItem2 = el.querySelector('.root-2') as MenuItem;
        expect(rootItem1.open, 'initially closed 1').to.be.false;
        expect(rootItem2.open, 'initially closed 2').to.be.false;

        const rootItemBoundingRect1 = rootItem1.getBoundingClientRect();
        const rootItemBoundingRect2 = rootItem2.getBoundingClientRect();

        // Open the first submenu
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect1.left +
                            rootItemBoundingRect1.width / 2,
                        rootItemBoundingRect1.top +
                            rootItemBoundingRect1.height / 2,
                    ],
                },
            ],
        });
        // Open the second submenu, closing the first
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect2.left +
                            rootItemBoundingRect2.width / 2,
                        rootItemBoundingRect2.top +
                            rootItemBoundingRect2.height / 2,
                    ],
                },
            ],
        });
        // Open the first submenu, closing the second
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect1.left +
                            rootItemBoundingRect1.width / 2,
                        rootItemBoundingRect1.top +
                            rootItemBoundingRect1.height / 2,
                    ],
                },
            ],
        });
        // Open the second submenu, closing the first
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect2.left +
                            rootItemBoundingRect2.width / 2,
                        rootItemBoundingRect2.top +
                            rootItemBoundingRect2.height / 2,
                    ],
                },
            ],
        });
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();
        const closed = oneEvent(rootItem2, 'sp-closed');
        // Close the second submenu
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rootItemBoundingRect2.left +
                            rootItemBoundingRect2.width / 2,
                        rootItemBoundingRect2.top +
                            rootItemBoundingRect2.height * 2,
                    ],
                },
            ],
        });
        await closed;

        expect(rootItem1.open, 'finally closed 1').to.be.false;
        expect(rootItem2.open, 'finally closed 2').to.be.false;
    });
});
