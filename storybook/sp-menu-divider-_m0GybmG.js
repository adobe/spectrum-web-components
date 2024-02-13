import { i as i$2 } from './lit-element-xBOPiTek.js';
import { f } from './divider.css-w129hLpK.js';
import { S as SizedMixin } from './sizedMixin-6sBuja8e.js';
import { S as SpectrumElement, d as defineElement } from './define-element-UHExAFdK.js';

const i=i$2`
:host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium)}:host{inline-size:auto;margin-block:var(
--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2)
);margin-inline:var(
--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content)
);overflow:visible}.spectrum-Menu-back.focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.spectrum-Menu-back:focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.spectrum-Menu-back{align-items:center;display:flex;flex-flow:wrap;padding-block:var(--mod-menu-back-padding-block-start,0) var(--mod-menu-back-padding-block-end,0);padding-inline:var(--mod-menu-back-padding-inline-start,0) var(
--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content)
)}.spectrum-Menu-backButton{background:none;border:0;cursor:pointer;display:inline-flex;margin:0;padding:0}.spectrum-Menu-backButton.focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)
)
);display:block;font-size:var(
--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size)
);font-weight:var(
--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight)
);line-height:var(
--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height)
)}.spectrum-Menu-backIcon{margin-block:var(
--mod-menu-back-icon-margin-block,var(--spectrum-menu-back-icon-margin)
);margin-inline:var(
--mod-menu-back-icon-margin-inline,var(--spectrum-menu-back-icon-margin)
);fill:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
);color:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
)}:host{display:block;flex-shrink:0}
`;var i$1 = i;

class MenuDivider extends SizedMixin(SpectrumElement,{validSizes:["s","m","l"]}){static get styles(){return [f,i$1]}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","separator");}}

defineElement("sp-menu-divider",MenuDivider);
