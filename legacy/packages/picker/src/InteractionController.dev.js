"use strict";
export var InteractionTypes = /* @__PURE__ */ ((InteractionTypes2) => {
  InteractionTypes2[InteractionTypes2["desktop"] = 0] = "desktop";
  InteractionTypes2[InteractionTypes2["mobile"] = 1] = "mobile";
  return InteractionTypes2;
})(InteractionTypes || {});
export const SAFARI_FOCUS_RING_CLASS = "remove-focus-ring-safari-hack";
export class InteractionController {
  constructor(target, host) {
    this.target = target;
    this.host = host;
    this.preventNextToggle = "no";
    this.pointerdownState = false;
    this.enterKeydownOn = null;
    this._open = false;
    this.target = target;
    this.host = host;
    this.host.addController(this);
    this.init();
  }
  get activelyOpening() {
    return false;
  }
  get open() {
    return this._open;
  }
  /**
   * Set `open`
   */
  set open(open) {
    if (this._open === open) return;
    this._open = open;
    if (this.overlay) {
      this.host.open = open;
      return;
    }
    customElements.whenDefined("sp-overlay").then(async () => {
      const { Overlay: Overlay2 } = await import("@spectrum-web-components/overlay/src/Overlay.js");
      this.overlay = new Overlay2();
      this.host.open = true;
      this.host.requestUpdate();
    });
    import("@spectrum-web-components/overlay/sp-overlay.js");
  }
  get overlay() {
    return this._overlay;
  }
  set overlay(overlay) {
    if (!overlay) return;
    if (this.overlay === overlay) return;
    this._overlay = overlay;
    this.initOverlay();
  }
  releaseDescription() {
  }
  handleBeforetoggle(event) {
    var _a;
    if (event.composedPath()[0] !== event.target) {
      return;
    }
    if (event.newState === "closed") {
      if (this.preventNextToggle === "no") {
        this.open = false;
      } else if (!this.pointerdownState) {
        (_a = this.overlay) == null ? void 0 : _a.manuallyKeepOpen();
      }
    }
    if (!this.open) {
      this.host.optionsMenu.updateSelectedItemIndex();
      this.host.optionsMenu.closeDescendentOverlays();
    }
  }
  initOverlay() {
    if (this.overlay) {
      this.overlay.addEventListener("beforetoggle", (event) => {
        this.handleBeforetoggle(
          event
        );
      });
      this.overlay.type = this.host.isMobile.matches && !this.host.forcePopover ? "modal" : "auto";
      this.overlay.triggerElement = this.host;
      this.overlay.placement = this.host.isMobile.matches && !this.host.forcePopover ? void 0 : this.host.placement;
      this.overlay.receivesFocus = "false";
      this.overlay.willPreventClose = this.preventNextToggle !== "no" && this.open;
      this.overlay.addEventListener(
        "slottable-request",
        this.host.handleSlottableRequest
      );
    }
  }
  handlePointerdown(_event) {
  }
  handleButtonFocus(event) {
    if (this.preventNextToggle === "maybe" && event.relatedTarget === this.host.optionsMenu) {
      this.preventNextToggle = "yes";
    }
    if (this.preventNextToggle === "no") this.host.close();
  }
  handleActivate(_event) {
  }
  /* c8 ignore next 3 */
  init() {
  }
  abort() {
    var _a;
    this.releaseDescription();
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  hostConnected() {
    this.init();
    this.host.addEventListener("sp-opened", () => {
      this.host.optionsMenu.shouldSupportDragAndSelect = !this.host.isMobile.matches;
    });
    this.host.addEventListener("sp-closed", () => {
      if (!this.open && this.host.optionsMenu.matches(":focus-within") && !this.host.button.matches(":focus")) {
        this.host.button.focus();
      }
    });
  }
  hostDisconnected() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  hostUpdated() {
    if (this.overlay && this.host.dependencyManager.loaded && this.host.open !== this.overlay.open) {
      this.overlay.willPreventClose = this.preventNextToggle !== "no";
      this.overlay.open = this.host.open;
    }
  }
}
//# sourceMappingURL=InteractionController.dev.js.map
