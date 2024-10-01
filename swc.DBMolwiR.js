import"./swc.BN3xN0Em.js";import{d as e}from"./swc.JlveB6nj.js";import{i as t}from"./swc.Cl2X6-fK.js";import{S as s}from"./swc.4Nhb811A.js";import{x as o}from"./swc.BkWj9Vim.js";import{n as r}from"./swc.Cbbf2bfB.js";import{r as n}from"./swc.DyUZL4_b.js";import{a as i}from"./swc.DeJGzahI.js";import"./swc.DojBkldy.js";import"./swc.Bm8-gPZ5.js";import"./swc.DTeFATV9.js";import"./swc.fxarMd8g.js";import"./swc.C6fsA1lC.js";import"./swc.CZXG40iN.js";import"./swc.GoHG65X7.js";import"./swc.BE30nXte.js";import"./swc.VlRJW7SU.js";import"./swc.CbstJgcW.js";import"./swc.DObQQFbj.js";import"./swc.uvftdZPN.js";import"./swc.BkNr85_9.js";import"./swc.DZ-KXoZp.js";import"./swc.CTIs_7Cn.js";import"./swc.CQRyBxbm.js";import"./swc.CJygKO7k.js";import"./swc.D4ttv40i.js";import"./swc.C23tcYQm.js";import"./swc.Bs8cprZZ.js";import"./swc.D1tPGqVW.js";import"./swc.C9c2jlOq.js";import"./swc.BesxAbQZ.js";import"./swc.DUCLOq0Y.js";import"./swc.8Y9xgsp7.js";import"./swc.DYbUmur_.js";import"./swc.CBXJ4PuA.js";import"./swc.Bj4ZbN33.js";const l=t`
    :host([disabled]) ::slotted([slot=trigger]){pointer-events:none}slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(e,t,s,o)=>{for(var r,n=void 0,i=e.length-1;i>=0;i--)(r=e[i])&&(n=r(t,s,n)||n);return n&&c(t,s,n),n};class h extends s{constructor(){super(...arguments),this.content="click hover longpress",this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[l]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target)}}handleBeforetoggle(e){const{target:t}=e;let s;if(t===this.clickOverlayElement)s="click";else if(t===this.longpressOverlayElement)s="longpress";else{if(t!==this.hoverOverlayElement)return;s="hover"}"open"===e.newState?this.open=s:this.open===s&&(this.open=void 0)}update(e){var t,s,o,r,n,i;e.has("clickContent")&&(this.clickPlacement=(null==(t=this.clickContent[0])?void 0:t.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=(null==(o=this.hoverContent[0])?void 0:o.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(i=this.longpressContent[0])?void 0:i.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return o`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){import("./swc.B3OTxlIz.js");const e=this.renderSlot("click-content");return this.clickContent.length?o`
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
        `:e}renderHoverOverlay(){import("./swc.B3OTxlIz.js");const e=this.renderSlot("hover-content");return this.hoverContent.length?o`
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
        `:e}renderLongpressOverlay(){import("./swc.B3OTxlIz.js");const e=this.renderSlot("longpress-content");return this.longpressContent.length?o`
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
        `:e}render(){const e=this.content.split(" ");return o`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[e.includes("click")?this.renderClickOverlay():o``,e.includes("hover")?this.renderHoverOverlay():o``,e.includes("longpress")?this.renderLongpressOverlay():o``]}
        `}updated(e){super.updated(e),this.disabled&&e.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}p([r()],h.prototype,"content"),p([r({reflect:!0})],h.prototype,"placement"),p([r()],h.prototype,"type"),p([r({type:Number})],h.prototype,"offset"),p([r({reflect:!0})],h.prototype,"open"),p([r({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([r({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([n()],h.prototype,"clickContent"),p([n()],h.prototype,"longpressContent"),p([n()],h.prototype,"hoverContent"),p([n()],h.prototype,"targetContent"),p([i("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([i("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([i("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),e("overlay-trigger",h);
//# sourceMappingURL=swc.CMhKcPIJ.js.map
