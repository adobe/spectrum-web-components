"use strict";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-button>Click Me</sp-button>
    <sp-button disabled>Click Me</sp-button>
    <sp-button>
        <sp-icon-help slot="icon"></sp-icon-help>
        Click Me
    </sp-button>
`);
//# sourceMappingURL=test-basic.js.map
