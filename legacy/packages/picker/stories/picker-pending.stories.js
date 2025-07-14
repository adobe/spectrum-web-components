"use strict";
import { argTypes } from "./args";
import { Template } from "./template";
export default {
  title: "Picker/Pending",
  component: "sp-picker",
  argTypes,
  args: {
    pending: true
  }
};
export const S = (args) => Template({ ...args, size: "s" });
export const M = (args) => Template({ ...args, size: "m" });
export const L = (args) => Template({ ...args, size: "l" });
export const XL = (args) => Template({ ...args, size: "xl" });
//# sourceMappingURL=picker-pending.stories.js.map
