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
  nothing,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { getLabelFromSlot } from "@spectrum-web-components/shared/src/get-label-from-slot.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import { LanguageResolutionController } from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import styles from "./meter.css.js";
export const meterVariants = ["positive", "notice", "negative"];
export class Meter extends SizedMixin(ObserveSlotText(SpectrumElement, ""), {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.progress = 0;
    this._variant = "";
    this.label = "";
    this.languageResolver = new LanguageResolutionController(this);
    // called sideLabel
    this.sideLabel = false;
  }
  static get styles() {
    return [styles];
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    const oldValue = this.variant;
    if (meterVariants.includes(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
    } else {
      this.removeAttribute("variant");
      this._variant = "";
    }
    this.requestUpdate("variant", oldValue);
  }
  get variant() {
    return this._variant;
  }
  render() {
    return html`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent ? nothing : this.label}
                <slot @slotchange=${this.handleSlotchange}>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${new Intl.NumberFormat(this.languageResolver.language, {
      style: "percent",
      unitDisplay: "narrow"
    }).format(this.progress / 100)}
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
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
    this.setAttribute("role", "meter progressbar");
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("progress")) {
      this.setAttribute("aria-valuenow", "" + this.progress);
    }
    if (changes.has("label")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
}
__decorateClass([
  property({ type: Number })
], Meter.prototype, "progress", 2);
__decorateClass([
  property({ type: String })
], Meter.prototype, "variant", 1);
__decorateClass([
  property({ type: String, reflect: true })
], Meter.prototype, "label", 2);
__decorateClass([
  query("slot")
], Meter.prototype, "slotEl", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "side-label" })
], Meter.prototype, "sideLabel", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], Meter.prototype, "staticColor", 2);
//# sourceMappingURL=Meter.dev.js.map
