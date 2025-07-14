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
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import styles from "./button-group.css.js";
export class ButtonGroup extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  static get styles() {
    return [styles];
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("size")) {
      this.manageChildrenSize(this.slotElement);
    }
  }
  handleSlotchange({
    target: slot
  }) {
    this.manageChildrenSize(slot);
  }
  manageChildrenSize(slot) {
    const assignedElements = slot.assignedElements();
    assignedElements.forEach((button) => {
      button.size = this.size;
    });
  }
  render() {
    return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ButtonGroup.prototype, "vertical", 2);
__decorateClass([
  query("slot")
], ButtonGroup.prototype, "slotElement", 2);
//# sourceMappingURL=ButtonGroup.dev.js.map
