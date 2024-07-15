import"./swc.dFYzK_xt.js";import"./swc.BAnvSdRW.js";import"./swc.qK969KwQ.js";import{i}from"./swc.DpYYvrpg.js";import{i as e}from"./swc.DyK9hFIu.js";import{f as s}from"./swc.C-4VxDS_.js";import{F as t}from"./swc.CGJ1i0C_.js";import{x as n,T as o}from"./swc.DAPqj1CM.js";import{n as r}from"./swc.DKGY1963.js";import{S as a}from"./swc.C0E-SzgW.js";import{d as l}from"./swc.JlveB6nj.js";const d=i`
    :host{box-sizing:border-box;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-modal-transition-animation-duration));justify-content:center;align-items:center;block-size:stretch;inline-size:100vw;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;margin-block-start:0}}
`;var p=Object.defineProperty,h=(i,e,s,t)=>{for(var n,o=void 0,r=i.length-1;r>=0;r--)(n=i[r])&&(o=n(e,s,o)||o);return o&&p(e,s,o),o};class c extends(t(a)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[d,e]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const i=s(this.dialog);i?(i.updateComplete&&await i.updateComplete,i.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(i){i.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(i){this.dispatchEvent(new TransitionEvent(i.type,{bubbles:!0,composed:!0,propertyName:i.propertyName}))}handleUnderlayTransitionend(i){!this.open&&"visibility"===i.propertyName&&this.resolveTransitionPromise(),this.handleTransitionEvent(i)}handleModalTransitionend(i){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(i)}update(i){i.has("open")&&void 0!==i.get("open")&&(this.animating=!0,this.transitionPromise=new Promise((i=>{this.resolveTransitionPromise=()=>{this.animating=!1,i()}})),this.open||this.dispatchClosed()),super.update(i)}renderDialog(){return n`
            <slot></slot>
        `}render(){return n`
            ${this.underlay?n`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:o}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(i){i.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const i=await super.getUpdateComplete();return await this.transitionPromise,i}}h([r({type:Boolean,reflect:!0})],c.prototype,"dismissable"),h([r({type:Boolean,reflect:!0})],c.prototype,"open"),h([r({type:String,reflect:!0})],c.prototype,"mode"),h([r({type:Boolean})],c.prototype,"responsive"),h([r({type:Boolean})],c.prototype,"underlay"),l("sp-dialog-base",c);var m=Object.freeze({__proto__:null});export{c as D,m as s};
//# sourceMappingURL=swc.B1bgMX28.js.map
