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
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import radioStyles from "./radio.css.js";
export class Radio extends SizedMixin(
  FocusVisiblePolyfillMixin(SpectrumElement),
  { noDefaultSize: true }
) {
  constructor() {
    super(...arguments);
    this.autofocus = false;
    this.value = "";
    this.checked = false;
    this.disabled = false;
    this.emphasized = false;
    this.invalid = false;
    this.readonly = false;
  }
  static get styles() {
    return [radioStyles];
  }
  click() {
    if (this.disabled) {
      return;
    }
    this.activate();
  }
  manageAutoFocus() {
    if (this.autofocus) {
      this.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "Tab"
        })
      );
      this.focus();
    }
  }
  activate() {
    if (this.checked) {
      return;
    }
    this.checked = true;
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true
      })
    );
  }
  handleKeyup(event) {
    if (event.code === "Space") {
      this.activate();
    }
  }
  render() {
    return html`
            <div id="input"></div>
            <span id="button"></span>
            <span id="label" role="presentation"><slot></slot></span>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.setAttribute("role", "radio");
    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }
    this.manageAutoFocus();
    this.addEventListener("click", this.activate);
    this.addEventListener("keyup", this.handleKeyup);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("invalid")) {
      if (this.invalid) {
        this.setAttribute("aria-invalid", "true");
      } else {
        this.removeAttribute("aria-invalid");
      }
    }
    if (changes.has("checked")) {
      if (this.checked) {
        this.setAttribute("aria-checked", "true");
      } else {
        this.setAttribute("aria-checked", "false");
      }
    }
    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean })
], Radio.prototype, "autofocus", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Radio.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Radio.prototype, "checked", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Radio.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Radio.prototype, "emphasized", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Radio.prototype, "invalid", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Radio.prototype, "readonly", 2);
//# sourceMappingURL=Radio.dev.js.map
