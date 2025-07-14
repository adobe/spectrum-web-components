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
  html
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import buttonStyles from "./button-base.css.js";
export class ButtonBase extends ObserveSlotText(LikeAnchor(Focusable), "", [
  "sp-overlay,sp-tooltip"
]) {
  constructor() {
    super();
    this.active = false;
    this.type = "button";
    this.proxyFocus = this.proxyFocus.bind(this);
    this.addEventListener("click", this.handleClickCapture, {
      capture: true
    });
  }
  static get styles() {
    return [buttonStyles];
  }
  get focusElement() {
    return this;
  }
  get hasLabel() {
    return this.slotHasContent;
  }
  get buttonContent() {
    const content = [
      html`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `,
      html`
                <span id="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `
    ];
    return content;
  }
  handleClickCapture(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }
    if (this.shouldProxyClick(event)) {
      return;
    }
  }
  proxyFocus() {
    this.focus();
  }
  shouldProxyClick(event) {
    let handled = false;
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
      return false;
    }
    if (this.anchorElement) {
      this.anchorElement.click();
      handled = true;
    } else if (this.type !== "button") {
      const proxy = document.createElement("button");
      proxy.type = this.type;
      this.insertAdjacentElement("afterend", proxy);
      proxy.click();
      proxy.remove();
      handled = true;
    }
    return handled;
  }
  renderAnchor() {
    return html`
            ${this.buttonContent}
            ${super.renderAnchor({
      id: "button",
      ariaHidden: true,
      className: "button anchor",
      tabindex: -1
    })}
        `;
  }
  renderButton() {
    return html`
            ${this.buttonContent}
        `;
  }
  render() {
    return this.href && this.href.length > 0 ? this.renderAnchor() : this.renderButton();
  }
  handleKeydown(event) {
    const { code } = event;
    switch (code) {
      case "Space":
        event.preventDefault();
        if (typeof this.href === "undefined") {
          this.addEventListener("keyup", this.handleKeyup);
          this.active = true;
        }
        break;
      default:
        break;
    }
  }
  handleKeypress(event) {
    const { code } = event;
    switch (code) {
      case "Enter":
      case "NumpadEnter":
        this.click();
        break;
      default:
        break;
    }
  }
  handleKeyup(event) {
    const { code } = event;
    switch (code) {
      case "Space":
        this.removeEventListener("keyup", this.handleKeyup);
        this.active = false;
        this.click();
        break;
      default:
        break;
    }
  }
  manageAnchor() {
    if (this.href && this.href.length > 0) {
      if (!this.hasAttribute("role") || this.getAttribute("role") === "button") {
        this.setAttribute("role", "link");
      }
    } else {
      if (!this.hasAttribute("role") || this.getAttribute("role") === "link") {
        this.setAttribute("role", "button");
      }
    }
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    if (changed.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
    this.manageAnchor();
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("keypress", this.handleKeypress);
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("href")) {
      this.manageAnchor();
    }
    if (this.anchorElement) {
      this.anchorElement.tabIndex = -1;
      if (!this.anchorElement.hasAttribute("aria-hidden")) {
        this.anchorElement.setAttribute("aria-hidden", "true");
      }
      this.anchorElement.addEventListener("focus", this.proxyFocus);
    }
  }
  update(changes) {
    super.update(changes);
    if (changes.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ButtonBase.prototype, "active", 2);
__decorateClass([
  property({ type: String })
], ButtonBase.prototype, "type", 2);
__decorateClass([
  query(".anchor")
], ButtonBase.prototype, "anchorElement", 2);
//# sourceMappingURL=ButtonBase.dev.js.map
