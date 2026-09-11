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
import { ASSET_VARIANTS } from "./Asset.types.dev.js";
export class AssetBase extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────
  updated(changes) {
    super.updated(changes);
    if (true) {
      const constructor = this.constructor;
      if (typeof this.variant !== "undefined" && !constructor.VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
          "https://opensource.adobe.com/spectrum-web-components/components/asset/",
          {
            issues: [...constructor.VARIANTS]
          }
        );
      }
    }
  }
}
// ─────────────────────────
//     API TO OVERRIDE
// ─────────────────────────
/**
 * @internal
 *
 * A readonly array of all valid variants for the asset.
 */
AssetBase.VARIANTS = ASSET_VARIANTS;
__decorateClass([
  property({ type: String, reflect: true })
], AssetBase.prototype, "variant", 2);
__decorateClass([
  property()
], AssetBase.prototype, "label", 2);
//# sourceMappingURL=Asset.base.dev.js.map
