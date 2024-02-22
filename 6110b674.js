import{i as e}from"./112b2095.js";import{t}from"./e71a182c.js";import{S as o,n as r}from"./c34bcf8e.js";import{T as c,x as a,A as s,D as l}from"./e6d35ea0.js";import{d as i}from"./25a3ae37.js";import{l as n}from"./7923bf55.js";import{i as h}from"./17348440.js";import{l as d}from"./660f0d27.js";import"./0f7ffad2.js";import"./41a5d618.js";import{E as b}from"./a14259bb.js";import{S as u}from"./01b2daba.js";import{e as m,i as p,t as v}from"./16ab2288.js";import{c as g}from"./e65ed193.js";import{m as k,f as x,c as f,p as w,a as y}from"./e0584556.js";const _=(e,t,o)=>{const r=new Map;for(let c=t;c<=o;c++)r.set(e[c],c);return r},z=m(class extends p{constructor(e){if(super(e),e.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,t,o){let r;void 0===o?o=t:void 0!==t&&(r=t);const c=[],a=[];let s=0;for(const t of e)c[s]=r?r(t,s):s,a[s]=o(t,s),s++;return{values:a,keys:c}}render(e,t,o){return this.ct(e,t,o).values}update(e,[t,o,r]){var a;const s=k(e),{values:l,keys:i}=this.ct(t,o,r);if(!Array.isArray(s))return this.ut=i,l;const n=null!==(a=this.ut)&&void 0!==a?a:this.ut=[],h=[];let d,b,u=0,m=s.length-1,p=0,v=l.length-1;for(;u<=m&&p<=v;)if(null===s[u])u++;else if(null===s[m])m--;else if(n[u]===i[p])h[p]=x(s[u],l[p]),u++,p++;else if(n[m]===i[v])h[v]=x(s[m],l[v]),m--,v--;else if(n[u]===i[v])h[v]=x(s[u],l[v]),f(e,h[v+1],s[u]),u++,v--;else if(n[m]===i[p])h[p]=x(s[m],l[p]),f(e,s[u],s[m]),m--,p++;else if(void 0===d&&(d=_(i,p,v),b=_(n,u,m)),d.has(n[u]))if(d.has(n[m])){const t=b.get(i[p]),o=void 0!==t?s[t]:null;if(null===o){const t=f(e,s[u]);x(t,l[p]),h[p]=t}else h[p]=x(o,l[p]),f(e,s[u],o),s[t]=null;p++}else w(s[m]),m--;else w(s[u]),u++;for(;p<=v;){const t=f(e,h[v+1]);x(t,l[p]),h[p++]=t}for(;u<=m;){const e=s[u++];null!==e&&w(e)}return this.ut=i,y(e,h),c}});var C=e`
:host{border:none;position:relative}:host([drop-target]){outline-color:var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)
)
);outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
);--mod-table-border-color:transparent}:host{display:table-row-group}:host{border-block:var(
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
`,I=Object.defineProperty,S=Object.getOwnPropertyDescriptor;class E extends o{constructor(){super(),this.role="rowgroup",new t(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame((()=>{this.shouldHaveTabIndex()}))}})}static get styles(){return[C]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex")}render(){return a`
            <slot></slot>
        `}}((e,t,o,r)=>{for(var c,a=r>1?void 0:r?S(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);r&&a&&I(t,o,a)})([r({reflect:!0})],E.prototype,"role",2),i("sp-table-body",E);var T=e`
@media (forced-colors:active){:host(.focus-visible) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([focused]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-row-text-color-hover) 1px solid}:host(:focus-visible) .spectrum-Table-checkbox .spectrum-Checkbox-box:before,:host([focused]) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-row-text-color-hover) 1px solid}@media (hover:hover){:host(:hover) .spectrum-Table-checkbox .spectrum-Checkbox-box:before{outline:var(--highcontrast-table-row-text-color-hover) 1px solid}}:host([drop-target]),:host([drop-target]) .spectrum-Table-body,:host([selected]){--highcontrast-table-cell-focus-indicator-color:var(
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
)}:host(:focus){outline:0}:host(.focus-visible),:host([focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-row-text-color-hover
);--highcontrast-table-icon-color:var(
--highcontrast-table-row-text-color-hover
);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color-hover,var(
--mod-table-row-background-color-hover,var(--spectrum-table-row-background-color-hover)
)
)}:host(:focus-visible),:host([focused]){--highcontrast-table-row-text-color:var(
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
)}:host([selected].focus-visible),:host([selected][focused]){--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color-focus
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color-focus
);--spectrum-table-cell-background-color:var(
--spectrum-table-selected-cell-background-color-focus
)}:host([selected]:focus-visible),:host([selected][focused]){--highcontrast-table-row-text-color:var(
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
)}:host([drop-target]){outline-color:var(
--highcontrast-table-focus-indicator-color,var(
--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)
)
);outline-offset:calc(var(
--mod-table-focus-indicator-thickness,
var(--spectrum-table-focus-indicator-thickness)
)*-1);outline-style:solid;outline-width:var(
--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness)
);--mod-table-border-color:var(
--highcontrast-table-focus-indicator-color,transparent
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
) - var(--mod-table-border-width, var(--spectrum-table-border-width)));text-align:start}:host{display:table-row}:host(:first-child) .spectrum-Table-scroller .spectrum-Table-body ::slotted(*){border-block-start:none;border-radius:0}:host(:last-child) .spectrum-Table-scroller .spectrum-Table-body ::slotted(*){border-block-end:none;border-radius:0}:host .spectrum-Table-scroller .spectrum-Table-body ::slotted(:first-child){border-inline-start:none}:host .spectrum-Table-scroller .spectrum-Table-body ::slotted(:last-child){border-inline-end:none}.spectrum-Table-row--collapsible{--spectrum-table-row-tier:0}:host([data-tier="1"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:1}:host([data-tier="2"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:2}:host([data-tier="3"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:3}:host([data-tier="4"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:4}:host([data-tier="5"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:5}:host([data-tier="6"]) .spectrum-Table-row--collapsible{--spectrum-table-row-tier:6}.spectrum-Table-row--collapsible .spectrum-Table-checkboxCell{padding-inline-end:0}.spectrum-Table-row--collapsible.is-last-tier .spectrum-Table-cell--collapsible{padding-inline-start:calc(var(--spectrum-table-row-tier)*var(--spectrum-table-collapsible-tier-indent) + var(
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
)}:host([hidden]) .spectrum-Table-row--collapsible{display:none}@media (hover:hover){:host([selected]:hover){--highcontrast-table-row-text-color:var(
--highcontrast-table-selected-row-text-color-focus
);--highcontrast-table-icon-color:var(
--highcontrast-table-selected-row-text-color-focus
);--spectrum-table-cell-background-color:var(
--spectrum-table-selected-cell-background-color-focus
)}:host(:hover){--highcontrast-table-row-text-color:var(
--highcontrast-table-row-text-color-hover
);--highcontrast-table-icon-color:var(
--highcontrast-table-row-text-color-hover
);--spectrum-table-cell-background-color:var(
--highcontrast-table-row-background-color-hover,var(
--mod-table-row-background-color-hover,var(--spectrum-table-row-background-color-hover)
)
)}.spectrum-Table-row--sectionHeader:hover{--highcontrast-table-row-text-color:var(
--highcontrast-table-section-header-text-color
);--spectrum-table-cell-background-color:var(
--highcontrast-table-section-header-background-color,var(
--mod-table-section-header-background-color,var(--spectrum-table-section-header-background-color)
)
)}}.spectrum-Table-row--thumbnail{--table-thumbnail-cell-block-spacing:var(
--mod-table-thumbnail-block-spacing,var(--spectrum-table-thumbnail-block-spacing)
);--table-thumbnail-inner-content-block-spacing:max(0px,calc((var(
--mod-table-thumbnail-size,
var(--spectrum-table-thumbnail-size)
) - (var(
--mod-table-row-line-height,
var(--spectrum-table-row-line-height)
)*var(--mod-table-header-font-size,
var(--spectrum-table-row-font-size))))/2))}.spectrum-Table-row--thumbnail ::slotted(*){padding-block:calc(var(--table-thumbnail-cell-block-spacing) + var(--table-thumbnail-inner-content-block-spacing))}.spectrum-Table-row--thumbnail .spectrum-Table-cell--thumbnail{padding-block:0}.spectrum-Table-row--thumbnail.spectrum-Table-row--collapsible{--table-thumbnail-inner-minimum-block-spacing:max(0px,calc((var(
--mod-table-disclosure-icon-size,
var(--spectrum-table-disclosure-icon-size)
) - var(
--mod-table-thumbnail-size,
var(--spectrum-table-thumbnail-size)
))/2));--table-thumbnail-cell-block-spacing:max(var(
--mod-table-thumbnail-block-spacing,var(--spectrum-table-thumbnail-block-spacing)
),var(--table-thumbnail-inner-minimum-block-spacing))}:host,:host([role=row]){display:flex;width:100%}:host(:first-child) ::slotted(*){border-block-start:none}:host(:last-child) ::slotted(*){border-block-end:none}::slotted(:first-child){border-inline-start:none}::slotted(:last-child){border-inline-end:none}
`,A=Object.defineProperty,L=Object.getOwnPropertyDescriptor,O=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?L(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&A(t,o,a),a};class H extends o{constructor(){super(...arguments),this.role="row",this.selectable=!1,this.selected=!1,this.value=""}static get styles(){return[T]}async handleChange(e){e.target.checkbox&&(this.selected=e.target.checkbox.checked,await 0,e.defaultPrevented&&(this.selected=!this.selected))}handleSlotchange({target:e}){const t=e.assignedElements();this.selectable=!!t.find((e=>"sp-table-checkbox-cell"===e.localName))}async manageSelected(){await this.updateComplete,this.selectable?this.setAttribute("aria-selected",this.selected?"true":"false"):this.removeAttribute("aria-selected");const[e]=this.checkboxCells;e&&(e.checked=this.selected)}handleClick(e){if(e.composedPath().find((e=>"sp-table-checkbox-cell"===e.localName)))return;const[t]=this.checkboxCells;t&&t.click()}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(e){e.has("selected")&&this.manageSelected(),e.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick))}}O([n({selector:"sp-table-checkbox-cell",flatten:!0})],H.prototype,"checkboxCells",2),O([r({reflect:!0})],H.prototype,"role",2),O([r({type:Boolean})],H.prototype,"selectable",2),O([r({type:Boolean,reflect:!0})],H.prototype,"selected",2),O([r({type:String})],H.prototype,"value",2),i("sp-table-row",H);var j=Object.defineProperty,R=Object.getOwnPropertyDescriptor,V=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?R(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&j(t,o,a),a};function U(e){class t extends e{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}handleChange(){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const e=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(e)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return a`
                <input
                    id="input"
                    name=${d(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}}return V([r({type:Boolean,reflect:!0})],t.prototype,"checked",2),V([r({type:String,reflect:!0})],t.prototype,"name",2),V([r({type:Boolean,reflect:!0})],t.prototype,"readonly",2),V([h("#input")],t.prototype,"inputElement",2),t}var D=e`
:host{--spectrum-checkbox-content-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-checkbox-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-checkbox-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-checkbox-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-checkbox-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-checkbox-content-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-checkbox-control-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-checkbox-checkmark-color:var(--spectrum-gray-75);--spectrum-checkbox-invalid-color-default:var(
--spectrum-negative-color-900
);--spectrum-checkbox-invalid-color-hover:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-invalid-color-down:var(--spectrum-negative-color-1100);--spectrum-checkbox-invalid-color-focus:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-emphasized-color-default:var(
--spectrum-accent-color-900
);--spectrum-checkbox-emphasized-color-hover:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-emphasized-color-down:var(
--spectrum-accent-color-1100
);--spectrum-checkbox-emphasized-color-focus:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-control-selected-color-default:var(
--spectrum-neutral-background-color-selected-default
);--spectrum-checkbox-control-selected-color-hover:var(
--spectrum-neutral-background-color-selected-hover
);--spectrum-checkbox-control-selected-color-down:var(
--spectrum-neutral-background-color-selected-down
);--spectrum-checkbox-control-selected-color-focus:var(
--spectrum-neutral-background-color-selected-key-focus
);--spectrum-checkbox-line-height:var(--spectrum-line-height-100);--spectrum-checkbox-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-checkbox-control-corner-radius:var(--spectrum-corner-radius-75);--spectrum-checkbox-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-checkbox-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-checkbox-border-width:var(--spectrum-border-width-200);--spectrum-checkbox-selected-border-width:calc(var(--spectrum-checkbox-control-size)/2);--spectrum-checkbox-animation-duration:var(
--spectrum-animation-duration-100
)}:host([size=s]){--spectrum-checkbox-font-size:var(--spectrum-font-size-75);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-small
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host{--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=l]){--spectrum-checkbox-font-size:var(--spectrum-font-size-200);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(--spectrum-font-size-300);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-extra-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-300)}:host{align-items:flex-start;color:var(
--highcontrast-checkbox-content-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);max-inline-size:100%;min-block-size:var(--mod-checkbox-height,var(--spectrum-checkbox-height));position:relative}:host:active #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)
)
)}:host:active #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)
)
)}:host:active #label{color:var(
--highcontrast-checkbox-content-color-down,var(
--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)
)
)}:host([invalid][invalid]) #box:before,:host([invalid][invalid]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
)}:host([invalid][invalid]) #input.focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][invalid]) #input:focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([readonly]){border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]):active #box:before{border-color:var(
--highcontrast-checkbox-selected-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);forced-color-adjust:none}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{display:block;opacity:1;transform:scale(1)}:host([indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)
)
)}:host([indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)
)
)}:host([invalid][invalid][indeterminate]) #box:before,:host([invalid][invalid][indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before,:host([emphasized][indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-default,var(--spectrum-checkbox-emphasized-color-default)
)
)}:host([emphasized]) #input.focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized]) #input:focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized][invalid][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid][invalid]) #input:focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}@media (hover:hover){:host([invalid][invalid]:hover) #box:before,:host([invalid][invalid]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([readonly]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([indeterminate]:hover) #box:before,:host([indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host([invalid][invalid][indeterminate]:hover) #box:before,:host([invalid][invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host(:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-color-hover,var(--spectrum-checkbox-control-color-hover)
)
)}:host(:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host(:hover) #label,:host([invalid][invalid][indeterminate]:hover) #label{color:var(
--highcontrast-checkbox-content-color-hover,var(
--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before,:host([emphasized][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized][invalid][invalid]:hover) #input:checked+#box:before,:host([emphasized][invalid][invalid][indeterminate]:hover) #box:before,:host([emphasized][invalid][invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before,:host([emphasized][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}}:host([emphasized]):active #input:checked+#box:before,:host([emphasized][indeterminate]):active #box:before,:host([emphasized][indeterminate]):active #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)
)
)}:host([emphasized][invalid][invalid]):active #box:before,:host([emphasized][invalid][invalid]):active #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)
)
)}:host([emphasized].focus-visible) #box:before,:host([emphasized].focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized]:focus-visible) #box:before,:host([emphasized]:focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}#label{font-size:var(
--mod-checkbox-font-size,var(--spectrum-checkbox-font-size)
);line-height:var(
--mod-checkbox-line-height,var(--spectrum-checkbox-line-height)
);margin-block-start:var(
--mod-checkbox-top-to-text,var(--spectrum-checkbox-top-to-text)
);margin-inline-start:var(
--mod-checkbox-text-to-control,var(--spectrum-checkbox-text-to-control)
);text-align:start;transition:color var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#label:lang(ja),#label:lang(ko),#label:lang(zh){line-height:var(
--mod-checkbox-line-height-cjk,var(--spectrum-checkbox-line-height-cjk)
)}#input{block-size:100%;box-sizing:border-box;color:var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
);cursor:pointer;font-family:inherit;font-size:100%;inline-size:100%;line-height:1.15;margin:0;opacity:.0001;overflow:visible;padding:0;position:absolute;z-index:1}#input:disabled{cursor:default}#input:checked+#box:before{background-color:var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
);border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}#input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input:focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input.focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#input:focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)
)
)}#input:focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)
)
)}#box{block-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);box-sizing:border-box;inline-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);--spectrum-checkbox-spacing:calc(var(--mod-checkbox-height, var(--spectrum-checkbox-height)) - var(
--mod-checkbox-control-size,
var(--spectrum-checkbox-control-size)
));align-items:center;display:flex;flex-grow:0;flex-shrink:0;justify-content:center;margin:calc(var(--mod-checkbox-spacing, var(--spectrum-checkbox-spacing))/2) 0;position:relative}#box:before{block-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
)
);border-radius:var(
--mod-checkbox-control-corner-radius,var(--spectrum-checkbox-control-corner-radius)
);border-style:solid;border-width:var(
--mod-checkbox-border-width,var(--spectrum-checkbox-border-width)
);box-sizing:border-box;content:"";display:block;forced-color-adjust:none;inline-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);position:absolute;transition:border var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out;z-index:0}#box:after{border-radius:calc(var(
--mod-checkbox-control-corner-radius,
var(--spectrum-checkbox-control-corner-radius)
) + var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
));content:"";display:block;inset-block:0;inset-inline:0;margin:var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
);position:absolute;transform:translate(0);transition:box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out,margin var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out}#checkmark,#partialCheckmark{color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);opacity:0;transform:scale(0);transition:opacity var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,transform var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#partialCheckmark{display:none}#input:checked:disabled+#box:before,#input:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-control-color-disabled,var(--spectrum-checkbox-control-color-disabled)
)
)}#input:checked:disabled~#label,#input:disabled~#label{color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-content-color-disabled,var(--spectrum-checkbox-content-color-disabled)
)
);forced-color-adjust:none}@media (forced-colors:active){#input.focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}#input:focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}:host{--highcontrast-checkbox-content-color-default:CanvasText;--highcontrast-checkbox-content-color-hover:CanvasText;--highcontrast-checkbox-content-color-down:CanvasText;--highcontrast-checkbox-content-color-focus:CanvasText;--highcontrast-checkbox-background-color-default:Canvas;--highcontrast-checkbox-color-default:ButtonText;--highcontrast-checkbox-color-hover:ButtonText;--highcontrast-checkbox-color-focus:Highlight;--highcontrast-checkbox-highlight-color-default:Highlight;--highcontrast-checkbox-highlight-color-hover:Highlight;--highcontrast-checkbox-highlight-color-down:Highlight;--highcontrast-checkbox-highlight-color-focus:Highlight;--highcontrast-checkbox-disabled-color-default:GrayText;--highcontrast-checkbox-focus-indicator-color:CanvasText}}:host{--spectrum-checkbox-control-color-default:var(
--system-spectrum-checkbox-control-color-default
);--spectrum-checkbox-control-color-hover:var(
--system-spectrum-checkbox-control-color-hover
);--spectrum-checkbox-control-color-down:var(
--system-spectrum-checkbox-control-color-down
);--spectrum-checkbox-control-color-focus:var(
--system-spectrum-checkbox-control-color-focus
)}:host{display:inline-flex;vertical-align:top}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`;var B=e`
.spectrum-UIIcon-Dash50{--spectrum-icon-size:var(--spectrum-dash-icon-size-50)}.spectrum-UIIcon-Dash75{--spectrum-icon-size:var(--spectrum-dash-icon-size-75)}.spectrum-UIIcon-Dash100{--spectrum-icon-size:var(--spectrum-dash-icon-size-100)}.spectrum-UIIcon-Dash200{--spectrum-icon-size:var(--spectrum-dash-icon-size-200)}.spectrum-UIIcon-Dash300{--spectrum-icon-size:var(--spectrum-dash-icon-size-300)}.spectrum-UIIcon-Dash400{--spectrum-icon-size:var(--spectrum-dash-icon-size-400)}.spectrum-UIIcon-Dash500{--spectrum-icon-size:var(--spectrum-dash-icon-size-500)}.spectrum-UIIcon-Dash600{--spectrum-icon-size:var(--spectrum-dash-icon-size-600)}
`,M=Object.defineProperty,$=Object.getOwnPropertyDescriptor,P=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?$(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&M(t,o,a),a};const N={s:()=>a`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `,m:()=>a`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `,l:()=>a`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `,xl:()=>a`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `},F={s:()=>a`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `,m:()=>a`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `,l:()=>a`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `,xl:()=>a`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `};class q extends(u(U(o),{noDefaultSize:!0})){constructor(){super(...arguments),this.disabled=!1,this.indeterminate=!1,this.invalid=!1,this.emphasized=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.hasAttribute("autofocus")&&this.updateComplete.then((()=>{this.focus()}))}static get styles(){return[D,b,B]}click(){var e;this.disabled||null==(e=this.inputElement)||e.click()}handleChange(){this.indeterminate=!1,super.handleChange()}render(){return a`
            ${super.render()}
            <span id="box">
                ${this.checked?N[this.size]():a``}
                ${this.indeterminate?F[this.size]():a``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `}updated(e){super.updated(e),e.has("disabled")&&(void 0!==e.get("disabled")||this.disabled)&&(this.disabled?(this.inputElement.tabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this.inputElement.tabIndex,this.inputElement.removeAttribute("tabindex")),this.inputElement.disabled=this.disabled),e.has("indeterminate")&&(this.inputElement.indeterminate=this.indeterminate),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid"))}}q.shadowRootOptions={...o.shadowRootOptions,delegatesFocus:!0},P([r({type:Boolean,reflect:!0})],q.prototype,"disabled",2),P([r({type:Boolean,reflect:!0})],q.prototype,"indeterminate",2),P([r({type:Boolean,reflect:!0})],q.prototype,"invalid",2),P([r({type:Boolean,reflect:!0})],q.prototype,"emphasized",2),P([r({reflect:!0,type:Number,attribute:"tabindex"})],q.prototype,"tabIndex",2),i("sp-checkbox",q);var W=e`
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
)}:host(:not([head-cell])){background-color:var(--spectrum-table-cell-background-color);block-size:var(
--mod-table-min-row-height,var(--spectrum-table-min-row-height)
);border-block-start:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-divider-color,var(--mod-table-divider-color,var(--spectrum-table-divider-color))
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
`,K=Object.defineProperty,G=Object.getOwnPropertyDescriptor,J=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?G(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&K(t,o,a),a};class Q extends o{constructor(){super(...arguments),this.headCell=!1,this.role="gridcell",this.indeterminate=!1,this.checked=!1,this.disabled=!1,this.selectsSingle=!1,this.emphasized=!1}static get styles(){return[W]}click(){this.checkbox.click()}render(){return a`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                ?emphasized=${this.emphasized}
                aria-hidden=${d(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}J([r({type:Boolean,reflect:!0,attribute:"head-cell"})],Q.prototype,"headCell",2),J([r({reflect:!0})],Q.prototype,"role",2),J([h(".checkbox")],Q.prototype,"checkbox",2),J([r({type:Boolean})],Q.prototype,"indeterminate",2),J([r({type:Boolean})],Q.prototype,"checked",2),J([r({type:Boolean})],Q.prototype,"disabled",2),J([r({type:Boolean,reflect:!0,attribute:"selects-single"})],Q.prototype,"selectsSingle",2),J([r({type:Boolean,reflect:!0})],Q.prototype,"emphasized",2),i("sp-table-checkbox-cell",Q);var X=e`
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
)}:host([dir=rtl]),[dir=rtl] :host{--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host([size=s]){--spectrum-table-min-header-height:var(--spectrum-component-height-100);--spectrum-table-header-top-to-text:var(
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
)}@media (forced-colors:active){:host{--highcontrast-table-row-background-color:Canvas;--highcontrast-table-row-text-color:CanvasText;--highcontrast-table-divider-color:CanvasText;--highcontrast-table-border-color:CanvasText;--highcontrast-table-icon-color:CanvasText;--highcontrast-table-icon-color-focus:Highlight;--highcontrast-table-selected-row-background-color:Highlight;--highcontrast-table-selected-row-text-color:HighlightText;--highcontrast-table-selected-row-text-color-default:HighlightText}@supports (color:SelectedItem){:host{--highcontrast-table-selected-row-background-color:SelectedItem;--highcontrast-table-selected-row-text-color:SelectedItemText;--highcontrast-table-selected-row-text-color-default:SelectedItemText}}:host{--highcontrast-table-selected-row-background-color-focus:Highlight;--highcontrast-table-selected-row-text-color-focus:HighlightText;--highcontrast-table-row-background-color-hover:Highlight;--highcontrast-table-row-text-color-hover:HighlightText;--highcontrast-table-section-header-text-color:Canvas;--highcontrast-table-section-header-background-color:CanvasText;--highcontrast-table-focus-indicator-color:Highlight;--highcontrast-table-transition-duration:0}}:host:not(.spectrum-Table-scroller){border-collapse:separate;border-spacing:0;display:table}:host{display:flex;flex-direction:column}
`;class Y extends Event{constructor(e){super(Y.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}Y.eventName="rangeChanged";class Z extends Event{constructor(e){super(Z.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}Z.eventName="visibilityChanged";class ee extends Event{constructor(){super(ee.eventName,{bubbles:!1})}}ee.eventName="unpinned";class te{constructor(e){this._element=null;const t=null!=e?e:window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}}class oe extends te{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);const o=this._node;this._originalScrollTo=o.scrollTo,this._originalScrollBy=o.scrollBy,this._originalScroll=o.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){const o="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;this._scrollTo(o)}scrollBy(e,t){const o="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==o.top&&(o.top+=this.scrollTop),void 0!==o.left&&(o.left+=this.scrollLeft),this._scrollTo(o)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,o=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=o):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:o}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),o=void 0===o?void 0:Math.max(0,Math.min(o,this.maxScrollLeft)),(null===this._destination||o!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:o,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,o){return this._scrollTo(e,t,o),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame((()=>requestAnimationFrame((()=>this.correctingScrollError=!1)))),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){const{scrollTop:e,scrollLeft:t}=this;let{top:o,left:r}=this._destination;o=Math.min(o||0,this.maxScrollTop),r=Math.min(r||0,this.maxScrollLeft);const c=Math.abs(o-e),a=Math.abs(r-t);c<1&&a<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}}let re=null===window||void 0===window?void 0:window.ResizeObserver;const ce=Symbol("virtualizerRef"),ae="virtualizer-sizer";let se;class le{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,!e)throw new Error("Virtualizer constructor requires a configuration object");if(!e.hostElement)throw new Error('Virtualizer configuration requires the "hostElement" property');this._init(e)}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);const t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new re((()=>this._hostElementSizeChanged())),this._childrenRO=new re(this._childrenSizeChanged.bind(this))}_initHostElement(e){const t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[ce]=this}connected(){this._initObservers();const e=this._isScroller;this._clippingAncestors=function(e,t=!1){let o=!1;return function(e,t=!1){const o=[];let r=t?e:ne(e);for(;null!==r;)o.push(r),r=ne(r);return o}(e,t).filter((e=>{if(o)return!1;const t=getComputedStyle(e);return o="fixed"===t.position,"visible"!==t.overflow}))}(this._hostElement,e),this._scrollerController=new oe(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen()}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach((e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)})),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach((e=>this._childrenRO.observe(e))),this._scrollEventListeners.forEach((e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions)))}disconnected(){this._scrollEventListeners.forEach((e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions))),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController.detach(this),this._scrollerController=null,this._mutationObserver.disconnect(),this._hostElementRO.disconnect(),this._childrenRO.disconnect(),this._rejectLayoutCompletePromise("disconnected")}_applyVirtualizerStyles(){const e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){const e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${ae}]`);t||(t=document.createElement("div"),t.setAttribute(ae,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(ae,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;const t=e.type||se;if("function"==typeof t&&this._layout instanceof t){const t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,o;if("function"==typeof e.type){o=e.type;const r={...e};delete r.type,t=r}else t=e;void 0===o&&(se=o=(await import("./6495af92.js")).FlowLayout),this._layout=new o((e=>this._handleLayoutMessage(e)),t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){const e=window.performance.now(),t=e-this._benchmarkStart,o=performance.getEntriesByName("uv-virtualizing","measure").filter((t=>t.startTime>=this._benchmarkStart&&t.startTime<e)).reduce(((e,t)=>e+t.duration),0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:o}}return null}_measureChildren(){const e={},t=this._children,o=this._measureChildOverride||this._measureChild;for(let r=0;r<t.length;r++){const c=t[r],a=this._first+r;(this._itemsChanged||this._toBeMeasured.has(c))&&(e[a]=o.call(this,c,this._items[a]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){const{width:t,height:o}=e.getBoundingClientRect();return Object.assign({width:t,height:o},function(e){const t=window.getComputedStyle(e);return{marginTop:ie(t.marginTop),marginRight:ie(t.marginRight),marginBottom:ie(t.marginBottom),marginLeft:ie(t.marginLeft)}}(e))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;const{_rangeChanged:t,_itemsChanged:o}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||o)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._children.forEach((e=>this._childrenRO.observe(e))),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end")}_updateLayout(){this._layout&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){var e;if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&(null===(e=this._layout)||void 0===e||e.unpin()),this._schedule(this._updateLayout)}handleEvent(e){if("scroll"===e.type)(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent();else console.warn("event not handled",e)}_handleLayoutMessage(e){"stateChanged"===e.type?this._updateDOM(e):"visibilityChanged"===e.type?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):"unpinned"===e.type&&this._hostElement.dispatchEvent(new ee)}get _children(){const e=[];let t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(ae)||e.push(t),t=t.nextElementSibling;return e}_updateView(){var e;const t=this._hostElement,o=null===(e=this._scrollerController)||void 0===e?void 0:e.element,r=this._layout;if(t&&o&&r){let e,c,a,s;const l=t.getBoundingClientRect();e=0,c=0,a=window.innerHeight,s=window.innerWidth;const i=this._clippingAncestors.map((e=>e.getBoundingClientRect()));i.unshift(l);for(const t of i)e=Math.max(e,t.top),c=Math.max(c,t.left),a=Math.min(a,t.bottom),s=Math.min(s,t.right);const n=o.getBoundingClientRect(),h={left:l.left-n.left,top:l.top-n.top},d={width:o.scrollWidth,height:o.scrollHeight},b=e-l.top+t.scrollTop,u=c-l.left+t.scrollLeft,m=Math.max(1,a-e),p=Math.max(1,s-c);r.viewportSize={width:p,height:m},r.viewportScroll={top:b,left:u},r.totalScrollSize=d,r.offsetWithinScroller=h}}_sizeHostElement(e){const t=82e5,o=e&&null!==e.width?Math.min(t,e.width):0,r=e&&null!==e.height?Math.min(t,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${o}px, ${r}px)`;else{const e=this._hostElement.style;e.minWidth=o?`${o}px`:"100%",e.minHeight=r?`${r}px`:"100%"}}_positionChildren(e){e&&e.forEach((({top:e,left:t,width:o,height:r,xOffset:c,yOffset:a},s)=>{const l=this._children[s-this._first];l&&(l.style.position="absolute",l.style.boxSizing="border-box",l.style.transform=`translate(${t}px, ${e}px)`,void 0!==o&&(l.style.width=o+"px"),void 0!==r&&(l.style.height=r+"px"),l.style.left=void 0===c?null:c+"px",l.style.top=void 0===a?null:a+"px")}))}async _adjustRange(e){const{_first:t,_last:o,_firstVisible:r,_lastVisible:c}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==o,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==r||this._lastVisible!==c}_correctScrollError(){if(this._scrollError){const{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:o,left:r}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-o,left:t-r})}}element(e){var t;return e===1/0&&(e=this._items.length-1),void 0===(null===(t=this._items)||void 0===t?void 0:t[e])?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){const t=this._layout.getScrollIntoViewCoordinates(e),{behavior:o}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:o}),(()=>this._layout.getScrollIntoViewCoordinates(e)),(()=>this._scrollIntoViewTarget=null)),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){const{index:t}=this._scrollIntoViewTarget||{};t&&(null==e?void 0:e.has(t))&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new Y({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Z({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise(((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t}))),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame((()=>requestAnimationFrame((()=>this._resolveLayoutCompletePromise())))))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){var t;if(null===(t=this._layout)||void 0===t?void 0:t.measureChildren){for(const t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}}function ie(e){const t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function ne(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;const t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}const he=e=>e,de=(e,t)=>a`${t}: ${JSON.stringify(e,null,2)}`;const be=m(class extends g{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>de(e,t+this._first),this._keyFunction=(e,t)=>he(e,this._first),this._items=[],e.type!==v.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);const t=[];if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<=this._last;e++)t.push(this._items[e]);return z(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);const o=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),o?c:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){const o=e.parentNode;this._makeVirtualizer(o,t)}this._virtualizer.items=this._items}_setFunctions(e){const{renderItem:t,keyFunction:o}=e;t&&(this._renderItem=(e,o)=>t(e,o+this._first)),o&&(this._keyFunction=(e,t)=>o(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();const{layout:o,scroller:r,items:c}=t;this._virtualizer=new le({hostElement:e,layout:o,scroller:r}),this._virtualizer.items=c,this._virtualizer.connected()}_initialize(e,t){const o=e.parentNode;o&&1===o.nodeType&&(o.addEventListener("rangeChanged",(e=>{this._first=e.first,this._last=e.last,this.setValue(this.render())})),this._makeVirtualizer(o,t))}disconnected(){var e;null===(e=this._virtualizer)||void 0===e||e.disconnected()}reconnected(){var e;null===(e=this._virtualizer)||void 0===e||e.connected()}});var ue=Object.defineProperty,me=Object.getOwnPropertyDescriptor,pe=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?me(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&ue(t,o,a),a},ve=(e=>(e[e.ITEM=0]="ITEM",e[e.INFORMATION=1]="INFORMATION",e))(ve||{});class ge extends(u(o,{validSizes:["s","m","l","xl"],noDefaultSize:!0})){constructor(){super(...arguments),this._renderItem=()=>a``,this.role="grid",this.selected=[],this.selectedSet=new Set,this.items=[],this.itemValue=(e,t)=>`${t}`,this.scroller=!1,this.emphasized=!1,this.quiet=!1}static get styles(){return[X]}get renderItem(){return this._renderItem}set renderItem(e){this._renderItem=(t,o)=>{const r=this.itemValue(t,o),c=this.selected.includes(r),l=this.selects&&1!==(null==t?void 0:t._$rowType$);return a`
                <sp-table-row
                    value=${r}
                    aria-rowindex=${o+1}
                    ?selected=${c}
                >
                    ${l?a`
                              <sp-table-checkbox-cell
                                  ?checked=${c}
                              ></sp-table-checkbox-cell>
                          `:s}
                    ${e(t,o)}
                </sp-table-row>
            `}}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return!!this.items.length}focus(){const e=this.querySelector("sp-table-head-cell[sortable]");e&&e.focus()}selectAllRows(){this.isVirtualized?this.items.forEach(((e,t)=>{1!==e._$rowType$&&this.selectedSet.add(this.itemValue(e,t))})):this.tableRows.forEach((e=>{e.selected=!0,this.selectedSet.add(e.value)})),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1)}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach((e=>{e.selected=!1})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1)}manageSelects(){var e;const t=this.querySelectorAll("sp-table-checkbox-cell"),o=document.createElement("sp-table-checkbox-cell");if(this.selects){let t=!1;this.isVirtualized?t=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach((e=>{if(e.selected=this.selectedSet.has(e.value),!e.querySelector(":scope > sp-table-checkbox-cell")){const t=o.cloneNode();o.emphasized=this.emphasized,e.insertAdjacentElement("afterbegin",t),o.checked=e.selected}})),t=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHeadCheckboxCell.headCell=!0,this.tableHeadCheckboxCell.emphasized=this.emphasized,null==(e=this.tableHead)||e.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(t)}else t.forEach((e=>{e.remove()})),delete this.tableHeadCheckboxCell}validateSelected(){const e=new Set;this.isVirtualized?this.items.forEach(((t,o)=>{const r=this.itemValue(t,o);e.add(r)})):this.tableRows.forEach((t=>{e.add(t.value)}));const t=this.selected.length;this.selected=this.selected.filter((t=>e.has(t))),t!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected)}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach((e=>{e.selected=this.selectedSet.has(e.value)})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length))}manageCheckboxes(){var e,t,o;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHeadCheckboxCell.headCell=!0,this.tableHeadCheckboxCell.emphasized=this.emphasized;const t=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(t),null==(e=this.tableHead)||e.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach((e=>{const t=document.createElement("sp-table-checkbox-cell");t.emphasized=this.emphasized,e.insertAdjacentElement("afterbegin",t),e.selected=this.selectedSet.has(e.value),t.checked=e.selected}))}else null==(o=null==(t=this.tableHead)?void 0:t.querySelector("sp-table-checkbox-cell"))||o.remove(),this.tableRows.forEach((e=>{var t;null==(t=e.checkboxCells[0])||t.remove(),this.selected.length&&(e.selected=this.selectedSet.has(e.value))}))}manageHeadCheckbox(e){this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.selectsSingle="single"===this.selects,this.tableHeadCheckboxCell.emphasized=this.emphasized,this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e)}handleChange(e){e.stopPropagation();const t=new Set(this.selectedSet),o=[...this.selected],{target:r}=e,{parentElement:c}=r;if(c.value)switch(this.selects){case"single":this.deselectAllRows(),c.selected&&(this.selectedSet.add(c.value),this.selected=[...this.selectedSet]);break;case"multiple":{c.selected?this.selectedSet.add(c.value):this.selectedSet.delete(c.value),this.selected=[...this.selectedSet];const e=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e;break}}else{const{checkbox:e}=r;if(!e)return;e.checked||e.indeterminate?this.selectAllRows():this.deselectAllRows()}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(e.preventDefault(),this.selectedSet=t,this.selected=o)}scrollToIndex(e){if(e&&this.tableBody){const t=this.tableBody[ce].element(e);t&&t.scrollIntoView()}}render(){return a`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(e){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),e.has("selects")&&this.manageSelects(),e.has("selected")&&this.hasUpdated&&this.manageSelected()}updated(){this.items.length&&this.renderVirtualizedItems()}renderVirtualizedItems(){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",(e=>{this.dispatchEvent(new Y({first:e.first,last:e.last}))})),this.tableBody.addEventListener("visibilityChanged",(e=>{this.dispatchEvent(new Z({first:e.first,last:e.last}))})));const e={items:this.items,renderItem:this.renderItem,scroller:this.scroller};l(a`
                ${be(e)}
            `,this.tableBody)}disconnectedCallback(){super.disconnectedCallback()}}pe([r({reflect:!0})],ge.prototype,"role",2),pe([r({type:String,reflect:!0})],ge.prototype,"selects",2),pe([r({type:Array})],ge.prototype,"selected",2),pe([r({type:Array})],ge.prototype,"items",2),pe([r({type:Object})],ge.prototype,"itemValue",2),pe([r({type:Boolean,reflect:!0})],ge.prototype,"scroller",2),pe([r({type:Boolean,reflect:!0})],ge.prototype,"emphasized",2),pe([r({type:Boolean,reflect:!0})],ge.prototype,"quiet",2),pe([r({type:String,reflect:!0})],ge.prototype,"density",2),i("sp-table",ge);var ke=e`
@media (forced-colors:active){:host{forced-color-adjust:none}}:host([align=center]){text-align:center}:host([align=end]){text-align:end}:host{background-color:var(--spectrum-table-cell-background-color);block-size:var(
--mod-table-min-row-height,var(--spectrum-table-min-row-height)
);border-block-start:var(
--mod-table-border-width,var(--spectrum-table-border-width)
) solid var(
--highcontrast-table-divider-color,var(--mod-table-divider-color,var(--spectrum-table-divider-color))
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
));position:relative;vertical-align:var(
--mod-table-default-vertical-align,var(--spectrum-table-default-vertical-align)
)}:host(.focus-visible),:host([focused]){outline-color:var(
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
`,xe=Object.defineProperty,fe=Object.getOwnPropertyDescriptor;class we extends o{constructor(){super(...arguments),this.role="gridcell"}static get styles(){return[ke]}render(){return a`
            <slot></slot>
        `}}((e,t,o,r)=>{for(var c,a=r>1?void 0:r?fe(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);r&&a&&xe(t,o,a)})([r({reflect:!0})],we.prototype,"role",2),i("sp-table-cell",we);var ye=e`
:host{display:table-header-group}:host .spectrum-Table-scroller{position:sticky;top:0;z-index:2}:host{display:flex}
`,_e=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Ce=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?ze(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&_e(t,o,a),a};class Ie extends o{constructor(){super(...arguments),this.role="row"}static get styles(){return[ye]}handleSorted({target:e}){[...this.children].forEach((t=>{t!==e&&(t.sortDirection=void 0)}))}handleChange({target:e}){this.selected=e.checkbox.checked||e.checkbox.indeterminate}render(){return a`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}Ce([r({reflect:!0})],Ie.prototype,"role",2),Ce([r({type:Boolean,reflect:!0})],Ie.prototype,"selected",2),i("sp-table-head",Ie);var Se=e`
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
)}.sortedIcon,.spectrum-Table-menuIcon{color:var(--spectrum-table-icon-color)}:host([sortable]){cursor:var(--mod-table-cursor-header-sortable,pointer)}:host([sortable][active]){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-active,var(--spectrum-table-icon-color-active)
)
)}:host([sortable]:focus){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-focus,var(--spectrum-table-icon-color-focus)
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
)}@media (hover:hover){:host([sortable]:hover){--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-hover,var(--spectrum-table-icon-color-hover)
)
)}:host([sortable]:focus):hover{--spectrum-table-icon-color:var(
--highcontrast-table-icon-color-focus,var(
--mod-table-icon-color-focus-hover,var(--spectrum-table-icon-color-focus-hover)
)
)}}:host{block-size:auto;display:block;flex:1}
`;var Ee=e`
.spectrum-UIIcon-ArrowRight75{--spectrum-icon-size:var(--spectrum-arrow-icon-size-75)}.spectrum-UIIcon-ArrowRight100{--spectrum-icon-size:var(--spectrum-arrow-icon-size-100)}.spectrum-UIIcon-ArrowRight200{--spectrum-icon-size:var(--spectrum-arrow-icon-size-200)}.spectrum-UIIcon-ArrowRight300{--spectrum-icon-size:var(--spectrum-arrow-icon-size-300)}.spectrum-UIIcon-ArrowRight400{--spectrum-icon-size:var(--spectrum-arrow-icon-size-400)}.spectrum-UIIcon-ArrowRight500{--spectrum-icon-size:var(--spectrum-arrow-icon-size-500)}.spectrum-UIIcon-ArrowRight600{--spectrum-icon-size:var(--spectrum-arrow-icon-size-600)}.spectrum-UIIcon-ArrowDown75{--spectrum-icon-size:var(--spectrum-arrow-icon-size-75);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown100{--spectrum-icon-size:var(--spectrum-arrow-icon-size-100);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown200{--spectrum-icon-size:var(--spectrum-arrow-icon-size-200);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown300{--spectrum-icon-size:var(--spectrum-arrow-icon-size-300);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown400{--spectrum-icon-size:var(--spectrum-arrow-icon-size-400);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown500{--spectrum-icon-size:var(--spectrum-arrow-icon-size-500);transform:rotate(90deg)}.spectrum-UIIcon-ArrowDown600{--spectrum-icon-size:var(--spectrum-arrow-icon-size-600);transform:rotate(90deg)}.spectrum-UIIcon-ArrowLeft75{--spectrum-icon-size:var(--spectrum-arrow-icon-size-75);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft100{--spectrum-icon-size:var(--spectrum-arrow-icon-size-100);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft200{--spectrum-icon-size:var(--spectrum-arrow-icon-size-200);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft300{--spectrum-icon-size:var(--spectrum-arrow-icon-size-300);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft400{--spectrum-icon-size:var(--spectrum-arrow-icon-size-400);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft500{--spectrum-icon-size:var(--spectrum-arrow-icon-size-500);transform:rotate(180deg)}.spectrum-UIIcon-ArrowLeft600{--spectrum-icon-size:var(--spectrum-arrow-icon-size-600);transform:rotate(180deg)}.spectrum-UIIcon-ArrowUp75{--spectrum-icon-size:var(--spectrum-arrow-icon-size-75);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp100{--spectrum-icon-size:var(--spectrum-arrow-icon-size-100);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp200{--spectrum-icon-size:var(--spectrum-arrow-icon-size-200);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp300{--spectrum-icon-size:var(--spectrum-arrow-icon-size-300);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp400{--spectrum-icon-size:var(--spectrum-arrow-icon-size-400);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp500{--spectrum-icon-size:var(--spectrum-arrow-icon-size-500);transform:rotate(270deg)}.spectrum-UIIcon-ArrowUp600{--spectrum-icon-size:var(--spectrum-arrow-icon-size-600);transform:rotate(270deg)}
`,Te=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,Le=(e,t,o,r)=>{for(var c,a=r>1?void 0:r?Ae(t,o):t,s=e.length-1;s>=0;s--)(c=e[s])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&Te(t,o,a),a};class Oe extends o{constructor(){super(...arguments),this.role="columnheader",this.sortable=!1,this.sortKey=""}static get styles(){return[Se,Ee]}handleClick(){this.sortable&&(this.sortDirection?this.sortDirection="asc"===this.sortDirection?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})))}render(){const e=this.sortable&&!!this.sortDirection;return a`
            ${e?a`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:s}
            <slot></slot>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}update(e){e.has("sortDirection")&&this.setAttribute("aria-sort",(e=>({asc:"ascending",desc:"descending"}[e]||"none"))(this.sortDirection)),e.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(e)}}Le([r({reflect:!0})],Oe.prototype,"role",2),Le([r({type:Boolean,reflect:!0})],Oe.prototype,"sortable",2),Le([r({reflect:!0,attribute:"sort-direction"})],Oe.prototype,"sortDirection",2),Le([r({attribute:"sort-key"})],Oe.prototype,"sortKey",2),i("sp-table-head-cell",Oe);export{U as C,he as a,ce as b,z as c,de as d,B as f,be as v};
//# sourceMappingURL=6110b674.js.map
