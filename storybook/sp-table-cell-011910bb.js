import { i as i$1 } from './lit-element-9354aa77.js';
import { t as t$3 } from './mutation-controller-81a30f7f.js';
import { S as SpectrumElement, n as n$3, d as defineElement } from './define-element-617dba69.js';
import { x, A, D } from './lit-html-126adc72.js';
import { l as l$1, S as SizedMixin } from './sizedMixin-9a9da45c.js';
import './sp-checkbox-2808ae5b.js';
import { l as l$2 } from './if-defined-ae83b405.js';
import { i as i$2 } from './query-d0113d5a.js';
import { b as virtualizerRef, R as RangeChangedEvent, V as VisibilityChangedEvent, v as virtualize } from './virtualize-5c844e71.js';
import './sp-icon-arrow100-5c2d7038.js';

const o$3=i$1`
:host{border:none;position:relative}:host([drop-target]){--mod-table-border-color:transparent;outline-color:var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)
)
);outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host{display:table-row-group}:host{border-block:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
);border-inline:var(
--mod-table-outer-border-inline-width,var(--spectrum-table-outer-border-inline-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
);border-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
);display:block;flex-grow:1;overflow:auto}:host(:not([tabindex])){overflow:visible}
`;var d$1 = o$3;

var a$2=Object.defineProperty;var m$3=Object.getOwnPropertyDescriptor;var u$3=(o,t,s,r)=>{for(var e=r>1?void 0:r?m$3(t,s):t,i=o.length-1,l;i>=0;i--)(l=o[i])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&a$2(t,s,e),e};class TableBody extends SpectrumElement{constructor(){super();this.role="rowgroup";new t$3(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame(()=>{this.shouldHaveTabIndex();});}});}static get styles(){return [d$1]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex");}render(){return x`
            <slot></slot>
        `}}u$3([n$3({reflect:!0})],TableBody.prototype,"role",2);

defineElement("sp-table-body",TableBody);

const r=i$1`
@media (forced-colors:active){:host(.focus-visible) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host(:hover) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([focused]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-row-text-color-hover) 1px solid}:host(:focus-visible) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host(:hover) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([focused]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-row-text-color-hover) 1px solid}:host([drop-target]),:host([drop-target]) .spectrum-Table-body,:host([selected]){--highcontrast-table-cell-focus-indicator-color:var(
--highcontrast-table-selected-row-text-color
);--highcontrast-table-cell-focus-extra-offset:1px}:host([drop-target]) .spectrum-Table-body .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([drop-target]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([selected]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-selected-row-text-color) 1px solid}}:host(:first-child) .spectrum-Table-body ::slotted(*){border-block-start:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
)}:host(:last-child) .spectrum-Table-body ::slotted(*){border-block-end:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
)}:host .spectrum-Table-body ::slotted(:first-child){border-inline-start:var(
--mod-table-outer-border-inline-width,var(--spectrum-table-outer-border-inline-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
)}:host .spectrum-Table-body ::slotted(:last-child){border-inline-end:var(
--mod-table-outer-border-inline-width,var(--spectrum-table-outer-border-inline-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
)}:host(:first-child) ::slotted(:first-child){border-start-start-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host(:first-child) ::slotted(:last-child){border-start-end-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host(:last-child) ::slotted(:first-child){border-end-start-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host(:last-child) ::slotted(:last-child){border-end-end-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host{border-block-start:none;cursor:var(--mod-table-cursor-row-default,pointer);position:relative;transition:background-color var(
--highcontrast-table-transition-duration,var(
--mod-table-transition-duration,var(--spectrum-table-transition-duration)
)
) ease-in-out}:host(:first-child){border-start-end-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
);border-start-start-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host(:last-child){border-end-end-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
);border-end-start-radius:var(
--mod-table-border-radius,var(--spectrum-table-border-radius)
)}:host(:focus){outline:0}:host(.focus-visible),:host(:hover),:host([focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-row-text-color-hover
);--highcontrast-table-icon-color:var(
--highcontrast-table-row-text-color-hover
);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color-hover,var(
--mod-table-row-background-color-hover,var(--spectrum-table-row-background-color-hover)
)
)}:host(:focus-visible),:host(:hover),:host([focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-row-text-color-hover
);--highcontrast-table-icon-color:var(
--highcontrast-table-row-text-color-hover
);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color-hover,var(
--mod-table-row-background-color-hover,var(--spectrum-table-row-background-color-hover)
)
)}:host:active{--highcontrast-table-row-text-color:var(
--highcontrast-table-row-text-color-hover
);--highcontrast-table-icon-color:var(
--highcontrast-table-row-text-color-hover
);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color-hover,var(
--mod-table-row-active-color,var(--spectrum-table-row-active-color)
)
)}:host([selected]){--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color
);--spectrum-table-cell-background-color:var(
--spectrum-table-selected-cell-background-color
)}:host([selected].focus-visible),:host([selected]:hover),:host([selected][focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color-focus
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color-focus
);--spectrum-table-cell-background-color:var(
--spectrum-table-selected-cell-background-color-focus
)}:host([selected]:focus-visible),:host([selected]:hover),:host([selected][focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color-focus
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color-focus
);--spectrum-table-cell-background-color:var(
--spectrum-table-selected-cell-background-color-focus
)}:host([drop-target]),:host([drop-target]) .spectrum-Table-body{--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color
);--spectrum-table-cell-background-color:var(
--highcontrast-table-selected-row-background-color,var(
--mod-table-drop-zone-background-color,var(--spectrum-table-drop-zone-background-color)
)
)}:host([drop-target]){--mod-table-border-color:var(
--highcontrast-table-focus-indicator-color,transparent
);outline-color:var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1);outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host([drop-target]) ::slotted(*){border-top-color:var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)
)
)}.spectrum-Table-row--summary{--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color,var(
--mod-table-summary-row-background-color,var(--spectrum-table-summary-row-background-color)
)
)}.spectrum-Table-row--summary ::slotted(*){color:var(
--highcontrast-table-row-text-color,var(
--mod-table-summary-row-text-color,var(--spectrum-table-row-text-color)
)
);font-family:var(
--mod-table-summary-row-font-family,var(--spectrum-table-row-font-family)
);font-size:var(
--mod-table-summary-row-font-size,var(--spectrum-table-row-font-size)
);font-style:var(
--mod-table-summary-row-font-style,var(--spectrum-table-row-font-style)
);font-weight:var(
--mod-table-summary-row-font-weight,var(--spectrum-table-summary-row-font-weight)
);line-height:var(
--mod-table-summary-row-line-height,var(--spectrum-table-row-line-height)
)}.spectrum-Table-row--sectionHeader{--spectrum-table-cell-background-color:var(
--highcontrast-table-section-header-background-color,var(
--mod-table-section-header-background-color,var(--spectrum-table-section-header-background-color)
)
);cursor:var(--mod-table-cursor-section-header,initial)}.spectrum-Table-row--sectionHeader ::slotted(*){block-size:var(
--mod-table-section-header-min-height,var(--spectrum-table-section-header-min-height)
);color:var(
--highcontrast-table-section-header-text-color,var(
--mod-table-section-header-text-color,var(--spectrum-table-row-text-color)
)
);font-family:var(
--mod-table-section-header-font-family,var(--spectrum-table-row-font-family)
);font-size:var(
--mod-table-section-header-font-size,var(--spectrum-table-row-font-size)
);font-style:var(
--mod-table-section-header-font-style,var(--spectrum-table-row-font-style)
);font-weight:var(
--mod-table-section-header-font-weight,var(--spectrum-table-section-header-font-weight)
);line-height:var(
--mod-table-section-header-line-height,var(--spectrum-table-row-line-height)
);padding-block-end:calc(var(
--mod-table-section-header-block-end-spacing,
var(--spectrum-table-section-header-block-end-spacing)
) - var(--mod-table-border-width, var(--spectrum-table-border-width)));padding-block-start:calc(var(
--mod-table-section-header-block-start-spacing,
var(--spectrum-table-section-header-block-start-spacing)
) - var(--mod-table-border-width, var(--spectrum-table-border-width)));text-align:start}.spectrum-Table-row--sectionHeader:hover{--highcontrast-table-row-text-color:var(
--highcontrast-table-section-header-text-color
);--spectrum-table-cell-background-color:var(
--highcontrast-table-section-header-background-color,var(
--mod-table-section-header-background-color,var(--spectrum-table-section-header-background-color)
)
)}:host{display:table-row}:host(:first-child) .spectrum-Table-scroller .spectrum-Table-body ::slotted(*){border-block-start:none;border-radius:0}:host(:last-child) .spectrum-Table-scroller .spectrum-Table-body ::slotted(*){border-block-end:none;border-radius:0}:host .spectrum-Table-scroller .spectrum-Table-body ::slotted(:first-child){border-inline-start:none}:host .spectrum-Table-scroller .spectrum-Table-body ::slotted(:last-child){border-inline-end:none}.spectrum-Table-row--collapsible{--spectrum-table-row-tier:0}:host([data-tier="1"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:1}:host([data-tier="2"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:2}:host([data-tier="3"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:3}:host([data-tier="4"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:4}:host([data-tier="5"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:5}:host([data-tier="6"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:6}.spectrum-Table-row--collapsible .spectrum-Table-checkboxCell{padding-inline-end:0}.spectrum-Table-row--collapsible.is-last-tier .spectrum-Table-cell--collapsible{padding-inline-start:calc(var(--spectrum-table-row-tier)*var(--spectrum-table-collapsible-tier-indent) + var(
--mod-table-disclosure-icon-size,
var(--spectrum-table-disclosure-icon-size)
) + var(
--mod-table-collapsible-disclosure-inline-spacing,
var(--spectrum-table-collapsible-disclosure-inline-spacing)
)*2)}.spectrum-Table-row--collapsible.is-last-tier .spectrum-Table-disclosureIcon{display:none}.spectrum-Table-row--collapsible .spectrum-Table-disclosureIcon{margin-block-start:max(0px,calc((var(
--mod-table-min-row-height,
var(--spectrum-table-min-row-height)
) - var(
--mod-table-disclosure-icon-size,
var(--spectrum-table-disclosure-icon-size)
))/2));margin-inline:var(
--mod-table-collapsible-disclosure-inline-spacing,var(--spectrum-table-collapsible-disclosure-inline-spacing)
)}:host([hidden]) .spectrum-Table-row--collapsible{display:none}.spectrum-Table-row--thumbnail{--table-thumbnail-cell-block-spacing:var(
--mod-table-thumbnail-block-spacing,var(--spectrum-table-thumbnail-block-spacing)
);--table-thumbnail-inner-content-block-spacing:max(0px,calc((var(
--mod-table-thumbnail-size,
var(--spectrum-table-thumbnail-size)
) - var(
--mod-table-row-line-height,
var(--spectrum-table-row-line-height)
)*var(--mod-table-header-font-size,
var(--spectrum-table-row-font-size)))/2))}.spectrum-Table-row--thumbnail ::slotted(*){padding-block:calc(var(--table-thumbnail-cell-block-spacing) + var(--table-thumbnail-inner-content-block-spacing))}.spectrum-Table-row--thumbnail .spectrum-Table-cell--thumbnail{padding-block:0}.spectrum-Table-row--thumbnail.spectrum-Table-row--collapsible{--table-thumbnail-inner-minimum-block-spacing:max(0px,calc((var(
--mod-table-disclosure-icon-size,
var(--spectrum-table-disclosure-icon-size)
) - var(
--mod-table-thumbnail-size,
var(--spectrum-table-thumbnail-size)
))/2));--table-thumbnail-cell-block-spacing:max(var(
--mod-table-thumbnail-block-spacing,var(--spectrum-table-thumbnail-block-spacing)
),var(--table-thumbnail-inner-minimum-block-spacing))}:host,:host([role=row]){display:flex;width:100%}:host(:first-child) ::slotted(*){border-block-start:none}:host(:last-child) ::slotted(*){border-block-end:none}::slotted(:first-child){border-inline-start:none}::slotted(:last-child){border-inline-end:none}
`;var u$2 = r;

var h$1=Object.defineProperty;var n$2=Object.getOwnPropertyDescriptor;var s$1=(i,c,e,l)=>{for(var t=l>1?void 0:l?n$2(c,e):c,a=i.length-1,o;a>=0;a--)(o=i[a])&&(t=(l?o(c,e,t):o(t))||t);return l&&t&&h$1(c,e,t),t};class TableRow extends SpectrumElement{constructor(){super(...arguments);this.role="row";this.selectable=!1;this.selected=!1;this.value="";}static get styles(){return [u$2]}async handleChange(e){e.target.checkbox&&(this.selected=e.target.checkbox.checked,await 0,e.defaultPrevented&&(this.selected=!this.selected));}handleSlotchange({target:e}){const l=e.assignedElements();this.selectable=!!l.find(t=>t.localName==="sp-table-checkbox-cell");}async manageSelected(){await this.updateComplete,this.selectable?this.setAttribute("aria-selected",this.selected?"true":"false"):this.removeAttribute("aria-selected");const[e]=this.checkboxCells;e&&(e.checked=this.selected);}handleClick(e){if(e.composedPath().find(t=>t.localName==="sp-table-checkbox-cell"))return;const[l]=this.checkboxCells;l&&l.click();}render(){return x`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(e){e.has("selected")&&this.manageSelected(),e.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick));}}s$1([l$1({selector:"sp-table-checkbox-cell",flatten:!0})],TableRow.prototype,"checkboxCells",2),s$1([n$3({reflect:!0})],TableRow.prototype,"role",2),s$1([n$3({type:Boolean})],TableRow.prototype,"selectable",2),s$1([n$3({type:Boolean,reflect:!0})],TableRow.prototype,"selected",2),s$1([n$3({type:String})],TableRow.prototype,"value",2);

defineElement("sp-table-row",TableRow);

const t$2=i$1`
@media (forced-colors:active){:host(:not([head-cell])){forced-color-adjust:none}}:host([head-cell]){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color,var(
--mod-table-icon-color-default,var(--spectrum-table-icon-color-default)
)
);background-color:var(
--mod-table-header-background-color,var(--spectrum-table-header-background-color)
);block-size:var(
--mod-table-min-header-height,var(--spectrum-table-min-header-height)
);border-radius:0;box-sizing:border-box;color:var(
--mod-table-header-text-color,var(--spectrum-table-header-text-color)
);cursor:var(--mod-table-cursor-header-default,initial);font-family:var(
--mod-table-header-font-family,var(--spectrum-table-row-font-family)
);font-size:var(
--mod-table-header-font-size,var(--spectrum-table-row-font-size)
);font-weight:var(
--mod-table-header-font-weight,var(--spectrum-table-header-font-weight)
);line-height:var(
--mod-table-header-line-height,var(--spectrum-table-row-line-height)
);outline:0;padding-block:var(
--mod-table-header-top-to-text,var(--spectrum-table-header-top-to-text)
) var(
--mod-table-header-bottom-to-text,var(--spectrum-table-header-bottom-to-text)
);padding-inline:var(
--mod-table-cell-inline-space,var(--spectrum-table-cell-inline-space)
);text-align:start;text-transform:var(--mod-table-header-text-transform,none);transition:color var(
--highcontrast-table-transition-duration,var(
--mod-table-transition-duration,var(--spectrum-table-transition-duration)
)
) ease-in-out;vertical-align:var(
--mod-table-header-vertical-align,var(--spectrum-table-header-vertical-align)
)}:host(:not([head-cell])){border-block-start:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-divider-color,var(--mod-table-divider-color,var(--spectrum-table-divider-color))
)}:host(:not([head-cell])){background-color:var(--spectrum-table-cell-background-color);block-size:var(
--mod-table-min-row-height,var(--spectrum-table-min-row-height)
);box-sizing:border-box;color:var(
--highcontrast-table-row-text-color,var(--mod-table-row-text-color,var(--spectrum-table-row-text-color))
);font-size:var(
--mod-table-row-font-size,var(--spectrum-table-row-font-size)
);font-weight:var(
--mod-table-row-font-weight,var(--spectrum-table-row-font-weight)
);line-height:var(
--mod-table-row-line-height,var(--spectrum-table-row-line-height)
);padding-block-end:var(
--mod-table-row-bottom-to-text,var(--spectrum-table-row-bottom-to-text)
);padding-block-start:calc(var(--mod-table-row-top-to-text, var(--spectrum-table-row-top-to-text)) - var(--mod-table-border-width, var(--spectrum-table-border-width)));padding-inline:calc(var(--mod-table-edge-to-content, var(--spectrum-table-edge-to-content)) - var(
--mod-table-outer-border-inline-width,
var(--spectrum-table-outer-border-inline-width)
));vertical-align:var(
--mod-table-default-vertical-align,var(--spectrum-table-default-vertical-align)
)}:host(:not([head-cell])),:host([head-cell]){position:relative}:host(:not([head-cell]).focus-visible),:host(:not([head-cell])[focused]),:host([head-cell].focus-visible),:host([head-cell][focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host(:not([head-cell]):focus-visible),:host(:not([head-cell])[focused]),:host([head-cell]:focus-visible),:host([head-cell][focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host(:host){inline-size:var(--spectrum-checkbox-control-size-small);padding-block:0;padding-inline-end:calc(var(
--mod-table-checkbox-to-text,
var(--spectrum-table-checkbox-to-text)
) - var(
--mod-table-edge-to-content,
var(--spectrum-table-edge-to-content)
))}:host(:host) sp-checkbox{--mod-checkbox-spacing:0px;min-block-size:0}:host(:host:not([head-cell])) sp-checkbox{margin-block-end:var(
--mod-table-row-checkbox-block-spacing,var(--spectrum-table-row-checkbox-block-spacing)
);margin-block-start:calc(var(
--mod-table-row-checkbox-block-spacing,
var(--spectrum-table-row-checkbox-block-spacing)
) - var(--mod-table-border-width, var(--spectrum-table-border-width)))}:host(:host[head-cell]) sp-checkbox{margin-block-end:var(
--mod-table-header-checkbox-block-spacing,var(--spectrum-table-header-checkbox-block-spacing)
);margin-block-start:calc(var(
--mod-table-header-checkbox-block-spacing,
var(--spectrum-table-header-checkbox-block-spacing)
) - var(--mod-table-border-width, var(--spectrum-table-border-width)))}:host(:not([head-cell])),:host([head-cell]){display:table-cell}:host{align-items:center;block-size:auto;border-radius:0;display:flex;flex:0 1 0%}:host(:not([head-cell])),:host([head-cell]){block-size:auto;display:flex;inline-size:auto}:host([selects-single]) sp-checkbox{visibility:hidden}
`;var h = t$2;

var d=Object.defineProperty;var a$1=Object.getOwnPropertyDescriptor;var e$1=(s,r,l,c)=>{for(var t=c>1?void 0:c?a$1(r,l):r,p=s.length-1,o;p>=0;p--)(o=s[p])&&(t=(c?o(r,l,t):o(t))||t);return c&&t&&d(r,l,t),t};class TableCheckboxCell extends SpectrumElement{constructor(){super(...arguments);this.headCell=!1;this.role="gridcell";this.indeterminate=!1;this.checked=!1;this.disabled=!1;this.selectsSingle=!1;this.emphasized=!1;}static get styles(){return [h]}click(){this.checkbox.click();}render(){return x`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                ?emphasized=${this.emphasized}
                aria-hidden=${l$2(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}e$1([n$3({type:Boolean,reflect:!0,attribute:"head-cell"})],TableCheckboxCell.prototype,"headCell",2),e$1([n$3({reflect:!0})],TableCheckboxCell.prototype,"role",2),e$1([i$2(".checkbox")],TableCheckboxCell.prototype,"checkbox",2),e$1([n$3({type:Boolean})],TableCheckboxCell.prototype,"indeterminate",2),e$1([n$3({type:Boolean})],TableCheckboxCell.prototype,"checked",2),e$1([n$3({type:Boolean})],TableCheckboxCell.prototype,"disabled",2),e$1([n$3({type:Boolean,reflect:!0,attribute:"selects-single"})],TableCheckboxCell.prototype,"selectsSingle",2),e$1([n$3({type:Boolean,reflect:!0})],TableCheckboxCell.prototype,"emphasized",2);

defineElement("sp-table-checkbox-cell",TableCheckboxCell);

const e=i$1`
:host{--spectrum-table-header-top-to-text:var(
--spectrum-table-column-header-row-top-to-text-medium
);--spectrum-table-header-bottom-to-text:var(
--spectrum-table-column-header-row-bottom-to-text-medium
);--spectrum-table-min-header-height:var(--spectrum-component-height-100);--spectrum-table-min-row-height:var(
--spectrum-table-row-height-medium-regular
);--spectrum-table-row-top-to-text:var(
--spectrum-table-row-top-to-text-medium-regular
);--spectrum-table-row-bottom-to-text:var(
--spectrum-table-row-bottom-to-text-medium-regular
);--spectrum-table-cell-inline-space:var(--spectrum-table-edge-to-content);--spectrum-table-border-radius:var(--spectrum-corner-radius-100);--spectrum-table-border-width:var(--spectrum-table-border-divider-width);--spectrum-table-outer-border-inline-width:var(
--spectrum-table-border-divider-width
);--spectrum-table-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-table-default-vertical-align:top;--spectrum-table-header-vertical-align:middle;--spectrum-table-header-font-weight:var(--spectrum-bold-font-weight);--spectrum-table-row-font-family:var(--spectrum-sans-font-family-stack);--spectrum-table-row-font-weight:var(--spectrum-regular-font-weight);--spectrum-table-row-font-style:var(--spectrum-default-font-style);--spectrum-table-row-font-size:var(--spectrum-font-size-100);--spectrum-table-row-line-height:var(--spectrum-line-height-100);--spectrum-table-border-color:var(--spectrum-gray-300);--spectrum-table-divider-color:var(--spectrum-gray-300);--spectrum-table-header-background-color:var(
--spectrum-transparent-white-100
);--spectrum-table-header-text-color:var(--spectrum-body-color);--spectrum-table-row-background-color:var(--spectrum-gray-50);--spectrum-table-row-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-table-selected-row-background-color:rgba(var(--spectrum-blue-900-rgb),var(--spectrum-table-selected-row-background-opacity));--spectrum-table-selected-row-background-color-non-emphasized:rgba(var(--spectrum-gray-700-rgb),var(--spectrum-table-selected-row-background-opacity-non-emphasized));--spectrum-table-row-background-color-hover:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-table-row-hover-opacity));--spectrum-table-row-active-color:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-table-row-down-opacity));--spectrum-table-selected-row-background-color-focus:rgba(var(--spectrum-blue-900-rgb),var(--spectrum-table-selected-row-background-opacity-hover));--spectrum-table-selected-row-background-color-non-emphasized-focus:rgba(var(--spectrum-gray-700-rgb),var(
--spectrum-table-selected-row-background-opacity-non-emphasized-hover
));--spectrum-table-icon-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-table-icon-color-hover:var(
--spectrum-neutral-subdued-content-color-hover
);--spectrum-table-icon-color-active:var(
--spectrum-neutral-subdued-content-color-down
);--spectrum-table-icon-color-focus:var(
--spectrum-neutral-subdued-content-color-focus
);--spectrum-table-icon-color-focus-hover:var(
--spectrum-neutral-subdued-content-focus-hover
);--spectrum-table-icon-color-key-focus:var(
--spectrum-neutral-subdued-content-color-key-focus
);--spectrum-table-header-checkbox-block-spacing:var(
--spectrum-table-header-row-checkbox-to-top-medium
);--spectrum-table-row-checkbox-block-spacing:var(
--spectrum-table-row-checkbox-to-top-medium-regular
);--spectrum-table-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-table-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-table-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color-rgb),var(--spectrum-drop-zone-background-color-opacity));--spectrum-table-drop-zone-outline-color:var(
--spectrum-accent-visual-color
);--spectrum-table-transition-duration:var(
--spectrum-animation-duration-100
);--spectrum-table-summary-row-font-weight:var(--spectrum-bold-font-weight);--spectrum-table-summary-row-background-color:var(--spectrum-gray-200);--spectrum-table-section-header-min-height:var(
--spectrum-table-section-header-row-height-medium
);--spectrum-table-section-header-block-start-spacing:var(
--spectrum-component-top-to-text-100
);--spectrum-table-section-header-block-end-spacing:var(
--spectrum-component-bottom-to-text-100
);--spectrum-table-section-header-font-weight:var(
--spectrum-bold-font-weight
);--spectrum-table-section-header-background-color:var(--spectrum-gray-200);--spectrum-table-collapsible-tier-indent:var(--spectrum-spacing-300);--spectrum-table-collapsible-disclosure-inline-spacing:0px;--spectrum-table-disclosure-icon-size:var(--spectrum-component-height-100);--spectrum-table-collapsible-icon-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-table-thumbnail-to-text:var(--spectrum-text-to-visual-100);--spectrum-table-thumbnail-block-spacing:var(
--spectrum-table-thumbnail-to-top-minimum-medium-regular
);--spectrum-table-thumbnail-size:var(--spectrum-thumbnail-size-300);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color,var(
--mod-table-row-background-color,var(--spectrum-table-row-background-color)
)
);--spectrum-table-selected-cell-background-color:var(
--highcontrast-table-selected-row-background-color,var(
--mod-table-selected-row-background-color-non-emphasized,var(--spectrum-table-selected-row-background-color-non-emphasized)
)
);--spectrum-table-selected-cell-background-color-focus:var(
--highcontrast-table-selected-row-background-color-focus,var(
--mod-table-selected-row-background-color-non-emphasized-focus,var(
--spectrum-table-selected-row-background-color-non-emphasized-focus
)
)
);--mod-thumbnail-size:var(
--mod-table-thumbnail-size,var(--spectrum-table-thumbnail-size)
)}:host([size=s]){--spectrum-table-min-header-height:var(--spectrum-component-height-100);--spectrum-table-header-top-to-text:var(
--spectrum-table-column-header-row-top-to-text-small
);--spectrum-table-header-bottom-to-text:var(
--spectrum-table-column-header-row-bottom-to-text-small
);--spectrum-table-min-row-height:var(
--spectrum-table-row-height-small-regular
);--spectrum-table-row-top-to-text:var(
--spectrum-table-row-top-to-text-small-regular
);--spectrum-table-row-bottom-to-text:var(
--spectrum-table-row-bottom-to-text-small-regular
);--spectrum-table-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-table-row-font-size:var(--spectrum-font-size-75);--spectrum-table-header-checkbox-block-spacing:var(
--spectrum-table-header-row-checkbox-to-top-small
);--spectrum-table-row-checkbox-block-spacing:var(
--spectrum-table-row-checkbox-to-top-small-regular
);--spectrum-table-section-header-min-height:var(
--spectrum-table-section-header-row-height-small
);--spectrum-table-section-header-block-start-spacing:var(
--spectrum-component-top-to-text-75
);--spectrum-table-section-header-block-end-spacing:var(
--spectrum-component-bottom-to-text-75
);--spectrum-table-disclosure-icon-size:var(--spectrum-component-height-75);--spectrum-table-thumbnail-block-spacing:var(
--spectrum-table-thumbnail-to-top-minimum-small-regular
);--spectrum-table-thumbnail-to-text:var(--spectrum-text-to-visual-100);--spectrum-table-thumbnail-size:var(--spectrum-thumbnail-size-200)}:host([size=l]){--spectrum-table-min-header-height:var(--spectrum-component-height-200);--spectrum-table-header-top-to-text:var(
--spectrum-table-column-header-row-top-to-text-large
);--spectrum-table-header-bottom-to-text:var(
--spectrum-table-column-header-row-bottom-to-text-large
);--spectrum-table-min-row-height:var(
--spectrum-table-row-height-large-regular
);--spectrum-table-row-top-to-text:var(
--spectrum-table-row-top-to-text-large-regular
);--spectrum-table-row-bottom-to-text:var(
--spectrum-table-row-bottom-to-text-large-regular
);--spectrum-table-icon-to-text:var(--spectrum-text-to-visual-200);--spectrum-table-row-font-size:var(--spectrum-font-size-200);--spectrum-table-header-checkbox-block-spacing:var(
--spectrum-table-header-row-checkbox-to-top-large
);--spectrum-table-row-checkbox-block-spacing:var(
--spectrum-table-row-checkbox-to-top-large-regular
);--spectrum-table-section-header-min-height:var(
--spectrum-table-section-header-row-height-large
);--spectrum-table-section-header-block-start-spacing:var(
--spectrum-component-top-to-text-200
);--spectrum-table-section-header-block-end-spacing:var(
--spectrum-component-bottom-to-text-200
);--spectrum-table-disclosure-icon-size:var(--spectrum-component-height-200);--spectrum-table-thumbnail-block-spacing:var(
--spectrum-table-thumbnail-to-top-minimum-large-regular
);--spectrum-table-thumbnail-to-text:var(--spectrum-text-to-visual-200);--spectrum-table-thumbnail-size:var(--spectrum-thumbnail-size-500)}:host([size=xl]){--spectrum-table-min-header-height:var(--spectrum-component-height-300);--spectrum-table-header-top-to-text:var(
--spectrum-table-column-header-row-top-to-text-extra-large
);--spectrum-table-header-bottom-to-text:var(
--spectrum-table-column-header-row-bottom-to-text-extra-large
);--spectrum-table-min-row-height:var(
--spectrum-table-row-height-extra-large-regular
);--spectrum-table-row-top-to-text:var(
--spectrum-table-row-top-to-text-extra-large-regular
);--spectrum-table-row-bottom-to-text:var(
--spectrum-table-row-bottom-to-text-extra-large-regular
);--spectrum-table-icon-to-text:var(--spectrum-text-to-visual-300);--spectrum-table-row-font-size:var(--spectrum-font-size-300);--spectrum-table-header-checkbox-block-spacing:var(
--spectrum-table-header-row-checkbox-to-top-extra-large
);--spectrum-table-row-checkbox-block-spacing:var(
--spectrum-table-row-checkbox-to-top-extra-large-regular
);--spectrum-table-section-header-min-height:var(
--spectrum-table-section-header-row-height-extra-large
);--spectrum-table-section-header-block-start-spacing:var(
--spectrum-component-top-to-text-300
);--spectrum-table-section-header-block-end-spacing:var(
--spectrum-component-bottom-to-text-300
);--spectrum-table-disclosure-icon-size:var(--spectrum-component-height-300);--spectrum-table-thumbnail-block-spacing:var(
--spectrum-table-thumbnail-to-top-minimum-extra-large-regular
);--spectrum-table-thumbnail-to-text:var(--spectrum-text-to-visual-300);--spectrum-table-thumbnail-size:var(--spectrum-thumbnail-size-700)}:host([density=compact]){--mod-table-min-row-height:var(
--mod-table-min-row-height--compact,var(--spectrum-table-row-height-medium-compact)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--compact,var(--spectrum-table-row-top-to-text-medium-compact)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--compact,var(--spectrum-table-row-bottom-to-text-medium-compact)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--compact,var(--spectrum-table-row-checkbox-to-top-medium-compact)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-compact,var(--spectrum-table-thumbnail-to-top-minimum-medium-compact)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-compact,var(--spectrum-thumbnail-size-200)
)}:host([density=compact][size=s]){--mod-table-min-row-height:var(
--mod-table-min-row-height--compact,var(--spectrum-table-row-height-small-compact)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--compact,var(--spectrum-table-row-top-to-text-small-compact)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--compact,var(--spectrum-table-row-bottom-to-text-small-compact)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--compact,var(--spectrum-table-row-checkbox-to-top-small-compact)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-compact,var(--spectrum-table-thumbnail-to-top-minimum-small-compact)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-compact,var(--spectrum-thumbnail-size-50)
)}:host([density=compact][size=l]){--mod-table-min-row-height:var(
--mod-table-min-row-height--compact,var(--spectrum-table-row-height-large-compact)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--compact,var(--spectrum-table-row-top-to-text-large-compact)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--compact,var(--spectrum-table-row-bottom-to-text-large-compact)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--compact,var(--spectrum-table-row-checkbox-to-top-large-compact)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-compact,var(--spectrum-table-thumbnail-to-top-minimum-large-compact)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-compact,var(--spectrum-thumbnail-size-300)
)}:host([density=compact][size=xl]){--mod-table-min-row-height:var(
--mod-table-min-row-height--compact,var(--spectrum-table-row-height-extra-large-compact)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--compact,var(--spectrum-table-row-top-to-text-extra-large-compact)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--compact,var(--spectrum-table-row-bottom-to-text-extra-large-compact)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--compact,var(--spectrum-table-row-checkbox-to-top-extra-large-compact)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-compact,var(--spectrum-table-thumbnail-to-top-minimum-extra-large-compact)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-compact,var(--spectrum-thumbnail-size-500)
)}:host([density=spacious]){--mod-table-min-row-height:var(
--mod-table-min-row-height--spacious,var(--spectrum-table-row-height-medium-spacious)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--spacious,var(--spectrum-table-row-top-to-text-medium-spacious)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--spacious,var(--spectrum-table-row-bottom-to-text-medium-spacious)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--spacious,var(--spectrum-table-row-checkbox-to-top-medium-spacious)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-spacious,var(--spectrum-table-thumbnail-to-top-minimum-medium-spacious)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-spacious,var(--spectrum-thumbnail-size-500)
)}:host([density=spacious][size=s]){--mod-table-min-row-height:var(
--mod-table-min-row-height--spacious,var(--spectrum-table-row-height-small-spacious)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--spacious,var(--spectrum-table-row-top-to-text-small-spacious)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--spacious,var(--spectrum-table-row-bottom-to-text-small-spacious)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--spacious,var(--spectrum-table-row-checkbox-to-top-small-spacious)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-spacious,var(--spectrum-table-thumbnail-to-top-minimum-small-spacious)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-spacious,var(--spectrum-thumbnail-size-300)
)}:host([density=spacious][size=l]){--mod-table-min-row-height:var(
--mod-table-min-row-height--spacious,var(--spectrum-table-row-height-large-spacious)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--spacious,var(--spectrum-table-row-top-to-text-large-spacious)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--spacious,var(--spectrum-table-row-bottom-to-text-large-spacious)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--spacious,var(--spectrum-table-row-checkbox-to-top-large-spacious)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-spacious,var(--spectrum-table-thumbnail-to-top-minimum-large-spacious)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-spacious,var(--spectrum-thumbnail-size-700)
)}:host([density=spacious][size=xl]){--mod-table-min-row-height:var(
--mod-table-min-row-height--spacious,var(--spectrum-table-row-height-extra-large-spacious)
);--mod-table-row-top-to-text:var(
--mod-table-row-top-to-text--spacious,var(--spectrum-table-row-top-to-text-extra-large-spacious)
);--mod-table-row-bottom-to-text:var(
--mod-table-row-bottom-to-text--spacious,var(--spectrum-table-row-bottom-to-text-extra-large-spacious)
);--mod-table-row-checkbox-block-spacing:var(
--mod-table-row-checkbox-block-spacing--spacious,var(--spectrum-table-row-checkbox-to-top-extra-large-spacious)
);--mod-table-thumbnail-block-spacing:var(
--mod-table-thumbnail-block-spacing-spacious,var(--spectrum-table-thumbnail-to-top-minimum-extra-large-spacious)
);--mod-table-thumbnail-size:var(
--mod-table-thumbnail-size-spacious,var(--spectrum-thumbnail-size-800)
)}:host([emphasized]){--spectrum-table-selected-cell-background-color:var(
--highcontrast-table-selected-row-background-color,var(
--mod-table-selected-row-background-color,var(--spectrum-table-selected-row-background-color)
)
);--spectrum-table-selected-cell-background-color-focus:var(
--highcontrast-table-selected-row-background-color-focus,var(
--mod-table-selected-row-background-color-focus,var(--spectrum-table-selected-row-background-color-focus)
)
)}:host([quiet]){--mod-table-border-radius:var(--mod-table-border-radius--quiet,0px);--mod-table-outer-border-inline-width:var(
--mod-table-outer-border-inline-width--quiet,0px
);--mod-table-header-background-color:var(
--mod-table-header-background-color--quiet,var(--spectrum-transparent-white-100)
);--mod-table-row-background-color:var(
--mod-table-row-background-color--quiet,var(--spectrum-transparent-white-100)
)}@media (forced-colors:active){:host{--highcontrast-table-row-background-color:Canvas;--highcontrast-table-row-text-color:CanvasText;--highcontrast-table-divider-color:CanvasText;--highcontrast-table-border-color:CanvasText;--highcontrast-table-icon-color:CanvasText;--highcontrast-table-icon-color-focus:Highlight;--highcontrast-table-selected-row-background-color:Highlight;--highcontrast-table-selected-row-text-color:HighlightText;--highcontrast-table-selected-row-text-color-default:HighlightText;--highcontrast-table-selected-row-background-color-focus:Highlight;--highcontrast-table-selected-row-text-color-focus:HighlightText;--highcontrast-table-row-background-color-hover:Highlight;--highcontrast-table-row-text-color-hover:HighlightText;--highcontrast-table-section-header-text-color:Canvas;--highcontrast-table-section-header-background-color:CanvasText;--highcontrast-table-focus-indicator-color:Highlight;--highcontrast-table-transition-duration:0}@supports (color:SelectedItem){:host{--highcontrast-table-selected-row-background-color:SelectedItem;--highcontrast-table-selected-row-text-color:SelectedItemText;--highcontrast-table-selected-row-text-color-default:SelectedItemText}}}:host:not(.spectrum-Table-scroller){border-collapse:separate;border-spacing:0}:host:not(.spectrum-Table-scroller){display:table}:host{display:flex;flex-direction:column}
`;var k = e;

var b$1=Object.defineProperty;var u$1=Object.getOwnPropertyDescriptor;var a=(n,h,e,t)=>{for(var s=t>1?void 0:t?u$1(h,e):h,i=n.length-1,l;i>=0;i--)(l=n[i])&&(s=(t?l(h,e,s):l(s))||s);return t&&s&&b$1(h,e,s),s};var RowType=(e=>(e[e.ITEM=0]="ITEM",e[e.INFORMATION=1]="INFORMATION",e))(RowType||{});class Table extends SizedMixin(SpectrumElement,{validSizes:["s","m","l","xl"],noDefaultSize:!0}){constructor(){super(...arguments);this._renderItem=()=>x``;this.role="grid";this.selected=[];this.selectedSet=new Set;this.items=[];this.itemValue=(e,t)=>`${t}`;this.scroller=!1;this.emphasized=!1;this.quiet=!1;}static get styles(){return [k]}get renderItem(){return this._renderItem}set renderItem(e){this._renderItem=(t,s)=>{const i=this.itemValue(t,s),l=this.selected.includes(i),r=this.selects&&(t==null?void 0:t._$rowType$)!==1;return x`
                <sp-table-row
                    value=${i}
                    aria-rowindex=${s+1}
                    ?selected=${l}
                >
                    ${r?x`
                              <sp-table-checkbox-cell
                                  ?checked=${l}
                              ></sp-table-checkbox-cell>
                          `:A}
                    ${e(t,s)}
                </sp-table-row>
            `};}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return !!this.items.length}focus(){const e=this.querySelector("sp-table-head-cell[sortable]");e&&e.focus();}selectAllRows(){this.isVirtualized?this.items.forEach((e,t)=>{e._$rowType$!==1&&this.selectedSet.add(this.itemValue(e,t));}):this.tableRows.forEach(e=>{e.selected=!0,this.selectedSet.add(e.value);}),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1);}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach(t=>{t.selected=!1;}),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1);}manageSelects(){var s;const e=this.querySelectorAll("sp-table-checkbox-cell"),t=document.createElement("sp-table-checkbox-cell");if(this.selects){let i=!1;this.isVirtualized?i=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach(l=>{if(l.selected=this.selectedSet.has(l.value),!l.querySelector(":scope > sp-table-checkbox-cell")){const r=t.cloneNode();t.emphasized=this.emphasized,l.insertAdjacentElement("afterbegin",r),t.checked=l.selected;}}),i=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHeadCheckboxCell.headCell=!0,this.tableHeadCheckboxCell.emphasized=this.emphasized,(s=this.tableHead)==null||s.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(i);}else e.forEach(i=>{i.remove();}),delete this.tableHeadCheckboxCell;}validateSelected(){const e=new Set;this.isVirtualized?this.items.forEach((s,i)=>{const l=this.itemValue(s,i);e.add(l);}):this.tableRows.forEach(s=>{e.add(s.value);});const t=this.selected.length;this.selected=this.selected.filter(s=>e.has(s)),t!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected);}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach(e=>{e.selected=this.selectedSet.has(e.value);}),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length));}manageCheckboxes(){var e,t,s;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHeadCheckboxCell.headCell=!0,this.tableHeadCheckboxCell.emphasized=this.emphasized;const i=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(i),(e=this.tableHead)==null||e.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach(l=>{const r=document.createElement("sp-table-checkbox-cell");r.emphasized=this.emphasized,l.insertAdjacentElement("afterbegin",r),l.selected=this.selectedSet.has(l.value),r.checked=l.selected;});}else (s=(t=this.tableHead)==null?void 0:t.querySelector("sp-table-checkbox-cell"))==null||s.remove(),this.tableRows.forEach(i=>{var l;(l=i.checkboxCells[0])==null||l.remove(),this.selected.length&&(i.selected=this.selectedSet.has(i.value));});}manageHeadCheckbox(e){this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.selectsSingle=this.selects==="single",this.tableHeadCheckboxCell.emphasized=this.emphasized,this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e);}handleChange(e){e.stopPropagation();const t=new Set(this.selectedSet),s=[...this.selected],{target:i}=e,{parentElement:l}=i;if(l.value)switch(this.selects){case"single":{this.deselectAllRows(),l.selected&&(this.selectedSet.add(l.value),this.selected=[...this.selectedSet]);break}case"multiple":{l.selected?this.selectedSet.add(l.value):this.selectedSet.delete(l.value),this.selected=[...this.selectedSet];const d=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=d,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!d;break}}else {const{checkbox:d}=i;if(!d)return;d.checked||d.indeterminate?this.selectAllRows():this.deselectAllRows();}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(e.preventDefault(),this.selectedSet=t,this.selected=s);}scrollToIndex(e){if(e&&this.tableBody){const s=this.tableBody[virtualizerRef].element(e);s&&s.scrollIntoView();}}render(){return x`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(e){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),e.has("selects")&&this.manageSelects(),e.has("selected")&&this.hasUpdated&&this.manageSelected();}updated(){this.items.length&&this.renderVirtualizedItems();}renderVirtualizedItems(){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",t=>{this.dispatchEvent(new RangeChangedEvent({first:t.first,last:t.last}));}),this.tableBody.addEventListener("visibilityChanged",t=>{this.dispatchEvent(new VisibilityChangedEvent({first:t.first,last:t.last}));}));const e={items:this.items,renderItem:this.renderItem,scroller:this.scroller};D(x`
                ${virtualize(e)}
            `,this.tableBody);}disconnectedCallback(){super.disconnectedCallback();}}a([n$3({reflect:!0})],Table.prototype,"role",2),a([n$3({type:String,reflect:!0})],Table.prototype,"selects",2),a([n$3({type:Array})],Table.prototype,"selected",2),a([n$3({type:Array})],Table.prototype,"items",2),a([n$3({type:Object})],Table.prototype,"itemValue",2),a([n$3({type:Boolean,reflect:!0})],Table.prototype,"scroller",2),a([n$3({type:Boolean,reflect:!0})],Table.prototype,"emphasized",2),a([n$3({type:Boolean,reflect:!0})],Table.prototype,"quiet",2),a([n$3({type:String,reflect:!0})],Table.prototype,"density",2);

defineElement("sp-table",Table);

const t$1=i$1`
:host{display:table-header-group}:host .spectrum-Table-scroller{position:sticky;top:0;z-index:2}:host{display:flex}
`;var m$2 = t$1;

var c=Object.defineProperty;var n$1=Object.getOwnPropertyDescriptor;var s=(o,r,t,l)=>{for(var e=l>1?void 0:l?n$1(r,t):r,a=o.length-1,i;a>=0;a--)(i=o[a])&&(e=(l?i(r,t,e):i(e))||e);return l&&e&&c(r,t,e),e};class TableHead extends SpectrumElement{constructor(){super(...arguments);this.role="row";}static get styles(){return [m$2]}handleSorted({target:t}){[...this.children].forEach(e=>{e!==t&&(e.sortDirection=void 0);});}handleChange({target:t}){this.selected=t.checkbox.checked||t.checkbox.indeterminate;}render(){return x`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}s([n$3({reflect:!0})],TableHead.prototype,"role",2),s([n$3({type:Boolean,reflect:!0})],TableHead.prototype,"selected",2);

