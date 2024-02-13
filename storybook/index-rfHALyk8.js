import './sp-overlay-4pHcDtVF.js';
import './sp-icon-chevron100-tb9aielX.js';
import './sp-popover-OhDGQO09.js';
import './sp-menu-FQVYzy9J.js';
import './sp-menu-item-WU5O76xQ.js';
import './sp-picker-button-ZgNNsWHM.js';
import { i } from './lit-element-xBOPiTek.js';
import { b } from './spectrum-icon-chevron.css-nkKXiUlE.js';
import { T as Textfield, l as l$1 } from './Textfield-xQbGP5yq.js';
import { c } from './repeat-ry-ySa1b.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { t as t$1 } from './state-FLXW5LJZ.js';
import { n as n$1 } from './define-element-UHExAFdK.js';
import { i as i$1 } from './query-JMOstM_r.js';

const t=i`
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
)}:host{display:inline-flex;flex-wrap:wrap}:host([label-position=inline-start]){flex-wrap:nowrap}:host([readonly]) sp-picker-button{pointer-events:none;visibility:hidden}sp-field-label{display:block;width:100%}:host([label-position=inline-start]) sp-field-label{width:auto}sp-popover{max-block-size:var(--sp-combobox-popover-max-block-size)}sp-popover:not(sp-overlay sp-popover){display:none}.icon{margin:0}::slotted([slot=option]){display:none}.button{bottom:0}[hidden]{display:none!important}.visually-hidden{border:0;clip:rect(0,0,0,0);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`;var $ = t;

