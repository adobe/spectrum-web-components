"use strict";
import "@spectrum-web-components/textfield/sp-textfield.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-textfield placeholder="Enter your name"></sp-textfield>
`);
//# sourceMappingURL=test-basic.js.map
