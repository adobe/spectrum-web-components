"use strict";
import { renderTabsOverflowExample } from "./index.js";
export default {
  title: "Tabs Overflow/Sizes/with Panel",
  component: "sp-tabs-overflow"
};
export const s = (args) => {
  return renderTabsOverflowExample(args);
};
s.args = {
  size: "s",
  includeTabPanel: true
};
export const m = (args) => {
  return renderTabsOverflowExample(args);
};
m.args = {
  size: "m",
  includeTabPanel: true
};
export const l = (args) => {
  return renderTabsOverflowExample(args);
};
l.args = {
  size: "l",
  pincludeTabPanelanel: true
};
export const XL = (args) => {
  return renderTabsOverflowExample(args);
};
XL.args = {
  size: "xl",
  includeTabPanel: true
};
//# sourceMappingURL=tabs-overflow-panel-sizes.stories.js.map
