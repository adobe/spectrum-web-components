import { F as FocusVisiblePolyfillMixin } from './focus-visible-03398d98.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-ae37a9bc.js';
import { L as LikeAnchor } from './like-anchor-72ed571c.js';
import './sp-asset-32b47737.js';
import './sp-checkbox-1a2ad388.js';
import './sp-quick-actions-ddf3a9cd.js';
import './sp-divider-02e53dcd.js';
import { i as i$1 } from './lit-element-9354aa77.js';
import { h } from './heading-2d6e356c.js';
import { o as o$2, t } from './spectrum-lang.css-9eeeffe9.js';
import { S as SizedMixin } from './sizedMixin-43fe982f.js';
import { x, A } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-e64f5ea4.js';
import { i as i$2 } from './query-d0113d5a.js';

const o$1=i$1`
:host{--spectrum-card-background-color:var(--spectrum-background-layer-2-color);--spectrum-card-body-spacing:var(--spectrum-spacing-400);--spectrum-card-title-padding-top:var(--spectrum-spacing-300);--spectrum-card-title-padding-right:var(--spectrum-spacing-400);--spectrum-card-content-margin-top:var(--spectrum-spacing-100);--spectrum-card-content-margin-bottom:var(--spectrum-spacing-300);--spectrum-card-footer-margin-top:var(--spectrum-spacing-100);--spectrum-card-subtitle-padding-right:var(--spectrum-spacing-100);--spectrum-card-border-width:var(--spectrum-border-width-100);--spectrum-card-corner-radius:var(--spectrum-corner-radius-100);--spectrum-card-border-color:var(--spectrum-gray-200);--spectrum-card-border-color-hover:var(--spectrum-gray-300);--spectrum-card-border-color-selected:var(--spectrum-blue-700);--spectrum-card-divider-color:var(--spectrum-gray-300);--spectrum-card-title-font-family:var(--spectrum-sans-font-family-stack);--spectrum-card-title-font-size:var(--spectrum-heading-size-xxs);--spectrum-card-title-font-weight:var(
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
);--spectrum-card-selected-background-opacity:0.1;--spectrum-card-horizontal-body-padding:var(--spectrum-spacing-300);--spectrum-card-horizontal-preview-padding:var(--spectrum-spacing-200)}:host([variant=gallery]),:host([variant=quiet]){--mod-card-content-margin-top:var(
--spectrum-card-content-margin-top-quiet,var(--spectrum-spacing-100)
);--mod-card-minimum-width:var(
--spectrum-card-minimum-width-quiet,var(--spectrum-card-minimum-width)
);--spectrum-card-preview-border-width:var(--spectrum-border-width-100)}:host([horizontal]),:host([variant=gallery]),:host([variant=quiet]){--mod-card-background-color:var(
--spectrum-card-background-color-quiet,var(--spectrum-background-base-color)
);--spectrum-card-background-color-hover:var(
--spectrum-card-background-color-hover-quiet,var(--spectrum-gray-300)
)}:host{background-color:var(
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
)*-1);position:absolute}:host(:focus),:host([focused]){outline:none}:host(:focus):after,:host([focused]):after{border-color:var(
--mod-card-focus-indicator-color,var(--spectrum-card-focus-indicator-color)
);border-width:var(
--mod-card-focus-indicator-width,var(--spectrum-card-focus-indicator-width)
)}:host(:focus) #cover-photo,:host(:focus) #preview,:host([focused]) #cover-photo,:host([focused]) #preview{border-start-end-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
));border-start-start-radius:calc(var(--mod-card-corner-radius, var(--spectrum-card-corner-radius)) - var(
--mod-card-focus-indicator-width,
var(--spectrum-card-focus-indicator-width)
))}:host(:hover){border-color:var(
--highcontrast-card-border-color-hover,var(
--mod-card-border-color-hover,var(--spectrum-card-border-color-hover)
)
)}:host([selected]){border-color:var(
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
)}:host(:focus) .actions,:host(:focus) .quick-actions,:host(:hover) .actions,:host(:hover) .quick-actions,:host([focused]) .actions,:host([focused]) .quick-actions,:host([selected]) .actions,:host([selected]) .quick-actions{opacity:1;pointer-events:all;visibility:visible}.quick-actions{background-color:rgba(var(
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
)}.body{padding-block-end:calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));padding-block-start:var(
--mod-card-title-padding-top,var(--spectrum-card-title-padding-top)
);padding-inline-end:calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));padding-inline-start:calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)))}#preview{align-items:center;border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:var(
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
);margin-block-start:calc((var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(
--mod-card-content-margin-bottom,
var(--spectrum-card-content-margin-bottom)
))*-1);margin-inline-end:var(
--mod-card-body-spacing,var(--spectrum-card-body-spacing)
);margin-inline-start:var(
--mod-card-body-spacing,var(--spectrum-card-body-spacing)
);padding-block-end:calc(var(--mod-card-body-spacing, var(--spectrum-card-body-spacing)) - var(--mod-card-border-width, var(--spectrum-card-border-width)));padding-block-start:var(
--mod-card-footer-margin-top,var(--spectrum-card-footer-margin-top)
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
)*-1);position:absolute}:host([variant=gallery]:hover),:host([variant=quiet]:hover){border-color:#0000}:host([variant=gallery]:hover) #preview,:host([variant=quiet]:hover) #preview{background-color:var(
--mod-card-background-color-hover,var(--spectrum-card-background-color-hover)
)}:host([variant=gallery][drop-target]),:host([variant=quiet][drop-target]){background-color:#0000;border-color:#0000;box-shadow:none}:host([variant=gallery][drop-target]) #preview,:host([variant=quiet][drop-target]) #preview{background-color:var(
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
);padding:0}:host([variant=gallery]) ::slotted([slot=footer]),:host([variant=quiet]) ::slotted([slot=footer]){margin-inline:0}:host([horizontal]){flex-direction:row}:host([horizontal]:hover) #preview{border-color:var(
--mod-card-border-color-hover,var(--spectrum-card-border-color-hover)
)}:host([horizontal]) #preview{align-items:center;background-color:var(
--mod-card-background-color,var(--spectrum-card-background-color)
);border-end-end-radius:0;border-end-start-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);border-inline-end:var(
--mod-card-border-width,var(--spectrum-card-border-width)
) solid transparent;border-color:var(
--mod-card-border-color,var(--spectrum-card-border-color)
);border-start-end-radius:0;border-start-start-radius:var(
--mod-card-corner-radius,var(--spectrum-card-corner-radius)
);display:flex;flex-shrink:0;justify-content:center;min-block-size:0;padding:var(
--mod-card-horizontal-preview-padding,var(--spectrum-card-horizontal-preview-padding)
)}:host([horizontal]) .content,:host([horizontal]) .header{block-size:auto;margin-block-start:0}:host([horizontal]) .content{margin-block-end:0}:host([horizontal]) .title{padding-inline-end:0}:host([horizontal]) .body{display:flex;flex-direction:column;flex-shrink:0;justify-content:center;padding-block:0;padding-inline:var(
--mod-card-horizontal-body-padding,var(--spectrum-card-horizontal-body-padding)
)}:host([variant=gallery]){min-inline-size:0}:host([variant=gallery]) #preview{border-radius:0;padding:0}:host([href]:not([href=""])){cursor:pointer}#like-anchor{inset:0;pointer-events:none;position:absolute}.action-button{flex-grow:0}:host([dir=ltr]) .action-button{margin-left:auto}:host([dir=rtl]) .action-button{margin-right:auto}slot[name=description]{font-size:var(
--spectrum-card-subtitle-text-size,var(--spectrum-global-dimension-font-size-50)
)}#preview+#cover-photo{display:none}#cover-photo ::slotted(*),:host(:not([variant=quiet])) #preview ::slotted(*){display:block;object-fit:cover;width:100%}:host(:not([variant=gallery])) #preview ::slotted(*){height:100%}:host([horizontal]) #preview{width:auto}sp-quick-actions{z-index:1}.title{width:var(--spectrum-card-title-width)}.subtitle{text-transform:none}:host:after,:host:before{pointer-events:none}
`;var k = o$1;

