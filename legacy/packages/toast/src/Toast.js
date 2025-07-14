"use strict";var c=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(u,n,t,e)=>{for(var o=e>1?void 0:e?p(n,t):n,s=u.length-1,l;s>=0;s--)(l=u[s])&&(o=(e?l(n,t,o):l(o))||o);return e&&o&&c(n,t,o),o};import{html as i,SpectrumElement as d}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/button/sp-close-button.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";import{FocusVisiblePolyfillMixin as h}from"@spectrum-web-components/shared/src/focus-visible.js";import m from"./toast.css.js";export const toastVariants=["negative","positive","info","error","warning"];export class Toast extends h(d){constructor(){super(...arguments);this.open=!1;this._timeout=null;this._variant="";this.countdownStart=0;this.nextCount=-1;this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.shouldClose(),this.countdownStart=0):this.countdown()};this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown)};this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown)};this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown()}}static get styles(){return[m]}set timeout(t){const o=typeof t!==null&&t>0?Math.max(6e3,t):null,s=this.timeout;o&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=o,this.requestUpdate("timeout",s)}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const e=this.variant;toastVariants.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e)}get variant(){return this._variant}renderIcon(t,e){switch(t){case"info":return i`
                    <sp-icon-info
                        label=${e||"Information"}
                        class="type"
                    ></sp-icon-info>
                `;case"negative":case"error":return i`
                    <sp-icon-alert
                        label=${e||"Error"}
                        class="type"
                    ></sp-icon-alert>
                `;case"warning":return i`
                    <sp-icon-alert
                        label=${e||"Warning"}
                        class="type"
                    ></sp-icon-alert>
                `;case"positive":return i`
                    <sp-icon-checkmark-circle
                        label=${e||"Success"}
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;default:return i``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown)}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close()}close(){this.open=!1}render(){return i`
            ${this.renderIcon(this.variant,this.iconLabel)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    static-color="white"
                ></sp-close-button>
            </div>
        `}updated(t){super.updated(t),t.has("open")&&(this.open?this.timeout&&this.startCountdown():this.timeout&&this.stopCountdown()),t.has("timeout")&&(this.timeout!==null&&this.open?this.startCountdown():this.stopCountdown())}}r([a({type:Boolean,reflect:!0})],Toast.prototype,"open",2),r([a({type:Number})],Toast.prototype,"timeout",1),r([a({type:String})],Toast.prototype,"variant",1),r([a({type:String,attribute:"icon-label"})],Toast.prototype,"iconLabel",2);
//# sourceMappingURL=Toast.js.map
