"use strict";var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var o=(r,s,e,t)=>{for(var n=t>1?void 0:t?m(s,e):s,i=r.length-1,l;i>=0;i--)(l=r[i])&&(n=(t?l(s,e,n):l(n))||n);return t&&n&&c(s,e,n),n};import{html as p,SpectrumElement as h}from"@spectrum-web-components/base";import{property as a,query as d}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as u}from"@spectrum-web-components/base/src/directives.js";import v from"./tooltip.css.js";import{focusableSelector as b}from"@spectrum-web-components/shared/src/focusable-selectors.js";import{DependencyManagerController as f}from"@spectrum-web-components/reactive-controllers/src/DependencyManger.js";class g extends HTMLElement{constructor(){super();this._open=!1;this._placement="top";this.addEventListener("sp-opened",this.redispatchEvent),this.addEventListener("sp-closed",this.redispatchEvent)}redispatchEvent(e){e.stopPropagation(),this.tooltip.dispatchEvent(new CustomEvent(e.type,{bubbles:e.bubbles,composed:e.composed,detail:e.detail}))}get tooltip(){return this.getRootNode().host}static get observedAttributes(){return["open","placement"]}attributeChangedCallback(e,t,n){switch(e){case"open":this.open=n!==null;break;case"placement":this.placement=n;break}}set open(e){this._open=e;const{tooltip:t}=this;t&&(t.open=e)}get open(){return this._open}set placement(e){this._placement=e;const{tooltip:t}=this;t&&(t.placement=e)}get placement(){return this._placement}get tipElement(){return this.tooltip.tipElement}}customElements.get("sp-tooltip-openable")||customElements.define("sp-tooltip-openable",g);export class Tooltip extends h{constructor(){super(...arguments);this.delayed=!1;this.dependencyManager=new f(this);this.disabled=!1;this.selfManaged=!1;this.offset=0;this.open=!1;this._variant="";this.handleOpenOverlay=()=>{this.open=!0};this.handleCloseOverlay=()=>{this.open=!1}}static get styles(){return[v]}get variant(){return this._variant}set variant(e){if(e!==this.variant){if(["info","positive","negative"].includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant=""}}forwardTransitionEvent(e){this.dispatchEvent(new TransitionEvent(e.type,{bubbles:!0,composed:!0,propertyName:e.propertyName}))}get triggerElement(){var i;let e=this.assignedSlot||this,t=e.getRootNode();if(t===document)return null;let n=e.parentElement||t.host||t;for(;!((i=n==null?void 0:n.matches)!=null&&i.call(n,b));){if(e=n.assignedSlot||n,t=e.getRootNode(),t===document)return null;n=e.parentElement||t.host||t}return n}render(){const e=p`
            <sp-tooltip-openable
                id="tooltip"
                placement=${u(this.placement)}
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
            `):e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(!this.selfManaged)return;const e=this.overlayElement;if(e){const t=this.triggerElement;e.triggerElement=t}})}}o([a({type:Boolean})],Tooltip.prototype,"delayed",2),o([a({type:Boolean})],Tooltip.prototype,"disabled",2),o([a({type:Boolean,attribute:"self-managed"})],Tooltip.prototype,"selfManaged",2),o([a({type:Number})],Tooltip.prototype,"offset",2),o([a({type:Boolean,reflect:!0})],Tooltip.prototype,"open",2),o([d("sp-overlay")],Tooltip.prototype,"overlayElement",2),o([a({reflect:!0})],Tooltip.prototype,"placement",2),o([d("#tip")],Tooltip.prototype,"tipElement",2),o([a({type:Number})],Tooltip.prototype,"tipPadding",2),o([a({type:String})],Tooltip.prototype,"variant",1);
//# sourceMappingURL=Tooltip.js.map
