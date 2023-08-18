import"./8b2965c7.js";import{L as e,O as t,t as o,S as r,i,a as n}from"./2b513fe4.js";import"./b41a9942.js";import{i as c}from"./67a87733.js";import{O as a,r as s}from"./1175a784.js";import{x as l,e as m,d as u}from"./395924ad.js";var h=c`
.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronDown75{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500,.spectrum-UIIcon-ChevronUp75{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(--spectrum-alias-ui-icon-chevron-size-75)}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronRight100,.spectrum-UIIcon-ChevronUp100{height:var(--spectrum-alias-ui-icon-chevron-size-100);width:var(--spectrum-alias-ui-icon-chevron-size-100)}.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronRight200,.spectrum-UIIcon-ChevronUp200{height:var(--spectrum-alias-ui-icon-chevron-size-200);width:var(--spectrum-alias-ui-icon-chevron-size-200)}.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronRight300,.spectrum-UIIcon-ChevronUp300{height:var(--spectrum-alias-ui-icon-chevron-size-300);width:var(--spectrum-alias-ui-icon-chevron-size-300)}.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronRight400,.spectrum-UIIcon-ChevronUp400{height:var(--spectrum-alias-ui-icon-chevron-size-400);width:var(--spectrum-alias-ui-icon-chevron-size-400)}.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronRight500,.spectrum-UIIcon-ChevronUp500{height:var(--spectrum-alias-ui-icon-chevron-size-500);width:var(--spectrum-alias-ui-icon-chevron-size-500)}
`;const d=async(e,t,o,r)=>{const{Overlay:i}=await import("./f3a1d0a5.js");return i.open(e,t,o,r)};class v extends Event{constructor({root:e}){super("sp-overlay-close",{bubbles:!0,composed:!0}),this.root=e}}var p=c`
::slotted([slot=icon]){fill:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-label-icon-color-default,var(--spectrum-menu-item-label-icon-color-default)
)
);color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-label-icon-color-default,var(--spectrum-menu-item-label-icon-color-default)
)
)}.checkmark{fill:var(
--highcontrast-menu-checkmark-icon-color-default,var(
--mod-menu-checkmark-icon-color-default,var(--spectrum-menu-checkmark-icon-color-default)
)
);align-self:center;color:var(
--highcontrast-menu-checkmark-icon-color-default,var(
--mod-menu-checkmark-icon-color-default,var(--spectrum-menu-checkmark-icon-color-default)
)
);display:var(
--mod-menu-checkmark-display,var(--spectrum-menu-checkmark-display)
);opacity:1}:host{align-items:center;background-color:var(
--highcontrast-menu-item-background-color-default,var(
--mod-menu-item-background-color-default,var(--spectrum-menu-item-background-color-default)
)
);box-sizing:border-box;cursor:pointer;line-height:var(
--mod-menu-item-label-line-height,var(--spectrum-menu-item-label-line-height)
);margin:0;min-block-size:var(
--mod-menu-item-min-height,var(--spectrum-menu-item-min-height)
);padding-block-end:var(
--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)
);padding-block-start:var(
--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)
);padding-inline:var(
--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content)
);position:relative;-webkit-text-decoration:none;text-decoration:none}:host{display:grid;grid-template:". chevronAreaCollapsible . iconArea sectionHeadingArea . . ." 1fr "selectedArea chevronAreaCollapsible checkmarkArea iconArea labelArea valueArea actionsArea chevronAreaDrillIn" ". . . . descriptionArea . . ." ". . . . submenuArea . . ."/auto auto auto auto 1fr auto auto auto}#label{grid-area:submenuItemLabelArea}::slotted([slot=value]){grid-area:submenuItemValueArea}:host(:focus),:host([focused]){background-color:var(
--highcontrast-menu-item-background-color-focus,var(
--mod-menu-item-background-color-key-focus,var(--spectrum-menu-item-background-color-key-focus)
)
);outline:none}:host(:focus)>#label,:host([focused])>#label{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-content-color-focus,var(--spectrum-menu-item-label-content-color-focus)
)
)}:host(:focus)>.spectrum-Menu-itemDescription,:host([focused])>.spectrum-Menu-itemDescription{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-description-color-focus,var(--spectrum-menu-item-description-color-focus)
)
)}:host(:focus)>::slotted([slot=value]),:host([focused])>::slotted([slot=value]){color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-value-color-focus,var(--spectrum-menu-item-value-color-focus)
)
)}:host(:focus)>.icon:not(.chevron,.checkmark),:host([focused])>.icon:not(.chevron,.checkmark){fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-focus,var(--spectrum-menu-item-label-icon-color-focus)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-focus,var(--spectrum-menu-item-label-icon-color-focus)
)
)}:host(:focus)>.chevron,:host([focused])>.chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
)}:host(:focus)>.checkmark,:host([focused])>.checkmark{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-focus,var(--spectrum-menu-checkmark-icon-color-focus)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-focus,var(--spectrum-menu-checkmark-icon-color-focus)
)
)}:host([focused]){box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}:host([dir=rtl]){--spectrum-menu-item-focus-indicator-direction-scalar:-1}:host(:hover){background-color:var(
--highcontrast-menu-item-background-color-focus,var(
--mod-menu-item-background-color-hover,var(--spectrum-menu-item-background-color-hover)
)
)}:host(:hover)>#label{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-content-color-hover,var(--spectrum-menu-item-label-content-color-hover)
)
)}:host(:hover)>.spectrum-Menu-itemDescription{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-description-color-hover,var(--spectrum-menu-item-description-color-hover)
)
)}:host(:hover)>::slotted([slot=value]){color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-value-color-hover,var(--spectrum-menu-item-value-color-hover)
)
)}:host(:hover)>.icon:not(.chevron,.checkmark){fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-hover,var(--spectrum-menu-item-label-icon-color-hover)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-hover,var(--spectrum-menu-item-label-icon-color-hover)
)
)}:host(:hover)>.chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
)}:host(:hover)>.checkmark{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-hover,var(--spectrum-menu-checkmark-icon-color-hover)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-hover,var(--spectrum-menu-checkmark-icon-color-hover)
)
)}:host:active{background-color:var(
--highcontrast-menu-item-background-color-focus,var(
--mod-menu-item-background-color-down,var(--spectrum-menu-item-background-color-down)
)
)}:host:active>#label{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-content-color-down,var(--spectrum-menu-item-label-content-color-down)
)
)}:host:active>.spectrum-Menu-itemDescription{color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-description-color-down,var(--spectrum-menu-item-description-color-down)
)
)}:host:active>::slotted([slot=value]){color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-value-color-down,var(--spectrum-menu-item-value-color-down)
)
)}:host:active>.icon:not(.chevron,.checkmark){fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-down,var(--spectrum-menu-item-label-icon-color-down)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-down,var(--spectrum-menu-item-label-icon-color-down)
)
)}:host:active>.chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-collapsible-icon-color,var(--spectrum-menu-collapsible-icon-color)
)
)}:host:active>.checkmark{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-down,var(--spectrum-menu-checkmark-icon-color-down)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-checkmark-icon-color-down,var(--spectrum-menu-checkmark-icon-color-down)
)
)}:host([aria-disabled=true]),:host([disabled]){background-color:#0000}:host([aria-disabled=true]) #label,:host([disabled]) #label{color:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-label-content-color-disabled,var(--spectrum-menu-item-label-content-color-disabled)
)
)}:host([aria-disabled=true]) .spectrum-Menu-itemDescription,:host([disabled]) .spectrum-Menu-itemDescription{color:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-description-color-disabled,var(--spectrum-menu-item-description-color-disabled)
)
)}:host([aria-disabled=true]) ::slotted([slot=icon]),:host([disabled]) ::slotted([slot=icon]){fill:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-label-icon-color-disabled,var(--spectrum-menu-item-label-icon-color-disabled)
)
);color:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-label-icon-color-disabled,var(--spectrum-menu-item-label-icon-color-disabled)
)
)}:host([aria-disabled=true]:hover),:host([disabled]:hover){cursor:default}:host([aria-disabled=true]:hover) ::slotted([slot=icon]),:host([disabled]:hover) ::slotted([slot=icon]){fill:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-label-icon-color-disabled,var(--spectrum-menu-item-label-icon-color-disabled)
)
);color:var(
--highcontrast-menu-item-color-disabled,var(
--mod-menu-item-label-icon-color-disabled,var(--spectrum-menu-item-label-icon-color-disabled)
)
)}::slotted([slot=icon]){align-self:start;grid-area:iconArea}.checkmark{align-self:start;grid-area:checkmarkArea}.menu-itemSelection{grid-area:selectedArea}#label{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-label-content-color-default,var(--spectrum-menu-item-label-content-color-default)
)
);font-size:var(
--mod-menu-item-label-font-size,var(--spectrum-menu-item-label-font-size)
);grid-area:labelArea}::slotted([slot=value]){grid-area:valueArea}.spectrum-Menu-itemActions{grid-area:actionsArea}.chevron{align-self:center;block-size:var(--spectrum-menu-item-checkmark-height);grid-area:chevronArea;height:var(--spectrum-menu-item-checkmark-height);inline-size:var(--spectrum-menu-item-checkmark-width);width:var(--spectrum-menu-item-checkmark-width)}.spectrum-Menu-item--collapsible .chevron{grid-area:chevronAreaCollapsible}.spectrum-Menu-itemDescription{grid-area:descriptionArea}:host([has-submenu]) .chevron{grid-area:chevronAreaDrillIn}.icon:not(.chevron,.checkmark){block-size:var(
--mod-menu-item-icon-height,var(--spectrum-menu-item-icon-height)
);inline-size:var(
--mod-menu-item-icon-width,var(--spectrum-menu-item-icon-width)
)}.checkmark{block-size:var(
--mod-menu-item-checkmark-height,var(--spectrum-menu-item-checkmark-height)
);inline-size:var(
--mod-menu-item-checkmark-width,var(--spectrum-menu-item-checkmark-width)
);margin-block-start:calc(var(
--mod-menu-item-top-to-checkmark,
var(--spectrum-menu-item-top-to-checkmark)
) - var(
--mod-menu-item-top-edge-to-text,
var(--spectrum-menu-item-top-edge-to-text)
));margin-inline-end:var(
--mod-menu-item-text-to-control,var(--spectrum-menu-item-text-to-control)
)}::slotted([slot=icon]){margin-inline-end:var(
--mod-menu-item-label-text-to-visual,var(--spectrum-menu-item-label-text-to-visual)
)}.chevron{margin-inline-end:var(
--mod-menu-item-text-to-control,var(--spectrum-menu-item-text-to-control)
)}.spectrum-Menu-itemDescription{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-description-color-default,var(--spectrum-menu-item-description-color-default)
)
);font-size:var(
--mod-menu-item-description-font-size,var(--spectrum-menu-item-description-font-size)
);line-height:var(
--mod-menu-item-description-line-height,var(--spectrum-menu-item-description-line-height)
);margin-block-start:var(
--mod-menu-item-label-to-description-spacing,var(--spectrum-menu-item-label-to-description-spacing)
)}#label,.spectrum-Menu-itemDescription{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word}::slotted([slot=value]){color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-value-color-default,var(--spectrum-menu-item-value-color-default)
)
);font-size:var(
--mod-menu-item-label-font-size,var(--spectrum-menu-item-label-font-size)
);justify-self:end;margin-inline-start:var(
--mod-menu-item-label-to-value-area-min-spacing,var(--spectrum-menu-item-label-to-value-area-min-spacing)
)}:host([no-wrap]) #label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.spectrum-Menu-item--collapsible.is-open{padding-block-end:0}.spectrum-Menu-item--collapsible.is-open .chevron{transform:rotate(90deg)}.spectrum-Menu-item--collapsible.is-open:active,.spectrum-Menu-item--collapsible.is-open:focus,.spectrum-Menu-item--collapsible.is-open:hover,:host([focused]) .spectrum-Menu-item--collapsible.is-open{background-color:var(
--highcontrast-menu-item-background-color-default,var(
--mod-menu-item-background-color-default,var(--spectrum-menu-item-background-color-default)
)
)}.spectrum-Menu-item--collapsible>::slotted([slot=icon]){padding-block-end:var(
--mod-menu-section-header-bottom-edge-to-text,var(
--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)
)
);padding-block-start:var(
--mod-menu-section-header-top-edge-to-text,var(
--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)
)
)}:host([dir=rtl]) .chevron{transform:rotate(-180deg)}:host([has-submenu]) .chevron{fill:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-drillin-icon-color-default,var(--spectrum-menu-drillin-icon-color-default)
)
);color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-drillin-icon-color-default,var(--spectrum-menu-drillin-icon-color-default)
)
);margin-inline-end:0;margin-inline-start:var(
--mod-menu-item-label-to-value-area-min-spacing,var(--spectrum-menu-item-label-to-value-area-min-spacing)
)}:host([has-submenu]) .is-open{--spectrum-menu-item-background-color-default:var(
--highcontrast-menu-item-selected-background-color,var(
--mod-menu-item-background-color-hover,var(--spectrum-menu-item-background-color-hover)
)
)}:host([has-submenu]) .is-open .icon:not(.chevron,.checkmark){fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-hover,var(--spectrum-menu-item-label-icon-color-hover)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-item-label-icon-color-hover,var(--spectrum-menu-item-label-icon-color-hover)
)
)}:host([has-submenu]) .is-open .chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-hover,var(--spectrum-menu-drillin-icon-color-hover)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-hover,var(--spectrum-menu-drillin-icon-color-hover)
)
)}:host([has-submenu]) .is-open .checkmark{fill:var(
--highcontrast-menu-checkmark-icon-color-default,var(
--mod-menu-checkmark-icon-color-hover,var(--spectrum-menu-checkmark-icon-color-hover)
)
);color:var(
--highcontrast-menu-checkmark-icon-color-default,var(
--mod-menu-checkmark-icon-color-hover,var(--spectrum-menu-checkmark-icon-color-hover)
)
)}:host([has-submenu]:hover) .chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-hover,var(--spectrum-menu-drillin-icon-color-hover)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-hover,var(--spectrum-menu-drillin-icon-color-hover)
)
)}:host([has-submenu]:focus) .chevron,:host([has-submenu][focused]) .chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-focus,var(--spectrum-menu-drillin-icon-color-focus)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-focus,var(--spectrum-menu-drillin-icon-color-focus)
)
)}:host([has-submenu]):active .chevron{fill:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-down,var(--spectrum-menu-drillin-icon-color-down)
)
);color:var(
--highcontrast-menu-item-color-focus,var(
--mod-menu-drillin-icon-color-down,var(--spectrum-menu-drillin-icon-color-down)
)
)}#label{flex:1 1 auto;-webkit-hyphens:auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}:host([disabled]){pointer-events:none}#button{inset:0;position:absolute}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}@media (forced-colors:active){:host{forced-color-adjust:none}}
`,b=Object.defineProperty,k=Object.getOwnPropertyDescriptor,f=(e,t,o,r)=>{for(var i,n=r>1?void 0:r?k(t,o):t,c=e.length-1;c>=0;c--)(i=e[c])&&(n=(r?i(t,o,n):i(n))||n);return r&&n&&b(t,o,n),n};class g extends Event{constructor(){super("sp-menu-item-removed",{bubbles:!0,composed:!0}),this.focused=!1}get item(){return this._item}reset(e){this._item=e}}class x extends Event{constructor(){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0})}set focusRoot(e){this.item.menuData.focusRoot=this.item.menuData.focusRoot||e}set selectionRoot(e){this.item.menuData.selectionRoot=this.item.menuData.selectionRoot||e}get item(){return this._item}set currentAncestorWithSelects(e){this._currentAncestorWithSelects=e}get currentAncestorWithSelects(){return this._currentAncestorWithSelects}reset(e){this._item=e,this._currentAncestorWithSelects=void 0,e.menuData={focusRoot:void 0,selectionRoot:void 0}}}let y=new x,w=new g,I=0;function C(){0===I&&(I=requestAnimationFrame((()=>{y=new x,I=0})))}let A=0;const U=class i extends(e(t(a(n,'[slot="icon"]')))){constructor(){super(),this.isInSubmenu=!1,this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.hasSubmenu=!1,this.noWrap=!1,this.open=!1,this.handleSubmenuChange=()=>{var e;null==(e=this.menuData.selectionRoot)||e.selectOrToggleItem(this)},this.handleSubmenuPointerenter=()=>{this.leaveTimeout&&(clearTimeout(this.leaveTimeout),delete this.leaveTimeout)},this.menuData={focusRoot:void 0,selectionRoot:void 0},this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0}),new o(this,{config:{characterData:!0,childList:!0,subtree:!0},callback:()=>{this.breakItemChildrenCache()}})}static get styles(){return[p,r,h]}get value(){return this._value||this.itemText}set value(e){e!==this._value&&(this._value=e||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return this.itemChildren.content.reduce(((e,t)=>e+(t.textContent||"").trim()),"")}get focusElement(){return this}get hasIcon(){return this.slotContentIsPresent}get itemChildren(){var e,t;if(this._itemChildren)return this._itemChildren;const o=null==(e=this.shadowRoot)?void 0:e.querySelector('slot[name="icon"]'),r=o?o.assignedElements().map((e=>{const t=e.cloneNode(!0);return t.removeAttribute("slot"),t.classList.toggle("icon"),t})):[],i=null==(t=this.shadowRoot)?void 0:t.querySelector("slot:not([name])"),n=i?i.assignedNodes().map((e=>e.cloneNode(!0))):[];return this._itemChildren={icon:r,content:n},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let e=!1;return this.anchorElement&&(this.anchorElement.click(),e=!0),e}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}render(){return l`
            ${this.selected?l`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 
                            icon 
                            checkmark
                            ${this.hasIcon?"checkmark--withAdjacentIcon":""}"
                      ></sp-icon-checkmark100>
                  `:l``}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):l``}

            <slot
                hidden
                name="submenu"
                @slotchange=${this.manageSubmenu}
            ></slot>
            ${this.hasSubmenu?l`
                      <sp-icon-chevron100
                          class="spectrum-UIIcon-ChevronRight100
                        chevron
                        icon"
                      ></sp-icon-chevron100>
                  `:l``}
        `}manageSubmenu(e){const t=e.target.assignedElements({flatten:!0});this.hasSubmenu=this.open||!!t,this.hasSubmenu&&this.setAttribute("aria-haspopup","true")}handleRemoveActive(e){"pointerleave"===e.type&&this.hasSubmenu||this.hasSubmenu||this.open||(this.active=!1)}handlePointerdown(){this.active=!0}firstUpdated(e){super.firstUpdated(e),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.hasAttribute("id")||(this.id="sp-menu-item-"+i.instanceCount++),this.addEventListener("pointerenter",this.closeOverlaysForRoot)}closeOverlaysForRoot(){if(this.open)return;const e=new v({root:this.menuData.focusRoot});this.dispatchEvent(e)}handleSubmenuClick(){this.openOverlay()}handlePointerenter(){if(this.leaveTimeout)return clearTimeout(this.leaveTimeout),void delete this.leaveTimeout;this.openOverlay()}handlePointerleave(){this.hasSubmenu&&this.open&&(this.leaveTimeout=setTimeout((()=>{delete this.leaveTimeout,this.closeOverlay&&this.closeOverlay()}),100))}async openOverlay(){if(!this.hasSubmenu||this.open||this.disabled)return;this.open=!0,this.active=!0,this.setAttribute("aria-expanded","true");const e=this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements()[0];e.addEventListener("pointerenter",this.handleSubmenuPointerenter),e.addEventListener("change",this.handleSubmenuChange),e.id||e.setAttribute("id",`${this.id}-submenu`),this.setAttribute("aria-controls",e.id);const t=document.createElement("sp-popover"),o=s([e],t,{position:"beforeend",prepareCallback:e=>{const t=e.slot;return e.tabIndex=0,e.removeAttribute("slot"),e.isSubmenu=!0,e=>{e.tabIndex=-1,e.slot=t,e.isSubmenu=!1}}}),r=d(this,"click",t,{placement:this.isLTR?"right-start":"left-start",receivesFocus:"auto",root:this.menuData.focusRoot}),i=async()=>{this.setAttribute("aria-expanded","false"),delete this.closeOverlay,(await r)()};this.closeOverlay=i;this.addEventListener("sp-closed",(e=>{e.stopPropagation(),delete this.closeOverlay,o(),this.open=!1,this.active=!1}),{once:!0}),t.addEventListener("change",i)}updateAriaSelected(){const e=this.getAttribute("role");"option"===e?this.setAttribute("aria-selected",this.selected?"true":"false"):("menuitemcheckbox"===e||"menuitemradio"===e)&&this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(e){this.setAttribute("role",e),this.updateAriaSelected()}updated(e){super.updated(e),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive)):(this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),e.has("selected")&&this.updateAriaSelected(),e.has("hasSubmenu")&&(this.hasSubmenu?(this.addEventListener("click",this.handleSubmenuClick),this.addEventListener("pointerenter",this.handlePointerenter),this.addEventListener("pointerleave",this.handlePointerleave)):this.closeOverlay||(this.removeEventListener("click",this.handleSubmenuClick),this.removeEventListener("pointerenter",this.handlePointerenter),this.removeEventListener("pointerleave",this.handlePointerleave)))}connectedCallback(){super.connectedCallback(),this.isInSubmenu=!!this.closest('[slot="submenu"]'),!this.isInSubmenu&&(y.reset(this),this.dispatchEvent(y),C(),this._parentElement=this.parentElement)}disconnectedCallback(){!this.isInSubmenu&&this._parentElement&&(w.reset(this),this._parentElement.dispatchEvent(w),0===A&&(A=requestAnimationFrame((()=>{w=new g,A=0})))),this.isInSubmenu=!1,this._itemChildren=void 0,super.disconnectedCallback()}async triggerUpdate(){this.isInSubmenu||(await new Promise((e=>requestAnimationFrame(e))),y.reset(this),this.dispatchEvent(y),C())}};U.instanceCount=0,f([m({type:Boolean,reflect:!0})],U.prototype,"active",2),f([m({type:Boolean,reflect:!0})],U.prototype,"focused",2),f([m({type:Boolean,reflect:!0})],U.prototype,"selected",2),f([m({type:String})],U.prototype,"value",1),f([m({type:Boolean,reflect:!0,attribute:"has-submenu"})],U.prototype,"hasSubmenu",2),f([m({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],U.prototype,"noWrap",2),f([i(".anchor")],U.prototype,"anchorElement",2),f([m({type:Boolean})],U.prototype,"open",2);let L=U;u("sp-menu-item",L);var E=c`
:host{--spectrum-link-animation-duration:var(--spectrum-animation-duration-100);--spectrum-link-text-color-primary-default:var(
--spectrum-accent-content-color-default
);--spectrum-link-text-color-primary-hover:var(
--spectrum-accent-content-color-hover
);--spectrum-link-text-color-primary-active:var(
--spectrum-accent-content-color-down
);--spectrum-link-text-color-primary-focus:var(
--spectrum-accent-content-color-key-focus
);--spectrum-link-text-color-secondary-default:var(
--spectrum-neutral-content-color-default
);--spectrum-link-text-color-secondary-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-link-text-color-secondary-active:var(
--spectrum-neutral-content-color-down
);--spectrum-link-text-color-secondary-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-link-text-color-white:var(--spectrum-white);--spectrum-link-text-color-black:var(--spectrum-black)}@media (forced-colors:active){:host{--highcontrast-link-text-color-primary-default:LinkText;--highcontrast-link-text-color-primary-hover:LinkText;--highcontrast-link-text-color-primary-active:LinkText;--highcontrast-link-text-color-primary-focus:LinkText;--highcontrast-link-text-color-secondary-default:LinkText;--highcontrast-link-text-color-secondary-hover:LinkText;--highcontrast-link-text-color-secondary-active:LinkText;--highcontrast-link-text-color-secondary-focus:LinkText;--highcontrast-link-text-color-white:LinkText;--highcontrast-link-text-color-black:LinkText}}a{-webkit-text-decoration-skip:objects;background-color:#0000;color:var(
--highcontrast-link-text-color-primary-default,var(
--mod-link-text-color-primary-default,var(--spectrum-link-text-color-primary-default)
)
);cursor:pointer;outline:none;-webkit-text-decoration:underline;text-decoration:underline;transition:color var(
--mod-link-animation-duration,var(--spectrum-link-animation-duration)
) ease-in-out}a:hover{color:var(
--highcontrast-link-text-color-primary-hover,var(
--mod-link-text-color-primary-hover,var(--spectrum-link-text-color-primary-hover)
)
)}a:active{color:var(
--highcontrast-link-text-color-primary-active,var(
--mod-link-text-color-primary-active,var(--spectrum-link-text-color-primary-active)
)
)}a.focus-visible{color:var(
--highcontrast-link-text-color-primary-focus,var(
--mod-link-text-color-primary-focus,var(--spectrum-link-text-color-primary-focus)
)
);-webkit-text-decoration:underline;text-decoration:underline;text-decoration-color:var(--highcontrast-link-focus-color,inherit);text-decoration-style:double}a:focus-visible{color:var(
--highcontrast-link-text-color-primary-focus,var(
--mod-link-text-color-primary-focus,var(--spectrum-link-text-color-primary-focus)
)
);-webkit-text-decoration:underline;text-decoration:underline;text-decoration-color:var(--highcontrast-link-focus-color,inherit);text-decoration-style:double}:host([variant=secondary]) a{color:var(
--highcontrast-link-text-color-secondary-default,var(
--mod-link-text-color-secondary-default,var(--spectrum-link-text-color-secondary-default)
)
)}:host([variant=secondary]) a:hover{color:var(
--highcontrast-link-text-color-secondary-hover,var(
--mod-link-text-color-secondary-hover,var(--spectrum-link-text-color-secondary-hover)
)
)}:host([variant=secondary]) a:active{color:var(
--highcontrast-link-text-color-secondary-active,var(
--mod-link-text-color-secondary-active,var(--spectrum-link-text-color-secondary-active)
)
)}:host([variant=secondary]) a:focus{color:var(
--highcontrast-link-text-color-secondary-focus,var(
--mod-link-text-color-secondary-focus,var(--spectrum-link-text-color-secondary-focus)
)
)}:host([quiet]) a{-webkit-text-decoration:none;text-decoration:none}:host([quiet]) a:hover{-webkit-text-decoration:underline;text-decoration:underline}:host([static=white]) a{color:var(
--highcontrast-link-text-color-white,var(--mod-link-text-color-white,var(--spectrum-link-text-color-white))
)}:host([static=white]) a:active,:host([static=white]) a:focus,:host([static=white]) a:hover{color:var(
--highcontrast-link-text-color-white,var(--mod-link-text-color-white,var(--spectrum-link-text-color-white))
)}:host([static=black]) a{color:var(
--highcontrast-link-text-color-black,var(--mod-link-text-color-black,var(--spectrum-link-text-color-black))
)}:host([static=black]) a:active,:host([static=black]) a:focus,:host([static=black]) a:hover{color:var(
--highcontrast-link-text-color-black,var(--mod-link-text-color-black,var(--spectrum-link-text-color-black))
)}:host{display:inline}:host(:focus){outline:none}:host([href]) a.focus-visible{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-style:double}:host([href]) a:focus-visible{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-style:double}
`,S=Object.defineProperty,D=Object.getOwnPropertyDescriptor,R=(e,t,o,r)=>{for(var i,n=r>1?void 0:r?D(t,o):t,c=e.length-1;c>=0;c--)(i=e[c])&&(n=(r?i(t,o,n):i(n))||n);return r&&n&&S(t,o,n),n};class z extends(e(n)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[E]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}R([i("#anchor")],z.prototype,"anchorElement",2),R([m({type:String,reflect:!0})],z.prototype,"variant",2),R([m({type:String,reflect:!0})],z.prototype,"static",2),R([m({type:Boolean,reflect:!0,attribute:"quiet"})],z.prototype,"quiet",2),u("sp-link",z);const T="(prefers-color-scheme: dark)",_="(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)";class M{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;null==(e=this.media)||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;null==(e=this.media)||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}}export{T as D,_ as I,M,L as a,h as b,d as o};
//# sourceMappingURL=e0dfa4eb.js.map
