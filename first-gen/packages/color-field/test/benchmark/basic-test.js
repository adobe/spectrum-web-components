"use strict";
import "@spectrum-web-components/color-field/sp-color-field.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-color-field value="#f0f" view-color></sp-color-field>
`);
//# sourceMappingURL=basic-test.js.map
