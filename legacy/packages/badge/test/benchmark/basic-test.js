"use strict";
import "@spectrum-web-components/badge/sp-badge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-badge>
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
`);
//# sourceMappingURL=basic-test.js.map
