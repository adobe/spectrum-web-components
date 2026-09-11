"use strict";
import { html } from "lit";
import "@spectrum-web-components/color-handle/sp-color-handle.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-color-handle open></sp-color-handle>
`);
//# sourceMappingURL=basic-test.js.map
