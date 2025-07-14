"use strict";
import {
  buttons,
  buttonsVertical
} from "./button-group.stories.js";
export default {
  title: "Button Group/Sizes",
  component: "sp-button-group"
};
export const s = (args) => buttons(args);
s.args = { size: "s" };
export const m = (args) => buttons(args);
m.args = { size: "m" };
export const l = (args) => buttons(args);
l.args = { size: "l" };
export const XL = (args) => buttons(args);
XL.args = { size: "XL" };
export const verticalS = (args) => buttonsVertical(args);
verticalS.args = { size: "s" };
export const verticalM = (args) => buttonsVertical(args);
verticalM.args = { size: "m" };
export const verticalL = (args) => buttonsVertical(args);
verticalL.args = { size: "l" };
export const verticalXL = (args) => buttonsVertical(args);
verticalXL.args = { size: "XL" };
//# sourceMappingURL=button-group-sizes.stories.js.map
