"use strict";
import "@spectrum-web-components/action-bar/sp-action-bar.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-bar open></sp-action-bar>
`);
//# sourceMappingURL=basic-test.js.map
