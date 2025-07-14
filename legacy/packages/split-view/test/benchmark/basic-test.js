"use strict";
import "@spectrum-web-components/split-view/sp-split-view.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-split-view resizable>
        <div>First panel</div>
        <div>Second panel</div>
    </sp-split-view>
`);
//# sourceMappingURL=basic-test.js.map
