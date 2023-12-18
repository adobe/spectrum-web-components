import { i as i$1 } from './lit-element-9354aa77.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-7dc6a572.js';
import { x } from './lit-html-126adc72.js';

const i=i$1`
:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([opened]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([enter-from=left][opened]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([enter-from=right][opened]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{align-items:center;border-radius:var(
--spectrum-quickactions-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;height:var(
--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500)
);justify-content:center;padding:var(
--spectrum-quickactions-padding-y,var(--spectrum-global-dimension-size-50)
) var(
--spectrum-quickactions-padding-x,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) [name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) [name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-quickactions-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][text-only]) [name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl][text-only]) [name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-quickactions-text-button-gap-x,var(--spectrum-global-dimension-size-50)
)}#overlay{background-color:var(
--spectrum-quickactions-overlay-color,var(--spectrum-alias-background-color-quickactions-overlay)
)}:host{background-color:var(
--spectrum-quickactions-background-color,var(--spectrum-alias-background-color-quickactions)
)}
`;var d = i;

var m=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var a=(l,t,o,r)=>{for(var e=r>1?void 0:r?n(t,o):t,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(r?p(t,o,e):p(e))||e);return r&&e&&m(t,o,e),e};class QuickActions extends SpectrumElement{constructor(){super(...arguments);this.opened=!1;this.textOnly=!1;}static get styles(){return [d]}render(){return x`
            <slot></slot>
        `}}a([n$1({type:Boolean,reflect:!0})],QuickActions.prototype,"opened",2),a([n$1({type:Boolean,attribute:"text-only",hasChanged(){return !1}})],QuickActions.prototype,"textOnly",2);

defineElement("sp-quick-actions",QuickActions);
