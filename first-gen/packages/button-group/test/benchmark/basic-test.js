"use strict";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/button/sp-button.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-button-group>
        <sp-button>Button 1</sp-button>
        <sp-button>Longer Button 2</sp-button>
        <sp-button>Short 3</sp-button>
    </sp-button-group>
`);
//# sourceMappingURL=basic-test.js.map
