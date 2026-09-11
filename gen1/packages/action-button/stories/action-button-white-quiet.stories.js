"use strict";
import { makeOverBackground } from "../../button/stories/index.js";
import { argTypes, renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Static White Quiet",
  decorators: [makeOverBackground()],
  argTypes: {
    ...argTypes
  }
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
export const href = (args) => renderButtons(args);
href.args = {
  staticColor,
  quiet,
  size: "m",
  href: "#"
};
//# sourceMappingURL=action-button-white-quiet.stories.js.map
