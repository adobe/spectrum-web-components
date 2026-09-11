"use strict";
import { html } from "lit";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-color-slider></sp-color-slider>
`);
//# sourceMappingURL=basic-test.js.map
