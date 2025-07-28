"use strict";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-group>
        <sp-action-button>Button 1</sp-action-button>
        <sp-action-button>Button 2</sp-action-button>
        <sp-action-button>Button 3</sp-action-button>
    </sp-action-group>
`);
//# sourceMappingURL=basic-test.js.map
