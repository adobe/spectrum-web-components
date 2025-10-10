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

import { elementUpdated, expect, oneEvent } from '@open-wc/testing';

import '@spectrum-web-components/combobox/sp-combobox.js';
import { MenuItem } from '@spectrum-web-components/menu';
import { PickerButton } from '@spectrum-web-components/picker-button';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import {
    executeServerCommand,
    sendKeys,
    setViewport,
} from '@web/test-runner-commands';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    escapeEvent,
    fixture,
    homeEvent,
    mouseClickOn,
    sendTabKey,
} from '../../../test/testing-helpers.js';
import { withTooltip } from '../stories/combobox.stories.js';
import { countries } from '../stories/index.js';
import {
    comboboxFixture,
    longComboboxFixture,
    TestableCombobox,
    testActiveElement,
    withDisabledItemsFixture,
} from './helpers.js';

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
            // required to test that focus remains with the <input>,
            // since button.click() doesn't allow the button to steal focus
            await mouseClickOn(button);
            await closed;

            await elementUpdated(el);
            expect(el.open).to.be.false;

            // closing the popup menu should leave the textfield's input focused
            expect(el.shadowRoot.activeElement).to.equal(input);
        });
    });
    describe('manage active descendent', () => {
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
            expect(el.open, 'open?').to.be.false;

            el.focusElement.focus();
            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.dispatchEvent(arrowDownEvent());
            await opened;

            expect(el.open, 'open?').to.be.true;
            await elementUpdated(el);
            expect(
                el.activeDescendant?.value,
                'activeDescendant after open?'
            ).to.equal('apple');
            const changed = oneEvent(el, 'change');
            el.focusElement.dispatchEvent(enterEvent());
            await changed;

            await elementUpdated(el);
            expect(el.open, 'open?').to.be.false;
            expect(el.activeDescendant, 'activeDescendant after Enter?').to.be
                .undefined;
            expect(el.value, 'value after enter').to.equal('Apple');
            expect(
                el.shadowRoot.querySelector(
                    'sp-menu-item[aria-selected="true"]'
                )?.id,
                'aria-selected'
            ).to.equal('apple');
            expect(el.focusElement.value, 'focusElement after enter').to.equal(
                el.value
            );
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

            expect(el.value, 'initial value').to.equal('');
            expect(el.activeDescendant, 'initial activeDescendant').to.be
                .undefined;
            expect(el.open, 'initially open?').to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            const item = el.shadowRoot.querySelector('#cherry') as HTMLElement;
            await elementUpdated(item);

            expect(el.open, 'open after click?').to.be.true;

            const itemValue = (item.textContent as string).trim();

            await mouseClickOn(item);
            await elementUpdated(el);

            expect(el.value, 'value after item click?').to.equal(itemValue);
            expect(el.open, 'open after item click?').to.be.false;
            expect(el.activeDescendant, 'activeDescendant after item click').to
                .be.undefined;
        });
        it('reflects the selected value in menu on reopening', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            let opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            const item = el.shadowRoot.querySelector(
                '[value="banana"]'
            ) as MenuItem;
            await elementUpdated(item);

            expect(el.open).to.be.true;

            const itemValue = item.itemText;
            const closed = oneEvent(el, 'sp-closed');
            await mouseClickOn(item);
            await closed;

            expect(el.value).to.equal(itemValue);
            expect(el.open).to.be.false;
            expect(el.activeDescendant).to.be.undefined;

            opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            await elementUpdated(el);
            await elementUpdated(item);

            expect(el.open).to.be.true;

            // item should be selected
            expect(
                el.shadowRoot
                    .querySelector('sp-menu')
                    ?.querySelector('[selected]')?.textContent
            ).to.equal(item.textContent);
        });
        it('sets the value when an item is clicked programmatically', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            expect(el.value).to.equal('');
            expect(el.activeDescendant).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            const item = el.shadowRoot.querySelector(
                '[value="cherry"]'
            ) as MenuItem;
            await elementUpdated(item);

            expect(el.open).to.be.true;

            const itemValue = item.itemText;

            const closed = oneEvent(el, 'sp-closed');
            item.click();
            await closed;
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

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            let items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(12);
            await Promise.all(items.map((item) => elementUpdated(item)));

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
    describe('pending state', () => {
        it('renders a progress circle', async () => {
            const el = await comboboxFixture();
            el.pending = true;
            await elementUpdated(el);

            expect(el.shadowRoot.querySelector('sp-progress-circle')).to.exist;
        });
        it('receives focus', async () => {
            const el = await comboboxFixture();
            el.pending = true;
            await elementUpdated(el);

            el.focus();

            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
        });
        it('does not open the dropdown on mouse events', async () => {
            const el = await comboboxFixture();
            el.pending = true;
            await elementUpdated(el);

            el.click();

            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
        it('does not open the dropdown on keyboard events', async () => {
            const el = await comboboxFixture();
            el.pending = true;
            await elementUpdated(el);

            el.focusElement.focus();
            await sendKeys({ press: 'ArrowDown' });

            await elementUpdated(el);

            const typed = oneEvent(el, 'input');
            await sendKeys({ press: 'g' });
            await typed;

            expect(el.focusElement.value, '<input> has value').to.equal('g');
            expect(el.value, 'el has value').to.equal('g');
            expect(el.open).to.be.false;
        });
    });

    describe('disabled items', () => {
        let el: TestableCombobox;

        beforeEach(async () => {
            el = await withDisabledItemsFixture();
            await elementUpdated(el);
        });
        afterEach(async () => {
            if (el.open) {
                const closed = oneEvent(el, 'sp-closed');
                el.open = false;
                await closed;
            }
        });

        it('disabled items should be disabled', async () => {
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            const menuItems = el.shadowRoot.querySelectorAll('sp-menu-item');
            expect(menuItems[2].disabled).to.be.true;
        });
        it('disabled items should not be focusable using keyboard', async () => {
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            // let's press arrow down 3 times and check if we are on Algeria (the next to disabled item)
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.activeDescendant?.itemText).to.equal('Algeria');
        });
        it('disabled items should not be focusable using mouse', async () => {
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            const menuItems = el.shadowRoot.querySelectorAll('sp-menu-item');
            const disabledItem = menuItems[2];

            await mouseClickOn(disabledItem);
            await elementUpdated(el);

            // active descendant should be undefined
            expect(el.activeDescendant).to.be.undefined;
        });
        it('disabled items cannot be programmatically clicked', async () => {
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            const menuItems = el.shadowRoot.querySelectorAll('sp-menu-item');
            const disabledItem = menuItems[2];

            disabledItem.click();
            await elementUpdated(el);

            expect(el.activeDescendant).to.be.undefined;
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
        await sendTabKey();
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
        await sendKeys({ press: 'ArrowDown' });
        await menuOpen;
        await tooltipClosed;
        expect(document.activeElement === el).to.be.true;
        expect(tooltipEl.open).to.be.false;
        expect(el.open).to.be.true;

        const menuClosed = oneEvent(el, 'sp-closed');
        await sendTabKey();
        await menuClosed;
        expect(document.activeElement === el).to.be.false;
        expect(tooltipEl.open).to.be.false;
        expect(el.open).to.be.false;
    });

    it('scrolls to fit window', async () => {
        await setViewport({ width: 360, height: 640 });
        const el = await longComboboxFixture();

        await elementUpdated(el);

        expect(el.value).to.equal('');
        expect(el.activeDescendant).to.be.undefined;
        expect(el.open).to.be.false;

        const opened = oneEvent(el, 'sp-opened');
        el.focusElement.click();
        await opened;
        expect(el.open).to.be.true;

        const menu = el.shadowRoot.querySelector(
            '[role="listbox"]'
        ) as HTMLElement;
        await elementUpdated(menu);

        expect(menu.scrollHeight > window.innerHeight).to.be.true;
    });
});
