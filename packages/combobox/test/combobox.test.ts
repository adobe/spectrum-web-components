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

import { elementUpdated, expect, oneEvent } from '@open-wc/testing';

import '@spectrum-web-components/combobox/sp-combobox.js';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    escapeEvent,
    fixture,
    homeEvent,
} from '../../../test/testing-helpers.js';
import { executeServerCommand, sendKeys } from '@web/test-runner-commands';
import { PickerButton } from '@spectrum-web-components/picker-button';
import {
    comboboxFixture,
    TestableCombobox,
    testActiveElement,
} from './index.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { withTooltip } from '../stories/combobox.stories.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import { MenuItem } from '@spectrum-web-components/menu';
import { countries } from '../stories/index.js';

describe('Combobox', () => {
    describe('manages focus', () => {
        it('responds to focus()', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.focus();

            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
        });
        it('responds to click()', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.open).to.be.false;

            el.click();

            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
            expect(el.open).to.be.true;

            el.click();

            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
            expect(el.open).to.be.false;
        });
    });
    describe('keyboard events', () => {
        it('opens on ArrowDown', async () => {
            const el = await comboboxFixture();
            await elementUpdated(el);

            el.focusElement.focus();

            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.activeDescendant).to.not.be.undefined;
        });
        it('opens on Alt+ArrowDown', async () => {
            const el = await comboboxFixture();
            await elementUpdated(el);

            el.focusElement.focus();

            await executeServerCommand('send-keys', {
                press: 'Alt+ArrowDown',
            });

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.activeDescendant).to.be.undefined;
        });
        it('opens on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.focusElement.focus();

            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            expect(el.open).to.be.true;
        });
        it('does not open on ArrowLeft', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.focusElement.focus();

            el.focusElement.dispatchEvent(arrowLeftEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
        it('does not close on ArrowLeft', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;

            el.focusElement.focus();

            el.focusElement.dispatchEvent(arrowLeftEvent());

            await elementUpdated(el);
            expect(el.open).to.be.true;
        });
        it('moves the carat/removes activeDescendant on ArrowLeft', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Apple';
            await elementUpdated(el);

            el.focusElement.setSelectionRange(4, 4);
            el.focusElement.focus();
            expect(el.focusElement.selectionStart).to.equal(4);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'apple');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'ArrowLeft',
            });

            await elementUpdated(el);
            expect(el.focusElement.selectionStart).to.equal(3);
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.true;
        });
        it('moves the carat/removes activeDescendant on ArrowRight', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Apple';
            await elementUpdated(el);

            el.focusElement.setSelectionRange(1, 1);
            el.focusElement.focus();
            expect(el.focusElement.selectionStart).to.equal(1);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'apple');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'ArrowRight',
            });

            await elementUpdated(el);
            expect(el.focusElement.selectionStart).to.equal(2);
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.true;
        });
        it('moves carat to 0 with Home key', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Apple';

            await elementUpdated(el);
            el.focusElement.focus();
            el.focusElement.setSelectionRange(4, 4);
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 1').to.equal(4);
            expect(el.focusElement.selectionEnd, 'end 1').to.equal(4);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'apple');
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(homeEvent());
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 2').to.equal(0);
            expect(el.focusElement.selectionEnd, 'end 2').to.equal(0);
            expect(el.activeDescendant).to.be.undefined;
            expect(el.shadowRoot.querySelector('[aria-selected="true"]')).to.be
                .null;
            expect(el.open).to.be.true;
        });
        it('moves carat to end with End key', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Apple';
            await elementUpdated(el);

            el.focusElement.focus();
            el.focusElement.setSelectionRange(1, 1);
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 1').to.equal(1);
            expect(el.focusElement.selectionEnd, 'end 1').to.equal(1);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            expect(el.activeDescendant.value).to.equal('apple');
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(endEvent());
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 2').to.equal(5);
            expect(el.focusElement.selectionEnd, 'end 2').to.equal(5);
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.true;
        });
        it('closes on Escape', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;

            el.focusElement.focus();

            el.focusElement.dispatchEvent(escapeEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
        it('clears on Escape', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.value = 'Test';

            el.focusElement.focus();

            el.focusElement.dispatchEvent(escapeEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
            expect(el.value).to.equal('');
        });
    });
    describe('mouse events', () => {
        it('opens on input click', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const opened = oneEvent(el.focusElement, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;
            await elementUpdated(el);
            expect(el.open).to.be.true;
        });
        it('closes on input click', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const opened = oneEvent(el.focusElement, 'sp-opened');
            el.open = true;
            await opened;
            expect(el.open).to.be.true;

            const closed = oneEvent(el.focusElement, 'sp-closed');
            el.focusElement.click();
            await closed;

            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
        it('opens on button click', async () => {
            const el = await comboboxFixture();

            const button = el.shadowRoot.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            await elementUpdated(el);

            const opened = oneEvent(el.focusElement, 'sp-opened');
            button.click();
            await opened;

            await elementUpdated(el);
            expect(el.open).to.be.true;
        });
        it('closes on button click', async () => {
            const el = await comboboxFixture();

            const button = el.shadowRoot.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            await elementUpdated(el);

            const input = el.shadowRoot.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(el.shadowRoot.activeElement).to.not.equal(input);

            const opened = oneEvent(el.focusElement, 'sp-opened');
            el.open = true;
            await opened;
            expect(el.open).to.be.true;
            expect(el.shadowRoot.activeElement).to.equal(input);

            const closed = oneEvent(el.focusElement, 'sp-closed');
            const rect = button.getBoundingClientRect();
            // required to test that focus remains with the <input>,
            // since button.click() doesn't allow the button to steal focus
            await sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'click',
                    },
                ],
            });
            await closed;

            await elementUpdated(el);
            expect(el.open).to.be.false;

            // closing the popup menu should leave the textfield's input focused
            expect(el.shadowRoot.activeElement).to.equal(input);
        });
    });
    describe('manage active decendent', () => {
        it('sets activeDescendant to first descendent on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'apple');
        });
        it('updates activeDescendant on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'apple');
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'banana');
        });
        it('cycles activeDescendant on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'apple');
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'durian');
        });
        it('sets activeDescendant to last descendent on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'persimmon');
        });
        it('updates activeDescendant on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'persimmon');
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'pear');
        });
        it('cycles activeDescendant on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'persimmon');
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'mango');
        });
    });
    describe('item selection', () => {
        it('sets the value when descendent is active and `enter` is pressed', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            el.focusElement.focus();
            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.dispatchEvent(arrowDownEvent());
            await opened;

            expect(el.open).to.be.true;

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'banana');
            el.focusElement.dispatchEvent(enterEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
            expect(el.activeDescendant).to.be.undefined;
            expect(el.value).to.equal('Banana');
            expect(el.focusElement.value).to.equal(el.value);
        });
        it('does not set the value when `enter` is pressed and no active descendent', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.activeDescendant).to.be.undefined;

            el.focusElement.dispatchEvent(enterEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
            expect(el.activeDescendant).to.be.undefined;
            expect(el.value).to.equal('');
            expect(el.focusElement.value).to.equal(el.value);
        });
        it('sets the value when an item is clicked', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const item = el.shadowRoot.querySelector('#cherry') as HTMLElement;

            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            const itemValue = (item.textContent as string).trim();
            const rect = item.getBoundingClientRect();

            await sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'click',
                    },
                ],
            });
            await elementUpdated(el);

            expect(el.value).to.equal(itemValue);
            expect(el.open).to.be.false;
            expect(el.activeDescendant).to.be.undefined;
        });
        it('sets the value when an item is clicked programatically', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const item = el.shadowRoot.querySelector(
                '[value="cherry"]'
            ) as MenuItem;

            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            const itemValue = item.itemText;

            item.click();

            await elementUpdated(el);

            expect(el.value).to.equal(itemValue);
            expect(el.open).to.be.false;
            expect(el.activeDescendant).to.be.undefined;
        });
    });
    describe('responds to value changes', () => {
        it('applies a visible selection based on `itemText`', async () => {
            const el = await comboboxFixture();
            el.autocomplete = 'none';
            el.options = countries;
            await elementUpdated(el);

            let selected = el.shadowRoot.querySelector('[selected]');
            expect(selected).to.be.null;

            el.value = 'af';
            await elementUpdated(el);

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            selected = el.shadowRoot.querySelector('[selected]');
            expect(selected).to.be.null;

            el.value = 'Algeria';
            await elementUpdated(el);

            selected = el.shadowRoot.querySelector('[selected]');
            expect(selected).to.not.be.null;
        });
        it('sets the value when descendent is active and `enter` is pressed', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            el.focus();

            const opened = oneEvent(el, 'sp-opened');
            executeServerCommand('send-keys', {
                press: 'g',
            });
            await opened;

            expect(el.open).to.be.true;
            expect(el.focusElement.value, '<input> has value').to.equal('g');
            expect(el.value, 'el has value').to.equal('g');

            await executeServerCommand('send-keys', {
                press: 'r',
            });

            expect(el.open).to.be.true;
            expect(el.focusElement.value, '<input> has value').to.equal('gr');
            expect(el.value, 'el has value').to.equal('gr');
        });
        it('filters options when the value changes and is not found', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(12);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            await executeServerCommand('send-keys', {
                press: 'z',
            });

            expect(el.open).to.be.true;
            expect(el.availableOptions.length).equal(0);
            const options = [...el.shadowRoot.querySelectorAll('sp-menu-item')];
            expect(options.length).to.equal(0);
        });
        it('filters options when the value typed and is found', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(12);
            expect(el.options?.length).equal(12);
            let items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(12);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            await executeServerCommand('send-keys', {
                press: 'C',
            });

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.value).to.equal('C');
            expect(el.availableOptions.length).equal(2);
            expect(el.options?.length).equal(12);
            items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(2);

            await executeServerCommand('send-keys', {
                press: 'O',
            });

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.value).to.equal('CO');
            expect(el.availableOptions.length).equal(1);
            items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(1);
        });
        it('filters options when the value is applied and is found', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(12);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            el.value = 'L';

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.availableOptions.length).equal(2);

            el.value = 'Le';

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.availableOptions.length).equal(1);
        });
        it('filtered items only can be accessed by ArrowUp/Down events', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            el.value = 'Banana';
            await elementUpdated(el);

            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(1);

            el.focus();
            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.dispatchEvent(arrowDownEvent());
            await opened;
            await elementUpdated(el);

            expect(el.activeDescendant?.itemText).to.equal(el.value);
        });
        it('deactives descendent on input', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            el.focus();
            await elementUpdated(el);

            const opened = oneEvent(el, 'sp-opened');
            executeServerCommand('send-keys', {
                press: 'B',
            });
            await opened;
            await elementUpdated(el);

            expect(el.value).to.equal('B');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            expect(el.value).to.equal('B');
            testActiveElement(el, 'banana');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'o',
            });
            await elementUpdated(el);

            expect(el.value).to.equal('Bo');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.true;
        });
    });

    it('closes tooltip on button blur', async () => {
        const el = await fixture<TestableCombobox>(withTooltip());
        await elementUpdated(el);
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const tooltipEl = el.querySelector('sp-tooltip') as Tooltip;
        el.insertAdjacentElement('beforebegin', input1);
        el.insertAdjacentElement('afterend', input2);
        input1.focus();
        expect(document.activeElement === input1).to.be.true;
        const tooltipOpened = oneEvent(el, 'sp-opened');
        await sendKeys({
            press: 'Tab',
        });
        await tooltipOpened;
        expect(
            document.activeElement === el,
            `Actually, ${document.activeElement?.localName}`
        ).to.be.true;
        expect(tooltipEl.open).to.be.true;
        expect(el.open).to.be.false;
        expect(el.focused).to.be.true;

        const menuOpen = oneEvent(el, 'sp-opened');
        const tooltipClosed = oneEvent(el, 'sp-closed');
        await sendKeys({
            press: 'ArrowDown',
        });
        await menuOpen;
        await tooltipClosed;
        expect(document.activeElement === el).to.be.true;
        expect(tooltipEl.open).to.be.false;
        expect(el.open).to.be.true;

        const menuClosed = oneEvent(el, 'sp-closed');
        await sendKeys({
            press: 'Tab',
        });
        await menuClosed;
        expect(document.activeElement === el).to.be.false;
        expect(tooltipEl.open).to.be.false;
        expect(el.open).to.be.false;
    });
});
