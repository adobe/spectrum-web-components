"use strict";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-color-slider></sp-color-slider>
`);
//# sourceMappingURL=basic-test.js.map
