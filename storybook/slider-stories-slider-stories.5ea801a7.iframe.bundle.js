"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[1082,3438,5287,5432,6156,8614,8701],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"../node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/lit-html.js")},"./packages/button/sp-close-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/CloseButton.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-close-button",_src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__.J)},"./packages/dialog/sp-dialog.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),src_index_dev=(__webpack_require__("./packages/button-group/sp-button-group.dev.js"),__webpack_require__("./packages/button/sp-close-button.dev.js"),__webpack_require__("./packages/divider/sp-divider.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-alert.js"),__webpack_require__("./tools/shared/src/index.dev.js")),AlertDialog_dev=__webpack_require__("./packages/alert-dialog/src/AlertDialog.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js");var dialog_css=index_dev.AH`
    :host{box-sizing:border-box;inline-size:fit-content;min-inline-size:var(--mod-dialog-min-inline-size,var(--spectrum-dialog-min-inline-size));max-inline-size:100%;max-block-size:inherit;outline:none;display:flex}:host([size=s]){inline-size:var(--mod-dialog-confirm-small-width,var(--spectrum-dialog-confirm-small-width))}:host([size=m]){inline-size:var(--mod-dialog-confirm-medium-width,var(--spectrum-dialog-confirm-medium-width))}:host([size=l]){inline-size:var(--mod-dialog-confirm-large-width,var(--spectrum-dialog-confirm-large-width))}::slotted([slot=hero]){block-size:var(--mod-dialog-confirm-hero-height,var(--spectrum-dialog-confirm-hero-height));background-position:50%;background-size:cover;border-start-start-radius:var(--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius));border-start-end-radius:var(--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius));grid-area:hero;overflow:hidden}.grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"hero hero hero hero hero hero"". . . . . ."".heading header header header."".divider divider divider divider."".content content content content."".footer footer buttonGroup buttonGroup."". . . . . .";grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));inline-size:100%;display:grid}::slotted([slot=heading]){font-size:var(--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size));font-weight:var(--mod-dialog-heading-font-weight,var(--spectrum-dialog-heading-font-weight));line-height:var(--mod-dialog-confirm-title-text-line-height,var(--spectrum-dialog-confirm-title-text-line-height));color:var(--mod-dialog-confirm-title-text-color,var(--spectrum-dialog-confirm-title-text-color));outline:none;grid-area:heading;margin:0;padding-inline-end:var(--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size))}.no-header::slotted([slot=heading]){grid-area:heading-start/heading-start/header-end/header-end;padding-inline-end:0}.header{box-sizing:border-box;outline:none;grid-area:header;justify-content:flex-end;align-items:center;display:flex}.divider{inline-size:100%;grid-area:divider;margin-block-start:var(--mod-dialog-confirm-divider-block-spacing-end,var(--spectrum-dialog-confirm-divider-block-spacing-end));margin-block-end:var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start))}:host([mode=fullscreen]) [name=heading]+.divider{margin-block-end:calc(var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start)) - var(--mod-dialog-confirm-description-padding,var(--spectrum-dialog-confirm-description-padding))*2)}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-block-end:calc(var(--mod-dialog-confirm-divider-block-spacing-end,var(--spectrum-dialog-confirm-divider-block-spacing-end)) + var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start)) + var(--mod-dialog-confirm-divider-height,var(--spectrum-dialog-confirm-divider-height)))}.content{box-sizing:border-box;-webkit-overflow-scrolling:touch;font-size:var(--mod-dialog-confirm-description-text-size,var(--spectrum-dialog-confirm-description-text-size));font-weight:var(--mod-dialog-confirm-description-font-weight,var(--spectrum-regular-font-weight));line-height:var(--mod-dialog-confirm-description-text-line-height,var(--spectrum-dialog-confirm-description-text-line-height));color:var(--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color));padding:calc(var(--mod-dialog-confirm-description-padding,var(--spectrum-dialog-confirm-description-padding))*2);margin:0 var(--mod-dialog-confirm-description-margin,var(--spectrum-dialog-confirm-description-margin));outline:none;grid-area:content;overflow-y:auto}.footer{outline:none;flex-wrap:wrap;grid-area:footer;padding-block-start:var(--mod-dialog-confirm-footer-padding-top,var(--spectrum-dialog-confirm-footer-padding-top));display:flex}.footer>*,.footer>.spectrum-Button+.spectrum-Button{margin-block-end:0}.button-group{grid-area:buttonGroup;justify-content:flex-end;padding-block-start:var(--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top));padding-inline-start:var(--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size));display:flex}.button-group.button-group--noFooter{grid-area:footer-start/footer-start/buttonGroup-end/buttonGroup-end}:host([dismissable]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)minmax(0,var(--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)))var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"hero hero hero hero hero hero hero"". . . . .closeButton closeButton"".heading header header typeIcon closeButton closeButton"".divider divider divider divider divider."".content content content content content."".footer footer buttonGroup buttonGroup buttonGroup."". . . . . . .";grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))}:host([dismissable]) .grid .button-group{display:none}:host([dismissable]) .grid .footer{color:var(--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color));grid-area:footer/footer/buttonGroup/buttonGroup}.close-button{grid-area:closeButton;place-self:start end;margin-block-start:var(--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding));margin-inline-end:var(--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding))}:host([mode=fullscreen]){block-size:100%;inline-size:100%}:host([mode=fullscreenTakeover]){border-radius:0;block-size:100%;inline-size:100%}:host([mode=fullscreen]),:host([mode=fullscreenTakeover]){max-block-size:none;max-inline-size:none}:host([mode=fullscreen]) .grid,:host([mode=fullscreenTakeover]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))1fr auto auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:". . . . ."".heading header buttonGroup."".divider divider divider."".content content content."". . . . .";display:grid}:host([mode=fullscreen]) ::slotted([slot=heading]),:host([mode=fullscreenTakeover]) ::slotted([slot=heading]){font-size:var(--mod-dialog-fullscreen-header-text-size,var(--spectrum-dialog-fullscreen-header-text-size))}:host([mode=fullscreen]) .content,:host([mode=fullscreenTakeover]) .content{max-block-size:none}:host([mode=fullscreen]) .button-group,:host([mode=fullscreen]) .footer,:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreenTakeover]) .footer{padding-block-start:0}:host([mode=fullscreen]) .footer,:host([mode=fullscreenTakeover]) .footer{display:none}:host([mode=fullscreen]) .button-group,:host([mode=fullscreenTakeover]) .button-group{grid-area:buttonGroup;align-self:start}@media screen and (width<=700px){.grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"hero hero hero hero hero hero"". . . . . ."".heading heading heading heading."".header header header header."".divider divider divider divider."".content content content content."".footer footer buttonGroup buttonGroup."". . . . . ."}.grid,:host([dismissable]) .grid{grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))}:host([dismissable]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)minmax(0,var(--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)))var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"hero hero hero hero hero hero hero"". . . . .closeButton closeButton"".heading heading heading heading closeButton closeButton"".header header header header header."".divider divider divider divider divider."".content content content content content."".footer footer buttonGroup buttonGroup buttonGroup."". . . . . . ."}.header{justify-content:flex-start}:host([mode=fullscreen]) .grid,:host([mode=fullscreenTakeover]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))1fr var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:". . ."".heading."".header."".divider."".content."".buttonGroup."". . .";display:grid}:host([mode=fullscreen]) .button-group,:host([mode=fullscreenTakeover]) .button-group{padding-block-start:var(--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top))}:host([mode=fullscreen]) ::slotted([slot=heading]),:host([mode=fullscreenTakeover]) ::slotted([slot=heading]){font-size:var(--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size))}}@media (forced-colors:active){:host{border:solid}}:host{--spectrum-dialog-fullscreen-header-text-size:var(--system-dialog-fullscreen-header-text-size);--spectrum-dialog-min-inline-size:var(--system-dialog-min-inline-size);--spectrum-dialog-confirm-small-width:var(--system-dialog-confirm-small-width);--spectrum-dialog-confirm-medium-width:var(--system-dialog-confirm-medium-width);--spectrum-dialog-confirm-large-width:var(--system-dialog-confirm-large-width);--spectrum-dialog-confirm-divider-block-spacing-start:var(--system-dialog-confirm-divider-block-spacing-start);--spectrum-dialog-confirm-divider-block-spacing-end:var(--system-dialog-confirm-divider-block-spacing-end);--spectrum-dialog-confirm-description-text-color:var(--system-dialog-confirm-description-text-color);--spectrum-dialog-confirm-title-text-color:var(--system-dialog-confirm-title-text-color);--spectrum-dialog-confirm-description-text-line-height:var(--system-dialog-confirm-description-text-line-height);--spectrum-dialog-confirm-title-text-line-height:var(--system-dialog-confirm-title-text-line-height);--spectrum-dialog-heading-font-weight:var(--system-dialog-heading-font-weight);--spectrum-dialog-confirm-description-padding:var(--system-dialog-confirm-description-padding);--spectrum-dialog-confirm-description-margin:var(--system-dialog-confirm-description-margin);--spectrum-dialog-confirm-footer-padding-top:var(--system-dialog-confirm-footer-padding-top);--spectrum-dialog-confirm-gap-size:var(--system-dialog-confirm-gap-size);--spectrum-dialog-confirm-buttongroup-padding-top:var(--system-dialog-confirm-buttongroup-padding-top);--spectrum-dialog-confirm-close-button-size:var(--system-dialog-confirm-close-button-size);--spectrum-dialog-confirm-close-button-padding:var(--system-dialog-confirm-close-button-padding);--spectrum-dialog-confirm-divider-height:var(--system-dialog-confirm-divider-height)}:host{--swc-alert-dialog-error-icon-color:var(--spectrum-negative-visual-color)}.content{overflow:hidden}.footer{color:var(--spectrum-dialog-confirm-description-text-color,var(--spectrum-gray-800))}.type-icon{color:var(--mod-alert-dialog-error-icon-color,var(--swc-alert-dialog-error-icon-color));grid-area:typeIcon}.content[tabindex]{overflow:auto}::slotted(img[slot=hero]){width:100%;height:auto}.grid{grid-template-areas:"hero hero hero hero hero hero"". . . . . ."".heading heading heading typeIcon."".divider divider divider divider."".content content content content."".footer footer buttonGroup buttonGroup."". . . . . .";inline-size:100%;display:grid}:host(:not([error],[dismissable],[mode])) .grid{grid-template-areas:"hero hero hero hero hero hero"". . . . . ."".heading heading heading heading."".divider divider divider divider."".content content content content."".footer footer buttonGroup buttonGroup."". . . . . .";inline-size:100%;display:grid}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Dialog extends((0,src_index_dev.eJ)(AlertDialog_dev.L,['[slot="hero"]','[slot="footer"]','[slot="button"]'])){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.dismissLabel="Close",this.noDivider=!1}static get styles(){return[dialog_css]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return index_dev.qy`
            <slot name="hero"></slot>
        `}renderFooter(){return index_dev.qy`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const classes={"button-group":!0,"button-group--noFooter":!this.hasFooter};return index_dev.qy`
            <sp-button-group class=${(0,directives_dev.Hk)(classes)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return index_dev.qy`
            <sp-close-button
                class="close-button"
                label=${this.dismissLabel}
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return index_dev.qy`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?index_dev.qy`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:index_dev.s6}
                ${this.noDivider?index_dev.s6:index_dev.qy`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():index_dev.s6}
                ${this.hasButtons?this.renderButtons():index_dev.s6}
                ${this.dismissable?this.renderDismiss():index_dev.s6}
            </div>
        `}shouldUpdate(changes){return changes.has("mode")&&this.mode&&(this.dismissable=!1),changes.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(changes)}firstUpdated(changes){super.firstUpdated(changes),this.setAttribute("role","dialog")}updated(changes){super.updated(changes)}}__decorateClass([(0,decorators_dev.P)(".close-button")],Dialog.prototype,"closeButton",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Dialog.prototype,"error",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Dialog.prototype,"dismissable",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0,attribute:"dismiss-label"})],Dialog.prototype,"dismissLabel",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"no-divider"})],Dialog.prototype,"noDivider",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Dialog.prototype,"mode",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Dialog.prototype,"size",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog",Dialog)},"./packages/modal/src/modal.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    :host{--spectrum-modal-confirm-entry-animation-duration:var(--mod-modal-confirm-entry-animation-duration,var(--spectrum-animation-duration-500));--spectrum-modal-confirm-entry-animation-delay:var(--mod-overlay-animation-duration-opened,var(--mod-modal-confirm-entry-animation-delay,var(--spectrum-animation-duration-200)));--spectrum-modal-confirm-exit-animation-duration:var(--mod-overlay-animation-duration,var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-animation-duration-100)));--spectrum-modal-confirm-exit-animation-delay:var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-animation-duration-0));--spectrum-modal-fullscreen-margin:var(--mod-modal-fullscreen-margin,32px)}.modal{visibility:hidden;opacity:0;transform:translateY(var(--mod-modal-confirm-entry-animation-distance,var(--spectrum-dialog-confirm-entry-animation-distance)));z-index:1;max-block-size:90vh;max-block-size:var(--mod-modal-max-height,90vh);max-inline-size:90%;max-inline-size:var(--mod-modal-max-width,90%);background:var(--mod-modal-background-color,var(--spectrum-modal-background-color));border-radius:var(--mod-modal-confirm-border-radius,var(--spectrum-corner-radius-100));pointer-events:auto;transition:opacity var(--spectrum-modal-confirm-exit-animation-duration)var(--spectrum-animation-ease-in)var(--spectrum-modal-confirm-exit-animation-delay),visibility var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration)),transform var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration));outline:none;overflow:hidden}:host([open]) .modal{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay),opacity var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay);transform:translateY(0)}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]) .modal{border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}}.fullscreen{max-block-size:none;max-inline-size:none;position:fixed;inset-block-start:var(--spectrum-modal-fullscreen-margin);inset-block-end:var(--spectrum-modal-fullscreen-margin);inset-inline-start:var(--spectrum-modal-fullscreen-margin);inset-inline-end:var(--spectrum-modal-fullscreen-margin)}.fullscreenTakeover{box-sizing:border-box;border:none;border-radius:0;max-block-size:none;max-inline-size:none;position:fixed;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-modal-background-color:var(--system-modal-background-color)}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(--swc-test-duration);--spectrum-modal-confirm-entry-animation-distance:var(--spectrum-dialog-confirm-entry-animation-distance);height:100dvh}.modal{overflow:visible}
