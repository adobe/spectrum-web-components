"use strict";
import { html } from "lit";
import "@spectrum-web-components/asset/sp-asset.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-asset open></sp-asset>
`);
//# sourceMappingURL=basic-test.js.map
