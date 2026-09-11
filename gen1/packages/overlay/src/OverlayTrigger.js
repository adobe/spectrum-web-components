"use strict";var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var s=(g,a,e,r)=>{for(var t=r>1?void 0:r?v(a,e):a,i=g.length-1,o;i>=0;i--)(o=g[i])&&(t=(r?o(a,e,t):o(t))||t);return r&&t&&u(a,e,t),t};import{html as p,SpectrumElement as y}from"@spectrum-web-components/base";import{property as l,query as h,state as c}from"@spectrum-web-components/base/src/decorators.js";import{randomID as f}from"@spectrum-web-components/shared/src/random-id.js";import"@spectrum-web-components/overlay/sp-overlay.js";import C from"./overlay-trigger.css.js";const n=class n extends y{constructor(){super(...arguments);this.offset=6;this.disabled=!1;this.receivesFocus="auto";this.clickContent=[];this.longpressContent=[];this.hoverContent=[];this.targetContent=[];this.ariaManagedElements=new WeakSet}static get styles(){return[C]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target);break}}handleBeforetoggle(e){const{target:r}=e;let t;if(r===this.clickOverlayElement)t="click";else if(r===this.longpressOverlayElement)t="longpress";else if(r===this.hoverOverlayElement)t="hover";else return;e.newState==="open"?this.open=t:this.open===t&&(this.open=void 0)}resolveHaspopupValue(){const e=this.clickContent[0]||this.longpressContent[0];if(!e)return"dialog";const r=e.getAttribute("role");if(r&&n.VALID_HASPOPUP_ROLES.has(r))return r;const t=e.querySelector("[role]");return t&&n.VALID_HASPOPUP_ROLES.has(t.getAttribute("role"))?t.getAttribute("role"):"dialog"}removeAriaFromTrigger(e){this.ariaManagedElements.has(e)&&(e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls"),e.removeAttribute("aria-haspopup"),this.ariaManagedElements.delete(e))}manageAriaOnTrigger(){const e=this.targetContent[0];if(this.previousTriggerElement&&this.previousTriggerElement!==e&&this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=e,!e)return;const r=this.clickContent.length>0,t=this.longpressContent.length>0;if(!r&&!t){this.removeAriaFromTrigger(e);return}const i=this.open==="click"||this.open==="longpress";e.setAttribute("aria-expanded",String(i)),(this.ariaManagedElements.has(e)||!e.hasAttribute("aria-haspopup"))&&e.setAttribute("aria-haspopup",this.resolveHaspopupValue()),this.ariaManagedElements.add(e);const o=this.open==="longpress"?this.longpressContent[0]:this.open==="click"?this.clickContent[0]:this.clickContent[0]||this.longpressContent[0];o?(o.id||(o.id=`sp-overlay-content-${f()}`),e.setAttribute("aria-controls",o.id)):e.removeAttribute("aria-controls")}disconnectedCallback(){this.previousTriggerElement&&(this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=void 0),super.disconnectedCallback()}update(e){var r,t,i,o,d,m;e.has("clickContent")&&(this.clickPlacement=((r=this.clickContent[0])==null?void 0:r.getAttribute("placement"))||((t=this.clickContent[0])==null?void 0:t.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=((i=this.hoverContent[0])==null?void 0:i.getAttribute("placement"))||((o=this.hoverContent[0])==null?void 0:o.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=((d=this.longpressContent[0])==null?void 0:d.getAttribute("placement"))||((m=this.longpressContent[0])==null?void 0:m.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return p`
      <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
    `}renderClickOverlay(){var t;const e=this.renderSlot("click-content"),r=p`
      <sp-overlay
        id="click-overlay"
        ?disabled=${this.disabled||!this.clickContent.length}
        ?open=${this.open==="click"&&!!this.clickContent.length}
        .offset=${this.offset}
        .placement=${this.clickPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"click"}
        .type=${this.type||"auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${e}
      </sp-overlay>
    `;return(t=this.triggeredBy)!=null&&t.includes("click")||this.clickContent.length?r:e}renderHoverOverlay(){var t;const e=this.renderSlot("hover-content"),r=p`
      <sp-overlay
        id="hover-overlay"
        ?open=${this.open==="hover"&&!!this.hoverContent.length}
        ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&this.open!=="hover"}
        .offset=${this.offset}
        .placement=${this.hoverPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"hover"}
        .type=${"hint"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${e}
      </sp-overlay>
    `;return(t=this.triggeredBy)!=null&&t.includes("hover")||this.hoverContent.length?r:e}renderLongpressOverlay(){var t;const e=this.renderSlot("longpress-content"),r=p`
      <sp-overlay
        id="longpress-overlay"
        ?disabled=${this.disabled||!this.longpressContent.length}
        ?open=${this.open==="longpress"&&!!this.longpressContent.length}
        .offset=${this.offset}
        .placement=${this.longpressPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"longpress"}
        .type=${"auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${e}
      </sp-overlay>
      <slot name="longpress-describedby-descriptor"></slot>
    `;return(t=this.triggeredBy)!=null&&t.includes("longpress")||this.longpressContent.length?r:e}render(){return p`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this.handleTriggerContent}
      ></slot>
      ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
    `}updated(e){if(super.updated(e),this.disabled&&e.has("disabled")){this.open=void 0;return}(e.has("open")||e.has("type")||e.has("targetContent")||e.has("clickContent")||e.has("longpressContent"))&&this.manageAriaOnTrigger()}async getUpdateComplete(){return await super.getUpdateComplete()}};n.VALID_HASPOPUP_ROLES=new Set(["menu","listbox","tree","grid","dialog"]),s([l({attribute:"triggered-by"})],n.prototype,"triggeredBy",2),s([l({reflect:!0})],n.prototype,"placement",2),s([l()],n.prototype,"type",2),s([l({type:Number})],n.prototype,"offset",2),s([l({reflect:!0})],n.prototype,"open",2),s([l({type:Boolean,reflect:!0})],n.prototype,"disabled",2),s([l({attribute:"receives-focus"})],n.prototype,"receivesFocus",2),s([c()],n.prototype,"clickContent",2),s([c()],n.prototype,"longpressContent",2),s([c()],n.prototype,"hoverContent",2),s([c()],n.prototype,"targetContent",2),s([h("#click-overlay",!0)],n.prototype,"clickOverlayElement",2),s([h("#longpress-overlay",!0)],n.prototype,"longpressOverlayElement",2),s([h("#hover-overlay",!0)],n.prototype,"hoverOverlayElement",2);export let OverlayTrigger=n;
//# sourceMappingURL=OverlayTrigger.js.map
