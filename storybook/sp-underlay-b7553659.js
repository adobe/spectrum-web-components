import { i } from './lit-element-9354aa77.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-43d4edd5.js';
import { x } from './lit-html-126adc72.js';

const n=i`
:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100) ease-in-out,opacity var(--spectrum-global-animation-duration-100) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-underlay-background-entry-animation-delay:var(
--spectrum-animation-duration-0
);--spectrum-underlay-background-exit-animation-ease:var(
--spectrum-animation-ease-in
);--spectrum-underlay-background-entry-animation-ease:var(
--spectrum-animation-ease-out
);--spectrum-underlay-background-entry-animation-duration:var(
--spectrum-animation-duration-600
);--spectrum-underlay-background-exit-animation-duration:var(
--spectrum-animation-duration-300
);--spectrum-underlay-background-exit-animation-delay:var(
--spectrum-animation-duration-200
);--spectrum-underlay-background-color:rgba(var(--spectrum-black-rgb),var(--spectrum-overlay-opacity))}:host{background-color:var(
--mod-underlay-background-color,var(--spectrum-underlay-background-color)
);inset-block:0;inset-inline:0;overflow:hidden;position:fixed;transition:opacity var(
--mod-underlay-background-exit-animation-duration,var(--spectrum-underlay-background-exit-animation-duration)
) var(
--mod-underlay-background-exit-animation-ease,var(--spectrum-underlay-background-exit-animation-ease)
) var(
--mod-underlay-background-exit-animation-delay,var(--spectrum-underlay-background-exit-animation-delay)
),visibility 0s linear calc(var(
--mod-underlay-background-exit-animation-delay,
var(--spectrum-underlay-background-exit-animation-delay)
) + var(
--mod-underlay-background-exit-animation-duration,
var(
--spectrum-underlay-background-exit-animation-duration
)
));z-index:1}:host([open]){transition:opacity var(
--mod-underlay-background-entry-animation-duration,var(--spectrum-underlay-background-entry-animation-duration)
) var(
--mod-underlay-background-entry-animation-ease,var(--spectrum-underlay-background-entry-animation-ease)
) var(
--mod-underlay-background-entry-animation-delay,var(--spectrum-underlay-background-entry-animation-delay)
)}
`;var y = n;

var u=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var m=(l,r,o,t)=>{for(var e=t>1?void 0:t?a(r,o):r,p=l.length-1,s;p>=0;p--)(s=l[p])&&(e=(t?s(r,o,e):s(e))||e);return t&&e&&u(r,o,e),e};class Underlay extends SpectrumElement{constructor(){super(...arguments);this.open=!1;}static get styles(){return [y]}render(){return x``}}m([n$1({type:Boolean,reflect:!0})],Underlay.prototype,"open",2);

defineElement("sp-underlay",Underlay);
