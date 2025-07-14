"use strict";
import "@spectrum-web-components/color-wheel/sp-color-wheel.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-color-wheel></sp-color-wheel>
`);
//# sourceMappingURL=basic-test.js.map
