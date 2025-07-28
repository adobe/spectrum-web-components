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
  property,
  queryAssignedNodes
} from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { FieldGroup } from "@spectrum-web-components/field-group";
import { Radio } from "./Radio.dev.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
export class RadioGroup extends FocusVisiblePolyfillMixin(FieldGroup) {
  constructor() {
    super(...arguments);
    this.name = "";
    this.rovingTabindexController = new RovingTabindexController(this, {
      focusInIndex: (elements) => {
        return elements.findIndex((el) => {
          return this.selected ? !el.disabled && el.value === this.selected : !el.disabled;
        });
      },
      elementEnterAction: (el) => {
        this._setSelected(el.value);
      },
      elements: () => this.buttons,
      isFocusableElement: (el) => !el.disabled
    });
    this.selected = "";
  }
  get buttons() {
    return this.defaultNodes.filter(
      (node) => node instanceof Radio
    );
  }
  focus() {
    this.rovingTabindexController.focus();
  }
  _setSelected(value) {
    if (value === this.selected) {
      return;
    }
    const oldValue = this.selected;
    const radio = value ? this.querySelector(`sp-radio[value="${value}"]`) : void 0;
    this.selected = radio ? value : "";
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        cancelable: true,
        bubbles: true,
        composed: true
      })
    );
    if (!applyDefault) {
      this.selected = oldValue;
      return;
    }
    this.validateRadios();
  }
  willUpdate(changes) {
    if (!this.hasUpdated) {
      this.setAttribute("role", "radiogroup");
      const checkedRadio = this.querySelector(
        "sp-radio[checked]"
      );
      const checkedRadioValue = checkedRadio ? checkedRadio.value : "";
      this.selected = checkedRadioValue || this.selected;
      if (this.selected && this.selected !== checkedRadioValue) {
        const selectedRadio = this.querySelector(
          `sp-radio[value="${this.selected}"]`
        );
        if (selectedRadio) {
          selectedRadio.checked = true;
        }
      }
      this.shadowRoot.addEventListener("change", (event) => {
        event.stopPropagation();
        const target = event.target;
        this._setSelected(target.value);
      });
    }
    if (changes.has("selected")) {
      this.validateRadios();
    }
  }
  async validateRadios() {
    let validSelection = false;
    if (!this.hasUpdated) {
      await this.updateComplete;
    }
    this.buttons.map((button) => {
      button.checked = this.selected === button.value;
      validSelection = validSelection || button.checked;
    });
    if (!validSelection) {
      this.selected = "";
    }
  }
  handleSlotchange() {
    this.rovingTabindexController.clearElementCache();
  }
}
__decorateClass([
  property({ type: String })
], RadioGroup.prototype, "name", 2);
__decorateClass([
  queryAssignedNodes()
], RadioGroup.prototype, "defaultNodes", 2);
__decorateClass([
  property({ reflect: true })
], RadioGroup.prototype, "selected", 2);
//# sourceMappingURL=RadioGroup.dev.js.map
