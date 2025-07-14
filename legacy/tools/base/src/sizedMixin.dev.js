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
import { property } from "lit/decorators.js";
export const ElementSizes = {
  xxs: "xxs",
  xs: "xs",
  s: "s",
  m: "m",
  l: "l",
  xl: "xl",
  xxl: "xxl"
};
export function SizedMixin(constructor, {
  validSizes = ["s", "m", "l", "xl"],
  noDefaultSize,
  defaultSize = "m"
} = {}) {
  class SizedElement extends constructor {
    constructor() {
      super(...arguments);
      this._size = defaultSize;
    }
    get size() {
      return this._size || defaultSize;
    }
    set size(value) {
      const fallbackSize = noDefaultSize ? null : defaultSize;
      const size = value ? value.toLocaleLowerCase() : value;
      const validSize = validSizes.includes(size) ? size : fallbackSize;
      if (validSize) {
        this.setAttribute("size", validSize);
      }
      if (this._size === validSize) {
        return;
      }
      const oldSize = this._size;
      this._size = validSize;
      this.requestUpdate("size", oldSize);
    }
    update(changes) {
      if (!this.hasAttribute("size") && !noDefaultSize) {
        this.setAttribute("size", this.size);
      }
      super.update(changes);
    }
  }
  __decorateClass([
    property({ type: String })
  ], SizedElement.prototype, "size", 1);
  return SizedElement;
}
//# sourceMappingURL=sizedMixin.dev.js.map
