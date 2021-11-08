import{r as e}from"./e50c5e8d.js";import{_ as t,e as i,x as r,S as s,y as o}from"./62b05a9e.js";import"./b86f55ac.js";const a=({finisher:e,descriptor:t})=>(i,r)=>{var s;if(void 0===r){const r=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(o.finisher=function(t){e(t,r)}),o}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(s,r)}};function n(e,t){return a({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}function l(e="",t=!1,i=""){return a({descriptor:r=>({get(){var r,s,o;const a="slot"+(e?`[name=${e}]`:":not([name])");let n=null!==(o=null===(s=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(a))||void 0===s?void 0:s.assignedNodes({flatten:t}))&&void 0!==o?o:[];return i&&(n=n.filter((e=>e.nodeType===Node.ELEMENT_NODE&&e.matches(i)))),n},enumerable:!0,configurable:!0})})}function c(e,{validSizes:r=["s","m","l","xl"],noDefaultSize:s}={}){class o extends e{constructor(){super(...arguments),this._size="m"}get size(){return this._size||"m"}set size(e){const t=s?null:"m",i=e?e.toLocaleLowerCase():e,o=r.includes(i)?i:t;if(o&&this.setAttribute("size",o),this._size===o)return;const a=this._size;this._size=o,this.requestUpdate("size",a)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("size")||s||this.setAttribute("size",this.size)}}return t([i({type:String,reflect:!0})],o.prototype,"size",null),o}const d=e=>null!=e?e:r,u={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},m=e=>(...t)=>({_$litDirective$:e,values:t});class p{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}var h;window,h=function(){function e(e){var t=!0,i=!1,r=null,s={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function o(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function a(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function n(e){t=!1}function l(){document.addEventListener("mousemove",c),document.addEventListener("mousedown",c),document.addEventListener("mouseup",c),document.addEventListener("pointermove",c),document.addEventListener("pointerdown",c),document.addEventListener("pointerup",c),document.addEventListener("touchmove",c),document.addEventListener("touchstart",c),document.addEventListener("touchend",c)}function c(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,document.removeEventListener("mousemove",c),document.removeEventListener("mousedown",c),document.removeEventListener("mouseup",c),document.removeEventListener("pointermove",c),document.removeEventListener("pointerdown",c),document.removeEventListener("pointerup",c),document.removeEventListener("touchmove",c),document.removeEventListener("touchstart",c),document.removeEventListener("touchend",c))}document.addEventListener("keydown",(function(i){i.metaKey||i.altKey||i.ctrlKey||(o(e.activeElement)&&a(e.activeElement),t=!0)}),!0),document.addEventListener("mousedown",n,!0),document.addEventListener("pointerdown",n,!0),document.addEventListener("touchstart",n,!0),document.addEventListener("visibilitychange",(function(e){"hidden"===document.visibilityState&&(i&&(t=!0),l())}),!0),l(),e.addEventListener("focus",(function(e){var i,r,n;o(e.target)&&(t||(i=e.target,r=i.type,"INPUT"===(n=i.tagName)&&s[r]&&!i.readOnly||"TEXTAREA"===n&&!i.readOnly||i.isContentEditable))&&a(e.target)}),!0),e.addEventListener("blur",(function(e){var t;o(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(i=!0,window.clearTimeout(r),r=window.setTimeout((function(){i=!1}),100),(t=e.target).hasAttribute("data-focus-visible-added")&&(t.classList.remove("focus-visible"),t.removeAttribute("data-focus-visible-added")))}),!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document)},"object"==typeof exports&&"undefined"!=typeof module?h():"function"==typeof define&&define.amd?define(h):h();let b=!0;try{document.body.querySelector(":focus-visible")}catch(e){b=!1}const v=e=>{var t;const i=Symbol("endPolyfillCoordination");return t=i,class extends e{constructor(){super(...arguments),this[t]=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),b||requestAnimationFrame((()=>{null==this[i]&&(this[i]=(e=>{if(null==e.shadowRoot||e.hasAttribute("data-js-focus-visible"))return()=>{};if(!self.applyFocusVisiblePolyfill){const t=()=>{self.applyFocusVisiblePolyfill&&e.shadowRoot&&self.applyFocusVisiblePolyfill(e.shadowRoot),e.manageAutoFocus&&e.manageAutoFocus()};return self.addEventListener("focus-visible-polyfill-ready",t,{once:!0}),()=>{self.removeEventListener("focus-visible-polyfill-ready",t)}}return self.applyFocusVisiblePolyfill(e.shadowRoot),e.manageAutoFocus&&e.manageAutoFocus(),()=>{}})(this))}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),b||requestAnimationFrame((()=>{null!=this[i]&&(this[i](),this[i]=null)}))}}};class g extends(v(s)){constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this._tabIndex=0,this.manipulatingTabindex=!1}get tabIndex(){if(this.focusElement===this){const e=this.hasAttribute("tabindex")?Number(this.getAttribute("tabindex")):NaN;return isNaN(e)?-1:e}const e=parseFloat(this.hasAttribute("tabindex")&&this.getAttribute("tabindex")||"0");return this.disabled||e<0?-1:this.focusElement?this.focusElement.tabIndex:e}set tabIndex(e){if(this.manipulatingTabindex)this.manipulatingTabindex=!1;else if(this.focusElement!==this){if(-1===e?this.addEventListener("pointerdown",this.onPointerdownManagementOfTabIndex):(this.manipulatingTabindex=!0,this.removeEventListener("pointerdown",this.onPointerdownManagementOfTabIndex)),-1===e||this.disabled)return this.setAttribute("tabindex","-1"),this.removeAttribute("focusable"),void(-1!==e&&this.manageFocusElementTabindex(e));this.setAttribute("focusable",""),this.hasAttribute("tabindex")?this.removeAttribute("tabindex"):this.manipulatingTabindex=!1,this.manageFocusElementTabindex(e)}else if(e!==this.tabIndex){this._tabIndex=e;const t=this.disabled?"-1":""+e;this.setAttribute("tabindex",t)}}onPointerdownManagementOfTabIndex(){-1===this.tabIndex&&(this.tabIndex=0,this.focus({preventScroll:!0}))}async manageFocusElementTabindex(e){this.focusElement||await this.updateComplete,null===e?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=e}get focusElement(){throw new Error("Must implement focusElement getter!")}focus(e){!this.disabled&&this.focusElement&&(this.focusElement!==this?this.focusElement.focus(e):HTMLElement.prototype.focus.apply(this,[e]))}blur(){const e=this.focusElement||this;e!==this?e.blur():HTMLElement.prototype.blur.apply(this)}click(){if(this.disabled)return;const e=this.focusElement||this;e!==this?e.click():HTMLElement.prototype.click.apply(this)}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus())}firstUpdated(e){super.firstUpdated(e),this.manageAutoFocus(),this.hasAttribute("tabindex")&&"-1"===this.getAttribute("tabindex")||this.setAttribute("focusable","")}update(e){e.has("disabled")&&this.handleDisabledChanged(this.disabled,e.get("disabled")),super.update(e)}updated(e){super.updated(e),e.has("disabled")&&this.disabled&&this.blur()}async handleDisabledChanged(e,t){const i=()=>this.focusElement!==this&&void 0!==this.focusElement.disabled;e?(this.manipulatingTabindex=!0,this.setAttribute("tabindex","-1"),await this.updateComplete,i()?this.focusElement.disabled=!0:this.setAttribute("aria-disabled","true")):t&&(this.manipulatingTabindex=!0,this.focusElement===this?this.setAttribute("tabindex",""+this._tabIndex):this.removeAttribute("tabindex"),await this.updateComplete,i()?this.focusElement.disabled=!1:this.removeAttribute("aria-disabled"))}}function f(e){class r extends e{renderAnchor({id:e,className:t,ariaHidden:i,labelledby:r,tabindex:s,anchorContent:a=o`<slot></slot>`}){return o`<a id="${e}" class="${d(t)}" href="${d(this.href)}" download="${d(this.download)}" target="${d(this.target)}" aria-label="${d(this.label)}" aria-labelledby="${d(r)}" aria-hidden="${d(i?"true":void 0)}" tabindex="${d(s)}" rel="${d(this.rel)}">${a}</a>`}}return t([i({reflect:!0})],r.prototype,"download",void 0),t([i()],r.prototype,"label",void 0),t([i({reflect:!0})],r.prototype,"href",void 0),t([i({reflect:!0})],r.prototype,"target",void 0),t([i({reflect:!0})],r.prototype,"rel",void 0),r}t([i({type:Boolean,reflect:!0})],g.prototype,"disabled",void 0),t([i({type:Boolean})],g.prototype,"autofocus",void 0),t([i({type:Number})],g.prototype,"tabIndex",null);var k=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
--spectrum-alias-ui-icon-checkmark-size-50
)}.spectrum-UIIcon-Checkmark75{height:var(--spectrum-alias-ui-icon-checkmark-size-75);width:var(
--spectrum-alias-ui-icon-checkmark-size-75
)}.spectrum-UIIcon-Checkmark100{height:var(--spectrum-alias-ui-icon-checkmark-size-100);width:var(
--spectrum-alias-ui-icon-checkmark-size-100
)}.spectrum-UIIcon-Checkmark200{height:var(--spectrum-alias-ui-icon-checkmark-size-200);width:var(
--spectrum-alias-ui-icon-checkmark-size-200
)}.spectrum-UIIcon-Checkmark300{height:var(--spectrum-alias-ui-icon-checkmark-size-300);width:var(
--spectrum-alias-ui-icon-checkmark-size-300
)}.spectrum-UIIcon-Checkmark400{height:var(--spectrum-alias-ui-icon-checkmark-size-400);width:var(
--spectrum-alias-ui-icon-checkmark-size-400
)}.spectrum-UIIcon-Checkmark500{height:var(--spectrum-alias-ui-icon-checkmark-size-500);width:var(
--spectrum-alias-ui-icon-checkmark-size-500
)}.spectrum-UIIcon-Checkmark600{height:var(--spectrum-alias-ui-icon-checkmark-size-600);width:var(
--spectrum-alias-ui-icon-checkmark-size-600
)}`;const y=Symbol("slotElementObserver"),x=Symbol("startObserving"),w=Symbol("slotContentIsPresent");function E(e,t){var i;const r=Array.isArray(t)?t:[t];class s extends e{constructor(){super(...arguments),this[i]=new Map,this.managePresenceObservedSlot=()=>{r.forEach((e=>{this[w].set(e,!!this.querySelector(e))})),this.requestUpdate()}}get slotContentIsPresent(){if(1===r.length)return this[w].get(r[0])||!1;throw new Error("Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.")}getSlotContentPresence(e){if(this[w].has(e))return this[w].get(e)||!1;throw new Error("The provided selector `` is not being observed.")}[(i=w,x)](){this[y]||(this[y]=new MutationObserver(this.managePresenceObservedSlot)),this[y].observe(this,{childList:!0,subtree:!0}),this.managePresenceObservedSlot()}connectedCallback(){super.connectedCallback(),this[x]()}disconnectedCallback(){this[y].disconnect(),super.disconnectedCallback()}}return s}const z=Symbol("slotElementObserver"),A=Symbol("assignedNodes"),C=Symbol("startObserving");function I(e,r){var s;class o extends e{constructor(){super(...arguments),this.slotHasContent=!1}manageTextObservedSlot(){if(!this[A])return;const e=[...this[A]].filter((e=>!!e.tagName||!!e.textContent&&e.textContent.trim()));this.slotHasContent=e.length>0}firstUpdated(e){super.firstUpdated(e),this.manageTextObservedSlot()}[(s=A,C)](){if(!this[z]){const e=e=>{for(const t of e)"characterData"===t.type&&this.manageTextObservedSlot()};this[z]=new MutationObserver(e)}this[z].observe(this,{characterData:!0,subtree:!0})}connectedCallback(){super.connectedCallback(),this[C]()}disconnectedCallback(){this[z]&&this[z].disconnect(),super.disconnectedCallback()}}return t([i({type:Boolean,attribute:!1})],o.prototype,"slotHasContent",void 0),t([l(r,!0)],o.prototype,s,void 0),o}class L extends(f(I(E(g,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const e=[o`<div id="label" ?hidden="${!this.hasLabel}"><slot id="slot" @slotchange="${this.manageTextObservedSlot}"></slot></div>`];return this.hasIcon&&e.unshift(o`<slot name="icon" ?icon-only="${!this.hasLabel}"></slot>`),e}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let e=!1;if(this.anchorElement)this.anchorElement.click(),e=!0;else if("button"!==this.type){const t=document.createElement("button");t.type=this.type,this.insertAdjacentElement("afterend",t),t.click(),t.remove(),e=!0}return e}renderAnchor(){return o`${this.buttonContent} ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}`}renderButton(){return o`${this.buttonContent}`}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):(this.hasAttribute("role")&&"link"!==this.getAttribute("role")||this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(e){super.updated(e),e.has("href")&&this.manageAnchor(),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}t([i({type:Boolean,reflect:!0})],L.prototype,"active",void 0),t([i({type:String})],L.prototype,"type",void 0),t([n(".anchor")],L.prototype,"anchorElement",void 0);var T=e`:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{bottom:0;left:0;position:absolute;right:0;top:0}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}`;class q extends L{static get styles(){return[T]}}var U=e`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}:host:after{border-radius:calc(var(--spectrum-button-primary-texticon-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host(.focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host(:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host{background-color:var(
--spectrum-clearbutton-m-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color,var(--spectrum-alias-icon-color)
)}:host(:hover){background-color:var(
--spectrum-clearbutton-m-background-color-hover,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([active]){background-color:var(
--spectrum-clearbutton-m-background-color-down,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(.focus-visible){background-color:var(
--spectrum-clearbutton-m-background-color-key-focus,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host(:focus-visible){background-color:var(
--spectrum-clearbutton-m-background-color-key-focus,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host(:disabled),:host([disabled]){background-color:var(
--spectrum-clearbutton-m-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-clearbutton-m-icon-color-disabled,var(--spectrum-alias-icon-color-disabled)
)}:host{border:none;border-radius:100%;height:var(
--spectrum-clearbutton-m-height,var(--spectrum-global-dimension-size-400)
);margin:0;padding:0;width:var(
--spectrum-clearbutton-m-width,var(--spectrum-global-dimension-size-400)
)}:host>.icon{margin:0 auto}:host([variant=overBackground].focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}:host([variant=overBackground]:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1)}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){:host>.icon{margin:0}}:host([small]){height:var(
--spectrum-clearbutton-s-height,var(--spectrum-global-dimension-size-300)
);width:var(
--spectrum-clearbutton-s-width,var(--spectrum-global-dimension-size-300)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down,var(--spectrum-alias-background-color-quiet-overbackground-down)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-quiet-overbackground-disabled)
)}`;var N=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(
--spectrum-alias-ui-icon-cross-size-75
)}.spectrum-UIIcon-Cross100{height:var(--spectrum-alias-ui-icon-cross-size-100);width:var(
--spectrum-alias-ui-icon-cross-size-100
)}.spectrum-UIIcon-Cross200{height:var(--spectrum-alias-ui-icon-cross-size-200);width:var(
--spectrum-alias-ui-icon-cross-size-200
)}.spectrum-UIIcon-Cross300{height:var(--spectrum-alias-ui-icon-cross-size-300);width:var(
--spectrum-alias-ui-icon-cross-size-300
)}.spectrum-UIIcon-Cross400{height:var(--spectrum-alias-ui-icon-cross-size-400);width:var(
--spectrum-alias-ui-icon-cross-size-400
)}.spectrum-UIIcon-Cross500{height:var(--spectrum-alias-ui-icon-cross-size-500);width:var(
--spectrum-alias-ui-icon-cross-size-500
)}.spectrum-UIIcon-Cross600{height:var(--spectrum-alias-ui-icon-cross-size-600);width:var(
--spectrum-alias-ui-icon-cross-size-600
)}`;class S extends q{constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,U,N]}get buttonContent(){return[o`<sp-icon-cross75 slot="icon" class="icon spectrum-UIIcon-Cross75"></sp-icon-cross75>`]}}t([i({reflect:!0})],S.prototype,"variant",void 0);var $=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}`;var P=e`:host([size=s]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-s-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-s-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-s-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-s-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-s-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=m]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-m-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-m-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-m-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-m-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=l]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-l-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-l-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-l-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-l-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-l-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host([size=xl]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-xl-padding-top,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-xl-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-xl-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-xl-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-xl-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;display:block;font-size:var(--spectrum-fieldlabel-text-size);font-weight:var(--spectrum-fieldlabel-text-font-weight);line-height:var(--spectrum-fieldlabel-text-line-height);padding-bottom:var(--spectrum-fieldlabel-padding-bottom);padding-left:0;padding-right:0;padding-top:var(--spectrum-fieldlabel-padding-top);vertical-align:top}:host([dir=ltr]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}.required-icon{margin-bottom:0;margin-top:0}:host([dir=ltr][side-aligned=start]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=start]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=start]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=start]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl][side-aligned=start]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}:host([side-aligned=start]) .required-icon{margin-bottom:0;margin-top:var(
--spectrum-fieldlabel-m-side-asterisk-margin-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=end]){text-align:right}:host([dir=rtl][side-aligned=end]){text-align:left}:host([dir=ltr][side-aligned=end]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=end]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=end]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host{color:var(
--spectrum-fieldlabel-m-text-color,var(--spectrum-alias-label-text-color)
)}:host([disabled]){color:var(
--spectrum-fieldlabel-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) .required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color,var(--spectrum-global-color-gray-600)
)}:host([side-aligned=start]) .required-icon{margin-top:0}`;class F extends(c(s)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1}static get styles(){return[P,$]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),i=this.target,r=i.getRootNode(),s=r.host;r===t&&i.forceFocusVisible?i.forceFocusVisible():s&&s.forceFocusVisible&&s.forceFocusVisible()}async manageFor(){if(!this.for)return;const e=this.getRootNode(),t=e.querySelector(`#${this.for}`);if(t){if(t.localName.search("-")>0&&await customElements.whenDefined(t.localName),void 0!==t.updateComplete&&await t.updateComplete,this.target=t.focusElement||t,this.target){this.target.getRootNode()===e?this.target.setAttribute("aria-labelledby",this.id):this.target.setAttribute("aria-label",this.labelText)}return Promise.resolve()}}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});if(!e.length)return"";return e.map((e=>(e.textContent||"").trim())).join(" ")}render(){return o`<label><slot @slotchange="${this.manageFor}"></slot>${this.required?o`<sp-icon-asterisk100 class="required-icon spectrum-UIIcon-Asterisk100"></sp-icon-asterisk100>`:o``}</label>`}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${F.instanceCount++}`),this.addEventListener("click",this.handleClick)}updated(e){super.updated(e),(e.has("for")||e.has("id"))&&this.manageFor()}}F.instanceCount=0,t([i({type:Boolean,reflect:!0})],F.prototype,"disabled",void 0),t([i({type:String})],F.prototype,"id",void 0),t([i({type:String})],F.prototype,"for",void 0),t([i({type:Boolean,reflect:!0})],F.prototype,"required",void 0),t([n("slot")],F.prototype,"slotEl",void 0),t([i({type:String,reflect:!0,attribute:"side-aligned"})],F.prototype,"sideAligned",void 0),customElements.define("sp-field-label",F),customElements.define("sp-clear-button",S);export{L as B,v as F,f as L,I as O,c as S,p as a,g as b,k as c,q as d,m as e,E as f,N as g,n as i,d as l,l as o,u as t};
//# sourceMappingURL=a41a5416.js.map
