"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[1082,5842,8701],{"./packages/dialog/sp-dialog-wrapper.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),DialogBase_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/underlay/sp-underlay.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/dialog/src/DialogBase.dev.js")),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class DialogWrapper extends DialogBase_dev.u{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.dismissLabel="Close",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){const hideDivider=this.noDivider||!this.headline||"none"===this.headlineVisibility;return this.headline||window.__swc.warn(this,`<${this.localName}> elements will not be accessible to screen readers without a "headline" attribute or property.`,"https://opensource.adobe.com/spectrum-web-components/components/dialog-wrapper/#accessibility",{type:"accessibility"}),index_dev.qy`
            <sp-dialog
                ?dismissable=${this.dismissable}
                dismiss-label=${this.dismissLabel}
                ?no-divider=${hideDivider}
                ?error=${this.error}
                mode=${(0,directives_dev.JR)(this.mode)}
                size=${(0,directives_dev.JR)(this.size)}
            >
                ${this.hero?index_dev.qy`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${(0,directives_dev.JR)(this.heroLabel?void 0:"true")}
                              alt=${(0,directives_dev.JR)(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:index_dev.s6}
                ${this.headline?index_dev.qy`
                          <h2
                              slot="heading"
                              ?hidden=${"none"===this.headlineVisibility}
                          >
                              ${this.headline}
                          </h2>
                      `:index_dev.s6}
                <slot></slot>
                ${this.footer?index_dev.qy`
                          <div slot="footer">${this.footer}</div>
                      `:index_dev.s6}
                ${this.cancelLabel?index_dev.qy`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:index_dev.s6}
                ${this.secondaryLabel?index_dev.qy`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:index_dev.s6}
                ${this.confirmLabel?index_dev.qy`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:index_dev.s6}
            </sp-dialog>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogWrapper.prototype,"error",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"cancel-label"})],DialogWrapper.prototype,"cancelLabel",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"confirm-label"})],DialogWrapper.prototype,"confirmLabel",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"dismiss-label"})],DialogWrapper.prototype,"dismissLabel",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"footer",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"hero",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"hero-label"})],DialogWrapper.prototype,"heroLabel",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"no-divider"})],DialogWrapper.prototype,"noDivider",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],DialogWrapper.prototype,"size",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"secondary-label"})],DialogWrapper.prototype,"secondaryLabel",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"headline",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"headline-visibility"})],DialogWrapper.prototype,"headlineVisibility",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog-wrapper",DialogWrapper)},"./packages/dialog/src/DialogBase.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:function(){return DialogBase}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/underlay/sp-underlay.dev.js"),__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js");var modal_wrapper_css=index_dev.AH`
    :host{box-sizing:border-box;inline-size:100vw;block-size:100vh;block-size:-webkit-fill-available;block-size:stretch;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-animation-duration-100));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}:host([responsive]){margin-block-start:0}}
`,modal_css=__webpack_require__("./packages/modal/src/modal.css.js"),src_index_dev=__webpack_require__("./tools/shared/src/index.dev.js"),first_focusable_in_dev=__webpack_require__("./tools/shared/src/first-focusable-in.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class DialogBase extends((0,src_index_dev.p6)(index_dev.wG)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[modal_wrapper_css,modal_css.A]}get dialog(){const dialog=this.shadowRoot.querySelector("slot").assignedElements()[0];return dialog||window.__swc.warn(this,`<${this.localName}> expects to be provided dialog content via its default slot.`,"https://opensource.adobe.com/spectrum-web-components/components/dialog-base/#dialog"),dialog||this}async focus(){if(this.shadowRoot){const firstFocusable=(0,first_focusable_in_dev.I)(this.dialog);firstFocusable?(firstFocusable.updateComplete&&await firstFocusable.updateComplete,firstFocusable.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(event){event.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(event){this.dispatchEvent(new TransitionEvent(event.type,{bubbles:!0,composed:!0,propertyName:event.propertyName}))}handleUnderlayTransitionend(event){this.open||"visibility"!==event.propertyName||this.resolveTransitionPromise(),this.handleTransitionEvent(event)}handleModalTransitionend(event){!this.open&&this.underlay||this.resolveTransitionPromise(),this.handleTransitionEvent(event)}get hasTransitionDuration(){const modal=this.shadowRoot.querySelector(".modal"),modalTransitionDurations=window.getComputedStyle(modal).transitionDuration;for(const duration of modalTransitionDurations.split(","))if(parseFloat(duration)>0)return!0;const underlay=this.shadowRoot.querySelector("sp-underlay");if(underlay){const underlayTransitionDurations=window.getComputedStyle(underlay).transitionDuration;for(const duration of underlayTransitionDurations.split(","))if(parseFloat(duration)>0)return!0}return!1}update(changes){if(changes.has("open")&&void 0!==changes.get("open")){const hasTransitionDuration=this.hasTransitionDuration;this.animating=!0,this.transitionPromise=new Promise((res=>{this.resolveTransitionPromise=()=>{this.animating=!1,!this.open&&hasTransitionDuration&&this.dispatchClosed(),res()}})),this.open||hasTransitionDuration||this.dispatchClosed()}super.update(changes)}renderDialog(){return index_dev.qy`
            <slot></slot>
        `}render(){return index_dev.qy`
            ${this.underlay?index_dev.qy`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:index_dev.s6}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(changes){changes.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const complete=await super.getUpdateComplete();return await this.transitionPromise,complete}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogBase.prototype,"dismissable",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogBase.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],DialogBase.prototype,"mode",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean})],DialogBase.prototype,"responsive",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean})],DialogBase.prototype,"underlay",2)},"./packages/modal/src/modal.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    :host{--spectrum-modal-confirm-entry-animation-duration:var(--mod-modal-confirm-entry-animation-duration,var(--spectrum-animation-duration-500));--spectrum-modal-confirm-entry-animation-delay:var(--mod-overlay-animation-duration-opened,var(--mod-modal-confirm-entry-animation-delay,var(--spectrum-animation-duration-200)));--spectrum-modal-confirm-exit-animation-duration:var(--mod-overlay-animation-duration,var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-animation-duration-100)));--spectrum-modal-confirm-exit-animation-delay:var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-animation-duration-0));--spectrum-modal-fullscreen-margin:var(--mod-modal-fullscreen-margin,32px)}.modal{visibility:hidden;opacity:0;transform:translateY(var(--mod-modal-confirm-entry-animation-distance,var(--spectrum-dialog-confirm-entry-animation-distance)));z-index:1;max-block-size:90vh;max-block-size:var(--mod-modal-max-height,90vh);max-inline-size:90%;max-inline-size:var(--mod-modal-max-width,90%);background:var(--mod-modal-background-color,var(--spectrum-modal-background-color));border-radius:var(--mod-modal-confirm-border-radius,var(--spectrum-corner-radius-100));pointer-events:auto;transition:opacity var(--spectrum-modal-confirm-exit-animation-duration)var(--spectrum-animation-ease-in)var(--spectrum-modal-confirm-exit-animation-delay),visibility var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration)),transform var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration));outline:none;overflow:hidden}:host([open]) .modal{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay),opacity var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay);transform:translateY(0)}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]) .modal{inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}}.fullscreen{max-inline-size:none;max-block-size:none;position:fixed;inset-block-start:var(--spectrum-modal-fullscreen-margin);inset-block-end:var(--spectrum-modal-fullscreen-margin);inset-inline-start:var(--spectrum-modal-fullscreen-margin);inset-inline-end:var(--spectrum-modal-fullscreen-margin)}.fullscreenTakeover{max-inline-size:none;max-block-size:none;box-sizing:border-box;border:none;border-radius:0;position:fixed;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-modal-background-color:var(--system-modal-background-color)}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(--swc-test-duration);--spectrum-modal-confirm-entry-animation-distance:var(--spectrum-dialog-confirm-entry-animation-distance);height:100dvh}.modal{overflow:visible}
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
                .type=${"modal"!==this.type?"auto":"modal"}
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
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/underlay/sp-underlay.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var underlay_css=index_dev.AH`
    :host{--spectrum-underlay-background-exit-animation-duration:var(--mod-underlay-background-exit-animation-duration,var(--spectrum-animation-duration-300));--spectrum-underlay-background-exit-animation-ease:var(--mod-underlay-background-exit-animation-ease,var(--spectrum-animation-ease-in));--spectrum-underlay-background-exit-animation-delay:var(--mod-underlay-background-exit-animation-delay,var(--spectrum-animation-duration-200));--spectrum-underlay-background-entry-animation-duration:var(--mod-underlay-background-entry-animation-duration,var(--spectrum-animation-duration-600));--spectrum-underlay-background-entry-animation-ease:var(--mod-underlay-background-entry-animation-ease,var(--spectrum-animation-ease-out));--spectrum-underlay-background-entry-animation-delay:var(--mod-underlay-background-entry-animation-delay,var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0)));--spectrum-underlay-background-color:var(--mod-underlay-background-color,rgba(var(--spectrum-black-rgb),var(--spectrum-overlay-opacity)));pointer-events:none;visibility:hidden;opacity:0;background-color:var(--spectrum-underlay-background-color);z-index:1;transition:opacity var(--spectrum-underlay-background-exit-animation-duration)var(--spectrum-underlay-background-exit-animation-ease)var(--spectrum-underlay-background-exit-animation-delay),visibility 0s linear calc(var(--spectrum-underlay-background-exit-animation-delay) + var(--spectrum-underlay-background-exit-animation-duration));position:fixed;inset-block:0;inset-inline:0;overflow:hidden}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition:opacity var(--spectrum-underlay-background-entry-animation-duration)var(--spectrum-underlay-background-entry-animation-ease)var(--spectrum-underlay-background-entry-animation-delay);transition-delay:var(--spectrum-underlay-background-entry-animation-delay)}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor;class Underlay extends index_dev.wG{constructor(){super(...arguments),this.canClick=!1,this.open=!1}static get styles(){return[underlay_css]}click(){this.dispatchEvent(new Event("close"))}handlePointerdown(){this.canClick=!0}handlePointerup(){this.canClick&&this.click(),this.canClick=!1}render(){return index_dev.qy``}firstUpdated(){this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup)}}((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Underlay.prototype,"open",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-underlay",Underlay)}}]);
//# sourceMappingURL=5842.4b88c72b.iframe.bundle.js.map