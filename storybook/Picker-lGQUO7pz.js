import { i } from './lit-element-xBOPiTek.js';
import { b } from './spectrum-icon-chevron.css-8l4pupPT.js';
import { F as Focusable } from './focusable-zbBPTVfi.js';
import './sp-icon-chevron100-tD6SrTfS.js';
import './sp-icon-alert-8oes3o2-.js';
import './sp-menu-PyZ2tt_N.js';
import { M as MatchMediaController, I as IS_MOBILE } from './MatchMedia-SMh19R1m.js';
import { o as o$1 } from './class-map-Q7DIFm9x.js';
import { o as o$2 } from './style-map-ak5mT6xX.js';
import { S as SizedMixin } from './sizedMixin-qrvMoaCA.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { t } from './state-xjFlQaWq.js';
import { i as i$1 } from './query-JMOstM_r.js';
import { n as n$1 } from './define-element-IUrhCXKn.js';

const o=i`
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
)}#button:active:after{border-color:#0000}#button:active.placeholder .label{color:var(
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
)}#button:disabled .label.placeholder,:host([disabled]) #button .label.placeholder{color:var(
--highcontrast-picker-font-color-disabled,var(
--mod-picker-font-color-disabled,var(--spectrum-picker-font-color-disabled)
)
)}.icon{flex-shrink:0;margin-inline-end:var(
--mod-picker-spacing-text-to-icon,var(--spectrum-picker-spacing-text-to-icon)
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
)}:host([quiet]) #button{inline-size:auto;min-inline-size:0}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{border-color:#0000}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{border-color:#0000}.label{flex:auto;font-size:var(--mod-picker-font-size,var(--spectrum-picker-font-size));font-weight:var(
--mod-picker-font-weight,var(--spectrum-picker-font-weight)
);line-height:var(
--mod-picker-line-height,var(--spectrum-picker-line-height)
);margin-block-end:calc(var(
--mod-picker-spacing-bottom-to-text,
var(--spectrum-picker-spacing-bottom-to-text)
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)));margin-block-start:var(
--mod-picker-spacing-top-to-text,var(--spectrum-picker-spacing-top-to-text)
);overflow:hidden;text-align:start;text-overflow:ellipsis;white-space:nowrap}.label.placeholder{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-default,var(--spectrum-picker-font-color-default)
)
);font-style:var(
--mod-picker-placeholder-font-style,var(--spectrum-picker-placeholder-font-style)
);font-weight:var(
--mod-picker-placeholder-font-weight,var(--spectrum-picker-font-weight)
);transition:color var(
--mod-picker-animation-duration,var(--spectrum-picker-animation-duration)
) ease-in-out}.label.placeholder:hover{color:var(
--highcontrast-picker-font-color-default,var(
--mod-picker-font-color-hover,var(--spectrum-picker-font-color-hover)
)
)}.label.placeholder:active{color:var(
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
) - var(--mod-picker-border-width, var(--spectrum-picker-border-width)))}.label~.picker{margin-inline-start:var(
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
)}.visually-hidden{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}sp-overlay:not(:defined){display:none}
`;var g = o;

