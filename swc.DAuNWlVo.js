import"./swc.DTd_n-Pz.js";import"./swc.DH1QaPHY.js";import{i as e}from"./swc.Bk_7Sut8.js";import{C as t,x as s}from"./swc.CPRo5HoP.js";import{n as o}from"./swc.BtPhaoGy.js";import{r}from"./swc.DTrRBp2w.js";import{a as n}from"./swc.DeJGzahI.js";import{o as i}from"./swc.Cxa0JK8L.js";import"./swc.S16c1FAE.js";import"./swc.5sINt3Yr.js";import"./swc.Cj2DIJMh.js";import"./swc.BoVgInom.js";import"./swc.BpdBvyod.js";import"./swc.P0Y0yGp9.js";import"./swc.C0BGAK1o.js";import"./swc.rlzKnk9d.js";import"./swc.BYDKIoNh.js";import"./swc.ofmiI1fb.js";import"./swc.VqjXqM5h.js";import"./swc.CIw_Gjml.js";import"./swc.DhtcN3Mc.js";import"./swc.DUvDxict.js";import"./swc.BagaohEp.js";import"./swc.BOJgI39p.js";import"./swc.Chuw36y7.js";import"./swc.2nobmrB4.js";import"./swc.BEIlFjAO.js";import"./swc.x86Wm3h_.js";import"./swc.B6Ji04pc.js";import"./swc.Byki1UKV.js";import"./swc.eXSZGEDa.js";import"./swc.B9jzRhMv.js";import"./swc.CjPt0-_4.js";import"./swc.CHiHGosR.js";import"./swc.DfF9MWIF.js";import"./swc.teNX5xD7.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.BBj3nFbA.js";import"./swc.Ds_ROb9a.js";import"./swc.JRtZkN6u.js";import"./swc.mUX8iMJZ.js";import"./swc.9slprkso.js";import"./swc.CA-i04Ei.js";import"./swc.kLAuqcRl.js";const l=e`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var c=Object.defineProperty,p=(e,t,s,o)=>{for(var r,n=void 0,i=e.length-1;i>=0;i--)(r=e[i])&&(n=r(t,s,n)||n);return n&&c(t,s,n),n};class h extends t{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[l]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target)}}handleBeforetoggle(e){const{target:t}=e;let s;if(t===this.clickOverlayElement)s="click";else if(t===this.longpressOverlayElement)s="longpress";else{if(t!==this.hoverOverlayElement)return;s="hover"}"open"===e.newState?this.open=s:this.open===s&&(this.open=void 0)}update(e){var t,s,o,r,n,i;e.has("clickContent")&&(this.clickPlacement=(null==(t=this.clickContent[0])?void 0:t.getAttribute("placement"))||(null==(s=this.clickContent[0])?void 0:s.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=(null==(o=this.hoverContent[0])?void 0:o.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(i=this.longpressContent[0])?void 0:i.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return s`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var e;const t=this.renderSlot("click-content"),o=s`
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
        `;return null!=(e=this.triggeredBy)&&e.includes("click")||this.clickContent.length?o:t}renderHoverOverlay(){var e;const t=this.renderSlot("hover-content"),o=s`
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
        `;return null!=(e=this.triggeredBy)&&e.includes("hover")||this.hoverContent.length?o:t}renderLongpressOverlay(){var e;const t=this.renderSlot("longpress-content"),o=s`
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
        `;return null!=(e=this.triggeredBy)&&e.includes("longpress")||this.longpressContent.length?o:t}render(){return s`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(e){super.updated(e),this.disabled&&e.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}p([o({attribute:"triggered-by"})],h.prototype,"triggeredBy"),p([o({reflect:!0})],h.prototype,"placement"),p([o()],h.prototype,"type"),p([o({type:Number})],h.prototype,"offset"),p([o({reflect:!0})],h.prototype,"open"),p([o({type:Boolean,reflect:!0})],h.prototype,"disabled"),p([o({attribute:"receives-focus"})],h.prototype,"receivesFocus"),p([r()],h.prototype,"clickContent"),p([r()],h.prototype,"longpressContent"),p([r()],h.prototype,"hoverContent"),p([r()],h.prototype,"targetContent"),p([n("#click-overlay",!0)],h.prototype,"clickOverlayElement"),p([n("#longpress-overlay",!0)],h.prototype,"longpressOverlayElement"),p([n("#hover-overlay",!0)],h.prototype,"hoverOverlayElement"),i("overlay-trigger",h);
//# sourceMappingURL=swc.Bnsu8mC1.js.map
