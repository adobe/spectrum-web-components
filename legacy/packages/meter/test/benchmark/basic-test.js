"use strict";
import "@spectrum-web-components/meter/sp-meter.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-meter open></sp-meter>
`);
//# sourceMappingURL=basic-test.js.map
