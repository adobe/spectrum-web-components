"use strict";
import { conditionAttributeWithId } from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { noop } from "./AbstractOverlay.dev.js";
import {
  InteractionController,
  InteractionTypes,
  lastInteractionType
} from "./InteractionController.dev.js";
export class HoverController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.hover;
    this.elementIds = [];
    this.targetFocused = false;
    this.hovering = false;
    this.overlayFocused = false;
  }
  handleKeyup(event) {
    if (event.code === "Tab") {
      this.open = true;
    } else if (event.code === "Escape") {
      if (this.open) {
        event.preventDefault();
        event.stopPropagation();
        this.open = false;
        if (this.target) {
          this.target.focus();
        }
      }
    }
  }
  handleTargetFocusin() {
    if (!this.target.matches(":focus-visible")) {
      return;
    }
    if (this.target[lastInteractionType] === InteractionTypes.click) {
      return;
    }
    this.open = true;
    this.targetFocused = true;
  }
  handleTargetFocusout() {
    this.targetFocused = false;
    if (this.hovering) {
      return;
    }
    this.doFocusleave();
  }
  clearCloseTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = void 0;
    }
  }
  handleTargetPointerenter() {
    var _a;
    this.clearCloseTimeout();
    if ((_a = this.overlay) == null ? void 0 : _a.disabled) {
      return;
    }
    this.open = true;
    this.hovering = true;
  }
  handleTargetPointerleave() {
    this.doPointerleave();
  }
  // set a timeout once the pointer enters and the overlay is shown
  // give the user time to enter the overlay
  handleHostPointerenter() {
    this.clearCloseTimeout();
  }
  handleHostPointerleave() {
    this.doPointerleave();
  }
  handleOverlayFocusin() {
    this.overlayFocused = true;
    this.clearCloseTimeout();
  }
  handleOverlayFocusout() {
    this.overlayFocused = false;
    if (this.hovering) {
      return;
    }
    if (this.targetFocused && this.target.matches(":focus-visible")) {
      return;
    }
    this.doFocusleave();
  }
  prepareDescription() {
    if (!this.overlay || !this.overlay.elements.length) {
      return;
    }
    const overlay = this.overlay;
    if (overlay.describeTrigger === "none") {
      return;
    }
    const triggerRoot = this.target.getRootNode();
    const contentRoot = this.overlay.elements[0].getRootNode();
    const overlayRoot = this.overlay.getRootNode();
    if (triggerRoot === overlayRoot) {
      this.prepareOverlayRelativeDescription();
    } else if (triggerRoot === contentRoot) {
      this.prepareContentRelativeDescription();
    }
  }
  prepareOverlayRelativeDescription() {
    if (!this.overlay) {
      return;
    }
    const releaseDescription = conditionAttributeWithId(
      this.target,
      "aria-describedby",
      [this.overlay.id]
    );
    this.releaseDescription = () => {
      releaseDescription();
      this.releaseDescription = noop;
    };
  }
  prepareContentRelativeDescription() {
    if (!this.overlay) {
      return;
    }
    const overlay = this.overlay;
    const elementIds = [];
    const appliedIds = overlay.elements.map((el) => {
      elementIds.push(el.id);
      if (!el.id) {
        el.id = `${overlay.tagName.toLowerCase()}-helper-${randomID()}`;
      }
      return el.id;
    });
    this.elementIds = elementIds;
    const releaseDescription = conditionAttributeWithId(
      this.target,
      "aria-describedby",
      appliedIds
    );
    this.releaseDescription = () => {
      releaseDescription();
      overlay.elements.map((el, index) => {
        el.id = this.elementIds[index];
      });
      this.releaseDescription = noop;
    };
  }
  scheduleClose() {
    this.hoverTimeout = setTimeout(() => {
      this.open = false;
    }, 300);
  }
  doPointerleave() {
    this.hovering = false;
    const triggerElement = this.target;
    if (this.targetFocused && triggerElement.matches(":focus-visible")) {
      return;
    }
    if (this.overlayFocused) {
      return;
    }
    this.scheduleClose();
  }
  doFocusleave() {
    this.clearCloseTimeout();
    if (!this.targetFocused && !this.overlayFocused && !this.hovering) {
      this.scheduleClose();
    }
  }
  init() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.target.addEventListener("keyup", (event) => this.handleKeyup(event), {
      signal
    });
    this.target.addEventListener("focusin", () => this.handleTargetFocusin(), {
      signal
    });
    this.target.addEventListener(
      "focusout",
      () => this.handleTargetFocusout(),
      { signal }
    );
    this.target.addEventListener(
      "pointerenter",
      () => this.handleTargetPointerenter(),
      { signal }
    );
    this.target.addEventListener(
      "pointerleave",
      () => this.handleTargetPointerleave(),
      { signal }
    );
    if (this.overlay) {
      this.initOverlay();
    }
  }
  initOverlay() {
    if (!this.abortController || !this.overlay) {
      return;
    }
    const { signal } = this.abortController;
    this.overlay.addEventListener(
      "pointerenter",
      () => this.handleHostPointerenter(),
      { signal }
    );
    this.overlay.addEventListener(
      "pointerleave",
      () => this.handleHostPointerleave(),
      { signal }
    );
    this.overlay.addEventListener(
      "focusin",
      () => this.handleOverlayFocusin(),
      { signal }
    );
    this.overlay.addEventListener(
      "focusout",
      () => this.handleOverlayFocusout(),
      { signal }
    );
    this.overlay.addEventListener("keyup", (event) => this.handleKeyup(event), {
      signal
    });
  }
}
//# sourceMappingURL=HoverController.dev.js.map
