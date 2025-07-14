"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/alert-banner/sp-alert-banner.js";
import "@spectrum-web-components/button/sp-button.js";
export const AlertBannerMarkup = ({
  text = "Your trial has expired",
  variant = "neutral",
  dismissible = true,
  open = false,
  actionLabel = "Action"
}) => html`
    <sp-alert-banner
        variant=${variant}
        ?dismissible=${dismissible}
        ?open=${open}
    >
        ${text}
        <sp-button treatment="outline" static-color="white" slot="action">
            ${actionLabel}
        </sp-button>
    </sp-alert-banner>
`;
//# sourceMappingURL=index.js.map
