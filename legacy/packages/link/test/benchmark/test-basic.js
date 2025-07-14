"use strict";
import "@spectrum-web-components/link/sp-link.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-link href="test_url" download="somefile.txt">Default Link</sp-link>
`);
//# sourceMappingURL=test-basic.js.map
