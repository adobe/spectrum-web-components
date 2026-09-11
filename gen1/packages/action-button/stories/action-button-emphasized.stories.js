"use strict";
import { argTypes, renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Emphasized",
  argTypes: {
    ...argTypes
  }
};
const emphasized = true;
export const XS = (args) => renderButtons(args);
XS.args = {
  emphasized,
  size: "xs"
};
export const s = (args) => renderButtons(args);
s.args = {
  emphasized,
  size: "s"
};
export const m = (args) => renderButtons(args);
m.args = {
  emphasized,
  size: "m"
};
export const l = (args) => renderButtons(args);
l.args = {
  emphasized,
  size: "l"
};
export const XL = (args) => renderButtons(args);
XL.args = {
  emphasized,
  size: "xl"
};
export const href = (args) => renderButtons(args);
href.args = {
  emphasized,
  size: "m",
  href: "#"
};
//# sourceMappingURL=action-button-emphasized.stories.js.map
