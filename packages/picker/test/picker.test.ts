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

import '../sp-picker.js';
import { Picker } from '..';

import '@spectrum-web-components/overlay/active-overlay.js';
import { OverlayOpenCloseDetail } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
    nextFrame,
} from '@open-wc/testing';
import '@spectrum-web-components/shared/src/focus-visible.js';
import { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowUpEvent,
    arrowLeftEvent,
    arrowRightEvent,
    findAccessibilityNode,
    tabEvent,
    tEvent,
} from '../../../test/testing-helpers.js';
import { executeServerCommand } from '@web/test-runner-commands';

const isMenuActiveElement = function (): boolean {
    return document.activeElement instanceof Menu;
};

describe('Picker', () => {
    const pickerFixture = async (): Promise<Picker> => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label for="picker">
                        Where do you live?
                    </sp-field-label>
                    <sp-picker id="picker">
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

        await waitUntil(
            () => !!window.applyFocusVisiblePolyfill,
            'polyfill loaded'
        );

        return test.querySelector('sp-picker') as Picker;
    };

    const deprecatedPickerFixture = async (): Promise<Picker> => {
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
                            <sp-menu-item disabled>Make Work Path</sp-menu-item>
                        </sp-menu>
                    </sp-picker>
                </div>
            `
        );

        await waitUntil(
            () => !!window.applyFocusVisiblePolyfill,
            'polyfill loaded'
        );

        return test.querySelector('sp-picker') as Picker;
    };

    const slottedLabelFixture = async (): Promise<Picker> => {
        const test = await fixture<Picker>(
            html`
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
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-picker>
                </div>
            `
        );

        await waitUntil(
            () => !!window.applyFocusVisiblePolyfill,
            'polyfill loaded'
        );

        return test.querySelector('sp-picker') as Picker;
    };

    afterEach(async () => {
        const overlays = document.querySelectorAll('active-overlay');
        overlays.forEach((overlay) => overlay.remove());
    });

    it('loads accessibly', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('accepts a new item and value at the same time', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        el.value = 'option-2';

        await elementUpdated(el);
        expect(el.value).to.equal('option-2');

        const item = document.createElement('sp-menu-item');
        item.value = 'option-new';
        item.textContent = 'New Option';

        el.append(item);
        el.value = 'option-new';

        await elementUpdated(el);
        expect(el.value).to.equal('option-new');
    });

    it('manages its "name" value in the accessibility tree', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);
        type NamedNode = { name: string };
        let snapshot = (await executeServerCommand(
            'a11y-snapshot'
        )) as NamedNode & { children: NamedNode[] };

        expect(
            findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.name ===
                    'Where do you live? Select a Country with a very long label, too long in fact'
            ),
            '`name` is the label text'
        );

        el.value = 'option-2';
        await elementUpdated(el);
        snapshot = (await executeServerCommand(
            'a11y-snapshot'
        )) as NamedNode & { children: NamedNode[] };

        expect(
            findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === 'Where do you live? Select Inverse'
            ),
            '`name` is the label text plus the selected item text'
        );
    });

    it('loads accessibly w/ slotted label', async () => {
        const el = await slottedLabelFixture();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('renders invalid accessibly', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        el.invalid = true;
        await elementUpdated(el);

        expect(el.invalid);
        await expect(el).to.be.accessible();
    });
    it('renders selection accessibly', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        el.value = 'option-2';
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('closes when becoming disabled', async () => {
        const el = await pickerFixture();

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
        const el = await pickerFixture();
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
    it('toggles between pickers', async () => {
        const el2 = await pickerFixture();
        const el1 = await pickerFixture();

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
    it('selects with deprecated syntax', async () => {
        const el = await deprecatedPickerFixture();

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');
    });
    it('selects', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');
    });
    it('re-selects', async () => {
        const el = await pickerFixture();

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
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');
        expect(el.value).to.equal('option-2');

        firstItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Deselect');
        expect(el.value).to.equal('Deselect');
    });
    it('can have selection prevented', async () => {
        const preventChangeSpy = spy();
        const el = await pickerFixture();

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');
        expect(secondItem.selected).to.be.false;

        el.addEventListener('change', (event: Event): void => {
            event.preventDefault();
            preventChangeSpy();
        });

        secondItem.click();
        await elementUpdated(el);
        await waitUntil(() => el.open, 'reopens picker');
        expect(secondItem.selected, 'selection prevented').to.be.false;
        expect(preventChangeSpy.calledOnce);
    });

    it('can throw focus after `change`', async () => {
        const el = await pickerFixture();
        const input = document.createElement('input');
        document.body.append(input);

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');
        expect(secondItem.selected).to.be.false;

        el.addEventListener('change', (): void => {
            input.focus();
        });

        secondItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.value, 'value changed').to.equal('option-2');
        expect(secondItem.selected, 'selected changed').to.be.true;
        await waitUntil(() => document.activeElement === input, 'focus throw');
        input.remove();
    });
    it('opens on ArrowUp', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        const button = el.button as HTMLButtonElement;

        el.focus();
        await elementUpdated(el);

        expect(el.open, 'inially closed').to.be.false;

        button.dispatchEvent(tEvent);
        await elementUpdated(el);

        expect(el.open, 'still closed').to.be.false;

        button.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(el.open, 'open by ArrowUp').to.be.true;

        await waitUntil(
            () => document.querySelector('active-overlay') !== null,
            'an active-overlay has been inserted on the page'
        );

        button.dispatchEvent(
            new KeyboardEvent('keyup', {
                bubbles: true,
                composed: true,
                cancelable: true,
                key: 'Escape',
                code: 'Escape',
            })
        );
        await elementUpdated(el);
        await waitUntil(() => el.open === false, 'closed by Escape');
        await waitUntil(
            () => document.querySelector('active-overlay') === null,
            'an active-overlay has been inserted on the page'
        );
    });
    it('opens on ArrowDown', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        el.focus();
        await elementUpdated(el);

        expect(el.open, 'inially closed').to.be.false;

        button.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(el.open, 'open by ArrowDown').to.be.true;
        expect(el.selectedItem?.itemText).to.be.undefined;
        expect(el.value).to.equal('');

        firstItem.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Deselect');
        expect(el.value).to.equal('Deselect');
    });
    it('quick selects on ArrowLeft/Right', async () => {
        const selectionSpy = spy();
        const el = await pickerFixture();
        el.addEventListener('change', (event: Event) => {
            const { value } = event.target as Picker;
            console.log('change', value);
            selectionSpy(value);
        });
        const button = el.button as HTMLButtonElement;

        await elementUpdated(el);
        el.focus();
        button.dispatchEvent(arrowLeftEvent);

        await elementUpdated(el);

        expect(selectionSpy.callCount).to.equal(1);
        expect(selectionSpy.calledWith('Deselected'));
        button.dispatchEvent(arrowLeftEvent);

        await elementUpdated(el);
        expect(selectionSpy.callCount).to.equal(1);
        button.dispatchEvent(arrowRightEvent);

        await elementUpdated(el);
        expect(selectionSpy.calledWith('option-2'));

        button.dispatchEvent(arrowRightEvent);
        button.dispatchEvent(arrowRightEvent);
        button.dispatchEvent(arrowRightEvent);
        button.dispatchEvent(arrowRightEvent);

        await elementUpdated(el);
        expect(selectionSpy.callCount).to.equal(5);
        expect(selectionSpy.calledWith('Save Selection'));
        expect(selectionSpy.calledWith('Make Work Path')).to.be.false;
    });
    it('quick selects first item on ArrowRight when no value', async () => {
        const selectionSpy = spy();
        const el = await pickerFixture();
        el.addEventListener('change', (event: Event) => {
            const { value } = event.target as Picker;
            console.log('change', value);
            selectionSpy(value);
        });
        const button = el.button as HTMLButtonElement;

        await elementUpdated(el);
        el.focus();
        button.dispatchEvent(arrowRightEvent);

        await elementUpdated(el);

        expect(selectionSpy.callCount).to.equal(1);
        expect(selectionSpy.calledWith('Deselected'));
    });
    it('loads', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
    });
    it('refocuses on list when open', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        el.open = true;
        await elementUpdated(el);
        await waitUntil(() => isMenuActiveElement(), 'first item focused');
        expect(firstItem.focused).to.be.true;

        el.blur();
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.focus();
        await elementUpdated(el);
        await waitUntil(() => isMenuActiveElement(), 'first item refocused');
        expect(el.open).to.be.true;
        expect(isMenuActiveElement()).to.be.true;
        expect(firstItem.focused).to.be.true;
    });
    it('allows tabing to close', async () => {
        const el = await pickerFixture();

        await elementUpdated(el);

        el.open = true;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        el.focus();
        await elementUpdated(el);
        await waitUntil(() => isMenuActiveElement(), 'first item refocused');
        expect(el.open).to.be.true;
        expect(isMenuActiveElement()).to.be.true;

        const menu = document.activeElement as Menu;
        menu.dispatchEvent(tabEvent);

        await elementUpdated(el);
        await waitUntil(() => !el.open);

        expect(el.open, 'closes').to.be.false;
        expect(document.activeElement === menu, 'focuses something else').to.be
            .false;
    });
    it('displays selected item text by default', async () => {
        const focusSelectedSpy = spy();
        const focusFirstSpy = spy();
        const handleFirstFocus = (): void => focusFirstSpy();
        const handleSelectedFocus = (): void => focusSelectedSpy();
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

        firstItem.addEventListener('focus', handleFirstFocus);
        secondItem.addEventListener('focus', handleSelectedFocus);

        expect(el.value).to.equal('inverse');
        expect(el.selectedItem?.itemText).to.equal('Select Inverse');

        const button = el.button as HTMLButtonElement;
        button.click();

        await waitUntil(() => isMenuActiveElement(), 'menu focused');

        expect(focusFirstSpy.called, 'do not focus first element').to.be.false;
        expect(secondItem.focused, 'secondItem "focused"').to.be.true;
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
        el.open = true;

        await elementUpdated(el);
        await waitUntil(() => isMenuActiveElement(), 'first item focused');

        expect(openedSpy.calledOnce).to.be.true;
        expect(closedSpy.calledOnce).to.be.false;

        const openedEvent = openedSpy
            .args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        expect(openedEvent.detail.interaction).to.equal('inline');

        el.open = false;
        await elementUpdated(el);

        await waitUntil(() => closedSpy.calledOnce, 'closed event received');

        expect(closedSpy.calledOnce).to.be.true;

        const closedEvent = closedSpy
            .args[0][0] as CustomEvent<OverlayOpenCloseDetail>;
        expect(closedEvent.detail.interaction).to.equal('inline');
    });
    it('does not open when [readonly]', async () => {
        const el = await pickerFixture();

        el.readonly = true;

        await elementUpdated(el);

        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
    });
    it('scrolls selected into view on open', async () => {
        const el = await pickerFixture();

        const popover = el.shadowRoot.querySelector(
            'sp-popover'
        ) as HTMLElement;
        popover.style.height = '40px';

        const firstItem = el.querySelector(
            'sp-menu-item:first-child'
        ) as MenuItem;
        const lastItem = el.querySelector(
            'sp-menu-item:last-child'
        ) as MenuItem;
        lastItem.disabled = false;
        el.value = lastItem.value;

        await elementUpdated(el);

        el.open = true;

        await elementUpdated(el);
        await nextFrame();
        const getParentOffset = (el: HTMLElement): number => {
            const parentScroll = (el.parentElement as HTMLElement).scrollTop;
            const parentOffset = el.offsetTop - parentScroll;
            return parentOffset;
        };
        expect(lastItem.focused, 'last focused').to.be.true;
        expect(firstItem.focused, 'first not focused').to.be.false;
        expect(getParentOffset(lastItem)).to.be.lessThan(40);
        expect(getParentOffset(firstItem)).to.be.lessThan(-1);

        lastItem.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        lastItem.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        await nextFrame();
        expect(lastItem.focused, 'last not focused').to.be.false;
        expect(firstItem.focused, 'first focused').to.be.true;
        expect(getParentOffset(lastItem)).to.be.greaterThan(40);
        expect(getParentOffset(firstItem)).to.be.greaterThan(-1);
    });
});
