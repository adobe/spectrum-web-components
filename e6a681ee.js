import{T as t}from"./47debb83.js";import{r as o}from"./e50c5e8d.js";import{L as e,a as r,t as i,i as a,S as c}from"./5a184a55.js";import{r as n,f as s}from"./79272576.js";import"./c1652ba1.js";import"./77d4c924.js";import{b as l,$ as u,e as d,S as m,w as p,x as b}from"./03cd2f8f.js";import{e as v,i as h,t as g,u as f,S as k,I as y,B as x}from"./d0009bd8.js";import"./4878d6c7.js";import"./fa806c4a.js";customElements.define("sp-theme",t);const w=v(class extends h{constructor(t){var o;if(super(t),t.type!==g.ATTRIBUTE||"class"!==t.name||(null===(o=t.strings)||void 0===o?void 0:o.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((o=>t[o])).join(" ")+" "}update(t,[o]){var e,r;if(void 0===this.et){this.et=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in o)o[t]&&!(null===(e=this.st)||void 0===e?void 0:e.has(t))&&this.et.add(t);return this.render(o)}const i=t.element.classList;this.et.forEach((t=>{t in o||(i.remove(t),this.et.delete(t))}));for(const t in o){const e=!!o[t];e===this.et.has(t)||(null===(r=this.st)||void 0===r?void 0:r.has(t))||(e?(i.add(t),this.et.add(t)):(i.remove(t),this.et.delete(t)))}return l}});var z=o`
#button{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}#button:focus{outline:none}#button::-moz-focus-inner{border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}#button:disabled{cursor:default}:host([dir=ltr]) #button{padding-left:var(
--spectrum-picker-textonly-padding-left-adjusted
);padding-right:var(--spectrum-picker-textonly-padding-right-adjusted)}:host([dir=rtl]) #button{padding-left:var(--spectrum-picker-textonly-padding-right-adjusted);padding-right:var(
--spectrum-picker-textonly-padding-left-adjusted
)}#button{align-items:center;border-radius:var(--spectrum-picker-texticon-border-radius);border-style:solid;border-width:var(--spectrum-picker-texticon-border-size);display:flex;height:var(--spectrum-picker-texticon-height);justify-content:center;margin:0;min-width:var(--spectrum-picker-texticon-min-width);padding-bottom:0;padding-top:0;transition:background-color var(--spectrum-global-animation-duration-100,.13s),box-shadow var(--spectrum-global-animation-duration-100,.13s),border-color var(--spectrum-global-animation-duration-100,.13s);width:var(--spectrum-picker-texticon-width)}#button:disabled,:host([disabled]) #button{border-width:var(
--spectrum-picker-texticon-disabled-border-size
);cursor:default}:host([dir=ltr]) #button .icon{margin-right:var(
--spectrum-picker-texticon-icon-gap
)}:host([dir=rtl]) #button .icon{margin-left:var(
--spectrum-picker-texticon-icon-gap
)}.icon{flex-shrink:0}:host([dir=ltr]) #button #label+.icon{margin-left:calc((var(--spectrum-picker-textonly-padding-left-adjusted) - var(--spectrum-picker-padding-left-adjusted))*-1)}:host([dir=rtl]) #button #label+.icon{margin-right:calc((var(--spectrum-picker-textonly-padding-left-adjusted) - var(--spectrum-picker-padding-left-adjusted))*-1)}:host([size=s]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-s-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-s-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-s-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-s-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-s-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-s-texticon-popover-max-width,var(--spectrum-global-dimension-size-1800)
);--spectrum-picker-texticon-padding-left:var(
--spectrum-picker-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-s-texticon-height,var(--spectrum-global-dimension-size-300)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-s-texticon-min-width,var(--spectrum-global-dimension-size-450)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-s-texticon-width,var(--spectrum-global-dimension-size-2000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-s-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-border-size:var(
--spectrum-picker-s-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-textonly-border-radius:var(
--spectrum-picker-s-textonly-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([size=m]){--spectrum-picker-texticon-padding-left:var(
--spectrum-picker-m-texticon-padding-left
);--spectrum-picker-texticon-border-size:var(
--spectrum-picker-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-m-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-m-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-m-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-m-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-m-texticon-popover-max-width,var(--spectrum-global-dimension-size-2400)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-m-texticon-width,var(--spectrum-global-dimension-size-2400)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-border-size:var(
--spectrum-picker-m-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-textonly-border-radius:var(
--spectrum-picker-m-textonly-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([size=l]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-l-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-l-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-l-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-l-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-l-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-l-texticon-popover-max-width,var(--spectrum-global-dimension-size-3000)
);--spectrum-picker-texticon-padding-left:var(
--spectrum-picker-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-l-texticon-height,var(--spectrum-global-dimension-size-500)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-l-texticon-min-width,var(--spectrum-global-dimension-size-750)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-l-texticon-width,var(--spectrum-global-dimension-size-2500)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-l-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-border-size:var(
--spectrum-picker-l-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-textonly-border-radius:var(
--spectrum-picker-l-textonly-border-radius,var(--spectrum-alias-component-border-radius)
)}:host([size=xl]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-xl-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-xl-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-xl-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-xl-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-xl-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-xl-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-xl-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-xl-texticon-popover-max-width,var(--spectrum-global-dimension-size-3600)
);--spectrum-picker-texticon-padding-left:var(
--spectrum-picker-xl-texticon-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-xl-texticon-height,var(--spectrum-global-dimension-size-600)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-xl-texticon-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-xl-texticon-width,var(--spectrum-global-dimension-size-3000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-xl-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-border-size:var(
--spectrum-picker-xl-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-textonly-border-radius:var(
--spectrum-picker-xl-textonly-border-radius,var(--spectrum-alias-component-border-radius)
)}:host{--spectrum-picker-texticon-min-width:var(
--spectrum-global-dimension-size-400
);--spectrum-picker-texticon-disabled-border-size:0;--spectrum-picker-texticon-popover-max-width:var(
--spectrum-global-dimension-size-3000
);--spectrum-picker-texticon-width:var(
--spectrum-global-dimension-size-2400
);--spectrum-picker-texticon-border-size-increase-focus:1px;--spectrum-picker-padding-left-adjusted:calc(var(--spectrum-picker-texticon-padding-left) - var(--spectrum-picker-texticon-border-size));--spectrum-picker-textonly-padding-left-adjusted:calc(var(--spectrum-picker-textonly-padding-left) - var(--spectrum-picker-textonly-border-size));--spectrum-picker-textonly-padding-right-adjusted:calc(var(--spectrum-picker-textonly-padding-right) - var(--spectrum-picker-textonly-border-size));--spectrum-picker-focus-ring-border-radius-adjusted:calc(var(--spectrum-picker-textonly-border-radius) + var(--spectrum-picker-focus-ring-gap))}:host{--spectrum-picker-focus-ring-gap:var(
--spectrum-alias-component-focusring-gap,var(--spectrum-global-dimension-static-size-0)
);--spectrum-picker-focus-ring-size:var(
--spectrum-alias-component-focusring-size,var(--spectrum-global-dimension-static-size-10)
);--spectrum-picker-focus-ring-color:var(
--spectrum-picker-m-textonly-focusring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}#button{transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#button:after{border-radius:var(--spectrum-picker-focus-ring-border-radius-adjusted);bottom:0;content:"";left:0;margin:calc((var(--spectrum-picker-focus-ring-gap) + var(--spectrum-picker-textonly-border-size))*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#button.focus-visible{box-shadow:none}#button:focus-visible{box-shadow:none}#button.focus-visible:after{box-shadow:0 0 0 var(--spectrum-picker-focus-ring-size) var(--spectrum-picker-focus-ring-color)}#button:focus-visible:after{box-shadow:0 0 0 var(--spectrum-picker-focus-ring-size) var(--spectrum-picker-focus-ring-color)}:host([quiet]){--spectrum-picker-texticon-border-size:0;--spectrum-picker-texticon-border-radius:0;--spectrum-picker-textonly-padding-left:0;--spectrum-picker-textonly-padding-right:0;--spectrum-picker-quiet-background-color-key-focus:transparent;--spectrum-picker-quiet-border-color-key-focus:var(
--spectrum-global-color-blue-400
)}:host([quiet]) #button{min-width:0;width:auto}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{box-shadow:none}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{box-shadow:none}:host([dir=ltr]) #label{text-align:left}:host([dir=rtl]) #label{text-align:right}#label{flex:1 1 auto;font-size:var(--spectrum-picker-texticon-text-size);height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);line-height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#label.placeholder{font-style:var(--spectrum-picker-texticon-placeholder-font-style);font-weight:var(
--spectrum-picker-texticon-placeholder-font-weight
);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.picker{display:inline-block;flex-shrink:0;position:relative;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-out;vertical-align:top}:host([dir=ltr]) .validation-icon{margin-left:var(
--spectrum-picker-texticon-error-icon-margin-left
)}:host([dir=rtl]) .validation-icon{margin-right:var(
--spectrum-picker-texticon-error-icon-margin-left
)}:host([dir=ltr]) #label~.picker{margin-left:var(
--spectrum-picker-texticon-ui-icon-gap
)}:host([dir=rtl]) #label~.picker{margin-right:var(
--spectrum-picker-texticon-ui-icon-gap
)}#popover{max-width:var(
--spectrum-picker-texticon-popover-max-width
)}:host([dir=ltr]) .spectrum-Picker-popover--quiet{margin-left:calc((var(
--spectrum-picker-m-quiet-texticon-popover-offset-x,
var(--spectrum-global-dimension-size-150)
) + var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))*-1)}:host([dir=rtl]) .spectrum-Picker-popover--quiet{margin-right:calc((var(
--spectrum-picker-m-quiet-texticon-popover-offset-x,
var(--spectrum-global-dimension-size-150)
) + var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))*-1)}#button{background-color:var(
--spectrum-picker-m-texticon-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-picker-m-texticon-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-picker-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}#button:hover{background-color:var(
--spectrum-picker-m-texticon-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-picker-m-texticon-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);color:var(
--spectrum-picker-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}#button:hover .picker{color:var(
--spectrum-picker-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#button:active,:host([open]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-picker-m-texticon-border-color-down,var(--spectrum-alias-component-border-color-down)
)}#button:active.placeholder #label,:host([open]) #button.placeholder #label{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-down,var(--spectrum-alias-placeholder-text-color-down)
)}#button.focus-visible,:host([focused]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(--spectrum-picker-quiet-border-color-key-focus);color:var(
--spectrum-picker-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#button:focus-visible,:host([focused]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(--spectrum-picker-quiet-border-color-key-focus);color:var(
--spectrum-picker-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#button.focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}#button:focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([invalid]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error,var(--spectrum-semantic-negative-color-default)
)}:host([invalid]) #button .validation-icon{color:var(
--spectrum-picker-m-texticon-validation-icon-color-error,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #button:hover{border-color:var(
--spectrum-picker-m-texticon-border-color-error-hover,var(--spectrum-semantic-negative-color-hover)
)}:host([invalid]) #button:active,:host([invalid][open]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-down,var(--spectrum-semantic-negative-color-down)
)}:host([invalid]) #button.focus-visible,:host([invalid][focused]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([invalid]) #button:focus-visible,:host([invalid][focused]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#button:disabled,:host([disabled]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);color:var(
--spectrum-picker-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}#button:disabled .icon,#button:disabled .picker,#button:disabled .validation-icon,:host([disabled]) #button .icon,:host([disabled]) #button .picker,:host([disabled]) #button .validation-icon{color:var(
--spectrum-picker-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}#button:disabled #label.placeholder,:host([disabled]) #button #label.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.picker{color:var(
--spectrum-picker-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#label.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color,var(--spectrum-alias-placeholder-text-color)
)}#label.placeholder:hover{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#label.placeholder:active{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-mouse-focus,var(--spectrum-alias-placeholder-text-color-down)
)}:host([quiet]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color,var(--spectrum-alias-component-background-color-quiet-default)
);border-color:var(
--spectrum-picker-m-quiet-texticon-border-color,var(--spectrum-alias-component-border-color-quiet-default)
);color:var(
--spectrum-picker-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([quiet]) #button:hover{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-hover,var(--spectrum-alias-component-background-color-quiet-hover)
);color:var(
--spectrum-picker-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{background-color:var(
--spectrum-picker-quiet-background-color-key-focus
);box-shadow:0 2px 0 0 var(--spectrum-picker-quiet-border-color-key-focus)}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{background-color:var(
--spectrum-picker-quiet-background-color-key-focus
);box-shadow:0 2px 0 0 var(--spectrum-picker-quiet-border-color-key-focus)}:host([quiet]) #button.focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button:focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button.focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button:focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button.focus-visible:after,:host([quiet][focused]) #button:after{box-shadow:none}:host([quiet]) #button:focus-visible:after,:host([quiet][focused]) #button:after{box-shadow:none}:host([quiet]) #button:active,:host([quiet][open]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-down,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-picker-m-quiet-texticon-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
)}:host([quiet]) #button:active.focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button.focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-quiet-background-color-key-focus
);box-shadow:0 2px 0 0 var(--spectrum-picker-quiet-border-color-key-focus)}:host([quiet]) #button:active:focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button:focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-quiet-background-color-key-focus
);box-shadow:0 2px 0 0 var(--spectrum-picker-quiet-border-color-key-focus)}:host([quiet][invalid]) #button.focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet][invalid]) #button:focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet]) #button:disabled,:host([quiet][disabled]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);color:var(
--spectrum-picker-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}@media (forced-colors:active){#button{--spectrum-picker-focus-ring-color:Highlight;--spectrum-picker-m-quiet-texticon-border-color-down:ButtonText;--spectrum-picker-m-quiet-texticon-border-color:ButtonText;--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus:GrayText;--spectrum-picker-m-texticon-border-color-error-key-focus:Highlight;--spectrum-picker-m-texticon-placeholder-text-color-disabled:GrayText;--spectrum-picker-m-texticon-placeholder-text-color-down:GrayText;--spectrum-picker-m-texticon-placeholder-text-color-hover:GrayText;--spectrum-picker-m-texticon-placeholder-text-color-key-focus:GrayText;--spectrum-picker-m-texticon-placeholder-text-color-mouse-focus:GrayText;--spectrum-picker-m-texticon-placeholder-text-color:GrayText;--spectrum-picker-m-texticon-text-color-disabled:GrayText;--spectrum-picker-m-texticon-text-color-key-focus:ButtonText;--spectrum-picker-m-texticon-text-color:ButtonText;--spectrum-picker-m-textonly-focusring-border-color-key-focus:Highlight;--spectrum-picker-quiet-border-color-key-focus:Highlight}#button.focus-visible{outline:2px solid Highlight}#button:focus-visible{outline:2px solid Highlight}#button:disabled,:host([disabled]) #button{border-color:GrayText;border-width:var(--spectrum-picker-texticon-border-size)}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{box-shadow:0 1px 0 0 var(--spectrum-picker-focus-ring-color);forced-color-adjust:none;outline:0}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{box-shadow:0 1px 0 0 var(--spectrum-picker-focus-ring-color);forced-color-adjust:none;outline:0}}:host{display:inline-flex;max-width:100%;min-width:var(--spectrum-picker-min-width);vertical-align:top;width:var(--spectrum-picker-width)}:host([quiet]){min-width:0;width:auto}:host([size]){--spectrum-picker-width:var(--spectrum-global-dimension-size-2400)}#button{max-width:100%;min-width:100%;width:100%}#icon:not([hidden]){display:inline-flex}:host([readonly]) #button{-webkit-user-select:inherit;user-select:inherit}sp-popover{display:none}.picker,.validation-icon{flex-shrink:0}:host([focused]:not([quiet])) #button #label.placeholder{color:var(
--spectrum-picker-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([focused]:not([quiet])) #button .picker{color:var(
--spectrum-picker-icon-color-key-focus,var(--spectrum-alias-icon-color-focus)
)}.visually-hidden{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([dir=ltr]) #label.visually-hidden+.picker{margin-left:auto}:host([dir=rtl]) #label.visually-hidden+.picker{margin-right:auto}
`;var I=o`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronDown75{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500,.spectrum-UIIcon-ChevronUp75{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(
--spectrum-alias-ui-icon-chevron-size-75
)}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronRight100,.spectrum-UIIcon-ChevronUp100{height:var(--spectrum-alias-ui-icon-chevron-size-100);width:var(
--spectrum-alias-ui-icon-chevron-size-100
)}.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronRight200,.spectrum-UIIcon-ChevronUp200{height:var(--spectrum-alias-ui-icon-chevron-size-200);width:var(
--spectrum-alias-ui-icon-chevron-size-200
)}.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronRight300,.spectrum-UIIcon-ChevronUp300{height:var(--spectrum-alias-ui-icon-chevron-size-300);width:var(
--spectrum-alias-ui-icon-chevron-size-300
)}.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronRight400,.spectrum-UIIcon-ChevronUp400{height:var(--spectrum-alias-ui-icon-chevron-size-400);width:var(
--spectrum-alias-ui-icon-chevron-size-400
)}.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronRight500,.spectrum-UIIcon-ChevronUp500{height:var(--spectrum-alias-ui-icon-chevron-size-500);width:var(
--spectrum-alias-ui-icon-chevron-size-500
)}
`;const C=async(t,o,e,r)=>{const{Overlay:i}=await import("./c2ecf00f.js");return i.open(t,o,e,r)};class q extends Event{constructor({root:t}){super("sp-overlay-close",{bubbles:!0,composed:!0}),this.root=t}}var T=o`
.checkmark{align-self:flex-start;display:none;opacity:1;transform:scale(1)}:host([dir=ltr]) .checkmark{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .checkmark{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.checkmark{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]) .chevron{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .chevron{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.chevron{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]){border-left:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host([dir=rtl]){border-right:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--spectrum-listitem-texticon-text-size);font-style:normal;font-weight:var(--spectrum-listitem-texticon-text-font-weight);margin:0;min-height:var(--spectrum-listitem-texticon-height);padding:var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-right) var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-left);position:relative;text-decoration:none}:host(:focus){outline:none}:host([dir=ltr][selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))}:host([dir=rtl][selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))}:host([selected]) .checkmark{display:block}.icon,::slotted([slot=icon]){align-self:flex-start;flex-shrink:0}:host([dir=ltr]) .icon+#label,:host([dir=ltr]) slot[name=icon]+#label{margin-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .icon+#label,:host([dir=rtl]) slot[name=icon]+#label{margin-right:var(
--spectrum-listitem-texticon-icon-gap
)}.icon+#label,slot[name=icon]+#label{width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap) - var(--spectrum-listitem-textthumbnail-padding-left) - var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
))}:host([no-wrap]) #label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) .checkmark,:host([dir=ltr]) .chevron{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .checkmark,:host([dir=rtl]) .chevron{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .chevron{transform:matrix(-1,0,0,1,0,0)}:host{background-color:var(
--spectrum-listitem-m-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-listitem-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([dir=ltr].focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=ltr]:focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl].focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl]:focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:focus-visible),:host([focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(.is-highlighted),:host(.is-open),:host(:focus),:host(:hover){background-color:var(
--spectrum-listitem-m-texticon-background-color-hover,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([selected]){color:var(
--spectrum-listitem-m-texticon-text-color-selected,var(--spectrum-alias-component-text-color-default)
)}:host([selected]) .checkmark{color:var(
--spectrum-listitem-m-texticon-ui-icon-color-selected,var(--spectrum-alias-icon-color-selected)
)}:host(:active),:host([active]){background-color:var(
--spectrum-listitem-m-texticon-background-color-down,var(--spectrum-alias-background-color-hover-overlay)
)}:host([disabled]){background-color:var(
--spectrum-listitem-m-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);background-image:none;color:var(
--spectrum-listitem-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);cursor:default}@media (forced-colors:active){:host{--spectrum-listheading-text-color:ButtonText;--spectrum-listitem-m-texticon-background-color:ButtonFace;--spectrum-listitem-m-texticon-background-color-disabled:ButtonFace;--spectrum-listitem-m-texticon-background-color-down:ButtonFace;--spectrum-listitem-m-texticon-background-color-hover:Highlight;--spectrum-listitem-m-texticon-background-color-key-focus:Highlight;--spectrum-listitem-m-texticon-focus-indicator-color:Highlight;--spectrum-listitem-m-texticon-text-color:ButtonText;--spectrum-listitem-m-texticon-text-color-disabled:GrayText;--spectrum-listitem-m-texticon-text-color-hover:HighlightText;--spectrum-listitem-m-texticon-text-color-key-focus:HighlightText;--spectrum-listitem-m-texticon-text-color-selected:ButtonText;--spectrum-listitem-m-texticon-ui-icon-color-selected:Highlight;forced-color-adjust:none}:host(:not([disabled]).focus-visible),:host(:not([disabled]).is-highlighted),:host(:not([disabled]).is-open),:host(:not([disabled]):focus),:host(:not([disabled]):hover),:host(:not([disabled])[focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:not([disabled]).is-highlighted),:host(:not([disabled]).is-open),:host(:not([disabled]):focus),:host(:not([disabled]):focus-visible),:host(:not([disabled]):hover),:host(:not([disabled])[focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:not([disabled]).focus-visible[selected]) .checkmark,:host(:not([disabled]).is-highlighted[selected]) .checkmark,:host(:not([disabled]).is-open[selected]) .checkmark,:host(:not([disabled]):focus[selected]) .checkmark,:host(:not([disabled]):hover[selected]) .checkmark,:host(:not([disabled])[focused][selected]) .checkmark{color:HighlightText}:host(:not([disabled]).is-highlighted[selected]) .checkmark,:host(:not([disabled]).is-open[selected]) .checkmark,:host(:not([disabled]):focus-visible[selected]) .checkmark,:host(:not([disabled]):focus[selected]) .checkmark,:host(:not([disabled]):hover[selected]) .checkmark,:host(:not([disabled])[focused][selected]) .checkmark{color:HighlightText}}#label{flex:1 1 auto;-webkit-hyphens:auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}:host([disabled]){pointer-events:none}#button{inset:0;position:absolute}::slotted([slot=value]){align-self:start}:host([dir=ltr]) ::slotted([slot=value]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=value]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}:host([dir=ltr]) ::slotted([slot=icon]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=icon]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) slot[name=icon]+#label{margin-right:0}:host([dir=ltr]) slot[name=icon]+#label{margin-left:0}:host([dir=rtl]) .chevron{padding-left:var(--spectrum-listitem-texticon-icon-gap);padding-right:0}
`,U=Object.defineProperty,S=Object.getOwnPropertyDescriptor,E=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?S(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&U(o,e,a),a};class A extends Event{constructor(){super("sp-menu-item-removed",{bubbles:!0,composed:!0}),this.focused=!1}get item(){return this._item}reset(t){this._item=t}}class B extends Event{constructor(){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0})}set focusRoot(t){this.item.menuData.focusRoot=this.item.menuData.focusRoot||t}set selectionRoot(t){this.item.menuData.selectionRoot=this.item.menuData.selectionRoot||t}get item(){return this._item}set currentAncestorWithSelects(t){this._currentAncestorWithSelects=t}get currentAncestorWithSelects(){return this._currentAncestorWithSelects}reset(t){this._item=t,this._currentAncestorWithSelects=void 0,t.menuData={focusRoot:void 0,selectionRoot:void 0}}}const F=new B,P=new A,j=class extends(e(r)){constructor(){super(),this.isInSubmenu=!1,this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.hasSubmenu=!1,this.noWrap=!1,this.open=!1,this.handleSubmenuChange=()=>{var t;null==(t=this.menuData.selectionRoot)||t.selectOrToggleItem(this)},this.handleSubmenuPointerenter=()=>{this.leaveTimeout&&(clearTimeout(this.leaveTimeout),delete this.leaveTimeout)},this.menuData={focusRoot:void 0,selectionRoot:void 0},this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0}),new i(this,{config:{characterData:!0,childList:!0,subtree:!0},callback:()=>{this.breakItemChildrenCache()}})}static get styles(){return[T,f,I]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return this.itemChildren.content.reduce(((t,o)=>t+(o.textContent||"").trim()),"")}get focusElement(){return this}get itemChildren(){if(this._itemChildren)return this._itemChildren;const t=this.shadowRoot.querySelector('slot[name="icon"]'),o=t?t.assignedElements().map((t=>{const o=t.cloneNode(!0);return o.removeAttribute("slot"),o.classList.toggle("icon"),o})):[],e=this.shadowRoot.querySelector("slot:not([name])"),r=e?e.assignedNodes().map((t=>t.cloneNode(!0))):[];return this._itemChildren={icon:o,content:r},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;return this.anchorElement&&(this.anchorElement.click(),t=!0),t}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}render(){return u`
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.selected?u`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 icon checkmark"
                      ></sp-icon-checkmark100>
                  `:u``}
            ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):u``}
            <slot
                hidden
                name="submenu"
                @slotchange=${this.manageSubmenu}
            ></slot>
            ${this.hasSubmenu?u`
                      <sp-icon-chevron100
                          class="spectrum-UIIcon-ChevronRight100 chevron icon"
                      ></sp-icon-chevron100>
                  `:u``}
        `}manageSubmenu(t){const o=t.target.assignedElements({flatten:!0});this.hasSubmenu=this.open||!!o.length}handleRemoveActive(t){"pointerleave"===t.type&&this.hasSubmenu||this.hasSubmenu||this.open||(this.active=!1)}handlePointerdown(){this.active=!0}firstUpdated(t){super.firstUpdated(t),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.hasAttribute("id")||(this.id="sp-menu-item-"+j.instanceCount++),this.addEventListener("pointerenter",this.closeOverlaysForRoot)}closeOverlaysForRoot(){if(this.open)return;const t=new q({root:this.menuData.focusRoot});this.dispatchEvent(t)}handleSubmenuClick(){this.openOverlay()}handlePointerenter(){if(this.leaveTimeout)return clearTimeout(this.leaveTimeout),void delete this.leaveTimeout;this.openOverlay()}handlePointerleave(){this.hasSubmenu&&this.open&&(this.leaveTimeout=setTimeout((()=>{delete this.leaveTimeout,this.closeOverlay&&this.closeOverlay()}),100))}async openOverlay(){if(!this.hasSubmenu||this.open||this.disabled)return;this.open=!0,this.active=!0;const t=this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements()[0];t.addEventListener("pointerenter",this.handleSubmenuPointerenter),t.addEventListener("change",this.handleSubmenuChange);const o=document.createElement("sp-popover"),e=n([t],o,{position:"beforeend",prepareCallback:t=>{const o=t.slot;return t.tabIndex=0,t.removeAttribute("slot"),t.isSubmenu=!0,t=>{t.tabIndex=-1,t.slot=o,t.isSubmenu=!1}}}),r=C(this,"click",o,{placement:this.isLTR?"right-start":"left-start",receivesFocus:"auto",root:this.menuData.focusRoot}),i=async()=>{delete this.closeOverlay,(await r)()};this.closeOverlay=i;this.addEventListener("sp-closed",(t=>{t.stopPropagation(),delete this.closeOverlay,e(),this.open=!1,this.active=!1}),{once:!0}),o.addEventListener("change",i)}updateAriaSelected(){const t=this.getAttribute("role");"option"===t?this.setAttribute("aria-selected",this.selected?"true":"false"):("menuitemcheckbox"===t||"menuitemradio"===t)&&this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(t){this.setAttribute("role",t),this.updateAriaSelected()}updated(t){super.updated(t),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive)):(this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),t.has("selected")&&this.updateAriaSelected(),t.has("hasSubmenu")&&(this.hasSubmenu?(this.addEventListener("click",this.handleSubmenuClick),this.addEventListener("pointerenter",this.handlePointerenter),this.addEventListener("pointerleave",this.handlePointerleave)):this.closeOverlay||(this.removeEventListener("click",this.handleSubmenuClick),this.removeEventListener("pointerenter",this.handlePointerenter),this.removeEventListener("pointerleave",this.handlePointerleave)))}connectedCallback(){super.connectedCallback(),this.isInSubmenu=!!this.closest('[slot="submenu"]'),!this.isInSubmenu&&(F.reset(this),this.dispatchEvent(F),this._parentElement=this.parentElement)}disconnectedCallback(){var t;P.reset(this),this.isInSubmenu||null==(t=this._parentElement)||t.dispatchEvent(P),this.isInSubmenu=!1,super.disconnectedCallback()}async triggerUpdate(){this.isInSubmenu||(await new Promise((t=>requestAnimationFrame(t))),F.reset(this),this.dispatchEvent(F))}};let R=j;R.instanceCount=0,E([d({type:Boolean,reflect:!0})],R.prototype,"active",2),E([d({type:Boolean,reflect:!0})],R.prototype,"focused",2),E([d({type:Boolean,reflect:!0})],R.prototype,"selected",2),E([d({type:String})],R.prototype,"value",1),E([d({type:Boolean})],R.prototype,"hasSubmenu",2),E([d({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],R.prototype,"noWrap",2),E([a(".anchor")],R.prototype,"anchorElement",2),E([d({type:Boolean})],R.prototype,"open",2);var L=o`
:host{--spectrum-menu-margin-x:var(
--spectrum-global-dimension-size-40
);--spectrum-listitem-texticon-heading-text-size:var(
--spectrum-global-dimension-font-size-50
);--spectrum-listitem-texticon-heading-text-font-weight:400;--spectrum-listitem-texticon-heading-text-transform:uppercase;--spectrum-listitem-texticon-heading-letter-spacing:0.06em;--spectrum-listitem-texticon-heading-margin:var(
--spectrum-global-dimension-size-75
) 0 0 0;--spectrum-listitem-texticon-heading-padding:0 var(--spectrum-global-dimension-size-450) 0 var(--spectrum-global-dimension-size-150);--spectrum-listitem-texticon-padding-y:var(
--spectrum-global-dimension-size-85
);--spectrum-listitem-texticon-selectable-padding-right:calc(var(--spectrum-listitem-texticon-ui-icon-width) + var(--spectrum-listitem-texticon-ui-icon-gap) + var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
));--spectrum-listitem-texticon-label-line-height:1.3;--spectrum-listitem-texticon-heading-line-height:var(
--spectrum-alias-body-text-line-height,var(--spectrum-global-font-line-height-medium)
)}:host{--spectrum-listitem-texticon-padding-left:var(
--spectrum-listitem-m-texticon-padding-left
);--spectrum-listitem-textthumbnail-padding-left:var(
--spectrum-listitem-m-textthumbnail-padding-left
);--spectrum-listitem-texticon-text-size:var(
--spectrum-listitem-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-listitem-texticon-text-font-weight:var(
--spectrum-listitem-m-texticon-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-listitem-texticon-icon-gap:var(
--spectrum-listitem-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-listitem-texticon-divider-padding:var(
--spectrum-listitem-m-texticon-divider-padding,var(--spectrum-global-dimension-static-size-40)
);--spectrum-listitem-texticon-ui-icon-margin-top:var(
--spectrum-listitem-m-texticon-ui-icon-margin-top,var(--spectrum-global-dimension-size-125)
);--spectrum-listitem-texticon-ui-icon-width:var(
--spectrum-listitem-m-texticon-ui-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-listitem-texticon-ui-icon-gap:var(
--spectrum-listitem-m-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-listitem-texticon-padding-right:var(
--spectrum-listitem-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-listitem-texticon-focus-indicator-size:var(
--spectrum-listitem-m-texticon-focus-indicator-size,var(--spectrum-alias-border-size-thick)
);--spectrum-listitem-texticon-height:var(
--spectrum-listitem-m-texticon-height,var(--spectrum-global-dimension-size-400)
)}:host{box-sizing:border-box;display:inline-block;list-style-type:none;margin-bottom:var(
--spectrum-popover-padding-y,var(--spectrum-global-dimension-size-50)
);margin-left:0;margin-right:0;margin-top:var(
--spectrum-popover-padding-y,var(--spectrum-global-dimension-size-50)
);overflow:auto;padding:0}:host([dir=ltr][selects]) ::slotted(sp-menu-item){padding-right:var(
--spectrum-listitem-texticon-selectable-padding-right
)}:host([dir=rtl][selects]) ::slotted(sp-menu-item){padding-left:var(
--spectrum-listitem-texticon-selectable-padding-right
)}:host([dir=ltr][selects]) ::slotted(sp-menu-item[selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))}:host([dir=rtl][selects]) ::slotted(sp-menu-item[selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
))}::slotted(sp-menu){display:block}:host{--spectrum-listheading-text-color:var(
--spectrum-global-color-gray-700
)}:host{background-color:var(
--spectrum-listitem-m-texticon-background-color,var(--spectrum-alias-background-color-transparent)
)}:host{--spectrum-listitem-selectable-padding-right:calc(var(--spectrum-global-dimension-size-100) + var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-listitem-icon-gap));display:inline-flex;flex-direction:column;width:var(--swc-menu-width)}:host(:focus){outline:none}::slotted(*){--swc-menu-width:100%;flex-shrink:0}
`,O=Object.defineProperty,D=Object.getOwnPropertyDescriptor,M=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?D(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&O(o,e,a),a};function _(t,o){return!!o&&(t===o||t.contains(o))}class H extends m{constructor(){super(),this.isSubmenu=!1,this.label="",this.value="",this.valueSeparator=",",this.selected=[],this.selectedItems=[],this.childItemSet=new Set,this.focusedItemIndex=0,this.focusInItemIndex=0,this.selectedItemsMap=new Map,this._willUpdateItems=!1,this._notFirstUpdated=!1,this.cacheUpdated=Promise.resolve(),this.addEventListener("sp-menu-item-added-or-updated",this.onSelectableItemAddedOrUpdated),this.addEventListener("sp-menu-item-added-or-updated",this.onFocusableItemAddedOrUpdated,{capture:!0}),this.addEventListener("sp-menu-item-removed",this.removeChildItem),this.addEventListener("click",this.onClick),this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[L]}get childItems(){return this.cachedChildItems||(this.cachedChildItems=this.updateCachedMenuItems()),this.cachedChildItems}updateCachedMenuItems(){this.cachedChildItems=[];const t=this.menuSlot?this.menuSlot.assignedElements({flatten:!0}):[];for(const o of t){const t=o instanceof R?[o]:[...o.querySelectorAll("*")];for(const o of t)this.childItemSet.has(o)&&this.cachedChildItems.push(o)}return this.cachedChildItems}get childRole(){if("listbox"===this.resolvedRole)return"option";switch(this.resolvedSelects){case"single":return"menuitemradio";case"multiple":return"menuitemcheckbox";default:return"menuitem"}}get ownRole(){return"menu"}onFocusableItemAddedOrUpdated(t){var o;t.item.menuData.focusRoot&&(this.tabIndex=-1),t.focusRoot=this,this.addChildItem(t.item),"inherit"===this.selects?(this.resolvedSelects="inherit",this.resolvedRole=(null==(o=t.currentAncestorWithSelects)?void 0:o.getAttribute("role"))||this.getAttribute("role")||void 0):this.selects?(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects=this.selects,t.currentAncestorWithSelects=this):(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects="none"===this.resolvedRole?"ignore":"none")}onSelectableItemAddedOrUpdated(t){("single"===this.resolvedSelects||"multiple"===this.resolvedSelects||!this.selects&&"ignore"!==this.resolvedSelects)&&!t.item.menuData.selectionRoot&&(t.item.setRole(this.childRole),t.selectionRoot=this)}addChildItem(t){this.childItemSet.add(t),this.handleItemsChanged()}async removeChildItem(t){this.childItemSet.delete(t.item),this.cachedChildItems=void 0,t.item.focused&&(this.handleItemsChanged(),await this.updateComplete,this.focus())}focus({preventScroll:t}={}){if(!this.childItems.length||this.childItems.every((t=>t.disabled)))return;if(this.childItems.some((t=>t.menuData.focusRoot!==this)))return void super.focus({preventScroll:t});this.focusMenuItemByOffset(0),super.focus({preventScroll:t});const o=this.querySelector("[selected]");o&&!t&&o.scrollIntoView({block:"nearest"})}onClick(t){if(t.defaultPrevented)return;const o=t.composedPath().find((t=>t instanceof Element&&t.getAttribute("role")===this.childRole));(null==o?void 0:o.href)&&o.href.length?this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})):(null==o?void 0:o.menuData.selectionRoot)===this&&this.childItems.length&&(t.preventDefault(),o.hasSubmenu||o.open||(this.selectOrToggleItem(o),this.prepareToCleanUp()))}handleFocusin(t){var o;const e=_(this,t.relatedTarget);if(e||this.childItems.some((t=>t.menuData.focusRoot!==this)))return;const r=this.getRootNode().activeElement,i=(null==(o=this.childItems[this.focusedItemIndex])?void 0:o.menuData.selectionRoot)||this;if((r!==i||!e)&&(i.focus({preventScroll:!0}),r&&0===this.focusedItemIndex)){const t=this.childItems.findIndex((t=>t===r));t>0&&this.focusMenuItemByOffset(t)}this.startListeningToKeyboard()}startListeningToKeyboard(){this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.handleFocusout)}handleFocusout(t){if(_(this,t.relatedTarget))t.composedPath()[0].focused=!1;else{if(this.stopListeningToKeyboard(),t.target===this&&this.childItems.some((t=>t.menuData.focusRoot===this))){const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1)}this.removeAttribute("aria-activedescendant")}}stopListeningToKeyboard(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)}async selectOrToggleItem(t){const o=this.resolvedSelects,e=new Map(this.selectedItemsMap),r=this.selected.slice(),i=this.selectedItems.slice(),a=this.value;if(this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=this.childItems.indexOf(t),this.forwardFocusVisibleToItem(t),"multiple"===o){this.selectedItemsMap.has(t)?this.selectedItemsMap.delete(t):this.selectedItemsMap.set(t,!0);const o=[],e=[];this.childItemSet.forEach((t=>{t.menuData.selectionRoot===this&&this.selectedItemsMap.has(t)&&(o.push(t.value),e.push(t))})),this.selected=o,this.selectedItems=e,this.value=this.selected.join(this.valueSeparator)}else this.selectedItemsMap.clear(),this.selectedItemsMap.set(t,!0),this.value=t.value,this.selected=[t.value],this.selectedItems=[t];if(await this.updateComplete,!this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})))return this.selected=r,this.selectedItems=i,this.selectedItemsMap=e,void(this.value=a);if("single"===o){for(const o of e.keys())o!==t&&(o.selected=!1);t.selected=!0}else"multiple"===o&&(t.selected=!t.selected)}navigateWithinMenu(t){const{code:o}=t,e=this.childItems[this.focusedItemIndex],r="ArrowDown"===o?1:-1,i=this.focusMenuItemByOffset(r);i!==e&&(t.preventDefault(),i.scrollIntoView({block:"nearest"}))}navigateBetweenRelatedMenus(t){const o=this.isLTR&&"ArrowRight"===t||!this.isLTR&&"ArrowLeft"===t,e=this.isLTR&&"ArrowLeft"===t||!this.isLTR&&"ArrowRight"===t;if(o){const t=this.childItems[this.focusedItemIndex];t.hasSubmenu&&(this.blur(),t.openOverlay())}else e&&this.isSubmenu&&this.dispatchEvent(new Event("close",{bubbles:!0}))}handleKeydown(t){var o;const{code:e}=t;if("Tab"!==e){if("Space"===e){const t=this.childItems[this.focusedItemIndex];if(t.hasSubmenu)return this.blur(),void t.openOverlay()}"Space"!==e&&"Enter"!==e?"ArrowDown"!==e&&"ArrowUp"!==e?this.navigateBetweenRelatedMenus(e):this.navigateWithinMenu(t):null==(o=this.childItems[this.focusedItemIndex])||o.click()}else this.prepareToCleanUp()}focusMenuItemByOffset(t){const o=t||1;this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+t)%this.childItems.length;let e=this.childItems[this.focusedItemIndex],r=this.childItems.length;for(;e.disabled&&r;)r-=1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+o)%this.childItems.length,e=this.childItems[this.focusedItemIndex];return null!=e&&e.disabled||this.forwardFocusVisibleToItem(e),e}prepareToCleanUp(){document.addEventListener("focusout",(()=>{requestAnimationFrame((()=>{const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1,this.updateSelectedItemIndex())}))}),{once:!0})}updateSelectedItemIndex(){let t=0;const o=new Map,e=[],r=[];let i=this.childItems.length;for(;i;){i-=1;const a=this.childItems[i];a.menuData.selectionRoot===this&&(a.selected&&(t=i,o.set(a,!0),e.unshift(a.value),r.unshift(a)),i!==t&&(a.focused=!1))}r.map(((t,o)=>{o>0&&(t.focused=!1)})),this.selectedItemsMap=o,this.selected=e,this.selectedItems=r,this.value=this.selected.join(this.valueSeparator),this.focusedItemIndex=t,this.focusInItemIndex=t}handleItemsChanged(){if(this.cachedChildItems=void 0,!this._willUpdateItems){let t=()=>{};this.cacheUpdated=new Promise((o=>t=o)),this._willUpdateItems=!0,window.requestAnimationFrame((()=>{void 0===this.cachedChildItems&&(this.updateSelectedItemIndex(),this.updateItemFocus()),this._willUpdateItems=!1,t()}))}}updateItemFocus(){if(0==this.childItems.length)return;const t=this.childItems[this.focusInItemIndex];this.getRootNode().activeElement===t.menuData.focusRoot&&this.forwardFocusVisibleToItem(t)}forwardFocusVisibleToItem(t){t.menuData.focusRoot===this&&(t.focused=this.hasVisibleFocusInTree(),this.setAttribute("aria-activedescendant",t.id),t.menuData.selectionRoot&&t.menuData.selectionRoot!==this&&t.menuData.selectionRoot.focus())}render(){return u`
            <slot></slot>
        `}firstUpdated(t){if(super.firstUpdated(t),!this.hasAttribute("tabindex")){const t=this.getAttribute("role");"group"===t?this.tabIndex=-1:"none"!==t&&(this.tabIndex=0)}const o=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];[...this.children].forEach((t=>{"sp-menu-item"===t.localName&&o.push(t.updateComplete)})),this.childItemsUpdated=Promise.all(o)}updated(t){super.updated(t),t.has("selects")&&this._notFirstUpdated&&this.selectsChanged(),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")),this._notFirstUpdated=!0}selectsChanged(){const t=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];this.childItemSet.forEach((o=>{t.push(o.triggerUpdate())})),this.childItemsUpdated=Promise.all(t)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role",this.ownRole),this.updateComplete.then((()=>this.updateItemFocus()))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.childItemsUpdated,await this.cacheUpdated,t}}M([d({type:String,reflect:!0})],H.prototype,"label",2),M([d({type:String,reflect:!0})],H.prototype,"selects",2),M([d({type:String})],H.prototype,"value",2),M([d({type:String,attribute:"value-separator"})],H.prototype,"valueSeparator",2),M([d({attribute:!1})],H.prototype,"selected",2),M([d({attribute:!1})],H.prototype,"selectedItems",2),M([a("slot:not([name])")],H.prototype,"menuSlot",2),customElements.define("sp-menu",H);var $=o`
:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0ms;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0ms linear calc(var(
--spectrum-dialog-confirm-background-exit-animation-delay,
var(--spectrum-global-animation-duration-200)
) + var(
--spectrum-dialog-confirm-background-exit-animation-duration,
var(--spectrum-global-animation-duration-300)
));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0ms)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}
`,G=Object.defineProperty,K=Object.getOwnPropertyDescriptor;class W extends m{constructor(){super(...arguments),this.open=!1}static get styles(){return[$]}render(){return u``}}((t,o,e,r)=>{for(var i,a=r>1?void 0:r?K(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);r&&a&&G(o,e,a)})([d({type:Boolean,reflect:!0})],W.prototype,"open",2),customElements.define("sp-underlay",W);const V="(prefers-color-scheme: dark)",Y="(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)";class N{constructor(t,o){this.key=Symbol("match-media-key"),this.matches=!1,this.host=t,this.host.addController(this),this.media=window.matchMedia(o),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),t.addController(this)}hostConnected(){var t;null==(t=this.media)||t.addEventListener("change",this.onChange)}hostDisconnected(){var t;null==(t=this.media)||t.removeEventListener("change",this.onChange)}onChange(t){this.matches!==t.matches&&(this.matches=t.matches,this.host.requestUpdate(this.key,!this.matches))}}var Q=o`
.modal{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-dialog-fullscreen-margin:32px;--spectrum-dialog-max-height:90vh}.modal{border-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);max-height:var(--spectrum-dialog-max-height);outline:none;overflow:hidden;pointer-events:auto;transform:translateY(var(
--spectrum-dialog-confirm-entry-animation-distance,var(--spectrum-global-dimension-size-250)
));transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0ms linear calc(var(--spectrum-dialog-confirm-exit-animation-delay, 0ms) + var(
--spectrum-dialog-confirm-exit-animation-duration,
var(--spectrum-global-animation-duration-100)
)),transform 0ms linear calc(var(--spectrum-dialog-confirm-exit-animation-delay, 0ms) + var(
--spectrum-dialog-confirm-exit-animation-duration,
var(--spectrum-global-animation-duration-100)
));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}}.fullscreen{bottom:var(--spectrum-dialog-fullscreen-margin);left:var(
--spectrum-dialog-fullscreen-margin
);right:var(--spectrum-dialog-fullscreen-margin);top:var(--spectrum-dialog-fullscreen-margin)}.fullscreen,.fullscreenTakeover{max-height:none;max-width:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;bottom:0;box-sizing:border-box;left:0;right:0;top:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}.modal{background:var(
--spectrum-dialog-confirm-background-color,var(--spectrum-alias-background-color-default)
)}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(
--swc-test-duration
);height:100dvh}
`;var X=o`
:host([dir=ltr]){left:0}:host([dir=rtl]){right:0}:host{bottom:0;display:flex;justify-content:center;position:fixed;width:100%;z-index:2}@media (max-width:375px){.spectrum-Tray{border-radius:var(--spectrum-tray-border-radius,0)}}.tray{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .tray{opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-tray-margin-top:64px}:host([dir=ltr]) .spectrum-Tray-wrapper{left:0}:host([dir=rtl]) .spectrum-Tray-wrapper{right:0}.spectrum-Tray-wrapper{bottom:0;display:flex;justify-content:center;position:fixed;width:100%;z-index:2}.tray{border-radius:var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(--spectrum-tray-border-radius,0) var(--spectrum-tray-border-radius,0);max-height:calc(100vh - var(--spectrum-tray-margin-top));max-width:var(--spectrum-tray-max-width,375px);min-height:var(
--spectrum-tray-min-height,var(--spectrum-global-dimension-static-size-800)
);outline:none;overflow:auto;padding:var(--spectrum-tray-padding-y,0) var(
--spectrum-tray-padding-x,var(--spectrum-global-dimension-static-size-100)
);transform:translateY(100%);transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0ms linear calc(var(--spectrum-dialog-confirm-exit-animation-delay, 0ms) + var(
--spectrum-dialog-confirm-exit-animation-duration,
var(--spectrum-global-animation-duration-100)
)),transform var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms);width:var(--spectrum-tray-width,100%)}:host([open]) .tray{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media (max-width:375px){.tray{border-radius:var(--spectrum-tray-border-radius,0)}}:host{align-items:flex-end;max-height:var(--swc-visual-viewport-height);position:fixed!important}sp-underlay{touch-action:none}.tray{display:inline-flex;overscroll-behavior:contain;padding:var(--spectrum-tray-padding-y,0) var(--spectrum-tray-padding-x,0)}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,J=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,tt=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?Z(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&J(o,e,a),a};class ot extends m{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new N(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve(),this.animating=!1}static get styles(){return[Q,X]}focus(){const t=s(this);t?t.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(t){t.has("open")&&void 0!==t.get("open")&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise((t=>{this.resolveTransitionPromise=()=>{this.animating=!1,t()}}))),super.update(t)}render(){return u`
            <sp-underlay
                ?open=${this.open}
                @click=${this.close}
                @transitionend=${this.handleUnderlayTransitionend}
            ></sp-underlay>
            <div
                class="tray modal"
                tabindex="-1"
                @transitionend=${this.handleTrayTransitionend}
            >
                <slot></slot>
            </div>
        `}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}tt([d({type:Boolean,reflect:!0})],ot.prototype,"open",2),tt([a(".tray")],ot.prototype,"tray",2),customElements.define("sp-tray",ot);var et=o`
:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0ms;visibility:visible}:host([placement*=bottom][open]){transform:translateY(var(--spectrum-overlay-animation-distance))}:host([placement*=top][open]){transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([placement*=right][open]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([placement*=left][open]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{--spectrum-popover-target-offset:13px;--spectrum-popover-dialog-padding:30px 29px;--spectrum-popover-dialog-min-width:270px;--spectrum-popover-min-width:var(--spectrum-global-dimension-size-400);--spectrum-popover-min-height:var(--spectrum-global-dimension-size-400)}:host{border-radius:var(
--spectrum-popover-border-radius,var(--spectrum-alias-border-radius-regular)
);border-style:solid;border-width:var(
--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;display:inline-flex;flex-direction:column;min-height:var(
--spectrum-popover-min-height,var(--spectrum-global-dimension-size-400)
);min-width:var(
--spectrum-popover-min-width,var(--spectrum-global-dimension-size-400)
);outline:none;position:absolute}#tip{position:absolute;-webkit-transform:translate(0)}#tip .triangle{stroke-linecap:square;stroke-linejoin:miter;stroke-width:var(
--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)
)}:host([dialog]){min-width:var(
--spectrum-popover-dialog-min-width
);padding:var(--spectrum-popover-dialog-padding)}:host([placement*=left][tip]){margin-right:var(
--spectrum-popover-target-offset
)}:host([placement*=left]) #tip{left:100%}:host([placement*=right][tip]){margin-left:var(
--spectrum-popover-target-offset
)}:host([placement*=right]) #tip{right:100%;transform:scaleX(-1)}:host([placement*=left]) #tip,:host([placement*=right]) #tip{margin-top:calc(var(--spectrum-global-dimension-size-150)*-1);top:50%}:host([placement*=bottom][tip]){margin-top:var(
--spectrum-popover-target-offset
)}:host([placement*=bottom]) #tip{bottom:100%;transform:scaleY(-1)}:host([placement*=top][tip]){margin-bottom:var(
--spectrum-popover-target-offset
)}:host([placement*=top]) #tip{top:100%}:host([placement*=bottom]) #tip,:host([placement*=top]) #tip{left:50%;margin-left:calc(var(--spectrum-global-dimension-size-150)*-1)}:host{background-color:var(
--spectrum-popover-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-popover-border-color,var(--spectrum-alias-border-color-dark)
);clip-path:inset(-30px -30px);filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));-webkit-filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));will-change:filter}#tip .triangle{fill:var(
--spectrum-popover-background-color,var(--spectrum-global-color-gray-50)
);stroke:var(
--spectrum-popover-border-color,var(--spectrum-alias-border-color-dark)
)}:host{--sp-popover-tip-size:24px;max-height:100%;max-width:100%;min-width:min-content}::slotted(*){overscroll-behavior:contain}.tip{height:calc(var(--sp-popover-tip-size)/2);left:0;position:absolute;width:var(--sp-popover-tip-size)}:host([placement*=right]) #tip{transform:none}:host([placement*=bottom]) #tip{transform:none}:host([placement*=top]) .tip{top:100%}:host([placement*=bottom]) .tip{bottom:100%;transform:scaleY(-1)}:host([placement*=left]) .tip{transform:rotate(-90deg) translateY(-200%);transform-origin:100% 0}:host([placement*=right]) .tip{transform:rotate(90deg);transform-origin:0 0}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,rt=Object.defineProperty,it=Object.getOwnPropertyDescriptor,at=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?it(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&rt(o,e,a),a};class ct extends m{constructor(){super(...arguments),this.dialog=!1,this.open=!1,this.placement="none",this.tip=!1}static get styles(){return[et]}renderTip(){return u`
            <div id="tip">
                <svg
                    xmlns="http://www.w3.org/svg/2000"
                    class="tip"
                    viewBox="0 0 24 12"
                >
                    <path
                        class="triangle"
                        d="M 0.7071067811865476 0 L 11.414213562373096 10.707106781186548 L 22.121320343559645 0"
                    ></path>
                </svg>
            </div>
        `}connectedCallback(){super.connectedCallback(),this.addEventListener("sp-overlay-query",this.onOverlayQuery)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("sp-overlay-query",this.onOverlayQuery)}onOverlayQuery(t){if(!t.target||t.target!==this)return;const o=this.shadowRoot.querySelector("#tip");o&&(t.detail.overlayContentTipElement=o)}render(){return u`
            <slot></slot>
            ${this.tip?this.renderTip():p}
        `}}at([d({type:Boolean,reflect:!0})],ct.prototype,"dialog",2),at([d({type:Boolean,reflect:!0})],ct.prototype,"open",2),at([d({reflect:!0})],ct.prototype,"placement",2),at([d({type:Boolean,reflect:!0})],ct.prototype,"tip",2),customElements.define("sp-popover",ct);var nt=Object.defineProperty,st=Object.getOwnPropertyDescriptor,lt=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?st(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&nt(o,e,a),a};const ut={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class dt extends(c(r)){constructor(){super(),this.isMobile=new N(this,Y),this.disabled=!1,this.focused=!1,this.invalid=!1,this.open=!1,this.readonly=!1,this.selects="single",this.menuItems=[],this.placement="bottom-start",this.quiet=!1,this.value="",this.listRole="listbox",this.itemRole="option",this.onKeydown=t=>{this.focused=!0,("ArrowDown"===t.code||"ArrowUp"===t.code)&&(t.preventDefault(),this.toggle(!0))},this.overlayOpenCallback=async()=>{this.updateMenuItems(),await this.itemsUpdated,await this.optionsMenu.updateComplete,requestAnimationFrame((()=>this.menuStateResolver()))},this.overlayCloseCallback=async()=>{this.restoreChildren&&(this.restoreChildren(),this.restoreChildren=void 0),this.close(),requestAnimationFrame((()=>this.menuStateResolver()))},this._willUpdateItems=!1,this.itemsUpdated=Promise.resolve(),this.menuStatePromise=Promise.resolve(),this.selectionPromise=Promise.resolve(),this.onKeydown=this.onKeydown.bind(this)}get target(){return this.button}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0}onButtonBlur(){this.focused=!1,this.target.removeEventListener("keydown",this.onKeydown)}onButtonClick(){this.toggle()}focus(t){super.focus(t),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}onHelperFocus(){this.focused=!0,this.button.focus()}onButtonFocus(){this.target.addEventListener("keydown",this.onKeydown)}handleChange(t){const o=t.target,[e]=o.selectedItems;t.cancelable?(t.stopPropagation(),this.setValueFromItem(e,t)):this.open=!1}async setValueFromItem(t,o){const e=this.selectedItem,r=this.value;if(this.selectedItem=t,this.value=t.value,this.open=!1,await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0})))return o&&o.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),e&&this.setMenuItemSelected(e,!0),this.selectedItem=e,this.value=r,void(this.open=!0);e&&this.setMenuItemSelected(e,!1),this.setMenuItemSelected(t,!!this.selects)}setMenuItemSelected(t,o){null!=this.selects&&(t.selected=o)}toggle(t){this.readonly||(this.open=void 0!==t?t:!this.open)}close(){this.readonly||(this.open=!1)}async generatePopover(){this.popoverFragment||(this.popoverFragment=document.createDocumentFragment()),b(this.renderPopover,this.popoverFragment,{host:this}),this.popover=this.popoverFragment.children[0],this.optionsMenu=this.popover.children[1]}async openMenu(){let t=[];const o=this.querySelector(":scope > sp-menu");await this.generatePopover(),t=o?Array.from(o.children):Array.from(this.children).filter((t=>!t.hasAttribute("slot"))),0!==t.length?(this.restoreChildren=n(t,this.optionsMenu,{position:"beforeend",prepareCallback:t=>(this.value===t.value&&this.setMenuItemSelected(t,!0),t=>{void 0!==t.focused&&(t.focused=!1)})}),this.sizePopover(this.popover),this.closeOverlay=mt.openOverlay(this,"modal",this.popover,{placement:this.isMobile.matches?"none":this.placement,receivesFocus:"auto"})):this.menuStateResolver()}sizePopover(t){this.isMobile.matches?t.style.setProperty("--swc-menu-width","100%"):this.quiet||t.style.setProperty("min-width",`${this.offsetWidth}px`)}async closeMenu(){if(this.closeOverlay){const t=this.closeOverlay;delete this.closeOverlay,(await t)()}}get selectedItemContent(){return this.selectedItem?this.selectedItem.itemChildren:{icon:[],content:[]}}renderLabelContent(t){return this.value&&this.selectedItem?t:u`
            <slot name="label">${this.label}</slot>
        `}get buttonContent(){const t={"visually-hidden":"only"===this.icons&&!!this.value,placeholder:!this.value};return[u`
                <span id="icon" ?hidden=${"none"===this.icons}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${w(t)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.invalid?u`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `:p}
                <sp-icon-chevron100
                    class="picker ${ut[this.size]}"
                ></sp-icon-chevron100>
            `]}render(){return u`
            <span
                id="focus-helper"
                tabindex="${this.focused?"-1":"0"}"
                @focus=${this.onHelperFocus}
            ></span>
            <button
                aria-haspopup="true"
                aria-expanded=${this.open?"true":"false"}
                aria-labelledby="button icon label"
                id="button"
                class="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
                tabindex="-1"
            >
                ${this.buttonContent}
            </button>
        `}update(t){this.selects&&(this.selects="single"),t.has("disabled")&&this.disabled&&(this.open=!1),t.has("open")&&(this.open||void 0!==t.get("open"))&&(this.menuStatePromise=new Promise((t=>this.menuStateResolver=t)),this.open?this.openMenu():this.closeMenu()),t.has("value")&&!t.has("selectedItem")&&this.updateMenuItems(),super.update(t)}get dismissHelper(){return u`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    arial-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `}get renderPopover(){const t=u`
            ${this.dismissHelper}
            <sp-menu
                id="menu"
                role="${this.listRole}"
                @change=${this.handleChange}
                .selects=${this.selects}
            ></sp-menu>
            ${this.dismissHelper}
        `;return this.isMobile.matches?u`
                <sp-tray
                    id="popover"
                    role="dialog"
                    @sp-menu-item-added-or-updated=${this.updateMenuItems}
                    .overlayOpenCallback=${this.overlayOpenCallback}
                    .overlayCloseCallback=${this.overlayCloseCallback}
                >
                    ${t}
                </sp-tray>
            `:u`
            <sp-popover
                id="popover"
                role="dialog"
                @sp-menu-item-added-or-updated=${this.updateMenuItems}
                .overlayOpenCallback=${this.overlayOpenCallback}
                .overlayCloseCallback=${this.overlayCloseCallback}
            >
                ${t}
            </sp-popover>
        `}updateMenuItems(t){if(this.open&&"sp-menu-item-removed"===(null==t?void 0:t.type)||this._willUpdateItems)return;this._willUpdateItems=!0,(null==t?void 0:t.item)===this.selectedItem&&this.requestUpdate();let o=()=>{};this.itemsUpdated=new Promise((t=>o=t)),window.requestAnimationFrame((async()=>{this.open?(await this.optionsMenu.updateComplete,this.menuItems=this.optionsMenu.childItems):this.menuItems=[...this.querySelectorAll('sp-menu-item:not([slot="submenu"] *)')],this.manageSelection(),o(),this._willUpdateItems=!1}))}async manageSelection(){if(null==this.selects)return;let t;await this.menuStatePromise,this.selectionPromise=new Promise((t=>this.selectionResolver=t)),this.menuItems.forEach((o=>{this.value!==o.value||o.disabled?o.selected=!1:t=o})),t?(t.selected=!!this.selects,this.selectedItem=t):(this.value="",this.selectedItem=void 0),this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver()}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.menuStatePromise,await this.itemsUpdated,await this.selectionPromise,t}connectedCallback(){this.updateMenuItems(),this.addEventListener("sp-menu-item-added-or-updated",this.updateMenuItems),this.addEventListener("sp-menu-item-removed",this.updateMenuItems),super.connectedCallback()}disconnectedCallback(){this.close(),super.disconnectedCallback()}}dt.openOverlay=async(t,o,e,r)=>await C(t,o,e,r),lt([a("#button")],dt.prototype,"button",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"disabled",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"focused",2),lt([d({type:String,reflect:!0})],dt.prototype,"icons",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"invalid",2),lt([d()],dt.prototype,"label",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"open",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"readonly",2),lt([d()],dt.prototype,"placement",2),lt([d({type:Boolean,reflect:!0})],dt.prototype,"quiet",2),lt([d({type:String})],dt.prototype,"value",2),lt([d({attribute:!1})],dt.prototype,"selectedItem",2);class mt extends dt{constructor(){super(...arguments),this.onKeydown=t=>{const{code:o}=t;if(this.focused=!0,!o.startsWith("Arrow")||this.readonly)return;if(t.preventDefault(),"ArrowUp"===o||"ArrowDown"===o)return void this.toggle(!0);const e=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,r=this.value&&"ArrowRight"!==o?-1:1;let i=e+r;for(;this.menuItems[i]&&this.menuItems[i].disabled;)i+=r;!this.menuItems[i]||this.menuItems[i].disabled||(!this.value||i!==e)&&this.setValueFromItem(this.menuItems[i])}}static get styles(){return[z,I]}}customElements.define("sp-picker",mt);var pt=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host([disabled]){cursor:default}::slotted([slot=icon]){flex-shrink:0;max-height:100%}:host:after{border-radius:calc(var(
--spectrum-button-m-primary-fill-texticon-border-radius,
var(--spectrum-global-dimension-size-200)
) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host(.focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host(:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host([size=s]){--spectrum-button-primary-fill-textonly-text-padding-bottom:var(
--spectrum-button-s-primary-fill-textonly-text-padding-bottom
);--spectrum-button-primary-fill-texticon-text-size:var(
--spectrum-button-s-primary-fill-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-button-primary-fill-texticon-text-font-weight:var(
--spectrum-button-s-primary-fill-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-fill-texticon-text-line-height:var(
--spectrum-button-s-primary-fill-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-fill-texticon-icon-gap:var(
--spectrum-button-s-primary-fill-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-button-primary-fill-texticon-focus-ring-size:var(
--spectrum-button-s-primary-fill-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-fill-texticon-border-size:var(
--spectrum-button-s-primary-fill-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-texticon-padding-left:var(
--spectrum-button-s-primary-fill-texticon-padding-left,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-fill-texticon-border-radius:var(
--spectrum-button-s-primary-fill-texticon-border-radius,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-fill-textonly-border-size:var(
--spectrum-button-s-primary-fill-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-textonly-min-width:var(
--spectrum-button-s-primary-fill-textonly-min-width,var(--spectrum-global-dimension-size-675)
);--spectrum-button-primary-fill-textonly-padding-left:var(
--spectrum-button-s-primary-fill-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-fill-textonly-padding-right:var(
--spectrum-button-s-primary-fill-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-fill-textonly-height:var(
--spectrum-button-s-primary-fill-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-fill-textonly-text-padding-top:calc(var(
--spectrum-button-s-primary-fill-textonly-text-padding-top,
var(--spectrum-global-dimension-static-size-50)
) - 1px)}:host([size=m]){--spectrum-button-primary-fill-texticon-padding-left:var(
--spectrum-button-m-primary-fill-texticon-padding-left
);--spectrum-button-primary-fill-texticon-text-size:var(
--spectrum-button-m-primary-fill-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-button-primary-fill-texticon-text-font-weight:var(
--spectrum-button-m-primary-fill-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-fill-texticon-text-line-height:var(
--spectrum-button-m-primary-fill-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-fill-texticon-icon-gap:var(
--spectrum-button-m-primary-fill-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-button-primary-fill-texticon-focus-ring-size:var(
--spectrum-button-m-primary-fill-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-fill-texticon-border-size:var(
--spectrum-button-m-primary-fill-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-texticon-border-radius:var(
--spectrum-button-m-primary-fill-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-fill-textonly-text-padding-top:var(
--spectrum-button-m-primary-fill-textonly-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-button-primary-fill-textonly-border-size:var(
--spectrum-button-m-primary-fill-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-textonly-min-width:var(
--spectrum-button-m-primary-fill-textonly-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-button-primary-fill-textonly-padding-left:var(
--spectrum-button-m-primary-fill-textonly-padding-left,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-fill-textonly-padding-right:var(
--spectrum-button-m-primary-fill-textonly-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-fill-textonly-height:var(
--spectrum-button-m-primary-fill-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-button-primary-fill-textonly-text-padding-bottom:calc(var(
--spectrum-button-m-primary-fill-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-115)
) - 1px)}:host([size=l]){--spectrum-button-primary-fill-textonly-text-padding-top:var(
--spectrum-button-l-primary-fill-textonly-text-padding-top
);--spectrum-button-primary-fill-texticon-text-size:var(
--spectrum-button-l-primary-fill-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-button-primary-fill-texticon-text-font-weight:var(
--spectrum-button-l-primary-fill-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-fill-texticon-text-line-height:var(
--spectrum-button-l-primary-fill-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-fill-texticon-icon-gap:var(
--spectrum-button-l-primary-fill-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-button-primary-fill-texticon-focus-ring-size:var(
--spectrum-button-l-primary-fill-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-fill-texticon-border-size:var(
--spectrum-button-l-primary-fill-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-texticon-padding-left:var(
--spectrum-button-l-primary-fill-texticon-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-button-primary-fill-texticon-border-radius:var(
--spectrum-button-l-primary-fill-texticon-border-radius,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-fill-textonly-text-padding-bottom:var(
--spectrum-button-l-primary-fill-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-button-primary-fill-textonly-border-size:var(
--spectrum-button-l-primary-fill-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-textonly-min-width:var(
--spectrum-button-l-primary-fill-textonly-min-width,var(--spectrum-global-dimension-size-1125)
);--spectrum-button-primary-fill-textonly-padding-left:var(
--spectrum-button-l-primary-fill-textonly-padding-left,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-fill-textonly-padding-right:var(
--spectrum-button-l-primary-fill-textonly-padding-right,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-fill-textonly-height:var(
--spectrum-button-l-primary-fill-textonly-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-button-primary-fill-texticon-padding-left:var(
--spectrum-button-xl-primary-fill-texticon-padding-left
);--spectrum-button-primary-fill-texticon-text-size:var(
--spectrum-button-xl-primary-fill-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-button-primary-fill-texticon-text-font-weight:var(
--spectrum-button-xl-primary-fill-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-fill-texticon-text-line-height:var(
--spectrum-button-xl-primary-fill-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-fill-texticon-icon-gap:var(
--spectrum-button-xl-primary-fill-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-fill-texticon-focus-ring-size:var(
--spectrum-button-xl-primary-fill-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-fill-texticon-border-size:var(
--spectrum-button-xl-primary-fill-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-texticon-border-radius:var(
--spectrum-button-xl-primary-fill-texticon-border-radius,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-fill-textonly-text-padding-top:var(
--spectrum-button-xl-primary-fill-textonly-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-fill-textonly-border-size:var(
--spectrum-button-xl-primary-fill-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-fill-textonly-min-width:var(
--spectrum-button-xl-primary-fill-textonly-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-button-primary-fill-textonly-padding-left:var(
--spectrum-button-xl-primary-fill-textonly-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-fill-textonly-padding-right:var(
--spectrum-button-xl-primary-fill-textonly-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-fill-textonly-height:var(
--spectrum-button-xl-primary-fill-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-button-primary-fill-textonly-text-padding-bottom:calc(var(
--spectrum-button-xl-primary-fill-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-175)
) - 1px)}:host{--spectrum-button-primary-fill-padding-left-adjusted:calc(var(--spectrum-button-primary-fill-texticon-padding-left) - var(--spectrum-button-primary-fill-texticon-border-size));--spectrum-button-primary-fill-textonly-padding-left-adjusted:calc(var(--spectrum-button-primary-fill-textonly-padding-left) - var(--spectrum-button-primary-fill-texticon-border-size));--spectrum-button-primary-fill-textonly-padding-right-adjusted:calc(var(--spectrum-button-primary-fill-textonly-padding-right) - var(--spectrum-button-primary-fill-texticon-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-button-primary-fill-textonly-padding-left-adjusted
);padding-right:var(
--spectrum-button-primary-fill-textonly-padding-right-adjusted
)}:host([dir=rtl]){padding-left:var(
--spectrum-button-primary-fill-textonly-padding-right-adjusted
);padding-right:var(
--spectrum-button-primary-fill-textonly-padding-left-adjusted
)}:host{--spectrum-button-focus-ring-color:var(
--spectrum-button-m-primary-fill-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
);border-radius:var(--spectrum-button-primary-fill-texticon-border-radius);border-style:solid;border-width:var(
--spectrum-button-primary-fill-texticon-border-size
);color:inherit;font-size:var(--spectrum-button-primary-fill-texticon-text-size);font-weight:var(--spectrum-button-primary-fill-texticon-text-font-weight);height:auto;min-height:var(--spectrum-button-primary-fill-textonly-height);min-width:var(--spectrum-button-primary-fill-textonly-min-width);padding-bottom:0;padding-top:0}:host(:hover),:host([active]){box-shadow:none}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(
--spectrum-button-primary-fill-textonly-padding-left-adjusted
) - var(--spectrum-button-primary-fill-padding-left-adjusted))*-1)}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(
--spectrum-button-primary-fill-textonly-padding-left-adjusted
) - var(--spectrum-button-primary-fill-padding-left-adjusted))*-1)}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-button-primary-fill-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-button-primary-fill-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}:host:after{border-radius:calc(var(--spectrum-button-primary-fill-texticon-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
))}#label{line-height:var(
--spectrum-button-primary-fill-texticon-text-line-height
);padding-bottom:calc(var(--spectrum-button-primary-fill-textonly-text-padding-bottom) - var(--spectrum-button-primary-fill-textonly-border-size));padding-top:calc(var(--spectrum-button-primary-fill-textonly-text-padding-top) - var(--spectrum-button-primary-fill-textonly-border-size))}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-fill-texticon-focus-ring-size) var(--spectrum-button-focus-ring-color)}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-fill-texticon-focus-ring-size) var(--spectrum-button-focus-ring-color)}:host([variant=white]){--spectrum-button-focus-ring-color:var(
--spectrum-button-m-primary-fill-white-texticon-focus-ring-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=black]){--spectrum-button-focus-ring-color:var(
--spectrum-button-m-primary-fill-black-texticon-focus-ring-color-key-focus,var(--spectrum-global-color-static-black)
)}:host(:not([variant=white]):not([variant=black])[disabled]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-fill-texticon-icon-color-disabled,var(--spectrum-global-color-gray-500)
)}:host(:not([variant=white]):not([variant=black])[disabled]) #label{color:var(
--spectrum-button-m-primary-fill-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=white][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-fill-white-texticon-icon-color-disabled,var(--spectrum-global-color-static-transparent-white-500)
)}:host([variant=white][disabled]) #label{color:var(
--spectrum-button-m-primary-fill-white-texticon-text-color-disabled,var(--spectrum-global-color-static-transparent-white-500)
)}:host([variant=white][treatment=fill]:not([variant=secondary]):not([disabled])){background-color:var(
--spectrum-button-m-primary-fill-white-texticon-background-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=fill]:not([variant=secondary]):not([disabled])) ::slotted([slot=icon]){color:inherit}:host([variant=white][treatment=fill]:not([variant=secondary]):not([disabled])) #label{color:inherit}:host([variant=white][treatment=fill][variant=secondary]:not([disabled])){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color,var(--spectrum-global-color-static-transparent-white-200)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-white-texticon-icon-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled])) #label{color:var(
--spectrum-button-m-secondary-fill-white-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=fill][variant=secondary]:not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=fill][disabled]){background-color:var(
--spectrum-button-m-secondary-fill-white-texticon-background-color-disabled,var(--spectrum-global-color-static-transparent-white-200)
)}:host([variant=white][treatment=outline]:not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-white-texticon-icon-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=outline]:not([disabled])) #label{color:var(
--spectrum-button-m-secondary-outline-white-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=outline][disabled]){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-outline-white-texticon-border-color-disabled,var(--spectrum-global-color-static-transparent-white-200)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled])){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color,var(--spectrum-global-color-static-white)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled]):hover){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled])[active]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline]:not([variant=secondary]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled])){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-outline-white-texticon-border-color,var(--spectrum-global-color-static-transparent-white-200)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=white][treatment=outline][variant=secondary]:not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-outline-white-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-white-300)
)}:host([variant=black][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-fill-black-texticon-icon-color-disabled,var(--spectrum-global-color-static-transparent-black-500)
)}:host([variant=black][disabled]) #label{color:var(
--spectrum-button-m-primary-fill-black-texticon-text-color-disabled,var(--spectrum-global-color-static-transparent-black-500)
)}:host([variant=black][treatment=fill]:not([variant=secondary]):not([disabled])){background-color:var(
--spectrum-button-m-primary-fill-black-texticon-background-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=fill]:not([variant=secondary]):not([disabled])) ::slotted([slot=icon]){color:inherit}:host([variant=black][treatment=fill]:not([variant=secondary]):not([disabled])) #label{color:inherit}:host([variant=black][treatment=fill][variant=secondary]:not([disabled])){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color,var(--spectrum-global-color-static-transparent-black-200)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-black-texticon-icon-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled])) #label{color:var(
--spectrum-button-m-secondary-fill-black-texticon-text-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-down,var(--spectrum-global-color-static-transparent-black-400)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=fill][variant=secondary]:not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=fill][disabled]){background-color:var(
--spectrum-button-m-secondary-fill-black-texticon-background-color-disabled,var(--spectrum-global-color-static-transparent-black-200)
)}:host([variant=black][treatment=outline]:not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-black-texticon-icon-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=outline]:not([disabled])) #label{color:var(
--spectrum-button-m-secondary-outline-black-texticon-text-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=outline][disabled]){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-outline-black-texticon-border-color-disabled,var(--spectrum-global-color-static-transparent-black-200)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled])){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-black-texticon-border-color,var(--spectrum-global-color-static-black)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled]):hover){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled])[active]){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color-down,var(--spectrum-global-color-static-transparent-black-400)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline]:not([variant=secondary]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-primary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled])){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-outline-black-texticon-border-color,var(--spectrum-global-color-static-transparent-black-200)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-down,var(--spectrum-global-color-static-transparent-black-400)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([variant=black][treatment=outline][variant=secondary]:not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-outline-black-texticon-background-color-key-focus,var(--spectrum-global-color-static-transparent-black-300)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color,var(--spectrum-semantic-cta-background-color-default)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-fill-texticon-icon-color,var(--spectrum-global-color-static-white)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-accent-fill-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color-hover,var(--spectrum-semantic-cta-background-color-hover)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color-down,var(--spectrum-semantic-cta-background-color-down)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-key-focus)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-key-focus)
)}:host([treatment=fill][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-accent-fill-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-key-focus)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color,var(--spectrum-global-color-static-red-600)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-fill-texticon-icon-color,var(--spectrum-global-color-static-white)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-negative-fill-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color-hover,var(--spectrum-global-color-static-red-700)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color-down,var(--spectrum-global-color-static-red-800)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color-key-focus,var(--spectrum-global-color-static-red-700)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color-key-focus,var(--spectrum-global-color-static-red-700)
)}:host([treatment=fill][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-negative-fill-texticon-background-color-key-focus,var(--spectrum-global-color-static-red-700)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-fill-texticon-icon-color,var(--spectrum-global-color-gray-50)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-primary-fill-texticon-text-color,var(--spectrum-global-color-gray-50)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color,var(--spectrum-global-color-gray-200)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color-hover,var(--spectrum-global-color-gray-300)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color-down,var(--spectrum-global-color-gray-400)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-fill-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-fill-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=fill][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-secondary-fill-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=fill]:not([variant=white]):not([variant=black])[disabled]){background-color:var(
--spectrum-button-m-primary-fill-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
)}:host([treatment=fill][disabled]){border-color:var(
--spectrum-button-m-primary-fill-texticon-border-color-disabled,transparent
)}:host([treatment=fill]:not([disabled])){border-color:var(
--spectrum-button-m-primary-fill-texticon-border-color,transparent
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color,var(--spectrum-semantic-emphasized-border-color-default)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color,var(--spectrum-semantic-emphasized-border-color-default)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color-hover,var(--spectrum-alias-transparent-blue-background-color-hover)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color-hover,var(--spectrum-semantic-emphasized-border-color-hover)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):hover) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color-hover,var(--spectrum-semantic-emphasized-border-color-hover)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):hover) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color-hover,var(--spectrum-semantic-emphasized-border-color-hover)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color-down,var(--spectrum-alias-transparent-blue-background-color-down)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color-down,var(--spectrum-semantic-emphasized-border-color-down)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])[active]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color-down,var(--spectrum-semantic-emphasized-border-color-down)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])[active]) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color-down,var(--spectrum-semantic-emphasized-border-color-down)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-blue-background-color-key-focus)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-blue-background-color-key-focus)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-accent-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-blue-background-color-key-focus)
);border-color:var(
--spectrum-button-m-accent-outline-texticon-border-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-button-m-accent-outline-texticon-icon-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color-key-focus,var(--spectrum-semantic-emphasized-border-color-key-focus)
)}:host([treatment=outline][variant=accent]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-accent-outline-texticon-text-color,var(--spectrum-semantic-emphasized-border-color-default)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color,var(--spectrum-global-color-red-500)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color,var(--spectrum-global-color-red-500)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color-hover,var(--spectrum-alias-transparent-red-background-color-hover)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color-hover,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):hover) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color-hover,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):hover) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color-hover,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color-down,var(--spectrum-alias-transparent-red-background-color-down)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color-down,var(--spectrum-global-color-red-700)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])[active]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color-down,var(--spectrum-global-color-red-700)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])[active]) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color-down,var(--spectrum-global-color-red-700)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-red-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-red-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-negative-outline-texticon-background-color-key-focus,var(--spectrum-alias-transparent-red-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-outline-texticon-border-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-button-m-negative-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color-key-focus,var(--spectrum-global-color-red-600)
)}:host([treatment=outline][variant=negative]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-negative-outline-texticon-text-color,var(--spectrum-global-color-red-500)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-hover,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):hover) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):hover) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-down,var(--spectrum-global-color-gray-400)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])[active]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])[active]) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-button-m-primary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=primary]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-primary-outline-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color,var(--spectrum-global-color-gray-300)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color-hover,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color-hover,var(--spectrum-global-color-gray-400)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):hover) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color-down,var(--spectrum-global-color-gray-400)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color-down,var(--spectrum-global-color-gray-500)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])[active]) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-400)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-400)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).focus-visible) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]):focus-visible) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused){background-color:var(
--spectrum-button-m-secondary-outline-texticon-background-color-key-focus,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-outline-texticon-border-color-key-focus,var(--spectrum-global-color-gray-400)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-button-m-secondary-outline-texticon-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled]).is-keyboardFocused) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([treatment=outline][variant=secondary]:not([variant=white]):not([variant=black]):not([disabled])) #label{color:var(
--spectrum-button-m-secondary-outline-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([treatment=outline]:not([variant=white]):not([variant=black])[disabled]){background-color:var(
--spectrum-button-m-primary-outline-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
)}@media (forced-colors:active){:host{--spectrum-button-m-accent-fill-texticon-background-color-down:Highlight;--spectrum-button-m-accent-fill-texticon-background-color-hover:Highlight;--spectrum-button-m-accent-fill-texticon-background-color-key-focus:Highlight;--spectrum-button-m-accent-fill-texticon-background-color:ButtonText;--spectrum-button-m-accent-fill-texticon-icon-color:ButtonFace;--spectrum-button-m-accent-fill-texticon-text-color:ButtonFace;--spectrum-button-m-accent-outline-texticon-background-color:ButtonFace;--spectrum-button-m-accent-outline-texticon-background-color-down:ButtonFace;--spectrum-button-m-accent-outline-texticon-background-color-hover:ButtonFace;--spectrum-button-m-accent-outline-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-accent-outline-texticon-border-color:ButtonText;--spectrum-button-m-accent-outline-texticon-border-color-down:Highlight;--spectrum-button-m-accent-outline-texticon-border-color-hover:Highlight;--spectrum-button-m-accent-outline-texticon-border-color-key-focus:Highlight;--spectrum-button-m-accent-outline-texticon-icon-color:ButtonText;--spectrum-button-m-accent-outline-texticon-icon-color-down:ButtonText;--spectrum-button-m-accent-outline-texticon-icon-color-hover:ButtonText;--spectrum-button-m-accent-outline-texticon-icon-color-key-focus:ButtonText;--spectrum-button-m-accent-outline-texticon-text-color:ButtonText;--spectrum-button-m-accent-outline-texticon-text-color-down:ButtonText;--spectrum-button-m-accent-outline-texticon-text-color-hover:ButtonText;--spectrum-button-m-accent-outline-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-primary-fill-texticon-icon-color-disabled:GrayText;--spectrum-button-m-primary-fill-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-fill-white-texticon-icon-color-disabled:GrayText;--spectrum-button-m-primary-fill-white-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-fill-white-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-outline-white-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-fill-black-texticon-icon-color-disabled:GrayText;--spectrum-button-m-primary-fill-black-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-fill-black-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-outline-black-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-fill-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-outline-texticon-background-color-disabled:ButtonFace}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-fill-texticon-focus-ring-size) ButtonText;forced-color-adjust:none}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-fill-texticon-focus-ring-size) ButtonText;forced-color-adjust:none}:host([variant=accent]) #label{forced-color-adjust:none}}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
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
)}@media (forced-colors:active){:host([treatment][disabled]){border-color:graytext}:host([treatment]:not([disabled]):hover){border-color:highlight}}
`,bt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,ht=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?vt(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&bt(o,e,a),a};const gt=["accent","primary","secondary","negative","white","black"];class ft extends(c(k)){constructor(){super(...arguments),this._variant="accent",this.treatment="fill"}static get styles(){return[...super.styles,pt]}get variant(){return this._variant}set variant(t){if(t!==this.variant){switch(this.requestUpdate("variant",this.variant),t){case"cta":this._variant="accent";break;case"overBackground":this._variant="white",this.treatment="outline";break;default:gt.includes(t)?this._variant=t:this._variant="accent"}this.setAttribute("variant",this.variant)}}set quiet(t){this.treatment=t?"outline":"fill"}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("variant")||this.setAttribute("variant",this.variant)}}ht([d()],ft.prototype,"variant",1),ht([d({reflect:!0})],ft.prototype,"treatment",2),ht([d({type:Boolean})],ft.prototype,"quiet",1),customElements.define("sp-button",ft);var kt=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(--spectrum-font-family-base);line-height:var(--spectrum-line-height-small);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(--spectrum-animation-duration-100) ease-out,border-color var(--spectrum-animation-duration-100) ease-out,color var(--spectrum-animation-duration-100) ease-out,box-shadow var(--spectrum-animation-duration-100) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}:host(:disabled){cursor:default}:host{--spectrum-closebutton-size-300:24px;--spectrum-closebutton-size-400:32px;--spectrum-closebutton-size-500:40px;--spectrum-closebutton-size-600:48px;--spectrum-closebutton-icon-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-closebutton-icon-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-closebutton-icon-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-closebutton-icon-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-closebutton-icon-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-closebutton-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-closebutton-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-closebutton-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-closebutton-height:var(--spectrum-component-height-100);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-400);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-400);--spectrum-closebutton-animation-duration:var(
--spectrum-animation-duration-100
)}:host([variant=white]){--spectrum-closebutton-static-background-color-default:transparent;--spectrum-closebutton-static-background-color-hover:var(
--spectrum-transparent-white-300
);--spectrum-closebutton-static-background-color-down:var(
--spectrum-transparent-white-400
);--spectrum-closebutton-static-background-color-focus:var(
--spectrum-transparent-white-300
);--spectrum-closebutton-icon-color-default:var(--spectrum-white);--spectrum-closebutton-icon-color-disabled:var(
--spectrum-disabled-static-white-content-color
);--spectrum-closebutton-focus-indicator-color:var(
--spectrum-static-white-focus-indicator-color
)}:host([variant=black]){--spectrum-closebutton-static-background-color-default:transparent;--spectrum-closebutton-static-background-color-hover:var(
--spectrum-transparent-black-300
);--spectrum-closebutton-static-background-color-down:var(
--spectrum-transparent-black-400
);--spectrum-closebutton-static-background-color-focus:var(
--spectrum-transparent-black-300
);--spectrum-closebutton-icon-color-default:var(--spectrum-black);--spectrum-closebutton-icon-color-disabled:var(
--spectrum-disabled-static-black-content-color
);--spectrum-closebutton-focus-indicator-color:var(
--spectrum-static-black-focus-indicator-color
)}@media (forced-colors:active){:host{--highcontrast-closebutton-icon-color-disabled:GrayText;--highcontrast-closebutton-icon-color-down:Highlight;--highcontrast-closebutton-icon-color-hover:Highlight;--highcontrast-closebutton-icon-color-focus:Highlight;--highcontrast-closebutton-background-color-default:ButtonFace;--highcontrast-closebutton-focus-indicator-color:ButtonText}:host(.focus-visible):after{border-radius:100%;bottom:0;box-shadow:0 0 0 var(
--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness)
) var(
--highcontrast-closebutton-focus-indicator-color,var(
--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)
)
);content:"";display:block;forced-color-adjust:none;left:0;margin:var(
--mod-closebutton-focus-indicator-gap,var(--spectrum-closebutton-focus-indicator-gap)
);position:absolute;right:0;top:0;transition:opacity var(
--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration)
) ease-out,margin var(
--mod-closebutton-animation-duraction,var(--spectrum-closebutton-animation-duration)
) ease-out}:host(:focus-visible):after{border-radius:100%;bottom:0;box-shadow:0 0 0 var(
--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness)
) var(
--highcontrast-closebutton-focus-indicator-color,var(
--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)
)
);content:"";display:block;forced-color-adjust:none;left:0;margin:var(
--mod-closebutton-focus-indicator-gap,var(--spectrum-closebutton-focus-indicator-gap)
);position:absolute;right:0;top:0;transition:opacity var(
--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration)
) ease-out,margin var(
--mod-closebutton-animation-duraction,var(--spectrum-closebutton-animation-duration)
) ease-out}:host([variant=black]){--highcontrast-closebutton-static-background-color-default:ButtonFace;--highcontrast-closebutton-icon-color-default:Highlight;--highcontrast-closebutton-icon-color-disabled:GrayText}:host([variant=white]){--highcontrast-closebutton-static-background-color-default:ButtonFace;--highcontrast-closebutton-icon-color-default:Highlight;--highcontrast-closebutton-icon-color-disabled:Highlight}}:host{align-items:center;border-color:transparent;border-radius:var(
--mod-closebutton-border-radius,var(--spectrum-closebutton-border-radius)
);border-width:0;color:inherit;display:inline-flex;flex-direction:row;height:var(
--mod-closebutton-height,var(--spectrum-closebutton-height)
);justify-content:center;padding:0;position:relative;transition:border-color var(
--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration)
) ease-in-out;width:var(--mod-closebutton-width,var(--spectrum-closebutton-width))}:host:after{border-radius:calc(var(--mod-closebutton-size, var(--spectrum-closebutton-size)) + var(
--mod-closebutton-focus-indicator-gap,
var(--spectrum-closebutton-focus-indicator-gap)
));bottom:0;content:"";left:0;margin:calc(var(
--mod-closebutton-focus-indicator-gap,
var(--spectrum-closebutton-focus-indicator-gap)
)*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(
--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration)
) ease-in-out}:host(.focus-visible){box-shadow:none}:host(:focus-visible){box-shadow:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness)
) var(
--highcontrast-closebutton-focus-indicator-color,var(
--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)
)
)}:host(:focus-visible):after{box-shadow:0 0 0 var(
--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness)
) var(
--highcontrast-closebutton-focus-indicator-color,var(
--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)
)
)}:host(:not(:disabled)){background-color:var(
--highcontrast-closebutton-background-color-default,var(
--mod-closebutton-background-color-default,var(--spectrum-closebutton-background-color-default)
)
)}:host(:not(:disabled):hover){background-color:var(
--mod-closebutton-background-color-hover,var(--spectrum-closebutton-background-color-hover)
)}:host(:not(:disabled):hover) .icon{color:var(
--highcontrast-closebutton-icon-color-hover,var(
--mod-closebutton-icon-color-hover,var(--spectrum-closebutton-icon-color-hover)
)
)}:host(:not(:disabled)[active]){background-color:var(
--mod-closebutton-background-color-down,var(--spectrum-closebutton-background-color-down)
)}:host(:not(:disabled)[active]) .icon{color:var(
--highcontrast-closebutton-icon-color-down,var(
--mod-closebutton-icon-color-down,var(--spectrum-closebutton-icon-color-down)
)
)}:host(:not(:disabled).focus-visible),:host(:not(:disabled)[focused]){background-color:var(
--mod-closebutton-background-color-focus,var(--spectrum-closebutton-background-color-focus)
)}:host(:not(:disabled):focus-visible),:host(:not(:disabled)[focused]){background-color:var(
--mod-closebutton-background-color-focus,var(--spectrum-closebutton-background-color-focus)
)}:host(:not(:disabled).focus-visible) .icon,:host(:not(:disabled)[focused]) .icon{color:var(
--highcontrast-closebutton-icon-color-focus,var(
--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)
)
)}:host(:not(:disabled):focus-visible) .icon,:host(:not(:disabled)[focused]) .icon{color:var(
--highcontrast-closebutton-icon-color-focus,var(
--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)
)
)}:host(:not(:disabled)) .icon{color:var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)}:host(:not(:disabled).is-focused) .icon,:host(:not(:disabled):focus) .icon{color:var(
--highcontrast-closebutton-icon-color-focus,var(
--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)
)
)}:host(:disabled){background-color:var(
--mod-closebutton-background-color-default,var(--spectrum-closebutton-background-color-default)
)}:host(:disabled) .icon{color:var(
--highcontrast-closebutton-icon-color-disabled,var(
--mod-closebutton-icon-color-disabled,var(--spectrum-closebutton-icon-color-disabled)
)
)}:host([variant=black]:not(:disabled)),:host([variant=white]:not(:disabled)){background-color:var(
--highcontrast-closebutton-static-background-color-default,var(
--mod-closebutton-static-background-color-default,var(--spectrum-closebutton-static-background-color-default)
)
)}:host([variant=black]:not(:disabled):hover),:host([variant=white]:not(:disabled):hover){background-color:var(
--highcontrast-closebutton-static-background-color-hover,var(
--mod-closebutton-static-background-color-hover,var(--spectrum-closebutton-static-background-color-hover)
)
)}:host([variant=black]:not(:disabled):hover) .icon,:host([variant=white]:not(:disabled):hover) .icon{color:var(
--highcontrast-closebutton-icon-color-default,var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)
)}:host([variant=black][active]:not(:disabled)),:host([variant=white][active]:not(:disabled)){background-color:var(
--highcontrast-closebutton-static-background-color-down,var(
--mod-closebutton-static-background-color-down,var(--spectrum-closebutton-static-background-color-down)
)
)}:host([variant=black][active]:not(:disabled)) .icon,:host([variant=white][active]:not(:disabled)) .icon{color:var(
--highcontrast-closebutton-icon-color-default,var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)
)}:host([variant=black]:not(:disabled).focus-visible),:host([variant=black][focused]:not(:disabled)),:host([variant=white]:not(:disabled).focus-visible),:host([variant=white][focused]:not(:disabled)){background-color:var(
--highcontrast-closebutton-static-background-color-focus,var(
--mod-closebutton-static-background-color-focus,var(--spectrum-closebutton-static-background-color-focus)
)
)}:host([variant=black]:not(:disabled):focus-visible),:host([variant=black][focused]:not(:disabled)),:host([variant=white]:not(:disabled):focus-visible),:host([variant=white][focused]:not(:disabled)){background-color:var(
--highcontrast-closebutton-static-background-color-focus,var(
--mod-closebutton-static-background-color-focus,var(--spectrum-closebutton-static-background-color-focus)
)
)}:host([variant=black]:not(:disabled).focus-visible) .icon,:host([variant=black][focused]:not(:disabled)) .icon,:host([variant=white]:not(:disabled).focus-visible) .icon,:host([variant=white][focused]:not(:disabled)) .icon{color:var(
--highcontrast-closebutton-icon-color-default,var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)
)}:host([variant=black]:not(:disabled):focus-visible) .icon,:host([variant=black][focused]:not(:disabled)) .icon,:host([variant=white]:not(:disabled):focus-visible) .icon,:host([variant=white][focused]:not(:disabled)) .icon{color:var(
--highcontrast-closebutton-icon-color-default,var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)
)}:host([variant=black]:not(:disabled)) .is-focused .icon,:host([variant=black]:not(:disabled):focus) .icon,:host([variant=white]:not(:disabled)) .is-focused .icon,:host([variant=white]:not(:disabled):focus) .icon{color:var(
--highcontrast-closebutton-icon-color-default,var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)
)}:host([variant=black]:not(:disabled)) .icon,:host([variant=white]:not(:disabled)) .icon{color:var(
--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)
)}:host([variant=black]:disabled) .icon,:host([variant=white]:disabled) .icon{color:var(
--highcontrast-closebutton-icon-disabled,var(
--mod-closebutton-icon-color-disabled,var(--spectrum-closebutton-icon-color-disabled)
)
)}.icon{margin:0}:host{--spectrum-closebutton-background-color-default:var(
--system-spectrum-closebutton-background-color-default
);--spectrum-closebutton-background-color-hover:var(
--system-spectrum-closebutton-background-color-hover
);--spectrum-closebutton-background-color-down:var(
--system-spectrum-closebutton-background-color-down
);--spectrum-closebutton-background-color-focus:var(
--system-spectrum-closebutton-background-color-focus
)}
`,yt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor;const wt={s:()=>u`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>u`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>u`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>u`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};class zt extends(c(k)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,kt,y]}get buttonContent(){return[wt[this.size]()]}}((t,o,e,r)=>{for(var i,a=r>1?void 0:r?xt(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);r&&a&&yt(o,e,a)})([d({reflect:!0})],zt.prototype,"variant",2);var It=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(--spectrum-font-family-base);justify-content:center;line-height:var(--spectrum-line-height-small);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(--spectrum-animation-duration-100) ease-out,border-color var(--spectrum-animation-duration-100) ease-out,color var(--spectrum-animation-duration-100) ease-out,box-shadow var(--spectrum-animation-duration-100) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}:host([disabled]){cursor:default}::slotted([slot=icon]){max-block-size:100%}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host{--spectrum-actionbutton-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-actionbutton-border-radius:var(--spectrum-corner-radius-100);--spectrum-actionbutton-border-width:var(--spectrum-border-width-100);--spectrum-actionbutton-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-actionbutton-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-actionbutton-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-actionbutton-focus-indicator-border-radius:calc(var(--spectrum-actionbutton-border-radius) + var(--spectrum-actionbutton-focus-indicator-gap))}:host([size=xs]){--spectrum-actionbutton-min-width:calc(var(--spectrum-component-edge-to-visual-only-75)*2 + var(--spectrum-workflow-icon-size-75));--spectrum-actionbutton-height:var(--spectrum-component-height-50);--spectrum-actionbutton-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-actionbutton-font-size:var(--spectrum-font-size-50);--spectrum-actionbutton-text-to-visual:var(--spectrum-text-to-visual-50);--spectrum-actionbutton-edge-to-hold-icon:var(
--spectrum-action-button-edge-to-hold-icon-extra-small
);--spectrum-actionbutton-edge-to-visual:calc(var(--spectrum-component-edge-to-visual-50) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-text:calc(var(--spectrum-component-edge-to-text-50) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-50) - var(--spectrum-actionbutton-border-width))}:host([size=s]){--spectrum-actionbutton-min-width:calc(var(--spectrum-component-edge-to-visual-only-75)*2 + var(--spectrum-workflow-icon-size-75));--spectrum-actionbutton-height:var(--spectrum-component-height-75);--spectrum-actionbutton-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-actionbutton-font-size:var(--spectrum-font-size-75);--spectrum-actionbutton-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-actionbutton-edge-to-hold-icon:var(
--spectrum-action-button-edge-to-hold-icon-small
);--spectrum-actionbutton-edge-to-visual:calc(var(--spectrum-component-edge-to-visual-75) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-text:calc(var(--spectrum-component-edge-to-text-75) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-75) - var(--spectrum-actionbutton-border-width))}:host([size=m]){--spectrum-actionbutton-min-width:calc(var(--spectrum-component-edge-to-visual-only-100)*2 + var(--spectrum-workflow-icon-size-100));--spectrum-actionbutton-height:var(--spectrum-component-height-100);--spectrum-actionbutton-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-actionbutton-font-size:var(--spectrum-font-size-100);--spectrum-actionbutton-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-actionbutton-edge-to-hold-icon:var(
--spectrum-action-button-edge-to-hold-icon-medium
);--spectrum-actionbutton-edge-to-visual:calc(var(--spectrum-component-edge-to-visual-100) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-text:calc(var(--spectrum-component-edge-to-text-100) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-100) - var(--spectrum-actionbutton-border-width))}:host([size=l]){--spectrum-actionbutton-min-width:calc(var(--spectrum-component-edge-to-visual-only-200)*2 + var(--spectrum-workflow-icon-size-200));--spectrum-actionbutton-height:var(--spectrum-component-height-200);--spectrum-actionbutton-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-actionbutton-font-size:var(--spectrum-font-size-200);--spectrum-actionbutton-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-actionbutton-edge-to-hold-icon:var(
--spectrum-action-button-edge-to-hold-icon-large
);--spectrum-actionbutton-edge-to-visual:calc(var(--spectrum-component-edge-to-visual-200) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-text:calc(var(--spectrum-component-edge-to-text-200) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-200) - var(--spectrum-actionbutton-border-width))}:host([size=xl]){--spectrum-actionbutton-min-width:calc(var(--spectrum-component-edge-to-visual-only-300)*2 + var(--spectrum-workflow-icon-size-300));--spectrum-actionbutton-height:var(--spectrum-component-height-300);--spectrum-actionbutton-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-actionbutton-font-size:var(--spectrum-font-size-300);--spectrum-actionbutton-text-to-visual:var(--spectrum-text-to-visual-300);--spectrum-actionbutton-edge-to-hold-icon:var(
--spectrum-action-button-edge-to-hold-icon-extra-large
);--spectrum-actionbutton-edge-to-visual:calc(var(--spectrum-component-edge-to-visual-300) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-text:calc(var(--spectrum-component-edge-to-text-300) - var(--spectrum-actionbutton-border-width));--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-300) - var(--spectrum-actionbutton-border-width))}@media (forced-colors:active){:host{--highcontrast-actionbutton-focus-indicator-color:ButtonText}:host:after{forced-color-adjust:none}:host([selected]){--highcontrast-actionbutton-background-color-default:Highlight;--highcontrast-actionbutton-background-color-hover:Highlight;--highcontrast-actionbutton-background-color-focus:Highlight;--highcontrast-actionbutton-background-color-down:Highlight;--highcontrast-actionbutton-background-color-disabled:ButtonFace;--highcontrast-actionbutton-border-color-default:HighlightText;--highcontrast-actionbutton-border-color-hover:HighlightText;--highcontrast-actionbutton-border-color-focus:HighlightText;--highcontrast-actionbutton-border-color-down:HighlightText;--highcontrast-actionbutton-border-color-disabled:GrayText;--highcontrast-actionbutton-content-color-default:HighlightText;--highcontrast-actionbutton-content-color-hover:HighlightText;--highcontrast-actionbutton-content-color-focus:HighlightText;--highcontrast-actionbutton-content-color-down:HighlightText;--highcontrast-actionbutton-content-color-disabled:GrayText}:host([selected]) #label,:host([selected]) .hold-affordance,:host([selected]) ::slotted([slot=icon]){forced-color-adjust:none}}:host{background-color:var(
--highcontrast-actionbutton-background-color-default,var(
--mod-actionbutton-background-color-default,var(--spectrum-actionbutton-background-color-default)
)
);border-color:var(
--highcontrast-actionbutton-border-color-default,var(
--mod-actionbutton-border-color-default,var(--spectrum-actionbutton-border-color-default)
)
);border-radius:var(
--mod-actionbutton-border-radius,var(--spectrum-actionbutton-border-radius)
);border-width:var(
--mod-actionbutton-border-width,var(--spectrum-actionbutton-border-width)
);color:var(
--highcontrast-actionbutton-content-color-default,var(
--mod-actionbutton-content-color-default,var(--spectrum-actionbutton-content-color-default)
)
);height:var(--mod-actionbutton-height,var(--spectrum-actionbutton-height));min-inline-size:var(
--mod-actionbutton-min-width,var(--spectrum-actionbutton-min-width)
);padding-inline-end:var(
--mod-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)
);padding-inline-start:var(
--mod-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)
);position:relative}:host(:hover){background-color:var(
--highcontrast-actionbutton-background-color-hover,var(
--mod-actionbutton-background-color-hover,var(--spectrum-actionbutton-background-color-hover)
)
);border-color:var(
--highcontrast-actionbutton-border-color-hover,var(
--mod-actionbutton-border-color-hover,var(--spectrum-actionbutton-border-color-hover)
)
);color:var(
--highcontrast-actionbutton-content-color-hover,var(
--mod-actionbutton-content-color-hover,var(--spectrum-actionbutton-content-color-hover)
)
)}:host(.focus-visible){background-color:var(
--highcontrast-actionbutton-background-color-focus,var(
--mod-actionbutton-background-color-focus,var(--spectrum-actionbutton-background-color-focus)
)
);border-color:var(
--highcontrast-actionbutton-border-color-focus,var(
--mod-actionbutton-border-color-focus,var(--spectrum-actionbutton-border-color-focus)
)
);color:var(
--highcontrast-actionbutton-content-color-focus,var(
--mod-actionbutton-content-color-focus,var(--spectrum-actionbutton-content-color-focus)
)
)}:host(:focus-visible){background-color:var(
--highcontrast-actionbutton-background-color-focus,var(
--mod-actionbutton-background-color-focus,var(--spectrum-actionbutton-background-color-focus)
)
);border-color:var(
--highcontrast-actionbutton-border-color-focus,var(
--mod-actionbutton-border-color-focus,var(--spectrum-actionbutton-border-color-focus)
)
);color:var(
--highcontrast-actionbutton-content-color-focus,var(
--mod-actionbutton-content-color-focus,var(--spectrum-actionbutton-content-color-focus)
)
)}:host([active]){background-color:var(
--highcontrast-actionbutton-background-color-down,var(
--mod-actionbutton-background-color-down,var(--spectrum-actionbutton-background-color-down)
)
);border-color:var(
--highcontrast-actionbutton-border-color-down,var(
--mod-actionbutton-border-color-down,var(--spectrum-actionbutton-border-color-down)
)
);color:var(
--highcontrast-actionbutton-content-color-down,var(
--mod-actionbutton-content-color-down,var(--spectrum-actionbutton-content-color-down)
)
)}:host([disabled]),:host([disabled]){background-color:var(
--highcontrast-actionbutton-background-color-disabled,var(
--mod-actionbutton-background-color-disabled,var(--spectrum-actionbutton-background-color-disabled)
)
);border-color:var(
--highcontrast-actionbutton-border-color-disabled,var(
--mod-actionbutton-border-color-disabled,var(--spectrum-actionbutton-border-color-disabled)
)
);color:var(
--highcontrast-actionbutton-content-color-disabled,var(
--mod-actionbutton-content-color-disabled,var(--spectrum-actionbutton-content-color-disabled)
)
)}::slotted([slot=icon]){color:inherit;height:var(
--mod-actionbutton-icon-size,var(--spectrum-actionbutton-icon-size)
);margin-inline-start:calc((var(
--mod-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--mod-actionbutton-edge-to-visual,
var(--spectrum-actionbutton-edge-to-visual)
))*-1);padding-inline-start:calc((var(
--mod-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--mod-actionbutton-edge-to-visual,
var(--spectrum-actionbutton-edge-to-visual)
))*-1);width:var(
--mod-actionbutton-icon-size,var(--spectrum-actionbutton-icon-size)
)}slot[name=icon]+#label{padding-inline-end:0;padding-inline-start:var(
--mod-actionbutton-text-to-visual,var(--spectrum-actionbutton-text-to-visual)
)}.hold-affordance+::slotted([slot=icon]),slot[icon-only]::slotted([slot=icon]){margin-inline-end:calc((var(
--mod-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--mod-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1);margin-inline-start:calc((var(
--mod-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--mod-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1)}#label{color:inherit;font-size:var(
--mod-actionbutton-font-size,var(--spectrum-actionbutton-font-size)
);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}[dir=rtl] .hold-affordance{transform:matrix(-1,0,0,1,0,0)}.hold-affordance{color:inherit;inset-block-end:calc(var(
--mod-actionbutton-edge-to-hold-icon,
var(--spectrum-actionbutton-edge-to-hold-icon)
) - var(
--mod-actionbutton-border-width,
var(--spectrum-actionbutton-border-width)
));inset-inline-end:calc(var(
--mod-actionbutton-edge-to-hold-icon,
var(--spectrum-actionbutton-edge-to-hold-icon)
) - var(
--mod-actionbutton-border-width,
var(--spectrum-actionbutton-border-width)
));position:absolute}:host{transition:border-color var(
--mod-actionbutton-animation-duration,var(--spectrum-actionbutton-animation-duration)
) ease-in-out}:host:after{border-radius:var(
--mod-actionbutton-focus-indicator-border-radius,var(--spectrum-actionbutton-focus-indicator-border-radius)
);content:"";inset:0;margin:calc((var(
--mod-actionbutton-focus-indicator-gap,
var(--spectrum-actionbutton-focus-indicator-gap)
) + var(
--mod-actionbutton-border-width,
var(--spectrum-actionbutton-border-width)
))*-1);pointer-events:none;position:absolute;transition:box-shadow var(
--mod-actionbutton-animation-duration,var(--spectrum-actionbutton-animation-duration)
) ease-in-out}:host(.focus-visible){box-shadow:none}:host(:focus-visible){box-shadow:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-actionbutton-focus-indicator-thickness,var(--spectrum-actionbutton-focus-indicator-thickness)
) var(
--highcontrast-actionbutton-focus-indicator-color,var(
--mod-actionbutton-focus-indicator-color,var(--spectrum-actionbutton-focus-indicator-color)
)
)}:host(:focus-visible):after{box-shadow:0 0 0 var(
--mod-actionbutton-focus-indicator-thickness,var(--spectrum-actionbutton-focus-indicator-thickness)
) var(
--highcontrast-actionbutton-focus-indicator-color,var(
--mod-actionbutton-focus-indicator-color,var(--spectrum-actionbutton-focus-indicator-color)
)
)}:host{--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-background-color-focus
);--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-border-color-focus
);--spectrum-actionbutton-content-color-default:var(
--system-spectrum-actionbutton-content-color-default
);--spectrum-actionbutton-content-color-hover:var(
--system-spectrum-actionbutton-content-color-hover
);--spectrum-actionbutton-content-color-down:var(
--system-spectrum-actionbutton-content-color-down
);--spectrum-actionbutton-content-color-focus:var(
--system-spectrum-actionbutton-content-color-focus
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-border-color-disabled
);--spectrum-actionbutton-content-color-disabled:var(
--system-spectrum-actionbutton-content-color-disabled
)}:host([quiet]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-quiet-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-quiet-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-quiet-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-quiet-background-color-focus
);--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-quiet-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-quiet-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-quiet-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-quiet-border-color-focus
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-quiet-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-quiet-border-color-disabled
)}:host([selected]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-selected-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-selected-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-selected-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-selected-background-color-focus
);--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-selected-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-selected-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-selected-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-selected-border-color-focus
);--spectrum-actionbutton-content-color-default:var(
--system-spectrum-actionbutton-selected-content-color-default
);--spectrum-actionbutton-content-color-hover:var(
--system-spectrum-actionbutton-selected-content-color-hover
);--spectrum-actionbutton-content-color-down:var(
--system-spectrum-actionbutton-selected-content-color-down
);--spectrum-actionbutton-content-color-focus:var(
--system-spectrum-actionbutton-selected-content-color-focus
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-selected-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-selected-border-color-disabled
)}:host([selected][emphasized]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-selected-emphasized-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-selected-emphasized-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-selected-emphasized-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-selected-emphasized-background-color-focus
)}:host([variant=black][quiet]){--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-staticblack-quiet-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-staticblack-quiet-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-staticblack-quiet-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-staticblack-quiet-border-color-focus
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticblack-quiet-border-color-disabled
)}:host([variant=white][quiet]){--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-staticwhite-quiet-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-staticwhite-quiet-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-staticwhite-quiet-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-staticwhite-quiet-border-color-focus
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-quiet-border-color-disabled
)}:host([variant=black]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-staticblack-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-staticblack-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-staticblack-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-staticblack-background-color-focus
);--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-staticblack-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-staticblack-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-staticblack-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-staticblack-border-color-focus
);--spectrum-actionbutton-content-color-default:var(
--system-spectrum-actionbutton-staticblack-content-color-default
);--spectrum-actionbutton-content-color-hover:var(
--system-spectrum-actionbutton-staticblack-content-color-hover
);--spectrum-actionbutton-content-color-down:var(
--system-spectrum-actionbutton-staticblack-content-color-down
);--spectrum-actionbutton-content-color-focus:var(
--system-spectrum-actionbutton-staticblack-content-color-focus
);--spectrum-actionbutton-focus-indicator-color:var(
--system-spectrum-actionbutton-staticblack-focus-indicator-color
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-staticblack-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticblack-border-color-disabled
);--spectrum-actionbutton-content-color-disabled:var(
--system-spectrum-actionbutton-staticblack-content-color-disabled
)}:host([variant=black][selected]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-staticblack-selected-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-staticblack-selected-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-staticblack-selected-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-staticblack-selected-background-color-focus
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticblack-selected-border-color-disabled
);--spectrum-actionbutton-content-color-default:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticblack-selected-content-color-default
)
);--spectrum-actionbutton-content-color-hover:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticblack-selected-content-color-hover
)
);--spectrum-actionbutton-content-color-down:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticblack-selected-content-color-down
)
);--spectrum-actionbutton-content-color-focus:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticblack-selected-content-color-focus
)
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-staticblack-selected-background-color-disabled
)}:host([variant=white]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-staticwhite-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-staticwhite-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-staticwhite-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-staticwhite-background-color-focus
);--spectrum-actionbutton-border-color-default:var(
--system-spectrum-actionbutton-staticwhite-border-color-default
);--spectrum-actionbutton-border-color-hover:var(
--system-spectrum-actionbutton-staticwhite-border-color-hover
);--spectrum-actionbutton-border-color-down:var(
--system-spectrum-actionbutton-staticwhite-border-color-down
);--spectrum-actionbutton-border-color-focus:var(
--system-spectrum-actionbutton-staticwhite-border-color-focus
);--spectrum-actionbutton-content-color-default:var(
--system-spectrum-actionbutton-staticwhite-content-color-default
);--spectrum-actionbutton-content-color-hover:var(
--system-spectrum-actionbutton-staticwhite-content-color-hover
);--spectrum-actionbutton-content-color-down:var(
--system-spectrum-actionbutton-staticwhite-content-color-down
);--spectrum-actionbutton-content-color-focus:var(
--system-spectrum-actionbutton-staticwhite-content-color-focus
);--spectrum-actionbutton-focus-indicator-color:var(
--system-spectrum-actionbutton-staticwhite-focus-indicator-color
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-border-color-disabled
);--spectrum-actionbutton-content-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-content-color-disabled
)}:host([variant=white][selected]){--spectrum-actionbutton-background-color-default:var(
--system-spectrum-actionbutton-staticwhite-selected-background-color-default
);--spectrum-actionbutton-background-color-hover:var(
--system-spectrum-actionbutton-staticwhite-selected-background-color-hover
);--spectrum-actionbutton-background-color-down:var(
--system-spectrum-actionbutton-staticwhite-selected-background-color-down
);--spectrum-actionbutton-background-color-focus:var(
--system-spectrum-actionbutton-staticwhite-selected-background-color-focus
);--spectrum-actionbutton-content-color-default:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticwhite-selected-content-color-default
)
);--spectrum-actionbutton-content-color-hover:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticwhite-selected-content-color-hover
)
);--spectrum-actionbutton-content-color-down:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticwhite-selected-content-color-down
)
);--spectrum-actionbutton-content-color-focus:var(
--mod-actionbutton-static-content-color,var(
--system-spectrum-actionbutton-staticwhite-selected-content-color-focus
)
);--spectrum-actionbutton-background-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-selected-background-color-disabled
);--spectrum-actionbutton-border-color-disabled:var(
--system-spectrum-actionbutton-staticwhite-selected-border-color-disabled
)}:host{display:inline-flex;flex-direction:row}:host([disabled]){cursor:auto;pointer-events:none}:host([dir]){-webkit-appearance:none}::slotted([slot=icon]){flex-shrink:0}#button{inset:0;position:absolute}#label{flex-grow:var(--spectrum-actionbutton-label-flex-grow);text-align:var(--spectrum-actionbutton-label-text-align)}:host([size=xs]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xs
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xs
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);min-width:var(--spectrum-actionbutton-height,0)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
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
)}@media (forced-colors:active){:host{--highcontrast-actionbutton-border-color-disabled:GrayText;--highcontrast-actionbutton-content-color-disabled:GrayText}}
`;var Ct=o`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-CornerTriangle75{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
)}.spectrum-UIIcon-CornerTriangle100{height:var(--spectrum-alias-ui-icon-cornertriangle-size-100);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}.spectrum-UIIcon-CornerTriangle200{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
)}.spectrum-UIIcon-CornerTriangle300{height:var(--spectrum-alias-ui-icon-cornertriangle-size-300);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`,qt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,Ut=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?Tt(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&qt(o,e,a),a};const St={xs:"spectrum-UIIcon-CornerTriangle75",s:"spectrum-UIIcon-CornerTriangle75",m:"spectrum-UIIcon-CornerTriangle100",l:"spectrum-UIIcon-CornerTriangle200",xl:"spectrum-UIIcon-CornerTriangle300"};let Et;class At extends(c(x,{validSizes:["xs","s","m","l","xl"]})){constructor(){super(),this.emphasized=!1,this.holdAffordance=!1,this.quiet=!1,this.role="button",this.selected=!1,this.toggles=!1,this._value="",this.onClick=()=>{this.toggles&&(this.selected=!this.selected,this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=!this.selected))},this.addEventListener("click",this.onClick),this.addEventListener("pointerdown",this.onPointerdown)}static get styles(){return[It,Ct]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}onPointerdown(t){0===t.button&&(this.addEventListener("pointerup",this.onPointerup),this.addEventListener("pointercancel",this.onPointerup),Et=setTimeout((()=>{this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"pointer"}}))}),300))}onPointerup(){clearTimeout(Et),this.removeEventListener("pointerup",this.onPointerup),this.removeEventListener("pointercancel",this.onPointerup)}handleKeydown(t){if(!this.holdAffordance)return super.handleKeydown(t);const{code:o,altKey:e}=t;("Space"===o||e&&"ArrowDown"===o)&&(t.preventDefault(),"ArrowDown"===o&&(t.stopPropagation(),t.stopImmediatePropagation()),this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeyup(t){if(!this.holdAffordance)return super.handleKeyup(t);const{code:o,altKey:e}=t;("Space"===o||e&&"ArrowDown"===o)&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"keyboard"}})),this.active=!1)}get buttonContent(){const t=super.buttonContent;return this.holdAffordance&&t.unshift(u`
                <sp-icon-corner-triangle300
                    class="hold-affordance ${St[this.size]}"
                ></sp-icon-corner-triangle300>
            `),t}updated(t){super.updated(t);const o="button"===this.role&&(this.selected||this.toggles);(t.has("selected")||t.has("role"))&&(o?this.setAttribute("aria-pressed",this.selected?"true":"false"):this.removeAttribute("aria-pressed"))}}Ut([d({type:Boolean,reflect:!0})],At.prototype,"emphasized",2),Ut([d({type:Boolean,reflect:!0,attribute:"hold-affordance"})],At.prototype,"holdAffordance",2),Ut([d({type:Boolean,reflect:!0})],At.prototype,"quiet",2),Ut([d({reflect:!0})],At.prototype,"role",2),Ut([d({type:Boolean,reflect:!0})],At.prototype,"selected",2),Ut([d({type:Boolean,reflect:!0})],At.prototype,"toggles",2),Ut([d({reflect:!0})],At.prototype,"variant",2),Ut([d({type:String})],At.prototype,"value",1),customElements.define("sp-action-button",At),customElements.define("sp-menu-item",R);var Bt=o`
:host([size=s]){--spectrum-link-primary-text-size:var(
--spectrum-link-s-primary-text-size,var(--spectrum-global-dimension-font-size-75)
)}:host([size=m]){--spectrum-link-primary-text-size:var(
--spectrum-link-m-primary-text-size,var(--spectrum-global-dimension-font-size-100)
)}:host([size=l]){--spectrum-link-primary-text-size:var(
--spectrum-link-l-primary-text-size,var(--spectrum-global-dimension-font-size-200)
)}:host([size=xl]){--spectrum-link-primary-text-size:var(
--spectrum-link-xl-primary-text-size,var(--spectrum-global-dimension-font-size-300)
)}a{-webkit-text-decoration-skip:objects;background-color:transparent;cursor:pointer;font-size:var(--spectrum-link-primary-text-size);outline:none;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}a,a.focus-visible,a.focus-visible{text-decoration:underline}a.focus-visible{-webkit-text-decoration-style:double;text-decoration-style:double}a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([quiet]) a{text-decoration:none}:host([quiet]) a:hover{text-decoration:underline}a{color:var(
--spectrum-link-m-primary-text-color,var(--spectrum-alias-link-primary-text-color-default)
)}a:hover{color:var(
--spectrum-link-m-primary-text-color-hover,var(--spectrum-alias-link-primary-text-color-hover)
)}a:active{color:var(
--spectrum-link-m-primary-text-color-down,var(--spectrum-alias-link-primary-text-color-down)
)}a.focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-link-primary-text-color-key-focus)
)}a:focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-link-primary-text-color-key-focus)
)}:host([variant=secondary]) a{color:inherit}:host([variant=secondary]) a:hover{color:inherit}:host([variant=secondary]) a:active{color:inherit}:host([variant=secondary]) a:focus{color:inherit}:host([over-background]) a{color:var(
--spectrum-link-m-primary-overbackground-text-color,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:hover{color:var(
--spectrum-link-m-primary-overbackground-text-color-hover,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:active{color:var(
--spectrum-link-m-primary-overbackground-text-color-down,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:focus{color:var(
--spectrum-link-m-primary-overbackground-text-color-key-focus,var(--spectrum-alias-text-color-overbackground)
)}@media (forced-colors:active){:host([variant=secondary]) a{color:linktext}:host([variant=secondary]) a:hover{color:linktext}:host([variant=secondary]) a:active{color:linktext}:host([variant=secondary]) a:focus{color:linktext}}:host{display:inline}:host(:focus){outline:none}:host([href]) a.focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([href]) a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}
`,Ft=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,jt=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?Pt(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&Ft(o,e,a),a};class Rt extends(c(e(r),{noDefaultSize:!0})){static get styles(){return[Bt]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}jt([a("#anchor")],Rt.prototype,"anchorElement",2),jt([d({type:String,reflect:!0})],Rt.prototype,"variant",2),customElements.define("sp-link",Rt);var Lt=o`
:host{--spectrum-divider-thickness:var(
--spectrum-divider-thickness-medium
);--spectrum-divider-background-color:var(
--spectrum-divider-background-color-medium
);--spectrum-divider-background-color-small:var(--spectrum-gray-300);--spectrum-divider-background-color-medium:var(--spectrum-gray-300);--spectrum-divider-background-color-large:var(--spectrum-gray-800);--spectrum-divider-background-color-small-static-white:var(
--spectrum-transparent-white-300
);--spectrum-divider-background-color-medium-static-white:var(
--spectrum-transparent-white-300
);--spectrum-divider-background-color-large-static-white:var(
--spectrum-transparent-white-800
);--spectrum-divider-background-color-small-static-black:var(
--spectrum-transparent-black-300
);--spectrum-divider-background-color-medium-static-black:var(
--spectrum-transparent-black-300
);--spectrum-divider-background-color-large-static-black:var(
--spectrum-transparent-black-800
)}:host([size=s]){--spectrum-divider-thickness:var(
--spectrum-divider-thickness-small
);--spectrum-divider-background-color:var(
--spectrum-divider-background-color-small
)}:host([size=m]){--spectrum-divider-thickness:var(
--spectrum-divider-thickness-medium
);--spectrum-divider-background-color:var(
--spectrum-divider-background-color-medium
)}:host([size=l]){--spectrum-divider-thickness:var(
--spectrum-divider-thickness-large
);--spectrum-divider-background-color:var(
--spectrum-divider-background-color-large
)}@media (forced-colors:active){:host{--spectrum-divider-background-color:CanvasText;--spectrum-divider-background-color-small-static-white:CanvasText;--spectrum-divider-background-color-medium-static-white:CanvasText;--spectrum-divider-background-color-large-static-white:CanvasText;--spectrum-divider-background-color-small-static-black:CanvasText;--spectrum-divider-background-color-medium-static-black:CanvasText;--spectrum-divider-background-color-large-static-black:CanvasText}}:host{background-color:var(
--mod-divider-background-color,var(--spectrum-divider-background-color)
);block-size:var(
--mod-divider-thickness,var(--spectrum-divider-thickness)
);border:none;border-radius:var(
--mod-divider-thickness,var(--spectrum-divider-thickness)
);border-width:var(
--mod-divider-thickness,var(--spectrum-divider-thickness)
);inline-size:100%;overflow:visible}:host([size=s]) .spectrum-Divider--staticWhite{--spectrum-divider-background-color:var(
--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-small-static-white)
)}:host([size=m]) .spectrum-Divider--staticWhite{--spectrum-divider-background-color:var(
--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-medium-static-white)
)}:host([size=l]) .spectrum-Divider--staticWhite{--spectrum-divider-background-color:var(
--mod-divider-background-color-large-static-white,var(--spectrum-divider-background-color-large-static-white)
)}:host([size=s]) .spectrum-Divider--staticBlack{--spectrum-divider-background-color:var(
--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-small-static-black)
)}:host([size=m]) .spectrum-Divider--staticBlack{--spectrum-divider-background-color:var(
--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-medium-static-black)
)}:host([size=l]) .spectrum-Divider--staticBlack{--spectrum-divider-background-color:var(
--mod-divider-background-color-large-static-black,var(--spectrum-divider-background-color-large-static-black)
)}:host([vertical]){block-size:100%;inline-size:var(
--mod-divider-thickness,var(--spectrum-divider-thickness)
)}:host{display:block}hr{border:none;margin:0}
`,Ot=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor;class Mt extends(c(m,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.vertical=!1}render(){return u``}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}updated(t){super.updated(t),t.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}}Mt.styles=[Lt],((t,o,e,r)=>{for(var i,a=r>1?void 0:r?Dt(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);r&&a&&Ot(o,e,a)})([d({type:Boolean,reflect:!0})],Mt.prototype,"vertical",2),customElements.define("sp-divider",Mt),customElements.define("sp-close-button",zt);var _t=o`
:host{--spectrum-toast-font-weight:var(
--spectrum-font-weight-regular
);--spectrum-toast-font-size:var(--spectrum-font-size-100);--spectrum-toast-corner-radius:var(--spectrum-corner-radius-100);--spectrum-toast-block-size:var(--spectrum-toast-height);--spectrum-toast-border-width:var(--spectrum-border-width-100);--spectrum-toast-line-height:var(--spectrum-line-height-100);--spectrum-toast-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-toast-spacing-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-toast-spacing-start-edge-to-text-and-icon:var(
--spectrum-spacing-300
);--spectrum-toast-spacing-text-and-action-button-to-divider:var(
--spectrum-spacing-300
);--spectrum-toast-spacing-top-edge-to-divider:var(--spectrum-spacing-100);--spectrum-toast-spacing-bottom-edge-to-divider:var(
--spectrum-spacing-100
);--spectrum-toast-spacing-top-edge-to-icon:var(
--spectrum-toast-top-to-workflow-icon
);--spectrum-toast-spacing-text-to-action-button-horizontal:var(
--spectrum-spacing-300
);--spectrum-toast-spacing-close-button:var(--spectrum-spacing-100);--spectrum-toast-spacing-block-start:var(--spectrum-spacing-100);--spectrum-toast-spacing-block-end:var(--spectrum-spacing-100);--spectrum-toast-spacing-top-edge-to-text:var(
--spectrum-toast-top-to-text
);--spectrum-toast-spacing-bottom-edge-to-text:var(
--spectrum-toast-bottom-to-text
);--spectrum-toast-negative-background-color-default:var(
--spectrum-negative-background-color-default
);--spectrum-toast-positive-background-color-default:var(
--spectrum-positive-background-color-default
);--spectrum-toast-informative-background-color-default:var(
--spectrum-informative-background-color-default
);--spectrum-toast-text-and-icon-color:var(--spectrum-white);--spectrum-toast-divider-color:var(--spectrum-transparent-white-300)}@media (forced-colors:active){:host{--highcontrast-toast-border-color:ButtonText;border:var(
--mod-toast-border-width,var(--spectrum-toast-border-width)
) solid var(--highcontrast-toast-border-color,transparent)}}:host{-webkit-font-smoothing:antialiased;align-items:stretch;background-color:var(
--highcontrast-toast-background-color-default,var(
--mod-toast-background-color-default,var(--spectrum-toast-background-color-default)
)
);border-radius:var(
--mod-toast-corner-radius,var(--spectrum-toast-corner-radius)
);box-sizing:border-box;color:var(
--highcontrast-toast-background-color-default,var(
--mod-toast-background-color-default,var(--spectrum-toast-background-color-default)
)
);display:inline-flex;flex-direction:row;font-size:var(--mod-toast-font-size,var(--spectrum-toast-font-size));font-weight:var(
--mod-toast-font-weight,var(--spectrum-toast-font-weight)
);min-block-size:var(--spectrum-toast-block-size);padding-inline-start:var(
--mod-toast-spacing-start-edge-to-text-and-icon,var(--spectrum-toast-spacing-start-edge-to-text-and-icon)
)}:host([variant=negative]){background-color:var(
--highcontrast-toast-negative-background-color-default,var(
--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)
)
);color:var(
--highcontrast-toast-negative-background-color-default,var(
--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)
)
)}:host([variant=negative]) .closeButton.focus-visible:not(:active){color:var(
--highcontrast-toast-negative-background-color-default,var(
--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)
)
)}:host([variant=negative]) .closeButton:focus-visible:not(:active){color:var(
--highcontrast-toast-negative-background-color-default,var(
--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)
)
)}:host([variant=info]){background-color:var(
--highcontrast-toast-informative-background-color-default,var(
--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)
)
);color:var(
--highcontrast-toast-informative-background-color-default,var(
--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)
)
)}:host([variant=info]) .closeButton.focus-visible:not(:active){color:var(
--highcontrast-toast-informative-background-color-default,var(
--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)
)
)}:host([variant=info]) .closeButton:focus-visible:not(:active){color:var(
--highcontrast-toast-informative-background-color-default,var(
--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)
)
)}:host([variant=positive]){background-color:var(
--highcontrast-toast-positive-background-color-default,var(
--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)
)
);color:var(
--highcontrast-toast-positive-background-color-default,var(
--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)
)
)}:host([variant=positive]) .closeButton.focus-visible:not(:active){color:var(
--highcontrast-toast-positive-background-color-default,var(
--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)
)
)}:host([variant=positive]) .closeButton:focus-visible:not(:active){color:var(
--highcontrast-toast-positive-background-color-default,var(
--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)
)
)}.type{flex-grow:0;flex-shrink:0;margin-block-start:var(
--mod-toast-spacing-top-edge-to-icon,var(--spectrum-toast-spacing-top-edge-to-icon)
);margin-inline-end:var(
--mod-toast-spacing-icon-to-text,var(--spectrum-toast-spacing-icon-to-text)
);margin-inline-start:0}.content,.type{color:var(
--highcontrast-toast-text-and-icon-color,var(
--mod-toast-text-and-icon-color,var(--spectrum-toast-text-and-icon-color)
)
)}.content{box-sizing:border-box;display:inline-block;flex:1 1 auto;line-height:var(
--mod-toast-line-height,var(--spectrum-toast-line-height)
);padding-block-end:calc(var(
--mod-toast-spacing-bottom-edge-to-text,
var(--spectrum-toast-spacing-bottom-edge-to-text)
) - var(
--mod-toast-spacing-block-end,
var(--spectrum-toast-spacing-block-end)
));padding-block-start:calc(var(
--mod-toast-spacing-top-edge-to-text,
var(--spectrum-toast-spacing-top-edge-to-text)
) - var(
--mod-toast-spacing-block-start,
var(--spectrum-toast-spacing-block-start)
));padding-inline-end:var(
--mod-toast-spacing-text-to-action-button-horizontal,var(--spectrum-toast-spacing-text-to-action-button-horizontal)
);padding-inline-start:0;text-align:start}.content:lang(ja),.content:lang(ko),.content:lang(zh){line-height:var(
--mod-toast-line-height-cjk,var(--spectrum-toast-line-height-cjk)
)}.buttons{align-items:flex-start;border-inline-start-color:var(
--mod-toast-divider-color,var(--spectrum-toast-divider-color)
);display:flex;flex:0 0 auto;margin-block-end:var(
--mod-toast-spacing-bottom-edge-to-divider,var(--spectrum-toast-spacing-bottom-edge-to-divider)
);margin-block-start:var(
--mod-toast-spacing-top-edge-to-divider,var(--spectrum-toast-spacing-top-edge-to-divider)
);padding-inline-end:var(
--mod-toast-spacing-close-button,var(--spectrum-toast-spacing-close-button)
)}.buttons .spectrum-CloseButton{align-self:flex-start}.body{align-items:center;align-self:center;display:flex;flex:1 1 auto;flex-wrap:wrap;padding-block-end:var(
--mod-toast-spacing-block-end,var(--spectrum-toast-spacing-block-end)
);padding-block-start:var(
--mod-toast-spacing-block-start,var(--spectrum-toast-spacing-block-start)
)}.body ::slotted([slot=action]){margin-inline-end:var(
--mod-toast-spacing-text-and-action-button-to-divider,var(--spectrum-toast-spacing-text-and-action-button-to-divider)
)}:host([dir=ltr]) .body ::slotted([slot=action]){margin-left:auto}:host([dir=rtl]) .body ::slotted([slot=action]){margin-right:auto;margin-inline-end:var(
--mod-toast-spacing-text-and-action-button-to-divider,var(--spectrum-toast-spacing-text-and-action-button-to-divider)
)}.body+.buttons{border-inline-start-style:solid;border-inline-start-width:1px;padding-inline-start:var(
--mod-toast-spacing-close-button,var(--spectrum-toast-spacing-close-button)
)}:host{--spectrum-toast-background-color-default:var(
--system-spectrum-toast-background-color-default
)}:host(:not([open])){display:none}
`,Ht=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,Gt=(t,o,e,r)=>{for(var i,a=r>1?void 0:r?$t(o,e):o,c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r?i(o,e,a):i(a))||a);return r&&a&&Ht(o,e,a),a};const Kt=["negative","positive","info","error","warning"];class Wt extends m{constructor(){super(...arguments),this.open=!1,this._timeout=null,this._variant="",this.countdownStart=0,this.nextCount=-1,this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.shouldClose(),this.countdownStart=0):this.countdown()},this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown)},this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown)},this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown()}}static get styles(){return[_t]}set timeout(t){const o=null!==typeof t&&t>0?Math.max(6e3,t):null,e=this.timeout;o&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=o,this.requestUpdate("timeout",e)}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const o=this.variant;Kt.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",o)}get variant(){return this._variant}renderIcon(t){switch(t){case"info":return u`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;case"negative":case"error":case"warning":return u`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;case"positive":case"success":return u`
                    <sp-icon-checkmark-circle
                        label="Success"
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;default:return u``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown)}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close()}close(){this.open=!1}render(){return u`
            ${this.renderIcon(this.variant)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    variant="white"
                ></sp-close-button>
            </div>
        `}updated(t){super.updated(t),t.has("open")&&(this.open?this.timeout&&this.startCountdown():this.timeout&&this.stopCountdown()),t.has("timeout")&&(null!==this.timeout&&this.open?this.startCountdown():this.stopCountdown())}}Gt([d({type:Boolean,reflect:!0})],Wt.prototype,"open",2),Gt([d({type:Number})],Wt.prototype,"timeout",1),Gt([d({type:String})],Wt.prototype,"variant",1),customElements.define("sp-toast",Wt);export{V as D,Y as I,H as M,dt as P,w as a,I as f,Q as h,C as o,Lt as r};
//# sourceMappingURL=e6a681ee.js.map
