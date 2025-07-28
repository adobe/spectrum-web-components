"use strict";
import { html } from "@spectrum-web-components/base";
import { argTypes } from "./args.js";
import { Template } from "./template.js";
import { spreadProps } from "../../../test/lit-helpers.js";
export default {
  title: "Contextual Help",
  component: "sp-contextual-help",
  args: {
    label: "",
    variant: "info",
    placement: void 0
  },
  argTypes
};
export const Default = (args) => Template(args);
Default.args = {
  open: true
};
export const Help = (args) => Template(args);
Help.args = {
  variant: "help",
  open: true
};
export const CustomPlacement = (args) => {
  return html`
        <div
            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"
        >
            ${Template(args)}
        </div>
    `;
};
CustomPlacement.args = {
  placement: "top",
  open: true
};
export const customMaxWidth = (args) => {
  return html`
        <sp-contextual-help
            ${spreadProps(args || {})}
            style="--mod-spectrum-contextual-help-popover-maximum-width: 200px;"
        >
            <h2 slot="heading">Custom max width</h2>
            This is a test of the contextual help component with a custom max
            width of 200px.
        </sp-contextual-help>
    `;
};
customMaxWidth.args = {
  open: true
};
//# sourceMappingURL=contextual-help.stories.js.map
