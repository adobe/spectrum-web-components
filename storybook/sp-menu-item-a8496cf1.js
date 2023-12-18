import { S } from './spectrum-icon-checkmark.css-ebf23520.js';
import { L as LikeAnchor } from './like-anchor-8f97823d.js';
import { F as Focusable } from './focusable-391b57ba.js';
import './sp-icon-chevron100-19c0ec20.js';
import { b } from './spectrum-icon-chevron.css-d3283c08.js';
import { i } from './lit-element-9354aa77.js';
import { t as t$1 } from './mutation-controller-81a30f7f.js';
import { O as ObserveSlotText } from './observe-slot-text-769cbc70.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-ae37a9bc.js';
import { x, A } from './lit-html-126adc72.js';
import { n, d as defineElement } from './define-element-7dc6a572.js';
import { i as i$1 } from './query-d0113d5a.js';

const e=i`
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
)}:host(:focus)>[name=description]::slotted(*),:host([focused])>[name=description]::slotted(*){color:var(
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
)}:host(:hover)>[name=description]::slotted(*){color:var(
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
)}:host:active>[name=description]::slotted(*){color:var(
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
)}:host([aria-disabled=true]) [name=description]::slotted(*),:host([disabled]) [name=description]::slotted(*){color:var(
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
);grid-area:labelArea}::slotted([slot=value]){grid-area:valueArea}.spectrum-Menu-itemActions{grid-area:actionsArea}.chevron{align-self:center;block-size:var(--spectrum-menu-item-checkmark-height);grid-area:chevronArea;height:var(--spectrum-menu-item-checkmark-height);inline-size:var(--spectrum-menu-item-checkmark-width);width:var(--spectrum-menu-item-checkmark-width)}.spectrum-Menu-item--collapsible .chevron{grid-area:chevronAreaCollapsible}[name=description]::slotted(*){grid-area:descriptionArea}:host([has-submenu]) .chevron{grid-area:chevronAreaDrillIn}.icon:not(.chevron,.checkmark){block-size:var(
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
)}[name=description]::slotted(*){color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-item-description-color-default,var(--spectrum-menu-item-description-color-default)
)
);font-size:var(
--mod-menu-item-description-font-size,var(--spectrum-menu-item-description-font-size)
);hyphens:auto;line-height:var(
--mod-menu-item-description-line-height,var(--spectrum-menu-item-description-line-height)
);margin-block-start:var(
--mod-menu-item-label-to-description-spacing,var(--spectrum-menu-item-label-to-description-spacing)
);overflow-wrap:break-word}::slotted([slot=value]){color:var(
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
)}#label{flex:1 1 auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}:host([disabled]){pointer-events:none}#button{inset:0;position:absolute}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}@media (forced-colors:active){:host{forced-color-adjust:none}}::slotted([slot=submenu]){max-width:100%;width:max-content}
`;var y = e;

