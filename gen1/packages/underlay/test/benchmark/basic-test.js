"use strict";
import { html } from "lit";
import "@spectrum-web-components/underlay/sp-underlay.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-underlay open></sp-underlay>
`);
//# sourceMappingURL=basic-test.js.map
