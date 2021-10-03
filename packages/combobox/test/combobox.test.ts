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

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';

import '../sp-combobox.js';
import '../sp-combobox-item.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import type { Theme } from '@spectrum-web-components/theme';
import { Combobox, ComboboxItem, ComboboxOption } from '..';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    escapeEvent,
    homeEvent,
} from '../../../test/testing-helpers.js';
import {
    a11ySnapshot,
    executeServerCommand,
    findAccessibilityNode,
} from '@web/test-runner-commands';
import { PickerButton } from '@spectrum-web-components/picker-button';

export type TestableCombobox = Combobox & {
    activeDescendent: ComboboxOption;
    availableOptions: ComboboxOption[];
};

const comboboxFixture = async (): Promise<TestableCombobox> => {
    const options: ComboboxOption[] = [
        { id: 'thing1', value: 'Abc Thing 1' },
        { id: 'thing1a', value: 'Bde Thing 2' },
        { id: 'thing1b', value: 'Bef Thing 3' },
        { id: 'thing4', value: 'Efg Thing 4' },
    ];

    const test = await fixture<Theme>(
        html`
            <sp-theme theme="spectrum" color="light" scale="medium">
                <sp-combobox .options=${options}>Combobox</sp-combobox>
            </sp-theme>
        `
    );

    const el = test.querySelector('sp-combobox') as unknown as TestableCombobox;

    return el;
};

export const testActiveElement = (
    el: TestableCombobox,
    testId: string
): void => {
    expect(el.activeDescendent?.id).to.equal(testId);
    const activeElement = el.shadowRoot.querySelector(
        `#${el.activeDescendent.id}-sr`
    ) as ComboboxItem;
    expect(activeElement.getAttribute('aria-selected')).to.equal('true');
};

