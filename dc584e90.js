import{e as t,R as e,T as o,x as i,y as r,_ as l}from"./88c439b5.js";import{e as a,a as c,t as n,S as s,d as u,f as d,l as p,b as m,c as v,i as f}from"./6af27e24.js";import{r as h}from"./e50c5e8d.js";import"./0d809998.js";import"./031c2c73.js";import"./ee206ec0.js";function b(e){return t({...e,state:!0})}const{H:x}=e,g=t=>void 0===t.strings,w=()=>document.createComment(""),k=(t,e,o)=>{var i;const r=t._$AA.parentNode,l=void 0===e?t._$AB:e._$AA;if(void 0===o){const e=r.insertBefore(w(),l),i=r.insertBefore(w(),l);o=new x(e,i,t,t.options)}else{const e=o._$AB.nextSibling,a=o._$AM,c=a!==t;if(c){let e;null===(i=o._$AQ)||void 0===i||i.call(o,t),o._$AM=t,void 0!==o._$AP&&(e=t._$AU)!==a._$AU&&o._$AP(e)}if(e!==l||c){let t=o._$AA;for(;t!==e;){const e=t.nextSibling;r.insertBefore(t,l),t=e}}}return o},y=(t,e,o=t)=>(t._$AI(e,o),t),q={},z=(t,e=q)=>t._$AH=e,$=t=>t._$AH,E=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let o=t._$AA;const i=t._$AB.nextSibling;for(;o!==i;){const t=o.nextSibling;o.remove(),o=t}},A=a(class extends c{constructor(t){if(super(t),t.type!==n.PROPERTY&&t.type!==n.ATTRIBUTE&&t.type!==n.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!g(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===o||e===i)return e;const r=t.element,l=t.name;if(t.type===n.PROPERTY){if(e===r[l])return o}else if(t.type===n.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(l))return o}else if(t.type===n.ATTRIBUTE&&r.getAttribute(l)===e+"")return o;return z(t),e}});var I=h`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host([disabled]){cursor:default}:host{background-color:transparent;border:none;border-radius:100%;margin:0;padding:var(--spectrum-clearbutton-padding)}:host>.icon{margin:0 auto}:host([size=s]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-s-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-s-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-s-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-s-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-s-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-s-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-s-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-s-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-s-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-s-fill-size,var(--spectrum-alias-infieldbutton-full-height-s)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-s-padding,var(--spectrum-alias-infieldbutton-padding-s)
)}:host([size=m]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-m-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-m-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-m-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-m-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-m-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-m-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-m-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-m-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-m-fill-size,var(--spectrum-alias-infieldbutton-full-height-m)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-m-padding,var(--spectrum-alias-infieldbutton-padding-m)
)}:host([size=l]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-l-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-l-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-l-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-l-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-l-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-l-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-l-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-l-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-l-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-l-fill-size,var(--spectrum-alias-infieldbutton-full-height-l)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-l-padding,var(--spectrum-alias-infieldbutton-padding-l)
)}:host([size=xl]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-xl-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-xl-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-xl-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-xl-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-xl-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-xl-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-xl-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-xl-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-xl-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-xl-fill-size,var(--spectrum-alias-infieldbutton-full-height-xl)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-xl-padding,var(--spectrum-alias-infieldbutton-padding-xl)
)}.fill{align-items:center;background-color:var(
--spectrum-clearbutton-fill-background-color
);border-radius:100%;display:flex;height:var(--spectrum-clearbutton-fill-size);justify-content:center;width:var(--spectrum-clearbutton-fill-size)}:host{color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){color:var(
--spectrum-clearbutton-fill-uiicon-color
)}:host([active]){color:var(
--spectrum-clearbutton-fill-uiicon-color-down
)}:host(.focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host(:focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host([disabled]){color:var(
--spectrum-clearbutton-fill-uiicon-color-disabled
)}:host(:hover) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-hover
)}:host([active]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-down
)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(:focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host([disabled]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-disabled
)}:host([variant=overBackground]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]),:host([variant=overBackground][disabled]) .fill{background-color:var(
--spectrum-alias-icon-color-overbackground-disabled,hsla(0,0%,100%,.2)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-disabled,var(--spectrum-global-color-static-transparent-white-200)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-disabled,var(--spectrum-global-color-static-transparent-white-500)
)}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){:host>.icon{margin:0}}@media (forced-colors:active){:host{forced-color-adjust:none}}`;const B={s:()=>r`<sp-icon-cross75 slot="icon" class="icon spectrum-UIIcon-Cross75"></sp-icon-cross75>`,m:()=>r`<sp-icon-cross100 slot="icon" class="icon spectrum-UIIcon-Cross100"></sp-icon-cross100>`,l:()=>r`<sp-icon-cross200 slot="icon" class="icon spectrum-UIIcon-Cross200"></sp-icon-cross200>`,xl:()=>r`<sp-icon-cross300 slot="icon" class="icon spectrum-UIIcon-Cross300"></sp-icon-cross300>`};class T extends(s(u)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,I,d]}get buttonContent(){return[B[this.size]()]}render(){return r`<div class="fill">${super.render()}</div>`}}function _(t,e,o){const i=Array.isArray(o)?o:[o],r=t.getAttribute(e),l=r?r.split(/\s+/):[];return i.every((t=>l.indexOf(t)>-1))?()=>{}:(l.push(...i),t.setAttribute(e,l.join(" ")),()=>function(t,e,o){const i=t.getAttribute(e);let r=i?i.split(/\s+/):[];r=r.filter((t=>!o.find((e=>t===e)))),r.length?t.setAttribute(e,r.join(" ")):t.removeAttribute(e)}(t,e,i))}l([t({reflect:!0})],T.prototype,"variant",void 0),customElements.define("sp-clear-button",T);class S{constructor(t,{mode:e}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:t})=>{this.handleHelpText(t),this.handleNegativeHelpText(t)},this.host=t,this.instanceCount=S.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=e}get isInternal(){return"internal"===this.mode}render(t){return r`<div id="${p(this.isInternal?this.id:void 0)}"><slot name="${t?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}" @slotchange="${this.handleSlotchange}"><slot name="help-text"></slot></slot></div>`}addId(){const t=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=_(this.host,"aria-describedby",t),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),this.helpTextElement||(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(t){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const e=t.assignedElements()[0];this.helpTextElement=e,e&&(e.id||(e.id=this.id),this.addId())}handleNegativeHelpText(t){if("negative-help-text"!==t.name)return;t.assignedElements().forEach((t=>t.variant="negative"))}}function L(t,{mode:e}={mode:"internal"}){return class extends t{constructor(){super(...arguments),this.helpTextManager=new S(this,{mode:e})}get helpTextId(){return this.helpTextManager.id}renderHelpText(t){return this.helpTextManager.render(t)}}}S.instanceCount=0;var C=h`:host{--spectrum-textfield-texticon-padding-left:var(
--spectrum-textfield-m-texticon-padding-left
);--spectrum-textfield-quiet-texticon-border-bottom-size:var(
--spectrum-textfield-m-quiet-texticon-border-bottom-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-quiet-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-border-radius:var(
--spectrum-textfield-m-quiet-texticon-border-radius,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-left:var(
--spectrum-textfield-m-quiet-texticon-padding-left,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-right:var(
--spectrum-textfield-m-quiet-texticon-padding-right,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-texticon-border-size:var(
--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-texticon-text-line-height:var(
--spectrum-textfield-m-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-textfield-texticon-text-size:var(
--spectrum-textfield-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-textfield-texticon-placeholder-text-font-style:var(
--spectrum-textfield-m-texticon-placeholder-text-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-textfield-texticon-placeholder-text-font-weight:var(
--spectrum-textfield-m-texticon-placeholder-text-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-textfield-texticon-success-icon-height:var(
--spectrum-textfield-m-texticon-success-icon-height,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-width:var(
--spectrum-textfield-m-texticon-success-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-invalid-icon-height:var(
--spectrum-textfield-m-texticon-invalid-icon-height,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-width:var(
--spectrum-textfield-m-texticon-invalid-icon-width,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-min-width:var(
--spectrum-textfield-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-textfield-texticon-border-radius:var(
--spectrum-textfield-m-texticon-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-textfield-texticon-padding-right:var(
--spectrum-textfield-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-height:var(
--spectrum-textfield-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textarea-text-padding-top:var(
--spectrum-textarea-m-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-textarea-text-padding-bottom:var(
--spectrum-textarea-m-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-textarea-padding-left:var(
--spectrum-textarea-m-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-padding-right:var(
--spectrum-textarea-m-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-height:var(
--spectrum-textarea-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textfield-texticon-padding-top:3px;--spectrum-textfield-texticon-padding-bottom:5px;--spectrum-textfield-texticon-text-font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);--spectrum-textfield-texticon-icon-gap:var(
--spectrum-global-dimension-size-65
);--spectrum-textfield-quiet-texticon-icon-gap:var(
--spectrum-global-dimension-size-75
);--spectrum-textarea-min-height:var(--spectrum-textarea-height);--spectrum-textarea-height-adjusted:auto;--spectrum-textarea-padding-top:var(--spectrum-textarea-text-padding-top);--spectrum-textarea-padding-bottom:var(
--spectrum-textarea-text-padding-bottom
)}#textfield{display:inline-flex;min-width:var(--spectrum-textfield-texticon-min-width);position:relative;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([quiet][multiline]) #textfield .input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:after{border-color:transparent;border-radius:calc(var(--spectrum-textfield-texticon-border-radius) + var(--spectrum-textfield-m-texticon-focus-ring-gap,var(--spectrum-alias-input-focusring-gap)));bottom:0;content:"";left:0;margin:calc(var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
)*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([quiet]) #textfield:after{border-radius:0}.input{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);height:var(--spectrum-textfield-texticon-height);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:0;overflow:visible;padding:var(--spectrum-textfield-texticon-padding-top) var(--spectrum-textfield-texticon-padding-right) var(--spectrum-textfield-texticon-padding-bottom) calc(var(--spectrum-textfield-texticon-padding-left) + 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}.input::placeholder{font-style:var(--spectrum-textfield-texticon-placeholder-text-font-style);font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
);opacity:1;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:hover::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input:disabled{opacity:1;resize:none}.input:disabled::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input::-ms-clear{height:0;width:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}:host([dir=ltr][valid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)))}:host([dir=rtl][valid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)))}:host([dir=ltr][invalid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)))}:host([dir=rtl][invalid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)))}:host([multiline]) .input{height:var(
--spectrum-textarea-height-adjusted
);min-height:var(--spectrum-textarea-min-height);overflow:auto;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px)}:host([dir=ltr][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=rtl][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=ltr][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([dir=rtl][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([quiet]) .input{border-bottom-width:var(
--spectrum-textfield-quiet-texticon-border-bottom-size
);border-left-width:0;border-radius:var(
--spectrum-textfield-quiet-texticon-border-radius
);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}:host([dir=ltr][invalid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=rtl][invalid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=ltr][valid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}:host([dir=rtl][valid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}.icon{pointer-events:all;position:absolute}:host([dir=ltr][quiet]) .icon{padding-right:0}:host([dir=rtl][quiet]) .icon{padding-left:0}:host([dir=ltr][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([dir=rtl][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([invalid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-textfield-texticon-invalid-icon-height)/ 2);height:var(--spectrum-textfield-texticon-invalid-icon-height);width:var(
--spectrum-textfield-texticon-invalid-icon-width
)}:host([dir=ltr][quiet][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([dir=rtl][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([valid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-textfield-texticon-success-icon-height)/ 2);height:var(--spectrum-textfield-texticon-success-icon-height);width:var(
--spectrum-textfield-texticon-success-icon-width
)}:host([dir=ltr][quiet][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr]) .icon-workflow{left:var(
--spectrum-textfield-texticon-padding-left
)}:host([dir=rtl]) .icon-workflow{right:var(
--spectrum-textfield-texticon-padding-left
)}.icon-workflow{display:block;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);position:absolute;top:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225))/ 2);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr][quiet]) .icon-workflow{left:0}:host([dir=rtl][quiet]) .icon-workflow{right:0}:host([dir=ltr][quiet]) .icon-workflow~.input{padding-left:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=rtl][quiet]) .icon-workflow~.input{padding-right:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=ltr]) .icon-workflow+.input{padding-left:calc(var(--spectrum-textfield-texticon-padding-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-texticon-icon-gap))}:host([dir=rtl]) .icon-workflow+.input{padding-right:calc(var(--spectrum-textfield-texticon-padding-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-texticon-icon-gap))}:host([multiline]) .icon-workflow~.input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
);box-shadow:none}#textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#textfield:hover .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#textfield:active .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}#textfield:active .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host([valid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-valid,var(--spectrum-semantic-positive-icon-color)
)}:host([invalid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-hover,var(--spectrum-alias-input-border-color-invalid-hover)
)}:host([disabled]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid-disabled,var(--spectrum-alias-background-color-transparent)
)}:host([disabled]) #textfield .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}.icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([focused]) #textfield:after{box-shadow:0 0 0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([focused][quiet]) #textfield .input{box-shadow:none}:host([focused][quiet]) #textfield:after{border-bottom:2px solid var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);bottom:calc(var(
--spectrum-alias-input-quiet-focusline-gap,
var(--spectrum-global-dimension-static-size-10)
)*-1);box-shadow:none;margin:0}.input{background-color:var(
--spectrum-textfield-m-texticon-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
);color:var(
--spectrum-textfield-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}.input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color,var(--spectrum-global-color-gray-600)
)}.input:focus,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}.input.focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}.input:focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}.input :disabled,:host([disabled]) #textfield .input,:host([disabled]) #textfield:hover .input{-webkit-text-fill-color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);background-color:var(
--spectrum-textfield-m-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
);color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.input :disabled::placeholder,:host([disabled]) #textfield .input::placeholder,:host([disabled]) #textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([quiet]) .input{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid][quiet]) #textfield .input{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host{display:inline-flex;flex-direction:column;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([multiline]){resize:both}#textfield{width:100%}#textfield,textarea{resize:inherit}.input{caret-color:var(--swc-test-caret-color);min-width:var(--spectrum-textfield-texticon-min-width)}:host([grows]) .input{height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0}:host([grows]) #sizer{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:0;overflow:visible;overflow-wrap:break-word;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;white-space:pre-wrap;width:100%;word-break:break-word}:host([grows][quiet]) #sizer{border-bottom-width:var(--spectrum-textfield-quiet-texticon-border-size);border-left-width:0;border-radius:var(--spectrum-textfield-quiet-texticon-border-radius);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}.icon,.icon-workflow{pointer-events:none}:host([multiline]) #textfield{display:inline-grid}:host([multiline]) textarea{transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([multiline][focused]:not([quiet])) textarea,:host([multiline][focused]:not([quiet]):hover) textarea{box-shadow:0 0 0 calc(var(
--spectrum-textfield-m-texticon-focus-ring-border-width,
var(--spectrum-alias-component-focusring-size)
)) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)!important}:host([multiline]:not([quiet])) #textfield:after{box-shadow:none}`;const U=["text","url","tel","email","password"];class j extends(L(m)){constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[C,v]}get type(){var t;return null!==(t=U.find((t=>t===this._type)))&&void 0!==t?t:"text"}set type(t){const e=this._type;this._type=t,this.requestUpdate("type",e)}set value(t){if(t===this.value)return;const e=this._value;this._value=t,this.requestUpdate("value",e)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(t,e,o="none"){this.inputElement.setSelectionRange(t,e,o)}select(){this.inputElement.select()}handleInput(){if(this.allowedKeys&&this.inputElement.value){if(!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const t=this.inputElement.selectionStart-1;return this.inputElement.value=this.value.toString(),void this.inputElement.setSelectionRange(t,t)}}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!0}onBlur(){this.focused=!1}renderStateIcons(){return this.invalid?r`<sp-icon-alert id="invalid" class="icon"></sp-icon-alert>`:this.valid?r`<sp-icon-checkmark100 id="valid" class="icon spectrum-UIIcon-Checkmark100"></sp-icon-checkmark100>`:i}get displayValue(){return this.value.toString()}get renderMultiline(){return r`${this.grows&&!this.quiet?r`<div id="sizer">${this.value}​</div>`:i} <textarea aria-describedby="${this.helpTextId}" aria-label="${this.label||this.placeholder}" aria-invalid="${p(this.invalid||void 0)}" class="input" maxlength="${p(this.maxlength>-1?this.maxlength:void 0)}" minlength="${p(this.minlength>-1?this.minlength:void 0)}" pattern="${p(this.pattern)}" placeholder="${this.placeholder}" .value="${this.displayValue}" @change="${this.handleChange}" @input="${this.handleInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${p(this.autocomplete)}"></textarea>`}get renderInput(){return r`<input type="${this.type}" aria-describedby="${this.helpTextId}" aria-label="${this.label||this.placeholder}" aria-invalid="${p(this.invalid||void 0)}" class="input" maxlength="${p(this.maxlength>-1?this.maxlength:void 0)}" minlength="${p(this.minlength>-1?this.minlength:void 0)}" pattern="${p(this.pattern)}" placeholder="${this.placeholder}" .value="${A(this.displayValue)}" @change="${this.handleChange}" @input="${this.handleInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${p(this.autocomplete)}">`}renderField(){return r`${this.renderStateIcons()} ${this.multiline?this.renderMultiline:this.renderInput}`}render(){return r`<div id="textfield">${this.renderField()}</div>${this.renderHelpText(this.invalid)}`}updated(t){(t.has("value")||t.has("required")&&this.required)&&this.checkValidity()}checkValidity(){let t=this.inputElement.checkValidity();if(this.required||this.value&&this.pattern){if((this.disabled||this.multiline)&&this.pattern){t=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())}void 0!==this.minlength&&(t=t&&this.value.toString().length>this.minlength),this.valid=t,this.invalid=!t}return t}}l([t({attribute:"allowed-keys"})],j.prototype,"allowedKeys",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"focused",void 0),l([f(".input")],j.prototype,"inputElement",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"invalid",void 0),l([t()],j.prototype,"label",void 0),l([t()],j.prototype,"placeholder",void 0),l([t({attribute:"type",reflect:!0})],j.prototype,"_type",void 0),l([b()],j.prototype,"type",null),l([t()],j.prototype,"pattern",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"grows",void 0),l([t({type:Number})],j.prototype,"maxlength",void 0),l([t({type:Number})],j.prototype,"minlength",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"multiline",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"readonly",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"valid",void 0),l([t({type:String})],j.prototype,"value",null),l([t({type:Boolean,reflect:!0})],j.prototype,"quiet",void 0),l([t({type:Boolean,reflect:!0})],j.prototype,"required",void 0),l([t({type:String,reflect:!0})],j.prototype,"autocomplete",void 0);class R extends j{constructor(){super(...arguments),this._value=""}set value(t){if(t===this.value)return;const e=this._value;this._value=t,this.requestUpdate("value",e)}get value(){return this._value}}l([t({type:String})],R.prototype,"value",null);var H=h`:host{--spectrum-search-quiet-button-offset:calc(var(
--spectrum-actionbutton-m-texticon-min-width,
var(--spectrum-global-dimension-size-400)
)/2 - var(--spectrum-alias-ui-icon-cross-size-100)/2)}#textfield{display:inline-block;position:relative}:host([dir=ltr]) #button{right:0}:host([dir=rtl]) #button{left:0}#button{position:absolute;top:0}#input{-webkit-appearance:none;border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
);outline-offset:-2px}#input::-webkit-search-cancel-button,#input::-webkit-search-decoration{-webkit-appearance:none}#textfield:after{border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([quiet])) #textfield .icon{left:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=rtl]:not([quiet])) #textfield .icon{right:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=ltr]:not([quiet])) #textfield #input{padding-left:calc(var(--spectrum-alias-search-padding-left-m) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)) - var(--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)))}:host([dir=rtl]:not([quiet])) #textfield #input{padding-right:calc(var(--spectrum-alias-search-padding-left-m) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)) - var(--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)))}:host([quiet]) #button{transform:translateX(var(--spectrum-search-quiet-button-offset))}:host([quiet]) #input{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}:host([quiet]) #textfield:after{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}.icon{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#input:hover~.icon{color:var(
--spectrum-search-m-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#input:active~.icon{color:var(
--spectrum-search-m-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}#input.focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}#input:focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}#input:disabled~.icon{color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}input::-webkit-search-cancel-button{display:none}`;const F=t=>t.stopPropagation();class M extends R{constructor(){super(...arguments),this.action="",this.label="Search",this.placeholder="Search"}static get styles(){return[...super.styles,H]}handleSubmit(t){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||t.preventDefault()}handleKeydown(t){const{code:e}=t;this.value&&"Escape"===e&&this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}renderField(){return r`<form action="${this.action}" id="form" method="${p(this.method)}" @submit="${this.handleSubmit}" @reset="${this.reset}" @keydown="${this.handleKeydown}"><sp-icon-magnify class="icon magnifier icon-workflow"></sp-icon-magnify>${super.renderField()} ${this.value?r`<sp-clear-button id="button" label="Reset" tabindex="-1" type="reset" @keydown="${F}"></sp-clear-button>`:r``}</form>`}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("type","search")}updated(t){super.updated(t),this.multiline=!1}}l([t()],M.prototype,"action",void 0),l([t()],M.prototype,"label",void 0),l([t()],M.prototype,"method",void 0),l([t()],M.prototype,"placeholder",void 0),l([f("#form")],M.prototype,"form",void 0),customElements.define("sp-search",M);export{L as M,j as T,$ as a,_ as b,y as c,R as d,E as m,g as r,z as s,b as t,k as u};
//# sourceMappingURL=dc584e90.js.map
