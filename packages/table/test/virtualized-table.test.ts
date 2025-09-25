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
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';

import type {
    Table,
    TableCheckboxCell,
    TableHeadCell,
    TableRow,
} from '@spectrum-web-components/table';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import {
    ignoreResizeObserverLoopError,
    sendTabKey,
} from '../../../test/testing-helpers.js';
import { makeItems, renderItem } from '../stories/index.js';
import { virtualized } from '../stories/table-virtualized.stories.js';
import { styledFixture, tableLayoutComplete } from './helpers.js';

ignoreResizeObserverLoopError(before, after);

describe('Virtualized Table', () => {
    const virtualItems = makeItems(50);

    it('loads virtualized table accessibly', async () => {
        const el = await styledFixture<Table>(virtualized());
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });

    it('can be size `s`', async () => {
        const el = await fixture<Table>(html`
            <sp-table
                size="s"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);

        expect(el.size).to.equal('s');
    });

    it('creates tab stops for `<sp-table-head-cell sortable>`', async () => {
        const input = document.createElement('input');
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        test.insertAdjacentElement('beforebegin', input);

        input.focus();
        expect(input === document.activeElement).to.be.true;

        const firstSortable = el.querySelector(
            '[sortable]:nth-of-type(1)'
        ) as TableHeadCell;
        const secondSortable = el.querySelector(
            '[sortable]:nth-of-type(2)'
        ) as TableHeadCell;

        await sendTabKey();
        expect(firstSortable === test.shadowRoot?.activeElement).to.be.true;

        await sendTabKey();
        expect(secondSortable === test.shadowRoot?.activeElement).to.be.true;
    });

    it('does not tab stop on non-sortable `<sp-table-head-cell>`s', async () => {
        const input = document.createElement('input');
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        test.insertAdjacentElement('beforebegin', input);

        input.focus();
        expect(input === document.activeElement).to.be.true;

        const firstHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(1)'
        ) as TableHeadCell;
        const secondHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(2)'
        ) as TableHeadCell;
        const thirdHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(3)'
        ) as TableHeadCell;

        await sendTabKey();
        expect(firstHeadCell === test.shadowRoot?.activeElement).to.be.true;

        await sendTabKey();
        expect(secondHeadCell === test.shadowRoot?.activeElement).to.be.true;

        await sendTabKey();
        expect(thirdHeadCell === test.shadowRoot?.activeElement).to.be.false;
    });

    it('can be focus()ed from the `<sp-table>`', async () => {
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        el.focus();

        const firstSortable = el.querySelector(
            '[sortable]:nth-of-type(1)'
        ) as TableHeadCell;

        expect(firstSortable === test.shadowRoot?.activeElement).to.be.true;
    });

    it('dispatches `sorted` events', async () => {
        const test = await fixture<Table>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        const tableHeadCell1 = el.querySelector(
            '[sortable][sort-direction]'
        ) as TableHeadCell;
        const tableHeadCell2 = el.querySelector(
            '[sortable]:not([sort-direction])'
        ) as TableHeadCell;

        tableHeadCell2.click();
        await nextFrame();

        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell2.getAttribute('sort-direction')).to.equal('asc');

        tableHeadCell2.click();
        await nextFrame();

        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell2.getAttribute('sort-direction')).to.equal('desc');

        tableHeadCell1.click();
        await nextFrame();

        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell1.getAttribute('sort-direction')).to.equal('asc');
    });

    it('dispatches `sorted` events using the keyboard', async () => {
        const test = await fixture<Table>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        const tableHeadCell1 = el.querySelector(
            '[sortable][sort-direction]'
        ) as TableHeadCell;
        const tableHeadCell2 = el.querySelector(
            '[sortable]:not([sort-direction])'
        ) as TableHeadCell;

        tableHeadCell2.focus();
        await nextFrame();
        await sendKeys({ press: 'Enter' });
        await nextFrame();

        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell2.getAttribute('sort-direction')).to.equal('asc');

        tableHeadCell2.focus();
        await nextFrame();
        await sendKeys({ press: 'Space' });
        await nextFrame();

        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell2.getAttribute('sort-direction')).to.equal('desc');

        tableHeadCell1.focus();
        await nextFrame();
        await sendKeys({ press: 'Enter' });
        await nextFrame();

        expect(tableHeadCell2.hasAttribute('sort-direction')).to.be.false;
        expect(tableHeadCell1.hasAttribute('sort-direction')).to.be.true;
        expect(tableHeadCell1.getAttribute('sort-direction')).to.equal('asc');
    });

    it('dispatches `change` events', async () => {
        const changeSpy = spy();
        const el = await fixture<Table>(html`
            <sp-table
                .selected=${['0', '22']}
                selects="multiple"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @change=${({ target }: Event & { target: Table }) => {
                    changeSpy(target);
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['0', '22']);

        await nextFrame;

        const rowTwo = el.querySelector('[value="3"]') as TableRow;
        const rowTwoCheckboxCell = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        rowTwoCheckboxCell.checkbox.click();

        expect(el.selected).to.deep.equal(['0', '22', '3']);
    });
    it('accepts change events dispatched from TableHead `<sp-table-checkbox-cell>`', async () => {
        const changeSpy = spy();
        const el = await fixture<Table>(html`
            <sp-table
                .selected=${['0', '22']}
                selects="multiple"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @change=${({ target }: Event & { target: Table }) => {
                    changeSpy(target);
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);

        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['0', '22']);

        tableHeadCheckboxCell.checkbox.click();

        expect(changeSpy.calledOnce).to.be.true;
        expect(changeSpy.calledWithExactly(el)).to.be.true;

        expect(el.selected.length).to.equal(50);
        expect(tableHeadCheckboxCell.checkbox.checked).to.be.true;
    });

    it('dispatches `rangeChanged` events on Virtualized Table', async () => {
        const el = await fixture<Table>(html`
            <sp-table
                selects="multiple"
                .selected=${['1', '47']}
                style="height: 120px"
                .items=${makeItems(50)}
                .renderItem=${renderItem}
                scroller?="true"
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['1', '47']);

        const rangeChanged = oneEvent(el, 'rangeChanged');
        let tableRow = el.querySelector('sp-table-row') as TableRow;
        const initialValue = tableRow.value;

        el.scrollToIndex(47);

        await rangeChanged;

        tableRow = el.querySelector('sp-table-row') as TableRow;
        const newValue = tableRow.value;

        expect(newValue).to.not.equal(initialValue);
    });

    it('dispatches `visibilityChanged` events on Virtualized Table', async () => {
        const visibilityChangedSpy = spy();

        const el = await fixture<Table>(html`
            <sp-table
                selects="multiple"
                .selected=${['1', '47']}
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @visibilityChanged=${({
                    target,
                }: Event & { target: Table }) => {
                    visibilityChangedSpy(target);
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);

        await tableLayoutComplete(el);

        expect(el.selected).to.deep.equal(['1', '47']);

        el.scrollToIndex(47);

        // waiting for table body
        await nextFrame();
        // waiting for virtualizer
        await nextFrame();
        await elementUpdated(el);

        expect(visibilityChangedSpy.called).to.be.true;
    });
});
