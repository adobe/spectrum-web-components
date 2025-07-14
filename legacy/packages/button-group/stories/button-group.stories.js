"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/icon/sp-icon.js";
export default {
  title: "Button Group",
  component: "sp-button-group"
};
export const buttons = (args) => {
  return html`
        <sp-button-group size=${args.size || "m"}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttons.args = {
  size: "m"
};
export const buttonsVertical = (args) => {
  return html`
        <sp-button-group vertical size=${args.size || "m"}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttonsVertical.args = {
  size: "m"
};
//# sourceMappingURL=button-group.stories.js.map
