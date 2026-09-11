"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/contextual-help/sp-contextual-help.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-contextual-help></sp-contextual-help>
`);
//# sourceMappingURL=basic-test.js.map
