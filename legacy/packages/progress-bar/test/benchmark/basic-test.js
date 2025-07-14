"use strict";
import "@spectrum-web-components/progress-bar/sp-progress-bar.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-progress-bar label="Loading" indeterminate></sp-progress-bar>
`);
//# sourceMappingURL=basic-test.js.map
