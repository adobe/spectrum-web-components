/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import '../';
import { Dropdown } from '../';
import '../../menu';
import '../../menu-item';
import { MenuItem } from '../../menu-item';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    nextFrame,
} from '@open-wc/testing';
import { waitForPredicate } from '../../../test/testing-helpers';
import '../../shared/lib/focus-visible.js';
import { spy } from 'sinon';

const keyboardEvent = (code: string): KeyboardEvent =>
    new KeyboardEvent('keydown', {
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
    });
const arrowDownEvent = keyboardEvent('ArrowDown');
const arrowUpEvent = keyboardEvent('ArrowUp');

const dropdownFixture = async (): Promise<Dropdown> =>
    await fixture<Dropdown>(
        html`
            <sp-dropdown>
                Select a Country with a very long label, too long in fact
                <sp-menu slot="options">
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

describe('Dropdown', () => {
    it('loads', async () => {
        const el = await dropdownFixture();

        await waitForPredicate(() => !!window.applyFocusVisiblePolyfill);
        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('renders invalid', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        el.invalid = true;
        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('closes when becoming disabled', async () => {
        const el = await dropdownFixture();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        el.open = true;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.disabled = true;
        await elementUpdated(el);

        expect(el.open).to.be.false;
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

        el.open = true;
        await elementUpdated(el);

        el.blur();
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        el.focus();
        await waitForPredicate(() => document.activeElement === firstItem);
        expect(el.open).to.be.true;
        expect(document.activeElement === firstItem).to.be.true;
    });
    it('displays selected item text by default', async () => {
        const focusSelectedSpy = spy();
        const focusFirstSpy = spy();
        const handleFirstFocus = (): void => focusFirstSpy();
        const handleSelectedFocus = (): void => focusSelectedSpy();
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown value="inverse">
                    Select a Country with a very long label, too long in fact
                    <sp-menu slot="options">
                        <sp-menu-item
                            value="deselect"
                            @focus=${handleFirstFocus}
                        >
                            Deselect Text
                        </sp-menu-item>
                        <sp-menu-item
                            value="inverse"
                            @focus=${handleSelectedFocus}
                        >
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

        expect(el.value).to.equal('inverse');
        expect(el.selectedItemText).to.equal('Select Inverse');

        const button = el.button as HTMLButtonElement;
        button.click();

        await elementUpdated(el);
        await nextFrame();

        expect(focusFirstSpy.called, 'do not focus first element').to.be.false;
        expect(focusSelectedSpy.calledOnce, 'focus selected element').to.be
            .true;
    });
    it('resets value when item not available', async () => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown value="missing">
                    Select a Country with a very long label, too long in fact
                    <sp-menu slot="options">
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

        expect(el.value).to.equal('');
        expect(el.selectedItemText).to.equal('');
    });
});
