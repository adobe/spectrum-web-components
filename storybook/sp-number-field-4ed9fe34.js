import { L as LanguageResolutionController, l as languageResolverUpdatedSymbol } from './LanguageResolution-630dfe34.js';
import { s as streamingListener } from './streaming-listener-70cd7ec3.js';
import { $ as $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5, a as $6c7bd7858deea686$export$cd11ab140839f11d } from './import-76526f12.js';
import './sp-icon-chevron200-3b73351b.js';
import './sp-icon-chevron100-232e7a83.js';
import './sp-action-button-a3324e56.js';
import { i as isIPhone, a as isAndroid } from './platform-a32a5617.js';
import { b as b$1 } from './spectrum-icon-chevron.css-6d5a7762.js';
import { i } from './lit-element-9354aa77.js';
import { a as TextfieldBase } from './Textfield-f4934212.js';
import { x, A } from './lit-html-126adc72.js';
import { i as i$1 } from './query-d0113d5a.js';
import { n as n$1, d as defineElement } from './define-element-e64f5ea4.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './Chevron200-62f4dc79.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './Chevron100-6f55b923.js';
import './sp-icon-corner-triangle300-e41520a7.js';
import './CornerTriangle300-488cc3d0.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './if-defined-ae83b405.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './state-5175507d.js';

