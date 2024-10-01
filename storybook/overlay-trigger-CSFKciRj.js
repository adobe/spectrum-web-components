import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-C_3bgzm7.js';
import { i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-DrummH0c.js';
import { e } from './query-DQF6X5qW.js';

const s=i`
    :host([disabled]) ::slotted([slot=trigger]){pointer-events:none}slot[name=longpress-describedby-descriptor]{display:none}
`;

var g=Object.defineProperty;var n=(p,a,e,o)=>{for(var t=void 0,l=p.length-1,i;l>=0;l--)(i=p[l])&&(t=(i(a,e,t))||t);return t&&g(a,e,t),t};class OverlayTrigger extends SpectrumElement{constructor(){super(...arguments);this.content="click hover longpress";this.offset=6;this.disabled=!1;this.receivesFocus="auto";this.clickContent=[];this.longpressContent=[];this.hoverContent=[];this.targetContent=[];}static get styles(){return [s]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target);}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target);break}}handleBeforetoggle(e){const{target:o}=e;let t;if(o===this.clickOverlayElement)t="click";else if(o===this.longpressOverlayElement)t="longpress";else if(o===this.hoverOverlayElement)t="hover";else return;e.newState==="open"?this.open=t:this.open===t&&(this.open=void 0);}update(e){var o,t,l,i,d,m;e.has("clickContent")&&(this.clickPlacement=((o=this.clickContent[0])==null?void 0:o.getAttribute("placement"))||((t=this.clickContent[0])==null?void 0:t.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=((l=this.hoverContent[0])==null?void 0:l.getAttribute("placement"))||((i=this.hoverContent[0])==null?void 0:i.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=((d=this.longpressContent[0])==null?void 0:d.getAttribute("placement"))||((m=this.longpressContent[0])==null?void 0:m.getAttribute("direction"))||void 0),super.update(e);}renderSlot(e){return x`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){import('./sp-overlay-DzkklhP1.js');const e=this.renderSlot("click-content");return this.clickContent.length?x`
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
        `:e}renderHoverOverlay(){import('./sp-overlay-DzkklhP1.js');const e=this.renderSlot("hover-content");return this.hoverContent.length?x`
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
        `:e}renderLongpressOverlay(){import('./sp-overlay-DzkklhP1.js');const e=this.renderSlot("longpress-content");return this.longpressContent.length?x`
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
        `:e}render(){const e=this.content.split(" ");return x`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[e.includes("click")?this.renderClickOverlay():x``,e.includes("hover")?this.renderHoverOverlay():x``,e.includes("longpress")?this.renderLongpressOverlay():x``]}
        `}updated(e){if(super.updated(e),this.disabled&&e.has("disabled")){this.open=void 0;return}}async getUpdateComplete(){return await super.getUpdateComplete()}}n([n$1()],OverlayTrigger.prototype,"content"),n([n$1({reflect:!0})],OverlayTrigger.prototype,"placement"),n([n$1()],OverlayTrigger.prototype,"type"),n([n$1({type:Number})],OverlayTrigger.prototype,"offset"),n([n$1({reflect:!0})],OverlayTrigger.prototype,"open"),n([n$1({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled"),n([n$1({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus"),n([r()],OverlayTrigger.prototype,"clickContent"),n([r()],OverlayTrigger.prototype,"longpressContent"),n([r()],OverlayTrigger.prototype,"hoverContent"),n([r()],OverlayTrigger.prototype,"targetContent"),n([e("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement"),n([e("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement"),n([e("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement");

defineElement("overlay-trigger",OverlayTrigger);
