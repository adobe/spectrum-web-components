"use strict";
export function randomID() {
  return Array.from(
    crypto.getRandomValues(new Uint8Array(4)),
    (b) => `0${(b & 255).toString(16)}`.slice(-2)
  ).join("");
}
//# sourceMappingURL=random-id.dev.js.map
