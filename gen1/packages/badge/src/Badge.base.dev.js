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
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import {
  BADGE_VARIANTS_SEMANTIC,
  FIXED_VALUES
} from "./Badge.types.dev.js";
export class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ""),
  {
    noDefaultSize: true
  }
) {
  constructor() {
    super(...arguments);
    this.variant = "informative";
  }
  get fixed() {
    return this._fixed;
  }
  set fixed(fixed) {
    if (fixed === this.fixed) {
      return;
    }
    const oldValue = this.fixed;
    this._fixed = fixed;
    if (fixed) {
      this.setAttribute("fixed", fixed);
    } else {
      this.removeAttribute("fixed");
    }
    this.requestUpdate("fixed", oldValue);
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  /**
   * Used for rendering gap when the badge has an icon.
   *
   * @internal
   */
  get hasIcon() {
    return this.slotContentIsPresent;
  }
  update(changedProperties) {
    super.update(changedProperties);
    if (true) {
      const constructor = this.constructor;
      if (!constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
          "https://opensource.adobe.com/spectrum-web-components/components/badge/#variants",
          {
            issues: [...constructor.VARIANTS]
          }
        );
      }
      if ("outline" in this && this.outline === true && !constructor.VARIANTS_SEMANTIC.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element only supports the outline styling if the variant is a semantic color variant.`,
          "https://opensource.adobe.com/spectrum-web-components/components/badge/#variants",
          {
            issues: [...constructor.VARIANTS_SEMANTIC]
          }
        );
      }
    }
  }
}
// ──────────────────
//     SHARED API
// ──────────────────
/**
 * @internal
 */
BadgeBase.FIXED_VALUES = FIXED_VALUES;
/**
 * @internal
 */
BadgeBase.VARIANTS_SEMANTIC = BADGE_VARIANTS_SEMANTIC;
__decorateClass([
  property({ type: String, reflect: true })
], BadgeBase.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], BadgeBase.prototype, "fixed", 1);
//# sourceMappingURL=Badge.base.dev.js.map
