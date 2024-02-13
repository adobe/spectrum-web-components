import { i as i$1 } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-UHExAFdK.js';
import { x } from './lit-html-GmIhAbMP.js';

const i=i$1`
:host{opacity:0;pointer-events:none;transition:transform var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,opacity var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,visibility 0s linear var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
);visibility:hidden}:host([opened]){opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s)
);visibility:visible}:host([enter-from=left][opened]){transform:translateX(var(
--mod-overlay-animation-distance,var(--spectrum-overlay-animation-distance,6px)
))}:host([enter-from=right][opened]){transform:translateX(calc(var(
--mod-overlay-animation-distance,
var(--spectrum-overlay-animation-distance, 6px)
)*-1))}:host{align-items:center;background-color:var(
--spectrum-quickactions-background-color,var(--spectrum-alias-background-color-quickactions)
);block-size:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);border-radius:var(
--spectrum-quickactions-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;justify-content:center;padding-block:var(
--spectrum-quickactions-padding-y,var(--spectrum-global-dimension-size-50)
);padding-inline:var(
--spectrum-quickactions-padding-x,var(--spectrum-global-dimension-size-50)
)}[name=action]+::slotted([slot=action]){margin-inline-start:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}#overlay{background-color:var(
--spectrum-quickactions-overlay-color,var(--spectrum-alias-background-color-quickactions-overlay)
)}:host([text-only]) [name=action]+::slotted([slot=action]){margin-inline-start:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}
`;var d = i;

var m=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var a=(l,t,o,r)=>{for(var e=r>1?void 0:r?n(t,o):t,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(r?p(t,o,e):p(e))||e);return r&&e&&m(t,o,e),e};class QuickActions extends SpectrumElement{constructor(){super(...arguments);this.opened=!1;this.textOnly=!1;}static get styles(){return [d]}render(){return x`
            <slot></slot>
        `}}a([n$1({type:Boolean,reflect:!0})],QuickActions.prototype,"opened",2),a([n$1({type:Boolean,attribute:"text-only",hasChanged(){return !1}})],QuickActions.prototype,"textOnly",2);

defineElement("sp-quick-actions",QuickActions);
