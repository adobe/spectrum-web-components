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
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import styles from "./table-checkbox-cell.css.js";
export class TableCheckboxCell extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.headCell = false;
    this.role = "gridcell";
    this.indeterminate = false;
    this.checked = false;
    this.disabled = false;
    this.selectsSingle = false;
    this.emphasized = false;
    this.label = "";
  }
  static get styles() {
    return [styles];
  }
  click() {
    this.checkbox.click();
  }
  /**
   * Updates the aria-label on the checkbox's internal input element.
   */
  updateInputAriaLabel() {
    var _a;
    if (((_a = this.checkbox) == null ? void 0 : _a.inputElement) && this.label) {
      this.checkbox.inputElement.setAttribute("aria-label", this.label);
    }
  }
  async updated(changed) {
    var _a;
    super.updated(changed);
    if (changed.has("label")) {
      await ((_a = this.checkbox) == null ? void 0 : _a.updateComplete);
      this.updateInputAriaLabel();
    }
  }
  async firstUpdated(changed) {
    var _a;
    super.firstUpdated(changed);
    await ((_a = this.checkbox) == null ? void 0 : _a.updateComplete);
    this.updateInputAriaLabel();
  }
  render() {
    return html`
      <sp-checkbox
        ?checked=${this.checked}
        ?indeterminate=${this.indeterminate}
        ?disabled=${this.disabled}
        ?emphasized=${this.emphasized}
        aria-hidden=${ifDefined(this.selectsSingle ? true : void 0)}
        class="checkbox"
      ></sp-checkbox>
    `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "head-cell" })
], TableCheckboxCell.prototype, "headCell", 2);
__decorateClass([
  property({ reflect: true })
], TableCheckboxCell.prototype, "role", 2);
__decorateClass([
  query(".checkbox")
], TableCheckboxCell.prototype, "checkbox", 2);
__decorateClass([
  property({ type: Boolean })
], TableCheckboxCell.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: Boolean })
], TableCheckboxCell.prototype, "checked", 2);
__decorateClass([
  property({ type: Boolean })
], TableCheckboxCell.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "selects-single" })
], TableCheckboxCell.prototype, "selectsSingle", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TableCheckboxCell.prototype, "emphasized", 2);
__decorateClass([
  property({ type: String })
], TableCheckboxCell.prototype, "label", 2);
//# sourceMappingURL=TableCheckboxCell.dev.js.map
