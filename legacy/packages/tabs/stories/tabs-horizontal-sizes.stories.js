"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-tabs",
  title: "Tabs/Sizes/Horizontal",
  argTypes: {
    direction: {
      name: "direction",
      type: { name: "string", required: false },
      description: "The direction of the Tabs element",
      table: {
        type: {
          summary: '"vertical" | "vertical-right" | "horizontal"'
        },
        defaultValue: { summary: "horizontal" }
      },
      control: {
        type: "text"
      }
    },
    verticalTab: { control: "boolean" },
    auto: { control: "boolean" },
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Tabs element",
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
    direction: "horizontal",
    type: false,
    verticalTab: false,
    auto: false,
    size: "m"
  }
};
const panels = () => html`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;
const template = (args) => {
  return html`
        <sp-tabs
            selected="1"
            size=${args.size}
            ?auto=${args.auto}
            label="Demo Tabs"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
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
//# sourceMappingURL=tabs-horizontal-sizes.stories.js.map
