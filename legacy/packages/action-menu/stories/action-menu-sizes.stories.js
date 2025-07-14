"use strict";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { isOverlayOpen } from "../../overlay/stories/index.js";
import "../../overlay/stories/index.js";
import { ActionMenuMarkup } from "./";
export default {
  title: "Action menu/Sizes",
  component: "sp-action-menu"
};
export const s = () => ActionMenuMarkup({ size: "s" });
export const sOpen = () => ActionMenuMarkup({ size: "s", open: true });
sOpen.decorators = [isOverlayOpen];
export const m = () => ActionMenuMarkup({ size: "m" });
export const mOpen = () => ActionMenuMarkup({ size: "m", open: true });
mOpen.decorators = [isOverlayOpen];
export const l = () => ActionMenuMarkup({ size: "l" });
export const lOpen = () => ActionMenuMarkup({ size: "l", open: true });
lOpen.decorators = [isOverlayOpen];
export const XL = () => ActionMenuMarkup({ size: "xl" });
export const XLOpen = () => ActionMenuMarkup({ size: "xl", open: true });
XLOpen.decorators = [isOverlayOpen];
//# sourceMappingURL=action-menu-sizes.stories.js.map
