"use strict";
import { conditionAttributeWithId } from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import { isWebKit } from "@spectrum-web-components/shared";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { noop } from "./AbstractOverlay.dev.js";
import {
  InteractionController,
  InteractionTypes,
  lastInteractionType
} from "./InteractionController.dev.js";
const HOVER_DELAY = 300;
export class HoverController extends InteractionController {
  constructor() {
    super(...arguments);
    this.type = InteractionTypes.hover;
    this.elementIds = [];
    this.focusedin = false;
    this.pointerentered = false;
  }
  handleKeyup(event) {
    if (event.code === "Tab" || event.code === "Escape") {
      this.open = true;
    }
  }
  handleTargetFocusin() {
    if (!this.target.matches(":focus-visible")) {
      return;
    }
    if (isWebKit() && this.target[lastInteractionType] === InteractionTypes.click) {
      return;
    }
    this.open = true;
    this.focusedin = true;
  }
  handleTargetFocusout() {
    this.focusedin = false;
    if (this.pointerentered) return;
    this.open = false;
  }
  handleTargetPointerenter() {
    var _a;
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = void 0;
    }
    if ((_a = this.overlay) == null ? void 0 : _a.disabled) return;
    this.open = true;
    this.pointerentered = true;
  }
  handleTargetPointerleave() {
    this.doPointerleave();
  }
  // set a timeout once the pointer enters and the overlay is shown
  // give the user time to enter the overlay
  handleHostPointerenter() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = void 0;
    }
  }
  handleHostPointerleave() {
    this.doPointerleave();
  }
  prepareDescription() {
    if (!this.overlay.elements.length) return;
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
    const elementIds = [];
    const appliedIds = this.overlay.elements.map((el) => {
      elementIds.push(el.id);
      if (!el.id) {
        el.id = `${this.overlay.tagName.toLowerCase()}-helper-${randomID()}`;
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
      this.overlay.elements.map((el, index) => {
        el.id = this.elementIds[index];
      });
      this.releaseDescription = noop;
    };
  }
  doPointerleave() {
    this.pointerentered = false;
    const triggerElement = this.target;
    if (this.focusedin && triggerElement.matches(":focus-visible")) return;
    this.hoverTimeout = setTimeout(() => {
      this.open = false;
    }, HOVER_DELAY);
  }
  init() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.target.addEventListener(
      "keyup",
      (event) => this.handleKeyup(event),
      { signal }
    );
    this.target.addEventListener(
      "focusin",
      () => this.handleTargetFocusin(),
      { signal }
    );
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
    if (!this.abortController) {
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
  }
}
//# sourceMappingURL=HoverController.dev.js.map
