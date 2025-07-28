"use strict";
import "@spectrum-web-components/table/sp-table.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-table
        size="m"
        style="height: 200px"
        selects="multiple"
        .selected=${["row1", "row2"]}
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
//# sourceMappingURL=basic-test.js.map
