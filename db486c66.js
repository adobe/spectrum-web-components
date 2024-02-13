import"./8476ec21.js";import{i as e}from"./112b2095.js";import{c as t,a as i}from"./bdc657fb.js";import{E as s,e as l}from"./d11544d8.js";import{S as o}from"./492935df.js";import{x as r,A as a}from"./032a7dfd.js";import{n as c,S as n}from"./cb80e8ab.js";import{i as d}from"./17348440.js";import{d as p}from"./25a3ae37.js";var m=e`
.spectrum-UIIcon-Asterisk75{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-75)}.spectrum-UIIcon-Asterisk100{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-100)}.spectrum-UIIcon-Asterisk200{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-200)}.spectrum-UIIcon-Asterisk300{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-300)}
`;var u=e`
:host{--spectrum-fieldlabel-color:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-fieldlabel-font-weight:var(--spectrum-regular-font-weight);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-cjk-line-height-100)}:host([size=s]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-75);--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-100);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-small
)}:host{--spectrum-fieldlabel-min-height:var(--spectrum-component-height-75);--spectrum-fieldlabel-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=l]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-100);--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-100);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-large
)}:host([size=xl]){--spectrum-fieldlabel-min-height:var(--spectrum-component-height-200);--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-200);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-extra-large
)}:host{box-sizing:border-box;font-size:var(
--mod-fieldlabel-font-size,var(--spectrum-fieldlabel-font-size)
);font-weight:var(
--mod-fieldlabel-font-weight,var(--spectrum-fieldlabel-font-weight)
);line-height:var(
--mod-fieldlabel-line-height,var(--spectrum-fieldlabel-line-height)
);min-block-size:var(
--mod-fieldlabel-min-height,var(--spectrum-fieldlabel-min-height)
);padding-block:var(
--mod-field-label-top-to-text,var(--spectrum-fieldlabel-top-to-text)
) var(
--mod-field-label-bottom-to-text,var(--spectrum-fieldlabel-bottom-to-text)
);-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;color:var(--spectrum-fieldlabel-color);display:block;padding-inline:0}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-fieldlabel-line-height-cjk,var(--spectrum-fieldlabel-line-height-cjk)
)}.required-icon{margin-block:0;margin-inline:var(
--mod-field-label-text-to-asterisk,var(--spectrum-field-label-text-to-asterisk)
) 0;vertical-align:var(--mod-field-label-asterisk-vertical-align,baseline)}:host([side-aligned=end]),:host([side-aligned=start]){display:inline-block;padding-block:var(
--mod-fieldlabel-side-padding-top,var(--spectrum-fieldlabel-side-padding-top)
) 0;padding-inline:0 var(
--mod-fieldlabel-side-padding-right,var(--spectrum-fieldlabel-side-padding-right)
);vertical-align:top}:host([side-aligned=end]){text-align:end}:host([disabled]){color:var(
--highcontrast-disabled-content-color,var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)
)}:host([disabled]) .required-icon{color:var(
--highcontrast-disabled-content-color,var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)
)}@media (forced-colors:active){:host{--highcontrast-disabled-content-color:GrayText}}label{display:inline-block}
`,h=Object.defineProperty,b=Object.getOwnPropertyDescriptor,f=(e,t,i,s)=>{for(var l,o=s>1?void 0:s?b(t,i):t,r=e.length-1;r>=0;r--)(l=e[r])&&(o=(s?l(t,i,o):l(o))||o);return s&&o&&h(t,i,o),o};const g=class e extends(o(n,{noDefaultSize:!0})){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1,this.resolvedElement=new s(this)}static get styles(){return[u,m]}handleClick(e){if(!this.target||this.disabled||e.defaultPrevented)return;this.target.focus();const t=this.getRootNode(),i=this.target,s=i.getRootNode(),l=s.host;s===t&&i.forceFocusVisible?i.forceFocusVisible():l&&l.forceFocusVisible&&l.forceFocusVisible()}applyTargetLabel(e){if(this.target=e||this.target,this.target){const s=this.target.applyFocusElementLabel,l=this.target.focusElement||this.target,o=l.getRootNode();void 0!==s?s(this.labelText):o===this.getRootNode()?(e?t:i)(l,"aria-labelledby",[this.id]):e?l.setAttribute("aria-label",this.labelText):l.removeAttribute("aria-label")}}async manageTarget(){this.applyTargetLabel();const e=this.resolvedElement.element;e?(e.localName.search("-")>0&&await customElements.whenDefined(e.localName),void 0!==e.updateComplete&&await e.updateComplete,this.applyTargetLabel(e)):this.target=e}get labelText(){const e=this.slotEl.assignedNodes({flatten:!0});return e.length?e.map((e=>(e.textContent||"").trim())).join(" "):""}render(){return r`
            <label>
                <slot></slot>
                ${this.required?r`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:a}
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}willUpdate(t){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${e.instanceCount++}`),t.has("for")&&(this.resolvedElement.selector=this.for?`#${this.for}`:""),(t.has("id")||t.has(l))&&this.manageTarget()}};g.instanceCount=0,f([c({type:Boolean,reflect:!0})],g.prototype,"disabled",2),f([c({type:String})],g.prototype,"id",2),f([c({type:String})],g.prototype,"for",2),f([c({type:Boolean,reflect:!0})],g.prototype,"required",2),f([d("slot")],g.prototype,"slotEl",2),f([c({type:String,reflect:!0,attribute:"side-aligned"})],g.prototype,"sideAligned",2),p("sp-field-label",g);
//# sourceMappingURL=db486c66.js.map
