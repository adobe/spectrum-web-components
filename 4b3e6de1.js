import{F as o}from"./25383a57.js";import{i as e}from"./112b2095.js";import{S as t}from"./01b2daba.js";import{x as r}from"./e6d35ea0.js";import{n as c,S as a}from"./c34bcf8e.js";import{o as i,a as n}from"./928f07c5.js";import{d as s}from"./25a3ae37.js";import"./f4e2e53b.js";import{b as d}from"./aa2c2e34.js";import{n as m}from"./879dbe89.js";var p=e`
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
`,u=Object.defineProperty,l=Object.getOwnPropertyDescriptor,h=(o,e,t,r)=>{for(var c,a=r>1?void 0:r?l(e,t):e,i=o.length-1;i>=0;i--)(c=o[i])&&(a=(r?c(e,t,a):c(a))||a);return r&&a&&u(e,t,a),a};class v extends(t(a,{noDefaultSize:!0})){constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new o(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:o=>!o.disabled})}static get styles(){return[p]}get items(){return[...this.defaultNodes||[]].filter((o=>void 0!==o.tagName))}focus(){this.focusGroupController.focus()}async onToggle(o){const e=o.target;if(await 0,this.allowMultiple||o.defaultPrevented)return;const t=[...this.items];t&&!t.length||t.forEach((o=>{o!==e&&(o.open=!1)}))}handleSlotchange(){this.focusGroupController.clearElementCache(),this.items.forEach((o=>{o.size=this.size}))}updated(o){super.updated(o),o.has("size")&&(o.get("size")||"m"!==this.size)&&this.items.forEach((o=>{o.size=this.size}))}render(){return r`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}h([c({type:Boolean,reflect:!0,attribute:"allow-multiple"})],v.prototype,"allowMultiple",2),h([c({type:String,reflect:!0})],v.prototype,"density",2),h([i()],v.prototype,"defaultNodes",2),s("sp-accordion",v);var g=e`
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
`,b=Object.defineProperty,f=Object.getOwnPropertyDescriptor,x=(o,e,t,r)=>{for(var c,a=r>1?void 0:r?f(e,t):e,i=o.length-1;i>=0;i--)(c=o[i])&&(a=(r?c(e,t,a):c(a))||a);return r&&a&&b(e,t,a),a};const y={s:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,m:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,l:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,xl:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `};class k extends(t(n,{noDefaultSize:!0})){constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1,this.renderChevronIcon=()=>y[this.size||"m"]()}static get styles(){return[g,d]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return r`
            <h3 id="heading">
                ${m(this.size,this.renderChevronIcon)}
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
        `}updated(o){super.updated(o),o.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}x([c({type:Boolean,reflect:!0})],k.prototype,"open",2),x([c({type:String,reflect:!0})],k.prototype,"label",2),x([c({type:Boolean,reflect:!0})],k.prototype,"disabled",2),s("sp-accordion-item",k);
//# sourceMappingURL=4b3e6de1.js.map
