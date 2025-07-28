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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ColorController } from "@spectrum-web-components/reactive-controllers/src/ColorController.js";
import { TextfieldBase } from "@spectrum-web-components/textfield";
import styles from "./color-field.css.js";
export class ColorField extends TextfieldBase {
  constructor() {
    super();
    this.viewColor = false;
    this._value = "";
    this.colorController = new ColorController(this);
  }
  static get styles() {
    return [...super.styles, styles];
  }
  set value(value) {
    if (value === this.value) {
      return;
    }
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }
  get value() {
    return this._value;
  }
  renderColorHandle() {
    return this.viewColor && this.valid ? html`
                  <sp-color-handle
                      size="m"
                      color="${this.colorController.getColor("srgb").toString()}"
                  ></sp-color-handle>
              ` : html``;
  }
  getColorValue() {
    if (!this.valid) {
      return "";
    }
    return this.colorController.getColor("srgb").toString();
  }
  render() {
    if (this.viewColor) {
      import("@spectrum-web-components/color-handle/sp-color-handle.js");
    }
    return html`
            ${super.render()} ${this.renderColorHandle()}
        `;
  }
  checkValidity() {
    let validity = super.checkValidity();
    if (this.value) {
      this.valid = validity = this.colorController.validateColorString(
        this.value
      ).isValid;
      this.invalid = !validity;
      if (this.valid) {
        this.colorController.color = this.value;
      }
    } else {
      this.valid = this.invalid = false;
    }
    return validity;
  }
}
__decorateClass([
  property({ type: Boolean, attribute: "view-color" })
], ColorField.prototype, "viewColor", 2);
//# sourceMappingURL=ColorField.dev.js.map