defineElement("sp-table-head",TableHead);

const t=i$1`
.sortedIcon{display:none;margin-inline-end:var(
--mod-table-sort-icon-inline-end-spacing,var(--mod-table-icon-to-text,var(--spectrum-table-icon-to-text))
);margin-inline-start:var(--mod-table-sort-icon-inline-start-spacing,0);transition:transform var(
--highcontrast-table-transition-duration,var(
--mod-table-transition-duration,var(--spectrum-table-transition-duration)
)
) ease-in-out;vertical-align:baseline}:host{--spectrum-table-icon-color:var(
--highcontrast-table-icon-color,var(
--mod-table-icon-color-default,var(--spectrum-table-icon-color-default)
)
);background-color:var(
--mod-table-header-background-color,var(--spectrum-table-header-background-color)
);block-size:var(
--mod-table-min-header-height,var(--spectrum-table-min-header-height)
);border-radius:0;box-sizing:border-box;color:var(
--mod-table-header-text-color,var(--spectrum-table-header-text-color)
);cursor:var(--mod-table-cursor-header-default,initial);font-family:var(
--mod-table-header-font-family,var(--spectrum-table-row-font-family)
);font-size:var(
--mod-table-header-font-size,var(--spectrum-table-row-font-size)
);font-weight:var(
--mod-table-header-font-weight,var(--spectrum-table-header-font-weight)
);line-height:var(
--mod-table-header-line-height,var(--spectrum-table-row-line-height)
);outline:0;padding-block:var(
--mod-table-header-top-to-text,var(--spectrum-table-header-top-to-text)
) var(
--mod-table-header-bottom-to-text,var(--spectrum-table-header-bottom-to-text)
);padding-inline:var(
--mod-table-cell-inline-space,var(--spectrum-table-cell-inline-space)
);text-align:start;text-transform:var(--mod-table-header-text-transform,none);transition:color var(
--highcontrast-table-transition-duration,var(
--mod-table-transition-duration,var(--spectrum-table-transition-duration)
)
) ease-in-out;vertical-align:var(
--mod-table-header-vertical-align,var(--spectrum-table-header-vertical-align)
)}.sortedIcon,.spectrum-Table-menuIcon{color:var(--spectrum-table-icon-color)}:host([sortable]){cursor:var(--mod-table-cursor-header-sortable,pointer)}:host([sortable]:hover){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-hover,var(--spectrum-table-icon-color-hover)
)
)}:host([sortable][active]){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-active,var(--spectrum-table-icon-color-active)
)
)}:host([sortable]:focus){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-focus,var(--spectrum-table-icon-color-focus)
)
)}:host([sortable]:focus):hover{--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-focus-hover,var(--spectrum-table-icon-color-focus-hover)
)
)}:host([sortable]) .is-keyboardFocused,:host([sortable].focus-visible){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-key-focus,var(--spectrum-table-icon-color-key-focus)
)
)}:host([sortable]) .is-keyboardFocused,:host([sortable]:focus-visible){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-key-focus,var(--spectrum-table-icon-color-key-focus)
)
)}:host([sort-direction=asc]) .sortedIcon,:host([sort-direction=desc]) .sortedIcon{display:inline-block}:host([sort-direction=asc]) .sortedIcon{transform:rotate(-90deg)}:host{position:relative}:host(.focus-visible),:host([focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host(:focus-visible),:host([focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host .spectrum-Table-checkboxCell .spectrum-Table-checkbox{margin-block-end:var(
--mod-table-header-checkbox-block-spacing,var(--spectrum-table-header-checkbox-block-spacing)
);margin-block-start:calc(var(
--mod-table-header-checkbox-block-spacing,
var(--spectrum-table-header-checkbox-block-spacing)
) - var(--mod-table-border-width, var(--spectrum-table-border-width)))}:host{display:table-cell}:host .spectrum-Table-scroller{border-block-end:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-border-color,var(--mod-table-border-color,var(--spectrum-table-border-color))
)}:host{block-size:auto;display:block;flex:1}
`;var m$1 = t;

