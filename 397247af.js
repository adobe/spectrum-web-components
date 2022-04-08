import{r as e}from"./e50c5e8d.js";import{o as t,l as i,_ as s,e as a,a as r,S as o,$ as l}from"./a9613eee.js";import"./705fa87a.js";function n(e,i){return t({descriptor:t=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(i){const i="symbol"==typeof t?Symbol():"__"+t;s.get=function(){var t,s;return void 0===this[i]&&(this[i]=null!==(s=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==s?s:null),this[i]}}return s}})}function c(e,s,a){let r,o=e;return"object"==typeof e?(o=e.slot,r=e):r={flatten:s},a?i({slot:o,flatten:s,selector:a}):t({descriptor:e=>({get(){var e,t;const i="slot"+(o?`[name=${o}]`:":not([name])"),s=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(i);return null!==(t=null==s?void 0:s.assignedNodes(r))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}function d(e,{validSizes:t=["s","m","l","xl"],noDefaultSize:i,defaultSize:r="m"}={}){class o extends e{constructor(){super(...arguments),this._size=r}get size(){return this._size||r}set size(e){const s=i?null:r,a=e?e.toLocaleLowerCase():e,o=t.includes(a)?a:s;if(o&&this.setAttribute("size",o),this._size===o)return;const l=this._size;this._size=o,this.requestUpdate("size",l)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("size")||i||this.setAttribute("size",this.size)}}return s([a({type:String,reflect:!0})],o.prototype,"size",null),o}const u=e=>null!=e?e:r,h={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},p=e=>(...t)=>({_$litDirective$:e,values:t});class m{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let b=!0;try{document.body.querySelector(":focus-visible")}catch(e){b=!1,import("./605d3acb.js")}const g=e=>{var t;const i=Symbol("endPolyfillCoordination");return t=i,class extends e{constructor(){super(...arguments),this[t]=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),b||requestAnimationFrame((()=>{null==this[i]&&(this[i]=(e=>{if(null==e.shadowRoot||e.hasAttribute("data-js-focus-visible"))return()=>{};if(!self.applyFocusVisiblePolyfill){const t=()=>{self.applyFocusVisiblePolyfill&&e.shadowRoot&&self.applyFocusVisiblePolyfill(e.shadowRoot),e.manageAutoFocus&&e.manageAutoFocus()};return self.addEventListener("focus-visible-polyfill-ready",t,{once:!0}),()=>{self.removeEventListener("focus-visible-polyfill-ready",t)}}return self.applyFocusVisiblePolyfill(e.shadowRoot),e.manageAutoFocus&&e.manageAutoFocus(),()=>{}})(this))}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),b||requestAnimationFrame((()=>{null!=this[i]&&(this[i](),this[i]=null)}))}}};class v extends(g(o)){constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this._tabIndex=0,this.manipulatingTabindex=!1}get tabIndex(){if(this.focusElement===this){const e=this.hasAttribute("tabindex")?Number(this.getAttribute("tabindex")):NaN;return isNaN(e)?-1:e}const e=parseFloat(this.hasAttribute("tabindex")&&this.getAttribute("tabindex")||"0");return this.disabled||e<0?-1:this.focusElement?this.focusElement.tabIndex:e}set tabIndex(e){if(this.manipulatingTabindex)this.manipulatingTabindex=!1;else if(this.focusElement!==this){if(-1===e?this.addEventListener("pointerdown",this.onPointerdownManagementOfTabIndex):(this.manipulatingTabindex=!0,this.removeEventListener("pointerdown",this.onPointerdownManagementOfTabIndex)),-1===e||this.disabled)return this.setAttribute("tabindex","-1"),this.removeAttribute("focusable"),void(-1!==e&&this.manageFocusElementTabindex(e));this.setAttribute("focusable",""),this.hasAttribute("tabindex")?this.removeAttribute("tabindex"):this.manipulatingTabindex=!1,this.manageFocusElementTabindex(e)}else if(e!==this.tabIndex){this._tabIndex=e;const t=this.disabled?"-1":""+e;this.setAttribute("tabindex",t)}}onPointerdownManagementOfTabIndex(){-1===this.tabIndex&&(this.tabIndex=0,this.focus({preventScroll:!0}))}async manageFocusElementTabindex(e){this.focusElement||await this.updateComplete,null===e?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=e}get focusElement(){throw new Error("Must implement focusElement getter!")}focus(e){!this.disabled&&this.focusElement&&(this.focusElement!==this?this.focusElement.focus(e):HTMLElement.prototype.focus.apply(this,[e]))}blur(){const e=this.focusElement||this;e!==this?e.blur():HTMLElement.prototype.blur.apply(this)}click(){if(this.disabled)return;const e=this.focusElement||this;e!==this?e.click():HTMLElement.prototype.click.apply(this)}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus())}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")&&"-1"===this.getAttribute("tabindex")||this.setAttribute("focusable","")}update(e){e.has("disabled")&&this.handleDisabledChanged(this.disabled,e.get("disabled")),super.update(e)}updated(e){super.updated(e),e.has("disabled")&&this.disabled&&this.blur()}async handleDisabledChanged(e,t){const i=()=>this.focusElement!==this&&void 0!==this.focusElement.disabled;e?(this.manipulatingTabindex=!0,this.setAttribute("tabindex","-1"),await this.updateComplete,i()?this.focusElement.disabled=!0:this.setAttribute("aria-disabled","true")):t&&(this.manipulatingTabindex=!0,this.focusElement===this?this.setAttribute("tabindex",""+this._tabIndex):this.removeAttribute("tabindex"),await this.updateComplete,i()?this.focusElement.disabled=!1:this.removeAttribute("aria-disabled"))}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{requestAnimationFrame((()=>{this.manageAutoFocus()}))}))}}function f(e){class t extends e{renderAnchor({id:e,className:t,ariaHidden:i,labelledby:s,tabindex:a,anchorContent:r=l`<slot></slot>`}){return l`<a id="${e}" class="${u(t)}" href="${u(this.href)}" download="${u(this.download)}" target="${u(this.target)}" aria-label="${u(this.label)}" aria-labelledby="${u(s)}" aria-hidden="${u(i?"true":void 0)}" tabindex="${u(a)}" rel="${u(this.rel)}">${r}</a>`}}return s([a({reflect:!0})],t.prototype,"download",void 0),s([a()],t.prototype,"label",void 0),s([a({reflect:!0})],t.prototype,"href",void 0),s([a({reflect:!0})],t.prototype,"target",void 0),s([a({reflect:!0})],t.prototype,"rel",void 0),t}s([a({type:Boolean,reflect:!0})],v.prototype,"disabled",void 0),s([a({type:Boolean})],v.prototype,"autofocus",void 0),s([a({type:Number})],v.prototype,"tabIndex",null);var k=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
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
)}`;const x=Symbol("slotElementObserver"),y=Symbol("startObserving"),z=Symbol("slotContentIsPresent");function w(e,t){var i;const s=Array.isArray(t)?t:[t];class a extends e{constructor(){super(...arguments),this[i]=new Map,this.managePresenceObservedSlot=()=>{s.forEach((e=>{this[z].set(e,!!this.querySelector(e))})),this.requestUpdate()}}get slotContentIsPresent(){if(1===s.length)return this[z].get(s[0])||!1;throw new Error("Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.")}getSlotContentPresence(e){if(this[z].has(e))return this[z].get(e)||!1;throw new Error("The provided selector `` is not being observed.")}[(i=z,y)](){this[x]||(this[x]=new MutationObserver(this.managePresenceObservedSlot)),this[x].observe(this,{childList:!0,subtree:!0}),this.managePresenceObservedSlot()}connectedCallback(){super.connectedCallback(),this[y]()}disconnectedCallback(){this[x].disconnect(),super.disconnectedCallback()}}return a}const E=Symbol("slotElementObserver"),A=Symbol("assignedNodes"),C=Symbol("startObserving");function I(e,t){var i;class r extends e{constructor(){super(...arguments),this.slotHasContent=!1}manageTextObservedSlot(){if(!this[A])return;const e=[...this[A]].filter((e=>!!e.tagName||!!e.textContent&&e.textContent.trim()));this.slotHasContent=e.length>0}firstUpdated(e){super.firstUpdated(e),this.manageTextObservedSlot()}[(i=A,C)](){if(!this[E]){const e=e=>{for(const t of e)"characterData"===t.type&&this.manageTextObservedSlot()};this[E]=new MutationObserver(e)}this[E].observe(this,{characterData:!0,subtree:!0})}connectedCallback(){super.connectedCallback(),this[C]()}disconnectedCallback(){this[E]&&this[E].disconnect(),super.disconnectedCallback()}}return s([a({type:Boolean,attribute:!1})],r.prototype,"slotHasContent",void 0),s([c(t,!0)],r.prototype,i,void 0),r}class U extends(f(I(w(v,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const e=[l`<div id="label" ?hidden="${!this.hasLabel}"><slot id="slot" @slotchange="${this.manageTextObservedSlot}"></slot></div>`];return this.hasIcon&&e.unshift(l`<slot name="icon" ?icon-only="${!this.hasLabel}"></slot>`),e}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let e=!1;if(this.anchorElement)this.anchorElement.click(),e=!0;else if("button"!==this.type){const t=document.createElement("button");t.type=this.type,this.insertAdjacentElement("afterend",t),t.click(),t.remove(),e=!0}return e}renderAnchor(){return l`${this.buttonContent} ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}`}renderButton(){return l`${this.buttonContent}`}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):(this.hasAttribute("role")&&"link"!==this.getAttribute("role")||this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(e){super.updated(e),e.has("href")&&this.manageAnchor(),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}s([a({type:Boolean,reflect:!0})],U.prototype,"active",void 0),s([a({type:String})],U.prototype,"type",void 0),s([n(".anchor")],U.prototype,"anchorElement",void 0);var S=e`:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}`;class L extends U{static get styles(){return[S]}}var T=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(
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
)}`;var $=e`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}`;var F=e`:host([size=s]){--spectrum-fieldlabel-padding-top:var(
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
)}:host([side-aligned=start]) .required-icon{margin-top:0}`;class P extends(d(o)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1}static get styles(){return[F,$]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),i=this.target,s=i.getRootNode(),a=s.host;s===t&&i.forceFocusVisible?i.forceFocusVisible():a&&a.forceFocusVisible&&a.forceFocusVisible()}async manageFor(){if(!this.for)return;const e=this.getRootNode(),t=e.querySelector(`#${this.for}`);if(t){if(t.localName.search("-")>0&&await customElements.whenDefined(t.localName),void 0!==t.updateComplete&&await t.updateComplete,this.target=t.focusElement||t,this.target){this.target.getRootNode()===e?this.target.setAttribute("aria-labelledby",this.id):this.target.setAttribute("aria-label",this.labelText)}return Promise.resolve()}}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});if(!e.length)return"";return e.map((e=>(e.textContent||"").trim())).join(" ")}render(){return l`<label><slot @slotchange="${this.manageFor}"></slot>${this.required?l`<sp-icon-asterisk100 class="required-icon spectrum-UIIcon-Asterisk100"></sp-icon-asterisk100>`:l``}</label>`}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${P.instanceCount++}`),this.addEventListener("click",this.handleClick)}updated(e){super.updated(e),(e.has("for")||e.has("id"))&&this.manageFor()}}P.instanceCount=0,s([a({type:Boolean,reflect:!0})],P.prototype,"disabled",void 0),s([a({type:String})],P.prototype,"id",void 0),s([a({type:String})],P.prototype,"for",void 0),s([a({type:Boolean,reflect:!0})],P.prototype,"required",void 0),s([n("slot")],P.prototype,"slotEl",void 0),s([a({type:String,reflect:!0,attribute:"side-aligned"})],P.prototype,"sideAligned",void 0),customElements.define("sp-field-label",P);export{U as B,g as F,f as L,I as O,d as S,m as a,v as b,k as c,L as d,p as e,T as f,w as g,n as i,u as l,c as o,h as t};
//# sourceMappingURL=397247af.js.map
