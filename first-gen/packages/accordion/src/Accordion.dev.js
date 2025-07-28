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
  queryAssignedNodes
} from "@spectrum-web-components/base/src/decorators.js";
import { FocusGroupController } from "@spectrum-web-components/reactive-controllers/src/FocusGroup.js";
import styles from "./accordion.css.js";
export class Accordion extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.allowMultiple = false;
    this.focusGroupController = new FocusGroupController(this, {
      direction: "vertical",
      elements: () => this.items,
      isFocusableElement: (el) => !el.disabled
    });
  }
  static get styles() {
    return [styles];
  }
  get items() {
    return [...this.defaultNodes || []].filter(
      (node) => typeof node.tagName !== "undefined"
    );
  }
  focus() {
    this.focusGroupController.focus();
  }
  async onToggle(event) {
    const target = event.target;
    await 0;
    if (this.allowMultiple || event.defaultPrevented) {
      return;
    }
    const items = [...this.items];
    if (items && !items.length) {
      return;
    }
    items.forEach((item) => {
      if (item !== target) {
        item.open = false;
      }
    });
  }
  handleSlotchange() {
    this.focusGroupController.clearElementCache();
    this.items.forEach((item) => {
      item.size = this.size;
    });
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("size") && (!!changed.get("size") || this.size !== "m")) {
      this.items.forEach((item) => {
        item.size = this.size;
      });
    }
  }
  render() {
    return html`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "allow-multiple" })
], Accordion.prototype, "allowMultiple", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Accordion.prototype, "density", 2);
__decorateClass([
  queryAssignedNodes()
], Accordion.prototype, "defaultNodes", 2);
//# sourceMappingURL=Accordion.dev.js.map
