"use strict";
import { html } from "lit";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-field-label open></sp-field-label>
`);
//# sourceMappingURL=basic-test.js.map