const o$2=i$1`
.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowDown75{transform:rotate(90deg)}.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ArrowUp100,.spectrum-UIIcon-ArrowUp200,.spectrum-UIIcon-ArrowUp300,.spectrum-UIIcon-ArrowUp400,.spectrum-UIIcon-ArrowUp500,.spectrum-UIIcon-ArrowUp600,.spectrum-UIIcon-ArrowUp75{transform:rotate(270deg)}.spectrum-UIIcon-ArrowDown75,.spectrum-UIIcon-ArrowLeft75,.spectrum-UIIcon-ArrowRight75,.spectrum-UIIcon-ArrowUp75{height:var(--spectrum-alias-ui-icon-arrow-size-75);width:var(--spectrum-alias-ui-icon-arrow-size-75)}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowRight100,.spectrum-UIIcon-ArrowUp100{height:var(--spectrum-alias-ui-icon-arrow-size-100);width:var(--spectrum-alias-ui-icon-arrow-size-100)}.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowRight200,.spectrum-UIIcon-ArrowUp200{height:var(--spectrum-alias-ui-icon-arrow-size-200);width:var(--spectrum-alias-ui-icon-arrow-size-200)}.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowRight300,.spectrum-UIIcon-ArrowUp300{height:var(--spectrum-alias-ui-icon-arrow-size-300);width:var(--spectrum-alias-ui-icon-arrow-size-300)}.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowRight400,.spectrum-UIIcon-ArrowUp400{height:var(--spectrum-alias-ui-icon-arrow-size-400);width:var(--spectrum-alias-ui-icon-arrow-size-400)}.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowRight500,.spectrum-UIIcon-ArrowUp500{height:var(--spectrum-alias-ui-icon-arrow-size-500);width:var(--spectrum-alias-ui-icon-arrow-size-500)}.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowRight600,.spectrum-UIIcon-ArrowUp600{height:var(--spectrum-alias-ui-icon-arrow-size-600);width:var(--spectrum-alias-ui-icon-arrow-size-600)}
`;var y = o$2;

