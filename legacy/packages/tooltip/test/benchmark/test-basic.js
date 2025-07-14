"use strict";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-button>
        I'm a button...
        <sp-tooltip self-managed>Tip me!</sp-tooltip>
    </sp-action-button>
`);
//# sourceMappingURL=test-basic.js.map
