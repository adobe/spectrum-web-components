"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/grid/sp-grid.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-grid></sp-grid>
`);
//# sourceMappingURL=basic-test.js.map
