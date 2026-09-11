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
  STATUSLIGHT_VALID_SIZES
} from "./StatusLight.types.dev.js";
export class StatusLightBase extends SizedMixin(SpectrumElement, {
  validSizes: STATUSLIGHT_VALID_SIZES,
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.variant = "info";
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  updated(changes) {
    super.updated(changes);
    if (true) {
      const constructor = this.constructor;
      if (!constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          "https://opensource.adobe.com/spectrum-web-components/components/status-light/#variants",
          {
            issues: [...constructor.VARIANTS]
          }
        );
      }
      if (this.hasAttribute("disabled") && !("disabled" in this)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element does not support the disabled state.`,
          "https://opensource.adobe.com/spectrum-web-components/components/status-light/#states",
          {
            issues: ["disabled is not a supported property in Spectrum 2"]
          }
        );
      }
    }
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], StatusLightBase.prototype, "variant", 2);
//# sourceMappingURL=StatusLight.base.dev.js.map
