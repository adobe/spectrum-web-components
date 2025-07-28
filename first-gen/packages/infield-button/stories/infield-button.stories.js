"use strict";
import { html } from "@spectrum-web-components/base";
import {
  args,
  argTypes,
  chevronDown,
  chevronUp,
  Template
} from "./index.js";
export default {
  title: "Infield Button",
  component: "sp-infield-button",
  argTypes,
  args
};
export const Default = (args2) => Template(args2);
export const disabled = (args2) => Template(args2);
disabled.args = {
  disabled: true
};
export const inlineStart = (args2) => Template(args2);
inlineStart.args = {
  inline: "start"
};
export const inlineEnd = (args2) => Template(args2);
inlineEnd.args = {
  inline: "end"
};
export const stacked = () => html`
    ${Template({
  block: "start",
  content: chevronUp,
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  label: "Decrease"
})}
`;
export const quiet = (args2) => Template(args2);
quiet.args = {
  quiet: true
};
//# sourceMappingURL=infield-button.stories.js.map
