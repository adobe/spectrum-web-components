"use strict";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-tabs selected="first">
        <sp-tab label="Tab 1" value="first" tabindex="1"></sp-tab>
        <sp-tab label="Tab 2" value="second" tabindex="2"></sp-tab>
        <sp-tab label="Tab 3" value="third" tabindex="3"></sp-tab>
    </sp-tabs>
`);
//# sourceMappingURL=basic-test.js.map
