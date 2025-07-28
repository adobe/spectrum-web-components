"use strict";var p=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var s=(l,n,e,i)=>{for(var t=i>1?void 0:i?u(n,e):n,o=l.length-1,r;o>=0;o--)(r=l[o])&&(t=(i?r(n,e,t):r(t))||t);return i&&t&&p(n,e,t),t};import{html as d,nothing as h,SpectrumElement as c}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/underlay/sp-underlay.js";import"@spectrum-web-components/button/sp-button.js";import"@spectrum-web-components/dialog/sp-dialog.js";import m from"@spectrum-web-components/modal/src/modal-wrapper.css.js";import f from"@spectrum-web-components/modal/src/modal.css.js";import{FocusVisiblePolyfillMixin as v}from"@spectrum-web-components/shared";import{firstFocusableIn as y}from"@spectrum-web-components/shared/src/first-focusable-in.js";export class DialogBase extends v(c){constructor(){super(...arguments);this.dismissable=!1;this.open=!1;this.responsive=!1;this.transitionPromise=Promise.resolve();this.resolveTransitionPromise=()=>{};this.underlay=!1;this.animating=!1}static get styles(){return[m,f]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const e=y(this.dialog);e?(e.updateComplete&&await e.updateComplete,e.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(e){e.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(e){this.dispatchEvent(new TransitionEvent(e.type,{bubbles:!0,composed:!0,propertyName:e.propertyName}))}handleUnderlayTransitionend(e){!this.open&&e.propertyName==="visibility"&&this.resolveTransitionPromise(),this.handleTransitionEvent(e)}handleModalTransitionend(e){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(e)}get hasTransitionDuration(){const e=this.shadowRoot.querySelector(".modal"),i=window.getComputedStyle(e).transitionDuration;for(const o of i.split(","))if(parseFloat(o)>0)return!0;const t=this.shadowRoot.querySelector("sp-underlay");if(t){const o=window.getComputedStyle(t).transitionDuration;for(const r of o.split(","))if(parseFloat(r)>0)return!0}return!1}update(e){if(e.has("open")&&e.get("open")!==void 0){const i=this.hasTransitionDuration;this.animating=!0,this.transitionPromise=new Promise(t=>{this.resolveTransitionPromise=()=>{this.animating=!1,!this.open&&i&&this.dispatchClosed(),t()}}),!this.open&&!i&&this.dispatchClosed()}super.update(e)}renderDialog(){return d`
            <slot></slot>
        `}render(){return d`
            ${this.underlay?d`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:h}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(e){e.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then(()=>{this.dialog.shouldManageTabOrderForScrolling()})}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}s([a({type:Boolean,reflect:!0})],DialogBase.prototype,"dismissable",2),s([a({type:Boolean,reflect:!0})],DialogBase.prototype,"open",2),s([a({type:String,reflect:!0})],DialogBase.prototype,"mode",2),s([a({type:Boolean})],DialogBase.prototype,"responsive",2),s([a({type:Boolean})],DialogBase.prototype,"underlay",2);
//# sourceMappingURL=DialogBase.js.map
