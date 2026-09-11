"use strict";
import { html } from "lit";
import "@spectrum-web-components/progress-bar/sp-progress-bar.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-progress-bar label="Loading" indeterminate></sp-progress-bar>
`);
//# sourceMappingURL=basic-test.js.map