const e=i$1`
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
`;var o = e;

var P = [o$2,t,o];

var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var i=(c,l,e,s)=>{for(var n=s>1?void 0:s?v(l,e):l,d=c.length-1,a;d>=0;d--)(a=c[d])&&(n=(s?a(l,e,n):a(n))||n);return s&&n&&u(l,e,n),n};class Card extends LikeAnchor(SizedMixin(ObserveSlotPresence(FocusVisiblePolyfillMixin(SpectrumElement),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"],noDefaultSize:!0})){constructor(){super(...arguments);this.variant="standard";this._selected=!1;this.heading="";this.horizontal=!1;this.focused=!1;this.toggles=!1;this.value="";this.subheading="";this.handleFocusin=e=>{if(this.focused=!0,e.composedPath()[0]!==this){this.removeEventListener("keydown",this.handleKeydown);return}this.addEventListener("keydown",this.handleKeydown);};}static get styles(){return [h,P,k]}get selected(){return this._selected}set selected(e){e!==this.selected&&(this._selected=e,this.requestUpdate("selected",!this._selected));}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var e;(e=this.likeAnchor)==null||e.click();}handleFocusout(e){this.focused=!1,e.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown);}handleKeydown(e){const{code:s}=e;switch(s){case"Space":if(this.toggleSelected(),this.toggles){e.preventDefault();break}case"Enter":case"NumpadEnter":this.click();}}handleSelectedChange(e){e.stopPropagation(),this.selected=e.target.checked,this.announceChange();}toggleSelected(){if(!this.toggles){this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}));return}this.selected=!this.selected,this.announceChange();}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected);}stopPropagationOnHref(e){this.href&&e.stopPropagation();}handlePointerdown(e){if(e.composedPath().some(h=>h.localName==="a"))return;const d=+new Date,a=()=>{+new Date-d<200&&this.click(),this.removeEventListener("pointerup",a),this.removeEventListener("pointercancel",a);};this.addEventListener("pointerup",a),this.addEventListener("pointercancel",a);}get renderHeading(){return x`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return x`
            <sp-asset id="preview" variant=${l(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?x`
                      <sp-divider size="s"></sp-divider>
                  `:A}
        `}get renderCoverImage(){return x`
            <sp-asset id="cover-photo" variant=${l(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?x`
                      <sp-divider size="s"></sp-divider>
                  `:A}
        `}get images(){const e=[];return this.hasPreview&&e.push(this.renderPreviewImage),this.hasCoverPhoto&&e.push(this.renderCoverImage),e}renderImage(){return this.horizontal?this.images:this.variant!=="standard"?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return x`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return x`
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${this.variant==="gallery"?this.renderSubtitleAndDescription:A}
                    ${this.variant!=="quiet"||this.size!=="s"?x`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:A}
                </div>
                ${this.variant!=="gallery"?x`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:A}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):A}
            ${this.variant==="standard"?x`
                      <slot name="footer"></slot>
                  `:A}
            ${this.toggles?x`
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
                  `:A}
            ${this.variant==="quiet"&&this.size==="s"?x`
                      <sp-quick-actions
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `:A}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout);}}i([n()],Card.prototype,"asset",2),i([n({reflect:!0})],Card.prototype,"variant",2),i([n({type:Boolean,reflect:!0})],Card.prototype,"selected",1),i([n()],Card.prototype,"heading",2),i([n({type:Boolean,reflect:!0})],Card.prototype,"horizontal",2),i([i$2("#like-anchor")],Card.prototype,"likeAnchor",2),i([n({type:Boolean,reflect:!0})],Card.prototype,"focused",2),i([n({type:Boolean,reflect:!0})],Card.prototype,"toggles",2),i([n()],Card.prototype,"value",2),i([n()],Card.prototype,"subheading",2);

defineElement("sp-card",Card);
