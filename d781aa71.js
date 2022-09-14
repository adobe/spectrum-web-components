import{F as e,R as t}from"./e2955272.js";import{r}from"./e50c5e8d.js";import{b as o,S as s,$ as a,e as i,w as l,s as c,y as n,l as d,x as u}from"./2310c663.js";import{o as p,a as h,t as m,O as b,l as g,S as v,i as f,L as x,b as y,F as k}from"./a07dea85.js";import"./0880e4a9.js";import{o as w,f as z,P as T,a as C,m as _,r as S}from"./b168adfa.js";import"./b5709ed3.js";import{a as E,c as q,u as A,m as I,s as L,r as $,t as P,b as B,M as O,T as M,d as D}from"./c8bc47c0.js";import"./dba9d5f2.js";import"./bfe4071e.js";import{e as H,i as U,t as j,u as F}from"./7872ac74.js";import{h as R}from"./25b4e008.js";import{o as N,t as V}from"./0eebfd98.js";import"./2fca06e6.js";import{f as G}from"./44d73288.js";import{I as K}from"./1d175163.js";import"./0542fa8e.js";import{S as X}from"./d649a0b3.js";import"./01a9f312.js";import"./62dd20fa.js";import"./656ccebc.js";import"./3ac90067.js";import"./642e03e0.js";import"./cdf15aa4.js";import"./2c1324bd.js";import"./9afe6659.js";import"./a7ac3464.js";import"./d17b22da.js";import"./43ec1c7e.js";const W=(e,t,r)=>{const o=new Map;for(let s=t;s<=r;s++)o.set(e[s],s);return o},Y=H(class extends U{constructor(e){if(super(e),e.type!==j.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;void 0===r?r=t:void 0!==t&&(o=t);const s=[],a=[];let i=0;for(const t of e)s[i]=o?o(t,i):i,a[i]=r(t,i),i++;return{values:a,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,s]){var a;const i=E(e),{values:l,keys:c}=this.dt(t,r,s);if(!Array.isArray(i))return this.ut=c,l;const n=null!==(a=this.ut)&&void 0!==a?a:this.ut=[],d=[];let u,p,h=0,m=i.length-1,b=0,g=l.length-1;for(;h<=m&&b<=g;)if(null===i[h])h++;else if(null===i[m])m--;else if(n[h]===c[b])d[b]=q(i[h],l[b]),h++,b++;else if(n[m]===c[g])d[g]=q(i[m],l[g]),m--,g--;else if(n[h]===c[g])d[g]=q(i[h],l[g]),A(e,d[g+1],i[h]),h++,g--;else if(n[m]===c[b])d[b]=q(i[m],l[b]),A(e,i[h],i[m]),m--,b++;else if(void 0===u&&(u=W(c,b,g),p=W(n,h,m)),u.has(n[h]))if(u.has(n[m])){const t=p.get(c[b]),r=void 0!==t?i[t]:null;if(null===r){const t=A(e,i[h]);q(t,l[b]),d[b]=t}else d[b]=q(r,l[b]),A(e,i[h],r),i[t]=null;b++}else I(i[m]),m--;else I(i[h]),h++;for(;b<=g;){const t=A(e,d[g+1]);q(t,l[b]),d[b++]=t}for(;h<=m;){const e=i[h++];null!==e&&I(e)}return this.ut=c,L(e,d),o}}),Z=H(class extends U{constructor(e){var t;if(super(e),e.type!==j.ATTRIBUTE||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,r)=>{const o=e[r];return null==o?t:t+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){const{style:r}=e.element;if(void 0===this.ct){this.ct=new Set;for(const e in t)this.ct.add(e);return this.render(t)}this.ct.forEach((e=>{null==t[e]&&(this.ct.delete(e),e.includes("-")?r.removeProperty(e):r[e]="")}));for(const e in t){const o=t[e];null!=o&&(this.ct.add(e),e.includes("-")?r.setProperty(e,o):r[e]=o)}return o}}),Q=(e,t)=>{var r,o;const s=e._$AN;if(void 0===s)return!1;for(const e of s)null===(o=(r=e)._$AO)||void 0===o||o.call(r,t,!1),Q(e,t);return!0},J=e=>{let t,r;do{if(void 0===(t=e._$AM))break;r=t._$AN,r.delete(e),e=t}while(0===(null==r?void 0:r.size))},ee=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),oe(t)}};function te(e){void 0!==this._$AN?(J(this),this._$AM=e,ee(this)):this._$AM=e}function re(e,t=!1,r=0){const o=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(o))for(let e=r;e<o.length;e++)Q(o[e],!1),J(o[e]);else null!=o&&(Q(o,!1),J(o));else Q(this,e)}const oe=e=>{var t,r,o,s;e.type==j.CHILD&&(null!==(t=(o=e)._$AP)&&void 0!==t||(o._$AP=re),null!==(r=(s=e)._$AQ)&&void 0!==r||(s._$AQ=te))};class se extends U{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),ee(this),this.isConnected=e._$AU}_$AO(e,t=!0){var r,o;e!==this.isConnected&&(this.isConnected=e,e?null===(r=this.reconnected)||void 0===r||r.call(this):null===(o=this.disconnected)||void 0===o||o.call(this)),t&&(Q(this,e),J(this))}setValue(e){if($(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}function ae(e,t,r){return e?t():null==r?void 0:r()}function ie(e){return"undefined"!=typeof window&&null!=window.navigator&&e.test(window.navigator.platform)}function le(){return ie(/^iPhone/)}function ce(){return ie(/^iPad/)||ie(/^Mac/)&&navigator.maxTouchPoints>1}function ne(){return function(e){return"undefined"!=typeof window&&null!=window.navigator&&e.test(window.navigator.userAgent)}(/Android/)}var de=r`
:host([disabled]) ::slotted([slot=trigger]){pointer-events:none}#overlay-content slot{display:none}
`,ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,he=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?pe(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ue(t,r,a),a};const me={touch:"Double tap and long press for additional options",keyboard:"Press Space or Alt+Down Arrow for additional options",mouse:"Click and hold for additional options"},be=class extends s{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1,this.hasLongpressContent=!1,this._longpressId="longpress-describedby-descriptor",this.abortOverlay=()=>{},this.openStatePromise=Promise.resolve()}static get styles(){return[de]}handleClose(e){e&&e.detail.interaction!==this.open&&e.detail.interaction!==this.type||this.removeAttribute("open")}render(){return a`
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
        `}updated(e){super.updated(e),this.disabled&&e.has("disabled")?this.closeAllOverlays():(e.has("open")&&this.manageOpen(),e.has("hasLongpressContent")&&this.manageLongpressDescriptor())}manageLongpressDescriptor(){const e=this.querySelector('[slot="trigger"]'),t=e.getAttribute("aria-describedby");let r=t?t.split(/\s+/):[];if(this.hasLongpressContent){this.longpressDescriptor||(this.longpressDescriptor=document.createElement("div"),this.longpressDescriptor.id=this._longpressId,this.longpressDescriptor.slot=this._longpressId);const e=le()||ce()||ne()?"touch":"keyboard";this.longpressDescriptor.textContent=me[e],this.appendChild(this.longpressDescriptor),r.push(this._longpressId)}else this.longpressDescriptor&&this.longpressDescriptor.remove(),r=r.filter((e=>e!==this._longpressId));r.length?e.setAttribute("aria-describedby",r.join(" ")):e.removeAttribute("aria-describedby")}closeAllOverlays(){this.abortOverlay&&this.abortOverlay(!0),["closeClickOverlay","closeHoverOverlay","closeLongpressOverlay"].forEach((async e=>{const t=this[e];null!=t&&(delete this[e],(await t)())}))}manageOpen(){var e;({click:()=>this.onTriggerClick(),hover:()=>this.onTriggerMouseEnter(),longpress:()=>this.onTriggerLongpress(),none:()=>this.closeAllOverlays()})[null!=(e=this.open)?e:"none"]()}async openOverlay(e,t,r,o){return this.openStatePromise=new Promise((e=>this.openStateResolver=e)),this.addEventListener("sp-opened",(()=>{this.openStateResolver()}),{once:!0}),be.openOverlay(e,t,r,o)}get overlayOptions(){return{offset:this.offset,placement:this.placement,receivesFocus:this.type&&"inline"!==this.type&&"hover"!==this.open?"auto":void 0}}onTrigger(e){if(!this.disabled)switch(e.type){case"mouseenter":case"focusin":return void(!this.open&&this.hoverContent&&(this.open="hover"));case"mouseleave":case"focusout":return void("hover"===this.open&&this.handleClose());case"click":return void(this.clickContent?this.open=e.type:this.closeHoverOverlay&&e.preventDefault());case"longpress":return void(this.longpressContent&&(this._longpressEvent=e,this.open=e.type))}}prepareToFocusOverlayContent(e){"modal"===this.type&&(G(e)||(e.tabIndex=0))}async onTriggerClick(){if(!this.targetContent||!this.clickContent||this.closeClickOverlay)return;const{targetContent:e,clickContent:t}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(t),this.closeClickOverlay=this.openOverlay(e,this.type?this.type:"click",t,this.overlayOptions)}async onTriggerLongpress(){var e,t;if(!this.targetContent||!this.longpressContent||this.closeLongpressOverlay)return;const{targetContent:r,longpressContent:o}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(o);const s="keyboard"!==(null==(t=null==(e=this._longpressEvent)?void 0:e.detail)?void 0:t.source);this.closeLongpressOverlay=this.openOverlay(r,this.type?this.type:"longpress",o,{...this.overlayOptions,receivesFocus:"auto",notImmediatelyClosable:s}),this._longpressEvent=void 0}async onTriggerMouseEnter(){if(!this.targetContent||!this.hoverContent||this.closeHoverOverlay)return;const e=new Promise((e=>{this.abortOverlay=e})),{targetContent:t,hoverContent:r}=this;this.closeHoverOverlay=this.openOverlay(t,"hover",r,{abortPromise:e,...this.overlayOptions})}onClickSlotChange(e){this.clickContent=this.extractSlotContentFromEvent(e),this.manageOpen()}onLongpressSlotChange(e){this.longpressContent=this.extractSlotContentFromEvent(e),this.hasLongpressContent=!!this.longpressContent||!!this.closeLongpressOverlay,this.manageOpen()}onHoverSlotChange(e){this.hoverContent=this.extractSlotContentFromEvent(e),this.manageOpen()}onTargetSlotChange(e){this.targetContent=this.extractSlotContentFromEvent(e)}extractSlotContentFromEvent(e){return e.target.assignedNodes({flatten:!0}).find((e=>e instanceof HTMLElement))}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.openStatePromise,e}disconnectedCallback(){this.closeAllOverlays(),super.disconnectedCallback()}};let ge=be;ge.openOverlay=async(e,t,r,o)=>w(e,t,r,o),he([i({reflect:!0})],ge.prototype,"placement",2),he([i()],ge.prototype,"type",2),he([i({type:Number,reflect:!0})],ge.prototype,"offset",2),he([i({reflect:!0})],ge.prototype,"open",2),he([i({type:Boolean,reflect:!0})],ge.prototype,"disabled",2),he([P()],ge.prototype,"hasLongpressContent",2);var ve=r`
:host{--spectrum-accordion-item-title-padding-y:var(
--spectrum-global-dimension-size-150
);--spectrum-accordion-animation-duration:var(
--spectrum-global-animation-duration-100,130ms
)}:host{display:block;list-style:none;margin:0;padding:0}
`,fe=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,ye=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?xe(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&fe(t,r,a),a};class ke extends s{constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new e(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:e=>!e.disabled})}static get styles(){return[ve]}get items(){return[...this.defaultNodes||[]].filter((e=>void 0!==e.tagName))}focus(){this.focusGroupController.focus()}async onToggle(e){const t=e.target;if(await 0,this.allowMultiple||e.defaultPrevented)return;const r=[...this.items];r&&!r.length||r.forEach((e=>{e!==t&&(e.open=!1)}))}handleSlotchange(){this.focusGroupController.clearElementCache()}render(){return a`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}ye([i({type:Boolean,reflect:!0,attribute:"allow-multiple"})],ke.prototype,"allowMultiple",2),ye([p()],ke.prototype,"defaultNodes",2),customElements.define("sp-accordion",ke);var we=r`
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
`,ze=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,Ce=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Te(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ze(t,r,a),a};class _e extends h{constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1}static get styles(){return[we,z]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return a`
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
        `}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Ce([i({type:Boolean,reflect:!0})],_e.prototype,"open",2),Ce([i({type:String,reflect:!0})],_e.prototype,"label",2),Ce([i({type:Boolean,reflect:!0})],_e.prototype,"disabled",2),customElements.define("sp-accordion-item",_e);var Se=r`
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
`,Ee=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,Ae=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?qe(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ee(t,r,a),a};const Ie=["sticky","fixed"];class Le extends s{constructor(){super(...arguments),this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[Se]}set variant(e){if(e!==this.variant){if(Ie.includes(e))return this.setAttribute("variant",e),void(this._variant=e);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}render(){return a`
            <sp-popover ?open=${this.open} id="popover">
                <slot></slot>
            </sp-popover>
        `}}Ae([i({type:Boolean,reflect:!0})],Le.prototype,"flexible",2),Ae([i({type:Boolean,reflect:!0})],Le.prototype,"open",2),Ae([i({type:String,reflect:!0})],Le.prototype,"variant",1),customElements.define("sp-action-bar",Le);var $e=r`
:host{--spectrum-actiongroup-button-gap-reset:0}:host{display:flex;flex-wrap:wrap}::slotted(*){flex-shrink:0}:host(:not([vertical]):not([compact])){margin-top:calc(var(
--spectrum-actiongroup-button-gap-y,
var(--spectrum-alias-actiongroup-button-gap)
)*-1)}:host(:not([vertical]):not([compact])) ::slotted(*){flex-shrink:0;margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-alias-actiongroup-button-gap)
)}:host([dir=ltr]:not([vertical]):not([compact])) ::slotted(:not(:last-child)){margin-right:var(
--spectrum-actiongroup-button-gap-x,var(--spectrum-alias-actiongroup-button-gap)
)}:host([dir=rtl]:not([vertical]):not([compact])) ::slotted(:not(:last-child)){margin-left:var(
--spectrum-actiongroup-button-gap-x,var(--spectrum-alias-actiongroup-button-gap)
)}:host([vertical]){display:inline-flex;flex-direction:column}:host([dir=ltr][vertical]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][vertical]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([vertical]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-alias-actiongroup-button-gap)
)}:host([dir=ltr][vertical][vertical]){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][vertical][vertical]){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([vertical][vertical]){margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-alias-actiongroup-button-gap)
)}:host([compact]){gap:var(
--spectrum-actiongroup-compact-button-gap,var(--spectrum-alias-actiongroup-button-gap-compact)
)}:host([dir=ltr][compact][quiet]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-quiet-compact-button-gap,var(--spectrum-alias-actiongroup-button-gap-quiet-compact)
)}:host([dir=rtl][compact][quiet]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-quiet-compact-button-gap,var(--spectrum-alias-actiongroup-button-gap-quiet-compact)
)}:host([compact][quiet]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=ltr][compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-quiet-compact-button-gap,var(--spectrum-alias-actiongroup-button-gap-quiet-compact)
)}:host([compact]:not([quiet])){flex-wrap:nowrap}:host([compact]:not([quiet])) ::slotted(*){--spectrum-actionbutton-focus-ring-border-radius-adjusted:var(
--spectrum-alias-border-radius-xsmall,var(--spectrum-global-dimension-size-10)
);border-radius:0;position:relative;z-index:0}:host([dir=ltr][compact]:not([quiet])) ::slotted(:first-child){border-top-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:first-child){border-top-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:first-child){border-bottom-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:first-child){border-bottom-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:first-child){margin-right:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:first-child){margin-left:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([compact]:not([quiet])) ::slotted(:first-child){--spectrum-actionbutton-focus-ring-border-radius-adjusted:calc(var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,
var(--spectrum-alias-component-border-radius)
) + var(
--spectrum-actionbutton-m-textonly-focus-ring-gap,
var(--spectrum-alias-component-focusring-gap)
)) var(
--spectrum-alias-border-radius-xsmall,var(--spectrum-global-dimension-size-10)
) var(
--spectrum-alias-border-radius-xsmall,var(--spectrum-global-dimension-size-10)
) calc(var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,
var(--spectrum-alias-component-border-radius)
) + var(
--spectrum-actionbutton-m-textonly-focus-ring-gap,
var(--spectrum-alias-component-focusring-gap)
))}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){border-top-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:last-child){border-top-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){border-bottom-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:last-child){border-bottom-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){margin-left:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:last-child){margin-right:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){margin-right:0}:host([dir=rtl][compact]:not([quiet])) ::slotted(:last-child){margin-left:0}:host([compact]:not([quiet])) ::slotted(:last-child){--spectrum-actionbutton-focus-ring-border-radius-adjusted:var(
--spectrum-alias-border-radius-xsmall,var(--spectrum-global-dimension-size-10)
) calc(var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,
var(--spectrum-alias-component-border-radius)
) + var(
--spectrum-actionbutton-m-textonly-focus-ring-gap,
var(--spectrum-alias-component-focusring-gap)
)) calc(var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,
var(--spectrum-alias-component-border-radius)
) + var(
--spectrum-actionbutton-m-textonly-focus-ring-gap,
var(--spectrum-alias-component-focusring-gap)
)) var(
--spectrum-alias-border-radius-xsmall,var(--spectrum-global-dimension-size-10)
)}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([dir=ltr][compact]:not([quiet])) ::slotted(:not(:first-child)){margin-left:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:not(:first-child)){margin-right:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:not(:first-child)){margin-right:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=rtl][compact]:not([quiet])) ::slotted(:not(:first-child)){margin-left:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([compact][vertical]:not([quiet])){gap:0}:host([compact][vertical]:not([quiet])) ::slotted(*){border-radius:0}:host([compact][vertical]:not([quiet])) ::slotted(:not(:first-child)){margin-bottom:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2);margin-top:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=ltr][compact][vertical]:not([quiet])) ::slotted(:first-child){border-top-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact][vertical]:not([quiet])) ::slotted(:first-child){border-top-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact][vertical]:not([quiet])) ::slotted(:first-child){border-top-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact][vertical]:not([quiet])) ::slotted(:first-child){border-top-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([compact][vertical]:not([quiet])) ::slotted(:first-child){border-radius:0;margin-bottom:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([dir=ltr][compact][vertical]:not([quiet])) ::slotted(:last-child){border-bottom-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact][vertical]:not([quiet])) ::slotted(:last-child){border-bottom-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=ltr][compact][vertical]:not([quiet])) ::slotted(:last-child){border-bottom-right-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([dir=rtl][compact][vertical]:not([quiet])) ::slotted(:last-child){border-bottom-left-radius:var(
--spectrum-actionbutton-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([compact][vertical]:not([quiet])) ::slotted(:last-child){border-radius:0;margin-bottom:0;margin-top:calc(var(
--spectrum-actionbutton-m-texticon-border-size,
var(--spectrum-alias-border-size-thin)
)*-1/2)}:host([justified]) ::slotted(*){flex:1}:host([dir][compact][vertical]) ::slotted(:nth-child(n)){margin-left:0;margin-right:0}:host([justified]) ::slotted(:not([role])),:host([vertical]) ::slotted(:not([role])){align-items:stretch;display:flex;flex-direction:column}:host([compact]:not([quiet])) ::slotted(:not([role])){--overriden-border-radius:0;--mod-actionbutton-border-radius:var(--overriden-border-radius)}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([compact]:not([quiet])) ::slotted(*){--mod-actionbutton-focus-ring-border-radius:0}:host([compact][vertical]:not([quiet])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}
`,Pe=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,Oe=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Be(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Pe(t,r,a),a};const Me=[];class De extends s{constructor(){super(),this._buttons=[],this._buttonSelector="sp-action-button",this.rovingTabindexController=new t(this,{focusInIndex:e=>{let t=-1;const r=e.findIndex(((r,o)=>(!e[t]&&!r.disabled&&(t=o),r.selected&&!r.disabled)));return e[r]?r:t},elements:()=>this.buttons,isFocusableElement:e=>!e.disabled}),this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this._selected=Me,this.manageButtons=()=>{const e=this.shadowRoot.querySelector("slot");if(!e)return;const t=e.assignedElements({flatten:!0}).reduce(((e,t)=>{if(t.matches(this._buttonSelector))e.push(t);else{const r=Array.from(t.querySelectorAll(`:scope > ${this._buttonSelector}`));e.push(...r)}return e}),[]);this.buttons=t;const r=[];this.buttons.forEach((e=>{e.selected&&r.push(e.value)})),this.setSelected(this.selected.concat(r)),this.manageChildren(),this.manageSelects()},new m(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons()}})}static get styles(){return[$e]}set buttons(e){e!==this.buttons&&(this._buttons=e,this.rovingTabindexController.clearElementCache())}get buttons(){return this._buttons}set selected(e){this.requestUpdate("selected",this._selected),this._selected=e,this.updateComplete.then((()=>{this.applySelects(),this.manageChildren()}))}get selected(){return this._selected}dispatchChange(e){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(e),this.buttons.map((e=>{e.selected=this.selected.includes(e.value)})))}setSelected(e,t){if(e===this.selected)return;const r=this.selected;this.requestUpdate("selected",r),this._selected=e,t&&this.dispatchChange(r)}focus(e){this.rovingTabindexController.focus(e)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((e=>{e.selected=!1,e.tabIndex=-1,e.setAttribute("aria-checked","false")}))}handleClick(e){const t=e.target;if(void 0!==t.value)switch(this.selects){case"single":this.deselectSelectedButtons(),t.selected=!0,t.tabIndex=0,t.setAttribute("aria-checked","true"),this.setSelected([t.value],!0),t.focus();break;case"multiple":{const e=[...this.selected];t.selected=!t.selected,t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected?e.push(t.value):e.splice(this.selected.indexOf(t.value),1),this.setSelected(e,!0),this.buttons.forEach((e=>{e.tabIndex=-1})),t.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0)}async manageSelects(e){if(!this.buttons.length)return;const t=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const r=[],o=t.map((async e=>{await e.updateComplete,e.setAttribute("role","radio"),e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected&&r.push(e)}));if(e)break;await Promise.all(o);const s=r.map((e=>e.value));this.setSelected(s||Me);break}case"multiple":{this.setAttribute("role","group");const r=[],o=[],s=t.map((async e=>{await e.updateComplete,e.setAttribute("role","checkbox"),e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected&&(r.push(e.value),o.push(e))}));if(e)break;await Promise.all(s);const a=r.length?r:Me;this.setSelected(a);break}default:if(!this.selected.length){this.buttons.forEach((e=>{e.setAttribute("role","button")})),this.removeAttribute("role");break}{const r=[],o=t.map((async e=>{await e.updateComplete,e.setAttribute("aria-checked",e.selected?"true":"false"),e.setAttribute("role","button"),e.selected&&r.push(e)}));if(e)break;await Promise.all(o),this.setSelected(r.map((e=>e.value)))}}}render(){return a`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}updated(e){super.updated(e),e.has("selects")&&(this.manageSelects(),this.manageChildren()),(e.has("quiet")&&this.quiet||e.has("emphasized")&&this.emphasized)&&this.manageChildren(),e.has("label")&&(this.label||void 0!==e.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(){this.buttons.forEach((e=>{e.quiet=this.quiet,e.emphasized=this.emphasized,e.selected=this.selected.includes(e.value)}))}}Oe([i({type:Boolean,reflect:!0})],De.prototype,"compact",2),Oe([i({type:Boolean,reflect:!0})],De.prototype,"emphasized",2),Oe([i({type:Boolean,reflect:!0})],De.prototype,"justified",2),Oe([i({type:String})],De.prototype,"label",2),Oe([i({type:Boolean,reflect:!0})],De.prototype,"quiet",2),Oe([i({type:String})],De.prototype,"selects",2),Oe([i({type:Boolean,reflect:!0})],De.prototype,"vertical",2),Oe([i({type:Array})],De.prototype,"selected",1),customElements.define("sp-action-group",De);var He=r`
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
`,Ue=Object.defineProperty,je=Object.getOwnPropertyDescriptor;class Fe extends(b(T,"label")){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[He]}get hasLabel(){return this.slotHasContent}get buttonContent(){return[a`
                <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel}>
                    <sp-icon-more class="icon"></sp-icon-more>
                </slot>
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
            `]}render(){return a`
            <sp-action-button
                quiet
                ?selected=${this.open}
                aria-haspopup="true"
                aria-controls="popover"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${g(this.label||void 0)}
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
        `}update(e){e.has("invalid")&&(this.invalid=!1),this.quiet=!0,super.update(e)}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?je(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&Ue(t,r,a)})([i({type:String})],Fe.prototype,"selects",2),customElements.define("sp-action-menu",Fe);var Re=r`
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
`,Ne=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,Ge=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ve(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ne(t,r,a),a};class Ke extends s{constructor(){super(...arguments),this.label=""}static get styles(){return[Re]}render(){return"file"===this.variant?(e=>a`
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${e||"File"}
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
`)(this.label):"folder"===this.variant?(e=>a`
    <svg
        class="folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${e||"Folder"}
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
`)(this.label):a`
            <slot></slot>
        `}}Ge([i({type:String,reflect:!0})],Ke.prototype,"variant",2),Ge([i()],Ke.prototype,"label",2),customElements.define("sp-asset",Ke);var Xe=r`
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
`,We=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,Ze=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ye(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&We(t,r,a),a};const Qe=[50,75,100,200,300,400,500,600,700],Je=Qe[2];class et extends s{constructor(){super(...arguments),this.label="",this.src="",this._size=Je}static get styles(){return[Xe]}get size(){return this._size}set size(e){const t=e,r=Qe.includes(t)?t:Je;if(r&&this.setAttribute("size",`${r}`),this._size===r)return;const o=this._size;this._size=r,this.requestUpdate("size",o)}render(){return a`
            <img
                class="image"
                alt=${g(this.label||void 0)}
                src=${this.src}
            />
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}Ze([i()],et.prototype,"label",2),Ze([i()],et.prototype,"src",2),Ze([i({type:Number,reflect:!0})],et.prototype,"size",1),customElements.define("sp-avatar",et);var tt=r`
:host([size=s]){--spectrum-badge-neutral-textonly-text-padding-bottom:var(
--spectrum-badge-s-neutral-textonly-text-padding-bottom
);--spectrum-badge-neutral-textonly-text-size:var(
--spectrum-badge-s-neutral-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-badge-neutral-textonly-text-padding-top:var(
--spectrum-badge-s-neutral-textonly-text-padding-top,var(--spectrum-global-dimension-static-size-50)
);--spectrum-badge-neutral-textonly-text-line-height:var(
--spectrum-badge-s-neutral-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-badge-neutral-textonly-border-top-left-radius:var(
--spectrum-badge-s-neutral-textonly-border-top-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-top-right-radius:var(
--spectrum-badge-s-neutral-textonly-border-top-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-right-radius:var(
--spectrum-badge-s-neutral-textonly-border-bottom-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-left-radius:var(
--spectrum-badge-s-neutral-textonly-border-bottom-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-padding-right:var(
--spectrum-badge-s-neutral-textonly-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-badge-neutral-textonly-padding-left:var(
--spectrum-badge-s-neutral-textonly-padding-left,var(--spectrum-global-dimension-size-115)
)}:host([size=m]){--spectrum-badge-neutral-textonly-text-size:var(
--spectrum-badge-m-neutral-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-badge-neutral-textonly-text-padding-top:var(
--spectrum-badge-m-neutral-textonly-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-badge-neutral-textonly-text-padding-bottom:var(
--spectrum-badge-m-neutral-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-badge-neutral-textonly-text-line-height:var(
--spectrum-badge-m-neutral-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-badge-neutral-textonly-border-top-left-radius:var(
--spectrum-badge-m-neutral-textonly-border-top-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-top-right-radius:var(
--spectrum-badge-m-neutral-textonly-border-top-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-right-radius:var(
--spectrum-badge-m-neutral-textonly-border-bottom-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-left-radius:var(
--spectrum-badge-m-neutral-textonly-border-bottom-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-padding-right:var(
--spectrum-badge-m-neutral-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-badge-neutral-textonly-padding-left:var(
--spectrum-badge-m-neutral-textonly-padding-left,var(--spectrum-global-dimension-size-150)
)}:host([size=l]){--spectrum-badge-neutral-textonly-text-padding-top:var(
--spectrum-badge-l-neutral-textonly-text-padding-top
);--spectrum-badge-neutral-textonly-text-size:var(
--spectrum-badge-l-neutral-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-badge-neutral-textonly-text-padding-bottom:var(
--spectrum-badge-l-neutral-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-badge-neutral-textonly-text-line-height:var(
--spectrum-badge-l-neutral-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-badge-neutral-textonly-border-top-left-radius:var(
--spectrum-badge-l-neutral-textonly-border-top-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-top-right-radius:var(
--spectrum-badge-l-neutral-textonly-border-top-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-right-radius:var(
--spectrum-badge-l-neutral-textonly-border-bottom-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-left-radius:var(
--spectrum-badge-l-neutral-textonly-border-bottom-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-padding-right:var(
--spectrum-badge-l-neutral-textonly-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-badge-neutral-textonly-padding-left:var(
--spectrum-badge-l-neutral-textonly-padding-left,var(--spectrum-global-dimension-size-185)
)}:host([size=xl]){--spectrum-badge-neutral-textonly-text-size:var(
--spectrum-badge-xl-neutral-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-badge-neutral-textonly-text-padding-top:var(
--spectrum-badge-xl-neutral-textonly-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-badge-neutral-textonly-text-padding-bottom:var(
--spectrum-badge-xl-neutral-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-175)
);--spectrum-badge-neutral-textonly-text-line-height:var(
--spectrum-badge-xl-neutral-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-badge-neutral-textonly-border-top-left-radius:var(
--spectrum-badge-xl-neutral-textonly-border-top-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-top-right-radius:var(
--spectrum-badge-xl-neutral-textonly-border-top-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-right-radius:var(
--spectrum-badge-xl-neutral-textonly-border-bottom-right-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-border-bottom-left-radius:var(
--spectrum-badge-xl-neutral-textonly-border-bottom-left-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-badge-neutral-textonly-padding-right:var(
--spectrum-badge-xl-neutral-textonly-padding-right,var(--spectrum-global-dimension-size-225)
);--spectrum-badge-neutral-textonly-padding-left:var(
--spectrum-badge-xl-neutral-textonly-padding-left,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr]){padding-left:var(
--spectrum-badge-neutral-textonly-padding-right
);padding-right:var(--spectrum-badge-neutral-textonly-padding-left)}:host([dir=rtl]){padding-left:var(--spectrum-badge-neutral-textonly-padding-left);padding-right:var(
--spectrum-badge-neutral-textonly-padding-right
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;border-radius:var(--spectrum-badge-neutral-textonly-border-top-left-radius) var(--spectrum-badge-neutral-textonly-border-top-right-radius) var(--spectrum-badge-neutral-textonly-border-bottom-right-radius) var(--spectrum-badge-neutral-textonly-border-bottom-left-radius);cursor:default;display:inline-block;font-size:var(--spectrum-badge-neutral-textonly-text-size);line-height:var(--spectrum-badge-neutral-textonly-text-line-height);padding-bottom:var(--spectrum-badge-neutral-textonly-text-padding-bottom);padding-top:var(--spectrum-badge-neutral-textonly-text-padding-top);position:relative;width:auto}:host([variant=neutral]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-neutral-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-neutral-textonly-background-color,var(--spectrum-semantic-neutral-background-color-default)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-neutral-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-neutral-textonly-background-color-hover,var(--spectrum-semantic-neutral-background-color-hover)
)}:host([variant=informative]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-informative-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-informative-textonly-background-color,var(--spectrum-semantic-informative-background-color-default)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-informative-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-informative-textonly-background-color-hover,var(--spectrum-semantic-informative-background-color-hover)
)}:host([variant=positive]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-positive-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-positive-textonly-background-color,var(--spectrum-semantic-positive-background-color-default)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-positive-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-positive-textonly-background-color-hover,var(--spectrum-semantic-positive-background-color-hover)
)}:host([variant=negative]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-negative-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-negative-textonly-background-color,var(--spectrum-semantic-negative-background-color-default)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-negative-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-negative-textonly-background-color-hover,var(--spectrum-semantic-negative-background-color-hover)
)}:host([variant=fuchsia]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-fuchsia-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-fuchsia-textonly-background-color,var(--spectrum-global-color-static-fuchsia-600)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-fuchsia-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-fuchsia-textonly-background-color-hover,var(--spectrum-global-color-static-fuchsia-700)
)}:host([variant=indigo]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-indigo-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-indigo-textonly-background-color,var(--spectrum-global-color-static-indigo-600)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-indigo-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-indigo-textonly-background-color-hover,var(--spectrum-global-color-static-indigo-700)
)}:host([variant=magenta]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-magenta-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-magenta-textonly-background-color,var(--spectrum-global-color-static-magenta-600)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-magenta-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-magenta-textonly-background-color-hover,var(--spectrum-global-color-static-magenta-700)
)}:host([variant=purple]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-purple-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-purple-textonly-background-color,var(--spectrum-global-color-static-purple-600)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-purple-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-purple-textonly-background-color-hover,var(--spectrum-global-color-static-purple-700)
)}:host([variant=seafoam]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-seafoam-texticon-text-color,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-seafoam-textonly-background-color,var(--spectrum-global-color-static-seafoam-600)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-seafoam-textonly-text-color-hover,var(--spectrum-global-color-static-white)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-seafoam-textonly-background-color-hover,var(--spectrum-global-color-static-seafoam-700)
)}:host([variant=yellow]){--spectrum-badge-m-texticon-text-color:var(
--spectrum-badge-m-yellow-texticon-text-color,var(--spectrum-global-color-static-black)
);--spectrum-badge-m-textonly-background-color:var(
--spectrum-badge-m-yellow-textonly-background-color,var(--spectrum-alias-background-color-yellow-default)
);--spectrum-badge-m-textonly-text-color-hover:var(
--spectrum-badge-m-yellow-textonly-text-color-hover,var(--spectrum-global-color-static-black)
);--spectrum-badge-m-textonly-background-color-hover:var(
--spectrum-badge-m-yellow-textonly-background-color-hover,var(--spectrum-alias-background-color-yellow-hover)
)}:host{background-color:var(--spectrum-badge-m-textonly-background-color);color:var(--spectrum-badge-m-texticon-text-color)}:host{align-items:center;display:inline-flex}:host([fixed=top]){--spectrum-badge-neutral-textonly-border-top-left-radius:0;--spectrum-badge-neutral-textonly-border-top-right-radius:0}:host([fixed=right]){--spectrum-badge-neutral-textonly-border-top-right-radius:0;--spectrum-badge-neutral-textonly-border-bottom-right-radius:0}:host([fixed=bottom]){--spectrum-badge-neutral-textonly-border-bottom-left-radius:0;--spectrum-badge-neutral-textonly-border-bottom-right-radius:0}:host([fixed=left]){--spectrum-badge-neutral-textonly-border-top-left-radius:0;--spectrum-badge-neutral-textonly-border-bottom-left-radius:0}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
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
)}::slotted([slot=icon]){flex-shrink:0;margin-right:calc(var(--spectrum-badge-neutral-textonly-padding-left)/2)}slot[icon-only]::slotted([slot=icon]){margin-left:calc(var(--spectrum-badge-neutral-textonly-text-padding-bottom) - var(--spectrum-badge-neutral-textonly-padding-left));margin-right:calc(var(--spectrum-badge-neutral-textonly-text-padding-bottom) - var(--spectrum-badge-neutral-textonly-padding-left))}#label{max-height:calc(var(--spectrum-badge-neutral-textonly-text-line-height)*var(--spectrum-badge-neutral-textonly-text-size)*2);overflow:hidden}
`,rt=Object.defineProperty,ot=Object.getOwnPropertyDescriptor;class st extends(v(b(s,""))){constructor(){super(...arguments),this.variant="informative"}static get styles(){return[tt]}render(){return a`
            <slot name="icon" ?icon-only=${!this.slotHasContent}></slot>
            <div id="label">
                <slot></slot>
            </div>
        `}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?ot(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&rt(t,r,a)})([i({type:String,reflect:!0})],st.prototype,"variant",2),customElements.define("sp-badge",st);var at=r`
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
`,it=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,ct=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?lt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&it(t,r,a),a};class nt extends s{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[at]}render(){return a`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `}}ct([i({reflect:!0,type:String})],nt.prototype,"type",2),ct([i({reflect:!0,type:Boolean})],nt.prototype,"corner",2),customElements.define("sp-banner",nt);var dt=r`
:host{--spectrum-buttongroup-button-gap-reset:0}:host{display:flex}::slotted(*){flex-shrink:0}:host([dir=ltr]) ::slotted(:not(:first-of-type)){margin-left:var(
--spectrum-buttongroup-button-gap-x,var(--spectrum-global-dimension-static-size-200)
)}:host([dir=rtl]) ::slotted(:not(:first-of-type)){margin-right:var(
--spectrum-buttongroup-button-gap-x,var(--spectrum-global-dimension-static-size-200)
)}:host([vertical]){display:inline-flex;flex-direction:column}:host([dir=ltr][vertical]) ::slotted(:not(:first-of-type)){margin-left:var(
--spectrum-buttongroup-button-gap-reset
)}:host([dir=rtl][vertical]) ::slotted(:not(:first-of-type)){margin-right:var(
--spectrum-buttongroup-button-gap-reset
)}:host([vertical]) ::slotted(:not(:first-of-type)){margin-top:var(
--spectrum-buttongroup-button-gap-y,var(--spectrum-global-dimension-static-size-200)
)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`,ut=Object.defineProperty,pt=Object.getOwnPropertyDescriptor;class ht extends s{constructor(){super(...arguments),this.vertical=!1}static get styles(){return[dt]}render(){return a`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?pt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&ut(t,r,a)})([i({type:Boolean,reflect:!0})],ht.prototype,"vertical",2),customElements.define("sp-button-group",ht);var mt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,gt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?bt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&mt(t,r,a),a};class vt extends h{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}get focusElement(){return this.inputElement}handleChange(){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const e=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(e)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return a`
            <input
                id="input"
                aria-labelledby="label"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}gt([i({type:Boolean,reflect:!0})],vt.prototype,"checked",2),gt([i({type:Boolean,reflect:!0})],vt.prototype,"readonly",2),gt([f("#input")],vt.prototype,"inputElement",2);var ft=r`
:host{align-items:flex-start;max-width:100%;min-height:var(--spectrum-checkbox-height);position:relative}#input{box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:100%;height:100%;line-height:1.15;margin:0;opacity:.0001;overflow:visible;padding:0;position:absolute;width:100%;z-index:1}#input:disabled{cursor:default}#input:checked+#box:before{border-width:calc(var(--spectrum-checkbox-box-size)/2)}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input.focus-visible+#box:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}#input:focus-visible+#box:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}:host([size=s]){--spectrum-checkbox-box-border-radius:var(
--spectrum-checkbox-s-box-border-radius,var(--spectrum-alias-border-radius-small)
);--spectrum-checkbox-box-border-size:var(
--spectrum-checkbox-s-box-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-checkbox-box-size:var(
--spectrum-checkbox-s-box-size,var(--spectrum-alias-control-two-size-s)
);--spectrum-checkbox-text-size:var(
--spectrum-checkbox-s-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-checkbox-text-gap:var(
--spectrum-checkbox-s-text-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-checkbox-text-padding-top:var(
--spectrum-checkbox-s-text-padding-top,var(--spectrum-global-dimension-static-size-50)
);--spectrum-checkbox-text-font-style:var(
--spectrum-checkbox-s-text-font-style,var(--spectrum-global-font-style-regular)
);--spectrum-checkbox-text-font-weight:var(
--spectrum-checkbox-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-checkbox-text-line-height:var(
--spectrum-checkbox-s-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-checkbox-checkmark-size:var(
--spectrum-checkbox-s-checkmark-size,var(--spectrum-alias-ui-icon-checkmark-size-75)
);--spectrum-checkbox-height:var(
--spectrum-checkbox-s-height,var(--spectrum-global-dimension-size-300)
)}:host([size=m]){--spectrum-checkbox-box-border-radius:var(
--spectrum-checkbox-m-box-border-radius,var(--spectrum-alias-border-radius-small)
);--spectrum-checkbox-box-border-size:var(
--spectrum-checkbox-m-box-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-checkbox-box-size:var(
--spectrum-checkbox-m-box-size,var(--spectrum-alias-control-two-size-m)
);--spectrum-checkbox-text-size:var(
--spectrum-checkbox-m-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-checkbox-text-gap:var(
--spectrum-checkbox-m-text-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-checkbox-text-padding-top:var(
--spectrum-checkbox-m-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-checkbox-text-font-style:var(
--spectrum-checkbox-m-text-font-style,var(--spectrum-global-font-style-regular)
);--spectrum-checkbox-text-font-weight:var(
--spectrum-checkbox-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-checkbox-text-line-height:var(
--spectrum-checkbox-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-checkbox-checkmark-size:var(
--spectrum-checkbox-m-checkmark-size,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-checkbox-height:var(
--spectrum-checkbox-m-height,var(--spectrum-global-dimension-size-400)
)}:host([size=l]){--spectrum-checkbox-text-padding-top:var(
--spectrum-checkbox-l-text-padding-top
);--spectrum-checkbox-box-border-radius:var(
--spectrum-checkbox-l-box-border-radius,var(--spectrum-alias-border-radius-small)
);--spectrum-checkbox-box-border-size:var(
--spectrum-checkbox-l-box-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-checkbox-box-size:var(
--spectrum-checkbox-l-box-size,var(--spectrum-alias-control-two-size-l)
);--spectrum-checkbox-text-size:var(
--spectrum-checkbox-l-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-checkbox-text-gap:var(
--spectrum-checkbox-l-text-gap,var(--spectrum-global-dimension-size-130)
);--spectrum-checkbox-text-font-style:var(
--spectrum-checkbox-l-text-font-style,var(--spectrum-global-font-style-regular)
);--spectrum-checkbox-text-font-weight:var(
--spectrum-checkbox-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-checkbox-text-line-height:var(
--spectrum-checkbox-l-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-checkbox-checkmark-size:var(
--spectrum-checkbox-l-checkmark-size,var(--spectrum-alias-ui-icon-checkmark-size-200)
);--spectrum-checkbox-height:var(
--spectrum-checkbox-l-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-checkbox-box-border-radius:var(
--spectrum-checkbox-xl-box-border-radius,var(--spectrum-alias-border-radius-small)
);--spectrum-checkbox-box-border-size:var(
--spectrum-checkbox-xl-box-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-checkbox-box-size:var(
--spectrum-checkbox-xl-box-size,var(--spectrum-alias-control-two-size-xl)
);--spectrum-checkbox-text-size:var(
--spectrum-checkbox-xl-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-checkbox-text-gap:var(
--spectrum-checkbox-xl-text-gap,var(--spectrum-global-dimension-size-160)
);--spectrum-checkbox-text-padding-top:var(
--spectrum-checkbox-xl-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-checkbox-text-font-style:var(
--spectrum-checkbox-xl-text-font-style,var(--spectrum-global-font-style-regular)
);--spectrum-checkbox-text-font-weight:var(
--spectrum-checkbox-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-checkbox-text-line-height:var(
--spectrum-checkbox-xl-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-checkbox-checkmark-size:var(
--spectrum-checkbox-xl-checkmark-size,var(--spectrum-alias-ui-icon-checkmark-size-300)
);--spectrum-checkbox-height:var(
--spectrum-checkbox-xl-height,var(--spectrum-global-dimension-size-600)
)}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-width:calc(var(--spectrum-checkbox-box-size)/2)}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{display:block;opacity:1;transform:scale(1)}:host([dir=ltr]) #label{text-align:left}:host([dir=rtl]) #label{text-align:right}:host([dir=ltr]) #label{margin-left:var(
--spectrum-checkbox-text-gap
)}:host([dir=rtl]) #label{margin-right:var(
--spectrum-checkbox-text-gap
)}#label{font-size:var(--spectrum-checkbox-text-size);font-style:var(--spectrum-checkbox-text-font-style);font-weight:var(--spectrum-checkbox-text-font-weight);line-height:var(--spectrum-checkbox-text-line-height);margin-top:var(
--spectrum-checkbox-text-padding-top
);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#box{box-sizing:border-box;flex-grow:0;flex-shrink:0;height:var(--spectrum-checkbox-box-size);margin:calc((var(--spectrum-checkbox-height) - var(--spectrum-checkbox-box-size))/2) 0;position:relative;width:var(--spectrum-checkbox-box-size)}#box:before{border-radius:var(--spectrum-checkbox-box-border-radius);border-style:solid;border-width:var(--spectrum-checkbox-box-border-size);box-sizing:border-box;content:"";display:block;height:var(--spectrum-checkbox-box-size);position:absolute;transition:border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-checkbox-box-size);z-index:0}#box:after{border-radius:calc(var(--spectrum-checkbox-box-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;content:"";display:block;left:0;margin:var(
--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)
);position:absolute;right:0;top:0;transform:translate(0);transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host([dir=ltr]) #checkmark,:host([dir=ltr]) #partialCheckmark{left:50%}:host([dir=rtl]) #checkmark,:host([dir=rtl]) #partialCheckmark{right:50%}#checkmark,#partialCheckmark{opacity:0;position:absolute;top:50%;transform:scale(0);transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([dir=ltr]) #checkmark{margin-left:calc(var(--spectrum-checkbox-checkmark-size)/-2)}:host([dir=rtl]) #checkmark{margin-right:calc(var(--spectrum-checkbox-checkmark-size)/-2)}#checkmark{margin-top:calc(var(--spectrum-checkbox-checkmark-size)/-2)}:host([dir=ltr]) #partialCheckmark{margin-left:calc(var(--spectrum-checkbox-checkmark-size)/-2)}:host([dir=rtl]) #partialCheckmark{margin-right:calc(var(--spectrum-checkbox-checkmark-size)/-2)}#partialCheckmark{display:none;margin-top:calc(var(--spectrum-checkbox-checkmark-size)/-2)}:host{color:var(
--spectrum-checkbox-m-text-color,var(--spectrum-alias-component-text-color-default)
)}#checkmark,#partialCheckmark{color:var(
--spectrum-checkbox-m-checkmark-color,var(--spectrum-alias-toggle-icon-color-selected)
)}#box:before{background-color:var(
--spectrum-checkbox-m-box-background-color,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-checkbox-m-box-border-color,var(--spectrum-alias-toggle-border-color-default)
);forced-color-adjust:none}#label{color:var(
--spectrum-checkbox-m-text-color,var(--spectrum-alias-component-text-color-default)
)}#input:checked+#box:before,:host([indeterminate]) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-selected,var(--spectrum-alias-toggle-background-color-default)
)}:host(:hover) #input:checked+#box:before,:host(:hover[indeterminate]) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-hover)
)}:host(:active) #input:checked+#box:before,:host(:active[indeterminate]) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-selected-down,var(--spectrum-alias-toggle-background-color-down)
)}:host{border-color:var(
--spectrum-checkbox-m-box-border-color,var(--spectrum-alias-toggle-border-color-default)
)}:host(:hover) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-hover,var(--spectrum-alias-toggle-border-color-hover)
)}:host(:hover) #label{color:var(
--spectrum-checkbox-m-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:active) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-down,var(--spectrum-alias-toggle-border-color-down)
)}:host(:active) #label{color:var(
--spectrum-checkbox-m-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([readonly]){border-color:var(
--spectrum-checkbox-m-box-border-color,var(--spectrum-alias-toggle-border-color-default)
)}:host([readonly]:hover) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-hover,var(--spectrum-alias-toggle-border-color-hover)
)}:host([readonly]:hover) #label{color:var(
--spectrum-checkbox-m-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([readonly]:active) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-down,var(--spectrum-alias-toggle-border-color-down)
)}:host([readonly]:active) #label{color:var(
--spectrum-checkbox-m-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{background-color:var(
--spectrum-checkbox-m-box-background-color,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-checkbox-m-box-border-color,var(--spectrum-alias-toggle-border-color-default)
)}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(
--spectrum-checkbox-m-text-color,var(--spectrum-alias-component-text-color-default)
);forced-color-adjust:none}#input:disabled+#box:before,:host([dir]) #input:checked:disabled+#box:before{background-color:var(
--spectrum-checkbox-m-box-background-color-disabled,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-checkbox-m-box-border-color-disabled,var(--spectrum-global-color-gray-400)
)}#input:checked:disabled~#label,#input:disabled~#label{color:var(
--spectrum-checkbox-m-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);forced-color-adjust:none}#input.focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}#input:focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 var(
--spectrum-checkbox-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-checkbox-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);forced-color-adjust:none}#input:focus-visible+#box:after{box-shadow:0 0 0 var(
--spectrum-checkbox-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-checkbox-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);forced-color-adjust:none}#input:checked.focus-visible+#box:before,:host([indeterminate]) #input.focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}#input:checked:focus-visible+#box:before,:host([indeterminate]) #input:focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}#input.focus-visible~#label{color:var(
--spectrum-checkbox-m-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#input:focus-visible~#label{color:var(
--spectrum-checkbox-m-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before,:host([emphasized][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-emphasized-box-border-color-selected,var(
--spectrum-alias-toggle-background-color-emphasized-selected-default
)
)}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-emphasized-box-border-color-selected,var(
--spectrum-alias-toggle-background-color-emphasized-selected-default
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before{border-color:var(
--spectrum-checkbox-m-emphasized-box-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-emphasized-selected-hover)
)}:host([emphasized]:active) #input:checked+#box:before,:host([emphasized][indeterminate]:active) #box:before{border-color:var(
--spectrum-checkbox-m-emphasized-box-border-color-selected-down,var(--spectrum-alias-toggle-background-color-emphasized-selected-down)
)}:host([invalid][dir]) #box:before,:host([invalid][dir]) #input:checked+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error,var(--spectrum-global-color-red-500)
)}:host([invalid]) #label{color:var(
--spectrum-checkbox-m-text-color-error,var(--spectrum-alias-component-text-color-error-default)
)}:host([invalid]) #input.focus-visible+#box:before,:host([invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error-hover,var(--spectrum-global-color-red-600)
)}:host([invalid]) #input:focus-visible+#box:before,:host([invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error-hover,var(--spectrum-global-color-red-600)
)}:host([invalid]) #input.focus-visible~#label,:host([invalid][indeterminate]) #input.focus-visible~#label{color:var(
--spectrum-checkbox-m-text-color-error-hover,var(--spectrum-alias-component-text-color-error-hover)
)}:host([invalid]) #input:focus-visible~#label,:host([invalid][indeterminate]) #input:focus-visible~#label{color:var(
--spectrum-checkbox-m-text-color-error-hover,var(--spectrum-alias-component-text-color-error-hover)
)}:host([invalid]:hover) #box:before,:host([invalid][dir]:hover) #input:checked+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error-hover,var(--spectrum-global-color-red-600)
)}:host([invalid]:hover) #label{color:var(
--spectrum-checkbox-m-text-color-error-hover,var(--spectrum-alias-component-text-color-error-hover)
)}:host([invalid]:active) #box:before,:host([invalid]:active) #input:checked+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error-down,var(--spectrum-global-color-red-700)
)}:host([invalid]:active) #label{color:var(
--spectrum-checkbox-m-text-color-error-down,var(--spectrum-alias-component-text-color-error-down)
)}@media (forced-colors:active){#input.focus-visible+#box{forced-color-adjust:none;outline-color:var(
--spectrum-checkbox-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);outline-offset:var(
--spectrum-checkbox-m-focus-ring-gap-key-focus,var(--spectrum-alias-focus-ring-gap)
);outline-style:auto;outline-width:var(
--spectrum-checkbox-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
)}#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(
--spectrum-checkbox-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);outline-offset:var(
--spectrum-checkbox-m-focus-ring-gap-key-focus,var(--spectrum-alias-focus-ring-gap)
);outline-style:auto;outline-width:var(
--spectrum-checkbox-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
)}:host{--spectrum-checkbox-m-box-background-color-disabled:ButtonFace;--spectrum-checkbox-m-box-background-color:ButtonFace;--spectrum-checkbox-m-box-border-color-disabled:GrayText;--spectrum-checkbox-m-box-border-color-down:Highlight;--spectrum-checkbox-m-box-border-color-error-down:Highlight;--spectrum-checkbox-m-box-border-color-hover:Highlight;--spectrum-checkbox-m-box-border-color-key-focus:Highlight;--spectrum-checkbox-m-box-border-color-selected-down:Highlight;--spectrum-checkbox-m-box-border-color-selected-hover:Highlight;--spectrum-checkbox-m-box-border-color-selected-key-focus:Highlight;--spectrum-checkbox-m-box-border-color-selected:Highlight;--spectrum-checkbox-m-box-border-color:ButtonText;--spectrum-checkbox-m-emphasized-box-border-color-selected-down:Highlight;--spectrum-checkbox-m-emphasized-box-border-color-selected-hover:Highlight;--spectrum-checkbox-m-emphasized-box-border-color-selected:Highlight;--spectrum-checkbox-m-focus-ring-color-key-focus:FieldText;--spectrum-checkbox-m-text-color-disabled:GrayText;--spectrum-checkbox-m-text-color-down:FieldText;--spectrum-checkbox-m-text-color-error-down:FieldText;--spectrum-checkbox-m-text-color-error-hover:FieldText;--spectrum-checkbox-m-checkmark-color:HighlightText;--spectrum-checkbox-m-focus-ring-gap-key-focus:var(
--spectrum-global-dimension-static-size-25,2px
);--spectrum-checkbox-m-focus-ring-size:var(
--spectrum-global-dimension-static-size-40,3px
);--spectrum-checkbox-m-box-border-color-error:FieldText;--spectrum-checkbox-m-box-border-color-error-hover:FieldText;--spectrum-checkbox-m-text-color-error:FieldText;--spectrum-checkbox-m-text-color-hover:FieldText;--spectrum-checkbox-m-text-color-key-focus:FieldText;--spectrum-checkbox-m-text-color:FieldText}:host([invalid][dir]) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color,var(--spectrum-alias-toggle-border-color-default)
)}:host([invalid][indeterminate]) #box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error,var(--spectrum-global-color-red-500)
)}:host([invalid][dir]) #input:checked+#box:before{border-color:var(
--spectrum-checkbox-m-box-border-color-error,var(--spectrum-global-color-red-500)
)}}:host{display:inline-flex;vertical-align:top}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`;var xt=r`
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
`,yt=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,wt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?kt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&yt(t,r,a),a};const zt={s:a`
        <sp-icon-checkmark75
            id="checkmark"
            class="spectrum-UIIcon-Checkmark75"
        ></sp-icon-checkmark75>
    `,m:a`
        <sp-icon-checkmark100
            id="checkmark"
            class="spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `,l:a`
        <sp-icon-checkmark200
            id="checkmark"
            class="spectrum-UIIcon-Checkmark200"
        ></sp-icon-checkmark200>
    `,xl:a`
        <sp-icon-checkmark300
            id="checkmark"
            class="spectrum-UIIcon-Checkmark300"
        ></sp-icon-checkmark300>
    `},Tt={s:a`
        <sp-icon-dash75
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,m:a`
        <sp-icon-dash100
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,l:a`
        <sp-icon-dash200
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,xl:a`
        <sp-icon-dash300
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class Ct extends(v(vt)){constructor(){super(...arguments),this.indeterminate=!1,this.invalid=!1,this.emphasized=!1}static get styles(){return[ft,F,xt]}render(){return a`
            ${super.render()}
            <span id="box">
                ${zt[this.size]}
                ${Tt[this.size]}
            </span>
            <label id="label"><slot></slot></label>
        `}updated(e){super.updated(e),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid")),e.has("indeterminate")&&(this.indeterminate?this.inputElement.setAttribute("aria-checked","mixed"):this.inputElement.removeAttribute("aria-checked"))}}wt([i({type:Boolean,reflect:!0})],Ct.prototype,"indeterminate",2),wt([i({type:Boolean,reflect:!0})],Ct.prototype,"invalid",2),wt([i({type:Boolean,reflect:!0})],Ct.prototype,"emphasized",2),customElements.define("sp-checkbox",Ct);var _t=r`
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
`,St=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,qt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Et(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&St(t,r,a),a};class At extends s{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[_t]}render(){return a`
            <slot></slot>
        `}}qt([i({type:Boolean,reflect:!0})],At.prototype,"opened",2),qt([i({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],At.prototype,"textOnly",2),customElements.define("sp-quick-actions",At);var It=r`
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
)}.body:last-child{border-bottom-left-radius:var(--spectrum-card-border-radius);border-bottom-right-radius:var(--spectrum-card-border-radius);border-top-left-radius:0;border-top-right-radius:0}#preview{border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:calc(var(--spectrum-card-border-radius) - 1px);border-top-right-radius:calc(var(--spectrum-card-border-radius) - 1px);overflow:hidden}.header{height:var(--spectrum-card-body-header-height)}.content{display:flex;height:var(--spectrum-card-body-content-min-height);margin-top:var(--spectrum-card-body-content-margin-top)}:host([dir=ltr]) .title{padding-right:var(
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
`;var Lt=[N,V,r`
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
`],$t=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,Bt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Pt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&$t(t,r,a),a};class Ot extends(x(v(y(k(s),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"]}))){constructor(){super(...arguments),this.variant="standard",this._selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.value="",this.subheading="",this.handleFocusin=e=>{this.focused=!0,e.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[R,Lt,It]}get selected(){return this._selected}set selected(e){e!==this.selected&&(this._selected=e,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var e;null==(e=this.likeAnchor)||e.click()}handleFocusout(e){this.focused=!1,e.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(e){const{code:t}=e;switch(t){case"Space":if(this.toggleSelected(),this.toggles){e.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(e){e.stopPropagation(),this.selected=e.target.checked,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(e){this.href&&e.stopPropagation()}handlePointerdown(e){if(e.composedPath().some((e=>"a"===e.localName)))return;const t=+new Date,r=()=>{+new Date-t<200&&this.click(),this.removeEventListener("pointerup",r)};this.addEventListener("pointerup",r)}get renderHeading(){return a`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return a`
            <sp-asset id="preview" variant=${g(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
        `}get renderCoverImage(){return a`
            <sp-asset id="cover-photo" variant=${g(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
        `}get images(){const e=[];return this.hasPreview&&e.push(this.renderPreviewImage),this.hasCoverPhoto&&e.push(this.renderCoverImage),e}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return a`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return a`
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${"gallery"===this.variant?this.renderSubtitleAndDescription:a``}
                    ${"quiet"!==this.variant||"s"!==this.size?a`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:a``}
                </div>
                ${"gallery"!==this.variant?a`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:a``}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):a``}
            ${"standard"===this.variant?a`
                      <slot name="footer"></slot>
                  `:a``}
            ${this.renderImage()}
            ${this.toggles?a`
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
                  `:a``}
            ${"quiet"===this.variant&&"s"===this.size?a`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:a``}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}Bt([i()],Ot.prototype,"asset",2),Bt([i({reflect:!0})],Ot.prototype,"variant",2),Bt([i({type:Boolean,reflect:!0})],Ot.prototype,"selected",1),Bt([i()],Ot.prototype,"heading",2),Bt([i({type:Boolean,reflect:!0})],Ot.prototype,"horizontal",2),Bt([f("#like-anchor")],Ot.prototype,"likeAnchor",2),Bt([i({type:Boolean,reflect:!0})],Ot.prototype,"focused",2),Bt([i({type:Boolean,reflect:!0})],Ot.prototype,"toggles",2),Bt([i()],Ot.prototype,"value",2),Bt([i()],Ot.prototype,"subheading",2),customElements.define("sp-card",Ot);var Mt=r`
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
`,Dt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Ut=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ht(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Dt(t,r,a),a};class jt extends s{constructor(){super(...arguments),this.quiet=!1,this.variant=""}static get styles(){return[Mt]}render(){return a`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}Ut([i({type:Boolean,reflect:!0})],jt.prototype,"quiet",2),Ut([i({reflect:!0})],jt.prototype,"variant",2),customElements.define("sp-coachmark",jt);const Ft=["",()=>{}];const Rt=H(class extends se{constructor(){super(...arguments),this.start=Ft,this.streamInside=Ft,this.end=Ft,this.streamOutside=Ft,this.state="off",this.handleStart=e=>{this.callHandler(this.start[1],e),!e.defaultPrevented&&(this.removeListeners(),this.addListeners("on"))},this.handleStream=e=>{this.callHandler(this.streamInside[1],e)},this.handleEnd=e=>{this.callHandler(this.end[1],e),this.removeListeners(),this.addListeners("off")},this.handleBetween=e=>{this.callHandler(this.streamOutside[1],e)}}render(e){return l}update(e,[{start:t,end:r,streamInside:o=Ft,streamOutside:s=Ft}]){var a;this.element!==e.element&&(this.element=e.element,this.removeListeners()),this.host=(null==(a=e.options)?void 0:a.host)||this.element,this.start=t,this.end=r,this.streamInside=o,this.streamOutside=s,this.addListeners()}addListeners(e){this.state=e||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleBetween),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleStream),this.addListener(this.end[0],this.handleEnd))}callHandler(e,t){"function"==typeof e?e.call(this.host,t):e.handleEvent(t)}addListener(e,t){Array.isArray(e)?e.map((e=>{this.element.addEventListener(e,t)})):this.element.addEventListener(e,t)}removeListener(e,t){Array.isArray(e)?e.map((e=>{this.element.removeEventListener(e,t)})):this.element.removeEventListener(e,t)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleStream),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleBetween)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}});var Nt=r`
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
`,Vt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,Kt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Gt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Vt(t,r,a),a};class Xt extends s{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Nt]}render(){return a`
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
        `}}Kt([i({type:Boolean,reflect:!0})],Xt.prototype,"open",2),Kt([i({type:String})],Xt.prototype,"color",2),customElements.define("sp-color-loupe",Xt);var Wt=r`
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
`,Yt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,Qt=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Zt(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Yt(t,r,a),a};const Jt=/^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/,er=/(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/,tr=/(^hs[v|l]a?\()\d{1,3}/;class rr extends s{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Wt]}handlePointerdown(e){"touch"===e.pointerType&&(this.open=!0),this.setPointerCapture(e.pointerId)}handlePointerup(e){this.open=!1,this.releasePointerCapture(e.pointerId)}render(){return a`
            <div class="color" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open&&!this.disabled}
            ></sp-color-loupe>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup)}}function or(e,t){(function(e){return"string"==typeof e&&-1!==e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var r=function(e){return"string"==typeof e&&-1!==e.indexOf("%")}(e);return e=360===t?e:Math.min(t,Math.max(0,parseFloat(e))),r&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:e=360===t?(e<0?e%t+t:e%t)/parseFloat(String(t)):e%t/parseFloat(String(t))}function sr(e){return Math.min(1,Math.max(0,e))}function ar(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function ir(e){return e<=1?"".concat(100*Number(e),"%"):e}function lr(e){return 1===e.length?"0"+e:String(e)}function cr(e,t,r){e=or(e,255),t=or(t,255),r=or(r,255);var o=Math.max(e,t,r),s=Math.min(e,t,r),a=0,i=0,l=(o+s)/2;if(o===s)i=0,a=0;else{var c=o-s;switch(i=l>.5?c/(2-o-s):c/(o+s),o){case e:a=(t-r)/c+(t<r?6:0);break;case t:a=(r-e)/c+2;break;case r:a=(e-t)/c+4}a/=6}return{h:a,s:i,l:l}}function nr(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*r*(t-e):r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}function dr(e,t,r){e=or(e,255),t=or(t,255),r=or(r,255);var o=Math.max(e,t,r),s=Math.min(e,t,r),a=0,i=o,l=o-s,c=0===o?0:l/o;if(o===s)a=0;else{switch(o){case e:a=(t-r)/l+(t<r?6:0);break;case t:a=(r-e)/l+2;break;case r:a=(e-t)/l+4}a/=6}return{h:a,s:c,v:i}}function ur(e,t,r,o){var s=[lr(Math.round(e).toString(16)),lr(Math.round(t).toString(16)),lr(Math.round(r).toString(16))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0):s.join("")}function pr(e){return Math.round(255*parseFloat(e)).toString(16)}function hr(e){return mr(e)/255}function mr(e){return parseInt(e,16)}Qt([i({type:Boolean,reflect:!0})],rr.prototype,"disabled",2),Qt([i({type:Boolean,reflect:!0})],rr.prototype,"focused",2),Qt([i({type:Boolean,reflect:!0})],rr.prototype,"open",2),Qt([i({type:String})],rr.prototype,"color",2),customElements.define("sp-color-handle",rr);var br={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function gr(e){var t={r:0,g:0,b:0},r=1,o=null,s=null,a=null,i=!1,l=!1;return"string"==typeof e&&(e=function(e){if(0===(e=e.trim().toLowerCase()).length)return!1;var t=!1;if(br[e])e=br[e],t=!0;else if("transparent"===e)return{r:0,g:0,b:0,a:0,format:"name"};var r=yr.rgb.exec(e);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=yr.rgba.exec(e))return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=yr.hsl.exec(e))return{h:r[1],s:r[2],l:r[3]};if(r=yr.hsla.exec(e))return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=yr.hsv.exec(e))return{h:r[1],s:r[2],v:r[3]};if(r=yr.hsva.exec(e))return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=yr.hex8.exec(e))return{r:mr(r[1]),g:mr(r[2]),b:mr(r[3]),a:hr(r[4]),format:t?"name":"hex8"};if(r=yr.hex6.exec(e))return{r:mr(r[1]),g:mr(r[2]),b:mr(r[3]),format:t?"name":"hex"};if(r=yr.hex4.exec(e))return{r:mr(r[1]+r[1]),g:mr(r[2]+r[2]),b:mr(r[3]+r[3]),a:hr(r[4]+r[4]),format:t?"name":"hex8"};if(r=yr.hex3.exec(e))return{r:mr(r[1]+r[1]),g:mr(r[2]+r[2]),b:mr(r[3]+r[3]),format:t?"name":"hex"};return!1}(e)),"object"==typeof e&&(kr(e.r)&&kr(e.g)&&kr(e.b)?(t=function(e,t,r){return{r:255*or(e,255),g:255*or(t,255),b:255*or(r,255)}}(e.r,e.g,e.b),i=!0,l="%"===String(e.r).substr(-1)?"prgb":"rgb"):kr(e.h)&&kr(e.s)&&kr(e.v)?(o=ir(e.s),s=ir(e.v),t=function(e,t,r){e=6*or(e,360),t=or(t,100),r=or(r,100);var o=Math.floor(e),s=e-o,a=r*(1-t),i=r*(1-s*t),l=r*(1-(1-s)*t),c=o%6;return{r:255*[r,i,a,a,l,r][c],g:255*[l,r,r,i,a,a][c],b:255*[a,a,l,r,r,i][c]}}(e.h,o,s),i=!0,l="hsv"):kr(e.h)&&kr(e.s)&&kr(e.l)&&(o=ir(e.s),a=ir(e.l),t=function(e,t,r){var o,s,a;if(e=or(e,360),t=or(t,100),r=or(r,100),0===t)s=r,a=r,o=r;else{var i=r<.5?r*(1+t):r+t-r*t,l=2*r-i;o=nr(l,i,e+1/3),s=nr(l,i,e),a=nr(l,i,e-1/3)}return{r:255*o,g:255*s,b:255*a}}(e.h,o,a),i=!0,l="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(r=e.a)),r=ar(r),{ok:i,format:e.format||l,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:r}}var vr="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),fr="[\\s|\\(]+(".concat(vr,")[,|\\s]+(").concat(vr,")[,|\\s]+(").concat(vr,")\\s*\\)?"),xr="[\\s|\\(]+(".concat(vr,")[,|\\s]+(").concat(vr,")[,|\\s]+(").concat(vr,")[,|\\s]+(").concat(vr,")\\s*\\)?"),yr={CSS_UNIT:new RegExp(vr),rgb:new RegExp("rgb"+fr),rgba:new RegExp("rgba"+xr),hsl:new RegExp("hsl"+fr),hsla:new RegExp("hsla"+xr),hsv:new RegExp("hsv"+fr),hsva:new RegExp("hsva"+xr),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function kr(e){return Boolean(yr.CSS_UNIT.exec(String(e)))}var wr=function(){function e(t,r){var o;if(void 0===t&&(t=""),void 0===r&&(r={}),t instanceof e)return t;"number"==typeof t&&(t=function(e){return{r:e>>16,g:(65280&e)>>8,b:255&e}}(t)),this.originalInput=t;var s=gr(t);this.originalInput=t,this.r=s.r,this.g=s.g,this.b=s.b,this.a=s.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=r.format)&&void 0!==o?o:s.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=s.ok}return e.prototype.isDark=function(){return this.getBrightness()<128},e.prototype.isLight=function(){return!this.isDark()},e.prototype.getBrightness=function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},e.prototype.getLuminance=function(){var e=this.toRgb(),t=e.r/255,r=e.g/255,o=e.b/255;return.2126*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},e.prototype.getAlpha=function(){return this.a},e.prototype.setAlpha=function(e){return this.a=ar(e),this.roundA=Math.round(100*this.a)/100,this},e.prototype.toHsv=function(){var e=dr(this.r,this.g,this.b);return{h:360*e.h,s:e.s,v:e.v,a:this.a}},e.prototype.toHsvString=function(){var e=dr(this.r,this.g,this.b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.v);return 1===this.a?"hsv(".concat(t,", ").concat(r,"%, ").concat(o,"%)"):"hsva(".concat(t,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},e.prototype.toHsl=function(){var e=cr(this.r,this.g,this.b);return{h:360*e.h,s:e.s,l:e.l,a:this.a}},e.prototype.toHslString=function(){var e=cr(this.r,this.g,this.b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.l);return 1===this.a?"hsl(".concat(t,", ").concat(r,"%, ").concat(o,"%)"):"hsla(".concat(t,", ").concat(r,"%, ").concat(o,"%, ").concat(this.roundA,")")},e.prototype.toHex=function(e){return void 0===e&&(e=!1),ur(this.r,this.g,this.b,e)},e.prototype.toHexString=function(e){return void 0===e&&(e=!1),"#"+this.toHex(e)},e.prototype.toHex8=function(e){return void 0===e&&(e=!1),function(e,t,r,o,s){var a=[lr(Math.round(e).toString(16)),lr(Math.round(t).toString(16)),lr(Math.round(r).toString(16)),lr(pr(o))];return s&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this.r,this.g,this.b,this.a,e)},e.prototype.toHex8String=function(e){return void 0===e&&(e=!1),"#"+this.toHex8(e)},e.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},e.prototype.toRgbString=function(){var e=Math.round(this.r),t=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb(".concat(e,", ").concat(t,", ").concat(r,")"):"rgba(".concat(e,", ").concat(t,", ").concat(r,", ").concat(this.roundA,")")},e.prototype.toPercentageRgb=function(){var e=function(e){return"".concat(Math.round(100*or(e,255)),"%")};return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}},e.prototype.toPercentageRgbString=function(){var e=function(e){return Math.round(100*or(e,255))};return 1===this.a?"rgb(".concat(e(this.r),"%, ").concat(e(this.g),"%, ").concat(e(this.b),"%)"):"rgba(".concat(e(this.r),"%, ").concat(e(this.g),"%, ").concat(e(this.b),"%, ").concat(this.roundA,")")},e.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var e="#"+ur(this.r,this.g,this.b,!1),t=0,r=Object.entries(br);t<r.length;t++){var o=r[t],s=o[0];if(e===o[1])return s}return!1},e.prototype.toString=function(e){var t=Boolean(e);e=null!=e?e:this.format;var r=!1,o=this.a<1&&this.a>=0;return t||!o||!e.startsWith("hex")&&"name"!==e?("rgb"===e&&(r=this.toRgbString()),"prgb"===e&&(r=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(r=this.toHexString()),"hex3"===e&&(r=this.toHexString(!0)),"hex4"===e&&(r=this.toHex8String(!0)),"hex8"===e&&(r=this.toHex8String()),"name"===e&&(r=this.toName()),"hsl"===e&&(r=this.toHslString()),"hsv"===e&&(r=this.toHsvString()),r||this.toHexString()):"name"===e&&0===this.a?this.toName():this.toRgbString()},e.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},e.prototype.clone=function(){return new e(this.toString())},e.prototype.lighten=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.l+=t/100,r.l=sr(r.l),new e(r)},e.prototype.brighten=function(t){void 0===t&&(t=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-t/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-t/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-t/100*255))),new e(r)},e.prototype.darken=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.l-=t/100,r.l=sr(r.l),new e(r)},e.prototype.tint=function(e){return void 0===e&&(e=10),this.mix("white",e)},e.prototype.shade=function(e){return void 0===e&&(e=10),this.mix("black",e)},e.prototype.desaturate=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.s-=t/100,r.s=sr(r.s),new e(r)},e.prototype.saturate=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.s+=t/100,r.s=sr(r.s),new e(r)},e.prototype.greyscale=function(){return this.desaturate(100)},e.prototype.spin=function(t){var r=this.toHsl(),o=(r.h+t)%360;return r.h=o<0?360+o:o,new e(r)},e.prototype.mix=function(t,r){void 0===r&&(r=50);var o=this.toRgb(),s=new e(t).toRgb(),a=r/100;return new e({r:(s.r-o.r)*a+o.r,g:(s.g-o.g)*a+o.g,b:(s.b-o.b)*a+o.b,a:(s.a-o.a)*a+o.a})},e.prototype.analogous=function(t,r){void 0===t&&(t=6),void 0===r&&(r=30);var o=this.toHsl(),s=360/r,a=[this];for(o.h=(o.h-(s*t>>1)+720)%360;--t;)o.h=(o.h+s)%360,a.push(new e(o));return a},e.prototype.complement=function(){var t=this.toHsl();return t.h=(t.h+180)%360,new e(t)},e.prototype.monochromatic=function(t){void 0===t&&(t=6);for(var r=this.toHsv(),o=r.h,s=r.s,a=r.v,i=[],l=1/t;t--;)i.push(new e({h:o,s:s,v:a})),a=(a+l)%1;return i},e.prototype.splitcomplement=function(){var t=this.toHsl(),r=t.h;return[this,new e({h:(r+72)%360,s:t.s,l:t.l}),new e({h:(r+216)%360,s:t.s,l:t.l})]},e.prototype.onBackground=function(t){var r=this.toRgb(),o=new e(t).toRgb();return new e({r:o.r+(r.r-o.r)*r.a,g:o.g+(r.g-o.g)*r.a,b:o.b+(r.b-o.b)*r.a})},e.prototype.triad=function(){return this.polyad(3)},e.prototype.tetrad=function(){return this.polyad(4)},e.prototype.polyad=function(t){for(var r=this.toHsl(),o=r.h,s=[this],a=360/t,i=1;i<t;i++)s.push(new e({h:(o+i*a)%360,s:r.s,l:r.l}));return s},e.prototype.equals=function(t){return this.toRgbString()===new e(t).toRgbString()},e}();var zr=r`
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
`,Tr=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,_r=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Cr(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Tr(t,r,a),a};class Sr extends s{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.labelX="saturation",this.labelY="luminosity",this._hue=0,this._color=new wr({h:0,s:1,v:1}),this._previousColor=new wr({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.activeAxis="x",this._x=1,this._y=0,this.step=.01,this.altered=0,this.activeKeys=new Set,this._pointerDown=!1}static get styles(){return[zr]}get hue(){return this._hue}set hue(e){const t=Math.min(360,Math.max(0,e));if(t===this.hue)return;const r=this.hue,{s:o,v:s}=this._color.toHsv();this._color=new wr({h:t,s:o,v:s}),this._hue=t,this.requestUpdate("hue",r)}get value(){return this.color}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString)return this._color.toHslString().replace(tr,`$1${this.hue}`);{const{s:e,l:t,a:r}=this._color.toHsl();return{h:this.hue,s:e,l:t,a:r}}case"hsv":if(this._format.isString)return this._color.toHsvString().replace(tr,`$1${this.hue}`);{const{s:e,v:t,a:r}=this._color.toHsv();return{h:this.hue,s:e,v:t,a:r}}case"hex":case"hex3":case"hex4":case"hex6":default:return this._format.isString?this._color.toHexString():this._color.toHex()}}set color(e){if(e===this.color)return;const t=this._color;this._color=new wr(e);const r=this._color.format;let o="string"==typeof e||e instanceof String;r.startsWith("hex")&&(o=e.startsWith("#")),this._format={format:r,isString:o};const{h:s,s:a,v:i}=this._color.toHsv();let l;if(o&&r.startsWith("hs")){const t=Jt.exec(e);if(null!==t){const[,e]=t;l=Number(e)}}else if(!o&&r.startsWith("hs")){const e=this._color.originalInput;l=Object.values(e)[0]}this.hue=l||s,this.x=a,this.y=1-i,this.requestUpdate("color",t)}get x(){return this._x}set x(e){if(e===this.x)return;const t=this.x;this.inputX?(this.inputX.value=e.toString(),this._x=this.inputX.valueAsNumber):this._x=e,this.requestUpdate("x",t)}get y(){return this._y}set y(e){if(e===this.y)return;const t=this.y;this.inputY?(this.inputY.value=e.toString(),this._y=this.inputY.valueAsNumber):this._y=e,this.requestUpdate("y",t)}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),"x"===this.activeAxis?this.inputX.focus():this.inputY.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.focused=!1)}handleKeydown(e){const{code:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter((e=>!!e)).length,0===t.search("Arrow")&&(e.preventDefault(),this.activeKeys.add(t),this.handleKeypress())}handleKeypress(){let e=0,t=0;const r=Math.max(this.step,5*this.altered*this.step);this.activeKeys.forEach((o=>{switch(o){case"ArrowUp":t=-1*r;break;case"ArrowDown":t=1*r;break;case"ArrowLeft":e=-1*r;break;case"ArrowRight":e=1*r}})),0!=e?(this.activeAxis="x",this.inputX.focus()):0!=t&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+e,0)),this.y=Math.min(1,Math.max(this.y+t,0)),this._previousColor=this._color.clone(),this._color=new wr({h:this.hue,s:this.x,v:1-this.y}),(0!=e||0!=t)&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor))}handleKeyup(e){e.preventDefault();const{code:t}=e;this.activeKeys.delete(t)}handleInput(e){const{valueAsNumber:t,name:r}=e.target;this[r]=t,this._color=new wr({h:this.hue,s:this.x,v:1-this.y})}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerdown(e){0===e.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),"mouse"===e.pointerType&&(this.focused=!0)):e.preventDefault()}handlePointermove(e){const[t,r]=this.calculateHandlePosition(e);this._color=new wr({h:this.hue,s:t,v:1-r}),this.x=t,this.y=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){e.preventDefault(),this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId);const t=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),"mouse"===e.pointerType&&(this.focused=!1),t||(this._color=this._previousColor)}calculateHandlePosition(e){if(!this.boundingClientRect)return[this.x,this.y];const t=this.boundingClientRect,r=t.left,o=t.top,s=e.clientX,a=e.clientY,i=t.width,l=t.height;return[Math.max(0,Math.min(1,(s-r)/i)),Math.max(0,Math.min(1,(a-o)/l))]}handleAreaPointerdown(e){0===e.button&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e))}render(){var e,t;const{width:r=0,height:o=0}=this.boundingClientRect||{};return a`
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
                tabindex=${g(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this._color.toHslString()}
                ?disabled=${this.disabled}
                style="transform: translate(${this.x*r}px, ${this.y*o}px);"
                ${Rt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            ></sp-color-handle>

            <div>
                <input
                    type="range"
                    class="slider"
                    name="x"
                    aria-label=${null!=(e=this.label)?e:this.labelX}
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
                    aria-label=${null!=(t=this.label)?t:this.labelY}
                    min="0"
                    max="1"
                    step=${this.step}
                    tabindex="-1"
                    .value=${String(this.y)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(e){if(super.updated(e),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),e.has("focused")&&this.focused){const e=this.inputX.parentElement,t=this.inputY.parentElement;if(!e.shadowRoot&&!t.shadowRoot){e.attachShadow({mode:"open"}),t.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';e.shadowRoot.innerHTML=r,t.shadowRoot.innerHTML=r}}}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((e=>{for(const t of e)this.boundingClientRect=t.contentRect;this.requestUpdate()}))),null==(e=this.observer)||e.observe(this)}disconnectedCallback(){var e;null==(e=this.observer)||e.unobserve(this),super.disconnectedCallback()}}_r([i({type:Boolean,reflect:!0})],Sr.prototype,"disabled",2),_r([i({type:Boolean,reflect:!0})],Sr.prototype,"focused",2),_r([i({type:String})],Sr.prototype,"label",2),_r([i({type:String,attribute:"label-x"})],Sr.prototype,"labelX",2),_r([i({type:String,attribute:"label-y"})],Sr.prototype,"labelY",2),_r([f(".handle")],Sr.prototype,"handle",2),_r([i({type:Number})],Sr.prototype,"hue",1),_r([i({type:String})],Sr.prototype,"value",1),_r([i({type:String})],Sr.prototype,"color",1),_r([i({attribute:!1})],Sr.prototype,"activeAxis",2),_r([i({type:Number})],Sr.prototype,"x",1),_r([i({type:Number})],Sr.prototype,"y",1),_r([i({type:Number})],Sr.prototype,"step",2),_r([f('[name="x"]')],Sr.prototype,"inputX",2),_r([f('[name="y"]')],Sr.prototype,"inputY",2),customElements.define("sp-color-area",Sr);var Er=r`
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
`,qr=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,Ir=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ar(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&qr(t,r,a),a};class Lr extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.vertical=!1,this._value=0,this.sliderHandlePosition=0,this._color=new wr({h:0,s:1,v:1}),this._previousColor=new wr({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.step=1,this._altered=0,this._pointerDown=!1}static get styles(){return[Er]}get value(){return this._value}set value(e){const t=Math.min(360,Math.max(0,e));if(t===this.value)return;const r=this.value,{s:o,v:s}=this._color.toHsv();this._color=new wr({h:t,s:o,v:s}),this._value=t,t!==this.sliderHandlePosition&&(this.sliderHandlePosition=t/360*100),this.requestUpdate("value",r)}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex":case"hex3":case"hex4":case"hex6":return this._format.isString?this._color.toHexString():this._color.toHex();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString)return this._color.toHslString().replace(er,`$1${this.value}$2${this._saturation}`);{const{s:e,l:t,a:r}=this._color.toHsl();return{h:this.value,s:e,l:t,a:r}}case"hsv":if(this._format.isString)return this._color.toHsvString().replace(er,`$1${this.value}$2${this._saturation}`);{const{s:e,v:t,a:r}=this._color.toHsv();return{h:this.value,s:e,v:t,a:r}}default:return"No color format applied."}}set color(e){if(e===this.color)return;const t=this._color;this._color=new wr(e);const r=this._color.format;let o="string"==typeof e||e instanceof String;if(r.startsWith("hex")&&(o=e.startsWith("#")),this._format={format:r,isString:o},o&&r.startsWith("hs")){const t=Jt.exec(e);if(null!==t){const[,e,r]=t;this.value=Number(e),this._saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const e=this._color.originalInput,t=Object.values(e);this.value=t[0],this._saturation=t[1]}else{const{h:e}=this._color.toHsv();this.value=e}this._previousColor=t,this.requestUpdate("color",t)}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(e){const{key:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter((e=>!!e)).length;let r=0;switch(t){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault(),this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+r)),this.value=this.sliderHandlePosition/100*360,this._color=new wr({...this._color.toHsl(),h:this.value}),0!=r&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(e){const{valueAsNumber:t}=e.target;this.value=t,this.sliderHandlePosition=this.value/360*100,this._color=new wr({...this._color.toHsl(),h:this.value})}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(e){0===e.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),"mouse"===e.pointerType&&(this.focused=!0)):e.preventDefault()}handlePointermove(e){this.sliderHandlePosition=this.calculateHandlePosition(e),this.value=this.sliderHandlePosition/100*360,this._color=new wr({...this._color.toHsl(),h:this.value}),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor),this.focus(),"mouse"===e.pointerType&&(this.focused=!1)}calculateHandlePosition(e){if(!this.boundingClientRect)return this.sliderHandlePosition;const t=this.boundingClientRect,r=this.vertical?t.top:t.left,o=this.vertical?e.clientY:e.clientX,s=this.vertical?t.height:t.width;return 100*Math.max(0,Math.min(1,(o-r)/s))}handleGradientPointerdown(e){0===e.button&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e))}get handlePositionStyles(){return`${this.vertical?"top":"left"}: ${this.sliderHandlePosition}%`}render(){return a`
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
                tabindex=${g(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${Rt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}Ir([i({type:Boolean,reflect:!0})],Lr.prototype,"disabled",2),Ir([i({type:Boolean,reflect:!0})],Lr.prototype,"focused",2),Ir([f(".handle")],Lr.prototype,"handle",2),Ir([i({type:String})],Lr.prototype,"label",2),Ir([i({type:Boolean,reflect:!0})],Lr.prototype,"vertical",2),Ir([i({type:Number})],Lr.prototype,"value",1),Ir([i({type:Number,reflect:!0})],Lr.prototype,"sliderHandlePosition",2),Ir([i({type:String})],Lr.prototype,"color",1),Ir([i({type:Number})],Lr.prototype,"step",2),Ir([f("input")],Lr.prototype,"input",2),customElements.define("sp-color-slider",Lr);var $r=r`
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
`,Pr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Or=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Br(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Pr(t,r,a),a};class Mr extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.step=1,this._value=0,this._color=new wr({h:0,s:1,v:1}),this._previousColor=new wr({h:0,s:1,v:1}),this._format={format:"",isString:!1},this._altered=0,this._pointerDown=!1}static get styles(){return[$r]}get value(){return this._value}set value(e){const t=Math.min(360,Math.max(0,e));if(t===this.value)return;const r=this.value,{s:o,v:s}=this._color.toHsv();this._color=new wr({h:t,s:o,v:s}),this._value=t,this.requestUpdate("value",r)}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex":case"hex3":case"hex4":case"hex6":return this._format.isString?this._color.toHexString():this._color.toHex();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString)return this._color.toHslString().replace(er,`$1${this.value}$2${this._saturation}`);{const{s:e,l:t,a:r}=this._color.toHsl();return{h:this.value,s:e,l:t,a:r}}case"hsv":if(this._format.isString)return this._color.toHsvString().replace(er,`$1${this.value}$2${this._saturation}`);{const{s:e,v:t,a:r}=this._color.toHsv();return{h:this.value,s:e,v:t,a:r}}default:return"No color format applied."}}set color(e){if(e===this.color)return;const t=this._color;this._color=new wr(e);const r=this._color.format;let o="string"==typeof e||e instanceof String;if(r.startsWith("hex")&&(o=e.startsWith("#")),this._format={format:r,isString:o},o&&r.startsWith("hs")){const t=Jt.exec(e);if(null!==t){const[,e,r]=t;this.value=Number(e),this._saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const e=this._color.originalInput,t=Object.values(e);this.value=t[0],this._saturation=t[1]}else{const{h:e}=this._color.toHsv();this.value=e}this.requestUpdate("color",t)}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(e){const{key:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter((e=>!!e)).length;let r=0;switch(t){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault(),this.value=(360+this.value+r)%360,this._previousColor=this._color.clone(),this._color=new wr({...this._color.toHsl(),h:this.value}),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor)}handleInput(e){const{valueAsNumber:t}=e.target;this.value=t,this._color=new wr({...this._color.toHsl(),h:this.value})}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(e){0===e.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),"mouse"===e.pointerType&&(this.focused=!0)):e.preventDefault()}handlePointermove(e){this.value=this.calculateHandlePosition(e),this._color=new wr({...this._color.toHsl(),h:this.value}),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor),this.focus(),"mouse"===e.pointerType&&(this.focused=!1)}calculateHandlePosition(e){if(!this.boundingClientRect)return this.value;const t=this.boundingClientRect,{width:r,height:o,left:s,top:a}=t,i=s+r/2,l=a+o/2,c=e.clientX-i,n=e.clientY-l;return(360+(360+180*Math.atan2(n,c)/Math.PI))%360}handleGradientPointerdown(e){0!==e.button||e.target.classList.contains("innerCircle")||(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e))}render(){const{width:e=160}=this.boundingClientRect||{},t=e/2,r=t-24,o=2*r,s=`path(evenodd, "M ${t} ${t} m -${t} 0 a ${t} ${t} 0 1 0 ${e} 0 a ${t} ${t} 0 1 0 -${e} 0 M ${t} ${t} m -${r} 0 a ${r} ${r} 0 1 0 ${o} 0 a ${r} ${r} 0 1 0 -${o} 0")`,i=`transform: translate(${(t-12.5)*Math.cos(this.value*Math.PI/180)}px, ${(t-12.5)*Math.sin(this.value*Math.PI/180)}px);`;return a`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div class="wheel" style="clip-path: ${s}"></div>
            </slot>

            <sp-color-handle
                tabindex=${g(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${i}
                ${Rt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((e=>{for(const t of e)this.boundingClientRect=t.contentRect;this.requestUpdate()}))),null==(e=this.observer)||e.observe(this)}disconnectedCallback(){var e;null==(e=this.observer)||e.unobserve(this),super.disconnectedCallback()}}Or([i({type:Boolean,reflect:!0})],Mr.prototype,"disabled",2),Or([i({type:Boolean,reflect:!0})],Mr.prototype,"focused",2),Or([f(".handle")],Mr.prototype,"handle",2),Or([i({type:String})],Mr.prototype,"label",2),Or([i({type:Number})],Mr.prototype,"step",2),Or([i({type:Number})],Mr.prototype,"value",1),Or([i({type:String})],Mr.prototype,"color",1),Or([f("input")],Mr.prototype,"input",2),customElements.define("sp-color-wheel",Mr);var Dr=r`
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
)}.button-group{display:flex;grid-area:buttonGroup;justify-content:flex-end;padding-top:var(--spectrum-dialog-confirm-buttongroup-padding-top)}.button-group.button-group--noFooter{grid-area:footer-start/footer-start/buttonGroup-end/buttonGroup-end}:host([dismissable]) .grid{grid-template-areas:"hero hero    hero    hero        hero        hero        hero" ".    .       .       .           .           closeButton closeButton" ".    heading header  header      typeIcon    closeButton closeButton" ".    divider divider divider     divider     divider     ." ".    content content content     content     content     ." ".    footer  footer  buttonGroup buttonGroup buttonGroup ." ".    .       .       .           .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(
--spectrum-dialog-confirm-padding
);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto 1fr auto var(
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
)}:host([dismissable]) .grid{grid-template-areas:"hero hero    hero    hero        hero        hero        hero" ".    .       .       .           .           closeButton closeButton" ".    heading heading heading     typeIcon    closeButton closeButton" ".    header  header  header      header      header      ." ".    divider divider divider     divider     divider     ." ".    content content content     content     content     ." ".    footer  footer  buttonGroup buttonGroup buttonGroup ." ".    .       .       .           .           .           .";grid-template-columns:var(--spectrum-dialog-confirm-padding) auto 1fr auto minmax(0,auto) minmax(0,var(--spectrum-dialog-confirm-close-button-size)) var(
--spectrum-dialog-confirm-padding
);grid-template-rows:auto var(--spectrum-dialog-confirm-padding) auto auto auto 1fr auto var(
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
`,Hr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,jr=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ur(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Hr(t,r,a),a};function Fr(e,t){const r=e.assignedElements(),o=[];return r.forEach(((e,r)=>{if(e.id)o.push(e.id);else{const s=t+`-${r}`;e.id=s,o.push(s)}})),o}const Rr=class extends(k(y(s,['[slot="hero"]','[slot="footer"]','[slot="button"]']))){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.noDivider=!1,this.shouldManageTabOrderForScrolling=()=>{const{offsetHeight:e,scrollHeight:t}=this.contentElement;e<t?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")},this.labelledbyId="sp-dialog-label-"+Rr.instanceCount++,this.describedbyId="sp-dialog-description-"+Rr.instanceCount++}static get styles(){return[Dr]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return a`
            <slot name="hero"></slot>
        `}renderHeading(){return a`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return a`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}renderFooter(){return a`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const e={"button-group":!0,"button-group--noFooter":!this.hasFooter};return a`
            <sp-button-group class=${C(e)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return a`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return a`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?a`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:l}
                ${this.noDivider?l:a`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():l}
                ${this.hasButtons?this.renderButtons():l}
                ${this.dismissable?this.renderDismiss():l}
            </div>
        `}shouldUpdate(e){return e.has("mode")&&!!this.mode&&(this.dismissable=!1),e.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(e)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","dialog")}onHeadingSlotchange({target:e}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const t=Fr(e,this.labelledbyId);t.length&&(this.conditionLabelledby=B(this,"aria-labelledby",t))}onContentSlotChange({target:e}){this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const t=Fr(e,this.describedbyId);if(t.length&&t.length<4)this.conditionDescribedby=B(this,"aria-describedby",t);else if(!t.length){const e=!!this.id;e||(this.id=this.describedbyId);const t=B(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{t(),e||this.removeAttribute("id")}}}connectedCallback(){super.connectedCallback(),this.tabIndex=0,window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}};let Nr=Rr;Nr.instanceCount=0,jr([f(".close-button")],Nr.prototype,"closeButton",2),jr([f(".content")],Nr.prototype,"contentElement",2),jr([i({type:Boolean,reflect:!0})],Nr.prototype,"error",2),jr([i({type:Boolean,reflect:!0})],Nr.prototype,"dismissable",2),jr([i({type:Boolean,reflect:!0,attribute:"no-divider"})],Nr.prototype,"noDivider",2),jr([i({type:String,reflect:!0})],Nr.prototype,"mode",2),jr([i({type:String,reflect:!0})],Nr.prototype,"size",2),customElements.define("sp-dialog",Nr);var Vr=r`
:host{align-items:center;box-sizing:border-box;display:flex;height:100vh;height:-webkit-fill-available;height:-moz-available;height:stretch;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden;width:100vw;z-index:2}:host([open]){visibility:visible}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]){border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}:host([responsive]){margin-top:0}}
`,Gr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Xr=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Kr(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Gr(t,r,a),a};class Wr extends(k(s)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1}static get styles(){return[Vr,_]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}focus(){if(this.shadowRoot){const e=G(this.dialog);e?(e.updateComplete?e.updateComplete.then((()=>e.focus())):e.focus(),this.removeAttribute("tabindex")):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return!!this.open&&(this.close(),!0)}dismiss(){!this.dismissable||this.close()}handleClose(e){e.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(e){!this.open&&"visibility"===e.propertyName&&(this.dispatchClosed(),this.resolveTransitionPromise())}handleModalTransitionend(){(this.open||!this.underlay)&&(this.resolveTransitionPromise(),this.open||this.dispatchClosed())}update(e){e.has("open")&&void 0!==e.get("open")&&(this.transitionPromise=new Promise((e=>this.resolveTransitionPromise=e))),super.update(e)}renderDialog(){return a`
            <slot></slot>
        `}render(){return a`
            ${this.underlay?a`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                          @transitionend=${this.handleUnderlayTransitionend}
                      ></sp-underlay>
                  `:a``}
            <div
                class="modal ${this.mode}"
                @transitionend=${this.handleModalTransitionend}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(e){e.has("open")&&(this.open?"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()})):this.tabIndex=0)}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}Xr([i({type:Boolean,reflect:!0})],Wr.prototype,"dismissable",2),Xr([i({type:Boolean,reflect:!0})],Wr.prototype,"open",2),Xr([i({type:String,reflect:!0})],Wr.prototype,"mode",2),Xr([i({type:Boolean})],Wr.prototype,"responsive",2),Xr([i({type:Boolean})],Wr.prototype,"underlay",2),customElements.define("sp-dialog-base",Wr);var Yr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,Qr=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Zr(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Yr(t,r,a),a};class Jr extends Wr{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){return a`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${this.noDivider}
                ?error=${this.error}
                mode=${g(this.mode)}
                size=${g(this.size)}
            >
                ${this.hero?a`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${g(this.heroLabel?void 0:"true")}
                              alt=${g(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:a``}
                ${this.headline?a`
                          <h2 slot="heading">${this.headline}</h2>
                      `:a``}
                <slot></slot>
                ${this.footer?a`
                          <div slot="footer">${this.footer}</div>
                      `:a``}
                ${this.cancelLabel?a`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:a``}
                ${this.secondaryLabel?a`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:a``}
                ${this.confirmLabel?a`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:a``}
            </sp-dialog>
        `}}Qr([i({type:Boolean,reflect:!0})],Jr.prototype,"error",2),Qr([i({attribute:"cancel-label"})],Jr.prototype,"cancelLabel",2),Qr([i({attribute:"confirm-label"})],Jr.prototype,"confirmLabel",2),Qr([i()],Jr.prototype,"footer",2),Qr([i()],Jr.prototype,"hero",2),Qr([i({attribute:"hero-label"})],Jr.prototype,"heroLabel",2),Qr([i({type:Boolean,reflect:!0,attribute:"no-divider"})],Jr.prototype,"noDivider",2),Qr([i({type:String,reflect:!0})],Jr.prototype,"size",2),Qr([i({attribute:"secondary-label"})],Jr.prototype,"secondaryLabel",2),Qr([i()],Jr.prototype,"headline",2),customElements.define("sp-dialog-wrapper",Jr);var eo=r`
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
`,to=Object.defineProperty,ro=Object.getOwnPropertyDescriptor;class oo extends s{constructor(){super(...arguments),this._dropEffect="copy",this.isDragged=!1,this.debouncedDragLeave=null}static get styles(){return[eo]}get dropEffect(){return this._dropEffect}set dropEffect(e){["copy","move","link","none"].includes(e)&&(this._dropEffect=e)}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave)}onDragOver(e){const t=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:e}),r=this.dispatchEvent(t);if(!e.dataTransfer)return;if(!r)return void(e.dataTransfer.dropEffect="none");e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,e.dataTransfer.dropEffect=this.dropEffect;const o=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(o)}onDragLeave(e){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout((()=>{this.isDragged=!1;const t=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t)}),100)}onDrop(e){e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const t=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t)}render(){return a`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null)}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?ro(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&to(t,r,a)})([i({type:Boolean,reflect:!0,attribute:"dragged"})],oo.prototype,"isDragged",2),customElements.define("sp-dropzone",oo);var so=r`
:host{--spectrum-fieldgroup-margin:var(
--spectrum-global-dimension-size-200
);--spectrum-fieldgroup-readonly-delineator:"\\002c"}.group{display:flex;flex-wrap:wrap;vertical-align:top}.spectrum-Checkbox.is-readOnly .spectrum-Checkbox-box{display:none}.spectrum-Checkbox.is-readOnly:not(:last-child) .spectrum-Checkbox-label:after{content:var(
--spectrum-fieldgroup-readonly-delineator
)}:host([dir=ltr][horizontal]) slot:not([name])::slotted(:not(:last-child)){margin-right:var(
--spectrum-fieldgroup-margin
)}:host([dir=rtl][horizontal]) slot:not([name])::slotted(:not(:last-child)){margin-left:var(
--spectrum-fieldgroup-margin
)}:host([vertical]) .group{display:inline-flex;flex-direction:column}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`,ao=Object.defineProperty,io=Object.getOwnPropertyDescriptor,lo=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?io(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ao(t,r,a),a};class co extends(O(s,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[so]}handleSlotchange(){}render(){return a`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}updated(e){super.updated(e),e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}lo([i({type:Boolean,reflect:!0})],co.prototype,"horizontal",2),lo([i({type:Boolean,reflect:!0})],co.prototype,"invalid",2),lo([i()],co.prototype,"label",2),lo([i({type:Boolean,reflect:!0})],co.prototype,"vertical",2),customElements.define("sp-field-group",co);var no=Object.defineProperty,uo=Object.getOwnPropertyDescriptor;class po extends c{constructor(){super(...arguments),this.registered=!1,this.handleRemoved=({detail:e})=>{e.name===this.name&&(this.registered=!1,this.addIconset())}}firstUpdated(){this.style.display="none"}set name(e){this.registered&&(this._name&&K.getInstance().removeIconset(this._name),e&&K.getInstance().addIconset(e,this)),this._name=e}get name(){return this._name}connectedCallback(){super.connectedCallback(),this.addIconset(),window.addEventListener("sp-iconset-removed",this.handleRemoved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-removed",this.handleRemoved),this.removeIconset()}addIconset(){!this.name||this.registered||(K.getInstance().addIconset(this.name,this),this.registered=!0)}removeIconset(){!this.name||(K.getInstance().removeIconset(this.name),this.registered=!1)}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?uo(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&no(t,r,a)})([i()],po.prototype,"name",1);var ho=Object.defineProperty,mo=Object.getOwnPropertyDescriptor;class bo extends po{constructor(){super(...arguments),this.iconMap=new Map}updated(e){if(!this.slotContainer)return;const t=this.getSVGNodes(this.slotContainer);this.updateSVG(t),super.updated(e)}async applyIconToElement(e,t,r,o){await this.updateComplete;const s=this.iconMap.get(t);if(!s)throw new Error(`Unable to find icon ${t}`);const a=this.prepareSvgClone(s);a.setAttribute("role","img"),o?a.setAttribute("aria-label",o):a.setAttribute("aria-hidden","true"),e.shadowRoot?e.shadowRoot.appendChild(a):e.appendChild(a)}getIconList(){return[...this.iconMap.keys()]}prepareSvgClone(e){const t=e.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=t.getAttribute("viewBox")||"";for(r.style.cssText="pointer-events: none; display: block; width: 100%; height: 100%;",r.setAttribute("viewBox",o),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false");t.childNodes.length>0;)r.appendChild(t.childNodes[0]);return r}getSVGIconName(e){return e}getSanitizedIconName(e){return e}renderDefaultContent(){return a``}render(){return a`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `}updateSVG(e){e.reduce(((e,t)=>{const r=t.querySelectorAll("symbol");return e.push(...r),e}),[]).forEach((e=>{this.iconMap.set(this.getSanitizedIconName(e.id),e)}))}getSVGNodes(e){return e.assignedNodes({flatten:!0}).filter((e=>"svg"===e.nodeName))}onSlotChange(e){const t=e.target,r=this.getSVGNodes(t);this.updateSVG(r)}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?mo(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&ho(t,r,a)})([f("slot")],bo.prototype,"slotContainer",2);var go=n`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 14 14"><path d="M12.93 6.227L9.023 2.32a1.094 1.094 0 10-1.546 1.547l2.039 2.04H1.844a1.094 1.094 0 100 2.187h7.672l-2.04 2.039a1.094 1.094 0 001.547 1.547l3.907-3.907a1.093 1.093 0 000-1.546z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 16 16"><path d="M14.606 7.194l-4.458-4.459a1.14 1.14 0 10-1.612 1.612L11.05 6.86H2.108a1.14 1.14 0 000 2.28h8.942l-2.514 2.513a1.14 1.14 0 101.611 1.612l4.46-4.46a1.139 1.139 0 000-1.61z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 16 16"><path d="M15.364 7.161l-5.083-5.083a1.186 1.186 0 00-1.678 1.678l3.057 3.058H1.277a1.187 1.187 0 100 2.373H11.66l-3.056 3.057a1.186 1.186 0 101.677 1.678l5.083-5.083a1.185 1.185 0 000-1.678z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 18 18"><path d="M17.216 8.126l-5.79-5.79a1.236 1.236 0 00-1.746 1.75l3.683 3.683c-.008 0-.014-.004-.021-.004H1.337a1.236 1.236 0 000 2.472H13.34c.007 0 .013-.004.02-.004l-3.68 3.682a1.236 1.236 0 101.748 1.748l5.789-5.789a1.237 1.237 0 000-1.748zm-2.643.895c0-.008.004-.014.004-.021s-.004-.013-.004-.02l.02.02z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 22 22"><path d="M20.17 10.089l-6.585-6.585a1.289 1.289 0 00-1.822 1.822l4.386 4.386H2.276a1.288 1.288 0 000 2.576h13.873l-4.386 4.386a1.289 1.289 0 001.822 1.822l6.585-6.585a1.289 1.289 0 000-1.822z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 24 24"><path d="M22.24 11.052l-7.485-7.485a1.341 1.341 0 00-1.897 1.897l5.194 5.194H2.079a1.342 1.342 0 000 2.684h15.973l-5.194 5.194a1.341 1.341 0 101.897 1.897l7.484-7.485a1.34 1.34 0 000-1.896z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 12 12"><path d="M11.325 5.258L7.91 1.84a1.05 1.05 0 00-1.486 1.484L8.048 4.95H1.494a1.05 1.05 0 000 2.1h6.554L6.423 8.675a1.05 1.05 0 001.486 1.484l3.416-3.417a1.05 1.05 0 000-1.484z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 10 10"><path d="M8.176 8.281c.069.07.115.163 0 .255l-1.437.927c-.115.07-.161.024-.208-.092l-1.783-3.1-2.339 2.571c-.024.045-.093.091-.161 0L1.136 7.678c-.116-.069-.093-.139 0-.208l2.639-2.2-3.01-1.134c-.046 0-.115-.092-.07-.209l.788-1.574a.123.123 0 01.151-.083.128.128 0 01.058.038l2.639 1.713L4.494.64a.122.122 0 01.1-.139.172.172 0 01.038 0l1.922.255c.116 0 .139.046.116.163l-.9 3.31 3.057-.927c.069-.046.139-.046.185.092l.3 1.713c.023.116 0 .162-.093.162l-3.2.255z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 12 12"><path d="M9.575 9.696c.077.079.129.183 0 .287L7.96 11.025c-.129.079-.182.027-.234-.1L5.72 7.433l-2.633 2.893c-.027.051-.1.1-.182 0l-1.251-1.3c-.131-.077-.1-.156 0-.234l2.97-2.476-3.388-1.285c-.052 0-.129-.1-.079-.235l.886-1.771a.138.138 0 01.17-.093.144.144 0 01.065.042l2.97 1.928.183-3.8a.137.137 0 01.114-.156.197.197 0 01.042 0l2.163.287c.131 0 .156.052.131.183L6.86 5.136l3.44-1.043c.077-.052.156-.052.208.1l.339 1.928c.025.13 0 .183-.1.183l-3.6.287z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 12 12"><path d="M10.024 10.155c.087.089.146.206 0 .323l-1.819 1.173c-.146.089-.2.03-.263-.117L5.685 7.605l-2.962 3.254c-.03.057-.117.116-.2 0L1.116 9.392c-.147-.087-.117-.176 0-.263l3.339-2.785L.642 4.908c-.059 0-.146-.117-.089-.264l1-1.993a.156.156 0 01.192-.1.163.163 0 01.073.048l3.337 2.163.206-4.28a.155.155 0 01.128-.176.23.23 0 01.047 0l2.433.323c.147 0 .176.059.147.206l-1.144 4.19 3.87-1.173c.087-.06.176-.06.234.117l.381 2.169c.028.147 0 .206-.117.206l-4.046.323z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.825 6.903c.061.062.1.144 0 .227l-1.277.824c-.1.062-.143.02-.185-.082L3.78 5.112 1.7 7.398c-.021.04-.082.08-.143 0L.569 6.367c-.1-.061-.082-.123 0-.185l2.347-1.957-2.68-1.007c-.041 0-.1-.082-.062-.186l.7-1.4a.109.109 0 01.135-.073.114.114 0 01.051.033l2.347 1.523.145-3.006a.109.109 0 01.09-.123.14.14 0 01.033 0l1.709.227c.1 0 .123.04.1.144l-.8 2.943 2.718-.824c.061-.041.123-.041.165.082l.268 1.523c.02.1 0 .144-.082.144l-2.842.227z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 14 14"><path d="M5.125 12.625a1.25 1.25 0 01-.96-.45L1.04 8.425a1.25 1.25 0 011.92-1.6l2.136 2.563 5.922-7.536a1.25 1.25 0 111.964 1.545l-6.874 8.75a1.25 1.25 0 01-.965.478z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 14 14"><path d="M4.891 13.224a1.304 1.304 0 01-1.005-.474l-3.54-4.3a1.302 1.302 0 012.011-1.655l2.508 3.046 6.758-8.647a1.302 1.302 0 112.05 1.604l-7.756 9.926a1.301 1.301 0 01-1.01.5z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 16 16"><path d="M5.627 14.894a1.357 1.357 0 01-1.042-.488l-4.1-4.92A1.357 1.357 0 012.569 7.75l3.027 3.631L13.4 1.448a1.356 1.356 0 012.133 1.675l-8.84 11.252a1.356 1.356 0 01-1.048.519z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 18 18"><path d="M6.33 16.642a1.415 1.415 0 01-1.086-.509l-4.683-5.62a1.413 1.413 0 012.171-1.81l3.566 4.28 8.936-11.374a1.413 1.413 0 012.223 1.746L7.441 16.102a1.415 1.415 0 01-1.09.54z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 12 12"><path d="M4.519 10.608a1.151 1.151 0 01-.885-.414L1.27 7.358a1.152 1.152 0 011.77-1.476l1.453 1.743 4.45-5.665a1.152 1.152 0 011.813 1.424l-5.331 6.784a1.153 1.153 0 01-.89.44z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 20 20"><path d="M6.997 18.48a1.47 1.47 0 01-1.13-.53L.521 11.538a1.471 1.471 0 112.26-1.885l4.182 5.017L17.18 1.666a1.472 1.472 0 112.314 1.818L8.154 17.917a1.472 1.472 0 01-1.135.562z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 24 24"><path d="M8.621 21.417a1.535 1.535 0 01-1.178-.552l-6.091-7.31a1.533 1.533 0 112.355-1.962l4.879 5.854L20.249 2.602a1.533 1.533 0 112.41 1.895L9.826 20.831a1.53 1.53 0 01-1.182.585z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 12 12"><path d="M4.333 11.09a1.2 1.2 0 01-.922-.433L.69 7.392a1.2 1.2 0 111.844-1.536l1.772 2.126 5.14-6.542a1.2 1.2 0 111.886 1.482L5.277 10.63a1.2 1.2 0 01-.927.459z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 14 14"><path d="M4.5 13.25a1.094 1.094 0 01-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 015.273 1.07l5.157 5.156a1.094 1.094 0 010 1.546L5.273 12.93a1.091 1.091 0 01-.773.321z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 16 16"><path d="M5.123 15.005a1.14 1.14 0 01-.806-1.945L9.377 8l-5.06-5.06a1.14 1.14 0 011.612-1.61l5.865 5.864a1.139 1.139 0 010 1.612L5.929 14.67a1.135 1.135 0 01-.806.334z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 16 16"><path d="M4.696 15.853a1.187 1.187 0 01-.84-2.026L9.684 8 3.856 2.173A1.187 1.187 0 015.536.495L12.2 7.16a1.187 1.187 0 010 1.678l-6.666 6.666a1.183 1.183 0 01-.84.348z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 18 18"><path d="M5.213 17.805a1.236 1.236 0 01-.874-2.11L11.034 9 4.34 2.305A1.236 1.236 0 016.087.557l7.57 7.569a1.235 1.235 0 010 1.748l-7.57 7.569a1.232 1.232 0 01-.874.362z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 20 20"><path d="M5.667 19.876a1.288 1.288 0 01-.91-2.199L12.433 10 4.756 2.323A1.288 1.288 0 016.578.502l8.588 8.587a1.288 1.288 0 010 1.822l-8.588 8.588a1.284 1.284 0 01-.911.377z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 24 24"><path d="M7.05 23.078a1.341 1.341 0 01-.948-2.29L14.89 12 6.102 3.212a1.341 1.341 0 011.896-1.898l9.737 9.737a1.34 1.34 0 010 1.898l-9.737 9.737a1.335 1.335 0 01-.948.392z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 12 12"><path d="M3.833 11.578a1.05 1.05 0 01-.742-1.793L6.876 6 3.091 2.215A1.05 1.05 0 114.575.73l4.529 4.527a1.05 1.05 0 010 1.486L4.575 11.27a1.047 1.047 0 01-.742.308z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 7 7"><path d="M6.687.75a.311.311 0 00-.221.091L.842 6.466a.312.312 0 00.221.533h5.624a.312.312 0 00.312-.312V1.062A.312.312 0 006.687.75z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 8 8"><path d="M7.65.97a.35.35 0 00-.249.1L1.07 7.401a.352.352 0 00.249.6H7.65a.352.352 0 00.352-.352V1.322A.352.352 0 007.65.97z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 8 8"><path d="M7.605.09a.394.394 0 00-.28.116L.206 7.325A.4.4 0 00.49 8h7.115a.4.4 0 00.4-.4V.49a.4.4 0 00-.4-.4z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 6 6"><path d="M5.718.44a.277.277 0 00-.2.081l-5 5a.278.278 0 00.2.474h5a.278.278 0 00.278-.278v-5A.278.278 0 005.718.44z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 10 10"><path d="M6.548 5L9.63 1.917A1.094 1.094 0 008.084.371L5.001 3.454 1.917.37A1.094 1.094 0 00.371 1.917L3.454 5 .37 8.085A1.094 1.094 0 101.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 101.547-1.546z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 12 12"><path d="M7.611 6l3.654-3.653A1.14 1.14 0 009.653.735L6 4.39 2.347.735A1.14 1.14 0 00.735 2.347L4.39 6 .735 9.653a1.14 1.14 0 101.612 1.612L6 7.61l3.653 3.654a1.14 1.14 0 001.612-1.612z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 14 14"><path d="M8.678 7l4.245-4.244a1.186 1.186 0 00-1.678-1.678L7.001 5.323 2.755 1.077a1.187 1.187 0 00-1.678 1.678L5.322 7l-4.244 4.244a1.187 1.187 0 001.678 1.678l4.245-4.245 4.244 4.245a1.186 1.186 0 001.678-1.678z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 16 16"><path d="M9.748 8l4.915-4.915a1.236 1.236 0 00-1.748-1.748L8 6.252 3.085 1.337a1.236 1.236 0 00-1.748 1.748L6.252 8l-4.915 4.915a1.236 1.236 0 101.748 1.748L8 9.748l4.915 4.915a1.236 1.236 0 001.748-1.748z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 16 16"><path d="M9.823 8l5.674-5.674A1.289 1.289 0 1013.675.504L8 6.179 2.326.503A1.288 1.288 0 00.504 2.326l5.674 5.675-5.674 5.674a1.288 1.288 0 001.822 1.822L8 9.822l5.674 5.675a1.289 1.289 0 101.823-1.822z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 18 18"><path d="M10.897 9l6.537-6.536A1.341 1.341 0 1015.537.567L9 7.104 2.465.567A1.341 1.341 0 00.567 2.464L7.104 9 .567 15.537a1.341 1.341 0 101.897 1.897L9 10.897l6.536 6.537a1.341 1.341 0 101.897-1.897z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 10 10"><path d="M6.485 5l2.674-2.674A1.05 1.05 0 107.674.84L5 3.515 2.326.84A1.05 1.05 0 00.84 2.326L3.515 5 .84 7.674A1.05 1.05 0 002.326 9.16L5 6.485 7.674 9.16A1.05 1.05 0 109.16 7.674z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 12 12"><path d="M10.375 7.25h-8.75a1.25 1.25 0 010-2.5h8.75a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 14 14"><path d="M12.026 8.302H1.974a1.302 1.302 0 010-2.604h10.052a1.302 1.302 0 010 2.604z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 16 16"><path d="M13.763 9.356H2.237a1.356 1.356 0 010-2.712h11.526a1.356 1.356 0 010 2.712z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 18 18"><path d="M15.596 10.413H2.404a1.413 1.413 0 010-2.826h13.192a1.413 1.413 0 010 2.826z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 10 10"><path d="M8.293 6.152H1.708a1.152 1.152 0 010-2.304h6.585a1.152 1.152 0 110 2.304z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 20 20"><path d="M17.54 11.472H2.461a1.472 1.472 0 010-2.944h15.077a1.472 1.472 0 010 2.944z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 22 22"><path d="M19.604 12.533H2.398a1.533 1.533 0 110-3.066h17.206a1.533 1.533 0 010 3.066z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 10 10"><path d="M8.75 6.2h-7.5a1.2 1.2 0 010-2.4h7.5a1.2 1.2 0 110 2.4z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 20 6"><path d="M19.375 1.75H.625a.625.625 0 010-1.25h18.75a.625.625 0 010 1.25zM20 4.875a.626.626 0 00-.625-.625H.625a.625.625 0 000 1.25h18.75A.626.626 0 0020 4.875z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 30 4"><path d="M28.75 3.25H1.25a1.25 1.25 0 010-2.5h27.5a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 14 10"><path d="M12.625 1.25H1.375a.625.625 0 010-1.25h11.25a.625.625 0 010 1.25zm.625 3.125a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625zm0 3.75a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625z"/></symbol></svg>`;customElements.define("sp-icons-large",class extends bo{constructor(){super(),this.name="ui"}renderDefaultContent(){return go}getSVGIconName(e){return`spectrum-icon-${e}`}getSanitizedIconName(e){return e.replace("spectrum-icon-","")}});var vo=n`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 10 10"><path d="M9.7 4.387L6.623 1.262a.875.875 0 10-1.247 1.226l1.61 1.637H.925a.875.875 0 000 1.75h6.062l-1.61 1.637a.875.875 0 101.247 1.226l3.075-3.125a.874.874 0 000-1.226z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 12 12"><path d="M11.284 5.356L7.718 1.788a.911.911 0 10-1.29 1.29l2.012 2.01H1.286a.911.911 0 100 1.823H8.44L6.429 8.923a.911.911 0 001.289 1.289l3.566-3.567a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 14 14"><path d="M12.893 6.33L8.826 2.261a.95.95 0 10-1.344 1.341L9.93 6.051H1.621a.95.95 0 100 1.898H9.93l-2.447 2.447a.95.95 0 001.344 1.342l4.067-4.067a.95.95 0 000-1.342z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 16 16"><path d="M14.572 7.3l-4.63-4.63a.989.989 0 00-1.399 1.398l2.942 2.943H1.87a.99.99 0 000 1.978h9.615l-2.942 2.943a.989.989 0 101.398 1.398l4.631-4.63a.988.988 0 000-1.4z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 18 18"><path d="M16.336 8.271l-5.269-5.267A1.03 1.03 0 109.61 4.46l3.51 3.509H2.021a1.03 1.03 0 000 2.06H13.12l-3.51 3.51a1.03 1.03 0 101.457 1.456l5.269-5.268a1.03 1.03 0 000-1.456z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 20 20"><path d="M18.191 9.241l-5.986-5.987a1.073 1.073 0 00-1.518 1.517l4.155 4.156H2.063a1.073 1.073 0 100 2.146h12.779l-4.154 4.155a1.073 1.073 0 101.517 1.518l5.986-5.987a1.073 1.073 0 000-1.518z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 10 10"><path d="M9.26 4.406L6.528 1.672A.84.84 0 005.34 2.859l1.3 1.301H1.396a.84.84 0 000 1.68H6.64l-1.301 1.3a.84.84 0 001.188 1.188l2.734-2.734a.84.84 0 000-1.188z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 8 8"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 10 10"><path d="M7.861 7.953c.062.063.1.146 0 .23l-1.293.834c-.1.063-.145.021-.187-.083l-1.6-2.793-2.105 2.314c-.021.04-.083.082-.145 0l-1-1.043c-.1-.062-.083-.125 0-.187l2.375-1.981-2.715-1.026c-.042 0-.1-.083-.063-.188l.707-1.412a.111.111 0 01.136-.074.116.116 0 01.052.034l2.378 1.54.146-3.043A.11.11 0 014.638.95a.161.161 0 01.034 0l1.73.23c.1 0 .125.042.1.146l-.814 2.979 2.751-.834c.062-.042.125-.042.167.083l.271 1.542c.02.1 0 .146-.083.146l-2.876.23z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 10 10"><path d="M8.266 8.324c.07.071.116.164 0 .258l-1.454.938c-.116.071-.163.024-.21-.094l-1.8-3.141-2.367 2.6c-.024.045-.094.092-.163 0l-1.13-1.167c-.118-.07-.094-.141 0-.21l2.671-2.227L.766 4.13c-.047 0-.116-.094-.071-.211l.8-1.593a.124.124 0 01.153-.084.13.13 0 01.058.038l2.669 1.738.164-3.422a.124.124 0 01.1-.14.186.186 0 01.038 0l1.945.258c.118 0 .14.047.118.164l-.915 3.349 3.094-.938c.07-.047.14-.047.187.094l.3 1.734c.023.118 0 .164-.094.164l-3.234.258z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.26 6.463c.049.05.082.116 0 .181l-1.022.659c-.082.05-.115.017-.148-.066L3.822 5.03 2.16 6.859c-.017.032-.066.065-.115 0l-.79-.824c-.083-.049-.066-.1 0-.148l1.877-1.565L.99 3.516c-.033 0-.082-.066-.05-.148l.56-1.119a.087.087 0 01.108-.059.09.09 0 01.04.027l1.878 1.218.116-2.4a.087.087 0 01.072-.1h.027l1.367.181c.083 0 .1.033.083.116L4.55 3.581l2.174-.659c.049-.033.1-.033.132.066l.214 1.218c.016.083 0 .115-.066.115l-2.273.181z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 10 10"><path d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 12 12"><path d="M4.313 10.98a1.042 1.042 0 01-.8-.375L.647 7.165a1.042 1.042 0 011.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 011.64 1.287l-6.24 7.94a1.04 1.04 0 01-.804.399z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 14 14"><path d="M5.102 12.514a1.087 1.087 0 01-.834-.39L.988 8.19A1.085 1.085 0 012.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 011.707 1.34L5.955 12.1a1.089 1.089 0 01-.838.415z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 16 16"><path d="M5.864 14.114a1.13 1.13 0 01-.868-.407L1.25 9.21a1.13 1.13 0 111.736-1.448l2.854 3.425 7.148-9.1a1.13 1.13 0 111.778 1.397L6.753 13.682a1.13 1.13 0 01-.872.432z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 10 10"><path d="M3.815 8.687a.921.921 0 01-.708-.332l-1.891-2.27a.921.921 0 011.416-1.18L3.794 6.3l3.56-4.531a.921.921 0 111.45 1.138L4.54 8.335a.921.921 0 01-.712.351z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 16 16"><path d="M5.597 14.784a1.177 1.177 0 01-.905-.424L.417 9.229a1.177 1.177 0 111.809-1.508l3.343 4.013 8.174-10.402a1.177 1.177 0 011.852 1.456L6.523 14.334a1.178 1.178 0 01-.91.45z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 18 18"><path d="M6.297 16.534a1.228 1.228 0 01-.942-.442L.48 10.244a1.227 1.227 0 011.885-1.57l3.904 4.684L15.6 1.482a1.227 1.227 0 011.93 1.516L7.262 16.065a1.229 1.229 0 01-.947.469z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 10 10"><path d="M3.667 9.07a.96.96 0 01-.737-.344L.753 6.114a.96.96 0 111.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 011.51 1.186L4.422 8.704a.962.962 0 01-.741.367z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 12 12"><path d="M9.034 5.356L4.343.663a.911.911 0 00-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 101.289 1.29l4.691-4.692a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 14 14"><path d="M10.639 7a.947.947 0 00-.278-.671l-.003-.002-5.33-5.33a.95.95 0 00-1.342 1.342L8.346 7l-4.661 4.66a.95.95 0 101.342 1.343l5.33-5.33.003-.001A.947.947 0 0010.64 7z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 16 16"><path d="M4.97 15.044a.989.989 0 01-.698-1.688L9.627 8 4.27 2.644a.989.989 0 011.4-1.398L11.726 7.3a.988.988 0 010 1.398L5.67 14.754a.985.985 0 01-.7.29z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 16 16"><path d="M12.133 7.271L5.263.401a1.03 1.03 0 00-1.457 1.457L9.947 8l-6.141 6.142a1.03 1.03 0 001.457 1.457l6.87-6.87a1.03 1.03 0 000-1.457z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 18 18"><path d="M5.04 17.863a1.073 1.073 0 01-.759-1.832L11.313 9 4.28 1.969A1.073 1.073 0 015.8.45l7.79 7.79a1.073 1.073 0 010 1.518l-7.79 7.79a1.07 1.07 0 01-.759.314z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 10 10"><path d="M7.482 4.406l-.001-.001L3.86.783a.84.84 0 00-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 003.86 9.216l3.621-3.622h.001a.84.84 0 000-1.19z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 5 5"><path d="M4.763 0a.248.248 0 00-.177.073l-4.5 4.5A.25.25 0 00.263 5h4.5a.25.25 0 00.25-.25V.25a.25.25 0 00-.25-.25z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 6 6"><path d="M5.719.37a.281.281 0 00-.2.082L.452 5.519a.281.281 0 00.2.481h5.067A.281.281 0 006 5.719V.652A.281.281 0 005.72.37z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 7 7"><path d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 5 5"><path d="M4.78.558a.222.222 0 00-.157.065l-4 4a.222.222 0 00.157.379h4a.222.222 0 00.222-.222v-4A.222.222 0 004.78.558z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 8 8"><path d="M5.238 4l2.456-2.457A.875.875 0 106.456.306L4 2.763 1.543.306A.875.875 0 00.306 1.544L2.763 4 .306 6.457a.875.875 0 101.238 1.237L4 5.237l2.456 2.457a.875.875 0 101.238-1.237z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 10 10"><path d="M6.29 5l2.922-2.922a.911.911 0 00-1.29-1.29L5 3.712 2.078.789a.911.911 0 00-1.29 1.289L3.712 5 .79 7.922a.911.911 0 101.289 1.29L5 6.288 7.923 9.21a.911.911 0 001.289-1.289z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 12 12"><path d="M7.344 6l3.395-3.396a.95.95 0 00-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 00-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 001.343 1.343L6 7.344l3.395 3.395a.95.95 0 001.344-1.344z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 12 12"><path d="M7.398 6l3.932-3.932A.989.989 0 009.932.67L6 4.602 2.068.67A.989.989 0 00.67 2.068L4.602 6 .67 9.932a.989.989 0 101.398 1.398L6 7.398l3.932 3.932a.989.989 0 001.398-1.398z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 14 14"><path d="M8.457 7l4.54-4.54a1.03 1.03 0 00-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 00-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 101.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 001.456-1.458z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 16 16"><path d="M9.518 8l5.23-5.228a1.073 1.073 0 00-1.518-1.518L8.001 6.483l-5.229-5.23a1.073 1.073 0 00-1.518 1.519L6.483 8l-5.23 5.229a1.073 1.073 0 101.518 1.518l5.23-5.23 5.228 5.23a1.073 1.073 0 001.518-1.518z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 8 8"><path d="M5.188 4l2.14-2.14A.84.84 0 106.141.672L4 2.812 1.86.672A.84.84 0 00.672 1.86L2.812 4 .672 6.14A.84.84 0 101.86 7.328L4 5.188l2.14 2.14A.84.84 0 107.328 6.14z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 10 10"><path d="M8.5 6h-7a1 1 0 010-2h7a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 12 12"><path d="M10.021 7.042H1.98a1.042 1.042 0 110-2.083h8.043a1.042 1.042 0 010 2.083z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 12 12"><path d="M10.61 7.085H1.39a1.085 1.085 0 010-2.17h9.22a1.085 1.085 0 010 2.17z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 14 14"><path d="M12.277 8.13H1.723a1.13 1.13 0 110-2.26h10.554a1.13 1.13 0 110 2.26z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 8 8"><path d="M6.634 4.921H1.366a.921.921 0 010-1.842h5.268a.921.921 0 110 1.842z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 16 16"><path d="M14.03 9.178H1.969a1.178 1.178 0 110-2.356H14.03a1.178 1.178 0 010 2.356z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 18 18"><path d="M15.882 10.227H2.117a1.227 1.227 0 010-2.454h13.765a1.227 1.227 0 010 2.454z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 8 8"><path d="M6.99 4.96H1.01a.96.96 0 010-1.92h5.98a.96.96 0 010 1.92z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 16 4"><path d="M15.45 1.05H.55a.5.5 0 010-1h14.9a.5.5 0 010 1zm.5 2.4a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h14.9a.5.5 0 00.5-.5z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 24 2"><path d="M23 2H1a1 1 0 010-2h22a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 10 8"><path d="M9.45 1.05H.55a.5.5 0 010-1h8.9a.5.5 0 010 1zm.5 2.45a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5z"/></symbol></svg>`;customElements.define("sp-icons-medium",class extends bo{constructor(){super(),this.name="ui"}renderDefaultContent(){return vo}getSVGIconName(e){return`spectrum-icon-${e}`}getSanitizedIconName(e){return e.replace("spectrum-icon-","")}});var fo=r`
:host{margin:calc(var(--spectrum-listitem-texticon-divider-padding)/2) var(--spectrum-listitem-texticon-padding-y);overflow:visible;width:auto}@media (forced-colors:active){:host{background-color:CanvasText;forced-color-adjust:none}}:host{display:block}
`;customElements.define("sp-menu-divider",class extends s{static get styles(){return[S,fo]}firstUpdated(){this.setAttribute("role","separator"),this.setAttribute("size","m")}});var xo=r`
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
`,yo=Object.defineProperty,ko=Object.getOwnPropertyDescriptor,wo=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ko(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&yo(t,r,a),a};class zo extends(v(b(s,""))){constructor(){super(...arguments),this.progress=0,this.overBackground=!1,this.notice=!1,this.negative=!1,this.positive=!1,this.label="",this.sideLabel=!1}static get styles(){return[xo]}render(){return a`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?a``:this.label}
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
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","progressbar")}updated(e){super.updated(e),e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),this.label&&e.has("label")&&this.setAttribute("aria-label",this.label)}}wo([i({type:Number})],zo.prototype,"progress",2),wo([i({type:Boolean,reflect:!0,attribute:"over-background"})],zo.prototype,"overBackground",2),wo([i({type:Boolean,reflect:!0})],zo.prototype,"notice",2),wo([i({type:Boolean,reflect:!0})],zo.prototype,"negative",2),wo([i({type:Boolean,reflect:!0})],zo.prototype,"positive",2),wo([i({type:String,reflect:!0})],zo.prototype,"label",2),wo([i({type:Boolean,reflect:!0,attribute:"side-label"})],zo.prototype,"sideLabel",2),customElements.define("sp-meter",zo);let To=new Map,Co=!1;try{Co="exceptZero"===new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay}catch(e){}let _o=!1;try{_o="unit"===new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style}catch(e){}const So={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class Eo{format(e){let t="";if(t=Co||null==this.options.signDisplay?this.numberFormatter.format(e):function(e,t,r){if("auto"===t)return e.format(r);if("never"===t)return e.format(Math.abs(r));{let o=!1;if("always"===t?o=r>0||Object.is(r,0):"exceptZero"===t&&(Object.is(r,-0)||Object.is(r,0)?r=Math.abs(r):o=r>0),o){let t=e.format(-r),o=e.format(r),s=t.replace(o,"").replace(/\u200e|\u061C/,"");return 1!==[...s].length&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),t.replace(o,"!!!").replace(s,"+").replace("!!!",o)}return e.format(r)}}(this.numberFormatter,this.options.signDisplay,e),"unit"===this.options.style&&!_o){var r;let{unit:e,unitDisplay:o="short",locale:s}=this.resolvedOptions(),a=null===(r=So[e])||void 0===r?void 0:r[o];t+=a[s]||a.default}return t}formatToParts(e){return this.numberFormatter.formatToParts(e)}formatRange(e,t){if("function"==typeof this.numberFormatter.formatRange)return this.numberFormatter.formatRange(e,t);if(t<e)throw new RangeError("End date must be >= start date");return`${this.format(e)} – ${this.format(t)}`}formatRangeToParts(e,t){if("function"==typeof this.numberFormatter.formatRangeToParts)return this.numberFormatter.formatRangeToParts(e,t);if(t<e)throw new RangeError("End date must be >= start date");let r=this.numberFormatter.formatToParts(e),o=this.numberFormatter.formatToParts(t);return[...r.map((e=>({...e,source:"startRange"}))),{type:"literal",value:" – ",source:"shared"},...o.map((e=>({...e,source:"endRange"})))]}resolvedOptions(){let e=this.numberFormatter.resolvedOptions();return Co||null==this.options.signDisplay||(e={...e,signDisplay:this.options.signDisplay}),_o||"unit"!==this.options.style||(e={...e,style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay}),e}constructor(e,t={}){this.numberFormatter=function(e,t={}){let{numberingSystem:r}=t;r&&-1===e.indexOf("-u-nu-")&&(e=`${e}-u-nu-${r}`);if("unit"===t.style&&!_o){var o;let{unit:e,unitDisplay:r="short"}=t;if(!e)throw new Error('unit option must be provided with style: "unit"');if(!(null===(o=So[e])||void 0===o?void 0:o[r]))throw new Error(`Unsupported unit ${e} with unitDisplay = ${r}`);t={...t,style:"decimal"}}let s=e+(t?Object.entries(t).sort(((e,t)=>e[0]<t[0]?-1:1)).join():"");if(To.has(s))return To.get(s);let a=new Intl.NumberFormat(e,t);return To.set(s,a),a}(e,t),this.options=t}}const qo=new RegExp("^.*\\(.*\\).*$"),Ao=["latn","arab","hanidec"];class Io{parse(e){return $o(this.locale,this.options,e).parse(e)}isValidPartialNumber(e,t,r){return $o(this.locale,this.options,e).isValidPartialNumber(e,t,r)}getNumberingSystem(e){return $o(this.locale,this.options,e).options.numberingSystem}constructor(e,t={}){this.locale=e,this.options=t}}const Lo=new Map;function $o(e,t,r){let o=Po(e,t);if(!e.includes("-nu-")&&!o.isValidPartialNumber(r))for(let s of Ao)if(s!==o.options.numberingSystem){let o=Po(e+(e.includes("-u-")?"-nu-":"-u-nu-")+s,t);if(o.isValidPartialNumber(r))return o}return o}function Po(e,t){let r=e+(t?Object.entries(t).sort(((e,t)=>e[0]<t[0]?-1:1)).join():""),o=Lo.get(r);return o||(o=new Bo(e,t),Lo.set(r,o)),o}class Bo{parse(e){let t=this.sanitize(e);t=Mo(t,this.symbols.group,"").replace(this.symbols.decimal,".").replace(this.symbols.minusSign,"-").replace(this.symbols.numeral,this.symbols.index);let r=t?+t:NaN;if(isNaN(r))return NaN;var o;("accounting"===this.options.currencySign&&qo.test(e)&&(r*=-1),"percent"===this.options.style)&&(r/=100,r=+r.toFixed((null!==(o=this.options.maximumFractionDigits)&&void 0!==o?o:0)+2));return r}sanitize(e){return e=(e=e.replace(this.symbols.literals,"")).replace("-",this.symbols.minusSign),"arab"===this.options.numberingSystem&&(e=Mo(e=(e=e.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal),".",this.symbols.group)),"fr-FR"===this.options.locale&&(e=Mo(e,".",String.fromCharCode(8239))),e}isValidPartialNumber(e,t=-1/0,r=1/0){return(e=this.sanitize(e)).startsWith(this.symbols.minusSign)&&t<0?e=e.slice(this.symbols.minusSign.length):this.symbols.plusSign&&e.startsWith(this.symbols.plusSign)&&r>0&&(e=e.slice(this.symbols.plusSign.length)),!e.startsWith(this.symbols.group)&&0===(e=Mo(e,this.symbols.group,"").replace(this.symbols.numeral,"").replace(this.symbols.decimal,"")).length}constructor(e,t={}){this.formatter=new Intl.NumberFormat(e,t),this.options=this.formatter.resolvedOptions(),this.symbols=function(e,t,r){var o,s,a,i;let l=e.formatToParts(-10000.111),c=e.formatToParts(10000.111),n=e.formatToParts(1);var d;let u=null!==(d=null===(o=l.find((e=>"minusSign"===e.type)))||void 0===o?void 0:o.value)&&void 0!==d?d:"-",p=null===(s=c.find((e=>"plusSign"===e.type)))||void 0===s?void 0:s.value;p||"exceptZero"!==(null==r?void 0:r.signDisplay)&&"always"!==(null==r?void 0:r.signDisplay)||(p="+");let h=null===(a=l.find((e=>"decimal"===e.type)))||void 0===a?void 0:a.value,m=null===(i=l.find((e=>"group"===e.type)))||void 0===i?void 0:i.value,b=l.filter((e=>!Oo.has(e.type))).map((e=>Do(e.value))),g=n.filter((e=>!Oo.has(e.type))).map((e=>Do(e.value))),v=[...new Set([...g,...b])].sort(((e,t)=>t.length-e.length)),f=new RegExp(`${v.join("|")}|[\\p{White_Space}]`,"gu"),x=[...new Intl.NumberFormat(t.locale,{useGrouping:!1}).format(9876543210)].reverse(),y=new Map(x.map(((e,t)=>[e,t]))),k=new RegExp(`[${x.join("")}]`,"g");return{minusSign:u,plusSign:p,decimal:h,group:m,literals:f,numeral:k,index:e=>String(y.get(e))}}(this.formatter,this.options,t)}}const Oo=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]);function Mo(e,t,r){return e.replaceAll?e.replaceAll(t,r):e.split(t).join(r)}function Do(e){return e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}var Ho=r`
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
`,Uo=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,Fo=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?jo(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Uo(t,r,a),a};const Ro={"１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0","、":",","，":",","。":".","．":".","％":"%","＋":"+","ー":"-"};class No extends M{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.resolvedLanguage=document.documentElement.lang||navigator.language,this.managedInput=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.changeCount=0,this.wasIndeterminate=!1}static get styles(){return[...super.styles,Ho,z]}set value(e){const t=this.validateInput(e);if(t===this.value)return;const r=this._value;this._value=t,this.requestUpdate("value",r)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}get valueAsString(){return this._value.toString()}set valueAsString(e){this.value=this.numberParser.parse(e)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(e){return this.numberParser.parse(e)}get _step(){var e;return void 0!==this.step?this.step:"percent"===(null==(e=this.formatOptions)?void 0:e.style)?.01:1}handlePointerdown(e){if(0!==e.button)return void e.preventDefault();this.managedInput=!0,this.buttons.setPointerCapture(e.pointerId);const t=this.buttons.children[0].getBoundingClientRect(),r=this.buttons.children[1].getBoundingClientRect();this.findChange=e=>{e.clientX>=t.x&&e.clientY>=t.y&&e.clientX<=t.x+t.width&&e.clientY<=t.y+t.height?this.change=e=>this.increment(e.shiftKey?this.stepModifier:1):e.clientX>=r.x&&e.clientY>=r.y&&e.clientX<=r.x+r.width&&e.clientY<=r.y+r.height&&(this.change=e=>this.decrement(e.shiftKey?this.stepModifier:1))},this.findChange(e),this.startChange(e)}startChange(e){this.changeCount=0,this.doChange(e),this.safty=setTimeout((()=>{this.doNextChange(e)}),400)}doChange(e){this.change(e)}handlePointermove(e){this.findChange(e)}handlePointerup(e){this.buttons.releasePointerCapture(e.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.managedInput=!1}doNextChange(e){return this.changeCount+=1,this.changeCount%5==0&&this.doChange(e),requestAnimationFrame((()=>{this.nextChange=this.doNextChange(e)}))}stepBy(e){if(this.disabled||this.readonly)return;const t=void 0!==this.min?this.min:0;let r=this.value;r+=e*this._step,isNaN(this.value)?this.value=t:this.value=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus()}increment(e=1){this.stepBy(1*e)}decrement(e=1){this.stepBy(-1*e)}handleKeydown(e){switch(e.code){case"ArrowUp":e.preventDefault(),this.increment(e.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));break;case"ArrowDown":e.preventDefault(),this.decrement(e.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}onScroll(e){e.preventDefault(),this.managedInput=!0;const t=e.shiftKey?e.deltaX/Math.abs(e.deltaX):e.deltaY/Math.abs(e.deltaY);0!==t&&!isNaN(t)&&this.stepBy(t*(e.shiftKey?this.stepModifier:1)),this.managedInput=!1}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1})}onBlur(){super.onBlur(),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll)}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1}handleChange(){const e=this.convertValueToNumber(this.inputValue);this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(e))?this.indeterminate=!0:(this.value=e,super.handleChange())}handleInput(){this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace("-",""));const{value:e,selectionStart:t}=this.inputElement,r=e.split("").map((e=>Ro[e]||e)).join("");if(this.numberParser.isValidPartialNumber(r)){const e=this.convertValueToNumber(r);return!r&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(e)),this._trackingValue=r,void(this.inputElement.value=r)}const o=r.length,s=(t||o)-(o-this._trackingValue.length);this.inputElement.value=this.indeterminate?"-":this._trackingValue,this.inputElement.setSelectionRange(s,s)}validateInput(e){if(void 0!==this.min&&(e=Math.max(this.min,e)),void 0!==this.max&&(e=Math.min(this.max,e)),this.step){const t=(e-(void 0!==this.min?this.min:0))%this.step;if(0===t||(1===Math.round(t/this.step)?e+=this.step-t:e-=t),void 0!==this.max)for(;e>this.max;)e-=this.step}return e}get displayValue(){const e=this.focused?"":"-";return this.indeterminate?e:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:e,unit:t,unitDisplay:r,...o}=this.formatOptions;"unit"!==e&&(o.style=e),this._numberFormatterFocused=new Eo(this.resolvedLanguage,o);try{this._numberFormatter=new Eo(this.resolvedLanguage,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch(r){"unit"===e&&(this._forcedUnit=t),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:e,unit:t,unitDisplay:r,...o}=this.formatOptions;"unit"!==e&&(o.style=e),this._numberParserFocused=new Io(this.resolvedLanguage,o);try{this._numberParser=new Io(this.resolvedLanguage,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch(r){"unit"===e&&(this._forcedUnit=t),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",a`
            ${super.renderField()}
            ${this.hideStepper?a``:a`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${Rt({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
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
        `}update(e){if((e.has("formatOptions")||e.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),e.has("value")||e.has("max")||e.has("min")){const e=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=e}super.update(e)}willUpdate(){this.multiline=!1}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",this.handleKeydown)}updated(e){if(e.has("min")||e.has("formatOptions")){let e="numeric";const t=void 0!==this.min&&this.min<0,{maximumFractionDigits:r}=this.formatOptions,o=r&&r>0;le()?t?e="text":o&&(e="decimal"):ne()&&(t?e="numeric":o&&(e="decimal")),this.inputElement.inputMode=e}}connectedCallback(){super.connectedCallback(),this.resolveLanguage()}disconnectedCallback(){this.resolveLanguage(),super.disconnectedCallback()}resolveLanguage(){const e=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:e=>{this.resolvedLanguage=e}},cancelable:!0});this.dispatchEvent(e)}}Fo([f(".buttons")],No.prototype,"buttons",2),Fo([i({type:Boolean,reflect:!0})],No.prototype,"focused",2),Fo([i({type:Object,attribute:"format-options"})],No.prototype,"formatOptions",2),Fo([i({type:Boolean,reflect:!0,attribute:"hide-stepper"})],No.prototype,"hideStepper",2),Fo([i({type:Boolean,reflect:!0})],No.prototype,"indeterminate",2),Fo([i({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],No.prototype,"keyboardFocused",2),Fo([i({type:Number})],No.prototype,"max",2),Fo([i({type:Number})],No.prototype,"min",2),Fo([i({attribute:!1})],No.prototype,"resolvedLanguage",2),Fo([i({type:Number})],No.prototype,"step",2),Fo([i({type:Number,reflect:!0,attribute:"step-modifier"})],No.prototype,"stepModifier",2),Fo([i({type:Number})],No.prototype,"value",1),customElements.define("sp-number-field",No);var Vo=Object.freeze({__proto__:null});customElements.define("overlay-trigger",ge);var Go=r`
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
`,Ko=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,Wo=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Xo(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ko(t,r,a),a};class Yo extends(v(s)){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[Go]}render(){return a`
            ${this.label?a`
                      <sp-field-label size=${this.size} class="label">
                          ${this.label}
                      </sp-field-label>
                      ${this.indeterminate?a``:a`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${this.progress}%
                                </sp-field-label>
                            `}
                  `:a``}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(e){super.updated(e),e.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&e.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&e.has("label")&&this.setAttribute("aria-label",this.label)}}Wo([i({type:Boolean,reflect:!0})],Yo.prototype,"indeterminate",2),Wo([i({type:String})],Yo.prototype,"label",2),Wo([i({type:Boolean,reflect:!0,attribute:"over-background"})],Yo.prototype,"overBackground",2),Wo([i({type:Boolean,reflect:!0,attribute:"side-label"})],Yo.prototype,"sideLabel",2),Wo([i({type:Number})],Yo.prototype,"progress",2),customElements.define("sp-progress-bar",Yo);var Zo=r`
.fill-submask-2{animation:spectrum-fill-mask-2 1s linear infinite}@keyframes spectrum-fill-mask-1{0%{transform:rotate(90deg)}1.69%{transform:rotate(72.3deg)}3.39%{transform:rotate(55.5deg)}5.08%{transform:rotate(40.3deg)}6.78%{transform:rotate(25deg)}8.47%{transform:rotate(10.6deg)}10.17%{transform:rotate(0deg)}11.86%{transform:rotate(0deg)}13.56%{transform:rotate(0deg)}15.25%{transform:rotate(0deg)}16.95%{transform:rotate(0deg)}18.64%{transform:rotate(0deg)}20.34%{transform:rotate(0deg)}22.03%{transform:rotate(0deg)}23.73%{transform:rotate(0deg)}25.42%{transform:rotate(0deg)}27.12%{transform:rotate(0deg)}28.81%{transform:rotate(0deg)}30.51%{transform:rotate(0deg)}32.2%{transform:rotate(0deg)}33.9%{transform:rotate(0deg)}35.59%{transform:rotate(0deg)}37.29%{transform:rotate(0deg)}38.98%{transform:rotate(0deg)}40.68%{transform:rotate(0deg)}42.37%{transform:rotate(5.3deg)}44.07%{transform:rotate(13.4deg)}45.76%{transform:rotate(20.6deg)}47.46%{transform:rotate(29deg)}49.15%{transform:rotate(36.5deg)}50.85%{transform:rotate(42.6deg)}52.54%{transform:rotate(48.8deg)}54.24%{transform:rotate(54.2deg)}55.93%{transform:rotate(59.4deg)}57.63%{transform:rotate(63.2deg)}59.32%{transform:rotate(67.2deg)}61.02%{transform:rotate(70.8deg)}62.71%{transform:rotate(73.8deg)}64.41%{transform:rotate(76.2deg)}66.1%{transform:rotate(78.7deg)}67.8%{transform:rotate(80.6deg)}69.49%{transform:rotate(82.6deg)}71.19%{transform:rotate(83.7deg)}72.88%{transform:rotate(85deg)}74.58%{transform:rotate(86.3deg)}76.27%{transform:rotate(87deg)}77.97%{transform:rotate(87.7deg)}79.66%{transform:rotate(88.3deg)}81.36%{transform:rotate(88.6deg)}83.05%{transform:rotate(89.2deg)}84.75%{transform:rotate(89.2deg)}86.44%{transform:rotate(89.5deg)}88.14%{transform:rotate(89.9deg)}89.83%{transform:rotate(89.7deg)}91.53%{transform:rotate(90.1deg)}93.22%{transform:rotate(90.2deg)}94.92%{transform:rotate(90.1deg)}96.61%{transform:rotate(90deg)}98.31%{transform:rotate(89.8deg)}to{transform:rotate(90deg)}}@keyframes spectrum-fill-mask-2{0%{transform:rotate(180deg)}1.69%{transform:rotate(180deg)}3.39%{transform:rotate(180deg)}5.08%{transform:rotate(180deg)}6.78%{transform:rotate(180deg)}8.47%{transform:rotate(180deg)}10.17%{transform:rotate(179.2deg)}11.86%{transform:rotate(164deg)}13.56%{transform:rotate(151.8deg)}15.25%{transform:rotate(140.8deg)}16.95%{transform:rotate(130.3deg)}18.64%{transform:rotate(120.4deg)}20.34%{transform:rotate(110.8deg)}22.03%{transform:rotate(101.6deg)}23.73%{transform:rotate(93.5deg)}25.42%{transform:rotate(85.4deg)}27.12%{transform:rotate(78.1deg)}28.81%{transform:rotate(71.2deg)}30.51%{transform:rotate(89.1deg)}32.2%{transform:rotate(105.5deg)}33.9%{transform:rotate(121.3deg)}35.59%{transform:rotate(135.5deg)}37.29%{transform:rotate(148.4deg)}38.98%{transform:rotate(161deg)}40.68%{transform:rotate(173.5deg)}42.37%{transform:rotate(180deg)}44.07%{transform:rotate(180deg)}45.76%{transform:rotate(180deg)}47.46%{transform:rotate(180deg)}49.15%{transform:rotate(180deg)}50.85%{transform:rotate(180deg)}52.54%{transform:rotate(180deg)}54.24%{transform:rotate(180deg)}55.93%{transform:rotate(180deg)}57.63%{transform:rotate(180deg)}59.32%{transform:rotate(180deg)}61.02%{transform:rotate(180deg)}62.71%{transform:rotate(180deg)}64.41%{transform:rotate(180deg)}66.1%{transform:rotate(180deg)}67.8%{transform:rotate(180deg)}69.49%{transform:rotate(180deg)}71.19%{transform:rotate(180deg)}72.88%{transform:rotate(180deg)}74.58%{transform:rotate(180deg)}76.27%{transform:rotate(180deg)}77.97%{transform:rotate(180deg)}79.66%{transform:rotate(180deg)}81.36%{transform:rotate(180deg)}83.05%{transform:rotate(180deg)}84.75%{transform:rotate(180deg)}86.44%{transform:rotate(180deg)}88.14%{transform:rotate(180deg)}89.83%{transform:rotate(180deg)}91.53%{transform:rotate(180deg)}93.22%{transform:rotate(180deg)}94.92%{transform:rotate(180deg)}96.61%{transform:rotate(180deg)}98.31%{transform:rotate(180deg)}to{transform:rotate(180deg)}}@keyframes spectrum-fills-rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}:host{direction:ltr;display:inline-block;height:var(
--spectrum-progresscircle-m-height,var(--spectrum-global-dimension-size-400)
);position:relative;transform:translateZ(0);width:var(
--spectrum-progresscircle-m-width,var(--spectrum-global-dimension-size-400)
)}.track{border-radius:var(
--spectrum-progresscircle-m-width,var(--spectrum-global-dimension-size-400)
);border-style:solid;border-width:var(--spectrum-progresscircle-m-border-size);box-sizing:border-box;height:var(
--spectrum-progresscircle-m-height,var(--spectrum-global-dimension-size-400)
);width:var(
--spectrum-progresscircle-m-width,var(--spectrum-global-dimension-size-400)
)}:host([dir=ltr]) .fills{left:0}:host([dir=rtl]) .fills{right:0}.fills{height:100%;position:absolute;top:0;width:100%}.fill{border-radius:var(
--spectrum-progresscircle-m-width,var(--spectrum-global-dimension-size-400)
);border-style:solid;border-width:var(--spectrum-progresscircle-m-border-size);box-sizing:border-box;height:var(
--spectrum-progresscircle-m-height,var(--spectrum-global-dimension-size-400)
);width:var(
--spectrum-progresscircle-m-width,var(--spectrum-global-dimension-size-400)
)}.fillMask1,.fillMask2{height:100%;overflow:hidden;position:absolute;transform:rotate(180deg);transform-origin:100% center;width:50%}.fillSubMask1,.fillSubMask2{height:100%;overflow:hidden;transform:rotate(-180deg);transform-origin:100% center;width:100%}.fillMask2{transform:rotate(0deg)}:host([size=s]){height:var(
--spectrum-progresscircle-s-height,var(--spectrum-global-dimension-size-200)
);width:var(
--spectrum-progresscircle-s-width,var(--spectrum-global-dimension-size-200)
)}:host([size=s]) .track{border-radius:var(
--spectrum-progresscircle-s-width,var(--spectrum-global-dimension-size-200)
);border-style:solid;border-width:var(--spectrum-progresscircle-s-border-size);height:var(
--spectrum-progresscircle-s-height,var(--spectrum-global-dimension-size-200)
);width:var(
--spectrum-progresscircle-s-width,var(--spectrum-global-dimension-size-200)
)}:host([size=s]) .fill{border-radius:var(
--spectrum-progresscircle-s-width,var(--spectrum-global-dimension-size-200)
);border-style:solid;border-width:var(--spectrum-progresscircle-s-border-size);height:var(
--spectrum-progresscircle-s-height,var(--spectrum-global-dimension-size-200)
);width:var(
--spectrum-progresscircle-s-width,var(--spectrum-global-dimension-size-200)
)}:host([size=l]){height:var(
--spectrum-progresscircle-l-height,var(--spectrum-global-dimension-size-800)
);width:var(
--spectrum-progresscircle-l-width,var(--spectrum-global-dimension-size-800)
)}:host([size=l]) .track{border-radius:var(
--spectrum-progresscircle-l-width,var(--spectrum-global-dimension-size-800)
);border-style:solid;border-width:var(
--spectrum-progresscircle-l-border-size,var(--spectrum-global-dimension-size-50)
);height:var(
--spectrum-progresscircle-l-height,var(--spectrum-global-dimension-size-800)
);width:var(
--spectrum-progresscircle-l-width,var(--spectrum-global-dimension-size-800)
)}:host([size=l]) .fill{border-radius:var(
--spectrum-progresscircle-l-width,var(--spectrum-global-dimension-size-800)
);border-style:solid;border-width:var(
--spectrum-progresscircle-l-border-size,var(--spectrum-global-dimension-size-50)
);height:var(
--spectrum-progresscircle-l-height,var(--spectrum-global-dimension-size-800)
);width:var(
--spectrum-progresscircle-l-width,var(--spectrum-global-dimension-size-800)
)}:host([indeterminate]) .fills{animation:spectrum-fills-rotate 1s cubic-bezier(.25,.78,.48,.89) infinite;transform:translateZ(0);transform-origin:center;will-change:transform}:host([indeterminate]) .fillSubMask1{animation:spectrum-fill-mask-1 1s linear infinite;transform:translateZ(0);will-change:transform}:host([indeterminate]) .fillSubMask2{animation:spectrum-fill-mask-2 1s linear infinite;transform:translateZ(0);will-change:transform}.track{border-color:var(
--spectrum-progresscircle-m-track-color,var(--spectrum-alias-track-color-default)
)}.fill{border-color:var(
--spectrum-progresscircle-m-track-fill-color,var(--spectrum-semantic-informative-color-default)
)}:host([over-background]) .track{border-color:var(
--spectrum-progresscircle-m-over-background-track-color
)}:host([over-background]) .fill{border-color:var(
--spectrum-progresscircle-m-over-background-track-fill-color
)}:host([indeterminate][over-background]) .track{border-color:var(
--spectrum-progresscircle-m-over-background-track-color
)}:host([indeterminate][over-background]) .fill{border-color:var(
--spectrum-progresscircle-m-over-background-track-fill-color
)}@media (forced-colors:active){.fill{--spectrum-progresscircle-m-track-fill-color:Highlight}}:host{--spectrum-progresscircle-m-over-background-track-fill-color:var(
--spectrum-alias-track-fill-color-overbackground
)}
`,Qo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,es=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Jo(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Qo(t,r,a),a};class ts extends(v(s,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.progress=0}static get styles(){return[Zo]}makeRotation(e){return this.indeterminate?void 0:`transform: rotate(${e}deg);`}render(){const e=[this.makeRotation(3.6*Math.min(this.progress,50)-180),this.makeRotation(3.6*Math.max(this.progress-50,0)-180)];return a`
            <div class="track"></div>
            <div class="fills">
                ${["Mask1","Mask2"].map(((t,r)=>a`
                        <div class="fill${t}">
                            <div
                                class="fillSub${t}"
                                style=${g(e[r])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `))}
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(e){super.updated(e),!this.indeterminate&&e.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&e.has("label")&&this.setAttribute("aria-label",this.label)}}es([i({type:Boolean,reflect:!0})],ts.prototype,"indeterminate",2),es([i({type:String})],ts.prototype,"label",2),es([i({type:Boolean,reflect:!0,attribute:"over-background"})],ts.prototype,"overBackground",2),es([i({type:Number})],ts.prototype,"progress",2),customElements.define("sp-progress-circle",ts);var rs=r`
:host{--spectrum-radio-neutral-content-color:var(
--spectrum-neutral-content-color-default
);--spectrum-radio-neutral-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-radio-neutral-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-radio-neutral-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-radio-focus-ring-thickness:var(--spectrum-focus-ring-thickness);--spectrum-radio-focus-ring-gap:var(--spectrum-focus-ring-gap);--spectrum-radio-focus-ring-color:var(--spectrum-focus-ring-color);--spectrum-radio-disabled-content-color:var(
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
--spectrum-CJK-line-height-100
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
);--spectrum-radio-font-size:var(--spectrum-font-size-300)}@media (forced-colors:active){:host{--highcontrast-radio-neutral-content-color:CanvasText;--highcontrast-radio-neutral-content-color-hover:CanvasText;--highcontrast-radio-neutral-content-color-down:CanvasText;--highcontrast-radio-neutral-content-color-focus:CanvasText;--highcontrast-radio-button-border-color-default:ButtonText;--highcontrast-radio-button-border-color-hover:Highlight;--highcontrast-radio-button-border-color-down:ButtonText;--highcontrast-radio-button-border-color-focus:Highlight;--highcontrast-radio-emphasized-accent-color:ButtonText;--highcontrast-radio-emphasized-accent-color-hover:Highlight;--highcontrast-radio-emphasized-accent-color-down:ButtonText;--highcontrast-radio-emphasized-accent-color-focus:Highlight;--highcontrast-radio-button-checked-border-color-default:Highlight;--highcontrast-radio-button-checked-border-color-hover:Highlight;--highcontrast-radio-button-checked-border-color-down:Highlight;--highcontrast-radio-button-checked-border-color-focus:Highlight;--highcontrast-radio-disabled-content-color:GrayText;--highcontrast-radio-disabled-border-color:GrayText;--highcontrast-radio-focus-ring-color:CanvasText}#button:after{forced-color-adjust:none}}:host{align-items:flex-start;display:inline-flex;max-inline-size:100%;min-block-size:var(--mod-radio-height,var(--spectrum-radio-height));position:relative;vertical-align:top}:host(:hover) #button:before{border-color:var(
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
--highcontrast-radio-focus-ring-color,var(
--mod-radio-focus-ring-color,var(--spectrum-radio-focus-ring-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-ring-thickness,var(--spectrum-radio-focus-ring-thickness)
);height:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-ring-gap)*2);width:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-ring-gap)*2)}:host(:focus[checked]) #input+#button:before{border-color:var(
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
);border-width:calc(var(--spectrum-radio-button-control-size)/2 - var(--spectrum-radio-button-selection-indicator)/2)}:host(.focus-visible) #input+#button:after{border-color:var(
--highcontrast-radio-focus-ring-color,var(
--mod-radio-focus-ring-color,var(--spectrum-radio-focus-ring-color)
)
);border-width:var(
--mod-radio-focus-ring-thickness,var(--spectrum-radio-focus-ring-thickness)
)}:host(:focus-visible) #input+#button:after{border-color:var(
--highcontrast-radio-focus-ring-color,var(
--mod-radio-focus-ring-color,var(--spectrum-radio-focus-ring-color)
)
);border-width:var(
--mod-radio-focus-ring-thickness,var(--spectrum-radio-focus-ring-thickness)
)}#label{color:var(
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
`,os=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,as=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ss(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&os(t,r,a),a};class is extends(v(k(s))){constructor(){super(...arguments),this.autofocus=!1,this.value="",this.checked=!1,this.disabled=!1,this.emphasized=!1,this.invalid=!1,this.readonly=!1}static get styles(){return[rs]}click(){this.disabled||this.activate()}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focus())}activate(){this.checked||(this.checked=!0,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleKeyup(e){"Space"===e.code&&this.activate()}render(){return a`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","radio"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAutoFocus(),this.addEventListener("click",this.activate),this.addEventListener("keyup",this.handleKeyup)}updated(e){super.updated(e),e.has("invalid")&&(this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")),e.has("checked")&&(this.checked?this.setAttribute("aria-checked","true"):this.setAttribute("aria-checked","false")),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabeld"))}}as([i({type:Boolean})],is.prototype,"autofocus",2),as([i({type:String,reflect:!0})],is.prototype,"value",2),as([i({type:Boolean,reflect:!0})],is.prototype,"checked",2),as([i({type:Boolean,reflect:!0})],is.prototype,"disabled",2),as([i({type:Boolean,reflect:!0})],is.prototype,"emphasized",2),as([i({type:Boolean,reflect:!0})],is.prototype,"invalid",2),as([i({type:Boolean,reflect:!0})],is.prototype,"readonly",2),customElements.define("sp-radio",is);var ls=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,ns=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?cs(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ls(t,r,a),a};class ds extends(k(co)){constructor(){super(...arguments),this.name="",this.rovingTabindexController=new t(this,{focusInIndex:e=>e.findIndex((e=>this.selected?!e.disabled&&e.value===this.selected:!e.disabled)),elementEnterAction:e=>{this.selected=e.value},elements:()=>this.buttons,isFocusableElement:e=>!e.disabled}),this.selected=""}get buttons(){return this.defaultNodes.filter((e=>e instanceof is))}focus(){this.rovingTabindexController.focus()}_setSelected(e){if(e===this.selected)return;const t=this.selected,r=e?this.querySelector(`sp-radio[value="${e}"]`):void 0;this.selected=r?e:"",this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))?this.validateRadios():this.selected=t}willUpdate(e){if(!this.hasUpdated){this.setAttribute("role","radiogroup");const e=this.querySelector("sp-radio[checked]"),t=e?e.value:"";if(this.selected=t||this.selected,this.selected&&this.selected!==t){const e=this.querySelector(`sp-radio[value="${this.selected}"]`);e?e.checked=!0:this.selected=""}this.shadowRoot.addEventListener("change",(e=>{e.stopPropagation();const t=e.target;this._setSelected(t.value)}))}e.has("selected")&&this.validateRadios()}async validateRadios(){let e=!1;this.hasUpdated||await this.updateComplete,this.buttons.map((t=>{t.checked=this.selected===t.value,e=e||t.checked})),e||(this.selected="")}handleSlotchange(){this.rovingTabindexController.clearElementCache()}}ns([i({type:String})],ds.prototype,"name",2),ns([p("")],ds.prototype,"defaultNodes",2),ns([i({reflect:!0})],ds.prototype,"selected",2),customElements.define("sp-radio-group",ds),customElements.define("sp-sidenav-heading",X);var us=Object.defineProperty,ps=Object.getOwnPropertyDescriptor,hs=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ps(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&us(t,r,a),a};const ms={toNormalized:(e,t,r)=>(e-t)/(r-t),fromNormalized:(e,t,r)=>e*(r-t)+t},bs={fromAttribute:e=>"previous"===e?e:parseFloat(e),toAttribute:e=>e.toString()},gs={fromAttribute:e=>"next"===e?e:parseFloat(e),toAttribute:e=>e.toString()};class vs extends h{constructor(){super(...arguments),this._forcedUnit="",this.value=10,this.dragging=!1,this.highlight=!1,this.name="",this.resolvedLanguage=document.documentElement.lang||navigator.language,this.label="",this.getAriaHandleText=(e,t)=>t.format(e),this.normalization=ms}get handleName(){return this.name}get focusElement(){var e,t;return null!=(t=null==(e=this.handleController)?void 0:e.inputForHandle(this))?t:this}update(e){var t;(e.has("formatOptions")||e.has("resolvedLanguage"))&&delete this._numberFormatCache,e.has("value")&&null!=e.get("value")&&this.updateComplete.then((()=>{var e;null==(e=this.handleController)||e.setValueFromHandle(this)})),null==(t=this.handleController)||t.handleHasChanged(this),super.update(e)}firstUpdated(e){super.firstUpdated(e),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const e=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(e)}getNumberFormat(){var e;if(!this._numberFormatCache||this.resolvedLanguage!==this._numberFormatCache.language){let e;try{e=new Eo(this.resolvedLanguage,this.formatOptions),this._forcedUnit=""}catch(t){const{style:r,unit:o,unitDisplay:s,...a}=this.formatOptions||{};"unit"===r&&(this._forcedUnit=o),e=new Eo(this.resolvedLanguage,a)}this._numberFormatCache={language:this.resolvedLanguage,numberFormat:e}}return null==(e=this._numberFormatCache)?void 0:e.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}connectedCallback(){super.connectedCallback(),this.resolveLanguage()}disconnectedCallback(){this.resolveLanguage(),super.disconnectedCallback()}resolveLanguage(){const e=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:e=>{this.resolvedLanguage=e}},cancelable:!0});this.dispatchEvent(e)}}hs([i({type:Number})],vs.prototype,"value",2),hs([i({type:Boolean,reflect:!0})],vs.prototype,"dragging",2),hs([i({type:Boolean})],vs.prototype,"highlight",2),hs([i({type:String})],vs.prototype,"name",2),hs([i({reflect:!0,converter:bs})],vs.prototype,"min",2),hs([i({reflect:!0,converter:gs})],vs.prototype,"max",2),hs([i({attribute:!1})],vs.prototype,"resolvedLanguage",2),hs([i({type:Number,reflect:!0})],vs.prototype,"step",2),hs([i({type:Object,attribute:"format-options"})],vs.prototype,"formatOptions",2),hs([i({type:String})],vs.prototype,"label",2),hs([i({attribute:!1})],vs.prototype,"getAriaHandleText",2),hs([i({attribute:!1})],vs.prototype,"normalization",2),customElements.define("sp-slider-handle",vs);var fs=r`
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
)}:host([editable][dir=ltr]) sp-number-field{margin-left:var(--spectrum-global-dimension-size-200)}:host([editable][dir=rtl]) sp-number-field{margin-right:var(--spectrum-global-dimension-size-200)}:host([editable]) output{opacity:0}:host([disabled]){pointer-events:none}#track,:host([dragging]){touch-action:none;-webkit-user-select:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:before{background:var(
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
`;class xs{constructor(e){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let e=[...this.host.querySelectorAll('[slot="handle"]')];0===e.length&&(e=[this.host]),!e.some((e=>this.waitForUpgrade(e)))&&(this.handles=new Map,this.handleOrder=[],e.forEach(((e,t)=>{var r;null!=(r=e.handleName)&&r.length||(e.name=`handle${t+1}`),this.handles.set(e.handleName,e),this.handleOrder.push(e.handleName),e.handleController=this})),this.requestUpdate())},this.onInputChange=e=>{const t=e.target;t.model.handle.value=t.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(t,t.model.handle)},this.onInputFocus=e=>{const t=e.target;let r;try{r=t.matches(":focus-visible")||this.host.matches(".focus-visible")}catch(e){r=this.host.matches(".focus-visible")}t.model.handle.highlight=r,this.requestUpdate()},this.onInputBlur=e=>{e.target.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=e=>{e.target.model.handle.highlight=!0,this.requestUpdate()},this.host=e,new m(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom()}}),this.extractModelFromLightDom()}get values(){const e={};for(const t of this.handles.values())e[t.handleName]=t.value;return e}get size(){return this.handles.size}inputForHandle(e){if(this.handles.has(e.handleName)){const{input:t}=this.getHandleElements(e);return t}throw new Error(`No input for handle "${e.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate()}setValueFromHandle(e){const t=this.getHandleElements(e);if(!t)return;const{input:r}=t;r.valueAsNumber===e.value?e.dragging&&e.dispatchInputEvent():(r.valueAsNumber=e.value,this.requestUpdate()),e.value=r.valueAsNumber}handleHasChanged(e){e!==this.host&&this.requestUpdate()}formattedValueForHandle(e){var t;const{handle:r}=e,o=null!=(t=r.numberFormat)?t:this.host.numberFormat;return r.getAriaHandleText(e.value,o)}get formattedValues(){const e=new Map;for(const t of this.model)e.set(t.name,this.formattedValueForHandle(t));return e}get focusElement(){const{input:e}=this.getActiveHandleElements();return this.host.editable&&!e.model.handle.dragging?this.host.numberField:e}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(e){return!(e instanceof vs)&&(e.addEventListener("sp-slider-handle-ready",(()=>this.extractModelFromLightDom()),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const e=this.activeHandle;return`input-${this.model.findIndex((t=>t.name===e))}`}activateHandle(e){const t=this.handleOrder.findIndex((t=>t===e));t>=0&&this.handleOrder.splice(t,1),this.handleOrder.push(e)}getActiveHandleElements(){const e=this.activeHandle,t=this.handles.get(e);return{model:t,...this.getHandleElements(t)}}getHandleElements(e){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const e=this.host.shadowRoot.querySelectorAll(".handle > input");for(const t of e){const e=t,r=e.parentElement,o=this.handles.get(r.getAttribute("name"));o&&this.handleRefMap.set(o,{input:e,handle:r})}}return this.handleRefMap.get(e)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(e){if(!this._activePointerEventData){let t=e.target.querySelector(":scope > .input");const r=!t,o=t?t.model:this.model.find((e=>e.name===this.activeHandle));!t&&!!o&&(t=o.handle.focusElement),this._activePointerEventData={input:t,model:o,resolvedInput:r}}return this._activePointerEventData}handlePointerdown(e){const{resolvedInput:t,model:r}=this.extractDataFromEvent(e);r&&!this.host.disabled&&0===e.button?(this.host.track.setPointerCapture(e.pointerId),this.updateBoundingRect(),this.host.labelEl.click(),this.draggingHandle=r.handle,r.handle.dragging=!0,this.activateHandle(r.name),t&&this.handlePointermove(e),this.requestUpdate()):e.preventDefault()}handlePointerup(e){const{input:t,model:r}=this.extractDataFromEvent(e);delete this._activePointerEventData,r&&(this.host.labelEl.click(),this.cancelDrag(r),this.requestUpdate(),this.host.track.releasePointerCapture(e.pointerId),this.dispatchChangeEvent(t,r.handle))}handlePointermove(e){const{input:t,model:r}=this.extractDataFromEvent(e);!r||!this.draggingHandle||(e.stopPropagation(),t.value=this.calculateHandlePosition(e,r).toString(),r.handle.value=parseFloat(t.value),this.host.indeterminate=!1,this.requestUpdate())}cancelDrag(e){(e=e||this.model.find((e=>e.name===this.activeHandle)))&&(e.handle.highlight=!1,delete this.draggingHandle,e.handle.dragging=!1)}dispatchChangeEvent(e,t){e.valueAsNumber=t.value;const r=new Event("change",{bubbles:!0,composed:!0});t.dispatchEvent(r)}calculateHandlePosition(e,t){const r=this.boundingClientRect,o=r.left,s=e.clientX,a=r.width,i=(this.host.isLTR?s-o:a-(s-o))/a;return t.normalization.fromNormalized(i,t.range.min,t.range.max)}renderHandle(e,t,r,o){var s;const i={handle:!0,dragging:(null==(s=this.draggingHandle)?void 0:s.handleName)===e.name,"handle-highlight":e.highlight},l={[this.host.isLTR?"left":"right"]:100*e.normalizedValue+"%","z-index":r.toString(),"background-color":`var(--spectrum-slider-handle-background-color-${t}, var(--spectrum-slider-handle-default-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${t}, var(-spectrum-slider-handle-default-border-color))`},c=o?`label input-${t}`:"label";return a`
            <div
                class=${C(i)}
                name=${e.name}
                style=${Z(l)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${t}"
                    min=${e.clamp.min}
                    max=${e.clamp.max}
                    step=${e.step}
                    value=${e.value}
                    aria-disabled=${g(this.host.disabled?"true":void 0)}
                    tabindex=${g(this.host.editable?-1:void 0)}
                    aria-label=${g(e.ariaLabel)}
                    aria-labelledby=${c}
                    aria-valuetext=${this.formattedValueForHandle(e)}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${e}
                />
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map(((e,t)=>{const r=this.handleOrder.indexOf(e.name)+1;return this.renderHandle(e,t,r,this.model.length>1)}))}trackSegments(){const e=this.model.map((e=>e.normalizedValue));return e.sort(((e,t)=>e-t)),e.unshift(0),e.map(((e,t,r)=>{var o;return[e,null!=(o=r[t+1])?o:1]}))}updateModel(){const e=[...this.handles.values()],t=t=>{const r=e[t],o=e[t-1],s=e[t+1],a="number"==typeof r.min?r.min:this.host.min,i="number"==typeof r.max?r.max:this.host.max,l={range:{min:a,max:i},clamp:{min:a,max:i}};if("previous"===r.min&&o){for(let r=t-1;r>=0;r--){const t=e[r];if("number"==typeof t.min){l.range.min=t.min;break}}l.clamp.min=Math.max(o.value,l.range.min)}if("next"===r.max&&s){for(let r=t+1;r<e.length;r++){const t=e[r];if("number"==typeof t.max){l.range.max=t.max;break}}l.clamp.max=Math.min(s.value,l.range.max)}return l},r=e.map(((e,r)=>{var o;const s=t(r),{toNormalized:a}=e.normalization,i=Math.max(Math.min(e.value,s.clamp.max),s.clamp.min),l=a(i,s.range.min,s.range.max);return{name:e.handleName,value:i,normalizedValue:l,highlight:e.highlight,step:null!=(o=e.step)?o:this.host.step,normalization:e.normalization,handle:e,ariaLabel:e!==this.host&&(null==e?void 0:e.label.length)>0?e.label:void 0,...s}}));this.model=r}async handleUpdatesComplete(){const e=[...this.handles.values()].filter((e=>e!==this.host)).map((e=>e.updateComplete));await Promise.all(e)}}var ys=Object.defineProperty,ks=Object.getOwnPropertyDescriptor,ws=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ks(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ys(t,r,a),a};const zs=["filled","ramp","range","tick"];class Ts extends(b(vs,"")){constructor(){super(...arguments),this.handleController=new xs(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=e=>{const t=[...e.values()];return 2===t.length?`${t[0]}${this._forcedUnit} - ${t[1]}${this._forcedUnit}`:t.join(`${this._forcedUnit}, `)+this._forcedUnit},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this.quiet=!1,this.indeterminate=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[fs]}get editable(){return this._editable}set editable(e){if(e===this.editable)return;const t=this.editable;this._editable=this.handleController.size<2&&e,this.editable&&(this._numberFieldInput=Promise.resolve().then((function(){return Vo}))),t!==this.editable&&this.requestUpdate("editable",t)}set variant(e){const t=this.variant;e!==this.variant&&(zs.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",t))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(e){this.editable&&(e.preventDefault(),this.focus())}render(){return a`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?a`
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
                  `:a``}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(e){this.handleController.hostUpdate(),e.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(e)}renderLabel(){const e="none"===this.labelVisibility||"value"===this.labelVisibility,t="none"===this.labelVisibility||"text"===this.labelVisibility;return a`
            <div id="label-container">
                <sp-field-label
                    class=${C({"visually-hidden":e})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                >
                    ${this.slotHasContent?a``:this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <output
                    class=${C({"visually-hidden":t})}
                    id="value"
                    aria-live="off"
                    for="input"
                >
                    ${this.ariaValueText}
                </output>
            </div>
        `}renderRamp(){return"ramp"!==this.variant?a``:a`
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
        `}renderTicks(){if("tick"!==this.variant)return a``;const e=this.tickStep||this.step,t=(this.max-this.min)/e,r=t%1!=0,o=new Array(Math.floor(t+1));return o.fill(0,0,t+1),a`
            <div
                class="${r?"not-exact ":""}ticks"
                style=${g(r?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${o.map(((t,r)=>a`
                        <div class="tick">
                            ${this.tickLabels?a`
                                      <div class="tickLabel">
                                          ${r*e+this.min}
                                      </div>
                                  `:a``}
                        </div>
                    `))}
            </div>
        `}renderTrackSegment(e,t){return"ramp"===this.variant?a``:a`
            <div
                class="track"
                style=${Z(this.trackSegmentStyles(e,t))}
                role="presentation"
            ></div>
        `}renderTrack(){const e=this.handleController.trackSegments(),t=[{id:"track0",html:this.renderTrackSegment(...e[0])},{id:"ramp",html:this.renderRamp()},{id:"ticks",html:this.renderTicks()},{id:"handles",html:this.handleController.render()},...e.slice(1).map((([e,t],r)=>({id:`track${r+1}`,html:this.renderTrackSegment(e,t)})))];return a`
            <div
                id="track"
                ${Rt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}
            >
                <div id="controls">
                    ${Y(t,(e=>e.id),(e=>e.html))}
                </div>
            </div>
        `}handlePointerdown(e){this.handleController.handlePointerdown(e)}handlePointermove(e){this.handleController.handlePointermove(e)}handlePointerup(e){this.handleController.handlePointerup(e)}handleNumberInput(e){var t;const{value:r}=e.target;!(null==(t=e.target)?void 0:t.managedInput)||isNaN(r)?e.stopPropagation():this.value=r}handleNumberChange(e){var t;const{value:r}=e.target;isNaN(r)?(e.target.value=this.value,e.stopPropagation()):(this.value=r,null!=(t=e.target)&&t.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(e,t){const r=t-e;return{width:100*r+"%","--spectrum-slider-track-background-size":1/r*100+"%","--spectrum-slider-track-segment-position":100*e+"%"}}async getUpdateComplete(){const e=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),e}}ws([i({type:Boolean,reflect:!0})],Ts.prototype,"editable",1),ws([i({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Ts.prototype,"hideStepper",2),ws([i()],Ts.prototype,"type",2),ws([i({type:String})],Ts.prototype,"variant",1),ws([i({attribute:!1})],Ts.prototype,"getAriaValueText",2),ws([i({type:String,reflect:!0,attribute:"label-visibility"})],Ts.prototype,"labelVisibility",2),ws([i({type:Number,reflect:!0})],Ts.prototype,"min",2),ws([i({type:Number,reflect:!0})],Ts.prototype,"max",2),ws([i({type:Number})],Ts.prototype,"step",2),ws([i({type:Number,attribute:"tick-step"})],Ts.prototype,"tickStep",2),ws([i({type:Boolean,attribute:"tick-labels"})],Ts.prototype,"tickLabels",2),ws([i({type:Boolean,reflect:!0})],Ts.prototype,"disabled",2),ws([i({type:Boolean})],Ts.prototype,"quiet",2),ws([i({type:Boolean})],Ts.prototype,"indeterminate",2),ws([f("#label")],Ts.prototype,"labelEl",2),ws([f("#number-field")],Ts.prototype,"numberField",2),ws([f("#track")],Ts.prototype,"track",2),customElements.define("sp-slider",Ts);var Cs=r`
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
`,_s=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,Es=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ss(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&_s(t,r,a),a};const qs={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class As extends(v(T)){constructor(){super(...arguments),this.left=!1,this.variant="accent",this.type="field",this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[Cs,z]}get target(){return this}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}sizePopover(e){e.style.setProperty("min-width",`${this.offsetWidth}px`)}passClick(){const e="more"===this.type?this.menuItems[0]:this.selectedItem||this.menuItems[0];e&&e.click()}get buttonContent(){var e;return[a`
                <div
                    id="label"
                    role="presentation"
                    class=${g(this.value?void 0:"placeholder")}
                >
                    ${(null==(e=this.selectedItem)?void 0:e.itemText)||""}
                </div>
            `]}update(e){e.has("type")&&("more"===this.type?this.selects=void 0:this.selects="single"),e.has("value")&&this.manageSplitButtonItems(),super.update(e)}render(){const e=["cta","accent"].includes(this.variant)?"fill":"outline",t=[a`
                <sp-button
                    aria-label=${g(this.label||void 0)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                    treatment=${e}
                    size=${this.size}
                >
                    ${this.buttonContent}
                </sp-button>
            `,a`
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
                    treatment=${e}
                    size=${this.size}
                >
                    ${"field"===this.type?a`
                              <sp-icon-chevron100
                                  class="icon ${qs[this.size]}"
                              ></sp-icon-chevron100>
                          `:a`
                              <sp-icon-more class="icon"></sp-icon-more>
                          `}
                </sp-button>
            `];return this.left&&t.reverse(),a`
            ${t}
        `}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection()}async manageSplitButtonItems(){!this.menuItems.length&&(await this.updateComplete,!this.menuItems.length)||("more"===this.type?(this.menuItems[0].hidden=!0,this.menuItems.forEach((e=>e.selected=!1)),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value)}}Es([i({type:Boolean,reflect:!0})],As.prototype,"left",2),Es([i({reflect:!0})],As.prototype,"variant",2),Es([i({type:String})],As.prototype,"type",2),Es([f(".trigger")],As.prototype,"trigger",2),customElements.define("sp-split-button",As);var Is=r`
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
)}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#splitter{height:auto;order:2}:host([resizable]) #splitter{background-clip:content-box;cursor:ew-resize;margin:0 calc(var(--spectrum-global-dimension-static-size-125)*-1);padding:0 var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter{background-clip:content-box;cursor:ns-resize;margin:calc(var(--spectrum-global-dimension-static-size-125)*-1) 0;padding:var(--spectrum-global-dimension-static-size-125) 0}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-end,:host([resizable][collapsible]) #splitter.is-resized-start{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-end,:host([vertical][resizable][collapsible]) #splitter.is-resized-start{cursor:ns-resize}:host([dir=ltr][resizable]) #gripper{left:calc(var(--spectrum-global-dimension-static-size-125) + (var(
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
`,Ls=Object.defineProperty,$s=Object.getOwnPropertyDescriptor,Ps=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?$s(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ls(t,r,a),a};class Bs extends s{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=3840,this.secondaryMin=0,this.secondaryMax=3840,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=3840;const e=window.ResizeObserver;e&&(this.observer=new e((()=>{this.rect=void 0,this.updateMinMax()})))}static get styles(){return[Is]}connectedCallback(){var e;super.connectedCallback(),null==(e=this.observer)||e.observe(this)}disconnectedCallback(){var e;null==(e=this.observer)||e.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){const e={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)};return a`
            <slot
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?a`
                      <div
                          id="splitter"
                          class=${C(e)}
                          role="separator"
                          aria-label=${g(this.label||void 0)}
                          tabindex=${g(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${Rt({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?a`
                                    <div id="gripper"></div>
                                `:a``}
                      </div>
                  `:l}
        `}onContentSlotChange(){this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(e){!this.resizable||e.button&&0!==e.button?e.preventDefault():(this.splitter.setPointerCapture(e.pointerId),this.offset=this.getOffset())}onPointermove(e){e.preventDefault();let t=this.vertical||this.isLTR?this.getPosition(e)-this.offset:this.offset-this.getPosition(e);this.collapsible&&t<this.minPos-50&&(t=0),this.collapsible&&t>this.maxPos+50&&(t=this.viewSize-this.splitterSize),this.updatePosition(t)}onPointerup(e){this.splitter.releasePointerCapture(e.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const e=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:e}getPosition(e){return this.vertical?e.clientY:e.clientX}movePosition(e,t){e.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+t)}onKeydown(e){if(!this.resizable)return;let t=0;const r=this.isLTR||this.vertical;switch(e.key){case"Home":return e.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return e.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":t=r?-1:1;break;case"ArrowRight":t=r?1:-1;break;case"ArrowUp":t=this.vertical?-1:1;break;case"ArrowDown":t=this.vertical?1:-1;break;case"PageUp":t=this.vertical?-1:1;break;case"PageDown":t=this.vertical?1:-1}if(0!==t){const r=e.key.startsWith("Page")?50:10;this.movePosition(e,r*t)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const e=await this.calcStartPos();this.updatePosition(e)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(e){let t=this.getLimitedPosition(e);this.collapsible&&e<=0&&(t=0),this.collapsible&&e>this.maxPos&&e>=this.viewSize-this.splitterSize&&(t=this.viewSize-this.splitterSize),t!==this.splitterPos&&(this.splitterPos=t,this.dispatchChangeEvent())}getLimitedPosition(e){return e<=this.minPos?this.minPos:e>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,e))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const e=this.paneSlot.assignedNodes({flatten:!0}).find((e=>e instanceof HTMLElement));if(void 0!==e.updateComplete&&await e.updateComplete,e){const t=window.getComputedStyle(e).getPropertyValue(this.vertical?"height":"width"),r=parseFloat(t);if(!isNaN(r))return this.getLimitedPosition(Math.ceil(r))}}return this.viewSize/2}dispatchChangeEvent(){const e=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(e)}willUpdate(e){(!this.hasUpdated||e.has("primarySize"))&&(this.splitterPos=void 0,this.checkResize()),e.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}Ps([i({type:Boolean,reflect:!0})],Bs.prototype,"vertical",2),Ps([i({type:Boolean,reflect:!0})],Bs.prototype,"resizable",2),Ps([i({type:Boolean,reflect:!0})],Bs.prototype,"collapsible",2),Ps([i({type:Number,attribute:"primary-min"})],Bs.prototype,"primaryMin",2),Ps([i({type:Number,attribute:"primary-max"})],Bs.prototype,"primaryMax",2),Ps([i({type:String,attribute:"primary-size"})],Bs.prototype,"primarySize",2),Ps([i({type:Number,attribute:"secondary-min"})],Bs.prototype,"secondaryMin",2),Ps([i({type:Number,attribute:"secondary-max"})],Bs.prototype,"secondaryMax",2),Ps([i({type:Number,reflect:!0,attribute:"splitter-pos"})],Bs.prototype,"splitterPos",2),Ps([i({type:String,attribute:!1})],Bs.prototype,"firstPaneSize",2),Ps([i()],Bs.prototype,"label",2),Ps([i({type:Boolean,attribute:!1})],Bs.prototype,"enoughChildren",2),Ps([i({type:Number})],Bs.prototype,"viewSize",2),Ps([f("slot")],Bs.prototype,"paneSlot",2),Ps([f("#splitter")],Bs.prototype,"splitter",2),customElements.define("sp-split-view",Bs);var Os=r`
:host([size=s]){--spectrum-statuslight-info-text-padding-bottom:var(
--spectrum-statuslight-s-info-text-padding-bottom
);--spectrum-statuslight-info-dot-border-radius:var(
--spectrum-statuslight-s-info-dot-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-statuslight-info-dot-margin-top:var(
--spectrum-statuslight-s-info-dot-margin-top,var(--spectrum-global-dimension-size-100)
);--spectrum-statuslight-info-dot-size:var(
--spectrum-statuslight-s-info-dot-size,var(--spectrum-global-dimension-static-size-100)
);--spectrum-statuslight-info-text-gap:var(
--spectrum-statuslight-s-info-text-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-statuslight-info-text-size:var(
--spectrum-statuslight-s-info-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-statuslight-info-text-padding-top:var(
--spectrum-statuslight-s-info-text-padding-top,var(--spectrum-global-dimension-static-size-50)
);--spectrum-statuslight-info-text-font-weight:var(
--spectrum-statuslight-s-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-statuslight-info-text-line-height:var(
--spectrum-statuslight-s-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-statuslight-info-height:var(
--spectrum-statuslight-s-info-height,var(--spectrum-global-dimension-size-300)
)}:host([size=m]){--spectrum-statuslight-info-dot-border-radius:var(
--spectrum-statuslight-m-info-dot-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-statuslight-info-dot-margin-top:var(
--spectrum-statuslight-m-info-dot-margin-top,var(--spectrum-global-dimension-size-130)
);--spectrum-statuslight-info-dot-size:var(
--spectrum-statuslight-m-info-dot-size,var(--spectrum-global-dimension-size-100)
);--spectrum-statuslight-info-text-gap:var(
--spectrum-statuslight-m-info-text-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-statuslight-info-text-size:var(
--spectrum-statuslight-m-info-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-statuslight-info-text-padding-top:var(
--spectrum-statuslight-m-info-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-statuslight-info-text-padding-bottom:var(
--spectrum-statuslight-m-info-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-statuslight-info-text-font-weight:var(
--spectrum-statuslight-m-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-statuslight-info-text-line-height:var(
--spectrum-statuslight-m-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-statuslight-info-height:var(
--spectrum-statuslight-m-info-height,var(--spectrum-global-dimension-size-400)
)}:host([size=l]){--spectrum-statuslight-info-dot-size:var(
--spectrum-statuslight-l-info-dot-size
);--spectrum-statuslight-info-text-padding-top:var(
--spectrum-statuslight-l-info-text-padding-top
);--spectrum-statuslight-info-dot-border-radius:var(
--spectrum-statuslight-l-info-dot-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-statuslight-info-dot-margin-top:var(
--spectrum-statuslight-l-info-dot-margin-top,var(--spectrum-global-dimension-size-185)
);--spectrum-statuslight-info-text-gap:var(
--spectrum-statuslight-l-info-text-gap,var(--spectrum-global-dimension-size-130)
);--spectrum-statuslight-info-text-size:var(
--spectrum-statuslight-l-info-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-statuslight-info-text-padding-bottom:var(
--spectrum-statuslight-l-info-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-statuslight-info-text-font-weight:var(
--spectrum-statuslight-l-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-statuslight-info-text-line-height:var(
--spectrum-statuslight-l-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-statuslight-info-height:var(
--spectrum-statuslight-l-info-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-statuslight-info-dot-size:var(
--spectrum-statuslight-xl-info-dot-size
);--spectrum-statuslight-info-dot-border-radius:var(
--spectrum-statuslight-xl-info-dot-border-radius,var(--spectrum-global-dimension-static-percent-50)
);--spectrum-statuslight-info-dot-margin-top:var(
--spectrum-statuslight-xl-info-dot-margin-top,var(--spectrum-global-dimension-size-250)
);--spectrum-statuslight-info-text-gap:var(
--spectrum-statuslight-xl-info-text-gap,var(--spectrum-global-dimension-size-160)
);--spectrum-statuslight-info-text-size:var(
--spectrum-statuslight-xl-info-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-statuslight-info-text-padding-top:var(
--spectrum-statuslight-xl-info-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-statuslight-info-text-padding-bottom:var(
--spectrum-statuslight-xl-info-text-padding-bottom,var(--spectrum-global-dimension-size-175)
);--spectrum-statuslight-info-text-font-weight:var(
--spectrum-statuslight-xl-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-statuslight-info-text-line-height:var(
--spectrum-statuslight-xl-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-statuslight-info-height:var(
--spectrum-statuslight-xl-info-height,var(--spectrum-global-dimension-size-600)
)}:host([dir]){--spectrum-statuslight-info-dot-resolved-margin-top:calc(var(--spectrum-statuslight-info-dot-margin-top) - var(--spectrum-statuslight-info-text-padding-top));align-items:flex-start;box-sizing:border-box;display:flex;flex-direction:row;font-size:var(--spectrum-statuslight-info-text-size);font-weight:var(--spectrum-statuslight-info-text-font-weight);line-height:var(--spectrum-statuslight-info-text-line-height);min-height:var(--spectrum-statuslight-info-height);padding-bottom:var(--spectrum-statuslight-info-text-padding-bottom);padding-left:0;padding-right:0;padding-top:var(--spectrum-statuslight-info-text-padding-top)}:host([dir=ltr]):before{margin-left:var(
--spectrum-global-dimension-size-0
);margin-right:var(--spectrum-statuslight-info-text-gap)}:host([dir=rtl]):before{margin-left:var(--spectrum-statuslight-info-text-gap);margin-right:var(
--spectrum-global-dimension-size-0
)}:host:before{-ms-high-contrast-adjust:none;border-radius:var(--spectrum-statuslight-info-dot-border-radius);content:"";display:inline-block;flex-grow:0;flex-shrink:0;forced-color-adjust:none;height:var(--spectrum-statuslight-info-dot-size);margin-bottom:var(--spectrum-global-dimension-size-0);margin-top:var(--spectrum-statuslight-info-dot-resolved-margin-top);width:var(--spectrum-statuslight-info-dot-size)}:host([variant=neutral]){font-style:italic}:host([dir]){color:var(
--spectrum-statuslight-m-info-text-color,var(--spectrum-alias-text-color)
)}:host([disabled]),:host([disabled]){color:var(
--spectrum-statuslight-m-info-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]):before,:host([disabled]):before{background-color:var(
--spectrum-statuslight-m-info-dot-color-disabled,var(--spectrum-global-color-gray-400)
)}:host([variant=negative]):before{background-color:var(
--spectrum-statuslight-m-negative-dot-color,var(--spectrum-semantic-negative-status-color)
)}:host([variant=notice]):before{background-color:var(
--spectrum-statuslight-m-notice-dot-color,var(--spectrum-semantic-notice-status-color)
)}:host([variant=positive]):before{background-color:var(
--spectrum-statuslight-m-positive-dot-color,var(--spectrum-semantic-positive-status-color)
)}:host([active]):before,:host([variant=info]):before{background-color:var(
--spectrum-statuslight-m-info-dot-color,var(--spectrum-semantic-informative-status-color)
)}:host([variant=neutral]){color:var(
--spectrum-statuslight-m-neutral-text-color,var(--spectrum-alias-label-text-color)
)}:host([variant=neutral]):before{background-color:var(
--spectrum-statuslight-m-neutral-dot-color,var(--spectrum-global-color-gray-500)
)}:host([variant=celery]):before{background-color:var(
--spectrum-statuslight-m-celery-dot-color,var(--spectrum-global-color-celery-400)
)}:host([variant=yellow]):before{background-color:var(
--spectrum-statuslight-m-yellow-dot-color,var(--spectrum-global-color-yellow-400)
)}:host([variant=fuchsia]):before{background-color:var(
--spectrum-statuslight-m-fuchsia-dot-color,var(--spectrum-global-color-fuchsia-400)
)}:host([variant=indigo]):before{background-color:var(
--spectrum-statuslight-m-indigo-dot-color,var(--spectrum-global-color-indigo-400)
)}:host([variant=seafoam]):before{background-color:var(
--spectrum-statuslight-m-seafoam-dot-color,var(--spectrum-global-color-seafoam-400)
)}:host([variant=chartreuse]):before{background-color:var(
--spectrum-statuslight-m-chartreuse-dot-color,var(--spectrum-global-color-chartreuse-400)
)}:host([variant=magenta]):before{background-color:var(
--spectrum-statuslight-m-magenta-dot-color,var(--spectrum-global-color-magenta-400)
)}:host([variant=purple]):before{background-color:var(
--spectrum-statuslight-m-purple-dot-color,var(--spectrum-global-color-purple-400)
)}@media (forced-colors:active){:host([dir]){--spectrum-statuslight-m-info-text-color:CanvasText;--spectrum-statuslight-m-neutral-text-color:CanvasText;--spectrum-statuslight-m-info-text-color-disabled:GrayText;--spectrum-statuslight-m-info-dot-color-disabled:GrayText;forced-color-adjust:none}:host:before{border:1px solid ButtonText}}:host([disabled]):before{background-color:var(
--spectrum-statuslight-dot-color-disabled,var(--spectrum-global-color-gray-400)
)}
`,Ms=Object.defineProperty,Ds=Object.getOwnPropertyDescriptor,Hs=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ds(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ms(t,r,a),a};class Us extends(v(s)){constructor(){super(...arguments),this.disabled=!1,this.variant="info"}static get styles(){return[Os]}render(){return a`
            <slot></slot>
        `}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Hs([i({type:Boolean,reflect:!0})],Us.prototype,"disabled",2),Hs([i({reflect:!0})],Us.prototype,"variant",2),customElements.define("sp-status-light",Us);var js=r`
:host{--spectrum-swatch-size-xs:var(
--spectrum-global-dimension-size-200
);--spectrum-swatch-size-s:var(--spectrum-global-dimension-size-300);--spectrum-swatch-size-m:var(--spectrum-global-dimension-size-400);--spectrum-swatch-size-l:var(--spectrum-global-dimension-size-500);--spectrum-swatch-disabled-icon-size-xs:var(
--spectrum-global-dimension-size-150
);--spectrum-swatch-disabled-icon-size-s:var(
--spectrum-global-dimension-size-200
);--spectrum-swatch-disabled-icon-size-m:var(
--spectrum-global-dimension-size-225
);--spectrum-swatch-disabled-icon-size-l:var(
--spectrum-global-dimension-size-250
);--spectrum-swatch-disabled-icon-color:var(
--spectrum-global-color-static-gray-50,rgb(var(--spectrum-global-color-static-gray-50-rgb))
);--spectrum-swatch-disabled-icon-stroke-color:rgba(var(--spectrum-global-color-static-black-rgb,0,0,0),0.51);--spectrum-swatch-selection-padding:var(
--spectrum-global-dimension-size-100
);--spectrum-swatch-selection-indicator-border-width:var(
--spectrum-global-dimension-size-25
);--spectrum-swatch-selection-indicator-border-color:var(
--spectrum-global-color-gray-900
);--spectrum-swatch-background-color-selected:var(
--spectrum-global-color-gray-50
);--spectrum-swatch-border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
);--spectrum-swatch-fill-border-radius-selected:var(
--spectrum-alias-border-radius-small,var(--spectrum-global-dimension-size-25)
);--spectrum-swatch-fill-border-width:var(
--spectrum-alias-border-size-thin,var(--spectrum-global-dimension-static-size-10)
);--spectrum-swatch-fill-border-color:rgba(var(--spectrum-global-color-gray-900-rgb),0.51);--spectrum-swatch-fill-border-color-light:rgba(var(--spectrum-global-color-gray-900-rgb),0.2);--spectrum-swatch-background-offset:0px;--spectrum-swatch-checkerboard-size:var(
--spectrum-global-dimension-static-size-100,8px
);align-items:center;display:flex;justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none}:host,:host:before{border-radius:var(
--spectrum-swatch-border-radius
)}:host([selected]){--spectrum-swatch-background-offset:-4px;background-color:var(
--spectrum-swatch-background-color-selected
)}:host([selected]) .fill{border-radius:var(--spectrum-swatch-fill-border-radius-selected);height:calc(100% - var(--spectrum-swatch-selection-padding));width:calc(100% - var(--spectrum-swatch-selection-padding))}:host([selected]) .fill:before{border-radius:var(
--spectrum-swatch-fill-border-radius-selected
);box-shadow:none}:host([selected]):before{opacity:1}:host([mixed-value]) .fill{background:var(
--spectrum-swatch-background-color-selected
)}:host([mixed-value]) .mixedValueIcon{visibility:visible}:host([nothing]) .fill{background:var(
--spectrum-swatch-background-color-selected
)}:host([nothing]) .fill:after{background:var(--spectrum-global-color-red-500);content:"";position:absolute;transform:rotate(-45deg);width:200%}:host([nothing][shape=rectangle]) .fill:after{transform:rotate(-25deg)}:host([nothing][size=xs]) .fill:after{height:2px}:host([nothing][size=s]) .fill:after{height:3px}:host([nothing][size=m]) .fill:after{height:4px}:host([nothing][size=l]) .fill:after{height:5px}:host([disabled]) .disabledIcon,:host([disabled]) .disabledIcon{visibility:visible}:host(.focus-visible):after{opacity:1}:host(:focus-visible):after{opacity:1}:host:before{border:var(--spectrum-swatch-selection-indicator-border-width) solid var(--spectrum-swatch-selection-indicator-border-color);bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0}:host:after{border:var(--spectrum-global-dimension-static-size-25,2px) solid var(
--spectrum-alias-focus-ring-color,var(--spectrum-alias-focus-color)
);border-radius:var(--spectrum-alias-focus-ring-border-radius-regular);bottom:calc(var(--spectrum-global-dimension-size-50)*-1);content:"";left:calc(var(--spectrum-global-dimension-size-50)*-1);opacity:0;position:absolute;right:calc(var(--spectrum-global-dimension-size-50)*-1);top:calc(var(--spectrum-global-dimension-size-50)*-1);transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.fill{align-items:center;background-color:var(
--spectrum-colorcontrol-checkerboard-light-color,var(--spectrum-global-color-static-white)
);background-image:linear-gradient(-45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(45deg,transparent 75.5%,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 75.5%),linear-gradient(-45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%),linear-gradient(45deg,var(
--spectrum-colorcontrol-checkerboard-dark-color,var(--spectrum-global-color-static-gray-300)
) 25.5%,transparent 25.5%);background-position:var(--spectrum-swatch-background-offset) var(--spectrum-swatch-background-offset),var(--spectrum-swatch-background-offset) calc(var(--spectrum-swatch-checkerboard-size) + var(--spectrum-swatch-background-offset)),calc(var(--spectrum-swatch-checkerboard-size) + var(--spectrum-swatch-background-offset)) calc(var(--spectrum-swatch-checkerboard-size)*-1 + var(--spectrum-swatch-background-offset)),calc(var(--spectrum-swatch-checkerboard-size)*-1 + var(--spectrum-swatch-background-offset)) var(--spectrum-swatch-background-offset);background-size:calc(var(--spectrum-swatch-checkerboard-size)*2) calc(var(--spectrum-swatch-checkerboard-size)*2);border-radius:var(--spectrum-swatch-border-radius);box-sizing:border-box;display:flex;height:100%;justify-content:center;overflow:hidden;position:relative;width:100%}.fill:before{background-color:var(--spectrum-picked-color,transparent);border-radius:var(--spectrum-swatch-border-radius);bottom:0;box-shadow:inset 0 0 0 var(--spectrum-swatch-fill-border-width) var(--spectrum-swatch-fill-border-color);content:"";left:0;position:absolute;right:0;top:0;z-index:0}:host([border=light]) .fill:before{box-shadow:inset 0 0 0 var(--spectrum-swatch-fill-border-width) var(--spectrum-swatch-fill-border-color-light)}:host([border=none]) .fill:before{box-shadow:none}.mixedValueIcon{color:var(
--spectrum-global-color-gray-700
)}.disabledIcon,.mixedValueIcon{pointer-events:none;visibility:hidden}.disabledIcon{stroke:var(--spectrum-swatch-disabled-icon-stroke-color);color:var(--spectrum-swatch-disabled-icon-color);position:relative;z-index:2}:host([size=xs]){height:var(--spectrum-swatch-size-xs);width:var(--spectrum-swatch-size-xs)}:host([size=xs]) .disabledIcon{height:var(--spectrum-swatch-disabled-icon-size-xs);width:var(
--spectrum-swatch-disabled-icon-size-xs
)}:host([size=s]){height:var(--spectrum-swatch-size-s);width:var(--spectrum-swatch-size-s)}:host([size=s]) .disabledIcon{height:var(--spectrum-swatch-disabled-icon-size-s);width:var(
--spectrum-swatch-disabled-icon-size-s
)}:host([size=m]){height:var(--spectrum-swatch-size-m);width:var(--spectrum-swatch-size-m)}:host([size=m]) .disabledIcon{height:var(--spectrum-swatch-disabled-icon-size-m);width:var(
--spectrum-swatch-disabled-icon-size-m
)}:host([size=l]){height:var(--spectrum-swatch-size-l);width:var(--spectrum-swatch-size-l)}:host([size=l]) .disabledIcon{height:var(--spectrum-swatch-disabled-icon-size-l);width:var(
--spectrum-swatch-disabled-icon-size-l
)}:host([shape=rectangle][size=xs]){width:calc(var(--spectrum-swatch-size-xs)*2)}:host([shape=rectangle][size=s]){width:calc(var(--spectrum-swatch-size-s)*2)}:host([shape=rectangle][size=m]){width:calc(var(--spectrum-swatch-size-m)*2)}:host([shape=rectangle][size=l]){width:calc(var(--spectrum-swatch-size-l)*2)}:host([rounding=none]),:host([rounding=none]) .fill,:host([rounding=none]) .fill:before,:host([rounding=none]):after,:host([rounding=none]):before,:host([rounding=none][selected]) .fill,:host([rounding=none][selected]) .fill:before{border-radius:0}:host([rounding=full]:not([shape=rectangle])),:host([rounding=full]:not([shape=rectangle])) .fill,:host([rounding=full]:not([shape=rectangle])) .fill:before,:host([rounding=full]:not([shape=rectangle])):after,:host([rounding=full]:not([shape=rectangle])):before,:host([rounding=full][selected]:not([shape=rectangle])) .fill,:host([rounding=full][selected]:not([shape=rectangle])) .fill:before{border-radius:100%}::slotted([slot=image]){height:100%;object-fit:contain;transition:width var(--spectrum-global-animation-duration-100,.13s) ease-in-out,height var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:100%}@media (forced-colors:active){.fill{forced-color-adjust:none}:host{--spectrum-swatch-disabled-icon-color:grayText;--spectrum-alias-focus-ring-color:ButtonText;--spectrum-swatch-selection-indicator-border-color:Highlight;--spectrum-swatch-fill-border-color:ButtonText;--spectrum-swatch-fill-border-color-light:ButtonText;--spectrum-swatch-background-color-selected:ButtonFace}:host([disabled]) .fill{forced-color-adjust:auto}:host([nothing]) .fill:after{background:ButtonText}}
`,Fs=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,Ns=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Rs(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Fs(t,r,a),a};const Vs={xs:()=>a`
        <sp-icon-dash75
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,s:()=>a`
        <sp-icon-dash100
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,m:()=>a`
        <sp-icon-dash200
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,l:()=>a`
        <sp-icon-dash300
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class Gs extends(v(h,{validSizes:["xs","s","m","l"]})){constructor(){super(...arguments),this.color="",this.label="",this.mixedValue=!1,this.nothing=!1,this.role="button",this.selected=!1,this.renderDisabled=()=>a`
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
        `,this.renderMixedValue=()=>Vs[this.size]()}static get styles(){return[js,xt]}get value(){return this._value||this.color||this.label}set value(e){if(e===this._value)return;const t=this.value;this._value=e,this.requestUpdate("value",t)}get focusElement(){return this}toggle(e){this.selected=null!=e?e:!this.selected}handleClick(){this.disabled||this.mixedValue||(this.toggle(),this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||this.toggle())}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),this.addEventListener("keyup",this.handleKeyup)}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.click()}}render(){return a`
            <div class="fill" style="--spectrum-picked-color: ${this.color}">
                <slot name="image"></slot>
                ${ae(this.disabled,this.renderDisabled)}
                ${ae(this.mixedValue,this.renderMixedValue)}
            </div>
        `}willUpdate(e){if(this.getAttribute("role")||this.setAttribute("role","button"),e.has("selected")||e.has("role")){const t="button"===this.role?"aria-pressed":"aria-checked",r="button"===this.role?"aria-checked":"aria-pressed";e.has("role")&&this.removeAttribute(r),this.setAttribute(t,this.selected?"true":"false")}e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.hasAttribute("tabindex")||(this.tabIndex=0)}}Ns([i({reflect:!0})],Gs.prototype,"border",2),Ns([i()],Gs.prototype,"color",2),Ns([i()],Gs.prototype,"label",2),Ns([i({type:Boolean,reflect:!0,attribute:"mixed-value"})],Gs.prototype,"mixedValue",2),Ns([i({type:Boolean,reflect:!0})],Gs.prototype,"nothing",2),Ns([i({reflect:!0})],Gs.prototype,"role",2),Ns([i({reflect:!0})],Gs.prototype,"rounding",2),Ns([i({type:Boolean,reflect:!0})],Gs.prototype,"selected",2),Ns([i({reflect:!0})],Gs.prototype,"shape",2),Ns([i()],Gs.prototype,"value",1),customElements.define("sp-swatch",Gs);var Ks=r`
:host{align-items:flex-start;display:inline-flex;flex-direction:row;flex-wrap:wrap;gap:var(--spectrum-global-dimension-size-50);justify-content:flex-start}:host([density=compact]){gap:var(
--spectrum-global-dimension-size-25
)}:host([density=spacious]){gap:var(
--spectrum-global-dimension-size-100
)}
`,Xs=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,Ys=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ws(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Xs(t,r,a),a};class Zs extends(v(s,{validSizes:["xs","s","m","l"]})){constructor(){super(),this._selected=[],this.selectedSet=new Set,this.rovingTabindexController=new t(this,{focusInIndex:e=>{let t=-1;const r=e.findIndex(((r,o)=>(!e[t]&&!r.disabled&&(t=o),r.selected&&!r.disabled)));return e[r]?r:t},elements:()=>[...this.children],isFocusableElement:e=>!e.disabled}),this.manageChange=()=>{const e=new Set;this.selectedSet=new Set(this.selected),[...this.children].forEach((t=>{e.add(t.value),t.selected&&this.selectedSet.add(t.value)})),this.selectedSet.forEach((t=>{e.has(t)||this.selectedSet.delete(t)})),this._selected=[...this.selectedSet]},new m(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange()}})}static get styles(){return[Ks]}get selected(){return this._selected}set selected(e){if(e===this.selected)return;const t=this.selected;this._selected=e,this.requestUpdate("selected",t)}focus(e){this.rovingTabindexController.focus(e)}handleChange(e){e.stopPropagation();const t=this.selected;if(this.selects){if("single"===this.selects){const{target:t}=e;t.tabIndex=0,this.selectedSet.clear(),this.selectedSet.add(t.value),this.rovingTabindexController.elements.forEach((e=>{e!==t&&(e.selected=!1)}))}else if("multiple"===this.selects){const{target:t}=e;t.selected?this.selectedSet.add(t.value):this.selectedSet.delete(t.value)}this._selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this.selected=t,e.preventDefault())}else e.preventDefault()}getPassthroughSwatchActions(e){const t={};e.has("border")&&(this.border||void 0!==e.get("border"))&&(t.border=this.border),e.has("rounding")&&(this.rounding||void 0!==e.get("rounding"))&&(t.rounding=this.rounding),e.has("size")&&(this.size||void 0!==e.get("size"))&&(t.size=this.size),e.has("shape")&&(this.shape||void 0!==e.get("shape"))&&(t.shape=this.shape);const r=[];return Object.keys(t).length&&r.push((e=>{"border"in t&&(e.border=t.border),"rounding"in t&&(e.rounding=t.rounding),"shape"in t&&(e.shape=t.shape),"size"in t&&(e.size=t.size)})),r}getSelectionSwatchActions(e){const t=[];if(!e.has("selects"))return t;this.selects?this.setAttribute("role","single"===this.selects?"radiogroup":"group"):this.removeAttribute("role");const r=this.selects?{single:"radio",multiple:"checkbox"}[this.selects]:"button";return t.push((e=>{e.setAttribute("role",r)})),t}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(e){const t=[...this.getPassthroughSwatchActions(e),...this.getSelectionSwatchActions(e)],r=new Set(this.selected),o=new Set;e.has("selected")&&t.push((e=>{o.add(e.value),r.has(e.value)||e.selected?e.selected=!0:e.selected=!1})),this.rovingTabindexController.elements.forEach((e=>{t.forEach((t=>{t(e)}))})),e.has("selected")&&(this.selected=[...r].filter((e=>o.has(e))),this.rovingTabindexController.clearElementCache())}}Ys([i({reflect:!0})],Zs.prototype,"border",2),Ys([i({reflect:!0})],Zs.prototype,"rounding",2),Ys([i({type:Array})],Zs.prototype,"selected",1),Ys([i()],Zs.prototype,"selects",2),Ys([i({reflect:!0})],Zs.prototype,"shape",2),customElements.define("sp-swatch-group",Zs);var Qs=r`
:host{--spectrum-switch-handle-size:var(
--spectrum-switch-m-handle-size,var(--spectrum-alias-control-two-size-m)
);--spectrum-switch-handle-border-size:var(
--spectrum-switch-m-handle-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-switch-handle-border-radius:var(
--spectrum-switch-m-handle-border-radius,var(--spectrum-alias-control-two-border-radius-m)
);--spectrum-switch-text-gap:var(
--spectrum-switch-m-text-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-switch-text-size:var(
--spectrum-switch-m-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-switch-track-height:var(
--spectrum-switch-m-track-height,var(--spectrum-alias-control-three-height-m)
);--spectrum-switch-track-width:var(
--spectrum-switch-m-track-width,var(--spectrum-alias-control-three-width-m)
);--spectrum-switch-cursor-hit-x:var(
--spectrum-switch-m-cursor-hit-x,var(--spectrum-global-dimension-size-100)
);--spectrum-switch-height:var(
--spectrum-switch-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-switch-label-margin-top:var(
--spectrum-global-dimension-size-65
);--spectrum-switch-label-line-height:1.49}:host([dir=ltr]){margin-right:calc(var(--spectrum-switch-cursor-hit-x)*2)}:host([dir=rtl]){margin-left:calc(var(--spectrum-switch-cursor-hit-x)*2)}:host{align-items:flex-start;display:inline-flex;max-width:100%;min-height:var(--spectrum-switch-height);position:relative;vertical-align:top}:host([dir=ltr]) #input{left:0}:host([dir=rtl]) #input{right:0}#input{box-sizing:border-box;cursor:pointer;height:100%;margin:0;opacity:0;padding:0;position:absolute;top:0;width:100%;z-index:1}:host([dir=ltr][checked]) #input+#switch:before{transform:translateX(calc(var(--spectrum-switch-track-width) - 100%))}:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc((var(--spectrum-switch-track-width) - 100%)*-1))}#input[disabled],:host([disabled]) #input{cursor:default}#input.focus-visible+#switch:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}#input:focus-visible+#switch:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}#label{font-size:var(--spectrum-switch-text-size);line-height:var(--spectrum-switch-label-line-height);margin-bottom:0;margin-left:var(--spectrum-switch-text-gap);margin-right:var(--spectrum-switch-text-gap);margin-top:var(--spectrum-switch-label-margin-top);transition:color var(--spectrum-global-animation-duration-200,.16s) ease-in-out}:host([dir=ltr]) #switch{left:0}:host([dir=rtl]) #switch{right:0}:host([dir=ltr]) #switch{right:0}:host([dir=rtl]) #switch{left:0}#switch{border-radius:calc(var(--spectrum-switch-track-height)/2);box-sizing:border-box;display:inline-block;flex-grow:0;flex-shrink:0;height:var(--spectrum-switch-track-height);margin-bottom:calc((var(--spectrum-switch-height) - var(--spectrum-switch-track-height))/2);margin-left:0;margin-right:0;margin-top:calc((var(--spectrum-switch-height) - var(--spectrum-switch-track-height))/2);position:relative;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:middle;width:var(--spectrum-switch-track-width)}#switch:before{box-sizing:border-box;content:"";display:block;position:absolute}:host([dir=ltr]) #switch:before{left:0}:host([dir=rtl]) #switch:before{right:0}#switch:before{border-radius:var(--spectrum-switch-handle-border-radius);border-style:solid;border-width:var(--spectrum-switch-handle-border-size);height:var(--spectrum-switch-handle-size);top:0;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-switch-handle-size)}:host([dir=ltr]) #switch:after{left:0}:host([dir=rtl]) #switch:after{right:0}:host([dir=ltr]) #switch:after{right:0}:host([dir=rtl]) #switch:after{left:0}#switch:after{border-radius:calc(var(--spectrum-switch-track-height) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;content:"";display:block;margin:0;position:absolute;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}#switch{background-color:var(
--spectrum-switch-m-track-color,var(--spectrum-global-color-gray-300)
)}#switch:before{background-color:var(
--spectrum-switch-m-handle-background-color,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-switch-m-handle-border-color,var(--spectrum-alias-toggle-border-color-default)
)}#input~#label{color:var(
--spectrum-switch-m-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([checked]) #input+#switch{background-color:var(
--spectrum-switch-m-track-color-selected,var(--spectrum-alias-toggle-background-color-default)
)}:host([checked]) #input+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected,var(--spectrum-alias-toggle-background-color-default)
)}:host(:hover) #input+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-hover,var(--spectrum-alias-toggle-border-color-hover)
);box-shadow:none}:host(:hover) #input~#label{color:var(
--spectrum-switch-m-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:hover[checked]) #input:enabled+#switch{background-color:var(
--spectrum-switch-m-track-color-selected-hover,var(--spectrum-alias-toggle-background-color-hover)
)}:host(:hover[checked]) #input:enabled+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-hover)
)}:host(:active) #input+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-down,var(--spectrum-alias-toggle-border-color-down)
)}:host(:active) #input~#label{color:var(
--spectrum-switch-m-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host(:active[checked]) #input:enabled+#switch{background-color:var(
--spectrum-switch-m-track-color-selected-down,var(--spectrum-alias-toggle-background-color-down)
)}:host(:active[checked]) #input:enabled+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected-down,var(--spectrum-alias-toggle-background-color-down)
)}:host([disabled]) #input+#switch{background-color:var(
--spectrum-switch-m-track-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled]) #input+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}:host([disabled]) #input~#label{color:var(
--spectrum-switch-m-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([disabled][checked][dir]) #input+#switch{background-color:var(
--spectrum-switch-m-track-color-selected-disabled,var(--spectrum-global-color-gray-400)
)}:host([disabled][checked][dir]) #input+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected-disabled,var(--spectrum-global-color-gray-400)
)}:host([disabled][checked][dir]) #input~#label{color:var(
--spectrum-switch-m-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([emphasized][checked]) #input+#switch{background-color:var(
--spectrum-switch-m-emphasized-track-color-selected,var(
--spectrum-alias-toggle-background-color-emphasized-selected-default
)
)}:host([emphasized][checked]) #input+#switch:before{border-color:var(
--spectrum-switch-m-emphasized-handle-border-color-selected,var(
--spectrum-alias-toggle-background-color-emphasized-selected-default
)
)}:host([emphasized][checked]:hover) #input:enabled+#switch{background-color:var(
--spectrum-switch-m-emphasized-track-color-selected-hover,var(--spectrum-alias-toggle-background-color-emphasized-selected-hover)
)}:host([emphasized][checked]:hover) #input:enabled+#switch:before{border-color:var(
--spectrum-switch-m-emphasized-handle-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-emphasized-selected-hover)
)}:host([emphasized]:active[checked]) #input:enabled+#switch{background-color:var(
--spectrum-switch-m-emphasized-track-color-selected-down,var(--spectrum-alias-toggle-background-color-emphasized-selected-down)
)}:host([emphasized]:active[checked]) #input:enabled+#switch:before{border-color:var(
--spectrum-switch-m-emphasized-handle-border-color-selected-down,var(--spectrum-alias-toggle-background-color-emphasized-selected-down)
)}#input.focus-visible+#switch:after,:host(:hover) #input.focus-visible+#switch:after{box-shadow:0 0 0 var(
--spectrum-switch-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-switch-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}#input:focus-visible+#switch:after,:host(:hover) #input:focus-visible+#switch:after{box-shadow:0 0 0 var(
--spectrum-switch-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-switch-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}#input.focus-visible+#switch:before,:host(:hover) #input.focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}#input:focus-visible+#switch:before,:host(:hover) #input:focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}:host(:hover[checked]) #input.focus-visible+#switch,:host([checked]) #input.focus-visible+#switch{background-color:var(
--spectrum-switch-m-track-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host(:hover[checked]) #input:focus-visible+#switch,:host([checked]) #input:focus-visible+#switch{background-color:var(
--spectrum-switch-m-track-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host(:hover[checked]) #input.focus-visible+#switch:before,:host([checked]) #input.focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host(:hover[checked]) #input:focus-visible+#switch:before,:host([checked]) #input:focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-handle-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host([emphasized][checked]) #input.focus-visible+#switch,:host([emphasized][checked]:hover) #input.focus-visible+#switch{background-color:var(
--spectrum-switch-m-emphasized-track-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}:host([emphasized][checked]) #input:focus-visible+#switch,:host([emphasized][checked]:hover) #input:focus-visible+#switch{background-color:var(
--spectrum-switch-m-emphasized-track-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}:host([emphasized][checked]) #input.focus-visible+#switch:before,:host([emphasized][checked]:hover) #input.focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-emphasized-handle-border-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}:host([emphasized][checked]) #input:focus-visible+#switch:before,:host([emphasized][checked]:hover) #input:focus-visible+#switch:before{border-color:var(
--spectrum-switch-m-emphasized-handle-border-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}@media (forced-colors:active){:host{--spectrum-switch-m-emphasized-handle-border-color-selected:Highlight;--spectrum-switch-m-emphasized-handle-border-color-selected-down:Highlight;--spectrum-switch-m-emphasized-handle-border-color-selected-hover:Highlight;--spectrum-switch-m-emphasized-handle-border-color-selected-key-focus:Highlight;--spectrum-switch-m-emphasized-track-color-selected:Highlight;--spectrum-switch-m-emphasized-track-color-selected-down:Highlight;--spectrum-switch-m-emphasized-track-color-selected-hover:Highlight;--spectrum-switch-m-emphasized-track-color-selected-key-focus:Highlight;--spectrum-switch-m-focus-ring-color-key-focus:ButtonText;--spectrum-switch-m-handle-background-color:ButtonFace;--spectrum-switch-m-handle-border-color:ButtonText;--spectrum-switch-m-handle-border-color-disabled:GrayText;--spectrum-switch-m-handle-border-color-down:Highlight;--spectrum-switch-m-handle-border-color-hover:Highlight;--spectrum-switch-m-handle-border-color-key-focus:ButtonText;--spectrum-switch-m-handle-border-color-selected:Highlight;--spectrum-switch-m-handle-border-color-selected-disabled:GrayText;--spectrum-switch-m-handle-border-color-selected-down:Highlight;--spectrum-switch-m-handle-border-color-selected-hover:Highlight;--spectrum-switch-m-handle-border-color-selected-key-focus:Highlight;--spectrum-switch-m-text-color:CanvasText;--spectrum-switch-m-text-color-disabled:GrayText;--spectrum-switch-m-text-color-down:CanvasText;--spectrum-switch-m-text-color-hover:CanvasText;--spectrum-switch-m-text-color-selected-disabled:GrayText;--spectrum-switch-m-track-color:ButtonFace;--spectrum-switch-m-track-color-disabled:ButtonFace;--spectrum-switch-m-track-color-selected:Highlight;--spectrum-switch-m-track-color-selected-disabled:GrayText;--spectrum-switch-m-track-color-selected-down:Highlight;--spectrum-switch-m-track-color-selected-hover:Highlight;--spectrum-switch-m-track-color-selected-key-focus:Highlight;forced-color-adjust:none}#input:not([checked])+#switch{box-shadow:inset 0 0 0 1px var(
--spectrum-switch-m-handle-border-color,var(--spectrum-alias-toggle-border-color-default)
)}:host(:hover) #input:not([checked])+#switch{box-shadow:inset 0 0 0 1px var(
--spectrum-switch-m-handle-border-color-hover,var(--spectrum-alias-toggle-border-color-hover)
)}:host([disabled]) #input+#switch{box-shadow:inset 0 0 0 1px var(
--spectrum-switch-m-handle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}:host(:hover[disabled]) #input+#switch{box-shadow:inset 0 0 0 1px var(
--spectrum-switch-m-handle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}}:host{--spectrum-switch-label-margin-top:var(
--spectrum-global-dimension-size-65,5px
);--spectrum-switch-track-width:var(--spectrum-global-dimension-size-325);--spectrum-switch-handle-border-radius:50%}:host([disabled]){pointer-events:none}:host([dir=ltr][checked]) #input+#switch:before{transform:translateX(calc(var(--spectrum-switch-track-width) - var(--spectrum-switch-handle-size)))}:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc(var(--spectrum-switch-handle-size) - var(--spectrum-switch-track-width)))}
`;var Js=r`
#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}
`,ea=Object.defineProperty,ta=Object.getOwnPropertyDescriptor;class ra extends vt{constructor(){super(...arguments),this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[Qs,Js]:[Qs]}render(){return a`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `}firstUpdated(e){super.firstUpdated(e),this.inputElement.setAttribute("role","switch")}updated(e){e.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?ta(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&ea(t,r,a)})([i({type:Boolean,reflect:!0})],ra.prototype,"emphasized",2),customElements.define("sp-switch",ra);var oa=r`
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
`,sa=Object.defineProperty,aa=Object.getOwnPropertyDescriptor,ia=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?aa(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&sa(t,r,a),a};class la extends s{constructor(){super(...arguments),this.role="row",this.selectable=!1,this.selected=!1,this.value=""}static get styles(){return[oa]}async handleChange(e){this.selected=e.target.checkbox.checked,await 0,e.defaultPrevented&&(this.selected=!this.selected)}handleSlotchange({target:e}){const t=e.assignedElements();this.selectable=!!t.find((e=>"sp-table-checkbox-cell"===e.localName))}manageSelected(){const[e]=this.checkboxCells;!e||(e.checked=this.selected)}handleClick(e){if(e.composedPath().find((e=>"sp-checkbox"===e.localName)))return;const[t]=this.checkboxCells;!t||t.click()}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(e){e.has("selected")&&this.manageSelected(),e.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick))}}ia([d({selector:"sp-table-checkbox-cell",flatten:!0})],la.prototype,"checkboxCells",2),ia([i({reflect:!0})],la.prototype,"role",2),ia([i({type:Boolean})],la.prototype,"selectable",2),ia([i({type:Boolean,reflect:!0})],la.prototype,"selected",2),ia([i({type:String})],la.prototype,"value",2),customElements.define("sp-table-row",la);var ca=r`
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
`;var na=r`
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
`;var da=r`
:host([dir=ltr]){padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]){padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.checkbox{vertical-align:super}:host{align-items:center;display:flex;flex:0 1 0%}:host([selects-single]) sp-checkbox{visibility:hidden}
`,ua=Object.defineProperty,pa=Object.getOwnPropertyDescriptor,ha=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?pa(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ua(t,r,a),a};class ma extends s{constructor(){super(...arguments),this.role="gridcell",this.indeterminate=!1,this.checked=!1,this.disabled=!1,this.selectsSingle=!1}static get styles(){return[ca,na,da]}click(){this.checkbox.click()}render(){return a`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                aria-hidden=${g(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}ha([i({reflect:!0})],ma.prototype,"role",2),ha([f(".checkbox")],ma.prototype,"checkbox",2),ha([i({type:Boolean})],ma.prototype,"indeterminate",2),ha([i({type:Boolean})],ma.prototype,"checked",2),ha([i({type:Boolean})],ma.prototype,"disabled",2),ha([i({type:Boolean,reflect:!0,attribute:"selects-single"})],ma.prototype,"selectsSingle",2),customElements.define("sp-table-checkbox-cell",ma);var ba=r`
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
`,ga=Object.defineProperty,va=Object.getOwnPropertyDescriptor;class fa extends s{constructor(){super(),this.role="rowgroup",new m(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame((()=>{this.shouldHaveTabIndex()}))}})}static get styles(){return[ba]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex")}render(){return a`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?va(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&ga(t,r,a)})([i({reflect:!0})],fa.prototype,"role",2),customElements.define("sp-table-body",fa);var xa=r`
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
`;let ya,ka;async function wa(){return ka||async function(){if(ya)return(await ya).default;ya=window.ResizeObserver;try{new ya((function(){}))}catch(e){ya=import("./3716bd52.js"),ya=(await ya).default}return ka=ya}()}const za=Symbol("virtualizerRef");class Ta extends Event{constructor(e){super(Ta.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}}Ta.eventName="rangeChanged";class Ca extends Event{constructor(e){super(Ca.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}}Ca.eventName="visibilityChanged";class _a{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._mutationPromise=null,this._mutationPromiseResolver=null,this._mutationsObserved=!1,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollToIndex=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,!e)throw new Error("Virtualizer constructor requires a configuration object");if(!e.hostElement)throw new Error('Virtualizer configuration requires the "hostElement" property');this._init(e)}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e),this._initLayout(e)}async _initObservers(){this._mutationObserver=new MutationObserver(this._observeMutations.bind(this));const e=await wa();this._hostElementRO=new e((()=>this._hostElementSizeChanged())),this._childrenRO=new e(this._childrenSizeChanged.bind(this))}async _initLayout(e){e.layout?this.layout=e.layout:this.layout=(await import("./c11d2df4.js")).FlowLayout}_initHostElement(e){const t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[za]=this}async connected(){await this._initObservers();const e=this._isScroller;this._clippingAncestors=function(e,t=!1){return function(e,t=!1){const r=[];let o=t?e:Ea(e);for(;null!==o;)r.push(o),o=Ea(o);return r}(e,t).filter((e=>"visible"!==getComputedStyle(e).overflow))}(this._hostElement,e),this._schedule(this._updateLayout),this._observeAndListen()}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._mutationPromise=new Promise((e=>this._mutationPromiseResolver=e)),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach((e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)})),this._children.forEach((e=>this._childrenRO.observe(e))),this._scrollEventListeners.forEach((e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions)))}disconnected(){this._scrollEventListeners.forEach((e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions))),this._scrollEventListeners=[],this._clippingAncestors=[],this._mutationObserver.disconnect(),this._hostElementRO.disconnect(),this._childrenRO.disconnect()}_applyVirtualizerStyles(){const e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"strict",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){const e=this._hostElement;if(!this._sizer){let t=e.querySelector("[virtualizer-sizer]");t||(t=document.createElement("div"),t.setAttribute("virtualizer-sizer",""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.innerHTML="&nbsp;",t.setAttribute("virtualizer-sizer",""),this._sizer=t}return this._sizer}get layout(){return this._layout}set layout(e){if(this._layout===e)return;let t=null,r={};if("object"==typeof e?(void 0!==e.type&&(t=e.type),r=e):t=e,"function"==typeof t){if(this._layout instanceof t)return void(r&&(this._layout.config=r));t=new t(r)}this._layout&&(this._measureCallback=null,this._measureChildOverride=null,this._layout.removeEventListener("scrollsizechange",this),this._layout.removeEventListener("scrollerrorchange",this),this._layout.removeEventListener("itempositionchange",this),this._layout.removeEventListener("rangechange",this),this._sizeHostElement(void 0),this._hostElement.removeEventListener("load",this._loadListener,!0)),this._layout=t,this._layout&&(this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.addEventListener("scrollsizechange",this),this._layout.addEventListener("scrollerrorchange",this),this._layout.addEventListener("itempositionchange",this),this._layout.addEventListener("rangechange",this),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout))}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){const e=window.performance.now(),t=e-this._benchmarkStart,r=performance.getEntriesByName("uv-virtualizing","measure").filter((t=>t.startTime>=this._benchmarkStart&&t.startTime<e)).reduce(((e,t)=>e+t.duration),0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:r}}return null}_measureChildren(){const e={},t=this._children,r=this._measureChildOverride||this._measureChild;for(let o=0;o<t.length;o++){const s=t[o],a=this._first+o;(this._itemsChanged||this._toBeMeasured.has(s))&&(e[a]=r.call(this,s,this._items[a]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){const{width:t,height:r}=e.getBoundingClientRect();return Object.assign({width:t,height:r},function(e){const t=window.getComputedStyle(e);return{marginTop:Sa(t.marginTop),marginRight:Sa(t.marginRight),marginBottom:Sa(t.marginBottom),marginLeft:Sa(t.marginLeft)}}(e))}set scrollToIndex(e){this._scrollToIndex=e,this._schedule(this._updateLayout)}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(){const{_rangeChanged:e,_itemsChanged:t}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||t)&&(this._notifyRange(),await this._mutationPromise),this._children.forEach((e=>this._childrenRO.observe(e))),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._scrollError&&(this._correctScrollError(this._scrollError),this._scrollError=null),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end")}_updateLayout(){this._layout&&(this._layout.totalItems=this._items.length,null!==this._scrollToIndex&&(this._layout.scrollToIndex(this._scrollToIndex.index,this._scrollToIndex.position),this._scrollToIndex=null),this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(this._itemsChanged),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}this._schedule(this._updateLayout)}handleEvent(e){switch(e.type){case"scroll":(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent();break;case"scrollsizechange":this._scrollSize=e.detail,this._schedule(this._updateDOM);break;case"scrollerrorchange":this._scrollError=e.detail,this._schedule(this._updateDOM);break;case"itempositionchange":this._childrenPos=e.detail,this._schedule(this._updateDOM);break;case"rangechange":this._adjustRange(e.detail),this._schedule(this._updateDOM);break;default:console.warn("event not handled",e)}}get _children(){const e=[];let t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute("virtualizer-sizer")||e.push(t),t=t.nextElementSibling;return e}_updateView(){const e=this._hostElement,t=this._layout;let r,o,s,a;const i=e.getBoundingClientRect();r=0,o=0,s=window.innerHeight,a=window.innerWidth;for(const e of this._clippingAncestors){const t=e.getBoundingClientRect();r=Math.max(r,t.top),o=Math.max(o,t.left),s=Math.min(s,t.bottom),a=Math.min(a,t.right)}const l=r-i.top+e.scrollTop,c=o-i.left+e.scrollLeft,n=Math.max(1,s-r),d=Math.max(1,a-o);t.viewportSize={width:d,height:n},t.viewportScroll={top:l,left:c}}_sizeHostElement(e){const t=82e5,r=e&&null!==e.width?Math.min(t,e.width):0,o=e&&null!==e.height?Math.min(t,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${r}px, ${o}px)`;else{const e=this._hostElement.style;e.minWidth=r?`${r}px`:"100%",e.minHeight=o?`${o}px`:"100%"}}_positionChildren(e){if(e){const t=this._children;Object.keys(e).forEach((r=>{const o=r-this._first,s=t[o];if(s){const{top:t,left:o,width:a,height:i,xOffset:l,yOffset:c}=e[r];s.style.position="absolute",s.style.boxSizing="border-box",s.style.transform=`translate(${o}px, ${t}px)`,void 0!==a&&(s.style.width=a+"px"),void 0!==i&&(s.style.height=i+"px"),s.style.left=void 0===l?null:l+"px",s.style.top=void 0===c?null:c+"px"}}))}}async _adjustRange(e){const{_first:t,_last:r,_firstVisible:o,_lastVisible:s}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==r,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==s}_correctScrollError(e){const t=this._clippingAncestors[0];t?(t.scrollTop-=e.top,t.scrollLeft-=e.left):window.scroll(window.pageXOffset-e.left,window.pageYOffset-e.top)}_notifyRange(){this._hostElement.dispatchEvent(new Ta({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Ca({first:this._firstVisible,last:this._lastVisible}))}_hostElementSizeChanged(){this._schedule(this._updateLayout)}async _observeMutations(){this._mutationsObserved||(this._mutationsObserved=!0,this._mutationPromiseResolver(),this._mutationPromise=new Promise((e=>this._mutationPromiseResolver=e)),this._mutationsObserved=!1)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout.measureChildren){for(const t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._itemsChanged=!1,this._rangeChanged=!1}}function Sa(e){const t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function Ea(e){if(null!==e.parentElement)return e.parentElement;const t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}const qa=e=>e,Aa=e=>a`${JSON.stringify(e,null,2)}`;const Ia=H(class extends se{constructor(e){if(super(e),this.virtualizer=null,this.first=0,this.last=-1,this.renderItem=Aa,this.keyFunction=qa,this.items=[],e.type!==j.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);const t=[],r=Math.min(this.items.length,this.last+1);if(this.first>=0&&this.last>=this.first)for(let e=this.first;e<r;e++)t.push(this.items[e]);return Y(t,this.keyFunction||qa,this.renderItem)}update(e,[t]){return this._setFunctions(t),this.items=t.items||[],this.virtualizer?this._updateVirtualizerConfig(t):(this.cachedConfig||setTimeout((()=>this._initialize(e))),this.cachedConfig=t),this.render()}_updateVirtualizerConfig(e){const{virtualizer:t}=this;t.items=this.items,e.layout&&(t.layout=e.layout),e.scrollToIndex&&(t.scrollToIndex=e.scrollToIndex)}_setFunctions(e){const{renderItem:t,keyFunction:r}=e;t&&(this.renderItem=(e,r)=>t(e,r+this.first)),r&&(this.keyFunction=r)}_initialize(e){const t=this.cachedConfig,r=e.parentNode;if(r&&1===r.nodeType){const{layout:o,scroller:s}=t;this.virtualizer=new _a({hostElement:r,layout:o,scroller:s}),this.virtualizer.connected(),r.addEventListener("rangeChanged",(e=>{e.stopPropagation(),this.first=e.first,this.last=e.last,this.setValue(this.render())})),this.update(e,[t])}else console.log("uh-oh!")}disconnected(){var e;null===(e=this.virtualizer)||void 0===e||e.disconnected()}reconnected(){var e;null===(e=this.virtualizer)||void 0===e||e.connected()}});var La=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,Pa=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?$a(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&La(t,r,a),a},Ba=(e=>(e[e.ITEM=0]="ITEM",e[e.INFORMATION=1]="INFORMATION",e))(Ba||{});const Oa=class extends Event{constructor(e){super(Oa.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}};let Ma=Oa;Ma.eventName="rangeChanged";class Da extends(v(s,{validSizes:["s","m"],defaultSize:"m"})){constructor(){super(...arguments),this._renderItem=()=>a``,this.role="grid",this.selected=[],this.selectedSet=new Set,this.items=[],this.itemValue=(e,t)=>`${t}`,this.scroller=!1}static get styles(){return[xa]}get renderItem(){return this._renderItem}set renderItem(e){this._renderItem=(t,r)=>{const o=this.itemValue(t,r),s=this.selected.includes(o),i=this.selects&&1!==(null==t?void 0:t._$rowType$);return a`
                <sp-table-row
                    value=${o}
                    aria-rowindex=${r+1}
                    ?selected=${s}
                >
                    ${i?a`
                              <sp-table-checkbox-cell
                                  ?checked=${s}
                              ></sp-table-checkbox-cell>
                          `:a``}
                    ${e(t,r)}
                </sp-table-row>
            `}}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return!!this.items.length}focus(){const e=this.querySelector("sp-table-head-cell[sortable]");e&&e.focus()}selectAllRows(){this.isVirtualized?this.items.forEach(((e,t)=>{1!==e._$rowType$&&this.selectedSet.add(this.itemValue(e,t))})):this.tableRows.forEach((e=>{e.selected=!0,this.selectedSet.add(e.value)})),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1)}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach((e=>{e.selected=!1})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1)}manageSelects(){const e=this.querySelectorAll("sp-table-checkbox-cell"),t=document.createElement("sp-table-checkbox-cell");if(this.selects){let e=!1;this.isVirtualized?e=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach((e=>{if(e.selected=this.selectedSet.has(e.value),!e.querySelector(":scope > sp-table-checkbox-cell")){const r=t.cloneNode();e.insertAdjacentElement("afterbegin",r),t.checked=e.selected}})),e=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(e)}else e.forEach((e=>{e.remove()})),delete this.tableHeadCheckboxCell}validateSelected(){const e=new Set;this.isVirtualized?this.items.forEach(((t,r)=>{const o=this.itemValue(t,r);e.add(o)})):this.tableRows.forEach((t=>{e.add(t.value)}));const t=this.selected.length;this.selected=this.selected.filter((t=>e.has(t))),t!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected)}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach((e=>{e.selected=this.selectedSet.has(e.value)})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length))}manageCheckboxes(){var e;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell");const e=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(e),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach((e=>{const t=document.createElement("sp-table-checkbox-cell");e.insertAdjacentElement("afterbegin",t),e.selected=this.selectedSet.has(e.value),t.checked=e.selected}))}else null==(e=this.tableHead.querySelector("sp-table-checkbox-cell"))||e.remove(),this.tableRows.forEach((e=>{var t;null==(t=e.checkboxCells[0])||t.remove(),this.selected.length&&(e.selected=this.selectedSet.has(e.value))}))}manageHeadCheckbox(e){!this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell.selectsSingle="single"===this.selects,this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e)}handleChange(e){e.stopPropagation();const t=new Set(this.selectedSet),r=[...this.selected],{target:o}=e,{parentElement:s}=o;if(s.value)switch(this.selects){case"single":this.deselectAllRows(),s.selected&&(this.selectedSet.add(s.value),this.selected=[...this.selectedSet]);break;case"multiple":{s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value),this.selected=[...this.selectedSet];const e=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e;break}}else{const{checkbox:e}=o;e.checked||e.indeterminate?this.selectAllRows():this.deselectAllRows()}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(e.preventDefault(),this.selectedSet=t,this.selected=r)}scrollToIndex(e){e&&this.renderVirtualizedItems(e)}render(){return a`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(e){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),e.has("selects")&&this.manageSelects(),e.has("selected")&&this.hasUpdated&&this.manageSelected()}updated(){this.items.length&&this.renderVirtualizedItems()}renderVirtualizedItems(e){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",(e=>{this.dispatchEvent(new Ma({first:e.first,last:e.last}))})));const t={items:this.items,renderItem:this.renderItem,scroller:this.scroller};e&&(t.scrollToIndex={index:e}),u(a`
                ${Ia(t)}
            `,this.tableBody)}disconnectedCallback(){super.disconnectedCallback()}}Pa([i({reflect:!0})],Da.prototype,"role",2),Pa([i({type:String,reflect:!0})],Da.prototype,"selects",2),Pa([i({type:Array})],Da.prototype,"selected",2),Pa([i({type:Array})],Da.prototype,"items",2),Pa([i({type:Object})],Da.prototype,"itemValue",2),Pa([i({type:Boolean,reflect:!0})],Da.prototype,"scroller",2),customElements.define("sp-table",Da);var Ha=Object.defineProperty,Ua=Object.getOwnPropertyDescriptor;class ja extends s{constructor(){super(...arguments),this.role="gridcell"}static get styles(){return[ca]}render(){return a`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?Ua(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&Ha(t,r,a)})([i({reflect:!0})],ja.prototype,"role",2),customElements.define("sp-table-cell",ja);var Fa=r`
:host{display:flex}
`,Ra=Object.defineProperty,Na=Object.getOwnPropertyDescriptor,Va=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Na(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ra(t,r,a),a};class Ga extends s{constructor(){super(...arguments),this.role="row"}static get styles(){return[Fa]}handleSorted({target:e}){[...this.children].forEach((t=>{t!==e&&(t.sortDirection=void 0)}))}handleChange({target:e}){this.selected=e.checkbox.checked||e.checkbox.indeterminate}render(){return a`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}Va([i({reflect:!0})],Ga.prototype,"role",2),Va([i({type:Boolean,reflect:!0})],Ga.prototype,"selected",2),customElements.define("sp-table-head",Ga);var Ka=r`
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
`,Xa=Object.defineProperty,Wa=Object.getOwnPropertyDescriptor,Ya=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?Wa(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Xa(t,r,a),a};class Za extends s{constructor(){super(...arguments),this.role="columnheader",this.sortable=!1,this.sortKey=""}static get styles(){return[na,Ka]}handleClick(){!this.sortable||(this.sortDirection?this.sortDirection="asc"===this.sortDirection?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})))}render(){const e=this.sortable&&!!this.sortDirection;return a`
            <slot></slot>
            ${e?a`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:a``}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}update(e){e.has("sortDirection")&&this.setAttribute("aria-sort",(e=>({asc:"ascending",desc:"descending"}[e]||"none"))(this.sortDirection)),e.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(e)}}Ya([i({reflect:!0})],Za.prototype,"role",2),Ya([i({type:Boolean,reflect:!0})],Za.prototype,"sortable",2),Ya([i({reflect:!0,attribute:"sort-direction"})],Za.prototype,"sortDirection",2),Ya([i({attribute:"sort-key"})],Za.prototype,"sortKey",2),customElements.define("sp-table-head-cell",Za);var Qa=r`
:host([size=s]){--spectrum-tag-removable-texticon-text-font-weight:var(
--spectrum-tag-s-removable-texticon-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-s-texticon-border-size,var(--spectrum-alias-tag-border-size-default)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-tag-texticon-text-line-height:var(
--spectrum-tag-s-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-tag-texticon-focusring-border-size:var(
--spectrum-tag-s-texticon-focusring-border-size,var(--spectrum-alias-tag-focusring-size)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-s-texticon-height,var(--spectrum-alias-tag-height-s)
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-s-texticon-padding-right,var(--spectrum-alias-tag-padding-right-s)
);--spectrum-tag-texticon-border-radius:var(
--spectrum-tag-s-texticon-border-radius,var(--spectrum-alias-tag-border-radius)
);--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-tag-textonly-padding-right:var(
--spectrum-tag-s-textonly-padding-right,var(--spectrum-alias-tag-padding-right-s)
);--spectrum-tag-textonly-padding-left:var(
--spectrum-tag-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-tag-texticon-text-font-size:var(
--spectrum-global-dimension-font-size-75
)}:host([size=m]){--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-m-texticon-padding-left
);--spectrum-tag-removable-texticon-text-font-weight:var(
--spectrum-tag-m-removable-texticon-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-m-texticon-border-size,var(--spectrum-alias-tag-border-size-default)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-tag-texticon-text-line-height:var(
--spectrum-tag-m-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-tag-texticon-focusring-border-size:var(
--spectrum-tag-m-texticon-focusring-border-size,var(--spectrum-alias-tag-focusring-size)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-m-texticon-height,var(--spectrum-alias-tag-height-m)
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-m-texticon-padding-right,var(--spectrum-alias-tag-padding-right-m)
);--spectrum-tag-texticon-border-radius:var(
--spectrum-tag-m-texticon-border-radius,var(--spectrum-alias-tag-border-radius)
);--spectrum-tag-textonly-padding-right:var(
--spectrum-tag-m-textonly-padding-right,var(--spectrum-alias-tag-padding-right-m)
);--spectrum-tag-textonly-padding-left:var(
--spectrum-tag-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-tag-texticon-text-font-size:var(
--spectrum-global-dimension-font-size-100
)}:host([size=l]){--spectrum-tag-removable-texticon-text-font-weight:var(
--spectrum-tag-l-removable-texticon-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-l-texticon-border-size,var(--spectrum-alias-tag-border-size-default)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-tag-texticon-text-line-height:var(
--spectrum-tag-l-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-tag-texticon-focusring-border-size:var(
--spectrum-tag-l-texticon-focusring-border-size,var(--spectrum-alias-tag-focusring-size)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-l-texticon-height,var(--spectrum-alias-tag-height-l)
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-l-texticon-padding-right,var(--spectrum-alias-tag-padding-right-l)
);--spectrum-tag-texticon-border-radius:var(
--spectrum-tag-l-texticon-border-radius,var(--spectrum-alias-tag-border-radius)
);--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-tag-textonly-padding-right:var(
--spectrum-tag-l-textonly-padding-right,var(--spectrum-alias-tag-padding-right-l)
);--spectrum-tag-textonly-padding-left:var(
--spectrum-tag-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-tag-texticon-text-font-size:var(
--spectrum-global-dimension-font-size-200
)}:host([dir=ltr]){padding-left:var(
--spectrum-tag-textonly-padding-right
)}:host([dir=rtl]){padding-right:var(
--spectrum-tag-textonly-padding-right
)}:host([dir=ltr]){padding-right:var(
--spectrum-tag-textonly-padding-right
)}:host([dir=rtl]){padding-left:var(
--spectrum-tag-textonly-padding-right
)}:host{align-items:center;border-radius:var(--spectrum-tag-texticon-border-radius);border-style:solid;border-width:var(--spectrum-tag-texticon-border-size);box-sizing:border-box;display:inline-flex;max-width:100%;min-height:calc(var(--spectrum-tag-texticon-height) + var(--spectrum-tag-texticon-border-size) + var(--spectrum-tag-texticon-border-size));outline:none;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;-webkit-user-select:none;user-select:none;vertical-align:bottom}:host([disabled]){pointer-events:none}:host([dir=ltr])>::slotted([slot=avatar]),:host([dir=ltr])>::slotted([slot=icon]){padding-right:var(
--spectrum-tag-texticon-icon-gap
)}:host([dir=rtl])>::slotted([slot=avatar]),:host([dir=rtl])>::slotted([slot=icon]){padding-left:var(
--spectrum-tag-texticon-icon-gap
)}:host([dir=ltr])>::slotted([slot=avatar]),:host([dir=ltr])>::slotted([slot=icon]){margin-left:calc(var(--spectrum-tag-texticon-padding-left) - var(--spectrum-tag-textonly-padding-left))}:host([dir=rtl])>::slotted([slot=avatar]),:host([dir=rtl])>::slotted([slot=icon]){margin-right:calc(var(--spectrum-tag-texticon-padding-left) - var(--spectrum-tag-textonly-padding-left))}:host([dir=ltr]) .clear-button{margin-right:calc(var(--spectrum-tag-texticon-padding-right)*-1)}:host([dir=rtl]) .clear-button{margin-left:calc(var(--spectrum-tag-texticon-padding-right)*-1)}.clear-button{padding-bottom:0;padding-top:0}.spectrum-Tag-label{cursor:default;flex:1 1 auto;font-size:var(--spectrum-tag-texticon-text-font-size);font-weight:var(--spectrum-tag-removable-texticon-text-font-weight);height:100%;line-height:var(--spectrum-tag-texticon-text-line-height);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([selected].focus-visible):after,:host([selected].is-focused):after{box-shadow:0 0 0 var(--spectrum-tag-texticon-focusring-border-size) var(
--spectrum-tag-m-texticon-focusring-border-color-key-focus,var(--spectrum-alias-tag-focusring-border-color-key-focus)
)}:host([selected].is-focused):after,:host([selected]:focus-visible):after{box-shadow:0 0 0 var(--spectrum-tag-texticon-focusring-border-size) var(
--spectrum-tag-m-texticon-focusring-border-color-key-focus,var(--spectrum-alias-tag-focusring-border-color-key-focus)
)}:host{background-color:var(
--spectrum-tag-s-texticon-background-color,var(--spectrum-alias-tag-background-color-default)
);border-color:var(
--spectrum-tag-s-texticon-border-color,var(--spectrum-alias-tag-border-color-default)
);color:var(
--spectrum-tag-s-texticon-text-color,var(--spectrum-alias-tag-text-color-default)
)}.clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color,var(--spectrum-alias-tag-icon-color-default)
)}.clear-button .spectrum-ClearButton-fill{background:transparent}:host(:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-hover,var(--spectrum-alias-tag-background-color-hover)
);border-color:var(
--spectrum-tag-s-texticon-border-color-hover,var(--spectrum-alias-tag-border-color-hover)
);color:var(
--spectrum-tag-s-texticon-text-color-hover,var(--spectrum-alias-tag-text-color-hover)
)}:host(:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-hover,var(--spectrum-alias-tag-icon-color-hover)
)}:host(:hover) .clear-button .spectrum-ClearButton-fill{background:transparent}:host(.focus-visible){background-color:var(
--spectrum-tag-s-texticon-background-color-key-focus,var(--spectrum-alias-tag-background-color-key-focus)
);border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-tag-s-texticon-focusring-border-width,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-tag-s-texticon-focusring-border-color-key-focus,var(--spectrum-alias-tag-focusring-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-text-color-key-focus,var(--spectrum-alias-tag-text-color-key-focus)
)}:host(:focus-visible){background-color:var(
--spectrum-tag-s-texticon-background-color-key-focus,var(--spectrum-alias-tag-background-color-key-focus)
);border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-tag-s-texticon-focusring-border-width,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-tag-s-texticon-focusring-border-color-key-focus,var(--spectrum-alias-tag-focusring-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-text-color-key-focus,var(--spectrum-alias-tag-text-color-key-focus)
)}:host(.focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-tag-icon-color-hover)
)}:host(:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-tag-icon-color-hover)
)}:host(.focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host(:focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected]){background-color:var(
--spectrum-tag-s-texticon-background-color-selected,var(--spectrum-alias-tag-background-color-selected-default)
);border-color:var(
--spectrum-tag-s-texticon-border-color-selected,var(--spectrum-alias-tag-background-color-selected-default)
);color:var(
--spectrum-tag-s-texticon-text-color-selected,var(--spectrum-alias-tag-text-color-selected)
)}:host([selected]) .spectrum-TagIcon{color:var(
--spectrum-tag-s-texticon-icon-color-selected,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected]) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected]:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-selected-hover,var(--spectrum-alias-tag-background-color-selected-hover)
)}:host([selected]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-hover,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected]:hover) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected].focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-tag-text-color-selected)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focusring-border-color-selected-key-focus,var(--spectrum-alias-tag-focusring-border-color-selected-key-focus)
)}:host([selected]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-tag-text-color-selected)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focusring-border-color-selected-key-focus,var(--spectrum-alias-tag-focusring-border-color-selected-key-focus)
)}:host([selected].focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-key-focus,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-key-focus,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected].focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected]:focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected][invalid]){background-color:var(
--spectrum-tag-s-texticon-background-color-error-selected,var(--spectrum-alias-tag-background-color-error-selected-default)
);border-color:var(
--spectrum-tag-s-texticon-border-color-error-selected,var(--spectrum-alias-tag-border-color-error-selected)
)}:host([selected][invalid]) .spectrum-Tag-label{color:var(
--spectrum-tag-s-removable-texticon-text-color-error-selected,var(--spectrum-alias-tag-text-color-selected)
)}:host([selected][invalid]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-selected,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected][invalid]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-selected,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected][invalid]) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([selected][invalid].focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-tag-text-color-selected)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-error-selected-key-focus,var(--spectrum-alias-tag-border-color-error-selected)
)}:host([selected][invalid]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-tag-text-color-selected)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-error-selected-key-focus,var(--spectrum-alias-tag-border-color-error-selected)
)}:host([selected][invalid]:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-error-selected-hover,var(--spectrum-alias-tag-background-color-error-selected-hover)
);border-color:var(
--spectrum-tag-s-texticon-border-color-error-selected-hover,var(--spectrum-alias-tag-border-color-error-selected)
)}:host([selected][invalid]:hover) .clear-button,:host([selected][invalid]:hover) .spectrum-Tag-icon,:host([selected][invalid]:hover) .spectrum-Tag-label{color:var(
--spectrum-tag-s-texticon-icon-color-error-selected-hover,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected][invalid]:hover) .clear-button .spectrum-ClearButton-fill,:host([selected][invalid]:hover) .spectrum-Tag-icon .spectrum-ClearButton-fill,:host([selected][invalid]:hover) .spectrum-Tag-label .spectrum-ClearButton-fill{background:transparent}:host([invalid]){border-color:var(
--spectrum-tag-s-texticon-border-color-error,var(--spectrum-alias-tag-border-color-error-default)
);color:var(
--spectrum-tag-s-texticon-icon-color-error,var(--spectrum-global-color-red-600)
)}:host([invalid]:hover){border-color:var(
--spectrum-tag-s-texticon-border-color-error-hover,var(--spectrum-alias-tag-border-color-error-hover)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-global-color-red-700)
)}:host([invalid]:hover) .clear-button,:host([invalid]:hover) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-global-color-red-700)
)}:host([invalid]:hover) .clear-button .spectrum-ClearButton-fill,:host([invalid]:hover) .spectrum-Tag-icon .spectrum-ClearButton-fill{background:transparent}:host([invalid].focus-visible){border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-global-color-red-700)
)}:host([invalid]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-tag-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-global-color-red-700)
)}:host([invalid].focus-visible) .clear-button{color:var(
--spectrum-tag-s-texticon-icon-color-error-key-focus,var(--spectrum-global-color-red-700)
)}:host([invalid]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-texticon-icon-color-error-key-focus,var(--spectrum-global-color-red-700)
)}:host([invalid]) .clear-button,:host([invalid]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-error,var(--spectrum-global-color-red-600)
)}:host([invalid]) .clear-button .spectrum-ClearButton-fill,:host([invalid]) .spectrum-Tag-icon .spectrum-ClearButton-fill{background:transparent}:host([invalid]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error,var(--spectrum-global-color-red-600)
)}:host([invalid]) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([disabled]){background-color:var(
--spectrum-tag-s-texticon-background-color-disabled,var(--spectrum-alias-tag-background-color-disabled)
);border-color:var(
--spectrum-tag-s-texticon-border-color-disabled,var(--spectrum-alias-tag-border-color-disabled)
);color:var(
--spectrum-tag-s-texticon-text-color-disabled,var(--spectrum-alias-tag-text-color-disabled)
)}:host([disabled]) ::slotted([slot=avatar]){opacity:var(
--spectrum-avatar-size-100-opacity-disabled,var(--spectrum-global-color-opacity-30)
)}:host([disabled]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-disabled,var(--spectrum-alias-tag-icon-color-disabled)
)}:host([disabled]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-disabled,var(--spectrum-alias-tag-icon-color-disabled)
)}:host([disabled]) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable]:hover){color:var(
--spectrum-tag-s-removable-texticon-text-color-hover,var(--spectrum-alias-tag-text-color-hover)
)}:host([deletable]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-hover,var(--spectrum-alias-tag-icon-color-hover)
)}:host([deletable]:hover) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable]:active){color:var(
--spectrum-tag-s-removable-texticon-text-color-down,var(--spectrum-alias-tag-text-color-down)
)}:host([deletable]:active) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-down,var(--spectrum-alias-tag-icon-color-down)
)}:host([deletable]:active) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable][invalid]:hover){border-color:var(
--spectrum-tag-s-removable-texticon-border-color-error-hover,var(--spectrum-alias-tag-border-color-error-hover)
);color:var(
--spectrum-tag-s-removable-texticon-text-color-error-hover,var(--spectrum-alias-tag-text-color-error-hover)
)}:host([deletable][invalid]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-hover,var(--spectrum-global-color-red-700)
)}:host([deletable][invalid]:hover) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable][invalid]:active){border-color:var(
--spectrum-tag-s-removable-texticon-border-color-error-down,var(--spectrum-alias-tag-border-color-error-down)
);color:var(
--spectrum-tag-s-removable-texticon-text-color-error-down,var(--spectrum-alias-tag-text-color-error-down)
)}:host([deletable][invalid]:active) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([deletable][invalid]:active) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable].focus-visible){color:var(
--spectrum-tag-s-removable-texticon-text-color-key-focus,var(--spectrum-alias-tag-text-color-key-focus)
)}:host([deletable]:focus-visible){color:var(
--spectrum-tag-s-removable-texticon-text-color-key-focus,var(--spectrum-alias-tag-text-color-key-focus)
)}:host([deletable].focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-tag-icon-color-hover)
)}:host([deletable]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-tag-icon-color-hover)
)}:host([deletable].focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable]:focus-visible) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable][selected]){color:var(
--spectrum-tag-s-removable-texticon-text-color-selected,var(--spectrum-alias-tag-text-color-selected)
)}:host([deletable][selected]) .is-focused{color:var(
--spectrum-tag-s-removable-texticon-text-color-selected-key-focus,var(--spectrum-alias-tag-text-color-selected)
)}:host([deletable][selected]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected,var(--spectrum-alias-tag-icon-color-selected)
)}:host([deletable][selected]) .clear-button .spectrum-ClearButton-fill{background:transparent}:host([deletable][selected]) .clear-button:hover{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-hover,var(--spectrum-alias-tag-icon-color-selected)
)}:host([deletable][selected]) .clear-button:hover .spectrum-ClearButton-fill{background:transparent}:host([deletable][selected][invalid]){color:var(
--spectrum-tag-s-removable-texticon-text-color-error-key-focus,var(--spectrum-alias-tag-text-color-error-key-focus)
)}@media (forced-colors:active){:host{--spectrum-tag-s-removable-texticon-border-color-error-down:Highlight;--spectrum-tag-s-removable-texticon-border-color-error-hover:Highlight;--spectrum-tag-s-removable-texticon-icon-color:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-disabled:GrayText;--spectrum-tag-s-removable-texticon-icon-color-down:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-error:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-error-down:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-error-hover:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-error-selected:HighlightText;--spectrum-tag-s-removable-texticon-icon-color-hover:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-key-focus:ButtonText;--spectrum-tag-s-removable-texticon-icon-color-selected:HighlightText;--spectrum-tag-s-removable-texticon-icon-color-selected-hover:HighlightText;--spectrum-tag-s-removable-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-tag-s-removable-texticon-text-color-down:ButtonText;--spectrum-tag-s-removable-texticon-text-color-error-down:ButtonText;--spectrum-tag-s-removable-texticon-text-color-error-hover:ButtonText;--spectrum-tag-s-removable-texticon-text-color-error-key-focus:ButtonText;--spectrum-tag-s-removable-texticon-text-color-error-selected:HighlightText;--spectrum-tag-s-removable-texticon-text-color-hover:ButtonText;--spectrum-tag-s-removable-texticon-text-color-key-focus:ButtonText;--spectrum-tag-s-removable-texticon-text-color-selected:HighlightText;--spectrum-tag-s-removable-texticon-text-color-selected-key-focus:HighlightText;--spectrum-tag-s-texticon-background-color:ButtonFace;--spectrum-tag-s-texticon-background-color-disabled:ButtonFace;--spectrum-tag-s-texticon-background-color-error-selected:Highlight;--spectrum-tag-s-texticon-background-color-error-selected-hover:Highlight;--spectrum-tag-s-texticon-background-color-hover:ButtonFace;--spectrum-tag-s-texticon-background-color-key-focus:ButtonFace;--spectrum-tag-s-texticon-background-color-selected:Highlight;--spectrum-tag-s-texticon-background-color-selected-hover:Highlight;--spectrum-tag-s-texticon-border-color:ButtonText;--spectrum-tag-s-texticon-border-color-disabled:GrayText;--spectrum-tag-s-texticon-border-color-error:Highlight;--spectrum-tag-s-texticon-border-color-error-hover:Highlight;--spectrum-tag-s-texticon-border-color-error-selected:HighlightText;--spectrum-tag-s-texticon-border-color-error-selected-hover:HighlightText;--spectrum-tag-s-texticon-border-color-error-selected-key-focus:HighlightText;--spectrum-tag-s-texticon-border-color-hover:ButtonText;--spectrum-tag-s-texticon-border-color-key-focus:ButtonText;--spectrum-tag-s-texticon-border-color-selected:HighlightText;--spectrum-tag-s-texticon-focusring-border-color-key-focus:ButtonText;--spectrum-tag-s-texticon-focusring-border-color-selected-key-focus:ButtonText;--spectrum-tag-s-texticon-icon-color-disabled:GrayText;--spectrum-tag-s-texticon-icon-color-error:ButtonText;--spectrum-tag-s-texticon-icon-color-error-hover:ButtonText;--spectrum-tag-s-texticon-icon-color-error-key-focus:ButtonText;--spectrum-tag-s-texticon-icon-color-error-selected-hover:HighlightText;--spectrum-tag-s-texticon-icon-color-selected:HighlightText;--spectrum-tag-s-texticon-text-color:ButtonText;--spectrum-tag-s-texticon-text-color-disabled:GrayText;--spectrum-tag-s-texticon-text-color-hover:ButtonText;--spectrum-tag-s-texticon-text-color-key-focus:ButtonText;--spectrum-tag-s-texticon-text-color-selected:HighlightText;--spectrum-tag-s-texticon-text-color-selected-key-focus:HighlightText;forced-color-adjust:none}:host([selected][invalid].focus-visible){box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focusring-border-color-selected-key-focus,var(
--spectrum-alias-tag-focusring-border-color-selected-key-focus
)
)}:host([selected][invalid]:focus-visible){box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focusring-border-color-selected-key-focus,var(
--spectrum-alias-tag-focusring-border-color-selected-key-focus
)
)}:host([selected][invalid].focus-visible) .clear-button{color:var(
--spectrum-tag-s-texticon-icon-color-error-selected-hover,var(--spectrum-alias-tag-icon-color-selected)
)}:host([selected][invalid]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-texticon-icon-color-error-selected-hover,var(--spectrum-alias-tag-icon-color-selected)
)}}:host([invalid]) .clear-button{--spectrum-clearbutton-medium-icon-color:var(
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
`,Ja=Object.defineProperty,ei=Object.getOwnPropertyDescriptor,ti=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ei(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&Ja(t,r,a),a};class ri extends(v(s,{validSizes:["s","m","l"]})){constructor(){super(),this.deletable=!1,this.disabled=!1,this.readonly=!1,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.handleKeydown=e=>{if(!this.deletable)return;const{code:t}=e;switch(t){case"Backspace":case"Space":case"Delete":return void this.delete();default:return}},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Qa]}get hasIcon(){return!!this.querySelector('[slot="icon"]')}get hasAvatar(){return!!this.querySelector('[slot="avatar"]')}delete(){this.readonly||this.dispatchEvent(new Event("delete",{bubbles:!0}))}render(){const e=[];return this.hasAvatar&&e.push(a`
                    <slot name="avatar"></slot>
                `),this.hasIcon&&e.push(a`
                    <slot name="icon"></slot>
                `),a`
            ${e}
            <span class="label"><slot></slot></span>
            ${this.deletable?a`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `:a``}
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex",!this.disabled&&this.matches(":first-of-type:not([disabled])")?"0":"-1")}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}ti([i({type:Boolean,reflect:!0})],ri.prototype,"deletable",2),ti([i({type:Boolean,reflect:!0})],ri.prototype,"disabled",2),ti([i({type:Boolean,reflect:!0})],ri.prototype,"readonly",2),customElements.define("sp-tag",ri);var oi=r`
:host{--spectrum-taggroup-tag-gap-x:var(--spectrum-global-dimension-size-100);--spectrum-taggroup-tag-gap-y:var(--spectrum-global-dimension-size-100);display:inline-flex;list-style:none;margin:0;padding:0}::slotted(*){margin:calc(var(
--spectrum-taggroup-tag-gap-y,
var(--spectrum-global-dimension-size-100)
)/2) calc(var(
--spectrum-taggroup-tag-gap-x,
var(--spectrum-global-dimension-size-100)
)/2)}
`,si=Object.defineProperty,ai=Object.getOwnPropertyDescriptor;class ii extends(k(s)){constructor(){super(),this.rovingTabindexController=new t(this,{focusInIndex:e=>e.findIndex((e=>!e.disabled&&e.deletable)),elements:()=>this.tags,isFocusableElement:e=>!e.disabled&&e.deletable}),this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleKeydown=e=>{const{code:t}=e;if("PageUp"!==t&&"PageDown"!==t)return;const r=(e,t)=>e[(e.length+t)%e.length],o=[...this.getRootNode().querySelectorAll("sp-tags")];if(o.length<2)return;e.preventDefault();const s="PageUp"===t?-1:1;let a=o.indexOf(this)+s,i=r(o,a);for(;!i.tags.length;)a+=s,i=r(o,a);i.focus()},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[oi]}get tags(){return this.defaultNodes.filter((e=>e instanceof ri))}focus(){this.rovingTabindexController.focus()}handleSlotchange(){this.rovingTabindexController.clearElementCache()}render(){return a`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}firstUpdated(){this.hasAttribute("role")||this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","Tags")}}((e,t,r,o)=>{for(var s,a=o>1?void 0:o?ai(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);o&&a&&si(t,r,a)})([p("")],ii.prototype,"defaultNodes",2),customElements.define("sp-tags",ii),customElements.define("sp-textfield",D);var li=r`
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
`,ci=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,di=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?ni(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&ci(t,r,a),a};class ui extends(v(s,{validSizes:["xxs","xs","s","m","l"],defaultSize:"s"})){constructor(){super(...arguments),this.cover=!1}static get styles(){return[li]}render(){return a`
            ${this.background?a`
                      <div
                          class="background"
                          style="background: ${this.background}"
                      ></div>
                  `:a``}
            <slot></slot>
        `}}di([i({type:String,reflect:!0})],ui.prototype,"background",2),di([i({type:Boolean,reflect:!0})],ui.prototype,"cover",2),customElements.define("sp-thumbnail",ui);var pi=r`
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
`,hi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,bi=(e,t,r,o)=>{for(var s,a=o>1?void 0:o?mi(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(a=(o?s(t,r,a):s(a))||a);return o&&a&&hi(t,r,a),a};class gi extends HTMLElement{disconnectedCallback(){this.dispatchEvent(new Event("disconnected"))}}customElements.define("tooltip-proxy",gi);const vi=class extends s{constructor(){super(),this._tooltipId="sp-tooltip-describedby-helper-"+vi.instanceCount++,this.selfManaged=!1,this.offset=6,this.hadTooltipId=!1,this.open=!1,this.placement="top",this._variant="",this.abortOverlay=()=>{},this.openOverlay=()=>{const e=this.parentElement,t=new Promise((e=>{this.abortOverlay=e}));this.closeOverlayCallback=w(e,"hover",this,{abortPromise:t,offset:this.offset,placement:this.placement})},this.closeOverlay=async()=>{this.abortOverlay&&this.abortOverlay(!0),this.closeOverlayCallback&&((await this.closeOverlayCallback)(),delete this.closeOverlayCallback)},this.addEventListener("sp-overlay-query",this.onOverlayQuery)}static get styles(){return[pi]}get variant(){return this._variant}set variant(e){if(e!==this.variant){if(["info","positive","negative"].includes(e))return this.setAttribute("variant",e),void(this._variant=e);this.removeAttribute("variant"),this._variant=""}}onOverlayQuery(e){!e.target||e.target!==this||(e.detail.overlayContentTipElement=this.tipElement)}generateProxy(){this._proxy||(this._proxy=document.createElement("tooltip-proxy"),this._proxy.id=this._tooltipId,this._proxy.hidden=!0,this._proxy.slot="hidden-tooltip-content",this._proxy.setAttribute("role","tooltip"),this._proxy.addEventListener("disconnected",this.closeOverlay))}overlayWillOpenCallback({trigger:e}){this.setAttribute("aria-hidden","true"),this.generateProxy(),this._proxy.textContent=this.textContent;const t=e.getAttribute("aria-describedby")||"";this.hadTooltipId=t.search(this._tooltipId)>-1,this.insertAdjacentElement("beforebegin",this._proxy),!this.hadTooltipId&&(t?e.setAttribute("aria-describedby",`${t} ${this._tooltipId}`):e.setAttribute("aria-describedby",`${this._tooltipId}`))}overlayOpenCancelledCallback({trigger:e}){this.overlayCloseCallback({trigger:e})}overlayCloseCallback({trigger:e}){let t=(e.getAttribute("aria-describedby")||"").split(/\s+/);this.hadTooltipId||(t=t.filter((e=>e!==this._tooltipId))),t.length?e.setAttribute("aria-describedby",t.join(" ")):e.removeAttribute("aria-describedby"),this.removeAttribute("aria-hidden"),this.removeProxy()}removeProxy(){this._proxy.remove()}manageTooltip(){const e=this.parentElement;this.selfManaged?(this.slot&&(this.previousSlot=this.slot),this.slot="self-managed-tooltip",e.addEventListener("pointerenter",this.openOverlay),e.addEventListener("focusin",this.openOverlay),e.addEventListener("pointerleave",this.closeOverlay),e.addEventListener("focusout",this.closeOverlay)):(this.previousSlot?this.slot=this.previousSlot:"self-managed-tooltip"===this.slot&&this.removeAttribute("slot"),e.removeEventListener("pointerenter",this.openOverlay),e.removeEventListener("focusin",this.openOverlay),e.removeEventListener("pointerleave",this.closeOverlay),e.removeEventListener("focusout",this.closeOverlay))}render(){return a`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `}async update(e){e.has("open")&&this.selfManaged&&(this.open?this.openOverlay():this.closeOverlay()),this.generateProxy(),super.update(e)}updated(e){super.updated(e),e.has("selfManaged")&&this.manageTooltip()}};let fi=vi;fi.instanceCount=0,bi([i({type:Boolean,attribute:"self-managed"})],fi.prototype,"selfManaged",2),bi([i({type:Number,reflect:!0})],fi.prototype,"offset",2),bi([i({type:Boolean,reflect:!0})],fi.prototype,"open",2),bi([i({reflect:!0})],fi.prototype,"placement",2),bi([f("#tip")],fi.prototype,"tipElement",2),bi([i({type:String})],fi.prototype,"variant",1),customElements.define("sp-tooltip",fi);
//# sourceMappingURL=d781aa71.js.map
