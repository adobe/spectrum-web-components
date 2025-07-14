"use strict";
import { renderButtonSet } from "./index.js";
import { args, argTypes } from "./index.js";
const variant = "negative";
const treatment = "outline";
const pending = true;
export default {
  component: "sp-button",
  title: "Button/Negative/Outline/Pending",
  args: {
    ...args,
    variant,
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
//# sourceMappingURL=button-negative-outline-pending.stories.js.map
