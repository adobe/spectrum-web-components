import{F as t,R as e}from"./a37f886d.js";import{i as r}from"./1ab7ceed.js";import{S as o,l as i}from"./41af188d.js";import{x as a,n as s,S as c,d as n,A as l,s as d,b as u}from"./637c92da.js";import{o as p,F as h,t as m,i as b,l as v,O as g,L as f,a as k}from"./0fd5475c.js";import"./6b778735.js";import{b as w}from"./ff382794.js";import{n as y}from"./879dbe89.js";import"./ea59e929.js";import"./4cbde120.js";import"./accff194.js";import"./f2777bf5.js";import{O as z}from"./b92db46c.js";import"./08ed1e9f.js";import{D as x,P as C}from"./48b59278.js";import{t as $}from"./e6813b8c.js";import{A as P}from"./4b4bfaa6.js";import{T as S,l as D,M as B,a as L}from"./0462da70.js";import{c as E,e as j,C as A}from"./4dd6175d.js";import{s as M}from"./3f633517.js";import{h as q}from"./52918350.js";import{o as H,t as T}from"./4a273717.js";import{e as O}from"./16ab2288.js";import{b as F}from"./23f9bae1.js";import{i as I,a as _,b as R}from"./141fd338.js";import"./26591615.js";import{B as N}from"./8921ffff.js";import{o as U}from"./ac53cfbc.js";import"./b14a8f6b.js";import{v as V}from"./bc0b2c2c.js";import{f as K}from"./27e6a3fc.js";import{I as G}from"./14613ebb.js";import{g as X}from"./439f1fa5.js";import"./e90345e6.js";import{S as W}from"./976a454d.js";import{o as Y}from"./83410569.js";import{g as Z}from"./cc333fe6.js";import{s as J}from"./ff8e484a.js";import"./53375478.js";import"./98fd6885.js";import"./22df2d36.js";import"./9ab0302a.js";import"./7a9e1884.js";import"./83157e81.js";import"./d6d0b127.js";import"./3b101b71.js";import"./1bc378e4.js";import"./95cea33f.js";import"./942f9738.js";import"./f5690f04.js";import"./d11544d8.js";import"./3f0299b6.js";import"./0398f2f3.js";import"./a974e940.js";import"./4a4b0658.js";import"./ac63bf03.js";import"./9f9c5c08.js";import"./1f3cc327.js";import"./9eece4f7.js";import"./be246949.js";import"./97b32ec4.js";import"./d06ee9cd.js";import"./05f0bc8e.js";var Q=r`
:host{--spectrum-accordion-item-height:var(--spectrum-component-height-200);--spectrum-accordion-item-width:var(--spectrum-accordion-minimum-width);--spectrum-accordion-disclosure-indicator-height:var(
--spectrum-component-height-100
);--spectrum-accordion-disclosure-indicator-to-text-space:var(
--spectrum-accordion-disclosure-indicator-to-text
);--spectrum-accordion-edge-to-disclosure-indicator-space:var(
--spectrum-accordion-edge-to-disclosure-indicator
);--spectrum-accordion-edge-to-text-space:var(
--spectrum-accordion-edge-to-text
);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-regular-medium
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-regular-medium
);--spectrum-accordion-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-accordion-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-accordion-corner-radius:var(--spectrum-corner-radius-100);--spectrum-accordion-item-content-area-top-to-content:var(
--spectrum-accordion-content-area-top-to-content
);--spectrum-accordion-item-content-area-bottom-to-content:var(
--spectrum-accordion-content-area-bottom-to-content
);--spectrum-accordion-component-edge-to-text:var(
--spectrum-component-edge-to-text-75
);--spectrum-accordion-item-header-font:var(
--spectrum-sans-font-family-stack
);--spectrum-accordion-item-header-font-weight:var(
--spectrum-bold-font-weight
);--spectrum-accordion-item-header-font-style:var(
--spectrum-default-font-style
);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-300);--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-content-font:var(
--spectrum-sans-font-family-stack
);--spectrum-accordion-item-content-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-accordion-item-content-font-style:var(
--spectrum-body-sans-serif-font-style
);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-s);--spectrum-accordion-item-content-line-height:var(
--spectrum-line-height-100
);--spectrum-accordion-background-color-default:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-default));--spectrum-accordion-background-color-hover:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-hover));--spectrum-accordion-background-color-down:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-down));--spectrum-accordion-background-color-key-focus:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-key-focus));--spectrum-accordion-item-header-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-accordion-item-header-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-accordion-item-header-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-accordion-item-header-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-accordion-item-header-disabled-color:var(
--spectrum-disabled-content-color
);--spectrum-accordion-item-content-disabled-color:var(
--spectrum-disabled-content-color
);--spectrum-accordion-item-content-color:var(--spectrum-body-color);--spectrum-accordion-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-accordion-divider-color:var(--spectrum-gray-300);--spectrum-accordion-min-block-size:max(var(--mod-accordion-item-height,var(--spectrum-accordion-item-height)),calc(var(
--mod-accordion-item-header-top-to-text-space,
var(--spectrum-accordion-item-header-top-to-text-space)
) + var(
--mod-accordion-item-header-bottom-to-text-space,
var(--spectrum-accordion-item-header-bottom-to-text-space)
) + var(
--mod-accordion-item-header-font-size,
var(--spectrum-accordion-item-header-font-size)
)*var(
--mod-accordion-item-header-line-height,
var(--spectrum-accordion-item-header-line-height)
)))}:host([dir=rtl]),[dir=rtl] :host{--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-accordion-item-header-line-height:var(
--spectrum-cjk-line-height-100
);--spectrum-accordion-item-content-line-height:var(
--spectrum-cjk-line-height-100
)}:host([density=compact]){--spectrum-accordion-item-height:var(--spectrum-component-height-100);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-compact-medium
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-compact-medium
)}:host([density=compact][size=s]){--spectrum-accordion-item-height:var(--spectrum-component-height-75);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-compact-small
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-compact-small
)}:host([density=compact][size=l]){--spectrum-accordion-item-height:var(--spectrum-component-height-200);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-compact-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-compact-large
)}:host([density=compact][size=xl]){--spectrum-accordion-item-height:var(--spectrum-component-height-300);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-compact-extra-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-compact-extra-large
)}:host([density=spacious]){--spectrum-accordion-item-header-line-height:1.278;--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-spacious-medium
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-spacious-medium
)}:host([density=spacious][size=s]){--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-small-top-to-text-spacious
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-spacious-small
)}:host([density=spacious][size=l]){--spectrum-accordion-item-header-line-height:1.273;--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-spacious-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-spacious-large
)}:host([density=spacious][size=xl]){--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-spacious-extra-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-spacious-extra-large
)}:host([size=s]){--spectrum-accordion-item-height:var(--spectrum-component-height-100);--spectrum-accordion-disclosure-indicator-height:var(
--spectrum-component-height-75
);--spectrum-accordion-component-edge-to-text:var(
--spectrum-component-edge-to-text-50
);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-200);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-xs);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-regular-small
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-regular-small
)}:host([size=l]){--spectrum-accordion-item-height:var(--spectrum-component-height-300);--spectrum-accordion-disclosure-indicator-height:var(
--spectrum-component-height-200
);--spectrum-accordion-component-edge-to-text:var(
--spectrum-component-edge-to-text-100
);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-500);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-m);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-regular-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-regular-large
)}:host([size=xl]){--spectrum-accordion-item-height:var(--spectrum-component-height-400);--spectrum-accordion-disclosure-indicator-height:var(
--spectrum-component-height-300
);--spectrum-accordion-component-edge-to-text:var(
--spectrum-component-edge-to-text-200
);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-700);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-l);--spectrum-accordion-item-header-top-to-text-space:var(
--spectrum-accordion-top-to-text-regular-extra-large
);--spectrum-accordion-item-header-bottom-to-text-space:var(
--spectrum-accordion-bottom-to-text-regular-extra-large
)}:host{display:block;list-style:none;margin:0;padding:0}:host{--spectrum-logical-rotation: }
`,tt=Object.defineProperty,et=Object.getOwnPropertyDescriptor,rt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?et(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&tt(e,r,a),a};class ot extends(o(c,{noDefaultSize:!0})){constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new t(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:t=>!t.disabled})}static get styles(){return[Q]}get items(){return[...this.defaultNodes||[]].filter((t=>void 0!==t.tagName))}focus(){this.focusGroupController.focus()}async onToggle(t){const e=t.target;if(await 0,this.allowMultiple||t.defaultPrevented)return;const r=[...this.items];r&&!r.length||r.forEach((t=>{t!==e&&(t.open=!1)}))}handleSlotchange(){this.focusGroupController.clearElementCache(),this.items.forEach((t=>{t.size=this.size}))}updated(t){super.updated(t),t.has("size")&&(t.get("size")||"m"!==this.size)&&this.items.forEach((t=>{t.size=this.size}))}render(){return a`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}rt([s({type:Boolean,reflect:!0,attribute:"allow-multiple"})],ot.prototype,"allowMultiple",2),rt([s({type:String,reflect:!0})],ot.prototype,"density",2),rt([p()],ot.prototype,"defaultNodes",2),n("sp-accordion",ot);var it=r`
:host{margin:0;min-block-size:var(
--mod-accordion-item-height,var(--spectrum-accordion-item-height)
);min-inline-size:var(
--mod-accordion-item-width,var(--spectrum-accordion-item-width)
);position:relative;z-index:inherit}:host(:first-child){border-block-start:1px solid #0000;border-color:var(
--mod-accordion-divider-color,var(--spectrum-accordion-divider-color)
);border-width:var(
--mod-accordion-divider-thickness,var(--spectrum-divider-thickness-small)
)}:host{border-block-end:1px solid #0000;border-color:var(
--mod-accordion-divider-color,var(--spectrum-accordion-divider-color)
);border-width:var(
--mod-accordion-divider-thickness,var(--spectrum-divider-thickness-small)
)}#heading{box-sizing:border-box;margin:0}.iconContainer{align-items:center;block-size:var(
--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height)
);color:var(
--mod-accordion-item-header-color-default,var(--spectrum-accordion-item-header-color-default)
);display:flex;inline-size:var(
--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height)
);inset-block-start:max(0px,calc((var(
--mod-accordion-min-block-size,
var(--spectrum-accordion-min-block-size)
) - var(
--mod-accordion-disclosure-indicator-height,
var(
--spectrum-accordion-disclosure-indicator-height
)
))/2));justify-content:center;padding-inline-start:var(
--mod-accordion-edge-to-disclosure-indicator-space,var(--spectrum-accordion-edge-to-disclosure-indicator-space)
);position:absolute}:host([dir=rtl]) .iconContainer{transform:scaleX(-1)}#content{color:var(
--mod-accordion-item-content-color,var(--spectrum-accordion-item-content-color)
);display:none;font-family:var(
--mod-accordion-item-content-font,var(--spectrum-accordion-item-content-font)
);font-size:var(
--mod-accordion-item-content-font-size,var(--spectrum-accordion-item-content-font-size)
);font-style:var(
--mod-accordion-item-content-font-style,var(--spectrum-accordion-item-content-font-style)
);font-weight:var(
--mod-accordion-item-content-font-weight,var(--spectrum-accordion-item-content-font-weight)
);line-height:var(
--mod-accordion-item-content-line-height,var(--spectrum-accordion-item-content-line-height)
);padding-block:var(
--mod-accordion-item-content-area-top-to-content,var(--spectrum-accordion-item-content-area-top-to-content)
) var(
--mod-accordion-item-content-area-bottom-to-content,var(--spectrum-accordion-item-content-area-bottom-to-content)
);padding-inline:var(
--mod-accordion-component-edge-to-text,var(--spectrum-accordion-component-edge-to-text)
) var(
--mod-accordion-component-edge-to-text,var(--spectrum-accordion-component-edge-to-text)
)}#header{align-items:center;appearance:none;border:0;box-sizing:border-box;cursor:pointer;display:flex;font-family:var(
--mod-accordion-item-header-font,var(--spectrum-accordion-item-header-font)
);font-size:var(
--mod-accordion-item-header-font-size,var(--spectrum-accordion-item-header-font-size)
);font-style:var(
--mod-accordion-item-header-font-style,var(--spectrum-accordion-item-header-font-style)
);font-weight:var(
--mod-accordion-item-header-font-weight,var(--spectrum-accordion-item-header-font-weight)
);inline-size:100%;justify-content:flex-start;line-height:var(
--mod-accordion-item-header-line-height,var(--spectrum-accordion-item-header-line-height)
);min-block-size:var(
--mod-accordion-min-block-size,var(--spectrum-accordion-min-block-size)
);padding-block:var(
--mod-accordion-item-header-top-to-text-space,var(--spectrum-accordion-item-header-top-to-text-space)
) var(
--mod-accordion-item-header-bottom-to-text-space,var(--spectrum-accordion-item-header-bottom-to-text-space)
);padding-inline-end:var(
--mod-accordion-edge-to-text-space,var(--spectrum-accordion-edge-to-text-space)
);padding-inline-start:calc(var(
--mod-accordion-disclosure-indicator-to-text-space,
var(--spectrum-accordion-disclosure-indicator-to-text-space)
) + var(
--mod-accordion-disclosure-indicator-height,
var(--spectrum-accordion-disclosure-indicator-height)
));position:relative;text-align:start;text-overflow:ellipsis}#header:focus{outline:none}#header:focus:after{content:"";inset-inline-start:0;position:absolute}#header{background-color:var(
--mod-accordion-background-color-default,var(--spectrum-accordion-background-color-default)
);color:var(
--mod-accordion-item-header-color-default,var(--spectrum-accordion-item-header-color-default)
)}#header.focus-visible{background-color:var(
--mod-accordion-background-color-key-focus,var(--spectrum-accordion-background-color-key-focus)
);border-radius:var(
--mod-accordion-corner-radius,var(--spectrum-accordion-corner-radius)
);color:var(
--mod-accordion-item-header-color-key-focus,var(--spectrum-accordion-item-header-color-key-focus)
);outline:var(
--mod-accordion-focus-indicator-thickness,var(--spectrum-accordion-focus-indicator-thickness)
) solid var(
--mod-accordion-focus-indicator-color,var(--spectrum-accordion-focus-indicator-color)
);outline-offset:calc(var(
--mod-accordion-focus-indicator-gap,
var(--spectrum-accordion-focus-indicator-gap)
)*-1)}#header:focus-visible{background-color:var(
--mod-accordion-background-color-key-focus,var(--spectrum-accordion-background-color-key-focus)
);border-radius:var(
--mod-accordion-corner-radius,var(--spectrum-accordion-corner-radius)
);color:var(
--mod-accordion-item-header-color-key-focus,var(--spectrum-accordion-item-header-color-key-focus)
);outline:var(
--mod-accordion-focus-indicator-thickness,var(--spectrum-accordion-focus-indicator-thickness)
) solid var(
--mod-accordion-focus-indicator-color,var(--spectrum-accordion-focus-indicator-color)
);outline-offset:calc(var(
--mod-accordion-focus-indicator-gap,
var(--spectrum-accordion-focus-indicator-gap)
)*-1)}#header:active{background-color:var(
--mod-accordion-background-color-down,var(--spectrum-accordion-background-color-down)
);color:var(
--mod-accordion-item-header-color-down,var(--spectrum-accordion-item-header-color-down)
)}:host([disabled]) #header,:host([disabled]) #header.focus-visible{background-color:#0000;color:var(
--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color)
)}:host([disabled]) #header,:host([disabled]) #header:focus-visible{background-color:#0000;color:var(
--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color)
)}@media (hover:hover){#header:hover{background-color:var(
--mod-accordion-background-color-hover,var(--spectrum-accordion-background-color-hover)
);color:var(
--mod-accordion-item-header-color-hover,var(--spectrum-accordion-item-header-color-hover)
)}#header:hover+.iconContainer{color:var(
--mod-accordion-item-header-color-hover,var(--spectrum-accordion-item-header-color-hover)
)}:host([open]) #header:hover{background-color:var(
--mod-accordion-background-color-hover,var(--spectrum-accordion-background-color-hover)
)}:host([disabled]) #header:hover{background-color:#0000;color:var(
--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color)
)}}:host([disabled]) #header+.iconContainer{color:var(
--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color)
)}:host([disabled]) #content{color:var(
--mod-accordion-item-content-disabled-color,var(--spectrum-accordion-item-content-disabled-color)
)}@media (forced-colors:active){#header:after{content:"";forced-color-adjust:none;inset-inline-start:0;position:absolute}}:host([open])>#heading>.iconContainer>.indicator,:host([open])>.iconContainer>.indicator{transform:var(--spectrum-logical-rotation) rotate(90deg)}:host([open])>#content{display:block}:host([disabled]) #header{cursor:default}:host{display:block}#heading{height:auto;position:relative}:host([disabled]) #heading .indicator{color:var(
--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color)
)}
`,at=Object.defineProperty,st=Object.getOwnPropertyDescriptor,ct=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?st(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&at(e,r,a),a};const nt={s:()=>a`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,m:()=>a`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,l:()=>a`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,xl:()=>a`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `};class lt extends(o(h,{noDefaultSize:!0})){constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1,this.renderChevronIcon=()=>nt[this.size||"m"]()}static get styles(){return[it,w]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return a`
            <h3 id="heading">
                ${y(this.size,this.renderChevronIcon)}
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </button>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}ct([s({type:Boolean,reflect:!0})],lt.prototype,"open",2),ct([s({type:String,reflect:!0})],lt.prototype,"label",2),ct([s({type:Boolean,reflect:!0})],lt.prototype,"disabled",2),n("sp-accordion-item",lt);var dt=r`
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
`,ut=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,ht=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?pt(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&ut(e,r,a),a};const mt=[];class bt extends(o(c,{validSizes:["xs","s","m","l","xl"],noDefaultSize:!0})){constructor(){super(),this._buttons=[],this._buttonSelector="sp-action-button",this.rovingTabindexController=new e(this,{focusInIndex:t=>{let e=-1;const r=t.findIndex(((r,o)=>(!t[e]&&!r.disabled&&(e=o),r.selected&&!r.disabled)));return t[r]?r:e},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.compact=!1,this.emphasized=!1,this.justified=!1,this.label="",this.quiet=!1,this.vertical=!1,this._selected=mt,this.hasManaged=!1,this.manageButtons=()=>{const t=this.slotElement.assignedElements({flatten:!0}).reduce(((t,e)=>{if(e.matches(this._buttonSelector))t.push(e);else{const r=Array.from(e.querySelectorAll(`:scope > ${this._buttonSelector}`));t.push(...r)}return t}),[]);if(this.buttons=t,this.selects||!this.hasManaged){const t=[];this.buttons.forEach((e=>{e.selected&&t.push(e.value)})),this.setSelected(this.selected.concat(t))}this.manageChildren(),this.manageSelects(),this.hasManaged=!0},new m(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons()},skipInitial:!0})}static get styles(){return[dt]}set buttons(t){t!==this.buttons&&(this._buttons=t,this.rovingTabindexController.clearElementCache())}get buttons(){return this._buttons}set selected(t){this.requestUpdate("selected",this._selected),this._selected=t,this.updateComplete.then((()=>{this.applySelects(),this.manageChildren()}))}get selected(){return this._selected}dispatchChange(t){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(t),this.buttons.map((t=>{t.selected=this.selected.includes(t.value)})))}setSelected(t,e){if(t===this.selected)return;const r=this.selected;this.requestUpdate("selected",r),this._selected=t,e&&this.dispatchChange(r)}focus(t){this.rovingTabindexController.focus(t)}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach((t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute(this.selects?"aria-checked":"aria-pressed","false")}))}handleActionButtonChange(t){t.stopPropagation(),t.preventDefault()}handleClick(t){const e=t.target;if(void 0!==e.value)switch(this.selects){case"single":this.deselectSelectedButtons(),e.selected=!0,e.tabIndex=0,e.setAttribute("aria-checked","true"),this.setSelected([e.value],!0);break;case"multiple":{const t=[...this.selected];e.selected=!e.selected,e.setAttribute("aria-checked",e.selected?"true":"false"),e.selected?t.push(e.value):t.splice(this.selected.indexOf(e.value),1),this.setSelected(t,!0),this.buttons.forEach((t=>{t.tabIndex=-1})),e.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0)}async manageSelects(t){if(!this.buttons.length)return;const e=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("role","radio"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&r.push(t)}));if(t)break;await Promise.all(o);const i=r.map((t=>t.value));this.setSelected(i||mt);break}case"multiple":{"radiogroup"===this.getAttribute("role")&&this.removeAttribute("role");const r=[],o=[],i=e.map((async t=>{await t.updateComplete,t.setAttribute("role","checkbox"),t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected&&(r.push(t.value),o.push(t))}));if(t)break;await Promise.all(i);const a=r.length?r:mt;this.setSelected(a);break}default:if(!this.selected.length){this.buttons.forEach((t=>{t.setAttribute("role","button")}));break}{const r=[],o=e.map((async t=>{await t.updateComplete,t.setAttribute("role","button"),t.selected?(t.setAttribute("aria-pressed","true"),r.push(t)):t.removeAttribute("aria-pressed")}));if(t)break;await Promise.all(o),this.setSelected(r.map((t=>t.value)))}}this.hasAttribute("role")||this.setAttribute("role","toolbar")}render(){return a`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}updated(t){super.updated(t),t.has("selects")&&(this.manageSelects(),this.manageChildren(),this.selects?this.shadowRoot.addEventListener("change",this.handleActionButtonChange):this.shadowRoot.removeEventListener("change",this.handleActionButtonChange)),(t.has("quiet")||t.has("emphasized")||t.has("size")||t.has("static"))&&this.manageChildren(t),t.has("label")&&(this.label||void 0!==t.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}manageChildren(t){this.buttons.forEach((e=>{(this.quiet||null!=t&&t.get("quiet"))&&(e.quiet=this.quiet),(this.emphasized||null!=t&&t.get("emphasized"))&&(e.emphasized=this.emphasized),(this.static||null!=t&&t.get("static"))&&(e.static=this.static),(this.selects||!this.hasManaged)&&(e.selected=this.selected.includes(e.value)),this.size&&("m"!==this.size||void 0!==(null==t?void 0:t.get("size")))&&(e.size=this.size)}))}}ht([s({type:Boolean,reflect:!0})],bt.prototype,"compact",2),ht([s({type:Boolean,reflect:!0})],bt.prototype,"emphasized",2),ht([s({type:Boolean,reflect:!0})],bt.prototype,"justified",2),ht([s({type:String})],bt.prototype,"label",2),ht([s({type:Boolean,reflect:!0})],bt.prototype,"quiet",2),ht([s({type:String})],bt.prototype,"selects",2),ht([s({reflect:!0})],bt.prototype,"static",2),ht([s({type:Boolean,reflect:!0})],bt.prototype,"vertical",2),ht([s({type:Array})],bt.prototype,"selected",1),ht([b("slot")],bt.prototype,"slotElement",2),n("sp-action-group",bt);var vt=r`
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
`,gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,kt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?ft(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&gt(e,r,a),a};const wt=["sticky","fixed"];class yt extends c{constructor(){super(...arguments),this.emphasized=!1,this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[vt]}set variant(t){if(t!==this.variant){if(wt.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return a`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static=${v(this.emphasized?"white":void 0)}
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
                        static=${v(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}kt([s({type:Boolean,reflect:!0})],yt.prototype,"emphasized",2),kt([s({type:Boolean,reflect:!0})],yt.prototype,"flexible",2),kt([s({type:Boolean,reflect:!0})],yt.prototype,"open",2),kt([s({type:String})],yt.prototype,"variant",1),n("sp-action-bar",yt);var zt=r`
:host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) .icon,:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=rtl]) .icon,:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir]) slot[icon-only] .icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-inline-end:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1);margin-inline-start:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1)}sp-overlay:not(:defined){display:none}
`,xt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,$t=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Ct(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&xt(e,r,a),a};class Pt extends(z(g(C,"label"),'[slot="label-only"]')){constructor(){super(...arguments),this.selects=void 0,this.static=void 0,this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[zt]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return[a`
                ${this.labelOnly?a``:a`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more class="icon"></sp-icon-more>
                          </slot>
                      `}
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
                <slot name="label-only"></slot>
                <slot
                    name="tooltip"
                    @slotchange=${this.handleTooltipSlotchange}
                ></slot>
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),a`
            <sp-action-button
                aria-describedby=${x}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static=${v(this.static)}
                aria-haspopup="true"
                aria-controls=${v(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${v(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @click=${this.handleActivate}
                @pointerdown=${this.handleButtonPointerdown}
                @focus=${this.handleButtonFocus}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(t){t.has("invalid")&&(this.invalid=!1),super.update(t)}}$t([s({type:String})],Pt.prototype,"selects",2),$t([s({type:String,reflect:!0})],Pt.prototype,"static",2),$t([$()],Pt.prototype,"labelOnly",1),n("sp-action-menu",Pt),n("sp-alert-dialog",P);var St=r`
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
`,Dt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,Lt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Bt(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Dt(e,r,a),a};class Et extends c{constructor(){super(...arguments),this.label=""}static get styles(){return[St]}render(){return"file"===this.variant?(t=>a`
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
`)(this.label):"folder"===this.variant?(t=>a`
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
`)(this.label):a`
            <slot></slot>
        `}}Lt([s({type:String,reflect:!0})],Et.prototype,"variant",2),Lt([s()],Et.prototype,"label",2),n("sp-asset",Et);var jt=r`
:host{--spectrum-avatar-color-opacity:1;--spectrum-avatar-inline-size:var(--spectrum-avatar-size-100);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100);--spectrum-avatar-border-radius:var(--spectrum-avatar-block-size);--spectrum-avatar-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-avatar-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-avatar-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-avatar-color-opacity-disabled:var(
--spectrum-avatar-opacity-disabled
)}:host([size="50"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-50);--spectrum-avatar-block-size:var(--spectrum-avatar-size-50)}:host([size="75"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-75);--spectrum-avatar-block-size:var(--spectrum-avatar-size-75)}:host([size="100"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-100);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100)}:host([size="200"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-200);--spectrum-avatar-block-size:var(--spectrum-avatar-size-200)}:host([size="300"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-300);--spectrum-avatar-block-size:var(--spectrum-avatar-size-300)}:host([size="400"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-400);--spectrum-avatar-block-size:var(--spectrum-avatar-size-400)}:host([size="500"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-500);--spectrum-avatar-block-size:var(--spectrum-avatar-size-500)}:host([size="600"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-600);--spectrum-avatar-block-size:var(--spectrum-avatar-size-600)}:host([size="700"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-700);--spectrum-avatar-block-size:var(--spectrum-avatar-size-700)}@media (forced-colors:active){:host{--highcontrast-avatar-focus-indicator-color:CanvasText}}:host{-webkit-user-drag:none;block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-width:0;display:inline-block;inline-size:var(
--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)
);opacity:var(
--mod-avatar-color-opacity,var(--spectrum-avatar-color-opacity)
);outline:none;overflow:visible;position:relative;-webkit-user-select:none;user-select:none}:host([disabled]){opacity:var(
--highcontrast-avatar-color-opacity-disabled,var(
--mod-avatar-color-opacity-disabled,var(--spectrum-avatar-color-opacity-disabled)
)
)}:host(:not([disabled])) .link.focus-visible:after{block-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);border-color:var(
--highcontrast-avatar-focus-indicator-color,var(
--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)
)
);border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-style:solid;border-width:var(
--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)
);content:"";inline-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);inset-block-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);pointer-events:none;position:absolute}:host(:not([disabled])) .link:focus-visible:after{block-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);border-color:var(
--highcontrast-avatar-focus-indicator-color,var(
--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)
)
);border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);border-style:solid;border-width:var(
--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)
);content:"";inline-size:calc(var(--mod-avatar-inline-size, var(--spectrum-avatar-inline-size)) + var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
)*2);inset-block-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-avatar-focus-indicator-gap,
var(--spectrum-avatar-focus-indicator-gap)
) + var(
--mod-avatar-focus-indicator-thickness,
var(--spectrum-avatar-focus-indicator-thickness)
))*-1);pointer-events:none;position:absolute}.link{outline:solid #0000}.image{block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(
--mod-avatar-border-radius,var(--spectrum-avatar-border-radius)
);inline-size:var(
--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)
)}img{vertical-align:top}
`,At=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,qt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Mt(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&At(e,r,a),a};const Ht=[50,75,100,200,300,400,500,600,700],Tt=Ht[2];class Ot extends(f(h)){constructor(){super(...arguments),this.src="",this._size=Tt}static get styles(){return[jt]}get focusElement(){return this.anchorElement||this}get size(){return this._size}set size(t){const e=t,r=Ht.includes(e)?e:Tt;if(r&&this.setAttribute("size",`${r}`),this._size===r)return;const o=this._size;this._size=r,this.requestUpdate("size",o)}render(){const t=a`
            <img
                class="image"
                alt=${v(this.label||void 0)}
                src=${this.src}
            />
        `;return this.href?this.renderAnchor({id:"link",className:"link",anchorContent:t}):t}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}qt([b("#link")],Ot.prototype,"anchorElement",2),qt([s()],Ot.prototype,"src",2),qt([s({type:Number,reflect:!0})],Ot.prototype,"size",1),n("sp-avatar",Ot);var Ft=r`
:host{--spectrum-badge-corner-radius:var(--spectrum-corner-radius-100);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-badge-label-icon-color:var(--spectrum-white);--spectrum-badge-background-color-default:var(
--spectrum-neutral-subdued-background-color-default
);--spectrum-badge-background-color-accent:var(
--spectrum-accent-background-color-default
);--spectrum-badge-background-color-informative:var(
--spectrum-informative-background-color-default
);--spectrum-badge-background-color-negative:var(
--spectrum-negative-background-color-default
);--spectrum-badge-background-color-positive:var(
--spectrum-positive-background-color-default
);--spectrum-badge-background-color-notice:var(
--spectrum-notice-background-color-default
);--spectrum-badge-background-color-gray:var(
--spectrum-gray-background-color-default
);--spectrum-badge-background-color-red:var(
--spectrum-red-background-color-default
);--spectrum-badge-background-color-orange:var(
--spectrum-orange-background-color-default
);--spectrum-badge-background-color-yellow:var(
--spectrum-yellow-background-color-default
);--spectrum-badge-background-color-chartreuse:var(
--spectrum-chartreuse-background-color-default
);--spectrum-badge-background-color-celery:var(
--spectrum-celery-background-color-default
);--spectrum-badge-background-color-green:var(
--spectrum-green-background-color-default
);--spectrum-badge-background-color-seafoam:var(
--spectrum-seafoam-background-color-default
);--spectrum-badge-background-color-cyan:var(
--spectrum-cyan-background-color-default
);--spectrum-badge-background-color-blue:var(
--spectrum-blue-background-color-default
);--spectrum-badge-background-color-indigo:var(
--spectrum-indigo-background-color-default
);--spectrum-badge-background-color-purple:var(
--spectrum-purple-background-color-default
);--spectrum-badge-background-color-fuchsia:var(
--spectrum-fuchsia-background-color-default
);--spectrum-badge-background-color-magenta:var(
--spectrum-magenta-background-color-default
);--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-100
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-100
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-100
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-100
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-100
)}.spectrum-Badge--celery,.spectrum-Badge--chartreuse,.spectrum-Badge--orange,:host([variant=yellow]){--spectrum-badge-label-icon-color:var(--spectrum-black)}.spectrum-Badge--blue,.spectrum-Badge--cyan,.spectrum-Badge--gray,.spectrum-Badge--green,.spectrum-Badge--red,:host([variant=fuchsia]),:host([variant=indigo]),:host([variant=magenta]),:host([variant=purple]),:host([variant=seafoam]){--spectrum-badge-label-icon-color:var(
--spectrum-badge-label-icon-color-primary
)}:host([size=s]){--spectrum-badge-height:var(--spectrum-component-height-75);--spectrum-badge-font-size:var(--spectrum-font-size-75);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-75
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-75
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-75
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-75);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-75
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-75
)}:host([size=l]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-200);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-200
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-200
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-200
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-200);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-200
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-200
)}:host([size=xl]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-300);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-300
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-300
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-300
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-300);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-300
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-300
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-300
)}@media (forced-colors:active){:host{border-color:CanvasText}}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
);border:1px solid #0000;border-radius:var(
--mod-badge-corner-radius,var(--spectrum-badge-corner-radius)
);color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);cursor:default;display:inline-flex;inline-size:auto;min-block-size:var(--mod-badge-height,var(--spectrum-badge-height));position:relative;vertical-align:middle}:host([variant=neutral]){background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
)}:host([variant=accent]){background:var(
--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent)
)}:host([variant=informative]){background:var(
--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative)
)}:host([variant=negative]){background:var(
--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative)
)}:host([variant=positive]){background:var(
--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive)
)}.spectrum-Badge--notice{background:var(
--mod-badge-background-color-notice,var(--spectrum-badge-background-color-notice)
)}.spectrum-Badge--gray{background:var(
--mod-badge-background-color-gray,var(--spectrum-badge-background-color-gray)
)}.spectrum-Badge--red{background:var(
--mod-badge-background-color-red,var(--spectrum-badge-background-color-red)
)}.spectrum-Badge--orange{background:var(
--mod-badge-background-color-orange,var(--spectrum-badge-background-color-orange)
)}:host([variant=yellow]){background:var(
--mod-badge-background-color-yellow,var(--spectrum-badge-background-color-yellow)
)}.spectrum-Badge--chartreuse{background:var(
--mod-badge-background-color-chartreuse,var(--spectrum-badge-background-color-chartreuse)
)}.spectrum-Badge--celery{background:var(
--mod-badge-background-color-celery,var(--spectrum-badge-background-color-celery)
)}.spectrum-Badge--green{background:var(
--mod-badge-background-color-green,var(--spectrum-badge-background-color-green)
)}:host([variant=seafoam]){background:var(
--mod-badge-background-color-seafoam,var(--spectrum-badge-background-color-seafoam)
)}.spectrum-Badge--cyan{background:var(
--mod-badge-background-color-cyan,var(--spectrum-badge-background-color-cyan)
)}.spectrum-Badge--blue{background:var(
--mod-badge-background-color-blue,var(--spectrum-badge-background-color-blue)
)}:host([variant=indigo]){background:var(
--mod-badge-background-color-indigo,var(--spectrum-badge-background-color-indigo)
)}:host([variant=purple]){background:var(
--mod-badge-background-color-purple,var(--spectrum-badge-background-color-purple)
)}:host([variant=fuchsia]){background:var(
--mod-badge-background-color-fuchsia,var(--spectrum-badge-background-color-fuchsia)
)}:host([variant=magenta]){background:var(
--mod-badge-background-color-magenta,var(--spectrum-badge-background-color-magenta)
)}:host([fixed=inline-start]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=inline-end]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=block-start]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);font-size:var(--mod-badge-font-size,var(--spectrum-badge-font-size));line-height:var(
--mod-badge-line-height,var(--spectrum-badge-line-height)
);padding-block-end:var(
--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom)
);padding-block-start:var(
--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
)}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(
--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk)
)}[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);flex:0 0 var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);inline-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);padding-block-end:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-block-start:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing)
);padding-inline-start:var(
--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal)
)}[icon-only]::slotted(*){padding-inline-end:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
)}:host{align-items:center}:host([fixed=left]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=right]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=top]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=bottom]){border-end-end-radius:0;border-end-start-radius:0}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}::slotted([slot=icon]){flex-shrink:0}.label slot{display:block;max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);overflow:hidden}[icon-only]+.label{display:none}
`,It=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,Rt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?_t(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&It(e,r,a),a};class Nt extends(o(g(z(c,'[slot="icon"]'),""),{noDefaultSize:!0})){constructor(){super(...arguments),this.variant="informative"}static get styles(){return[Ft]}get fixed(){return this._fixed}set fixed(t){if(t===this.fixed)return;const e=this.fixed;this._fixed=t,t?this.setAttribute("fixed",t):this.removeAttribute("fixed"),this.requestUpdate("fixed",e)}get hasIcon(){return this.slotContentIsPresent}render(){return a`
            ${this.hasIcon?a`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:l}
            <div class="label">
                <slot></slot>
            </div>
        `}}Rt([s({reflect:!0})],Nt.prototype,"fixed",1),Rt([s({type:String,reflect:!0})],Nt.prototype,"variant",2),n("sp-badge",Nt);var Ut=r`
:host{border-radius:var(
--spectrum-banner-border-radius,var(--spectrum-global-dimension-static-size-100)
);display:inline-block;font-size:var(
--spectrum-banner-text-size,var(--spectrum-global-dimension-font-size-75)
);line-height:var(
--spectrum-banner-text-line-height,var(--spectrum-alias-heading-text-line-height)
);padding:var(
--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50)
) var(
--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100)
)}#header{font-weight:700}:host([dir=ltr][corner]){right:-10px}:host([dir=rtl][corner]){left:-10px}:host([corner]){position:absolute;top:-10px}:host{color:var(
--spectrum-banner-text-color,var(--spectrum-global-color-static-white)
)}:host([type=info]){background-color:var(
--spectrum-banner-info-background-color,var(--spectrum-semantic-informative-color-default)
)}:host([type=warning]){background-color:var(
--spectrum-banner-warning-background-color,var(--spectrum-semantic-notice-color-default)
)}:host([type=error]){background-color:var(
--spectrum-banner-error-background-color,var(--spectrum-semantic-negative-color-default)
)}
`,Vt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Gt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Kt(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Vt(e,r,a),a};class Xt extends c{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[Ut]}render(){return a`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `}}Gt([s({reflect:!0,type:String})],Xt.prototype,"type",2),Gt([s({reflect:!0,type:Boolean})],Xt.prototype,"corner",2),n("sp-banner",Xt);var Wt=r`
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
);border-radius:var(
--spectrum-quickactions-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;height:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);justify-content:center;padding:var(
--spectrum-quickactions-padding-y,var(--spectrum-global-dimension-size-50)
) var(
--spectrum-quickactions-padding-x,var(--spectrum-global-dimension-size-50)
)}[name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}#overlay{background-color:var(
--spectrum-quickactions-overlay-color,var(--spectrum-alias-background-color-quickactions-overlay)
)}:host([text-only]) [name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}
`,Yt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,Jt=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Zt(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Yt(e,r,a),a};class Qt extends c{constructor(){super(...arguments),this.opened=!1,this.textOnly=!1}static get styles(){return[Wt]}render(){return a`
            <slot></slot>
        `}}Jt([s({type:Boolean,reflect:!0})],Qt.prototype,"opened",2),Jt([s({type:Boolean,attribute:"text-only",hasChanged:()=>!1})],Qt.prototype,"textOnly",2),n("sp-quick-actions",Qt);var te=r`
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
)}#preview+#cover-photo{display:none}#cover-photo ::slotted(*),:host(:not([variant=quiet])) #preview ::slotted(*){display:block;object-fit:cover;width:100%}:host(:not([variant=gallery])) #preview ::slotted(*){height:100%}:host([horizontal]) #preview{width:auto}sp-quick-actions{z-index:1}.title{width:var(--spectrum-card-title-width)}.subtitle{text-transform:none}:host:after,:host:before{pointer-events:none}
`;var ee=[H,T,r`
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
`],re=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,ie=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?oe(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&re(e,r,a),a};class ae extends(f(o(z(k(c),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"],noDefaultSize:!0}))){constructor(){super(...arguments),this.variant="standard",this._selected=!1,this.heading="",this.horizontal=!1,this.focused=!1,this.toggles=!1,this.value="",this.subheading="",this.handleFocusin=t=>{this.focused=!0,t.composedPath()[0]===this?this.addEventListener("keydown",this.handleKeydown):this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[q,ee,te]}get selected(){return this._selected}set selected(t){t!==this.selected&&(this._selected=t,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var t;null==(t=this.likeAnchor)||t.click()}handleFocusout(t){this.focused=!1,t.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(t){const{code:e}=t;switch(e){case"Space":if(this.toggleSelected(),this.toggles){t.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(t){t.stopPropagation(),this.selected=t.target.checked,this.announceChange()}toggleSelected(){this.toggles?(this.selected=!this.selected,this.announceChange()):this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}))}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(t){this.href&&t.stopPropagation()}handlePointerdown(t){if(t.composedPath().some((t=>"a"===t.localName)))return;const e=+new Date,r=()=>{+new Date-e<200&&this.click(),this.removeEventListener("pointerup",r),this.removeEventListener("pointercancel",r)};this.addEventListener("pointerup",r),this.addEventListener("pointercancel",r)}get renderHeading(){return a`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return a`
            <sp-asset id="preview" variant=${v(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${"quiet"===this.variant||this.horizontal?l:a`
                      <sp-divider size="s"></sp-divider>
                  `}
        `}get renderCoverImage(){return a`
            <sp-asset id="cover-photo" variant=${v(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${"quiet"===this.variant||this.horizontal?l:a`
                      <sp-divider size="s"></sp-divider>
                  `}
        `}get images(){const t=[];return this.hasPreview&&t.push(this.renderPreviewImage),this.hasCoverPhoto&&t.push(this.renderCoverImage),t}renderImage(){return this.horizontal?this.images:"standard"!==this.variant?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return a`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return a`
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${"gallery"===this.variant?this.renderSubtitleAndDescription:l}
                    ${"quiet"!==this.variant||"s"!==this.size?a`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:l}
                </div>
                ${"gallery"!==this.variant?a`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:l}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):l}
            ${"standard"===this.variant?a`
                      <slot name="footer"></slot>
                  `:l}
            ${this.toggles?a`
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
                  `:l}
            ${"quiet"===this.variant&&"s"===this.size?a`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:l}
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}ie([s()],ae.prototype,"asset",2),ie([s({reflect:!0})],ae.prototype,"variant",2),ie([s({type:Boolean,reflect:!0})],ae.prototype,"selected",1),ie([s()],ae.prototype,"heading",2),ie([s({type:Boolean,reflect:!0})],ae.prototype,"horizontal",2),ie([b("#like-anchor")],ae.prototype,"likeAnchor",2),ie([s({type:Boolean,reflect:!0})],ae.prototype,"focused",2),ie([s({type:Boolean,reflect:!0})],ae.prototype,"toggles",2),ie([s()],ae.prototype,"value",2),ie([s()],ae.prototype,"subheading",2),n("sp-card",ae);var se=r`
@keyframes pulse{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-0-scale,1))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}@keyframes pulse--quiet{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(
--spectrum-coachmark-quiet-animation-indicator-keyframe-0-scale,.8
))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}:host{margin:var(
--spectrum-coachmark-indicator-gap,var(--spectrum-global-dimension-size-75)
);position:relative}.ring{border-radius:50%;border-style:solid;border-width:var(
--spectrum-coachmark-indicator-ring-border-size,var(--spectrum-global-dimension-static-size-25)
);display:block;position:absolute}.ring:nth-child(2){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-center-delay-multiple,
-.66
))}.ring:nth-child(3){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-outer-delay-multiple,
-1
))}:host{min-height:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3);min-width:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3)}:host([dir=ltr]) .ring{left:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}:host([dir=rtl]) .ring{right:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}.ring{animation:pulse var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
);top:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75);width:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
)}.ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-inner-delay-multiple,
-.5
))}:host([quiet]){min-height:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75);min-width:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75)}:host([dir=ltr][quiet]) .ring{left:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([dir=rtl][quiet]) .ring{right:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([quiet]) .ring{animation:pulse--quiet var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
);top:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75);width:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
)}:host([quiet]) .ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-quiet-animation-indicator-ring-inner-delay-multiple,
-.33
))}.ring{border-color:var(
--spectrum-coachmark-indicator-ring-default-color,var(--spectrum-alias-focus-color)
)}:host([variant=light]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-low-contrast-color,var(--spectrum-global-color-gray-50)
)}:host([variant=dark]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-high-contrast-color,var(--spectrum-global-color-gray-900)
)}:host{display:inline-block}
`,ce=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,le=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?ne(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&ce(e,r,a),a};class de extends c{constructor(){super(...arguments),this.quiet=!1,this.variant=""}static get styles(){return[se]}render(){return a`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}le([s({type:Boolean,reflect:!0})],de.prototype,"quiet",2),le([s({reflect:!0})],de.prototype,"variant",2),n("sp-coachmark",de);const ue=["",()=>{}];const pe=O(class extends E{constructor(){super(...arguments),this.start=ue,this.streamInside=ue,this.end=ue,this.streamOutside=ue,this.state="off",this.handleStart=t=>{this.clearStream(),this.callHandler(this.start[1],t),!t.defaultPrevented&&(this.removeListeners(),this.addListeners("on"))},this.handleInside=t=>{this.handleStream(this.streamInside[1],t)},this.handleEnd=t=>{this.clearStream(),this.callHandler(this.end[1],t),this.removeListeners(),this.addListeners("off")},this.handleOutside=t=>{this.handleStream(this.streamOutside[1],t)}}render(t){return l}update(t,[{start:e,end:r,streamInside:o=ue,streamOutside:i=ue}]){var a;this.element!==t.element&&(this.element=t.element,this.removeListeners()),this.host=(null==(a=t.options)?void 0:a.host)||this.element,this.start=e,this.end=r,this.streamInside=o,this.streamOutside=i,this.addListeners()}addListeners(t){this.state=t||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleOutside),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleInside),this.addListener(this.end[0],this.handleEnd))}callHandler(t,e){"function"==typeof t?t.call(this.host,e):t.handleEvent(e)}handleStream(t,e){this.stream||(this.callHandler(t,e),this.stream=requestAnimationFrame((()=>{this.stream=void 0})))}clearStream(){null!=this.stream&&(cancelAnimationFrame(this.stream),this.stream=void 0)}addListener(t,e){Array.isArray(t)?t.map((t=>{this.element.addEventListener(t,e)})):this.element.addEventListener(t,e)}removeListener(t,e){Array.isArray(t)?t.map((t=>{this.element.removeEventListener(t,e)})):this.element.removeEventListener(t,e)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleInside),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleOutside)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}});var he=r`
:host{--spectrum-colorloupe-width:var(--spectrum-color-loupe-width);--spectrum-colorloupe-height:var(--spectrum-color-loupe-height);--spectrum-colorloupe-offset:var(
--spectrum-color-loupe-bottom-to-color-handle
);--spectrum-colorloupe-animation-distance:8px;--spectrum-colorloupe-drop-shadow-x:var(--spectrum-drop-shadow-x);--spectrum-colorloupe-drop-shadow-y:var(
--spectrum-color-loupe-drop-shadow-y
);--spectrum-colorloupe-drop-shadow-blur:var(
--spectrum-color-loupe-drop-shadow-blur
);--spectrum-colorloupe-drop-shadow-color:var(
--spectrum-color-loupe-drop-shadow-color
);--spectrum-colorloupe-outer-border-width:var(
--spectrum-color-loupe-outer-border-width
);--spectrum-colorloupe-inner-border-width:var(
--spectrum-color-loupe-inner-border-width
);--spectrum-colorloupe-outer-border-color:var(
--spectrum-color-loupe-outer-border
);--spectrum-colorloupe-inner-border-color:var(
--spectrum-color-loupe-inner-border
);--spectrum-colorloupe-checkerboard-dark-color:var(
--spectrum-opacity-checkerboard-square-dark
);--spectrum-colorloupe-checkerboard-light-color:var(
--spectrum-opacity-checkerboard-square-light
)}:host{block-size:var(--spectrum-colorloupe-height);filter:drop-shadow(var(
--mod-colorloupe-drop-shadow-x,var(--spectrum-colorloupe-drop-shadow-x)
) var(
--mod-colorloupe-drop-shadow-y,var(--spectrum-colorloupe-drop-shadow-y)
) var(
--mod-colorloupe-drop-shadow-blur,var(--spectrum-colorloupe-drop-shadow-blur)
) var(
--mod-colorloupe-drop-shadow-color,var(--spectrum-colorloupe-drop-shadow-color)
));inline-size:var(--spectrum-colorloupe-width);inset-block-end:calc(var(--spectrum-color-handle-size) - var(--spectrum-color-handle-outer-border-width) + var(--mod-colorloupe-offset, var(--spectrum-colorloupe-offset)));inset-inline-end:calc(50% - var(--spectrum-colorloupe-width)/2);opacity:0;pointer-events:none;position:absolute;transform:translateY(var(
--mod-colorloupe-animation-distance,var(--spectrum-colorloupe-animation-distance)
));transform-origin:bottom;transition:transform .1s ease-in-out,opacity .125s ease-in-out}:host([dir=rtl]){inset-inline-end:calc(50% - var(--spectrum-colorloupe-width)/2 - 1px)}:host([open]){opacity:1;transform:translate(0)}.spectrum-ColorLoupe-inner-border{fill:var(--spectrum-picked-color);stroke:var(
--mod-colorloupe-inner-border-color,var(--spectrum-colorloupe-inner-border-color)
);stroke-width:var(
--mod-colorloupe-inner-border-width,var(--spectrum-colorloupe-inner-border-width)
)}.spectrum-ColorLoupe-outer-border{fill:none;stroke:var(
--highcontrast-colorloupe-outer-border-color,var(
--mod-colorloupe-outer-border-color,var(--spectrum-colorloupe-outer-border-color)
)
);stroke-width:calc(var(
--mod-colorloupe-outer-border-width,
var(--spectrum-colorloupe-outer-border-width)
) + 2px)}.spectrum-ColorLoupe-checkerboard-pattern{fill:var(--spectrum-colorloupe-checkerboard-dark-color)}.spectrum-ColorLoupe-checkerboard-background{fill:var(--spectrum-colorloupe-checkerboard-light-color)}.spectrum-ColorLoupe-checkerboard-fill{fill:var(--spectrum-colorloupe-checkerboard-fill)}@media (forced-colors:active){:host{--highcontrast-colorloupe-outer-border-color:CanvasText}}svg{height:inherit;width:inherit}.loupe-clipped{clip-path:path("M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ")}.opacity-checkerboard{block-size:100%;inline-size:100%;left:2px;position:absolute;top:2px}
`,me=Object.defineProperty,be=Object.getOwnPropertyDescriptor,ve=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?be(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&me(e,r,a),a};class ge extends c{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[F,he]}render(){return a`
            <div class="opacity-checkerboard loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-inner-border loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-outer-border loupe-clipped"></div>
            <svg
                aria-hidden="true"
                class="spectrum-ColorLoupe is-open"
                overflow="visible"
                style="--spectrum-picked-color: ${this.color}; position: absolute;"
            >
                <defs>
                    <path
                        id="loupe-path"
                        d="M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ"
                        transform="translate(2, 2)"
                    />
                    <mask id="loupe-mask">
                        <rect
                            x="0"
                            y="0"
                            height="100"
                            width="100"
                            fill="white"
                        />
                        <use xlink:href="#path" fill="black" />
                    </mask>
                </defs>

                <g class="spectrum-ColorLoupe-loupe">
                    <g>
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            transform="translate(2, 2)"
                            class="spectrum-ColorLoupe-inner-border"
                        />
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            class="spectrum-ColorLoupe-outer-border"
                        />
                    </g>
                </g>
            </svg>
        `}}ve([s({type:Boolean,reflect:!0})],ge.prototype,"open",2),ve([s({type:String})],ge.prototype,"color",2),n("sp-color-loupe",ge);var fe=r`
:host{--spectrum-opacity-checkerboard-dark:var(
--spectrum-opacity-checkerboard-square-dark
);--spectrum-opacity-checkerboard-light:var(
--spectrum-opacity-checkerboard-square-light
);--spectrum-opacity-checkerboard-size:var(
--spectrum-opacity-checkerboard-square-size
);--spectrum-opacity-checkerboard-position:left top}:host{background:repeating-conic-gradient(var(
--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-light)
) 0 25%,var(
--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-dark)
) 0 50%) var(
--mod-opacity-checkerboard-position,var(--spectrum-opacity-checkerboard-position)
) /calc(var(
--mod-opacity-checkerboard-size,
var(--spectrum-opacity-checkerboard-size)
)*2) calc(var(
--mod-opacity-checkerboard-size,
var(--spectrum-opacity-checkerboard-size)
)*2)}@media (forced-colors:active){:host{forced-color-adjust:none}}
`;var ke=r`
:host{--spectrum-colorhandle-size:var(--spectrum-color-handle-size);--spectrum-colorhandle-focused-size:var(
--spectrum-color-handle-size-key-focus
);--spectrum-colorhandle-hitarea-size:var(
--spectrum-color-control-track-width
);--spectrum-colorhandle-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-colorhandle-animation-easing:ease-in-out;--spectrum-colorhandle-outer-border-color:rgba(var(--spectrum-black-rgb),var(--spectrum-color-handle-outer-border-opacity));--spectrum-colorhandle-outer-border-width:var(
--spectrum-color-handle-outer-border-width
);--spectrum-colorhandle-inner-border-color:rgba(var(--spectrum-black-rgb),var(--spectrum-color-handle-inner-border-opacity));--spectrum-colorhandle-inner-border-width:var(
--spectrum-color-handle-inner-border-width
);--spectrum-colorhandle-border-width:var(
--spectrum-color-handle-border-width
);--spectrum-colorhandle-border-color:var(--spectrum-white);--spectrum-colorhandle-border-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-colorhandle-fill-color-disabled:var(
--spectrum-disabled-background-color
);--mod-opacity-checkerboard-position:50%}:host{block-size:var(--mod-colorhandle-size,var(--spectrum-colorhandle-size));border-color:var(
--highcontrast-colorhandle-border-color,var(
--mod-colorhandle-border-color,var(--spectrum-colorhandle-border-color)
)
);border-radius:100%;border-style:solid;border-width:var(
--mod-colorhandle-border-width,var(--spectrum-colorhandle-border-width)
);box-shadow:0 0 0 var(
--mod-colorhandle-outer-border-width,var(--spectrum-colorhandle-outer-border-width)
) var(
--mod-colorhandle-outer-border-color,var(--spectrum-colorhandle-outer-border-color)
);box-sizing:border-box;display:block;inline-size:var(--mod-colorhandle-size,var(--spectrum-colorhandle-size));margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1/2);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1/2);position:absolute;transition:all var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
);z-index:1}:host:after{block-size:var(
--mod-colorhandle-hitarea-size,var(--spectrum-colorhandle-hitarea-size)
);border-radius:var(--mod-colorhandle-hitarea-border-radius,100%);content:"";display:block;inline-size:var(
--mod-colorhandle-hitarea-size,var(--spectrum-colorhandle-hitarea-size)
);inset-block:calc(50% - var(
--mod-colorhandle-hitarea-size,
var(--spectrum-colorhandle-hitarea-size)
)/2);inset-inline:calc(50% - var(
--mod-colorhandle-hitarea-size,
var(--spectrum-colorhandle-hitarea-size)
)/2);position:absolute}:host(.focus-visible),:host([focused]){block-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);inline-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);outline:none}:host(:focus-visible),:host([focused]){block-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);inline-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);outline:none}:host([disabled]){background:var(
--highcontrast-colorhandle-fill-color-disabled,var(
--mod-colorhandle-fill-color-disabled,var(--spectrum-colorhandle-fill-color-disabled)
)
);border-color:var(
--highcontrast-colorhandle-border-color-disabled,var(
--mod-colorhandle-border-color-disabled,var(--spectrum-colorhandle-border-color-disabled)
)
);box-shadow:none;pointer-events:none}:host([disabled]) .inner{display:none}.inner{background-color:var(--spectrum-picked-color);block-size:100%;border-radius:100%;box-shadow:inset 0 0 0 var(
--mod-colorhandle-inner-border-width,var(--spectrum-colorhandle-inner-border-width)
) var(
--mod-colorhandle-inner-border-color,var(--spectrum-colorhandle-inner-border-color)
);inline-size:100%}@media (forced-colors:active){:host{forced-color-adjust:none}:host([disabled]){--highcontrast-colorhandle-border-color-disabled:GrayText;--highcontrast-colorhandle-fill-color-disabled:Canvas}}:host{touch-action:none;transition:inline-size var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),block-size var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),border-width var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),margin-inline var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),margin-block var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
)}:host(:focus){outline:none}
`,we=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,ze=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?ye(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&we(e,r,a),a};class xe extends c{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[fe,ke]}handlePointerdown(t){"touch"===t.pointerType&&(this.open=!0),this.setPointerCapture(t.pointerId)}handlePointerup(t){this.open=!1,this.releasePointerCapture(t.pointerId)}render(){return a`
            <div class="inner" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open&&!this.disabled}
            ></sp-color-loupe>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup)}}function Ce(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");const r=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function $e(t){return Math.min(1,Math.max(0,t))}function Pe(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Se(t){return Number(t)<=1?100*Number(t)+"%":t}function De(t){return 1===t.length?"0"+t:String(t)}function Be(t,e,r){t=Ce(t,255),e=Ce(e,255),r=Ce(r,255);const o=Math.max(t,e,r),i=Math.min(t,e,r);let a=0,s=0;const c=(o+i)/2;if(o===i)s=0,a=0;else{const n=o-i;switch(s=c>.5?n/(2-o-i):n/(o+i),o){case t:a=(e-r)/n+(e<r?6:0);break;case e:a=(r-t)/n+2;break;case r:a=(t-e)/n+4}a/=6}return{h:a,s:s,l:c}}function Le(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*r*(e-t):r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function Ee(t,e,r){t=Ce(t,255),e=Ce(e,255),r=Ce(r,255);const o=Math.max(t,e,r),i=Math.min(t,e,r);let a=0;const s=o,c=o-i,n=0===o?0:c/o;if(o===i)a=0;else{switch(o){case t:a=(e-r)/c+(e<r?6:0);break;case e:a=(r-t)/c+2;break;case r:a=(t-e)/c+4}a/=6}return{h:a,s:n,v:s}}function je(t,e,r,o){const i=[De(Math.round(t).toString(16)),De(Math.round(e).toString(16)),De(Math.round(r).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function Ae(t){return Math.round(255*parseFloat(t)).toString(16)}function Me(t){return qe(t)/255}function qe(t){return parseInt(t,16)}ze([s({type:Boolean,reflect:!0})],xe.prototype,"disabled",2),ze([s({type:Boolean,reflect:!0})],xe.prototype,"focused",2),ze([s({type:Boolean,reflect:!0})],xe.prototype,"open",2),ze([s({type:String})],xe.prototype,"color",2),n("sp-color-handle",xe);const He={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Te(t){let e={r:0,g:0,b:0},r=1,o=null,i=null,a=null,s=!1,c=!1;return"string"==typeof t&&(t=function(t){if(t=t.trim().toLowerCase(),0===t.length)return!1;let e=!1;if(He[t])t=He[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};let r=_e.rgb.exec(t);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=_e.rgba.exec(t),r)return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=_e.hsl.exec(t),r)return{h:r[1],s:r[2],l:r[3]};if(r=_e.hsla.exec(t),r)return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=_e.hsv.exec(t),r)return{h:r[1],s:r[2],v:r[3]};if(r=_e.hsva.exec(t),r)return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=_e.hex8.exec(t),r)return{r:qe(r[1]),g:qe(r[2]),b:qe(r[3]),a:Me(r[4]),format:e?"name":"hex8"};if(r=_e.hex6.exec(t),r)return{r:qe(r[1]),g:qe(r[2]),b:qe(r[3]),format:e?"name":"hex"};if(r=_e.hex4.exec(t),r)return{r:qe(r[1]+r[1]),g:qe(r[2]+r[2]),b:qe(r[3]+r[3]),a:Me(r[4]+r[4]),format:e?"name":"hex8"};if(r=_e.hex3.exec(t),r)return{r:qe(r[1]+r[1]),g:qe(r[2]+r[2]),b:qe(r[3]+r[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(Re(t.r)&&Re(t.g)&&Re(t.b)?(e=function(t,e,r){return{r:255*Ce(t,255),g:255*Ce(e,255),b:255*Ce(r,255)}}(t.r,t.g,t.b),s=!0,c="%"===String(t.r).substr(-1)?"prgb":"rgb"):Re(t.h)&&Re(t.s)&&Re(t.v)?(o=Se(t.s),i=Se(t.v),e=function(t,e,r){t=6*Ce(t,360),e=Ce(e,100),r=Ce(r,100);const o=Math.floor(t),i=t-o,a=r*(1-e),s=r*(1-i*e),c=r*(1-(1-i)*e),n=o%6;return{r:255*[r,s,a,a,c,r][n],g:255*[c,r,r,s,a,a][n],b:255*[a,a,c,r,r,s][n]}}(t.h,o,i),s=!0,c="hsv"):Re(t.h)&&Re(t.s)&&Re(t.l)&&(o=Se(t.s),a=Se(t.l),e=function(t,e,r){let o,i,a;if(t=Ce(t,360),e=Ce(e,100),r=Ce(r,100),0===e)i=r,a=r,o=r;else{const s=r<.5?r*(1+e):r+e-r*e,c=2*r-s;o=Le(c,s,t+1/3),i=Le(c,s,t),a=Le(c,s,t-1/3)}return{r:255*o,g:255*i,b:255*a}}(t.h,o,a),s=!0,c="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=Pe(r),{ok:s,format:t.format||c,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}const Oe="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",Fe="[\\s|\\(]+("+Oe+")[,|\\s]+("+Oe+")[,|\\s]+("+Oe+")\\s*\\)?",Ie="[\\s|\\(]+("+Oe+")[,|\\s]+("+Oe+")[,|\\s]+("+Oe+")[,|\\s]+("+Oe+")\\s*\\)?",_e={CSS_UNIT:new RegExp(Oe),rgb:new RegExp("rgb"+Fe),rgba:new RegExp("rgba"+Ie),hsl:new RegExp("hsl"+Fe),hsla:new RegExp("hsla"+Ie),hsv:new RegExp("hsv"+Fe),hsva:new RegExp("hsva"+Ie),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Re(t){return Boolean(_e.CSS_UNIT.exec(String(t)))}class Ne{constructor(t="",e={}){if(t instanceof Ne)return t;"number"==typeof t&&(t=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(t)),this.originalInput=t;const r=Te(t);this.originalInput=t,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??r.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3}getLuminance(){const t=this.toRgb();let e,r,o;const i=t.r/255,a=t.g/255,s=t.b/255;return e=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4),r=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),o=s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4),.2126*e+.7152*r+.0722*o}getAlpha(){return this.a}setAlpha(t){return this.a=Pe(t),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:t}=this.toHsl();return 0===t}toHsv(){const t=Ee(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}}toHsvString(){const t=Ee(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.v);return 1===this.a?`hsv(${e}, ${r}%, ${o}%)`:`hsva(${e}, ${r}%, ${o}%, ${this.roundA})`}toHsl(){const t=Be(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}}toHslString(){const t=Be(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),o=Math.round(100*t.l);return 1===this.a?`hsl(${e}, ${r}%, ${o}%)`:`hsla(${e}, ${r}%, ${o}%, ${this.roundA})`}toHex(t=!1){return je(this.r,this.g,this.b,t)}toHexString(t=!1){return"#"+this.toHex(t)}toHex8(t=!1){return function(t,e,r,o,i){const a=[De(Math.round(t).toString(16)),De(Math.round(e).toString(16)),De(Math.round(r).toString(16)),De(Ae(o))];return i&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this.r,this.g,this.b,this.a,t)}toHex8String(t=!1){return"#"+this.toHex8(t)}toHexShortString(t=!1){return 1===this.a?this.toHexString(t):this.toHex8String(t)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return 1===this.a?`rgb(${t}, ${e}, ${r})`:`rgba(${t}, ${e}, ${r}, ${this.roundA})`}toPercentageRgb(){const t=t=>`${Math.round(100*Ce(t,255))}%`;return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}}toPercentageRgbString(){const t=t=>Math.round(100*Ce(t,255));return 1===this.a?`rgb(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%)`:`rgba(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%, ${this.roundA})`}toName(){if(0===this.a)return"transparent";if(this.a<1)return!1;const t="#"+je(this.r,this.g,this.b,!1);for(const[e,r]of Object.entries(He))if(t===r)return e;return!1}toString(t){const e=Boolean(t);t=t??this.format;let r=!1;const o=this.a<1&&this.a>=0;return e||!o||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex4"===t&&(r=this.toHex8String(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new Ne(this.toString())}lighten(t=10){const e=this.toHsl();return e.l+=t/100,e.l=$e(e.l),new Ne(e)}brighten(t=10){const e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(-t/100*255))),e.g=Math.max(0,Math.min(255,e.g-Math.round(-t/100*255))),e.b=Math.max(0,Math.min(255,e.b-Math.round(-t/100*255))),new Ne(e)}darken(t=10){const e=this.toHsl();return e.l-=t/100,e.l=$e(e.l),new Ne(e)}tint(t=10){return this.mix("white",t)}shade(t=10){return this.mix("black",t)}desaturate(t=10){const e=this.toHsl();return e.s-=t/100,e.s=$e(e.s),new Ne(e)}saturate(t=10){const e=this.toHsl();return e.s+=t/100,e.s=$e(e.s),new Ne(e)}greyscale(){return this.desaturate(100)}spin(t){const e=this.toHsl(),r=(e.h+t)%360;return e.h=r<0?360+r:r,new Ne(e)}mix(t,e=50){const r=this.toRgb(),o=new Ne(t).toRgb(),i=e/100,a={r:(o.r-r.r)*i+r.r,g:(o.g-r.g)*i+r.g,b:(o.b-r.b)*i+r.b,a:(o.a-r.a)*i+r.a};return new Ne(a)}analogous(t=6,e=30){const r=this.toHsl(),o=360/e,i=[this];for(r.h=(r.h-(o*t>>1)+720)%360;--t;)r.h=(r.h+o)%360,i.push(new Ne(r));return i}complement(){const t=this.toHsl();return t.h=(t.h+180)%360,new Ne(t)}monochromatic(t=6){const e=this.toHsv(),{h:r}=e,{s:o}=e;let{v:i}=e;const a=[],s=1/t;for(;t--;)a.push(new Ne({h:r,s:o,v:i})),i=(i+s)%1;return a}splitcomplement(){const t=this.toHsl(),{h:e}=t;return[this,new Ne({h:(e+72)%360,s:t.s,l:t.l}),new Ne({h:(e+216)%360,s:t.s,l:t.l})]}onBackground(t){const e=this.toRgb(),r=new Ne(t).toRgb(),o=e.a+r.a*(1-e.a);return new Ne({r:(e.r*e.a+r.r*r.a*(1-e.a))/o,g:(e.g*e.a+r.g*r.a*(1-e.a))/o,b:(e.b*e.a+r.b*r.a*(1-e.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(t){const e=this.toHsl(),{h:r}=e,o=[this],i=360/t;for(let a=1;a<t;a++)o.push(new Ne({h:(r+a*i)%360,s:e.s,l:e.l}));return o}equals(t){return this.toRgbString()===new Ne(t).toRgbString()}}const Ue=/^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/,Ve=/(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/,Ke=/(^hs[v|l]a?\()\d{1,3}/,Ge=(t,e)=>e?t.toHexString():t.toHex();class Xe{constructor(t,{applyColorToState:e,extractColorFromState:r,maintains:o}){this.maintains="hue",this._hue=0,this.getColorProcesses={rgb:(t,e)=>e?t.toRgbString():t.toRgb(),prgb:(t,e)=>e?t.toPercentageRgbString():t.toPercentageRgb(),hex8:(t,e)=>e?t.toHex8String():t.toHex8(),name:t=>t.toName()||t.toRgbString(),hsl:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHslString().replace(Ke,`$1${this.hue}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}}if(e)return t.toHslString().replace(Ve,`$1${this.hue}$2${this.saturation}`);{const{s:e,l:r,a:o}=t.toHsl();return{h:this.hue,s:e,l:r,a:o}}},hsv:(t,e)=>{if("hue"===this.maintains){if(e)return t.toHsvString().replace(Ke,`$1${this.hue}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}}if(e)return t.toHsvString().replace(Ve,`$1${this.hue}$2${this.saturation}`);{const{s:e,v:r,a:o}=t.toHsv();return{h:this.hue,s:e,v:r,a:o}}},hex:Ge,hex3:Ge,hex4:Ge,hex6:Ge},this._color=new Ne({h:0,s:1,v:1}),this._previousColor=new Ne({h:0,s:1,v:1}),this._format={format:"",isString:!1},this.host=t,this.applyColorToState=e,this.extractColorFromState=r,this.maintains=o||this.maintains}setColorProcess(t,e,r,o){"hue"===this.maintains?this.setColorMaintainHue(t,e,r,o):"saturation"===this.maintains&&this.setColorMaintainSaturation(t,e,r,o)}setColorMaintainHue(t,e,r,o){const{h:i,s:a,v:s}=this._color.toHsv();let c;if(o&&r.startsWith("hs")){const t=Ue.exec(e);if(null!==t){const[,e]=t;c=Number(e)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput;c=Object.values(e)[0]}this.hue=c||i,this.applyColorToState({h:i,s:a,v:s})}setColorMaintainSaturation(t,e,r,o){if(o&&r.startsWith("hs")){const t=Ue.exec(e);if(null!==t){const[,e,r]=t;this.hue=Number(e),this.saturation=Number(r)}}else if(!o&&r.startsWith("hs")){const e=t.originalInput,r=Object.values(e);this.hue=r[0],this.saturation=r[1]}else{const{h:e}=t.toHsv();this.hue=e}this.applyColorToState(t.toHsv())}applyColorFromState(){this._color=new Ne(this.extractColorFromState(this))}get hue(){return this._hue}set hue(t){const e=Math.min(360,Math.max(0,t));if(e===this.hue)return;const r=this.hue,{s:o,v:i}=this._color.toHsv();this._color=new Ne({h:e,s:o,v:i}),this._hue=e,this.host.requestUpdate("hue",r)}get value(){return this.color}get color(){return this.getColorProcesses[this._format.format||"hex"](this._color,this._format.isString)}set color(t){if(t===this.color)return;const e=this._color;this._color=new Ne(t);const r=this._color.format;let o="string"==typeof t||t instanceof String;r.startsWith("hex")&&(o=t.startsWith("#")),this._format={format:r,isString:o},this.setColorProcess(this._color,t,r,o),this.host.requestUpdate("color",e)}getColor(t){return this._color[{hsl:"toHsl"}[t]]()}setColor(t){this._color=t;const e="string"==typeof this._color.originalInput||this._color.originalInput instanceof String;this.setColorProcess(this._color,t,this._color.format,e)}getHslString(){return this._color.toHslString()}savePreviousColor(){this._previousColor=this._color.clone()}restorePreviousColor(){this.setColor(this._previousColor)}}const We=Symbol("language resolver updated");class Ye{constructor(t){this.language=document.documentElement.lang||navigator.language,this.host=t,this.host.addController(this)}hostConnected(){this.resolveLanguage()}hostDisconnected(){var t;null==(t=this.unsubscribe)||t.call(this)}resolveLanguage(){const t=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:(t,e)=>{const r=this.language;this.language=t,this.unsubscribe=e,this.host.requestUpdate(We,r)}},cancelable:!0});this.host.dispatchEvent(t)}}var Ze=r`
:host{--spectrum-colorarea-border-radius:var(
--spectrum-color-area-border-rounding
);--spectrum-colorarea-border-color:#0000001a;--spectrum-colorarea-disabled-background-color:var(
--spectrum-disabled-background-color
);--spectrum-colorarea-border-width:var(--spectrum-color-area-border-width);--spectrum-colorarea-height:var(--spectrum-color-area-height);--spectrum-colorarea-width:var(--spectrum-color-area-width);--spectrum-colorarea-min-width:var(--spectrum-color-area-minimum-width);--spectrum-colorarea-min-height:var(--spectrum-color-area-minimum-height)}@media (forced-colors:active){:host{--highcontrast-colorarea-border-color-disabled:GrayText;--highcontrast-colorarea-border-color:Canvas;--highcontrast-colorarea-fill-color-disabled:Canvas}:host([disabled]){forced-color-adjust:none}.gradient{forced-color-adjust:none}}:host{block-size:var(--mod-colorarea-height,var(--spectrum-colorarea-height));border:var(
--mod-colorarea-border-width,var(--spectrum-colorarea-border-width)
) solid var(
--highcontrast-colorarea-border-color,var(
--mod-colorarea-border-color,var(--spectrum-colorarea-border-color)
)
);border-radius:var(
--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius)
);box-sizing:border-box;cursor:default;display:inline-block;inline-size:var(--mod-colorarea-width,var(--spectrum-colorarea-width));min-block-size:var(
--mod-colorarea-min-height,var(--spectrum-colorarea-min-height)
);min-inline-size:var(
--mod-colorarea-min-width,var(--spectrum-colorarea-min-width)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){background:var(
--highcontrast-colorarea-fill-color-disabled,var(
--mod-colorarea-disabled-background-color,var(--spectrum-colorarea-disabled-background-color)
)
);border:var(
--mod-colorarea-border-width,var(--spectrum-colorarea-border-width)
) solid var(--highcontrast-colorarea-border-color-disabled);pointer-events:none}:host([disabled]) .gradient{display:none}.handle{inset-block-start:0;transform:translate(calc(var(--mod-colorarea-width, var(--spectrum-colorarea-width)) - var(--spectrum-colorarea-border-width)))}:host([dir=rtl]) .handle{inset-inline-end:0}.gradient{border-radius:var(
--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius)
)}.gradient,.slider{block-size:100%;inline-size:100%}.slider{inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}:host{touch-action:none}:host:before{pointer-events:none}.gradient{overflow:hidden}.handle{transform:translate(var(--spectrum-colorarea-default-width))}::slotted(*){height:100%;width:100%}:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider[orient=vertical]{appearance:slider-vertical}.slider:focus{z-index:1}.fieldset{border:0;margin:0;padding:0}
`,Je=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,tr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Qe(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Je(e,r,a),a};class er extends c{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.labelX="saturation",this.labelY="luminosity",this.languageResolver=new Ye(this),this.colorController=new Xe(this,{extractColorFromState:()=>({h:this.hue,s:this.x,v:this.y}),applyColorToState:({s:t,v:e})=>{this.x=t,this.y=e}}),this.activeAxis="x",this._x=1,this._y=1,this.step=.01,this.altered=0,this.activeKeys=new Set,this._valueChanged=!1,this._pointerDown=!1}static get styles(){return[Ze]}get hue(){return this.colorController.hue}set hue(t){this.colorController.hue=t}get value(){return this.colorController.color}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get x(){return this._x}set x(t){if(t===this.x)return;const e=this.x;this.inputX?(this.inputX.value=t.toString(),this._x=this.inputX.valueAsNumber):this._x=t,this.requestUpdate("x",e)}get y(){return this._y}set y(t){if(t===this.y)return;const e=this.y;this.inputY?(this.inputY.value=t.toString(),this._y=this.inputY.valueAsNumber):this._y=t,this.requestUpdate("y",e)}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),"x"===this.activeAxis?this.inputX.focus():this.inputY.focus()}handleFocus(){this.focused=!0,this._valueChanged=!1}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1,this._valueChanged=!1)}handleKeydown(t){const{code:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length,(0===e.search("Arrow")||0===e.search("Page")||0===e.search("Home")||0===e.search("End"))&&(t.preventDefault(),this.activeKeys.add(e),this.handleKeypress())}handleKeypress(){let t=0,e=0;const r=Math.max(this.step,5*this.altered*this.step);this.activeKeys.forEach((o=>{switch(o){case"ArrowUp":e=r;break;case"ArrowDown":e=-1*r;break;case"ArrowLeft":t=this.step*(this.isLTR?-1:1);break;case"ArrowRight":t=this.step*(this.isLTR?1:-1);break;case"PageUp":e=10*r;break;case"PageDown":e=-10*r;break;case"Home":t=r*(this.isLTR?-10:10);break;case"End":t=r*(this.isLTR?10:-10)}})),0!=t?(this.activeAxis="x",this.inputX.focus()):0!=e&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+t,0)),this.y=Math.min(1,Math.max(this.y+e,0)),this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),(0!=t||0!=e)&&(this._valueChanged=!0,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor())}handleKeyup(t){t.preventDefault();const{code:e}=t;this.activeKeys.delete(e)}handleInput(t){const{valueAsNumber:e,name:r}=t.target;this[r]=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){const[e,r]=this.calculateHandlePosition(t);this._valueChanged=!1,this.x=e,this.y=1-r,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){t.preventDefault(),this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId);const e=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),"mouse"===t.pointerType&&(this.focused=!1),e||this.colorController.restorePreviousColor()}calculateHandlePosition(t){if(!this.boundingClientRect)return[this.x,this.y];const e=this.boundingClientRect,r=e.left,o=e.top,i=t.clientX,a=t.clientY,s=e.width,c=e.height,n=Math.max(0,Math.min(1,(i-r)/s)),l=Math.max(0,Math.min(1,(a-o)/c));return[this.isLTR?n:1-n,l]}handleAreaPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}render(){const{width:t=0,height:e=0}=this.boundingClientRect||{},r=I()||_(),o="Color Picker",i=this.label?`${this.label} ${o}`:o,s=v(r?void 0:"2d slider"),c=this.labelX,n=this.labelY,l=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.x),d=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.y);return a`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background:
                    linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),
                    linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${v(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style=${`transform: translate(${(this.isLTR?this.x:1-this.x)*t}px, ${e-this.y*e}px);`}
                ${pe({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            ></sp-color-handle>

            <fieldset
                class="fieldset"
                aria-label=${v(r?i:void 0)}
            >
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="x"
                        aria-label=${r?c:i}
                        aria-roledescription=${s}
                        aria-orientation="horizontal"
                        aria-valuetext=${r?l:`${l}, ${c}${this._valueChanged?"":`, ${d}, ${n}`}`}
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.x)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="y"
                        aria-label=${r?n:i}
                        aria-roledescription=${s}
                        aria-orientation="vertical"
                        aria-valuetext=${r?d:`${d}, ${n}${this._valueChanged?"":`, ${l}, ${c}`}`}
                        orient="vertical"
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.y)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
            </fieldset>
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(t){if(super.updated(t),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),t.has("focused")&&this.focused){const t=this.inputX.parentElement,e=this.inputY.parentElement;if(!t.shadowRoot&&!e.shadowRoot){t.attachShadow({mode:"open"}),e.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,e.shadowRoot.innerHTML=r}}}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}tr([s({type:String,reflect:!0})],er.prototype,"dir",2),tr([s({type:Boolean,reflect:!0})],er.prototype,"disabled",2),tr([s({type:Boolean,reflect:!0})],er.prototype,"focused",2),tr([s({type:String})],er.prototype,"label",2),tr([s({type:String,attribute:"label-x"})],er.prototype,"labelX",2),tr([s({type:String,attribute:"label-y"})],er.prototype,"labelY",2),tr([b(".handle")],er.prototype,"handle",2),tr([s({type:Number})],er.prototype,"hue",1),tr([s({type:String})],er.prototype,"value",1),tr([s({type:String})],er.prototype,"color",1),tr([s({attribute:!1})],er.prototype,"activeAxis",2),tr([s({type:Number})],er.prototype,"x",1),tr([s({type:Number})],er.prototype,"y",1),tr([s({type:Number})],er.prototype,"step",2),tr([b('[name="x"]')],er.prototype,"inputX",2),tr([b('[name="y"]')],er.prototype,"inputY",2),n("sp-color-area",er);var rr=r`
:host{--spectrum-color-slider-handle-margin-block:var(
--spectrum-component-top-to-text-75
);--spectrum-color-slider-border-color-rgba:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-color-slider-border-opacity));--spectrum-color-slider-checkerboard-size:var(
--spectrum-opacity-checkerboard-square-size
);--spectrum-color-slider-checkerboard-dark-color:var(
--spectrum-opacity-checkerboard-square-dark
);--spectrum-color-slider-checkerboard-light-color:var(
--spectrum-opacity-checkerboard-square-light
);--mod-colorhandle-hitarea-border-radius:var(
--mod-color-slider-handle-hitarea-border-radius,0px
)}@media (forced-colors:active){:host{--highcontrast-color-slider-border-color:CanvasText;--highcontrast-color-slider-border-color-disabled:GrayText;--highcontrast-color-slider-background-color-disabled:Canvas;forced-color-adjust:none}}:host{block-size:var(
--mod-color-slider-control-track-width,var(--spectrum-color-control-track-width)
);cursor:default;display:block;inline-size:var(
--mod-color-slider-length,var(--spectrum-color-slider-length)
);min-inline-size:var(
--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([disabled]) .gradient{display:none}:host([vertical]){block-size:var(
--mod-color-slider-vertical-height,var(--mod-color-slider-length,var(--spectrum-color-slider-length))
);display:inline-block;inline-size:var(
--mod-color-slider-vertical-control-track-width,var(
--mod-color-slider-control-track-height,var(--spectrum-color-control-track-width)
)
);min-block-size:var(
--mod-color-slider-vertical-minimum-height,var(
--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length)
)
);min-inline-size:0}:host([vertical]) .handle{inset-block-start:0;inset-inline-start:50%}.handle{inset-block-start:50%;inset-inline-start:0}.checkerboard{--spectrum-color-slider-border-color-local:var(
--highcontrast-color-slider-border-color,var(
--mod-color-slider-border-color,var(--spectrum-color-slider-border-color-rgba)
)
)}.checkerboard:before{border-radius:var(
--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding)
);box-shadow:inset 0 0 0 var(
--mod-color-slider-border-width,var(--spectrum-color-slider-border-width)
) var(--spectrum-color-slider-border-color-local);content:"";inset:0;position:absolute;z-index:1}:host([disabled]) .checkerboard{--spectrum-color-slider-border-color-local:var(
--highcontrast-color-slider-border-color-disabled,var(
--mod-color-slider-border-color-disabled,var(--spectrum-disabled-background-color)
)
);background:var(
--highcontrast-color-slider-background-color-disabled,var(
--mod-color-slider-background-color-disabled,var(--spectrum-disabled-background-color)
)
)}.checkerboard,.gradient{block-size:100%;border-radius:var(
--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding)
);inline-size:100%}:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider{block-size:100%;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}:host{--sp-color-slider-gradient-fallback:red 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%;touch-action:none}:host([vertical]) .handle{inset-block-end:0;inset-block-start:unset}:host([vertical]) .slider{appearance:slider-vertical}:host(:focus){outline:none}.gradient{overflow:hidden}::slotted(*){height:100%;width:100%}
`,or=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,ar=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?ir(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&or(e,r,a),a};class sr extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.vertical=!1,this.languageResolver=new Ye(this),this.colorController=new Xe(this,{applyColorToState:()=>{this.sliderHandlePosition=this.colorController.hue/360*100},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this.sliderHandlePosition=0,this.step=1,this._altered=0,this._pointerDown=!1}static get styles(){return[F,rr]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault();this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+r*(100/360))),this.value=Math.min(100,Math.max(0,this.value+r)),this.colorController.applyColorFromState(),0!=r&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.sliderHandlePosition=this.value/360*100,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocus(){this.focused=!0}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.sliderHandlePosition=this.calculateHandlePosition(t),this.value=this.sliderHandlePosition/100*360,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.sliderHandlePosition;const e=this.boundingClientRect,r=this.vertical?e.top:e.left,o=this.vertical?t.clientY:t.clientX,i=this.vertical?e.height:e.width,a=Math.max(0,Math.min(1,(o-r)/i));return this.vertical||!this.isLTR?100-100*a:100*a}handleGradientPointerdown(t){0===t.button&&(t.stopPropagation(),t.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",t)),this.handlePointermove(t))}get handlePositionStyles(){return`${this.vertical?"inset-block-end":"inset-inline-start"}: ${this.sliderHandlePosition}%`}render(){return a`
            <div
                class="opacity-checkerboard checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style="background: linear-gradient(to ${this.vertical?"top":"right"}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)));"
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${v(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${pe({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            ></sp-color-handle>
            <input
                type="range"
                class="slider"
                min="0"
                max="360"
                aria-orientation=${v(this.vertical?"vertical":void 0)}
                orient=${v(this.vertical?"vertical":void 0)}
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur)}}ar([s({type:String,reflect:!0})],sr.prototype,"dir",2),ar([s({type:Boolean,reflect:!0})],sr.prototype,"disabled",2),ar([s({type:Boolean,reflect:!0})],sr.prototype,"focused",2),ar([b(".handle")],sr.prototype,"handle",2),ar([s({type:String})],sr.prototype,"label",2),ar([s({type:Boolean,reflect:!0})],sr.prototype,"vertical",2),ar([s({type:Number})],sr.prototype,"value",1),ar([s({type:Number,reflect:!0})],sr.prototype,"sliderHandlePosition",2),ar([s({type:String})],sr.prototype,"color",1),ar([s({type:Number})],sr.prototype,"step",2),ar([b("input")],sr.prototype,"input",2),n("sp-color-slider",sr);var cr=r`
:host{--spectrum-colorwheel-width:var(--spectrum-color-wheel-width);--spectrum-colorwheel-min-width:var(--spectrum-color-wheel-minimum-width);--spectrum-colorwheel-height:var(--spectrum-color-wheel-width);--spectrum-colorwheel-border-color:var(--spectrum-transparent-black-200);--spectrum-colorwheel-border-width:var(--spectrum-border-width-100);--spectrum-colorwheel-fill-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-colorwheel-track-width:var(
--spectrum-color-control-track-width
);--spectrum-colorwheel-colorarea-margin:var(
--spectrum-color-wheel-color-area-margin
);--spectrum-colorwheel-colorhandle-position:calc(var(--spectrum-colorwheel-width)/2 - var(--spectrum-colorwheel-track-width)/2)}@media (forced-colors:active){:host{--highcontrast-colorwheel-border-color-disabled:GrayText;--highcontrast-colorwheel-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{--track-width:var(
--mod-colorwheel-track-width,var(--spectrum-colorwheel-track-width)
);--border-width:var(
--mod-colorwheel-border-width,var(--spectrum-colorwheel-border-width)
);block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));cursor:default;display:block;inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));min-inline-size:var(
--mod-colorwheel-min-width,var(--spectrum-colorwheel-min-width)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([dragged]){z-index:2}.inner{block-size:var(
--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size)
);display:flex;inline-size:var(
--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size)
);inset-block:0;inset-inline:0;margin:auto;position:absolute}.colorarea-container{align-items:center;block-size:auto;display:flex;inline-size:100%;justify-content:center;margin:var(
--mod-colorwheel-colorarea-margin,var(--spectrum-colorwheel-colorarea-margin)
)}.slider{block-size:100%;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}.handle{inset-block-start:50%;inset-inline:50%;transform:translate(var(--spectrum-colorwheel-colorhandle-position))}.border{background-color:var(
--mod-colorwheel-border-color,var(--spectrum-colorwheel-border-color)
);block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));clip-path:path(evenodd,var(
--mod-colorwheel-path-borders,var(--spectrum-colorwheel-path-borders)
));inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));position:relative}:host([disabled]) .border{background-color:var(
--highcontrast-colorwheel-border-color-disabled,var(
--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)
)
)}.wheel{background:conic-gradient(from 90deg,red,#ff8000,#ff0,#80ff00,#0f0,#00ff80,#0ff,#0080ff,#00f,#8000ff,#f0f,#ff0080,red);clip-path:path(evenodd,var(--mod-colorwheel-path,var(--spectrum-colorwheel-path)));inset-block:var(--spectrum-colorwheel-border-width);inset-inline:var(--spectrum-colorwheel-border-width);position:absolute}:host([disabled]) .wheel{background:var(
--highcontrast-colorwheel-fill-color-disabled,var(
--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)
)
);pointer-events:none}:host{touch-action:none}:host(:focus){outline:none}::slotted([slot=gradient]){block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));border-color:var(
--spectrum-colorwheel-border-color,var(--spectrum-alias-border-color-translucent)
);border-radius:100%;border-style:solid;border-width:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));position:relative;z-index:0}:host([dir=rtl]) .wheel,:host([dir=rtl]) ::slotted([slot=gradient]){transform:scaleX(-1)}
`,nr=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,dr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?lr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&nr(e,r,a),a};class ur extends h{constructor(){super(...arguments),this.disabled=!1,this.focused=!1,this.label="hue",this.step=1,this.languageResolver=new Ye(this),this.colorController=new Xe(this,{applyColorToState:()=>{},extractColorFromState:t=>({...t.getColor("hsl"),h:this.value}),maintains:"saturation"}),this._altered=0,this._pointerDown=!1}static get styles(){return[cr]}get value(){return this.colorController.hue}set value(t){this.colorController.hue=t}get color(){return this.colorController.color}set color(t){this.colorController.color=t}get altered(){return this._altered}set altered(t){this._altered=t,this.step=Math.max(1,10*this.altered)}get focusElement(){return this.input}handleKeydown(t){const{key:e}=t;this.focused=!0,this.altered=[t.shiftKey,t.ctrlKey,t.altKey].filter((t=>!!t)).length;let r=0;switch(e){case"ArrowUp":r=this.step;break;case"ArrowDown":r=-this.step;break;case"ArrowLeft":r=this.step*(this.isLTR?-1:1);break;case"ArrowRight":r=this.step*(this.isLTR?1:-1);break;default:return}t.preventDefault(),this.value=(360+this.value+r)%360,this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor()}handleInput(t){const{valueAsNumber:e}=t.target;this.value=e,this.colorController.applyColorFromState()}handleChange(t){this.handleInput(t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(t={}){super.focus(t),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocus(){this.focused=!0}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(t){0===t.button?(this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),t.target.setPointerCapture(t.pointerId),"mouse"===t.pointerType&&(this.focused=!0)):t.preventDefault()}handlePointermove(t){this.value=this.calculateHandlePosition(t),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(t){this._pointerDown=!1,t.target.releasePointerCapture(t.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),"mouse"===t.pointerType&&(this.focused=!1)}calculateHandlePosition(t){if(!this.boundingClientRect)return this.value;const e=this.boundingClientRect,{width:r,height:o,left:i,top:a}=e,s=i+r/2,c=a+o/2,n=t.clientX-s,l=t.clientY-c,d=180*Math.atan2(l,n)/Math.PI;return(360+(360+(this.isLTR?d:180-d)))%360}handleGradientPointerdown(t){if(0!==t.button||t.target.classList.contains("innerCircle"))return;t.stopPropagation(),t.preventDefault();const{button:e,pointerId:r,pointerType:o}=t;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:e,pointerId:r,pointerType:o})),this.handlePointermove(t)}calculateStyleData(){const{width:t=160}=this.boundingClientRect||{},e=getComputedStyle(this),r=parseFloat(e.getPropertyValue("--border-width")),o=parseFloat(e.getPropertyValue("--track-width")),i=t/2,a=t-2*r,s=i-r,c=i-o,n=2*c,l=c+r,d=n+2*r;return{clipPath:`"M ${s} ${s} m -${s} 0 a ${s} ${s} 0 1 0 ${a} 0 a ${s} ${s} 0 1 0 -${a} 0 M ${s} ${s} m -${l} 0 a ${l} ${l} 0 1 0 ${d} 0 a ${l} ${l} 0 1 0 -${d} 0"`,clipPathBorders:`"M ${i} ${i} m -${i} 0 a ${i} ${i} 0 1 0 ${t} 0 a ${i} ${i} 0 1 0 -${t} 0 M ${i} ${i} m -${c} 0 a ${c} ${c} 0 1 0 ${n} 0 a ${c} ${c} 0 1 0 -${n} 0"`,diameter:t,handleLocationStyles:`transform: translate(${(this.isLTR?1:-1)*(i-o/2)*Math.cos(this.value*Math.PI/180)}px, ${(i-o/2)*Math.sin(this.value*Math.PI/180)}px);`}}render(){const{clipPath:t,clipPathBorders:e,diameter:r,handleLocationStyles:o}=this.calculateStyleData();return a`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
                style="
                    --spectrum-colorwheel-colorarea-container-size: ${r}px;
                    --spectrum-colorwheel-height: ${r}px;
                    --spectrum-colorwheel-width: ${r}px;
                    --spectrum-colorwheel-path-borders: ${e};
                    --spectrum-colorwheel-path: ${t};
                "
            >
                <div class="inner">
                    <div class="colorarea-container"></div>
                </div>
                <div class="border">
                    <div class="wheel"></div>
                </div>
            </slot>

            <sp-color-handle
                tabindex=${v(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${o}
                ${pe({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            ></sp-color-handle>

            <input
                type="range"
                class="slider"
                aria-label=${this.label}
                min="0"
                max="360"
                step=${this.step}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(t){super.firstUpdated(t),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur)}connectedCallback(){var t;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver((t=>{for(const e of t)this.boundingClientRect=e.contentRect;this.requestUpdate()}))),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}}dr([s({type:String,reflect:!0})],ur.prototype,"dir",2),dr([s({type:Boolean,reflect:!0})],ur.prototype,"disabled",2),dr([s({type:Boolean,reflect:!0})],ur.prototype,"focused",2),dr([b(".handle")],ur.prototype,"handle",2),dr([s({type:String})],ur.prototype,"label",2),dr([s({type:Number})],ur.prototype,"step",2),dr([s({type:Number})],ur.prototype,"value",1),dr([s({type:String})],ur.prototype,"color",1),dr([b("input")],ur.prototype,"input",2),n("sp-color-wheel",ur);var pr=r`
.root{--spectrum-picker-button-height:var(--spectrum-component-height-100);--spectrum-picker-button-width:var(--spectrum-component-height-100);--spectrum-picker-button-gap:var(--spectrum-text-to-visual-50);--spectrum-picker-button-padding:var(
--spectrum-in-field-button-edge-to-fill
);--spectrum-picker-button-label-padding:var(--spectrum-text-to-visual-50);--spectrum-picker-button-fill-padding:var(
--spectrum-field-edge-to-disclosure-icon-100
);--spectrum-picker-button-border-radius-rounded:var(
--spectrum-corner-radius-200
);--spectrum-picker-button-icon-color:var(
--spectrum-neutral-content-color-default
);--spectrum-picker-button-icon-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-picker-button-icon-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-picker-button-icon-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-picker-button-font-color:var(
--spectrum-neutral-content-color-default
);--spectrum-picker-button-font-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-picker-button-font-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-picker-button-font-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-picker-button-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-picker-button-font-style:var(--spectrum-default-font-style);--spectrum-picker-button-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-picker-button-font-size:var(--spectrum-font-size-100);--spectrum-picker-button-background-animation-duration:var(
--spectrum-animation-duration-100
)}:host([disabled]) .root{--mod-picker-button-background-color:var(
--mod-picker-button-background-color-disabled,var(--spectrum-disabled-background-color)
);--mod-picker-button-background-color-hover:var(
--mod-picker-button-background-color-hover-disabled,var(--spectrum-disabled-background-color)
);--mod-picker-button-background-color-down:var(
--mod-picker-button-background-color-down-disabled,var(--spectrum-disabled-background-color)
);--mod-picker-button-border-color:var(
--mod-picker-button-border-color-disabled,var(--spectrum-disabled-background-color)
);--mod-picker-button-font-color:var(
--mod-picker-button-font-color-disabled,var(--spectrum-disabled-content-color)
);--mod-picker-button-font-color-hover:var(
--mod-picker-button-font-color-hover-disabled,var(--spectrum-disabled-content-color)
);--mod-picker-button-font-color-down:var(
--mod-picker-button-font-color-down-disabled,var(--spectrum-disabled-content-color)
);--mod-picker-button-icon-color:var(
--mod-picker-button-icon-color-disabled,var(--spectrum-disabled-content-color)
);--mod-picker-button-icon-color-hover:var(
--mod-picker-button-icon-color-hover-disabled,var(--spectrum-disabled-content-color)
);--mod-picker-button-icon-color-down:var(
--mod-picker-button-icon-color-down-disabled,var(--spectrum-disabled-content-color)
)}.root.spectrum-PickerButton--quiet{--mod-picker-button-background-color:var(
--mod-picker-button-background-color-quiet,transparent
);--mod-picker-button-background-color-hover:var(
--mod-picker-button-background-color-hover-quiet,transparent
);--mod-picker-button-background-color-down:var(
--mod-picker-button-background-color-down-quiet,transparent
);--mod-picker-button-background-color-key-focus:var(
--mod-picker-button-background-color-key-focus-quiet,transparent
);--mod-picker-button-border-color:var(
--mod-picker-button-border-color-quiet,transparent
)}:host([size=s]) .root{--spectrum-picker-button-height:var(--spectrum-component-height-75);--spectrum-picker-button-width:var(--spectrum-component-height-75);--spectrum-picker-button-label-padding:var(--spectrum-spacing-75);--spectrum-picker-button-font-size:var(--spectrum-font-size-75);--spectrum-picker-button-fill-padding:var(
--spectrum-field-edge-to-disclosure-icon-75
)}:host([size=l]) .root{--spectrum-picker-button-height:var(--spectrum-component-height-200);--spectrum-picker-button-width:var(--spectrum-component-height-200);--spectrum-picker-button-label-padding:var(--spectrum-text-to-visual-200);--spectrum-picker-button-font-size:var(--spectrum-font-size-200);--spectrum-picker-button-fill-padding:var(
--spectrum-field-edge-to-disclosure-icon-200
)}:host([size=xl]) .root{--spectrum-picker-button-height:var(--spectrum-component-height-300);--spectrum-picker-button-width:var(--spectrum-component-height-300);--spectrum-picker-button-label-padding:var(--spectrum-text-to-visual-300);--spectrum-picker-button-font-size:var(--spectrum-font-size-300);--spectrum-picker-button-fill-padding:var(
--spectrum-field-edge-to-disclosure-icon-300
)}.root{align-items:center;background-color:#0000;block-size:var(
--mod-picker-button-width,var(--spectrum-picker-button-width)
);border-style:none;box-sizing:border-box;justify-content:center;padding:var(
--mod-picker-button-padding,var(--spectrum-picker-button-padding)
)}@media (hover:hover){.root:hover .spectrum-PickerButton-fill{background-color:var(
--mod-picker-button-background-color-hover,var(--spectrum-picker-button-background-color-hover)
)}.root:hover .spectrum-PickerButton-label{color:var(
--mod-picker-button-font-color-hover,var(--spectrum-picker-button-font-color-hover)
)}.root:hover .spectrum-PickerButton-icon{color:var(
--mod-picker-button-icon-color-hover,var(--spectrum-picker-button-icon-color-hover)
)}}:host([active]) .root .spectrum-PickerButton-fill,:host([open]) .root .spectrum-PickerButton-fill{background-color:var(
--mod-picker-button-background-color-down,var(--spectrum-picker-button-background-color-down)
)}:host([active]) .root .spectrum-PickerButton-label,:host([open]) .root .spectrum-PickerButton-label{color:var(
--mod-picker-button-font-color-down,var(--spectrum-picker-button-font-color-down)
)}:host([active]) .root .spectrum-PickerButton-icon,:host([open]) .root .spectrum-PickerButton-icon{color:var(
--mod-picker-button-icon-color-down,var(--spectrum-picker-button-icon-color-down)
)}.root.focus-visible .spectrum-PickerButton-fill,.root.is-keyboardFocused .spectrum-PickerButton-fill,.root:focus .spectrum-PickerButton-fill,:host([focused]) .root .spectrum-PickerButton-fill{background-color:var(
--mod-picker-button-background-color-key-focus,var(--spectrum-picker-button-background-color-key-focus)
)}.root.is-keyboardFocused .spectrum-PickerButton-fill,.root:focus .spectrum-PickerButton-fill,.root:focus-visible .spectrum-PickerButton-fill,:host([focused]) .root .spectrum-PickerButton-fill{background-color:var(
--mod-picker-button-background-color-key-focus,var(--spectrum-picker-button-background-color-key-focus)
)}.root.focus-visible .spectrum-PickerButton-label,.root.is-keyboardFocused .spectrum-PickerButton-label,.root:focus .spectrum-PickerButton-label,:host([focused]) .root .spectrum-PickerButton-label{color:var(
--mod-picker-button-font-color-key-focus,var(--spectrum-picker-button-font-color-key-focus)
)}.root.is-keyboardFocused .spectrum-PickerButton-label,.root:focus .spectrum-PickerButton-label,.root:focus-visible .spectrum-PickerButton-label,:host([focused]) .root .spectrum-PickerButton-label{color:var(
--mod-picker-button-font-color-key-focus,var(--spectrum-picker-button-font-color-key-focus)
)}.root.focus-visible .spectrum-PickerButton-icon,.root.is-keyboardFocused .spectrum-PickerButton-icon,.root:focus .spectrum-PickerButton-icon,:host([focused]) .root .spectrum-PickerButton-icon{color:var(
--mod-picker-button-icon-color-key-focus,var(--spectrum-picker-button-icon-color-key-focus)
)}.root.is-keyboardFocused .spectrum-PickerButton-icon,.root:focus .spectrum-PickerButton-icon,.root:focus-visible .spectrum-PickerButton-icon,:host([focused]) .root .spectrum-PickerButton-icon{color:var(
--mod-picker-button-icon-color-key-focus,var(--spectrum-picker-button-icon-color-key-focus)
)}:host([position=right]) .spectrum-PickerButton-fill{border-end-start-radius:var(
--mod-picker-button-border-radius-sided,var(--spectrum-picker-button-border-radius-sided)
);border-start-start-radius:var(
--mod-picker-button-border-radius-sided,var(--spectrum-picker-button-border-radius-sided)
)}:host([position=right][rounded]) .spectrum-PickerButton-fill{border-end-start-radius:var(
--mod-picker-button-border-radius-rounded-sided,var(--spectrum-picker-button-border-radius-rounded-sided)
);border-start-start-radius:var(
--mod-picker-button-border-radius-rounded-sided,var(--spectrum-picker-button-border-radius-rounded-sided)
)}:host([position=left]) .spectrum-PickerButton-fill{border-end-end-radius:var(
--mod-picker-button-border-radius-sided,var(--spectrum-picker-button-border-radius-sided)
);border-start-end-radius:var(
--mod-picker-button-border-radius-sided,var(--spectrum-picker-button-border-radius-sided)
)}:host([position=left][rounded]) .spectrum-PickerButton-fill{border-end-end-radius:var(
--mod-picker-button-border-radius-rounded-sided,var(--spectrum-picker-button-border-radius-rounded-sided)
);border-start-end-radius:var(
--mod-picker-button-border-radius-rounded-sided,var(--spectrum-picker-button-border-radius-rounded-sided)
)}.spectrum-PickerButton-label{color:var(
--mod-picker-button-font-color,var(--spectrum-picker-button-font-color)
);flex:auto;font-family:var(
--mod-picker-button-font-family,var(--spectrum-picker-button-font-family)
);font-size:var(
--mod-picker-button-font-size,var(--spectrum-picker-button-font-size)
);font-style:var(
--mod-picker-button-font-style,var(--spectrum-picker-button-font-style)
);font-weight:var(
--mod-picker-button-font-weight,var(--spectrum-picker-button-font-weight)
);overflow:hidden;padding-block-end:var(
--mod-picker-button-label-padding,var(--spectrum-picker-button-label-padding)
);padding-block-start:var(
--mod-picker-button-label-padding,var(--spectrum-picker-button-label-padding)
);white-space:nowrap}.spectrum-PickerButton-fill{align-items:center;background-color:var(
--mod-picker-button-background-color,var(--spectrum-picker-button-background-color)
);block-size:100%;border-color:var(
--mod-picker-button-border-color,var(--spectrum-picker-button-border-color)
);border-end-end-radius:var(
--mod-picker-button-border-radius,var(--spectrum-picker-button-border-radius)
);border-end-start-radius:var(
--mod-picker-button-border-radius,var(--spectrum-picker-button-border-radius)
);border-start-end-radius:var(
--mod-picker-button-border-radius,var(--spectrum-picker-button-border-radius)
);border-start-start-radius:var(
--mod-picker-button-border-radius,var(--spectrum-picker-button-border-radius)
);border-style:solid;border-width:var(
--mod-picker-button-border-width,var(--spectrum-picker-button-border-width)
);box-sizing:border-box;display:flex;gap:var(--mod-picker-button-gap,var(--spectrum-picker-button-gap));inline-size:100%;justify-content:center;padding:calc(var(
--mod-picker-button-fill-padding,
var(--spectrum-picker-button-fill-padding)
) - var(
--mod-picker-button-padding,
var(--spectrum-picker-button-padding)
) - var(
--mod-picker-button-border-width,
var(--spectrum-picker-button-border-width)
));transition:border-color var(
--mod-picker-button-background-animation-duration,var(--spectrum-picker-button-background-animation-duration)
) ease-in-out}.spectrum-PickerButton-icon{color:var(
--mod-picker-button-icon-color,var(--spectrum-picker-button-icon-color)
);flex-shrink:0}:host([rounded]) .spectrum-PickerButton-fill{border-end-end-radius:var(
--mod-picker-button-border-radius-rounded,var(--spectrum-picker-button-border-radius-rounded)
);border-end-start-radius:var(
--mod-picker-button-border-radius-rounded,var(--spectrum-picker-button-border-radius-rounded)
);border-start-end-radius:var(
--mod-picker-button-border-radius-rounded,var(--spectrum-picker-button-border-radius-rounded)
);border-start-start-radius:var(
--mod-picker-button-border-radius-rounded,var(--spectrum-picker-button-border-radius-rounded)
)}.uiicononly{inline-size:var(
--mod-picker-button-height,var(--spectrum-picker-button-height)
)}.uiicononly .spectrum-PickerButton-label{display:none}.uiicononly .spectrum-PickerButton-fill{padding:0}.textuiicon .spectrum-PickerButton-fill{inline-size:auto}.root{--spectrum-picker-button-background-color:var(
--system-spectrum-pickerbutton-spectrum-picker-button-background-color
);--spectrum-picker-button-background-color-hover:var(
--system-spectrum-pickerbutton-spectrum-picker-button-background-color-hover
);--spectrum-picker-button-background-color-down:var(
--system-spectrum-pickerbutton-spectrum-picker-button-background-color-down
);--spectrum-picker-button-background-color-key-focus:var(
--system-spectrum-pickerbutton-spectrum-picker-button-background-color-key-focus
);--spectrum-picker-button-border-color:var(
--system-spectrum-pickerbutton-spectrum-picker-button-border-color
);--spectrum-picker-button-border-radius:var(
--system-spectrum-pickerbutton-spectrum-picker-button-border-radius
);--spectrum-picker-button-border-radius-rounded-sided:var(
--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-rounded-sided
);--spectrum-picker-button-border-radius-sided:var(
--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-sided
);--spectrum-picker-button-border-width:var(
--system-spectrum-pickerbutton-spectrum-picker-button-border-width
)}:host{display:inline-flex}.root{display:flex}
`,hr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,br=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?mr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&hr(e,r,a),a};const vr={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class gr extends(o(z(N,'[slot="label"]'))){constructor(){super(...arguments),this.invalid=!1,this.position="right"}static get styles(){return[pr,w]}get hasText(){return this.slotContentIsPresent}render(){const t={root:!0,uiicononly:!this.hasText,textuiicon:this.hasText};return a`
            <div class=${U(t)}>
                <div class="spectrum-PickerButton-fill">
                    <span
                        class="spectrum-PickerButton-label is-placeholder"
                        ?hidden=${!this.hasText}
                    >
                        <slot name="label"></slot>
                    </span>
                    <slot name="icon">
                        <sp-icon-chevron100
                            class="spectrum-PickerButton-icon spectrum-Icon ${vr[this.size]}"
                        ></sp-icon-chevron100>
                    </slot>
                </div>
            </div>
        `}}br([s({type:Boolean,reflect:!0})],gr.prototype,"invalid",2),br([s({reflect:!0})],gr.prototype,"position",2),n("sp-picker-button",gr);var fr=r`
:host{--spectrum-combobox-inline-size:var(--spectrum-field-width);--spectrum-combobox-min-inline-size:calc(var(--spectrum-combo-box-minimum-width-multiplier)*var(--spectrum-combobox-block-size));--spectrum-combobox-button-width:var(--spectrum-combobox-block-size);--spectrum-combobox-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-combobox-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-combobox-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-combobox-border-radius:var(--spectrum-corner-radius-100);--spectrum-combobox-border-width:var(--spectrum-border-width-100);--spectrum-combobox-spacing-label-to-combobox:var(
--spectrum-field-label-to-component
);--spectrum-combobox-font-style:var(--spectrum-default-font-style);--spectrum-combobox-line-height:var(--spectrum-line-height-100);--spectrum-combobox-border-color-invalid-default:var(
--spectrum-negative-border-color-default
);--spectrum-combobox-border-color-invalid-hover:var(
--spectrum-negative-border-color-hover
);--spectrum-combobox-border-color-invalid-focus:var(
--spectrum-negative-border-color-focus
);--spectrum-combobox-border-color-invalid-focus-hover:var(
--spectrum-negative-border-color-focus-hover
);--spectrum-combobox-border-color-invalid-key-focus:var(
--spectrum-negative-border-color-key-focus
);--mod-textfield-focus-indicator-gap:var(
--mod-combobox-focus-indicator-gap,var(--spectrum-combobox-focus-indicator-gap)
);--mod-textfield-focus-indicator-width:var(
--mod-combobox-focus-indicator-thickness,var(--spectrum-combobox-focus-indicator-thickness)
);--mod-textfield-focus-indicator-color:var(
--mod-combobox-focus-indicator-color,var(--spectrum-combobox-focus-indicator-color)
);--mod-textfield-background-color:var(
--mod-combobox-background-color-default
);--mod-textfield-background-color-disabled:var(
--mod-combobox-background-color-disabled
);--mod-textfield-font-family:var(--mod-combobox-font-family);--mod-textfield-font-weight:var(--mod-combobox-font-weight);--mod-textfield-text-color-default:var(--mod-combobox-font-color-default);--mod-textfield-text-color-hover:var(--mod-combobox-font-color-hover);--mod-textfield-text-color-focus:var(--mod-combobox-font-color-focus);--mod-textfield-text-color-focus-hover:var(
--mod-combobox-font-color-focus-hover
);--mod-textfield-text-color-keyboard-focus:var(
--mod-combobox-font-color-key-focus
);--mod-textfield-text-color-disabled:var(
--mod-combobox-font-color-disabled
);--mod-textfield-border-width:var(
--mod-combobox-border-width,var(--spectrum-combobox-border-width)
);--mod-textfield-border-color:var(
--mod-combobox-border-color-default,var(--spectrum-combobox-border-color-default)
);--mod-textfield-border-color-disabled:var(
--mod-combobox-border-color-disabled
);--mod-textfield-border-color-focus:var(
--mod-combobox-border-color-focus,var(--spectrum-combobox-border-color-focus)
);--mod-textfield-border-color-focus-hover:var(
--mod-combobox-border-color-focus-hover,var(--spectrum-combobox-border-color-focus-hover)
);--mod-textfield-border-color-hover:var(
--mod-combobox-border-color-hover,var(--spectrum-combobox-border-color-hover)
);--mod-textfield-border-color-keyboard-focus:var(
--mod-combobox-border-color-key-focus,var(--spectrum-combobox-border-color-key-focus)
);--mod-textfield-border-color-invalid-default:var(
--mod-combobox-border-color-invalid-default,var(--spectrum-combobox-border-color-invalid-default)
);--mod-textfield-border-color-invalid-hover:var(
--mod-combobox-border-color-invalid-hover,var(--spectrum-combobox-border-color-invalid-hover)
);--mod-textfield-border-color-invalid-focus:var(
--mod-combobox-border-color-invalid-focus,var(--spectrum-combobox-border-color-invalid-focus)
);--mod-textfield-border-color-invalid-focus-hover:var(
--mod-combobox-border-color-invalid-focus-hover,var(--spectrum-combobox-border-color-invalid-focus-hover)
);--mod-textfield-border-color-invalid-keyboard-focus:var(
--mod-combobox-border-color-invalid-key-focus,var(--spectrum-combobox-border-color-invalid-key-focus)
);--mod-textfield-icon-color-invalid:var(--mod-combobox-alert-icon-color);--mod-picker-button-border-width:var(
--mod-combobox-border-width,var(--spectrum-combobox-border-width)
);--mod-picker-button-border-color:var(
--mod-combobox-border-color-default,var(--spectrum-combobox-border-color-default)
);--mod-picker-button-background-color:var(
--mod-combobox-background-color-default
);--mod-picker-button-background-color-disabled:var(
--mod-combobox-background-color-disabled
);--mod-picker-button-font-color-disabled:var(
--mod-combobox-font-color-disabled
)}:host([size=s]){--spectrum-combobox-block-size:var(--spectrum-component-height-75);--spectrum-combobox-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-combobox-font-size:var(--spectrum-font-size-75);--spectrum-combobox-spacing-inline-icon-to-button:var(
--spectrum-combo-box-visual-to-field-button-small
);--spectrum-combobox-block-spacing-edge-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-small
);--spectrum-combobox-block-spacing-edge-to-alert:var(
--spectrum-field-top-to-alert-icon-small
);--spectrum-combobox-spacing-edge-to-menu:var(
--spectrum-component-to-menu-small
);--spectrum-combobox-spacing-block-start-edge-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-combobox-spacing-block-end-edge-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-combobox-spacing-inline-start-edge-to-text:var(
--spectrum-component-edge-to-text-75
);--spectrum-combobox-spacing-inline-end-edge-to-text:var(
--spectrum-component-edge-to-text-75
)}:host{--spectrum-combobox-block-size:var(--spectrum-component-height-100);--spectrum-combobox-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-combobox-font-size:var(--spectrum-font-size-100);--spectrum-combobox-spacing-inline-icon-to-button:var(
--spectrum-combo-box-visual-to-field-button-medium
);--spectrum-combobox-block-spacing-edge-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-medium
);--spectrum-combobox-block-spacing-edge-to-alert:var(
--spectrum-field-top-to-alert-icon-medium
);--spectrum-combobox-spacing-edge-to-menu:var(
--spectrum-component-to-menu-medium
);--spectrum-combobox-spacing-block-start-edge-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-combobox-spacing-block-end-edge-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-combobox-spacing-inline-start-edge-to-text:var(
--spectrum-component-edge-to-text-100
);--spectrum-combobox-spacing-inline-end-edge-to-text:var(
--spectrum-component-edge-to-text-100
)}:host([size=l]){--spectrum-combobox-block-size:var(--spectrum-component-height-200);--spectrum-combobox-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-combobox-font-size:var(--spectrum-font-size-200);--spectrum-combobox-spacing-inline-icon-to-button:var(
--spectrum-combo-box-visual-to-field-button-large
);--spectrum-combobox-block-spacing-edge-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-large
);--spectrum-combobox-block-spacing-edge-to-alert:var(
--spectrum-field-top-to-alert-icon-large
);--spectrum-combobox-spacing-edge-to-menu:var(
--spectrum-component-to-menu-large
);--spectrum-combobox-spacing-block-start-edge-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-combobox-spacing-block-end-edge-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-combobox-spacing-inline-start-edge-to-text:var(
--spectrum-component-edge-to-text-200
);--spectrum-combobox-spacing-inline-end-edge-to-text:var(
--spectrum-component-edge-to-text-200
)}:host([size=xl]){--spectrum-combobox-block-size:var(--spectrum-component-height-300);--spectrum-combobox-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-combobox-font-size:var(--spectrum-font-size-300);--spectrum-combobox-spacing-inline-icon-to-button:var(
--spectrum-combo-box-visual-to-field-button-extra-large
);--spectrum-combobox-block-spacing-edge-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-extra-large
);--spectrum-combobox-block-spacing-edge-to-alert:var(
--spectrum-field-top-to-alert-icon-extra-large
);--spectrum-combobox-spacing-edge-to-menu:var(
--spectrum-component-to-menu-extra-large
);--spectrum-combobox-spacing-block-start-edge-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-combobox-spacing-block-end-edge-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-combobox-spacing-inline-start-edge-to-text:var(
--spectrum-component-edge-to-text-300
);--spectrum-combobox-spacing-inline-end-edge-to-text:var(
--spectrum-component-edge-to-text-300
)}:host([quiet]){--spectrum-combobox-min-inline-size:calc(var(--spectrum-combo-box-quiet-minimum-width-multiplier)*var(--spectrum-combobox-block-size));--spectrum-combobox-spacing-inline-icon-to-button:var(
--spectrum-combo-box-visual-to-field-button-quiet
);--spectrum-combobox-spacing-inline-start-edge-to-text:var(
--spectrum-field-edge-to-text-quiet
);--spectrum-combobox-button-inline-offset:calc(var(--mod-combobox-block-size, var(--spectrum-combobox-block-size))/2 - var(--mod-combobox-icon-size, var(--spectrum-combobox-icon-size))/2)}:host([quiet][size=s]){--spectrum-combobox-spacing-label-to-combobox:var(
--spectrum-field-label-to-component-quiet-small
)}:host([quiet]){--spectrum-combobox-spacing-label-to-combobox:var(
--spectrum-field-label-to-component-quiet-medium
)}:host([quiet][size=l]){--spectrum-combobox-spacing-label-to-combobox:var(
--spectrum-field-label-to-component-quiet-large
)}:host([quiet][size=xl]){--spectrum-combobox-spacing-label-to-combobox:var(
--spectrum-field-label-to-component-quiet-extra-large
)}:host([quiet]){--mod-picker-button-background-color-quiet:transparent;--mod-picker-button-border-color-quiet:transparent}@media (forced-colors:active){:host{--highcontrast-combobox-border-color-highlight:Highlight;--highcontrast-combobox-border-color-invalid:Highlight}.button.spectrum-PickerButton--quiet .spectrum-PickerButton-fill{forced-color-adjust:none}.button.spectrum-PickerButton--quiet .spectrum-PickerButton-icon{color:CanvasText}}:host{block-size:var(
--mod-combobox-block-size,var(--spectrum-combobox-block-size)
);border-radius:var(
--mod-combobox-border-radius,var(--spectrum-combobox-border-radius)
);flex-flow:row;inline-size:var(
--mod-combobox-inline-size,var(--spectrum-combobox-inline-size)
);margin-block-start:var(
--mod-combobox-spacing-label-to-combobox,var(--spectrum-combobox-spacing-label-to-combobox)
);min-inline-size:var(
--mod-combobox-min-inline-size,var(--spectrum-combobox-min-inline-size)
);position:relative}.spectrum-Popover.is-open{transform:translateY(var(
--mod-combobox-spacing-edge-to-menu,var(--spectrum-combobox-spacing-edge-to-menu)
))}.spectrum-Combobox-progress-circle{inset-block-end:var(
--mod-combobox-block-spacing-edge-to-alert,var(--spectrum-combobox-block-spacing-edge-to-alert)
);inset-block-start:var(
--mod-combobox-block-spacing-edge-to-progress-circle,var(--spectrum-combobox-block-spacing-edge-to-progress-circle)
);inset-inline-end:calc(var(
--mod-combobox-spacing-inline-icon-to-button,
var(--spectrum-combobox-spacing-inline-icon-to-button)
) + var(
--mod-combobox-button-width,
var(--spectrum-combobox-button-width)
));position:absolute}:host([dir=rtl]) .spectrum-Combobox-progress-circle{inset-inline-end:inherit;inset-inline-start:calc(var(
--mod-combobox-spacing-inline-icon-to-button,
var(--spectrum-combobox-spacing-inline-icon-to-button)
) + var(
--mod-combobox-button-width,
var(--spectrum-combobox-button-width)
))}.button{inset-inline-end:calc(var(
--mod-combobox-button-inline-offset,
var(--spectrum-combobox-button-inline-offset, 0px)
)*-1);position:absolute}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--mod-combobox-border-color-default,var(--spectrum-combobox-border-color-default)
)}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):focus,:host([focused]) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet),:host:has(:focus) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-highlight,var(
--mod-combobox-border-color-focus,var(--spectrum-combobox-border-color-focus)
)
)}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet).focus-visible,:host([keyboard-focused]) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--mod-combobox-border-color-key-focus,var(--spectrum-combobox-border-color-key-focus)
)}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):focus-visible,:host([keyboard-focused]) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--mod-combobox-border-color-key-focus,var(--spectrum-combobox-border-color-key-focus)
)}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):active,:host:has(:active) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-highlight,var(
--mod-combobox-border-color-hover,var(--spectrum-combobox-border-color-hover)
)
)}:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-default,var(--spectrum-combobox-border-color-invalid-default)
)
)}:host([focused][invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet):focus,:host([invalid]):has(:focus) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([invalid][focused]) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-focus,var(--spectrum-combobox-border-color-invalid-focus)
)
)}:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet).focus-visible,:host([invalid][keyboard-focused]) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([keyboard-focused][invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-key-focus,var(--spectrum-combobox-border-color-invalid-key-focus)
)
)}:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet):focus-visible,:host([invalid][keyboard-focused]) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([keyboard-focused][invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-key-focus,var(--spectrum-combobox-border-color-invalid-key-focus)
)
)}:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet):active,:host([invalid]):has(:active) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-hover,var(--spectrum-combobox-border-color-invalid-hover)
)
)}.spectrum-Combobox-textfield{inline-size:100%}#input{backface-visibility:hidden;font-size:var(
--mod-combobox-font-size,var(--spectrum-combobox-font-size)
);font-style:var(
--mod-combobox-font-style,var(--spectrum-combobox-font-style)
);line-height:var(
--mod-combobox-line-height,var(--spectrum-combobox-line-height)
);padding-block-end:calc(var(
--mod-combobox-spacing-block-end-edge-to-text,
var(--spectrum-combobox-spacing-block-end-edge-to-text)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
));padding-block-start:calc(var(
--mod-combobox-spacing-block-start-edge-to-text,
var(--spectrum-combobox-spacing-block-start-edge-to-text)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
));padding-inline-end:calc(var(--mod-combobox-button-width, var(--spectrum-combobox-button-width)) + var(
--mod-combobox-spacing-inline-end-edge-to-text,
var(--spectrum-combobox-spacing-inline-end-edge-to-text)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
)*2);padding-inline-start:calc(var(
--mod-combobox-spacing-inline-start-edge-to-text,
var(--spectrum-combobox-spacing-inline-start-edge-to-text)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
))}#input::placeholder{--mod-textfield-text-color-default:var(
--mod-combobox-font-color-placeholder
)}#input:active{--mod-textfield-background-color:var(
--mod-combobox-background-color-hover
)}#input:focus,.spectrum-Combobox-textfield #input{--mod-textfield-background-color:var(
--mod-combobox-background-color-focus
)}@media (hover:hover){.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):hover,:host(:hover) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-highlight,var(
--mod-combobox-border-color-hover,var(--spectrum-combobox-border-color-hover)
)
)}.button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):focus:hover,:host(:hover):has(:focus) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet),:host([focused]) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet):hover,:host([focused]:hover) .button:not(:disabled,.is-invalid,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-highlight,var(
--mod-combobox-border-color-focus-hover,var(--spectrum-combobox-border-color-focus-hover)
)
)}:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet):hover,:host([invalid]:hover) .button:not(:disabled,.spectrum-PickerButton--quiet){--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-hover,var(--spectrum-combobox-border-color-invalid-hover)
)
)}:host([focused][invalid]:hover) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([invalid]) .button:not(:disabled,.spectrum-PickerButton--quiet):focus:hover,:host([invalid]:hover):has(:focus) .button:not(:disabled,.spectrum-PickerButton--quiet),:host([invalid][focused]) .button:not(:disabled,.spectrum-PickerButton--quiet):hover{--mod-picker-button-border-color:var(
--highcontrast-combobox-border-color-invalid,var(
--mod-combobox-border-color-invalid-focus-hover,var(--spectrum-combobox-border-color-invalid-focus-hover)
)
)}#input:hover,.spectrum-Combobox-textfield #input{--mod-textfield-background-color:var(
--mod-combobox-background-color-hover
)}#input:focus:hover,.spectrum-Combobox-textfield #input:hover{--mod-textfield-background-color:var(
--mod-combobox-background-color-focus-hover
)}}.spectrum-Combobox-textfield #input{--mod-textfield-background-color:var(
--mod-combobox-background-color-key-focus
);padding-inline-end:calc(var(--mod-combobox-button-width, var(--spectrum-combobox-button-width)) + var(
--mod-combobox-spacing-inline-icon-to-button,
var(--spectrum-combobox-spacing-inline-icon-to-button)
) + var(--mod-combobox-icon-size, var(--spectrum-combobox-icon-size)) + var(
--mod-combobox-spacing-inline-end-edge-to-text,
var(--spectrum-combobox-spacing-inline-end-edge-to-text)
) - var(
--mod-combobox-button-inline-offset,
var(--spectrum-combobox-button-inline-offset, 0px)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
)*2)}.spectrum-Combobox-textfield .spectrum-Textfield-validationIcon{block-size:var(
--mod-combobox-icon-size,var(--spectrum-combobox-icon-size)
);inline-size:var(
--mod-combobox-icon-size,var(--spectrum-combobox-icon-size)
);inset-block-end:var(
--mod-combobox-block-spacing-edge-to-alert,var(--spectrum-combobox-block-spacing-edge-to-alert)
);inset-block-start:var(
--mod-combobox-block-spacing-edge-to-alert,var(--spectrum-combobox-block-spacing-edge-to-alert)
);inset-inline-end:calc(var(
--mod-combobox-spacing-inline-icon-to-button,
var(--spectrum-combobox-spacing-inline-icon-to-button)
) + var(
--mod-combobox-button-width,
var(--spectrum-combobox-button-width)
))}.spectrum-Textfield.is-loading .spectrum-Textfield-validationIcon,.spectrum-Textfield.is-readOnly .spectrum-Textfield-validationIcon,:host([disabled]) .spectrum-Textfield .spectrum-Textfield-validationIcon{display:none}:host([quiet]){border-radius:0}:host([quiet]) .spectrum-Combobox-textfield .spectrum-Textfield-validationIcon{inset-inline-end:var(
--mod-combobox-button-width,var(--spectrum-combobox-button-width)
)}:host([quiet]) #input{border-block-end-width:var(
--mod-combobox-border-width,var(--spectrum-combobox-border-width)
);padding-block-end:calc(var(
--mod-combobox-spacing-block-end-edge-to-text,
var(--spectrum-combobox-spacing-block-end-edge-to-text)
) - var(
--mod-combobox-border-width,
var(--spectrum-combobox-border-width)
));padding-block-start:var(
--mod-combobox-spacing-block-start-edge-to-text,var(--spectrum-combobox-spacing-block-start-edge-to-text)
);padding-inline-end:calc(var(--mod-combobox-button-width, var(--spectrum-combobox-button-width)) + var(
--mod-combobox-spacing-inline-end-edge-to-text,
var(--spectrum-combobox-spacing-inline-end-edge-to-text)
) - var(
--mod-combobox-button-inline-offset,
var(--spectrum-combobox-button-inline-offset, 0px)
));padding-inline-start:var(
--mod-combobox-spacing-inline-start-edge-to-text,var(--spectrum-combobox-spacing-inline-start-edge-to-text)
)}:host([quiet]) .spectrum-Combobox-textfield #input{padding-inline-end:calc(var(--mod-combobox-button-width, var(--spectrum-combobox-button-width)) + var(
--mod-combobox-spacing-inline-icon-to-button,
var(--spectrum-combobox-spacing-inline-icon-to-button)
) + var(--mod-combobox-icon-size, var(--spectrum-combobox-icon-size)) + var(
--mod-combobox-spacing-inline-end-edge-to-text,
var(--spectrum-combobox-spacing-inline-end-edge-to-text)
) - var(
--mod-combobox-button-inline-offset,
var(--spectrum-combobox-button-inline-offset, 0px)
))}:host{--spectrum-combobox-border-color-default:var(
--system-spectrum-combobox-border-color-default
);--spectrum-combobox-border-color-hover:var(
--system-spectrum-combobox-border-color-hover
);--spectrum-combobox-border-color-focus:var(
--system-spectrum-combobox-border-color-focus
);--spectrum-combobox-border-color-focus-hover:var(
--system-spectrum-combobox-border-color-focus-hover
);--spectrum-combobox-border-color-key-focus:var(
--system-spectrum-combobox-border-color-key-focus
)}:host{display:inline-flex;flex-wrap:wrap}:host([label-position=inline-start]){flex-wrap:nowrap}:host([readonly]) sp-picker-button{pointer-events:none;visibility:hidden}sp-field-label{display:block;width:100%}:host([label-position=inline-start]) sp-field-label{width:auto}sp-popover{max-block-size:var(--sp-combobox-popover-max-block-size)}sp-popover:not(sp-overlay sp-popover){display:none}.icon{margin:0}::slotted([slot=option]){display:none}.button{bottom:0}[hidden]{display:none!important}.visually-hidden{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,kr=Object.defineProperty,wr=Object.getOwnPropertyDescriptor,yr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?wr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&kr(e,r,a),a};class zr extends S{constructor(){super(...arguments),this.autocomplete="none",this.availableOptions=[],this.open=!1,this.itemValue="",this.optionEls=[],this.applyFocusElementLabel=t=>{this.appliedLabel=t},this._returnItems=()=>{}}static get styles(){return[...super.styles,fr,w]}focus(){this.focusElement.focus()}click(){this.focus(),this.focusElement.click()}scrollToActiveDescendant(){var t;const e=this.shadowRoot.querySelector(`#${null==(t=this.activeDescendant)?void 0:t.value}`);e&&e.scrollIntoView({block:"nearest"})}handleComboboxKeydown(t){if(!this.readonly)if(t.altKey&&"ArrowDown"===t.code)this.open=!0;else if("ArrowDown"===t.code)t.preventDefault(),this.open=!0,this.activateNextDescendant(),this.scrollToActiveDescendant();else if("ArrowUp"===t.code)t.preventDefault(),this.open=!0,this.activatePreviousDescendant(),this.scrollToActiveDescendant();else if("Escape"===t.code)this.open||(this.value=""),this.open=!1;else if("Enter"===t.code)this.selectDescendant(),this.open=!1;else if("Home"===t.code)this.focusElement.setSelectionRange(0,0),this.activeDescendant=void 0;else if("End"===t.code){const{length:t}=this.value;this.focusElement.setSelectionRange(t,t),this.activeDescendant=void 0}else("ArrowLeft"===t.code||"ArrowRight"===t.code)&&(this.activeDescendant=void 0)}handleSlotchange(){this.setOptionsFromSlottedItems(),this.itemObserver.disconnect(),this.optionEls.map((t=>{this.itemObserver.observe(t,{attributes:!0,attributeFilter:["id"],childList:!0})}))}handleTooltipSlotchange(t){this.tooltipEl=t.target.assignedElements()[0]}setOptionsFromSlottedItems(){const t=this.optionSlot.assignedElements({flatten:!0});this.optionEls=t}activateNextDescendant(){const t=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):-1,e=(this.availableOptions.length+t+1)%this.availableOptions.length;this.activeDescendant=this.availableOptions[e]}activatePreviousDescendant(){const t=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):0,e=(this.availableOptions.length+t-1)%this.availableOptions.length;this.activeDescendant=this.availableOptions[e]}selectDescendant(){this.activeDescendant&&(this.value=this.activeDescendant.itemText)}filterAvailableOptions(){if("none"===this.autocomplete)return;const t=this.value.toLowerCase();this.availableOptions=(this.options||this.optionEls).filter((e=>e.itemText.toLowerCase().startsWith(t)))}handleInput(t){super.handleInput(t),this.activeDescendant=void 0,this.open=!0}handleMenuChange(t){const{target:e}=t,r=e.selected[0],o=(this.options||this.optionEls).find((t=>t.value===r));this.value=(null==o?void 0:o.itemText)||"",t.preventDefault(),this.open=!1,this._returnItems(),this.focus()}handleClosed(){this.open=!1}handleOpened(){}toggleOpen(){this.readonly?this.open=!1:(this.open=!this.open,this.inputElement.focus())}shouldUpdate(t){var e,r;return t.has("open")&&!this.open&&(this.activeDescendant=void 0),t.has("value")&&(this.filterAvailableOptions(),this.itemValue=null!=(r=null==(e=this.availableOptions.find((t=>t.itemText===this.value)))?void 0:e.value)?r:""),super.shouldUpdate(t)}onBlur(t){t.relatedTarget&&(this.contains(t.relatedTarget)||this.shadowRoot.contains(t.relatedTarget))||super.onBlur(t)}renderAppliedLabel(){const t=this.label||this.appliedLabel;return a`
            ${this.value?a`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="applied-label"
                      >
                          ${t}
                      </span>
                      <slot name="label" id="label">
                          <span class="visually-hidden" aria-hidden="true">
                              ${this.value}
                          </span>
                      </slot>
                  `:a`
                      <span hidden id="applied-label">${t}</span>
                  `}
        `}renderField(){return a`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${v(this.activeDescendant?`${this.activeDescendant.value}`:void 0)}
                aria-autocomplete=${v(this.autocomplete)}
                aria-controls=${v(this.open?"listbox-menu":void 0)}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open?"true":"false"}"
                aria-label=${v(this.label||this.appliedLabel)}
                aria-labelledby="applied-label label"
                aria-invalid=${v(this.invalid||void 0)}
                autocomplete="off"
                @click=${this.toggleOpen}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${D(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                maxlength=${v(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${v(this.minlength>-1?this.minlength:void 0)}
                pattern=${v(this.pattern)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
            />
        `}render(){const t=(this.input||this).offsetWidth;return this.tooltipEl&&(this.tooltipEl.disabled=this.open),a`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${v(this.label||this.appliedLabel)}
                aria-labelledby="applied-label label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused?"focus-visible is-keyboardFocused":""}"
                ?disabled=${this.disabled}
                ?focused=${this.focused}
                size=${this.size}
            ></sp-picker-button>
            <sp-overlay
                ?open=${this.open}
                .triggerElement=${this.input}
                offset="0"
                placement="bottom-start"
                .receivesFocus=${"false"}
                role="presentation"
            >
                <sp-popover
                    id="listbox"
                    ?open=${this.open}
                    role="presentation"
                    ?hidden=${0===this.availableOptions.length}
                >
                    <sp-menu
                        @change=${this.handleMenuChange}
                        tabindex="-1"
                        aria-labelledby="label applied-label"
                        aria-label=${v(this.label||this.appliedLabel)}
                        id="listbox-menu"
                        role="listbox"
                        selects=${v("none"===this.autocomplete?"single":void 0)}
                        .selected=${"none"===this.autocomplete&&this.itemValue?[this.itemValue]:[]}
                        style="min-width: ${t}px;"
                        size=${this.size}
                    >
                        ${j(this.availableOptions,(t=>t.value),(t=>{var e,r;return a`
                                    <sp-menu-item
                                        id="${t.value}"
                                        ?focused=${(null==(e=this.activeDescendant)?void 0:e.value)===t.value}
                                        aria-selected=${(null==(r=this.activeDescendant)?void 0:r.value)===t.value?"true":"false"}
                                        .value=${t.value}
                                    >
                                        ${t.itemText}
                                    </sp-menu-item>
                                `}))}
                        <slot
                            hidden
                            @slotchange=${this.handleSlotchange}
                        ></slot>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
            ${this.renderAppliedLabel()}
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("focusout",(t=>{const e=t.relatedTarget&&this.contains(t.relatedTarget);t.target===this&&!e&&(this.focused=!1)}))}async manageListOverlay(){this.open&&(this.focused=!0,this.focus())}updated(t){t.has("open")&&this.manageListOverlay(),!this.focused&&this.open&&(this.open=!1),t.has("activeDescendant")&&(t.get("activeDescendant")&&(t.get("activeDescendant").focused=!1),this.activeDescendant&&void 0!==this.activeDescendant.focused&&(this.activeDescendant.focused=!0)),(t.has("options")||t.has("optionEls"))&&(this.availableOptions=this.options||this.optionEls)}async getUpdateComplete(){const t=await super.getUpdateComplete(),e=this.shadowRoot.querySelector("#listbox");if(e){const t=[...e.children];await Promise.all(t.map((t=>t.updateComplete)))}return t}connectedCallback(){super.connectedCallback(),this.itemObserver||(this.itemObserver=new MutationObserver(this.setOptionsFromSlottedItems.bind(this)))}disconnectedCallback(){this.itemObserver.disconnect(),this.open=!1,super.disconnectedCallback()}}yr([$()],zr.prototype,"activeDescendant",2),yr([s({type:String})],zr.prototype,"autocomplete",2),yr([$()],zr.prototype,"availableOptions",2),yr([s({type:Boolean,reflect:!0})],zr.prototype,"open",2),yr([b("slot:not([name])")],zr.prototype,"optionSlot",2),yr([b("#input")],zr.prototype,"input",2),yr([s({type:Array})],zr.prototype,"options",2),yr([$()],zr.prototype,"optionEls",2),customElements.define("sp-combobox",zr);var xr=r`
:host{align-items:center;block-size:100vh;block-size:-webkit-fill-available;block-size:-moz-available;block-size:stretch;box-sizing:border-box;display:flex;inline-size:100vw;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:visibility 0s linear var(
--mod-modal-transition-animation-duration,var(--spectrum-modal-transition-animation-duration)
);visibility:hidden;z-index:2}:host([open]){visibility:visible}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]){border-radius:0;inline-size:100%;height:100%;max-inline-size:100%;max-height:100%}:host([responsive]){margin-top:0}}
`,Cr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,Pr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?$r(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Cr(e,r,a),a};class Sr extends(k(c)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[xr,V]}get dialog(){return this.shadowRoot.querySelector("slot").assignedElements()[0]||this}async focus(){if(this.shadowRoot){const t=K(this.dialog);t?(t.updateComplete&&await t.updateComplete,t.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(t){t.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(t){this.dispatchEvent(new TransitionEvent(t.type,{bubbles:!0,composed:!0,propertyName:t.propertyName}))}handleUnderlayTransitionend(t){!this.open&&"visibility"===t.propertyName&&this.resolveTransitionPromise(),this.handleTransitionEvent(t)}handleModalTransitionend(t){(this.open||!this.underlay)&&this.resolveTransitionPromise(),this.handleTransitionEvent(t)}update(t){t.has("open")&&void 0!==t.get("open")&&(this.animating=!0,this.transitionPromise=new Promise((t=>{this.resolveTransitionPromise=()=>{this.animating=!1,t()}})),this.open||this.dispatchClosed()),super.update(t)}renderDialog(){return a`
            <slot></slot>
        `}render(){return a`
            ${this.underlay?a`
                      <sp-underlay
                          ?open=${this.open}
                          @click=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:l}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(t){t.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}Pr([s({type:Boolean,reflect:!0})],Sr.prototype,"dismissable",2),Pr([s({type:Boolean,reflect:!0})],Sr.prototype,"open",2),Pr([s({type:String,reflect:!0})],Sr.prototype,"mode",2),Pr([s({type:Boolean})],Sr.prototype,"responsive",2),Pr([s({type:Boolean})],Sr.prototype,"underlay",2),n("sp-dialog-base",Sr);var Dr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Lr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Br(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Dr(e,r,a),a};class Er extends Sr{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){const t=this.noDivider||!this.headline||"none"===this.headlineVisibility;return a`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${t}
                ?error=${this.error}
                mode=${v(this.mode)}
                size=${v(this.size)}
            >
                ${this.hero?a`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${v(this.heroLabel?void 0:"true")}
                              alt=${v(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:l}
                ${this.headline?a`
                          <h2
                              slot="heading"
                              ?hidden=${"none"===this.headlineVisibility}
                          >
                              ${this.headline}
                          </h2>
                      `:l}
                <slot></slot>
                ${this.footer?a`
                          <div slot="footer">${this.footer}</div>
                      `:l}
                ${this.cancelLabel?a`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:l}
                ${this.secondaryLabel?a`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:l}
                ${this.confirmLabel?a`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:l}
            </sp-dialog>
        `}}Lr([s({type:Boolean,reflect:!0})],Er.prototype,"error",2),Lr([s({attribute:"cancel-label"})],Er.prototype,"cancelLabel",2),Lr([s({attribute:"confirm-label"})],Er.prototype,"confirmLabel",2),Lr([s()],Er.prototype,"footer",2),Lr([s()],Er.prototype,"hero",2),Lr([s({attribute:"hero-label"})],Er.prototype,"heroLabel",2),Lr([s({type:Boolean,reflect:!0,attribute:"no-divider"})],Er.prototype,"noDivider",2),Lr([s({type:String,reflect:!0})],Er.prototype,"size",2),Lr([s({attribute:"secondary-label"})],Er.prototype,"secondaryLabel",2),Lr([s()],Er.prototype,"headline",2),Lr([s({type:String,attribute:"headline-visibility"})],Er.prototype,"headlineVisibility",2),n("sp-dialog-wrapper",Er);var jr=r`
:host{--spectrum-drop-zone-padding:var(--spectrum-spacing-400);--spectrum-drop-zone-illustration-to-heading:var(--spectrum-spacing-400);--spectrum-drop-zone-heading-to-body:var(--spectrum-spacing-75);--spectrum-drop-zone-border-width:var(--spectrum-border-width-200);--spectrum-drop-zone-corner-radius:var(--spectrum-corner-radius-100);--spectrum-drop-zone-border-color:var(--spectrum-gray-300);--spectrum-drop-zone-heading-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-heading-font-weight:var(
--spectrum-heading-sans-serif-font-weight
);--spectrum-drop-zone-heading-font-style:var(
--spectrum-heading-sans-serif-font-style
);--spectrum-drop-zone-heading-font-size:var(
--spectrum-drop-zone-title-size
);--spectrum-drop-zone-heading-line-height:var(
--spectrum-heading-line-height
);--spectrum-drop-zone-heading-color:var(--spectrum-heading-color);--spectrum-drop-zone-body-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-body-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-drop-zone-body-font-style:var(
--spectrum-body-sans-serif-font-style
);--spectrum-drop-zone-body-font-size:var(--spectrum-drop-zone-body-size);--spectrum-drop-zone-body-line-height:var(--spectrum-body-line-height);--spectrum-drop-zone-body-color:var(--spectrum-body-color);--spectrum-drop-zone-background-color:var(
--spectrum-drop-zone-background-color-rgb
);--spectrum-drop-zone-border-color-hover:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-illustration-color:var(
--spectrum-neutral-visual-color
);--spectrum-drop-zone-illustration-color-hover:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-content-height:var(--spectrum-component-height-300);--spectrum-drop-zone-content-max-width:var(
--spectrum-drop-zone-content-maximum-width
);--spectrum-drop-zone-content-edge-to-text:var(
--spectrum-component-edge-to-text-300
);--spectrum-drop-zone-content-top-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-drop-zone-content-bottom-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-drop-zone-content-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-content-font-weight:var(--spectrum-bold-font-weight);--spectrum-drop-zone-content-font-style:var(--spectrum-default-font-style);--spectrum-drop-zone-content-font-size:var(--spectrum-font-size-300);--spectrum-drop-zone-content-line-height:var(--spectrum-line-height-100);--spectrum-drop-zone-content-background-color:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-content-color:var(--spectrum-white);--mod-illustrated-message-content-maximum-width:var(
--mod-drop-zone-content-maximum-width,var(--spectrum-drop-zone-content-maximum-width)
);--mod-illustrated-message-illustration-color:var(
--mod-drop-zone-illustration-color,var(--spectrum-drop-zone-illustration-color)
);--mod-illustrated-message-title-to-heading:var(
--mod-drop-zone-illustration-to-heading,var(--spectrum-drop-zone-illustration-to-heading)
);--mod-illustrated-message-heading-to-body:var(
--mod-drop-zone-heading-to-body,var(--spectrum-drop-zone-heading-to-body)
);--mod-illustrated-message-title-font-family:var(
--mod-drop-zone-heading-font-family,var(--spectrum-drop-zone-heading-font-family)
);--mod-illustrated-message-title-font-weight:var(
--mod-drop-zone-heading-font-weight,var(--spectrum-drop-zone-heading-font-weight)
);--mod-illustrated-message-title-font-style:var(
--mod-drop-zone-heading-font-style,var(--spectrum-drop-zone-heading-font-style)
);--mod-illustrated-message-title-font-size:var(
--mod-drop-zone-heading-font-size,var(--spectrum-drop-zone-heading-font-size)
);--mod-illustrated-message-title-line-height:var(
--mod-drop-zone-heading-line-height,var(--spectrum-drop-zone-heading-line-height)
);--mod-illustrated-message-title-color:var(
--mod-drop-zone-heading-color,var(--spectrum-drop-zone-heading-color)
);--mod-illustrated-message-description-position:relative;--mod-illustrated-message-description-z-index:10;--mod-illustrated-message-heading-to-description:0;--mod-illustrated-message-description-font-family:var(
--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family)
);--mod-illustrated-message-description-font-weight:var(
--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight)
);--mod-illustrated-message-description-font-style:var(
--mod-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style)
);--mod-illustrated-message-description-font-size:var(
--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size)
);--mod-illustrated-message-description-line-height:var(
--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height)
);--mod-illustrated-message-description-color:var(
--mod-drop-zone-body-color,var(--spectrum-drop-zone-body-color)
);--mod-actionbutton-font-size:var(
--mod-drop-zone-content-font-size,var(--spectrum-drop-zone-content-font-size)
);--mod-actionbutton-label-color:var(
--mod-drop-zone-content-color,var(--spectrum-drop-zone-content-color)
);--mod-actionbutton-edge-to-text:var(
--mod-drop-zone-content-edge-to-text,var(--spectrum-drop-zone-content-edge-to-text)
)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-drop-zone-heading-font-size:var(
--spectrum-drop-zone-cjk-title-size
)}:host{background-color:var(
--mod-drop-zone-background-color,var(--spectrum-drop-zone-background-color)
);background-size:cover;border-color:var(
--mod-drop-zone-border-color,var(--spectrum-drop-zone-border-color)
);border-radius:var(
--mod-drop-zone-corner-radius,var(--spectrum-drop-zone-corner-radius)
);border-style:var(--mod-drop-zone-border-style,dashed);border-width:var(
--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width)
);box-sizing:border-box;inline-size:var(--mod-drop-zone-width,var(--spectrum-drop-zone-width));padding:calc(var(--mod-drop-zone-padding, var(--spectrum-drop-zone-padding)) - var(
--mod-drop-zone-border-width,
var(--spectrum-drop-zone-border-width)
));text-align:center}:host([dragged]){--mod-drop-zone-border-style:var(
--mod-drop-zone-border-style--dragged,var(--mod-drop-zone-border-style-dragged,solid)
);--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(
--mod-drop-zone-background-color-opacity,var(--spectrum-drop-zone-background-color-opacity)
));--spectrum-drop-zone-border-color:var(
--highcontrast-drop-zone-border-color-hover,var(
--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)
)
);--mod-illustrated-message-illustration-color:var(
--mod-drop-zone-illustration-color-hover,var(--spectrum-drop-zone-illustration-color-hover)
)}:host .is-filled{--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(
--mod-drop-zone-background-color-opacity-filled,var(--spectrum-drop-zone-background-color-opacity-filled)
));--mod-illustrated-message-display:none}:host([dragged]) .is-filled{--mod-drop-zone-content-display:flex}:host(.focus-visible){--mod-drop-zone-border-style:solid;--spectrum-drop-zone-border-color:var(
--highcontrast-drop-zone-border-color-hover,var(
--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)
)
);outline:0}:host(:focus-visible){--mod-drop-zone-border-style:solid;--spectrum-drop-zone-border-color:var(
--highcontrast-drop-zone-border-color-hover,var(
--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)
)
);outline:0}.spectrum-DropZone-content{align-items:center;block-size:100%;display:var(--mod-drop-zone-content-display,none);justify-content:center;position:relative;z-index:10}.spectrum-DropZone-button{background-color:var(
--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color)
);block-size:var(
--mod-drop-zone-content-height,var(--spectrum-drop-zone-content-height)
);border:none;box-sizing:border-box;font-family:var(
--mod-drop-zone-content-font-family,var(--spectrum-drop-zone-content-font-family)
);font-style:var(
--mod-drop-zone-content-font-style,var(--spectrum-drop-zone-content-font-style)
);font-weight:var(
--mod-drop-zone-content-font-weight,var(--spectrum-drop-zone-content-font-weight)
);line-height:var(
--mod-drop-zone-content-line-height,var(--spectrum-drop-zone-content-line-height)
);max-inline-size:var(
--mod-drop-zone-content-max-width,var(--spectrum-drop-zone-content-max-width)
);padding-block-end:var(
--mod-drop-zone-content-bottom-to-text,var(--spectrum-drop-zone-content-bottom-to-text)
);padding-block-start:var(
--mod-drop-zone-content-top-to-text,var(--spectrum-drop-zone-content-top-to-text)
)}.spectrum-DropZone-button:focus{background-color:var(
--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color)
)}@media (hover:hover){.spectrum-DropZone-button:hover{background-color:var(
--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color)
)}}@media (forced-colors:active){:host{--highcontrast-drop-zone-illustration-color:CanvasText;--highcontrast-drop-zone-border-color-hover:Highlight;--highcontrast-illustrated-message-illustration-color:var(
--highcontrast-drop-zone-illustration-color
)}}:host{display:block}::slotted(*){font-family:var(
--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family)
);font-size:var(
--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size)
);font-style:var(
--spectrum-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style)
);font-weight:var(
--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight)
);line-height:var(
--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height)
);margin-bottom:0;margin-top:0}
`,Ar=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor;class qr extends c{constructor(){super(...arguments),this._dropEffect="copy",this.isDragged=!1,this.debouncedDragLeave=null}static get styles(){return[jr]}get dropEffect(){return this._dropEffect}set dropEffect(t){["copy","move","link","none"].includes(t)&&(this._dropEffect=t)}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave)}onDragOver(t){const e=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:t}),r=this.dispatchEvent(e);if(!t.dataTransfer)return;if(!r)return void(t.dataTransfer.dropEffect="none");t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,t.dataTransfer.dropEffect=this.dropEffect;const o=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(o)}onDragLeave(t){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout((()=>{this.isDragged=!1;const e=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}),100)}onDrop(t){t.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const e=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}render(){return a`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null)}}((t,e,r,o)=>{for(var i,a=o>1?void 0:o?Mr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);o&&a&&Ar(e,r,a)})([s({type:Boolean,reflect:!0,attribute:"dragged"})],qr.prototype,"isDragged",2),n("sp-dropzone",qr);var Hr=r`
:host{--spectrum-fieldgroup-margin:var(--spectrum-spacing-300);--spectrum-fieldgroup-readonly-delimiter:","}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{display:flex;flex-flow:column wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`,Tr=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,Fr=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Or(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Tr(e,r,a),a};class Ir extends(B(c,{mode:"external"})){constructor(){super(...arguments),this.horizontal=!1,this.invalid=!1,this.label="",this.vertical=!1}static get styles(){return[Hr]}handleSlotchange(){}render(){return a`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","group")}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}Fr([s({type:Boolean,reflect:!0})],Ir.prototype,"horizontal",2),Fr([s({type:Boolean,reflect:!0})],Ir.prototype,"invalid",2),Fr([s()],Ir.prototype,"label",2),Fr([s({type:Boolean,reflect:!0})],Ir.prototype,"vertical",2),n("sp-field-group",Ir);var _r=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor;class Nr extends d{constructor(){super(...arguments),this.registered=!1,this.handleRemoved=({detail:t})=>{t.name===this.name&&(this.registered=!1,this.addIconset())}}firstUpdated(){this.style.display="none"}set name(t){this.registered&&(this._name&&G.getInstance().removeIconset(this._name),t&&G.getInstance().addIconset(t,this)),this._name=t}get name(){return this._name}connectedCallback(){super.connectedCallback(),this.addIconset(),window.addEventListener("sp-iconset-removed",this.handleRemoved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-removed",this.handleRemoved),this.removeIconset()}addIconset(){!this.name||this.registered||(G.getInstance().addIconset(this.name,this),this.registered=!0)}removeIconset(){this.name&&(G.getInstance().removeIconset(this.name),this.registered=!1)}}((t,e,r,o)=>{for(var i,a=o>1?void 0:o?Rr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);o&&a&&_r(e,r,a)})([s()],Nr.prototype,"name",1);var Ur=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor;class Kr extends Nr{constructor(){super(...arguments),this.iconMap=new Map}updated(t){if(!this.slotContainer)return;const e=this.getSVGNodes(this.slotContainer);this.updateSVG(e),super.updated(t)}async applyIconToElement(t,e,r,o){await this.updateComplete;const i=this.iconMap.get(e);if(!i)throw new Error(`Unable to find icon ${e}`);const a=this.prepareSvgClone(i);a.setAttribute("role","img"),o?a.setAttribute("aria-label",o):a.setAttribute("aria-hidden","true"),t.shadowRoot?t.shadowRoot.appendChild(a):t.appendChild(a)}getIconList(){return[...this.iconMap.keys()]}prepareSvgClone(t){const e=t.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=e.getAttribute("viewBox")||"";for(r.style.cssText="pointer-events: none; display: block; width: 100%; height: 100%;",r.setAttribute("viewBox",o),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false");e.childNodes.length>0;)r.appendChild(e.childNodes[0]);return r}getSVGIconName(t){return t}getSanitizedIconName(t){return t}renderDefaultContent(){return a``}render(){return a`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `}updateSVG(t){t.reduce(((t,e)=>{const r=e.querySelectorAll("symbol");return t.push(...r),t}),[]).forEach((t=>{this.iconMap.set(this.getSanitizedIconName(t.id),t)}))}getSVGNodes(t){return t.assignedNodes({flatten:!0}).filter((t=>"svg"===t.nodeName))}onSlotChange(t){const e=t.target,r=this.getSVGNodes(e);this.updateSVG(r)}}((t,e,r,o)=>{for(var i,a=o>1?void 0:o?Vr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);o&&a&&Ur(e,r,a)})([b("slot")],Kr.prototype,"slotContainer",2);var Gr=u`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 14 14"><path d="M12.93 6.227 9.023 2.32a1.094 1.094 0 1 0-1.546 1.547l2.039 2.04H1.844a1.094 1.094 0 1 0 0 2.187h7.672l-2.04 2.039a1.094 1.094 0 0 0 1.547 1.547l3.907-3.907a1.093 1.093 0 0 0 0-1.546"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 16 16"><path d="m14.606 7.194-4.458-4.459a1.14 1.14 0 1 0-1.612 1.612L11.05 6.86H2.108a1.14 1.14 0 0 0 0 2.28h8.942l-2.514 2.513a1.14 1.14 0 1 0 1.611 1.612l4.46-4.46a1.139 1.139 0 0 0 0-1.61z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 16 16"><path d="m15.364 7.161-5.083-5.083a1.186 1.186 0 0 0-1.678 1.678l3.057 3.058H1.277a1.187 1.187 0 1 0 0 2.373H11.66l-3.056 3.057a1.186 1.186 0 1 0 1.677 1.678l5.083-5.083a1.185 1.185 0 0 0 0-1.678"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 18 18"><path d="m17.216 8.126-5.79-5.79a1.236 1.236 0 0 0-1.746 1.75l3.683 3.683c-.008 0-.014-.004-.021-.004H1.337a1.236 1.236 0 0 0 0 2.472H13.34c.007 0 .013-.004.02-.004l-3.68 3.682a1.236 1.236 0 1 0 1.748 1.748l5.789-5.789a1.237 1.237 0 0 0 0-1.748zm-2.643.895c0-.008.004-.014.004-.021s-.004-.013-.004-.02l.02.02z"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 22 22"><path d="m20.17 10.089-6.585-6.585a1.289 1.289 0 0 0-1.822 1.822l4.386 4.386H2.276a1.288 1.288 0 0 0 0 2.576h13.873l-4.386 4.386a1.289 1.289 0 0 0 1.822 1.822l6.585-6.585a1.289 1.289 0 0 0 0-1.822"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 24 24"><path d="m22.24 11.052-7.485-7.485a1.341 1.341 0 0 0-1.897 1.897l5.194 5.194H2.079a1.342 1.342 0 0 0 0 2.684h15.973l-5.194 5.194a1.341 1.341 0 1 0 1.897 1.897l7.484-7.485a1.34 1.34 0 0 0 0-1.896z"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 12 12"><path d="M11.325 5.258 7.91 1.84a1.05 1.05 0 0 0-1.486 1.484L8.048 4.95H1.494a1.05 1.05 0 0 0 0 2.1h6.554L6.423 8.675a1.05 1.05 0 0 0 1.486 1.484l3.416-3.417a1.05 1.05 0 0 0 0-1.484"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 10 10"><path d="M8.176 8.281c.069.07.115.163 0 .255l-1.437.927c-.115.07-.161.024-.208-.092l-1.783-3.1-2.339 2.571c-.024.045-.093.091-.161 0L1.136 7.678c-.116-.069-.093-.139 0-.208l2.639-2.2-3.01-1.134c-.046 0-.115-.092-.07-.209l.788-1.574a.123.123 0 0 1 .151-.083.128.128 0 0 1 .058.038l2.639 1.713L4.494.64a.122.122 0 0 1 .1-.139.172.172 0 0 1 .038 0l1.922.255c.116 0 .139.046.116.163l-.9 3.31 3.057-.927c.069-.046.139-.046.185.092l.3 1.713c.023.116 0 .162-.093.162l-3.2.255z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 12 12"><path d="M9.575 9.696c.077.079.129.183 0 .287L7.96 11.025c-.129.079-.182.027-.234-.1L5.72 7.433l-2.633 2.893c-.027.051-.1.1-.182 0l-1.251-1.3c-.131-.077-.1-.156 0-.234l2.97-2.476-3.388-1.285c-.052 0-.129-.1-.079-.235l.886-1.771a.138.138 0 0 1 .17-.093.144.144 0 0 1 .065.042l2.97 1.928.183-3.8a.137.137 0 0 1 .114-.156.197.197 0 0 1 .042 0l2.163.287c.131 0 .156.052.131.183L6.86 5.136l3.44-1.043c.077-.052.156-.052.208.1l.339 1.928c.025.13 0 .183-.1.183l-3.6.287z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 12 12"><path d="M10.024 10.155c.087.089.146.206 0 .323l-1.819 1.173c-.146.089-.2.03-.263-.117L5.685 7.605l-2.962 3.254c-.03.057-.117.116-.2 0L1.116 9.392c-.147-.087-.117-.176 0-.263l3.339-2.785L.642 4.908c-.059 0-.146-.117-.089-.264l1-1.993a.156.156 0 0 1 .192-.1.163.163 0 0 1 .073.048l3.337 2.163.206-4.28a.155.155 0 0 1 .128-.176.23.23 0 0 1 .047 0l2.433.323c.147 0 .176.059.147.206l-1.144 4.19 3.87-1.173c.087-.06.176-.06.234.117l.381 2.169c.028.147 0 .206-.117.206l-4.046.323z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.825 6.903c.061.062.1.144 0 .227l-1.277.824c-.1.062-.143.02-.185-.082L3.78 5.112 1.7 7.398c-.021.04-.082.08-.143 0L.569 6.367c-.1-.061-.082-.123 0-.185l2.347-1.957-2.68-1.007c-.041 0-.1-.082-.062-.186l.7-1.4a.109.109 0 0 1 .135-.073.114.114 0 0 1 .051.033l2.347 1.523.145-3.006a.109.109 0 0 1 .09-.123.14.14 0 0 1 .033 0l1.709.227c.1 0 .123.04.1.144l-.8 2.943 2.718-.824c.061-.041.123-.041.165.082l.268 1.523c.02.1 0 .144-.082.144l-2.842.227z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 14 14"><path d="M5.125 12.625a1.25 1.25 0 0 1-.96-.45L1.04 8.425a1.25 1.25 0 0 1 1.92-1.6l2.136 2.563 5.922-7.536a1.25 1.25 0 1 1 1.964 1.545l-6.874 8.75a1.25 1.25 0 0 1-.965.478z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 14 14"><path d="M4.891 13.224a1.304 1.304 0 0 1-1.005-.474l-3.54-4.3a1.302 1.302 0 0 1 2.011-1.655l2.508 3.046 6.758-8.647a1.302 1.302 0 1 1 2.05 1.604l-7.756 9.926a1.301 1.301 0 0 1-1.01.5z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 16 16"><path d="M5.627 14.894a1.357 1.357 0 0 1-1.042-.488l-4.1-4.92A1.357 1.357 0 0 1 2.569 7.75l3.027 3.631L13.4 1.448a1.356 1.356 0 0 1 2.133 1.675l-8.84 11.252a1.356 1.356 0 0 1-1.048.519z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 18 18"><path d="M6.33 16.642a1.415 1.415 0 0 1-1.086-.509l-4.683-5.62a1.413 1.413 0 0 1 2.171-1.81l3.566 4.28 8.936-11.374a1.413 1.413 0 0 1 2.223 1.746L7.441 16.102a1.415 1.415 0 0 1-1.09.54z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 12 12"><path d="M4.519 10.608a1.151 1.151 0 0 1-.885-.414L1.27 7.358a1.152 1.152 0 0 1 1.77-1.476l1.453 1.743 4.45-5.665a1.152 1.152 0 0 1 1.813 1.424l-5.331 6.784a1.153 1.153 0 0 1-.89.44z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 20 20"><path d="M6.997 18.48a1.47 1.47 0 0 1-1.13-.53L.521 11.538a1.471 1.471 0 1 1 2.26-1.885l4.182 5.017L17.18 1.666a1.472 1.472 0 1 1 2.314 1.818L8.154 17.917a1.472 1.472 0 0 1-1.135.562z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 24 24"><path d="M8.621 21.417a1.535 1.535 0 0 1-1.178-.552l-6.091-7.31a1.533 1.533 0 1 1 2.355-1.962l4.879 5.854L20.249 2.602a1.533 1.533 0 1 1 2.41 1.895L9.826 20.831a1.53 1.53 0 0 1-1.182.585z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 12 12"><path d="M4.333 11.09a1.2 1.2 0 0 1-.922-.433L.69 7.392a1.2 1.2 0 1 1 1.844-1.536l1.772 2.126 5.14-6.542a1.2 1.2 0 1 1 1.886 1.482L5.277 10.63a1.2 1.2 0 0 1-.927.459z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 14 14"><path d="M4.5 13.25a1.094 1.094 0 0 1-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 0 1 5.273 1.07l5.157 5.156a1.094 1.094 0 0 1 0 1.546L5.273 12.93a1.091 1.091 0 0 1-.773.321z"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 16 16"><path d="M5.123 15.005a1.14 1.14 0 0 1-.806-1.945L9.377 8l-5.06-5.06a1.14 1.14 0 0 1 1.612-1.61l5.865 5.864a1.139 1.139 0 0 1 0 1.612L5.929 14.67a1.135 1.135 0 0 1-.806.334z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 16 16"><path d="M4.696 15.853a1.187 1.187 0 0 1-.84-2.026L9.684 8 3.856 2.173A1.187 1.187 0 0 1 5.536.495L12.2 7.16a1.187 1.187 0 0 1 0 1.678l-6.666 6.666a1.183 1.183 0 0 1-.84.348z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 18 18"><path d="M5.213 17.805a1.236 1.236 0 0 1-.874-2.11L11.034 9 4.34 2.305A1.236 1.236 0 0 1 6.087.557l7.57 7.569a1.235 1.235 0 0 1 0 1.748l-7.57 7.569a1.232 1.232 0 0 1-.874.362"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 20 20"><path d="M5.667 19.876a1.288 1.288 0 0 1-.91-2.199L12.433 10 4.756 2.323A1.288 1.288 0 0 1 6.578.502l8.588 8.587a1.288 1.288 0 0 1 0 1.822l-8.588 8.588a1.284 1.284 0 0 1-.911.377"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 24 24"><path d="M7.05 23.078a1.341 1.341 0 0 1-.948-2.29L14.89 12 6.102 3.212a1.341 1.341 0 0 1 1.896-1.898l9.737 9.737a1.34 1.34 0 0 1 0 1.898l-9.737 9.737a1.335 1.335 0 0 1-.948.392"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 12 12"><path d="M3.833 11.578a1.05 1.05 0 0 1-.742-1.793L6.876 6 3.091 2.215A1.05 1.05 0 1 1 4.575.73l4.529 4.527a1.05 1.05 0 0 1 0 1.486L4.575 11.27a1.047 1.047 0 0 1-.742.308"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 7 7"><path d="M6.687.75a.311.311 0 0 0-.221.091L.842 6.466a.312.312 0 0 0 .221.533h5.624a.312.312 0 0 0 .312-.312V1.062A.312.312 0 0 0 6.687.75"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 8 8"><path d="M7.65.97a.35.35 0 0 0-.249.1L1.07 7.401a.352.352 0 0 0 .249.6H7.65a.352.352 0 0 0 .352-.352V1.322A.352.352 0 0 0 7.65.97"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 8 8"><path d="M7.605.09a.394.394 0 0 0-.28.116L.206 7.325A.4.4 0 0 0 .49 8h7.115a.4.4 0 0 0 .4-.4V.49a.4.4 0 0 0-.4-.4"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 6 6"><path d="M5.718.44a.277.277 0 0 0-.2.081l-5 5a.278.278 0 0 0 .2.474h5a.278.278 0 0 0 .278-.278v-5A.278.278 0 0 0 5.718.44"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 10 10"><path d="M6.548 5 9.63 1.917A1.094 1.094 0 0 0 8.084.371L5.001 3.454 1.917.37A1.094 1.094 0 0 0 .371 1.917L3.454 5 .37 8.085A1.094 1.094 0 1 0 1.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 1 0 1.547-1.546z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 12 12"><path d="m7.611 6 3.654-3.653A1.14 1.14 0 0 0 9.653.735L6 4.39 2.347.735A1.14 1.14 0 0 0 .735 2.347L4.39 6 .735 9.653a1.14 1.14 0 1 0 1.612 1.612L6 7.61l3.653 3.654a1.14 1.14 0 0 0 1.612-1.612z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 14 14"><path d="m8.678 7 4.245-4.244a1.186 1.186 0 0 0-1.678-1.678L7.001 5.323 2.755 1.077a1.187 1.187 0 0 0-1.678 1.678L5.322 7l-4.244 4.244a1.187 1.187 0 0 0 1.678 1.678l4.245-4.245 4.244 4.245a1.186 1.186 0 0 0 1.678-1.678z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 16 16"><path d="m9.748 8 4.915-4.915a1.236 1.236 0 0 0-1.748-1.748L8 6.252 3.085 1.337a1.236 1.236 0 0 0-1.748 1.748L6.252 8l-4.915 4.915a1.236 1.236 0 1 0 1.748 1.748L8 9.748l4.915 4.915a1.236 1.236 0 0 0 1.748-1.748z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 16 16"><path d="m9.823 8 5.674-5.674A1.289 1.289 0 1 0 13.675.504L8 6.179 2.326.503A1.288 1.288 0 0 0 .504 2.326l5.674 5.675-5.674 5.674a1.288 1.288 0 0 0 1.822 1.822L8 9.822l5.674 5.675a1.289 1.289 0 1 0 1.823-1.822z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 18 18"><path d="m10.897 9 6.537-6.536A1.341 1.341 0 1 0 15.537.567L9 7.104 2.465.567A1.341 1.341 0 0 0 .567 2.464L7.104 9 .567 15.537a1.341 1.341 0 1 0 1.897 1.897L9 10.897l6.536 6.537a1.341 1.341 0 1 0 1.897-1.897z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 10 10"><path d="m6.485 5 2.674-2.674A1.05 1.05 0 1 0 7.674.84L5 3.515 2.326.84A1.05 1.05 0 0 0 .84 2.326L3.515 5 .84 7.674A1.05 1.05 0 0 0 2.326 9.16L5 6.485 7.674 9.16A1.05 1.05 0 1 0 9.16 7.674z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 12 12"><path d="M10.375 7.25h-8.75a1.25 1.25 0 0 1 0-2.5h8.75a1.25 1.25 0 0 1 0 2.5"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 14 14"><path d="M12.026 8.302H1.974a1.302 1.302 0 0 1 0-2.604h10.052a1.302 1.302 0 0 1 0 2.604"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 16 16"><path d="M13.763 9.356H2.237a1.356 1.356 0 0 1 0-2.712h11.526a1.356 1.356 0 0 1 0 2.712"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 18 18"><path d="M15.596 10.413H2.404a1.413 1.413 0 0 1 0-2.826h13.192a1.413 1.413 0 0 1 0 2.826"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 10 10"><path d="M8.293 6.152H1.708a1.152 1.152 0 0 1 0-2.304h6.585a1.152 1.152 0 1 1 0 2.304"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 20 20"><path d="M17.54 11.472H2.461a1.472 1.472 0 0 1 0-2.944h15.077a1.472 1.472 0 0 1 0 2.944z"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 22 22"><path d="M19.604 12.533H2.398a1.533 1.533 0 1 1 0-3.066h17.206a1.533 1.533 0 0 1 0 3.066"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 10 10"><path d="M8.75 6.2h-7.5a1.2 1.2 0 0 1 0-2.4h7.5a1.2 1.2 0 1 1 0 2.4"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 20 6"><path d="M19.375 1.75H.625a.625.625 0 0 1 0-1.25h18.75a.625.625 0 0 1 0 1.25M20 4.875a.626.626 0 0 0-.625-.625H.625a.625.625 0 0 0 0 1.25h18.75A.626.626 0 0 0 20 4.875"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 30 4"><path d="M28.75 3.25H1.25a1.25 1.25 0 0 1 0-2.5h27.5a1.25 1.25 0 0 1 0 2.5"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 14 10"><path d="M12.625 1.25H1.375a.625.625 0 0 1 0-1.25h11.25a.625.625 0 0 1 0 1.25m.625 3.125a.626.626 0 0 0-.625-.625H1.375a.625.625 0 0 0 0 1.25h11.25a.626.626 0 0 0 .625-.625m0 3.75a.626.626 0 0 0-.625-.625H1.375a.625.625 0 0 0 0 1.25h11.25a.626.626 0 0 0 .625-.625"/></symbol></svg>`;n("sp-icons-large",class extends Kr{constructor(){super(),this.name="ui"}renderDefaultContent(){return Gr}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var Xr=u`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-Arrow100" viewBox="0 0 10 10"><path d="M9.7 4.387 6.623 1.262a.875.875 0 1 0-1.247 1.226l1.61 1.637H.925a.875.875 0 0 0 0 1.75h6.062l-1.61 1.637a.875.875 0 1 0 1.247 1.226l3.075-3.125a.874.874 0 0 0 0-1.226z"/></symbol><symbol id="spectrum-icon-Arrow200" viewBox="0 0 12 12"><path d="M11.284 5.356 7.718 1.788a.911.911 0 1 0-1.29 1.29l2.012 2.01H1.286a.911.911 0 1 0 0 1.823H8.44L6.429 8.923a.911.911 0 0 0 1.289 1.289l3.566-3.567a.912.912 0 0 0 0-1.29z"/></symbol><symbol id="spectrum-icon-Arrow300" viewBox="0 0 14 14"><path d="M12.893 6.33 8.826 2.261a.95.95 0 1 0-1.344 1.341L9.93 6.051H1.621a.95.95 0 1 0 0 1.898H9.93l-2.447 2.447a.95.95 0 0 0 1.344 1.342l4.067-4.067a.95.95 0 0 0 0-1.342z"/></symbol><symbol id="spectrum-icon-Arrow400" viewBox="0 0 16 16"><path d="m14.572 7.3-4.63-4.63a.989.989 0 0 0-1.399 1.398l2.942 2.943H1.87a.99.99 0 0 0 0 1.978h9.615l-2.942 2.943a.989.989 0 1 0 1.398 1.398l4.631-4.63a.988.988 0 0 0 0-1.4"/></symbol><symbol id="spectrum-icon-Arrow500" viewBox="0 0 18 18"><path d="m16.336 8.271-5.269-5.267A1.03 1.03 0 1 0 9.61 4.46l3.51 3.509H2.021a1.03 1.03 0 0 0 0 2.06H13.12l-3.51 3.51a1.03 1.03 0 1 0 1.457 1.456l5.269-5.268a1.03 1.03 0 0 0 0-1.456"/></symbol><symbol id="spectrum-icon-Arrow600" viewBox="0 0 20 20"><path d="m18.191 9.241-5.986-5.987a1.073 1.073 0 0 0-1.518 1.517l4.155 4.156H2.063a1.073 1.073 0 1 0 0 2.146h12.779l-4.154 4.155a1.073 1.073 0 1 0 1.517 1.518l5.986-5.987a1.073 1.073 0 0 0 0-1.518"/></symbol><symbol id="spectrum-icon-Arrow75" viewBox="0 0 10 10"><path d="M9.26 4.406 6.528 1.672A.84.84 0 0 0 5.34 2.859l1.3 1.301H1.396a.84.84 0 0 0 0 1.68H6.64l-1.301 1.3a.84.84 0 0 0 1.188 1.188l2.734-2.734a.84.84 0 0 0 0-1.188z"/></symbol><symbol id="spectrum-icon-Asterisk100" viewBox="0 0 8 8"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 0 1 .167-.036L3.5 3.148l.13-2.7a.1.1 0 0 1 .081-.111.15.15 0 0 1 .03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></symbol><symbol id="spectrum-icon-Asterisk200" viewBox="0 0 10 10"><path d="M7.861 7.953c.062.063.1.146 0 .23l-1.293.834c-.1.063-.145.021-.187-.083l-1.6-2.793-2.105 2.314c-.021.04-.083.082-.145 0l-1-1.043c-.1-.062-.083-.125 0-.187l2.375-1.981-2.715-1.026c-.042 0-.1-.083-.063-.188l.707-1.412a.111.111 0 0 1 .136-.074.116.116 0 0 1 .052.034l2.378 1.54.146-3.043A.11.11 0 0 1 4.638.95a.161.161 0 0 1 .034 0l1.73.23c.1 0 .125.042.1.146l-.814 2.979 2.751-.834c.062-.042.125-.042.167.083l.271 1.542c.02.1 0 .146-.083.146l-2.876.23z"/></symbol><symbol id="spectrum-icon-Asterisk300" viewBox="0 0 10 10"><path d="M8.266 8.324c.07.071.116.164 0 .258l-1.454.938c-.116.071-.163.024-.21-.094l-1.8-3.141-2.367 2.6c-.024.045-.094.092-.163 0l-1.13-1.167c-.118-.07-.094-.141 0-.21l2.671-2.227L.766 4.13c-.047 0-.116-.094-.071-.211l.8-1.593a.124.124 0 0 1 .153-.084.13.13 0 0 1 .058.038l2.669 1.738.164-3.422a.124.124 0 0 1 .1-.14.186.186 0 0 1 .038 0l1.945.258c.118 0 .14.047.118.164l-.915 3.349 3.094-.938c.07-.047.14-.047.187.094l.3 1.734c.023.118 0 .164-.094.164l-3.234.258z"/></symbol><symbol id="spectrum-icon-Asterisk75" viewBox="0 0 8 8"><path d="M6.26 6.463c.049.05.082.116 0 .181l-1.022.659c-.082.05-.115.017-.148-.066L3.822 5.03 2.16 6.859c-.017.032-.066.065-.115 0l-.79-.824c-.083-.049-.066-.1 0-.148l1.877-1.565L.99 3.516c-.033 0-.082-.066-.05-.148l.56-1.119a.087.087 0 0 1 .108-.059.09.09 0 0 1 .04.027l1.878 1.218.116-2.4a.087.087 0 0 1 .072-.1h.027l1.367.181c.083 0 .1.033.083.116L4.55 3.581l2.174-.659c.049-.033.1-.033.132.066l.214 1.218c.016.083 0 .115-.066.115l-2.273.181z"/></symbol><symbol id="spectrum-icon-Checkmark100" viewBox="0 0 10 10"><path d="M3.5 9.5a.999.999 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"/></symbol><symbol id="spectrum-icon-Checkmark200" viewBox="0 0 12 12"><path d="M4.313 10.98a1.042 1.042 0 0 1-.8-.375L.647 7.165a1.042 1.042 0 0 1 1.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 0 1 1.64 1.287l-6.24 7.94a1.04 1.04 0 0 1-.804.399z"/></symbol><symbol id="spectrum-icon-Checkmark300" viewBox="0 0 14 14"><path d="M5.102 12.514a1.087 1.087 0 0 1-.834-.39L.988 8.19A1.085 1.085 0 0 1 2.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 0 1 1.707 1.34L5.955 12.1a1.089 1.089 0 0 1-.838.415z"/></symbol><symbol id="spectrum-icon-Checkmark400" viewBox="0 0 16 16"><path d="M5.864 14.114a1.13 1.13 0 0 1-.868-.407L1.25 9.21a1.13 1.13 0 1 1 1.736-1.448l2.854 3.425 7.148-9.1a1.13 1.13 0 1 1 1.778 1.397L6.753 13.682a1.13 1.13 0 0 1-.872.432z"/></symbol><symbol id="spectrum-icon-Checkmark50" viewBox="0 0 10 10"><path d="M3.815 8.687a.921.921 0 0 1-.708-.332l-1.891-2.27a.921.921 0 0 1 1.416-1.18L3.794 6.3l3.56-4.531a.921.921 0 1 1 1.45 1.138L4.54 8.335a.921.921 0 0 1-.712.351z"/></symbol><symbol id="spectrum-icon-Checkmark500" viewBox="0 0 16 16"><path d="M5.597 14.784a1.177 1.177 0 0 1-.905-.424L.417 9.229a1.177 1.177 0 1 1 1.809-1.508l3.343 4.013 8.174-10.402a1.177 1.177 0 0 1 1.852 1.456L6.523 14.334a1.178 1.178 0 0 1-.91.45z"/></symbol><symbol id="spectrum-icon-Checkmark600" viewBox="0 0 18 18"><path d="M6.297 16.534a1.228 1.228 0 0 1-.942-.442L.48 10.244a1.227 1.227 0 0 1 1.885-1.57l3.904 4.684L15.6 1.482a1.227 1.227 0 0 1 1.93 1.516L7.262 16.065a1.229 1.229 0 0 1-.947.469z"/></symbol><symbol id="spectrum-icon-Checkmark75" viewBox="0 0 10 10"><path d="M3.667 9.07a.96.96 0 0 1-.737-.344L.753 6.114a.96.96 0 1 1 1.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 0 1 1.51 1.186L4.422 8.704a.962.962 0 0 1-.741.367z"/></symbol><symbol id="spectrum-icon-Chevron100" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 0 1-.615-1.498L5.88 5 2.385 1.547A.875.875 0 0 1 3.615.302L7.74 4.377a.876.876 0 0 1 0 1.246L3.615 9.698A.872.872 0 0 1 3 9.95"/></symbol><symbol id="spectrum-icon-Chevron200" viewBox="0 0 12 12"><path d="M9.034 5.356 4.343.663a.911.911 0 0 0-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 1 0 1.289 1.29l4.691-4.692a.912.912 0 0 0 0-1.29z"/></symbol><symbol id="spectrum-icon-Chevron300" viewBox="0 0 14 14"><path d="M10.639 7a.947.947 0 0 0-.278-.671l-.003-.002-5.33-5.33a.95.95 0 0 0-1.342 1.342L8.346 7l-4.661 4.66a.95.95 0 1 0 1.342 1.343l5.33-5.33.003-.001A.947.947 0 0 0 10.64 7z"/></symbol><symbol id="spectrum-icon-Chevron400" viewBox="0 0 16 16"><path d="M4.97 15.044a.989.989 0 0 1-.698-1.688L9.627 8 4.27 2.644a.989.989 0 0 1 1.4-1.398L11.726 7.3a.988.988 0 0 1 0 1.398L5.67 14.754a.985.985 0 0 1-.7.29"/></symbol><symbol id="spectrum-icon-Chevron500" viewBox="0 0 16 16"><path d="M12.133 7.271 5.263.401a1.03 1.03 0 0 0-1.457 1.457L9.947 8l-6.141 6.142a1.03 1.03 0 0 0 1.457 1.457l6.87-6.87a1.03 1.03 0 0 0 0-1.457z"/></symbol><symbol id="spectrum-icon-Chevron600" viewBox="0 0 18 18"><path d="M5.04 17.863a1.073 1.073 0 0 1-.759-1.832L11.313 9 4.28 1.969A1.073 1.073 0 0 1 5.8.45l7.79 7.79a1.073 1.073 0 0 1 0 1.518l-7.79 7.79a1.07 1.07 0 0 1-.759.314z"/></symbol><symbol id="spectrum-icon-Chevron75" viewBox="0 0 10 10"><path d="m7.482 4.406-.001-.001L3.86.783a.84.84 0 0 0-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 0 0 3.86 9.216l3.621-3.622h.001a.84.84 0 0 0 0-1.19z"/></symbol><symbol id="spectrum-icon-CornerTriangle100" viewBox="0 0 5 5"><path d="M4.763 0a.248.248 0 0 0-.177.073l-4.5 4.5A.25.25 0 0 0 .263 5h4.5a.25.25 0 0 0 .25-.25V.25a.25.25 0 0 0-.25-.25"/></symbol><symbol id="spectrum-icon-CornerTriangle200" viewBox="0 0 6 6"><path d="M5.719.37a.281.281 0 0 0-.2.082L.452 5.519a.281.281 0 0 0 .2.481h5.067A.281.281 0 0 0 6 5.719V.652A.281.281 0 0 0 5.72.37z"/></symbol><symbol id="spectrum-icon-CornerTriangle300" viewBox="0 0 7 7"><path d="M6.683.67a.315.315 0 0 0-.223.093l-5.7 5.7a.316.316 0 0 0 .224.54h5.7A.316.316 0 0 0 7 6.687V.986A.316.316 0 0 0 6.684.67z"/></symbol><symbol id="spectrum-icon-CornerTriangle75" viewBox="0 0 5 5"><path d="M4.78.558a.222.222 0 0 0-.157.065l-4 4a.222.222 0 0 0 .157.379h4a.222.222 0 0 0 .222-.222v-4A.222.222 0 0 0 4.78.558"/></symbol><symbol id="spectrum-icon-Cross100" viewBox="0 0 8 8"><path d="m5.238 4 2.456-2.457A.875.875 0 1 0 6.456.306L4 2.763 1.543.306A.875.875 0 0 0 .306 1.544L2.763 4 .306 6.457a.875.875 0 1 0 1.238 1.237L4 5.237l2.456 2.457a.875.875 0 1 0 1.238-1.237z"/></symbol><symbol id="spectrum-icon-Cross200" viewBox="0 0 10 10"><path d="m6.29 5 2.922-2.922a.911.911 0 0 0-1.29-1.29L5 3.712 2.078.789a.911.911 0 0 0-1.29 1.289L3.712 5 .79 7.922a.911.911 0 1 0 1.289 1.29L5 6.288 7.923 9.21a.911.911 0 0 0 1.289-1.289z"/></symbol><symbol id="spectrum-icon-Cross300" viewBox="0 0 12 12"><path d="m7.344 6 3.395-3.396a.95.95 0 0 0-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 0 0-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 0 0 1.343 1.343L6 7.344l3.395 3.395a.95.95 0 0 0 1.344-1.344z"/></symbol><symbol id="spectrum-icon-Cross400" viewBox="0 0 12 12"><path d="m7.398 6 3.932-3.932A.989.989 0 0 0 9.932.67L6 4.602 2.068.67A.989.989 0 0 0 .67 2.068L4.602 6 .67 9.932a.989.989 0 1 0 1.398 1.398L6 7.398l3.932 3.932a.989.989 0 0 0 1.398-1.398z"/></symbol><symbol id="spectrum-icon-Cross500" viewBox="0 0 14 14"><path d="m8.457 7 4.54-4.54a1.03 1.03 0 0 0-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 0 0-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 1 0 1.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 0 0 1.456-1.458z"/></symbol><symbol id="spectrum-icon-Cross600" viewBox="0 0 16 16"><path d="m9.518 8 5.23-5.228a1.073 1.073 0 0 0-1.518-1.518L8.001 6.483l-5.229-5.23a1.073 1.073 0 0 0-1.518 1.519L6.483 8l-5.23 5.229a1.073 1.073 0 1 0 1.518 1.518l5.23-5.23 5.228 5.23a1.073 1.073 0 0 0 1.518-1.518z"/></symbol><symbol id="spectrum-icon-Cross75" viewBox="0 0 8 8"><path d="m5.188 4 2.14-2.14A.84.84 0 1 0 6.141.672L4 2.812 1.86.672A.84.84 0 0 0 .672 1.86L2.812 4 .672 6.14A.84.84 0 1 0 1.86 7.328L4 5.188l2.14 2.14A.84.84 0 1 0 7.328 6.14z"/></symbol><symbol id="spectrum-icon-Dash100" viewBox="0 0 10 10"><path d="M8.5 6h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2"/></symbol><symbol id="spectrum-icon-Dash200" viewBox="0 0 12 12"><path d="M10.021 7.042H1.98a1.042 1.042 0 1 1 0-2.083h8.043a1.042 1.042 0 0 1 0 2.083z"/></symbol><symbol id="spectrum-icon-Dash300" viewBox="0 0 12 12"><path d="M10.61 7.085H1.39a1.085 1.085 0 0 1 0-2.17h9.22a1.085 1.085 0 0 1 0 2.17"/></symbol><symbol id="spectrum-icon-Dash400" viewBox="0 0 14 14"><path d="M12.277 8.13H1.723a1.13 1.13 0 1 1 0-2.26h10.554a1.13 1.13 0 1 1 0 2.26"/></symbol><symbol id="spectrum-icon-Dash50" viewBox="0 0 8 8"><path d="M6.634 4.921H1.366a.921.921 0 0 1 0-1.842h5.268a.921.921 0 1 1 0 1.842"/></symbol><symbol id="spectrum-icon-Dash500" viewBox="0 0 16 16"><path d="M14.03 9.178H1.969a1.178 1.178 0 1 1 0-2.356H14.03a1.178 1.178 0 0 1 0 2.356"/></symbol><symbol id="spectrum-icon-Dash600" viewBox="0 0 18 18"><path d="M15.882 10.227H2.117a1.227 1.227 0 0 1 0-2.454h13.765a1.227 1.227 0 0 1 0 2.454"/></symbol><symbol id="spectrum-icon-Dash75" viewBox="0 0 8 8"><path d="M6.99 4.96H1.01a.96.96 0 0 1 0-1.92h5.98a.96.96 0 0 1 0 1.92"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="0 0 16 4"><path d="M15.45 1.05H.55a.5.5 0 0 1 0-1h14.9a.5.5 0 0 1 0 1m.5 2.4a.5.5 0 0 0-.5-.5H.55a.5.5 0 0 0 0 1h14.9a.5.5 0 0 0 .5-.5"/></symbol><symbol id="spectrum-icon-SingleGripper" viewBox="0 0 24 2"><path d="M23 2H1a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="0 0 10 8"><path d="M9.45 1.05H.55a.5.5 0 0 1 0-1h8.9a.5.5 0 0 1 0 1m.5 2.45a.5.5 0 0 0-.5-.5H.55a.5.5 0 0 0 0 1h8.9a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5H.55a.5.5 0 0 0 0 1h8.9a.5.5 0 0 0 .5-.5"/></symbol></svg>`;n("sp-icons-medium",class extends Kr{constructor(){super(),this.name="ui"}renderDefaultContent(){return Xr}getSVGIconName(t){return`spectrum-icon-${t}`}getSanitizedIconName(t){return t.replace("spectrum-icon-","")}});var Wr=r`
:host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium)}:host{inline-size:auto;margin-block:var(
--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2)
);margin-inline:var(
--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content)
);overflow:visible}.spectrum-Menu-back.focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.spectrum-Menu-back:focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.spectrum-Menu-back{align-items:center;display:flex;flex-flow:wrap;padding-block:var(--mod-menu-back-padding-block-start,0) var(--mod-menu-back-padding-block-end,0);padding-inline:var(--mod-menu-back-padding-inline-start,0) var(
--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content)
)}.spectrum-Menu-backButton{background:none;border:0;cursor:pointer;display:inline-flex;margin:0;padding:0}.spectrum-Menu-backButton.focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)
)
);display:block;font-size:var(
--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size)
);font-weight:var(
--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight)
);line-height:var(
--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height)
)}.spectrum-Menu-backIcon{fill:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
);color:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
);margin-block:var(
--mod-menu-back-icon-margin-block,var(--spectrum-menu-back-icon-margin)
);margin-inline:var(
--mod-menu-back-icon-margin-inline,var(--spectrum-menu-back-icon-margin)
)}:host{display:block;flex-shrink:0}
`;class Yr extends(o(c,{validSizes:["s","m","l"]})){static get styles(){return[M,Wr]}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}}n("sp-menu-divider",Yr);var Zr=r`
:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(
--spectrum-animation-ease-in-out
);--spectrum-progressbar-animation-duration-indeterminate:var(
--spectrum-animation-duration-2000
);--spectrum-progressbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-progressbar-fill-size-indeterminate:70%;--spectrum-progressbar-size-2400:192px;--spectrum-progressbar-size-2500:200px;--spectrum-progressbar-size-2800:224px;--spectrum-progressbar-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-progressbar-min-size:var(--spectrum-progress-bar-minimum-width);--spectrum-progressbar-max-size:var(--spectrum-progress-bar-maximum-width);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-medium
);--spectrum-progressbar-line-height:var(--spectrum-line-height-100);--spectrum-progressbar-spacing-label-to-progressbar:var(
--spectrum-spacing-75
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-progressbar-spacing-label-to-text:var(--spectrum-spacing-200);--spectrum-progressbar-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-progressbar-track-color:var(--spectrum-gray-300);--spectrum-progressbar-fill-color:var(--spectrum-accent-color-900);--spectrum-progressbar-fill-color-positive:var(
--spectrum-positive-visual-color
);--spectrum-progressbar-fill-color-notice:var(
--spectrum-notice-visual-color
);--spectrum-progressbar-fill-color-negative:var(
--spectrum-negative-visual-color
);--spectrum-progressbar-label-and-value-white:var(--spectrum-white);--spectrum-progressbar-track-color-white:var(
--spectrum-transparent-white-300
);--spectrum-progressbar-fill-color-white:var(--spectrum-white);--spectrum-meter-min-width:var(--spectrum-meter-minimum-width);--spectrum-meter-max-width:var(--spectrum-meter-maximum-width);--spectrum-meter-inline-size:var(--spectrum-meter-default-width);--spectrum-meter-thickness-s:var(--spectrum-meter-thickness-small);--spectrum-meter-thickness-l:var(--spectrum-meter-thickness-large);--spectrum-meter-top-to-text:var(--spectrum-component-top-to-text)}:host([size=s]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-small
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host{--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=l]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2500);--spectrum-progressbar-font-size:var(--spectrum-font-size-100);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
)}:host([size=xl]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2800);--spectrum-progressbar-font-size:var(--spectrum-font-size-200);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-extra-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
)}:host{--spectrum-progressbar-size-default:var(
--mod-meter-inline-size,var(--spectrum-meter-inline-size)
);--spectrum-progressbar-max-size:var(
--mod-meter-max-width,var(--spectrum-meter-max-width)
);--spectrum-progressbar-min-size:var(
--mod-meter-min-width,var(--spectrum-meter-min-width)
)}:host([variant=positive]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host([variant=notice]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host([variant=negative]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-negative,var(--spectrum-progressbar-fill-color-negative)
)
)}:host{align-items:center;display:inline-flex;flex-flow:wrap;font-size:var(
--mod-progressbar-font-size,var(--spectrum-progressbar-font-size)
);inline-size:var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
);justify-content:space-between;max-inline-size:var(
--mod-progressbar-max-size,var(--spectrum-progressbar-max-size)
);min-inline-size:var(
--mod-progressbar-min-size,var(--spectrum-progressbar-min-size)
);position:relative;vertical-align:top}.label,.percentage{color:var(
--mod-progressbar-text-color,var(--spectrum-progressbar-text-color)
);line-height:var(
--mod-progressbar-line-height,var(--spectrum-progressbar-line-height)
);margin-block-end:var(
--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar)
);margin-block-start:var(
--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text)
);text-align:start}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(
--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk)
)}.label{flex:1}.percentage{align-self:flex-start;margin-inline-start:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}.track{background-color:var(
--highcontrast-progressbar-track-color,var(
--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)
)
);border-radius:var(--spectrum-progressbar-corner-radius);inline-size:100%;overflow:hidden}.fill,.track{block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
)}.fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)
)
);border:none;transition:width 1s}:host([indeterminate]) .fill{animation-timing-function:var(
--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate)
);inline-size:var(
--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate)
);position:relative;will-change:transform}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between}:host([side-label]) .track{flex:1 1 var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
)}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}:host([side-label]) .percentage{margin-block-end:0;margin-inline-start:var(
--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
);order:3;text-align:end}:host([static=white]) .fill{background-color:var(
--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white)
);color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .label,:host([static=white]) .percentage{color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .track{background-color:var(--spectrum-progressbar-track-color-white)}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(
--mod-progressbar-fill-size-indeterminate,
var(--spectrum-progressbar-fill-size-indeterminate)
)*-1))}to{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)
))}to{transform:translate(calc(var(
--mod-progressbar-size-default,
var(--spectrum-progressbar-size-default)
)*-1))}}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left}:host([dir=rtl]) .fill{transform-origin:right}
`,Jr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,to=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Qr(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Jr(e,r,a),a};const eo=["positive","notice","negative"];class ro extends(o(g(c,""),{noDefaultSize:!0})){constructor(){super(...arguments),this.progress=0,this._variant="",this.label="",this.languageResolver=new Ye(this),this.sideLabel=!1}static get styles(){return[Zr]}set variant(t){if(t===this.variant)return;const e=this.variant;eo.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e)}get variant(){return this._variant}render(){return a`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?l:this.label}
                <slot @slotchange=${this.handleSlotchange}>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const t=X(this.label,this.slotEl);t&&(this.label=t)}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","meter progressbar")}updated(t){super.updated(t),t.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),t.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}to([s({type:Number})],ro.prototype,"progress",2),to([s({type:String})],ro.prototype,"variant",1),to([s({type:String,reflect:!0})],ro.prototype,"label",2),to([b("slot")],ro.prototype,"slotEl",2),to([s({type:Boolean,reflect:!0,attribute:"side-label"})],ro.prototype,"sideLabel",2),to([s({type:String,reflect:!0})],ro.prototype,"static",2),n("sp-meter",ro);let oo=new Map,io=!1;try{io="exceptZero"===new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay}catch(t){}let ao=!1;try{ao="unit"===new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style}catch(t){}const so={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class co{format(t){let e="";if(e=io||null==this.options.signDisplay?this.numberFormatter.format(t):function(t,e,r){if("auto"===e)return t.format(r);if("never"===e)return t.format(Math.abs(r));{let o=!1;if("always"===e?o=r>0||Object.is(r,0):"exceptZero"===e&&(Object.is(r,-0)||Object.is(r,0)?r=Math.abs(r):o=r>0),o){let e=t.format(-r),o=t.format(r),i=e.replace(o,"").replace(/\u200e|\u061C/,"");return 1!==[...i].length&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),e.replace(o,"!!!").replace(i,"+").replace("!!!",o)}return t.format(r)}}(this.numberFormatter,this.options.signDisplay,t),"unit"===this.options.style&&!ao){var r;let{unit:t,unitDisplay:o="short",locale:i}=this.resolvedOptions();if(!t)return e;let a=null===(r=so[t])||void 0===r?void 0:r[o];e+=a[i]||a.default}return e}formatToParts(t){return this.numberFormatter.formatToParts(t)}formatRange(t,e){if("function"==typeof this.numberFormatter.formatRange)return this.numberFormatter.formatRange(t,e);if(e<t)throw new RangeError("End date must be >= start date");return`${this.format(t)} – ${this.format(e)}`}formatRangeToParts(t,e){if("function"==typeof this.numberFormatter.formatRangeToParts)return this.numberFormatter.formatRangeToParts(t,e);if(e<t)throw new RangeError("End date must be >= start date");let r=this.numberFormatter.formatToParts(t),o=this.numberFormatter.formatToParts(e);return[...r.map((t=>({...t,source:"startRange"}))),{type:"literal",value:" – ",source:"shared"},...o.map((t=>({...t,source:"endRange"})))]}resolvedOptions(){let t=this.numberFormatter.resolvedOptions();return io||null==this.options.signDisplay||(t={...t,signDisplay:this.options.signDisplay}),ao||"unit"!==this.options.style||(t={...t,style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay}),t}constructor(t,e={}){this.numberFormatter=function(t,e={}){let{numberingSystem:r}=e;r&&t.includes("-nu-")&&(t.includes("-u-")||(t+="-u-"),t+=`-nu-${r}`);if("unit"===e.style&&!ao){var o;let{unit:t,unitDisplay:r="short"}=e;if(!t)throw new Error('unit option must be provided with style: "unit"');if(!(null===(o=so[t])||void 0===o?void 0:o[r]))throw new Error(`Unsupported unit ${t} with unitDisplay = ${r}`);e={...e,style:"decimal"}}let i=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():"");if(oo.has(i))return oo.get(i);let a=new Intl.NumberFormat(t,e);return oo.set(i,a),a}(t,e),this.options=e}}const no=new RegExp("^.*\\(.*\\).*$"),lo=["latn","arab","hanidec"];class uo{parse(t){return ho(this.locale,this.options,t).parse(t)}isValidPartialNumber(t,e,r){return ho(this.locale,this.options,t).isValidPartialNumber(t,e,r)}getNumberingSystem(t){return ho(this.locale,this.options,t).options.numberingSystem}constructor(t,e={}){this.locale=t,this.options=e}}const po=new Map;function ho(t,e,r){let o=mo(t,e);if(!t.includes("-nu-")&&!o.isValidPartialNumber(r))for(let i of lo)if(i!==o.options.numberingSystem){let o=mo(t+(t.includes("-u-")?"-nu-":"-u-nu-")+i,e);if(o.isValidPartialNumber(r))return o}return o}function mo(t,e){let r=t+(e?Object.entries(e).sort(((t,e)=>t[0]<e[0]?-1:1)).join():""),o=po.get(r);return o||(o=new bo(t,e),po.set(r,o)),o}class bo{parse(t){let e=this.sanitize(t);if(this.symbols.group&&(e=fo(e,this.symbols.group,"")),this.symbols.decimal&&(e=e.replace(this.symbols.decimal,".")),this.symbols.minusSign&&(e=e.replace(this.symbols.minusSign,"-")),e=e.replace(this.symbols.numeral,this.symbols.index),"percent"===this.options.style){let t=e.indexOf("-");e=e.replace("-","");let r=e.indexOf(".");-1===r&&(r=e.length),e=e.replace(".",""),e=r-2==0?`0.${e}`:r-2==-1?`0.0${e}`:r-2==-2?"0.00":`${e.slice(0,r-2)}.${e.slice(r-2)}`,t>-1&&(e=`-${e}`)}let r=e?+e:NaN;if(isNaN(r))return NaN;if("percent"===this.options.style){let t={...this.options,style:"decimal",minimumFractionDigits:Math.min(this.options.minimumFractionDigits+2,20),maximumFractionDigits:Math.min(this.options.maximumFractionDigits+2,20)};return new uo(this.locale,t).parse(new co(this.locale,t).format(r))}return"accounting"===this.options.currencySign&&no.test(t)&&(r*=-1),r}sanitize(t){return t=t.replace(this.symbols.literals,""),this.symbols.minusSign&&(t=t.replace("-",this.symbols.minusSign)),"arab"===this.options.numberingSystem&&(this.symbols.decimal&&(t=(t=t.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal)),this.symbols.group&&(t=fo(t,".",this.symbols.group))),"fr-FR"===this.options.locale&&(t=fo(t,".",String.fromCharCode(8239))),t}isValidPartialNumber(t,e=-1/0,r=1/0){return t=this.sanitize(t),this.symbols.minusSign&&t.startsWith(this.symbols.minusSign)&&e<0?t=t.slice(this.symbols.minusSign.length):this.symbols.plusSign&&t.startsWith(this.symbols.plusSign)&&r>0&&(t=t.slice(this.symbols.plusSign.length)),(!this.symbols.group||!t.startsWith(this.symbols.group))&&(!(this.symbols.decimal&&t.indexOf(this.symbols.decimal)>-1&&0===this.options.maximumFractionDigits)&&(this.symbols.group&&(t=fo(t,this.symbols.group,"")),t=t.replace(this.symbols.numeral,""),this.symbols.decimal&&(t=t.replace(this.symbols.decimal,"")),0===t.length))}constructor(t,e={}){var r,o;this.locale=t,this.formatter=new Intl.NumberFormat(t,e),this.options=this.formatter.resolvedOptions(),this.symbols=function(t,e,r,o){var i,a,s,c;let n=new Intl.NumberFormat(t,{...r,minimumSignificantDigits:1,maximumSignificantDigits:21}),l=n.formatToParts(-10000.111),d=n.formatToParts(10000.111),u=go.map((t=>n.formatToParts(t)));var p;let h=null!==(p=null===(i=l.find((t=>"minusSign"===t.type)))||void 0===i?void 0:i.value)&&void 0!==p?p:"-",m=null===(a=d.find((t=>"plusSign"===t.type)))||void 0===a?void 0:a.value;m||"exceptZero"!==(null==o?void 0:o.signDisplay)&&"always"!==(null==o?void 0:o.signDisplay)||(m="+");let b=new Intl.NumberFormat(t,{...r,minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(.001),v=null===(s=b.find((t=>"decimal"===t.type)))||void 0===s?void 0:s.value,g=null===(c=l.find((t=>"group"===t.type)))||void 0===c?void 0:c.value,f=l.filter((t=>!vo.has(t.type))).map((t=>ko(t.value))),k=u.flatMap((t=>t.filter((t=>!vo.has(t.type))).map((t=>ko(t.value))))),w=[...new Set([...f,...k])].sort(((t,e)=>e.length-t.length)),y=0===w.length?new RegExp("[\\p{White_Space}]","gu"):new RegExp(`${w.join("|")}|[\\p{White_Space}]`,"gu"),z=[...new Intl.NumberFormat(r.locale,{useGrouping:!1}).format(9876543210)].reverse(),x=new Map(z.map(((t,e)=>[t,e]))),C=new RegExp(`[${z.join("")}]`,"g"),$=t=>String(x.get(t));return{minusSign:h,plusSign:m,decimal:v,group:g,literals:y,numeral:C,index:$}}(t,this.formatter,this.options,e),"percent"===this.options.style&&((null!==(r=this.options.minimumFractionDigits)&&void 0!==r?r:0)>18||(null!==(o=this.options.maximumFractionDigits)&&void 0!==o?o:0)>18)&&console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.")}}const vo=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]),go=[0,4,2,1,11,20,3,7,100,21,.1,1.1];function fo(t,e,r){return t.replaceAll?t.replaceAll(e,r):t.split(e).join(r)}function ko(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var wo=r`
:host{--spectrum-infield-button-height:var(--spectrum-component-height-100);--spectrum-infield-button-width:var(--spectrum-component-height-100);--spectrum-infield-button-stacked-border-radius-reset:var(
--spectrum-in-field-button-fill-stacked-inner-border-rounding
);--spectrum-infield-button-edge-to-fill:var(
--spectrum-in-field-button-edge-to-fill
);--spectrum-infield-button-inner-edge-to-fill:var(
--spectrum-in-field-button-stacked-inner-edge-to-fill
);--spectrum-infield-button-fill-padding:0px;--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-infield-button-icon-color:var(
--spectrum-neutral-content-color-default
);--spectrum-infield-button-icon-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-infield-button-icon-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-infield-button-icon-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-infield-button-fill-justify-content:center}:host([disabled]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-background-color-hover:var(
--mod-infield-button-background-color-hover-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-background-color-down:var(
--mod-infield-button-background-color-down-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-border-color:var(
--mod-infield-button-border-color-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-icon-color:var(
--mod-infield-button-icon-color-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-hover:var(
--mod-infield-button-icon-color-hover-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-down:var(
--mod-infield-button-icon-color-down-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-key-focus:var(
--mod-infield-button-icon-color-key-focus-disabled,var(--spectrum-disabled-content-color)
)}:host([size=s]){--spectrum-infield-button-height:var(--spectrum-component-height-75);--spectrum-infield-button-width:var(--spectrum-component-height-75);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-small
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-small
)}:host([size=l]){--spectrum-infield-button-height:var(--spectrum-component-height-200);--spectrum-infield-button-width:var(--spectrum-component-height-200);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-large
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-large
)}:host([size=xl]){--spectrum-infield-button-height:var(--spectrum-component-height-300);--spectrum-infield-button-width:var(--spectrum-component-height-300);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-extra-large
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-extra-large
)}:host([block=end]),:host([block=start]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-medium)
)}:host([block=end][size=s]),:host([block=start][size=s]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-small)
)}:host([block=end][size=l]),:host([block=start][size=l]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-large)
)}:host([block=end][size=xl]),:host([block=start][size=xl]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-extra-large)
)}:host([quiet]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-quiet,transparent
);--mod-infield-button-background-color-hover:var(
--mod-infield-button-background-color-hover-quiet,transparent
);--mod-infield-button-background-color-down:var(
--mod-infield-button-background-color-down-quiet,transparent
);--mod-infield-button-background-color-key-focus:var(
--mod-infield-button-background-color-key-focus-quiet,transparent
);--mod-infield-border-color:var(
--mod-infield-border-color-quiet,transparent
);--mod-infield-button-border-width:var(
--mod-infield-button-border-width-quiet,0
)}:host([quiet][disabled]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-quiet-disabled,transparent
);--mod-infield-button-border-color:var(
--mod-infield-button-border-color-quiet-disabled,transparent
)}@media (forced-colors:active){:host(.focus-visible):not(:disabled),:host:active:not(:disabled){--highcontrast-infield-button-border-color:Highlight}:host(:focus-visible):not(:disabled),:host:active:not(:disabled){--highcontrast-infield-button-border-color:Highlight}@media (hover:hover){:host(:hover):not(:disabled){--highcontrast-infield-button-border-color:Highlight}}}:host{align-items:center;background-color:#0000;block-size:var(
--mod-infield-button-height,var(--spectrum-infield-button-height)
);border-style:none;cursor:pointer;display:flex;inline-size:var(
--mod-infield-button-width,var(--spectrum-infield-button-width)
);justify-content:center;padding:var(
--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)
)}.fill{background-color:var(
--mod-infield-button-background-color,var(--spectrum-infield-button-background-color)
);block-size:100%;border-color:var(
--highcontrast-infield-button-border-color,var(
--mod-infield-button-border-color,var(--spectrum-infield-button-border-color)
)
);border-end-end-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-end-start-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-start-end-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-start-start-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-style:solid;border-width:var(
--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)
);inline-size:100%;padding:var(
--mod-infield-button-fill-padding,var(--spectrum-infield-button-fill-padding)
)}::slotted(*){color:var(
--mod-infield-button-icon-color,var(--spectrum-infield-button-icon-color)
)}:host([inline=end]) .fill{border-end-start-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
)}:host([inline=start]) .fill{border-end-end-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
);border-start-end-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
)}:host([disabled]){cursor:auto}@media (hover:hover){:host(:hover) .fill{background-color:var(
--mod-infield-button-background-color-hover,var(--spectrum-infield-button-background-color-hover)
)}:host(:hover) ::slotted(*){color:var(
--mod-infield-button-icon-color-hover,var(--spectrum-infield-button-icon-color-hover)
)}}:host:active .fill{background-color:var(
--mod-infield-button-background-color-down,var(--spectrum-infield-button-background-color-down)
)}:host:active ::slotted(*){color:var(
--mod-infield-button-icon-color-down,var(--spectrum-infield-button-icon-color-down)
)}:host(.focus-visible){outline:none}:host(:focus-visible){outline:none}:host(.focus-visible) .fill{background-color:var(
--mod-infield-button-background-color-key-focus,var(--spectrum-infield-button-background-color-key-focus)
)}:host(:focus-visible) .fill{background-color:var(
--mod-infield-button-background-color-key-focus,var(--spectrum-infield-button-background-color-key-focus)
)}:host(.focus-visible) ::slotted(*){color:var(
--mod-infield-button-icon-color-key-focus,var(--spectrum-infield-button-icon-color-key-focus)
)}:host(:focus-visible) ::slotted(*){color:var(
--mod-infield-button-icon-color-key-focus,var(--spectrum-infield-button-icon-color-key-focus)
)}.fill{align-items:center;display:flex;justify-content:var(
--mod-infield-button-fill-justify-content,var(--spectrum-infield-button-fill-justify-content)
);transition:border-color var(--spectrum-global-animation-duration-100) ease-in-out}:host([block=end]),:host([block=start]){block-size:calc(var(--mod-infield-button-height, var(--spectrum-infield-button-height))/2)}:host([block=end]) .fill,:host([block=start]) .fill{box-sizing:border-box;padding-inline-end:calc(var(
--mod-infield-button-stacked-fill-padding-inline,
var(--spectrum-infield-button-stacked-fill-padding-inline)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
));padding-inline-start:calc(var(
--mod-infield-button-stacked-fill-padding-inline,
var(--spectrum-infield-button-stacked-fill-padding-inline)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}:host([block=start]){padding-block-end:var(
--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)
)}:host([block=start]) .fill{border-block-end:none;border-end-end-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-end-start-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-stacked-top-border-radius-start-start,var(--spectrum-infield-button-stacked-top-border-radius-start-start)
);padding-block-end:calc(var(
--mod-infield-button-stacked-fill-padding-inner,
var(--spectrum-infield-button-stacked-fill-padding-inner)
) - var(
--mod-infield-button-inner-edge-to-fill,
var(--spectrum-infield-button-inner-edge-to-fill)
));padding-block-start:calc(var(
--mod-infield-button-stacked-fill-padding-outer,
var(--spectrum-infield-button-stacked-fill-padding-outer)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}:host([block=end]){padding-block-start:var(
--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)
)}:host([block=end]) .fill{border-block-end-width:var(
--mod-infield-button-stacked-bottom-border-block-end-width,var(
--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)
)
);border-end-end-radius:var(
--mod-infield-button-stacked-bottom-border-radius-end-end,var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
)
);border-end-start-radius:var(
--mod-infield-button-stacked-bottom-border-radius-end-start,var(--spectrum-infield-button-stacked-bottom-border-radius-end-start)
);border-start-end-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);padding-block-end:calc(var(
--mod-infield-button-stacked-fill-padding-outer,
var(--spectrum-infield-button-stacked-fill-padding-outer)
) - var(
--mod-infield-button-inner-edge-to-fill,
var(--spectrum-infield-button-inner-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
));padding-block-start:calc(var(
--mod-infield-button-stacked-fill-padding-inner,
var(--spectrum-infield-button-stacked-fill-padding-inner)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}::slotted(*){display:initial;flex-shrink:0;margin:0!important}:host{--spectrum-infield-button-border-width:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-width
);--spectrum-infield-button-border-color:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-color
);--spectrum-infield-button-border-radius:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-radius
);--spectrum-infield-button-border-radius-reset:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-radius-reset
);--spectrum-infield-button-stacked-top-border-radius-start-start:var(
--system-spectrum-infieldbutton-spectrum-infield-button-stacked-top-border-radius-start-start
);--spectrum-infield-button-stacked-bottom-border-radius-end-start:var(
--system-spectrum-infieldbutton-spectrum-infield-button-stacked-bottom-border-radius-end-start
);--spectrum-infield-button-background-color:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color
);--spectrum-infield-button-background-color-hover:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-hover
);--spectrum-infield-button-background-color-down:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-down
);--spectrum-infield-button-background-color-key-focus:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-key-focus
)}:host{box-sizing:border-box;-webkit-user-select:none;user-select:none}
`,yo=Object.defineProperty,zo=Object.getOwnPropertyDescriptor,xo=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?zo(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&yo(e,r,a),a};class Co extends(o(N,{noDefaultSize:!0,validSizes:["s","m","l","xl"]})){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[...super.styles,wo]}get buttonContent(){return[a`
            <div class="fill">
                <slot></slot>
            </div>
        `]}}xo([s()],Co.prototype,"block",2),xo([s()],Co.prototype,"inline",2),xo([s({type:Boolean,reflect:!0})],Co.prototype,"quiet",2),customElements.define("sp-infield-button",Co);var $o=r`
:host{--spectrum-stepper-height:var(--spectrum-component-height-100);--spectrum-stepper-border-radius:var(--spectrum-corner-radius-100);--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-medium
);--spectrum-stepper-button-padding:var(
--spectrum-in-field-button-edge-to-fill
);--spectrum-stepper-width:calc(var(--mod-stepper-height, var(--spectrum-stepper-height))*var(
--mod-stepper-min-width-multiplier,
var(--spectrum-text-field-minimum-width-multiplier)
) + var(
--mod-stepper-button-width,
var(--spectrum-stepper-button-width)
) + var(
--mod-stepper-border-width,
var(--spectrum-stepper-border-width)
)*2);--spectrum-stepper-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-stepper-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-stepper-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2);--spectrum-stepper-animation-duration:var(
--spectrum-animation-duration-100
);--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color,var(
--mod-stepper-buttons-border-color,var(--spectrum-stepper-buttons-border-color)
)
);--mod-infield-button-border-width:var(
--mod-stepper-button-border-width,var(--spectrum-stepper-button-border-width)
);--mod-textfield-border-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
)}:host([size=s]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-small
);--spectrum-stepper-height:var(--spectrum-component-height-75)}:host([size=l]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-large
);--spectrum-stepper-height:var(--spectrum-component-height-200)}:host([size=xl]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-extra-large
);--spectrum-stepper-height:var(--spectrum-component-height-300)}:host([quiet]) #textfield{--mod-infield-button-width-stacked:var(
--mod-stepper-button-width-quiet,var(--spectrum-stepper-button-width)
);--mod-textfield-focus-indicator-color:transparent}:host([disabled]) #textfield{--mod-infield-button-border-color-quiet-disabled:var(
--spectrum-disabled-border-color
)}:host([invalid]) #textfield{--mod-stepper-border-color:var(
--mod-stepper-border-color-invalid,var(--spectrum-negative-border-color-default)
);--mod-stepper-border-color-hover:var(
--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover)
);--mod-stepper-border-color-focus:var(
--mod-stepper-border-color-focus-invalid,var(--spectrum-negative-border-color-focus)
);--mod-stepper-border-color-focus-hover:var(
--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-negative-border-color-focus-hover)
);--mod-stepper-border-color-keyboard-focus:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-negative-border-color-key-focus)
);--mod-infield-button-border-color:var(
--mod-stepper-border-color-invalid,var(--spectrum-stepper-border-color-invalid)
);--mod-textfield-icon-spacing-inline-start-invalid:0}:host([invalid]) #textfield:focus,:host([invalid][focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-focus-invalid,var(--spectrum-stepper-border-color-focus-invalid)
)}:host([invalid]) #textfield.focus-visible,:host([invalid][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid)
)}:host([invalid]) #textfield:focus-visible,:host([invalid][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid)
)}.x{border-radius:var(--spectrum-stepper-button-border-radius-reset)}#textfield{block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));border-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);display:inline-flex;flex-flow:row;inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));position:relative}#textfield,#textfield .input{border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
)}#textfield .input{border-end-end-radius:0;border-inline-end-width:0;border-start-end-radius:0}#textfield:focus,:host([focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-buttons-border-color-focus,var(--spectrum-stepper-buttons-border-color-focus)
)
)}#textfield:focus .input,:host([focused]) #textfield .input{outline:none}#textfield:focus .buttons,#textfield:focus .input,:host([focused]) #textfield .buttons,:host([focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}#textfield.focus-visible,:host([keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)
)
);outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield:focus-visible,:host([keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)
)
);outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield:focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield.focus-visible .buttons,#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}#textfield:focus-visible .buttons,#textfield:focus-visible .input,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}:host([quiet]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:0;border-start-start-radius:0}:host([quiet]) #textfield.hide-stepper .input{border-end-end-radius:0;border-inline-end-width:0}:host([quiet]) #textfield:after{block-size:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
);content:"";inline-size:100%;inset-block-end:calc((var(
--mod-stepper-focus-indicator-gap,
var(--spectrum-stepper-focus-indicator-gap)
) + var(
--mod-stepper-focus-indicator-width,
var(--spectrum-stepper-focus-indicator-width)
))*-1);inset-inline-start:0;position:absolute}:host([quiet]) #textfield .buttons{border:none}:host([quiet]) #textfield .button{--mod-infield-button-border-block-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);--mod-infield-button-stacked-bottom-border-block-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);--mod-infield-button-stacked-bottom-border-radius-end-end:0;--mod-infield-button-stacked-bottom-border-radius-end-start:0;--mod-infield-button-fill-justify-content:flex-end;padding:0}:host([quiet]) #textfield .buttons,:host([quiet]) #textfield .input{background-color:#0000}:host([quiet]) #textfield:focus,:host([quiet][focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}:host([quiet][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
);outline:none}:host([quiet][keyboard-focused]) #textfield:after{background-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
)}@media (hover:hover){:host([invalid]:hover) #textfield:focus,:host([invalid][focused]:hover) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-stepper-border-color-focus-hover-invalid)
)}:host(:hover) #textfield:focus .buttons,:host(:hover) #textfield:focus .input,:host([focused]:hover) #textfield .buttons,:host([focused]:hover) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([invalid]:hover) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover)
)}:host(:hover:not([disabled])) #textfield .buttons,:host(:hover:not([disabled])) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}:host(:hover) #textfield:focus,:host([focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-buttons-border-color-focus-hover,var(--spectrum-stepper-buttons-border-color-focus-hover)
)
)}:host(:hover) #textfield:not(.is-disabled,.is-invalid){--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-buttons-border-color-hover,var(--spectrum-stepper-buttons-border-color-hover)
)
)}:host([quiet]:hover:not([disabled])) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}:host([quiet]:hover:not([disabled])) #textfield .buttons{background-color:#0000}:host([quiet]:hover) #textfield:focus,:host([quiet][focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([quiet][keyboard-focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}}#textfield:before{content:""}.buttons{background-color:var(
--highcontrast-stepper-buttons-background-color,var(
--mod-stepper-buttons-background-color,var(--spectrum-stepper-buttons-background-color)
)
);block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-style:var(
--mod-stepper-buttons-border-style,var(--spectrum-stepper-buttons-border-style)
);border-width:var(
--highcontrast-stepper-buttons-border-width,var(
--mod-stepper-buttons-border-width,var(--spectrum-stepper-buttons-border-width)
)
);border-inline-start-width:0;box-sizing:border-box;display:flex;flex-direction:column;inline-size:var(
--mod-stepper-button-width,var(--spectrum-stepper-button-width)
);justify-content:center;transition:border-color var(
--mod-stepper-animation-duration,var(--spectrum-stepper-animation-duration)
) ease-in-out}#textfield.hide-stepper .input{border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-inline-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
)}@media (forced-colors:active){:host{--highcontrast-stepper-border-color:CanvasText;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:CanvasText;--highcontrast-stepper-button-background-color-default:Canvas;--highcontrast-stepper-button-background-color-hover:Canvas;--highcontrast-stepper-button-background-color-focus:Canvas;--highcontrast-stepper-button-background-color-keyboard-focus:Canvas;--highcontrast-stepper-focus-indicator-color:Highlight}:host([disabled]) #textfield{--highcontrast-stepper-border-color:GrayText;--highcontrast-stepper-buttons-border-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
)}:host([invalid]) #textfield{--highcontrast-stepper-border-color:Highlight;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:Highlight}}:host{--spectrum-stepper-border-width:var(
--system-spectrum-stepper-border-width
);--spectrum-stepper-buttons-border-style:var(
--system-spectrum-stepper-buttons-border-style
);--spectrum-stepper-buttons-border-width:var(
--system-spectrum-stepper-buttons-border-width
);--spectrum-stepper-buttons-border-color:var(
--system-spectrum-stepper-buttons-border-color
);--spectrum-stepper-buttons-background-color:var(
--system-spectrum-stepper-buttons-background-color
);--spectrum-stepper-buttons-border-color-hover:var(
--system-spectrum-stepper-buttons-border-color-hover
);--spectrum-stepper-buttons-border-color-focus:var(
--system-spectrum-stepper-buttons-border-color-focus
);--spectrum-stepper-buttons-border-color-keyboard-focus:var(
--system-spectrum-stepper-buttons-border-color-keyboard-focus
);--spectrum-stepper-button-border-radius-reset:var(
--system-spectrum-stepper-button-border-radius-reset
);--spectrum-stepper-button-border-width:var(
--system-spectrum-stepper-button-border-width
);--spectrum-stepper-border-color:var(
--system-spectrum-stepper-border-color
);--spectrum-stepper-border-color-hover:var(
--system-spectrum-stepper-border-color-hover
);--spectrum-stepper-border-color-focus:var(
--system-spectrum-stepper-border-color-focus
);--spectrum-stepper-border-color-focus-hover:var(
--system-spectrum-stepper-border-color-focus-hover
);--spectrum-stepper-border-color-keyboard-focus:var(
--system-spectrum-stepper-border-color-keyboard-focus
);--spectrum-stepper-border-color-invalid:var(
--system-spectrum-stepper-border-color-invalid
);--spectrum-stepper-border-color-focus-invalid:var(
--system-spectrum-stepper-border-color-focus-invalid
);--spectrum-stepper-border-color-focus-hover-invalid:var(
--system-spectrum-stepper-border-color-focus-hover-invalid
);--spectrum-stepper-border-color-keyboard-focus-invalid:var(
--system-spectrum-stepper-border-color-keyboard-focus-invalid
);--spectrum-stepper-button-background-color-focus:var(
--system-spectrum-stepper-button-background-color-focus
);--spectrum-stepper-button-background-color-keyboard-focus:var(
--system-spectrum-stepper-button-background-color-keyboard-focus
)}:host([disabled]) #textfield{--spectrum-stepper-buttons-background-color:var(
--system-spectrum-stepper-disabled-buttons-background-color
);--spectrum-stepper-buttons-border-width:var(
--system-spectrum-stepper-disabled-buttons-border-width
)}:host{--swc-number-field-width:calc(var(--mod-stepper-height, var(--spectrum-stepper-height))*var(
--mod-stepper-min-width-multiplier,
var(--spectrum-text-field-minimum-width-multiplier)
) + var(
--mod-stepper-button-width,
var(--spectrum-stepper-button-width)
) + var(
--mod-stepper-border-width,
var(--spectrum-stepper-border-width)
)*2);--mod-infield-button-border-width:var(--unset-value-resets-inheritance);inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width))}:host([size=s]){--spectrum-stepper-width:calc(var(--swc-number-field-width)/5*4)}:host([size=l]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25)}:host([size=xl]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25*1.25)}#textfield{inline-size:100%}.input{font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:transparent}:host([hide-stepper]:not([quiet])) #textfield input{border:var(--spectrum-textfield-border-width) solid var(--spectrum-textfield-border-color);border-radius:var(--spectrum-textfield-corner-radius)}
`,Po=Object.defineProperty,So=Object.getOwnPropertyDescriptor,Do=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?So(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Po(e,r,a),a};const Bo={"１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0","、":",","，":",","。":".","．":".","％":"%","＋":"+","ー":"-"},Lo={s:t=>a`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${t}50"
        ></sp-icon-chevron50>
    `,m:t=>a`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${t}75"
        ></sp-icon-chevron75>
    `,l:t=>a`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${t}100"
        ></sp-icon-chevron100>
    `,xl:t=>a`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${t}200"
        ></sp-icon-chevron200>
    `};class Eo extends L{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.managedInput=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.changeCount=0,this.languageResolver=new Ye(this),this.wasIndeterminate=!1,this.applyFocusElementLabel=t=>{this.appliedLabel=t},this.isComposing=!1}static get styles(){return[...super.styles,$o,w]}set value(t){const e=this.validateInput(t);if(e===this.value)return;this.lastCommitedValue=e;const r=this._value;this._value=e,this.requestUpdate("value",r)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}setValue(t=this.value){this.value=t,void 0!==this.lastCommitedValue&&this.lastCommitedValue!==this.value&&(this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.lastCommitedValue=this.value)}get valueAsString(){return this._value.toString()}set valueAsString(t){this.value=this.numberParser.parse(t)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(t){var e;if(R()&&"decimal"===this.inputElement.inputMode){const r=this.numberFormatter.formatToParts(1000.1),o=t.split("").find((t=>","===t||"."===t)),i=null==(e=r.find((t=>"decimal"===t.type)))?void 0:e.value;o&&i&&(t=t.replace(o,i))}return this.numberParser.parse(t)}get _step(){var t;return void 0!==this.step?this.step:"percent"===(null==(t=this.formatOptions)?void 0:t.style)?.01:1}handlePointerdown(t){if(0!==t.button)return void t.preventDefault();this.managedInput=!0,this.buttons.setPointerCapture(t.pointerId);const e=this.buttons.children[0].getBoundingClientRect(),r=this.buttons.children[1].getBoundingClientRect();this.findChange=t=>{t.clientX>=e.x&&t.clientY>=e.y&&t.clientX<=e.x+e.width&&t.clientY<=e.y+e.height?this.change=t=>this.increment(t.shiftKey?this.stepModifier:1):t.clientX>=r.x&&t.clientY>=r.y&&t.clientX<=r.x+r.width&&t.clientY<=r.y+r.height&&(this.change=t=>this.decrement(t.shiftKey?this.stepModifier:1))},this.findChange(t),this.startChange(t)}startChange(t){this.changeCount=0,this.doChange(t),this.safty=setTimeout((()=>{this.doNextChange(t)}),400)}doChange(t){this.change(t)}handlePointermove(t){this.findChange(t)}handlePointerup(t){this.buttons.releasePointerCapture(t.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.managedInput=!1,this.setValue()}doNextChange(t){return this.changeCount+=1,this.changeCount%5==0&&this.doChange(t),requestAnimationFrame((()=>{this.nextChange=this.doNextChange(t)}))}stepBy(t){if(this.disabled||this.readonly)return;const e=void 0!==this.min?this.min:0;let r=this.value;r+=t*this._step,isNaN(this.value)&&(r=e),r=this.valueWithLimits(r),this.requestUpdate(),this._value=this.validateInput(r),this.inputElement.value=r.toString(),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus()}increment(t=1){this.stepBy(1*t)}decrement(t=1){this.stepBy(-1*t)}handleKeydown(t){if(!this.isComposing)switch(t.code){case"ArrowUp":t.preventDefault(),this.increment(t.shiftKey?this.stepModifier:1),this.setValue();break;case"ArrowDown":t.preventDefault(),this.decrement(t.shiftKey?this.stepModifier:1),this.setValue()}}onScroll(t){t.preventDefault(),this.managedInput=!0;const e=t.shiftKey?t.deltaX/Math.abs(t.deltaX):t.deltaY/Math.abs(t.deltaY);0!==e&&!isNaN(e)&&(this.stepBy(e*(t.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout((()=>{this.setValue()}),100)),this.managedInput=!1}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1})}onBlur(t){super.onBlur(t),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll)}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1}handleChange(){const t=this.convertValueToNumber(this.inputValue);this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(t))?this.indeterminate=!0:(this.setValue(t),this.inputElement.value=this.formattedValue)}handleCompositionStart(){this.isComposing=!0}handleCompositionEnd(){this.isComposing=!1,requestAnimationFrame((()=>{this.inputElement.dispatchEvent(new Event("input",{composed:!0,bubbles:!0}))}))}handleInput(t){var e;if(this.isComposing)return void t.stopPropagation();this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace("-",""));const{value:r,selectionStart:o}=this.inputElement,i=r.split("").map((t=>Bo[t]||t)).join("");if(this.numberParser.isValidPartialNumber(i)){this.lastCommitedValue=null!=(e=this.lastCommitedValue)?e:this.value;const t=this.convertValueToNumber(i);return!i&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(t)),this._trackingValue=i,this.inputElement.value=i,void this.inputElement.setSelectionRange(o,o)}this.inputElement.value=this.indeterminate?"-":this._trackingValue;const a=i.length,s=(o||a)-(a-this._trackingValue.length);this.inputElement.setSelectionRange(s,s)}valueWithLimits(t){let e=t;return void 0!==this.min&&(e=Math.max(this.min,e)),void 0!==this.max&&(e=Math.min(this.max,e)),e}validateInput(t){const e=(t=this.valueWithLimits(t))<0?-1:1;if(t*=e,this.step){const e=(t-(void 0!==this.min?this.min:0))%this.step;if(0===e||(1===Math.round(e/this.step)?t+=this.step-e:t-=e),void 0!==this.max)for(;t>this.max;)t-=this.step}return t*=e}get displayValue(){const t=this.focused?"":"-";return this.indeterminate?t:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberFormatterFocused=new co(this.languageResolver.language,o);try{this._numberFormatter=new co(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:t,unit:e,unitDisplay:r,...o}=this.formatOptions;"unit"!==t&&(o.style=t),this._numberParserFocused=new uo(this.languageResolver.language,o);try{this._numberParser=new uo(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch(r){"unit"===t&&(this._forcedUnit=e),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",a`
            ${super.renderField()}
            ${this.hideStepper?l:a`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${pe({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
                      >
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-describedby=${this.helpTextId}
                              label=${"Increase "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||void 0!==this.max&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              ${Lo[this.size]("Up")}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-describedby=${this.helpTextId}
                              label=${"Decrease "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||void 0!==this.min&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              ${Lo[this.size]("Down")}
                          </sp-infield-button>
                      </span>
                  `}
        `}update(t){if((t.has("formatOptions")||t.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),t.has("value")||t.has("max")||t.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t}super.update(t)}willUpdate(t){this.multiline=!1,t.has(We)&&this.clearNumberFormatterCache()}firstUpdated(t){super.firstUpdated(t),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("compositionstart",this.handleCompositionStart),this.addEventListener("compositionend",this.handleCompositionEnd)}updated(t){if(t.has("min")||t.has("formatOptions")){let t="numeric";const e=void 0!==this.min&&this.min<0,{maximumFractionDigits:r}=this.numberFormatter.resolvedOptions(),o=r>0;R()?e?t="text":o&&(t="decimal"):I()&&(e?t="numeric":o&&(t="decimal")),this.inputElement.inputMode=t}}}Do([b(".buttons")],Eo.prototype,"buttons",2),Do([s({type:Boolean,reflect:!0})],Eo.prototype,"focused",2),Do([s({type:Object,attribute:"format-options"})],Eo.prototype,"formatOptions",2),Do([s({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Eo.prototype,"hideStepper",2),Do([s({type:Boolean,reflect:!0})],Eo.prototype,"indeterminate",2),Do([s({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],Eo.prototype,"keyboardFocused",2),Do([s({type:Number})],Eo.prototype,"max",2),Do([s({type:Number})],Eo.prototype,"min",2),Do([s({type:Number})],Eo.prototype,"step",2),Do([s({type:Number,reflect:!0,attribute:"step-modifier"})],Eo.prototype,"stepModifier",2),Do([s({type:Number})],Eo.prototype,"value",1),n("sp-number-field",Eo);var jo=Object.freeze({__proto__:null});var Ao=r`
:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(
--spectrum-animation-ease-in-out
);--spectrum-progressbar-animation-duration-indeterminate:var(
--spectrum-animation-duration-2000
);--spectrum-progressbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-progressbar-fill-size-indeterminate:70%;--spectrum-progressbar-size-2400:192px;--spectrum-progressbar-size-2500:200px;--spectrum-progressbar-size-2800:224px;--spectrum-progressbar-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-progressbar-min-size:var(--spectrum-progress-bar-minimum-width);--spectrum-progressbar-max-size:var(--spectrum-progress-bar-maximum-width);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-medium
);--spectrum-progressbar-line-height:var(--spectrum-line-height-100);--spectrum-progressbar-spacing-label-to-progressbar:var(
--spectrum-spacing-75
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-progressbar-spacing-label-to-text:var(--spectrum-spacing-200);--spectrum-progressbar-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-progressbar-track-color:var(--spectrum-gray-300);--spectrum-progressbar-fill-color:var(--spectrum-accent-color-900);--spectrum-progressbar-fill-color-positive:var(
--spectrum-positive-visual-color
);--spectrum-progressbar-fill-color-notice:var(
--spectrum-notice-visual-color
);--spectrum-progressbar-fill-color-negative:var(
--spectrum-negative-visual-color
);--spectrum-progressbar-label-and-value-white:var(--spectrum-white);--spectrum-progressbar-track-color-white:var(
--spectrum-transparent-white-300
);--spectrum-progressbar-fill-color-white:var(--spectrum-white);--spectrum-meter-min-width:var(--spectrum-meter-minimum-width);--spectrum-meter-max-width:var(--spectrum-meter-maximum-width);--spectrum-meter-inline-size:var(--spectrum-meter-default-width);--spectrum-meter-thickness-s:var(--spectrum-meter-thickness-small);--spectrum-meter-thickness-l:var(--spectrum-meter-thickness-large);--spectrum-meter-top-to-text:var(--spectrum-component-top-to-text)}:host([size=s]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-small
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host{--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=l]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2500);--spectrum-progressbar-font-size:var(--spectrum-font-size-100);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
)}:host([size=xl]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2800);--spectrum-progressbar-font-size:var(--spectrum-font-size-200);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-extra-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
)}.spectrum-Meter{--spectrum-progressbar-size-default:var(
--mod-meter-inline-size,var(--spectrum-meter-inline-size)
);--spectrum-progressbar-max-size:var(
--mod-meter-max-width,var(--spectrum-meter-max-width)
);--spectrum-progressbar-min-size:var(
--mod-meter-min-width,var(--spectrum-meter-min-width)
)}:host([positive]) .spectrum-Meter .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host([notice]) .spectrum-Meter .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host([negative]) .spectrum-Meter .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-negative,var(--spectrum-progressbar-fill-color-negative)
)
)}:host{align-items:center;display:inline-flex;flex-flow:wrap;font-size:var(
--mod-progressbar-font-size,var(--spectrum-progressbar-font-size)
);inline-size:var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
);justify-content:space-between;max-inline-size:var(
--mod-progressbar-max-size,var(--spectrum-progressbar-max-size)
);min-inline-size:var(
--mod-progressbar-min-size,var(--spectrum-progressbar-min-size)
);position:relative;vertical-align:top}.label,.percentage{color:var(
--mod-progressbar-text-color,var(--spectrum-progressbar-text-color)
);line-height:var(
--mod-progressbar-line-height,var(--spectrum-progressbar-line-height)
);margin-block-end:var(
--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar)
);margin-block-start:var(
--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text)
);text-align:start}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(
--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk)
)}.label{flex:1}.percentage{align-self:flex-start;margin-inline-start:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}.track{background-color:var(
--highcontrast-progressbar-track-color,var(
--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)
)
);border-radius:var(--spectrum-progressbar-corner-radius);inline-size:100%;overflow:hidden}.fill,.track{block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
)}.fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)
)
);border:none;transition:width 1s}:host([indeterminate]) .fill{animation-timing-function:var(
--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate)
);inline-size:var(
--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate)
);position:relative;will-change:transform}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between}:host([side-label]) .track{flex:1 1 var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
)}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}:host([side-label]) .percentage{margin-block-end:0;margin-inline-start:var(
--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
);order:3;text-align:end}:host([static=white]) .fill{background-color:var(
--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white)
);color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .label,:host([static=white]) .percentage{color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .track{background-color:var(--spectrum-progressbar-track-color-white)}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(
--mod-progressbar-fill-size-indeterminate,
var(--spectrum-progressbar-fill-size-indeterminate)
)*-1))}to{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)
))}to{transform:translate(calc(var(
--mod-progressbar-size-default,
var(--spectrum-progressbar-size-default)
)*-1))}}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left;width:100%}:host([dir=rtl]) .fill{transform-origin:right}
`,Mo=Object.defineProperty,qo=Object.getOwnPropertyDescriptor,Ho=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?qo(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Mo(e,r,a),a};class To extends(o(g(c,""),{noDefaultSize:!0})){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.languageResolver=new Ye(this),this.overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[Ao]}render(){return a`
            ${this.slotHasContent||this.label?a`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent?a``:this.label}
                          <slot @slotchange=${this.handleSlotchange}>
                              ${this.label}
                          </slot>
                      </sp-field-label>
                  `:a``}
            ${this.label?a`
                      ${this.indeterminate?l:a`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
                                </sp-field-label>
                            `}
                  `:l}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const t=X(this.label,this.slotEl);t&&(this.label=t)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(t){super.updated(t),t.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax"),this.removeAttribute("aria-valuenow")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&t.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),t.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}Ho([s({type:Boolean,reflect:!0})],To.prototype,"indeterminate",2),Ho([s({type:String,reflect:!0})],To.prototype,"label",2),Ho([s({type:Boolean,reflect:!0,attribute:"over-background"})],To.prototype,"overBackground",2),Ho([s({type:Boolean,reflect:!0,attribute:"side-label"})],To.prototype,"sideLabel",2),Ho([s({type:Number})],To.prototype,"progress",2),Ho([s({type:String,reflect:!0})],To.prototype,"static",2),Ho([b("slot")],To.prototype,"slotEl",2),n("sp-progress-bar",To);var Oo=r`
:host{--spectrum-radio-neutral-content-color:var(
--spectrum-neutral-content-color-default
);--spectrum-radio-neutral-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-radio-neutral-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-radio-neutral-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-radio-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-radio-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-radio-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-radio-disabled-content-color:var(
--spectrum-disabled-content-color
);--spectrum-radio-disabled-border-color:var(
--spectrum-disabled-content-color
);--spectrum-radio-emphasized-accent-color:var(--spectrum-accent-color-900);--spectrum-radio-emphasized-accent-color-hover:var(
--spectrum-accent-color-1000
);--spectrum-radio-emphasized-accent-color-down:var(
--spectrum-accent-color-1100
);--spectrum-radio-emphasized-accent-color-focus:var(
--spectrum-accent-color-1000
);--spectrum-radio-border-width:var(--spectrum-border-width-200);--spectrum-radio-button-background-color:var(--spectrum-gray-75);--spectrum-radio-button-checked-border-color-default:var(
--spectrum-neutral-background-color-selected-default
);--spectrum-radio-button-checked-border-color-hover:var(
--spectrum-neutral-background-color-selected-hover
);--spectrum-radio-button-checked-border-color-down:var(
--spectrum-neutral-background-color-selected-down
);--spectrum-radio-button-checked-border-color-focus:var(
--spectrum-neutral-background-color-selected-focus
);--spectrum-radio-line-height:var(--spectrum-line-height-100);--spectrum-radio-animation-duration:var(--spectrum-animation-duration-100)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--spectrum-radio-line-height-cjk:var(--spectrum-cjk-line-height-100)}:host([size=s]){--spectrum-radio-height:var(--spectrum-component-height-75);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-small
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-75);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-small
);--spectrum-radio-font-size:var(--spectrum-font-size-75)}:host{--spectrum-radio-height:var(--spectrum-component-height-100);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-medium
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-100);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-medium
);--spectrum-radio-font-size:var(--spectrum-font-size-100)}:host([size=l]){--spectrum-radio-height:var(--spectrum-component-height-200);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-large
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-200);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-large
);--spectrum-radio-font-size:var(--spectrum-font-size-200)}:host([size=xl]){--spectrum-radio-height:var(--spectrum-component-height-300);--spectrum-radio-button-control-size:var(
--spectrum-radio-button-control-size-extra-large
);--spectrum-radio-text-to-control:var(--spectrum-text-to-control-300);--spectrum-radio-label-top-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-radio-label-bottom-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-radio-button-top-to-control:var(
--spectrum-radio-button-top-to-control-extra-large
);--spectrum-radio-font-size:var(--spectrum-font-size-300)}@media (forced-colors:active){:host{--highcontrast-radio-neutral-content-color:CanvasText;--highcontrast-radio-neutral-content-color-hover:CanvasText;--highcontrast-radio-neutral-content-color-down:CanvasText;--highcontrast-radio-neutral-content-color-focus:CanvasText;--highcontrast-radio-button-border-color-default:ButtonText;--highcontrast-radio-button-border-color-hover:Highlight;--highcontrast-radio-button-border-color-down:ButtonText;--highcontrast-radio-button-border-color-focus:Highlight;--highcontrast-radio-emphasized-accent-color:ButtonText;--highcontrast-radio-emphasized-accent-color-hover:Highlight;--highcontrast-radio-emphasized-accent-color-down:ButtonText;--highcontrast-radio-emphasized-accent-color-focus:Highlight;--highcontrast-radio-button-checked-border-color-default:Highlight;--highcontrast-radio-button-checked-border-color-hover:Highlight;--highcontrast-radio-button-checked-border-color-down:Highlight;--highcontrast-radio-button-checked-border-color-focus:Highlight;--highcontrast-radio-disabled-content-color:GrayText;--highcontrast-radio-disabled-border-color:GrayText;--highcontrast-radio-focus-indicator-color:CanvasText}#button:after{forced-color-adjust:none}}:host{align-items:flex-start;display:inline-flex;max-inline-size:100%;min-block-size:var(--mod-radio-height,var(--spectrum-radio-height));position:relative;vertical-align:top}:host(:active) #button:before{border-color:var(
--highcontrast-radio-button-border-color-down,var(
--mod-radio-button-border-color-down,var(--spectrum-radio-button-border-color-down)
)
)}:host(:active[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-down,var(
--mod-radio-button-checked-border-color-down,var(--spectrum-radio-button-checked-border-color-down)
)
)}:host(:active) #label{color:var(
--highcontrast-radio-neutral-content-color-down,var(
--mod-radio-neutral-content-color-down,var(--spectrum-radio-neutral-content-color-down)
)
)}:host(.focus-visible) #button:before{border-color:var(
--highcontrast-radio-button-border-color-focus,var(
--mod-radio-button-border-color-focus,var(--spectrum-radio-button-border-color-focus)
)
)}:host(:focus-visible) #button:before{border-color:var(
--highcontrast-radio-button-border-color-focus,var(
--mod-radio-button-border-color-focus,var(--spectrum-radio-button-border-color-focus)
)
)}:host(.focus-visible) #button:after{block-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);inline-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}:host(:focus-visible) #button:after{block-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);inline-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}:host(.focus-visible[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-focus,var(
--mod-radio-button-checked-border-color-focus,var(--spectrum-radio-button-checked-border-color-focus)
)
)}:host(:focus-visible[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-focus,var(
--mod-radio-button-checked-border-color-focus,var(--spectrum-radio-button-checked-border-color-focus)
)
)}:host(.focus-visible) #label{color:var(
--highcontrast-radio-neutral-content-color-focus,var(
--mod-radio-neutral-content-color-focus,var(--spectrum-radio-neutral-content-color-focus)
)
)}:host(:focus-visible) #label{color:var(
--highcontrast-radio-neutral-content-color-focus,var(
--mod-radio-neutral-content-color-focus,var(--spectrum-radio-neutral-content-color-focus)
)
)}:host([readonly]) #input:read-only{cursor:auto}:host([readonly]) #button{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);inset-block-end:100%;inset-inline-end:100%;position:fixed}:host([readonly]) #label,:host([readonly][checked][disabled]) #input~#label,:host([readonly][disabled]) #input~#label{color:inherit;margin-inline-start:auto}:host([emphasized][checked]) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color,var(
--mod-radio-emphasized-accent-color,var(--spectrum-radio-emphasized-accent-color)
)
)}@media (hover:hover){:host(:hover) #button:before{border-color:var(
--highcontrast-radio-button-border-color-hover,var(
--mod-radio-button-border-color-hover,var(--spectrum-radio-button-border-color-hover)
)
)}:host([checked]:hover) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-hover,var(
--mod-radio-button-checked-border-color-hover,var(--spectrum-radio-button-checked-border-color-hover)
)
)}:host(:hover) #label{color:var(
--highcontrast-radio-neutral-content-color-hover,var(
--mod-radio-neutral-content-color-hover,var(--spectrum-radio-neutral-content-color-hover)
)
)}:host([emphasized][checked]:hover) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-hover,var(
--mod-radio-emphasized-accent-color-hover,var(--spectrum-radio-emphasized-accent-color-hover)
)
)}}:host([emphasized]:active[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-down,var(
--mod-radio-emphasized-accent-color-down,var(--spectrum-radio-emphasized-accent-color-down)
)
)}:host([emphasized].focus-visible[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-focus,var(
--mod-radio-emphasized-accent-color-focus,var(--spectrum-radio-emphasized-accent-color-focus)
)
)}:host([emphasized]:focus-visible[checked]) #input+#button:before{border-color:var(
--highcontrast-radio-emphasized-accent-color-focus,var(
--mod-radio-emphasized-accent-color-focus,var(--spectrum-radio-emphasized-accent-color-focus)
)
)}:host([checked][disabled]) #input+#button:before,:host([disabled]) #input+#button:before{border-color:var(
--highcontrast-radio-disabled-border-color,var(
--mod-radio-disabled-border-color,var(--spectrum-radio-disabled-border-color)
)
)}:host([checked][disabled]) #input~#label,:host([disabled]) #input~#label{color:var(
--highcontrast-radio-disabled-content-color,var(
--mod-radio-disabled-content-color,var(--spectrum-radio-disabled-content-color)
)
)}#input{block-size:100%;box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:100%;inline-size:100%;line-height:var(
--mod-radio-line-height,var(--spectrum-radio-line-height)
);margin:0;opacity:0;overflow:visible;padding:0;position:absolute;z-index:1}:host([disabled]) #input{cursor:default}:host([checked]) #input+#button:before{border-color:var(
--highcontrast-radio-button-checked-border-color-default,var(
--mod-radio-button-checked-border-color-default,var(--spectrum-radio-button-checked-border-color-default)
)
);border-width:calc(var(--spectrum-radio-button-control-size)/2 - var(--spectrum-radio-button-selection-indicator)/2)}#input.focus-visible+#button:after{block-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);inline-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}#input:focus-visible+#button:after{block-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2);border-color:var(
--highcontrast-radio-focus-indicator-color,var(
--mod-radio-focus-indicator-color,var(--spectrum-radio-focus-indicator-color)
)
);border-style:solid;border-width:var(
--mod-radio-focus-indicator-thickness,var(--spectrum-radio-focus-indicator-thickness)
);inline-size:calc(var(--spectrum-radio-button-control-size) + var(--spectrum-radio-focus-indicator-gap)*2)}#label{color:var(
--highcontrast-radio-neutral-content-color,var(
--mod-radio-neutral-content-color,var(--spectrum-radio-neutral-content-color)
)
);font-size:var(--mod-radio-font-size,var(--spectrum-radio-font-size));line-height:var(
--mod-radio-line-height,var(--spectrum-radio-line-height)
);margin-block-end:var(--spectrum-radio-label-bottom-to-text);margin-block-start:var(--spectrum-radio-label-top-to-text);margin-inline-start:var(
--mod-radio-text-to-control,var(--spectrum-radio-text-to-control)
);text-align:start;transition:color var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out}#label:lang(ja),#label:lang(ko),#label:lang(zh){line-height:var(
--mod-radio-line-height-cjk,var(--spectrum-radio-line-height-cjk)
)}#button{block-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);box-sizing:border-box;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);margin-block-start:var(
--mod-radio-button-top-to-control,var(--spectrum-radio-button-top-to-control)
);position:relative}#button:before{background-color:var(
--highcontrast-radio-button-background-color,var(
--mod-radio-button-background-color,var(--spectrum-radio-button-background-color)
)
);block-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);border-color:var(
--highcontrast-radio-button-border-color-default,var(
--mod-radio-button-border-color-default,var(--spectrum-radio-button-border-color-default)
)
);border-radius:50%;border-style:solid;border-width:var(
--mod-radio-border-width,var(--spectrum-radio-border-width)
);box-sizing:border-box;content:"";display:block;inline-size:var(
--mod-radio-button-control-size,var(--spectrum-radio-button-control-size)
);position:absolute;transition:border var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out,box-shadow var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-in-out;z-index:0}#button:after{border-radius:50%;content:"";display:block;inset-block-start:50%;inset-inline-start:50%;position:absolute;transform:translateX(-50%) translateY(-50%);transition:opacity var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-out,margin var(
--mod-radio-animation-duration,var(--spectrum-radio-animation-duration)
) ease-out}:host{--spectrum-radio-button-border-color-default:var(
--system-spectrum-radio-button-border-color-default
);--spectrum-radio-button-border-color-hover:var(
--system-spectrum-radio-button-border-color-hover
);--spectrum-radio-button-border-color-down:var(
--system-spectrum-radio-button-border-color-down
);--spectrum-radio-button-border-color-focus:var(
--system-spectrum-radio-button-border-color-focus
)}:host([emphasized]){--spectrum-radio-button-checked-border-color-default:var(
--system-spectrum-radio-emphasized-button-checked-border-color-default
);--spectrum-radio-button-checked-border-color-hover:var(
--system-spectrum-radio-emphasized-button-checked-border-color-hover
);--spectrum-radio-button-checked-border-color-down:var(
--system-spectrum-radio-emphasized-button-checked-border-color-down
);--spectrum-radio-button-checked-border-color-focus:var(
--system-spectrum-radio-emphasized-button-checked-border-color-focus
)}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host([dir=rtl]) #button:after{transform:translateX(50%) translateY(-50%)}
`,Fo=Object.defineProperty,Io=Object.getOwnPropertyDescriptor,_o=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Io(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Fo(e,r,a),a};class Ro extends(o(k(c),{noDefaultSize:!0})){constructor(){super(...arguments),this.autofocus=!1,this.value="",this.checked=!1,this.disabled=!1,this.emphasized=!1,this.invalid=!1,this.readonly=!1}static get styles(){return[Oo]}click(){this.disabled||this.activate()}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focus())}activate(){this.checked||(this.checked=!0,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleKeyup(t){"Space"===t.code&&this.activate()}render(){return a`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","radio"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAutoFocus(),this.addEventListener("click",this.activate),this.addEventListener("keyup",this.handleKeyup)}updated(t){super.updated(t),t.has("invalid")&&(this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")),t.has("checked")&&(this.checked?this.setAttribute("aria-checked","true"):this.setAttribute("aria-checked","false")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}_o([s({type:Boolean})],Ro.prototype,"autofocus",2),_o([s({type:String,reflect:!0})],Ro.prototype,"value",2),_o([s({type:Boolean,reflect:!0})],Ro.prototype,"checked",2),_o([s({type:Boolean,reflect:!0})],Ro.prototype,"disabled",2),_o([s({type:Boolean,reflect:!0})],Ro.prototype,"emphasized",2),_o([s({type:Boolean,reflect:!0})],Ro.prototype,"invalid",2),_o([s({type:Boolean,reflect:!0})],Ro.prototype,"readonly",2),n("sp-radio",Ro);var No=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,Vo=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Uo(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&No(e,r,a),a};class Ko extends(k(Ir)){constructor(){super(...arguments),this.name="",this.rovingTabindexController=new e(this,{focusInIndex:t=>t.findIndex((t=>this.selected?!t.disabled&&t.value===this.selected:!t.disabled)),elementEnterAction:t=>{this._setSelected(t.value)},elements:()=>this.buttons,isFocusableElement:t=>!t.disabled}),this.selected=""}get buttons(){return this.defaultNodes.filter((t=>t instanceof Ro))}focus(){this.rovingTabindexController.focus()}_setSelected(t){if(t===this.selected)return;const e=this.selected,r=t?this.querySelector(`sp-radio[value="${t}"]`):void 0;this.selected=r?t:"",this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))?this.validateRadios():this.selected=e}willUpdate(t){if(!this.hasUpdated){this.setAttribute("role","radiogroup");const t=this.querySelector("sp-radio[checked]"),e=t?t.value:"";if(this.selected=e||this.selected,this.selected&&this.selected!==e){const t=this.querySelector(`sp-radio[value="${this.selected}"]`);t&&(t.checked=!0)}this.shadowRoot.addEventListener("change",(t=>{t.stopPropagation();const e=t.target;this._setSelected(e.value)}))}t.has("selected")&&this.validateRadios()}async validateRadios(){let t=!1;this.hasUpdated||await this.updateComplete,this.buttons.map((e=>{e.checked=this.selected===e.value,t=t||e.checked})),t||(this.selected="")}handleSlotchange(){this.rovingTabindexController.clearElementCache()}}Vo([s({type:String})],Ko.prototype,"name",2),Vo([p()],Ko.prototype,"defaultNodes",2),Vo([s({reflect:!0})],Ko.prototype,"selected",2),n("sp-radio-group",Ko),n("sp-sidenav-heading",W);var Go=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,Wo=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Xo(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Go(e,r,a),a};const Yo={toNormalized:(t,e,r)=>(t-e)/(r-e),fromNormalized:(t,e,r)=>t*(r-e)+e},Zo={fromAttribute:t=>"previous"===t?t:parseFloat(t),toAttribute:t=>t.toString()},Jo={fromAttribute:t=>"next"===t?t:parseFloat(t),toAttribute:t=>t.toString()};class Qo extends h{constructor(){super(...arguments),this._forcedUnit="",this.dragging=!1,this.highlight=!1,this.name="",this.label="",this.getAriaHandleText=(t,e)=>e.format(t),this.languageResolver=new Ye(this),this.normalization=Yo}get handleName(){return this.name}get focusElement(){var t,e;return null!=(e=null==(t=this.handleController)?void 0:t.inputForHandle(this))?e:this}update(t){var e,r;if(!this.hasUpdated){const{max:t,min:r}=this;null==this.value&&!isNaN(t)&&!isNaN(r)&&(this.value=t<r?r:r+(t-r)/2,null==(e=this.handleController)||e.hostUpdate())}(t.has("formatOptions")||t.has(We))&&delete this._numberFormatCache,t.has("value")&&null!=t.get("value")&&this.updateComplete.then((()=>{var t;null==(t=this.handleController)||t.setValueFromHandle(this)})),null==(r=this.handleController)||r.handleHasChanged(this),super.update(t)}firstUpdated(t){super.firstUpdated(t),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const t=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(t)}getNumberFormat(){var t;if(!this._numberFormatCache||this.languageResolver.language!==this._numberFormatCache.language){let t;try{t=new co(this.languageResolver.language,this.formatOptions),this._forcedUnit=""}catch(e){const{style:r,unit:o,unitDisplay:i,...a}=this.formatOptions||{};"unit"===r&&(this._forcedUnit=o),t=new co(this.languageResolver.language,a)}this._numberFormatCache={language:this.languageResolver.language,numberFormat:t}}return null==(t=this._numberFormatCache)?void 0:t.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}}Wo([s({type:Number})],Qo.prototype,"value",2),Wo([s({type:Boolean,reflect:!0})],Qo.prototype,"dragging",2),Wo([s({type:Boolean})],Qo.prototype,"highlight",2),Wo([s({type:String})],Qo.prototype,"name",2),Wo([s({reflect:!0,converter:Zo})],Qo.prototype,"min",2),Wo([s({reflect:!0,converter:Jo})],Qo.prototype,"max",2),Wo([s({type:Number,reflect:!0})],Qo.prototype,"step",2),Wo([s({type:Object,attribute:"format-options"})],Qo.prototype,"formatOptions",2),Wo([s({type:String})],Qo.prototype,"label",2),Wo([s({attribute:!1})],Qo.prototype,"getAriaHandleText",2),Wo([s({attribute:!1})],Qo.prototype,"normalization",2),n("sp-slider-handle",Qo);var ti=r`
:host{--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-medium);--spectrum-slider-control-height:var(--spectrum-component-height-100);--spectrum-slider-handle-border-radius:var(--spectrum-corner-radius-200);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-medium
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-medium
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px}:host([dir=rtl]),[dir=rtl] :host{--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host([size=s]){--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-small);--spectrum-slider-control-height:var(--spectrum-component-height-75);--spectrum-slider-handle-border-radius:var(--spectrum-corner-radius-200);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-small
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-small
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-100)}:host([size=l]){--spectrum-slider-font-size:var(--spectrum-font-size-100);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-large);--spectrum-slider-control-height:var(--spectrum-component-height-200);--spectrum-slider-handle-border-radius:calc(var(--spectrum-corner-radius-200)*4);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-large
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-large
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px}:host([size=xl]){--spectrum-slider-font-size:var(--spectrum-font-size-200);--spectrum-slider-handle-size:var(
--spectrum-slider-handle-size-extra-large
);--spectrum-slider-control-height:var(--spectrum-component-height-300);--spectrum-slider-handle-border-radius:calc(var(--spectrum-corner-radius-200)*4);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-extra-large
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-extra-large
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:22px}:host{--spectrum-slider-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-slider-min-size:var(--spectrum-spacing-900);--spectrum-slider-track-corner-radius:var(--spectrum-corner-radius-75);--spectrum-slider-label-margin-start:var(--spectrum-spacing-300);--spectrum-slider-handle-border-width:var(--spectrum-border-width-200);--spectrum-slider-handle-margin-left:calc(var(--spectrum-slider-handle-size)/-2);--spectrum-slider-controls-margin:calc(var(--spectrum-slider-handle-size)/2);--spectrum-slider-track-margin-offset:calc(var(--spectrum-slider-controls-margin)*-1);--spectrum-slider-track-middle-handleoffset:calc(var(--spectrum-slider-handle-gap) + var(--spectrum-slider-handle-size)/2);--spectrum-slider-input-top-size:calc(var(--spectrum-slider-handle-size)/-2/4);--spectrum-slider-track-fill-thickness:var(
--spectrum-slider-track-thickness
);--spectrum-slider-tick-mark-width:var(--spectrum-border-width-200);--spectrum-slider-tick-mark-border-radius:2px;--spectrum-slider-tick-handle-background-color:var(--spectrum-gray-100);--spectrum-slider-track-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-track-fill-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-handle-border-color-disabled:var(
--spectrum-disabled-border-color
);--spectrum-slider-label-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-slider-label-text-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-slider-tick-mark-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-ramp-handle-border-color-active:var(--spectrum-gray-100);--spectrum-slider-input-left:calc(var(--spectrum-slider-handle-margin-left)/4);--spectrum-slider-track-handleoffset:var(--spectrum-slider-handle-gap);--spectrum-slider-range-track-reset:0}:host{display:block;min-inline-size:var(
--mod-slider-min-size,var(--spectrum-slider-min-size)
);position:relative;-webkit-user-select:none;user-select:none;z-index:1}.spectrum-Slider--sideLabel{align-items:center;display:flex}.spectrum-Slider--sideLabel #label-container,.spectrum-Slider--sideLabel #label-container+#track{margin-block-start:0}.spectrum-Slider--sideLabel #controls{margin-inline-end:var(
--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)
)}.spectrum-Slider--sideLabel #value{inline-size:var(
--mod-slider-value-inline-size,var(--spectrum-slider-value-inline-size)
);margin-inline-start:var(
--mod-slider-value-side-padding-inline,var(--spectrum-slider-value-side-padding-inline)
);text-align:start}#controls{block-size:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
);box-sizing:border-box;cursor:pointer;display:inline-block;inline-size:calc(100% - var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
)*2);margin-inline-start:var(
--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)
);position:relative;vertical-align:top;z-index:auto}#label-container+#track{margin-block-start:calc(var(--spectrum-slider-control-to-field-label)*-1)}:host([tick-labels]){margin-block-end:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
)}.fill,.track{block-size:var(
--mod-slider-track-fill-thickness,var(--spectrum-slider-track-fill-thickness)
);box-sizing:border-box;inset-block-start:calc(var(--mod-slider-control-height, var(--spectrum-slider-control-height))/2 - var(
--mod-slider-track-fill-thickness,
var(--spectrum-slider-track-fill-thickness)
)/2);inset-inline:0 auto;margin-inline-start:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-block:0;padding-inline-end:var(
--mod-slider-handle-gap,var(--spectrum-slider-handle-gap)
);padding-inline-start:0;pointer-events:none;position:absolute;z-index:1}.fill:before,.track:before{block-size:100%;border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:0;border-start-start-radius:0;content:"";display:block}.track:first-of-type:before{border-end-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}.track:last-of-type:before{border-end-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}.track~.track{inset-inline-end:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);inset-inline-start:auto;margin-inline-end:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);margin-inline-start:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);padding-block:0;padding-inline-end:0;padding-inline-start:var(
--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset)
)}:host([variant=range]) .track~.track{inset-inline:auto;margin-inline:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);padding-inline:var(
--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset)
) var(
--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset)
)}.fill{margin-inline-start:0;padding-block:0;padding-inline-end:0;padding-inline-start:calc(var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
) + var(--spectrum-slider-handle-gap, var(--spectrum-slider-handle-gap)))}.offset{padding-block:0;padding-inline-end:calc(var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
) + var(--spectrum-slider-handle-gap, var(--spectrum-slider-handle-gap)));padding-inline-start:0}:host([variant=range]) #value{-webkit-user-select:text;user-select:text}:host([variant=range]) .track:first-of-type{inset-inline-end:auto;inset-inline-start:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);margin-inline-start:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-inline-end:var(
--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset)
);padding-inline-start:0}:host([variant=range]) .track:first-of-type:before{border-end-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}:host([variant=range]) .track:last-of-type{inset-inline-end:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);inset-inline-start:auto;margin-inline-end:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-inline-end:0;padding-inline-start:var(--spectrum-slider-track-handleoffset)}:host([variant=range]) .track:last-of-type:before{border-end-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}#ramp{block-size:var(
--mod-slider-ramp-track-height,var(--spectrum-slider-ramp-track-height)
);inset-inline-end:var(
--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);inset-inline-start:var(
--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);margin-block-start:calc(var(
--mod-slider-ramp-track-height,
var(--spectrum-slider-ramp-track-height)
)/2);position:absolute}#ramp svg{block-size:100%;inline-size:100%;transform:var(--spectrum-logical-rotation)}.handle{block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border-radius:var(
--mod-slider-handle-border-radius,var(--spectrum-slider-handle-border-radius)
);border-style:solid;border-width:var(
--mod-slider-handle-border-width,var(--spectrum-slider-handle-border-width)
);box-sizing:border-box;display:inline-block;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:calc(var(--mod-slider-control-height, var(--spectrum-slider-control-height))/2 - var(--mod-slider-handle-size, var(--spectrum-slider-handle-size))/2);inset-inline-start:0;margin-block:0;margin-inline:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size))/-2) 0;outline:none;position:absolute;transition:border-width var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;z-index:2}.handle.dragging,.handle:active{border-width:var(
--mod-slider-handle-border-width-down,var(--spectrum-slider-handle-border-width-down)
)}.handle.dragging,.handle.handle-highlight,.handle.is-tophandle,.handle:active{z-index:3}.handle:before{block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border-radius:100%;content:"";display:block;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:50%;inset-inline-start:50%;position:absolute;transform:translate(-50%,-50%);transition:box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,inline-size var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,block-size var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out}.handle.handle-highlight:before{block-size:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*2);inline-size:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*2)}.input{-webkit-appearance:none;block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border:0;cursor:default;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:var(
--mod-slider-input-top-size,var(--spectrum-slider-input-top-size)
);inset-inline-start:var(
--mod-slider-input-left,var(--spectrum-slider-input-left)
);margin:0;opacity:.000001;overflow:hidden;padding:0;pointer-events:none;position:absolute}.input:focus{outline:none}#label-container{align-items:center;display:flex;font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));inline-size:auto;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin-block-start:var(
--mod-slider-label-top-to-text,var(--spectrum-slider-label-top-to-text)
);position:relative}#label-container:lang(ja),#label-container:lang(ko),#label-container:lang(zh){line-height:var(
--mod-slider-cjk-line-height,var(--spectrum-slider-cjk-line-height)
)}#label{flex-grow:1;font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));padding-inline-start:0}#value{font-feature-settings:"tnum";cursor:default;flex-grow:0;margin-inline-start:var(
--mod-slider-label-margin-start,var(--spectrum-slider-label-margin-start)
);padding-inline-end:0;text-align:end}:host([variant=tick]) .handle{background-color:var(
--highcontrast-slider-tick-handle-background-color,var(
--mod-slider-tick-handle-background-color,var(--spectrum-slider-tick-handle-background-color)
)
)}:host([variant=tick]) #controls{margin-block-start:calc(var(--spectrum-text-to-visual-75) - var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
)/2 - var(
--mod-slider-track-thickness,
var(--spectrum-slider-track-thickness)
)/2)}:host([variant=tick]) .tickLabel{margin-block-start:calc(var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
) + var(--spectrum-text-to-visual-75))}.ticks{display:flex;justify-content:space-between;margin-inline:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);z-index:0}.ticks~.handleContainer .handle{background:var(
--mod-slider-ticks-handle-background-color,var(--spectrum-slider-ticks-handle-background-color)
)}.tick{inline-size:var(
--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width)
);inset-block-start:calc(var(--mod-slider-track-thickness, var(--spectrum-slider-control-height))/2 - var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
)/2);position:relative}.tick:after{block-size:var(
--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height)
);border-radius:var(
--mod-slider-tick-mark-border-radius,var(--spectrum-slider-tick-mark-border-radius)
);content:"";display:block;inline-size:var(
--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width)
);inset-block-start:0;inset-inline-start:calc(50% - var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/2);position:absolute}.tick .tickLabel{align-items:center;display:flex;font-size:var(--mod-font-size-75,var(--spectrum-font-size-75));justify-content:center;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100))}.tick:first-of-type .tickLabel,.tick:last-of-type .tickLabel{display:block;margin-inline:0;position:absolute}.tick:first-of-type{inset-inline-start:calc(var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/-2)}.tick:first-of-type .tickLabel{inset-inline-start:0}.tick:last-of-type{inset-inline-end:calc(var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/-2)}.tick:last-of-type .tickLabel{inset-inline-end:0}.handleContainer,.trackContainer{inline-size:calc(100% + var(--spectrum-slider-handle-size));inset-block-start:0;margin-inline-start:calc(var(--spectrum-slider-handle-size)/2*-1);position:absolute}.trackContainer{block-size:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
);overflow:hidden}.track:before{background:var(
--highcontrast-slider-track-color,var(--mod-slider-track-color,var(--spectrum-slider-track-color))
)}#label-container{color:var(
--highcontrast-slider-label-text-color,var(
--mod-slider-label-text-color,var(--spectrum-slider-label-text-color)
)
)}:host([variant=filled]) .track:first-child:before{background:var(
--highcontrast-slider-track-fill-color,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}.fill:before{background:var(
--highcontrast-slider-track-fill-color,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}#ramp path{fill:var(
--highcontrast-slider-ramp-track-color,var(
--mod-slider-ramp-track-color,var(--spectrum-slider-ramp-track-color)
)
)}.handle{background:var(
--highcontrast-slider-handle-background-color,var(
--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color,var(
--mod-slider-handle-border-color,var(--spectrum-slider-handle-border-color)
)
)}.handle.handle-highlight{border-color:var(
--highcontrast-slider-handle-border-color-key-focus,var(
--mod-slider-handle-border-color-key-focus,var(--spectrum-slider-handle-border-color-key-focus)
)
)}.handle.handle-highlight:before{box-shadow:0 0 0 var(--spectrum-focus-indicator-thickness) var(
--highcontrast-slider-handle-focus-ring-color-key-focus,var(
--mod-slider-handle-focus-ring-color-key-focus,var(--spectrum-slider-handle-focus-ring-color-key-focus)
)
)}.handle.dragging,.handle:active{border-color:var(
--highcontrast-slider-handle-border-color-down,var(
--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)
)
)}:host([variant=ramp]) .handle{background:var(
--mod-slider-ramp-handle-background-color,var(
--highcontrast-slider-ramp-handle-background-color,var(--spectrum-slider-ramp-handle-background-color)
)
);box-shadow:0 0 0 var(--spectrum-slider-handle-gap) var(
--highcontrast-slider-ramp-handle-border-color-active,var(
--mod-sectrum-slider-ramp-handle-border-color-active,var(--spectrum-slider-ramp-handle-border-color-active)
)
)}.input{background:none}.tick:after{background-color:var(
--highcontrast-slider-tick-mark-color,var(
--mod-slider-tick-mark-color,var(--spectrum-slider-tick-mark-color)
)
)}.handle.dragging{background:var(
--highcontrast-slider-handle-background-color,var(
--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color-down,var(
--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)
)
)}:host([variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--highcontrast-slider-track-fill-icolor,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}:host([disabled]){cursor:default}:host([disabled]) #controls{cursor:default}:host([disabled]) #label-container,:host([disabled]) .tickLabel{color:var(
--highcontrast-slider-label-text-color-disabled,var(
--mod-slider-label-text-color-disabled,var(--spectrum-slider-label-text-color-disabled)
)
)}:host([disabled]) .handle{background:var(
--highcontrast-slider-handle-disabled-background-color,var(
--mod-slider-handle-disabled-background-color,var(--spectrum-slider-handle-disabled-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color-disabled,var(
--mod-slider-handle-border-color-disabled,var(--spectrum-slider-handle-border-color-disabled)
)
);cursor:default;pointer-events:none}:host([disabled]) .handle:active{background:var(
--highcontrast-slider-handle-background-color-disabled,var(
--mod-slider-handle-background-color-disabled,var(--spectrum-slider-handle-background-color-disabled)
)
);border-color:var(
--highcontrast-disabled-border-color,var(--mod-disabled-border-color,var(--spectrum-disabled-border-color))
)}@media (hover:hover){.handle:hover{border-color:var(
--highcontrast-slider-handle-border-color-hover,var(
--mod-slider-handle-border-color-hover,var(--spectrum-slider-handle-border-color-hover)
)
)}:host([disabled]) .handle:hover{background:var(
--highcontrast-slider-handle-background-color-disabled,var(
--mod-slider-handle-background-color-disabled,var(--spectrum-slider-handle-background-color-disabled)
)
);border-color:var(
--highcontrast-disabled-border-color,var(
--mod-disabled-border-color,var(--spectrum-disabled-border-color)
)
)}}:host([disabled]) .track:before{background:var(
--highcontrast-slider-track-color-disabled,var(
--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)
)
)}:host([disabled][variant=filled]) .track:first-child:before{background:var(
--highcontrast-slider-track-fill-color-disabled,var(
--mod-slider-track-fill-color-disabled,var(--spectrum-slider-track-fill-color-disabled)
)
)}:host([disabled]) .fill:before{background:var(
--highcontrast-slider-track-fill-color-disabled,var(
--mod-slider-track-fill-color-disabled,var(--spectrum-slider-track-fill-color-disabled)
)
)}:host([disabled]) #ramp path{fill:var(
--highcontrast-slider-ramp-track-color-disabled,var(
--mod-slider-ramp-track-color-disabled,var(--spectrum-slider-ramp-track-color-disabled)
)
)}:host([disabled]) .tick:after{background-color:var(
--highcontrast-slider-tick-mark-color-disabled,var(
--mod-slider-tick-mark-color-disabled,var(--spectrum-slider-tick-mark-color-disabled)
)
)}:host([disabled][variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--highcontrast-slider-track-color-disabled,var(
--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)
)
)}@media (forced-colors:active){:host{--highcontrast-slider-track-color:ButtonText;--highcontrast-slider-track-fill-color:ButtonText;--highcontrast-slider-ramp-track-color:ButtonText;--highcontrast-slider-ramp-track-color-disabled:GrayText;--highcontrast-slider-tick-mark-color:ButtonText;--highcontrast-slider-handle-border-color:ButtonText;--highcontrast-slider-handle-border-color-hover:Highlight;--highcontrast-slider-handle-border-color-down:Highlight;--highcontrast-slider-handle-border-color-key-focus:Highlight;--highcontrast-slider-handle-focus-ring-color-key-focus:CanvasText;--highcontrast-slider-handle-background-color:ButtonFace;--highcontrast-slider-ramp-handle-border-color-active:ButtonFace;--highcontrast-slider-ramp-handle-background-color:ButtonFace;--spectrum-slider-track-color:ButtonText;--spectrum-slider-track-fill-color:ButtonText;--spectrum-slider-ramp-track-color:ButtonText;--spectrum-slider-ramp-track-color-disabled:GrayText;--spectrum-slider-handle-background-color:ButtonFace;--spectrum-slider-handle-background-color-disabled:GrayText;--spectrum-slider-handle-border-color:ButtonText;--spectrum-slider-handle-disabled-background-color:GrayText;--spectrum-slider-tick-mark-color:ButtonText;--spectrum-slider-tick-mark-color-disabled:GrayText;--spectrum-slider-handle-border-color-hover:Highlight;--spectrum-slider-handle-border-color-down:Highlight;--spectrum-slider-handle-border-color-key-focus:Highlight;--spectrum-slider-handle-focus-ring-color-key-focus:Highlight;--spectrum-slider-track-color-disabled:GrayText;--spectrum-slider-track-fill-color-disabled:GrayText;--spectrum-slider-handle-border-color-disabled:GrayText;--spectrum-slider-label-text-color:CanvasText;--spectrum-slider-label-text-color-disabled:GrayText;--spectrum-slider-ramp-handle-border-color-active:ButtonText}.handle.handle-highlight:before{forced-color-adjust:none}:host([variant=ramp]) .handle{forced-color-adjust:none}:host:not(.is-disabled) #controls.handle-highlight,:host:not(.is-disabled) #controls:active,:host:not(.is-disabled) #controls:focus-within{--highcontrast-slider-track-fill-color:Highlight;--highcontrast-slider-track-color:Highlight;--highcontrast-slider-handle-border-color:Highlight;--highcontrast-slider-ramp-track-color:Highlight;--highcontrast-slider-tick-mark-color:Highlight}@media (hover:hover){:host:not(.is-disabled) #controls:hover{--highcontrast-slider-track-fill-color:Highlight;--highcontrast-slider-track-color:Highlight;--highcontrast-slider-handle-border-color:Highlight;--highcontrast-slider-ramp-track-color:Highlight;--highcontrast-slider-tick-mark-color:Highlight}}:host([disabled]) #ramp+.handle{fill:ButtonFace;background-color:ButtonFace}}:host{--spectrum-slider-track-color:var(--system-spectrum-slider-track-color);--spectrum-slider-track-fill-color:var(
--system-spectrum-slider-track-fill-color
);--spectrum-slider-ramp-track-color:var(
--system-spectrum-slider-ramp-track-color
);--spectrum-slider-ramp-track-color-disabled:var(
--system-spectrum-slider-ramp-track-color-disabled
);--spectrum-slider-handle-background-color:var(
--system-spectrum-slider-handle-background-color
);--spectrum-slider-handle-background-color-disabled:var(
--system-spectrum-slider-handle-background-color-disabled
);--spectrum-slider-ramp-handle-background-color:var(
--system-spectrum-slider-ramp-handle-background-color
);--spectrum-slider-ticks-handle-background-color:var(
--system-spectrum-slider-ticks-handle-background-color
);--spectrum-slider-handle-border-color:var(
--system-spectrum-slider-handle-border-color
);--spectrum-slider-handle-disabled-background-color:var(
--system-spectrum-slider-handle-disabled-background-color
);--spectrum-slider-tick-mark-color:var(
--system-spectrum-slider-tick-mark-color
);--spectrum-slider-handle-border-color-hover:var(
--system-spectrum-slider-handle-border-color-hover
);--spectrum-slider-handle-border-color-down:var(
--system-spectrum-slider-handle-border-color-down
);--spectrum-slider-handle-border-color-key-focus:var(
--system-spectrum-slider-handle-border-color-key-focus
);--spectrum-slider-handle-focus-ring-color-key-focus:var(
--system-spectrum-slider-handle-focus-ring-color-key-focus
)}:host(:focus){outline:0}:host([editable]){display:grid;grid-template-areas:"label number" "slider number";grid-template-columns:1fr auto}:host([editable]) #label-container{grid-area:label}:host([editable]) #label-container+div{grid-area:slider}:host([editable]) sp-number-field{align-self:flex-end;grid-area:number;margin-inline-start:var(--spectrum-global-dimension-size-200)}:host([editable]) output{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([disabled]){pointer-events:none}#track,:host([dragging]){touch-action:none;-webkit-user-select:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}:host([dir=rtl]) .handle:before{transform:translate(50%,-50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:last-of-type:before{background-position:100%}:host([dir=rtl]) .track:first-of-type:before{background-position:100%}:host([dir=ltr]) .track:not(:first-of-type,:last-of-type){left:var(--spectrum-slider-track-segment-position)}:host([dir=rtl]) .track:not(:first-of-type,:last-of-type){right:var(--spectrum-slider-track-segment-position)}.visually-hidden{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}:host([label-visibility=value][dir=ltr]) #value{margin-left:auto}:host([label-visibility=value][dir=rtl]) #value{margin-right:auto}:host([label-visibility=none]) #label-container{margin:0;padding:0}:host([label-visibility=none]) #track{align-self:flex-end}.fill{z-index:2}
`;class ei{constructor(t){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let t=[...this.host.querySelectorAll('[slot="handle"]')];0===t.length&&(t=[this.host]),!t.some((t=>this.waitForUpgrade(t)))&&(this.handles=new Map,this.handleOrder=[],t.forEach(((t,e)=>{var r;null!=(r=t.handleName)&&r.length||(t.name=`handle${e+1}`),this.handles.set(t.handleName,t),this.handleOrder.push(t.handleName),t.handleController=this})),this.requestUpdate())},this.onInputChange=t=>{const e=t.target;e.model.handle.value=e.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(e,e.model.handle)},this.onInputFocus=t=>{const e=t.target;let r;try{r=e.matches(":focus-visible")||this.host.matches(".focus-visible")}catch(t){r=this.host.matches(".focus-visible")}e.model.handle.highlight=r,this.requestUpdate()},this.onInputBlur=t=>{t.target.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=t=>{t.target.model.handle.highlight=!0,this.requestUpdate()},this.host=t,new m(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom()}}),this.extractModelFromLightDom()}get values(){const t={};for(const e of this.handles.values())t[e.handleName]=e.value;return t}get size(){return this.handles.size}inputForHandle(t){if(this.handles.has(t.handleName)){const{input:e}=this.getHandleElements(t)||{};return e}throw new Error(`No input for handle "${t.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate()}setValueFromHandle(t){const e=this.getHandleElements(t);if(!e)return;const{input:r}=e;r.valueAsNumber===t.value?t.dragging&&t.dispatchInputEvent():(r.valueAsNumber=t.value,this.requestUpdate()),t.value=r.valueAsNumber}handleHasChanged(t){t!==this.host&&this.requestUpdate()}formattedValueForHandle(t){var e;const{handle:r}=t,o=null!=(e=r.numberFormat)?e:this.host.numberFormat,i=""===r._forcedUnit?this.host._forcedUnit:r._forcedUnit;return r.getAriaHandleText(t.value,o)+i}get formattedValues(){const t=new Map;for(const e of this.model)t.set(e.name,this.formattedValueForHandle(e));return t}get focusElement(){const{input:t}=this.getActiveHandleElements();return!t||this.host.editable&&!t.model.handle.dragging?this.host.numberField:t}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(t){return!(t instanceof Qo)&&(t.addEventListener("sp-slider-handle-ready",(()=>this.extractModelFromLightDom()),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const t=this.activeHandle;return`input-${this.model.findIndex((e=>e.name===t))}`}activateHandle(t){const e=this.handleOrder.findIndex((e=>e===t));e>=0&&this.handleOrder.splice(e,1),this.handleOrder.push(t)}getActiveHandleElements(){const t=this.activeHandle,e=this.handles.get(t);return{model:e,...this.getHandleElements(e)}}getHandleElements(t){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const t=this.host.shadowRoot.querySelectorAll(".handle > input");for(const e of t){const t=e,r=t.parentElement,o=this.handles.get(r.getAttribute("name"));o&&this.handleRefMap.set(o,{input:t,handle:r})}}return this.handleRefMap.get(t)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(t){if(!this._activePointerEventData){let e=t.target.querySelector(":scope > .input");const r=!e,o=e?e.model:this.model.find((t=>t.name===this.activeHandle));!e&&o&&(e=o.handle.focusElement),this._activePointerEventData={input:e,model:o,resolvedInput:r}}return this._activePointerEventData}handlePointerdown(t){const{resolvedInput:e,model:r}=this.extractDataFromEvent(t);r&&!this.host.disabled&&0===t.button?(this.host.track.setPointerCapture(t.pointerId),this.updateBoundingRect(),"mouse"===t.pointerType&&this.host.labelEl.click(),this.draggingHandle=r.handle,r.handle.dragging=!0,this.activateHandle(r.name),e&&this.handlePointermove(t),this.requestUpdate()):t.preventDefault()}handlePointerup(t){const{input:e,model:r}=this.extractDataFromEvent(t);delete this._activePointerEventData,r&&("mouse"===t.pointerType&&this.host.labelEl.click(),this.cancelDrag(r),this.requestUpdate(),this.host.track.releasePointerCapture(t.pointerId),this.dispatchChangeEvent(e,r.handle))}handlePointermove(t){const{input:e,model:r}=this.extractDataFromEvent(t);r&&this.draggingHandle&&(t.stopPropagation(),e.value=this.calculateHandlePosition(t,r).toString(),r.handle.value=parseFloat(e.value),this.host.indeterminate=!1,this.requestUpdate())}cancelDrag(t){t=t||this.model.find((t=>t.name===this.activeHandle)),t&&(t.handle.highlight=!1,delete this.draggingHandle,t.handle.dragging=!1)}dispatchChangeEvent(t,e){t.valueAsNumber=e.value;const r=new Event("change",{bubbles:!0,composed:!0});e.dispatchEvent(r)}calculateHandlePosition(t,e){const r=this.boundingClientRect,o=r.left,i=t.clientX,a=r.width,s=(this.host.isLTR?i-o:a-(i-o))/a;return e.normalization.fromNormalized(s,e.range.min,e.range.max)}renderHandle(t,e,r,o){var i;const s={handle:!0,dragging:(null==(i=this.draggingHandle)?void 0:i.handleName)===t.name,"handle-highlight":t.highlight},c={[this.host.isLTR?"left":"right"]:100*t.normalizedValue+"%","z-index":r.toString(),...o&&{"background-color":`var(--spectrum-slider-handle-background-color-${e}, var(--spectrum-slider-handle-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${e}, var(--spectrum-slider-handle-border-color))`}},n=o?`label input-${e}`:"label";return a`
            <div
                class=${U(s)}
                name=${t.name}
                style=${Y(c)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${e}"
                    min=${t.clamp.min}
                    max=${t.clamp.max}
                    step=${t.step}
                    value=${t.value}
                    aria-disabled=${v(this.host.disabled?"true":void 0)}
                    tabindex=${v(this.host.editable?-1:void 0)}
                    aria-label=${v(t.ariaLabel)}
                    aria-labelledby=${n}
                    aria-valuetext=${this.formattedValueForHandle(t)}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${t}
                />
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map(((t,e)=>{const r=this.handleOrder.indexOf(t.name)+2;return this.renderHandle(t,e,r,this.model.length>1)}))}trackSegments(){const t=this.model.map((t=>t.normalizedValue));return t.sort(((t,e)=>t-e)),t.unshift(0),t.map(((t,e,r)=>{var o;return[t,null!=(o=r[e+1])?o:1]}))}updateModel(){const t=[...this.handles.values()],e=e=>{const r=t[e],o=t[e-1],i=t[e+1],a="number"==typeof r.min?r.min:this.host.min,s="number"==typeof r.max?r.max:this.host.max,c={range:{min:a,max:s},clamp:{min:a,max:s}};if("previous"===r.min&&o){for(let r=e-1;r>=0;r--){const e=t[r];if("number"==typeof e.min){c.range.min=e.min;break}}c.clamp.min=Math.max(o.value,c.range.min)}if("next"===r.max&&i){for(let r=e+1;r<t.length;r++){const e=t[r];if("number"==typeof e.max){c.range.max=e.max;break}}c.clamp.max=Math.min(i.value,c.range.max)}return c},r=t.map(((t,r)=>{var o;const i=e(r),{toNormalized:a}=t.normalization,s=Math.max(Math.min(t.value,i.clamp.max),i.clamp.min),c=a(s,i.range.min,i.range.max);return{name:t.handleName,value:s,normalizedValue:c,highlight:t.highlight,step:null!=(o=t.step)?o:this.host.step,normalization:t.normalization,handle:t,ariaLabel:t!==this.host&&(null==t?void 0:t.label.length)>0?t.label:void 0,...i}}));this.model=r}async handleUpdatesComplete(){const t=[...this.handles.values()].filter((t=>t!==this.host)).map((t=>t.updateComplete));await Promise.all(t)}}var ri=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,ii=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?oi(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&ri(e,r,a),a};const ai=["filled","ramp","range","tick"];class si extends(o(g(Qo,""),{noDefaultSize:!0,validSizes:["s","m","l","xl"]})){constructor(){super(...arguments),this.handleController=new ei(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=t=>{const e=[...t.values()];return 2===e.length?`${e[0]} - ${e[1]}`:e.join(", ")},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this.quiet=!1,this.indeterminate=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[ti]}get editable(){return this._editable}set editable(t){if(t===this.editable)return;const e=this.editable;this._editable=this.handleController.size<2&&t,this.editable&&(this._numberFieldInput=Promise.resolve().then((function(){return jo}))),e!==this.editable&&this.requestUpdate("editable",e)}set variant(t){const e=this.variant;t!==this.variant&&(ai.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(t){this.editable&&(t.preventDefault(),this.focus())}render(){return a`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?a`
                      <sp-number-field
                          .formatOptions=${this.formatOptions||{}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `:l}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(t){this.handleController.hostUpdate(),t.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(t)}renderLabel(){const t="none"===this.labelVisibility||"value"===this.labelVisibility,e="none"===this.labelVisibility||"text"===this.labelVisibility;return a`
            <div id="label-container">
                <sp-field-label
                    class=${U({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent?l:this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <sp-field-label
                    class=${U({"visually-hidden":e})}
                    ?disabled=${this.disabled}
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `}renderRamp(){return"ramp"!==this.variant?a``:a`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `}renderTicks(){if("tick"!==this.variant)return a``;const t=this.tickStep||this.step,e=(this.max-this.min)/t,r=e%1!=0,o=new Array(Math.floor(e+1));return o.fill(0,0,e+1),a`
            <div
                class="${r?"not-exact ":""}ticks"
                style=${v(r?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${o.map(((e,r)=>a`
                        <div class="tick">
                            ${this.tickLabels?a`
                                      <div class="tickLabel">
                                          ${r*t+this.min}
                                      </div>
                                  `:l}
                        </div>
                    `))}
            </div>
        `}renderTrackSegment(t,e){return"ramp"===this.variant?a``:a`
            <div
                class="track"
                style=${Y(this.trackSegmentStyles(t,e))}
                role="presentation"
            ></div>
        `}getOffsetWidth(t,e){return Math.abs(e-t)/(this.max-this.min)*100}getOffsetPosition(t){return(t-this.min)/(this.max-this.min)*100}fillStyles(t){return{["rtl"===this.dir?"right":"left"]:`${this.value>t?this.getOffsetPosition(t):this.getOffsetPosition(this.value)}%`,width:`${this.getOffsetWidth(t,this.value)}%`}}renderFillOffset(){return this._cachedValue&&this.centerPoint?a`
            <div
                class=${U({fill:!0,offset:this.value>this.centerPoint})}
                style=${Y(this.fillStyles(this.centerPoint))}
            ></div>
        `:a``}renderTrack(){const t=this.handleController.trackSegments(),e=[{id:"handles",html:this.handleController.render()}],r=[{id:"track0",html:this.renderTrackSegment(...t[0])},{id:"fill",html:this.renderFillOffset()},{id:"ramp",html:this.renderRamp()},...t.slice(1).map((([t,e],r)=>({id:`track${r+1}`,html:this.renderTrackSegment(t,e)})))];return a`
            <div
                id="track"
                ${pe({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            >
                <div id="controls">
                    ${this.renderTicks()}
                    <div class="trackContainer">
                        ${j(r,(t=>t.id),(t=>t.html))}
                    </div>
                    <div class="handleContainer">
                        ${j(e,(t=>t.id),(t=>t.html))}
                    </div>
                </div>
            </div>
        `}handlePointerdown(t){this.handleController.handlePointerdown(t)}handlePointermove(t){this.handleController.handlePointermove(t)}handlePointerup(t){this.handleController.handlePointerup(t)}handleNumberInput(t){var e;const{value:r}=t.target;null==(e=t.target)||!e.managedInput||isNaN(r)?t.stopPropagation():this.value=r}handleNumberChange(t){var e;const{value:r}=t.target;isNaN(r)?(t.target.value=this.value,t.stopPropagation()):(this.value=r,null!=(e=t.target)&&e.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(t,e){const r=e-t;return{width:100*r+"%","--spectrum-slider-track-background-size":1/r*100+"%","--spectrum-slider-track-segment-position":100*t+"%"}}async getUpdateComplete(){const t=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),t}willUpdate(t){t.has("value")&&t.has("fillStart")&&(this._cachedValue=Number(this.value),this.fillStart?this.centerPoint=Number(this.fillStart):this.centerPoint=(Number(this.max)-Number(this.min))/2+Number(this.min))}}ii([s({type:Boolean,reflect:!0})],si.prototype,"editable",1),ii([s({type:Boolean,reflect:!0,attribute:"hide-stepper"})],si.prototype,"hideStepper",2),ii([s()],si.prototype,"type",2),ii([s({reflect:!0})],si.prototype,"dir",2),ii([s({type:String})],si.prototype,"variant",1),ii([s({attribute:!1})],si.prototype,"getAriaValueText",2),ii([s({type:String,reflect:!0,attribute:"label-visibility"})],si.prototype,"labelVisibility",2),ii([s({type:Number,reflect:!0})],si.prototype,"min",2),ii([s({type:Number,reflect:!0})],si.prototype,"max",2),ii([s({type:Number})],si.prototype,"step",2),ii([s({type:Number,attribute:"tick-step"})],si.prototype,"tickStep",2),ii([s({type:Boolean,attribute:"tick-labels"})],si.prototype,"tickLabels",2),ii([s({type:Boolean,reflect:!0})],si.prototype,"disabled",2),ii([s({type:Number,reflect:!0,attribute:"fill-start"})],si.prototype,"fillStart",2),ii([s({type:Boolean})],si.prototype,"quiet",2),ii([s({type:Boolean})],si.prototype,"indeterminate",2),ii([b("#label")],si.prototype,"labelEl",2),ii([b("#number-field")],si.prototype,"numberField",2),ii([b("#track")],si.prototype,"track",2),n("sp-slider",si);var ci=r`
:host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(
--spectrum-alias-border-radius-small
)}:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-global-dimension-size-125
);--spectrum-splitbutton-trigger-flat-edge-padding:var(
--spectrum-global-dimension-size-100
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-splitbutton-trigger-flat-edge-padding) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
))}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-m-primary-outline-texticon-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*3)}:host{display:inline-flex;flex-direction:row;position:relative;vertical-align:top}#button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:0;border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:0;margin-left:0;padding-left:var(--spectrum-splitbutton-round-edge-padding);padding-right:var(--spectrum-splitbutton-flat-edge-padding)}#button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-right:var(--spectrum-splitbutton-cta-flat-edge-padding)}#button:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}.trigger{border-bottom-left-radius:0;border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-left-width:var(--spectrum-splitbutton-trigger-border-left);border-top-left-radius:0;border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);margin-left:0;min-width:var(--spectrum-splitbutton-trigger-min-width);padding-left:var(--spectrum-splitbutton-trigger-flat-edge-padding);padding-right:var(--spectrum-splitbutton-trigger-round-edge-padding)}.trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-left:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}.trigger.focus-visible{box-shadow:none}.trigger:focus-visible{box-shadow:none}.trigger:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}.icon{display:block;margin-top:1px}#button,.trigger{position:relative}#button.focus-visible,.trigger.focus-visible{outline:none;z-index:1}#button:focus-visible,.trigger:focus-visible{outline:none;z-index:1}#button.spectrum-Pagination-prevButton .spectrum-Icon,.trigger.spectrum-Pagination-prevButton .spectrum-Icon{transform:var(--spectrum-logical-rotation) rotate(180deg)}#button.spectrum-Pagination-nextButton .spectrum-Icon,.trigger.spectrum-Pagination-nextButton .spectrum-Icon{transform:var(--spectrum-logical-rotation)}:host([left]) #button{border-bottom-left-radius:0;border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-left-radius:0;border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);margin-left:var(--spectrum-spltibutton-margin-left);margin-right:0;padding-left:var(--spectrum-splitbutton-flat-edge-padding);padding-right:var(--spectrum-splitbutton-round-edge-padding)}:host([left]) #button:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([left]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-left:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([left]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:0;border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);border-right-width:var(--spectrum-splitbutton-trigger-border-left);border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:0;margin-right:0;padding-left:var(--spectrum-splitbutton-trigger-round-edge-padding);padding-right:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([left]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-right:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}#button .label+.spectrum-Icon{margin-left:var(--spectrum-splitbutton-icon-gap)}:host>sp-menu{display:none}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}.trigger{--spectrum-splitbutton-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}:host([dir=ltr]) #button[variant=accent]{margin-right:var(
--spectrum-button-border-width,var(--spectrum-alias-border-size-thick)
)}sp-button{--spectrum-button-m-primary-outline-texticon-border-radius:var(
--spectrum-button-border-radius
)}::slotted(sp-menu){display:none}sp-overlay:not(:defined){display:none}
`,ni=Object.defineProperty,li=Object.getOwnPropertyDescriptor,di=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?li(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&ni(e,r,a),a};const ui={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class pi extends(o(C)){constructor(){super(...arguments),this.left=!1,this.variant="accent",this.type="field",this.listRole="menu",this.itemRole="menuitem"}static get styles(){return[ci,w]}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}passClick(){const t="more"===this.type?this.menuItems[0]:this.selectedItem||this.menuItems[0];t&&t.click()}get buttonContent(){var t;return[a`
                <div
                    id="label"
                    role="presentation"
                    class=${v(this.value?void 0:"placeholder")}
                >
                    ${(null==(t=this.selectedItem)?void 0:t.itemText)||""}
                </div>
                <slot name="tooltip"></slot>
            `]}update(t){t.has("type")&&("more"===this.type?this.selects=void 0:this.selects="single"),super.update(t)}render(){var t;const e=["cta","accent"].includes(this.variant)?"fill":"outline",r=[a`
                <sp-button
                    aria-label=${v(this.label||(null==(t=this.selectedItem)?void 0:t.itemText)||void 0)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                    treatment=${e}
                    size=${this.size}
                >
                    ${this.buttonContent}
                </sp-button>
            `,a`
                <sp-button
                    aria-haspopup="true"
                    aria-expanded=${this.open?"true":"false"}
                    aria-controls=${v(this.open?"menu":void 0)}
                    class="button trigger ${this.variant}"
                    @blur=${this.handleButtonBlur}
                    @click=${this.handleActivate}
                    @pointerdown=${this.handleButtonPointerdown}
                    @focus=${this.handleButtonFocus}
                    @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                    ?disabled=${this.disabled}
                    aria-labelledby="button"
                    variant=${this.variant}
                    treatment=${e}
                    size=${this.size}
                >
                    ${"field"===this.type?a`
                              <sp-icon-chevron100
                                  class="icon ${ui[this.size]}"
                                  slot="icon"
                              ></sp-icon-chevron100>
                          `:a`
                              <sp-icon-more
                                  class="icon"
                                  slot="icon"
                              ></sp-icon-more>
                          `}
                </sp-button>
            `];return this.left&&r.reverse(),a`
            ${r} ${this.renderMenu}
        `}bindButtonKeydownListener(){this.trigger.addEventListener("keydown",this.handleKeydown)}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection()}async manageSplitButtonItems(){!this.menuItems.length&&(await this.optionsMenu.updateComplete,!this.menuItems.length)||("more"===this.type?(this.menuItems[0].hidden=!0,this.menuItems.forEach((t=>t.selected=!1)),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value)}}di([s({type:Boolean,reflect:!0})],pi.prototype,"left",2),di([s({reflect:!0})],pi.prototype,"variant",2),di([s({type:String})],pi.prototype,"type",2),di([b(".trigger")],pi.prototype,"trigger",2),n("sp-split-button",pi);var hi=r`
:host{--spectrum-splitview-vertical-width:100%;--spectrum-splitview-vertical-gripper-width:50%;--spectrum-splitview-vertical-gripper-outer-width:100%;--spectrum-splitview-vertical-gripper-reset:0;--spectrum-splitview-background-color:var(--spectrum-gray-100);--spectrum-splitview-handle-background-color:var(--spectrum-gray-300);--spectrum-splitview-handle-background-color-hover:var(
--spectrum-gray-400
);--spectrum-splitview-handle-background-color-down:var(--spectrum-gray-800);--spectrum-splitview-handle-background-color-focus:var(
--spectrum-focus-indicator-color
);--spectrum-splitview-handle-width:var(--spectrum-border-width-200);--spectrum-splitview-gripper-border-radius:var(
--spectrum-corner-radius-75
);--spectrum-splitview-gripper-width:var(--spectrum-border-width-400);--spectrum-splitview-gripper-height:16px;--spectrum-splitview-gripper-border-width-horizontal:3px;--spectrum-splitview-gripper-border-width-vertical:var(
--spectrum-border-width-400
)}:host{display:flex;overflow:hidden}::slotted(*){background-color:var(
--mod-splitview-background-color,var(--spectrum-splitview-background-color)
);block-size:100%}#gripper{block-size:var(
--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height)
);border-block-width:var(
--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical)
);border-color:var(
--highcontrast-splitview-handle-background-color,var(
--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)
)
);border-inline-width:var(
--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal)
);border-radius:var(
--mod-splitview-gripper-border-radius,var(--spectrum-splitview-gripper-border-radius)
);border-style:solid;content:"";display:block;inline-size:var(
--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)
);inset-block-start:50%;inset-inline-start:calc((var(
--mod-splitview-gripper-width,
var(--spectrum-splitview-gripper-width)
) + (2*var(--mod-splitview-gripper-border-width-vertical,
var(
--spectrum-splitview-gripper-border-width-vertical
))) - var(
--mod-splitview-gripper-width,
var(--spectrum-splitview-gripper-width)
))/2*-1);position:absolute;transform:translateY(-50%)}#gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color,var(
--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)
)
)}#splitter{background-color:var(
--highcontrast-splitview-handle-background-color,var(
--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)
)
);block-size:100%;inline-size:var(
--mod-splitview-handle-width,var(--spectrum-splitview-handle-width)
);position:relative;-webkit-user-select:none;user-select:none;z-index:1}#splitter.is-collapsed-end #gripper:before,#splitter.is-collapsed-start #gripper:before{block-size:100%;content:"";inline-size:var(
--mod-splitview-handle-width,var(--spectrum-splitview-handle-width)
);inset-block-start:0;inset-inline-start:calc(50% - var(
--mod-splitview-handle-width,
var(--spectrum-splitview-handle-width)
)/2);position:absolute}#splitter.is-collapsed-start #gripper{inset-inline-start:0}#splitter.is-collapsed-end #gripper{inset-inline:auto 0}:host([resizable]) #splitter.is-hovered{background-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}:host([resizable]) #splitter.is-hovered #gripper{border-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}:host([resizable]) #splitter.is-hovered #gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}@media (hover:hover){:host([resizable]) #splitter:hover{background-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}:host([resizable]) #splitter:hover #gripper{border-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}:host([resizable]) #splitter:hover #gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color-hover,var(
--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)
)
)}}:host([resizable]) #splitter.is-active,:host([resizable]) #splitter:active{background-color:var(
--highcontrast-splitview-handle-background-color-down,var(
--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)
)
)}:host([resizable]) #splitter.is-active #gripper,:host([resizable]) #splitter:active #gripper{border-color:var(
--highcontrast-splitview-handle-background-color-down,var(
--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)
)
)}:host([resizable]) #splitter.is-active #gripper:before,:host([resizable]) #splitter:active #gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color-down,var(
--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)
)
)}:host([resizable]) #splitter:focus{outline:none}:host([resizable]) #splitter.focus-visible{background-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
);outline:none}:host([resizable]) #splitter:focus-visible{background-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
);outline:none}:host([resizable]) #splitter.focus-visible #gripper{border-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
);box-shadow:0 0 0 1px var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
)}:host([resizable]) #splitter:focus-visible #gripper{border-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
);box-shadow:0 0 0 1px var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
)}:host([resizable]) #splitter.focus-visible #gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
)}:host([resizable]) #splitter:focus-visible #gripper:before{background-color:var(
--highcontrast-splitview-handle-background-color-focus,var(
--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)
)
)}:host([vertical]){flex-direction:column}:host([vertical]) ::slotted(*){block-size:auto;inline-size:var(
--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width)
)}:host([vertical]) #gripper{block-size:var(
--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)
);border-block-width:var(
--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal)
);border-inline-width:var(
--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical)
);inline-size:var(
--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height)
);inset-block-start:calc((var(
--mod-splitview-gripper-width,
var(--spectrum-splitview-gripper-width)
) + (2*var(--mod-splitview-gripper-border-width-vertical,
var(
--spectrum-splitview-gripper-border-width-vertical
))) - var(
--mod-splitview-gripper-width,
var(--spectrum-splitview-gripper-width)
))/2*-1);inset-inline-start:var(
--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width)
);transform:translate(calc(var(
--mod-splitview-vertical-gripper-width,
var(--spectrum-splitview-vertical-gripper-width)
)*-1))}:host([vertical]) #splitter{block-size:var(
--mod-splitview-handle-width,var(--spectrum-splitview-handle-width)
);inline-size:var(
--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width)
)}:host([vertical]) #splitter.is-collapsed-end #gripper,:host([vertical]) #splitter.is-collapsed-start #gripper{inset-inline-start:var(
--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width)
)}:host([vertical]) #splitter.is-collapsed-end #gripper:before,:host([vertical]) #splitter.is-collapsed-start #gripper:before{block-size:var(
--mod-splitview-handle-width,var(--spectrum-splitview-handle-width)
);inline-size:var(
--mod-splitview-vertical-gripper-outer-width,var(--spectrum-splitview-vertical-gripper-outer-width)
);inset-block-start:calc(var(
--mod-splitview-vertical-gripper-width,
var(--spectrum-splitview-vertical-gripper-width)
) - var(
--mod-splitview-handle-width,
var(--spectrum-splitview-handle-width)
)/2);inset-inline-start:var(
--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset)
)}:host([vertical]) #splitter.is-collapsed-start #gripper{inset-block-start:var(
--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset)
)}:host([vertical]) #splitter.is-collapsed-end #gripper{inset-block-end:var(
--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset)
);inset-block-start:auto}@media (forced-colors:active){:host{--highcontrast-splitview-handle-background-color:CanvasText;--highcontrast-splitview-handle-background-color-hover:CanvasText;--highcontrast-splitview-handle-background-color-down:CanvasText;--highcontrast-splitview-handle-background-color-focus:Highlight}}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#gripper{touch-action:none}#splitter{height:auto;order:2}:host([resizable]) #splitter{background-clip:content-box;cursor:ew-resize;margin:0 calc(var(--spectrum-global-dimension-static-size-125)*-1);padding:0 var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter{background-clip:content-box;cursor:ns-resize;margin:calc(var(--spectrum-global-dimension-static-size-125)*-1) 0;padding:var(--spectrum-global-dimension-static-size-125) 0}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-end,:host([resizable][collapsible]) #splitter.is-resized-start{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-end,:host([vertical][resizable][collapsible]) #splitter.is-resized-start{cursor:ns-resize}:host([dir=ltr][resizable]) #gripper{left:calc(var(--spectrum-global-dimension-static-size-125) + (var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}:host([dir=rtl][resizable]) #gripper{right:calc(var(--spectrum-global-dimension-static-size-125) + (var(
--spectrum-dragbar-gripper-width,
var(--spectrum-global-dimension-static-size-50)
) + 2*var(--spectrum-dragbar-gripper-border-width-horizontal, 3px) - var(
--spectrum-dragbar-handle-width,
var(--spectrum-global-dimension-static-size-25)
))/2*-1)}:host([vertical][resizable]) #gripper{left:50%;margin-top:var(--spectrum-global-dimension-static-size-125);right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-start #gripper{left:var(--spectrum-global-dimension-static-size-125)}:host([dir=rtl][resizable]) #splitter.is-collapsed-start #gripper{right:var(--spectrum-global-dimension-static-size-125)}:host([vertical][resizable]) #splitter.is-collapsed-start #gripper{left:50%;right:50%}:host([dir=ltr][resizable]) #splitter.is-collapsed-end #gripper{left:var(--spectrum-global-dimension-static-size-25)}:host([dir=rtl][resizable]) #splitter.is-collapsed-end #gripper{right:var(--spectrum-global-dimension-static-size-25)}:host([vertical][resizable]) #splitter.is-collapsed-end #gripper{left:50%;margin-top:0;right:50%;top:var(--spectrum-global-dimension-static-size-25)}
`,mi=Object.defineProperty,bi=Object.getOwnPropertyDescriptor,vi=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?bi(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&mi(e,r,a),a};const gi=3840;class fi extends c{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=gi,this.secondaryMin=0,this.secondaryMax=gi,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=gi,this.controlledElIDApplied=!1;const t=window.ResizeObserver;t&&(this.observer=new t((()=>{this.rect=void 0,this.updateMinMax()})))}static get styles(){return[hi]}connectedCallback(){var t;super.connectedCallback(),null==(t=this.observer)||t.observe(this)}disconnectedCallback(){var t;null==(t=this.observer)||t.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){var t,e;const r={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)},o=this.label||(this.resizable?"Resize the panels":void 0);return a`
            <slot
                id=${v(this.resizable?null==(t=this.controlledEl)?void 0:t.id:void 0)}
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?a`
                      <div
                          id="splitter"
                          class=${U(r)}
                          role="separator"
                          aria-controls=${v(this.resizable?null==(e=this.controlledEl)?void 0:e.id:void 0)}
                          aria-label=${v(o)}
                          aria-orientation=${this.vertical?"horizontal":"vertical"}
                          aria-valuenow=${Math.round(parseFloat(this.firstPaneSize)/this.viewSize*100)}
                          tabindex=${v(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${pe({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?a`
                                    <div id="gripper"></div>
                                `:l}
                      </div>
                  `:l}
        `}onContentSlotChange(t){this.controlledEl&&this.controlledElIDApplied&&(this.controlledEl.removeAttribute("id"),this.controlledElIDApplied=!1),this.controlledEl=t.target.assignedElements()[0],this.controlledEl&&!this.controlledEl.id&&(this.controlledEl.id=`${this.tagName.toLowerCase()}-${crypto.randomUUID().slice(0,8)}`,this.controlledElIDApplied=!0),this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(t){!this.resizable||t.button&&0!==t.button?t.preventDefault():(this.splitter.setPointerCapture(t.pointerId),this.offset=this.getOffset())}onPointermove(t){t.preventDefault();let e=this.vertical||this.isLTR?this.getPosition(t)-this.offset:this.offset-this.getPosition(t);this.collapsible&&e<this.minPos-50&&(e=0),this.collapsible&&e>this.maxPos+50&&(e=this.viewSize-this.splitterSize),this.updatePosition(e)}onPointerup(t){this.splitter.releasePointerCapture(t.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const t=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:t}getPosition(t){return this.vertical?t.clientY:t.clientX}movePosition(t,e){t.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+e)}onKeydown(t){if(!this.resizable)return;let e=0;const r=this.isLTR||this.vertical;switch(t.key){case"Home":return t.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return t.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":e=r?-1:1;break;case"ArrowRight":e=r?1:-1;break;case"ArrowUp":case"PageUp":e=this.vertical?-1:1;break;case"ArrowDown":case"PageDown":e=this.vertical?1:-1}if(0!==e){const r=t.key.startsWith("Page")?50:10;this.movePosition(t,r*e)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const t=await this.calcStartPos();this.updatePosition(t)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(t){let e=this.getLimitedPosition(t);this.collapsible&&t<=0&&(e=0),this.collapsible&&t>this.maxPos&&t>=this.viewSize-this.splitterSize&&(e=this.viewSize-this.splitterSize),e!==this.splitterPos&&(this.splitterPos=e,this.dispatchChangeEvent())}getLimitedPosition(t){return t<=this.minPos?this.minPos:t>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,t))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const t=this.paneSlot.assignedNodes({flatten:!0}).find((t=>t instanceof HTMLElement));if(void 0!==t.updateComplete&&await t.updateComplete,t){const e=window.getComputedStyle(t).getPropertyValue(this.vertical?"height":"width"),r=parseFloat(e);if(!isNaN(r))return this.getLimitedPosition(Math.ceil(r))}}return this.viewSize/2}dispatchChangeEvent(){const t=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(t)}willUpdate(t){(!this.hasUpdated||t.has("primarySize"))&&(this.splitterPos=void 0,this.checkResize()),t.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}vi([$()],fi.prototype,"controlledEl",2),vi([s({type:Boolean,reflect:!0})],fi.prototype,"vertical",2),vi([s({type:Boolean,reflect:!0})],fi.prototype,"resizable",2),vi([s({type:Boolean,reflect:!0})],fi.prototype,"collapsible",2),vi([s({type:Number,attribute:"primary-min"})],fi.prototype,"primaryMin",2),vi([s({type:Number,attribute:"primary-max"})],fi.prototype,"primaryMax",2),vi([s({type:String,attribute:"primary-size"})],fi.prototype,"primarySize",2),vi([s({type:Number,attribute:"secondary-min"})],fi.prototype,"secondaryMin",2),vi([s({type:Number,attribute:"secondary-max"})],fi.prototype,"secondaryMax",2),vi([s({type:Number,reflect:!0,attribute:"splitter-pos"})],fi.prototype,"splitterPos",2),vi([s({type:String,attribute:!1})],fi.prototype,"firstPaneSize",2),vi([s()],fi.prototype,"label",2),vi([s({type:Boolean,attribute:!1})],fi.prototype,"enoughChildren",2),vi([s({type:Number})],fi.prototype,"viewSize",2),vi([b("slot")],fi.prototype,"paneSlot",2),vi([b("#splitter")],fi.prototype,"splitter",2),n("sp-split-view",fi);var ki=r`
:host([dir]){--spectrum-statuslight-corner-radius:50%;--spectrum-statuslight-font-weight:400;--spectrum-statuslight-border-width:var(--spectrum-border-width-100);--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-medium
);--spectrum-statuslight-line-height:var(--spectrum-line-height-100);--spectrum-statuslight-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-100
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-medium
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-100
);--spectrum-statuslight-content-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-statuslight-subdued-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-statuslight-semantic-neutral-color:var(
--spectrum-neutral-visual-color
);--spectrum-statuslight-semantic-accent-color:var(
--spectrum-accent-visual-color
);--spectrum-statuslight-semantic-negative-color:var(
--spectrum-negative-visual-color
);--spectrum-statuslight-semantic-info-color:var(
--spectrum-informative-visual-color
);--spectrum-statuslight-semantic-notice-color:var(
--spectrum-notice-visual-color
);--spectrum-statuslight-semantic-positive-color:var(
--spectrum-positive-visual-color
);--spectrum-statuslight-nonsemantic-gray-color:var(
--spectrum-gray-visual-color
);--spectrum-statuslight-nonsemantic-red-color:var(
--spectrum-red-visual-color
);--spectrum-statuslight-nonsemantic-orange-color:var(
--spectrum-orange-visual-color
);--spectrum-statuslight-nonsemantic-yellow-color:var(
--spectrum-yellow-visual-color
);--spectrum-statuslight-nonsemantic-chartreuse-color:var(
--spectrum-chartreuse-visual-color
);--spectrum-statuslight-nonsemantic-celery-color:var(
--spectrum-celery-visual-color
);--spectrum-statuslight-nonsemantic-green-color:var(
--spectrum-green-visual-color
);--spectrum-statuslight-nonsemantic-seafoam-color:var(
--spectrum-seafoam-visual-color
);--spectrum-statuslight-nonsemantic-cyan-color:var(
--spectrum-cyan-visual-color
);--spectrum-statuslight-nonsemantic-blue-color:var(
--spectrum-blue-visual-color
);--spectrum-statuslight-nonsemantic-indigo-color:var(
--spectrum-indigo-visual-color
);--spectrum-statuslight-nonsemantic-purple-color:var(
--spectrum-purple-visual-color
);--spectrum-statuslight-nonsemantic-fuchsia-color:var(
--spectrum-fuchsia-visual-color
);--spectrum-statuslight-nonsemantic-magenta-color:var(
--spectrum-magenta-visual-color
)}:host([size=s]){--spectrum-statuslight-height:var(--spectrum-component-height-75);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-small
);--spectrum-statuslight-font-size:var(--spectrum-font-size-75);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-75
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-small
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-75
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-75
)}:host{--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-medium
);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-100
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-medium
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-100
)}:host([size=l]){--spectrum-statuslight-height:var(--spectrum-component-height-200);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-large
);--spectrum-statuslight-font-size:var(--spectrum-font-size-200);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-200
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-large
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-200
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-200
)}:host([size=xl]){--spectrum-statuslight-height:var(--spectrum-component-height-300);--spectrum-statuslight-dot-size:var(
--spectrum-status-light-dot-size-extra-large
);--spectrum-statuslight-font-size:var(--spectrum-font-size-300);--spectrum-statuslight-spacing-dot-to-label:var(
--spectrum-text-to-visual-300
);--spectrum-statuslight-spacing-top-to-dot:var(
--spectrum-status-light-top-to-dot-extra-large
);--spectrum-statuslight-spacing-top-to-label:var(
--spectrum-component-top-to-text-300
);--spectrum-statuslight-spacing-bottom-to-label:var(
--spectrum-component-bottom-to-text-300
)}@media (forced-colors:active){:host([dir]){--highcontrast-statuslight-content-color-default:CanvasText;--highcontrast-statuslight-subdued-content-color-default:CanvasText;forced-color-adjust:none}:host:before{border:var(
--mod-statuslight-border-width,var(--spectrum-statuslight-border-width)
) solid ButtonText}}:host([dir]){align-items:flex-start;box-sizing:border-box;color:var(
--highcontrast-statuslight-content-color-default,var(
--mod-statuslight-content-color-default,var(--spectrum-statuslight-content-color-default)
)
);display:flex;flex-direction:row;font-size:var(
--mod-statuslight-font-size,var(--spectrum-statuslight-font-size)
);font-weight:var(
--mod-statuslight-font-weight,var(--spectrum-statuslight-font-weight)
);line-height:var(
--mod-statuslight-line-height,var(--spectrum-statuslight-line-height)
);min-block-size:var(
--mod-statuslight-height,var(--spectrum-statuslight-height)
);padding-block-end:var(
--mod-statuslight-spacing-bottom-to-label,var(--spectrum-statuslight-spacing-bottom-to-label)
);padding-block-start:var(
--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label)
);padding-inline:0}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-statuslight-line-height-cjk,var(--spectrum-statuslight-line-height-cjk)
)}:host:before{--spectrum-statuslight-spacing-computed-top-to-dot:calc(var(
--mod-statuslight-spacing-top-to-dot,
var(--spectrum-statuslight-spacing-top-to-dot)
) - var(
--mod-statuslight-spacing-top-to-label,
var(--spectrum-statuslight-spacing-top-to-label)
));-ms-high-contrast-adjust:none;block-size:var(
--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size)
);border-radius:var(
--mod-statuslight-corner-radius,var(--spectrum-statuslight-corner-radius)
);content:"";display:inline-block;flex-grow:0;flex-shrink:0;forced-color-adjust:none;inline-size:var(
--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size)
);margin-block-start:var(--spectrum-statuslight-spacing-computed-top-to-dot);margin-inline-end:var(
--mod-statuslight-spacing-dot-to-label,var(--spectrum-statuslight-spacing-dot-to-label)
)}:host([variant=neutral]){font-style:italic}:host([variant=neutral]){color:var(
--highcontrast-statuslight-subdued-content-color-default,var(
--mod-statuslight-subdued-content-color-default,var(--spectrum-statuslight-subdued-content-color-default)
)
)}:host([variant=neutral]):before{background-color:var(
--mod-statuslight-semantic-neutral-color,var(--spectrum-statuslight-semantic-neutral-color)
)}.spectrum-StatusLight--accent:before{background-color:var(
--mod-statuslight-semantic-accent-color,var(--spectrum-statuslight-semantic-accent-color)
)}:host([variant=info]):before{background-color:var(
--mod-statuslight-semantic-info-color,var(--spectrum-statuslight-semantic-info-color)
)}:host([variant=negative]):before{background-color:var(
--mod-statuslight-semantic-negative-color,var(--spectrum-statuslight-semantic-negative-color)
)}:host([variant=notice]):before{background-color:var(
--mod-statuslight-semantic-notice-color,var(--spectrum-statuslight-semantic-notice-color)
)}:host([variant=positive]):before{background-color:var(
--mod-statuslight-semantic-positive-color,var(--spectrum-statuslight-semantic-positive-color)
)}.spectrum-StatusLight--gray:before{background-color:var(
--mod-statuslight-nonsemantic-gray-color,var(--spectrum-statuslight-nonsemantic-gray-color)
)}.spectrum-StatusLight--red:before{background-color:var(
--mod-statuslight-nonsemantic-red-color,var(--spectrum-statuslight-nonsemantic-red-color)
)}.spectrum-StatusLight--orange:before{background-color:var(
--mod-statuslight-nonsemantic-orange-color,var(--spectrum-statuslight-nonsemantic-orange-color)
)}:host([variant=yellow]):before{background-color:var(
--mod-statuslight-nonsemantic-yellow-color,var(--spectrum-statuslight-nonsemantic-yellow-color)
)}:host([variant=chartreuse]):before{background-color:var(
--mod-statuslight-nonsemantic-chartreuse-color,var(--spectrum-statuslight-nonsemantic-chartreuse-color)
)}:host([variant=celery]):before{background-color:var(
--mod-statuslight-nonsemantic-celery-color,var(--spectrum-statuslight-nonsemantic-celery-color)
)}.spectrum-StatusLight--green:before{background-color:var(
--mod-statuslight-nonsemantic-green-color,var(--spectrum-statuslight-nonsemantic-green-color)
)}:host([variant=seafoam]):before{background-color:var(
--mod-statuslight-nonsemantic-seafoam-color,var(--spectrum-statuslight-nonsemantic-seafoam-color)
)}.spectrum-StatusLight--cyan:before{background-color:var(
--mod-statuslight-nonsemantic-cyan-color,var(--spectrum-statuslight-nonsemantic-cyan-color)
)}.spectrum-StatusLight--blue:before{background-color:var(
--mod-statuslight-nonsemantic-blue-color,var(--spectrum-statuslight-nonsemantic-blue-color)
)}:host([variant=indigo]):before{background-color:var(
--mod-statuslight-nonsemantic-indigo-color,var(--spectrum-statuslight-nonsemantic-indigo-color)
)}:host([variant=purple]):before{background-color:var(
--mod-statuslight-nonsemantic-purple-color,var(--spectrum-statuslight-nonsemantic-purple-color)
)}:host([variant=fuchsia]):before{background-color:var(
--mod-statuslight-nonsemantic-fuchsia-color,var(--spectrum-statuslight-nonsemantic-fuchsia-color)
)}:host([variant=magenta]):before{background-color:var(
--mod-statuslight-nonsemantic-magenta-color,var(--spectrum-statuslight-nonsemantic-magenta-color)
)}:host([disabled]):before{background-color:var(
--spectrum-statuslight-dot-color-disabled,var(--spectrum-global-color-gray-400)
)}
`,wi=Object.defineProperty,yi=Object.getOwnPropertyDescriptor,zi=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?yi(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&wi(e,r,a),a};class xi extends(o(c,{noDefaultSize:!0})){constructor(){super(...arguments),this.disabled=!1,this.variant="info"}static get styles(){return[ki]}render(){return a`
            <slot></slot>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}zi([s({type:Boolean,reflect:!0})],xi.prototype,"disabled",2),zi([s({reflect:!0})],xi.prototype,"variant",2),n("sp-status-light",xi);class Ci extends(A(h)){get focusElement(){return this.inputElement}}var $i=r`
:host{--spectrum-switch-label-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-switch-label-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-switch-label-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-switch-label-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-switch-label-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-switch-background-color:var(--spectrum-gray-300);--spectrum-switch-background-color-disabled:var(--spectrum-gray-300);--spectrum-switch-background-color-selected-disabled:var(
--spectrum-disabled-content-color
);--spectrum-switch-background-color-selected-default:var(
--spectrum-neutral-background-color-selected-default
);--spectrum-switch-background-color-selected-hover:var(
--spectrum-neutral-background-color-selected-hover
);--spectrum-switch-background-color-selected-down:var(
--spectrum-neutral-background-color-selected-down
);--spectrum-switch-background-color-selected-focus:var(
--spectrum-neutral-background-color-selected-key-focus
);--spectrum-switch-focus-indicator-thickness:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
);--spectrum-switch-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-switch-handle-background-color:var(--spectrum-gray-75);--spectrum-switch-handle-border-color-disabled:var(
--spectrum-disabled-content-color
)}:host([disabled]){--spectrum-switch-label-color-default:var(
--spectrum-disabled-content-color
)}:host([emphasized]){--spectrum-switch-background-color-selected-default:var(
--spectrum-accent-color-900
);--spectrum-switch-background-color-selected-hover:var(
--spectrum-accent-color-1000
);--spectrum-switch-background-color-selected-down:var(
--spectrum-accent-color-1100
);--spectrum-switch-background-color-selected-focus:var(
--spectrum-accent-color-1000
);--spectrum-switch-handle-border-color-selected-default:var(
--spectrum-accent-color-900
);--spectrum-switch-handle-border-color-selected-hover:var(
--spectrum-accent-color-1000
);--spectrum-switch-handle-border-color-selected-down:var(
--spectrum-accent-color-1100
);--spectrum-switch-handle-border-color-selected-focus:var(
--spectrum-accent-color-1000
)}:host([size=s]){--spectrum-switch-min-height:var(--spectrum-component-height-75);--spectrum-switch-control-width:var(--spectrum-switch-control-width-small);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-small
);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-75);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-small
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-75
);--spectrum-switch-font-size:var(--spectrum-font-size-75)}:host{--spectrum-switch-min-height:var(--spectrum-component-height-100);--spectrum-switch-control-width:var(
--spectrum-switch-control-width-medium
);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-medium
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-100
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-medium
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-100
);--spectrum-switch-font-size:var(--spectrum-font-size-100)}:host([size=l]){--spectrum-switch-min-height:var(--spectrum-component-height-200);--spectrum-switch-control-width:var(--spectrum-switch-control-width-large);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-large
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-200
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-large
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-200
);--spectrum-switch-font-size:var(--spectrum-font-size-200)}:host([size=xl]){--spectrum-switch-min-height:var(--spectrum-component-height-300);--spectrum-switch-control-width:var(
--spectrum-switch-control-width-extra-large
);--spectrum-switch-control-height:var(
--spectrum-switch-control-height-extra-large
);--spectrum-switch-control-label-spacing:var(
--spectrum-text-to-control-300
);--spectrum-switch-spacing-top-to-control:var(
--spectrum-switch-top-to-control-extra-large
);--spectrum-switch-spacing-top-to-label:var(
--spectrum-component-top-to-text-300
);--spectrum-switch-font-size:var(--spectrum-font-size-300)}:host{align-items:flex-start;display:inline-flex;max-inline-size:100%;min-block-size:var(--mod-switch-height,var(--spectrum-switch-min-height));position:relative;vertical-align:top}#input{block-size:100%;box-sizing:border-box;cursor:pointer;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;padding:0;position:absolute;z-index:1}:host([dir=ltr][checked]) #input+#switch:before{transform:translateX(calc(var(
--mod-switch-control-width,
var(--spectrum-switch-control-width)
) - 100%))}:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc((var(
--mod-switch-control-width,
var(--spectrum-switch-control-width)
) - 100%)*-1))}:host([disabled]) #input{cursor:default}#input.focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#input:focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1)}#label{color:var(
--highcontrast-switch-label-color-default,var(
--mod-switch-label-color-default,var(--spectrum-switch-label-color-default)
)
);font-size:var(--mod-switch-font-size,var(--spectrum-switch-font-size));line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin-block-end:0;margin-block-start:var(
--mod-switch-spacing-top-to-label,var(--spectrum-switch-spacing-top-to-label)
);margin-inline:var(
--mod-switch-control-label-spacing,var(--spectrum-switch-control-label-spacing)
);transition:color var(
--mod-animation-duration-200,var(--spectrum-animation-duration-200)
) ease-in-out}#switch{block-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height))/2);box-sizing:border-box;display:inline-block;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-switch-control-width,var(--spectrum-switch-control-width)
);inset-inline:0;margin-block:calc(var(--mod-switch-height, var(--spectrum-switch-min-height)) - var(
--mod-switch-control-height,
var(--spectrum-switch-control-height)
) - var(
--mod-switch-spacing-top-to-control,
var(--spectrum-switch-spacing-top-to-control)
));margin-inline:0;position:relative;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,border var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;vertical-align:middle}#switch:before{box-sizing:border-box;content:"";display:block;position:absolute}#switch:before{block-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height))/2);border-style:solid;border-width:var(--mod-border-width-200,var(--spectrum-border-width-200));inline-size:var(
--mod-switch-control-height,var(--spectrum-switch-control-height)
);inset-block-start:0;inset-inline-start:0;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,border var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,transform var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out}#switch:after{border-radius:calc(var(--mod-switch-control-height, var(--spectrum-switch-control-height))/2 + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*2);content:"";display:block;inset-block:0;inset-inline:0;margin:0;position:absolute;transition:opacity var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,margin var(
--spectrum-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out}#switch{background-color:var(
--highcontrast-switch-background-color,var(
--mod-switch-background-color,var(--spectrum-switch-background-color)
)
)}#switch:before{background-color:var(
--highcontrast-switch-handle-background-color,var(
--mod-switch-handle-background-color,var(--spectrum-switch-handle-background-color)
)
);border-color:var(
--highcontrast-switch-handle-border-color-default,var(
--mod-switch-handle-border-color-default,var(--spectrum-switch-handle-border-color-default)
)
)}:host(:active) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-down,var(
--mod-switch-handle-border-color-down,var(--spectrum-switch-handle-border-color-down)
)
)}:host(:active) #input~#label{color:var(
--highcontrast-switch-label-color-down,var(
--mod-switch-label-color-down,var(--spectrum-switch-label-color-down)
)
)}:host(:active[checked]) #input:enabled+#switch{background-color:var(
--highcontrast-switch-background-color-selected-down,var(
--mod-switch-background-color-selected-down,var(--spectrum-switch-background-color-selected-down)
)
)}:host(:active[checked]) #input:enabled+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-down,var(
--mod-switch-handle-border-color-selected-down,var(--spectrum-switch-handle-border-color-selected-down)
)
)}#input.focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}#input:focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}#input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}#input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}:host([checked]) #input.focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host([checked]) #input:focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host([checked]) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}:host([checked]) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}#input.focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}#input:focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}@media (hover:hover){:host([disabled][checked]:hover) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host([disabled]:hover) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host([disabled][checked]:hover) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-disabled,var(
--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)
)
)}:host([disabled][checked]:hover) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}:host([checked]:hover) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}:host([checked]:hover) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-focus,var(
--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)
)
)}:host(:hover) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-hover,var(
--mod-switch-handle-border-color-hover,var(--spectrum-switch-handle-border-color-hover)
)
);box-shadow:none}:host([checked]:hover) #input:enabled+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-hover,var(
--mod-switch-handle-border-color-selected-hover,var(--spectrum-switch-handle-border-color-selected-hover)
)
)}:host([disabled]:hover) #input+#switch{background-color:var(
--highcontrast-switch-background-color-disabled,var(
--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)
)
)}:host([disabled]:hover) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}:host(:hover) #input.focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}:host(:hover) #input:focus-visible+#switch:after{box-shadow:0 0 0 var(
--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness)
) var(
--highcontrast-switch-focus-indicator-color,var(
--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)
)
)}:host(:hover) #input.focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}:host(:hover) #input:focus-visible+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-focus,var(
--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)
)
)}:host([checked]:hover) #input.focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host([checked]:hover) #input:focus-visible+#switch{background-color:var(
--highcontrast-switch-background-color-selected-focus,var(
--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)
)
)}:host(:hover) #input~#label{color:var(
--highcontrast-switch-label-color-hover,var(
--mod-switch-label-color-hover,var(--spectrum-switch-label-color-hover)
)
)}:host([checked]:hover) #input:enabled+#switch{background-color:var(
--highcontrast-switch-background-color-selected-hover,var(
--mod-switch-background-color-selected-hover,var(--spectrum-switch-background-color-selected-hover)
)
)}:host(:hover) #input.focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}:host(:hover) #input:focus-visible~#label{color:var(
--highcontrast-switch-label-color-focus,var(
--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)
)
)}}:host([checked]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-default,var(
--mod-switch-background-color-selected-default,var(--spectrum-switch-background-color-selected-default)
)
)}:host([checked]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-selected-default,var(
--mod-switch-handle-border-color-selected-default,var(--spectrum-switch-handle-border-color-selected-default)
)
)}:host([disabled]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-disabled,var(
--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)
)
)}:host([disabled]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host([disabled][checked]) #input+#switch{background-color:var(
--highcontrast-switch-background-color-selected-disabled,var(
--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)
)
)}:host([disabled][checked]) #input+#switch:before{border-color:var(
--highcontrast-switch-handle-border-color-disabled,var(
--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)
)
)}:host([disabled]) #input~#label{color:var(
--highcontrast-switch-label-color-disabled,var(
--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)
)
)}@media (forced-colors:active){:host{--highcontrast-switch-label-color-default:ButtonText;--highcontrast-switch-label-color-hover:ButtonText;--highcontrast-switch-label-color-down:ButtonText;--highcontrast-switch-label-color-focus:ButtonText;--highcontrast-switch-label-color-disabled:GrayText;--highcontrast-switch-handle-background-color:ButtonFace;--highcontrast-switch-handle-border-color-default:ButtonText;--highcontrast-switch-handle-border-color-hover:Highlight;--highcontrast-switch-handle-border-color-down:Highlight;--highcontrast-switch-handle-border-color-focus:Highlight;--highcontrast-switch-handle-border-color-disabled:Highlight;--highcontrast-switch-handle-border-color-selected-default:Highlight;--highcontrast-switch-handle-border-color-selected-hover:Highlight;--highcontrast-switch-handle-border-color-selected-down:Highlight;--highcontrast-switch-handle-border-color-selected-focus:Highlight;--highcontrast-switch-background-color:ButtonFace;--highcontrast-switch-background-color-selected-default:Highlight;--highcontrast-switch-background-color-selected-hover:Highlight;--highcontrast-switch-background-color-selected-down:Highlight;--highcontrast-switch-background-color-selected-focus:Highlight;--highcontrast-switch-background-color-selected-disabled:Highlight;--highcontrast-switch-focus-indicator-color:ButtonText;forced-color-adjust:none}#input:not(:checked)+#switch{box-shadow:inset 0 0 0 1px ButtonText}@media (hover:hover){:host(:hover) #input:not(:checked)+#switch{box-shadow:inset 0 0 0 1px Highlight}:host([disabled][checked]:hover) #input+#switch{background-color:GrayText;box-shadow:inset 0 0 0 1px GrayText}:host([disabled][checked]:hover) #input+#switch:before{background-color:ButtonFace;border-color:GrayText}}:host([disabled]) #input:not(:checked)+#switch{background-color:ButtonFace;box-shadow:inset 0 0 0 1px GrayText}:host([disabled]) #input:not(:checked)+#switch:before{background-color:ButtonFace;border-color:GrayText}:host([disabled][checked]) #input+#switch{background-color:GrayText;box-shadow:inset 0 0 0 1px GrayText}:host([disabled][checked]) #input+#switch:before{background-color:ButtonFace;border-color:GrayText}:host([disabled]) #input~#label{color:GrayText}}:host{--spectrum-switch-handle-border-color-default:var(
--system-spectrum-switch-handle-border-color-default
);--spectrum-switch-handle-border-color-hover:var(
--system-spectrum-switch-handle-border-color-hover
);--spectrum-switch-handle-border-color-down:var(
--system-spectrum-switch-handle-border-color-down
);--spectrum-switch-handle-border-color-focus:var(
--system-spectrum-switch-handle-border-color-focus
);--spectrum-switch-handle-border-color-selected-default:var(
--system-spectrum-switch-handle-border-color-selected-default
);--spectrum-switch-handle-border-color-selected-hover:var(
--system-spectrum-switch-handle-border-color-selected-hover
);--spectrum-switch-handle-border-color-selected-down:var(
--system-spectrum-switch-handle-border-color-selected-down
);--spectrum-switch-handle-border-color-selected-focus:var(
--system-spectrum-switch-handle-border-color-selected-focus
)}:host([disabled]){pointer-events:none}
`;var Pi=r`
#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}
`,Si=Object.defineProperty,Di=Object.getOwnPropertyDescriptor;class Bi extends(o(Ci)){constructor(){super(...arguments),this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[$i,Pi]:[$i]}render(){return a`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("role","switch")}updated(t){t.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}((t,e,r,o)=>{for(var i,a=o>1?void 0:o?Di(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);o&&a&&Si(e,r,a)})([s({type:Boolean,reflect:!0})],Bi.prototype,"emphasized",2),n("sp-switch",Bi);var Li=r`
:host{--sp-tabs-overflow-next-button-right:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-previous-button-left:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-medium) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-100);inset:0;width:100%}:host([size=s]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-small) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-small);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-extra-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-extra-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-300)}:host([compact]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-compact-height-medium) - var(--spectrum-border-width-200));--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-50)}sp-action-button{background:transparent;border:none;box-shadow:none;height:var(--sp-tabs-overflow-button-height);position:absolute;text-align:center;width:var(--sp-tabs-overflow-button-size);z-index:2}sp-action-button.left-scroll{left:var(--sp-tabs-overflow-previous-button-left);visibility:hidden}sp-action-button.right-scroll{right:var(--sp-tabs-overflow-next-button-right);visibility:hidden}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:after,.tabs-overflow-container:before{content:"";height:var(--sp-tabs-overflow-button-height);inset-block-start:0;pointer-events:none;position:absolute;visibility:hidden;width:var(--sp-tabs-overflow-shadow-width);z-index:1}.tabs-overflow-container:before{background:transparent linear-gradient(270deg,transparent,var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;left:0}.tabs-overflow-container:after{background:transparent linear-gradient(90deg,transparent,var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;right:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`,Ei=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,Ai=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?ji(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Ei(e,r,a),a};class Mi extends(o(c)){constructor(){super(),this.compact=!1,this.overflowState={canScrollLeft:!1,canScrollRight:!1},this.resizeController=new J(this,{target:this,callback:()=>{this._updateScrollState()}})}static get styles(){return[w,Li,Z]}firstUpdated(t){super.firstUpdated(t);const[e]=this.scrollContent;e&&(e.enableTabsScroll=!0),this.resizeController.observe(this.overflowContainer)}async _handleSlotChange(){const[t]=this.scrollContent;await(null==t?void 0:t.updateComplete),this._updateScrollState()}_updateScrollState(){const{scrollContent:t,overflowState:e}=this;if(t){const[t]=this.scrollContent,{canScrollLeft:r,canScrollRight:o}=(null==t?void 0:t.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...e,canScrollLeft:r,canScrollRight:o}}}_handleScrollClick(t){const e=t.currentTarget,[r]=this.scrollContent,o=.5*r.clientWidth,i=e.classList.contains("left-scroll")?-o:o;r.scrollTabs(i,"smooth")}updated(t){super.updated(t),t.has("dir")&&this._updateScrollState()}render(){const{canScrollRight:t,canScrollLeft:e}=this.overflowState;return a`
            <div
                class=${U({"tabs-overflow-container":!0,"left-shadow":e,"right-shadow":t})}
            >
                <sp-action-button
                    class=${U({"left-scroll":!0,show:e})}
                    quiet
                    dir="rtl"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${U({"right-scroll":!0,show:t})}
                    quiet
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `}}Ai([s({type:Boolean,reflect:!0})],Mi.prototype,"compact",2),Ai([s({reflect:!0})],Mi.prototype,"dir",2),Ai([$()],Mi.prototype,"overflowState",2),Ai([i({selector:"sp-tabs",flatten:!0})],Mi.prototype,"scrollContent",2),Ai([b(".tabs-overflow-container")],Mi.prototype,"overflowContainer",2),n("sp-tabs-overflow",Mi);var qi=r`
:host{--spectrum-avatar-opacity-disabled:0.3;--spectrum-tag-animation-duration:var(--spectrum-animation-duration-100);--spectrum-tag-border-width:var(--spectrum-border-width-100);--spectrum-tag-focus-ring-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-tag-focus-ring-gap:var(--spectrum-focus-indicator-gap);--spectrum-tag-focus-ring-color:var(--spectrum-focus-indicator-color);--spectrum-tag-label-line-height:var(--spectrum-line-height-100);--spectrum-tag-label-font-weight:var(--spectrum-regular-font-weight);--spectrum-tag-content-color-selected:var(--spectrum-gray-50);--spectrum-tag-background-color-selected:var(
--spectrum-neutral-background-color-selected-default
);--spectrum-tag-background-color-selected-hover:var(
--spectrum-neutral-background-color-selected-hover
);--spectrum-tag-background-color-selected-active:var(
--spectrum-neutral-background-color-selected-down
);--spectrum-tag-background-color-selected-focus:var(
--spectrum-neutral-background-color-selected-key-focus
);--spectrum-tag-border-color-invalid:var(--spectrum-negative-color-900);--spectrum-tag-border-color-invalid-hover:var(
--spectrum-negative-color-1000
);--spectrum-tag-border-color-invalid-active:var(
--spectrum-negative-color-1100
);--spectrum-tag-border-color-invalid-focus:var(
--spectrum-negative-color-1000
);--spectrum-tag-content-color-invalid:var(
--spectrum-negative-content-color-default
);--spectrum-tag-content-color-invalid-hover:var(
--spectrum-negative-content-color-hover
);--spectrum-tag-content-color-invalid-active:var(
--spectrum-negative-content-color-down
);--spectrum-tag-content-color-invalid-focus:var(
--spectrum-negative-content-color-key-focus
);--spectrum-tag-border-color-invalid-selected:var(
--spectrum-negative-background-color-default
);--spectrum-tag-border-color-invalid-selected-hover:var(
--spectrum-negative-background-color-hover
);--spectrum-tag-border-color-invalid-selected-focus:var(
--spectrum-negative-background-color-down
);--spectrum-tag-border-color-invalid-selected-active:var(
--spectrum-negative-background-color-key-focus
);--spectrum-tag-background-color-invalid-selected:var(
--spectrum-negative-background-color-default
);--spectrum-tag-background-color-invalid-selected-hover:var(
--spectrum-negative-background-color-hover
);--spectrum-tag-background-color-invalid-selected-active:var(
--spectrum-negative-background-color-down
);--spectrum-tag-background-color-invalid-selected-focus:var(
--spectrum-negative-background-color-key-focus
);--spectrum-tag-content-color-invalid-selected:var(--spectrum-white);--spectrum-tag-border-color-emphasized:var(
--spectrum-accent-background-color-default
);--spectrum-tag-border-color-emphasized-hover:var(
--spectrum-accent-background-color-hover
);--spectrum-tag-border-color-emphasized-active:var(
--spectrum-accent-background-color-down
);--spectrum-tag-border-color-emphasized-focus:var(
--spectrum-accent-background-color-key-focus
);--spectrum-tag-background-color-emphasized:var(
--spectrum-accent-background-color-default
);--spectrum-tag-background-color-emphasized-hover:var(
--spectrum-accent-background-color-hover
);--spectrum-tag-background-color-emphasized-active:var(
--spectrum-accent-background-color-down
);--spectrum-tag-background-color-emphasized-focus:var(
--spectrum-accent-background-color-key-focus
);--spectrum-tag-content-color-emphasized:var(--spectrum-white);--spectrum-tag-content-color-disabled:var(
--spectrum-disabled-content-color
)}:host([size=s]){--spectrum-tag-height:var(--spectrum-component-height-75);--spectrum-tag-font-size:var(--spectrum-font-size-75);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-75
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-small
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-75);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-small
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-small
);--spectrum-tag-avatar-spacing-inline-end:var(--spectrum-text-to-visual-75);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-75
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-small-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-small-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-small-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-small-clear-button-spacing-inline-end
)}:host{--spectrum-tag-height:var(--spectrum-component-height-100);--spectrum-tag-font-size:var(--spectrum-font-size-100);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-100
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-medium
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-100);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-medium
);--spectrum-tag-avatar-spacing-inline-end:var(
--spectrum-text-to-visual-100
);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-100
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-medium-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-medium-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-medium-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-medium-clear-button-spacing-inline-end
)}:host([size=l]){--spectrum-tag-height:var(--spectrum-component-height-200);--spectrum-tag-font-size:var(--spectrum-font-size-200);--spectrum-tag-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-tag-clear-button-spacing-inline-start:var(
--spectrum-text-to-visual-200
);--spectrum-tag-clear-button-spacing-block:var(
--spectrum-tag-top-to-cross-icon-large
);--spectrum-tag-icon-spacing-block-start:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-tag-icon-spacing-block-end:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-tag-icon-spacing-inline-end:var(--spectrum-text-to-visual-200);--spectrum-tag-avatar-spacing-block-start:var(
--spectrum-tag-top-to-avatar-large
);--spectrum-tag-avatar-spacing-block-end:var(
--spectrum-tag-top-to-avatar-large
);--spectrum-tag-avatar-spacing-inline-end:var(
--spectrum-text-to-visual-200
);--spectrum-tag-label-spacing-block:var(
--spectrum-component-top-to-text-200
);--spectrum-tag-corner-radius:var(--spectrum-tag-size-large-corner-radius);--spectrum-tag-spacing-inline-start:var(
--spectrum-tag-size-large-spacing-inline-start
);--spectrum-tag-label-spacing-inline-end:var(
--spectrum-tag-size-large-label-spacing-inline-end
);--spectrum-tag-clear-button-spacing-inline-end:var(
--spectrum-tag-size-large-clear-button-spacing-inline-end
)}:host{align-items:center;background-color:var(
--highcontrast-tag-background-color,var(--mod-tag-background-color,var(--spectrum-tag-background-color))
);block-size:var(--mod-tag-height,var(--spectrum-tag-height));border-color:var(
--highcontrast-tag-border-color,var(--mod-tag-border-color,var(--spectrum-tag-border-color))
);border-radius:var(
--mod-tag-corner-radius,var(--spectrum-tag-corner-radius)
);border-style:solid;border-width:var(--mod-tag-border-width,var(--spectrum-tag-border-width));box-sizing:border-box;color:var(
--highcontrast-tag-content-color,var(--mod-tag-content-color,var(--spectrum-tag-content-color))
);display:inline-flex;max-inline-size:100%;outline:none;padding-inline-end:0;padding-inline-start:calc(var(
--mod-tag-spacing-inline-start,
var(--spectrum-tag-spacing-inline-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));position:relative;transition:border-color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,box-shadow var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out,background-color var(
--mod-tag-animation-duration,var(--spectrum-tag-animation-duration)
) ease-in-out;-webkit-user-select:none;user-select:none;vertical-align:bottom}::slotted([slot=icon]){block-size:var(--mod-tag-icon-size,var(--spectrum-tag-icon-size));inline-size:var(--mod-tag-icon-size,var(--spectrum-tag-icon-size));margin-block-end:calc(var(
--mod-tag-icon-spacing-block-end,
var(--spectrum-tag-icon-spacing-block-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-block-start:calc(var(
--mod-tag-icon-spacing-block-start,
var(--spectrum-tag-icon-spacing-block-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-end:var(
--mod-tag-icon-spacing-inline-end,var(--spectrum-tag-icon-spacing-inline-end)
)}::slotted([slot=avatar]){margin-block-end:calc(var(
--mod-tag-avatar-spacing-block-end,
var(--spectrum-tag-avatar-spacing-block-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-block-start:calc(var(
--mod-tag-avatar-spacing-block-start,
var(--spectrum-tag-avatar-spacing-block-start)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-end:var(
--mod-tag-avatar-spacing-inline-end,var(--spectrum-tag-avatar-spacing-inline-end)
)}.clear-button{--mod-clear-button-width:fit-content;--spectrum-clearbutton-fill-size:fit-content;--spectrum-clearbutton-fill-background-color:transparent;box-sizing:border-box;color:currentColor;margin-inline-end:calc(var(
--mod-tag-clear-button-spacing-inline-end,
var(--spectrum-tag-clear-button-spacing-inline-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));margin-inline-start:calc(var(
--mod-tag-clear-button-spacing-inline-start,
var(--spectrum-tag-clear-button-spacing-inline-start)
) + var(
--mod-tag-label-spacing-inline-end,
var(--spectrum-tag-label-spacing-inline-end)
)*-1);padding-block-end:calc(var(
--mod-tag-clear-button-spacing-block,
var(--spectrum-tag-clear-button-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));padding-block-start:calc(var(
--mod-tag-clear-button-spacing-block,
var(--spectrum-tag-clear-button-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)))}.clear-button .spectrum-ClearButton-fill{background-color:var(
--mod-clearbutton-fill-background-color,var(--spectrum-clearbutton-fill-background-color)
);block-size:var(
--mod-clearbutton-fill-size,var(--spectrum-clearbutton-fill-size)
);inline-size:var(
--mod-clearbutton-fill-size,var(--spectrum-clearbutton-fill-size)
)}.label{block-size:100%;box-sizing:border-box;cursor:default;flex:auto;font-size:var(--mod-tag-font-size,var(--spectrum-tag-font-size));font-weight:var(
--mod-tag-label-font-weight,var(--spectrum-tag-label-font-weight)
);line-height:var(
--mod-tag-label-line-height,var(--spectrum-tag-label-line-height)
);margin-inline-end:calc(var(
--mod-tag-label-spacing-inline-end,
var(--spectrum-tag-label-spacing-inline-end)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));overflow:hidden;padding-block-start:calc(var(
--mod-tag-label-spacing-block,
var(--spectrum-tag-label-spacing-block)
) - var(--mod-tag-border-width, var(--spectrum-tag-border-width)));text-overflow:ellipsis;white-space:nowrap}:host(:active){background-color:var(
--highcontrast-tag-background-color-active,var(
--mod-tag-background-color-active,var(--spectrum-tag-background-color-active)
)
);border-color:var(
--highcontrast-tag-border-color-active,var(
--mod-tag-border-color-active,var(--spectrum-tag-border-color-active)
)
);color:var(
--highcontrast-tag-content-color-active,var(
--mod-tag-content-color-active,var(--spectrum-tag-content-color-active)
)
)}:host(.focus-visible),:host([focused]){background-color:var(
--highcontrast-tag-background-color-focus,var(
--mod-tag-background-color-focus,var(--spectrum-tag-background-color-focus)
)
);border-color:var(
--highcontrast-tag-border-color-focus,var(
--mod-tag-border-color-focus,var(--spectrum-tag-border-color-focus)
)
);color:var(
--highcontrast-tag-content-color-focus,var(
--mod-tag-content-color-focus,var(--spectrum-tag-content-color-focus)
)
)}:host(:focus-visible),:host([focused]){background-color:var(
--highcontrast-tag-background-color-focus,var(
--mod-tag-background-color-focus,var(--spectrum-tag-background-color-focus)
)
);border-color:var(
--highcontrast-tag-border-color-focus,var(
--mod-tag-border-color-focus,var(--spectrum-tag-border-color-focus)
)
);color:var(
--highcontrast-tag-content-color-focus,var(
--mod-tag-content-color-focus,var(--spectrum-tag-content-color-focus)
)
)}:host(.focus-visible):after,:host([focused]):after{border-color:var(
--highcontrast-tag-focus-ring-color,var(--mod-tag-focus-ring-color,var(--spectrum-tag-focus-ring-color))
);border-radius:calc(var(--mod-tag-corner-radius, var(--spectrum-tag-corner-radius)) + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap)) + var(--mod-tag-border-width, var(--spectrum-tag-border-width)));border-style:solid;border-width:var(
--mod-tag-focus-ring-thickness,var(--spectrum-tag-focus-ring-thickness)
);content:"";display:inline-block;inset-block-end:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-block-start:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-inline-end:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-inline-start:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));pointer-events:none;position:absolute}:host(:focus-visible):after,:host([focused]):after{border-color:var(
--highcontrast-tag-focus-ring-color,var(--mod-tag-focus-ring-color,var(--spectrum-tag-focus-ring-color))
);border-radius:calc(var(--mod-tag-corner-radius, var(--spectrum-tag-corner-radius)) + var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap)) + var(--mod-tag-border-width, var(--spectrum-tag-border-width)));border-style:solid;border-width:var(
--mod-tag-focus-ring-thickness,var(--spectrum-tag-focus-ring-thickness)
);content:"";display:inline-block;inset-block-end:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-block-start:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-inline-end:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));inset-inline-start:calc(var(--mod-tag-focus-ring-gap, var(--spectrum-tag-focus-ring-gap))*-1 - var(--mod-tag-border-width, var(--spectrum-tag-border-width)) - var(
--mod-tag-focus-ring-thickness,
var(--spectrum-tag-focus-ring-thickness)
));pointer-events:none;position:absolute}:host([selected]){background-color:var(
--highcontrast-tag-background-color-selected,var(
--mod-tag-background-color-selected,var(--spectrum-tag-background-color-selected)
)
);border-color:var(
--highcontrast-tag-border-color-selected,var(
--mod-tag-border-color-selected,var(--spectrum-tag-border-color-selected)
)
);color:var(
--highcontrast-tag-content-color-selected,var(
--mod-tag-content-color-selected,var(--spectrum-tag-content-color-selected)
)
)}:host([selected]:active){background-color:var(
--highcontrast-tag-background-color-selected-active,var(
--mod-tag-background-color-selected-active,var(--spectrum-tag-background-color-selected-active)
)
);border-color:var(
--highcontrast-tag-border-color-selected-active,var(
--mod-tag-border-color-selected-active,var(--spectrum-tag-border-color-selected-active)
)
)}:host([selected].focus-visible),:host([selected][focused]){background-color:var(
--highcontrast-tag-background-color-selected-focus,var(
--mod-tag-background-color-selected-focus,var(--spectrum-tag-background-color-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-selected-focus,var(
--mod-tag-border-color-selected-focus,var(--spectrum-tag-border-color-selected-focus)
)
)}:host([selected]:focus-visible),:host([selected][focused]){background-color:var(
--highcontrast-tag-background-color-selected-focus,var(
--mod-tag-background-color-selected-focus,var(--spectrum-tag-background-color-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-selected-focus,var(
--mod-tag-border-color-selected-focus,var(--spectrum-tag-border-color-selected-focus)
)
)}:host([invalid]){border-color:var(
--highcontrast-tag-border-color-invalid,var(
--mod-tag-border-color-invalid,var(--spectrum-tag-border-color-invalid)
)
);color:var(
--highcontrast-tag-content-color-invalid,var(
--mod-tag-content-color-invalid,var(--spectrum-tag-content-color-invalid)
)
)}:host([invalid]:active){border-color:var(
--highcontrast-tag-border-color-invalid-active,var(
--mod-tag-border-color-invalid-active,var(--spectrum-tag-border-color-invalid-active)
)
);color:var(
--highcontrast-tag-content-color-invalid-active,var(
--mod-tag-content-color-invalid-active,var(--spectrum-tag-content-color-invalid-active)
)
)}:host([invalid].focus-visible),:host([invalid][focused]){border-color:var(
--highcontrast-tag-border-color-invalid-focus,var(
--mod-tag-border-color-invalid-focus,var(--spectrum-tag-border-color-invalid-focus)
)
);color:var(
--highcontrast-tag-content-color-invalid-focus,var(
--mod-tag-content-color-invalid-focus,var(--spectrum-tag-content-color-invalid-focus)
)
)}:host([invalid]:focus-visible),:host([invalid][focused]){border-color:var(
--highcontrast-tag-border-color-invalid-focus,var(
--mod-tag-border-color-invalid-focus,var(--spectrum-tag-border-color-invalid-focus)
)
);color:var(
--highcontrast-tag-content-color-invalid-focus,var(
--mod-tag-content-color-invalid-focus,var(--spectrum-tag-content-color-invalid-focus)
)
)}:host([invalid][selected]){background-color:var(
--highcontrast-tag-background-color-invalid-selected,var(
--mod-tag-background-color-invalid-selected,var(--spectrum-tag-background-color-invalid-selected)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected,var(
--mod-tag-border-color-invalid-selected,var(--spectrum-tag-border-color-invalid-selected)
)
);color:var(
--highcontrast-tag-content-color-invalid-selected,var(
--mod-tag-content-color-invalid-selected,var(--spectrum-tag-content-color-invalid-selected)
)
)}:host([invalid][selected]:active){background-color:var(
--highcontrast-tag-background-color-invalid-selected-active,var(
--mod-tag-background-color-invalid-selected-active,var(--spectrum-tag-background-color-invalid-selected-active)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-active,var(
--mod-tag-border-color-invalid-selected-active,var(--spectrum-tag-border-color-invalid-selected-active)
)
)}:host([invalid][selected].focus-visible),:host([invalid][selected][focused]){background-color:var(
--highcontrast-tag-background-color-invalid-selected-focus,var(
--mod-tag-background-color-invalid-selected-focus,var(--spectrum-tag-background-color-invalid-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-focus,var(
--mod-tag-border-color-invalid-selected-focus,var(--spectrum-tag-border-color-invalid-selected-focus)
)
)}:host([invalid][selected]:focus-visible),:host([invalid][selected][focused]){background-color:var(
--highcontrast-tag-background-color-invalid-selected-focus,var(
--mod-tag-background-color-invalid-selected-focus,var(--spectrum-tag-background-color-invalid-selected-focus)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-focus,var(
--mod-tag-border-color-invalid-selected-focus,var(--spectrum-tag-border-color-invalid-selected-focus)
)
)}:host([emphasized]){background-color:var(
--highcontrast-tag-background-color-emphasized,var(
--mod-tag-background-color-emphasized,var(--spectrum-tag-background-color-emphasized)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized,var(
--mod-tag-border-color-emphasized,var(--spectrum-tag-border-color-emphasized)
)
);color:var(
--highcontrast-tag-content-color-emphasized,var(
--mod-tag-content-color-emphasized,var(--spectrum-tag-content-color-emphasized)
)
)}@media (hover:hover){:host([invalid][selected]:hover){background-color:var(
--highcontrast-tag-background-color-invalid-selected-hover,var(
--mod-tag-background-color-invalid-selected-hover,var(--spectrum-tag-background-color-invalid-selected-hover)
)
);border-color:var(
--highcontrast-tag-border-color-invalid-selected-hover,var(
--mod-tag-border-color-invalid-selected-hover,var(--spectrum-tag-border-color-invalid-selected-hover)
)
);color:var(
--highcontrast-tag-content-color-invalid-selected,var(
--mod-tag-content-color-invalid-selected,var(--spectrum-tag-content-color-invalid-selected)
)
)}:host(:hover){background-color:var(
--highcontrast-tag-background-color-hover,var(
--mod-tag-background-color-hover,var(--spectrum-tag-background-color-hover)
)
);border-color:var(
--highcontrast-tag-border-color-hover,var(
--mod-tag-border-color-hover,var(--spectrum-tag-border-color-hover)
)
);color:var(
--highcontrast-tag-content-color-hover,var(
--mod-tag-content-color-hover,var(--spectrum-tag-content-color-hover)
)
)}:host([selected]:hover){background-color:var(
--highcontrast-tag-background-color-selected-hover,var(
--mod-tag-background-color-selected-hover,var(--spectrum-tag-background-color-selected-hover)
)
);border-color:var(
--highcontrast-tag-border-color-selected-hover,var(
--mod-tag-border-color-selected-hover,var(--spectrum-tag-border-color-selected-hover)
)
);color:var(
--highcontrast-tag-content-color-selected,var(
--mod-tag-content-color-selected,var(--spectrum-tag-content-color-selected)
)
)}:host([invalid]:hover){border-color:var(
--highcontrast-tag-border-color-invalid-hover,var(
--mod-tag-border-color-invalid-hover,var(--spectrum-tag-border-color-invalid-hover)
)
);color:var(
--highcontrast-tag-content-color-invalid-hover,var(
--mod-tag-content-color-invalid-hover,var(--spectrum-tag-content-color-invalid-hover)
)
)}:host([emphasized]:hover){background-color:var(
--highcontrast-tag-background-color-emphasized-hover,var(
--mod-tag-background-color-emphasized-hover,var(--spectrum-tag-background-color-emphasized-hover)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-hover,var(
--mod-tag-border-color-emphasized-hover,var(--spectrum-tag-border-color-emphasized-hover)
)
);color:var(
--highcontrast-tag-content-color-emphasized,var(
--mod-tag-content-color-emphasized,var(--spectrum-tag-content-color-emphasized)
)
)}}:host([emphasized]:active){background-color:var(
--highcontrast-tag-background-color-emphasized-active,var(
--mod-tag-background-color-emphasized-active,var(--spectrum-tag-background-color-emphasized-active)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-active,var(
--mod-tag-border-color-emphasized-active,var(--spectrum-tag-border-color-emphasized-active)
)
)}:host([emphasized].focus-visible),:host([emphasized][focused]){background-color:var(
--highcontrast-tag-background-color-emphasized-focus,var(
--mod-tag-background-color-emphasized-focus,var(--spectrum-tag-background-color-emphasized-focus)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-focus,var(
--mod-tag-border-color-emphasized-focus,var(--spectrum-tag-border-color-emphasized-focus)
)
)}:host([emphasized]:focus-visible),:host([emphasized][focused]){background-color:var(
--highcontrast-tag-background-color-emphasized-focus,var(
--mod-tag-background-color-emphasized-focus,var(--spectrum-tag-background-color-emphasized-focus)
)
);border-color:var(
--highcontrast-tag-border-color-emphasized-focus,var(
--mod-tag-border-color-emphasized-focus,var(--spectrum-tag-border-color-emphasized-focus)
)
)}:host([disabled]){background-color:var(
--highcontrast-tag-background-color-disabled,var(
--mod-tag-background-color-disabled,var(--spectrum-tag-background-color-disabled)
)
);border-color:var(
--highcontrast-tag-border-color-disabled,var(
--mod-tag-border-color-disabled,var(--spectrum-tag-border-color-disabled)
)
);color:var(
--highcontrast-tag-content-color-disabled,var(
--mod-tag-content-color-disabled,var(--spectrum-tag-content-color-disabled)
)
);pointer-events:none}:host([disabled]) ::slotted([slot=avatar]){opacity:var(
--mod-avatar-opacity-disabled,var(--spectrum-avatar-opacity-disabled)
)}@media (forced-colors:active){:host{--highcontrast-tag-border-color:ButtonText;--highcontrast-tag-border-color-hover:ButtonText;--highcontrast-tag-border-color-active:ButtonText;--highcontrast-tag-border-color-focus:Highlight;--highcontrast-tag-background-color:ButtonFace;--highcontrast-tag-background-color-hover:ButtonFace;--highcontrast-tag-background-color-active:ButtonFace;--highcontrast-tag-background-color-focus:ButtonFace;--highcontrast-tag-content-color:ButtonText;--highcontrast-tag-content-color-hover:ButtonText;--highcontrast-tag-content-color-active:ButtonText;--highcontrast-tag-content-color-focus:ButtonText;--highcontrast-tag-focus-ring-color:Highlight;forced-color-adjust:none}:host([selected]){--highcontrast-tag-border-color-selected:Highlight;--highcontrast-tag-border-color-selected-hover:Highlight;--highcontrast-tag-border-color-selected-active:Highlight;--highcontrast-tag-border-color-selected-focus:Highlight;--highcontrast-tag-background-color-selected:Highlight;--highcontrast-tag-background-color-selected-hover:Highlight;--highcontrast-tag-background-color-selected-active:Highlight;--highcontrast-tag-background-color-selected-focus:Highlight;--highcontrast-tag-content-color-selected:HighlightText}:host([disabled]){--highcontrast-tag-border-color-disabled:GrayText;--highcontrast-tag-background-color-disabled:ButtonFace;--highcontrast-tag-content-color-disabled:GrayText}:host([invalid]){--highcontrast-tag-border-color-invalid:Highlight;--highcontrast-tag-border-color-invalid-hover:Highlight;--highcontrast-tag-border-color-invalid-active:Highlight;--highcontrast-tag-border-color-invalid-focus:Highlight;--highcontrast-tag-content-color-invalid:CanvasText;--highcontrast-tag-content-color-invalid-hover:CanvasText;--highcontrast-tag-content-color-invalid-active:CanvasText;--highcontrast-tag-content-color-invalid-focus:CanvasText}:host([invalid][selected]){--highcontrast-tag-border-color-invalid-selected:Highlight;--highcontrast-tag-border-color-invalid-selected-hover:Highlight;--highcontrast-tag-border-color-invalid-selected-focus:Highlight;--highcontrast-tag-border-color-invalid-selected-active:Highlight;--highcontrast-tag-background-color-invalid-selected:Highlight;--highcontrast-tag-background-color-invalid-selected-hover:Highlight;--highcontrast-tag-background-color-invalid-selected-active:Highlight;--highcontrast-tag-background-color-invalid-selected-focus:Highlight;--highcontrast-tag-content-color-invalid-selected:HighlightText}:host([emphasized]){--highcontrast-tag-border-color-emphasized:Highlight;--highcontrast-tag-border-color-emphasized-hover:Highlight;--highcontrast-tag-border-color-emphasized-active:Highlight;--highcontrast-tag-border-color-emphasized-focus:Highlight;--highcontrast-tag-background-color-emphasized:ButtonFace;--highcontrast-tag-background-color-emphasized-hover:ButtonFace;--highcontrast-tag-background-color-emphasized-active:ButtonFace;--highcontrast-tag-background-color-emphasized-focus:ButtonFace;--highcontrast-tag-content-color-emphasized:CanvasText}}:host{--spectrum-tag-border-color:var(--system-spectrum-tag-border-color);--spectrum-tag-border-color-hover:var(
--system-spectrum-tag-border-color-hover
);--spectrum-tag-border-color-active:var(
--system-spectrum-tag-border-color-active
);--spectrum-tag-border-color-focus:var(
--system-spectrum-tag-border-color-focus
);--spectrum-tag-size-small-corner-radius:var(
--system-spectrum-tag-size-small-corner-radius
);--spectrum-tag-size-medium-corner-radius:var(
--system-spectrum-tag-size-medium-corner-radius
);--spectrum-tag-size-large-corner-radius:var(
--system-spectrum-tag-size-large-corner-radius
);--spectrum-tag-background-color:var(
--system-spectrum-tag-background-color
);--spectrum-tag-background-color-hover:var(
--system-spectrum-tag-background-color-hover
);--spectrum-tag-background-color-active:var(
--system-spectrum-tag-background-color-active
);--spectrum-tag-background-color-focus:var(
--system-spectrum-tag-background-color-focus
);--spectrum-tag-content-color:var(--system-spectrum-tag-content-color);--spectrum-tag-content-color-hover:var(
--system-spectrum-tag-content-color-hover
);--spectrum-tag-content-color-active:var(
--system-spectrum-tag-content-color-active
);--spectrum-tag-content-color-focus:var(
--system-spectrum-tag-content-color-focus
);--spectrum-tag-border-color-selected:var(
--system-spectrum-tag-border-color-selected
);--spectrum-tag-border-color-selected-hover:var(
--system-spectrum-tag-border-color-selected-hover
);--spectrum-tag-border-color-selected-active:var(
--system-spectrum-tag-border-color-selected-active
);--spectrum-tag-border-color-selected-focus:var(
--system-spectrum-tag-border-color-selected-focus
);--spectrum-tag-border-color-disabled:var(
--system-spectrum-tag-border-color-disabled
);--spectrum-tag-background-color-disabled:var(
--system-spectrum-tag-background-color-disabled
);--spectrum-tag-size-small-spacing-inline-start:var(
--system-spectrum-tag-size-small-spacing-inline-start
);--spectrum-tag-size-small-label-spacing-inline-end:var(
--system-spectrum-tag-size-small-label-spacing-inline-end
);--spectrum-tag-size-small-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-small-clear-button-spacing-inline-end
);--spectrum-tag-size-medium-spacing-inline-start:var(
--system-spectrum-tag-size-medium-spacing-inline-start
);--spectrum-tag-size-medium-label-spacing-inline-end:var(
--system-spectrum-tag-size-medium-label-spacing-inline-end
);--spectrum-tag-size-medium-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-medium-clear-button-spacing-inline-end
);--spectrum-tag-size-large-spacing-inline-start:var(
--system-spectrum-tag-size-large-spacing-inline-start
);--spectrum-tag-size-large-label-spacing-inline-end:var(
--system-spectrum-tag-size-large-label-spacing-inline-end
);--spectrum-tag-size-large-clear-button-spacing-inline-end:var(
--system-spectrum-tag-size-large-clear-button-spacing-inline-end
)}:host([invalid]) .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-key-focus,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([invalid]):hover .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-hover,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([invalid]):active .clear-button{--spectrum-clearbutton-medium-icon-color:var(
--spectrum-tag-icon-color-error-hover,var(--spectrum-global-color-red-600)
);--spectrum-clearbutton-medium-icon-color-hover:var(
--spectrum-clearbutton-medium-icon-color
);--spectrum-clearbutton-medium-icon-color-down:var(
--spectrum-tag-deletable-icon-color-error-down,var(--spectrum-global-color-red-700)
)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}
`,Hi=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,Oi=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Ti(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Hi(e,r,a),a};class Fi extends(o(c,{validSizes:["s","m","l"],noDefaultSize:!0})){constructor(){super(),this.deletable=!1,this.disabled=!1,this.readonly=!1,this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.handleKeydown=t=>{if(!this.deletable||this.disabled)return;const{code:e}=t;switch(e){case"Backspace":case"Space":case"Delete":this.delete();default:return}},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[qi]}delete(){this.readonly||!this.dispatchEvent(new Event("delete",{bubbles:!0,cancelable:!0,composed:!0}))||this.remove()}render(){return a`
            <slot name="avatar"></slot>
            <slot name="icon"></slot>
            <span class="label"><slot></slot></span>
            ${this.deletable?a`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `:l}
        `}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex","0")}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}Oi([s({type:Boolean,reflect:!0})],Fi.prototype,"deletable",2),Oi([s({type:Boolean,reflect:!0})],Fi.prototype,"disabled",2),Oi([s({type:Boolean,reflect:!0})],Fi.prototype,"readonly",2),n("sp-tag",Fi);var Ii=r`
:host{--mod-clear-button-width:fit-content;--spectrum-taggroup-tag-gap-x:var(--spectrum-global-dimension-size-100);--spectrum-taggroup-tag-gap-y:var(--spectrum-global-dimension-size-100);display:inline-flex;list-style:none;margin:0;padding:0}::slotted(*){margin:calc(var(
--spectrum-taggroup-tag-gap-y,
var(--spectrum-global-dimension-size-100)
)/2) calc(var(
--spectrum-taggroup-tag-gap-x,
var(--spectrum-global-dimension-size-100)
)/2)}
`,_i=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor;class Ni extends(k(c)){constructor(){super(),this.rovingTabindexController=new e(this,{focusInIndex:t=>t.findIndex((t=>!t.disabled&&t.deletable)),elements:()=>this.tags,isFocusableElement:t=>!t.disabled&&t.deletable}),this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)},this.handleKeydown=t=>{const{code:e}=t;if("PageUp"!==e&&"PageDown"!==e)return;const r=(t,e)=>t[(t.length+e)%t.length],o=[...this.getRootNode().querySelectorAll("sp-tags")];if(o.length<2)return;t.preventDefault();const i="PageUp"===e?-1:1;let a=o.indexOf(this)+i,s=r(o,a);for(;!s.tags.length;)a+=i,s=r(o,a);s.focus()},this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)},this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Ii]}get tags(){return this.defaultNodes.filter((t=>t instanceof Fi))}focus(){this.rovingTabindexController.focus()}handleSlotchange(){this.rovingTabindexController.clearElementCache()}render(){return a`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}firstUpdated(){this.hasAttribute("role")||this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","Tags")}}((t,e,r,o)=>{for(var i,a=o>1?void 0:o?Ri(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);o&&a&&_i(e,r,a)})([p()],Ni.prototype,"defaultNodes",2),n("sp-tags",Ni),n("sp-textfield",S);var Ui=r`
:host{--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-500);--spectrum-thumbnail-border-radius:var(--spectrum-corner-radius-75);--spectrum-thumbnail-border-width:var(--spectrum-border-width-100);--spectrum-thumbnail-border-color-rgba:rgba(var(--spectrum-gray-800-rgb),var(--spectrum-thumbnail-border-color-opacity));--spectrum-thumbnail-layer-border-width-inner:var(
--spectrum-border-width-400
);--spectrum-thumbnail-layer-border-color-inner:var(--spectrum-white);--spectrum-thumbnail-layer-border-width-outer:var(
--spectrum-border-width-100
);--spectrum-thumbnail-layer-border-color-outer:var(--spectrum-gray-500);--spectrum-thumbnail-border-width-selected:var(
--spectrum-border-width-200
);--spectrum-thumbnail-border-color-selected:var(
--spectrum-accent-color-800
);--spectrum-thumbnail-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-thumbnail-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-thumbnail-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-thumbnail-color-opacity-disabled:var(
--spectrum-thumbnail-opacity-disabled
)}:host([size="50"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-50)}:host([size="75"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-75)}:host([size="100"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-100)}:host([size="200"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-200)}:host([size="300"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-300)}:host([size="400"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-400)}:host([size="500"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-500)}:host([size="600"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-600)}:host([size="700"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-700)}:host([size="800"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-800)}:host([size="900"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-900)}:host([size="1000"]){--spectrum-thumbnail-size:var(--spectrum-thumbnail-size-1000)}:host{block-size:var(--mod-thumbnail-size,var(--spectrum-thumbnail-size));border-radius:var(
--mod-thumbnail-border-radius,var(--spectrum-thumbnail-border-radius)
);display:block;inline-size:var(--mod-thumbnail-size,var(--spectrum-thumbnail-size));margin:0;overflow:hidden;padding:0;position:relative;vertical-align:top;z-index:0}:host:before{block-size:100%;border-radius:var(
--mod-thumbnail-border-radius,var(--spectrum-thumbnail-border-radius)
);box-shadow:inset 0 0 0 var(
--mod-thumbnail-border-width,var(--spectrum-thumbnail-border-width)
) var(
--highcontrast-thumbnail-border-color,var(
--mod-thumbnail-border-color,var(--spectrum-thumbnail-border-color-rgba)
)
);content:"";inline-size:100%;position:absolute;z-index:2}:host([disabled]){opacity:var(
--mod-thumbnail-color-opacity-disabled,var(--spectrum-thumbnail-color-opacity-disabled)
)}:host([focused]){overflow:visible}:host([focused]):after{border-color:var(
--highcontrast-thumbnail-focus-indicator-color,var(
--mod-thumbnail-focus-indicator-color,var(--spectrum-thumbnail-focus-indicator-color)
)
);border-radius:var(
--mod-thumbnail-border-radius,var(--spectrum-thumbnail-border-radius)
);border-style:solid;border-width:var(
--mod-thumbnail-focus-indicator-thickness,var(--spectrum-thumbnail-focus-indicator-thickness)
);content:"";inset-block-end:calc((var(
--mod-thumbnail-focus-indicator-gap,
var(--spectrum-thumbnail-focus-indicator-gap)
) + var(
--mod-thumbnail-focus-indicator-thickness,
var(--spectrum-thumbnail-focus-indicator-thickness)
))*-1);inset-block-start:calc((var(
--mod-thumbnail-focus-indicator-gap,
var(--spectrum-thumbnail-focus-indicator-gap)
) + var(
--mod-thumbnail-focus-indicator-thickness,
var(--spectrum-thumbnail-focus-indicator-thickness)
))*-1);inset-inline-end:calc((var(
--mod-thumbnail-focus-indicator-gap,
var(--spectrum-thumbnail-focus-indicator-gap)
) + var(
--mod-thumbnail-focus-indicator-thickness,
var(--spectrum-thumbnail-focus-indicator-thickness)
))*-1);inset-inline-start:calc((var(
--mod-thumbnail-focus-indicator-gap,
var(--spectrum-thumbnail-focus-indicator-gap)
) + var(
--mod-thumbnail-focus-indicator-thickness,
var(--spectrum-thumbnail-focus-indicator-thickness)
))*-1);position:absolute}:host([focused]) .image-wrapper{border-radius:var(
--mod-thumbnail-border-radius,var(--spectrum-thumbnail-border-radius)
);overflow:hidden}:host([layer]){align-items:center;border-color:var(
--highcontrast-thumbnail-layer-border-color-outer,var(
--mod-thumbnail-layer-border-color-outer,var(--spectrum-thumbnail-layer-border-color-outer)
)
);border-style:solid;border-width:var(
--mod-thumbnail-layer-border-width-outer,var(--spectrum-thumbnail-layer-border-width-outer)
);box-sizing:border-box;display:flex;justify-content:center}:host([layer]):before{content:none}:host([layer][selected]){outline-color:var(
--highcontrast-thumbnail-border-color-selected,var(
--mod-thumbnail-border-color-selected,var(--spectrum-thumbnail-border-color-selected)
)
);outline-offset:calc(var(
--mod-thumbnail-border-width-selected,
var(--spectrum-thumbnail-border-width-selected)
) - var(
--mod-thumbnail-layer-border-width-inner,
var(--spectrum-thumbnail-layer-border-width-inner)
));outline-style:solid;outline-width:var(
--mod-thumbnail-border-width-selected,var(--spectrum-thumbnail-border-width-selected)
)}.layer-inner{block-size:calc(var(--spectrum-thumbnail-size) - var(
--mod-thumbnail-layer-border-width-inner,
var(--spectrum-thumbnail-layer-border-width-inner)
)*2);inline-size:calc(var(--spectrum-thumbnail-size) - var(
--mod-thumbnail-layer-border-width-inner,
var(--spectrum-thumbnail-layer-border-width-inner)
)*2);outline-color:var(
--highcontrast-thumbnail-layer-border-color-inner,var(
--mod-thumbnail-layer-border-color-inner,var(--spectrum-thumbnail-layer-border-color-inner)
)
);outline-style:solid;outline-width:calc(var(
--mod-thumbnail-layer-border-width-inner,
var(--spectrum-thumbnail-layer-border-width-inner)
) - var(
--mod-thumbnail-layer-border-width-outer,
var(--spectrum-thumbnail-layer-border-width-outer)
))}.image-wrapper,.layer-inner{align-items:center;display:flex;justify-content:center}.image-wrapper{block-size:100%;inline-size:100%}::slotted(*){max-block-size:100%;max-inline-size:100%;position:relative;z-index:1}:host([cover]) ::slotted(*){block-size:100%;inline-size:100%;object-fit:cover;object-position:center}.background{background-position:50%;background-size:cover;block-size:100%;border-radius:var(
--mod-thumbnail-border-radius,var(--spectrum-thumbnail-border-radius)
);inline-size:100%;inset-block:0;inset-inline:0;position:absolute;z-index:0}@media (forced-colors:active){:host{--highcontrast-thumbnail-border-color-selected:Highlight;--highcontrast-thumbnail-focus-indicator-color:Highlight;--highcontrast-thumbnail-border-color:CanvasText;--highcontrast-thumbnail-layer-border-color-inner:Canvas;--highcontrast-thumbnail-layer-border-color-outer:CanvasText;forced-color-adjust:none}}::slotted(:not(img)){display:none}
`,Vi=Object.defineProperty,Ki=Object.getOwnPropertyDescriptor,Gi=(t,e,r,o)=>{for(var i,a=o>1?void 0:o?Ki(e,r):e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o?i(e,r,a):i(a))||a);return o&&a&&Vi(e,r,a),a};const Xi=["50","75","100","200","300","400","500","600","700","800","900","1000"],Wi=Xi[6];class Yi extends c{constructor(){super(...arguments),this.cover=!1,this.layer=!1,this._size=Wi}static get styles(){return[F,Ui]}get size(){return this._size}set size(t){["xxs","xs","s","m","l"].includes(t)&&(t={xxs:"100",xs:"300",s:"500",m:"700",l:"900"}[t]);const e=Xi.includes(t)?t:Wi;if(e&&this.setAttribute("size",`${e}`),this._size===e)return;const r=this._size;this._size=e,this.requestUpdate("size",r)}update(t){this.hasAttribute("size")||this.setAttribute("size",this.size),super.update(t)}render(){return this.background?a`
                <div
                    class="opacity-checkerboard background"
                    style="background: ${this.background}"
                >
                    <div class="image-wrapper">
                        <slot></slot>
                    </div>
                </div>
            `:this.layer?a`
                <div class="opacity-checkerboard layer-inner">
                    <slot></slot>
                </div>
            `:a`
                <div class="opacity-checkerboard image-wrapper">
                    <slot></slot>
                </div>
            `}}Gi([s({type:String,reflect:!0})],Yi.prototype,"background",2),Gi([s({type:Boolean,reflect:!0})],Yi.prototype,"cover",2),Gi([s({type:Boolean,reflect:!0})],Yi.prototype,"layer",2),Gi([s({type:String,reflect:!0})],Yi.prototype,"size",1),n("sp-thumbnail",Yi);
//# sourceMappingURL=3184b199.js.map
