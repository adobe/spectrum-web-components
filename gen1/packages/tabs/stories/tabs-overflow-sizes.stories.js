"use strict";
import { renderTabsOverflowExample } from "./index.js";
export default {
  title: "Tabs Overflow/Sizes",
  component: "sp-tabs-overflow"
};
export const s = (args) => {
  return renderTabsOverflowExample(args);
};
s.args = {
  size: "s"
};
export const m = (args) => {
  return renderTabsOverflowExample(args);
};
m.args = {
  size: "m"
};
export const l = (args) => {
  return renderTabsOverflowExample(args);
};
l.args = {
  size: "l"
};
export const XL = (args) => {
  return renderTabsOverflowExample(args);
};
XL.args = {
  size: "xl"
};
//# sourceMappingURL=tabs-overflow-sizes.stories.js.map
