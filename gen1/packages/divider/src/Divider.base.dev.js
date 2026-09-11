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
import { SpectrumElement } from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { SizedMixin } from "@spectrum-web-components/base/src/sizedMixin.js";
import {
  DIVIDER_STATIC_COLORS,
  DIVIDER_VALID_SIZES
} from "./Divider.types.dev.js";
export class DividerBase extends SizedMixin(SpectrumElement, {
  validSizes: DIVIDER_VALID_SIZES,
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.setAttribute("role", "separator");
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("vertical")) {
      if (this.vertical) {
        this.setAttribute("aria-orientation", "vertical");
      } else {
        this.removeAttribute("aria-orientation");
      }
    }
  }
}
// ──────────────────
//     SHARED API
// ──────────────────
/**
 * @internal
 *
 * A readonly array of the valid static color variants for the divider.
 */
DividerBase.STATIC_COLORS = DIVIDER_STATIC_COLORS;
__decorateClass([
  property({ type: Boolean, reflect: true })
], DividerBase.prototype, "vertical", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], DividerBase.prototype, "staticColor", 2);
//# sourceMappingURL=Divider.base.dev.js.map
