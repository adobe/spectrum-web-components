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
import {
  property,
  queryAssignedElements
} from "@spectrum-web-components/base/src/decorators.js";
import styles from "./table-row.css.js";
export class TableRow extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.role = "row";
    this.selectable = false;
    this.selected = false;
    this.value = "";
  }
  static get styles() {
    return [styles];
  }
  async handleChange(event) {
    if (!event.target.checkbox) {
      return;
    }
    this.selected = event.target.checkbox.checked;
    await 0;
    if (event.defaultPrevented) {
      this.selected = !this.selected;
    }
  }
  handleSlotchange({
    target
  }) {
    const assignedElements = target.assignedElements();
    this.selectable = !!assignedElements.find(
      (el) => el.localName === "sp-table-checkbox-cell"
    );
  }
  async manageSelected() {
    await this.updateComplete;
    if (this.selectable) {
      this.setAttribute(
        "aria-selected",
        this.selected ? "true" : "false"
      );
    } else {
      this.removeAttribute("aria-selected");
    }
    const [checkboxCell] = this.checkboxCells;
    if (!checkboxCell) return;
    checkboxCell.checked = this.selected;
  }
  handleClick(event) {
    if (event.composedPath().find(
      (node) => node.localName === "sp-table-checkbox-cell"
    )) {
      return;
    }
    const [checkboxCell] = this.checkboxCells;
    if (!checkboxCell) return;
    checkboxCell.click();
  }
  render() {
    return html`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `;
  }
  willUpdate(changed) {
    if (changed.has("selected")) {
      this.manageSelected();
    }
    if (changed.has("selectable")) {
      if (this.selectable) {
        this.addEventListener("click", this.handleClick);
      } else {
        this.removeEventListener("click", this.handleClick);
      }
    }
  }
}
__decorateClass([
  queryAssignedElements({
    selector: "sp-table-checkbox-cell",
    flatten: true
  })
], TableRow.prototype, "checkboxCells", 2);
__decorateClass([
  property({ reflect: true })
], TableRow.prototype, "role", 2);
__decorateClass([
  property({ type: Boolean })
], TableRow.prototype, "selectable", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TableRow.prototype, "selected", 2);
__decorateClass([
  property({ type: String })
], TableRow.prototype, "value", 2);
//# sourceMappingURL=TableRow.dev.js.map
