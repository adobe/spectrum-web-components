import"./fb42b368.js";import{L as e,O as t,t as o,i as r,a as n}from"./92bf7466.js";import"./b7f408b9.js";import{i}from"./112b2095.js";import{S as c}from"./9ddc847e.js";import{O as a}from"./4e68ac05.js";import{x as s,n as l,d as m}from"./bd0a9f1e.js";var u=i`
.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronDown75{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500,.spectrum-UIIcon-ChevronUp75{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(--spectrum-alias-ui-icon-chevron-size-75)}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronRight100,.spectrum-UIIcon-ChevronUp100{height:var(--spectrum-alias-ui-icon-chevron-size-100);width:var(--spectrum-alias-ui-icon-chevron-size-100)}.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronRight200,.spectrum-UIIcon-ChevronUp200{height:var(--spectrum-alias-ui-icon-chevron-size-200);width:var(--spectrum-alias-ui-icon-chevron-size-200)}.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronRight300,.spectrum-UIIcon-ChevronUp300{height:var(--spectrum-alias-ui-icon-chevron-size-300);width:var(--spectrum-alias-ui-icon-chevron-size-300)}.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronRight400,.spectrum-UIIcon-ChevronUp400{height:var(--spectrum-alias-ui-icon-chevron-size-400);width:var(--spectrum-alias-ui-icon-chevron-size-400)}.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronRight500,.spectrum-UIIcon-ChevronUp500{height:var(--spectrum-alias-ui-icon-chevron-size-500);width:var(--spectrum-alias-ui-icon-chevron-size-500)}
`;var h=i`
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
)}#label{flex:1 1 auto;-webkit-hyphens:auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}:host([disabled]){pointer-events:none}#button{inset:0;position:absolute}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}@media (forced-colors:active){:host{forced-color-adjust:none}}::slotted([slot=submenu]){max-width:100%;width:max-content}
`,d=Object.defineProperty,v=Object.getOwnPropertyDescriptor,p=(e,t,o,r)=>{for(var n,i=r>1?void 0:r?v(t,o):t,c=e.length-1;c>=0;c--)(n=e[c])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&d(t,o,i),i};class b extends Event{constructor(e){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0}),this.menuCascade=new WeakMap,this.clear(e)}clear(e){this._item=e,this.currentAncestorWithSelects=void 0,e.menuData={cleanupSteps:[],focusRoot:void 0,selectionRoot:void 0,parentMenu:void 0},this.menuCascade=new WeakMap}get item(){return this._item}}class f extends(e(t(a(n,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.hasSubmenu=!1,this.noWrap=!1,this.open=!1,this.proxyFocus=()=>{this.focus()},this.handleBeforetoggle=e=>{"closed"===e.newState&&(this.open=!0,this.overlayElement.manuallyKeepOpen(),this.overlayElement.removeEventListener("beforetoggle",this.handleBeforetoggle))},this.recentlyLeftChild=!1,this.willDispatchUpdate=!1,this.menuData={focusRoot:void 0,parentMenu:void 0,selectionRoot:void 0,cleanupSteps:[]},this.addEventListener("click",this.handleClickCapture,{capture:!0}),new o(this,{config:{characterData:!0,childList:!0,subtree:!0},callback:()=>{this.breakItemChildrenCache()}})}static get styles(){return[h,c,u]}get value(){return this._value||this.itemText}set value(e){e!==this._value&&(this._value=e||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return this.itemChildren.content.reduce(((e,t)=>e+(t.textContent||"").trim()),"")}get focusElement(){return this}get hasIcon(){return this.slotContentIsPresent}get itemChildren(){if(this._itemChildren)return this._itemChildren;const e=this.iconSlot.assignedElements().map((e=>{const t=e.cloneNode(!0);return t.removeAttribute("slot"),t.classList.toggle("icon"),t})),t=this.contentSlot.assignedNodes().map((e=>e.cloneNode(!0)));return this._itemChildren={icon:e,content:t},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}shouldProxyClick(){let e=!1;return this.anchorElement&&(this.anchorElement.click(),e=!0),e}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}renderSubmenu(){const e=s`
            <slot
                name="submenu"
                @slotchange=${this.manageSubmenu}
                @sp-menu-item-added-or-updated=${{handleEvent:e=>{e.clear(e.item)},capture:!0}}
                @focusin=${e=>e.stopPropagation()}
            ></slot>
        `;return this.hasSubmenu?(import("./187b5bba.js").then((function(e){return e.s})),import("./9c437bb8.js"),s`
            <sp-overlay
                .triggerElement=${this}
                ?disabled=${!this.hasSubmenu}
                ?open=${this.hasSubmenu&&this.open}
                .placement=${this.isLTR?"right-start":"left-start"}
                .offset=${[-10,-4]}
                .type=${"auto"}
                @close=${e=>e.stopPropagation()}
            >
                <sp-popover
                    @change=${e=>{this.handleSubmenuChange(e),this.open=!1}}
                    @pointerenter=${this.handleSubmenuPointerenter}
                    @pointerleave=${this.handleSubmenuPointerleave}
                    @sp-menu-item-added-or-updated=${e=>e.stopPropagation()}
                >
                    ${e}
                </sp-popover>
            </sp-overlay>
            <sp-icon-chevron100
                class="spectrum-UIIcon-ChevronRight100 chevron icon"
            ></sp-icon-chevron100>
        `):e}render(){return s`
            ${this.selected?s`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 
                            icon 
                            checkmark
                            ${this.hasIcon?"checkmark--withAdjacentIcon":""}"
                      ></sp-icon-checkmark100>
                  `:s``}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):s``}
            ${this.renderSubmenu()}
        `}manageSubmenu(e){const t=e.target.assignedElements({flatten:!0});this.hasSubmenu=!!t.length,this.hasSubmenu&&this.setAttribute("aria-haspopup","true")}handleRemoveActive(){this.open||(this.active=!1)}handlePointerdown(e){this.active=!0,e.target===this&&this.hasSubmenu&&this.open&&(this.addEventListener("focus",this.handleSubmenuFocus,{once:!0}),this.overlayElement.addEventListener("beforetoggle",this.handleBeforetoggle))}firstUpdated(e){super.firstUpdated(e),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerenter",this.closeOverlaysForRoot),this.hasAttribute("id")||(this.id=`sp-menu-item-${crypto.randomUUID().slice(0,8)}`)}closeOverlaysForRoot(){var e;this.open||null==(e=this.menuData.parentMenu)||e.closeDescendentOverlays()}handleSubmenuClick(e){e.composedPath().includes(this.overlayElement)||this.openOverlay()}handleSubmenuFocus(){requestAnimationFrame((()=>{this.overlayElement.open=this.open}))}handlePointerenter(){if(this.leaveTimeout)return clearTimeout(this.leaveTimeout),void delete this.leaveTimeout;this.openOverlay()}handlePointerleave(){this.open&&!this.recentlyLeftChild&&(this.leaveTimeout=setTimeout((()=>{delete this.leaveTimeout,this.open=!1}),100))}handleSubmenuChange(e){var t;e.stopPropagation(),null==(t=this.menuData.selectionRoot)||t.selectOrToggleItem(this)}handleSubmenuPointerenter(){this.recentlyLeftChild=!0}async handleSubmenuPointerleave(){requestAnimationFrame((()=>{this.recentlyLeftChild=!1}))}handleSubmenuOpen(e){this.focused=!1;const t=e.composedPath().find((e=>e!==this.overlayElement&&"sp-overlay"===e.localName));this.overlayElement.parentOverlayToForceClose=t}cleanup(){this.open=!1,this.active=!1}async openOverlay(){!this.hasSubmenu||this.open||this.disabled||(this.open=!0,this.active=!0,this.setAttribute("aria-expanded","true"),this.addEventListener("sp-closed",this.cleanup,{once:!0}))}updateAriaSelected(){const e=this.getAttribute("role");"option"===e?this.setAttribute("aria-selected",this.selected?"true":"false"):("menuitemcheckbox"===e||"menuitemradio"===e)&&this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(e){this.setAttribute("role",e),this.updateAriaSelected()}updated(e){var t,o,r;if(super.updated(e),e.has("label")&&(this.label||void 0!==e.get("label"))&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active||void 0!==e.get("active")))if(this.active){null==(t=this.menuData.selectionRoot)||t.closeDescendentOverlays(),this.abortControllerPointer=new AbortController;const e={signal:this.abortControllerPointer.signal};this.addEventListener("pointerup",this.handleRemoveActive,e),this.addEventListener("pointerleave",this.handleRemoveActive,e),this.addEventListener("pointercancel",this.handleRemoveActive,e)}else null==(o=this.abortControllerPointer)||o.abort();if(this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),e.has("selected")&&this.updateAriaSelected(),e.has("hasSubmenu")&&(this.hasSubmenu||void 0!==e.get("hasSubmenu")))if(this.hasSubmenu){this.abortControllerSubmenu=new AbortController;const e={signal:this.abortControllerSubmenu.signal};this.addEventListener("click",this.handleSubmenuClick,e),this.addEventListener("pointerenter",this.handlePointerenter,e),this.addEventListener("pointerleave",this.handlePointerleave,e),this.addEventListener("sp-opened",this.handleSubmenuOpen,e)}else null==(r=this.abortControllerSubmenu)||r.abort()}connectedCallback(){super.connectedCallback(),this.triggerUpdate()}disconnectedCallback(){this.menuData.cleanupSteps.forEach((e=>e(this))),super.disconnectedCallback()}async triggerUpdate(){this.willDispatchUpdate||(this.willDispatchUpdate=!0,await new Promise((e=>requestAnimationFrame(e))),this.dispatchUpdate())}dispatchUpdate(){this.dispatchEvent(new b(this)),this.willDispatchUpdate=!1}}p([l({type:Boolean,reflect:!0})],f.prototype,"active",2),p([l({type:Boolean,reflect:!0})],f.prototype,"focused",2),p([l({type:Boolean,reflect:!0})],f.prototype,"selected",2),p([l({type:String})],f.prototype,"value",1),p([l({type:Boolean,reflect:!0,attribute:"has-submenu"})],f.prototype,"hasSubmenu",2),p([r("slot:not([name])")],f.prototype,"contentSlot",2),p([r('slot[name="icon"]')],f.prototype,"iconSlot",2),p([l({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],f.prototype,"noWrap",2),p([r(".anchor")],f.prototype,"anchorElement",2),p([r("sp-overlay")],f.prototype,"overlayElement",2),p([l({type:Boolean,reflect:!0})],f.prototype,"open",2),m("sp-menu-item",f);var g=i`
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
`,k=Object.defineProperty,x=Object.getOwnPropertyDescriptor,y=(e,t,o,r)=>{for(var n,i=r>1?void 0:r?x(t,o):t,c=e.length-1;c>=0;c--)(n=e[c])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&k(t,o,i),i};class w extends(e(n)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[g]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}y([r("#anchor")],w.prototype,"anchorElement",2),y([l({type:String,reflect:!0})],w.prototype,"variant",2),y([l({type:String,reflect:!0})],w.prototype,"static",2),y([l({type:Boolean,reflect:!0,attribute:"quiet"})],w.prototype,"quiet",2),m("sp-link",w);const I="(prefers-color-scheme: dark)",C="(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)";class U{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;null==(e=this.media)||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;null==(e=this.media)||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}}export{I as D,C as I,U as M,f as a,u as b};
//# sourceMappingURL=63c9e783.js.map
