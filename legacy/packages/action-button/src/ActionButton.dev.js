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
  SizedMixin
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ButtonBase } from "@spectrum-web-components/button";
import buttonStyles from "./action-button.css.js";
import cornerTriangleStyles from "@spectrum-web-components/icon/src/spectrum-icon-corner-triangle.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-corner-triangle300.js";
const holdAffordanceClass = {
  xs: "spectrum-UIIcon-CornerTriangle75",
  s: "spectrum-UIIcon-CornerTriangle75",
  m: "spectrum-UIIcon-CornerTriangle100",
  l: "spectrum-UIIcon-CornerTriangle200",
  xl: "spectrum-UIIcon-CornerTriangle300"
};
export const LONGPRESS_DURATION = 300;
let LONGPRESS_TIMEOUT;
export class ActionButton extends SizedMixin(ButtonBase, {
  validSizes: ["xs", "s", "m", "l", "xl"],
  noDefaultSize: true
}) {
  constructor() {
    super();
    this.emphasized = false;
    this.holdAffordance = false;
    this.quiet = false;
    this.role = "button";
    this.selected = false;
    this.toggles = false;
    this._value = "";
    this.onClick = () => {
      if (!this.toggles) {
        return;
      }
      this.selected = !this.selected;
      const applyDefault = this.dispatchEvent(
        new Event("change", {
          cancelable: true,
          bubbles: true,
          composed: true
        })
      );
      if (!applyDefault) {
        this.selected = !this.selected;
      }
    };
    this.addEventListener("click", this.onClick);
  }
  static get styles() {
    return [...super.styles, buttonStyles, cornerTriangleStyles];
  }
  get value() {
    return this._value || this.itemText;
  }
  set value(value) {
    if (value === this._value) {
      return;
    }
    this._value = value || "";
    if (this._value) {
      this.setAttribute("value", this._value);
    } else {
      this.removeAttribute("value");
    }
  }
  /**
   * @private
   */
  get itemText() {
    return (this.textContent || /* c8 ignore next */
    "").trim();
  }
  handlePointerdownHoldAffordance(event) {
    if (event.button !== 0) return;
    this.addEventListener("pointerup", this.handlePointerupHoldAffordance);
    this.addEventListener(
      "pointercancel",
      this.handlePointerupHoldAffordance
    );
    LONGPRESS_TIMEOUT = setTimeout(() => {
      this.dispatchEvent(
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
  handlePointerupHoldAffordance() {
    clearTimeout(LONGPRESS_TIMEOUT);
    this.removeEventListener(
      "pointerup",
      this.handlePointerupHoldAffordance
    );
    this.removeEventListener(
      "pointercancel",
      this.handlePointerupHoldAffordance
    );
  }
  /**
   * @private
   */
  handleKeydown(event) {
    if (!this.holdAffordance) {
      return super.handleKeydown(event);
    }
    const { code, altKey } = event;
    if (code === "Space" || altKey && code === "ArrowDown") {
      event.preventDefault();
      if (code === "ArrowDown") {
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      this.addEventListener("keyup", this.handleKeyup);
      this.active = true;
    }
  }
  handleKeyup(event) {
    if (!this.holdAffordance) {
      return super.handleKeyup(event);
    }
    const { code, altKey } = event;
    if (code === "Space" || altKey && code === "ArrowDown") {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("longpress", {
          bubbles: true,
          composed: true,
          detail: {
            source: "keyboard"
          }
        })
      );
      this.active = false;
    }
  }
  get buttonContent() {
    const buttonContent = super.buttonContent;
    if (this.holdAffordance) {
      buttonContent.unshift(html`
                <sp-icon-corner-triangle300
                    class="hold-affordance ${holdAffordanceClass[this.size]}"
                ></sp-icon-corner-triangle300>
            `);
    }
    return buttonContent;
  }
  updated(changes) {
    super.updated(changes);
    const isButton = this.role === "button";
    const canBePressed = isButton && (this.selected || this.toggles) && !(this.hasAttribute("aria-haspopup") && this.hasAttribute("aria-expanded"));
    if (changes.has("selected") || changes.has("role")) {
      if (canBePressed) {
        this.setAttribute(
          "aria-pressed",
          this.selected ? "true" : "false"
        );
      } else {
        this.removeAttribute("aria-pressed");
        if (isButton && this.toggles && this.hasAttribute("aria-expanded")) {
          this.setAttribute(
            "aria-expanded",
            this.selected ? "true" : "false"
          );
        }
      }
    }
    if (changes.has("holdAffordance")) {
      if (this.holdAffordance) {
        this.addEventListener(
          "pointerdown",
          this.handlePointerdownHoldAffordance
        );
      } else {
        this.removeEventListener(
          "pointerdown",
          this.handlePointerdownHoldAffordance
        );
        this.handlePointerupHoldAffordance();
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionButton.prototype, "emphasized", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "hold-affordance" })
], ActionButton.prototype, "holdAffordance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionButton.prototype, "quiet", 2);
__decorateClass([
  property({ reflect: true })
], ActionButton.prototype, "role", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionButton.prototype, "selected", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionButton.prototype, "toggles", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ActionButton.prototype, "staticColor", 2);
__decorateClass([
  property({ type: String })
], ActionButton.prototype, "value", 1);
//# sourceMappingURL=ActionButton.dev.js.map
