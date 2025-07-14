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
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { getLabelFromSlot } from "@spectrum-web-components/shared/src/get-label-from-slot.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import progressCircleStyles from "./progress-circle.css.js";
export class ProgressCircle extends SizedMixin(SpectrumElement, {
  validSizes: ["s", "m", "l"]
}) {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.label = "";
    this.progress = 0;
  }
  static get styles() {
    return [progressCircleStyles];
  }
  makeRotation(rotation) {
    return this.indeterminate ? void 0 : `transform: rotate(${rotation}deg);`;
  }
  render() {
    const styles = [
      this.makeRotation(-180 + 180 / 50 * Math.min(this.progress, 50)),
      this.makeRotation(
        -180 + 180 / 50 * Math.max(this.progress - 50, 0)
      )
    ];
    const masks = ["Mask1", "Mask2"];
    return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
            <div class="track"></div>
            <div class="fills">
                ${masks.map(
      (mask, index) => html`
                        <div class="fill${mask}">
                            <div
                                class="fillSub${mask}"
                                style=${ifDefined(styles[index])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `
    )}
            </div>
        `;
  }
  handleSlotchange() {
    const labelFromSlot = getLabelFromSlot(this.label, this.slotEl);
    if (labelFromSlot) {
      this.label = labelFromSlot;
    }
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "progressbar");
    }
  }
  updated(changes) {
    super.updated(changes);
    if (!this.indeterminate && changes.has("progress")) {
      this.setAttribute("aria-valuenow", "" + this.progress);
    } else if (this.hasAttribute("aria-valuenow")) {
      this.removeAttribute("aria-valuenow");
    }
    if (changes.has("label")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else if (changes.get("label") === this.getAttribute("aria-label")) {
        this.removeAttribute("aria-label");
      }
    }
    if (true) {
      if (!this.label && !this.getAttribute("aria-label") && !this.getAttribute("aria-labelledby") && !this.slotEl.assignedNodes().length) {
        window.__swc.warn(
          this,
          "<sp-progress-circle> elements need one of the following to be accessible:",
          "https://opensource.adobe.com/spectrum-web-components/components/progress-circle/#accessibility",
          {
            type: "accessibility",
            issues: [
              'value supplied to the "label" attribute, which will be displayed visually as part of the element, or',
              "text content supplied directly to the <sp-progress-circle> element, or",
              'value supplied to the "aria-label" attribute, which will only be provided to screen readers, or',
              'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.'
            ]
          }
        );
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ProgressCircle.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: String })
], ProgressCircle.prototype, "label", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ProgressCircle.prototype, "staticColor", 2);
__decorateClass([
  property({ type: Number })
], ProgressCircle.prototype, "progress", 2);
__decorateClass([
  query("slot")
], ProgressCircle.prototype, "slotEl", 2);
//# sourceMappingURL=ProgressCircle.dev.js.map
