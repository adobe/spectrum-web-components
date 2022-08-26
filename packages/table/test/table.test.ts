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

import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import type { Table, TableCheckboxCell } from '@spectrum-web-components/table';
import { elements } from '../stories/table-elements.stories.js';
import { spy } from 'sinon';

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
describe('Table', () => {
    it('loads default table accessibly', async () => {
        const el = await fixture<Table>(elements());
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await expect(el).to.be.accessible();
    });

    it('can be size `s`', async () => {
        const el = await fixture<Table>(html`
            <sp-table size="s">
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
        await elementUpdated(el);

        expect(el.size).to.equal('s');
    });

    it('dispatches `change` events', async () => {
        const changeSpy = spy();
        const el = await fixture<Table>(html`
            <sp-table
                size="m"
                selects="multiple"
                .selected=${['row1', 'row2']}
                @change=${({ target }: Event & { target: Table }) => {
                    changeSpy(target);
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
        const rowThreeCheckboxCell = el.querySelector(
            '[value="row3"] sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['row1', 'row2']);

        rowThreeCheckboxCell.checkbox.click();

        expect(el.selected).to.deep.equal(['row1', 'row2', 'row3']);
        expect(changeSpy.calledOnce).to.be.true;
        expect(changeSpy.calledWithExactly(el)).to.be.true;

        changeSpy.resetHistory();

        tableHeadCheckboxCell.checkbox.click();

        expect(el.selected).to.deep.equal([
            'row1',
            'row2',
            'row3',
            'row4',
            'row5',
        ]);
        expect(changeSpy.calledOnce).to.to.true;
        expect(changeSpy.calledWithExactly(el)).to.be.true;
    });

    it('accepts change events dispatched from TableHead `<sp-table-checkbox-cell>`', async () => {
        const changeSpy = spy();
        const el = await fixture<Table>(html`
            <sp-table
                size="m"
                selects="multiple"
                .selected=${['row1', 'row2']}
                @change=${({ target }: Event & { target: Table }) => {
                    changeSpy(target);
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
        const tableHeadCheckboxCell = el.querySelector(
            'sp-table-head sp-table-checkbox-cell'
        ) as TableCheckboxCell;

        expect(el.selected).to.deep.equal(['row1', 'row2']);
        expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.true;
        expect(tableHeadCheckboxCell.checkbox.checked).to.be.false;

        tableHeadCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(changeSpy.calledOnce).to.be.true;
        expect(changeSpy.calledWithExactly(el)).to.be.true;
        expect(tableHeadCheckboxCell.checkbox.checked).to.be.true;
        expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.false;

        expect(el.selected).to.deep.equal([
            'row1',
            'row2',
            'row3',
            'row4',
            'row5',
        ]);

        tableHeadCheckboxCell.checkbox.click();
        await elementUpdated(el);

        expect(el.selected).to.deep.equal([]);
        expect(tableHeadCheckboxCell.checkbox.checked).to.be.false;
        expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.false;
    });
});