describe('Combobox', () => {
    afterEach(() => {
        const overlays = document.querySelectorAll('active-overlay');
        overlays.forEach((overlay) => overlay.remove());
    });
    describe('renders accessibly', () => {
        it('renders initially', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            await expect(el).to.be.accessible();
        });
        it('renders open', async () => {
            const el = await comboboxFixture();

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            await elementUpdated(el);
            await expect(el).to.be.accessible();
        });
        it('renders with an active descendent', async () => {
            const el = await comboboxFixture();

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            el.activeDescendent = el.availableOptions[0];
            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });
        it('manages its "name" value in the accessibility tree', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            type NamedNode = { name: string; role: string; value?: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) =>
                        node.name === 'Combobox' &&
                        !node.value &&
                        node.role === 'combobox'
                ),
                '`name` is the label text'
            ).to.not.be.null;

            el.value = 'Bde Thing 2';
            await elementUpdated(el);
            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) =>
                        node.name === 'Combobox' &&
                        node.value === 'Bde Thing 2' &&
                        node.role === 'combobox'
                ),
                '`name` is the label text plus the selected item text'
            ).to.not.be.null;
        });
        it('manages aria-activedescendant', async () => {
            type ActiveDescendentFindableNode = {
                name: string;
                role: string;
                value?: string;
                activedescendent?: boolean;
                expanded?: boolean;
            };
            type ActiveNodeWithChildren = ActiveDescendentFindableNode & {
                children: ActiveDescendentFindableNode[];
            };
            const el = await comboboxFixture();
            await elementUpdated(el);

            let snapshot = (await a11ySnapshot(
                {}
            )) as unknown as ActiveNodeWithChildren;
            expect(el.activeDescendent).to.be.undefined;
            el.click();
            await elementUpdated(el);
            el.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);
            expect(el.activeDescendent.id).to.equal('thing1');
            expect(
                findAccessibilityNode<ActiveDescendentFindableNode>(
                    snapshot,
                    (node) => !!node.activedescendent
                )
            ).to.be.null;
            snapshot = (await a11ySnapshot(
                {}
            )) as unknown as ActiveNodeWithChildren;
            const activeDescendent = findAccessibilityNode(
                snapshot,
                (node) => node.role === 'combobox'
            );
            // Doesn't actually test active descendent yet.
            expect(activeDescendent).to.not.be.null;
        });
        it('manages aria-selected', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            type SelectedNode = { selected?: boolean };
            let snapshot = (await a11ySnapshot(
                {}
            )) as unknown as SelectedNode & { children: SelectedNode[] };

            expect(
                findAccessibilityNode<SelectedNode>(
                    snapshot,
                    (node) => !!node.selected
                )
            ).to.be.null;

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;
            await elementUpdated(el);
            expect(el.open).to.be.true;

            el.focus();
            await elementUpdated(el);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();
            await nextFrame();

            expect(el.activeDescendent.id).to.equal('thing1');
            snapshot = (await a11ySnapshot({})) as unknown as SelectedNode & {
                children: SelectedNode[];
            };
            expect(
                findAccessibilityNode<SelectedNode>(
                    snapshot,
                    (node) => !!node.selected
                ),
                JSON.stringify(snapshot, null, '  ')
            ).to.not.be.null;
        });
        it('manages aria-expanded', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            type ExpandedNode = { expanded?: boolean };
            let snapshot = (await a11ySnapshot(
                {}
            )) as unknown as ExpandedNode & { children: ExpandedNode[] };

            expect(
                findAccessibilityNode<ExpandedNode>(
                    snapshot,
                    (node) => !!node.expanded
                )
            ).to.be.null;

            el.click();
            await elementUpdated(el);
            expect(el.open).to.be.true;

            snapshot = (await a11ySnapshot({})) as unknown as ExpandedNode & {
                children: ExpandedNode[];
            };
            expect(
                findAccessibilityNode<ExpandedNode>(
                    snapshot,
                    (node) => !!node.expanded
                )
            ).to.not.be.null;
        });
    });
    it('loads with list closed', async () => {
        const el = await comboboxFixture();

        await elementUpdated(el);

        expect(el.open).to.be.false;
    });
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
            expect(el.activeDescendent).to.not.be.undefined;
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
            expect(el.activeDescendent).to.be.undefined;
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
        it('moves the carat/removes activeDescendent on ArrowLeft', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Abc Thing 1';
            await elementUpdated(el);

            el.focusElement.setSelectionRange(4, 4);
            el.focusElement.focus();
            expect(el.focusElement.selectionStart).to.equal(4);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'thing1');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'ArrowLeft',
            });

            await elementUpdated(el);
            expect(el.focusElement.selectionStart).to.equal(3);
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.true;
        });
        it('moves the carat/removes activeDescendent on ArrowRight', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Abc Thing 1';
            await elementUpdated(el);

            el.focusElement.setSelectionRange(1, 1);
            el.focusElement.focus();
            expect(el.focusElement.selectionStart).to.equal(1);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'thing1');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'ArrowRight',
            });

            await elementUpdated(el);
            expect(el.focusElement.selectionStart).to.equal(2);
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.true;
        });
        it('moves carat to 0 with Home key', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Abc Thing 1';

            await elementUpdated(el);
            el.focusElement.focus();
            el.focusElement.setSelectionRange(4, 4);
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 1').to.equal(4);
            expect(el.focusElement.selectionEnd, 'end 1').to.equal(4);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            testActiveElement(el, 'thing1');
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(homeEvent());
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 2').to.equal(0);
            expect(el.focusElement.selectionEnd, 'end 2').to.equal(0);
            expect(el.activeDescendent).to.be.undefined;
            expect(el.shadowRoot.querySelector('[aria-selected="true"]')).to.be
                .null;
            expect(el.open).to.be.true;
        });
        it('moves carat to end with End key', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            el.open = true;
            el.value = 'Abc Thing 1';
            await elementUpdated(el);

            el.focusElement.focus();
            el.focusElement.setSelectionRange(1, 1);
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 1').to.equal(1);
            expect(el.focusElement.selectionEnd, 'end 1').to.equal(1);

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            expect(el.activeDescendent.id).to.equal('thing1');
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(endEvent());
            await elementUpdated(el);
            expect(el.focusElement.selectionStart, 'start 2').to.equal(11);
            expect(el.focusElement.selectionEnd, 'end 2').to.equal(11);
            expect(el.activeDescendent).to.be.undefined;
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

            const opened = oneEvent(el.focusElement, 'sp-opened');
            el.open = true;
            await opened;
            expect(el.open).to.be.true;

            const closed = oneEvent(el.focusElement, 'sp-closed');
            button.click();
            await closed;

            await elementUpdated(el);
            expect(el.open).to.be.false;
        });
    });
    describe('manage active decendent', () => {
        it('sets activeDescendent to first descendent on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1');
        });
        it('updates activeDescendent on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1');
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1a');
        });
        it('cycles activeDescendent on ArrowDown', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1');
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1');
        });
        it('sets activeDescendent to last descendent on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing4');
        });
        it('updates activeDescendent on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing4');
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1b');
        });
        it('cycles activeDescendent on ArrowUp', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing4');
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing4');
        });
        it('sets the activeDescendent on pointerenter of an item', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const descendent = 'thing1b';
            const item = el.shadowRoot.querySelector(
                `#${descendent}`
            ) as HTMLElement;

            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            item.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                })
            );

            await elementUpdated(el);

            expect(el.open).to.be.true;
            testActiveElement(el, descendent);
        });
        it('clears the activeDescendent on pointerleave of an item', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const descendent = 'thing1b';
            const item = el.shadowRoot.querySelector(
                `#${descendent}`
            ) as HTMLElement;

            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            item.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                })
            );

            await elementUpdated(el);

            expect(el.open).to.be.true;
            testActiveElement(el, descendent);
            item.dispatchEvent(
                new PointerEvent('pointerleave', {
                    bubbles: true,
                })
            );

            await elementUpdated(el);

            expect(el.open).to.be.true;
            expect(el.activeDescendent).to.be.undefined;
        });
    });
    describe('item selection', () => {
        it('sets the value when descendent is active and `enter` is pressed', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            el.focusElement.focus();
            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.dispatchEvent(arrowDownEvent());
            await opened;

            expect(el.open).to.be.true;

            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());

            await elementUpdated(el);
            testActiveElement(el, 'thing1a');
            el.focusElement.dispatchEvent(enterEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
            expect(el.activeDescendent).to.be.undefined;
            expect(el.value).to.equal('Bde Thing 2');
            expect(el.focusElement.value).to.equal(el.value);
        });
        it('does not set the value when `enter` is pressed and no active descendent', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;
            expect(el.activeDescendent).to.be.undefined;

            el.focusElement.dispatchEvent(enterEvent());

            await elementUpdated(el);
            expect(el.open).to.be.false;
            expect(el.activeDescendent).to.be.undefined;
            expect(el.value).to.equal('');
            expect(el.focusElement.value).to.equal(el.value);
        });
        it('sets the value when an item is clicked', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const item = el.shadowRoot.querySelector('#thing1b') as HTMLElement;

            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            const itemValue = (item.textContent as string).trim();

            item.dispatchEvent(
                new PointerEvent('pointerenter', {
                    bubbles: true,
                })
            );
            await elementUpdated(el);
            testActiveElement(el, 'thing1b');

            item.click();

            await elementUpdated(el);

            expect(el.value).to.equal(itemValue);
            expect(el.open).to.be.false;
            expect(el.activeDescendent).to.be.undefined;
        });
        it('sets the value when an item is clicked programatically', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);

            const item = el.shadowRoot.querySelector('#thing1b') as HTMLElement;

            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;

            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.click();
            await opened;

            expect(el.open).to.be.true;

            const itemValue = (item.textContent as string).trim();

            item.click();

            await elementUpdated(el);

            expect(el.value).to.equal(itemValue);
            expect(el.open).to.be.false;
            expect(el.activeDescendent).to.be.undefined;
        });
    });
    describe('responds to value changes', () => {
        it('sets the value when descendent is active and `enter` is pressed', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
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
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(4);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            await executeServerCommand('send-keys', {
                press: 'g',
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
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(4);
            expect(el.options.length).equal(4);
            let items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(4);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            await executeServerCommand('send-keys', {
                press: 'B',
            });

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.value).to.equal('B');
            expect(el.availableOptions.length).equal(2);
            expect(el.options.length).equal(4);
            items = [
                ...el.shadowRoot.querySelectorAll('#listbox sp-menu-item'),
            ];
            expect(items.length).to.equal(2);

            await executeServerCommand('send-keys', {
                press: 'D',
            });

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.value).to.equal('BD');
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
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(4);

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            el.value = 'B';

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.availableOptions.length).equal(2);

            el.value = 'Bd';

            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(el.availableOptions.length).equal(1);
        });
        it('filtered items only can be accessed by ArrowUp/Down events', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            el.value = 'Bde Thing 2';
            await elementUpdated(el);

            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.false;
            expect(el.availableOptions.length).equal(1);

            el.focus();
            const opened = oneEvent(el, 'sp-opened');
            el.focusElement.dispatchEvent(arrowDownEvent());
            await opened;
            await elementUpdated(el);

            expect(el.activeDescendent?.value).to.equal(el.value);
        });
        it('deactives descendent on input', async () => {
            const el = await comboboxFixture();

            await elementUpdated(el);
            expect(el.value).to.equal('');
            expect(el.activeDescendent).to.be.undefined;
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
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.true;

            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);
            el.focusElement.dispatchEvent(arrowDownEvent());
            await elementUpdated(el);

            expect(el.value).to.equal('B');
            testActiveElement(el, 'thing1b');
            expect(el.open).to.be.true;

            await executeServerCommand('send-keys', {
                press: 'd',
            });
            await elementUpdated(el);

            expect(el.value).to.equal('Bd');
            expect(el.activeDescendent).to.be.undefined;
            expect(el.open).to.be.true;
        });
    });
});
