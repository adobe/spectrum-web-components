"use strict";
const focusables = [
  "input:not([inert])",
  "select:not([inert])",
  "textarea:not([inert])",
  "a[href]:not([inert])",
  "button:not([inert])",
  "label:not([inert])",
  "[tabindex]:not([inert])",
  "audio[controls]:not([inert])",
  "video[controls]:not([inert])",
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  "details>summary:first-of-type:not([inert])",
  "details:not([inert])",
  '[focusable]:not([focusable="false"])'
  // custom dev use-case
];
const userFocuable = ':not([tabindex="-1"])';
export const userFocusableSelector = focusables.join(`${userFocuable}, `) + userFocuable;
export const focusableSelector = focusables.join(", ");
//# sourceMappingURL=focusable-selectors.dev.js.map
