"use strict";
import "@spectrum-web-components/toast/sp-toast.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-toast>Tip me!</sp-toast>
`);
//# sourceMappingURL=test-basic.js.map