var m=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var n=(a,d,e,t)=>{for(var s=t>1?void 0:t?f(d,e):d,o=a.length-1,l;o>=0;o--)(l=a[o])&&(s=(t?l(d,e,s):l(s))||s);return t&&s&&m(d,e,s),s};const $={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};const DESCRIPTION_ID="option-picker";class PickerBase extends SizedMixin(Focusable,{noDefaultSize:!0}){constructor(){super(...arguments);this.isMobile=new MatchMediaController(this,IS_MOBILE);this.deprecatedMenu=null;this.disabled=!1;this.focused=!1;this.invalid=!1;this.open=!1;this.readonly=!1;this.selects="single";this.placement="bottom-start";this.quiet=!1;this.value="";this.listRole="listbox";this.itemRole="option";this.preventNextToggle="no";this.handleKeydown=e=>{this.focused=!0,!(e.code!=="ArrowDown"&&e.code!=="ArrowUp")&&(e.preventDefault(),this.toggle(!0));};this.applyFocusElementLabel=e=>{this.appliedLabel=e;};this.dependenciesLoaded=!1;this.dependenciesToLoad={};this.hasRenderedOverlay=!1;this.willManageSelection=!1;this.selectionPromise=Promise.resolve();this.recentlyConnected=!1;this.enterKeydownOn=null;this.handleEnterKeydown=e=>{if(e.code==="Enter"){if(this.enterKeydownOn){e.preventDefault();return}else this.addEventListener("keyup",t=>{t.code==="Enter"&&(this.enterKeydownOn=null);},{once:!0});this.enterKeydownOn=this.enterKeydownOn||e.target;}};}get menuItems(){return this.optionsMenu.childItems}get selectedItem(){return this._selectedItem}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t);}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0;}handleButtonBlur(){this.focused=!1;}handleButtonPointerdown(){this.preventNextToggle="maybe";const e=()=>{document.removeEventListener("pointerup",e),document.removeEventListener("pointercancel",e),requestAnimationFrame(()=>{this.preventNextToggle="no";});};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e);}handleButtonFocus(e){this.preventNextToggle==="maybe"&&e.relatedTarget===this.optionsMenu&&(this.preventNextToggle="yes");}handleButtonClick(){this.enterKeydownOn&&this.enterKeydownOn!==this.button||this.preventNextToggle!=="yes"&&this.toggle();}focus(e){super.focus(e),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree());}handleHelperFocus(){this.focused=!0,this.button.focus();}handleChange(e){const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):this.open=!1;}async setValueFromItem(e,t){this.open=!1;const s=this.selectedItem,o=this.value;if(this.selectedItem=e,this.value=e.value,await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects){t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),s&&this.setMenuItemSelected(s,!0),this.selectedItem=s,this.value=o,this.open=!0;return}else if(!this.selects){this.selectedItem=s,this.value=o;return}s&&this.setMenuItemSelected(s,!1),this.setMenuItemSelected(e,!!this.selects);}setMenuItemSelected(e,t){this.selects!=null&&(e.selected=t);}toggle(e){this.readonly||(this.open=typeof e!="undefined"?e:!this.open);}close(){this.readonly||(this.open=!1);}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t);}handleTooltipSlotchange(e){this.tooltipEl=e.target.assignedElements()[0];}renderLabelContent(e){return this.value&&this.selectedItem?e:x`
            <slot name="label" id="label">
                <span
                    aria-hidden=${l(this.appliedLabel?void 0:"true")}
                >
                    ${this.label}
                </span>
            </slot>
        `}get buttonContent(){const e={"visually-hidden":this.icons==="only"&&!!this.value,placeholder:!this.value,label:!0},t=this.appliedLabel||this.label;return [x`
                <span id="icon" ?hidden=${this.icons==="none"}>
                    ${this.selectedItemContent.icon}
                </span>
                <span
                    id=${l(this.value&&this.selectedItem?"label":void 0)}
                    class=${o$1(e)}
                >
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.value&&this.selectedItem?x`
                          <span
                              aria-hidden="true"
                              class="visually-hidden"
                              id="applied-label"
                          >
                              ${t}
                              <slot name="label"></slot>
                          </span>
                      `:x`
                          <span hidden id="applied-label">${t}</span>
                      `}
                ${this.invalid?x`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `:A}
                <sp-icon-chevron100
                    class="picker ${$[this.size]}"
                ></sp-icon-chevron100>
                <slot
                    aria-hidden="true"
                    name="tooltip"
                    id="tooltip"
                    @slotchange=${this.handleTooltipSlotchange}
                ></slot>
            `]}renderOverlay(e){const t=this.renderContainer(e);return this.trackDependency("sp-overlay"),import('./sp-overlay-5uR6TdGK.js').then(function (n) { return n.s; }),x`
            <sp-overlay
                .triggerElement=${this}
                .offset=${0}
                ?open=${this.open&&this.dependenciesLoaded}
                .placement=${this.isMobile.matches?void 0:this.placement}
                .type=${this.isMobile.matches?"modal":"auto"}
                .receivesFocus=${"true"}
                @beforetoggle=${s=>{s.composedPath()[0]===s.target&&(s.newState==="closed"&&(this.open=!1),this.open||(this.optionsMenu.updateSelectedItemIndex(),this.optionsMenu.closeDescendentOverlays()));}}
            >
                ${t}
            </sp-overlay>
        `}get renderDescriptionSlot(){return x`
            <div id=${DESCRIPTION_ID}>
                <slot name="description"></slot>
            </div>
        `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),x`
            <span
                id="focus-helper"
                tabindex="${this.focused||this.open?"-1":"0"}"
                @focus=${this.handleHelperFocus}
                aria-describedby=${DESCRIPTION_ID}
            ></span>
            <button
                aria-controls=${l(this.open?"menu":void 0)}
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
        `}update(e){var t,s;this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&(this.open=!1),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),(t=this.deprecatedMenu)==null||t.toggleAttribute("ignore",!0),(s=this.deprecatedMenu)==null||s.setAttribute("selects","inherit")),super.update(e);}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown);}firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener();}get dismissHelper(){return x`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `}trackDependency(e,t){const s=!!customElements.get(e)||this.dependenciesToLoad[e]||!!t;s||customElements.whenDefined(e).then(()=>{this.trackDependency(e,!0);}),this.dependenciesToLoad={...this.dependenciesToLoad,[e]:s},this.dependenciesLoaded=Object.values(this.dependenciesToLoad).every(o=>o);}renderContainer(e){const t=x`
            ${this.dismissHelper} ${e} ${this.dismissHelper}
        `;return this.isMobile.matches?(this.trackDependency("sp-tray"),import('./sp-tray-CUzLgmw9.js'),x`
                <sp-tray
                    id="popover"
                    role="presentation"
                    style=${o$2(this.containerStyles)}
                >
                    ${t}
                </sp-tray>
            `):(this.trackDependency("sp-popover"),import('./sp-popover-uPjTATb2.js'),x`
            <sp-popover
                id="popover"
                role="presentation"
                style=${o$2(this.containerStyles)}
                placement=${this.placement}
            >
                ${t}
            </sp-popover>
        `)}get renderMenu(){const e=x`
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
        `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?this.renderOverlay(e):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection();});}));}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection());}async manageSelection(){if(this.selects==null)return;this.selectionPromise=new Promise(t=>this.selectionResolver=t);let e;await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(t=>requestAnimationFrame(()=>t(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value===t.value&&!t.disabled?e=t:t.selected=!1;}),e?(e.selected=!!this.selects,this.selectedItem=e):(this.value="",this.selectedItem=void 0),this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1;}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,this.overlayElement&&await this.overlayElement.updateComplete,e}connectedCallback(){super.connectedCallback(),this.recentlyConnected=this.hasUpdated;}disconnectedCallback(){this.close(),super.disconnectedCallback();}}n([t()],PickerBase.prototype,"appliedLabel",2),n([i$1("#button")],PickerBase.prototype,"button",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"disabled",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"focused",2),n([n$1({type:String,reflect:!0})],PickerBase.prototype,"icons",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"invalid",2),n([n$1()],PickerBase.prototype,"label",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"open",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"readonly",2),n([i$1("sp-menu")],PickerBase.prototype,"optionsMenu",2),n([i$1("sp-overlay")],PickerBase.prototype,"overlayElement",2),n([n$1()],PickerBase.prototype,"placement",2),n([n$1({type:Boolean,reflect:!0})],PickerBase.prototype,"quiet",2),n([n$1({type:String})],PickerBase.prototype,"value",2),n([n$1({attribute:!1})],PickerBase.prototype,"selectedItem",1),n([n$1({attribute:!1})],PickerBase.prototype,"selectedItemContent",1),n([t()],PickerBase.prototype,"dependenciesLoaded",2);class Picker extends PickerBase{constructor(){super(...arguments);this.handleKeydown=e=>{const{code:t}=e;if(this.focused=!0,!t.startsWith("Arrow")||this.readonly)return;if(t==="ArrowUp"||t==="ArrowDown"){this.toggle(!0);return}e.preventDefault();const s=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,o=s<0||t==="ArrowRight"?1:-1;let l=s+o;for(;this.menuItems[l]&&this.menuItems[l].disabled;)l+=o;!this.menuItems[l]||this.menuItems[l].disabled||(!this.value||l!==s)&&this.setValueFromItem(this.menuItems[l]);};}static get styles(){return [g,b]}get containerStyles(){const e=super.containerStyles;return this.quiet||(e["min-width"]=`${this.offsetWidth}px`),e}}

export { DESCRIPTION_ID as D, Picker as P, PickerBase as a };
