"use strict";import{html as e}from"@spectrum-web-components/base";import{ifDefined as i}from"@spectrum-web-components/base/src/directives.js";import{trigger as a}from"@spectrum-web-components/overlay/src/overlay-trigger-directive.js";export const tooltip=function(t,r){return a(()=>(import("@spectrum-web-components/tooltip/sp-tooltip.js"),e`
                <sp-tooltip variant=${i(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,triggerInteraction:"hover",overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};
//# sourceMappingURL=tooltip-directive.js.map
