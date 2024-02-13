import{i as t,a as e}from"./6a9914b1.js";import{i as r}from"./112b2095.js";import{n as o,S as a}from"./cb80e8ab.js";import{x as s,A as i}from"./032a7dfd.js";import{d as c}from"./25a3ae37.js";import{O as n}from"./754ff0e4.js";import{O as d}from"./e6daed97.js";import{F as l,a as m,L as p}from"./e636094a.js";import{s as u}from"./ff8e484a.js";import{R as h}from"./39665332.js";import{o as v}from"./6101097f.js";import{S as b}from"./492935df.js";import{l as g}from"./9beeb9da.js";import{i as f}from"./17348440.js";import"./d7e0ef71.js";import"./1c4bacfd.js";import"./a87c2af6.js";import"./bda71f14.js";import"./b16bf061.js";import"./d4e0ed9c.js";import"./0fd3f319.js";import{M as y}from"./bd309138.js";import"./db486c66.js";import"./a7bcb0b0.js";import{h as w}from"./4b085d71.js";import{o as k,t as z}from"./f2f417a1.js";import"./ca3bb183.js";import{e as x}from"./c796803b.js";import"./88e3f957.js";import"./7923bf55.js";import"./25383a57.js";import"./16ab2288.js";import"./4a4b0658.js";import"./fa100a3c.js";import"./a7b3fab8.js";import"./d6d0b127.js";import"./236b0f6c.js";import"./db23c3d9.js";import"./00399ab6.js";import"./bdc657fb.js";import"./8476ec21.js";import"./d11544d8.js";var D=r`
:host{display:inline-flex}:host(:not([selected])){display:none}
`,j=Object.defineProperty,S=Object.getOwnPropertyDescriptor,C=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?S(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&j(e,r,s),s};const q=class t extends a{constructor(){super(...arguments),this.selected=!1,this.value=""}handleFocusin(){this.removeAttribute("tabindex")}handleFocusout(){this.tabIndex=this.selected?0:-1}render(){return s`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id="sp-tab-panel-"+t.instanceCount++)}updated(t){t.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}};q.styles=[D],q.instanceCount=0,C([o({type:Boolean,reflect:!0})],q.prototype,"selected",2),C([o({type:String,reflect:!0})],q.prototype,"value",2),c("sp-tab-panel",q);var $=r`
:host{block-size:calc(var(--mod-tabs-item-height, var(--spectrum-tabs-item-height)) - var(--mod-tabs-divider-size, var(--spectrum-tabs-divider-size)));box-sizing:border-box;color:var(
--highcontrast-tabs-color,var(--mod-tabs-color,var(--spectrum-tabs-color))
);cursor:pointer;outline:none;position:relative;-webkit-text-decoration:none;text-decoration:none;transition:color var(
--mod-tabs-animation-duration,var(--spectrum-tabs-animation-duration)
) ease-out;white-space:nowrap;z-index:1}::slotted([slot=icon]){block-size:var(--mod-tabs-icon-size,var(--spectrum-tabs-icon-size));inline-size:var(--mod-tabs-icon-size,var(--spectrum-tabs-icon-size));margin-block-start:var(
--mod-tabs-top-to-icon,var(--spectrum-tabs-top-to-icon)
)}[name=icon]+#item-label{margin-inline-start:var(
--mod-tabs-icon-to-text,var(--spectrum-tabs-icon-to-text)
)}:host:before{block-size:calc(100% - var(--mod-tabs-top-to-text, var(--spectrum-tabs-top-to-text)));border:var(
--mod-tabs-focus-indicator-width,var(--spectrum-tabs-focus-indicator-width)
) solid transparent;border-radius:var(
--mod-tabs-focus-indicator-border-radius,var(--spectrum-tabs-focus-indicator-border-radius)
);box-sizing:border-box;content:"";inline-size:calc(100% + var(
--mod-tabs-focus-indicator-gap,
var(--spectrum-tabs-focus-indicator-gap)
)*2);inset-block-start:calc(var(--mod-tabs-top-to-text, var(--spectrum-tabs-top-to-text))/2);inset-inline-end:calc(var(
--mod-tabs-focus-indicator-gap,
var(--spectrum-tabs-focus-indicator-gap)
)*-1);inset-inline-start:calc(var(
--mod-tabs-focus-indicator-gap,
var(--spectrum-tabs-focus-indicator-gap)
)*-1);pointer-events:none;position:absolute}@media (hover:hover){:host(:hover){color:var(
--highcontrast-tabs-color-hover,var(--mod-tabs-color-hover,var(--spectrum-tabs-color-hover))
)}}:host([selected]){color:var(
--highcontrast-tabs-color-selected,var(--mod-tabs-color-selected,var(--spectrum-tabs-color-selected))
)}:host([disabled]){color:var(
--highcontrast-tabs-color-disabled,var(--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled))
);cursor:default}:host([disabled]) #item-label{cursor:default}:host(.focus-visible){color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}:host(:focus-visible){color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}:host(.focus-visible):before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}:host(:focus-visible):before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}#item-label{cursor:pointer;display:inline-block;font-family:var(--mod-tabs-font-family,var(--spectrum-tabs-font-family));font-size:var(--mod-tabs-font-weight,var(--spectrum-tabs-font-size));font-style:var(--mod-tabs-font-style,var(--spectrum-tabs-font-style));font-weight:var(--mod-tabs-font-weight,var(--spectrum-tabs-font-weight));line-height:var(--mod-tabs-line-height,var(--spectrum-tabs-line-height));margin-block-end:var(
--mod-tabs-bottom-to-text,var(--spectrum-tabs-bottom-to-text)
);margin-block-start:var(
--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text)
);-webkit-text-decoration:none;text-decoration:none;vertical-align:top}#item-label:empty{display:none}:host([disabled]){pointer-events:none}#item-label[hidden]{display:none}@media (forced-colors:active){:host:before{background-color:ButtonFace}:host ::slotted([slot=icon]){color:inherit;position:relative;z-index:1}#item-label{position:relative;z-index:1}:host([selected]){color:HighlightText}:host([selected]) ::slotted([slot=icon]){color:HighlightText}:host([selected]) #item-label{color:HighlightText}}:host([vertical]){align-items:center;display:flex;flex-direction:column;height:auto;justify-content:center}:host([dir][vertical]) slot[name=icon]+#item-label{margin-block-end:calc(var(--mod-tabs-bottom-to-text, var(--spectrum-tabs-bottom-to-text))/2);margin-block-start:calc(var(--mod-tabs-top-to-text, var(--spectrum-tabs-top-to-text))/2);margin-inline-start:0}:host([vertical]) ::slotted([slot=icon]){margin-block-start:calc(var(--mod-tabs-top-to-icon, var(--spectrum-tabs-top-to-icon))/2)}
`,A=Object.defineProperty,E=Object.getOwnPropertyDescriptor,I=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?E(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&A(e,r,s),s};const P=class t extends(l(n(d(a,'[slot="icon"]'),""))){constructor(){super(...arguments),this.disabled=!1,this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[$]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return!!this.label||this.slotHasContent}render(){return s`
            ${this.hasIcon?s`
                      <slot name="icon"></slot>
                  `:i}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?i:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id="sp-tab-"+t.instanceCount++)}updated(t){super.updated(t),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}};P.instanceCount=0,I([o({type:Boolean,reflect:!0})],P.prototype,"disabled",2),I([o({reflect:!0})],P.prototype,"label",2),I([o({type:Boolean,reflect:!0})],P.prototype,"selected",2),I([o({type:Boolean,reflect:!0})],P.prototype,"vertical",2),I([o({type:String,reflect:!0})],P.prototype,"value",2),c("sp-tab",P);var O=r`
#list{--spectrum-tabs-item-height:var(--spectrum-tab-item-height-medium);--spectrum-tabs-item-horizontal-spacing:var(
--spectrum-tab-item-to-tab-item-horizontal-medium
);--spectrum-tabs-item-vertical-spacing:var(
--spectrum-tab-item-to-tab-item-vertical-medium
);--spectrum-tabs-start-to-edge:var(
--spectrum-tab-item-start-to-edge-medium
);--spectrum-tabs-top-to-text:var(--spectrum-tab-item-top-to-text-medium);--spectrum-tabs-bottom-to-text:var(
--spectrum-tab-item-bottom-to-text-medium
);--spectrum-tabs-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-tabs-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-tabs-top-to-icon:var(
--spectrum-tab-item-top-to-workflow-icon-medium
);--spectrum-tabs-color:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-tabs-color-selected:var(
--spectrum-neutral-subdued-content-color-down
);--spectrum-tabs-color-hover:var(
--spectrum-neutral-subdued-content-color-hover
);--spectrum-tabs-color-key-focus:var(
--spectrum-neutral-subdued-content-color-key-focus
);--spectrum-tabs-color-disabled:var(--spectrum-gray-500);--spectrum-tabs-font-family:var(--spectrum-sans-font-family-stack);--spectrum-tabs-font-style:var(--spectrum-default-font-style);--spectrum-tabs-font-size:var(--spectrum-font-size-100);--spectrum-tabs-line-height:var(--spectrum-line-height-100);--spectrum-tabs-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-tabs-focus-indicator-border-radius:var(
--spectrum-corner-radius-100
);--spectrum-tabs-focus-indicator-gap:var(
--spectrum-tab-item-focus-indicator-gap-medium
);--spectrum-tabs-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-tabs-selection-indicator-color:var(
--spectrum-neutral-subdued-content-color-down
);--spectrum-tabs-list-background-direction:top;--spectrum-tabs-divider-background-color:var(--spectrum-gray-300);--spectrum-tabs-divider-size:var(--spectrum-border-width-200);--spectrum-tabs-divider-border-radius:1px;--spectrum-tabs-animation-duration:var(--spectrum-animation-duration-100);--spectrum-tabs-animation-ease:var(--spectrum-animation-ease-in-out)}:host([emphasized]) #list{--mod-tabs-color-selected:var(
--mod-tabs-color-selected-emphasized,var(--spectrum-accent-content-color-default)
);--mod-tabs-color-hover:var(
--mod-tabs-color-hover-emphasized,var(--spectrum-accent-content-color-hover)
);--mod-tabs-color-key-focus:var(
--mod-tabs-color-key-focus-emphasized,var(--spectrum-accent-content-color-key-focus)
);--mod-tabs-selection-indicator-color:var(
--mod-tabs-selection-indicator-color-emphasized,var(--spectrum-accent-content-color-default)
)}:host([direction^=vertical]) #list{--mod-tabs-list-background-direction:var(
--mod-tabs-list-background-direction-vertical,right
)}:host([direction^=vertical-right]) #list{--mod-tabs-list-background-direction:var(
--mod-tabs-list-background-direction-vertical-right,left
)}:host([dir=rtl][direction^=vertical]) #list{--mod-tabs-list-background-direction:var(
--mod-tabs-list-background-direction-vertical,left
)}:host([dir=rtl][direction^=vertical-right]) #list{--mod-tabs-list-background-direction:var(
--mod-tabs-list-background-direction-vertical,right
)}:host([compact]) #list{--mod-tabs-item-height:var(
--mod-tabs-item-height-compact,var(--spectrum-tab-item-compact-height-medium)
);--mod-tabs-top-to-text:var(
--mod-tabs-top-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-medium)
);--mod-tabs-bottom-to-text:var(
--mod-tabs-bottom-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-medium)
);--mod-tabs-top-to-icon:var(
--mod-tabs-top-to-icon-compact,var(--spectrum-tab-item-top-to-workflow-icon-compact-medium)
)}#list{background:linear-gradient(to var(
--mod-tabs-list-background-direction,var(--spectrum-tabs-list-background-direction)
),var(
--highcontrast-tabs-divider-background-color,var(
--mod-tabs-divider-background-color,var(--spectrum-tabs-divider-background-color)
)
) 0 var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)),transparent var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)));display:flex;margin:0;padding-block:0;position:relative;vertical-align:top;z-index:0}::slotted([selected]:not([slot])){color:var(
--highcontrast-tabs-color-selected,var(--mod-tabs-color-selected,var(--spectrum-tabs-color-selected))
)}::slotted(:not([slot])).is-disabled{color:var(
--highcontrast-tabs-color-disabled,var(--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled))
);cursor:default}::slotted(:not([slot])).focus-visible{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}::slotted(:not([slot])):focus-visible{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}::slotted(:not([slot])).focus-visible:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}::slotted(:not([slot])):focus-visible:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}#selection-indicator{background-color:var(
--highcontrast-tabs-selection-indicator-color,var(
--mod-tabs-selection-indicator-color,var(--spectrum-tabs-selection-indicator-color)
)
);border-radius:var(
--mod-tabs-divider-border-radius,var(--spectrum-tabs-divider-border-radius)
);inset-inline-start:0;position:absolute;transform-origin:0 0;transition:transform var(
--mod-tabs-animation-duration,var(--spectrum-tabs-animation-duration)
) var(--mod-tabs-animation-ease,var(--spectrum-tabs-animation-ease));z-index:0}:host([direction^=horizontal]) #list{align-items:center}:host([direction^=horizontal]) #list ::slotted(:not([slot])){vertical-align:top}:host([direction^=horizontal]) #list ::slotted(:not([slot]):not(:first-child)){margin-inline-start:var(
--mod-tabs-item-horizontal-spacing,var(--spectrum-tabs-item-horizontal-spacing)
)}:host([direction^=horizontal]) #list #selection-indicator{block-size:var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size));inset-block-end:0;position:absolute}:host([direction^=horizontal][compact]) #list{align-items:end;box-sizing:content-box}:host([quiet]) #list{background:none;border-color:#0000;display:inline-flex}:host([quiet]) #selection-indicator{padding-inline-start:var(
--mod-tabs-start-to-item-quiet,var(--spectrum-tabs-start-to-item-quiet)
)}:host([direction^=vertical-right]) #list,:host([direction^=vertical]) #list{display:inline-flex;flex-direction:column;padding:0}:host([direction^=vertical-right][quiet]) #list,:host([direction^=vertical][quiet]) #list{border-color:#0000}:host([direction^=vertical-right]) #list ::slotted(:not([slot])),:host([direction^=vertical]) #list ::slotted(:not([slot])){block-size:var(--mod-tabs-item-height,var(--spectrum-tabs-item-height));line-height:var(--mod-tabs-item-height,var(--spectrum-tabs-item-height));margin-block-end:var(
--mod-tabs-item-vertical-spacing,var(--spectrum-tabs-item-vertical-spacing)
);margin-inline-end:var(
--mod-tabs-start-to-edge,var(--spectrum-tabs-start-to-edge)
);margin-inline-start:var(
--mod-tabs-start-to-edge,var(--spectrum-tabs-start-to-edge)
);padding-block:0}:host([direction^=vertical-right]) #list ::slotted(:not([slot])):before,:host([direction^=vertical]) #list ::slotted(:not([slot])):before{inset-inline-start:calc(var(
--mod-tabs-focus-indicator-gap,
var(--spectrum-tabs-focus-indicator-gap)
)*-1)}:host([direction^=vertical-right]) #list #selection-indicator,:host([direction^=vertical]) #list #selection-indicator{inline-size:var(
--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)
);inset-block-start:0;inset-inline-start:0;position:absolute}:host([direction^=vertical-right]) #list #selection-indicator{inset-inline:auto 0}@media (forced-colors:active){#list{--highcontrast-tabs-divider-background-color:var(--spectrum-gray-500);--highcontrast-tabs-selection-indicator-color:Highlight;--highcontrast-tabs-focus-indicator-color:CanvasText;--highcontrast-tabs-focus-indicator-background-color:Highlight;--highcontrast-tabs-color:ButtonText;--highcontrast-tabs-color-hover:ButtonText;--highcontrast-tabs-color-selected:HighlightText;--highcontrast-tabs-color-key-focus:ButtonText;--highcontrast-tabs-color-disabled:GrayText;forced-color-adjust:none}#list ::slotted([selected]:not([slot])):before{background-color:var(
--highcontrast-tabs-focus-indicator-background-color
)}#list ::slotted([selected]:not([slot])).focus-visible,#list ::slotted([selected]:not([slot])):focus{color:var(--highcontrast-tabs-color-selected)}#list ::slotted([selected]:not([slot])):focus,#list ::slotted([selected]:not([slot])):focus-visible{color:var(--highcontrast-tabs-color-selected)}:host([direction^=vertical][compact]) #list #list ::slotted(:not([slot])):before{block-size:100%;inset-block-start:0}:host([quiet]) #list{background:linear-gradient(to var(
--mod-tabs-list-background-direction,var(--spectrum-tabs-list-background-direction)
),var(
--highcontrast-tabs-divider-background-color,var(
--mod-tabs-divider-background-color,var(--spectrum-tabs-divider-background-color)
)
) 0 var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)),transparent var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)))}}#list{--spectrum-tabs-font-weight:var(--system-spectrum-tabs-font-weight)}:host{display:grid;grid-template-columns:100%;position:relative}:host(:not([direction^=vertical])){grid-template-rows:auto 1fr}:host([direction^=vertical]){grid-template-columns:auto 1fr}:host([dir=rtl]) #selection-indicator{left:0;right:auto}:host([direction=vertical-right]) #list #selection-indicator{inset-inline-end:0;inset-inline-start:auto}#list{justify-content:var(--swc-tabs-list-justify-content)}:host([disabled]) #list{pointer-events:none}:host([disabled]) #list #selection-indicator{background-color:var(
--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled)
)}:host([disabled]) ::slotted(sp-tab){color:var(--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled))}:host([direction=vertical-right]) #list #selection-indicator,:host([direction=vertical]) #list #selection-indicator{inset-block-start:0}#selection-indicator.first-position{transition:none}:host([dir][direction=horizontal]) #list.scroll{overflow-x:auto;overflow-y:hidden;scrollbar-width:none}:host([dir][direction=horizontal]) #list.scroll::-webkit-scrollbar{display:none}
`;var L=r`
:host([size=s]) #list{--spectrum-tabs-item-height:var(--spectrum-tab-item-height-small);--spectrum-tabs-item-horizontal-spacing:var(
--spectrum-tab-item-to-tab-item-horizontal-small
);--spectrum-tabs-item-vertical-spacing:var(
--spectrum-tab-item-to-tab-item-vertical-small
);--spectrum-tabs-start-to-edge:var(--spectrum-tab-item-start-to-edge-small);--spectrum-tabs-top-to-text:var(--spectrum-tab-item-top-to-text-small);--spectrum-tabs-bottom-to-text:var(
--spectrum-tab-item-bottom-to-text-small
);--spectrum-tabs-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-tabs-icon-to-text:var(--spectrum-text-to-visual-75);--spectrum-tabs-top-to-icon:var(
--spectrum-tab-item-top-to-workflow-icon-small
);--spectrum-tabs-focus-indicator-gap:var(
--spectrum-tab-item-focus-indicator-gap-small
);--spectrum-tabs-font-size:var(--spectrum-font-size-75)}:host([size=l]) #list{--spectrum-tabs-item-height:var(--spectrum-tab-item-height-large);--spectrum-tabs-item-horizontal-spacing:var(
--spectrum-tab-item-to-tab-item-horizontal-large
);--spectrum-tabs-item-vertical-spacing:var(
--spectrum-tab-item-to-tab-item-vertical-large
);--spectrum-tabs-start-to-edge:var(--spectrum-tab-item-start-to-edge-large);--spectrum-tabs-top-to-text:var(--spectrum-tab-item-top-to-text-large);--spectrum-tabs-bottom-to-text:var(
--spectrum-tab-item-bottom-to-text-large
);--spectrum-tabs-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-tabs-icon-to-text:var(--spectrum-text-to-visual-200);--spectrum-tabs-top-to-icon:var(
--spectrum-tab-item-top-to-workflow-icon-large
);--spectrum-tabs-focus-indicator-gap:var(
--spectrum-tab-item-focus-indicator-gap-large
);--spectrum-tabs-font-size:var(--spectrum-font-size-200)}:host([size=xl]) #list{--spectrum-tabs-item-height:var(--spectrum-tab-item-height-extra-large);--spectrum-tabs-item-horizontal-spacing:var(
--spectrum-tab-item-to-tab-item-horizontal-extra-large
);--spectrum-tabs-item-vertical-spacing:var(
--spectrum-tab-item-to-tab-item-vertical-extra-large
);--spectrum-tabs-start-to-edge:var(
--spectrum-tab-item-start-to-edge-extra-large
);--spectrum-tabs-top-to-text:var(
--spectrum-tab-item-top-to-text-extra-large
);--spectrum-tabs-bottom-to-text:var(
--spectrum-tab-item-bottom-to-text-extra-large
);--spectrum-tabs-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-tabs-icon-to-text:var(--spectrum-text-to-visual-300);--spectrum-tabs-top-to-icon:var(
--spectrum-tab-item-top-to-workflow-icon-extra-large
);--spectrum-tabs-focus-indicator-gap:var(
--spectrum-tab-item-focus-indicator-gap-extra-large
);--spectrum-tabs-font-size:var(--spectrum-font-size-300)}:host([size=s]) #list.spectrum-Tabs--compact{--mod-tabs-item-height:var(
--mod-tabs-item-height-compact,var(--spectrum-tab-item-compact-height-small)
);--mod-tabs-top-to-text:var(
--mod-tabs-top-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-small)
);--mod-tabs-bottom-to-text:var(
--mod-tabs-bottom-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-small)
);--mod-tabs-top-to-icon:var(
--mod-tabs-top-to-icon-compact,var(--spectrum-tab-item-top-to-workflow-icon-compact-small)
)}:host([size=l]) #list.spectrum-Tabs--compact{--mod-tabs-item-height:var(
--mod-tabs-item-height-compact,var(--spectrum-tab-item-compact-height-large)
);--mod-tabs-top-to-text:var(
--mod-tabs-top-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-large)
);--mod-tabs-bottom-to-text:var(
--mod-tabs-bottom-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-large)
);--mod-tabs-top-to-icon:var(
--mod-tabs-top-to-icon-compact,var(--spectrum-tab-item-top-to-workflow-icon-compact-large)
)}:host([size=xl]) #list.spectrum-Tabs--compact{--mod-tabs-item-height:var(
--mod-tabs-item-height-compact,var(--spectrum-tab-item-compact-height-extra-large)
);--mod-tabs-top-to-text:var(
--mod-tabs-top-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-extra-large)
);--mod-tabs-bottom-to-text:var(
--mod-tabs-bottom-to-text-compact,var(--spectrum-tab-item-top-to-text-compact-extra-large)
);--mod-tabs-top-to-icon:var(
--mod-tabs-top-to-icon-compact,var(--spectrum-tab-item-top-to-workflow-icon-compact-extra-large)
)}
`,T=Object.defineProperty,B=Object.getOwnPropertyDescriptor,H=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?B(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&T(e,r,s),s};const U={baseSize:100,noSelectionStyle:"transform: translateX(0px) scaleX(0) scaleY(0)",transformX(t,e){return`transform: translateX(${t}px) scaleX(${e/this.baseSize});`},transformY(t,e){return`transform: translateY(${t}px) scaleY(${e/this.baseSize});`},baseStyles(){return r`
            :host([direction='vertical-right']) #selection-indicator,
            :host([direction='vertical']) #selection-indicator {
                height: ${this.baseSize}px;
            }
            :host([dir][direction='horizontal']) #selection-indicator {
                width: ${this.baseSize}px;
            }
        `}};class F extends(b(m,{noDefaultSize:!0})){constructor(){super(),this.auto=!1,this.compact=!1,this.direction="horizontal",this.emphasized=!1,this.label="",this.enableTabsScroll=!1,this.quiet=!1,this.selectionIndicatorStyle=U.noSelectionStyle,this.shouldAnimate=!1,this.selected="",this._tabs=[],this.resizeController=new u(this,{callback:()=>{this.updateSelectionIndicator()}}),this.rovingTabindexController=new h(this,{focusInIndex:t=>{let e=0;return t.find(((t,r)=>{const o=this.selected?!t.disabled&&t.value===this.selected:!t.disabled;return e=r,o}))?e:-1},direction:()=>"both",elementEnterAction:t=>{this.auto&&(this.shouldAnimate=!0,this.selectTarget(t))},elements:()=>this.tabs,isFocusableElement:t=>!t.disabled,listenerScope:()=>this.tabList}),this.onTabsScroll=()=>{this.dispatchEvent(new Event("sp-tabs-scroll",{bubbles:!0,composed:!0}))},this.onClick=t=>{if(this.disabled)return;const e=t.composedPath().find((t=>t.parentElement===this));!e||e.disabled||(this.shouldAnimate=!0,this.selectTarget(e))},this.onKeyDown=t=>{if("Enter"===t.code||"Space"===t.code){t.preventDefault();const e=t.target;e&&this.selectTarget(e)}},this.updateCheckedState=()=>{if(this.tabs.forEach((t=>{t.removeAttribute("selected")})),this.selected){const t=this.tabs.find((t=>t.value===this.selected));t?t.selected=!0:this.selected=""}else{const t=this.tabs[0];t&&t.setAttribute("tabindex","0")}this.updateSelectionIndicator()},this.updateSelectionIndicator=async()=>{const t=this.tabs.find((t=>t.selected));if(!t)return void(this.selectionIndicatorStyle=U.noSelectionStyle);await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:e,height:r}=t.getBoundingClientRect();this.selectionIndicatorStyle="horizontal"===this.direction?U.transformX(t.offsetLeft,e):U.transformY(t.offsetTop,r)},new class{constructor(t,{target:e,config:r,callback:o,skipInitial:a}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==e&&this.t.add(null!=e?e:t),this.o=null!=a?a:this.o,this.callback=o,window.IntersectionObserver?(this.u=new IntersectionObserver((t=>{const e=this.i;this.i=!1,this.o&&e||(this.handleChanges(t),this.h.requestUpdate())}),r),t.addController(this)):console.warn("IntersectionController error: browser does not support IntersectionObserver.")}handleChanges(t){var e;this.value=null===(e=this.callback)||void 0===e?void 0:e.call(this,t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){const t=this.u.takeRecords();t.length&&this.handleChanges(t)}observe(t){this.t.add(t),this.u.observe(t),this.i=!0}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}}(this,{config:{root:null,rootMargin:"0px",threshold:[0,1]},callback:()=>{this.updateSelectionIndicator()}})}static get styles(){return[L,O,U.baseStyles()]}set tabs(t){t!==this.tabs&&(this._tabs.forEach((t=>{this.resizeController.unobserve(t)})),t.forEach((t=>{this.resizeController.observe(t)})),this._tabs=t,this.rovingTabindexController.clearElementCache())}get tabs(){return this._tabs}get focusElement(){return this.rovingTabindexController.focusInElement||this}scrollTabs(t,e="smooth"){var r;null==(r=this.tabList)||r.scrollBy({left:t,top:0,behavior:e})}get scrollState(){if(this.tabList){const{scrollLeft:t,clientWidth:e,scrollWidth:r}=this.tabList,o=Math.abs(t)>0,a=Math.ceil(Math.abs(t))<r-e;return{canScrollLeft:"ltr"===this.dir?o:a,canScrollRight:"ltr"===this.dir?a:o}}return{}}manageAutoFocus(){const t=[...this.children].map((t=>void 0!==t.updateComplete?t.updateComplete:Promise.resolve(!0)));Promise.all(t).then((()=>super.manageAutoFocus()))}managePanels({target:t}){t.assignedElements().map((t=>{const{value:e,id:r}=t,o=this.querySelector(`[role="tab"][value="${e}"]`);o&&(o.setAttribute("aria-controls",r),t.setAttribute("aria-labelledby",o.id)),t.selected=e===this.selected}))}render(){return s`
            <div
                class=${v({scroll:this.enableTabsScroll})}
                aria-label=${g(this.label?this.label:void 0)}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @scroll=${this.onTabsScroll}
                id="list"
                role="tablist"
                part="tablist"
            >
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${g(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                    role="presentation"
                ></div>
            </div>
            <slot name="tab-panel" @slotchange=${this.managePanels}></slot>
        `}willUpdate(t){if(!this.hasUpdated){const t=this.querySelector(":scope > [selected]");t&&this.selectTarget(t)}if(super.willUpdate(t),t.has("selected")){if(this.tabs.length&&this.updateCheckedState(),t.get("selected")){const e=this.querySelector(`[role="tabpanel"][value="${t.get("selected")}"]`);e&&(e.selected=!1)}const e=this.querySelector(`[role="tabpanel"][value="${this.selected}"]`);e&&(e.selected=!0)}t.has("direction")&&("horizontal"===this.direction?this.removeAttribute("aria-orientation"):this.setAttribute("aria-orientation","vertical")),t.has("dir")&&this.updateSelectionIndicator(),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")),!this.shouldAnimate&&void 0!==t.get("shouldAnimate")&&(this.shouldAnimate=!0)}selectTarget(t){const e=t.getAttribute("value");if(e){const t=this.selected;this.selected=e,this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=t)}}onSlotChange(){this.tabs=this.slotEl.assignedElements().filter((t=>"tab"===t.getAttribute("role"))),this.updateCheckedState()}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}H([o({type:Boolean})],F.prototype,"auto",2),H([o({type:Boolean,reflect:!0})],F.prototype,"compact",2),H([o({reflect:!0})],F.prototype,"dir",2),H([o({reflect:!0})],F.prototype,"direction",2),H([o({type:Boolean,reflect:!0})],F.prototype,"emphasized",2),H([o()],F.prototype,"label",2),H([o({type:Boolean})],F.prototype,"enableTabsScroll",2),H([o({type:Boolean,reflect:!0})],F.prototype,"quiet",2),H([o({attribute:!1})],F.prototype,"selectionIndicatorStyle",2),H([o({attribute:!1})],F.prototype,"shouldAnimate",2),H([f("slot")],F.prototype,"slotEl",2),H([f("#list")],F.prototype,"tabList",2),H([o({reflect:!0})],F.prototype,"selected",2),c("sp-tabs",F);var M=Object.defineProperty,R=Object.getOwnPropertyDescriptor,_=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?R(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&M(e,r,s),s};const X="transform: translateX(0px) scaleX(0) scaleY(0)";class V extends(b(a)){constructor(){super(...arguments),this.label="",this.ignoreURLParts="",this.selectionIndicatorStyle=X,this.shouldAnimate=!1,this.quiet=!1,this.onClick=t=>{const e=t.target;this.shouldAnimate=!0,this.selectTarget(e)},this._items=[],this.resizeController=new u(this,{callback:()=>{this.updateSelectionIndicator()}}),this.updateSelectionIndicator=async()=>{const t=this.items.find((t=>t.value===this.selected||t.value===window.location.href));if(!t)return void(this.selectionIndicatorStyle=X);await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:e}=t.getBoundingClientRect();this.selectionIndicatorStyle=U.transformX(t.offsetLeft,e)}}static get styles(){return[L,O,U.baseStyles()]}set selected(t){const e=this.selected;t!==e&&(this.updateCheckedState(t),this._selected=t,this.requestUpdate("selected",e))}get selected(){return this._selected}get items(){return this._items}set items(t){t!==this.items&&(this._items.forEach((t=>{this.resizeController.unobserve(t)})),t.forEach((t=>{this.resizeController.observe(t)})),this._items=t)}manageItems(){this.items=this.slotEl.assignedElements({flatten:!0}).filter((t=>"sp-top-nav-item"===t.localName));let{href:t}=window.location;const e=this.ignoreURLParts.split(" ");e.includes("hash")&&(t=t.replace(window.location.hash,"")),e.includes("search")&&(t=t.replace(window.location.search,""));const r=this.items.find((e=>e.value===t));r?this.selectTarget(r):this.selected=""}render(){return s`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${g(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("direction","horizontal"),this.setAttribute("role","navigation")}updated(t){super.updated(t),t.has("dir")&&this.updateSelectionIndicator(),!this.shouldAnimate&&void 0!==t.get("shouldAnimate")&&(this.shouldAnimate=!0),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}selectTarget(t){const{value:e}=t;e&&(this.selected=e)}onSlotChange(){this.manageItems()}updateCheckedState(t){this.items.forEach((t=>{t.selected=!1})),requestAnimationFrame((()=>{if(t&&t.length){const e=this.items.find((e=>e.value===t||e.value===window.location.href));e?e.selected=!0:this.selected=""}this.updateSelectionIndicator()}))}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}_([o({reflect:!0})],V.prototype,"dir",2),_([o({type:String})],V.prototype,"label",2),_([o({attribute:"ignore-url-parts"})],V.prototype,"ignoreURLParts",2),_([o()],V.prototype,"selectionIndicatorStyle",2),_([o({attribute:!1})],V.prototype,"shouldAnimate",2),_([o({type:Boolean,reflect:!0})],V.prototype,"quiet",2),_([o({reflect:!0})],V.prototype,"selected",1),_([f("slot")],V.prototype,"slotEl",2),c("sp-top-nav",V);var Y=r`
a{color:inherit}a:focus{outline:none}:host(:focus-within){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}:host(:focus-within):before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}:host(:focus-within) ::slotted([slot=icon]){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}#item-label{margin-block:0;padding-block-end:var(
--mod-tabs-bottom-to-text,var(--spectrum-tabs-bottom-to-text)
);padding-block-start:var(
--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text)
)}slot{pointer-events:none}@media (forced-colors:active){:host{--highcontrast-tabs-focus-indicator-color:canvastext}}
`,K=Object.defineProperty,N=Object.getOwnPropertyDescriptor,G=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?N(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&K(e,r,s),s};class Q extends(p(m)){constructor(){super(...arguments),this.selected=!1,this.value=""}static get styles(){return[$,Y]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return s`
            <a
                id="item-label"
                href=${g(this.href)}
                download=${g(this.download)}
                target=${g(this.target)}
                aria-label=${g(this.label)}
                aria-current=${g(this.selected&&this.href?"page":void 0)}
                rel=${g(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(t){super.updated(t),this.value=this.anchor.href}}G([f("a")],Q.prototype,"anchor",2),G([o({type:Boolean,reflect:!0})],Q.prototype,"selected",2),c("sp-top-nav-item",Q);var W=r`
:host{--spectrum-fieldgroup-margin:var(--spectrum-spacing-300);--spectrum-fieldgroup-readonly-delimiter:","}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{display:flex;flex-flow:column wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`,Z=Object.defineProperty,J=Object.getOwnPropertyDescriptor,tt=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?J(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&Z(e,r,s),s};class et extends(y(a,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[W]}handleSlotchange(){}render(){return s`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","group")}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}tt([o({type:Boolean,reflect:!0})],et.prototype,"horizontal",2),tt([o({type:Boolean,reflect:!0})],et.prototype,"invalid",2),tt([o()],et.prototype,"label",2),tt([o({type:Boolean,reflect:!0})],et.prototype,"vertical",2),c("sp-field-group",et);var rt=r`
:host{align-items:center;display:flex;height:100%;justify-content:center;width:100%}::slotted(*){max-height:100%;max-width:100%;object-fit:contain;transition:opacity var(--spectrum-global-animation-duration-100,.13s)}.file,.folder{height:100%;margin:var(
--spectrum-asset-icon-margin,var(--spectrum-global-dimension-size-250)
);max-width:var(
--spectrum-asset-icon-max-width,var(--spectrum-global-dimension-static-size-1000)
);min-width:var(
--spectrum-asset-icon-min-width,var(--spectrum-global-dimension-size-600)
);width:100%}.folderBackground{fill:var(
--highcontrast-asset-folder-background-color,var(
--spectrum-asset-folder-background-color,var(--spectrum-global-color-gray-300)
)
)}.fileBackground{fill:var(
--highcontrast-asset-file-background-color,var(
--spectrum-asset-file-background-color,var(--spectrum-global-color-gray-50)
)
)}.fileOutline,.folderOutline{fill:var(
--spectrum-asset-icon-outline-color,var(--spectrum-global-color-gray-500)
)}@media (forced-colors:active){:host{--highcontrast-asset-folder-background-color:currentColor;--highcontrast-asset-file-background-color:currentColor}}
`,ot=Object.defineProperty,at=Object.getOwnPropertyDescriptor,st=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?at(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&ot(e,r,s),s};class it extends a{constructor(){super(...arguments),this.label=""}static get styles(){return[rt]}render(){return"file"===this.variant?(t=>s`
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${t||"File"}
    >
        <path
            class="fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
`)(this.label):"folder"===this.variant?(t=>s`
    <svg
        class="folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${t||"Folder"}
    >
        <path
            class="folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
`)(this.label):s`
            <slot></slot>
        `}}st([o({type:String,reflect:!0})],it.prototype,"variant",2),st([o()],it.prototype,"label",2),c("sp-asset",it);var ct=r`
:host{opacity:0;pointer-events:none;transition:transform var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,opacity var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,visibility 0s linear var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
);visibility:hidden}:host([opened]){opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s)
);visibility:visible}:host([enter-from=left][opened]){transform:translateX(var(
--mod-overlay-animation-distance,var(--spectrum-overlay-animation-distance,6px)
))}:host([enter-from=right][opened]){transform:translateX(calc(var(
--mod-overlay-animation-distance,
var(--spectrum-overlay-animation-distance, 6px)
)*-1))}:host{align-items:center;background-color:var(
--spectrum-quickactions-background-color,var(--spectrum-alias-background-color-quickactions)
);block-size:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);border-radius:var(
--spectrum-quickactions-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;justify-content:center;padding-block:var(
--spectrum-quickactions-padding-y,var(--spectrum-global-dimension-size-50)
);padding-inline:var(
--spectrum-quickactions-padding-x,var(--spectrum-global-dimension-size-50)
)}[name=action]+::slotted([slot=action]){margin-inline-start:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}#overlay{background-color:var(
--spectrum-quickactions-overlay-color,var(--spectrum-alias-background-color-quickactions-overlay)
)}:host([text-only]) [name=action]+::slotted([slot=action]){margin-inline-start:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}
`,nt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,lt=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?dt(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&nt(e,r,s),s};class mt extends a{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[ct]}render(){return s`
            <slot></slot>
        `}}lt([o({type:Boolean,reflect:!0})],mt.prototype,"opened",2),lt([o({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],mt.prototype,"textOnly",2),c("sp-quick-actions",mt);var pt=r`
