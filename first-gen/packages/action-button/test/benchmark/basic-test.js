"use strict";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
`);
//# sourceMappingURL=basic-test.js.map
