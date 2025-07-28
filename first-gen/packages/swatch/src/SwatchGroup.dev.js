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
  queryAssignedElements
} from "@spectrum-web-components/base/src/decorators.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import styles from "./swatch-group.css.js";
export class SwatchGroup extends SizedMixin(SpectrumElement, {
  validSizes: ["xs", "s", "m", "l"],
  noDefaultSize: true
}) {
  constructor() {
    super();
    // Specifically surface `_selected` internally so that change can be made to this value internally
    // without triggering the update lifecycle directly.
    this._selected = [];
    this.selectedSet = /* @__PURE__ */ new Set();
    this.rovingTabindexController = new RovingTabindexController(this, {
      focusInIndex: (elements) => {
        let firstEnabledIndex = -1;
        const firstSelectedIndex = elements.findIndex((el, index) => {
          if (!elements[firstEnabledIndex] && !el.disabled) {
            firstEnabledIndex = index;
          }
          return el.selected && !el.disabled;
        });
        return elements[firstSelectedIndex] ? firstSelectedIndex : firstEnabledIndex;
      },
      elements: () => this.swatches,
      isFocusableElement: (el) => !el.disabled
    });
    this.manageChange = async () => {
      const presentSet = /* @__PURE__ */ new Set();
      this.selectedSet = new Set(this.selected);
      await Promise.all(this.swatches.map((swatch) => swatch.updateComplete));
      this.swatches.forEach((swatch) => {
        presentSet.add(swatch.value);
        if (swatch.selected) {
          this.selectedSet.add(swatch.value);
        }
      });
      this.selectedSet.forEach((value) => {
        if (!presentSet.has(value)) {
          this.selectedSet.delete(value);
        }
      });
      this._selected = [...this.selectedSet];
      this.rovingTabindexController.clearElementCache();
    };
    new MutationController(this, {
      config: {
        attributes: true,
        childList: true,
        subtree: true
      },
      callback: () => {
        this.manageChange();
      }
    });
  }
  static get styles() {
    return [styles];
  }
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    if (selected === this.selected) return;
    const oldSelected = this.selected;
    this._selected = selected;
    this.requestUpdate("selected", oldSelected);
  }
  focus(options) {
    this.rovingTabindexController.focus(options);
  }
  handleChange(event) {
    event.stopPropagation();
    const oldSelected = this.selected;
    if (!this.selects) {
      event.preventDefault();
      return;
    }
    if (this.selects === "single") {
      const { target } = event;
      target.tabIndex = 0;
      target.selected = true;
      if (this.selectedSet.has(target.value)) {
        return;
      }
      this.selectedSet.clear();
      this.selectedSet.add(target.value);
      this.rovingTabindexController.elements.forEach((child) => {
        if (child === target) return;
        child.selected = false;
      });
    } else if (this.selects === "multiple") {
      const { target } = event;
      if (target.selected) {
        this.selectedSet.add(target.value);
      } else {
        this.selectedSet.delete(target.value);
      }
    }
    this._selected = [...this.selectedSet];
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        cancelable: true,
        bubbles: true
      })
    );
    if (!applyDefault) {
      this._selected = oldSelected;
      event.preventDefault();
    }
  }
  getPassthroughSwatchActions(changes) {
    const targetValues = {};
    if (changes.has("selects") && (this.selects || typeof changes.get("selects") !== "undefined")) {
      targetValues.selects = this.selects;
    }
    if (changes.has("border") && (this.border || typeof changes.get("border") !== "undefined")) {
      targetValues.border = this.border;
    }
    if (changes.has("rounding") && (this.rounding || typeof changes.get("rounding") !== "undefined")) {
      targetValues.rounding = this.rounding;
    }
    if (changes.has("size") && (this.size !== "m" || typeof changes.get("size") !== "undefined")) {
      targetValues.size = this.size;
    }
    if (changes.has("shape") && (this.shape || typeof changes.get("shape") !== "undefined")) {
      targetValues.shape = this.shape;
    }
    const passThroughSwatchActions = [];
    if (Object.keys(targetValues).length) {
      passThroughSwatchActions.push((swatch) => {
        if (true) {
          if ("selects" in targetValues && targetValues.selects !== "multiple" && swatch.mixedValue) {
            window.__swc.warn(
              this,
              `<sp-swatch> elements can only leverage the "mixed-value" attribute when their <sp-swatch-group> parent element is also leveraging "selects="multiple""`,
              "https://opensource.adobe.com/spectrum-web-components/components/swatch-group/#multiple",
              {
                type: "accessibility"
              }
            );
          }
        }
        if ("border" in targetValues)
          swatch.border = targetValues.border;
        if ("rounding" in targetValues)
          swatch.rounding = targetValues.rounding;
        if ("shape" in targetValues) swatch.shape = targetValues.shape;
        if ("size" in targetValues)
          swatch.size = targetValues.size;
      });
    }
    return passThroughSwatchActions;
  }
  getSelectionSwatchActions(changes) {
    const selectionSwatchActions = [];
    if (!changes.has("selects")) return selectionSwatchActions;
    if (this.selects) {
      this.setAttribute(
        "role",
        this.selects === "single" ? "radiogroup" : "group"
      );
    } else {
      this.removeAttribute("role");
    }
    const swatchRoles = {
      single: "radio",
      multiple: "checkbox"
    };
    const swatchRole = this.selects ? swatchRoles[this.selects] : "button";
    selectionSwatchActions.push((swatch) => {
      swatch.setAttribute("role", swatchRole);
    });
    return selectionSwatchActions;
  }
  render() {
    return html`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `;
  }
  willUpdate(changes) {
    const swatchActions = [
      ...this.getPassthroughSwatchActions(changes),
      ...this.getSelectionSwatchActions(changes)
    ];
    let nextSelected = new Set(this.selected);
    const currentValues = /* @__PURE__ */ new Set();
    if (changes.has("selected")) {
      swatchActions.push((swatch) => {
        currentValues.add(swatch.value);
        if (nextSelected.has(swatch.value) || !this.hasUpdated && swatch.selected) {
          swatch.selected = true;
        } else {
          swatch.selected = false;
        }
      });
    }
    const doActions = () => {
      nextSelected = new Set(this.selected);
      this.swatches.forEach((swatch) => {
        swatchActions.forEach((action) => {
          action(swatch);
        });
      });
      if (changes.has("selected")) {
        this._selected = [...nextSelected.values()].filter(
          (selectedValue) => currentValues.has(selectedValue)
        );
      }
    };
    if (this.hasUpdated) {
      doActions();
    } else {
      this.shadowRoot.addEventListener(
        "slotchange",
        () => {
          requestAnimationFrame(doActions);
        },
        { once: true }
      );
    }
  }
}
__decorateClass([
  property({ reflect: true })
], SwatchGroup.prototype, "border", 2);
__decorateClass([
  property({ reflect: true })
], SwatchGroup.prototype, "density", 2);
__decorateClass([
  property({ reflect: true })
], SwatchGroup.prototype, "rounding", 2);
__decorateClass([
  property({ type: Array })
], SwatchGroup.prototype, "selected", 1);
__decorateClass([
  property()
], SwatchGroup.prototype, "selects", 2);
__decorateClass([
  property({ reflect: true })
], SwatchGroup.prototype, "shape", 2);
__decorateClass([
  queryAssignedElements({ flatten: true })
], SwatchGroup.prototype, "swatches", 2);
//# sourceMappingURL=SwatchGroup.dev.js.map
