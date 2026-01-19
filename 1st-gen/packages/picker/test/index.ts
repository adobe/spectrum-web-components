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

import type { Picker } from '@spectrum-web-components/picker';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
    aTimeout,
    elementUpdated,
    expect,
    fixture,
    fixtureCleanup,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { FieldLabel } from '@spectrum-web-components/field-label/src/FieldLabel.js';
import type { Icon } from '@spectrum-web-components/icon';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import type { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/picker/sp-picker.js';
import { SAFARI_FOCUS_RING_CLASS } from '@spectrum-web-components/picker/src/InteractionController.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { isWebKit } from '@spectrum-web-components/shared';
import '@spectrum-web-components/shared/src/focus-visible.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Tooltip } from '@spectrum-web-components/tooltip';

import { Button } from '@spectrum-web-components/button';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import {
    a11ySnapshot,
    findAccessibilityNode,
    resetMouse,
    sendKeys,
    setViewport,
} from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    arrowDownEvent,
    arrowRightEvent,
    arrowUpEvent,
    ignoreResizeObserverLoopError,
    mouseClickAway,
    mouseClickOn,
    sendShiftTabKey,
    sendTabKey,
    fixture as styledFixture,
    testForLitDevWarnings,
    tEvent,
} from '../../../test/testing-helpers.js';
import { M as pending } from '../stories/picker-pending.stories.js';
import {
    Default,
    disabled,
    dynamicIcons,
    iconsOnly,
    noVisibleLabel,
    slottedLabel,
    tooltip,
} from '../stories/picker.stories.js';

export type TestablePicker = { optionsMenu: Menu };

ignoreResizeObserverLoopError(before, after);

const isMenuActiveElement = function (el: Picker): boolean {
    return (
        document.activeElement?.tagName === 'SP-MENU-ITEM' &&
        el.contains(document.activeElement)
    );
};

/**
 * Helper function to wait for focus events with timeout protection
 * Provides fallback verification for browsers with inconsistent focus event timing
 */
const waitForFocusEvent = async (
    focusPromise: Promise<CustomEvent<FocusEvent>>,
    expectedElement: Element,
    timeoutMs: number = 3000
): Promise<void> => {
    try {
        await Promise.race([
            focusPromise,
            new Promise((_, reject) =>
                setTimeout(
                    () => reject(new Error('Focus event timed out')),
                    timeoutMs
                )
            ),
        ]);
    } catch (error) {
        // Fallback: verify focus manually for browsers with inconsistent focus events
        await waitUntil(
            () => document.activeElement === expectedElement,
            `Expected element should be focused`,
            { timeout: 2000 }
        );
    }
};

/**
 * Helper function to wait for element to be ready with proper synchronization
 * Replaces manual nextFrame() calls with semantic waiting
 */
const waitForElementReady = async (element: HTMLElement): Promise<void> => {
    await elementUpdated(element);
    await nextFrame();
    // Additional frame for complex elements that need extra rendering time
    if (element.shadowRoot) {
        await nextFrame();
    }
};

/**
 * Helper function to safely open picker and wait for it to be ready
 * Handles timing differences across browsers
 */
const openPickerAndWait = async (picker: Picker): Promise<void> => {
    const opened = oneEvent(picker, 'sp-opened');
    picker.open = true;
    await opened;
    await waitForElementReady(picker);
    await waitUntil(() => picker.open === true, 'Picker should be open');
};