var c=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(l,a,e,t)=>{for(var i=t>1?void 0:t?p(a,e):a,o=l.length-1,n;o>=0;o--)(n=l[o])&&(i=(t?n(a,e,i):n(i))||i);return t&&i&&c(a,e,i),i};const C=100;class MenuItemAddedOrUpdatedEvent extends Event{constructor(e){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0});this.menuCascade=new WeakMap;this.clear(e);}clear(e){this._item=e,this.currentAncestorWithSelects=void 0,e.menuData={cleanupSteps:[],focusRoot:void 0,selectionRoot:void 0,parentMenu:void 0},this.menuCascade=new WeakMap;}get item(){return this._item}}class MenuItem extends LikeAnchor(ObserveSlotText(ObserveSlotPresence(Focusable,'[slot="icon"]'))){constructor(){super();this.active=!1;this.focused=!1;this.selected=!1;this._value="";this.hasSubmenu=!1;this.noWrap=!1;this.open=!1;this.proxyFocus=()=>{this.focus();};this.handleBeforetoggle=e=>{e.newState==="closed"&&(this.open=!0,this.overlayElement.manuallyKeepOpen(),this.overlayElement.removeEventListener("beforetoggle",this.handleBeforetoggle));};this.recentlyLeftChild=!1;this.willDispatchUpdate=!1;this.menuData={focusRoot:void 0,parentMenu:void 0,selectionRoot:void 0,cleanupSteps:[]};this.addEventListener("click",this.handleClickCapture,{capture:!0}),new t$1(this,{config:{characterData:!0,childList:!0,subtree:!0},callback:()=>{this.breakItemChildrenCache();}});}static get styles(){return [y,S,b]}get value(){return this._value||this.itemText}set value(e){e!==this._value&&(this._value=e||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"));}get itemText(){return this.itemChildren.content.reduce((e,t)=>e+(t.textContent||"").trim(),"")}get focusElement(){return this}get hasIcon(){return this.slotContentIsPresent}get itemChildren(){if(!this.iconSlot||!this.contentSlot)return {icon:[],content:[]};if(this._itemChildren)return this._itemChildren;const e=this.iconSlot.assignedElements().map(i=>{const o=i.cloneNode(!0);return o.removeAttribute("slot"),o.classList.toggle("icon"),o}),t=this.contentSlot.assignedNodes().map(i=>i.cloneNode(!0));return this._itemChildren={icon:e,content:t},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click();}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}shouldProxyClick(){let e=!1;return this.anchorElement&&(this.anchorElement.click(),e=!0),e}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate();}renderSubmenu(){const e=x`
            <slot
                name="submenu"
                @slotchange=${this.manageSubmenu}
                @sp-menu-item-added-or-updated=${{handleEvent:t=>{t.clear(t.item);},capture:!0}}
                @focusin=${t=>t.stopPropagation()}
            ></slot>
        `;return this.hasSubmenu?(import('./sp-overlay-85f00c33.js').then(function (n) { return n.s; }),import('./sp-popover-f437c616.js'),x`
            <sp-overlay
                .triggerElement=${this}
                ?disabled=${!this.hasSubmenu}
                ?open=${this.hasSubmenu&&this.open}
                .placement=${this.isLTR?"right-start":"left-start"}
                .offset=${[-10,-4]}
                .type=${"auto"}
                @close=${t=>t.stopPropagation()}
            >
                <sp-popover
                    @change=${t=>{this.handleSubmenuChange(t),this.open=!1;}}
                    @pointerenter=${this.handleSubmenuPointerenter}
                    @pointerleave=${this.handleSubmenuPointerleave}
                    @sp-menu-item-added-or-updated=${t=>t.stopPropagation()}
                >
                    ${e}
                </sp-popover>
            </sp-overlay>
            <sp-icon-chevron100
                class="spectrum-UIIcon-ChevronRight100 chevron icon"
            ></sp-icon-chevron100>
        `):e}render(){return x`
            ${this.selected?x`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 
                            icon 
                            checkmark
                            ${this.hasIcon?"checkmark--withAdjacentIcon":""}"
                      ></sp-icon-checkmark100>
                  `:A}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="description"></slot>
            <slot name="value"></slot>
            ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):A}
            ${this.renderSubmenu()}
        `}manageSubmenu(e){const t=e.target.assignedElements({flatten:!0});this.hasSubmenu=!!t.length,this.hasSubmenu&&this.setAttribute("aria-haspopup","true");}handleRemoveActive(){this.open||(this.active=!1);}handlePointerdown(e){this.active=!0,e.target===this&&this.hasSubmenu&&this.open&&(this.addEventListener("focus",this.handleSubmenuFocus,{once:!0}),this.overlayElement.addEventListener("beforetoggle",this.handleBeforetoggle));}firstUpdated(e){super.firstUpdated(e),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerenter",this.closeOverlaysForRoot),this.hasAttribute("id")||(this.id=`sp-menu-item-${crypto.randomUUID().slice(0,8)}`);}closeOverlaysForRoot(){var e;this.open||(e=this.menuData.parentMenu)==null||e.closeDescendentOverlays();}handleSubmenuClick(e){e.composedPath().includes(this.overlayElement)||this.openOverlay();}handleSubmenuFocus(){requestAnimationFrame(()=>{this.overlayElement.open=this.open;});}handlePointerenter(){if(this.leaveTimeout){clearTimeout(this.leaveTimeout),delete this.leaveTimeout;return}this.openOverlay();}handlePointerleave(){this.open&&!this.recentlyLeftChild&&(this.leaveTimeout=setTimeout(()=>{delete this.leaveTimeout,this.open=!1;},C));}handleSubmenuChange(e){var t;e.stopPropagation(),(t=this.menuData.selectionRoot)==null||t.selectOrToggleItem(this);}handleSubmenuPointerenter(){this.recentlyLeftChild=!0;}async handleSubmenuPointerleave(){requestAnimationFrame(()=>{this.recentlyLeftChild=!1;});}handleSubmenuOpen(e){this.focused=!1;const t=e.composedPath().find(i=>i!==this.overlayElement&&i.localName==="sp-overlay");this.overlayElement.parentOverlayToForceClose=t;}cleanup(){this.open=!1,this.active=!1;}async openOverlay(){!this.hasSubmenu||this.open||this.disabled||(this.open=!0,this.active=!0,this.setAttribute("aria-expanded","true"),this.addEventListener("sp-closed",this.cleanup,{once:!0}));}updateAriaSelected(){const e=this.getAttribute("role");e==="option"?this.setAttribute("aria-selected",this.selected?"true":"false"):(e==="menuitemcheckbox"||e==="menuitemradio")&&this.setAttribute("aria-checked",this.selected?"true":"false");}setRole(e){this.setAttribute("role",e),this.updateAriaSelected();}updated(e){var t,i,o;if(super.updated(e),e.has("label")&&(this.label||typeof e.get("label")!="undefined")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active||typeof e.get("active")!="undefined"))if(this.active){(t=this.menuData.selectionRoot)==null||t.closeDescendentOverlays(),this.abortControllerPointer=new AbortController;const n={signal:this.abortControllerPointer.signal};this.addEventListener("pointerup",this.handleRemoveActive,n),this.addEventListener("pointerleave",this.handleRemoveActive,n),this.addEventListener("pointercancel",this.handleRemoveActive,n);}else (i=this.abortControllerPointer)==null||i.abort();if(this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),e.has("selected")&&this.updateAriaSelected(),e.has("hasSubmenu")&&(this.hasSubmenu||typeof e.get("hasSubmenu")!="undefined"))if(this.hasSubmenu){this.abortControllerSubmenu=new AbortController;const n={signal:this.abortControllerSubmenu.signal};this.addEventListener("click",this.handleSubmenuClick,n),this.addEventListener("pointerenter",this.handlePointerenter,n),this.addEventListener("pointerleave",this.handlePointerleave,n),this.addEventListener("sp-opened",this.handleSubmenuOpen,n);}else (o=this.abortControllerSubmenu)==null||o.abort();}connectedCallback(){super.connectedCallback(),this.triggerUpdate();}disconnectedCallback(){this.menuData.cleanupSteps.forEach(e=>e(this)),super.disconnectedCallback();}async triggerUpdate(){this.willDispatchUpdate||(this.willDispatchUpdate=!0,await new Promise(e=>requestAnimationFrame(e)),this.dispatchUpdate());}dispatchUpdate(){this.dispatchEvent(new MenuItemAddedOrUpdatedEvent(this)),this.willDispatchUpdate=!1;}}r([n({type:Boolean,reflect:!0})],MenuItem.prototype,"active",2),r([n({type:Boolean,reflect:!0})],MenuItem.prototype,"focused",2),r([n({type:Boolean,reflect:!0})],MenuItem.prototype,"selected",2),r([n({type:String})],MenuItem.prototype,"value",1),r([n({type:Boolean,reflect:!0,attribute:"has-submenu"})],MenuItem.prototype,"hasSubmenu",2),r([i$1("slot:not([name])")],MenuItem.prototype,"contentSlot",2),r([i$1('slot[name="icon"]')],MenuItem.prototype,"iconSlot",2),r([n({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged(){return !1}})],MenuItem.prototype,"noWrap",2),r([i$1(".anchor")],MenuItem.prototype,"anchorElement",2),r([i$1("sp-overlay")],MenuItem.prototype,"overlayElement",2),r([n({type:Boolean,reflect:!0})],MenuItem.prototype,"open",2);

defineElement("sp-menu-item",MenuItem);
