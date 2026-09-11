"use strict";
import {
  InteractionController,
  InteractionTypes
} from "./InteractionController.dev.js";
export class ClickController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.click;
    /**
     * An overlay with a `click` interaction should not close on click `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent from toggling the overlay when the click event
     * propagates later in the interaction.
     */
    this.preventNextToggle = false;
  }
  handleClick() {
    if (!this.preventNextToggle) {
      this.open = !this.open;
    }
    this.preventNextToggle = false;
  }
  handlePointerdown() {
    this.preventNextToggle = this.open;
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
  }
}
//# sourceMappingURL=ClickController.dev.js.map
