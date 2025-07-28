"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-field/sp-color-field.js";
import { ColorFieldMarkup } from "./template.js";
import { argTypes } from "./args.js";
import { DEFAULT_COLOR, DEMO_COLORS } from "./colors.js";
export default {
  component: "sp-color-field",
  title: "Color Field",
  args: {
    label: "",
    size: "m"
  },
  argTypes
};
export const Default = (args) => ColorFieldMarkup(args);
export const Quiet = (args) => ColorFieldMarkup(args);
Quiet.args = {
  quiet: true
};
export const ReadOnly = (args) => ColorFieldMarkup(args);
ReadOnly.args = {
  readonly: true,
  value: "rgb(255,255,255)"
};
export const Disabled = (args) => ColorFieldMarkup(args);
Disabled.args = {
  disabled: true
};
export const viewColor = (args) => ColorFieldMarkup(args);
viewColor.args = {
  viewColor: true,
  value: "rgb(255,255,0)"
};
export const Multiple = (args) => {
  return html`
        <div
            style="width: 20%; padding: 20px; margin: 10px; display: flex; flex-direction: column; gap: 16px; height: 200px; overflow-y: auto;"
        >
            ${DEMO_COLORS.map(
    (color, index) => ColorFieldMarkup({
      ...args,
      label: `Color ${index + 1}`,
      value: color,
      viewColor: true
    })
  )}
        </div>
    `;
};
Multiple.args = {
  viewColor: true,
  value: DEFAULT_COLOR
};
export const WrongInput = (args) => ColorFieldMarkup(args);
WrongInput.args = {
  value: "apple"
};
export const RightInput = (args) => ColorFieldMarkup(args);
RightInput.args = {
  value: "#a8323a"
};
//# sourceMappingURL=color-field.stories.js.map
