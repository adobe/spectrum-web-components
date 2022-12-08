import{f as t,F as e,R as r}from"./02250eff.js";import{r as o}from"./e50c5e8d.js";import{b as s,S as a,$ as i,e as c,w as l,s as n,y as d,l as u,x as p}from"./03cd2f8f.js";import{o as h,a as m,S as b,t as g,O as v,l as f,b as k,i as y,L as w,F as x}from"./f31c5733.js";import"./c1652ba1.js";import{o as z,f as T,P as C,k as P,a as B,h as S,r as I,S as q}from"./41cac7c6.js";import"./b2169d46.js";import{u as A,t as E,e as $,c as L,M as D,T as O,B as M,a as H}from"./e26a3480.js";import"./7235c432.js";import"./4878d6c7.js";import{e as U,i as j,t as F,r as _,a as R}from"./e08e07a4.js";import"./7d745a61.js";import{I as N}from"./13aece60.js";import"./01bf4a20.js";import{c as V,V as G}from"./6a9187bf.js";import"./0e4d751c.js";import"./64d6df74.js";import"./35b6e5dd.js";import"./7bc1d232.js";import"./a936f5ec.js";import"./792225f0.js";import"./a74a685d.js";import"./47debb83.js";import"./d3e78149.js";import"./ca83d1ce.js";const K=U(class extends j{constructor(t){var e;if(super(t),t.type!==F.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const o=t[r];return null==o?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.ct){this.ct=new Set;for(const t in e)this.ct.add(t);return this.render(e)}this.ct.forEach((t=>{null==e[t]&&(this.ct.delete(t),t.includes("-")?r.removeProperty(t):r[t]="")}));for(const t in e){const o=e[t];null!=o&&(this.ct.add(t),t.includes("-")?r.setProperty(t,o):r[t]=o)}return s}}),X=(t,e)=>{var r,o;const s=t._$AN;if(void 0===s)return!1;for(const t of s)null===(o=(r=t)._$AO)||void 0===o||o.call(r,e,!1),X(t,e);return!0},Y=t=>{let e,r;do{if(void 0===(e=t._$AM))break;r=e._$AN,r.delete(t),t=e}while(0===(null==r?void 0:r.size))},W=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(void 0===r)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),J(e)}};function Z(t){void 0!==this._$AN?(Y(this),this._$AM=t,W(this)):this._$AM=t}function Q(t,e=!1,r=0){const o=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(o))for(let t=r;t<o.length;t++)X(o[t],!1),Y(o[t]);else null!=o&&(X(o,!1),Y(o));else X(this,t)}const J=t=>{var e,r,o,s;t.type==F.CHILD&&(null!==(e=(o=t)._$AP)&&void 0!==e||(o._$AP=Q),null!==(r=(s=t)._$AQ)&&void 0!==r||(s._$AQ=Z))};class tt extends j{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),W(this),this.isConnected=t._$AU}_$AO(t,e=!0){var r,o;t!==this.isConnected&&(this.isConnected=t,t?null===(r=this.reconnected)||void 0===r||r.call(this):null===(o=this.disconnected)||void 0===o||o.call(this)),e&&(X(this,t),Y(this))}setValue(t){if(_(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}function et(t,e,r){return t?e():null==r?void 0:r()}function rt(t){return"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.platform)}function ot(){return rt(/^iPhone/)}function st(){return rt(/^iPad/)||rt(/^Mac/)&&navigator.maxTouchPoints>1}function at(){return function(t){return"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.userAgent)}(/Android/)}var it=o`
:host([disabled]) ::slotted([slot=trigger]){pointer-events:none}#overlay-content slot{display:none}
`,ct=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,nt=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?lt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ct(e,r,a),a};const dt={touch:"Double tap and long press for additional options",keyboard:"Press Space or Alt+Down Arrow for additional options",mouse:"Click and hold for additional options"},ut=class extends a{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1,this.hasLongpressContent=!1,this._longpressId="longpress-describedby-descriptor",this.abortOverlay=()=>{},this.openStatePromise=Promise.resolve()}static get styles(){return[it]}handleClose(t){t&&t.detail.interaction!==this.open&&t.detail.interaction!==this.type||this.removeAttribute("open")}render(){return i`
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
        `}updated(t){super.updated(t),this.disabled&&t.has("disabled")?this.closeAllOverlays():(t.has("open")&&this.manageOpen(),t.has("hasLongpressContent")&&this.manageLongpressDescriptor())}manageLongpressDescriptor(){const t=this.querySelector('[slot="trigger"]'),e=t.getAttribute("aria-describedby");let r=e?e.split(/\s+/):[];if(this.hasLongpressContent){this.longpressDescriptor||(this.longpressDescriptor=document.createElement("div"),this.longpressDescriptor.id=this._longpressId,this.longpressDescriptor.slot=this._longpressId);const t=ot()||st()||at()?"touch":"keyboard";this.longpressDescriptor.textContent=dt[t],this.appendChild(this.longpressDescriptor),r.push(this._longpressId)}else this.longpressDescriptor&&this.longpressDescriptor.remove(),r=r.filter((t=>t!==this._longpressId));r.length?t.setAttribute("aria-describedby",r.join(" ")):t.removeAttribute("aria-describedby")}closeAllOverlays(){this.abortOverlay&&this.abortOverlay(!0),["closeClickOverlay","closeHoverOverlay","closeLongpressOverlay"].forEach((async t=>{const e=this[t];null!=e&&(delete this[t],(await e)())})),this.overlaidContent=void 0}manageOpen(){var t;({click:()=>this.onTriggerClick(),hover:()=>this.onTriggerMouseEnter(),longpress:()=>this.onTriggerLongpress(),none:()=>this.closeAllOverlays()})[null!=(t=this.open)?t:"none"]()}async openOverlay(t,e,r,o){return this.openStatePromise=new Promise((t=>this.openStateResolver=t)),this.addEventListener("sp-opened",(()=>{this.openStateResolver()}),{once:!0}),this.overlaidContent=r,ut.openOverlay(t,e,r,o)}get overlayOptions(){return{offset:this.offset,placement:this.placement,receivesFocus:this.type&&"inline"!==this.type&&"hover"!==this.open?"auto":void 0}}onTrigger(t){if("mouseleave"===t.type&&"hover"===this.open&&t.relatedTarget===this.overlaidContent&&this.overlaidContent)this.overlaidContent.addEventListener("mouseleave",(t=>{t.relatedTarget!==this.targetContent&&this.onTrigger(t)}),{once:!0});else if(!this.disabled)switch(t.type){case"mouseenter":case"focusin":return void(!this.open&&this.hoverContent&&(this.open="hover"));case"mouseleave":case"focusout":return void("hover"===this.open&&this.handleClose());case"click":return void(this.clickContent&&(this.open=t.type));case"longpress":return void(this.longpressContent&&(this._longpressEvent=t,this.open=t.type))}}prepareToFocusOverlayContent(e){"modal"===this.type&&(t(e)||(e.tabIndex=0))}async onTriggerClick(){if(!this.targetContent||!this.clickContent||this.closeClickOverlay)return;const{targetContent:t,clickContent:e}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(e),this.closeClickOverlay=this.openOverlay(t,this.type?this.type:"click",e,this.overlayOptions)}async onTriggerLongpress(){var t,e;if(!this.targetContent||!this.longpressContent||this.closeLongpressOverlay)return;const{targetContent:r,longpressContent:o}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(o);const s="keyboard"!==(null==(e=null==(t=this._longpressEvent)?void 0:t.detail)?void 0:e.source);this.closeLongpressOverlay=this.openOverlay(r,this.type?this.type:"longpress",o,{...this.overlayOptions,receivesFocus:"auto",notImmediatelyClosable:s}),this._longpressEvent=void 0}async onTriggerMouseEnter(){if(!this.targetContent||!this.hoverContent||this.closeHoverOverlay)return;const t=new Promise((t=>{this.abortOverlay=t})),{targetContent:e,hoverContent:r}=this;this.closeHoverOverlay=this.openOverlay(e,"hover",r,{abortPromise:t,...this.overlayOptions})}onClickSlotChange(t){this.clickContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onLongpressSlotChange(t){this.longpressContent=this.extractSlotContentFromEvent(t),this.hasLongpressContent=!!this.longpressContent||!!this.closeLongpressOverlay,this.manageOpen()}onHoverSlotChange(t){this.hoverContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onTargetSlotChange(t){this.targetContent=this.extractSlotContentFromEvent(t)}extractSlotContentFromEvent(t){return t.target.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.openStatePromise,t}disconnectedCallback(){this.closeAllOverlays(),super.disconnectedCallback()}};let pt=ut;pt.openOverlay=async(t,e,r,o)=>z(t,e,r,o),nt([c({reflect:!0})],pt.prototype,"placement",2),nt([c()],pt.prototype,"type",2),nt([c({type:Number,reflect:!0})],pt.prototype,"offset",2),nt([c({reflect:!0})],pt.prototype,"open",2),nt([c({type:Boolean,reflect:!0})],pt.prototype,"disabled",2),nt([R()],pt.prototype,"hasLongpressContent",2);var ht=o`
:host{--spectrum-accordion-item-title-padding-y:var(
--spectrum-global-dimension-size-150
);--spectrum-accordion-animation-duration:var(
--spectrum-global-animation-duration-100,130ms
)}:host{display:block;list-style:none;margin:0;padding:0}
`,mt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,gt=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?bt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&mt(e,r,a),a};class vt extends a{constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new e(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:t=>!t.disabled})}static get styles(){return[ht]}get items(){return[...this.defaultNodes||[]].filter((t=>void 0!==t.tagName))}focus(){this.focusGroupController.focus()}async onToggle(t){const e=t.target;if(await 0,this.allowMultiple||t.defaultPrevented)return;const r=[...this.items];r&&!r.length||r.forEach((t=>{t!==e&&(t.open=!1)}))}handleSlotchange(){this.focusGroupController.clearElementCache()}render(){return i`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}gt([c({type:Boolean,reflect:!0,attribute:"allow-multiple"})],vt.prototype,"allowMultiple",2),gt([h()],vt.prototype,"defaultNodes",2),customElements.define("sp-accordion",vt);var ft=o`
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
`,kt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,wt=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?yt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&kt(e,r,a),a};class xt extends m{constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1}static get styles(){return[ft,T]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return i`
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
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}wt([c({type:Boolean,reflect:!0})],xt.prototype,"open",2),wt([c({type:String,reflect:!0})],xt.prototype,"label",2),wt([c({type:Boolean,reflect:!0})],xt.prototype,"disabled",2),customElements.define("sp-accordion-item",xt);var zt=o`
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
`,Tt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,Pt=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ct(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Tt(e,r,a),a};const Bt=["sticky","fixed"];class St extends a{constructor(){super(...arguments),this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[zt]}set variant(t){if(t!==this.variant){if(Bt.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}render(){return i`
            <sp-popover ?open=${this.open} id="popover">
                <slot></slot>
            </sp-popover>
        `}}Pt([c({type:Boolean,reflect:!0})],St.prototype,"flexible",2),Pt([c({type:Boolean,reflect:!0})],St.prototype,"open",2),Pt([c({type:String,reflect:!0})],St.prototype,"variant",1),customElements.define("sp-action-bar",St);var It=o`
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
)}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([compact][vertical]:not([quiet])){gap:var(
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
`,qt=Object.defineProperty,At=Object.getOwnPropertyDescriptor,Et=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?At(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&qt(e,r,a),a};const $t=[];class Lt extends(b(a,{validSizes:["xs","s","m","l","xl"]})){constructor(){super(),this._buttons=[],this._buttonSelector="sp-action-button",this.rovingTabindexController=new r(this,{focusInIndex:t=>{let e=-1;const r=t.findIndex(((r,o)=>(!t[e]&&!r.disabled&&(e=o),r.selected&&!r.disabled)));return t[r]?r:e},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this._selected=$t,this.manageButtons=()=>{const t=this.shadowRoot.querySelector("slot");if(!t)return;const e=t.assignedElements({flatten:!0}).reduce(((t,e)=>{if(e.matches(this._buttonSelector))t.push(e);else{const r=Array.from(e.querySelectorAll(`:scope > ${this._buttonSelector}`));t.push(...r)}return t}),[]);this.buttons=e;const r=[];this.buttons.forEach((t=>{t.selected&&r.push(t.value)})),this.setSelected(this.selected.concat(r)),this.manageChildren(),this.manageSelects()},new g(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons()}})}static get styles(){return[It]}set buttons(t){t!==this.buttons&&(this._buttons=t,this.rovingTabindexController.clearElementCache())}get buttons(){return this._buttons}set selected(t){this.requestUpdate("selected",this._selected),this._selected=t,this.updateComplete.then((()=>{this.applySelects(),this.manageChildren()}))}get selected(){return this._selected}dispatchChange(t){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(t),this.buttons.map((t=>{t.selected=this.selected.includes(t.value)})))}setSelected(t,e){if(t===this.selected)return;const r=this.selected;this.requestUpdate("selected",r),this._selected=t,e&&this.dispatchChange(r)}focus(t){this.rovingTabindexController.focus(t)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute("aria-checked","false")}))}handleClick(t){const e=t.target;if(void 0!==e.value)switch(this.selects){case"single":this.deselectSelectedButtons(),e.selected=!0,e.tabIndex=0,e.setAttribute("aria-checked","true"),this.setSelected([e.value],!0),e.focus();break;case"multiple":{const t=[...this.selected];e.selected=!e.selected,e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected?t.push(e.value):t.splice(this.selected.indexOf(e.value),1),this.setSelected(t,!0),this.buttons.forEach((t=>{t.tabIndex=-1})),e.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0)}async manageSelects(t){if(!this.buttons.length)return;const e=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("role","radio"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&r.push(t)}));if(t)break;await Promise.all(o);const s=r.map((t=>t.value));this.setSelected(s||$t);break}case"multiple":{this.setAttribute("role","group");const r=[],o=[],s=e.map((async t=>{await t.updateComplete,t.setAttribute("role","checkbox"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&(r.push(t.value),o.push(t))}));if(t)break;await Promise.all(s);const a=r.length?r:$t;this.setSelected(a);break}default:if(!this.selected.length){this.buttons.forEach((t=>{t.setAttribute("role","button")})),this.removeAttribute("role");break}{const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("aria-checked",t.selected?"true":"false"),t.setAttribute("role","button"),t.selected&&r.push(t)}));if(t)break;await Promise.all(o),this.setSelected(r.map((t=>t.value)))}}}render(){return i`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}updated(t){super.updated(t),t.has("selects")&&(this.manageSelects(),this.manageChildren()),(t.has("quiet")&&this.quiet||t.has("emphasized")&&this.emphasized||t.has("size")&&this.size)&&this.manageChildren(),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(){this.buttons.forEach((t=>{t.quiet=this.quiet,t.emphasized=this.emphasized,t.selected=this.selected.includes(t.value),t.size=this.size}))}}Et([c({type:Boolean,reflect:!0})],Lt.prototype,"compact",2),Et([c({type:Boolean,reflect:!0})],Lt.prototype,"emphasized",2),Et([c({type:Boolean,reflect:!0})],Lt.prototype,"justified",2),Et([c({type:String})],Lt.prototype,"label",2),Et([c({type:Boolean,reflect:!0})],Lt.prototype,"quiet",2),Et([c({type:String})],Lt.prototype,"selects",2),Et([c({type:Boolean,reflect:!0})],Lt.prototype,"vertical",2),Et([c({type:Array})],Lt.prototype,"selected",1),customElements.define("sp-action-group",Lt);var Dt=o`
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
`,Ot=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor;class Ht extends(v(C,"label")){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[Dt]}get hasLabel(){return this.slotHasContent}get buttonContent(){return[i`
                <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel}>
                    <sp-icon-more class="icon"></sp-icon-more>
                </slot>
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
            `]}render(){return i`
            <sp-action-button
                quiet
                ?selected=${this.open}
                aria-haspopup="true"
                aria-controls="popover"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${f(this.label||void 0)}
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
        `}update(t){t.has("invalid")&&(this.invalid=!1),this.quiet=!0,super.update(t)}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?Mt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&Ot(e,r,a)})([c({type:String})],Ht.prototype,"selects",2),customElements.define("sp-action-menu",Ht);var Ut=o`
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
`,jt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,_t=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ft(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&jt(e,r,a),a};class Rt extends a{constructor(){super(...arguments),this.label=""}static get styles(){return[Ut]}render(){return"file"===this.variant?(t=>i`
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
`)(this.label):"folder"===this.variant?(t=>i`
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
`)(this.label):i`
            <slot></slot>
        `}}_t([c({type:String,reflect:!0})],Rt.prototype,"variant",2),_t([c()],Rt.prototype,"label",2),customElements.define("sp-asset",Rt);var Nt=o`
