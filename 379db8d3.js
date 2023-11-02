import{i as a}from"./112b2095.js";import{S as n,x as r,n as t,d as e}from"./b46b846d.js";var i=a`
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
`,o=Object.defineProperty,u=Object.getOwnPropertyDescriptor;class d extends n{constructor(){super(...arguments),this.open=!1}static get styles(){return[i]}render(){return r``}}((a,n,r,t)=>{for(var e,i=t>1?void 0:t?u(n,r):n,d=a.length-1;d>=0;d--)(e=a[d])&&(i=(t?e(n,r,i):e(i))||i);t&&i&&o(n,r,i)})([t({type:Boolean,reflect:!0})],d.prototype,"open",2),e("sp-underlay",d);
//# sourceMappingURL=379db8d3.js.map
