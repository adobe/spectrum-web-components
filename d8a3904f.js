import{r as e}from"./e50c5e8d.js";import{L as t,O as i,b as s,a as r,i as a,S as l}from"./a07dea85.js";import{$ as o,e as n,S as c}from"./2310c663.js";import"./bfe4071e.js";const d={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},h=e=>(...t)=>({_$litDirective$:e,values:t});class p{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}var m=e`
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
`,u=Object.defineProperty,g=Object.getOwnPropertyDescriptor,v=(e,t,i,s)=>{for(var r,a=s>1?void 0:s?g(t,i):t,l=e.length-1;l>=0;l--)(r=e[l])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&u(t,i,a),a};class b extends(t(i(s(r,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const e=[o`
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageTextObservedSlot}
                    ></slot>
                </div>
            `];return this.hasIcon&&e.unshift(o`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `),e}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let e=!1;if(this.anchorElement)this.anchorElement.click(),e=!0;else if("button"!==this.type){const t=document.createElement("button");t.type=this.type,this.insertAdjacentElement("afterend",t),t.click(),t.remove(),e=!0}return e}renderAnchor(){return o`
            ${this.buttonContent}
            ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}
        `}renderButton(){return o`
            ${this.buttonContent}
        `}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):((!this.hasAttribute("role")||"link"===this.getAttribute("role"))&&this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(e){super.updated(e),e.has("href")&&this.manageAnchor(),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}v([n({type:Boolean,reflect:!0})],b.prototype,"active",2),v([n({type:String})],b.prototype,"type",2),v([a(".anchor")],b.prototype,"anchorElement",2);var f=e`
:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentcolor;stroke:currentcolor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}
`;class k extends b{static get styles(){return[f]}}var z=e`
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
`;var x=e`
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
`;var y=e`
:host([size=s]){--spectrum-fieldlabel-padding-top:var(
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
)}:host([side-aligned=start]) .required-icon{margin-top:0}
`,I=Object.defineProperty,w=Object.getOwnPropertyDescriptor,E=(e,t,i,s)=>{for(var r,a=s>1?void 0:s?w(t,i):t,l=e.length-1;l>=0;l--)(r=e[l])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&I(t,i,a),a};const A=class extends(l(c)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1}static get styles(){return[y,x]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),i=this.target,s=i.getRootNode(),r=s.host;s===t&&i.forceFocusVisible?i.forceFocusVisible():r&&r.forceFocusVisible&&r.forceFocusVisible()}async manageFor(){if(!this.for)return;const e=this.getRootNode(),t=e.querySelector(`#${this.for}`);return t?(t.localName.search("-")>0&&await customElements.whenDefined(t.localName),void 0!==t.updateComplete&&await t.updateComplete,this.target=t.focusElement||t,this.target&&(this.target.getRootNode()===e?this.target.setAttribute("aria-labelledby",this.id):this.target.setAttribute("aria-label",this.labelText)),Promise.resolve()):void 0}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});return e.length?e.map((e=>(e.textContent||"").trim())).join(" "):""}render(){return o`
            <label>
                <slot @slotchange=${this.manageFor}></slot>
                ${this.required?o`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:o``}
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}willUpdate(e){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${A.instanceCount++}`),(e.has("for")||e.has("id"))&&this.manageFor()}};let C=A;C.instanceCount=0,E([n({type:Boolean,reflect:!0})],C.prototype,"disabled",2),E([n({type:String})],C.prototype,"id",2),E([n({type:String})],C.prototype,"for",2),E([n({type:Boolean,reflect:!0})],C.prototype,"required",2),E([a("slot")],C.prototype,"slotEl",2),E([n({type:String,reflect:!0,attribute:"side-aligned"})],C.prototype,"sideAligned",2),customElements.define("sp-field-label",C);export{b as B,z as I,k as S,h as e,p as i,d as t,m as u};
//# sourceMappingURL=d8a3904f.js.map
