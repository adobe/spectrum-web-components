"use strict";
import "@spectrum-web-components/contextual-help/sp-contextual-help.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-contextual-help></sp-contextual-help>
`);
//# sourceMappingURL=basic-test.js.map
