"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-picker-button></sp-picker-button>
`);
//# sourceMappingURL=basic-test.js.map
