"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[1082,5287,5432,5448,8614,8701],{"./node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/async-directive.js")},"./node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/lit-html.js")},"./packages/button/sp-close-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/CloseButton.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-close-button",_src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__.J)},"./packages/dialog/sp-dialog.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),src_index_dev=(__webpack_require__("./packages/button-group/sp-button-group.dev.js"),__webpack_require__("./packages/button/sp-close-button.dev.js"),__webpack_require__("./packages/divider/sp-divider.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-alert.js"),__webpack_require__("./tools/shared/src/index.dev.js")),AlertDialog_dev=__webpack_require__("./packages/alert-dialog/src/AlertDialog.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js");var dialog_css=index_dev.AH`
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
        `}shouldUpdate(changes){return changes.has("mode")&&this.mode&&(this.dismissable=!1),changes.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(changes)}firstUpdated(changes){super.firstUpdated(changes),this.setAttribute("role","dialog")}updated(changes){super.updated(changes)}}__decorateClass([(0,decorators_dev.P)(".close-button")],Dialog.prototype,"closeButton",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Dialog.prototype,"error",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Dialog.prototype,"dismissable",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0,attribute:"dismiss-label"})],Dialog.prototype,"dismissLabel",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"no-divider"})],Dialog.prototype,"noDivider",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Dialog.prototype,"mode",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Dialog.prototype,"size",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog",Dialog)},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-copy.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Copy=__webpack_require__("./packages/icons-workflow/src/icons/Copy.js");class IconCopy extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:t=!1,title:c="Copy"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${c}"
  >
    <path
      d="m11.75,18h-7.5c-1.24023,0-2.25-1.00977-2.25-2.25v-7.5c0-1.24023,1.00977-2.25,2.25-2.25.41406,0,.75.33594.75.75s-.33594.75-.75.75c-.41309,0-.75.33691-.75.75v7.5c0,.41309.33691.75.75.75h7.5c.41309,0,.75-.33691.75-.75,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
      fill="currentColor"
    />
    <path
      d="m6.75,5c-.41406,0-.75-.33594-.75-.75,0-1.24023,1.00977-2.25,2.25-2.25.41406,0,.75.33594.75.75s-.33594.75-.75.75c-.41309,0-.75.33691-.75.75,0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m13,3.5h-2c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h2c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m13,14h-2c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h2c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m15.75,14c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c.41309,0,.75-.33691.75-.75,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
      fill="currentColor"
    />
    <path
      d="m17.25,5c-.41406,0-.75-.33594-.75-.75,0-.41309-.33691-.75-.75-.75-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c1.24023,0,2.25,1.00977,2.25,2.25,0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m17.25,9.75c-.41406,0-.75-.33594-.75-.75v-2c0-.41406.33594-.75.75-.75s.75.33594.75.75v2c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m6.75,9.75c-.41406,0-.75-.33594-.75-.75v-2c0-.41406.33594-.75.75-.75s.75.33594.75.75v2c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m8.25,14c-1.24023,0-2.25-1.00977-2.25-2.25,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,.41309.33691.75.75.75.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Copy.T)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-copy",IconCopy)},"./packages/icons-workflow/icons/sp-icon-delete.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Delete=__webpack_require__("./packages/icons-workflow/src/icons/Delete.js");class IconDelete extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:l=24,height:e=24,hidden:t=!1,title:r="Delete"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m8.24902,15.02148c-.40039,0-.7334-.31738-.74805-.7207l-.25-6.5c-.0166-.41406.30664-.7627.71973-.77832.01074-.00098.02051-.00098.03027-.00098.40039,0,.7334.31738.74805.7207l.25,6.5c.0166.41406-.30664.7627-.71973.77832-.01074.00098-.02051.00098-.03027.00098Z"
      fill="currentColor"
    />
    <path
      d="m11.75098,15.02148c-.00977,0-.01953,0-.03027-.00098-.41309-.01562-.73633-.36426-.71973-.77832l.25-6.5c.01465-.40332.34766-.7207.74805-.7207.00977,0,.01953,0,.03027.00098.41309.01562.73633.36426.71973.77832l-.25,6.5c-.01465.40332-.34766.7207-.74805.7207Z"
      fill="currentColor"
    />
    <path
      d="m17,4h-3.5v-.75c0-1.24023-1.00977-2.25-2.25-2.25h-2.5c-1.24023,0-2.25,1.00977-2.25,2.25v.75h-3.5c-.41406,0-.75.33594-.75.75s.33594.75.75.75h.52002l.42236,10.3418c.04785,1.20996,1.03613,2.1582,2.24805,2.1582h7.61914c1.21191,0,2.2002-.94824,2.24805-2.1582l.42236-10.3418h.52002c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-9-.75c0-.41309.33691-.75.75-.75h2.5c.41309,0,.75.33691.75.75v.75h-4v-.75Zm6.55957,12.53125c-.0166.40332-.3457.71875-.75.71875h-7.61914c-.4043,0-.7334-.31543-.75-.71875l-.41968-10.28125h9.9585l-.41968,10.28125Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Delete.d)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-delete",IconDelete)},"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m17.78076,1.75684c-1.27197-1.04102-3.22705-.89844-4.4502.32324L3.07764,12.33398c-.32031.31934-.55859.7168-.68896,1.15039l-1.38428,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33447.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58252-1.38379c.43359-.12988.83154-.36816,1.15088-.68848,0,0,10.16846-10.16797,10.35547-10.35547.64795-.64746.99316-1.54492.94775-2.45996-.0459-.91504-.48145-1.77539-1.19482-2.3584ZM2.84473,17.16309l.97998-3.24609c.02716-.09033.06714-.17578.11377-.25732l2.40869,2.40918c-.08154.04639-.16718.08643-.25781.11377l-3.24463.98047Zm14.12158-11.64746c-.15472.15552-7.09985,7.1001-9.52545,9.52588l-2.47461-2.4751L14.39111,3.14062c.38623-.38672.896-.58594,1.38965-.58594.38086,0,.75244.11914,1.05029.3623.3916.32129.62109.77246.646,1.27246.0249.49316-.16113.97656-.51074,1.32617Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Edit.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-edit",IconEdit)},"./packages/icons-workflow/src/icons/Copy.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{T:function(){return CopyIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const CopyIcon=({width:t=24,height:r=24,hidden:h=!1,title:e="Copy"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${r}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${h?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="18" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="14" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="10" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="6" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="28" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="24" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="20" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="16" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="6" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="10" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="14" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="18" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="16" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="20" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="24" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="28" y="22" />
    <path d="M10 12H3a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-7H11a1 1 0 0 1-1-1Z" />
  </svg>`},"./packages/icons-workflow/src/icons/Delete.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{d:function(){return DeleteIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DeleteIcon=({width:a=24,height:e=24,hidden:t=!1,title:l="Delete"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M31.5 6H24V4a2 2 0 0 0-2-2H12a2 2 0 0 0-2 2v2H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2l2.413 25.1a1 1 0 0 0 1 .9h18.179a1 1 0 0 0 1-.9L29.5 8h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM11.065 29A1 1 0 0 1 10 28.068l-1.071-16a1 1 0 1 1 2-.134l1.071 16A1 1 0 0 1 11.065 29ZM18 28a1 1 0 0 1-2 0V12a1 1 0 0 1 2 0Zm4-22H12V4h10Zm2 22.068a1 1 0 1 1-2-.134l1.071-16a1 1 0 1 1 2 .134Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Edit.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return EditIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const EditIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Edit"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
    />
  </svg>`},"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
    @media (forced-colors:active){:host{--highcontrast-link-text-color:LinkText}}:host([variant=secondary]) a{--mod-link-text-color:var(--mod-link-text-color-secondary-default,var(--spectrum-neutral-content-color-default));--mod-link-text-color-hover:var(--mod-link-text-color-secondary-hover,var(--spectrum-neutral-content-color-hover));--mod-link-text-color-active:var(--mod-link-text-color-secondary-active,var(--spectrum-neutral-content-color-down));--mod-link-text-color-focus:var(--mod-link-text-color-secondary-focus,var(--spectrum-neutral-content-color-key-focus))}a{background-color:initial;-webkit-text-decoration-skip:objects;text-decoration-skip:objects;transition:color var(--mod-link-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;cursor:pointer;color:var(--highcontrast-link-text-color,var(--mod-link-text-color,var(--mod-link-text-color-primary-default,var(--spectrum-accent-content-color-default))));outline:none;-webkit-text-decoration:underline;text-decoration:underline}a:active{--mod-link-text-color:var(--mod-link-text-color-active,var(--mod-link-text-color-primary-active,var(--spectrum-accent-content-color-down)))}:host([quiet]) a{-webkit-text-decoration:none;text-decoration:none}a:focus-visible,:host([quiet]) a:focus-visible{--mod-link-text-color:var(--mod-link-text-color-focus,var(--mod-link-text-color-primary-focus,var(--spectrum-accent-content-color-key-focus)));text-decoration:underline double;text-decoration-color:inherit}@media (hover:hover){a:hover{--mod-link-text-color:var(--mod-link-text-color-hover,var(--mod-link-text-color-primary-hover,var(--spectrum-accent-content-color-hover)))}:host([quiet]) a:hover{-webkit-text-decoration:underline;text-decoration:underline}}:host([static-color=white]) a{--mod-link-text-color:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-hover:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-active:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-focus:var(--mod-link-text-color-white,var(--spectrum-white))}:host([static-color=black]) a{--mod-link-text-color:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-hover:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-active:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-focus:var(--mod-link-text-color-black,var(--spectrum-black))}:host{display:inline}:host(:focus){outline:none}:host([href]) a:focus-visible{text-decoration:underline double}:host([disabled]){pointer-events:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./packages/overlay/overlay-trigger.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("overlay-trigger",_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__.N)},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
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
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/overlay/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Q:function(){return areIconsPresent},Z:function(){return isOverlayOpen}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");function nextFrame(){return new Promise(res=>requestAnimationFrame(()=>res()))}class IsOverlayOpen extends HTMLElement{constructor(){super(),this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("is-overlay-open",IsOverlayOpen);const isOverlayOpen=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;class AreIconsPresent extends HTMLElement{constructor(){super(),this.overlayTimeout=null,this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{this.overlayTimeout&&(clearTimeout(this.overlayTimeout),this.overlayTimeout=null);const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.checkIcons()},this.checkIcons=async()=>{const icons=[...document.querySelectorAll("sp-icon")],picker=document.querySelector("sp-picker");if(picker){const pickerIcon=picker.querySelector("sp-icon");pickerIcon&&icons.push(pickerIcon)}const iconLoadPromises=Array.from(icons).map(icon=>new Promise(resolve=>{var _a;if("updateComplete"in icon&&"function"==typeof(null==(_a=icon.updateComplete)?void 0:_a.then))return void icon.updateComplete.then(()=>{resolve()});const src=icon.getAttribute("src");if(!src){const imgElement2=icon.querySelector("img");return imgElement2?void(imgElement2.complete?resolve():(imgElement2.addEventListener("load",()=>{resolve()},{once:!0}),imgElement2.addEventListener("error",()=>{console.warn("Failed to load icon image"),resolve()},{once:!0}))):void resolve()}const imgElement=icon.querySelector("img");if(imgElement)return void(imgElement.complete?resolve():(imgElement.addEventListener("load",()=>{resolve()},{once:!0}),imgElement.addEventListener("error",()=>{console.warn(`Failed to load icon image: ${src}`),resolve()},{once:!0})));const img=new Image;img.onload=()=>resolve(),img.onerror=()=>{console.warn(`Failed to load icon: ${src}`),resolve()},img.src=src}));await Promise.all(iconLoadPromises),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("are-icons-present",AreIconsPresent);const areIconsPresent=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <are-icons-present></are-icons-present>
    `},"./packages/picker/stories/args.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{U:function(){return argTypes}});const argTypes={size:{name:"size",type:{name:"string",required:!1},description:"The size at which to display accordion items.",table:{defaultValue:{summary:"m"}},control:{labels:{s:"Small",m:"Medium",l:"Large",xl:"Extra large"},type:"select"},options:["s","m","l","xl"]},quiet:{name:"quiet",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},invalid:{name:"invalid",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}},"./packages/picker/stories/picker.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BackgroundClickTest:function(){return BackgroundClickTest},Default:function(){return Default},Open:function(){return Open},OpenShowingEdgeCase:function(){return OpenShowingEdgeCase},PickerInModalOverlay:function(){return PickerInModalOverlay},__namedExportsOrder:function(){return __namedExportsOrder},custom:function(){return custom},default:function(){return picker_stories},disabled:function(){return disabled},dynamicIcons:function(){return dynamicIcons},forcePopoverOnMobile:function(){return forcePopoverOnMobile},iconValue:function(){return iconValue},icons:function(){return icons},iconsNone:function(){return iconsNone},iconsOnly:function(){return iconsOnly},initialValue:function(){return initialValue},invalid:function(){return invalid},leftSideLabel:function(){return leftSideLabel},noVisibleLabel:function(){return noVisibleLabel},quiet:function(){return quiet},quietSideLabel:function(){return quietSideLabel},readonly:function(){return readonly},slottedLabel:function(){return slottedLabel},tooltip:function(){return tooltip}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),if_defined=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-copy.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-delete.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/link/sp-link.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/overlay/sp-overlay.dev.js"),__webpack_require__("./packages/picker/sp-picker.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./node_modules/lit-html/development/directives/if-defined.js")),lit_helpers=__webpack_require__("./test/lit-helpers.js"),stories=__webpack_require__("./packages/overlay/stories/index.js"),args=__webpack_require__("./packages/picker/stories/args.js");const states=[{id:"lb1-al",label:"Alabama"},{id:"lb1-ak",label:"Alaska"},{id:"lb1-as",label:"American Samoa"},{id:"lb1-az",label:"Arizona"},{id:"lb1-ar",label:"Arkansas"},{id:"lb1-ca",label:"California"},{id:"lb1-co",label:"Colorado"},{id:"lb1-ct",label:"Connecticut"},{id:"lb1-de",label:"Delaware"},{id:"lb1-dc",label:"District of Columbia"},{id:"lb1-fl",label:"Florida"},{id:"lb1-ga",label:"Georgia"},{id:"lb1-gm",label:"Guam"},{id:"lb1-hi",label:"Hawaii"},{id:"lb1-id",label:"Idaho"},{id:"lb1-il",label:"Illinois"},{id:"lb1-in",label:"Indiana"},{id:"lb1-ia",label:"Iowa"},{id:"lb1-ks",label:"Kansas"},{id:"lb1-ky",label:"Kentucky"},{id:"lb1-la",label:"Louisiana"},{id:"lb1-me",label:"Maine"},{id:"lb1-md",label:"Maryland"},{id:"lb1-ma",label:"Massachusetts"},{id:"lb1-mi",label:"Michigan"},{id:"lb1-mn",label:"Minnesota"},{id:"lb1-ms",label:"Mississippi"},{id:"lb1-mo",label:"Missouri"},{id:"lb1-mt",label:"Montana"},{id:"lb1-ne",label:"Nebraska"},{id:"lb1-nv",label:"Nevada"},{id:"lb1-nh",label:"New Hampshire"},{id:"lb1-nj",label:"New Jersey"},{id:"lb1-nm",label:"New Mexico"},{id:"lb1-ny",label:"New York"},{id:"lb1-nc",label:"North Carolina"},{id:"lb1-nd",label:"North Dakota"},{id:"lb1-mp",label:"Northern Marianas Islands"},{id:"lb1-oh",label:"Ohio"},{id:"lb1-ok",label:"Oklahoma"},{id:"lb1-or",label:"Oregon"},{id:"lb1-pa",label:"Pennsylvania"},{id:"lb1-pr",label:"Puerto Rico"},{id:"lb1-ri",label:"Rhode Island"},{id:"lb1-sc",label:"South Carolina"},{id:"lb1-sd",label:"South Dakota"},{id:"lb1-tn",label:"Tennessee"},{id:"lb1-tx",label:"Texas"},{id:"lb1-ut",label:"Utah"},{id:"lb1-ve",label:"Vermont"},{id:"lb1-va",label:"Virginia"},{id:"lb1-vi",label:"Virgin Islands"},{id:"lb1-wa",label:"Washington"},{id:"lb1-wv",label:"West Virginia"},{id:"lb1-wi",label:"Wisconsin"},{id:"lb1-wy",label:"Wyoming"}];var template=__webpack_require__("./packages/picker/stories/template.js"),picker_stories={title:"Picker",component:"sp-picker",args:{disabled:!1,invalid:!1,open:!1,quiet:!1,pending:!1},argTypes:{...args.U,onChange:{action:"change"},open:{name:"open",type:{name:"boolean",required:!1},description:"Whether the menu is open or not.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:"boolean"},pending:{name:"pending",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}};const Default=args=>index_dev.qy`
        <sp-field-label for="picker-1" size=${(0,if_defined.J)(args.size)}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${(0,template.Z)(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${(0,lit_helpers.i)(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `,forcePopoverOnMobile=args=>index_dev.qy`
        <div style="padding: 40px">
            <h1>Force Popover on Mobile</h1>
            <p>
                The force-popover attribute overrides the mobile device
                functionality of rendering a tray so that a popover will always
                render no matter the device.
            </p>
            <ol>
                <li>Open Chrome DevTools (or equivalent).</li>
                <li>Toggle the Device Toolbar (the phone/tablet icon).</li>
                <li>Select a device preset (e.g. iPhone 12).</li>
                <li>
                    Chrome will set user-agent strings, simulate touch, and
                    adjust DPI.
                </li>
                <li>Reload the page</li>
                <li>Click the Picker 1 and see a tray</li>
                <li>Click the Picker 2 and see a popover</li>
            </ol>
            <sp-field-label for="picker-1" size=${(0,if_defined.J)(args.size)}>
                Do you want to see a tray menu?
            </sp-field-label>
            <sp-picker
                id="picker-1"
                @change=${(0,template.Z)(args)}
                label="Select an option"
            >
                <sp-menu-item value="option-1">Yes</sp-menu-item>
                <sp-menu-item value="option-2">No</sp-menu-item>
            </sp-picker>
            <sp-field-label for="picker-2" size=${(0,if_defined.J)(args.size)}>
                Do you want to see a popover menu?
            </sp-field-label>
            <sp-picker
                id="picker-2"
                force-popover
                @change=${(0,template.Z)(args)}
                label="Select an option"
            >
                <sp-menu-item value="option-1">Yes</sp-menu-item>
                <sp-menu-item value="option-2">No</sp-menu-item>
            </sp-picker>
            <div>
                <p>
                    This button should't be clickable if a popover is open over
                    it.
                </p>
                <sp-button
                    @click=${()=>console.log("Whoops! I was clicked.")}
                >
                    Shouldn't be clickable
                </sp-button>
            </div>
        </div>
    `,disabled=args=>(0,template.B)(args);disabled.args={disabled:!0};const invalid=args=>(0,template.B)(args);invalid.args={invalid:!0};const tooltip=args=>{const{open:open,...rest}=args;return index_dev.qy`
        <sp-field-label for="picker-1" size=${(0,if_defined.J)(args.size)}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${(0,template.Z)(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${(0,lit_helpers.i)(rest)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
            <sp-tooltip
                slot="tooltip"
                ?open=${open}
                self-managed
                placement="right"
            >
                This Picker wants to know where you live.
            </sp-tooltip>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `};tooltip.args={open:!0},tooltip.decorators=[stories.Z];const leftSideLabel=args=>index_dev.qy`
        <sp-field-label
            side-aligned="start"
            for="picker-1"
            size=${(0,if_defined.J)(args.size)}
        >
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${(0,template.Z)(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${(0,lit_helpers.i)(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `,noVisibleLabel=args=>index_dev.qy`
        <sp-picker
            @change=${(0,template.Z)(args)}
            label="Where do you live?"
            ${(0,lit_helpers.i)(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `,slottedLabel=args=>index_dev.qy`
        <sp-picker @change=${(0,template.Z)(args)} ${(0,lit_helpers.i)(args)}>
            <span slot="label">Where do you live?</span>
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `,quiet=args=>index_dev.qy`
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an item"
        >
            <sp-menu-item value="1">Item 1</sp-menu-item>
            <sp-menu-item value="2">Item 2</sp-menu-item>
            <sp-menu-item value="3">Item 3</sp-menu-item>
            <sp-menu-item value="4">Item 4</sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;quiet.args={quiet:!0};const quietSideLabel=args=>index_dev.qy`
        <sp-field-label
            side-aligned="start"
            for="picker-quiet-sidelabel"
            size=${(0,if_defined.J)(args.size)}
        >
            Where do you live?
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet-sidelabel"
            @change=${(0,template.Z)(args)}
            label="Pick an item"
        >
            <sp-menu-item value="1">Item 1</sp-menu-item>
            <sp-menu-item value="2">Item 2</sp-menu-item>
            <sp-menu-item value="3">Item 3</sp-menu-item>
            <sp-menu-item value="4">Item 4</sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;quietSideLabel.args={quiet:!0};const icons=args=>index_dev.qy`
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an action"
            value="1"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `,iconsNone=args=>index_dev.qy`
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an action"
            value="1"
            icons="none"
        >
            <sp-menu-item value="1" selected active focused>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;iconsNone.args={open:!0},iconsNone.decorators=[stories.Z],iconsNone.swc_vrt={skip:!0};const iconValue=args=>index_dev.qy`
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an action"
            icons="only"
            value="2"
            style="--mod-picker-inline-size: 100px;"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `,iconsOnly=args=>index_dev.qy`
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an action"
            value="3"
            style="--mod-picker-inline-size: 100px;"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon" label="Delete"></sp-icon-delete>
            </sp-menu-item>
        </sp-picker>
    `;iconsOnly.args={open:!0},iconsOnly.decorators=[stories.Z],iconsOnly.swc_vrt={skip:!0};const dynamicIcons=args=>index_dev.qy`
        <p>
            The icon displayed in the picker should match the icon of the
            selected menu item, even when the icons are updated dynamically.
        </p>
        <sp-field-label for="picker-quiet" size=${(0,if_defined.J)(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${(0,lit_helpers.i)(args)}
            id="picker-quiet"
            @change=${(0,template.Z)(args)}
            label="Pick an action"
            value="2"
        >
            <sp-menu-item value="1">
                <sp-icon
                    slot="icon"
                    src="https://loremicon.com/rect/20/20/1/png"
                ></sp-icon>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon
                    slot="icon"
                    src="https://loremicon.com/rect/20/20/2/png"
                ></sp-icon>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon
                    slot="icon"
                    src="https://loremicon.com/rect/20/20/3/png"
                ></sp-icon>
                Delete
            </sp-menu-item>
        </sp-picker>
        <sp-button
            @click=${()=>{const icons2=document.querySelectorAll("sp-icon"),seed=Math.round(1e3*Math.random());icons2.forEach((icon,index)=>{icon.setAttribute("src",`https://loremicon.com/rect/20/20/${seed+index}/png`)});const picker=document.querySelector("sp-picker");picker&&(picker.open=!0)}}
        >
            Change icons
        </sp-button>
    `;dynamicIcons.args={open:!0},dynamicIcons.decorators=[stories.Q],dynamicIcons.swc_vrt={skip:!0};const Open=args=>index_dev.qy`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
        </style>
        <fieldset class="backdrop-filter-test">
            <sp-field-label for="picker-open" size=${(0,if_defined.J)(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-open"
                label="Open picker"
                ${(0,lit_helpers.i)(args)}
                @change=${(0,template.Z)(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long, in fact
                </span>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        </fieldset>
        <fieldset>
            <sp-field-label for="picker-closed" size=${(0,if_defined.J)(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-closed"
                label="Picker that displays below the options"
                @change=${(0,template.Z)(args)}
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu-item>Not so many options...</sp-menu-item>
            </sp-picker>
        </fieldset>
    `;Open.args={open:!0},Open.decorators=[stories.Z];const OpenShowingEdgeCase=args=>index_dev.qy`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
            /* Enforce CSS stacking to test "transition-behavior: allow-discrete" */
            /* Breaks the story in non-[popover] supporting browsers */
            fieldset:nth-of-type(2) {
                position: relative;
                z-index: 2;
            }
            .backdrop-filter-test {
                backdrop-filter: saturate(80%);
            }
        </style>
        <p>
            In browser that do not support
            <code>[popover]</code>
            , the following "open"
            <code>sp-picker</code>
            will display behind both the closed
            <code>sp-picker</code>
            as well as the
            <code>fieldset</code>
            that contains it.
        </p>
        <p>
            Learn more about this situation in our
            <sp-link
                href="https://opensource.adobe.com/spectrum-web-components/components/overlay/#fallback-support"
            >
                documentation site
            </sp-link>
            .
        </p>
        <fieldset class="backdrop-filter-test">
            <sp-field-label for="picker-open" size=${(0,if_defined.J)(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-open"
                label="Open picker"
                ${(0,lit_helpers.i)(args)}
                @change=${(0,template.Z)(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long, in fact
                </span>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        </fieldset>
        <fieldset>
            <sp-field-label for="picker-closed" size=${(0,if_defined.J)(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-closed"
                label="Picker that displays below the options"
                @change=${(0,template.Z)(args)}
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu-item>Not so many options...</sp-menu-item>
            </sp-picker>
        </fieldset>
    `;OpenShowingEdgeCase.args={open:!0},OpenShowingEdgeCase.decorators=[stories.Z],OpenShowingEdgeCase.swc_vrt={skip:!0},OpenShowingEdgeCase.parameters={chromatic:{disableSnapshot:!0}};const initialValue=args=>index_dev.qy`
        <sp-field-label for="picker-initial" size=${(0,if_defined.J)(args.size)}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-initial"
            @change=${(0,template.Z)(args)}
            value="item-2"
            ${(0,lit_helpers.i)(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `,readonly=args=>index_dev.qy`
        <sp-picker
            @change=${(0,template.Z)(args)}
            readonly
            value="item-2"
            ${(0,lit_helpers.i)(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `,custom=args=>index_dev.qy`
        <sp-field-label for="picker-state" size=${(0,if_defined.J)(args.size)}>
            What state do you live in?
        </sp-field-label>
        <sp-picker
            style="width: 400px;"
            @change=${(0,template.Z)(args)}
            id="picker-state"
            label="Pick a state"
            ${(0,lit_helpers.i)(args)}
            value=${"lb1-mo"}
        >
            ${states.map(state=>index_dev.qy`
                    <sp-menu-item
                        id=${state.id}
                        value=${state.id}
                        ?selected=${"lb1-mo"===state.id}
                    >
                        ${state.label}
                    </sp-menu-item>
                `)}
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;custom.args={open:!0},custom.decorators=[stories.Z];const BackgroundClickTest=()=>index_dev.qy`
        <div style="display: flex; flex-direction: column;">
            <sp-picker size="l">
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            </sp-picker>
            <div style="position: absolute; bottom: 50px;">
                <sp-button
                    @click=${()=>{alert("this button should not receive a click event on menu-item selection"),console.log("this button should not receive a click event on menu-item selection")}}
                    size="l"
                >
                    I shall not be clicked
                </sp-button>
            </div>
        </div>
    `;BackgroundClickTest.swc_vrt={skip:!0};const PickerInModalOverlay=()=>index_dev.qy`
        <div>
            <div>
                <h3>Picker in sp-overlay (non-modal)</h3>
                <sp-button id="trigger">Overlay Trigger</sp-button>
                <sp-overlay trigger="trigger@click" placement="bottom">
                    <sp-popover>
                        <sp-picker
                            label="What would you like to do?"
                            value="item-2"
                            id="picker-icons"
                            style="margin: 20px"
                        >
                            <sp-menu-item>Save</sp-menu-item>
                            <sp-menu-item>Finish</sp-menu-item>
                            <sp-menu-item>Review</sp-menu-item>
                        </sp-picker>
                    </sp-popover>
                </sp-overlay>
            </div>

            <div>
                <h3>
                    Picker in overlay-trigger (modal) - Test Escape key behavior
                </h3>
                <overlay-trigger
                    type="modal"
                    id="modal-trigger"
                    placement="top"
                >
                    <sp-button
                        variant="primary"
                        slot="trigger"
                        style="position:absolute;bottom:50px"
                    >
                        Button popover
                    </sp-button>
                    <sp-popover slot="click-content" tip>
                        <sp-dialog no-divider class="options-popover-content">
                            <sp-picker
                                label="Select a Country with a very long label, too long in fact"
                                value="item-2"
                                id="picker-value"
                            >
                                <sp-menu-item value="item-1">
                                    Deselect
                                </sp-menu-item>
                                <sp-menu-item value="item-2">
                                    Select inverse
                                </sp-menu-item>
                                <sp-menu-item value="item-3">
                                    Feather...
                                </sp-menu-item>
                                <sp-menu-item value="item-4">
                                    Select and mask...
                                </sp-menu-item>
                                <sp-menu-item value="item-5">
                                    Save selection
                                </sp-menu-item>
                                <sp-menu-item disabled value="item-6">
                                    Make work path
                                </sp-menu-item>
                            </sp-picker>
                        </sp-dialog>
                    </sp-popover>
                    <sp-tooltip slot="hover-content" placement="right">
                        I'm a tooltip in a different direction
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        </div>
    `;PickerInModalOverlay.swc_vrt={skip:!0};const __namedExportsOrder=["Default","forcePopoverOnMobile","disabled","invalid","tooltip","leftSideLabel","noVisibleLabel","slottedLabel","quiet","quietSideLabel","icons","iconsNone","iconValue","iconsOnly","dynamicIcons","Open","OpenShowingEdgeCase","initialValue","readonly","custom","BackgroundClickTest","PickerInModalOverlay"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-1" size=${ifDefined(args.size)}>\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            id="picker-1"\n            @change=${handleChange(args)}\n            label="Select a Country with a very long label, too long, in fact"\n            ${spreadProps(args)}\n        >\n            <sp-menu-item value="option-1">Deselect</sp-menu-item>\n            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="option-3">Feather...</sp-menu-item>\n            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="option-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="option-6">\n                Make Work Path\n            </sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...Default.parameters?.docs?.source}}},forcePopoverOnMobile.parameters={...forcePopoverOnMobile.parameters,docs:{...forcePopoverOnMobile.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div style="padding: 40px">\n            <h1>Force Popover on Mobile</h1>\n            <p>\n                The force-popover attribute overrides the mobile device\n                functionality of rendering a tray so that a popover will always\n                render no matter the device.\n            </p>\n            <ol>\n                <li>Open Chrome DevTools (or equivalent).</li>\n                <li>Toggle the Device Toolbar (the phone/tablet icon).</li>\n                <li>Select a device preset (e.g. iPhone 12).</li>\n                <li>\n                    Chrome will set user-agent strings, simulate touch, and\n                    adjust DPI.\n                </li>\n                <li>Reload the page</li>\n                <li>Click the Picker 1 and see a tray</li>\n                <li>Click the Picker 2 and see a popover</li>\n            </ol>\n            <sp-field-label for="picker-1" size=${ifDefined(args.size)}>\n                Do you want to see a tray menu?\n            </sp-field-label>\n            <sp-picker\n                id="picker-1"\n                @change=${handleChange(args)}\n                label="Select an option"\n            >\n                <sp-menu-item value="option-1">Yes</sp-menu-item>\n                <sp-menu-item value="option-2">No</sp-menu-item>\n            </sp-picker>\n            <sp-field-label for="picker-2" size=${ifDefined(args.size)}>\n                Do you want to see a popover menu?\n            </sp-field-label>\n            <sp-picker\n                id="picker-2"\n                force-popover\n                @change=${handleChange(args)}\n                label="Select an option"\n            >\n                <sp-menu-item value="option-1">Yes</sp-menu-item>\n                <sp-menu-item value="option-2">No</sp-menu-item>\n            </sp-picker>\n            <div>\n                <p>\n                    This button should\'t be clickable if a popover is open over\n                    it.\n                </p>\n                <sp-button\n                    @click=${() => console.log("Whoops! I was clicked.")}\n                >\n                    Shouldn\'t be clickable\n                </sp-button>\n            </div>\n        </div>\n    `;\n}',...forcePopoverOnMobile.parameters?.docs?.source}}},disabled.parameters={...disabled.parameters,docs:{...disabled.parameters?.docs,source:{originalSource:"args => Template(args)",...disabled.parameters?.docs?.source}}},invalid.parameters={...invalid.parameters,docs:{...invalid.parameters?.docs,source:{originalSource:"args => Template(args)",...invalid.parameters?.docs?.source}}},tooltip.parameters={...tooltip.parameters,docs:{...tooltip.parameters?.docs,source:{originalSource:'args => {\n  const {\n    open,\n    ...rest\n  } = args;\n  return html`\n        <sp-field-label for="picker-1" size=${ifDefined(args.size)}>\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            id="picker-1"\n            @change=${handleChange(args)}\n            label="Select a Country with a very long label, too long, in fact"\n            ${spreadProps(rest)}\n        >\n            <sp-menu-item value="option-1">Deselect</sp-menu-item>\n            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="option-3">Feather...</sp-menu-item>\n            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="option-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="option-6">\n                Make Work Path\n            </sp-menu-item>\n            <sp-tooltip\n                slot="tooltip"\n                ?open=${open}\n                self-managed\n                placement="right"\n            >\n                This Picker wants to know where you live.\n            </sp-tooltip>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...tooltip.parameters?.docs?.source}}},leftSideLabel.parameters={...leftSideLabel.parameters,docs:{...leftSideLabel.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label\n            side-aligned="start"\n            for="picker-1"\n            size=${ifDefined(args.size)}\n        >\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            id="picker-1"\n            @change=${handleChange(args)}\n            label="Select a Country with a very long label, too long, in fact"\n            ${spreadProps(args)}\n        >\n            <sp-menu-item value="option-1">Deselect</sp-menu-item>\n            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="option-3">Feather...</sp-menu-item>\n            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="option-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="option-6">\n                Make Work Path\n            </sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...leftSideLabel.parameters?.docs?.source}}},noVisibleLabel.parameters={...noVisibleLabel.parameters,docs:{...noVisibleLabel.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-picker\n            @change=${handleChange(args)}\n            label="Where do you live?"\n            ${spreadProps(args)}\n        >\n            <sp-menu-item value="option-1">Deselect</sp-menu-item>\n            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="option-3">Feather...</sp-menu-item>\n            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="option-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="option-6">\n                Make Work Path\n            </sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...noVisibleLabel.parameters?.docs?.source}}},slottedLabel.parameters={...slottedLabel.parameters,docs:{...slottedLabel.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-picker @change=${handleChange(args)} ${spreadProps(args)}>\n            <span slot="label">Where do you live?</span>\n            <sp-menu-item value="option-1">Deselect</sp-menu-item>\n            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="option-3">Feather...</sp-menu-item>\n            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="option-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="option-6">\n                Make Work Path\n            </sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...slottedLabel.parameters?.docs?.source}}},quiet.parameters={...quiet.parameters,docs:{...quiet.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an item"\n        >\n            <sp-menu-item value="1">Item 1</sp-menu-item>\n            <sp-menu-item value="2">Item 2</sp-menu-item>\n            <sp-menu-item value="3">Item 3</sp-menu-item>\n            <sp-menu-item value="4">Item 4</sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...quiet.parameters?.docs?.source}}},quietSideLabel.parameters={...quietSideLabel.parameters,docs:{...quietSideLabel.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label\n            side-aligned="start"\n            for="picker-quiet-sidelabel"\n            size=${ifDefined(args.size)}\n        >\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet-sidelabel"\n            @change=${handleChange(args)}\n            label="Pick an item"\n        >\n            <sp-menu-item value="1">Item 1</sp-menu-item>\n            <sp-menu-item value="2">Item 2</sp-menu-item>\n            <sp-menu-item value="3">Item 3</sp-menu-item>\n            <sp-menu-item value="4">Item 4</sp-menu-item>\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...quietSideLabel.parameters?.docs?.source}}},icons.parameters={...icons.parameters,docs:{...icons.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Choose an action type...\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an action"\n            value="1"\n        >\n            <sp-menu-item value="1">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n                Edit\n            </sp-menu-item>\n            <sp-menu-item value="2">\n                <sp-icon-copy slot="icon"></sp-icon-copy>\n                Copy\n            </sp-menu-item>\n            <sp-menu-item value="3">\n                <sp-icon-delete slot="icon"></sp-icon-delete>\n                Delete\n            </sp-menu-item>\n        </sp-picker>\n    `;\n}',...icons.parameters?.docs?.source}}},iconsNone.parameters={...iconsNone.parameters,docs:{...iconsNone.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Choose an action type...\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an action"\n            value="1"\n            icons="none"\n        >\n            <sp-menu-item value="1" selected active focused>\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n                Edit\n            </sp-menu-item>\n            <sp-menu-item value="2">\n                <sp-icon-copy slot="icon"></sp-icon-copy>\n                Copy\n            </sp-menu-item>\n            <sp-menu-item value="3">\n                <sp-icon-delete slot="icon"></sp-icon-delete>\n                Delete\n            </sp-menu-item>\n        </sp-picker>\n    `;\n}',...iconsNone.parameters?.docs?.source}}},iconValue.parameters={...iconValue.parameters,docs:{...iconValue.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Choose an action type...\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an action"\n            icons="only"\n            value="2"\n            style="--mod-picker-inline-size: 100px;"\n        >\n            <sp-menu-item value="1">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n                Edit\n            </sp-menu-item>\n            <sp-menu-item value="2">\n                <sp-icon-copy slot="icon"></sp-icon-copy>\n                Copy\n            </sp-menu-item>\n            <sp-menu-item value="3">\n                <sp-icon-delete slot="icon"></sp-icon-delete>\n                Delete\n            </sp-menu-item>\n        </sp-picker>\n    `;\n}',...iconValue.parameters?.docs?.source}}},iconsOnly.parameters={...iconsOnly.parameters,docs:{...iconsOnly.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Choose an action type...\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an action"\n            value="3"\n            style="--mod-picker-inline-size: 100px;"\n        >\n            <sp-menu-item value="1">\n                <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>\n            </sp-menu-item>\n            <sp-menu-item value="2">\n                <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>\n            </sp-menu-item>\n            <sp-menu-item value="3">\n                <sp-icon-delete slot="icon" label="Delete"></sp-icon-delete>\n            </sp-menu-item>\n        </sp-picker>\n    `;\n}',...iconsOnly.parameters?.docs?.source}}},dynamicIcons.parameters={...dynamicIcons.parameters,docs:{...dynamicIcons.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <p>\n            The icon displayed in the picker should match the icon of the\n            selected menu item, even when the icons are updated dynamically.\n        </p>\n        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>\n            Choose an action type...\n        </sp-field-label>\n        <sp-picker\n            ${spreadProps(args)}\n            id="picker-quiet"\n            @change=${handleChange(args)}\n            label="Pick an action"\n            value="2"\n        >\n            <sp-menu-item value="1">\n                <sp-icon\n                    slot="icon"\n                    src="https://loremicon.com/rect/20/20/1/png"\n                ></sp-icon>\n                Edit\n            </sp-menu-item>\n            <sp-menu-item value="2">\n                <sp-icon\n                    slot="icon"\n                    src="https://loremicon.com/rect/20/20/2/png"\n                ></sp-icon>\n                Copy\n            </sp-menu-item>\n            <sp-menu-item value="3">\n                <sp-icon\n                    slot="icon"\n                    src="https://loremicon.com/rect/20/20/3/png"\n                ></sp-icon>\n                Delete\n            </sp-menu-item>\n        </sp-picker>\n        <sp-button\n            @click=${() => {\n    const icons2 = document.querySelectorAll("sp-icon");\n    const seed = Math.round(Math.random() * 1e3);\n    icons2.forEach((icon, index) => {\n      icon.setAttribute("src", `https://loremicon.com/rect/20/20/${seed + index}/png`);\n    });\n    const picker = document.querySelector("sp-picker");\n    if (picker) picker.open = true;\n  }}\n        >\n            Change icons\n        </sp-button>\n    `;\n}',...dynamicIcons.parameters?.docs?.source}}},Open.parameters={...Open.parameters,docs:{...Open.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <style>\n            fieldset {\n                float: left;\n                clear: left;\n                margin-bottom: 15px;\n            }\n        </style>\n        <fieldset class="backdrop-filter-test">\n            <sp-field-label for="picker-open" size=${ifDefined(args.size)}>\n                Where do you live?\n            </sp-field-label>\n            <sp-picker\n                id="picker-open"\n                label="Open picker"\n                ${spreadProps(args)}\n                @change=${handleChange(args)}\n            >\n                <span slot="label">\n                    Select a Country with a very long label, too long, in fact\n                </span>\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-picker>\n        </fieldset>\n        <fieldset>\n            <sp-field-label for="picker-closed" size=${ifDefined(args.size)}>\n                Where do you live?\n            </sp-field-label>\n            <sp-picker\n                id="picker-closed"\n                label="Picker that displays below the options"\n                @change=${handleChange(args)}\n            >\n                <span slot="label">\n                    Other menu that goes behind the open one\n                </span>\n                <sp-menu-item>Not so many options...</sp-menu-item>\n            </sp-picker>\n        </fieldset>\n    `;\n}',...Open.parameters?.docs?.source}}},OpenShowingEdgeCase.parameters={...OpenShowingEdgeCase.parameters,docs:{...OpenShowingEdgeCase.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <style>\n            fieldset {\n                float: left;\n                clear: left;\n                margin-bottom: 15px;\n            }\n            /* Enforce CSS stacking to test "transition-behavior: allow-discrete" */\n            /* Breaks the story in non-[popover] supporting browsers */\n            fieldset:nth-of-type(2) {\n                position: relative;\n                z-index: 2;\n            }\n            .backdrop-filter-test {\n                backdrop-filter: saturate(80%);\n            }\n        </style>\n        <p>\n            In browser that do not support\n            <code>[popover]</code>\n            , the following "open"\n            <code>sp-picker</code>\n            will display behind both the closed\n            <code>sp-picker</code>\n            as well as the\n            <code>fieldset</code>\n            that contains it.\n        </p>\n        <p>\n            Learn more about this situation in our\n            <sp-link\n                href="https://opensource.adobe.com/spectrum-web-components/components/overlay/#fallback-support"\n            >\n                documentation site\n            </sp-link>\n            .\n        </p>\n        <fieldset class="backdrop-filter-test">\n            <sp-field-label for="picker-open" size=${ifDefined(args.size)}>\n                Where do you live?\n            </sp-field-label>\n            <sp-picker\n                id="picker-open"\n                label="Open picker"\n                ${spreadProps(args)}\n                @change=${handleChange(args)}\n            >\n                <span slot="label">\n                    Select a Country with a very long label, too long, in fact\n                </span>\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-picker>\n        </fieldset>\n        <fieldset>\n            <sp-field-label for="picker-closed" size=${ifDefined(args.size)}>\n                Where do you live?\n            </sp-field-label>\n            <sp-picker\n                id="picker-closed"\n                label="Picker that displays below the options"\n                @change=${handleChange(args)}\n            >\n                <span slot="label">\n                    Other menu that goes behind the open one\n                </span>\n                <sp-menu-item>Not so many options...</sp-menu-item>\n            </sp-picker>\n        </fieldset>\n    `;\n}',...OpenShowingEdgeCase.parameters?.docs?.source}}},initialValue.parameters={...initialValue.parameters,docs:{...initialValue.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-field-label for="picker-initial" size=${ifDefined(args.size)}>\n            Where do you live?\n        </sp-field-label>\n        <sp-picker\n            id="picker-initial"\n            @change=${handleChange(args)}\n            value="item-2"\n            ${spreadProps(args)}\n        >\n            <span slot="label">\n                Select a Country with a very long label, too long in fact\n            </span>\n            <sp-menu-item value="item-1">Deselect</sp-menu-item>\n            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="item-3">Feather...</sp-menu-item>\n            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="item-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>\n        </sp-picker>\n    `;\n}',...initialValue.parameters?.docs?.source}}},readonly.parameters={...readonly.parameters,docs:{...readonly.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-picker\n            @change=${handleChange(args)}\n            readonly\n            value="item-2"\n            ${spreadProps(args)}\n        >\n            <span slot="label">\n                Select a Country with a very long label, too long in fact\n            </span>\n            <sp-menu-item value="item-1">Deselect</sp-menu-item>\n            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="item-3">Feather...</sp-menu-item>\n            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>\n            <sp-menu-item value="item-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>\n        </sp-picker>\n    `;\n}',...readonly.parameters?.docs?.source}}},custom.parameters={...custom.parameters,docs:{...custom.parameters?.docs,source:{originalSource:'args => {\n  const initialState = "lb1-mo";\n  return html`\n        <sp-field-label for="picker-state" size=${ifDefined(args.size)}>\n            What state do you live in?\n        </sp-field-label>\n        <sp-picker\n            style="width: 400px;"\n            @change=${handleChange(args)}\n            id="picker-state"\n            label="Pick a state"\n            ${spreadProps(args)}\n            value=${initialState}\n        >\n            ${states.map(state => html`\n                    <sp-menu-item\n                        id=${state.id}\n                        value=${state.id}\n                        ?selected=${state.id === initialState}\n                    >\n                        ${state.label}\n                    </sp-menu-item>\n                `)}\n        </sp-picker>\n        <p>This is some text.</p>\n        <p>This is some text.</p>\n        <p>\n            This is a\n            <a href="#anchor">link</a>\n            .\n        </p>\n    `;\n}',...custom.parameters?.docs?.source}}},BackgroundClickTest.parameters={...BackgroundClickTest.parameters,docs:{...BackgroundClickTest.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div style="display: flex; flex-direction: column;">\n            <sp-picker size="l">\n                <sp-menu-item value="option-1">Deselect</sp-menu-item>\n                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>\n            </sp-picker>\n            <div style="position: absolute; bottom: 50px;">\n                <sp-button\n                    @click=${() => {\n    alert("this button should not receive a click event on menu-item selection");\n    console.log("this button should not receive a click event on menu-item selection");\n  }}\n                    size="l"\n                >\n                    I shall not be clicked\n                </sp-button>\n            </div>\n        </div>\n    `;\n}',...BackgroundClickTest.parameters?.docs?.source}}},PickerInModalOverlay.parameters={...PickerInModalOverlay.parameters,docs:{...PickerInModalOverlay.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div>\n            <div>\n                <h3>Picker in sp-overlay (non-modal)</h3>\n                <sp-button id="trigger">Overlay Trigger</sp-button>\n                <sp-overlay trigger="trigger@click" placement="bottom">\n                    <sp-popover>\n                        <sp-picker\n                            label="What would you like to do?"\n                            value="item-2"\n                            id="picker-icons"\n                            style="margin: 20px"\n                        >\n                            <sp-menu-item>Save</sp-menu-item>\n                            <sp-menu-item>Finish</sp-menu-item>\n                            <sp-menu-item>Review</sp-menu-item>\n                        </sp-picker>\n                    </sp-popover>\n                </sp-overlay>\n            </div>\n\n            <div>\n                <h3>\n                    Picker in overlay-trigger (modal) - Test Escape key behavior\n                </h3>\n                <overlay-trigger\n                    type="modal"\n                    id="modal-trigger"\n                    placement="top"\n                >\n                    <sp-button\n                        variant="primary"\n                        slot="trigger"\n                        style="position:absolute;bottom:50px"\n                    >\n                        Button popover\n                    </sp-button>\n                    <sp-popover slot="click-content" tip>\n                        <sp-dialog no-divider class="options-popover-content">\n                            <sp-picker\n                                label="Select a Country with a very long label, too long in fact"\n                                value="item-2"\n                                id="picker-value"\n                            >\n                                <sp-menu-item value="item-1">\n                                    Deselect\n                                </sp-menu-item>\n                                <sp-menu-item value="item-2">\n                                    Select inverse\n                                </sp-menu-item>\n                                <sp-menu-item value="item-3">\n                                    Feather...\n                                </sp-menu-item>\n                                <sp-menu-item value="item-4">\n                                    Select and mask...\n                                </sp-menu-item>\n                                <sp-menu-item value="item-5">\n                                    Save selection\n                                </sp-menu-item>\n                                <sp-menu-item disabled value="item-6">\n                                    Make work path\n                                </sp-menu-item>\n                            </sp-picker>\n                        </sp-dialog>\n                    </sp-popover>\n                    <sp-tooltip slot="hover-content" placement="right">\n                        I\'m a tooltip in a different direction\n                    </sp-tooltip>\n                </overlay-trigger>\n            </div>\n        </div>\n    `;\n}',...PickerInModalOverlay.parameters?.docs?.source}}}},"./packages/picker/stories/template.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{B:function(){return Template},Z:function(){return handleChange}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/picker/sp-picker.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./test/lit-helpers.js")),lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/lit-html/development/directives/if-defined.js");const handleChange=({onChange:onChange})=>event=>{const picker=event.target;onChange&&onChange(picker.value)},Template=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <sp-field-label for="picker-1" size=${(0,lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_5__.J)(args.size)}>
        Where do you live?
    </sp-field-label>
    <sp-picker
        id="picker-1"
        @change=${handleChange(args)}
        label="Choose your neighborhood"
        ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_4__.i)(args)}
    >
        <sp-menu-item value="option-1">Carol Gardens</sp-menu-item>
        <sp-menu-item value="option-2">Cobble Hill</sp-menu-item>
        <sp-menu-item value="option-3">Ft. Greene</sp-menu-item>
        <sp-menu-item value="option-4">Park Slope</sp-menu-item>
        <sp-menu-item disabled value="option-5">Prospect Park</sp-menu-item>
        <sp-menu-item value="option-6">Red Hook</sp-menu-item>
    </sp-picker>
`},"./packages/popover/sp-popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/popover/src/Popover.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-popover",_src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__.A)},"./packages/popover/src/Popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return Popover}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var popover_css=index_dev.AH`
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
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Popover.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),__decorateClass([(0,decorators_dev.P)("#tip")],Popover.prototype,"tipElement",2)},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=picker-stories-picker-stories.3c4cd0f7.iframe.bundle.js.map