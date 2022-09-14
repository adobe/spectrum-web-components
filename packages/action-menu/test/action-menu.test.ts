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

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers';
import type { MenuItem } from '@spectrum-web-components/menu/src/MenuItem.js';
import type { Menu } from '@spectrum-web-components/menu';

const deprecatedActionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu label="More Actions">
                <sp-menu>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-menu>
            </sp-action-menu>
        `
    );

const actionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu label="More Actions">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        `
    );

const actionSubmenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu label="More Actions">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item selected class="selected-item">Two</sp-menu-item>
                <sp-menu-item id="item-with-submenu">
                    B should be selected
                    <sp-menu slot="submenu">
                        <sp-menu-item>A</sp-menu-item>
                        <sp-menu-item selected class="selected-item">
                            B
                        </sp-menu-item>
                        <sp-menu-item>C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        `
    );

describe('Action menu', () => {
    testForLitDevWarnings(async () => await actionMenuFixture());
    it('loads', async () => {
        const el = await actionMenuFixture();
        await elementUpdated(el);

        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    it('loads - [slot="label"]', async () => {
        const el = await fixture<ActionMenu>(
            html`
                <sp-action-menu>
                    <span slot="label">More Actions</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [custom icon]', async () => {
        const el = await fixture<ActionMenu>(
            html`
                <sp-action-menu label="More Actions">
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('stays `quiet`', async () => {
        const el = await actionMenuFixture();
        await elementUpdated(el);

        expect(el.quiet).to.be.true;

        el.quiet = false;
        await elementUpdated(el);

        expect(el.quiet).to.be.true;
    });
    it('stay `valid`', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);

        expect(el.invalid).to.be.false;

        el.invalid = true;
        await elementUpdated(el);

        expect(el.invalid).to.be.false;
    });
    it('focus()', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);

        el.focus();

        expect(document.activeElement).to.equal(el);
        expect(el.shadowRoot.activeElement).to.equal(el.focusElement);

        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(document.activeElement).to.not.equal(el);

        const closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(document.activeElement).to.equal(el);
        expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
    });
    it('opens unmeasured', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('opens unmeasured with deprecated syntax', async () => {
        const el = await deprecatedActionMenuFixture();

        await elementUpdated(el);
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('toggles open/close multiple time', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);
        let items = el.querySelectorAll('sp-menu-item');
        const count = items.length;
        expect(items.length).to.equal(count);

        let opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        let closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(count);

        opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(count);
    });
    it('allows submenu items to be selected', async () => {
        const root = await actionSubmenuFixture();
        const menuItem = root.querySelector('#item-with-submenu') as Menu;
        const submenu = menuItem.querySelector(
            'sp-menu[slot="submenu"]'
        ) as Menu;
        const selectedItem = submenu.querySelector(
            '.selected-item'
        ) as MenuItem;

        expect(selectedItem.selected, 'item should be initially selected').to.be
            .true;

        let opened = oneEvent(root, 'sp-opened');
        root.click();
        await opened;
        expect(root.open).to.be.true;

        opened = oneEvent(menuItem, 'sp-opened');
        menuItem.dispatchEvent(
            new PointerEvent('pointerenter', { bubbles: true })
        );
        await opened;
        const overlays = document.querySelectorAll('active-overlay');
        expect(overlays.length).to.equal(2);

        await elementUpdated(submenu);
        expect(
            selectedItem.selected,
            'initially selected item should maintain selection'
        ).to.be.true;
    });
    it('allows top-level selection state to change', async () => {
        const root = await actionSubmenuFixture();
        const unselectedItem = root.querySelector('sp-menu-item') as MenuItem;
        const selectedItem = root.querySelector('.selected-item') as MenuItem;

        selectedItem.addEventListener('click', () => {
            selectedItem.selected = false;
        });

        expect(unselectedItem.innerHTML).to.equal('One');
        expect(unselectedItem.selected).to.be.false;
        expect(selectedItem.innerHTML).to.equal('Two');
        expect(selectedItem.selected).to.be.true;

        let opened = oneEvent(root, 'sp-opened');
        root.click();
        await opened;

        // close by clicking selected
        // (with event listener: should set selected = false)
        let closed = oneEvent(root, 'sp-closed');
        selectedItem.click();
        await closed;

        opened = oneEvent(root, 'sp-opened');
        root.click();
        await opened;

        // close by clicking unselected
        // (no event listener: should remain selected = false)
        closed = oneEvent(root, 'sp-closed');
        unselectedItem.click();
        await closed;

        opened = oneEvent(root, 'sp-opened');
        root.click();
        await opened;

        expect(unselectedItem.innerHTML).to.equal('One');
        expect(unselectedItem.selected).to.be.false;
        expect(selectedItem.innerHTML).to.equal('Two');
        expect(selectedItem.selected).to.be.false;
    });
});
