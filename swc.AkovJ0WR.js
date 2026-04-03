import"./swc.Y3x2X0rw.js";import{d as e}from"./swc.JlveB6nj.js";import{r as t}from"./swc.x86Wm3h_.js";import"./swc.DmUZx5b4.js";import{i as s}from"./swc.CZZTz5mk.js";import{S as r,x as o}from"./swc.DRY409cl.js";import{n as i}from"./swc.DGMRmT0Y.js";import{r as n}from"./swc.CLZ_QmzZ.js";import{e as l}from"./swc.CmcGy_P4.js";import"./swc.ESeGI9Zl.js";import"./swc.B9tQS4kk.js";import"./swc.Byki1UKV.js";import"./swc.B6Ji04pc.js";import"./swc.Bg5uLBM2.js";import"./swc.CrQ_-wxU.js";import"./swc.DBdsjXYw.js";import"./swc.lGfup4MH.js";import"./swc.DCr-cuAO.js";import"./swc.x89XYkyy.js";import"./swc.D0H5qBOK.js";import"./swc.CPsCYOj0.js";import"./swc.ZbFTGPLO.js";import"./swc.DFc3olvV.js";import"./swc.Chuw36y7.js";import"./swc.CdEeIaOZ.js";import"./swc.YuiHdkPG.js";import"./swc.D2do86WM.js";import"./swc.DHlpa5Zm.js";import"./swc.SLPgBgGT.js";import"./swc.CIw_Gjml.js";import"./swc.DB-PAw-v.js";import"./swc.Dnc-LsLT.js";import"./swc.DBkCI9Gx.js";import"./swc.CjPt0-_4.js";import"./swc.DhPht_xE.js";import"./swc.DfF9MWIF.js";import"./swc.PAltyTaO.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.D-E52Zsj.js";import"./swc.Ds_ROb9a.js";import"./swc.s7RHQ9Fx.js";import"./swc.mUX8iMJZ.js";import"./swc.BW2PKKqP.js";import"./swc.DB8lrnSl.js";import"./swc.kLAuqcRl.js";const a=s`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(e,t,s,r)=>{for(var o,i=void 0,n=e.length-1;n>=0;n--)(o=e[n])&&(i=o(t,s,i)||i);return i&&c(t,s,i),i};const h=class e extends r{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[],this.ariaManagedElements=new WeakSet}static get styles(){return[a]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target)}}handleBeforetoggle(e){const{target:t}=e;let s;if(t===this.clickOverlayElement)s="click";else if(t===this.longpressOverlayElement)s="longpress";else{if(t!==this.hoverOverlayElement)return;s="hover"}"open"===e.newState?this.open=s:this.open===s&&(this.open=void 0)}resolveHaspopupValue(){const t=this.clickContent[0]||this.longpressContent[0];if(!t)return"dialog";const s=t.getAttribute("role");if(s&&e.VALID_HASPOPUP_ROLES.has(s))return s;const r=t.querySelector("[role]");return r&&e.VALID_HASPOPUP_ROLES.has(r.getAttribute("role"))?r.getAttribute("role"):"dialog"}removeAriaFromTrigger(e){this.ariaManagedElements.has(e)&&(e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls"),e.removeAttribute("aria-haspopup"),this.ariaManagedElements.delete(e))}manageAriaOnTrigger(){const e=this.targetContent[0];if(this.previousTriggerElement&&this.previousTriggerElement!==e&&this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=e,!e)return;const s=this.clickContent.length>0,r=this.longpressContent.length>0;if(!s&&!r)return void this.removeAriaFromTrigger(e);const o="click"===this.open||"longpress"===this.open;e.setAttribute("aria-expanded",String(o)),(this.ariaManagedElements.has(e)||!e.hasAttribute("aria-haspopup"))&&e.setAttribute("aria-haspopup",this.resolveHaspopupValue()),this.ariaManagedElements.add(e);const i="longpress"===this.open?this.longpressContent[0]:"click"===this.open?this.clickContent[0]:this.clickContent[0]||this.longpressContent[0];i?(i.id||(i.id=`sp-overlay-content-${t()}`),e.setAttribute("aria-controls",i.id)):e.removeAttribute("aria-controls")}disconnectedCallback(){this.previousTriggerElement&&(this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=void 0),super.disconnectedCallback()}update(e){var t,s,r,o,i,n;e.has("clickContent")&&(this.clickPlacement=(null==(t=this.clickContent[0])?void 0:t.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=(null==(r=this.hoverContent[0])?void 0:r.getAttribute("placement"))||(null==(o=this.hoverContent[0])?void 0:o.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=(null==(i=this.longpressContent[0])?void 0:i.getAttribute("placement"))||(null==(n=this.longpressContent[0])?void 0:n.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return o`
      <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
    `}renderClickOverlay(){var e;const t=this.renderSlot("click-content"),s=o`
      <sp-overlay
        id="click-overlay"
        ?disabled=${this.disabled||!this.clickContent.length}
        ?open=${"click"===this.open&&!!this.clickContent.length}
        .offset=${this.offset}
        .placement=${this.clickPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"click"}
        .type=${this.type||"auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${t}
      </sp-overlay>
    `;return null!=(e=this.triggeredBy)&&e.includes("click")||this.clickContent.length?s:t}renderHoverOverlay(){var e;const t=this.renderSlot("hover-content"),s=o`
      <sp-overlay
        id="hover-overlay"
        ?open=${"hover"===this.open&&!!this.hoverContent.length}
        ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
        .offset=${this.offset}
        .placement=${this.hoverPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"hover"}
        .type=${"hint"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${t}
      </sp-overlay>
    `;return null!=(e=this.triggeredBy)&&e.includes("hover")||this.hoverContent.length?s:t}renderLongpressOverlay(){var e;const t=this.renderSlot("longpress-content"),s=o`
      <sp-overlay
        id="longpress-overlay"
        ?disabled=${this.disabled||!this.longpressContent.length}
        ?open=${"longpress"===this.open&&!!this.longpressContent.length}
        .offset=${this.offset}
        .placement=${this.longpressPlacement||this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"longpress"}
        .type=${"auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${t}
      </sp-overlay>
      <slot name="longpress-describedby-descriptor"></slot>
    `;return null!=(e=this.triggeredBy)&&e.includes("longpress")||this.longpressContent.length?s:t}render(){return o`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this.handleTriggerContent}
      ></slot>
      ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
    `}updated(e){super.updated(e),this.disabled&&e.has("disabled")?this.open=void 0:(e.has("open")||e.has("type")||e.has("targetContent")||e.has("clickContent")||e.has("longpressContent"))&&this.manageAriaOnTrigger()}async getUpdateComplete(){return await super.getUpdateComplete()}};h.VALID_HASPOPUP_ROLES=new Set(["menu","listbox","tree","grid","dialog"]),p([i({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([i({reflect:!0})],h.prototype,"placement"),p([i()],h.prototype,"type"),p([i({type:Number})],h.prototype,"offset"),p([i({reflect:!0})],h.prototype,"open"),p([i({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([i({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([n()],h.prototype,"clickContent"),p([n()],h.prototype,"longpressContent"),p([n()],h.prototype,"hoverContent"),p([n()],h.prototype,"targetContent"),p([l("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([l("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([l("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),e("overlay-trigger",h);
//# sourceMappingURL=swc.wzIcKlol.js.map
