import{c as t,t as o}from"./4f31466a.js";import"./c3505920.js";import"./fb3a24b9.js";import{i as e}from"./112b2095.js";import{S as i}from"./52dd9942.js";import{x as r,n,S as s,d as a,A as p}from"./bd0a9f1e.js";import"./6218a3ce.js";import{F as l,i as c,l as d}from"./92bf7466.js";import{O as m}from"./4e68ac05.js";import{o as u}from"./64dd07df.js";import{f as g}from"./9f9c5c08.js";var h=e`
:host{--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-200);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-200)}:host([size=m]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=l]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host{display:flex;flex-wrap:wrap;gap:var(
--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal)
)}::slotted(*){flex-shrink:0}:host([vertical]){display:inline-flex;flex-direction:column;gap:var(
--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical)
)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`,v=Object.defineProperty,b=Object.getOwnPropertyDescriptor;class f extends(i(s)){constructor(){super(...arguments),this.vertical=!1}static get styles(){return[h]}handleSlotchange({target:t}){t.assignedElements().forEach((t=>{t.size=this.size}))}render(){return r`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}((t,o,e,i)=>{for(var r,n=i>1?void 0:i?b(o,e):o,s=t.length-1;s>=0;s--)(r=t[s])&&(n=(i?r(o,e,n):r(n))||n);i&&n&&v(o,e,n)})([n({type:Boolean,reflect:!0})],f.prototype,"vertical",2),a("sp-button-group",f);var y=e`
:host{--spectrum-dialog-fullscreen-header-text-size:28px;--spectrum-dialog-confirm-small-width:400px;--spectrum-dialog-confirm-medium-width:480px;--spectrum-dialog-confirm-large-width:640px;--spectrum-dialog-error-width:var(--spectrum-dialog-confirm-medium-width);--spectrum-dialog-confirm-hero-height:var(
--spectrum-global-dimension-size-1600
);--spectrum-dialog-confirm-description-padding:var(
--spectrum-global-dimension-size-25
);--spectrum-dialog-confirm-description-margin:calc(var(--spectrum-global-dimension-size-25)*-1);--spectrum-dialog-confirm-footer-padding-top:var(
--spectrum-global-dimension-static-size-500,40px
);--spectrum-dialog-confirm-gap-size:var(
--spectrum-global-dimension-size-200
);--spectrum-dialog-confirm-buttongroup-padding-top:var(
--spectrum-global-dimension-static-size-500,40px
);--spectrum-dialog-confirm-close-button-size:var(
--spectrum-global-dimension-size-400
);--spectrum-dialog-confirm-close-button-padding:calc(26px - var(--spectrum-global-dimension-size-175));--spectrum-dialog-confirm-divider-height:var(
--spectrum-global-dimension-static-size-25,2px
)}:host{box-sizing:border-box;display:flex;max-height:inherit;max-width:100%;min-width:var(
--spectrum-dialog-confirm-min-width,var(--spectrum-global-dimension-static-size-3600)
);outline:none;width:-moz-fit-content;width:fit-content}:host([size=s]){width:var(--spectrum-dialog-confirm-small-width)}:host([size=m]){width:var(--spectrum-dialog-confirm-medium-width)}:host([size=l]){width:var(--spectrum-dialog-confirm-large-width)}::slotted([slot=hero]){background-position:50%;background-size:cover;border-top-left-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);border-top-right-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);grid-area:hero;height:var(--spectrum-dialog-confirm-hero-height);overflow:hidden}.grid{display:grid;grid-template-areas:"hero hero hero hero hero hero" ". . . . . ." ". heading header header typeIcon ." ". divider divider divider divider ." ". content content content content ." ". footer footer buttonGroup buttonGroup ." ". . . . . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
);width:100%}:host([dir=ltr]) ::slotted([slot=heading]){padding-right:var(--spectrum-dialog-confirm-gap-size)}:host([dir=rtl]) ::slotted([slot=heading]){padding-left:var(--spectrum-dialog-confirm-gap-size)}::slotted([slot=heading]){font-size:var(--spectrum-dialog-confirm-title-text-size);font-weight:var(
--spectrum-dialog-confirm-title-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);grid-area:heading;line-height:var(
--spectrum-dialog-confirm-title-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin:0;outline:none}:host([dir=ltr]) .no-header::slotted([slot=heading]){padding-right:0}:host([dir=rtl]) .no-header::slotted([slot=heading]){padding-left:0}.no-header::slotted([slot=heading]){grid-area:heading-start/heading-start/header-end/header-end}.header{align-items:center;box-sizing:border-box;display:flex;grid-area:header;justify-content:flex-end;outline:none}.type-icon{grid-area:typeIcon}.divider{grid-area:divider;margin-bottom:var(
--spectrum-dialog-confirm-divider-margin-bottom,var(--spectrum-global-dimension-static-size-200)
);margin-top:var(
--spectrum-dialog-confirm-divider-margin-top,var(--spectrum-global-dimension-static-size-150)
);width:100%}:host([mode=fullscreen]) [name=heading]+.divider{margin-bottom:calc(var(
--spectrum-dialog-confirm-divider-margin-bottom,
var(--spectrum-global-dimension-static-size-200)
) - var(--spectrum-dialog-confirm-description-padding)*2)}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-bottom:calc(var(
--spectrum-dialog-confirm-divider-margin-top,
var(--spectrum-global-dimension-static-size-150)
) + var(
--spectrum-dialog-confirm-divider-margin-bottom,
var(--spectrum-global-dimension-static-size-200)
) + var(
--spectrum-dialog-confirm-divider-height,
var(--spectrum-global-dimension-size-25)
))}.content{-webkit-overflow-scrolling:touch;box-sizing:border-box;font-size:var(--spectrum-dialog-confirm-description-text-size);font-weight:var(
--spectrum-dialog-confirm-description-text-font-weight,var(--spectrum-global-font-weight-regular)
);grid-area:content;line-height:var(
--spectrum-dialog-confirm-description-text-line-height,var(--spectrum-alias-component-text-line-height)
);margin:0 var(--spectrum-dialog-confirm-description-margin);outline:none;overflow-y:auto;padding:calc(var(--spectrum-dialog-confirm-description-padding)*2)}.footer{display:flex;flex-wrap:wrap;grid-area:footer;outline:none;padding-top:var(--spectrum-dialog-confirm-footer-padding-top)}.footer>*,.footer>.spectrum-Button+.spectrum-Button{margin-bottom:0}:host([dir=ltr]) .button-group{padding-left:var(--spectrum-dialog-confirm-gap-size)}:host([dir=rtl]) .button-group{padding-right:var(--spectrum-dialog-confirm-gap-size)}.button-group{display:flex;grid-area:buttonGroup;justify-content:flex-end;padding-top:var(--spectrum-dialog-confirm-buttongroup-padding-top)}.button-group.button-group--noFooter{grid-area:footer-start/footer-start/buttonGroup-end/buttonGroup-end}:host([dismissable]) .grid{grid-template-areas:"hero hero hero hero hero hero hero" ". . . . . closeButton closeButton" ". heading header header typeIcon closeButton closeButton" ". divider divider divider divider divider ." ". content content content content content ." ". footer footer buttonGroup buttonGroup buttonGroup ." ". . . . . . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}:host([dismissable]) .grid .button-group{display:none}:host([dismissable]) .grid .footer{grid-area:footer/footer/buttonGroup/buttonGroup}:host([dir=ltr]) .close-button{margin-right:var(--spectrum-dialog-confirm-close-button-padding)}:host([dir=rtl]) .close-button{margin-left:var(--spectrum-dialog-confirm-close-button-padding)}.close-button{grid-area:closeButton;margin-top:var(--spectrum-dialog-confirm-close-button-padding);place-self:start end}:host([error]){width:var(--spectrum-dialog-error-width,90%)}:host([mode=fullscreen]){height:100%;width:100%}:host([mode=fullscreenTakeover]){border-radius:0;height:100%;width:100%}:host([mode=fullscreenTakeover]),:host([mode=fullscreen]){max-height:none;max-width:none}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:". . . . ." ". heading header buttonGroup ." ". divider divider divider ." ". content content content ." ". . . . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) 1fr auto auto var(
--spectrum-dialog-confirm-padding
);grid-template-rows:var(--spectrum-dialog-confirm-padding) auto auto 1fr var(
--spectrum-dialog-confirm-padding
)}:host([mode=fullscreenTakeover]) ::slotted([slot=heading]),:host([mode=fullscreen]) ::slotted([slot=heading]){font-size:var(--spectrum-dialog-fullscreen-header-text-size)}:host([mode=fullscreenTakeover]) .content,:host([mode=fullscreen]) .content{max-height:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .button-group,:host([mode=fullscreen]) .footer{padding-top:0}:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .footer{display:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreen]) .button-group{align-self:start;grid-area:buttonGroup}@media screen and (max-width:700px){.grid{grid-template-areas:"hero hero hero hero hero hero" ". . . . . ." ". heading heading heading typeIcon ." ". header header header header ." ". divider divider divider divider ." ". content content content content ." ". footer footer buttonGroup buttonGroup ." ". . . . . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}:host([dismissable]) .grid{grid-template-areas:"hero hero hero hero hero hero hero" ". . . . . closeButton closeButton" ". heading heading heading typeIcon closeButton closeButton" ". header header header header header ." ". divider divider divider divider divider ." ". content content content content content ." ". footer footer buttonGroup buttonGroup buttonGroup ." ". . . . . . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}.header{justify-content:flex-start}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:". . ." ". heading ." ". header ." ". divider ." ". content ." ". buttonGroup ." ". . .";grid-template-columns:var(--spectrum-dialog-confirm-padding) 1fr var(
--spectrum-dialog-confirm-padding
);grid-template-rows:var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreen]) .button-group{padding-top:var(--spectrum-dialog-confirm-buttongroup-padding-top)}:host([mode=fullscreenTakeover]) ::slotted([slot=heading]),:host([mode=fullscreen]) ::slotted([slot=heading]){font-size:var(--spectrum-dialog-confirm-title-text-size)}}@media (forced-colors:active){:host{border:solid}}::slotted([slot=heading]){color:var(
--spectrum-dialog-confirm-title-text-color,var(--spectrum-alias-heading-text-color)
)}.content,.footer{color:var(
--spectrum-dialog-confirm-description-text-color,var(--spectrum-global-color-gray-800)
)}.type-icon{color:var(
--spectrum-dialog-confirm-icon-color,var(--spectrum-global-color-gray-900)
)}:host([error]) .type-icon{color:var(
--spectrum-dialog-error-icon-color,var(--spectrum-semantic-negative-icon-color)
)}.content{overflow:hidden}.footer{color:var(
--spectrum-dialog-confirm-description-text-color,var(--spectrum-global-color-gray-800)
)}.content[tabindex]{overflow:auto}::slotted(img[slot=hero]){height:auto;width:100%}.grid{grid-template-areas:"hero hero    hero    hero        hero        hero" ".    .       .       .           .           ." ".    heading heading heading     typeIcon    ." ".    divider divider divider     divider     ." ".    content content content     content     ." ".    footer  footer  buttonGroup buttonGroup ." ".    .       .       .           .           ."}
`,k=Object.defineProperty,T=Object.getOwnPropertyDescriptor,z=(t,o,e,i)=>{for(var r,n=i>1?void 0:i?T(o,e):o,s=t.length-1;s>=0;s--)(r=t[s])&&(n=(i?r(o,e,n):r(n))||n);return i&&n&&k(o,e,n),n};let x=0;function w(t,o){const e=t.assignedElements(),i=[];return e.forEach((t=>{if(t.id)i.push(t.id);else{const e=o+"-"+x++;t.id=e,i.push(e)}})),i}const C=class o extends(l(m(s,['[slot="hero"]','[slot="footer"]','[slot="button"]']))){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.noDivider=!1,this.shouldManageTabOrderForScrolling=()=>{const{offsetHeight:t,scrollHeight:o}=this.contentElement;t<o?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")},this.labelledbyId="sp-dialog-label-"+o.instanceCount++,this.describedbyId="sp-dialog-description-"+o.instanceCount++}static get styles(){return[y]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return r`
            <slot name="hero"></slot>
        `}renderHeading(){return r`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return r`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}renderFooter(){return r`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const t={"button-group":!0,"button-group--noFooter":!this.hasFooter};return r`
            <sp-button-group class=${u(t)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return r`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return r`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?r`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:p}
                ${this.noDivider?p:r`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():p}
                ${this.hasButtons?this.renderButtons():p}
                ${this.dismissable?this.renderDismiss():p}
            </div>
        `}shouldUpdate(t){return t.has("mode")&&this.mode&&(this.dismissable=!1),t.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(t)}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","dialog")}onHeadingSlotchange({target:o}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const e=w(o,this.labelledbyId);e.length&&(this.conditionLabelledby=t(this,"aria-labelledby",e))}onContentSlotChange({target:o}){this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const e=w(o,this.describedbyId);if(e.length&&e.length<4)this.conditionDescribedby=t(this,"aria-describedby",e);else if(!e.length){const o=!!this.id;o||(this.id=this.describedbyId);const e=t(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{e(),o||this.removeAttribute("id")}}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}};C.instanceCount=0,z([c(".close-button")],C.prototype,"closeButton",2),z([c(".content")],C.prototype,"contentElement",2),z([n({type:Boolean,reflect:!0})],C.prototype,"error",2),z([n({type:Boolean,reflect:!0})],C.prototype,"dismissable",2),z([n({type:Boolean,reflect:!0,attribute:"no-divider"})],C.prototype,"noDivider",2),z([n({type:String,reflect:!0})],C.prototype,"mode",2),z([n({type:String,reflect:!0})],C.prototype,"size",2),a("sp-dialog",C);var $=e`
