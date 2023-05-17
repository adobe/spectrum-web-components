import"./70f654d0.js";import{i as e}from"./67a87733.js";import{c as t,a as s}from"./bdc657fb.js";import{S as i,i as l}from"./0c1af6fc.js";import{x as r,e as a,S as o,d}from"./cd228091.js";var n=e`
.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(--spectrum-alias-ui-icon-asterisk-size-200)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(--spectrum-alias-ui-icon-asterisk-size-300)}
`;const c=Symbol("element resolver updated");class p{constructor(e,{selector:t}={selector:""}){this._element=null,this._selector="",this.mutationCallback=e=>{let t=!1;e.forEach((e=>{if(!t){if("childList"===e.type){const s=this.element&&[...e.removedNodes].includes(this.element),i=!!this.selector&&[...e.addedNodes].some((e=>{var t;return null==(t=null==e?void 0:e.matches)?void 0:t.call(e,this.selector)}));t=t||s||i}if("attributes"===e.type){const s=e.target===this.element,i=!!this.selector&&e.target.matches(this.selector);t=t||s||i}}})),t&&this.resolveElement()},this.host=e,this.selector=t,this.observer=new MutationObserver(this.mutationCallback),this.host.addController(this)}get element(){return this._element}set element(e){if(e===this.element)return;const t=this.element;this._element=e,this.host.requestUpdate(c,t)}get selector(){return this._selector}set selector(e){e!==this.selector&&(this.releaseElement(),this._selector=e,this.resolveElement())}hostConnected(){this.resolveElement(),this.observer.observe(this.host.getRootNode(),{subtree:!0,childList:!0,attributes:!0})}hostDisconnected(){this.releaseElement(),this.observer.disconnect()}resolveElement(){if(!this.selector)return void this.releaseElement();const e=this.host.getRootNode();this.element=e.querySelector(this.selector)}releaseElement(){this.element=null}}var m=e`
:host{--spectrum-fieldlabel-color:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=s]){--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-100);--spectrum-field-label-top-to-asterisk:var(
--spectrum-field-label-top-to-asterisk-small
);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-small
)}:host([size=m]){--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
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
`,h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,b=(e,t,s,i)=>{for(var l,r=i>1?void 0:i?u(t,s):t,a=e.length-1;a>=0;a--)(l=e[a])&&(r=(i?l(t,s,r):l(r))||r);return i&&r&&h(t,s,r),r};const g=class extends(i(o)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1,this.resolvedElement=new p(this)}static get styles(){return[m,n]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),s=this.target,i=s.getRootNode(),l=i.host;i===t&&s.forceFocusVisible?s.forceFocusVisible():l&&l.forceFocusVisible&&l.forceFocusVisible()}addTarget(e){this.target=e.focusElement||e,this.target.getRootNode()===this.getRootNode()?t(this.target,"aria-labelledby",[this.id]):this.target.setAttribute("aria-label",this.labelText)}removeTarget(){this.target&&(this.target.getRootNode()===this.getRootNode()?s(this.target,"aria-labelledby",[this.id]):this.target.removeAttribute("aria-label"))}async manageTarget(){this.removeTarget();const e=this.resolvedElement.element;e?(e.localName.search("-")>0&&await customElements.whenDefined(e.localName),void 0!==e.updateComplete&&await e.updateComplete,this.addTarget(e)):this.target=e}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});return e.length?e.map((e=>(e.textContent||"").trim())).join(" "):""}render(){return r`
            <label>
                <slot></slot>
                ${this.required?r`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:r``}
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}willUpdate(e){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${g.instanceCount++}`),e.has("for")&&(this.resolvedElement.selector=this.for?`#${this.for}`:""),(e.has("id")||e.has(c))&&this.manageTarget()}};let f=g;f.instanceCount=0,b([a({type:Boolean,reflect:!0})],f.prototype,"disabled",2),b([a({type:String})],f.prototype,"id",2),b([a({type:String})],f.prototype,"for",2),b([a({type:Boolean,reflect:!0})],f.prototype,"required",2),b([l("slot")],f.prototype,"slotEl",2),b([a({type:String,reflect:!0,attribute:"side-aligned"})],f.prototype,"sideAligned",2),d("sp-field-label",f);
//# sourceMappingURL=058a3b75.js.map
