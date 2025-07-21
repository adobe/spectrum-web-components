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
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { isFirefox, isWebKit } from '@spectrum-web-components/shared';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowUpEvent,
    fixture,
    sendMouseTo,
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
        await sendKeys({
            press: 'ArrowDown',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'Enter',
        });

        const clipboardText = await navigator.clipboard.readText();
        await elementUpdated(el);

        expect(clipboardText).to.equal('Other');
    });

    it('accepts Numpad keys', async function () {
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
        await sendKeys({
            press: 'ArrowDown',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'NumpadEnter',
        });

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

        await sendMouseTo(secondItem);

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
        await nextFrame();

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
            { timeout: 100 }
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
        //@todo this test fails on Chromium
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

        // send right mouse click to the secondItem
        sendMouseTo(secondItem, 'click', 'right');
        await elementUpdated(el);
        await elementUpdated(secondItem);
        await aTimeout(150);
        expect(changeSpy.callCount, 'no change').to.equal(0);

        // send middle mouse click to the secondItem
        await sendMouseTo(secondItem, 'click', 'middle');
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
        await nextFrame();
        await nextFrame();
        expect(el.selected).to.deep.equal([]);

        const items = [...el.children] as MenuItem[];
        await Promise.all(items.map((child) => child.updateComplete));

        items[0].click();
        await nextFrame();
        await nextFrame();
        expect(el.selected).to.deep.equal(['1']);

        items[0].click();
        await nextFrame();
        await nextFrame();
        expect(el.selected).to.deep.equal([]);

        items[1].click();
        await nextFrame();
        await nextFrame();
        expect(el.selected).to.deep.equal(['2']);

        items[2].click();
        await nextFrame();
        await nextFrame();
        expect(el.selected).to.deep.equal(['3']);
    });

    it('prevents selection when scrolling is detected', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item value="1">Item 1</sp-menu-item>
                <sp-menu-item value="2">Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        // Manually set scrolling state to simulate iPad scrolling
        menu.isScrolling = true;

        // Try to select an item while scrolling
        const clickEvent = new MouseEvent('click', { button: 0 });
        firstItem.dispatchEvent(clickEvent);

        // Verify selection is prevented
        expect(firstItem.selected).to.be.false;
        expect(el.value).to.equal('');
    });

    it('allows selection when not scrolling', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item value="1">Item 1</sp-menu-item>
                <sp-menu-item value="2">Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        // Verify not scrolling initially
        expect(menu.isScrolling).to.be.false;

        // Try to select an item when not scrolling
        firstItem.click();

        // Wait for the selection to be processed
        await elementUpdated(el);
        await elementUpdated(firstItem);

        // Verify selection is allowed
        expect(firstItem.selected).to.be.true;
        expect(el.value).to.equal('1');
    });

    it('tests scrolling detection logic', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // Test that scrolling state can be set and reset
        expect(menu.isScrolling).to.be.false;

        menu.isScrolling = true;
        expect(menu.isScrolling).to.be.true;

        menu.isScrolling = false;
        expect(menu.isScrolling).to.be.false;
    });

    it('tests touch event listener cleanup', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // Test that the component can be disconnected without errors
        el.remove();
    });

    it('calls handleTouchStart when touchstart event is dispatched', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // Create a mock TouchEvent-like object
        const mockTouchEvent = {
            touches: [{ clientY: 200 }],
            length: 1,
        };

        // Call the touch handler directly
        menu.handleTouchStart(mockTouchEvent);

        // Verify the touch start properties are set
        expect(menu.touchStartY).to.equal(200);
        expect(menu.touchStartTime).to.be.greaterThan(0);
        expect(menu.isScrolling).to.be.false;
    });

    it('calls handleTouchMove and detects scrolling', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // First, set up the touch start
        const mockTouchStartEvent = {
            touches: [{ clientY: 200 }],
            length: 1,
        };
        menu.handleTouchStart(mockTouchStartEvent);

        // Wait a bit to ensure time difference
        await aTimeout(50);

        // Now simulate touch move with significant movement
        const mockTouchMoveEvent = {
            touches: [{ clientY: 250 }], // 50px movement
            length: 1,
        };
        menu.handleTouchMove(mockTouchMoveEvent);

        // Verify scrolling is detected
        expect(menu.isScrolling).to.be.true;
    });

    it('calls handleTouchMove but does not detect scrolling for small movements', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // First, set up the touch start
        const mockTouchStartEvent = {
            touches: [{ clientY: 200 }],
            length: 1,
        };
        menu.handleTouchStart(mockTouchStartEvent);

        // Now simulate touch move with small movement
        const mockTouchMoveEvent = {
            touches: [{ clientY: 205 }], // 5px movement
            length: 1,
        };
        menu.handleTouchMove(mockTouchMoveEvent);

        // Verify scrolling is not detected for small movements
        expect(menu.isScrolling).to.be.false;
    });

    it('calls handleTouchEnd and resets scrolling state', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // Set scrolling state to true
        menu.isScrolling = true;
        expect(menu.isScrolling).to.be.true;

        // Call the touch end handler
        menu.handleTouchEnd();

        // Wait for the timeout to reset scrolling state
        await aTimeout(150);

        // Verify scrolling state is reset
        expect(menu.isScrolling).to.be.false;
    });

    it('ignores touch events with multiple touches', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu>
                <sp-menu-item>Item 1</sp-menu-item>
                <sp-menu-item>Item 2</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menu = el as any;

        // Create a mock TouchEvent with multiple touches
        const mockTouchEvent = {
            touches: [{ clientY: 200 }, { clientY: 250 }],
            length: 2,
        };

        const initialTouchStartY = menu.touchStartY;
        const initialTouchStartTime = menu.touchStartTime;

        // Call the touch handler
        menu.handleTouchStart(mockTouchEvent);

        // Verify touch properties are not updated for multiple touches
        expect(menu.touchStartY).to.equal(initialTouchStartY);
        expect(menu.touchStartTime).to.equal(initialTouchStartTime);
    });

    it('focuses on first selected item when available', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item value="item1">Item 1</sp-menu-item>
                <sp-menu-item value="item2" selected>Item 2</sp-menu-item>
                <sp-menu-item value="item3">Item 3</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // Focus on the first selected item
        el.focusOnFirstSelectedItem();

        // Verify the selected item is focused
        const selectedItem = el.querySelector('sp-menu-item[selected]');
        expect(selectedItem).to.exist;
        expect(selectedItem).to.equal(document.activeElement);
    });

    it('focuses on menu when no selected item is available', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item value="item1">Item 1</sp-menu-item>
                <sp-menu-item value="item2">Item 2</sp-menu-item>
                <sp-menu-item value="item3">Item 3</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // Focus on first selected item (none selected)
        el.focusOnFirstSelectedItem();

        // Verify the menu itself is focused
        expect(el).to.equal(document.activeElement);
    });

    it('focuses on first selected item with preventScroll option', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item value="item1">Item 1</sp-menu-item>
                <sp-menu-item value="item2" selected>Item 2</sp-menu-item>
                <sp-menu-item value="item3">Item 3</sp-menu-item>
            </sp-menu>
        `);
        await elementUpdated(el);

        // Focus on the first selected item with preventScroll
        el.focusOnFirstSelectedItem({ preventScroll: true });

        // Verify the selected item is focused
        const selectedItem = el.querySelector('sp-menu-item[selected]');
        expect(selectedItem).to.exist;
        expect(selectedItem).to.equal(document.activeElement);
    });
});
