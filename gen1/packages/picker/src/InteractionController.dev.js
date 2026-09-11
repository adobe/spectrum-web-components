"use strict";
export var InteractionTypes = /* @__PURE__ */ ((InteractionTypes2) => {
  InteractionTypes2[InteractionTypes2["desktop"] = 0] = "desktop";
  InteractionTypes2[InteractionTypes2["mobile"] = 1] = "mobile";
  return InteractionTypes2;
})(InteractionTypes || {});
export const SAFARI_FOCUS_RING_CLASS = "remove-focus-ring-safari-hack";
export class InteractionController {
  /**
   * Creates an interaction controller for the given host element.
   *
   * @param target - The trigger button element
   * @param host - The host element this controller manages
   */
  constructor(target, host) {
    this.target = target;
    this.host = host;
    /**
     * Controls whether the next toggle action should be prevented.
     * - `'no'`: Allow toggle
     * - `'maybe'`: May prevent based on additional conditions
     * - `'yes'`: Prevent the next toggle
     */
    this.preventNextToggle = "no";
    /** Tracks the open state at the time of pointerdown for toggle logic. */
    this.pointerdownState = false;
    /** Tracks the target of an active Enter keydown to prevent double-activation. */
    this.enterKeydownOn = null;
    this._open = false;
    this.target = target;
    this.host = host;
    this.host.addController(this);
    this.init();
  }
  /**
   * Indicates whether the host element is actively in the process of opening.
   * Always returns false in the base class; may be overridden in subclasses.
   */
  get activelyOpening() {
    return false;
  }
  /**
   * Whether the host element overlay is currently open.
   */
  get open() {
    return this._open;
  }
  /**
   * Sets the open state and synchronizes with the host element.
   * Also initializes the overlay reference if not already set.
   */
  set open(open) {
    if (this._open === open) {
      return;
    }
    this._open = open;
    this.host.open = open;
    if (!this.overlay && this.host.overlayElement) {
      this.overlay = this.host.overlayElement;
    }
  }
  /**
   * Reference to the overlay element managing the host element's dropdown.
   */
  get overlay() {
    return this._overlay;
  }
  /**
   * Sets the overlay reference and initializes overlay configuration.
   */
  set overlay(overlay) {
    if (!overlay) {
      return;
    }
    if (this.overlay === overlay) {
      return;
    }
    this._overlay = overlay;
    this.initOverlay();
  }
  /**
   * Releases any description resources.
   * Override in subclasses if cleanup is needed.
   */
  releaseDescription() {
  }
  /**
   * Initializes the overlay with appropriate configuration.
   * Sets up event listeners, type, placement, and focus behavior.
   */
  initOverlay() {
    if (this.overlay) {
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
  /**
   * Handles pointerdown events on the trigger button.
   * Override in subclasses for device-specific behavior.
   *
   * @param _event - The pointer event
   */
  handlePointerdown(_event) {
  }
  /**
   * Handles focus events on the trigger button.
   * Prevents reopening the menu when focus returns from the menu itself.
   *
   * @param event - The focus event
   */
  handleButtonFocus(event) {
    if (this.preventNextToggle === "maybe" && event.relatedTarget === this.host.optionsMenu) {
      this.preventNextToggle = "yes";
    }
    if (this.preventNextToggle === "no") {
      this.host.close();
    }
  }
  /**
   * Handles activation events (click, Enter, Space) on the trigger.
   * Override in subclasses for device-specific behavior.
   *
   * @param _event - The activation event
   */
  handleActivate(_event) {
  }
  /**
   * Initializes event listeners for the controller.
   * Override in subclasses to bind device-specific events.
   */
  /* c8 ignore next 3 */
  init() {
  }
  /**
   * Cleans up the controller by releasing resources and aborting event listeners.
   */
  abort() {
    var _a;
    this.releaseDescription();
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  /**
   * Lifecycle callback when the host element is connected to the DOM.
   * Initializes event listeners.
   */
  hostConnected() {
    this.init();
  }
  /**
   * Lifecycle callback when the host element is disconnected from the DOM.
   * Cleans up event listeners.
   */
  hostDisconnected() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  /**
   * Lifecycle callback after the host element updates.
   * Ensures overlay reference is set and updates willPreventClose state.
   */
  hostUpdated() {
    if (!this.overlay && this.host.overlayElement) {
      this.overlay = this.host.overlayElement;
    }
    if (this.overlay && this.host.dependencyManager.loaded) {
      this.overlay.willPreventClose = this.preventNextToggle !== "no";
    }
  }
}
//# sourceMappingURL=InteractionController.dev.js.map
