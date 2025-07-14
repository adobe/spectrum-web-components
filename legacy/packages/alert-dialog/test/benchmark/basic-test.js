"use strict";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/alert-dialog/sp-alert-dialog.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-alert-dialog variant="confirmation">
        <h2 slot="heading">Disclaimer</h2>
        Smart filters are nondestructive and will preserve your original images.
        <sp-button
            slot="button"
            id="cancelButton"
            variant="secondary"
            treatment="outline"
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
        >
            Cancel
        </sp-button>
        <sp-button
            slot="button"
            id="confirmButton"
            variant="accent"
            treatment="fill"
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
        >
            Enable
        </sp-button>
    </sp-alert-dialog>
`);
//# sourceMappingURL=basic-test.js.map
