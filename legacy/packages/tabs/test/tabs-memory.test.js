"use strict";
import { html } from "@open-wc/testing";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
testForMemoryLeaks(html`
    <sp-tabs selected="first">
        <sp-tab label="Tab 1" value="first"></sp-tab>
        <sp-tab label="Tab 2" value="second"></sp-tab>
        <sp-tab label="Tab 3" value="third"></sp-tab>
    </sp-tabs>
`);
//# sourceMappingURL=tabs-memory.test.js.map
