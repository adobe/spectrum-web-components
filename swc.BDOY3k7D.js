import"./swc.Bp78ro7q.js";import{d as t}from"./swc.JlveB6nj.js";import"./swc.KM3HTSYc.js";import{i as e}from"./swc.Cl2X6-fK.js";import{S as s}from"./swc.Cmp1canL.js";import{x as o}from"./swc.BkWj9Vim.js";import{n as r}from"./swc.Cbbf2bfB.js";import{r as n}from"./swc.DyUZL4_b.js";import{a as i}from"./swc.DeJGzahI.js";import"./swc.BZNYWjDU.js";import"./swc.B5cLusi5.js";import"./swc.fxarMd8g.js";import"./swc.B4vm8-NM.js";import"./swc.CzgZrZGT.js";import"./swc.YlKW2-tc.js";import"./swc.CkU46rMY.js";import"./swc.BeOzoba5.js";import"./swc.DkGVgwTs.js";import"./swc.Dns-OV24.js";import"./swc.Djdd_Ex_.js";import"./swc.BkNr85_9.js";import"./swc.D5Cg2mc4.js";import"./swc.BL6uihlp.js";import"./swc.J6T8MkBB.js";import"./swc.DqaId2P6.js";import"./swc.CJygKO7k.js";import"./swc.CS21GliY.js";import"./swc.Bs3mWFVC.js";import"./swc.Bs8cprZZ.js";import"./swc.D1tPGqVW.js";import"./swc.C9c2jlOq.js";import"./swc.Ba4QXIE1.js";import"./swc.DUCLOq0Y.js";import"./swc.8Y9xgsp7.js";import"./swc.CoIyfs-H.js";import"./swc.BlIgIdkB.js";import"./swc.D-r6SdUy.js";import"./swc.BesWcX0D.js";import"./swc.1CglYmuO.js";import"./swc.BVNzGKVV.js";import"./swc.X-1rbG7h.js";import"./swc.D_As-1mY.js";import"./swc.mUX8iMJZ.js";import"./swc.sHGJnUZ4.js";import"./swc.9Yzx-IXX.js";import"./swc.ClQVwxX2.js";import"./swc.Bj4ZbN33.js";const l=e`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(t,e,s,o)=>{for(var r,n=void 0,i=t.length-1;i>=0;i--)(r=t[i])&&(n=r(e,s,n)||n);return n&&c(e,s,n),n};class h extends s{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[l]}getAssignedElementsFromSlot(t){return t.assignedElements({flatten:!0})}handleTriggerContent(t){this.targetContent=this.getAssignedElementsFromSlot(t.target)}handleSlotContent(t){switch(t.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(t.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(t.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(t.target)}}handleBeforetoggle(t){const{target:e}=t;let s;if(e===this.clickOverlayElement)s="click";else if(e===this.longpressOverlayElement)s="longpress";else{if(e!==this.hoverOverlayElement)return;s="hover"}"open"===t.newState?this.open=s:this.open===s&&(this.open=void 0)}update(t){var e,s,o,r,n,i;t.has("clickContent")&&(this.clickPlacement=(null==(e=this.clickContent[0])?void 0:e.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),t.has("hoverContent")&&(this.hoverPlacement=(null==(o=this.hoverContent[0])?void 0:o.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),t.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(i=this.longpressContent[0])?void 0:i.getAttribute("direction"))||void 0),super.update(t)}renderSlot(t){return o`
            <slot name=${t} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var t;const e=this.renderSlot("click-content"),s=o`
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
                ${e}
            </sp-overlay>
        `;return null!=(t=this.triggeredBy)&&t.includes("click")||this.clickContent.length?s:e}renderHoverOverlay(){var t;const e=this.renderSlot("hover-content"),s=o`
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
        `;return null!=(t=this.triggeredBy)&&t.includes("hover")||this.hoverContent.length?s:e}renderLongpressOverlay(){var t;const e=this.renderSlot("longpress-content"),s=o`
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
        `;return null!=(t=this.triggeredBy)&&t.includes("longpress")||this.longpressContent.length?s:e}render(){return o`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(t){super.updated(t),this.disabled&&t.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}p([r({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([r({reflect:!0})],h.prototype,"placement"),p([r()],h.prototype,"type"),p([r({type:Number})],h.prototype,"offset"),p([r({reflect:!0})],h.prototype,"open"),p([r({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([r({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([n()],h.prototype,"clickContent"),p([n()],h.prototype,"longpressContent"),p([n()],h.prototype,"hoverContent"),p([n()],h.prototype,"targetContent"),p([i("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([i("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([i("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),t("overlay-trigger",h);
//# sourceMappingURL=swc.CJMiCFl6.js.map
