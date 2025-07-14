"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/alert-dialog/sp-alert-dialog.js";
export default {
  title: "Alert Dialog",
  component: "sp-alert-dialog"
};
export const confirmation = () => {
  return html`
        <sp-alert-dialog variant="confirmation">
            <h2 slot="heading">Disclaimer</h2>
            Smart filters are nondestructive and will preserve your original
            images.
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
    `;
};
export const information = () => {
  return html`
        <sp-alert-dialog variant="information">
            <h2 slot="heading">Connect to wifi</h2>
            Please connect to wifi to sync your projects or go to Settings to
            change your preferences.
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
                variant="primary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Continue
            </sp-button>
        </sp-alert-dialog>
    `;
};
export const warning = () => {
  return html`
        <sp-alert-dialog variant="warning">
            <h2 slot="heading">Unverified format</h2>
            This format has not been verified and may not be viewable for some
            users. Do you want to continue publishing?
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
                variant="primary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Continue
            </sp-button>
        </sp-alert-dialog>
    `;
};
export const error = () => {
  return html`
        <sp-alert-dialog variant="error">
            <h2 slot="heading">Unable to share</h2>
            An error occured while sharing your project. Please verify the email
            address and try again.
            <sp-button
                slot="button"
                id="confirmButton"
                variant="primary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Continue
            </sp-button>
        </sp-alert-dialog>
    `;
};
export const destructive = () => {
  return html`
        <sp-alert-dialog variant="destructive">
            <h2 slot="heading">Delete 3 documents?</h2>
            Are you sure you want to delete the 3 selected documents?
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
                variant="negative"
                treatment="fill"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Delete
            </sp-button>
        </sp-alert-dialog>
    `;
};
export const secondary = () => {
  return html`
        <sp-alert-dialog variant="secondary">
            <h2 slot="heading">Rate this app</h2>
            If you enjoy our app, would you mind taking a moment to rate it?
            <sp-button
                slot="button"
                id="secondaryButton"
                variant="secondary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                No, thanks
            </sp-button>
            <sp-button
                slot="button"
                id="cancelButton"
                variant="secondary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Remind me later
            </sp-button>
            <sp-button
                slot="button"
                id="confirmButton"
                variant="primary"
                treatment="outline"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
            >
                Rate now
            </sp-button>
        </sp-alert-dialog>
    `;
};
//# sourceMappingURL=alert-dialog.stories.js.map
