"use strict";
import "@spectrum-web-components/underlay/sp-underlay.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-underlay open></sp-underlay>
`);
//# sourceMappingURL=basic-test.js.map
