"use strict";
import "@spectrum-web-components/sidenav/sp-sidenav.js";
import "@spectrum-web-components/sidenav/sp-sidenav-item.js";
import "@spectrum-web-components/sidenav/sp-sidenav-heading.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-sidenav manage-tab-index>
        <sp-sidenav-item value="Section 1" label="Section 1"></sp-sidenav-item>
        <sp-sidenav-item selected expanded value="Section 2" label="Section 2">
            <sp-sidenav-item
                value="Section 2a"
                label="Section 2a"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2b"
                label="Section 2b"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2c"
                label="Section 2c"
            ></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-heading label="CATEGORY 1">
            <sp-sidenav-item
                value="Section 3"
                label="Section 3"
            ></sp-sidenav-item>
            <sp-sidenav-item value="Section 4" label="Section 4">
                <sp-sidenav-item
                    value="Section 4a"
                    label="Section 4a"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4b"
                    label="Section 4b"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4c"
                    label="Section 4c"
                ></sp-sidenav-item>
            </sp-sidenav-item>
        </sp-sidenav-heading>
        <sp-sidenav-item value="Section 1" label="Section 1"></sp-sidenav-item>
        <sp-sidenav-item selected expanded value="Section 2" label="Section 2">
            <sp-sidenav-item
                value="Section 2a"
                label="Section 2a"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2b"
                label="Section 2b"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2c"
                label="Section 2c"
            ></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-heading label="CATEGORY 1">
            <sp-sidenav-item
                value="Section 3"
                label="Section 3"
            ></sp-sidenav-item>
            <sp-sidenav-item value="Section 4" label="Section 4">
                <sp-sidenav-item
                    value="Section 4a"
                    label="Section 4a"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4b"
                    label="Section 4b"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4c"
                    label="Section 4c"
                ></sp-sidenav-item>
            </sp-sidenav-item>
        </sp-sidenav-heading>
    </sp-sidenav>
`);
//# sourceMappingURL=test-basic.js.map
