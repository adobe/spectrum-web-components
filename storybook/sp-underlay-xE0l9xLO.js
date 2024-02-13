import { i } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-UHExAFdK.js';
import { x } from './lit-html-GmIhAbMP.js';

const n=i`
:host{opacity:0;pointer-events:none;transition:transform var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,opacity var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,visibility 0s linear var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s)
);visibility:visible}:host{--spectrum-underlay-background-entry-animation-delay:var(
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
`;var u = n;

var d=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var s=(i,t,o,r)=>{for(var e=r>1?void 0:r?p(t,o):t,n=i.length-1,l;n>=0;n--)(l=i[n])&&(e=(r?l(t,o,e):l(e))||e);return r&&e&&d(t,o,e),e};class Underlay extends SpectrumElement{constructor(){super(...arguments);this.canClick=!1;this.open=!1;}static get styles(){return [u]}click(){this.dispatchEvent(new Event("close"));}handlePointerdown(){this.canClick=!0;}handlePointerup(){this.canClick&&this.click(),this.canClick=!1;}render(){return x``}firstUpdated(){this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup);}}s([n$1({type:Boolean,reflect:!0})],Underlay.prototype,"open",2);

defineElement("sp-underlay",Underlay);
