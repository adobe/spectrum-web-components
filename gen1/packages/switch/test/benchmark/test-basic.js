"use strict";
import { html } from "lit";
import "@spectrum-web-components/switch/sp-switch.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-switch>Switch</sp-switch>
`);
//# sourceMappingURL=test-basic.js.map
