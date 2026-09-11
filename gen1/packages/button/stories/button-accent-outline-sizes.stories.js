"use strict";
import { renderButtonSet } from "./index.js";
import { args, argTypes } from "./index.js";
const variant = "accent";
const treatment = "outline";
export default {
  component: "sp-button",
  title: "Button/Accent/Outline/Sizes",
  args: {
    ...args,
    variant,
    treatment
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
//# sourceMappingURL=button-accent-outline-sizes.stories.js.map
