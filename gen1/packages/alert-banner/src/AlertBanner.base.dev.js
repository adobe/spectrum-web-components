"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import {
  ALERT_BANNER_VALID_VARIANTS
} from "./AlertBanner.types.dev.js";
export class AlertBannerBase extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.open = false;
    this.dismissible = false;
    this._variant = "";
  }
  static get styles() {
    return [];
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    const oldValue = this.variant;
    if (this.isValidVariant(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
    } else {
      this.removeAttribute("variant");
      this._variant = "";
      if (true) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          "https://opensource.adobe.com/spectrum-web-components/components/alert-banner/#variants",
          {
            issues: [...ALERT_BANNER_VALID_VARIANTS]
          }
        );
      }
    }
    this.requestUpdate("variant", oldValue);
  }
  get variant() {
    return this._variant;
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  isValidVariant(variant) {
    return ALERT_BANNER_VALID_VARIANTS.includes(variant);
  }
  shouldClose() {
    const applyDefault = this.dispatchEvent(
      new CustomEvent("close", {
        composed: true,
        bubbles: true,
        cancelable: true
      })
    );
    if (applyDefault) {
      this.close();
    }
  }
  close() {
    this.open = false;
  }
  handleKeydown(event) {
    if (event.code === "Escape" && this.dismissible) {
      this.shouldClose();
    }
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("open")) {
      if (this.open) {
        this.addEventListener("keydown", this.handleKeydown);
      } else {
        this.removeEventListener("keydown", this.handleKeydown);
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], AlertBannerBase.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], AlertBannerBase.prototype, "dismissible", 2);
__decorateClass([
  property({ type: String })
], AlertBannerBase.prototype, "variant", 1);
//# sourceMappingURL=AlertBanner.base.dev.js.map
