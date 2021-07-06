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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js';
import '../sp-table.js';
import '../sp-head-cell';
import '../sp-row';
import '../sp-cell';
import { HeaderData, TableData } from '../src';

export default {
    title: 'Table',
    component: 'sp-table',
};

export const Elements = (): TemplateResult => {
    return html`
        <sp-table>
            <sp-head-cell sortable order="descending">
                Head Cell 1
                <sp-icon-chevron-down></sp-icon-chevron-down>
            </sp-head-cell>
            <sp-head-cell sortable>Head Cell 2</sp-head-cell>
            <sp-head-cell>Head Cell 3</sp-head-cell>

            <sp-row>
                <sp-cell>Row Cell 1/1</sp-cell>
                <sp-cell>Row Cell 1/2</sp-cell>
                <sp-cell>Row Cell 1/3</sp-cell>
            </sp-row>

            <sp-row>
                <sp-cell>Row Cell 2/1</sp-cell>
                <sp-cell>Row Cell 2/2</sp-cell>
                <sp-cell>Row Cell 2/3</sp-cell>
            </sp-row>

            <sp-row>
                <sp-cell>Row Cell 3/1</sp-cell>
                <sp-cell>Row Cell 3/2</sp-cell>
                <sp-cell>Row Cell 3/3</sp-cell>
            </sp-row>
        </sp-table>
    `;
};

export const Property = (): TemplateResult => {
    const header: HeaderData = [
        {
            content: html`
                Head Cell 1
                <sp-icon-chevron-down></sp-icon-chevron-down>
            `,
            sortable: true,
            order: 'descending',
        },
        {
            content: 'Head Cell 2',
            sortable: true,
        },
        { content: 'Head Cell 3' },
    ];

    const data: TableData = [
        [
            { content: 'Row Cell 1/1' },
            { content: 'Row Cell 1/2' },
            { content: 'Row Cell 1/3' },
        ],
        [
            { content: 'Row Cell 2/1' },
            { content: 'Row Cell 2/2' },
            { content: 'Row Cell 2/3' },
        ],
        [
            { content: 'Row Cell 3/1' },
            { content: 'Row Cell 3/2' },
            { content: 'Row Cell 3/3' },
        ],
    ];

    return html`
        <sp-table .header="${header}" .data="${data}"></sp-table>
    `;
};
