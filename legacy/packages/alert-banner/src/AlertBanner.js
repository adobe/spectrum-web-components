"use strict";var c=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var o=(a,r,e,s)=>{for(var t=s>1?void 0:s?d(r,e):r,n=a.length-1,l;n>=0;n--)(l=a[n])&&(t=(s?l(r,e,t):l(t))||t);return s&&t&&c(r,e,t),t};import{html as i,SpectrumElement as u}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/button/sp-close-button.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";import h from"./alert-banner.css.js";const v=["neutral","info","negative"];export class AlertBanner extends u{constructor(){super(...arguments);this.open=!1;this.dismissible=!1;this._variant=""}static get styles(){return[h]}set variant(e){if(e===this.variant)return;const s=this.variant;this.isValidVariant(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",s)}get variant(){return this._variant}isValidVariant(e){return v.includes(e)}renderIcon(e){switch(e){case"info":return i`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;case"negative":return i`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;default:return i``}}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close()}close(){this.open=!1}handleKeydown(e){e.code==="Escape"&&this.dismissible&&this.shouldClose()}render(){return i`
            <div class="body" role="alert">
                <div class="content">
                    ${this.renderIcon(this.variant)}
                    <div class="text"><slot></slot></div>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="end">
                ${this.dismissible?i`
                          <sp-close-button
                              @click=${this.shouldClose}
                              label="Close"
                              static-color="white"
                          ></sp-close-button>
                      `:i``}
            </div>
        `}updated(e){super.updated(e),e.has("open")&&(this.open?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown))}}o([p({type:Boolean,reflect:!0})],AlertBanner.prototype,"open",2),o([p({type:Boolean,reflect:!0})],AlertBanner.prototype,"dismissible",2),o([p({type:String})],AlertBanner.prototype,"variant",1);
//# sourceMappingURL=AlertBanner.js.map
