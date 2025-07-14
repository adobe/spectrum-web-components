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
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export function CheckboxMixin(constructor) {
  class MixedElement extends constructor {
    constructor() {
      super(...arguments);
      this.checked = false;
      this.readonly = false;
    }
    handleChange() {
      if (this.readonly) {
        this.inputElement.checked = this.checked;
        return;
      }
      this.checked = this.inputElement.checked;
      const changeEvent = new CustomEvent("change", {
        bubbles: true,
        cancelable: true,
        composed: true
      });
      const applyDefault = this.dispatchEvent(changeEvent);
      if (!applyDefault) {
        this.checked = !this.inputElement.checked;
        this.inputElement.checked = this.checked;
      }
    }
    render() {
      return html`
                <input
                    id="input"
                    name=${ifDefined(this.name || void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `;
    }
  }
  __decorateClass([
    property({ type: Boolean, reflect: true })
  ], MixedElement.prototype, "checked", 2);
  __decorateClass([
    property({ type: String, reflect: true })
  ], MixedElement.prototype, "name", 2);
  __decorateClass([
    property({ type: Boolean, reflect: true })
  ], MixedElement.prototype, "readonly", 2);
  __decorateClass([
    query("#input")
  ], MixedElement.prototype, "inputElement", 2);
  return MixedElement;
}
//# sourceMappingURL=CheckboxMixin.dev.js.map
