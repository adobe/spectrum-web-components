import { i as i$2 } from './lit-element-9354aa77.js';
import { f } from './divider.css-d14b5633.js';
import { S as SizedMixin } from './sizedMixin-95b38e3e.js';
import { S as SpectrumElement, d as defineElement } from './define-element-467f3dc4.js';

const i=i$2`
:host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(
--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2)
);margin-inline:var(
--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content)
);overflow:visible}:host{display:block;flex-shrink:0}
`;var i$1 = i;

class MenuDivider extends SizedMixin(SpectrumElement,{validSizes:["s","m","l"]}){static get styles(){return [f,i$1]}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","separator");}}

defineElement("sp-menu-divider",MenuDivider);
