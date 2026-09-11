"use strict";var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var o=(l,a,e,t)=>{for(var n=t>1?void 0:t?m(a,e):a,s=l.length-1,r;s>=0;s--)(r=l[s])&&(n=(t?r(a,e,n):r(n))||n);return t&&n&&c(a,e,n),n};import{html as p,SpectrumElement as u}from"@spectrum-web-components/base";import{property as i,query as d}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as h}from"@spectrum-web-components/base/src/directives.js";import{DependencyManagerController as v}from"@spectrum-web-components/reactive-controllers/src/DependencyManger.js";import{focusableSelector as b}from"@spectrum-web-components/shared/src/focusable-selectors.js";import f from"./tooltip.css.js";class g extends HTMLElement{constructor(){super();this._open=!1;this._placement="top";this.addEventListener("sp-opened",this.redispatchEvent),this.addEventListener("sp-closed",this.redispatchEvent)}redispatchEvent(e){e.stopPropagation(),this.tooltip.dispatchEvent(new CustomEvent(e.type,{bubbles:e.bubbles,composed:e.composed,detail:e.detail}))}get tooltip(){return this.getRootNode().host}static get observedAttributes(){return["open","placement"]}attributeChangedCallback(e,t,n){switch(e){case"open":this.open=n!==null;break;case"placement":this.placement=n;break}}set open(e){this._open=e;const{tooltip:t}=this;t&&(t.open=e)}get open(){return this._open}set placement(e){this._placement=e;const{tooltip:t}=this;t&&(t.placement=e)}get placement(){return this._placement}get tipElement(){return this.tooltip.tipElement}}customElements.get("sp-tooltip-openable")||customElements.define("sp-tooltip-openable",g);export class Tooltip extends u{constructor(){super(...arguments);this.delayed=!1;this.dependencyManager=new v(this);this.disabled=!1;this.selfManaged=!1;this.offset=0;this.open=!1;this._triggerElement=null;this._variant="";this.handleOpenOverlay=()=>{this.open=!0};this.handleCloseOverlay=()=>{this.open=!1}}static get styles(){return[f]}set triggerElement(e){this._triggerElement=e,this.overlayElement&&(this.overlayElement.triggerElement=e)}get triggerElement(){return this._triggerElement||this.resolveSelfManagedTriggerElement()}get variant(){return this._variant}set variant(e){if(e!==this.variant){if(["info","positive","negative"].includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant=""}}forwardTransitionEvent(e){this.dispatchEvent(new TransitionEvent(e.type,{bubbles:!0,composed:!0,propertyName:e.propertyName}))}resolveSelfManagedTriggerElement(){var s;let e=this.assignedSlot||this,t=e.getRootNode();if(t===document)return null;let n=e.parentElement||t.host||t;for(;!((s=n==null?void 0:n.matches)!=null&&s.call(n,b));){if(e=n.assignedSlot||n,t=e.getRootNode(),t===document)return null;n=e.parentElement||t.host||t}return n}render(){const e=p`
      <sp-tooltip-openable
        id="tooltip"
        placement=${h(this.placement)}
        @transitionrun=${this.forwardTransitionEvent}
        @transitionend=${this.forwardTransitionEvent}
        @transitioncancel=${this.forwardTransitionEvent}
      >
        <slot name="icon"></slot>
        <span id="label"><slot></slot></span>
        <span id="tip" aria-hidden="true"></span>
      </sp-tooltip-openable>
    `;return this.selfManaged?(this.dependencyManager.add("sp-overlay"),import("@spectrum-web-components/overlay/sp-overlay.js"),p`
        <sp-overlay
          ?open=${this.open&&!this.disabled&&this.dependencyManager.loaded}
          ?delayed=${this.delayed}
          ?disabled=${this.disabled}
          offset=${this.offset}
          .placement=${this.placement}
          type="hint"
          .tipPadding=${this.tipPadding}
          .triggerInteraction=${"hover"}
          @sp-opened=${this.handleOpenOverlay}
          @sp-closed=${this.handleCloseOverlay}
        >
          ${e}
        </sp-overlay>
      `):e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(!this.selfManaged)return;const e=this.overlayElement;if(e){const t=this.triggerElement;e.triggerElement=t}})}}o([i({type:Boolean})],Tooltip.prototype,"delayed",2),o([i({type:Boolean})],Tooltip.prototype,"disabled",2),o([i({type:Boolean,attribute:"self-managed"})],Tooltip.prototype,"selfManaged",2),o([i({type:Number})],Tooltip.prototype,"offset",2),o([i({type:Boolean,reflect:!0})],Tooltip.prototype,"open",2),o([d("sp-overlay")],Tooltip.prototype,"overlayElement",2),o([i({reflect:!0})],Tooltip.prototype,"placement",2),o([d("#tip")],Tooltip.prototype,"tipElement",2),o([i({type:Number})],Tooltip.prototype,"tipPadding",2),o([i({type:String})],Tooltip.prototype,"variant",1);
//# sourceMappingURL=Tooltip.js.map
