"use strict";
import { html } from "lit";
import "@spectrum-web-components/textfield/sp-textfield.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-textfield placeholder="Enter your name"></sp-textfield>
`);
//# sourceMappingURL=test-basic.js.map
