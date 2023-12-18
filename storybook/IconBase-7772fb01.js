import { i } from './lit-element-9354aa77.js';
import { S as SpectrumElement, n } from './define-element-7dc6a572.js';
import { x } from './lit-html-126adc72.js';

const s=i`
:host{fill:currentColor;color:var(--mod-icon-color,inherit);display:inline-block;pointer-events:none}:host(:not(:root)){overflow:hidden}@media (forced-colors:active){:host{forced-color-adjust:auto}}:host{--spectrum-icon-size-s:var(
--spectrum-alias-workflow-icon-size-s,var(--spectrum-global-dimension-size-200)
);--spectrum-icon-size-m:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);--spectrum-icon-size-l:var(--spectrum-alias-workflow-icon-size-l);--spectrum-icon-size-xl:var(
--spectrum-alias-workflow-icon-size-xl,var(--spectrum-global-dimension-size-275)
);--spectrum-icon-size-xxl:var(--spectrum-global-dimension-size-400)}:host([size=s]){height:var(--spectrum-icon-size-s);width:var(--spectrum-icon-size-s)}:host([size=m]){height:var(--spectrum-icon-size-m);width:var(--spectrum-icon-size-m)}:host([size=l]){height:var(--spectrum-icon-size-l);width:var(--spectrum-icon-size-l)}:host([size=xl]){height:var(--spectrum-icon-size-xl);width:var(--spectrum-icon-size-xl)}:host([size=xxl]){height:var(--spectrum-icon-size-xxl);width:var(--spectrum-icon-size-xxl)}:host{--spectrum-icon-size-xxs:var(
--spectrum-alias-workflow-icon-size-xxs,var(--spectrum-global-dimension-size-150)
);--spectrum-icon-size-xs:var(
--spectrum-alias-workflow-icon-size-xs,var(--spectrum-global-dimension-size-175)
);height:var(
--spectrum-icon-tshirt-size-height,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
);width:var(
--spectrum-icon-tshirt-size-width,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
)}:host([size=xxs]){height:var(--spectrum-icon-size-xxs);width:var(--spectrum-icon-size-xxs)}:host([size=xs]){height:var(--spectrum-icon-size-xs);width:var(--spectrum-icon-size-xs)}#container{height:100%}::slotted(*),img,svg{color:inherit;height:100%;vertical-align:top;width:100%}@media (forced-colors:active){::slotted(*),img,svg{forced-color-adjust:auto}}
`;var c = s;

var a=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var p=(i,r,t,l)=>{for(var e=l>1?void 0:l?d(r,t):r,s=i.length-1,o;s>=0;s--)(o=i[s])&&(e=(l?o(r,t,e):o(e))||e);return l&&e&&a(r,t,e),e};class IconBase extends SpectrumElement{constructor(){super(...arguments);this.label="";}static get styles(){return [c]}update(t){t.has("label")&&(this.label?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")),super.update(t);}render(){return x`
            <slot></slot>
        `}}p([n()],IconBase.prototype,"label",2),p([n({reflect:!0})],IconBase.prototype,"size",2);

export { IconBase as I };
