"use strict";
import { tooltip } from "@spectrum-web-components/tooltip/src/tooltip-directive.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-button
        ${tooltip(() => html`Tip me!`)}
    >
        I'm a button...
    </sp-action-button>
`);
//# sourceMappingURL=test-directive.js.map