:host([disabled]) ::slotted([slot=trigger]){pointer-events:none}slot[name=longpress-describedby-descriptor]{display:none}
`,E=Object.defineProperty,O=Object.getOwnPropertyDescriptor,j=(t,o,e,i)=>{for(var r,n=i>1?void 0:i?O(o,e):o,s=t.length-1;s>=0;s--)(r=t[s])&&(n=(i?r(o,e,n):r(n))||n);return i&&n&&E(o,e,n),n};class S extends s{constructor(){super(...arguments),this.content="click hover longpress",this.offset=6,this.disabled=!1,this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[$]}getAssignedElementsFromSlot(t){return t.assignedElements({flatten:!0})}handleTriggerContent(t){this.targetContent=this.getAssignedElementsFromSlot(t.target)}handleSlotContent(t){switch(t.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(t.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(t.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(t.target)}}handleBeforetoggle(t){const{target:o}=t;let e;if(o===this.clickOverlayElement)e="click";else if(o===this.longpressOverlayElement)e="longpress";else{if(o!==this.hoverOverlayElement)return;e="hover"}"open"===t.newState?this.open=e:this.open===e&&(this.open=void 0)}update(t){var o,e,i,r,n,s;t.has("clickContent")&&(this.clickPlacement=(null==(o=this.clickContent[0])?void 0:o.getAttribute("placement"))||(null==(e=this.clickContent[0])?void 0:e.getAttribute("direction"))||void 0),t.has("hoverContent")&&(this.hoverPlacement=(null==(i=this.hoverContent[0])?void 0:i.getAttribute("placement"))||(null==(r=this.hoverContent[0])?void 0:r.getAttribute("direction"))||void 0),t.has("longpressContent")&&(this.longpressPlacement=(null==(n=this.longpressContent[0])?void 0:n.getAttribute("placement"))||(null==(s=this.longpressContent[0])?void 0:s.getAttribute("direction"))||void 0),super.update(t)}renderSlot(t){return r`
            <slot name=${t} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){import("./187b5bba.js").then((function(t){return t.s}));const t=this.renderSlot("click-content");return this.clickContent.length?r`
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
            >
                ${t}
            </sp-overlay>
        `:t}renderHoverOverlay(){import("./187b5bba.js").then((function(t){return t.s}));const t=this.renderSlot("hover-content");return this.hoverContent.length?r`
            <sp-overlay
                id="hover-overlay"
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
                ?open=${"hover"===this.open&&!!this.hoverContent.length}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
            >
                ${t}
            </sp-overlay>
        `:t}renderLongpressOverlay(){import("./187b5bba.js").then((function(t){return t.s}));const t=this.renderSlot("longpress-content");return this.longpressContent.length?r`
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
            >
                ${t}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `:t}render(){const t=this.content.split(" ");return r`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[t.includes("click")?this.renderClickOverlay():r``,t.includes("hover")?this.renderHoverOverlay():r``,t.includes("longpress")?this.renderLongpressOverlay():r``]}
        `}updated(t){super.updated(t),this.disabled&&t.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}j([n()],S.prototype,"content",2),j([n({reflect:!0})],S.prototype,"placement",2),j([n()],S.prototype,"type",2),j([n({type:Number})],S.prototype,"offset",2),j([n({reflect:!0})],S.prototype,"open",2),j([n({type:Boolean,reflect:!0})],S.prototype,"disabled",2),j([o()],S.prototype,"clickContent",2),j([o()],S.prototype,"longpressContent",2),j([o()],S.prototype,"hoverContent",2),j([o()],S.prototype,"targetContent",2),j([c("#click-overlay",!0)],S.prototype,"clickOverlayElement",2),j([c("#longpress-overlay",!0)],S.prototype,"longpressOverlayElement",2),j([c("#hover-overlay",!0)],S.prototype,"hoverOverlayElement",2),a("overlay-trigger",S);var B=e`
#tooltip{--spectrum-overlay-animation-distance:6px;--spectrum-overlay-animation-duration:var(
--spectrum-animation-duration-100
);opacity:0;pointer-events:none;transition:transform var(--spectrum-overlay-animation-duration) ease-in-out,opacity var(--spectrum-overlay-animation-duration) ease-in-out,visibility 0s linear var(--spectrum-overlay-animation-duration);visibility:hidden}:host([open]) #tooltip{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([open]) .spectrum-Tooltip--bottom-end,:host([open]) .spectrum-Tooltip--bottom-left,:host([open]) .spectrum-Tooltip--bottom-right,:host([open]) .spectrum-Tooltip--bottom-start,:host([placement*=bottom][open]) #tooltip{--spectrum-overlay-animation-distance:6px;transform:translateY(var(--spectrum-overlay-animation-distance))}:host([open]) #tooltip,:host([open]) .spectrum-Tooltip--top-end,:host([open]) .spectrum-Tooltip--top-left,:host([open]) .spectrum-Tooltip--top-right,:host([open]) .spectrum-Tooltip--top-start,:host([placement*=top][open]) #tooltip{--spectrum-overlay-animation-distance:6px;transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([dir=rtl][open]) .spectrum-Tooltip--start,:host([dir=rtl][open]) .spectrum-Tooltip--start-bottom,:host([dir=rtl][open]) .spectrum-Tooltip--start-top,:host([open]) .spectrum-Tooltip--end,:host([open]) .spectrum-Tooltip--end-bottom,:host([open]) .spectrum-Tooltip--end-top,:host([open]) .spectrum-Tooltip--right-bottom,:host([open]) .spectrum-Tooltip--right-top,:host([placement*=right][open]) #tooltip{--spectrum-overlay-animation-distance:6px;transform:translateX(var(--spectrum-overlay-animation-distance))}:host([dir=rtl][open]) .spectrum-Tooltip--end,:host([dir=rtl][open]) .spectrum-Tooltip--end-bottom,:host([dir=rtl][open]) .spectrum-Tooltip--end-top,:host([open]) .spectrum-Tooltip--left-bottom,:host([open]) .spectrum-Tooltip--left-top,:host([open]) .spectrum-Tooltip--start,:host([open]) .spectrum-Tooltip--start-bottom,:host([open]) .spectrum-Tooltip--start-top,:host([placement*=left][open]) #tooltip{--spectrum-overlay-animation-distance:6px;transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}#tooltip{--spectrum-tooltip-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-tooltip-animation-distance:var(--spectrum-spacing-75);--spectrum-tooltip-margin:0px;--spectrum-tooltip-height:var(--spectrum-component-height-75);--spectrum-tooltip-max-inline-size:var(--spectrum-tooltip-maximum-width);--spectrum-tooltip-border-radius:var(--spectrum-corner-radius-100);--spectrum-tooltip-icon-width:var(--spectrum-workflow-icon-size-50);--spectrum-tooltip-icon-height:var(--spectrum-workflow-icon-size-50);--spectrum-tooltip-font-size:var(--spectrum-font-size-75);--spectrum-tooltip-line-height:var(--spectrum-line-height-100);--spectrum-tooltip-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-tooltip-font-weight:var(--spectrum-regular-font-weight);--spectrum-tooltip-spacing-inline:var(
--spectrum-component-edge-to-text-75
);--spectrum-tooltip-spacing-block-start:var(
--spectrum-component-top-to-text-75
);--spectrum-tooltip-spacing-block-end:var(
--spectrum-component-bottom-to-text-75
);--spectrum-tooltip-icon-spacing-inline-start:var(
--spectrum-text-to-visual-75
);--spectrum-tooltip-icon-spacing-inline-end:var(
--spectrum-text-to-visual-75
);--spectrum-tooltip-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-tooltip-background-color-informative:var(
--spectrum-informative-background-color-default
);--spectrum-tooltip-background-color-positive:var(
--spectrum-positive-background-color-default
);--spectrum-tooltip-background-color-negative:var(
--spectrum-negative-background-color-default
);--spectrum-tooltip-content-color:var(--spectrum-white);--spectrum-tooltip-tip-inline-size:var(--spectrum-tooltip-tip-width);--spectrum-tooltip-tip-block-size:var(--spectrum-tooltip-tip-height);--spectrum-tooltip-tip-square-size:var(--spectrum-tooltip-tip-inline-size);--spectrum-tooltip-tip-height-percentage:50%;--spectrum-tooltip-tip-antialiasing-inset:0.5px;--spectrum-tooltip-pointer-corner-spacing:var(
--spectrum-corner-radius-100
);--spectrum-tooltip-background-color-default:var(
--spectrum-tooltip-backgound-color-default-neutral
)}@media (forced-colors:active){#tooltip{border:1px solid #0000}#tip{--highcontrast-tooltip-background-color-default:CanvasText;--highcontrast-tooltip-background-color-informative:CanvasText;--highcontrast-tooltip-background-color-positive:CanvasText;--highcontrast-tooltip-background-color-negative:CanvasText;forced-color-adjust:none}}#tooltip{-webkit-font-smoothing:antialiased;align-items:center;background-color:var(
--highcontrast-tooltip-background-color-default,var(
--mod-tooltip-background-color-default,var(--spectrum-tooltip-background-color-default)
)
);block-size:auto;border-radius:var(
--mod-tooltip-border-radius,var(--spectrum-tooltip-border-radius)
);box-sizing:border-box;color:var(
--mod-tooltip-content-color,var(--spectrum-tooltip-content-color)
);display:inline-flex;flex-direction:row;font-size:var(--mod-tooltip-font-size,var(--spectrum-tooltip-font-size));font-weight:var(
--mod-tooltip-font-weight,var(--spectrum-tooltip-font-weight)
);inline-size:auto;line-height:var(
--mod-tooltip-line-height,var(--spectrum-tooltip-line-height)
);max-inline-size:var(
--mod-tooltip-max-inline-size,var(--spectrum-tooltip-max-inline-size)
);min-block-size:var(--mod-tooltip-height,var(--spectrum-tooltip-height));padding-inline:var(
--mod-tooltip-spacing-inline,var(--spectrum-tooltip-spacing-inline)
);position:relative;vertical-align:top;word-break:break-word}:host(:lang(ja)) #tooltip,:host(:lang(ko)) #tooltip,:host(:lang(zh)) #tooltip{line-height:var(
--mod-tooltip-cjk-line-height,var(--spectrum-tooltip-cjk-line-height)
)}#tooltip{cursor:default;-webkit-user-select:none;user-select:none}#tooltip p{margin:0}:host([variant=info]) #tooltip{background-color:var(
--highcontrast-tooltip-background-color-informative,var(
--mod-tooltip-background-color-informative,var(--spectrum-tooltip-background-color-informative)
)
)}:host([variant=positive]) #tooltip{background-color:var(
--highcontrast-tooltip-background-color-positive,var(
--mod-tooltip-background-color-positive,var(--spectrum-tooltip-background-color-positive)
)
)}:host([variant=negative]) #tooltip{background-color:var(
--highcontrast-tooltip-background-color-negative,var(
--mod-tooltip-background-color-negative,var(--spectrum-tooltip-background-color-negative)
)
)}#tip{background-color:var(
--highcontrast-tooltip-background-color-default,var(
--mod-tooltip-background-color-default,var(--spectrum-tooltip-background-color-default)
)
);block-size:var(
--mod-tooltip-tip-square-size,var(--spectrum-tooltip-tip-square-size)
);clip-path:polygon(0 calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)),50% var(
--mod-tooltip-tip-height-percentage,var(--spectrum-tooltip-tip-height-percentage)
),100% calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)));inline-size:var(
--mod-tooltip-tip-square-size,var(--spectrum-tooltip-tip-square-size)
);left:50%;position:absolute;top:100%;transform:translateX(-50%)}:host([variant=info]) #tooltip #tip{background-color:var(
--highcontrast-tooltip-background-color-informative,var(
--mod-tooltip-background-color-informative,var(--spectrum-tooltip-background-color-informative)
)
)}:host([variant=positive]) #tooltip #tip{background-color:var(
--highcontrast-tooltip-background-color-positive,var(
--mod-tooltip-background-color-positive,var(--spectrum-tooltip-background-color-positive)
)
)}:host([variant=negative]) #tooltip #tip{background-color:var(
--highcontrast-tooltip-background-color-negative,var(
--mod-tooltip-background-color-negative,var(--spectrum-tooltip-background-color-negative)
)
)}.spectrum-Tooltip--top-end #tip,.spectrum-Tooltip--top-left #tip,.spectrum-Tooltip--top-right #tip,.spectrum-Tooltip--top-start #tip,:host([placement*=top]) #tooltip #tip{top:100%}.spectrum-Tooltip--bottom-end #tip,.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--bottom-right #tip,.spectrum-Tooltip--bottom-start #tip,:host([placement*=bottom]) #tooltip #tip{bottom:100%;clip-path:polygon(50% calc(100% - var(
--mod-tooltip-tip-height-percentage,
var(--spectrum-tooltip-tip-height-percentage)
)),0 calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)),100% calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)));top:auto}.spectrum-Tooltip--bottom-end #tip,.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--bottom-right #tip,.spectrum-Tooltip--bottom-start #tip,.spectrum-Tooltip--top-end #tip,.spectrum-Tooltip--top-left #tip,.spectrum-Tooltip--top-right #tip,.spectrum-Tooltip--top-start #tip{transform:none}.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--top-left #tip{left:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}.spectrum-Tooltip--bottom-right #tip,.spectrum-Tooltip--top-right #tip{left:auto;right:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}.spectrum-Tooltip--bottom-start #tip,.spectrum-Tooltip--top-start #tip{left:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
);right:auto}:host([dir=rtl]) .spectrum-Tooltip--bottom-start #tip,:host([dir=rtl]) .spectrum-Tooltip--top-start #tip{left:auto;right:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}.spectrum-Tooltip--bottom-end #tip,.spectrum-Tooltip--top-end #tip{left:auto;right:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}:host([dir=rtl]) .spectrum-Tooltip--bottom-end #tip,:host([dir=rtl]) .spectrum-Tooltip--top-end #tip{left:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
);right:auto}.spectrum-Tooltip--end #tip,.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip,:host([placement*=left]) #tooltip #tip,:host([placement*=right]) #tooltip #tip{top:50%;transform:translateY(-50%)}.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip{top:auto;transform:none}.spectrum-Tooltip--end #tip,.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,:host([placement*=right]) #tooltip #tip{clip-path:polygon(calc(100% - var(
--mod-tooltip-tip-height-percentage,
var(--spectrum-tooltip-tip-height-percentage)
)) 50%,calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 100%,calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 0);left:auto;right:100%}.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--start #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip,:host([placement*=left]) #tooltip #tip{clip-path:polygon(calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 0,calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 100%,var(
--mod-tooltip-tip-height-percentage,var(--spectrum-tooltip-tip-height-percentage)
) 50%);left:100%}.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start-top #tip{top:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--start-bottom #tip{bottom:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}:host([dir=rtl]) .spectrum-Tooltip--end #tip,:host([dir=rtl]) .spectrum-Tooltip--end-bottom #tip,:host([dir=rtl]) .spectrum-Tooltip--end-top #tip{clip-path:polygon(calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 0,calc(0% - var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 100%,var(
--mod-tooltip-tip-height-percentage,var(--spectrum-tooltip-tip-height-percentage)
) 50%);left:100%;right:auto}:host([dir=rtl]) .spectrum-Tooltip--start #tip,:host([dir=rtl]) .spectrum-Tooltip--start-bottom #tip,:host([dir=rtl]) .spectrum-Tooltip--start-top #tip{clip-path:polygon(var(
--mod-tooltip-tip-height-percentage,var(--spectrum-tooltip-tip-height-percentage)
) 50%,calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 100%,calc(100% + var(
--mod-tooltip-tip-antialiasing-inset,
var(--spectrum-tooltip-tip-antialiasing-inset)
)) 0);left:auto;right:100%}::slotted([slot=icon]){align-self:flex-start;block-size:var(
--mod-tooltip-icon-height,var(--spectrum-tooltip-icon-height)
);flex-shrink:0;inline-size:var(
--mod-tooltip-icon-width,var(--spectrum-tooltip-icon-width)
);margin-block-start:var(
--mod-tooltip-icon-spacing-block-start,var(--spectrum-tooltip-icon-spacing-block-start)
);margin-inline-end:var(
--mod-tooltip-icon-spacing-inline-end,var(--spectrum-tooltip-icon-spacing-inline-end)
);margin-inline-start:calc(var(
--mod-tooltip-icon-spacing-inline-start,
var(--spectrum-tooltip-icon-spacing-inline-start)
) - var(
--mod-tooltip-spacing-inline,
var(--spectrum-tooltip-spacing-inline)
))}#label{line-height:var(
--mod-tooltip-line-height,var(--spectrum-tooltip-line-height)
);margin-block-end:var(
--mod-tooltip-spacing-block-end,var(--spectrum-tooltip-spacing-block-end)
);margin-block-start:var(
--mod-tooltip-spacing-block-start,var(--spectrum-tooltip-spacing-block-start)
)}#tooltip,.spectrum-Tooltip--top-end,.spectrum-Tooltip--top-left,.spectrum-Tooltip--top-right,.spectrum-Tooltip--top-start,:host([placement*=top]) #tooltip{margin-bottom:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--bottom-end,.spectrum-Tooltip--bottom-left,.spectrum-Tooltip--bottom-right,.spectrum-Tooltip--bottom-start,:host([placement*=bottom]) #tooltip{margin-top:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--right-bottom,.spectrum-Tooltip--right-top,:host([placement*=right]) #tooltip{margin-left:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--left-bottom,.spectrum-Tooltip--left-top,:host([placement*=left]) #tooltip{margin-right:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--start,.spectrum-Tooltip--start-bottom,.spectrum-Tooltip--start-top{margin-inline-end:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--end,.spectrum-Tooltip--end-bottom,.spectrum-Tooltip--end-top{margin-inline-start:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}#tooltip{--spectrum-tooltip-backgound-color-default-neutral:var(
--system-spectrum-tooltip-backgound-color-default-neutral
)}:host{display:contents;white-space:normal}#tooltip{inline-size:max-content}:host([placement]) #tooltip{margin:var(--swc-tooltip-margin)}#tip{clip-path:polygon(0 -5%,50% 50%,100% -5%);height:var(--spectrum-tooltip-tip-inline-size)!important;width:var(--spectrum-tooltip-tip-inline-size)!important}#tip[style]{transform:none!important}:host(:not([placement*=top])) #tooltip{margin-bottom:0}:host([placement*=top]) #tooltip #tip{top:100%}:host([placement*=bottom]) #tooltip #tip{bottom:100%;clip-path:polygon(50% 50%,0 105%,100% 105%);top:auto}:host([placement*=left]) #tooltip #tip,:host([placement*=right]) #tooltip #tip{top:50%;transform:translateY(-50%)}:host([placement*=right]) #tooltip #tip{clip-path:polygon(50% 50%,105% 100%,105% 0);left:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
)*-2);right:100%}:host([placement*=left]) #tooltip #tip{clip-path:polygon(-5% 0,-5% 100%,50% 50%);left:100%}
`,P=Object.defineProperty,G=Object.getOwnPropertyDescriptor,A=(t,o,e,i)=>{for(var r,n=i>1?void 0:i?G(o,e):o,s=t.length-1;s>=0;s--)(r=t[s])&&(n=(i?r(o,e,n):r(n))||n);return i&&n&&P(o,e,n),n};class F extends HTMLElement{constructor(){super(),this._open=!1,this._placement="top",this.addEventListener("sp-opened",this.redispatchEvent),this.addEventListener("sp-closed",this.redispatchEvent)}redispatchEvent(t){t.stopPropagation(),this.tooltip.dispatchEvent(new CustomEvent(t.type,{bubbles:t.bubbles,composed:t.composed,detail:t.detail}))}get tooltip(){return this.getRootNode().host}static get observedAttributes(){return["open","placement"]}attributeChangedCallback(t,o,e){switch(t){case"open":this.open=null!==e;break;case"placement":this.placement=e}}set open(t){this._open=t;const{tooltip:o}=this;o&&(o.open=t)}get open(){return this._open}set placement(t){this._placement=t;const{tooltip:o}=this;o&&(o.placement=t)}get placement(){return this._placement}get tipElement(){return this.tooltip.tipElement}}customElements.get("sp-tooltip-openable")||customElements.define("sp-tooltip-openable",F);class I extends s{constructor(){super(...arguments),this.selfManaged=!1,this.offset=0,this.open=!1,this._variant="",this.handleOpenOverlay=()=>{this.open=!0},this.handleCloseOverlay=()=>{this.open=!1}}static get styles(){return[B]}get variant(){return this._variant}set variant(t){if(t!==this.variant){if(["info","positive","negative"].includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}forwardTransitionEvent(t){this.dispatchEvent(new TransitionEvent(t.type,{bubbles:!0,composed:!0,propertyName:t.propertyName}))}get triggerElement(){var t;let o=this.assignedSlot||this,e=o.getRootNode(),i=o.parentElement||e.host||e;for(;null==(t=null==i?void 0:i.matches)||!t.call(i,g);)o=i.assignedSlot||i,e=o.getRootNode(),i=o.parentElement||e.host||e;return i}render(){const t=r`
            <sp-tooltip-openable
                id="tooltip"
                placement=${d(this.placement)}
                @transitionrun=${this.forwardTransitionEvent}
                @transitionend=${this.forwardTransitionEvent}
                @transitioncancel=${this.forwardTransitionEvent}
            >
                <slot name="icon"></slot>
                <span id="label"><slot></slot></span>
                <span id="tip" aria-hidden="true"></span>
            </sp-tooltip-openable>
        `;return this.selfManaged?(import("./187b5bba.js").then((function(t){return t.s})),r`
                <sp-overlay
                    ?open=${this.open}
                    offset=${this.offset}
                    .placement=${this.placement}
                    type="hint"
                    .tipPadding=${this.tipPadding}
                    .triggerInteraction=${"hover"}
                    @sp-opened=${this.handleOpenOverlay}
                    @sp-closed=${this.handleCloseOverlay}
                >
                    ${t}
                </sp-overlay>
            `):t}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{if(!this.selfManaged)return;const t=this.overlayElement;if(t){const o=this.triggerElement;t.triggerElement=o}}))}}A([n({type:Boolean,attribute:"self-managed"})],I.prototype,"selfManaged",2),A([n({type:Number})],I.prototype,"offset",2),A([n({type:Boolean,reflect:!0})],I.prototype,"open",2),A([c("sp-overlay")],I.prototype,"overlayElement",2),A([n({reflect:!0})],I.prototype,"placement",2),A([c("#tip")],I.prototype,"tipElement",2),A([n({type:Number})],I.prototype,"tipPadding",2),A([n({type:String})],I.prototype,"variant",1),a("sp-tooltip",I);
//# sourceMappingURL=df9fcf35.js.map
