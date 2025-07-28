"use strict";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/tray/sp-tray.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-tray open>
        <sp-dialog size="s">
            <h2 slot="heading">New Messages</h2>
            You have 5 new messages.
        </sp-dialog>
    </sp-tray>
`);
//# sourceMappingURL=basic-test.js.map
