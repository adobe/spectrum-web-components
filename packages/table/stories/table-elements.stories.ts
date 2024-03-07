/* STORIES
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import type { Table } from '@spectrum-web-components/table';

export default {
    title: 'Table',
    component: 'sp-table',
    args: {
        selected: [],
        selects: 'single',
        selectRowLabel: 'Select',
        selectAllRowsLabel: 'Select All',
    },
    argTypes: {
        selectRowLabel: {
            name: 'selectRowLabel',
            description: 'The string to use for the select row checkbox label.',
            control: {
                type: 'text',
            },
        },
        selectAllRowsLabel: {
            name: 'selectAllRowsLabel',
            description: 'The string to use for the select all checkbox label.',
            control: {
                type: 'text',
            },
        },
        selected: {
            name: 'selected',
            description: 'The value of the selected `<sp-table-row>`(s).',
            control: {
                type: 'text',
            },
        },
        selects: {
            name: 'selects',
            description:
                'Whether the elements selects its children and how many it can select at a time.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['', 'single', 'multiple'],
            },
        },
    },
};

export const elements = (): TemplateResult => {
    return html`
        <sp-table>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 200px">
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
    `;
};

export const small = (): TemplateResult => {
    return html`
        <sp-table size="s">
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
    `;
};

export const selectsSingle = (): TemplateResult => {
    return html`
        <sp-table
            selects="single"
            .selected=${['row1']}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
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
        <div>Selected: ["row1"]</div>
    `;
};

type Properties = {
    selectedRowString: string;
    selectedAllRowsString: string;
    selects: string;
};

export const selectsSingleWithRowHeader = ({
    selectedRowString,
    selectedAllRowsString,
    selects,
}: Properties): TemplateResult => {
    return html`
        <sp-table
            .selects=${selects}
            .selected=${['row1']}
            .selectedRowString=${selectedRowString}
            .selectedAllRowStrings=${selectedAllRowsString}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <sp-table-head>
                <sp-table-head-cell>Week (Row Header)</sp-table-head-cell>
                <sp-table-head-cell>Monday</sp-table-head-cell>
                <sp-table-head-cell>Wednesday</sp-table-head-cell>
                <sp-table-head-cell>Friday</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row0" class="row0">
                    <sp-table-cell role="rowheader">Week 1</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell role="rowheader">Week 2</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell role="rowheader">Week 3</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell role="rowheader">Week 4</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell role="rowheader">Week 5</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell role="rowheader">Week 6</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1"]</div>
    `;
};

export const selectsMultipleWithRowHeader = (): TemplateResult => {
    return html`
        <sp-table
            selects="multiple"
            .selected=${['row1']}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <sp-table-head>
                <sp-table-head-cell>Week (Row Header)</sp-table-head-cell>
                <sp-table-head-cell>Monday</sp-table-head-cell>
                <sp-table-head-cell>Wednesday</sp-table-head-cell>
                <sp-table-head-cell>Friday</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row0" class="row0">
                    <sp-table-cell role="rowheader">Week 1</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell role="rowheader">Week 2</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell role="rowheader">Week 3</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell role="rowheader">Week 4</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell role="rowheader">Week 5</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell role="rowheader">Week 6</sp-table-cell>
                    <sp-table-cell>Squat</sp-table-cell>
                    <sp-table-cell>Pushup</sp-table-cell>
                    <sp-table-cell>Deadlift</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1"]</div>
    `;
};

export const noSelectsSpecified = (): TemplateResult => {
    return html`
        <sp-table .selected=${['row1', 'row2']}>
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
    `;
};

export const selectsMultiple = (): TemplateResult => {
    return html`
        <sp-table
            selects="multiple"
            .selected=${['row1', 'row2']}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected,
                    null,
                    ' '
                )}`;
                const nextNext = next.nextElementSibling as HTMLDivElement;
                nextNext.textContent = `Selected Count: ${target.selected.length}`;
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
        <div>Selected: ["row1", "row2"]</div>
        <div>Selected Count: 2</div>
    `;
};

export const emphasized = (): TemplateResult => {
    return html`
        <sp-table emphasized selects="multiple" .selected=${['row1', 'row2']}>
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
    `;
};

// export const selectsMultipleAttributes = (): TemplateResult => {
//     return html`
//         <sp-table selects="multiple">
//             <sp-table-head>
//                 <sp-table-head-cell>
//                     Column Title
//                 </sp-table-head-cell>
//                 <sp-table-head-cell>Column Title</sp-table-head-cell>
//                 <sp-table-head-cell>Column Title</sp-table-head-cell>
//             </sp-table-head>
//             <sp-table-body style="height: 120px">
//                 <sp-table-row value="row1" selected>
//                     <sp-table-cell>Row Item Alpha</sp-table-cell>
//                     <sp-table-cell>Row Item Alpha</sp-table-cell>
//                     <sp-table-cell>Row Item Alpha</sp-table-cell>
//                 </sp-table-row>
//                 <sp-table-row value="row2">
//                     <sp-table-cell>Row Item Bravo</sp-table-cell>
//                     <sp-table-cell>Row Item Bravo</sp-table-cell>
//                     <sp-table-cell>Row Item Bravo</sp-table-cell>
//                 </sp-table-row>
//                 <sp-table-row value="row3" selected>
//                     <sp-table-cell>Row Item Charlie</sp-table-cell>
//                     <sp-table-cell>Row Item Charlie</sp-table-cell>
//                     <sp-table-cell>Row Item Charlie</sp-table-cell>
//                 </sp-table-row>
//                 <sp-table-row value="row4">
//                     <sp-table-cell>Row Item Delta</sp-table-cell>
//                     <sp-table-cell>Row Item Delta</sp-table-cell>
//                     <sp-table-cell>Row Item Delta</sp-table-cell>
//                 </sp-table-row>
//                 <sp-table-row value="row5">
//                     <sp-table-cell>Row Item Echo</sp-table-cell>
//                     <sp-table-cell>Row Item Echo</sp-table-cell>
//                     <sp-table-cell>Row Item Echo</sp-table-cell>
//                 </sp-table-row>
//             </sp-table-body>
//         </sp-table>
//     `;
// };
