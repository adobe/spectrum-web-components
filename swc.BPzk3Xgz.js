import"./swc.Du64lI8g.js";import{r as e}from"./swc.x86Wm3h_.js";import"./swc.DWQTHYtd.js";import{i as t}from"./swc.CZZTz5mk.js";import{S as s,x as r}from"./swc.DPhAUhmd.js";import{n as o}from"./swc.BtQhPOgI.js";import{r as i}from"./swc.U1m7APr9.js";import{e as n}from"./swc.CmcGy_P4.js";import{o as l}from"./swc.Cxa0JK8L.js";import"./swc.CmdfDAov.js";import"./swc.DwxYKs8e.js";import"./swc.Byki1UKV.js";import"./swc.B6Ji04pc.js";import"./swc.BaBOCi9d.js";import"./swc.D3bMYp1F.js";import"./swc.BYNM7Zvt.js";import"./swc.DcwnPka8.js";import"./swc.DDtjAoXV.js";import"./swc.CtJaUxUA.js";import"./swc.D1XlXpv0.js";import"./swc.DkFZeRLe.js";import"./swc.BhdHcucV.js";import"./swc.CRkqI-so.js";import"./swc.Chuw36y7.js";import"./swc.Dm3p_fT0.js";import"./swc.C2Ynjcpy.js";import"./swc.D_QS_pa6.js";import"./swc.I0XhdiU-.js";import"./swc.DfzoCso7.js";import"./swc.CIw_Gjml.js";import"./swc.DMQW5Qqp.js";import"./swc.BcYwgDMJ.js";import"./swc.Dzo_Y9ZD.js";import"./swc.CjPt0-_4.js";import"./swc.D5QFdFc3.js";import"./swc.DfF9MWIF.js";import"./swc.DRpeppRz.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.an4V3Vu2.js";import"./swc.Ds_ROb9a.js";import"./swc.s3gmTWfm.js";import"./swc.mUX8iMJZ.js";import"./swc.DlYNsxG-.js";import"./swc.DB8lrnSl.js";import"./swc.kLAuqcRl.js";const a=t`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(e,t,s,r)=>{for(var o,i=void 0,n=e.length-1;n>=0;n--)(o=e[n])&&(i=o(t,s,i)||i);return i&&c(t,s,i),i};const h=class t extends s{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[],this.ariaManagedElements=new WeakSet}static get styles(){return[a]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target)}}handleBeforetoggle(e){const{target:t}=e;let s;if(t===this.clickOverlayElement)s="click";else if(t===this.longpressOverlayElement)s="longpress";else{if(t!==this.hoverOverlayElement)return;s="hover"}"open"===e.newState?this.open=s:this.open===s&&(this.open=void 0)}resolveHaspopupValue(){const e=this.clickContent[0]||this.longpressContent[0];if(!e)return"dialog";const s=e.getAttribute("role");if(s&&t.VALID_HASPOPUP_ROLES.has(s))return s;const r=e.querySelector("[role]");return r&&t.VALID_HASPOPUP_ROLES.has(r.getAttribute("role"))?r.getAttribute("role"):"dialog"}removeAriaFromTrigger(e){this.ariaManagedElements.has(e)&&(e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls"),e.removeAttribute("aria-haspopup"),this.ariaManagedElements.delete(e))}manageAriaOnTrigger(){const t=this.targetContent[0];if(this.previousTriggerElement&&this.previousTriggerElement!==t&&this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=t,!t)return;const s=this.clickContent.length>0,r=this.longpressContent.length>0;if(!s&&!r)return void this.removeAriaFromTrigger(t);const o="click"===this.open||"longpress"===this.open;t.setAttribute("aria-expanded",String(o)),(this.ariaManagedElements.has(t)||!t.hasAttribute("aria-haspopup"))&&t.setAttribute("aria-haspopup",this.resolveHaspopupValue()),this.ariaManagedElements.add(t);const i="longpress"===this.open?this.longpressContent[0]:"click"===this.open?this.clickContent[0]:this.clickContent[0]||this.longpressContent[0];i?(i.id||(i.id=`sp-overlay-content-${e()}`),t.setAttribute("aria-controls",i.id)):t.removeAttribute("aria-controls")}disconnectedCallback(){this.previousTriggerElement&&(this.removeAriaFromTrigger(this.previousTriggerElement),this.previousTriggerElement=void 0),super.disconnectedCallback()}update(e){var t,s,r,o,i,n;e.has("clickContent")&&(this.clickPlacement=(null==(t=this.clickContent[0])?void 0:t.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=(null==(r=this.hoverContent[0])?void 0:r.getAttribute("placement"))||(null==(o=this.hoverContent[0])?void 0:o.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=(null==(i=this.longpressContent[0])?void 0:i.getAttribute("placement"))||(null==(n=this.longpressContent[0])?void 0:n.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return r`
      <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
    `}renderClickOverlay(){var e;const t=this.renderSlot("click-content"),s=r`
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
    `;return null!=(e=this.triggeredBy)&&e.includes("click")||this.clickContent.length?s:t}renderHoverOverlay(){var e;const t=this.renderSlot("hover-content"),s=r`
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
    `;return null!=(e=this.triggeredBy)&&e.includes("hover")||this.hoverContent.length?s:t}renderLongpressOverlay(){var e;const t=this.renderSlot("longpress-content"),s=r`
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
    `;return null!=(e=this.triggeredBy)&&e.includes("longpress")||this.longpressContent.length?s:t}render(){return r`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this.handleTriggerContent}
      ></slot>
      ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
    `}updated(e){super.updated(e),this.disabled&&e.has("disabled")?this.open=void 0:(e.has("open")||e.has("type")||e.has("targetContent")||e.has("clickContent")||e.has("longpressContent"))&&this.manageAriaOnTrigger()}async getUpdateComplete(){return await super.getUpdateComplete()}};h.VALID_HASPOPUP_ROLES=new Set(["menu","listbox","tree","grid","dialog"]),p([o({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([o({reflect:!0})],h.prototype,"placement"),p([o()],h.prototype,"type"),p([o({type:Number})],h.prototype,"offset"),p([o({reflect:!0})],h.prototype,"open"),p([o({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([o({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([i()],h.prototype,"clickContent"),p([i()],h.prototype,"longpressContent"),p([i()],h.prototype,"hoverContent"),p([i()],h.prototype,"targetContent"),p([n("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([n("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([n("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),l("overlay-trigger",h);
//# sourceMappingURL=swc.wzIcKlol.js.map
