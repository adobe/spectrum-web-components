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

import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import type {
    Table,
    TableBody,
    TableCheckboxCell,
    TableRow,
} from '@spectrum-web-components/table';
import {
    virtualized,
    virtualizedCustomRow,
    virtualizedCustomValue,
    virtualizedMultiple,
    virtualizedSingle,
} from '../stories/table-virtualized.stories.js';
import { makeItems, Properties, renderItem } from '../stories/index.js';
import { ignoreResizeObserverLoopError } from '../../../test/testing-helpers.js';
import { styledFixture, tableLayoutComplete } from './helpers.js';

ignoreResizeObserverLoopError(before, after);

describe('Virtualized Table Selects', () => {
    it('selects and deselects all checkboxes in Virtualized Table when clicking the TableHeadCheckboxCell', async () => {
        const test = await fixture<Table>(html`
            <div>
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </div>
        `);
        const el = test.querySelector('sp-table') as Table;

        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['0', '48']);
        expect(el.selected.length).to.equal(2);

        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        tableHeadCheckboxCell.checkbox.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(49);

        tableHeadCheckboxCell.checkbox.click();

        await elementUpdated(el);
        await elementUpdated(tableHeadCheckboxCell);

        expect(el.selected.length).to.equal(0);
    });

    it('validates `value` property to make sure it matches the values in `selected`', async () => {
        const el = await fixture<Table>(
            virtualizedCustomValue(virtualizedCustomValue.args as Properties)
        );

        expect(el.selected).to.deep.equal(['applied-47']);

        el.selected = ['0'];
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([]);

        el.selected = ['applied-1'];
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['applied-1']);
    });

    it('can prevent selection', async () => {
        const el = await fixture<Table>(html`
            <sp-table
                size="m"
                style="height: 200px"
                selects="single"
                @change=${(event: Event) => {
                    event.preventDefault();
                }}
                .items=${makeItems(50)}
                .renderItem=${renderItem}
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

        const rowTwo = el.querySelector('[value="2"]') as TableRow;
        const rowTwoCheckbox = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        rowTwoCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(rowTwoCheckbox.checked).to.be.false;
        expect(rowTwo.selected).to.be.false;
        expect(el.selected.length).to.equal(0);
    });

    it('surfaces [selects="single"] selection on Virtualized Table', async () => {
        const test = await fixture<Table>(html`
            <sp-theme system="spectrum" scale="medium" color="light">
                ${virtualizedSingle(virtualizedSingle.args as Properties)}
            </sp-theme>
        `);
        const el = test.querySelector('sp-table') as Table;
        const body = el.querySelector('sp-table-body') as TableBody;

        await tableLayoutComplete(el);

        expect(el.selected, "'Row 50 selected").to.deep.equal(['49']);

        body.scrollTop = body.scrollHeight;

        await nextFrame();
        await nextFrame();
        await elementUpdated(el);
        await elementUpdated(body);

        const lastRow = el.querySelector('[value="49"]') as TableRow;
        expect(lastRow).to.not.be.null;

        const lastRowCheckboxCell = lastRow.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(lastRowCheckboxCell.checked).to.be.true;
    });

    it('selects via `click` while [selects="single"]', async () => {
        const test = await fixture<Table>(html`
            <sp-theme system="spectrum" scale="medium" color="light">
                ${virtualizedSingle(virtualizedSingle.args as Properties)}
            </sp-theme>
        `);
        const el = test.querySelector('sp-table') as Table;
        el.selected = [];

        await tableLayoutComplete(el);

        const rowTwo = el.querySelector('[value="1"]') as TableRow;
        const rowTwoCheckbox = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowThree = el.querySelector('[value="2"]') as TableRow;
        const rowThreeCheckbox = rowThree.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        rowTwoCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['1']);

        rowThreeCheckbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['2']);

        rowTwo.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['1']);
    });

    it('surfaces [selects="multiple"] selection on Virtualized Table', async () => {
        const test = await fixture<Table>(html`
            <sp-theme system="spectrum" scale="medium" color="light">
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </sp-theme>
        `);
        const el = test.querySelector('sp-table') as Table;
        const body = el.querySelector('sp-table-body') as TableBody;

        await tableLayoutComplete(el);

        expect(el.selected).to.deep.equal(['0', '48']);

        body.scrollTop = body.scrollHeight;

        await tableLayoutComplete(el);

        const unseenRow = el.querySelector('[value="48"]') as TableRow;
        expect(unseenRow).to.not.be.null;
        const unseenRowCheckboxCell = unseenRow.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(unseenRowCheckboxCell.checked).to.be.true;
    });

    it('selects via `click` while [selects="multiple"] selection', async () => {
        const test = await styledFixture<Table>(html`
            <div>
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </div>
        `);
        const el = test.querySelector('sp-table') as Table;
        el.selected = [];

        await tableLayoutComplete(el);

        const rowTwo = el.querySelector('[value="2"]') as TableRow;
        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowTwoCheckbox = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        rowTwoCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(rowTwoCheckbox.checked).to.be.true;
        expect(el.selected).to.deep.equal(['2']);

        tableHeadCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(49);
    });

    it('allows .selected values to be changed by the application when [selects="multiple"]', async () => {
        const test = await styledFixture<Table>(html`
            <div>
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </div>
        `);
        const el = test.querySelector('sp-table') as Table;
        el.selected = ['1'];
        await tableLayoutComplete(el);

        const rowOne = el.querySelector('[value="1"]') as TableRow;
        const rowOneCheckboxCell = rowOne.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowTwo = el.querySelector('[value="2"]') as TableRow;
        const rowTwoCheckboxCell = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['1']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.false;

        el.selected = ['1', '2'];

        await nextFrame;
        await nextFrame;
        await elementUpdated(el);
        await elementUpdated(rowTwoCheckboxCell);

        expect(el.selected).to.deep.equal(['1', '2']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwo.selected).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.true;
    });

    it('allows [selects] to be changed by the application', async () => {
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        await tableLayoutComplete(el);

        expect(el.selects).to.be.undefined;

        el.selects = 'single';
        await elementUpdated(el);

        expect(el.selects).to.equal('single');

        // render table body
        await nextFrame();
        // render checkboxes
        await nextFrame();
        await elementUpdated(el);

        const rowOne = el.querySelector('[value="0"]') as TableRow;
        const rowOneCheckboxCell = rowOne.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        const rowTwo = el.querySelector('[value="1"]') as TableRow;
        const rowTwoCheckboxCell = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(tableHeadCheckboxCell.selectsSingle).to.be.true;

        rowOneCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['0']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.false;

        el.selects = 'multiple';
        await elementUpdated(el);

        expect(el.selects).to.equal('multiple');
        expect(tableHeadCheckboxCell.indeterminate).to.be.true;

        rowTwoCheckboxCell.checkbox.click();

        await elementUpdated(el);
        await elementUpdated(rowTwoCheckboxCell);

        expect(el.selected).to.deep.equal(['0', '1']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.true;
        expect(tableHeadCheckboxCell.indeterminate).to.be.true;

        el.removeAttribute('selects');
        await elementUpdated(el);

        expect(el.selects).to.be.null;
        expect(tableHeadCheckboxCell.indeterminate).to.be.true;

        const checkboxes = el.querySelectorAll(
            'sp-table-checkbox-cell'
        ) as NodeListOf<TableCheckboxCell>;

        expect(checkboxes.length).to.equal(0);
    });

    it('selects a user-passed value for .selected array with no [selects] specified on Virtualized `<sp-table>`, but does not allow interaction afterwards', async () => {
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        el.selected = ['0'];

        await tableLayoutComplete(el);

        expect(el.selected.length).to.equal(1);

        const rowOne = el.querySelector('[value="0"]') as TableRow;
        const rowTwo = el.querySelector('[value="1"]') as TableRow;
        const rowTwoCheckbox = rowTwo.querySelector('sp-table-checkbox-cell');

        expect(rowOne.selected).to.be.true;
        expect(rowTwo.selected).to.be.false;

        expect(rowTwoCheckbox).to.be.null;
    });

    it('ensures that virtualized elements with values in .selected are visually selected when brought into view using scrollTop', async () => {
        const test = await fixture<Table>(html`
            <sp-theme system="spectrum" scale="medium" color="light">
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </sp-theme>
        `);
        const el = test.querySelector('sp-table') as Table;
        const body = el.querySelector('sp-table-body') as TableBody;

        await tableLayoutComplete(el);

        const rowOne = el.querySelector('[value="0"]') as TableRow;
        const rowOneCheckboxCell = rowOne.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['0', '48']);
        expect(rowOne.selected).to.be.true;
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;

        body.scrollTop = body.scrollHeight;

        await nextFrame();
        await nextFrame();
        await elementUpdated(el);
        await elementUpdated(body);

        const unseenRow = el.querySelector('[value="48"]') as TableRow;
        const unseenRowCheckboxCell = unseenRow.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(unseenRow.selected).to.be.true;
        expect(unseenRowCheckboxCell.checkbox.checked).to.be.true;
    });

    it('ensures that virtualized elements with values in .selected are visually selected when brought into view using scrollToIndex', async () => {
        const test = await fixture<Table>(html`
            <div>
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </div>
        `);
        const el = test.querySelector('sp-table') as Table;

        await tableLayoutComplete(el);

        const rowOne = el.querySelector('[value="0"]') as TableRow;
        const rowOneCheckboxCell = rowOne.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['0', '48']);
        expect(rowOne.selected).to.be.true;
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;

        el.scrollToIndex(47);

        await nextFrame();
        await nextFrame();
        await elementUpdated(el);

        const unseenRow = el.querySelector('[value="48"]') as TableRow;
        const unseenRowCheckboxCell = unseenRow.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(unseenRow.selected).to.be.true;
        expect(unseenRowCheckboxCell.checkbox.checked).to.be.true;
    });

    it('does not set `allSelected` to true by default on Virtualised `<sp-table>`', async () => {
        const test = await fixture<Table>(html`
            <div>
                ${virtualizedMultiple(virtualizedMultiple.args as Properties)}
            </div>
        `);
        const el = test.querySelector('sp-table') as Table;

        await oneEvent(el, 'rangeChanged');
        await elementUpdated(el);
        await elementUpdated(el);

        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['0', '48']);
        expect(tableHeadCheckboxCell.checkbox.checked).to.be.false;
        expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.true;
    });
});

it('renders custom content at a particular row and does not select it', async () => {
    const test = await fixture<Table>(html`
        <div>
            ${virtualizedCustomRow(virtualizedCustomRow.args as Properties)}
        </div>
    `);
    const el = test.querySelector('sp-table') as Table;

    await oneEvent(el, 'rangeChanged');
    await elementUpdated(el);

    const customRow = el.querySelector('[value="3"]') as TableRow;
    const customRowCheckbox = customRow.querySelector('sp-checkbox-cell');

    expect(customRowCheckbox).to.be.null;

    const tableHeadCheckboxCell = el.querySelector(
        'sp-table-head sp-table-checkbox-cell'
    ) as TableCheckboxCell;
    tableHeadCheckboxCell.checkbox.click();
    await elementUpdated(el);

    expect(customRow.selected).to.be.false;
});
