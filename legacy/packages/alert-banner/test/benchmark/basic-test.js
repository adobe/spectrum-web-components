"use strict";
import "@spectrum-web-components/alert-banner/sp-alert-banner.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-alert-banner open>Sample content</sp-alert-banner>
`);
//# sourceMappingURL=basic-test.js.map
