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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import styles from "./badge.css.js";
export const BADGE_VARIANTS = [
  "accent",
  "neutral",
  "informative",
  "positive",
  "negative",
  "notice",
  "fuchsia",
  "indigo",
  "magenta",
  "purple",
  "seafoam",
  "yellow",
  "gray",
  "red",
  "orange",
  "chartreuse",
  "celery",
  "green",
  "cyan",
  "blue"
];
export const FIXED_VALUES = [
  "inline-start",
  "inline-end",
  "block-start",
  "block-end"
];
export class Badge extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ""),
  {
    noDefaultSize: true
  }
) {
  constructor() {
    super(...arguments);
    this.variant = "informative";
  }
  static get styles() {
    return [styles];
  }
  get fixed() {
    return this._fixed;
  }
  set fixed(fixed) {
    if (fixed === this.fixed) return;
    const oldValue = this.fixed;
    this._fixed = fixed;
    if (fixed) {
      this.setAttribute("fixed", fixed);
    } else {
      this.removeAttribute("fixed");
    }
    this.requestUpdate("fixed", oldValue);
  }
  get hasIcon() {
    return this.slotContentIsPresent;
  }
  render() {
    if (true) {
      if (!BADGE_VARIANTS.includes(this.variant)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
          "https://opensource.adobe.com/spectrum-web-components/components/badge/#variants",
          {
            issues: [...BADGE_VARIANTS]
          }
        );
      }
    }
    return html`
            ${this.hasIcon ? html`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  ` : nothing}
            <div class="label">
                <slot></slot>
            </div>
        `;
  }
}
__decorateClass([
  property({ reflect: true })
], Badge.prototype, "fixed", 1);
__decorateClass([
  property({ type: String, reflect: true })
], Badge.prototype, "variant", 2);
//# sourceMappingURL=Badge.dev.js.map