`;__webpack_exports__.A=i},"./packages/overlay/overlay-trigger.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("overlay-trigger",_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__.N)},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
    slot[name=longpress-describedby-descriptor]{display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class OverlayTrigger extends index_dev.wG{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[overlay_trigger_css]}getAssignedElementsFromSlot(slot){return slot.assignedElements({flatten:!0})}handleTriggerContent(event){this.targetContent=this.getAssignedElementsFromSlot(event.target)}handleSlotContent(event){switch(event.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(event.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(event.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(event.target)}}handleBeforetoggle(event){const{target:target}=event;let type;if(target===this.clickOverlayElement)type="click";else if(target===this.longpressOverlayElement)type="longpress";else{if(target!==this.hoverOverlayElement)return;type="hover"}"open"===event.newState?this.open=type:this.open===type&&(this.open=void 0)}update(changes){var _a,_b,_c,_d,_e,_f;changes.has("clickContent")&&(this.clickPlacement=(null==(_a=this.clickContent[0])?void 0:_a.getAttribute("placement"))||(null==(_b=this.clickContent[0])?void 0:_b.getAttribute("direction"))||void 0),changes.has("hoverContent")&&(this.hoverPlacement=(null==(_c=this.hoverContent[0])?void 0:_c.getAttribute("placement"))||(null==(_d=this.hoverContent[0])?void 0:_d.getAttribute("direction"))||void 0),changes.has("longpressContent")&&(this.longpressPlacement=(null==(_e=this.longpressContent[0])?void 0:_e.getAttribute("placement"))||(null==(_f=this.longpressContent[0])?void 0:_f.getAttribute("direction"))||void 0),super.update(changes)}renderSlot(name){return index_dev.qy`
            <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var _a;const slot=this.renderSlot("click-content"),clickOverlay=index_dev.qy`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${"click"===this.open&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type||"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("click"))||this.clickContent.length?clickOverlay:slot}renderHoverOverlay(){var _a;const slot=this.renderSlot("hover-content"),hoverOverlay=index_dev.qy`
            <sp-overlay
                id="hover-overlay"
                ?open=${"hover"===this.open&&!!this.hoverContent.length}
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("hover"))||this.hoverContent.length?hoverOverlay:slot}renderLongpressOverlay(){var _a;const slot=this.renderSlot("longpress-content"),longpressOverlay=index_dev.qy`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled||!this.longpressContent.length}
                ?open=${"longpress"===this.open&&!!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"longpress"}
                .type=${"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("longpress"))||this.longpressContent.length?longpressOverlay:slot}render(){return index_dev.qy`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/popover/sp-popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/popover/src/Popover.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-popover",_src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__.A)},"./packages/popover/src/Popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return Popover}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var popover_css=index_dev.AH`
    :host{pointer-events:none;visibility:hidden;opacity:0;transition:transform .13s ease-in-out,opacity .13s ease-in-out,visibility 0s linear .13s;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition-delay:0s;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-popover-animation-distance:var(--spectrum-spacing-100);--spectrum-popover-background-color:var(--spectrum-background-layer-2-color);--spectrum-popover-border-color:var(--spectrum-gray-400);--spectrum-popover-content-area-spacing-vertical:var(--spectrum-popover-top-to-content-area);--spectrum-popover-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-popover-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-popover-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-popover-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-popover-corner-radius:var(--spectrum-corner-radius-100);--spectrum-popover-pointer-width:var(--spectrum-popover-tip-width);--spectrum-popover-pointer-height:var(--spectrum-popover-tip-height);--spectrum-popover-pointer-edge-offset:calc(var(--spectrum-corner-radius-100) + var(--spectrum-popover-tip-width)/2);--spectrum-popover-pointer-edge-spacing:calc(var(--spectrum-popover-pointer-edge-offset) - var(--spectrum-popover-tip-width)/2)}@media (forced-colors:active){:host{--highcontrast-popover-border-color:CanvasText}}:host{--spectrum-popover-filter:drop-shadow(var(--mod-popover-shadow-horizontal,var(--spectrum-popover-shadow-horizontal))var(--mod-popover-shadow-vertical,var(--spectrum-popover-shadow-vertical))var(--mod-popover-shadow-blur,var(--spectrum-popover-shadow-blur))var(--mod-popover-shadow-color,var(--spectrum-popover-shadow-color)));box-sizing:border-box;padding:var(--mod-popover-content-area-spacing-vertical,var(--spectrum-popover-content-area-spacing-vertical))0;border-radius:var(--mod-popover-corner-radius,var(--spectrum-popover-corner-radius));border-style:solid;border-color:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));border-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width));background-color:var(--mod-popover-background-color,var(--spectrum-popover-background-color));filter:var(--mod-popover-filter,var(--spectrum-popover-filter));outline:none;flex-direction:column;display:inline-flex;position:absolute}:host([tip]){overflow:visible}:host([tip]) #tip .triangle{stroke-linecap:square;stroke-linejoin:miter;fill:var(--mod-popover-background-color,var(--spectrum-popover-background-color));stroke:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));stroke-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width))}*{--mod-popover-filter:none}:host([tip]) .spectrum-Popover--top-end,:host([tip]) .spectrum-Popover--top-left,:host([tip]) .spectrum-Popover--top-right,:host([tip]) .spectrum-Popover--top-start,:host([placement*=top][tip]){margin-block-end:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--top-end,:host([open]) .spectrum-Popover--top-left,:host([open]) .spectrum-Popover--top-right,:host([open]) .spectrum-Popover--top-start,:host([placement*=top][open]){transform:translateY(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--bottom-end,:host([tip]) .spectrum-Popover--bottom-left,:host([tip]) .spectrum-Popover--bottom-right,:host([tip]) .spectrum-Popover--bottom-start,:host([placement*=bottom][tip]){margin-block-start:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--bottom-end,:host([open]) .spectrum-Popover--bottom-left,:host([open]) .spectrum-Popover--bottom-right,:host([open]) .spectrum-Popover--bottom-start,:host([placement*=bottom][open]){transform:translateY(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--right-bottom,:host([tip]) .spectrum-Popover--right-top,:host([placement*=right][tip]){margin-left:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--right-bottom,:host([open]) .spectrum-Popover--right-top,:host([placement*=right][open]){transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--left-bottom,:host([tip]) .spectrum-Popover--left-top,:host([placement*=left][tip]){margin-right:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--left-bottom,:host([open]) .spectrum-Popover--left-top,:host([placement*=left][open]){transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--start-bottom,:host([tip]) .spectrum-Popover--start-top,:host([tip]) .spectrum-Popover--start{margin-inline-end:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--start-bottom,:host([open]) .spectrum-Popover--start-top,:host([open]) .spectrum-Popover--start{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([open]) .spectrum-Popover--start-bottom:dir(rtl),:host([open]) .spectrum-Popover--start-top:dir(rtl),:host([open]) .spectrum-Popover--start:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--start-bottom,:host([dir=rtl][open]) .spectrum-Popover--start-top,:host([dir=rtl][open]) .spectrum-Popover--start{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--end-bottom,:host([tip]) .spectrum-Popover--end-top,:host([tip]) .spectrum-Popover--end{margin-inline-start:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--end-bottom,:host([open]) .spectrum-Popover--end-top,:host([open]) .spectrum-Popover--end{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([open]) .spectrum-Popover--end-bottom:dir(rtl),:host([open]) .spectrum-Popover--end-top:dir(rtl),:host([open]) .spectrum-Popover--end:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--end-bottom,:host([dir=rtl][open]) .spectrum-Popover--end-top,:host([dir=rtl][open]) .spectrum-Popover--end{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) #tip,:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip][placement*=top]) #tip,:host([tip]) .spectrum-Popover--top-end #tip,:host([tip]) .spectrum-Popover--top-left #tip,:host([tip]) .spectrum-Popover--top-right #tip,:host([tip]) .spectrum-Popover--top-start #tip{inline-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));block-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));margin:auto;position:absolute;inset-block-start:100%;inset-inline:0;transform:translate(0)}:host([tip]) .spectrum-Popover--top-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--top-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip{inset-block:auto 100%;transform:scaleY(-1)}:host([tip]) .spectrum-Popover--bottom-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--bottom-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{inline-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));block-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));inset-block:0}:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip{left:100%;right:auto}:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip{left:auto;right:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top #tip{inset-block:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom #tip{inset-block:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{margin-inline-start:100%}:host([tip]) .spectrum-Popover--start #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--start #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-top #tip{transform:none}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip{margin-inline-end:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--end #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-top #tip{transform:scaleX(1)}:host{--spectrum-popover-border-width:var(--system-popover-border-width)}:host{min-width:min-content;max-width:100%;max-height:100%;inline-size:var(--mod-popover-inline-size);clip-path:none}::slotted(*){overscroll-behavior:contain}:host([placement*=left]) #tip[style],:host([placement*=right]) #tip[style]{inset-block-end:auto}:host([placement*=top]) #tip[style],:host([placement*=bottom]) #tip[style]{inset-inline-end:auto}.block,.inline{width:100%;height:100%;display:block}:host([placement*=left]) .block,:host([placement*=right]) .block,:host([placement*=top]) .inline,:host([placement*=bottom]) .inline{display:none}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}::slotted(sp-menu){margin:0}:host([dialog]){min-width:var(--mod-popover-dialog-min-width,var(--spectrum-popover-dialog-min-width,270px));padding:var(--mod-popover-dialog-padding,var(--spectrum-popover-dialog-padding,30px 29px))}:host([tip][placement]) #tip{height:auto}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Popover extends index_dev.wG{constructor(){super(...arguments),this.open=!1,this.tip=!1}static get styles(){return[popover_css]}renderTip(){return index_dev.qy`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `}render(){return index_dev.qy`
            <slot></slot>
            ${this.tip?this.renderTip():index_dev.s6}
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Popover.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),__decorateClass([(0,decorators_dev.P)("#tip")],Popover.prototype,"tipElement",2)},"./packages/slider/stories/slider.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Disabled:function(){return Disabled},ExplicitHandle:function(){return ExplicitHandle},FillStart:function(){return FillStart},FillStartWithNegativeMinRange:function(){return FillStartWithNegativeMinRange},FillStartWithValue:function(){return FillStartWithValue},Filled:function(){return Filled},Gradient:function(){return Gradient},HasADefaultValue:function(){return HasADefaultValue},Indeterminate:function(){return Indeterminate},Multiple:function(){return Multiple},Quiet:function(){return Quiet},ThreeHandlesComplex:function(){return ThreeHandlesComplex},ThreeHandlesOrdered:function(){return ThreeHandlesOrdered},ThreeHandlesPc:function(){return ThreeHandlesPc},TwoHandles:function(){return TwoHandles},TwoHandlesPt:function(){return TwoHandlesPt},WithPopover:function(){return WithPopover},__namedExportsOrder:function(){return __namedExportsOrder},autofocus:function(){return autofocus},default:function(){return slider_stories},editable:function(){return editable},editableCustom:function(){return editableCustom},editableDisabled:function(){return editableDisabled},editableWithDefaultValue:function(){return editableWithDefaultValue},editableWithFractionValue:function(){return editableWithFractionValue},editableWithoutVisibleLabels:function(){return editableWithoutVisibleLabels},focusTabDemo:function(){return focusTabDemo},hideStepper:function(){return hideStepper},inPopover:function(){return inPopover},max20:function(){return max20},minimalDOM:function(){return minimalDOM},noVisibleLabels:function(){return noVisibleLabels},noVisibleTextLabel:function(){return noVisibleTextLabel},noVisibleValueLabel:function(){return noVisibleValueLabel},px:function(){return px},tick:function(){return tick},tickLabels:function(){return tickLabels}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),Slider_dev=(__webpack_require__("./packages/slider/sp-slider.dev.js"),__webpack_require__("./packages/slider/sp-slider-handle.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/slider/src/Slider.dev.js")),lit_helpers=(__webpack_require__("./packages/slider/src/SliderHandle.dev.js"),__webpack_require__("./packages/slider/src/HandleController.dev.js"),__webpack_require__("./test/lit-helpers.js")),slider_stories=(__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/tray/sp-tray.dev.js"),{component:"sp-slider",title:"Slider",argTypes:{onInput:{action:"input"},onChange:{action:"change"},variant:{name:"Variant",description:"Determines the style of slider.",table:{type:{summary:"string"},defaultValue:{summary:void 0}},control:{type:"inline-radio",options:[void 0,...Slider_dev.H]}},tickStep:{name:"Tick Step",description:"Tick spacing on slider.",table:{type:{summary:"number"},defaultValue:{summary:.1}},control:{type:"number"}},labelVisibility:{name:"Label Visibility",description:"The labels visibily available in the UI",table:{type:{summary:'"text" | "value" | "none" | undefined'},defaultValue:{summary:void 0}},control:{type:"text"}}},args:{variant:void 0,tickStep:.1,labelVisibility:void 0,min:void 0,max:void 0,value:void 0,step:void 0}});const handleEvent=({onInput:onInput,onChange:onChange})=>event=>{const{value:value}=event.target;onInput&&"input"===event.type?onInput(value.toString()):onChange&&"change"===event.type&&onChange(value.toString())},handleHandleEvent=({onInput:onInput,onChange:onChange})=>event=>{const target=event.target;if(null!=target.value)if("object"==typeof target.value){const value=JSON.stringify(target.value,null,2);onInput&&"input"===event.type?onInput(value):onChange&&"change"===event.type&&onChange(value)}else{const value=`${target.name}: ${target.value}`;onInput&&"input"===event.type?onInput(value):onChange&&"change"===event.type&&onChange(value)}},Default=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `,Filled=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                variant="filled"
                min="0"
                value=".7"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Slider Label
            </sp-slider>
        </div>
    `,HasADefaultValue=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                default-value="0.2"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                double click or press escape key to reset
            </sp-slider>
        </div>
    `,FillStart=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                fill-start
                variant="filled"
                min="0"
                value=".7"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Slider label
            </sp-slider>
        </div>
    `,FillStartWithValue=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".7"
                step="0.1"
                fill-start="0.3"
                variant="filled"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Value Greater than Fill Start
            </sp-slider>
        </div>
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="20"
                min="0"
                value="5"
                step="1"
                fill-start="15"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"number"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Value Less than Fill Start
            </sp-slider>
        </div>
    `,FillStartWithNegativeMinRange=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="150"
                min="-50"
                value="25"
                step="1"
                fill-start="0"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"number"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Fill start with "0" and within range -50 to 150
            </sp-slider>
        </div>
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                max="100"
                min="-50"
                value="-25"
                step="1"
                fill-start="0"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"number"}}
                .normalization=${{toNormalized:value=>0===value?.5:value<0?.5-value/-50*.5:.5+value/100*.5,fromNormalized:value=>.5===value?0:value<.5?-50*(1-value/.5):(value-.5)/.5*100}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Fill start with "0" and normalization function within range -50
                to 100
            </sp-slider>
        </div>
    `,autofocus=(args={})=>index_dev.qy`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                autofocus
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `,minimalDOM=()=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider>Opacity</sp-slider>
        </div>
    `,noVisibleTextLabel=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;noVisibleTextLabel.args={labelVisibility:"value"};const noVisibleValueLabel=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value="0"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;noVisibleValueLabel.args={labelVisibility:"text"};const noVisibleLabels=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;noVisibleLabels.args={labelVisibility:"none"};const px=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="360"
                min="0"
                value="90"
                step="1"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"unit",unit:"px"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;class NumberFieldDefined extends HTMLElement{constructor(){super(),this.numberFieldLoaderPromise=Promise.resolve(!1),this.numberFieldLoaderPromise=new Promise(res=>{customElements.whenDefined("sp-number-field").then(()=>{res(!0)})})}get updateComplete(){return this.numberFieldLoaderPromise}}customElements.define("number-field-defined",NumberFieldDefined);const editableDecorator=story=>index_dev.qy`
        ${story()}
        <number-field-defined></number-field-defined>
    `,max20=(args={})=>index_dev.qy`
        <div style="width: 200px; margin: 12px 20px;">
            <sp-slider
                editable
                max="20"
                min="0"
                value="5"
                step="1"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            >
                Max 20
            </sp-slider>
        </div>
    `;max20.swc_vrt={skip:!0},max20.parameters={chromatic:{disableSnapshot:!0}};const editable=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                max="360"
                min="0"
                value="90"
                step="1"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"unit",unit:"degree",unitDisplay:"narrow"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;editable.decorators=[editableDecorator];const Multiple=args=>{const updateSliderConfig=(min,max,value,step)=>{const slider=document.querySelector("sp-slider");slider&&(slider.value=value,slider.min=min,slider.max=max,slider.step=step)};return index_dev.qy`
        <overlay-trigger type="modal">
            <sp-button slot="trigger" variant="secondary">
                Toggle menu
            </sp-button>
            <sp-tray slot="click-content">
                <div style="padding: 8px; width: 100%">
                    <sp-slider
                        label="Slider Label"
                        min=${args.min}
                        max=${args.max}
                        value=${args.value}
                        step=${args.step}
                        variant="filled"
                        hide-stepper
                        editable
                    ></sp-slider>
                    <div
                        style="display: grid; gap: 8px; padding: 8px; width: 50%; margin: auto;"
                    >
                        <sp-button
                            size="s"
                            @click=${()=>updateSliderConfig(.25,4,.75,.01)}
                        >
                            Duration
                        </sp-button>
                        <sp-button
                            size="s"
                            @click=${()=>updateSliderConfig(2,100,2,1)}
                        >
                            Personality
                        </sp-button>
                        <sp-button
                            size="s"
                            @click=${()=>updateSliderConfig(2,25,3,1)}
                        >
                            Intensity
                        </sp-button>
                    </div>
                </div>
            </sp-tray>
        </overlay-trigger>
    `};Multiple.args={min:.25,max:4,value:.75,step:.01};const editableWithDefaultValue=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                max="360"
                min="0"
                value="90"
                step="1"
                default-value="180"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"unit",unit:"degree",unitDisplay:"narrow"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;editableWithDefaultValue.swc_vrt={skip:!0},editableWithDefaultValue.parameters={chromatic:{disableSnapshot:!0}};const editableWithFractionValue=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                max="255"
                min="0.1"
                value="0.5"
                step="0.01"
                default-value="18"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;editableWithFractionValue.swc_vrt={skip:!0},editableWithFractionValue.parameters={chromatic:{disableSnapshot:!0}};const editableDisabled=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                disabled
                max="360"
                min="0"
                value="90"
                step="1"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"unit",unit:"degree",unitDisplay:"narrow"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Angle
            </sp-slider>
        </div>
    `;editable.decorators=[editableDecorator];const editableCustom=(args={})=>index_dev.qy`
        <div
            style="width: 500px; margin: 12px 20px; --mod-stepper-width: 150px;"
        >
            <sp-slider
                editable
                max="24"
                min="0"
                value="12.75"
                step="0.25"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"unit",unit:"hour"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Hours
            </sp-slider>
        </div>
    `;editableCustom.decorators=[editableDecorator];const editableWithoutVisibleLabels=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;editableWithoutVisibleLabels.args={labelVisibility:"none"};const hideStepper=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                hide-stepper
                max="1"
                min="0"
                value=".5"
                step="0.01"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                .formatOptions=${{style:"percent"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Opacity
            </sp-slider>
        </div>
    `;hideStepper.decorators=[editableDecorator];const Gradient=(args={})=>index_dev.qy`
        <style>
            sp-slider {
                --mod-slider-track-color: linear-gradient(
                    to right,
                    red,
                    green 100%
                );
            }
            sp-slider[dir='rtl'] {
                --mod-slider-track-color: linear-gradient(
                    to left,
                    red,
                    green 100%
                );
            }
        </style>
        <div
            style="
                width: 500px;
                margin: 12px 20px;
            "
        >
            <sp-slider
                label="Opacity"
                max="100"
                min="0"
                value="50"
                id="opacity-slider"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
    `;Gradient.args={variant:void 0};const tick=(args={})=>index_dev.qy`
        <sp-slider
            label="Slider Label"
            variant="tick"
            min="0"
            max="92"
            ...=${(0,lit_helpers.i)(args)}
        ></sp-slider>
        <sp-slider
            label="Slider Label"
            variant="tick"
            min="0"
            max="92"
            ...=${(0,lit_helpers.i)(args)}
        ></sp-slider>
    `;tick.args={variant:"tick",tickStep:5};const tickLabels=(args={})=>index_dev.qy`
        <sp-slider
            label="Slider Label"
            tick-labels
            variant="tick"
            min="50"
            max="75"
            ...=${(0,lit_helpers.i)(args)}
        ></sp-slider>
        <sp-slider
            label="Slider Label"
            tick-labels
            variant="tick"
            min="50"
            max="75"
            ...=${(0,lit_helpers.i)(args)}
        ></sp-slider>
    `;tickLabels.args={variant:"tick",tickStep:5};const Disabled=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                disabled
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Intensity"
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
    `,Quiet=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                hide-stepper
                quiet
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Intensity"
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
    `,inPopover=(args={})=>index_dev.qy`
        <sp-popover open style="min-width: 0">
            <sp-dialog no-divider>
                <sp-slider
                    editable
                    hide-stepper
                    quiet
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Intensity"
                    ...=${(0,lit_helpers.i)(args)}
                ></sp-slider>
            </sp-dialog>
        </sp-popover>
    `,Indeterminate=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                editable
                indeterminate
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Intensity"
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
    `,ExplicitHandle=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                step="0.5"
                min="0"
                max="20"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            >
                Intensity
                <sp-slider-handle slot="handle" value="5"></sp-slider-handle>
            </sp-slider>
        </div>
    `,TwoHandles=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            >
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                ></sp-slider-handle>
            </sp-slider>
        </div>
    `;TwoHandles.args={variant:"range",tickStep:10};const TwoHandlesPt=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                .formatOptions=${{style:"unit",unit:"pt"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                ></sp-slider-handle>
            </sp-slider>
        </div>
    `;TwoHandlesPt.args={variant:"range",tickStep:10};const ThreeHandlesPc=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                .formatOptions=${{style:"unit",unit:"pc"}}
                ...=${(0,lit_helpers.i)(args)}
            >
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    value="5"
                    label="Low"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    value="133"
                    label="Mid"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    value="250"
                    label="High"
                ></sp-slider-handle>
            </sp-slider>
        </div>
    `;ThreeHandlesPc.args={variant:"range"};const ThreeHandlesOrdered=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                step="1"
                min="0"
                max="255"
                @input=${handleHandleEvent(args)}
                @change=${handleHandleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            >
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="low"
                    label="Low"
                    value="5"
                    max="next"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="mid"
                    label="Mid"
                    value="100"
                    min="previous"
                    max="next"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="high"
                    label="High"
                    value="250"
                    min="previous"
                ></sp-slider-handle>
            </sp-slider>
        </div>
    `;ThreeHandlesOrdered.args={variant:"range",tickStep:10};const ThreeHandlesComplex=(args={})=>{const values={black:50,gray:4.98,white:225},handleEvent2=({onInput:onInput,onChange:onChange})=>event=>{const target=event.target;if(null!=target.value){if("object"==typeof target.value){const value=JSON.stringify(target.value,null,2);onInput&&"input"===event.type?onInput(value):onChange&&"change"===event.type&&onChange(value)}else{const value=`${target.name}: ${target.value}`;onInput&&"input"===event.type?onInput(value):onChange&&"change"===event.type&&onChange(value)}values[target.name]=target.value}},grayNormalization={toNormalized(value){const normalizedBlack=values.black/255,normalizedWhite=values.white/255;return Math.max(Math.min(value,1),0)*(normalizedWhite-normalizedBlack)+normalizedBlack},fromNormalized(value){const normalizedBlack=values.black/255,normalizedWhite=values.white/255;return(Math.max(Math.min(value,normalizedWhite),normalizedBlack)-normalizedBlack)/(normalizedWhite-normalizedBlack)}},blackNormalization={toNormalized(value){return Math.min(value,values.white)/255},fromNormalized(value){const denormalized=255*value;return Math.min(denormalized,values.white)}},whiteNormalization={toNormalized(value){return Math.max(value,values.black)/255},fromNormalized(value){const denormalized=255*value;return Math.max(denormalized,values.black)}};return index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                step="1"
                min="0"
                max="255"
                @input=${handleEvent2}
                @change=${handleEvent2}
                ...=${(0,lit_helpers.i)(args)}
            >
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="black"
                    label="Black"
                    value=${values.black}
                    .normalization=${blackNormalization}
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="gray"
                    label="Gray"
                    value="0.215"
                    min="0"
                    max="1"
                    step="0.005"
                    .normalization=${grayNormalization}
                    .getAriaHandleText=${value=>{let result=1;value>.5?result=Math.max(2*(1-value),.01):value<.5&&(result=((1-2*value)*(Math.sqrt(9.99)-1)+1)**2);return new Intl.NumberFormat(navigator.language,{maximumFractionDigits:2,minimumFractionDigits:2}).format(result)}}
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="white"
                    label="White"
                    value=${values.white}
                    .normalization=${whiteNormalization}
                ></sp-slider-handle>
            </sp-slider>
        </div>
    `};ThreeHandlesComplex.args={variant:"range",tickStep:10};const focusTabDemo=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${50}"
                step="${1}"
                min="${0}"
                max="${100}"
                label="Opacity"
                id="opacity-slider-opacity"
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${50}"
                step="${1}"
                min="${0}"
                max="${100}"
                label="Lightness"
                id="opacity-slider-lightness"
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${50}"
                step="${1}"
                min="${0}"
                max="${100}"
                label="Saturation"
                id="opacity-slider-saturation"
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
        </div>
    `,WithPopover=(args={})=>index_dev.qy`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                id="slider-with-popover"
                label="Slider without Popover"
                variant="filled"
                max="100"
                min="0"
                step="5"
                value="50"
                editable
                @input=${handleEvent(args)}
                @change=${handleEvent(args)}
                ...=${(0,lit_helpers.i)(args)}
            ></sp-slider>
            <overlay-trigger placement="top">
                <sp-slider
                    slot="trigger"
                    id="slider-with-popover"
                    label="Label in attribute"
                    variant="filled"
                    max="100"
                    min="0"
                    step="5"
                    value="50"
                    editable
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${(0,lit_helpers.i)(args)}
                ></sp-slider>
                <sp-popover slot="hover-content" tip>
                    Hover content for the slider
                </sp-popover>
            </overlay-trigger>

            <overlay-trigger placement="top">
                <sp-slider
                    slot="trigger"
                    id="slider-with-popover"
                    variant="filled"
                    max="100"
                    min="0"
                    step="5"
                    value="50"
                    editable
                    @input=${handleEvent(args)}
                    @change=${handleEvent(args)}
                    ...=${(0,lit_helpers.i)(args)}
                >
                    Label in slot
                </sp-slider>
                <sp-popover slot="hover-content" tip>
                    Hover content for the slider
                </sp-popover>
            </overlay-trigger>
        </div>
    `;WithPopover.args={variant:"filled"},WithPopover.parameters={docs:{description:{story:"A slider with a popover that appears on hover."}}};const __namedExportsOrder=["Default","Filled","HasADefaultValue","FillStart","FillStartWithValue","FillStartWithNegativeMinRange","autofocus","minimalDOM","noVisibleTextLabel","noVisibleValueLabel","noVisibleLabels","px","max20","editable","Multiple","editableWithDefaultValue","editableWithFractionValue","editableDisabled","editableCustom","editableWithoutVisibleLabels","hideStepper","Gradient","tick","tickLabels","Disabled","Quiet","inPopover","Indeterminate","ExplicitHandle","TwoHandles","TwoHandlesPt","ThreeHandlesPc","ThreeHandlesOrdered","ThreeHandlesComplex","focusTabDemo","WithPopover"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...Default.parameters?.docs?.source}}},Filled.parameters={...Filled.parameters,docs:{...Filled.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="1"\n                variant="filled"\n                min="0"\n                value=".7"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Slider Label\n            </sp-slider>\n        </div>\n    `;\n}',...Filled.parameters?.docs?.source}}},HasADefaultValue.parameters={...HasADefaultValue.parameters,docs:{...HasADefaultValue.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                default-value="0.2"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                double click or press escape key to reset\n            </sp-slider>\n        </div>\n    `;\n}',...HasADefaultValue.parameters?.docs?.source}}},FillStart.parameters={...FillStart.parameters,docs:{...FillStart.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="1"\n                fill-start\n                variant="filled"\n                min="0"\n                value=".7"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Slider label\n            </sp-slider>\n        </div>\n    `;\n}',...FillStart.parameters?.docs?.source}}},FillStartWithValue.parameters={...FillStartWithValue.parameters,docs:{...FillStartWithValue.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value=".7"\n                step="0.1"\n                fill-start="0.3"\n                variant="filled"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Value Greater than Fill Start\n            </sp-slider>\n        </div>\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="20"\n                min="0"\n                value="5"\n                step="1"\n                fill-start="15"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "number"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Value Less than Fill Start\n            </sp-slider>\n        </div>\n    `;\n}',...FillStartWithValue.parameters?.docs?.source}}},FillStartWithNegativeMinRange.parameters={...FillStartWithNegativeMinRange.parameters,docs:{...FillStartWithNegativeMinRange.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="150"\n                min="-50"\n                value="25"\n                step="1"\n                fill-start="0"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "number"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Fill start with "0" and within range -50 to 150\n            </sp-slider>\n        </div>\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                max="100"\n                min="-50"\n                value="-25"\n                step="1"\n                fill-start="0"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "number"\n  }}\n                .normalization=${{\n    toNormalized: value => {\n      if (value === 0) return 0.5;\n      return value < 0 ? 0.5 - value / -50 * 0.5 : 0.5 + value / 100 * 0.5;\n    },\n    fromNormalized: value => {\n      if (value === 0.5) return 0;\n      return value < 0.5 ? (1 - value / 0.5) * -50 : (value - 0.5) / 0.5 * 100;\n    }\n  }}\n                ...=${spreadProps(args)}\n            >\n                Fill start with "0" and normalization function within range -50\n                to 100\n            </sp-slider>\n        </div>\n    `;\n}',...FillStartWithNegativeMinRange.parameters?.docs?.source}}},autofocus.parameters={...autofocus.parameters,docs:{...autofocus.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin-inline: 20px;">\n            <sp-slider\n                autofocus\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...autofocus.parameters?.docs?.source}}},minimalDOM.parameters={...minimalDOM.parameters,docs:{...minimalDOM.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider>Opacity</sp-slider>\n        </div>\n    `;\n}',...minimalDOM.parameters?.docs?.source}}},noVisibleTextLabel.parameters={...noVisibleTextLabel.parameters,docs:{...noVisibleTextLabel.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...noVisibleTextLabel.parameters?.docs?.source}}},noVisibleValueLabel.parameters={...noVisibleValueLabel.parameters,docs:{...noVisibleValueLabel.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value="0"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...noVisibleValueLabel.parameters?.docs?.source}}},noVisibleLabels.parameters={...noVisibleLabels.parameters,docs:{...noVisibleLabels.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...noVisibleLabels.parameters?.docs?.source}}},px.parameters={...px.parameters,docs:{...px.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                max="360"\n                min="0"\n                value="90"\n                step="1"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "px"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Angle\n            </sp-slider>\n        </div>\n    `;\n}',...px.parameters?.docs?.source}}},max20.parameters={...max20.parameters,docs:{...max20.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 200px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                max="20"\n                min="0"\n                value="5"\n                step="1"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                ...=${spreadProps(args)}\n            >\n                Max 20\n            </sp-slider>\n        </div>\n    `;\n}',...max20.parameters?.docs?.source}}},editable.parameters={...editable.parameters,docs:{...editable.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                max="360"\n                min="0"\n                value="90"\n                step="1"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "degree",\n    unitDisplay: "narrow"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Angle\n            </sp-slider>\n        </div>\n    `;\n}',...editable.parameters?.docs?.source}}},Multiple.parameters={...Multiple.parameters,docs:{...Multiple.parameters?.docs,source:{originalSource:'args => {\n  const updateSliderConfig = (min, max, value, step) => {\n    const slider = document.querySelector("sp-slider");\n    if (slider) {\n      slider.value = value;\n      slider.min = min;\n      slider.max = max;\n      slider.step = step;\n    }\n  };\n  return html`\n        <overlay-trigger type="modal">\n            <sp-button slot="trigger" variant="secondary">\n                Toggle menu\n            </sp-button>\n            <sp-tray slot="click-content">\n                <div style="padding: 8px; width: 100%">\n                    <sp-slider\n                        label="Slider Label"\n                        min=${args.min}\n                        max=${args.max}\n                        value=${args.value}\n                        step=${args.step}\n                        variant="filled"\n                        hide-stepper\n                        editable\n                    ></sp-slider>\n                    <div\n                        style="display: grid; gap: 8px; padding: 8px; width: 50%; margin: auto;"\n                    >\n                        <sp-button\n                            size="s"\n                            @click=${() => updateSliderConfig(0.25, 4, 0.75, 0.01)}\n                        >\n                            Duration\n                        </sp-button>\n                        <sp-button\n                            size="s"\n                            @click=${() => updateSliderConfig(2, 100, 2, 1)}\n                        >\n                            Personality\n                        </sp-button>\n                        <sp-button\n                            size="s"\n                            @click=${() => updateSliderConfig(2, 25, 3, 1)}\n                        >\n                            Intensity\n                        </sp-button>\n                    </div>\n                </div>\n            </sp-tray>\n        </overlay-trigger>\n    `;\n}',...Multiple.parameters?.docs?.source}}},editableWithDefaultValue.parameters={...editableWithDefaultValue.parameters,docs:{...editableWithDefaultValue.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                max="360"\n                min="0"\n                value="90"\n                step="1"\n                default-value="180"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "degree",\n    unitDisplay: "narrow"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Angle\n            </sp-slider>\n        </div>\n    `;\n}',...editableWithDefaultValue.parameters?.docs?.source}}},editableWithFractionValue.parameters={...editableWithFractionValue.parameters,docs:{...editableWithFractionValue.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                max="255"\n                min="0.1"\n                value="0.5"\n                step="0.01"\n                default-value="18"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                ...=${spreadProps(args)}\n            >\n                Angle\n            </sp-slider>\n        </div>\n    `;\n}',...editableWithFractionValue.parameters?.docs?.source}}},editableDisabled.parameters={...editableDisabled.parameters,docs:{...editableDisabled.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                disabled\n                max="360"\n                min="0"\n                value="90"\n                step="1"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "degree",\n    unitDisplay: "narrow"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Angle\n            </sp-slider>\n        </div>\n    `;\n}',...editableDisabled.parameters?.docs?.source}}},editableCustom.parameters={...editableCustom.parameters,docs:{...editableCustom.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div\n            style="width: 500px; margin: 12px 20px; --mod-stepper-width: 150px;"\n        >\n            <sp-slider\n                editable\n                max="24"\n                min="0"\n                value="12.75"\n                step="0.25"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "hour"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Hours\n            </sp-slider>\n        </div>\n    `;\n}',...editableCustom.parameters?.docs?.source}}},editableWithoutVisibleLabels.parameters={...editableWithoutVisibleLabels.parameters,docs:{...editableWithoutVisibleLabels.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...editableWithoutVisibleLabels.parameters?.docs?.source}}},hideStepper.parameters={...hideStepper.parameters,docs:{...hideStepper.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                hide-stepper\n                max="1"\n                min="0"\n                value=".5"\n                step="0.01"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                .formatOptions=${{\n    style: "percent"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Opacity\n            </sp-slider>\n        </div>\n    `;\n}',...hideStepper.parameters?.docs?.source}}},Gradient.parameters={...Gradient.parameters,docs:{...Gradient.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <style>\n            sp-slider {\n                --mod-slider-track-color: linear-gradient(\n                    to right,\n                    red,\n                    green 100%\n                );\n            }\n            sp-slider[dir=\'rtl\'] {\n                --mod-slider-track-color: linear-gradient(\n                    to left,\n                    red,\n                    green 100%\n                );\n            }\n        </style>\n        <div\n            style="\n                width: 500px;\n                margin: 12px 20px;\n            "\n        >\n            <sp-slider\n                label="Opacity"\n                max="100"\n                min="0"\n                value="50"\n                id="opacity-slider"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n    `;\n}',...Gradient.parameters?.docs?.source}}},tick.parameters={...tick.parameters,docs:{...tick.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <sp-slider\n            label="Slider Label"\n            variant="tick"\n            min="0"\n            max="92"\n            ...=${spreadProps(args)}\n        ></sp-slider>\n        <sp-slider\n            label="Slider Label"\n            variant="tick"\n            min="0"\n            max="92"\n            ...=${spreadProps(args)}\n        ></sp-slider>\n    `;\n}',...tick.parameters?.docs?.source}}},tickLabels.parameters={...tickLabels.parameters,docs:{...tickLabels.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <sp-slider\n            label="Slider Label"\n            tick-labels\n            variant="tick"\n            min="50"\n            max="75"\n            ...=${spreadProps(args)}\n        ></sp-slider>\n        <sp-slider\n            label="Slider Label"\n            tick-labels\n            variant="tick"\n            min="50"\n            max="75"\n            ...=${spreadProps(args)}\n        ></sp-slider>\n    `;\n}',...tickLabels.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                disabled\n                value="5"\n                step="0.5"\n                min="0"\n                max="20"\n                label="Intensity"\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n    `;\n}',...Disabled.parameters?.docs?.source}}},Quiet.parameters={...Quiet.parameters,docs:{...Quiet.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                hide-stepper\n                quiet\n                value="5"\n                step="0.5"\n                min="0"\n                max="20"\n                label="Intensity"\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n    `;\n}',...Quiet.parameters?.docs?.source}}},inPopover.parameters={...inPopover.parameters,docs:{...inPopover.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <sp-popover open style="min-width: 0">\n            <sp-dialog no-divider>\n                <sp-slider\n                    editable\n                    hide-stepper\n                    quiet\n                    value="5"\n                    step="0.5"\n                    min="0"\n                    max="20"\n                    label="Intensity"\n                    ...=${spreadProps(args)}\n                ></sp-slider>\n            </sp-dialog>\n        </sp-popover>\n    `;\n}',...inPopover.parameters?.docs?.source}}},Indeterminate.parameters={...Indeterminate.parameters,docs:{...Indeterminate.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                editable\n                indeterminate\n                value="5"\n                step="0.5"\n                min="0"\n                max="20"\n                label="Intensity"\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n    `;\n}',...Indeterminate.parameters?.docs?.source}}},ExplicitHandle.parameters={...ExplicitHandle.parameters,docs:{...ExplicitHandle.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                step="0.5"\n                min="0"\n                max="20"\n                @input=${handleHandleEvent(args)}\n                @change=${handleHandleEvent(args)}\n                ...=${spreadProps(args)}\n            >\n                Intensity\n                <sp-slider-handle slot="handle" value="5"></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...ExplicitHandle.parameters?.docs?.source}}},TwoHandles.parameters={...TwoHandles.parameters,docs:{...TwoHandles.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                value="5"\n                step="1"\n                min="0"\n                max="255"\n                @input=${handleHandleEvent(args)}\n                @change=${handleHandleEvent(args)}\n                ...=${spreadProps(args)}\n            >\n                Output Levels\n                <sp-slider-handle\n                    slot="handle"\n                    name="min"\n                    label="Minimum"\n                    value="5"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="max"\n                    label="Maximum"\n                    value="250"\n                ></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...TwoHandles.parameters?.docs?.source}}},TwoHandlesPt.parameters={...TwoHandlesPt.parameters,docs:{...TwoHandlesPt.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                value="5"\n                step="1"\n                min="0"\n                max="255"\n                @input=${handleHandleEvent(args)}\n                @change=${handleHandleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "pt"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Output Levels\n                <sp-slider-handle\n                    slot="handle"\n                    name="min"\n                    label="Minimum"\n                    value="5"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="max"\n                    label="Maximum"\n                    value="250"\n                ></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...TwoHandlesPt.parameters?.docs?.source}}},ThreeHandlesPc.parameters={...ThreeHandlesPc.parameters,docs:{...ThreeHandlesPc.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                value="5"\n                step="1"\n                min="0"\n                max="255"\n                @input=${handleHandleEvent(args)}\n                @change=${handleHandleEvent(args)}\n                .formatOptions=${{\n    style: "unit",\n    unit: "pc"\n  }}\n                ...=${spreadProps(args)}\n            >\n                Output Levels\n                <sp-slider-handle\n                    slot="handle"\n                    value="5"\n                    label="Low"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    value="133"\n                    label="Mid"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    value="250"\n                    label="High"\n                ></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...ThreeHandlesPc.parameters?.docs?.source}}},ThreeHandlesOrdered.parameters={...ThreeHandlesOrdered.parameters,docs:{...ThreeHandlesOrdered.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                step="1"\n                min="0"\n                max="255"\n                @input=${handleHandleEvent(args)}\n                @change=${handleHandleEvent(args)}\n                ...=${spreadProps(args)}\n            >\n                Output Levels\n                <sp-slider-handle\n                    slot="handle"\n                    name="low"\n                    label="Low"\n                    value="5"\n                    max="next"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="mid"\n                    label="Mid"\n                    value="100"\n                    min="previous"\n                    max="next"\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="high"\n                    label="High"\n                    value="250"\n                    min="previous"\n                ></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...ThreeHandlesOrdered.parameters?.docs?.source}}},ThreeHandlesComplex.parameters={...ThreeHandlesComplex.parameters,docs:{...ThreeHandlesComplex.parameters?.docs,source:{originalSource:'(args = {}) => {\n  const values = {\n    black: 50,\n    gray: 4.98,\n    white: 225\n  };\n  const handleEvent2 = ({\n    onInput,\n    onChange\n  }) => event => {\n    const target = event.target;\n    if (target.value != null) {\n      if (typeof target.value === "object") {\n        const value = JSON.stringify(target.value, null, 2);\n        if (onInput && event.type === "input") {\n          onInput(value);\n        } else if (onChange && event.type === "change") {\n          onChange(value);\n        }\n      } else {\n        const value = `${target.name}: ${target.value}`;\n        if (onInput && event.type === "input") {\n          onInput(value);\n        } else if (onChange && event.type === "change") {\n          onChange(value);\n        }\n      }\n      values[target.name] = target.value;\n    }\n  };\n  const grayNormalization = {\n    toNormalized(value) {\n      const normalizedBlack = values.black / 255;\n      const normalizedWhite = values.white / 255;\n      const clamped = Math.max(Math.min(value, 1), 0);\n      return clamped * (normalizedWhite - normalizedBlack) + normalizedBlack;\n    },\n    fromNormalized(value) {\n      const normalizedBlack = values.black / 255;\n      const normalizedWhite = values.white / 255;\n      const clamped = Math.max(Math.min(value, normalizedWhite), normalizedBlack);\n      return (clamped - normalizedBlack) / (normalizedWhite - normalizedBlack);\n    }\n  };\n  const blackNormalization = {\n    toNormalized(value) {\n      const clamped = Math.min(value, values.white);\n      return clamped / 255;\n    },\n    fromNormalized(value) {\n      const denormalized = value * 255;\n      return Math.min(denormalized, values.white);\n    }\n  };\n  const whiteNormalization = {\n    toNormalized(value) {\n      const clamped = Math.max(value, values.black);\n      return clamped / 255;\n    },\n    fromNormalized(value) {\n      const denormalized = value * 255;\n      return Math.max(denormalized, values.black);\n    }\n  };\n  const computeGray = value => {\n    let result = 1;\n    if (value > 0.5) {\n      result = Math.max(2 * (1 - value), 0.01);\n    } else if (value < 0.5) {\n      result = ((1 - 2 * value) * (Math.sqrt(9.99) - 1) + 1) ** 2;\n    }\n    const formatOptions = {\n      maximumFractionDigits: 2,\n      minimumFractionDigits: 2\n    };\n    return new Intl.NumberFormat(navigator.language, formatOptions).format(result);\n  };\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                step="1"\n                min="0"\n                max="255"\n                @input=${handleEvent2}\n                @change=${handleEvent2}\n                ...=${spreadProps(args)}\n            >\n                Output Levels\n                <sp-slider-handle\n                    slot="handle"\n                    name="black"\n                    label="Black"\n                    value=${values.black}\n                    .normalization=${blackNormalization}\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="gray"\n                    label="Gray"\n                    value="0.215"\n                    min="0"\n                    max="1"\n                    step="0.005"\n                    .normalization=${grayNormalization}\n                    .getAriaHandleText=${computeGray}\n                ></sp-slider-handle>\n                <sp-slider-handle\n                    slot="handle"\n                    name="white"\n                    label="White"\n                    value=${values.white}\n                    .normalization=${whiteNormalization}\n                ></sp-slider-handle>\n            </sp-slider>\n        </div>\n    `;\n}',...ThreeHandlesComplex.parameters?.docs?.source}}},focusTabDemo.parameters={...focusTabDemo.parameters,docs:{...focusTabDemo.parameters?.docs,source:{originalSource:'(args = {}) => {\n  const value = 50;\n  const min = 0;\n  const max = 100;\n  const step = 1;\n  return html`\n        <div style="width: 500px; margin: 12px 20px 20px;">\n            <sp-slider\n                value="${value}"\n                step="${step}"\n                min="${min}"\n                max="${max}"\n                label="Opacity"\n                id="opacity-slider-opacity"\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n        <div style="width: 500px; margin: 20px;">\n            <sp-slider\n                value="${value}"\n                step="${step}"\n                min="${min}"\n                max="${max}"\n                label="Lightness"\n                id="opacity-slider-lightness"\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n        <div style="width: 500px; margin: 20px 20px 12px;">\n            <sp-slider\n                value="${value}"\n                step="${step}"\n                min="${min}"\n                max="${max}"\n                label="Saturation"\n                id="opacity-slider-saturation"\n                ...=${spreadProps(args)}\n            ></sp-slider>\n        </div>\n    `;\n}',...focusTabDemo.parameters?.docs?.source}}},WithPopover.parameters={...WithPopover.parameters,docs:{...WithPopover.parameters?.docs,source:{originalSource:'(args = {}) => {\n  return html`\n        <div style="width: 500px; margin: 12px 20px;">\n            <sp-slider\n                id="slider-with-popover"\n                label="Slider without Popover"\n                variant="filled"\n                max="100"\n                min="0"\n                step="5"\n                value="50"\n                editable\n                @input=${handleEvent(args)}\n                @change=${handleEvent(args)}\n                ...=${spreadProps(args)}\n            ></sp-slider>\n            <overlay-trigger placement="top">\n                <sp-slider\n                    slot="trigger"\n                    id="slider-with-popover"\n                    label="Label in attribute"\n                    variant="filled"\n                    max="100"\n                    min="0"\n                    step="5"\n                    value="50"\n                    editable\n                    @input=${handleEvent(args)}\n                    @change=${handleEvent(args)}\n                    ...=${spreadProps(args)}\n                ></sp-slider>\n                <sp-popover slot="hover-content" tip>\n                    Hover content for the slider\n                </sp-popover>\n            </overlay-trigger>\n\n            <overlay-trigger placement="top">\n                <sp-slider\n                    slot="trigger"\n                    id="slider-with-popover"\n                    variant="filled"\n                    max="100"\n                    min="0"\n                    step="5"\n                    value="50"\n                    editable\n                    @input=${handleEvent(args)}\n                    @change=${handleEvent(args)}\n                    ...=${spreadProps(args)}\n                >\n                    Label in slot\n                </sp-slider>\n                <sp-popover slot="hover-content" tip>\n                    Hover content for the slider\n                </sp-popover>\n            </overlay-trigger>\n        </div>\n    `;\n}',...WithPopover.parameters?.docs?.source}}}},"./packages/tray/sp-tray.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),first_focusable_in_dev=(__webpack_require__("./packages/underlay/sp-underlay.dev.js"),__webpack_require__("./tools/shared/src/first-focusable-in.dev.js")),MatchMedia_dev=__webpack_require__("./tools/reactive-controllers/src/MatchMedia.dev.js"),modal_css=__webpack_require__("./packages/modal/src/modal.css.js");var tray_css=index_dev.AH`
    :host{justify-content:center;inline-size:100%;display:flex;position:fixed;inset-block-end:0;inset-inline-start:0}.tray{--spectrum-tray-max-inline-size:var(--mod-tray-max-inline-size,375px);--spectrum-tray-spacing-edge-to-tray-safe-zone:var(--mod-tray-spacing-edge-to-tray-safe-zone,64px);--spectrum-tray-entry-animation-delay:var(--mod-tray-entry-animation-delay,.16s);--spectrum-tray-entry-animation-duration:var(--mod-tray-entry-animation-duration,var(--spectrum-animation-duration-500));--spectrum-tray-exit-animation-delay:var(--mod-tray-exit-animation-delay,0s);--spectrum-tray-exit-animation-duration:var(--mod-tray-exit-animation-duration,var(--spectrum-animation-duration-100));--spectrum-tray-corner-radius:var(--mod-tray-corner-radius,var(--spectrum-corner-radius-100));--spectrum-tray-background-color:var(--highcontrast-tray-background-color,var(--mod-tray-background-color,var(--spectrum-background-layer-2-color)));--mod-modal-max-width:100%;max-block-size:calc(100vh - 64px);inline-size:100%;max-inline-size:100%;max-block-size:calc(100vh - var(--spectrum-tray-spacing-edge-to-tray-safe-zone));box-sizing:border-box;border-radius:0;border-radius:var(--mod-tray-corner-radius-portrait,0)var(--mod-tray-corner-radius-portrait,0)0 0;transition:opacity var(--spectrum-tray-exit-animation-duration)cubic-bezier(.5,0,1,1)0s,visibility var(--spectrum-tray-exit-animation-duration)linear calc(var(--spectrum-tray-exit-animation-duration)),transform var(--spectrum-tray-exit-animation-duration)cubic-bezier(.5,0,1,1)0s;transition:opacity var(--spectrum-tray-exit-animation-duration)cubic-bezier(.5,0,1,1)var(--spectrum-tray-exit-animation-delay),visibility var(--spectrum-tray-exit-animation-duration)linear calc(var(--spectrum-tray-exit-animation-delay) + var(--spectrum-tray-exit-animation-duration)),transform var(--spectrum-tray-exit-animation-duration)cubic-bezier(.5,0,1,1)var(--spectrum-tray-exit-animation-delay);background-color:var(--spectrum-tray-background-color);outline:none;margin-block-start:var(--spectrum-tray-spacing-edge-to-tray-safe-zone);padding-block-start:var(--mod-tray-top-to-content-area,var(--spectrum-tray-top-to-content-area));padding-block-end:var(--mod-tray-bottom-to-content-area,var(--spectrum-tray-top-to-content-area));overflow:auto;transform:translateY(100%)}:host([open]) .tray{transition:transform var(--spectrum-tray-entry-animation-duration)cubic-bezier(0,0,.4,1)var(--spectrum-tray-entry-animation-delay),opacity var(--spectrum-tray-entry-animation-duration)cubic-bezier(0,0,.4,1)var(--spectrum-tray-entry-animation-delay);transform:translateY(0)}@media screen and (orientation:landscape){.tray{max-inline-size:var(--spectrum-tray-max-inline-size);border-start-start-radius:var(--spectrum-tray-corner-radius);border-start-end-radius:var(--spectrum-tray-corner-radius)}}@media (forced-colors:active){.tray{--highcontrast-tray-background-color:Canvas;border:solid}.tray ::slotted(*){border:none}}:host{align-items:flex-end;max-height:100dvh;position:fixed!important}sp-underlay{touch-action:none}.tray{overscroll-behavior:contain;display:inline-flex}.visually-hidden,::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Tray extends index_dev.wG{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new MatchMedia_dev._9(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.animating=!1,this.hasKeyboardDismissButton=!1,this.needsDismissHelper=!0}static get styles(){return[modal_css.A,tray_css]}focus(){const firstFocusable=(0,first_focusable_in_dev.I)(this);firstFocusable?firstFocusable.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}get dismissHelper(){return index_dev.qy`
            <div class="visually-hidden">
                <button aria-label="Dismiss" @click=${this.close}></button>
            </div>
        `}checkForDismissButtons(){if(!this.contentSlot)return void(this.needsDismissHelper=!0);const slottedElements=this.contentSlot.assignedElements({flatten:!0});if(0===slottedElements.length)return void(this.needsDismissHelper=!0);const hasDismissButton=slottedElements.some(element=>{if("SP-BUTTON"===element.tagName||"SP-CLOSE-BUTTON"===element.tagName||"BUTTON"===element.tagName)return!0;if("SP-DIALOG"===element.tagName&&element.hasAttribute("dismissable"))return!0;if("SP-DIALOG-WRAPPER"===element.tagName&&element.hasAttribute("dismissable"))return!0;return element.querySelectorAll("sp-button, sp-close-button, button").length>0});this.needsDismissHelper=!hasDismissButton}handleSlotChange(){this.checkForDismissButtons()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}firstUpdated(changes){super.firstUpdated(changes),this.checkForDismissButtons()}update(changes){changes.has("open")&&void 0!==changes.get("open")&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise(res=>{this.resolveTransitionPromise=()=>{this.animating=!1,res()}})),super.update(changes)}render(){return index_dev.qy`
            <sp-underlay
                ?open=${this.open}
                @close=${this.close}
                @transitionend=${this.handleUnderlayTransitionend}
            ></sp-underlay>
            <div
                class="tray modal"
                tabindex="-1"
                @transitionend=${this.handleTrayTransitionend}
            >
                ${!this.hasKeyboardDismissButton&&this.needsDismissHelper?this.dismissHelper:index_dev.s6}
                <slot @slotchange=${this.handleSlotChange}></slot>
                ${!this.hasKeyboardDismissButton&&this.needsDismissHelper?this.dismissHelper:index_dev.s6}
            </div>
        `}async getUpdateComplete(){const complete=await super.getUpdateComplete();return await this.transitionPromise,complete}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Tray.prototype,"open",2),__decorateClass([(0,decorators_dev.P)(".tray")],Tray.prototype,"tray",2),__decorateClass([(0,decorators_dev.P)("slot")],Tray.prototype,"contentSlot",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,attribute:"has-keyboard-dismiss"})],Tray.prototype,"hasKeyboardDismissButton",2),__decorateClass([(0,decorators_dev.wk)()],Tray.prototype,"needsDismissHelper",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-tray",Tray)},"./packages/underlay/sp-underlay.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var underlay_css=index_dev.AH`
    :host{--spectrum-underlay-background-exit-animation-duration:var(--mod-underlay-background-exit-animation-duration,var(--spectrum-animation-duration-300));--spectrum-underlay-background-exit-animation-ease:var(--mod-underlay-background-exit-animation-ease,var(--spectrum-animation-ease-in));--spectrum-underlay-background-exit-animation-delay:var(--mod-underlay-background-exit-animation-delay,var(--spectrum-animation-duration-200));--spectrum-underlay-background-entry-animation-duration:var(--mod-underlay-background-entry-animation-duration,var(--spectrum-animation-duration-600));--spectrum-underlay-background-entry-animation-ease:var(--mod-underlay-background-entry-animation-ease,var(--spectrum-animation-ease-out));--spectrum-underlay-background-entry-animation-delay:var(--mod-underlay-background-entry-animation-delay,var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0)));--spectrum-underlay-background-color:var(--mod-underlay-background-color,rgba(var(--spectrum-black-rgb),var(--spectrum-overlay-opacity)));pointer-events:none;visibility:hidden;opacity:0;background-color:var(--spectrum-underlay-background-color);z-index:1;transition:opacity var(--spectrum-underlay-background-exit-animation-duration)var(--spectrum-underlay-background-exit-animation-ease)var(--spectrum-underlay-background-exit-animation-delay),visibility 0s linear calc(var(--spectrum-underlay-background-exit-animation-delay) + var(--spectrum-underlay-background-exit-animation-duration));position:fixed;inset-block:0;inset-inline:0;overflow:hidden}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition:opacity var(--spectrum-underlay-background-entry-animation-duration)var(--spectrum-underlay-background-entry-animation-ease)var(--spectrum-underlay-background-entry-animation-delay);transition-delay:var(--spectrum-underlay-background-entry-animation-delay)}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor;class Underlay extends index_dev.wG{constructor(){super(...arguments),this.canClick=!1,this.open=!1}static get styles(){return[underlay_css]}click(){this.dispatchEvent(new Event("close"))}handlePointerdown(){this.canClick=!0}handlePointerup(){this.canClick&&this.click(),this.canClick=!1}render(){return index_dev.qy``}firstUpdated(){this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup)}}((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Underlay.prototype,"open",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-underlay",Underlay)},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=slider-stories-slider-stories.5ea801a7.iframe.bundle.js.map