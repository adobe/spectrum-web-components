"use strict";
import { oneEvent, waitUntil } from "@open-wc/testing";
export const overlayOpened = async (overlay, timeout = 100, messagePrefix) => {
  if ((overlay == null ? void 0 : overlay.state) === "opened") {
    return Promise.resolve();
  }
  return await Promise.race([
    waitUntil(
      () => (overlay == null ? void 0 : overlay.state) === "opened",
      `${messagePrefix ? `${messagePrefix}: ` : ""}open timeout (still ${overlay == null ? void 0 : overlay.state})`,
      { timeout }
    ),
    oneEvent(overlay, "sp-opened")
  ]);
};
export const overlayClosed = async (overlay, timeout = 100, messagePrefix) => {
  if ((overlay == null ? void 0 : overlay.state) === "closed") {
    return Promise.resolve();
  }
  return await Promise.race([
    waitUntil(
      () => (overlay == null ? void 0 : overlay.state) === "closed",
      `${messagePrefix ? `${messagePrefix}: ` : ""}closed timeout (still ${overlay == null ? void 0 : overlay.state})`,
      { timeout }
    ),
    oneEvent(overlay, "sp-closed")
  ]);
};
//# sourceMappingURL=overlay-testing-helpers.js.map
