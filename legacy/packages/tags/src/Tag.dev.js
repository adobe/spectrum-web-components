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
  nothing,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/button/sp-clear-button.js";
import styles from "./tag.css.js";
export class Tag extends SizedMixin(SpectrumElement, {
  validSizes: ["s", "m", "l"],
  noDefaultSize: true
}) {
  constructor() {
    super();
    this.deletable = false;
    this.disabled = false;
    this.readonly = false;
    this.handleFocusin = () => {
      this.addEventListener("focusout", this.handleFocusout);
      this.addEventListener("keydown", this.handleKeydown);
    };
    this.handleFocusout = () => {
      this.removeEventListener("keydown", this.handleKeydown);
      this.removeEventListener("focusout", this.handleFocusout);
    };
    this.handleKeydown = (event) => {
      if (!this.deletable || this.disabled) {
        return;
      }
      const { code } = event;
      switch (code) {
        case "Backspace":
        case "Space":
        case "Delete":
          this.delete();
        default:
          return;
      }
    };
    this.addEventListener("focusin", this.handleFocusin);
  }
  static get styles() {
    return [styles];
  }
  delete() {
    if (this.readonly) {
      return;
    }
    const applyDefault = this.dispatchEvent(
      new Event("delete", {
        bubbles: true,
        cancelable: true,
        composed: true
      })
    );
    if (!applyDefault) {
      return;
    }
    this.remove();
  }
  render() {
    return html`
            <slot name="avatar"></slot>
            <slot name="icon"></slot>
            <span class="label"><slot></slot></span>
            ${this.deletable ? html`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  ` : nothing}
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
    if (this.deletable) {
      this.setAttribute("tabindex", "0");
    }
  }
  updated(changes) {
    super.updated(changes);
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
  property({ type: Boolean, reflect: true })
], Tag.prototype, "deletable", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tag.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tag.prototype, "readonly", 2);
//# sourceMappingURL=Tag.dev.js.map
