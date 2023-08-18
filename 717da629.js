import"./a7192b52.js";import{i as e}from"./67a87733.js";import{c as t,a as s}from"./a010124b.js";import{S as i}from"./549963e9.js";import{x as l,e as r,S as o,d as a}from"./395924ad.js";import{i as n}from"./2b513fe4.js";var d=e`
.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(--spectrum-alias-ui-icon-asterisk-size-200)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(--spectrum-alias-ui-icon-asterisk-size-300)}
`;const c=Symbol("element resolver updated");class p{constructor(e,{selector:t}={selector:""}){this._element=null,this._selector="",this.mutationCallback=e=>{let t=!1;e.forEach((e=>{if(!t){if("childList"===e.type){const s=this.element&&[...e.removedNodes].includes(this.element),i=!!this.selector&&[...e.addedNodes].some((e=>{var t;return null==(t=null==e?void 0:e.matches)?void 0:t.call(e,this.selector)}));t=t||s||i}if("attributes"===e.type){const s=e.target===this.element,i=!!this.selector&&e.target.matches(this.selector);t=t||s||i}}})),t&&this.resolveElement()},this.host=e,this.selector=t,this.observer=new MutationObserver(this.mutationCallback),this.host.addController(this)}get element(){return this._element}set element(e){if(e===this.element)return;const t=this.element;this._element=e,this.host.requestUpdate(c,t)}get selector(){return this._selector}set selector(e){e!==this.selector&&(this.releaseElement(),this._selector=e,this.resolveElement())}hostConnected(){this.resolveElement(),this.observer.observe(this.host.getRootNode(),{subtree:!0,childList:!0,attributes:!0})}hostDisconnected(){this.releaseElement(),this.observer.disconnect()}resolveElement(){if(!this.selector)return void this.releaseElement();const e=this.host.getRootNode();this.element=e.querySelector(this.selector)}releaseElement(){this.element=null}}var m=e`
:host{--spectrum-fieldlabel-min-height:var(--spectrum-component-height-75);--spectrum-fieldlabel-color:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
);--spectrum-fieldlabel-font-weight:var(--spectrum-regular-font-weight);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-cjk-line-height-100)}:host([size=s]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-75);--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-100);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-small
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-small
)}:host([size=m]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-75);--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=l]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-100);--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-100);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-large
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-large
)}:host([size=xl]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-200);--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-200);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-extra-large
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-extra-large
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;color:var(--spectrum-fieldlabel-color);display:block;font-size:var(
--mod-fieldlabel-font-size,var(--spectrum-fieldlabel-font-size)
);font-weight:var(
--mod-fieldlabel-font-weight,var(--spectrum-fieldlabel-font-weight)
);line-height:var(
--mod-fieldlabel-line-height,var(--spectrum-fieldlabel-line-height)
);min-block-size:var(
--mod-fieldlabel-min-height,var(--spectrum-fieldlabel-min-height)
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
--highcontrast-disabled-content-color,var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)
)}:host([disabled]) .required-icon{color:var(
--highcontrast-disabled-content-color,var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)
)}@media (forced-colors:active){:host{--highcontrast-disabled-content-color:GrayText}}
`,h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,b=(e,t,s,i)=>{for(var l,r=i>1?void 0:i?u(t,s):t,o=e.length-1;o>=0;o--)(l=e[o])&&(r=(i?l(t,s,r):l(r))||r);return i&&r&&h(t,s,r),r};const f=class e extends(i(o)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1,this.resolvedElement=new p(this)}static get styles(){return[m,d]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),s=this.target,i=s.getRootNode(),l=i.host;i===t&&s.forceFocusVisible?s.forceFocusVisible():l&&l.forceFocusVisible&&l.forceFocusVisible()}applyTargetLabel(e){if(this.target=e||this.target,this.target){const i=this.target.applyFocusElementLabel,l=this.target.focusElement||this.target,r=l.getRootNode();void 0!==i?i(this.labelText):r===this.getRootNode()?(e?t:s)(l,"aria-labelledby",[this.id]):e?l.setAttribute("aria-label",this.labelText):l.removeAttribute("aria-label")}}async manageTarget(){this.applyTargetLabel();const e=this.resolvedElement.element;e?(e.localName.search("-")>0&&await customElements.whenDefined(e.localName),void 0!==e.updateComplete&&await e.updateComplete,this.applyTargetLabel(e)):this.target=e}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});return e.length?e.map((e=>(e.textContent||"").trim())).join(" "):""}render(){return l`
            <label>
                <slot></slot>
                ${this.required?l`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:l``}
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}willUpdate(t){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${e.instanceCount++}`),t.has("for")&&(this.resolvedElement.selector=this.for?`#${this.for}`:""),(t.has("id")||t.has(c))&&this.manageTarget()}};f.instanceCount=0,b([r({type:Boolean,reflect:!0})],f.prototype,"disabled",2),b([r({type:String})],f.prototype,"id",2),b([r({type:String})],f.prototype,"for",2),b([r({type:Boolean,reflect:!0})],f.prototype,"required",2),b([n("slot")],f.prototype,"slotEl",2),b([r({type:String,reflect:!0,attribute:"side-aligned"})],f.prototype,"sideAligned",2),a("sp-field-label",f);
//# sourceMappingURL=717da629.js.map
