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
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import toastStyles from "./toast.css.js";
export const toastVariants = [
  "negative",
  "positive",
  "info",
  "error",
  "warning"
];
export class Toast extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.open = false;
    this._timeout = null;
    this._variant = "";
    this.countdownStart = 0;
    this.nextCount = -1;
    this.doCountdown = (time) => {
      if (!this.countdownStart) {
        this.countdownStart = performance.now();
      }
      if (time - this.countdownStart > this._timeout) {
        this.shouldClose();
        this.countdownStart = 0;
      } else {
        this.countdown();
      }
    };
    this.countdown = () => {
      cancelAnimationFrame(this.nextCount);
      this.nextCount = requestAnimationFrame(this.doCountdown);
    };
    this.holdCountdown = () => {
      this.stopCountdown();
      this.addEventListener("focusout", this.resumeCountdown);
    };
    this.resumeCountdown = () => {
      this.removeEventListener("focusout", this.holdCountdown);
      this.countdown();
    };
  }
  static get styles() {
    return [toastStyles];
  }
  set timeout(timeout) {
    const hasTimeout = typeof timeout !== null && timeout > 0;
    const newTimeout = hasTimeout ? Math.max(6e3, timeout) : null;
    const oldValue = this.timeout;
    if (newTimeout && this.countdownStart) {
      this.countdownStart = performance.now();
    }
    this._timeout = newTimeout;
    this.requestUpdate("timeout", oldValue);
  }
  get timeout() {
    return this._timeout;
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    const oldValue = this.variant;
    if (toastVariants.includes(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
    } else {
      this.removeAttribute("variant");
      this._variant = "";
    }
    this.requestUpdate("variant", oldValue);
  }
  get variant() {
    return this._variant;
  }
  //TODO(#4931): Address the deprecated variants or remove the flags
  renderIcon(variant, iconLabel) {
    switch (variant) {
      case "info":
        return html`
                    <sp-icon-info
                        label=${iconLabel || "Information"}
                        class="type"
                    ></sp-icon-info>
                `;
      case "negative":
      case "error":
        return html`
                    <sp-icon-alert
                        label=${iconLabel || "Error"}
                        class="type"
                    ></sp-icon-alert>
                `;
      case "warning":
        return html`
                    <sp-icon-alert
                        label=${iconLabel || "Warning"}
                        class="type"
                    ></sp-icon-alert>
                `;
      case "positive":
        return html`
                    <sp-icon-checkmark-circle
                        label=${iconLabel || "Success"}
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;
      default:
        return html``;
    }
  }
  startCountdown() {
    this.countdown();
    this.addEventListener("focusin", this.holdCountdown);
  }
  stopCountdown() {
    cancelAnimationFrame(this.nextCount);
    this.countdownStart = 0;
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
  render() {
    return html`
            ${this.renderIcon(this.variant, this.iconLabel)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    static-color="white"
                ></sp-close-button>
            </div>
        `;
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("open")) {
      if (this.open) {
        if (this.timeout) {
          this.startCountdown();
        }
      } else {
        if (this.timeout) {
          this.stopCountdown();
        }
      }
    }
    if (changes.has("timeout")) {
      if (this.timeout !== null && this.open) {
        this.startCountdown();
      } else {
        this.stopCountdown();
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Toast.prototype, "open", 2);
__decorateClass([
  property({ type: Number })
], Toast.prototype, "timeout", 1);
__decorateClass([
  property({ type: String })
], Toast.prototype, "variant", 1);
__decorateClass([
  property({ type: String, attribute: "icon-label" })
], Toast.prototype, "iconLabel", 2);
//# sourceMappingURL=Toast.dev.js.map
