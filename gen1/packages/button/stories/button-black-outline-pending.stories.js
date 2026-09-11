"use strict";
import { makeOverBackground, renderButtonSet } from "./index.js";
import { args, argTypes } from "./index.js";
const staticColor = "black";
const treatment = "outline";
const pending = true;
export default {
  component: "sp-button",
  title: "Button/Black/Outline/Pending",
  decorators: [makeOverBackground(staticColor)],
  args: {
    ...args,
    staticColor,
    treatment,
    pending
  },
  argTypes
};
export const s = (args2) => renderButtonSet(args2);
s.args = {
  size: "s"
};
export const m = (args2) => renderButtonSet(args2);
m.args = {
  size: "m"
};
export const l = (args2) => renderButtonSet(args2);
l.args = {
  size: "l"
};
export const XL = (args2) => renderButtonSet(args2);
XL.args = {
  size: "xl"
};
//# sourceMappingURL=button-black-outline-pending.stories.js.map
