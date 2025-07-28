"use strict";
import {
  InteractionController,
  InteractionTypes
} from "./InteractionController.dev.js";
export class DesktopController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.desktop;
  }
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
