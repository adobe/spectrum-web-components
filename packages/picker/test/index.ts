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

import type { Picker } from '@spectrum-web-components/picker';

// import type { OverlayOpenCloseDetail } from '@spectrum-web-components/overlay';
import type { MenuItem } from '@spectrum-web-components/menu';
import {
    aTimeout,
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/shared/src/focus-visible.js';
import { spy, stub } from 'sinon';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    testForLitDevWarnings,
    tEvent,
} from '../../../test/testing-helpers.js';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import {
    Default,
    iconsOnly,
    noVisibleLabel,
    slottedLabel,
} from '../stories/picker.stories.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import type { Popover } from '@spectrum-web-components/popover';
import { ignoreResizeObserverLoopError } from '../../../test/testing-helpers.js';
import { isFirefox } from '@spectrum-web-components/shared/src/platform.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import type { Menu } from '@spectrum-web-components/menu';

export type TestablePicker = { optionsMenu: Menu };

ignoreResizeObserverLoopError(before, after);

const isMenuActiveElement = function (el: Picker): boolean {
    return el.shadowRoot.activeElement?.localName === 'sp-menu';
};

export function runPickerTests(): void {
    let el: Picker;
    const pickerFixture = async (): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(
            html`
                <sp-theme scale="medium" color="light">
                    <sp-field-label for="picker">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker
                        id="picker"
                        style="width: 200px; --spectrum-alias-ui-icon-chevron-size-100: 10px;"
                    >
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item value="option-2">
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-picker>
                </sp-theme>
            `
        );

        return test.querySelector('sp-picker') as Picker;
    };
    describe('accessibility model', () => {
        it('accessible with "<sp-field-label>"', async () => {
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
        it('accessible with "label" slot', async () => {
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

            if (isFirefox()) {
                // Firefox does not surface slotted content into this aria-labelledby reference made by Picker
                // negative test to fail when conditions change
                expect(
                    findAccessibilityNode<NamedNode>(
                        snapshot,
                        (node) => node.name === 'Select Inverse'
                    ),
                    '`name` is the the selected item text without label test'
                ).to.not.be.null;
                return;
            }

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Select Inverse Where do you live?'
                ),
                '`name` is the the selected item text plus the label text'
            ).to.not.be.null;
        });
    });
    describe('standard', () => {
        beforeEach(async () => {
            el = await pickerFixture();
            await elementUpdated(el);
        });
        it('loads accessibly', async () => {
            await expect(el).to.be.accessible();
        });
        it('closes accessibly', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.button);
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(el.open).to.be.true;
            const accessibleCloseButton = el.shadowRoot.querySelector(
                '.visually-hidden button'
            ) as HTMLButtonElement;
            expect(accessibleCloseButton).to.have.attribute(
                'aria-label',
                'Dismiss'
            );

            const closed = oneEvent(el, 'sp-closed');
            accessibleCloseButton.click();
            await closed;

            await elementUpdated(el);

            expect(el.open).to.be.false;
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
        it('manages `aria-activedescendant`', async () => {
            const firstItem = el.querySelector('sp-menu-item:nth-child(1)');
            const secondItem = el.querySelector('sp-menu-item:nth-child(2)');
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            expect(
                (el as unknown as TestablePicker).optionsMenu.getAttribute(
                    'aria-activedescendant'
                )
            ).to.equal(firstItem?.id);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(
                (el as unknown as TestablePicker).optionsMenu.getAttribute(
                    'aria-activedescendant'
                )
            ).to.equal(secondItem?.id);
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

            await elementUpdated(el);

            expect(firstItem.focused, 'should not visually focused').to.be
                .false;

            el.focus();
            await elementUpdated(el);
            const opened = oneEvent(el, 'sp-opened');
            await sendKeys({ press: 'ArrowRight' });
            await sendKeys({ press: 'ArrowLeft' });
            await sendKeys({ press: 'ArrowDown' });
            await opened;

            expect(el.open).to.be.true;
            expect(firstItem.focused, 'should be visually focused').to.be.true;

            const closed = oneEvent(el, 'sp-closed');
            await sendKeys({
                press: 'Escape',
            });
            await closed;

            expect(el.open).to.be.false;
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
        });
        it('opens, on click, without visible focus on a menu item', async () => {
            await nextFrame();
            await nextFrame();
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            const boundingRect = el.button.getBoundingClientRect();

            expect(firstItem.focused, 'not visually focused').to.be.false;
            const opened = oneEvent(el, 'sp-opened');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });
            await opened;

            expect(el.open).to.be.true;
            expect(firstItem.focused, 'still not visually focused').to.be.false;
        });
        it('opens/closes multiple times', async () => {
            expect(el.open).to.be.false;
            const boundingRect = el.button.getBoundingClientRect();
            let opened = oneEvent(el, 'sp-opened');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });
            await opened;
            expect(el.open).to.be.true;

            let closed = oneEvent(el, 'sp-closed');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });
            await closed;
            expect(el.open).to.be.false;

            opened = oneEvent(el, 'sp-opened');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });
            await opened;
            expect(el.open).to.be.true;

            closed = oneEvent(el, 'sp-closed');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                ],
            });
            await closed;
            expect(el.open).to.be.false;
        });
        it('closes when becoming disabled', async () => {
            expect(el.open).to.be.false;
            el.click();
            await elementUpdated(el);

            expect(el.open).to.be.true;
            el.disabled = true;
            await elementUpdated(el);

            expect(el.open).to.be.false;
        });
        it('closes when clicking away', async () => {
            el.id = 'closing';
            const other = document.createElement('div');
            document.body.append(other);

            await elementUpdated(el);

            expect(el.open).to.be.false;
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;
            await elementUpdated(el);

            expect(el.open).to.be.true;
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
            const button = el.button as HTMLButtonElement;

            const opened = oneEvent(el, 'sp-opened');
            button.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            const closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;

            expect(el.open).to.be.false;
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
            const button = el.button as HTMLButtonElement;

            let opened = oneEvent(el, 'sp-opened');
            button.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            let closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;

            expect(el.open).to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Select Inverse');
            expect(el.value).to.equal('option-2');

            opened = oneEvent(el, 'sp-opened');
            button.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.selectedItem?.itemText).to.equal('Select Inverse');
            expect(el.value).to.equal('option-2');

            closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await closed;

            expect(el.open).to.be.false;
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
            const button = el.button as HTMLButtonElement;

            const opened = oneEvent(el, 'sp-opened');
            button.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');
            expect(secondItem.selected).to.be.false;

            el.addEventListener('change', (event: Event): void => {
                event.preventDefault();
                preventChangeSpy();
            });

            secondItem.click();
            // What is the time all about and how can it be better measured?
            await nextFrame();
            await nextFrame();
            expect(preventChangeSpy.calledOnce).to.be.true;
            expect(secondItem.selected, 'selection prevented').to.be.false;
            expect(el.open).to.be.true;
        });
        it('can throw focus after `change`', async () => {
            const input = document.createElement('input');
            document.body.append(input);

            await elementUpdated(el);

            const secondItem = el.querySelector(
                'sp-menu-item:nth-of-type(2)'
            ) as MenuItem;
            const button = el.button as HTMLButtonElement;

            const opened = oneEvent(el, 'sp-opened');
            button.click();
            await opened;
            await elementUpdated(el);

            expect(el.open).to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');
            expect(secondItem.selected).to.be.false;

            el.addEventListener('change', (): void => {
                input.focus();
            });

            const closed = oneEvent(el, 'sp-closed');
            secondItem.click();
            await closed;
            await elementUpdated(el);

            expect(el.open).to.be.false;
            expect(el.value, 'value changed').to.equal('option-2');
            expect(secondItem.selected, 'selected changed').to.be.true;
            await waitUntil(
                () => document.activeElement === input,
                'focus throw'
            );
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
            sendKeys({
                press: 'Escape',
            });
            await closed;
            expect(el.open).to.be.false;
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

            expect(el.open, 'open by ArrowDown').to.be.true;
            expect(el.selectedItem?.itemText).to.be.undefined;
            expect(el.value).to.equal('');

            const closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await closed;

            expect(el.open).to.be.false;
            expect(el.selectedItem?.itemText).to.equal('Deselect');
            expect(el.value).to.equal('Deselect');
        });
        it('quick selects on ArrowLeft/Right', async () => {
            await nextFrame();
            const selectionSpy = spy();
            el.addEventListener('change', (event: Event) => {
                const { value } = event.target as Picker;
                selectionSpy(value);
            });
            const button = el.button as HTMLButtonElement;

            el.focus();
            button.dispatchEvent(arrowLeftEvent());

            await elementUpdated(el);

            expect(selectionSpy.callCount).to.equal(1);
            expect(selectionSpy.calledWith('Deselected'));
            button.dispatchEvent(arrowLeftEvent());

            await elementUpdated(el);
            expect(selectionSpy.callCount).to.equal(1);
            button.dispatchEvent(arrowRightEvent());

            await elementUpdated(el);
            expect(selectionSpy.calledWith('option-2'));

            button.dispatchEvent(arrowRightEvent());
            button.dispatchEvent(arrowRightEvent());
            button.dispatchEvent(arrowRightEvent());
            button.dispatchEvent(arrowRightEvent());

            await elementUpdated(el);
            expect(selectionSpy.callCount).to.equal(5);
            expect(selectionSpy.calledWith('Save Selection'));
            expect(selectionSpy.calledWith('Make Work Path')).to.be.false;
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
            button.dispatchEvent(arrowRightEvent());

            await elementUpdated(el);

            expect(selectionSpy.callCount).to.equal(1);
            expect(selectionSpy.calledWith('Deselected'));
        });
        it('loads', async () => {
            expect(el).to.not.be.undefined;
        });
        it('refocuses on list when open', async () => {
            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;
            const button = el.button;
            const input = document.createElement('input');
            el.insertAdjacentElement('afterend', input);

            el.focus();
            await sendKeys({ press: 'Tab' });
            expect(document.activeElement === input).to.be.true;
            await sendKeys({ press: 'Shift+Tab' });
            expect(document.activeElement === el).to.be.true;
            const opened = oneEvent(el, 'sp-opened');
            sendKeys({ press: 'Enter' });
            await opened;
            await elementUpdated(el);

            await waitUntil(
                () => firstItem.focused,
                'The first items should have become focused visually.'
            );

            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            expect(thirdItem.focused).to.be.true;

            button.focus();
            expect(isMenuActiveElement(el)).to.be.false;
            el.focus();
            await elementUpdated(el);
            await waitUntil(
                () => isMenuActiveElement(el),
                'first item refocused'
            );
            expect(isMenuActiveElement(el)).to.be.true;
            expect(thirdItem.focused).to.be.true;
        });
        it('allows tabing to close', async () => {
            const input = document.createElement('input');
            el.insertAdjacentElement('afterend', input);
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            await nextFrame();

            expect(el.open).to.be.true;
            el.focus();

            const closed = oneEvent(el, 'sp-closed');
            sendKeys({ press: 'Tab' });
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
            });
            it('tabs forward through the element', async () => {
                // start at input1
                input1.focus();
                await nextFrame();
                expect(document.activeElement === input1, 'focuses input 1').to
                    .true;
                // tab to the picker
                let focused = oneEvent(el, 'focus');
                await sendKeys({ press: 'Tab' });
                await focused;

                expect(el.focused, 'focused').to.be.true;
                expect(el.open, 'closed').to.be.false;
                expect(document.activeElement === el, 'focuses el').to.be.true;
                // tab through the picker to input2
                focused = oneEvent(input2, 'focus');
                await sendKeys({ press: 'Tab' });
                await focused;
                expect(document.activeElement === input2, 'focuses input 2').to
                    .true;
            });
            it('shift+tabs backwards through the element', async () => {
                // start at input1
                input2.focus();
                await nextFrame();
                expect(document.activeElement, 'focuses input 2').to.equal(
                    input2
                );
                // tab to the picker
                let focused = oneEvent(el, 'focus');
                await sendKeys({ press: 'Shift+Tab' });
                await focused;

                expect(el.focused, 'focused').to.be.true;
                expect(el.open, 'closed').to.be.false;
                expect(document.activeElement, 'focuses el').to.equal(el);
                // tab through the picker to input2
                focused = oneEvent(input1, 'focus');
                await sendKeys({ press: 'Shift+Tab' });
                await focused;
                expect(document.activeElement, 'focuses input 1').to.equal(
                    input1
                );
            });
            it('can close and immediately tab to the next tab stop', async () => {
                el.focus();
                await nextFrame();
                expect(document.activeElement, 'focuses el').to.equal(el);
                // press down to open the picker
                const opened = oneEvent(el, 'sp-opened');
                await sendKeys({ press: 'ArrowUp' });
                await opened;

                expect(el.open, 'opened').to.be.true;
                await waitUntil(
                    () => isMenuActiveElement(el),
                    'first item focused'
                );

                const closed = oneEvent(el, 'sp-closed');
                el.open = false;
                await closed;

                expect(el.open).to.be.false;
                expect(document.activeElement === el).to.be.true;

                const focused = oneEvent(input2, 'focus');
                await sendKeys({ press: 'Tab' });
                await focused;

                expect(el.open).to.be.false;
                expect(document.activeElement === input2).to.be.true;
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
                await waitUntil(
                    () => isMenuActiveElement(el),
                    'first item focused'
                );

                const closed = oneEvent(el, 'sp-closed');
                el.open = false;
                await closed;

                expect(el.open).to.be.false;
                expect(document.activeElement === el).to.be.true;

                const focused = oneEvent(input1, 'focus');
                sendKeys({ press: 'Shift+Tab' });
                await focused;

                expect(el.open).to.be.false;
                expect(document.activeElement === input1).to.be.true;
            });
        });
        it('does not open when [readonly]', async () => {
            el.readonly = true;

            await elementUpdated(el);

            const button = el.button as HTMLButtonElement;

            button.click();
            await elementUpdated(el);

            expect(el.open).to.be.false;
        });
        it('scrolls selected into view on open', async () => {
            (
                el.shadowRoot.querySelector('sp-popover') as Popover
            ).style.height = '40px';

            const firstItem = el.querySelector(
                'sp-menu-item:first-child'
            ) as MenuItem;
            const lastItem = el.querySelector(
                'sp-menu-item:last-child'
            ) as MenuItem;
            lastItem.disabled = false;
            el.value = lastItem.value;

            await elementUpdated(el);

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;
            await waitUntil(
                () => isMenuActiveElement(el),
                'first item focused'
            );
            const getParentOffset = (el: HTMLElement): number => {
                const parentScroll = (
                    (el as HTMLElement & { assignedSlot: HTMLSlotElement })
                        .assignedSlot.parentElement as HTMLElement
                ).scrollTop;
                const parentOffset = el.offsetTop - parentScroll;
                return parentOffset;
            };
            expect(getParentOffset(lastItem)).to.be.lessThan(40);
            expect(getParentOffset(firstItem)).to.be.lessThan(-1);

            lastItem.dispatchEvent(
                new FocusEvent('focusin', { bubbles: true })
            );
            await sendKeys({
                press: 'ArrowDown',
            });
            await elementUpdated(el);
            await nextFrame();
            expect(getParentOffset(lastItem)).to.be.greaterThan(40);
            expect(getParentOffset(firstItem)).to.be.greaterThan(-1);
        });
    });
    describe('grouped', async () => {
        const groupedFixture = async (): Promise<Picker> => {
            return fixture<Picker>(
                html`
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
                            <sp-menu-divider></sp-menu-divider>
                            <sp-menu-item value="2">Soon</sp-menu-item>
                            <sp-menu-item value="3">
                                As part of my next project
                            </sp-menu-item>
                            <sp-menu-item value="4">In the future</sp-menu-item>
                        </sp-menu-group>
                    </sp-picker>
                `
            );
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
            const test = await fixture<Picker>(
                html`
                    <div>
                        <sp-field-label for="picker-slotted">
                            Where do you live?
                        </sp-field-label>
                        <sp-picker id="picker-slotted">
                            <span slot="label">
                                Select a Country with a very long label, too
                                long in fact
                            </span>
                            <sp-menu-item>Deselect</sp-menu-item>
                            <sp-menu-item value="option-2">
                                Select Inverse
                            </sp-menu-item>
                            <sp-menu-item>Feather...</sp-menu-item>
                            <sp-menu-item>Select and Mask...</sp-menu-item>
                            <sp-menu-divider></sp-menu-divider>
                            <sp-menu-item>Save Selection</sp-menu-item>
                            <sp-menu-item disabled>Make Work Path</sp-menu-item>
                        </sp-picker>
                    </div>
                `
            );

            return test.querySelector('sp-picker') as Picker;
        };
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

        it('loads accessibly w/ slotted label', async () => {
            await expect(el).to.be.accessible();
        });
    });
    describe('deprecated', () => {
        const pickerFixture = async (): Promise<Picker> => {
            const test = await fixture<Picker>(
                html`
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
                                <sp-menu-divider></sp-menu-divider>
                                <sp-menu-item>Save Selection</sp-menu-item>
                                <sp-menu-item disabled>
                                    Make Work Path
                                </sp-menu-item>
                            </sp-menu>
                        </sp-picker>
                    </div>
                `
            );

            return test.querySelector('sp-picker') as Picker;
        };
        describe('Dev mode', () => {
            it('warns in Dev Mode of deprecated `<sp-menu>` usage', async () => {
                const consoleWarnStub = stub(console, 'warn');
                el = await pickerFixture();
                await elementUpdated(el);

                expect(consoleWarnStub.called).to.be.true;
                const spyCall = consoleWarnStub.getCall(0);
                expect(
                    spyCall.args.at(0).includes('<sp-menu>'),
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
                consoleWarnStub.restore();
                if (el.open) {
                    const closed = oneEvent(el, 'sp-closed');
                    el.open = false;
                    await closed;
                }
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
                el.button.click();
                await opened;

                expect(el.open).to.be.true;
                expect(el.selectedItem?.itemText).to.be.undefined;
                expect(el.value).to.equal('');

                const closed = oneEvent(el, 'sp-closed');
                secondItem.click();
                await closed;

                expect(el.open).to.be.false;
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
        const el2 = await pickerFixture();
        const el1 = await pickerFixture();

        (el1.parentElement as HTMLElement).style.float = 'left';
        (el2.parentElement as HTMLElement).style.float = 'left';
        el1.id = 'away';
        el2.id = 'other';

        await Promise.all([elementUpdated(el1), elementUpdated(el2)]);

        expect(el1.open, 'closed 1').to.be.false;
        expect(el2.open, 'closed 1').to.be.false;
        let open = oneEvent(el1, 'sp-opened');
        el1.click();
        await open;
        expect(el1.open).to.be.true;
        expect(el2.open).to.be.false;

        open = oneEvent(el2, 'sp-opened');
        let closed = oneEvent(el1, 'sp-closed');
        el2.click();
        await Promise.all([open, closed]);
        expect(el1.open).to.be.false;
        expect(el2.open).to.be.true;

        open = oneEvent(el1, 'sp-opened');
        closed = oneEvent(el2, 'sp-closed');
        el1.click();
        await Promise.all([open, closed]);
        expect(el2.open).to.be.false;
        expect(el1.open).to.be.true;

        closed = oneEvent(el1, 'sp-closed');
        sendKeys({
            press: 'Escape',
        });
        await closed;
        expect(el1.open).to.be.false;
    });
    it('displays selected item text by default', async () => {
        const el = await fixture<Picker>(
            html`
                <sp-picker
                    value="inverse"
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
                    <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            `
        );
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
        sendKeys({ press: 'Enter' });
        await opened;

        expect(
            el === document.activeElement,
            `activeElement is ${document.activeElement?.localName}`
        ).to.be.true;
        expect(
            (el as unknown as TestablePicker).optionsMenu ===
                el.shadowRoot.activeElement,
            `activeElement is ${el.shadowRoot.activeElement?.localName}`
        ).to.be.true;

        expect(firstItem.focused, 'firstItem NOT "focused"').to.be.false;
        expect(secondItem.focused, 'secondItem "focused"').to.be.true;
        expect(
            (el as unknown as TestablePicker).optionsMenu.getAttribute(
                'aria-activedescendant'
            )
        ).to.equal(secondItem.id);
    });
    it('resets value when item not available', async () => {
        const el = await fixture<Picker>(
            html`
                <sp-picker
                    value="missing"
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
                    <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            `
        );

        await elementUpdated(el);
        await waitUntil(() => el.value === '');

        expect(el.value).to.equal('');
        expect(el.selectedItem?.itemText).to.be.undefined;
    });
    it('allows event listeners on child items', async () => {
        const mouseenterSpy = spy();
        const handleMouseenter = (): void => mouseenterSpy();
        const el = await fixture<Picker>(
            html`
                <sp-picker
                    label="Select a Country with a very long label, too long in fact"
                >
                    <sp-menu-item
                        value="deselect"
                        @mouseenter=${handleMouseenter}
                    >
                        Deselect Text
                    </sp-menu-item>
                </sp-picker>
            `
        );

        await elementUpdated(el);

        const hoverEl = el.querySelector('sp-menu-item') as MenuItem;

        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        hoverEl.dispatchEvent(new MouseEvent('mouseenter'));
        await elementUpdated(el);

        expect(el.open).to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(mouseenterSpy.calledOnce).to.be.true;
    });
    it('dispatches events on open/close', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const handleOpenedSpy = (event: Event): void => openedSpy(event);
        const handleClosedSpy = (event: Event): void => closedSpy(event);

        const el = await fixture<Picker>(
            html`
                <sp-picker
                    label="Select a Country with a very long label, too long in fact"
                    @sp-opened=${handleOpenedSpy}
                    @sp-closed=${handleClosedSpy}
                >
                    <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
                </sp-picker>
            `
        );

        await elementUpdated(el);
        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;
        await elementUpdated(el);

        expect(openedSpy.calledOnce).to.be.true;
        expect(closedSpy.calledOnce).to.be.false;

        // const openedEvent = openedSpy
        //     .args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        // expect(openedEvent.detail.interaction).to.equal('modal');

        const closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;
        await elementUpdated(el);

        expect(closedSpy.calledOnce).to.be.true;

        // const closedEvent = closedSpy
        //     .args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        // expect(closedEvent.detail.interaction).to.equal('modal');
    });
}
