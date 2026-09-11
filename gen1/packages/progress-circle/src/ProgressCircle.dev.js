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
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import progressCircleStyles from "./progress-circle.css.js";
import { ProgressCircleBase } from "./ProgressCircle.base.dev.js";
import {
  PROGRESS_CIRCLE_STATIC_COLORS_S1
} from "./ProgressCircle.types.dev.js";
export class ProgressCircle extends ProgressCircleBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────
  static get styles() {
    return [progressCircleStyles];
  }
  render() {
    const styles = [
      this.makeRotation(-180 + 180 / 50 * Math.min(this.progress, 50)),
      this.makeRotation(-180 + 180 / 50 * Math.max(this.progress - 50, 0))
    ];
    const masks = ["Mask1", "Mask2"];
    return html`
      <slot @slotchange=${this.handleSlotchange}></slot>
      <div class="track"></div>
      <div class="fills">
        ${masks.map(
      (mask, index) => html`
            <div class="fill${mask}">
              <div class="fillSub${mask}" style=${ifDefined(styles[index])}>
                <div class="fill"></div>
              </div>
            </div>
          `
    )}
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
ProgressCircle.STATIC_COLORS = PROGRESS_CIRCLE_STATIC_COLORS_S1;
__decorateClass([
  property({ type: String, reflect: true, attribute: "static-color" })
], ProgressCircle.prototype, "staticColor", 2);
//# sourceMappingURL=ProgressCircle.dev.js.map
