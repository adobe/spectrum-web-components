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
import styles from "./table-head.css.js";
export class TableHead extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.role = "row";
  }
  static get styles() {
    return [styles];
  }
  handleSorted({ target }) {
    const childCells = [...this.children];
    childCells.forEach((cell) => {
      if (cell !== target) {
        cell.sortDirection = void 0;
      }
    });
  }
  handleChange({
    target: checkboxCell
  }) {
    this.selected = checkboxCell.checkbox.checked || checkboxCell.checkbox.indeterminate;
  }
  render() {
    return html`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `;
  }
}
__decorateClass([
  property({ reflect: true })
], TableHead.prototype, "role", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TableHead.prototype, "selected", 2);
//# sourceMappingURL=TableHead.dev.js.map
