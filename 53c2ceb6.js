import{F as t,R as e}from"./464e15ff.js";import{i as r}from"./d230bd74.js";import{x as o,S as i,y as s,e as a,b as c,s as l,w as n,l as d}from"./99636b0a.js";import{o as u,O as p,a as h}from"./896fcf65.js";import{e as m,b as g,c as b,a as v,S as f,t as k,l as y,L as w,i as z,F as x}from"./01bc7f71.js";import"./62901464.js";import{o as P,C,P as B,h as S}from"./530d97c9.js";import{s as T}from"./7fcdc41b.js";import"./12af0392.js";import{M as $,T as q,a as E}from"./2b7a1ff1.js";import{C as L}from"./1726438b.js";import{h as O}from"./36ecacc5.js";import{o as A,t as M}from"./01f3db1c.js";import{c as D,a as H}from"./2989aa79.js";import{c as I}from"./c93980f2.js";import"./e3d6b3c7.js";import{f as j,o as F}from"./dd88da48.js";import{I as _}from"./af22c699.js";import"./ac2e81a2.js";import"./693a0a09.js";import{t as U}from"./44514a60.js";import{B as R}from"./21db0c76.js";import{S as N}from"./19633329.js";import"./90e7e7e4.js";import{s as V}from"./c1cad2ad.js";import"./eaf8e780.js";import"./3fa8adb8.js";import"./d3371017.js";import"./f3e5cd12.js";import"./5844fd9e.js";import"./c9804990.js";import"./a3268a6a.js";import"./1e267a98.js";import"./5d9665ce.js";import"./070309fa.js";import"./3af3c7eb.js";import"./11e1ea16.js";import"./039b08f0.js";import"./b891beff.js";import"./b6a9d79c.js";const G=m(class extends g{constructor(t){var e;if(super(t),t.type!==b.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const o=t[r];return null==o?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.vt){this.vt=new Set;for(const t in e)this.vt.add(t);return this.render(e)}this.vt.forEach((t=>{null==e[t]&&(this.vt.delete(t),t.includes("-")?r.removeProperty(t):r[t]="")}));for(const t in e){const o=e[t];null!=o&&(this.vt.add(t),t.includes("-")?r.setProperty(t,o):r[t]=o)}return o}});function K(t){return"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.platform)}function X(){return K(/^iPhone/)}function Y(){return K(/^iPad/)||K(/^Mac/)&&navigator.maxTouchPoints>1}function W(){return function(t){return"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.userAgent)}(/Android/)}var Z=r`
:host([disabled]) ::slotted([slot=trigger]){pointer-events:none}#overlay-content slot{display:none}
`,Q=Object.defineProperty,J=Object.getOwnPropertyDescriptor,tt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?J(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Q(e,r,s),s};const et={touch:"Double tap and long press for additional options",keyboard:"Press Space or Alt+Down Arrow for additional options",mouse:"Click and hold for additional options"},rt=class extends i{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1,this.hasLongpressContent=!1,this._longpressId="longpress-describedby-descriptor",this.abortOverlay=()=>{},this.openStatePromise=Promise.resolve()}static get styles(){return[Z]}handleClose(t){t&&t.detail.interaction!==this.open&&t.detail.interaction!==this.type||this.removeAttribute("open")}render(){return s`
            <slot
                id="trigger"
                @click=${this.onTrigger}
                @longpress=${this.onTrigger}
                @mouseenter=${this.onTrigger}
                @mouseleave=${this.onTrigger}
                @focusin=${this.onTrigger}
                @focusout=${this.onTrigger}
                @sp-closed=${this.handleClose}
                @slotchange=${this.onTargetSlotChange}
                name="trigger"
            ></slot>
            <div id="overlay-content">
                <slot
                    @slotchange=${this.onClickSlotChange}
                    name="click-content"
                ></slot>
                <slot
                    @slotchange=${this.onLongpressSlotChange}
                    name="longpress-content"
                ></slot>
                <slot
                    @slotchange=${this.onHoverSlotChange}
                    name="hover-content"
                ></slot>
                <slot name=${this._longpressId}></slot>
            </div>
        `}updated(t){super.updated(t),this.disabled&&t.has("disabled")?this.closeAllOverlays():(t.has("open")&&this.manageOpen(),t.has("hasLongpressContent")&&this.manageLongpressDescriptor())}manageLongpressDescriptor(){const t=this.querySelector('[slot="trigger"]'),e=t.getAttribute("aria-describedby");let r=e?e.split(/\s+/):[];if(this.hasLongpressContent){this.longpressDescriptor||(this.longpressDescriptor=document.createElement("div"),this.longpressDescriptor.id=this._longpressId,this.longpressDescriptor.slot=this._longpressId);const t=X()||Y()||W()?"touch":"keyboard";this.longpressDescriptor.textContent=et[t],this.appendChild(this.longpressDescriptor),r.push(this._longpressId)}else this.longpressDescriptor&&this.longpressDescriptor.remove(),r=r.filter((t=>t!==this._longpressId));r.length?t.setAttribute("aria-describedby",r.join(" ")):t.removeAttribute("aria-describedby")}closeAllOverlays(){this.abortOverlay&&this.abortOverlay(!0),["closeClickOverlay","closeHoverOverlay","closeLongpressOverlay"].forEach((async t=>{const e=this[t];null!=e&&(delete this[t],(await e)())})),this.overlaidContent=void 0}manageOpen(){var t;({click:()=>this.onTriggerClick(),hover:()=>this.onTriggerMouseEnter(),longpress:()=>this.onTriggerLongpress(),none:()=>this.closeAllOverlays()})[null!=(t=this.open)?t:"none"]()}async openOverlay(t,e,r,o){return this.openStatePromise=new Promise((t=>this.openStateResolver=t)),this.addEventListener("sp-opened",(()=>{this.openStateResolver()}),{once:!0}),this.overlaidContent=r,rt.openOverlay(t,e,r,o)}get overlayOptions(){return{offset:this.offset,placement:this.placement,receivesFocus:this.type&&"inline"!==this.type&&"hover"!==this.open?"auto":void 0}}onTrigger(t){if("mouseleave"===t.type&&"hover"===this.open&&t.relatedTarget===this.overlaidContent&&this.overlaidContent)this.overlaidContent.addEventListener("mouseleave",(t=>{t.relatedTarget!==this.targetContent&&this.onTrigger(t)}),{once:!0});else if(!this.disabled)switch(t.type){case"mouseenter":case"focusin":return void(!this.open&&this.hoverContent&&(this.open="hover"));case"mouseleave":case"focusout":return void("hover"===this.open&&this.handleClose());case"click":return void(this.clickContent&&(this.open=t.type));case"longpress":return void(this.longpressContent&&(this._longpressEvent=t,this.open=t.type))}}prepareToFocusOverlayContent(t){"modal"===this.type&&(j(t)||(t.tabIndex=0))}async onTriggerClick(){if(!this.targetContent||!this.clickContent||this.closeClickOverlay)return;const{targetContent:t,clickContent:e}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(e),this.closeClickOverlay=this.openOverlay(t,this.type?this.type:"click",e,this.overlayOptions)}async onTriggerLongpress(){var t,e;if(!this.targetContent||!this.longpressContent||this.closeLongpressOverlay)return;const{targetContent:r,longpressContent:o}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(o);const i="keyboard"!==(null==(e=null==(t=this._longpressEvent)?void 0:t.detail)?void 0:e.source);this.closeLongpressOverlay=this.openOverlay(r,this.type?this.type:"longpress",o,{...this.overlayOptions,receivesFocus:"auto",notImmediatelyClosable:i}),this._longpressEvent=void 0}async onTriggerMouseEnter(){if(!this.targetContent||!this.hoverContent||this.closeHoverOverlay)return;const t=new Promise((t=>{this.abortOverlay=t})),{targetContent:e,hoverContent:r}=this;this.closeHoverOverlay=this.openOverlay(e,"hover",r,{abortPromise:t,...this.overlayOptions})}onClickSlotChange(t){this.clickContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onLongpressSlotChange(t){this.longpressContent=this.extractSlotContentFromEvent(t),this.hasLongpressContent=!!this.longpressContent||!!this.closeLongpressOverlay,this.manageOpen()}onHoverSlotChange(t){this.hoverContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onTargetSlotChange(t){this.targetContent=this.extractSlotContentFromEvent(t)}extractSlotContentFromEvent(t){return t.target.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.openStatePromise,t}disconnectedCallback(){this.closeAllOverlays(),super.disconnectedCallback()}};let ot=rt;ot.openOverlay=async(t,e,r,o)=>P(t,e,r,o),tt([a({reflect:!0})],ot.prototype,"placement",2),tt([a()],ot.prototype,"type",2),tt([a({type:Number,reflect:!0})],ot.prototype,"offset",2),tt([a({reflect:!0})],ot.prototype,"open",2),tt([a({type:Boolean,reflect:!0})],ot.prototype,"disabled",2),tt([U()],ot.prototype,"hasLongpressContent",2);var it=r`
:host{--spectrum-accordion-item-title-padding-y:var(
--spectrum-global-dimension-size-150
);--spectrum-accordion-animation-duration:var(
--spectrum-global-animation-duration-100,130ms
)}:host{display:block;list-style:none;margin:0;padding:0}
`,st=Object.defineProperty,at=Object.getOwnPropertyDescriptor,ct=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?at(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&st(e,r,s),s};class lt extends i{constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new t(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:t=>!t.disabled})}static get styles(){return[it]}get items(){return[...this.defaultNodes||[]].filter((t=>void 0!==t.tagName))}focus(){this.focusGroupController.focus()}async onToggle(t){const e=t.target;if(await 0,this.allowMultiple||t.defaultPrevented)return;const r=[...this.items];r&&!r.length||r.forEach((t=>{t!==e&&(t.open=!1)}))}handleSlotchange(){this.focusGroupController.clearElementCache()}render(){return s`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}ct([a({type:Boolean,reflect:!0,attribute:"allow-multiple"})],lt.prototype,"allowMultiple",2),ct([u()],lt.prototype,"defaultNodes",2),customElements.define("sp-accordion",lt);var nt=r`
:host([dir=ltr]) .indicator{left:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) .indicator{right:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) .indicator{transform:matrix(-1,0,0,1,0,0)}.indicator{display:block;position:absolute;top:calc(50% - var(
--spectrum-accordion-icon-height,
var(--spectrum-global-dimension-size-125)
)/2);transition:transform ease var(--spectrum-accordion-animation-duration)}:host{border-bottom:var(
--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)
) solid transparent;display:list-item;margin:0;position:relative;z-index:inherit}:host(:first-of-type){border-top:var(
--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)
) solid transparent}#heading{box-sizing:border-box;margin:0}:host([dir=ltr]) #header{padding-left:calc(var(
--spectrum-accordion-item-padding-x,
var(--spectrum-global-dimension-size-225)
) + var(
--spectrum-accordion-icon-height,
var(--spectrum-global-dimension-size-125)
) + var(
--spectrum-accordion-icon-gap,
var(--spectrum-global-dimension-size-100)
) + var(
--spectrum-accordion-item-border-left-size,
var(--spectrum-alias-border-size-thick)
))}:host([dir=rtl]) #header{padding-right:calc(var(
--spectrum-accordion-item-padding-x,
var(--spectrum-global-dimension-size-225)
) + var(
--spectrum-accordion-icon-height,
var(--spectrum-global-dimension-size-125)
) + var(
--spectrum-accordion-icon-gap,
var(--spectrum-global-dimension-size-100)
) + var(
--spectrum-accordion-item-border-left-size,
var(--spectrum-alias-border-size-thick)
))}:host([dir=ltr]) #header{padding-right:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) #header{padding-left:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr]) #header{text-align:left}:host([dir=rtl]) #header{text-align:right}#header{align-items:center;appearance:none;background-color:inherit;border:0;box-sizing:border-box;cursor:pointer;display:flex;font-family:inherit;font-size:var(
--spectrum-accordion-item-title-text-size,var(--spectrum-global-dimension-font-size-50)
);font-weight:500;justify-content:flex-start;letter-spacing:calc(var(
--spectrum-accordion-item-title-tracking,
var(--spectrum-global-font-letter-spacing-medium)
)/100);line-height:var(
--spectrum-accordion-text-line-height,var(--spectrum-alias-component-text-line-height)
);margin:0;padding-bottom:var(--spectrum-accordion-item-title-padding-y);padding-top:var(--spectrum-accordion-item-title-padding-y);position:relative;text-overflow:ellipsis;text-transform:uppercase;width:100%}#header:focus{outline:none}:host([dir=ltr]) #header:focus:after{left:0}:host([dir=rtl]) #header:focus:after{right:0}#header:focus:after{bottom:calc(var(
--spectrum-accordion-item-border-size,
var(--spectrum-alias-border-size-thin)
)*-1);content:"";position:absolute;top:calc(var(
--spectrum-accordion-item-border-size,
var(--spectrum-alias-border-size-thin)
)*-1);width:var(
--spectrum-accordion-item-border-left-size,var(--spectrum-alias-border-size-thick)
)}#content{display:none;padding-bottom:var(
--spectrum-accordion-item-content-padding,var(--spectrum-global-dimension-size-200)
);padding-left:var(
--spectrum-accordion-item-content-padding,var(--spectrum-global-dimension-size-200)
);padding-right:var(
--spectrum-accordion-item-content-padding,var(--spectrum-global-dimension-size-200)
);padding-top:0}:host([dir=ltr][open])>#heading>.indicator{transform:rotate(90deg)}:host([dir=rtl][open])>#heading>.indicator{transform:matrix(-1,0,0,1,0,0) rotate(90deg)}:host([dir=ltr][open])>.indicator{transform:rotate(90deg)}:host([dir=rtl][open])>.indicator{transform:matrix(-1,0,0,1,0,0) rotate(90deg)}:host([open])>#content{display:block}:host([disabled]) #header{cursor:default}:host{border-color:var(
--spectrum-accordion-border-color,var(--spectrum-global-color-gray-300)
)}.indicator{color:var(
--spectrum-accordion-icon-color,var(--spectrum-global-color-gray-600)
)}#header{color:var(
--spectrum-accordion-text-color,var(--spectrum-global-color-gray-700)
)}#header:hover{background-color:var(
--spectrum-accordion-item-background-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-accordion-text-color-hover,var(--spectrum-global-color-gray-900)
)}#header:hover+.indicator{color:var(
--spectrum-accordion-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}#header.focus-visible:after{background-color:var(
--spectrum-accordion-item-border-left-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#header.focus-visible:after{background-color:var(
--spectrum-accordion-item-border-left-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#header:focus-visible:after{background-color:var(
--spectrum-accordion-item-border-left-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([open]) #header:hover{background-color:transparent}:host([disabled]) #header,:host([disabled]) #header.focus-visible,:host([disabled]) #header:hover{background-color:transparent;color:var(
--spectrum-accordion-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]) #header,:host([disabled]) #header:focus-visible,:host([disabled]) #header:hover{background-color:transparent;color:var(
--spectrum-accordion-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]) #header+.indicator{color:var(
--spectrum-accordion-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}@media (forced-colors:active){#header.focus-visible{outline:3px solid CanvasText}#header:focus-visible{outline:3px solid CanvasText}}:host{--spectrum-accordion-item-header-height:46px}#indicator{top:calc(50% - var(
--spectrum-accordion-icon-height,
var(--spectrum-global-dimension-size-125)
)/2)}#heading{height:auto;position:relative}#header{min-height:calc(100% - var(
--spectrum-accordion-item-border-size,
var(--spectrum-alias-border-size-thin)
))}:host([open])>#header:after{height:calc(100% - var(
--spectrum-accordion-item-border-size,
var(--spectrum-alias-border-size-thin)
))}
`,dt=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,pt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?ut(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&dt(e,r,s),s};class ht extends v{constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1}static get styles(){return[nt,C]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return s`
            <h3 id="heading">
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </button>
                <sp-icon-chevron100
                    class="indicator spectrum-UIIcon-ChevronRight100"
                ></sp-icon-chevron100>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}pt([a({type:Boolean,reflect:!0})],ht.prototype,"open",2),pt([a({type:String,reflect:!0})],ht.prototype,"label",2),pt([a({type:Boolean,reflect:!0})],ht.prototype,"disabled",2),customElements.define("sp-accordion-item",ht);var mt=r`
:host{--spectrum-actionbar-height:var(
--spectrum-global-dimension-size-600
);--spectrum-actionbar-padding-left:var(
--spectrum-global-dimension-size-200
);--spectrum-actionbar-padding-right:calc(var(--spectrum-global-dimension-size-200)/2);--spectrum-actionbar-margin-x:var(--spectrum-global-dimension-size-200);--spectrum-actionbar-min-width:280px;--spectrum-actionbar-max-width:960px}:host{bottom:0;box-sizing:border-box;display:flex;height:0;justify-content:center;opacity:0;overflow:hidden;padding:0 var(--spectrum-actionbar-margin-x);pointer-events:none;transition:height var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out;z-index:1}:host([open]){height:calc(var(
--spectrum-actionbar-height,
var(--spectrum-global-dimension-size-600)
) + var(--spectrum-actionbar-margin-x)*2);opacity:1}:host([dir=ltr][variant=sticky]){left:0}:host([dir=rtl][variant=sticky]){right:0}:host([dir=ltr][variant=sticky]){right:0}:host([dir=rtl][variant=sticky]){left:0}:host([variant=sticky]){position:sticky}:host([flexible]) #popover{width:auto}:host([variant=fixed]){position:fixed}:host([dir=ltr]) #popover{padding-left:var(
--spectrum-actionbar-padding-left
)}:host([dir=rtl]) #popover{padding-right:var(
--spectrum-actionbar-padding-left
)}:host([dir=ltr]) #popover{padding-right:var(
--spectrum-actionbar-padding-right
)}:host([dir=rtl]) #popover{padding-left:var(
--spectrum-actionbar-padding-right
)}#popover{align-items:center;box-sizing:border-box;flex-direction:row;height:var(
--spectrum-actionbar-height,var(--spectrum-global-dimension-size-600)
);justify-content:space-between;margin:auto;max-width:var(
--spectrum-actionbar-max-width,var(--spectrum-global-dimension-static-size-3500)
);min-width:var(
--spectrum-actionbar-min-width,var(--spectrum-global-dimension-static-size-3500)
);pointer-events:auto;position:relative;width:100%}
`,gt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,vt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?bt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&gt(e,r,s),s};const ft=["sticky","fixed"];class kt extends i{constructor(){super(...arguments),this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[mt]}set variant(t){if(t!==this.variant){if(ft.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}render(){return s`
            <sp-popover ?open=${this.open} id="popover">
                <slot></slot>
            </sp-popover>
        `}}vt([a({type:Boolean,reflect:!0})],kt.prototype,"flexible",2),vt([a({type:Boolean,reflect:!0})],kt.prototype,"open",2),vt([a({type:String,reflect:!0})],kt.prototype,"variant",1),customElements.define("sp-action-bar",kt);var yt=r`
:host{--spectrum-actiongroup-button-spacing-reset:0;--spectrum-actiongroup-border-radius-reset:0;--spectrum-actiongroup-border-radius:var(--spectrum-corner-radius-100)}:host([size=s]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-75
);--spectrum-actiongroup-vertical-spacing-regular:var(--spectrum-spacing-75)}:host([size=m]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-100
);--spectrum-actiongroup-vertical-spacing-regular:var(
--spectrum-spacing-100
)}:host([size=l]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-100
);--spectrum-actiongroup-vertical-spacing-regular:var(
--spectrum-spacing-100
)}:host([size=xl]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-100
);--spectrum-actiongroup-vertical-spacing-regular:var(
--spectrum-spacing-100
)}:host{display:flex;flex-wrap:wrap;gap:var(
--mod-actiongroup-horizontal-spacing-regular,var(--spectrum-actiongroup-horizontal-spacing-regular)
)}::slotted(*){flex-shrink:0}:host(:not([vertical]):not([compact])) ::slotted(*){flex-shrink:0}:host([vertical]){display:inline-flex;flex-direction:column;gap:var(
--mod-actiongroup-vertical-spacing-regular,var(--spectrum-actiongroup-vertical-spacing-regular)
)}:host([compact]){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact]:not([quiet])){flex-wrap:nowrap}:host([compact]:not([quiet])) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
);position:relative;z-index:0}:host([compact]:not([quiet])) ::slotted(:first-child){--spectrum-actionbutton-focus-ring-border-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px 0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])) ::slotted(:not(:first-child)){--spectrum-actionbutton-focus-ring-border-radius:0px;margin-inline-end:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
);margin-inline-start:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
)}:host([compact]:not([quiet])) ::slotted(:last-child){--spectrum-actionbutton-focus-ring-border-radius:0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px;border-end-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-inline-end:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
);margin-inline-start:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
)}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([compact][vertical]:not([quiet])){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact][vertical]:not([quiet])) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
)}:host([compact][vertical]:not([quiet])) ::slotted(:first-child){--spectrum-actionbutton-focus-ring-border-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px 0px;border-start-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-block-end:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-block-start:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-inline-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact][vertical]:not([quiet])) ::slotted(:not(:first-child)){margin-block-end:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-block-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact][vertical]:not([quiet])) ::slotted(:last-child){--spectrum-actionbutton-focus-ring-border-radius:0px 0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-block-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-block-start:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
)}:host([justified]) ::slotted(*){flex:1}:host{--spectrum-actiongroup-gap-size-compact:var(
--system-spectrum-actiongroup-gap-size-compact
);--spectrum-actiongroup-horizontal-spacing-compact:var(
--system-spectrum-actiongroup-horizontal-spacing-compact
);--spectrum-actiongroup-vertical-spacing-compact:var(
--system-spectrum-actiongroup-vertical-spacing-compact
)}:host([size=xs]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-75
);--spectrum-actiongroup-vertical-spacing-regular:var(--spectrum-spacing-75)}:host([dir][compact][vertical]) ::slotted(:nth-child(n)){margin-left:0;margin-right:0}:host([justified]) ::slotted(:not([role])),:host([vertical]) ::slotted(:not([role])){align-items:stretch;display:flex;flex-direction:column}:host([compact]:not([quiet])) ::slotted(:not([role])){--overriden-border-radius:0;--mod-actionbutton-border-radius:var(--overriden-border-radius)}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([compact]:not([quiet])) ::slotted(*){--mod-actionbutton-focus-ring-border-radius:0}:host([compact][vertical]:not([quiet])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}
`,wt=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,xt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?zt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&wt(e,r,s),s};const Pt=[];class Ct extends(f(i,{validSizes:["xs","s","m","l","xl"]})){constructor(){super(),this._buttons=[],this._buttonSelector="sp-action-button",this.rovingTabindexController=new e(this,{focusInIndex:t=>{let e=-1;const r=t.findIndex(((r,o)=>(!t[e]&&!r.disabled&&(e=o),r.selected&&!r.disabled)));return t[r]?r:e},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this._selected=Pt,this.manageButtons=()=>{const t=this.shadowRoot.querySelector("slot");if(!t)return;const e=t.assignedElements({flatten:!0}).reduce(((t,e)=>{if(e.matches(this._buttonSelector))t.push(e);else{const r=Array.from(e.querySelectorAll(`:scope > ${this._buttonSelector}`));t.push(...r)}return t}),[]);this.buttons=e;const r=[];this.buttons.forEach((t=>{t.selected&&r.push(t.value)})),this.setSelected(this.selected.concat(r)),this.manageChildren(),this.manageSelects()},new k(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons()}})}static get styles(){return[yt]}set buttons(t){t!==this.buttons&&(this._buttons=t,this.rovingTabindexController.clearElementCache())}get buttons(){return this._buttons}set selected(t){this.requestUpdate("selected",this._selected),this._selected=t,this.updateComplete.then((()=>{this.applySelects(),this.manageChildren()}))}get selected(){return this._selected}dispatchChange(t){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(t),this.buttons.map((t=>{t.selected=this.selected.includes(t.value)})))}setSelected(t,e){if(t===this.selected)return;const r=this.selected;this.requestUpdate("selected",r),this._selected=t,e&&this.dispatchChange(r)}focus(t){this.rovingTabindexController.focus(t)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute("aria-checked","false")}))}handleClick(t){const e=t.target;if(void 0!==e.value)switch(this.selects){case"single":this.deselectSelectedButtons(),e.selected=!0,e.tabIndex=0,e.setAttribute("aria-checked","true"),this.setSelected([e.value],!0),e.focus();break;case"multiple":{const t=[...this.selected];e.selected=!e.selected,e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected?t.push(e.value):t.splice(this.selected.indexOf(e.value),1),this.setSelected(t,!0),this.buttons.forEach((t=>{t.tabIndex=-1})),e.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0)}async manageSelects(t){if(!this.buttons.length)return;const e=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("role","radio"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&r.push(t)}));if(t)break;await Promise.all(o);const i=r.map((t=>t.value));this.setSelected(i||Pt);break}case"multiple":{this.setAttribute("role","group");const r=[],o=[],i=e.map((async t=>{await t.updateComplete,t.setAttribute("role","checkbox"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&(r.push(t.value),o.push(t))}));if(t)break;await Promise.all(i);const s=r.length?r:Pt;this.setSelected(s);break}default:if(!this.selected.length){this.buttons.forEach((t=>{t.setAttribute("role","button")})),this.removeAttribute("role");break}{const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("aria-checked",t.selected?"true":"false"),t.setAttribute("role","button"),t.selected&&r.push(t)}));if(t)break;await Promise.all(o),this.setSelected(r.map((t=>t.value)))}}}render(){return s`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}updated(t){super.updated(t),t.has("selects")&&(this.manageSelects(),this.manageChildren()),(t.has("quiet")&&this.quiet||t.has("emphasized")&&this.emphasized||t.has("size")&&this.size)&&this.manageChildren(),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(){this.buttons.forEach((t=>{t.quiet=this.quiet,t.emphasized=this.emphasized,t.selected=this.selected.includes(t.value),t.size=this.size}))}}xt([a({type:Boolean,reflect:!0})],Ct.prototype,"compact",2),xt([a({type:Boolean,reflect:!0})],Ct.prototype,"emphasized",2),xt([a({type:Boolean,reflect:!0})],Ct.prototype,"justified",2),xt([a({type:String})],Ct.prototype,"label",2),xt([a({type:Boolean,reflect:!0})],Ct.prototype,"quiet",2),xt([a({type:String})],Ct.prototype,"selects",2),xt([a({type:Boolean,reflect:!0})],Ct.prototype,"vertical",2),xt([a({type:Array})],Ct.prototype,"selected",1),customElements.define("sp-action-group",Ct);var Bt=r`
:host{display:inline-flex}:host([quiet]){min-width:0}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{display:none;max-width:none;width:auto}:host([dir=ltr]) .icon,:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=rtl]) .icon,:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir]) slot[icon-only] .icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-inline-end:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1);margin-inline-start:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1)}
`,St=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor;class $t extends(p(B,"label")){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[Bt]}get hasLabel(){return this.slotHasContent}get buttonContent(){return[s`
                <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel}>
                    <sp-icon-more class="icon"></sp-icon-more>
                </slot>
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
            `]}render(){return s`
            <sp-action-button
                quiet
                ?selected=${this.open}
                aria-haspopup="true"
                aria-controls="popover"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${y(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
        `}update(t){t.has("invalid")&&(this.invalid=!1),this.quiet=!0,super.update(t)}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Tt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&St(e,r,s)})([a({type:String})],$t.prototype,"selects",2),customElements.define("sp-action-menu",$t);var qt=r`
:host{align-items:center;display:flex;height:100%;justify-content:center;width:100%}::slotted(*){max-height:100%;max-width:100%;object-fit:contain;transition:opacity var(--spectrum-global-animation-duration-100,.13s)}.file,.folder{height:100%;margin:var(
--spectrum-asset-icon-margin,var(--spectrum-global-dimension-size-250)
);max-width:var(
--spectrum-asset-icon-max-width,var(--spectrum-global-dimension-static-size-1000)
);min-width:var(
--spectrum-asset-icon-min-width,var(--spectrum-global-dimension-size-600)
);width:100%}.folderBackground{fill:var(
--spectrum-asset-folder-background-color,var(--spectrum-global-color-gray-300)
)}.fileBackground{fill:var(
--spectrum-asset-file-background-color,var(--spectrum-global-color-gray-50)
)}.fileOutline,.folderOutline{fill:var(
--spectrum-asset-icon-outline-color,var(--spectrum-global-color-gray-500)
)}
`,Et=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Ot=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Lt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Et(e,r,s),s};class At extends i{constructor(){super(...arguments),this.label=""}static get styles(){return[qt]}render(){return"file"===this.variant?(t=>s`
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${t||"File"}
    >
        <path
            class="fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
`)(this.label):"folder"===this.variant?(t=>s`
    <svg
        class="folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${t||"Folder"}
    >
        <path
            class="folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
`)(this.label):s`
            <slot></slot>
        `}}Ot([a({type:String,reflect:!0})],At.prototype,"variant",2),Ot([a()],At.prototype,"label",2),customElements.define("sp-asset",At);var Mt=r`
:host{--spectrum-avatar-color-opacity:1;--spectrum-avatar-inline-size:var(--spectrum-avatar-size-100);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100);--spectrum-avatar-border-radius:var(--spectrum-avatar-block-size);--spectrum-avatar-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-avatar-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-avatar-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-avatar-color-opacity-disabled:var(
--spectrum-avatar-opacity-disabled
)}:host([size="50"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-50
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-50)}:host([size="75"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-75
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-75)}:host([size="100"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-100
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100)}:host([size="200"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-200
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-200)}:host([size="300"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-300
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-300)}:host([size="400"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-400
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-400)}:host([size="500"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-500
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-500)}:host([size="600"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-600
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-600)}:host([size="700"]){--spectrum-avatar-inline-size:var(
--spectrum-avatar-size-700
);--spectrum-avatar-block-size:var(--spectrum-avatar-size-700)}@media (forced-colors:active){:host{--highcontrast-avatar-color-opacity-disabled:1;--highcontrast-avatar-focus-indicator-color:CanvasText}}:host{-webkit-user-drag:none;block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-width:0;display:inline-block;inline-size:var(
--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)
);opacity:var(
--mod-avatar-color-opacity,var(--spectrum-avatar-color-opacity)
);outline:none;overflow:visible;position:relative;-webkit-user-select:none;user-select:none}:host([disabled]){opacity:var(
--highcontrast-avatar-color-opacity-disabled,var(
--mod-avatar-color-opacity-disabled,var(--spectrum-avatar-color-opacity-disabled)
)
)}:host(:not([disabled])) .link.focus-visible:after{block-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);border-color:var(
--highcontrast-avatar-focus-indicator-color,var(
--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)
)
);border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-style:solid;border-width:var(
--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)
);content:"";inline-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);inset-block-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);pointer-events:none;position:absolute}:host(:not([disabled])) .link.focus-visible:after{block-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);border-color:var(
--highcontrast-avatar-focus-indicator-color,var(
--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)
)
);border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-style:solid;border-width:var(
--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)
);content:"";inline-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);inset-block-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);pointer-events:none;position:absolute}:host(:not([disabled])) .link:focus-visible:after{block-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);border-color:var(
--highcontrast-avatar-focus-indicator-color,var(
--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)
)
);border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-style:solid;border-width:var(
--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)
);content:"";inline-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);inset-block-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);pointer-events:none;position:absolute}.link{outline-color:transparent;outline-style:solid;outline:none}.image{block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);inline-size:var(
--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)
)}img{vertical-align:top}
`,Dt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,It=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Ht(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Dt(e,r,s),s};const jt=[50,75,100,200,300,400,500,600,700],Ft=jt[2];class _t extends(w(v)){constructor(){super(...arguments),this.src="",this._size=Ft}static get styles(){return[Mt]}get focusElement(){return this.anchorElement||this}get size(){return this._size}set size(t){const e=t,r=jt.includes(e)?e:Ft;if(r&&this.setAttribute("size",`${r}`),this._size===r)return;const o=this._size;this._size=r,this.requestUpdate("size",o)}render(){const t=s`
            <img
                class="image"
                alt=${y(this.label||void 0)}
                src=${this.src}
            />
        `;return this.href?this.renderAnchor({id:"link",className:"link",anchorContent:t}):t}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}It([z("#link")],_t.prototype,"anchorElement",2),It([a()],_t.prototype,"src",2),It([a({type:Number,reflect:!0})],_t.prototype,"size",1),customElements.define("sp-avatar",_t);var Ut=r`
:host{--spectrum-badge-corner-radius:var(
--spectrum-corner-radius-100
);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-badge-label-icon-color-white:var(--spectrum-white);--spectrum-badge-label-icon-color-black:var(--spectrum-black);--spectrum-badge-background-color-default:var(
--spectrum-neutral-subdued-background-color-default
);--spectrum-badge-background-color-accent:var(
--spectrum-accent-background-color-default
);--spectrum-badge-background-color-informative:var(
--spectrum-informative-background-color-default
);--spectrum-badge-background-color-negative:var(
--spectrum-negative-background-color-default
);--spectrum-badge-background-color-positive:var(
--spectrum-positive-background-color-default
);--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-100
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-100
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-100
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-100
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-100
)}:host([size=s]){--spectrum-badge-height:var(
--spectrum-component-height-75
);--spectrum-badge-font-size:var(--spectrum-font-size-75);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-75
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-75
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-75
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-75);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-75
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-75
)}:host([size=m]){--spectrum-badge-height:var(
--spectrum-component-height-100
);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-100
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-100
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-100
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-100
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-100
)}:host([size=l]){--spectrum-badge-height:var(
--spectrum-component-height-100
);--spectrum-badge-font-size:var(--spectrum-font-size-200);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-200
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-200
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-200
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-200);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-200
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-200
)}:host([size=xl]){--spectrum-badge-height:var(
--spectrum-component-height-100
);--spectrum-badge-font-size:var(--spectrum-font-size-300);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-300
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-300
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-300
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-300);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-300
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-300
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-300
)}@media (forced-colors:active){:host{border-color:CanvasText}}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
);border:1px solid transparent;border-radius:var(
--mod-badge-corner-radius,var(--spectrum-badge-corner-radius)
);color:var(
--mod-badge-label-icon-color-white,var(--spectrum-badge-label-icon-color-white)
);cursor:default;display:inline-flex;inline-size:auto;min-block-size:var(
--mod-badge-height,var(--spectrum-badge-height)
);position:relative;vertical-align:middle}.spectrum-Badge--black-text{color:var(
--mod-badge-label-icon-color-black,var(--spectrum-badge-label-icon-color-black)
)}:host([variant=neutral]){background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
)}:host([variant=accent]){background:var(
--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent)
)}:host([variant=informative]){background:var(
--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative)
)}:host([variant=negative]){background:var(
--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative)
)}:host([variant=positive]){background:var(
--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive)
)}:host([fixed=inline-start]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=inline-end]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=block-start]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{color:var(
--mod-badge-label-icon-color-white,var(--spectrum-badge-label-icon-color-white)
);font-size:var(
--mod-badge-font-size,var(--spectrum-badge-font-size)
);line-height:var(
--mod-badge-line-height,var(--spectrum-badge-line-height)
);padding-block-end:var(
--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom)
);padding-block-start:var(
--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
)}.spectrum-Badge--black-text .label{color:var(
--mod-badge-label-icon-color-black,var(--spectrum-badge-label-icon-color-black)
)}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(
--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk)
)}slot[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);color:var(
--mod-badge-label-icon-color-white,var(--spectrum-badge-label-icon-color-white)
);flex:0 0 var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);inline-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);padding-block-end:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-block-start:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing)
);padding-inline-start:var(
--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal)
)}[icon-only]::slotted(*){padding-inline-end:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
)}.spectrum-Badge--black-text ::slotted([slot=icon]){color:var(
--mod-badge-label-icon-color-black,var(--spectrum-badge-label-icon-color-black)
)}:host{align-items:center}:host([fixed=left]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=right]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=top]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=bottom]){border-end-end-radius:0;border-end-start-radius:0}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}::slotted([slot=icon]){flex-shrink:0}.label slot{display:block;max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);overflow:hidden}[icon-only]+.label{display:none}
`,Rt=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,Vt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Nt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Rt(e,r,s),s};class Gt extends(f(p(h(i,'[slot="icon"]'),""))){constructor(){super(...arguments),this.variant="informative"}static get styles(){return[Ut]}get fixed(){return this._fixed}set fixed(t){if(t===this.fixed)return;const e=this.fixed;this._fixed=t,t?this.setAttribute("fixed",t):this.removeAttribute("fixed"),this.requestUpdate("fixed",e)}get hasIcon(){return this.slotContentIsPresent}render(){return s`
            ${this.hasIcon?s`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:s``}
            <div class="label">
                <slot></slot>
            </div>
        `}}Vt([a({reflect:!0})],Gt.prototype,"fixed",1),Vt([a({type:String,reflect:!0})],Gt.prototype,"variant",2),customElements.define("sp-badge",Gt);var Kt=r`
:host{border-radius:var(
--spectrum-banner-border-radius,var(--spectrum-global-dimension-static-size-100)
);display:inline-block;font-size:var(
--spectrum-banner-text-size,var(--spectrum-global-dimension-font-size-75)
);line-height:var(
--spectrum-banner-text-line-height,var(--spectrum-alias-heading-text-line-height)
);padding:var(
--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50)
) var(
--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100)
)}#header{font-weight:700}:host([dir=ltr][corner]){right:-10px}:host([dir=rtl][corner]){left:-10px}:host([corner]){position:absolute;top:-10px}:host{color:var(
--spectrum-banner-text-color,var(--spectrum-global-color-static-white)
)}:host([type=info]){background-color:var(
--spectrum-banner-info-background-color,var(--spectrum-semantic-informative-color-default)
)}:host([type=warning]){background-color:var(
--spectrum-banner-warning-background-color,var(--spectrum-semantic-notice-color-default)
)}:host([type=error]){background-color:var(
--spectrum-banner-error-background-color,var(--spectrum-semantic-negative-color-default)
)}
`,Xt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,Wt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Yt(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Xt(e,r,s),s};class Zt extends i{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[Kt]}render(){return s`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `}}Wt([a({reflect:!0,type:String})],Zt.prototype,"type",2),Wt([a({reflect:!0,type:Boolean})],Zt.prototype,"corner",2),customElements.define("sp-banner",Zt);var Qt=r`
:host{--spectrum-buttongroup-spacing-horizontal:var(
--spectrum-spacing-300
);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(
--spectrum-spacing-200
);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-200)}:host([size=m]){--spectrum-buttongroup-spacing-horizontal:var(
--spectrum-spacing-300
);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=l]){--spectrum-buttongroup-spacing-horizontal:var(
--spectrum-spacing-300
);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(
--spectrum-spacing-300
);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host{display:flex;flex-wrap:wrap;gap:var(
--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal)
)}::slotted(*){flex-shrink:0}:host([vertical]){display:inline-flex;flex-direction:column;gap:var(
--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical)
)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`,Jt=Object.defineProperty,te=Object.getOwnPropertyDescriptor;class ee extends(f(i)){constructor(){super(...arguments),this.vertical=!1}static get styles(){return[Qt]}handleSlotchange({target:t}){t.assignedElements().forEach((t=>{t.size=this.size}))}render(){return s`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?te(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&Jt(e,r,s)})([a({type:Boolean,reflect:!0})],ee.prototype,"vertical",2),customElements.define("sp-button-group",ee);var re=r`
:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([opened]){opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host([enter-from=left][opened]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([enter-from=right][opened]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{align-items:center;border-radius:var(
--spectrum-quickactions-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;height:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);justify-content:center;padding:var(
--spectrum-quickactions-padding-y,var(--spectrum-global-dimension-size-50)
) var(
--spectrum-quickactions-padding-x,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) slot[name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) slot[name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][text-only]) slot[name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][text-only]) slot[name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}#overlay{background-color:var(
--spectrum-quickactions-overlay-color,var(--spectrum-alias-background-color-quickactions-overlay)
)}:host{background-color:var(
--spectrum-quickactions-background-color,var(--spectrum-alias-background-color-quickactions)
)}
`,oe=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,se=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?ie(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&oe(e,r,s),s};class ae extends i{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[re]}render(){return s`
            <slot></slot>
        `}}se([a({type:Boolean,reflect:!0})],ae.prototype,"opened",2),se([a({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],ae.prototype,"textOnly",2),customElements.define("sp-quick-actions",ae);var ce=r`
:host([size=s]){--spectrum-card-quiet-body-header-margin-top:var(
--spectrum-card-s-quiet-body-header-margin-top,var(--spectrum-global-dimension-size-175)
);--spectrum-card-quiet-body-header-height:var(
--spectrum-card-s-quiet-body-header-height,var(--spectrum-global-dimension-size-150)
);--spectrum-card-quiet-preview-padding:var(
--spectrum-card-s-quiet-preview-padding,var(--spectrum-global-dimension-size-150)
);--spectrum-card-quiet-min-width:var(
--spectrum-card-s-quiet-min-width,var(--spectrum-global-dimension-size-1200)
);--spectrum-card-quiet-min-height:var(
--spectrum-card-s-quiet-min-height,var(--spectrum-global-dimension-size-900)
);--spectrum-card-quiet-border-radius:var(
--spectrum-card-s-quiet-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-card-quiet-border-size:var(
--spectrum-card-s-quiet-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-card-body-header-height:var(
--spectrum-card-s-body-header-height,var(--spectrum-global-dimension-size-150)
);--spectrum-card-body-content-min-height:var(
--spectrum-card-s-body-content-min-height,var(--spectrum-global-dimension-size-175)
);--spectrum-card-body-content-margin-top:var(
--spectrum-card-s-body-content-margin-top,var(--spectrum-global-dimension-size-75)
);--spectrum-card-body-padding-top:var(
--spectrum-card-s-body-padding-top,var(--spectrum-global-dimension-size-250)
);--spectrum-card-body-padding-bottom:var(
--spectrum-card-s-body-padding-bottom,var(--spectrum-global-dimension-size-250)
);--spectrum-card-body-padding-left:var(
--spectrum-card-s-body-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-card-body-padding-right:var(
--spectrum-card-s-body-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-card-coverphoto-height:var(
--spectrum-card-s-coverphoto-height,var(--spectrum-global-dimension-size-1700)
);--spectrum-card-coverphoto-border-bottom-size:var(
--spectrum-card-s-coverphoto-border-bottom-size,var(--spectrum-alias-border-size-thin)
);--spectrum-card-checkbox-margin:var(
--spectrum-card-s-checkbox-margin,var(--spectrum-global-dimension-size-125)
);--spectrum-card-title-padding-right:var(
--spectrum-card-s-title-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-card-subtitle-text-size:var(
--spectrum-card-s-subtitle-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-card-subtitle-padding-right:var(
--spectrum-card-s-subtitle-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-card-actions-margin:var(
--spectrum-card-s-actions-margin,var(--spectrum-global-dimension-size-125)
);--spectrum-card-footer-padding-top:var(
--spectrum-card-s-footer-padding-top,var(--spectrum-global-dimension-size-175)
);--spectrum-card-footer-border-top-size:var(
--spectrum-card-s-footer-border-top-size,var(--spectrum-global-dimension-size-10)
);--spectrum-card-min-width:var(
--spectrum-card-s-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-card-border-radius:var(
--spectrum-card-s-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-card-border-size:var(
--spectrum-card-s-border-size,var(--spectrum-alias-border-size-thin)
)}:host([size=m]){--spectrum-card-quiet-body-header-margin-top:var(
--spectrum-card-m-quiet-body-header-margin-top,var(--spectrum-global-dimension-size-175)
);--spectrum-card-quiet-body-header-height:var(
--spectrum-card-m-quiet-body-header-height,var(--spectrum-global-dimension-size-225)
);--spectrum-card-quiet-preview-padding:var(
--spectrum-card-m-quiet-preview-padding,var(--spectrum-global-dimension-size-250)
);--spectrum-card-quiet-min-width:var(
--spectrum-card-m-quiet-min-width,var(--spectrum-global-dimension-size-2500)
);--spectrum-card-quiet-min-height:var(
--spectrum-card-m-quiet-min-height,var(--spectrum-global-dimension-size-1700)
);--spectrum-card-quiet-border-radius:var(
--spectrum-card-m-quiet-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-card-quiet-border-size:var(
--spectrum-card-m-quiet-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-card-body-header-height:var(
--spectrum-card-m-body-header-height,var(--spectrum-global-dimension-size-225)
);--spectrum-card-body-content-min-height:var(
--spectrum-card-m-body-content-min-height,var(--spectrum-global-dimension-size-175)
);--spectrum-card-body-content-margin-top:var(
--spectrum-card-m-body-content-margin-top,var(--spectrum-global-dimension-size-75)
);--spectrum-card-body-padding-top:var(
--spectrum-card-m-body-padding-top,var(--spectrum-global-dimension-size-250)
);--spectrum-card-body-padding-bottom:var(
--spectrum-card-m-body-padding-bottom,var(--spectrum-global-dimension-size-250)
);--spectrum-card-body-padding-left:var(
--spectrum-card-m-body-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-card-body-padding-right:var(
--spectrum-card-m-body-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-card-coverphoto-height:var(
--spectrum-card-m-coverphoto-height,var(--spectrum-global-dimension-size-1700)
);--spectrum-card-coverphoto-border-bottom-size:var(
--spectrum-card-m-coverphoto-border-bottom-size,var(--spectrum-alias-border-size-thin)
);--spectrum-card-checkbox-margin:var(
--spectrum-card-m-checkbox-margin,var(--spectrum-global-dimension-size-200)
);--spectrum-card-title-padding-right:var(
--spectrum-card-m-title-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-card-subtitle-text-size:var(
--spectrum-card-m-subtitle-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-card-subtitle-padding-right:var(
--spectrum-card-m-subtitle-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-card-actions-margin:var(
--spectrum-card-m-actions-margin,var(--spectrum-global-dimension-size-125)
);--spectrum-card-footer-padding-top:var(
--spectrum-card-m-footer-padding-top,var(--spectrum-global-dimension-size-175)
);--spectrum-card-footer-border-top-size:var(
--spectrum-card-m-footer-border-top-size,var(--spectrum-global-dimension-size-10)
);--spectrum-card-min-width:var(
--spectrum-card-m-min-width,var(--spectrum-global-dimension-size-2500)
);--spectrum-card-border-radius:var(
--spectrum-card-m-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-card-border-size:var(
--spectrum-card-m-border-size,var(--spectrum-alias-border-size-thin)
)}:host{border:var(--spectrum-card-border-size) solid transparent;border-radius:var(--spectrum-card-border-radius);box-sizing:border-box;display:inline-flex;flex-direction:column;min-width:var(--spectrum-card-min-width);position:relative;text-decoration:none}:host(:focus){outline:none}:host(:focus) .actions,:host(:focus) .quick-actions,:host(:hover) .actions,:host(:hover) .quick-actions,:host([focused]) .actions,:host([focused]) .quick-actions,:host([selected]) .actions,:host([selected]) .quick-actions{opacity:1;pointer-events:all;visibility:visible}:host([dir=ltr]) .actions{right:var(
--spectrum-card-actions-margin
)}:host([dir=rtl]) .actions{left:var(
--spectrum-card-actions-margin
)}.actions{height:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);position:absolute;top:var(--spectrum-card-actions-margin);visibility:hidden}:host([dir=ltr]) .quick-actions{left:var(
--spectrum-card-checkbox-margin
)}:host([dir=rtl]) .quick-actions{right:var(
--spectrum-card-checkbox-margin
)}.quick-actions{height:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);position:absolute;top:var(--spectrum-card-checkbox-margin);visibility:hidden;width:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
)}:host([dir=ltr]) .quick-actions .checkbox,:host([dir=rtl]) .quick-actions .checkbox{margin:0}#cover-photo{align-items:center;background-position:50%;background-size:cover;border-bottom:var(--spectrum-card-coverphoto-border-bottom-size) solid transparent;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:calc(var(--spectrum-card-border-radius) - 1px);border-top-right-radius:calc(var(--spectrum-card-border-radius) - 1px);box-sizing:border-box;display:flex;height:var(
--spectrum-card-coverphoto-height
);justify-content:center}:host([dir=ltr]) .body{padding-right:var(
--spectrum-card-body-padding-right
)}:host([dir=rtl]) .body{padding-left:var(
--spectrum-card-body-padding-right
)}:host([dir=ltr]) .body{padding-left:var(
--spectrum-card-body-padding-left
)}:host([dir=rtl]) .body{padding-right:var(
--spectrum-card-body-padding-left
)}.body{padding-bottom:var(--spectrum-card-body-padding-bottom);padding-top:var(
--spectrum-card-body-padding-top
)}.body:last-child{border-bottom-left-radius:var(--spectrum-card-border-radius);border-bottom-right-radius:var(--spectrum-card-border-radius);border-top-left-radius:0;border-top-right-radius:0}#preview{border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:calc(var(--spectrum-card-border-radius) - 1px);border-top-right-radius:calc(var(--spectrum-card-border-radius) - 1px);overflow:hidden}.header{height:var(--spectrum-card-body-header-height)}.content{display:flex;margin-top:var(--spectrum-card-body-content-margin-top);min-height:var(--spectrum-card-body-content-min-height)}:host([dir=ltr]) .title{padding-right:var(
--spectrum-card-title-padding-right
)}:host([dir=rtl]) .title{padding-left:var(
--spectrum-card-title-padding-right
)}.title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) .subtitle{padding-right:var(
--spectrum-card-subtitle-padding-right
)}:host([dir=rtl]) .subtitle{padding-left:var(
--spectrum-card-subtitle-padding-right
)}::slotted([slot=description]){font-size:var(
--spectrum-card-subtitle-text-size
)}:host([dir=ltr]) .subtitle+::slotted([slot=description]):before{padding-right:var(
--spectrum-card-subtitle-padding-right
)}:host([dir=rtl]) .subtitle+::slotted([slot=description]):before{padding-left:var(
--spectrum-card-subtitle-padding-right
)}.subtitle+::slotted([slot=description]):before{content:"•"}:host([dir=ltr]) ::slotted([slot=footer]){margin-right:var(
--spectrum-card-body-padding-right
)}:host([dir=rtl]) ::slotted([slot=footer]){margin-left:var(
--spectrum-card-body-padding-right
)}:host([dir=ltr]) ::slotted([slot=footer]){margin-left:var(
--spectrum-card-body-padding-left
)}:host([dir=rtl]) ::slotted([slot=footer]){margin-right:var(
--spectrum-card-body-padding-left
)}::slotted([slot=footer]){border-top:var(--spectrum-card-footer-border-top-size) solid;padding-bottom:var(--spectrum-card-body-padding-bottom);padding-top:var(
--spectrum-card-footer-padding-top
)}.header{align-items:baseline;display:flex}.action-button{align-self:center;display:flex;flex:1;justify-content:flex-end}:host([variant=quiet]) #preview{min-height:var(
--spectrum-card-quiet-min-height
)}:host([variant=gallery]),:host([variant=quiet]){border-radius:0;border-width:0;height:100%;min-width:var(--spectrum-card-quiet-min-width);overflow:visible}:host([variant=gallery]) #preview,:host([variant=quiet]) #preview{border-radius:var(--spectrum-card-quiet-border-radius);box-sizing:border-box;flex:1;margin:0 auto;overflow:visible;padding:var(--spectrum-card-quiet-preview-padding);position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s);width:100%}:host([dir=ltr][variant=gallery]) #preview:before,:host([dir=ltr][variant=quiet]) #preview:before{left:0}:host([dir=rtl][variant=gallery]) #preview:before,:host([dir=rtl][variant=quiet]) #preview:before{right:0}:host([variant=gallery]) #preview:before,:host([variant=quiet]) #preview:before{border:var(--spectrum-card-quiet-border-size) solid transparent;border-radius:inherit;box-sizing:border-box;content:"";height:100%;position:absolute;top:0;width:100%}:host([variant=gallery][drop-target]) #preview,:host([variant=quiet][drop-target]) #preview{transition:none}:host([variant=gallery]) .header,:host([variant=quiet]) .header{height:var(
--spectrum-card-quiet-body-header-height
);margin-top:var(--spectrum-card-quiet-body-header-margin-top)}:host([variant=gallery]) .body,:host([variant=quiet]) .body{padding:0}:host([horizontal]){flex-direction:row}:host([dir=ltr][horizontal]) #preview{border-top-left-radius:var(
--spectrum-card-quiet-border-radius
)}:host([dir=rtl][horizontal]) #preview{border-top-right-radius:var(
--spectrum-card-quiet-border-radius
)}:host([dir=ltr][horizontal]) #preview{border-top-right-radius:0}:host([dir=rtl][horizontal]) #preview{border-top-left-radius:0}:host([dir=ltr][horizontal]) #preview{border-bottom-left-radius:var(
--spectrum-card-quiet-border-radius
)}:host([dir=rtl][horizontal]) #preview{border-bottom-right-radius:var(
--spectrum-card-quiet-border-radius
)}:host([dir=ltr][horizontal]) #preview{border-bottom-right-radius:0}:host([dir=rtl][horizontal]) #preview{border-bottom-left-radius:0}:host([dir=ltr][horizontal]) #preview{border-right:var(--spectrum-card-border-size) solid transparent}:host([dir=rtl][horizontal]) #preview{border-left:var(--spectrum-card-border-size) solid transparent}:host([horizontal]) #preview{align-items:center;display:flex;flex-shrink:0;justify-content:center;min-height:0;padding:var(--spectrum-global-dimension-size-175)}:host([horizontal]) .content,:host([horizontal]) .header{height:auto;margin-top:0}:host([dir=ltr][horizontal]) .title{padding-right:0}:host([dir=rtl][horizontal]) .title{padding-left:0}:host([horizontal]) .body{display:flex;flex-direction:column;flex-shrink:0;justify-content:center;padding-bottom:0;padding-left:var(--spectrum-global-dimension-size-200);padding-right:var(--spectrum-global-dimension-size-200);padding-top:0}:host([variant=gallery]){min-width:0}:host([variant=gallery]) #preview{border-radius:0;padding:0}:host{background-color:var(
--spectrum-card-m-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-card-m-border-color,var(--spectrum-global-color-gray-200)
)}:host(:hover){border-color:var(
--spectrum-card-m-border-color-hover,var(--spectrum-global-color-gray-400)
)}:host(.focus-visible),:host([selected]){border-color:var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible),:host([selected]){border-color:var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-visible),:host([selected]){border-color:var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([drop-target]){background-color:var(--spectrum-alias-highlight-selected);border-color:var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}.subtitle{color:var(
--spectrum-card-m-description-text-color,var(--spectrum-global-color-gray-700)
)}::slotted([slot=description]){color:var(
--spectrum-card-m-description-text-color,var(--spectrum-global-color-gray-700)
)}#cover-photo{background-color:var(
--spectrum-card-m-coverphoto-background-color,var(--spectrum-global-color-gray-200)
);border-bottom-color:var(
--spectrum-card-m-coverphoto-border-color,var(--spectrum-global-color-gray-200)
)}::slotted([slot=footer]){border-color:var(
--spectrum-card-m-border-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery]),:host([variant=quiet]){background-color:transparent;border-color:transparent}:host([variant=gallery]) #preview,:host([variant=quiet]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery]:hover),:host([variant=quiet]:hover){border-color:transparent}:host([variant=gallery]:hover) #preview,:host([variant=quiet]:hover) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color-hover,var(--spectrum-global-color-gray-300)
)}:host([variant=gallery].focus-visible),:host([variant=gallery][selected]),:host([variant=quiet].focus-visible),:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery].focus-visible),:host([variant=gallery][selected]),:host([variant=quiet].focus-visible),:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery]:focus-visible),:host([variant=gallery][selected]),:host([variant=quiet]:focus-visible),:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery].focus-visible) #preview,:host([variant=gallery][selected]) #preview,:host([variant=quiet].focus-visible) #preview,:host([variant=quiet][selected]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery].focus-visible) #preview,:host([variant=gallery][selected]) #preview,:host([variant=quiet].focus-visible) #preview,:host([variant=quiet][selected]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery]:focus-visible) #preview,:host([variant=gallery][selected]) #preview,:host([variant=quiet]:focus-visible) #preview,:host([variant=quiet][selected]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery].focus-visible) #preview:before,:host([variant=gallery][selected]) #preview:before,:host([variant=quiet].focus-visible) #preview:before,:host([variant=quiet][selected]) #preview:before{border-color:var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
)}:host([variant=gallery].focus-visible) #preview:before,:host([variant=gallery][selected]) #preview:before,:host([variant=quiet].focus-visible) #preview:before,:host([variant=quiet][selected]) #preview:before{border-color:var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
)}:host([variant=gallery]:focus-visible) #preview:before,:host([variant=gallery][selected]) #preview:before,:host([variant=quiet]:focus-visible) #preview:before,:host([variant=quiet][selected]) #preview:before{border-color:var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
)}:host([variant=gallery][drop-target]),:host([variant=quiet][drop-target]){background-color:transparent;border-color:transparent;box-shadow:none}:host([variant=gallery][drop-target]) #preview,:host([variant=quiet][drop-target]) #preview{background-color:var(
--spectrum-alias-highlight-selected
)}:host([variant=gallery][drop-target]) #preview:before,:host([variant=quiet][drop-target]) #preview:before{border-color:var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
);box-shadow:0 0 0 1px var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
)}:host([variant=gallery][drop-target]) .spectrum-Asset-fileBackground,:host([variant=gallery][drop-target]) .spectrum-Asset-folderBackground,:host([variant=quiet][drop-target]) .spectrum-Asset-fileBackground,:host([variant=quiet][drop-target]) .spectrum-Asset-folderBackground{fill:var(
--spectrum-alias-highlight-selected
)}:host([variant=gallery][drop-target]) .spectrum-Asset-fileOutline,:host([variant=gallery][drop-target]) .spectrum-Asset-folderOutline,:host([variant=quiet][drop-target]) .spectrum-Asset-fileOutline,:host([variant=quiet][drop-target]) .spectrum-Asset-folderOutline{fill:var(
--spectrum-card-m-quiet-border-color-selected,var(--spectrum-global-color-blue-500)
)}:host([variant=gallery]) .title,:host([variant=quiet]) .title{color:var(
--spectrum-card-m-quiet-title-text-color,var(--spectrum-global-color-gray-800)
)}:host([variant=gallery]) .subtitle,:host([variant=quiet]) .subtitle{color:var(
--spectrum-card-m-quiet-subtitle-text-color,var(--spectrum-global-color-gray-700)
)}:host([horizontal]:hover) #preview{border-color:var(
--spectrum-card-m-border-color-hover,var(--spectrum-global-color-gray-400)
)}:host([horizontal]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-card-m-border-color,var(--spectrum-global-color-gray-200)
)}:host([href]:not([href=""])){cursor:pointer}#like-anchor{inset:0;pointer-events:none;position:absolute}.action-button{flex-grow:0}:host([dir=ltr]) .action-button{margin-left:auto}:host([dir=rtl]) .action-button{margin-right:auto}slot[name=description]{font-size:var(
--spectrum-card-subtitle-text-size,var(--spectrum-global-dimension-font-size-50)
)}#cover-photo,#preview{order:-1;overflow:hidden}#preview+#cover-photo{display:none}#cover-photo ::slotted(*),#preview ::slotted(*){display:block;object-fit:cover;width:100%}:host(:not([variant=gallery])) #preview ::slotted(*){height:100%}:host([horizontal]) #preview{width:auto}sp-quick-actions{z-index:1}.title{width:var(--spectrum-card-title-width)}.subtitle{text-transform:none}
`;var le=[A,M,r`
.spectrum-Detail{font-family:var(
--spectrum-heading-m-text-font-family,var(--spectrum-alias-body-text-font-family)
)}.spectrum-Detail .spectrum-Detail-strong,.spectrum-Detail strong{font-weight:var(
--spectrum-detail-m-strong-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
)}.spectrum-Detail .spectrum-Detail-emphasized,.spectrum-Detail em{font-style:var(
--spectrum-detail-m-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Detail--light{font-style:var(
--spectrum-detail-m-light-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-m-light-text-font-weight,var(--spectrum-alias-detail-text-font-weight-light)
)}.spectrum-Detail--serif{font-family:var(
--spectrum-body-m-serif-text-font-family,var(--spectrum-alias-serif-text-font-family)
)}.spectrum-Detail--sizeXL{font-size:var(
--spectrum-detail-xl-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-xl-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-xl-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-xl-text-transform,uppercase)}.spectrum-Detail--sizeXL em{font-size:var(
--spectrum-detail-xl-emphasized-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-xl-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
);font-weight:var(
--spectrum-detail-xl-emphasized-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-xl-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-xl-emphasized-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-xl-emphasized-text-transform,uppercase
)}.spectrum-Detail--sizeXL strong{font-size:var(
--spectrum-detail-xl-strong-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-xl-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-xl-strong-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-xl-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-xl-strong-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-xl-strong-text-transform,uppercase)}.spectrum-Detail--sizeL{font-size:var(
--spectrum-detail-l-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-l-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-l-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-l-text-transform,uppercase)}.spectrum-Detail--sizeL em{font-size:var(
--spectrum-detail-l-emphasized-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-l-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
);font-weight:var(
--spectrum-detail-l-emphasized-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-l-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-l-emphasized-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-l-emphasized-text-transform,uppercase
)}.spectrum-Detail--sizeL strong{font-size:var(
--spectrum-detail-l-strong-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-l-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-l-strong-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-l-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-l-strong-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-l-strong-text-transform,uppercase)}.spectrum-Detail--sizeM{font-size:var(
--spectrum-detail-m-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-m-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-m-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-m-text-transform,uppercase)}.spectrum-Detail--sizeM em{font-size:var(
--spectrum-detail-m-emphasized-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-m-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
);font-weight:var(
--spectrum-detail-m-emphasized-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-m-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-m-emphasized-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-m-emphasized-text-transform,uppercase
)}.spectrum-Detail--sizeM strong{font-size:var(
--spectrum-detail-m-strong-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-m-strong-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-m-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-m-strong-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-m-strong-text-transform,uppercase)}.spectrum-Detail--sizeS{font-size:var(
--spectrum-detail-s-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-s-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-s-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-s-text-transform,uppercase)}.spectrum-Detail--sizeS em{font-size:var(
--spectrum-detail-s-emphasized-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-s-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
);font-weight:var(
--spectrum-detail-s-emphasized-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-s-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-s-emphasized-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-s-emphasized-text-transform,uppercase
)}.spectrum-Detail--sizeS strong{font-size:var(
--spectrum-detail-s-strong-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-s-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-s-strong-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-s-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-s-strong-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-s-strong-text-transform,uppercase)}.spectrum-Detail--sizeXL{color:var(
--spectrum-detail-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Detail--sizeL{color:var(
--spectrum-detail-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Detail--sizeM{color:var(
--spectrum-detail-m-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Detail--sizeS{color:var(
--spectrum-detail-s-text-color,var(--spectrum-alias-heading-text-color)
)}
`],ne=Object.defineProperty,de=Object.getOwnPropertyDescriptor,ue=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?de(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&ne(e,r,s),s};class pe extends(w(f(h(x(i),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"]}))){constructor(){super(...arguments),this.variant="standard",this._selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.value="",this.subheading="",this.handleFocusin=t=>{this.focused=!0,t.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[O,le,ce]}get selected(){return this._selected}set selected(t){t!==this.selected&&(this._selected=t,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var t;null==(t=this.likeAnchor)||t.click()}handleFocusout(t){this.focused=!1,t.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;switch(e){case"Space":if(this.toggleSelected(),this.toggles){t.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(t){t.stopPropagation(),this.selected=t.target.checked,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(t){this.href&&t.stopPropagation()}handlePointerdown(t){if(t.composedPath().some((t=>"a"===t.localName)))return;const e=+new Date,r=()=>{+new Date-e<200&&this.click(),this.removeEventListener("pointerup",r),this.removeEventListener("pointercancel",r)};this.addEventListener("pointerup",r),this.addEventListener("pointercancel",r)}get renderHeading(){return s`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return s`
            <sp-asset id="preview" variant=${y(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
        `}get renderCoverImage(){return s`
            <sp-asset id="cover-photo" variant=${y(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
        `}get images(){const t=[];return this.hasPreview&&t.push(this.renderPreviewImage),this.hasCoverPhoto&&t.push(this.renderCoverImage),t}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return s`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return s`
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${"gallery"===this.variant?this.renderSubtitleAndDescription:s``}
                    ${"quiet"!==this.variant||"s"!==this.size?s`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:s``}
                </div>
                ${"gallery"!==this.variant?s`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:s``}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):s``}
            ${"standard"===this.variant?s`
                      <slot name="footer"></slot>
                  `:s``}
            ${this.renderImage()}
            ${this.toggles?s`
                      <sp-quick-actions
                          class="quick-actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <sp-checkbox
                              class="checkbox"
                              @change=${this.handleSelectedChange}
                              ?checked=${this.selected}
                              tabindex="-1"
                          ></sp-checkbox>
                      </sp-quick-actions>
                  `:s``}
            ${"quiet"===this.variant&&"s"===this.size?s`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:s``}
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}ue([a()],pe.prototype,"asset",2),ue([a({reflect:!0})],pe.prototype,"variant",2),ue([a({type:Boolean,reflect:!0})],pe.prototype,"selected",1),ue([a()],pe.prototype,"heading",2),ue([a({type:Boolean,reflect:!0})],pe.prototype,"horizontal",2),ue([z("#like-anchor")],pe.prototype,"likeAnchor",2),ue([a({type:Boolean,reflect:!0})],pe.prototype,"focused",2),ue([a({type:Boolean,reflect:!0})],pe.prototype,"toggles",2),ue([a()],pe.prototype,"value",2),ue([a()],pe.prototype,"subheading",2),customElements.define("sp-card",pe);var he=r`
@keyframes pulse{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-0-scale,1))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}@keyframes pulse--quiet{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(
--spectrum-coachmark-quiet-animation-indicator-keyframe-0-scale,.8
))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}:host([dir=ltr]) .spectrum-CoachMarkPopover-footer{text-align:right}:host([dir=rtl]) .spectrum-CoachMarkPopover-footer{text-align:left}:host{margin:var(
--spectrum-coachmark-indicator-gap,var(--spectrum-global-dimension-size-75)
);position:relative}.ring{border-radius:50%;border-style:solid;border-width:var(
--spectrum-coachmark-indicator-ring-border-size,var(--spectrum-global-dimension-static-size-25)
);display:block;position:absolute}.ring:nth-child(2){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-center-delay-multiple,
-.66
))}.ring:nth-child(3){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-outer-delay-multiple,
-1
))}:host{min-height:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3);min-width:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3)}:host([dir=ltr]) .ring{left:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}:host([dir=rtl]) .ring{right:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}.ring{animation:pulse var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
);top:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75);width:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
)}.ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-inner-delay-multiple,
-.5
))}:host([quiet]){min-height:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75);min-width:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75)}:host([dir=ltr][quiet]) .ring{left:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([dir=rtl][quiet]) .ring{right:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([quiet]) .ring{animation:pulse--quiet var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
);top:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75);width:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
)}:host([quiet]) .ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-quiet-animation-indicator-ring-inner-delay-multiple,
-.33
))}.ring{border-color:var(
--spectrum-coachmark-indicator-ring-default-color,var(--spectrum-alias-focus-color)
)}:host([variant=light]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-low-contrast-color,var(--spectrum-global-color-gray-50)
)}:host([variant=dark]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-high-contrast-color,var(--spectrum-global-color-gray-900)
)}:host{display:inline-block}
`,me=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,be=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?ge(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&me(e,r,s),s};class ve extends i{constructor(){super(...arguments),this.quiet=!1,this.variant=""}static get styles(){return[he]}render(){return s`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}be([a({type:Boolean,reflect:!0})],ve.prototype,"quiet",2),be([a({reflect:!0})],ve.prototype,"variant",2),customElements.define("sp-coachmark",ve);const fe=["",()=>{}];const ke=m(class extends D{constructor(){super(...arguments),this.start=fe,this.streamInside=fe,this.end=fe,this.streamOutside=fe,this.state="off",this.handleStart=t=>{this.callHandler(this.start[1],t),!t.defaultPrevented&&(this.removeListeners(),this.addListeners("on"))},this.handleStream=t=>{this.callHandler(this.streamInside[1],t)},this.handleEnd=t=>{this.callHandler(this.end[1],t),this.removeListeners(),this.addListeners("off")},this.handleBetween=t=>{this.callHandler(this.streamOutside[1],t)}}render(t){return c}update(t,[{start:e,end:r,streamInside:o=fe,streamOutside:i=fe}]){var s;this.element!==t.element&&(this.element=t.element,this.removeListeners()),this.host=(null==(s=t.options)?void 0:s.host)||this.element,this.start=e,this.end=r,this.streamInside=o,this.streamOutside=i,this.addListeners()}addListeners(t){this.state=t||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleBetween),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleStream),this.addListener(this.end[0],this.handleEnd))}callHandler(t,e){"function"==typeof t?t.call(this.host,e):t.handleEvent(e)}addListener(t,e){Array.isArray(t)?t.map((t=>{this.element.addEventListener(t,e)})):this.element.addEventListener(t,e)}removeListener(t,e){Array.isArray(t)?t.map((t=>{this.element.removeEventListener(t,e)})):this.element.removeEventListener(t,e)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleStream),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleBetween)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}});var ye=r`
:host{--spectrum-colorloupe-width-adjusted:calc(var(--spectrum-colorloupe-width, var(--spectrum-alias-colorloupe-width)) + var(--spectrum-global-dimension-static-size-100, 8px));--spectrum-colorloupe-height-adjusted:calc(var(
--spectrum-colorloupe-height,
var(--spectrum-alias-colorloupe-height)
) + var(--spectrum-global-dimension-static-size-100, 8px));--spectrum-colorloupe-offset:var(
--spectrum-global-dimension-static-size-200,16px
);--spectrum-colorloupe-animation-distance:var(
--spectrum-global-dimension-static-size-100,8px
)}:host{bottom:calc(50% + var(--spectrum-colorloupe-offset));height:var(--spectrum-colorloupe-height-adjusted);left:calc(50% - var(--spectrum-colorloupe-width-adjusted)/2);opacity:0;pointer-events:none;position:absolute;transform:translateY(var(--spectrum-colorloupe-animation-distance));transform-origin:bottom center;transition:transform .1s ease-in-out,opacity 125ms ease-in-out;width:var(--spectrum-colorloupe-width-adjusted)}:host([open]){opacity:1;transform:translate(0)}.outer{stroke-width:var(
--spectrum-colorloupe-outer-border-size,0
)}.spectrum-ColorLoupe-express{display:var(
--spectrum-colorloupe-express-visibility,none
)}.spectrum-ColorLoupe-spectrum{display:var(
--spectrum-colorloupe-spectrum-visibility,block
)}.outer{fill:var(
--spectrum-colorloupe-inner-border-color,var(--spectrum-global-color-static-white)
);stroke:var(--spectrum-colorloupe-outer-border-color,transparent)}.inner{fill:var(--spectrum-picked-color);stroke:var(
--spectrum-colorloupe-outer-stroke-color,var(--spectrum-global-color-static-transparent-black-200)
);stroke-width:var(
--spectrum-colorloupe-outer-stroke-width,var(--spectrum-alias-border-size-thick)
)}@media (forced-colors:active){:host{--spectrum-colorloupe-outer-border-color:CanvasText}}svg{height:inherit;width:inherit}
`,we=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,xe=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?ze(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&we(e,r,s),s};class Pe extends i{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[ye]}render(){return s`
            <svg style="--spectrum-picked-color: ${this.color};">
                <defs>
                    <path
                        id="spectrum-inner-loupe"
                        class="inner"
                        d="M24,0A24,24,0,0,1,48,24c0,16.255-24,40-24,40S0,40.255,0,24A24,24,0,0,1,24,0Z"
                    />
                    <path
                        id="express-inner-loupe"
                        class="inner"
                        d="M-14330.692,18055.742A15.922,15.922,0,0,1-14334,18046a16,16,0,0,1,16-16,16,16,0,0,1,16,16,15.925,15.925,0,0,1-3.166,9.555c-.009.016-.018.029-.028.045-2.577,4.033-12.77,14.4-12.77,14.4S-14328.027,18059.484-14330.692,18055.742Z"
                    />

                    <g id="loupe-checkerboard">
                        <g transform="translate(338 285)">
                            <g transform="translate(-338 -285)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-322 -285)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-306 -285)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-290 -285)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-338 -269)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-322 -269)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-306 -269)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-290 -269)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-338 -253)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-322 -253)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-306 -253)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-290 -253)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-338 -237)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-322 -237)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-306 -237)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-290 -237)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-338 -221)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-322 -221)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-306 -221)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                            <g transform="translate(-290 -221)">
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(338 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 285)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-light-color)"
                                />
                                <rect
                                    width="8"
                                    height="8"
                                    transform="translate(346 293)"
                                    fill="var(--spectrum-colorcontrol-checkerboard-dark-color)"
                                />
                            </g>
                        </g>
                    </g>

                    <clipPath id="spectrum-loupe-clip">
                        <use xlink:href="#spectrum-inner-loupe" />
                    </clipPath>
                    <clipPath id="express-loupe-clip">
                        <use xlink:href="#express-inner-loupe" />
                    </clipPath>
                    <clipPath id="express-checkerboard-loupe-clip">
                        <use
                            xlink:href="#express-inner-loupe"
                            transform="translate(14688 -17741)"
                        />
                    </clipPath>

                    <filter
                        id="loupe-shadow"
                        x="-16px"
                        y="-16px"
                        width="96"
                        height="128"
                        filterUnits="userSpaceOnUse"
                    >
                        <feOffset input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="2" result="d" />
                        <feFlood flood-opacity="0.302" />
                        <feComposite operator="in" in2="d" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>

                <g
                    transform="translate(4 4)"
                    class="spectrum-ColorLoupe-spectrum"
                >
                    <g clip-path="url(#spectrum-loupe-clip)">
                        <g transform="translate(-353.999 -289)">
                            <use xlink:href="#loupe-checkerboard" />
                        </g>
                    </g>
                    <g filter="url(#loupe-shadow)">
                        <use xlink:href="#spectrum-inner-loupe" />
                    </g>
                    <path
                        class="outer"
                        d="M24,2A21.98,21.98,0,0,0,2,24c0,6.2,4,14.794,11.568,24.853A144.233,144.233,0,0,0,24,61.132,144.085,144.085,0,0,0,34.4,48.893C41.99,38.816,46,30.209,46,24A21.98,21.98,0,0,0,24,2m0-2A24,24,0,0,1,48,24c0,16.255-24,40-24,40S0,40.255,0,24A24,24,0,0,1,24,0Z"
                    />
                </g>

                <g
                    transform="translate(-290 -235)"
                    class="spectrum-ColorLoupe-express"
                >
                    <g
                        transform="translate(-58 -45)"
                        clip-path="url(#express-checkerboard-loupe-clip)"
                    >
                        <use xlink:href="#loupe-checkerboard" />
                    </g>
                    <g
                        transform="matrix(1, 0, 0, 1, 290, 238)"
                        filter="url(#loupe-shadow)"
                    >
                        <g transform="translate(14340 -18024)">
                            <use
                                xlink:href="#express-inner-loupe"
                                stroke-width="6"
                                stroke="rgba(0, 0, 0, 0.15)"
                                clip-path="url(#express-loupe-clip)"
                            />
                        </g>
                    </g>
                    <g transform="translate(14630 -17786)" fill="none">
                        <path
                            class="outer"
                            d="M -14317.9482421875 18067.111328125 C -14315.0771484375 18064.130859375 -14308.7626953125 18057.462890625 -14306.884765625 18054.529296875 L -14306.8466796875 18054.4609375 L -14306.76953125 18054.359375 C -14304.9580078125 18051.931640625 -14304.0009765625 18049.041015625 -14304.0009765625 18046 C -14304.0009765625 18042.26171875 -14305.45703125 18038.74609375 -14308.1025390625 18036.1015625 C -14310.7470703125 18033.45703125 -14314.2626953125 18032 -14318.0009765625 18032 C -14321.7392578125 18032 -14325.2548828125 18033.45703125 -14327.8994140625 18036.1015625 C -14330.544921875 18038.74609375 -14332.0009765625 18042.26171875 -14332.0009765625 18046 C -14332.0009765625 18049.115234375 -14331 18052.0625 -14329.107421875 18054.5234375 L -14329.0634765625 18054.58203125 C -14327.1025390625 18057.3359375 -14320.802734375 18064.087890625 -14317.9482421875 18067.111328125 M -14317.96484375 18070 C -14317.96484375 18070 -14328.02734375 18059.484375 -14330.6923828125 18055.7421875 C -14332.767578125 18053.044921875 -14334.0009765625 18049.666015625 -14334.0009765625 18046 C -14334.0009765625 18037.166015625 -14326.8359375 18030 -14318.0009765625 18030 C -14309.166015625 18030 -14302.0009765625 18037.166015625 -14302.0009765625 18046 C -14302.0009765625 18049.580078125 -14303.177734375 18052.888671875 -14305.1669921875 18055.5546875 C -14305.17578125 18055.5703125 -14305.1845703125 18055.583984375 -14305.1953125 18055.599609375 C -14307.7724609375 18059.6328125 -14317.96484375 18070 -14317.96484375 18070 Z"
                            stroke="none"
                            fill="#fff"
                        />
                    </g>
                </g>
            </svg>
        `}}xe([a({type:Boolean,reflect:!0})],Pe.prototype,"open",2),xe([a({type:String})],Pe.prototype,"color",2),customElements.define("sp-color-loupe",Pe);var Ce=r`
:host{--spectrum-colorhandle-checkerboard-size:var(
--spectrum-global-dimension-static-size-100,8px
);--spectrum-colorhandle-animation-duration:var(
--spectrum-global-animation-duration-100,130ms
);--spectrum-colorhandle-animation-easing:ease-in-out;--spectrum-colorhandle-hitarea-size:var(
--spectrum-global-dimension-size-300
)}:host(.focus-visible),:host([focused]){height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}:host(.focus-visible),:host([focused]){height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}:host(:focus-visible),:host([focused]){height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}:host{background-position:var(
--spectrum-colorhandle-background-offset,calc(-1 * var(--spectrum-global-dimension-static-size-25))
) var(
--spectrum-colorhandle-background-offset,calc(-1 * var(--spectrum-global-dimension-static-size-25))
),var(
--spectrum-colorhandle-background-offset,calc(-1 * var(--spectrum-global-dimension-static-size-25))
) calc(var(--spectrum-colorhandle-checkerboard-size) + var(
--spectrum-colorhandle-background-offset,
calc(-1 * var(--spectrum-global-dimension-static-size-25))
)),calc(var(--spectrum-colorhandle-checkerboard-size) + var(
--spectrum-colorhandle-background-offset,
calc(-1 * var(--spectrum-global-dimension-static-size-25))
)) calc(-1 * var(--spectrum-colorhandle-checkerboard-size) + var(--spectrum-colorhandle-background-offset, calc(-1 * var(
--spectrum-global-dimension-static-size-25
)))),calc(-1 * var(--spectrum-colorhandle-checkerboard-size) + var(--spectrum-colorhandle-background-offset, calc(-1 * var(
--spectrum-global-dimension-static-size-25
)))) var(
--spectrum-colorhandle-background-offset,calc(-1 * var(--spectrum-global-dimension-static-size-25))
);background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px);border-style:solid;border-width:var(
--spectrum-colorhandle-inner-border-size,var(--spectrum-global-dimension-static-size-25)
);box-sizing:border-box;display:block;height:var(
--spectrum-colorhandle-size,var(--spectrum-global-dimension-size-200)
);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1/2);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1/2);position:absolute;transition:width var(--spectrum-colorhandle-animation-duration) var(--spectrum-colorhandle-animation-easing),height var(--spectrum-colorhandle-animation-duration) var(--spectrum-colorhandle-animation-easing),border-width var(--spectrum-colorhandle-animation-duration) var(--spectrum-colorhandle-animation-easing),margin-left var(--spectrum-colorhandle-animation-duration) var(--spectrum-colorhandle-animation-easing),margin-top var(--spectrum-colorhandle-animation-duration) var(--spectrum-colorhandle-animation-easing);width:var(
--spectrum-colorhandle-size,var(--spectrum-global-dimension-size-200)
);z-index:1}:host,:host:after{border-radius:100%}:host:after{content:"";display:block;height:var(--spectrum-colorhandle-hitarea-size);left:calc(50% - var(--spectrum-colorhandle-hitarea-size)/2);position:absolute;top:calc(50% - var(--spectrum-colorhandle-hitarea-size)/2);width:var(--spectrum-colorhandle-hitarea-size)}:host([disabled]){pointer-events:none}.color{border-radius:100%;height:100%;width:100%}:host{background-color:var(
--spectrum-colorcontrol-checkerboard-light-color,var(--spectrum-global-color-static-white)
);background-image:linear-gradient(-45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(-45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%),linear-gradient(45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%);border-color:var(
--spectrum-colorhandle-inner-border-color,var(--spectrum-global-color-static-white)
);box-shadow:0 0 var(--spectrum-colorhandle-outer-shadow-blur,0) var(
--spectrum-colorhandle-outer-shadow-spread,var(--spectrum-alias-border-size-thin)
) var(--spectrum-colorhandle-outer-shadow-color,rgba(0,0,0,.42))}:host([disabled]){background:var(
--spectrum-colorhandle-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
);border-color:var(
--spectrum-colorhandle-inner-border-color-disabled,var(--spectrum-global-color-gray-400)
);box-shadow:none}:host([disabled]) .color{display:none}.color{background-color:var(--spectrum-picked-color);box-shadow:inset 0 0 0 var(
--spectrum-colorhandle-outer-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorhandle-inner-shadow-color,var(--spectrum-colorhandle-outer-shadow-color)
)}@media (forced-colors:active){:host{--spectrum-colorhandle-inner-border-color-disabled:GrayText;--spectrum-colorhandle-fill-color-disabled:Canvas;--spectrum-colorhandle-inner-border-color:CanvasText}:host([disabled]){forced-color-adjust:none}}:host{touch-action:none}:host(:focus){outline:none}
`,Be=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,Te=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Se(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Be(e,r,s),s};class $e extends i{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Ce]}handlePointerdown(t){"touch"===t.pointerType&&(this.open=!0),this.setPointerCapture(t.pointerId)}handlePointerup(t){this.open=!1,this.releasePointerCapture(t.pointerId)}render(){return s`
            <div class="color" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open&&!this.disabled}
            ></sp-color-loupe>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup)}}function qe(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var r=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function Ee(t){return Math.min(1,Math.max(0,t))}function Le(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Oe(t){return t<=1?"".concat(100*Number(t),"%"):t}function Ae(t){return 1===t.length?"0"+t:String(t)}function Me(t,e,r){t=qe(t,255),e=qe(e,255),r=qe(r,255);var o=Math.max(t,e,r),i=Math.min(t,e,r),s=0,a=0,c=(o+i)/2;if(o===i)a=0,s=0;else{var l=o-i;switch(a=c>.5?l/(2-o-i):l/(o+i),o){case t:s=(e-r)/l+(e<r?6:0);break;case e:s=(r-t)/l+2;break;case r:s=(t-e)/l+4}s/=6}return{h:s,s:a,l:c}}function De(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*r*(e-t):r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function He(t,e,r){t=qe(t,255),e=qe(e,255),r=qe(r,255);var o=Math.max(t,e,r),i=Math.min(t,e,r),s=0,a=o,c=o-i,l=0===o?0:c/o;if(o===i)s=0;else{switch(o){case t:s=(e-r)/c+(e<r?6:0);break;case e:s=(r-t)/c+2;break;case r:s=(t-e)/c+4}s/=6}return{h:s,s:l,v:a}}function Ie(t,e,r,o){var i=[Ae(Math.round(t).toString(16)),Ae(Math.round(e).toString(16)),Ae(Math.round(r).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function je(t){return Math.round(255*parseFloat(t)).toString(16)}function Fe(t){return _e(t)/255}function _e(t){return parseInt(t,16)}Te([a({type:Boolean,reflect:!0})],$e.prototype,"disabled",2),Te([a({type:Boolean,reflect:!0})],$e.prototype,"focused",2),Te([a({type:Boolean,reflect:!0})],$e.prototype,"open",2),Te([a({type:String})],$e.prototype,"color",2),customElements.define("sp-color-handle",$e);var Ue={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Re(t){var e={r:0,g:0,b:0},r=1,o=null,i=null,s=null,a=!1,c=!1;return"string"==typeof t&&(t=function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var e=!1;if(Ue[t])t=Ue[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var r=Ke.rgb.exec(t);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=Ke.rgba.exec(t))return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=Ke.hsl.exec(t))return{h:r[1],s:r[2],l:r[3]};if(r=Ke.hsla.exec(t))return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=Ke.hsv.exec(t))return{h:r[1],s:r[2],v:r[3]};if(r=Ke.hsva.exec(t))return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=Ke.hex8.exec(t))return{r:_e(r[1]),g:_e(r[2]),b:_e(r[3]),a:Fe(r[4]),format:e?"name":"hex8"};if(r=Ke.hex6.exec(t))return{r:_e(r[1]),g:_e(r[2]),b:_e(r[3]),format:e?"name":"hex"};if(r=Ke.hex4.exec(t))return{r:_e(r[1]+r[1]),g:_e(r[2]+r[2]),b:_e(r[3]+r[3]),a:Fe(r[4]+r[4]),format:e?"name":"hex8"};if(r=Ke.hex3.exec(t))return{r:_e(r[1]+r[1]),g:_e(r[2]+r[2]),b:_e(r[3]+r[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(Xe(t.r)&&Xe(t.g)&&Xe(t.b)?(e=function(t,e,r){return{r:255*qe(t,255),g:255*qe(e,255),b:255*qe(r,255)}}(t.r,t.g,t.b),a=!0,c="%"===String(t.r).substr(-1)?"prgb":"rgb"):Xe(t.h)&&Xe(t.s)&&Xe(t.v)?(o=Oe(t.s),i=Oe(t.v),e=function(t,e,r){t=6*qe(t,360),e=qe(e,100),r=qe(r,100);var o=Math.floor(t),i=t-o,s=r*(1-e),a=r*(1-i*e),c=r*(1-(1-i)*e),l=o%6;return{r:255*[r,a,s,s,c,r][l],g:255*[c,r,r,a,s,s][l],b:255*[s,s,c,r,r,a][l]}}(t.h,o,i),a=!0,c="hsv"):Xe(t.h)&&Xe(t.s)&&Xe(t.l)&&(o=Oe(t.s),s=Oe(t.l),e=function(t,e,r){var o,i,s;if(t=qe(t,360),e=qe(e,100),r=qe(r,100),0===e)i=r,s=r,o=r;else{var a=r<.5?r*(1+e):r+e-r*e,c=2*r-a;o=De(c,a,t+1/3),i=De(c,a,t),s=De(c,a,t-1/3)}return{r:255*o,g:255*i,b:255*s}}(t.h,o,s),a=!0,c="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=Le(r),{ok:a,format:t.format||c,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var Ne="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),Ve="[\\s|\\(]+(".concat(Ne,")[,|\\s]+(").concat(Ne,")[,|\\s]+(").concat(Ne,")\\s*\\)?"),Ge="[\\s|\\(]+(".concat(Ne,")[,|\\s]+(").concat(Ne,")[,|\\s]+(").concat(Ne,")[,|\\s]+(").concat(Ne,")\\s*\\)?"),Ke={CSS_UNIT:new RegExp(Ne),rgb:new RegExp("rgb"+Ve),rgba:new RegExp("rgba"+Ge),hsl:new RegExp("hsl"+Ve),hsla:new RegExp("hsla"+Ge),hsv:new RegExp("hsv"+Ve),hsva:new RegExp("hsva"+Ge),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Xe(t){return Boolean(Ke.CSS_UNIT.exec(String(t)))}var Ye=function(){function t(e,r){var o;if(void 0===e&&(e=""),void 0===r&&(r={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var i=Re(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=r.format)&&void 0!==o?o:i.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,r=t.g/255,o=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=Le(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.toHsv=function(){var t=He(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=He(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.v);return 1===this.a?"hsv(".concat(e,", ").concat(r,"%, ").concat(o,"%)"):"hsva(".concat(e,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},t.prototype.toHsl=function(){var t=Me(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=Me(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.l);return 1===this.a?"hsl(".concat(e,", ").concat(r,"%, ").concat(o,"%)"):"hsla(".concat(e,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},t.prototype.toHex=function(t){return void 0===t&&(t=!1),Ie(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,r,o,i){var s=[Ae(Math.round(t).toString(16)),Ae(Math.round(e).toString(16)),Ae(Math.round(r).toString(16)),Ae(je(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(e,", ").concat(r,")"):"rgba(".concat(t,", ").concat(e,", ").concat(r,", ").concat(this.roundA,")")},t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(100*qe(t,255)),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*qe(t,255))};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+Ie(this.r,this.g,this.b,!1),e=0,r=Object.entries(Ue);e<r.length;e++){var o=r[e],i=o[0];if(t===o[1])return i}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var r=!1,o=this.a<1&&this.a>=0;return e||!o||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex4"===t&&(r=this.toHex8String(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l+=e/100,r.l=Ee(r.l),new t(r)},t.prototype.brighten=function(e){void 0===e&&(e=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-e/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-e/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-e/100*255))),new t(r)},t.prototype.darken=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l-=e/100,r.l=Ee(r.l),new t(r)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s-=e/100,r.s=Ee(r.s),new t(r)},t.prototype.saturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s+=e/100,r.s=Ee(r.s),new t(r)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var r=this.toHsl(),o=(r.h+e)%360;return r.h=o<0?360+o:o,new t(r)},t.prototype.mix=function(e,r){void 0===r&&(r=50);var o=this.toRgb(),i=new t(e).toRgb(),s=r/100;return new t({r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a})},t.prototype.analogous=function(e,r){void 0===e&&(e=6),void 0===r&&(r=30);var o=this.toHsl(),i=360/r,s=[this];for(o.h=(o.h-(i*e>>1)+720)%360;--e;)o.h=(o.h+i)%360,s.push(new t(o));return s},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var r=this.toHsv(),o=r.h,i=r.s,s=r.v,a=[],c=1/e;e--;)a.push(new t({h:o,s:i,v:s})),s=(s+c)%1;return a},t.prototype.splitcomplement=function(){var e=this.toHsl(),r=e.h;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var r=this.toRgb(),o=new t(e).toRgb();return new t({r:o.r+(r.r-o.r)*r.a,g:o.g+(r.g-o.g)*r.a,b:o.b+(r.b-o.b)*r.a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var r=this.toHsl(),o=r.h,i=[this],s=360/e,a=1;a<e;a++)i.push(new t({h:(o+a*s)%360,s:r.s,l:r.l}));return i},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}();const We=/^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/,Ze=/(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/,Qe=/(^hs[v|l]a?\()\d{1,3}/,Je=(t,e)=>e?t.toHexString():t.toHex();class tr{constructor(t,{applyColorToState:e,extractColorFromState:r,maintains:o}){this.maintains="hue",this._hue=0,this.getColorProcesses={rgb:(t,e)=>e?t.toRgbString():t.toRgb(),prgb:(t,e)=>e?t.toPercentageRgbString():t.toPercentageRgb(),hex8:(t,e)=>e?t.toHex8String():t.toHex8(),name:t=>t.toName()||t.toRgbString(),hsl:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHslString().replace(Qe,`$1${this.hue}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}}if(e)return t.toHslString().replace(Ze,`$1${this.hue}$2${this.saturation}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}},hsv:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHsvString().replace(Qe,`$1${this.hue}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}}if(e)return t.toHsvString().replace(Ze,`$1${this.hue}$2${this.saturation}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}},hex:Je,hex3:Je,hex4:Je,hex6:Je},this._color=new Ye({h:0,s:1,v:1}),this._previousColor=new Ye({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.host=t,this.applyColorToState=e,this.extractColorFromState=r,this.maintains=o||this.maintains}setColorProcess(t,e,r,o){"hue"===this.maintains?this.setColorMaintainHue(t,e,r,o):"saturation"===this.maintains&&this.setColorMaintainSaturation(t,e,r,o)}setColorMaintainHue(t,e,r,o){const{h:i,s:s,v:a}=this._color.toHsv();let c;if(o&&r.startsWith("hs")){const t=We.exec(e);if(null!==t){const[,e]=t;c=Number(e)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput;c=Object.values(e)[0]}this.hue=c||i,this.applyColorToState({h:i,s:s,v:a})}setColorMaintainSaturation(t,e,r,o){if(o&&r.startsWith("hs")){const t=We.exec(e);if(null!==t){const[,e,r]=t;this.hue=Number(e),this.saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput,r=Object.values(e);this.hue=r[0],this.saturation=r[1]}else{const{h:e}=t.toHsv();this.hue=e}this.applyColorToState(t.toHsv())}applyColorFromState(){this._color=new Ye(this.extractColorFromState(this))}get hue(){return this._hue}set hue(t){const e=Math.min(360,Math.max(0,t));if(e===this.hue)return;const r=this.hue,{s:o,v:i}=this._color.toHsv();this._color=new Ye({h:e,s:o,v:i}),this._hue=e,this.host.requestUpdate("hue",r)}get value(){return this.color}get color(){return this.getColorProcesses[this._format.format||"hex"](this._color,this._format.isString)}set color(t){if(t===this.color)return;const e=this._color;this._color=new Ye(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o},this.setColorProcess(this._color,t,r,o),this.host.requestUpdate("color",e)}getColor(t){return this._color[{hsl:"toHsl"}[t]]()}setColor(t){this._color=t;const e="string"==typeof this._color.originalInput||this._color.originalInput instanceof String;this.setColorProcess(this._color,t,this._color.format,e)}getHslString(){return this._color.toHslString()}savePreviousColor(){this._previousColor=this._color.clone()}restorePreviousColor(){this.setColor(this._previousColor)}}var er=r`
.slider{height:100%;left:0;margin:0;opacity:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:0}:host([focused]) .handle{height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}:host{border-radius:var(
--spectrum-colorarea-border-radius,var(--spectrum-alias-border-radius-regular)
);cursor:default;display:inline-block;height:var(
--spectrum-colorarea-default-height,var(--spectrum-global-dimension-size-2400)
);position:relative;-webkit-user-select:none;user-select:none;width:var(
--spectrum-colorarea-default-width,var(--spectrum-global-dimension-size-2400)
)}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host:before{border-radius:var(
--spectrum-colorarea-border-radius,var(--spectrum-alias-border-radius-regular)
);bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:1}.handle{left:0;top:0}.gradient{border-radius:var(
--spectrum-colorarea-border-radius,var(--spectrum-alias-border-radius-regular)
);height:100%;width:100%}:host:before{box-shadow:inset 0 0 0 var(
--spectrum-colorarea-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorarea-border-color,var(--spectrum-alias-border-color-translucent)
)}.gradient{forced-color-adjust:none}:host([disabled]){background:var(
--spectrum-colorarea-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]):before{box-shadow:inset 0 0 0 var(
--spectrum-colorarea-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorarea-border-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .gradient{display:none}@media (forced-colors:active){:host{--spectrum-colorarea-fill-color-disabled:GrayText}:host([disabled]){forced-color-adjust:none}}:host{touch-action:none}:host:before{pointer-events:none}.gradient{overflow:hidden}.handle{transform:translate(var(--spectrum-colorarea-default-width))}::slotted(*){height:100%;width:100%}
`,rr=Object.defineProperty,or=Object.getOwnPropertyDescriptor,ir=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?or(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&rr(e,r,s),s};class sr extends i{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.labelX="saturation",this.labelY="luminosity",this.colorController=new tr(this,{extractColorFromState:()=>({h:this.hue,s:this.x,v:1-this.y}),applyColorToState:({s:t,v:e})=>{this.x=t,this.y=1-e}}),this.activeAxis="x",this._x=1,this._y=0,this.step=.01,this.altered=0,this.activeKeys=new Set,this._pointerDown=!1}static get styles(){return[er]}get hue(){return this.colorController.hue}set hue(t){this.colorController.hue=t}get value(){return this.colorController.color}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get x(){return this._x}set x(t){if(t===this.x)return;const e=this.x;this.inputX?(this.inputX.value=t.toString(),this._x=this.inputX.valueAsNumber):this._x=t,this.requestUpdate("x",e)}get y(){return this._y}set y(t){if(t===this.y)return;const e=this.y;this.inputY?(this.inputY.value=t.toString(),this._y=this.inputY.valueAsNumber):this._y=t,this.requestUpdate("y",e)}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),"x"===this.activeAxis?this.inputX.focus():this.inputY.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.focused=!1)}handleKeydown(t){const{code:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length,0===e.search("Arrow")&&(t.preventDefault(),this.activeKeys.add(e),this.handleKeypress())}handleKeypress(){let t=0,e=0;const r=Math.max(this.step,5*this.altered*this.step);this.activeKeys.forEach((o=>{switch(o){case"ArrowUp":e=-1*r;break;case"ArrowDown":e=1*r;break;case"ArrowLeft":t=-1*r;break;case"ArrowRight":t=1*r}})),0!=t?(this.activeAxis="x",this.inputX.focus()):0!=e&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+t,0)),this.y=Math.min(1,Math.max(this.y+e,0)),this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),(0!=t||0!=e)&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor())}handleKeyup(t){t.preventDefault();const{code:e}=t;this.activeKeys.delete(e)}handleInput(t){const{valueAsNumber:e,name:r}=t.target;this[r]=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){const[e,r]=this.calculateHandlePosition(t);this.x=e,this.y=r,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){t.preventDefault(),this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);const e=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),"mouse"===t.pointerType&&(this.focused=!1),e||this.colorController.restorePreviousColor()}calculateHandlePosition(t){if(!this.boundingClientRect)return[this.x,this.y];const e=this.boundingClientRect,r=e.left,o=e.top,i=t.clientX,s=t.clientY,a=e.width,c=e.height;return[Math.max(0,Math.min(1,(i-r)/a)),Math.max(0,Math.min(1,(s-o)/c))]}handleAreaPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}render(){var t,e;const{width:r=0,height:o=0}=this.boundingClientRect||{};return s`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background:
                    linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),
                    linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${y(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style="transform: translate(${this.x*r}px, ${this.y*o}px);"
                ${ke({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            ></sp-color-handle>

            <div>
                <input
                    type="range"
                    class="slider"
                    name="x"
                    aria-label=${null!=(t=this.label)?t:this.labelX}
                    min="0"
                    max="1"
                    step=${this.step}
                    tabindex="-1"
                    .value=${String(this.x)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />
            </div>
            <div>
                <input
                    type="range"
                    class="slider"
                    name="y"
                    aria-label=${null!=(e=this.label)?e:this.labelY}
                    min="0"
                    max="1"
                    step=${this.step}
                    tabindex="-1"
                    .value=${String(this.y)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(super.updated(t),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),t.has("focused")&&this.focused){const t=this.inputX.parentElement,e=this.inputY.parentElement;if(!t.shadowRoot&&!e.shadowRoot){t.attachShadow({mode:"open"}),e.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,e.shadowRoot.innerHTML=r}}}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}ir([a({type:Boolean,reflect:!0})],sr.prototype,"disabled",2),ir([a({type:Boolean,reflect:!0})],sr.prototype,"focused",2),ir([a({type:String})],sr.prototype,"label",2),ir([a({type:String,attribute:"label-x"})],sr.prototype,"labelX",2),ir([a({type:String,attribute:"label-y"})],sr.prototype,"labelY",2),ir([z(".handle")],sr.prototype,"handle",2),ir([a({type:Number})],sr.prototype,"hue",1),ir([a({type:String})],sr.prototype,"value",1),ir([a({type:String})],sr.prototype,"color",1),ir([a({attribute:!1})],sr.prototype,"activeAxis",2),ir([a({type:Number})],sr.prototype,"x",1),ir([a({type:Number})],sr.prototype,"y",1),ir([a({type:Number})],sr.prototype,"step",2),ir([z('[name="x"]')],sr.prototype,"inputX",2),ir([z('[name="y"]')],sr.prototype,"inputY",2),customElements.define("sp-color-area",sr);var ar=r`
:host{--spectrum-colorslider-handle-hitarea-border-radius:0%;--spectrum-colorslider-handle-hitarea-width:var(
--spectrum-global-dimension-size-300
);--spectrum-colorslider-handle-hitarea-height:var(
--spectrum-global-dimension-size-300
)}:host([focused]) .handle{height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}.slider{height:100%;left:0;margin:0;opacity:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:0}:host{cursor:default;display:block;height:var(
--spectrum-colorslider-height,var(--spectrum-global-dimension-size-300)
);position:relative;-webkit-user-select:none;user-select:none;width:var(
--spectrum-colorslider-default-length,var(--spectrum-global-dimension-size-2400)
)}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([vertical]){display:inline-block;height:var(
--spectrum-colorslider-vertical-default-length,var(--spectrum-global-dimension-size-2400)
);width:var(
--spectrum-colorslider-vertical-width,var(--spectrum-global-dimension-size-300)
)}:host([vertical]) .handle{left:50%;top:0}.handle{left:0;top:50%}.handle:after{border-radius:var(
--spectrum-colorslider-handle-hitarea-border-radius
);height:var(--spectrum-colorslider-handle-hitarea-height);width:var(--spectrum-colorslider-handle-hitarea-width)}.checkerboard{background-position:0 0,0 var(--spectrum-global-dimension-static-size-100,8px),var(--spectrum-global-dimension-static-size-100,8px) calc(var(--spectrum-global-dimension-static-size-100, 8px)*-1),calc(var(--spectrum-global-dimension-static-size-100, 8px)*-1) 0;background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px)}.checkerboard:before{border-radius:var(
--spectrum-colorslider-border-radius,var(--spectrum-alias-border-radius-regular)
);bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:1}.checkerboard,.gradient{border-radius:var(
--spectrum-colorslider-border-radius,var(--spectrum-alias-border-radius-regular)
);height:100%;width:100%}:host{--spectrum-colorslider-border-color:var(
--spectrum-colorarea-border-color,var(--spectrum-alias-border-color-translucent)
)}.checkerboard{background-color:var(
--spectrum-colorcontrol-checkerboard-light-color,var(--spectrum-global-color-static-white)
);background-image:linear-gradient(-45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(-45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%),linear-gradient(45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%)}.checkerboard:before{box-shadow:inset 0 0 0 var(
--spectrum-colorslider-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorslider-border-color,var(--spectrum-alias-border-color-translucent)
)}:host([disabled]) .checkerboard{background:var(
--spectrum-colorslider-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .checkerboard:before{box-shadow:0 0 0 var(
--spectrum-colorslider-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorslider-border-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .gradient{display:none}@media (forced-colors:active){:host{--spectrum-colorslider-border-color-disabled:GrayText;--spectrum-colorslider-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{--sp-color-slider-gradient-fallback:red 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%;touch-action:none}:host(:focus){outline:none}.gradient{overflow:hidden}::slotted(*){height:100%;width:100%}
`,cr=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,nr=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?lr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&cr(e,r,s),s};class dr extends v{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.vertical=!1,this.colorController=new tr(this,{applyColorToState:()=>{this.sliderHandlePosition=this.colorController.hue/360*100},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this.sliderHandlePosition=0,this.step=1,this._altered=0,this._pointerDown=!1}static get styles(){return[ar]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+r)),this.value=this.sliderHandlePosition/100*360,this.colorController.applyColorFromState(),0!=r&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.sliderHandlePosition=this.value/360*100,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.sliderHandlePosition=this.calculateHandlePosition(t),this.value=this.sliderHandlePosition/100*360,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.sliderHandlePosition;const e=this.boundingClientRect,r=this.vertical?e.top:e.left,o=this.vertical?t.clientY:t.clientX,i=this.vertical?e.height:e.width;return 100*Math.max(0,Math.min(1,(o-r)/i))}handleGradientPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}get handlePositionStyles(){return`${this.vertical?"top":"left"}: ${this.sliderHandlePosition}%`}render(){return s`
            <div
                class="checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style="background: linear-gradient(to ${this.vertical?"bottom":"right"}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)));"
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${y(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${ke({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            ></sp-color-handle>
            <input
                type="range"
                class="slider"
                min="0"
                max="360"
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}nr([a({type:Boolean,reflect:!0})],dr.prototype,"disabled",2),nr([a({type:Boolean,reflect:!0})],dr.prototype,"focused",2),nr([z(".handle")],dr.prototype,"handle",2),nr([a({type:String})],dr.prototype,"label",2),nr([a({type:Boolean,reflect:!0})],dr.prototype,"vertical",2),nr([a({type:Number})],dr.prototype,"value",1),nr([a({type:Number,reflect:!0})],dr.prototype,"sliderHandlePosition",2),nr([a({type:String})],dr.prototype,"color",1),nr([a({type:Number})],dr.prototype,"step",2),nr([z("input")],dr.prototype,"input",2),customElements.define("sp-color-slider",dr);var ur=r`
:host{--spectrum-colorwheel-border-radius:100%;--spectrum-colorwheel-width:calc(var(--spectrum-global-dimension-size-125)*16);--spectrum-colorwheel-height:var(
--spectrum-colorwheel-width,var(--spectrum-global-dimension-size-2400)
)}:host([focused]) .handle{height:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2);margin-left:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);margin-top:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*-1);width:calc(var(
--spectrum-colorhandle-size,
var(--spectrum-global-dimension-size-200)
)*2)}.slider{height:100%;left:0;margin:0;opacity:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:0}:host{border-radius:var(--spectrum-colorwheel-border-radius);cursor:default;display:block;height:var(
--spectrum-colorwheel-height,var(--spectrum-global-dimension-size-2400)
);position:relative;-webkit-user-select:none;user-select:none;width:var(
--spectrum-colorwheel-width,var(--spectrum-global-dimension-size-2400)
)}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([dragged]){z-index:2}::slotted([slot=gradient]){border-radius:100%;border-style:solid;border-width:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;height:var(
--spectrum-colorwheel-height,var(--spectrum-global-dimension-size-2400)
);position:relative;width:var(
--spectrum-colorwheel-width,var(--spectrum-global-dimension-size-2400)
);z-index:0}.wheel{position:relative;z-index:1}.innerCircle,.outerCircle{fill:transparent;stroke-width:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
)}.handle{left:50%;top:50%}:host{--spectrum-colorwheel-border-color:var(
--spectrum-colorarea-border-color,var(--spectrum-alias-border-color-translucent)
)}:host([disabled]) .innerCircle,:host([disabled]) .outerCircle{stroke:var(
--spectrum-colorwheel-border-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .outerCircle{fill:var(
--spectrum-colorwheel-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .segment{display:none}::slotted([slot=gradient]){border-color:var(
--spectrum-colorwheel-border-color,var(--spectrum-alias-border-color-translucent)
)}.innerCircle,.outerCircle{stroke:var(
--spectrum-colorwheel-border-color,var(--spectrum-alias-border-color-translucent)
)}@media (forced-colors:active){:host{--spectrum-colorwheel-border-color-disabled:GrayText;--spectrum-colorwheel-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{touch-action:none}:host(:focus){outline:none}.wheel{background:conic-gradient(from 90deg,red,#ff8000,#ff0,#80ff00,#0f0,#00ff80,#0ff,#0080ff,#00f,#8000ff,#f0f,#ff0080,red);height:100%;width:100%}.wheel:after,.wheel:before{border-color:var(--spectrum-colorwheel-border-color);border-radius:50%;border-style:solid;border-width:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
);content:"";position:absolute}.wheel:after{inset:0}.wheel:before{inset:24px}:host([disabled]) .wheel:after,:host([disabled]) .wheel:before{border-color:var(
--spectrum-colorwheel-border-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled]) .wheel{background:var(
--spectrum-colorwheel-fill-color-disabled,var(--spectrum-global-color-gray-300)
)}
`,pr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,mr=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?hr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&pr(e,r,s),s};class gr extends v{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.step=1,this.colorController=new tr(this,{applyColorToState:()=>{},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this._altered=0,this._pointerDown=!1}static get styles(){return[ur]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.value=(360+this.value+r)%360,this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor()}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.value=this.calculateHandlePosition(t),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.value;const e=this.boundingClientRect,{width:r,height:o,left:i,top:s}=e,a=i+r/2,c=s+o/2,l=t.clientX-a,n=t.clientY-c;return(360+180*Math.atan2(n,l)/Math.PI+360)%360}handleGradientPointerdown(t){if(0!==t.button||t.target.classList.contains("innerCircle"))return;t.stopPropagation(),t.preventDefault();const{button:e,pointerId:r,pointerType:o}=t;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:e,pointerId:r,pointerType:o})),this.handlePointermove(t)}render(){const{width:t=160}=this.boundingClientRect||{},e=t/2,r=e-24,o=2*r,i=`path(evenodd, "M ${e} ${e} m -${e} 0 a ${e} ${e} 0 1 0 ${t} 0 a ${e} ${e} 0 1 0 -${t} 0 M ${e} ${e} m -${r} 0 a ${r} ${r} 0 1 0 ${o} 0 a ${r} ${r} 0 1 0 -${o} 0")`,a=`transform: translate(${(e-12.5)*Math.cos(this.value*Math.PI/180)}px, ${(e-12.5)*Math.sin(this.value*Math.PI/180)}px);`;return s`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div class="wheel" style="clip-path: ${i}"></div>
            </slot>

            <sp-color-handle
                tabindex=${y(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${a}
                ${ke({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                aria-label=${this.label}
                min="0"
                max="360"
                step=${this.step}
                .value=${String(this.value)}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}mr([a({type:Boolean,reflect:!0})],gr.prototype,"disabled",2),mr([a({type:Boolean,reflect:!0})],gr.prototype,"focused",2),mr([z(".handle")],gr.prototype,"handle",2),mr([a({type:String})],gr.prototype,"label",2),mr([a({type:Number})],gr.prototype,"step",2),mr([a({type:Number})],gr.prototype,"value",1),mr([a({type:String})],gr.prototype,"color",1),mr([z("input")],gr.prototype,"input",2),customElements.define("sp-color-wheel",gr);var br=r`
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
);outline:none;width:-moz-fit-content;width:fit-content}:host([size=s]){width:var(
--spectrum-dialog-confirm-small-width
)}:host([size=m]){width:var(
--spectrum-dialog-confirm-medium-width
)}:host([size=l]){width:var(
--spectrum-dialog-confirm-large-width
)}::slotted([slot=hero]){background-position:50%;background-size:cover;border-top-left-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);border-top-right-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);grid-area:hero;height:var(--spectrum-dialog-confirm-hero-height);overflow:hidden}.grid{display:grid;grid-template-areas:"hero hero    hero    hero        hero        hero" ".    .       .       .           .           ." ".    heading header  header      typeIcon    ." ".    divider divider divider     divider     ." ".    content content content     content     ." ".    footer  footer  buttonGroup buttonGroup ." ".    .       .       .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
);width:100%}:host([dir=ltr]) ::slotted([slot=heading]){padding-right:var(
--spectrum-dialog-confirm-gap-size
)}:host([dir=rtl]) ::slotted([slot=heading]){padding-left:var(
--spectrum-dialog-confirm-gap-size
)}::slotted([slot=heading]){font-size:var(--spectrum-dialog-confirm-title-text-size);font-weight:var(
--spectrum-dialog-confirm-title-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);grid-area:heading;line-height:var(
--spectrum-dialog-confirm-title-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin:0;outline:none}:host([dir=ltr]) .no-header::slotted([slot=heading]){padding-right:0}:host([dir=rtl]) .no-header::slotted([slot=heading]){padding-left:0}.no-header::slotted([slot=heading]){grid-area:heading-start/heading-start/header-end/header-end}.header{align-items:center;box-sizing:border-box;display:flex;grid-area:header;justify-content:flex-end;outline:none}.type-icon{grid-area:typeIcon}.divider{grid-area:divider;margin-bottom:var(
--spectrum-dialog-confirm-divider-margin-bottom,var(--spectrum-global-dimension-static-size-200)
);margin-top:var(
--spectrum-dialog-confirm-divider-margin-top,var(--spectrum-global-dimension-static-size-150)
);width:100%}:host([mode=fullscreen]) slot[name=heading]+.divider{margin-bottom:calc(var(
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
);margin:0 var(--spectrum-dialog-confirm-description-margin);overflow-y:auto;padding:calc(var(--spectrum-dialog-confirm-description-padding)*2)}.content,.footer{outline:none}.footer{display:flex;flex-wrap:wrap;grid-area:footer;padding-top:var(--spectrum-dialog-confirm-footer-padding-top)}.footer>.button+.button,.footer>::slotted(*){margin-bottom:0}:host([dir=ltr]) .button-group{padding-left:var(
--spectrum-dialog-confirm-gap-size
)}:host([dir=rtl]) .button-group{padding-right:var(
--spectrum-dialog-confirm-gap-size
)}.button-group{display:flex;grid-area:buttonGroup;justify-content:flex-end;padding-top:var(--spectrum-dialog-confirm-buttongroup-padding-top)}.button-group.button-group--noFooter{grid-area:footer-start/footer-start/buttonGroup-end/buttonGroup-end}:host([dismissable]) .grid{grid-template-areas:"hero hero    hero    hero        hero        hero        hero" ".    .       .       .           .           closeButton closeButton" ".    heading header  header      typeIcon    closeButton closeButton" ".    divider divider divider     divider     divider     ." ".    content content content     content     content     ." ".    footer  footer  buttonGroup buttonGroup buttonGroup ." ".    .       .       .           .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}:host([dismissable]) .grid .button-group{display:none}:host([dismissable]) .grid .footer{grid-area:footer/footer/buttonGroup/buttonGroup}:host([dir=ltr]) .close-button{margin-right:var(
--spectrum-dialog-confirm-close-button-padding
)}:host([dir=rtl]) .close-button{margin-left:var(
--spectrum-dialog-confirm-close-button-padding
)}.close-button{align-self:start;grid-area:closeButton;justify-self:end;margin-top:var(--spectrum-dialog-confirm-close-button-padding)}:host([error]){width:var(
--spectrum-dialog-error-width,90%
)}:host([mode=fullscreen]){height:100%;width:100%}:host([mode=fullscreenTakeover]){border-radius:0;height:100%;width:100%}:host([mode=fullscreenTakeover]),:host([mode=fullscreen]){max-height:none;max-width:none}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:".    .       .       .            ." ".    heading header  buttonGroup  ." ".    divider divider divider      ." ".    content content content      ." ".    .       .       .            .";grid-template-columns:var(--spectrum-dialog-confirm-padding) 1fr auto auto var(
--spectrum-dialog-confirm-padding
);grid-template-rows:var(--spectrum-dialog-confirm-padding) auto auto 1fr var(
--spectrum-dialog-confirm-padding
)}:host([mode=fullscreenTakeover]) ::slotted([slot=heading]),:host([mode=fullscreen]) ::slotted([slot=heading]){font-size:var(
--spectrum-dialog-fullscreen-header-text-size
)}:host([mode=fullscreenTakeover]) .content,:host([mode=fullscreen]) .content{max-height:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .button-group,:host([mode=fullscreen]) .footer{padding-top:0}:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .footer{display:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreen]) .button-group{align-self:start;grid-area:buttonGroup}@media screen and (max-width:700px){.grid{grid-template-areas:"hero hero    hero    hero        hero        hero" ".    .       .       .           .           ." ".    heading heading heading     typeIcon    ." ".    header  header  header      header      ." ".    divider divider divider     divider     ." ".    content content content     content     ." ".    footer  footer  buttonGroup buttonGroup ." ".    .       .       .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}:host([dismissable]) .grid{grid-template-areas:"hero hero    hero    hero        hero        hero        hero" ".    .       .       .           .           closeButton closeButton" ".    heading heading heading     typeIcon    closeButton closeButton" ".    header  header  header      header      header      ." ".    divider divider divider     divider     divider     ." ".    content content content     content     content     ." ".    footer  footer  buttonGroup buttonGroup buttonGroup ." ".    .       .       .           .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(--spectrum-dialog-confirm-padding);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
--spectrum-dialog-confirm-padding
)}.header{justify-content:flex-start}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:".    .            ." ".    heading      ." ".    header       ." ".    divider      ." ".    content      ." ".    buttonGroup  ." ".    .            .";grid-template-columns:var(--spectrum-dialog-confirm-padding) 1fr var(
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
`,vr=Object.defineProperty,fr=Object.getOwnPropertyDescriptor,kr=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?fr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&vr(e,r,s),s};let yr=0;function wr(t,e){const r=t.assignedElements(),o=[];return r.forEach((t=>{if(t.id)o.push(t.id);else{const r=e+"-"+yr++;t.id=r,o.push(r)}})),o}const zr=class extends(x(h(i,['[slot="hero"]','[slot="footer"]','[slot="button"]']))){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.noDivider=!1,this.shouldManageTabOrderForScrolling=()=>{const{offsetHeight:t,scrollHeight:e}=this.contentElement;t<e?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")},this.labelledbyId="sp-dialog-label-"+zr.instanceCount++,this.describedbyId="sp-dialog-description-"+zr.instanceCount++}static get styles(){return[br]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return s`
            <slot name="hero"></slot>
        `}renderHeading(){return s`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return s`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}renderFooter(){return s`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const t={"button-group":!0,"button-group--noFooter":!this.hasFooter};return s`
            <sp-button-group class=${F(t)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return s`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return s`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?s`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:c}
                ${this.noDivider?c:s`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():c}
                ${this.hasButtons?this.renderButtons():c}
                ${this.dismissable?this.renderDismiss():c}
            </div>
        `}shouldUpdate(t){return t.has("mode")&&this.mode&&(this.dismissable=!1),t.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(t)}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","dialog")}onHeadingSlotchange({target:t}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const e=wr(t,this.labelledbyId);e.length&&(this.conditionLabelledby=I(this,"aria-labelledby",e))}onContentSlotChange({target:t}){this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const e=wr(t,this.describedbyId);if(e.length&&e.length<4)this.conditionDescribedby=I(this,"aria-describedby",e);else if(!e.length){const t=!!this.id;t||(this.id=this.describedbyId);const e=I(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{e(),t||this.removeAttribute("id")}}}connectedCallback(){super.connectedCallback(),this.tabIndex=0,window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}};let xr=zr;xr.instanceCount=0,kr([z(".close-button")],xr.prototype,"closeButton",2),kr([z(".content")],xr.prototype,"contentElement",2),kr([a({type:Boolean,reflect:!0})],xr.prototype,"error",2),kr([a({type:Boolean,reflect:!0})],xr.prototype,"dismissable",2),kr([a({type:Boolean,reflect:!0,attribute:"no-divider"})],xr.prototype,"noDivider",2),kr([a({type:String,reflect:!0})],xr.prototype,"mode",2),kr([a({type:String,reflect:!0})],xr.prototype,"size",2),customElements.define("sp-dialog",xr);var Pr=r`
:host{align-items:center;box-sizing:border-box;display:flex;height:100vh;height:-webkit-fill-available;height:-moz-available;height:stretch;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden;width:100vw;z-index:2}:host([open]){visibility:visible}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]){border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}:host([responsive]){margin-top:0}}
`,Cr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Sr=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Br(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Cr(e,r,s),s};class Tr extends(x(i)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[Pr,S]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const t=j(this.dialog);t?(t.updateComplete&&await t.updateComplete,t.focus(),this.removeAttribute("tabindex")):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(t){t.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(t){!this.open&&"visibility"===t.propertyName&&(this.resolveTransitionPromise(),this.dispatchClosed())}handleModalTransitionend(){(this.open||!this.underlay)&&(this.resolveTransitionPromise(),this.open||this.dispatchClosed())}update(t){t.has("open")&&void 0!==t.get("open")&&(this.animating=!0,this.transitionPromise=new Promise((t=>{this.resolveTransitionPromise=()=>{this.animating=!1,t()}}))),super.update(t)}renderDialog(){return s`
            <slot></slot>
        `}render(){return s`
            ${this.underlay?s`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                          @transitionend=${this.handleUnderlayTransitionend}
                      ></sp-underlay>
                  `:s``}
            <div
                class="modal ${this.mode}"
                @transitionend=${this.handleModalTransitionend}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(t){t.has("open")&&(this.open?"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()})):this.tabIndex=0)}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}Sr([a({type:Boolean,reflect:!0})],Tr.prototype,"dismissable",2),Sr([a({type:Boolean,reflect:!0})],Tr.prototype,"open",2),Sr([a({type:String,reflect:!0})],Tr.prototype,"mode",2),Sr([a({type:Boolean})],Tr.prototype,"responsive",2),Sr([a({type:Boolean})],Tr.prototype,"underlay",2),customElements.define("sp-dialog-base",Tr);var $r=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,Er=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?qr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&$r(e,r,s),s};class Lr extends Tr{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){const t=this.noDivider||!this.headline||"none"===this.headlineVisibility;return s`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${t}
                ?error=${this.error}
                mode=${y(this.mode)}
                size=${y(this.size)}
            >
                ${this.hero?s`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${y(this.heroLabel?void 0:"true")}
                              alt=${y(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:s``}
                ${this.headline?s`
                          <h2
                              slot="heading"
                              ?hidden=${"none"===this.headlineVisibility}
                          >
                              ${this.headline}
                          </h2>
                      `:s``}
                <slot></slot>
                ${this.footer?s`
                          <div slot="footer">${this.footer}</div>
                      `:s``}
                ${this.cancelLabel?s`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:s``}
                ${this.secondaryLabel?s`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:s``}
                ${this.confirmLabel?s`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:s``}
            </sp-dialog>
        `}}Er([a({type:Boolean,reflect:!0})],Lr.prototype,"error",2),Er([a({attribute:"cancel-label"})],Lr.prototype,"cancelLabel",2),Er([a({attribute:"confirm-label"})],Lr.prototype,"confirmLabel",2),Er([a()],Lr.prototype,"footer",2),Er([a()],Lr.prototype,"hero",2),Er([a({attribute:"hero-label"})],Lr.prototype,"heroLabel",2),Er([a({type:Boolean,reflect:!0,attribute:"no-divider"})],Lr.prototype,"noDivider",2),Er([a({type:String,reflect:!0})],Lr.prototype,"size",2),Er([a({attribute:"secondary-label"})],Lr.prototype,"secondaryLabel",2),Er([a()],Lr.prototype,"headline",2),Er([a({type:String,attribute:"headline-visibility"})],Lr.prototype,"headlineVisibility",2),customElements.define("sp-dialog-wrapper",Lr);var Or=r`
:host{border-radius:var(
--spectrum-dropzone-border-radius,var(--spectrum-alias-border-radius-regular)
);border-style:dashed;border-width:var(
--spectrum-dropzone-border-width,var(--spectrum-alias-border-size-thick)
);padding:var(
--spectrum-dropzone-padding,var(--spectrum-global-dimension-size-900)
);text-align:center}:host([dragged]){border-style:solid}:host(:focus){border-style:dashed;outline:0}:host(:focus.focus-visible){border-style:solid}:host(:focus.focus-visible){border-style:solid}:host(:focus:focus-visible){border-style:solid}:host{border-color:var(
--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300)
)}:host([dragged]){background-color:var(
--spectrum-dropzone-background-color-selected-hover,var(--spectrum-alias-highlight-selected)
);border-color:var(
--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400)
)}:host([dragged]) ::slotted(*){color:var(
--spectrum-global-color-blue-400
)}:host(:focus){border-color:var(
--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300)
)}:host(:focus) ::slotted(*){color:var(
--spectrum-global-color-static-gray-500,rgb(var(--spectrum-global-color-static-gray-500-rgb))
)}:host(:focus.focus-visible){border-color:var(
--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400)
)}:host(:focus.focus-visible){border-color:var(
--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400)
)}:host(:focus:focus-visible){border-color:var(
--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400)
)}:host(:focus[dragged].focus-visible) ::slotted(*){color:var(
--spectrum-global-color-blue-400
)}:host(:focus[dragged].focus-visible) ::slotted(*){color:var(
--spectrum-global-color-blue-400
)}:host(:focus[dragged]:focus-visible) ::slotted(*){color:var(
--spectrum-global-color-blue-400
)}:host{--spectrum-dropzone-illustration-color:var(
--spectrum-global-color-static-blue-400
);display:block}::slotted(*){font-family:var(
--spectrum-body-m-text-font-family,var(--spectrum-alias-body-text-font-family)
);font-size:var(
--spectrum-body-s-text-size,var(--spectrum-alias-font-size-default)
);font-style:var(
--spectrum-body-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-s-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-s-text-transform,none)}:host([dragged]) ::slotted(*){--spectrum-global-color-gray-500:var(
--spectrum-dropzone-illustration-color
)}
`,Ar=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor;class Dr extends i{constructor(){super(...arguments),this._dropEffect="copy",this.isDragged=!1,this.debouncedDragLeave=null}static get styles(){return[Or]}get dropEffect(){return this._dropEffect}set dropEffect(t){["copy","move","link","none"].includes(t)&&(this._dropEffect=t)}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave)}onDragOver(t){const e=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:t}),r=this.dispatchEvent(e);if(!t.dataTransfer)return;if(!r)return void(t.dataTransfer.dropEffect="none");t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,t.dataTransfer.dropEffect=this.dropEffect;const o=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(o)}onDragLeave(t){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout((()=>{this.isDragged=!1;const e=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}),100)}onDrop(t){t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const e=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}render(){return s`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null)}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Mr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&Ar(e,r,s)})([a({type:Boolean,reflect:!0,attribute:"dragged"})],Dr.prototype,"isDragged",2),customElements.define("sp-dropzone",Dr);var Hr=r`
:host{--spectrum-fieldgroup-margin:var(
--spectrum-spacing-300
);--spectrum-fieldgroup-readonly-delimiter:"\\002c"}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{align-items:top;display:flex;flex-direction:column;flex-wrap:wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(
--spectrum-fieldgroup-margin
)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}.spectrum-Checkbox.is-readOnly .spectrum-Checkbox-box{display:none}.spectrum-Checkbox.is-readOnly:not(:last-child) .spectrum-Checkbox-label:after{content:var(
--spectrum-fieldgroup-readonly-delimiter
)}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`,Ir=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,Fr=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?jr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Ir(e,r,s),s};class _r extends($(i,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[Hr]}handleSlotchange(){}render(){return s`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}Fr([a({type:Boolean,reflect:!0})],_r.prototype,"horizontal",2),Fr([a({type:Boolean,reflect:!0})],_r.prototype,"invalid",2),Fr([a()],_r.prototype,"label",2),Fr([a({type:Boolean,reflect:!0})],_r.prototype,"vertical",2),customElements.define("sp-field-group",_r);var Ur=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor;class Nr extends l{constructor(){super(...arguments),this.registered=!1,this.handleRemoved=({detail:t})=>{t.name===this.name&&(this.registered=!1,this.addIconset())}}firstUpdated(){this.style.display="none"}set name(t){this.registered&&(this._name&&_.getInstance().removeIconset(this._name),t&&_.getInstance().addIconset(t,this)),this._name=t}get name(){return this._name}connectedCallback(){super.connectedCallback(),this.addIconset(),window.addEventListener("sp-iconset-removed",this.handleRemoved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-removed",this.handleRemoved),this.removeIconset()}addIconset(){!this.name||this.registered||(_.getInstance().addIconset(this.name,this),this.registered=!0)}removeIconset(){this.name&&(_.getInstance().removeIconset(this.name),this.registered=!1)}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Rr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&Ur(e,r,s)})([a()],Nr.prototype,"name",1);var Vr=Object.defineProperty,Gr=Object.getOwnPropertyDescriptor;class Kr extends Nr{constructor(){super(...arguments),this.iconMap=new Map}updated(t){if(!this.slotContainer)return;const e=this.getSVGNodes(this.slotContainer);this.updateSVG(e),super.updated(t)}async applyIconToElement(t,e,r,o){await this.updateComplete;const i=this.iconMap.get(e);if(!i)throw new Error(`Unable to find icon ${e}`);const s=this.prepareSvgClone(i);s.setAttribute("role","img"),o?s.setAttribute("aria-label",o):s.setAttribute("aria-hidden","true"),t.shadowRoot?t.shadowRoot.appendChild(s):t.appendChild(s)}getIconList(){return[...this.iconMap.keys()]}prepareSvgClone(t){const e=t.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=e.getAttribute("viewBox")||"";for(r.style.cssText="pointer-events: none; display: block; width: 100%; height: 100%;",r.setAttribute("viewBox",o),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false");e.childNodes.length>0;)r.appendChild(e.childNodes[0]);return r}getSVGIconName(t){return t}getSanitizedIconName(t){return t}renderDefaultContent(){return s``}render(){return s`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `}updateSVG(t){t.reduce(((t,e)=>{const r=e.querySelectorAll("symbol");return t.push(...r),t}),[]).forEach((t=>{this.iconMap.set(this.getSanitizedIconName(t.id),t)}))}getSVGNodes(t){return t.assignedNodes({flatten:!0}).filter((t=>"svg"===t.nodeName))}onSlotChange(t){const e=t.target,r=this.getSVGNodes(e);this.updateSVG(r)}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Gr(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&Vr(e,r,s)})([z("slot")],Kr.prototype,"slotContainer",2);var Xr=n`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 14 14"><path d="M12.93 6.227L9.023 2.32a1.094 1.094 0 10-1.546 1.547l2.039 2.04H1.844a1.094 1.094 0 100 2.187h7.672l-2.04 2.039a1.094 1.094 0 001.547 1.547l3.907-3.907a1.093 1.093 0 000-1.546z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 16 16"><path d="M14.606 7.194l-4.458-4.459a1.14 1.14 0 10-1.612 1.612L11.05 6.86H2.108a1.14 1.14 0 000 2.28h8.942l-2.514 2.513a1.14 1.14 0 101.611 1.612l4.46-4.46a1.139 1.139 0 000-1.61z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 16 16"><path d="M15.364 7.161l-5.083-5.083a1.186 1.186 0 00-1.678 1.678l3.057 3.058H1.277a1.187 1.187 0 100 2.373H11.66l-3.056 3.057a1.186 1.186 0 101.677 1.678l5.083-5.083a1.185 1.185 0 000-1.678z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 18 18"><path d="M17.216 8.126l-5.79-5.79a1.236 1.236 0 00-1.746 1.75l3.683 3.683c-.008 0-.014-.004-.021-.004H1.337a1.236 1.236 0 000 2.472H13.34c.007 0 .013-.004.02-.004l-3.68 3.682a1.236 1.236 0 101.748 1.748l5.789-5.789a1.237 1.237 0 000-1.748zm-2.643.895c0-.008.004-.014.004-.021s-.004-.013-.004-.02l.02.02z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 22 22"><path d="M20.17 10.089l-6.585-6.585a1.289 1.289 0 00-1.822 1.822l4.386 4.386H2.276a1.288 1.288 0 000 2.576h13.873l-4.386 4.386a1.289 1.289 0 001.822 1.822l6.585-6.585a1.289 1.289 0 000-1.822z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 24 24"><path d="M22.24 11.052l-7.485-7.485a1.341 1.341 0 00-1.897 1.897l5.194 5.194H2.079a1.342 1.342 0 000 2.684h15.973l-5.194 5.194a1.341 1.341 0 101.897 1.897l7.484-7.485a1.34 1.34 0 000-1.896z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 12 12"><path d="M11.325 5.258L7.91 1.84a1.05 1.05 0 00-1.486 1.484L8.048 4.95H1.494a1.05 1.05 0 000 2.1h6.554L6.423 8.675a1.05 1.05 0 001.486 1.484l3.416-3.417a1.05 1.05 0 000-1.484z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 10 10"><path d="M8.176 8.281c.069.07.115.163 0 .255l-1.437.927c-.115.07-.161.024-.208-.092l-1.783-3.1-2.339 2.571c-.024.045-.093.091-.161 0L1.136 7.678c-.116-.069-.093-.139 0-.208l2.639-2.2-3.01-1.134c-.046 0-.115-.092-.07-.209l.788-1.574a.123.123 0 01.151-.083.128.128 0 01.058.038l2.639 1.713L4.494.64a.122.122 0 01.1-.139.172.172 0 01.038 0l1.922.255c.116 0 .139.046.116.163l-.9 3.31 3.057-.927c.069-.046.139-.046.185.092l.3 1.713c.023.116 0 .162-.093.162l-3.2.255z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 12 12"><path d="M9.575 9.696c.077.079.129.183 0 .287L7.96 11.025c-.129.079-.182.027-.234-.1L5.72 7.433l-2.633 2.893c-.027.051-.1.1-.182 0l-1.251-1.3c-.131-.077-.1-.156 0-.234l2.97-2.476-3.388-1.285c-.052 0-.129-.1-.079-.235l.886-1.771a.138.138 0 01.17-.093.144.144 0 01.065.042l2.97 1.928.183-3.8a.137.137 0 01.114-.156.197.197 0 01.042 0l2.163.287c.131 0 .156.052.131.183L6.86 5.136l3.44-1.043c.077-.052.156-.052.208.1l.339 1.928c.025.13 0 .183-.1.183l-3.6.287z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 12 12"><path d="M10.024 10.155c.087.089.146.206 0 .323l-1.819 1.173c-.146.089-.2.03-.263-.117L5.685 7.605l-2.962 3.254c-.03.057-.117.116-.2 0L1.116 9.392c-.147-.087-.117-.176 0-.263l3.339-2.785L.642 4.908c-.059 0-.146-.117-.089-.264l1-1.993a.156.156 0 01.192-.1.163.163 0 01.073.048l3.337 2.163.206-4.28a.155.155 0 01.128-.176.23.23 0 01.047 0l2.433.323c.147 0 .176.059.147.206l-1.144 4.19 3.87-1.173c.087-.06.176-.06.234.117l.381 2.169c.028.147 0 .206-.117.206l-4.046.323z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.825 6.903c.061.062.1.144 0 .227l-1.277.824c-.1.062-.143.02-.185-.082L3.78 5.112 1.7 7.398c-.021.04-.082.08-.143 0L.569 6.367c-.1-.061-.082-.123 0-.185l2.347-1.957-2.68-1.007c-.041 0-.1-.082-.062-.186l.7-1.4a.109.109 0 01.135-.073.114.114 0 01.051.033l2.347 1.523.145-3.006a.109.109 0 01.09-.123.14.14 0 01.033 0l1.709.227c.1 0 .123.04.1.144l-.8 2.943 2.718-.824c.061-.041.123-.041.165.082l.268 1.523c.02.1 0 .144-.082.144l-2.842.227z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 14 14"><path d="M5.125 12.625a1.25 1.25 0 01-.96-.45L1.04 8.425a1.25 1.25 0 011.92-1.6l2.136 2.563 5.922-7.536a1.25 1.25 0 111.964 1.545l-6.874 8.75a1.25 1.25 0 01-.965.478z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 14 14"><path d="M4.891 13.224a1.304 1.304 0 01-1.005-.474l-3.54-4.3a1.302 1.302 0 012.011-1.655l2.508 3.046 6.758-8.647a1.302 1.302 0 112.05 1.604l-7.756 9.926a1.301 1.301 0 01-1.01.5z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 16 16"><path d="M5.627 14.894a1.357 1.357 0 01-1.042-.488l-4.1-4.92A1.357 1.357 0 012.569 7.75l3.027 3.631L13.4 1.448a1.356 1.356 0 012.133 1.675l-8.84 11.252a1.356 1.356 0 01-1.048.519z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 18 18"><path d="M6.33 16.642a1.415 1.415 0 01-1.086-.509l-4.683-5.62a1.413 1.413 0 012.171-1.81l3.566 4.28 8.936-11.374a1.413 1.413 0 012.223 1.746L7.441 16.102a1.415 1.415 0 01-1.09.54z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 12 12"><path d="M4.519 10.608a1.151 1.151 0 01-.885-.414L1.27 7.358a1.152 1.152 0 011.77-1.476l1.453 1.743 4.45-5.665a1.152 1.152 0 011.813 1.424l-5.331 6.784a1.153 1.153 0 01-.89.44z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 20 20"><path d="M6.997 18.48a1.47 1.47 0 01-1.13-.53L.521 11.538a1.471 1.471 0 112.26-1.885l4.182 5.017L17.18 1.666a1.472 1.472 0 112.314 1.818L8.154 17.917a1.472 1.472 0 01-1.135.562z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 24 24"><path d="M8.621 21.417a1.535 1.535 0 01-1.178-.552l-6.091-7.31a1.533 1.533 0 112.355-1.962l4.879 5.854L20.249 2.602a1.533 1.533 0 112.41 1.895L9.826 20.831a1.53 1.53 0 01-1.182.585z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 12 12"><path d="M4.333 11.09a1.2 1.2 0 01-.922-.433L.69 7.392a1.2 1.2 0 111.844-1.536l1.772 2.126 5.14-6.542a1.2 1.2 0 111.886 1.482L5.277 10.63a1.2 1.2 0 01-.927.459z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 14 14"><path d="M4.5 13.25a1.094 1.094 0 01-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 015.273 1.07l5.157 5.156a1.094 1.094 0 010 1.546L5.273 12.93a1.091 1.091 0 01-.773.321z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 16 16"><path d="M5.123 15.005a1.14 1.14 0 01-.806-1.945L9.377 8l-5.06-5.06a1.14 1.14 0 011.612-1.61l5.865 5.864a1.139 1.139 0 010 1.612L5.929 14.67a1.135 1.135 0 01-.806.334z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 16 16"><path d="M4.696 15.853a1.187 1.187 0 01-.84-2.026L9.684 8 3.856 2.173A1.187 1.187 0 015.536.495L12.2 7.16a1.187 1.187 0 010 1.678l-6.666 6.666a1.183 1.183 0 01-.84.348z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 18 18"><path d="M5.213 17.805a1.236 1.236 0 01-.874-2.11L11.034 9 4.34 2.305A1.236 1.236 0 016.087.557l7.57 7.569a1.235 1.235 0 010 1.748l-7.57 7.569a1.232 1.232 0 01-.874.362z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 20 20"><path d="M5.667 19.876a1.288 1.288 0 01-.91-2.199L12.433 10 4.756 2.323A1.288 1.288 0 016.578.502l8.588 8.587a1.288 1.288 0 010 1.822l-8.588 8.588a1.284 1.284 0 01-.911.377z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 24 24"><path d="M7.05 23.078a1.341 1.341 0 01-.948-2.29L14.89 12 6.102 3.212a1.341 1.341 0 011.896-1.898l9.737 9.737a1.34 1.34 0 010 1.898l-9.737 9.737a1.335 1.335 0 01-.948.392z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 12 12"><path d="M3.833 11.578a1.05 1.05 0 01-.742-1.793L6.876 6 3.091 2.215A1.05 1.05 0 114.575.73l4.529 4.527a1.05 1.05 0 010 1.486L4.575 11.27a1.047 1.047 0 01-.742.308z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 7 7"><path d="M6.687.75a.311.311 0 00-.221.091L.842 6.466a.312.312 0 00.221.533h5.624a.312.312 0 00.312-.312V1.062A.312.312 0 006.687.75z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 8 8"><path d="M7.65.97a.35.35 0 00-.249.1L1.07 7.401a.352.352 0 00.249.6H7.65a.352.352 0 00.352-.352V1.322A.352.352 0 007.65.97z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 8 8"><path d="M7.605.09a.394.394 0 00-.28.116L.206 7.325A.4.4 0 00.49 8h7.115a.4.4 0 00.4-.4V.49a.4.4 0 00-.4-.4z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 6 6"><path d="M5.718.44a.277.277 0 00-.2.081l-5 5a.278.278 0 00.2.474h5a.278.278 0 00.278-.278v-5A.278.278 0 005.718.44z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 10 10"><path d="M6.548 5L9.63 1.917A1.094 1.094 0 008.084.371L5.001 3.454 1.917.37A1.094 1.094 0 00.371 1.917L3.454 5 .37 8.085A1.094 1.094 0 101.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 101.547-1.546z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 12 12"><path d="M7.611 6l3.654-3.653A1.14 1.14 0 009.653.735L6 4.39 2.347.735A1.14 1.14 0 00.735 2.347L4.39 6 .735 9.653a1.14 1.14 0 101.612 1.612L6 7.61l3.653 3.654a1.14 1.14 0 001.612-1.612z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 14 14"><path d="M8.678 7l4.245-4.244a1.186 1.186 0 00-1.678-1.678L7.001 5.323 2.755 1.077a1.187 1.187 0 00-1.678 1.678L5.322 7l-4.244 4.244a1.187 1.187 0 001.678 1.678l4.245-4.245 4.244 4.245a1.186 1.186 0 001.678-1.678z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 16 16"><path d="M9.748 8l4.915-4.915a1.236 1.236 0 00-1.748-1.748L8 6.252 3.085 1.337a1.236 1.236 0 00-1.748 1.748L6.252 8l-4.915 4.915a1.236 1.236 0 101.748 1.748L8 9.748l4.915 4.915a1.236 1.236 0 001.748-1.748z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 16 16"><path d="M9.823 8l5.674-5.674A1.289 1.289 0 1013.675.504L8 6.179 2.326.503A1.288 1.288 0 00.504 2.326l5.674 5.675-5.674 5.674a1.288 1.288 0 001.822 1.822L8 9.822l5.674 5.675a1.289 1.289 0 101.823-1.822z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 18 18"><path d="M10.897 9l6.537-6.536A1.341 1.341 0 1015.537.567L9 7.104 2.465.567A1.341 1.341 0 00.567 2.464L7.104 9 .567 15.537a1.341 1.341 0 101.897 1.897L9 10.897l6.536 6.537a1.341 1.341 0 101.897-1.897z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 10 10"><path d="M6.485 5l2.674-2.674A1.05 1.05 0 107.674.84L5 3.515 2.326.84A1.05 1.05 0 00.84 2.326L3.515 5 .84 7.674A1.05 1.05 0 002.326 9.16L5 6.485 7.674 9.16A1.05 1.05 0 109.16 7.674z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 12 12"><path d="M10.375 7.25h-8.75a1.25 1.25 0 010-2.5h8.75a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 14 14"><path d="M12.026 8.302H1.974a1.302 1.302 0 010-2.604h10.052a1.302 1.302 0 010 2.604z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 16 16"><path d="M13.763 9.356H2.237a1.356 1.356 0 010-2.712h11.526a1.356 1.356 0 010 2.712z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 18 18"><path d="M15.596 10.413H2.404a1.413 1.413 0 010-2.826h13.192a1.413 1.413 0 010 2.826z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 10 10"><path d="M8.293 6.152H1.708a1.152 1.152 0 010-2.304h6.585a1.152 1.152 0 110 2.304z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 20 20"><path d="M17.54 11.472H2.461a1.472 1.472 0 010-2.944h15.077a1.472 1.472 0 010 2.944z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 22 22"><path d="M19.604 12.533H2.398a1.533 1.533 0 110-3.066h17.206a1.533 1.533 0 010 3.066z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 10 10"><path d="M8.75 6.2h-7.5a1.2 1.2 0 010-2.4h7.5a1.2 1.2 0 110 2.4z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 20 6"><path d="M19.375 1.75H.625a.625.625 0 010-1.25h18.75a.625.625 0 010 1.25zM20 4.875a.626.626 0 00-.625-.625H.625a.625.625 0 000 1.25h18.75A.626.626 0 0020 4.875z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 30 4"><path d="M28.75 3.25H1.25a1.25 1.25 0 010-2.5h27.5a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 14 10"><path d="M12.625 1.25H1.375a.625.625 0 010-1.25h11.25a.625.625 0 010 1.25zm.625 3.125a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625zm0 3.75a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625z"/></symbol></svg>`;customElements.define("sp-icons-large",class extends Kr{constructor(){super(),this.name="ui"}renderDefaultContent(){return Xr}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var Yr=n`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 10 10"><path d="M9.7 4.387L6.623 1.262a.875.875 0 10-1.247 1.226l1.61 1.637H.925a.875.875 0 000 1.75h6.062l-1.61 1.637a.875.875 0 101.247 1.226l3.075-3.125a.874.874 0 000-1.226z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 12 12"><path d="M11.284 5.356L7.718 1.788a.911.911 0 10-1.29 1.29l2.012 2.01H1.286a.911.911 0 100 1.823H8.44L6.429 8.923a.911.911 0 001.289 1.289l3.566-3.567a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 14 14"><path d="M12.893 6.33L8.826 2.261a.95.95 0 10-1.344 1.341L9.93 6.051H1.621a.95.95 0 100 1.898H9.93l-2.447 2.447a.95.95 0 001.344 1.342l4.067-4.067a.95.95 0 000-1.342z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 16 16"><path d="M14.572 7.3l-4.63-4.63a.989.989 0 00-1.399 1.398l2.942 2.943H1.87a.99.99 0 000 1.978h9.615l-2.942 2.943a.989.989 0 101.398 1.398l4.631-4.63a.988.988 0 000-1.4z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 18 18"><path d="M16.336 8.271l-5.269-5.267A1.03 1.03 0 109.61 4.46l3.51 3.509H2.021a1.03 1.03 0 000 2.06H13.12l-3.51 3.51a1.03 1.03 0 101.457 1.456l5.269-5.268a1.03 1.03 0 000-1.456z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 20 20"><path d="M18.191 9.241l-5.986-5.987a1.073 1.073 0 00-1.518 1.517l4.155 4.156H2.063a1.073 1.073 0 100 2.146h12.779l-4.154 4.155a1.073 1.073 0 101.517 1.518l5.986-5.987a1.073 1.073 0 000-1.518z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 10 10"><path d="M9.26 4.406L6.528 1.672A.84.84 0 005.34 2.859l1.3 1.301H1.396a.84.84 0 000 1.68H6.64l-1.301 1.3a.84.84 0 001.188 1.188l2.734-2.734a.84.84 0 000-1.188z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 8 8"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 10 10"><path d="M7.861 7.953c.062.063.1.146 0 .23l-1.293.834c-.1.063-.145.021-.187-.083l-1.6-2.793-2.105 2.314c-.021.04-.083.082-.145 0l-1-1.043c-.1-.062-.083-.125 0-.187l2.375-1.981-2.715-1.026c-.042 0-.1-.083-.063-.188l.707-1.412a.111.111 0 01.136-.074.116.116 0 01.052.034l2.378 1.54.146-3.043A.11.11 0 014.638.95a.161.161 0 01.034 0l1.73.23c.1 0 .125.042.1.146l-.814 2.979 2.751-.834c.062-.042.125-.042.167.083l.271 1.542c.02.1 0 .146-.083.146l-2.876.23z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 10 10"><path d="M8.266 8.324c.07.071.116.164 0 .258l-1.454.938c-.116.071-.163.024-.21-.094l-1.8-3.141-2.367 2.6c-.024.045-.094.092-.163 0l-1.13-1.167c-.118-.07-.094-.141 0-.21l2.671-2.227L.766 4.13c-.047 0-.116-.094-.071-.211l.8-1.593a.124.124 0 01.153-.084.13.13 0 01.058.038l2.669 1.738.164-3.422a.124.124 0 01.1-.14.186.186 0 01.038 0l1.945.258c.118 0 .14.047.118.164l-.915 3.349 3.094-.938c.07-.047.14-.047.187.094l.3 1.734c.023.118 0 .164-.094.164l-3.234.258z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.26 6.463c.049.05.082.116 0 .181l-1.022.659c-.082.05-.115.017-.148-.066L3.822 5.03 2.16 6.859c-.017.032-.066.065-.115 0l-.79-.824c-.083-.049-.066-.1 0-.148l1.877-1.565L.99 3.516c-.033 0-.082-.066-.05-.148l.56-1.119a.087.087 0 01.108-.059.09.09 0 01.04.027l1.878 1.218.116-2.4a.087.087 0 01.072-.1h.027l1.367.181c.083 0 .1.033.083.116L4.55 3.581l2.174-.659c.049-.033.1-.033.132.066l.214 1.218c.016.083 0 .115-.066.115l-2.273.181z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 10 10"><path d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 12 12"><path d="M4.313 10.98a1.042 1.042 0 01-.8-.375L.647 7.165a1.042 1.042 0 011.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 011.64 1.287l-6.24 7.94a1.04 1.04 0 01-.804.399z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 14 14"><path d="M5.102 12.514a1.087 1.087 0 01-.834-.39L.988 8.19A1.085 1.085 0 012.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 011.707 1.34L5.955 12.1a1.089 1.089 0 01-.838.415z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 16 16"><path d="M5.864 14.114a1.13 1.13 0 01-.868-.407L1.25 9.21a1.13 1.13 0 111.736-1.448l2.854 3.425 7.148-9.1a1.13 1.13 0 111.778 1.397L6.753 13.682a1.13 1.13 0 01-.872.432z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 10 10"><path d="M3.815 8.687a.921.921 0 01-.708-.332l-1.891-2.27a.921.921 0 011.416-1.18L3.794 6.3l3.56-4.531a.921.921 0 111.45 1.138L4.54 8.335a.921.921 0 01-.712.351z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 16 16"><path d="M5.597 14.784a1.177 1.177 0 01-.905-.424L.417 9.229a1.177 1.177 0 111.809-1.508l3.343 4.013 8.174-10.402a1.177 1.177 0 011.852 1.456L6.523 14.334a1.178 1.178 0 01-.91.45z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 18 18"><path d="M6.297 16.534a1.228 1.228 0 01-.942-.442L.48 10.244a1.227 1.227 0 011.885-1.57l3.904 4.684L15.6 1.482a1.227 1.227 0 011.93 1.516L7.262 16.065a1.229 1.229 0 01-.947.469z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 10 10"><path d="M3.667 9.07a.96.96 0 01-.737-.344L.753 6.114a.96.96 0 111.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 011.51 1.186L4.422 8.704a.962.962 0 01-.741.367z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 12 12"><path d="M9.034 5.356L4.343.663a.911.911 0 00-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 101.289 1.29l4.691-4.692a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 14 14"><path d="M10.639 7a.947.947 0 00-.278-.671l-.003-.002-5.33-5.33a.95.95 0 00-1.342 1.342L8.346 7l-4.661 4.66a.95.95 0 101.342 1.343l5.33-5.33.003-.001A.947.947 0 0010.64 7z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 16 16"><path d="M4.97 15.044a.989.989 0 01-.698-1.688L9.627 8 4.27 2.644a.989.989 0 011.4-1.398L11.726 7.3a.988.988 0 010 1.398L5.67 14.754a.985.985 0 01-.7.29z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 16 16"><path d="M12.133 7.271L5.263.401a1.03 1.03 0 00-1.457 1.457L9.947 8l-6.141 6.142a1.03 1.03 0 001.457 1.457l6.87-6.87a1.03 1.03 0 000-1.457z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 18 18"><path d="M5.04 17.863a1.073 1.073 0 01-.759-1.832L11.313 9 4.28 1.969A1.073 1.073 0 015.8.45l7.79 7.79a1.073 1.073 0 010 1.518l-7.79 7.79a1.07 1.07 0 01-.759.314z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 10 10"><path d="M7.482 4.406l-.001-.001L3.86.783a.84.84 0 00-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 003.86 9.216l3.621-3.622h.001a.84.84 0 000-1.19z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 5 5"><path d="M4.763 0a.248.248 0 00-.177.073l-4.5 4.5A.25.25 0 00.263 5h4.5a.25.25 0 00.25-.25V.25a.25.25 0 00-.25-.25z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 6 6"><path d="M5.719.37a.281.281 0 00-.2.082L.452 5.519a.281.281 0 00.2.481h5.067A.281.281 0 006 5.719V.652A.281.281 0 005.72.37z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 7 7"><path d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 5 5"><path d="M4.78.558a.222.222 0 00-.157.065l-4 4a.222.222 0 00.157.379h4a.222.222 0 00.222-.222v-4A.222.222 0 004.78.558z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 8 8"><path d="M5.238 4l2.456-2.457A.875.875 0 106.456.306L4 2.763 1.543.306A.875.875 0 00.306 1.544L2.763 4 .306 6.457a.875.875 0 101.238 1.237L4 5.237l2.456 2.457a.875.875 0 101.238-1.237z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 10 10"><path d="M6.29 5l2.922-2.922a.911.911 0 00-1.29-1.29L5 3.712 2.078.789a.911.911 0 00-1.29 1.289L3.712 5 .79 7.922a.911.911 0 101.289 1.29L5 6.288 7.923 9.21a.911.911 0 001.289-1.289z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 12 12"><path d="M7.344 6l3.395-3.396a.95.95 0 00-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 00-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 001.343 1.343L6 7.344l3.395 3.395a.95.95 0 001.344-1.344z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 12 12"><path d="M7.398 6l3.932-3.932A.989.989 0 009.932.67L6 4.602 2.068.67A.989.989 0 00.67 2.068L4.602 6 .67 9.932a.989.989 0 101.398 1.398L6 7.398l3.932 3.932a.989.989 0 001.398-1.398z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 14 14"><path d="M8.457 7l4.54-4.54a1.03 1.03 0 00-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 00-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 101.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 001.456-1.458z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 16 16"><path d="M9.518 8l5.23-5.228a1.073 1.073 0 00-1.518-1.518L8.001 6.483l-5.229-5.23a1.073 1.073 0 00-1.518 1.519L6.483 8l-5.23 5.229a1.073 1.073 0 101.518 1.518l5.23-5.23 5.228 5.23a1.073 1.073 0 001.518-1.518z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 8 8"><path d="M5.188 4l2.14-2.14A.84.84 0 106.141.672L4 2.812 1.86.672A.84.84 0 00.672 1.86L2.812 4 .672 6.14A.84.84 0 101.86 7.328L4 5.188l2.14 2.14A.84.84 0 107.328 6.14z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 10 10"><path d="M8.5 6h-7a1 1 0 010-2h7a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 12 12"><path d="M10.021 7.042H1.98a1.042 1.042 0 110-2.083h8.043a1.042 1.042 0 010 2.083z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 12 12"><path d="M10.61 7.085H1.39a1.085 1.085 0 010-2.17h9.22a1.085 1.085 0 010 2.17z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 14 14"><path d="M12.277 8.13H1.723a1.13 1.13 0 110-2.26h10.554a1.13 1.13 0 110 2.26z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 8 8"><path d="M6.634 4.921H1.366a.921.921 0 010-1.842h5.268a.921.921 0 110 1.842z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 16 16"><path d="M14.03 9.178H1.969a1.178 1.178 0 110-2.356H14.03a1.178 1.178 0 010 2.356z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 18 18"><path d="M15.882 10.227H2.117a1.227 1.227 0 010-2.454h13.765a1.227 1.227 0 010 2.454z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 8 8"><path d="M6.99 4.96H1.01a.96.96 0 010-1.92h5.98a.96.96 0 010 1.92z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 16 4"><path d="M15.45 1.05H.55a.5.5 0 010-1h14.9a.5.5 0 010 1zm.5 2.4a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h14.9a.5.5 0 00.5-.5z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 24 2"><path d="M23 2H1a1 1 0 010-2h22a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 10 8"><path d="M9.45 1.05H.55a.5.5 0 010-1h8.9a.5.5 0 010 1zm.5 2.45a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5z"/></symbol></svg>`;customElements.define("sp-icons-medium",class extends Kr{constructor(){super(),this.name="ui"}renderDefaultContent(){return Yr}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var Wr=r`
:host{margin:calc(var(--spectrum-listitem-texticon-divider-padding)/2) var(--spectrum-listitem-texticon-padding-y);overflow:visible;width:auto}@media (forced-colors:active){:host{background-color:CanvasText;forced-color-adjust:none}}:host{display:block}
`;class Zr extends(f(i,{validSizes:["s","m","l"]})){static get styles(){return[T,Wr]}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}}customElements.define("sp-menu-divider",Zr);var Qr=r`
:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(
--spectrum-animation-ease-in-out
);--spectrum-progressbar-animation-duration-indeterminate:var(
--spectrum-animation-duration-2000
);--spectrum-progressbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-progressbar-fill-size-indeterminate:70%;--spectrum-progressbar-size-2400:192px;--spectrum-progressbar-size-2500:200px;--spectrum-progressbar-size-2800:224px;--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-progressbar-min-size:var(--spectrum-progress-bar-minimum-width);--spectrum-progressbar-max-size:var(--spectrum-progress-bar-maximum-width);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-medium
);--spectrum-progressbar-line-height:var(--spectrum-line-height-100);--spectrum-progressbar-spacing-label-to-progressbar:var(
--spectrum-spacing-75
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-progressbar-spacing-label-to-text:var(--spectrum-spacing-200);--spectrum-progressbar-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-progressbar-track-color:var(--spectrum-gray-300);--spectrum-progressbar-fill-color:var(--spectrum-accent-color-900);--spectrum-progressbar-fill-color-positive:var(
--spectrum-positive-visual-color
);--spectrum-progressbar-fill-color-notice:var(
--spectrum-notice-visual-color
);--spectrum-progressbar-fill-color-negative:var(
--spectrum-negative-visual-color
);--spectrum-progressbar-label-and-value-white:var(--spectrum-white);--spectrum-progressbar-track-color-white:var(
--spectrum-transparent-white-300
);--spectrum-progressbar-fill-color-white:var(--spectrum-white)}:host([size=s]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2400
);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-small
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=m]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2400
);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=l]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2500
);--spectrum-progressbar-font-size:var(--spectrum-font-size-100);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
)}:host([size=xl]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2800
);--spectrum-progressbar-font-size:var(--spectrum-font-size-200);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-extra-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
)}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}:host{align-items:center;display:inline-flex;flex-flow:row wrap;font-size:var(
--mod-progressbar-font-size,var(--spectrum-progressbar-font-size)
);inline-size:var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
);justify-content:space-between;max-inline-size:var(
--mod-progressbar-max-size,var(--spectrum-progressbar-max-size)
);min-inline-size:var(
--mod-progressbar-min-size,var(--spectrum-progressbar-min-size)
);position:relative;vertical-align:top}.label,.percentage{color:var(
--mod-progressbar-text-color,var(--spectrum-progressbar-text-color)
);line-height:var(
--mod-progressbar-line-height,var(--spectrum-progressbar-line-height)
);margin-block-end:var(
--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar)
);margin-block-start:var(
--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text)
);text-align:start}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(
--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk)
)}.label{flex:1 1 0%}.percentage{align-self:flex-start;margin-inline-start:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}.track{background:var(
--highcontrast-progressbar-track-color,var(
--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)
)
);block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
);border-radius:var(--spectrum-progressbar-corner-radius);inline-size:100%;overflow:hidden}:host([positive]) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host([notice]) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host([negative]) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-negative,var(--spectrum-progressbar-fill-color-negative)
)
)}.fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)
)
);block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
);border:none;transition:width 1s}:host([indeterminate]) .fill{animation-timing-function:var(
--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate)
);inline-size:var(
--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate)
);position:relative;will-change:transform}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between}:host([side-label]) .track{flex:1 1 var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
)}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}:host([side-label]) .percentage{margin-block-end:0;margin-inline-start:var(
--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
);order:3;text-align:end}:host([static=white]) .fill{background:var(
--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white)
);color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .label,:host([static=white]) .percentage{color:var(
--mode-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .track{background-color:var(
--spectrum-progressbar-track-color-white
)}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(
--mod-progressbar-fill-size-indeterminate,
var(--spectrum-progressbar-fill-size-indeterminate)
)*-1))}to{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)
))}to{transform:translate(calc(var(
--mod-progressbar-size-default,
var(--spectrum-progressbar-size-default)
)*-1))}}.fill{transform-origin:left}:host([dir=rtl]) .fill{transform-origin:right}
`,Jr=Object.defineProperty,to=Object.getOwnPropertyDescriptor,eo=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?to(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Jr(e,r,s),s};class ro extends(f(p(i,""))){constructor(){super(...arguments),this.progress=0,this.overBackground=!1,this.notice=!1,this.negative=!1,this.positive=!1,this.label="",this.sideLabel=!1}static get styles(){return[Qr]}render(){return s`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?s``:this.label}
                <slot>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${this.progress}%
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}eo([a({type:Number})],ro.prototype,"progress",2),eo([a({type:Boolean,reflect:!0,attribute:"over-background"})],ro.prototype,"overBackground",2),eo([a({type:Boolean,reflect:!0})],ro.prototype,"notice",2),eo([a({type:Boolean,reflect:!0})],ro.prototype,"negative",2),eo([a({type:Boolean,reflect:!0})],ro.prototype,"positive",2),eo([a({type:String,reflect:!0})],ro.prototype,"label",2),eo([a({type:Boolean,reflect:!0,attribute:"side-label"})],ro.prototype,"sideLabel",2),eo([a({type:String,reflect:!0})],ro.prototype,"static",2),customElements.define("sp-meter",ro);const oo=Symbol("language resolver updated");class io{constructor(t){this.language=document.documentElement.lang||navigator.language,this.host=t,this.host.addController(this)}hostConnected(){this.resolveLanguage()}hostDisconnected(){var t;null==(t=this.unsubscribe)||t.call(this)}resolveLanguage(){const t=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:(t,e)=>{const r=this.language;this.language=t,this.unsubscribe=e,this.host.requestUpdate(oo,r)}},cancelable:!0});this.host.dispatchEvent(t)}}let so=new Map,ao=!1;try{ao="exceptZero"===new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay}catch(t){}let co=!1;try{co="unit"===new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style}catch(t){}const lo={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class no{format(t){let e="";if(e=ao||null==this.options.signDisplay?this.numberFormatter.format(t):function(t,e,r){if("auto"===e)return t.format(r);if("never"===e)return t.format(Math.abs(r));{let o=!1;if("always"===e?o=r>0||Object.is(r,0):"exceptZero"===e&&(Object.is(r,-0)||Object.is(r,0)?r=Math.abs(r):o=r>0),o){let e=t.format(-r),o=t.format(r),i=e.replace(o,"").replace(/\u200e|\u061C/,"");return 1!==[...i].length&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),e.replace(o,"!!!").replace(i,"+").replace("!!!",o)}return t.format(r)}}(this.numberFormatter,this.options.signDisplay,t),"unit"===this.options.style&&!co){var r;let{unit:t,unitDisplay:o="short",locale:i}=this.resolvedOptions(),s=null===(r=lo[t])||void 0===r?void 0:r[o];e+=s[i]||s.default}return e}formatToParts(t){return this.numberFormatter.formatToParts(t)}formatRange(t,e){if("function"==typeof this.numberFormatter.formatRange)return this.numberFormatter.formatRange(t,e);if(e<t)throw new RangeError("End date must be >= start date");return`${this.format(t)} – ${this.format(e)}`}formatRangeToParts(t,e){if("function"==typeof this.numberFormatter.formatRangeToParts)return this.numberFormatter.formatRangeToParts(t,e);if(e<t)throw new RangeError("End date must be >= start date");let r=this.numberFormatter.formatToParts(t),o=this.numberFormatter.formatToParts(e);return[...r.map((t=>({...t,source:"startRange"}))),{type:"literal",value:" – ",source:"shared"},...o.map((t=>({...t,source:"endRange"})))]}resolvedOptions(){let t=this.numberFormatter.resolvedOptions();return ao||null==this.options.signDisplay||(t={...t,signDisplay:this.options.signDisplay}),co||"unit"!==this.options.style||(t={...t,style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay}),t}constructor(t,e={}){this.numberFormatter=function(t,e={}){let{numberingSystem:r}=e;r&&-1===t.indexOf("-u-nu-")&&(t=`${t}-u-nu-${r}`);if("unit"===e.style&&!co){var o;let{unit:t,unitDisplay:r="short"}=e;if(!t)throw new Error('unit option must be provided with style: "unit"');if(!(null===(o=lo[t])||void 0===o?void 0:o[r]))throw new Error(`Unsupported unit ${t} with unitDisplay = ${r}`);e={...e,style:"decimal"}}let i=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():"");if(so.has(i))return so.get(i);let s=new Intl.NumberFormat(t,e);return so.set(i,s),s}(t,e),this.options=e}}const uo=new RegExp("^.*\\(.*\\).*$"),po=["latn","arab","hanidec"];class ho{parse(t){return go(this.locale,this.options,t).parse(t)}isValidPartialNumber(t,e,r){return go(this.locale,this.options,t).isValidPartialNumber(t,e,r)}getNumberingSystem(t){return go(this.locale,this.options,t).options.numberingSystem}constructor(t,e={}){this.locale=t,this.options=e}}const mo=new Map;function go(t,e,r){let o=bo(t,e);if(!t.includes("-nu-")&&!o.isValidPartialNumber(r))for(let i of po)if(i!==o.options.numberingSystem){let o=bo(t+(t.includes("-u-")?"-nu-":"-u-nu-")+i,e);if(o.isValidPartialNumber(r))return o}return o}function bo(t,e){let r=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():""),o=mo.get(r);return o||(o=new vo(t,e),mo.set(r,o)),o}class vo{parse(t){let e=this.sanitize(t);e=ko(e,this.symbols.group,"").replace(this.symbols.decimal,".").replace(this.symbols.minusSign,"-").replace(this.symbols.numeral,this.symbols.index);let r=e?+e:NaN;if(isNaN(r))return NaN;var o;("accounting"===this.options.currencySign&&uo.test(t)&&(r*=-1),"percent"===this.options.style)&&(r/=100,r=+r.toFixed((null!==(o=this.options.maximumFractionDigits)&&void 0!==o?o:0)+2));return r}sanitize(t){return t=(t=t.replace(this.symbols.literals,"")).replace("-",this.symbols.minusSign),"arab"===this.options.numberingSystem&&(t=ko(t=(t=t.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal),".",this.symbols.group)),"fr-FR"===this.options.locale&&(t=ko(t,".",String.fromCharCode(8239))),t}isValidPartialNumber(t,e=-1/0,r=1/0){return(t=this.sanitize(t)).startsWith(this.symbols.minusSign)&&e<0?t=t.slice(this.symbols.minusSign.length):this.symbols.plusSign&&t.startsWith(this.symbols.plusSign)&&r>0&&(t=t.slice(this.symbols.plusSign.length)),!t.startsWith(this.symbols.group)&&0===(t=ko(t,this.symbols.group,"").replace(this.symbols.numeral,"").replace(this.symbols.decimal,"")).length}constructor(t,e={}){this.formatter=new Intl.NumberFormat(t,e),this.options=this.formatter.resolvedOptions(),this.symbols=function(t,e,r){var o,i,s,a;let c=t.formatToParts(-10000.111),l=t.formatToParts(10000.111),n=t.formatToParts(1);var d;let u=null!==(d=null===(o=c.find((t=>"minusSign"===t.type)))||void 0===o?void 0:o.value)&&void 0!==d?d:"-",p=null===(i=l.find((t=>"plusSign"===t.type)))||void 0===i?void 0:i.value;p||"exceptZero"!==(null==r?void 0:r.signDisplay)&&"always"!==(null==r?void 0:r.signDisplay)||(p="+");let h=null===(s=c.find((t=>"decimal"===t.type)))||void 0===s?void 0:s.value,m=null===(a=c.find((t=>"group"===t.type)))||void 0===a?void 0:a.value,g=c.filter((t=>!fo.has(t.type))).map((t=>yo(t.value))),b=n.filter((t=>!fo.has(t.type))).map((t=>yo(t.value))),v=[...new Set([...b,...g])].sort(((t,e)=>e.length-t.length)),f=0===v.length?new RegExp("[\\p{White_Space}]","gu"):new RegExp(`${v.join("|")}|[\\p{White_Space}]`,"gu"),k=[...new Intl.NumberFormat(e.locale,{useGrouping:!1}).format(9876543210)].reverse(),y=new Map(k.map(((t,e)=>[t,e]))),w=new RegExp(`[${k.join("")}]`,"g"),z=t=>String(y.get(t));return{minusSign:u,plusSign:p,decimal:h,group:m,literals:f,numeral:w,index:z}}(this.formatter,this.options,e)}}const fo=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]);function ko(t,e,r){return t.replaceAll?t.replaceAll(e,r):t.split(e).join(r)}function yo(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}var wo=r`
:host{--spectrum-stepper-width:var(
--spectrum-global-dimension-size-900
);--spectrum-stepper-border-size:var(
--spectrum-alias-border-size-thin,var(--spectrum-global-dimension-static-size-10)
);--spectrum-stepper-button-height:calc(var(
--spectrum-alias-single-line-height,
var(--spectrum-global-dimension-size-400)
)/2);--spectrum-stepper-button-width:calc(var(--spectrum-global-dimension-size-300) - var(--spectrum-stepper-border-size));--spectrum-stepper-button-padding:calc(var(--spectrum-global-dimension-size-150)/2);--spectrum-stepper-border-radius-reset:0;--spectrum-stepper-border-size-reset:0;--spectrum-stepper-icon-nudge-top:var(--spectrum-global-dimension-size-10);--spectrum-stepper-icon-nudge:var(--spectrum-global-dimension-size-25);--spectrum-stepper-quiet-width:var(--spectrum-global-dimension-size-600);--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2 - var(--spectrum-alias-ui-icon-chevron-size-75)/2);--spectrum-stepper-quiet-button-width:calc(var(--spectrum-stepper-button-width) - var(--spectrum-stepper-button-offset))}#textfield{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
);display:inline-flex;flex-direction:row;flex-wrap:nowrap;line-height:0;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-stepper-width)}#textfield:before{content:""}:host([dir=ltr]) .buttons{border-top-left-radius:0}:host([dir=rtl]) .buttons{border-top-right-radius:0}:host([dir=ltr]) .buttons{border-top-right-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]) .buttons{border-top-left-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .buttons{border-bottom-right-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]) .buttons{border-bottom-left-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .buttons{border-bottom-left-radius:0}:host([dir=rtl]) .buttons{border-bottom-right-radius:0}.buttons{display:block;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{padding-left:var(
--spectrum-stepper-button-padding
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{padding-right:var(
--spectrum-stepper-button-padding
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{padding-right:var(
--spectrum-stepper-button-padding
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{padding-left:var(
--spectrum-stepper-button-padding
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-left-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-right-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepDown,.stepUp{border-width:var(--spectrum-stepper-border-size);box-sizing:border-box;display:flex;height:var(--spectrum-stepper-button-height);margin:0!important;min-width:0;position:relative;width:var(--spectrum-stepper-button-width)}.stepDown .stepper-icon,.stepUp .stepper-icon{margin:0!important;opacity:1}:host([dir=ltr]) .stepUp{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepUp{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepUp{border-bottom:none;padding-top:var(--spectrum-stepper-icon-nudge-top)}:host([dir=ltr]) .stepDown{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepDown{padding-bottom:var(
--spectrum-stepper-icon-nudge
)}.textfield{flex:1;width:auto}:host([dir=ltr]) .input{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .input{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr]) .input{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .input{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.input,.textfield{min-width:0}:host([quiet]) #textfield{border-radius:var(
--spectrum-stepper-border-radius-reset
);width:var(--spectrum-stepper-quiet-width)}:host([quiet]) .buttons{border-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{border-right-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{border-left-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{border-left:none}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{border-right:none}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{padding-right:0}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{padding-left:0}:host([quiet]) .stepDown,:host([quiet]) .stepUp{border-radius:var(--spectrum-stepper-border-radius-reset);border-top:none;justify-content:flex-end;min-width:0;width:var(
--spectrum-stepper-quiet-button-width
)}:host([dir=ltr][quiet]) .stepDown:after,:host([dir=ltr][quiet]) .stepUp:after{right:calc(var(--spectrum-stepper-button-offset)*-1)}:host([dir=rtl][quiet]) .stepDown:after,:host([dir=rtl][quiet]) .stepUp:after{left:calc(var(--spectrum-stepper-button-offset)*-1)}:host([quiet]) .stepDown:after,:host([quiet]) .stepUp:after{content:"";height:100%;position:absolute;width:var(--spectrum-stepper-button-offset)}:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .input,:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .stepDown,:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
)}:host([focused]) #textfield{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused]) #textfield .stepDown,:host([focused]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
);box-shadow:none}:host([focused][invalid]) #textfield{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .stepDown,:host([focused][invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([keyboard-focused]) #textfield{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused]) #textfield .input,:host([keyboard-focused]) #textfield .stepDown,:host([keyboard-focused]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused][invalid]) #textfield{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([keyboard-focused][invalid]) #textfield .stepDown,:host([keyboard-focused][invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([keyboard-focused][invalid]) #textfield .buttons{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([invalid]) #textfield .stepDown,:host([invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([invalid][keyboard-focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([invalid][keyboard-focused]) #textfield .buttons{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled]) #textfield .stepDown,:host([disabled]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
)}.stepDown,.stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}.stepDown:disabled,.stepUp:disabled{border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
)}:host([quiet][disabled]) #textfield .stepDown,:host([quiet][disabled]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host([quiet]) .stepDown,:host([quiet]) .stepUp{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([quiet]) .stepDown:disabled,:host([quiet]) .stepUp:disabled{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host([quiet]) .input{box-shadow:none}:host([quiet][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][invalid]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused]) #textfield,:host([quiet][keyboard-focused]) #textfield{box-shadow:none}:host([quiet][focused]) #textfield .buttons,:host([quiet][focused]) #textfield .input,:host([quiet][keyboard-focused]) #textfield .buttons,:host([quiet][keyboard-focused]) #textfield .input{box-shadow:0 1px 0 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([quiet][focused]) #textfield .stepDown,:host([quiet][keyboard-focused]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([quiet][focused][invalid]) #textfield,:host([quiet][keyboard-focused][invalid]) #textfield{box-shadow:none}:host([quiet][focused][invalid]) #textfield .buttons,:host([quiet][focused][invalid]) #textfield .input,:host([quiet][keyboard-focused][invalid]) #textfield .buttons,:host([quiet][keyboard-focused][invalid]) #textfield .input{box-shadow:0 1px 0 0 var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused][invalid]) #textfield .input,:host([quiet][keyboard-focused][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused][invalid]) #textfield .stepDown,:host([quiet][keyboard-focused][invalid]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}@media (forced-colors:active){#textfield{--spectrum-textfield-m-quiet-texticon-border-color-disabled:GrayText;--spectrum-textfield-m-texticon-border-color-disabled:GrayText;--spectrum-textfield-m-texticon-border-color-hover:Highlight;--spectrum-textfield-m-texticon-border-color-invalid:Highlight;--spectrum-textfield-m-texticon-border-color-invalid-key-focus:Highlight;--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus:Highlight;--spectrum-textfield-m-texticon-border-color-key-focus:Highlight;--spectrum-textfield-m-texticon-border-color-mouse-focus:Highlight;--spectrum-textfield-m-texticon-focus-ring-border-width:2px}:host([keyboard-focused]) #textfield{outline:2px solid var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{--spectrum-textfield-m-texticon-border-color:ButtonText}:host([quiet][focused]) #textfield,:host([quiet][keyboard-focused]) #textfield{outline:none}:host([quiet][focused]) #textfield .buttons,:host([quiet][focused]) #textfield .input,:host([quiet][keyboard-focused]) #textfield .buttons,:host([quiet][keyboard-focused]) #textfield .input{box-shadow:0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) 0 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);forced-color-adjust:none}:host([quiet][focused][invalid]) #textfield .buttons,:host([quiet][focused][invalid]) #textfield .input,:host([quiet][keyboard-focused][invalid]) #textfield .buttons,:host([quiet][keyboard-focused][invalid]) #textfield .input{box-shadow:0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) 0 0 var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
);forced-color-adjust:none}}:host{width:var(--spectrum-stepper-width)}:host([quiet]){width:var(--spectrum-stepper-quiet-width)}#textfield,:host([quiet]) #textfield{width:100%}sp-field-button{--spectrum-dropdown-height:100%;--spectrum-dropdown-padding-x:0}.input{font-feature-settings:"tnum";font-variant-numeric:tabular-nums}.buttons{--mod-actionbutton-background-color-disabled:var(
--spectrum-global-color-gray-200
)}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([hide-stepper]:not([quiet])) .input{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][invalid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][invalid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][valid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][valid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet][invalid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][invalid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr][quiet][valid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][valid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr]:not([hide-stepper])) .icon-workflow{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl]:not([hide-stepper])) .icon-workflow{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet]:not([hide-stepper])) .icon-workflow{left:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet]:not([hide-stepper])) .icon-workflow{right:var(--spectrum-stepper-button-width)}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:transparent}
`,zo=Object.defineProperty,xo=Object.getOwnPropertyDescriptor,Po=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?xo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&zo(e,r,s),s};const Co={"１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0","、":",","，":",","。":".","．":".","％":"%","＋":"+","ー":"-"};class Bo extends q{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.managedInput=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.changeCount=0,this.languageResolver=new io(this),this.wasIndeterminate=!1}static get styles(){return[...super.styles,wo,C]}set value(t){const e=this.validateInput(t);if(e===this.value)return;const r=this._value;this._value=e,this.requestUpdate("value",r)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}get valueAsString(){return this._value.toString()}set valueAsString(t){this.value=this.numberParser.parse(t)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(t){var e;if(X()&&"decimal"===this.inputElement.inputMode){const r=this.numberFormatter.formatToParts(1000.1),o=t.split("").find((t=>","===t||"."===t)),i=null==(e=r.find((t=>"decimal"===t.type)))?void 0:e.value;o&&i&&(t=t.replace(o,i))}return this.numberParser.parse(t)}get _step(){var t;return void 0!==this.step?this.step:"percent"===(null==(t=this.formatOptions)?void 0:t.style)?.01:1}handlePointerdown(t){if(0!==t.button)return void t.preventDefault();this.managedInput=!0,this.buttons.setPointerCapture(t.pointerId);const e=this.buttons.children[0].getBoundingClientRect(),r=this.buttons.children[1].getBoundingClientRect();this.findChange=t=>{t.clientX>=e.x&&t.clientY>=e.y&&t.clientX<=e.x+e.width&&t.clientY<=e.y+e.height?this.change=t=>this.increment(t.shiftKey?this.stepModifier:1):t.clientX>=r.x&&t.clientY>=r.y&&t.clientX<=r.x+r.width&&t.clientY<=r.y+r.height&&(this.change=t=>this.decrement(t.shiftKey?this.stepModifier:1))},this.findChange(t),this.startChange(t)}startChange(t){this.changeCount=0,this.doChange(t),this.safty=setTimeout((()=>{this.doNextChange(t)}),400)}doChange(t){this.change(t)}handlePointermove(t){this.findChange(t)}handlePointerup(t){this.buttons.releasePointerCapture(t.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.managedInput=!1}doNextChange(t){return this.changeCount+=1,this.changeCount%5==0&&this.doChange(t),requestAnimationFrame((()=>{this.nextChange=this.doNextChange(t)}))}stepBy(t){if(this.disabled||this.readonly)return;const e=void 0!==this.min?this.min:0;let r=this.value;r+=t*this._step,isNaN(this.value)?this.value=e:this.value=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus()}increment(t=1){this.stepBy(1*t)}decrement(t=1){this.stepBy(-1*t)}handleKeydown(t){switch(t.code){case"ArrowUp":t.preventDefault(),this.increment(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));break;case"ArrowDown":t.preventDefault(),this.decrement(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}onScroll(t){t.preventDefault(),this.managedInput=!0;const e=t.shiftKey?t.deltaX/Math.abs(t.deltaX):t.deltaY/Math.abs(t.deltaY);0!==e&&!isNaN(e)&&(this.stepBy(e*(t.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout((()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),100)),this.managedInput=!1}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1})}onBlur(){super.onBlur(),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll)}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1}handleChange(){const t=this.convertValueToNumber(this.inputValue);this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(t))?this.indeterminate=!0:(this.value=t,super.handleChange())}handleInput(){this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace("-",""));const{value:t,selectionStart:e}=this.inputElement,r=t.split("").map((t=>Co[t]||t)).join("");if(this.numberParser.isValidPartialNumber(r)){const t=this.convertValueToNumber(r);return!r&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(t)),this._trackingValue=r,void(this.inputElement.value=r)}const o=r.length,i=(e||o)-(o-this._trackingValue.length);this.inputElement.value=this.indeterminate?"-":this._trackingValue,this.inputElement.setSelectionRange(i,i)}validateInput(t){if(void 0!==this.min&&(t=Math.max(this.min,t)),void 0!==this.max&&(t=Math.min(this.max,t)),this.step){const e=(t-(void 0!==this.min?this.min:0))%this.step;if(0===e||(1===Math.round(e/this.step)?t+=this.step-e:t-=e),void 0!==this.max)for(;t>this.max;)t-=this.step}return t}get displayValue(){const t=this.focused?"":"-";return this.indeterminate?t:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberFormatterFocused=new no(this.languageResolver.language,o);try{this._numberFormatter=new no(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberParserFocused=new ho(this.languageResolver.language,o);try{this._numberParser=new ho(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",s`
            ${super.renderField()}
            ${this.hideStepper?s``:s`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${ke({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
                      >
                          <sp-action-button
                              class="stepUp"
                              label="Increment"
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||void 0!==this.max&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              <sp-icon-chevron75
                                  slot="icon"
                                  class="stepper-icon spectrum-UIIcon-ChevronUp75"
                              ></sp-icon-chevron75>
                          </sp-action-button>
                          <sp-action-button
                              class="stepDown"
                              label="Decrement"
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||void 0!==this.min&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              <sp-icon-chevron75
                                  slot="icon"
                                  class="stepper-icon spectrum-UIIcon-ChevronDown75"
                              ></sp-icon-chevron75>
                          </sp-action-button>
                      </span>
                  `}
        `}update(t){if((t.has("formatOptions")||t.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),t.has("value")||t.has("max")||t.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t}super.update(t)}willUpdate(t){this.multiline=!1,t.has(oo)&&this.clearNumberFormatterCache()}firstUpdated(t){super.firstUpdated(t),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(t.has("min")||t.has("formatOptions")){let t="numeric";const e=void 0!==this.min&&this.min<0,{maximumFractionDigits:r}=this.numberFormatter.resolvedOptions(),o=r>0;X()?e?t="text":o&&(t="decimal"):W()&&(e?t="numeric":o&&(t="decimal")),this.inputElement.inputMode=t}}}Po([z(".buttons")],Bo.prototype,"buttons",2),Po([a({type:Boolean,reflect:!0})],Bo.prototype,"focused",2),Po([a({type:Object,attribute:"format-options"})],Bo.prototype,"formatOptions",2),Po([a({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Bo.prototype,"hideStepper",2),Po([a({type:Boolean,reflect:!0})],Bo.prototype,"indeterminate",2),Po([a({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],Bo.prototype,"keyboardFocused",2),Po([a({type:Number})],Bo.prototype,"max",2),Po([a({type:Number})],Bo.prototype,"min",2),Po([a({type:Number})],Bo.prototype,"step",2),Po([a({type:Number,reflect:!0,attribute:"step-modifier"})],Bo.prototype,"stepModifier",2),Po([a({type:Number})],Bo.prototype,"value",1),customElements.define("sp-number-field",Bo);var So=Object.freeze({__proto__:null});customElements.define("overlay-trigger",ot);var To=r`
.root{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}.root:focus{outline:none}.root::-moz-focus-inner{border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host([disabled]) .root{cursor:default}:host([size=s]){--spectrum-PickerButton-label-padding-y:var(
--spectrum-alias-pickerbutton-label-padding-y-s,var(--spectrum-global-dimension-size-50)
);--spectrum-PickerButton-icon-margin-y:var(
--spectrum-alias-pickerbutton-icon-margin-y-s,var(--spectrum-global-dimension-size-85)
);--spectrum-PickerButton-icononly-padding-x:var(
--spectrum-alias-pickerbutton-icononly-padding-x-s,var(--spectrum-global-dimension-size-85)
)}:host([size=s]) .root{padding:var(
--spectrum-alias-infieldbutton-padding-s,0
)}:host([size=s]){--spectrum-PickerButton-Fill-size:var(
--spectrum-alias-infieldbutton-full-height-s,var(--spectrum-global-dimension-size-300)
)}:host([size=s]) .root .spectrum-PickerButton-fill{gap:var(--spectrum-global-dimension-size-75);height:var(
--spectrum-alias-infieldbutton-full-height-s,var(--spectrum-global-dimension-size-300)
);width:var(
--spectrum-alias-infieldbutton-full-height-s,var(--spectrum-global-dimension-size-300)
)}:host([size=s]) .root .spectrum-PickerButton-label{font-size:var(
--spectrum-global-dimension-font-size-75
);padding-bottom:var(
--spectrum-alias-pickerbutton-label-padding-y-s,var(--spectrum-global-dimension-size-50)
);padding-top:var(
--spectrum-alias-pickerbutton-label-padding-y-s,var(--spectrum-global-dimension-size-50)
)}:host([size=s]) .root .spectrum-PickerButton-icon{gap:var(
--spectrum-global-dimension-size-85
);height:var(--spectrum-global-dimension-size-200);margin-bottom:var(
--spectrum-alias-infieldbutton-icon-margin-y-s,var(--spectrum-global-dimension-size-50)
);margin-top:var(
--spectrum-alias-infieldbutton-icon-margin-y-s,var(--spectrum-global-dimension-size-50)
);width:var(--spectrum-global-dimension-size-200)}:host([size=s]) .root .spectrum-PickerButton-UIIcon{height:var(
--spectrum-alias-ui-icon-chevron-size-100
);margin-bottom:var(
--spectrum-alias-pickerbutton-icon-margin-y-s,var(--spectrum-global-dimension-size-85)
);margin-top:var(
--spectrum-alias-pickerbutton-icon-margin-y-s,var(--spectrum-global-dimension-size-85)
);width:var(--spectrum-alias-ui-icon-chevron-size-100)}:host([size=m]){--spectrum-PickerButton-label-padding-y:var(
--spectrum-alias-pickerbutton-label-padding-y-m,var(--spectrum-global-dimension-size-75)
);--spectrum-PickerButton-icon-margin-y:var(
--spectrum-alias-pickerbutton-icon-margin-y-m,var(--spectrum-global-dimension-size-125)
);--spectrum-PickerButton-icononly-padding-x:var(
--spectrum-alias-pickerbutton-icononly-padding-x-m,var(--spectrum-global-dimension-size-125)
)}:host([size=m]) .root{padding:var(
--spectrum-alias-infieldbutton-padding-m,0
)}:host([size=m]){--spectrum-PickerButton-Fill-size:var(
--spectrum-alias-infieldbutton-full-height-m,var(--spectrum-global-dimension-size-400)
)}:host([size=m]) .root .spectrum-PickerButton-fill{gap:var(--spectrum-global-dimension-size-85);height:var(
--spectrum-alias-infieldbutton-full-height-m,var(--spectrum-global-dimension-size-400)
);width:var(
--spectrum-alias-infieldbutton-full-height-m,var(--spectrum-global-dimension-size-400)
)}:host([size=m]) .root .spectrum-PickerButton-label{font-size:var(
--spectrum-global-dimension-font-size-100
);padding-bottom:var(
--spectrum-alias-pickerbutton-label-padding-y-m,var(--spectrum-global-dimension-size-75)
);padding-top:var(
--spectrum-alias-pickerbutton-label-padding-y-m,var(--spectrum-global-dimension-size-75)
)}:host([size=m]) .root .spectrum-PickerButton-icon{gap:var(
--spectrum-global-dimension-size-100
);height:var(--spectrum-global-dimension-size-225);margin-bottom:var(
--spectrum-alias-infieldbutton-icon-margin-y-m,var(--spectrum-global-dimension-size-85)
);margin-top:var(
--spectrum-alias-infieldbutton-icon-margin-y-m,var(--spectrum-global-dimension-size-85)
);width:var(--spectrum-global-dimension-size-225)}:host([size=m]) .root .spectrum-PickerButton-UIIcon{height:var(
--spectrum-alias-ui-icon-chevron-size-200
);margin-bottom:var(
--spectrum-alias-pickerbutton-icon-margin-y-m,var(--spectrum-global-dimension-size-125)
);margin-top:var(
--spectrum-alias-pickerbutton-icon-margin-y-m,var(--spectrum-global-dimension-size-125)
);width:var(--spectrum-alias-ui-icon-chevron-size-200)}:host([size=l]){--spectrum-PickerButton-label-padding-y:var(
--spectrum-alias-pickerbutton-label-padding-y-l,var(--spectrum-global-dimension-size-115)
);--spectrum-PickerButton-icon-margin-y:var(
--spectrum-alias-pickerbutton-icon-margin-y-l,var(--spectrum-global-dimension-size-160)
);--spectrum-PickerButton-icononly-padding-x:var(
--spectrum-alias-pickerbutton-icononly-padding-x-l,var(--spectrum-global-dimension-size-160)
)}:host([size=l]) .root{padding:var(
--spectrum-alias-infieldbutton-padding-l,0
)}:host([size=l]){--spectrum-PickerButton-Fill-size:var(
--spectrum-alias-infieldbutton-full-height-l,var(--spectrum-global-dimension-size-500)
)}:host([size=l]) .root .spectrum-PickerButton-fill{gap:var(--spectrum-global-dimension-size-65);height:var(
--spectrum-alias-infieldbutton-full-height-l,var(--spectrum-global-dimension-size-500)
);width:var(
--spectrum-alias-infieldbutton-full-height-l,var(--spectrum-global-dimension-size-500)
)}:host([size=l]) .root .spectrum-PickerButton-label{font-size:var(
--spectrum-global-dimension-font-size-200
);padding-bottom:var(
--spectrum-alias-pickerbutton-label-padding-y-l,var(--spectrum-global-dimension-size-115)
);padding-top:var(
--spectrum-alias-pickerbutton-label-padding-y-l,var(--spectrum-global-dimension-size-115)
)}:host([size=l]) .root .spectrum-PickerButton-icon{gap:var(
--spectrum-global-dimension-size-115
);margin-bottom:var(
--spectrum-alias-infieldbutton-icon-margin-y-l,var(--spectrum-global-dimension-size-125)
);margin-top:var(
--spectrum-alias-infieldbutton-icon-margin-y-l,var(--spectrum-global-dimension-size-125)
)}:host([size=l]) .root .spectrum-PickerButton-UIIcon{height:var(
--spectrum-alias-ui-icon-chevron-size-300
);margin-bottom:var(
--spectrum-alias-pickerbutton-icon-margin-y-l,var(--spectrum-global-dimension-size-160)
);margin-top:var(
--spectrum-alias-pickerbutton-icon-margin-y-l,var(--spectrum-global-dimension-size-160)
);width:var(--spectrum-alias-ui-icon-chevron-size-300)}:host([size=xl]){--spectrum-PickerButton-label-padding-y:var(
--spectrum-alias-pickerbutton-label-padding-y-xl,var(--spectrum-global-dimension-size-150)
);--spectrum-PickerButton-icon-margin-y:var(
--spectrum-alias-pickerbutton-icon-margin-y-xl,var(--spectrum-global-dimension-size-200)
);--spectrum-PickerButton-icononly-padding-x:var(
--spectrum-alias-pickerbutton-icononly-padding-x-xl,var(--spectrum-global-dimension-size-200)
)}:host([size=xl]) .root{padding:var(
--spectrum-alias-infieldbutton-padding-xl,0
)}:host([size=xl]){--spectrum-PickerButton-Fill-size:var(
--spectrum-alias-infieldbutton-full-height-xl,var(--spectrum-global-dimension-size-600)
)}:host([size=xl]) .root .spectrum-PickerButton-fill{gap:var(--spectrum-global-dimension-size-85);height:var(
--spectrum-alias-infieldbutton-full-height-xl,var(--spectrum-global-dimension-size-600)
);width:var(
--spectrum-alias-infieldbutton-full-height-xl,var(--spectrum-global-dimension-size-600)
)}:host([size=xl]) .root .spectrum-PickerButton-label{font-size:var(
--spectrum-global-dimension-font-size-300
);padding-bottom:var(
--spectrum-alias-pickerbutton-label-padding-y-xl,var(--spectrum-global-dimension-size-150)
);padding-top:var(
--spectrum-alias-pickerbutton-label-padding-y-xl,var(--spectrum-global-dimension-size-150)
)}:host([size=xl]) .root .spectrum-PickerButton-icon{gap:var(
--spectrum-global-dimension-size-125
);height:var(--spectrum-global-dimension-size-275);margin-bottom:var(
--spectrum-alias-infieldbutton-icon-margin-y-xl,var(--spectrum-global-dimension-size-160)
);margin-top:var(
--spectrum-alias-infieldbutton-icon-margin-y-xl,var(--spectrum-global-dimension-size-160)
);width:var(--spectrum-global-dimension-size-275)}:host([size=xl]) .root .spectrum-PickerButton-UIIcon{height:var(
--spectrum-alias-ui-icon-chevron-size-400
);margin-bottom:var(
--spectrum-alias-pickerbutton-icon-margin-y-xl,var(--spectrum-global-dimension-size-200)
);margin-top:var(
--spectrum-alias-pickerbutton-icon-margin-y-xl,var(--spectrum-global-dimension-size-200)
);width:var(--spectrum-alias-ui-icon-chevron-size-400)}:host([disabled]:not([open])) .root .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessHigh-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
)}:host([disabled]) .root .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-loudnessHigh-border-color-disabled,var(--spectrum-alias-component-background-color-disabled)
)}:host(:not([disabled]):not([open])) .root .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessHigh-background-color-default,var(--spectrum-alias-component-background-color-default)
)}:host(:not([disabled]):not([open])) .root:hover .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessHigh-background-color-hover,var(--spectrum-alias-component-background-color-hover)
)}:host(:not([disabled]):not([open])[active]) .root .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessHigh-background-color-down,var(--spectrum-alias-component-background-color-down)
)}:host([invalid]:not([disabled])) .root .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-default,var(--spectrum-semantic-negative-color-default)
)}:host([invalid]:not([disabled])) .root:hover .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-hover,var(--spectrum-semantic-negative-color-hover)
)}:host([invalid]:not([disabled])[active]) .root .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-down,var(--spectrum-semantic-negative-color-down)
)}:host([invalid]:not([disabled])) .root:focus .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-mouse-focus,var(--spectrum-semantic-negative-color-hover)
)}:host([invalid]:not([disabled])) .root.is-focused .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-mouse-focus,var(--spectrum-semantic-negative-color-hover)
)}:host([invalid]:not([disabled])) .root.focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([invalid]:not([disabled])) .root.focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([invalid]:not([disabled])) .root:focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([invalid]:not([disabled])) .root.is-keyboardFocused .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-input-border-color-invalid-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(:not([invalid]):not([disabled])) .root .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-default,var(--spectrum-alias-input-border-color-default)
)}:host(:not([invalid]):not([disabled])) .root:hover .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-hover,var(--spectrum-alias-input-border-color-hover)
)}:host(:not([invalid]):not([disabled])[active]) .root .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-down,var(--spectrum-alias-input-border-color-down)
)}:host(:not([invalid]):not([disabled])) .root:focus .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host(:not([invalid]):not([disabled])) .root.is-focused .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host(:not([invalid]):not([disabled])) .root.focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host(:not([invalid]):not([disabled])) .root.focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host(:not([invalid]):not([disabled])) .root:focus-visible .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host(:not([invalid]):not([disabled])) .root.is-keyboardFocused .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([dir=ltr][position=right]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=rtl][position=right]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=ltr][position=right]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=rtl][position=right]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=ltr][position=right][rounded]) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=rtl][position=right][rounded]) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=ltr][position=right][rounded]) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=rtl][position=right][rounded]) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=ltr][position=left]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=rtl][position=left]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=ltr][position=left]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=rtl][position=left]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-infieldbutton-border-radius-sided,0
)}:host([dir=ltr][position=left][rounded]) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=rtl][position=left][rounded]) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=ltr][position=left][rounded]) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=rtl][position=left][rounded]) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded-sided,0
)}:host([dir=ltr]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]:not([rounded])) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]:not([rounded])) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-infieldbutton-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][rounded]) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][rounded]) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][rounded]) .root .spectrum-PickerButton-fill{border-bottom-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][rounded]) .root .spectrum-PickerButton-fill{border-bottom-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][rounded]) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][rounded]) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][rounded]) .root .spectrum-PickerButton-fill{border-top-left-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][rounded]) .root .spectrum-PickerButton-fill{border-top-right-radius:var(
--spectrum-alias-pickerbutton-border-radius-rounded,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-PickerButton-icononly-padding-x
)}:host([dir=rtl]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-PickerButton-icononly-padding-x
)}:host([dir=ltr]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-PickerButton-icononly-padding-x
)}:host([dir=rtl]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-PickerButton-icononly-padding-x
)}.root.uiicononly .spectrum-PickerButton-fill{width:var(
--spectrum-PickerButton-Fill-size
)}:host([dir=ltr][size=s]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-s,var(--spectrum-global-dimension-size-85)
)}:host([dir=rtl][size=s]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-s,var(--spectrum-global-dimension-size-85)
)}:host([dir=ltr][size=s]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-s,var(--spectrum-global-dimension-size-85)
)}:host([dir=rtl][size=s]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-s,var(--spectrum-global-dimension-size-85)
)}:host([size=s]) .root.uiicononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-s,var(--spectrum-global-dimension-size-300)
)}:host([dir=ltr][size=m]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-m,var(--spectrum-global-dimension-size-125)
)}:host([dir=rtl][size=m]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-m,var(--spectrum-global-dimension-size-125)
)}:host([dir=ltr][size=m]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-m,var(--spectrum-global-dimension-size-125)
)}:host([dir=rtl][size=m]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-m,var(--spectrum-global-dimension-size-125)
)}:host([size=m]) .root.uiicononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-m,var(--spectrum-global-dimension-size-400)
)}:host([dir=ltr][size=l]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-l,var(--spectrum-global-dimension-size-160)
)}:host([dir=rtl][size=l]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-l,var(--spectrum-global-dimension-size-160)
)}:host([dir=ltr][size=l]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-l,var(--spectrum-global-dimension-size-160)
)}:host([dir=rtl][size=l]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-l,var(--spectrum-global-dimension-size-160)
)}:host([size=l]) .root.uiicononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-l,var(--spectrum-global-dimension-size-500)
)}:host([dir=ltr][size=xl]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-xl,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][size=xl]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-xl,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][size=xl]) .root.uiicononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-alias-pickerbutton-icononly-padding-x-xl,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][size=xl]) .root.uiicononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-alias-pickerbutton-icononly-padding-x-xl,var(--spectrum-global-dimension-size-200)
)}:host([size=xl]) .root.uiicononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-xl,var(--spectrum-global-dimension-size-600)
)}.root.uiicononly .spectrum-PickerButton-icon,.root.uiicononly .spectrum-PickerButton-label{display:none}.root.uiicononly .spectrum-PickerButton-UIIcon{display:initial}.root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{width:var(
--spectrum-PickerButton-Fill-size
)}:host([dir=ltr][size=s]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-50
)}:host([dir=rtl][size=s]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-50
)}:host([dir=ltr][size=s]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-50
)}:host([dir=rtl][size=s]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-50
)}:host([size=s]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-s,var(--spectrum-global-dimension-size-300)
)}:host([dir=ltr][size=m]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-85
)}:host([dir=rtl][size=m]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-85
)}:host([dir=ltr][size=m]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-85
)}:host([dir=rtl][size=m]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-85
)}:host([size=m]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-m,var(--spectrum-global-dimension-size-400)
)}:host([dir=ltr][size=l]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-125
)}:host([dir=rtl][size=l]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-125
)}:host([dir=ltr][size=l]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-125
)}:host([dir=rtl][size=l]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-125
)}:host([size=l]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-l,var(--spectrum-global-dimension-size-500)
)}:host([dir=ltr][size=xl]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-160
)}:host([dir=rtl][size=xl]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-160
)}:host([dir=ltr][size=xl]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-160
)}:host([dir=rtl][size=xl]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-160
)}:host([size=xl]) .root.spectrum-PickerButton--icononly .spectrum-PickerButton-fill{width:var(
--spectrum-alias-infieldbutton-full-height-xl,var(--spectrum-global-dimension-size-600)
)}.root.spectrum-PickerButton--icononly .spectrum-PickerButton-label{display:none}.root.spectrum-PickerButton--icononly .spectrum-PickerButton-icon{display:initial}.root.spectrum-PickerButton--icononly .spectrum-PickerButton-UIIcon{display:none}:host([size]) .root.textuiicon .spectrum-PickerButton-fill{width:auto}:host([dir=ltr][size=s]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-100
)}:host([dir=rtl][size=s]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-100
)}:host([dir=ltr][size=s]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-115
)}:host([dir=rtl][size=s]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-115
)}:host([dir=ltr][size=m]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-125
)}:host([dir=rtl][size=m]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-125
)}:host([dir=ltr][size=m]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-160
)}:host([dir=rtl][size=m]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-160
)}:host([dir=ltr][size=l]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-150
)}:host([dir=rtl][size=l]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-150
)}:host([dir=ltr][size=l]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-185
)}:host([dir=rtl][size=l]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-185
)}:host([dir=ltr][size=xl]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-200
)}:host([dir=rtl][size=xl]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-200
)}:host([dir=ltr][size=xl]) .root.textuiicon .spectrum-PickerButton-fill{padding-left:var(
--spectrum-global-dimension-size-225
)}:host([dir=rtl][size=xl]) .root.textuiicon .spectrum-PickerButton-fill{padding-right:var(
--spectrum-global-dimension-size-225
)}.root.textuiicon .spectrum-PickerButton-label{display:initial}.root.textuiicon .spectrum-PickerButton-icon{display:none}.root.textuiicon .spectrum-PickerButton-UIIcon{display:initial}:host([disabled]:not([open])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-disabled,transparent
)}:host([disabled]) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:var(
--spectrum-alias-infieldbutton-fill-loudnessLow-border-color-disabled,transparent
)}:host(:not([disabled]):not([open])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default,transparent
)}:host(:not([disabled]):not([open])) .root.spectrum-PickerButton--quiet:hover .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover,transparent
)}:host(:not([disabled]):not([open])[active]) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down,transparent
)}:host([invalid]:not([disabled])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:hover .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])[active]) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:focus .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.is-focused .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.focus-visible .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.focus-visible .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:focus-visible .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.is-keyboardFocused .spectrum-PickerButton-fill{border-color:transparent}:host([open]) .root .spectrum-PickerButton-fill{background-color:var(
--spectrum-alias-component-background-color-down,var(--spectrum-global-color-gray-200)
)}:host([open]) .root .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([open]) .root .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host([open]) .root .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(:not([open])) .root .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color,var(--spectrum-alias-component-text-color-default)
)}:host(:not([open])) .root .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:not([open])) .root .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([disabled]:not([open])) .root .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]:not([open])) .root .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host([disabled]:not([open])) .root .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host(:not([disabled]):not([open])) .root .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-default,var(--spectrum-global-color-gray-800)
)}:host(:not([disabled]):not([open])) .root:hover .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host(:not([disabled]):not([open])) .root:hover .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host(:not([disabled]):not([open])) .root:hover .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host(:not([disabled]):not([open])[active]) .root .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-down,var(--spectrum-global-color-gray-900)
)}:host(:not([disabled]):not([open])[active]) .root .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(:not([disabled]):not([open])[active]) .root .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(:not([disabled]):not([open])) .root .spectrum-PickerButton-icon{color:var(
--spectrum-alias-component-icon-color-default,var(--spectrum-alias-icon-color)
)}:host(:not([disabled]):not([open])) .root .spectrum-PickerButton-UIIcon{color:var(
--spectrum-alias-component-icon-color-default,var(--spectrum-alias-icon-color)
)}:host(:not([disabled]):not([open])) .root.spectrum-PickerButton--error .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-error-default,var(--spectrum-semantic-negative-text-color-small)
)}:host(:not([disabled]):not([open])) .root.spectrum-PickerButton--error:hover .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-error-hover,var(--spectrum-semantic-negative-text-color-small-hover)
)}:host(:not([disabled]):not([open])[active]) .root.spectrum-PickerButton--error .spectrum-PickerButton-label{color:var(
--spectrum-alias-component-text-color-error-down,var(--spectrum-semantic-negative-text-color-small-down)
)}.spectrum-PickerButton-fill{border-style:solid;border-width:var(
--spectrum-alias-infieldbutton-border-size,var(--spectrum-global-dimension-static-size-10)
);flex-direction:row}.spectrum-PickerButton-label{font-family:var(--spectrum-global-font-body-text-font-family);font-style:var(--spectrum-global-font-style-regular,normal);font-weight:var(--spectrum-global-font-body-text-font-weight);letter-spacing:var(--spectrum-global-font-letter-spacing-none,0);line-height:var(--spectrum-global-font-component-text-line-height);padding-bottom:var(--spectrum-PickerButton-label-padding-y);padding-top:var(--spectrum-PickerButton-label-padding-y);text-transform:none}.spectrum-PickerButton-UIIcon{margin-bottom:var(
--spectrum-PickerButton-icon-margin-y
);margin-top:var(--spectrum-PickerButton-icon-margin-y);transform:rotate(90deg)}:host{--spectrum-infieldbutton-border-color-override:initial}.root{align-items:center;background-color:transparent;border-style:none;display:flex;justify-content:center}.spectrum-PickerButton-label{flex:1 1 auto;overflow:hidden;white-space:nowrap}.spectrum-PickerButton-fill{align-items:center;border-color:var(--spectrum-infieldbutton-border-color-override);box-sizing:border-box;display:flex;justify-content:center;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.uiicononly .spectrum-PickerButton-fill{padding:0!important}.spectrum-PickerButton-UIIcon{margin:0!important}.spectrum-PickerButton-icon{flex-shrink:0;margin:0!important}:host{display:inline-flex}.root{display:contents}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`,$o=Object.defineProperty,qo=Object.getOwnPropertyDescriptor,Eo=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?qo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&$o(e,r,s),s};class Lo extends(f(h(R,'[slot="label"]'))){constructor(){super(...arguments),this.invalid=!1,this.position="right"}static get styles(){return[To]}get hasText(){return this.slotContentIsPresent}render(){const t={root:!0,uiicononly:!this.hasText,textuiicon:this.hasText};return s`
            <div class=${F(t)}>
                <div class="spectrum-PickerButton-fill">
                    <span
                        class="spectrum-PickerButton-label is-placeholder"
                        ?hidden=${!this.hasText}
                    >
                        <slot name="label"></slot>
                    </span>
                    <slot name="icon">
                        <sp-icon-chevron200
                            class="spectrum-PickerButton-UIIcon spectrum-Icon spectrum-UIIcon-ChevronDown200"
                        ></sp-icon-chevron200>
                    </slot>
                </div>
            </div>
        `}}Eo([a({type:Boolean,reflect:!0})],Lo.prototype,"invalid",2),Eo([a({reflect:!0})],Lo.prototype,"position",2),customElements.define("sp-picker-button",Lo);var Oo=r`
:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(
--spectrum-animation-ease-in-out
);--spectrum-progressbar-animation-duration-indeterminate:var(
--spectrum-animation-duration-2000
);--spectrum-progressbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-progressbar-fill-size-indeterminate:70%;--spectrum-progressbar-size-2400:192px;--spectrum-progressbar-size-2500:200px;--spectrum-progressbar-size-2800:224px;--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-progressbar-min-size:var(--spectrum-progress-bar-minimum-width);--spectrum-progressbar-max-size:var(--spectrum-progress-bar-maximum-width);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-medium
);--spectrum-progressbar-line-height:var(--spectrum-line-height-100);--spectrum-progressbar-spacing-label-to-progressbar:var(
--spectrum-spacing-75
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-progressbar-spacing-label-to-text:var(--spectrum-spacing-200);--spectrum-progressbar-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-progressbar-track-color:var(--spectrum-gray-300);--spectrum-progressbar-fill-color:var(--spectrum-accent-color-900);--spectrum-progressbar-fill-color-positive:var(
--spectrum-positive-visual-color
);--spectrum-progressbar-fill-color-notice:var(
--spectrum-notice-visual-color
);--spectrum-progressbar-fill-color-negative:var(
--spectrum-negative-visual-color
);--spectrum-progressbar-label-and-value-white:var(--spectrum-white);--spectrum-progressbar-track-color-white:var(
--spectrum-transparent-white-300
);--spectrum-progressbar-fill-color-white:var(--spectrum-white)}:host([size=s]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2400
);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-small
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=m]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2400
);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=l]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2500
);--spectrum-progressbar-font-size:var(--spectrum-font-size-100);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
)}:host([size=xl]){--spectrum-progressbar-size-default:var(
--spectrum-progressbar-size-2800
);--spectrum-progressbar-font-size:var(--spectrum-font-size-200);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-extra-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
)}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}:host{align-items:center;display:inline-flex;flex-flow:row wrap;font-size:var(
--mod-progressbar-font-size,var(--spectrum-progressbar-font-size)
);inline-size:var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
);justify-content:space-between;max-inline-size:var(
--mod-progressbar-max-size,var(--spectrum-progressbar-max-size)
);min-inline-size:var(
--mod-progressbar-min-size,var(--spectrum-progressbar-min-size)
);position:relative;vertical-align:top}.label,.percentage{color:var(
--mod-progressbar-text-color,var(--spectrum-progressbar-text-color)
);line-height:var(
--mod-progressbar-line-height,var(--spectrum-progressbar-line-height)
);margin-block-end:var(
--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar)
);margin-block-start:var(
--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text)
);text-align:start}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(
--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk)
)}.label{flex:1 1 0%}.percentage{align-self:flex-start;margin-inline-start:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}.track{background:var(
--highcontrast-progressbar-track-color,var(
--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)
)
);block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
);border-radius:var(--spectrum-progressbar-corner-radius);inline-size:100%;overflow:hidden}:host([positive]) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host(.is-notice) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host(.is-negative) .fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-negative,var(--spectrum-progressbar-fill-color-negative)
)
)}.fill{background:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)
)
);block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
);border:none;transition:width 1s}:host([indeterminate]) .fill{animation-timing-function:var(
--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate)
);inline-size:var(
--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate)
);position:relative;will-change:transform}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between}:host([side-label]) .track{flex:1 1 var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
)}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}:host([side-label]) .percentage{margin-block-end:0;margin-inline-start:var(
--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
);order:3;text-align:end}:host([static=white]) .fill{background:var(
--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white)
);color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .label,:host([static=white]) .percentage{color:var(
--mode-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .track{background-color:var(
--spectrum-progressbar-track-color-white
)}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(
--mod-progressbar-fill-size-indeterminate,
var(--spectrum-progressbar-fill-size-indeterminate)
)*-1))}to{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)
))}to{transform:translate(calc(var(
--mod-progressbar-size-default,
var(--spectrum-progressbar-size-default)
)*-1))}}.fill{transform-origin:left;width:100%}:host([dir=rtl]) .fill{transform-origin:right}
`,Ao=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,Do=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Mo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Ao(e,r,s),s};class Ho extends(f(i)){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[Oo]}render(){return s`
            ${this.label?s`
                      <sp-field-label size=${this.size} class="label">
                          ${this.label}
                      </sp-field-label>
                      ${this.indeterminate?s``:s`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${this.progress}%
                                </sp-field-label>
                            `}
                  `:s``}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}Do([a({type:Boolean,reflect:!0})],Ho.prototype,"indeterminate",2),Do([a({type:String})],Ho.prototype,"label",2),Do([a({type:Boolean,reflect:!0,attribute:"over-background"})],Ho.prototype,"overBackground",2),Do([a({type:Boolean,reflect:!0,attribute:"side-label"})],Ho.prototype,"sideLabel",2),Do([a({type:Number})],Ho.prototype,"progress",2),Do([a({type:String,reflect:!0})],Ho.prototype,"static",2),customElements.define("sp-progress-bar",Ho);var Io=r`
.fill-submask-2{animation:spectrum-fill-mask-2 1s linear infinite}@keyframes spectrum-fill-mask-1{0%{transform:rotate(90deg)}1.69%{transform:rotate(72.3deg)}3.39%{transform:rotate(55.5deg)}5.08%{transform:rotate(40.3deg)}6.78%{transform:rotate(25deg)}8.47%{transform:rotate(10.6deg)}10.17%{transform:rotate(0deg)}11.86%{transform:rotate(0deg)}13.56%{transform:rotate(0deg)}15.25%{transform:rotate(0deg)}16.95%{transform:rotate(0deg)}18.64%{transform:rotate(0deg)}20.34%{transform:rotate(0deg)}22.03%{transform:rotate(0deg)}23.73%{transform:rotate(0deg)}25.42%{transform:rotate(0deg)}27.12%{transform:rotate(0deg)}28.81%{transform:rotate(0deg)}30.51%{transform:rotate(0deg)}32.2%{transform:rotate(0deg)}33.9%{transform:rotate(0deg)}35.59%{transform:rotate(0deg)}37.29%{transform:rotate(0deg)}38.98%{transform:rotate(0deg)}40.68%{transform:rotate(0deg)}42.37%{transform:rotate(5.3deg)}44.07%{transform:rotate(13.4deg)}45.76%{transform:rotate(20.6deg)}47.46%{transform:rotate(29deg)}49.15%{transform:rotate(36.5deg)}50.85%{transform:rotate(42.6deg)}52.54%{transform:rotate(48.8deg)}54.24%{transform:rotate(54.2deg)}55.93%{transform:rotate(59.4deg)}57.63%{transform:rotate(63.2deg)}59.32%{transform:rotate(67.2deg)}61.02%{transform:rotate(70.8deg)}62.71%{transform:rotate(73.8deg)}64.41%{transform:rotate(76.2deg)}66.1%{transform:rotate(78.7deg)}67.8%{transform:rotate(80.6deg)}69.49%{transform:rotate(82.6deg)}71.19%{transform:rotate(83.7deg)}72.88%{transform:rotate(85deg)}74.58%{transform:rotate(86.3deg)}76.27%{transform:rotate(87deg)}77.97%{transform:rotate(87.7deg)}79.66%{transform:rotate(88.3deg)}81.36%{transform:rotate(88.6deg)}83.05%{transform:rotate(89.2deg)}84.75%{transform:rotate(89.2deg)}86.44%{transform:rotate(89.5deg)}88.14%{transform:rotate(89.9deg)}89.83%{transform:rotate(89.7deg)}91.53%{transform:rotate(90.1deg)}93.22%{transform:rotate(90.2deg)}94.92%{transform:rotate(90.1deg)}96.61%{transform:rotate(90deg)}98.31%{transform:rotate(89.8deg)}to{transform:rotate(90deg)}}@keyframes spectrum-fill-mask-2{0%{transform:rotate(180deg)}1.69%{transform:rotate(180deg)}3.39%{transform:rotate(180deg)}5.08%{transform:rotate(180deg)}6.78%{transform:rotate(180deg)}8.47%{transform:rotate(180deg)}10.17%{transform:rotate(179.2deg)}11.86%{transform:rotate(164deg)}13.56%{transform:rotate(151.8deg)}15.25%{transform:rotate(140.8deg)}16.95%{transform:rotate(130.3deg)}18.64%{transform:rotate(120.4deg)}20.34%{transform:rotate(110.8deg)}22.03%{transform:rotate(101.6deg)}23.73%{transform:rotate(93.5deg)}25.42%{transform:rotate(85.4deg)}27.12%{transform:rotate(78.1deg)}28.81%{transform:rotate(71.2deg)}30.51%{transform:rotate(89.1deg)}32.2%{transform:rotate(105.5deg)}33.9%{transform:rotate(121.3deg)}35.59%{transform:rotate(135.5deg)}37.29%{transform:rotate(148.4deg)}38.98%{transform:rotate(161deg)}40.68%{transform:rotate(173.5deg)}42.37%{transform:rotate(180deg)}44.07%{transform:rotate(180deg)}45.76%{transform:rotate(180deg)}47.46%{transform:rotate(180deg)}49.15%{transform:rotate(180deg)}50.85%{transform:rotate(180deg)}52.54%{transform:rotate(180deg)}54.24%{transform:rotate(180deg)}55.93%{transform:rotate(180deg)}57.63%{transform:rotate(180deg)}59.32%{transform:rotate(180deg)}61.02%{transform:rotate(180deg)}62.71%{transform:rotate(180deg)}64.41%{transform:rotate(180deg)}66.1%{transform:rotate(180deg)}67.8%{transform:rotate(180deg)}69.49%{transform:rotate(180deg)}71.19%{transform:rotate(180deg)}72.88%{transform:rotate(180deg)}74.58%{transform:rotate(180deg)}76.27%{transform:rotate(180deg)}77.97%{transform:rotate(180deg)}79.66%{transform:rotate(180deg)}81.36%{transform:rotate(180deg)}83.05%{transform:rotate(180deg)}84.75%{transform:rotate(180deg)}86.44%{transform:rotate(180deg)}88.14%{transform:rotate(180deg)}89.83%{transform:rotate(180deg)}91.53%{transform:rotate(180deg)}93.22%{transform:rotate(180deg)}94.92%{transform:rotate(180deg)}96.61%{transform:rotate(180deg)}98.31%{transform:rotate(180deg)}to{transform:rotate(180deg)}}@keyframes spectrum-fills-rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}:host{--spectrum-progress-circle-track-border-color:var(
--spectrum-gray-300
);--spectrum-progress-circle-fill-border-color:var(
--spectrum-accent-content-color-default
);--spectrum-progress-circle-track-border-color-over-background:var(
--spectrum-transparent-white-300
);--spectrum-progress-circle-fill-border-color-over-background:var(
--spectrum-transparent-white-900
);--spectrum-progress-circle-size:var(
--spectrum-progress-circle-size-medium
);--spectrum-progress-circle-thickness:var(
--spectrum-progress-circle-thickness-medium
);--spectrum-progress-circle-track-border-style:solid}:host([size=s]){--spectrum-progress-circle-size:var(
--spectrum-progress-circle-size-small
);--spectrum-progress-circle-thickness:var(
--spectrum-progress-circle-thickness-small
)}.spectrum-ProgressCircle--medium{--spectrum-progress-circle-size:var(
--spectrum-progress-circle-size-medium
);--spectrum-progress-circle-thickness:var(
--spectrum-progress-circle-thickness-medium
)}:host([size=l]){--spectrum-progress-circle-size:var(
--spectrum-progress-circle-size-large
);--spectrum-progress-circle-thickness:var(
--spectrum-progress-circle-thickness-large
)}@media (forced-colors:active){:host{--highcontrast-progress-circle-fill-border-color:Highlight;--highcontrast-progress-circle-fill-border-color-over-background:Highlight}.track{--spectrum-progress-circle-track-border-style:double}}:host{block-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);direction:ltr;display:inline-block;inline-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);position:relative;transform:translateZ(0)}.track{block-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);border-color:var(
--mod-progress-circle-track-border-color,var(--spectrum-progress-circle-track-border-color)
);border-radius:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);border-style:var(
--highcontrast-progress-circle-track-border-style,var(
--mod-progress-circle-track-border-style,var(--spectrum-progress-circle-track-border-style)
)
);border-width:var(
--mod-progress-circle-thickness,var(--spectrum-progress-circle-thickness)
);box-sizing:border-box;inline-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
)}.fills{block-size:100%;inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}.fill{block-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);border-color:var(
--highcontrast-progress-circle-fill-border-color,var(
--mod-progress-circle-fill-border-color,var(--spectrum-progress-circle-fill-border-color)
)
);border-radius:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
);border-style:solid;border-width:var(
--mod-progress-circle-thickness,var(--spectrum-progress-circle-thickness)
);box-sizing:border-box;inline-size:var(
--mod-progress-circle-size,var(--spectrum-progress-circle-size)
)}:host([static=white]) .track{border-color:var(
--mod-progress-circle-track-border-color-over-background,var(--spectrum-progress-circle-track-border-color-over-background)
)}:host([static=white]) .fill{border-color:var(
--highcontrast-progress-circle-fill-border-color-over-background,var(
--mod-progress-circle-fill-border-color-over-background,var(--spectrum-progress-circle-fill-border-color-over-background)
)
)}.fillMask1,.fillMask2{block-size:100%;inline-size:50%;overflow:hidden;position:absolute;transform:rotate(180deg);transform-origin:100% center}.fillSubMask1,.fillSubMask2{block-size:100%;inline-size:100%;overflow:hidden;transform:rotate(-180deg);transform-origin:100% center}.fillMask2{transform:rotate(0deg)}:host([indeterminate]) .fills{animation:spectrum-fills-rotate 1s cubic-bezier(.25,.78,.48,.89) infinite;transform:translateZ(0);transform-origin:center;will-change:transform}:host([indeterminate]) .fillSubMask1{animation:spectrum-fill-mask-1 1s linear infinite;transform:translateZ(0);will-change:transform}:host([indeterminate]) .fillSubMask2{animation:spectrum-fill-mask-2 1s linear infinite;transform:translateZ(0);will-change:transform}:host{--spectrum-progresscircle-m-over-background-track-fill-color:var(
--spectrum-alias-track-fill-color-overbackground
)}
`,jo=Object.defineProperty,Fo=Object.getOwnPropertyDescriptor,_o=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Fo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&jo(e,r,s),s};class Uo extends(f(i,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.progress=0}static get styles(){return[Io]}makeRotation(t){return this.indeterminate?void 0:`transform: rotate(${t}deg);`}willUpdate(t){t.has("overBackground")&&(this.static=this.overBackground?"white":this.static||void 0)}render(){const t=[this.makeRotation(3.6*Math.min(this.progress,50)-180),this.makeRotation(3.6*Math.max(this.progress-50,0)-180)];return s`
            <div class="track"></div>
            <div class="fills">
                ${["Mask1","Mask2"].map(((e,r)=>s`
                        <div class="fill${e}">
                            <div
                                class="fillSub${e}"
                                style=${y(t[r])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `))}
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}_o([a({type:Boolean,reflect:!0})],Uo.prototype,"indeterminate",2),_o([a({type:String})],Uo.prototype,"label",2),_o([a({type:Boolean,reflect:!0,attribute:"over-background"})],Uo.prototype,"overBackground",2),_o([a({reflect:!0})],Uo.prototype,"static",2),_o([a({type:Number})],Uo.prototype,"progress",2),customElements.define("sp-progress-circle",Uo);var Ro=r`
:host{--spectrum-radio-neutral-content-color:var(
--spectrum-neutral-content-color-default
);--spectrum-radio-neutral-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-radio-neutral-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-radio-neutral-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-radio-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-radio-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-radio-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-radio-disabled-content-color:var(
--spectrum-disabled-content-color
);--spectrum-radio-disabled-border-color:var(--spectrum-gray-400);--spectrum-radio-emphasized-accent-color:var(--spectrum-accent-color-900);--spectrum-radio-emphasized-accent-color-hover:var(
--spectrum-accent-color-1000
);--spectrum-radio-emphasized-accent-color-down:var(
--spectrum-accent-color-1100
);--spectrum-radio-emphasized-accent-color-focus:var(
--spectrum-accent-color-1000
);--spectrum-radio-border-width:var(--spectrum-border-width-200);--spectrum-radio-button-background-color:var(--spectrum-gray-75);--spectrum-radio-line-height:var(--spectrum-line-height-100);--spectrum-radio-animation-duration:var(--spectrum-animation-duration-100);--spectrum-radio-height:var(--spectrum-component-height-100);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-medium
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-100);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-medium
);--spectrum-radio-font-size:var(--spectrum-font-size-100)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--spectrum-radio-cjk-line-height:var(
--spectrum-cjk-line-height-100
)}:host([size=s]){--spectrum-radio-height:var(
--spectrum-component-height-75
);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-small
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-75);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-small
);--spectrum-radio-font-size:var(--spectrum-font-size-75)}:host([size=m]){--spectrum-radio-height:var(
--spectrum-component-height-100
);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-medium
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-100);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-medium
);--spectrum-radio-font-size:var(--spectrum-font-size-100)}:host([size=l]){--spectrum-radio-height:var(
--spectrum-component-height-200
);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-large
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-200);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-large
);--spectrum-radio-font-size:var(--spectrum-font-size-200)}:host([size=xl]){--spectrum-radio-height:var(
--spectrum-component-height-300
);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-extra-large
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-300);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-extra-large
);--spectrum-radio-font-size:var(--spectrum-font-size-300)}@media (forced-colors:active){:host{--highcontrast-radio-neutral-content-color:CanvasText;--highcontrast-radio-neutral-content-color-hover:CanvasText;--highcontrast-radio-neutral-content-color-down:CanvasText;--highcontrast-radio-neutral-content-color-focus:CanvasText;--highcontrast-radio-button-border-color-default:ButtonText;--highcontrast-radio-button-border-color-hover:Highlight;--highcontrast-radio-button-border-color-down:ButtonText;--highcontrast-radio-button-border-color-focus:Highlight;--highcontrast-radio-emphasized-accent-color:ButtonText;--highcontrast-radio-emphasized-accent-color-hover:Highlight;--highcontrast-radio-emphasized-accent-color-down:ButtonText;--highcontrast-radio-emphasized-accent-color-focus:Highlight;--highcontrast-radio-button-checked-border-color-default:Highlight;--highcontrast-radio-button-checked-border-color-hover:Highlight;--highcontrast-radio-button-checked-border-color-down:Highlight;--highcontrast-radio-button-checked-border-color-focus:Highlight;--highcontrast-radio-disabled-content-color:GrayText;--highcontrast-radio-disabled-border-color:GrayText;--highcontrast-radio-focus-indicator-color:CanvasText}#button:after{forced-color-adjust:none}}:host{align-items:flex-start;display:inline-flex;max-inline-size:100%;min-block-size:var(--mod-radio-height,var(--spectrum-radio-height));position:relative;vertical-align:top}:host(:hover) #button:before{border-color:var(
--highcontrast-radio-button-border-color-hover,var(
--mod-radio-button-border-color-hover,var(--spectrum-radio-button-border-color-hover)
)
)}:host(:hover[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-hover,var(
--mod-radio-button-checked-border-color-hover,var(--spectrum-radio-button-checked-border-color-hover)
)
)}:host(:hover) #label{color:var(
--highcontrast-radio-neutral-content-color-hover,var(
--mod-radio-neutral-content-color-hover,var(--spectrum-radio-neutral-content-color-hover)
)
)}:host(:active) #button:before{border-color:var(
--highcontrast-radio-button-border-color-down,var(
--mod-radio-button-border-color-down,var(--spectrum-radio-button-border-color-down)
)
)}:host(:active[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-down,var(
--mod-radio-button-checked-border-color-down,var(--spectrum-radio-button-checked-border-color-down)
)
)}:host(:active) #label{color:var(
--highcontrast-radio-neutral-content-color-down,var(
--mod-radio-neutral-content-color-down,var(--spectrum-radio-neutral-content-color-down)
)
)}:host(:focus) #button:before{border-color:var(
--highcontrast-radio-button-border-color-focus,var(
--mod-radio-button-border-color-focus,var(--spectrum-radio-button-border-color-focus)
)
)}:host(:focus) #button:after{border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);height:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);width:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}:host(:focus[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-focus,var(
--mod-radio-button-checked-border-color-focus,var(--spectrum-radio-button-checked-border-color-focus)
)
)}:host(:focus) #label{color:var(
--highcontrast-radio-neutral-content-color-focus,var(
--mod-radio-neutral-content-color-focus,var(--spectrum-radio-neutral-content-color-focus)
)
)}:host([invalid]) #label{color:var(
--highcontrast-radio-neutral-content-color,var(
--mod-radio-neutral-content-color,var(--spectrum-radio-neutral-content-color)
)
)}:host(.is-readOnly) #input:read-only{cursor:auto}:host(.is-readOnly) #button{clip:rect(1px,1px,1px,1px);bottom:100%;clip-path:inset(50%);position:fixed;right:100%}:host(.is-readOnly),:host(.is-readOnly) #label,:host(.is-readOnly[checked][disabled]) #input~#label,:host(.is-readOnly[disabled]) #input~#label{color:inherit;margin-inline-start:auto}:host([emphasized][checked]) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color,var(
--mod-radio-emphasized-accent-color,var(--spectrum-radio-emphasized-accent-color)
)
)}:host([emphasized][checked]:hover) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-hover,var(
--mod-radio-emphasized-accent-color-hover,var(--spectrum-radio-emphasized-accent-color-hover)
)
)}:host([emphasized][checked]:active) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-down,var(
--mod-radio-emphasized-accent-color-down,var(--spectrum-radio-emphasized-accent-color-down)
)
)}:host([emphasized][checked]:focus) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-focus,var(
--mod-radio-emphasized-accent-color-focus,var(--spectrum-radio-emphasized-accent-color-focus)
)
)}:host([checked][disabled]) #input+#button:before,:host([disabled]) #input+#button:before{border-color:var(
--highcontrast-radio-disabled-border-color,var(
--mod-radio-disabled-border-color,var(--spectrum-radio-disabled-border-color)
)
)}:host([checked][disabled]) #input~#label,:host([disabled]) #input~#label{color:var(
--highcontrast-radio-disabled-content-color,var(
--mod-radio-disabled-content-color,var(--spectrum-radio-disabled-content-color)
)
)}#input{block-size:100%;box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:100%;inline-size:100%;line-height:var(
--mod-radio-line-height,var(--spectrum-radio-line-height)
);margin:0;opacity:0;overflow:visible;padding:0;position:absolute;z-index:1}:host([disabled]) #input{cursor:default}:host([checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-default,var(
--mod-radio-button-checked-border-color-default,var(--spectrum-radio-button-checked-border-color-default)
)
);border-width:calc(var(--spectrum-radio-button-control-size)/2 - var(--spectrum-radio-button-selection-indicator)/2)}#input.focus-visible+#button:after,:host(.focus-visible) #input+#button:after{border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);height:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);width:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}#input.focus-visible+#button:after,:host(.focus-visible) #input+#button:after{border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);height:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);width:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}#input:focus-visible+#button:after,:host(:focus-visible) #input+#button:after{border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);height:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);width:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}#label{color:var(
--highcontrast-radio-neutral-content-color,var(
--mod-radio-neutral-content-color,var(--spectrum-radio-neutral-content-color)
)
);font-size:var(--mod-radio-font-size,var(--spectrum-radio-font-size));line-height:var(
--mod-radio-line-height,var(--spectrum-radio-line-height)
);margin-block-end:var(--spectrum-radio-label-bottom-to-text);margin-block-start:var(--spectrum-radio-label-top-to-text);margin-inline-start:var(
--mod-radio-text-to-control,var(--spectrum-radio-text-to-control)
);text-align:start;transition:color var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out}#label:lang(ja),#label:lang(ko),#label:lang(zh){line-height:var(
--spectrum-radio-cjk-line-height
)}#button{block-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);box-sizing:border-box;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);margin-block-start:var(
--mod-radio-button-top-to-control,var(--spectrum-radio-button-top-to-control)
);position:relative}#button:before{background-color:var(
--highcontrast-radio-button-background-color,var(
--mod-radio-button-background-color,var(--spectrum-radio-button-background-color)
)
);border-color:var(
--highcontrast-radio-button-border-color-default,var(
--mod-radio-button-border-color-default,var(--spectrum-radio-button-border-color-default)
)
);border-radius:50%;border-style:solid;border-width:var(
--mod-radio-border-width,var(--spectrum-radio-border-width)
);box-sizing:border-box;content:"";display:block;height:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);position:absolute;transition:border var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out,box-shadow var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out;width:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);z-index:0}#button:after{border-radius:50%;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);transition:opacity var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-out,margin var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-out}:host{--spectrum-radio-button-border-color-default:var(
--system-spectrum-radio-button-border-color-default
);--spectrum-radio-button-border-color-hover:var(
--system-spectrum-radio-button-border-color-hover
);--spectrum-radio-button-border-color-down:var(
--system-spectrum-radio-button-border-color-down
);--spectrum-radio-button-border-color-focus:var(
--system-spectrum-radio-button-border-color-focus
);--spectrum-radio-button-checked-border-color-default:var(
--system-spectrum-radio-button-checked-border-color-default
);--spectrum-radio-button-checked-border-color-hover:var(
--system-spectrum-radio-button-checked-border-color-hover
);--spectrum-radio-button-checked-border-color-down:var(
--system-spectrum-radio-button-checked-border-color-down
);--spectrum-radio-button-checked-border-color-focus:var(
--system-spectrum-radio-button-checked-border-color-focus
)}:host([emphasized]){--spectrum-radio-button-checked-border-color-default:var(
--system-spectrum-radio-emphasized-button-checked-border-color-default
);--spectrum-radio-button-checked-border-color-hover:var(
--system-spectrum-radio-emphasized-button-checked-border-color-hover
);--spectrum-radio-button-checked-border-color-down:var(
--system-spectrum-radio-emphasized-button-checked-border-color-down
);--spectrum-radio-button-checked-border-color-focus:var(
--system-spectrum-radio-emphasized-button-checked-border-color-focus
)}:host{--spectrum-radio-label-margin-top:var(
--spectrum-global-dimension-size-75,6px
)}:host(:focus){outline:none}:host([disabled]){pointer-events:none}
`,No=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,Go=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Vo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&No(e,r,s),s};class Ko extends(f(x(i))){constructor(){super(...arguments),this.autofocus=!1,this.value="",this.checked=!1,this.disabled=!1,this.emphasized=!1,this.invalid=!1,this.readonly=!1}static get styles(){return[Ro]}click(){this.disabled||this.activate()}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focus())}activate(){this.checked||(this.checked=!0,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleKeyup(t){"Space"===t.code&&this.activate()}render(){return s`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","radio"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAutoFocus(),this.addEventListener("click",this.activate),this.addEventListener("keyup",this.handleKeyup)}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")),t.has("checked")&&(this.checked?this.setAttribute("aria-checked","true"):this.setAttribute("aria-checked","false")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabeld"))}}Go([a({type:Boolean})],Ko.prototype,"autofocus",2),Go([a({type:String,reflect:!0})],Ko.prototype,"value",2),Go([a({type:Boolean,reflect:!0})],Ko.prototype,"checked",2),Go([a({type:Boolean,reflect:!0})],Ko.prototype,"disabled",2),Go([a({type:Boolean,reflect:!0})],Ko.prototype,"emphasized",2),Go([a({type:Boolean,reflect:!0})],Ko.prototype,"invalid",2),Go([a({type:Boolean,reflect:!0})],Ko.prototype,"readonly",2),customElements.define("sp-radio",Ko);var Xo=Object.defineProperty,Yo=Object.getOwnPropertyDescriptor,Wo=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Yo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Xo(e,r,s),s};class Zo extends(x(_r)){constructor(){super(...arguments),this.name="",this.rovingTabindexController=new e(this,{focusInIndex:t=>t.findIndex((t=>this.selected?!t.disabled&&t.value===this.selected:!t.disabled)),elementEnterAction:t=>{this.selected=t.value},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.selected=""}get buttons(){return this.defaultNodes.filter((t=>t instanceof Ko))}focus(){this.rovingTabindexController.focus()}_setSelected(t){if(t===this.selected)return;const e=this.selected,r=t?this.querySelector(`sp-radio[value="${t}"]`):void 0;this.selected=r?t:"",this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))?this.validateRadios():this.selected=e}willUpdate(t){if(!this.hasUpdated){this.setAttribute("role","radiogroup");const t=this.querySelector("sp-radio[checked]"),e=t?t.value:"";if(this.selected=e||this.selected,this.selected&&this.selected!==e){const t=this.querySelector(`sp-radio[value="${this.selected}"]`);t?t.checked=!0:this.selected=""}this.shadowRoot.addEventListener("change",(t=>{t.stopPropagation();const e=t.target;this._setSelected(e.value)}))}t.has("selected")&&this.validateRadios()}async validateRadios(){let t=!1;this.hasUpdated||await this.updateComplete,this.buttons.map((e=>{e.checked=this.selected===e.value,t=t||e.checked})),t||(this.selected="")}handleSlotchange(){this.rovingTabindexController.clearElementCache()}}Wo([a({type:String})],Zo.prototype,"name",2),Wo([u("")],Zo.prototype,"defaultNodes",2),Wo([a({reflect:!0})],Zo.prototype,"selected",2),customElements.define("sp-radio-group",Zo),customElements.define("sp-sidenav-heading",N);var Qo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,ti=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Jo(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Qo(e,r,s),s};const ei={toNormalized:(t,e,r)=>(t-e)/(r-e),fromNormalized:(t,e,r)=>t*(r-e)+e},ri={fromAttribute:t=>"previous"===t?t:parseFloat(t),toAttribute:t=>t.toString()},oi={fromAttribute:t=>"next"===t?t:parseFloat(t),toAttribute:t=>t.toString()};class ii extends v{constructor(){super(...arguments),this._forcedUnit="",this.dragging=!1,this.highlight=!1,this.name="",this.label="",this.getAriaHandleText=(t,e)=>e.format(t),this.languageResolver=new io(this),this.normalization=ei}get handleName(){return this.name}get focusElement(){var t,e;return null!=(e=null==(t=this.handleController)?void 0:t.inputForHandle(this))?e:this}update(t){var e;if(!this.hasUpdated){const{max:t,min:e}=this;null==this.value&&!isNaN(t)&&!isNaN(e)&&(this.value=t<e?e:e+(t-e)/2)}(t.has("formatOptions")||t.has(oo))&&delete this._numberFormatCache,t.has("value")&&null!=t.get("value")&&this.updateComplete.then((()=>{var t;null==(t=this.handleController)||t.setValueFromHandle(this)})),null==(e=this.handleController)||e.handleHasChanged(this),super.update(t)}firstUpdated(t){super.firstUpdated(t),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const t=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(t)}getNumberFormat(){var t;if(!this._numberFormatCache||this.languageResolver.language!==this._numberFormatCache.language){let t;try{t=new no(this.languageResolver.language,this.formatOptions),this._forcedUnit=""}catch(e){const{style:r,unit:o,unitDisplay:i,...s}=this.formatOptions||{};"unit"===r&&(this._forcedUnit=o),t=new no(this.languageResolver.language,s)}this._numberFormatCache={language:this.languageResolver.language,numberFormat:t}}return null==(t=this._numberFormatCache)?void 0:t.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}}ti([a({type:Number})],ii.prototype,"value",2),ti([a({type:Boolean,reflect:!0})],ii.prototype,"dragging",2),ti([a({type:Boolean})],ii.prototype,"highlight",2),ti([a({type:String})],ii.prototype,"name",2),ti([a({reflect:!0,converter:ri})],ii.prototype,"min",2),ti([a({reflect:!0,converter:oi})],ii.prototype,"max",2),ti([a({type:Number,reflect:!0})],ii.prototype,"step",2),ti([a({type:Object,attribute:"format-options"})],ii.prototype,"formatOptions",2),ti([a({type:String})],ii.prototype,"label",2),ti([a({attribute:!1})],ii.prototype,"getAriaHandleText",2),ti([a({attribute:!1})],ii.prototype,"normalization",2),customElements.define("sp-slider-handle",ii);var si=r`
:host{--spectrum-slider-tick-mark-width:var(
--spectrum-slider-m-tick-mark-width,var(--spectrum-alias-border-size-thick)
);--spectrum-slider-tick-mark-height:var(
--spectrum-slider-m-tick-mark-height,var(--spectrum-global-dimension-size-125)
);--spectrum-slider-tick-mark-border-radius:var(
--spectrum-slider-m-tick-mark-border-radius,var(--spectrum-alias-border-radius-xsmall)
);--spectrum-slider-track-border-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-slider-track-height:var(
--spectrum-slider-m-track-height,var(--spectrum-alias-border-size-thick)
);--spectrum-slider-handle-width:var(
--spectrum-slider-m-handle-width,var(--spectrum-alias-control-two-size-l)
);--spectrum-slider-handle-height:var(
--spectrum-slider-m-handle-height,var(--spectrum-alias-control-two-size-l)
);--spectrum-slider-handle-gap:var(
--spectrum-slider-m-handle-gap,var(--spectrum-alias-border-size-thicker)
);--spectrum-slider-handle-border-size:var(
--spectrum-slider-m-handle-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-slider-handle-border-radius:var(
--spectrum-slider-m-handle-border-radius,var(--spectrum-global-dimension-size-100)
);--spectrum-slider-height:var(
--spectrum-slider-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-slider-min-width:var(
--spectrum-slider-m-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-slider-animation-duration:var(
--spectrum-slider-m-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-slider-ramp-track-color-disabled:var(
--spectrum-slider-m-ramp-track-color-disabled,var(--spectrum-global-color-gray-300)
);--spectrum-slider-ramp-track-height:var(
--spectrum-slider-m-ramp-track-height,var(--spectrum-global-dimension-size-200)
);--spectrum-slider-label-gap-y:var(--spectrum-global-dimension-size-85);--spectrum-slider-controls-margin:calc(var(--spectrum-slider-handle-width)/2);--spectrum-slider-track-margin-offset:calc(var(--spectrum-slider-controls-margin)*-1);--spectrum-slider-handle-margin-top:calc(var(--spectrum-slider-handle-width)/-2);--spectrum-slider-handle-margin-left:calc(var(--spectrum-slider-handle-width)/-2);--spectrum-slider-track-handleoffset:var(--spectrum-slider-handle-gap);--spectrum-slider-track-middle-handleoffset:calc(var(--spectrum-slider-handle-gap) + var(--spectrum-slider-handle-width)/2);--spectrum-slider-input-top:calc(var(--spectrum-slider-handle-margin-top)/4);--spectrum-slider-input-left:calc(var(--spectrum-slider-handle-margin-left)/4);--spectrum-slider-ramp-margin-top:0;--spectrum-slider-range-track-reset:0;--spectrum-slider-label-margin-bottom:-3px;--spectrum-slider-label-gap-x:var(
--spectrum-alias-item-control-gap-m,var(--spectrum-global-dimension-size-125)
);--spectrum-slider-label-text-line-height:var(
--spectrum-global-font-line-height-small,1.3
)}:host{display:block;min-height:var(--spectrum-slider-height);min-width:var(--spectrum-slider-min-width);position:relative;-webkit-user-select:none;user-select:none;z-index:1}:host([dir=ltr]) #controls{margin-left:var(
--spectrum-slider-controls-margin
)}:host([dir=rtl]) #controls{margin-right:var(
--spectrum-slider-controls-margin
)}#controls{box-sizing:border-box;display:inline-block;min-height:var(--spectrum-slider-height);position:relative;vertical-align:top;width:calc(100% - var(--spectrum-slider-controls-margin)*2);z-index:auto}:host([dir=ltr]) #fill,:host([dir=ltr]) .track{left:0}:host([dir=rtl]) #fill,:host([dir=rtl]) .track{right:0}:host([dir=ltr]) #fill,:host([dir=ltr]) .track{right:auto}:host([dir=rtl]) #fill,:host([dir=rtl]) .track{left:auto}#fill,.track{box-sizing:border-box;height:var(
--spectrum-slider-track-height
);margin-top:calc(var(--spectrum-slider-track-height)/-2);pointer-events:none;position:absolute;top:calc(var(--spectrum-slider-height)/2);z-index:1}:host([dir=ltr]) #fill,:host([dir=ltr]) .track{padding-left:0;padding-right:var(--spectrum-slider-track-handleoffset)}:host([dir=rtl]) #fill,:host([dir=rtl]) .track{padding-left:var(--spectrum-slider-track-handleoffset);padding-right:0}:host([dir=ltr]) #fill,:host([dir=ltr]) .track{margin-left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) #fill,:host([dir=rtl]) .track{margin-right:var(
--spectrum-slider-track-margin-offset
)}#fill,.track{padding-bottom:0;padding-top:0}:host([dir=ltr]) #fill:before,:host([dir=ltr]) .track:before{border-top-left-radius:0}:host([dir=rtl]) #fill:before,:host([dir=rtl]) .track:before{border-top-right-radius:0}:host([dir=ltr]) #fill:before,:host([dir=ltr]) .track:before{border-bottom-left-radius:0}:host([dir=rtl]) #fill:before,:host([dir=rtl]) .track:before{border-bottom-right-radius:0}:host([dir=ltr]) #fill:before,:host([dir=ltr]) .track:before{border-top-right-radius:0}:host([dir=rtl]) #fill:before,:host([dir=rtl]) .track:before{border-top-left-radius:0}:host([dir=ltr]) #fill:before,:host([dir=ltr]) .track:before{border-bottom-right-radius:0}:host([dir=rtl]) #fill:before,:host([dir=rtl]) .track:before{border-bottom-left-radius:0}#fill:before,.track:before{content:"";display:block;height:100%}:host([dir=ltr]) .track:first-of-type:before{border-top-left-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=rtl]) .track:first-of-type:before{border-top-right-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=ltr]) .track:first-of-type:before{border-bottom-left-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=rtl]) .track:first-of-type:before{border-bottom-right-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=ltr]) .track:first-of-type:before{border-top-right-radius:0}:host([dir=rtl]) .track:first-of-type:before{border-top-left-radius:0}:host([dir=ltr]) .track:first-of-type:before{border-bottom-right-radius:0}:host([dir=rtl]) .track:first-of-type:before{border-bottom-left-radius:0}:host([dir=ltr]) .track:last-of-type:before{border-top-left-radius:0}:host([dir=rtl]) .track:last-of-type:before{border-top-right-radius:0}:host([dir=ltr]) .track:last-of-type:before{border-bottom-left-radius:0}:host([dir=rtl]) .track:last-of-type:before{border-bottom-right-radius:0}:host([dir=ltr]) .track:last-of-type:before{border-top-right-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=rtl]) .track:last-of-type:before{border-top-left-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=ltr]) .track:last-of-type:before{border-bottom-right-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=rtl]) .track:last-of-type:before{border-bottom-left-radius:var(
--spectrum-slider-track-border-radius
)}:host([dir=ltr]) .track~.track{left:auto}:host([dir=rtl]) .track~.track{right:auto}:host([dir=ltr]) .track~.track{right:var(
--spectrum-slider-range-track-reset
)}:host([dir=rtl]) .track~.track{left:var(
--spectrum-slider-range-track-reset
)}:host([dir=ltr]) .track~.track{padding-left:var(
--spectrum-slider-track-handleoffset
);padding-right:0}:host([dir=rtl]) .track~.track{padding-left:0;padding-right:var(
--spectrum-slider-track-handleoffset
)}:host([dir=ltr]) .track~.track{margin-left:var(
--spectrum-slider-range-track-reset
)}:host([dir=rtl]) .track~.track{margin-right:var(
--spectrum-slider-range-track-reset
)}:host([dir=ltr]) .track~.track{margin-right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) .track~.track{margin-left:var(
--spectrum-slider-track-margin-offset
)}.track~.track{padding-bottom:0;padding-top:0}:host([dir=ltr]) #fill{margin-left:0}:host([dir=rtl]) #fill{margin-right:0}:host([dir=ltr]) #fill{padding-left:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset));padding-right:0}:host([dir=rtl]) #fill{padding-left:0;padding-right:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset))}#fill{padding-bottom:0;padding-top:0}:host([dir=ltr]) .spectrum-Slider-fill--right{padding-left:0;padding-right:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset))}:host([dir=rtl]) .spectrum-Slider-fill--right{padding-left:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset));padding-right:0}.spectrum-Slider-fill--right{padding-bottom:0;padding-top:0}:host([variant=range]) #value{-webkit-user-select:text;user-select:text}:host([dir=ltr][variant=range]) .track:before{border-top-left-radius:0}:host([dir=rtl][variant=range]) .track:before{border-top-right-radius:0}:host([dir=ltr][variant=range]) .track:before{border-bottom-left-radius:0}:host([dir=rtl][variant=range]) .track:before{border-bottom-right-radius:0}:host([dir=ltr][variant=range]) .track:before{border-top-right-radius:0}:host([dir=rtl][variant=range]) .track:before{border-top-left-radius:0}:host([dir=ltr][variant=range]) .track:before{border-bottom-right-radius:0}:host([dir=rtl][variant=range]) .track:before{border-bottom-left-radius:0}:host([dir=ltr][variant=range]) .track:first-of-type{padding-left:0;padding-right:var(--spectrum-slider-track-handleoffset)}:host([dir=rtl][variant=range]) .track:first-of-type{padding-left:var(--spectrum-slider-track-handleoffset);padding-right:0}:host([dir=ltr][variant=range]) .track:first-of-type{left:var(
--spectrum-slider-range-track-reset
)}:host([dir=rtl][variant=range]) .track:first-of-type{right:var(
--spectrum-slider-range-track-reset
)}:host([dir=ltr][variant=range]) .track:first-of-type{right:auto}:host([dir=rtl][variant=range]) .track:first-of-type{left:auto}:host([dir=ltr][variant=range]) .track:first-of-type{margin-left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl][variant=range]) .track:first-of-type{margin-right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=ltr][variant=range]) .track:first-of-type:before{border-top-left-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=rtl][variant=range]) .track:first-of-type:before{border-top-right-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=ltr][variant=range]) .track:first-of-type:before{border-bottom-left-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=rtl][variant=range]) .track:first-of-type:before{border-bottom-right-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=ltr][variant=range]) .track:first-of-type:before{border-top-right-radius:0}:host([dir=rtl][variant=range]) .track:first-of-type:before{border-top-left-radius:0}:host([dir=ltr][variant=range]) .track:first-of-type:before{border-bottom-right-radius:0}:host([dir=rtl][variant=range]) .track:first-of-type:before{border-bottom-left-radius:0}:host([dir=ltr][variant=range]) [dir=ltr] .track,:host([dir=ltr][variant=range]) [dir=rtl] .track{left:auto}:host([dir=ltr][variant=range]) [dir=rtl] .track,:host([dir=rtl][variant=range]) [dir=rtl] .track{right:auto}:host([dir=ltr][variant=range]) [dir=ltr] .track,:host([dir=ltr][variant=range]) [dir=rtl] .track{right:auto}:host([dir=ltr][variant=range]) [dir=rtl] .track,:host([dir=rtl][variant=range]) [dir=rtl] .track{left:auto}:host([dir=ltr][variant=range]) .track,:host([dir=rtl][variant=range]) .track{margin-left:var(--spectrum-slider-range-track-reset);margin-right:var(--spectrum-slider-range-track-reset);padding-left:var(
--spectrum-slider-track-middle-handleoffset
);padding-right:var(--spectrum-slider-track-middle-handleoffset)}:host([dir=ltr][variant=range]) .track:last-of-type{padding-left:var(
--spectrum-slider-track-handleoffset
);padding-right:0}:host([dir=rtl][variant=range]) .track:last-of-type{padding-left:0;padding-right:var(
--spectrum-slider-track-handleoffset
)}:host([dir=ltr][variant=range]) .track:last-of-type{left:auto}:host([dir=rtl][variant=range]) .track:last-of-type{right:auto}:host([dir=ltr][variant=range]) .track:last-of-type{right:var(
--spectrum-slider-range-track-reset
)}:host([dir=rtl][variant=range]) .track:last-of-type{left:var(
--spectrum-slider-range-track-reset
)}:host([dir=ltr][variant=range]) .track:last-of-type{margin-right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl][variant=range]) .track:last-of-type{margin-left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=ltr][variant=range]) .track:last-of-type:before{border-top-right-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=rtl][variant=range]) .track:last-of-type:before{border-top-left-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=ltr][variant=range]) .track:last-of-type:before{border-bottom-right-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=rtl][variant=range]) .track:last-of-type:before{border-bottom-left-radius:var(
--spectrum-slider-m-track-border-radius,var(--spectrum-global-dimension-static-size-10)
)}:host([dir=ltr][variant=range]) .track:last-of-type:before{border-top-left-radius:0}:host([dir=rtl][variant=range]) .track:last-of-type:before{border-top-right-radius:0}:host([dir=ltr][variant=range]) .track:last-of-type:before{border-bottom-left-radius:0}:host([dir=rtl][variant=range]) .track:last-of-type:before{border-bottom-right-radius:0}:host([dir=ltr]) #ramp{left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) #ramp{right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=ltr]) #ramp{right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) #ramp{left:var(
--spectrum-slider-track-margin-offset
)}#ramp{height:var(--spectrum-slider-ramp-track-height);margin-top:var(
--spectrum-slider-ramp-margin-top
);position:absolute;top:calc(var(--spectrum-slider-ramp-track-height)/2)}:host([dir=rtl]) #ramp svg{transform:matrix(-1,0,0,1,0,0)}#ramp svg{height:100%;width:100%}:host([dir=ltr]) .handle{left:0}:host([dir=rtl]) .handle{right:0}:host([dir=ltr]) .handle{margin-left:calc(var(--spectrum-slider-handle-width)/-2);margin-right:0}:host([dir=rtl]) .handle{margin-left:0;margin-right:calc(var(--spectrum-slider-handle-width)/-2)}.handle{border-radius:var(--spectrum-slider-handle-border-radius);border-style:solid;border-width:var(--spectrum-slider-handle-border-size);box-sizing:border-box;display:inline-block;height:var(--spectrum-slider-handle-height);margin-bottom:0;margin-top:var(--spectrum-slider-handle-margin-top);outline:none;position:absolute;top:calc(var(--spectrum-slider-height)/2);transition:border-width var(--spectrum-slider-animation-duration) ease-in-out;width:var(--spectrum-slider-handle-width);z-index:2}.handle.dragging,.handle.handle-highlight,.handle:active{border-width:var(
--spectrum-slider-handle-border-size
)}.handle.dragging,.handle.handle-highlight,.handle.is-tophandle,.handle:active{z-index:3}.handle:before{border-radius:100%;content:" ";display:block;height:var(--spectrum-slider-handle-height);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out,width var(--spectrum-global-animation-duration-100,.13s) ease-out,height var(--spectrum-global-animation-duration-100,.13s) ease-out;width:var(--spectrum-slider-handle-width)}.handle.handle-highlight:before{height:calc(var(--spectrum-slider-handle-height) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*2);width:calc(var(--spectrum-slider-handle-width) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*2)}:host([dir=ltr]) .input{left:var(
--spectrum-slider-input-left
)}:host([dir=rtl]) .input{right:var(
--spectrum-slider-input-left
)}.input{-webkit-appearance:none;border:0;cursor:default;height:var(--spectrum-slider-handle-height);margin:0;opacity:.000001;overflow:hidden;padding:0;pointer-events:none;position:absolute;top:var(--spectrum-slider-input-top);width:var(--spectrum-slider-handle-width)}.input:focus{outline:none}#label-container{display:flex;font-size:var(
--spectrum-slider-label-text-size,var(--spectrum-global-dimension-font-size-75)
);line-height:var(--spectrum-slider-label-text-line-height);margin-bottom:var(--spectrum-slider-label-margin-bottom);padding-top:var(
--spectrum-fieldlabel-m-padding-top,var(--spectrum-global-dimension-size-50)
);position:relative;width:auto}:host([dir=ltr]) #label{padding-left:0}:host([dir=rtl]) #label{padding-right:0}#label{flex-grow:1}:host([dir=ltr]) #value{padding-right:0}:host([dir=rtl]) #value{padding-left:0}:host([dir=ltr]) #value{text-align:right}:host([dir=rtl]) #value{text-align:left}#value{font-feature-settings:"tnum";cursor:default;flex-grow:0}:host([dir=ltr]) #value{margin-left:var(
--spectrum-slider-label-gap-x
)}:host([dir=rtl]) #value{margin-right:var(
--spectrum-slider-label-gap-x
)}.ticks{display:flex;justify-content:space-between;margin:0 var(--spectrum-slider-track-margin-offset);margin-top:calc(var(--spectrum-slider-tick-mark-height) + 1px);z-index:0}.tick{position:relative;width:var(--spectrum-slider-tick-mark-width)}:host([dir=ltr]) .tick:after{left:calc(50% - var(--spectrum-slider-tick-mark-width)/2)}:host([dir=rtl]) .tick:after{right:calc(50% - var(--spectrum-slider-tick-mark-width)/2)}.tick:after{border-radius:var(--spectrum-slider-tick-mark-border-radius);content:"";display:block;height:var(--spectrum-slider-tick-mark-height);position:absolute;top:0;width:var(--spectrum-slider-tick-mark-width)}.tick .tickLabel{align-items:center;display:flex;font-size:var(
--spectrum-slider-label-text-size,var(--spectrum-global-dimension-font-size-75)
);justify-content:center;line-height:var(--spectrum-slider-label-text-line-height);margin-bottom:0;margin-left:calc(var(--spectrum-slider-label-gap-x)*-1);margin-right:calc(var(--spectrum-slider-label-gap-x)*-1);margin-top:calc(var(--spectrum-slider-label-gap-y) + var(--spectrum-slider-tick-mark-height))}.tick:first-of-type .tickLabel,.tick:last-of-type .tickLabel{display:block;margin-left:0;margin-right:0;position:absolute}:host([dir=ltr]) .tick:first-of-type{left:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=rtl]) .tick:first-of-type{right:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=ltr]) .tick:first-of-type .tickLabel{left:0}:host([dir=rtl]) .tick:first-of-type .tickLabel{right:0}:host([dir=ltr]) .tick:last-of-type{right:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=rtl]) .tick:last-of-type{left:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=ltr]) .tick:last-of-type .tickLabel{right:0}:host([dir=rtl]) .tick:last-of-type .tickLabel{left:0}:host([disabled]){cursor:default}:host([disabled]) .handle{cursor:default;pointer-events:none}.spectrum-Slider-handleContainer,.spectrum-Slider-trackContainer{margin-left:calc(var(--spectrum-slider-handle-width)/2*-1);position:absolute;top:calc(var(--spectrum-slider-track-height)/2 - 1px);width:calc(100% + var(--spectrum-slider-handle-width))}.spectrum-Slider-trackContainer{height:var(--spectrum-slider-height);overflow:hidden}:host{--spectrum-slider-m-focus-ring-size:var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
);--spectrum-slider-m-handle-border-color-key-focus:var(
--spectrum-global-color-gray-800
);--spectrum-slider-m-handle-focus-ring-color-key-focus:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);--spectrum-slider-m-label-text-color:var(
--spectrum-alias-label-text-color,var(--spectrum-global-color-gray-700)
);--spectrum-slider-m-label-text-color-disabled:var(
--spectrum-alias-text-color-disabled,var(--spectrum-global-color-gray-500)
)}.track:before{background:var(
--spectrum-slider-m-track-color,var(--spectrum-global-color-gray-400)
)}#label-container{color:var(
--spectrum-slider-m-label-text-color
)}:host([variant=filled]) .track:first-child:before{background:var(
--spectrum-slider-m-track-fill-color,var(--spectrum-global-color-gray-700)
)}#fill:before{background:var(
--spectrum-slider-m-track-fill-color,var(--spectrum-global-color-gray-700)
)}#ramp path{fill:var(
--spectrum-slider-m-track-color,var(--spectrum-global-color-gray-400)
)}.handle{background:var(
--spectrum-slider-m-handle-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-slider-m-handle-border-color,var(--spectrum-global-color-gray-700)
)}.handle:hover{border-color:var(
--spectrum-slider-m-handle-border-color-hover,var(--spectrum-global-color-gray-800)
)}.handle.handle-highlight{border-color:var(
--spectrum-slider-m-handle-border-color-key-focus,var(--spectrum-global-color-gray-800)
)}.handle.handle-highlight:before{box-shadow:0 0 0 var(
--spectrum-slider-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(--spectrum-slider-m-handle-focus-ring-color-key-focus)}.handle.dragging,.handle:active{border-color:var(
--spectrum-slider-m-handle-border-color-down,var(--spectrum-global-color-gray-800)
)}:host([variant=ramp]) .handle{box-shadow:0 0 0 var(
--spectrum-slider-m-handle-gap,var(--spectrum-alias-border-size-thicker)
) var(
--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100)
)}.input{background:transparent}.tick:after{background-color:var(
--spectrum-slider-m-tick-mark-color,var(--spectrum-global-color-gray-400)
)}.handle.dragging{background:var(
--spectrum-slider-m-handle-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-slider-m-handle-border-color-down,var(--spectrum-global-color-gray-800)
)}:host([variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--spectrum-slider-m-track-fill-color,var(--spectrum-global-color-gray-700)
)}:host([disabled]) #label-container{color:var(
--spectrum-slider-m-label-text-color-disabled
)}:host([disabled]) .handle{background:var(
--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100)
);border-color:var(
--spectrum-slider-m-handle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}:host([disabled]) .handle:active,:host([disabled]) .handle:hover{background:var(
--spectrum-slider-m-handle-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-slider-m-handle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}:host([disabled]) .track:before{background:var(
--spectrum-slider-m-track-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled][variant=filled]) .track:first-child:before{background:var(
--spectrum-slider-m-track-fill-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled]) #fill:before{background:var(
--spectrum-slider-m-track-fill-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled]) #ramp path{fill:var(
--spectrum-slider-ramp-track-color-disabled
)}:host([disabled][variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--spectrum-slider-m-track-fill-color-disabled,var(--spectrum-global-color-gray-300)
)}@media (forced-colors:active){:host{--spectrum-alias-background-color-default:ButtonFace;--spectrum-alias-focus-color:ButtonText;--spectrum-alias-label-text-color:CanvasText;--spectrum-alias-text-color-disabled:GrayText;--spectrum-slider-m-handle-background-color:ButtonFace;--spectrum-slider-m-handle-border-color:ButtonText;--spectrum-slider-m-handle-border-color-disabled:GrayText;--spectrum-slider-m-handle-border-color-down:Highlight;--spectrum-slider-m-handle-border-color-hover:Highlight;--spectrum-slider-m-handle-border-color-key-focus:Highlight;--spectrum-slider-m-handle-focus-ring-color-key-focus:ButtonText;--spectrum-slider-m-label-text-color:CanvasText;--spectrum-slider-m-label-text-color-disabled:GrayText;--spectrum-slider-m-tick-mark-color:ButtonText;--spectrum-slider-m-track-color:ButtonText;--spectrum-slider-m-track-color-disabled:GrayText;--spectrum-slider-m-track-fill-color:ButtonText;--spectrum-slider-m-track-fill-color-disabled:GrayText;--spectrum-slider-ramp-track-color-disabled:GrayText}.handle:before{forced-color-adjust:none}:host([variant=ramp]) .handle{forced-color-adjust:none}}:host{--spectrum-slider-handle-default-background-color:var(
--spectrum-slider-m-handle-background-color,var(--spectrum-alias-background-color-transparent)
);--spectrum-slider-handle-default-border-color:var(
--spectrum-slider-m-handle-border-color,var(--spectrum-global-color-gray-700)
)}sp-field-label{padding-bottom:0;padding-top:0}:host(:focus){outline:0}:host([editable]){display:grid;grid-template-areas:"label ." "slider number";grid-template-columns:1fr auto}:host([editable]) #label-container{grid-area:label}:host([editable]) #label-container+div{grid-area:slider}:host([editable]) sp-number-field{--spectrum-stepper-width:var(
--spectrum-slider-editable-number-field-width,var(--spectrum-global-dimension-size-1000)
);grid-area:number}:host([hide-stepper]) sp-number-field{--spectrum-stepper-width:var(
--spectrum-slider-editable-number-field-width,var(--spectrum-global-dimension-size-900)
)}:host([editable][dir=ltr]) sp-number-field{margin-left:var(--spectrum-global-dimension-size-200)}:host([editable][dir=rtl]) sp-number-field{margin-right:var(--spectrum-global-dimension-size-200)}:host([editable]) output{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([disabled]){pointer-events:none}#track,:host([dragging]){touch-action:none;-webkit-user-select:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:before{background:var(
--spectrum-slider-m-track-color,var(
--spectrum-slider-track-color,var(--spectrum-global-color-gray-300)
)
)}:host([dir=rtl]) .track:before{background:var(
--spectrum-slider-m-track-color,var(
--spectrum-slider-track-color-rtl,var(
--spectrum-slider-track-color,var(--spectrum-global-color-gray-300)
)
)
)}:host([dir=ltr]) .track:last-of-type:before{background-position:100%}:host([dir=rtl]) .track:first-of-type:before{background-position:100%}.track:not(:first-of-type,:last-of-type){padding-left:calc(var(--spectrum-slider-handle-width)/2 + var(--spectrum-slider-track-handleoffset))!important;padding-right:calc(var(--spectrum-slider-handle-width)/2 + var(--spectrum-slider-track-handleoffset))!important}:host([dir=ltr]) .track:not(:first-of-type,:last-of-type){left:var(--spectrum-slider-track-segment-position)}:host([dir=rtl]) .track:not(:first-of-type,:last-of-type){right:var(--spectrum-slider-track-segment-position)}.visually-hidden{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}:host([label-visibility=value][dir=ltr]) #value{margin-left:auto}:host([label-visibility=value][dir=rtl]) #value{margin-right:auto}:host([label-visibility=none]) #label-container{margin:0;padding:0}
`;class ai{constructor(t){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let t=[...this.host.querySelectorAll('[slot="handle"]')];0===t.length&&(t=[this.host]),!t.some((t=>this.waitForUpgrade(t)))&&(this.handles=new Map,this.handleOrder=[],t.forEach(((t,e)=>{var r;null!=(r=t.handleName)&&r.length||(t.name=`handle${e+1}`),this.handles.set(t.handleName,t),this.handleOrder.push(t.handleName),t.handleController=this})),this.requestUpdate())},this.onInputChange=t=>{const e=t.target;e.model.handle.value=e.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(e,e.model.handle)},this.onInputFocus=t=>{const e=t.target;let r;try{r=e.matches(":focus-visible")||this.host.matches(".focus-visible")}catch(t){r=this.host.matches(".focus-visible")}e.model.handle.highlight=r,this.requestUpdate()},this.onInputBlur=t=>{t.target.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=t=>{t.target.model.handle.highlight=!0,this.requestUpdate()},this.host=t,new k(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom()}}),this.extractModelFromLightDom()}get values(){const t={};for(const e of this.handles.values())t[e.handleName]=e.value;return t}get size(){return this.handles.size}inputForHandle(t){if(this.handles.has(t.handleName)){const{input:e}=this.getHandleElements(t);return e}throw new Error(`No input for handle "${t.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate()}setValueFromHandle(t){const e=this.getHandleElements(t);if(!e)return;const{input:r}=e;r.valueAsNumber===t.value?t.dragging&&t.dispatchInputEvent():(r.valueAsNumber=t.value,this.requestUpdate()),t.value=r.valueAsNumber}handleHasChanged(t){t!==this.host&&this.requestUpdate()}formattedValueForHandle(t){var e;const{handle:r}=t,o=null!=(e=r.numberFormat)?e:this.host.numberFormat;return r.getAriaHandleText(t.value,o)}get formattedValues(){const t=new Map;for(const e of this.model)t.set(e.name,this.formattedValueForHandle(e));return t}get focusElement(){const{input:t}=this.getActiveHandleElements();return this.host.editable&&!t.model.handle.dragging?this.host.numberField:t}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(t){return!(t instanceof ii)&&(t.addEventListener("sp-slider-handle-ready",(()=>this.extractModelFromLightDom()),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const t=this.activeHandle;return`input-${this.model.findIndex((e=>e.name===t))}`}activateHandle(t){const e=this.handleOrder.findIndex((e=>e===t));e>=0&&this.handleOrder.splice(e,1),this.handleOrder.push(t)}getActiveHandleElements(){const t=this.activeHandle,e=this.handles.get(t);return{model:e,...this.getHandleElements(e)}}getHandleElements(t){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const t=this.host.shadowRoot.querySelectorAll(".handle > input");for(const e of t){const t=e,r=t.parentElement,o=this.handles.get(r.getAttribute("name"));o&&this.handleRefMap.set(o,{input:t,handle:r})}}return this.handleRefMap.get(t)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(t){if(!this._activePointerEventData){let e=t.target.querySelector(":scope > .input");const r=!e,o=e?e.model:this.model.find((t=>t.name===this.activeHandle));!e&&o&&(e=o.handle.focusElement),this._activePointerEventData={input:e,model:o,resolvedInput:r}}return this._activePointerEventData}handlePointerdown(t){const{resolvedInput:e,model:r}=this.extractDataFromEvent(t);r&&!this.host.disabled&&0===t.button?(this.host.track.setPointerCapture(t.pointerId),this.updateBoundingRect(),"mouse"===t.pointerType&&this.host.labelEl.click(),this.draggingHandle=r.handle,r.handle.dragging=!0,this.activateHandle(r.name),e&&this.handlePointermove(t),this.requestUpdate()):t.preventDefault()}handlePointerup(t){const{input:e,model:r}=this.extractDataFromEvent(t);delete this._activePointerEventData,r&&("mouse"===t.pointerType&&this.host.labelEl.click(),this.cancelDrag(r),this.requestUpdate(),this.host.track.releasePointerCapture(t.pointerId),this.dispatchChangeEvent(e,r.handle))}handlePointermove(t){const{input:e,model:r}=this.extractDataFromEvent(t);r&&this.draggingHandle&&(t.stopPropagation(),e.value=this.calculateHandlePosition(t,r).toString(),r.handle.value=parseFloat(e.value),this.host.indeterminate=!1,this.requestUpdate())}cancelDrag(t){t=t||this.model.find((t=>t.name===this.activeHandle)),t&&(t.handle.highlight=!1,delete this.draggingHandle,t.handle.dragging=!1)}dispatchChangeEvent(t,e){t.valueAsNumber=e.value;const r=new Event("change",{bubbles:!0,composed:!0});e.dispatchEvent(r)}calculateHandlePosition(t,e){const r=this.boundingClientRect,o=r.left,i=t.clientX,s=r.width,a=(this.host.isLTR?i-o:s-(i-o))/s;return e.normalization.fromNormalized(a,e.range.min,e.range.max)}renderHandle(t,e,r,o){var i;const a={handle:!0,dragging:(null==(i=this.draggingHandle)?void 0:i.handleName)===t.name,"handle-highlight":t.highlight},c={[this.host.isLTR?"left":"right"]:100*t.normalizedValue+"%","z-index":r.toString(),"background-color":`var(--spectrum-slider-handle-background-color-${e}, var(--spectrum-slider-handle-default-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${e}, var(-spectrum-slider-handle-default-border-color))`},l=o?`label input-${e}`:"label";return s`
            <div
                class=${F(a)}
                name=${t.name}
                style=${G(c)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${e}"
                    min=${t.clamp.min}
                    max=${t.clamp.max}
                    step=${t.step}
                    value=${t.value}
                    aria-disabled=${y(this.host.disabled?"true":void 0)}
                    tabindex=${y(this.host.editable?-1:void 0)}
                    aria-label=${y(t.ariaLabel)}
                    aria-labelledby=${l}
                    aria-valuetext=${this.formattedValueForHandle(t)}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${t}
                />
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map(((t,e)=>{const r=this.handleOrder.indexOf(t.name)+1;return this.renderHandle(t,e,r,this.model.length>1)}))}trackSegments(){const t=this.model.map((t=>t.normalizedValue));return t.sort(((t,e)=>t-e)),t.unshift(0),t.map(((t,e,r)=>{var o;return[t,null!=(o=r[e+1])?o:1]}))}updateModel(){const t=[...this.handles.values()],e=e=>{const r=t[e],o=t[e-1],i=t[e+1],s="number"==typeof r.min?r.min:this.host.min,a="number"==typeof r.max?r.max:this.host.max,c={range:{min:s,max:a},clamp:{min:s,max:a}};if("previous"===r.min&&o){for(let r=e-1;r>=0;r--){const e=t[r];if("number"==typeof e.min){c.range.min=e.min;break}}c.clamp.min=Math.max(o.value,c.range.min)}if("next"===r.max&&i){for(let r=e+1;r<t.length;r++){const e=t[r];if("number"==typeof e.max){c.range.max=e.max;break}}c.clamp.max=Math.min(i.value,c.range.max)}return c},r=t.map(((t,r)=>{var o;const i=e(r),{toNormalized:s}=t.normalization,a=Math.max(Math.min(t.value,i.clamp.max),i.clamp.min),c=s(a,i.range.min,i.range.max);return{name:t.handleName,value:a,normalizedValue:c,highlight:t.highlight,step:null!=(o=t.step)?o:this.host.step,normalization:t.normalization,handle:t,ariaLabel:t!==this.host&&(null==t?void 0:t.label.length)>0?t.label:void 0,...i}}));this.model=r}async handleUpdatesComplete(){const t=[...this.handles.values()].filter((t=>t!==this.host)).map((t=>t.updateComplete));await Promise.all(t)}}var ci=Object.defineProperty,li=Object.getOwnPropertyDescriptor,ni=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?li(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&ci(e,r,s),s};const di=["filled","ramp","range","tick"];class ui extends(p(ii,"")){constructor(){super(...arguments),this.handleController=new ai(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=t=>{const e=[...t.values()];return 2===e.length?`${e[0]}${this._forcedUnit} - ${e[1]}${this._forcedUnit}`:e.join(`${this._forcedUnit}, `)+this._forcedUnit},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this.quiet=!1,this.indeterminate=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[si]}get editable(){return this._editable}set editable(t){if(t===this.editable)return;const e=this.editable;this._editable=this.handleController.size<2&&t,this.editable&&(this._numberFieldInput=Promise.resolve().then((function(){return So}))),e!==this.editable&&this.requestUpdate("editable",e)}set variant(t){const e=this.variant;t!==this.variant&&(di.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(t){this.editable&&(t.preventDefault(),this.focus())}render(){return s`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?s`
                      <sp-number-field
                          .formatOptions=${this.formatOptions||{}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `:s``}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(t){this.handleController.hostUpdate(),t.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(t)}renderLabel(){const t="none"===this.labelVisibility||"value"===this.labelVisibility,e="none"===this.labelVisibility||"text"===this.labelVisibility;return s`
            <div id="label-container">
                <sp-field-label
                    class=${F({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                >
                    ${this.slotHasContent?s``:this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <output
                    class=${F({"visually-hidden":e})}
                    id="value"
                    aria-live="off"
                    for="input"
                >
                    ${this.ariaValueText}
                </output>
            </div>
        `}renderRamp(){return"ramp"!==this.variant?s``:s`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `}renderTicks(){if("tick"!==this.variant)return s``;const t=this.tickStep||this.step,e=(this.max-this.min)/t,r=e%1!=0,o=new Array(Math.floor(e+1));return o.fill(0,0,e+1),s`
            <div
                class="${r?"not-exact ":""}ticks"
                style=${y(r?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${o.map(((e,r)=>s`
                        <div class="tick">
                            ${this.tickLabels?s`
                                      <div class="tickLabel">
                                          ${r*t+this.min}
                                      </div>
                                  `:s``}
                        </div>
                    `))}
            </div>
        `}renderTrackSegment(t,e){return"ramp"===this.variant?s``:s`
            <div
                class="track"
                style=${G(this.trackSegmentStyles(t,e))}
                role="presentation"
            ></div>
        `}renderTrack(){const t=this.handleController.trackSegments(),e=[{id:"track0",html:this.renderTrackSegment(...t[0])},{id:"ramp",html:this.renderRamp()},{id:"ticks",html:this.renderTicks()},{id:"handles",html:this.handleController.render()},...t.slice(1).map((([t,e],r)=>({id:`track${r+1}`,html:this.renderTrackSegment(t,e)})))];return s`
            <div
                id="track"
                ${ke({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            >
                <div id="controls">
                    ${H(e,(t=>t.id),(t=>t.html))}
                </div>
            </div>
        `}handlePointerdown(t){this.handleController.handlePointerdown(t)}handlePointermove(t){this.handleController.handlePointermove(t)}handlePointerup(t){this.handleController.handlePointerup(t)}handleNumberInput(t){var e;const{value:r}=t.target;null==(e=t.target)||!e.managedInput||isNaN(r)?t.stopPropagation():this.value=r}handleNumberChange(t){var e;const{value:r}=t.target;isNaN(r)?(t.target.value=this.value,t.stopPropagation()):(this.value=r,null!=(e=t.target)&&e.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(t,e){const r=e-t;return{width:100*r+"%","--spectrum-slider-track-background-size":1/r*100+"%","--spectrum-slider-track-segment-position":100*t+"%"}}async getUpdateComplete(){const t=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),t}}ni([a({type:Boolean,reflect:!0})],ui.prototype,"editable",1),ni([a({type:Boolean,reflect:!0,attribute:"hide-stepper"})],ui.prototype,"hideStepper",2),ni([a()],ui.prototype,"type",2),ni([a({type:String})],ui.prototype,"variant",1),ni([a({attribute:!1})],ui.prototype,"getAriaValueText",2),ni([a({type:String,reflect:!0,attribute:"label-visibility"})],ui.prototype,"labelVisibility",2),ni([a({type:Number,reflect:!0})],ui.prototype,"min",2),ni([a({type:Number,reflect:!0})],ui.prototype,"max",2),ni([a({type:Number})],ui.prototype,"step",2),ni([a({type:Number,attribute:"tick-step"})],ui.prototype,"tickStep",2),ni([a({type:Boolean,attribute:"tick-labels"})],ui.prototype,"tickLabels",2),ni([a({type:Boolean,reflect:!0})],ui.prototype,"disabled",2),ni([a({type:Boolean})],ui.prototype,"quiet",2),ni([a({type:Boolean})],ui.prototype,"indeterminate",2),ni([z("#label")],ui.prototype,"labelEl",2),ni([z("#number-field")],ui.prototype,"numberField",2),ni([z("#track")],ui.prototype,"track",2),customElements.define("sp-slider",ui);var pi=r`
:host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(
--spectrum-alias-border-radius-small,var(--spectrum-global-dimension-size-25)
)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-global-dimension-size-125
);--spectrum-splitbutton-trigger-flat-edge-padding:var(
--spectrum-global-dimension-size-100
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-splitbutton-trigger-flat-edge-padding) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
))}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-m-primary-outline-texticon-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*3)}:host{display:inline-flex;flex-direction:row;position:relative;vertical-align:top}:host([dir=ltr]) #button{margin-left:0}:host([dir=rtl]) #button{margin-right:0}:host([dir=ltr]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{border-top-right-radius:0}:host([dir=rtl]) #button{border-top-left-radius:0}:host([dir=ltr]) #button{border-bottom-right-radius:0}:host([dir=rtl]) #button{border-bottom-left-radius:0}:host([dir=ltr]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{padding-right:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=rtl]) #button{padding-left:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=ltr]) #button{padding-left:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=rtl]) #button{padding-right:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=ltr]) #button[variant=accent]{padding-right:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=rtl]) #button[variant=accent]{padding-left:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=ltr]) #button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr]) #button:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) #button:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr]) #button:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) #button:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr]) .trigger{margin-left:0}:host([dir=rtl]) .trigger{margin-right:0}:host([dir=ltr]) .trigger{border-top-left-radius:0}:host([dir=rtl]) .trigger{border-top-right-radius:0}:host([dir=ltr]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .trigger{border-bottom-left-radius:0}:host([dir=rtl]) .trigger{border-bottom-right-radius:0}:host([dir=ltr]) .trigger{border-left-width:var(
--spectrum-splitbutton-trigger-border-left
)}:host([dir=rtl]) .trigger{border-right-width:var(
--spectrum-splitbutton-trigger-border-left
)}:host([dir=ltr]) .trigger{padding-left:var(
--spectrum-splitbutton-trigger-flat-edge-padding
)}:host([dir=rtl]) .trigger{padding-right:var(
--spectrum-splitbutton-trigger-flat-edge-padding
)}:host([dir=ltr]) .trigger{padding-right:var(
--spectrum-splitbutton-trigger-round-edge-padding
)}:host([dir=rtl]) .trigger{padding-left:var(
--spectrum-splitbutton-trigger-round-edge-padding
)}.trigger{min-width:var(
--spectrum-splitbutton-trigger-min-width
)}:host([dir=ltr]) .trigger[variant=accent]{padding-left:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=rtl]) .trigger[variant=accent]{padding-right:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=ltr]) .trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}.trigger.focus-visible{box-shadow:none}.trigger:focus-visible{box-shadow:none}:host([dir=ltr]) .trigger:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) .trigger:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr]) .trigger:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) .trigger:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}.icon{display:block;margin-top:1px}#button,.trigger{position:relative}#button:focus,.trigger:focus{z-index:1}:host([dir=ltr]) #button .label+.spectrum-Icon{margin-left:var(
--spectrum-splitbutton-icon-gap
)}:host([dir=rtl]) #button .label+.spectrum-Icon{margin-right:var(
--spectrum-splitbutton-icon-gap
)}:host([dir=ltr][left]) #button{border-top-left-radius:0}:host([dir=rtl][left]) #button{border-top-right-radius:0}:host([dir=ltr][left]) #button{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button{border-bottom-left-radius:0}:host([dir=rtl][left]) #button{border-bottom-right-radius:0}:host([dir=ltr][left]) #button{margin-right:0}:host([dir=rtl][left]) #button{margin-left:0}:host([dir=ltr][left]) #button{margin-left:var(
--spectrum-spltibutton-margin-left
)}:host([dir=rtl][left]) #button{margin-right:var(
--spectrum-spltibutton-margin-left
)}:host([dir=ltr][left]) #button{padding-left:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=rtl][left]) #button{padding-right:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=ltr][left]) #button{padding-right:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=rtl][left]) #button{padding-left:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=ltr][left]) #button[variant=accent]{padding-left:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=rtl][left]) #button[variant=accent]{padding-right:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=ltr][left]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) #button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) #button:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) #button:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) #button:after{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) #button:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger{margin-right:0}:host([dir=rtl][left]) .trigger{margin-left:0}:host([dir=ltr][left]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-top-right-radius:0}:host([dir=rtl][left]) .trigger{border-top-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-right-radius:0}:host([dir=rtl][left]) .trigger{border-bottom-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) .trigger{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) .trigger{border-right-width:var(
--spectrum-splitbutton-trigger-border-left
)}:host([dir=rtl][left]) .trigger{border-left-width:var(
--spectrum-splitbutton-trigger-border-left
)}:host([dir=ltr][left]) .trigger{padding-right:var(
--spectrum-splitbutton-trigger-flat-edge-padding
)}:host([dir=rtl][left]) .trigger{padding-left:var(
--spectrum-splitbutton-trigger-flat-edge-padding
)}:host([dir=ltr][left]) .trigger{padding-left:var(
--spectrum-splitbutton-trigger-round-edge-padding
)}:host([dir=rtl][left]) .trigger{padding-right:var(
--spectrum-splitbutton-trigger-round-edge-padding
)}:host([dir=ltr][left]) .trigger[variant=accent]{padding-right:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=rtl][left]) .trigger[variant=accent]{padding-left:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=ltr][left]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) .trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) .trigger:after{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) .trigger:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}.trigger{--spectrum-splitbutton-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}:host([dir=ltr]) #button[variant=accent]{margin-right:var(
--spectrum-button-border-width,var(--spectrum-alias-border-size-thick)
)}sp-button{--spectrum-button-m-primary-outline-texticon-border-radius:var(
--spectrum-button-border-radius
)}sp-popover{display:none}::slotted(sp-menu){display:none}.more-medium{height:18px;margin:1px -4px 0;width:18px}
`,hi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,gi=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?mi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&hi(e,r,s),s};const bi={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class vi extends(f(B)){constructor(){super(...arguments),this.left=!1,this.variant="accent",this.type="field",this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[pi,C]}get target(){return this}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}sizePopover(t){t.style.setProperty("min-width",`${this.offsetWidth}px`)}passClick(){const t="more"===this.type?this.menuItems[0]:this.selectedItem||this.menuItems[0];t&&t.click()}get buttonContent(){var t;return[s`
                <div
                    id="label"
                    role="presentation"
                    class=${y(this.value?void 0:"placeholder")}
                >
                    ${(null==(t=this.selectedItem)?void 0:t.itemText)||""}
                </div>
            `]}update(t){t.has("type")&&("more"===this.type?this.selects=void 0:this.selects="single"),t.has("value")&&this.manageSplitButtonItems(),super.update(t)}render(){const t=["cta","accent"].includes(this.variant)?"fill":"outline",e=[s`
                <sp-button
                    aria-label=${y(this.label||void 0)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                    treatment=${t}
                    size=${this.size}
                >
                    ${this.buttonContent}
                </sp-button>
            `,s`
                <sp-button
                    aria-haspopup="true"
                    aria-expanded=${this.open?"true":"false"}
                    class="button trigger ${this.variant}"
                    @blur=${this.onButtonBlur}
                    @click=${this.onButtonClick}
                    @focus=${this.onButtonFocus}
                    ?disabled=${this.disabled}
                    aria-label="More"
                    variant=${this.variant}
                    treatment=${t}
                    size=${this.size}
                >
                    ${"field"===this.type?s`
                              <sp-icon-chevron100
                                  class="icon ${bi[this.size]}"
                              ></sp-icon-chevron100>
                          `:s`
                              <sp-icon-more class="icon"></sp-icon-more>
                          `}
                </sp-button>
            `];return this.left&&e.reverse(),s`
            ${e}
        `}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection()}async manageSplitButtonItems(){!this.menuItems.length&&(await this.updateComplete,!this.menuItems.length)||("more"===this.type?(this.menuItems[0].hidden=!0,this.menuItems.forEach((t=>t.selected=!1)),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value)}}gi([a({type:Boolean,reflect:!0})],vi.prototype,"left",2),gi([a({reflect:!0})],vi.prototype,"variant",2),gi([a({type:String})],vi.prototype,"type",2),gi([z(".trigger")],vi.prototype,"trigger",2),customElements.define("sp-split-button",vi);var fi=r`
:host{--spectrum-splitview-vertical-width:100%;--spectrum-splitview-vertical-gripper-width:50%;--spectrum-splitview-vertical-gripper-outer-width:100%;--spectrum-splitview-vertical-gripper-reset:0}:host{display:flex;overflow:hidden}::slotted(*){height:100%}:host([dir=ltr]) #gripper{left:calc((var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}:host([dir=rtl]) #gripper{right:calc((var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}#gripper{border-radius:var(
--spectrum-dragbar-gripper-border-radius,var(--spectrum-alias-border-radius-small)
);border-style:solid;border-width:var(--spectrum-dragbar-gripper-border-width-vertical,4px) var(--spectrum-dragbar-gripper-border-width-horizontal,3px);content:"";display:block;height:var(
--spectrum-dragbar-gripper-height,var(--spectrum-global-dimension-static-size-200)
);position:absolute;top:50%;transform:translateY(-50%);width:var(
--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)
)}#splitter{height:100%;position:relative;-webkit-user-select:none;user-select:none;width:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
);z-index:1}:host([dir=ltr]) #splitter.is-collapsed-end #gripper:before,:host([dir=ltr]) #splitter.is-collapsed-start #gripper:before{left:calc(50% - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
)/2)}:host([dir=rtl]) #splitter.is-collapsed-end #gripper:before,:host([dir=rtl]) #splitter.is-collapsed-start #gripper:before{right:calc(50% - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
)/2)}#splitter.is-collapsed-end #gripper:before,#splitter.is-collapsed-start #gripper:before{content:"";height:100%;position:absolute;top:0;width:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
)}:host([dir=ltr]) #splitter.is-collapsed-start #gripper{left:0}:host([dir=rtl]) #splitter.is-collapsed-start #gripper{right:0}:host([dir=ltr]) #splitter.is-collapsed-end #gripper{right:0}:host([dir=rtl]) #splitter.is-collapsed-end #gripper{left:0}:host([dir=ltr]) #splitter.is-collapsed-end #gripper{left:auto}:host([dir=rtl]) #splitter.is-collapsed-end #gripper{right:auto}:host([vertical]){flex-direction:column}:host([vertical]) ::slotted(*){height:auto;width:var(--spectrum-splitview-vertical-width)}:host([dir=ltr][vertical]) #gripper{left:var(
--spectrum-splitview-vertical-gripper-width
)}:host([dir=rtl][vertical]) #gripper{right:var(
--spectrum-splitview-vertical-gripper-width
)}:host([vertical]) #gripper{border-width:var(--spectrum-dragbar-gripper-border-width-horizontal,3px) var(--spectrum-dragbar-gripper-border-width-vertical,4px);height:var(
--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)
);top:calc((var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1);transform:translate(calc(var(--spectrum-splitview-vertical-gripper-width)*-1));width:var(
--spectrum-dragbar-gripper-height,var(--spectrum-global-dimension-static-size-200)
)}:host([vertical]) #splitter{height:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
);width:var(
--spectrum-splitview-vertical-width
)}:host([dir=ltr][vertical]) #splitter.is-collapsed-end #gripper,:host([dir=ltr][vertical]) #splitter.is-collapsed-start #gripper{left:var(
--spectrum-splitview-vertical-gripper-width
)}:host([dir=rtl][vertical]) #splitter.is-collapsed-end #gripper,:host([dir=rtl][vertical]) #splitter.is-collapsed-start #gripper{right:var(
--spectrum-splitview-vertical-gripper-width
)}:host([dir=ltr][vertical]) #splitter.is-collapsed-end #gripper:before,:host([dir=ltr][vertical]) #splitter.is-collapsed-start #gripper:before{left:var(
--spectrum-splitview-vertical-gripper-reset
)}:host([dir=rtl][vertical]) #splitter.is-collapsed-end #gripper:before,:host([dir=rtl][vertical]) #splitter.is-collapsed-start #gripper:before{right:var(
--spectrum-splitview-vertical-gripper-reset
)}:host([vertical]) #splitter.is-collapsed-end #gripper:before,:host([vertical]) #splitter.is-collapsed-start #gripper:before{height:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
);top:calc(var(--spectrum-splitview-vertical-gripper-width) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
)/2);width:var(--spectrum-splitview-vertical-gripper-outer-width)}:host([vertical]) #splitter.is-collapsed-start #gripper{top:var(
--spectrum-splitview-vertical-gripper-reset
)}:host([vertical]) #splitter.is-collapsed-end #gripper{bottom:var(--spectrum-splitview-vertical-gripper-reset);top:auto}::slotted(*){background-color:var(
--spectrum-panel-s-background-color,var(--spectrum-alias-toolbar-background-color)
)}#splitter{background-color:var(
--spectrum-dragbar-handle-background-color,var(--spectrum-global-color-gray-300)
)}#gripper{border-color:var(
--spectrum-dragbar-handle-background-color,var(--spectrum-global-color-gray-300)
)}#gripper:before{background-color:var(
--spectrum-dragbar-handle-background-color,var(--spectrum-global-color-gray-300)
)}:host([resizable]) #splitter.is-hovered,:host([resizable]) #splitter:hover{background-color:var(
--spectrum-dragbar-handle-background-color-hover,var(--spectrum-global-color-gray-400)
)}:host([resizable]) #splitter.is-hovered #gripper,:host([resizable]) #splitter:hover #gripper{border-color:var(
--spectrum-dragbar-handle-background-color-hover,var(--spectrum-global-color-gray-400)
)}:host([resizable]) #splitter.is-hovered #gripper:before,:host([resizable]) #splitter:hover #gripper:before{background-color:var(
--spectrum-dragbar-handle-background-color-hover,var(--spectrum-global-color-gray-400)
)}:host([resizable]) #splitter.is-active,:host([resizable]) #splitter:active{background-color:var(
--spectrum-dragbar-handle-background-color-down,var(--spectrum-global-color-gray-800)
)}:host([resizable]) #splitter.is-active #gripper,:host([resizable]) #splitter:active #gripper{border-color:var(
--spectrum-dragbar-handle-background-color-down,var(--spectrum-global-color-gray-800)
)}:host([resizable]) #splitter.is-active #gripper:before,:host([resizable]) #splitter:active #gripper:before{background-color:var(
--spectrum-dragbar-handle-background-color-down,var(--spectrum-global-color-gray-800)
)}:host([resizable]) #splitter:focus{outline:none}:host([resizable]) #splitter.focus-visible{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter.focus-visible{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter:focus-visible{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter.focus-visible #gripper{border-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400))}:host([resizable]) #splitter.focus-visible #gripper{border-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400))}:host([resizable]) #splitter:focus-visible #gripper{border-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400))}:host([resizable]) #splitter.focus-visible #gripper:before{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter.focus-visible #gripper:before{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter:focus-visible #gripper:before{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#gripper{touch-action:none}#splitter{height:auto;order:2}:host([resizable]) #splitter{background-clip:content-box;cursor:ew-resize;margin:0 calc(var(--spectrum-global-dimension-static-size-125)*-1);padding:0 var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter{background-clip:content-box;cursor:ns-resize;margin:calc(var(--spectrum-global-dimension-static-size-125)*-1) 0;padding:var(--spectrum-global-dimension-static-size-125) 0}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-end,:host([resizable][collapsible]) #splitter.is-resized-start{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-end,:host([vertical][resizable][collapsible]) #splitter.is-resized-start{cursor:ns-resize}:host([dir=ltr][resizable]) #gripper{left:calc(var(--spectrum-global-dimension-static-size-125) + (var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}:host([dir=rtl][resizable]) #gripper{right:calc(var(--spectrum-global-dimension-static-size-125) + (var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}:host([vertical][resizable]) #gripper{left:50%;margin-top:var(--spectrum-global-dimension-static-size-125);right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-start #gripper{left:var(--spectrum-global-dimension-static-size-125)}:host([dir=rtl][resizable]) #splitter.is-collapsed-start #gripper{right:var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter.is-collapsed-start #gripper{left:50%;right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-end #gripper{left:var(--spectrum-global-dimension-static-size-25)}:host([dir=rtl][resizable]) #splitter.is-collapsed-end #gripper{right:var(--spectrum-global-dimension-static-size-25)}:host([vertical][resizable]) #splitter.is-collapsed-end #gripper{left:50%;margin-top:0;right:50%;top:var(--spectrum-global-dimension-static-size-25)}
`,ki=Object.defineProperty,yi=Object.getOwnPropertyDescriptor,wi=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?yi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&ki(e,r,s),s};class zi extends i{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=3840,this.secondaryMin=0,this.secondaryMax=3840,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=3840;const t=window.ResizeObserver;t&&(this.observer=new t((()=>{this.rect=void 0,this.updateMinMax()})))}static get styles(){return[fi]}connectedCallback(){var t;super.connectedCallback(),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){const t={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)};return s`
            <slot
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?s`
                      <div
                          id="splitter"
                          class=${F(t)}
                          role="separator"
                          aria-label=${y(this.label||void 0)}
                          tabindex=${y(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${ke({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?s`
                                    <div id="gripper"></div>
                                `:s``}
                      </div>
                  `:c}
        `}onContentSlotChange(){this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(t){!this.resizable||t.button&&0!==t.button?t.preventDefault():(this.splitter.setPointerCapture(t.pointerId),this.offset=this.getOffset())}onPointermove(t){t.preventDefault();let e=this.vertical||this.isLTR?this.getPosition(t)-this.offset:this.offset-this.getPosition(t);this.collapsible&&e<this.minPos-50&&(e=0),this.collapsible&&e>this.maxPos+50&&(e=this.viewSize-this.splitterSize),this.updatePosition(e)}onPointerup(t){this.splitter.releasePointerCapture(t.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const t=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:t}getPosition(t){return this.vertical?t.clientY:t.clientX}movePosition(t,e){t.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+e)}onKeydown(t){if(!this.resizable)return;let e=0;const r=this.isLTR||this.vertical;switch(t.key){case"Home":return t.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return t.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":e=r?-1:1;break;case"ArrowRight":e=r?1:-1;break;case"ArrowUp":case"PageUp":e=this.vertical?-1:1;break;case"ArrowDown":case"PageDown":e=this.vertical?1:-1}if(0!==e){const r=t.key.startsWith("Page")?50:10;this.movePosition(t,r*e)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const t=await this.calcStartPos();this.updatePosition(t)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(t){let e=this.getLimitedPosition(t);this.collapsible&&t<=0&&(e=0),this.collapsible&&t>this.maxPos&&t>=this.viewSize-this.splitterSize&&(e=this.viewSize-this.splitterSize),e!==this.splitterPos&&(this.splitterPos=e,this.dispatchChangeEvent())}getLimitedPosition(t){return t<=this.minPos?this.minPos:t>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,t))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const t=this.paneSlot.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement));if(void 0!==t.updateComplete&&await t.updateComplete,t){const e=window.getComputedStyle(t).getPropertyValue(this.vertical?"height":"width"),r=parseFloat(e);if(!isNaN(r))return this.getLimitedPosition(Math.ceil(r))}}return this.viewSize/2}dispatchChangeEvent(){const t=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(t)}willUpdate(t){(!this.hasUpdated||t.has("primarySize"))&&(this.splitterPos=void 0,this.checkResize()),t.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}wi([a({type:Boolean,reflect:!0})],zi.prototype,"vertical",2),wi([a({type:Boolean,reflect:!0})],zi.prototype,"resizable",2),wi([a({type:Boolean,reflect:!0})],zi.prototype,"collapsible",2),wi([a({type:Number,attribute:"primary-min"})],zi.prototype,"primaryMin",2),wi([a({type:Number,attribute:"primary-max"})],zi.prototype,"primaryMax",2),wi([a({type:String,attribute:"primary-size"})],zi.prototype,"primarySize",2),wi([a({type:Number,attribute:"secondary-min"})],zi.prototype,"secondaryMin",2),wi([a({type:Number,attribute:"secondary-max"})],zi.prototype,"secondaryMax",2),wi([a({type:Number,reflect:!0,attribute:"splitter-pos"})],zi.prototype,"splitterPos",2),wi([a({type:String,attribute:!1})],zi.prototype,"firstPaneSize",2),wi([a()],zi.prototype,"label",2),wi([a({type:Boolean,attribute:!1})],zi.prototype,"enoughChildren",2),wi([a({type:Number})],zi.prototype,"viewSize",2),wi([z("slot")],zi.prototype,"paneSlot",2),wi([z("#splitter")],zi.prototype,"splitter",2),customElements.define("sp-split-view",zi);var xi=r`
:host([dir]){--spectrum-statuslight-corner-radius:50%;--spectrum-statuslight-font-weight:400;--spectrum-statuslight-border-width:var(--spectrum-border-width-100);--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-medium
);--spectrum-statuslight-line-height:var(--spectrum-line-height-100);--spectrum-statuslight-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-100
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-medium
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-100
);--spectrum-statuslight-content-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-statuslight-subdued-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-statuslight-semantic-neutral-color:var(
--spectrum-neutral-visual-color
);--spectrum-statuslight-semantic-accent-color:var(
--spectrum-accent-visual-color
);--spectrum-statuslight-semantic-negative-color:var(
--spectrum-negative-visual-color
);--spectrum-statuslight-semantic-info-color:var(
--spectrum-informative-visual-color
);--spectrum-statuslight-semantic-notice-color:var(
--spectrum-notice-visual-color
);--spectrum-statuslight-semantic-positive-color:var(
--spectrum-positive-visual-color
);--spectrum-statuslight-nonsemantic-gray-color:var(
--spectrum-gray-visual-color
);--spectrum-statuslight-nonsemantic-red-color:var(
--spectrum-red-visual-color
);--spectrum-statuslight-nonsemantic-orange-color:var(
--spectrum-orange-visual-color
);--spectrum-statuslight-nonsemantic-yellow-color:var(
--spectrum-yellow-visual-color
);--spectrum-statuslight-nonsemantic-chartreuse-color:var(
--spectrum-chartreuse-visual-color
);--spectrum-statuslight-nonsemantic-celery-color:var(
--spectrum-celery-visual-color
);--spectrum-statuslight-nonsemantic-green-color:var(
--spectrum-green-visual-color
);--spectrum-statuslight-nonsemantic-seafoam-color:var(
--spectrum-seafoam-visual-color
);--spectrum-statuslight-nonsemantic-cyan-color:var(
--spectrum-cyan-visual-color
);--spectrum-statuslight-nonsemantic-blue-color:var(
--spectrum-blue-visual-color
);--spectrum-statuslight-nonsemantic-indigo-color:var(
--spectrum-indigo-visual-color
);--spectrum-statuslight-nonsemantic-purple-color:var(
--spectrum-purple-visual-color
);--spectrum-statuslight-nonsemantic-fuchsia-color:var(
--spectrum-fuchsia-visual-color
);--spectrum-statuslight-nonsemantic-magenta-color:var(
--spectrum-magenta-visual-color
)}:host([size=s]){--spectrum-statuslight-height:var(
--spectrum-component-height-75
);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-small
);--spectrum-statuslight-font-size:var(--spectrum-font-size-75);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-75
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-small
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-75
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-75
)}:host([size=m]){--spectrum-statuslight-height:var(
--spectrum-component-height-100
);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-medium
);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-100
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-medium
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-100
)}:host([size=l]){--spectrum-statuslight-height:var(
--spectrum-component-height-200
);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-large
);--spectrum-statuslight-font-size:var(--spectrum-font-size-200);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-200
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-large
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-200
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-200
)}:host([size=xl]){--spectrum-statuslight-height:var(
--spectrum-component-height-300
);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-extra-large
);--spectrum-statuslight-font-size:var(--spectrum-font-size-300);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-300
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-extra-large
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-300
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-300
)}@media (forced-colors:active){:host([dir]){--highcontrast-statuslight-content-color-default:CanvasText;--highcontrast-statuslight-subdued-content-color-default:CanvasText;forced-color-adjust:none}:host:before{border:var(
--mod-statuslight-border-width,var(--spectrum-statuslight-border-width)
) solid ButtonText}}:host([dir]){align-items:flex-start;box-sizing:border-box;color:var(
--highcontrast-statuslight-content-color-default,var(
--mod-statuslight-content-color-default,var(--spectrum-statuslight-content-color-default)
)
);display:flex;flex-direction:row;font-size:var(
--mod-statuslight-font-size,var(--spectrum-statuslight-font-size)
);font-weight:var(
--mod-statuslight-font-weight,var(--spectrum-statuslight-font-weight)
);line-height:var(
--mod-statuslight-line-height,var(--spectrum-statuslight-line-height)
);min-height:var(
--mod-statuslight-height,var(--spectrum-statuslight-height)
);padding-block-end:var(
--mod-statuslight-spacing-bottom-to-label,var(--spectrum-statuslight-spacing-bottom-to-label)
);padding-block-start:var(
--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label)
);padding-inline:0}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-statuslight-line-height-cjk,var(--spectrum-statuslight-line-height-cjk)
)}:host:before{--spectrum-statuslight-spacing-computed-top-to-dot:calc(var(
--mod-statuslight-spacing-top-to-dot,
var(--spectrum-statuslight-spacing-top-to-dot)
) - var(
--mod-statuslight-spacing-top-to-label,
var(--spectrum-statuslight-spacing-top-to-label)
));-ms-high-contrast-adjust:none;block-size:var(
--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size)
);border-radius:var(
--mod-statuslight-corner-radius,var(--spectrum-statuslight-corner-radius)
);content:"";display:inline-block;flex-grow:0;flex-shrink:0;forced-color-adjust:none;inline-size:var(
--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size)
);margin-block-start:var(--spectrum-statuslight-spacing-computed-top-to-dot);margin-inline-end:var(
--mod-statuslight-spacing-dot-to-label,var(--spectrum-statuslight-spacing-dot-to-label)
)}:host([variant=neutral]){font-style:italic}:host([variant=neutral]){color:var(
--highcontrast-statuslight-subdued-content-color-default,var(
--mod-statuslight-subdued-content-color-default,var(--spectrum-statuslight-subdued-content-color-default)
)
)}:host([variant=neutral]):before{background-color:var(
--mod-statuslight-semantic-neutral-color,var(--spectrum-statuslight-semantic-neutral-color)
)}.spectrum-StatusLight--accent:before{background-color:var(
--mod-statuslight-semantic-accent-color,var(--spectrum-statuslight-semantic-accent-color)
)}:host([variant=info]):before{background-color:var(
--mod-statuslight-semantic-info-color,var(--spectrum-statuslight-semantic-info-color)
)}:host([variant=negative]):before{background-color:var(
--mod-statuslight-semantic-negative-color,var(--spectrum-statuslight-semantic-negative-color)
)}:host([variant=notice]):before{background-color:var(
--mod-statuslight-semantic-notice-color,var(--spectrum-statuslight-semantic-notice-color)
)}:host([variant=positive]):before{background-color:var(
--mod-statuslight-semantic-positive-color,var(--spectrum-statuslight-semantic-positive-color)
)}.spectrum-StatusLight--gray:before{background-color:var(
--mod-statuslight-nonsemantic-gray-color,var(--spectrum-statuslight-nonsemantic-gray-color)
)}.spectrum-StatusLight--red:before{background-color:var(
--mod-statuslight-nonsemantic-red-color,var(--spectrum-statuslight-nonsemantic-red-color)
)}.spectrum-StatusLight--orange:before{background-color:var(
--mod-statuslight-nonsemantic-orange-color,var(--spectrum-statuslight-nonsemantic-orange-color)
)}:host([variant=yellow]):before{background-color:var(
--mod-statuslight-nonsemantic-yellow-color,var(--spectrum-statuslight-nonsemantic-yellow-color)
)}:host([variant=chartreuse]):before{background-color:var(
--mod-statuslight-nonsemantic-chartreuse-color,var(--spectrum-statuslight-nonsemantic-chartreuse-color)
)}:host([variant=celery]):before{background-color:var(
--mod-statuslight-nonsemantic-celery-color,var(--spectrum-statuslight-nonsemantic-celery-color)
)}.spectrum-StatusLight--green:before{background-color:var(
--mod-statuslight-nonsemantic-green-color,var(--spectrum-statuslight-nonsemantic-green-color)
)}:host([variant=seafoam]):before{background-color:var(
--mod-statuslight-nonsemantic-seafoam-color,var(--spectrum-statuslight-nonsemantic-seafoam-color)
)}.spectrum-StatusLight--cyan:before{background-color:var(
--mod-statuslight-nonsemantic-cyan-color,var(--spectrum-statuslight-nonsemantic-cyan-color)
)}.spectrum-StatusLight--blue:before{background-color:var(
--mod-statuslight-nonsemantic-blue-color,var(--spectrum-statuslight-nonsemantic-blue-color)
)}:host([variant=indigo]):before{background-color:var(
--mod-statuslight-nonsemantic-indigo-color,var(--spectrum-statuslight-nonsemantic-indigo-color)
)}:host([variant=purple]):before{background-color:var(
--mod-statuslight-nonsemantic-purple-color,var(--spectrum-statuslight-nonsemantic-purple-color)
)}:host([variant=fuchsia]):before{background-color:var(
--mod-statuslight-nonsemantic-fuchsia-color,var(--spectrum-statuslight-nonsemantic-fuchsia-color)
)}:host([variant=magenta]):before{background-color:var(
--mod-statuslight-nonsemantic-magenta-color,var(--spectrum-statuslight-nonsemantic-magenta-color)
)}:host([disabled]):before{background-color:var(
--spectrum-statuslight-dot-color-disabled,var(--spectrum-global-color-gray-400)
)}
`,Pi=Object.defineProperty,Ci=Object.getOwnPropertyDescriptor,Bi=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Ci(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Pi(e,r,s),s};class Si extends(f(i)){constructor(){super(...arguments),this.disabled=!1,this.variant="info"}static get styles(){return[xi]}render(){return s`
            <slot></slot>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Bi([a({type:Boolean,reflect:!0})],Si.prototype,"disabled",2),Bi([a({reflect:!0})],Si.prototype,"variant",2),customElements.define("sp-status-light",Si);var Ti=r`
:host{--spectrum-switch-label-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-switch-label-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-switch-label-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-switch-label-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-switch-label-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-switch-background-color:var(--spectrum-gray-300);--spectrum-switch-background-color-disabled:var(--spectrum-gray-300);--spectrum-switch-background-color-selected-disabled:var(
--spectrum-gray-400
);--spectrum-switch-focus-indicator-thickness:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
);--spectrum-switch-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-switch-handle-background-color:var(--spectrum-gray-75);--spectrum-switch-handle-border-color-disabled:var(--spectrum-gray-400)}.spectrum-Switch--disabled{--spectrum-switch-label-color-default:var(
--spectrum-disabled-content-color
)}:host([emphasized]){--spectrum-switch-background-color-selected-default:var(
--spectrum-accent-color-900
);--spectrum-switch-background-color-selected-hover:var(
--spectrum-accent-color-1000
);--spectrum-switch-background-color-selected-down:var(
--spectrum-accent-color-1100
);--spectrum-switch-background-color-selected-focus:var(
--spectrum-accent-color-1000
);--spectrum-switch-handle-border-color-selected-default:var(
--spectrum-accent-color-900
);--spectrum-switch-handle-border-color-selected-hover:var(
--spectrum-accent-color-1000
);--spectrum-switch-handle-border-color-selected-down:var(
--spectrum-accent-color-1100
);--spectrum-switch-handle-border-color-selected-focus:var(
--spectrum-accent-color-1000
)}:host([size=s]){--spectrum-switch-min-height:var(
--spectrum-component-height-75
);--spectrum-switch-control-width:var(--spectrum-switch-control-width-small);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-small
);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-75);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-small
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-75
);--spectrum-switch-font-size:var(--spectrum-font-size-75)}:host([size=m]){--spectrum-switch-min-height:var(
--spectrum-component-height-100
);--spectrum-switch-control-width:var(
--spectrum-switch-control-width-medium
);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-medium
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-100
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-medium
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-switch-font-size:var(--spectrum-font-size-100)}:host([size=l]){--spectrum-switch-min-height:var(
--spectrum-component-height-200
);--spectrum-switch-control-width:var(--spectrum-switch-control-width-large);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-large
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-200
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-large
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-200
);--spectrum-switch-font-size:var(--spectrum-font-size-200)}:host([size=xl]){--spectrum-switch-min-height:var(
--spectrum-component-height-300
);--spectrum-switch-control-width:var(
--spectrum-switch-control-width-extra-large
);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-extra-large
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-300
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-extra-large
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-300
);--spectrum-switch-font-size:var(--spectrum-font-size-300)}:host{align-items:flex-start;display:inline-flex;max-inline-size:100%;min-block-size:var(--mod-switch-height,var(--spectrum-switch-min-height));position:relative;vertical-align:top}#input{block-size:100%;box-sizing:border-box;cursor:pointer;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;padding:0;position:absolute;z-index:1}:host([dir=ltr][checked]) #input+#switch:before{transform:translateX(calc(var(
--mod-switch-control-width,
var(--spectrum-switch-control-width)
) - 100%))}:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc((var(
--mod-switch-control-width,
var(--spectrum-switch-control-width)
) - 100%)*-1))}#input[disabled],:host([disabled]) #input{cursor:default}#input.focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#input.focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#input:focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#label{color:var(
--highcontrast-switch-label-color-default,var(
--mod-switch-label-color-default,var(--spectrum-switch-label-color-default)
)
);font-size:var(--mod-switch-font-size,var(--spectrum-switch-font-size));line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin-block-end:0;margin-block-start:var(
--mod-switch-spacing-top-to-label,var(--spectrum-switch-spacing-top-to-label)
);margin-inline:var(
--mod-switch-control-label-spacing,var(--spectrum-switch-control-label-spacing)
);transition:color var(
--mod-animation-duration-200,var(--spectrum-animation-duration-200)
) ease-in-out}#switch{block-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height))/2);box-sizing:border-box;display:inline-block;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-switch-control-width,var(--spectrum-switch-control-width)
);inset-inline-end:0;inset-inline-start:0;margin-block:calc(var(--mod-switch-height, var(--spectrum-switch-min-height)) - var(
--mod-switch-control-height,
var(--spectrum-switch-control-height)
) - var(
--mod-switch-spacing-top-to-control,
var(--spectrum-switch-spacing-top-to-control)
));margin-inline:0;position:relative;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,border var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;vertical-align:middle}#switch:before{box-sizing:border-box;content:"";display:block;position:absolute}#switch:before{block-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height))/2);border-style:solid;border-width:var(--mod-border-width-200,var(--spectrum-border-width-200));inline-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);inset-block-start:0;inset-inline-start:0;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,border var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,transform var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out}#switch:after{border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap)));content:"";display:block;inset-block-end:0;inset-block-start:0;inset-inline-end:0;inset-inline-start:0;margin:0;position:absolute;transition:opacity var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,margin var(
--spectrum-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out}#switch{background-color:var(
--highcontrast-switch-background-color,var(
--mod-switch-background-color,var(--spectrum-switch-background-color)
)
)}#switch:before{background-color:var(
--highcontrast-switch-handle-background-color,var(
--mod-switch-handle-background-color,var(--spectrum-switch-handle-background-color)
)
);border-color:var(
--highcontrast-switch-handle-border-color-default,var(
--mod-switch-handle-border-color-default,var(--spectrum-switch-handle-border-color-default)
)
)}:host(:hover) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-hover,var(
--mod-switch-handle-border-color-hover,var(--spectrum-switch-handle-border-color-hover)
)
);box-shadow:none}:host(:hover) #input~#label{color:var(
--highcontrast-switch-label-color-hover,var(
--mod-switch-label-color-hover,var(--spectrum-switch-label-color-hover)
)
)}:host(:hover[checked]) #input:enabled+#switch{background-color:var(
--highcontrast-switch-background-color-selected-hover,var(
--mod-switch-background-color-selected-hover,var(--spectrum-switch-background-color-selected-hover)
)
)}:host(:hover[checked]) #input:enabled+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-hover,var(
--mod-switch-handle-border-color-selected-hover,var(--spectrum-switch-handle-border-color-selected-hover)
)
)}:host(:hover) #input[disabled]+#switch,:host(:hover[disabled]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-disabled,var(
--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)
)
)}:host(:hover) #input[disabled]+#switch:before,:host(:hover[disabled]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host(:hover) #input[disabled]~#label,:host(:hover[disabled]) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}:host(:hover[checked]) #input[disabled]+#switch,:host(:hover[disabled][checked]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-disabled,var(
--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)
)
)}:host(:hover[checked]) #input[disabled]+#switch:before,:host(:hover[disabled][checked]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host(:hover[checked]) #input[disabled]~#label,:host(:hover[disabled][checked]) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}:host(:active) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-down,var(
--mod-switch-handle-border-color-down,var(--spectrum-switch-handle-border-color-down)
)
)}:host(:active) #input~#label{color:var(
--highcontrast-switch-label-color-down,var(
--mod-switch-label-color-down,var(--spectrum-switch-label-color-down)
)
)}:host(:active[checked]) #input:enabled+#switch{background-color:var(
--highcontrast-switch-background-color-selected-down,var(
--mod-switch-background-color-selected-down,var(--spectrum-switch-background-color-selected-down)
)
)}:host(:active[checked]) #input:enabled+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-down,var(
--mod-switch-handle-border-color-selected-down,var(--spectrum-switch-handle-border-color-selected-down)
)
)}#input.focus-visible+#switch:after,:host(:hover) #input.focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}#input.focus-visible+#switch:after,:host(:hover) #input.focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}#input:focus-visible+#switch:after,:host(:hover) #input:focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}#input.focus-visible+#switch:before,:host(:hover) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}#input.focus-visible+#switch:before,:host(:hover) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}#input:focus-visible+#switch:before,:host(:hover) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}:host(:hover[checked]) #input.focus-visible+#switch,:host([checked]) #input.focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host(:hover[checked]) #input.focus-visible+#switch,:host([checked]) #input.focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host(:hover[checked]) #input:focus-visible+#switch,:host([checked]) #input:focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host(:hover[checked]) #input.focus-visible+#switch:before,:host([checked]) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}:host(:hover[checked]) #input.focus-visible+#switch:before,:host([checked]) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}:host(:hover[checked]) #input:focus-visible+#switch:before,:host([checked]) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}#input.focus-visible~#label,:host(:hover) #input.focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}#input.focus-visible~#label,:host(:hover) #input.focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}#input:focus-visible~#label,:host(:hover) #input:focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}:host([checked]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-default,var(
--mod-switch-background-color-selected-default,var(--spectrum-switch-background-color-selected-default)
)
)}:host([checked]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-default,var(
--mod-switch-handle-border-color-selected-default,var(--spectrum-switch-handle-border-color-selected-default)
)
)}#input[disabled]+#switch,:host([disabled]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-disabled,var(
--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)
)
)}#input[disabled]+#switch:before,:host([disabled]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}#input[disabled]~#label,:host([disabled]) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}:host([checked]) #input[disabled]+#switch,:host([disabled][checked]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-disabled,var(
--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)
)
)}:host([checked]) #input[disabled]+#switch:before,:host([disabled][checked]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host([checked]) #input[disabled]~#label,:host([disabled][checked]) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}@media (forced-colors:active){:host{--highcontrast-switch-label-color-default:ButtonText;--highcontrast-switch-label-color-hover:ButtonText;--highcontrast-switch-label-color-down:ButtonText;--highcontrast-switch-label-color-focus:ButtonText;--highcontrast-switch-label-color-disabled:GrayText;--highcontrast-switch-handle-background-color:ButtonFace;--highcontrast-switch-handle-border-color-default:ButtonText;--highcontrast-switch-handle-border-color-focus:Highlight;--highcontrast-switch-handle-border-color-disabled:Highlight;--highcontrast-switch-handle-border-color-selected-default:Highlight;--highcontrast-switch-handle-border-color-selected-hover:Highlight;--highcontrast-switch-handle-border-color-selected-down:Highlight;--highcontrast-switch-handle-border-color-selected-focus:Highlight;--highcontrast-switch-background-color:ButtonFace;--highcontrast-switch-background-color-selected-default:Highlight;--highcontrast-switch-background-color-selected-hover:Highlight;--highcontrast-switch-background-color-selected-down:Highlight;--highcontrast-switch-background-color-selected-focus:Highlight;--highcontrast-switch-background-color-selected-disabled:Highlight;--highcontrast-switch-handle-border-color-hover:Highlight;--highcontrast-switch-handle-border-color-down:Highlight;--highcontrast-switch-focus-indicator-color:ButtonText;forced-color-adjust:none}#input:not([checked])+#switch{box-shadow:inset 0 0 0 1px ButtonText}:host(:hover) #input:not([checked])+#switch{box-shadow:inset 0 0 0 1px Highlight}:host(:hover[checked]) #input[disabled]+#switch,:host(:hover[disabled][checked]) #input+#switch{background-color:GrayText;box-shadow:inset 0 0 0 1px GrayText}:host(:hover[checked]) #input[disabled]+#switch:before,:host(:hover[disabled][checked]) #input+#switch:before{background-color:ButtonFace;border-color:GrayText}#input[disabled]:not([checked])+#switch,:host([disabled]) #input:not([checked])+#switch{background-color:ButtonFace;box-shadow:inset 0 0 0 1px GrayText}#input[disabled]:not([checked])+#switch:before,:host([disabled]) #input:not([checked])+#switch:before{background-color:ButtonFace;border-color:GrayText}:host([checked]) #input[disabled]+#switch,:host([disabled][checked][dir]) #input+#switch{background-color:GrayText;box-shadow:inset 0 0 0 1px GrayText}:host([checked]) #input[disabled]+#switch:before,:host([disabled][checked][dir]) #input+#switch:before{background-color:ButtonFace;border-color:GrayText}#input[disabled]~#label,:host([disabled]) #input~#label{color:GrayText}}:host{--spectrum-switch-background-color-selected-default:var(
--system-spectrum-switch-background-color-selected-default
);--spectrum-switch-background-color-selected-hover:var(
--system-spectrum-switch-background-color-selected-hover
);--spectrum-switch-background-color-selected-down:var(
--system-spectrum-switch-background-color-selected-down
);--spectrum-switch-background-color-selected-focus:var(
--system-spectrum-switch-background-color-selected-focus
);--spectrum-switch-handle-border-color-default:var(
--system-spectrum-switch-handle-border-color-default
);--spectrum-switch-handle-border-color-hover:var(
--system-spectrum-switch-handle-border-color-hover
);--spectrum-switch-handle-border-color-down:var(
--system-spectrum-switch-handle-border-color-down
);--spectrum-switch-handle-border-color-focus:var(
--system-spectrum-switch-handle-border-color-focus
);--spectrum-switch-handle-border-color-selected-default:var(
--system-spectrum-switch-handle-border-color-selected-default
);--spectrum-switch-handle-border-color-selected-hover:var(
--system-spectrum-switch-handle-border-color-selected-hover
);--spectrum-switch-handle-border-color-selected-down:var(
--system-spectrum-switch-handle-border-color-selected-down
);--spectrum-switch-handle-border-color-selected-focus:var(
--system-spectrum-switch-handle-border-color-selected-focus
)}:host([disabled]){pointer-events:none}
`;var $i=r`
#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}
`,qi=Object.defineProperty,Ei=Object.getOwnPropertyDescriptor;class Li extends(f(L)){constructor(){super(...arguments),this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[Ti,$i]:[Ti]}render(){return s`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("role","switch")}updated(t){t.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Ei(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&qi(e,r,s)})([a({type:Boolean,reflect:!0})],Li.prototype,"emphasized",2),customElements.define("sp-switch",Li);var Oi=r`
:host{--sp-tabs-overflow-next-button-right:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-previous-button-left:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-button-size:var(
--spectrum-global-dimension-static-size-500
);--sp-tabs-overflow-button-height:var(--spectrum-global-dimension-size-500);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;inset:0;width:100%}:host([size=s]){--sp-tabs-overflow-button-height:var(--spectrum-global-dimension-size-500)}:host([size=m]){--sp-tabs-overflow-button-height:var(--spectrum-global-dimension-size-600)}:host([size=l]){--sp-tabs-overflow-button-height:var(--spectrum-global-dimension-size-700)}:host([size=xl]){--sp-tabs-overflow-button-height:var(--spectrum-global-dimension-size-800)}sp-action-button{background:transparent;border:none;box-shadow:none;height:var(--sp-tabs-overflow-button-height);position:absolute;text-align:center;width:var(--sp-tabs-overflow-button-size);z-index:2}sp-action-button.left-scroll{inset-inline-end:var(--sp-tabs-overflow-previous-button-left);visibility:hidden}sp-action-button.right-scroll{inset-inline-end:var(--sp-tabs-overflow-next-button-right);visibility:hidden}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:after,.tabs-overflow-container:before{content:"";height:var(--sp-tabs-overflow-button-height);inset-block-start:0;pointer-events:none;position:absolute;visibility:hidden;width:var(--sp-tabs-overflow-shadow-width);z-index:1}.tabs-overflow-container:before{background:var(--spectrum-alias-background-color-transparent) linear-gradient(270deg,var(--spectrum-alias-background-color-transparent),var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;inset-inline-start:0}.tabs-overflow-container:after{background:var(--spectrum-alias-background-color-transparent) linear-gradient(90deg,var(--spectrum-alias-background-color-transparent),var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;inset-inline-end:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`,Ai=Object.defineProperty,Mi=Object.getOwnPropertyDescriptor,Di=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Mi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Ai(e,r,s),s};class Hi extends(f(i)){constructor(){super(),this.overflowState={canScrollLeft:!1,canScrollRight:!1},this.resizeController=new V(this,{target:this,callback:()=>{this._updateScrollState()}})}static get styles(){return[Oi,C]}firstUpdated(t){var e;super.firstUpdated(t),null==(e=this.scrollContent[0])||e.setAttribute("enableTabsScroll",""),this.resizeController.observe(this.overflowContainer)}async _handleSlotChange(){const[t]=this.scrollContent;await(null==t?void 0:t.updateComplete),this._updateScrollState()}_updateScrollState(){const{scrollContent:t,overflowState:e}=this;if(t){const[t]=this.scrollContent,{canScrollLeft:r,canScrollRight:o}=(null==t?void 0:t.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...e,canScrollLeft:r,canScrollRight:o}}}_handleScrollClick(t){const e=t.currentTarget,[r]=this.scrollContent,o=.5*r.clientWidth,i=e.classList.contains("left-scroll")?-o:o;r.scrollTabs(i,"smooth")}render(){const{canScrollRight:t,canScrollLeft:e}=this.overflowState;return s`
            <div
                class=${F({"tabs-overflow-container":!0,"left-shadow":e,"right-shadow":t})}
            >
                <sp-action-button
                    class=${F({"left-scroll":!0,show:e})}
                    quiet
                    dir="rtl"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${F({"right-scroll":!0,show:t})}
                    quiet
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `}}Di([U()],Hi.prototype,"overflowState",2),Di([d({selector:"sp-tabs",flatten:!0})],Hi.prototype,"scrollContent",2),Di([z(".tabs-overflow-container")],Hi.prototype,"overflowContainer",2),customElements.define("sp-tabs-overflow",Hi);var Ii=r`
:host{--spectrum-avatar-opacity-disabled:0.3;--spectrum-tag-animation-duration:var(--spectrum-animation-duration-100);--spectrum-tag-border-width:var(--spectrum-border-width-100);--spectrum-tag-focus-ring-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-tag-focus-ring-gap:var(--spectrum-focus-indicator-gap);--spectrum-tag-focus-ring-color:var(--spectrum-focus-indicator-color);--spectrum-tag-label-line-height:var(--spectrum-line-height-100);--spectrum-tag-label-font-weight:var(--spectrum-font-weight-regular);--spectrum-tag-content-color-selected:var(--spectrum-white);--spectrum-tag-border-color-invalid:var(--spectrum-negative-color-900);--spectrum-tag-border-color-invalid-hover:var(
--spectrum-negative-color-1000
);--spectrum-tag-border-color-invalid-active:var(
--spectrum-negative-color-1100
);--spectrum-tag-border-color-invalid-focus:var(
--spectrum-negative-color-1000
);--spectrum-tag-content-color-invalid:var(
--spectrum-negative-content-color-default
);--spectrum-tag-content-color-invalid-hover:var(
--spectrum-negative-content-color-hover
);--spectrum-tag-content-color-invalid-active:var(
--spectrum-negative-content-color-down
);--spectrum-tag-content-color-invalid-focus:var(
--spectrum-negative-content-color-key-focus
);--spectrum-tag-border-color-invalid-selected:var(
--spectrum-negative-background-color-default
);--spectrum-tag-border-color-invalid-selected-hover:var(
--spectrum-negative-background-color-hover
);--spectrum-tag-border-color-invalid-selected-focus:var(
--spectrum-negative-background-color-down
);--spectrum-tag-border-color-invalid-selected-active:var(
--spectrum-negative-background-color-key-focus
);--spectrum-tag-background-color-invalid-selected:var(
--spectrum-negative-background-color-default
);--spectrum-tag-background-color-invalid-selected-hover:var(
--spectrum-negative-background-color-hover
);--spectrum-tag-background-color-invalid-selected-active:var(
--spectrum-negative-background-color-down
);--spectrum-tag-background-color-invalid-selected-focus:var(
--spectrum-negative-background-color-key-focus
);--spectrum-tag-content-color-invalid-selected:var(--spectrum-white);--spectrum-tag-border-color-emphasized:var(
--spectrum-accent-background-color-default
);--spectrum-tag-border-color-emphasized-hover:var(
--spectrum-accent-background-color-hover
);--spectrum-tag-border-color-emphasized-active:var(
--spectrum-accent-background-color-down
);--spectrum-tag-border-color-emphasized-focus:var(
--spectrum-accent-background-color-key-focus
);--spectrum-tag-background-color-emphasized:var(
--spectrum-accent-background-color-default
);--spectrum-tag-background-color-emphasized-hover:var(
--spectrum-accent-background-color-hover
);--spectrum-tag-background-color-emphasized-active:var(
--spectrum-accent-background-color-down
);--spectrum-tag-background-color-emphasized-focus:var(
--spectrum-accent-background-color-key-focus
);--spectrum-tag-content-color-emphasized:var(--spectrum-white);--spectrum-tag-content-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-100);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-inline-end:var(
--spectrum-text-to-visual-100
);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-100
);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-100
);--spectrum-tag-height:var(--spectrum-component-height-100);--spectrum-tag-font-size:var(--spectrum-font-size-100);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-medium
)}:host([size=s]){--spectrum-tag-height:var(
--spectrum-component-height-75
);--spectrum-tag-font-size:var(--spectrum-font-size-75);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-75
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-small
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-75);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-small
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-small
);--spectrum-tag-avatar-spacing-inline-end:var(--spectrum-text-to-visual-75);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-75
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-small-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-small-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-small-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-small-clear-button-spacing-inline-end
)}:host([size=m]){--spectrum-tag-height:var(
--spectrum-component-height-100
);--spectrum-tag-font-size:var(--spectrum-font-size-100);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-100
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-medium
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-100);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-inline-end:var(
--spectrum-text-to-visual-100
);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-100
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-medium-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-medium-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-medium-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-medium-clear-button-spacing-inline-end
)}:host([size=l]){--spectrum-tag-height:var(
--spectrum-component-height-200
);--spectrum-tag-font-size:var(--spectrum-font-size-200);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-200
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-large
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-200);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-large
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-large
);--spectrum-tag-avatar-spacing-inline-end:var(
--spectrum-text-to-visual-200
);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-200
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-large-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-large-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-large-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-large-clear-button-spacing-inline-end
)}:host{align-items:center;background-color:var(
--highcontrast-tag-background-color,var(--mod-tag-background-color,var(--spectrum-tag-background-color))
);block-size:var(--mod-tag-height,var(--spectrum-tag-height));border-color:var(
--highcontrast-tag-border-color,var(--mod-tag-border-color,var(--spectrum-tag-border-color))
);border-radius:var(
--mod-tag-corner-radius,var(--spectrum-tag-corner-radius)
);border-style:solid;border-width:var(--mod-tag-border-width,var(--spectrum-tag-border-width));box-sizing:border-box;color:var(
--highcontrast-tag-content-color,var(--mod-tag-content-color,var(--spectrum-tag-content-color))
);display:inline-flex;max-inline-size:100%;outline:none;padding-inline-end:0;padding-inline-start:calc(var(
--mod-tag-spacing-inline-start,
var(--spectrum-tag-spacing-inline-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));position:relative;transition:border-color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,box-shadow var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,background-color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out;-webkit-user-select:none;user-select:none;vertical-align:bottom}::slotted([slot=icon]){block-size:var(
--mod-tag-icon-size,var(--spectrum-tag-icon-size)
);inline-size:var(--mod-tag-icon-size,var(--spectrum-tag-icon-size));margin-block-end:calc(var(
--mod-tag-icon-spacing-block-end,
var(--spectrum-tag-icon-spacing-block-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-block-start:calc(var(
--mod-tag-icon-spacing-block-start,
var(--spectrum-tag-icon-spacing-block-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-end:var(
--mod-tag-icon-spacing-inline-end,var(--spectrum-tag-icon-spacing-inline-end)
)}::slotted([slot=avatar]){margin-block-end:calc(var(
--mod-tag-avatar-spacing-block-end,
var(--spectrum-tag-avatar-spacing-block-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-block-start:calc(var(
--mod-tag-avatar-spacing-block-start,
var(--spectrum-tag-avatar-spacing-block-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-end:var(
--mod-tag-avatar-spacing-inline-end,var(--spectrum-tag-avatar-spacing-inline-end)
)}.clear-button{--spectrum-clearbutton-fill-size:fit-content;--spectrum-clearbutton-fill-background-color:transparent;box-sizing:border-box;color:currentcolor;margin-inline-end:calc(var(
--mod-tag-clear-button-spacing-inline-end,
var(--spectrum-tag-clear-button-spacing-inline-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-start:calc(var(
--mod-tag-clear-button-spacing-inline-start,
var(--spectrum-tag-clear-button-spacing-inline-start)
) + var(
--mod-tag-label-spacing-inline-end,
var(--spectrum-tag-label-spacing-inline-end)
)*-1);padding-block-end:calc(var(
--mod-tag-clear-button-spacing-block,
var(--spectrum-tag-clear-button-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));padding-block-start:calc(var(
--mod-tag-clear-button-spacing-block,
var(--spectrum-tag-clear-button-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)))}.clear-button .spectrum-ClearButton-fill{background-color:var(
--mod-clearbutton-fill-background-color,var(--spectrum-clearbutton-fill-background-color)
);block-size:var(
--mod-clearbutton-fill-size,var(--spectrum-clearbutton-fill-size)
);inline-size:var(
--mod-clearbutton-fill-size,var(--spectrum-clearbutton-fill-size)
)}.label{block-size:100%;box-sizing:border-box;cursor:default;flex:1 1 auto;font-size:var(--mod-tag-font-size,var(--spectrum-tag-font-size));font-weight:var(
--mod-tag-label-font-weight,var(--spectrum-tag-label-font-weight)
);line-height:var(
--mod-tag-label-line-height,var(--spectrum-tag-label-line-height)
);margin-inline-end:calc(var(
--mod-tag-label-spacing-inline-end,
var(--spectrum-tag-label-spacing-inline-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));overflow:hidden;padding-block-start:calc(var(
--mod-tag-label-spacing-block,
var(--spectrum-tag-label-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));text-overflow:ellipsis;white-space:nowrap}:host(:hover){background-color:var(
--highcontrast-tag-background-color-hover,var(
--mod-tag-background-color-hover,var(--spectrum-tag-background-color-hover)
)
);border-color:var(
--highcontrast-tag-border-color-hover,var(
--mod-tag-border-color-hover,var(--spectrum-tag-border-color-hover)
)
);color:var(
--highcontrast-tag-content-color-hover,var(
--mod-tag-content-color-hover,var(--spectrum-tag-content-color-hover)
)
)}:host(:active){background-color:var(
--highcontrast-tag-background-color-active,var(
--mod-tag-background-color-active,var(--spectrum-tag-background-color-active)
)
);border-color:var(
--highcontrast-tag-border-color-active,var(
--mod-tag-border-color-active,var(--spectrum-tag-border-color-active)
)
);color:var(
--highcontrast-tag-content-color-active,var(
--mod-tag-content-color-active,var(--spectrum-tag-content-color-active)
)
)}:host(.focus-visible),:host(.is-focused){background-color:var(
--highcontrast-tag-background-color-focus,var(
--mod-tag-background-color-focus,var(--spectrum-tag-background-color-focus)
)
);border-color:var(
--highcontrast-tag-border-color-focus,var(
--mod-tag-border-color-focus,var(--spectrum-tag-border-color-focus)
)
);color:var(
--highcontrast-tag-content-color-focus,var(
--mod-tag-content-color-focus,var(--spectrum-tag-content-color-focus)
)
)}:host(.is-focused),:host(:focus-visible){background-color:var(
--highcontrast-tag-background-color-focus,var(
--mod-tag-background-color-focus,var(--spectrum-tag-background-color-focus)
)
);border-color:var(
--highcontrast-tag-border-color-focus,var(
--mod-tag-border-color-focus,var(--spectrum-tag-border-color-focus)
)
);color:var(
--highcontrast-tag-content-color-focus,var(
--mod-tag-content-color-focus,var(--spectrum-tag-content-color-focus)
)
)}:host(.focus-visible):after,:host(.is-focused):after{block-size:calc(100% + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*2 + var(--mod-tag-border-width, var(--spectrum-tag-border-width))*2);border-color:var(
--highcontrast-tag-focus-ring-color,var(--mod-tag-focus-ring-color,var(--spectrum-tag-focus-ring-color))
);border-radius:calc(var(--mod-tag-corner-radius, var(--spectrum-tag-corner-radius)) + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap)) + var(--mod-tag-border-width, var(--spectrum-tag-border-width)));border-style:solid;border-width:var(
--mod-tag-focus-ring-thickness,var(--spectrum-tag-focus-ring-thickness)
);bottom:0;content:"";display:inline-block;inline-size:calc(100% + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*2 + var(--mod-tag-border-width, var(--spectrum-tag-border-width))*2);left:0;margin:auto;margin-block-start:calc((var(
--mod-tag-focus-ring-gap,
var(--spectrum-tag-focus-ring-gap)
) + var(
--mod-tag-border-width,
var(--spectrum-tag-border-width)
) + var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
))*-1);margin-inline-start:calc((var(
--mod-tag-focus-ring-gap,
var(--spectrum-tag-focus-ring-gap)
) + var(
--mod-tag-border-width,
var(--spectrum-tag-border-width)
) + var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
))*-1);position:absolute;right:0;top:0}:host(.is-focused):after,:host(:focus-visible):after{block-size:calc(100% + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*2 + var(--mod-tag-border-width, var(--spectrum-tag-border-width))*2);border-color:var(
--highcontrast-tag-focus-ring-color,var(--mod-tag-focus-ring-color,var(--spectrum-tag-focus-ring-color))
);border-radius:calc(var(--mod-tag-corner-radius, var(--spectrum-tag-corner-radius)) + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap)) + var(--mod-tag-border-width, var(--spectrum-tag-border-width)));border-style:solid;border-width:var(
--mod-tag-focus-ring-thickness,var(--spectrum-tag-focus-ring-thickness)
);bottom:0;content:"";display:inline-block;inline-size:calc(100% + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*2 + var(--mod-tag-border-width, var(--spectrum-tag-border-width))*2);left:0;margin:auto;margin-block-start:calc((var(
--mod-tag-focus-ring-gap,
var(--spectrum-tag-focus-ring-gap)
) + var(
--mod-tag-border-width,
var(--spectrum-tag-border-width)
) + var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
))*-1);margin-inline-start:calc((var(
--mod-tag-focus-ring-gap,
var(--spectrum-tag-focus-ring-gap)
) + var(
--mod-tag-border-width,
var(--spectrum-tag-border-width)
) + var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
))*-1);position:absolute;right:0;top:0}:host([selected]){background-color:var(
--highcontrast-tag-background-color-selected,var(
--mod-tag-background-color-selected,var(--spectrum-tag-background-color-selected)
)
);border-color:var(
--highcontrast-tag-border-color-selected,var(
--mod-tag-border-color-selected,var(--spectrum-tag-border-color-selected)
)
);color:var(
--highcontrast-tag-content-color-selected,var(
--mod-tag-content-color-selected,var(--spectrum-tag-content-color-selected)
)
)}:host([selected]:hover){background-color:var(
--highcontrast-tag-background-color-selected-hover,var(
--mod-tag-background-color-selected-hover,var(--spectrum-tag-background-color-selected-hover)
)
);border-color:var(
--highcontrast-tag-border-color-selected-hover,var(
--mod-tag-border-color-selected-hover,var(--spectrum-tag-border-color-selected-hover)
)
)}:host([selected]:active){background-color:var(
--highcontrast-tag-background-color-selected-active,var(
--mod-tag-background-color-selected-active,var(--spectrum-tag-background-color-selected-active)
)
);border-color:var(
--highcontrast-tag-border-color-selected-active,var(
--mod-tag-border-color-selected-active,var(--spectrum-tag-border-color-selected-active)
)
)}:host([selected].focus-visible),:host([selected].is-focused){background-color:var(
--highcontrast-tag-background-color-selected-focus,var(
--mod-tag-background-color-selected-focus,var(--spectrum-tag-background-color-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-selected-focus,var(
--mod-tag-border-color-selected-focus,var(--spectrum-tag-border-color-selected-focus)
)
)}:host([selected].is-focused),:host([selected]:focus-visible){background-color:var(
--highcontrast-tag-background-color-selected-focus,var(
--mod-tag-background-color-selected-focus,var(--spectrum-tag-background-color-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-selected-focus,var(
--mod-tag-border-color-selected-focus,var(--spectrum-tag-border-color-selected-focus)
)
)}:host([invalid]){border-color:var(
--highcontrast-tag-border-color-invalid,var(
--mod-tag-border-color-invalid,var(--spectrum-tag-border-color-invalid)
)
);color:var(
--highcontrast-tag-content-color-invalid,var(
--mod-tag-content-color-invalid,var(--spectrum-tag-content-color-invalid)
)
)}:host([invalid]:hover){border-color:var(
--highcontrast-tag-border-color-invalid-hover,var(
--mod-tag-border-color-invalid-hover,var(--spectrum-tag-border-color-invalid-hover)
)
);color:var(
--highcontrast-tag-content-color-invalid-hover,var(
--mod-tag-content-color-invalid-hover,var(--spectrum-tag-content-color-invalid-hover)
)
)}:host([invalid]:active){border-color:var(
--highcontrast-tag-border-color-invalid-active,var(
--mod-tag-border-color-invalid-active,var(--spectrum-tag-border-color-invalid-active)
)
);color:var(
--highcontrast-tag-content-color-invalid-active,var(
--mod-tag-content-color-invalid-active,var(--spectrum-tag-content-color-invalid-active)
)
)}:host([invalid].focus-visible),:host([invalid].is-focused){border-color:var(
--highcontrast-tag-border-color-invalid-focus,var(
--mod-tag-border-color-invalid-focus,var(--spectrum-tag-border-color-invalid-focus)
)
);color:var(
--highcontrast-tag-content-color-invalid-focus,var(
--mod-tag-content-color-invalid-focus,var(--spectrum-tag-content-color-invalid-focus)
)
)}:host([invalid].is-focused),:host([invalid]:focus-visible){border-color:var(
--highcontrast-tag-border-color-invalid-focus,var(
--mod-tag-border-color-invalid-focus,var(--spectrum-tag-border-color-invalid-focus)
)
);color:var(
--highcontrast-tag-content-color-invalid-focus,var(
--mod-tag-content-color-invalid-focus,var(--spectrum-tag-content-color-invalid-focus)
)
)}:host([invalid][selected]){background-color:var(
--highcontrast-tag-background-color-invalid-selected,var(
--mod-tag-background-color-invalid-selected,var(--spectrum-tag-background-color-invalid-selected)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected,var(
--mod-tag-border-color-invalid-selected,var(--spectrum-tag-border-color-invalid-selected)
)
);color:var(
--highcontrast-tag-content-color-invalid-selected,var(
--mod-tag-content-color-invalid-selected,var(--spectrum-tag-content-color-invalid-selected)
)
)}:host([invalid][selected]:hover){background-color:var(
--highcontrast-tag-background-color-invalid-selected-hover,var(
--mod-tag-background-color-invalid-selected-hover,var(--spectrum-tag-background-color-invalid-selected-hover)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-hover,var(
--mod-tag-border-color-invalid-selected-hover,var(--spectrum-tag-border-color-invalid-selected-hover)
)
)}:host([invalid][selected]:active){background-color:var(
--highcontrast-tag-background-color-invalid-selected-active,var(
--mod-tag-background-color-invalid-selected-active,var(--spectrum-tag-background-color-invalid-selected-active)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-active,var(
--mod-tag-border-color-invalid-selected-active,var(--spectrum-tag-border-color-invalid-selected-active)
)
)}:host([invalid][selected].focus-visible),:host([invalid][selected].is-focused){background-color:var(
--highcontrast-tag-background-color-invalid-selected-focus,var(
--mod-tag-background-color-invalid-selected-focus,var(--spectrum-tag-background-color-invalid-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-focus,var(
--mod-tag-border-color-invalid-selected-focus,var(--spectrum-tag-border-color-invalid-selected-focus)
)
)}:host([invalid][selected].is-focused),:host([invalid][selected]:focus-visible){background-color:var(
--highcontrast-tag-background-color-invalid-selected-focus,var(
--mod-tag-background-color-invalid-selected-focus,var(--spectrum-tag-background-color-invalid-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-focus,var(
--mod-tag-border-color-invalid-selected-focus,var(--spectrum-tag-border-color-invalid-selected-focus)
)
)}:host(.is-emphasized){background-color:var(
--highcontrast-tag-background-color-emphasized,var(
--mod-tag-background-color-emphasized,var(--spectrum-tag-background-color-emphasized)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized,var(
--mod-tag-border-color-emphasized,var(--spectrum-tag-border-color-emphasized)
)
);color:var(
--highcontrast-tag-content-color-emphasized,var(
--mod-tag-content-color-emphasized,var(--spectrum-tag-content-color-emphasized)
)
)}:host(.is-emphasized:hover){background-color:var(
--highcontrast-tag-background-color-emphasized-hover,var(
--mod-tag-background-color-emphasized-hover,var(--spectrum-tag-background-color-emphasized-hover)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-hover,var(
--mod-tag-border-color-emphasized-hover,var(--spectrum-tag-border-color-emphasized-hover)
)
)}:host(.is-emphasized:active){background-color:var(
--highcontrast-tag-background-color-emphasized-active,var(
--mod-tag-background-color-emphasized-active,var(--spectrum-tag-background-color-emphasized-active)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-active,var(
--mod-tag-border-color-emphasized-active,var(--spectrum-tag-border-color-emphasized-active)
)
)}:host(.is-emphasized.focus-visible),:host(.is-emphasized.is-focused){background-color:var(
--highcontrast-tag-background-color-emphasized-focus,var(
--mod-tag-background-color-emphasized-focus,var(--spectrum-tag-background-color-emphasized-focus)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-focus,var(
--mod-tag-border-color-emphasized-focus,var(--spectrum-tag-border-color-emphasized-focus)
)
)}:host(.is-emphasized.is-focused),:host(.is-emphasized:focus-visible){background-color:var(
--highcontrast-tag-background-color-emphasized-focus,var(
--mod-tag-background-color-emphasized-focus,var(--spectrum-tag-background-color-emphasized-focus)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-focus,var(
--mod-tag-border-color-emphasized-focus,var(--spectrum-tag-border-color-emphasized-focus)
)
)}:host([disabled]){background-color:var(
--highcontrast-tag-background-color-disabled,var(
--mod-tag-background-color-disabled,var(--spectrum-tag-background-color-disabled)
)
);border-color:var(
--highcontrast-tag-border-color-disabled,var(
--mod-tag-border-color-disabled,var(--spectrum-tag-border-color-disabled)
)
);color:var(
--highcontrast-tag-content-color-disabled,var(
--mod-tag-content-color-disabled,var(--spectrum-tag-content-color-disabled)
)
);pointer-events:none}:host([disabled]) ::slotted([slot=avatar]){opacity:var(
--mod-avatar-opacity-disabled,var(--spectrum-avatar-opacity-disabled)
)}@media (forced-colors:active){:host{--highcontrast-tag-border-color:ButtonText;--highcontrast-tag-border-color-hover:ButtonText;--highcontrast-tag-border-color-active:ButtonText;--highcontrast-tag-border-color-focus:ButtonText;--highcontrast-tag-background-color:ButtonFace;--highcontrast-tag-background-color-hover:ButtonFace;--highcontrast-tag-background-color-active:ButtonFace;--highcontrast-tag-background-color-focus:ButtonFace;--highcontrast-tag-content-color:ButtonText;--highcontrast-tag-content-color-hover:ButtonText;--highcontrast-tag-content-color-active:ButtonText;--highcontrast-tag-content-color-focus:ButtonText;forced-color-adjust:none}:host([selected]){--highcontrast-tag-border-color-selected:Highlight;--highcontrast-tag-border-color-selected-hover:Highlight;--highcontrast-tag-border-color-selected-active:Highlight;--highcontrast-tag-border-color-selected-focus:Highlight;--highcontrast-tag-background-color-selected:Highlight;--highcontrast-tag-background-color-selected-hover:Highlight;--highcontrast-tag-background-color-selected-active:Highlight;--highcontrast-tag-background-color-selected-focus:Highlight;--highcontrast-tag-content-color-selected:HighlightText}:host([disabled]){--highcontrast-tag-border-color-disabled:GrayText;--highcontrast-tag-background-color-disabled:ButtonFace;--highcontrast-tag-content-color-disabled:GrayText}:host([invalid]){--highcontrast-tag-border-color-invalid:Highlight;--highcontrast-tag-border-color-invalid-hover:Highlight;--highcontrast-tag-border-color-invalid-active:Highlight;--highcontrast-tag-border-color-invalid-focus:Highlight;--highcontrast-tag-content-color-invalid:CanvasText;--highcontrast-tag-content-color-invalid-hover:CanvasText;--highcontrast-tag-content-color-invalid-active:CanvasText;--highcontrast-tag-content-color-invalid-focus:CanvasText}:host([invalid][selected]){--highcontrast-tag-border-color-invalid-selected:Highlight;--highcontrast-tag-border-color-invalid-selected-hover:Highlight;--highcontrast-tag-border-color-invalid-selected-focus:Highlight;--highcontrast-tag-border-color-invalid-selected-active:Highlight;--highcontrast-tag-background-color-invalid-selected:Highlight;--highcontrast-tag-background-color-invalid-selected-hover:Highlight;--highcontrast-tag-background-color-invalid-selected-active:Highlight;--highcontrast-tag-background-color-invalid-selected-focus:Highlight;--highcontrast-tag-content-color-invalid-selected:HighlightText}:host(.is-emphasized){--highcontrast-tag-border-color-emphasized:Highlight;--highcontrast-tag-border-color-emphasized-hover:Highlight;--highcontrast-tag-border-color-emphasized-active:Highlight;--highcontrast-tag-border-color-emphasized-focus:Highlight;--highcontrast-tag-background-color-emphasized:ButtonFace;--highcontrast-tag-background-color-emphasized-hover:ButtonFace;--highcontrast-tag-background-color-emphasized-active:ButtonFace;--highcontrast-tag-background-color-emphasized-focus:ButtonFace;--highcontrast-tag-content-color-emphasized:CanvasText}}:host{--spectrum-tag-border-color:var(
--system-spectrum-tag-border-color
);--spectrum-tag-border-color-hover:var(
--system-spectrum-tag-border-color-hover
);--spectrum-tag-border-color-active:var(
--system-spectrum-tag-border-color-active
);--spectrum-tag-border-color-focus:var(
--system-spectrum-tag-border-color-focus
);--spectrum-tag-size-small-corner-radius:var(
--system-spectrum-tag-size-small-corner-radius
);--spectrum-tag-size-medium-corner-radius:var(
--system-spectrum-tag-size-medium-corner-radius
);--spectrum-tag-size-large-corner-radius:var(
--system-spectrum-tag-size-large-corner-radius
);--spectrum-tag-background-color:var(
--system-spectrum-tag-background-color
);--spectrum-tag-background-color-hover:var(
--system-spectrum-tag-background-color-hover
);--spectrum-tag-background-color-active:var(
--system-spectrum-tag-background-color-active
);--spectrum-tag-background-color-focus:var(
--system-spectrum-tag-background-color-focus
);--spectrum-tag-content-color:var(--system-spectrum-tag-content-color);--spectrum-tag-content-color-hover:var(
--system-spectrum-tag-content-color-hover
);--spectrum-tag-content-color-active:var(
--system-spectrum-tag-content-color-active
);--spectrum-tag-content-color-focus:var(
--system-spectrum-tag-content-color-focus
);--spectrum-tag-border-color-selected:var(
--system-spectrum-tag-border-color-selected
);--spectrum-tag-border-color-selected-hover:var(
--system-spectrum-tag-border-color-selected-hover
);--spectrum-tag-border-color-selected-active:var(
--system-spectrum-tag-border-color-selected-active
);--spectrum-tag-border-color-selected-focus:var(
--system-spectrum-tag-border-color-selected-focus
);--spectrum-tag-background-color-selected:var(
--system-spectrum-tag-background-color-selected
);--spectrum-tag-background-color-selected-hover:var(
--system-spectrum-tag-background-color-selected-hover
);--spectrum-tag-background-color-selected-active:var(
--system-spectrum-tag-background-color-selected-active
);--spectrum-tag-background-color-selected-focus:var(
--system-spectrum-tag-background-color-selected-focus
);--spectrum-tag-border-color-disabled:var(
--system-spectrum-tag-border-color-disabled
);--spectrum-tag-background-color-disabled:var(
--system-spectrum-tag-background-color-disabled
);--spectrum-tag-size-small-spacing-inline-start:var(
--system-spectrum-tag-size-small-spacing-inline-start
);--spectrum-tag-size-small-label-spacing-inline-end:var(
--system-spectrum-tag-size-small-label-spacing-inline-end
);--spectrum-tag-size-small-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-small-clear-button-spacing-inline-end
);--spectrum-tag-size-medium-spacing-inline-start:var(
--system-spectrum-tag-size-medium-spacing-inline-start
);--spectrum-tag-size-medium-label-spacing-inline-end:var(
--system-spectrum-tag-size-medium-label-spacing-inline-end
);--spectrum-tag-size-medium-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-medium-clear-button-spacing-inline-end
);--spectrum-tag-size-large-spacing-inline-start:var(
--system-spectrum-tag-size-large-spacing-inline-start
);--spectrum-tag-size-large-label-spacing-inline-end:var(
--system-spectrum-tag-size-large-label-spacing-inline-end
);--spectrum-tag-size-large-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-large-clear-button-spacing-inline-end
)}:host([invalid]) .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-key-focus,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([invalid]):hover .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-hover,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([invalid]):active .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-hover,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}
`,ji=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,_i=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Fi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&ji(e,r,s),s};class Ui extends(f(i,{validSizes:["s","m","l"]})){constructor(){super(),this.deletable=!1,this.disabled=!1,this.readonly=!1,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.handleKeydown=t=>{if(!this.deletable)return;const{code:e}=t;switch(e){case"Backspace":case"Space":case"Delete":return void this.delete();default:return}},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Ii]}get hasIcon(){return!!this.querySelector('[slot="icon"]')}get hasAvatar(){return!!this.querySelector('[slot="avatar"]')}delete(){this.readonly||this.dispatchEvent(new Event("delete",{bubbles:!0}))}render(){const t=[];return this.hasAvatar&&t.push(s`
                    <slot name="avatar"></slot>
                `),this.hasIcon&&t.push(s`
                    <slot name="icon"></slot>
                `),s`
            ${t}
            <span class="label"><slot></slot></span>
            ${this.deletable?s`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `:s``}
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex",!this.disabled&&this.matches(":first-of-type:not([disabled])")?"0":"-1")}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}_i([a({type:Boolean,reflect:!0})],Ui.prototype,"deletable",2),_i([a({type:Boolean,reflect:!0})],Ui.prototype,"disabled",2),_i([a({type:Boolean,reflect:!0})],Ui.prototype,"readonly",2),customElements.define("sp-tag",Ui);var Ri=r`
:host{--spectrum-taggroup-tag-gap-x:var(--spectrum-global-dimension-size-100);--spectrum-taggroup-tag-gap-y:var(--spectrum-global-dimension-size-100);display:inline-flex;list-style:none;margin:0;padding:0}::slotted(*){margin:calc(var(
--spectrum-taggroup-tag-gap-y,
var(--spectrum-global-dimension-size-100)
)/2) calc(var(
--spectrum-taggroup-tag-gap-x,
var(--spectrum-global-dimension-size-100)
)/2)}
`,Ni=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor;class Gi extends(x(i)){constructor(){super(),this.rovingTabindexController=new e(this,{focusInIndex:t=>t.findIndex((t=>!t.disabled&&t.deletable)),elements:()=>this.tags,isFocusableElement:t=>!t.disabled&&t.deletable}),this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleKeydown=t=>{const{code:e}=t;if("PageUp"!==e&&"PageDown"!==e)return;const r=(t,e)=>t[(t.length+e)%t.length],o=[...this.getRootNode().querySelectorAll("sp-tags")];if(o.length<2)return;t.preventDefault();const i="PageUp"===e?-1:1;let s=o.indexOf(this)+i,a=r(o,s);for(;!a.tags.length;)s+=i,a=r(o,s);a.focus()},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Ri]}get tags(){return this.defaultNodes.filter((t=>t instanceof Ui))}focus(){this.rovingTabindexController.focus()}handleSlotchange(){this.rovingTabindexController.clearElementCache()}render(){return s`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}firstUpdated(){this.hasAttribute("role")||this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","Tags")}}((t,e,r,o)=>{for(var i,s=o>1?void 0:o?Vi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);o&&s&&Ni(e,r,s)})([u("")],Gi.prototype,"defaultNodes",2),customElements.define("sp-tags",Gi),customElements.define("sp-textfield",E);var Ki=r`
:host{align-items:center;background-position:0 0,0 var(--spectrum-global-dimension-static-size-100,8px),var(--spectrum-global-dimension-static-size-100,8px) calc(var(--spectrum-global-dimension-static-size-100, 8px)*-1),calc(var(--spectrum-global-dimension-static-size-100, 8px)*-1) 0;background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px);border-radius:var(--spectrum-thumbnail-border-radius);display:flex;height:var(--spectrum-thumbnail-height);justify-content:center;margin:0;overflow:hidden;padding:0;position:relative;vertical-align:top;width:var(--spectrum-thumbnail-width);z-index:0}:host:before{border-radius:var(--spectrum-thumbnail-border-radius);content:"";height:100%;position:absolute;width:100%;z-index:2}:host([size=xxs]){--spectrum-thumbnail-border-color-selected:var(
--spectrum-thumbnail-xxs-border-color-selected,var(--spectrum-alias-border-color-selected)
);--spectrum-thumbnail-border-size-selected-key-focus:var(
--spectrum-thumbnail-xxs-border-size-selected-key-focus,var(--spectrum-alias-border-size-thick)
);--spectrum-thumbnail-border-size:var(
--spectrum-thumbnail-xxs-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-thumbnail-border-color:var(
--spectrum-thumbnail-xxs-border-color,var(--spectrum-alias-border-color-translucent)
);--spectrum-thumbnail-border-color-key-focus:var(
--spectrum-thumbnail-xxs-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);--spectrum-thumbnail-darksquare-background-color:var(
--spectrum-thumbnail-xxs-darksquare-background-color,var(--spectrum-alias-thumbnail-darksquare-background-color)
);--spectrum-thumbnail-border-radius:var(
--spectrum-thumbnail-xxs-border-radius,var(--spectrum-alias-thumbnail-border-radius-small)
);--spectrum-thumbnail-width:var(
--spectrum-thumbnail-xxs-width,var(--spectrum-global-dimension-size-225)
);--spectrum-thumbnail-height:var(
--spectrum-thumbnail-xxs-height,var(--spectrum-global-dimension-size-225)
)}:host([size=xs]){--spectrum-thumbnail-border-color-selected:var(
--spectrum-thumbnail-xs-border-color-selected,var(--spectrum-alias-border-color-selected)
);--spectrum-thumbnail-border-size-selected-key-focus:var(
--spectrum-thumbnail-xs-border-size-selected-key-focus,var(--spectrum-alias-border-size-thick)
);--spectrum-thumbnail-border-size:var(
--spectrum-thumbnail-xs-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-thumbnail-border-color:var(
--spectrum-thumbnail-xs-border-color,var(--spectrum-alias-border-color-translucent)
);--spectrum-thumbnail-border-color-key-focus:var(
--spectrum-thumbnail-xs-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);--spectrum-thumbnail-darksquare-background-color:var(
--spectrum-thumbnail-xs-darksquare-background-color,var(--spectrum-alias-thumbnail-darksquare-background-color)
);--spectrum-thumbnail-border-radius:var(
--spectrum-thumbnail-xs-border-radius,var(--spectrum-alias-thumbnail-border-radius-small)
);--spectrum-thumbnail-width:var(
--spectrum-thumbnail-xs-width,var(--spectrum-global-dimension-size-300)
);--spectrum-thumbnail-height:var(
--spectrum-thumbnail-xs-height,var(--spectrum-global-dimension-size-300)
)}:host([size=s]){--spectrum-thumbnail-border-color-selected:var(
--spectrum-thumbnail-s-border-color-selected,var(--spectrum-alias-border-color-selected)
);--spectrum-thumbnail-border-size-selected-key-focus:var(
--spectrum-thumbnail-s-border-size-selected-key-focus,var(--spectrum-alias-border-size-thick)
);--spectrum-thumbnail-border-size:var(
--spectrum-thumbnail-s-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-thumbnail-border-color:var(
--spectrum-thumbnail-s-border-color,var(--spectrum-alias-border-color-translucent)
);--spectrum-thumbnail-border-color-key-focus:var(
--spectrum-thumbnail-s-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);--spectrum-thumbnail-darksquare-background-color:var(
--spectrum-thumbnail-s-darksquare-background-color,var(--spectrum-alias-thumbnail-darksquare-background-color)
);--spectrum-thumbnail-border-radius:var(
--spectrum-thumbnail-s-border-radius,var(--spectrum-alias-thumbnail-border-radius-small)
);--spectrum-thumbnail-width:var(
--spectrum-thumbnail-s-width,var(--spectrum-global-dimension-size-400)
);--spectrum-thumbnail-height:var(
--spectrum-thumbnail-s-height,var(--spectrum-global-dimension-size-400)
)}:host([size=m]){--spectrum-thumbnail-border-color-selected:var(
--spectrum-thumbnail-m-border-color-selected,var(--spectrum-alias-border-color-selected)
);--spectrum-thumbnail-border-size-selected-key-focus:var(
--spectrum-thumbnail-m-border-size-selected-key-focus,var(--spectrum-alias-border-size-thick)
);--spectrum-thumbnail-border-size:var(
--spectrum-thumbnail-m-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-thumbnail-border-color:var(
--spectrum-thumbnail-m-border-color,var(--spectrum-alias-border-color-translucent)
);--spectrum-thumbnail-border-color-key-focus:var(
--spectrum-thumbnail-m-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);--spectrum-thumbnail-darksquare-background-color:var(
--spectrum-thumbnail-m-darksquare-background-color,var(--spectrum-alias-thumbnail-darksquare-background-color)
);--spectrum-thumbnail-border-radius:var(
--spectrum-thumbnail-m-border-radius,var(--spectrum-alias-thumbnail-border-radius-small)
);--spectrum-thumbnail-width:var(
--spectrum-thumbnail-m-width,var(--spectrum-global-dimension-size-500)
);--spectrum-thumbnail-height:var(
--spectrum-thumbnail-m-height,var(--spectrum-global-dimension-size-500)
)}:host([size=l]){--spectrum-thumbnail-border-color-selected:var(
--spectrum-thumbnail-l-border-color-selected,var(--spectrum-alias-border-color-selected)
);--spectrum-thumbnail-border-size-selected-key-focus:var(
--spectrum-thumbnail-l-border-size-selected-key-focus,var(--spectrum-alias-border-size-thick)
);--spectrum-thumbnail-border-size:var(
--spectrum-thumbnail-l-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-thumbnail-border-color:var(
--spectrum-thumbnail-l-border-color,var(--spectrum-alias-border-color-translucent)
);--spectrum-thumbnail-border-color-key-focus:var(
--spectrum-thumbnail-l-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);--spectrum-thumbnail-darksquare-background-color:var(
--spectrum-thumbnail-l-darksquare-background-color,var(--spectrum-alias-thumbnail-darksquare-background-color)
);--spectrum-thumbnail-border-radius:var(
--spectrum-thumbnail-l-border-radius,var(--spectrum-alias-thumbnail-border-radius-small)
);--spectrum-thumbnail-width:var(
--spectrum-thumbnail-l-width,var(--spectrum-global-dimension-size-700)
);--spectrum-thumbnail-height:var(
--spectrum-thumbnail-l-height,var(--spectrum-global-dimension-size-700)
)}::slotted(*){max-height:100%;max-width:100%;z-index:1}:host([cover]) ::slotted(*){height:100%;object-fit:cover;object-position:center;width:100%}.background{background-position:50%;background-size:cover;bottom:0;height:100%;left:0;position:absolute;right:0;top:0;width:100%;z-index:0}:host{background-color:var(
--spectrum-global-color-static-white,rgb(var(--spectrum-global-color-static-white-rgb))
);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(-45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%)}:host:before{box-shadow:inset 0 0 0 var(--spectrum-thumbnail-border-size) var(--spectrum-thumbnail-border-color)}:host([selected]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host([selected]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:none;overflow:visible}:host(.focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:none;overflow:visible}:host(:focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:none;overflow:visible}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;box-shadow:0 0 0 var(--spectrum-thumbnail-border-size-selected-key-focus) var(--spectrum-thumbnail-border-color-key-focus);content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0}:host(.focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;box-shadow:0 0 0 var(--spectrum-thumbnail-border-size-selected-key-focus) var(--spectrum-thumbnail-border-color-key-focus);content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0}:host(:focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;box-shadow:0 0 0 var(--spectrum-thumbnail-border-size-selected-key-focus) var(--spectrum-thumbnail-border-color-key-focus);content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0}::slotted(:not(img)){display:none}
`,Xi=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,Wi=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?Yi(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Xi(e,r,s),s};class Zi extends(f(i,{validSizes:["xxs","xs","s","m","l"],defaultSize:"s"})){constructor(){super(...arguments),this.cover=!1}static get styles(){return[Ki]}render(){return s`
            ${this.background?s`
                      <div
                          class="background"
                          style="background: ${this.background}"
                      ></div>
                  `:s``}
            <slot></slot>
        `}}Wi([a({type:String,reflect:!0})],Zi.prototype,"background",2),Wi([a({type:Boolean,reflect:!0})],Zi.prototype,"cover",2),customElements.define("sp-thumbnail",Zi);var Qi=r`
:host{--spectrum-overlay-animation-distance:6px;--spectrum-overlay-animation-duration:var(
--spectrum-animation-duration-100
);opacity:0;pointer-events:none;transition:transform var(--spectrum-overlay-animation-duration) ease-in-out,opacity var(--spectrum-overlay-animation-duration) ease-in-out,visibility 0ms linear var(--spectrum-overlay-animation-duration);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host([open]) .spectrum-Tooltip--bottom-end,:host([open]) .spectrum-Tooltip--bottom-left,:host([open]) .spectrum-Tooltip--bottom-right,:host([open]) .spectrum-Tooltip--bottom-start,:host([placement*=bottom][open]){--spectrum-overlay-animation-distance:6px;transform:translateY(var(--spectrum-overlay-animation-distance))}:host([open]),:host([open]) .spectrum-Tooltip--top-end,:host([open]) .spectrum-Tooltip--top-left,:host([open]) .spectrum-Tooltip--top-right,:host([open]) .spectrum-Tooltip--top-start,:host([placement*=top][open]){--spectrum-overlay-animation-distance:6px;transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([dir=rtl][open]) .spectrum-Tooltip--start,:host([dir=rtl][open]) .spectrum-Tooltip--start-bottom,:host([dir=rtl][open]) .spectrum-Tooltip--start-top,:host([open]) .spectrum-Tooltip--end,:host([open]) .spectrum-Tooltip--end-bottom,:host([open]) .spectrum-Tooltip--end-top,:host([open]) .spectrum-Tooltip--right-bottom,:host([open]) .spectrum-Tooltip--right-top,:host([placement*=right][open]){--spectrum-overlay-animation-distance:6px;transform:translateX(var(--spectrum-overlay-animation-distance))}:host([dir=rtl][open]) .spectrum-Tooltip--end,:host([dir=rtl][open]) .spectrum-Tooltip--end-bottom,:host([dir=rtl][open]) .spectrum-Tooltip--end-top,:host([open]) .spectrum-Tooltip--left-bottom,:host([open]) .spectrum-Tooltip--left-top,:host([open]) .spectrum-Tooltip--start,:host([open]) .spectrum-Tooltip--start-bottom,:host([open]) .spectrum-Tooltip--start-top,:host([placement*=left][open]){--spectrum-overlay-animation-distance:6px;transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{--spectrum-tooltip-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-tooltip-animation-distance:var(--spectrum-spacing-75);--spectrum-tooltip-margin:0px;--spectrum-tooltip-height:var(--spectrum-component-height-75);--spectrum-tooltip-max-inline-size:var(--spectrum-tooltip-maximum-width);--spectrum-tooltip-border-radius:var(--spectrum-corner-radius-100);--spectrum-tooltip-icon-width:var(--spectrum-workflow-icon-size-50);--spectrum-tooltip-icon-height:var(--spectrum-workflow-icon-size-50);--spectrum-tooltip-font-size:var(--spectrum-font-size-75);--spectrum-tooltip-line-height:var(--spectrum-line-height-100);--spectrum-tooltip-cjk-line-height:var(--spectrum-line-height-cjk-100);--spectrum-tooltip-font-weight:var(--spectrum-font-weight-regular);--spectrum-tooltip-spacing-inline:var(
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
);--spectrum-tooltip-content-color:var(--spectrum-white);--spectrum-tooltip-tip-inline-size:var(--spectrum-tooltip-tip-width);--spectrum-tooltip-tip-block-size:var(--spectrum-tooltip-tip-height);--spectrum-tooltip-pointer-corner-spacing:var(
--spectrum-corner-radius-100
);--spectrum-tooltip-background-color-default:var(
--spectrum-tooltip-backgound-color-default-neutral
)}@media (forced-colors:active){:host{border:1px solid transparent}#tip{--highcontrast-tooltip-background-color-default:CanvasText;--highcontrast-tooltip-background-color-informative:CanvasText;--highcontrast-tooltip-background-color-positive:CanvasText;--highcontrast-tooltip-background-color-negative:CanvasText;forced-color-adjust:none}}:host{-webkit-font-smoothing:antialiased;align-items:center;background-color:var(
--highcontrast-tooltip-background-color-default,var(
--mod-tooltip-background-color-default,var(--spectrum-tooltip-background-color-default)
)
);block-size:auto;border-radius:var(
--mod-tooltip-border-radius,var(--spectrum-tooltip-border-radius)
);box-sizing:border-box;color:var(
--mod-tooltip-content-color,var(--spectrum-tooltip-content-color)
);display:inline-flex;flex-direction:row;font-size:var(--mod-tooltip-font-size,var(--spectrum-tooltip-font-size));font-weight:var(
--mod-tooltip-font-weight,var(--spectrum-tooltip-font-weight)
);line-height:var(
--mod-tooltip-line-height,var(--spectrum-tooltip-line-height)
);max-inline-size:var(
--mod-tooltip-max-inline-size,var(--spectrum-tooltip-max-inline-size)
);min-block-size:var(--mod-tooltip-height,var(--spectrum-tooltip-height));padding-inline:var(
--mod-tooltip-spacing-inline,var(--spectrum-tooltip-spacing-inline)
);position:relative;vertical-align:top;width:auto;word-break:break-word}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-tooltip-cjk-line-height,var(--spectrum-tooltip-cjk-line-height)
)}:host{cursor:default;-webkit-user-select:none;user-select:none}p{margin:0}:host([variant=info]){background-color:var(
--highcontrast-tooltip-background-color-informative,var(
--mod-tooltip-background-color-informative,var(--spectrum-tooltip-background-color-informative)
)
)}:host([variant=positive]){background-color:var(
--highcontrast-tooltip-background-color-positive,var(
--mod-tooltip-background-color-positive,var(--spectrum-tooltip-background-color-positive)
)
)}:host([variant=negative]){background-color:var(
--highcontrast-tooltip-background-color-negative,var(
--mod-tooltip-background-color-negative,var(--spectrum-tooltip-background-color-negative)
)
)}#tip{background-color:var(
--highcontrast-tooltip-background-color-default,var(
--mod-tooltip-background-color-default,var(--spectrum-tooltip-background-color-default)
)
);clip-path:polygon(0 -5%,50% 100%,100% -5%);height:var(
--mod-tooltip-tip-block-size,var(--spectrum-tooltip-tip-block-size)
);left:50%;position:absolute;top:100%;transform:translateX(-50%);width:var(
--mod-tooltip-tip-inline-size,var(--spectrum-tooltip-tip-inline-size)
)}:host([variant=info]) #tip{background-color:var(
--highcontrast-tooltip-background-color-informative,var(
--mod-tooltip-background-color-informative,var(--spectrum-tooltip-background-color-informative)
)
)}:host([variant=positive]) #tip{background-color:var(
--highcontrast-tooltip-background-color-positive,var(
--mod-tooltip-background-color-positive,var(--spectrum-tooltip-background-color-positive)
)
)}:host([variant=negative]) #tip{background-color:var(
--highcontrast-tooltip-background-color-negative,var(
--mod-tooltip-background-color-negative,var(--spectrum-tooltip-background-color-negative)
)
)}.spectrum-Tooltip--top-end #tip,.spectrum-Tooltip--top-left #tip,.spectrum-Tooltip--top-right #tip,.spectrum-Tooltip--top-start #tip,:host([placement*=top]) #tip{top:100%}.spectrum-Tooltip--bottom-end #tip,.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--bottom-right #tip,.spectrum-Tooltip--bottom-start #tip,:host([placement*=bottom]) #tip{bottom:100%;clip-path:polygon(50% 0,0 105%,100% 105%);top:auto}.spectrum-Tooltip--bottom-end #tip,.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--bottom-right #tip,.spectrum-Tooltip--bottom-start #tip,.spectrum-Tooltip--top-end #tip,.spectrum-Tooltip--top-left #tip,.spectrum-Tooltip--top-right #tip,.spectrum-Tooltip--top-start #tip{transform:none}.spectrum-Tooltip--bottom-left #tip,.spectrum-Tooltip--top-left #tip{left:var(
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
);right:auto}.spectrum-Tooltip--end #tip,.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip,:host([placement*=left]) #tip,:host([placement*=right]) #tip{height:var(
--mod-tooltip-tip-inline-size,var(--spectrum-tooltip-tip-inline-size)
);top:50%;transform:translateY(-50%);width:var(
--mod-tooltip-tip-block-size,var(--spectrum-tooltip-tip-block-size)
)}.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip{top:auto;transform:none}.spectrum-Tooltip--end #tip,.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--right-top #tip,:host([placement*=right]) #tip{clip-path:polygon(0 50%,105% 100%,105% 0);left:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
)*-1);right:100%}.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--start #tip,.spectrum-Tooltip--start-bottom #tip,.spectrum-Tooltip--start-top #tip,:host([placement*=left]) #tip{clip-path:polygon(-5% 0,-5% 100%,100% 50%);left:100%}.spectrum-Tooltip--end-top #tip,.spectrum-Tooltip--left-top #tip,.spectrum-Tooltip--right-top #tip,.spectrum-Tooltip--start-top #tip{top:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}.spectrum-Tooltip--end-bottom #tip,.spectrum-Tooltip--left-bottom #tip,.spectrum-Tooltip--right-bottom #tip,.spectrum-Tooltip--start-bottom #tip{bottom:var(
--mod-tooltip-pointer-corner-spacing,var(--spectrum-tooltip-pointer-corner-spacing)
)}:host([dir=rtl]) .spectrum-Tooltip--end #tip,:host([dir=rtl]) .spectrum-Tooltip--end-bottom #tip,:host([dir=rtl]) .spectrum-Tooltip--end-top #tip{clip-path:polygon(-5% 0,-5% 100%,100% 50%);left:100%;right:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
)*-1)}:host([dir=rtl]) .spectrum-Tooltip--start #tip,:host([dir=rtl]) .spectrum-Tooltip--start-bottom #tip,:host([dir=rtl]) .spectrum-Tooltip--start-top #tip{clip-path:polygon(0 50%,105% 100%,105% 0);left:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
)*-1);right:100%}::slotted([slot=icon]){align-self:flex-start;flex-shrink:0;height:var(--mod-tooltip-icon-height,var(--spectrum-tooltip-icon-height));margin-block-start:var(
--mod-tooltip-icon-spacing-block-start,var(--spectrum-tooltip-icon-spacing-block-start)
);margin-inline-end:var(
--mod-tooltip-icon-spacing-inline-end,var(--spectrum-tooltip-icon-spacing-inline-end)
);margin-inline-start:calc(var(
--mod-tooltip-icon-spacing-inline-start,
var(--spectrum-tooltip-icon-spacing-inline-start)
) - var(
--mod-tooltip-spacing-inline,
var(--spectrum-tooltip-spacing-inline)
));width:var(--mod-tooltip-icon-width,var(--spectrum-tooltip-icon-width))}#label{line-height:var(
--mod-tooltip-line-height,var(--spectrum-tooltip-line-height)
);margin-block-end:var(
--mod-tooltip-spacing-block-end,var(--spectrum-tooltip-spacing-block-end)
);margin-block-start:var(
--mod-tooltip-spacing-block-start,var(--spectrum-tooltip-spacing-block-start)
)}.spectrum-Tooltip--top-end,.spectrum-Tooltip--top-left,.spectrum-Tooltip--top-right,.spectrum-Tooltip--top-start,:host,:host([placement*=top]){margin-bottom:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--bottom-end,.spectrum-Tooltip--bottom-left,.spectrum-Tooltip--bottom-right,.spectrum-Tooltip--bottom-start,:host([placement*=bottom]){margin-top:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--right-bottom,.spectrum-Tooltip--right-top,:host([placement*=right]){margin-left:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--left-bottom,.spectrum-Tooltip--left-top,:host([placement*=left]){margin-right:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--start,.spectrum-Tooltip--start-bottom,.spectrum-Tooltip--start-top{margin-inline-end:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}.spectrum-Tooltip--end,.spectrum-Tooltip--end-bottom,.spectrum-Tooltip--end-top{margin-inline-start:calc(var(
--mod-tooltip-tip-block-size,
var(--spectrum-tooltip-tip-block-size)
) + var(--mod-tooltip-margin, var(--spectrum-tooltip-margin)))}:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--start,:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--start-bottom,:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--start-top{left:100%;right:auto}:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--end,:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--end-bottom,:host([dir=rtl]) .u-tooltip-showOnHover .spectrum-Tooltip--end-top{left:auto;right:100%}:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--start,:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--start-bottom,:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--start-top,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--start,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--start-bottom,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--start-top,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--start,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--start-bottom,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--start-top,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--start,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--start-bottom,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--start-top{transform:translate(var(
--mod-tooltip-animation-distance,var(--spectrum-tooltip-animation-distance)
),-50%)}:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--end,:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--end-bottom,:host([dir=rtl]) .u-tooltip-showOnHover :focus .spectrum-Tooltip--end-top,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--end,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--end-bottom,:host([dir=rtl]) .u-tooltip-showOnHover.is-focused .spectrum-Tooltip--end-top,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--end,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--end-bottom,:host([dir=rtl]) .u-tooltip-showOnHover:focus .spectrum-Tooltip--end-top,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--end,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--end-bottom,:host([dir=rtl]) .u-tooltip-showOnHover:hover .spectrum-Tooltip--end-top{transform:translate(calc(var(
--mod-tooltip-animation-distance,
var(--spectrum-tooltip-animation-distance)
)*-1),-50%)}:host{--spectrum-tooltip-backgound-color-default-neutral:var(
--system-spectrum-tooltip-backgound-color-default-neutral
)}:host([placement]) #tip[style]{transform:none}
`,Ji=Object.defineProperty,ts=Object.getOwnPropertyDescriptor,es=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?ts(e,r):e,a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&Ji(e,r,s),s};class rs extends HTMLElement{disconnectedCallback(){this.dispatchEvent(new Event("disconnected"))}}customElements.define("tooltip-proxy",rs);const os=class extends i{constructor(){super(),this._tooltipId="sp-tooltip-describedby-helper-"+os.instanceCount++,this.selfManaged=!1,this.offset=6,this.hadTooltipId=!1,this.open=!1,this.placement="top",this._variant="",this.abortOverlay=()=>{},this.openOverlay=()=>{const t=this.parentElement,e=new Promise((t=>{this.abortOverlay=t}));this.closeOverlayCallback=P(t,"hover",this,{abortPromise:e,offset:this.offset,placement:this.placement})},this.closeOverlay=async t=>{t&&"pointerleave"===t.type&&t.relatedTarget===this?this.addEventListener("pointerleave",(t=>{t.relatedTarget!==this.parentElement&&this.closeOverlay(t)}),{once:!0}):(this.abortOverlay&&this.abortOverlay(!0),this.closeOverlayCallback&&((await this.closeOverlayCallback)(),delete this.closeOverlayCallback))},this.addEventListener("sp-overlay-query",this.onOverlayQuery)}static get styles(){return[Qi]}get variant(){return this._variant}set variant(t){if(t!==this.variant){if(["info","positive","negative"].includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}onOverlayQuery(t){!t.target||t.target!==this||(t.detail.overlayContentTipElement=this.tipElement)}generateProxy(){this._proxy||(this._proxy=document.createElement("tooltip-proxy"),this._proxy.id=this._tooltipId,this._proxy.hidden=!0,this._proxy.slot="hidden-tooltip-content",this._proxy.setAttribute("role","tooltip"),this._proxy.addEventListener("disconnected",this.closeOverlay))}overlayWillOpenCallback({trigger:t}){this.setAttribute("aria-hidden","true"),this.generateProxy(),this._proxy.textContent=this.textContent;const e=t.getAttribute("aria-describedby")||"";this.hadTooltipId=e.search(this._tooltipId)>-1,this.insertAdjacentElement("beforebegin",this._proxy),!this.hadTooltipId&&(e?t.setAttribute("aria-describedby",`${e} ${this._tooltipId}`):t.setAttribute("aria-describedby",`${this._tooltipId}`))}overlayOpenCancelledCallback({trigger:t}){this.overlayCloseCallback({trigger:t})}overlayCloseCallback({trigger:t}){let e=(t.getAttribute("aria-describedby")||"").split(/\s+/);this.hadTooltipId||(e=e.filter((t=>t!==this._tooltipId))),e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby"),this.removeAttribute("aria-hidden"),this.removeProxy()}removeProxy(){this._proxy.remove()}manageTooltip(){const t=this.parentElement;this.selfManaged?(this.slot&&(this.previousSlot=this.slot),this.slot="self-managed-tooltip",t.addEventListener("pointerenter",this.openOverlay),t.addEventListener("focusin",this.openOverlay),t.addEventListener("pointerleave",this.closeOverlay),t.addEventListener("focusout",this.closeOverlay)):(this.previousSlot?this.slot=this.previousSlot:"self-managed-tooltip"===this.slot&&this.removeAttribute("slot"),t.removeEventListener("pointerenter",this.openOverlay),t.removeEventListener("focusin",this.openOverlay),t.removeEventListener("pointerleave",this.closeOverlay),t.removeEventListener("focusout",this.closeOverlay))}render(){return s`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `}async update(t){t.has("open")&&this.selfManaged&&(this.open?this.openOverlay():this.closeOverlay()),this.generateProxy(),super.update(t)}updated(t){super.updated(t),t.has("selfManaged")&&this.manageTooltip()}};let is=os;is.instanceCount=0,es([a({type:Boolean,attribute:"self-managed"})],is.prototype,"selfManaged",2),es([a({type:Number,reflect:!0})],is.prototype,"offset",2),es([a({type:Boolean,reflect:!0})],is.prototype,"open",2),es([a({reflect:!0})],is.prototype,"placement",2),es([z("#tip")],is.prototype,"tipElement",2),es([a({type:String})],is.prototype,"variant",1),customElements.define("sp-tooltip",is);
//# sourceMappingURL=53c2ceb6.js.map