var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var o$1=(s,r,t,i)=>{for(var e=i>1?void 0:i?p(r,t):r,n=s.length-1,a;n>=0;n--)(a=s[n])&&(e=(i?a(r,t,e):a(e))||e);return i&&e&&l(r,t,e),e};const b=s=>({asc:"ascending",desc:"descending"})[s]||"none";class TableHeadCell extends SpectrumElement{constructor(){super(...arguments);this.role="columnheader";this.sortable=!1;this.sortKey="";}static get styles(){return [m$1,y]}handleClick(){this.sortable&&(this.sortDirection?this.sortDirection=this.sortDirection==="asc"?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})));}render(){const t=this.sortable&&!!this.sortDirection;return x`
            ${t?x`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:A}
            <slot></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick);}update(t){t.has("sortDirection")&&this.setAttribute("aria-sort",b(this.sortDirection)),t.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(t);}}o$1([n$3({reflect:!0})],TableHeadCell.prototype,"role",2),o$1([n$3({type:Boolean,reflect:!0})],TableHeadCell.prototype,"sortable",2),o$1([n$3({reflect:!0,attribute:"sort-direction"})],TableHeadCell.prototype,"sortDirection",2),o$1([n$3({attribute:"sort-key"})],TableHeadCell.prototype,"sortKey",2);

