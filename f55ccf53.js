import{T as t}from"./1e267a98.js";import{i as o}from"./d230bd74.js";import{L as e,a as r,t as c,i as s,S as n}from"./f4a2163c.js";import{r as a,f as i,o as u}from"./f43d2d85.js";import"./5c39e58f.js";import"./2722a9f7.js";import{y as l,e as d,S as m,b as p,Z as b}from"./95f60e39.js";import{u as h,S as v,I as g,B as f}from"./fe7541c2.js";import"./be36498e.js";import"./29f0a507.js";customElements.define("sp-theme",t);var k=o`
#button{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)
);line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,border-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}#button:focus{outline:none}#button::-moz-focus-inner{border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}#button:disabled{cursor:default}:host{--spectrum-picker-font-size:var(
--spectrum-font-size-100
);--spectrum-picker-placeholder-font-style-default:italic;--spectrum-picker-placeholder-cjk-font-style:normal;--spectrum-picker-placeholder-font-style:var(
--spectrum-picker-placeholder-font-style-default
);--spectrum-picker-min-inline-size:var(
--spectrum-picker-minimum-width-multiplier
);--spectrum-picker-block-size:var(--spectrum-component-height-100);--spectrum-picker-border-width:var(--spectrum-border-width-100);--spectrum-picker-border-radius:var(--spectrum-corner-radius-100);--spectrum-picker-spacing-edge-to-text:var(
--spectrum-component-edge-to-text-100
);--spectrum-picker-spacing-edge-to-text-quiet:var(
--spectrum-field-edge-to-text-quiet
);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-100);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-medium
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-medium
);--spectrum-picker-spacing-label-to-picker:var(
--spectrum-field-label-to-component
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-medium
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
);--spectrum-focus-indicator-gap:2px;--spectrum-picker-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-focus-indicator-thickness:2px;--spectrum-picker-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-picker-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}#button:lang(ja),#button:lang(ko),#button:lang(zh){--spectrum-picker-placeholder-font-style:var(
--spectrum-picker-placeholder-cjk-font-style
)}:host([size=s]){--spectrum-picker-font-size:var(
--spectrum-font-size-75
);--spectrum-picker-block-size:var(--spectrum-component-height-75);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-75);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-small
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-small
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-small
)}:host([size=s][open])+.spectrum-Popover--bottom{--spectrum-picker-spacing-picker-to-popover:var(
--spectrum-component-to-menu-small
)}:host([size=m]){--spectrum-picker-font-size:var(
--spectrum-font-size-100
);--spectrum-picker-block-size:var(--spectrum-component-height-100);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-100);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-medium
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-medium
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-medium
)}:host([size=m][open])+.spectrum-Popover--bottom{--spectrum-picker-spacing-picker-to-popover:var(
--spectrum-component-to-menu-medium
)}:host([size=l]){--spectrum-picker-font-size:var(
--spectrum-font-size-200
);--spectrum-picker-block-size:var(--spectrum-component-height-200);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-200);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-large
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-large
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-large
)}:host([size=l][open])+.spectrum-Popover--bottom{--spectrum-picker-spacing-picker-to-popover:var(
--spectrum-component-to-menu-large
)}:host([size=xl]){--spectrum-picker-font-size:var(
--spectrum-font-size-300
);--spectrum-picker-block-size:var(--spectrum-component-height-300);--spectrum-picker-spacing-text-to-icon:var(--spectrum-text-to-visual-300);--spectrum-picker-spacing-text-to-alert-icon-inline-start:var(
--spectrum-field-text-to-alert-icon-extra-large
);--spectrum-picker-spacing-icon-to-disclosure-icon:var(
--spectrum-picker-visual-to-disclosure-icon-extra-large
);--spectrum-picker-spacing-label-to-picker-quiet:var(
--spectrum-field-label-to-component-quiet-extra-large
)}:host([size=xl][open])+.spectrum-Popover--bottom{--spectrum-picker-spacing-picker-to-popover:var(
--spectrum-component-to-menu-extra-large
)}@media (forced-colors:active){#button{--highcontrast-picker-focus-indicator-color:CanvasText;--highcontrast-picker-border-color-default:ButtonText;--highcontrast-picker-border-color-active:ButtonText;--highcontrast-picker-border-color-key-focus:Highlight;--highcontrast-picker-border-color-error-default-open:ButtonText;--highcontrast-picker-border-color-error-hover:ButtonText;--highcontrast-picker-border-color-error-active:ButtonText;--highcontrast-picker-font-color-default:ButtonText;--highcontrast-picker-font-color-default-open:ButtonText;--highcontrast-picker-font-color-key-focus:ButtonText;--highcontrast-picker-font-color-disabled:GrayText;--highcontrast-picker-background-color-default:Background;--highcontrast-picker-background-color-disabled:Background;--highcontrast-picker-icon-color-default:ButtonText;--highcontrast-picker-icon-color-default-open:ButtonText;--highcontrast-picker-icon-color-hover:ButtonText;--highcontrast-picker-icon-color-hover-open:ButtonText;--highcontrast-picker-icon-color-key-focus:Highlight;--highcontrast-picker-icon-color-error-default:ButtonText}#button:disabled,:host([disabled]) #button{border-color:GrayText;border-width:var(
--mod-picker-border-width,var(--spectrum-picker-border-width)
)}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{box-shadow:0 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
);forced-color-adjust:none;outline:0}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{box-shadow:0 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
);forced-color-adjust:none;outline:0}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{box-shadow:0 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
);forced-color-adjust:none;outline:0}}#button{align-items:center;background-color:var(
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
--mod-spectrum-picker-border-width,var(--spectrum-picker-border-width)
);color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);display:flex;justify-content:center;margin:0;margin-block-start:var(
--mod-picker-spacing-label-to-picker,var(--spectrum-picker-spacing-label-to-picker)
);max-inline-size:100%;min-inline-size:var(
--mod-picker-min-inline-size,var(--spectrum-picker-min-inline-size)
);padding-block:0;padding-inline:var(
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
)*2 + var(
--mod-picker-border-width,
var(--spectrum-picker-border-width) * 2
));border-color:transparent;border-radius:calc(var(--mod-picker-border-radius, var(--spectrum-picker-border-radius)) + var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(--mod-picker-border-width, var(--spectrum-picker-border-width)));border-style:solid;border-width:var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
);bottom:0;content:"";inline-size:calc(100% + var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
)*2 + var(--mod-picker-border-width, var(--spectrum-picker-border-width))*2);left:0;margin:auto;margin-inline-start:calc((var(
--mod-picker-focus-indicator-gap,
var(--spectrum-picker-focus-indicator-gap)
) + var(
--mod-picker-focus-indicator-thickness,
var(--spectrum-picker-focus-indicator-thickness)
) + var(
--mod-picker-border-size,
var(--spectrum-picker-border-size)
))*-1);pointer-events:none;position:absolute;right:0;top:0}#button.focus-visible{outline:none}#button:focus-visible{outline:none}#button.focus-visible:after{border-color:var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}#button.focus-visible:after{border-color:var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}#button:focus-visible:after{border-color:var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}#button:hover{background-color:var(
--highcontrast-picker-background-color-default,var(
--mod-picker-background-color-hover,var(--spectrum-picker-background-color-hover)
)
);border-color:var(
--highcontrast-picker-border-color-default,var(
--mod-picker-border-color-hover,var(--spectrum-picker-border-color-hover)
)
);color:var(
--highcontrast-picker-font-color-default,var(--mod-picker-font-color-hover,(--spectrum-picker-font-color-hover))
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
)}#button:active:after{border-color:transparent}#button:active.placeholder #label{color:var(
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
)}#button:focus-visible,:host([focused]) #button{background-color:var(
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
)}#button.focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
)}#button.focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
)
)}#button:focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--highcontrast-picker-font-color-key-focus,var(
--mod-picker-font-color-key-focus,var(--spectrum-picker-font-color-key-focus)
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
)}:host([open]) #button:hover{background-color:var(--spectrum-picker-background-color-hover-open);border-color:var(--spectrum-picker-border-color-hover-open);color:var(
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
);border-color:transparent;border-width:var(
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
)}:host([quiet]) #button{inline-size:auto;min-inline-size:0}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{border-color:transparent}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{border-color:transparent}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{border-color:transparent}#label{block-size:calc(var(--mod-picker-block-size, var(--spectrum-picker-block-size)) - var(--mod-picker-border-size, var(--spectrum-picker-border-size))*2);flex:1 1 auto;font-size:var(--mod-picker-font-size,var(--spectrum-picker-font-size));line-height:calc(var(--mod-picker-block-size, var(--spectrum-picker-block-size)) - var(--mod-picker-border-size, var(--spectrum-picker-border-size))*2);overflow:hidden;text-align:start;text-overflow:ellipsis;white-space:nowrap}#label.placeholder{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);font-style:var(
--mod-picker-placeholder-font-style,var(--spectrum-picker-placeholder-font-style)
);font-weight:400;transition:color var(
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
);display:inline-block;flex-shrink:0;margin-inline-start:var(
--mod-picker-spacing-icon-to-disclosure-icon,var(--spectrum-picker-spacing-icon-to-disclosure-icon)
);position:relative;transition:color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
) ease-out;vertical-align:top}.picker.focus-visible{color:var(
--highcontrast-picker-icon-color-key-focus,var(
--mod-picker-icon-color-key-focus,var(--spectrum-picker-icon-color-key-focus)
)
)}.picker:focus-visible{color:var(
--highcontrast-picker-icon-color-key-focus,var(
--mod-picker-icon-color-key-focus,var(--spectrum-picker-icon-color-key-focus)
)
)}.picker:active{color:var(
--highcontrast-picker-icon-color-default,var(
--mod-picker-icon-color-active,var(--spectrum-picker-icon-color-active)
)
)}.validation-icon{margin-inline-start:var(
--mod-picker-spacing-text-to-alert-icon-inline-start,var(--spectrum-picker-spacing-text-to-alert-icon-inline-start)
)}#label~.picker{margin-inline-start:var(
--mod-picker-spacing-text-to-icon,var(--spectrum-picker-spacing-text-to-icon)
)}:host([quiet][open])+.spectrum-Popover--bottom{margin-inline-start:calc(var(
--mod-picker-popover-quiet-offset-x,
var(--spectrum-picker-popover-quiet-offset-x)
)*-1)}:host([quiet]) #button{background-color:transparent;border:none;border-radius:0;color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);margin-block-start:var(
--mod-picker-spacing-label-to-picker-quiet,var(--spectrum-picker-spacing-label-to-picker-quiet)
);padding-inline:var(
--mod-picker-spacing-edge-to-text-quiet,var(--spectrum-picker-spacing-edge-to-text-quiet)
)}:host([quiet]) #button:after{border:none}:host([quiet]) #button:hover{background-color:transparent}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{background-color:transparent}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{background-color:transparent}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{background-color:transparent}:host([quiet]) #button.focus-visible:after,:host([quiet][focused]) #button:after{border:none;border-radius:0;box-shadow:0 var(
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
))*-1) 0}:host([quiet]) #button.focus-visible:after,:host([quiet][focused]) #button:after{border:none;border-radius:0;box-shadow:0 var(
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
))*-1) 0}:host([quiet]) #button:active,:host([quiet][open]) #button{background-color:transparent}:host([quiet]) #button:active.focus-visible:after,:host([quiet][focused]) #button:active:after,:host([quiet][open]) #button.focus-visible:after,:host([quiet][open][focused]) #button:after{box-shadow:none}:host([quiet]) #button:active.focus-visible:after,:host([quiet][focused]) #button:active:after,:host([quiet][open]) #button.focus-visible:after,:host([quiet][open][focused]) #button:after{box-shadow:none}:host([quiet]) #button:active:focus-visible:after,:host([quiet][focused]) #button:active:after,:host([quiet][open]) #button:focus-visible:after,:host([quiet][open][focused]) #button:after{box-shadow:none}:host([quiet][invalid]:not([open])) #button.focus-visible,:host([quiet][invalid]:not([open])[focused]) #button{box-shadow:none}:host([quiet][invalid]:not([open])) #button.focus-visible,:host([quiet][invalid]:not([open])[focused]) #button{box-shadow:none}:host([quiet][invalid]:not([open])) #button:focus-visible,:host([quiet][invalid]:not([open])[focused]) #button{box-shadow:none}:host([quiet][invalid]:not([open])) #button.focus-visible:after,:host([quiet][invalid]:not([open])[focused]) #button:after{box-shadow:0 var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
) 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}:host([quiet][invalid]:not([open])) #button.focus-visible:after,:host([quiet][invalid]:not([open])[focused]) #button:after{box-shadow:0 var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
) 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}:host([quiet][invalid]:not([open])) #button:focus-visible:after,:host([quiet][invalid]:not([open])[focused]) #button:after{box-shadow:0 var(
--mod-picker-focus-indicator-thickness,var(--spectrum-picker-focus-indicator-thickness)
) 0 0 var(
--highcontrast-picker-focus-indicator-color,var(
--mod-picker-focus-indicator-color,var(--spectrum-picker-focus-indicator-color)
)
)}:host([quiet]) #button:disabled,:host([quiet][disabled]) #button{background-color:transparent}:host{--spectrum-picker-border-size:var(
--system-spectrum-picker-border-size
);--spectrum-picker-background-color-default:var(
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
)}:host{display:inline-flex;max-width:100%;min-width:var(--spectrum-picker-min-width);vertical-align:top;width:var(--spectrum-picker-width)}:host([quiet]){min-width:0;width:auto}:host([size]){--spectrum-picker-width:var(--spectrum-global-dimension-size-2400)}#button{max-width:100%;min-width:100%;width:100%}#icon:not([hidden]){display:inline-flex}:host([readonly]) #button{-webkit-user-select:inherit;user-select:inherit}sp-popover{display:none}.picker,.validation-icon{flex-shrink:0}:host([focused]:not([quiet])) #button #label.placeholder{color:var(
--spectrum-picker-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([focused]:not([quiet])) #button .picker{color:var(
--spectrum-picker-icon-color-key-focus,var(--spectrum-alias-icon-color-focus)
)}.visually-hidden{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([dir=ltr]) #label.visually-hidden+.picker{margin-left:auto}:host([dir=rtl]) #label.visually-hidden+.picker{margin-right:auto}
`;var y=o`
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
`;const w=async(t,o,e,r)=>{const{Overlay:c}=await import("./4b1f9fa7.js");return c.open(t,o,e,r)};class x extends Event{constructor({root:t}){super("sp-overlay-close",{bubbles:!0,composed:!0}),this.root=t}}var z=o`
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
)}:host([dir=ltr].focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=ltr]:focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl].focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl].focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl]:focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
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
`,I=Object.defineProperty,C=Object.getOwnPropertyDescriptor,q=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?C(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&I(o,e,s),s};class T extends Event{constructor(){super("sp-menu-item-removed",{bubbles:!0,composed:!0}),this.focused=!1}get item(){return this._item}reset(t){this._item=t}}class U extends Event{constructor(){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0})}set focusRoot(t){this.item.menuData.focusRoot=this.item.menuData.focusRoot||t}set selectionRoot(t){this.item.menuData.selectionRoot=this.item.menuData.selectionRoot||t}get item(){return this._item}set currentAncestorWithSelects(t){this._currentAncestorWithSelects=t}get currentAncestorWithSelects(){return this._currentAncestorWithSelects}reset(t){this._item=t,this._currentAncestorWithSelects=void 0,t.menuData={focusRoot:void 0,selectionRoot:void 0}}}const S=new U,E=new T,A=class extends(e(r)){constructor(){super(),this.isInSubmenu=!1,this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.hasSubmenu=!1,this.noWrap=!1,this.open=!1,this.handleSubmenuChange=()=>{var t;null==(t=this.menuData.selectionRoot)||t.selectOrToggleItem(this)},this.handleSubmenuPointerenter=()=>{this.leaveTimeout&&(clearTimeout(this.leaveTimeout),delete this.leaveTimeout)},this.menuData={focusRoot:void 0,selectionRoot:void 0},this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0}),new c(this,{config:{characterData:!0,childList:!0,subtree:!0},callback:()=>{this.breakItemChildrenCache()}})}static get styles(){return[z,h,y]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return this.itemChildren.content.reduce(((t,o)=>t+(o.textContent||"").trim()),"")}get focusElement(){return this}get itemChildren(){var t,o;if(this._itemChildren)return this._itemChildren;const e=null==(t=this.shadowRoot)?void 0:t.querySelector('slot[name="icon"]'),r=e?e.assignedElements().map((t=>{const o=t.cloneNode(!0);return o.removeAttribute("slot"),o.classList.toggle("icon"),o})):[],c=null==(o=this.shadowRoot)?void 0:o.querySelector("slot:not([name])"),s=c?c.assignedNodes().map((t=>t.cloneNode(!0))):[];return this._itemChildren={icon:r,content:s},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;return this.anchorElement&&(this.anchorElement.click(),t=!0),t}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}render(){return l`
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="value"></slot>
            ${this.selected?l`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 icon checkmark"
                      ></sp-icon-checkmark100>
                  `:l``}
            ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):l``}
            <slot
                hidden
                name="submenu"
                @slotchange=${this.manageSubmenu}
            ></slot>
            ${this.hasSubmenu?l`
                      <sp-icon-chevron100
                          class="spectrum-UIIcon-ChevronRight100 chevron icon"
                      ></sp-icon-chevron100>
                  `:l``}
        `}manageSubmenu(t){const o=t.target.assignedElements({flatten:!0});this.hasSubmenu=this.open||!!o.length}handleRemoveActive(t){"pointerleave"===t.type&&this.hasSubmenu||this.hasSubmenu||this.open||(this.active=!1)}handlePointerdown(){this.active=!0}firstUpdated(t){super.firstUpdated(t),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.hasAttribute("id")||(this.id="sp-menu-item-"+A.instanceCount++),this.addEventListener("pointerenter",this.closeOverlaysForRoot)}closeOverlaysForRoot(){if(this.open)return;const t=new x({root:this.menuData.focusRoot});this.dispatchEvent(t)}handleSubmenuClick(){this.openOverlay()}handlePointerenter(){if(this.leaveTimeout)return clearTimeout(this.leaveTimeout),void delete this.leaveTimeout;this.openOverlay()}handlePointerleave(){this.hasSubmenu&&this.open&&(this.leaveTimeout=setTimeout((()=>{delete this.leaveTimeout,this.closeOverlay&&this.closeOverlay()}),100))}async openOverlay(){if(!this.hasSubmenu||this.open||this.disabled)return;this.open=!0,this.active=!0;const t=this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements()[0];t.addEventListener("pointerenter",this.handleSubmenuPointerenter),t.addEventListener("change",this.handleSubmenuChange);const o=document.createElement("sp-popover"),e=a([t],o,{position:"beforeend",prepareCallback:t=>{const o=t.slot;return t.tabIndex=0,t.removeAttribute("slot"),t.isSubmenu=!0,t=>{t.tabIndex=-1,t.slot=o,t.isSubmenu=!1}}}),r=w(this,"click",o,{placement:this.isLTR?"right-start":"left-start",receivesFocus:"auto",root:this.menuData.focusRoot}),c=async()=>{delete this.closeOverlay,(await r)()};this.closeOverlay=c;this.addEventListener("sp-closed",(t=>{t.stopPropagation(),delete this.closeOverlay,e(),this.open=!1,this.active=!1}),{once:!0}),o.addEventListener("change",c)}updateAriaSelected(){const t=this.getAttribute("role");"option"===t?this.setAttribute("aria-selected",this.selected?"true":"false"):("menuitemcheckbox"===t||"menuitemradio"===t)&&this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(t){this.setAttribute("role",t),this.updateAriaSelected()}updated(t){super.updated(t),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive)):(this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),t.has("selected")&&this.updateAriaSelected(),t.has("hasSubmenu")&&(this.hasSubmenu?(this.addEventListener("click",this.handleSubmenuClick),this.addEventListener("pointerenter",this.handlePointerenter),this.addEventListener("pointerleave",this.handlePointerleave)):this.closeOverlay||(this.removeEventListener("click",this.handleSubmenuClick),this.removeEventListener("pointerenter",this.handlePointerenter),this.removeEventListener("pointerleave",this.handlePointerleave)))}connectedCallback(){super.connectedCallback(),this.isInSubmenu=!!this.closest('[slot="submenu"]'),!this.isInSubmenu&&(S.reset(this),this.dispatchEvent(S),this._parentElement=this.parentElement)}disconnectedCallback(){var t;E.reset(this),this.isInSubmenu||null==(t=this._parentElement)||t.dispatchEvent(E),this.isInSubmenu=!1,super.disconnectedCallback()}async triggerUpdate(){this.isInSubmenu||(await new Promise((t=>requestAnimationFrame(t))),S.reset(this),this.dispatchEvent(S))}};let P=A;P.instanceCount=0,q([d({type:Boolean,reflect:!0})],P.prototype,"active",2),q([d({type:Boolean,reflect:!0})],P.prototype,"focused",2),q([d({type:Boolean,reflect:!0})],P.prototype,"selected",2),q([d({type:String})],P.prototype,"value",1),q([d({type:Boolean})],P.prototype,"hasSubmenu",2),q([d({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],P.prototype,"noWrap",2),q([s(".anchor")],P.prototype,"anchorElement",2),q([d({type:Boolean})],P.prototype,"open",2);var B=o`
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
`,L=Object.defineProperty,R=Object.getOwnPropertyDescriptor,O=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?R(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&L(o,e,s),s};function D(t,o){return!!o&&(t===o||t.contains(o))}class j extends m{constructor(){super(),this.isSubmenu=!1,this.label="",this.value="",this.valueSeparator=",",this.selected=[],this.selectedItems=[],this.childItemSet=new Set,this.focusedItemIndex=0,this.focusInItemIndex=0,this.selectedItemsMap=new Map,this._willUpdateItems=!1,this._notFirstUpdated=!1,this.cacheUpdated=Promise.resolve(),this.addEventListener("sp-menu-item-added-or-updated",this.onSelectableItemAddedOrUpdated),this.addEventListener("sp-menu-item-added-or-updated",this.onFocusableItemAddedOrUpdated,{capture:!0}),this.addEventListener("sp-menu-item-removed",this.removeChildItem),this.addEventListener("click",this.onClick),this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[B]}get childItems(){return this.cachedChildItems||(this.cachedChildItems=this.updateCachedMenuItems()),this.cachedChildItems}updateCachedMenuItems(){this.cachedChildItems=[];const t=this.menuSlot?this.menuSlot.assignedElements({flatten:!0}):[];for(const o of t){const t=o instanceof P?[o]:[...o.querySelectorAll("*")];for(const o of t)this.childItemSet.has(o)&&this.cachedChildItems.push(o)}return this.cachedChildItems}get childRole(){if("listbox"===this.resolvedRole)return"option";switch(this.resolvedSelects){case"single":return"menuitemradio";case"multiple":return"menuitemcheckbox";default:return"menuitem"}}get ownRole(){return"menu"}onFocusableItemAddedOrUpdated(t){var o;t.item.menuData.focusRoot&&(this.tabIndex=-1),t.focusRoot=this,this.addChildItem(t.item),"inherit"===this.selects?(this.resolvedSelects="inherit",this.resolvedRole=(null==(o=t.currentAncestorWithSelects)?void 0:o.getAttribute("role"))||this.getAttribute("role")||void 0):this.selects?(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects=this.selects,t.currentAncestorWithSelects=this):(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects="none"===this.resolvedRole?"ignore":"none")}onSelectableItemAddedOrUpdated(t){("single"===this.resolvedSelects||"multiple"===this.resolvedSelects||!this.selects&&"ignore"!==this.resolvedSelects)&&!t.item.menuData.selectionRoot&&(t.item.setRole(this.childRole),t.selectionRoot=this)}addChildItem(t){this.childItemSet.add(t),this.handleItemsChanged()}async removeChildItem(t){this.childItemSet.delete(t.item),this.cachedChildItems=void 0,t.item.focused&&(this.handleItemsChanged(),await this.updateComplete,this.focus())}focus({preventScroll:t}={}){if(!this.childItems.length||this.childItems.every((t=>t.disabled)))return;if(this.childItems.some((t=>t.menuData.focusRoot!==this)))return void super.focus({preventScroll:t});this.focusMenuItemByOffset(0),super.focus({preventScroll:t});const o=this.querySelector("[selected]");o&&!t&&o.scrollIntoView({block:"nearest"})}onClick(t){if(t.defaultPrevented)return;const o=t.composedPath().find((t=>t instanceof Element&&t.getAttribute("role")===this.childRole));null!=o&&o.href&&o.href.length?this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})):(null==o?void 0:o.menuData.selectionRoot)===this&&this.childItems.length&&(t.preventDefault(),o.hasSubmenu||o.open||(this.selectOrToggleItem(o),this.prepareToCleanUp()))}handleFocusin(t){var o;const e=D(this,t.relatedTarget);if(e||this.childItems.some((t=>t.menuData.focusRoot!==this)))return;const r=this.getRootNode().activeElement,c=(null==(o=this.childItems[this.focusedItemIndex])?void 0:o.menuData.selectionRoot)||this;if((r!==c||!e)&&(c.focus({preventScroll:!0}),r&&0===this.focusedItemIndex)){const t=this.childItems.findIndex((t=>t===r));t>0&&this.focusMenuItemByOffset(t)}this.startListeningToKeyboard()}startListeningToKeyboard(){this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.handleFocusout)}handleFocusout(t){if(D(this,t.relatedTarget))t.composedPath()[0].focused=!1;else{if(this.stopListeningToKeyboard(),t.target===this&&this.childItems.some((t=>t.menuData.focusRoot===this))){const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1)}this.removeAttribute("aria-activedescendant")}}stopListeningToKeyboard(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)}async selectOrToggleItem(t){const o=this.resolvedSelects,e=new Map(this.selectedItemsMap),r=this.selected.slice(),c=this.selectedItems.slice(),s=this.value;if(this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=this.childItems.indexOf(t),this.forwardFocusVisibleToItem(t),"multiple"===o){this.selectedItemsMap.has(t)?this.selectedItemsMap.delete(t):this.selectedItemsMap.set(t,!0);const o=[],e=[];this.childItemSet.forEach((t=>{t.menuData.selectionRoot===this&&this.selectedItemsMap.has(t)&&(o.push(t.value),e.push(t))})),this.selected=o,this.selectedItems=e,this.value=this.selected.join(this.valueSeparator)}else this.selectedItemsMap.clear(),this.selectedItemsMap.set(t,!0),this.value=t.value,this.selected=[t.value],this.selectedItems=[t];if(await this.updateComplete,!this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})))return this.selected=r,this.selectedItems=c,this.selectedItemsMap=e,void(this.value=s);if("single"===o){for(const o of e.keys())o!==t&&(o.selected=!1);t.selected=!0}else"multiple"===o&&(t.selected=!t.selected)}navigateWithinMenu(t){const{code:o}=t,e=this.childItems[this.focusedItemIndex],r="ArrowDown"===o?1:-1,c=this.focusMenuItemByOffset(r);c!==e&&(t.preventDefault(),c.scrollIntoView({block:"nearest"}))}navigateBetweenRelatedMenus(t){const o=this.isLTR&&"ArrowRight"===t||!this.isLTR&&"ArrowLeft"===t,e=this.isLTR&&"ArrowLeft"===t||!this.isLTR&&"ArrowRight"===t;if(o){const t=this.childItems[this.focusedItemIndex];null!=t&&t.hasSubmenu&&(this.blur(),t.openOverlay())}else e&&this.isSubmenu&&this.dispatchEvent(new Event("close",{bubbles:!0}))}handleKeydown(t){var o;const{code:e}=t;if("Tab"!==e){if("Space"===e){const t=this.childItems[this.focusedItemIndex];if(null!=t&&t.hasSubmenu)return this.blur(),void t.openOverlay()}"Space"!==e&&"Enter"!==e?"ArrowDown"!==e&&"ArrowUp"!==e?this.navigateBetweenRelatedMenus(e):this.navigateWithinMenu(t):null==(o=this.childItems[this.focusedItemIndex])||o.click()}else this.prepareToCleanUp()}focusMenuItemByOffset(t){const o=t||1;this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+t)%this.childItems.length;let e=this.childItems[this.focusedItemIndex],r=this.childItems.length;for(;e.disabled&&r;)r-=1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+o)%this.childItems.length,e=this.childItems[this.focusedItemIndex];return null!=e&&e.disabled||this.forwardFocusVisibleToItem(e),e}prepareToCleanUp(){document.addEventListener("focusout",(()=>{requestAnimationFrame((()=>{const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1,this.updateSelectedItemIndex())}))}),{once:!0})}updateSelectedItemIndex(){let t=0;const o=new Map,e=[],r=[];let c=this.childItems.length;for(;c;){c-=1;const s=this.childItems[c];s.menuData.selectionRoot===this&&(s.selected&&(t=c,o.set(s,!0),e.unshift(s.value),r.unshift(s)),c!==t&&(s.focused=!1))}r.map(((t,o)=>{o>0&&(t.focused=!1)})),this.selectedItemsMap=o,this.selected=e,this.selectedItems=r,this.value=this.selected.join(this.valueSeparator),this.focusedItemIndex=t,this.focusInItemIndex=t}handleItemsChanged(){if(this.cachedChildItems=void 0,!this._willUpdateItems){let t=()=>{};this.cacheUpdated=new Promise((o=>t=o)),this._willUpdateItems=!0,window.requestAnimationFrame((()=>{void 0===this.cachedChildItems&&(this.updateSelectedItemIndex(),this.updateItemFocus()),this._willUpdateItems=!1,t()}))}}updateItemFocus(){if(0==this.childItems.length)return;const t=this.childItems[this.focusInItemIndex];this.getRootNode().activeElement===t.menuData.focusRoot&&this.forwardFocusVisibleToItem(t)}forwardFocusVisibleToItem(t){t.menuData.focusRoot===this&&(t.focused=this.hasVisibleFocusInTree(),this.setAttribute("aria-activedescendant",t.id),t.menuData.selectionRoot&&t.menuData.selectionRoot!==this&&t.menuData.selectionRoot.focus())}render(){return l`
            <slot></slot>
        `}firstUpdated(t){if(super.firstUpdated(t),!this.hasAttribute("tabindex")){const t=this.getAttribute("role");"group"===t?this.tabIndex=-1:"none"!==t&&(this.tabIndex=0)}const o=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];[...this.children].forEach((t=>{"sp-menu-item"===t.localName&&o.push(t.updateComplete)})),this.childItemsUpdated=Promise.all(o)}updated(t){super.updated(t),t.has("selects")&&this._notFirstUpdated&&this.selectsChanged(),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")),this._notFirstUpdated=!0}selectsChanged(){const t=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];this.childItemSet.forEach((o=>{t.push(o.triggerUpdate())})),this.childItemsUpdated=Promise.all(t)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role",this.ownRole),this.updateComplete.then((()=>this.updateItemFocus()))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.childItemsUpdated,await this.cacheUpdated,t}}O([d({type:String,reflect:!0})],j.prototype,"label",2),O([d({type:String,reflect:!0})],j.prototype,"selects",2),O([d({type:String})],j.prototype,"value",2),O([d({type:String,attribute:"value-separator"})],j.prototype,"valueSeparator",2),O([d({attribute:!1})],j.prototype,"selected",2),O([d({attribute:!1})],j.prototype,"selectedItems",2),O([s("slot:not([name])")],j.prototype,"menuSlot",2),customElements.define("sp-menu",j);var M=o`
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
`,F=Object.defineProperty,_=Object.getOwnPropertyDescriptor;class $ extends m{constructor(){super(...arguments),this.open=!1}static get styles(){return[M]}render(){return l``}}((t,o,e,r)=>{for(var c,s=r>1?void 0:r?_(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);r&&s&&F(o,e,s)})([d({type:Boolean,reflect:!0})],$.prototype,"open",2),customElements.define("sp-underlay",$);const H="(prefers-color-scheme: dark)",K="(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)";class W{constructor(t,o){this.key=Symbol("match-media-key"),this.matches=!1,this.host=t,this.host.addController(this),this.media=window.matchMedia(o),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),t.addController(this)}hostConnected(){var t;null==(t=this.media)||t.addEventListener("change",this.onChange)}hostDisconnected(){var t;null==(t=this.media)||t.removeEventListener("change",this.onChange)}onChange(t){this.matches!==t.matches&&(this.matches=t.matches,this.host.requestUpdate(this.key,!this.matches))}}var V=o`
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
`;var G=o`
@media (forced-colors:active){.spectrum-Tray{--highcontrast-tray-background-color:Background}}:host{bottom:0;display:flex;inline-size:100%;inset-inline-start:0;justify-content:center;position:fixed}@media screen and (orientation:landscape){.spectrum-Tray{border-top-left-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);border-top-right-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);max-inline-size:var(
--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size)
)}}:host{--spectrum-tray-exit-animation-delay:0ms;--spectrum-tray-entry-animation-delay:160ms;--spectrum-tray-max-inline-size:375px;--spectrum-tray-spacing-edge-to-tray-safe-zone:64px;--spectrum-tray-entry-animation-duration:var(
--spectrum-animation-duration-500
);--spectrum-tray-exit-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-tray-corner-radius:var(--spectrum-corner-radius-100);--spectrum-tray-background-color:var(--spectrum-background-layer-2-color)}@media (forced-colors:active){.tray{--highcontrast-tray-background-color:Background}}.spectrum-Tray-wrapper{bottom:0;display:flex;inline-size:100%;inset-inline-start:0;justify-content:center;position:fixed}.tray{background-color:var(
--highcontrast-tray-background-color,var(--mod-tray-background-color,var(--spectrum-tray-background-color))
);border-radius:unset;inline-size:100%;margin-block-start:var(
--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone)
);max-block-size:calc(100vh - var(
--mod-tray-spacing-edge-to-tray-safe-zone,
var(--spectrum-tray-spacing-edge-to-tray-safe-zone)
));outline:none;overflow:auto;transform:translateY(100%);transition:opacity var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) cubic-bezier(.5,0,1,1) var(
--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)
),visibility var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) linear calc(var(
--mod-tray-exit-animation-delay,
var(--spectrum-tray-exit-animation-delay)
) + var(
--mod-tray-exit-animation-duration,
var(--spectrum-tray-exit-animation-duration)
)),transform var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) cubic-bezier(.5,0,1,1) var(
--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)
)}:host([open]) .tray{transform:translateY(0);transition:transform var(
--mod-tray-entry-animation-duration,var(--spectrum-tray-entry-animation-duration)
) cubic-bezier(0,0,.4,1) var(
--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)
),opacity var(
--spectrum-tray-entry-animation-duration,var(--mod-tray-entry-animation-duration)
) cubic-bezier(0,0,.4,1) var(
--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)
)}@media screen and (orientation:landscape){.tray{border-top-left-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);border-top-right-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);max-inline-size:var(
--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size)
)}}:host{align-items:flex-end;max-height:100vh;max-height:100dvh;position:fixed!important}sp-underlay{touch-action:none}.tray{display:inline-flex;overscroll-behavior:contain;padding:var(--spectrum-tray-padding-y,0) var(--spectrum-tray-padding-x,0)}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,Y=Object.defineProperty,N=Object.getOwnPropertyDescriptor,Q=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?N(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&Y(o,e,s),s};class X extends m{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new W(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve(),this.animating=!1}static get styles(){return[V,G]}focus(){const t=i(this);t?t.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(t){t.has("open")&&void 0!==t.get("open")&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise((t=>{this.resolveTransitionPromise=()=>{this.animating=!1,t()}}))),super.update(t)}render(){return l`
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
        `}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}Q([d({type:Boolean,reflect:!0})],X.prototype,"open",2),Q([s(".tray")],X.prototype,"tray",2),customElements.define("sp-tray",X);var J=o`
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
`,Z=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,ot=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?tt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&Z(o,e,s),s};class et extends m{constructor(){super(...arguments),this.dialog=!1,this.open=!1,this.placement="none",this.tip=!1}static get styles(){return[J]}renderTip(){return l`
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
        `}connectedCallback(){super.connectedCallback(),this.addEventListener("sp-overlay-query",this.onOverlayQuery)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("sp-overlay-query",this.onOverlayQuery)}onOverlayQuery(t){if(!t.target||t.target!==this)return;const o=this.shadowRoot.querySelector("#tip");o&&(t.detail.overlayContentTipElement=o)}render(){return l`
            <slot></slot>
            ${this.tip?this.renderTip():p}
        `}}ot([d({type:Boolean,reflect:!0})],et.prototype,"dialog",2),ot([d({type:Boolean,reflect:!0})],et.prototype,"open",2),ot([d({reflect:!0})],et.prototype,"placement",2),ot([d({type:Boolean,reflect:!0})],et.prototype,"tip",2),customElements.define("sp-popover",et);var rt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,st=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?ct(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&rt(o,e,s),s};const nt={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class at extends(n(r)){constructor(){super(),this.isMobile=new W(this,K),this.disabled=!1,this.focused=!1,this.invalid=!1,this.open=!1,this.readonly=!1,this.selects="single",this.menuItems=[],this.placement="bottom-start",this.quiet=!1,this.value="",this.listRole="listbox",this.itemRole="option",this.onKeydown=t=>{this.focused=!0,("ArrowDown"===t.code||"ArrowUp"===t.code)&&(t.preventDefault(),this.toggle(!0))},this.overlayOpenCallback=async()=>{this.updateMenuItems(),await this.itemsUpdated,await this.optionsMenu.updateComplete,requestAnimationFrame((()=>this.menuStateResolver()))},this.overlayCloseCallback=async()=>{this.restoreChildren&&(this.restoreChildren(),this.restoreChildren=void 0),this.close(),requestAnimationFrame((()=>this.menuStateResolver()))},this._willUpdateItems=!1,this.itemsUpdated=Promise.resolve(),this.menuStatePromise=Promise.resolve(),this.selectionPromise=Promise.resolve(),this.onKeydown=this.onKeydown.bind(this)}get target(){return this.button}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0}onButtonBlur(){this.focused=!1,this.target.removeEventListener("keydown",this.onKeydown)}onButtonClick(){this.toggle()}focus(t){super.focus(t),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}onHelperFocus(){this.focused=!0,this.button.focus()}onButtonFocus(){this.target.addEventListener("keydown",this.onKeydown)}handleChange(t){const o=t.target,[e]=o.selectedItems;t.cancelable?(t.stopPropagation(),this.setValueFromItem(e,t)):this.open=!1}async setValueFromItem(t,o){const e=this.selectedItem,r=this.value;if(this.selectedItem=t,this.value=t.value,this.open=!1,await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0})))return o&&o.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),e&&this.setMenuItemSelected(e,!0),this.selectedItem=e,this.value=r,void(this.open=!0);e&&this.setMenuItemSelected(e,!1),this.setMenuItemSelected(t,!!this.selects)}setMenuItemSelected(t,o){null!=this.selects&&(t.selected=o)}toggle(t){this.readonly||(this.open=void 0!==t?t:!this.open)}close(){this.readonly||(this.open=!1)}async generatePopover(){this.popoverFragment||(this.popoverFragment=document.createDocumentFragment()),b(this.renderPopover,this.popoverFragment,{host:this}),this.popoverEl=this.popoverFragment.children[0],this.optionsMenu=this.popoverEl.children[1]}async openMenu(){let t=[];const o=this.querySelector(":scope > sp-menu");await this.generatePopover(),t=o?Array.from(o.children):Array.from(this.children).filter((t=>!t.hasAttribute("slot"))),0!==t.length?(this.restoreChildren=a(t,this.optionsMenu,{position:"beforeend",prepareCallback:t=>(this.value===t.value&&this.setMenuItemSelected(t,!0),t=>{void 0!==t.focused&&(t.focused=!1)})}),this.sizePopover(this.popoverEl),this.closeOverlay=it.openOverlay(this,"modal",this.popoverEl,{placement:this.isMobile.matches?"none":this.placement,receivesFocus:"auto"})):this.menuStateResolver()}sizePopover(t){this.isMobile.matches?t.style.setProperty("--swc-menu-width","100%"):this.quiet||t.style.setProperty("min-width",`${this.offsetWidth}px`)}async closeMenu(){if(this.closeOverlay){const t=this.closeOverlay;delete this.closeOverlay,(await t)()}}get selectedItemContent(){return this.selectedItem?this.selectedItem.itemChildren:{icon:[],content:[]}}renderLabelContent(t){return this.value&&this.selectedItem?t:l`
            <slot name="label">${this.label}</slot>
        `}get buttonContent(){const t={"visually-hidden":"only"===this.icons&&!!this.value,placeholder:!this.value};return[l`
                <span id="icon" ?hidden=${"none"===this.icons}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${u(t)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.invalid?l`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `:p}
                <sp-icon-chevron100
                    class="picker ${nt[this.size]}"
                ></sp-icon-chevron100>
            `]}render(){return l`
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
        `}update(t){this.selects&&(this.selects="single"),t.has("disabled")&&this.disabled&&(this.open=!1),t.has("open")&&(this.open||void 0!==t.get("open"))&&(this.menuStatePromise=new Promise((t=>this.menuStateResolver=t)),this.open?this.openMenu():this.closeMenu()),t.has("value")&&!t.has("selectedItem")&&this.updateMenuItems(),super.update(t)}get dismissHelper(){return l`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    arial-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `}get renderPopover(){const t=l`
            ${this.dismissHelper}
            <sp-menu
                id="menu"
                role="${this.listRole}"
                @change=${this.handleChange}
                .selects=${this.selects}
            ></sp-menu>
            ${this.dismissHelper}
        `;return this.isMobile.matches?l`
                <sp-tray
                    id="popover"
                    role="dialog"
                    @sp-menu-item-added-or-updated=${this.updateMenuItems}
                    .overlayOpenCallback=${this.overlayOpenCallback}
                    .overlayCloseCallback=${this.overlayCloseCallback}
                >
                    ${t}
                </sp-tray>
            `:l`
            <sp-popover
                id="popover"
                role="dialog"
                @sp-menu-item-added-or-updated=${this.updateMenuItems}
                .overlayOpenCallback=${this.overlayOpenCallback}
                .overlayCloseCallback=${this.overlayCloseCallback}
            >
                ${t}
            </sp-popover>
        `}updateMenuItems(t){if(this.open&&"sp-menu-item-removed"===(null==t?void 0:t.type)||this._willUpdateItems)return;this._willUpdateItems=!0,(null==t?void 0:t.item)===this.selectedItem&&this.requestUpdate();let o=()=>{};this.itemsUpdated=new Promise((t=>o=t)),window.requestAnimationFrame((async()=>{this.open?(await this.optionsMenu.updateComplete,this.menuItems=this.optionsMenu.childItems):this.menuItems=[...this.querySelectorAll('sp-menu-item:not([slot="submenu"] *)')],this.manageSelection(),o(),this._willUpdateItems=!1}))}async manageSelection(){if(null==this.selects)return;let t;await this.menuStatePromise,this.selectionPromise=new Promise((t=>this.selectionResolver=t)),this.menuItems.forEach((o=>{this.value!==o.value||o.disabled?o.selected=!1:t=o})),t?(t.selected=!!this.selects,this.selectedItem=t):(this.value="",this.selectedItem=void 0),this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver()}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.menuStatePromise,await this.itemsUpdated,await this.selectionPromise,t}connectedCallback(){this.updateMenuItems(),this.addEventListener("sp-menu-item-added-or-updated",this.updateMenuItems),this.addEventListener("sp-menu-item-removed",this.updateMenuItems),super.connectedCallback()}disconnectedCallback(){this.close(),super.disconnectedCallback()}}at.openOverlay=async(t,o,e,r)=>await w(t,o,e,r),st([s("#button")],at.prototype,"button",2),st([d({type:Boolean,reflect:!0})],at.prototype,"disabled",2),st([d({type:Boolean,reflect:!0})],at.prototype,"focused",2),st([d({type:String,reflect:!0})],at.prototype,"icons",2),st([d({type:Boolean,reflect:!0})],at.prototype,"invalid",2),st([d()],at.prototype,"label",2),st([d({type:Boolean,reflect:!0})],at.prototype,"open",2),st([d({type:Boolean,reflect:!0})],at.prototype,"readonly",2),st([d()],at.prototype,"placement",2),st([d({type:Boolean,reflect:!0})],at.prototype,"quiet",2),st([d({type:String})],at.prototype,"value",2),st([d({attribute:!1})],at.prototype,"selectedItem",2);class it extends at{constructor(){super(...arguments),this.onKeydown=t=>{const{code:o}=t;if(this.focused=!0,!o.startsWith("Arrow")||this.readonly)return;if(t.preventDefault(),"ArrowUp"===o||"ArrowDown"===o)return void this.toggle(!0);const e=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,r=this.value&&"ArrowRight"!==o?-1:1;let c=e+r;for(;this.menuItems[c]&&this.menuItems[c].disabled;)c+=r;!this.menuItems[c]||this.menuItems[c].disabled||(!this.value||c!==e)&&this.setValueFromItem(this.menuItems[c])}}static get styles(){return[k,y]}}customElements.define("sp-picker",it);var ut=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)
);justify-content:center;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,border-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}:host([disabled]){cursor:default}:host:after{bottom:0;display:block;left:0;margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-1);right:0;top:0;transition:opacity var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,margin var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out}:host(.focus-visible):after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-2)}:host(.focus-visible):after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-2)}:host(:focus-visible):after{margin:calc(var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*-2)}#label{align-self:center;justify-self:center;text-align:center}#label[hidden]{display:none}:host{--spectrum-button-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-button-border-radius:var(--spectrum-corner-radius-100);--spectrum-button-border-width:var(--spectrum-border-width-200);--spectrum-button-focus-ring-gap:var(--spectrum-focus-indicator-gap);--spectrum-button-focus-ring-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-button-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-button-focus-ring-border-radius:calc(var(--spectrum-button-border-radius) + var(--spectrum-button-focus-ring-gap))}:host([size=s]){--spectrum-button-min-width:calc(var(--spectrum-component-height-75)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(
--spectrum-component-pill-edge-to-text-75
);--spectrum-button-height:var(--spectrum-component-height-75);--spectrum-button-font-size:var(--spectrum-font-size-75);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-75) - var(--spectrum-button-border-width));--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-75) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-75);--spectrum-button-padding-label-top:var(
--spectrum-component-top-to-text-75
);--spectrum-button-padding-label-bottom:var(
--spectrum-component-bottom-to-text-75
)}:host([size=m]){--spectrum-button-min-width:calc(var(--spectrum-component-height-100)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(
--spectrum-component-pill-edge-to-text-100
);--spectrum-button-height:var(--spectrum-component-height-100);--spectrum-button-font-size:var(--spectrum-font-size-100);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-100) - var(--spectrum-button-border-width));--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-100) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-100);--spectrum-button-padding-label-top:var(
--spectrum-component-top-to-text-100
);--spectrum-button-padding-label-bottom:var(
--spectrum-component-bottom-to-text-100
)}:host([size=l]){--spectrum-button-min-width:calc(var(--spectrum-component-height-200)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(
--spectrum-component-pill-edge-to-text-200
);--spectrum-button-height:var(--spectrum-component-height-200);--spectrum-button-font-size:var(--spectrum-font-size-200);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-200) - var(--spectrum-button-border-width));--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-200) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-200);--spectrum-button-padding-label-top:var(
--spectrum-component-top-to-text-200
);--spectrum-button-padding-label-bottom:var(
--spectrum-component-bottom-to-text-200
)}:host([size=xl]){--spectrum-button-min-width:calc(var(--spectrum-component-height-300)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(
--spectrum-component-pill-edge-to-text-300
);--spectrum-button-height:var(--spectrum-component-height-300);--spectrum-button-font-size:var(--spectrum-font-size-300);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-300) - var(--spectrum-button-border-width));--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-300) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-300);--spectrum-button-padding-label-top:var(
--spectrum-component-top-to-text-300
);--spectrum-button-padding-label-bottom:var(
--spectrum-component-bottom-to-text-300
)}:host{block-size:auto;border-radius:var(
--mod-button-border-radius,var(--spectrum-button-border-radius)
);border-style:solid;border-width:var(
--mod-button-border-width,var(--spectrum-button-border-width)
);color:inherit;font-size:var(--mod-button-font-size,var(--spectrum-button-font-size));font-weight:var(--mod-bold-font-weight,var(--spectrum-bold-font-weight));height:var(--mod-button-height,var(--spectrum-button-height));min-block-size:var(
--mod-button-min-width,var(--spectrum-button-min-width)
);min-block-size:var(
--mod-spectrum-button-height,var(--spectrum-button-height)
);min-inline-size:var(
--mod-button-min-width,var(--spectrum-button-min-width)
);min-width:var(--mod-button-min-width,var(--spectrum-button-min-width));padding-block-end:0;padding-block-start:0;padding-inline-end:var(
--mod-button-edge-to-text,var(--spectrum-button-edge-to-text)
);padding-inline-start:var(
--mod-button-edge-to-visual,var(--spectrum-button-edge-to-visual)
);position:relative}:host(:hover),:host([active]){box-shadow:none}::slotted([slot=icon]){color:inherit;inset-block-end:calc(var(
--mod-spectrum-button-edge-to-visual,
var(--spectrum-button-edge-to-visual)
) - var(--mod-button-border-width, var(--spectrum-button-border-width)));inset-inline-end:calc(var(
--mod-spectrum-button-edge-to-visual,
var(--spectrum-button-edge-to-visual)
) - var(--mod-button-border-width, var(--spectrum-button-border-width)))}slot[name=icon]+#label{padding-inline-end:0;padding-inline-start:var(
--mod-button-padding-label-to-icon,var(--spectrum-button-padding-label-to-icon)
)}:host:after{border-radius:calc(var(--mod-button-border-radius, var(--spectrum-button-border-radius)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap)))}#label{padding-block-end:var(
--mod-button-padding-label-bottom,var(--spectrum-button-padding-label-bottom)
);padding-block-start:var(
--mod-button-padding-label-top,var(--spectrum-button-padding-label-top)
)}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)}:host{transition:border-color var(
--mod-button-animation-duration,var(--spectrum-button-animation-duration)
) ease-in-out}:host:after{border-radius:var(
--mod-button-focus-ring-border-radius,var(--spectrum-button-focus-ring-border-radius)
);content:"";inset:0;margin:calc((var(
--mod-button-focus-ring-gap,
var(--spectrum-button-focus-ring-gap)
) + var(
--mod-button-border-width,
var(--spectrum-button-border-width)
))*-1);pointer-events:none;position:absolute;transition:box-shadow var(
--mod-button-animation-duration,var(--spectrum-button-animation-duration)
) ease-in-out}:host(.focus-visible){box-shadow:none}:host(.focus-visible){box-shadow:none}:host(:focus-visible){box-shadow:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--highcontrast-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)
)
)}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--highcontrast-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)
)
)}:host(:focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) var(
--highcontrast-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(
--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color)
)
)
)}:host{background-color:var(
--highcontrast-button-background-color-default,var(
--mod-button-background-color-default,var(--spectrum-button-background-color-default)
)
);border-color:var(
--highcontrast-button-border-color-default,var(
--mod-button-border-color-default,var(--spectrum-button-border-color-default)
)
);color:var(
--highcontrast-button-content-color-default,var(
--mod-button-content-color-default,var(--spectrum-button-content-color-default)
)
)}:host(:hover){background-color:var(
--highcontrast-button-background-color-hover,var(
--mod-button-background-color-hover,var(--spectrum-button-background-color-hover)
)
);border-color:var(
--highcontrast-button-border-color-hover,var(
--mod-button-border-color-hover,var(--spectrum-button-border-color-hover)
)
);color:var(
--highcontrast-button-content-color-hover,var(
--mod-button-content-color-hover,var(--spectrum-button-content-color-hover)
)
)}:host(.focus-visible){background-color:var(
--highcontrast-button-background-color-focus,var(
--mod-button-background-color-focus,var(--spectrum-button-background-color-focus)
)
);border-color:var(
--highcontrast-button-border-color-focus,var(
--mod-button-border-color-focus,var(--spectrum-button-border-color-focus)
)
);color:var(
--highcontrast-button-content-color-focus,var(
--mod-button-content-color-focus,var(--spectrum-button-content-color-focus)
)
)}:host(.focus-visible){background-color:var(
--highcontrast-button-background-color-focus,var(
--mod-button-background-color-focus,var(--spectrum-button-background-color-focus)
)
);border-color:var(
--highcontrast-button-border-color-focus,var(
--mod-button-border-color-focus,var(--spectrum-button-border-color-focus)
)
);color:var(
--highcontrast-button-content-color-focus,var(
--mod-button-content-color-focus,var(--spectrum-button-content-color-focus)
)
)}:host(:focus-visible){background-color:var(
--highcontrast-button-background-color-focus,var(
--mod-button-background-color-focus,var(--spectrum-button-background-color-focus)
)
);border-color:var(
--highcontrast-button-border-color-focus,var(
--mod-button-border-color-focus,var(--spectrum-button-border-color-focus)
)
);color:var(
--highcontrast-button-content-color-focus,var(
--mod-button-content-color-focus,var(--spectrum-button-content-color-focus)
)
)}:host([active]){background-color:var(
--highcontrast-button-background-color-down,var(
--mod-button-background-color-down,var(--spectrum-button-background-color-down)
)
);border-color:var(
--highcontrast-button-border-color-down,var(
--mod-button-border-color-down,var(--spectrum-button-border-color-down)
)
);color:var(
--highcontrast-button-content-color-down,var(
--mod-button-content-color-down,var(--spectrum-button-content-color-down)
)
)}:host([disabled]){background-color:var(
--highcontrast-button-background-color-disabled,var(
--mod-button-background-color-disabled,var(--spectrum-button-background-color-disabled)
)
);border-color:var(
--highcontrast-button-border-color-disabled,var(
--mod-button-border-color-disabled,var(--spectrum-button-border-color-disabled)
)
);color:var(
--highcontrast-button-content-color-disabled,var(
--mod-button-content-color-disabled,var(--spectrum-button-content-color-disabled)
)
)}@media (forced-colors:active){:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) ButtonTExt;forced-color-adjust:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) ButtonTExt;forced-color-adjust:none}:host(:focus-visible):after{box-shadow:0 0 0 var(
--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness)
) ButtonTExt;forced-color-adjust:none}:host([variant=accent][treatment=fill]){background-color:ButtonText;color:ButtonFace}:host([variant=accent][treatment=fill][disabled]){background-color:ButtonFace;color:GrayText}:host([variant=accent][treatment=fill].focus-visible),:host([variant=accent][treatment=fill]:hover),:host([variant=accent][treatment=fill][active]),:host([variant=accent][treatment=fill][focused]){background-color:Highlight}:host([variant=accent][treatment=fill].focus-visible),:host([variant=accent][treatment=fill]:hover),:host([variant=accent][treatment=fill][active]),:host([variant=accent][treatment=fill][focused]){background-color:Highlight}:host([variant=accent][treatment=fill]:focus-visible),:host([variant=accent][treatment=fill]:hover),:host([variant=accent][treatment=fill][active]),:host([variant=accent][treatment=fill][focused]){background-color:Highlight}:host([variant=accent][treatment=fill]) #label{forced-color-adjust:none}}:host([static=white]){--spectrum-button-focus-indicator-color:var(
--mod-static-black-focus-indicator-color,var(--spectrum-static-black-focus-indicator-color)
)}:host([static=black]){--spectrum-button-focus-indicator-color:var(
--mod-static-black-focus-indicator-color,var(--spectrum-static-black-focus-indicator-color)
)}:host{--spectrum-button-background-color-default:var(
--system-spectrum-button-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-content-color-disabled
)}:host([variant=accent]){--spectrum-button-background-color-default:var(
--system-spectrum-button-accent-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-accent-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-accent-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-accent-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-accent-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-accent-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-accent-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-accent-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-accent-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-accent-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-accent-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-accent-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-accent-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-accent-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-accent-content-color-disabled
)}:host([variant=accent][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-accent-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-accent-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-accent-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-accent-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-accent-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-accent-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-accent-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-accent-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-accent-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-accent-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-accent-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-accent-outline-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-accent-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-accent-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-accent-outline-content-color-disabled
)}:host([variant=negative]){--spectrum-button-background-color-default:var(
--system-spectrum-button-negative-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-negative-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-negative-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-negative-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-negative-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-negative-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-negative-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-negative-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-negative-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-negative-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-negative-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-negative-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-negative-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-negative-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-negative-content-color-disabled
)}:host([variant=negative][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-negative-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-negative-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-negative-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-negative-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-negative-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-negative-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-negative-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-negative-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-negative-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-negative-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-negative-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-negative-outline-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-negative-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-negative-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-negative-outline-content-color-disabled
)}:host([variant=primary]){--spectrum-button-background-color-default:var(
--system-spectrum-button-primary-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-primary-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-primary-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-primary-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-primary-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-primary-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-primary-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-primary-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-primary-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-primary-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-primary-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-primary-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-primary-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-primary-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-primary-content-color-disabled
)}:host([variant=primary][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-primary-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-primary-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-primary-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-primary-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-primary-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-primary-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-primary-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-primary-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-primary-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-primary-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-primary-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-primary-outline-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-primary-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-primary-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-primary-outline-content-color-disabled
)}:host([variant=secondary]){--spectrum-button-background-color-default:var(
--system-spectrum-button-secondary-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-secondary-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-secondary-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-secondary-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-secondary-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-secondary-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-secondary-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-secondary-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-secondary-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-secondary-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-secondary-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-secondary-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-secondary-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-secondary-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-secondary-content-color-disabled
)}:host([variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-secondary-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-secondary-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-secondary-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-secondary-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-secondary-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-secondary-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-secondary-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-secondary-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-secondary-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-secondary-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-secondary-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-secondary-outline-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-secondary-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-secondary-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-secondary-outline-content-color-disabled
)}:host([quiet]){--spectrum-button-background-color-default:var(
--system-spectrum-button-quiet-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-quiet-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-quiet-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-quiet-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-quiet-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-quiet-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-quiet-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-quiet-border-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-quiet-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-quiet-border-color-disabled
)}:host(.is-selected){--spectrum-button-background-color-default:var(
--system-spectrum-button-selected-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-selected-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-selected-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-selected-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-selected-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-selected-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-selected-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-selected-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-selected-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-selected-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-selected-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-selected-content-color-focus
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-selected-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-selected-border-color-disabled
)}:host(.is-selected.spectrum-Button--emphasized){--spectrum-button-background-color-default:var(
--system-spectrum-button-selected-emphasized-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-selected-emphasized-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-selected-emphasized-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-selected-emphasized-background-color-focus
)}:host([static=black][quiet]){--spectrum-button-border-color-default:var(
--system-spectrum-button-staticblack-quiet-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticblack-quiet-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticblack-quiet-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticblack-quiet-border-color-focus
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticblack-quiet-border-color-disabled
)}:host([static=white][quiet]){--spectrum-button-border-color-default:var(
--system-spectrum-button-staticwhite-quiet-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticwhite-quiet-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticwhite-quiet-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticwhite-quiet-border-color-focus
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-quiet-border-color-disabled
)}:host([static=white]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticwhite-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticwhite-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticwhite-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticwhite-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticwhite-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticwhite-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticwhite-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticwhite-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticwhite-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticwhite-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticwhite-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticwhite-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticwhite-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticwhite-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticwhite-content-color-disabled
)}:host([static=white][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticwhite-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticwhite-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticwhite-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticwhite-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticwhite-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticwhite-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticwhite-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticwhite-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticwhite-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticwhite-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticwhite-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticwhite-outline-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticwhite-outline-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticwhite-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticwhite-outline-content-color-disabled
)}:host([static=white].is-selected){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticwhite-selected-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticwhite-selected-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticwhite-selected-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticwhite-selected-background-color-focus
);--spectrum-button-content-color-default:var(
--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-default)
);--spectrum-button-content-color-hover:var(
--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-hover)
);--spectrum-button-content-color-down:var(
--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-down)
);--spectrum-button-content-color-focus:var(
--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-focus)
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticwhite-selected-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-selected-border-color-disabled
)}:host([static=white][variant=secondary]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticwhite-secondary-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticwhite-secondary-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticwhite-secondary-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticwhite-secondary-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticwhite-secondary-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticwhite-secondary-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticwhite-secondary-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticwhite-secondary-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticwhite-secondary-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticwhite-secondary-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticwhite-secondary-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticwhite-secondary-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticwhite-secondary-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-content-color-disabled
)}:host([static=white][variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticwhite-secondary-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticwhite-secondary-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticwhite-secondary-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticwhite-secondary-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticwhite-secondary-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticwhite-secondary-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticwhite-secondary-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticwhite-secondary-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticwhite-secondary-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticwhite-secondary-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticwhite-secondary-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticwhite-secondary-outline-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticwhite-secondary-outline-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticwhite-secondary-outline-content-color-disabled
)}:host([static=black]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticblack-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticblack-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticblack-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticblack-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticblack-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticblack-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticblack-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticblack-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticblack-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticblack-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticblack-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticblack-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticblack-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticblack-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticblack-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticblack-content-color-disabled
)}:host([static=black][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticblack-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticblack-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticblack-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticblack-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticblack-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticblack-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticblack-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticblack-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticblack-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticblack-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticblack-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticblack-outline-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticblack-outline-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticblack-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticblack-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticblack-outline-content-color-disabled
)}:host([static=black][variant=secondary]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticblack-secondary-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticblack-secondary-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticblack-secondary-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticblack-secondary-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticblack-secondary-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticblack-secondary-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticblack-secondary-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticblack-secondary-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticblack-secondary-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticblack-secondary-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticblack-secondary-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticblack-secondary-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticblack-secondary-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticblack-secondary-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticblack-secondary-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticblack-secondary-content-color-disabled
)}:host([static=black][variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(
--system-spectrum-button-staticblack-secondary-outline-background-color-default
);--spectrum-button-background-color-hover:var(
--system-spectrum-button-staticblack-secondary-outline-background-color-hover
);--spectrum-button-background-color-down:var(
--system-spectrum-button-staticblack-secondary-outline-background-color-down
);--spectrum-button-background-color-focus:var(
--system-spectrum-button-staticblack-secondary-outline-background-color-focus
);--spectrum-button-border-color-default:var(
--system-spectrum-button-staticblack-secondary-outline-border-color-default
);--spectrum-button-border-color-hover:var(
--system-spectrum-button-staticblack-secondary-outline-border-color-hover
);--spectrum-button-border-color-down:var(
--system-spectrum-button-staticblack-secondary-outline-border-color-down
);--spectrum-button-border-color-focus:var(
--system-spectrum-button-staticblack-secondary-outline-border-color-focus
);--spectrum-button-content-color-default:var(
--system-spectrum-button-staticblack-secondary-outline-content-color-default
);--spectrum-button-content-color-hover:var(
--system-spectrum-button-staticblack-secondary-outline-content-color-hover
);--spectrum-button-content-color-down:var(
--system-spectrum-button-staticblack-secondary-outline-content-color-down
);--spectrum-button-content-color-focus:var(
--system-spectrum-button-staticblack-secondary-outline-content-color-focus
);--spectrum-button-focus-indicator-color:var(
--system-spectrum-button-staticblack-secondary-outline-focus-indicator-color
);--spectrum-button-background-color-disabled:var(
--system-spectrum-button-staticblack-secondary-outline-background-color-disabled
);--spectrum-button-border-color-disabled:var(
--system-spectrum-button-staticblack-secondary-outline-border-color-disabled
);--spectrum-button-content-color-disabled:var(
--system-spectrum-button-staticblack-secondary-outline-content-color-disabled
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
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}@media (forced-colors:active){:host([treatment][disabled]){border-color:graytext}:host([treatment]:not([disabled]):hover){border-color:highlight}}::slotted([slot=icon]){inset:unset}
`,lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,mt=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?dt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&lt(o,e,s),s};const pt=["accent","primary","secondary","negative","white","black"];class bt extends(n(v)){constructor(){super(...arguments),this._variant="accent",this.treatment="fill"}static get styles(){return[...super.styles,ut]}get variant(){return this._variant}set variant(t){if(t!==this.variant){switch(this.requestUpdate("variant",this.variant),t){case"cta":this._variant="accent";break;case"overBackground":return this.removeAttribute("variant"),this.static="white",void(this.treatment="outline");case"white":case"black":return this.static=t,void this.removeAttribute("variant");case null:return;default:pt.includes(t)?this._variant=t:this._variant="accent"}this.setAttribute("variant",this.variant)}}set quiet(t){this.treatment=t?"outline":"fill"}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("variant")||this.setAttribute("variant",this.variant)}}mt([d()],bt.prototype,"variant",1),mt([d({type:String,reflect:!0})],bt.prototype,"static",2),mt([d({reflect:!0})],bt.prototype,"treatment",2),mt([d({type:Boolean})],bt.prototype,"quiet",1),customElements.define("sp-button",bt);var ht=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(--mod-font-family-base,var(--spectrum-font-family-base));line-height:var(
--mod-line-height-small,var(--spectrum-line-height-small)
);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,border-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}:host(:disabled){cursor:default}:host{--spectrum-closebutton-size-300:24px;--spectrum-closebutton-size-400:32px;--spectrum-closebutton-size-500:40px;--spectrum-closebutton-size-600:48px;--spectrum-closebutton-icon-color-default:var(
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
) ease-out}:host(.focus-visible):after{border-radius:100%;bottom:0;box-shadow:0 0 0 var(
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
) ease-in-out}:host(.focus-visible){box-shadow:none}:host(.focus-visible){box-shadow:none}:host(:focus-visible){box-shadow:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness)
) var(
--highcontrast-closebutton-focus-indicator-color,var(
--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)
)
)}:host(.focus-visible):after{box-shadow:0 0 0 var(
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
)}:host(:not(:disabled).focus-visible),:host(:not(:disabled)[focused]){background-color:var(
--mod-closebutton-background-color-focus,var(--spectrum-closebutton-background-color-focus)
)}:host(:not(:disabled):focus-visible),:host(:not(:disabled)[focused]){background-color:var(
--mod-closebutton-background-color-focus,var(--spectrum-closebutton-background-color-focus)
)}:host(:not(:disabled).focus-visible) .icon,:host(:not(:disabled)[focused]) .icon{color:var(
--highcontrast-closebutton-icon-color-focus,var(
--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)
)
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
`,vt=Object.defineProperty,gt=Object.getOwnPropertyDescriptor;const ft={s:()=>l`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>l`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>l`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>l`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};class kt extends(n(v)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,ht,g]}get buttonContent(){return[ft[this.size]()]}}((t,o,e,r)=>{for(var c,s=r>1?void 0:r?gt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);r&&s&&vt(o,e,s)})([d({reflect:!0})],kt.prototype,"variant",2);var yt=o`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(--mod-font-family-base,var(--spectrum-font-family-base));justify-content:center;line-height:var(
--mod-line-height-small,var(--spectrum-line-height-small)
);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,border-color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,color var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-block-end:-2px;margin-block-start:-2px;padding:0}:host([disabled]){cursor:default}::slotted([slot=icon]){max-block-size:100%}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host{--spectrum-actionbutton-animation-duration:var(
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
)}:host([disabled]){background-color:var(
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
) ease-in-out}:host(.focus-visible){box-shadow:none}:host(.focus-visible){box-shadow:none}:host(:focus-visible){box-shadow:none}:host(.focus-visible):after{box-shadow:0 0 0 var(
--mod-actionbutton-focus-indicator-thickness,var(--spectrum-actionbutton-focus-indicator-thickness)
) var(
--highcontrast-actionbutton-focus-indicator-color,var(
--mod-actionbutton-focus-indicator-color,var(--spectrum-actionbutton-focus-indicator-color)
)
)}:host(.focus-visible):after{box-shadow:0 0 0 var(
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
`;var wt=o`
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
`,xt=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,It=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?zt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&xt(o,e,s),s};const Ct={xs:"spectrum-UIIcon-CornerTriangle75",s:"spectrum-UIIcon-CornerTriangle75",m:"spectrum-UIIcon-CornerTriangle100",l:"spectrum-UIIcon-CornerTriangle200",xl:"spectrum-UIIcon-CornerTriangle300"};let qt;class Tt extends(n(f,{validSizes:["xs","s","m","l","xl"]})){constructor(){super(),this.emphasized=!1,this.holdAffordance=!1,this.quiet=!1,this.role="button",this.selected=!1,this.toggles=!1,this._value="",this.onClick=()=>{this.toggles&&(this.selected=!this.selected,this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=!this.selected))},this.addEventListener("click",this.onClick),this.addEventListener("pointerdown",this.onPointerdown)}static get styles(){return[yt,wt]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}onPointerdown(t){0===t.button&&(this.addEventListener("pointerup",this.onPointerup),this.addEventListener("pointercancel",this.onPointerup),qt=setTimeout((()=>{this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"pointer"}}))}),300))}onPointerup(){clearTimeout(qt),this.removeEventListener("pointerup",this.onPointerup),this.removeEventListener("pointercancel",this.onPointerup)}handleKeydown(t){if(!this.holdAffordance)return super.handleKeydown(t);const{code:o,altKey:e}=t;("Space"===o||e&&"ArrowDown"===o)&&(t.preventDefault(),"ArrowDown"===o&&(t.stopPropagation(),t.stopImmediatePropagation()),this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeyup(t){if(!this.holdAffordance)return super.handleKeyup(t);const{code:o,altKey:e}=t;("Space"===o||e&&"ArrowDown"===o)&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"keyboard"}})),this.active=!1)}get buttonContent(){const t=super.buttonContent;return this.holdAffordance&&t.unshift(l`
                <sp-icon-corner-triangle300
                    class="hold-affordance ${Ct[this.size]}"
                ></sp-icon-corner-triangle300>
            `),t}updated(t){super.updated(t);const o="button"===this.role&&(this.selected||this.toggles);(t.has("selected")||t.has("role"))&&(o?this.setAttribute("aria-pressed",this.selected?"true":"false"):this.removeAttribute("aria-pressed"))}}It([d({type:Boolean,reflect:!0})],Tt.prototype,"emphasized",2),It([d({type:Boolean,reflect:!0,attribute:"hold-affordance"})],Tt.prototype,"holdAffordance",2),It([d({type:Boolean,reflect:!0})],Tt.prototype,"quiet",2),It([d({reflect:!0})],Tt.prototype,"role",2),It([d({type:Boolean,reflect:!0})],Tt.prototype,"selected",2),It([d({type:Boolean,reflect:!0})],Tt.prototype,"toggles",2),It([d({reflect:!0})],Tt.prototype,"variant",2),It([d({type:String})],Tt.prototype,"value",1),customElements.define("sp-action-button",Tt),customElements.define("sp-menu-item",P);var Ut=o`
:host{--spectrum-link-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-link-text-color-primary-default:var(
--spectrum-accent-content-color-default
);--spectrum-link-text-color-primary-hover:var(
--spectrum-accent-content-color-hover
);--spectrum-link-text-color-primary-active:var(
--spectrum-accent-content-color-down
);--spectrum-link-text-color-primary-focus:var(
--spectrum-accent-content-color-key-focus
);--spectrum-link-text-color-secondary-default:var(
--spectrum-neutral-content-color-default
);--spectrum-link-text-color-secondary-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-link-text-color-secondary-active:var(
--spectrum-neutral-content-color-down
);--spectrum-link-text-color-secondary-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-link-text-color-white:var(--spectrum-white);--spectrum-link-text-color-black:var(--spectrum-black)}@media (forced-colors:active){a{--highcontrast-link-text-color-primary-default:LinkText;--highcontrast-link-text-color-primary-hover:LinkText;--highcontrast-link-text-color-primary-active:LinkText;--highcontrast-link-text-color-primary-focus:LinkText;--highcontrast-link-text-color-secondary-default:LinkText;--highcontrast-link-text-color-secondary-hover:LinkText;--highcontrast-link-text-color-secondary-active:LinkText;--highcontrast-link-text-color-secondary-focus:LinkText;--highcontrast-link-text-color-white:LinkText;--highcontrast-link-text-color-black:LinkText}}a{-webkit-text-decoration-skip:objects;background-color:transparent;color:var(
--highcontrast-link-text-color-primary-default,var(
--mod-link-text-color-primary-default,var(--spectrum-link-text-color-primary-default)
)
);cursor:pointer;outline:none;text-decoration:underline;transition:color var(
--mod-link-animation-duration,var(--spectrum-link-animation-duration)
) ease-in-out}a:hover{color:var(
--highcontrast-link-text-color-primary-hover,var(
--mod-link-text-color-primary-hover,var(--spectrum-link-text-color-primary-hover)
)
)}a:active{color:var(
--highcontrast-link-text-color-primary-active,var(
--mod-link-text-color-primary-active,var(--spectrum-link-text-color-primary-active)
)
)}a.focus-visible{color:var(
--highcontrast-link-text-color-primary-focus,var(
--mod-link-text-color-primary-focus,var(--spectrum-link-text-color-primary-focus)
)
);text-decoration:underline;text-decoration-color:var(--highcontrast-link-focus-color,inherit);text-decoration-style:double}a:focus-visible{color:var(
--highcontrast-link-text-color-primary-focus,var(
--mod-link-text-color-primary-focus,var(--spectrum-link-text-color-primary-focus)
)
);text-decoration:underline;text-decoration-color:var(--highcontrast-link-focus-color,inherit);text-decoration-style:double}:host([variant=secondary]) a{color:var(
--highcontrast-link-text-color-secondary-default,var(
--mod-link-text-color-secondary-default,var(--spectrum-link-text-color-secondary-default)
)
)}:host([variant=secondary]) a:hover{color:var(
--highcontrast-link-text-color-secondary-hover,var(
--mod-link-text-color-secondary-hover,var(--spectrum-link-text-color-secondary-hover)
)
)}:host([variant=secondary]) a:active{color:var(
--highcontrast-link-text-color-secondary-active,var(
--mod-link-text-color-secondary-active,var(--spectrum-link-text-color-secondary-active)
)
)}:host([variant=secondary]) a:focus{color:var(
--highcontrast-link-text-color-secondary-focus,var(
--mod-link-text-color-secondary-focus,var(--spectrum-link-text-color-secondary-focus)
)
)}:host([quiet]) a{text-decoration:none}:host([quiet]) a:hover{text-decoration:underline}:host([static=white]) a{color:var(
--highcontrast-link-text-color-white,var(--mod-link-text-color-white,var(--spectrum-link-text-color-white))
)}:host([static=white]) a:active,:host([static=white]) a:focus,:host([static=white]) a:hover{color:var(
--highcontrast-link-text-color-white,var(--mod-link-text-color-white,var(--spectrum-link-text-color-white))
)}:host([static=black]) a{color:var(
--highcontrast-link-text-color-black,var(--mod-link-text-color-black,var(--spectrum-link-text-color-black))
)}:host([static=black]) a:active,:host([static=black]) a:focus,:host([static=black]) a:hover{color:var(
--highcontrast-link-text-color-black,var(--mod-link-text-color-black,var(--spectrum-link-text-color-black))
)}:host{display:inline}:host(:focus){outline:none}:host([href]) a.focus-visible{text-decoration:underline;text-decoration-style:double}:host([href]) a:focus-visible{text-decoration:underline;text-decoration-style:double}
`,St=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,At=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?Et(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&St(o,e,s),s};class Pt extends(e(r)){static get styles(){return[Ut]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}At([s("#anchor")],Pt.prototype,"anchorElement",2),At([d({type:String,reflect:!0})],Pt.prototype,"variant",2),At([d({type:String,reflect:!0})],Pt.prototype,"static",2),customElements.define("sp-link",Pt);var Bt=o`
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
`,Lt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor;class Ot extends(n(m,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.vertical=!1}render(){return l``}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}updated(t){super.updated(t),t.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}}Ot.styles=[Bt],((t,o,e,r)=>{for(var c,s=r>1?void 0:r?Rt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);r&&s&&Lt(o,e,s)})([d({type:Boolean,reflect:!0})],Ot.prototype,"vertical",2),customElements.define("sp-divider",Ot),customElements.define("sp-close-button",kt);var Dt=o`
:host{--spectrum-toast-font-weight:var(
--spectrum-font-weight-regular
);--spectrum-toast-font-size:var(--spectrum-font-size-100);--spectrum-toast-corner-radius:var(--spectrum-corner-radius-100);--spectrum-toast-block-size:var(--spectrum-toast-height);--spectrum-toast-border-width:var(--spectrum-border-width-100);--spectrum-toast-line-height:var(--spectrum-line-height-100);--spectrum-toast-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-toast-spacing-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-toast-spacing-start-edge-to-text-and-icon:var(
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
`,jt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,Ft=(t,o,e,r)=>{for(var c,s=r>1?void 0:r?Mt(o,e):o,n=t.length-1;n>=0;n--)(c=t[n])&&(s=(r?c(o,e,s):c(s))||s);return r&&s&&jt(o,e,s),s};const _t=["negative","positive","info","error","warning"];class $t extends m{constructor(){super(...arguments),this.open=!1,this._timeout=null,this._variant="",this.countdownStart=0,this.nextCount=-1,this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.shouldClose(),this.countdownStart=0):this.countdown()},this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown)},this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown)},this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown()}}static get styles(){return[Dt]}set timeout(t){const o=null!==typeof t&&t>0?Math.max(6e3,t):null,e=this.timeout;o&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=o,this.requestUpdate("timeout",e)}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const o=this.variant;_t.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",o)}get variant(){return this._variant}renderIcon(t){switch(t){case"info":return l`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;case"negative":case"error":case"warning":return l`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;case"positive":case"success":return l`
                    <sp-icon-checkmark-circle
                        label="Success"
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;default:return l``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown)}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close()}close(){this.open=!1}render(){return l`
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
        `}updated(t){super.updated(t),t.has("open")&&(this.open?this.timeout&&this.startCountdown():this.timeout&&this.stopCountdown()),t.has("timeout")&&(null!==this.timeout&&this.open?this.startCountdown():this.stopCountdown())}}Ft([d({type:Boolean,reflect:!0})],$t.prototype,"open",2),Ft([d({type:Number})],$t.prototype,"timeout",1),Ft([d({type:String})],$t.prototype,"variant",1),customElements.define("sp-toast",$t);export{y as C,H as D,K as I,j as M,at as P,V as h,w as o,Bt as r};
//# sourceMappingURL=f55ccf53.js.map
