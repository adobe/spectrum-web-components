"use strict";
import {
  isAndroid,
  isIOS
} from "@spectrum-web-components/shared/src/platform.js";
import { conditionAttributeWithId } from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { noop } from "./AbstractOverlay.dev.js";
import {
  InteractionController,
  InteractionTypes
} from "./InteractionController.dev.js";
const LONGPRESS_DURATION = 300;
export const LONGPRESS_INSTRUCTIONS = {
  touch: "Double tap and long press for additional options",
  keyboard: "Press Space or Alt+Down Arrow for additional options",
  mouse: "Click and hold for additional options"
};
export class LongpressController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.longpress;
    this.longpressState = null;
    this.releaseDescription = noop;
    this.handlePointerup = () => {
      var _a;
      clearTimeout(this.timeout);
      if (!this.target) return;
      this.longpressState = ((_a = this.overlay) == null ? void 0 : _a.state) === "opening" ? "pressed" : null;
      document.removeEventListener("pointerup", this.handlePointerup);
      document.removeEventListener("pointercancel", this.handlePointerup);
    };
  }
  get activelyOpening() {
    return this.longpressState === "opening" || this.longpressState === "pressed";
  }
  handleLongpress() {
    this.open = true;
    this.longpressState = this.longpressState === "potential" ? "opening" : "pressed";
  }
  handlePointerdown(event) {
    if (!this.target) return;
    if (event.button !== 0) return;
    this.longpressState = "potential";
    document.addEventListener("pointerup", this.handlePointerup);
    document.addEventListener("pointercancel", this.handlePointerup);
    const triggerHandlesLongpress = "holdAffordance" in this.target;
    if (triggerHandlesLongpress) return;
    this.timeout = setTimeout(() => {
      if (!this.target) return;
      this.target.dispatchEvent(
        new CustomEvent("longpress", {
          bubbles: true,
          composed: true,
          detail: {
            source: "pointer"
          }
        })
      );
    }, LONGPRESS_DURATION);
  }
  handleKeydown(event) {
    const { code, altKey } = event;
    if (altKey && code === "ArrowDown") {
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }
  handleKeyup(event) {
    const { code, altKey } = event;
    if (code === "Space" || altKey && code === "ArrowDown") {
      if (!this.target) {
        return;
      }
      event.stopPropagation();
      this.target.dispatchEvent(
        new CustomEvent("longpress", {
          bubbles: true,
          composed: true,
          detail: {
            source: "keyboard"
          }
        })
      );
      setTimeout(() => {
        this.longpressState = null;
      });
    }
  }
  prepareDescription(trigger) {
    if (
      // do not reapply until target is recycled
      this.releaseDescription !== noop || // require "longpress content" to apply relationship
      !this.overlay.elements.length
    ) {
      return;
    }
    const longpressDescription = document.createElement("div");
    longpressDescription.id = `longpress-describedby-descriptor-${randomID()}`;
    const messageType = isIOS() || isAndroid() ? "touch" : "keyboard";
    longpressDescription.textContent = LONGPRESS_INSTRUCTIONS[messageType];
    longpressDescription.slot = "longpress-describedby-descriptor";
    const triggerParent = trigger.getRootNode();
    const overlayParent = this.overlay.getRootNode();
    if (triggerParent === overlayParent) {
      this.overlay.append(longpressDescription);
    } else {
      longpressDescription.hidden = !("host" in triggerParent);
      trigger.insertAdjacentElement("afterend", longpressDescription);
    }
    const releaseDescription = conditionAttributeWithId(
      trigger,
      "aria-describedby",
      [longpressDescription.id]
    );
    this.releaseDescription = () => {
      releaseDescription();
      longpressDescription.remove();
      this.releaseDescription = noop;
    };
  }
  shouldCompleteOpen() {
    this.longpressState = this.longpressState === "pressed" ? null : this.longpressState;
  }
  init() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.target.addEventListener(
      "longpress",
      () => this.handleLongpress(),
      { signal }
    );
    this.target.addEventListener(
      "pointerdown",
      (event) => this.handlePointerdown(event),
      { signal }
    );
    this.prepareDescription(this.target);
    if (this.target.holdAffordance) {
      return;
    }
    this.target.addEventListener(
      "keydown",
      (event) => this.handleKeydown(event),
      { signal }
    );
    this.target.addEventListener(
      "keyup",
      (event) => this.handleKeyup(event),
      { signal }
    );
  }
}
//# sourceMappingURL=LongpressController.dev.js.map
