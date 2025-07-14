"use strict";
import { makeOverBackground } from "../../button/stories/index.js";
import { renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Static White",
  decorators: [makeOverBackground()]
};
const staticColor = "white";
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
//# sourceMappingURL=action-button-white.stories.js.map
