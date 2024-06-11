import"./swc.CA_285BJ.js";import"./swc.CmSb8d8W.js";import"./swc.CXrO5j08.js";import{i as e}from"./swc.DpYYvrpg.js";import{i}from"./swc.DyK9hFIu.js";import{f as s}from"./swc.C-4VxDS_.js";import{a as t}from"./swc.C8rSHyVA.js";import{x as n,T as o}from"./swc.DAPqj1CM.js";import{n as a,S as r}from"./swc.BvXu6tu0.js";import{d as l}from"./swc.JlveB6nj.js";const d=e`
    :host{box-sizing:border-box;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-modal-transition-animation-duration));justify-content:center;align-items:center;block-size:stretch;inline-size:100vw;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;margin-block-start:0}}
`;var p=Object.defineProperty,h=(e,i,s,t)=>{for(var n,o=void 0,a=e.length-1;a>=0;a--)(n=e[a])&&(o=n(i,s,o)||o);return o&&p(i,s,o),o};class c extends(t(r)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[d,i]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const e=s(this.dialog);e?(e.updateComplete&&await e.updateComplete,e.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(e){e.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(e){this.dispatchEvent(new TransitionEvent(e.type,{bubbles:!0,composed:!0,propertyName:e.propertyName}))}handleUnderlayTransitionend(e){!this.open&&"visibility"===e.propertyName&&this.resolveTransitionPromise(),this.handleTransitionEvent(e)}handleModalTransitionend(e){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(e)}update(e){e.has("open")&&void 0!==e.get("open")&&(this.animating=!0,this.transitionPromise=new Promise((e=>{this.resolveTransitionPromise=()=>{this.animating=!1,e()}})),this.open||this.dispatchClosed()),super.update(e)}renderDialog(){return n`
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
        `}updated(e){e.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}h([a({type:Boolean,reflect:!0})],c.prototype,"dismissable"),h([a({type:Boolean,reflect:!0})],c.prototype,"open"),h([a({type:String,reflect:!0})],c.prototype,"mode"),h([a({type:Boolean})],c.prototype,"responsive"),h([a({type:Boolean})],c.prototype,"underlay"),l("sp-dialog-base",c);var m=Object.freeze({__proto__:null});export{c as D,m as s};
//# sourceMappingURL=swc.BsuyoTKs.js.map
