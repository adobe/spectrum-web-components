import{T as t,S as e,y as r,_ as o,e as i,x as s,n as a,b as l,a as c}from"./88c439b5.js";import{r as n}from"./e50c5e8d.js";import{e as d,a as u,t as p,b as h,o as m,O as b,l as v,i as g,S as f,c as x,L as y,f as k,F as w,g as z}from"./3a4b24df.js";import{g as C,S}from"./beab9093.js";import"./98067b40.js";import{o as A,c as E,P as $,a as L}from"./d1919e69.js";import"./da80d70a.js";import"./c1f278d9.js";import"./0d809998.js";import{h as q}from"./7bace642.js";import{b as _,l as M}from"./d0167bd0.js";import{a as P,c as I,u as B,m as D,s as H,r as F,t as T,M as U,T as O,b as N}from"./b31837aa.js";import"./ee206ec0.js";import{f as R,O as j}from"./8f4ec8bf.js";import{I as V}from"./c0bdfd0a.js";import"./26f5c2ac.js";import"./aa514e9d.js";import"./8843c3de.js";import"./db297d80.js";import"./012524c2.js";import"./4ca40cfd.js";import"./031c2c73.js";import"./be7ab3e9.js";import"./1fd16eac.js";const K=(t,e,r)=>{const o=new Map;for(let i=e;i<=r;i++)o.set(t[i],i);return o},X=d(class extends u{constructor(t){if(super(t),t.type!==p.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let o;void 0===r?r=e:void 0!==e&&(o=e);const i=[],s=[];let a=0;for(const e of t)i[a]=o?o(e,a):a,s[a]=r(e,a),a++;return{values:s,keys:i}}render(t,e,r){return this.dt(t,e,r).values}update(e,[r,o,i]){var s;const a=P(e),{values:l,keys:c}=this.dt(r,o,i);if(!Array.isArray(a))return this.ct=c,l;const n=null!==(s=this.ct)&&void 0!==s?s:this.ct=[],d=[];let u,p,h=0,m=a.length-1,b=0,v=l.length-1;for(;h<=m&&b<=v;)if(null===a[h])h++;else if(null===a[m])m--;else if(n[h]===c[b])d[b]=I(a[h],l[b]),h++,b++;else if(n[m]===c[v])d[v]=I(a[m],l[v]),m--,v--;else if(n[h]===c[v])d[v]=I(a[h],l[v]),B(e,d[v+1],a[h]),h++,v--;else if(n[m]===c[b])d[b]=I(a[m],l[b]),B(e,a[h],a[m]),m--,b++;else if(void 0===u&&(u=K(c,b,v),p=K(n,h,m)),u.has(n[h]))if(u.has(n[m])){const t=p.get(c[b]),r=void 0!==t?a[t]:null;if(null===r){const t=B(e,a[h]);I(t,l[b]),d[b]=t}else d[b]=I(r,l[b]),B(e,a[h],r),a[t]=null;b++}else D(a[m]),m--;else D(a[h]),h++;for(;b<=v;){const t=B(e,d[v+1]);I(t,l[b]),d[b++]=t}for(;h<=m;){const t=a[h++];null!==t&&D(t)}return this.ct=c,H(e,d),t}}),G=d(class extends u{constructor(t){var e;if(super(t),t.type!==p.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const o=t[r];return null==o?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[r]){const{style:o}=e.element;if(void 0===this.ut){this.ut=new Set;for(const t in r)this.ut.add(t);return this.render(r)}this.ut.forEach((t=>{null==r[t]&&(this.ut.delete(t),t.includes("-")?o.removeProperty(t):o[t]="")}));for(const t in r){const e=r[t];null!=e&&(this.ut.add(t),t.includes("-")?o.setProperty(t,e):o[t]=e)}return t}}),Y=(t,e)=>{var r,o;const i=t._$AN;if(void 0===i)return!1;for(const t of i)null===(o=(r=t)._$AO)||void 0===o||o.call(r,e,!1),Y(t,e);return!0},W=t=>{let e,r;do{if(void 0===(e=t._$AM))break;r=e._$AN,r.delete(t),t=e}while(0===(null==r?void 0:r.size))},Z=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(void 0===r)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),tt(e)}};function Q(t){void 0!==this._$AN?(W(this),this._$AM=t,Z(this)):this._$AM=t}function J(t,e=!1,r=0){const o=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(o))for(let t=r;t<o.length;t++)Y(o[t],!1),W(o[t]);else null!=o&&(Y(o,!1),W(o));else Y(this,t)}const tt=t=>{var e,r,o,i;t.type==p.CHILD&&(null!==(e=(o=t)._$AP)&&void 0!==e||(o._$AP=J),null!==(r=(i=t)._$AQ)&&void 0!==r||(i._$AQ=Q))};class et extends u{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),Z(this),this.isConnected=t._$AU}_$AO(t,e=!0){var r,o;t!==this.isConnected&&(this.isConnected=t,t?null===(r=this.reconnected)||void 0===r||r.call(this):null===(o=this.disconnected)||void 0===o||o.call(this)),e&&(Y(this,t),W(this))}setValue(t){if(F(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}function rt(t){return"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.platform)}function ot(){return rt(/^iPhone/)}function it(){return rt(/^iPad/)||rt(/^Mac/)&&navigator.maxTouchPoints>1}function st(){return t=/Android/,"undefined"!=typeof window&&null!=window.navigator&&t.test(window.navigator.userAgent);var t}var at=n`:host([disabled]) ::slotted([slot=trigger]){pointer-events:none}#overlay-content{display:none}`;const lt={touch:"Double tap and long press for additional options",keyboard:"Press Space or Alt+Down Arrow for additional options",mouse:"Click and hold for additional options"};class ct extends e{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1,this.hasLongpressContent=!1,this._longpressId="longpress-describedby-descriptor",this.abortOverlay=()=>{},this.openStatePromise=Promise.resolve()}static get styles(){return[at]}handleClose(t){t&&t.detail.interaction!==this.open&&t.detail.interaction!==this.type||this.removeAttribute("open")}render(){return r`<slot id="trigger" @click="${this.onTrigger}" @longpress="${this.onTrigger}" @mouseenter="${this.onTrigger}" @mouseleave="${this.onTrigger}" @focusin="${this.onTrigger}" @focusout="${this.onTrigger}" @sp-closed="${this.handleClose}" @slotchange="${this.onTargetSlotChange}" name="trigger"></slot><div id="overlay-content"><slot @slotchange="${this.onClickSlotChange}" name="click-content"></slot><slot @slotchange="${this.onLongpressSlotChange}" name="longpress-content"></slot><slot @slotchange="${this.onHoverSlotChange}" name="hover-content"></slot><slot name="${this._longpressId}"></slot></div>`}updated(t){super.updated(t),this.disabled&&t.has("disabled")?this.closeAllOverlays():(t.has("open")&&this.manageOpen(),t.has("hasLongpressContent")&&this.manageLongpressDescriptor())}manageLongpressDescriptor(){const t=this.querySelector('[slot="trigger"]'),e=t.getAttribute("aria-describedby");let r=e?e.split(/\s+/):[];if(this.hasLongpressContent){this.longpressDescriptor||(this.longpressDescriptor=document.createElement("div"),this.longpressDescriptor.id=this._longpressId,this.longpressDescriptor.slot=this._longpressId);const t=ot()||it()||st()?"touch":"keyboard";this.longpressDescriptor.textContent=lt[t],this.appendChild(this.longpressDescriptor),r.push(this._longpressId)}else this.longpressDescriptor&&this.longpressDescriptor.remove(),r=r.filter((t=>t!==this._longpressId));r.length?t.setAttribute("aria-describedby",r.join(" ")):t.removeAttribute("aria-describedby")}closeAllOverlays(){this.abortOverlay&&this.abortOverlay(!0),["closeClickOverlay","closeHoverOverlay","closeLongpressOverlay"].forEach((async t=>{const e=this[t];null!=e&&(delete this[t],(await e)())}))}manageOpen(){var t;({click:()=>this.onTriggerClick(),hover:()=>this.onTriggerMouseEnter(),longpress:()=>this.onTriggerLongpress(),none:()=>this.closeAllOverlays()})[null!==(t=this.open)&&void 0!==t?t:"none"]()}async openOverlay(t,e,r,o){return this.openStatePromise=new Promise((t=>this.openStateResolver=t)),this.addEventListener("sp-opened",(()=>{this.openStateResolver()}),{once:!0}),ct.openOverlay(t,e,r,o)}get overlayOptions(){return{offset:this.offset,placement:this.placement,receivesFocus:this.type&&"inline"!==this.type?"auto":void 0}}onTrigger(t){if(!this.disabled)switch(t.type){case"mouseenter":case"focusin":return void(!this.open&&this.hoverContent&&(this.open="hover"));case"mouseleave":case"focusout":return void("hover"===this.open&&this.handleClose());case"click":return void(this.clickContent?this.open=t.type:this.closeHoverOverlay&&t.preventDefault());case"longpress":return void(this.longpressContent&&(this._longpressEvent=t,this.open=t.type))}}prepareToFocusOverlayContent(t){if("modal"!==this.type)return;R(t)||(t.tabIndex=0)}async onTriggerClick(){if(!this.targetContent||!this.clickContent||this.closeClickOverlay)return;const{targetContent:t,clickContent:e}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(e),this.closeClickOverlay=this.openOverlay(t,this.type?this.type:"click",e,this.overlayOptions)}async onTriggerLongpress(){var t,e;if(!this.targetContent||!this.longpressContent||this.closeLongpressOverlay)return;const{targetContent:r,longpressContent:o}=this;this.closeAllOverlays(),this.prepareToFocusOverlayContent(o);const i="keyboard"!==(null===(e=null===(t=this._longpressEvent)||void 0===t?void 0:t.detail)||void 0===e?void 0:e.source);this.closeLongpressOverlay=this.openOverlay(r,this.type?this.type:"longpress",o,Object.assign(Object.assign({},this.overlayOptions),{receivesFocus:"auto",notImmediatelyClosable:i})),this._longpressEvent=void 0}async onTriggerMouseEnter(){if(!this.targetContent||!this.hoverContent||this.closeHoverOverlay)return;const t=new Promise((t=>{this.abortOverlay=t})),{targetContent:e,hoverContent:r}=this;this.closeHoverOverlay=this.openOverlay(e,"hover",r,Object.assign({abortPromise:t},this.overlayOptions))}onClickSlotChange(t){this.clickContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onLongpressSlotChange(t){this.longpressContent=this.extractSlotContentFromEvent(t),this.hasLongpressContent=!!this.longpressContent||!!this.closeLongpressOverlay,this.manageOpen()}onHoverSlotChange(t){this.hoverContent=this.extractSlotContentFromEvent(t),this.manageOpen()}onTargetSlotChange(t){this.targetContent=this.extractSlotContentFromEvent(t)}extractSlotContentFromEvent(t){return t.target.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.openStatePromise,t}disconnectedCallback(){this.closeAllOverlays(),super.disconnectedCallback()}}ct.openOverlay=async(t,e,r,o)=>A(t,e,r,o),o([i({reflect:!0})],ct.prototype,"placement",void 0),o([i()],ct.prototype,"type",void 0),o([i({type:Number,reflect:!0})],ct.prototype,"offset",void 0),o([i({reflect:!0})],ct.prototype,"open",void 0),o([i({type:Boolean,reflect:!0})],ct.prototype,"disabled",void 0),o([T()],ct.prototype,"hasLongpressContent",void 0);document.querySelector("sp-tabs").addEventListener("change",(t=>{const e=t.target,{selected:r}=e,{pathname:o}=location,i=o.search("api")>-1;switch(r){case"api":{if(i)return;const t=(o+"/api/").replace("//a","/a");history.pushState({},document.title,t);break}case"examples":{if(!i)return;const t=o.split("/api")[0]+"/";history.pushState({},document.title,t);break}}}));var nt=n`:host{--spectrum-accordion-item-title-padding-y:var(
--spectrum-global-dimension-size-150
);--spectrum-accordion-animation-duration:var(
--spectrum-global-animation-duration-100,130ms
)}:host{display:block;list-style:none;margin:0;padding:0}`;class dt extends h{constructor(){super(...arguments),this.allowMultiple=!1}static get styles(){return[nt]}get items(){return[...this.defaultNodes||[]].filter((t=>void 0!==t.tagName))}focus(){this.focusElement!==this&&super.focus()}get focusElement(){const t=this.items;if(t&&!t.length)return this;let e=0;for(;e<t.length&&t[e]&&t[e].disabled;)e+=1;return t[e]?t[e]:this}startListeningToKeyboard(){const t=this.items;t&&!t.length||this.addEventListener("keydown",this.handleKeydown)}stopListeningToKeyboard(){this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;if("ArrowDown"!==e&&"ArrowUp"!==e)return;t.preventDefault();const r="ArrowDown"===e?1:-1;this.focusItemByOffset(r)}focusItemByOffset(t){const e=this.items,r=e.indexOf(C(this));let o=r,i=e[o];for(;i&&(i.disabled||o===r);)o=(e.length+o+t)%e.length,i=e[o];i&&!i.disabled&&o!==r&&i.focus()}async onToggle(t){if(await 0,this.allowMultiple||t.defaultPrevented)return;const e=t.target,r=[...this.items];r&&!r.length||r.forEach((t=>{t!==e&&(t.open=!1)}))}render(){return r`<slot></slot>`}firstUpdated(t){super.firstUpdated(t),this.addEventListener("focusin",this.startListeningToKeyboard),this.addEventListener("focusout",this.stopListeningToKeyboard),this.addEventListener("sp-accordion-item-toggle",this.onToggle)}}o([i({type:Boolean,reflect:!0,attribute:"allow-multiple"})],dt.prototype,"allowMultiple",void 0),o([m()],dt.prototype,"defaultNodes",void 0),customElements.define("sp-accordion",dt);var ut=n`:host([dir=ltr]) #indicator{left:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) #indicator{right:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) #indicator{transform:matrix(-1,0,0,1,0,0)}#indicator{display:block;position:absolute;transition:transform ease var(--spectrum-accordion-animation-duration)}:host{border-bottom:var(
--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)
) solid transparent;display:list-item;margin:0;position:relative;z-index:inherit}:host(:first-of-type){border-top:var(
--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)
) solid transparent}#heading{box-sizing:border-box;margin:0}:host([dir=ltr]) #header{padding-left:calc(var(--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)) + var(--spectrum-accordion-icon-height,var(--spectrum-global-dimension-size-125)) + var(--spectrum-accordion-icon-gap,var(--spectrum-global-dimension-size-100)) + var(--spectrum-accordion-item-border-left-size,var(--spectrum-alias-border-size-thick)))}:host([dir=rtl]) #header{padding-right:calc(var(--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)) + var(--spectrum-accordion-icon-height,var(--spectrum-global-dimension-size-125)) + var(--spectrum-accordion-icon-gap,var(--spectrum-global-dimension-size-100)) + var(--spectrum-accordion-item-border-left-size,var(--spectrum-alias-border-size-thick)))}:host([dir=ltr]) #header{padding-right:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=rtl]) #header{padding-left:var(
--spectrum-accordion-item-padding-x,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr]) #header{text-align:left}:host([dir=rtl]) #header{text-align:right}#header{align-items:center;-webkit-appearance:none;appearance:none;background-color:inherit;border:0;box-sizing:border-box;cursor:pointer;display:flex;font-family:inherit;font-size:var(
--spectrum-accordion-item-title-text-size,var(--spectrum-global-dimension-font-size-50)
);font-weight:500;justify-content:flex-start;letter-spacing:calc(var(
--spectrum-accordion-item-title-tracking,
var(--spectrum-global-font-letter-spacing-medium)
)/100);line-height:var(
--spectrum-accordion-text-line-height,var(--spectrum-alias-component-text-line-height)
);margin:0;padding-bottom:var(--spectrum-accordion-item-title-padding-y);padding-top:var(--spectrum-accordion-item-title-padding-y);position:relative;text-overflow:ellipsis;text-transform:uppercase;width:100%}#header:focus{outline:0}:host([dir=ltr]) #header:focus:after{left:0}:host([dir=rtl]) #header:focus:after{right:0}#header:focus:after{bottom:calc(var(
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
);padding-top:0}:host([dir=ltr][open])>#heading>#indicator{transform:rotate(90deg)}:host([dir=rtl][open])>#heading>#indicator{transform:matrix(-1,0,0,1,0,0) rotate(90deg)}:host([dir=ltr][open])>#indicator{transform:rotate(90deg)}:host([dir=rtl][open])>#indicator{transform:matrix(-1,0,0,1,0,0) rotate(90deg)}:host([open])>#content{display:block}:host([disabled]) #header{cursor:default}:host{border-color:var(
--spectrum-accordion-border-color,var(--spectrum-global-color-gray-300)
)}#indicator{color:var(
--spectrum-accordion-icon-color,var(--spectrum-global-color-gray-600)
)}#header{color:var(
--spectrum-accordion-text-color,var(--spectrum-global-color-gray-700)
)}#header:hover{background-color:var(
--spectrum-accordion-item-background-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-accordion-text-color-hover,var(--spectrum-global-color-gray-900)
)}#header:hover+#indicator{color:var(
--spectrum-accordion-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}#header.focus-visible:after{background-color:var(
--spectrum-accordion-item-border-left-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#header:focus-visible:after{background-color:var(
--spectrum-accordion-item-border-left-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([open]) #header:hover{background-color:transparent}:host([disabled]) #header,:host([disabled]) #header.focus-visible,:host([disabled]) #header:hover{background-color:transparent;color:var(
--spectrum-accordion-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]) #header,:host([disabled]) #header:focus-visible,:host([disabled]) #header:hover{background-color:transparent;color:var(
--spectrum-accordion-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]) #header+#indicator{color:var(
--spectrum-accordion-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host{--spectrum-accordion-item-header-height:46px}#indicator{top:calc(50% - var(--spectrum-accordion-icon-height,var(--spectrum-global-dimension-size-125))/ 2)}#heading{height:auto;position:relative}#header{min-height:calc(100% - var(--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)))}:host([open])>#header:after{height:calc(100% - var(--spectrum-accordion-item-border-size,var(--spectrum-alias-border-size-thin)))}`;class pt extends h{constructor(){super(),this.open=!1,this.label="",this.disabled=!1,this.addEventListener("keydown",this.onKeyDown)}static get styles(){return[ut,E]}get focusElement(){return this.shadowRoot.querySelector("#header")}onKeyDown(t){this.disabled||"Enter"!==t.code&&"Space"!==t.code||(t.preventDefault(),this.toggle())}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open;this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return r`<h3 id="heading"><button id="header" @click="${this.onClick}" aria-expanded="${this.open}" aria-controls="content">${this.label}</button><sp-icon-chevron100 id="indicator" class="spectrum-UIIcon-ChevronRight100"></sp-icon-chevron100></h3><div id="content" role="region" aria-labelledby="header"><slot></slot></div>`}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}o([i({type:Boolean,reflect:!0})],pt.prototype,"open",void 0),o([i({type:String,reflect:!0})],pt.prototype,"label",void 0),o([i({type:Boolean,reflect:!0})],pt.prototype,"disabled",void 0),customElements.define("sp-accordion-item",pt);var ht=n`:host{--spectrum-actionbar-height:var(
--spectrum-global-dimension-size-600
);--spectrum-actionbar-padding-left:var(
--spectrum-global-dimension-size-200
);--spectrum-actionbar-padding-right:calc(var(--spectrum-global-dimension-size-200)/2);--spectrum-actionbar-margin-x:var(--spectrum-global-dimension-size-200);--spectrum-actionbar-min-width:280px;--spectrum-actionbar-max-width:960px}:host{bottom:0;box-sizing:border-box;display:flex;height:0;justify-content:center;opacity:0;overflow:hidden;padding:0 var(--spectrum-actionbar-margin-x);pointer-events:none;transition:height var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out;z-index:1}:host([open]){height:calc(var(--spectrum-actionbar-height,var(--spectrum-global-dimension-size-600)) + var(--spectrum-actionbar-margin-x)*2);opacity:1}:host([dir=ltr][variant=sticky]){left:0}:host([dir=rtl][variant=sticky]){right:0}:host([dir=ltr][variant=sticky]){right:0}:host([dir=rtl][variant=sticky]){left:0}:host([variant=sticky]){position:sticky}:host([flexible]) #popover{width:auto}:host([variant=fixed]){position:fixed}:host([dir=ltr]) #popover{padding-left:var(
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
);pointer-events:auto;position:relative;width:100%}`;const mt=["sticky","fixed"];class bt extends e{constructor(){super(...arguments),this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[ht]}set variant(t){if(t!==this.variant){if(mt.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}render(){return r`<sp-popover ?open="${this.open}" id="popover"><slot></slot></sp-popover>`}}o([i({type:Boolean,reflect:!0})],bt.prototype,"flexible",void 0),o([i({type:Boolean,reflect:!0})],bt.prototype,"open",void 0),o([i({type:String,reflect:!0})],bt.prototype,"variant",null),customElements.define("sp-action-bar",bt);var vt=n`:host{--spectrum-actiongroup-button-gap-reset:0;--spectrum-actiongroup-quiet-compact-button-gap:var(
--spectrum-global-dimension-size-25
)}:host{display:flex;flex-wrap:wrap}::slotted(*){flex-shrink:0}:host(:not([vertical]):not([compact])){margin-top:calc(var(
--spectrum-actiongroup-button-gap-y,
var(--spectrum-global-dimension-size-100)
)*-1)}:host(:not([vertical]):not([compact])) ::slotted(*){flex-shrink:0;margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]:not([vertical]):not([compact])) ::slotted(:not(:last-child)){margin-right:var(
--spectrum-actiongroup-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]:not([vertical]):not([compact])) ::slotted(:not(:last-child)){margin-left:var(
--spectrum-actiongroup-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([vertical]){display:inline-flex;flex-direction:column}:host([dir=ltr][vertical]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][vertical]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([vertical]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][vertical][vertical]){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][vertical][vertical]){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([vertical][vertical]){margin-top:var(
--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][compact][quiet]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-quiet-compact-button-gap
)}:host([dir=rtl][compact][quiet]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-quiet-compact-button-gap
)}:host([compact][quiet]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=ltr][compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-left:var(
--spectrum-actiongroup-button-gap-reset
)}:host([dir=rtl][compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-right:var(
--spectrum-actiongroup-button-gap-reset
)}:host([compact][quiet][vertical]) ::slotted(:not(:first-child)){margin-top:var(
--spectrum-actiongroup-quiet-compact-button-gap
)}:host([compact]:not([quiet])){flex-wrap:nowrap}:host([compact]:not([quiet])) ::slotted(*){border-radius:0;position:relative;z-index:0}:host([dir=ltr][compact]:not([quiet])) ::slotted(:first-child){border-top-left-radius:var(
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
)*-1/2)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){border-top-right-radius:var(
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
)*-1/2)}:host([dir=ltr][compact]:not([quiet])) ::slotted(:last-child){margin-right:0}:host([dir=rtl][compact]:not([quiet])) ::slotted(:last-child){margin-left:0}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([dir=ltr][compact]:not([quiet])) ::slotted(:not(:first-child)){margin-left:calc(var(
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
)*-1/2)}:host([compact][vertical]:not([quiet])) ::slotted(*){border-radius:0}:host([compact][vertical]:not([quiet])) ::slotted(:not(:first-child)){margin-bottom:calc(var(
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
)*-1/2)}:host([justified]) ::slotted(*){flex:1}:host([dir][compact][vertical]) ::slotted(:nth-child(n)){margin-left:0;margin-right:0}:host([justified]) ::slotted(:not([role])),:host([vertical]) ::slotted(:not([role])){align-items:stretch;display:flex;flex-direction:column}:host([compact]:not([quiet])) ::slotted(:not([role])){--overriden-border-radius:0;--spectrum-actionbutton-s-quiet-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-s-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-m-quiet-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-m-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-l-quiet-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-l-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-xl-quiet-textonly-border-radius:var(
--overriden-border-radius
);--spectrum-actionbutton-xl-textonly-border-radius:var(
--overriden-border-radius
)}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-border-radius-regular) var(--spectrum-alias-border-radius-regular) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 0 var(--spectrum-alias-border-radius-regular) var(--spectrum-alias-border-radius-regular)}:host([dir=ltr][compact]:not([quiet]):not([vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-border-radius-regular) 0 0 var(--spectrum-alias-border-radius-regular)}:host([dir=rtl][compact]:not([quiet]):not([vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:0 var(--spectrum-alias-border-radius-regular) var(--spectrum-alias-border-radius-regular) 0}:host([dir=ltr][compact]:not([quiet]):not([vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 var(--spectrum-alias-border-radius-regular) var(--spectrum-alias-border-radius-regular) 0}:host([dir=rtl][compact]:not([quiet]):not([vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:var(--spectrum-alias-border-radius-regular) 0 0 var(--spectrum-alias-border-radius-regular)}`;const gt=[];class ft extends e{constructor(){super(...arguments),this.buttons=[],this._buttonSelector="sp-action-button",this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this.selected=gt,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleKeydown=t=>{const{code:e}=t;if(!["ArrowUp","ArrowLeft","ArrowRight","ArrowDown","End","Home","PageUp","PageDown"].includes(e))return;const r=this.getRootNode().activeElement;if(!r)return;let o=this.buttons.indexOf(r);if(-1===o)return;const i=(t,e)=>t[(t.length+e)%t.length],s=t=>{for(o+=t;i(this.buttons,o).disabled;)o+=t};switch(e){case"ArrowUp":s(-1);break;case"ArrowLeft":s(this.isLTR?-1:1);break;case"ArrowRight":s(this.isLTR?1:-1);break;case"ArrowDown":s(1);break;case"End":o=this.buttons.length,s(-1);break;case"Home":o=-1,s(1);break;case"PageUp":case"PageDown":default:const r=[...this.getRootNode().querySelectorAll("sp-action-group")];if(r.length<2)return;t.preventDefault();const a="PageUp"===e?-1:1;let l=r.indexOf(this)+a,c=i(r,l);for(;!c.buttons.length;)l+=a,c=i(r,l);return void c.focus()}t.preventDefault();const a=i(this.buttons,o);r.tabIndex=-1,a.tabIndex=0,a.focus()},this.handleFocusout=t=>{const{relatedTarget:e}=t;if(!e||!this.contains(e)){const t=this.buttons.find((t=>this.selected.length?t.selected:!t.disabled));t&&(t.tabIndex=0)}this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.manageButtons=()=>{const t=this.shadowRoot.querySelector("slot");if(!t)return;const e=t.assignedElements({flatten:!0}).reduce(((t,e)=>{if(e.matches(this._buttonSelector))t.push(e);else{const r=Array.from(e.querySelectorAll(`:scope > ${this._buttonSelector}`));t.push(...r)}return t}),[]);this.buttons=e;const r=[];this.buttons.forEach((t=>{t.selected&&r.push(t.value)})),this.selected=this.selected.concat(r),this.manageChildren(),this.manageSelects()}}static get styles(){return[vt]}dispatchChange(t){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.selected=t,this.buttons.map((t=>{t.selected=this.selected.includes(t.value)})))}setSelected(t){if(t===this.selected)return;const e=this.selected;this.selected=t,this.dispatchChange(e)}focus(t){if(!this.buttons.length)return;const e=this.buttons.find((t=>this.selected?t.selected:!t.disabled));e&&e.focus(t)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute("aria-checked","false")}))}handleClick(t){const e=t.target;if(void 0!==e.value)switch(this.selects){case"single":this.deselectSelectedButtons(),e.selected=!0,e.tabIndex=0,e.setAttribute("aria-checked","true"),this.setSelected([e.value]),e.focus();break;case"multiple":{const t=[...this.selected];e.selected=!e.selected,e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected?t.push(e.value):t.splice(this.selected.indexOf(e.value),1),this.setSelected(t),this.buttons.forEach((t=>{t.tabIndex=-1})),e.tabIndex=0;break}}}async manageSelects(){if(!this.buttons.length)return;const t=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const e=[];let r;const o=t.map((async t=>{await t.updateComplete,t.setAttribute("role","radio"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.tabIndex=t.selected?0:-1,t.selected&&e.push(t),r||t.disabled||(r=t)}));await Promise.all(o),e.length?e[0].tabIndex=0:r&&(r.tabIndex=0);const i=e.map((t=>t.value));this.selected=i||gt;break}case"multiple":{this.setAttribute("role","group");const e=[],r=[],o=t.map((async t=>{await t.updateComplete,t.setAttribute("role","checkbox"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.tabIndex=-1,t.selected&&(e.push(t.value),r.push(t))}));await Promise.all(o);const i=e.length?e:gt;this.selected=i,r.length?r[0].tabIndex=0:this.buttons[0].tabIndex=0;break}default:if(!this.selected.length){this.buttons.forEach((t=>{t.setAttribute("role","button"),t.tabIndex=-1})),this.buttons[0].tabIndex=0,this.removeAttribute("role");break}{const e=[],r=t.map((async t=>{await t.updateComplete,t.setAttribute("aria-checked",t.selected?"true":"false"),t.setAttribute("role","button"),t.tabIndex=-1,t.selected&&e.push(t)}));await Promise.all(r),e[0].tabIndex=0,this.selected=e.map((t=>t.value))}}}render(){return r`<slot role="presentation" @slotchange="${this.manageButtons}"></slot>`}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick),this.addEventListener("focusin",this.handleFocusin)}updated(t){super.updated(t),t.has("selects")&&(this.manageSelects(),this.manageChildren()),(t.has("quiet")&&this.quiet||t.has("emphasized")&&this.emphasized)&&this.manageChildren(),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(){this.buttons.forEach((t=>{t.quiet=this.quiet,t.emphasized=this.emphasized,t.selected=this.selected.includes(t.value)}))}connectedCallback(){super.connectedCallback(),this.observer||(this.observer=new MutationObserver(this.manageButtons),this.manageButtons()),this.observer.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){this.observer.disconnect(),super.disconnectedCallback()}}o([i({type:Boolean,reflect:!0})],ft.prototype,"compact",void 0),o([i({type:Boolean,reflect:!0})],ft.prototype,"emphasized",void 0),o([i({type:Boolean,reflect:!0})],ft.prototype,"justified",void 0),o([i({type:String})],ft.prototype,"label",void 0),o([i({type:Boolean,reflect:!0})],ft.prototype,"quiet",void 0),o([i({type:String})],ft.prototype,"selects",void 0),o([i({type:Boolean,reflect:!0})],ft.prototype,"vertical",void 0),o([i({type:Array})],ft.prototype,"selected",void 0),customElements.define("sp-action-group",ft);var xt=n`:host{display:inline-flex}:host([quiet]){min-width:0}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{display:none;max-width:none;width:auto}:host([dir=ltr]) .icon,:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=rtl]) .icon,:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir]) slot[icon-only] .icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-icononly-padding-left-adjusted))*-1);margin-right:calc((var(--spectrum-actionbutton-textonly-padding-right-adjusted) - var(--spectrum-actionbutton-icononly-padding-right-adjusted))*-1)}`;class yt extends(b($,"label")){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[xt]}get hasLabel(){return this.slotHasContent}get buttonContent(){return[r`<slot name="icon" slot="icon" ?icon-only="${!this.hasLabel}"><sp-icon-more class="icon"></sp-icon-more></slot><slot name="label" ?hidden="${!this.hasLabel}"></slot>`]}render(){return r`<sp-action-button quiet ?selected="${this.open}" aria-haspopup="true" aria-controls="popover" aria-expanded="${this.open?"true":"false"}" aria-label="${v(this.label||void 0)}" id="button" class="button" size="${this.size}" @blur="${this.onButtonBlur}" @click="${this.onButtonClick}" @focus="${this.onButtonFocus}" ?disabled="${this.disabled}">${this.buttonContent}</sp-action-button>`}updated(t){super.updated(t),t.has("invalid")&&(this.invalid=!1),this.quiet=!0}}o([i({type:String})],yt.prototype,"selects",void 0),customElements.define("sp-action-menu",yt);var kt=n`:host{align-items:center;display:flex;height:100%;justify-content:center;width:100%}::slotted(*){max-height:100%;max-width:100%;object-fit:contain;transition:opacity var(--spectrum-global-animation-duration-100,.13s)}.file,.folder{height:100%;margin:var(
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
)}`;class wt extends e{constructor(){super(...arguments),this.label=""}static get styles(){return[kt]}render(){return"file"===this.variant?(t=this.label,r`<svg class="file" role="img" viewBox="0 0 128 128" aria-label="${t||"File"}"><path class="fileBackground" d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"></path><path class="fileOutline" d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"></path></svg>`):"folder"===this.variant?(t=>r`<svg class="folder" role="img" viewBox="0 0 32 32" aria-label="${t||"Folder"}"><path class="folderBackground" d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"></path><path class="folderOutline" d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"></path></svg>`)(this.label):r`<slot></slot>`;var t}}o([i({type:String,reflect:!0})],wt.prototype,"variant",void 0),o([i()],wt.prototype,"label",void 0),customElements.define("sp-asset",wt);var zt=n`:host([size="50"]){--spectrum-avatar-border-radius:var(
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
)}:host{overflow:hidden}img{vertical-align:top}`;const Ct=[50,75,100,200,300,400,500,600,700];class St extends e{constructor(){super(...arguments),this.label="",this.src="",this._size=100}static get styles(){return[zt]}get size(){return this._size||100}set size(t){const e=t,r=Ct.includes(e)?e:100;if(r&&this.setAttribute("size",`${r}`),this._size===r)return;const o=this._size;this._size=r,this.requestUpdate("size",o)}render(){return r`<img class="image" alt="${v(this.label||void 0)}" src="${this.src}">`}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}o([i()],St.prototype,"label",void 0),o([i()],St.prototype,"src",void 0),o([i({type:Number,reflect:!0})],St.prototype,"size",null),customElements.define("sp-avatar",St);var At=n`:host{border-radius:var(
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
)}`;class Et extends e{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[At]}render(){return r`<div id="header"><slot name="header"></slot></div><div id="content"><slot name="content"></slot></div>`}}o([i({reflect:!0,type:String})],Et.prototype,"type",void 0),o([i({reflect:!0,type:Boolean})],Et.prototype,"corner",void 0),customElements.define("sp-banner",Et);var $t=n`:host{--spectrum-buttongroup-button-gap-reset:0}:host{display:flex}::slotted(*){flex-shrink:0}:host([dir=ltr]) ::slotted(:not(:first-of-type)){margin-left:var(
--spectrum-buttongroup-button-gap-x,var(--spectrum-global-dimension-static-size-200)
)}:host([dir=rtl]) ::slotted(:not(:first-of-type)){margin-right:var(
--spectrum-buttongroup-button-gap-x,var(--spectrum-global-dimension-static-size-200)
)}:host([vertical]){display:inline-flex;flex-direction:column}:host([dir=ltr][vertical]) ::slotted(:not(:first-of-type)){margin-left:var(
--spectrum-buttongroup-button-gap-reset
)}:host([dir=rtl][vertical]) ::slotted(:not(:first-of-type)){margin-right:var(
--spectrum-buttongroup-button-gap-reset
)}:host([vertical]) ::slotted(:not(:first-of-type)){margin-top:var(
--spectrum-buttongroup-button-gap-y,var(--spectrum-global-dimension-static-size-200)
)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}`;class Lt extends e{constructor(){super(...arguments),this.vertical=!1}static get styles(){return[$t]}render(){return r`<slot></slot>`}}o([i({type:Boolean,reflect:!0})],Lt.prototype,"vertical",void 0),customElements.define("sp-button-group",Lt);class qt extends h{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}get focusElement(){return this.inputElement}handleChange(t){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const e=new CustomEvent("change",{detail:{sourceEvent:t},bubbles:t.bubbles,cancelable:t.cancelable});this.dispatchEvent(e)}render(){return r`<input id="input" aria-labelledby="label" type="checkbox" .checked="${this.checked}" @change="${this.handleChange}">`}}o([i({type:Boolean,reflect:!0})],qt.prototype,"checked",void 0),o([i({type:Boolean,reflect:!0})],qt.prototype,"readonly",void 0),o([g("#input")],qt.prototype,"inputElement",void 0);var _t=n`:host{align-items:flex-start;max-width:100%;min-height:var(--spectrum-checkbox-height);position:relative}#input{box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:100%;height:100%;line-height:1.15;margin:0;opacity:.0001;overflow:visible;padding:0;position:absolute;width:100%;z-index:1}#input:disabled{cursor:default}#input:checked+#box:before{border-width:calc(var(--spectrum-checkbox-box-size)/2)}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input.focus-visible+#box:after{margin:calc(var(
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
);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#box{box-sizing:border-box;flex-grow:0;flex-shrink:0;height:var(--spectrum-checkbox-box-size);margin:calc((var(--spectrum-checkbox-height) - var(--spectrum-checkbox-box-size))/ 2) 0;position:relative;width:var(--spectrum-checkbox-box-size)}#box:before{border-radius:var(--spectrum-checkbox-box-border-radius);border-style:solid;border-width:var(--spectrum-checkbox-box-border-size);box-sizing:border-box;content:"";display:block;height:var(--spectrum-checkbox-box-size);position:absolute;transition:border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-checkbox-box-size);z-index:0}#box:after{border-radius:calc(var(--spectrum-checkbox-box-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;content:"";display:block;left:0;margin:var(
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
)}#input:disabled+#box:before,:host([dir]) #input:checked:disabled+#box:before{background-color:var(
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
)}}:host{display:inline-flex;vertical-align:top}:host(:focus){outline:0}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}`;var Mt=n`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Dash50{height:var(--spectrum-alias-ui-icon-dash-size-50);width:var(
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
)}`;const Pt={s:r`<sp-icon-checkmark75 id="checkmark" class="spectrum-UIIcon-Checkmark75"></sp-icon-checkmark75>`,m:r`<sp-icon-checkmark100 id="checkmark" class="spectrum-UIIcon-Checkmark100"></sp-icon-checkmark100>`,l:r`<sp-icon-checkmark200 id="checkmark" class="spectrum-UIIcon-Checkmark200"></sp-icon-checkmark200>`,xl:r`<sp-icon-checkmark300 id="checkmark" class="spectrum-UIIcon-Checkmark300"></sp-icon-checkmark300>`},It={s:r`<sp-icon-dash75 id="partialCheckmark" class="spectrum-UIIcon-Dash75"></sp-icon-dash75>`,m:r`<sp-icon-dash100 id="partialCheckmark" class="spectrum-UIIcon-Dash100"></sp-icon-dash100>`,l:r`<sp-icon-dash200 id="partialCheckmark" class="spectrum-UIIcon-Dash200"></sp-icon-dash200>`,xl:r`<sp-icon-dash300 id="partialCheckmark" class="spectrum-UIIcon-Dash300"></sp-icon-dash300>`};class Bt extends(f(qt)){constructor(){super(...arguments),this.indeterminate=!1,this.invalid=!1,this.emphasized=!1}static get styles(){return[_t,x,Mt]}render(){return r`${super.render()} <span id="box">${Pt[this.size]} ${It[this.size]} </span><label id="label"><slot></slot></label>`}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid")),t.has("indeterminate")&&(this.indeterminate?this.inputElement.setAttribute("aria-checked","mixed"):this.inputElement.removeAttribute("aria-checked"))}}o([i({type:Boolean,reflect:!0})],Bt.prototype,"indeterminate",void 0),o([i({type:Boolean,reflect:!0})],Bt.prototype,"invalid",void 0),o([i({type:Boolean,reflect:!0})],Bt.prototype,"emphasized",void 0),customElements.define("sp-checkbox",Bt);var Dt=n`:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([opened]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([enter-from=left][opened]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([enter-from=right][opened]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{align-items:center;border-radius:var(
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
)}`;class Ht extends e{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[Dt]}render(){return r`<slot></slot>`}}o([i({type:Boolean,reflect:!0})],Ht.prototype,"opened",void 0),o([i({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],Ht.prototype,"textOnly",void 0),customElements.define("sp-quick-actions",Ht);var Ft=n`:host([size=s]){--spectrum-card-quiet-body-header-margin-top:var(
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
)}:host{border:var(--spectrum-card-border-size) solid transparent;border-radius:var(--spectrum-card-border-radius);box-sizing:border-box;display:inline-flex;flex-direction:column;min-width:var(--spectrum-card-min-width);position:relative;text-decoration:none}:host(:focus){outline:0}:host(:focus) .actions,:host(:focus) .quick-actions,:host(:hover) .actions,:host(:hover) .quick-actions,:host([focused]) .actions,:host([focused]) .quick-actions,:host([selected]) .actions,:host([selected]) .quick-actions{opacity:1;pointer-events:all;visibility:visible}:host([dir=ltr]) .actions{right:var(
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
)}#cover-photo,#preview{order:-1;overflow:hidden}#preview+#cover-photo{display:none}#cover-photo ::slotted(*),#preview ::slotted(*){display:block;object-fit:cover;width:100%}:host(:not([variant=gallery])) #preview ::slotted(*){height:100%}:host([horizontal]) #preview{width:auto}sp-quick-actions{z-index:1}.title{width:var(--spectrum-card-title-width)}.subtitle{text-transform:none}`;var Tt=[_,M,n`.spectrum-Detail{font-family:var(
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
)}`];class Ut extends(y(f(k(w(e),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"]}))){constructor(){super(...arguments),this.variant="standard",this.selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.subheading="",this.handleFocusin=t=>{this.focused=!0;t.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[q,Tt,Ft]}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var t;null===(t=this.likeAnchor)||void 0===t||t.click()}handleFocusout(t){this.focused=!1;t.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;switch(e){case"Space":if(this.toggleSelected(),this.toggles)break;case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange({target:{checked:t}}){this.selected=t,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(t){this.href&&t.stopPropagation()}handlePointerdown(t){if(t.composedPath().some((t=>"a"===t.localName)))return;const e=+new Date,r=()=>{+new Date-e<200&&this.click(),this.removeEventListener("pointerup",r)};this.addEventListener("pointerup",r)}get renderHeading(){return r`<div class="title spectrum-Heading spectrum-Heading--sizeXS" id="heading"><slot name="heading">${this.heading}</slot></div>`}get renderPreviewImage(){return r`<sp-asset id="preview" variant="${v(this.asset)}"><slot name="preview"></slot></sp-asset>`}get renderCoverImage(){return r`<sp-asset id="cover-photo" variant="${v(this.asset)}"><slot name="cover-photo"></slot></sp-asset>`}get images(){const t=[];return this.hasPreview&&t.push(this.renderPreviewImage),this.hasCoverPhoto&&t.push(this.renderCoverImage),t}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return r`<div class="subtitle spectrum-Detail spectrum-Detail--sizeS"><slot name="subheading">${this.subheading}</slot></div><slot name="description"></slot>`}render(){return r`<div class="body"><div class="header">${this.renderHeading} ${"gallery"===this.variant?this.renderSubtitleAndDescription:r``} ${"quiet"!==this.variant||"s"!==this.size?r`<div class="action-button" @pointerdown="${this.stopPropagationOnHref}"><slot name="actions"></slot></div>`:r``}</div>${"gallery"!==this.variant?r`<div class="content">${this.renderSubtitleAndDescription}</div>`:r``}</div>${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):r``} ${"standard"===this.variant?r`<slot name="footer"></slot>`:r``} ${this.renderImage()} ${this.toggles?r`<sp-quick-actions class="quick-actions" @pointerdown="${this.stopPropagationOnHref}"><sp-checkbox class="checkbox" @change="${this.handleSelectedChange}" ?checked="${this.selected}"></sp-checkbox></sp-quick-actions>`:r``} ${"quiet"===this.variant&&"s"===this.size?r`<sp-quick-actions class="spectrum-QuickActions actions" @pointerdown="${this.stopPropagationOnHref}"><slot name="actions"></slot></sp-quick-actions>`:r``}`}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}o([i()],Ut.prototype,"asset",void 0),o([i({reflect:!0})],Ut.prototype,"variant",void 0),o([i({type:Boolean,reflect:!0})],Ut.prototype,"selected",void 0),o([i()],Ut.prototype,"heading",void 0),o([i({type:Boolean,reflect:!0})],Ut.prototype,"horizontal",void 0),o([g("#like-anchor")],Ut.prototype,"likeAnchor",void 0),o([i({type:Boolean,reflect:!0})],Ut.prototype,"focused",void 0),o([i({type:Boolean,reflect:!0})],Ut.prototype,"toggles",void 0),o([i()],Ut.prototype,"subheading",void 0),customElements.define("sp-card",Ut);var Ot=n`@keyframes pulse{0%{opacity:var(
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
);display:block;position:absolute}.ring:nth-child(2){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration,3s)*var(--spectrum-coachmark-animation-indicator-ring-center-delay-multiple,-.66))}.ring:nth-child(3){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration,3s)*var(--spectrum-coachmark-animation-indicator-ring-outer-delay-multiple,-1))}:host{min-height:calc(var(
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
)}.ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration,3s)*var(--spectrum-coachmark-animation-indicator-ring-inner-delay-multiple,-.5))}:host([quiet]){min-height:calc(var(
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
)}:host([quiet]) .ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration,3s)*var(--spectrum-coachmark-quiet-animation-indicator-ring-inner-delay-multiple,-.33))}.ring{border-color:var(
--spectrum-coachmark-indicator-ring-default-color,var(--spectrum-alias-focus-color)
)}:host([variant=light]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-low-contrast-color,var(--spectrum-global-color-gray-50)
)}:host([variant=dark]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-high-contrast-color,var(--spectrum-global-color-gray-900)
)}:host{display:inline-block}`;class Nt extends e{constructor(){super(...arguments),this.quiet=!1,this.variant=""}static get styles(){return[Ot]}render(){return r`<div class="ring"></div><div class="ring"></div><div class="ring"></div>`}}o([i({type:Boolean,reflect:!0})],Nt.prototype,"quiet",void 0),o([i({reflect:!0})],Nt.prototype,"variant",void 0),customElements.define("sp-coachmark",Nt);const Rt=["",()=>{}];const jt=d(class extends et{constructor(){super(...arguments),this.start=Rt,this.streamInside=Rt,this.end=Rt,this.streamOutside=Rt,this.state="off",this.handleStart=t=>{this.callHandler(this.start[1],t),t.defaultPrevented||(this.removeListeners(),this.addListeners("on"))},this.handleStream=t=>{this.callHandler(this.streamInside[1],t)},this.handleEnd=t=>{this.callHandler(this.end[1],t),this.removeListeners(),this.addListeners("off")},this.handleBetween=t=>{this.callHandler(this.streamOutside[1],t)}}render(t){return s}update(t,[{start:e,end:r,streamInside:o=Rt,streamOutside:i=Rt}]){var s;this.element!==t.element&&(this.element=t.element,this.removeListeners()),this.host=(null===(s=t.options)||void 0===s?void 0:s.host)||this.element,this.start=e,this.end=r,this.streamInside=o,this.streamOutside=i,this.addListeners()}addListeners(t){this.state=t||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleBetween),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleStream),this.addListener(this.end[0],this.handleEnd))}callHandler(t,e){"function"==typeof t?t.call(this.host,e):t.handleEvent(e)}addListener(t,e){Array.isArray(t)?t.map((t=>{this.element.addEventListener(t,e)})):this.element.addEventListener(t,e)}removeListener(t,e){Array.isArray(t)?t.map((t=>{this.element.removeEventListener(t,e)})):this.element.removeEventListener(t,e)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleStream),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleBetween)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}});var Vt=n`:host{--spectrum-colorloupe-width-adjusted:calc(var(
--spectrum-colorloupe-width,
var(--spectrum-global-dimension-static-size-600)
) + var(
--spectrum-colorhandle-inner-border-size,
var(--spectrum-global-dimension-static-size-25)
)*2);--spectrum-colorloupe-height-adjusted:calc(var(
--spectrum-colorloupe-height,
var(--spectrum-global-dimension-static-size-800)
) + var(
--spectrum-colorhandle-inner-border-size,
var(--spectrum-global-dimension-static-size-25)
)*2);--spectrum-colorloupe-offset:var(
--spectrum-global-dimension-static-size-200,16px
);--spectrum-colorloupe-animation-distance:var(
--spectrum-global-dimension-static-size-100,8px
)}:host{bottom:calc(50% + var(--spectrum-colorloupe-offset));height:var(--spectrum-colorloupe-height-adjusted);left:calc(50% - var(--spectrum-colorloupe-width-adjusted)/ 2);opacity:0;pointer-events:none;position:absolute;transform:translateY(var(--spectrum-colorloupe-animation-distance));transform-origin:bottom center;transition:transform .1s ease-in-out,opacity 125ms ease-in-out;width:var(--spectrum-colorloupe-width-adjusted)}:host([open]){opacity:1;transform:translate(0)}.outer{stroke-width:var(
--spectrum-colorloupe-outer-border-size,var(--spectrum-global-dimension-static-size-10)
);fill:var(
--spectrum-colorloupe-inner-border-color,var(--spectrum-global-color-static-white)
);stroke:var(
--spectrum-colorloupe-outer-border-color,var(--spectrum-alias-border-color-translucent)
)}@media (forced-colors:active){:host{--spectrum-colorloupe-outer-border-color:CanvasText}}svg{height:inherit;width:inherit}`;class Kt extends e{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Vt]}render(){return r`<svg><g transform="translate(1 1)"><path class="inner" d="M24,0A24,24,0,0,1,48,24c0,16.255-24,40-24,40S0,40.255,0,24A24,24,0,0,1,24,0Z" fill="${this.color}"/><path class="outer" d="M24,2A21.98,21.98,0,0,0,2,24c0,6.2,4,14.794,11.568,24.853A144.233,144.233,0,0,0,24,61.132,144.085,144.085,0,0,0,34.4,48.893C41.99,38.816,46,30.209,46,24A21.98,21.98,0,0,0,24,2m0-2A24,24,0,0,1,48,24c0,16.255-24,40-24,40S0,40.255,0,24A24,24,0,0,1,24,0Z"/></g></svg>`}}o([i({type:Boolean,reflect:!0})],Kt.prototype,"open",void 0),o([i({type:String})],Kt.prototype,"color",void 0),customElements.define("sp-color-loupe",Kt);var Xt=n`:host{--spectrum-colorhandle-animation-duration:var(
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
)*2)}:host{background-position:var(--spectrum-colorhandle-background-offset) var(--spectrum-colorhandle-background-offset),var(--spectrum-colorhandle-background-offset) calc(var(--spectrum-colorhandle-checkerboard-size) + var(--spectrum-colorhandle-background-offset)),calc(var(--spectrum-colorhandle-checkerboard-size) + var(--spectrum-colorhandle-background-offset)) calc(var(--spectrum-colorhandle-checkerboard-size)*-1 + var(--spectrum-colorhandle-background-offset)),calc(var(--spectrum-colorhandle-checkerboard-size)*-1 + var(--spectrum-colorhandle-background-offset)) var(--spectrum-colorhandle-background-offset);background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px);border-style:solid;border-width:var(
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
);z-index:1}:host,:host:after{border-radius:100%}:host:after{content:"";display:block;height:var(--spectrum-colorhandle-hitarea-size);left:calc(50% - var(--spectrum-colorhandle-hitarea-size)/ 2);position:absolute;top:calc(50% - var(--spectrum-colorhandle-hitarea-size)/ 2);width:var(--spectrum-colorhandle-hitarea-size)}:host([disabled]){pointer-events:none}.color{border-radius:100%;height:100%;width:100%}:host{--spectrum-colorhandle-background-offset:calc(var(--spectrum-global-dimension-static-size-25, 2px)*-1);--spectrum-colorhandle-checkerboard-size:var(
--spectrum-global-dimension-static-size-100,8px
);--spectrum-colorhandle-outer-border-color:rgba(0,0,0,.42)}:host{background-color:var(--spectrum-global-color-static-white,#fff);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 75.5%),linear-gradient(-45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 25.5%);border-color:var(
--spectrum-colorhandle-inner-border-color,var(--spectrum-global-color-static-white)
);box-shadow:0 0 0 var(
--spectrum-colorhandle-outer-border-size,var(--spectrum-alias-border-size-thin)
) var(--spectrum-colorhandle-outer-border-color,rgba(0,0,0,.42))}:host([disabled]){background:var(
--spectrum-colorhandle-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
);border-color:var(
--spectrum-colorhandle-inner-border-color-disabled,var(--spectrum-global-color-gray-400)
);box-shadow:none}:host([disabled]) .color{display:none}.color{box-shadow:inset 0 0 0 var(
--spectrum-colorhandle-outer-border-size,var(--spectrum-alias-border-size-thin)
) var(--spectrum-colorhandle-outer-border-color,rgba(0,0,0,.42))}@media (forced-colors:active){:host{--spectrum-colorhandle-inner-border-color-disabled:GrayText;--spectrum-colorhandle-fill-color-disabled:Canvas;--spectrum-colorhandle-inner-border-color:CanvasText}:host([disabled]){forced-color-adjust:none}}:host{touch-action:none}:host(:focus){outline:0}`;const Gt=/^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/,Yt=/(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/,Wt=/(^hs[v|l]a?\()\d{1,3}/;class Zt extends e{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[Xt]}handlePointerdown(t){"touch"===t.pointerType&&(this.open=!0),this.setPointerCapture(t.pointerId)}handlePointerup(t){this.open=!1,this.releasePointerCapture(t.pointerId)}render(){return r`<div class="color" style="background-color:${this.color}"></div><sp-color-loupe color="${this.color}" ?open="${this.open&&!this.disabled}"></sp-color-loupe>`}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup)}}function Qt(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var r=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function Jt(t){return Math.min(1,Math.max(0,t))}function te(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ee(t){return t<=1?100*Number(t)+"%":t}function re(t){return 1===t.length?"0"+t:String(t)}function oe(t,e,r){t=Qt(t,255),e=Qt(e,255),r=Qt(r,255);var o=Math.max(t,e,r),i=Math.min(t,e,r),s=0,a=0,l=(o+i)/2;if(o===i)a=0,s=0;else{var c=o-i;switch(a=l>.5?c/(2-o-i):c/(o+i),o){case t:s=(e-r)/c+(e<r?6:0);break;case e:s=(r-t)/c+2;break;case r:s=(t-e)/c+4}s/=6}return{h:s,s:a,l:l}}function ie(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*r*(e-t):r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function se(t,e,r){t=Qt(t,255),e=Qt(e,255),r=Qt(r,255);var o=Math.max(t,e,r),i=Math.min(t,e,r),s=0,a=o,l=o-i,c=0===o?0:l/o;if(o===i)s=0;else{switch(o){case t:s=(e-r)/l+(e<r?6:0);break;case e:s=(r-t)/l+2;break;case r:s=(t-e)/l+4}s/=6}return{h:s,s:c,v:a}}function ae(t,e,r,o){var i=[re(Math.round(t).toString(16)),re(Math.round(e).toString(16)),re(Math.round(r).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function le(t){return Math.round(255*parseFloat(t)).toString(16)}function ce(t){return ne(t)/255}function ne(t){return parseInt(t,16)}o([i({type:Boolean,reflect:!0})],Zt.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],Zt.prototype,"focused",void 0),o([i({type:Boolean,reflect:!0})],Zt.prototype,"open",void 0),o([i({type:String})],Zt.prototype,"color",void 0),customElements.define("sp-color-handle",Zt);var de={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ue(t){var e={r:0,g:0,b:0},r=1,o=null,i=null,s=null,a=!1,l=!1;return"string"==typeof t&&(t=function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var e=!1;if(de[t])t=de[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var r=be.rgb.exec(t);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=be.rgba.exec(t))return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=be.hsl.exec(t))return{h:r[1],s:r[2],l:r[3]};if(r=be.hsla.exec(t))return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=be.hsv.exec(t))return{h:r[1],s:r[2],v:r[3]};if(r=be.hsva.exec(t))return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=be.hex8.exec(t))return{r:ne(r[1]),g:ne(r[2]),b:ne(r[3]),a:ce(r[4]),format:e?"name":"hex8"};if(r=be.hex6.exec(t))return{r:ne(r[1]),g:ne(r[2]),b:ne(r[3]),format:e?"name":"hex"};if(r=be.hex4.exec(t))return{r:ne(r[1]+r[1]),g:ne(r[2]+r[2]),b:ne(r[3]+r[3]),a:ce(r[4]+r[4]),format:e?"name":"hex8"};if(r=be.hex3.exec(t))return{r:ne(r[1]+r[1]),g:ne(r[2]+r[2]),b:ne(r[3]+r[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(ve(t.r)&&ve(t.g)&&ve(t.b)?(e=function(t,e,r){return{r:255*Qt(t,255),g:255*Qt(e,255),b:255*Qt(r,255)}}(t.r,t.g,t.b),a=!0,l="%"===String(t.r).substr(-1)?"prgb":"rgb"):ve(t.h)&&ve(t.s)&&ve(t.v)?(o=ee(t.s),i=ee(t.v),e=function(t,e,r){t=6*Qt(t,360),e=Qt(e,100),r=Qt(r,100);var o=Math.floor(t),i=t-o,s=r*(1-e),a=r*(1-i*e),l=r*(1-(1-i)*e),c=o%6;return{r:255*[r,a,s,s,l,r][c],g:255*[l,r,r,a,s,s][c],b:255*[s,s,l,r,r,a][c]}}(t.h,o,i),a=!0,l="hsv"):ve(t.h)&&ve(t.s)&&ve(t.l)&&(o=ee(t.s),s=ee(t.l),e=function(t,e,r){var o,i,s;if(t=Qt(t,360),e=Qt(e,100),r=Qt(r,100),0===e)i=r,s=r,o=r;else{var a=r<.5?r*(1+e):r+e-r*e,l=2*r-a;o=ie(l,a,t+1/3),i=ie(l,a,t),s=ie(l,a,t-1/3)}return{r:255*o,g:255*i,b:255*s}}(t.h,o,s),a=!0,l="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=te(r),{ok:a,format:t.format||l,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var pe="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",he="[\\s|\\(]+("+pe+")[,|\\s]+("+pe+")[,|\\s]+("+pe+")\\s*\\)?",me="[\\s|\\(]+("+pe+")[,|\\s]+("+pe+")[,|\\s]+("+pe+")[,|\\s]+("+pe+")\\s*\\)?",be={CSS_UNIT:new RegExp(pe),rgb:new RegExp("rgb"+he),rgba:new RegExp("rgba"+me),hsl:new RegExp("hsl"+he),hsla:new RegExp("hsla"+me),hsv:new RegExp("hsv"+he),hsva:new RegExp("hsva"+me),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ve(t){return Boolean(be.CSS_UNIT.exec(String(t)))}var ge=function(){function t(e,r){var o;if(void 0===e&&(e=""),void 0===r&&(r={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var i=ue(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=r.format)&&void 0!==o?o:i.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,r=t.g/255,o=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=te(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.toHsv=function(){var t=se(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=se(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.v);return 1===this.a?"hsv("+e+", "+r+"%, "+o+"%)":"hsva("+e+", "+r+"%, "+o+"%, "+this.roundA+")"},t.prototype.toHsl=function(){var t=oe(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=oe(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.l);return 1===this.a?"hsl("+e+", "+r+"%, "+o+"%)":"hsla("+e+", "+r+"%, "+o+"%, "+this.roundA+")"},t.prototype.toHex=function(t){return void 0===t&&(t=!1),ae(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,r,o,i){var s=[re(Math.round(t).toString(16)),re(Math.round(e).toString(16)),re(Math.round(r).toString(16)),re(le(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb("+t+", "+e+", "+r+")":"rgba("+t+", "+e+", "+r+", "+this.roundA+")"},t.prototype.toPercentageRgb=function(){var t=function(t){return Math.round(100*Qt(t,255))+"%"};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*Qt(t,255))};return 1===this.a?"rgb("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%)":"rgba("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%, "+this.roundA+")"},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+ae(this.r,this.g,this.b,!1),e=0,r=Object.entries(de);e<r.length;e++){var o=r[e],i=o[0];if(t===o[1])return i}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var r=!1,o=this.a<1&&this.a>=0;return e||!o||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex4"===t&&(r=this.toHex8String(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l+=e/100,r.l=Jt(r.l),new t(r)},t.prototype.brighten=function(e){void 0===e&&(e=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-e/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-e/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-e/100*255))),new t(r)},t.prototype.darken=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l-=e/100,r.l=Jt(r.l),new t(r)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s-=e/100,r.s=Jt(r.s),new t(r)},t.prototype.saturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s+=e/100,r.s=Jt(r.s),new t(r)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var r=this.toHsl(),o=(r.h+e)%360;return r.h=o<0?360+o:o,new t(r)},t.prototype.mix=function(e,r){void 0===r&&(r=50);var o=this.toRgb(),i=new t(e).toRgb(),s=r/100;return new t({r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a})},t.prototype.analogous=function(e,r){void 0===e&&(e=6),void 0===r&&(r=30);var o=this.toHsl(),i=360/r,s=[this];for(o.h=(o.h-(i*e>>1)+720)%360;--e;)o.h=(o.h+i)%360,s.push(new t(o));return s},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var r=this.toHsv(),o=r.h,i=r.s,s=r.v,a=[],l=1/e;e--;)a.push(new t({h:o,s:i,v:s})),s=(s+l)%1;return a},t.prototype.splitcomplement=function(){var e=this.toHsl(),r=e.h;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var r=this.toRgb(),o=new t(e).toRgb();return new t({r:o.r+(r.r-o.r)*r.a,g:o.g+(r.g-o.g)*r.a,b:o.b+(r.b-o.b)*r.a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var r=this.toHsl(),o=r.h,i=[this],s=360/e,a=1;a<e;a++)i.push(new t({h:(o+a*s)%360,s:r.s,l:r.l}));return i},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}();var fe=n`.slider{height:100%;left:0;margin:0;opacity:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:0}:host([focused]) .handle{height:calc(var(
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
)}:host([disabled]) .gradient{display:none}@media (forced-colors:active){:host{--spectrum-colorarea-fill-color-disabled:GrayText}:host([disabled]){forced-color-adjust:none}}:host{touch-action:none}:host:before{pointer-events:none}.gradient{overflow:hidden}.handle{transform:translate(var(--spectrum-colorarea-default-width))}::slotted(*){height:100%;width:100%}`;class xe extends e{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.labelX="saturation",this.labelY="luminosity",this._hue=0,this._color=new ge({h:0,s:1,v:1}),this._previousColor=new ge({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.activeAxis="x",this._x=1,this._y=0,this.step=.01,this.altered=0,this.activeKeys=new Set,this._pointerDown=!1}static get styles(){return[fe]}get hue(){return this._hue}set hue(t){const e=Math.min(360,Math.max(0,t));if(e===this.hue)return;const r=this.hue,{s:o,v:i}=this._color.toHsv();this._color=new ge({h:e,s:o,v:i}),this._hue=e,this.requestUpdate("hue",r)}get value(){return this.color}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString){return this._color.toHslString().replace(Wt,`$1${this.hue}`)}{const{s:t,l:e,a:r}=this._color.toHsl();return{h:this.hue,s:t,l:e,a:r}}case"hsv":if(this._format.isString){return this._color.toHsvString().replace(Wt,`$1${this.hue}`)}{const{s:t,v:e,a:r}=this._color.toHsv();return{h:this.hue,s:t,v:e,a:r}}case"hex":case"hex3":case"hex4":case"hex6":default:return this._format.isString?this._color.toHexString():this._color.toHex()}}set color(t){if(t===this.color)return;const e=this._color;this._color=new ge(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o};const{h:i,s:s,v:a}=this._color.toHsv();let l;if(o&&r.startsWith("hs")){const e=Gt.exec(t);if(null!==e){const[,t]=e;l=Number(t)}}else if(!o&&r.startsWith("hs")){const t=this._color.originalInput;l=Object.values(t)[0]}this.hue=l||i,this.x=s,this.y=1-a,this.requestUpdate("color",e)}get x(){return this._x}set x(t){if(t===this.x)return;const e=this.x;this.inputX?(this.inputX.value=t.toString(),this._x=this.inputX.valueAsNumber):this._x=t,this.requestUpdate("x",e)}get y(){return this._y}set y(t){if(t===this.y)return;const e=this.y;this.inputY?(this.inputY.value=t.toString(),this._y=this.inputY.valueAsNumber):this._y=t,this.requestUpdate("y",e)}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),"x"===this.activeAxis?this.inputX.focus():this.inputY.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.focused=!1)}handleKeydown(t){const{code:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;0===e.search("Arrow")&&(t.preventDefault(),this.activeKeys.add(e),this.handleKeypress())}handleKeypress(){let t=0,e=0;const r=Math.max(this.step,5*this.altered*this.step);if(this.activeKeys.forEach((o=>{switch(o){case"ArrowUp":e=-1*r;break;case"ArrowDown":e=1*r;break;case"ArrowLeft":t=-1*r;break;case"ArrowRight":t=1*r}})),0!=t?(this.activeAxis="x",this.inputX.focus()):0!=e&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+t,0)),this.y=Math.min(1,Math.max(this.y+e,0)),this._previousColor=this._color.clone(),this._color=new ge({h:this.hue,s:this.x,v:1-this.y}),0!=t||0!=e){this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor)}}handleKeyup(t){t.preventDefault();const{code:e}=t;this.activeKeys.delete(e)}handleInput(t){const{valueAsNumber:e,name:r}=t.target;this[r]=e,this._color=new ge({h:this.hue,s:this.x,v:1-this.y})}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){const[e,r]=this.calculateHandlePosition(t);this._color=new ge({h:this.hue,s:e,v:1-r}),this.x=e,this.y=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){t.preventDefault(),this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);const e=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),"mouse"===t.pointerType&&(this.focused=!1),e||(this._color=this._previousColor)}calculateHandlePosition(t){if(!this.boundingClientRect)return[this.x,this.y];const e=this.boundingClientRect,r=e.left,o=e.top,i=t.clientX,s=t.clientY,a=e.width,l=e.height;return[Math.max(0,Math.min(1,(i-r)/a)),Math.max(0,Math.min(1,(s-o)/l))]}handleAreaPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}render(){var t,e;const{width:o=0,height:i=0}=this.boundingClientRect||{};return r`<div @pointerdown="${this.handleAreaPointerdown}" class="gradient" style="background:linear-gradient(to top,#000 0,hsla(${this.hue},100%,.01%,0) 100%),linear-gradient(to right,#fff 0,hsla(${this.hue},100%,.01%,0) 100%),hsl(${this.hue},100%,50%)"><slot name="gradient"></slot></div><sp-color-handle tabindex="${v(this.focused?void 0:"0")}" @focus="${this.forwardFocus}" ?focused="${this.focused}" class="handle" color="${this._color.toHslString()}" ?disabled="${this.disabled}" style="transform:translate(${this.x*o}px,${this.y*i}px)" ${jt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}></sp-color-handle><div><input type="range" class="slider" name="x" aria-label="${null!==(t=this.label)&&void 0!==t?t:this.labelX}" min="0" max="1" step="${this.step}" tabindex="-1" .value="${String(this.x)}" @input="${this.handleInput}" @change="${this.handleChange}"></div><div><input type="range" class="slider" name="y" aria-label="${null!==(e=this.label)&&void 0!==e?e:this.labelY}" min="0" max="1" step="${this.step}" tabindex="-1" .value="${String(this.y)}" @input="${this.handleInput}" @change="${this.handleChange}"></div>`}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(super.updated(t),this.x!==this.inputX.valueAsNumber&&(this.x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this.y=this.inputY.valueAsNumber),t.has("focused")&&this.focused){const t=this.inputX.parentElement,e=this.inputY.parentElement;if(!t.shadowRoot&&!e.shadowRoot){t.attachShadow({mode:"open"}),e.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,e.shadowRoot.innerHTML=r}}}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null===(t=this.observer)||void 0===t||t.observe(this)}disconnectedCallback(){var t;null===(t=this.observer)||void 0===t||t.unobserve(this),super.disconnectedCallback()}}o([i({type:Boolean,reflect:!0})],xe.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],xe.prototype,"focused",void 0),o([i({type:String})],xe.prototype,"label",void 0),o([i({type:String,attribute:"label-x"})],xe.prototype,"labelX",void 0),o([i({type:String,attribute:"label-y"})],xe.prototype,"labelY",void 0),o([g(".handle")],xe.prototype,"handle",void 0),o([i({type:Number})],xe.prototype,"hue",null),o([i({type:String})],xe.prototype,"value",null),o([i({type:String})],xe.prototype,"color",null),o([i({attribute:!1})],xe.prototype,"activeAxis",void 0),o([i({type:Number})],xe.prototype,"x",null),o([i({type:Number})],xe.prototype,"y",null),o([i({type:Number})],xe.prototype,"step",void 0),o([g('[name="x"]')],xe.prototype,"inputX",void 0),o([g('[name="y"]')],xe.prototype,"inputY",void 0),customElements.define("sp-color-area",xe);var ye=n`:host{--spectrum-colorslider-handle-hitarea-border-radius:0%;--spectrum-colorslider-handle-hitarea-width:var(
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
);height:var(--spectrum-colorslider-handle-hitarea-height);width:var(--spectrum-colorslider-handle-hitarea-width)}.checkerboard{background-position:0 0,0 var(--spectrum-global-dimension-static-size-100,8px),var(--spectrum-global-dimension-static-size-100,8px) calc(var(--spectrum-global-dimension-static-size-100,8px)*-1),calc(var(--spectrum-global-dimension-static-size-100,8px)*-1) 0;background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px)}.checkerboard:before{border-radius:var(
--spectrum-colorslider-border-radius,var(--spectrum-alias-border-radius-regular)
);bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:1}.checkerboard,.gradient{border-radius:var(
--spectrum-colorslider-border-radius,var(--spectrum-alias-border-radius-regular)
);height:100%;width:100%}:host{--spectrum-colorslider-border-color:var(
--spectrum-colorarea-border-color,var(--spectrum-alias-border-color-translucent)
)}.checkerboard{background-color:var(
--spectrum-global-color-static-white,#fff
);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 75.5%),linear-gradient(-45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 25.5%)}.checkerboard:before{box-shadow:inset 0 0 0 var(
--spectrum-colorslider-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorslider-border-color,var(--spectrum-alias-border-color-translucent)
)}:host([disabled]) .checkerboard{background:var(
--spectrum-colorslider-fill-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .checkerboard:before{box-shadow:0 0 0 var(
--spectrum-colorslider-border-size,var(--spectrum-alias-border-size-thin)
) var(
--spectrum-colorslider-border-color-disabled,var(--spectrum-alias-track-color-disabled)
)}:host([disabled]) .gradient{display:none}@media (forced-colors:active){:host{--spectrum-colorslider-border-color-disabled:GrayText;--spectrum-colorslider-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{--sp-color-slider-gradient-fallback:red 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%;touch-action:none}:host(:focus){outline:0}.gradient{overflow:hidden}::slotted(*){height:100%;width:100%}`;class ke extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.vertical=!1,this._value=0,this.sliderHandlePosition=0,this._color=new ge({h:0,s:1,v:1}),this._previousColor=new ge({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.step=1,this._altered=0,this._pointerDown=!1}static get styles(){return[ye]}get value(){return this._value}set value(t){const e=Math.min(360,Math.max(0,t));if(e===this.value)return;const r=this.value,{s:o,v:i}=this._color.toHsv();this._color=new ge({h:e,s:o,v:i}),this._value=e,e!==this.sliderHandlePosition&&(this.sliderHandlePosition=e/360*100),this.requestUpdate("value",r)}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex":case"hex3":case"hex4":case"hex6":return this._format.isString?this._color.toHexString():this._color.toHex();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString){return this._color.toHslString().replace(Yt,`$1${this.value}$2${this._saturation}`)}{const{s:t,l:e,a:r}=this._color.toHsl();return{h:this.value,s:t,l:e,a:r}}case"hsv":if(this._format.isString){return this._color.toHsvString().replace(Yt,`$1${this.value}$2${this._saturation}`)}{const{s:t,v:e,a:r}=this._color.toHsv();return{h:this.value,s:t,v:e,a:r}}default:return"No color format applied."}}set color(t){if(t===this.color)return;const e=this._color;this._color=new ge(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;if(r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o},o&&r.startsWith("hs")){const e=Gt.exec(t);if(null!==e){const[,t,r]=e;this.value=Number(t),this._saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const t=this._color.originalInput,e=Object.values(t);this.value=e[0],this._saturation=e[1]}else{const{h:t}=this._color.toHsv();this.value=t}this._previousColor=e,this.requestUpdate("color",e)}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+r)),this.value=this.sliderHandlePosition/100*360,this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value})),0!=r&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.sliderHandlePosition=this.value/360*100,this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value}))}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.sliderHandlePosition=this.calculateHandlePosition(t),this.value=this.sliderHandlePosition/100*360,this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value})),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.sliderHandlePosition;const e=this.boundingClientRect,r=this.vertical?e.top:e.left,o=this.vertical?t.clientY:t.clientX,i=this.vertical?e.height:e.width;return 100*Math.max(0,Math.min(1,(o-r)/i))}handleGradientPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}get handlePositionStyles(){return`${this.vertical?"top":"left"}: ${this.sliderHandlePosition}%`}render(){return r`<div class="checkerboard" role="presentation" @pointerdown="${this.handleGradientPointerdown}"><div class="gradient" role="presentation" style="background:linear-gradient(to ${this.vertical?"bottom":"right"},var(--sp-color-slider-gradient,var(--sp-color-slider-gradient-fallback)))"><slot name="gradient"></slot></div></div><sp-color-handle tabindex="${v(this.focused?void 0:"0")}" @focus="${this.forwardFocus}" ?focused="${this.focused}" class="handle" color="hsl(${this.value}, 100%, 50%)" ?disabled="${this.disabled}" style="${this.handlePositionStyles}" ${jt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}></sp-color-handle><input type="range" class="slider" min="0" max="360" step="${this.step}" aria-label="${this.label}" .value="${String(this.value)}" @input="${this.handleInput}" @change="${this.handleChange}" @keydown="${this.handleKeydown}">`}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}o([i({type:Boolean,reflect:!0})],ke.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],ke.prototype,"focused",void 0),o([g(".handle")],ke.prototype,"handle",void 0),o([i({type:String})],ke.prototype,"label",void 0),o([i({type:Boolean,reflect:!0})],ke.prototype,"vertical",void 0),o([i({type:Number})],ke.prototype,"value",null),o([i({type:Number,reflect:!0})],ke.prototype,"sliderHandlePosition",void 0),o([i({type:String})],ke.prototype,"color",null),o([i({type:Number})],ke.prototype,"step",void 0),o([g("input")],ke.prototype,"input",void 0),customElements.define("sp-color-slider",ke);var we=n`:host{--spectrum-colorwheel-border-radius:100%;--spectrum-colorwheel-width:calc(var(--spectrum-global-dimension-size-125)*16);--spectrum-colorwheel-height:var(
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
)}@media (forced-colors:active){:host{--spectrum-colorwheel-border-color-disabled:GrayText;--spectrum-colorwheel-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{touch-action:none}:host(:focus){outline:0}.wheel{background:conic-gradient(from 90deg,red,#ff8000,#ff0,#80ff00,#0f0,#00ff80,#0ff,#0080ff,#00f,#8000ff,#f0f,#ff0080,red);height:100%;width:100%}.wheel:after,.wheel:before{border:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
) solid var(--spectrum-colorwheel-border-color);border-radius:50%;content:"";position:absolute}.wheel:after{inset:0}.wheel:before{inset:24px}:host([disabled]) .wheel:after,:host([disabled]) .wheel:before{border-color:var(
--spectrum-colorwheel-border-color-disabled,var(--spectrum-global-color-gray-300)
)}:host([disabled]) .wheel{background:var(
--spectrum-colorwheel-fill-color-disabled,var(--spectrum-global-color-gray-300)
)}`;class ze extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.step=1,this._value=0,this._color=new ge({h:0,s:1,v:1}),this._previousColor=new ge({h:0,s:1,v:1}),this._format={format:"",isString:!1},this._altered=0,this._pointerDown=!1}static get styles(){return[we]}get value(){return this._value}set value(t){const e=Math.min(360,Math.max(0,t));if(e===this.value)return;const r=this.value,{s:o,v:i}=this._color.toHsv();this._color=new ge({h:e,s:o,v:i}),this._value=e,this.requestUpdate("value",r)}get color(){switch(this._format.format){case"rgb":return this._format.isString?this._color.toRgbString():this._color.toRgb();case"prgb":return this._format.isString?this._color.toPercentageRgbString():this._color.toPercentageRgb();case"hex":case"hex3":case"hex4":case"hex6":return this._format.isString?this._color.toHexString():this._color.toHex();case"hex8":return this._format.isString?this._color.toHex8String():this._color.toHex8();case"name":return this._color.toName()||this._color.toRgbString();case"hsl":if(this._format.isString){return this._color.toHslString().replace(Yt,`$1${this.value}$2${this._saturation}`)}{const{s:t,l:e,a:r}=this._color.toHsl();return{h:this.value,s:t,l:e,a:r}}case"hsv":if(this._format.isString){return this._color.toHsvString().replace(Yt,`$1${this.value}$2${this._saturation}`)}{const{s:t,v:e,a:r}=this._color.toHsv();return{h:this.value,s:t,v:e,a:r}}default:return"No color format applied."}}set color(t){if(t===this.color)return;const e=this._color;this._color=new ge(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;if(r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o},o&&r.startsWith("hs")){const e=Gt.exec(t);if(null!==e){const[,t,r]=e;this.value=Number(t),this._saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const t=this._color.originalInput,e=Object.values(t);this.value=e[0],this._saturation=e[1]}else{const{h:t}=this._color.toHsv();this.value=t}this.requestUpdate("color",e)}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.value=(360+this.value+r)%360,this._previousColor=this._color.clone(),this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value})),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor)}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value}))}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocusin(){this.focused=!0}handleFocusout(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this._previousColor=this._color.clone(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.value=this.calculateHandlePosition(t),this._color=new ge(Object.assign(Object.assign({},this._color.toHsl()),{h:this.value})),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this._color=this._previousColor),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.value;const e=this.boundingClientRect,{width:r,height:o,left:i,top:s}=e,a=i+r/2,l=s+o/2,c=t.clientX-a,n=t.clientY-l;return(360+(360+180*Math.atan2(n,c)/Math.PI))%360}handleGradientPointerdown(t){0!==t.button||t.target.classList.contains("innerCircle")||(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}render(){const{width:t=160}=this.boundingClientRect||{},e=t/2,o=e-24,i=2*o,s=`path(evenodd, "M ${e} ${e} m -${e} 0 a ${e} ${e} 0 1 0 ${t} 0 a ${e} ${e} 0 1 0 -${t} 0 M ${e} ${e} m -${o} 0 a ${o} ${o} 0 1 0 ${i} 0 a ${o} ${o} 0 1 0 -${i} 0")`,a=`transform: translate(${(e-12.5)*Math.cos(this.value*Math.PI/180)}px, ${(e-12.5)*Math.sin(this.value*Math.PI/180)}px);`;return r`<slot name="gradient" @pointerdown="${this.handleGradientPointerdown}"><div class="wheel" style="clip-path:${s}"></div></slot><sp-color-handle tabindex="${v(this.focused?void 0:"0")}" @focus="${this.forwardFocus}" ?focused="${this.focused}" class="handle" color="hsl(${this.value}, 100%, 50%)" ?disabled="${this.disabled}" style="${a}" ${jt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}></sp-color-handle><input type="range" class="slider" aria-label="${this.label}" min="0" max="360" step="${this.step}" .value="${String(this.value)}" @input="${this.handleInput}" @change="${this.handleChange}" @keydown="${this.handleKeydown}">`}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null===(t=this.observer)||void 0===t||t.observe(this)}disconnectedCallback(){var t;null===(t=this.observer)||void 0===t||t.unobserve(this),super.disconnectedCallback()}}o([i({type:Boolean,reflect:!0})],ze.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],ze.prototype,"focused",void 0),o([g(".handle")],ze.prototype,"handle",void 0),o([i({type:String})],ze.prototype,"label",void 0),o([i({type:Number})],ze.prototype,"step",void 0),o([i({type:Number})],ze.prototype,"value",null),o([i({type:String})],ze.prototype,"color",null),o([g("input")],ze.prototype,"input",void 0),customElements.define("sp-color-wheel",ze);var Ce=n`:host{--spectrum-dialog-fullscreen-header-text-size:28px;--spectrum-dialog-confirm-small-width:400px;--spectrum-dialog-confirm-medium-width:480px;--spectrum-dialog-confirm-large-width:640px;--spectrum-dialog-error-width:var(--spectrum-dialog-confirm-medium-width);--spectrum-dialog-confirm-hero-height:var(
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
);outline:0;width:-moz-fit-content;width:fit-content}:host([size=s]){width:var(
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
);margin:0;outline:0}:host([dir=ltr]) .no-header::slotted([slot=heading]){padding-right:0}:host([dir=rtl]) .no-header::slotted([slot=heading]){padding-left:0}.no-header::slotted([slot=heading]){grid-area:heading-start/heading-start/header-end/header-end}.header{align-items:center;box-sizing:border-box;display:flex;grid-area:header;justify-content:flex-end;outline:0}.type-icon{grid-area:typeIcon}.divider{grid-area:divider;margin-bottom:var(
--spectrum-dialog-confirm-divider-margin-bottom,var(--spectrum-global-dimension-static-size-200)
);margin-top:var(
--spectrum-dialog-confirm-divider-margin-top,var(--spectrum-global-dimension-static-size-150)
);width:100%}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-bottom:calc(var(--spectrum-dialog-confirm-divider-margin-top,var(--spectrum-global-dimension-static-size-150)) + var(--spectrum-dialog-confirm-divider-margin-bottom,var(--spectrum-global-dimension-static-size-200)) + var(--spectrum-dialog-confirm-divider-height,var(--spectrum-global-dimension-size-25)))}.content{-webkit-overflow-scrolling:touch;box-sizing:border-box;font-size:var(--spectrum-dialog-confirm-description-text-size);font-weight:var(
--spectrum-dialog-confirm-description-text-font-weight,var(--spectrum-global-font-weight-regular)
);grid-area:content;line-height:var(
--spectrum-dialog-confirm-description-text-line-height,var(--spectrum-alias-component-text-line-height)
);margin:0 var(--spectrum-dialog-confirm-description-margin);overflow-y:auto;padding:0 var(--spectrum-dialog-confirm-description-padding)}.content,.footer{outline:0}.footer{display:flex;flex-wrap:wrap;grid-area:footer;padding-top:var(--spectrum-dialog-confirm-footer-padding-top)}.footer>.button+.button,.footer>::slotted(*){margin-bottom:0}:host([dir=ltr]) .button-group{padding-left:var(
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
)}.content[tabindex]{overflow:auto}::slotted(img[slot=hero]){height:auto;width:100%}`;class Se extends(w(k(e,['[slot="hero"]','[slot="footer"]','[slot="button"]']))){constructor(){super(...arguments),this.error=!1,this.dismissable=!1,this.noDivider=!1,this.shouldManageTabOrderForScrolling=()=>{const{offsetHeight:t,scrollHeight:e}=this.contentElement;t<e?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")}}static get styles(){return[Ce,z]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}focus(){if(this.shadowRoot){const t=R(this.shadowRoot);t&&(t.updateComplete?t.updateComplete.then((()=>t.focus())):t.focus(),this.removeAttribute("tabindex"))}else super.focus()}close(){this.dispatchEvent(new Event("close",{bubbles:!0}))}render(){return r`<div class="grid"><slot name="hero"></slot><slot name="heading" class="${v(this.hasHero?this.hasHero:void 0)}"></slot>${this.error?r`<sp-icon-alert class="type-icon"></sp-icon-alert>`:r``} ${this.noDivider?r``:r`<sp-divider size="m" class="divider"></sp-divider>`}<div class="content"><slot @slotchange="${this.onContentSlotChange}"></slot></div>${this.hasFooter?r`<div class="footer"><slot name="footer"></slot></div>`:r``} ${this.hasButtons?r`<sp-button-group class="button-group ${this.hasFooter?"":"button-group--noFooter"}"><slot name="button"></slot></sp-button-group>`:r``} ${this.dismissable?r`<sp-action-button class="close-button" label="Close" quiet size="m" @click="${this.close}"><sp-icon-cross500 class="spectrum-UIIcon-Cross500" slot="icon"></sp-icon-cross500></sp-action-button>`:r``}</div>`}shouldUpdate(t){return t.has("mode")&&this.mode&&(this.dismissable=!1),t.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(t)}onContentSlotChange(){this.shouldManageTabOrderForScrolling()}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}}o([g(".content")],Se.prototype,"contentElement",void 0),o([i({type:Boolean,reflect:!0})],Se.prototype,"error",void 0),o([i({type:Boolean,reflect:!0})],Se.prototype,"dismissable",void 0),o([i({type:Boolean,reflect:!0,attribute:"no-divider"})],Se.prototype,"noDivider",void 0),o([i({type:String,reflect:!0})],Se.prototype,"mode",void 0),o([i({type:String,reflect:!0})],Se.prototype,"size",void 0),customElements.define("sp-dialog",Se);var Ae=n`:host{align-items:center;box-sizing:border-box;display:flex;height:100vh;height:-webkit-fill-available;height:fill-available;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden;width:100vw;z-index:2}:host([open]){visibility:visible}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]){border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}:host([responsive]){margin-top:0}}.modal{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-dialog-fullscreen-margin:32px;--spectrum-dialog-max-height:90vh}.modal{border-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);max-height:var(--spectrum-dialog-max-height);outline:0;overflow:hidden;pointer-events:auto;transform:translateY(var(
--spectrum-dialog-confirm-entry-animation-distance,var(--spectrum-global-dimension-size-250)
));transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100))),transform 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}}.fullscreen{bottom:var(--spectrum-dialog-fullscreen-margin);left:var(
--spectrum-dialog-fullscreen-margin
);right:var(--spectrum-dialog-fullscreen-margin);top:var(--spectrum-dialog-fullscreen-margin)}.fullscreen,.fullscreenTakeover{max-height:none;max-width:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;bottom:0;box-sizing:border-box;left:0;right:0;top:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}.modal{background:var(
--spectrum-dialog-confirm-background-color,var(--spectrum-alias-background-color-default)
)}:host{height:calc(100vh - var(--swc-body-margins-block,0 * 1px));width:calc(100vw - var(--swc-body-margins-inline,0 * 1px))}`;class Ee extends(w(e)){constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.dismissable=!1,this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.open=!1,this.secondaryLabel="",this.headline="",this.responsive=!1,this.underlay=!1}static get styles(){return[Ae]}focus(){if(this.shadowRoot){const t=R(this.shadowRoot);t?(t.updateComplete?t.updateComplete.then((()=>t.focus())):t.focus(),this.removeAttribute("tabindex")):this.dialog.focus()}else super.focus()}dismiss(){this.dismissable&&this.close()}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}close(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0}))}render(){return r`${this.underlay?r`<sp-underlay ?open="${this.open}" @click="${this.dismiss}"></sp-underlay>`:r``}<div class="modal ${this.mode}"><sp-dialog ?dismissable="${this.dismissable}" ?no-divider="${this.noDivider}" ?error="${this.error}" mode="${v(this.mode?this.mode:void 0)}" size="${v(this.size?this.size:void 0)}" @close="${this.close}">${this.hero?r`<img src="${this.hero}" slot="hero" aria-hidden="${v(this.heroLabel?void 0:"true")}" alt="${v(this.heroLabel?this.heroLabel:void 0)}">`:r``} ${this.headline?r`<h2 slot="heading">${this.headline}</h2>`:r``}<slot></slot>${this.footer?r`<div slot="footer">${this.footer}</div>`:r``} ${this.secondaryLabel?r`<sp-button variant="primary" slot="button" @click="${this.clickSecondary}">${this.secondaryLabel}</sp-button>`:r``} ${this.cancelLabel?r`<sp-button variant="secondary" slot="button" @click="${this.clickCancel}">${this.cancelLabel}</sp-button>`:r``} ${this.confirmLabel?r`<sp-button variant="cta" slot="button" @click="${this.clickConfirm}">${this.confirmLabel}</sp-button>`:r``}</sp-dialog></div>`}updated(t){t.has("open")&&this.open&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}}o([i({type:Boolean,reflect:!0})],Ee.prototype,"error",void 0),o([i({attribute:"cancel-label"})],Ee.prototype,"cancelLabel",void 0),o([i({attribute:"confirm-label"})],Ee.prototype,"confirmLabel",void 0),o([i({type:Boolean,reflect:!0})],Ee.prototype,"dismissable",void 0),o([i()],Ee.prototype,"footer",void 0),o([i()],Ee.prototype,"hero",void 0),o([i({attribute:"hero-label"})],Ee.prototype,"heroLabel",void 0),o([i({type:Boolean,reflect:!0,attribute:"no-divider"})],Ee.prototype,"noDivider",void 0),o([i({type:Boolean,reflect:!0})],Ee.prototype,"open",void 0),o([i({type:String,reflect:!0})],Ee.prototype,"mode",void 0),o([i({type:String,reflect:!0})],Ee.prototype,"size",void 0),o([i({attribute:"secondary-label"})],Ee.prototype,"secondaryLabel",void 0),o([i()],Ee.prototype,"headline",void 0),o([i({type:Boolean})],Ee.prototype,"responsive",void 0),o([i({type:Boolean})],Ee.prototype,"underlay",void 0),o([g("sp-dialog")],Ee.prototype,"dialog",void 0),customElements.define("sp-dialog-wrapper",Ee);var $e=n`:host{border-radius:var(
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
--spectrum-global-color-static-gray-500,#bcbcbc
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
)}`;class Le extends e{constructor(){super(...arguments),this._dropEffect="copy",this.isDragged=!1,this.debouncedDragLeave=null}static get styles(){return[$e]}get dropEffect(){return this._dropEffect}set dropEffect(t){["copy","move","link","none"].includes(t)&&(this._dropEffect=t)}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave)}onDragOver(t){const e=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:t}),r=this.dispatchEvent(e);if(!t.dataTransfer)return;if(!r)return void(t.dataTransfer.dropEffect="none");t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,t.dataTransfer.dropEffect=this.dropEffect;const o=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(o)}onDragLeave(t){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout((()=>{this.isDragged=!1;const e=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}),100)}onDrop(t){t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const e=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}render(){return r`<slot></slot>`}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null)}}o([i({type:Boolean,reflect:!0,attribute:"dragged"})],Le.prototype,"isDragged",void 0),customElements.define("sp-dropzone",Le);var qe=n`:host{--spectrum-fieldgroup-margin:var(
--spectrum-global-dimension-size-200
)}.group{display:flex;flex-wrap:wrap;vertical-align:top}:host([dir=ltr][horizontal]) slot:not([name])::slotted(:not(:last-child)){margin-right:var(
--spectrum-fieldgroup-margin
)}:host([dir=rtl][horizontal]) slot:not([name])::slotted(:not(:last-child)){margin-left:var(
--spectrum-fieldgroup-margin
)}:host([vertical]) .group{display:inline-flex;flex-direction:column}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}`;class _e extends(U(e,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[qe]}render(){return r`<div class="group" role="presentation"><slot></slot></div>${this.renderHelpText(this.invalid)}`}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}o([i({type:Boolean,reflect:!0})],_e.prototype,"horizontal",void 0),o([i({type:Boolean,reflect:!0})],_e.prototype,"invalid",void 0),o([i()],_e.prototype,"label",void 0),o([i({type:Boolean,reflect:!0})],_e.prototype,"vertical",void 0),customElements.define("sp-field-group",_e);class Me extends a{constructor(){super(...arguments),this.registered=!1,this.handleRemoved=({detail:t})=>{t.name===this.name&&(this.registered=!1,this.addIconset())}}firstUpdated(){this.style.display="none"}set name(t){this.registered&&(this._name&&V.getInstance().removeIconset(this._name),t&&V.getInstance().addIconset(t,this)),this._name=t}get name(){return this._name}connectedCallback(){super.connectedCallback(),this.addIconset(),window.addEventListener("sp-iconset-removed",this.handleRemoved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-removed",this.handleRemoved),this.removeIconset()}addIconset(){this.name&&!this.registered&&(V.getInstance().addIconset(this.name,this),this.registered=!0)}removeIconset(){this.name&&(V.getInstance().removeIconset(this.name),this.registered=!1)}}o([i()],Me.prototype,"name",null);class Pe extends Me{constructor(){super(...arguments),this.iconMap=new Map}updated(t){if(!this.slotContainer)return;const e=this.getSVGNodes(this.slotContainer);this.updateSVG(e),super.updated(t)}async applyIconToElement(t,e,r,o){await this.updateComplete;const i=this.iconMap.get(e);if(!i)throw new Error(`Unable to find icon ${e}`);const s=this.prepareSvgClone(i);s.setAttribute("role","img"),o?s.setAttribute("aria-label",o):s.setAttribute("aria-hidden","true"),t.shadowRoot?t.shadowRoot.appendChild(s):t.appendChild(s)}getIconList(){return[...this.iconMap.keys()]}prepareSvgClone(t){const e=t.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=e.getAttribute("viewBox")||"";for(r.style.cssText="pointer-events: none; display: block; width: 100%; height: 100%;",r.setAttribute("viewBox",o),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false");e.childNodes.length>0;)r.appendChild(e.childNodes[0]);return r}getSVGIconName(t){return t}getSanitizedIconName(t){return t}renderDefaultContent(){return r``}render(){return r`<slot @slotchange="${this.onSlotChange}">${this.renderDefaultContent()}</slot>`}updateSVG(t){t.reduce(((t,e)=>{const r=e.querySelectorAll("symbol");return t.push(...r),t}),[]).forEach((t=>{this.iconMap.set(this.getSanitizedIconName(t.id),t)}))}getSVGNodes(t){return t.assignedNodes({flatten:!0}).filter((t=>"svg"===t.nodeName))}onSlotChange(t){const e=t.target,r=this.getSVGNodes(e);this.updateSVG(r)}}o([g("slot")],Pe.prototype,"slotContainer",void 0);var Ie=l`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 14 14"><path d="M12.93 6.227L9.023 2.32a1.094 1.094 0 10-1.546 1.547l2.039 2.04H1.844a1.094 1.094 0 100 2.187h7.672l-2.04 2.039a1.094 1.094 0 001.547 1.547l3.907-3.907a1.093 1.093 0 000-1.546z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 16 16"><path d="M14.606 7.194l-4.458-4.459a1.14 1.14 0 10-1.612 1.612L11.05 6.86H2.108a1.14 1.14 0 000 2.28h8.942l-2.514 2.513a1.14 1.14 0 101.611 1.612l4.46-4.46a1.139 1.139 0 000-1.61z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 16 16"><path d="M15.364 7.161l-5.083-5.083a1.186 1.186 0 00-1.678 1.678l3.057 3.058H1.277a1.187 1.187 0 100 2.373H11.66l-3.056 3.057a1.186 1.186 0 101.677 1.678l5.083-5.083a1.185 1.185 0 000-1.678z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 18 18"><path d="M17.216 8.126l-5.79-5.79a1.236 1.236 0 00-1.746 1.75l3.683 3.683c-.008 0-.014-.004-.021-.004H1.337a1.236 1.236 0 000 2.472H13.34c.007 0 .013-.004.02-.004l-3.68 3.682a1.236 1.236 0 101.748 1.748l5.789-5.789a1.237 1.237 0 000-1.748zm-2.643.895c0-.008.004-.014.004-.021s-.004-.013-.004-.02l.02.02z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 22 22"><path d="M20.17 10.089l-6.585-6.585a1.289 1.289 0 00-1.822 1.822l4.386 4.386H2.276a1.288 1.288 0 000 2.576h13.873l-4.386 4.386a1.289 1.289 0 001.822 1.822l6.585-6.585a1.289 1.289 0 000-1.822z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 24 24"><path d="M22.24 11.052l-7.485-7.485a1.341 1.341 0 00-1.897 1.897l5.194 5.194H2.079a1.342 1.342 0 000 2.684h15.973l-5.194 5.194a1.341 1.341 0 101.897 1.897l7.484-7.485a1.34 1.34 0 000-1.896z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 12 12"><path d="M11.325 5.258L7.91 1.84a1.05 1.05 0 00-1.486 1.484L8.048 4.95H1.494a1.05 1.05 0 000 2.1h6.554L6.423 8.675a1.05 1.05 0 001.486 1.484l3.416-3.417a1.05 1.05 0 000-1.484z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 10 10"><path d="M8.176 8.281c.069.07.115.163 0 .255l-1.437.927c-.115.07-.161.024-.208-.092l-1.783-3.1-2.339 2.571c-.024.045-.093.091-.161 0L1.136 7.678c-.116-.069-.093-.139 0-.208l2.639-2.2-3.01-1.134c-.046 0-.115-.092-.07-.209l.788-1.574a.123.123 0 01.151-.083.128.128 0 01.058.038l2.639 1.713L4.494.64a.122.122 0 01.1-.139.172.172 0 01.038 0l1.922.255c.116 0 .139.046.116.163l-.9 3.31 3.057-.927c.069-.046.139-.046.185.092l.3 1.713c.023.116 0 .162-.093.162l-3.2.255z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 12 12"><path d="M9.575 9.696c.077.079.129.183 0 .287L7.96 11.025c-.129.079-.182.027-.234-.1L5.72 7.433l-2.633 2.893c-.027.051-.1.1-.182 0l-1.251-1.3c-.131-.077-.1-.156 0-.234l2.97-2.476-3.388-1.285c-.052 0-.129-.1-.079-.235l.886-1.771a.138.138 0 01.17-.093.144.144 0 01.065.042l2.97 1.928.183-3.8a.137.137 0 01.114-.156.197.197 0 01.042 0l2.163.287c.131 0 .156.052.131.183L6.86 5.136l3.44-1.043c.077-.052.156-.052.208.1l.339 1.928c.025.13 0 .183-.1.183l-3.6.287z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 12 12"><path d="M10.024 10.155c.087.089.146.206 0 .323l-1.819 1.173c-.146.089-.2.03-.263-.117L5.685 7.605l-2.962 3.254c-.03.057-.117.116-.2 0L1.116 9.392c-.147-.087-.117-.176 0-.263l3.339-2.785L.642 4.908c-.059 0-.146-.117-.089-.264l1-1.993a.156.156 0 01.192-.1.163.163 0 01.073.048l3.337 2.163.206-4.28a.155.155 0 01.128-.176.23.23 0 01.047 0l2.433.323c.147 0 .176.059.147.206l-1.144 4.19 3.87-1.173c.087-.06.176-.06.234.117l.381 2.169c.028.147 0 .206-.117.206l-4.046.323z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.825 6.903c.061.062.1.144 0 .227l-1.277.824c-.1.062-.143.02-.185-.082L3.78 5.112 1.7 7.398c-.021.04-.082.08-.143 0L.569 6.367c-.1-.061-.082-.123 0-.185l2.347-1.957-2.68-1.007c-.041 0-.1-.082-.062-.186l.7-1.4a.109.109 0 01.135-.073.114.114 0 01.051.033l2.347 1.523.145-3.006a.109.109 0 01.09-.123.14.14 0 01.033 0l1.709.227c.1 0 .123.04.1.144l-.8 2.943 2.718-.824c.061-.041.123-.041.165.082l.268 1.523c.02.1 0 .144-.082.144l-2.842.227z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 14 14"><path d="M5.125 12.625a1.25 1.25 0 01-.96-.45L1.04 8.425a1.25 1.25 0 011.92-1.6l2.136 2.563 5.922-7.536a1.25 1.25 0 111.964 1.545l-6.874 8.75a1.25 1.25 0 01-.965.478z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 14 14"><path d="M4.891 13.224a1.304 1.304 0 01-1.005-.474l-3.54-4.3a1.302 1.302 0 012.011-1.655l2.508 3.046 6.758-8.647a1.302 1.302 0 112.05 1.604l-7.756 9.926a1.301 1.301 0 01-1.01.5z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 16 16"><path d="M5.627 14.894a1.357 1.357 0 01-1.042-.488l-4.1-4.92A1.357 1.357 0 012.569 7.75l3.027 3.631L13.4 1.448a1.356 1.356 0 012.133 1.675l-8.84 11.252a1.356 1.356 0 01-1.048.519z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 18 18"><path d="M6.33 16.642a1.415 1.415 0 01-1.086-.509l-4.683-5.62a1.413 1.413 0 012.171-1.81l3.566 4.28 8.936-11.374a1.413 1.413 0 012.223 1.746L7.441 16.102a1.415 1.415 0 01-1.09.54z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 12 12"><path d="M4.519 10.608a1.151 1.151 0 01-.885-.414L1.27 7.358a1.152 1.152 0 011.77-1.476l1.453 1.743 4.45-5.665a1.152 1.152 0 011.813 1.424l-5.331 6.784a1.153 1.153 0 01-.89.44z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 20 20"><path d="M6.997 18.48a1.47 1.47 0 01-1.13-.53L.521 11.538a1.471 1.471 0 112.26-1.885l4.182 5.017L17.18 1.666a1.472 1.472 0 112.314 1.818L8.154 17.917a1.472 1.472 0 01-1.135.562z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 24 24"><path d="M8.621 21.417a1.535 1.535 0 01-1.178-.552l-6.091-7.31a1.533 1.533 0 112.355-1.962l4.879 5.854L20.249 2.602a1.533 1.533 0 112.41 1.895L9.826 20.831a1.53 1.53 0 01-1.182.585z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 12 12"><path d="M4.333 11.09a1.2 1.2 0 01-.922-.433L.69 7.392a1.2 1.2 0 111.844-1.536l1.772 2.126 5.14-6.542a1.2 1.2 0 111.886 1.482L5.277 10.63a1.2 1.2 0 01-.927.459z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 14 14"><path d="M4.5 13.25a1.094 1.094 0 01-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 015.273 1.07l5.157 5.156a1.094 1.094 0 010 1.546L5.273 12.93a1.091 1.091 0 01-.773.321z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 16 16"><path d="M5.123 15.005a1.14 1.14 0 01-.806-1.945L9.377 8l-5.06-5.06a1.14 1.14 0 011.612-1.61l5.865 5.864a1.139 1.139 0 010 1.612L5.929 14.67a1.135 1.135 0 01-.806.334z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 16 16"><path d="M4.696 15.853a1.187 1.187 0 01-.84-2.026L9.684 8 3.856 2.173A1.187 1.187 0 015.536.495L12.2 7.16a1.187 1.187 0 010 1.678l-6.666 6.666a1.183 1.183 0 01-.84.348z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 18 18"><path d="M5.213 17.805a1.236 1.236 0 01-.874-2.11L11.034 9 4.34 2.305A1.236 1.236 0 016.087.557l7.57 7.569a1.235 1.235 0 010 1.748l-7.57 7.569a1.232 1.232 0 01-.874.362z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 20 20"><path d="M5.667 19.876a1.288 1.288 0 01-.91-2.199L12.433 10 4.756 2.323A1.288 1.288 0 016.578.502l8.588 8.587a1.288 1.288 0 010 1.822l-8.588 8.588a1.284 1.284 0 01-.911.377z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 24 24"><path d="M7.05 23.078a1.341 1.341 0 01-.948-2.29L14.89 12 6.102 3.212a1.341 1.341 0 011.896-1.898l9.737 9.737a1.34 1.34 0 010 1.898l-9.737 9.737a1.335 1.335 0 01-.948.392z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 12 12"><path d="M3.833 11.578a1.05 1.05 0 01-.742-1.793L6.876 6 3.091 2.215A1.05 1.05 0 114.575.73l4.529 4.527a1.05 1.05 0 010 1.486L4.575 11.27a1.047 1.047 0 01-.742.308z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 7 7"><path d="M6.687.75a.311.311 0 00-.221.091L.842 6.466a.312.312 0 00.221.533h5.624a.312.312 0 00.312-.312V1.062A.312.312 0 006.687.75z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 8 8"><path d="M7.65.97a.35.35 0 00-.249.1L1.07 7.401a.352.352 0 00.249.6H7.65a.352.352 0 00.352-.352V1.322A.352.352 0 007.65.97z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 8 8"><path d="M7.605.09a.394.394 0 00-.28.116L.206 7.325A.4.4 0 00.49 8h7.115a.4.4 0 00.4-.4V.49a.4.4 0 00-.4-.4z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 6 6"><path d="M5.718.44a.277.277 0 00-.2.081l-5 5a.278.278 0 00.2.474h5a.278.278 0 00.278-.278v-5A.278.278 0 005.718.44z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 10 10"><path d="M6.548 5L9.63 1.917A1.094 1.094 0 008.084.371L5.001 3.454 1.917.37A1.094 1.094 0 00.371 1.917L3.454 5 .37 8.085A1.094 1.094 0 101.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 101.547-1.546z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 12 12"><path d="M7.611 6l3.654-3.653A1.14 1.14 0 009.653.735L6 4.39 2.347.735A1.14 1.14 0 00.735 2.347L4.39 6 .735 9.653a1.14 1.14 0 101.612 1.612L6 7.61l3.653 3.654a1.14 1.14 0 001.612-1.612z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 14 14"><path d="M8.678 7l4.245-4.244a1.186 1.186 0 00-1.678-1.678L7.001 5.323 2.755 1.077a1.187 1.187 0 00-1.678 1.678L5.322 7l-4.244 4.244a1.187 1.187 0 001.678 1.678l4.245-4.245 4.244 4.245a1.186 1.186 0 001.678-1.678z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 16 16"><path d="M9.748 8l4.915-4.915a1.236 1.236 0 00-1.748-1.748L8 6.252 3.085 1.337a1.236 1.236 0 00-1.748 1.748L6.252 8l-4.915 4.915a1.236 1.236 0 101.748 1.748L8 9.748l4.915 4.915a1.236 1.236 0 001.748-1.748z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 16 16"><path d="M9.823 8l5.674-5.674A1.289 1.289 0 1013.675.504L8 6.179 2.326.503A1.288 1.288 0 00.504 2.326l5.674 5.675-5.674 5.674a1.288 1.288 0 001.822 1.822L8 9.822l5.674 5.675a1.289 1.289 0 101.823-1.822z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 18 18"><path d="M10.897 9l6.537-6.536A1.341 1.341 0 1015.537.567L9 7.104 2.465.567A1.341 1.341 0 00.567 2.464L7.104 9 .567 15.537a1.341 1.341 0 101.897 1.897L9 10.897l6.536 6.537a1.341 1.341 0 101.897-1.897z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 10 10"><path d="M6.485 5l2.674-2.674A1.05 1.05 0 107.674.84L5 3.515 2.326.84A1.05 1.05 0 00.84 2.326L3.515 5 .84 7.674A1.05 1.05 0 002.326 9.16L5 6.485 7.674 9.16A1.05 1.05 0 109.16 7.674z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 12 12"><path d="M10.375 7.25h-8.75a1.25 1.25 0 010-2.5h8.75a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 14 14"><path d="M12.026 8.302H1.974a1.302 1.302 0 010-2.604h10.052a1.302 1.302 0 010 2.604z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 16 16"><path d="M13.763 9.356H2.237a1.356 1.356 0 010-2.712h11.526a1.356 1.356 0 010 2.712z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 18 18"><path d="M15.596 10.413H2.404a1.413 1.413 0 010-2.826h13.192a1.413 1.413 0 010 2.826z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 10 10"><path d="M8.293 6.152H1.708a1.152 1.152 0 010-2.304h6.585a1.152 1.152 0 110 2.304z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 20 20"><path d="M17.54 11.472H2.461a1.472 1.472 0 010-2.944h15.077a1.472 1.472 0 010 2.944z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 22 22"><path d="M19.604 12.533H2.398a1.533 1.533 0 110-3.066h17.206a1.533 1.533 0 010 3.066z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 10 10"><path d="M8.75 6.2h-7.5a1.2 1.2 0 010-2.4h7.5a1.2 1.2 0 110 2.4z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 20 6"><path d="M19.375 1.75H.625a.625.625 0 010-1.25h18.75a.625.625 0 010 1.25zM20 4.875a.626.626 0 00-.625-.625H.625a.625.625 0 000 1.25h18.75A.626.626 0 0020 4.875z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 30 4"><path d="M28.75 3.25H1.25a1.25 1.25 0 010-2.5h27.5a1.25 1.25 0 010 2.5z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 14 10"><path d="M12.625 1.25H1.375a.625.625 0 010-1.25h11.25a.625.625 0 010 1.25zm.625 3.125a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625zm0 3.75a.626.626 0 00-.625-.625H1.375a.625.625 0 000 1.25h11.25a.626.626 0 00.625-.625z"/></symbol></svg>`;customElements.define("sp-icons-large",class extends Pe{constructor(){super(),this.name="ui"}renderDefaultContent(){return Ie}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var Be=l`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 10 10"><path d="M9.7 4.387L6.623 1.262a.875.875 0 10-1.247 1.226l1.61 1.637H.925a.875.875 0 000 1.75h6.062l-1.61 1.637a.875.875 0 101.247 1.226l3.075-3.125a.874.874 0 000-1.226z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 12 12"><path d="M11.284 5.356L7.718 1.788a.911.911 0 10-1.29 1.29l2.012 2.01H1.286a.911.911 0 100 1.823H8.44L6.429 8.923a.911.911 0 001.289 1.289l3.566-3.567a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 14 14"><path d="M12.893 6.33L8.826 2.261a.95.95 0 10-1.344 1.341L9.93 6.051H1.621a.95.95 0 100 1.898H9.93l-2.447 2.447a.95.95 0 001.344 1.342l4.067-4.067a.95.95 0 000-1.342z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 16 16"><path d="M14.572 7.3l-4.63-4.63a.989.989 0 00-1.399 1.398l2.942 2.943H1.87a.99.99 0 000 1.978h9.615l-2.942 2.943a.989.989 0 101.398 1.398l4.631-4.63a.988.988 0 000-1.4z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 18 18"><path d="M16.336 8.271l-5.269-5.267A1.03 1.03 0 109.61 4.46l3.51 3.509H2.021a1.03 1.03 0 000 2.06H13.12l-3.51 3.51a1.03 1.03 0 101.457 1.456l5.269-5.268a1.03 1.03 0 000-1.456z"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 20 20"><path d="M18.191 9.241l-5.986-5.987a1.073 1.073 0 00-1.518 1.517l4.155 4.156H2.063a1.073 1.073 0 100 2.146h12.779l-4.154 4.155a1.073 1.073 0 101.517 1.518l5.986-5.987a1.073 1.073 0 000-1.518z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 10 10"><path d="M9.26 4.406L6.528 1.672A.84.84 0 005.34 2.859l1.3 1.301H1.396a.84.84 0 000 1.68H6.64l-1.301 1.3a.84.84 0 001.188 1.188l2.734-2.734a.84.84 0 000-1.188z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 8 8"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 10 10"><path d="M7.861 7.953c.062.063.1.146 0 .23l-1.293.834c-.1.063-.145.021-.187-.083l-1.6-2.793-2.105 2.314c-.021.04-.083.082-.145 0l-1-1.043c-.1-.062-.083-.125 0-.187l2.375-1.981-2.715-1.026c-.042 0-.1-.083-.063-.188l.707-1.412a.111.111 0 01.136-.074.116.116 0 01.052.034l2.378 1.54.146-3.043A.11.11 0 014.638.95a.161.161 0 01.034 0l1.73.23c.1 0 .125.042.1.146l-.814 2.979 2.751-.834c.062-.042.125-.042.167.083l.271 1.542c.02.1 0 .146-.083.146l-2.876.23z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 10 10"><path d="M8.266 8.324c.07.071.116.164 0 .258l-1.454.938c-.116.071-.163.024-.21-.094l-1.8-3.141-2.367 2.6c-.024.045-.094.092-.163 0l-1.13-1.167c-.118-.07-.094-.141 0-.21l2.671-2.227L.766 4.13c-.047 0-.116-.094-.071-.211l.8-1.593a.124.124 0 01.153-.084.13.13 0 01.058.038l2.669 1.738.164-3.422a.124.124 0 01.1-.14.186.186 0 01.038 0l1.945.258c.118 0 .14.047.118.164l-.915 3.349 3.094-.938c.07-.047.14-.047.187.094l.3 1.734c.023.118 0 .164-.094.164l-3.234.258z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.26 6.463c.049.05.082.116 0 .181l-1.022.659c-.082.05-.115.017-.148-.066L3.822 5.03 2.16 6.859c-.017.032-.066.065-.115 0l-.79-.824c-.083-.049-.066-.1 0-.148l1.877-1.565L.99 3.516c-.033 0-.082-.066-.05-.148l.56-1.119a.087.087 0 01.108-.059.09.09 0 01.04.027l1.878 1.218.116-2.4a.087.087 0 01.072-.1h.027l1.367.181c.083 0 .1.033.083.116L4.55 3.581l2.174-.659c.049-.033.1-.033.132.066l.214 1.218c.016.083 0 .115-.066.115l-2.273.181z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 10 10"><path d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 12 12"><path d="M4.313 10.98a1.042 1.042 0 01-.8-.375L.647 7.165a1.042 1.042 0 011.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 011.64 1.287l-6.24 7.94a1.04 1.04 0 01-.804.399z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 14 14"><path d="M5.102 12.514a1.087 1.087 0 01-.834-.39L.988 8.19A1.085 1.085 0 012.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 011.707 1.34L5.955 12.1a1.089 1.089 0 01-.838.415z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 16 16"><path d="M5.864 14.114a1.13 1.13 0 01-.868-.407L1.25 9.21a1.13 1.13 0 111.736-1.448l2.854 3.425 7.148-9.1a1.13 1.13 0 111.778 1.397L6.753 13.682a1.13 1.13 0 01-.872.432z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 10 10"><path d="M3.815 8.687a.921.921 0 01-.708-.332l-1.891-2.27a.921.921 0 011.416-1.18L3.794 6.3l3.56-4.531a.921.921 0 111.45 1.138L4.54 8.335a.921.921 0 01-.712.351z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 16 16"><path d="M5.597 14.784a1.177 1.177 0 01-.905-.424L.417 9.229a1.177 1.177 0 111.809-1.508l3.343 4.013 8.174-10.402a1.177 1.177 0 011.852 1.456L6.523 14.334a1.178 1.178 0 01-.91.45z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 18 18"><path d="M6.297 16.534a1.228 1.228 0 01-.942-.442L.48 10.244a1.227 1.227 0 011.885-1.57l3.904 4.684L15.6 1.482a1.227 1.227 0 011.93 1.516L7.262 16.065a1.229 1.229 0 01-.947.469z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 10 10"><path d="M3.667 9.07a.96.96 0 01-.737-.344L.753 6.114a.96.96 0 111.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 011.51 1.186L4.422 8.704a.962.962 0 01-.741.367z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 12 12"><path d="M9.034 5.356L4.343.663a.911.911 0 00-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 101.289 1.29l4.691-4.692a.912.912 0 000-1.29z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 14 14"><path d="M10.639 7a.947.947 0 00-.278-.671l-.003-.002-5.33-5.33a.95.95 0 00-1.342 1.342L8.346 7l-4.661 4.66a.95.95 0 101.342 1.343l5.33-5.33.003-.001A.947.947 0 0010.64 7z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 16 16"><path d="M4.97 15.044a.989.989 0 01-.698-1.688L9.627 8 4.27 2.644a.989.989 0 011.4-1.398L11.726 7.3a.988.988 0 010 1.398L5.67 14.754a.985.985 0 01-.7.29z"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 16 16"><path d="M12.133 7.271L5.263.401a1.03 1.03 0 00-1.457 1.457L9.947 8l-6.141 6.142a1.03 1.03 0 001.457 1.457l6.87-6.87a1.03 1.03 0 000-1.457z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 18 18"><path d="M5.04 17.863a1.073 1.073 0 01-.759-1.832L11.313 9 4.28 1.969A1.073 1.073 0 015.8.45l7.79 7.79a1.073 1.073 0 010 1.518l-7.79 7.79a1.07 1.07 0 01-.759.314z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 10 10"><path d="M7.482 4.406l-.001-.001L3.86.783a.84.84 0 00-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 003.86 9.216l3.621-3.622h.001a.84.84 0 000-1.19z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 5 5"><path d="M4.763 0a.248.248 0 00-.177.073l-4.5 4.5A.25.25 0 00.263 5h4.5a.25.25 0 00.25-.25V.25a.25.25 0 00-.25-.25z"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 6 6"><path d="M5.719.37a.281.281 0 00-.2.082L.452 5.519a.281.281 0 00.2.481h5.067A.281.281 0 006 5.719V.652A.281.281 0 005.72.37z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 7 7"><path d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 5 5"><path d="M4.78.558a.222.222 0 00-.157.065l-4 4a.222.222 0 00.157.379h4a.222.222 0 00.222-.222v-4A.222.222 0 004.78.558z"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 8 8"><path d="M5.238 4l2.456-2.457A.875.875 0 106.456.306L4 2.763 1.543.306A.875.875 0 00.306 1.544L2.763 4 .306 6.457a.875.875 0 101.238 1.237L4 5.237l2.456 2.457a.875.875 0 101.238-1.237z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 10 10"><path d="M6.29 5l2.922-2.922a.911.911 0 00-1.29-1.29L5 3.712 2.078.789a.911.911 0 00-1.29 1.289L3.712 5 .79 7.922a.911.911 0 101.289 1.29L5 6.288 7.923 9.21a.911.911 0 001.289-1.289z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 12 12"><path d="M7.344 6l3.395-3.396a.95.95 0 00-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 00-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 001.343 1.343L6 7.344l3.395 3.395a.95.95 0 001.344-1.344z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 12 12"><path d="M7.398 6l3.932-3.932A.989.989 0 009.932.67L6 4.602 2.068.67A.989.989 0 00.67 2.068L4.602 6 .67 9.932a.989.989 0 101.398 1.398L6 7.398l3.932 3.932a.989.989 0 001.398-1.398z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 14 14"><path d="M8.457 7l4.54-4.54a1.03 1.03 0 00-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 00-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 101.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 001.456-1.458z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 16 16"><path d="M9.518 8l5.23-5.228a1.073 1.073 0 00-1.518-1.518L8.001 6.483l-5.229-5.23a1.073 1.073 0 00-1.518 1.519L6.483 8l-5.23 5.229a1.073 1.073 0 101.518 1.518l5.23-5.23 5.228 5.23a1.073 1.073 0 001.518-1.518z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 8 8"><path d="M5.188 4l2.14-2.14A.84.84 0 106.141.672L4 2.812 1.86.672A.84.84 0 00.672 1.86L2.812 4 .672 6.14A.84.84 0 101.86 7.328L4 5.188l2.14 2.14A.84.84 0 107.328 6.14z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 10 10"><path d="M8.5 6h-7a1 1 0 010-2h7a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 12 12"><path d="M10.021 7.042H1.98a1.042 1.042 0 110-2.083h8.043a1.042 1.042 0 010 2.083z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 12 12"><path d="M10.61 7.085H1.39a1.085 1.085 0 010-2.17h9.22a1.085 1.085 0 010 2.17z"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 14 14"><path d="M12.277 8.13H1.723a1.13 1.13 0 110-2.26h10.554a1.13 1.13 0 110 2.26z"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 8 8"><path d="M6.634 4.921H1.366a.921.921 0 010-1.842h5.268a.921.921 0 110 1.842z"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 16 16"><path d="M14.03 9.178H1.969a1.178 1.178 0 110-2.356H14.03a1.178 1.178 0 010 2.356z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 18 18"><path d="M15.882 10.227H2.117a1.227 1.227 0 010-2.454h13.765a1.227 1.227 0 010 2.454z"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 8 8"><path d="M6.99 4.96H1.01a.96.96 0 010-1.92h5.98a.96.96 0 010 1.92z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 16 4"><path d="M15.45 1.05H.55a.5.5 0 010-1h14.9a.5.5 0 010 1zm.5 2.4a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h14.9a.5.5 0 00.5-.5z"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 24 2"><path d="M23 2H1a1 1 0 010-2h22a1 1 0 010 2z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 10 8"><path d="M9.45 1.05H.55a.5.5 0 010-1h8.9a.5.5 0 010 1zm.5 2.45a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5H.55a.5.5 0 000 1h8.9a.5.5 0 00.5-.5z"/></symbol></svg>`;customElements.define("sp-icons-medium",class extends Pe{constructor(){super(),this.name="ui"}renderDefaultContent(){return Be}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var De=n`:host{border:none;box-sizing:content-box;height:var(--spectrum-listitem-texticon-divider-size);margin:calc(var(--spectrum-listitem-texticon-divider-padding)/2) var(--spectrum-listitem-texticon-padding-y);overflow:visible;padding:0}:host{background-color:var(
--spectrum-listitem-m-texticon-divider-color,var(--spectrum-alias-border-color-extralight)
)}:host{display:block}`;customElements.define("sp-menu-divider",class extends e{static get styles(){return[De]}firstUpdated(){this.setAttribute("role","separator")}});var He=n`:host([size=s]){--spectrum-progressbar-border-radius:var(
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
)}.fill{transform-origin:left}:host([dir=rtl]) .fill{transform-origin:right}`;class Fe extends(f(b(e,""))){constructor(){super(...arguments),this.progress=0,this.overBackground=!1,this.notice=!1,this.negative=!1,this.positive=!1,this.label="",this.sideLabel=!1}static get styles(){return[He]}render(){return r`<sp-field-label size="${this.size}" class="label">${this.slotHasContent?r``:this.label}<slot>${this.label}</slot></sp-field-label><sp-field-label size="${this.size}" class="percentage">${this.progress}%</sp-field-label><div class="track"><div class="fill" style="transform:scaleX(calc(${this.progress} / 100))"></div></div>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}function Te(){return(Te=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t}).apply(this,arguments)}o([i({type:Number})],Fe.prototype,"progress",void 0),o([i({type:Boolean,reflect:!0,attribute:"over-background"})],Fe.prototype,"overBackground",void 0),o([i({type:Boolean,reflect:!0})],Fe.prototype,"notice",void 0),o([i({type:Boolean,reflect:!0})],Fe.prototype,"negative",void 0),o([i({type:Boolean,reflect:!0})],Fe.prototype,"positive",void 0),o([i({type:String,reflect:!0})],Fe.prototype,"label",void 0),o([i({type:Boolean,reflect:!0,attribute:"side-label"})],Fe.prototype,"sideLabel",void 0),customElements.define("sp-meter",Fe);let Ue=new Map,Oe=!1;try{Oe="exceptZero"===new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay}catch(Y){}let Ne=!1;try{Ne="unit"===new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style}catch(Y){}const Re={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class je{constructor(t,e){void 0===e&&(e={}),this.numberFormatter=void 0,this.options=void 0,this.numberFormatter=function(t,e){void 0===e&&(e={});let{numberingSystem:r}=e;r&&-1===t.indexOf("-u-nu-")&&(t=t+"-u-nu-"+r);if("unit"===e.style&&!Ne){var o;let{unit:t,unitDisplay:r="short"}=e;if(!t)throw new Error('unit option must be provided with style: "unit"');if(null==(o=Re[t])||!o[r])throw new Error("Unsupported unit "+t+" with unitDisplay = "+r);e=Te({},e,{style:"decimal"})}let i=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():"");if(Ue.has(i))return Ue.get(i);let s=new Intl.NumberFormat(t,e);return Ue.set(i,s),s}(t,e),this.options=e}format(t){let e="";if(e=Oe||null==this.options.signDisplay?this.numberFormatter.format(t):function(t,e,r){if("auto"===e)return t.format(r);if("never"===e)return t.format(Math.abs(r));{let o=!1;if("always"===e?o=r>0||Object.is(r,0):"exceptZero"===e&&(Object.is(r,-0)||Object.is(r,0)?r=Math.abs(r):o=r>0),o){let e=t.format(-r),o=t.format(r),i=e.replace(o,"").replace(/\u200e|\u061C/,"");return 1!==[...i].length&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),e.replace(o,"!!!").replace(i,"+").replace("!!!",o)}return t.format(r)}}(this.numberFormatter,this.options.signDisplay,t),"unit"===this.options.style&&!Ne){var r;let{unit:t,unitDisplay:o="short",locale:i}=this.resolvedOptions(),s=null==(r=Re[t])?void 0:r[o];e+=s[i]||s.default}return e}formatToParts(t){return this.numberFormatter.formatToParts(t)}resolvedOptions(){let t=this.numberFormatter.resolvedOptions();return Oe||null==this.options.signDisplay||(t=Te({},t,{signDisplay:this.options.signDisplay})),Ne||"unit"!==this.options.style||(t=Te({},t,{style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay})),t}}const Ve=new RegExp("^.*\\(.*\\).*$"),Ke=["latn","arab","hanidec"];class Xe{constructor(t,e){void 0===e&&(e={}),this.locale=void 0,this.options=void 0,this.locale=t,this.options=e}parse(t){return Ye(this.locale,this.options,t).parse(t)}isValidPartialNumber(t,e,r){return Ye(this.locale,this.options,t).isValidPartialNumber(t,e,r)}getNumberingSystem(t){return Ye(this.locale,this.options,t).options.numberingSystem}}const Ge=new Map;function Ye(t,e,r){let o=We(t,e);if(!t.includes("-nu-")&&!o.isValidPartialNumber(r))for(let i of Ke)if(i!==o.options.numberingSystem){let o=We(t+(t.includes("-u-")?"-nu-":"-u-nu-")+i,e);if(o.isValidPartialNumber(r))return o}return o}function We(t,e){let r=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():""),o=Ge.get(r);return o||(o=new Ze(t,e),Ge.set(r,o)),o}class Ze{constructor(t,e){void 0===e&&(e={}),this.formatter=void 0,this.options=void 0,this.symbols=void 0,this.formatter=new Intl.NumberFormat(t,e),this.options=this.formatter.resolvedOptions(),this.symbols=function(t,e,r){var o,i,s,a,l;let c=t.formatToParts(-10000.111),n=t.formatToParts(10000.111),d=t.formatToParts(1),u=null!=(o=null==(i=c.find((t=>"minusSign"===t.type)))?void 0:i.value)?o:"-",p=null==(s=n.find((t=>"plusSign"===t.type)))?void 0:s.value;p||"exceptZero"!==(null==r?void 0:r.signDisplay)&&"always"!==(null==r?void 0:r.signDisplay)||(p="+");let h=null==(a=c.find((t=>"decimal"===t.type)))?void 0:a.value,m=null==(l=c.find((t=>"group"===t.type)))?void 0:l.value,b=c.filter((t=>!Qe.has(t.type))).map((t=>tr(t.value))),v=d.filter((t=>!Qe.has(t.type))).map((t=>tr(t.value))),g=[...new Set([...v,...b])].sort(((t,e)=>e.length-t.length)),f=new RegExp(g.join("|")+"|[\\p{White_Space}]","gu"),x=[...new Intl.NumberFormat(e.locale,{useGrouping:!1}).format(9876543210)].reverse(),y=new Map(x.map(((t,e)=>[t,e]))),k=new RegExp("["+x.join("")+"]","g");return{minusSign:u,plusSign:p,decimal:h,group:m,literals:f,numeral:k,index:t=>String(y.get(t))}}(this.formatter,this.options,e)}parse(t){let e=this.sanitize(t);e=Je(e,this.symbols.group,"").replace(this.symbols.decimal,".").replace(this.symbols.minusSign,"-").replace(this.symbols.numeral,this.symbols.index);let r=e?+e:NaN;if(isNaN(r))return NaN;var o;("accounting"===this.options.currencySign&&Ve.test(t)&&(r*=-1),"percent"===this.options.style)&&(r/=100,r=+r.toFixed((null!=(o=this.options.maximumFractionDigits)?o:0)+2));return r}sanitize(t){return t=(t=t.replace(this.symbols.literals,"")).replace("-",this.symbols.minusSign),"arab"===this.options.numberingSystem&&(t=Je(t=(t=t.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal),".",this.symbols.group)),"fr-FR"===this.options.locale&&(t=Je(t,".",String.fromCharCode(8239))),t}isValidPartialNumber(t,e,r){return void 0===e&&(e=-1/0),void 0===r&&(r=1/0),(t=this.sanitize(t)).startsWith(this.symbols.minusSign)&&e<0?t=t.slice(this.symbols.minusSign.length):this.symbols.plusSign&&t.startsWith(this.symbols.plusSign)&&r>0&&(t=t.slice(this.symbols.plusSign.length)),!t.startsWith(this.symbols.group)&&0===(t=Je(t,this.symbols.group,"").replace(this.symbols.numeral,"").replace(this.symbols.decimal,"")).length}}const Qe=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]);function Je(t,e,r){return t.replaceAll?t.replaceAll(e,r):t.split(e).join(r)}function tr(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}var er=n`:host{--spectrum-stepper-width:var(
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
)}:host{width:var(--spectrum-stepper-width)}#textfield{width:100%}sp-field-button{--spectrum-dropdown-height:100%;--spectrum-dropdown-padding-x:0}.input{font-feature-settings:"tnum";font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none}:host([hide-stepper]:not([quiet])) .input{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][invalid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][invalid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][valid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][valid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet][invalid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][invalid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr][quiet][valid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][valid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr]:not([hide-stepper])) .icon-workflow{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl]:not([hide-stepper])) .icon-workflow{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet]:not([hide-stepper])) .icon-workflow{left:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet]:not([hide-stepper])) .icon-workflow{right:var(--spectrum-stepper-button-width)}`;class rr extends O{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.resolvedLanguage=document.documentElement.lang||navigator.language,this.stepperActive=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.changeCount=0,this.wasIndeterminate=!1}static get styles(){return[...super.styles,er,E]}set value(t){if(t===this.value)return;const e=this._value;this._value=t,this.requestUpdate("value",e)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}get valueAsString(){return this._value.toString()}set valueAsString(t){this.value=this.numberParser.parse(t)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(t){return this.numberParser.parse(t)}get _step(){var t;return void 0!==this.step?this.step:"percent"===(null===(t=this.formatOptions)||void 0===t?void 0:t.style)?.01:1}handlePointerdown(t){if(0!==t.button)return void t.preventDefault();this.stepperActive=!0,this.buttons.setPointerCapture(t.pointerId);const e=this.buttons.children[0].getBoundingClientRect(),r=this.buttons.children[1].getBoundingClientRect();this.findChange=t=>{t.clientX>=e.x&&t.clientY>=e.y&&t.clientX<=e.x+e.width&&t.clientY<=e.y+e.height?this.change=t=>this.increment(t.shiftKey?this.stepModifier:1):t.clientX>=r.x&&t.clientY>=r.y&&t.clientX<=r.x+r.width&&t.clientY<=r.y+r.height&&(this.change=t=>this.decrement(t.shiftKey?this.stepModifier:1))},this.findChange(t),this.startChange(t)}startChange(t){this.changeCount=0,this.doChange(t),this.safty=setTimeout((()=>{this.doNextChange(t)}),400)}doChange(t){this.change(t)}handlePointermove(t){this.findChange(t)}handlePointerup(t){this.buttons.releasePointerCapture(t.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.stepperActive=!1}doNextChange(t){return this.changeCount+=1,this.changeCount%5==0&&this.doChange(t),requestAnimationFrame((()=>{this.nextChange=this.doNextChange(t)}))}stepBy(t){if(this.disabled||this.readonly)return;const e=void 0!==this.min?this.min:0;let r=this.value;r+=t*this._step,isNaN(this.value)?this.value=e:this.value=r,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus()}increment(t=1){this.stepBy(1*t)}decrement(t=1){this.stepBy(-1*t)}handleKeydown(t){switch(t.code){case"ArrowUp":t.preventDefault(),this.increment(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));break;case"ArrowDown":t.preventDefault(),this.decrement(t.shiftKey?this.stepModifier:1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}onScroll(t){t.preventDefault();const e=t.shiftKey?t.deltaX/Math.abs(t.deltaX):t.deltaY/Math.abs(t.deltaY);0===e||isNaN(e)||this.stepBy(e*(t.shiftKey?this.stepModifier:1))}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!0,this.addEventListener("wheel",this.onScroll)}onBlur(){super.onBlur(),this.keyboardFocused=!1,this.removeEventListener("wheel",this.onScroll)}handleFocusin(){this.focused=!0,this.keyboardFocused=!0}handleFocusout(){this.focused=!1,this.keyboardFocused=!1}onChange(){const t=this.convertValueToNumber(this.inputValue);this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(t))?this.indeterminate=!0:(this.value=t,super.onChange())}onInput(){this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace("-",""));const{value:t,selectionStart:e}=this.inputElement;if(this.numberParser.isValidPartialNumber(t)){const e=this.convertValueToNumber(t);return!t&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(e)),void(this._trackingValue=t)}const r=t.length,o=(e||r)-(r-this._trackingValue.length);this.inputElement.value=this.indeterminate?"-":this._trackingValue,this.inputElement.setSelectionRange(o,o)}validateInput(t){if(void 0!==this.min&&(t=Math.max(this.min,t)),void 0!==this.max&&(t=Math.min(this.max,t)),this.step){const e=(t-(void 0!==this.min?this.min:0))%this.step;if(!(0===e)){1===Math.round(e/this.step)?t+=this.step-e:t-=e}if(void 0!==this.max)for(;t>this.max;)t-=this.step}return t}get displayValue(){const t=this.focused?"":"-";return this.indeterminate?t:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const t=this.formatOptions,{style:e,unit:r,unitDisplay:o}=t,i=c(t,["style","unit","unitDisplay"]);"unit"!==e&&(i.style=e),this._numberFormatterFocused=new je(this.resolvedLanguage,i);try{this._numberFormatter=new je(this.resolvedLanguage,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch(t){"unit"===e&&(this._forcedUnit=r),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const t=this.formatOptions,{style:e,unit:r,unitDisplay:o}=t,i=c(t,["style","unit","unitDisplay"]);"unit"!==e&&(i.style=e),this._numberParserFocused=new Xe(this.resolvedLanguage,i);try{this._numberParser=new Xe(this.resolvedLanguage,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch(t){"unit"===e&&(this._forcedUnit=r),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",r`${super.renderField()} ${this.hideStepper?r``:r`<span class="buttons" @focusin="${this.handleFocusin}" @focusout="${this.handleFocusout}" ${jt({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}><sp-action-button class="stepUp" label="Increment" tabindex="-1" ?focused="${this.focused}" ?disabled="${this.disabled||this.readonly||void 0!==this.max&&this.value===this.max}" ?quiet="${this.quiet}"><sp-icon-chevron75 slot="icon" class="stepper-icon spectrum-UIIcon-ChevronUp75"></sp-icon-chevron75></sp-action-button><sp-action-button class="stepDown" label="Decrement" tabindex="-1" ?focused="${this.focused}" ?disabled="${this.disabled||this.readonly||void 0!==this.min&&this.value===this.min}" ?quiet="${this.quiet}"><sp-icon-chevron75 slot="icon" class="stepper-icon spectrum-UIIcon-ChevronDown75"></sp-icon-chevron75></sp-action-button></span>`}`}update(t){(t.has("formatOptions")||t.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),super.update(t)}firstUpdated(t){super.firstUpdated(t),this.multiline=!1,this.addEventListener("keydown",this.handleKeydown)}updated(t){if(t.has("value")||t.has("max")||t.has("min")||t.has("min")){const t=this.numberParser.parse(this.inputValue.replace(this._forcedUnit,""));this.value=this.validateInput(t)}if(t.has("min")||t.has("formatOptions")){let t="numeric";const e=void 0!==this.min&&this.min<0,{maximumFractionDigits:r}=this.formatOptions,o=r&&r>0;ot()?e?t="text":o&&(t="decimal"):st()&&(e?t="numeric":o&&(t="decimal")),this.inputElement.inputMode=t}}connectedCallback(){super.connectedCallback(),this.resolveLanguage()}disconnectedCallback(){this.resolveLanguage(),super.disconnectedCallback()}resolveLanguage(){const t=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:t=>{this.resolvedLanguage=t}},cancelable:!0});this.dispatchEvent(t)}}o([g(".buttons")],rr.prototype,"buttons",void 0),o([i({type:Boolean,reflect:!0})],rr.prototype,"focused",void 0),o([i({type:Object,attribute:"format-options"})],rr.prototype,"formatOptions",void 0),o([i({type:Boolean,reflect:!0,attribute:"hide-stepper"})],rr.prototype,"hideStepper",void 0),o([i({type:Boolean,reflect:!0})],rr.prototype,"indeterminate",void 0),o([i({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],rr.prototype,"keyboardFocused",void 0),o([i({type:Number})],rr.prototype,"max",void 0),o([i({type:Number})],rr.prototype,"min",void 0),o([i({attribute:!1})],rr.prototype,"resolvedLanguage",void 0),o([i({type:Number})],rr.prototype,"step",void 0),o([i({type:Number,reflect:!0,attribute:"step-modifier"})],rr.prototype,"stepModifier",void 0),o([i({type:Number})],rr.prototype,"value",null),customElements.define("sp-number-field",rr);var or=Object.freeze({__proto__:null});customElements.define("overlay-trigger",ct);var ir=n`:host([size=s]){--spectrum-progressbar-border-radius:var(
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
)}.fill{transform-origin:left;width:100%}:host([dir=rtl]) .fill{transform-origin:right}`;class sr extends(f(e)){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[ir]}render(){return r`${this.label?r`<sp-field-label size="${this.size}" class="label">${this.label}</sp-field-label>${this.indeterminate?r``:r`<sp-field-label size="${this.size}" class="percentage">${this.progress}%</sp-field-label>`}`:r``}<div class="track"><div class="fill" style="transform:scaleX(calc(${this.progress} / 100))"></div></div>`}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}o([i({type:Boolean,reflect:!0})],sr.prototype,"indeterminate",void 0),o([i({type:String})],sr.prototype,"label",void 0),o([i({type:Boolean,reflect:!0,attribute:"over-background"})],sr.prototype,"overBackground",void 0),o([i({type:Boolean,reflect:!0,attribute:"side-label"})],sr.prototype,"sideLabel",void 0),o([i({type:Number})],sr.prototype,"progress",void 0),customElements.define("sp-progress-bar",sr);var ar=n`.fill-submask-2{animation:spectrum-fill-mask-2 1s linear infinite}@keyframes spectrum-fill-mask-1{0%{transform:rotate(90deg)}1.69%{transform:rotate(72.3deg)}3.39%{transform:rotate(55.5deg)}5.08%{transform:rotate(40.3deg)}6.78%{transform:rotate(25deg)}8.47%{transform:rotate(10.6deg)}10.17%{transform:rotate(0)}11.86%{transform:rotate(0)}13.56%{transform:rotate(0)}15.25%{transform:rotate(0)}16.95%{transform:rotate(0)}18.64%{transform:rotate(0)}20.34%{transform:rotate(0)}22.03%{transform:rotate(0)}23.73%{transform:rotate(0)}25.42%{transform:rotate(0)}27.12%{transform:rotate(0)}28.81%{transform:rotate(0)}30.51%{transform:rotate(0)}32.2%{transform:rotate(0)}33.9%{transform:rotate(0)}35.59%{transform:rotate(0)}37.29%{transform:rotate(0)}38.98%{transform:rotate(0)}40.68%{transform:rotate(0)}42.37%{transform:rotate(5.3deg)}44.07%{transform:rotate(13.4deg)}45.76%{transform:rotate(20.6deg)}47.46%{transform:rotate(29deg)}49.15%{transform:rotate(36.5deg)}50.85%{transform:rotate(42.6deg)}52.54%{transform:rotate(48.8deg)}54.24%{transform:rotate(54.2deg)}55.93%{transform:rotate(59.4deg)}57.63%{transform:rotate(63.2deg)}59.32%{transform:rotate(67.2deg)}61.02%{transform:rotate(70.8deg)}62.71%{transform:rotate(73.8deg)}64.41%{transform:rotate(76.2deg)}66.1%{transform:rotate(78.7deg)}67.8%{transform:rotate(80.6deg)}69.49%{transform:rotate(82.6deg)}71.19%{transform:rotate(83.7deg)}72.88%{transform:rotate(85deg)}74.58%{transform:rotate(86.3deg)}76.27%{transform:rotate(87deg)}77.97%{transform:rotate(87.7deg)}79.66%{transform:rotate(88.3deg)}81.36%{transform:rotate(88.6deg)}83.05%{transform:rotate(89.2deg)}84.75%{transform:rotate(89.2deg)}86.44%{transform:rotate(89.5deg)}88.14%{transform:rotate(89.9deg)}89.83%{transform:rotate(89.7deg)}91.53%{transform:rotate(90.1deg)}93.22%{transform:rotate(90.2deg)}94.92%{transform:rotate(90.1deg)}96.61%{transform:rotate(90deg)}98.31%{transform:rotate(89.8deg)}to{transform:rotate(90deg)}}@keyframes spectrum-fill-mask-2{0%{transform:rotate(180deg)}1.69%{transform:rotate(180deg)}3.39%{transform:rotate(180deg)}5.08%{transform:rotate(180deg)}6.78%{transform:rotate(180deg)}8.47%{transform:rotate(180deg)}10.17%{transform:rotate(179.2deg)}11.86%{transform:rotate(164deg)}13.56%{transform:rotate(151.8deg)}15.25%{transform:rotate(140.8deg)}16.95%{transform:rotate(130.3deg)}18.64%{transform:rotate(120.4deg)}20.34%{transform:rotate(110.8deg)}22.03%{transform:rotate(101.6deg)}23.73%{transform:rotate(93.5deg)}25.42%{transform:rotate(85.4deg)}27.12%{transform:rotate(78.1deg)}28.81%{transform:rotate(71.2deg)}30.51%{transform:rotate(89.1deg)}32.2%{transform:rotate(105.5deg)}33.9%{transform:rotate(121.3deg)}35.59%{transform:rotate(135.5deg)}37.29%{transform:rotate(148.4deg)}38.98%{transform:rotate(161deg)}40.68%{transform:rotate(173.5deg)}42.37%{transform:rotate(180deg)}44.07%{transform:rotate(180deg)}45.76%{transform:rotate(180deg)}47.46%{transform:rotate(180deg)}49.15%{transform:rotate(180deg)}50.85%{transform:rotate(180deg)}52.54%{transform:rotate(180deg)}54.24%{transform:rotate(180deg)}55.93%{transform:rotate(180deg)}57.63%{transform:rotate(180deg)}59.32%{transform:rotate(180deg)}61.02%{transform:rotate(180deg)}62.71%{transform:rotate(180deg)}64.41%{transform:rotate(180deg)}66.1%{transform:rotate(180deg)}67.8%{transform:rotate(180deg)}69.49%{transform:rotate(180deg)}71.19%{transform:rotate(180deg)}72.88%{transform:rotate(180deg)}74.58%{transform:rotate(180deg)}76.27%{transform:rotate(180deg)}77.97%{transform:rotate(180deg)}79.66%{transform:rotate(180deg)}81.36%{transform:rotate(180deg)}83.05%{transform:rotate(180deg)}84.75%{transform:rotate(180deg)}86.44%{transform:rotate(180deg)}88.14%{transform:rotate(180deg)}89.83%{transform:rotate(180deg)}91.53%{transform:rotate(180deg)}93.22%{transform:rotate(180deg)}94.92%{transform:rotate(180deg)}96.61%{transform:rotate(180deg)}98.31%{transform:rotate(180deg)}to{transform:rotate(180deg)}}@keyframes spectrum-fills-rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}:host{direction:ltr;display:inline-block;height:var(
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
)}.fillMask1,.fillMask2{height:100%;overflow:hidden;position:absolute;transform:rotate(180deg);transform-origin:100% center;width:50%}.fillSubMask1,.fillSubMask2{height:100%;overflow:hidden;transform:rotate(-180deg);transform-origin:100% center;width:100%}.fillMask2{transform:rotate(0)}:host([size=s]){height:var(
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
)}:host{--spectrum-progresscircle-m-over-background-track-fill-color:var(
--spectrum-alias-track-fill-color-overbackground
)}`;class lr extends(f(e,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.overBackground=!1,this.progress=0}static get styles(){return[ar]}makeRotation(t){return this.indeterminate?void 0:`transform: rotate(${t}deg);`}render(){const t=[this.makeRotation(3.6*Math.min(this.progress,50)-180),this.makeRotation(3.6*Math.max(this.progress-50,0)-180)];return r`<div class="track"></div><div class="fills">${["Mask1","Mask2"].map(((e,o)=>r`<div class="fill${e}"><div class="fillSub${e}" style="${v(t[o])}"><div class="fill"></div></div></div>`))}</div>`}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),!this.indeterminate&&t.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),this.label&&t.has("label")&&this.setAttribute("aria-label",this.label)}}o([i({type:Boolean,reflect:!0})],lr.prototype,"indeterminate",void 0),o([i({type:String})],lr.prototype,"label",void 0),o([i({type:Boolean,reflect:!0,attribute:"over-background"})],lr.prototype,"overBackground",void 0),o([i({type:Number})],lr.prototype,"progress",void 0),customElements.define("sp-progress-circle",lr);var cr=n`:host{--spectrum-radio-circle-dot-size:var(
--spectrum-radio-m-circle-dot-size,var(--spectrum-global-dimension-static-size-50)
);--spectrum-radio-circle-diameter:var(
--spectrum-radio-m-circle-diameter,var(--spectrum-alias-control-two-size-m)
);--spectrum-radio-circle-border-size:var(
--spectrum-radio-m-circle-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-radio-text-size:var(
--spectrum-radio-m-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-radio-text-gap:var(
--spectrum-radio-m-text-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-radio-text-font-style:var(
--spectrum-radio-m-text-font-style,var(--spectrum-global-font-style-regular)
);--spectrum-radio-text-font-weight:var(
--spectrum-radio-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-radio-text-line-height:var(
--spectrum-radio-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-radio-height:var(
--spectrum-radio-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-radio-radius:calc(var(--spectrum-radio-circle-diameter)/2);--spectrum-radio-border-width-checked:calc(var(--spectrum-radio-circle-diameter)/2 - var(--spectrum-radio-circle-dot-size)/2);--spectrum-radio-labelbelow-label-margin:var(
--spectrum-global-dimension-size-50
) 0 0 0;--spectrum-radio-labelbelow-height:auto;--spectrum-radio-label-margin-top:var(--spectrum-global-dimension-size-75)}:host{align-items:flex-start;display:inline-flex;max-width:100%;min-height:var(--spectrum-radio-height);position:relative;vertical-align:top}#input{box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:100%;height:100%;line-height:1.15;margin:0;opacity:0;overflow:visible;padding:0;position:absolute;width:100%;z-index:1}:host([disabled]) #input{cursor:default}:host([checked]) #input+#button:before{border-width:var(
--spectrum-radio-border-width-checked
)}:host(.focus-visible) #input+#button:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}:host(:focus-visible) #input+#button:after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}:host([dir=ltr]) #label{text-align:left}:host([dir=rtl]) #label{text-align:right}:host([dir=ltr]) #label{margin-left:var(
--spectrum-radio-text-gap
)}:host([dir=rtl]) #label{margin-right:var(
--spectrum-radio-text-gap
)}#label{font-size:var(--spectrum-radio-text-size);font-style:var(--spectrum-radio-text-font-style);font-weight:var(--spectrum-radio-text-font-weight);line-height:var(--spectrum-radio-text-line-height);margin-top:var(
--spectrum-radio-label-margin-top
);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#button{box-sizing:border-box;flex-grow:0;flex-shrink:0;height:var(--spectrum-radio-circle-diameter);margin:calc((var(--spectrum-radio-height) - var(--spectrum-radio-circle-diameter))/ 2) 0;position:relative;width:var(--spectrum-radio-circle-diameter)}#button:before{border-radius:var(--spectrum-radio-radius);border-style:solid;border-width:var(--spectrum-radio-circle-border-size);box-sizing:border-box;content:"";display:block;height:var(--spectrum-radio-circle-diameter);position:absolute;transition:border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-radio-circle-diameter);z-index:0}#button:after{border-radius:100%;bottom:0;content:"";display:block;left:0;margin:var(
--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)
);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host([label-below]){align-items:center;display:inline-flex;flex-direction:column;height:var(--spectrum-radio-labelbelow-height)}:host([label-below]) #button{flex-shrink:0;margin:0}:host([label-below]) #label{margin:var(
--spectrum-radio-labelbelow-label-margin
)}:host{--spectrum-radio-m-emphasized-circle-border-color-selected-key-focus:var(
--spectrum-radio-m-emphasized-circle-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-emphasized-selected-hover)
)}:host([checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected,var(--spectrum-alias-toggle-background-color-default)
)}#label{color:var(
--spectrum-radio-m-text-color,var(--spectrum-alias-component-text-color-default)
)}#button:before{background-color:var(
--spectrum-radio-m-circle-background-color,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-radio-m-circle-border-color,var(--spectrum-alias-toggle-border-color-default)
);forced-color-adjust:none}:host(:hover) #button:before{border-color:var(
--spectrum-radio-m-circle-border-color-hover,var(--spectrum-alias-toggle-border-color-hover)
);box-shadow:none}:host(:hover[checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-hover)
)}:host(:hover) #label{color:var(
--spectrum-radio-m-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:active) #button:before{border-color:var(
--spectrum-radio-m-circle-border-color-down,var(--spectrum-alias-toggle-border-color-down)
)}:host(:active[checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected-down,var(--spectrum-alias-toggle-background-color-down)
)}:host(:active) #label{color:var(
--spectrum-radio-m-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([emphasized][checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-selected,var(
--spectrum-alias-toggle-background-color-emphasized-selected-default
)
)}:host([emphasized][checked]:hover) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-selected-hover,var(--spectrum-alias-toggle-background-color-emphasized-selected-hover)
)}:host([emphasized][checked]:active) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-selected-down,var(--spectrum-alias-toggle-background-color-emphasized-selected-down)
)}:host([emphasized][invalid]:hover) #input+#button:before,:host([invalid]:hover) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-error-hover,var(--spectrum-global-color-red-600)
)}:host([emphasized][invalid]:hover) #label,:host([invalid]:hover) #label{color:var(
--spectrum-radio-m-emphasized-text-color-error-hover,var(--spectrum-alias-component-text-color-error-hover)
)}:host([emphasized][invalid]:active) #input+#button:before,:host([invalid]:active) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-text-color-error-hover,var(--spectrum-alias-component-text-color-error-hover)
)}:host([emphasized][invalid]:active) #label,:host([invalid]:active) #label{color:var(
--spectrum-radio-m-emphasized-text-color-error-down,var(--spectrum-alias-component-text-color-error-down)
)}:host([emphasized][invalid]) #button:before,:host([emphasized][invalid][checked]) #input+#button:before,:host([invalid]) #button:before,:host([invalid][checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-error,var(--spectrum-global-color-red-500)
)}:host([emphasized][invalid]) #label,:host([invalid]) #label{color:var(
--spectrum-radio-m-emphasized-text-color-error,var(--spectrum-alias-component-text-color-error-default)
)}:host([checked][disabled]) #input+#button:before,:host([disabled]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-disabled,var(--spectrum-global-color-gray-400)
)}:host([checked][disabled]) #input~#label,:host([disabled]) #input~#label{color:var(
--spectrum-radio-m-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host(.focus-visible) #input+#button:before,:host(:hover.focus-visible) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}:host(:focus-visible) #input+#button:before,:host(:hover:focus-visible) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-key-focus,var(--spectrum-alias-toggle-border-color-key-focus)
)}:host(.focus-visible) #input+#button:after,:host(:hover.focus-visible) #input+#button:after{box-shadow:0 0 0 var(
--spectrum-radio-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-radio-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);forced-color-adjust:none}:host(:focus-visible) #input+#button:after,:host(:hover:focus-visible) #input+#button:after{box-shadow:0 0 0 var(
--spectrum-radio-m-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-radio-m-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);forced-color-adjust:none}:host(.focus-visible[checked]) #input+#button:before,:host(:hover.focus-visible[checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host(:focus-visible[checked]) #input+#button:before,:host(:hover:focus-visible[checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected-key-focus,var(--spectrum-alias-toggle-background-color-key-focus)
)}:host([emphasized][checked].focus-visible) #input+#button:before,:host([emphasized][checked]:hover.focus-visible) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}:host([emphasized][checked]:focus-visible) #input+#button:before,:host([emphasized][checked]:hover:focus-visible) #input+#button:before{border-color:var(
--spectrum-radio-m-emphasized-circle-border-color-selected-key-focus,var(
--spectrum-alias-toggle-background-color-emphasized-selected-key-focus
)
)}@media (forced-colors:active){:host{--spectrum-radio-m-circle-background-color:ButtonFace;--spectrum-radio-m-circle-border-color-down:Highlight;--spectrum-radio-m-circle-border-color-hover:Highlight;--spectrum-radio-m-circle-border-color-key-focus:Highlight;--spectrum-radio-m-circle-border-color-selected-down:Highlight;--spectrum-radio-m-circle-border-color-selected-hover:Highlight;--spectrum-radio-m-circle-border-color-selected:Highlight;--spectrum-radio-m-circle-border-color:ButtonText;--spectrum-radio-m-emphasized-circle-border-color-error-hover:Highlight;--spectrum-radio-m-emphasized-circle-border-color-error:ButtonText;--spectrum-radio-m-emphasized-circle-border-color-selected-down:Highlight;--spectrum-radio-m-emphasized-circle-border-color-selected-hover:Highlight;--spectrum-radio-m-emphasized-circle-border-color-selected-key-focus:Highlight;--spectrum-radio-m-emphasized-circle-border-color-selected:Highlight;--spectrum-radio-m-emphasized-text-color-error-down:CanvasText;--spectrum-radio-m-emphasized-text-color-error-hover:CanvasText;--spectrum-radio-m-emphasized-text-color-error:CanvasText;--spectrum-radio-m-focus-ring-color-key-focus:CanvasText;--spectrum-radio-m-text-color-down:CanvasText;--spectrum-radio-m-text-color-hover:CanvasText;--spectrum-radio-m-text-color:CanvasText}:host([invalid][checked]) #input+#button:before{border-color:var(
--spectrum-radio-m-circle-border-color-selected,var(--spectrum-alias-toggle-background-color-default)
)}}:host{--spectrum-radio-label-margin-top:var(
--spectrum-global-dimension-size-75,6px
)}:host(:focus){outline:0}:host([disabled]){pointer-events:none}`;class nr extends(w(e)){constructor(){super(...arguments),this.autofocus=!1,this.value="",this.checked=!1,this.disabled=!1,this.emphasized=!1,this.invalid=!1,this.readonly=!1}static get styles(){return[cr]}click(){this.disabled||this.activate()}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focus())}handleChange(t){t.stopPropagation(),this.readonly?this.inputElement.checked=this.checked:(this.checked=this.inputElement.checked,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}activate(){this.checked=!0,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}handleKeyup(t){"Space"===t.code&&this.activate()}render(){return r`<div id="input"></div><span id="button"></span> <span id="label" role="presentation"><slot></slot></span>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","radio"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAutoFocus(),this.addEventListener("click",this.activate),this.addEventListener("keyup",this.handleKeyup)}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")),t.has("checked")&&(this.checked?this.setAttribute("aria-checked","true"):this.setAttribute("aria-checked","false")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabeld"))}}o([i({type:Boolean})],nr.prototype,"autofocus",void 0),o([i({type:String,reflect:!0})],nr.prototype,"value",void 0),o([i({type:Boolean,reflect:!0})],nr.prototype,"checked",void 0),o([i({type:Boolean,reflect:!0})],nr.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],nr.prototype,"emphasized",void 0),o([i({type:Boolean,reflect:!0})],nr.prototype,"invalid",void 0),o([i({type:Boolean,reflect:!0})],nr.prototype,"readonly",void 0),o([g("#input")],nr.prototype,"inputElement",void 0),customElements.define("sp-radio",nr);class dr extends(w(_e)){constructor(){super(),this.name="",this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown),requestAnimationFrame((()=>{const t=this.buttons.find((t=>0===t.tabIndex));t&&(t.tabIndex=-1)}))},this.handleKeydown=t=>{const{code:e}=t,r=this.getRootNode().activeElement;if(!r)return;let o=this.buttons.indexOf(r);if(-1===o)return;const i=(t,e)=>t[(t.length+e)%t.length],s=t=>{for(o+=t;i(this.buttons,o).disabled;)o+=t};switch(e){case"ArrowUp":s(-1);break;case"ArrowLeft":s(this.isLTR?-1:1);break;case"ArrowRight":s(this.isLTR?1:-1);break;case"ArrowDown":s(1);break;case"End":o=this.buttons.length,s(-1);break;case"Home":o=-1,s(1);break;case"PageUp":case"PageDown":const r=[...this.getRootNode().querySelectorAll("sp-radio-group")];if(r.length<2)return;t.preventDefault();const a="PageUp"===e?-1:1;let l=r.indexOf(this)+a,c=i(r,l);for(;!c.buttons.length;)l+=a,c=i(r,l);return void c.focus();default:return}t.preventDefault();const a=i(this.buttons,o);this._setSelected(a.value),a.focus()},this.handleFocusout=t=>{const e=t.relatedTarget;if(e&&this.contains(e))return;const r=this.buttons.find((t=>this.selected?t.checked:!t.disabled));r&&(r.tabIndex=0),this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.selected="",this.addEventListener("focusin",this.handleFocusin)}get buttons(){return this.defaultNodes.filter((t=>t instanceof nr))}focus(){if(!this.buttons.length)return;const t=this.buttons.find((t=>this.selected?t.checked:!t.disabled));t&&t.focus()}_setSelected(t){if(t===this.selected)return;const e=this.selected,r=t?this.querySelector(`sp-radio[value="${t}"]`):void 0;this.selected=r?t:"";this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))?this.validateRadios():this.selected=e}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","radiogroup");const e=this.querySelector("sp-radio[checked]"),r=e?e.value:"";if(this.selected=r||this.selected,this.selected&&this.selected!==r){const t=this.querySelector(`sp-radio[value="${this.selected}"]`);t?t.checked=!0:this.selected=""}this.addEventListener("change",(t=>{if(t.target===this)return;t.stopPropagation();const e=t.target;this._setSelected(e.value)})),this.buttons.map(((t,e)=>{const r=this.selected?t.disabled||t.value!==this.selected?"-1":"0":t.disabled||0!==e?"-1":"0";t.setAttribute("tabindex",r)}))}updated(t){super.updated(t),t.has("selected")&&this.validateRadios()}validateRadios(){let t=!1;this.buttons.map((e=>{e.checked=this.selected===e.value,t=t||e.checked})),t||(this.selected="")}}o([i({type:String})],dr.prototype,"name",void 0),o([m("")],dr.prototype,"defaultNodes",void 0),o([i({reflect:!0})],dr.prototype,"selected",void 0),customElements.define("sp-radio-group",dr),customElements.define("sp-sidenav-heading",S);const ur={toNormalized:(t,e,r)=>(t-e)/(r-e),fromNormalized:(t,e,r)=>t*(r-e)+e},pr={fromAttribute:t=>"previous"===t?t:parseFloat(t),toAttribute:t=>t.toString()},hr={fromAttribute:t=>"next"===t?t:parseFloat(t),toAttribute:t=>t.toString()};class mr extends h{constructor(){super(...arguments),this._forcedUnit="",this.value=10,this.dragging=!1,this.highlight=!1,this.name="",this.resolvedLanguage=document.documentElement.lang||navigator.language,this.label="",this.getAriaHandleText=(t,e)=>e.format(t),this.normalization=ur}get handleName(){return this.name}get focusElement(){var t,e;return null!==(e=null===(t=this.handleController)||void 0===t?void 0:t.inputForHandle(this))&&void 0!==e?e:this}update(t){(t.has("formatOptions")||t.has("resolvedLanguage"))&&delete this._numberFormatCache,super.update(t)}updated(t){var e,r;if(t.has("value")){null!=t.get("value")&&(null===(e=this.handleController)||void 0===e||e.setValueFromHandle(this))}null===(r=this.handleController)||void 0===r||r.handleHasChanged(this),super.updated(t)}firstUpdated(t){super.firstUpdated(t),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const t=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(t)}getNumberFormat(){var t;if(!this._numberFormatCache||this.resolvedLanguage!==this._numberFormatCache.language){let t;try{t=new je(this.resolvedLanguage,this.formatOptions),this._forcedUnit=""}catch(e){const r=this.formatOptions||{},{style:o,unit:i,unitDisplay:s}=r,a=c(r,["style","unit","unitDisplay"]);"unit"===o&&(this._forcedUnit=i),t=new je(this.resolvedLanguage,a)}this._numberFormatCache={language:this.resolvedLanguage,numberFormat:t}}return null===(t=this._numberFormatCache)||void 0===t?void 0:t.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}connectedCallback(){super.connectedCallback(),this.resolveLanguage()}disconnectedCallback(){this.resolveLanguage(),super.disconnectedCallback()}resolveLanguage(){const t=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:t=>{this.resolvedLanguage=t}},cancelable:!0});this.dispatchEvent(t)}}o([i({type:Number})],mr.prototype,"value",void 0),o([i({type:Boolean,reflect:!0})],mr.prototype,"dragging",void 0),o([i({type:Boolean})],mr.prototype,"highlight",void 0),o([i({type:String})],mr.prototype,"name",void 0),o([i({reflect:!0,converter:pr})],mr.prototype,"min",void 0),o([i({reflect:!0,converter:hr})],mr.prototype,"max",void 0),o([i({attribute:!1})],mr.prototype,"resolvedLanguage",void 0),o([i({type:Number,reflect:!0})],mr.prototype,"step",void 0),o([i({type:Object,attribute:"format-options"})],mr.prototype,"formatOptions",void 0),o([i({type:String})],mr.prototype,"label",void 0),o([i({attribute:!1})],mr.prototype,"getAriaHandleText",void 0),o([i({attribute:!1})],mr.prototype,"normalization",void 0),customElements.define("sp-slider-handle",mr);var br=n`:host{--spectrum-slider-tick-mark-width:var(
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
);--spectrum-slider-label-gap-y:var(--spectrum-global-dimension-size-85);--spectrum-slider-controls-margin:calc(var(--spectrum-slider-handle-width)/2);--spectrum-slider-track-margin-offset:calc(var(--spectrum-slider-controls-margin)*-1);--spectrum-slider-handle-margin-top:calc(var(--spectrum-slider-handle-width)/-2);--spectrum-slider-handle-margin-left:calc(var(--spectrum-slider-handle-width)/-2);--spectrum-slider-track-handleoffset:var(--spectrum-slider-handle-gap);--spectrum-slider-track-middle-handleoffset:calc(var(--spectrum-slider-handle-gap) + var(--spectrum-slider-handle-width)/2);--spectrum-slider-input-top:calc(var(--spectrum-slider-handle-margin-top)/4);--spectrum-slider-input-left:calc(var(--spectrum-slider-handle-margin-left)/4);--spectrum-slider-ramp-margin-top:0;--spectrum-slider-range-track-reset:0;--spectrum-slide-label-text-size:var(
--spectrum-global-dimension-font-size-75
);--spectrum-slide-label-text-line-height:var(
--spectrum-global-font-line-height-small,1.3
);--spectrum-slide-label-margin-bottom:-3px;--spectrum-slider-label-gap-x:var(
--spectrum-alias-item-control-gap-m,var(--spectrum-global-dimension-size-125)
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
)}#fill,.track{padding-bottom:0;padding-top:0}#fill:before,.track:before{border-radius:var(--spectrum-slider-track-border-radius);content:"";display:block;height:100%}:host([dir=ltr]) #fill{margin-left:0}:host([dir=rtl]) #fill{margin-right:0}:host([dir=ltr]) #fill{padding-left:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset));padding-right:0}:host([dir=rtl]) #fill{padding-left:0;padding-right:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset))}#fill{padding-bottom:0;padding-top:0}:host([dir=ltr]) .spectrum-Slider-fill--right{padding-left:0;padding-right:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset))}:host([dir=rtl]) .spectrum-Slider-fill--right{padding-left:calc(var(--spectrum-slider-controls-margin) + var(--spectrum-slider-track-handleoffset));padding-right:0}.spectrum-Slider-fill--right{padding-bottom:0;padding-top:0}:host([dir=ltr]) .track~.track{left:auto}:host([dir=rtl]) .track~.track{right:auto}:host([dir=ltr]) .track~.track{right:var(
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
)}.track~.track{padding-bottom:0;padding-top:0}:host([variant=range]) #value{-webkit-user-select:text;user-select:text}:host([dir=ltr][variant=range]) .track:first-of-type{padding-left:0;padding-right:var(--spectrum-slider-track-handleoffset)}:host([dir=rtl][variant=range]) .track:first-of-type{padding-left:var(--spectrum-slider-track-handleoffset);padding-right:0}:host([dir=ltr][variant=range]) .track:first-of-type{left:var(
--spectrum-slider-range-track-reset
)}:host([dir=rtl][variant=range]) .track:first-of-type{right:var(
--spectrum-slider-range-track-reset
)}:host([dir=ltr][variant=range]) .track:first-of-type{right:auto}:host([dir=rtl][variant=range]) .track:first-of-type{left:auto}:host([dir=ltr][variant=range]) .track:first-of-type{margin-left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl][variant=range]) .track:first-of-type{margin-right:var(
--spectrum-slider-track-margin-offset
)}:host([variant=range]) .track:first-of-type{padding-bottom:0;padding-top:0}:host([dir=ltr][variant=range]) [dir=ltr] .track,:host([dir=ltr][variant=range]) [dir=rtl] .track{left:auto}:host([dir=ltr][variant=range]) [dir=rtl] .track,:host([dir=rtl][variant=range]) [dir=rtl] .track{right:auto}:host([dir=ltr][variant=range]) [dir=ltr] .track,:host([dir=ltr][variant=range]) [dir=rtl] .track{right:auto}:host([dir=ltr][variant=range]) [dir=rtl] .track,:host([dir=rtl][variant=range]) [dir=rtl] .track{left:auto}:host([dir=ltr][variant=range]) .track,:host([dir=rtl][variant=range]) .track{padding-bottom:0;padding-left:var(--spectrum-slider-track-middle-handleoffset);padding-right:var(--spectrum-slider-track-middle-handleoffset);padding-top:0}:host([dir=ltr][variant=range]) .track:last-of-type{padding-left:var(
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
)}:host([variant=range]) .track:last-of-type{padding-bottom:0;padding-top:0}:host([dir=ltr]) #ramp{left:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) #ramp{right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=ltr]) #ramp{right:var(
--spectrum-slider-track-margin-offset
)}:host([dir=rtl]) #ramp{left:var(
--spectrum-slider-track-margin-offset
)}#ramp{height:var(--spectrum-slider-ramp-track-height);margin-top:var(
--spectrum-slider-ramp-margin-top
);position:absolute;top:calc(var(--spectrum-slider-ramp-track-height)/2)}:host([dir=rtl]) #ramp svg{transform:matrix(-1,0,0,1,0,0)}#ramp svg{height:100%;width:100%}:host([dir=ltr]) .handle{left:0}:host([dir=rtl]) .handle{right:0}:host([dir=ltr]) .handle{margin-left:calc(var(--spectrum-slider-handle-width)/-2);margin-right:0}:host([dir=rtl]) .handle{margin-left:0;margin-right:calc(var(--spectrum-slider-handle-width)/-2)}.handle{border-radius:var(--spectrum-slider-handle-border-radius);border-style:solid;border-width:var(--spectrum-slider-handle-border-size);box-sizing:border-box;display:inline-block;height:var(--spectrum-slider-handle-height);margin-bottom:0;margin-top:var(--spectrum-slider-handle-margin-top);outline:0;position:absolute;top:calc(var(--spectrum-slider-height)/2);transition:border-width var(--spectrum-slider-animation-duration) ease-in-out;width:var(--spectrum-slider-handle-width);z-index:2}.handle.dragging,.handle.handle-highlight,.handle:active{border-width:var(
--spectrum-slider-handle-border-size
)}.handle.dragging,.handle.handle-highlight,.handle.is-tophandle,.handle:active{z-index:3}.handle:before{border-radius:100%;content:" ";display:block;height:var(--spectrum-slider-handle-height);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out,width var(--spectrum-global-animation-duration-100,.13s) ease-out,height var(--spectrum-global-animation-duration-100,.13s) ease-out;width:var(--spectrum-slider-handle-width)}.handle.handle-highlight:before{height:calc(var(--spectrum-slider-handle-height) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25))*2);width:calc(var(--spectrum-slider-handle-width) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25))*2)}:host([dir=ltr]) .input{left:var(
--spectrum-slider-input-left
)}:host([dir=rtl]) .input{right:var(
--spectrum-slider-input-left
)}.input{-webkit-appearance:none;border:0;cursor:default;height:var(--spectrum-slider-handle-height);margin:0;opacity:.000001;overflow:hidden;padding:0;pointer-events:none;position:absolute;top:var(--spectrum-slider-input-top);width:var(--spectrum-slider-handle-width)}.input:focus{outline:0}#label-container{display:flex;font-size:var(--spectrum-slide-label-text-size);line-height:var(--spectrum-slide-label-text-line-height);margin-bottom:var(--spectrum-slide-label-margin-bottom);padding-top:var(
--spectrum-fieldlabel-m-padding-top,var(--spectrum-global-dimension-size-50)
);position:relative;width:auto}:host([dir=ltr]) #label{padding-left:0}:host([dir=rtl]) #label{padding-right:0}#label{flex-grow:1}:host([dir=ltr]) #value{padding-right:0}:host([dir=rtl]) #value{padding-left:0}:host([dir=ltr]) #value{text-align:right}:host([dir=rtl]) #value{text-align:left}#value{font-feature-settings:"tnum";cursor:default;flex-grow:0}:host([dir=ltr]) #value{margin-left:var(
--spectrum-slider-label-gap-x
)}:host([dir=rtl]) #value{margin-right:var(
--spectrum-slider-label-gap-x
)}.ticks{display:flex;justify-content:space-between;margin:0 var(--spectrum-slider-track-margin-offset);margin-top:calc(var(--spectrum-slider-tick-mark-height) + var(--spectrum-slider-track-height)/ 2);z-index:0}.tick{position:relative;width:var(--spectrum-slider-tick-mark-width)}:host([dir=ltr]) .tick:after{left:calc(50% - var(--spectrum-slider-tick-mark-width)/ 2)}:host([dir=rtl]) .tick:after{right:calc(50% - var(--spectrum-slider-tick-mark-width)/ 2)}.tick:after{border-radius:var(--spectrum-slider-tick-mark-border-radius);content:"";display:block;height:var(--spectrum-slider-tick-mark-height);position:absolute;top:0;width:var(--spectrum-slider-tick-mark-width)}.tick .tickLabel{align-items:center;display:flex;font-size:var(--spectrum-slide-label-text-size);justify-content:center;line-height:var(--spectrum-slide-label-text-line-height);margin-bottom:0;margin-left:calc(var(--spectrum-slider-label-gap-x)*-1);margin-right:calc(var(--spectrum-slider-label-gap-x)*-1);margin-top:calc(var(--spectrum-slider-label-gap-y) + var(--spectrum-slider-tick-mark-height))}.tick:first-of-type .tickLabel,.tick:last-of-type .tickLabel{display:block;margin-left:0;margin-right:0;position:absolute}:host([dir=ltr]) .tick:first-of-type{left:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=rtl]) .tick:first-of-type{right:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=ltr]) .tick:first-of-type .tickLabel{left:0}:host([dir=rtl]) .tick:first-of-type .tickLabel{right:0}:host([dir=ltr]) .tick:last-of-type{right:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=rtl]) .tick:last-of-type{left:calc(var(--spectrum-slider-tick-mark-width)/-2)}:host([dir=ltr]) .tick:last-of-type .tickLabel{right:0}:host([dir=rtl]) .tick:last-of-type .tickLabel{left:0}:host([disabled]){cursor:default}:host([disabled]) .handle{cursor:default;pointer-events:none}.spectrum-Slider-handleContainer,.spectrum-Slider-trackContainer{margin-left:calc(var(--spectrum-slider-handle-width)/2*-1);position:absolute;top:calc(var(--spectrum-slider-track-height)/ 2 - 1px);width:calc(100% + var(--spectrum-slider-handle-width))}.spectrum-Slider-trackContainer{height:var(--spectrum-slider-height);overflow:hidden}:host{--spectrum-slider-m-focus-ring-size:var(
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
)}:host([variant=ramp]) .handle{box-shadow:0 0 0 4px var(
--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100)
)}.input{background:0 0}.tick:after{background-color:var(
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
)}:host{--spectrum-slider-handle-default-background-color:var(
--spectrum-slider-m-handle-background-color,var(--spectrum-alias-background-color-transparent)
);--spectrum-slider-handle-default-border-color:var(
--spectrum-slider-m-handle-border-color,var(--spectrum-global-color-gray-700)
)}sp-field-label{padding-bottom:0;padding-top:0}:host(:focus){outline:0}:host([editable]){display:grid;grid-template-areas:"label ." "slider number";grid-template-columns:1fr auto}:host([editable]) #label-container{grid-area:label}:host([editable]) #label-container+div{grid-area:slider}:host([editable]) sp-number-field{--spectrum-stepper-width:var(
--spectrum-slider-editable-number-field-width,var(--spectrum-global-dimension-size-1000)
);grid-area:number}:host([hide-stepper]) sp-number-field{--spectrum-stepper-width:var(
--spectrum-slider-editable-number-field-width,var(--spectrum-global-dimension-size-900)
)}:host([editable][dir=ltr]) sp-number-field{margin-left:var(--spectrum-global-dimension-size-200)}:host([editable][dir=rtl]) sp-number-field{margin-right:var(--spectrum-global-dimension-size-200)}:host([editable]) output{opacity:0}:host([disabled]){pointer-events:none}#track,:host([dragging]){touch-action:none;-webkit-user-select:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:before{background:var(
--spectrum-slider-track-color,var(--spectrum-global-color-gray-300)
)}:host([dir=rtl]) .track:before{background:var(
--spectrum-slider-track-color-rtl,var(
--spectrum-slider-track-color,var(--spectrum-global-color-gray-300)
)
)}:host([dir=ltr]) .track:last-of-type:before{background-position:100%}:host([dir=rtl]) .track:first-of-type:before{background-position:100%}.track:not(:first-of-type):not(:last-of-type){padding-left:calc(var(--spectrum-slider-handle-width)/ 2 + var(--spectrum-slider-track-handleoffset))!important;padding-right:calc(var(--spectrum-slider-handle-width)/ 2 + var(--spectrum-slider-track-handleoffset))!important}:host([dir=ltr][variant=range]) .track,:host([dir=rtl][variant=range]) .track{margin:var(--spectrum-slider-range-track-reset);margin-top:calc(var(--spectrum-slider-track-height)/-2)}:host([dir=ltr]) .track:not(:first-of-type):not(:last-of-type){left:var(--spectrum-slider-track-segment-position)}:host([dir=rtl]) .track:not(:first-of-type):not(:last-of-type){right:var(--spectrum-slider-track-segment-position)}.visually-hidden{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}:host([label-visibility=value][dir=ltr]) #value{margin-left:auto}:host([label-visibility=value][dir=rtl]) #value{margin-right:auto}:host([label-visibility=none]) #label-container{margin:0;padding:0}`;class vr{constructor(t){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let t=[...this.host.querySelectorAll('[slot="handle"]')];0===t.length&&(t=[this.host]),t.some((t=>this.waitForUpgrade(t)))||(this.handles=new Map,this.handleOrder=[],t.forEach(((t,e)=>{var r;(null===(r=t.handleName)||void 0===r?void 0:r.length)||(t.name=`handle${e+1}`),this.handles.set(t.handleName,t),this.handleOrder.push(t.handleName),t.handleController=this})),this.requestUpdate())},this.onInputChange=t=>{const e=t.target;e.model.handle.value=e.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(e,e.model.handle)},this.onInputFocus=t=>{const e=t.target;let r;try{r=e.matches(":focus-visible")||this.host.matches(".focus-visible")}catch(t){r=this.host.matches(".focus-visible")}e.model.handle.highlight=r,this.requestUpdate()},this.onInputBlur=t=>{t.target.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=t=>{t.target.model.handle.highlight=!0,this.requestUpdate()},this.host=t}get values(){const t={};for(const e of this.handles.values())t[e.handleName]=e.value;return t}get size(){return this.handles.size}inputForHandle(t){if(this.handles.has(t.handleName)){const{input:e}=this.getHandleElements(t);return e}throw new Error(`No input for handle "${t.name}"`)}requestUpdate(){this.host.requestUpdate()}setValueFromHandle(t){const e=this.getHandleElements(t);if(!e)return;const{input:r}=e;r.valueAsNumber===t.value?t.dragging&&t.dispatchInputEvent():(r.valueAsNumber=t.value,t.value=r.valueAsNumber,this.requestUpdate()),t.value=r.valueAsNumber}handleHasChanged(t){t!==this.host&&this.requestUpdate()}formattedValueForHandle(t){var e;const{handle:r}=t,o=null!==(e=r.numberFormat)&&void 0!==e?e:this.host.numberFormat;return r.getAriaHandleText(t.value,o)}get formattedValues(){const t=new Map;for(const e of this.model)t.set(e.name,this.formattedValueForHandle(e));return t}get focusElement(){const{input:t}=this.getActiveHandleElements();return this.host.editable&&!t.model.handle.dragging?this.host.numberField:t}hostConnected(){this.observer||(this.observer=new MutationObserver(this.extractModelFromLightDom)),this.observer.observe(this.host,{subtree:!0,childList:!0}),this.extractModelFromLightDom(),"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){this.observer.disconnect(),"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(t){return!(t instanceof mr)&&(t.addEventListener("sp-slider-handle-ready",(()=>this.extractModelFromLightDom()),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const t=this.activeHandle;return`input-${this.model.findIndex((e=>e.name===t))}`}activateHandle(t){const e=this.handleOrder.findIndex((e=>e===t));e>=0&&this.handleOrder.splice(e,1),this.handleOrder.push(t)}getActiveHandleElements(){const t=this.activeHandle,e=this.handles.get(t),r=this.getHandleElements(e);return Object.assign({model:e},r)}getHandleElements(t){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const t=this.host.shadowRoot.querySelectorAll(".handle > input");for(const e of t){const t=e,r=t.parentElement,o=this.handles.get(r.getAttribute("name"));o&&this.handleRefMap.set(o,{input:t,handle:r})}}return this.handleRefMap.get(t)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(t){if(!this._activePointerEventData){let e=t.target.querySelector(":scope > .input");const r=!e,o=e?e.model:this.model.find((t=>t.name===this.activeHandle));!e&&o&&(e=o.handle.focusElement),this._activePointerEventData={input:e,model:o,resolvedInput:r}}return this._activePointerEventData}handlePointerdown(t){const{resolvedInput:e,model:r}=this.extractDataFromEvent(t);r&&!this.host.disabled&&0===t.button?(this.host.track.setPointerCapture(t.pointerId),this.updateBoundingRect(),this.host.labelEl.click(),this.draggingHandle=r.handle,r.handle.dragging=!0,this.activateHandle(r.name),e&&this.handlePointermove(t),this.requestUpdate()):t.preventDefault()}handlePointerup(t){const{input:e,model:r}=this.extractDataFromEvent(t);delete this._activePointerEventData,r&&(this.host.labelEl.click(),r.handle.highlight=!1,delete this.draggingHandle,r.handle.dragging=!1,this.requestUpdate(),this.host.track.releasePointerCapture(t.pointerId),this.dispatchChangeEvent(e,r.handle))}handlePointermove(t){const{input:e,model:r}=this.extractDataFromEvent(t);r&&this.draggingHandle&&(t.stopPropagation(),e.value=this.calculateHandlePosition(t,r).toString(),r.handle.value=parseFloat(e.value),this.requestUpdate())}dispatchChangeEvent(t,e){t.valueAsNumber=e.value;const r=new Event("change",{bubbles:!0,composed:!0});e.dispatchEvent(r)}calculateHandlePosition(t,e){const r=this.boundingClientRect,o=r.left,i=(t.clientX-o)/r.width,s=e.normalization.fromNormalized(i,e.range.min,e.range.max);return this.host.isLTR?s:e.range.max-s}renderHandle(t,e,o,i){var s;const a={handle:!0,dragging:(null===(s=this.draggingHandle)||void 0===s?void 0:s.handleName)===t.name,"handle-highlight":t.highlight},l={[this.host.isLTR?"left":"right"]:100*t.normalizedValue+"%","z-index":o.toString(),"background-color":`var(--spectrum-slider-handle-background-color-${e}, var(--spectrum-slider-handle-default-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${e}, var(-spectrum-slider-handle-default-border-color))`},c=i?`label input-${e}`:"label";return r`<div class="${L(a)}" name="${t.name}" style="${G(l)}" role="presentation"><input type="range" class="input" id="input-${e}" min="${t.clamp.min}" max="${t.clamp.max}" step="${t.step}" value="${t.value}" aria-disabled="${v(this.host.disabled?"true":void 0)}" tabindex="${v(this.host.editable?-1:void 0)}" aria-label="${v(t.ariaLabel)}" aria-labelledby="${c}" aria-valuetext="${this.formattedValueForHandle(t)}" @change="${this.onInputChange}" @focus="${this.onInputFocus}" @blur="${this.onInputBlur}" @keydown="${this.onInputKeydown}" .model="${t}"></div>`}render(){return this.clearHandleComponentCache(),this.model.map(((t,e)=>{const r=this.handleOrder.indexOf(t.name)+1;return this.renderHandle(t,e,r,this.model.length>1)}))}trackSegments(){const t=this.model.map((t=>t.normalizedValue));return t.sort(((t,e)=>t-e)),t.unshift(0),t.map(((t,e,r)=>{var o;return[t,null!==(o=r[e+1])&&void 0!==o?o:1]}))}updateModel(){const t=[...this.handles.values()],e=e=>{const r=t[e],o=t[e-1],i=t[e+1],s="number"==typeof r.min?r.min:this.host.min,a="number"==typeof r.max?r.max:this.host.max,l={range:{min:s,max:a},clamp:{min:s,max:a}};if("previous"===r.min)if(o){for(let r=e-1;r>=0;r--){const e=t[r];if("number"==typeof e.min){l.range.min=e.min;break}}l.clamp.min=Math.max(o.value,l.range.min)}else console.warn('First slider handle cannot have attribute min="previous"');if("next"===r.max)if(i){for(let r=e+1;r<t.length;r++){const e=t[r];if("number"==typeof e.max){l.range.max=e.max;break}}l.clamp.max=Math.min(i.value,l.range.max)}else console.warn('Last slider handle cannot have attribute max="next"');return l},r=t.map(((t,r)=>{var o;const i=e(r),{toNormalized:s}=t.normalization,a=Math.max(Math.min(t.value,i.clamp.max),i.clamp.min),l=s(a,i.range.min,i.range.max);return Object.assign({name:t.handleName,value:a,normalizedValue:l,highlight:t.highlight,step:null!==(o=t.step)&&void 0!==o?o:this.host.step,normalization:t.normalization,handle:t,ariaLabel:t!==this.host&&(null==t?void 0:t.label.length)>0?t.label:void 0},i)}));this.model=r}async handleUpdatesComplete(){const t=[...this.handles.values()].filter((t=>t!==this.host)).map((t=>t.updateComplete));await Promise.all(t)}}const gr=["filled","ramp","range","tick"];class fr extends(b(mr,"")){constructor(){super(...arguments),this.handleController=new vr(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=t=>{const e=[...t.values()];return 2===e.length?`${e[0]}${this._forcedUnit} - ${e[1]}${this._forcedUnit}`:e.join(`${this._forcedUnit}, `)+this._forcedUnit},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[br]}get editable(){return this._editable}set editable(t){if(t===this.editable)return;const e=this.editable;this._editable=this.handleController.size<2&&t,this.editable&&(this._numberFieldInput=Promise.resolve().then((function(){return or}))),e!==this.editable&&this.requestUpdate("editable",e)}set variant(t){const e=this.variant;t!==this.variant&&(gr.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(t){this.editable&&(t.preventDefault(),this.focus())}render(){return r`${this.renderLabel()} ${this.renderTrack()} ${this.editable?r`<sp-number-field .formatOptions="${this.formatOptions||{}}" id="number-field" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" ?hide-stepper="${this.hideStepper}" ?disabled="${this.disabled}" @input="${this.handleNumberInput}" @change="${this.handleNumberChange}"></sp-number-field>`:r``}`}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(t){this.handleController.hostUpdate(),super.update(t)}renderLabel(){const t="none"===this.labelVisibility||"value"===this.labelVisibility,e="none"===this.labelVisibility||"text"===this.labelVisibility;return r`<div id="label-container"><sp-field-label class="${L({"visually-hidden":t})}" ?disabled="${this.disabled}" id="label" for="${this.editable?"number-field":this.handleController.activeHandleInputId}" @click="${this.handleLabelClick}">${this.slotHasContent?r``:this.label}<slot>${this.label}</slot></sp-field-label><output class="${L({"visually-hidden":e})}" id="value" aria-live="off" for="input">${this.ariaValueText}</output></div>`}renderRamp(){return"ramp"!==this.variant?r``:r`<div id="ramp"><svg viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"></path></svg></div>`}renderTicks(){if("tick"!==this.variant)return r``;const t=this.tickStep||this.step,e=(this.max-this.min)/t,o=e%1!=0,i=new Array(Math.floor(e+1));return i.fill(0,0,e+1),r`<div class="${o?"not-exact ":""}ticks" style="${v(o?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}">${i.map(((e,o)=>r`<div class="tick">${this.tickLabels?r`<div class="tickLabel">${o*t}</div>`:r``}</div>`))}</div>`}renderTrackSegment(t,e){return"ramp"===this.variant?r``:r`<div class="track" style="${G(this.trackSegmentStyles(t,e))}" role="presentation"></div>`}renderTrack(){const t=this.handleController.trackSegments(),e=[{id:"track0",html:this.renderTrackSegment(...t[0])},{id:"ramp",html:this.renderRamp()},{id:"ticks",html:this.renderTicks()},{id:"handles",html:this.handleController.render()},...t.slice(1).map((([t,e],r)=>({id:`track${r+1}`,html:this.renderTrackSegment(t,e)})))];return r`<div id="track" ${jt({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel"],this.handlePointerup]})}><div id="controls">${X(e,(t=>t.id),(t=>t.html))}</div></div>`}handlePointerdown(t){this.handleController.handlePointerdown(t)}handlePointermove(t){this.handleController.handlePointermove(t)}handlePointerup(t){this.handleController.handlePointerup(t)}handleNumberInput(t){var e;const{value:r}=t.target;!(null===(e=t.target)||void 0===e?void 0:e.stepperActive)||isNaN(r)?t.stopPropagation():this.value=r}handleNumberChange(t){var e;const{value:r}=t.target;isNaN(r)?(t.target.value=this.value,t.stopPropagation()):(this.value=r,(null===(e=t.target)||void 0===e?void 0:e.stepperActive)||this.dispatchInputEvent())}trackSegmentStyles(t,e){const r=e-t;return{width:100*r+"%","--spectrum-slider-track-background-size":1/r*100+"%","--spectrum-slider-track-segment-position":100*t+"%"}}async getUpdateComplete(){const t=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),t}}o([i({type:Boolean,reflect:!0})],fr.prototype,"editable",null),o([i({type:Boolean,reflect:!0,attribute:"hide-stepper"})],fr.prototype,"hideStepper",void 0),o([i()],fr.prototype,"type",void 0),o([i({type:String})],fr.prototype,"variant",null),o([i({attribute:!1})],fr.prototype,"getAriaValueText",void 0),o([i({type:String,reflect:!0,attribute:"label-visibility"})],fr.prototype,"labelVisibility",void 0),o([i({type:Number,reflect:!0})],fr.prototype,"min",void 0),o([i({type:Number,reflect:!0})],fr.prototype,"max",void 0),o([i({type:Number})],fr.prototype,"step",void 0),o([i({type:Number,attribute:"tick-step"})],fr.prototype,"tickStep",void 0),o([i({type:Boolean,attribute:"tick-labels"})],fr.prototype,"tickLabels",void 0),o([i({type:Boolean,reflect:!0})],fr.prototype,"disabled",void 0),o([g("#label")],fr.prototype,"labelEl",void 0),o([g("#number-field")],fr.prototype,"numberField",void 0),o([g("#track")],fr.prototype,"track",void 0),customElements.define("sp-slider",fr);var xr=n`:host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(
--spectrum-alias-border-radius-small,var(--spectrum-global-dimension-size-25)
)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-global-dimension-size-125
);--spectrum-splitbutton-trigger-flat-edge-padding:var(
--spectrum-global-dimension-size-100
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-splitbutton-trigger-flat-edge-padding) - var(
--spectrum-button-m-primary-texticon-border-size,
var(--spectrum-alias-border-size-thick)
))}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-m-primary-texticon-padding-left) - var(
--spectrum-button-m-primary-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-m-primary-texticon-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-m-primary-texticon-padding-left) - var(
--spectrum-button-m-primary-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*3)}:host{display:inline-flex;flex-direction:row;position:relative;vertical-align:top}:host([dir=ltr]) #button{margin-left:0}:host([dir=rtl]) #button{margin-right:0}:host([dir=ltr]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-top-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{border-top-right-radius:0}:host([dir=rtl]) #button{border-top-left-radius:0}:host([dir=ltr]) #button{border-bottom-right-radius:0}:host([dir=rtl]) #button{border-bottom-left-radius:0}:host([dir=ltr]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{padding-right:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=rtl]) #button{padding-left:var(
--spectrum-splitbutton-flat-edge-padding
)}:host([dir=ltr]) #button{padding-left:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=rtl]) #button{padding-right:var(
--spectrum-splitbutton-round-edge-padding
)}:host([dir=ltr][variant=cta]) #button{padding-right:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=rtl][variant=cta]) #button{padding-left:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=ltr][variant=cta]) #button{margin-right:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][variant=cta]) #button{margin-left:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr]) #button:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) #button:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr]) #button:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl]) #button:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr]) .trigger{margin-left:0}:host([dir=rtl]) .trigger{margin-right:0}:host([dir=ltr]) .trigger{border-top-left-radius:0}:host([dir=rtl]) .trigger{border-top-right-radius:0}:host([dir=ltr]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
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
)}:host([dir=ltr][variant=cta]) .trigger{padding-left:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=rtl][variant=cta]) .trigger{padding-right:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=ltr][variant=cta]) .trigger{border-left-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][variant=cta]) .trigger{border-right-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
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
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
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
)}:host([dir=ltr][left][variant=cta]) #button{padding-left:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=rtl][left][variant=cta]) #button{padding-right:var(
--spectrum-splitbutton-cta-flat-edge-padding
)}:host([dir=ltr][left][variant=cta]) #button{margin-left:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left][variant=cta]) #button{margin-right:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) #button:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) #button:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) #button:after{border-top-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) #button:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger{margin-right:0}:host([dir=rtl][left]) .trigger{margin-left:0}:host([dir=ltr][left]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-top-right-radius:0}:host([dir=rtl][left]) .trigger{border-top-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-right-radius:0}:host([dir=rtl][left]) .trigger{border-bottom-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-left-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) .trigger{border-right-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
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
)}:host([dir=ltr][left][variant=cta]) .trigger{padding-right:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=rtl][left][variant=cta]) .trigger{padding-left:var(
--spectrum-splitbutton-cta-trigger-flat-edge-padding
)}:host([dir=ltr][left][variant=cta]) .trigger{border-right-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left][variant=cta]) .trigger{border-left-width:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) .trigger:after{border-top-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-top-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger:after{border-top-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) .trigger:after{border-top-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger:after{border-bottom-right-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=rtl][left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-splitbutton-border-radius-edge
)}:host([dir=ltr][left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}sp-button{--spectrum-button-m-primary-texticon-border-radius:calc(var(--spectrum-button-primary-texticon-text-size)*var(--spectrum-button-primary-texticon-text-line-height) + var(--spectrum-icon-tshirt-size-height)/2 + var(--spectrum-alias-border-size-thick))}sp-popover{display:none}::slotted(sp-menu){display:none}.more-medium{height:18px;margin:1px -4px 0;width:18px}`;const yr={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class kr extends(f($)){constructor(){super(...arguments),this.left=!1,this.variant="cta",this.type="field",this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[xr,E]}get target(){return this}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}sizePopover(t){t.style.setProperty("min-width",`${this.offsetWidth}px`)}passClick(){const t="more"===this.type?this.menuItems[0]:this.selectedItem||this.menuItems[0];t&&t.click()}get buttonContent(){var t;return[r`<div id="label" role="presentation" class="${v(this.value?void 0:"placeholder")}">${(null===(t=this.selectedItem)||void 0===t?void 0:t.itemText)||""}</div>`]}update(t){t.has("type")&&("more"===this.type?this.selects=void 0:this.selects="single"),super.update(t)}render(){const t=[r`<sp-button aria-label="${v(this.label||void 0)}" id="button" class="button ${this.variant}" @click="${this.passClick}" ?disabled="${this.disabled}" variant="${this.variant}" size="${this.size}">${this.buttonContent}</sp-button>`,r`<sp-button aria-haspopup="true" aria-expanded="${this.open?"true":"false"}" class="button trigger ${this.variant}" @blur="${this.onButtonBlur}" @click="${this.onButtonClick}" @focus="${this.onButtonFocus}" ?disabled="${this.disabled}" aria-label="More" variant="${this.variant}" size="${this.size}">${"field"===this.type?r`<sp-icon-chevron100 class="icon ${yr[this.size]}"></sp-icon-chevron100>`:r`<sp-icon-more class="icon"></sp-icon-more>`}</sp-button>`];return this.left&&t.reverse(),r`${t} ${this.renderPopover}`}updated(t){super.updated(t),t.has("value")&&this.manageSplitButtonItems()}manageSelection(){super.manageSelection(),this.manageSplitButtonItems()}async manageSplitButtonItems(){if(this.menuItems.length)return"more"===this.type?(this.menuItems[0].hidden=!0,this.menuItems.forEach((t=>t.selected=!1)),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],void(this.value=this.selectedItem.value);await this.updateComplete,this.menuItems.length&&this.manageSplitButtonItems()}}o([i({type:Boolean,reflect:!0})],kr.prototype,"left",void 0),o([i({reflect:!0})],kr.prototype,"variant",void 0),o([i({type:String})],kr.prototype,"type",void 0),o([g(".trigger")],kr.prototype,"trigger",void 0),customElements.define("sp-split-button",kr);var wr=n`:host{--spectrum-splitview-vertical-width:100%;--spectrum-splitview-vertical-gripper-width:50%;--spectrum-splitview-vertical-gripper-outer-width:100%;--spectrum-splitview-vertical-gripper-reset:0}:host{display:flex;overflow:hidden}::slotted(*){height:100%}:host([dir=ltr]) #gripper{left:calc((var(--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal,3px) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)))/ 2*-1)}:host([dir=rtl]) #gripper{right:calc((var(--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal,3px) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)))/ 2*-1)}#gripper{border-radius:var(
--spectrum-dragbar-gripper-border-radius,var(--spectrum-alias-border-radius-small)
);border-style:solid;border-width:var(--spectrum-dragbar-gripper-border-width-vertical,4px) var(--spectrum-dragbar-gripper-border-width-horizontal,3px);content:"";display:block;height:var(
--spectrum-dragbar-gripper-height,var(--spectrum-global-dimension-static-size-200)
);position:absolute;top:50%;transform:translateY(-50%);width:var(
--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)
)}#splitter{height:100%;position:relative;-webkit-user-select:none;user-select:none;width:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
);z-index:1}:host([dir=ltr]) #splitter.is-collapsed-end #gripper:before,:host([dir=ltr]) #splitter.is-collapsed-start #gripper:before{left:calc(50% - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25))/ 2)}:host([dir=rtl]) #splitter.is-collapsed-end #gripper:before,:host([dir=rtl]) #splitter.is-collapsed-start #gripper:before{right:calc(50% - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25))/ 2)}#splitter.is-collapsed-end #gripper:before,#splitter.is-collapsed-start #gripper:before{content:"";height:100%;position:absolute;top:0;width:var(
--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)
)}:host([dir=ltr]) #splitter.is-collapsed-start #gripper{left:0}:host([dir=rtl]) #splitter.is-collapsed-start #gripper{right:0}:host([dir=ltr]) #splitter.is-collapsed-end #gripper{right:0}:host([dir=rtl]) #splitter.is-collapsed-end #gripper{left:0}:host([dir=ltr]) #splitter.is-collapsed-end #gripper{left:auto}:host([dir=rtl]) #splitter.is-collapsed-end #gripper{right:auto}:host([vertical]){flex-direction:column}:host([vertical]) ::slotted(*){height:auto;width:var(--spectrum-splitview-vertical-width)}:host([dir=ltr][vertical]) #gripper{left:var(
--spectrum-splitview-vertical-gripper-width
)}:host([dir=rtl][vertical]) #gripper{right:var(
--spectrum-splitview-vertical-gripper-width
)}:host([vertical]) #gripper{border-width:var(--spectrum-dragbar-gripper-border-width-horizontal,3px) var(--spectrum-dragbar-gripper-border-width-vertical,4px);height:var(
--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)
);top:calc((var(--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal,3px) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)))/ 2*-1);transform:translate(calc(var(--spectrum-splitview-vertical-gripper-width)*-1));width:var(
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
);top:calc(var(--spectrum-splitview-vertical-gripper-width) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25))/ 2);width:var(--spectrum-splitview-vertical-gripper-outer-width)}:host([vertical]) #splitter.is-collapsed-start #gripper{top:var(
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
)}:host([resizable]) #splitter:focus{outline:0}:host([resizable]) #splitter.focus-visible{background-color:var(
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
)}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#splitter{height:auto;order:2}:host([resizable]) #splitter{background-clip:content-box;cursor:ew-resize;margin:0 calc(var(--spectrum-global-dimension-static-size-125)*-1);padding:0 var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter{background-clip:content-box;cursor:ns-resize;margin:calc(var(--spectrum-global-dimension-static-size-125)*-1) 0;padding:var(--spectrum-global-dimension-static-size-125) 0}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-end,:host([resizable][collapsible]) #splitter.is-resized-start{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-end,:host([vertical][resizable][collapsible]) #splitter.is-resized-start{cursor:ns-resize}:host([dir=ltr][resizable]) #gripper{left:calc(var(--spectrum-global-dimension-static-size-125) + (var(--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal,3px) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)))/ 2*-1)}:host([dir=rtl][resizable]) #gripper{right:calc(var(--spectrum-global-dimension-static-size-125) + (var(--spectrum-dragbar-gripper-width,var(--spectrum-global-dimension-static-size-50)) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal,3px) - var(--spectrum-dragbar-handle-width,var(--spectrum-global-dimension-static-size-25)))/ 2*-1)}:host([vertical][resizable]) #gripper{left:50%;margin-top:var(--spectrum-global-dimension-static-size-125);right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-start #gripper{left:var(--spectrum-global-dimension-static-size-125)}:host([dir=rtl][resizable]) #splitter.is-collapsed-start #gripper{right:var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter.is-collapsed-start #gripper{left:50%;right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-end #gripper{left:var(--spectrum-global-dimension-static-size-25)}:host([dir=rtl][resizable]) #splitter.is-collapsed-end #gripper{right:var(--spectrum-global-dimension-static-size-25)}:host([vertical][resizable]) #splitter.is-collapsed-end #gripper{left:50%;margin-top:0;right:50%;top:var(--spectrum-global-dimension-static-size-25)}`;class zr extends e{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=3840,this.secondaryMin=0,this.secondaryMax=3840,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=3840;const t=window.ResizeObserver;t&&(this.observer=new t((()=>{this.rect=void 0,this.updateMinMax()})))}static get styles(){return[wr]}connectedCallback(){var t;super.connectedCallback(),null===(t=this.observer)||void 0===t||t.observe(this)}disconnectedCallback(){var t;null===(t=this.observer)||void 0===t||t.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){const t={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)};return r`<slot @slotchange="${this.onContentSlotChange}" style="--spectrum-split-view-first-pane-size:${this.firstPaneSize}"></slot>${this.enoughChildren?r`<div id="splitter" class="${L(t)}" role="separator" aria-label="${v(this.label||void 0)}" tabindex="${v(this.resizable?"0":void 0)}" @keydown="${this.onKeydown}" ${jt({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel"],this.onPointerup]})}>${this.resizable?r`<div id="gripper"></div>`:r``}</div>`:s}`}onContentSlotChange(){this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(t){!this.resizable||t.button&&0!==t.button?t.preventDefault():(this.splitter.setPointerCapture(t.pointerId),this.offset=this.getOffset())}onPointermove(t){t.preventDefault();let e=this.vertical||this.isLTR?this.getPosition(t)-this.offset:this.offset-this.getPosition(t);this.collapsible&&e<this.minPos-50&&(e=0),this.collapsible&&e>this.maxPos+50&&(e=this.viewSize-this.splitterSize),this.updatePosition(e)}onPointerup(t){this.splitter.releasePointerCapture(t.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const t=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:t}getPosition(t){return this.vertical?t.clientY:t.clientX}movePosition(t,e){t.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+e)}onKeydown(t){if(!this.resizable)return;let e=0;const r=this.isLTR||this.vertical;switch(t.key){case"Home":return t.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return t.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":e=r?-1:1;break;case"ArrowRight":e=r?1:-1;break;case"ArrowUp":e=this.vertical?-1:1;break;case"ArrowDown":e=this.vertical?1:-1;break;case"PageUp":e=this.vertical?-1:1;break;case"PageDown":e=this.vertical?1:-1}if(0!==e){const r=t.key.startsWith("Page")?50:10;this.movePosition(t,r*e)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const t=await this.calcStartPos();this.updatePosition(t)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(t){let e=this.getLimitedPosition(t);this.collapsible&&t<=0&&(e=0),this.collapsible&&t>this.maxPos&&t>=this.viewSize-this.splitterSize&&(e=this.viewSize-this.splitterSize),e!==this.splitterPos&&(this.splitterPos=e,this.dispatchChangeEvent())}getLimitedPosition(t){return t<=this.minPos?this.minPos:t>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,t))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const t=this.paneSlot.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement));if(void 0!==t.updateComplete&&await t.updateComplete,t){const e=window.getComputedStyle(t).getPropertyValue(this.vertical?"height":"width"),r=parseFloat(e);if(!isNaN(r))return this.getLimitedPosition(Math.ceil(r))}}return this.viewSize/2}dispatchChangeEvent(){const t=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(t)}firstUpdated(t){super.firstUpdated(t),this.checkResize()}updated(t){super.updated(t),t.has("primarySize")&&(this.splitterPos=void 0,this.checkResize()),t.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}o([i({type:Boolean,reflect:!0})],zr.prototype,"vertical",void 0),o([i({type:Boolean,reflect:!0})],zr.prototype,"resizable",void 0),o([i({type:Boolean,reflect:!0})],zr.prototype,"collapsible",void 0),o([i({type:Number,attribute:"primary-min"})],zr.prototype,"primaryMin",void 0),o([i({type:Number,attribute:"primary-max"})],zr.prototype,"primaryMax",void 0),o([i({type:String,attribute:"primary-size"})],zr.prototype,"primarySize",void 0),o([i({type:Number,attribute:"secondary-min"})],zr.prototype,"secondaryMin",void 0),o([i({type:Number,attribute:"secondary-max"})],zr.prototype,"secondaryMax",void 0),o([i({type:Number,reflect:!0,attribute:"splitter-pos"})],zr.prototype,"splitterPos",void 0),o([i({type:String,attribute:!1})],zr.prototype,"firstPaneSize",void 0),o([i()],zr.prototype,"label",void 0),o([i({type:Boolean,attribute:!1})],zr.prototype,"enoughChildren",void 0),o([i({type:Number})],zr.prototype,"viewSize",void 0),o([g("slot")],zr.prototype,"paneSlot",void 0),o([g("#splitter")],zr.prototype,"splitter",void 0),customElements.define("sp-split-view",zr);var Cr=n`:host([size=s]){--spectrum-statuslight-info-text-padding-bottom:var(
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
)}:host([disabled]){color:var(
--spectrum-statuslight-m-info-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]):before{background-color:var(
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
)}:host([disabled]):before{background-color:var(
--spectrum-statuslight-dot-color-disabled,var(--spectrum-global-color-gray-400)
)}`;class Sr extends(f(e)){constructor(){super(...arguments),this.disabled=!1,this.variant="info"}static get styles(){return[Cr]}render(){return r`<slot></slot>`}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}o([i({type:Boolean,reflect:!0})],Sr.prototype,"disabled",void 0),o([i({reflect:!0})],Sr.prototype,"variant",void 0),customElements.define("sp-status-light",Sr);var Ar=n`:host{--spectrum-switch-handle-size:var(
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
)*-1)}#label{font-size:var(--spectrum-switch-text-size);line-height:var(--spectrum-switch-label-line-height);margin-bottom:0;margin-left:var(--spectrum-switch-text-gap);margin-right:var(--spectrum-switch-text-gap);margin-top:var(--spectrum-switch-label-margin-top);transition:color var(--spectrum-global-animation-duration-200,.16s) ease-in-out}:host([dir=ltr]) #switch{left:0}:host([dir=rtl]) #switch{right:0}:host([dir=ltr]) #switch{right:0}:host([dir=rtl]) #switch{left:0}#switch{border-radius:calc(var(--spectrum-switch-track-height)/2);box-sizing:border-box;display:inline-block;flex-grow:0;flex-shrink:0;height:var(--spectrum-switch-track-height);margin-bottom:calc((var(--spectrum-switch-height) - var(--spectrum-switch-track-height))/ 2);margin-left:0;margin-right:0;margin-top:calc((var(--spectrum-switch-height) - var(--spectrum-switch-track-height))/ 2);position:relative;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:middle;width:var(--spectrum-switch-track-width)}#switch:before{box-sizing:border-box;content:"";display:block;position:absolute}:host([dir=ltr]) #switch:before{left:0}:host([dir=rtl]) #switch:before{right:0}#switch:before{border-radius:var(--spectrum-switch-handle-border-radius);border-style:solid;border-width:var(--spectrum-switch-handle-border-size);height:var(--spectrum-switch-handle-size);top:0;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-switch-handle-size)}:host([dir=ltr]) #switch:after{left:0}:host([dir=rtl]) #switch:after{right:0}:host([dir=ltr]) #switch:after{right:0}:host([dir=rtl]) #switch:after{left:0}#switch:after{border-radius:calc(var(--spectrum-switch-track-height) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;content:"";display:block;margin:0;position:absolute;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}#switch{background-color:var(
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
)}:host{--spectrum-switch-label-margin-top:var(
--spectrum-global-dimension-size-65,5px
);--spectrum-switch-track-width:var(--spectrum-global-dimension-size-325);--spectrum-switch-handle-border-radius:50%}:host([disabled]){pointer-events:none}:host([dir=ltr][checked]) #input+#switch:before{transform:translateX(calc(var(--spectrum-switch-track-width) - var(--spectrum-switch-handle-size)))}:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc(var(--spectrum-switch-handle-size) - var(--spectrum-switch-track-width)))}`;var Er=n`#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}`;class $r extends qt{constructor(){super(...arguments),this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[Ar,Er]:[Ar]}render(){return r`${super.render()} <span id="switch"></span> <label id="label" for="input"><slot></slot></label>`}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("role","switch")}updated(t){t.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}o([i({type:Boolean,reflect:!0})],$r.prototype,"emphasized",void 0),customElements.define("sp-switch",$r);var Lr=n`:host{box-sizing:border-box;cursor:pointer;height:var(--spectrum-tabs-item-height);line-height:var(--spectrum-tabs-item-height);outline:0;position:relative;text-decoration:none;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-out;white-space:nowrap;z-index:1}:host([disabled]){cursor:default}:host([disabled]) #item-label{cursor:default}:host(:not([vertical])) ::slotted([slot=icon]){height:var(
--spectrum-tabs-item-height
)}:host([dir=ltr]) slot[name=icon]+#item-label{margin-left:calc(var(--spectrum-tabs-icon-gap) - var(--spectrum-global-dimension-size-40))}:host([dir=rtl]) slot[name=icon]+#item-label{margin-right:calc(var(--spectrum-tabs-icon-gap) - var(--spectrum-global-dimension-size-40))}:host([dir=ltr]):before{left:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=rtl]):before{right:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=ltr]):before{right:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=rtl]):before{left:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host:before{border:var(--spectrum-tabs-focus-ring-size) solid transparent;border-radius:var(--spectrum-tabs-focus-ring-border-radius);box-sizing:border-box;content:"";height:var(--spectrum-tabs-focus-ring-height);margin-top:calc(var(--spectrum-tabs-focus-ring-height)/ -2 + var(--spectrum-tabs-divider-size)/ 2);pointer-events:none;position:absolute;top:50%}#item-label{cursor:pointer;display:inline-block;font-size:var(--spectrum-tabs-text-size);font-weight:var(--spectrum-tabs-text-font-weight);text-decoration:none;vertical-align:top}#item-label:empty{display:none}:host{color:var(
--spectrum-tabs-m-text-color,var(--spectrum-alias-label-text-color)
)}:host(:not([vertical])) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color,var(--spectrum-alias-icon-color)
)}:host(:hover){color:var(
--spectrum-tabs-m-text-color-hover,var(--spectrum-alias-text-color-hover)
)}:host(:hover) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([selected]){color:var(
--spectrum-tabs-m-text-color-selected,var(--spectrum-global-color-gray-900)
)}:host([selected]) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-selected,var(--spectrum-global-color-gray-900)
)}:host(.focus-visible){color:var(
--spectrum-tabs-m-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host(:focus-visible){color:var(
--spectrum-tabs-m-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host(.focus-visible):before{border-color:var(
--spectrum-tabs-m-focus-ring-color,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-visible):before{border-color:var(
--spectrum-tabs-m-focus-ring-color,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host(:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([disabled]){color:var(
--spectrum-tabs-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host([disabled]){pointer-events:none}:host([vertical]){--sp-tab-vertial-margin-y:calc((var(
--spectrum-tabs-vertical-item-height,
var(--spectrum-global-dimension-size-550)
) - var(
--spectrum-tabs-focus-ring-height,
var(--spectrum-alias-single-line-height)
))/2);align-items:center;display:flex;flex-direction:column;height:auto!important;justify-content:center}:host([vertical]):before{bottom:0;height:auto;left:calc(var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick))*-1);margin-top:0!important;right:calc(var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick))*-1);top:0}:host([vertical]) ::slotted([slot=icon]){flex-shrink:0;margin-top:var(--sp-tab-vertial-margin-y)}:host(:not([vertical])) ::slotted([slot=icon]){height:100%}:host([dir][vertical]) slot[name=icon]+#item-label{font-size:var(
--spectrum-tabs-text-size,var(--spectrum-alias-font-size-default)
);font-weight:var(
--spectrum-tabs-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);line-height:1;margin:var(--sp-tab-vertial-margin-y) 0}#item-label[hidden]{display:none}`;class qr extends(w(b(k(e,'[slot="icon"]'),""))){constructor(){super(...arguments),this.disabled=!1,this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[Lr]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return!!this.label||this.slotHasContent}handleContentChange(){this.dispatchEvent(new Event("sp-tab-contentchange",{bubbles:!0,composed:!0}))}render(){return r`${this.hasIcon?r`<slot name="icon"></slot>`:r``} <label id="item-label" ?hidden="${!this.hasLabel}">${this.slotHasContent?r``:this.label}<slot>${this.label}</slot></label>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id="sp-tab-"+qr.instanceCount++),this.shadowRoot.addEventListener("slotchange",this.handleContentChange)}updated(t){super.updated(t),t.has("label")&&void 0!==t.get("label")&&this.handleContentChange(),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}qr.instanceCount=0,o([i({type:Boolean,reflect:!0})],qr.prototype,"disabled",void 0),o([i({reflect:!0})],qr.prototype,"label",void 0),o([i({type:Boolean,reflect:!0})],qr.prototype,"selected",void 0),o([i({type:Boolean,reflect:!0})],qr.prototype,"vertical",void 0),o([i({type:String,reflect:!0})],qr.prototype,"value",void 0),customElements.define("sp-tab",qr);var _r=n`:host([size=s]){--spectrum-tabs-focus-ring-border-radius:var(
--spectrum-tabs-s-focus-ring-border-radius
);--spectrum-tabs-item-height:var(
--spectrum-tabs-s-item-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-item-gap:var(
--spectrum-tabs-s-item-gap,var(--spectrum-global-dimension-size-250)
);--spectrum-tabs-text-size:var(
--spectrum-tabs-s-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-tabs-text-font-weight:var(
--spectrum-tabs-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-icon-gap:var(
--spectrum-tabs-s-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-tabs-divider-border-radius:var(
--spectrum-tabs-s-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-divider-size:var(
--spectrum-tabs-s-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-size:var(
--spectrum-tabs-s-focus-ring-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-height:var(
--spectrum-tabs-s-focus-ring-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-focus-ring-padding-x:var(
--spectrum-tabs-s-focus-ring-padding-x,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-selection-indicator-animation-duration:var(
--spectrum-tabs-s-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-vertical-item-height:var(
--spectrum-tabs-s-vertical-item-height,var(--spectrum-global-dimension-size-450)
);--spectrum-tabs-vertical-item-gap:var(
--spectrum-tabs-s-vertical-item-gap,var(--spectrum-global-dimension-size-50)
);--spectrum-tabs-vertical-item-margin-left:var(
--spectrum-tabs-s-vertical-item-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-tabs-vertical-divider-size:var(
--spectrum-tabs-s-vertical-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-quiet-height:var(
--spectrum-tabs-s-compact-quiet-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-compact-item-height:var(
--spectrum-tabs-s-compact-item-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-compact-vertical-item-height:var(
--spectrum-tabs-s-compact-vertical-item-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-compact-vertical-item-gap:var(
--spectrum-tabs-s-compact-vertical-item-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=m]){--spectrum-tabs-focus-ring-border-radius:var(
--spectrum-tabs-m-focus-ring-border-radius
);--spectrum-tabs-item-height:var(
--spectrum-tabs-m-item-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-item-gap:var(
--spectrum-tabs-m-item-gap,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-text-size:var(
--spectrum-tabs-m-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-tabs-text-font-weight:var(
--spectrum-tabs-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-icon-gap:var(
--spectrum-tabs-m-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-tabs-divider-border-radius:var(
--spectrum-tabs-m-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-divider-size:var(
--spectrum-tabs-m-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-size:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-height:var(
--spectrum-tabs-m-focus-ring-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-focus-ring-padding-x:var(
--spectrum-tabs-m-focus-ring-padding-x,var(--spectrum-global-dimension-size-150)
);--spectrum-tabs-selection-indicator-animation-duration:var(
--spectrum-tabs-m-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-vertical-item-height:var(
--spectrum-tabs-m-vertical-item-height,var(--spectrum-global-dimension-size-550)
);--spectrum-tabs-vertical-item-gap:var(
--spectrum-tabs-m-vertical-item-gap,var(--spectrum-global-dimension-size-50)
);--spectrum-tabs-vertical-item-margin-left:var(
--spectrum-tabs-m-vertical-item-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-tabs-vertical-divider-size:var(
--spectrum-tabs-m-vertical-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-quiet-height:var(
--spectrum-tabs-m-compact-quiet-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-compact-item-height:var(
--spectrum-tabs-m-compact-item-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-compact-vertical-item-height:var(
--spectrum-tabs-m-compact-vertical-item-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-compact-vertical-item-gap:var(
--spectrum-tabs-m-compact-vertical-item-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=l]){--spectrum-tabs-focus-ring-border-radius:var(
--spectrum-tabs-l-focus-ring-border-radius
);--spectrum-tabs-item-height:var(
--spectrum-tabs-l-item-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-item-gap:var(
--spectrum-tabs-l-item-gap,var(--spectrum-global-dimension-size-350)
);--spectrum-tabs-text-size:var(
--spectrum-tabs-l-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-tabs-text-font-weight:var(
--spectrum-tabs-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-icon-gap:var(
--spectrum-tabs-l-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-divider-border-radius:var(
--spectrum-tabs-l-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-divider-size:var(
--spectrum-tabs-l-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-size:var(
--spectrum-tabs-l-focus-ring-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-height:var(
--spectrum-tabs-l-focus-ring-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-focus-ring-padding-x:var(
--spectrum-tabs-l-focus-ring-padding-x,var(--spectrum-global-dimension-size-185)
);--spectrum-tabs-selection-indicator-animation-duration:var(
--spectrum-tabs-l-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-vertical-item-height:var(
--spectrum-tabs-l-vertical-item-height,var(--spectrum-global-dimension-size-650)
);--spectrum-tabs-vertical-item-gap:var(
--spectrum-tabs-l-vertical-item-gap,var(--spectrum-global-dimension-size-65)
);--spectrum-tabs-vertical-item-margin-left:var(
--spectrum-tabs-l-vertical-item-margin-left,var(--spectrum-global-dimension-size-160)
);--spectrum-tabs-vertical-divider-size:var(
--spectrum-tabs-l-vertical-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-quiet-height:var(
--spectrum-tabs-l-compact-quiet-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-compact-item-height:var(
--spectrum-tabs-l-compact-item-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-compact-vertical-item-height:var(
--spectrum-tabs-l-compact-vertical-item-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-compact-vertical-item-gap:var(
--spectrum-tabs-l-compact-vertical-item-gap,var(--spectrum-global-dimension-size-65)
)}:host([size=xl]){--spectrum-tabs-focus-ring-border-radius:var(
--spectrum-tabs-xl-focus-ring-border-radius
);--spectrum-tabs-item-height:var(
--spectrum-tabs-xl-item-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-item-gap:var(
--spectrum-tabs-xl-item-gap,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-text-size:var(
--spectrum-tabs-xl-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-tabs-text-font-weight:var(
--spectrum-tabs-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-icon-gap:var(
--spectrum-tabs-xl-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-tabs-divider-border-radius:var(
--spectrum-tabs-xl-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-divider-size:var(
--spectrum-tabs-xl-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-size:var(
--spectrum-tabs-xl-focus-ring-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-focus-ring-height:var(
--spectrum-tabs-xl-focus-ring-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-focus-ring-padding-x:var(
--spectrum-tabs-xl-focus-ring-padding-x,var(--spectrum-global-dimension-size-225)
);--spectrum-tabs-selection-indicator-animation-duration:var(
--spectrum-tabs-xl-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-vertical-item-height:var(
--spectrum-tabs-xl-vertical-item-height,var(--spectrum-global-dimension-size-750)
);--spectrum-tabs-vertical-item-gap:var(
--spectrum-tabs-xl-vertical-item-gap,var(--spectrum-global-dimension-size-65)
);--spectrum-tabs-vertical-item-margin-left:var(
--spectrum-tabs-xl-vertical-item-margin-left,var(--spectrum-global-dimension-size-160)
);--spectrum-tabs-vertical-divider-size:var(
--spectrum-tabs-xl-vertical-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-quiet-height:var(
--spectrum-tabs-xl-compact-quiet-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-compact-item-height:var(
--spectrum-tabs-xl-compact-item-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-compact-vertical-item-height:var(
--spectrum-tabs-xl-compact-vertical-item-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-compact-vertical-item-gap:var(
--spectrum-tabs-xl-compact-vertical-item-gap,var(--spectrum-global-dimension-size-65)
)}:host{--spectrum-tabs-compact-item-height:calc(var(--spectrum-tabs-compact-quiet-height) - var(--spectrum-tabs-divider-size))}#list{display:flex;margin:0;padding-bottom:0;padding-top:0;position:relative;vertical-align:top;z-index:0}:host([dir=ltr]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=rtl]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=ltr]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=rtl]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-focus-ring-padding-x)*-1)}:host([dir=ltr]) #selection-indicator{left:0}:host([dir=rtl]) #selection-indicator{right:0}#selection-indicator{border-radius:var(--spectrum-tabs-divider-border-radius);position:absolute;transform-origin:top left;transition:transform var(--spectrum-tabs-selection-indicator-animation-duration) ease-in-out;z-index:0}:host([compact]) ::slotted(:not([slot])){height:var(
--spectrum-tabs-compact-item-height
);line-height:var(--spectrum-tabs-compact-item-height)}:host([direction^=horizontal]) #list{align-items:center;border-bottom:var(--spectrum-tabs-divider-size) solid}:host([direction^=horizontal]) ::slotted(:not([slot])){vertical-align:top}:host([dir=ltr][direction^=horizontal]) ::slotted(:not([slot]):not(:first-child)){margin-left:var(
--spectrum-tabs-item-gap
)}:host([dir=rtl][direction^=horizontal]) ::slotted(:not([slot]):not(:first-child)){margin-right:var(
--spectrum-tabs-item-gap
)}:host([direction^=horizontal]) #selection-indicator{bottom:0;bottom:calc(var(--spectrum-tabs-divider-size)*-1);height:var(--spectrum-tabs-divider-size);position:absolute}:host([direction^=horizontal][compact]) #list{align-items:end;box-sizing:content-box;height:var(--spectrum-tabs-compact-item-height)}:host([quiet]) #list{display:inline-flex}:host([dir=ltr][direction^=vertical]) #list{border-left:var(--spectrum-tabs-vertical-divider-size) solid}:host([dir=rtl][direction^=vertical]) #list{border-right:var(--spectrum-tabs-vertical-divider-size) solid}:host([direction^=vertical]) #list{display:inline-flex;flex-direction:column;padding:0}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])){margin-left:calc(var(--spectrum-tabs-vertical-item-margin-left) - var(--spectrum-tabs-focus-ring-padding-x))}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])){margin-right:calc(var(--spectrum-tabs-vertical-item-margin-left) - var(--spectrum-tabs-focus-ring-padding-x))}:host([direction^=vertical]) ::slotted(:not([slot])){height:var(
--spectrum-tabs-vertical-item-height
);line-height:var(--spectrum-tabs-vertical-item-height);margin-bottom:var(--spectrum-tabs-vertical-item-gap);padding-bottom:0;padding-left:var(--spectrum-tabs-focus-ring-padding-x);padding-right:var(--spectrum-tabs-focus-ring-padding-x);padding-top:0}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-focus-ring-size)*-1)}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-focus-ring-size)*-1)}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-focus-ring-size)*-1)}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-focus-ring-size)*-1)}:host([direction^=vertical]) ::slotted(:not([slot])):before{margin-top:calc(var(--spectrum-tabs-focus-ring-height)/-2)}:host([direction^=vertical]) .spectrum-Icon{height:var(
--spectrum-tabs-vertical-item-height
);line-height:var(--spectrum-tabs-vertical-item-height)}:host([direction^=vertical][compact]) #list ::slotted(:not([slot])){height:var(
--spectrum-tabs-compact-vertical-item-height
);line-height:var(--spectrum-tabs-compact-vertical-item-height);margin-bottom:var(--spectrum-tabs-compact-vertical-item-gap)}:host([dir=ltr][direction^=vertical]) #selection-indicator{left:0}:host([dir=rtl][direction^=vertical]) #selection-indicator{right:0}:host([dir=ltr][direction^=vertical]) #selection-indicator{left:calc(var(--spectrum-tabs-vertical-divider-size)*-1)}:host([dir=rtl][direction^=vertical]) #selection-indicator{right:calc(var(--spectrum-tabs-vertical-divider-size)*-1)}:host([direction^=vertical]) #selection-indicator{position:absolute;width:var(--spectrum-tabs-vertical-divider-size)}#list{border-bottom-color:var(
--spectrum-tabs-m-divider-color,var(--spectrum-alias-border-color-light)
)}:host([dir=ltr][direction^=vertical]) #list{border-left-color:var(
--spectrum-tabs-m-vertical-divider-color,var(--spectrum-alias-border-color-light)
)}:host([dir=rtl][direction^=vertical]) #list{border-right-color:var(
--spectrum-tabs-m-vertical-divider-color,var(--spectrum-alias-border-color-light)
)}#selection-indicator{background-color:var(
--spectrum-tabs-m-selection-indicator-color,var(--spectrum-global-color-gray-900)
)}:host([quiet]) #list{border-bottom-color:var(
--spectrum-tabs-m-quiet-divider-color,var(--spectrum-alias-border-color-transparent)
)}:host([quiet]) #selection-indicator{background-color:var(
--spectrum-tabs-m-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900)
)}:host([dir=ltr][direction^=vertical][compact]) #list,:host([dir=ltr][direction^=vertical][quiet]) #list{border-left-color:var(
--spectrum-tabs-m-vertical-quiet-divider-color,var(--spectrum-alias-border-color-transparent)
)}:host([dir=rtl][direction^=vertical][compact]) #list,:host([dir=rtl][direction^=vertical][quiet]) #list{border-right-color:var(
--spectrum-tabs-m-vertical-quiet-divider-color,var(--spectrum-alias-border-color-transparent)
)}:host([direction^=vertical][compact]) #list #selection-indicator,:host([direction^=vertical][quiet]) #list #selection-indicator{background-color:var(
--spectrum-tabs-m-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900)
)}:host{display:grid}:host([direction^=vertical]){grid-template-columns:auto 1fr}:host([disabled]) #selection-indicator{background-color:var(
--spectrum-tabs-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) ::slotted(sp-tab){color:var(
--spectrum-tabs-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}#list{justify-content:var(--swc-tabs-list-justify-content)}:host([disabled]) #list{pointer-events:none}:host([direction=vertical-right]) #selection-indicator,:host([direction=vertical]) #selection-indicator{height:1px;top:0}:host([compact]){--spectrum-tabs-height:var(--spectrum-tabs-quiet-compact-height)}:host([direction=horizontal]:not([quiet])) #list{border-bottom-color:var(
--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200)
)}:host([dir][direction=horizontal]) #selection-indicator{width:1px}:host([dir=ltr][direction=vertical-right]) #list{border-left:0;border-right:var(
--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)
) solid;border-right-color:var(
--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200)
)}:host([dir=rtl][direction=vertical-right]) #list{border-left:var(
--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)
) solid;border-left-color:var(
--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200)
);border-right:0}:host([dir=ltr][direction=vertical-right]) #selection-indicator{left:auto;right:calc(var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick))*-1)}:host([dir=rtl][direction=vertical-right]) #selection-indicator{left:calc(var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick))*-1);right:auto}#selection-indicator.first-position{transition:none}`;const Mr={vertical:["ArrowUp","ArrowDown"],"vertical-right":["ArrowUp","ArrowDown"],horizontal:["ArrowLeft","ArrowRight"]};class Pr extends(f(h)){constructor(){super(...arguments),this.auto=!1,this.direction="horizontal",this.label="",this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)",this.shouldAnimate=!1,this._selected="",this.tabs=[],this.shouldApplyFocusVisible=!1,this.manageFocusinType=()=>{if(this.shouldApplyFocusVisible)return;const t=()=>{this.shouldApplyFocusVisible=!1,this.removeEventListener("focusin",t)};this.addEventListener("focusin",t)},this.onClick=t=>{if(this.disabled)return;const e=t.composedPath().find((t=>t.parentElement===this));e&&!e.disabled&&(this.shouldAnimate=!0,this.selectTarget(e),this.shouldApplyFocusVisible&&t.composedPath()[0]!==this&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),e.focus()))},this.onKeyDown=t=>{if("Enter"===t.code||"Space"===t.code){t.preventDefault();const e=t.target;e&&this.selectTarget(e)}},this.updateCheckedState=()=>{if(this.tabs.length||(this.tabs=[...this.querySelectorAll('[role="tab"]')]),this.tabs.forEach((t=>{t.removeAttribute("selected")})),this.selected){const t=this.tabs.find((t=>t.value===this.selected));t?t.selected=!0:this.selected=""}else{const t=this.tabs[0];t&&t.setAttribute("tabindex","0")}this.updateSelectionIndicator(),this.tabChangeResolver()},this.updateSelectionIndicator=async()=>{const t=this.tabs.find((t=>t.selected));if(!t)return void(this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)");await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const e=t.getBoundingClientRect(),r=this.getBoundingClientRect();if("horizontal"===this.direction){const t=e.width,o="ltr"===this.dir?e.left-r.left:e.right-r.right;this.selectionIndicatorStyle=`transform: translateX(${o}px) scaleX(${"ltr"===this.dir?t:-1*t});`}else{const t=e.height,o=e.top-r.top;this.selectionIndicatorStyle=`transform: translateY(${o}px) scaleY(${t});`}},this.tabChangePromise=Promise.resolve(),this.tabChangeResolver=function(){}}static get styles(){return[_r]}get selected(){return this._selected}set selected(t){const e=this.selected;t!==e&&(this._selected=t,this.shouldUpdateCheckedState(),this.requestUpdate("selected",e))}get focusElement(){const t=this.tabs.find((t=>!t.disabled&&(t.selected||t.value===this.selected)));if(t)return t;return this.tabs.find((t=>!t.disabled))||this}manageAutoFocus(){const t=[...this.children].map((t=>void 0!==t.updateComplete?t.updateComplete:Promise.resolve(!0)));Promise.all(t).then((()=>super.manageAutoFocus()))}managePanels({target:t}){t.assignedElements().map((t=>{const{value:e,id:r}=t,o=this.querySelector(`[role="tab"][value="${e}"]`);o&&(o.setAttribute("aria-controls",r),t.setAttribute("aria-labelledby",o.id)),t.selected=e===this.selected}))}render(){return r`<div aria-label="${v(this.label?this.label:void 0)}" @click="${this.onClick}" @keydown="${this.onKeyDown}" @mousedown="${this.manageFocusinType}" @focusin="${this.startListeningToKeyboard}" @sp-tab-contentchange="${this.updateSelectionIndicator}" id="list" role="tablist"><slot @slotchange="${this.onSlotChange}"></slot><div id="selection-indicator" class="${v(this.shouldAnimate?void 0:"first-position")}" style="${this.selectionIndicatorStyle}" role="presentation"></div></div><slot name="tab-panel" @slotchange="${this.managePanels}"></slot>`}firstUpdated(t){super.firstUpdated(t);const e=this.querySelector("[selected]");e&&this.selectTarget(e)}updated(t){if(super.updated(t),t.has("selected")){if(t.get("selected")){const e=this.querySelector(`[role="tabpanel"][value="${t.get("selected")}"]`);e&&(e.selected=!1)}const e=this.querySelector(`[role="tabpanel"][value="${this.selected}"]`);e&&(e.selected=!0)}t.has("direction")&&("horizontal"===this.direction?this.removeAttribute("aria-orientation"):this.setAttribute("aria-orientation","vertical")),t.has("dir")&&this.updateSelectionIndicator(),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")),this.shouldAnimate||void 0===t.get("shouldAnimate")||(this.shouldAnimate=!0)}startListeningToKeyboard(){this.addEventListener("keydown",this.handleKeydown),this.shouldApplyFocusVisible=!0;const t=this.querySelector("[selected]");t&&(t.tabIndex=-1);const e=()=>{this.removeEventListener("keydown",this.handleKeydown),this.shouldApplyFocusVisible=!1;const t=this.querySelector("[selected]");t&&(t.tabIndex=0),this.removeEventListener("focusout",e)};this.addEventListener("focusout",e)}handleKeydown(t){const{code:e}=t,r=[...Mr[this.direction]];if(!r.includes(e))return;this.isLTR||"horizontal"!==this.direction||r.reverse(),t.preventDefault();const o=C(this);let i=this.tabs.indexOf(o);i+=e===r[0]?-1:1;const s=this.tabs[(i+this.tabs.length)%this.tabs.length];s.focus(),this.auto&&(this.selected=s.value)}selectTarget(t){const e=t.getAttribute("value");if(e){const t=this.selected;this.selected=e;this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=t)}}onSlotChange(){this.tabs=[...this.querySelectorAll('[role="tab"]')],this.shouldUpdateCheckedState()}shouldUpdateCheckedState(){this.tabChangeResolver(),this.tabChangePromise=new Promise((t=>this.tabChangeResolver=t)),setTimeout(this.updateCheckedState)}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.tabChangePromise,t}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}o([i({type:Boolean})],Pr.prototype,"auto",void 0),o([i({reflect:!0})],Pr.prototype,"direction",void 0),o([i()],Pr.prototype,"label",void 0),o([i({attribute:!1})],Pr.prototype,"selectionIndicatorStyle",void 0),o([i({attribute:!1})],Pr.prototype,"shouldAnimate",void 0),o([i({reflect:!0})],Pr.prototype,"selected",null),customElements.define("sp-tabs",Pr);var Ir=n`:host{display:inline-flex}:host(:not([selected])){display:none}`;class Br extends e{constructor(){super(...arguments),this.selected=!1,this.value=""}render(){return r`<slot></slot>`}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id="sp-tab-panel-"+Br.instanceCount++)}updated(t){t.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}}Br.styles=[Ir],Br.instanceCount=0,o([i({type:Boolean,reflect:!0})],Br.prototype,"selected",void 0),o([i({type:String,reflect:!0})],Br.prototype,"value",void 0),customElements.define("sp-tab-panel",Br);var Dr=n`:host([size=s]){--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-s-texticon-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-tag-texticon-text-size:var(
--spectrum-tag-s-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-tag-texticon-focus-ring-size:var(
--spectrum-tag-s-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-s-texticon-height,var(--spectrum-global-dimension-size-300)
)}:host([size=m]){--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-m-texticon-padding-left
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-tag-texticon-text-size:var(
--spectrum-tag-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-tag-texticon-focus-ring-size:var(
--spectrum-tag-m-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-m-texticon-height,var(--spectrum-global-dimension-size-400)
)}:host([size=l]){--spectrum-tag-texticon-padding-left:var(
--spectrum-tag-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-tag-texticon-padding-right:var(
--spectrum-tag-l-texticon-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-tag-texticon-text-size:var(
--spectrum-tag-l-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-tag-texticon-icon-gap:var(
--spectrum-tag-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-tag-texticon-focus-ring-size:var(
--spectrum-tag-l-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tag-texticon-border-size:var(
--spectrum-tag-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-tag-texticon-height:var(
--spectrum-tag-l-texticon-height,var(--spectrum-global-dimension-size-500)
)}:host{--spectrum-tag-texticon-avatar-padding-x:var(
--spectrum-tag-texticon-icon-gap
)}:host([dir=ltr]){padding-left:calc(var(--spectrum-tag-texticon-padding-left) - var(--spectrum-tag-texticon-border-size))}:host([dir=rtl]){padding-right:calc(var(--spectrum-tag-texticon-padding-left) - var(--spectrum-tag-texticon-border-size))}:host([dir=ltr]){padding-right:calc(var(--spectrum-tag-texticon-padding-right) - var(--spectrum-tag-texticon-border-size))}:host([dir=rtl]){padding-left:calc(var(--spectrum-tag-texticon-padding-right) - var(--spectrum-tag-texticon-border-size))}:host{align-items:center;border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
);border-style:solid;border-width:var(--spectrum-tag-texticon-border-size);box-sizing:border-box;display:inline-flex;height:var(--spectrum-tag-texticon-height);max-width:100%;outline:0;padding-bottom:0;padding-top:0;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;-webkit-user-select:none;user-select:none;vertical-align:bottom}:host([disabled]){pointer-events:none}:host([dir=ltr])>::slotted([slot=avatar]),:host([dir=ltr])>::slotted([slot=icon]){margin-right:var(
--spectrum-tag-texticon-icon-gap
)}:host([dir=rtl])>::slotted([slot=avatar]),:host([dir=rtl])>::slotted([slot=icon]){margin-left:var(
--spectrum-tag-texticon-icon-gap
)}:host([dir=ltr])>::slotted([slot=avatar]),:host([dir=ltr])>::slotted([slot=icon]){margin-left:calc(var(--spectrum-tag-texticon-avatar-padding-x) - var(--spectrum-tag-texticon-padding-left))}:host([dir=rtl])>::slotted([slot=avatar]),:host([dir=rtl])>::slotted([slot=icon]){margin-right:calc(var(--spectrum-tag-texticon-avatar-padding-x) - var(--spectrum-tag-texticon-padding-left))}:host([dir=ltr])>slot[name=avatar]~.spectrum-Tag-label,:host([dir=ltr])>slot[name=icon]~.spectrum-Tag-label{margin-right:calc(var(--spectrum-tag-texticon-avatar-padding-x) - var(--spectrum-tag-texticon-padding-right))}:host([dir=rtl])>slot[name=avatar]~.spectrum-Tag-label,:host([dir=rtl])>slot[name=icon]~.spectrum-Tag-label{margin-left:calc(var(--spectrum-tag-texticon-avatar-padding-x) - var(--spectrum-tag-texticon-padding-right))}:host([dir=ltr]) .clear-button{margin-right:calc(var(--spectrum-tag-texticon-padding-right)*-1)}:host([dir=rtl]) .clear-button{margin-left:calc(var(--spectrum-tag-texticon-padding-right)*-1)}.spectrum-Tag-label{cursor:default;flex:1 1 auto;font-size:var(--spectrum-tag-texticon-text-size);height:100%;line-height:calc(var(--spectrum-tag-texticon-height) - var(--spectrum-tag-texticon-border-size)*2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([selected].focus-visible):after,:host([selected].is-focused):after{box-shadow:0 0 0 var(--spectrum-tag-texticon-focus-ring-size) var(
--spectrum-tag-m-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([selected].is-focused):after,:host([selected]:focus-visible):after{box-shadow:0 0 0 var(--spectrum-tag-texticon-focus-ring-size) var(
--spectrum-tag-m-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host{background-color:var(
--spectrum-tag-s-texticon-background-color,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-tag-s-texticon-border-color,var(--spectrum-alias-border-color-darker-default)
);color:var(
--spectrum-tag-s-texticon-text-color,var(--spectrum-alias-label-text-color)
)}.clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color,var(--spectrum-alias-icon-color)
)}:host(:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-hover,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-tag-s-texticon-border-color-hover,var(--spectrum-alias-border-color-darker-hover)
);color:var(
--spectrum-tag-s-texticon-text-color-hover,var(--spectrum-alias-text-color-hover)
)}:host(:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host(.focus-visible){background-color:var(
--spectrum-tag-s-texticon-background-color-key-focus,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-tag-s-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-tag-s-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);color:var(
--spectrum-tag-s-texticon-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host(:focus-visible){background-color:var(
--spectrum-tag-s-texticon-background-color-key-focus,var(--spectrum-global-color-gray-75)
);border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-tag-s-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
) var(
--spectrum-tag-s-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);color:var(
--spectrum-tag-s-texticon-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host(.focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host(:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([selected]){background-color:var(
--spectrum-tag-s-texticon-background-color-selected,var(--spectrum-global-color-gray-700)
);border-color:var(
--spectrum-tag-s-texticon-border-color-selected,var(--spectrum-global-color-gray-700)
);color:var(
--spectrum-tag-s-texticon-text-color-selected,var(--spectrum-alias-text-color-overbackground)
)}:host([selected]) .spectrum-TagIcon{color:var(
--spectrum-tag-s-texticon-icon-color-selected,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected]:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-selected-hover,var(--spectrum-global-color-gray-800)
)}:host([selected]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-hover,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected].focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-text-color-overbackground)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focus-ring-color-selected-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([selected]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-text-color-overbackground)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-focus-ring-color-selected-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([selected].focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-key-focus,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-key-focus,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected][invalid]){background-color:var(
--spectrum-tag-s-texticon-background-color-error-selected,var(--spectrum-semantic-negative-background-color-default)
);border-color:var(
--spectrum-tag-s-texticon-border-color-error-selected,var(--spectrum-semantic-negative-background-color-default)
)}:host([selected][invalid]) .spectrum-Tag-label{color:var(
--spectrum-tag-s-removable-texticon-text-color-error-selected,var(--spectrum-alias-text-color-overbackground)
)}:host([selected][invalid]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-selected,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected][invalid]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-selected,var(--spectrum-alias-icon-color-overbackground)
)}:host([selected][invalid].focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-text-color-overbackground)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-error-selected-key-focus,var(--spectrum-semantic-negative-background-color-key-focus)
)}:host([selected][invalid]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-text-color-selected-key-focus,var(--spectrum-alias-text-color-overbackground)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-error-selected-key-focus,var(--spectrum-semantic-negative-background-color-key-focus)
)}:host([selected][invalid]:hover){background-color:var(
--spectrum-tag-s-texticon-background-color-error-selected-hover,var(--spectrum-semantic-negative-background-color-hover)
);border-color:var(
--spectrum-tag-s-texticon-border-color-error-selected-hover,var(--spectrum-semantic-negative-background-color-hover)
)}:host([selected][invalid]:hover) .clear-button,:host([selected][invalid]:hover) .spectrum-Tag-icon,:host([selected][invalid]:hover) .spectrum-Tag-label{color:var(
--spectrum-tag-s-texticon-icon-color-error-selected-hover,var(--spectrum-alias-icon-color-overbackground)
)}:host([invalid]){border-color:var(
--spectrum-tag-s-texticon-border-color-error,var(--spectrum-semantic-negative-color-default)
);color:var(
--spectrum-tag-s-texticon-icon-color-error,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]:hover){border-color:var(
--spectrum-tag-s-texticon-border-color-error-hover,var(--spectrum-semantic-negative-color-hover)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]:hover) .clear-button,:host([invalid]:hover) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid].focus-visible){border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]:focus-visible){border-color:var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-tag-s-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);color:var(
--spectrum-tag-s-texticon-icon-color-error-hover,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) .clear-button,:host([invalid]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-error,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error,var(--spectrum-semantic-negative-icon-color)
)}:host([disabled]){background-color:var(
--spectrum-tag-s-texticon-background-color-disabled,var(--spectrum-alias-background-color-disabled)
);border-color:var(
--spectrum-tag-s-texticon-border-color-disabled,var(--spectrum-alias-border-color-disabled)
);color:var(
--spectrum-tag-s-texticon-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) ::slotted([slot=avatar]){opacity:var(
--spectrum-avatar-size-100-opacity-disabled,var(--spectrum-global-color-opacity-30)
)}:host([disabled]) .spectrum-Tag-icon{color:var(
--spectrum-tag-s-texticon-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host([disabled]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host([deletable]:hover){color:var(
--spectrum-tag-s-removable-texticon-text-color-hover,var(--spectrum-alias-text-color-hover)
)}:host([deletable]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([deletable]:active){color:var(
--spectrum-tag-s-removable-texticon-text-color-down,var(--spectrum-alias-text-color-down)
)}:host([deletable]:active) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host([deletable][invalid]:hover){border-color:var(
--spectrum-tag-s-removable-texticon-border-color-error-hover,var(--spectrum-semantic-negative-color-hover)
);color:var(
--spectrum-tag-s-removable-texticon-text-color-error-hover,var(--spectrum-semantic-negative-color-down)
)}:host([deletable][invalid]:hover) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-hover,var(--spectrum-semantic-negative-icon-color)
)}:host([deletable][invalid]:active){border-color:var(
--spectrum-tag-s-removable-texticon-border-color-error-down,var(--spectrum-semantic-negative-color-down)
);color:var(
--spectrum-tag-s-removable-texticon-text-color-error-down,var(--spectrum-semantic-negative-color-down)
)}:host([deletable][invalid]:active) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-error-down,var(--spectrum-semantic-negative-icon-color)
)}:host([deletable].focus-visible){color:var(
--spectrum-tag-s-removable-texticon-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([deletable]:focus-visible){color:var(
--spectrum-tag-s-removable-texticon-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([deletable].focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([deletable]:focus-visible) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([deletable][selected]){color:var(
--spectrum-tag-s-removable-texticon-text-color-selected,var(--spectrum-alias-text-color-overbackground)
)}:host([deletable][selected]) .is-focused{color:var(
--spectrum-tag-s-removable-texticon-text-color-selected-key-focus,var(--spectrum-alias-text-color-overbackground)
)}:host([deletable][selected]) .clear-button{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected,var(--spectrum-alias-icon-color-overbackground)
)}:host([deletable][selected]) .clear-button:hover{color:var(
--spectrum-tag-s-removable-texticon-icon-color-selected-hover,var(--spectrum-alias-icon-color-overbackground)
)}:host([deletable][selected][invalid]){color:var(
--spectrum-tag-s-removable-texticon-text-color-error-key-focus,var(--spectrum-semantic-negative-color-down)
)}:host([deletable]) .clear-button.is-focused{background-color:var(
--spectrum-tag-s-removable-texticon-button-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);border-color:var(
--spectrum-tag-s-removable-texticon-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
);color:var(
--spectrum-tag-s-removable-texticon-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([deletable]) .clear-button:hover{color:var(
--spectrum-tag-s-removable-texticon-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([deletable]) .clear-button:active{background-color:var(
--spectrum-tag-s-removable-texticon-button-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
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
)}`;class Hr extends(f(e,{validSizes:["s","m","l"]})){constructor(){super(),this.deletable=!1,this.disabled=!1,this.readonly=!1,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.handleKeydown=t=>{if(!this.deletable)return;const{code:e}=t;switch(e){case"Backspace":case"Space":case"Delete":return void this.delete();default:return}},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Dr]}get hasIcon(){return!!this.querySelector('[slot="icon"]')}get hasAvatar(){return!!this.querySelector('[slot="avatar"]')}delete(){this.readonly||this.dispatchEvent(new Event("delete",{bubbles:!0}))}render(){const t=[];return this.hasAvatar&&t.push(r`<slot name="avatar"></slot>`),this.hasIcon&&t.push(r`<slot name="icon"></slot>`),r`${t} <span class="label"><slot></slot></span>${this.deletable?r`<sp-clear-button class="clear-button" ?disabled="${this.disabled}" label="Remove" size="s" tabindex="-1" @click="${this.delete}"></sp-clear-button>`:r``}`}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex",!this.disabled&&this.matches(":first-of-type:not([disabled])")?"0":"-1")}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}o([i({type:Boolean,reflect:!0})],Hr.prototype,"deletable",void 0),o([i({type:Boolean,reflect:!0})],Hr.prototype,"disabled",void 0),o([i({type:Boolean,reflect:!0})],Hr.prototype,"readonly",void 0),customElements.define("sp-tag",Hr);var Fr=n`:host{--spectrum-taggroup-tag-gap-x:var(--spectrum-global-dimension-size-100);--spectrum-taggroup-tag-gap-y:var(--spectrum-global-dimension-size-100);display:inline-flex;list-style:none;margin:0;padding:0}::slotted(*){margin:calc(var(
--spectrum-taggroup-tag-gap-y,
var(--spectrum-global-dimension-size-100)
)/2) calc(var(
--spectrum-taggroup-tag-gap-x,
var(--spectrum-global-dimension-size-100)
)/2)}`;class Tr extends(w(e)){constructor(){super(),this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown),requestAnimationFrame((()=>{const t=this.tags.find((t=>0===t.tabIndex));t&&(t.tabIndex=-1)}))},this.handleKeydown=t=>{const{code:e}=t,r=this.getRootNode().activeElement;if(!r)return;let o=this.tags.indexOf(r);if(-1===o)return;const i=(t,e)=>t[(t.length+e)%t.length],s=t=>{o+=t;let e=i(this.tags,o);for(;e.disabled||!e.deletable;)o+=t,e=i(this.tags,o)};switch(e){case"ArrowUp":s(-1);break;case"ArrowLeft":s(this.isLTR?-1:1);break;case"ArrowRight":s(this.isLTR?1:-1);break;case"ArrowDown":s(1);break;case"End":o=this.tags.length,s(-1);break;case"Home":o=-1,s(1);break;case"PageUp":case"PageDown":const r=[...this.getRootNode().querySelectorAll("sp-tags")];if(r.length<2)return;t.preventDefault();const a="PageUp"===e?-1:1;let l=r.indexOf(this)+a,c=i(r,l);for(;!c.tags.length;)l+=a,c=i(r,l);return void c.focus();default:return}t.preventDefault(),i(this.tags,o).focus()},this.handleFocusout=()=>{const t=this.tags.find((t=>!t.disabled&&t.deletable));t&&(t.tabIndex=0),this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Fr]}get tags(){return this.defaultNodes.filter((t=>t instanceof Hr))}focus(){if(!this.tags.length)return;const t=this.tags.find((t=>!t.disabled&&t.deletable));t&&t.focus()}render(){return r`<slot></slot>`}firstUpdated(){this.hasAttribute("role")||this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","Tags")}}o([m("")],Tr.prototype,"defaultNodes",void 0),customElements.define("sp-tags",Tr),customElements.define("sp-textfield",N);var Ur=n`:host{align-items:center;background-position:0 0,0 var(--spectrum-global-dimension-static-size-100,8px),var(--spectrum-global-dimension-static-size-100,8px) calc(var(--spectrum-global-dimension-static-size-100,8px)*-1),calc(var(--spectrum-global-dimension-static-size-100,8px)*-1) 0;background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px);border-radius:var(--spectrum-thumbnail-border-radius);display:flex;height:var(--spectrum-thumbnail-height);justify-content:center;margin:0;overflow:hidden;padding:0;position:relative;vertical-align:top;width:var(--spectrum-thumbnail-width)}:host:before{border-radius:var(--spectrum-thumbnail-border-radius);content:"";height:100%;position:absolute;width:100%;z-index:2}:host([size=xxs]){--spectrum-thumbnail-border-color-selected:var(
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
--spectrum-global-color-static-white,#fff
);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-thumbnail-darksquare-background-color) 75.5%),linear-gradient(-45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-thumbnail-darksquare-background-color) 25.5%,transparent 25.5%)}:host:before{box-shadow:inset 0 0 0 var(--spectrum-thumbnail-border-size) var(--spectrum-thumbnail-border-color)}:host([selected]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host([selected]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:0;overflow:visible}:host(:focus-visible),:host([focused]){box-shadow:0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected);outline:0;overflow:visible}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 calc(var(--spectrum-thumbnail-border-size-selected-key-focus)/2) var(--spectrum-thumbnail-border-color-selected)}:host(.focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;box-shadow:0 0 0 var(--spectrum-thumbnail-border-size-selected-key-focus) var(--spectrum-thumbnail-border-color-key-focus);content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0}:host(:focus-visible):after,:host([focused]):after{border-radius:calc(var(--spectrum-thumbnail-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;box-shadow:0 0 0 var(--spectrum-thumbnail-border-size-selected-key-focus) var(--spectrum-thumbnail-border-color-key-focus);content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0}::slotted(:not(img)){display:none}`;class Or extends(f(e,{validSizes:["xxs","xs","s","m","l"],defaultSize:"s"})){constructor(){super(...arguments),this.cover=!1}static get styles(){return[Ur]}render(){return r`${this.background?r`<div class="background" style="background:${this.background}"></div>`:r``}<slot></slot>`}}o([i({type:String,reflect:!0})],Or.prototype,"background",void 0),o([i({type:Boolean,reflect:!0})],Or.prototype,"cover",void 0),customElements.define("sp-thumbnail",Or);var Nr=n`:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([placement*=bottom][open]){transform:translateY(var(--spectrum-overlay-animation-distance))}:host([placement*=top][open]){transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([placement*=right][open]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([placement*=left][open]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{--spectrum-tooltip-neutral-target-offset:3px;--spectrum-tooltip-neutral-tip-width:var(
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
);position:relative;top:0;vertical-align:top;width:auto;word-break:break-word}:host{cursor:default;-webkit-user-select:none;user-select:none}p{margin:0}#tip{border-bottom:var(
--spectrum-tooltip-neutral-tip-width,var(--spectrum-global-dimension-size-100)
) solid transparent;border-left:var(
--spectrum-tooltip-neutral-tip-width,var(--spectrum-global-dimension-size-100)
) solid transparent;border-right:var(
--spectrum-tooltip-neutral-tip-width,var(--spectrum-global-dimension-size-100)
) solid transparent;border-top-style:solid;border-top-width:var(
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
)*-1)}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(var(--spectrum-tooltip-neutral-icon-margin-x,var(--spectrum-global-dimension-size-85)) - var(--spectrum-tooltip-neutral-padding-x,var(--spectrum-global-dimension-size-85)))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(var(--spectrum-tooltip-neutral-icon-margin-x,var(--spectrum-global-dimension-size-85)) - var(--spectrum-tooltip-neutral-padding-x,var(--spectrum-global-dimension-size-85)))}:host([dir=ltr]) ::slotted([slot=icon]){margin-right:var(
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
)}#tip{border:none}:host([placement*=bottom]) #tip,:host([placement*=left]) #tip,:host([placement*=right]) #tip{transform:none}#tip:after{border:var(
--spectrum-tooltip-tip-height,var(--spectrum-global-dimension-size-50)
) solid transparent;content:"";height:0;left:0;position:absolute;width:0}:host([placement*=bottom]) #tip:after{bottom:100%;transform:scaleY(-1)}:host([placement*=left]) #tip:after{left:100%;transform:rotate(-90deg)}:host([placement*=right]) #tip:after{left:auto;right:100%;transform:rotate(90deg)}:host([placement]) #tip:after{border-top-color:var(
--spectrum-tooltip-background-color,var(--spectrum-global-color-static-gray-700)
)}:host([variant=negative]) #tip:after{border-top-color:var(
--spectrum-tooltip-negative-background-color,var(--spectrum-global-color-static-red-700)
)}:host([variant=info]) #tip:after{border-top-color:var(
--spectrum-tooltip-info-background-color,var(--spectrum-global-color-static-blue-700)
)}:host([variant=positive]) #tip:after{border-top-color:var(
--spectrum-tooltip-positive-background-color,var(--spectrum-global-color-static-green-700)
)}`;class Rr extends HTMLElement{disconnectedCallback(){this.dispatchEvent(new Event("disconnected"))}}customElements.define("tooltip-proxy",Rr);class jr extends e{constructor(){super(),this._tooltipId="sp-tooltip-describedby-helper-"+jr.instanceCount++,this.selfManaged=!1,this.offset=6,this.hadTooltipId=!1,this.open=!1,this.placement="top",this._variant="",this.abortOverlay=()=>{},this.openOverlay=()=>{const t=this.parentElement,e=new Promise((t=>{this.abortOverlay=t}));this.closeOverlayCallback=A(t,"hover",this,{abortPromise:e,offset:this.offset,placement:this.placement})},this.closeOverlay=async()=>{this.abortOverlay&&this.abortOverlay(!0),this.closeOverlayCallback&&((await this.closeOverlayCallback)(),delete this.closeOverlayCallback)},this.addEventListener("sp-overlay-query",this.onOverlayQuery)}static get styles(){return[Nr]}get variant(){return this._variant}set variant(t){if(t!==this.variant){if(["info","positive","negative"].includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}onOverlayQuery(t){if(!t.target)return;t.target===this&&(t.detail.overlayContentTipElement=this.tipElement)}generateProxy(){this._proxy||(this._proxy=document.createElement("tooltip-proxy"),this._proxy.id=this._tooltipId,this._proxy.hidden=!0,this._proxy.slot="hidden-tooltip-content",this._proxy.setAttribute("role","tooltip"),this._proxy.addEventListener("disconnected",this.closeOverlay))}overlayWillOpenCallback({trigger:t}){this.setAttribute("aria-hidden","true"),this.generateProxy(),this._proxy.textContent=this.textContent;const e=t.getAttribute("aria-describedby")||"";this.hadTooltipId=e.search(this._tooltipId)>-1,this.insertAdjacentElement("beforebegin",this._proxy),this.hadTooltipId||(e?t.setAttribute("aria-describedby",`${e} ${this._tooltipId}`):t.setAttribute("aria-describedby",`${this._tooltipId}`))}overlayOpenCancelledCallback({trigger:t}){this.overlayCloseCallback({trigger:t})}overlayCloseCallback({trigger:t}){let e=(t.getAttribute("aria-describedby")||"").split(/\s+/);this.hadTooltipId||(e=e.filter((t=>t!==this._tooltipId))),e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby"),this.removeAttribute("aria-hidden"),this.removeProxy()}removeProxy(){this._proxy.remove()}manageTooltip(){const t=this.parentElement;this.selfManaged?(this.slot&&(this.previousSlot=this.slot),this.slot="self-managed-tooltip",t.addEventListener("pointerenter",this.openOverlay),t.addEventListener("focusin",this.openOverlay),t.addEventListener("pointerleave",this.closeOverlay),t.addEventListener("focusout",this.closeOverlay)):(this.previousSlot?this.slot=this.previousSlot:"self-managed-tooltip"===this.slot&&this.removeAttribute("slot"),t.removeEventListener("pointerenter",this.openOverlay),t.removeEventListener("focusin",this.openOverlay),t.removeEventListener("pointerleave",this.closeOverlay),t.removeEventListener("focusout",this.closeOverlay))}render(){return r`<slot name="icon"></slot><span id="label"><slot></slot></span><span id="tip"></span>`}async update(t){t.has("open")&&this.selfManaged&&(this.open?this.openOverlay():this.closeOverlay()),this.generateProxy(),super.update(t)}updated(t){super.updated(t),t.has("selfManaged")&&this.manageTooltip()}}jr.instanceCount=0,o([i({type:Boolean,attribute:"self-managed"})],jr.prototype,"selfManaged",void 0),o([i({type:Number,reflect:!0})],jr.prototype,"offset",void 0),o([i({type:Boolean,reflect:!0})],jr.prototype,"open",void 0),o([i({reflect:!0})],jr.prototype,"placement",void 0),o([g("#tip")],jr.prototype,"tipElement",void 0),o([i({type:String})],jr.prototype,"variant",null),customElements.define("sp-tooltip",jr);class Vr extends(f(e)){constructor(){super(...arguments),this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)",this.shouldAnimate=!1,this.onClick=t=>{const e=t.target;this.shouldAnimate=!0,this.selectTarget(e)},this.items=[],this.updateSelectionIndicator=async()=>{const t=this.items.find((t=>t.value===this.selected||t.value===window.location.href));if(!t)return void(this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)");await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const e=t.getBoundingClientRect(),r=this.getBoundingClientRect(),o=e.width,i="ltr"===this.dir?e.left-r.left:e.right-r.right;this.selectionIndicatorStyle=`transform: translateX(${i}px) scaleX(${"ltr"===this.dir?o:-1*o});`}}static get styles(){return[_r]}set selected(t){const e=this.selected;t!==e&&(this.updateCheckedState(t),this._selected=t,this.requestUpdate("selected",e))}get selected(){return this._selected}manageItems(){this.items=[...this.querySelectorAll("sp-top-nav-item")];const t=this.items.find((t=>t.value===window.location.href));t&&this.selectTarget(t)}render(){return r`<div @click="${this.onClick}" id="list"><slot @slotchange="${this.onSlotChange}"></slot><div id="selection-indicator" class="${v(this.shouldAnimate?void 0:"first-position")}" style="${this.selectionIndicatorStyle}"></div></div>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("direction","horizontal"),this.manageItems()}updated(t){super.updated(t),t.has("dir")&&this.updateSelectionIndicator(),this.shouldAnimate||void 0===t.get("shouldAnimate")||(this.shouldAnimate=!0)}selectTarget(t){const{value:e}=t;e&&(this.selected=e)}onSlotChange(){this.manageItems()}updateCheckedState(t){this.items.forEach((t=>{t.selected=!1})),requestAnimationFrame((()=>{if(t&&t.length){const e=this.items.find((e=>e.value===t||e.value===window.location.href));e?e.selected=!0:this.selected=""}this.updateSelectionIndicator()}))}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}o([i()],Vr.prototype,"selectionIndicatorStyle",void 0),o([i({attribute:!1})],Vr.prototype,"shouldAnimate",void 0),o([i({reflect:!0})],Vr.prototype,"selected",null),customElements.define("sp-top-nav",Vr);var Kr=n`a{color:inherit}a:focus{outline:0}`;class Xr extends(y(h)){constructor(){super(...arguments),this.selected=!1,this.value=""}static get styles(){return[Lr,Kr]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return r`<a id="item-label" href="${v(this.href)}" download="${v(this.download)}" target="${v(this.target)}" aria-label="${v(this.label)}" aria-current="${v(this.selected&&this.href?"page":void 0)}" rel="${v(this.rel)}"><slot></slot></a>`}firstUpdated(t){super.firstUpdated(t)}updated(t){super.updated(t),this.value=this.anchor.href}}o([g("a")],Xr.prototype,"anchor",void 0),o([i({type:Boolean,reflect:!0})],Xr.prototype,"selected",void 0),customElements.define("sp-top-nav-item",Xr);var Gr,Yr=n`.tray{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .tray{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-tray-margin-top:64px}:host([dir=ltr]) .spectrum-Tray-wrapper{left:0}:host([dir=rtl]) .spectrum-Tray-wrapper{right:0}.spectrum-Tray-wrapper{bottom:0;display:flex;justify-content:center;position:fixed;width:100%;z-index:2}.tray{border-radius:var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(--spectrum-tray-border-radius,0) var(--spectrum-tray-border-radius,0);max-height:calc(100vh - var(--spectrum-tray-margin-top));max-width:var(--spectrum-tray-max-width,375px);min-height:var(
--spectrum-tray-min-height,var(--spectrum-global-dimension-static-size-800)
);outline:0;overflow:auto;padding:var(--spectrum-tray-padding-y,0) var(
--spectrum-tray-padding-x,var(--spectrum-global-dimension-static-size-100)
);transform:translateY(100%);transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100))),transform var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms);width:var(--spectrum-tray-width,100%)}:host([open]) .tray{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media (max-width:375px){.tray{border-radius:var(--spectrum-tray-border-radius,0)}}:host{align-items:flex-end}.tray{padding:var(--spectrum-tray-padding-y,0) var(--spectrum-tray-padding-x,0)}`;class Wr extends e{constructor(){super(...arguments),this.open=!1}static get styles(){return[Ae,Yr]}focus(){const t=R(this);t?t.focus():1===this.children.length?this.tray.focus():super.focus()}close(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0}))}render(){return r`<sp-underlay ?open="${this.open}" @click="${this.close}"></sp-underlay><div class="tray modal" tabindex="-1"><slot></slot></div>`}}o([i({type:Boolean,reflect:!0})],Wr.prototype,"open",void 0),o([g(".tray")],Wr.prototype,"tray",void 0),customElements.define("sp-tray",Wr),window.Overlay=j;class Zr extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n            <style>\n                :host {\n                    display: block;\n                    background-color: var(--spectrum-global-color-gray-50);\n                    color: var(--spectrum-global-color-gray-800);\n                    border: 1px solid;\n                    padding: 2em;\n                }\n            </style>\n            <slot></slot>\n        "}}customElements.define("styled-element",Zr),null===(Gr=document.querySelector('sp-tab-panel[value="api"]'))||void 0===Gr||Gr.addEventListener("click",(t=>{const e=t.composedPath().find((t=>"tr"===t.localName&&t.id));e&&(location.hash=e.id,t.target.dispatchEvent(new CustomEvent("copy-text",{bubbles:!0,composed:!0,detail:{text:e.dataset.value,message:`${e.dataset.name} copied to clipboard!`}})))}));
//# sourceMappingURL=751f0d3f.js.map
