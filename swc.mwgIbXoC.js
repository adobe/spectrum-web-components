import"./swc.Cit85t6Z.js";import"./swc.Dj6892mD.js";import{i as t}from"./swc.Bk_7Sut8.js";import{C as e,x as s}from"./swc.CPRo5HoP.js";import{n as o}from"./swc.BtPhaoGy.js";import{r}from"./swc.DTrRBp2w.js";import{a as n}from"./swc.DeJGzahI.js";import{o as i}from"./swc.Cxa0JK8L.js";import"./swc.D6ft1vnw.js";import"./swc.DhvP37DV.js";import"./swc.Cj2DIJMh.js";import"./swc.CDwhI5oz.js";import"./swc.DXoh1SpB.js";import"./swc.0QsRcSJr.js";import"./swc.C0BGAK1o.js";import"./swc.rlzKnk9d.js";import"./swc.D3Xn_5N_.js";import"./swc.DjD-osqg.js";import"./swc.VqjXqM5h.js";import"./swc.CIw_Gjml.js";import"./swc.DhtcN3Mc.js";import"./swc.DUvDxict.js";import"./swc.CFZAOGdq.js";import"./swc.BOJgI39p.js";import"./swc.Chuw36y7.js";import"./swc.bvKOckVu.js";import"./swc.6ya3jt_W.js";import"./swc.VFmzkSC_.js";import"./swc.x86Wm3h_.js";import"./swc.B6Ji04pc.js";import"./swc.Byki1UKV.js";import"./swc.BU4vq_qs.js";import"./swc.B9jzRhMv.js";import"./swc.CjPt0-_4.js";import"./swc.2jb2TuJz.js";import"./swc.DfF9MWIF.js";import"./swc.CeWRcydc.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.f8mN0PVe.js";import"./swc.DTI4n1PL.js";import"./swc.Ds_ROb9a.js";import"./swc.OA-NwBIR.js";import"./swc.mUX8iMJZ.js";import"./swc.9slprkso.js";import"./swc.CA-i04Ei.js";import"./swc.kLAuqcRl.js";const l=t`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(t,e,s,o)=>{for(var r,n=void 0,i=t.length-1;i>=0;i--)(r=t[i])&&(n=r(e,s,n)||n);return n&&c(e,s,n),n};class h extends e{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[l]}getAssignedElementsFromSlot(t){return t.assignedElements({flatten:!0})}handleTriggerContent(t){this.targetContent=this.getAssignedElementsFromSlot(t.target)}handleSlotContent(t){switch(t.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(t.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(t.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(t.target)}}handleBeforetoggle(t){const{target:e}=t;let s;if(e===this.clickOverlayElement)s="click";else if(e===this.longpressOverlayElement)s="longpress";else{if(e!==this.hoverOverlayElement)return;s="hover"}"open"===t.newState?this.open=s:this.open===s&&(this.open=void 0)}update(t){var e,s,o,r,n,i;t.has("clickContent")&&(this.clickPlacement=(null==(e=this.clickContent[0])?void 0:e.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),t.has("hoverContent")&&(this.hoverPlacement=(null==(o=this.hoverContent[0])?void 0:o.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),t.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(i=this.longpressContent[0])?void 0:i.getAttribute("direction"))||void 0),super.update(t)}renderSlot(t){return s`
            <slot name=${t} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var t;const e=this.renderSlot("click-content"),o=s`
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
                ${e}
            </sp-overlay>
        `;return null!=(t=this.triggeredBy)&&t.includes("click")||this.clickContent.length?o:e}renderHoverOverlay(){var t;const e=this.renderSlot("hover-content"),o=s`
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
                ${e}
            </sp-overlay>
        `;return null!=(t=this.triggeredBy)&&t.includes("hover")||this.hoverContent.length?o:e}renderLongpressOverlay(){var t;const e=this.renderSlot("longpress-content"),o=s`
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
                ${e}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return null!=(t=this.triggeredBy)&&t.includes("longpress")||this.longpressContent.length?o:e}render(){return s`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(t){super.updated(t),this.disabled&&t.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}p([o({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([o({reflect:!0})],h.prototype,"placement"),p([o()],h.prototype,"type"),p([o({type:Number})],h.prototype,"offset"),p([o({reflect:!0})],h.prototype,"open"),p([o({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([o({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([r()],h.prototype,"clickContent"),p([r()],h.prototype,"longpressContent"),p([r()],h.prototype,"hoverContent"),p([r()],h.prototype,"targetContent"),p([n("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([n("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([n("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),i("overlay-trigger",h);
//# sourceMappingURL=swc.-44GUcVD.js.map
