"use strict";
import { html } from "@open-wc/testing";
import "@spectrum-web-components/radio/sp-radio.js";
import "@spectrum-web-components/sidenav/sp-sidenav.js";
import "@spectrum-web-components/sidenav/sp-sidenav-item.js";
import "@spectrum-web-components/sidenav/sp-sidenav-heading.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
testForMemoryLeaks(html`
    <sp-sidenav>
        <sp-sidenav-heading label="CATEGORY 1">
            <sp-sidenav-item
                value="Section 1"
                label="Section 1"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2"
                label="Section 2"
            ></sp-sidenav-item>
        </sp-sidenav-heading>
    </sp-sidenav>
`);
//# sourceMappingURL=sidenav-memory.test.js.map
