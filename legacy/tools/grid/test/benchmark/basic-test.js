"use strict";
import "@spectrum-web-components/grid/sp-grid.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-grid></sp-grid>
`);
//# sourceMappingURL=basic-test.js.map
