"use strict";var m=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var n=(p,l,e,r)=>{for(var t=r>1?void 0:r?u(l,e):l,s=p.length-1,i;s>=0;s--)(i=p[s])&&(t=(r?i(l,e,t):i(t))||t);return r&&t&&m(l,e,t),t};import{html as a,SpectrumElement as v}from"@spectrum-web-components/base";import{property as o,query as h,state as c}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/overlay/sp-overlay.js";import y from"./overlay-trigger.css.js";export class OverlayTrigger extends v{constructor(){super(...arguments);this.offset=6;this.disabled=!1;this.receivesFocus="auto";this.clickContent=[];this.longpressContent=[];this.hoverContent=[];this.targetContent=[]}static get styles(){return[y]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target);break}}handleBeforetoggle(e){const{target:r}=e;let t;if(r===this.clickOverlayElement)t="click";else if(r===this.longpressOverlayElement)t="longpress";else if(r===this.hoverOverlayElement)t="hover";else return;e.newState==="open"?this.open=t:this.open===t&&(this.open=void 0)}update(e){var r,t,s,i,d,g;e.has("clickContent")&&(this.clickPlacement=((r=this.clickContent[0])==null?void 0:r.getAttribute("placement"))||((t=this.clickContent[0])==null?void 0:t.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=((s=this.hoverContent[0])==null?void 0:s.getAttribute("placement"))||((i=this.hoverContent[0])==null?void 0:i.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=((d=this.longpressContent[0])==null?void 0:d.getAttribute("placement"))||((g=this.longpressContent[0])==null?void 0:g.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return a`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var t;const e=this.renderSlot("click-content"),r=a`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${this.open==="click"&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type!=="modal"?"auto":"modal"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${e}
            </sp-overlay>
        `;return(t=this.triggeredBy)!=null&&t.includes("click")||this.clickContent.length?r:e}renderHoverOverlay(){var t;const e=this.renderSlot("hover-content"),r=a`
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
        `;return(t=this.triggeredBy)!=null&&t.includes("hover")||this.hoverContent.length?r:e}renderLongpressOverlay(){var t;const e=this.renderSlot("longpress-content"),r=a`
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
        `;return(t=this.triggeredBy)!=null&&t.includes("longpress")||this.longpressContent.length?r:e}render(){return a`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(e){if(super.updated(e),this.disabled&&e.has("disabled")){this.open=void 0;return}}async getUpdateComplete(){return await super.getUpdateComplete()}}n([o({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),n([o({reflect:!0})],OverlayTrigger.prototype,"placement",2),n([o()],OverlayTrigger.prototype,"type",2),n([o({type:Number})],OverlayTrigger.prototype,"offset",2),n([o({reflect:!0})],OverlayTrigger.prototype,"open",2),n([o({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),n([o({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),n([c()],OverlayTrigger.prototype,"clickContent",2),n([c()],OverlayTrigger.prototype,"longpressContent",2),n([c()],OverlayTrigger.prototype,"hoverContent",2),n([c()],OverlayTrigger.prototype,"targetContent",2),n([h("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),n([h("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),n([h("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2);
//# sourceMappingURL=OverlayTrigger.js.map
