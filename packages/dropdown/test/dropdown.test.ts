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

import '../sp-dropdown.js';
import { Dropdown } from '../';
import '@spectrum-web-components/overlay/active-overlay.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/shared/src/focus-visible.js';
import { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowUpEvent,
    tabEvent,
} from '../../../test/testing-helpers.js';

describe('Dropdown', () => {
    const dropdownFixture = async (): Promise<Dropdown> => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu>
                        <sp-menu-item>
                            Deselect
                        </sp-menu-item>
                        <sp-menu-item value="option-2">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>
                            Feather...
                        </sp-menu-item>
                        <sp-menu-item>
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Make Work Path
                        </sp-menu-item>
                    </sp-menu>
                </sp-dropdown>
            `
        );

        await waitUntil(
            () => !!window.applyFocusVisiblePolyfill,
            'polyfill loaded'
        );
        return el;
    };

    afterEach(async () => {
        const overlays = document.querySelectorAll('active-overlay');
        overlays.forEach((overlay) => overlay.remove());
    });

    it('loads accessibly', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('renders invalid accessibly', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        el.invalid = true;
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('renders selection accessibly', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        el.value = 'option-2';
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('closes when becoming disabled', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        el.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.disabled = true;
        await elementUpdated(el);

        expect(el.open).to.be.false;
    });
    it('closes when clicking away', async () => {
        const el = await dropdownFixture();
        el.id = 'closing';
        const other = document.createElement('div');
        document.body.append(other);

        await elementUpdated(el);

        expect(el.open).to.be.false;
        el.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        other.click();
        await waitUntil(() => !el.open, 'closed');

        other.remove();
    });
    it('toggles between dropdowns', async () => {
        const el2 = await dropdownFixture();
        const el1 = await dropdownFixture();

        el1.id = 'away';
        el2.id = 'other';

        await Promise.all([elementUpdated(el1), elementUpdated(el2)]);

        expect(el1.open, 'closed 1').to.be.false;
        expect(el2.open, 'closed 1').to.be.false;
        el1.click();
        await Promise.all([elementUpdated(el1), elementUpdated(el2)]);
        await waitUntil(() => el1.open && !el2.open, '1 open, 2 closed');

        el2.click();
        await Promise.all([elementUpdated(el1), elementUpdated(el2)]);
        await waitUntil(() => !el1.open && el2.open, '1 closed, 2 open');

        el1.click();
        await Promise.all([elementUpdated(el1), elementUpdated(el2)]);
        await waitUntil(() => el1.open && !el2.open, '1 open, 2 closed: again');
    });
    it('selects', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItemText).to.equal('');
        expect(el.value).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');
    });
    it('re-selects', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItemText).to.equal('');
        expect(el.value).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');

        firstItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Deselect');
        expect(el.value).to.equal('Deselect');
    });
    it('can have selection prevented', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItemText).to.equal('');
        expect(el.value).to.equal('');
        expect(secondItem.selected).to.be.false;

        el.addEventListener('change', (event: Event): void => {
            event.preventDefault();
        });

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(secondItem.selected).to.be.false;
    });
    it('opens on ArrowDown', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        el.focus();
        await elementUpdated(el);

        expect(el.open).to.be.false;

        button.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(el.open).to.be.false;

        button.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItemText).to.equal('');
        expect(el.value).to.equal('');

        firstItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItemText).to.equal('Deselect');
        expect(el.value).to.equal('Deselect');
    });
    it('loads', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('refocuses on list when open', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        el.open = true;
        await elementUpdated(el);
        await waitUntil(
            () => document.activeElement === firstItem,
            'first item focused'
        );

        el.blur();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.focus();
        await elementUpdated(el);
        await waitUntil(
            () => document.activeElement === firstItem,
            'first item refocused'
        );
        expect(el.open).to.be.true;
        expect(document.activeElement === firstItem).to.be.true;
    });
    it('allows tabing to close', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        el.open = true;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.focus();
        await elementUpdated(el);
        await waitUntil(() => document.activeElement === firstItem);
        await waitUntil(
            () => document.activeElement === firstItem,
            'first item refocused'
        );
        expect(el.open).to.be.true;
        expect(document.activeElement === firstItem).to.be.true;

        firstItem.dispatchEvent(tabEvent);
        await elementUpdated(el);
        await waitUntil(() => !el.open);

        expect(el.open, 'closes').to.be.false;
        expect(document.activeElement === firstItem, 'focuses something else')
            .to.be.false;
    });
    it('displays selected item text by default', async () => {
        const focusSelectedSpy = spy();
        const focusFirstSpy = spy();
        const handleFirstFocus = (): void => focusFirstSpy();
        const handleSelectedFocus = (): void => focusSelectedSpy();
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown
                    value="inverse"
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu>
                        <sp-menu-item value="deselect">
                            Deselect Text
                        </sp-menu-item>
                        <sp-menu-item value="inverse">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>
                            Feather...
                        </sp-menu-item>
                        <sp-menu-item>
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Make Work Path
                        </sp-menu-item>
                    </sp-menu>
                </sp-dropdown>
            `
        );

        await elementUpdated(el);
        await waitUntil(
            () => el.selectedItemText === 'Select Inverse',
            `Selected Item Text: ${el.selectedItemText}`
        );

        const menu = el.querySelector('sp-menu') as Menu;
        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        firstItem.addEventListener('focus', handleFirstFocus);
        secondItem.addEventListener('focus', handleSelectedFocus);

        expect(el.value).to.equal('inverse');
        expect(el.selectedItemText).to.equal('Select Inverse');

        const button = el.button as HTMLButtonElement;
        button.click();

        await elementUpdated(menu);
        await waitUntil(
            () => document.activeElement === secondItem,
            'second item focused'
        );

        expect(focusFirstSpy.called, 'do not focus first element').to.be.false;
        expect(focusSelectedSpy.called, 'focused selected element').to.be.true;
        expect(focusSelectedSpy.calledOnce, 'focused selected element once').to
            .be.true;
    });
    it('resets value when item not available', async () => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown
                    value="missing"
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu>
                        <sp-menu-item value="deselect">
                            Deselect Text
                        </sp-menu-item>
                        <sp-menu-item value="inverse">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>
                            Feather...
                        </sp-menu-item>
                        <sp-menu-item>
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Make Work Path
                        </sp-menu-item>
                    </sp-menu>
                </sp-dropdown>
            `
        );

        await elementUpdated(el);
        await waitUntil(() => el.value === '');

        expect(el.value).to.equal('');
        expect(el.selectedItemText).to.equal('');
    });

    it('resets value when item not available', async () => {
        const mouseenterSpy = spy();
        const handleMouseenter = (): void => mouseenterSpy();
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown
                    value="missing"
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu>
                        <sp-menu-item
                            value="deselect"
                            @mouseenter=${handleMouseenter}
                        >
                            Deselect Text
                        </sp-menu-item>
                    </sp-menu>
                </sp-dropdown>
            `
        );

        await elementUpdated(el);
        await waitUntil(() => el.value === '');

        const hoverEl = el.querySelector('sp-menu-item') as MenuItem;

        el.open = true;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        hoverEl.dispatchEvent(new MouseEvent('mouseenter'));
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.open = false;
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(mouseenterSpy.calledOnce).to.be.true;
    });
});
