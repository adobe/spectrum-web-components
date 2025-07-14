"use strict";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-field-label open></sp-field-label>
`);
//# sourceMappingURL=basic-test.js.map
