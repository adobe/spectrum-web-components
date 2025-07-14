"use strict";
export var InteractionTypes = /* @__PURE__ */ ((InteractionTypes2) => {
  InteractionTypes2["click"] = "click";
  InteractionTypes2["hover"] = "hover";
  InteractionTypes2["longpress"] = "longpress";
  return InteractionTypes2;
})(InteractionTypes || {});
export const lastInteractionType = Symbol("lastInteractionType");
export class InteractionController {
  constructor(target, { overlay, isPersistent, handleOverlayReady }) {
    this.target = target;
    // Holds optimistic open state when an Overlay is not yet present
    this.isLazilyOpen = false;
    this.isPersistent = false;
    this.isPersistent = !!isPersistent;
    this.handleOverlayReady = handleOverlayReady;
    if (this.isPersistent) {
      this.init();
    }
    this.overlay = overlay;
  }
  get activelyOpening() {
    return false;
  }
  get open() {
    var _a, _b;
    return (_b = (_a = this.overlay) == null ? void 0 : _a.open) != null ? _b : this.isLazilyOpen;
  }
  /**
   * Set `open` against the associated Overlay lazily.
   */
  set open(open) {
    if (open === this.open) return;
    this.isLazilyOpen = open;
    if (this.overlay) {
      this.overlay.open = open;
      this.target[lastInteractionType] = this.type;
      return;
    }
    if (!open) {
      return;
    }
    customElements.whenDefined("sp-overlay").then(async () => {
      const { Overlay } = await import("./Overlay.dev.js");
      this.overlay = new Overlay();
      this.overlay.open = true;
      this.target[lastInteractionType] = this.type;
    });
    import("@spectrum-web-components/overlay/sp-overlay.js");
  }
  get overlay() {
    return this._overlay;
  }
  set overlay(overlay) {
    var _a;
    if (!overlay) return;
    if (this.overlay === overlay) return;
    if (this.overlay) {
      this.overlay.removeController(this);
    }
    this._overlay = overlay;
    this.overlay.addController(this);
    this.initOverlay();
    this.prepareDescription(this.target);
    (_a = this.handleOverlayReady) == null ? void 0 : _a.call(this, this.overlay);
  }
  prepareDescription(_) {
  }
  releaseDescription() {
  }
  shouldCompleteOpen() {
  }
  /* c8 ignore next 3 */
  init() {
  }
  /* c8 ignore next 3 */
  initOverlay() {
  }
  abort() {
    var _a;
    this.releaseDescription();
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  hostConnected() {
    this.init();
  }
  hostDisconnected() {
    if (!this.isPersistent) {
      this.abort();
    }
  }
}
//# sourceMappingURL=InteractionController.dev.js.map
