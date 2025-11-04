/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    aTimeout,
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { slottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-directive.js';
import { sendKeys } from '@web/test-runner-commands';
import { TemplateResult } from 'lit-html';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    fixture,
    mouseClickOn,
    mouseMoveAway,
    mouseMoveOver,
    sendTabKey,
} from '../../../test/testing-helpers.js';

type SelectsWithKeyboardTest = {
    dir: 'ltr' | 'rtl' | 'auto';
    openKey: 'ArrowRight' | 'ArrowLeft';
    closeKey: 'ArrowRight' | 'ArrowLeft';
};

const selectsWithKeyboardData = [
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
] as SelectsWithKeyboardTest[];

describe('Submenu', () => {
    function selectWithPointer(): void {
        it('with pointer', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            await opened;

            expect(this.rootItem.open).to.be.true;

            const item2 = document.querySelector('.submenu-item-2') as MenuItem;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseClickOn(item2);
            await closed;

            expect(
                this.submenuChanged.withArgs('Two').calledOnce,
                `submenu changed ${this.submenuChanged.callCount} times`
            ).to.be.true;
            expect(
                this.rootChanged.withArgs('Has submenu').calledOnce,
                'root changed'
            ).to.be.true;
        });
    }
    function selectsWithBoth(testData: SelectsWithKeyboardTest): void {
        it(`with pointer and keyboard: ${testData.dir}`, async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            await opened;
            const item1 = document.querySelector('.submenu-item-1') as MenuItem;
            const item2 = document.querySelector('.submenu-item-2') as MenuItem;

            expect(this.rootItem.open, `submenu should open`).to.be.true;
            expect(document.activeElement).not.to.equal(item1);

            const prev = this.rootItem.previousElementSibling as MenuItem;

            // arrow up should move focus away from the submenu
            // but submenu stays open while pointer is over it
            await sendKeys({ press: 'ArrowUp' });
            expect(document.activeElement).to.equal(prev);
            expect(prev.focused, `focus is on previous item`).to.be.true;
            expect(this.rootItem.open, `submenu should stay open`).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseClickOn(item2);
            await closed;

            expect(
                this.submenuChanged.withArgs('Two').calledOnce,
                `submenu changed ${this.submenuChanged.callCount} times`
            ).to.be.true;
            expect(
                this.rootChanged.withArgs('Has submenu').calledOnce,
                `root changed ${this.submenuChanged.callCount} times`
            ).to.be.true;
        });
    }
    function selectsWithKeyboard(testData: SelectsWithKeyboardTest): void {
        it(`with keyboard: ${testData.dir}`, async function () {
            this.el.parentElement.dir = testData.dir;

            await elementUpdated(this.el);
            expect(
                this.rootItem.open,
                `rootItem open before ${testData.openKey}`
            ).to.be.false;
            const input = document.createElement('input');
            this.el.insertAdjacentElement('beforebegin', input);
            await elementUpdated(input);
            await sendTabKey();
            await elementUpdated(input);

            expect(document.activeElement).to.equal(input);
            await sendTabKey();
            await elementUpdated(this.el);
            await waitUntil(
                () => document.activeElement === this.el.children[0],
                'focuses first menu item after tab'
            );

            expect(document.activeElement).to.equal(this.el.children[0]);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(this.rootItem);

            expect(
                this.rootItem.focused,
                `rootItem focused before ${testData.openKey}`
            ).to.be.true;

            let opened = oneEvent(this.rootItem, 'sp-opened');
            await sendKeys({ press: testData.openKey });
            await opened;

            const rootItem = this.el.querySelector('.root') as MenuItem;
            let submenu = this.el.querySelector('[slot="submenu"]') as Menu;
            let submenuItem = this.el.querySelector(
                '.submenu-item-1'
            ) as MenuItem;

            expect(
                this.rootItem.open,
                `rootItem open after ${testData.openKey}`
            ).to.be.true;

            //opening a menu via keyboard should set focus on first item
            expect(document.activeElement).to.equal(submenuItem);

            let closed = oneEvent(this.rootItem, 'sp-closed');
            await sendKeys({ press: testData.closeKey });
            await closed;

            expect(
                this.rootItem.open,
                `rootItem open after ${testData.closeKey}`
            ).to.be.false;

            //closing a submenu via keyboard should set focus on its parent menuitem
            expect(document.activeElement).to.equal(rootItem);

            opened = oneEvent(this.rootItem, 'sp-opened');
            await sendKeys({ press: testData.openKey });
            await opened;
            await elementUpdated(this.rootItem);

            submenu = this.el.querySelector('[slot="submenu"]') as Menu;
            await elementUpdated(submenu);

            expect(this.rootItem.open, 'rootItem.open').to.be.true;
            expect(submenuItem.focused, 'submenuItem.focused').to.be.true;
            expect(document.activeElement).to.equal(submenuItem);

            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(submenu);
            await elementUpdated(submenuItem);

            submenuItem = this.el.querySelector('.submenu-item-2') as MenuItem;
            expect(submenuItem.focused, `submenu focused`).to.be.true;
            expect(document.activeElement === submenuItem, `submenu active`).to
                .be.true;

            closed = oneEvent(this.rootItem, 'sp-closed');
            await sendKeys({ press: 'Enter' });
            await closed;

            expect(this.submenuChanged.calledWith('Two'), 'submenu changed').to
                .be.true;
            expect(this.rootChanged.called, 'root has changed').to.be.true;
            expect(
                this.rootChanged.calledWith('Has submenu'),
                'root specifically changed'
            ).to.be.true;
        });
    }
    function returnsFocusToRootWhenClosingSubmenu(): void {
        it('returns visible focus when submenu closed', async function () {
            const input = document.createElement('input');
            this.el.insertAdjacentElement('beforebegin', input);

            await sendTabKey();
            await elementUpdated(input);
            expect(document.activeElement, 'focuses input').to.equal(input);
            await sendTabKey();
            await waitUntil(
                () => document.activeElement === this.el.children[0],
                'focuses first menu item after tab'
            );
            expect(document.activeElement, 'focuses first menu item').to.equal(
                this.el.children[0]
            );

            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(this.el);
            await nextFrame();
            await nextFrame();
            expect(this.rootItem.active, 'menu with submenu is not active').to
                .be.false;
            expect(
                this.rootItem.focused,
                `focused: ${document.activeElement?.localName}`
            ).to.be.true;
            expect(this.rootItem.open, 'menu with submenu is not open').to.be
                .false;
            expect(
                document.activeElement,
                'focuses menu with submenu'
            ).to.equal(this.rootItem);

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await sendKeys({ press: 'ArrowRight' });
            await opened;

            expect(this.rootItem.active).to.be.true;
            expect(this.rootItem.focused).to.be.false;
            expect(this.rootItem.open).to.be.true;

            await sendKeys({ press: 'ArrowDown' });

            expect(this.rootItem.active).to.be.true;
            expect(this.rootItem.focused).to.be.false;
            expect(this.rootItem.open).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await sendKeys({ press: 'ArrowLeft' });
            await closed;

            expect(this.rootItem.active).to.be.false;
            expect(this.rootItem.focused).to.be.true;
            expect(this.rootItem.open).to.be.false;
        });
    }
    function closesOnPointerLeave(): void {
        it('closes on `pointerleave`', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            await opened;

            expect(this.rootItem.open).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseMoveAway(this.rootItem);
            await closed;

            expect(this.rootItem.open).to.be.false;
        });
    }
    function persistsThroughMouseLeaveAndReturn(): void {
        it('stays open when mousing off menu item and back again', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            await mouseMoveAway(this.rootItem);
            await mouseMoveOver(this.rootItem);
            await opened;
            expect(this.rootItem.open).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseMoveAway(this.rootItem);

            await closed;
        });
    }
    function doesNotOpenWhenDisabled(): void {
        it('does not open when disabled', async function () {
            this.rootItem.disabled = true;
            await elementUpdated(this.rootItem);

            expect(this.rootItem.open).to.be.false;

            await mouseMoveOver(this.rootItem);

            // wait 200ms for open
            await new Promise((r) => setTimeout(r, 200));

            expect(this.rootItem.open).to.be.false;
        });
    }
    function persistsWhenMovingBetweenItemAndSubmenu(): void {
        it('stays open when mousing between menu item and submenu', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            await opened;
            await nextFrame();
            await nextFrame();

            const subItem = this.el.querySelector(
                '.submenu-item-2'
            ) as MenuItem;
            const clickSpy = spy();
            subItem.addEventListener('click', () => clickSpy());
            expect(this.rootItem.open).to.be.true;

            await mouseMoveOver(subItem);
            expect(this.rootItem.open).to.be.true;
            // Ensure it _doesn't_ get closed.
            await aTimeout(150);

            expect(this.rootItem.open).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseClickOn(subItem);
            await closed;

            expect(clickSpy.callCount).to.equal(1);
        });
    }
    function continuesToOpenWhenMovingBetweenItemAndSubmenu(): void {
        it('continues to open when mousing between menu item and submenu', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            await mouseMoveOver(this.rootItem);
            // Wait for the overlay system to position the submenu before measuring it's position and moving to it.
            await aTimeout(200); // Replace 8 nextFrame() calls with single timeout for CI stability
            const subItem = this.el.querySelector(
                '.submenu-item-2'
            ) as MenuItem;
            const clickSpy = spy();
            subItem.addEventListener('click', () => clickSpy());
            await mouseMoveOver(subItem);
            await opened;
            expect(this.rootItem.open).to.be.true;
            // Ensure it _doesn't_ get closed.
            await aTimeout(150);

            expect(this.rootItem.open).to.be.true;

            const closed = oneEvent(this.rootItem, 'sp-closed');
            await mouseClickOn(subItem);
            await closed;

            expect(clickSpy.callCount).to.equal(1);
        });
    }
    const renderSubmenu = (): TemplateResult => html`
        <sp-menu-item class="submenu-item-1">One</sp-menu-item>
        <sp-menu-item class="submenu-item-2">Two</sp-menu-item>
        <sp-menu-item class="submenu-item-3">Three</sp-menu-item>
    `;
    describe('static DOM', () => {
        beforeEach(async function () {
            this.rootChanged = spy();
            this.submenuChanged = spy();
            this.el = await fixture<Menu>(html`
                <sp-menu
                    @change=${(event: Event & { target: Menu }) => {
                        this.rootChanged(event.target.value);
                    }}
                >
                    <sp-menu-item>No submenu</sp-menu-item>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu
                            slot="submenu"
                            @change=${(event: Event & { target: Menu }) => {
                                this.submenuChanged(event.target.value);
                            }}
                        >
                            ${renderSubmenu()}
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `);
            await elementUpdated(this.el);
            this.rootItem = this.el.querySelector('.root') as MenuItem;
            await elementUpdated(this.rootItem);
        });
        describe('selects', () => {
            selectWithPointer();
            selectsWithKeyboardData.map((testData) => {
                selectsWithKeyboard(testData);
                selectsWithBoth(testData);
            });
        });
        closesOnPointerLeave();
        returnsFocusToRootWhenClosingSubmenu();
        persistsThroughMouseLeaveAndReturn();
        doesNotOpenWhenDisabled();
        persistsWhenMovingBetweenItemAndSubmenu();
        continuesToOpenWhenMovingBetweenItemAndSubmenu();
    });
    describe('directive', () => {
        beforeEach(async function () {
            this.rootChanged = spy();
            this.submenuChanged = spy();
            this.el = await fixture<Menu>(html`
                <sp-menu
                    @change=${(event: Event & { target: Menu }) => {
                        this.rootChanged(event.target.value);
                    }}
                >
                    <sp-menu-item>No submenu</sp-menu-item>
                    <sp-menu-item class="root">
                        Has submenu
                        <sp-menu
                            slot="submenu"
                            @change=${(event: Event & { target: Menu }) => {
                                this.submenuChanged(event.target.value);
                            }}
                            ${slottableRequest(renderSubmenu)}
                        ></sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `);
            await elementUpdated(this.el);
            this.rootItem = this.el.querySelector('.root') as MenuItem;
            await elementUpdated(this.rootItem);
        });
        describe('selects', () => {
            selectWithPointer();
            selectsWithKeyboardData.map((testData) => {
                selectsWithKeyboard(testData);
                selectsWithBoth(testData);
            });
        });
        closesOnPointerLeave();
        returnsFocusToRootWhenClosingSubmenu();
        persistsThroughMouseLeaveAndReturn();
        doesNotOpenWhenDisabled();
        persistsWhenMovingBetweenItemAndSubmenu();
        continuesToOpenWhenMovingBetweenItemAndSubmenu();
    });
    it('closes deep tree on selection', async function () {
        const rootChanged = spy();
        const submenuChanged = spy();
        const subSubmenuChanged = spy();
        const el = await fixture<Menu>(html`
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
                        <sp-menu-item class="submenu-item-1">One</sp-menu-item>
                        <sp-menu-item class="submenu-item-2">
                            Two
                            <sp-menu
                                slot="submenu"
                                @change=${(event: Event & { target: Menu }) => {
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
        `);
        const rootItem = el.querySelector('.root') as MenuItem;
        const item2 = document.querySelector('.submenu-item-2') as MenuItem;
        const itemC = document.querySelector('.sub-submenu-item-3') as MenuItem;
        expect(rootItem.open).to.be.false;

        let opened = oneEvent(rootItem, 'sp-opened');
        // Hover the root menu item to open a submenu
        await mouseMoveOver(rootItem);
        await opened;

        expect(rootItem.open).to.be.true;

        opened = oneEvent(item2, 'sp-opened');
        // Move to the submenu item to open a submenu
        await mouseMoveOver(item2);
        await opened;

        expect(item2.open).to.be.true;

        const closed = oneEvent(rootItem, 'sp-closed');
        // click to select and close
        await mouseClickOn(itemC);
        await closed;

        expect(rootChanged.calledWith('Has submenu'), 'root changed').to.be
            .true;
        expect(submenuChanged.calledWith('Two'), 'submenu changed').to.be.true;
        expect(subSubmenuChanged.calledWith('C'), 'sub submenu changed').to.be
            .true;
    });
    it('closes all descendant submenus when closing a ancestor menu', async () => {
        const el = await fixture<ActionMenu>(html`
            <sp-action-menu label="Closing ancestors will close submenus">
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
        await mouseMoveOver(rootMenu1);
        await opened;
        expect(rootMenu1.open).to.be.true;

        opened = oneEvent(childMenu2, 'sp-opened');
        await mouseMoveOver(childMenu2);
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
    describe('deep tree', () => {
        beforeEach(async function () {
            this.el = await fixture<ActionMenu>(html`
                <sp-action-menu id="action-menu" label="Deep submenu tree">
                    <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
                    <sp-menu-group role="none">
                        <span slot="header">New York</span>
                        <sp-menu-item id="no-submenu">Bronx</sp-menu-item>
                        <sp-menu-item id="submenu-item-1">
                            Brooklyn
                            <sp-menu slot="submenu">
                                <sp-menu-item id="submenu-item-2">
                                    Ft. Greene
                                    <sp-menu slot="submenu">
                                        <sp-menu-item>
                                            S. Oxford St
                                        </sp-menu-item>
                                        <sp-menu-item>
                                            S. Portland Ave
                                        </sp-menu-item>
                                        <sp-menu-item>
                                            S. Elliot Pl
                                        </sp-menu-item>
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
            await nextFrame();
        });
        it('closes back to the first overlay without a `root` when clicking away', async function () {
            const rootMenu1 = this.el.querySelector('#submenu-item-1') as Menu;
            const childMenu2 = this.el.querySelector('#submenu-item-2') as Menu;
            document.body.style.setProperty('padding', '50px');

            expect(this.el.open).to.be.false;
            let opened = oneEvent(this.el, 'sp-opened');
            this.el.click();
            await opened;
            expect(this.el.open).to.be.true;

            opened = oneEvent(rootMenu1, 'sp-opened');
            await mouseMoveOver(rootMenu1);
            await opened;

            opened = oneEvent(childMenu2, 'sp-opened');
            await mouseMoveOver(childMenu2);
            await opened;
            const closed = Promise.all([
                oneEvent(childMenu2, 'sp-closed'),
                oneEvent(rootMenu1, 'sp-closed'),
            ]);
            await mouseMoveAway(this.el);
            await closed;
        });
        it('closes descendant menus when Menu Item in ancestor without a submenu is pointerentered', async function () {
            const rootMenu = this.el.querySelector(
                '#submenu-item-1'
            ) as MenuItem;
            const noSubmenu = this.el.querySelector('#no-submenu') as MenuItem;

            expect(this.el.open).to.be.false;
            let opened = oneEvent(this.el, 'sp-opened');
            this.el.click();
            await opened;
            expect(this.el.open).to.be.true;

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
        it('closes descendant menus when Menu Item in ancestor is clicked', async function () {
            const rootMenu1 = this.el.querySelector(
                '#submenu-item-1'
            ) as MenuItem;
            const childMenu2 = this.el.querySelector(
                '#submenu-item-2'
            ) as MenuItem;
            const ancestorItem = this.el.querySelector(
                '#ancestor-item'
            ) as MenuItem;

            expect(this.el.open).to.be.false;
            let opened = oneEvent(this.el, 'sp-opened');
            this.el.click();
            await opened;
            expect(this.el.open).to.be.true;

            opened = oneEvent(rootMenu1, 'sp-opened');
            await mouseMoveOver(rootMenu1);
            await opened;

            opened = oneEvent(childMenu2, 'sp-opened');
            await mouseMoveOver(childMenu2);
            await opened;

            const closed = Promise.all([
                oneEvent(childMenu2, 'sp-closed'),
                oneEvent(rootMenu1, 'sp-closed'),
            ]);
            await mouseClickOn(ancestorItem);
            await closed;
        });
    });
    it('cleans up submenus that close before they are "open"', async () => {
        if ('showPopover' in document.createElement('div')) {
            return;
        }
        await sendMouse({
            type: 'move',
            position: [1, 1],
        });
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item class="root-1">
                    Has submenu
                    <sp-menu slot="submenu">${renderSubmenu()}</sp-menu>
                </sp-menu-item>
                <sp-menu-item class="root-2">
                    Has submenu
                    <sp-menu slot="submenu">${renderSubmenu()}</sp-menu>
                </sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);
        const rootItem1 = el.querySelector('.root-1') as MenuItem;
        const rootItem2 = el.querySelector('.root-2') as MenuItem;
        expect(rootItem1.open, 'initially closed 1').to.be.false;
        expect(rootItem2.open, 'initially closed 2').to.be.false;

        // Open the first submenu
        await mouseMoveOver(rootItem1);
        // Open the second submenu, closing the first
        await mouseMoveOver(rootItem2);
        // Open the first submenu, closing the second
        await mouseMoveOver(rootItem1);
        // Open the second submenu, closing the first
        await mouseMoveOver(rootItem2);
        await elementUpdated(rootItem1);
        await elementUpdated(rootItem2);
        const closed = oneEvent(rootItem2, 'sp-closed');
        // Close the second submenu
        await mouseClickOn(rootItem2);
        await elementUpdated(rootItem2);
        await closed;

        expect(rootItem1.open, 'finally closed 1').to.be.false;
        expect(rootItem2.open, 'finally closed 2').to.be.false;
    });
    it('allows using non-menu-item elements as the root of a submenu', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item class="root">
                    Has submenu
                    <div role="menuitem" slot="submenu">
                        <sp-menu-item class="submenu-1">One</sp-menu-item>
                        <sp-menu-item>Two</sp-menu-item>
                        <sp-menu-item>Three</sp-menu-item>
                    </div
                ></div>
                </sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);
        const rootItem = el.querySelector('.root') as MenuItem;

        // Open the first submenu
        await mouseMoveOver(rootItem);

        expect(rootItem.open).to.be.true;

        const firstSubMenuItemRect = el
            .querySelector('.submenu-1')
            ?.getBoundingClientRect();

        if (!firstSubMenuItemRect) {
            throw new Error('Submenu item not found');
        }

        // click to select
        await mouseMoveOver(firstSubMenuItemRect);

        // This test will fail if the click event throws an error
        // because the submenu root is not a menu-item
    });
    it('should make submenu scrollable when content exceeds max height', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>
                    Parent Item
                    <div role="menu" slot="submenu">
                        ${Array(20)
                            .fill(0)
                            .map(
                                (_, i) => html`
                                    <sp-menu-item>
                                        Submenu Item ${i + 1}
                                    </sp-menu-item>
                                `
                            )}
                    </div>
                </sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);

        const menuItem = el.querySelector('sp-menu-item') as MenuItem;
        const submenu = menuItem.querySelector(
            '[slot="submenu"]'
        ) as HTMLElement;

        // Open the submenu
        const opened = oneEvent(menuItem, 'sp-opened');
        menuItem.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;

        // Force a specific max-height to ensure scrolling
        submenu.style.maxHeight = '200px';
        await elementUpdated(submenu);

        // Get computed styles
        const computedStyle = window.getComputedStyle(submenu);

        // Verify overflow-y is set to auto
        expect(computedStyle.overflowY).to.equal('auto');

        // Verify that the content is actually overflowing
        expect(submenu.scrollHeight).to.be.greaterThan(submenu.clientHeight);

        // Verify that the submenu is scrollable
        const initialScrollTop = submenu.scrollTop;
        submenu.scrollTop = 50;
        await elementUpdated(submenu);
        expect(submenu.scrollTop).to.equal(50);
        expect(submenu.scrollTop).to.not.equal(initialScrollTop);
    });
    describe('touch interactions', () => {
        beforeEach(async function () {
            this.el = await fixture<Menu>(html`
                <sp-menu>
                    <sp-menu-item>No submenu</sp-menu-item>
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
            `);
            await elementUpdated(this.el);
            this.rootItem = this.el.querySelector('.root') as MenuItem;
            await elementUpdated(this.rootItem);
        });

        it('does not open submenu on touch pointerenter', async function () {
            expect(this.rootItem.open).to.be.false;

            // Simulate touch pointerenter event
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'touch',
                })
            );

            // Wait to ensure submenu doesn't open
            await aTimeout(150);

            expect(this.rootItem.open).to.be.false;
        });

        it('does not close submenu on touch pointerleave', async function () {
            // First open the submenu via click
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            this.rootItem.click();
            await opened;

            expect(this.rootItem.open).to.be.true;

            // Simulate touch pointerleave event
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerleave', {
                    bubbles: true,
                    pointerType: 'touch',
                })
            );

            // Wait to ensure submenu doesn't close
            await aTimeout(150);

            expect(this.rootItem.open).to.be.true;
        });

        it('opens submenu on touch click when closed', async function () {
            expect(this.rootItem.open).to.be.false;

            // Track pointer type by dispatching pointerenter first
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'touch',
                })
            );

            const opened = oneEvent(this.rootItem, 'sp-opened');
            this.rootItem.click();
            await opened;

            expect(this.rootItem.open).to.be.true;
        });

        it('closes submenu on touch click when open', async function () {
            // First open the submenu
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'touch',
                })
            );

            const opened = oneEvent(this.rootItem, 'sp-opened');
            this.rootItem.click();
            await opened;

            expect(this.rootItem.open).to.be.true;

            // Click again to close
            const closed = oneEvent(this.rootItem, 'sp-closed');
            this.rootItem.click();
            await closed;

            expect(this.rootItem.open).to.be.false;
        });

        it('mouse pointerenter still opens submenu', async function () {
            expect(this.rootItem.open).to.be.false;

            const opened = oneEvent(this.rootItem, 'sp-opened');
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'mouse',
                })
            );
            await opened;

            expect(this.rootItem.open).to.be.true;
        });

        it('mouse pointerleave still closes submenu', async function () {
            // First open via mouse
            const opened = oneEvent(this.rootItem, 'sp-opened');
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'mouse',
                })
            );
            await opened;

            expect(this.rootItem.open).to.be.true;

            // Leave with mouse
            const closed = oneEvent(this.rootItem, 'sp-closed');
            this.rootItem.dispatchEvent(
                new PointerEvent('pointerleave', {
                    bubbles: true,
                    pointerType: 'mouse',
                })
            );
            await closed;

            expect(this.rootItem.open).to.be.false;
        });

        it('closes sibling submenus on touch pointerenter', async function () {
            // Create a second menu item with submenu
            const el = await fixture<Menu>(html`
                <sp-menu>
                    <sp-menu-item class="root-1">
                        First submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item>Item A</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                    <sp-menu-item class="root-2">
                        Second submenu
                        <sp-menu slot="submenu">
                            <sp-menu-item>Item B</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-menu>
            `);
            await elementUpdated(el);
            const rootItem1 = el.querySelector('.root-1') as MenuItem;
            const rootItem2 = el.querySelector('.root-2') as MenuItem;
            await elementUpdated(rootItem1);
            await elementUpdated(rootItem2);

            // Open first submenu with mouse
            const opened1 = oneEvent(rootItem1, 'sp-opened');
            rootItem1.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'mouse',
                })
            );
            await opened1;

            expect(rootItem1.open).to.be.true;
            expect(rootItem2.open).to.be.false;

            // Hover second item with mouse should close first
            const closed1 = oneEvent(rootItem1, 'sp-closed');
            rootItem2.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                    pointerType: 'mouse',
                })
            );
            await closed1;

            expect(rootItem1.open).to.be.false;
        });
    });
});
