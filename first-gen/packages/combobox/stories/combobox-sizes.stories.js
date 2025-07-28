"use strict";
import { isOverlayOpen } from "../../overlay/stories/index.js";
import { Template } from "./template.js";
export default {
  title: "Combobox/Sizes",
  component: "sp-combobox"
};
export const s = (args) => Template({ ...args, size: "s" });
export const sOpen = (args) => Template({ ...args, open: true, size: "s" });
sOpen.decorators = [isOverlayOpen];
export const m = (args) => Template({ ...args, size: "m" });
export const mOpen = (args) => Template({ ...args, open: true, size: "m" });
mOpen.decorators = [isOverlayOpen];
export const l = (args) => Template({ ...args, size: "l" });
export const lOpen = (args) => Template({ ...args, open: true, size: "l" });
lOpen.decorators = [isOverlayOpen];
export const xL = (args) => Template({ ...args, size: "xl" });
export const XLOpen = (args) => Template({ ...args, open: true, size: "xl" });
XLOpen.decorators = [isOverlayOpen];
//# sourceMappingURL=combobox-sizes.stories.js.map