const t=i`
:host{--spectrum-stepper-width-medium:72px;--spectrum-stepper-width-large:90px;--spectrum-stepper-icon-width-medium:10px;--spectrum-stepper-icon-width-large:12px;--spectrum-stepper-width:var(--spectrum-stepper-width-medium);--spectrum-stepper-icon-width:var(--spectrum-stepper-icon-width-medium);--spectrum-stepper-icon-nudge-start:1px;--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2 - var(--spectrum-stepper-icon-width)/2);--spectrum-stepper-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-stepper-buttons-height:var(--spectrum-component-height-100);--spectrum-stepper-border-radius:var(--spectrum-corner-radius-100);--spectrum-stepper-button-width:calc(var(--spectrum-spacing-400) - var(--spectrum-stepper-border-width)*2);--spectrum-stepper-button-gap:var(--spectrum-stepper-button-gap-reset);--spectrum-stepper-background-color:var(--spectrum-gray-50);--spectrum-stepper-background-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-stepper-quiet-width:var(--spectrum-component-height-300);--spectrum-stepper-quiet-button-width:var(--spectrum-stepper-button-width);--spectrum-stepper-border-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-stepper-border-color-quiet-disabled:var(
--spectrum-disabled-border-color
);--spectrum-stepper-border-color-invalid-default:var(
--spectrum-negative-border-color-default
);--spectrum-stepper-border-color-invalid-hover:var(
--spectrum-negative-border-color-hover
);--spectrum-stepper-border-color-invalid-focus:var(
--spectrum-negative-border-color-focus
);--spectrum-stepper-border-color-invalid-focus-hover:var(
--spectrum-negative-border-color-focus-hover
);--spectrum-stepper-border-color-invalid-keyboard-focus:var(
--spectrum-negative-border-color-key-focus
);--spectrum-stepper-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-stepper-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-stepper-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}#textfield .spectrum--medium{--spectrum-stepper-width:var(--spectrum-stepper-width-medium);--spectrum-stepper-icon-width:var(--spectrum-stepper-icon-width-medium);--spectrum-stepper-button-padding:calc(var(--spectrum-spacing-200)/2)}#textfield .spectrum--large{--spectrum-stepper-width:var(--spectrum-stepper-width-large);--spectrum-stepper-icon-width:var(--spectrum-stepper-icon-width-large);--spectrum-stepper-button-padding:calc(var(--spectrum-spacing-100)/2)}@media (forced-colors:active){:host{--highcontrast-stepper-border-color:CanvasText;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:CanvasText;--highcontrast-stepper-border-color-disabled:GrayText;--highcontrast-stepper-border-color-quiet-disabled:GrayText;--highcontrast-stepper-border-color-invalid-default:Highlight;--highcontrast-stepper-border-color-invalid-hover:Highlight;--highcontrast-stepper-border-color-invalid-focus:Highlight;--highcontrast-stepper-border-color-invalid-focus-hover:Highlight;--highcontrast-stepper-border-color-invalid-keyboard-focus:Highlight;--highcontrast-stepper-button-background-color-default:Canvas;--highcontrast-stepper-button-background-color-hover:Canvas;--highcontrast-stepper-button-background-color-focus:Canvas;--highcontrast-stepper-button-background-color-keyboard-focus:Canvas;--highcontrast-stepper-focus-indicator-color:Highlight}}.x{border-radius:var(--spectrum-stepper-button-border-radius-reset)}#textfield{border-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);display:inline-flex;flex-flow:row;inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));line-height:0;position:relative}:host(:hover:not([disabled]):not([invalid]):not([focused])) #textfield:not(.is-keyboardFocused) .buttons,:host(:hover:not([disabled]):not([invalid]):not([focused])) #textfield:not(.is-keyboardFocused) .input,:host(:hover:not([disabled]):not([invalid]):not([focused])) #textfield:not(.is-keyboardFocused) .step-down,:host(:hover:not([disabled]):not([invalid]):not([focused])) #textfield:not(.is-keyboardFocused) .step-up{border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}:host([focused]) #textfield .input{outline:none}:host([focused]) #textfield .buttons,:host([focused]) #textfield .input,:host([focused]) #textfield .step-down,:host([focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}:host([focused]) #textfield .step-down,:host([focused]) #textfield .step-up{background-color:var(
--highcontrast-stepper-button-background-color-focus,var(
--mod-stepper-button-background-color-focus,var(--spectrum-stepper-button-background-color-focus)
)
)}:host([focused]:hover) #textfield .buttons,:host([focused]:hover) #textfield .input,:host([focused]:hover) #textfield .step-down,:host([focused]:hover) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([focused][invalid]) #textfield .buttons,:host([focused][invalid]) #textfield .input,:host([focused][invalid]) #textfield .step-down,:host([focused][invalid]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-focus,var(
--mod-stepper-border-color-invalid-focus,var(--spectrum-stepper-border-color-invalid-focus)
)
)}#textfield.focus-visible,:host([keyboard-focused]) #textfield{outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield.focus-visible,:host([keyboard-focused]) #textfield{outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield:focus-visible,:host([keyboard-focused]) #textfield{outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield:focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield.focus-visible .buttons,#textfield.focus-visible .input,#textfield.focus-visible .step-down,#textfield.focus-visible .step-up,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}#textfield.focus-visible .buttons,#textfield.focus-visible .input,#textfield.focus-visible .step-down,#textfield.focus-visible .step-up,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}#textfield:focus-visible .buttons,#textfield:focus-visible .input,#textfield:focus-visible .step-down,#textfield:focus-visible .step-up,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}#textfield.focus-visible .step-down,#textfield.focus-visible .step-up,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{background-color:var(
--highcontrast-stepper-button-background-color-keyboard-focus,var(
--mod-stepper-button-background-color-keyboard-focus,var(--spectrum-stepper-button-background-color-keyboard-focus)
)
)}#textfield.focus-visible .step-down,#textfield.focus-visible .step-up,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{background-color:var(
--highcontrast-stepper-button-background-color-keyboard-focus,var(
--mod-stepper-button-background-color-keyboard-focus,var(--spectrum-stepper-button-background-color-keyboard-focus)
)
)}#textfield:focus-visible .step-down,#textfield:focus-visible .step-up,:host([keyboard-focused]) #textfield .step-down,:host([keyboard-focused]) #textfield .step-up{background-color:var(
--highcontrast-stepper-button-background-color-keyboard-focus,var(
--mod-stepper-button-background-color-keyboard-focus,var(--spectrum-stepper-button-background-color-keyboard-focus)
)
)}:host([invalid]) #textfield.focus-visible .buttons,:host([invalid]) #textfield.focus-visible .input,:host([invalid]) #textfield.focus-visible .step-down,:host([invalid]) #textfield.focus-visible .step-up,:host([keyboard-focused][invalid]) #textfield .buttons,:host([keyboard-focused][invalid]) #textfield .input,:host([keyboard-focused][invalid]) #textfield .step-down,:host([keyboard-focused][invalid]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-keyboard-focus,var(
--mod-stepper-border-color-invalid-keyboard-focus,var(--spectrum-stepper-border-color-invalid-keyboard-focus)
)
)}:host([invalid]) #textfield.focus-visible .buttons,:host([invalid]) #textfield.focus-visible .input,:host([invalid]) #textfield.focus-visible .step-down,:host([invalid]) #textfield.focus-visible .step-up,:host([keyboard-focused][invalid]) #textfield .buttons,:host([keyboard-focused][invalid]) #textfield .input,:host([keyboard-focused][invalid]) #textfield .step-down,:host([keyboard-focused][invalid]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-keyboard-focus,var(
--mod-stepper-border-color-invalid-keyboard-focus,var(--spectrum-stepper-border-color-invalid-keyboard-focus)
)
)}:host([invalid]) #textfield:focus-visible .buttons,:host([invalid]) #textfield:focus-visible .input,:host([invalid]) #textfield:focus-visible .step-down,:host([invalid]) #textfield:focus-visible .step-up,:host([keyboard-focused][invalid]) #textfield .buttons,:host([keyboard-focused][invalid]) #textfield .input,:host([keyboard-focused][invalid]) #textfield .step-down,:host([keyboard-focused][invalid]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-keyboard-focus,var(
--mod-stepper-border-color-invalid-keyboard-focus,var(--spectrum-stepper-border-color-invalid-keyboard-focus)
)
)}:host([invalid]) #textfield .buttons,:host([invalid]) #textfield .input,:host([invalid]) #textfield .step-down,:host([invalid]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-default,var(
--mod-stepper-border-color-invalid-default,var(--spectrum-stepper-border-color-invalid-default)
)
)}:host([invalid]:hover) #textfield .buttons,:host([invalid]:hover) #textfield .input,:host([invalid]:hover) #textfield .step-down,:host([invalid]:hover) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-hover,var(
--mod-stepper-border-color-invalid-hover,var(--spectrum-stepper-border-color-invalid-hover)
)
)}:host([invalid][focused]) #textfield .buttons,:host([invalid][focused]) #textfield .input,:host([invalid][focused]) #textfield .step-down,:host([invalid][focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-focus,var(
--mod-stepper-border-color-invalid-focus,var(--spectrum-stepper-border-color-invalid-focus)
)
)}:host([invalid][focused]:hover) #textfield .buttons,:host([invalid][focused]:hover) #textfield .input,:host([invalid][focused]:hover) #textfield .step-down,:host([invalid][focused]:hover) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-focus-hover,var(
--mod-stepper-border-color-invalid-focus-hover,var(--spectrum-stepper-border-color-invalid-focus-hover)
)
)}:host([invalid][keyboard-focused]) #textfield .buttons,:host([invalid][keyboard-focused]) #textfield .input,:host([invalid][keyboard-focused]) #textfield .step-down,:host([invalid][keyboard-focused]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-invalid-keyboard-focus,var(
--mod-stepper-border-color-invalid-keyboard-focus,var(--spectrum-stepper-border-color-invalid-keyboard-focus)
)
)}:host([disabled]) #textfield .buttons,:host([disabled]) #textfield .input,:host([disabled]) #textfield .step-down,:host([disabled]) #textfield .step-up{border-color:var(
--highcontrast-stepper-border-color-disabled,var(
--mod-stepper-border-color-disabled,var(--spectrum-stepper-border-color-disabled)
)
)}:host([disabled]) #textfield .step-down,:host([disabled]) #textfield .step-up{background-color:#0000}:host([disabled]) #textfield .buttons{background-color:var(--spectrum-stepper-background-color-disabled)}:host([quiet]) #textfield{border-radius:0;inline-size:var(
--mod-stepper-quiet-width,var(--spectrum-stepper-quiet-width)
)}:host([quiet]):after{block-size:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
);bottom:calc((var(
--mod-stepper-focus-indicator-gap,
var(--spectrum-stepper-focus-indicator-gap)
) + var(
--mod-stepper-focus-indicator-width,
var(--spectrum-stepper-focus-indicator-width)
))*-1);content:"";inline-size:100%;left:0;position:absolute}:host([quiet]) .buttons{border-radius:0;border-width:0 0 var(--mod-stepper-border-width,var(--spectrum-stepper-border-width)) 0}:host([quiet]) .step-down,:host([quiet]) .step-up{border-block-start-color:currentColor;border-block-start-style:none;border-inline-color:currentColor;border-inline-style:none;border-radius:0;border-width:0;inline-size:var(
--mod-stepper-quiet-button-width,var(--spectrum-stepper-quiet-button-width)
);justify-content:flex-end;min-inline-size:0;padding-inline-end:0}:host([quiet]) .step-down:after,:host([quiet]) .step-up:after{block-size:100%;content:"";inline-size:var(
--mod-stepper-button-offset,var(--spectrum-stepper-button-offset)
);inset-inline-end:calc(var(--mod-stepper-button-offset, var(--spectrum-stepper-button-offset))*-1);position:absolute}:host([quiet]) .buttons,:host([quiet]) .input,:host([quiet]) .step-down,:host([quiet]) .step-up,:host([quiet]:hover) .buttons,:host([quiet]:hover) .step-down,:host([quiet]:hover) .step-up{background-color:#0000}:host([quiet][disabled]) #textfield .buttons,:host([quiet][disabled]) #textfield .input,:host([quiet][disabled]) #textfield .step-down,:host([quiet][disabled]) #textfield .step-up{background-color:#0000;border-color:var(
--highcontrast-stepper-border-color-quiet-disabled,var(
--mod-stepper-border-color-quiet-disabled,var(--spectrum-stepper-border-color-quiet-disabled)
)
)}:host([quiet][invalid]) .buttons,:host([quiet][invalid]) .input,:host([quiet][invalid]) .step-down{border-color:var(
--highcontrast-stepper-border-color-invalid-default,var(
--mod-stepper-border-color-invalid-default,var(--spectrum-stepper-border-color-invalid-default)
)
)}:host([quiet][invalid]) .step-down,:host([quiet][invalid]) .step-up{background-color:#0000}:host([quiet][focused]) .buttons,:host([quiet][focused]) .input,:host([quiet][focused]) .step-down{border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}:host([quiet][focused]) .step-down,:host([quiet][focused]) .step-up{background-color:#0000}:host([quiet][focused]:hover) .buttons,:host([quiet][focused]:hover) .input,:host([quiet][focused]:hover) .step-down,:host([quiet][focused]:hover) .step-up{border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([quiet][focused][invalid]) .buttons,:host([quiet][focused][invalid]) .input,:host([quiet][focused][invalid]) .step-down{border-color:var(
--highcontrast-stepper-border-color-invalid-focus,var(
--mod-stepper-border-color-invalid-focus,var(--spectrum-stepper-border-color-invalid-focus)
)
)}:host([quiet][keyboard-focused]) #textfield{outline:none}:host([quiet][keyboard-focused]):after{background-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
)}:host([quiet][keyboard-focused]) .step-down,:host([quiet][keyboard-focused]) .step-up{background-color:#0000}:host([quiet][keyboard-focused]) .buttons,:host([quiet][keyboard-focused]) .step-down{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}:host([quiet][keyboard-focused][invalid]) .buttons,:host([quiet][keyboard-focused][invalid]) .input,:host([quiet][keyboard-focused][invalid]) .step-down{border-color:var(
--highcontrast-stepper-border-color-invalid-keyboard-focus,var(
--mod-stepper-border-color-invalid-keyboard-focus,var(--spectrum-stepper-border-color-invalid-keyboard-focus)
)
)}#textfield:before{content:""}.buttons{background-color:var(
--highcontrast-stepper-background-color,var(
--mod-stepper-background-color,var(--spectrum-stepper-background-color)
)
);block-size:var(
--mod-stepper-buttons-height,var(--spectrum-stepper-buttons-height)
);border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-end-start-radius:0;border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-start-start-radius:0;border-style:solid;border-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
) var(--mod-stepper-border-width,var(--spectrum-stepper-border-width)) var(--mod-stepper-border-width,var(--spectrum-stepper-border-width)) var(--spectrum-stepper-button-border-width-reset);flex-direction:column;inline-size:calc(var(--mod-stepper-button-width, var(--spectrum-stepper-button-width)) + var(--mod-stepper-button-gap, var(--spectrum-stepper-button-gap))*2);justify-content:center;overflow:hidden;padding-inline-end:var(--spectrum-stepper-button-gap);row-gap:var(--mod-stepper-button-gap,var(--spectrum-stepper-button-gap));transition:border-color var(
--mod-stepper-animation-duration,var(--spectrum-stepper-animation-duration)
) ease-in-out}.buttons,.step-down,.step-up{box-sizing:border-box;display:flex}.step-down,.step-up{background-color:var(
--highcontrast-stepper-button-background-color-default,var(
--mod-stepper-button-background-color-default,var(--spectrum-stepper-button-background-color-default)
)
);block-size:calc(var(
--mod-stepper-buttons-height,
var(--spectrum-stepper-buttons-height)
)/2 - var(--mod-stepper-button-gap, var(--spectrum-stepper-button-gap))*2.5);border-width:0;inline-size:var(
--mod-stepper-button-width,var(--spectrum-stepper-button-width)
);margin:0;min-inline-size:0;padding-inline-end:var(
--mod-stepper-button-padding,var(--spectrum-stepper-button-padding)
);padding-inline-start:var(
--mod-stepper-button-padding,var(--spectrum-stepper-button-padding)
);position:relative}.step-down .stepper-icon,.step-up .stepper-icon{margin:0;margin-inline-start:var(--spectrum-stepper-button-icon-nudge);opacity:1}:host(:hover) .step-down,:host(:hover) .step-up{background-color:var(
--highcontrast-stepper-button-background-color-hover,var(
--mod-stepper-button-background-color-hover,var(--spectrum-stepper-button-background-color-hover)
)
)}.step-down:disabled,.step-up:disabled{border-color:#0000}.step-up{border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:var(--spectrum-stepper-button-border-radius-reset);border-start-start-radius:var(
--spectrum-stepper-button-border-radius-reset
);padding-block-end:0;padding-block-start:var(
--mod-stepper-icon-nudge-start,var(--spectrum-stepper-icon-nudge-start)
)}.step-down{border-block-start-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-block-start-width:0;border-block-start-width:var(--spectrum-stepper-button-border-width-reset);border-end-end-radius:var(--spectrum-stepper-button-border-radius-reset);border-end-start-radius:var(--spectrum-stepper-button-border-radius-reset);border-start-end-radius:0;border-start-start-radius:0;padding-block-start:0}.textfield{flex:1;inline-size:auto;min-inline-size:0}.input{border-end-end-radius:0;border-inline-end-width:0;border-start-end-radius:0;min-inline-size:0}#textfield.hide-stepper .input{border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-inline-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
)}:host{--spectrum-stepper-border-width:var(
--system-spectrum-stepper-border-width
);--spectrum-stepper-button-border-width-reset:var(
--system-spectrum-stepper-button-border-width-reset
);--spectrum-stepper-button-icon-nudge:var(
--system-spectrum-stepper-button-icon-nudge
);--spectrum-stepper-button-gap-reset:var(
--system-spectrum-stepper-button-gap-reset
);--spectrum-stepper-button-border-radius-reset:var(
--system-spectrum-stepper-button-border-radius-reset
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
);--spectrum-stepper-button-background-color-default:var(
--system-spectrum-stepper-button-background-color-default
);--spectrum-stepper-button-background-color-hover:var(
--system-spectrum-stepper-button-background-color-hover
);--spectrum-stepper-button-background-color-focus:var(
--system-spectrum-stepper-button-background-color-focus
);--spectrum-stepper-button-background-color-keyboard-focus:var(
--system-spectrum-stepper-button-background-color-keyboard-focus
)}:host{inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width))}:host([size=s]){--spectrum-stepper-width:calc(var(--spectrum-stepper-width-medium)/5*4)}:host([size=l]){--spectrum-stepper-width:calc(var(--spectrum-stepper-width-medium)*1.25)}:host([size=xl]){--spectrum-stepper-width:calc(var(--spectrum-stepper-width-medium)*1.25*1.25)}#textfield{inline-size:100%}sp-field-button{--spectrum-dropdown-height:100%;--spectrum-dropdown-padding-x:0}.input{font-feature-settings:"tnum";font-variant-numeric:tabular-nums}.buttons{--mod-actionbutton-background-color-disabled:var(
--spectrum-global-color-gray-200
);block-size:var(--mod-textfield-height,var(--spectrum-textfield-height));flex-shrink:0;inline-size:calc(var(--mod-textfield-height, var(--spectrum-textfield-height))*3/4);padding-block:var(--spectrum-stepper-button-gap)}.step-down,.step-up{height:50%;overflow:hidden;padding:0;width:100%}.step-down .stepper-icon,.step-up .stepper-icon{margin-inline-start:0;translate:5%}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([hide-stepper]:not([quiet])) .input{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][invalid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][invalid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][valid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][valid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet][invalid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][invalid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr][quiet][valid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][valid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr]:not([hide-stepper])) .icon-workflow{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl]:not([hide-stepper])) .icon-workflow{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet]:not([hide-stepper])) .icon-workflow{left:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet]:not([hide-stepper])) .icon-workflow{right:var(--spectrum-stepper-button-width)}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:transparent}:host([hide-stepper]:not([quiet])) #textfield input{border:var(--spectrum-textfield-border-width) solid var(--spectrum-textfield-border-color);border-radius:var(--spectrum-textfield-corner-radius)}
`;var I = t;

