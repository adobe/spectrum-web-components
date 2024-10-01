import './sp-underlay-BD0tMA8s.js';
import './sp-button-BTMm_ibC.js';
import './sp-dialog-jhL1CbyX.js';
import { i } from './lit-element-BulMEkr1.js';
import { i as i$1 } from './modal.css-SkAvNHaG.js';
import { f as firstFocusableIn } from './first-focusable-in-BK_DAWOm.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-D29Av9Xb.js';
import { x, T } from './lit-html-COgVUehj.js';
import { n, S as SpectrumElement } from './define-element-C_3bgzm7.js';

const e=i`
    :host{box-sizing:border-box;inline-size:100vw;block-size:100vh;block-size:-webkit-fill-available;block-size:-moz-available;block-size:stretch;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-modal-transition-animation-duration));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}:host([responsive]){margin-block-start:0}}
`;

var p=Object.defineProperty;var o=(n,s,e,i)=>{for(var t=void 0,a=n.length-1,l;a>=0;a--)(l=n[a])&&(t=(l(s,e,t))||t);return t&&p(s,e,t),t};class DialogBase extends FocusVisiblePolyfillMixin(SpectrumElement){constructor(){super(...arguments);this.dismissable=!1;this.open=!1;this.responsive=!1;this.transitionPromise=Promise.resolve();this.resolveTransitionPromise=()=>{};this.underlay=!1;this.animating=!1;}static get styles(){return [e,i$1]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const e=firstFocusableIn(this.dialog);e?(e.updateComplete&&await e.updateComplete,e.focus()):this.dialog.focus();}else super.focus();}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close();}handleClose(e){e.stopPropagation(),this.close();}close(){this.open=!1;}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}));}handleTransitionEvent(e){this.dispatchEvent(new TransitionEvent(e.type,{bubbles:!0,composed:!0,propertyName:e.propertyName}));}handleUnderlayTransitionend(e){!this.open&&e.propertyName==="visibility"&&this.resolveTransitionPromise(),this.handleTransitionEvent(e);}handleModalTransitionend(e){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(e);}update(e){e.has("open")&&e.get("open")!==void 0&&(this.animating=!0,this.transitionPromise=new Promise(i=>{this.resolveTransitionPromise=()=>{this.animating=!1,i();};}),this.open||this.dispatchClosed()),super.update(e);}renderDialog(){return x`
            <slot></slot>
        `}render(){return x`
            ${this.underlay?x`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:T}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(e){e.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then(()=>{this.dialog.shouldManageTabOrderForScrolling();});}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}o([n({type:Boolean,reflect:!0})],DialogBase.prototype,"dismissable"),o([n({type:Boolean,reflect:!0})],DialogBase.prototype,"open"),o([n({type:String,reflect:!0})],DialogBase.prototype,"mode"),o([n({type:Boolean})],DialogBase.prototype,"responsive"),o([n({type:Boolean})],DialogBase.prototype,"underlay");

export { DialogBase as D };
