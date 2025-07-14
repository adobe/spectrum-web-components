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
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/button/sp-close-button.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import actionBarStyles from "./action-bar.css.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
export const actionBarVariants = ["sticky", "fixed"];
export class ActionBar extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.emphasized = false;
    this.flexible = false;
    this.open = false;
    this._variant = "";
  }
  static get styles() {
    return [actionBarStyles];
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    if (actionBarVariants.includes(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
      return;
    }
    this.removeAttribute("variant");
    this._variant = "";
  }
  get variant() {
    return this._variant;
  }
  handleClick() {
    this.open = false;
    const applyDefault = this.dispatchEvent(
      new Event("close", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (!applyDefault) {
      this.open = true;
    }
  }
  render() {
    return html`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${ifDefined(
      this.emphasized ? "white" : void 0
    )}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${ifDefined(
      this.emphasized ? "white" : void 0
    )}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionBar.prototype, "emphasized", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionBar.prototype, "flexible", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionBar.prototype, "open", 2);
__decorateClass([
  property({ type: String })
], ActionBar.prototype, "variant", 1);
//# sourceMappingURL=ActionBar.dev.js.map
