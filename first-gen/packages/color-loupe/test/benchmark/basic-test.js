"use strict";
import "@spectrum-web-components/color-loupe/sp-color-loupe.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-color-loupe open></sp-color-loupe>
`);
//# sourceMappingURL=basic-test.js.map
