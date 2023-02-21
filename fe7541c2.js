import{i as e}from"./d230bd74.js";import{L as t,O as s,i,b as r,a,S as o}from"./f4a2163c.js";import{y as l,e as c,S as n}from"./95f60e39.js";import"./be36498e.js";var h=e`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
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
)}
`,d=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=(e,t,s,i)=>{for(var r,a=i>1?void 0:i?u(t,s):t,o=e.length-1;o>=0;o--)(r=e[o])&&(a=(i?r(t,s,a):r(a))||a);return i&&a&&d(t,s,a),a};class m extends(t(s(r(a,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const e=[l`
                <span id="label" ?hidden=${!this.hasLabel}>
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `];return this.hasIcon&&e.unshift(l`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `),e}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let e=!1;if(this.anchorElement)this.anchorElement.click(),e=!0;else if("button"!==this.type){const t=document.createElement("button");t.type=this.type,this.insertAdjacentElement("afterend",t),t.click(),t.remove(),e=!0}return e}renderAnchor(){return l`
            ${this.buttonContent}
            ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}
        `}renderButton(){return l`
            ${this.buttonContent}
        `}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(e){const{code:t}=e;if("Space"===t)e.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;if("Space"===t)this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):((!this.hasAttribute("role")||"link"===this.getAttribute("role"))&&this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(e){super.updated(e),e.has("href")&&this.manageAnchor(),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}p([c({type:Boolean,reflect:!0})],m.prototype,"active",2),p([c({type:String})],m.prototype,"type",2),p([i(".anchor")],m.prototype,"anchorElement",2);var v=e`
:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentcolor;stroke:currentcolor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}
`;class b extends m{static get styles(){return[v]}}var g=e`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(
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
)}
`;var f=e`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}
`;function k(e,t,s){const i=e.getAttribute(t);let r=i?i.split(/\s+/):[];r=r.filter((e=>!s.find((t=>e===t)))),r.length?e.setAttribute(t,r.join(" ")):e.removeAttribute(t)}function x(e,t,s){const i=Array.isArray(s)?s:[s],r=e.getAttribute(t),a=r?r.split(/\s+/):[];return i.every((e=>a.indexOf(e)>-1))?()=>{}:(a.push(...i),e.setAttribute(t,a.join(" ")),()=>k(e,t,i))}const z=Symbol("element resolver updated");class y{constructor(e,{selector:t}={selector:""}){this._element=null,this._selector="",this.mutationCallback=e=>{let t=!1;e.forEach((e=>{if(!t){if("childList"===e.type){const s=this.element&&[...e.removedNodes].includes(this.element),i=!!this.selector&&[...e.addedNodes].some((e=>{var t;return null==(t=null==e?void 0:e.matches)?void 0:t.call(e,this.selector)}));t=t||s||i}if("attributes"===e.type){const s=e.target===this.element,i=!!this.selector&&e.target.matches(this.selector);t=t||s||i}}})),t&&this.resolveElement()},this.host=e,this.selector=t,this.observer=new MutationObserver(this.mutationCallback),this.host.addController(this)}get element(){return this._element}set element(e){if(e===this.element)return;const t=this.element;this._element=e,this.host.requestUpdate(z,t)}get selector(){return this._selector}set selector(e){e!==this.selector&&(this.releaseElement(),this._selector=e,this.resolveElement())}hostConnected(){this.resolveElement(),this.observer.observe(this.host.getRootNode(),{subtree:!0,childList:!0,attributes:!0})}hostDisconnected(){this.releaseElement(),this.observer.disconnect()}resolveElement(){if(!this.selector)return void this.releaseElement();const e=this.host.getRootNode();this.element=e.querySelector(this.selector)}releaseElement(){this.element=null}}var I=e`
:host{--spectrum-fieldlabel-color:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=s]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-100);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-small
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-small
)}:host([size=m]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-200);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-200);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=l]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-100);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-large
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-large
)}:host([size=xl]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-200);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-200);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-200);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-extra-large
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-extra-large
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;color:var(--spectrum-fieldlabel-color);display:block;font-size:var(
--mod-fieldlabel-font-size,var(--spectrum-fieldlabel-font-size)
);font-weight:var(
--mod-font-weight-regular,var(--spectrum-font-weight-regular)
);line-height:var(
--mod-fieldlabel-line-height,var(--spectrum-fieldlabel-line-height)
);padding-block:var(--spectrum-fieldlabel-top-to-text) var(--spectrum-fieldlabel-bottom-to-text);padding-inline:0;vertical-align:top}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-fieldlabel-line-height-cjk,var(--spectrum-fieldlabel-line-height-cjk)
)}.required-icon{margin-block:0;margin-inline:var(
--mod-field-label-text-to-asterisk,var(--spectrum-field-label-text-to-asterisk)
) 0}:host([side-aligned=start]){display:inline-block;padding-block:var(
--mod-fieldlabel-side-padding-top,var(--spectrum-fieldlabel-side-padding-top)
) 0;padding-inline:0 var(
--mod-fieldlabel-side-padding-right,var(--spectrum-fieldlabel-side-padding-right)
)}:host([side-aligned=start]) .required-icon{margin-block:var(
--mod-field-label-text-to-asterisk,var(--spectrum-field-label-text-to-asterisk)
) 0;margin-inline:var(
--mod-field-label-text-to-asterisk,var(--spectrum-field-label-text-to-asterisk)
) 0}:host([side-aligned=end]){display:inline-block;padding-block:var(
--mod-fieldlabel-side-padding-top,var(--spectrum-fieldlabel-side-padding-top)
) 0;padding-inline:0 var(
--mod-fieldlabel-side-padding-right,var(--spectrum-fieldlabel-side-padding-right)
);text-align:end}:host([disabled]){color:var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)}:host([disabled]) .required-icon{color:var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)}
`,E=Object.defineProperty,w=Object.getOwnPropertyDescriptor,A=(e,t,s,i)=>{for(var r,a=i>1?void 0:i?w(t,s):t,o=e.length-1;o>=0;o--)(r=e[o])&&(a=(i?r(t,s,a):r(a))||a);return i&&a&&E(t,s,a),a};const C=class extends(o(n)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1,this.resolvedElement=new y(this)}static get styles(){return[I,f]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),s=this.target,i=s.getRootNode(),r=i.host;i===t&&s.forceFocusVisible?s.forceFocusVisible():r&&r.forceFocusVisible&&r.forceFocusVisible()}addTarget(e){this.target=e.focusElement||e,this.target.getRootNode()===this.getRootNode()?x(this.target,"aria-labelledby",[this.id]):this.target.setAttribute("aria-label",this.labelText)}removeTarget(){this.target&&(this.target.getRootNode()===this.getRootNode()?k(this.target,"aria-labelledby",[this.id]):this.target.removeAttribute("aria-label"))}async manageTarget(){this.removeTarget();const e=this.resolvedElement.element;e?(e.localName.search("-")>0&&await customElements.whenDefined(e.localName),void 0!==e.updateComplete&&await e.updateComplete,this.addTarget(e)):this.target=e}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});return e.length?e.map((e=>(e.textContent||"").trim())).join(" "):""}render(){return l`
            <label>
                <slot></slot>
                ${this.required?l`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:l``}
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}willUpdate(e){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${C.instanceCount++}`),e.has("for")&&(this.resolvedElement.selector=this.for?`#${this.for}`:""),(e.has("id")||e.has(z))&&this.manageTarget()}};let U=C;U.instanceCount=0,A([c({type:Boolean,reflect:!0})],U.prototype,"disabled",2),A([c({type:String})],U.prototype,"id",2),A([c({type:String})],U.prototype,"for",2),A([c({type:Boolean,reflect:!0})],U.prototype,"required",2),A([i("slot")],U.prototype,"slotEl",2),A([c({type:String,reflect:!0,attribute:"side-aligned"})],U.prototype,"sideAligned",2),customElements.define("sp-field-label",U);export{m as B,g as I,b as S,x as c,h as u};
//# sourceMappingURL=fe7541c2.js.map
