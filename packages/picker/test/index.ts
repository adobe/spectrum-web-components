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
import '@spectrum-web-components/field-label/sp-field-label.js';
import { FieldLabel } from '@spectrum-web-components/field-label/src/FieldLabel.js';
import type { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/picker/sp-picker.js';
import { SAFARI_FOCUS_RING_CLASS } from '@spectrum-web-components/picker/src/InteractionController.js';
import { isWebKit } from '@spectrum-web-components/shared';
import '@spectrum-web-components/shared/src/focus-visible.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import type { Icon } from '@spectrum-web-components/icon';

import {
    a11ySnapshot,
    findAccessibilityNode,
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
    fixture as styledFixture,
    testForLitDevWarnings,
    tEvent,
} from '../../../test/testing-helpers.js';
import { M as Pending } from '../stories/picker-pending.stories.js';
import {
    Default,
    Disabled,
    DynamicIcons,
    IconsOnly,
    NoVisibleLabel,
    SlottedLabel,
    Tooltip as TooltipStory,
} from '../stories/picker.stories.js';

export type TestablePicker = { optionsMenu: Menu };

ignoreResizeObserverLoopError(before, after);

const isMenuActiveElement = function (el: Picker): boolean {
    return (
        document.activeElement?.tagName === 'SP-MENU-ITEM' &&
        el.contains(document.activeElement)
    );
};
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function runPickerTests(): void {
    let el: Picker;
    const pickerFixture = async (): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(html`
            <sp-theme scale="medium" color="light" system="spectrum">
                <sp-field-label for="picker">Where do you live?</sp-field-label>
                <sp-picker
                    id="picker"
                    style="width: 200px; --spectrum-alias-ui-icon-chevron-size-100: 10px;"
                >
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
                    ${Default.render({
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
                    ${NoVisibleLabel.render({
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
                    ${SlottedLabel.render({
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
            el.focus();
            await elementUpdated(el);
            expect(el.shadowRoot.activeElement).to.equal(el.button);
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(el.open, 'open?').to.be.true;
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
            const opened = oneEvent(el, 'sp-opened');
            const closed = oneEvent(el, 'sp-closed');

            expect(
                firstItem.focused,
                'first item should not be visually focused before opening'
            ).to.be.false;

            el.focus();
            await elementUpdated(el);

            await sendKeys({ press: 'ArrowDown' });
            await opened;

            expect(el.open, 'picker should be open').to.be.true;
            expect(
                firstItem.focused,
                'first item should be visually focused after opening'
            ).to.be.true;

            await sendKeys({
                press: 'Escape',
            });
            await closed;

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
            const opened = oneEvent(el, 'sp-opened');
            const closed = oneEvent(el, 'sp-closed');

            expect(
                firstItem.focused,
                'should not be visually focused before opening'
            ).to.be.false;

            el.focus();
            await elementUpdated(el);

            await sendKeys({ press: 'Space' });
            await opened;

            expect(el.open, 'open?').to.be.true;
            expect(
                firstItem.focused,
                'should be visually focused after opening'
            ).to.be.true;

            await sendKeys({
                press: 'Escape',
            });
            await closed;

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
        it('opens, on click, with visible focus on a menu item', async () => {
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

            expect(el.open, 'open?').to.be.true;
            expect(firstItem.focused, 'firstItem focused?').to.be.true;
        });
        it('opens and selects in a single pointer button interaction', async () => {
            await nextFrame();
            await nextFrame();
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;
            const boundingRect = el.button.getBoundingClientRect();

            expect(el.value).to.not.equal(thirdItem.value);
            const opened = oneEvent(el, 'sp-opened');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                ],
            });
            await opened;

            const thirdItemRect = thirdItem.getBoundingClientRect();
            const closed = oneEvent(el, 'sp-closed');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            thirdItemRect.x + thirdItemRect.width / 2,
                            thirdItemRect.y + thirdItemRect.height / 2,
                        ],
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await closed;

            expect(el.open, 'open?').to.be.false;
            expect(el.value).to.equal(thirdItem.value);
        });
        it('opens/closes multiple times', async () => {
            expect(el.open, 'open?').to.be.false;
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
            expect(el.open, 'open?').to.be.true;

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
            expect(el.open, 'open?').to.be.false;

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
            expect(el.open, 'open?').to.be.true;

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
            expect(el.open, 'open?').to.be.false;
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
            el.click();
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
            sendKeys({
                press: 'Escape',
            });
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

            await sendKeys({
                press: 'ArrowLeft',
            });
            await elementUpdated(el);

            expect(
                selectionSpy.callCount,
                `selectionSpy.callCount: ${selectionSpy.callCount}`
            ).to.equal(1);
            expect(selectionSpy.calledWith('Deselected'));
            await sendKeys({
                press: 'ArrowLeft',
            });

            await elementUpdated(el);
            expect(
                selectionSpy.callCount,
                `selectionSpy.callCount: ${selectionSpy.callCount}`
            ).to.equal(1);
            await sendKeys({
                press: 'ArrowRight',
            });

            await nextFrame();
            await nextFrame();
            expect(selectionSpy.calledWith('option-2'), 'option-2');

            await sendKeys({
                press: 'ArrowRight',
            });
            await nextFrame();
            await nextFrame();
            await sendKeys({
                press: 'ArrowRight',
            });
            await nextFrame();
            await nextFrame();
            await sendKeys({
                press: 'ArrowRight',
            });
            await nextFrame();
            await nextFrame();
            await sendKeys({
                press: 'ArrowRight',
            });
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
            if (!isSafari) {
                await sendKeys({ press: 'Tab' });
                expect(document.activeElement).to.equal(input);
                await sendKeys({ press: 'Shift+Tab' });
            }
            expect(document.activeElement).to.equal(el);
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
            if (!isSafari) {
                await sendKeys({ press: 'Tab' });
                expect(document.activeElement).to.equal(input);
                await sendKeys({ press: 'Shift+Tab' });
            }
            expect(document.activeElement).to.equal(el);
            const opened = oneEvent(el, 'sp-opened');
            sendKeys({ down: 'Enter' });
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
            sendKeys({ down: 'Enter' });
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
                let focused: Promise<CustomEvent<FocusEvent>>;
                if (!isSafari) {
                    // start at input1
                    input1.focus();
                    await nextFrame();
                    expect(document.activeElement === input1, 'focuses input 1')
                        .to.true;
                    // tab to the picker
                    focused = oneEvent(el, 'focus');
                    await sendKeys({ press: 'Tab' });
                } else {
                    focused = oneEvent(el, 'focus');
                    el.focus();
                }
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
                let focused = oneEvent(el, 'focus');
                if (!isSafari) {
                    await sendKeys({ press: 'Shift+Tab' });
                    await focused;

                    expect(el.focused, 'focused').to.be.true;
                    expect(el.open, 'closed').to.be.false;
                    expect(document.activeElement, 'focuses el').to.equal(el);
                } else {
                    el.focus();
                }
                // tab through the picker to input2
                focused = oneEvent(input1, 'focus');
                await sendKeys({ press: 'Shift+Tab' });
                await focused;
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
                await sendKeys({ press: 'Tab' });

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
                sendKeys({ press: 'Shift+Tab' });
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
        it('scrolls selected into view on open', async () => {
            // the Popover is transient, you need to be able to apply custom styles to it...
            const styles = document.createElement('style');
            styles.innerText = 'sp-popover { height: 40px; }';
            el.shadowRoot.append(styles);

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
            el.focus();
            await sendKeys({
                press: 'ArrowDown',
            });
            await opened;
            await waitUntil(() => isMenuActiveElement(el), 'menu item focused');
            await nextFrame();
            await nextFrame();
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

            await sendKeys({
                press: 'ArrowDown',
            });
            await elementUpdated(el);
            await nextFrame();
            expect(getParentOffset(lastItem)).to.be.greaterThan(40);
            expect(getParentOffset(firstItem)).to.be.greaterThan(-1);
        });
        it('manages focus-ring styles', async () => {
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

            const boundingRect = el.button.getBoundingClientRect();
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
                'has focus ring?'
            ).to.be.true;

            // picker should still have focus
            expect(document.activeElement).to.equal(el);

            // click outside (0,0)
            await sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [0, 0],
                    },
                ],
            });

            // picker should not have focus
            expect(document.activeElement).not.to.equal(el);

            // Let's use keyboard to open the tray now
            opened = oneEvent(el, 'sp-opened');
            el.focus();
            await sendKeys({
                press: 'Enter',
            });
            await opened;

            // Make a selection again
            closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await closed;

            await elementUpdated(el);

            // expect the tray to be closed
            expect(el.open, 'open?').to.be.false;

            // we should not have SAFARI_FOCUS_RING_CLASS in the classList
            expect(
                button.classList.contains(SAFARI_FOCUS_RING_CLASS),
                'has focus ring?'
            ).to.be.false;
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
            <div>${IconsOnly.render({})}</div>
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
        sendKeys({
            press: 'Escape',
        });
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
        sendKeys({ press: 'Enter' });
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
            <div>${TooltipStory.render(TooltipStory.args)}</div>
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
        if (!isSafari) {
            await sendKeys({
                press: 'Tab',
            });
        } else {
            // by default Safari does not focus the button on tab unless user sets preferences
            el.focus();
        }
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
        await sendKeys({
            press: 'ArrowDown',
        });
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
        await sendKeys({
            press: 'Tab',
        });
        await menuClosed;
        expect(document.activeElement).not.to.equal(el);
        expect(tooltipEl.open, 'tooltipEl open?').to.be.false;
        expect(el.open, 'open?').to.be.false;
    });
    describe('disabled', function () {
        beforeEach(async function () {
            const test = await fixture(html`
                <div>${Disabled.render(Disabled.args)}</div>
            `);
            this.label = test.querySelector('sp-field-label') as FieldLabel;
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.elel);
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

            const boundingRect = this.el.button.getBoundingClientRect();

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
                <div>${Pending.render({ pending: true })}</div>
            `);
            this.label = test.querySelector('sp-field-label') as FieldLabel;
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.elel);
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
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) =>
                        node.name ===
                        'Pending Choose your neighborhood Where do you live?'
                )
            ).to.not.be.null;
        });
    });
    describe('dynamic icons', function () {
        beforeEach(async function () {
            const test = await fixture(html`
                <div>${DynamicIcons.render(DynamicIcons.args)}</div>
            `);
            this.el = test.querySelector('sp-picker') as Picker;
            await elementUpdated(this.el);
        });
        it('displays the same icon as the selected menu item', async function () {
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
}
