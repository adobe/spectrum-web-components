"use strict";
export class OverlayCloseEvent extends Event {
  constructor({ root }) {
    super("sp-overlay-close", { bubbles: true, composed: true });
    this.root = root;
  }
}
//# sourceMappingURL=overlay-events.dev.js.map
