"use strict";
import { argTypes, renderButtons } from "./index.js";
export default {
  component: "sp-action-button",
  title: "Action Button/Standard",
  argTypes: {
    ...argTypes
  }
};
export const XS = (args) => renderButtons(args);
XS.args = {
  size: "xs"
};
export const s = (args) => renderButtons(args);
s.args = {
  size: "s"
};
export const m = (args) => renderButtons(args);
m.args = {
  size: "m"
};
export const l = (args) => renderButtons(args);
l.args = {
  size: "l"
};
export const XL = (args) => renderButtons(args);
XL.args = {
  size: "xl"
};
export const href = (args) => renderButtons(args);
href.args = {
  size: "m",
  href: "#"
};
//# sourceMappingURL=action-button-standard.stories.js.map