:host{--spectrum-card-background-color:var(--spectrum-background-layer-2-color);--spectrum-card-body-spacing:var(--spectrum-spacing-400);--spectrum-card-title-padding-top:var(--spectrum-spacing-300);--spectrum-card-title-padding-right:var(--spectrum-spacing-400);--spectrum-card-content-margin-top:var(--spectrum-spacing-100);--spectrum-card-content-margin-bottom:var(--spectrum-spacing-300);--spectrum-card-footer-padding-top:var(--spectrum-spacing-100);--spectrum-card-subtitle-padding-right:var(--spectrum-spacing-100);--spectrum-card-border-width:var(--spectrum-border-width-100);--spectrum-card-corner-radius:var(--spectrum-corner-radius-100);--spectrum-card-border-color:var(--spectrum-gray-200);--spectrum-card-border-color-hover:var(--spectrum-gray-300);--spectrum-card-border-color-selected:var(--spectrum-blue-700);--spectrum-card-divider-color:var(--spectrum-gray-300);--spectrum-card-title-font-family:var(--spectrum-sans-font-family-stack);--spectrum-card-title-font-size:var(--spectrum-heading-size-xxs);--spectrum-card-title-font-weight:var(
--spectrum-heading-sans-serif-font-weight
);--spectrum-card-title-font-style:var(
--spectrum-heading-sans-serif-font-style
);--spectrum-card-title-line-height:var(--spectrum-heading-line-height);--spectrum-card-title-font-color:var(--spectrum-heading-color);--spectrum-card-body-font-family:var(--spectrum-sans-font-family-stack);--spectrum-card-body-font-size:var(--spectrum-body-size-s);--spectrum-card-body-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-card-body-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-card-body-line-height:var(--spectrum-body-line-height);--spectrum-card-body-font-color:var(--spectrum-body-color);--spectrum-card-actions-spacing:var(--spectrum-spacing-300);--spectrum-card-actions-size:var(
--spectrum-card-selection-background-size
);--spectrum-card-actions-border-radius:var(--spectrum-corner-radius-100);--spectrum-card-actions-background-color-rgb:var(--spectrum-gray-100-rgb);--spectrum-card-actions-background-color-opacity:var(
--spectrum-card-selection-background-color-opacity
);--spectrum-card-actions-drop-shadow-color:var(
--spectrum-drop-shadow-color
);--spectrum-card-actions-drop-shadow-x:var(--spectrum-drop-shadow-x);--spectrum-card-actions-drop-shadow-y:var(--spectrum-drop-shadow-y);--spectrum-card-actions-drop-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-card-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-card-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-card-selected-background-opacity:0.1}:host([variant=gallery]),:host([variant=quiet]){--mod-card-content-margin-top:var(
--spectrum-card-content-margin-top-quiet,var(--spectrum-spacing-100)
);--mod-card-minimum-width:var(
--spectrum-card-minimum-width-quiet,var(--spectrum-card-minimum-width)
);--spectrum-card-preview-border-width:var(--spectrum-border-width-100)}:host([horizontal]),:host([variant=gallery]),:host([variant=quiet]){--mod-card-background-color:var(
--spectrum-card-background-color-quiet,var(--spectrum-background-base-color)
);--spectrum-card-background-color-hover:var(
--spectrum-card-background-color-hover-quiet,var(--spectrum-gray-300)
)}:host{--spectrum-card-horizontal-body-padding:var(--spectrum-spacing-300);--spectrum-card-horizontal-preview-padding:var(--spectrum-spacing-200)}:host{background-color:var(
--highcontrast-card-background-color,var(
--mod-spectrum-card-background-color,var(--spectrum-card-background-color)
)
);border:var(--mod-card-border-width,var(--spectrum-card-border-width)) solid transparent;border-color:var(
--highcontrast-card-border-color,var(--mod-card-border-color,var(--spectrum-card-border-color))
);border-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);box-sizing:border-box;display:inline-flex;flex-direction:column;min-inline-size:var(
--mod-card-minimum-width,var(--spectrum-card-minimum-width)
);position:relative;-webkit-text-decoration:none;text-decoration:none}:host:before{block-size:100%;content:"";inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}:host:after{block-size:100%;border:0 solid #0000;border-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);content:"";inline-size:100%;inset-block-start:0;inset-inline:0;margin-block-start:calc(var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
)*-1);margin-inline-start:calc(var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
)*-1);position:absolute}:host(.focus-visible){outline:none}:host(:focus-visible){outline:none}:host(.focus-visible):after{border-color:var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
);border-width:var(
--mod-card-focus-indicator-width,var(--spectrum-card-focus-indicator-width)
)}:host(:focus-visible):after{border-color:var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
);border-width:var(
--mod-card-focus-indicator-width,var(--spectrum-card-focus-indicator-width)
)}:host(.focus-visible) #cover-photo,:host(.focus-visible) #preview{border-start-end-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
));border-start-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
))}:host(:focus-visible) #cover-photo,:host(:focus-visible) #preview{border-start-end-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
));border-start-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
))}:host([selected]){border-color:var(
--highcontrast-card-border-color-selected,var(
--mod-card-border-color-selected,var(--spectrum-card-border-color-selected)
)
)}:host([selected]):before{background-color:rgba(var(
--mod-card-selected-background-color-rgb,var(--spectrum-card-selected-background-color-rgb)
),var(
--mod-card-selected-background-opacity,var(--spectrum-card-selected-background-opacity)
))}:host([drop-target]){--mod-card-background-color:var(
--spectrum-card-background-color-quiet,var(--spectrum-background-base-color)
);background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);border-color:var(
--highcontrast-card-border-color-selected,var(
--mod-card-border-color-selected,var(--spectrum-card-border-color-selected)
)
);box-shadow:0 0 0 1px var(
--highcontrast-card-border-color-selected,var(
--mod-card-border-color-selected,var(--spectrum-card-border-color-selected)
)
)}:host(:focus) .actions,:host(:focus) .quick-actions,:host([focused]) .actions,:host([focused]) .quick-actions,:host([selected]) .actions,:host([selected]) .quick-actions{opacity:1;pointer-events:all;visibility:visible}.quick-actions{background-color:rgba(var(
--mod-card-actions-background-color-rgb,var(--spectrum-card-actions-background-color-rgb)
),var(
--mod-card-actions-background-color-opacity,var(--spectrum-card-actions-background-color-opacity)
));block-size:var(--mod-card-actions-size,var(--spectrum-card-actions-size));border-radius:var(
--mod-card-actions-border-radius,var(--spectrum-card-actions-border-radius)
);box-shadow:var(
--mod-card-actions-drop-shadow-x,var(--spectrum-card-actions-drop-shadow-x)
) var(
--mod-card-actions-drop-shadow-y,var(--spectrum-card-actions-drop-shadow-y)
) var(
--mod-card-actions-drop-shadow-blur,var(--spectrum-card-actions-drop-shadow-blur)
) var(
--mod-card-actions-drop-shadow-color,var(--spectrum-card-actions-drop-shadow-color)
);inline-size:var(
--mod-card-actions-size,var(--spectrum-card-actions-size)
);inset-block-start:calc(var(--mod-card-actions-spacing, var(--spectrum-card-actions-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));inset-inline-start:calc(var(--mod-card-actions-spacing, var(--spectrum-card-actions-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));position:absolute;visibility:hidden}.actions{inset-block-start:var(
--mod-card-actions-spacing,var(--spectrum-card-actions-spacing)
);inset-inline-end:var(
--mod-card-actions-spacing,var(--spectrum-card-actions-spacing)
)}#cover-photo{align-items:center;background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);background-position:50%;background-size:cover;block-size:var(
--mod-card-preview-minimum-height,var(--spectrum-card-preview-minimum-height)
);border-block-end-color:var(
--mod-card-border-color,var(--spectrum-card-border-color)
);border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));border-start-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));box-sizing:border-box;display:flex;justify-content:center;position:relative}.spectrum-Divider{margin:0}.content{align-items:center;display:flex;margin-block-start:var(
--mod-card-content-margin-top,var(--spectrum-card-content-margin-top)
)}.body{padding-block-end:var(
--mod-card-body-padding-block-end,calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)))
);padding-block-start:var(
--mod-card-body-padding-block-start,var(
--mod-card-title-padding-top,var(--spectrum-card-title-padding-top)
)
);padding-inline-end:var(
--mod-card-body-padding-inline-end,calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)))
);padding-inline-start:var(
--mod-card-body-padding-inline-start,calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)))
)}#preview{align-items:center;border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);border-start-start-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);color:var(
--highcontrast-card-body-font-color,var(--mod-card-body-font-color,var(--spectrum-card-body-font-color))
);display:flex;overflow:hidden}.title{font-family:var(
--mod-card-title-font-family,var(--spectrum-card-title-font-family)
);font-size:var(
--mod-card-title-font-size,var(--spectrum-card-title-font-size)
);font-style:var(
--mod-card-title-font-style,var(--spectrum-card-title-font-style)
);font-weight:var(
--mod-card-title-font-weight,var(--spectrum-card-title-font-weight)
);line-height:var(
--mod-card-title-line-height,var(--spectrum-card-title-line-height)
);padding-inline-end:var(
--mod-card-title-padding-right,var(--spectrum-card-title-padding-right)
)}.subtitle,.title{color:var(
--highcontrast-card-title-font-color,var(--mod-card-title-font-color,var(--spectrum-card-title-font-color))
)}.subtitle{padding-inline-end:var(
--mod-card-subtitle-padding-right,var(--spectrum-card-subtitle-padding-right)
)}.subtitle+::slotted([slot=description]):before{content:"•";padding-inline-end:var(
--mod-card-subtitle-padding-right,var(--spectrum-card-subtitle-padding-right)
)}::slotted([slot=description]){color:var(
--highcontrast-card-body-font-color,var(--mod-card-body-font-color,var(--spectrum-card-body-font-color))
);font-family:var(
--mod-card-body-font-family,var(--spectrum-card-body-font-family)
);font-size:var(
--mod-card-body-font-size,var(--spectrum-card-body-font-size)
);font-style:var(
--mod-card-body-font-style,var(--spectrum-card-body-font-style)
);font-weight:var(
--mod-card-body-font-weight,var(--spectrum-card-body-font-weight)
);line-height:var(
--mod-card-body-line-height,var(--spectrum-card-body-line-height)
)}::slotted([slot=footer]){border-block-start:var(
--mod-card-border-width,var(--spectrum-card-border-width)
) solid var(--mod-card-divider-color,var(--spectrum-card-divider-color));color:var(
--highcontrast-card-body-font-color,var(--mod-card-body-font-color,var(--spectrum-card-body-font-color))
);line-height:var(
--mod-card-body-line-height,var(--spectrum-card-body-line-height)
);margin-block-start:var(
--mod-card-footer-margin-block-start,calc((var(
--mod-card-body-spacing,
var(--spectrum-card-body-spacing)
) - var(
--mod-card-content-margin-bottom,
var(--spectrum-card-content-margin-bottom)
))*-1)
);margin-inline-end:var(
--mod-card-footer-margin-inline-end,var(--mod-card-body-spacing,var(--spectrum-card-body-spacing))
);margin-inline-start:var(
--mod-card-footer-margin-inline-start,var(--mod-card-body-spacing,var(--spectrum-card-body-spacing))
);padding-block-end:var(
--mod-card-footer-padding-block-end,calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)))
);padding-block-start:var(
--mod-card-footer-padding-block-start,var(
--mod-card-footer-margin-top,var(--spectrum-card-footer-padding-top)
)
)}.header{align-items:center;display:flex}.action-button{align-self:center;display:flex;flex:1;justify-content:flex-end;z-index:1}:host([variant=quiet]) #preview{border:var(
--mod-card-focus-indicator-width,var(--spectrum-card-focus-indicator-width)
) solid transparent}:host([variant=quiet]:focus):after,:host([variant=quiet][focused]):after{border-width:0}:host([variant=quiet]:focus) #preview:after,:host([variant=quiet][focused]) #preview:after{border-color:var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
)}:host([variant=quiet][selected]) #preview{border:var(
--mod-card-preview-border-width,var(--spectrum-card-preview-border-width)
) solid;border-color:var(
--highcontrast-card-border-color-selected,var(
--mod-card-border-color-selected,var(--spectrum-card-border-color-selected)
)
)}:host([variant=gallery]),:host([variant=quiet]){background-color:#0000;block-size:100%;border-color:#0000;border-radius:0;border-width:0;min-inline-size:var(
--mod-card-minimum-width,var(--spectrum-card-minimum-width)
);overflow:visible}:host([variant=gallery]):before,:host([variant=quiet]):before{display:none}:host([variant=gallery]) #preview,:host([variant=quiet]) #preview{background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);border-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);box-sizing:border-box;flex:1;inline-size:100%;margin:0 auto;min-block-size:var(
--mod-card-preview-minimum-height,var(--spectrum-card-preview-minimum-height)
);overflow:visible;position:relative;transition:background-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
)}:host([variant=gallery]) #preview:before,:host([variant=quiet]) #preview:before{block-size:100%;content:"";inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}:host([variant=gallery]) #preview:after,:host([variant=quiet]) #preview:after{block-size:100%;border:0 solid #0000;border-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) + var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
));content:"";inline-size:100%;inset-block-start:0;inset-inline:0;margin-block-start:calc(var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
)*-1);margin-inline-start:calc(var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
)*-1);position:absolute}:host([variant=gallery][drop-target]),:host([variant=quiet][drop-target]){background-color:#0000;border-color:#0000;box-shadow:none}:host([variant=gallery][drop-target]) #preview,:host([variant=quiet][drop-target]) #preview{background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);transition:none}:host([variant=gallery][drop-target]) #preview:before,:host([variant=quiet][drop-target]) #preview:before{border-color:var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
);box-shadow:0 0 0 1px var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
)}:host([variant=gallery][selected]) #preview:before,:host([variant=quiet][selected]) #preview:before{background-color:rgba(var(
--mod-card-selected-background-color-rgb,var(--spectrum-card-selected-background-color-rgb)
),var(
--mod-card-selected-background-opacity,var(--spectrum-card-selected-background-opacity)
))}:host([variant=gallery]) .body,:host([variant=quiet]) .body{margin-block-start:var(
--mod-card-content-margin-top,var(--spectrum-card-content-margin-top)
);padding:0}:host([variant=gallery]) ::slotted([slot=footer]),:host([variant=quiet]) ::slotted([slot=footer]){margin-inline:0}:host([horizontal]){flex-direction:row}@media (hover:hover){:host(:hover) .actions,:host(:hover) .quick-actions{opacity:1;pointer-events:all;visibility:visible}:host(:hover){border-color:var(
--highcontrast-card-border-color-hover,var(
--mod-card-border-color-hover,var(--spectrum-card-border-color-hover)
)
)}:host([variant=gallery]:hover),:host([variant=quiet]:hover){border-color:#0000}:host([variant=gallery]:hover) #preview,:host([variant=quiet]:hover) #preview{background-color:var(
--mod-card-background-color-hover,var(--spectrum-card-background-color-hover)
)}:host([horizontal]:hover) #preview{border-color:var(
--mod-card-border-color-hover,var(--spectrum-card-border-color-hover)
)}}:host([horizontal]) #preview{align-items:center;background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);border-color:var(
--mod-card-border-color,var(--spectrum-card-border-color)
);border-end-end-radius:0;border-end-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));border-start-end-radius:0;border-start-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));display:flex;flex-shrink:0;justify-content:center;min-block-size:0;padding:var(
--mod-card-horizontal-preview-padding,var(--spectrum-card-horizontal-preview-padding)
)}:host([horizontal]) .content,:host([horizontal]) .header{block-size:auto;margin-block-start:0}:host([horizontal]) .content{margin-block-end:0}:host([horizontal]) .title{padding-inline-end:0}:host([horizontal]) .body{display:flex;flex-direction:column;flex-shrink:0;justify-content:center;padding-block:0;padding-inline:var(
--mod-card-horizontal-body-padding,var(--spectrum-card-horizontal-body-padding)
)}:host([variant=gallery]){min-inline-size:0}:host([variant=gallery]) #preview{border-radius:0;padding:0}:host([href]:not([href=""])){cursor:pointer}#like-anchor{inset:0;pointer-events:none;position:absolute}.action-button{flex-grow:0}:host([dir=ltr]) .action-button{margin-left:auto}:host([dir=rtl]) .action-button{margin-right:auto}slot[name=description]{font-size:var(
--spectrum-card-subtitle-text-size,var(--spectrum-global-dimension-font-size-50)
)}#preview+#cover-photo{display:none}#cover-photo ::slotted(*),:host(:not([variant=quiet])) #preview ::slotted(*){display:block;object-fit:cover;width:100%}:host(:not([variant=gallery])) #preview ::slotted(*){height:100%}:host([horizontal]) #preview{width:auto}:host([horizontal]) sp-asset{height:inherit}sp-quick-actions{z-index:1}.title{width:var(--spectrum-card-title-width)}.subtitle{text-transform:none}:host:after,:host:before{pointer-events:none}
`;var ut=[k,z,r`
.spectrum-Detail{--spectrum-detail-sans-serif-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-detail-serif-font-family:var(
--spectrum-serif-font-family-stack
);--spectrum-detail-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-detail-margin-start:calc(var(--mod-detail-font-size, var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-top-multiplier));--spectrum-detail-margin-end:calc(var(--mod-detail-font-size, var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-bottom-multiplier));--spectrum-detail-font-color:var(--spectrum-detail-color)}@media (forced-colors:active){.spectrum-Detail{--highcontrast-detail-font-color:Text}}.spectrum-Detail--sizeS{--spectrum-detail-font-size:var(--spectrum-detail-size-s)}.spectrum-Detail--sizeM{--spectrum-detail-font-size:var(--spectrum-detail-size-m)}.spectrum-Detail--sizeL{--spectrum-detail-font-size:var(--spectrum-detail-size-l)}.spectrum-Detail--sizeXL{--spectrum-detail-font-size:var(--spectrum-detail-size-xl)}.spectrum-Detail{color:var(
--highcontrast-detail-font-color,var(--mod-detail-font-color,var(--spectrum-detail-font-color))
);font-family:var(
--mod-detail-sans-serif-font-family,var(--spectrum-detail-sans-serif-font-family)
);font-size:var(--mod-detail-font-size,var(--spectrum-detail-font-size));font-style:var(
--mod-detail-sans-serif-font-style,var(--spectrum-detail-sans-serif-font-style)
);font-weight:var(
--mod-detail-sans-serif-font-weight,var(--spectrum-detail-sans-serif-font-weight)
);letter-spacing:var(
--mod-detail-letter-spacing,var(--spectrum-detail-letter-spacing)
);line-height:var(
--mod-detail-line-height,var(--spectrum-detail-line-height)
);margin-block:0;text-transform:uppercase}.spectrum-Detail .spectrum-Detail-strong,.spectrum-Detail strong{font-style:var(
--mod-detail-sans-serif-strong-font-style,var(--spectrum-detail-sans-serif-strong-font-style)
);font-weight:var(
--mod-detail-sans-serif-strong-font-weight,var(--spectrum-detail-sans-serif-strong-font-weight)
)}.spectrum-Detail .spectrum-Detail-emphasized,.spectrum-Detail em{font-style:var(
--mod-detail-sans-serif-emphasized-font-style,var(--spectrum-detail-sans-serif-emphasized-font-style)
);font-weight:var(
--mod-detail-sans-serif-emphasized-font-weight,var(--spectrum-detail-sans-serif-emphasized-font-weight)
)}.spectrum-Detail .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail em strong,.spectrum-Detail strong em{font-style:var(
--mod-detail-sans-serif-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-sans-serif-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-strong-emphasized-font-weight)
)}.spectrum-Detail:lang(ja),.spectrum-Detail:lang(ko),.spectrum-Detail:lang(zh){font-family:var(
--mod-detail-cjk-font-family,var(--spectrum-detail-cjk-font-family)
);font-style:var(
--mod-detail-cjk-font-style,var(--spectrum-detail-cjk-font-style)
);font-weight:var(
--mod-detail-cjk-font-weight,var(--spectrum-detail-cjk-font-weight)
);line-height:var(
--mod-detail-cjk-line-height,var(--spectrum-detail-cjk-line-height)
)}.spectrum-Detail:lang(ja) .spectrum-Detail-strong,.spectrum-Detail:lang(ja) strong,.spectrum-Detail:lang(ko) .spectrum-Detail-strong,.spectrum-Detail:lang(ko) strong,.spectrum-Detail:lang(zh) .spectrum-Detail-strong,.spectrum-Detail:lang(zh) strong{font-style:var(
--mod-detail-cjk-strong-font-style,var(--spectrum-detail-cjk-strong-font-style)
);font-weight:var(
--mod-detail-cjk-strong-font-weight,var(--spectrum-detail-cjk-strong-font-weight)
)}.spectrum-Detail:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em,.spectrum-Detail:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em,.spectrum-Detail:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em{font-style:var(
--mod-detail-cjk-emphasized-font-style,var(--spectrum-detail-cjk-emphasized-font-style)
);font-weight:var(
--mod-detail-cjk-emphasized-font-weight,var(--spectrum-detail-cjk-emphasized-font-weight)
)}.spectrum-Detail:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em strong,.spectrum-Detail:lang(ja) strong em,.spectrum-Detail:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em strong,.spectrum-Detail:lang(ko) strong em,.spectrum-Detail:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em strong,.spectrum-Detail:lang(zh) strong em{font-style:var(
--mod-detail-cjk-strong-emphasized-font-style,var(--spectrum-detail-cjk-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-cjk-strong-emphasized-font-weight,var(--spectrum-detail-cjk-strong-emphasized-font-weight)
)}.spectrum-Detail--serif{font-family:var(
--mod-detail-serif-font-family,var(--spectrum-detail-serif-font-family)
);font-style:var(
--mod-detail-serif-font-style,var(--spectrum-detail-serif-font-style)
);font-weight:var(
--mod-detail-serif-font-weight,var(--spectrum-detail-serif-font-weight)
)}.spectrum-Detail--serif .spectrum-Detail-strong,.spectrum-Detail--serif strong{font-style:var(
--mod-detail-serif-strong-font-style,var(--spectrum-detail-serif-strong-font-style)
);font-weight:var(
--mod-detail-serif-strong-font-weight,var(--spectrum-detail-serif-strong-font-weight)
)}.spectrum-Detail--serif .spectrum-Detail-emphasized,.spectrum-Detail--serif em{font-style:var(
--mod-detail-serif-emphasized-font-style,var(--spectrum-detail-serif-emphasized-font-style)
);font-weight:var(
--mod-detail-serif-emphasized-font-weight,var(--spectrum-detail-serif-emphasized-font-weight)
)}.spectrum-Detail--serif .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--serif em strong,.spectrum-Detail--serif strong em{font-style:var(
--mod-detail-serif-strong-emphasized-font-style,var(--spectrum-detail-serif-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-serif-strong-emphasized-font-weight,var(--spectrum-detail-serif-strong-emphasized-font-weight)
)}.spectrum-Detail--light{font-style:var(
--mod-detail-sans-serif-light-font-style,var(--spectrum-detail-sans-serif-light-font-style)
);font-weight:var(
--spectrum-detail-sans-serif-light-font-weight,var(--spectrum-detail-sans-serif-light-font-weight)
)}.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--light strong{font-style:var(
--mod-detail-sans-serif-light-strong-font-style,var(--spectrum-detail-sans-serif-light-strong-font-style)
);font-weight:var(
--mod-detail-sans-serif-light-strong-font-weight,var(--spectrum-detail-sans-serif-light-strong-font-weight)
)}.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--light em{font-style:var(
--mod-detail-sans-serif-light-emphasized-font-style,var(--spectrum-detail-sans-serif-light-emphasized-font-style)
);font-weight:var(
--mod-detail-sans-serif-light-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-emphasized-font-weight)
)}.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--light em strong,.spectrum-Detail--light strong em{font-style:var(
--mod-detail-sans-serif-light-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-weight)
)}.spectrum-Detail--light:lang(ja),.spectrum-Detail--light:lang(ko),.spectrum-Detail--light:lang(zh){font-style:var(
--mod-detail-cjk-light-font-style,var(--spectrum-detail-cjk-light-font-style)
);font-weight:var(
--mod-detail-cjk-light-font-weight,var(--spectrum-detail-cjk-light-font-weight)
)}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ja) strong,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ko) strong,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong,.spectrum-Detail--light:lang(zh) strong{font-style:var(
--mod-detail-cjk-light-strong-font-style,var(--spectrum-detail-cjk-light-strong-font-style)
);font-weight:var(
--mod-detail-cjk-light-strong-font-weight,var(--spectrum-detail-cjk-light-strong-font-weight)
)}.spectrum-Detail--light:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ja) em,.spectrum-Detail--light:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) em,.spectrum-Detail--light:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) em{font-style:var(
--mod-detail-cjk-light-emphasized-font-style,var(--spectrum-detail-cjk-light-emphasized-font-style)
);font-weight:var(
--mod-detail-cjk-light-emphasized-font-weight,var(--spectrum-detail-cjk-light-emphasized-font-weight)
)}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized{font-style:var(
--mod-detail-cjk-light-strong-emphasized-font-style,var(--spectrum-detail-cjk-light-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-cjk-light-strong-emphasized-font-weight,var(--spectrum-detail-cjk-light-strong-emphasized-font-weight)
)}.spectrum-Detail--serif.spectrum-Detail--light{font-style:var(
--mod-detail-serif-light-font-style,var(--spectrum-detail-serif-light-font-style)
);font-weight:var(
--mod-detail-serif-light-font-weight,var(--spectrum-detail-serif-light-font-weight)
)}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--serif.spectrum-Detail--light strong{font-style:var(
--mod-detail-serif-light-strong-font-style,var(--spectrum-detail-serif-light-strong-font-style)
);font-weight:var(
--mod-detail-serif-light-strong-font-weight,var(--spectrum-detail-serif-light-strong-font-weight)
)}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em{font-style:var(
--mod-detail-serif-light-emphasized-font-style,var(--spectrum-detail-serif-light-emphasized-font-style)
);font-weight:var(
--mod-detail-serif-light-emphasized-font-weight,var(--spectrum-detail-serif-light-emphasized-font-weight)
)}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em strong,.spectrum-Detail--serif.spectrum-Detail--light strong em{font-style:var(
--mod-detail-serif-light-strong-emphasized-font-style,var(--spectrum-detail-serif-light-strong-emphasized-font-style)
);font-weight:var(
--mod-detail-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-serif-light-strong-emphasized-font-weight)
)}.spectrum-Typography .spectrum-Detail{margin-block-end:var(
--mod-detail-margin-end,var(--spectrum-detail-margin-end)
);margin-block-start:var(
--mod-detail-margin-start,var(--spectrum-detail-margin-start)
)}
`],ht=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,bt=(t,e,r,o)=>{for(var a,s=o>1?void 0:o?vt(e,r):e,i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o?a(e,r,s):a(s))||s);return o&&s&&ht(e,r,s),s};class gt extends(p(b(d(l(a),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"],noDefaultSize:!0}))){constructor(){super(...arguments),this.variant="standard",this._selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.value="",this.subheading="",this.handleFocusin=t=>{this.focused=!0,t.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[w,ut,pt]}get selected(){return this._selected}set selected(t){t!==this.selected&&(this._selected=t,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var t;null==(t=this.likeAnchor)||t.click()}handleFocusout(t){this.focused=!1,t.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;switch(e){case"Space":if(this.toggleSelected(),this.toggles){t.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(t){t.stopPropagation(),this.selected=t.target.checked,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(t){this.href&&t.stopPropagation()}handlePointerdown(t){if(t.composedPath().some((t=>"a"===t.localName)))return;const e=+new Date,r=()=>{+new Date-e<200&&this.click(),this.removeEventListener("pointerup",r),this.removeEventListener("pointercancel",r)};this.addEventListener("pointerup",r),this.addEventListener("pointercancel",r)}get renderHeading(){return s`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return s`
            <sp-asset id="preview" variant=${g(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${"quiet"===this.variant||this.horizontal?i:s`
                      <sp-divider size="s"></sp-divider>
                  `}
        `}get renderCoverImage(){return s`
            <sp-asset id="cover-photo" variant=${g(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${"quiet"===this.variant||this.horizontal?i:s`
                      <sp-divider size="s"></sp-divider>
                  `}
        `}get images(){const t=[];return this.hasPreview&&t.push(this.renderPreviewImage),this.hasCoverPhoto&&t.push(this.renderCoverImage),t}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return s`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return s`
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${"gallery"===this.variant?this.renderSubtitleAndDescription:i}
                    ${"quiet"!==this.variant||"s"!==this.size?s`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:i}
                </div>
                ${"gallery"!==this.variant?s`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:i}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):i}
            ${"standard"===this.variant?s`
                      <slot name="footer"></slot>
                  `:i}
            ${this.toggles?s`
                      <sp-quick-actions
                          class="quick-actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <sp-checkbox
                              class="checkbox"
                              @change=${this.handleSelectedChange}
                              ?checked=${this.selected}
                              tabindex="-1"
                          ></sp-checkbox>
                      </sp-quick-actions>
                  `:i}
            ${"quiet"===this.variant&&"s"===this.size?s`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:i}
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}bt([o()],gt.prototype,"asset",2),bt([o({reflect:!0})],gt.prototype,"variant",2),bt([o({type:Boolean,reflect:!0})],gt.prototype,"selected",1),bt([o()],gt.prototype,"heading",2),bt([o({type:Boolean,reflect:!0})],gt.prototype,"horizontal",2),bt([f("#like-anchor")],gt.prototype,"likeAnchor",2),bt([o({type:Boolean,reflect:!0})],gt.prototype,"focused",2),bt([o({type:Boolean,reflect:!0})],gt.prototype,"toggles",2),bt([o()],gt.prototype,"value",2),bt([o()],gt.prototype,"subheading",2),c("sp-card",gt),document.querySelector("sp-tabs").addEventListener("change",(t=>{const e=t.target,{selected:r}=e,{pathname:o}=location,a=o.search("api")>-1;switch(r){case"api":{if(a)return;const t=(o+"/api/").replace("//a","/a");history.pushState({},document.title,t);break}case"examples":{if(!a)return;const t=o.split("/api")[0]+"/";history.pushState({},document.title,t);break}}}));var ft=t`:host([scrollable]){overflow:auto;place-content:start center!important}.wrapper{margin:0 auto;max-width:580px;width:max-content}`,yt=class extends a{constructor(){super(...arguments),this.scrollable=!1,this.resizeController=new class{constructor(t,{target:e,config:r,callback:o,skipInitial:a}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==e&&this.t.add(null!=e?e:t),this.l=r,this.o=null!=a?a:this.o,this.callback=o,window.ResizeObserver?(this.u=new ResizeObserver((t=>{this.handleChanges(t),this.h.requestUpdate()})),t.addController(this)):console.warn("ResizeController error: browser does not support ResizeObserver.")}handleChanges(t){var e;this.value=null===(e=this.callback)||void 0===e?void 0:e.call(this,t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){!this.o&&this.i&&this.handleChanges([]),this.i=!1}observe(t){this.t.add(t),this.u.observe(t,this.l),this.i=!0,this.h.requestUpdate()}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}}(this,{callback:()=>this.shouldUpdateScrollableState()}),this.shouldUpdateScrollableState=()=>{const{offsetHeight:t,scrollHeight:e}=this;this.scrollable=t<e}}static get styles(){return[ft]}render(){return s`<div class="wrapper"><slot></slot></div>`}firstUpdated(){this.resizeController.observe(this.wrapper)}};e([o({type:Boolean,reflect:!0})],yt.prototype,"scrollable",2),e([f(".wrapper")],yt.prototype,"wrapper",2),yt=e([x("demo-container")],yt),"requestIdleCallback"in window?requestIdleCallback((()=>{import("./f026dc28.js"),import("./a086472f.js")})):requestAnimationFrame((()=>{import("./f026dc28.js"),import("./a086472f.js")}));var wt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n            <style>\n                :host {\n                    display: block;\n                    background-color: var(--spectrum-global-color-gray-50);\n                    color: var(--spectrum-global-color-gray-800);\n                    border: 1px solid;\n                    padding: 2em;\n                }\n            </style>\n            <slot></slot>\n        "}};customElements.define("styled-element",wt),document.querySelector('sp-tab-panel[value="api"]')?.addEventListener("click",(t=>{const e=t.composedPath().find((t=>"sp-table-row"===t.localName&&t.id));e&&(location.hash=e.id,t.target.dispatchEvent(new CustomEvent("copy-text",{bubbles:!0,composed:!0,detail:{text:e.dataset.value,message:`${e.dataset.name} copied to clipboard!`}})))}));export{et as F,L as g};
//# sourceMappingURL=43296512.js.map
