"use strict";
import { argTypes, Template } from "./index.js";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
export default {
  title: "Picker Button/Sizes",
  component: "sp-picker-button",
  ...argTypes
};
export const s = (args) => Template(args);
s.args = { size: "s" };
export const m = (args) => Template(args);
m.args = { size: "m" };
export const l = (args) => Template(args);
l.args = { size: "l" };
export const XL = (args) => Template(args);
XL.args = { size: "xl" };
export const sLabel = (args) => Template(args);
sLabel.args = { size: "s", label: true };
export const mLabel = (args) => Template(args);
mLabel.args = { size: "m", label: true };
export const lLabel = (args) => Template(args);
lLabel.args = { size: "l", label: true };
export const XLLabel = (args) => Template(args);
XLLabel.args = { size: "xl", label: true };
//# sourceMappingURL=picker-button-sizes.stories.js.map
