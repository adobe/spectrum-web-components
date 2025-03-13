import './sp-button-BozK2kr9.js';
import { A as AlertDialog } from './AlertDialog-BuWnDbhn.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';
import { x } from './lit-html-COgVUehj.js';
import './ButtonBase-DcuiXj8E.js';
import './like-anchor-BBONMzyI.js';
import './if-defined-DDJGFaN4.js';
import './focusable-D81tHnNY.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Mz9mFVuX.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './lit-element-BulMEkr1.js';
import './query-DQF6X5qW.js';
import './PendingState-DveGeJwu.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-D4VoaNlz.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';

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
