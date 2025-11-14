"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5730],{"./packages/alert-dialog/stories/alert-dialog.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},confirmation:function(){return confirmation},default:function(){return alert_dialog_stories},destructive:function(){return destructive},error:function(){return error},information:function(){return information},secondary:function(){return secondary},warning:function(){return warning}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),AlertDialog_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/alert-dialog/src/AlertDialog.dev.js"));(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-alert-dialog",AlertDialog_dev.L);var alert_dialog_stories={title:"Alert Dialog",component:"sp-alert-dialog"};const confirmation=()=>index_dev.qy`
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
    `,information=()=>index_dev.qy`
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
    `,warning=()=>index_dev.qy`
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
    `,error=()=>index_dev.qy`
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
    `,destructive=()=>index_dev.qy`
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
    `,secondary=()=>index_dev.qy`
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
    `,__namedExportsOrder=["confirmation","information","warning","error","destructive","secondary"];confirmation.parameters={...confirmation.parameters,docs:{...confirmation.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="confirmation">\n            <h2 slot="heading">Disclaimer</h2>\n            Smart filters are nondestructive and will preserve your original\n            images.\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="accent"\n                treatment="fill"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Enable\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...confirmation.parameters?.docs?.source}}},information.parameters={...information.parameters,docs:{...information.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="information">\n            <h2 slot="heading">Connect to wifi</h2>\n            Please connect to wifi to sync your projects or go to Settings to\n            change your preferences.\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...information.parameters?.docs?.source}}},warning.parameters={...warning.parameters,docs:{...warning.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="warning">\n            <h2 slot="heading">Unverified format</h2>\n            This format has not been verified and may not be viewable for some\n            users. Do you want to continue publishing?\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...warning.parameters?.docs?.source}}},error.parameters={...error.parameters,docs:{...error.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="error">\n            <h2 slot="heading">Unable to share</h2>\n            An error occured while sharing your project. Please verify the email\n            address and try again.\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...error.parameters?.docs?.source}}},destructive.parameters={...destructive.parameters,docs:{...destructive.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="destructive">\n            <h2 slot="heading">Delete 3 documents?</h2>\n            Are you sure you want to delete the 3 selected documents?\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="negative"\n                treatment="fill"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Delete\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...destructive.parameters?.docs?.source}}},secondary.parameters={...secondary.parameters,docs:{...secondary.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="secondary">\n            <h2 slot="heading">Rate this app</h2>\n            If you enjoy our app, would you mind taking a moment to rate it?\n            <sp-button\n                slot="button"\n                id="secondaryButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                No, thanks\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Remind me later\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Rate now\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...secondary.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=alert-dialog-stories-alert-dialog-stories.0e748fd0.iframe.bundle.js.map