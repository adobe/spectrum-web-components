"use strict";
import { html } from "lit";
import "@spectrum-web-components/number-field/sp-number-field.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-number-field></sp-number-field>
`);
//# sourceMappingURL=basic-test.js.map
