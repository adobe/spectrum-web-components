import"./swc.BqDk_Atl.js";import"./swc.CS21GliY.js";import"./swc.Bp78ro7q.js";import{i as t}from"./swc.Cl2X6-fK.js";import{i}from"./swc.BlyXCoGX.js";import{f as e}from"./swc.BesWcX0D.js";import{F as s}from"./swc.DkGVgwTs.js";import{x as o,T as n}from"./swc.BkWj9Vim.js";import{n as r}from"./swc.Cbbf2bfB.js";import{S as a}from"./swc.Cmp1canL.js";import{d as l}from"./swc.JlveB6nj.js";const d=t`
    :host{box-sizing:border-box;inline-size:100vw;block-size:100vh;block-size:-webkit-fill-available;block-size:stretch;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-animation-duration-100));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}:host([responsive]){margin-block-start:0}}
`;var p=Object.defineProperty,h=(t,i,e,s)=>{for(var o,n=void 0,r=t.length-1;r>=0;r--)(o=t[r])&&(n=o(i,e,n)||n);return n&&p(i,e,n),n};class c extends(s(a)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[d,i]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const t=e(this.dialog);t?(t.updateComplete&&await t.updateComplete,t.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(t){t.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(t){this.dispatchEvent(new TransitionEvent(t.type,{bubbles:!0,composed:!0,propertyName:t.propertyName}))}handleUnderlayTransitionend(t){!this.open&&"visibility"===t.propertyName&&this.resolveTransitionPromise(),this.handleTransitionEvent(t)}handleModalTransitionend(t){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(t)}get hasTransitionDuration(){const t=this.shadowRoot.querySelector(".modal"),i=window.getComputedStyle(t).transitionDuration;for(const t of i.split(","))if(parseFloat(t)>0)return!0;const e=this.shadowRoot.querySelector("sp-underlay");if(e){const t=window.getComputedStyle(e).transitionDuration;for(const i of t.split(","))if(parseFloat(i)>0)return!0}return!1}update(t){if(t.has("open")&&void 0!==t.get("open")){const t=this.hasTransitionDuration;this.animating=!0,this.transitionPromise=new Promise((i=>{this.resolveTransitionPromise=()=>{this.animating=!1,!this.open&&t&&this.dispatchClosed(),i()}})),!this.open&&!t&&this.dispatchClosed()}super.update(t)}renderDialog(){return o`
            <slot></slot>
        `}render(){return o`
            ${this.underlay?o`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:n}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(t){t.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}h([r({type:Boolean,reflect:!0})],c.prototype,"dismissable"),h([r({type:Boolean,reflect:!0})],c.prototype,"open"),h([r({type:String,reflect:!0})],c.prototype,"mode"),h([r({type:Boolean})],c.prototype,"responsive"),h([r({type:Boolean})],c.prototype,"underlay"),l("sp-dialog-base",c);var m=Object.freeze({__proto__:null});export{c as D,m as s};
//# sourceMappingURL=swc.Dmxjr2c5.js.map