var g=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var n=(a,l,e,t)=>{for(var s=t>1?void 0:t?y(l,e):l,i=a.length-1,r;i>=0;i--)(r=a[i])&&(s=(t?r(l,e,s):r(s))||s);return t&&s&&g(l,e,s),s};const FRAMES_PER_CHANGE=5,CHANGE_DEBOUNCE_MS=100,indeterminatePlaceholder="-",remapMultiByteCharacters={"\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\uFF10":"0","\u3001":",","\uFF0C":",","\u3002":".","\uFF0E":".","\uFF05":"%","\uFF0B":"+",\u30FC:"-"};const b={s:a=>x`
        <sp-icon-chevron75
            slot="icon"
            class="stepper-icon spectrum-UIIcon-Chevron${a}75"
        ></sp-icon-chevron75>
    `,m:a=>x`
        <sp-icon-chevron75
            slot="icon"
            class="stepper-icon spectrum-UIIcon-Chevron${a}75"
        ></sp-icon-chevron75>
    `,l:a=>x`
        <sp-icon-chevron100
            slot="icon"
            class="stepper-icon spectrum-UIIcon-Chevron${a}100"
        ></sp-icon-chevron100>
    `,xl:a=>x`
        <sp-icon-chevron200
            slot="icon"
            class="stepper-icon spectrum-UIIcon-Chevron${a}200"
        ></sp-icon-chevron200>
    `};class NumberField extends TextfieldBase{constructor(){super(...arguments);this.focused=!1;this._forcedUnit="";this.formatOptions={};this.hideStepper=!1;this.indeterminate=!1;this.keyboardFocused=!1;this.managedInput=!1;this.stepModifier=10;this._value=NaN;this._trackingValue="";this.changeCount=0;this.languageResolver=new LanguageResolutionController(this);this.wasIndeterminate=!1;this.applyFocusElementLabel=e=>{this.appliedLabel=e;};this.isComposing=!1;}static get styles(){return [...super.styles,I,b$1]}set value(e){const t=this.validateInput(e);if(t===this.value)return;this.lastCommitedValue=t;const s=this._value;this._value=t,this.requestUpdate("value",s);}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}setValue(e=this.value){this.value=e,!(typeof this.lastCommitedValue=="undefined"||this.lastCommitedValue===this.value)&&(this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.lastCommitedValue=this.value);}get valueAsString(){return this._value.toString()}set valueAsString(e){this.value=this.numberParser.parse(e);}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(e){var t;if(isIPhone()&&this.inputElement.inputMode==="decimal"){const s=this.numberFormatter.formatToParts(1000.1),i=e.split("").find(u=>u===","||u==="."),r=(t=s.find(u=>u.type==="decimal"))==null?void 0:t.value;i&&r&&(e=e.replace(i,r));}return this.numberParser.parse(e)}get _step(){var e;return typeof this.step!="undefined"?this.step:((e=this.formatOptions)==null?void 0:e.style)==="percent"?.01:1}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this.managedInput=!0,this.buttons.setPointerCapture(e.pointerId);const t=this.buttons.children[0].getBoundingClientRect(),s=this.buttons.children[1].getBoundingClientRect();this.findChange=i=>{i.clientX>=t.x&&i.clientY>=t.y&&i.clientX<=t.x+t.width&&i.clientY<=t.y+t.height?this.change=r=>this.increment(r.shiftKey?this.stepModifier:1):i.clientX>=s.x&&i.clientY>=s.y&&i.clientX<=s.x+s.width&&i.clientY<=s.y+s.height&&(this.change=r=>this.decrement(r.shiftKey?this.stepModifier:1));},this.findChange(e),this.startChange(e);}startChange(e){this.changeCount=0,this.doChange(e),this.safty=setTimeout(()=>{this.doNextChange(e);},400);}doChange(e){this.change(e);}handlePointermove(e){this.findChange(e);}handlePointerup(e){this.buttons.releasePointerCapture(e.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.managedInput=!1,this.setValue();}doNextChange(e){return this.changeCount+=1,this.changeCount%FRAMES_PER_CHANGE===0&&this.doChange(e),requestAnimationFrame(()=>{this.nextChange=this.doNextChange(e);})}stepBy(e){if(this.disabled||this.readonly)return;const t=typeof this.min!="undefined"?this.min:0;let s=this.value;s+=e*this._step,isNaN(this.value)&&(s=t),this._value=this.validateInput(s),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus();}increment(e=1){this.stepBy(1*e);}decrement(e=1){this.stepBy(-1*e);}handleKeydown(e){if(!this.isComposing)switch(e.code){case"ArrowUp":e.preventDefault(),this.increment(e.shiftKey?this.stepModifier:1),this.setValue();break;case"ArrowDown":e.preventDefault(),this.decrement(e.shiftKey?this.stepModifier:1),this.setValue();break}}onScroll(e){e.preventDefault(),this.managedInput=!0;const t=e.shiftKey?e.deltaX/Math.abs(e.deltaX):e.deltaY/Math.abs(e.deltaY);t!==0&&!isNaN(t)&&(this.stepBy(t*(e.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout(()=>{this.setValue();},CHANGE_DEBOUNCE_MS)),this.managedInput=!1;}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1});}onBlur(){super.onBlur(),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll);}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0;}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1;}handleChange(){const e=this.convertValueToNumber(this.inputValue);if(this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(e))){this.indeterminate=!0;return}this.setValue(e),this.inputElement.value=this.formattedValue;}handleCompositionStart(){this.isComposing=!0;}handleCompositionEnd(){this.isComposing=!1,requestAnimationFrame(()=>{this.inputElement.dispatchEvent(new Event("input",{composed:!0,bubbles:!0}));});}handleInput(e){var m;if(this.isComposing){e.stopPropagation();return}this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace(indeterminatePlaceholder,""));const{value:t,selectionStart:s}=this.inputElement,i=t.split("").map(d=>remapMultiByteCharacters[d]||d).join("");if(this.numberParser.isValidPartialNumber(i)){this.lastCommitedValue=(m=this.lastCommitedValue)!=null?m:this.value;const d=this.convertValueToNumber(i);!i&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(d)),this._trackingValue=i,this.inputElement.value=i,this.inputElement.setSelectionRange(s,s);return}else this.inputElement.value=this.indeterminate?indeterminatePlaceholder:this._trackingValue;const r=i.length,u=this._trackingValue.length,p=(s||r)-(r-u);this.inputElement.setSelectionRange(p,p);}validateInput(e){const t=e<0?-1:1;if(e*=t,typeof this.min!="undefined"&&(e=Math.max(this.min,e)),typeof this.max!="undefined"&&(e=Math.min(this.max,e)),this.step){const s=typeof this.min!="undefined"?this.min:0,i=(e-s)%this.step;if(i===0||(Math.round(i/this.step)===1?e+=this.step-i:e-=i),typeof this.max!="undefined")for(;e>this.max;)e-=this.step;}return e*=t,e}get displayValue(){const e=this.focused?"":indeterminatePlaceholder;return this.indeterminate?e:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0;}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:e,unit:t,unitDisplay:s,...i}=this.formatOptions;e!=="unit"&&(i.style=e),this._numberFormatterFocused=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,i);try{this._numberFormatter=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1);}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberFormatter=this._numberFormatterFocused;}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:e,unit:t,unitDisplay:s,...i}=this.formatOptions;e!=="unit"&&(i.style=e),this._numberParserFocused=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,i);try{this._numberParser=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0");}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberParser=this._numberParserFocused;}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",x`
            ${super.renderField()}
            ${this.hideStepper?A:x`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
                      >
                          <sp-action-button
                              class="step-up"
                              aria-describedby=${this.helpTextId}
                              label=${"Increase "+this.appliedLabel}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.max!="undefined"&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              ${b[this.size]("Up")}
                          </sp-action-button>
                          <sp-action-button
                              class="step-down"
                              aria-describedby=${this.helpTextId}
                              label=${"Decrease "+this.appliedLabel}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.min!="undefined"&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              ${b[this.size]("Down")}
                          </sp-action-button>
                      </span>
                  `}
        `}update(e){if((e.has("formatOptions")||e.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),e.has("value")||e.has("max")||e.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t;}super.update(e);}willUpdate(e){this.multiline=!1,e.has(languageResolverUpdatedSymbol)&&this.clearNumberFormatterCache();}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("compositionstart",this.handleCompositionStart),this.addEventListener("compositionend",this.handleCompositionEnd);}updated(e){if(e.has("min")||e.has("formatOptions")){let t="numeric";const s=typeof this.min!="undefined"&&this.min<0,{maximumFractionDigits:i}=this.numberFormatter.resolvedOptions(),r=i>0;isIPhone()?s?t="text":r&&(t="decimal"):isAndroid()&&(s?t="numeric":r&&(t="decimal")),this.inputElement.inputMode=t;}}}n([i$1(".buttons")],NumberField.prototype,"buttons",2),n([n$1({type:Boolean,reflect:!0})],NumberField.prototype,"focused",2),n([n$1({type:Object,attribute:"format-options"})],NumberField.prototype,"formatOptions",2),n([n$1({type:Boolean,reflect:!0,attribute:"hide-stepper"})],NumberField.prototype,"hideStepper",2),n([n$1({type:Boolean,reflect:!0})],NumberField.prototype,"indeterminate",2),n([n$1({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],NumberField.prototype,"keyboardFocused",2),n([n$1({type:Number})],NumberField.prototype,"max",2),n([n$1({type:Number})],NumberField.prototype,"min",2),n([n$1({type:Number})],NumberField.prototype,"step",2),n([n$1({type:Number,reflect:!0,attribute:"step-modifier"})],NumberField.prototype,"stepModifier",2),n([n$1({type:Number})],NumberField.prototype,"value",1);

defineElement("sp-number-field",NumberField);
