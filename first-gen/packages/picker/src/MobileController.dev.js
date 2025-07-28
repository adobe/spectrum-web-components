"use strict";
import {
  InteractionController,
  InteractionTypes,
  SAFARI_FOCUS_RING_CLASS
} from "./InteractionController.dev.js";
import { isWebKit } from "@spectrum-web-components/shared";
export class MobileController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.mobile;
  }
  handleClick() {
    if (this.host.disabled) {
      return;
    }
    if (this.preventNextToggle == "no") {
      this.host.toggle();
    }
    this.preventNextToggle = "no";
  }
  handlePointerdown() {
    this.preventNextToggle = this.open ? "yes" : "no";
    if (isWebKit()) {
      this.target.classList.add(SAFARI_FOCUS_RING_CLASS);
    }
  }
  handleFocusOut() {
    if (this.host.open) {
      return;
    }
    if (isWebKit() && this.target.classList.contains(SAFARI_FOCUS_RING_CLASS)) {
      this.target.classList.remove(SAFARI_FOCUS_RING_CLASS);
    }
  }
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