export function runPickerTests(): void {
    let el: Picker;
    const pickerFixture = async (): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(html`
            <sp-theme scale="medium" color="light" system="spectrum">
                <sp-field-label for="picker">Where do you live?</sp-field-label>
                <sp-picker id="picker" label="Where do you live?">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            </sp-theme>
        `);

        return test.querySelector('sp-picker') as Picker;
    };
    describe('accessibility model', () => {
        it('accessible with "<sp-field-label>"', async function () {
            const test = await fixture<HTMLDivElement>(html`
                <div>
                    ${Default({
                        onChange: () => {
                            return;
                        },
                    })}
                </div>
            `);
            const el = test.querySelector('sp-picker') as Picker;

            type NamedNode = { name: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) =>
                        node.name ===
                        'Select a Country with a very long label, too long, in fact Where do you live?'
                ),
                '`name` is the label text'
            ).to.not.be.null;

            el.value = 'option-2';
            await elementUpdated(el);
            // Allow the snapshot to settle.
            await nextFrame();
            await nextFrame();
            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Select Inverse Where do you live?'
                ),
                '`name` is the the selected item text plus the label text'
            ).to.not.be.null;
        });
        it('accessible with "label" attribute', async () => {
            const test = await fixture<HTMLDivElement>(html`
                <div>
                    ${noVisibleLabel({
                        onChange: () => {
                            return;
                        },
                    })}
                </div>
            `);
            const el = test.querySelector('sp-picker') as Picker;

            type NamedNode = { name: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Where do you live?'
                ),
                '`name` is the label text'
            ).to.not.be.null;

            el.value = 'option-2';
            await elementUpdated(el);
            // Allow the snapshot to settle.
            await nextFrame();
            await nextFrame();
            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Select Inverse Where do you live?'
                ),
                '`name` is the the selected item text plus the label text'
            ).to.not.be.null;
        });
        it('accessible with "label" slot', async function () {
            const test = await fixture<HTMLDivElement>(html`
                <div>
                    ${slottedLabel({
                        onChange: () => {
                            return;
                        },
                    })}
                </div>
            `);
            const el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            type NamedNode = { name: string; description: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            let name = 'Where do you live?';

            let node = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === name
            );

            expect(
                node,
                `node not available: ${JSON.stringify(snapshot, null, '  ')}`
            ).to.not.be.null;

            el.value = 'option-2';
            await elementUpdated(el);
            // Allow the snapshot to settle.
            await nextFrame();
            await nextFrame();
            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            name = 'Select Inverse Where do you live?';

            node = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === name
            );

            expect(
                node,
                `node not available: ${JSON.stringify(snapshot, null, '  ')}`
            ).to.not.be.null;
        });
    });
    describe('standard', () => {
        beforeEach(async () => {
            el = await pickerFixture();
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();
        });
        it('loads accessibly', async () => {
            await expect(el).to.be.accessible();
        });
        it('closes accessibly', async () => {
            // Focus the picker and wait for it to be ready
            const focused = oneEvent(el, 'focus');
            el.focus();
            await waitForFocusEvent(focused, el);
            await waitForElementReady(el);

            expect(el.shadowRoot.activeElement).to.equal(el.button);

            // Open picker using helper function
            await openPickerAndWait(el);

            expect(el.open, 'open?').to.be.true;
            const accessibleCloseButton = el.shadowRoot.querySelector(
                '.visually-hidden button'
            ) as HTMLButtonElement;
            expect(accessibleCloseButton).to.have.attribute(
                'aria-label',
                'Dismiss'
            );

            // Close picker and wait for completion
            const closed = oneEvent(el, 'sp-closed');
            accessibleCloseButton.click();
            await closed;
            await waitForElementReady(el);

            expect(el.open, 'open?').to.be.false;
            expect(el.shadowRoot.activeElement).to.equal(el.button);
            expect(document.activeElement).to.eq(el);
        });
        it('accepts new selected item content', async () => {
            await nextFrame();
            await nextFrame();
            const option2 = el.querySelector('[value="option-2"') as MenuItem;
            el.value = 'option-2';
            await elementUpdated(option2);
            await elementUpdated(el);
            await aTimeout(150);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(
                'Select Inverse'
            );
            let itemUpdated = oneEvent(el, 'sp-menu-item-added-or-updated');
            const newLabel1 = 'Invert Selection';
            option2.innerHTML = newLabel1;
            await itemUpdated;
            await elementUpdated(el);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(newLabel1);
            itemUpdated = oneEvent(el, 'sp-menu-item-added-or-updated');
            const newLabel2 = 'Other option';
            option2.childNodes[0].textContent = newLabel2;
            await itemUpdated;
            await elementUpdated(el);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(newLabel2);
        });
        it('accepts new selected item content when open', async () => {
            await nextFrame();
            const option2 = el.querySelector('[value="option-2"') as MenuItem;
            el.value = 'option-2';
            await elementUpdated(el);
            await aTimeout(150);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(
                'Select Inverse'
            );
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            const itemUpdated = oneEvent(
                option2,
                'sp-menu-item-added-or-updated'
            );
            option2.innerHTML = 'Invert Selection';
            await itemUpdated;
            await elementUpdated(el);
            await aTimeout(150);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(
                'Invert Selection'
            );
        });
        it('unsets value when children removed', async () => {
            await nextFrame();
            el.value = 'option-2';

            await elementUpdated(el);
            await aTimeout(150);
            expect(el.value).to.equal('option-2');
            expect((el.button.textContent || '').trim()).to.include(
                'Select Inverse'
            );

            const items = el.querySelectorAll('sp-menu-item');
            items.forEach((item) => {
                item.remove();
            });
            await elementUpdated(el);
            await nextFrame();
            await aTimeout(150);
            expect(
                (el as unknown as TestablePicker).optionsMenu.childItems.length
            ).to.equal(0);
            if ('showPopover' in document.createElement('div')) {
                return;
            }
            expect(el.value).to.equal('');
            expect((el.button.textContent || '').trim()).to.not.include(
                'Select Inverse'
            );
        });
        it('accepts a new item and value at the same time', async () => {
            el.value = 'option-2';

            await elementUpdated(el);
            expect(el.value).to.equal('option-2');

            const item = document.createElement('sp-menu-item');
            item.value = 'option-new';
            item.textContent = 'New Option';

            el.append(item);
            await elementUpdated(el);

            el.value = 'option-new';

            await elementUpdated(el);
            expect(el.value).to.equal('option-new');
        });
        it('accepts a new item that can be selected', async () => {
            el.value = 'option-2';

            await elementUpdated(el);
            expect(el.value).to.equal('option-2');
            const item = document.createElement('sp-menu-item');
            item.value = 'option-new';
            item.textContent = 'New Option';

            el.append(item);
            await nextFrame();
            await elementUpdated(el);

            let opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            // Overlaid content is outside of the context of the Picker element
            // and cannot be managed via its updateComplete cycle.
            await nextFrame();

            const close = oneEvent(el, 'sp-closed');
            item.click();
            await close;
            // Overlaid content is outside of the context of the Picker element
            // and cannot be managed via its updateComplete cycle.
            await nextFrame();

            expect(el.value, 'first time').to.equal('option-new');

            opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            // Overlaid content is outside of the context of the Picker element
            // and cannot be managed via its updateComplete cycle.
            await nextFrame();

            expect(el.value, 'second time').to.equal('option-new');
        });
        it('shows label when menu-items are added after value is set', async () => {
            // Create a picker with value set but no menu-items initially
            const pickerWithoutItems = await fixture<HTMLDivElement>(html`
                <sp-theme scale="medium" color="light" system="spectrum">
                    <sp-field-label for="picker-delayed">
                        Test Picker
                    </sp-field-label>
                    <sp-picker
                        id="picker-delayed"
                        label="Test Picker"
                        value="item-2"
                    ></sp-picker>
                </sp-theme>
            `);
            const delayedPicker = pickerWithoutItems.querySelector(
                'sp-picker'
            ) as Picker;

            await elementUpdated(delayedPicker);
            await nextFrame();

            // Value should be preserved even though no menu-items exist yet
            expect(delayedPicker.value).to.equal('item-2');
            // Button should show placeholder label since no menu-items match yet
            expect(
                (delayedPicker.button.textContent || '').trim()
            ).to.not.include('Finish');

            // Now add menu-items
            const item1 = document.createElement('sp-menu-item');
            item1.value = 'item-1';
            item1.textContent = 'Save';
            delayedPicker.appendChild(item1);

            const item2 = document.createElement('sp-menu-item');
            item2.value = 'item-2';
            item2.textContent = 'Finish';
            delayedPicker.appendChild(item2);

            const item3 = document.createElement('sp-menu-item');
            item3.value = 'item-3';
            item3.textContent = 'Review';
            delayedPicker.appendChild(item3);

            // Wait for menu-items to be registered and selection to be managed
            await elementUpdated(delayedPicker);
            await nextFrame();
            await nextFrame();
            await aTimeout(150);

            // Value should still be preserved
            expect(delayedPicker.value).to.equal('item-2');
            // Button should now show the label from the matching menu-item
            expect((delayedPicker.button.textContent || '').trim()).to.include(
                'Finish'
            );
            // selectedItem should be set
            expect(delayedPicker.selectedItem?.value).to.equal('item-2');
        });
        it('manages its "name" value in the accessibility tree', async () => {
            await nextFrame();
            type NamedNode = { name: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Where do you live?'
                ),
                '`name` is the label text'
            ).to.not.be.null;

            el.value = 'option-2';
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();
            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Select Inverse Where do you live?'
                ),
                '`name` is the selected item text plus the label text'
            ).to.not.be.null;
        });
        it('renders invalid accessibly', async () => {
            el.invalid = true;
            await elementUpdated(el);

            expect(el.invalid).to.be.true;
            await expect(el).to.be.accessible();
        });
        it('renders selection accessibly', async () => {
            el.value = 'option-2';
            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });
        it('opens with visible focus on a menu item on `DownArrow`', async () => {
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;

            expect(
                firstItem.focused,
                'first item should not be visually focused before opening'
            ).to.be.false;

            // Focus picker with robust waiting
            const focused = oneEvent(el, 'focus');
            el.focus();
            await waitForFocusEvent(focused, el);
            await waitForElementReady(el);

            // Open with ArrowDown and wait for completion
            const opened = oneEvent(el, 'sp-opened');
            await sendKeys({ press: 'ArrowDown' });
            await opened;
            await waitForElementReady(el);

            expect(el.open, 'picker should be open').to.be.true;

            // Wait for first item to receive visual focus
            await waitUntil(
                () => firstItem.focused,
                'first item should be visually focused after opening',
                { timeout: 2000 }
            );
            expect(
                firstItem.focused,
                'first item should be visually focused after opening'
            ).to.be.true;

            // Close with Escape and wait for completion
            const closed = oneEvent(el, 'sp-closed');
            await sendKeys({ press: 'Escape' });
            await closed;
            await waitForElementReady(el);

            expect(el.open, 'picker should be closed').to.be.false;

            expect(document.activeElement).to.equal(el);
            expect(el.shadowRoot.activeElement).to.equal(el.button);
            await waitUntil(
                () => !firstItem.focused,
                'finally, not visually focused'
            );
            expect(
                firstItem.focused,
                'first item should not be visually focused after closing'
            ).to.be.false;
        });
        it('opens with visible focus on a menu item on `Space`', async function () {
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;

            expect(
                firstItem.focused,
                'should not be visually focused before opening'
            ).to.be.false;

            // Focus picker with robust waiting
            const focused = oneEvent(el, 'focus');
            el.focus();
            await waitForFocusEvent(focused, el);
            await waitForElementReady(el);

            // Open with Space and wait for completion
            const opened = oneEvent(el, 'sp-opened');
            await sendKeys({ press: 'Space' });
            await opened;
            await waitForElementReady(el);

            expect(el.open, 'open?').to.be.true;

            // Wait for first item to receive visual focus
            await waitUntil(
                () => firstItem.focused,
                'should be visually focused after opening',
                { timeout: 2000 }
            );
            expect(
                firstItem.focused,
                'should be visually focused after opening'
            ).to.be.true;

            // Close with Escape and wait for completion
            const closed = oneEvent(el, 'sp-closed');
            await sendKeys({ press: 'Escape' });
            await closed;
            await waitForElementReady(el);

            expect(el.open, 'picker should be closed').to.be.false;

            expect(
                document.activeElement === el,
                `focused ${document.activeElement?.localName} instead of back on Picker`
            ).to.be.true;
            expect(
                el.shadowRoot.activeElement === el.button,
                `focused ${el.shadowRoot.activeElement?.localName} instead of back on button`
            ).to.be.true;
            await waitUntil(
                () => !firstItem.focused,
                'finally, not visually focused'
            );
            expect(
                firstItem.focused,
                'first item should not be visually focused after closing'
            ).to.be.false;
        });
        it('opens, on click, with visible focus NOT on a menu item', async () => {
            await nextFrame();
            await nextFrame();
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;

            expect(firstItem.focused, 'not visually focused').to.be.false;
            const opened = oneEvent(el, 'sp-opened');
            await mouseClickOn(el.button);
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(firstItem.focused, 'firstItem focused after click?').to.be
                .false;
            expect(firstItem).to.not.equal(document.activeElement);
        });
        it('opens and selects in a single pointer button interaction', async () => {
            await nextFrame();
            await nextFrame();
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;

            expect(el.value).to.not.equal(thirdItem.value);
            const opened = oneEvent(el, 'sp-opened');
            await sendMouse([
                {
                    type: 'move',
                    position: [el.button],
                },
                {
                    type: 'down',
                },
            ]);
            await opened;

            const closed = oneEvent(el, 'sp-closed');
            await sendMouse([
                {
                    type: 'move',
                    position: [thirdItem],
                },
                {
                    type: 'up',
                },
            ]);
            await closed;

            expect(el.open, 'open?').to.be.false;
            expect(el.value).to.equal(thirdItem.value);
        });
        it('opens/closes multiple times', async () => {
            expect(!el.open, 'starts closed').to.be.true;

            // Helper function to wait for open state change
            const waitForOpenState = async (
                expectedState: boolean,
                description: string
            ): Promise<void> => {
                // The DesktopController.handleActivate() method, it has logic that ignores click events if the open state changed between pointerdown and click.
                // Wait for any previous interaction to complete
                await aTimeout(140);

                await mouseClickOn(el.button);

                // Wait for the open property to change
                await waitUntil(() => el.open === expectedState, description);

                await elementUpdated(el);
                expect(el.open, description).to.equal(expectedState);
            };

            // First click - open the picker
            await waitForOpenState(true, 'first click opens');

            // Second click - close the picker
            await waitForOpenState(false, 'second click closes');

            // Third click - open again
            await waitForOpenState(true, 'third click opens');

            // Fourth click - close again
            await waitForOpenState(false, 'fourth click closes');
        });
        it('closes when becoming disabled', async () => {
            expect(el.open, 'open before click?').to.be.false;
            el.click();
            await elementUpdated(el);

            expect(el.open, 'open after click?').to.be.true;
            el.disabled = true;
            await closed;

            expect(el.open, 'open after disabled?').to.be.false;
        });
        it('closes when clicking away', async () => {
            el.id = 'closing';
            const other = document.createElement('div');
            document.body.append(other);

            await elementUpdated(el);

            expect(el.open, 'open?').to.be.false;
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;
            await elementUpdated(el);

            expect(el.open, 'open?').to.be.true;
            const closed = oneEvent(el, 'sp-closed');
            other.click();
            closed;
            await elementUpdated(el);

            other.remove();
        });
        it('selects', async () => {
            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            const closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;

            expect(el.open, 'open?').to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Select Inverse');
            expect(el.value).to.equal('option-2');
        });
        it('re-selects', async () => {
            const firstItem = el.querySelector(
                'sp-menu-item:nth-of-type(1)'
            ) as MenuItem;
            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            let opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            let closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;

            expect(el.open, 'open?').to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Select Inverse');
            expect(el.value).to.equal('option-2');

            opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.equal('Select Inverse');
            expect(el.value).to.equal('option-2');

            closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await closed;

            expect(el.open, 'open?').to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Deselect');
            expect(el.value).to.equal('Deselect');
        });
        it('dispatches bubbling and composed events', async () => {
            const changeSpy = spy();
            const parent = el.parentElement as HTMLElement;
            (parent.shadowRoot as ShadowRoot).append(el);
            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            parent.addEventListener('change', () => changeSpy());

            expect(el.value).to.equal('');

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            const closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;

            expect(el.value).to.equal(secondItem.value);
            expect(changeSpy.calledOnce).to.be.true;
        });
        it('can have selection prevented', async () => {
            const preventChangeSpy = spy();
            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');
            expect(secondItem.selected).to.be.false;

            el.addEventListener('change', (event: Event): void => {
                event.preventDefault();
                preventChangeSpy();
            });

            const changed = oneEvent(el, 'change');
            secondItem.click();
            // The `change` event is dispatched _after_ the `updateComplete` promise.
            await changed;
            await elementUpdated(el);
            expect(
                preventChangeSpy.calledOnce,
                preventChangeSpy.callCount.toString()
            ).to.be.true;
            expect(secondItem.selected, 'selection prevented').to.be.false;
            expect(el.open, 'open?').to.be.true;
        });
        it('should return focus after click', async () => {
            const input = document.createElement('input');
            document.body.append(input);

            await elementUpdated(el);

            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            const opened = oneEvent(el, 'sp-opened');

            await mouseClickOn(el.button);

            await opened;
            await elementUpdated(el);

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');
            expect(secondItem.selected).to.be.false;

            secondItem.click();
            await waitUntil(() => document.activeElement === el, 'focused', {
                timeout: 300,
            });

            expect(el.open, 'open?').to.be.false;
            expect(el.value, 'value changed').to.equal('option-2');
            expect(secondItem.selected, 'selected changed').to.be.true;
            input.remove();
        });
        it('should throw focus after `change`', async () => {
            const input = document.createElement('input');
            document.body.append(input);

            await elementUpdated(el);

            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;
            await elementUpdated(el);

            expect(el.open, 'open?').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');
            expect(secondItem.selected).to.be.false;

            el.addEventListener('change', (): void => {
                input.focus();
            });

            // Clicking on an item in the picker triggers a change event
            secondItem.click();
            await waitUntil(
                () => document.activeElement === input,
                'focus throw',
                { timeout: 300 }
            );

            expect(el.open, 'open?').to.be.false;
            expect(el.value, 'value changed').to.equal('option-2');
            expect(secondItem.selected, 'selected changed').to.be.true;
            input.remove();
        });
        it('opens on ArrowUp', async () => {
            const button = el.button as HTMLButtonElement;

            el.focus();
            await elementUpdated(el);

            expect(el.open, 'inially closed').to.be.false;

            button.dispatchEvent(tEvent());
            await elementUpdated(el);

            expect(el.open, 'still closed').to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            button.dispatchEvent(arrowUpEvent());
            await elementUpdated(el);

            expect(el.open, 'open by ArrowUp').to.be.true;
            await opened;

            const closed = oneEvent(el, 'sp-closed');
            await sendKeys({ press: 'Escape' });
            await closed;
            expect(el.open, 'should be closed after escape key is pressed').to
                .be.false;
        });
        it('opens on ArrowDown', async () => {
            const firstItem = el.querySelector(
                'sp-menu-item:nth-of-type(1)'
            ) as MenuItem;
            const button = el.button as HTMLButtonElement;

            el.focus();
            await elementUpdated(el);

            expect(el.open, 'inially closed').to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            button.dispatchEvent(arrowDownEvent());
            await opened;
            await elementUpdated(el);

            expect(el.open, 'open by ArrowDown').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            const closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await closed;
            await elementUpdated(el);

            expect(el.open, 'open?').to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Deselect');
            expect(el.value).to.equal('Deselect');
        });
        it('quick selects on ArrowLeft/Right', async () => {
            const selectionSpy = spy();
            el.addEventListener('change', (event: Event) => {
                const { value } = event.target as Picker;
                selectionSpy(value);
            });

            el.focus();
            await elementUpdated(el);
            await waitUntil(
                () =>
                    (el as unknown as { menuItems: MenuItem[] }).menuItems
                        .length === 6
            );

            await sendKeys({ press: 'ArrowLeft' });
            await elementUpdated(el);

            expect(
                selectionSpy.callCount,
                `selectionSpy.callCount: ${selectionSpy.callCount}`
            ).to.equal(1);
            expect(selectionSpy.calledWith('Deselected'));
            await sendKeys({ press: 'ArrowLeft' });

            await elementUpdated(el);
            expect(
                selectionSpy.callCount,
                `selectionSpy.callCount: ${selectionSpy.callCount}`
            ).to.equal(1);
            await sendKeys({ press: 'ArrowRight' });

            await nextFrame();
            await nextFrame();
            expect(selectionSpy.calledWith('option-2'), 'option-2');

            await sendKeys({ press: 'ArrowRight' });
            await nextFrame();
            await nextFrame();
            await sendKeys({ press: 'ArrowRight' });
            await nextFrame();
            await nextFrame();
            await sendKeys({ press: 'ArrowRight' });
            await nextFrame();
            await nextFrame();
            await sendKeys({ press: 'ArrowRight' });
            await nextFrame();
            await nextFrame();
            expect(
                selectionSpy.calledWith('Save Selection'),
                'selectionSpy.calledWith("Save Selection")'
            );
            expect(
                selectionSpy.calledWith('Make Work Path'),
                'selectionSpy.calledWith("Make Work Path")'
            ).to.be.false;
            expect(
                selectionSpy.callCount,
                `selectionSpy.callCount: ${selectionSpy.callCount}`
            ).to.equal(5);
        });
        it('quick selects first item on ArrowRight when no value', async () => {
            await nextFrame();
            const selectionSpy = spy();
            el.addEventListener('change', (event: Event) => {
                const { value } = event.target as Picker;
                selectionSpy(value);
            });
            const button = el.button as HTMLButtonElement;

            el.focus();
            const changed = oneEvent(el, 'change');
            button.dispatchEvent(arrowRightEvent());

            await elementUpdated(el);
            await changed;

            expect(selectionSpy.callCount).to.equal(1);
            expect(selectionSpy.calledWith('Deselected'));
        });
        it('stops propagation of arrow key events but allows other keys to propagate', async () => {
            const keydownSpy = spy();
            const wrapper = await fixture<HTMLDivElement>(html`
                <div @keydown=${() => keydownSpy()}>
                    <sp-picker
                        label="Select"
                        value="option-2"
                        @change=${(event: Event) => event.preventDefault()}
                    >
                        <sp-menu-item value="option-1">Option 1</sp-menu-item>
                        <sp-menu-item value="option-2">Option 2</sp-menu-item>
                        <sp-menu-item value="option-3">Option 3</sp-menu-item>
                    </sp-picker>
                </div>
            `);
            const picker = wrapper.querySelector('sp-picker') as Picker;

            await elementUpdated(picker);

            picker.focus();
            await elementUpdated(picker);

            // Arrow keys should NOT propagate
            await sendKeys({ press: 'ArrowLeft' });
            await elementUpdated(picker);

            expect(
                keydownSpy.callCount,
                'ArrowLeft event should not propagate'
            ).to.equal(0);

            await sendKeys({ press: 'ArrowRight' });
            await elementUpdated(picker);

            expect(
                keydownSpy.callCount,
                'ArrowRight event should not propagate'
            ).to.equal(0);

            // Enter key SHOULD propagate (opens picker, but event bubbles)
            const opened = oneEvent(picker, 'sp-opened');
            await sendKeys({ press: 'Enter' });
            await opened;
            await elementUpdated(picker);

            expect(
                keydownSpy.callCount,
                'Enter event should propagate'
            ).to.be.greaterThan(0);
        });
        it('loads', async () => {
            expect(el).to.not.be.undefined;
        });
        it('closes when focusing away from the menu', async () => {
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;
            const button = el.button;
            const input = document.createElement('input');
            el.insertAdjacentElement('afterend', input);

            el.focus();
            await sendTabKey();
            expect(document.activeElement).to.equal(input);
            await sendShiftTabKey();
            expect(document.activeElement).to.equal(el);
            const opened = oneEvent(el, 'sp-opened');
            await sendKeys({ press: 'Enter' });
            await opened;
            await elementUpdated(el);

            await waitUntil(
                () => firstItem.focused,
                'The first items should have become focused visually.'
            );

            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            expect(thirdItem.focused, 'thirdItem focused?').to.be.true;

            const closed = oneEvent(el, 'sp-closed');
            button.focus();
            await closed;
            expect(isMenuActiveElement(el)).to.be.false;
            expect(el.open, 'open?').to.be.false;
        });
        it('does not listen to streaming `Enter` keydown', async () => {
            const openSpy = spy();
            const closedSpy = spy();
            el.addEventListener('sp-opened', () => openSpy());
            el.addEventListener('sp-closed', () => closedSpy());
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;
            const input = document.createElement('input');
            el.insertAdjacentElement('afterend', input);

            el.focus();
            await sendTabKey();
            expect(document.activeElement).to.equal(input);
            await sendKeys({ press: 'Shift+Tab' });
            expect(document.activeElement).to.equal(el);
            const opened = oneEvent(el, 'sp-opened');
            await sendKeys({ down: 'Enter' });
            await opened;
            await aTimeout(300);
            expect(openSpy.callCount).to.equal(1);
            await sendKeys({ up: 'Enter' });

            await waitUntil(
                () => firstItem.focused,
                'The first items should have become focused visually.'
            );

            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            expect(thirdItem.focused, 'thirdItem focused?').to.be.true;

            const closed = oneEvent(el, 'sp-closed');
            await sendKeys({ down: 'Enter' });
            await closed;
            await aTimeout(300);

            expect(el.value).to.equal(thirdItem.value);
            expect(openSpy.callCount).to.equal(1);
            expect(closedSpy.callCount).to.equal(1);
            await sendKeys({ up: 'Enter' });
        });
        it('allows tabbing to close', async () => {
            const input = document.createElement('input');
            el.insertAdjacentElement('afterend', input);
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            await nextFrame();

            expect(el.open, 'open?').to.be.true;
            el.focus();

            const closed = oneEvent(el, 'sp-closed');
            await sendTabKey();
            await closed;

            expect(el.open, 'closes').to.be.false;
        });
        describe('tab order', () => {
            let input1: HTMLInputElement;
            let input2: HTMLInputElement;
            beforeEach(() => {
                const surroundingInput = (): HTMLInputElement => {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.tabIndex = 0;
                    return input;
                };
                input1 = surroundingInput();
                input2 = surroundingInput();

                el.insertAdjacentElement('beforebegin', input1);
                el.insertAdjacentElement('afterend', input2);
            });
            afterEach(() => {
                input1.remove();
                input2.remove();
                fixtureCleanup();
                resetMouse();
            });
            it('tabs forward through the element', async function () {
                // Increase timeout for this test to avoid timeout failures in webkit
                this.timeout(10000);

                let focused: Promise<CustomEvent<FocusEvent>>;

                // start at input1
                input1.focus();
                await nextFrame();
                await elementUpdated(el);

                expect(document.activeElement === input1, 'focuses input 1').to
                    .be.true;

                // tab to the picker
                focused = oneEvent(el, 'focus');
                await sendTabKey();
                // Increase timeout for focus event to prevent flakiness
                try {
                    await Promise.race([
                        focused,
                        new Promise((_, reject) =>
                            setTimeout(
                                () =>
                                    reject(new Error('Focus event timed out')),
                                5000
                            )
                        ),
                    ]);
                } catch (error) {
                    console.error('Focus event timed out:', error);
                    el.focus();
                    await nextFrame();
                    expect(
                        document.activeElement === el,
                        'element focused manually after timeout'
                    ).to.be.true;
                }

                expect(el.focused, 'focused').to.be.true;
                expect(!el.open, 'closed').to.be.true;
                expect(document.activeElement === el, 'focuses el').to.be.true;

                // tab through the picker to input2
                focused = oneEvent(input2, 'focus');
                await sendTabKey();
                await focused;

                expect(document.activeElement === input2, 'focuses input 2').to
                    .be.true;
            });
            it('shift+tabs backwards through the element', async () => {
                // start at input2
                input2.focus();
                await nextFrame();
                await elementUpdated(el);
                expect(document.activeElement, 'focuses input 2').to.equal(
                    input2
                );

                let focused = oneEvent(el, 'focus');
                await sendShiftTabKey();

                // Use helper function for robust focus handling
                await waitForFocusEvent(focused, el);

                expect(el.focused, 'focused').to.be.true;
                expect(el.open, 'closed').to.be.false;
                expect(document.activeElement, 'focuses el').to.equal(el);

                // tab through the picker to input1
                focused = oneEvent(input1, 'focus');
                await sendShiftTabKey();

                // Use helper function for robust focus handling
                await waitForFocusEvent(focused, input1);

                await elementUpdated(el);
                expect(document.activeElement).to.equal(input1);
            });
            it('can close and immediately tab to the next tab stop', async () => {
                el.focus();
                expect(document.activeElement, 'focuses el').to.equal(el);
                // press down to open the picker
                const opened = oneEvent(el, 'sp-opened');
                await sendKeys({ press: 'ArrowUp' });
                await opened;

                expect(el.open, 'opened').to.be.true;
                const closed = oneEvent(el, 'sp-closed');
                el.close();
                await closed;

                expect(el.open, 'open?').to.be.false;
                expect(document.activeElement).to.equal(el);
                await sendTabKey();

                expect(el.open, 'open?').to.be.false;
                expect(document.activeElement).to.equal(input2);
            });
            it('can close and immediate shift+tab to the previous tab stop', async () => {
                el.focus();
                await nextFrame();
                expect(document.activeElement === el, 'focuses el').to.be.true;
                // press down to open the picker
                const opened = oneEvent(el, 'sp-opened');
                await sendKeys({ press: 'ArrowUp' });
                await opened;

                expect(el.open, 'opened').to.be.true;

                const closed = oneEvent(el, 'sp-closed');
                el.close();
                await closed;

                expect(el.open, 'open?').to.be.false;
                expect(document.activeElement).to.equal(el);

                const focused = oneEvent(input1, 'focus');
                await sendShiftTabKey();
                await focused;

                expect(el.open, 'open?').to.be.false;
                expect(document.activeElement === input1, 'input has focus').to
                    .be.true;
            });
        });
        it('does not open when [readonly]', async () => {
            el.readonly = true;

            await elementUpdated(el);

            el.click();
            await elementUpdated(el);

            expect(el.open, 'open?').to.be.false;
        });
        it('manages focus-ring styles', async () => {
            // @TODO: skipping this test for non-WebKit browsers. Will review in the migration to Spectrum 2.
            if (!isWebKit()) {
                return;
            }
            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();

            await setViewport({ width: 360, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();

            let opened = oneEvent(el, 'sp-opened');

            await mouseClickOn(el.button);

            await opened;

            const tray = el.shadowRoot.querySelector('sp-tray');
            expect(tray, 'has tray').to.not.be.null;

            // Make a selection
            let closed = oneEvent(el, 'sp-closed');

            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            firstItem.click();
            await closed;

            // expect the tray to be closed
            expect(el.open, 'open?').to.be.false;

            const button = el.shadowRoot.querySelector(
                '#button'
            ) as HTMLButtonElement;
            expect(button, 'has button').to.not.be.null;

            // we should have SAFARI_FOCUS_RING_CLASS in the classList
            expect(
                button.classList.contains(SAFARI_FOCUS_RING_CLASS),
                'button has focus ring?'
            ).to.be.true;

            // picker should still have focus
            expect(document.activeElement).to.equal(el);

            // click outside (0,0)
            await mouseClickAway(el.button);

            // picker should not have focus
            expect(document.activeElement).not.to.equal(el);

            // Let's use keyboard to open the tray now
            opened = oneEvent(el, 'sp-opened');
            el.focus();
            await sendKeys({ press: 'Enter' });
            await opened;

            expect(firstItem.focused, 'firstItem focused?').to.be.true;

            // Make a selection again
            closed = oneEvent(el, 'sp-closed');
            await sendKeys({ press: 'Enter' });
            await closed;

            await elementUpdated(el);

            // expect the tray to be closed
            expect(el.open, 'open?').to.be.false;
            // Test focus behavior when using keyboard to close
            expect(
                document.activeElement,
                'focus should be on picker after keyboard close'
            ).to.equal(el);

            // Verify that focus is maintained on the picker element when closed via keyboard
            expect(
                el.contains(document.activeElement) ||
                    el === document.activeElement,
                'focus should remain within picker component after keyboard close'
            ).to.be.true;

            // Click elsewhere to remove focus completely
            await mouseClickAway(el.button);

            // Now picker should not have focus
            expect(document.activeElement).not.to.equal(el);
            // we should not have SAFARI_FOCUS_RING_CLASS in the classList
            expect(
                button.classList.contains(SAFARI_FOCUS_RING_CLASS),
                'has focus ring again?'
            ).to.be.false;
        });
        it('does not close on document scroll', async () => {
            const el = await fixture(html`
                <div style="height: 200vh; padding: 50vh 0;">
                    <sp-picker label="Select an option" placement="right">
                        <sp-menu-item value="option-1">Option 1</sp-menu-item>
                        <sp-menu-item value="option-2">Option 2</sp-menu-item>
                        <sp-menu-item value="option-3">Option 3</sp-menu-item>
                    </sp-picker>
                </div>
            `);

            const picker = el.querySelector('sp-picker') as Picker;
            await elementUpdated(picker);
            await waitUntil(
                () => picker.updateComplete,
                'Waiting for picker to update'
            );

            expect(picker.open).to.be.false;

            const opened = oneEvent(picker, 'sp-opened');
            picker.click();
            await opened;

            expect(picker.open).to.be.true;

            // Scroll the document
            if (document.scrollingElement) {
                document.scrollingElement.scrollTop = 100;
            }

            // Wait a bit to ensure no close event is fired
            await waitUntil(
                () => picker.open === true,
                'Waiting for picker to remain open after scroll'
            );

            expect(picker.open).to.be.true;
        });
        it('ignores component scrolling but handles document scrolling', async () => {
            const scrollSpy = spy(document, 'dispatchEvent');

            const el = await fixture(html`
                <div style="height: 200vh; padding: 50vh 0;">
                    <div
                        id="scrollable-container"
                        style="height: 100px; overflow-y: auto;"
                    >
                        <div style="height: 200px;">Scrollable content</div>
                    </div>
                    <sp-picker label="Select an option" placement="right">
                        <sp-menu-item value="option-1">Option 1</sp-menu-item>
                        <sp-menu-item value="option-2">Option 2</sp-menu-item>
                        <sp-menu-item value="option-3">Option 3</sp-menu-item>
                    </sp-picker>
                </div>
            `);

            const picker = el.querySelector('sp-picker') as Picker;
            const scrollableContainer = el.querySelector(
                '#scrollable-container'
            ) as HTMLElement;

            await elementUpdated(picker);

            const opened = oneEvent(picker, 'sp-opened');
            picker.click();
            await opened;

            expect(picker.open).to.be.true;

            scrollSpy.resetHistory();

            scrollableContainer.scrollTop = 50;

            await aTimeout(50);

            const componentScrollUpdateCount = scrollSpy
                .getCalls()
                .filter(
                    (call) =>
                        call.args[0] instanceof CustomEvent &&
                        call.args[0].type === 'sp-update-overlays'
                ).length;

            scrollSpy.resetHistory();

            if (document.scrollingElement) {
                document.scrollingElement.scrollTop = 100;
            }

            await aTimeout(50);

            const documentScrollUpdateCount = scrollSpy
                .getCalls()
                .filter(
                    (call) =>
                        call.args[0] instanceof CustomEvent &&
                        call.args[0].type === 'sp-update-overlays'
                ).length;

            scrollSpy.restore();

            expect(componentScrollUpdateCount).to.equal(0);

            expect(documentScrollUpdateCount).to.be.greaterThan(0);

            expect(picker.open).to.be.true;
        });
    });
    describe('grouped', async () => {
        const groupedFixture = async (): Promise<Picker> => {
            return fixture<Picker>(html`
                <sp-picker
                    quiet
                    label="I would like to use Spectrum Web Components"
                    value="0"
                >
                    <sp-menu-group>
                        <span slot="header">Timeline</span>
                        <sp-menu-item value="0" id="should-be-selected">
                            Immediately
                        </sp-menu-item>
                        <sp-menu-item value="1">
                            I'm already using them
                        </sp-menu-item>
                        <sp-menu-item value="2">Soon</sp-menu-item>
                        <sp-menu-item value="3">
                            As part of my next project
                        </sp-menu-item>
                        <sp-menu-item value="4">In the future</sp-menu-item>
                    </sp-menu-group>
                </sp-picker>
            `);
        };
        beforeEach(async () => {
            el = await groupedFixture();
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();
        });
        it('selects the item with a matching value in a group', async () => {
            const item = el.querySelector('#should-be-selected') as MenuItem;
            expect(item.selected).to.be.true;
        });
    });
    describe('slotted label', () => {
        const pickerFixture = async (): Promise<Picker> => {
            const test = await fixture<Picker>(html`
                <div>
                    <sp-field-label for="picker-slotted">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker id="picker-slotted">
                        <span slot="label">
                            Select a Country with a very long label, too long in
                            fact
                        </span>
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item value="option-2">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-picker>
                </div>
            `);

            return test.querySelector('sp-picker') as Picker;
        };
        beforeEach(async () => {
            el = await pickerFixture();
            await elementUpdated(el);
            await nextFrame();
        });
        afterEach(async () => {
            if (el && el.open) {
                const closed = oneEvent(el, 'sp-closed');
                el.open = false;
                await closed;
            }
        });

        it('loads accessibly w/ slotted label', async () => {
            await expect(el).to.be.accessible();
        });
    });
    describe('Dev mode', () => {
        let consoleWarnStub!: ReturnType<typeof stub>;
        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(async () => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
            if (el?.open) {
                const closed = oneEvent(el, 'sp-closed');
                el.open = false;
                await closed;
            }
        });

        const pickerFixture = async (): Promise<Picker> => {
            const test = await fixture<Picker>(html`
                <div>
                    <sp-field-label for="picker-deprecated">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker
                        id="picker-deprecated"
                        label="Select a Country with a very long label, too long in fact"
                    >
                        <sp-menu>
                            <sp-menu-item>Deselect</sp-menu-item>
                            <sp-menu-item value="option-2">
                                Select Inverse
                            </sp-menu-item>
                            <sp-menu-item>Feather...</sp-menu-item>
                            <sp-menu-item>Select and Mask...</sp-menu-item>
                            <sp-menu-item>Save Selection</sp-menu-item>
                            <sp-menu-item disabled>Make Work Path</sp-menu-item>
                        </sp-menu>
                    </sp-picker>
                </div>
            `);

            return test.querySelector('sp-picker') as Picker;
        };
        it('does not warn in Dev Mode when accessible elements leveraged', async () => {
            const test = await fixture<Picker>(html`
                <div>
                    <sp-field-label for="test">Test label</sp-field-label>
                    <sp-picker id="test">
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-item>Save Selection</sp-menu-item>
                    </sp-picker>
                </div>
            `);

            el = test.querySelector('sp-picker') as Picker;

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            expect(consoleWarnStub.called).to.be.false;
        });
        it('warns in Dev Mode when accessible attributes are not leveraged', async function () {
            this.retries(0);
            el = await fixture<Picker>(html`
                <sp-picker>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-item>Save Selection</sp-menu-item>
                </sp-picker>
            `);

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();
            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('accessible'),
                'confirm accessibility-centric message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-picker',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
        describe('deprecated', () => {
            it('warns in Dev Mode of deprecated `<sp-menu>` usage', async () => {
                el = await pickerFixture();
                await elementUpdated(el);

                expect(consoleWarnStub.called).to.be.true;
                const spyCall = consoleWarnStub.getCall(0);
                expect(
                    (spyCall.args.at(0) as string).includes('<sp-menu>'),
                    'confirm <sp-menu>-centric message'
                ).to.be.true;
                expect(
                    spyCall.args.at(-1),
                    'confirm `data` shape'
                ).to.deep.equal({
                    data: {
                        localName: 'sp-picker',
                        type: 'api',
                        level: 'deprecation',
                    },
                });
            });
        });
        describe('Dev mode ignored', () => {
            const { ignoreWarningLocalNames } = window.__swc;
            before(() => {
                window.__swc.ignoreWarningLocalNames = {
                    'sp-picker': true,
                };
            });
            before(() => {
                window.__swc.ignoreWarningLocalNames = ignoreWarningLocalNames;
            });
            beforeEach(async () => {
                el = await pickerFixture();
                await elementUpdated(el);
                await nextFrame();
            });
            afterEach(async () => {
                if (el.open) {
                    const closed = oneEvent(el, 'sp-closed');
                    el.open = false;
                    await closed;
                }
            });
            it('selects with deprecated syntax', async () => {
                const secondItem = el.querySelector(
                    'sp-menu-item:nth-of-type(2)'
                ) as MenuItem;

                const opened = oneEvent(el, 'sp-opened');
                el.click();
                await opened;

                expect(el.open, 'open?').to.be.true;
                expect(el.selectedItem?.itemText).to.be.undefined;
                expect(el.value).to.equal('');

                const closed = oneEvent(el, 'sp-closed');
                secondItem.click();
                await closed;

                expect(el.open, 'open?').to.be.false;
                expect(el.selectedItem?.itemText).to.equal('Select Inverse');
                expect(el.value).to.equal('option-2');
            });
        });
    });
    testForLitDevWarnings(async () => await pickerFixture());
    it('manages its "name" value in the accessibility tree when [icons-only]', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${iconsOnly({})}</div>
        `);
        const el = test.querySelector('sp-picker') as Picker;

        await elementUpdated(el);
        await nextFrame();
        type NamedNode = { name: string };
        let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };

        expect(
            findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === 'Delete Choose an action type...'
            ),
            '`name` is the label text'
        ).to.not.be.null;

        el.value = '2';
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        expect(el.value).to.equal('2');
        snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };

        expect(
            findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === 'Copy Choose an action type...'
            ),
            '`name` is the label text plus the selected item text'
        ).to.not.be.null;
    });
    it('toggles between pickers', async () => {
        const el1 = await pickerFixture();
        const el2 = await pickerFixture();

        el1.id = 'away';
        el2.id = 'other';

        expect(el1.open, 'el1 to be closed').to.be.false;
        expect(el2.open, 'el2 to be closed').to.be.false;

        const el1open = oneEvent(el1, 'sp-opened');
        let el1closed = oneEvent(el1, 'sp-closed');
        const el2open = oneEvent(el2, 'sp-opened');
        const el2closed = oneEvent(el2, 'sp-closed');

        el1.click();

        await el1open;

        expect(el1.open, 'click el1: el1 to be open').to.be.true;
        expect(el2.open, 'click el1: el2 to be closed').to.be.false;

        el2.click();

        await el1closed;
        await el2open;

        expect(el1.open, 'click el2: el1 to be closed').to.be.false;
        expect(el2.open, 'click el2: el2 to be open').to.be.true;

        el1.click();

        await el2closed;
        await el1open;

        expect(el2.open, 'click el1 again: el2 to be closed').to.be.false;
        expect(el1.open, 'click el1 again: el1 to be open').to.be.true;

        el1closed = oneEvent(el1, 'sp-closed');
        await sendKeys({ press: 'Escape' });
        await el1closed;
        expect(el1.open, 'escape key: el1 to be closed').to.be.false;
    });
    it('displays selected item text by default', async () => {
        const el = await fixture<Picker>(html`
            <sp-picker
                value="inverse"
                label="Select a Country with a very long label, too long in fact"
            >
                <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
                <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        `);
        await nextFrame();

        await elementUpdated(el);
        await waitUntil(
            () => el.selectedItem?.itemText === 'Select Inverse',
            `Selected Item Text: ${el.selectedItem?.itemText}`
        );

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        expect(el.value).to.equal('inverse');
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');

        el.focus();
        await elementUpdated(el);
        expect(
            el === document.activeElement,
            `activeElement is ${document.activeElement?.localName}`
        ).to.be.true;

        const opened = oneEvent(el, 'sp-opened');
        await sendKeys({ press: 'Enter' });
        await opened;

        expect(
            el.selectedItem === document.activeElement,
            `activeElement is ${document.activeElement?.localName}`
        ).to.be.true;

        expect(firstItem.focused, 'firstItem NOT "focused"').to.be.false;
        expect(secondItem.focused, 'secondItem "focused"').to.be.true;
    });
    it('resets value when item not available', async () => {
        const el = await fixture<Picker>(html`
            <sp-picker
                value="missing"
                label="Select a Country with a very long label, too long in fact"
            >
                <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
                <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        `);

        await elementUpdated(el);
        await waitUntil(() => el.value === '');

        expect(el.value).to.equal('');
        expect(el.selectedItem?.itemText).to.be.undefined;
    });
    it('allows event listeners on child items', async () => {
        const mouseenterSpy = spy();
        const handleMouseenter = (): void => mouseenterSpy();
        const el = await fixture<Picker>(html`
            <sp-picker
                label="Select a Country with a very long label, too long in fact"
            >
                <sp-menu-item value="deselect" @mouseenter=${handleMouseenter}>
                    Deselect Text
                </sp-menu-item>
            </sp-picker>
        `);

        await elementUpdated(el);

        const hoverEl = el.querySelector('sp-menu-item') as MenuItem;

        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;
        await elementUpdated(el);

        expect(el.open, 'open?').to.be.true;
        hoverEl.dispatchEvent(new MouseEvent('mouseenter'));
        await elementUpdated(el);

        expect(el.open, 'open?').to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;
        await elementUpdated(el);

        expect(el.open, 'open?').to.be.false;
        expect(mouseenterSpy.calledOnce).to.be.true;
    });
    it('dispatches events on open/close', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const handleOpenedSpy = (event: Event): void => openedSpy(event);
        const handleClosedSpy = (event: Event): void => closedSpy(event);

        const el = await fixture<Picker>(html`
            <sp-picker
                label="Select a Country with a very long label, too long in fact"
                @sp-opened=${handleOpenedSpy}
                @sp-closed=${handleClosedSpy}
            >
                <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
            </sp-picker>
        `);

        await elementUpdated(el);
        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;
        await elementUpdated(el);

        expect(openedSpy.calledOnce).to.be.true;
        expect(closedSpy.calledOnce).to.be.false;

        const closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;
        await elementUpdated(el);

        expect(closedSpy.calledOnce).to.be.true;
    });
    it('closes tooltip on button blur', async () => {
        const test = await styledFixture(html`
            <div>${tooltip(tooltip.args)}</div>
        `);
        const el = test.querySelector('sp-picker') as Picker;
        await elementUpdated(el);
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        input1.id = 'input1';
        input2.id = 'input2';
        const tooltipEl = el.querySelector('sp-tooltip') as Tooltip;
        el.insertAdjacentElement('beforebegin', input1);
        el.insertAdjacentElement('afterend', input2);
        input1.focus();
        expect(document.activeElement).to.equal(input1);
        const tooltipOpened = oneEvent(el, 'sp-opened');
        await sendTabKey();
        await tooltipOpened;
        expect(
            document.activeElement === el,
            `Actually, ${document.activeElement?.localName}`
        ).to.be.true;
        expect(tooltipEl.open, 'tooltipEl open?').to.be.true;
        expect(el.open, 'open?').to.be.false;
        expect(el.focused, 'el focused?').to.be.true;

        const menuOpen = oneEvent(el, 'sp-opened');
        const tooltipClosed = oneEvent(el, 'sp-closed');
        await sendKeys({ press: 'ArrowDown' });
        await menuOpen;
        await tooltipClosed;
        const firstOption = el.querySelector('sp-menu-item') as MenuItem;
        expect(
            document.activeElement === firstOption,
            'firstOption is activeElement'
        ).to.be.true;
        expect(tooltipEl.open, 'tooltip open').to.be.false;
        expect(el.open, 'menu open').to.be.true;

        const menuClosed = oneEvent(el, 'sp-closed');
        await sendTabKey();
        await menuClosed;
        expect(document.activeElement).not.to.equal(el);
        expect(tooltipEl.open, 'tooltipEl open?').to.be.false;
        expect(el.open, 'open?').to.be.false;
    });
    describe('disabled', function () {
        beforeEach(async function () {
            const test = await fixture(html`
                <div>${disabled(disabled.args)}</div>
            `);
            this.label = test.querySelector('sp-field-label') as FieldLabel;
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.el);
        });
        it('does not recieve focus from an `<sp-field-label>`', async function () {
            expect(this.el.disabled, 'this.el disabled?').to.be.true;
            expect(this.el.focused, 'this.el focused?').to.be.false;

            this.label.click();
            await elementUpdated(this.el);

            expect(this.el.focused, 'this.el focused?').to.be.false;
        });
        it('does not open from `click()`', async function () {
            expect(this.el.disabled, 'this.el disabled?').to.be.true;
            expect(this.el.focused, 'this.el open?').to.be.false;

            this.el.click();
            await elementUpdated(this.el);

            expect(this.el.focused, 'this.el open?').to.be.false;
        });
        it('does not open from `sendMouse()`', async function () {
            expect(this.el.disabled, 'this.el disabled?').to.be.true;
            expect(this.el.focused, 'this.el open?').to.be.false;

            await mouseClickOn(this.el.button);
            // Synthetic delay for "open" but not "sp-open" as it would never come.
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();

            expect(this.el.focused, 'this.el open?').to.be.false;
        });
    });
    describe('pending', function () {
        beforeEach(async function () {
            const test = await fixture(html`
                <div>${pending({ pending: true })}</div>
            `);
            this.label = test.querySelector('sp-field-label') as FieldLabel;
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.el);
        });
        it('receives focus from an `<sp-field-label>`', async function () {
            expect(this.el.focused, 'this.el focused?').to.be.false;

            this.label.click();
            await elementUpdated(this.el);

            expect(this.el.focused, 'this.el focused?').to.be.true;
        });
        it('does not open from `click()`', async function () {
            expect(this.el.focused, 'this.el open?').to.be.false;

            this.el.click();
            await elementUpdated(this.el);

            expect(this.el.focused, 'this.el open?').to.be.false;
        });
        it('manages its "name" value in the accessibility tree when [pending]', async () => {
            type NamedNode = { name: string; role: string };
            const snapshot = (await a11ySnapshot(
                {}
            )) as unknown as NamedNode & {
                children: NamedNode[];
            };
            expect(
                findAccessibilityNode<NamedNode>(snapshot, (node) => {
                    return (
                        node.name ===
                        'Choose your neighborhood Where do you live? Pending'
                    );
                })
            ).to.not.be.null;
        });
    });
    describe('dynamic icons', function () {
        beforeEach(async function () {
            const test = await fixture(html`
                <div>${dynamicIcons(dynamicIcons.args)}</div>
            `);
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.el);
        });
        // @TODO: skipping this test because it's flaky in CI also flaky in VRT. Will review in the migration to Spectrum 2.
        it.skip('displays the same icon as the selected menu item', async function () {
            // Delay long enough for the picker to display the selected item.
            // Chromium and Webkit require 2 frames, Firefox requires 3 frames.
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();

            // Check that the displayed icon matches the selected item's icon.
            const picker: Picker = this.el;
            const displayedIconBefore =
                picker.shadowRoot.querySelector<Icon>('#icon > sp-icon');
            expect(displayedIconBefore).to.be.ok;
            const displayedIconSrcBefore = displayedIconBefore?.src;
            expect(displayedIconSrcBefore).to.be.a.string;
            const value = picker.value;
            expect(value).to.be.a.string;
            const selectedItem = picker.querySelector<MenuItem>(
                `sp-menu-item[value="${value}"]`
            );
            expect(selectedItem).to.be.ok;
            const selectedItemIcon = selectedItem?.querySelector('sp-icon');
            expect(selectedItemIcon).to.be.ok;
            const selectedItemIconSrcBefore = selectedItemIcon?.src;
            expect(selectedItemIconSrcBefore).to.be.a.string;
            expect(displayedIconSrcBefore).to.equal(selectedItemIconSrcBefore);

            // Change the icon src of the selected item.
            const newSrc = 'assets/new-icon.svg';
            if (selectedItemIcon) {
                selectedItemIcon.setAttribute('src', newSrc);
            }
            const selectedItemIconSrcAfter = selectedItemIcon?.src;
            expect(selectedItemIconSrcAfter).to.equal(newSrc);

            // Give the picker a chance to update. Chromium, Firefox, and Webkit require 3 frames.
            await nextFrame();
            await nextFrame();
            await nextFrame();

            // Check that the displayed icon matches the selected item's icon.
            const displayedIconAfter =
                picker.shadowRoot.querySelector<Icon>('#icon > sp-icon');
            expect(displayedIconAfter).to.be.ok;
            const displayedIconSrcAfter = displayedIconAfter?.src;
            expect(displayedIconSrcAfter).to.be.a.string;
            expect(displayedIconSrcAfter).to.equal(newSrc);
        });
    });

    it('closes modal overlay immediately when escape is pressed on closed picker in modal', async function () {
        const test = await fixture<HTMLDivElement>(html`
            <sp-theme scale="medium" color="light" system="spectrum">
                <overlay-trigger
                    type="modal"
                    id="modal-trigger"
                    placement="top"
                >
                    <sp-button
                        variant="primary"
                        slot="trigger"
                        style="position:absolute;bottom:50px"
                    >
                        Open Modal
                    </sp-button>
                    <sp-popover slot="click-content" tip>
                        <sp-dialog no-divider class="options-popover-content">
                            <sp-picker
                                label="Select a Country"
                                value="item-2"
                                id="picker-value"
                            >
                                <sp-menu-item value="item-1">
                                    Deselect
                                </sp-menu-item>
                                <sp-menu-item value="item-2">
                                    Select inverse
                                </sp-menu-item>
                                <sp-menu-item value="item-3">
                                    Feather...
                                </sp-menu-item>
                                <sp-menu-item value="item-4">
                                    Select and mask...
                                </sp-menu-item>
                                <sp-menu-item value="item-5">
                                    Save selection
                                </sp-menu-item>
                                <sp-menu-item disabled value="item-6">
                                    Make work path
                                </sp-menu-item>
                            </sp-picker>
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </sp-theme>
        `);

        const overlayTrigger = test.querySelector(
            'overlay-trigger'
        ) as OverlayTrigger;
        const button = test.querySelector('sp-button') as Button;
        const picker = test.querySelector('sp-picker') as Picker;

        // Open the modal overlay
        button.click();
        await elementUpdated(overlayTrigger);

        // Wait for the overlay to open
        await waitUntil(
            () => overlayTrigger.open === 'click',
            'overlay should be open'
        );

        // Focus on the picker (but don't open it)
        picker.focus();
        await elementUpdated(picker);

        // Verify picker is closed
        expect(picker.open, 'picker should be closed initially').to.be.false;

        // Press escape - this should close the modal overlay immediately since picker is not open
        const modalClosed = oneEvent(overlayTrigger, 'sp-closed');
        await sendKeys({ press: 'Escape' });
        await modalClosed;

        // Verify modal overlay is closed
        expect(
            overlayTrigger.open,
            'modal overlay should be closed after escape'
        ).to.be.undefined;
    });
    describe('initial value', function () {
        beforeEach(async function () {
            const test = await fixture<HTMLDivElement>(html`
                <sp-theme scale="medium" color="light" system="spectrum">
                    <sp-field-label for="picker">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker
                        id="picker"
                        label="Where do you live?"
                        value="option-6"
                    >
                        <sp-menu-item value="option-1">Deselect</sp-menu-item>
                        <sp-menu-item value="option-2">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item value="option-3">Feather...</sp-menu-item>
                        <sp-menu-item value="option-4">
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-item value="option-5">
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item value="option-6">
                            Make Work Path
                        </sp-menu-item>
                    </sp-picker>
                </sp-theme>
            `);

            el = test.querySelector('sp-picker') as Picker;
            // the popover needs to be constrained to force overflow
            const styles = document.createElement('style');
            styles.innerText = 'sp-popover { height: 60px; }';
            el.shadowRoot.append(styles);
            await elementUpdated(el);
        });
        // @TODO: skipping due to flakiness. Will review in the migration to Spectrum 2.
        it.skip('scrolls selected into view on open', async () => {
            await elementUpdated(el);

            const firstItem = el.querySelector(
                'sp-menu-item:first-child'
            ) as MenuItem;
            const lastItem = el.querySelector(
                'sp-menu-item:last-child'
            ) as MenuItem;

            expect(el.value).to.equal('option-6');

            // Wait for picker to open using property polling instead of unreliable events
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            await oneEvent(el, 'sp-opened');

            await waitUntil(() => isMenuActiveElement(el), 'menu item focused');
            await nextFrame();
            await nextFrame();

            const getParentOffset = (item: HTMLElement): number => {
                const parentScroll = (
                    item.assignedSlot?.parentElement as HTMLElement
                ).scrollTop;
                const parentOffset = item.offsetTop - parentScroll;
                return parentOffset;
            };

            const actualOffset = getParentOffset(lastItem);

            expect(actualOffset, 'initial: last item offset').to.be.lessThan(
                60
            );

            const firstItemOffset = getParentOffset(firstItem);
            expect(
                firstItemOffset,
                'initial: first item offset'
            ).to.be.lessThan(-1);

            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);

            // After navigation, check scroll positions with Chromium adjustments
            const lastItemOffsetAfter = getParentOffset(lastItem);
            const firstItemOffsetAfter = getParentOffset(firstItem);
            expect(
                lastItemOffsetAfter,
                'after: last item offset'
            ).to.be.greaterThan(60);
            expect(
                firstItemOffsetAfter,
                'after: first item offset'
            ).to.be.greaterThan(-1);
        });
    });
    describe('icons attribute', () => {
        it('hides icon in button when icons="none"', async () => {
            const el = await fixture<Picker>(html`
                <sp-picker label="Choose an action" value="1" icons="none">
                    <sp-menu-item value="1">
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                        Edit
                    </sp-menu-item>
                    <sp-menu-item value="2">
                        <sp-icon-copy slot="icon"></sp-icon-copy>
                        Copy
                    </sp-menu-item>
                </sp-picker>
            `);
            await elementUpdated(el);

            const iconSpan = el.shadowRoot.querySelector(
                '#icon'
            ) as HTMLElement;
            expect(iconSpan).to.not.be.null;
            expect(iconSpan.hidden, 'icon span should be hidden').to.be.true;

            // Verify the label is still visible
            const labelSpan = el.shadowRoot.querySelector(
                '.label'
            ) as HTMLElement;
            expect(labelSpan).to.not.be.null;
            expect(
                labelSpan.classList.contains('visually-hidden'),
                'label should be visible'
            ).to.be.false;
        });

        it('preserves icon elements in menu items when icons="none"', async () => {
            const el = await fixture<Picker>(html`
                <sp-picker label="Choose an action" value="1" icons="none">
                    <sp-menu-item value="1">
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                        Edit
                    </sp-menu-item>
                    <sp-menu-item value="2">
                        <sp-icon-copy slot="icon"></sp-icon-copy>
                        Copy
                    </sp-menu-item>
                </sp-picker>
            `);
            await elementUpdated(el);

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            await elementUpdated(el);

            // Verify icons are present in menu items (icons="none" only affects button display)
            const menuItems = el.querySelectorAll('sp-menu-item');
            expect(menuItems.length).to.equal(2);
            menuItems.forEach((item, index) => {
                const icon = item.querySelector('[slot="icon"]');
                expect(icon, `menu item ${item.value} should have icon`).to.not
                    .be.null;
                const expectedTag =
                    index === 0 ? 'SP-ICON-EDIT' : 'SP-ICON-COPY';
                expect(icon!.tagName).to.equal(expectedTag);
            });
        });

        it('hides label text when icons="only" and has value', async () => {
            const el = await fixture<Picker>(html`
                <sp-picker label="Choose an action" value="1" icons="only">
                    <sp-menu-item value="1">
                        <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                        Edit
                    </sp-menu-item>
                    <sp-menu-item value="2">
                        <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
                        Copy
                    </sp-menu-item>
                </sp-picker>
            `);
            await elementUpdated(el);

            const labelSpan = el.shadowRoot.querySelector(
                '.label'
            ) as HTMLElement;
            expect(labelSpan).to.not.be.null;
            expect(
                labelSpan.classList.contains('visually-hidden'),
                'label should be visually hidden when icons="only" and has value'
            ).to.be.true;

            // Verify icon is still visible
            const iconSpan = el.shadowRoot.querySelector(
                '#icon'
            ) as HTMLElement;
            expect(iconSpan).to.not.be.null;
            expect(iconSpan.hidden, 'icon should be visible').to.be.false;
        });

        it('shows label text when icons="only" but no value selected', async () => {
            const el = await fixture<Picker>(html`
                <sp-picker label="Choose an action" icons="only">
                    <sp-menu-item value="1">
                        <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                        Edit
                    </sp-menu-item>
                    <sp-menu-item value="2">
                        <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
                        Copy
                    </sp-menu-item>
                </sp-picker>
            `);
            await elementUpdated(el);

            const labelSpan = el.shadowRoot.querySelector(
                '.label'
            ) as HTMLElement;
            expect(labelSpan).to.not.be.null;
            expect(
                labelSpan.classList.contains('visually-hidden'),
                'label should be visible when no value selected'
            ).to.be.false;
            expect(
                labelSpan.classList.contains('placeholder'),
                'label should have placeholder class'
            ).to.be.true;
        });

        it('updates icon visibility when icons attribute changes', async () => {
            const el = await fixture<Picker>(html`
                <sp-picker label="Choose an action" value="1">
                    <sp-menu-item value="1">
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                        Edit
                    </sp-menu-item>
                </sp-picker>
            `);
            await elementUpdated(el);

            let iconSpan = el.shadowRoot.querySelector('#icon') as HTMLElement;
            expect(iconSpan.hidden, 'icon should be visible initially').to.be
                .false;

            // Change to icons="none"
            el.icons = 'none';
            await elementUpdated(el);

            iconSpan = el.shadowRoot.querySelector('#icon') as HTMLElement;
            expect(
                iconSpan.hidden,
                'icon should be hidden after setting icons="none"'
            ).to.be.true;

            // Change to icons="only"
            el.icons = 'only';
            await elementUpdated(el);

            iconSpan = el.shadowRoot.querySelector('#icon') as HTMLElement;
            expect(
                iconSpan.hidden,
                'icon should be visible after setting icons="only"'
            ).to.be.false;

            const labelSpan = el.shadowRoot.querySelector(
                '.label'
            ) as HTMLElement;
            expect(
                labelSpan.classList.contains('visually-hidden'),
                'label should be hidden with icons="only"'
            ).to.be.true;
        });
    });
}
