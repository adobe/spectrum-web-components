"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/swatch/sp-swatch.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-swatch></sp-swatch>
`);
//# sourceMappingURL=basic-test.js.map
