import{i as e}from"./112b2095.js";import{M as r,I as o,b as t}from"./016c3086.js";import{l as c,F as i,i as s}from"./357ae97e.js";import"./5af6ced9.js";import"./20e08d65.js";import"./e92b75e6.js";import{S as a}from"./d611ff6d.js";import{x as n,A as p,n as l,d}from"./1a13da4f.js";import{o as u}from"./13228381.js";import{o as m}from"./b95b1899.js";import{t as h}from"./eb03f57e.js";var v=e`
#button{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;cursor:pointer;display:inline-flex;font-family:var(
--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)
);justify-content:center;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin:0;overflow:visible;position:relative;-webkit-text-decoration:none;text-decoration:none;text-transform:none;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,border-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out;-webkit-user-select:none;user-select:none;vertical-align:top}#button:focus{outline:none}#button::-moz-focus-inner{border:0;margin-block:-2px;padding:0}#button:disabled{cursor:default}:host{--spectrum-picker-font-size:var(--spectrum-font-size-100);--spectrum-picker-font-weight:var(--spectrum-regular-font-weight);--spectrum-picker-placeholder-font-style:var(
--spectrum-default-font-style
);--spectrum-picker-line-height:var(--spectrum-line-height-100);--spectrum-picker-block-size:var(--spectrum-component-height-100);--spectrum-picker-inline-size:var(--spectrum-field-width);--spectrum-picker-border-radius:var(--spectrum-corner-radius-100);--spectrum-picker-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-picker-spacing-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-picker-spacing-edge-to-text:var(
--spectrum-component-edge-to-text-100
);--spectrum-picker-spacing-edge-to-text-quiet:var(
--spectrum-field-edge-to-text-quiet
);--spectrum-picker-spacing-top-to-text-side-label-quiet:var(
--spectrum-field-label-top-margin-medium
);--spectrum-picker-spacing-label-to-picker:var(
--spectrum-field-label-to-component
);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-100);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-medium
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-medium
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-medium
);--spectrum-picker-spacing-top-to-alert-icon:var(
--spectrum-field-top-to-alert-icon-medium
);--spectrum-picker-spacing-top-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-medium
);--spectrum-picker-spacing-top-to-disclosure-icon:var(
--spectrum-field-top-to-disclosure-icon-100
);--spectrum-picker-spacing-edge-to-disclosure-icon:var(
--spectrum-field-end-edge-to-disclosure-icon-100
);--spectrum-picker-spacing-edge-to-disclosure-icon-quiet:var(
--spectrum-picker-end-edge-to-disclousure-icon-quiet
);--spectrum-picker-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-picker-font-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-picker-font-color-default-open:var(
--spectrum-neutral-content-color-focus
);--spectrum-picker-font-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-picker-font-color-hover-open:var(
--spectrum-neutral-content-color-focus-hover
);--spectrum-picker-font-color-active:var(
--spectrum-neutral-content-color-down
);--spectrum-picker-font-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-picker-icon-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-picker-icon-color-default-open:var(
--spectrum-neutral-content-color-focus
);--spectrum-picker-icon-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-picker-icon-color-hover-open:var(
--spectrum-neutral-content-color-focus-hover
);--spectrum-picker-icon-color-active:var(
--spectrum-neutral-content-color-down
);--spectrum-picker-icon-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-picker-border-color-error-default:var(
--spectrum-negative-border-color-default
);--spectrum-picker-border-color-error-default-open:var(
--spectrum-negative-border-color-focus
);--spectrum-picker-border-color-error-hover:var(
--spectrum-negative-border-color-hover
);--spectrum-picker-border-color-error-hover-open:var(
--spectrum-negative-border-color-focus-hover
);--spectrum-picker-border-color-error-active:var(
--spectrum-negative-border-color-down
);--spectrum-picker-border-color-error-key-focus:var(
--spectrum-negative-border-color-key-focus
);--spectrum-picker-icon-color-error:var(--spectrum-negative-visual-color);--spectrum-picker-background-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-picker-font-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-picker-icon-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-picker-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-picker-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-picker-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}:host([size=s]){--spectrum-picker-font-size:var(--spectrum-font-size-75);--spectrum-picker-block-size:var(--spectrum-component-height-75);--spectrum-picker-spacing-top-to-text-side-label-quiet:var(
--spectrum-field-label-top-margin-small
);--spectrum-picker-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-picker-spacing-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-picker-spacing-edge-to-text:var(
--spectrum-component-edge-to-text-75
);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-75);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-small
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-small
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-small
);--spectrum-picker-spacing-top-to-alert-icon:var(
--spectrum-field-top-to-alert-icon-small
);--spectrum-picker-spacing-top-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-small
);--spectrum-picker-spacing-top-to-disclosure-icon:var(
--spectrum-field-top-to-disclosure-icon-75
);--spectrum-picker-spacing-edge-to-disclosure-icon:var(
--spectrum-field-end-edge-to-disclosure-icon-75
)}:host([size=l]){--spectrum-picker-font-size:var(--spectrum-font-size-200);--spectrum-picker-block-size:var(--spectrum-component-height-200);--spectrum-picker-spacing-top-to-text-side-label-quiet:var(
--spectrum-field-label-top-margin-large
);--spectrum-picker-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-picker-spacing-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-picker-spacing-edge-to-text:var(
--spectrum-component-edge-to-text-200
);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-200);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-large
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-large
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-large
);--spectrum-picker-spacing-top-to-alert-icon:var(
--spectrum-field-top-to-alert-icon-large
);--spectrum-picker-spacing-top-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-large
);--spectrum-picker-spacing-top-to-disclosure-icon:var(
--spectrum-field-top-to-disclosure-icon-200
);--spectrum-picker-spacing-edge-to-disclosure-icon:var(
--spectrum-field-end-edge-to-disclosure-icon-200
)}:host([size=xl]){--spectrum-picker-font-size:var(--spectrum-font-size-300);--spectrum-picker-block-size:var(--spectrum-component-height-300);--spectrum-picker-spacing-top-to-text-side-label-quiet:var(
--spectrum-field-label-top-margin-extra-large
);--spectrum-picker-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-picker-spacing-bottom-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-picker-spacing-edge-to-text:var(
--spectrum-component-edge-to-text-300
);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-300);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-extra-large
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-extra-large
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-extra-large
);--spectrum-picker-spacing-top-to-alert-icon:var(
--spectrum-field-top-to-alert-icon-extra-large
);--spectrum-picker-spacing-top-to-progress-circle:var(
--spectrum-field-top-to-progress-circle-extra-large
);--spectrum-picker-spacing-top-to-disclosure-icon:var(
--spectrum-field-top-to-disclosure-icon-300
);--spectrum-picker-spacing-edge-to-disclosure-icon:var(
--spectrum-field-end-edge-to-disclosure-icon-300
)}@media (forced-colors:active){:host{--highcontrast-picker-focus-indicator-color:CanvasText;--highcontrast-picker-border-color-default:ButtonText;--highcontrast-picker-border-color-active:ButtonText;--highcontrast-picker-border-color-key-focus:Highlight;--highcontrast-picker-border-color-error-default-open:ButtonText;--highcontrast-picker-border-color-error-hover:ButtonText;--highcontrast-picker-border-color-error-active:ButtonText;--highcontrast-picker-font-color-default:ButtonText;--highcontrast-picker-font-color-default-open:ButtonText;--highcontrast-picker-font-color-key-focus:ButtonText;--highcontrast-picker-font-color-disabled:GrayText;--highcontrast-picker-background-color-default:Background;--highcontrast-picker-background-color-disabled:Background;--highcontrast-picker-icon-color-default:ButtonText;--highcontrast-picker-icon-color-default-open:ButtonText;--highcontrast-picker-icon-color-hover:ButtonText;--highcontrast-picker-icon-color-hover-open:ButtonText;--highcontrast-picker-icon-color-key-focus:Highlight;--highcontrast-picker-icon-color-error-default:ButtonText}#button:disabled,:host([disabled]) #button{border-color:GrayText;border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
)}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{forced-color-adjust:none;outline:0}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{forced-color-adjust:none;outline:0}}#button{background-color:var(
--highcontrast-picker-background-color-default,var(
--mod-picker-background-color-default,var(--spectrum-picker-background-color-default)
)
);block-size:var(--mod-picker-block-size,var(--spectrum-picker-block-size));border-color:var(
--highcontrast-picker-border-color-default,var(
--mod-picker-border-color-default,var(--spectrum-picker-border-color-default)
)
);border-radius:var(
--mod-picker-border-radius,var(--spectrum-picker-border-radius)
);border-style:solid;border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
);box-sizing:border-box;color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);display:flex;inline-size:var(
--mod-picker-inline-size,var(--spectrum-picker-inline-size)
);margin-block-start:var(
--mod-picker-spacing-label-to-picker,var(--spectrum-picker-spacing-label-to-picker)
);max-inline-size:100%;min-inline-size:calc(var(--spectrum-picker-minimum-width-multiplier)*var(--mod-picker-block-size, var(--spectrum-picker-block-size)));padding-block:0;padding-inline-end:var(
--mod-picker-spacing-edge-to-disclosure-icon,var(--spectrum-picker-spacing-edge-to-disclosure-icon)
);padding-inline-start:var(
--mod-picker-spacing-edge-to-text,var(--spectrum-picker-spacing-edge-to-text)
);transition:background-color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
),box-shadow var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
),border-color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
) ease-in-out}#button:after{block-size:calc(100% + var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
)*2 + var(--mod-picker-border-width, var(--spectrum-picker-border-width))*2);border-color:#0000;border-radius:calc(var(--mod-picker-border-radius, var(--spectrum-picker-border-radius)) + var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(--mod-picker-border-width, var(--spectrum-picker-border-width)));border-style:solid;border-width:var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
);content:"";inline-size:calc(100% + var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
)*2 + var(--mod-picker-border-width, var(--spectrum-picker-border-width))*2);inset-block:0;inset-inline:0;margin-block-start:calc((var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(
--mod-picker-focus-indicator-thickness,
var(--spectrum-picker-focus-indicator-thickness)
) + var(
--mod-picker-border-width,
var(--spectrum-picker-border-width)
))*-1);margin-inline-start:calc((var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(
--mod-picker-focus-indicator-thickness,
var(--spectrum-picker-focus-indicator-thickness)
) + var(
--mod-picker-border-width,
var(--spectrum-picker-border-width)
))*-1);pointer-events:none;position:absolute}#button:hover{background-color:var(
--highcontrast-picker-background-color-default,var(
--mod-picker-background-color-hover,var(--spectrum-picker-background-color-hover)
)
);border-color:var(
--highcontrast-picker-border-color-default,var(
--mod-picker-border-color-hover,var(--spectrum-picker-border-color-hover)
)
);color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-hover,var(--spectrum-picker-font-color-hover)
)
)}#button:hover .picker{color:var(
--highcontrast-picker-icon-color-hover,var(
--mod-picker-icon-color-hover,var(--spectrum-picker-icon-color-hover)
)
)}#button:active{background-color:var(
--highcontrast-picker-background-active,var(
--mod-picker-background-color-active,var(--spectrum-picker-background-color-active)
)
);border-color:var(
--highcontrast-picker-border-color-active,var(
--mod-picker-border-active,var(--spectrum-picker-border-color-active)
)
)}#button:active:after{border-color:#0000}#button:active.placeholder #label{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-active,var(--spectrum-picker-font-color-active)
)
)}#button.focus-visible,:host([focused]) #button{background-color:var(
--highcontrast-picker-background-color-default,var(
--mod-picker-background-color-key-focus,var(--spectrum-picker-background-color-key-focus)
)
);border-color:var(
--highcontrast-picker-border-color-key-focus,var(
--mod-picker-border-color-key-focus,var(--spectrum-picker-border-color-key-focus)
)
);border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
);color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
);outline:none}#button:focus-visible,:host([focused]) #button{background-color:var(
--highcontrast-picker-background-color-default,var(
--mod-picker-background-color-key-focus,var(--spectrum-picker-background-color-key-focus)
)
);border-color:var(
--highcontrast-picker-border-color-key-focus,var(
--mod-picker-border-color-key-focus,var(--spectrum-picker-border-color-key-focus)
)
);border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
);color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
);outline:none}#button.focus-visible:after,:host([focused]) #button:after{border-color:var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}#button:focus-visible:after,:host([focused]) #button:after{border-color:var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}#button.focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
)}#button:focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
)}#button.focus-visible .picker,:host([focused]) #button .picker{color:var(
--highcontrast-picker-icon-color-key-focus,var(
--mod-picker-icon-color-key-focus,var(--spectrum-picker-icon-color-key-focus)
)
)}#button:focus-visible .picker,:host([focused]) #button .picker{color:var(
--highcontrast-picker-icon-color-key-focus,var(
--mod-picker-icon-color-key-focus,var(--spectrum-picker-icon-color-key-focus)
)
)}:host([open]) #button{background-color:var(
--highcontrast-picker-background-default-open,var(
--mod-picker-background-color-default-open,var(--spectrum-picker-background-color-default-open)
)
);border-color:var(
--highcontrast-picker-border-color-default-open,var(
--mod-picker-border-default-open,var(--spectrum-picker-border-color-default-open)
)
);color:var(
--highcontrast-picker-font-color-default-open,var(
--mod-picker-font-color-default-open,var(--spectrum-picker-font-color-default-open)
)
)}:host([open]) #button:hover{background-color:var(
--highcontrast-picker-background-color-hover-open,var(
--mod-picker-background-color-hover-open,var(--spectrum-picker-background-color-hover-open)
)
);border-color:var(
--highcontrast-picker-border-color-hover-open,var(
--mod-picker-border-color-hover-open,var(--spectrum-picker-border-color-hover-open)
)
);color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-hover-open,var(--spectrum-picker-font-color-hover-open)
)
)}:host([open]) #button:hover .picker{color:var(
--highcontrast-picker-icon-color-hover-open,var(
--mod-picker-icon-color-hover-open,var(--spectrum-picker-icon-color-hover-open)
)
)}:host([open]) #button .picker{color:var(
--highcontrast-picker-icon-color-default-open,var(
--mod-picker-icon-color-default-open,var(--spectrum-picker-icon-color-default-open)
)
)}:host([invalid]) #button{border-color:var(
--highcontrast-picker-border-color-error-default,var(
--mod-picker-border-color-error-default,var(--spectrum-picker-border-color-error-default)
)
)}:host([invalid]) #button .validation-icon{color:var(
--highcontrast-picker-icon-color-error-default,var(
--mod-picker-icon-color-error,var(--spectrum-picker-icon-color-error)
)
)}:host([invalid]) #button:hover{border-color:var(
--highcontrast-picker-border-color-error-hover,var(
--mod-picker-border-color-error-hover,var(--spectrum-picker-border-color-error-hover)
)
)}:host([invalid]) #button:active{border-color:var(
--highcontrast-picker-border-color-error-active,var(
--mod-picker-border-color-error-active,var(--spectrum-picker-border-color-error-active)
)
)}:host([invalid][open]) #button{border-color:var(
--highcontrast-picker-border-color-error-default-open,var(
--mod-picker-border-color-error-default-open,var(--spectrum-picker-border-color-error-default-open)
)
)}:host([invalid][open]) #button:hover{border-color:var(
--highcontrast-picker-border-color-error-hover-open,var(
--mod-picker-border-color-error-hover-open,var(--spectrum-picker-border-color-error-hover-open)
)
)}:host([invalid]) #button.focus-visible,:host([invalid][focused]) #button{border-color:var(
--highcontrast-picker-border-color-error-default,var(
--mod-picker-border-color-error-key-focus,var(--spectrum-picker-border-color-error-key-focus)
)
)}:host([invalid]) #button:focus-visible,:host([invalid][focused]) #button{border-color:var(
--highcontrast-picker-border-color-error-default,var(
--mod-picker-border-color-error-key-focus,var(--spectrum-picker-border-color-error-key-focus)
)
)}#button.is-loading .picker{color:var(
--highcontrast-picker-icon-color-disabled,var(
--mod-picker-icon-color-disabled,var(--spectrum-picker-icon-color-disabled)
)
)}#button:disabled,:host([disabled]) #button{background-color:var(
--highcontrast-picker-background-color-disabled,var(
--mod-picker-background-color-disabled,var(--spectrum-picker-background-color-disabled)
)
);border-color:#0000;border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
);color:var(
--highcontrast-picker-font-color-disabled,var(
--mod-picker-font-color-disabled,var(--spectrum-picker-font-color-disabled)
)
);cursor:default}#button:disabled .icon,#button:disabled .picker,#button:disabled .validation-icon,:host([disabled]) #button .icon,:host([disabled]) #button .picker,:host([disabled]) #button .validation-icon{color:var(
--highcontrast-picker-icon-color-disabled,var(
--mod-picker-icon-color-disabled,var(--spectrum-picker-icon-color-disabled)
)
)}#button:disabled #label.placeholder,:host([disabled]) #button #label.placeholder{color:var(
--highcontrast-picker-font-color-disabled,var(
--mod-picker-font-color-disabled,var(--spectrum-picker-font-color-disabled)
)
)}.icon{flex-shrink:0;margin-inline-end:var(
--mod-picker-spacing-text-to-icon,var(--spectrum-picker-spacing-text-to-icon)
)}:host([quiet]) #button{inline-size:auto;min-inline-size:0}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{border-color:#0000}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{border-color:#0000}#label{flex:auto;font-size:var(--mod-picker-font-size,var(--spectrum-picker-font-size));font-weight:var(
--mod-picker-font-weight,var(--spectrum-picker-font-weight)
);line-height:var(
--mod-picker-line-height,var(--spectrum-picker-line-height)
);margin-block-end:calc(var(
--mod-picker-spacing-bottom-to-text,
var(--spectrum-picker-spacing-bottom-to-text)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)));margin-block-start:var(
--mod-picker-spacing-top-to-text,var(--spectrum-picker-spacing-top-to-text)
);overflow:hidden;text-align:start;text-overflow:ellipsis;white-space:nowrap}#label.placeholder{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);font-style:var(
--mod-picker-placeholder-font-style,var(--spectrum-picker-placeholder-font-style)
);font-weight:var(
--mod-picker-placeholder-font-weight,var(--spectrum-picker-font-weight)
);transition:color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
) ease-in-out}#label.placeholder:hover{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-hover,var(--spectrum-picker-font-color-hover)
)
)}#label.placeholder:active{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-active,var(--spectrum-picker-font-color-active)
)
)}.picker{color:var(
--highcontrast-picker-icon-color-default,var(
--mod-picker-icon-color-default,var(--spectrum-picker-icon-color-default)
)
);display:inline-block;flex-shrink:0;margin-block:var(
--mod-picker-spacing-top-to-disclosure-icon,var(--spectrum-picker-spacing-top-to-disclosure-icon)
);margin-inline-start:var(
--mod-picker-spacing-icon-to-disclosure-icon,var(--spectrum-picker-spacing-icon-to-disclosure-icon)
);position:relative;transition:color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
) ease-out;vertical-align:top}.picker:active{color:var(
--highcontrast-picker-icon-color-default,var(
--mod-picker-icon-color-active,var(--spectrum-picker-icon-color-active)
)
)}#button .spectrum-ProgressCircle,.validation-icon{margin-inline-start:var(
--mod-picker-spacing-text-to-alert-icon-inline-start,var(--spectrum-picker-spacing-text-to-alert-icon-inline-start)
)}.validation-icon{margin-block-end:calc(var(
--mod-picker-spacing-top-to-alert-icon,
var(--spectrum-picker-spacing-top-to-alert-icon)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)));margin-block-start:calc(var(
--mod-picker-spacing-top-to-alert-icon,
var(--spectrum-picker-spacing-top-to-alert-icon)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)))}#button .spectrum-ProgressCircle{margin-block-end:calc(var(
--mod-picker-spacing-top-to-progress-circle,
var(--spectrum-picker-spacing-top-to-progress-circle)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)));margin-block-start:calc(var(
--mod-picker-spacing-top-to-progress-circle,
var(--spectrum-picker-spacing-top-to-progress-circle)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)))}#label~.picker{margin-inline-start:var(
--mod-picker-spacing-text-to-icon,var(--spectrum-picker-spacing-text-to-icon)
)}:host([quiet]) #button{background-color:#0000;border:none;border-radius:0;color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);margin-block-start:calc(var(
--mod-picker-spacing-label-to-picker-quiet,
var(--spectrum-picker-spacing-label-to-picker-quiet)
) + 1px);padding-inline:var(
--mod-picker-spacing-edge-to-text-quiet,var(--spectrum-picker-spacing-edge-to-text-quiet)
)}:host([quiet]) #button.spectrum-Picker--sideLabel{margin-block-start:calc(var(--spectrum-picker-spacing-top-to-text-side-label-quiet)*-1)}:host([quiet]) #button .picker{margin-inline-end:var(
--mod-picker-spacing-edge-to-disclosure-icon-quiet,var(--spectrum-picker-spacing-edge-to-disclosure-icon-quiet)
)}:host([quiet]) #button:after{block-size:auto;border:none;inline-size:auto}:host([quiet]) #button:hover{background-color:#0000}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{background-color:#0000}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{background-color:#0000}:host([quiet]) #button.focus-visible:after,:host([quiet][focused]) #button:after{border:none;border-radius:0;box-shadow:0 var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
) 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
);margin:calc((var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(
--mod-picker-border-width,
var(--spectrum-picker-border-width)
))*-1) 0}:host([quiet]) #button:focus-visible:after,:host([quiet][focused]) #button:after{border:none;border-radius:0;box-shadow:0 var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
) 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
);margin:calc((var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(
--mod-picker-border-width,
var(--spectrum-picker-border-width)
))*-1) 0}:host([quiet]) #button:active,:host([quiet][open]) #button{background-color:#0000}:host([quiet]) #button:disabled,:host([quiet][disabled]) #button{background-color:#0000}.spectrum-Picker--sideLabel{display:inline-flex;vertical-align:top}:host{--spectrum-picker-background-color-default:var(
--system-spectrum-picker-background-color-default
);--spectrum-picker-background-color-default-open:var(
--system-spectrum-picker-background-color-default-open
);--spectrum-picker-background-color-active:var(
--system-spectrum-picker-background-color-active
);--spectrum-picker-background-color-hover:var(
--system-spectrum-picker-background-color-hover
);--spectrum-picker-background-color-hover-open:var(
--system-spectrum-picker-background-color-hover-open
);--spectrum-picker-background-color-key-focus:var(
--system-spectrum-picker-background-color-key-focus
);--spectrum-picker-border-color-default:var(
--system-spectrum-picker-border-color-default
);--spectrum-picker-border-color-default-open:var(
--system-spectrum-picker-border-color-default-open
);--spectrum-picker-border-color-hover:var(
--system-spectrum-picker-border-color-hover
);--spectrum-picker-border-color-hover-open:var(
--system-spectrum-picker-border-color-hover-open
);--spectrum-picker-border-color-active:var(
--system-spectrum-picker-border-color-active
);--spectrum-picker-border-color-key-focus:var(
--system-spectrum-picker-border-color-key-focus
)}:host{display:inline-flex;inline-size:var(
--spectrum-picker-width,var(--spectrum-global-dimension-size-2400)
);max-inline-size:100%;min-inline-size:calc(var(--spectrum-picker-minimum-width-multiplier)*var(--mod-picker-block-size, var(--spectrum-picker-block-size)));vertical-align:top}:host([quiet]){min-width:0;width:auto}#button{max-width:100%;min-width:100%;width:100%}#icon:not([hidden]){display:inline-flex}:host([readonly]) #button{-webkit-user-select:inherit;user-select:inherit}.picker,.validation-icon{flex-shrink:0}sp-overlay{pointer-events:none}sp-menu{pointer-events:auto}:host>sp-menu{display:none}:host([focused]:not([quiet])) #button #label.placeholder{color:var(
--spectrum-picker-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}#label.visually-hidden~.picker{margin-inline-start:auto}:host([focused]:not([quiet])) #button .picker{color:var(
--spectrum-picker-icon-color-key-focus,var(--spectrum-alias-icon-color-focus)
)}.visually-hidden{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,k=Object.defineProperty,b=Object.getOwnPropertyDescriptor,g=(e,r,o,t)=>{for(var c,i=t>1?void 0:t?b(r,o):r,s=e.length-1;s>=0;s--)(c=e[s])&&(i=(t?c(r,o,i):c(i))||i);return t&&i&&k(r,o,i),i};const f={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"},y="option-picker";class x extends(a(i,{noDefaultSize:!0})){constructor(){super(...arguments),this.isMobile=new r(this,o),this.deprecatedMenu=null,this.disabled=!1,this.focused=!1,this.invalid=!1,this.open=!1,this.readonly=!1,this.selects="single",this.placement="bottom-start",this.quiet=!1,this.value="",this.listRole="listbox",this.itemRole="option",this.preventNextToggle="no",this.handleKeydown=e=>{this.focused=!0,("ArrowDown"===e.code||"ArrowUp"===e.code)&&(e.preventDefault(),this.toggle(!0))},this.applyFocusElementLabel=e=>{this.appliedLabel=e},this.hasRenderedOverlay=!1,this.willManageSelection=!1,this.selectionPromise=Promise.resolve(),this.recentlyConnected=!1,this.enterKeydownOn=null,this.handleEnterKeydown=e=>{if("Enter"===e.code){if(this.enterKeydownOn)return void e.preventDefault();this.addEventListener("keyup",(e=>{"Enter"===e.code&&(this.enterKeydownOn=null)}),{once:!0}),this.enterKeydownOn=this.enterKeydownOn||e.target}}}get menuItems(){return this.optionsMenu.childItems}get selectedItem(){return this._selectedItem}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const r=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",r)}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0}handleButtonBlur(){this.focused=!1}handleButtonPointerdown(){this.preventNextToggle="maybe";const e=()=>{document.removeEventListener("pointerup",e),document.removeEventListener("pointercancel",e),requestAnimationFrame((()=>{this.preventNextToggle="no"}))};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e)}handleButtonFocus(e){"maybe"===this.preventNextToggle&&e.relatedTarget===this.optionsMenu&&(this.preventNextToggle="yes")}handleButtonClick(){this.enterKeydownOn&&this.enterKeydownOn!==this.button||"yes"!==this.preventNextToggle&&this.toggle()}focus(e){super.focus(e),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleHelperFocus(){this.focused=!0,this.button.focus()}handleChange(e){const r=e.target,[o]=r.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(o,e):this.open=!1}async setValueFromItem(e,r){this.open=!1;const o=this.selectedItem,t=this.value;return this.selectedItem=e,this.value=e.value,await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects?(r&&r.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),o&&this.setMenuItemSelected(o,!0),this.selectedItem=o,this.value=t,void(this.open=!0)):this.selects?(o&&this.setMenuItemSelected(o,!1),void this.setMenuItemSelected(e,!!this.selects)):(this.selectedItem=o,void(this.value=t))}setMenuItemSelected(e,r){null!=this.selects&&(e.selected=r)}toggle(e){this.readonly||(this.open=void 0!==e?e:!this.open)}close(){this.readonly||(this.open=!1)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const r=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",r)}renderLabelContent(e){return this.value&&this.selectedItem?e:n`
            <slot name="label">
                <span
                    aria-hidden=${c(this.appliedLabel?void 0:"true")}
                >
                    ${this.label}
                </span>
            </slot>
        `}get buttonContent(){const e={"visually-hidden":"only"===this.icons&&!!this.value,placeholder:!this.value},r=this.appliedLabel||this.label;return[n`
                <span id="icon" ?hidden=${"none"===this.icons}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${u(e)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.value&&this.selectedItem?n`
                          <span
                              aria-hidden="true"
                              class="visually-hidden"
                              id="applied-label"
                          >
                              ${r}
                              <slot name="label"></slot>
                          </span>
                      `:n`
                          <span hidden id="applied-label">${r}</span>
                      `}
                ${this.invalid?n`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `:p}
                <sp-icon-chevron100
                    class="picker ${f[this.size]}"
                ></sp-icon-chevron100>
                <slot aria-hidden="true" name="tooltip" id="tooltip"></slot>
            `]}renderOverlay(e){return import("./cb5a61eb.js").then((function(e){return e.s})),n`
            <sp-overlay
                .triggerElement=${this}
                .offset=${0}
                ?open=${this.open}
                .placement=${this.isMobile.matches?void 0:this.placement}
                .type=${this.isMobile.matches?"modal":"auto"}
                .receivesFocus=${"true"}
                @beforetoggle=${e=>{e.composedPath()[0]===e.target&&("closed"===e.newState&&(this.open=!1),this.open||(this.optionsMenu.updateSelectedItemIndex(),this.optionsMenu.closeDescendentOverlays()))}}
            >
                ${this.renderContainer(e)}
            </sp-overlay>
        `}get renderDescriptionSlot(){return n`
            <div id=${y}>
                <slot name="description"></slot>
            </div>
        `}render(){return n`
            <span
                id="focus-helper"
                tabindex="${this.focused||this.open?"-1":"0"}"
                @focus=${this.handleHelperFocus}
                aria-describedby=${y}
            ></span>
            <button
                aria-controls=${c(this.open?"menu":void 0)}
                aria-describedby="tooltip"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="true"
                aria-labelledby="icon label applied-label"
                id="button"
                class="button"
                @blur=${this.handleButtonBlur}
                @pointerdown=${this.handleButtonPointerdown}
                @focus=${this.handleButtonFocus}
                @click=${this.handleButtonClick}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
                tabindex="-1"
            >
                ${this.buttonContent}
            </button>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(e){var r,o;this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&(this.open=!1),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),null==(r=this.deprecatedMenu)||r.toggleAttribute("ignore",!0),null==(o=this.deprecatedMenu)||o.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener()}get dismissHelper(){return n`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `}renderContainer(e){const r=n`
            ${this.dismissHelper} ${e} ${this.dismissHelper}
        `;return this.isMobile.matches?(import("./14dc77f3.js").then((function(e){return e.s})),n`
                <sp-tray
                    id="popover"
                    role="presentation"
                    style=${m(this.containerStyles)}
                >
                    ${r}
                </sp-tray>
            `):(import("./e8dda338.js"),n`
            <sp-popover
                id="popover"
                role="presentation"
                style=${m(this.containerStyles)}
                placement=${this.placement}
            >
                ${r}
            </sp-popover>
        `)}get renderMenu(){const e=n`
            <sp-menu
                aria-labelledby="applied-label"
                @change=${this.handleChange}
                id="menu"
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                role=${this.listRole}
                .selects=${this.selects}
                .selected=${this.value?[this.value]:[]}
                size=${this.size}
                @sp-menu-item-added-or-updated=${this.shouldManageSelection}
            >
                <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
            </sp-menu>
        `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?this.renderOverlay(e):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame((()=>{requestAnimationFrame((()=>{this.manageSelection()}))})))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(null==this.selects)return;let e;this.selectionPromise=new Promise((e=>this.selectionResolver=e)),await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise((e=>requestAnimationFrame((()=>e(!0))))),this.recentlyConnected=!1),this.menuItems.forEach((r=>{this.value!==r.value||r.disabled?r.selected=!1:e=r})),e?(e.selected=!!this.selects,this.selectedItem=e):(this.value="",this.selectedItem=void 0),this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,this.overlayElement&&await this.overlayElement.updateComplete,e}connectedCallback(){super.connectedCallback(),this.recentlyConnected=this.hasUpdated}disconnectedCallback(){this.close(),super.disconnectedCallback()}}g([h()],x.prototype,"appliedLabel",2),g([s("#button")],x.prototype,"button",2),g([l({type:Boolean,reflect:!0})],x.prototype,"disabled",2),g([l({type:Boolean,reflect:!0})],x.prototype,"focused",2),g([l({type:String,reflect:!0})],x.prototype,"icons",2),g([l({type:Boolean,reflect:!0})],x.prototype,"invalid",2),g([l()],x.prototype,"label",2),g([l({type:Boolean,reflect:!0})],x.prototype,"open",2),g([l({type:Boolean,reflect:!0})],x.prototype,"readonly",2),g([s("sp-menu")],x.prototype,"optionsMenu",2),g([s("sp-overlay")],x.prototype,"overlayElement",2),g([l()],x.prototype,"placement",2),g([l({type:Boolean,reflect:!0})],x.prototype,"quiet",2),g([l({type:String})],x.prototype,"value",2),g([l({attribute:!1})],x.prototype,"selectedItem",1),g([l({attribute:!1})],x.prototype,"selectedItemContent",1);d("sp-picker",class extends x{constructor(){super(...arguments),this.handleKeydown=e=>{const{code:r}=e;if(this.focused=!0,!r.startsWith("Arrow")||this.readonly)return;if("ArrowUp"===r||"ArrowDown"===r)return void this.toggle(!0);e.preventDefault();const o=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,t=o<0||"ArrowRight"===r?1:-1;let c=o+t;for(;this.menuItems[c]&&this.menuItems[c].disabled;)c+=t;!this.menuItems[c]||this.menuItems[c].disabled||(!this.value||c!==o)&&this.setValueFromItem(this.menuItems[c])}}static get styles(){return[v,t]}get containerStyles(){const e=super.containerStyles;return this.quiet||(e["min-width"]=`${this.offsetWidth}px`),e}});export{y as D,x as P};
//# sourceMappingURL=30892ac8.js.map
