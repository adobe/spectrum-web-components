import './sp-button-c571335c.js';
import { A as AlertDialog } from './AlertDialog-09588482.js';
import { d as defineElement } from './define-element-467f3dc4.js';
import { x } from './lit-html-126adc72.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './base-511c8c11.js';
import './sizedMixin-95b38e3e.js';
import './lit-element-9354aa77.js';
import './query-d0113d5a.js';
import './condition-attribute-with-id-62869347.js';
import './resize-controller-55608b66.js';

defineElement("sp-alert-dialog",AlertDialog);

var alertDialog_stories = {
  title: "Alert Dialog",
  component: "sp-alert-dialog"
};
const confirmation = () => {
  return x`
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
const information = () => {
  return x`
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
const warning = () => {
  return x`
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
const error = () => {
  return x`
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
const destructive = () => {
  return x`
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
const secondary = () => {
  return x`
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
const __namedExportsOrder = ['confirmation', 'information', 'warning', 'error', 'destructive', 'secondary'];

export { __namedExportsOrder, confirmation, alertDialog_stories as default, destructive, error, information, secondary, warning };
