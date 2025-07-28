"use strict";
import {
  oneEvent,
  waitUntil
} from "@open-wc/testing";
export const overlayOpened = async (overlay, timeout = 100, messagePrefix) => {
  return await waitUntil(
    () => (overlay == null ? void 0 : overlay.state) === "opened" || overlay && oneEvent(overlay, "sp-opened"),
    `${messagePrefix ? `${messagePrefix}: ` : ""}open timeout (still ${overlay == null ? void 0 : overlay.state})`,
    { timeout }
  );
};
export const overlayClosed = async (overlay, timeout = 100, messagePrefix) => {
  return await waitUntil(
    () => (overlay == null ? void 0 : overlay.state) === "closed" || oneEvent(overlay, "sp-closed"),
    `${messagePrefix ? `${messagePrefix}: ` : ""}closed timeout (still ${overlay == null ? void 0 : overlay.state})`,
    { timeout }
  );
};
//# sourceMappingURL=overlay-testing-helpers.js.map
