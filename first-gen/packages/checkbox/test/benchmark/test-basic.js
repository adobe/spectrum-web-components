"use strict";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-checkbox id="checkbox1">Component</sp-checkbox>
    <sp-checkbox id="checkbox2" checked>Component</sp-checkbox>
    <sp-checkbox id="checkbox3" indeterminate>Component</sp-checkbox>
`);
//# sourceMappingURL=test-basic.js.map
