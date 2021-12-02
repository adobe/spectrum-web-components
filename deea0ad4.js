import{T as t}from"./09199540.js";import{T as e,y as o,_ as r,e as c,S as i,x as s}from"./62b05a9e.js";import{r as n}from"./e50c5e8d.js";import{e as a,a as l,t as u,L as m,b as d,c as p,i as b,S as v,d as h,B as g}from"./60899823.js";import"./4e3d38a5.js";import"./c24d2ae8.js";import"./b86f55ac.js";import"./4acefc0c.js";customElements.define("sp-theme",t);const x=a(class extends l{constructor(t){var e;if(super(t),t.type!==u.ATTRIBUTE||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[o]){var r,c;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in o)o[t]&&!(null===(r=this.et)||void 0===r?void 0:r.has(t))&&this.st.add(t);return this.render(o)}const i=t.element.classList;this.st.forEach((t=>{t in o||(i.remove(t),this.st.delete(t))}));for(const t in o){const e=!!o[t];e===this.st.has(t)||(null===(c=this.et)||void 0===c?void 0:c.has(t))||(e?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return e}});var y=n`#button{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}#button:focus{outline:0}#button::-moz-focus-inner{border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}#button:disabled{cursor:default}:host([dir=ltr]) #button{padding-left:var(
--spectrum-picker-textonly-padding-left
);padding-right:var(--spectrum-picker-textonly-padding-right)}:host([dir=rtl]) #button{padding-left:var(--spectrum-picker-textonly-padding-right);padding-right:var(
--spectrum-picker-textonly-padding-left
)}#button{align-items:center;border-radius:var(--spectrum-picker-texticon-border-radius);border-style:solid;border-width:var(--spectrum-picker-texticon-border-size);display:flex;height:var(--spectrum-picker-texticon-height);justify-content:center;margin:0;min-width:var(--spectrum-picker-texticon-min-width);padding-bottom:0;padding-top:0;transition:background-color var(--spectrum-global-animation-duration-100,.13s),box-shadow var(--spectrum-global-animation-duration-100,.13s),border-color var(--spectrum-global-animation-duration-100,.13s);width:var(--spectrum-picker-texticon-width)}#button:disabled,:host([disabled]) #button{border-width:var(
--spectrum-picker-texticon-disabled-border-size
);cursor:default}:host([dir=ltr]) #button .icon{margin-right:var(
--spectrum-picker-texticon-icon-gap
)}:host([dir=rtl]) #button .icon{margin-left:var(
--spectrum-picker-texticon-icon-gap
)}.icon{flex-shrink:0}:host([dir=ltr]) #button #label+.icon{margin-left:var(
--spectrum-picker-texticon-icon-gap
)}:host([dir=rtl]) #button #label+.icon{margin-right:var(
--spectrum-picker-texticon-icon-gap
)}:host([size=s]){--spectrum-picker-texticon-border-size:var(
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
);--spectrum-picker-texticon-height:var(
--spectrum-picker-s-texticon-height,var(--spectrum-global-dimension-size-300)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-s-texticon-min-width,var(--spectrum-global-dimension-size-450)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-s-texticon-width,var(--spectrum-global-dimension-size-2000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-s-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
)}:host([size=m]){--spectrum-picker-texticon-border-size:var(
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
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
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
);--spectrum-picker-texticon-height:var(
--spectrum-picker-l-texticon-height,var(--spectrum-global-dimension-size-500)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-l-texticon-min-width,var(--spectrum-global-dimension-size-750)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-l-texticon-width,var(--spectrum-global-dimension-size-2500)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-l-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
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
);--spectrum-picker-texticon-height:var(
--spectrum-picker-xl-texticon-height,var(--spectrum-global-dimension-size-600)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-xl-texticon-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-xl-texticon-width,var(--spectrum-global-dimension-size-3000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-xl-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
)}:host{--spectrum-picker-texticon-min-width:var(
--spectrum-global-dimension-size-400
);--spectrum-picker-texticon-disabled-border-size:0;--spectrum-picker-texticon-popover-max-width:var(
--spectrum-global-dimension-size-3000
);--spectrum-picker-texticon-width:var(
--spectrum-global-dimension-size-2400
);--spectrum-picker-texticon-border-size-increase-focus:1px}:host([quiet]) #button{--spectrum-picker-texticon-border-size:0;--spectrum-picker-texticon-border-radius:0;--spectrum-picker-textonly-padding-left:0;--spectrum-picker-textonly-padding-right:0}:host([quiet]) #button{min-width:0;width:auto}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{box-shadow:none}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{box-shadow:none}:host([dir=ltr]) #label{text-align:left}:host([dir=rtl]) #label{text-align:right}#label{flex:1 1 auto;font-size:var(--spectrum-picker-texticon-text-size);height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);line-height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#label.placeholder{font-style:var(--spectrum-picker-texticon-placeholder-font-style);font-weight:var(
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
)}:host([dir=ltr]) .spectrum-Picker-popover--quiet{margin-left:calc(-1*(var(--spectrum-picker-m-quiet-texticon-popover-offset-x,var(--spectrum-global-dimension-size-150)) + var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin))))}:host([dir=rtl]) .spectrum-Picker-popover--quiet{margin-right:calc(-1*(var(--spectrum-picker-m-quiet-texticon-popover-offset-x,var(--spectrum-global-dimension-size-150)) + var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin))))}#button{background-color:var(
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
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-picker-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#button:focus-visible,:host([focused]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
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
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button.focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button:focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button.focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button:focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button:active,:host([quiet][open]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-down,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-picker-m-quiet-texticon-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
)}:host([quiet]) #button:active.focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button.focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button:active:focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button:focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet][invalid]) #button.focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet][invalid]) #button:focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet]) #button:disabled,:host([quiet][disabled]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);color:var(
--spectrum-picker-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host{display:inline-flex;max-width:100%;min-width:var(--spectrum-picker-min-width);vertical-align:top;width:var(--spectrum-picker-width)}:host([quiet]){min-width:0;width:auto}:host([size]){--spectrum-picker-width:var(--spectrum-global-dimension-size-2400)}#button{max-width:100%;min-width:100%;width:100%}:host([readonly]) #button{-webkit-user-select:inherit;user-select:inherit}sp-popover{display:none}.picker,.validation-icon{flex-shrink:0}:host([focused]:not([quiet])) #button #label.placeholder{color:var(
--spectrum-picker-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([focused]:not([quiet])) #button .picker{color:var(
--spectrum-picker-icon-color-key-focus,var(--spectrum-alias-icon-color-focus)
)}.visually-hidden{clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([dir=ltr]) #label.visually-hidden+.picker{margin-left:auto}:host([dir=rtl]) #label.visually-hidden+.picker{margin-right:auto}`;var f=n`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronDown75{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500,.spectrum-UIIcon-ChevronUp75{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(
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
)}`;const k=(t,e,o)=>{const r=[],c=[];for(let i=0;i<t.length;++i){const s=t[i];o&&c.push(o(s)||(()=>{}));const n=document.createComment("placeholder for reparented element");r.push(n);const a=s.parentElement||s.getRootNode();a&&a!==s&&a.replaceChild(n,s),e.append(s)}return function(){return function(t,e,o=[]){for(let r=0;r<e.length;++r){const c=e[r],i=t[r],s=i.parentElement||i.getRootNode();o[r]&&o[r](c),s&&s!==i&&s.replaceChild(c,i),delete t[r]}return e}(r,t,c)}};var z=n`.checkmark{align-self:flex-start;display:none;opacity:1;transform:scale(1)}:host([dir=ltr]) .checkmark{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .checkmark{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.checkmark{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]) .chevron{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .chevron{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.chevron{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]){border-left:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host([dir=rtl]){border-right:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--spectrum-listitem-texticon-text-size);font-style:normal;font-weight:var(--spectrum-listitem-texticon-text-font-weight);margin:0;min-height:var(--spectrum-listitem-texticon-height);padding:var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-right) var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-left);position:relative;text-decoration:none}:host(:focus){outline:0}:host([dir=ltr][selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([dir=rtl][selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([selected]) .checkmark{display:block}.icon,::slotted([slot=icon]){align-self:flex-start;flex-shrink:0}:host([dir=ltr]) .icon+#label,:host([dir=ltr]) slot[name=icon]+#label{margin-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .icon+#label,:host([dir=rtl]) slot[name=icon]+#label{margin-right:var(
--spectrum-listitem-texticon-icon-gap
)}.icon+#label,slot[name=icon]+#label{width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap) - var(--spectrum-listitem-textthumbnail-padding-left) - var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)))}:host([no-wrap]) #label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) .checkmark,:host([dir=ltr]) .chevron{padding-left:var(
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
);cursor:default}#label{flex:1 1 auto;-webkit-hyphens:auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}#button{bottom:0;left:0;position:absolute;right:0;top:0}::slotted([slot=value]){align-self:start}:host([dir=ltr]) ::slotted([slot=value]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=value]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}:host([dir=ltr]) ::slotted([slot=icon]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=icon]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) slot[name=icon]+#label{margin-right:0}:host([dir=ltr]) slot[name=icon]+#label{margin-left:0}`;class w extends Event{constructor(){super("sp-menu-item-removed",{bubbles:!0,composed:!0}),this.focused=!1}get item(){return this._item}reset(t){this._item=t}}class q extends Event{constructor(){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0})}set focusRoot(t){this.item.menuData.focusRoot=this.item.menuData.focusRoot||t}set selectionRoot(t){this.item.menuData.selectionRoot=this.item.menuData.selectionRoot||t}get item(){return this._item}set currentAncestorWithSelects(t){this._currentAncestorWithSelects=t}get currentAncestorWithSelects(){return this._currentAncestorWithSelects}reset(t){this._item=t,this._currentAncestorWithSelects=void 0,t.menuData={focusRoot:void 0,selectionRoot:void 0}}}const I=new q,B=new w;class C extends(m(d)){constructor(){super(),this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.noWrap=!1,this.menuData={focusRoot:void 0,selectionRoot:void 0},this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}static get styles(){return[z,p]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}get focusElement(){return this}get itemChildren(){if(this._itemChildren)return this._itemChildren;const t=this.shadowRoot.querySelector('slot[name="icon"]'),e=t?t.assignedElements().map((t=>{const e=t.cloneNode(!0);return e.removeAttribute("slot"),e.classList.toggle("icon"),e})):[],o=this.shadowRoot.querySelector("slot:not([name])"),r=o?o.assignedNodes().map((t=>t.cloneNode(!0))):[];return this._itemChildren={icon:e,content:r},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;return this.anchorElement&&(this.anchorElement.click(),t=!0),t}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}render(){return o`<slot name="icon" @slotchange="${this.breakItemChildrenCache}"></slot><div id="label"><slot id="slot" @slotchange="${this.breakItemChildrenCache}"></slot></div><slot name="value"></slot>${this.selected?o`<sp-icon-checkmark100 id="selected" class="spectrum-UIIcon-Checkmark100 icon checkmark"></sp-icon-checkmark100>`:o``} ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):o``}`}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}firstUpdated(t){super.firstUpdated(t),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.hasAttribute("id")||(this.id="sp-menu-item-"+C.instanceCount++)}updateAriaSelected(){const t=this.getAttribute("role");"option"===t?this.setAttribute("aria-selected",this.selected?"true":"false"):"menuitemcheckbox"!==t&&"menuitemradio"!==t||this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(t){this.setAttribute("role",t),this.updateAriaSelected()}updated(t){super.updated(t),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),t.has("selected")&&this.updateAriaSelected()}connectedCallback(){super.connectedCallback(),I.reset(this),this.dispatchEvent(I),this._parentElement=this.parentElement}disconnectedCallback(){var t;B.reset(this),null===(t=this._parentElement)||void 0===t||t.dispatchEvent(B),super.disconnectedCallback()}async triggerUpdate(){await new Promise((t=>requestAnimationFrame(t))),I.reset(this),this.dispatchEvent(I)}}C.instanceCount=0,r([c({type:Boolean,reflect:!0})],C.prototype,"active",void 0),r([c({type:Boolean,reflect:!0})],C.prototype,"focused",void 0),r([c({type:Boolean,reflect:!0})],C.prototype,"selected",void 0),r([c({type:String})],C.prototype,"value",null),r([c({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],C.prototype,"noWrap",void 0),r([b(".anchor")],C.prototype,"anchorElement",void 0);var T=n`:host{--spectrum-menu-margin-x:var(
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
);--spectrum-listitem-texticon-divider-size:var(
--spectrum-listitem-m-texticon-divider-size,var(--spectrum-alias-border-size-thick)
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
)}:host([dir=ltr][selects]) ::slotted(sp-menu-item[selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([dir=rtl][selects]) ::slotted(sp-menu-item[selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}::slotted(sp-menu){display:block}:host{--spectrum-listheading-text-color:var(
--spectrum-global-color-gray-700
)}:host{background-color:var(
--spectrum-listitem-m-texticon-background-color,var(--spectrum-alias-background-color-transparent)
)}:host{--spectrum-listitem-selectable-padding-right:calc(var(--spectrum-global-dimension-size-100) + var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-listitem-icon-gap))}:host(:focus){outline:0}:host sp-menu{display:block}`;function U(t,e){return!!e&&(t===e||t.contains(e))}class F extends i{constructor(){super(),this.label="",this.value="",this.valueSeparator=",",this.selected=[],this.selectedItems=[],this.childItemSet=new Set,this.focusedItemIndex=0,this.focusInItemIndex=0,this.selectedItemsMap=new Map,this._willUpdateItems=!1,this._notFirstUpdated=!1,this.cacheUpdated=Promise.resolve(),this.addEventListener("sp-menu-item-added-or-updated",this.onSelectableItemAddedOrUpdated),this.addEventListener("sp-menu-item-added-or-updated",this.onFocusableItemAddedOrUpdated,{capture:!0}),this.addEventListener("sp-menu-item-removed",this.removeChildItem),this.addEventListener("click",this.onClick),this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[T]}get childItems(){return this.cachedChildItems||(this.cachedChildItems=this.updateCachedMenuItems()),this.cachedChildItems}updateCachedMenuItems(){this.cachedChildItems=[];const t=this.menuSlot.assignedElements({flatten:!0});for(const e of t){const t=e instanceof C?[e]:[...e.querySelectorAll("*")];for(const e of t)this.childItemSet.has(e)&&this.cachedChildItems.push(e)}return this.cachedChildItems}get childRole(){if("listbox"===this.resolvedRole)return"option";switch(this.resolvedSelects){case"single":return"menuitemradio";case"multiple":return"menuitemcheckbox";default:return"menuitem"}}get ownRole(){return"menu"}onFocusableItemAddedOrUpdated(t){var e;t.item.menuData.focusRoot&&(this.tabIndex=-1),t.focusRoot=this,this.addChildItem(t.item),"inherit"===this.selects?(this.resolvedSelects="inherit",this.resolvedRole=(null===(e=t.currentAncestorWithSelects)||void 0===e?void 0:e.getAttribute("role"))||this.getAttribute("role")||void 0):this.selects?(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects=this.selects,t.currentAncestorWithSelects=this):(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects="none"===this.resolvedRole?"ignore":"none")}onSelectableItemAddedOrUpdated(t){!("single"===this.resolvedSelects||"multiple"===this.resolvedSelects)&&(this.selects||"ignore"===this.resolvedSelects)||t.item.menuData.selectionRoot||(t.item.setRole(this.childRole),t.selectionRoot=this)}addChildItem(t){this.childItemSet.add(t),this.handleItemsChanged()}async removeChildItem(t){this.childItemSet.delete(t.item),this.cachedChildItems=void 0,t.item.focused&&(this.handleItemsChanged(),await this.updateComplete,this.focus())}focus({preventScroll:t}={}){if(!this.childItems.length||this.childItems.every((t=>t.disabled)))return;if(this.childItems.some((t=>t.menuData.focusRoot!==this)))return void super.focus({preventScroll:t});this.focusMenuItemByOffset(0),super.focus({preventScroll:t});const e=this.querySelector("[selected]");e&&!t&&e.scrollIntoView({block:"nearest"})}onClick(t){if(t.defaultPrevented)return;const e=t.composedPath().find((t=>t instanceof Element&&t.getAttribute("role")===this.childRole));(null==e?void 0:e.href)&&e.href.length||(null==e?void 0:e.menuData.selectionRoot)===this&&(t.preventDefault(),this.selectOrToggleItem(e),this.prepareToCleanUp())}handleFocusin(t){var e;const o=U(this,t.relatedTarget);if(o||this.childItems.some((t=>t.menuData.focusRoot!==this)))return;const r=this.getRootNode().activeElement,c=(null===(e=this.childItems[this.focusedItemIndex])||void 0===e?void 0:e.menuData.selectionRoot)||this;if((r!==c||!o)&&(c.focus({preventScroll:!0}),r&&0===this.focusedItemIndex)){const t=this.childItems.findIndex((t=>t===r));t>0&&this.focusMenuItemByOffset(t)}this.startListeningToKeyboard()}startListeningToKeyboard(){this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.handleFocusout)}handleFocusout(t){if(U(this,t.relatedTarget))t.composedPath()[0].focused=!1;else{if(this.stopListeningToKeyboard(),t.target===this&&this.childItems.some((t=>t.menuData.focusRoot===this))){const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1)}this.removeAttribute("aria-activedescendant")}}stopListeningToKeyboard(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)}async selectOrToggleItem(t){const e=this.resolvedSelects,o=new Map(this.selectedItemsMap),r=this.selected.slice(),c=this.selectedItems.slice(),i=this.value;if(this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=this.childItems.indexOf(t),this.forwardFocusVisibleToItem(t),"multiple"===e){this.selectedItemsMap.has(t)?this.selectedItemsMap.delete(t):this.selectedItemsMap.set(t,!0);const e=[],o=[];this.childItemSet.forEach((t=>{t.menuData.selectionRoot===this&&this.selectedItemsMap.has(t)&&(e.push(t.value),o.push(t))})),this.selected=e,this.selectedItems=o,this.value=this.selected.join(this.valueSeparator)}else this.selectedItemsMap.clear(),this.selectedItemsMap.set(t,!0),this.value=t.value,this.selected=[t.value],this.selectedItems=[t];await this.updateComplete;if(!this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})))return this.selected=r,this.selectedItems=c,this.selectedItemsMap=o,void(this.value=i);if("single"===e){for(const e of o.keys())e!==t&&(e.selected=!1);t.selected=!0}else"multiple"===e&&(t.selected=!t.selected)}handleKeydown(t){var e;const{code:o}=t;if("Tab"===o)return void this.prepareToCleanUp();if("Space"===o||"Enter"===o)return void(null===(e=this.childItems[this.focusedItemIndex])||void 0===e||e.click());if("ArrowDown"!==o&&"ArrowUp"!==o)return;const r=this.childItems[this.focusedItemIndex],c="ArrowDown"===o?1:-1,i=this.focusMenuItemByOffset(c);i!==r&&(t.preventDefault(),i.scrollIntoView({block:"nearest"}))}focusMenuItemByOffset(t){const e=t||1;this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+t)%this.childItems.length;let o=this.childItems[this.focusedItemIndex],r=this.childItems.length;for(;o.disabled&&r;)r-=1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+e)%this.childItems.length,o=this.childItems[this.focusedItemIndex];return(null==o?void 0:o.disabled)||this.forwardFocusVisibleToItem(o),o}prepareToCleanUp(){document.addEventListener("focusout",(()=>{requestAnimationFrame((()=>{const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1,this.updateSelectedItemIndex())}))}),{once:!0})}updateSelectedItemIndex(){let t=0;const e=new Map,o=[],r=[];let c=this.childItems.length;for(;c;){c-=1;const i=this.childItems[c];i.menuData.selectionRoot===this&&(i.selected&&(t=c,e.set(i,!0),o.unshift(i.value),r.unshift(i)),c!==t&&(i.focused=!1))}r.map(((t,e)=>{e>0&&(t.focused=!1)})),this.selectedItemsMap=e,this.selected=o,this.selectedItems=r,this.value=this.selected.join(this.valueSeparator),this.focusedItemIndex=t,this.focusInItemIndex=t}handleItemsChanged(){if(this.cachedChildItems=void 0,!this._willUpdateItems){let t=()=>{};this.cacheUpdated=new Promise((e=>t=e)),this._willUpdateItems=!0,window.requestAnimationFrame((()=>{void 0===this.cachedChildItems&&(this.updateSelectedItemIndex(),this.updateItemFocus()),this._willUpdateItems=!1,t()}))}}updateItemFocus(){if(0==this.childItems.length)return;const t=this.childItems[this.focusInItemIndex];this.getRootNode().activeElement===t.menuData.focusRoot&&this.forwardFocusVisibleToItem(t)}forwardFocusVisibleToItem(t){t.menuData.focusRoot===this&&(t.focused=this.hasVisibleFocusInTree(),this.setAttribute("aria-activedescendant",t.id),t.menuData.selectionRoot&&t.menuData.selectionRoot!==this&&t.menuData.selectionRoot.focus())}render(){return o`<slot></slot>`}firstUpdated(t){if(super.firstUpdated(t),!this.hasAttribute("tabindex")){const t=this.getAttribute("role");"group"===t?this.tabIndex=-1:"none"!==t&&(this.tabIndex=0)}const e=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];[...this.children].forEach((t=>{"sp-menu-item"===t.localName&&e.push(t.updateComplete)})),this.childItemsUpdated=Promise.all(e)}updated(t){super.updated(t),t.has("selects")&&this._notFirstUpdated&&this.selectsChanged(),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")),this._notFirstUpdated=!0}selectsChanged(){const t=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];this.childItemSet.forEach((e=>{t.push(e.triggerUpdate())})),this.childItemsUpdated=Promise.all(t)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role",this.ownRole),this.updateComplete.then((()=>this.updateItemFocus()))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.childItemsUpdated,await this.cacheUpdated,t}}r([c({type:String,reflect:!0})],F.prototype,"label",void 0),r([c({type:String,reflect:!0})],F.prototype,"selects",void 0),r([c({type:String})],F.prototype,"value",void 0),r([c({type:String,attribute:"value-separator"})],F.prototype,"valueSeparator",void 0),r([c({attribute:!1})],F.prototype,"selected",void 0),r([c({attribute:!1})],F.prototype,"selectedItems",void 0),r([b("slot:not([name])")],F.prototype,"menuSlot",void 0),customElements.define("sp-menu",F);var E=n`:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([placement*=bottom][open]){transform:translateY(var(--spectrum-overlay-animation-distance))}:host([placement*=top][open]){transform:translateY(calc(-1*var(--spectrum-overlay-animation-distance)))}:host([placement*=right][open]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([placement*=left][open]){transform:translateX(calc(-1*var(--spectrum-overlay-animation-distance)))}:host{--spectrum-popover-target-offset:13px;--spectrum-popover-dialog-padding:30px 29px;--spectrum-popover-dialog-min-width:270px;--spectrum-popover-min-width:var(--spectrum-global-dimension-size-400);--spectrum-popover-min-height:var(--spectrum-global-dimension-size-400)}:host{border-radius:var(
--spectrum-popover-border-radius,var(--spectrum-alias-border-radius-regular)
);border-style:solid;border-width:var(
--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;display:inline-flex;flex-direction:column;min-height:var(
--spectrum-popover-min-height,var(--spectrum-global-dimension-size-400)
);min-width:var(
--spectrum-popover-min-width,var(--spectrum-global-dimension-size-400)
);outline:0;position:absolute}#tip{position:absolute;-webkit-transform:translate(0)}#tip .triangle{stroke-linecap:square;stroke-linejoin:miter;stroke-width:var(
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
);-webkit-clip-path:inset(-30px -30px);clip-path:inset(-30px -30px);filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));-webkit-filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));will-change:filter}#tip .triangle{fill:var(
--spectrum-popover-background-color,var(--spectrum-global-color-gray-50)
);stroke:var(
--spectrum-popover-border-color,var(--spectrum-alias-border-color-dark)
)}:host{--sp-popover-tip-size:24px}:host([placement*=bottom]),:host([placement*=top]){max-height:calc(100% - var(--spectrum-overlay-animation-distance))}:host([placement*=left]),:host([placement*=right]){max-width:calc(100% - var(--spectrum-overlay-animation-distance))}::slotted(*){overscroll-behavior:contain}.tip{height:calc(var(--sp-popover-tip-size)/2);left:0;position:absolute;width:var(--sp-popover-tip-size)}:host([placement*=right]) #tip{transform:none}:host([placement*=bottom]) #tip{transform:none}:host([placement*=top]) .tip{top:100%}:host([placement*=bottom]) .tip{bottom:100%;transform:scaleY(-1)}:host([placement*=left]) .tip{transform:rotate(-90deg) translateY(-200%);transform-origin:100% 0}:host([placement*=right]) .tip{transform:rotate(90deg);transform-origin:0 0}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}`;class H extends i{constructor(){super(...arguments),this.dialog=!1,this.open=!1,this.placement="none",this.tip=!1}static get styles(){return[E]}renderTip(){return o`<div id="tip"><svg xmlns="http://www.w3.org/svg/2000" class="tip" viewBox="0 0 24 12"><path class="triangle" d="M 0.7071067811865476 0 L 11.414213562373096 10.707106781186548 L 22.121320343559645 0"></path></svg></div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("sp-overlay-query",this.onOverlayQuery)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("sp-overlay-query",this.onOverlayQuery)}onOverlayQuery(t){if(!t.target)return;if(t.target!==this)return;const e=this.shadowRoot.querySelector("#tip");e&&(t.detail.overlayContentTipElement=e)}render(){return o`<slot></slot>${this.tip?this.renderTip():s}`}}r([c({type:Boolean,reflect:!0})],H.prototype,"dialog",void 0),r([c({type:Boolean,reflect:!0})],H.prototype,"open",void 0),r([c({reflect:!0})],H.prototype,"placement",void 0),r([c({type:Boolean,reflect:!0})],H.prototype,"tip",void 0),customElements.define("sp-popover",H);const S=async(t,e,o,r)=>{const{Overlay:c}=await import("./64afba50.js").then((function(t){return t.o}));return c.open(t,e,o,r)},A={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class R extends(v(d)){constructor(){super(),this.disabled=!1,this.focused=!1,this.invalid=!1,this.open=!1,this.readonly=!1,this.selects="single",this.menuItems=[],this.placement="bottom-start",this.quiet=!1,this.value="",this.listRole="listbox",this.itemRole="option",this.onKeydown=t=>{this.focused=!0,"ArrowDown"!==t.code&&"ArrowUp"!==t.code||(t.preventDefault(),this.toggle(!0))},this.overlayCloseCallback=()=>{this.open=!1},this._willUpdateItems=!1,this.itemsUpdated=Promise.resolve(),this.menuStatePromise=Promise.resolve(),this.onKeydown=this.onKeydown.bind(this)}get target(){return this.button}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0}onButtonBlur(){this.focused=!1,this.target.removeEventListener("keydown",this.onKeydown)}onButtonClick(){this.toggle()}focus(t){super.focus(t),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}onHelperFocus(){this.focused=!0,this.button.focus()}onButtonFocus(){this.target.addEventListener("keydown",this.onKeydown)}handleChange(t){t.stopPropagation();const e=t.target,[o]=e.selectedItems;this.setValueFromItem(o,t)}async setValueFromItem(t,e){const o=this.selectedItem,r=this.value;this.selectedItem=t,this.value=t.value,this.open=!1,await this.updateComplete;if(!this.dispatchEvent(new Event("change",{cancelable:!0})))return e&&e.preventDefault(),this.selectedItem.selected=!1,o&&(o.selected=!0),this.selectedItem=o,this.value=r,void(this.open=!0);o&&(o.selected=!1),t.selected=!!this.selects}toggle(t){this.readonly||(this.open=void 0!==t?t:!this.open)}close(){this.readonly||(this.open=!1)}onOverlayClosed(){this.close(),this.restoreChildren&&(this.restoreChildren(),this.restoreChildren=void 0),this.menuStateResolver()}async openMenu(){let t=[];const e=this.querySelector("sp-menu");if(t=e?Array.from(e.children):Array.from(this.children).filter((t=>!t.hasAttribute("slot"))),0===t.length)return void this.menuStateResolver();this.restoreChildren=k(t,this.optionsMenu,(()=>t=>{void 0!==t.focused&&(t.focused=!1)})),this.sizePopover(this.popover);const{popover:o}=this;this.addEventListener("sp-opened",(async()=>{this.updateMenuItems(),await Promise.all([this.itemsUpdated,this.optionsMenu.updateComplete]),this.menuStateResolver()}),{once:!0}),this.closeOverlay=await L.openOverlay(this,"modal",o,{placement:this.placement,receivesFocus:"auto"})}sizePopover(t){const e=!this.quiet&&`${this.offsetWidth}px`;e&&t.style.setProperty("min-width",e)}closeMenu(){this.closeOverlay&&(this.closeOverlay(),delete this.closeOverlay)}get selectedItemContent(){return this.selectedItem?this.selectedItem.itemChildren:{icon:[],content:[]}}renderLabelContent(t){return this.value&&this.selectedItem?t:o`<slot name="label">${this.label}</slot>`}get buttonContent(){const t={"visually-hidden":"only"===this.icons&&!!this.value,placeholder:!this.value};return[o`<span id="icon" ?hidden="${"none"===this.icons}">${this.selectedItemContent.icon} </span><span id="label" class="${x(t)}">${this.renderLabelContent(this.selectedItemContent.content)} </span>${this.invalid?o`<sp-icon-alert class="validation-icon"></sp-icon-alert>`:s}<sp-icon-chevron100 class="picker ${A[this.size]}"></sp-icon-chevron100>`]}get renderButton(){return o`<span id="focus-helper" tabindex="${this.focused?"-1":"0"}" @focus="${this.onHelperFocus}"></span> <button aria-haspopup="true" aria-expanded="${this.open?"true":"false"}" aria-labelledby="button icon label" id="button" class="button" @blur="${this.onButtonBlur}" @click="${this.onButtonClick}" @focus="${this.onButtonFocus}" ?disabled="${this.disabled}" tabindex="-1">${this.buttonContent}</button>`}update(t){this.selects&&(this.selects="single"),super.update(t)}render(){return o`${this.renderButton} ${this.renderPopover}`}get dismissHelper(){return o`<div class="visually-hidden"><button tabindex="-1" arial-label="Dismiss" @click="${this.close}"></button></div>`}get renderPopover(){return o`<sp-popover id="popover" role="dialog" @sp-menu-item-added-or-updated="${this.updateMenuItems}" @sp-overlay-closed="${this.onOverlayClosed}" .overlayCloseCallback="${this.overlayCloseCallback}">${this.dismissHelper}<sp-menu id="menu" role="${this.listRole}" @change="${this.handleChange}" .selects="${this.selects}"></sp-menu>${this.dismissHelper}</sp-popover>`}updateMenuItems(t){if(this._willUpdateItems)return;this._willUpdateItems=!0,(null==t?void 0:t.item)===this.selectedItem&&this.requestUpdate();let e=()=>{};this.itemsUpdated=new Promise((t=>e=t)),window.requestAnimationFrame((async()=>{this.open?(await this.optionsMenu.updateComplete,this.menuItems=this.optionsMenu.childItems):this.menuItems=[...this.querySelectorAll("sp-menu-item")],this.manageSelection(),e(),this._willUpdateItems=!1}))}firstUpdated(t){super.firstUpdated(t),this.optionsMenu=this.shadowRoot.querySelector("sp-menu");this.querySelector("sp-menu")&&console.warn(`Deprecation Notice: You no longer need to provide an sp-menu child to ${this.tagName.toLowerCase()}. Any styling or attributes on the sp-menu will be ignored.`)}updated(t){super.updated(t),t.has("value")&&!t.has("selectedItem")&&this.updateMenuItems(),t.has("disabled")&&this.disabled&&(this.open=!1),t.has("open")&&(this.open||void 0!==t.get("open"))&&(this.menuStatePromise=new Promise((t=>this.menuStateResolver=t)),this.open?this.openMenu():this.closeMenu())}manageSelection(){let t;this.menuItems.forEach((e=>{this.value!==e.value||e.disabled?e.selected=!1:t=e})),t?(t.selected=!!this.selects,this.selectedItem=t):(this.value="",this.selectedItem=void 0),this.open&&this.optionsMenu.updateComplete.then((()=>{this.optionsMenu.updateSelectedItemIndex()}))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.menuStatePromise,await this.itemsUpdated,t}connectedCallback(){this.updateMenuItems(),this.addEventListener("sp-menu-item-added-or-updated",this.updateMenuItems),this.addEventListener("sp-menu-item-removed",this.updateMenuItems),super.connectedCallback()}disconnectedCallback(){this.open=!1,super.disconnectedCallback()}}R.openOverlay=async(t,e,o,r)=>await S(t,e,o,r),r([b("#button")],R.prototype,"button",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"disabled",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"focused",void 0),r([c({type:String,reflect:!0})],R.prototype,"icons",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"invalid",void 0),r([c()],R.prototype,"label",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"open",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"readonly",void 0),r([c()],R.prototype,"placement",void 0),r([c({type:Boolean,reflect:!0})],R.prototype,"quiet",void 0),r([c({type:String})],R.prototype,"value",void 0),r([c({attribute:!1})],R.prototype,"selectedItem",void 0),r([b("sp-popover")],R.prototype,"popover",void 0);class L extends R{constructor(){super(...arguments),this.onKeydown=t=>{const{code:e}=t;if(this.focused=!0,!e.startsWith("Arrow")||this.readonly)return;if(t.preventDefault(),"ArrowUp"===e||"ArrowDown"===e)return void this.toggle(!0);const o=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,r=this.value&&"ArrowRight"!==e?-1:1;let c=o+r;for(;this.menuItems[c]&&this.menuItems[c].disabled;)c+=r;this.menuItems[c]&&!this.menuItems[c].disabled&&(this.value&&c===o||this.setValueFromItem(this.menuItems[c]))}}static get styles(){return[y,f]}}customElements.define("sp-picker",L);var j=n`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){flex-shrink:0;max-height:100%}:host:after{border-radius:calc(var(--spectrum-button-primary-texticon-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host(.focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host(:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host([size=s]){--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-s-primary-textonly-text-padding-bottom
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-s-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-s-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-s-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-s-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-s-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-s-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-s-primary-texticon-border-radius,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-s-primary-texticon-padding-left,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-s-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-s-primary-textonly-min-width,var(--spectrum-global-dimension-size-675)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-s-primary-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-s-primary-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-s-primary-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:calc(var(
--spectrum-button-s-primary-textonly-text-padding-top,
var(--spectrum-global-dimension-static-size-50)
) - 1px)}:host([size=m]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-m-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-m-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-m-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-m-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-m-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-m-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-m-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-m-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-m-primary-textonly-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-m-primary-textonly-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-m-primary-textonly-padding-left,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-m-primary-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-m-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-115)
) - 1px)}:host([size=l]){--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-l-primary-textonly-text-padding-top
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-l-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-l-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-l-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-l-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-l-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-l-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-l-primary-texticon-border-radius,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-l-primary-texticon-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-l-primary-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-l-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-l-primary-textonly-min-width,var(--spectrum-global-dimension-size-1125)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-l-primary-textonly-padding-right,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-l-primary-textonly-padding-left,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-l-primary-textonly-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-xl-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-xl-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-xl-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-xl-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-xl-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-xl-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-xl-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-xl-primary-texticon-border-radius,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-xl-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-xl-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-xl-primary-textonly-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-xl-primary-textonly-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-xl-primary-textonly-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-xl-primary-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-xl-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-175)
) - 1px)}:host{--spectrum-button-primary-padding-left-adjusted:calc(var(--spectrum-button-primary-texticon-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-left-adjusted:calc(var(--spectrum-button-primary-textonly-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-right-adjusted:calc(var(--spectrum-button-primary-textonly-padding-right) - var(--spectrum-button-primary-texticon-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-button-primary-textonly-padding-left-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-right-adjusted
)}:host([dir=rtl]){padding-left:var(
--spectrum-button-primary-textonly-padding-right-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-button-primary-texticon-border-radius);border-style:solid;border-width:var(
--spectrum-button-primary-texticon-border-size
);font-size:var(--spectrum-button-primary-texticon-text-size);font-weight:var(--spectrum-button-primary-texticon-text-font-weight);height:auto;min-height:var(--spectrum-button-primary-textonly-height);min-width:var(--spectrum-button-primary-textonly-min-width);padding-bottom:0;padding-top:0}:host(:hover),:host([active]){box-shadow:none}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(-1*(var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(-1*(var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted)))}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#label{line-height:var(
--spectrum-button-primary-texticon-text-line-height
);padding-bottom:calc(var(--spectrum-button-primary-textonly-text-padding-bottom) - var(--spectrum-button-primary-textonly-border-size));padding-top:calc(var(--spectrum-button-primary-textonly-text-padding-top) - var(--spectrum-button-primary-textonly-border-size))}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([variant=cta]){background-color:var(
--spectrum-button-m-cta-texticon-background-color,var(--spectrum-semantic-cta-background-color-default)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color,var(--spectrum-semantic-cta-background-color-default)
);color:var(
--spectrum-button-m-cta-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:hover){background-color:var(
--spectrum-button-m-cta-texticon-background-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=cta].focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta][active]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-down,var(--spectrum-semantic-cta-background-color-down)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-down,var(--spectrum-semantic-cta-background-color-down)
);color:var(
--spectrum-button-m-cta-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:disabled),:host([variant=cta][disabled]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-cta-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=primary]){background-color:var(
--spectrum-button-m-primary-texticon-background-color,var(--spectrum-alias-button-primary-background-color-default)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color,var(--spectrum-alias-button-primary-border-color-default)
);color:var(
--spectrum-button-m-primary-texticon-text-color,var(--spectrum-alias-button-primary-text-color-default)
)}:host([variant=primary]:hover){background-color:var(
--spectrum-button-m-primary-texticon-background-color-hover,var(--spectrum-alias-button-primary-background-color-hover)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-hover,var(--spectrum-alias-button-primary-border-color-hover)
);color:var(
--spectrum-button-m-primary-texticon-text-color-hover,var(--spectrum-alias-button-primary-text-color-hover)
)}:host([variant=primary].focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary]:focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary][active]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-down,var(--spectrum-alias-button-primary-background-color-down)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-down,var(--spectrum-alias-button-primary-border-color-down)
);color:var(
--spectrum-button-m-primary-texticon-text-color-down,var(--spectrum-alias-button-primary-text-color-down)
)}:host([variant=primary]:disabled),:host([variant=primary][disabled]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color,var(--spectrum-alias-button-secondary-background-color-default)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color,var(--spectrum-alias-button-secondary-border-color-default)
);color:var(
--spectrum-button-m-secondary-texticon-text-color,var(--spectrum-alias-button-secondary-text-color-default)
)}:host([variant=secondary]:hover){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-hover,var(--spectrum-alias-button-secondary-background-color-hover)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-hover,var(--spectrum-alias-button-secondary-border-color-hover)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-hover,var(--spectrum-alias-button-secondary-text-color-hover)
)}:host([variant=secondary].focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary]:focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary][active]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-down,var(--spectrum-alias-button-secondary-background-color-down)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-down,var(--spectrum-alias-button-secondary-border-color-down)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-down,var(--spectrum-alias-button-secondary-text-color-down)
)}:host([variant=secondary]:disabled),:host([variant=secondary][disabled]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative]){background-color:var(
--spectrum-button-m-negative-texticon-background-color,var(--spectrum-alias-button-negative-background-color-default)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color,var(--spectrum-alias-button-negative-border-color-default)
);color:var(
--spectrum-button-m-negative-texticon-text-color,var(--spectrum-alias-button-negative-text-color-default)
)}:host([variant=negative]:hover){background-color:var(
--spectrum-button-m-negative-texticon-background-color-hover,var(--spectrum-alias-button-negative-background-color-hover)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-hover,var(--spectrum-alias-button-negative-border-color-hover)
);color:var(
--spectrum-button-m-negative-texticon-text-color-hover,var(--spectrum-alias-button-negative-text-color-hover)
)}:host([variant=negative].focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative]:focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative][active]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-down,var(--spectrum-alias-button-negative-background-color-down)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-down,var(--spectrum-alias-button-negative-border-color-down)
);color:var(
--spectrum-button-m-negative-texticon-text-color-down,var(--spectrum-alias-button-negative-text-color-down)
)}:host([variant=negative]:disabled),:host([variant=negative][disabled]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-down,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-overbackground-disabled)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-overbackground-disabled)
)}:host([variant=overBackground][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down,var(--spectrum-alias-background-color-quiet-overbackground-down)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:disabled),:host([variant=overBackground][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-quiet-overbackground-disabled)
)}:host([variant=primary][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([variant=primary][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:disabled),:host([variant=primary][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary][quiet]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color,var(--spectrum-global-color-gray-700)
)}:host([variant=secondary][quiet]:hover){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet].focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet][active]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:disabled),:host([variant=secondary][quiet][disabled]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative][quiet]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color,var(--spectrum-semantic-negative-text-color-small)
)}:host([variant=negative][quiet]:hover){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-hover,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet].focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet][active]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-down,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:disabled),:host([variant=negative][quiet][disabled]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}@media (forced-colors:active){:host{--spectrum-button-m-cta-texticon-background-color:ButtonText;--spectrum-button-m-cta-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-cta-texticon-background-color-down:Highlight;--spectrum-button-m-cta-texticon-background-color-hover:Highlight;--spectrum-button-m-cta-texticon-background-color-key-focus:Highlight;--spectrum-button-m-cta-texticon-border-color:ButtonFace;--spectrum-button-m-cta-texticon-border-color-disabled:GrayText;--spectrum-button-m-cta-texticon-border-color-down:Highlight;--spectrum-button-m-cta-texticon-border-color-hover:Highlight;--spectrum-button-m-cta-texticon-border-color-key-focus:Highlight;--spectrum-button-m-cta-texticon-text-color:ButtonFace;--spectrum-button-m-cta-texticon-text-color-disabled:GrayText;--spectrum-button-m-cta-texticon-text-color-down:Buttonface;--spectrum-button-m-cta-texticon-text-color-hover:Buttonface;--spectrum-button-m-cta-texticon-text-color-key-focus:Buttonface;--spectrum-button-m-negative-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-negative-quiet-texticon-border-color:ButtonText;--spectrum-button-m-negative-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-negative-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-negative-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-negative-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-negative-quiet-texticon-text-color:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-negative-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-negative-texticon-background-color:ButtonFace;--spectrum-button-m-negative-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-negative-texticon-background-color-down:ButtonFace;--spectrum-button-m-negative-texticon-background-color-hover:ButtonFace;--spectrum-button-m-negative-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-negative-texticon-border-color:ButtonText;--spectrum-button-m-negative-texticon-border-color-disabled:GrayText;--spectrum-button-m-negative-texticon-border-color-down:Highlight;--spectrum-button-m-negative-texticon-border-color-hover:Highlight;--spectrum-button-m-negative-texticon-border-color-key-focus:Highlight;--spectrum-button-m-negative-texticon-text-color:ButtonText;--spectrum-button-m-negative-texticon-text-color-disabled:GrayText;--spectrum-button-m-negative-texticon-text-color-down:ButtonText;--spectrum-button-m-negative-texticon-text-color-hover:ButtonText;--spectrum-button-m-negative-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-primary-overbackground-texticon-background-color:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-border-color:ButtonText;--spectrum-button-m-primary-overbackground-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-overbackground-texticon-border-color-down:Highlight;--spectrum-button-m-primary-overbackground-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-overbackground-texticon-text-color:ButtonText;--spectrum-button-m-primary-overbackground-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down:Highlight;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-primary-quiet-texticon-border-color:ButtonText;--spectrum-button-m-primary-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-primary-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-quiet-texticon-text-color:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-primary-texticon-background-color:ButtonFace;--spectrum-button-m-primary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-primary-texticon-border-color:ButtonText;--spectrum-button-m-primary-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-texticon-border-color-down:Highlight;--spectrum-button-m-primary-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-texticon-text-color:ButtonText;--spectrum-button-m-primary-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-secondary-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-border-color:ButtonText;--spectrum-button-m-secondary-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-secondary-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-secondary-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-secondary-quiet-texticon-text-color:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-secondary-texticon-background-color:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-down:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-hover:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-secondary-texticon-border-color:ButtonText;--spectrum-button-m-secondary-texticon-border-color-disabled:GrayText;--spectrum-button-m-secondary-texticon-border-color-down:Highlight;--spectrum-button-m-secondary-texticon-border-color-hover:Highlight;--spectrum-button-m-secondary-texticon-border-color-key-focus:Highlight;--spectrum-button-m-secondary-texticon-text-color:ButtonText;--spectrum-button-m-secondary-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-texticon-text-color-down:ButtonText;--spectrum-button-m-secondary-texticon-text-color-hover:ButtonText;--spectrum-button-m-secondary-texticon-text-color-key-focus:ButtonText}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) Highlight}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) Highlight}:host{forced-color-adjust:none}:host([variant=overBackground]:hover){color:ButtonText}:host([variant=overBackground].focus-visible){color:ButtonText}:host([variant=overBackground]:focus-visible){color:ButtonText}:host([variant=overBackground][active]){color:ButtonText}}@media (forced-colors:active){.spectrum-LogicButton:after{--spectrum-button-m-primary-texticon-focus-ring-color-key-focus:Highlight;forced-color-adjust:none}.spectrum-LogicButton{--spectrum-button-primary-texticon-focus-ring-size:2;--spectrum-button-m-secondary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-texticon-border-color-disabled:GrayText;--spectrum-logicbutton-and-background-color:ButtonFace;--spectrum-logicbutton-and-background-color-disabled:ButtonFace;--spectrum-logicbutton-and-background-color-hover:ButtonFace;--spectrum-logicbutton-and-border-color:ButtonText;--spectrum-logicbutton-and-border-color-disabled:GrayText;--spectrum-logicbutton-and-border-color-hover:Highlight;--spectrum-logicbutton-and-text-color:ButtonText;--spectrum-logicbutton-and-text-color-disabled:GrayText;--spectrum-logicbutton-or-background-color:ButtonFace;--spectrum-logicbutton-or-background-color-hover:ButtonFace;--spectrum-logicbutton-or-border-color:ButtonText;--spectrum-logicbutton-or-border-color-hover:Highlight;--spectrum-logicbutton-or-text-color:ButtonText;forced-color-adjust:none}}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
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
)}`;class D extends(v(h)){constructor(){super(...arguments),this.variant="cta",this.warning=!1,this.quiet=!1}static get styles(){return[...super.styles,j]}}r([c({reflect:!0})],D.prototype,"variant",void 0),r([c({type:Boolean,reflect:!0})],D.prototype,"warning",void 0),r([c({type:Boolean,reflect:!0})],D.prototype,"quiet",void 0),customElements.define("sp-button",D);var _=n`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){max-height:100%}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host([size=s]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-s-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-s-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-s-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-s-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-s-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-s-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-s-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-s-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-s-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-s-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-s-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-s-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-s-icononly-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-s-icononly-padding-left,var(--spectrum-global-dimension-size-50)
)}:host([size=m]){--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-m-texticon-padding-left
);--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-m-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-m-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-m-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-m-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-m-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-m-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-m-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-m-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-m-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-m-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-m-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-m-icononly-padding-right,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-m-icononly-padding-left,var(--spectrum-global-dimension-size-85)
)}:host([size=l]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-l-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-l-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-l-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-l-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-l-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-l-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-l-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-l-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-l-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-l-textonly-height,var(--spectrum-global-dimension-size-500)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-l-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-l-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-l-icononly-padding-right,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-l-icononly-padding-left,var(--spectrum-global-dimension-size-125)
)}:host([size=xl]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-xl-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-xl-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-xl-texticon-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-xl-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-xl-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-xl-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-xl-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-xl-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-xl-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-xl-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-xl-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-xl-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-xl-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-xl-icononly-padding-right,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-xl-icononly-padding-left,var(--spectrum-global-dimension-size-160)
)}:host{--spectrum-actionbutton-padding-left-adjusted:calc(var(--spectrum-actionbutton-texticon-padding-left) - var(--spectrum-actionbutton-texticon-border-size));--spectrum-actionbutton-textonly-padding-left-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-left) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-textonly-padding-right-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-right) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-icononly-padding-left-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-left) - var(--spectrum-actionbutton-icononly-border-size));--spectrum-actionbutton-icononly-padding-right-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-right) - var(--spectrum-actionbutton-icononly-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
);padding-right:var(--spectrum-actionbutton-textonly-padding-right-adjusted)}:host([dir=rtl]){padding-left:var(--spectrum-actionbutton-textonly-padding-right-adjusted);padding-right:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-actionbutton-textonly-border-radius);border-width:var(--spectrum-actionbutton-textonly-border-size);font-size:var(--spectrum-actionbutton-textonly-text-size);font-weight:var(--spectrum-actionbutton-textonly-text-font-weight);height:var(--spectrum-actionbutton-textonly-height);line-height:var(--spectrum-actionbutton-textonly-text-line-height);min-width:var(--spectrum-actionbutton-textonly-min-width);position:relative}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#hold-affordance+::slotted([slot=icon]),:host([dir]) slot[icon-only] sp-icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-icononly-padding-left-adjusted)));margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-right-adjusted) - var(--spectrum-actionbutton-icononly-padding-right-adjusted)))}#label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) #hold-affordance{right:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{left:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{transform:matrix(-1,0,0,1,0,0)}#hold-affordance{bottom:var(--spectrum-actionbutton-textonly-hold-icon-padding-bottom);position:absolute}:host([quiet]){border-radius:var(--spectrum-actionbutton-quiet-textonly-border-radius);border-width:var(
--spectrum-actionbutton-quiet-textonly-border-size
);font-size:var(--spectrum-actionbutton-quiet-textonly-text-size);font-weight:var(--spectrum-actionbutton-quiet-textonly-text-font-weight)}:host{--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus:1px}:host{background-color:var(
--spectrum-actionbutton-m-textonly-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(:hover) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(.focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(.focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(.focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(.focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-down,var(--spectrum-alias-component-border-color-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([active]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host(:disabled),:host([disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host(:disabled) ::slotted([slot=icon]),:host([disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host(:disabled) #hold-affordance,:host([disabled]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([selected]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected,var(--spectrum-alias-component-border-color-selected-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected].focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected]:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-selected-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected][active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-selected-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-selected-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:disabled),:host([selected][disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([selected]:disabled) ::slotted([slot=icon]),:host([selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([emphasized]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([emphasized]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([emphasized]) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([emphasized][selected]) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-selected,var(--spectrum-alias-component-icon-color-emphasized-selected-default)
)}:host([emphasized][selected]:hover) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([emphasized]:hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);box-shadow:none;color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([emphasized]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host([emphasized]:hover) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host([emphasized].focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([emphasized]:focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([emphasized].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([emphasized]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([emphasized].focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([emphasized]:focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([emphasized][active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-down,var(--spectrum-alias-component-border-color-down)
);box-shadow:none;color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([emphasized][active]) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host([emphasized]:disabled),:host([emphasized][disabled]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([emphasized]:disabled) ::slotted([slot=icon]),:host([emphasized][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([emphasized]:disabled) #hold-affordance,:host([emphasized][disabled]) #hold-affordance{color:var(
--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([emphasized][quiet][selected]),:host([emphasized][selected]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected,var(
--spectrum-alias-component-background-color-emphasized-selected-default
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected,var(--spectrum-alias-component-border-color-emphasized-selected-default)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected,var(--spectrum-alias-component-text-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected]) ::slotted([slot=icon]),:host([emphasized][selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected].focus-visible),:host([emphasized][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible),:host([emphasized][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected].focus-visible) ::slotted([slot=icon]),:host([emphasized][selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible) ::slotted([slot=icon]),:host([emphasized][selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:hover),:host([emphasized][selected]:hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-emphasized-selected-hover)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected]:hover) ::slotted([slot=icon]),:host([emphasized][selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected][active]),:host([emphasized][selected][active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-emphasized-selected-down)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected][active]) ::slotted([slot=icon]),:host([emphasized][selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected]:disabled),:host([emphasized][quiet][selected][disabled]),:host([emphasized][selected]:disabled),:host([emphasized][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([emphasized][quiet][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][quiet][selected][disabled]) ::slotted([slot=icon]),:host([emphasized][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([quiet]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color,var(--spectrum-alias-component-background-color-quiet-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color,var(--spectrum-alias-component-border-color-quiet-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([quiet]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-hover,var(--spectrum-alias-component-background-color-quiet-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-hover,var(--spectrum-alias-component-border-color-quiet-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([quiet].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);box-shadow:0 0 0 var(
--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus,var(--spectrum-alias-border-size-thick)
) var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-down,var(--spectrum-alias-component-background-color-quiet-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([quiet]:disabled),:host([quiet][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([quiet][selected]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected,var(--spectrum-alias-component-border-color-quiet-selected-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([quiet][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-quiet-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-quiet-selected-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([quiet][selected][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-quiet-selected-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-quiet-selected-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([quiet][selected]:disabled),:host([quiet][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-quiet-selected-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}@media (forced-colors:active){:host{--spectrum-actionbutton-m-emphasized-texticon-icon-color:ButtonText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-disabled:GrayText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-hover:ButtonText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-emphasized-textonly-border-color:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-border-color-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-border-color-down:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-border-color-hover:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-border-color-key-focus:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-down:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-hover:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-hold-icon-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-texticon-icon-color:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-hover:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color:ButtonText;--spectrum-actionbutton-m-textonly-border-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-down:ButtonText;--spectrum-actionbutton-m-textonly-border-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-hold-icon-color:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-hold-icon-color-down:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color:ButtonText;--spectrum-actionbutton-m-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-size-key-focus:3px;forced-color-adjust:none}:host([quiet][emphasized]:not(:disabled,[disabled]):hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(
--spectrum-alias-component-border-color-emphasized-selected-hover
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([quiet][emphasized]:not(:disabled,[disabled])[active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(
--spectrum-alias-component-border-color-emphasized-selected-down
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}}:host{display:inline-flex;flex-direction:row}:host([disabled]){cursor:auto;pointer-events:none}:host([dir]){-webkit-appearance:none}::slotted([slot=icon]){flex-shrink:0}#button{bottom:0;left:0;position:absolute;right:0;top:0}#label{flex-grow:var(--spectrum-actionbutton-label-flex-grow);text-align:var(--spectrum-actionbutton-label-text-align)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
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
)}`;var M=n`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-CornerTriangle75{height:var(
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
)}`;const P={s:"spectrum-UIIcon-CornerTriangle75",m:"spectrum-UIIcon-CornerTriangle100",l:"spectrum-UIIcon-CornerTriangle200",xl:"spectrum-UIIcon-CornerTriangle300"};let G;class $ extends(v(g)){constructor(){super(),this.emphasized=!1,this.holdAffordance=!1,this.quiet=!1,this.role="button",this.selected=!1,this.toggles=!1,this._value="",this.onClick=()=>{if(!this.toggles)return;this.selected=!this.selected;this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=!this.selected)},this.addEventListener("click",this.onClick),this.addEventListener("pointerdown",this.onPointerdown)}static get styles(){return[_,M]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}onPointerdown(){this.addEventListener("pointerup",this.onPointerup),this.addEventListener("pointercancel",this.onPointerup),G=setTimeout((()=>{this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"pointer"}}))}),300)}onPointerup(){clearTimeout(G),this.removeEventListener("pointerup",this.onPointerup),this.removeEventListener("pointercancel",this.onPointerup)}handleKeydown(t){if(!this.holdAffordance)return super.handleKeydown(t);const{code:e,altKey:o}=t;("Space"===e||o&&"ArrowDown"===e)&&(t.preventDefault(),"ArrowDown"===e&&(t.stopPropagation(),t.stopImmediatePropagation()),this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeyup(t){if(!this.holdAffordance)return super.handleKeyup(t);const{code:e,altKey:o}=t;("Space"===e||o&&"ArrowDown"===e)&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"keyboard"}})),this.active=!1)}get buttonContent(){const t=super.buttonContent;return this.holdAffordance&&t.unshift(o`<sp-icon-corner-triangle300 id="hold-affordance" class="${P[this.size]}"></sp-icon-corner-triangle300>`),t}updated(t){super.updated(t);const e="button"===this.role&&(this.selected||this.toggles);(t.has("selected")||t.has("role"))&&(e?this.setAttribute("aria-pressed",this.selected?"true":"false"):this.removeAttribute("aria-pressed"))}}r([c({type:Boolean,reflect:!0})],$.prototype,"emphasized",void 0),r([c({type:Boolean,reflect:!0,attribute:"hold-affordance"})],$.prototype,"holdAffordance",void 0),r([c({type:Boolean,reflect:!0})],$.prototype,"quiet",void 0),r([c({reflect:!0})],$.prototype,"role",void 0),r([c({type:Boolean,reflect:!0})],$.prototype,"selected",void 0),r([c({type:Boolean,reflect:!0})],$.prototype,"toggles",void 0),r([c({type:String})],$.prototype,"value",null),customElements.define("sp-action-button",$),customElements.define("sp-menu-item",C);var O=n`:host([size=s]){--spectrum-link-primary-text-size:var(
--spectrum-link-s-primary-text-size,var(--spectrum-global-dimension-font-size-75)
)}:host([size=m]){--spectrum-link-primary-text-size:var(
--spectrum-link-m-primary-text-size,var(--spectrum-global-dimension-font-size-100)
)}:host([size=l]){--spectrum-link-primary-text-size:var(
--spectrum-link-l-primary-text-size,var(--spectrum-global-dimension-font-size-200)
)}:host([size=xl]){--spectrum-link-primary-text-size:var(
--spectrum-link-xl-primary-text-size,var(--spectrum-global-dimension-font-size-300)
)}a{-webkit-text-decoration-skip:objects;background-color:transparent;cursor:pointer;font-size:var(--spectrum-link-primary-text-size);outline:0;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}a,a.focus-visible{text-decoration:underline}a.focus-visible{-webkit-text-decoration-style:double;text-decoration-style:double}a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([quiet]) a{text-decoration:none}:host([quiet]) a:hover{text-decoration:underline}a{color:var(
--spectrum-link-m-primary-text-color,var(--spectrum-global-color-blue-600)
)}a:hover{color:var(
--spectrum-link-m-primary-text-color-hover,var(--spectrum-global-color-blue-600)
)}a:active{color:var(
--spectrum-link-m-primary-text-color-down,var(--spectrum-global-color-blue-700)
)}a.focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-text-color-key-focus)
)}a:focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-text-color-key-focus)
)}:host([variant=secondary]) a{color:inherit}:host([variant=secondary]) a:hover{color:inherit}:host([variant=secondary]) a:active{color:inherit}:host([variant=secondary]) a:focus{color:inherit}:host([over-background]) a{color:var(
--spectrum-link-m-primary-overbackground-text-color,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:hover{color:var(
--spectrum-link-m-primary-overbackground-text-color-hover,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:active{color:var(
--spectrum-link-m-primary-overbackground-text-color-down,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:focus{color:var(
--spectrum-link-m-primary-overbackground-text-color-key-focus,var(--spectrum-alias-text-color-overbackground)
)}@media (forced-colors:active){:host([variant=secondary]) a{color:linktext}:host([variant=secondary]) a:hover{color:linktext}:host([variant=secondary]) a:active{color:linktext}:host([variant=secondary]) a:focus{color:linktext}}:host{display:inline}:host(:focus){outline:0}:host([href]) a.focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([href]) a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}`;class K extends(v(m(d),{noDefaultSize:!0})){static get styles(){return[O]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}r([b("#anchor")],K.prototype,"anchorElement",void 0),r([c({type:String,reflect:!0})],K.prototype,"variant",void 0),customElements.define("sp-link",K);var N=n`:host([size=s]){--spectrum-divider-height:var(
--spectrum-divider-s-height,var(--spectrum-global-dimension-size-10)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-s-vertical-height,var(--spectrum-global-dimension-size-10)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-s-vertical-width,var(--spectrum-global-dimension-size-10)
)}:host([size=m]){--spectrum-divider-height:var(
--spectrum-divider-m-height,var(--spectrum-global-dimension-size-25)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-m-vertical-height,var(--spectrum-global-dimension-size-25)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-m-vertical-width,var(--spectrum-global-dimension-size-25)
)}:host([size=l]){--spectrum-divider-height:var(
--spectrum-divider-l-height,var(--spectrum-global-dimension-size-50)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-l-vertical-height,var(--spectrum-global-dimension-size-50)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-l-vertical-width,var(--spectrum-global-dimension-size-50)
)}:host{--spectrum-divider-vertical-height:100%}:host{border-width:medium;border:var(--spectrum-divider-height);border-radius:var(--spectrum-divider-height);height:var(--spectrum-divider-height);overflow:visible;width:100%}:host([vertical]){height:var(
--spectrum-divider-vertical-height
);width:var(--spectrum-divider-vertical-width)}:host{--spectrum-divider-l-background-color:var(
--spectrum-global-color-gray-800
);--spectrum-divider-m-background-color:var(
--spectrum-global-color-gray-300
);--spectrum-divider-s-background-color:var(
--spectrum-global-color-gray-300
)}:host([size=l]){background-color:var(
--spectrum-divider-l-background-color,var(--spectrum-global-color-gray-800)
)}:host([size=m]){background-color:var(
--spectrum-divider-m-background-color,var(--spectrum-global-color-gray-300)
)}:host([size=s]){background-color:var(
--spectrum-divider-s-background-color,var(--spectrum-global-color-gray-300)
)}:host{display:block}hr{border:none;margin:0}`;class V extends(v(i,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.vertical=!1}render(){return o``}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}updated(t){super.updated(t),t.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}}V.styles=[N],r([c({type:Boolean,reflect:!0})],V.prototype,"vertical",void 0),customElements.define("sp-divider",V);var W=n`:host{--spectrum-toast-icon-padding-y:var(
--spectrum-global-dimension-size-85
);--spectrum-toast-neutral-content-padding-top:var(
--spectrum-global-dimension-size-65
);--spectrum-toast-content-padding-bottom:var(
--spectrum-global-dimension-size-65
);--spectrum-toast-button-margin-right:var(
--spectrum-global-dimension-size-130
)}:host([dir=ltr]){padding-right:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]){padding-left:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]){padding-left:var(
--spectrum-toast-neutral-padding-left,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]){padding-right:var(
--spectrum-toast-neutral-padding-left,var(--spectrum-global-dimension-size-200)
)}:host{-webkit-font-smoothing:antialiased;align-items:stretch;border-radius:var(
--spectrum-toast-neutral-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;flex-direction:row;font-size:var(
--spectrum-toast-neutral-text-size,var(--spectrum-global-dimension-font-size-100)
);font-weight:var(
--spectrum-toast-neutral-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);padding-bottom:var(
--spectrum-toast-neutral-padding-y,var(--spectrum-global-dimension-size-100)
);padding-top:var(
--spectrum-toast-neutral-padding-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) .type{margin-right:var(
--spectrum-toast-neutral-icon-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl]) .type{margin-left:var(
--spectrum-toast-neutral-icon-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=ltr]) .type{margin-left:0}:host([dir=rtl]) .type{margin-right:0}.type{flex-grow:0;flex-shrink:0;margin-bottom:var(--spectrum-toast-icon-padding-y);margin-top:var(--spectrum-toast-icon-padding-y)}:host([dir=ltr]) .content{padding-right:var(
--spectrum-toast-neutral-content-padding-right,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .content{padding-left:var(
--spectrum-toast-neutral-content-padding-right,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .content{padding-left:0}:host([dir=rtl]) .content{padding-right:0}:host([dir=ltr]) .content{text-align:left}:host([dir=rtl]) .content{text-align:right}.content{box-sizing:border-box;display:inline-block;flex:1 1 auto;font-size:var(
--spectrum-toast-info-text-size,var(--spectrum-global-dimension-font-size-100)
);font-weight:var(
--spectrum-toast-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);line-height:var(
--spectrum-toast-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);padding-bottom:var(--spectrum-toast-content-padding-bottom);padding-top:var(
--spectrum-toast-neutral-content-padding-top,var(--spectrum-global-dimension-size-65)
)}.buttons{align-items:flex-start;display:flex;flex:0 0 auto}:host([dir=ltr]) .buttons .spectrum-ClearButton+.spectrum-ClearButton,:host([dir=ltr]) .buttons .spectrum-ClearButton+::slotted([slot=action]),:host([dir=ltr]) .buttons slot[name=action]+.spectrum-ClearButton,:host([dir=ltr]) .buttons slot[name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-toast-neutral-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .buttons .spectrum-ClearButton+.spectrum-ClearButton,:host([dir=rtl]) .buttons .spectrum-ClearButton+::slotted([slot=action]),:host([dir=rtl]) .buttons slot[name=action]+.spectrum-ClearButton,:host([dir=rtl]) .buttons slot[name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-toast-neutral-button-gap-x,var(--spectrum-global-dimension-size-100)
)}.body{align-self:center;flex:1 1 auto}:host([dir=ltr]) .body ::slotted([slot=action]){float:right}:host([dir=rtl]) .body ::slotted([slot=action]){float:left}:host([dir=ltr]) .body ::slotted([slot=action]){margin-right:var(
--spectrum-toast-button-margin-right
)}:host([dir=rtl]) .body ::slotted([slot=action]){margin-left:var(
--spectrum-toast-button-margin-right
)}:host([dir=ltr]) .body+.buttons{padding-left:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .body+.buttons{padding-right:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) .body+.buttons{border-left-width:1px}:host([dir=rtl]) .body+.buttons{border-right-width:1px}:host([dir=ltr]) .body+.buttons{border-left-style:solid}:host([dir=rtl]) .body+.buttons{border-right-style:solid}:host{background-color:var(
--spectrum-toast-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
);color:var(
--spectrum-toast-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
)}.content{color:var(
--spectrum-toast-neutral-text-color,var(--spectrum-global-color-static-white)
)}.type{color:#fff}:host([dir=ltr]) .buttons{border-left-color:hsla(0,0%,100%,.2)}:host([dir=rtl]) .buttons{border-right-color:hsla(0,0%,100%,.2)}:host([variant=error]),:host([variant=negative]){background-color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
);color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=error]) .closeButton.focus-visible:not(:active),:host([variant=negative]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=error]) .closeButton:focus-visible:not(:active),:host([variant=negative]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=info]){background-color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
);color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=info]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=info]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=positive]),:host([variant=success]){background-color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
);color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}:host([variant=positive]) .closeButton.focus-visible:not(:active),:host([variant=success]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}:host([variant=positive]) .closeButton:focus-visible:not(:active),:host([variant=success]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}.content{line-height:1.5}:host(:not([open])){display:none}`;const Y=["negative","positive","info","error","warning"];class Q extends i{constructor(){super(...arguments),this.open=!1,this._timeout=null,this._variant="",this.countdownStart=0,this.nextCount=-1,this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.open=!1,this.countdownStart=0):this.countdown()},this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown)},this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown)},this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown()}}static get styles(){return[W]}set timeout(t){const e=null!==typeof t&&t>0?Math.max(6e3,t):null,o=this.timeout;e&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=e,this.requestUpdate("timeout",o)}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const e=this.variant;Y.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e)}get variant(){return this._variant}renderIcon(t){switch(t){case"info":return o`<sp-icon-info label="Information" class="type"></sp-icon-info>`;case"negative":case"error":case"warning":return o`<sp-icon-alert label="Error" class="type"></sp-icon-alert>`;case"positive":case"success":return o`<sp-icon-checkmark-circle label="Success" class="type"></sp-icon-checkmark-circle>`;default:return o``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown)}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0}close(){this.open=!1}render(){return o`${this.renderIcon(this.variant)}<div class="body" role="alert"><div class="content"><slot></slot></div><slot name="action"></slot></div><div class="buttons"><sp-clear-button label="Close" variant="overBackground" @click="${this.close}"></sp-clear-button></div>`}updated(t){if(super.updated(t),t.has("open"))if(this.open)this.timeout&&this.startCountdown();else{this.timeout&&this.stopCountdown();this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))||(this.open=!0)}t.has("timeout")&&(null!==this.timeout&&this.open?this.startCountdown():this.stopCountdown())}}r([c({type:Boolean,reflect:!0})],Q.prototype,"open",void 0),r([c({type:Number})],Q.prototype,"timeout",null),r([c({type:String})],Q.prototype,"variant",null),customElements.define("sp-toast",Q);export{F as M,R as P,x as a,f as c,S as o,k as r};
//# sourceMappingURL=deea0ad4.js.map
