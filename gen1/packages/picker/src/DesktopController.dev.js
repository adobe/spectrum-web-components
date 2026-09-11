"use strict";
import {
  InteractionController,
  InteractionTypes
} from "./InteractionController.dev.js";
export class DesktopController extends InteractionController {
  constructor() {
    super(...arguments);
    /** Identifies this as a desktop interaction controller. */
    this.type = InteractionTypes.desktop;
  }
  /**
   * Handles pointerdown events on the trigger button.
   * Captures the current open state and sets up cleanup handlers
   * for pointerup, pointercancel, and click events.
   * Ignores non-primary buttons and touch events (handled by MobileController).
   *
   * @param event - The pointer event
   */
  handlePointerdown(event) {
    if (event.button !== 0 || event.pointerType === "touch") {
      return;
    }
    this.pointerdownState = this.open;
    this.preventNextToggle = "maybe";
    let cleanupAction = 0;
    const cleanup = () => {
      cancelAnimationFrame(cleanupAction);
      cleanupAction = requestAnimationFrame(async () => {
        document.removeEventListener("pointerup", cleanup);
        document.removeEventListener("pointercancel", cleanup);
        this.target.removeEventListener("click", cleanup);
        requestAnimationFrame(() => {
          this.preventNextToggle = "no";
        });
      });
    };
    document.addEventListener("pointerup", cleanup);
    document.addEventListener("pointercancel", cleanup);
    this.target.addEventListener("click", cleanup);
    this.handleActivate();
  }
  /**
   * Handles activation of the picker (via click or keyboard).
   * Prevents double-toggling when pointerup already changed the state.
   *
   * @param event - Optional activation event (click event or undefined for pointerdown)
   */
  handleActivate(event) {
    if (this.enterKeydownOn && this.enterKeydownOn !== this.target) {
      return;
    }
    if (this.preventNextToggle === "yes") {
      return;
    }
    if ((event == null ? void 0 : event.type) === "click" && this.open !== this.pointerdownState) {
      return;
    }
    this.host.toggle();
  }
  /**
   * Initializes desktop-specific event listeners on the trigger button.
   * Binds click, pointerdown, and focus handlers.
   * Cleans up any existing listeners before binding new ones.
   */
  init() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.target.addEventListener(
      "click",
      (event) => this.handleActivate(event),
      {
        signal
      }
    );
    this.target.addEventListener(
      "pointerdown",
      (event) => this.handlePointerdown(event),
      { signal }
    );
    this.target.addEventListener(
      "focus",
      (event) => this.handleButtonFocus(event),
      {
        signal
      }
    );
  }
}
//# sourceMappingURL=DesktopController.dev.js.map
