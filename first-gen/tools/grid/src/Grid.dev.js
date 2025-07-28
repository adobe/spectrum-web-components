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
  adoptStyles,
  html,
  render
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { LitVirtualizer } from "@lit-labs/virtualizer/LitVirtualizer.js";
import { grid } from "@lit-labs/virtualizer/layouts/grid.js";
import styles from "./grid.css.js";
import { GridController } from "./GridController.dev.js";
export class Grid extends LitVirtualizer {
  constructor() {
    super(...arguments);
    this.__gridPart = void 0;
    this.gap = "0";
    this.items = [];
    this.itemSize = {
      width: 200,
      height: 200
    };
    this.selected = [];
    this.gridController = new GridController(this, {
      elements: () => [],
      itemSize: () => this.itemSize,
      /* c8 ignore next 2 */
      gap: () => this.gap,
      padding: () => this.padding || this.gap
    });
  }
  static get styles() {
    return [styles];
  }
  handleChange(event) {
    const target = event.target;
    if (this.lastTargetForChange === target) {
      return;
    }
    this.lastTargetForChange = target;
    this.animationFrameId = requestAnimationFrame(() => {
      this.lastTargetForChange = void 0;
    });
    const value = this.items[parseFloat(target.getAttribute("key") || "")];
    const selected = [...this.selected];
    if (!selected.includes(value)) {
      selected.push(value);
    } else {
      const index = selected.indexOf(value);
      if (index > -1) {
        selected.splice(index, 1);
      }
    }
    this.selected = selected;
  }
  createRenderRoot() {
    var _a;
    const renderRoot = (_a = this.shadowRoot) != null ? _a : this.attachShadow(
      this.constructor.shadowRootOptions
    );
    adoptStyles(
      renderRoot,
      this.constructor.elementStyles
    );
    return renderRoot;
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
  update(changes) {
    if (changes.has("itemSize") || changes.has("gap") || changes.has("padding") || changes.has("focusableSelector")) {
      this.updateComplete.then(() => {
        this.gridController.update({
          elements: () => [
            ...this.querySelectorAll(
              this.focusableSelector
            )
          ],
          itemSize: () => this.itemSize,
          gap: () => this.gap,
          padding: () => this.padding || this.gap
        });
      });
      this.layout = grid({
        itemSize: {
          width: `${this.itemSize.width}px`,
          height: `${this.itemSize.height}px`
        },
        gap: this.gap,
        padding: this.padding || this.gap
      });
    }
    if (changes.has("renderItem")) {
      const fn = this.renderItem;
      this.renderItem = (item, index) => {
        const selected = this.selected.includes(
          item
        );
        return fn(item, index, selected);
      };
    }
    if (this.isConnected) {
      this.__gridPart = render(super.render(), this);
    }
    super.update(changes);
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    (_a = this.__gridPart) == null ? void 0 : _a.setConnected(true);
    this.addEventListener("change", this.handleChange, { capture: true });
  }
  disconnectedCallback() {
    var _a;
    this.removeEventListener("change", this.handleChange, {
      capture: true
    });
    (_a = this.__gridPart) == null ? void 0 : _a.setConnected(false);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = void 0;
      this.lastTargetForChange = void 0;
    }
    super.disconnectedCallback();
  }
}
__decorateClass([
  property({ type: String })
], Grid.prototype, "focusableSelector", 2);
__decorateClass([
  property({ type: String })
], Grid.prototype, "gap", 2);
__decorateClass([
  property({ type: String })
], Grid.prototype, "padding", 2);
__decorateClass([
  property({ type: Array })
], Grid.prototype, "items", 2);
__decorateClass([
  property({ type: Object })
], Grid.prototype, "itemSize", 2);
__decorateClass([
  property({ type: Array })
], Grid.prototype, "selected", 2);
//# sourceMappingURL=Grid.dev.js.map
