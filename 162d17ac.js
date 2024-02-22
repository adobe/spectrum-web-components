import{i as e}from"./112b2095.js";import{S as i,n as s}from"./c34bcf8e.js";import{x as o}from"./e6d35ea0.js";var r=e`
:host{--spectrum-icon-inline-size:var(
--mod-icon-inline-size,var(--mod-icon-size,var(--spectrum-icon-size))
);--spectrum-icon-block-size:var(
--mod-icon-block-size,var(--mod-icon-size,var(--spectrum-icon-size))
);block-size:var(--spectrum-icon-block-size);color:var(--mod-icon-color,inherit);inline-size:var(--spectrum-icon-inline-size);fill:currentColor;display:inline-block}:host(:not(:root)){overflow:hidden}:host{pointer-events:none}@media (forced-colors:active){:host{forced-color-adjust:auto}}:host{--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=xxs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxs)}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxl)}:host{--spectrum-icon-size:inherit;--spectrum-icon-inline-size:var(
--mod-icon-inline-size,var(--mod-icon-size,var(--_spectrum-icon-size))
);--spectrum-icon-block-size:var(
--mod-icon-block-size,var(--mod-icon-size,var(--_spectrum-icon-size))
);--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-100)
)}#container{height:100%}::slotted(*),img,svg{color:inherit;height:100%;vertical-align:top;width:100%}@media (forced-colors:active){::slotted(*),img,svg{forced-color-adjust:auto}}:host([size=xxs]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-xxs)
)}:host([size=xs]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-50)
)}:host([size=s]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-75)
)}:host([size=l]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-200)
)}:host([size=xl]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-300)
)}:host([size=xxl]){--_spectrum-icon-size:var(
--spectrum-icon-size,var(--spectrum-workflow-icon-size-xxl)
)}
`,c=Object.defineProperty,t=Object.getOwnPropertyDescriptor,n=(e,i,s,o)=>{for(var r,n=o>1?void 0:o?t(i,s):i,z=e.length-1;z>=0;z--)(r=e[z])&&(n=(o?r(i,s,n):r(n))||n);return o&&n&&c(i,s,n),n};class z extends i{constructor(){super(...arguments),this.label=""}static get styles(){return[r]}update(e){e.has("label")&&(this.label?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")),super.update(e)}render(){return o`
            <slot></slot>
        `}}n([s()],z.prototype,"label",2),n([s({reflect:!0})],z.prototype,"size",2);export{z as I};
//# sourceMappingURL=162d17ac.js.map
