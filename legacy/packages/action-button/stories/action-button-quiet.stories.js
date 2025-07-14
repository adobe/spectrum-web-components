"use strict";
import { renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Standard Quiet"
};
const quiet = true;
export const XS = (args) => renderButtons(args);
XS.args = {
  size: "xs",
  quiet
};
export const s = (args) => renderButtons(args);
s.args = {
  size: "s",
  quiet
};
export const m = (args) => renderButtons(args);
m.args = {
  size: "m",
  quiet
};
export const l = (args) => renderButtons(args);
l.args = {
  size: "l",
  quiet
};
export const XL = (args) => renderButtons(args);
XL.args = {
  size: "xl",
  quiet
};
//# sourceMappingURL=action-button-quiet.stories.js.map
