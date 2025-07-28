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
  html,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/button/sp-close-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";
import styles from "./alert-banner.css.js";
const VALID_VARIANTS = ["neutral", "info", "negative"];
export class AlertBanner extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.open = false;
    this.dismissible = false;
    this._variant = "";
  }
  static get styles() {
    return [styles];
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
            issues: [...VALID_VARIANTS]
          }
        );
      }
    }
    this.requestUpdate("variant", oldValue);
  }
  get variant() {
    return this._variant;
  }
  isValidVariant(variant) {
    return VALID_VARIANTS.includes(variant);
  }
  renderIcon(variant) {
    switch (variant) {
      case "info":
        return html`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;
      case "negative":
        return html`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;
      default:
        return html``;
    }
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
  render() {
    return html`
            <div class="body" role="alert">
                <div class="content">
                    ${this.renderIcon(this.variant)}
                    <div class="text"><slot></slot></div>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="end">
                ${this.dismissible ? html`
                          <sp-close-button
                              @click=${this.shouldClose}
                              label="Close"
                              static-color="white"
                          ></sp-close-button>
                      ` : html``}
            </div>
        `;
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
], AlertBanner.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], AlertBanner.prototype, "dismissible", 2);
__decorateClass([
  property({ type: String })
], AlertBanner.prototype, "variant", 1);
//# sourceMappingURL=AlertBanner.dev.js.map
