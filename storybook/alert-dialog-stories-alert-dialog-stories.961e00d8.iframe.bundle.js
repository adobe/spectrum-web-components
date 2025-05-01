"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[5730],{"./node_modules/@lit-labs/observers/development/resize-controller.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{P:function(){return ResizeController}});class ResizeController{constructor(host,{target:target,config:config,callback:callback,skipInitial:skipInitial}){this._targets=new Set,this._skipInitial=!1,this._unobservedUpdate=!1,this._host=host,null!==target&&this._targets.add(target??host),this._config=config,this._skipInitial=skipInitial??this._skipInitial,this.callback=callback,window.ResizeObserver?(this._observer=new ResizeObserver((entries=>{this.handleChanges(entries),this._host.requestUpdate()})),host.addController(this)):console.warn("ResizeController error: browser does not support ResizeObserver.")}handleChanges(entries){this.value=this.callback?.(entries,this._observer)}hostConnected(){for(const target of this._targets)this.observe(target)}hostDisconnected(){this.disconnect()}async hostUpdated(){!this._skipInitial&&this._unobservedUpdate&&this.handleChanges([]),this._unobservedUpdate=!1}observe(target){this._targets.add(target),this._observer.observe(target,this._config),this._unobservedUpdate=!0,this._host.requestUpdate()}unobserve(target){this._targets.delete(target),this._observer.unobserve(target)}disconnect(){this._observer.disconnect()}}},"./packages/alert-dialog/src/AlertDialog.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{L:function(){return AlertDialog}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),focus_visible_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./tools/shared/src/focus-visible.dev.js")),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),condition_attribute_with_id_dev=__webpack_require__("./tools/base/src/condition-attribute-with-id.dev.js"),resize_controller=__webpack_require__("./node_modules/@lit-labs/observers/development/resize-controller.js");var alert_dialog_css=index_dev.AH`
    :host{--spectrum-alert-dialog-min-width:var(--spectrum-alert-dialog-minimum-width);--spectrum-alert-dialog-max-width:var(--spectrum-alert-dialog-maximum-width);--spectrum-alert-dialog-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-alert-dialog-warning-icon-color:var(--spectrum-notice-visual-color);--spectrum-alert-dialog-error-icon-color:var(--spectrum-negative-visual-color);--spectrum-alert-dialog-title-font-family:var(--spectrum-sans-font-family-stack);--spectrum-alert-dialog-title-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-alert-dialog-title-font-style:var(--spectrum-heading-sans-serif-font-style);--spectrum-alert-dialog-title-font-size:var(--spectrum-alert-dialog-title-size);--spectrum-alert-dialog-title-line-height:var(--spectrum-heading-line-height);--spectrum-alert-dialog-title-color:var(--spectrum-heading-color);--spectrum-alert-dialog-body-font-family:var(--spectrum-sans-font-family-stack);--spectrum-alert-dialog-body-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-alert-dialog-body-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-alert-dialog-body-font-size:var(--spectrum-alert-dialog-description-size);--spectrum-alert-dialog-body-line-height:var(--spectrum-line-height-100);--spectrum-alert-dialog-body-color:var(--spectrum-body-color);--spectrum-alert-dialog-title-to-divider:var(--spectrum-spacing-200);--spectrum-alert-dialog-divider-to-description:var(--spectrum-spacing-300);--spectrum-alert-dialog-title-to-icon:var(--spectrum-spacing-300);--mod-buttongroup-justify-content:flex-end;box-sizing:border-box;inline-size:fit-content;min-inline-size:var(--mod-alert-dialog-min-width,var(--spectrum-alert-dialog-min-width));max-inline-size:var(--mod-alert-dialog-max-width,var(--spectrum-alert-dialog-max-width));max-block-size:inherit;padding:var(--mod-alert-dialog-padding,var(--spectrum-alert-dialog-padding));outline:none;display:flex}.icon{inline-size:var(--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size));block-size:var(--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size));flex-shrink:0;margin-inline-start:var(--mod-alert-dialog-title-to-icon,var(--spectrum-alert-dialog-title-to-icon))}:host([variant=warning]){--mod-icon-color:var(--mod-alert-dialog-warning-icon-color,var(--spectrum-alert-dialog-warning-icon-color))}:host([variant=error]){--mod-icon-color:var(--mod-alert-dialog-error-icon-color,var(--spectrum-alert-dialog-error-icon-color))}.grid{display:grid}.header{justify-content:space-between;align-items:baseline;display:flex}::slotted([slot=heading]){font-family:var(--mod-alert-dialog-title-font-family,var(--spectrum-alert-dialog-title-font-family));font-weight:var(--mod-alert-dialog-title-font-weight,var(--spectrum-alert-dialog-title-font-weight));font-style:var(--mod-alert-dialog-title-font-style,var(--spectrum-alert-dialog-title-font-style));font-size:var(--mod-alert-dialog-title-font-size,var(--spectrum-alert-dialog-title-font-size));line-height:var(--mod-alert-dialog-title-line-height,var(--spectrum-alert-dialog-title-line-height));color:var(--mod-alert-dialog-title-color,var(--spectrum-alert-dialog-title-color));margin:0;margin-block-end:var(--mod-alert-dialog-title-to-divider,var(--spectrum-alert-dialog-title-to-divider))}.content{font-family:var(--mod-alert-dialog-body-font-family,var(--spectrum-alert-dialog-body-font-family));font-weight:var(--mod-alert-dialog-body-font-weight,var(--spectrum-alert-dialog-body-font-weight));font-style:var(--mod-alert-dialog-body-font-style,var(--spectrum-alert-dialog-body-font-style));font-size:var(--mod-alert-dialog-body-font-size,var(--spectrum-alert-dialog-body-font-size));line-height:var(--mod-alert-dialog-body-line-height,var(--spectrum-alert-dialog-body-line-height));color:var(--mod-alert-dialog-body-color,var(--spectrum-alert-dialog-body-color));-webkit-overflow-scrolling:touch;margin:0;margin-block-start:var(--mod-alert-dialog-divider-to-description,var(--spectrum-alert-dialog-divider-to-description));margin-block-end:var(--mod-alert-dialog-description-to-buttons,var(--spectrum-alert-dialog-description-to-buttons));overflow-y:auto}@media (forced-colors:active){:host{border:solid}}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const alertDialogVariants=["confirmation","information","warning","error","destructive","secondary"];function gatherAppliedIdsFromSlottedChildren(slot,idBase){const assignedElements=slot.assignedElements(),ids=[];return assignedElements.forEach((el=>{if(el.id)ids.push(el.id);else{const id=idBase+`-${(0,random_id_dev.l)()}`;el.id=id,ids.push(id)}})),ids}const _AlertDialog=class _AlertDialog extends((0,focus_visible_dev.p)(index_dev.wG)){constructor(){super(...arguments),this.resizeController=new resize_controller.P(this,{callback:()=>{this.shouldManageTabOrderForScrolling()}}),this._variant="",this.labelledbyId="sp-dialog-label-"+_AlertDialog.instanceCount++,this.shouldManageTabOrderForScrolling=()=>{if(!this.contentElement)return;const{offsetHeight:offsetHeight,scrollHeight:scrollHeight}=this.contentElement;offsetHeight<scrollHeight?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")},this.describedbyId="sp-dialog-description-"+_AlertDialog.instanceCount++}static get styles(){return[alert_dialog_css]}set variant(variant){if(variant===this.variant)return;const oldValue=this.variant;alertDialogVariants.includes(variant)?(this.setAttribute("variant",variant),this._variant=variant):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",oldValue)}get variant(){return this._variant}renderIcon(){switch(this.variant){case"warning":case"error":return index_dev.qy`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;default:return index_dev.qy``}}renderHeading(){return index_dev.qy`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return index_dev.qy`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}onHeadingSlotchange({target:target}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const ids=gatherAppliedIdsFromSlottedChildren(target,this.labelledbyId);ids.length&&(this.conditionLabelledby=(0,condition_attribute_with_id_dev.$)(this,"aria-labelledby",ids))}onContentSlotChange({target:target}){requestAnimationFrame((()=>{this.resizeController.unobserve(this.contentElement),this.resizeController.observe(this.contentElement)})),this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const ids=gatherAppliedIdsFromSlottedChildren(target,this.describedbyId);if(ids.length&&ids.length<4)this.conditionDescribedby=(0,condition_attribute_with_id_dev.$)(this,"aria-describedby",ids);else if(!ids.length){const idProvided=!!this.id;idProvided||(this.id=this.describedbyId);const conditionDescribedby=(0,condition_attribute_with_id_dev.$)(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{conditionDescribedby(),idProvided||this.removeAttribute("id")}}}renderButtons(){return index_dev.qy`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `}render(){return index_dev.qy`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `}};_AlertDialog.instanceCount=0,__decorateClass([(0,decorators_dev.P)(".content")],_AlertDialog.prototype,"contentElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],_AlertDialog.prototype,"variant",1);let AlertDialog=_AlertDialog},"./packages/alert-dialog/stories/alert-dialog.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},confirmation:function(){return confirmation},default:function(){return alert_dialog_stories},destructive:function(){return destructive},error:function(){return error},information:function(){return information},secondary:function(){return secondary},warning:function(){return warning}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),AlertDialog_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/alert-dialog/src/AlertDialog.dev.js"));(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-alert-dialog",AlertDialog_dev.L);var alert_dialog_stories={title:"Alert Dialog",component:"sp-alert-dialog"};const confirmation=()=>index_dev.qy`
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
    `,__namedExportsOrder=["confirmation","information","warning","error","destructive","secondary"];confirmation.parameters={...confirmation.parameters,docs:{...confirmation.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="confirmation">\n            <h2 slot="heading">Disclaimer</h2>\n            Smart filters are nondestructive and will preserve your original\n            images.\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="accent"\n                treatment="fill"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Enable\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...confirmation.parameters?.docs?.source}}},information.parameters={...information.parameters,docs:{...information.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="information">\n            <h2 slot="heading">Connect to wifi</h2>\n            Please connect to wifi to sync your projects or go to Settings to\n            change your preferences.\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...information.parameters?.docs?.source}}},warning.parameters={...warning.parameters,docs:{...warning.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="warning">\n            <h2 slot="heading">Unverified format</h2>\n            This format has not been verified and may not be viewable for some\n            users. Do you want to continue publishing?\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...warning.parameters?.docs?.source}}},error.parameters={...error.parameters,docs:{...error.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="error">\n            <h2 slot="heading">Unable to share</h2>\n            An error occured while sharing your project. Please verify the email\n            address and try again.\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Continue\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...error.parameters?.docs?.source}}},destructive.parameters={...destructive.parameters,docs:{...destructive.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="destructive">\n            <h2 slot="heading">Delete 3 documents?</h2>\n            Are you sure you want to delete the 3 selected documents?\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Cancel\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="negative"\n                treatment="fill"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Delete\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...destructive.parameters?.docs?.source}}},secondary.parameters={...secondary.parameters,docs:{...secondary.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-alert-dialog variant="secondary">\n            <h2 slot="heading">Rate this app</h2>\n            If you enjoy our app, would you mind taking a moment to rate it?\n            <sp-button\n                slot="button"\n                id="secondaryButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                No, thanks\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="cancelButton"\n                variant="secondary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Remind me later\n            </sp-button>\n            <sp-button\n                slot="button"\n                id="confirmButton"\n                variant="primary"\n                treatment="outline"\n                onclick="this.dispatchEvent(new Event(\'close\', { bubbles: true, composed: true }));"\n            >\n                Rate now\n            </sp-button>\n        </sp-alert-dialog>\n    `;\n}',...secondary.parameters?.docs?.source}}}},"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)}}]);
//# sourceMappingURL=alert-dialog-stories-alert-dialog-stories.961e00d8.iframe.bundle.js.map