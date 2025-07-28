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
  render,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import "@spectrum-web-components/table/sp-table-body.js";
import "@spectrum-web-components/table/sp-table-row.js";
import "@spectrum-web-components/table/sp-table-checkbox-cell.js";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import styles from "./table.css.js";
import {
  virtualize,
  virtualizerRef
} from "@lit-labs/virtualizer/virtualize.js";
import {
  RangeChangedEvent,
  VisibilityChangedEvent
} from "@lit-labs/virtualizer/events.js";
export var RowType = /* @__PURE__ */ ((RowType2) => {
  RowType2[RowType2["ITEM"] = 0] = "ITEM";
  RowType2[RowType2["INFORMATION"] = 1] = "INFORMATION";
  return RowType2;
})(RowType || {});
export class Table extends SizedMixin(SpectrumElement, {
  validSizes: ["s", "m", "l", "xl"],
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this._renderItem = /* c8 ignore next */
    () => html``;
    this.role = "grid";
    this.selected = [];
    this.selectedSet = /* @__PURE__ */ new Set();
    this.items = [];
    this.itemValue = (_item, index) => {
      return `${index}`;
    };
    this.scroller = false;
    this.emphasized = false;
    this.quiet = false;
  }
  static get styles() {
    return [styles];
  }
  get renderItem() {
    return this._renderItem;
  }
  set renderItem(fn) {
    this._renderItem = (item, index) => {
      const value = this.itemValue(item, index);
      const selected = this.selected.includes(value);
      const hasCheckbox = this.selects && (item == null ? void 0 : item._$rowType$) !== 1;
      return html`
                <sp-table-row
                    value=${value}
                    aria-rowindex=${index + 1}
                    ?selected=${selected}
                >
                    ${hasCheckbox ? html`
                              <sp-table-checkbox-cell
                                  ?checked=${selected}
                              ></sp-table-checkbox-cell>
                          ` : nothing}
                    ${fn(item, index)}
                </sp-table-row>
            `;
    };
  }
  get tableHead() {
    return this.querySelector("sp-table-head");
  }
  get tableRows() {
    if (this.isVirtualized) {
      return [];
    }
    return [...this.querySelectorAll("sp-table-row")];
  }
  get isVirtualized() {
    return !!this.items.length;
  }
  focus() {
    const sortableHeadCell = this.querySelector(
      "sp-table-head-cell[sortable]"
    );
    if (sortableHeadCell) {
      sortableHeadCell.focus();
    }
  }
  selectAllRows() {
    if (this.isVirtualized) {
      this.items.forEach((item, index) => {
        if (item._$rowType$ !== 1) {
          this.selectedSet.add(this.itemValue(item, index));
        }
      });
    } else {
      this.tableRows.forEach((row) => {
        row.selected = true;
        this.selectedSet.add(row.value);
      });
    }
    this.selected = [...this.selectedSet];
    if (!this.tableHeadCheckboxCell) return;
    this.tableHeadCheckboxCell.checked = true;
    this.tableHeadCheckboxCell.indeterminate = false;
  }
  deselectAllRows() {
    this.selectedSet.clear();
    this.selected = [];
    if (!this.isVirtualized) {
      const selectedRows = [
        ...this.querySelectorAll("[selected]")
      ];
      selectedRows.forEach((row) => {
        row.selected = false;
      });
    }
    if (!this.tableHeadCheckboxCell) return;
    this.tableHeadCheckboxCell.checked = false;
    this.tableHeadCheckboxCell.indeterminate = false;
  }
  manageSelects() {
    var _a;
    const checkboxes = this.querySelectorAll("sp-table-checkbox-cell");
    const checkbox = document.createElement("sp-table-checkbox-cell");
    if (!!this.selects) {
      let allSelected = false;
      if (this.isVirtualized) {
        allSelected = this.selected.length > 0 && this.selected.length === this.items.length;
      } else {
        this.tableRows.forEach((row) => {
          row.selected = this.selectedSet.has(row.value);
          if (!row.querySelector(":scope > sp-table-checkbox-cell")) {
            const clonedCheckbox = checkbox.cloneNode();
            checkbox.emphasized = this.emphasized;
            row.insertAdjacentElement("afterbegin", clonedCheckbox);
            checkbox.checked = row.selected;
          }
        });
        allSelected = this.selected.length === this.tableRows.length;
      }
      if (!this.tableHeadCheckboxCell) {
        this.tableHeadCheckboxCell = document.createElement(
          "sp-table-checkbox-cell"
        );
        this.tableHeadCheckboxCell.headCell = true;
        this.tableHeadCheckboxCell.emphasized = this.emphasized;
        (_a = this.tableHead) == null ? void 0 : _a.insertAdjacentElement(
          "afterbegin",
          this.tableHeadCheckboxCell
        );
      }
      this.manageHeadCheckbox(allSelected);
    } else {
      checkboxes.forEach((box) => {
        box.remove();
      });
      delete this.tableHeadCheckboxCell;
    }
  }
  validateSelected() {
    const rowValues = /* @__PURE__ */ new Set();
    if (this.isVirtualized) {
      this.items.forEach((item, index) => {
        const value = this.itemValue(item, index);
        rowValues.add(value);
      });
    } else {
      this.tableRows.forEach((row) => {
        rowValues.add(row.value);
      });
    }
    const oldSelectedCount = this.selected.length;
    this.selected = this.selected.filter(
      (selectedItem) => rowValues.has(selectedItem)
    );
    if (oldSelectedCount !== this.selected.length) {
      this.dispatchEvent(
        new Event("change", {
          cancelable: true,
          bubbles: true,
          composed: true
        })
      );
    }
    this.selectedSet = new Set(this.selected);
  }
  manageSelected() {
    this.validateSelected();
    if (this.isVirtualized) return;
    this.tableRows.forEach((row) => {
      row.selected = this.selectedSet.has(row.value);
    });
    if (this.tableHeadCheckboxCell) {
      this.tableHeadCheckboxCell.checked = this.selected.length === this.tableRows.length;
    }
  }
  manageCheckboxes() {
    var _a, _b, _c;
    if (!!this.selects) {
      this.tableHeadCheckboxCell = document.createElement(
        "sp-table-checkbox-cell"
      );
      this.tableHeadCheckboxCell.headCell = true;
      this.tableHeadCheckboxCell.emphasized = this.emphasized;
      const allSelected = this.selected.length === this.tableRows.length;
      this.manageHeadCheckbox(allSelected);
      (_a = this.tableHead) == null ? void 0 : _a.insertAdjacentElement(
        "afterbegin",
        this.tableHeadCheckboxCell
      );
      this.tableRows.forEach((row) => {
        const checkbox = document.createElement(
          "sp-table-checkbox-cell"
        );
        checkbox.emphasized = this.emphasized;
        row.insertAdjacentElement("afterbegin", checkbox);
        row.selected = this.selectedSet.has(row.value);
        checkbox.checked = row.selected;
      });
    } else {
      (_c = (_b = this.tableHead) == null ? void 0 : _b.querySelector("sp-table-checkbox-cell")) == null ? void 0 : _c.remove();
      this.tableRows.forEach((row) => {
        var _a2;
        (_a2 = row.checkboxCells[0]) == null ? void 0 : _a2.remove();
        if (this.selected.length) {
          row.selected = this.selectedSet.has(row.value);
        }
      });
    }
  }
  manageHeadCheckbox(allSelected) {
    if (!this.tableHeadCheckboxCell) return;
    this.tableHeadCheckboxCell.selectsSingle = this.selects === "single";
    this.tableHeadCheckboxCell.emphasized = this.emphasized;
    this.tableHeadCheckboxCell.checked = allSelected;
    this.tableHeadCheckboxCell.indeterminate = this.selected.length > 0 && !allSelected;
  }
  handleChange(event) {
    event.stopPropagation();
    const previousSelectedSet = new Set(this.selectedSet);
    const previousSelected = [...this.selected];
    const { target } = event;
    const { parentElement: rowItem } = target;
    if (!rowItem.value) {
      const { checkbox } = target;
      if (!checkbox) return;
      if (checkbox.checked || checkbox.indeterminate) {
        this.selectAllRows();
      } else {
        this.deselectAllRows();
      }
    } else {
      switch (this.selects) {
        case "single": {
          this.deselectAllRows();
          if (rowItem.selected) {
            this.selectedSet.add(rowItem.value);
            this.selected = [...this.selectedSet];
          }
          break;
        }
        case "multiple": {
          if (rowItem.selected) {
            this.selectedSet.add(rowItem.value);
          } else {
            this.selectedSet.delete(rowItem.value);
          }
          this.selected = [...this.selectedSet];
          const allSelected = this.selected.length === this.tableRows.length;
          if (!this.tableHeadCheckboxCell)
            return;
          this.tableHeadCheckboxCell.checked = allSelected;
          this.tableHeadCheckboxCell.indeterminate = this.selected.length > 0 && !allSelected;
          break;
        }
        default: {
          break;
        }
      }
    }
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        cancelable: true,
        bubbles: true,
        composed: true
      })
    );
    if (!applyDefault) {
      event.preventDefault();
      this.selectedSet = previousSelectedSet;
      this.selected = previousSelected;
    }
  }
  scrollToIndex(index) {
    if (index && !!this.tableBody) {
      const virtualizerParent = this.tableBody;
      const item = virtualizerParent[virtualizerRef].element(index);
      if (item) {
        item.scrollIntoView();
      }
    }
  }
  render() {
    return html`
            <slot @change=${this.handleChange}></slot>
        `;
  }
  willUpdate(changed) {
    if (!this.hasUpdated) {
      this.validateSelected();
      this.manageCheckboxes();
    }
    if (changed.has("selects")) {
      this.manageSelects();
    }
    if (changed.has("selected") && this.hasUpdated) {
      this.manageSelected();
    }
  }
  updated() {
    if (this.items.length) {
      this.renderVirtualizedItems();
    } else {
      this.removeAttribute("aria-rowcount");
    }
  }
  renderVirtualizedItems() {
    if (!this.isConnected) return;
    if (!this.tableBody) {
      this.tableBody = this.querySelector("sp-table-body");
      if (!this.tableBody) {
        this.tableBody = document.createElement("sp-table-body");
        this.append(this.tableBody);
      }
      this.tableBody.addEventListener(
        "rangeChanged",
        (event) => {
          this.dispatchEvent(
            new RangeChangedEvent({
              first: event.first,
              last: event.last
            })
          );
        }
      );
      this.tableBody.addEventListener(
        "visibilityChanged",
        (event) => {
          this.dispatchEvent(
            new VisibilityChangedEvent({
              first: event.first,
              last: event.last
            })
          );
        }
      );
    }
    this.setAttribute("aria-rowcount", `${this.items.length}`);
    const config = {
      items: this.items,
      renderItem: this.renderItem,
      scroller: this.scroller
    };
    render(
      html`
                ${virtualize(config)}
            `,
      this.tableBody
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
__decorateClass([
  property({ reflect: true })
], Table.prototype, "role", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Table.prototype, "selects", 2);
__decorateClass([
  property({ type: Array })
], Table.prototype, "selected", 2);
__decorateClass([
  property({ type: Array })
], Table.prototype, "items", 2);
__decorateClass([
  property({ type: Object })
], Table.prototype, "itemValue", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Table.prototype, "scroller", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Table.prototype, "emphasized", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Table.prototype, "quiet", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Table.prototype, "density", 2);
//# sourceMappingURL=Table.dev.js.map
