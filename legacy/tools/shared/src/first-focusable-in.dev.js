"use strict";
import { userFocusableSelector } from "./focusable-selectors.dev.js";
export const firstFocusableIn = (root) => {
  const firstFocusable = root.querySelector(
    userFocusableSelector
  );
  return firstFocusable;
};
export const firstFocusableSlottedIn = (root) => {
  const firstFocusable = root.assignedElements().find(
    (element) => element.matches(userFocusableSelector)
  );
  return firstFocusable;
};
//# sourceMappingURL=first-focusable-in.dev.js.map
