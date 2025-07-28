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
import { ButtonBase } from "./ButtonBase.dev.js";
import buttonStyles from "./button.css.js";
import { PendingStateController } from "@spectrum-web-components/reactive-controllers/src/PendingState.js";
export const VALID_VARIANTS = [
  "accent",
  "primary",
  "secondary",
  "negative",
  "white",
  "black"
];
export const VALID_STATIC_COLORS = ["white", "black"];
export class Button extends SizedMixin(ButtonBase, { noDefaultSize: true }) {
  /**
   * Initializes the `PendingStateController` for the Button component.
   * The `PendingStateController` manages the pending state of the Button.
   */
  constructor() {
    super();
    this.pendingLabel = "Pending";
    this.pending = false;
    this._variant = "accent";
    this.treatment = "fill";
    this.noWrap = false;
    this.pendingStateController = new PendingStateController(this);
  }
  static get styles() {
    return [...super.styles, buttonStyles];
  }
  click() {
    if (this.pending) {
      return;
    }
    super.click();
  }
  get variant() {
    return this._variant;
  }
  set variant(variant) {
    if (variant === this.variant) return;
    this.requestUpdate("variant", this.variant);
    switch (variant) {
      case "cta":
        this._variant = "accent";
        if (true) {
          window.__swc.warn(
            this,
            `The "cta" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "variant='accent'" instead.`,
            "https://opensource.adobe.com/spectrum-web-components/components/button/#variants",
            { level: "deprecation" }
          );
        }
        break;
      case "overBackground":
        this.removeAttribute("variant");
        this.staticColor = "white";
        this.treatment = "outline";
        if (true) {
          window.__swc.warn(
            this,
            `The "overBackground" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "staticColor='white'" with "treatment='outline'" instead.`,
            "https://opensource.adobe.com/spectrum-web-components/components/button",
            { level: "deprecation" }
          );
        }
        return;
      case "white":
        this.staticColor = "white";
        if (true) {
          window.__swc.warn(
            this,
            `The "white" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
            "https://opensource.adobe.com/spectrum-web-components/components/button/api",
            { level: "deprecation" }
          );
        }
        return;
      case "black":
        this.staticColor = "black";
        if (true) {
          window.__swc.warn(
            this,
            `The "black" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='black'" instead.`,
            "https://opensource.adobe.com/spectrum-web-components/components/button/api",
            { level: "deprecation" }
          );
        }
        return;
      case null:
        return;
      default:
        if (!VALID_VARIANTS.includes(variant)) {
          this._variant = "accent";
        } else {
          this._variant = variant;
        }
        break;
    }
    this.setAttribute("variant", this.variant);
  }
  set quiet(quiet) {
    this.treatment = quiet ? "outline" : "fill";
  }
  get quiet() {
    return this.treatment === "outline";
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", this.variant);
    }
    if (this.pending) {
      this.pendingStateController.hostUpdated();
    }
  }
  renderButton() {
    return html`
            ${this.buttonContent}
            ${this.pendingStateController.renderPendingState()}
        `;
  }
}
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], Button.prototype, "pendingLabel", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: true })
], Button.prototype, "pending", 2);
__decorateClass([
  property()
], Button.prototype, "variant", 1);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], Button.prototype, "staticColor", 2);
__decorateClass([
  property({ reflect: true })
], Button.prototype, "treatment", 2);
__decorateClass([
  property({ type: Boolean })
], Button.prototype, "quiet", 1);
__decorateClass([
  property({ type: Boolean, attribute: "no-wrap", reflect: true })
], Button.prototype, "noWrap", 2);
//# sourceMappingURL=Button.dev.js.map
