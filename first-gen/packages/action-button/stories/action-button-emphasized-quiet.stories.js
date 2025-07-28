"use strict";
import { renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Emphasized Quiet"
};
const emphasized = true;
const quiet = true;
export const XS = (args) => renderButtons(args);
XS.args = {
  emphasized,
  size: "xs",
  quiet
};
export const s = (args) => renderButtons(args);
s.args = {
  emphasized,
  size: "s",
  quiet
};
export const m = (args) => renderButtons(args);
m.args = {
  emphasized,
  size: "m",
  quiet
};
export const l = (args) => renderButtons(args);
l.args = {
  emphasized,
  size: "l",
  quiet
};
export const XL = (args) => renderButtons(args);
XL.args = {
  emphasized,
  size: "xl",
  quiet
};
//# sourceMappingURL=action-button-emphasized-quiet.stories.js.map
