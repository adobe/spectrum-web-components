"use strict";
export class BeforetoggleClosedEvent extends Event {
  constructor() {
    super("beforetoggle", {
      bubbles: false,
      composed: false
    });
    this.currentState = "open";
    this.newState = "closed";
  }
}
export class BeforetoggleOpenEvent extends Event {
  constructor() {
    super("beforetoggle", {
      bubbles: false,
      composed: false
    });
    this.currentState = "closed";
    this.newState = "open";
  }
}
export class OverlayStateEvent extends Event {
  constructor(type, overlay, {
    publish,
    interaction,
    reason
  }) {
    super(type, {
      bubbles: publish,
      composed: publish
    });
    this.overlay = overlay;
    this.detail = {
      interaction,
      reason
    };
  }
}
//# sourceMappingURL=events.dev.js.map