defineElement("sp-table-head-cell",TableHeadCell);

const o=i$1`
@media (forced-colors:active){:host{forced-color-adjust:none}}:host([align=center]){text-align:center}:host([align=end]){text-align:end}:host{border-block-start:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-divider-color,var(--mod-table-divider-color,var(--spectrum-table-divider-color))
)}:host{background-color:var(--spectrum-table-cell-background-color);block-size:var(
--mod-table-min-row-height,var(--spectrum-table-min-row-height)
);box-sizing:border-box;color:var(
--highcontrast-table-row-text-color,var(--mod-table-row-text-color,var(--spectrum-table-row-text-color))
);font-size:var(
--mod-table-row-font-size,var(--spectrum-table-row-font-size)
);font-weight:var(
--mod-table-row-font-weight,var(--spectrum-table-row-font-weight)
);line-height:var(
--mod-table-row-line-height,var(--spectrum-table-row-line-height)
);padding-block-end:var(
--mod-table-row-bottom-to-text,var(--spectrum-table-row-bottom-to-text)
);padding-block-start:calc(var(--mod-table-row-top-to-text, var(--spectrum-table-row-top-to-text)) - var(--mod-table-border-width, var(--spectrum-table-border-width)));padding-inline:calc(var(--mod-table-edge-to-content, var(--spectrum-table-edge-to-content)) - var(
--mod-table-outer-border-inline-width,
var(--spectrum-table-outer-border-inline-width)
));vertical-align:var(
--mod-table-default-vertical-align,var(--spectrum-table-default-vertical-align)
)}:host{position:relative}:host(.focus-visible),:host([focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}:host(:focus-visible),:host([focused]){outline-color:var(
--highcontrast-table-cell-focus-indicator-color,var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-focus-indicator-color,var(--spectrum-table-focus-indicator-color)
)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1 - var(--highcontrast-table-cell-focus-extra-offset, 0px));outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
)}.divider{border-inline-end:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-divider-color,var(--mod-table-divider-color,var(--spectrum-table-divider-color))
)}:host{display:table-cell}.spectrum-Table-cell--collapsible{padding-block:0;padding-inline-start:calc(var(--spectrum-table-row-tier, 0px)*var(--spectrum-table-collapsible-tier-indent))}:host{block-size:auto;display:block;flex:1}
`;var n = o;

var u=Object.defineProperty;var i=Object.getOwnPropertyDescriptor;var m=(l,r,o,t)=>{for(var e=t>1?void 0:t?i(r,o):r,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(t?p(r,o,e):p(e))||e);return t&&e&&u(r,o,e),e};class TableCell extends SpectrumElement{constructor(){super(...arguments);this.role="gridcell";}static get styles(){return [n]}render(){return x`
            <slot></slot>
        `}}m([n$3({reflect:!0})],TableCell.prototype,"role",2);

defineElement("sp-table-cell",TableCell);
