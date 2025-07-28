"use strict";
import { makeOverBackground } from "../../button/stories/index.js";
import { renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Static White Quiet",
  decorators: [makeOverBackground()]
};
const staticColor = "white";
const quiet = true;
export const XS = (args) => renderButtons(args);
XS.args = {
  size: "xs",
  quiet,
  staticColor
};
export const s = (args) => renderButtons(args);
s.args = {
  size: "s",
  quiet,
  staticColor
};
export const m = (args) => renderButtons(args);
m.args = {
  size: "m",
  quiet,
  staticColor
};
export const l = (args) => renderButtons(args);
l.args = {
  size: "l",
  quiet,
  staticColor
};
export const XL = (args) => renderButtons(args);
XL.args = {
  size: "xl",
  quiet,
  staticColor
};
//# sourceMappingURL=action-button-white-quiet.stories.js.map
