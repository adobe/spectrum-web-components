"use strict";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-button id="button">I'm a button...</sp-action-button>
    <sp-overlay trigger="button@hover" type="hint">
        <sp-tooltip>Tip me!</sp-tooltip>
    </sp-overlay>
`);
//# sourceMappingURL=test-element.js.map