:host([size="50"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-50-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-50-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-50-width,var(--spectrum-alias-avatar-size-50)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-50-height,var(--spectrum-alias-avatar-size-50)
)}:host([size="75"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-75-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-75-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-75-width,var(--spectrum-alias-avatar-size-75)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-75-height,var(--spectrum-alias-avatar-size-75)
)}:host([size="100"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-100-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-100-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-100-width,var(--spectrum-alias-avatar-size-100)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-100-height,var(--spectrum-alias-avatar-size-100)
)}:host([size="200"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-200-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-200-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-200-width,var(--spectrum-alias-avatar-size-200)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-200-height,var(--spectrum-alias-avatar-size-200)
)}:host([size="300"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-300-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-300-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-300-width,var(--spectrum-alias-avatar-size-300)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-300-height,var(--spectrum-alias-avatar-size-300)
)}:host([size="400"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-400-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-400-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-400-width,var(--spectrum-alias-avatar-size-400)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-400-height,var(--spectrum-alias-avatar-size-400)
)}:host([size="500"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-500-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-500-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-500-width,var(--spectrum-alias-avatar-size-500)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-500-height,var(--spectrum-alias-avatar-size-500)
)}:host([size="600"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-600-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-600-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-600-width,var(--spectrum-alias-avatar-size-600)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-600-height,var(--spectrum-alias-avatar-size-600)
)}:host([size="700"]){--spectrum-avatar-border-radius:var(
--spectrum-avatar-size-700-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-avatar-border-size:var(
--spectrum-avatar-size-700-border-size,var(--spectrum-alias-avatar-border-size)
);--spectrum-avatar-width:var(
--spectrum-avatar-size-700-width,var(--spectrum-alias-avatar-size-700)
);--spectrum-avatar-height:var(
--spectrum-avatar-size-700-height,var(--spectrum-alias-avatar-size-700)
)}:host{-webkit-user-drag:none;border-radius:var(--spectrum-avatar-border-radius);border-width:0;display:inline-block;height:var(--spectrum-avatar-height);position:relative;-webkit-user-select:none;user-select:none;width:var(--spectrum-avatar-width)}:host([dir=ltr]):after{left:0}:host([dir=rtl]):after{right:0}:host([dir=ltr]):after{right:0}:host([dir=rtl]):after{left:0}:host:after{border-radius:var(--spectrum-avatar-border-radius);border-style:solid;border-width:var(--spectrum-avatar-border-size);bottom:0;box-sizing:border-box;content:"";position:absolute;top:0}.image{height:var(--spectrum-avatar-height);width:var(--spectrum-avatar-width)}:host{opacity:var(
--spectrum-avatar-size-100-opacity,var(--spectrum-global-color-opacity-100)
)}:host:after{border-color:var(
--spectrum-avatar-size-100-border-color,var(--spectrum-alias-avatar-border-color-default)
)}:host([disabled]){opacity:var(
--spectrum-avatar-size-100-opacity-disabled,var(--spectrum-global-color-opacity-30)
)}@media (forced-colors:active){:host([disabled]){opacity:1;outline:2px solid GrayText}}:host{overflow:hidden}img{vertical-align:top}
`,Vt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,Kt=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Gt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Vt(e,r,a),a};const Xt=[50,75,100,200,300,400,500,600,700],Yt=Xt[2];class Wt extends a{constructor(){super(...arguments),this.label="",this.src="",this._size=Yt}static get styles(){return[Nt]}get size(){return this._size}set size(t){const e=t,r=Xt.includes(e)?e:Yt;if(r&&this.setAttribute("size",`${r}`),this._size===r)return;const o=this._size;this._size=r,this.requestUpdate("size",o)}render(){return i`
            <img
                class="image"
                alt=${f(this.label||void 0)}
                src=${this.src}
            />
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}Kt([c()],Wt.prototype,"label",2),Kt([c()],Wt.prototype,"src",2),Kt([c({type:Number,reflect:!0})],Wt.prototype,"size",1),customElements.define("sp-avatar",Wt);var Zt=o`
:host{--spectrum-badge-corner-radius:var(
--spectrum-corner-radius-100
);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-badge-label-icon-color-white:var(--spectrum-white);--spectrum-badge-label-icon-color-black:var(--spectrum-black);--spectrum-badge-background-color-default:var(
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
`,Qt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,te=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Jt(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Qt(e,r,a),a};class ee extends(b(v(k(a,'[slot="icon"]'),""))){constructor(){super(...arguments),this.variant="informative"}static get styles(){return[Zt]}get fixed(){return this._fixed}set fixed(t){if(t===this.fixed)return;const e=this.fixed;this._fixed=t,t?this.setAttribute("fixed",t):this.removeAttribute("fixed"),this.requestUpdate("fixed",e)}get hasIcon(){return this.slotContentIsPresent}render(){return i`
            ${this.hasIcon?i`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:i``}
            <div class="label">
                <slot></slot>
            </div>
        `}}te([c({reflect:!0})],ee.prototype,"fixed",1),te([c({type:String,reflect:!0})],ee.prototype,"variant",2),customElements.define("sp-badge",ee);var re=o`
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
`,oe=Object.defineProperty,se=Object.getOwnPropertyDescriptor,ae=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?se(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&oe(e,r,a),a};class ie extends a{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[re]}render(){return i`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `}}ae([c({reflect:!0,type:String})],ie.prototype,"type",2),ae([c({reflect:!0,type:Boolean})],ie.prototype,"corner",2),customElements.define("sp-banner",ie);var ce=o`
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
`,le=Object.defineProperty,ne=Object.getOwnPropertyDescriptor;class de extends(b(a)){constructor(){super(...arguments),this.vertical=!1}static get styles(){return[ce]}handleSlotchange({target:t}){t.assignedElements().forEach((t=>{t.size=this.size}))}render(){return i`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?ne(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&le(e,r,a)})([c({type:Boolean,reflect:!0})],de.prototype,"vertical",2),customElements.define("sp-button-group",de);var ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,he=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?pe(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ue(e,r,a),a};class me extends m{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}get focusElement(){return this.inputElement}handleChange(){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const t=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(t)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return i`
            <input
                id="input"
                aria-labelledby="label"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}he([c({type:Boolean,reflect:!0})],me.prototype,"checked",2),he([c({type:Boolean,reflect:!0})],me.prototype,"readonly",2),he([y("#input")],me.prototype,"inputElement",2);var be=o`
:host{--spectrum-checkbox-content-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-checkbox-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-checkbox-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-checkbox-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-checkbox-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-checkbox-content-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-checkbox-control-color-disabled:var(--spectrum-gray-400);--spectrum-checkbox-checkmark-color:var(--spectrum-gray-75);--spectrum-checkbox-invalid-color-default:var(
--spectrum-negative-color-900
);--spectrum-checkbox-invalid-color-hover:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-invalid-color-down:var(--spectrum-negative-color-1100);--spectrum-checkbox-invalid-color-focus:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-emphasized-color-default:var(
--spectrum-accent-color-900
);--spectrum-checkbox-emphasized-color-hover:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-emphasized-color-down:var(
--spectrum-accent-color-1100
);--spectrum-checkbox-emphasized-color-focus:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-line-height:var(--spectrum-line-height-100);--spectrum-checkbox-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-control-corner-radius:var(--spectrum-corner-radius-75);--spectrum-checkbox-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-checkbox-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-checkbox-border-width:var(--spectrum-border-width-200);--spectrum-checkbox-selected-border-width:calc(var(--spectrum-checkbox-control-size)/2);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100);--spectrum-checkbox-animation-duration:var(
--spectrum-animation-duration-100
)}:host([size=s]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-75
);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-small
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host([size=m]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-100
);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=l]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-200
);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-300
);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-extra-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-300)}:host{align-items:flex-start;color:var(
--highcontrast-checkbox-content-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);max-inline-size:100%;min-block-size:var(--mod-checkox-height,var(--spectrum-checkbox-height));position:relative}:host(:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-color-hover,var(--spectrum-checkbox-control-color-hover)
)
)}:host(:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host(:hover) #label{color:var(
--highcontrast-checkbox-content-color-hover,var(
--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)
)
)}:host(:active) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)
)
)}:host(:active) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)
)
)}:host(:active) #label{color:var(
--highcontrast-checkbox-content-color-down,var(
--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)
)
)}:host([invalid][dir]) #box:before,:host([invalid][dir]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
)}:host([invalid]) #input.focus-visible+#box:before,:host([invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid]) #input:focus-visible+#box:before,:host([invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid]:hover) #box:before,:host([invalid][dir]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([readonly]){border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]:active) #box:before{border-color:var(
--highcontrast-checkbox-selected-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);forced-color-adjust:none}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{display:block;opacity:1;transform:scale(1)}:host([indeterminate]:hover) #box:before,:host([indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host([invalid][indeterminate]) #input:checked+#box:before,:host([invalid][indeterminate][size]) #box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([invalid][indeterminate]:hover) #box:before,:host([invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][indeterminate]:hover) #label{color:var(
--highcontrast-checkbox-content-color-hover,var(
--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)
)
)}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-default,var(--spectrum-checkbox-emphasized-color-default)
)
)}:host([emphasized]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized]) #input.focus-visible+#box:before,:host([emphasized]) #input.focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized]) #input:focus-visible+#box:before,:host([emphasized]) #input:focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid]) #input:focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid]:hover) #input:checked+#box:before,:host([emphasized][invalid][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized]:active) #input:checked+#box:before,:host([emphasized][indeterminate]:active) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)
)
)}:host([emphasized][invalid]:active) #box:before,:host([emphasized][invalid]:active) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)
)
)}:host([emphasized].focus-visible) #box:before,:host([emphasized].focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized]:focus-visible) #box:before,:host([emphasized]:focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}#label{font-size:var(
--mod-checkbox-font-size,var(--spectrum-checkbox-font-size)
);line-height:var(
--mod-checkbox-line-height,var(--spectrum-checkbox-line-height)
);margin-block-start:var(
--mod-checkbox-top-to-text,var(--spectrum-checkbox-top-to-text)
);margin-inline-start:var(
--mod-checkbox-text-to-control,var(--spectrum-checkbox-text-to-control)
);text-align:start;transition:color var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#label:lang(js),#label:lang(ko),#label:lang(zh){line-height:var(
--mod-checkbox-line-height-cjk,var(--spectrum-checkbox-line-height-cjk)
)}#input{block-size:100%;box-sizing:border-box;color:var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
);cursor:pointer;font-family:inherit;font-size:100%;inline-size:100%;line-height:1.15;margin:0;opacity:.0001;overflow:visible;padding:0;position:absolute;z-index:1}#input:disabled{cursor:default}#input:checked+#box:before{background-color:var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
);border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}#input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input:focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input.focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#input:focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#box{--spectrum-checkbox-spacing:calc(var(--spectrum-checkbox-height) - var(--spectrum-checkbox-control-size));align-items:center;block-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);box-sizing:border-box;display:flex;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);justify-content:center;margin:calc(var(--mod-checkbox-spacing, var(--spectrum-checkbox-spacing))/2) 0;position:relative}#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
)
);border-radius:var(--spectrum-checkbox-control-corner-radius);border-style:solid;border-width:var(
--mod-checkbox-border-width,var(--spectrum-checkbox-border-width)
);box-sizing:border-box;content:"";display:block;forced-color-adjust:none;height:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);position:absolute;transition:border var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out;width:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);z-index:0}#box:after{border-radius:calc(var(--spectrum-checkbox-control-corner-radius) + var(--spectrum-checkbox-focus-indicator-gap));bottom:0;content:"";display:block;left:0;margin:var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
);position:absolute;right:0;top:0;transform:translate(0);transition:box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out,margin var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out}#checkmark,#partialCheckmark{color:var(
--highcontrast-checkbox-background-color-default,var(
--mode-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);opacity:0;transform:scale(0);transition:opacity var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,transform var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#partialCheckmark{display:none}#input:disabled+#box:before,:host([dir]) #input:checked:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-control-color-disabled,var(--spectrum-checkbox-control-color-disabled)
)
)}#input:checked:disabled~#label,#input:disabled~#label{color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-content-color-disabled,var(--spectrum-checkbox-content-color-disabled)
)
);forced-color-adjust:none}@media (forced-colors:active){#input.focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}#input:focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}:host{--highcontrast-checkbox-content-color-default:ButtonText;--highcontrast-checkbox-content-color-hover:ButtonText;--highcontrast-checkbox-content-color-down:ButtonText;--highcontrast-checkbox-content-color-focus:ButtonText;--highcontrast-checkbox-background-color-default:Background;--highcontrast-checkbox-color-default:ButtonText;--highcontrast-checkbox-color-hover:ButtonText;--highcontrast-checkbox-highlight-color-default:Highlight;--highcontrast-checkbox-highlight-color-hover:Highlight;--highcontrast-checkbox-highlight-color-down:Highlight;--highcontrast-checkbox-disabled-color-default:GrayText;--highcontrast-checkbox-highlight-color-focus:Highlight;--highcontrast-checkbox-focus-indicator-color:FieldText;--highcontrast-checkbox-color-focus:FieldText}}:host{--spectrum-checkbox-control-color-default:var(
--system-spectrum-checkbox-control-color-default
);--spectrum-checkbox-control-color-hover:var(
--system-spectrum-checkbox-control-color-hover
);--spectrum-checkbox-control-color-down:var(
--system-spectrum-checkbox-control-color-down
);--spectrum-checkbox-control-color-focus:var(
--system-spectrum-checkbox-control-color-focus
);--spectrum-checkbox-control-selected-color-default:var(
--system-spectrum-checkbox-control-selected-color-default
);--spectrum-checkbox-control-selected-color-hover:var(
--system-spectrum-checkbox-control-selected-color-hover
);--spectrum-checkbox-control-selected-color-down:var(
--system-spectrum-checkbox-control-selected-color-down
)}:host{display:inline-flex;vertical-align:top}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`;var ge=o`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Dash50{height:var(--spectrum-alias-ui-icon-dash-size-50);width:var(
--spectrum-alias-ui-icon-dash-size-50
)}.spectrum-UIIcon-Dash75{height:var(--spectrum-alias-ui-icon-dash-size-75);width:var(
--spectrum-alias-ui-icon-dash-size-75
)}.spectrum-UIIcon-Dash100{height:var(--spectrum-alias-ui-icon-dash-size-100);width:var(
--spectrum-alias-ui-icon-dash-size-100
)}.spectrum-UIIcon-Dash200{height:var(--spectrum-alias-ui-icon-dash-size-200);width:var(
--spectrum-alias-ui-icon-dash-size-200
)}.spectrum-UIIcon-Dash300{height:var(--spectrum-alias-ui-icon-dash-size-300);width:var(
--spectrum-alias-ui-icon-dash-size-300
)}.spectrum-UIIcon-Dash400{height:var(--spectrum-alias-ui-icon-dash-size-400);width:var(
--spectrum-alias-ui-icon-dash-size-400
)}.spectrum-UIIcon-Dash500{height:var(--spectrum-alias-ui-icon-dash-size-500);width:var(
--spectrum-alias-ui-icon-dash-size-500
)}.spectrum-UIIcon-Dash600{height:var(--spectrum-alias-ui-icon-dash-size-600);width:var(
--spectrum-alias-ui-icon-dash-size-600
)}
`,ve=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,ke=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?fe(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ve(e,r,a),a};const ye={s:i`
        <sp-icon-checkmark75
            id="checkmark"
            class="spectrum-UIIcon-Checkmark75"
        ></sp-icon-checkmark75>
    `,m:i`
        <sp-icon-checkmark100
            id="checkmark"
            class="spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `,l:i`
        <sp-icon-checkmark200
            id="checkmark"
            class="spectrum-UIIcon-Checkmark200"
        ></sp-icon-checkmark200>
    `,xl:i`
        <sp-icon-checkmark300
            id="checkmark"
            class="spectrum-UIIcon-Checkmark300"
        ></sp-icon-checkmark300>
    `},we={s:i`
        <sp-icon-dash75
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,m:i`
        <sp-icon-dash100
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,l:i`
        <sp-icon-dash200
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,xl:i`
        <sp-icon-dash300
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class xe extends(b(me)){constructor(){super(...arguments),this.indeterminate=!1,this.invalid=!1,this.emphasized=!1}static get styles(){return[be,A,ge]}render(){return i`
            ${super.render()}
            <span id="box">
                ${ye[this.size]}
                ${we[this.size]}
            </span>
            <label id="label"><slot></slot></label>
        `}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid")),t.has("indeterminate")&&(this.indeterminate?this.inputElement.setAttribute("aria-checked","mixed"):this.inputElement.removeAttribute("aria-checked"))}}ke([c({type:Boolean,reflect:!0})],xe.prototype,"indeterminate",2),ke([c({type:Boolean,reflect:!0})],xe.prototype,"invalid",2),ke([c({type:Boolean,reflect:!0})],xe.prototype,"emphasized",2),customElements.define("sp-checkbox",xe);var ze=o`
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
`,Te=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,Pe=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ce(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Te(e,r,a),a};class Be extends a{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[ze]}render(){return i`
            <slot></slot>
        `}}Pe([c({type:Boolean,reflect:!0})],Be.prototype,"opened",2),Pe([c({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],Be.prototype,"textOnly",2),customElements.define("sp-quick-actions",Be);var Se=o`
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
)}:host([variant=gallery].focus-visible),:host([variant=gallery][selected]),:host([variant=quiet].focus-visible),:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery]:focus-visible),:host([variant=gallery][selected]),:host([variant=quiet]:focus-visible),:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery].focus-visible) #preview,:host([variant=gallery][selected]) #preview,:host([variant=quiet].focus-visible) #preview,:host([variant=quiet][selected]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
)}:host([variant=gallery]:focus-visible) #preview,:host([variant=gallery][selected]) #preview,:host([variant=quiet]:focus-visible) #preview,:host([variant=quiet][selected]) #preview{background-color:var(
--spectrum-card-m-quiet-preview-background-color,var(--spectrum-global-color-gray-200)
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
`;var Ie=[E,$,o`
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
`],qe=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,Ee=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ae(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&qe(e,r,a),a};class $e extends(w(b(k(x(a),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"]}))){constructor(){super(...arguments),this.variant="standard",this._selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.value="",this.subheading="",this.handleFocusin=t=>{this.focused=!0,t.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[P,Ie,Se]}get selected(){return this._selected}set selected(t){t!==this.selected&&(this._selected=t,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var t;null==(t=this.likeAnchor)||t.click()}handleFocusout(t){this.focused=!1,t.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;switch(e){case"Space":if(this.toggleSelected(),this.toggles){t.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(t){t.stopPropagation(),this.selected=t.target.checked,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(t){this.href&&t.stopPropagation()}handlePointerdown(t){if(t.composedPath().some((t=>"a"===t.localName)))return;const e=+new Date,r=()=>{+new Date-e<200&&this.click(),this.removeEventListener("pointerup",r),this.removeEventListener("pointercancel",r)};this.addEventListener("pointerup",r),this.addEventListener("pointercancel",r)}get renderHeading(){return i`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return i`
            <sp-asset id="preview" variant=${f(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
        `}get renderCoverImage(){return i`
            <sp-asset id="cover-photo" variant=${f(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
        `}get images(){const t=[];return this.hasPreview&&t.push(this.renderPreviewImage),this.hasCoverPhoto&&t.push(this.renderCoverImage),t}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return i`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return i`
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${"gallery"===this.variant?this.renderSubtitleAndDescription:i``}
                    ${"quiet"!==this.variant||"s"!==this.size?i`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:i``}
                </div>
                ${"gallery"!==this.variant?i`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:i``}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):i``}
            ${"standard"===this.variant?i`
                      <slot name="footer"></slot>
                  `:i``}
            ${this.renderImage()}
            ${this.toggles?i`
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
                  `:i``}
            ${"quiet"===this.variant&&"s"===this.size?i`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:i``}
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}Ee([c()],$e.prototype,"asset",2),Ee([c({reflect:!0})],$e.prototype,"variant",2),Ee([c({type:Boolean,reflect:!0})],$e.prototype,"selected",1),Ee([c()],$e.prototype,"heading",2),Ee([c({type:Boolean,reflect:!0})],$e.prototype,"horizontal",2),Ee([y("#like-anchor")],$e.prototype,"likeAnchor",2),Ee([c({type:Boolean,reflect:!0})],$e.prototype,"focused",2),Ee([c({type:Boolean,reflect:!0})],$e.prototype,"toggles",2),Ee([c()],$e.prototype,"value",2),Ee([c()],$e.prototype,"subheading",2),customElements.define("sp-card",$e);var Le=o`
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
`,De=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,Me=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Oe(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&De(e,r,a),a};class He extends a{constructor(){super(...arguments),this.quiet=!1,this.variant=""}static get styles(){return[Le]}render(){return i`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}Me([c({type:Boolean,reflect:!0})],He.prototype,"quiet",2),Me([c({reflect:!0})],He.prototype,"variant",2),customElements.define("sp-coachmark",He);const Ue=["",()=>{}];const je=U(class extends tt{constructor(){super(...arguments),this.start=Ue,this.streamInside=Ue,this.end=Ue,this.streamOutside=Ue,this.state="off",this.handleStart=t=>{this.callHandler(this.start[1],t),!t.defaultPrevented&&(this.removeListeners(),this.addListeners("on"))},this.handleStream=t=>{this.callHandler(this.streamInside[1],t)},this.handleEnd=t=>{this.callHandler(this.end[1],t),this.removeListeners(),this.addListeners("off")},this.handleBetween=t=>{this.callHandler(this.streamOutside[1],t)}}render(t){return l}update(t,[{start:e,end:r,streamInside:o=Ue,streamOutside:s=Ue}]){var a;this.element!==t.element&&(this.element=t.element,this.removeListeners()),this.host=(null==(a=t.options)?void 0:a.host)||this.element,this.start=e,this.end=r,this.streamInside=o,this.streamOutside=s,this.addListeners()}addListeners(t){this.state=t||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleBetween),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleStream),this.addListener(this.end[0],this.handleEnd))}callHandler(t,e){"function"==typeof t?t.call(this.host,e):t.handleEvent(e)}addListener(t,e){Array.isArray(t)?t.map((t=>{this.element.addEventListener(t,e)})):this.element.addEventListener(t,e)}removeListener(t,e){Array.isArray(t)?t.map((t=>{this.element.removeEventListener(t,e)})):this.element.removeEventListener(t,e)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleStream),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleBetween)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}});var Fe=o`
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
`,_e=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,Ne=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Re(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&_e(e,r,a),a};class Ve extends a{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Fe]}render(){return i`
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
        `}}Ne([c({type:Boolean,reflect:!0})],Ve.prototype,"open",2),Ne([c({type:String})],Ve.prototype,"color",2),customElements.define("sp-color-loupe",Ve);var Ge=o`
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
`,Ke=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,Ye=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Xe(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Ke(e,r,a),a};class We extends a{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Ge]}handlePointerdown(t){"touch"===t.pointerType&&(this.open=!0),this.setPointerCapture(t.pointerId)}handlePointerup(t){this.open=!1,this.releasePointerCapture(t.pointerId)}render(){return i`
            <div class="color" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open&&!this.disabled}
            ></sp-color-loupe>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup)}}function Ze(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var r=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function Qe(t){return Math.min(1,Math.max(0,t))}function Je(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function tr(t){return t<=1?"".concat(100*Number(t),"%"):t}function er(t){return 1===t.length?"0"+t:String(t)}function rr(t,e,r){t=Ze(t,255),e=Ze(e,255),r=Ze(r,255);var o=Math.max(t,e,r),s=Math.min(t,e,r),a=0,i=0,c=(o+s)/2;if(o===s)i=0,a=0;else{var l=o-s;switch(i=c>.5?l/(2-o-s):l/(o+s),o){case t:a=(e-r)/l+(e<r?6:0);break;case e:a=(r-t)/l+2;break;case r:a=(t-e)/l+4}a/=6}return{h:a,s:i,l:c}}function or(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*r*(e-t):r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function sr(t,e,r){t=Ze(t,255),e=Ze(e,255),r=Ze(r,255);var o=Math.max(t,e,r),s=Math.min(t,e,r),a=0,i=o,c=o-s,l=0===o?0:c/o;if(o===s)a=0;else{switch(o){case t:a=(e-r)/c+(e<r?6:0);break;case e:a=(r-t)/c+2;break;case r:a=(t-e)/c+4}a/=6}return{h:a,s:l,v:i}}function ar(t,e,r,o){var s=[er(Math.round(t).toString(16)),er(Math.round(e).toString(16)),er(Math.round(r).toString(16))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0):s.join("")}function ir(t){return Math.round(255*parseFloat(t)).toString(16)}function cr(t){return lr(t)/255}function lr(t){return parseInt(t,16)}Ye([c({type:Boolean,reflect:!0})],We.prototype,"disabled",2),Ye([c({type:Boolean,reflect:!0})],We.prototype,"focused",2),Ye([c({type:Boolean,reflect:!0})],We.prototype,"open",2),Ye([c({type:String})],We.prototype,"color",2),customElements.define("sp-color-handle",We);var nr={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function dr(t){var e={r:0,g:0,b:0},r=1,o=null,s=null,a=null,i=!1,c=!1;return"string"==typeof t&&(t=function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var e=!1;if(nr[t])t=nr[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var r=mr.rgb.exec(t);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=mr.rgba.exec(t))return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=mr.hsl.exec(t))return{h:r[1],s:r[2],l:r[3]};if(r=mr.hsla.exec(t))return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=mr.hsv.exec(t))return{h:r[1],s:r[2],v:r[3]};if(r=mr.hsva.exec(t))return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=mr.hex8.exec(t))return{r:lr(r[1]),g:lr(r[2]),b:lr(r[3]),a:cr(r[4]),format:e?"name":"hex8"};if(r=mr.hex6.exec(t))return{r:lr(r[1]),g:lr(r[2]),b:lr(r[3]),format:e?"name":"hex"};if(r=mr.hex4.exec(t))return{r:lr(r[1]+r[1]),g:lr(r[2]+r[2]),b:lr(r[3]+r[3]),a:cr(r[4]+r[4]),format:e?"name":"hex8"};if(r=mr.hex3.exec(t))return{r:lr(r[1]+r[1]),g:lr(r[2]+r[2]),b:lr(r[3]+r[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(br(t.r)&&br(t.g)&&br(t.b)?(e=function(t,e,r){return{r:255*Ze(t,255),g:255*Ze(e,255),b:255*Ze(r,255)}}(t.r,t.g,t.b),i=!0,c="%"===String(t.r).substr(-1)?"prgb":"rgb"):br(t.h)&&br(t.s)&&br(t.v)?(o=tr(t.s),s=tr(t.v),e=function(t,e,r){t=6*Ze(t,360),e=Ze(e,100),r=Ze(r,100);var o=Math.floor(t),s=t-o,a=r*(1-e),i=r*(1-s*e),c=r*(1-(1-s)*e),l=o%6;return{r:255*[r,i,a,a,c,r][l],g:255*[c,r,r,i,a,a][l],b:255*[a,a,c,r,r,i][l]}}(t.h,o,s),i=!0,c="hsv"):br(t.h)&&br(t.s)&&br(t.l)&&(o=tr(t.s),a=tr(t.l),e=function(t,e,r){var o,s,a;if(t=Ze(t,360),e=Ze(e,100),r=Ze(r,100),0===e)s=r,a=r,o=r;else{var i=r<.5?r*(1+e):r+e-r*e,c=2*r-i;o=or(c,i,t+1/3),s=or(c,i,t),a=or(c,i,t-1/3)}return{r:255*o,g:255*s,b:255*a}}(t.h,o,a),i=!0,c="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=Je(r),{ok:i,format:t.format||c,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var ur="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),pr="[\\s|\\(]+(".concat(ur,")[,|\\s]+(").concat(ur,")[,|\\s]+(").concat(ur,")\\s*\\)?"),hr="[\\s|\\(]+(".concat(ur,")[,|\\s]+(").concat(ur,")[,|\\s]+(").concat(ur,")[,|\\s]+(").concat(ur,")\\s*\\)?"),mr={CSS_UNIT:new RegExp(ur),rgb:new RegExp("rgb"+pr),rgba:new RegExp("rgba"+hr),hsl:new RegExp("hsl"+pr),hsla:new RegExp("hsla"+hr),hsv:new RegExp("hsv"+pr),hsva:new RegExp("hsva"+hr),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function br(t){return Boolean(mr.CSS_UNIT.exec(String(t)))}var gr=function(){function t(e,r){var o;if(void 0===e&&(e=""),void 0===r&&(r={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var s=dr(e);this.originalInput=e,this.r=s.r,this.g=s.g,this.b=s.b,this.a=s.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=r.format)&&void 0!==o?o:s.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=s.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,r=t.g/255,o=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=Je(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.toHsv=function(){var t=sr(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=sr(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.v);return 1===this.a?"hsv(".concat(e,", ").concat(r,"%, ").concat(o,"%)"):"hsva(".concat(e,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},t.prototype.toHsl=function(){var t=rr(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=rr(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.l);return 1===this.a?"hsl(".concat(e,", ").concat(r,"%, ").concat(o,"%)"):"hsla(".concat(e,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},t.prototype.toHex=function(t){return void 0===t&&(t=!1),ar(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,r,o,s){var a=[er(Math.round(t).toString(16)),er(Math.round(e).toString(16)),er(Math.round(r).toString(16)),er(ir(o))];return s&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(e,", ").concat(r,")"):"rgba(".concat(t,", ").concat(e,", ").concat(r,", ").concat(this.roundA,")")},t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(100*Ze(t,255)),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*Ze(t,255))};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+ar(this.r,this.g,this.b,!1),e=0,r=Object.entries(nr);e<r.length;e++){var o=r[e],s=o[0];if(t===o[1])return s}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var r=!1,o=this.a<1&&this.a>=0;return e||!o||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex4"===t&&(r=this.toHex8String(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l+=e/100,r.l=Qe(r.l),new t(r)},t.prototype.brighten=function(e){void 0===e&&(e=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-e/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-e/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-e/100*255))),new t(r)},t.prototype.darken=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l-=e/100,r.l=Qe(r.l),new t(r)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s-=e/100,r.s=Qe(r.s),new t(r)},t.prototype.saturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s+=e/100,r.s=Qe(r.s),new t(r)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var r=this.toHsl(),o=(r.h+e)%360;return r.h=o<0?360+o:o,new t(r)},t.prototype.mix=function(e,r){void 0===r&&(r=50);var o=this.toRgb(),s=new t(e).toRgb(),a=r/100;return new t({r:(s.r-o.r)*a+o.r,g:(s.g-o.g)*a+o.g,b:(s.b-o.b)*a+o.b,a:(s.a-o.a)*a+o.a})},t.prototype.analogous=function(e,r){void 0===e&&(e=6),void 0===r&&(r=30);var o=this.toHsl(),s=360/r,a=[this];for(o.h=(o.h-(s*e>>1)+720)%360;--e;)o.h=(o.h+s)%360,a.push(new t(o));return a},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var r=this.toHsv(),o=r.h,s=r.s,a=r.v,i=[],c=1/e;e--;)i.push(new t({h:o,s:s,v:a})),a=(a+c)%1;return i},t.prototype.splitcomplement=function(){var e=this.toHsl(),r=e.h;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var r=this.toRgb(),o=new t(e).toRgb();return new t({r:o.r+(r.r-o.r)*r.a,g:o.g+(r.g-o.g)*r.a,b:o.b+(r.b-o.b)*r.a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var r=this.toHsl(),o=r.h,s=[this],a=360/e,i=1;i<e;i++)s.push(new t({h:(o+i*a)%360,s:r.s,l:r.l}));return s},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}();const vr=/^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/,fr=/(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/,kr=/(^hs[v|l]a?\()\d{1,3}/,yr=(t,e)=>e?t.toHexString():t.toHex();class wr{constructor(t,{applyColorToState:e,extractColorFromState:r,maintains:o}){this.maintains="hue",this._hue=0,this.getColorProcesses={rgb:(t,e)=>e?t.toRgbString():t.toRgb(),prgb:(t,e)=>e?t.toPercentageRgbString():t.toPercentageRgb(),hex8:(t,e)=>e?t.toHex8String():t.toHex8(),name:t=>t.toName()||t.toRgbString(),hsl:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHslString().replace(kr,`$1${this.hue}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}}if(e)return t.toHslString().replace(fr,`$1${this.hue}$2${this.saturation}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}},hsv:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHsvString().replace(kr,`$1${this.hue}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}}if(e)return t.toHsvString().replace(fr,`$1${this.hue}$2${this.saturation}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}},hex:yr,hex3:yr,hex4:yr,hex6:yr},this._color=new gr({h:0,s:1,v:1}),this._previousColor=new gr({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.host=t,this.applyColorToState=e,this.extractColorFromState=r,this.maintains=o||this.maintains}setColorProcess(t,e,r,o){"hue"===this.maintains?this.setColorMaintainHue(t,e,r,o):"saturation"===this.maintains&&this.setColorMaintainSaturation(t,e,r,o)}setColorMaintainHue(t,e,r,o){const{h:s,s:a,v:i}=this._color.toHsv();let c;if(o&&r.startsWith("hs")){const t=vr.exec(e);if(null!==t){const[,e]=t;c=Number(e)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput;c=Object.values(e)[0]}this.hue=c||s,this.applyColorToState({h:s,s:a,v:i})}setColorMaintainSaturation(t,e,r,o){if(o&&r.startsWith("hs")){const t=vr.exec(e);if(null!==t){const[,e,r]=t;this.hue=Number(e),this.saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput,r=Object.values(e);this.hue=r[0],this.saturation=r[1]}else{const{h:e}=t.toHsv();this.hue=e}this.applyColorToState(t.toHsv())}applyColorFromState(){this._color=new gr(this.extractColorFromState(this))}get hue(){return this._hue}set hue(t){const e=Math.min(360,Math.max(0,t));if(e===this.hue)return;const r=this.hue,{s:o,v:s}=this._color.toHsv();this._color=new gr({h:e,s:o,v:s}),this._hue=e,this.host.requestUpdate("hue",r)}get value(){return this.color}get color(){return this.getColorProcesses[this._format.format||"hex"](this._color,this._format.isString)}set color(t){if(t===this.color)return;const e=this._color;this._color=new gr(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o},this.setColorProcess(this._color,t,r,o),this.host.requestUpdate("color",e)}getColor(t){return this._color[{hsl:"toHsl"}[t]]()}setColor(t){this._color=t;const e="string"==typeof this._color.originalInput||this._color.originalInput instanceof String;this.setColorProcess(this._color,t,this._color.format,e)}getHslString(){return this._color.toHslString()}savePreviousColor(){this._previousColor=this._color.clone()}restorePreviousColor(){this.setColor(this._previousColor)}}var xr=o`
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
`,zr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,Cr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Tr(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&zr(e,r,a),a};class Pr extends a{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.labelX="saturation",this.labelY="luminosity",this.colorController=new wr(this,{extractColorFromState:()=>({h:this.hue,s:this.x,v:1-this.y}),applyColorToState:({s:t,v:e})=>{this.x=t,this.y=1-e}}),this.activeAxis="x",this._x=1,this._y=0,this.step=.01,this.altered=0,this.activeKeys=new Set,this._pointerDown=!1}static get styles(){return[xr]}get hue(){return this.colorController.hue}set hue(t){this.colorController.hue=t}get value(){return this.colorController.color}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get x(){return this._x}set x(t){if(t===this.x)return;const e=this.x;this.inputX?(this.inputX.value=t.toString(),this._x=this.inputX.valueAsNumber):this._x=t,this.requestUpdate("x",e)}get y(){return this._y}set y(t){if(t===this.y)return;const e=this.y;this.inputY?(this.inputY.value=t.toString(),this._y=this.inputY.valueAsNumber):this._y=t,this.requestUpdate("y",e)}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),"x"===this.activeAxis?this.inputX.focus():this.inputY.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.focused=!1)}handleKeydown(t){const{code:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length,0===e.search("Arrow")&&(t.preventDefault(),this.activeKeys.add(e),this.handleKeypress())}handleKeypress(){let t=0,e=0;const r=Math.max(this.step,5*this.altered*this.step);this.activeKeys.forEach((o=>{switch(o){case"ArrowUp":e=-1*r;break;case"ArrowDown":e=1*r;break;case"ArrowLeft":t=-1*r;break;case"ArrowRight":t=1*r}})),0!=t?(this.activeAxis="x",this.inputX.focus()):0!=e&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+t,0)),this.y=Math.min(1,Math.max(this.y+e,0)),this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),(0!=t||0!=e)&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor())}handleKeyup(t){t.preventDefault();const{code:e}=t;this.activeKeys.delete(e)}handleInput(t){const{valueAsNumber:e,name:r}=t.target;this[r]=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){const[e,r]=this.calculateHandlePosition(t);this.x=e,this.y=r,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){t.preventDefault(),this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);const e=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),"mouse"===t.pointerType&&(this.focused=!1),e||this.colorController.restorePreviousColor()}calculateHandlePosition(t){if(!this.boundingClientRect)return[this.x,this.y];const e=this.boundingClientRect,r=e.left,o=e.top,s=t.clientX,a=t.clientY,i=e.width,c=e.height;return[Math.max(0,Math.min(1,(s-r)/i)),Math.max(0,Math.min(1,(a-o)/c))]}handleAreaPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}render(){var t,e;const{width:r=0,height:o=0}=this.boundingClientRect||{};return i`
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
                tabindex=${f(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style="transform: translate(${this.x*r}px, ${this.y*o}px);"
                ${je({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(super.updated(t),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),t.has("focused")&&this.focused){const t=this.inputX.parentElement,e=this.inputY.parentElement;if(!t.shadowRoot&&!e.shadowRoot){t.attachShadow({mode:"open"}),e.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,e.shadowRoot.innerHTML=r}}}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}Cr([c({type:Boolean,reflect:!0})],Pr.prototype,"disabled",2),Cr([c({type:Boolean,reflect:!0})],Pr.prototype,"focused",2),Cr([c({type:String})],Pr.prototype,"label",2),Cr([c({type:String,attribute:"label-x"})],Pr.prototype,"labelX",2),Cr([c({type:String,attribute:"label-y"})],Pr.prototype,"labelY",2),Cr([y(".handle")],Pr.prototype,"handle",2),Cr([c({type:Number})],Pr.prototype,"hue",1),Cr([c({type:String})],Pr.prototype,"value",1),Cr([c({type:String})],Pr.prototype,"color",1),Cr([c({attribute:!1})],Pr.prototype,"activeAxis",2),Cr([c({type:Number})],Pr.prototype,"x",1),Cr([c({type:Number})],Pr.prototype,"y",1),Cr([c({type:Number})],Pr.prototype,"step",2),Cr([y('[name="x"]')],Pr.prototype,"inputX",2),Cr([y('[name="y"]')],Pr.prototype,"inputY",2),customElements.define("sp-color-area",Pr);var Br=o`
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
`,Sr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,qr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ir(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Sr(e,r,a),a};class Ar extends m{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.vertical=!1,this.colorController=new wr(this,{applyColorToState:()=>{this.sliderHandlePosition=this.colorController.hue/360*100},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this.sliderHandlePosition=0,this.step=1,this._altered=0,this._pointerDown=!1}static get styles(){return[Br]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+r)),this.value=this.sliderHandlePosition/100*360,this.colorController.applyColorFromState(),0!=r&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.sliderHandlePosition=this.value/360*100,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.sliderHandlePosition=this.calculateHandlePosition(t),this.value=this.sliderHandlePosition/100*360,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.sliderHandlePosition;const e=this.boundingClientRect,r=this.vertical?e.top:e.left,o=this.vertical?t.clientY:t.clientX,s=this.vertical?e.height:e.width;return 100*Math.max(0,Math.min(1,(o-r)/s))}handleGradientPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}get handlePositionStyles(){return`${this.vertical?"top":"left"}: ${this.sliderHandlePosition}%`}render(){return i`
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
                tabindex=${f(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${je({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}qr([c({type:Boolean,reflect:!0})],Ar.prototype,"disabled",2),qr([c({type:Boolean,reflect:!0})],Ar.prototype,"focused",2),qr([y(".handle")],Ar.prototype,"handle",2),qr([c({type:String})],Ar.prototype,"label",2),qr([c({type:Boolean,reflect:!0})],Ar.prototype,"vertical",2),qr([c({type:Number})],Ar.prototype,"value",1),qr([c({type:Number,reflect:!0})],Ar.prototype,"sliderHandlePosition",2),qr([c({type:String})],Ar.prototype,"color",1),qr([c({type:Number})],Ar.prototype,"step",2),qr([y("input")],Ar.prototype,"input",2),customElements.define("sp-color-slider",Ar);var Er=o`
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
`,$r=Object.defineProperty,Lr=Object.getOwnPropertyDescriptor,Dr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Lr(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&$r(e,r,a),a};class Or extends m{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.step=1,this.colorController=new wr(this,{applyColorToState:()=>{},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this._altered=0,this._pointerDown=!1}static get styles(){return[Er]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.value=(360+this.value+r)%360,this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor()}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.value=this.calculateHandlePosition(t),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.value;const e=this.boundingClientRect,{width:r,height:o,left:s,top:a}=e,i=s+r/2,c=a+o/2,l=t.clientX-i,n=t.clientY-c;return(360+180*Math.atan2(n,l)/Math.PI+360)%360}handleGradientPointerdown(t){if(0!==t.button||t.target.classList.contains("innerCircle"))return;t.stopPropagation(),t.preventDefault();const{button:e,pointerId:r,pointerType:o}=t;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:e,pointerId:r,pointerType:o})),this.handlePointermove(t)}render(){const{width:t=160}=this.boundingClientRect||{},e=t/2,r=e-24,o=2*r,s=`path(evenodd, "M ${e} ${e} m -${e} 0 a ${e} ${e} 0 1 0 ${t} 0 a ${e} ${e} 0 1 0 -${t} 0 M ${e} ${e} m -${r} 0 a ${r} ${r} 0 1 0 ${o} 0 a ${r} ${r} 0 1 0 -${o} 0")`,a=`transform: translate(${(e-12.5)*Math.cos(this.value*Math.PI/180)}px, ${(e-12.5)*Math.sin(this.value*Math.PI/180)}px);`;return i`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div class="wheel" style="clip-path: ${s}"></div>
            </slot>

            <sp-color-handle
                tabindex=${f(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${a}
                ${je({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}Dr([c({type:Boolean,reflect:!0})],Or.prototype,"disabled",2),Dr([c({type:Boolean,reflect:!0})],Or.prototype,"focused",2),Dr([y(".handle")],Or.prototype,"handle",2),Dr([c({type:String})],Or.prototype,"label",2),Dr([c({type:Number})],Or.prototype,"step",2),Dr([c({type:Number})],Or.prototype,"value",1),Dr([c({type:String})],Or.prototype,"color",1),Dr([y("input")],Or.prototype,"input",2),customElements.define("sp-color-wheel",Or);var Mr=o`
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
);width:100%}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-bottom:calc(var(
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
);margin:0 var(--spectrum-dialog-confirm-description-margin);overflow-y:auto;padding:0 var(--spectrum-dialog-confirm-description-padding)}.content,.footer{outline:none}.footer{display:flex;flex-wrap:wrap;grid-area:footer;padding-top:var(--spectrum-dialog-confirm-footer-padding-top)}.footer>.button+.button,.footer>::slotted(*){margin-bottom:0}:host([dir=ltr]) .button-group{padding-left:var(
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
`,Hr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,jr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ur(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Hr(e,r,a),a};let Fr=0;function _r(t,e){const r=t.assignedElements(),o=[];return r.forEach((t=>{if(t.id)o.push(t.id);else{const r=e+"-"+Fr++;t.id=r,o.push(r)}})),o}const Rr=class extends(x(k(a,['[slot="hero"]','[slot="footer"]','[slot="button"]']))){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.noDivider=!1,this.shouldManageTabOrderForScrolling=()=>{const{offsetHeight:t,scrollHeight:e}=this.contentElement;t<e?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")},this.labelledbyId="sp-dialog-label-"+Rr.instanceCount++,this.describedbyId="sp-dialog-description-"+Rr.instanceCount++}static get styles(){return[Mr]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return i`
            <slot name="hero"></slot>
        `}renderHeading(){return i`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return i`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}renderFooter(){return i`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const t={"button-group":!0,"button-group--noFooter":!this.hasFooter};return i`
            <sp-button-group class=${B(t)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return i`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return i`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?i`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:l}
                ${this.noDivider?l:i`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():l}
                ${this.hasButtons?this.renderButtons():l}
                ${this.dismissable?this.renderDismiss():l}
            </div>
        `}shouldUpdate(t){return t.has("mode")&&!!this.mode&&(this.dismissable=!1),t.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(t)}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","dialog")}onHeadingSlotchange({target:t}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const e=_r(t,this.labelledbyId);e.length&&(this.conditionLabelledby=L(this,"aria-labelledby",e))}onContentSlotChange({target:t}){this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const e=_r(t,this.describedbyId);if(e.length&&e.length<4)this.conditionDescribedby=L(this,"aria-describedby",e);else if(!e.length){const t=!!this.id;t||(this.id=this.describedbyId);const e=L(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{e(),t||this.removeAttribute("id")}}}connectedCallback(){super.connectedCallback(),this.tabIndex=0,window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}};let Nr=Rr;Nr.instanceCount=0,jr([y(".close-button")],Nr.prototype,"closeButton",2),jr([y(".content")],Nr.prototype,"contentElement",2),jr([c({type:Boolean,reflect:!0})],Nr.prototype,"error",2),jr([c({type:Boolean,reflect:!0})],Nr.prototype,"dismissable",2),jr([c({type:Boolean,reflect:!0,attribute:"no-divider"})],Nr.prototype,"noDivider",2),jr([c({type:String,reflect:!0})],Nr.prototype,"mode",2),jr([c({type:String,reflect:!0})],Nr.prototype,"size",2),customElements.define("sp-dialog",Nr);var Vr=o`
:host{align-items:center;box-sizing:border-box;display:flex;height:100vh;height:-webkit-fill-available;height:-moz-available;height:stretch;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden;width:100vw;z-index:2}:host([open]){visibility:visible}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]){border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}:host([responsive]){margin-top:0}}
`,Gr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Xr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Kr(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Gr(e,r,a),a};class Yr extends(x(a)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[Vr,S]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const e=t(this.dialog);e?(e.updateComplete&&await e.updateComplete,e.focus(),this.removeAttribute("tabindex")):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){!this.dismissable||this.close()}handleClose(t){t.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(t){!this.open&&"visibility"===t.propertyName&&(this.resolveTransitionPromise(),this.dispatchClosed())}handleModalTransitionend(){(this.open||!this.underlay)&&(this.resolveTransitionPromise(),this.open||this.dispatchClosed())}update(t){t.has("open")&&void 0!==t.get("open")&&(this.animating=!0,this.transitionPromise=new Promise((t=>{this.resolveTransitionPromise=()=>{this.animating=!1,t()}}))),super.update(t)}renderDialog(){return i`
            <slot></slot>
        `}render(){return i`
            ${this.underlay?i`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                          @transitionend=${this.handleUnderlayTransitionend}
                      ></sp-underlay>
                  `:i``}
            <div
                class="modal ${this.mode}"
                @transitionend=${this.handleModalTransitionend}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(t){t.has("open")&&(this.open?"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()})):this.tabIndex=0)}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}Xr([c({type:Boolean,reflect:!0})],Yr.prototype,"dismissable",2),Xr([c({type:Boolean,reflect:!0})],Yr.prototype,"open",2),Xr([c({type:String,reflect:!0})],Yr.prototype,"mode",2),Xr([c({type:Boolean})],Yr.prototype,"responsive",2),Xr([c({type:Boolean})],Yr.prototype,"underlay",2),customElements.define("sp-dialog-base",Yr);var Wr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,Qr=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Zr(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Wr(e,r,a),a};class Jr extends Yr{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){const t=this.noDivider||!this.headline||"none"===this.headlineVisibility;return i`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${t}
                ?error=${this.error}
                mode=${f(this.mode)}
                size=${f(this.size)}
            >
                ${this.hero?i`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${f(this.heroLabel?void 0:"true")}
                              alt=${f(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:i``}
                ${this.headline?i`
                          <h2
                              slot="heading"
                              ?hidden=${"none"===this.headlineVisibility}
                          >
                              ${this.headline}
                          </h2>
                      `:i``}
                <slot></slot>
                ${this.footer?i`
                          <div slot="footer">${this.footer}</div>
                      `:i``}
                ${this.cancelLabel?i`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:i``}
                ${this.secondaryLabel?i`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:i``}
                ${this.confirmLabel?i`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:i``}
            </sp-dialog>
        `}}Qr([c({type:Boolean,reflect:!0})],Jr.prototype,"error",2),Qr([c({attribute:"cancel-label"})],Jr.prototype,"cancelLabel",2),Qr([c({attribute:"confirm-label"})],Jr.prototype,"confirmLabel",2),Qr([c()],Jr.prototype,"footer",2),Qr([c()],Jr.prototype,"hero",2),Qr([c({attribute:"hero-label"})],Jr.prototype,"heroLabel",2),Qr([c({type:Boolean,reflect:!0,attribute:"no-divider"})],Jr.prototype,"noDivider",2),Qr([c({type:String,reflect:!0})],Jr.prototype,"size",2),Qr([c({attribute:"secondary-label"})],Jr.prototype,"secondaryLabel",2),Qr([c()],Jr.prototype,"headline",2),Qr([c({type:String,attribute:"headline-visibility"})],Jr.prototype,"headlineVisibility",2),customElements.define("sp-dialog-wrapper",Jr);var to=o`
:host{border-radius:var(
--spectrum-dropzone-border-radius,var(--spectrum-alias-border-radius-regular)
);border-style:dashed;border-width:var(
--spectrum-dropzone-border-width,var(--spectrum-alias-border-size-thick)
);padding:var(
--spectrum-dropzone-padding,var(--spectrum-global-dimension-size-900)
);text-align:center}:host([dragged]){border-style:solid}:host(:focus){border-style:dashed;outline:0}:host(:focus.focus-visible){border-style:solid}:host(:focus:focus-visible){border-style:solid}:host{border-color:var(
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
)}:host(:focus:focus-visible){border-color:var(
--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400)
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
`,eo=Object.defineProperty,ro=Object.getOwnPropertyDescriptor;class oo extends a{constructor(){super(...arguments),this._dropEffect="copy",this.isDragged=!1,this.debouncedDragLeave=null}static get styles(){return[to]}get dropEffect(){return this._dropEffect}set dropEffect(t){["copy","move","link","none"].includes(t)&&(this._dropEffect=t)}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave)}onDragOver(t){const e=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:t}),r=this.dispatchEvent(e);if(!t.dataTransfer)return;if(!r)return void(t.dataTransfer.dropEffect="none");t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,t.dataTransfer.dropEffect=this.dropEffect;const o=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(o)}onDragLeave(t){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout((()=>{this.isDragged=!1;const e=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}),100)}onDrop(t){t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const e=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}render(){return i`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null)}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?ro(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&eo(e,r,a)})([c({type:Boolean,reflect:!0,attribute:"dragged"})],oo.prototype,"isDragged",2),customElements.define("sp-dropzone",oo);var so=o`
:host{--spectrum-fieldgroup-margin:var(
--spectrum-spacing-300
);--spectrum-fieldgroup-readonly-delimiter:"\\002c"}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{align-items:top;display:flex;flex-direction:column;flex-wrap:wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(
--spectrum-fieldgroup-margin
)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}.spectrum-Checkbox.is-readOnly .spectrum-Checkbox-box{display:none}.spectrum-Checkbox.is-readOnly:not(:last-child) .spectrum-Checkbox-label:after{content:var(
--spectrum-fieldgroup-readonly-delimiter
)}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`,ao=Object.defineProperty,io=Object.getOwnPropertyDescriptor,co=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?io(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ao(e,r,a),a};class lo extends(D(a,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[so]}handleSlotchange(){}render(){return i`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}co([c({type:Boolean,reflect:!0})],lo.prototype,"horizontal",2),co([c({type:Boolean,reflect:!0})],lo.prototype,"invalid",2),co([c()],lo.prototype,"label",2),co([c({type:Boolean,reflect:!0})],lo.prototype,"vertical",2),customElements.define("sp-field-group",lo);var no=Object.defineProperty,uo=Object.getOwnPropertyDescriptor;class po extends n{constructor(){super(...arguments),this.registered=!1,this.handleRemoved=({detail:t})=>{t.name===this.name&&(this.registered=!1,this.addIconset())}}firstUpdated(){this.style.display="none"}set name(t){this.registered&&(this._name&&N.getInstance().removeIconset(this._name),t&&N.getInstance().addIconset(t,this)),this._name=t}get name(){return this._name}connectedCallback(){super.connectedCallback(),this.addIconset(),window.addEventListener("sp-iconset-removed",this.handleRemoved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-removed",this.handleRemoved),this.removeIconset()}addIconset(){!this.name||this.registered||(N.getInstance().addIconset(this.name,this),this.registered=!0)}removeIconset(){!this.name||(N.getInstance().removeIconset(this.name),this.registered=!1)}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?uo(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&no(e,r,a)})([c()],po.prototype,"name",1);var ho=Object.defineProperty,mo=Object.getOwnPropertyDescriptor;class bo extends po{constructor(){super(...arguments),this.iconMap=new Map}updated(t){if(!this.slotContainer)return;const e=this.getSVGNodes(this.slotContainer);this.updateSVG(e),super.updated(t)}async applyIconToElement(t,e,r,o){await this.updateComplete;const s=this.iconMap.get(e);if(!s)throw new Error(`Unable to find icon ${e}`);const a=this.prepareSvgClone(s);a.setAttribute("role","img"),o?a.setAttribute("aria-label",o):a.setAttribute("aria-hidden","true"),t.shadowRoot?t.shadowRoot.appendChild(a):t.appendChild(a)}getIconList(){return[...this.iconMap.keys()]}prepareSvgClone(t){const e=t.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=e.getAttribute("viewBox")||"";for(r.style.cssText="pointer-events: none; display: block; width: 100%; height: 100%;",r.setAttribute("viewBox",o),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false");e.childNodes.length>0;)r.appendChild(e.childNodes[0]);return r}getSVGIconName(t){return t}getSanitizedIconName(t){return t}renderDefaultContent(){return i``}render(){return i`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `}updateSVG(t){t.reduce(((t,e)=>{const r=e.querySelectorAll("symbol");return t.push(...r),t}),[]).forEach((t=>{this.iconMap.set(this.getSanitizedIconName(t.id),t)}))}getSVGNodes(t){return t.assignedNodes({flatten:!0}).filter((t=>"svg"===t.nodeName))}onSlotChange(t){const e=t.target,r=this.getSVGNodes(e);this.updateSVG(r)}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?mo(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&ho(e,r,a)})([y("slot")],bo.prototype,"slotContainer",2);var go=d`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 14 14"><path d="M12.93 6.227L9.023 2.32a1.094 1.094 0 10-1.546 1.547l2.039 2.04H1.844a1.094 1.094 0 100 2.187h7.672l-2.04 2.039a1.094 1.094 0 001.547 1.547l3.907-3.907a1.093 1.093 0 000-1.546z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 16 16"><path d="M14.606 7.194l-4.458-4.459a1.14 1.14 0 10-1.612 1.612L11.05 6.86H2.108a1.14 1.14 0 000 2.28h8.942l-2.514 2.513a1.14 1.14 0 101.611 1.612l4.46-4.46a1.139 1.139 0 000-1.61z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 16 16"><path d="M15.364 7.161l-5.083-5.083a1.186 1.186 0 00-1.678 1.678l3.057 3.058H1.277a1.187 1.187 0 100 2.373H11.66l-3.056 3.057a1.186 1.186 0 101.677 1.678l5.083-5.083a1.185 1.185 0 000-1.678z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 18 18"><path d="M17.216 8.126l-5.79-5.79a1.236 1.236 0 00-1.746 1.75l3.683 3.683c-.008 0-.014-.004-.021-.004H1.337a1.236 1.236 0 000 2.472H13.34c.007 0 .013-.004.02-.004l-3.68 3.682a1.236 1.236 0 101.748 1.748l5.789-5.789a1.237 1.237 0 000-1.748zm-2.643.895c0-.008.004-.014.004-.021s-.004-.013-.004-.02l.02.02z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 22 22"><path d="M20.17 10.089l-6.585-6.585a1.289 1.289 0 00-1.822 1.822l4.386 4.386H2.276a1.288 1.288 0 000 2.576h13.873l-4.386 4.386a1.289 1.289 0 001.822 1.822l6.585-6.585a1.289 1.289 0 000-1.822z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 24 24"><path d="M22.24 11.052l-7.485-7.485a1.341 1.341 0 00-1.897 1.897l5.194 5.194H2.079a1.342 1.342 0 000 2.684h15.973l-5.194 5.194a1.341 1.341 0 101.897 1.897l7.484-7.485a1.34 1.34 0 000-1.896z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 12 12"><path d="M11.325 5.258L7.91 1.84a1.05 1.05 0 00-1.486 1.484L8.048 4.95H1.494a1.05 1.05 0 000 2.1h6.554L6.423 8.675a1.05 1.05 0 001.486 1.484l3.416-3.417a1.05 1.05 0 000-1.484z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 10 10"><path d="M8.176 8.281c.069.07.115.163 0 .255l-1.437.927c-.115.07-.161.024-.208-.092l-1.783-3.1-2.339 2.571c-.024.045-.093.091-.161 0L1.136 7.678c-.116-.069-.093-.139 0-.208l2.639-2.2-3.01-1.134c-.046 0-.115-.092-.07-.209l.788-1.574a.123.123 0 01.151-.083.128.128 0 01.058.038l2.639 1.713L4.494.64a.122.122 0 01.1-.139.172.172 0 01.038 0l1.922.255c.116 0 .139.046.116.163l-.9 3.31 3.057-.927c.069-.046.139-.046.185.092l.3 1.713c.023.116 0 .162-.093.162l-3.2.255z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 12 12"><path d="M9.575 9.696c.077.079.129.183 0 .287L7.96 11.025c-.129.079-.182.027-.234-.1L5.72 7.433l-2.633 2.893c-.027.051-.1.1-.182 0l-1.251-1.3c-.131-.077-.1-.156 0-.234l2.97-2.476-3.388-1.285c-.052 0-.129-.1-.079-.235l.886-1.771a.138.138 0 01.17-.093.144.144 0 01.065.042l2.97 1.928.183-3.8a.137.137 0 01.114-.156.197.197 0 01.042 0l2.163.287c.131 0 .156.052.131.183L6.86 5.136l3.44-1.043c.077-.052.156-.052.208.1l.339 1.928c.025.13 0 .183-.1.183l-3.6.287z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 12 12"><path d="M10.024 10.155c.087.089.146.206 0 .323l-1.819 1.173c-.146.089-.2.03-.263-.117L5.685 7.605l-2.962 3.254c-.03.057-.117.116-.2 0L1.116 9.392c-.147-.087-.117-.176 0-.263l3.339-2.785L.642 4.908c-.059 0-.146-.117-.089-.264l1-1.993a.156.156 0 01.192-.1.163.163 0 01.073.048l3.337 2.163.206-4.28a.155.155 0 01.128-.176.23.23 0 01.047 0l2.433.323c.147 0 .176.059.147.206l-1.144 4.19 3.87-1.173c.087-.06.176-.06.234.117l.381 2.169c.028.147 0 .206-.117.206l-4.046.323z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.825 6.903c.061.062.1.144 0 .227l-1.277.824c-.1.062-.143.02-.185-.082L3.78 5.112 1.7 7.398c-.021.04-.082.08-.143 0L.569 6.367c-.1-.061-.082-.123 0-.185l2.347-1.957-2.68-1.007c-.041 0-.1-.082-.062-.186l.7-1.4a.109.109 0 01.135-.073.114.114 0 01.051.033l2.347 1.523.145-3.006a.109.109 0 01.09-.123.14.14 0 01.033 0l1.709.227c.1 0 .123.04.1.144l-.8 2.943 2.718-.824c.061-.041.123-.041.165.082l.268 1.523c.02.1 0 .144-.082.144l-2.842.227z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 14 14"><path d="M5.125 12.625a1.25 1.25 0 01-.96-.45L1.04 8.425a1.25 1.25 0 011.92-1.6l2.136 2.563 5.922-7.536a1.25 1.25 0 111.964 1.545l-6.874 8.75a1.25 1.25 0 01-.965.478z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 14 14"><path d="M4.891 13.224a1.304 1.304 0 01-1.005-.474l-3.54-4.3a1.302 1.302 0 012.011-1.655l2.508 3.046 6.758-8.647a1.302 1.302 0 112.05 1.604l-7.756 9.926a1.301 1.301 0 01-1.01.5z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 16 16"><path d="M5.627 14.894a1.357 1.357 0 01-1.042-.488l-4.1-4.92A1.357 1.357 0 012.569 7.75l3.027 3.631L13.4 1.448a1.356 1.356 0 012.133 1.675l-8.84 11.252a1.356 1.356 0 01-1.048.519z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 18 18"><path d="M6.33 16.642a1.415 1.415 0 01-1.086-.509l-4.683-5.62a1.413 1.413 0 012.171-1.81l3.566 4.28 8.936-11.374a1.413 1.413 0 012.223 1.746L7.441 16.102a1.415 1.415 0 01-1.09.54z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 12 12"><path d="M4.519 10.608a1.151 1.151 0 01-.885-.414L1.27 7.358a1.152 1.152 0 011.77-1.476l1.453 1.743 4.45-5.665a1.152 1.152 0 011.813 1.424l-5.331 6.784a1.153 1.153 0 01-.89.44z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 20 20"><path d="M6.997 18.48a1.47 1.47 0 01-1.13-.53L.521 11.538a1.471 1.471 0 112.26-1.885l4.182 5.017L17.18 1.666a1.472 1.472 0 112.314 1.818L8.154 17.917a1.472 1.472 0 01-1.135.562z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 24 24"><path d="M8.621 21.417a1.535 1.535 0 01-1.178-.552l-6.091-7.31a1.533 1.533 0 112.355-1.962l4.879 5.854L20.249 2.602a1.533 1.533 0 112.41 1.895L9.826 20.831a1.53 1.53 0 01-1.182.585z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 12 12"><path d="M4.333 11.09a1.2 1.2 0 01-.922-.433L.69 7.392a1.2 1.2 0 111.844-1.536l1.772 2.126 5.14-6.542a1.2 1.2 0 111.886 1.482L5.277 10.63a1.2 1.2 0 01-.927.459z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 14 14"><path d="M4.5 13.25a1.094 1.094 0 01-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 015.273 1.07l5.157 5.156a1.094 1.094 0 010 1.546L5.273 12.93a1.091 1.091 0 01-.773.321z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 16 16"><path d="M5.123 15.005a1.14 1.14 0 01-.806-1.945L9.377 8l-5.06-5.06a1.14 1.14 0 011.612-1.61l5.865 5.864a1.139 1.139 0 010 1.612L5.929 14.67a1.135 1.135 0 01-.806.334z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 16 16"><path d="M4.696 15.853a1.187 1.187 0 01-.84-2.026L9.684 8 3.856 2.173A1.187 1.187 0 015.536.495L12.2 7.16a1.187 1.187 0 010 1.678l-6.666 6.666a1.183 1.183 0 01-.84.348z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 18 18"><path d="M5.213 17.805a1.236 1.236 0 01-.874-2.11L11.034 9 4.34 2.305A1.236 1.236 0 016.087.557l7.57 7.569a1.235 1.235 0 010 1.748l-7.57 7.569a1.232 1.232 0 01-.874.362z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 20 20"><path d="M5.667 19.876a1.288 1.288 0 01-.91-2.199L12.433 10 4.756 2.323A1.288 1.288 0 016.578.502l8.588 8.587a1.288 1.288 0 010 1.822l-8.588 8.588a1.284 1.284 0 01-.911.377z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 24 24"><path d="M7.05 23.078a1.341 1.341 0 01-.948-2.29L14.89 12 6.102 3.212a1.341 1.341 0 011.896-1.898l9.737 9.737a1.34 1.34 0 010 1.898l-9.737 9.737a1.335 1.335 0 01-.948.392z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 12 12"><path d="M3.833 11.578a1.05 1.05 0 01-.742-1.793L6.876 6 3.091 2.215A1.05 1.05 0 114.575.73l4.529 4.527a1.05 1.05 0 010 1.486L4.575 11.27a1.047 1.047 0 01-.742.308z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 7 7"><path d="M6.687.75a.311.311 0 00-.221.091L.842 6.466a.312.312 0 00.221.533h5.624a.312.312 0 00.312-.312V1.062A.312.312 0 006.687.75z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 8 8"><path d="M7.65.97a.35.35 0 00-.249.1L1.07 7.401a.352.352 0 00.249.6H7.65a.352.352 0 00.352-.352V1.322A.352.352 0 007.65.97z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 8 8"><path d="M7.605.09a.394.394 0 00-.28.116L.206 7.325A.4.4 0 00.49 8h7.115a.4.4 0 00.4-.4V.49a.4.4 0 00-.4-.4z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 6 6"><path d="M5.718.44a.277.277 0 00-.2.081l-5 5a.278.278 0 00.2.474h5a.278.278 0 00.278-.278v-5A.278.278 0 005.718.44z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 10 10"><path d="M6.548 5L9.63 1.917A1.094 1.094 0 008.084.371L5.001 3.454 1.917.37A1.094 1.094 0 00.371 1.917L3.454 5 .37 8.085A1.094 1.094 0 101.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 101.547-1.546z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 12 12"><path d="M7.611 6l3.654-3.653A1.14 1.14 0 009.653.735L6 4.39 2.347.735A1.14 1.14 0 00.735 2.347L4.39 6 .735 9.653a1.14 1.14 0 101.612 1.612L6 7.61l3.653 3.654a1.14 1.14 0 001.612-1.612z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 14 14"><path d="M8.678 7l4.245-4.244a1.186 1.186 0 00-1.678-1.678L7.001 5.323 2.755 1.077a1.187 1.187 0 00-1.678 1.678L5.322 7l-4.244 4.244a1.187 1.187 0 001.678 1.678l4.245-4.245 4.244 4.245a1.186 1.186 0 001.678-1.678z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 16 16"><path d="M9.748 8l4.915-4.915a1.236 1.236 0 00-1.748-1.748L8 6.252 3.085 1.337a1.236 1.236 0 00-1.748 1.748L6.252 8l-4.915 4.915a1.236 1.236 0 101.748 1.748L8 9.748l4.915 4.915a1.236 1.236 0 001.748-1.748z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 16 16"><path d="M9.823 8l5.674-5.674A1.289 1.289 0 1013.675.504L8 6.179 2.326.503A1.288 1.288 0 00.504 2.326l5.674 5.675-5.674 5.674a1.288 1.288 0 001.822 1.822L8 9.822l5.674 5.675a1.289 1.289 0 101.823-1.822z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 18 18"><path d="M10.897 9l6.537-6.536A1.341 1.341 0 1015.537.567L9 7.104 2.465.567A1.341 1.341 0 00.567 2.464L7.104 9 .567 15.537a1.341 1.341 0 101.897 1.897L9 10.897l6.536 6.537a1.341 1.341 0 101.897-1.897z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 10 10"><path d="M6.485 5l2.674-2.674A1.05 1.05 0 107.674.84L5 3.515 2.326.84A1.05 1.05 0 00.84 2.326L3.515 5 .84 7.674A1.05 1.05 0 002.326 9.16L5 6.485 7.674 9.16A1.05 1.05 0 109.16 7.674z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 12 12"><path d="M10.375 7.25h-8.75a1.25 1.25 0 010-2.5h8.75a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 14 14"><path d="M12.026 8.302H1.974a1.302 1.302 0 010-2.604h10.052a1.302 1.302 0 010 2.604z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 16 16"><path d="M13.763 9.356H2.237a1.356 1.356 0 010-2.712h11.526a1.356 1.356 0 010 2.712z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 18 18"><path d="M15.596 10.413H2.404a1.413 1.413 0 010-2.826h13.192a1.413 1.413 0 010 2.826z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 10 10"><path d="M8.293 6.152H1.708a1.152 1.152 0 010-2.304h6.585a1.152 1.152 0 110 2.304z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 20 20"><path d="M17.54 11.472H2.461a1.472 1.472 0 010-2.944h15.077a1.472 1.472 0 010 2.944z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 22 22"><path d="M19.604 12.533H2.398a1.533 1.533 0 110-3.066h17.206a1.533 1.533 0 010 3.066z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 10 10"><path d="M8.75 6.2h-7.5a1.2 1.2 0 010-2.4h7.5a1.2 1.2 0 110 2.4z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 20 6"><path d="M19.375 1.75H.625a.625.625 0 010-1.25h18.75a.625.625 0 010 1.25zM20 4.875a.626.626 0 00-.625-.625H.625a.625.625 0 000 1.25h18.75A.626.626 0 0020 4.875z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 30 4"><path d="M28.75 3.25H1.25a1.25 1.25 0 010-2.5h27.5a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 14 10"><path d="M12.625 1.25H1.375a.625.625 0 010-1.25h11.25a.625.625 0 010 1.25zm.625 3.125a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625zm0 3.75a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625z"/></symbol></svg>`;customElements.define("sp-icons-large",class extends bo{constructor(){super(),this.name="ui"}renderDefaultContent(){return go}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var vo=d`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 10 10"><path d="M9.7 4.387L6.623 1.262a.875.875 0 10-1.247 1.226l1.61 1.637H.925a.875.875 0 000 1.75h6.062l-1.61 1.637a.875.875 0 101.247 1.226l3.075-3.125a.874.874 0 000-1.226z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 12 12"><path d="M11.284 5.356L7.718 1.788a.911.911 0 10-1.29 1.29l2.012 2.01H1.286a.911.911 0 100 1.823H8.44L6.429 8.923a.911.911 0 001.289 1.289l3.566-3.567a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 14 14"><path d="M12.893 6.33L8.826 2.261a.95.95 0 10-1.344 1.341L9.93 6.051H1.621a.95.95 0 100 1.898H9.93l-2.447 2.447a.95.95 0 001.344 1.342l4.067-4.067a.95.95 0 000-1.342z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 16 16"><path d="M14.572 7.3l-4.63-4.63a.989.989 0 00-1.399 1.398l2.942 2.943H1.87a.99.99 0 000 1.978h9.615l-2.942 2.943a.989.989 0 101.398 1.398l4.631-4.63a.988.988 0 000-1.4z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 18 18"><path d="M16.336 8.271l-5.269-5.267A1.03 1.03 0 109.61 4.46l3.51 3.509H2.021a1.03 1.03 0 000 2.06H13.12l-3.51 3.51a1.03 1.03 0 101.457 1.456l5.269-5.268a1.03 1.03 0 000-1.456z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 20 20"><path d="M18.191 9.241l-5.986-5.987a1.073 1.073 0 00-1.518 1.517l4.155 4.156H2.063a1.073 1.073 0 100 2.146h12.779l-4.154 4.155a1.073 1.073 0 101.517 1.518l5.986-5.987a1.073 1.073 0 000-1.518z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 10 10"><path d="M9.26 4.406L6.528 1.672A.84.84 0 005.34 2.859l1.3 1.301H1.396a.84.84 0 000 1.68H6.64l-1.301 1.3a.84.84 0 001.188 1.188l2.734-2.734a.84.84 0 000-1.188z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 8 8"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 10 10"><path d="M7.861 7.953c.062.063.1.146 0 .23l-1.293.834c-.1.063-.145.021-.187-.083l-1.6-2.793-2.105 2.314c-.021.04-.083.082-.145 0l-1-1.043c-.1-.062-.083-.125 0-.187l2.375-1.981-2.715-1.026c-.042 0-.1-.083-.063-.188l.707-1.412a.111.111 0 01.136-.074.116.116 0 01.052.034l2.378 1.54.146-3.043A.11.11 0 014.638.95a.161.161 0 01.034 0l1.73.23c.1 0 .125.042.1.146l-.814 2.979 2.751-.834c.062-.042.125-.042.167.083l.271 1.542c.02.1 0 .146-.083.146l-2.876.23z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 10 10"><path d="M8.266 8.324c.07.071.116.164 0 .258l-1.454.938c-.116.071-.163.024-.21-.094l-1.8-3.141-2.367 2.6c-.024.045-.094.092-.163 0l-1.13-1.167c-.118-.07-.094-.141 0-.21l2.671-2.227L.766 4.13c-.047 0-.116-.094-.071-.211l.8-1.593a.124.124 0 01.153-.084.13.13 0 01.058.038l2.669 1.738.164-3.422a.124.124 0 01.1-.14.186.186 0 01.038 0l1.945.258c.118 0 .14.047.118.164l-.915 3.349 3.094-.938c.07-.047.14-.047.187.094l.3 1.734c.023.118 0 .164-.094.164l-3.234.258z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.26 6.463c.049.05.082.116 0 .181l-1.022.659c-.082.05-.115.017-.148-.066L3.822 5.03 2.16 6.859c-.017.032-.066.065-.115 0l-.79-.824c-.083-.049-.066-.1 0-.148l1.877-1.565L.99 3.516c-.033 0-.082-.066-.05-.148l.56-1.119a.087.087 0 01.108-.059.09.09 0 01.04.027l1.878 1.218.116-2.4a.087.087 0 01.072-.1h.027l1.367.181c.083 0 .1.033.083.116L4.55 3.581l2.174-.659c.049-.033.1-.033.132.066l.214 1.218c.016.083 0 .115-.066.115l-2.273.181z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 10 10"><path d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 12 12"><path d="M4.313 10.98a1.042 1.042 0 01-.8-.375L.647 7.165a1.042 1.042 0 011.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 011.64 1.287l-6.24 7.94a1.04 1.04 0 01-.804.399z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 14 14"><path d="M5.102 12.514a1.087 1.087 0 01-.834-.39L.988 8.19A1.085 1.085 0 012.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 011.707 1.34L5.955 12.1a1.089 1.089 0 01-.838.415z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 16 16"><path d="M5.864 14.114a1.13 1.13 0 01-.868-.407L1.25 9.21a1.13 1.13 0 111.736-1.448l2.854 3.425 7.148-9.1a1.13 1.13 0 111.778 1.397L6.753 13.682a1.13 1.13 0 01-.872.432z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 10 10"><path d="M3.815 8.687a.921.921 0 01-.708-.332l-1.891-2.27a.921.921 0 011.416-1.18L3.794 6.3l3.56-4.531a.921.921 0 111.45 1.138L4.54 8.335a.921.921 0 01-.712.351z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 16 16"><path d="M5.597 14.784a1.177 1.177 0 01-.905-.424L.417 9.229a1.177 1.177 0 111.809-1.508l3.343 4.013 8.174-10.402a1.177 1.177 0 011.852 1.456L6.523 14.334a1.178 1.178 0 01-.91.45z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 18 18"><path d="M6.297 16.534a1.228 1.228 0 01-.942-.442L.48 10.244a1.227 1.227 0 011.885-1.57l3.904 4.684L15.6 1.482a1.227 1.227 0 011.93 1.516L7.262 16.065a1.229 1.229 0 01-.947.469z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 10 10"><path d="M3.667 9.07a.96.96 0 01-.737-.344L.753 6.114a.96.96 0 111.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 011.51 1.186L4.422 8.704a.962.962 0 01-.741.367z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 12 12"><path d="M9.034 5.356L4.343.663a.911.911 0 00-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 101.289 1.29l4.691-4.692a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 14 14"><path d="M10.639 7a.947.947 0 00-.278-.671l-.003-.002-5.33-5.33a.95.95 0 00-1.342 1.342L8.346 7l-4.661 4.66a.95.95 0 101.342 1.343l5.33-5.33.003-.001A.947.947 0 0010.64 7z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 16 16"><path d="M4.97 15.044a.989.989 0 01-.698-1.688L9.627 8 4.27 2.644a.989.989 0 011.4-1.398L11.726 7.3a.988.988 0 010 1.398L5.67 14.754a.985.985 0 01-.7.29z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 16 16"><path d="M12.133 7.271L5.263.401a1.03 1.03 0 00-1.457 1.457L9.947 8l-6.141 6.142a1.03 1.03 0 001.457 1.457l6.87-6.87a1.03 1.03 0 000-1.457z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 18 18"><path d="M5.04 17.863a1.073 1.073 0 01-.759-1.832L11.313 9 4.28 1.969A1.073 1.073 0 015.8.45l7.79 7.79a1.073 1.073 0 010 1.518l-7.79 7.79a1.07 1.07 0 01-.759.314z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 10 10"><path d="M7.482 4.406l-.001-.001L3.86.783a.84.84 0 00-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 003.86 9.216l3.621-3.622h.001a.84.84 0 000-1.19z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 5 5"><path d="M4.763 0a.248.248 0 00-.177.073l-4.5 4.5A.25.25 0 00.263 5h4.5a.25.25 0 00.25-.25V.25a.25.25 0 00-.25-.25z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 6 6"><path d="M5.719.37a.281.281 0 00-.2.082L.452 5.519a.281.281 0 00.2.481h5.067A.281.281 0 006 5.719V.652A.281.281 0 005.72.37z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 7 7"><path d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 5 5"><path d="M4.78.558a.222.222 0 00-.157.065l-4 4a.222.222 0 00.157.379h4a.222.222 0 00.222-.222v-4A.222.222 0 004.78.558z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 8 8"><path d="M5.238 4l2.456-2.457A.875.875 0 106.456.306L4 2.763 1.543.306A.875.875 0 00.306 1.544L2.763 4 .306 6.457a.875.875 0 101.238 1.237L4 5.237l2.456 2.457a.875.875 0 101.238-1.237z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 10 10"><path d="M6.29 5l2.922-2.922a.911.911 0 00-1.29-1.29L5 3.712 2.078.789a.911.911 0 00-1.29 1.289L3.712 5 .79 7.922a.911.911 0 101.289 1.29L5 6.288 7.923 9.21a.911.911 0 001.289-1.289z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 12 12"><path d="M7.344 6l3.395-3.396a.95.95 0 00-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 00-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 001.343 1.343L6 7.344l3.395 3.395a.95.95 0 001.344-1.344z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 12 12"><path d="M7.398 6l3.932-3.932A.989.989 0 009.932.67L6 4.602 2.068.67A.989.989 0 00.67 2.068L4.602 6 .67 9.932a.989.989 0 101.398 1.398L6 7.398l3.932 3.932a.989.989 0 001.398-1.398z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 14 14"><path d="M8.457 7l4.54-4.54a1.03 1.03 0 00-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 00-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 101.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 001.456-1.458z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 16 16"><path d="M9.518 8l5.23-5.228a1.073 1.073 0 00-1.518-1.518L8.001 6.483l-5.229-5.23a1.073 1.073 0 00-1.518 1.519L6.483 8l-5.23 5.229a1.073 1.073 0 101.518 1.518l5.23-5.23 5.228 5.23a1.073 1.073 0 001.518-1.518z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 8 8"><path d="M5.188 4l2.14-2.14A.84.84 0 106.141.672L4 2.812 1.86.672A.84.84 0 00.672 1.86L2.812 4 .672 6.14A.84.84 0 101.86 7.328L4 5.188l2.14 2.14A.84.84 0 107.328 6.14z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 10 10"><path d="M8.5 6h-7a1 1 0 010-2h7a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 12 12"><path d="M10.021 7.042H1.98a1.042 1.042 0 110-2.083h8.043a1.042 1.042 0 010 2.083z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 12 12"><path d="M10.61 7.085H1.39a1.085 1.085 0 010-2.17h9.22a1.085 1.085 0 010 2.17z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 14 14"><path d="M12.277 8.13H1.723a1.13 1.13 0 110-2.26h10.554a1.13 1.13 0 110 2.26z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 8 8"><path d="M6.634 4.921H1.366a.921.921 0 010-1.842h5.268a.921.921 0 110 1.842z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 16 16"><path d="M14.03 9.178H1.969a1.178 1.178 0 110-2.356H14.03a1.178 1.178 0 010 2.356z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 18 18"><path d="M15.882 10.227H2.117a1.227 1.227 0 010-2.454h13.765a1.227 1.227 0 010 2.454z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 8 8"><path d="M6.99 4.96H1.01a.96.96 0 010-1.92h5.98a.96.96 0 010 1.92z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 16 4"><path d="M15.45 1.05H.55a.5.5 0 010-1h14.9a.5.5 0 010 1zm.5 2.4a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h14.9a.5.5 0 00.5-.5z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 24 2"><path d="M23 2H1a1 1 0 010-2h22a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 10 8"><path d="M9.45 1.05H.55a.5.5 0 010-1h8.9a.5.5 0 010 1zm.5 2.45a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5z"/></symbol></svg>`;customElements.define("sp-icons-medium",class extends bo{constructor(){super(),this.name="ui"}renderDefaultContent(){return vo}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var fo=o`
:host{margin:calc(var(--spectrum-listitem-texticon-divider-padding)/2) var(--spectrum-listitem-texticon-padding-y);overflow:visible;width:auto}@media (forced-colors:active){:host{background-color:CanvasText;forced-color-adjust:none}}:host{display:block}
`;customElements.define("sp-menu-divider",class extends a{static get styles(){return[I,fo]}firstUpdated(){this.setAttribute("role","separator"),this.setAttribute("size","m")}});var ko=o`
:host([size=s]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-s-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-s-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-s-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-s-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-s-height,var(--spectrum-global-dimension-size-50)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-s-width,var(--spectrum-global-dimension-static-size-2400)
)}:host([size=m]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-m-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-m-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-m-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-m-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-m-height,var(--spectrum-global-dimension-size-75)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-m-width,var(--spectrum-global-dimension-static-size-2400)
);--spectrum-fieldlabel-side-padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([size=l]){--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-l-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-l-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-l-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-l-height,var(--spectrum-global-dimension-size-100)
);--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-l-border-radius,var(--spectrum-global-dimension-size-50)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-l-width,var(--spectrum-global-dimension-static-size-2500)
)}:host([size=xl]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-xl-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-xl-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-xl-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-xl-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-xl-height,var(--spectrum-global-dimension-size-125)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-xl-width,var(--spectrum-global-dimension-static-size-2800)
)}:host{align-items:center;display:inline-flex;flex-flow:row wrap;justify-content:space-between;position:relative;vertical-align:top;width:var(--spectrum-progressbar-width)}.track{border-radius:var(--spectrum-progressbar-border-radius);overflow:hidden;width:100%;z-index:1}.fill,.track{height:var(--spectrum-progressbar-height)}.fill{border:none;transition:width 1s}:host([dir=ltr]) .label,:host([dir=ltr]) .percentage{text-align:left}:host([dir=rtl]) .label,:host([dir=rtl]) .percentage{text-align:right}.label,.percentage{margin-bottom:var(
--spectrum-progressbar-value-gap-y
)}.label{flex:1 1 0%}:host([dir=ltr]) .percentage{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl]) .percentage{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}.percentage{align-self:flex-start}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between;width:auto}:host([side-label]) .track{flex:1 1 var(--spectrum-progressbar-width);min-width:var(
--spectrum-progressbar-width
)}:host([dir=ltr][side-label]) .label{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl][side-label]) .label{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([side-label]) .label{flex-grow:0;margin-bottom:0}:host([dir=ltr][side-label]) .percentage{text-align:right}:host([dir=rtl][side-label]) .percentage{text-align:left}:host([dir=ltr][side-label]) .percentage{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl][side-label]) .percentage{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}:host([side-label]) .percentage{margin-bottom:0;order:3}:host([indeterminate]) .fill{animation-timing-function:var(
--spectrum-progressbar-indeterminate-animation-ease
);position:relative;width:var(
--spectrum-progressbar-indeterminate-fill-width
);will-change:transform}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(--spectrum-progressbar-indeterminate-duration) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(--spectrum-progressbar-indeterminate-duration) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(--spectrum-progressbar-indeterminate-fill-width)*-1))}to{transform:translate(var(--spectrum-progressbar-width))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(--spectrum-progressbar-width))}to{transform:translate(calc(var(--spectrum-progressbar-width)*-1))}}.fill{background:var(
--spectrum-progressbar-m-track-fill-color,var(--spectrum-semantic-informative-color-default)
)}.track{background-color:var(
--spectrum-progressbar-m-track-color,var(--spectrum-alias-track-color-default)
)}:host([over-background]) .fill{background:var(
--spectrum-progressbar-m-overbackground-track-fill-color,var(--spectrum-alias-track-fill-color-overbackground)
)}:host([over-background]) .label,:host([over-background]) .percentage{color:var(
--spectrum-progressbar-m-overbackground-track-fill-color,var(--spectrum-alias-track-fill-color-overbackground)
)}:host([over-background]) .track{background-color:var(
--spectrum-progressbar-m-overbackground-track-color,var(--spectrum-alias-track-color-overbackground)
)}:host([positive]) .fill{background:var(
--spectrum-meter-m-positive-track-fill-color,var(--spectrum-semantic-positive-status-color)
)}:host([notice]) .fill{background:var(
--spectrum-meter-m-notice-track-fill-color,var(--spectrum-semantic-notice-status-color)
)}:host([negative]) .fill{background:var(
--spectrum-meter-m-negative-track-fill-color,var(--spectrum-semantic-negative-status-color)
)}.label,.percentage{color:var(
--spectrum-fieldlabel-m-text-color,var(--spectrum-alias-label-text-color)
)}@media (forced-colors:active){.track{--spectrum-progressbar-m-track-fill-color:ButtonText;--spectrum-progressbar-m-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left}:host([dir=rtl]) .fill{transform-origin:right}
`,yo=Object.defineProperty,wo=Object.getOwnPropertyDescriptor,xo=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?wo(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&yo(e,r,a),a};class zo extends(b(v(a,""))){constructor(){super(...arguments),this.progress=0,this.overBackground=!1,this.notice=!1,this.negative=!1,this.positive=!1,this.label="",this.sideLabel=!1}static get styles(){return[ko]}render(){return i`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?i``:this.label}
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
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}xo([c({type:Number})],zo.prototype,"progress",2),xo([c({type:Boolean,reflect:!0,attribute:"over-background"})],zo.prototype,"overBackground",2),xo([c({type:Boolean,reflect:!0})],zo.prototype,"notice",2),xo([c({type:Boolean,reflect:!0})],zo.prototype,"negative",2),xo([c({type:Boolean,reflect:!0})],zo.prototype,"positive",2),xo([c({type:String,reflect:!0})],zo.prototype,"label",2),xo([c({type:Boolean,reflect:!0,attribute:"side-label"})],zo.prototype,"sideLabel",2),customElements.define("sp-meter",zo);const To=Symbol("language resolver updated");class Co{constructor(t){this.language=document.documentElement.lang||navigator.language,this.host=t,this.host.addController(this)}hostConnected(){this.resolveLanguage()}hostDisconnected(){var t;null==(t=this.unsubscribe)||t.call(this)}resolveLanguage(){const t=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:(t,e)=>{const r=this.language;this.language=t,this.unsubscribe=e,this.host.requestUpdate(To,r)}},cancelable:!0});this.host.dispatchEvent(t)}}let Po=new Map,Bo=!1;try{Bo="exceptZero"===new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay}catch(t){}let So=!1;try{So="unit"===new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style}catch(t){}const Io={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class qo{format(t){let e="";if(e=Bo||null==this.options.signDisplay?this.numberFormatter.format(t):function(t,e,r){if("auto"===e)return t.format(r);if("never"===e)return t.format(Math.abs(r));{let o=!1;if("always"===e?o=r>0||Object.is(r,0):"exceptZero"===e&&(Object.is(r,-0)||Object.is(r,0)?r=Math.abs(r):o=r>0),o){let e=t.format(-r),o=t.format(r),s=e.replace(o,"").replace(/\u200e|\u061C/,"");return 1!==[...s].length&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),e.replace(o,"!!!").replace(s,"+").replace("!!!",o)}return t.format(r)}}(this.numberFormatter,this.options.signDisplay,t),"unit"===this.options.style&&!So){var r;let{unit:t,unitDisplay:o="short",locale:s}=this.resolvedOptions(),a=null===(r=Io[t])||void 0===r?void 0:r[o];e+=a[s]||a.default}return e}formatToParts(t){return this.numberFormatter.formatToParts(t)}formatRange(t,e){if("function"==typeof this.numberFormatter.formatRange)return this.numberFormatter.formatRange(t,e);if(e<t)throw new RangeError("End date must be >= start date");return`${this.format(t)} – ${this.format(e)}`}formatRangeToParts(t,e){if("function"==typeof this.numberFormatter.formatRangeToParts)return this.numberFormatter.formatRangeToParts(t,e);if(e<t)throw new RangeError("End date must be >= start date");let r=this.numberFormatter.formatToParts(t),o=this.numberFormatter.formatToParts(e);return[...r.map((t=>({...t,source:"startRange"}))),{type:"literal",value:" – ",source:"shared"},...o.map((t=>({...t,source:"endRange"})))]}resolvedOptions(){let t=this.numberFormatter.resolvedOptions();return Bo||null==this.options.signDisplay||(t={...t,signDisplay:this.options.signDisplay}),So||"unit"!==this.options.style||(t={...t,style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay}),t}constructor(t,e={}){this.numberFormatter=function(t,e={}){let{numberingSystem:r}=e;r&&-1===t.indexOf("-u-nu-")&&(t=`${t}-u-nu-${r}`);if("unit"===e.style&&!So){var o;let{unit:t,unitDisplay:r="short"}=e;if(!t)throw new Error('unit option must be provided with style: "unit"');if(!(null===(o=Io[t])||void 0===o?void 0:o[r]))throw new Error(`Unsupported unit ${t} with unitDisplay = ${r}`);e={...e,style:"decimal"}}let s=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():"");if(Po.has(s))return Po.get(s);let a=new Intl.NumberFormat(t,e);return Po.set(s,a),a}(t,e),this.options=e}}const Ao=new RegExp("^.*\\(.*\\).*$"),Eo=["latn","arab","hanidec"];class $o{parse(t){return Do(this.locale,this.options,t).parse(t)}isValidPartialNumber(t,e,r){return Do(this.locale,this.options,t).isValidPartialNumber(t,e,r)}getNumberingSystem(t){return Do(this.locale,this.options,t).options.numberingSystem}constructor(t,e={}){this.locale=t,this.options=e}}const Lo=new Map;function Do(t,e,r){let o=Oo(t,e);if(!t.includes("-nu-")&&!o.isValidPartialNumber(r))for(let s of Eo)if(s!==o.options.numberingSystem){let o=Oo(t+(t.includes("-u-")?"-nu-":"-u-nu-")+s,e);if(o.isValidPartialNumber(r))return o}return o}function Oo(t,e){let r=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():""),o=Lo.get(r);return o||(o=new Mo(t,e),Lo.set(r,o)),o}class Mo{parse(t){let e=this.sanitize(t);e=Uo(e,this.symbols.group,"").replace(this.symbols.decimal,".").replace(this.symbols.minusSign,"-").replace(this.symbols.numeral,this.symbols.index);let r=e?+e:NaN;if(isNaN(r))return NaN;var o;("accounting"===this.options.currencySign&&Ao.test(t)&&(r*=-1),"percent"===this.options.style)&&(r/=100,r=+r.toFixed((null!==(o=this.options.maximumFractionDigits)&&void 0!==o?o:0)+2));return r}sanitize(t){return t=(t=t.replace(this.symbols.literals,"")).replace("-",this.symbols.minusSign),"arab"===this.options.numberingSystem&&(t=Uo(t=(t=t.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal),".",this.symbols.group)),"fr-FR"===this.options.locale&&(t=Uo(t,".",String.fromCharCode(8239))),t}isValidPartialNumber(t,e=-1/0,r=1/0){return(t=this.sanitize(t)).startsWith(this.symbols.minusSign)&&e<0?t=t.slice(this.symbols.minusSign.length):this.symbols.plusSign&&t.startsWith(this.symbols.plusSign)&&r>0&&(t=t.slice(this.symbols.plusSign.length)),!t.startsWith(this.symbols.group)&&0===(t=Uo(t,this.symbols.group,"").replace(this.symbols.numeral,"").replace(this.symbols.decimal,"")).length}constructor(t,e={}){this.formatter=new Intl.NumberFormat(t,e),this.options=this.formatter.resolvedOptions(),this.symbols=function(t,e,r){var o,s,a,i;let c=t.formatToParts(-10000.111),l=t.formatToParts(10000.111),n=t.formatToParts(1);var d;let u=null!==(d=null===(o=c.find((t=>"minusSign"===t.type)))||void 0===o?void 0:o.value)&&void 0!==d?d:"-",p=null===(s=l.find((t=>"plusSign"===t.type)))||void 0===s?void 0:s.value;p||"exceptZero"!==(null==r?void 0:r.signDisplay)&&"always"!==(null==r?void 0:r.signDisplay)||(p="+");let h=null===(a=c.find((t=>"decimal"===t.type)))||void 0===a?void 0:a.value,m=null===(i=c.find((t=>"group"===t.type)))||void 0===i?void 0:i.value,b=c.filter((t=>!Ho.has(t.type))).map((t=>jo(t.value))),g=n.filter((t=>!Ho.has(t.type))).map((t=>jo(t.value))),v=[...new Set([...g,...b])].sort(((t,e)=>e.length-t.length)),f=new RegExp(`${v.join("|")}|[\\p{White_Space}]`,"gu"),k=[...new Intl.NumberFormat(e.locale,{useGrouping:!1}).format(9876543210)].reverse(),y=new Map(k.map(((t,e)=>[t,e]))),w=new RegExp(`[${k.join("")}]`,"g"),x=t=>String(y.get(t));return{minusSign:u,plusSign:p,decimal:h,group:m,literals:f,numeral:w,index:x}}(this.formatter,this.options,e)}}const Ho=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]);function Uo(t,e,r){return t.replaceAll?t.replaceAll(e,r):t.split(e).join(r)}function jo(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}var Fo=o`
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
`,_o=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,No=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ro(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&_o(e,r,a),a};const Vo={"１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0","、":",","，":",","。":".","．":".","％":"%","＋":"+","ー":"-"};class Go extends O{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.managedInput=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.changeCount=0,this.languageResolver=new Co(this),this.wasIndeterminate=!1}static get styles(){return[...super.styles,Fo,T]}set value(t){const e=this.validateInput(t);if(e===this.value)return;const r=this._value;this._value=e,this.requestUpdate("value",r)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}get valueAsString(){return this._value.toString()}set valueAsString(t){this.value=this.numberParser.parse(t)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(t){var e;if(ot()&&"decimal"===this.inputElement.inputMode){const r=this.numberFormatter.formatToParts(1000.1),o=t.split("").find((t=>","===t||"."===t)),s=null==(e=r.find((t=>"decimal"===t.type)))?void 0:e.value;o&&s&&(t=t.replace(o,s))}return this.numberParser.parse(t)}get _step(){var t;return void 0!==this.step?this.step:"percent"===(null==(t=this.formatOptions)?void 0:t.style)?.01:1}handlePointerdown(t){if(0!==t.button)return void t.preventDefault();this.managedInput=!0,this.buttons.setPointerCapture(t.pointerId);const e=this.buttons.children[0].getBoundingClientRect(),r=this.buttons.children[1].getBoundingClientRect();this.findChange=t=>{t.clientX>=e.x&&t.clientY>=e.y&&t.clientX<=e.x+e.width&&t.clientY<=e.y+e.height?this.change=t=>this.increment(t.shiftKey?this.stepModifier:1):t.clientX>=r.x&&t.clientY>=r.y&&t.clientX<=r.x+r.width&&t.clientY<=r.y+r.height&&(this.change=t=>this.decrement(t.shiftKey?this.stepModifier:1))},this.findChange(t),this.startChange(t)}startChange(t){this.changeCount=0,this.doChange(t),this.safty=setTimeout((()=>{this.doNextChange(t)}),400)}doChange(t){this.change(t)}handlePointermove(t){this.findChange(t)}handlePointerup(t){this.buttons.releasePointerCapture(t.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.managedInput=!1}doNextChange(t){return this.changeCount+=1,this.changeCount%5==0&&this.doChange(t),requestAnimationFrame((()=>{this.nextChange=this.doNextChange(t)}))}stepBy(t){if(this.disabled||this.readonly)return;const e=void 0!==this.min?this.min:0;let r=this.value;r+=t*this._step,isNaN(this.value)?this.value=e:this.value=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus()}increment(t=1){this.stepBy(1*t)}decrement(t=1){this.stepBy(-1*t)}handleKeydown(t){switch(t.code){case"ArrowUp":t.preventDefault(),this.increment(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));break;case"ArrowDown":t.preventDefault(),this.decrement(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}onScroll(t){t.preventDefault(),this.managedInput=!0;const e=t.shiftKey?t.deltaX/Math.abs(t.deltaX):t.deltaY/Math.abs(t.deltaY);0!==e&&!isNaN(e)&&this.stepBy(e*(t.shiftKey?this.stepModifier:1)),this.managedInput=!1}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1})}onBlur(){super.onBlur(),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll)}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1}handleChange(){const t=this.convertValueToNumber(this.inputValue);this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(t))?this.indeterminate=!0:(this.value=t,super.handleChange())}handleInput(){this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace("-",""));const{value:t,selectionStart:e}=this.inputElement,r=t.split("").map((t=>Vo[t]||t)).join("");if(this.numberParser.isValidPartialNumber(r)){const t=this.convertValueToNumber(r);return!r&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(t)),this._trackingValue=r,void(this.inputElement.value=r)}const o=r.length,s=(e||o)-(o-this._trackingValue.length);this.inputElement.value=this.indeterminate?"-":this._trackingValue,this.inputElement.setSelectionRange(s,s)}validateInput(t){if(void 0!==this.min&&(t=Math.max(this.min,t)),void 0!==this.max&&(t=Math.min(this.max,t)),this.step){const e=(t-(void 0!==this.min?this.min:0))%this.step;if(0===e||(1===Math.round(e/this.step)?t+=this.step-e:t-=e),void 0!==this.max)for(;t>this.max;)t-=this.step}return t}get displayValue(){const t=this.focused?"":"-";return this.indeterminate?t:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberFormatterFocused=new qo(this.languageResolver.language,o);try{this._numberFormatter=new qo(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberParserFocused=new $o(this.languageResolver.language,o);try{this._numberParser=new $o(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",i`
            ${super.renderField()}
            ${this.hideStepper?i``:i`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${je({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}update(t){if((t.has("formatOptions")||t.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),t.has("value")||t.has("max")||t.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t}super.update(t)}willUpdate(t){this.multiline=!1,t.has(To)&&this.clearNumberFormatterCache()}firstUpdated(t){super.firstUpdated(t),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(t.has("min")||t.has("formatOptions")){let t="numeric";const e=void 0!==this.min&&this.min<0,{maximumFractionDigits:r}=this.numberFormatter.resolvedOptions(),o=r>0;ot()?e?t="text":o&&(t="decimal"):at()&&(e?t="numeric":o&&(t="decimal")),this.inputElement.inputMode=t}}}No([y(".buttons")],Go.prototype,"buttons",2),No([c({type:Boolean,reflect:!0})],Go.prototype,"focused",2),No([c({type:Object,attribute:"format-options"})],Go.prototype,"formatOptions",2),No([c({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Go.prototype,"hideStepper",2),No([c({type:Boolean,reflect:!0})],Go.prototype,"indeterminate",2),No([c({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],Go.prototype,"keyboardFocused",2),No([c({type:Number})],Go.prototype,"max",2),No([c({type:Number})],Go.prototype,"min",2),No([c({type:Number})],Go.prototype,"step",2),No([c({type:Number,reflect:!0,attribute:"step-modifier"})],Go.prototype,"stepModifier",2),No([c({type:Number})],Go.prototype,"value",1),customElements.define("sp-number-field",Go);var Ko=Object.freeze({__proto__:null});customElements.define("overlay-trigger",pt);var Xo=o`
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
)}:host([invalid]:not([disabled])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:hover .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])[active]) .root.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:focus .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.is-focused .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.focus-visible .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet:focus-visible .spectrum-PickerButton-fill{border-color:transparent}:host(:not([invalid]):not([disabled])) .root.spectrum-PickerButton--quiet.is-keyboardFocused .spectrum-PickerButton-fill{border-color:transparent}:host([open]) .root .spectrum-PickerButton-fill{background-color:var(
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
`,Yo=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,Zo=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Wo(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Yo(e,r,a),a};class Qo extends(b(k(M,'[slot="label"]'))){constructor(){super(...arguments),this.invalid=!1,this.position="right"}static get styles(){return[Xo]}get hasText(){return this.slotContentIsPresent}render(){const t={root:!0,uiicononly:!this.hasText,textuiicon:this.hasText};return i`
            <div class=${B(t)}>
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
        `}}Zo([c({type:Boolean,reflect:!0})],Qo.prototype,"invalid",2),Zo([c({reflect:!0})],Qo.prototype,"position",2),customElements.define("sp-picker-button",Qo);var Jo=o`
:host([size=s]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-s-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-s-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-s-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-s-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-s-height,var(--spectrum-global-dimension-size-50)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-s-width,var(--spectrum-global-dimension-static-size-2400)
)}:host([size=m]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-m-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-m-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-m-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-m-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-m-height,var(--spectrum-global-dimension-size-75)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-m-width,var(--spectrum-global-dimension-static-size-2400)
);--spectrum-fieldlabel-side-padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([size=l]){--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-l-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-l-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-l-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-l-height,var(--spectrum-global-dimension-size-100)
);--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-l-border-radius,var(--spectrum-global-dimension-size-50)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-l-width,var(--spectrum-global-dimension-static-size-2500)
)}:host([size=xl]){--spectrum-progressbar-border-radius:var(
--spectrum-progressbar-xl-border-radius
);--spectrum-progressbar-indeterminate-fill-width:var(
--spectrum-progressbar-xl-indeterminate-fill-width,var(--spectrum-global-dimension-static-percent-70)
);--spectrum-progressbar-indeterminate-duration:var(
--spectrum-progressbar-xl-indeterminate-duration,var(--spectrum-global-animation-duration-2000)
);--spectrum-progressbar-value-gap-y:var(
--spectrum-progressbar-xl-value-gap-y,0px
);--spectrum-progressbar-height:var(
--spectrum-progressbar-xl-height,var(--spectrum-global-dimension-size-125)
);--spectrum-progressbar-width:var(
--spectrum-progressbar-xl-width,var(--spectrum-global-dimension-static-size-2800)
)}:host{align-items:center;display:inline-flex;flex-flow:row wrap;justify-content:space-between;position:relative;vertical-align:top;width:var(--spectrum-progressbar-width)}.track{border-radius:var(--spectrum-progressbar-border-radius);overflow:hidden;width:100%;z-index:1}.fill,.track{height:var(--spectrum-progressbar-height)}.fill{border:none;transition:width 1s}:host([dir=ltr]) .label,:host([dir=ltr]) .percentage{text-align:left}:host([dir=rtl]) .label,:host([dir=rtl]) .percentage{text-align:right}.label,.percentage{margin-bottom:var(
--spectrum-progressbar-value-gap-y
)}.label{flex:1 1 0%}:host([dir=ltr]) .percentage{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl]) .percentage{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}.percentage{align-self:flex-start}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between;width:auto}:host([side-label]) .track{flex:1 1 var(--spectrum-progressbar-width);min-width:var(
--spectrum-progressbar-width
)}:host([dir=ltr][side-label]) .label{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl][side-label]) .label{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([side-label]) .label{flex-grow:0;margin-bottom:0}:host([dir=ltr][side-label]) .percentage{text-align:right}:host([dir=rtl][side-label]) .percentage{text-align:left}:host([dir=ltr][side-label]) .percentage{margin-left:var(
--spectrum-fieldlabel-side-padding-right
)}:host([dir=rtl][side-label]) .percentage{margin-right:var(
--spectrum-fieldlabel-side-padding-right
)}:host([side-label]) .percentage{margin-bottom:0;order:3}:host([indeterminate]) .fill{animation-timing-function:var(
--spectrum-progressbar-indeterminate-animation-ease
);position:relative;width:var(
--spectrum-progressbar-indeterminate-fill-width
);will-change:transform}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(--spectrum-progressbar-indeterminate-duration) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(--spectrum-progressbar-indeterminate-duration) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(--spectrum-progressbar-indeterminate-fill-width)*-1))}to{transform:translate(var(--spectrum-progressbar-width))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(--spectrum-progressbar-width))}to{transform:translate(calc(var(--spectrum-progressbar-width)*-1))}}.fill{background:var(
--spectrum-progressbar-m-track-fill-color,var(--spectrum-semantic-informative-color-default)
)}.track{background-color:var(
--spectrum-progressbar-m-track-color,var(--spectrum-alias-track-color-default)
)}:host([over-background]) .fill{background:var(
--spectrum-progressbar-m-overbackground-track-fill-color,var(--spectrum-alias-track-fill-color-overbackground)
)}:host([over-background]) .label,:host([over-background]) .percentage{color:var(
--spectrum-progressbar-m-overbackground-track-fill-color,var(--spectrum-alias-track-fill-color-overbackground)
)}:host([over-background]) .track{background-color:var(
--spectrum-progressbar-m-overbackground-track-color,var(--spectrum-alias-track-color-overbackground)
)}:host([positive]) .fill{background:var(
--spectrum-meter-m-positive-track-fill-color,var(--spectrum-semantic-positive-status-color)
)}:host(.is-notice) .fill{background:var(
--spectrum-meter-m-notice-track-fill-color,var(--spectrum-semantic-notice-status-color)
)}:host(.is-negative) .fill{background:var(
--spectrum-meter-m-negative-track-fill-color,var(--spectrum-semantic-negative-status-color)
)}.label,.percentage{color:var(
--spectrum-fieldlabel-m-text-color,var(--spectrum-alias-label-text-color)
)}@media (forced-colors:active){.track{--spectrum-progressbar-m-track-fill-color:ButtonText;--spectrum-progressbar-m-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left;width:100%}:host([dir=rtl]) .fill{transform-origin:right}
`,ts=Object.defineProperty,es=Object.getOwnPropertyDescriptor,rs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?es(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ts(e,r,a),a};class os extends(b(a)){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[Jo]}render(){return i`
            ${this.label?i`
                      <sp-field-label size=${this.size} class="label">
                          ${this.label}
                      </sp-field-label>
                      ${this.indeterminate?i``:i`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${this.progress}%
                                </sp-field-label>
                            `}
                  `:i``}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}rs([c({type:Boolean,reflect:!0})],os.prototype,"indeterminate",2),rs([c({type:String})],os.prototype,"label",2),rs([c({type:Boolean,reflect:!0,attribute:"over-background"})],os.prototype,"overBackground",2),rs([c({type:Boolean,reflect:!0,attribute:"side-label"})],os.prototype,"sideLabel",2),rs([c({type:Number})],os.prototype,"progress",2),customElements.define("sp-progress-bar",os);var ss=o`
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
`,as=Object.defineProperty,is=Object.getOwnPropertyDescriptor,cs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?is(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&as(e,r,a),a};class ls extends(b(a,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.progress=0}static get styles(){return[ss]}makeRotation(t){return this.indeterminate?void 0:`transform: rotate(${t}deg);`}willUpdate(t){t.has("overBackground")&&(this.static=this.overBackground?"white":this.static||void 0)}render(){const t=[this.makeRotation(3.6*Math.min(this.progress,50)-180),this.makeRotation(3.6*Math.max(this.progress-50,0)-180)];return i`
            <div class="track"></div>
            <div class="fills">
                ${["Mask1","Mask2"].map(((e,r)=>i`
                        <div class="fill${e}">
                            <div
                                class="fillSub${e}"
                                style=${f(t[r])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `))}
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}cs([c({type:Boolean,reflect:!0})],ls.prototype,"indeterminate",2),cs([c({type:String})],ls.prototype,"label",2),cs([c({type:Boolean,reflect:!0,attribute:"over-background"})],ls.prototype,"overBackground",2),cs([c({reflect:!0})],ls.prototype,"static",2),cs([c({type:Number})],ls.prototype,"progress",2),customElements.define("sp-progress-circle",ls);var ns=o`
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
`,ds=Object.defineProperty,us=Object.getOwnPropertyDescriptor,ps=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?us(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ds(e,r,a),a};class hs extends(b(x(a))){constructor(){super(...arguments),this.autofocus=!1,this.value="",this.checked=!1,this.disabled=!1,this.emphasized=!1,this.invalid=!1,this.readonly=!1}static get styles(){return[ns]}click(){this.disabled||this.activate()}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focus())}activate(){this.checked||(this.checked=!0,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleKeyup(t){"Space"===t.code&&this.activate()}render(){return i`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","radio"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAutoFocus(),this.addEventListener("click",this.activate),this.addEventListener("keyup",this.handleKeyup)}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")),t.has("checked")&&(this.checked?this.setAttribute("aria-checked","true"):this.setAttribute("aria-checked","false")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabeld"))}}ps([c({type:Boolean})],hs.prototype,"autofocus",2),ps([c({type:String,reflect:!0})],hs.prototype,"value",2),ps([c({type:Boolean,reflect:!0})],hs.prototype,"checked",2),ps([c({type:Boolean,reflect:!0})],hs.prototype,"disabled",2),ps([c({type:Boolean,reflect:!0})],hs.prototype,"emphasized",2),ps([c({type:Boolean,reflect:!0})],hs.prototype,"invalid",2),ps([c({type:Boolean,reflect:!0})],hs.prototype,"readonly",2),customElements.define("sp-radio",hs);var ms=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,gs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?bs(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ms(e,r,a),a};class vs extends(x(lo)){constructor(){super(...arguments),this.name="",this.rovingTabindexController=new r(this,{focusInIndex:t=>t.findIndex((t=>this.selected?!t.disabled&&t.value===this.selected:!t.disabled)),elementEnterAction:t=>{this.selected=t.value},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.selected=""}get buttons(){return this.defaultNodes.filter((t=>t instanceof hs))}focus(){this.rovingTabindexController.focus()}_setSelected(t){if(t===this.selected)return;const e=this.selected,r=t?this.querySelector(`sp-radio[value="${t}"]`):void 0;this.selected=r?t:"",this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))?this.validateRadios():this.selected=e}willUpdate(t){if(!this.hasUpdated){this.setAttribute("role","radiogroup");const t=this.querySelector("sp-radio[checked]"),e=t?t.value:"";if(this.selected=e||this.selected,this.selected&&this.selected!==e){const t=this.querySelector(`sp-radio[value="${this.selected}"]`);t?t.checked=!0:this.selected=""}this.shadowRoot.addEventListener("change",(t=>{t.stopPropagation();const e=t.target;this._setSelected(e.value)}))}t.has("selected")&&this.validateRadios()}async validateRadios(){let t=!1;this.hasUpdated||await this.updateComplete,this.buttons.map((e=>{e.checked=this.selected===e.value,t=t||e.checked})),t||(this.selected="")}handleSlotchange(){this.rovingTabindexController.clearElementCache()}}gs([c({type:String})],vs.prototype,"name",2),gs([h("")],vs.prototype,"defaultNodes",2),gs([c({reflect:!0})],vs.prototype,"selected",2),customElements.define("sp-radio-group",vs),customElements.define("sp-sidenav-heading",q);var fs=Object.defineProperty,ks=Object.getOwnPropertyDescriptor,ys=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?ks(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&fs(e,r,a),a};const ws={toNormalized:(t,e,r)=>(t-e)/(r-e),fromNormalized:(t,e,r)=>t*(r-e)+e},xs={fromAttribute:t=>"previous"===t?t:parseFloat(t),toAttribute:t=>t.toString()},zs={fromAttribute:t=>"next"===t?t:parseFloat(t),toAttribute:t=>t.toString()};class Ts extends m{constructor(){super(...arguments),this._forcedUnit="",this.dragging=!1,this.highlight=!1,this.name="",this.label="",this.getAriaHandleText=(t,e)=>e.format(t),this.languageResolver=new Co(this),this.normalization=ws}get handleName(){return this.name}get focusElement(){var t,e;return null!=(e=null==(t=this.handleController)?void 0:t.inputForHandle(this))?e:this}update(t){var e;if(!this.hasUpdated){const{max:t,min:e}=this;null==this.value&&!isNaN(t)&&!isNaN(e)&&(this.value=t<e?e:e+(t-e)/2)}(t.has("formatOptions")||t.has(To))&&delete this._numberFormatCache,t.has("value")&&null!=t.get("value")&&this.updateComplete.then((()=>{var t;null==(t=this.handleController)||t.setValueFromHandle(this)})),null==(e=this.handleController)||e.handleHasChanged(this),super.update(t)}firstUpdated(t){super.firstUpdated(t),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const t=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(t)}getNumberFormat(){var t;if(!this._numberFormatCache||this.languageResolver.language!==this._numberFormatCache.language){let t;try{t=new qo(this.languageResolver.language,this.formatOptions),this._forcedUnit=""}catch(e){const{style:r,unit:o,unitDisplay:s,...a}=this.formatOptions||{};"unit"===r&&(this._forcedUnit=o),t=new qo(this.languageResolver.language,a)}this._numberFormatCache={language:this.languageResolver.language,numberFormat:t}}return null==(t=this._numberFormatCache)?void 0:t.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}}ys([c({type:Number})],Ts.prototype,"value",2),ys([c({type:Boolean,reflect:!0})],Ts.prototype,"dragging",2),ys([c({type:Boolean})],Ts.prototype,"highlight",2),ys([c({type:String})],Ts.prototype,"name",2),ys([c({reflect:!0,converter:xs})],Ts.prototype,"min",2),ys([c({reflect:!0,converter:zs})],Ts.prototype,"max",2),ys([c({type:Number,reflect:!0})],Ts.prototype,"step",2),ys([c({type:Object,attribute:"format-options"})],Ts.prototype,"formatOptions",2),ys([c({type:String})],Ts.prototype,"label",2),ys([c({attribute:!1})],Ts.prototype,"getAriaHandleText",2),ys([c({attribute:!1})],Ts.prototype,"normalization",2),customElements.define("sp-slider-handle",Ts);var Cs=o`
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
`;class Ps{constructor(t){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let t=[...this.host.querySelectorAll('[slot="handle"]')];0===t.length&&(t=[this.host]),!t.some((t=>this.waitForUpgrade(t)))&&(this.handles=new Map,this.handleOrder=[],t.forEach(((t,e)=>{var r;null!=(r=t.handleName)&&r.length||(t.name=`handle${e+1}`),this.handles.set(t.handleName,t),this.handleOrder.push(t.handleName),t.handleController=this})),this.requestUpdate())},this.onInputChange=t=>{const e=t.target;e.model.handle.value=e.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(e,e.model.handle)},this.onInputFocus=t=>{const e=t.target;let r;try{r=e.matches(":focus-visible")||this.host.matches(".focus-visible")}catch(t){r=this.host.matches(".focus-visible")}e.model.handle.highlight=r,this.requestUpdate()},this.onInputBlur=t=>{t.target.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=t=>{t.target.model.handle.highlight=!0,this.requestUpdate()},this.host=t,new g(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom()}}),this.extractModelFromLightDom()}get values(){const t={};for(const e of this.handles.values())t[e.handleName]=e.value;return t}get size(){return this.handles.size}inputForHandle(t){if(this.handles.has(t.handleName)){const{input:e}=this.getHandleElements(t);return e}throw new Error(`No input for handle "${t.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate()}setValueFromHandle(t){const e=this.getHandleElements(t);if(!e)return;const{input:r}=e;r.valueAsNumber===t.value?t.dragging&&t.dispatchInputEvent():(r.valueAsNumber=t.value,this.requestUpdate()),t.value=r.valueAsNumber}handleHasChanged(t){t!==this.host&&this.requestUpdate()}formattedValueForHandle(t){var e;const{handle:r}=t,o=null!=(e=r.numberFormat)?e:this.host.numberFormat;return r.getAriaHandleText(t.value,o)}get formattedValues(){const t=new Map;for(const e of this.model)t.set(e.name,this.formattedValueForHandle(e));return t}get focusElement(){const{input:t}=this.getActiveHandleElements();return this.host.editable&&!t.model.handle.dragging?this.host.numberField:t}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(t){return!(t instanceof Ts)&&(t.addEventListener("sp-slider-handle-ready",(()=>this.extractModelFromLightDom()),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const t=this.activeHandle;return`input-${this.model.findIndex((e=>e.name===t))}`}activateHandle(t){const e=this.handleOrder.findIndex((e=>e===t));e>=0&&this.handleOrder.splice(e,1),this.handleOrder.push(t)}getActiveHandleElements(){const t=this.activeHandle,e=this.handles.get(t);return{model:e,...this.getHandleElements(e)}}getHandleElements(t){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const t=this.host.shadowRoot.querySelectorAll(".handle > input");for(const e of t){const t=e,r=t.parentElement,o=this.handles.get(r.getAttribute("name"));o&&this.handleRefMap.set(o,{input:t,handle:r})}}return this.handleRefMap.get(t)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(t){if(!this._activePointerEventData){let e=t.target.querySelector(":scope > .input");const r=!e,o=e?e.model:this.model.find((t=>t.name===this.activeHandle));!e&&!!o&&(e=o.handle.focusElement),this._activePointerEventData={input:e,model:o,resolvedInput:r}}return this._activePointerEventData}handlePointerdown(t){const{resolvedInput:e,model:r}=this.extractDataFromEvent(t);r&&!this.host.disabled&&0===t.button?(this.host.track.setPointerCapture(t.pointerId),this.updateBoundingRect(),"mouse"===t.pointerType&&this.host.labelEl.click(),this.draggingHandle=r.handle,r.handle.dragging=!0,this.activateHandle(r.name),e&&this.handlePointermove(t),this.requestUpdate()):t.preventDefault()}handlePointerup(t){const{input:e,model:r}=this.extractDataFromEvent(t);delete this._activePointerEventData,r&&("mouse"===t.pointerType&&this.host.labelEl.click(),this.cancelDrag(r),this.requestUpdate(),this.host.track.releasePointerCapture(t.pointerId),this.dispatchChangeEvent(e,r.handle))}handlePointermove(t){const{input:e,model:r}=this.extractDataFromEvent(t);!r||!this.draggingHandle||(t.stopPropagation(),e.value=this.calculateHandlePosition(t,r).toString(),r.handle.value=parseFloat(e.value),this.host.indeterminate=!1,this.requestUpdate())}cancelDrag(t){t=t||this.model.find((t=>t.name===this.activeHandle)),t&&(t.handle.highlight=!1,delete this.draggingHandle,t.handle.dragging=!1)}dispatchChangeEvent(t,e){t.valueAsNumber=e.value;const r=new Event("change",{bubbles:!0,composed:!0});e.dispatchEvent(r)}calculateHandlePosition(t,e){const r=this.boundingClientRect,o=r.left,s=t.clientX,a=r.width,i=(this.host.isLTR?s-o:a-(s-o))/a;return e.normalization.fromNormalized(i,e.range.min,e.range.max)}renderHandle(t,e,r,o){var s;const a={handle:!0,dragging:(null==(s=this.draggingHandle)?void 0:s.handleName)===t.name,"handle-highlight":t.highlight},c={[this.host.isLTR?"left":"right"]:100*t.normalizedValue+"%","z-index":r.toString(),"background-color":`var(--spectrum-slider-handle-background-color-${e}, var(--spectrum-slider-handle-default-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${e}, var(-spectrum-slider-handle-default-border-color))`},l=o?`label input-${e}`:"label";return i`
            <div
                class=${B(a)}
                name=${t.name}
                style=${K(c)}
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
                    aria-disabled=${f(this.host.disabled?"true":void 0)}
                    tabindex=${f(this.host.editable?-1:void 0)}
                    aria-label=${f(t.ariaLabel)}
                    aria-labelledby=${l}
                    aria-valuetext=${this.formattedValueForHandle(t)}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${t}
                />
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map(((t,e)=>{const r=this.handleOrder.indexOf(t.name)+1;return this.renderHandle(t,e,r,this.model.length>1)}))}trackSegments(){const t=this.model.map((t=>t.normalizedValue));return t.sort(((t,e)=>t-e)),t.unshift(0),t.map(((t,e,r)=>{var o;return[t,null!=(o=r[e+1])?o:1]}))}updateModel(){const t=[...this.handles.values()],e=e=>{const r=t[e],o=t[e-1],s=t[e+1],a="number"==typeof r.min?r.min:this.host.min,i="number"==typeof r.max?r.max:this.host.max,c={range:{min:a,max:i},clamp:{min:a,max:i}};if("previous"===r.min&&o){for(let r=e-1;r>=0;r--){const e=t[r];if("number"==typeof e.min){c.range.min=e.min;break}}c.clamp.min=Math.max(o.value,c.range.min)}if("next"===r.max&&s){for(let r=e+1;r<t.length;r++){const e=t[r];if("number"==typeof e.max){c.range.max=e.max;break}}c.clamp.max=Math.min(s.value,c.range.max)}return c},r=t.map(((t,r)=>{var o;const s=e(r),{toNormalized:a}=t.normalization,i=Math.max(Math.min(t.value,s.clamp.max),s.clamp.min),c=a(i,s.range.min,s.range.max);return{name:t.handleName,value:i,normalizedValue:c,highlight:t.highlight,step:null!=(o=t.step)?o:this.host.step,normalization:t.normalization,handle:t,ariaLabel:t!==this.host&&(null==t?void 0:t.label.length)>0?t.label:void 0,...s}}));this.model=r}async handleUpdatesComplete(){const t=[...this.handles.values()].filter((t=>t!==this.host)).map((t=>t.updateComplete));await Promise.all(t)}}var Bs=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,Is=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ss(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Bs(e,r,a),a};const qs=["filled","ramp","range","tick"];class As extends(v(Ts,"")){constructor(){super(...arguments),this.handleController=new Ps(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=t=>{const e=[...t.values()];return 2===e.length?`${e[0]}${this._forcedUnit} - ${e[1]}${this._forcedUnit}`:e.join(`${this._forcedUnit}, `)+this._forcedUnit},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this.quiet=!1,this.indeterminate=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[Cs]}get editable(){return this._editable}set editable(t){if(t===this.editable)return;const e=this.editable;this._editable=this.handleController.size<2&&t,this.editable&&(this._numberFieldInput=Promise.resolve().then((function(){return Ko}))),e!==this.editable&&this.requestUpdate("editable",e)}set variant(t){const e=this.variant;t!==this.variant&&(qs.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(t){this.editable&&(t.preventDefault(),this.focus())}render(){return i`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?i`
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
                  `:i``}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(t){this.handleController.hostUpdate(),t.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(t)}renderLabel(){const t="none"===this.labelVisibility||"value"===this.labelVisibility,e="none"===this.labelVisibility||"text"===this.labelVisibility;return i`
            <div id="label-container">
                <sp-field-label
                    class=${B({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                >
                    ${this.slotHasContent?i``:this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <output
                    class=${B({"visually-hidden":e})}
                    id="value"
                    aria-live="off"
                    for="input"
                >
                    ${this.ariaValueText}
                </output>
            </div>
        `}renderRamp(){return"ramp"!==this.variant?i``:i`
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
        `}renderTicks(){if("tick"!==this.variant)return i``;const t=this.tickStep||this.step,e=(this.max-this.min)/t,r=e%1!=0,o=new Array(Math.floor(e+1));return o.fill(0,0,e+1),i`
            <div
                class="${r?"not-exact ":""}ticks"
                style=${f(r?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${o.map(((e,r)=>i`
                        <div class="tick">
                            ${this.tickLabels?i`
                                      <div class="tickLabel">
                                          ${r*t+this.min}
                                      </div>
                                  `:i``}
                        </div>
                    `))}
            </div>
        `}renderTrackSegment(t,e){return"ramp"===this.variant?i``:i`
            <div
                class="track"
                style=${K(this.trackSegmentStyles(t,e))}
                role="presentation"
            ></div>
        `}renderTrack(){const t=this.handleController.trackSegments(),e=[{id:"track0",html:this.renderTrackSegment(...t[0])},{id:"ramp",html:this.renderRamp()},{id:"ticks",html:this.renderTicks()},{id:"handles",html:this.handleController.render()},...t.slice(1).map((([t,e],r)=>({id:`track${r+1}`,html:this.renderTrackSegment(t,e)})))];return i`
            <div
                id="track"
                ${je({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            >
                <div id="controls">
                    ${V(e,(t=>t.id),(t=>t.html))}
                </div>
            </div>
        `}handlePointerdown(t){this.handleController.handlePointerdown(t)}handlePointermove(t){this.handleController.handlePointermove(t)}handlePointerup(t){this.handleController.handlePointerup(t)}handleNumberInput(t){var e;const{value:r}=t.target;!(null==(e=t.target)?void 0:e.managedInput)||isNaN(r)?t.stopPropagation():this.value=r}handleNumberChange(t){var e;const{value:r}=t.target;isNaN(r)?(t.target.value=this.value,t.stopPropagation()):(this.value=r,null!=(e=t.target)&&e.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(t,e){const r=e-t;return{width:100*r+"%","--spectrum-slider-track-background-size":1/r*100+"%","--spectrum-slider-track-segment-position":100*t+"%"}}async getUpdateComplete(){const t=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),t}}Is([c({type:Boolean,reflect:!0})],As.prototype,"editable",1),Is([c({type:Boolean,reflect:!0,attribute:"hide-stepper"})],As.prototype,"hideStepper",2),Is([c()],As.prototype,"type",2),Is([c({type:String})],As.prototype,"variant",1),Is([c({attribute:!1})],As.prototype,"getAriaValueText",2),Is([c({type:String,reflect:!0,attribute:"label-visibility"})],As.prototype,"labelVisibility",2),Is([c({type:Number,reflect:!0})],As.prototype,"min",2),Is([c({type:Number,reflect:!0})],As.prototype,"max",2),Is([c({type:Number})],As.prototype,"step",2),Is([c({type:Number,attribute:"tick-step"})],As.prototype,"tickStep",2),Is([c({type:Boolean,attribute:"tick-labels"})],As.prototype,"tickLabels",2),Is([c({type:Boolean,reflect:!0})],As.prototype,"disabled",2),Is([c({type:Boolean})],As.prototype,"quiet",2),Is([c({type:Boolean})],As.prototype,"indeterminate",2),Is([y("#label")],As.prototype,"labelEl",2),Is([y("#number-field")],As.prototype,"numberField",2),Is([y("#track")],As.prototype,"track",2),customElements.define("sp-slider",As);var Es=o`
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
)}sp-button{--spectrum-button-m-primary-outline-texticon-border-radius:calc(var(--spectrum-button-primary-fill-texticon-text-size)*var(
--spectrum-button-primary-fill-texticon-text-line-height
) + var(--spectrum-icon-tshirt-size-height)/2 + var(--spectrum-alias-border-size-thick))}sp-popover{display:none}::slotted(sp-menu){display:none}.more-medium{height:18px;margin:1px -4px 0;width:18px}
`,$s=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,Ds=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ls(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&$s(e,r,a),a};const Os={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class Ms extends(b(C)){constructor(){super(...arguments),this.left=!1,this.variant="accent",this.type="field",this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[Es,T]}get target(){return this}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}sizePopover(t){t.style.setProperty("min-width",`${this.offsetWidth}px`)}passClick(){const t="more"===this.type?this.menuItems[0]:this.selectedItem||this.menuItems[0];t&&t.click()}get buttonContent(){var t;return[i`
                <div
                    id="label"
                    role="presentation"
                    class=${f(this.value?void 0:"placeholder")}
                >
                    ${(null==(t=this.selectedItem)?void 0:t.itemText)||""}
                </div>
            `]}update(t){t.has("type")&&("more"===this.type?this.selects=void 0:this.selects="single"),t.has("value")&&this.manageSplitButtonItems(),super.update(t)}render(){const t=["cta","accent"].includes(this.variant)?"fill":"outline",e=[i`
                <sp-button
                    aria-label=${f(this.label||void 0)}
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
            `,i`
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
                    ${"field"===this.type?i`
                              <sp-icon-chevron100
                                  class="icon ${Os[this.size]}"
                              ></sp-icon-chevron100>
                          `:i`
                              <sp-icon-more class="icon"></sp-icon-more>
                          `}
                </sp-button>
            `];return this.left&&e.reverse(),i`
            ${e}
        `}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection()}async manageSplitButtonItems(){!this.menuItems.length&&(await this.updateComplete,!this.menuItems.length)||("more"===this.type?(this.menuItems[0].hidden=!0,this.menuItems.forEach((t=>t.selected=!1)),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value)}}Ds([c({type:Boolean,reflect:!0})],Ms.prototype,"left",2),Ds([c({reflect:!0})],Ms.prototype,"variant",2),Ds([c({type:String})],Ms.prototype,"type",2),Ds([y(".trigger")],Ms.prototype,"trigger",2),customElements.define("sp-split-button",Ms);var Hs=o`
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
)}:host([resizable]) #splitter:focus-visible{background-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
)}:host([resizable]) #splitter.focus-visible #gripper{border-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400))}:host([resizable]) #splitter:focus-visible #gripper{border-color:var(
--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(--spectrum-alias-focus-color,var(--spectrum-global-color-blue-400))}:host([resizable]) #splitter.focus-visible #gripper:before{background-color:var(
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
`,Us=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Fs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?js(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Us(e,r,a),a};class _s extends a{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=3840,this.secondaryMin=0,this.secondaryMax=3840,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=3840;const t=window.ResizeObserver;t&&(this.observer=new t((()=>{this.rect=void 0,this.updateMinMax()})))}static get styles(){return[Hs]}connectedCallback(){var t;super.connectedCallback(),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){const t={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)};return i`
            <slot
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?i`
                      <div
                          id="splitter"
                          class=${B(t)}
                          role="separator"
                          aria-label=${f(this.label||void 0)}
                          tabindex=${f(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${je({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?i`
                                    <div id="gripper"></div>
                                `:i``}
                      </div>
                  `:l}
        `}onContentSlotChange(){this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(t){!this.resizable||t.button&&0!==t.button?t.preventDefault():(this.splitter.setPointerCapture(t.pointerId),this.offset=this.getOffset())}onPointermove(t){t.preventDefault();let e=this.vertical||this.isLTR?this.getPosition(t)-this.offset:this.offset-this.getPosition(t);this.collapsible&&e<this.minPos-50&&(e=0),this.collapsible&&e>this.maxPos+50&&(e=this.viewSize-this.splitterSize),this.updatePosition(e)}onPointerup(t){this.splitter.releasePointerCapture(t.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const t=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:t}getPosition(t){return this.vertical?t.clientY:t.clientX}movePosition(t,e){t.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+e)}onKeydown(t){if(!this.resizable)return;let e=0;const r=this.isLTR||this.vertical;switch(t.key){case"Home":return t.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return t.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":e=r?-1:1;break;case"ArrowRight":e=r?1:-1;break;case"ArrowUp":case"PageUp":e=this.vertical?-1:1;break;case"ArrowDown":case"PageDown":e=this.vertical?1:-1}if(0!==e){const r=t.key.startsWith("Page")?50:10;this.movePosition(t,r*e)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const t=await this.calcStartPos();this.updatePosition(t)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(t){let e=this.getLimitedPosition(t);this.collapsible&&t<=0&&(e=0),this.collapsible&&t>this.maxPos&&t>=this.viewSize-this.splitterSize&&(e=this.viewSize-this.splitterSize),e!==this.splitterPos&&(this.splitterPos=e,this.dispatchChangeEvent())}getLimitedPosition(t){return t<=this.minPos?this.minPos:t>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,t))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const t=this.paneSlot.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement));if(void 0!==t.updateComplete&&await t.updateComplete,t){const e=window.getComputedStyle(t).getPropertyValue(this.vertical?"height":"width"),r=parseFloat(e);if(!isNaN(r))return this.getLimitedPosition(Math.ceil(r))}}return this.viewSize/2}dispatchChangeEvent(){const t=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(t)}willUpdate(t){(!this.hasUpdated||t.has("primarySize"))&&(this.splitterPos=void 0,this.checkResize()),t.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}Fs([c({type:Boolean,reflect:!0})],_s.prototype,"vertical",2),Fs([c({type:Boolean,reflect:!0})],_s.prototype,"resizable",2),Fs([c({type:Boolean,reflect:!0})],_s.prototype,"collapsible",2),Fs([c({type:Number,attribute:"primary-min"})],_s.prototype,"primaryMin",2),Fs([c({type:Number,attribute:"primary-max"})],_s.prototype,"primaryMax",2),Fs([c({type:String,attribute:"primary-size"})],_s.prototype,"primarySize",2),Fs([c({type:Number,attribute:"secondary-min"})],_s.prototype,"secondaryMin",2),Fs([c({type:Number,attribute:"secondary-max"})],_s.prototype,"secondaryMax",2),Fs([c({type:Number,reflect:!0,attribute:"splitter-pos"})],_s.prototype,"splitterPos",2),Fs([c({type:String,attribute:!1})],_s.prototype,"firstPaneSize",2),Fs([c()],_s.prototype,"label",2),Fs([c({type:Boolean,attribute:!1})],_s.prototype,"enoughChildren",2),Fs([c({type:Number})],_s.prototype,"viewSize",2),Fs([y("slot")],_s.prototype,"paneSlot",2),Fs([y("#splitter")],_s.prototype,"splitter",2),customElements.define("sp-split-view",_s);var Rs=o`
:host([dir]){--spectrum-statuslight-corner-radius:50%;--spectrum-statuslight-font-weight:400;--spectrum-statuslight-border-width:var(--spectrum-border-width-100);--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-medium
);--spectrum-statuslight-line-height:var(--spectrum-line-height-100);--spectrum-statuslight-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(
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
`,Ns=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Gs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Vs(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Ns(e,r,a),a};class Ks extends(b(a)){constructor(){super(...arguments),this.disabled=!1,this.variant="info"}static get styles(){return[Rs]}render(){return i`
            <slot></slot>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Gs([c({type:Boolean,reflect:!0})],Ks.prototype,"disabled",2),Gs([c({reflect:!0})],Ks.prototype,"variant",2),customElements.define("sp-status-light",Ks);var Xs=o`
:host{--spectrum-swatch-focus-indicator-border-radius:8px;--spectrum-swatch-icon-border-color:rgba(0,0,0,.51);--spectrum-swatch-size:var(--spectrum-swatch-size-small);--spectrum-swatch-border-radius:var(--spectrum-corner-radius-100);--spectrum-swatch-border-thickness:var(--spectrum-border-width-100);--spectrum-swatch-border-thickness-selected:var(
--spectrum-border-width-200
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
);--spectrum-swatch-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-swatch-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-swatch-border-color-selected:var(--spectrum-gray-900);--spectrum-swatch-inner-border-color-selected:var(--spectrum-gray-50);--spectrum-swatch-disabled-icon-border-color:var(
--spectrum-swatch-disabled-icon-border-color
);--spectrum-swatch-disabled-icon-color:var(--spectrum-white);--spectrum-swatch-dash-icon-color:var(--spectrum-gray-800);--spectrum-swatch-slash-icon-color:var(--spectrum-red-900);--spectrum-swatch-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}:host([size=xs]){--spectrum-swatch-size:var(
--spectrum-swatch-size-extra-small
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-extra-small
)}:host([size=s]){--spectrum-swatch-size:var(
--spectrum-swatch-size-small
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
)}:host([size=m]){--spectrum-swatch-size:var(
--spectrum-swatch-size-medium
);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-100
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-medium
)}:host([size=l]){--spectrum-swatch-size:var(
--spectrum-swatch-size-large
);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-200
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-large
)}@media (forced-colors:active){:host{--highcontrast-swatch-disabled-icon-color:GrayText;--highcontrast-swatch-focus-indicator-color:ButtonText;--highcontrast-swatch-background-color-selected:Background;--highcontrast-swatch-border-color-selected:Highlight;--highcontrast-swatch-border-color:ButtonText;--highcontrast-swatch-fill-foreground-color:ButtonText}.fill{forced-color-adjust:none}:host([disabled]) .fill{forced-color-adjust:auto}}:host{align-items:center;display:flex;height:var(--mod-swatch-size,var(--spectrum-swatch-size));justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:var(
--mod-swatch-size,var(--spectrum-swatch-size)
)}.disabledIcon{height:var(
--mod-swatch-disabled-icon-size,var(--spectrum-swatch-disabled-icon-size)
);width:var(
--mod-swatch-disabled-icon-size,var(--spectrum-swatch-disabled-icon-size)
)}:host,:host:before{border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
)}:host([selected]){background-color:var(
--highcontrast-swatch-background-color-selected,var(
--mod-swatch-inner-border-color-selected,var(--spectrum-swatch-inner-border-color-selected)
)
)}:host([selected]) .fill{border-radius:0;clip-path:polygon(calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2))}:host([selected]) .fill:before{border-radius:0;box-shadow:none}:host([selected]):before{opacity:1}:host(.is-image) .fill:before{background-color:transparent}:host([mixed-value]) .fill{background:var(
--spectrum-picked-color,transparent
)}:host([mixed-value]) .mixedValueIcon{color:var(
--spectrum-swatch-dash-icon-color
);visibility:visible}:host([nothing]) .fill{background-color:var(
--spectrum-picked-color,transparent
);background-image:none}:host([nothing]) .fill:after{background:var(
--highcontrast-swatch-fill-foreground-color,var(
--mod-swatch-slash-icon-color,var(--spectrum-swatch-slash-icon-color)
)
);content:"";height:var(
--mod-swatch-slash-thickness,var(--spectrum-swatch-slash-thickness)
);position:absolute;transform:rotate(-45deg);width:200%}:host([nothing][shape=rectangle]) .fill:after{transform:rotate(-25deg)}:host([disabled]) .disabledIcon,:host([disabled]) .disabledIcon{visibility:visible}:host:before{border-color:var(
--highcontrast-swatch-border-color-selected,var(
--mod-swatch-border-color-selected,var(--spectrum-swatch-border-color-selected)
)
);border-style:solid;border-width:var(
--mod-swatch-border-thickness-selected,var(--spectrum-swatch-border-thickness-selected)
);content:"";inset:0;opacity:0;pointer-events:none;position:absolute}:host:after{border-color:var(
--highcontrast-swatch-focus-indicator-color,var(
--mod-swatch-focus-indicator-color,var(--spectrum-swatch-focus-indicator-color)
)
);border-radius:var(
--mod-swatch-focus-indicator-border-radius,var(--spectrum-swatch-focus-indicator-border-radius)
);border-style:solid;border-width:var(
--mod-swatch-focus-indicator-thickness,var(--spectrum-swatch-focus-indicator-thickness)
);content:"";inset:calc(var(
--mod-swatch-focus-indicator-gap,
var(--spectrum-swatch-focus-indicator-gap)
)*-2);opacity:0;position:absolute;transition:opacity var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out}:host(.focus-visible):after{opacity:1}:host(:focus-visible):after{opacity:1}.fill{--spectrum-swatch-checkerboard-size:8px;--spectrum-swatch-checkerboard-background-offset:0px;--spectrum-swatch-checkerboard-dark-color:#d9d9d9;--spectrum-swatch-checkerboard-light-color:#fff;align-items:center;background-color:var(--spectrum-swatch-checkerboard-light-color);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-swatch-checkerboard-dark-color) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-swatch-checkerboard-dark-color) 75.5%),linear-gradient(-45deg,var(--spectrum-swatch-checkerboard-dark-color) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-swatch-checkerboard-dark-color) 25.5%,transparent 25.5%);background-position:var(--spectrum-swatch-checkerboard-background-offset) var(--spectrum-swatch-checkerboard-background-offset),var(--spectrum-swatch-checkerboard-background-offset) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
) + var(--spectrum-swatch-checkerboard-background-offset)),calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
) + var(--spectrum-swatch-checkerboard-background-offset)) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*-1 + var(--spectrum-swatch-checkerboard-background-offset)),calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*-1 + var(--spectrum-swatch-checkerboard-background-offset)) var(--spectrum-swatch-checkerboard-background-offset);background-size:calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*2) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*2);border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
);box-sizing:border-box;display:flex;height:100%;justify-content:center;overflow:hidden;position:relative;width:100%}.fill:before{background-color:var(--spectrum-picked-color,transparent);border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
);box-shadow:inset 0 0 0 var(
--mod-swatch-border-thickness,var(--spectrum-swatch-border-thickness)
) var(
--highcontrast-swatch-border-color,var(--mod-swatch-border-color,var(--spectrum-swatch-border-color))
);content:"";inset:0;position:absolute;z-index:0}:host([border=none]) .fill:before{background-color:var(--spectrum-picked-color,transparent);box-shadow:none}.mixedValueIcon{color:var(
--spectrum-picked-color,transparent
)}.disabledIcon,.mixedValueIcon{pointer-events:none;visibility:hidden}.disabledIcon{stroke:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
);color:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
);position:relative;z-index:2}.disabledIcon path:first-child{fill:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
)}.disabledIcon path:last-child{fill:var(
--mod-swatch-icon-border-color,var(--spectrum-swatch-icon-border-color)
)}:host([shape=rectangle]){width:calc(var(--mod-swatch-size, var(--spectrum-swatch-size))*2)}:host([rounding=none]),:host([rounding=none]) .fill,:host([rounding=none]) .fill:before,:host([rounding=none]):after,:host([rounding=none]):before,:host([rounding=none][selected]) .fill,:host([rounding=none][selected]) .fill:before{border-radius:0}:host([rounding=full]:not([shape=rectangle])),:host([rounding=full]:not([shape=rectangle])) .fill,:host([rounding=full]:not([shape=rectangle])) .fill:before,:host([rounding=full]:not([shape=rectangle])):after,:host([rounding=full]:not([shape=rectangle])):before,:host([rounding=full][selected]:not([shape=rectangle])) .fill,:host([rounding=full][selected]:not([shape=rectangle])) .fill:before{border-radius:100%}:host([rounding=full][selected]:not([shape=rectangle])) .fill{clip-path:circle(calc(50% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) at 50% 50%)}::slotted([slot=image]){height:100%;object-fit:contain;transition:width var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,height var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;width:100%}
`,Ys=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,Zs=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ws(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Ys(e,r,a),a};const Qs={xs:()=>i`
        <sp-icon-dash75
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,s:()=>i`
        <sp-icon-dash100
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,m:()=>i`
        <sp-icon-dash200
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,l:()=>i`
        <sp-icon-dash300
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class Js extends(b(m,{validSizes:["xs","s","m","l"]})){constructor(){super(...arguments),this.color="",this.label="",this.mixedValue=!1,this.nothing=!1,this.role="button",this.selected=!1,this.renderDisabled=()=>i`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="disabledIcon"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.889,1a8.889,8.889,0,1,0,8.889,8.889A8.889,8.889,0,0,0,9.889,1Zm6.667,8.889a6.635,6.635,0,0,1-1.233,3.863l-9.3-9.3A6.667,6.667,0,0,1,16.556,9.889Zm-13.333,0A6.636,6.636,0,0,1,4.455,6.026l9.3,9.3A6.667,6.667,0,0,1,3.222,9.889Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-color)"
                />
                <path
                    d="M 9.888889312744141 1 C 4.979689598083496 1 1 4.979689598083496 1 9.888889312744141 C 1 14.7980899810791 4.979689598083496 18.77777862548828 9.888889312744141 18.77777862548828 C 14.7980899810791 18.77777862548828 18.77777862548828 14.7980899810791 18.77777862548828 9.888889312744141 C 18.77777862548828 4.979689598083496 14.7980899810791 1 9.888889312744141 1 M 15.32277870178223 13.75166893005371 L 6.02610969543457 4.454998970031738 C 8.059318542480469 3.009572982788086 10.72937774658203 2.820217132568359 12.9462194442749 3.964249610900879 C 15.16304969787598 5.10828971862793 16.55568885803223 7.394259452819824 16.5555591583252 9.888889312744141 C 16.55776977539062 11.27357959747314 16.126708984375 12.62425994873047 15.32277870178223 13.75166893005371 M 9.888258934020996 16.55648612976074 C 8.843273162841797 16.55648612976074 7.794573783874512 16.31111145019531 6.831318855285645 15.8139591217041 C 4.614439010620117 14.66977882385254 3.221879959106445 12.38361930847168 3.222219467163086 9.888889312744141 C 3.220088958740234 8.504219055175781 3.651140213012695 7.153559684753418 4.454998970031738 6.02610969543457 L 13.75166893005371 15.32333946228027 C 12.60186290740967 16.14075088500977 11.24825286865234 16.55648612976074 9.888258934020996 16.55648612976074 M 9.888889312744141 0 C 15.34163951873779 0 19.77777862548828 4.436139106750488 19.77777862548828 9.888889312744141 C 19.77777862548828 15.34163951873779 15.34163951873779 19.77777862548828 9.888889312744141 19.77777862548828 C 4.436139106750488 19.77777862548828 0 15.34163951873779 0 9.888889312744141 C 0 4.436139106750488 4.436139106750488 0 9.888889312744141 0 Z M 15.10232830047607 12.11699867248535 C 15.40205764770508 11.41858959197998 15.55679702758789 10.66494941711426 15.5555591583252 9.89048957824707 C 15.5556697845459 7.759209632873535 14.38009929656982 5.829549789428711 12.48761940002441 4.852889060974121 C 11.68764972686768 4.440059661865234 10.78924942016602 4.22184944152832 9.889529228210449 4.22184944152832 C 9.114802360534668 4.22184944152832 8.360831260681152 4.377038955688477 7.661839485168457 4.676509857177734 L 15.10232830047607 12.11699867248535 Z M 12.11597919464111 15.10181331634521 L 4.675475120544434 7.660861015319824 C 4.375750541687012 8.359296798706055 4.221027374267578 9.112875938415527 4.222219467163086 9.887349128723145 C 4.221929550170898 12.01874923706055 5.397418975830078 13.94855880737305 7.289958953857422 14.92533874511719 C 8.08997917175293 15.3382396697998 8.988459587097168 15.55648994445801 9.888258934020996 15.55648994445801 C 10.66298007965088 15.55648994445801 11.41698551177979 15.40128421783447 12.11597919464111 15.10181331634521 Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-stroke-color)"
                />
            </svg>
        `,this.renderMixedValue=()=>Qs[this.size]()}static get styles(){return[Xs,ge]}get value(){return this._value||this.color||this.label}set value(t){if(t===this._value)return;const e=this.value;this._value=t,this.requestUpdate("value",e)}get focusElement(){return this}toggle(t){this.selected=null!=t?t:!this.selected}handleClick(){this.disabled||this.mixedValue||(this.toggle(),this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||this.toggle())}handleKeydown(t){const{code:e}=t;if("Space"===e)t.preventDefault(),this.addEventListener("keyup",this.handleKeyup)}handleKeypress(t){const{code:e}=t;switch(e){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(t){const{code:e}=t;if("Space"===e)this.removeEventListener("keyup",this.handleKeyup),this.click()}render(){return i`
            <div class="fill" style="--spectrum-picked-color: ${this.color}">
                <slot name="image"></slot>
                ${et(this.disabled,this.renderDisabled)}
                ${et(this.mixedValue,this.renderMixedValue)}
            </div>
        `}willUpdate(t){if(this.getAttribute("role")||this.setAttribute("role","button"),t.has("selected")||t.has("role")){const e="button"===this.role?"aria-pressed":"aria-checked",r="button"===this.role?"aria-checked":"aria-pressed";t.has("role")&&this.removeAttribute(r),this.setAttribute(e,this.selected?"true":"false")}t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.hasAttribute("tabindex")||(this.tabIndex=0)}}Zs([c({reflect:!0})],Js.prototype,"border",2),Zs([c()],Js.prototype,"color",2),Zs([c()],Js.prototype,"label",2),Zs([c({type:Boolean,reflect:!0,attribute:"mixed-value"})],Js.prototype,"mixedValue",2),Zs([c({type:Boolean,reflect:!0})],Js.prototype,"nothing",2),Zs([c({reflect:!0})],Js.prototype,"role",2),Zs([c({reflect:!0})],Js.prototype,"rounding",2),Zs([c({type:Boolean,reflect:!0})],Js.prototype,"selected",2),Zs([c({reflect:!0})],Js.prototype,"shape",2),Zs([c()],Js.prototype,"value",1),customElements.define("sp-swatch",Js);var ta=o`
:host{--spectrum-swatchgroup-spacing-compact:var(
--spectrum-spacing-50
);--spectrum-swatchgroup-spacing-regular:var(--spectrum-spacing-75);--spectrum-swatchgroup-spacing-spacious:var(--spectrum-spacing-100)}:host{align-items:flex-start;display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start}:host{gap:var(
--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular)
)}:host([density=compact]){gap:var(
--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact)
)}:host([density=spacious]){gap:var(
--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious)
)}
`,ea=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,oa=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?ra(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ea(e,r,a),a};class sa extends(b(a,{validSizes:["xs","s","m","l"]})){constructor(){super(),this._selected=[],this.selectedSet=new Set,this.rovingTabindexController=new r(this,{focusInIndex:t=>{let e=-1;const r=t.findIndex(((r,o)=>(!t[e]&&!r.disabled&&(e=o),r.selected&&!r.disabled)));return t[r]?r:e},elements:()=>[...this.children],isFocusableElement:t=>!t.disabled}),this.manageChange=()=>{const t=new Set;this.selectedSet=new Set(this.selected),[...this.children].forEach((e=>{t.add(e.value),e.selected&&this.selectedSet.add(e.value)})),this.selectedSet.forEach((e=>{t.has(e)||this.selectedSet.delete(e)})),this._selected=[...this.selectedSet]},new g(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange()}})}static get styles(){return[ta]}get selected(){return this._selected}set selected(t){if(t===this.selected)return;const e=this.selected;this._selected=t,this.requestUpdate("selected",e)}focus(t){this.rovingTabindexController.focus(t)}handleChange(t){t.stopPropagation();const e=this.selected;if(this.selects){if("single"===this.selects){const{target:e}=t;e.tabIndex=0,this.selectedSet.clear(),this.selectedSet.add(e.value),this.rovingTabindexController.elements.forEach((t=>{t!==e&&(t.selected=!1)}))}else if("multiple"===this.selects){const{target:e}=t;e.selected?this.selectedSet.add(e.value):this.selectedSet.delete(e.value)}this._selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this.selected=e,t.preventDefault())}else t.preventDefault()}getPassthroughSwatchActions(t){const e={};t.has("border")&&(this.border||void 0!==t.get("border"))&&(e.border=this.border),t.has("rounding")&&(this.rounding||void 0!==t.get("rounding"))&&(e.rounding=this.rounding),t.has("size")&&(this.size||void 0!==t.get("size"))&&(e.size=this.size),t.has("shape")&&(this.shape||void 0!==t.get("shape"))&&(e.shape=this.shape);const r=[];return Object.keys(e).length&&r.push((t=>{"border"in e&&(t.border=e.border),"rounding"in e&&(t.rounding=e.rounding),"shape"in e&&(t.shape=e.shape),"size"in e&&(t.size=e.size)})),r}getSelectionSwatchActions(t){const e=[];if(!t.has("selects"))return e;this.selects?this.setAttribute("role","single"===this.selects?"radiogroup":"group"):this.removeAttribute("role");const r=this.selects?{single:"radio",multiple:"checkbox"}[this.selects]:"button";return e.push((t=>{t.setAttribute("role",r)})),e}render(){return i`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(t){const e=[...this.getPassthroughSwatchActions(t),...this.getSelectionSwatchActions(t)],r=new Set(this.selected),o=new Set;t.has("selected")&&e.push((t=>{o.add(t.value),r.has(t.value)||t.selected?t.selected=!0:t.selected=!1})),this.rovingTabindexController.elements.forEach((t=>{e.forEach((e=>{e(t)}))})),t.has("selected")&&(this.selected=[...r].filter((t=>o.has(t))),this.rovingTabindexController.clearElementCache())}}oa([c({reflect:!0})],sa.prototype,"border",2),oa([c({reflect:!0})],sa.prototype,"rounding",2),oa([c({type:Array})],sa.prototype,"selected",1),oa([c()],sa.prototype,"selects",2),oa([c({reflect:!0})],sa.prototype,"shape",2),customElements.define("sp-swatch-group",sa);var aa=o`
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
) - 100%)*-1))}#input[disabled],:host([disabled]) #input{cursor:default}#input.focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#input:focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#label{color:var(
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
)}#input:focus-visible+#switch:before,:host(:hover) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
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
)}:host(:hover[checked]) #input:focus-visible+#switch:before,:host([checked]) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
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
`;var ia=o`
#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}
`,ca=Object.defineProperty,la=Object.getOwnPropertyDescriptor;class na extends(b(me)){constructor(){super(...arguments),this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[aa,ia]:[aa]}render(){return i`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("role","switch")}updated(t){t.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?la(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&ca(e,r,a)})([c({type:Boolean,reflect:!0})],na.prototype,"emphasized",2),customElements.define("sp-switch",na);var da=o`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host(:focus){outline:0}:host([dir=ltr]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host{background-color:var(
--spectrum-table-m-regular-row-background-color,var(--spectrum-alias-background-color-transparent)
);border-bottom:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host(:hover){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(:focus-visible),:host([focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(:active){background-color:var(
--spectrum-table-m-regular-row-background-color-down,var(--spectrum-alias-highlight-down)
)}:host([selected]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}:host([selected]:hover){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}:host([selected].focus-visible),:host([selected][focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([selected]:focus-visible),:host([selected][focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([drop-target]):before{background-color:var(--spectrum-alias-highlight-selected);box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}:host{display:flex;width:100%}
`,ua=Object.defineProperty,pa=Object.getOwnPropertyDescriptor,ha=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?pa(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ua(e,r,a),a};class ma extends a{constructor(){super(...arguments),this.role="row",this.selectable=!1,this.selected=!1,this.value=""}static get styles(){return[da]}async handleChange(t){this.selected=t.target.checkbox.checked,await 0,t.defaultPrevented&&(this.selected=!this.selected)}handleSlotchange({target:t}){const e=t.assignedElements();this.selectable=!!e.find((t=>"sp-table-checkbox-cell"===t.localName))}manageSelected(){const[t]=this.checkboxCells;!t||(t.checked=this.selected)}handleClick(t){if(t.composedPath().find((t=>"sp-checkbox"===t.localName)))return;const[e]=this.checkboxCells;!e||e.click()}render(){return i`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(t){t.has("selected")&&this.manageSelected(),t.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick))}}ha([u({selector:"sp-table-checkbox-cell",flatten:!0})],ma.prototype,"checkboxCells",2),ha([c({reflect:!0})],ma.prototype,"role",2),ha([c({type:Boolean})],ma.prototype,"selectable",2),ha([c({type:Boolean,reflect:!0})],ma.prototype,"selected",2),ha([c({type:String})],ma.prototype,"value",2),customElements.define("sp-table-row",ma);var ba=o`
:host([align=center]){text-align:center}:host([dir=ltr][align=end]){text-align:right}:host([dir=rtl][align=end]){text-align:left}:host([dir=ltr]){padding-left:var(
--spectrum-table-regular-cell-padding-left
);padding-right:var(--spectrum-table-regular-cell-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-cell-padding-right);padding-right:var(
--spectrum-table-regular-cell-padding-left
)}:host{box-sizing:border-box;font-size:var(--spectrum-table-regular-cell-text-size);font-weight:var(--spectrum-table-regular-cell-text-font-weight);line-height:var(--spectrum-table-regular-cell-text-line-height);min-height:calc(var(--spectrum-table-regular-cell-min-height) - var(--spectrum-table-regular-cell-padding-top) - var(--spectrum-table-regular-cell-padding-bottom));padding-bottom:var(--spectrum-table-regular-cell-padding-bottom);padding-top:var(--spectrum-table-regular-cell-padding-top)}:host{position:relative}:host(.focus-visible),:host(.is-focused){outline:none}:host(.is-focused),:host(:focus-visible){outline:none}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr].focus-visible):before{right:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]:focus-visible):before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl].focus-visible):before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]:focus-visible):before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr].focus-visible):before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]:focus-visible):before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl].focus-visible):before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]:focus-visible):before{right:0}:host(.focus-visible):before,:host(.is-focused):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(.is-focused):before,:host(:focus-visible):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr]) .divider{border-right-width:var(
--spectrum-table-regular-divider-border-size
)}:host([dir=rtl]) .divider{border-left-width:var(
--spectrum-table-regular-divider-border-size
)}:host(.focus-visible):before,:host(.is-focused):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(.is-focused):before,:host(:focus-visible):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{background-color:var(
--spectrum-table-m-regular-cell-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-cell-text-color,var(--spectrum-alias-text-color)
)}:host([dir=ltr]) .divider{border-right-style:solid}:host([dir=rtl]) .divider{border-left-style:solid}:host([dir=ltr]) .divider{border-right-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) .divider{border-left-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host{display:block;flex:1}
`;var ga=o`
:host([dir=ltr]) .sortedIcon{margin-left:var(
--spectrum-table-regular-header-sort-icon-gap
)}:host([dir=rtl]) .sortedIcon{margin-right:var(
--spectrum-table-regular-header-sort-icon-gap
)}:host([dir=ltr]){text-align:left}:host([dir=rtl]){text-align:right}:host([dir=ltr]){padding-left:var(
--spectrum-table-regular-header-padding-left
);padding-right:var(--spectrum-table-regular-header-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-header-padding-right);padding-right:var(
--spectrum-table-regular-header-padding-left
)}:host{border-radius:var(--spectrum-table-regular-header-border-radius);box-sizing:border-box;cursor:default;font-size:var(--spectrum-table-regular-header-text-size);font-weight:var(--spectrum-table-regular-header-text-font-weight);letter-spacing:var(--spectrum-table-regular-header-text-letter-spacing);line-height:var(--spectrum-table-regular-header-text-line-height);min-height:var(--spectrum-table-regular-header-min-height);outline:0;padding-bottom:var(--spectrum-table-regular-header-padding-bottom);padding-top:var(--spectrum-table-regular-header-padding-top);text-transform:uppercase;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([sortable]){cursor:pointer}:host([sort-direction=asc]) .sortedIcon,:host([sort-direction=desc]) .sortedIcon{display:inline-block;margin-top:calc(var(--spectrum-global-dimension-size-25)*-1)}:host([sort-direction=asc]) .sortedIcon{transform:rotate(-90deg)}:host{position:relative}:host(.focus-visible),:host([focused]){outline:none}:host(:focus-visible),:host([focused]){outline:none}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=ltr]) .spectrum-Table-headCell:focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=rtl]) .spectrum-Table-headCell:focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=ltr]) .spectrum-Table-headCell:focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=rtl]) .spectrum-Table-headCell:focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:0}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(:focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host(.focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(
--spectrum-table-regular-border-size
)}:host(:focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(
--spectrum-table-regular-border-size
)}:host{background-color:var(
--spectrum-table-m-regular-header-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-header-text-color,var(--spectrum-alias-label-text-color)
)}:host([sortable]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color,var(--spectrum-global-color-gray-600)
)}:host([sortable]:hover){color:var(
--spectrum-table-m-regular-header-text-color-hover,var(--spectrum-alias-text-color-hover)
)}:host([sortable]:hover) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([sortable].focus-visible),:host([sortable][focused]){color:var(
--spectrum-table-m-regular-header-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([sortable]:focus-visible),:host([sortable][focused]){color:var(
--spectrum-table-m-regular-header-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([sortable].focus-visible) .sortedIcon,:host([sortable][focused]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([sortable]:focus-visible) .sortedIcon,:host([sortable][focused]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([sortable][active]){color:var(
--spectrum-table-m-regular-header-text-color-down,var(--spectrum-alias-text-color-down)
)}:host([sortable][active]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{display:block;flex:1}
`;var va=o`
:host([dir=ltr]){padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]){padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.checkbox{vertical-align:super}:host{align-items:center;display:flex;flex:0 1 0%}:host([selects-single]) sp-checkbox{visibility:hidden}
`,fa=Object.defineProperty,ka=Object.getOwnPropertyDescriptor,ya=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?ka(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&fa(e,r,a),a};class wa extends a{constructor(){super(...arguments),this.role="gridcell",this.indeterminate=!1,this.checked=!1,this.disabled=!1,this.selectsSingle=!1}static get styles(){return[ba,ga,va]}click(){this.checkbox.click()}render(){return i`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                aria-hidden=${f(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}ya([c({reflect:!0})],wa.prototype,"role",2),ya([y(".checkbox")],wa.prototype,"checkbox",2),ya([c({type:Boolean})],wa.prototype,"indeterminate",2),ya([c({type:Boolean})],wa.prototype,"checked",2),ya([c({type:Boolean})],wa.prototype,"disabled",2),ya([c({type:Boolean,reflect:!0,attribute:"selects-single"})],wa.prototype,"selectsSingle",2),customElements.define("sp-table-checkbox-cell",wa);var xa=o`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(--spectrum-table-regular-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-regular-cell-vertical-alignment)}:host{background-color:var(
--spectrum-table-m-regular-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
);border-style:solid}:host([drop-target]){border-color:var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}:host([drop-target]):before{background-color:var(
--spectrum-alias-highlight-selected
)}:host{display:block}:host(:not([tabindex])){overflow:visible}
`,za=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor;class Ca extends a{constructor(){super(),this.role="rowgroup",new g(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame((()=>{this.shouldHaveTabIndex()}))}})}static get styles(){return[xa]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex")}render(){return i`
            <slot></slot>
        `}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ta(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&za(e,r,a)})([c({reflect:!0})],Ca.prototype,"role",2),customElements.define("sp-table-body",Ca);var Pa=o`
:host{border-collapse:separate;border-spacing:0}:host([size=s]){--spectrum-table-compact-quiet-border-radius:var(
--spectrum-table-s-compact-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-header-border-radius:var(
--spectrum-table-s-compact-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-cell-border-radius-key-focus:var(
--spectrum-table-s-compact-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-divider-border-size:var(
--spectrum-table-s-compact-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-compact-header-text-size:var(
--spectrum-table-s-compact-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-compact-header-text-font-weight:var(
--spectrum-table-s-compact-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-compact-header-text-letter-spacing:var(
--spectrum-table-s-compact-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-compact-header-text-line-height:var(
--spectrum-table-s-compact-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-compact-header-sort-icon-gap:var(
--spectrum-table-s-compact-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-compact-header-min-height:var(
--spectrum-table-s-compact-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-header-padding-top:var(
--spectrum-table-s-compact-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-bottom:var(
--spectrum-table-s-compact-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-left:var(
--spectrum-table-s-compact-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-header-padding-right:var(
--spectrum-table-s-compact-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-text-size:var(
--spectrum-table-s-compact-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-compact-cell-text-font-weight:var(
--spectrum-table-s-compact-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-compact-cell-text-line-height:var(
--spectrum-table-s-compact-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-compact-cell-checkbox-padding-right:var(
--spectrum-table-s-compact-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-compact-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-compact-cell-checkbox-vertical-alignment,middle
);--spectrum-table-compact-cell-min-height:var(
--spectrum-table-s-compact-cell-min-height,var(--spectrum-global-dimension-size-300)
);--spectrum-table-compact-cell-padding-top:var(
--spectrum-table-s-compact-cell-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-table-compact-cell-padding-bottom:var(
--spectrum-table-s-compact-cell-padding-bottom,var(--spectrum-global-dimension-size-50)
);--spectrum-table-compact-cell-padding-left:var(
--spectrum-table-s-compact-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-padding-right:var(
--spectrum-table-s-compact-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-vertical-alignment:var(
--spectrum-table-s-compact-cell-vertical-alignment,top
);--spectrum-table-compact-border-radius:var(
--spectrum-table-s-compact-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-border-size:var(
--spectrum-table-s-compact-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-quiet-border-radius:var(
--spectrum-table-s-regular-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-header-border-radius:var(
--spectrum-table-s-regular-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-cell-border-radius-key-focus:var(
--spectrum-table-s-regular-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-divider-border-size:var(
--spectrum-table-s-regular-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-header-text-size:var(
--spectrum-table-s-regular-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-regular-header-text-font-weight:var(
--spectrum-table-s-regular-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-regular-header-text-letter-spacing:var(
--spectrum-table-s-regular-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-regular-header-text-line-height:var(
--spectrum-table-s-regular-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-regular-header-sort-icon-gap:var(
--spectrum-table-s-regular-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-regular-header-min-height:var(
--spectrum-table-s-regular-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-header-padding-top:var(
--spectrum-table-s-regular-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-bottom:var(
--spectrum-table-s-regular-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-left:var(
--spectrum-table-s-regular-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-header-padding-right:var(
--spectrum-table-s-regular-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-text-size:var(
--spectrum-table-s-regular-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-regular-cell-text-font-weight:var(
--spectrum-table-s-regular-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-regular-cell-text-line-height:var(
--spectrum-table-s-regular-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-regular-cell-checkbox-padding-right:var(
--spectrum-table-s-regular-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-regular-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-regular-cell-checkbox-vertical-alignment,middle
);--spectrum-table-regular-cell-min-height:var(
--spectrum-table-s-regular-cell-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-cell-padding-top:var(
--spectrum-table-s-regular-cell-padding-top,var(--spectrum-global-dimension-size-85)
);--spectrum-table-regular-cell-padding-bottom:var(
--spectrum-table-s-regular-cell-padding-bottom,var(--spectrum-global-dimension-size-85)
);--spectrum-table-regular-cell-padding-left:var(
--spectrum-table-s-regular-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-padding-right:var(
--spectrum-table-s-regular-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-vertical-alignment:var(
--spectrum-table-s-regular-cell-vertical-alignment,top
);--spectrum-table-regular-border-radius:var(
--spectrum-table-s-regular-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-border-size:var(
--spectrum-table-s-regular-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-quiet-border-radius:var(
--spectrum-table-s-spacious-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-header-border-radius:var(
--spectrum-table-s-spacious-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-cell-border-radius-key-focus:var(
--spectrum-table-s-spacious-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-divider-border-size:var(
--spectrum-table-s-spacious-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-header-text-size:var(
--spectrum-table-s-spacious-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-spacious-header-text-font-weight:var(
--spectrum-table-s-spacious-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-spacious-header-text-letter-spacing:var(
--spectrum-table-s-spacious-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-spacious-header-text-line-height:var(
--spectrum-table-s-spacious-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-spacious-header-sort-icon-gap:var(
--spectrum-table-s-spacious-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-header-min-height:var(
--spectrum-table-s-spacious-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-spacious-header-padding-top:var(
--spectrum-table-s-spacious-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-bottom:var(
--spectrum-table-s-spacious-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-left:var(
--spectrum-table-s-spacious-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-header-padding-right:var(
--spectrum-table-s-spacious-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-text-size:var(
--spectrum-table-s-spacious-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-spacious-cell-text-font-weight:var(
--spectrum-table-s-spacious-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-spacious-cell-text-line-height:var(
--spectrum-table-s-spacious-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-spacious-cell-checkbox-padding-right:var(
--spectrum-table-s-spacious-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-spacious-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-spacious-cell-checkbox-vertical-alignment,middle
);--spectrum-table-spacious-cell-min-height:var(
--spectrum-table-s-spacious-cell-min-height,var(--spectrum-global-dimension-size-500)
);--spectrum-table-spacious-cell-padding-top:var(
--spectrum-table-s-spacious-cell-padding-top,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-cell-padding-bottom:var(
--spectrum-table-s-spacious-cell-padding-bottom,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-cell-padding-left:var(
--spectrum-table-s-spacious-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-padding-right:var(
--spectrum-table-s-spacious-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-vertical-alignment:var(
--spectrum-table-s-spacious-cell-vertical-alignment,top
);--spectrum-table-spacious-border-radius:var(
--spectrum-table-s-spacious-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-border-size:var(
--spectrum-table-s-spacious-border-size,var(--spectrum-alias-border-size-thin)
)}:host([size=m]){--spectrum-table-compact-quiet-border-radius:var(
--spectrum-table-m-compact-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-header-border-radius:var(
--spectrum-table-m-compact-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-cell-border-radius-key-focus:var(
--spectrum-table-m-compact-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-divider-border-size:var(
--spectrum-table-m-compact-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-compact-header-text-size:var(
--spectrum-table-m-compact-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-compact-header-text-font-weight:var(
--spectrum-table-m-compact-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-compact-header-text-letter-spacing:var(
--spectrum-table-m-compact-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-compact-header-text-line-height:var(
--spectrum-table-m-compact-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-compact-header-sort-icon-gap:var(
--spectrum-table-m-compact-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-compact-header-min-height:var(
--spectrum-table-m-compact-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-header-padding-top:var(
--spectrum-table-m-compact-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-bottom:var(
--spectrum-table-m-compact-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-left:var(
--spectrum-table-m-compact-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-header-padding-right:var(
--spectrum-table-m-compact-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-text-size:var(
--spectrum-table-m-compact-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-compact-cell-text-font-weight:var(
--spectrum-table-m-compact-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-compact-cell-text-line-height:var(
--spectrum-table-m-compact-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-compact-cell-checkbox-padding-right:var(
--spectrum-table-m-compact-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-compact-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-compact-cell-checkbox-vertical-alignment,middle
);--spectrum-table-compact-cell-min-height:var(
--spectrum-table-m-compact-cell-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-cell-padding-top:var(
--spectrum-table-m-compact-cell-padding-top,var(--spectrum-global-dimension-size-85)
);--spectrum-table-compact-cell-padding-bottom:var(
--spectrum-table-m-compact-cell-padding-bottom,var(--spectrum-global-dimension-size-85)
);--spectrum-table-compact-cell-padding-left:var(
--spectrum-table-m-compact-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-padding-right:var(
--spectrum-table-m-compact-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-vertical-alignment:var(
--spectrum-table-m-compact-cell-vertical-alignment,top
);--spectrum-table-compact-border-radius:var(
--spectrum-table-m-compact-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-border-size:var(
--spectrum-table-m-compact-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-quiet-border-radius:var(
--spectrum-table-m-regular-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-header-border-radius:var(
--spectrum-table-m-regular-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-cell-border-radius-key-focus:var(
--spectrum-table-m-regular-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-divider-border-size:var(
--spectrum-table-m-regular-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-header-text-size:var(
--spectrum-table-m-regular-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-regular-header-text-font-weight:var(
--spectrum-table-m-regular-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-regular-header-text-letter-spacing:var(
--spectrum-table-m-regular-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-regular-header-text-line-height:var(
--spectrum-table-m-regular-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-regular-header-sort-icon-gap:var(
--spectrum-table-m-regular-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-regular-header-min-height:var(
--spectrum-table-m-regular-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-header-padding-top:var(
--spectrum-table-m-regular-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-bottom:var(
--spectrum-table-m-regular-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-left:var(
--spectrum-table-m-regular-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-header-padding-right:var(
--spectrum-table-m-regular-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-text-size:var(
--spectrum-table-m-regular-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-regular-cell-text-font-weight:var(
--spectrum-table-m-regular-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-regular-cell-text-line-height:var(
--spectrum-table-m-regular-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-regular-cell-checkbox-padding-right:var(
--spectrum-table-m-regular-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-regular-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-regular-cell-checkbox-vertical-alignment,middle
);--spectrum-table-regular-cell-min-height:var(
--spectrum-table-m-regular-cell-min-height,var(--spectrum-global-dimension-size-500)
);--spectrum-table-regular-cell-padding-top:var(
--spectrum-table-m-regular-cell-padding-top,var(--spectrum-global-dimension-size-130)
);--spectrum-table-regular-cell-padding-bottom:var(
--spectrum-table-m-regular-cell-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-table-regular-cell-padding-left:var(
--spectrum-table-m-regular-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-padding-right:var(
--spectrum-table-m-regular-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-vertical-alignment:var(
--spectrum-table-m-regular-cell-vertical-alignment,top
);--spectrum-table-regular-border-radius:var(
--spectrum-table-m-regular-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-border-size:var(
--spectrum-table-m-regular-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-quiet-border-radius:var(
--spectrum-table-m-spacious-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-header-border-radius:var(
--spectrum-table-m-spacious-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-cell-border-radius-key-focus:var(
--spectrum-table-m-spacious-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-divider-border-size:var(
--spectrum-table-m-spacious-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-header-text-size:var(
--spectrum-table-m-spacious-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-spacious-header-text-font-weight:var(
--spectrum-table-m-spacious-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-spacious-header-text-letter-spacing:var(
--spectrum-table-m-spacious-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-spacious-header-text-line-height:var(
--spectrum-table-m-spacious-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-spacious-header-sort-icon-gap:var(
--spectrum-table-m-spacious-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-header-min-height:var(
--spectrum-table-m-spacious-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-spacious-header-padding-top:var(
--spectrum-table-m-spacious-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-bottom:var(
--spectrum-table-m-spacious-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-left:var(
--spectrum-table-m-spacious-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-header-padding-right:var(
--spectrum-table-m-spacious-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-text-size:var(
--spectrum-table-m-spacious-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-spacious-cell-text-font-weight:var(
--spectrum-table-m-spacious-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-spacious-cell-text-line-height:var(
--spectrum-table-m-spacious-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-spacious-cell-checkbox-padding-right:var(
--spectrum-table-m-spacious-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-spacious-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-spacious-cell-checkbox-vertical-alignment,middle
);--spectrum-table-spacious-cell-min-height:var(
--spectrum-table-m-spacious-cell-min-height,var(--spectrum-global-dimension-size-600)
);--spectrum-table-spacious-cell-padding-top:var(
--spectrum-table-m-spacious-cell-padding-top,var(--spectrum-global-dimension-size-185)
);--spectrum-table-spacious-cell-padding-bottom:var(
--spectrum-table-m-spacious-cell-padding-bottom,var(--spectrum-global-dimension-size-185)
);--spectrum-table-spacious-cell-padding-left:var(
--spectrum-table-m-spacious-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-padding-right:var(
--spectrum-table-m-spacious-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-vertical-alignment:var(
--spectrum-table-m-spacious-cell-vertical-alignment,top
);--spectrum-table-spacious-border-radius:var(
--spectrum-table-m-spacious-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-border-size:var(
--spectrum-table-m-spacious-border-size,var(--spectrum-alias-border-size-thin)
)}.spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}.spectrum-Table-body.is-drop-target:before,.spectrum-Table-row.is-drop-target:before,:host([density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}.spectrum-Table-body{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(--spectrum-table-regular-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-regular-cell-vertical-alignment)}:host(:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-regular-cell-padding-left
);padding-right:var(--spectrum-table-regular-cell-padding-right)}:host([dir=rtl]) .spectrum-Table-cell{padding-left:var(--spectrum-table-regular-cell-padding-right);padding-right:var(
--spectrum-table-regular-cell-padding-left
)}.spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-regular-cell-text-size);font-weight:var(--spectrum-table-regular-cell-text-font-weight);line-height:var(--spectrum-table-regular-cell-text-line-height);min-height:calc(var(--spectrum-table-regular-cell-min-height) - var(--spectrum-table-regular-cell-padding-top) - var(--spectrum-table-regular-cell-padding-bottom));padding-bottom:var(--spectrum-table-regular-cell-padding-bottom);padding-top:var(--spectrum-table-regular-cell-padding-top);position:relative}.spectrum-Table-cell.focus-visible,.spectrum-Table-cell.is-focused{outline:none}.spectrum-Table-cell.is-focused,.spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]) .spectrum-Table-cell:focus-visible:before{right:0}.spectrum-Table-cell.focus-visible:before,.spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}.spectrum-Table-cell.is-focused:before,.spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-regular-divider-border-size
)}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-regular-divider-border-size
)}.spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.spectrum-Table-row:focus{outline:0}:host>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}.spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-regular-quiet-border-radius
)}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,.spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}.spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.spectrum-Table-checkbox{vertical-align:super}:host([density=compact]) .spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr][density=compact]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl][density=compact]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=compact]) .spectrum-Table-body{border-radius:var(--spectrum-table-compact-border-radius);border-width:var(--spectrum-table-compact-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-compact-cell-vertical-alignment)}:host([density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-compact-border-radius);border-width:var(
--spectrum-table-compact-border-size
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-compact-cell-padding-left
);padding-right:var(--spectrum-table-compact-cell-padding-right)}:host([dir=rtl][density=compact]) .spectrum-Table-cell{padding-left:var(--spectrum-table-compact-cell-padding-right);padding-right:var(
--spectrum-table-compact-cell-padding-left
)}:host([density=compact]) .spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-compact-cell-text-size);font-weight:var(--spectrum-table-compact-cell-text-font-weight);line-height:var(--spectrum-table-compact-cell-text-line-height);min-height:calc(var(--spectrum-table-compact-cell-min-height) - var(--spectrum-table-compact-cell-padding-top) - var(--spectrum-table-compact-cell-padding-bottom));padding-bottom:var(--spectrum-table-compact-cell-padding-bottom);padding-top:var(--spectrum-table-compact-cell-padding-top)}:host([density=compact]) .spectrum-Table-cell{position:relative}:host([density=compact]) .spectrum-Table-cell.focus-visible,:host([density=compact]) .spectrum-Table-cell.is-focused{outline:none}:host([density=compact]) .spectrum-Table-cell.is-focused,:host([density=compact]) .spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell:focus-visible:before{right:0}:host([density=compact]) .spectrum-Table-cell.focus-visible:before,:host([density=compact]) .spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-compact-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=compact]) .spectrum-Table-cell.is-focused:before,:host([density=compact]) .spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-compact-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr][density=compact]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-compact-divider-border-size
)}:host([dir=rtl][density=compact]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-compact-divider-border-size
)}:host([density=compact]) .spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([density=compact]) .spectrum-Table-row:focus{outline:0}:host([density=compact]) .spectrum-Table>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-compact-quiet-border-radius
)}:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][density=compact]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-compact-cell-checkbox-padding-right
)}:host([dir=rtl][density=compact]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-compact-cell-checkbox-padding-right
)}:host([density=compact]) .spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-compact-cell-checkbox-vertical-alignment
)}:host([density=compact]) .spectrum-Table-checkbox{vertical-align:super}:host([density=spacious]) .spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr][density=spacious]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl][density=spacious]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=spacious]) .spectrum-Table-body{border-radius:var(--spectrum-table-spacious-border-radius);border-width:var(--spectrum-table-spacious-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-spacious-cell-vertical-alignment)}:host([density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-spacious-border-radius);border-width:var(
--spectrum-table-spacious-border-size
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-spacious-cell-padding-left
);padding-right:var(--spectrum-table-spacious-cell-padding-right)}:host([dir=rtl][density=spacious]) .spectrum-Table-cell{padding-left:var(--spectrum-table-spacious-cell-padding-right);padding-right:var(
--spectrum-table-spacious-cell-padding-left
)}:host([density=spacious]) .spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-spacious-cell-text-size);font-weight:var(--spectrum-table-spacious-cell-text-font-weight);line-height:var(--spectrum-table-spacious-cell-text-line-height);min-height:calc(var(--spectrum-table-spacious-cell-min-height) - var(--spectrum-table-spacious-cell-padding-top) - var(--spectrum-table-spacious-cell-padding-bottom));padding-bottom:var(--spectrum-table-spacious-cell-padding-bottom);padding-top:var(--spectrum-table-spacious-cell-padding-top)}:host([density=spacious]) .spectrum-Table-cell{position:relative}:host([density=spacious]) .spectrum-Table-cell.focus-visible,:host([density=spacious]) .spectrum-Table-cell.is-focused{outline:none}:host([density=spacious]) .spectrum-Table-cell.is-focused,:host([density=spacious]) .spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell:focus-visible:before{right:0}:host([density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([density=spacious]) .spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-spacious-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=spacious]) .spectrum-Table-cell.is-focused:before,:host([density=spacious]) .spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-spacious-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr][density=spacious]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-spacious-divider-border-size
)}:host([dir=rtl][density=spacious]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-spacious-divider-border-size
)}:host([density=spacious]) .spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([density=spacious]) .spectrum-Table-row:focus{outline:0}:host([density=spacious]) .spectrum-Table>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-spacious-quiet-border-radius
)}:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][density=spacious]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-spacious-cell-checkbox-padding-right
)}:host([dir=rtl][density=spacious]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-spacious-cell-checkbox-padding-right
)}:host([density=spacious]) .spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-spacious-cell-checkbox-vertical-alignment
)}:host([density=spacious]) .spectrum-Table-checkbox{vertical-align:super}.spectrum-Table-cell.focus-visible:before,.spectrum-Table-cell.is-focused:before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}.spectrum-Table-cell.is-focused:before,.spectrum-Table-cell:focus-visible:before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}.spectrum-Table-body{background-color:var(
--spectrum-table-m-regular-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
);border-style:solid}.spectrum-Table-body.is-drop-target{border-color:var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table-body.is-drop-target:before{background-color:var(
--spectrum-alias-highlight-selected
)}:host([dir=ltr]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child{border-left:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child{border-right:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=ltr]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table-row{background-color:var(
--spectrum-table-m-regular-row-background-color,var(--spectrum-alias-background-color-transparent)
);border-bottom:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table-row:hover{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row.focus-visible,.spectrum-Table-row.is-focused{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row.is-focused,.spectrum-Table-row:focus-visible{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row:active{background-color:var(
--spectrum-table-m-regular-row-background-color-down,var(--spectrum-alias-highlight-down)
)}.spectrum-Table-row.is-selected{background-color:var(
--spectrum-table-m-regular-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}.spectrum-Table-row.is-selected:hover{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-selected.focus-visible,.spectrum-Table-row.is-selected.is-focused{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-selected.is-focused,.spectrum-Table-row.is-selected:focus-visible{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-drop-target:before{background-color:var(--spectrum-alias-highlight-selected);box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table-cell{background-color:var(
--spectrum-table-m-regular-cell-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-cell-text-color,var(--spectrum-alias-text-color)
)}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-style:solid}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-style:solid}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table--quiet .spectrum-Table-body{background-color:var(
--spectrum-table-m-regular-quiet-cell-background-color,var(--spectrum-alias-background-color-transparent)
);border-width:1px 0}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target{border-color:transparent;box-shadow:none}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before{box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table--quiet .spectrum-Table-row{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color,var(--spectrum-alias-background-color-transparent)
)}.spectrum-Table--quiet .spectrum-Table-row:hover{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.focus-visible,.spectrum-Table--quiet .spectrum-Table-row.is-focused{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-focused,.spectrum-Table--quiet .spectrum-Table-row:focus-visible{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row:active{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-down,var(--spectrum-alias-highlight-down)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected:hover{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected.focus-visible,.spectrum-Table--quiet .spectrum-Table-row.is-selected.is-focused{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected.is-focused,.spectrum-Table--quiet .spectrum-Table-row.is-selected:focus-visible{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:none}:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:none}:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:none}:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:none}:host{display:flex;flex-direction:column}
`;const Ba=t=>t,Sa=t=>i`${JSON.stringify(t,null,2)}`;const Ia=U(class extends tt{constructor(t){if(super(t),this.virtualizer=null,this.first=0,this.last=-1,this.renderItem=Sa,this.keyFunction=Ba,this.items=[],t.type!==F.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);const e=[],r=Math.min(this.items.length,this.last+1);if(this.first>=0&&this.last>=this.first)for(let t=this.first;t<r;t++)e.push(this.items[t]);return V(e,this.keyFunction||Ba,this.renderItem)}update(t,[e]){return this._setFunctions(e),this.items=e.items||[],this.virtualizer?this._updateVirtualizerConfig(e):(this.cachedConfig||setTimeout((()=>this._initialize(t))),this.cachedConfig=e),this.render()}_updateVirtualizerConfig(t){const{virtualizer:e}=this;e.items=this.items,t.layout&&(e.layout=t.layout),t.scrollToIndex&&(e.scrollToIndex=t.scrollToIndex)}_setFunctions(t){const{renderItem:e,keyFunction:r}=t;e&&(this.renderItem=(t,r)=>e(t,r+this.first)),r&&(this.keyFunction=r)}_initialize(t){const e=this.cachedConfig,r=t.parentNode;if(r&&1===r.nodeType){const{layout:o,scroller:s}=e;this.virtualizer=new G({hostElement:r,layout:o,scroller:s}),this.virtualizer.connected(),r.addEventListener("rangeChanged",(t=>{t.stopPropagation(),this.first=t.first,this.last=t.last,this.setValue(this.render())})),this.update(t,[e])}else console.log("uh-oh!")}disconnected(){var t;null===(t=this.virtualizer)||void 0===t||t.disconnected()}reconnected(){var t;null===(t=this.virtualizer)||void 0===t||t.connected()}});var qa=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,Ea=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Aa(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&qa(e,r,a),a},$a=(t=>(t[t.ITEM=0]="ITEM",t[t.INFORMATION=1]="INFORMATION",t))($a||{});const La=class extends Event{constructor(t){super(La.eventName,{bubbles:!0}),this.first=t.first,this.last=t.last}};let Da=La;Da.eventName="rangeChanged";class Oa extends(b(a,{validSizes:["s","m"],defaultSize:"m"})){constructor(){super(...arguments),this._renderItem=()=>i``,this.role="grid",this.selected=[],this.selectedSet=new Set,this.items=[],this.itemValue=(t,e)=>`${e}`,this.scroller=!1}static get styles(){return[Pa]}get renderItem(){return this._renderItem}set renderItem(t){this._renderItem=(e,r)=>{const o=this.itemValue(e,r),s=this.selected.includes(o),a=this.selects&&1!==(null==e?void 0:e._$rowType$);return i`
                <sp-table-row
                    value=${o}
                    aria-rowindex=${r+1}
                    ?selected=${s}
                >
                    ${a?i`
                              <sp-table-checkbox-cell
                                  ?checked=${s}
                              ></sp-table-checkbox-cell>
                          `:i``}
                    ${t(e,r)}
                </sp-table-row>
            `}}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return!!this.items.length}focus(){const t=this.querySelector("sp-table-head-cell[sortable]");t&&t.focus()}selectAllRows(){this.isVirtualized?this.items.forEach(((t,e)=>{1!==t._$rowType$&&this.selectedSet.add(this.itemValue(t,e))})):this.tableRows.forEach((t=>{t.selected=!0,this.selectedSet.add(t.value)})),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1)}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1)}manageSelects(){const t=this.querySelectorAll("sp-table-checkbox-cell"),e=document.createElement("sp-table-checkbox-cell");if(this.selects){let t=!1;this.isVirtualized?t=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach((t=>{if(t.selected=this.selectedSet.has(t.value),!t.querySelector(":scope > sp-table-checkbox-cell")){const r=e.cloneNode();t.insertAdjacentElement("afterbegin",r),e.checked=t.selected}})),t=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(t)}else t.forEach((t=>{t.remove()})),delete this.tableHeadCheckboxCell}validateSelected(){const t=new Set;this.isVirtualized?this.items.forEach(((e,r)=>{const o=this.itemValue(e,r);t.add(o)})):this.tableRows.forEach((e=>{t.add(e.value)}));const e=this.selected.length;this.selected=this.selected.filter((e=>t.has(e))),e!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected)}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach((t=>{t.selected=this.selectedSet.has(t.value)})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length))}manageCheckboxes(){var t;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell");const t=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(t),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach((t=>{const e=document.createElement("sp-table-checkbox-cell");t.insertAdjacentElement("afterbegin",e),t.selected=this.selectedSet.has(t.value),e.checked=t.selected}))}else null==(t=this.tableHead.querySelector("sp-table-checkbox-cell"))||t.remove(),this.tableRows.forEach((t=>{var e;null==(e=t.checkboxCells[0])||e.remove(),this.selected.length&&(t.selected=this.selectedSet.has(t.value))}))}manageHeadCheckbox(t){!this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell.selectsSingle="single"===this.selects,this.tableHeadCheckboxCell.checked=t,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!t)}handleChange(t){t.stopPropagation();const e=new Set(this.selectedSet),r=[...this.selected],{target:o}=t,{parentElement:s}=o;if(s.value)switch(this.selects){case"single":this.deselectAllRows(),s.selected&&(this.selectedSet.add(s.value),this.selected=[...this.selectedSet]);break;case"multiple":{s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value),this.selected=[...this.selectedSet];const t=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=t,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!t;break}}else{const{checkbox:t}=o;t.checked||t.indeterminate?this.selectAllRows():this.deselectAllRows()}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(t.preventDefault(),this.selectedSet=e,this.selected=r)}scrollToIndex(t){t&&this.renderVirtualizedItems(t)}render(){return i`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(t){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),t.has("selects")&&this.manageSelects(),t.has("selected")&&this.hasUpdated&&this.manageSelected()}updated(){this.items.length&&this.renderVirtualizedItems()}renderVirtualizedItems(t){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",(t=>{this.dispatchEvent(new Da({first:t.first,last:t.last}))})));const e={items:this.items,renderItem:this.renderItem,scroller:this.scroller};t&&(e.scrollToIndex={index:t}),p(i`
                ${Ia(e)}
            `,this.tableBody)}disconnectedCallback(){super.disconnectedCallback()}}Ea([c({reflect:!0})],Oa.prototype,"role",2),Ea([c({type:String,reflect:!0})],Oa.prototype,"selects",2),Ea([c({type:Array})],Oa.prototype,"selected",2),Ea([c({type:Array})],Oa.prototype,"items",2),Ea([c({type:Object})],Oa.prototype,"itemValue",2),Ea([c({type:Boolean,reflect:!0})],Oa.prototype,"scroller",2),customElements.define("sp-table",Oa);var Ma=Object.defineProperty,Ha=Object.getOwnPropertyDescriptor;class Ua extends a{constructor(){super(...arguments),this.role="gridcell"}static get styles(){return[ba]}render(){return i`
            <slot></slot>
        `}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ha(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&Ma(e,r,a)})([c({reflect:!0})],Ua.prototype,"role",2),customElements.define("sp-table-cell",Ua);var ja=o`
:host{display:flex}
`,Fa=Object.defineProperty,_a=Object.getOwnPropertyDescriptor,Ra=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?_a(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Fa(e,r,a),a};class Na extends a{constructor(){super(...arguments),this.role="row"}static get styles(){return[ja]}handleSorted({target:t}){[...this.children].forEach((e=>{e!==t&&(e.sortDirection=void 0)}))}handleChange({target:t}){this.selected=t.checkbox.checked||t.checkbox.indeterminate}render(){return i`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}Ra([c({reflect:!0})],Na.prototype,"role",2),Ra([c({type:Boolean,reflect:!0})],Na.prototype,"selected",2),customElements.define("sp-table-head",Na);var Va=o`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowDown75{transform:rotate(90deg)}.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ArrowUp100,.spectrum-UIIcon-ArrowUp200,.spectrum-UIIcon-ArrowUp300,.spectrum-UIIcon-ArrowUp400,.spectrum-UIIcon-ArrowUp500,.spectrum-UIIcon-ArrowUp600,.spectrum-UIIcon-ArrowUp75{transform:rotate(270deg)}.spectrum-UIIcon-ArrowDown75,.spectrum-UIIcon-ArrowLeft75,.spectrum-UIIcon-ArrowRight75,.spectrum-UIIcon-ArrowUp75{height:var(--spectrum-alias-ui-icon-arrow-size-75);width:var(
--spectrum-alias-ui-icon-arrow-size-75
)}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowRight100,.spectrum-UIIcon-ArrowUp100{height:var(--spectrum-alias-ui-icon-arrow-size-100);width:var(
--spectrum-alias-ui-icon-arrow-size-100
)}.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowRight200,.spectrum-UIIcon-ArrowUp200{height:var(--spectrum-alias-ui-icon-arrow-size-200);width:var(
--spectrum-alias-ui-icon-arrow-size-200
)}.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowRight300,.spectrum-UIIcon-ArrowUp300{height:var(--spectrum-alias-ui-icon-arrow-size-300);width:var(
--spectrum-alias-ui-icon-arrow-size-300
)}.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowRight400,.spectrum-UIIcon-ArrowUp400{height:var(--spectrum-alias-ui-icon-arrow-size-400);width:var(
--spectrum-alias-ui-icon-arrow-size-400
)}.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowRight500,.spectrum-UIIcon-ArrowUp500{height:var(--spectrum-alias-ui-icon-arrow-size-500);width:var(
--spectrum-alias-ui-icon-arrow-size-500
)}.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowRight600,.spectrum-UIIcon-ArrowUp600{height:var(--spectrum-alias-ui-icon-arrow-size-600);width:var(
--spectrum-alias-ui-icon-arrow-size-600
)}
`,Ga=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,Xa=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Ka(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Ga(e,r,a),a};class Ya extends a{constructor(){super(...arguments),this.role="columnheader",this.sortable=!1,this.sortKey=""}static get styles(){return[ga,Va]}handleClick(){!this.sortable||(this.sortDirection?this.sortDirection="asc"===this.sortDirection?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})))}render(){const t=this.sortable&&!!this.sortDirection;return i`
            <slot></slot>
            ${t?i`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:i``}
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}update(t){t.has("sortDirection")&&this.setAttribute("aria-sort",(t=>({asc:"ascending",desc:"descending"}[t]||"none"))(this.sortDirection)),t.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(t)}}Xa([c({reflect:!0})],Ya.prototype,"role",2),Xa([c({type:Boolean,reflect:!0})],Ya.prototype,"sortable",2),Xa([c({reflect:!0,attribute:"sort-direction"})],Ya.prototype,"sortDirection",2),Xa([c({attribute:"sort-key"})],Ya.prototype,"sortKey",2),customElements.define("sp-table-head-cell",Ya);var Wa=o`
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
`,Za=Object.defineProperty,Qa=Object.getOwnPropertyDescriptor,Ja=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?Qa(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&Za(e,r,a),a};class ti extends(b(a,{validSizes:["s","m","l"]})){constructor(){super(),this.deletable=!1,this.disabled=!1,this.readonly=!1,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.handleKeydown=t=>{if(!this.deletable)return;const{code:e}=t;switch(e){case"Backspace":case"Space":case"Delete":return void this.delete();default:return}},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Wa]}get hasIcon(){return!!this.querySelector('[slot="icon"]')}get hasAvatar(){return!!this.querySelector('[slot="avatar"]')}delete(){this.readonly||this.dispatchEvent(new Event("delete",{bubbles:!0}))}render(){const t=[];return this.hasAvatar&&t.push(i`
                    <slot name="avatar"></slot>
                `),this.hasIcon&&t.push(i`
                    <slot name="icon"></slot>
                `),i`
            ${t}
            <span class="label"><slot></slot></span>
            ${this.deletable?i`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `:i``}
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex",!this.disabled&&this.matches(":first-of-type:not([disabled])")?"0":"-1")}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Ja([c({type:Boolean,reflect:!0})],ti.prototype,"deletable",2),Ja([c({type:Boolean,reflect:!0})],ti.prototype,"disabled",2),Ja([c({type:Boolean,reflect:!0})],ti.prototype,"readonly",2),customElements.define("sp-tag",ti);var ei=o`
:host{--spectrum-taggroup-tag-gap-x:var(--spectrum-global-dimension-size-100);--spectrum-taggroup-tag-gap-y:var(--spectrum-global-dimension-size-100);display:inline-flex;list-style:none;margin:0;padding:0}::slotted(*){margin:calc(var(
--spectrum-taggroup-tag-gap-y,
var(--spectrum-global-dimension-size-100)
)/2) calc(var(
--spectrum-taggroup-tag-gap-x,
var(--spectrum-global-dimension-size-100)
)/2)}
`,ri=Object.defineProperty,oi=Object.getOwnPropertyDescriptor;class si extends(x(a)){constructor(){super(),this.rovingTabindexController=new r(this,{focusInIndex:t=>t.findIndex((t=>!t.disabled&&t.deletable)),elements:()=>this.tags,isFocusableElement:t=>!t.disabled&&t.deletable}),this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleKeydown=t=>{const{code:e}=t;if("PageUp"!==e&&"PageDown"!==e)return;const r=(t,e)=>t[(t.length+e)%t.length],o=[...this.getRootNode().querySelectorAll("sp-tags")];if(o.length<2)return;t.preventDefault();const s="PageUp"===e?-1:1;let a=o.indexOf(this)+s,i=r(o,a);for(;!i.tags.length;)a+=s,i=r(o,a);i.focus()},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[ei]}get tags(){return this.defaultNodes.filter((t=>t instanceof ti))}focus(){this.rovingTabindexController.focus()}handleSlotchange(){this.rovingTabindexController.clearElementCache()}render(){return i`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}firstUpdated(){this.hasAttribute("role")||this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","Tags")}}((t,e,r,o)=>{for(var s,a=o>1?void 0:o?oi(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);o&&a&&ri(e,r,a)})([h("")],si.prototype,"defaultNodes",2),customElements.define("sp-tags",si),customElements.define("sp-textfield",H);var ai=o`
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
);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(-45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%)}:host:before{box-shadow:inset 0 0 0 var(--spectrum-thumbnail-border-size) var(--spectrum-thumbnail-border-color)}:host([selected]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host([selected]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:none;overflow:visible}:host(:focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:none;overflow:visible}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(
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
`,ii=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,li=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?ci(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ii(e,r,a),a};class ni extends(b(a,{validSizes:["xxs","xs","s","m","l"],defaultSize:"s"})){constructor(){super(...arguments),this.cover=!1}static get styles(){return[ai]}render(){return i`
            ${this.background?i`
                      <div
                          class="background"
                          style="background: ${this.background}"
                      ></div>
                  `:i``}
            <slot></slot>
        `}}li([c({type:String,reflect:!0})],ni.prototype,"background",2),li([c({type:Boolean,reflect:!0})],ni.prototype,"cover",2),customElements.define("sp-thumbnail",ni);var di=o`
:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host([placement*=bottom][open]){transform:translateY(var(--spectrum-overlay-animation-distance))}:host([placement*=top][open]){transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([placement*=right][open]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([placement*=left][open]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{--spectrum-tooltip-neutral-target-offset:3px;--spectrum-tooltip-neutral-tip-width:var(
--spectrum-tooltip-neutral-tip-height,var(--spectrum-global-dimension-size-50)
)}:host{-webkit-font-smoothing:antialiased;align-items:center;border-radius:var(
--spectrum-tooltip-neutral-border-radius,var(--spectrum-alias-component-border-radius)
);box-sizing:border-box;display:inline-flex;flex-direction:row;font-size:var(
--spectrum-tooltip-neutral-text-size,var(--spectrum-global-dimension-font-size-75)
);font-weight:var(
--spectrum-tooltip-neutral-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);left:0;line-height:var(
--spectrum-tooltip-neutral-text-line-height,var(--spectrum-alias-component-text-line-height)
);max-width:var(
--spectrum-tooltip-neutral-max-width,var(--spectrum-global-dimension-size-2000)
);min-height:var(
--spectrum-tooltip-neutral-min-height,var(--spectrum-global-dimension-size-300)
);padding:0 var(
--spectrum-tooltip-neutral-padding-x,var(--spectrum-global-dimension-size-85)
);position:relative;top:0;vertical-align:top;width:auto;word-break:break-word}:host{cursor:default;-webkit-user-select:none;user-select:none}p{margin:0}#tip{border-bottom-color:transparent;border-left-color:transparent;border-right-color:transparent;border-style:solid;border-width:var(
--spectrum-tooltip-neutral-tip-width,var(--spectrum-global-dimension-size-100)
);height:0;position:absolute;width:0}:host([placement*=left]) #tip,:host([placement*=right]) #tip{margin-top:calc(var(
--spectrum-tooltip-neutral-tip-width,
var(--spectrum-global-dimension-size-100)
)*-1);top:50%}:host([placement*=right]){margin-left:var(
--spectrum-tooltip-neutral-target-offset
)}:host([placement*=right]) #tip{right:100%;transform:rotate(90deg)}:host([placement*=left]){margin-right:var(
--spectrum-tooltip-neutral-target-offset
)}:host([placement*=left]) #tip{left:100%;transform:rotate(-90deg)}:host([placement*=top]){margin-bottom:var(
--spectrum-tooltip-neutral-target-offset
)}:host([placement*=top]) #tip{top:100%}:host([placement*=bottom]){margin-top:var(
--spectrum-tooltip-neutral-target-offset
)}:host([placement*=bottom]) #tip{bottom:100%;transform:rotate(-180deg)}:host([placement*=bottom]) #tip,:host([placement*=top]) #tip{left:50%;margin-left:calc(var(
--spectrum-tooltip-neutral-tip-width,
var(--spectrum-global-dimension-size-100)
)*-1)}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(var(
--spectrum-tooltip-neutral-icon-margin-x,
var(--spectrum-global-dimension-size-85)
) - var(
--spectrum-tooltip-neutral-padding-x,
var(--spectrum-global-dimension-size-85)
))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(var(
--spectrum-tooltip-neutral-icon-margin-x,
var(--spectrum-global-dimension-size-85)
) - var(
--spectrum-tooltip-neutral-padding-x,
var(--spectrum-global-dimension-size-85)
))}:host([dir=ltr]) ::slotted([slot=icon]){margin-right:var(
--spectrum-tooltip-neutral-icon-margin-x,var(--spectrum-global-dimension-size-85)
)}:host([dir=rtl]) ::slotted([slot=icon]){margin-left:var(
--spectrum-tooltip-neutral-icon-margin-x,var(--spectrum-global-dimension-size-85)
)}::slotted([slot=icon]){align-self:flex-start;flex-shrink:0;height:var(
--spectrum-tooltip-neutral-icon-size,var(--spectrum-global-dimension-size-200)
);margin-bottom:var(
--spectrum-tooltip-neutral-icon-margin-y,var(--spectrum-global-dimension-size-50)
);margin-top:var(
--spectrum-tooltip-neutral-icon-margin-y,var(--spectrum-global-dimension-size-50)
);width:var(
--spectrum-tooltip-neutral-icon-size,var(--spectrum-global-dimension-size-200)
)}#label{line-height:var(
--spectrum-tooltip-neutral-text-line-height,var(--spectrum-alias-component-text-line-height)
);margin-bottom:var(--spectrum-tooltip-neutral-text-margin-bottom);margin-top:var(
--spectrum-tooltip-neutral-text-margin-top,var(--spectrum-global-dimension-static-size-50)
)}:host{background-color:var(
--spectrum-tooltip-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
);color:var(
--spectrum-tooltip-neutral-text-color,var(--spectrum-global-color-static-white)
)}#tip{border-top-color:var(
--spectrum-tooltip-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
)}.spectrum-Tooltip--error,:host([variant=negative]){background-color:var(
--spectrum-tooltip-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}.spectrum-Tooltip--error #tip,:host([variant=negative]) #tip{border-top-color:var(
--spectrum-tooltip-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}.spectrum-Tooltip--help,:host([variant=info]){background-color:var(
--spectrum-tooltip-info-background-color,var(--spectrum-semantic-informative-background-color)
)}.spectrum-Tooltip--help #tip,:host([variant=info]) #tip{border-top-color:var(
--spectrum-tooltip-info-background-color,var(--spectrum-semantic-informative-background-color)
)}.spectrum-Tooltip--success,:host([variant=positive]){background-color:var(
--spectrum-tooltip-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}.spectrum-Tooltip--success #tip,:host([variant=positive]) #tip{border-top-color:var(
--spectrum-tooltip-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}@media (forced-colors:active){:host{border:1px solid transparent}#tip{--spectrum-tooltip-neutral-background-color:CanvasText;--spectrum-tooltip-negative-background-color:CanvasText;--spectrum-tooltip-info-background-color:CanvasText;--spectrum-tooltip-positive-background-color:CanvasText;forced-color-adjust:none}}#tip{border:none}:host([placement*=bottom]) #tip,:host([placement*=left]) #tip,:host([placement*=right]) #tip{transform:none}#tip:after{border-color:transparent;border-style:solid;border-width:var(
--spectrum-tooltip-tip-height,var(--spectrum-global-dimension-size-50)
);content:"";height:0;left:0;position:absolute;width:0}:host([placement*=bottom]) #tip:after{bottom:100%;transform:scaleY(-1)}:host([placement*=left]) #tip:after{left:100%;transform:rotate(-90deg)}:host([placement*=right]) #tip:after{left:auto;right:100%;transform:rotate(90deg)}:host([placement]) #tip:after{border-top-color:var(
--spectrum-tooltip-background-color,var(--spectrum-global-color-static-gray-700)
)}:host([variant=negative]) #tip:after{border-top-color:var(
--spectrum-tooltip-negative-background-color,var(--spectrum-global-color-static-red-700)
)}:host([variant=info]) #tip:after{border-top-color:var(
--spectrum-tooltip-info-background-color,var(--spectrum-global-color-static-blue-700)
)}:host([variant=positive]) #tip:after{border-top-color:var(
--spectrum-tooltip-positive-background-color,var(--spectrum-global-color-static-green-700)
)}@media (forced-colors:active){#tip:after{--spectrum-tooltip-background-color:canvastext;--spectrum-tooltip-neutral-background-color:canvastext;--spectrum-tooltip-negative-background-color:canvastext;--spectrum-tooltip-info-background-color:canvastext;--spectrum-tooltip-positive-background-color:canvastext;forced-color-adjust:none}}
`,ui=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,hi=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?pi(e,r):e,i=t.length-1;i>=0;i--)(s=t[i])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&ui(e,r,a),a};class mi extends HTMLElement{disconnectedCallback(){this.dispatchEvent(new Event("disconnected"))}}customElements.define("tooltip-proxy",mi);const bi=class extends a{constructor(){super(),this._tooltipId="sp-tooltip-describedby-helper-"+bi.instanceCount++,this.selfManaged=!1,this.offset=6,this.hadTooltipId=!1,this.open=!1,this.placement="top",this._variant="",this.abortOverlay=()=>{},this.openOverlay=()=>{const t=this.parentElement,e=new Promise((t=>{this.abortOverlay=t}));this.closeOverlayCallback=z(t,"hover",this,{abortPromise:e,offset:this.offset,placement:this.placement})},this.closeOverlay=async t=>{t&&"pointerleave"===t.type&&t.relatedTarget===this?this.addEventListener("pointerleave",(t=>{t.relatedTarget!==this.parentElement&&this.closeOverlay(t)}),{once:!0}):(this.abortOverlay&&this.abortOverlay(!0),this.closeOverlayCallback&&((await this.closeOverlayCallback)(),delete this.closeOverlayCallback))},this.addEventListener("sp-overlay-query",this.onOverlayQuery)}static get styles(){return[di]}get variant(){return this._variant}set variant(t){if(t!==this.variant){if(["info","positive","negative"].includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}onOverlayQuery(t){!t.target||t.target!==this||(t.detail.overlayContentTipElement=this.tipElement)}generateProxy(){this._proxy||(this._proxy=document.createElement("tooltip-proxy"),this._proxy.id=this._tooltipId,this._proxy.hidden=!0,this._proxy.slot="hidden-tooltip-content",this._proxy.setAttribute("role","tooltip"),this._proxy.addEventListener("disconnected",this.closeOverlay))}overlayWillOpenCallback({trigger:t}){this.setAttribute("aria-hidden","true"),this.generateProxy(),this._proxy.textContent=this.textContent;const e=t.getAttribute("aria-describedby")||"";this.hadTooltipId=e.search(this._tooltipId)>-1,this.insertAdjacentElement("beforebegin",this._proxy),!this.hadTooltipId&&(e?t.setAttribute("aria-describedby",`${e} ${this._tooltipId}`):t.setAttribute("aria-describedby",`${this._tooltipId}`))}overlayOpenCancelledCallback({trigger:t}){this.overlayCloseCallback({trigger:t})}overlayCloseCallback({trigger:t}){let e=(t.getAttribute("aria-describedby")||"").split(/\s+/);this.hadTooltipId||(e=e.filter((t=>t!==this._tooltipId))),e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby"),this.removeAttribute("aria-hidden"),this.removeProxy()}removeProxy(){this._proxy.remove()}manageTooltip(){const t=this.parentElement;this.selfManaged?(this.slot&&(this.previousSlot=this.slot),this.slot="self-managed-tooltip",t.addEventListener("pointerenter",this.openOverlay),t.addEventListener("focusin",this.openOverlay),t.addEventListener("pointerleave",this.closeOverlay),t.addEventListener("focusout",this.closeOverlay)):(this.previousSlot?this.slot=this.previousSlot:"self-managed-tooltip"===this.slot&&this.removeAttribute("slot"),t.removeEventListener("pointerenter",this.openOverlay),t.removeEventListener("focusin",this.openOverlay),t.removeEventListener("pointerleave",this.closeOverlay),t.removeEventListener("focusout",this.closeOverlay))}render(){return i`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `}async update(t){t.has("open")&&this.selfManaged&&(this.open?this.openOverlay():this.closeOverlay()),this.generateProxy(),super.update(t)}updated(t){super.updated(t),t.has("selfManaged")&&this.manageTooltip()}};let gi=bi;gi.instanceCount=0,hi([c({type:Boolean,attribute:"self-managed"})],gi.prototype,"selfManaged",2),hi([c({type:Number,reflect:!0})],gi.prototype,"offset",2),hi([c({type:Boolean,reflect:!0})],gi.prototype,"open",2),hi([c({reflect:!0})],gi.prototype,"placement",2),hi([y("#tip")],gi.prototype,"tipElement",2),hi([c({type:String})],gi.prototype,"variant",1),customElements.define("sp-tooltip",gi);
//# sourceMappingURL=51588d28.js.map
