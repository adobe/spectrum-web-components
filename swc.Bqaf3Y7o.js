import"./swc.BSoIEn-o.js";import{d as e}from"./swc.JlveB6nj.js";import"./swc.Bnf9bTwW.js";import{i as t}from"./swc.CRBjbaNr.js";import{S as s}from"./swc.C17z_K2J.js";import{x as o}from"./swc.DWYvVEd1.js";import{n as r}from"./swc.WWX4rCzN.js";import{r as n}from"./swc.BjpW266Y.js";import{a as i}from"./swc.DeJGzahI.js";import"./swc.jUzOJA-i.js";import"./swc.CVBzMbr9.js";import"./swc.4thKc1HM.js";import"./swc.B_49pBtn.js";import"./swc.BFb2HgbO.js";import"./swc.BzKeOA5-.js";import"./swc.fuWHuSGN.js";import"./swc.Chxt1mTH.js";import"./swc.D0TUV9Ez.js";import"./swc.Bw8lT3AX.js";import"./swc.BQDW7CbB.js";import"./swc.CIw_Gjml.js";import"./swc.Bea_DqvJ.js";import"./swc.CiMcRm9j.js";import"./swc.KdVVSB2B.js";import"./swc.C-ScHQTK.js";import"./swc.Chuw36y7.js";import"./swc.DMgvdLJ8.js";import"./swc.B3ltKhbr.js";import"./swc.x86Wm3h_.js";import"./swc.B6Ji04pc.js";import"./swc.Byki1UKV.js";import"./swc.B36pLn6i.js";import"./swc.utY6gybf.js";import"./swc.CjPt0-_4.js";import"./swc.BIiqqVr1.js";import"./swc.DfF9MWIF.js";import"./swc.CBzxcGnH.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.BdwsiJbw.js";import"./swc.DuBizCt2.js";import"./swc.D_As-1mY.js";import"./swc.mUX8iMJZ.js";import"./swc.CKJhvct_.js";import"./swc.CA-i04Ei.js";import"./swc.DiTKuRRZ.js";import"./swc.kLAuqcRl.js";const l=t`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(e,t,s,o)=>{for(var r,n=void 0,i=e.length-1;i>=0;i--)(r=e[i])&&(n=r(t,s,n)||n);return n&&c(t,s,n),n};class h extends s{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[l]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target)}}handleBeforetoggle(e){const{target:t}=e;let s;if(t===this.clickOverlayElement)s="click";else if(t===this.longpressOverlayElement)s="longpress";else{if(t!==this.hoverOverlayElement)return;s="hover"}"open"===e.newState?this.open=s:this.open===s&&(this.open=void 0)}update(e){var t,s,o,r,n,i;e.has("clickContent")&&(this.clickPlacement=(null==(t=this.clickContent[0])?void 0:t.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=(null==(o=this.hoverContent[0])?void 0:o.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(i=this.longpressContent[0])?void 0:i.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return o`
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
        `}updated(e){super.updated(e),this.disabled&&e.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}p([r({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([r({reflect:!0})],h.prototype,"placement"),p([r()],h.prototype,"type"),p([r({type:Number})],h.prototype,"offset"),p([r({reflect:!0})],h.prototype,"open"),p([r({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([r({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([n()],h.prototype,"clickContent"),p([n()],h.prototype,"longpressContent"),p([n()],h.prototype,"hoverContent"),p([n()],h.prototype,"targetContent"),p([i("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([i("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([i("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),e("overlay-trigger",h);
//# sourceMappingURL=swc.BbMiA9ZL.js.map
