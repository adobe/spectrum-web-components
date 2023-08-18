import{i as t}from"./112b2095.js";import{n as e,S as o,x as s,d as i}from"./bd0a9f1e.js";import{F as r,O as a,l as c,i as l,a as n,L as d}from"./92bf7466.js";import{O as m}from"./4e68ac05.js";import{R as h}from"./645abf28.js";import{o as b}from"./64dd07df.js";import{S as u}from"./52dd9942.js";import"./daeb8e3a.js";import"./ff4c7038.js";import"./bdde1296.js";import"./938ed2cf.js";import"./6218a3ce.js";import"./0cc483f2.js";import"./16ab2288.js";import"./4a4b0658.js";import"./abbe30b0.js";import"./d6d0b127.js";import"./fb42b368.js";import"./9ddc847e.js";import"./4ac61a3f.js";var p=t`
:host{display:inline-flex}:host(:not([selected])){display:none}
`,v=Object.defineProperty,g=Object.getOwnPropertyDescriptor,f=(t,e,o,s)=>{for(var i,r=s>1?void 0:s?g(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(e,o,r):i(r))||r);return s&&r&&v(e,o,r),r};const y=class t extends o{constructor(){super(...arguments),this.selected=!1,this.value=""}handleFocusin(){this.removeAttribute("tabindex")}handleFocusout(){this.tabIndex=this.selected?0:-1}render(){return s`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id="sp-tab-panel-"+t.instanceCount++)}updated(t){t.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}};y.styles=[p],y.instanceCount=0,f([e({type:Boolean,reflect:!0})],y.prototype,"selected",2),f([e({type:String,reflect:!0})],y.prototype,"value",2),i("sp-tab-panel",y);var x=t`
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
)*-1);pointer-events:none;position:absolute}:host(:hover){color:var(
--highcontrast-tabs-color-hover,var(--mod-tabs-color-hover,var(--spectrum-tabs-color-hover))
)}:host([selected]){color:var(
--highcontrast-tabs-color-selected,var(--mod-tabs-color-selected,var(--spectrum-tabs-color-selected))
)}:host([disabled]){color:var(
--highcontrast-tabs-color-disabled,var(--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled))
);cursor:default}:host([disabled]) #item-label{cursor:default}:host(:focus),:host.focus-visible{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}:host(:focus),:host:focus-visible{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}:host(:focus):before,:host.focus-visible:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}:host(:focus):before,:host:focus-visible:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}#item-label{cursor:pointer;display:inline-block;font-family:var(--mod-tabs-font-family,var(--spectrum-tabs-font-family));font-size:var(--mod-tabs-font-weight,var(--spectrum-tabs-font-size));font-style:var(--mod-tabs-font-style,var(--spectrum-tabs-font-style));font-weight:var(--mod-tabs-font-weight,var(--spectrum-tabs-font-weight));line-height:var(--mod-tabs-line-height,var(--spectrum-tabs-line-height));margin-block-end:var(
--mod-tabs-bottom-to-text,var(--spectrum-tabs-bottom-to-text)
);margin-block-start:var(
--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text)
);-webkit-text-decoration:none;text-decoration:none;vertical-align:top}#item-label:empty{display:none}:host([disabled]){pointer-events:none}#item-label[hidden]{display:none}@media (forced-colors:active){:host:before{background-color:ButtonFace}:host ::slotted([slot=icon]){color:inherit;position:relative;z-index:1}#item-label{position:relative;z-index:1}:host([selected]){color:HighlightText}:host([selected]) ::slotted([slot=icon]){color:HighlightText}:host([selected]) #item-label{color:HighlightText}}:host([vertical]){align-items:center;display:flex;flex-direction:column;height:auto;justify-content:center}:host([dir][vertical]) slot[name=icon]+#item-label{margin-block-end:calc(var(--mod-tabs-bottom-to-text, var(--spectrum-tabs-bottom-to-text))/2);margin-block-start:calc(var(--mod-tabs-top-to-text, var(--spectrum-tabs-top-to-text))/2);margin-inline-start:0}:host([vertical]) ::slotted([slot=icon]){margin-block-start:calc(var(--mod-tabs-top-to-icon, var(--spectrum-tabs-top-to-icon))/2)}
`,k=Object.defineProperty,z=Object.getOwnPropertyDescriptor,w=(t,e,o,s)=>{for(var i,r=s>1?void 0:s?z(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(e,o,r):i(r))||r);return s&&r&&k(e,o,r),r};const S=class t extends(r(a(m(o,'[slot="icon"]'),""))){constructor(){super(...arguments),this.disabled=!1,this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[x]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return!!this.label||this.slotHasContent}render(){return s`
            ${this.hasIcon?s`
                      <slot name="icon"></slot>
                  `:s``}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?s``:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id="sp-tab-"+t.instanceCount++)}updated(t){super.updated(t),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}};S.instanceCount=0,w([e({type:Boolean,reflect:!0})],S.prototype,"disabled",2),w([e({reflect:!0})],S.prototype,"label",2),w([e({type:Boolean,reflect:!0})],S.prototype,"selected",2),w([e({type:Boolean,reflect:!0})],S.prototype,"vertical",2),w([e({type:String,reflect:!0})],S.prototype,"value",2),i("sp-tab",S);class C{constructor(t,{target:e,config:o,callback:s,skipInitial:i}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==e&&this.t.add(null!=e?e:t),this.o=null!=i?i:this.o,this.callback=s,window.IntersectionObserver?(this.u=new IntersectionObserver((t=>{const e=this.i;this.i=!1,this.o&&e||(this.handleChanges(t),this.h.requestUpdate())}),o),t.addController(this)):console.warn("IntersectionController error: browser does not support IntersectionObserver.")}handleChanges(t){var e;this.value=null===(e=this.callback)||void 0===e?void 0:e.call(this,t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){const t=this.u.takeRecords();t.length&&this.handleChanges(t)}observe(t){this.t.add(t),this.u.observe(t),this.i=!0}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}}let I=class{constructor(t,{target:e,config:o,callback:s,skipInitial:i}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==e&&this.t.add(null!=e?e:t),this.l=o,this.o=null!=i?i:this.o,this.callback=s,window.ResizeObserver?(this.u=new ResizeObserver((t=>{this.handleChanges(t),this.h.requestUpdate()})),t.addController(this)):console.warn("ResizeController error: browser does not support ResizeObserver.")}handleChanges(t){var e;this.value=null===(e=this.callback)||void 0===e?void 0:e.call(this,t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){!this.o&&this.i&&this.handleChanges([]),this.i=!1}observe(t){this.t.add(t),this.u.observe(t,this.l),this.i=!0,this.h.requestUpdate()}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}};var A=t`
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
);cursor:default}::slotted(:not([slot])).focus-visible,::slotted(:not([slot])):focus{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}::slotted(:not([slot])):focus,::slotted(:not([slot])):focus-visible{color:var(
--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus))
)}::slotted(:not([slot])).focus-visible:before,::slotted(:not([slot])):focus:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}::slotted(:not([slot])).focus-visible:before,::slotted(:not([slot])):focus:before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}::slotted(:not([slot])):focus-visible:before,::slotted(:not([slot])):focus:before{border-color:var(
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
) 0 var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)),transparent var(--mod-tabs-divider-size,var(--spectrum-tabs-divider-size)))}}#list{--spectrum-tabs-font-weight:var(--system-spectrum-tabs-font-weight)}:host{display:grid;grid-template-columns:100%;position:relative}:host(:not([direction^=vertical])){grid-template-rows:auto 1fr}:host([direction^=vertical]){grid-template-columns:auto 1fr}:host([dir=rtl]) #selection-indicator{left:0;right:auto}:host([direction=vertical-right]) #list #selection-indicator{inset-inline-end:0;inset-inline-start:auto}#list{justify-content:var(--swc-tabs-list-justify-content)}:host([disabled]) #list #selection-indicator{background-color:var(
--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled)
)}:host([disabled]) ::slotted(sp-tab){color:var(--mod-tabs-color-disabled,var(--spectrum-tabs-color-disabled))}:host([disabled]) #list{pointer-events:none}:host([direction=vertical-right]) #list #selection-indicator,:host([direction=vertical]) #list #selection-indicator{inset-block-start:0}#selection-indicator.first-position{transition:none}:host([dir][direction=horizontal]) #list.scroll{overflow-x:auto;scrollbar-width:none}:host([dir][direction=horizontal]) #list.scroll::-webkit-scrollbar{display:none}
`;var E=t`
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
`,j=Object.defineProperty,$=Object.getOwnPropertyDescriptor,T=(t,e,o,s)=>{for(var i,r=s>1?void 0:s?$(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(e,o,r):i(r))||r);return s&&r&&j(e,o,r),r};const q={baseSize:100,noSelectionStyle:"transform: translateX(0px) scaleX(0) scaleY(0)",transformX(t,e){return`transform: translateX(${t}px) scaleX(${e/this.baseSize});`},transformY(t,e){return`transform: translateY(${t}px) scaleY(${e/this.baseSize});`},baseStyles(){return t`
            :host([direction='vertical-right']) #selection-indicator,
            :host([direction='vertical']) #selection-indicator {
                height: ${this.baseSize}px;
            }
            :host([dir][direction='horizontal']) #selection-indicator {
                width: ${this.baseSize}px;
            }
        `}};class L extends(u(n)){constructor(){super(),this.auto=!1,this.compact=!1,this.direction="horizontal",this.emphasized=!1,this.label="",this.enableTabsScroll=!1,this.quiet=!1,this.selectionIndicatorStyle=q.noSelectionStyle,this.shouldAnimate=!1,this.selected="",this._tabs=[],this.resizeController=new I(this,{callback:()=>{this.updateSelectionIndicator()}}),this.rovingTabindexController=new h(this,{focusInIndex:t=>{let e=0;return t.find(((t,o)=>{const s=this.selected?!t.disabled&&t.value===this.selected:!t.disabled;return e=o,s}))?e:-1},direction:()=>"both",elementEnterAction:t=>{this.auto&&(this.shouldAnimate=!0,this.selectTarget(t))},elements:()=>this.tabs,isFocusableElement:t=>!t.disabled,listenerScope:()=>this.tabList}),this.onTabsScroll=()=>{this.dispatchEvent(new Event("sp-tabs-scroll",{bubbles:!0,composed:!0}))},this.onClick=t=>{if(this.disabled)return;const e=t.composedPath().find((t=>t.parentElement===this));!e||e.disabled||(this.shouldAnimate=!0,this.selectTarget(e))},this.onKeyDown=t=>{if("Enter"===t.code||"Space"===t.code){t.preventDefault();const e=t.target;e&&this.selectTarget(e)}},this.updateCheckedState=()=>{if(this.tabs.forEach((t=>{t.removeAttribute("selected")})),this.selected){const t=this.tabs.find((t=>t.value===this.selected));t?t.selected=!0:this.selected=""}else{const t=this.tabs[0];t&&t.setAttribute("tabindex","0")}this.updateSelectionIndicator()},this.updateSelectionIndicator=async()=>{const t=this.tabs.find((t=>t.selected));if(!t)return void(this.selectionIndicatorStyle=q.noSelectionStyle);await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:e,height:o}=t.getBoundingClientRect();this.selectionIndicatorStyle="horizontal"===this.direction?q.transformX(t.offsetLeft,e):q.transformY(t.offsetTop,o)},new C(this,{config:{root:null,rootMargin:"0px",threshold:[0,1]},callback:()=>{this.updateSelectionIndicator()}})}static get styles(){return[E,A,q.baseStyles()]}set tabs(t){t!==this.tabs&&(this._tabs.forEach((t=>{this.resizeController.unobserve(t)})),t.forEach((t=>{this.resizeController.observe(t)})),this._tabs=t,this.rovingTabindexController.clearElementCache())}get tabs(){return this._tabs}get focusElement(){return this.rovingTabindexController.focusInElement||this}scrollTabs(t,e="smooth"){var o;null==(o=this.tabList)||o.scrollBy({left:t,top:0,behavior:e})}get scrollState(){if(this.tabList){const{scrollLeft:t,clientWidth:e,scrollWidth:o}=this.tabList,s=Math.abs(t)>0,i=Math.ceil(Math.abs(t))<o-e;return{canScrollLeft:"ltr"===this.dir?s:i,canScrollRight:"ltr"===this.dir?i:s}}return{}}manageAutoFocus(){const t=[...this.children].map((t=>void 0!==t.updateComplete?t.updateComplete:Promise.resolve(!0)));Promise.all(t).then((()=>super.manageAutoFocus()))}managePanels({target:t}){t.assignedElements().map((t=>{const{value:e,id:o}=t,s=this.querySelector(`[role="tab"][value="${e}"]`);s&&(s.setAttribute("aria-controls",o),t.setAttribute("aria-labelledby",s.id)),t.selected=e===this.selected}))}render(){return s`
            <div
                class=${b({scroll:this.enableTabsScroll})}
                aria-label=${c(this.label?this.label:void 0)}
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
                    class=${c(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                    role="presentation"
                ></div>
            </div>
            <slot name="tab-panel" @slotchange=${this.managePanels}></slot>
        `}willUpdate(t){if(!this.hasUpdated){const t=this.querySelector(":scope > [selected]");t&&this.selectTarget(t)}if(super.willUpdate(t),t.has("selected")){if(this.tabs.length&&this.updateCheckedState(),t.get("selected")){const e=this.querySelector(`[role="tabpanel"][value="${t.get("selected")}"]`);e&&(e.selected=!1)}const e=this.querySelector(`[role="tabpanel"][value="${this.selected}"]`);e&&(e.selected=!0)}t.has("direction")&&("horizontal"===this.direction?this.removeAttribute("aria-orientation"):this.setAttribute("aria-orientation","vertical")),t.has("dir")&&this.updateSelectionIndicator(),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")),!this.shouldAnimate&&void 0!==t.get("shouldAnimate")&&(this.shouldAnimate=!0)}selectTarget(t){const e=t.getAttribute("value");if(e){const t=this.selected;this.selected=e,this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=t)}}onSlotChange(){this.tabs=this.slotEl.assignedElements().filter((t=>"tab"===t.getAttribute("role"))),this.updateCheckedState()}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}T([e({type:Boolean})],L.prototype,"auto",2),T([e({type:Boolean,reflect:!0})],L.prototype,"compact",2),T([e({reflect:!0})],L.prototype,"dir",2),T([e({reflect:!0})],L.prototype,"direction",2),T([e({type:Boolean,reflect:!0})],L.prototype,"emphasized",2),T([e()],L.prototype,"label",2),T([e({type:Boolean})],L.prototype,"enableTabsScroll",2),T([e({type:Boolean,reflect:!0})],L.prototype,"quiet",2),T([e({attribute:!1})],L.prototype,"selectionIndicatorStyle",2),T([e({attribute:!1})],L.prototype,"shouldAnimate",2),T([l("slot")],L.prototype,"slotEl",2),T([l("#list")],L.prototype,"tabList",2),T([e({reflect:!0})],L.prototype,"selected",2),i("sp-tabs",L);var O=Object.defineProperty,P=Object.getOwnPropertyDescriptor,B=(t,e,o,s)=>{for(var i,r=s>1?void 0:s?P(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(e,o,r):i(r))||r);return s&&r&&O(e,o,r),r};const U="transform: translateX(0px) scaleX(0) scaleY(0)";class F extends(u(o)){constructor(){super(...arguments),this.selectionIndicatorStyle=U,this.shouldAnimate=!1,this.quiet=!1,this.onClick=t=>{const e=t.target;this.shouldAnimate=!0,this.selectTarget(e)},this._items=[],this.resizeController=new I(this,{callback:()=>{this.updateSelectionIndicator()}}),this.updateSelectionIndicator=async()=>{const t=this.items.find((t=>t.value===this.selected||t.value===window.location.href));if(!t)return void(this.selectionIndicatorStyle=U);await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:e}=t.getBoundingClientRect();this.selectionIndicatorStyle=q.transformX(t.offsetLeft,e)}}static get styles(){return[E,A,q.baseStyles()]}set selected(t){const e=this.selected;t!==e&&(this.updateCheckedState(t),this._selected=t,this.requestUpdate("selected",e))}get selected(){return this._selected}get items(){return this._items}set items(t){t!==this.items&&(this._items.forEach((t=>{this.resizeController.unobserve(t)})),t.forEach((t=>{this.resizeController.observe(t)})),this._items=t)}manageItems(){this.items=this.slotEl.assignedElements({flatten:!0}).filter((t=>"sp-top-nav-item"===t.localName));const t=this.items.find((t=>t.value===window.location.href));t&&this.selectTarget(t)}render(){return s`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${c(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("direction","horizontal")}updated(t){super.updated(t),t.has("dir")&&this.updateSelectionIndicator(),!this.shouldAnimate&&void 0!==t.get("shouldAnimate")&&(this.shouldAnimate=!0)}selectTarget(t){const{value:e}=t;e&&(this.selected=e)}onSlotChange(){this.manageItems()}updateCheckedState(t){this.items.forEach((t=>{t.selected=!1})),requestAnimationFrame((()=>{if(t&&t.length){const e=this.items.find((e=>e.value===t||e.value===window.location.href));e?e.selected=!0:this.selected=""}this.updateSelectionIndicator()}))}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}B([e({reflect:!0})],F.prototype,"dir",2),B([e()],F.prototype,"selectionIndicatorStyle",2),B([e({attribute:!1})],F.prototype,"shouldAnimate",2),B([e({type:Boolean,reflect:!0})],F.prototype,"quiet",2),B([e({reflect:!0})],F.prototype,"selected",1),B([l("slot")],F.prototype,"slotEl",2),i("sp-top-nav",F);var D=t`
a{color:inherit}a:focus{outline:none}:host(:focus-within){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}:host(:focus-within):before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}:host(:focus-within) ::slotted([slot=icon]){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}@media (forced-colors:active){:host{--highcontrast-tabs-focus-indicator-color:canvastext}}
`,H=Object.defineProperty,R=Object.getOwnPropertyDescriptor,_=(t,e,o,s)=>{for(var i,r=s>1?void 0:s?R(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(e,o,r):i(r))||r);return s&&r&&H(e,o,r),r};class X extends(d(n)){constructor(){super(...arguments),this.selected=!1,this.value=""}static get styles(){return[x,D]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return s`
            <a
                id="item-label"
                href=${c(this.href)}
                download=${c(this.download)}
                target=${c(this.target)}
                aria-label=${c(this.label)}
                aria-current=${c(this.selected&&this.href?"page":void 0)}
                rel=${c(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(t){super.updated(t),this.value=this.anchor.href}}_([l("a")],X.prototype,"anchor",2),_([e({type:Boolean,reflect:!0})],X.prototype,"selected",2),i("sp-top-nav-item",X),document.querySelector("sp-tabs").addEventListener("change",(t=>{const e=t.target,{selected:o}=e,{pathname:s}=location,i=s.search("api")>-1;switch(o){case"api":{if(i)return;const t=(s+"/api/").replace("//a","/a");history.pushState({},document.title,t);break}case"examples":{if(!i)return;const t=s.split("/api")[0]+"/";history.pushState({},document.title,t);break}}})),"requestIdleCallback"in window?requestIdleCallback((()=>{import("./696bbd07.js"),import("./2b3eb925.js")})):requestAnimationFrame((()=>{import("./696bbd07.js"),import("./2b3eb925.js")}));var M=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n            <style>\n                :host {\n                    display: block;\n                    background-color: var(--spectrum-global-color-gray-50);\n                    color: var(--spectrum-global-color-gray-800);\n                    border: 1px solid;\n                    padding: 2em;\n                }\n            </style>\n            <slot></slot>\n        "}};customElements.define("styled-element",M),document.querySelector('sp-tab-panel[value="api"]')?.addEventListener("click",(t=>{const e=t.composedPath().find((t=>"sp-table-row"===t.localName&&t.id));e&&(location.hash=e.id,t.target.dispatchEvent(new CustomEvent("copy-text",{bubbles:!0,composed:!0,detail:{text:e.dataset.value,message:`${e.dataset.name} copied to clipboard!`}})))}));export{E as g,I as s};
//# sourceMappingURL=e0682854.js.map
