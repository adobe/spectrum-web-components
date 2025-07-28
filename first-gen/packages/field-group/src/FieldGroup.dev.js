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
import { ManageHelpText } from "@spectrum-web-components/help-text/src/manage-help-text.js";
import styles from "./field-group.css.js";
export class FieldGroup extends ManageHelpText(SpectrumElement, {
  mode: "external"
}) {
  constructor() {
    super(...arguments);
    this.horizontal = false;
    this.invalid = false;
    this.label = "";
    this.vertical = false;
  }
  static get styles() {
    return [styles];
  }
  handleSlotchange() {
    return;
  }
  render() {
    return html`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "group");
    }
  }
  updated(changes) {
    super.updated(changes);
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
], FieldGroup.prototype, "horizontal", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], FieldGroup.prototype, "invalid", 2);
__decorateClass([
  property()
], FieldGroup.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], FieldGroup.prototype, "vertical", 2);
//# sourceMappingURL=FieldGroup.dev.js.map
