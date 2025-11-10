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
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/number-field/sp-number-field.js';
import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/color-field/sp-color-field.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { isFirefox, isWebKit } from '@spectrum-web-components/shared';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowUpEvent,
    fixture,
    mouseClickOn,
    mouseMoveOver,
    tabEvent,
    testForLitDevWarnings,
    tEvent,
} from '../../../test/testing-helpers.js';

describe('Menu', () => {
    it('renders empty', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu tabindex="0"><a href="#anchor">Test</a></sp-menu>
        `);

        const anchor = el.querySelector('a') as HTMLAnchorElement;
        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);
        expect(document.activeElement).to.not.equal(anchor);

        expect(el.getAttribute('role')).to.equal('menu');

        el.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);
        expect(document.activeElement).to.not.equal(anchor);

        anchor.focus();
        expect(document.activeElement).to.not.equal(el);
        expect(document.activeElement).to.equal(anchor);
    });
    it('renders w/ [disabled] menu items', async () => {
        const focusinSpy = spy();
        const el = await fixture<Menu>(html`
            <sp-menu tabindex="0" @focusin=${() => focusinSpy()}>
                <sp-menu-item disabled>Disabled item</sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);

        el.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);
        expect(focusinSpy.callCount).to.equal(0);
    });
    it('renders w/ all [disabled] menu items', async () => {
        const focusinSpy = spy();
        const el = await fixture<Menu>(html`
            <sp-menu tabindex="0" @focusin=${() => focusinSpy()}>
                <sp-menu-item disabled>Disabled item 1</sp-menu-item>
                <sp-menu-item disabled>Disabled item 2</sp-menu-item>
            </sp-menu>
        `);
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);

        el.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);
        expect(focusinSpy.callCount).to.equal(0);
        firstItem.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.not.equal(el);
        expect(focusinSpy.callCount).to.equal(0);
        expect(el.matches(':focus-within')).to.be.false;
    });
    it('renders w/ menu items', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu label="Pick an action:">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);

        expect(el.childItems.length).to.equal(6);
        await expect(el).to.be.accessible();
    });

    testForLitDevWarnings(
        async () =>
            await fixture<Menu>(html`
                <sp-menu selects="single">
                    <sp-menu-item>Not Selected</sp-menu-item>
                    <sp-menu-item selected>Selected</sp-menu-item>
                    <sp-menu-item>Other</sp-menu-item>
                </sp-menu>
            `)
    );

    it('renders w/ selected', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item>Not Selected</sp-menu-item>
                <sp-menu-item selected>Selected</sp-menu-item>
                <sp-menu-item>Other</sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);

        const selectedItem = el.querySelector(
            'sp-menu-item[selected]'
        ) as MenuItem;

        expect(selectedItem.selected).to.be.true;
        await expect(el).to.be.accessible();
    });

    it('has a "value" that can be copied during "change" events', async function () {
        // @TODO: skipping this test because it's flaky in WebKit and Firefox in CI. Will review in the migration to Spectrum 2.
        if (isWebKit() || isFirefox()) {
            this.skip();
        }
        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                @change=${({
                    target: { value },
                }: Event & { target: Menu }): void => {
                    navigator.clipboard.writeText(value);
                }}
            >
                <sp-menu-item>Not Selected</sp-menu-item>
                <sp-menu-item selected>Selected</sp-menu-item>
                <sp-menu-item id="other">Other</sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);

        const selectedItem = el.querySelector(
            'sp-menu-item[selected]'
        ) as MenuItem;

        selectedItem.focus();

        await elementUpdated(el);
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);
        await sendKeys({ press: 'Enter' });

        const clipboardText = await navigator.clipboard.readText();
        await elementUpdated(el);

        expect(clipboardText).to.equal('Other');
    });

    it('accepts Numpad keys', async function () {
        // @TODO: skipping this test because it's flaky in WebKit and Firefox in CI. Will review in the migration to Spectrum 2.
        if (isWebKit() || isFirefox()) {
            this.skip();
        }
        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                @change=${({
                    target: { value },
                }: Event & { target: Menu }): void => {
                    navigator.clipboard.writeText(value);
                }}
            >
                <sp-menu-item>Not Selected</sp-menu-item>
                <sp-menu-item selected>Selected</sp-menu-item>
                <sp-menu-item id="other">Other</sp-menu-item>
            </sp-menu>
        `);

        await elementUpdated(el);
        const selectedItem = el.querySelector(
            'sp-menu-item[selected]'
        ) as MenuItem;
        selectedItem.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);
        await sendKeys({ press: 'NumpadEnter' });

        await elementUpdated(el);

        const clipboardText = await navigator.clipboard.readText();
        expect(clipboardText).to.equal('Other');
    });

    it('renders w/ hrefs', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item href="not-selected.html">
                    Not Selected
                </sp-menu-item>
                <sp-menu-item href="selected.html">Selected</sp-menu-item>
                <sp-menu-item href="other.html">Other</sp-menu-item>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 3,
            'expected menu to manage 3 items'
        );
        await elementUpdated(el);

        await expect(el).to.be.accessible();

        expect(el.getAttribute('role')).to.equal('menu');
    });

    it('handle focus and keyboard input', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 6,
            'expected menu to manage 6 items'
        );
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const thirdToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(3)'
        ) as MenuItem;
        const secondToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(2)'
        ) as MenuItem;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(firstItem);
        expect(firstItem.focused, 'first item focused').to.be.true;
        expect(firstItem.textContent, 'focused item text').to.equal('Deselect');

        el.dispatchEvent(arrowUpEvent());
        el.dispatchEvent(arrowUpEvent());
        el.dispatchEvent(tEvent());

        expect(
            document.activeElement === thirdToLastItem,
            'active element after arrow up'
        ).to.be.true;
        expect(thirdToLastItem.focused, 'third to last item focused').to.be
            .true;
        expect(thirdToLastItem.textContent, 'focused item text').to.equal(
            'Select and Mask...'
        );

        el.dispatchEvent(arrowDownEvent());

        expect(
            document.activeElement === secondToLastItem,
            'active element after arrow down'
        ).to.be.true;
        expect(secondToLastItem.focused, 'second to last item focused').to.be
            .true;
        expect(secondToLastItem.textContent, 'focused item text').to.equal(
            'Save Selection'
        );
    });

    it('handles hover and keyboard input', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 2,
            'expected menu to manage 2 items'
        );

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(firstItem);
        expect(firstItem.focused, 'first item focused').to.be.true;

        await mouseMoveOver(secondItem);

        expect(document.activeElement, 'active element after hover').to.equal(
            secondItem
        );
        expect(document.activeElement).to.equal(secondItem);
        expect(
            secondItem.focused,
            'second item should not have focus styling on hover'
        ).to.be.false;

        await sendKeys({ press: 'ArrowUp' });

        expect(document.activeElement).to.equal(firstItem);
        expect(
            firstItem.focused,
            'first item should have focus styling after keyboard'
        ).to.be.true;
    });

    it('handle focus and late descendant additions', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-group selects="inherit">
                    <span slot="header">Options</span>
                    <sp-menu-item id="deselect">Deselect</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 1,
            'expected menu to manage 1 item'
        );
        await elementUpdated(el);

        const initialLoadedItem = el.querySelector('#deselect') as MenuItem;

        el.focus();

        await elementUpdated(el);

        expect(document.activeElement).to.equal(initialLoadedItem);
        expect(initialLoadedItem.focused, 'visually focused').to.be.true;
        expect(initialLoadedItem.textContent, 'focused item text').to.equal(
            'Deselect'
        );

        el.blur();

        const group = el.querySelector('sp-menu-group') as HTMLElement;

        const prependedItem = document.createElement('sp-menu-item');
        prependedItem.textContent = 'Prepended Item';

        const appendedItem = document.createElement('sp-menu-item');
        appendedItem.textContent = 'Appended Item';

        group.prepend(prependedItem);
        group.append(appendedItem);
        await elementUpdated(el);

        await waitUntil(() => {
            return el.childItems.length == 3;
        }, 'expected menu to manage 3 items');

        await elementUpdated(el);

        expect(el.childItems.length).to.equal(3);
        el.focus();

        expect(
            document.activeElement === prependedItem,
            'prepended item is active element?'
        ).to.be.true;
        expect(prependedItem.focused, 'prepended item visibly focused').to.be
            .true;

        await sendKeys({ press: 'ArrowUp' });

        expect(
            document.activeElement === appendedItem,
            'appended item is active element'
        ).to.be.true;
        expect(appendedItem.focused, 'appended visibly focused').to.be.true;
    });

    it('cleans up when tabbing away', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Third Item</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const thirdItem = el.querySelector(
            'sp-menu-item:nth-of-type(3)'
        ) as MenuItem;

        el.focus();

        expect(
            document.activeElement === firstItem,
            'first item is active element'
        ).to.be.true;
        expect(firstItem.focused, 'first item focused').to.be.true;
        el.dispatchEvent(arrowDownEvent());
        el.dispatchEvent(arrowDownEvent());
        expect(thirdItem.focused, 'third item focused').to.be.true;
        // imitate tabbing away
        thirdItem.dispatchEvent(tabEvent());
        el.dispatchEvent(
            new CustomEvent('focusout', {
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);

        el.focus();
        // focus management should start again from the first item.
        await sendKeys({ press: 'ArrowDown' });
        expect(firstItem.focused, 'first item focused again').to.be.true;
    });

    it('handles focus across focused MenuItem removals', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu id="remove">
                <sp-menu-item id="#deselect">Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Third Item</sp-menu-item>
            </sp-menu>
        `);
        await waitUntil(
            () => el.childItems.length == 3,
            'expected menu to manage 3 items',
            { timeout: 2000 } // Increase timeout for CI environment stability
        );

        expect(el.children.length).to.equal(el.childItems.length);

        el.focus();

        const children = [...el.children];

        expect(children[1], 'selected element is focused').to.equal(
            document.activeElement
        );

        await sendKeys({ press: 'ArrowUp' });

        expect(children[0], 'first element is focused').to.equal(
            document.activeElement
        );
        // @TODO: skipping the remaining assertions because it fails on Chromium. Will review in the migration to Spectrum 2.
        if (isFirefox() || isWebKit()) {
            children[0].remove();
            await elementUpdated(el);
            expect(children[1], 'selected element is focused').to.equal(
                document.activeElement
            );

            await sendKeys({ press: 'ArrowUp' });
            expect(children[2], 'last element is focused').to.equal(
                document.activeElement
            );
        }
    });

    it('handles single selection', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item selected>First</sp-menu-item>
                <sp-menu-item>Second</sp-menu-item>
                <sp-menu-item>Third</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        expect(firstItem.getAttribute('role')).to.equal('menuitemradio');
        expect(secondItem.getAttribute('role')).to.equal('menuitemradio');

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.false;
        expect(firstItem.getAttribute('aria-checked')).to.equal('true');
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');
        expect(el.value).to.equal('First');

        const change = oneEvent(el, 'change');
        secondItem.click();
        await change;

        await elementUpdated(el);
        await elementUpdated(firstItem);
        await elementUpdated(secondItem);

        expect(firstItem.selected).to.be.false;
        expect(secondItem.selected).to.be.true;
        expect(firstItem.getAttribute('aria-checked')).to.equal('false');
        expect(secondItem.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Second');
    });
    it('does not make a selection on a right/middle mouse click', async () => {
        const changeSpy = spy();
        const el = await fixture<Menu>(html`
            <sp-menu
                id="debug"
                selects="single"
                @change=${() => {
                    changeSpy();
                }}
            >
                <sp-menu-item>First</sp-menu-item>
                <sp-menu-item>Second</sp-menu-item>
                <sp-menu-item>Third</sp-menu-item>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 3,
            'expected menu to manage 3 items'
        );
        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        //@TODO: this tests opens a context menu outside of the test runner and that should be fixed.
        // send right mouse click to the secondItem
        await mouseClickOn(secondItem, 'center', { button: 'right' });
        await elementUpdated(el);
        await elementUpdated(secondItem);
        await aTimeout(150);
        expect(changeSpy.callCount, 'no change').to.equal(0);

        // send middle mouse click to the secondItem
        await mouseClickOn(secondItem, 'center', { button: 'middle' });
        await elementUpdated(el);
        await elementUpdated(secondItem);
        await aTimeout(150);
        expect(changeSpy.callCount, 'no change').to.equal(0);
    });
    it('handles multiple selection', async () => {
        const changeSpy = spy();
        const el = await fixture<Menu>(html`
            <sp-menu selects="multiple" @change=${() => changeSpy()}>
                <sp-menu-item selected>First</sp-menu-item>
                <sp-menu-item>Second</sp-menu-item>
                <sp-menu-item>Third</sp-menu-item>
            </sp-menu>
        `);

        await waitUntil(
            () => el.childItems.length == 3,
            'expected menu to manage 3 items'
        );
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        expect(firstItem.getAttribute('role')).to.equal('menuitemcheckbox');
        expect(secondItem.getAttribute('role')).to.equal('menuitemcheckbox');

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.false;
        expect(firstItem.getAttribute('aria-checked')).to.equal('true');
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');
        expect(el.value).to.equal('First');
        expect(el.selectedItems.length).to.equal(1);

        let change = oneEvent(el, 'change');
        secondItem.click();
        await change;

        await elementUpdated(el);
        await elementUpdated(firstItem);
        await elementUpdated(secondItem);

        expect(changeSpy.callCount, 'one change').to.equal(1);
        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.true;
        expect(firstItem.getAttribute('aria-checked')).to.equal('true');
        expect(secondItem.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('First,Second');
        expect(el.selectedItems.length).to.equal(2);

        change = oneEvent(el, 'change');
        firstItem.click();
        await change;

        await elementUpdated(el);
        await elementUpdated(firstItem);
        await elementUpdated(secondItem);

        expect(changeSpy.callCount, 'two changes').to.equal(2);
        expect(firstItem.selected).to.be.false;
        expect(secondItem.selected).to.be.true;
        expect(firstItem.getAttribute('aria-checked')).to.equal('false');
        expect(secondItem.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Second');
        expect(el.selectedItems.length).to.equal(1);
    });
    it('can be controlled to manage a single togglable selection', async () => {
        const toggleSingleSelected = (
            event: Event & { target: Menu }
        ): void => {
            event.preventDefault();
            const selected: string[] = [];
            if (event.target.selected.length) {
                selected.push(event.target.selected.at(-1) as string);
            }
            event.target.updateComplete.then(() => {
                event.target.selected = selected;
            });
        };
        const el = await fixture<Menu>(html`
            <sp-menu selects="multiple" @change=${toggleSingleSelected}>
                <sp-menu-item value="1">First</sp-menu-item>
                <sp-menu-item value="2">Second</sp-menu-item>
                <sp-menu-item value="3">Third</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);
        expect(el.selected).to.deep.equal([]);

        const items = [...el.children] as MenuItem[];
        await Promise.all(items.map((child) => child.updateComplete));

        items[0].click();
        await elementUpdated(el);
        expect(el.selected).to.deep.equal(['1']);

        items[0].click();
        await elementUpdated(el);
        expect(el.selected).to.deep.equal([]);

        items[1].click();
        await elementUpdated(el);
        expect(el.selected).to.deep.equal(['2']);

        items[2].click();
        await elementUpdated(el);
        expect(el.selected).to.deep.equal(['3']);
    });

    it('handles long menu with basic selection', async () => {
        const menuItems = Array.from(
            { length: 30 },
            (_, i) => html`
                <sp-menu-item value="${i + 1}">Item ${i + 1}</sp-menu-item>
            `
        );

        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                style="max-height: 200px; overflow-y: auto;"
            >
                ${menuItems}
            </sp-menu>
        `);
        await elementUpdated(el);

        // Wait for all menu items to be properly rendered
        await waitUntil(
            () => el.childItems.length === 30,
            'expected menu to manage 30 items'
        );

        const firstItem = el.querySelector('sp-menu-item') as MenuItem;
        const middleItem = el.querySelector(
            'sp-menu-item:nth-child(15)'
        ) as MenuItem;
        const lastItem = el.querySelector(
            'sp-menu-item:nth-child(30)'
        ) as MenuItem;

        // Test scrolling state management
        expect(el.isScrolling).to.be.false;
        el.isScrolling = true;
        expect(el.isScrolling).to.be.true;
        el.isScrolling = false;
        expect(el.isScrolling).to.be.false;

        // Test normal selection when not scrolling
        firstItem.click();
        await elementUpdated(el);
        await elementUpdated(firstItem);
        expect(firstItem.selected).to.be.true;
        expect(el.value).to.equal('1');

        // Test selection of middle item when not scrolling
        middleItem.click();
        await elementUpdated(el);
        await elementUpdated(middleItem);
        expect(middleItem.selected).to.be.true;
        expect(el.value).to.equal('15');
        expect(firstItem.selected).to.be.false;

        // Test selection of last item when not scrolling
        lastItem.click();
        await elementUpdated(el);
        await elementUpdated(lastItem);
        expect(lastItem.selected).to.be.true;
        expect(el.value).to.equal('30');
        expect(middleItem.selected).to.be.false;

        // Test that the component can be disconnected without errors
        el.remove();
    });

    it('prevents selection during iPad scroll detection', async () => {
        const menuItems = Array.from(
            { length: 30 },
            (_, i) => html`
                <sp-menu-item value="${i + 1}">Item ${i + 1}</sp-menu-item>
            `
        );

        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                style="max-height: 200px; overflow-y: auto;"
            >
                ${menuItems}
            </sp-menu>
        `);
        await elementUpdated(el);

        // Wait for all menu items to be properly rendered
        await waitUntil(
            () => el.childItems.length === 30,
            'expected menu to manage 30 items'
        );

        const middleItem = el.querySelector(
            'sp-menu-item:nth-child(15)'
        ) as MenuItem;
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        // Test normal selection first (no scrolling)
        middleItem.click();
        await elementUpdated(el);
        await elementUpdated(middleItem);
        expect(middleItem.selected).to.be.true;
        expect(el.value).to.equal('15');

        // Reset selection
        firstItem.click();
        await elementUpdated(el);
        await elementUpdated(firstItem);
        expect(firstItem.selected).to.be.true;
        expect(el.value).to.equal('1');

        // Manually set scrolling state to simulate iPad scroll detection
        el.isScrolling = true;
        expect(el.isScrolling).to.be.true;

        // Try to select an item while scrolling is detected
        middleItem.click();
        await elementUpdated(el);
        await elementUpdated(middleItem);

        // Verify that selection is prevented during scroll
        expect(middleItem.selected).to.be.false;
        expect(el.value).to.equal('1'); // Should still be the first item

        // Reset scrolling state
        el.isScrolling = false;
        expect(el.isScrolling).to.be.false;

        // Now try to select the item again (should work since scrolling is reset)
        middleItem.click();
        await elementUpdated(el);
        await elementUpdated(middleItem);
        expect(middleItem.selected).to.be.true;
        expect(el.value).to.equal('15');

        // Test that the component can be disconnected without errors
        el.remove();
    });

    it('detects scrolling via scrollTop changes', async () => {
        const menuItems = Array.from(
            { length: 50 },
            (_, i) => html`
                <sp-menu-item value="${i + 1}">Item ${i + 1}</sp-menu-item>
            `
        );

        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                style="max-height: 150px; overflow-y: auto;"
            >
                ${menuItems}
            </sp-menu>
        `);
        await elementUpdated(el);

        await waitUntil(
            () => el.childItems.length === 50,
            'expected menu to manage 50 items'
        );

        const firstItem = el.querySelector('sp-menu-item') as MenuItem;
        const lastItem = el.querySelector(
            'sp-menu-item:nth-child(50)'
        ) as MenuItem;

        // Select first item
        firstItem.click();
        await elementUpdated(el);
        expect(firstItem.selected).to.be.true;
        expect(el.value).to.equal('1');

        // Simulate scrolling by changing scrollTop
        el.scrollTop = 100;
        await elementUpdated(el);

        // Simulate touch events with scroll position changed
        const touchStart = new TouchEvent('touchstart', {
            touches: [{ clientY: 100 } as Touch],
        });
        el.dispatchEvent(touchStart);
        await aTimeout(10);

        // Simulate touch move - scrollTop already changed
        const touchMove = new TouchEvent('touchmove', {
            touches: [{ clientY: 90 } as Touch],
        });
        el.dispatchEvent(touchMove);
        await aTimeout(10);

        // isScrolling should be true due to scrollTop change detection
        expect(el.isScrolling).to.be.true;

        // Try to select an item while scrolling
        lastItem.click();
        await elementUpdated(el);
        await elementUpdated(lastItem);

        // Selection should be prevented
        expect(lastItem.selected).to.be.false;
        expect(el.value).to.equal('1'); // Should still be the first item

        // Trigger touchend to reset state
        const touchEnd = new TouchEvent('touchend');
        el.dispatchEvent(touchEnd);

        // Wait for the 150ms timeout to complete
        await aTimeout(200);

        // Now selection should work
        lastItem.click();
        await elementUpdated(el);
        await elementUpdated(lastItem);
        expect(lastItem.selected).to.be.true;
        expect(el.value).to.equal('50');

        el.remove();
    });

    it('resets scroll detection after 150ms delay', async () => {
        const menuItems = Array.from(
            { length: 20 },
            (_, i) => html`
                <sp-menu-item value="${i + 1}">Item ${i + 1}</sp-menu-item>
            `
        );

        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                style="max-height: 200px; overflow-y: auto;"
            >
                ${menuItems}
            </sp-menu>
        `);
        await elementUpdated(el);

        await waitUntil(
            () => el.childItems.length === 20,
            'expected menu to manage 20 items'
        );

        const item = el.querySelector('sp-menu-item:nth-child(10)') as MenuItem;

        // Simulate scroll detection
        el.isScrolling = true;
        expect(el.isScrolling).to.be.true;

        // Simulate touchend
        const touchEnd = new TouchEvent('touchend');
        el.dispatchEvent(touchEnd);

        // Should still be scrolling immediately after touchend
        expect(el.isScrolling).to.be.true;

        // Wait 100ms - should still be scrolling (delay is 150ms)
        await aTimeout(100);
        expect(el.isScrolling).to.be.true;

        // Wait another 60ms (total 160ms) - should be reset now
        await aTimeout(60);
        expect(el.isScrolling).to.be.false;

        // Selection should now work
        item.click();
        await elementUpdated(el);
        await elementUpdated(item);
        expect(item.selected).to.be.true;
        expect(el.value).to.equal('10');

        el.remove();
    });

    it('handles rapid touch-scroll-tap sequence', async () => {
        const menuItems = Array.from(
            { length: 30 },
            (_, i) => html`
                <sp-menu-item value="${i + 1}">Item ${i + 1}</sp-menu-item>
            `
        );

        const el = await fixture<Menu>(html`
            <sp-menu
                selects="single"
                style="max-height: 200px; overflow-y: auto;"
            >
                ${menuItems}
            </sp-menu>
        `);
        await elementUpdated(el);

        await waitUntil(
            () => el.childItems.length === 30,
            'expected menu to manage 30 items'
        );

        const item = el.querySelector('sp-menu-item:nth-child(15)') as MenuItem;

        // Simulate rapid scroll
        const touchStart = new TouchEvent('touchstart', {
            touches: [{ clientY: 150 } as Touch],
        });
        el.dispatchEvent(touchStart);
        await aTimeout(5);

        // Quick move (within 300ms threshold)
        const touchMove = new TouchEvent('touchmove', {
            touches: [{ clientY: 130 } as Touch],
        });
        el.dispatchEvent(touchMove);
        await aTimeout(5);

        // Touchend
        const touchEnd = new TouchEvent('touchend');
        el.dispatchEvent(touchEnd);
        await aTimeout(5);

        // Immediate tap attempt (should be blocked)
        item.click();
        await elementUpdated(el);
        await elementUpdated(item);

        // Should not be selected due to recent scroll
        expect(item.selected).to.be.false;
        expect(el.value).to.equal('');

        // Wait for reset
        await aTimeout(160);

        // Now tap should work
        item.click();
        await elementUpdated(el);
        await elementUpdated(item);
        expect(item.selected).to.be.true;
        expect(el.value).to.equal('15');

        el.remove();
    });

    it('does not steal focus from input elements on mouseover', async () => {
        const el = await fixture<Menu>(html`
            <div>
                <sp-search
                    id="test-search"
                    placeholder="Search input..."
                ></sp-search>
                <sp-textfield
                    id="test-textfield"
                    placeholder="Textfield input..."
                ></sp-textfield>
                <sp-number-field
                    id="test-number"
                    placeholder="Number input..."
                ></sp-number-field>
                <sp-combobox
                    id="test-combobox"
                    placeholder="Combobox input..."
                ></sp-combobox>
                <sp-color-field
                    id="test-color"
                    placeholder="Color input..."
                ></sp-color-field>
                <input id="test-native" placeholder="Native input..." />

                <sp-popover open>
                    <sp-menu>
                        <sp-menu-item id="menu-item-1">
                            Menu Item 1
                        </sp-menu-item>
                        <sp-menu-item id="menu-item-2">
                            Menu Item 2
                        </sp-menu-item>
                        <sp-menu-item id="menu-item-3">
                            Menu Item 3
                        </sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </div>
        `);

        await elementUpdated(el);

        const searchInput = el.querySelector('#test-search') as HTMLElement;
        const textfieldInput = el.querySelector(
            '#test-textfield'
        ) as HTMLElement;
        const numberInput = el.querySelector('#test-number') as HTMLElement;
        const comboboxInput = el.querySelector('#test-combobox') as HTMLElement;
        const colorInput = el.querySelector('#test-color') as HTMLElement;
        const nativeInput = el.querySelector(
            '#test-native'
        ) as HTMLInputElement;

        const menuItem1 = el.querySelector('#menu-item-1') as MenuItem;
        const menuItem2 = el.querySelector('#menu-item-2') as MenuItem;
        const menuItem3 = el.querySelector('#menu-item-3') as MenuItem;

        // Test with sp-search
        searchInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(searchInput);

        await mouseMoveOver(menuItem1);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            searchInput,
            'sp-search should retain focus on mouseover'
        );

        await mouseMoveOver(menuItem2);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            searchInput,
            'sp-search should retain focus on mouseover'
        );

        // Test with sp-textfield
        textfieldInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(textfieldInput);

        await mouseMoveOver(menuItem1);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            textfieldInput,
            'sp-textfield should retain focus on mouseover'
        );

        // Test with sp-number-field
        numberInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(numberInput);

        await mouseMoveOver(menuItem2);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            numberInput,
            'sp-number-field should retain focus on mouseover'
        );

        // Test with sp-combobox
        comboboxInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(comboboxInput);

        await mouseMoveOver(menuItem3);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            comboboxInput,
            'sp-combobox should retain focus on mouseover'
        );

        // Test with sp-color-field
        colorInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(colorInput);

        await mouseMoveOver(menuItem1);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            colorInput,
            'sp-color-field should retain focus on mouseover'
        );

        // Test with native input
        nativeInput.focus();
        await elementUpdated(el);
        expect(document.activeElement).to.equal(nativeInput);

        await mouseMoveOver(menuItem2);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(
            nativeInput,
            'native input should retain focus on mouseover'
        );
    });
});
