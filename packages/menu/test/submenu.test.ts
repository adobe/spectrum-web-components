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
        // Wait at least 100ms (POINTERENTER_TIMEOUT)
        await new Promise((r) => setTimeout(r, 110));
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
});
