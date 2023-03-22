import{i as a}from"./d230bd74.js";import{S as i,y as o,e as r}from"./05d6b8f8.js";var n=a`
:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0s;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{inset:0;overflow:hidden;position:fixed;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0s linear calc(var(
--spectrum-dialog-confirm-background-exit-animation-delay,
var(--spectrum-global-animation-duration-200)
) + var(
--spectrum-dialog-confirm-background-exit-animation-duration,
var(--spectrum-global-animation-duration-300)
));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0s)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}
`,t=Object.defineProperty,e=Object.getOwnPropertyDescriptor;class s extends i{constructor(){super(...arguments),this.open=!1}static get styles(){return[n]}render(){return o``}}((a,i,o,r)=>{for(var n,s=r>1?void 0:r?e(i,o):i,c=a.length-1;c>=0;c--)(n=a[c])&&(s=(r?n(i,o,s):n(s))||s);r&&s&&t(i,o,s)})([r({type:Boolean,reflect:!0})],s.prototype,"open",2),customElements.define("sp-underlay",s);
//# sourceMappingURL=32919efe.js.map
