"use strict";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-progress-circle indeterminate></sp-progress-circle>
`);
//# sourceMappingURL=basic-test.js.map
