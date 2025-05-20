import"./swc.B-dHp86U.js";import{d as e}from"./swc.JlveB6nj.js";import"./swc.BFbioy-n.js";import{i as t}from"./swc.Cl2X6-fK.js";import{S as s}from"./swc.eJQEZSgS.js";import{x as o}from"./swc.CfKxAKYm.js";import{n as r}from"./swc.DGYjDgvc.js";import{r as n}from"./swc.D3Md_c5R.js";import{a as i}from"./swc.DeJGzahI.js";import"./swc.DtFy9KZc.js";import"./swc.wUhkLbXy.js";import"./swc.Chcl5Jv9.js";import"./swc.DWvC8hTb.js";import"./swc.DqTgNEGv.js";import"./swc.BsLryrCj.js";import"./swc.y_rLarCs.js";import"./swc.Cd7tce6S.js";import"./swc.BBPqdk4g.js";import"./swc.D00AtLxR.js";import"./swc.DZnaS1dx.js";import"./swc.BkNr85_9.js";import"./swc.DX-iw9La.js";import"./swc.CJ7Sr0ax.js";import"./swc.Cf9Klqt6.js";import"./swc.CslJ8xa1.js";import"./swc.CJygKO7k.js";import"./swc.DNFUN176.js";import"./swc.joKBDlkt.js";import"./swc.Bs8cprZZ.js";import"./swc.D1tPGqVW.js";import"./swc.C9c2jlOq.js";import"./swc.B-Ft4k-B.js";import"./swc.DEjS0Rv7.js";import"./swc.8Y9xgsp7.js";import"./swc.BZr5GQmS.js";import"./swc.BlIgIdkB.js";import"./swc.D72_1xyA.js";import"./swc.BesWcX0D.js";import"./swc.1CglYmuO.js";import"./swc.C_zUl24X.js";import"./swc.CT6BXfq8.js";import"./swc.D_As-1mY.js";import"./swc.mUX8iMJZ.js";import"./swc.DECLp9dF.js";import"./swc.9Yzx-IXX.js";import"./swc.pp6veDvY.js";import"./swc.Bj4ZbN33.js";const l=t`
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
                .type=${"modal"!==this.type?"auto":"modal"}
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
//# sourceMappingURL=swc.DDDEvU5y.js.map
