"use strict";
import { makeOverBackground } from "../../button/stories/index.js";
import { argTypes, renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Static Black",
  decorators: [makeOverBackground("black")],
  argTypes: {
    ...argTypes
  }
};
const staticColor = "black";
export const XS = (args) => renderButtons(args);
XS.args = {
  size: "xs",
  staticColor
};
export const s = (args) => renderButtons(args);
s.args = {
  size: "s",
  staticColor
};
export const m = (args) => renderButtons(args);
m.args = {
  size: "m",
  staticColor
};
export const l = (args) => renderButtons(args);
l.args = {
  size: "l",
  staticColor
};
export const XL = (args) => renderButtons(args);
XL.args = {
  size: "xl",
  staticColor
};
export const href = (args) => renderButtons(args);
href.args = {
  staticColor,
  size: "m",
  href: "#"
};
//# sourceMappingURL=action-button-black.stories.js.map
