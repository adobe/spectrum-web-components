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
import '@spectrum-web-components/table/sp-table.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-table
        size="m"
        style="height: 200px"
        selects="multiple"
        .selected=${['row1', 'row2']}
    >
        <sp-table-head>
            <sp-table-head-cell>Column Title</sp-table-head-cell>
            <sp-table-head-cell>Column Title</sp-table-head-cell>
            <sp-table-head-cell>Column Title</sp-table-head-cell>
        </sp-table-head>
        <sp-table-body>
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
