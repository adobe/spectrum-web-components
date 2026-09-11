"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import { argTypes, renderButton, renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button",
  argTypes: {
    ...argTypes
  }
};
function renderButtonsSelected(args) {
  return html`
    <sp-action-group ?emphasized=${!!args.emphasized} ?quiet=${!!args.quiet}>
      ${renderButton(args)} ${renderButton({ ...args, selected: true })}
      ${renderButton({ ...args, disabled: true })}
    </sp-action-group>
  `;
}
export const toggles = (args) => renderButtonsSelected(args);
toggles.args = {
  toggles: true,
  icon: `<sp-icon-edit hidden slot="icon"></sp-icon-edit>`
};
export const href = (args) => renderButtons(args);
href.args = {
  href: "https://github.com/adobe/spectrum-web-components"
};
export const hrefWithTarget = (args) => renderButton(args);
hrefWithTarget.args = {
  href: "https://github.com/adobe/spectrum-web-components",
  target: "_blank",
  label: "Click Me"
};
//# sourceMappingURL=action-button.stories.js.map
