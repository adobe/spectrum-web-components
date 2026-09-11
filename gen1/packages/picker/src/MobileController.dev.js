"use strict";
import { isWebKit } from "@spectrum-web-components/shared";
import {
  InteractionController,
  InteractionTypes,
  SAFARI_FOCUS_RING_CLASS
} from "./InteractionController.dev.js";
export class MobileController extends InteractionController {
  constructor() {
    super(...arguments);
    /** Identifies this as a mobile interaction controller. */
    this.type = InteractionTypes.mobile;
  }
  /**
   * Handles click events on the trigger button.
   * Toggles the picker unless disabled or toggle is prevented.
   * Resets the preventNextToggle state after processing.
   */
  handleClick() {
    if (this.host.disabled) {
      return;
    }
    if (this.preventNextToggle == "no") {
      this.host.toggle();
    }
    this.preventNextToggle = "no";
  }
  /**
   * Handles pointerdown events on mobile devices.
   * Sets toggle prevention based on current open state to prevent
   * double-toggling. Applies Safari focus ring workaround class.
   */
  handlePointerdown() {
    this.preventNextToggle = this.open ? "yes" : "no";
    if (isWebKit()) {
      this.target.classList.add(SAFARI_FOCUS_RING_CLASS);
    }
  }
  /**
   * Handles focusout events on the trigger button.
   * Removes the Safari focus ring workaround class when the picker is closed.
   */
  handleFocusOut() {
    if (this.host.open) {
      return;
    }
    if (isWebKit() && this.target.classList.contains(SAFARI_FOCUS_RING_CLASS)) {
      this.target.classList.remove(SAFARI_FOCUS_RING_CLASS);
    }
  }
  /**
   * Initializes mobile-specific event listeners on the trigger button.
   * Binds click, pointerdown, and focusout handlers.
   * Cleans up any existing listeners before binding new ones.
   */
  init() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.target.addEventListener("click", () => this.handleClick(), {
      signal
    });
    this.target.addEventListener(
      "pointerdown",
      () => this.handlePointerdown(),
      { signal }
    );
    this.target.addEventListener("focusout", () => this.handleFocusOut(), {
      signal
    });
  }
}
//# sourceMappingURL=MobileController.dev.js.map
