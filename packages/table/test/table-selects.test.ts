/*
Copyright 2022 Adobe. All rights reserved.
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
} from '@open-wc/testing';

import '../sp-table.js';
import '../sp-table-head.js';
import '../sp-table-head-cell.js';
import '../sp-table-body.js';
import '../sp-table-row.js';
import '../sp-table-cell.js';
import { Table } from '../';
import {
    elements,
    noSelectsSpecified,
    selectsMultiple,
    selectsSingle,
} from '../stories/table-elements.stories.js';
import { TableRow } from '../src/TableRow.js';
import { TableCheckboxCell } from '../src/TableCheckboxCell.js';

let globalErrorHandler: undefined | OnErrorEventHandler = undefined;
before(function () {
    // Save Mocha's handler.
    (
        Mocha as unknown as { process: { removeListener(name: string): void } }
    ).process.removeListener('uncaughtException');
    globalErrorHandler = window.onerror;
    addEventListener('error', (error) => {
        if (error.message?.match?.(/ResizeObserver loop limit exceeded/)) {
            return;
        } else {
            globalErrorHandler?.(error);
        }
    });
});
after(function () {
    window.onerror = globalErrorHandler as OnErrorEventHandler;
});

describe('Table Selects', () => {
    it('selects items not initially visible in the <sp-table-body>', async () => {
        const el = await fixture<Table>(elements());

        el.selects = 'single';
        el.selected = ['row5'];

        await elementUpdated(el);

        const rowFive = el.querySelector('.row5') as TableRow;
        const rowFiveCheckbox = rowFive.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const checkboxes = el.querySelectorAll(
            'sp-table-checkbox-cell:nth-child(n+1):nth-child(n+4)'
        ) as NodeListOf<TableCheckboxCell>;

        checkboxes.forEach((checkbox) => {
            expect(checkbox.checkbox.checked).to.be.false;
        });

        el.scrollTop = el.scrollHeight;

        await nextFrame();

        expect(rowFiveCheckbox.checkbox.checked).to.be.true;
    });
    it('can prevent selection', async () => {
        const el = await fixture<Table>(html`
            <sp-table
                size="m"
                selects="single"
                @change=${(event: Event) => {
                    event.preventDefault();
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1" class="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2" class="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3" class="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4" class="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5" class="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);

        const rowTwo = el.querySelector('.row2') as TableRow;
        const rowTwoCheckbox = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        rowTwoCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(rowTwoCheckbox.checked).to.be.false;
        expect(rowTwo.selected).to.be.false;
        expect(el.selected.length).to.equal(0);
    });

    it('surfaces [selects="single"] selection', async () => {
        const el = await fixture<Table>(selectsSingle());

        expect(el.selected, "'Row 1 selected").to.deep.equal(['row1']);
    });

    it('selects via `click` while [selects="single"]', async () => {
        const el = await fixture<Table>(selectsSingle());
        const rowTwo = el.querySelector('.row2') as TableRow;
        const rowTwoCheckbox = rowTwo.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        const rowThree = el.querySelector('.row3') as TableRow;
        const rowThreeCheckbox = rowThree.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        rowTwoCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(rowTwoCheckbox.checked).to.be.true;
        expect(el.selected).to.deep.equal(['row2']);

        rowThreeCheckbox.checkbox.click();
        await elementUpdated(el);
        await elementUpdated(rowTwoCheckbox); // webkit needs this

        expect(rowThreeCheckbox.checkbox.checked).to.be.true;
        expect(rowTwoCheckbox.checkbox.checked).to.be.false;
        expect(el.selected.length).to.equal(1);
    });

    it('surfaces [selects="multiple"] selection', async () => {
        const el = await fixture<Table>(selectsMultiple());

        expect(el.selected, 'Rows 1 and 2 selected').to.deep.equal([
            'row1',
            'row2',
        ]);
    });

    it('selects via `click` while [selects="multiple"] selection', async () => {
        const el = await fixture<Table>(selectsMultiple());
        const rowFour = el.querySelector('.row4') as TableRow;
        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowFourCheckbox = rowFour.querySelector(
            'sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(2);

        rowFourCheckbox.checkbox.click();
        await elementUpdated(el);

        expect(rowFourCheckbox.checked).to.be.true;
        expect(el.selected).to.deep.equal(['row1', 'row2', 'row4']);

        tableHeadCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([
            'row1',
            'row2',
            'row4',
            'row3',
            'row5',
        ]);
    });

    it('allows [selects] to be changed by the application', async () => {
        const el = await fixture<Table>(elements());

        expect(el.selects).to.be.undefined;

        el.selects = 'single';

        await elementUpdated(el);
        expect(el.selects).to.equal('single');

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        const rowTwoCheckboxCell = el.querySelector(
            '.row2 sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowOneCheckboxCell = el.querySelector(
            '.row1 sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(tableHeadCheckboxCell.selectsSingle).to.be.true;

        rowOneCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal(['row1']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.false;

        el.selects = 'multiple';
        await elementUpdated(el);

        expect(el.selects).to.equal('multiple');
        expect(tableHeadCheckboxCell.indeterminate).to.be.true;

        rowTwoCheckboxCell.checkbox.click();

        await elementUpdated(el);
        await elementUpdated(rowTwoCheckboxCell);

        expect(el.selected).to.deep.equal(['row1', 'row2']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowTwoCheckboxCell.checkbox.checked).to.be.true;
        expect(tableHeadCheckboxCell.indeterminate).to.be.true;
    });

    it('selects a user-passed value for .selected array with no [selects] specified, but does not allow interaction afterwards', async () => {
        const el = await fixture<Table>(noSelectsSpecified());

        await elementUpdated(el);

        expect(el.selected.length).to.equal(2);

        const rows = el.querySelectorAll('sp-table-row');

        rows.forEach((row) => {
            const checkbox = row.querySelector('sp-table-checkbox-cell');
            expect(checkbox).to.be.null;
        });
    });

    it('allows .selected values to be changed by the application when [selects="multiple"]', async () => {
        const el = await fixture<Table>(selectsMultiple());
        await elementUpdated(el);

        const rowThreeCheckboxCell = el.querySelector(
            '.row3 sp-table-checkbox-cell'
        ) as TableCheckboxCell;
        const rowOneCheckboxCell = el.querySelector(
            '.row1 sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['row1', 'row2']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowThreeCheckboxCell.checkbox.checked).to.be.false;

        el.selected = ['row1', 'row3'];

        await elementUpdated(el);
        await elementUpdated(rowThreeCheckboxCell);

        expect(el.selected).to.deep.equal(['row1', 'row3']);
        expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
        expect(rowThreeCheckboxCell.checkbox.checked).to.be.true;
    });
});
