"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/action-bar/sp-action-bar.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share.js";
export const Template = ({
  emphasized,
  open,
  tools = true
}) => {
  return html`
        <sp-action-bar ?open=${open} ?emphasized=${emphasized}>
            2 selected
            ${tools ? html`
                      <sp-action-button slot="buttons" label="Edit">
                          <sp-icon-edit slot="icon"></sp-icon-edit>
                      </sp-action-button>
                      <sp-action-button slot="buttons" label="Share">
                          <sp-icon-share slot="icon"></sp-icon-share>
                      </sp-action-button>
                  ` : html``}
        </sp-action-bar>
    `;
};
//# sourceMappingURL=template.js.map
