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
  nothing
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { BadgeBase } from "./Badge.base.dev.js";
import styles from "./badge.css.js";
import {
  BADGE_VARIANTS_COLOR_S1,
  BADGE_VARIANTS_S1,
  FIXED_VALUES as FIXED_VALUES_BASE
} from "./Badge.types.dev.js";
export const BADGE_VARIANTS = BADGE_VARIANTS_S1;
export const FIXED_VALUES = FIXED_VALUES_BASE;
export class Badge extends BadgeBase {
  constructor() {
    super(...arguments);
    this.variant = "informative";
  }
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────
  static get styles() {
    return [styles];
  }
  render() {
    return html`
      ${this.hasIcon ? html`
            <slot name="icon" ?icon-only=${!this.slotHasContent}></slot>
          ` : nothing}
      <div class="label">
        <slot></slot>
      </div>
    `;
  }
}
// ────────────────────
//     API OVERRIDES
// ────────────────────
/**
 * @internal
 */
Badge.VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S1;
/**
 * @internal
 */
Badge.VARIANTS = BADGE_VARIANTS_S1;
__decorateClass([
  property({ type: String, reflect: true })
], Badge.prototype, "variant", 2);
//# sourceMappingURL=Badge.dev.js.map
