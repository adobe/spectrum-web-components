import"./cf8b94fb.js";import{R as t}from"./39665332.js";import{t as r}from"./754ff0e4.js";import{i as e}from"./112b2095.js";import{S as o}from"./492935df.js";import{x as a}from"./032a7dfd.js";import{n as i,S as s}from"./cb80e8ab.js";import{i as c}from"./17348440.js";import{d as n}from"./25a3ae37.js";import"./e834eb30.js";import"./db486c66.js";import{l as p}from"./9beeb9da.js";var u=e`
:host{--spectrum-actiongroup-button-spacing-reset:0;--spectrum-actiongroup-border-radius-reset:0;--spectrum-actiongroup-border-radius:var(--spectrum-corner-radius-100)}:host([size=s]),:host([size=xs]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-75
);--spectrum-actiongroup-vertical-spacing-regular:var(--spectrum-spacing-75)}:host,:host([size=l]),:host([size=xl]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-100
);--spectrum-actiongroup-vertical-spacing-regular:var(
--spectrum-spacing-100
)}:host{display:flex;flex-wrap:wrap;gap:var(
--mod-actiongroup-horizontal-spacing-regular,var(--spectrum-actiongroup-horizontal-spacing-regular)
)}::slotted(*){flex-shrink:0}::slotted(.focus-visible){z-index:3}::slotted(:focus-visible){z-index:3}:host(:not([vertical]):not([compact])) ::slotted(*){flex-shrink:0}:host([vertical]){display:inline-flex;flex-direction:column;gap:var(
--mod-actiongroup-vertical-spacing-regular,var(--spectrum-actiongroup-vertical-spacing-regular)
)}:host([compact]){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact]:not([quiet])){flex-wrap:nowrap}:host([compact]:not([quiet])) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
);position:relative;z-index:0}:host([compact]:not([quiet])) ::slotted(:first-child){--mod-actionbutton-focus-indicator-border-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px 0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])) ::slotted(:not(:first-child)){--mod-actionbutton-focus-indicator-border-radius:0px;margin-inline-end:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
);margin-inline-start:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
)}:host([compact]:not([quiet])) ::slotted(:last-child){--mod-actionbutton-focus-indicator-border-radius:0px var(
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
)}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}@media (hover:hover){:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([compact]:not([quiet])[vertical]){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact]:not([quiet])[vertical]) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
)}:host([compact]:not([quiet])[vertical]) ::slotted(:first-child){--mod-actionbutton-focus-indicator-border-radius:var(
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
)}:host([compact]:not([quiet])[vertical]) ::slotted(:not(:first-child)){margin-block-end:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-block-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])[vertical]) ::slotted(:last-child){--mod-actionbutton-focus-indicator-border-radius:0px 0px var(
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
`,d=Object.defineProperty,l=Object.getOwnPropertyDescriptor,m=(t,r,e,o)=>{for(var a,i=o>1?void 0:o?l(r,e):r,s=t.length-1;s>=0;s--)(a=t[s])&&(i=(o?a(r,e,i):a(i))||i);return o&&i&&d(r,e,i),i};const h=[];class b extends(o(s,{validSizes:["xs","s","m","l","xl"],noDefaultSize:!0})){constructor(){super(),this._buttons=[],this._buttonSelector="sp-action-button",this.rovingTabindexController=new t(this,{focusInIndex:t=>{let r=-1;const e=t.findIndex(((e,o)=>(!t[r]&&!e.disabled&&(r=o),e.selected&&!e.disabled)));return t[e]?e:r},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this._selected=h,this.hasManaged=!1,this.manageButtons=()=>{const t=this.slotElement.assignedElements({flatten:!0}).reduce(((t,r)=>{if(r.matches(this._buttonSelector))t.push(r);else{const e=Array.from(r.querySelectorAll(`:scope > ${this._buttonSelector}`));t.push(...e)}return t}),[]);if(this.buttons=t,this.selects||!this.hasManaged){const t=[];this.buttons.forEach((r=>{r.selected&&t.push(r.value)})),this.setSelected(this.selected.concat(t))}this.manageChildren(),this.manageSelects(),this.hasManaged=!0},new r(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons()},skipInitial:!0})}static get styles(){return[u]}set buttons(t){t!==this.buttons&&(this._buttons=t,this.rovingTabindexController.clearElementCache())}get buttons(){return this._buttons}set selected(t){this.requestUpdate("selected",this._selected),this._selected=t,this.updateComplete.then((()=>{this.applySelects(),this.manageChildren()}))}get selected(){return this._selected}dispatchChange(t){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(t),this.buttons.map((t=>{t.selected=this.selected.includes(t.value)})))}setSelected(t,r){if(t===this.selected)return;const e=this.selected;this.requestUpdate("selected",e),this._selected=t,r&&this.dispatchChange(e)}focus(t){this.rovingTabindexController.focus(t)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute(this.selects?"aria-checked":"aria-pressed","false")}))}handleActionButtonChange(t){t.stopPropagation(),t.preventDefault()}handleClick(t){const r=t.target;if(void 0!==r.value)switch(this.selects){case"single":this.deselectSelectedButtons(),r.selected=!0,r.tabIndex=0,r.setAttribute("aria-checked","true"),this.setSelected([r.value],!0);break;case"multiple":{const t=[...this.selected];r.selected=!r.selected,r.setAttribute("aria-checked",r.selected?"true":"false"),r.selected?t.push(r.value):t.splice(this.selected.indexOf(r.value),1),this.setSelected(t,!0),this.buttons.forEach((t=>{t.tabIndex=-1})),r.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0)}async manageSelects(t){if(!this.buttons.length)return;const r=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const e=[],o=r.map((async t=>{await t.updateComplete,t.setAttribute("role","radio"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&e.push(t)}));if(t)break;await Promise.all(o);const a=e.map((t=>t.value));this.setSelected(a||h);break}case"multiple":{"radiogroup"===this.getAttribute("role")&&this.removeAttribute("role");const e=[],o=[],a=r.map((async t=>{await t.updateComplete,t.setAttribute("role","checkbox"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&(e.push(t.value),o.push(t))}));if(t)break;await Promise.all(a);const i=e.length?e:h;this.setSelected(i);break}default:if(!this.selected.length){this.buttons.forEach((t=>{t.setAttribute("role","button")}));break}{const e=[],o=r.map((async t=>{await t.updateComplete,t.setAttribute("role","button"),t.selected?(t.setAttribute("aria-pressed","true"),e.push(t)):t.removeAttribute("aria-pressed")}));if(t)break;await Promise.all(o),this.setSelected(e.map((t=>t.value)))}}this.hasAttribute("role")||this.setAttribute("role","toolbar")}render(){return a`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}updated(t){super.updated(t),t.has("selects")&&(this.manageSelects(),this.manageChildren(),this.selects?this.shadowRoot.addEventListener("change",this.handleActionButtonChange):this.shadowRoot.removeEventListener("change",this.handleActionButtonChange)),(t.has("quiet")||t.has("emphasized")||t.has("size")||t.has("static"))&&this.manageChildren(t),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(t){this.buttons.forEach((r=>{(this.quiet||null!=t&&t.get("quiet"))&&(r.quiet=this.quiet),(this.emphasized||null!=t&&t.get("emphasized"))&&(r.emphasized=this.emphasized),(this.static||null!=t&&t.get("static"))&&(r.static=this.static),(this.selects||!this.hasManaged)&&(r.selected=this.selected.includes(r.value)),this.size&&("m"!==this.size||void 0!==(null==t?void 0:t.get("size")))&&(r.size=this.size)}))}}m([i({type:Boolean,reflect:!0})],b.prototype,"compact",2),m([i({type:Boolean,reflect:!0})],b.prototype,"emphasized",2),m([i({type:Boolean,reflect:!0})],b.prototype,"justified",2),m([i({type:String})],b.prototype,"label",2),m([i({type:Boolean,reflect:!0})],b.prototype,"quiet",2),m([i({type:String})],b.prototype,"selects",2),m([i({reflect:!0})],b.prototype,"static",2),m([i({type:Boolean,reflect:!0})],b.prototype,"vertical",2),m([i({type:Array})],b.prototype,"selected",1),m([c("slot")],b.prototype,"slotElement",2),n("sp-action-group",b);var g=e`
:host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(
--spectrum-line-height-100
);--spectrum-actionbar-item-counter-color:var(
--spectrum-neutral-content-color-default
);--spectrum-actionbar-popover-background-color:var(--spectrum-gray-50);--spectrum-actionbar-popover-border-color:var(--spectrum-gray-400);--spectrum-actionbar-emphasized-background-color:var(
--spectrum-informative-background-color-default
);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(
--spectrum-spacing-100
);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(
--spectrum-action-bar-top-to-item-counter
);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(
--spectrum-cjk-line-height-100
)}@media (forced-colors:active){:host{--highcontrast-actionbar-popover-border-color:CanvasText}:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{block-size:0;box-sizing:border-box;inset-block-end:0;opacity:0;padding:0 var(
--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)
);pointer-events:none;z-index:1}:host([open]){block-size:calc(var(
--mod-actionbar-spacing-outer-edge,
var(--spectrum-actionbar-spacing-outer-edge)
) + var(--mod-actionbar-height, var(--spectrum-actionbar-height)));opacity:1}#popover{background-color:var(
--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color)
);block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));border-color:var(
--highcontrast-actionbar-popover-border-color,var(
--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)
)
);border-radius:var(
--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius)
);box-sizing:border-box;display:flex;filter:drop-shadow(var(
--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal)
) var(
--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical)
) var(
--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur)
) var(
--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)
));flex-direction:row;inline-size:100%;margin:auto;padding-block:0;pointer-events:auto;position:relative}.close-button{flex-shrink:0;margin-block-start:var(
--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top)
);margin-inline-end:var(
--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end)
);margin-inline-start:var(
--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start)
)}.field-label{color:var(
--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color)
);font-size:var(
--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size)
);line-height:var(
--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height)
);margin-block-start:var(
--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top)
);margin-inline-end:var(
--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end)
);padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(
--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk)
)}.action-group{margin-block-start:var(
--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top)
);margin-inline-end:var(
--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end)
);margin-inline-start:auto}:host([emphasized]) #popover{background-color:var(
--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color)
);border-color:#0000;filter:none}:host([emphasized]) .field-label{color:var(
--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color)
)}:host([variant=sticky]){inset-inline:0;position:sticky}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{display:block}:host([flexible]){display:inline-block}
`,v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,z=(t,r,e,o)=>{for(var a,i=o>1?void 0:o?f(r,e):r,s=t.length-1;s>=0;s--)(a=t[s])&&(i=(o?a(r,e,i):a(i))||i);return o&&i&&v(r,e,i),i};const x=["sticky","fixed"];class y extends s{constructor(){super(...arguments),this.emphasized=!1,this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[g]}set variant(t){if(t!==this.variant){if(x.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return a`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static=${p(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static=${p(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}z([i({type:Boolean,reflect:!0})],y.prototype,"emphasized",2),z([i({type:Boolean,reflect:!0})],y.prototype,"flexible",2),z([i({type:Boolean,reflect:!0})],y.prototype,"open",2),z([i({type:String})],y.prototype,"variant",1),n("sp-action-bar",y);
//# sourceMappingURL=2c23cb4e.js.map