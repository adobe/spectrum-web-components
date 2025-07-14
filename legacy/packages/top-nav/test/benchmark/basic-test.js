"use strict";
import "@spectrum-web-components/top-nav/sp-top-nav.js";
import "@spectrum-web-components/top-nav/sp-top-nav-item.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-top-nav>
        <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
        <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
            Page 1
        </sp-top-nav-item>
        <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
        <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
        <sp-top-nav-item href="#page-4">
            Page with Really Long Name
        </sp-top-nav-item>
    </sp-top-nav>
`);
//# sourceMappingURL=basic-test.js.map