var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var n=(p,o,e,t)=>{for(var i=t>1?void 0:t?v(o,e):o,s=p.length-1,r;s>=0;s--)(r=p[s])&&(i=(t?r(o,e,i):r(i))||i);return t&&i&&u(o,e,i),i};class Combobox extends Textfield{constructor(){super(...arguments);this.autocomplete="none";this.availableOptions=[];this.open=!1;this.overlayOpen=!1;this.itemValue="";this.optionEls=[];this.applyFocusElementLabel=e=>{this.appliedLabel=e;};this._returnItems=()=>{};}static get styles(){return [...super.styles,$,b]}focus(){this.focusElement.focus();}click(){this.focus(),this.focusElement.click();}scrollToActiveDescendant(){var t;const e=this.shadowRoot.querySelector(`#${(t=this.activeDescendant)==null?void 0:t.value}`);e&&e.scrollIntoView({block:"nearest"});}handleComboboxKeydown(e){if(!this.readonly)if(e.altKey&&e.code==="ArrowDown")this.open=!0;else if(e.code==="ArrowDown")e.preventDefault(),this.open=!0,this.activateNextDescendant(),this.scrollToActiveDescendant();else if(e.code==="ArrowUp")e.preventDefault(),this.open=!0,this.activatePreviousDescendant(),this.scrollToActiveDescendant();else if(e.code==="Escape")this.open||(this.value=""),this.open=!1;else if(e.code==="Enter")this.selectDescendant(),this.open=!1;else if(e.code==="Home")this.focusElement.setSelectionRange(0,0),this.activeDescendant=void 0;else if(e.code==="End"){const{length:t}=this.value;this.focusElement.setSelectionRange(t,t),this.activeDescendant=void 0;}else e.code==="ArrowLeft"?this.activeDescendant=void 0:e.code==="ArrowRight"&&(this.activeDescendant=void 0);}handleSlotchange(){this.setOptionsFromSlottedItems(),this.itemObserver.disconnect(),this.optionEls.map(e=>{this.itemObserver.observe(e,{attributes:!0,attributeFilter:["id"],childList:!0});});}handleTooltipSlotchange(e){this.tooltipEl=e.target.assignedElements()[0];}setOptionsFromSlottedItems(){const e=this.optionSlot.assignedElements({flatten:!0});this.optionEls=e;}activateNextDescendant(){const e=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):-1,t=(this.availableOptions.length+e+1)%this.availableOptions.length;this.activeDescendant=this.availableOptions[t];}activatePreviousDescendant(){const e=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):0,t=(this.availableOptions.length+e-1)%this.availableOptions.length;this.activeDescendant=this.availableOptions[t];}selectDescendant(){this.activeDescendant&&(this.value=this.activeDescendant.itemText);}filterAvailableOptions(){if(this.autocomplete==="none")return;const e=this.value.toLowerCase();this.availableOptions=(this.options||this.optionEls).filter(t=>t.itemText.toLowerCase().startsWith(e));}handleInput(e){super.handleInput(e),this.activeDescendant=void 0,this.open=!0;}handleMenuChange(e){const{target:t}=e,i=t.selected[0],s=(this.options||this.optionEls).find(r=>r.value===i);this.value=(s==null?void 0:s.itemText)||"",e.preventDefault(),this.open=!1,this._returnItems(),this.focus();}handleClosed(){this.open=!1,this.overlayOpen=!1;}handleOpened(){}toggleOpen(){if(this.readonly){this.open=!1;return}this.open=!this.open,this.inputElement.focus();}shouldUpdate(e){var t,i;return e.has("open")&&(this.open?this.overlayOpen=!0:this.activeDescendant=void 0),e.has("value")&&(this.filterAvailableOptions(),this.itemValue=(i=(t=this.availableOptions.find(s=>s.itemText===this.value))==null?void 0:t.value)!=null?i:""),super.shouldUpdate(e)}onBlur(e){e.relatedTarget&&(this.contains(e.relatedTarget)||this.shadowRoot.contains(e.relatedTarget))||super.onBlur(e);}renderAppliedLabel(){const e=this.label||this.appliedLabel;return x`
            ${this.value?x`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="applied-label"
                      >
                          ${e}
                      </span>
                      <slot name="label" id="label">
                          <span class="visually-hidden" aria-hidden="true">
                              ${this.value}
                          </span>
                      </slot>
                  `:x`
                      <span hidden id="applied-label">${e}</span>
                  `}
        `}renderField(){return x`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${l(this.activeDescendant?`${this.activeDescendant.value}`:void 0)}
                aria-autocomplete=${l(this.autocomplete)}
                aria-controls=${l(this.open?"listbox-menu":void 0)}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open?"true":"false"}"
                aria-label=${l(this.label||this.appliedLabel)}
                aria-labelledby="applied-label label"
                aria-invalid=${l(this.invalid||void 0)}
                autocomplete="off"
                @click=${this.toggleOpen}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${l$1(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                maxlength=${l(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${l(this.minlength>-1?this.minlength:void 0)}
                pattern=${l(this.pattern)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
            />
        `}render(){const e=(this.input||this).offsetWidth;return this.tooltipEl&&(this.tooltipEl.disabled=this.open),x`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${l(this.label||this.appliedLabel)}
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
                    ?hidden=${this.availableOptions.length===0}
                >
                    <sp-menu
                        @change=${this.handleMenuChange}
                        tabindex="-1"
                        aria-labelledby="label applied-label"
                        aria-label=${l(this.label||this.appliedLabel)}
                        id="listbox-menu"
                        role="listbox"
                        selects=${l(this.autocomplete==="none"?"single":void 0)}
                        .selected=${this.autocomplete==="none"&&this.itemValue?[this.itemValue]:[]}
                        style="min-width: ${e}px;"
                        size=${this.size}
                    >
                        ${this.overlayOpen?c(this.availableOptions,t=>t.value,t=>{var i,s;return x`
                                          <sp-menu-item
                                              id="${t.value}"
                                              ?focused=${((i=this.activeDescendant)==null?void 0:i.value)===t.value}
                                              aria-selected=${((s=this.activeDescendant)==null?void 0:s.value)===t.value?"true":"false"}
                                              .value=${t.value}
                                          >
                                              ${t.itemText}
                                          </sp-menu-item>
                                      `}):x``}
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
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("focusout",t=>{const i=t.relatedTarget&&this.contains(t.relatedTarget);t.target===this&&!i&&(this.focused=!1);});}async manageListOverlay(){this.open&&(this.focused=!0,this.focus());}updated(e){e.has("open")&&this.manageListOverlay(),!this.focused&&this.open&&(this.open=!1),e.has("activeDescendant")&&(e.get("activeDescendant")&&(e.get("activeDescendant").focused=!1),this.activeDescendant&&typeof this.activeDescendant.focused!="undefined"&&(this.activeDescendant.focused=!0)),(e.has("options")||e.has("optionEls"))&&(this.availableOptions=this.options||this.optionEls);}async getUpdateComplete(){const e=await super.getUpdateComplete(),t=this.shadowRoot.querySelector("#listbox");if(t){const i=[...t.children];await Promise.all(i.map(s=>s.updateComplete));}return e}connectedCallback(){super.connectedCallback(),this.itemObserver||(this.itemObserver=new MutationObserver(this.setOptionsFromSlottedItems.bind(this)));}disconnectedCallback(){this.itemObserver.disconnect(),this.open=!1,super.disconnectedCallback();}}n([t$1()],Combobox.prototype,"activeDescendant",2),n([n$1({type:String})],Combobox.prototype,"autocomplete",2),n([t$1()],Combobox.prototype,"availableOptions",2),n([n$1({type:Boolean,reflect:!0})],Combobox.prototype,"open",2),n([i$1("slot:not([name])")],Combobox.prototype,"optionSlot",2),n([t$1()],Combobox.prototype,"overlayOpen",2),n([i$1("#input")],Combobox.prototype,"input",2),n([n$1({type:Array})],Combobox.prototype,"options",2),n([t$1()],Combobox.prototype,"optionEls",2);

customElements.define("sp-combobox",Combobox);

const countries = [
  { value: "af", itemText: "Afghanistan" },
  { value: "ax", itemText: "Aland Islands" },
  { value: "al", itemText: "Albania" },
  { value: "dz", itemText: "Algeria" },
  { value: "as", itemText: "American Samoa" },
  { value: "ad", itemText: "Andorra" },
  { value: "ao", itemText: "Angola" },
  { value: "ai", itemText: "Anguilla" },
  { value: "aq", itemText: "Antarctica" },
  { value: "ag", itemText: "Antigua and Barbuda" },
  { value: "ar", itemText: "Argentina" },
  { value: "ar", itemText: "Armenia" },
  { value: "aw", itemText: "Aruba" },
  { value: "au", itemText: "Australia" },
  { value: "at", itemText: "Austria" },
  { value: "az", itemText: "Azerbaijan" },
  { value: "bs", itemText: "Bahamas" },
  { value: "bh", itemText: "Bahrain" },
  { value: "bd", itemText: "Bangladesh" },
  { value: "bb", itemText: "Barbados" },
  { value: "by", itemText: "Belarus" },
  { value: "be", itemText: "Belgium" },
  { value: "bz", itemText: "Belize" },
  { value: "bj", itemText: "Benin" },
  { value: "bm", itemText: "Bermuda" },
  { value: "bt", itemText: "Bhutan" },
  { value: "bo", itemText: "Bolivia" },
  { value: "ba", itemText: "Bosnia and Herzegovina" },
  { value: "bw", itemText: "Botswana" },
  { value: "bv", itemText: "Bouvet Island" },
  { value: "br", itemText: "Brazil" },
  { value: "io", itemText: "British Indian Ocean Territory" },
  { value: "bn", itemText: "Brunei Darussalam" },
  { value: "bg", itemText: "Bulgaria" },
  { value: "bf", itemText: "Burkina Faso" },
  { value: "bi", itemText: "Burundi" },
  { value: "kh", itemText: "Cambodia" },
  { value: "cm", itemText: "Cameroon" },
  { value: "ca", itemText: "Canada" },
  { value: "cv", itemText: "Cape Verde" },
  { value: "ky", itemText: "Cayman Islands" },
  { value: "cf", itemText: "Central African Republic" },
  { value: "td", itemText: "Chad" },
  { value: "cl", itemText: "Chile" },
  { value: "cn", itemText: "China" },
  { value: "cx", itemText: "Christmas Island" },
  { value: "cc", itemText: "Cocos (Keeling) Islands" },
  { value: "co", itemText: "Colombia" },
  { value: "km", itemText: "Comoros" },
  { value: "cg", itemText: "Congo" },
  { value: "cd", itemText: "Congo, The Democratic Republic of the" },
  { value: "ck", itemText: "Cook Islands" },
  { value: "cr", itemText: "Costa Rica" },
  { value: "ci", itemText: "Cote D'Ivoire" },
  { value: "hr", itemText: "Croatia" },
  { value: "cu", itemText: "Cuba" },
  { value: "cy", itemText: "Cyprus" },
  { value: "cz", itemText: "Czech Republic" },
  { value: "dk", itemText: "Denmark" },
  { value: "dj", itemText: "Djibouti" },
  { value: "dm", itemText: "Dominica" },
  { value: "do", itemText: "Dominican Republic" },
  { value: "ec", itemText: "Ecuador" },
  { value: "eg", itemText: "Egypt" },
  { value: "sv", itemText: "El Salvador" },
  { value: "gq", itemText: "Equatorial Guinea" },
  { value: "er", itemText: "Eritrea" },
  { value: "ee", itemText: "Estonia" },
  { value: "et", itemText: "Ethiopia" },
  { value: "fk", itemText: "Falkland Islands (Malvinas)" },
  { value: "fo", itemText: "Faroe Islands" },
  { value: "fj", itemText: "Fiji" },
  { value: "fi", itemText: "Finland" },
  { value: "fr", itemText: "France" },
  { value: "gf", itemText: "French Guiana" },
  { value: "pf", itemText: "French Polynesia" },
  { value: "tf", itemText: "French Southern Territories" },
  { value: "ga", itemText: "Gabon" },
  { value: "gm", itemText: "Gambia" },
  { value: "ge", itemText: "Georgia" },
  { value: "de", itemText: "Germany" },
  { value: "gh", itemText: "Ghana" },
  { value: "gi", itemText: "Gibraltar" },
  { value: "gr", itemText: "Greece" },
  { value: "gl", itemText: "Greenland" },
  { value: "gd", itemText: "Grenada" },
  { value: "gp", itemText: "Guadeloupe" },
  { value: "gu", itemText: "Guam" },
  { value: "gt", itemText: "Guatemala" },
  { value: "gg", itemText: "Guernsey" },
  { value: "gn", itemText: "Guinea" },
  { value: "gw", itemText: "Guinea-Bissau" },
  { value: "gy", itemText: "Guyana" },
  { value: "ht", itemText: "Haiti" },
  { value: "hm", itemText: "Heard Island and Mcdonald Islands" },
  { value: "va", itemText: "Holy See (Vatican City State)" },
  { value: "hn", itemText: "Honduras" },
  { value: "hk", itemText: "Hong Kong" },
  { value: "hu", itemText: "Hungary" },
  { value: "is", itemText: "Iceland" },
  { value: "in", itemText: "India" },
  { value: "id", itemText: "Indonesia" },
  { value: "ir", itemText: "Iran, Islamic Republic Of" },
  { value: "iq", itemText: "Iraq" },
  { value: "ie", itemText: "Ireland" },
  { value: "im", itemText: "Isle of Man" },
  { value: "il", itemText: "Israel" },
  { value: "it", itemText: "Italy" },
  { value: "jm", itemText: "Jamaica" },
  { value: "jp", itemText: "Japan" },
  { value: "je", itemText: "Jersey" },
  { value: "jo", itemText: "Jordan" },
  { value: "kz", itemText: "Kazakhstan" },
  { value: "ke", itemText: "Kenya" },
  { value: "ki", itemText: "Kiribati" },
  { value: "kp", itemText: "Korea, Democratic People's Republic of" },
  { value: "kr", itemText: "Korea, Republic of" },
  { value: "kw", itemText: "Kuwait" },
  { value: "kg", itemText: "Kyrgyzstan" },
  { value: "la", itemText: "Laos" },
  { value: "lv", itemText: "Latvia" },
  { value: "lb", itemText: "Lebanon" },
  { value: "ls", itemText: "Lesotho" },
  { value: "lr", itemText: "Liberia" },
  { value: "ly", itemText: "Libyan Arab Jamahiriya" },
  { value: "li", itemText: "Liechtenstein" },
  { value: "lt", itemText: "Lithuania" },
  { value: "lu", itemText: "Luxembourg" },
  { value: "mo", itemText: "Macao" },
  { value: "mk", itemText: "Macedonia, The Former Yugoslav Republic of" },
  { value: "mg", itemText: "Madagascar" },
  { value: "mw", itemText: "Malawi" },
  { value: "my", itemText: "Malaysia" },
  { value: "mv", itemText: "Maldives" },
  { value: "ml", itemText: "Mali" },
  { value: "mt", itemText: "Malta" },
  { value: "mh", itemText: "Marshall Islands" },
  { value: "mq", itemText: "Martinique" },
  { value: "mr", itemText: "Mauritania" },
  { value: "mu", itemText: "Mauritius" },
  { value: "yt", itemText: "Mayotte" },
  { value: "mx", itemText: "Mexico" },
  { value: "fm", itemText: "Micronesia, Federated States of" },
  { value: "md", itemText: "Moldova, Republic of" },
  { value: "mc", itemText: "Monaco" },
  { value: "mn", itemText: "Mongolia" },
  { value: "me", itemText: "Montenegro" },
  { value: "ms", itemText: "Montserrat" },
  { value: "ma", itemText: "Morocco" },
  { value: "mz", itemText: "Mozambique" },
  { value: "mm", itemText: "Myanmar" },
  { value: "na", itemText: "Namibia" },
  { value: "nr", itemText: "Nauru" },
  { value: "np", itemText: "Nepal" },
  { value: "nl", itemText: "Netherlands" },
  { value: "an", itemText: "Netherlands Antilles" },
  { value: "nc", itemText: "New Caledonia" },
  { value: "nz", itemText: "New Zealand" },
  { value: "ni", itemText: "Nicaragua" },
  { value: "ne", itemText: "Niger" },
  { value: "ng", itemText: "Nigeria" },
  { value: "nu", itemText: "Niue" },
  { value: "nf", itemText: "Norfolk Island" },
  { value: "mp", itemText: "Northern Mariana Islands" },
  { value: "no", itemText: "Norway" },
  { value: "om", itemText: "Oman" },
  { value: "pk", itemText: "Pakistan" },
  { value: "pw", itemText: "Palau" },
  { value: "ps", itemText: "Palestinian Territory, Occupied" },
  { value: "pa", itemText: "Panama" },
  { value: "pg", itemText: "Papua New Guinea" },
  { value: "py", itemText: "Paraguay" },
  { value: "pe", itemText: "Peru" },
  { value: "ph", itemText: "Philippines" },
  { value: "pn", itemText: "Pitcairn" },
  { value: "pl", itemText: "Poland" },
  { value: "pt", itemText: "Portugal" },
  { value: "pr", itemText: "Puerto Rico" },
  { value: "qa", itemText: "Qatar" },
  { value: "re", itemText: "Reunion" },
  { value: "ro", itemText: "Romania" },
  { value: "ru", itemText: "Russian Federation" },
  { value: "rw", itemText: "RWANDA" },
  { value: "sh", itemText: "Saint Helena" },
  { value: "kn", itemText: "Saint Kitts and Nevis" },
  { value: "lc", itemText: "Saint Lucia" },
  { value: "pm", itemText: "Saint Pierre and Miquelon" },
  { value: "vc", itemText: "Saint Vincent and the Grenadines" },
  { value: "ws", itemText: "Samoa" },
  { value: "sm", itemText: "San Marino" },
  { value: "st", itemText: "Sao Tome and Principe" },
  { value: "sa", itemText: "Saudi Arabia" },
  { value: "sn", itemText: "Senegal" },
  { value: "rs", itemText: "Serbia" },
  { value: "sc", itemText: "Seychelles" },
  { value: "sl", itemText: "Sierra Leone" },
  { value: "sg", itemText: "Singapore" },
  { value: "sk", itemText: "Slovakia" },
  { value: "si", itemText: "Slovenia" },
  { value: "sb", itemText: "Solomon Islands" },
  { value: "so", itemText: "Somalia" },
  { value: "za", itemText: "South Africa" },
  { value: "gs", itemText: "South Georgia and the South Sandwich Islands" },
  { value: "es", itemText: "Spain" },
  { value: "lk", itemText: "Sri Lanka" },
  { value: "sd", itemText: "Sudan" },
  { value: "sr", itemText: "Suriname" },
  { value: "sj", itemText: "Svalbard and Jan Mayen" },
  { value: "sz", itemText: "Swaziland" },
  { value: "se", itemText: "Sweden" },
  { value: "ch", itemText: "Switzerland" },
  { value: "sy", itemText: "Syrian Arab Republic" },
  { value: "tw", itemText: "Taiwan" },
  { value: "tj", itemText: "Tajikistan" },
  { value: "tz", itemText: "Tanzania, United Republic of" },
  { value: "th", itemText: "Thailand" },
  { value: "tl", itemText: "Timor-Leste" },
  { value: "tg", itemText: "Togo" },
  { value: "tk", itemText: "Tokelau" },
  { value: "to", itemText: "Tonga" },
  { value: "tt", itemText: "Trinidad and Tobago" },
  { value: "tn", itemText: "Tunisia" },
  { value: "tr", itemText: "Turkey" },
  { value: "tm", itemText: "Turkmenistan" },
  { value: "tc", itemText: "Turks and Caicos Islands" },
  { value: "tv", itemText: "Tuvalu" },
  { value: "ug", itemText: "Uganda" },
  { value: "ua", itemText: "Ukraine" },
  { value: "ae", itemText: "United Arab Emirates" },
  { value: "gb", itemText: "United Kingdom" },
  { value: "us", itemText: "United States" },
  { value: "um", itemText: "United States Minor Outlying Islands" },
  { value: "uy", itemText: "Uruguay" },
  { value: "uz", itemText: "Uzbekistan" },
  { value: "vu", itemText: "Vanuatu" },
  { value: "ve", itemText: "Venezuela" },
  { value: "vn", itemText: "Vietnam" },
  { value: "vg", itemText: "Virgin Islands, British" },
  { value: "vi", itemText: "Virgin Islands, U.S." },
  { value: "wf", itemText: "Wallis and Futuna" },
  { value: "eh", itemText: "Western Sahara" },
  { value: "ye", itemText: "Yemen" },
  { value: "zm", itemText: "Zambia" },
  { value: "zw", itemText: "Zimbabwe" }
];
const fruits = [
  { value: "apple", itemText: "Apple" },
  { value: "banana", itemText: "Banana" },
  { value: "cherry", itemText: "Cherry" },
  { value: "coconut", itemText: "Coconut" },
  { value: "durian", itemText: "Durian" },
  { value: "lemon", itemText: "Lemon" },
  { value: "lychee", itemText: "Lychee" },
  { value: "mango", itemText: "Mango" },
  { value: "orange", itemText: "Orange" },
  { value: "peach", itemText: "Peach" },
  { value: "pear", itemText: "Pear" },
  { value: "persimmon", itemText: "Persimmon" }
];

export { countries as c, fruits as f };