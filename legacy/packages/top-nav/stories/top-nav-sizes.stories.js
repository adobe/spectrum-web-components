"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import "@spectrum-web-components/top-nav/sp-top-nav.js";
import "@spectrum-web-components/top-nav/sp-top-nav-item.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-top-nav",
  title: "Top Nav/Sizes",
  argTypes: {
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Top Nav element",
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "text"
      }
    }
  },
  args: {
    size: "m"
  }
};
const template = (args) => {
  return html`
        <sp-top-nav selected="1" size=${args.size} label="Demo Top Nav">
            <sp-top-nav-item value="1">Item 1</sp-top-nav-item>
            <sp-top-nav-item value="2">Item 2</sp-top-nav-item>
            <sp-top-nav-item value="3">Item 3</sp-top-nav-item>
            <sp-top-nav-item value="4">Item 4</sp-top-nav-item>
        </sp-top-nav>
    `;
};
export const s = (args) => template(args);
s.args = {
  size: "s"
};
export const m = (args) => template(args);
m.args = {
  size: "m"
};
export const l = (args) => template(args);
l.args = {
  size: "l"
};
export const XL = (args) => template(args);
XL.args = {
  size: "XL"
};
//# sourceMappingURL=top-nav-sizes.stories.js.map
