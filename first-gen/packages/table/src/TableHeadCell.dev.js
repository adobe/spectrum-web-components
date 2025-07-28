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
  nothing,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-arrow100.js";
import styles from "./table-head-cell.css.js";
import arrowStyles from "@spectrum-web-components/icon/src/spectrum-icon-arrow.css.js";
const ariaSortValue = (sortDirection) => {
  const values = {
    asc: "ascending",
    desc: "descending"
  };
  return values[sortDirection] || "none";
};
export class TableHeadCell extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.active = false;
    this.role = "columnheader";
    this.sortable = false;
    this.sortKey = "";
  }
  static get styles() {
    return [styles, arrowStyles];
  }
  handleKeydown(event) {
    const { code } = event;
    switch (code) {
      case "Space":
        event.preventDefault();
        this.addEventListener("keyup", this.handleKeyup);
        this.active = true;
        break;
      default:
        break;
    }
  }
  handleKeypress(event) {
    const { code } = event;
    switch (code) {
      case "Enter":
      case "NumpadEnter":
        this.click();
        break;
      default:
        break;
    }
  }
  handleKeyup(event) {
    const { code } = event;
    switch (code) {
      case "Space":
        this.active = false;
        this.removeEventListener("keyup", this.handleKeyup);
        this.click();
        break;
      default:
        break;
    }
  }
  handleClick() {
    if (!this.sortable) return;
    if (this.sortDirection) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortDirection = "asc";
    }
    this.dispatchEvent(
      new CustomEvent("sorted", {
        bubbles: true,
        detail: {
          sortDirection: this.sortDirection,
          sortKey: this.sortKey
        }
      })
    );
  }
  render() {
    const visiblySorted = this.sortable && !!this.sortDirection;
    return html`
            ${visiblySorted ? html`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  ` : nothing}
            <slot></slot>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("keypress", this.handleKeypress);
  }
  update(changes) {
    if (changes.has("sortDirection")) {
      this.setAttribute("aria-sort", ariaSortValue(this.sortDirection));
    }
    if (changes.has("sortable")) {
      this.tabIndex = this.sortable ? 0 : -1;
    }
    super.update(changes);
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], TableHeadCell.prototype, "active", 2);
__decorateClass([
  property({ reflect: true })
], TableHeadCell.prototype, "role", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TableHeadCell.prototype, "sortable", 2);
__decorateClass([
  property({ reflect: true, attribute: "sort-direction" })
], TableHeadCell.prototype, "sortDirection", 2);
__decorateClass([
  property({ attribute: "sort-key" })
], TableHeadCell.prototype, "sortKey", 2);
//# sourceMappingURL=TableHeadCell.dev.js.map
