import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-tO8-r1bu.js';
import { i } from './lit-element-xBOPiTek.js';
import { t } from './state-W6so4P5i.js';
import { x } from './lit-html-GmIhAbMP.js';
import { i as i$1 } from './query-JMOstM_r.js';

const s=i`
    :host([disabled]) ::slotted([slot=trigger]){pointer-events:none}slot[name=longpress-describedby-descriptor]{display:none}
`;var f = s;

var g=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var n=(c,a,e,o)=>{for(var t=o>1?void 0:o?v(a,e):a,l=c.length-1,s;l>=0;l--)(s=c[l])&&(t=(o?s(a,e,t):s(t))||t);return o&&t&&g(a,e,t),t};class OverlayTrigger extends SpectrumElement{constructor(){super(...arguments);this.content="click hover longpress";this.offset=6;this.disabled=!1;this.clickContent=[];this.longpressContent=[];this.hoverContent=[];this.targetContent=[];}static get styles(){return [f]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target);}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target);break}}handleBeforetoggle(e){const{target:o}=e;let t;if(o===this.clickOverlayElement)t="click";else if(o===this.longpressOverlayElement)t="longpress";else if(o===this.hoverOverlayElement)t="hover";else return;e.newState==="open"?this.open=t:this.open===t&&(this.open=void 0);}update(e){var o,t,l,s,d,m;e.has("clickContent")&&(this.clickPlacement=((o=this.clickContent[0])==null?void 0:o.getAttribute("placement"))||((t=this.clickContent[0])==null?void 0:t.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=((l=this.hoverContent[0])==null?void 0:l.getAttribute("placement"))||((s=this.hoverContent[0])==null?void 0:s.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=((d=this.longpressContent[0])==null?void 0:d.getAttribute("placement"))||((m=this.longpressContent[0])==null?void 0:m.getAttribute("direction"))||void 0),super.update(e);}renderSlot(e){return x`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){import('./sp-overlay-8v49LtLr.js').then(function (n) { return n.a; });const e=this.renderSlot("click-content");return this.clickContent.length?x`
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
            >
                ${e}
            </sp-overlay>
        `:e}renderHoverOverlay(){import('./sp-overlay-8v49LtLr.js').then(function (n) { return n.a; });const e=this.renderSlot("hover-content");return this.hoverContent.length?x`
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
            >
                ${e}
            </sp-overlay>
        `:e}renderLongpressOverlay(){import('./sp-overlay-8v49LtLr.js').then(function (n) { return n.a; });const e=this.renderSlot("longpress-content");return this.longpressContent.length?x`
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
            >
                ${e}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `:e}render(){const e=this.content.split(" ");return x`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[e.includes("click")?this.renderClickOverlay():x``,e.includes("hover")?this.renderHoverOverlay():x``,e.includes("longpress")?this.renderLongpressOverlay():x``]}
        `}updated(e){if(super.updated(e),this.disabled&&e.has("disabled")){this.open=void 0;return}}async getUpdateComplete(){return await super.getUpdateComplete()}}n([n$1()],OverlayTrigger.prototype,"content",2),n([n$1({reflect:!0})],OverlayTrigger.prototype,"placement",2),n([n$1()],OverlayTrigger.prototype,"type",2),n([n$1({type:Number})],OverlayTrigger.prototype,"offset",2),n([n$1({reflect:!0})],OverlayTrigger.prototype,"open",2),n([n$1({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),n([t()],OverlayTrigger.prototype,"clickContent",2),n([t()],OverlayTrigger.prototype,"longpressContent",2),n([t()],OverlayTrigger.prototype,"hoverContent",2),n([t()],OverlayTrigger.prototype,"targetContent",2),n([i$1("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),n([i$1("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),n([i$1("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2);

defineElement("overlay-trigger",OverlayTrigger);
