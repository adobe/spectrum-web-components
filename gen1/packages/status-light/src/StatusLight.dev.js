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
  html
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import statusLightStyles from "./status-light.css.js";
import { StatusLightBase } from "./StatusLight.base.dev.js";
import {
  STATUSLIGHT_VARIANTS_COLOR_S1,
  STATUSLIGHT_VARIANTS_S1,
  STATUSLIGHT_VARIANTS_SEMANTIC_S1
} from "./StatusLight.types.dev.js";
export const STATUSLIGHT_VARIANTS = STATUSLIGHT_VARIANTS_S1;
export class StatusLight extends StatusLightBase {
  constructor() {
    super(...arguments);
    this.variant = "info";
    this.disabled = false;
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  updated(changes) {
    super.updated(changes);
    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────
  static get styles() {
    return [statusLightStyles];
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
}
// ────────────────────
//     API OVERRIDES
// ────────────────────
/**
 * @internal
 */
StatusLight.VARIANTS_COLOR = STATUSLIGHT_VARIANTS_COLOR_S1;
/**
 * @internal
 */
StatusLight.VARIANTS_SEMANTIC = STATUSLIGHT_VARIANTS_SEMANTIC_S1;
/**
 * @internal
 */
StatusLight.VARIANTS = STATUSLIGHT_VARIANTS_S1;
__decorateClass([
  property({ type: String, reflect: true })
], StatusLight.prototype, "variant", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], StatusLight.prototype, "disabled", 2);
//# sourceMappingURL=StatusLight.dev.js.map
