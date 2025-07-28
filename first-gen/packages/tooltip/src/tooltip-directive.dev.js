"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import {
  trigger
} from "@spectrum-web-components/overlay/src/overlay-trigger-directive.js";
export const tooltip = function tooltip2(tooltipContent, options) {
  return trigger(
    () => {
      import("@spectrum-web-components/tooltip/sp-tooltip.js");
      return html`
                <sp-tooltip variant=${ifDefined(options == null ? void 0 : options.variant)}>
                    ${tooltipContent()}
                </sp-tooltip>
            `;
    },
    {
      ...options,
      triggerInteraction: "hover",
      overlayOptions: {
        type: "hint",
        ...options == null ? void 0 : options.overlayOptions
      }
    }
  );
};
//# sourceMappingURL=tooltip-directive.dev.js.map
