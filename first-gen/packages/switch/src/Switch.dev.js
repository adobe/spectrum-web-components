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
import { CheckboxBase } from "@spectrum-web-components/checkbox/src/CheckboxBase.js";
import switchStyles from "./switch.css.js";
import legacyStyles from "./switch-legacy.css.js";
export class Switch extends SizedMixin(CheckboxBase) {
  constructor() {
    super(...arguments);
    this.emphasized = false;
  }
  static get styles() {
    if (window.hasOwnProperty("ShadyDOM")) {
      return [switchStyles, legacyStyles];
    }
    return [switchStyles];
  }
  render() {
    return html`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.inputElement.setAttribute("role", "switch");
  }
  updated(changes) {
    if (changes.has("checked")) {
      this.inputElement.setAttribute(
        "aria-checked",
        this.checked ? "true" : "false"
      );
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Switch.prototype, "emphasized", 2);
//# sourceMappingURL=Switch.dev.js.map
