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
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { SizedMixin } from "@spectrum-web-components/base/src/sizedMixin.js";
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import { getLabelFromSlot } from "@spectrum-web-components/shared/src/get-label-from-slot.js";
import {
  PROGRESS_CIRCLE_VALID_SIZES
} from "./ProgressCircle.types.dev.js";
export class ProgressCircleBase extends SizedMixin(SpectrumElement, {
  validSizes: PROGRESS_CIRCLE_VALID_SIZES
}) {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.label = "";
    this.progress = 0;
    this.languageResolver = new LanguageResolutionController(this);
  }
  makeRotation(rotation) {
    return this.indeterminate ? void 0 : `transform: rotate(${rotation}deg);`;
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
  formatProgress() {
    return new Intl.NumberFormat(this.languageResolver.language, {
      style: "percent",
      unitDisplay: "narrow"
    }).format(this.progress / 100);
  }
  updated(changes) {
    var _a, _b, _c;
    super.updated(changes);
    if (changes.has("indeterminate")) {
      if (this.indeterminate) {
        this.removeAttribute("aria-valuemin");
        this.removeAttribute("aria-valuemax");
        this.removeAttribute("aria-valuenow");
        this.removeAttribute("aria-valuetext");
      } else {
        this.setAttribute("aria-valuemin", "0");
        this.setAttribute("aria-valuemax", "100");
        this.setAttribute("aria-valuenow", "" + this.progress);
        this.setAttribute("aria-valuetext", this.formatProgress());
      }
    }
    if (!this.indeterminate && changes.has("progress")) {
      this.setAttribute("aria-valuenow", "" + this.progress);
      this.setAttribute("aria-valuetext", this.formatProgress());
    }
    if (!this.indeterminate && changes.has(languageResolverUpdatedSymbol)) {
      this.setAttribute("aria-valuetext", this.formatProgress());
    }
    if (changes.has("label")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else if (changes.get("label") === this.getAttribute("aria-label")) {
        this.removeAttribute("aria-label");
      }
    }
    const hasAccessibleName = () => {
      return Boolean(
        this.label || this.getAttribute("aria-label") || this.getAttribute("aria-labelledby") || this.slotEl.assignedNodes().length
      );
    };
    if (true) {
      if (changes.has("indeterminate") && this.indeterminate) {
        window.__swc.warn(
          this,
          `<${this.localName}> the "indeterminate" attribute is deprecated and will be removed in Spectrum 2. Omit the "progress" attribute (or set it to null) to indicate indeterminate progress.`,
          "https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/progress-circle-consumer-migration-guide--docs",
          { level: "deprecation" }
        );
      }
      const hasLightDomChildren = Array.from(
        (_b = (_a = this.slotEl) == null ? void 0 : _a.assignedNodes()) != null ? _b : []
      ).some(
        (node) => {
          var _a2;
          return node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE && ((_a2 = node.textContent) == null ? void 0 : _a2.trim());
        }
      );
      if (hasLightDomChildren) {
        window.__swc.warn(
          this,
          `<${this.localName}> light DOM children are deprecated as a labelling mechanism and will not be rendered in Spectrum 2. Use the "label" attribute or "aria-label" on the host instead.`,
          "https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/progress-circle-consumer-migration-guide--docs",
          { level: "deprecation" }
        );
      }
      if (!hasAccessibleName() && this.getAttribute("role") === "progressbar") {
        (_c = window.__swc) == null ? void 0 : _c.warn(
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
  property({ type: String, reflect: true, attribute: "static-color" })
], ProgressCircleBase.prototype, "staticColor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ProgressCircleBase.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: String })
], ProgressCircleBase.prototype, "label", 2);
__decorateClass([
  property({ type: Number })
], ProgressCircleBase.prototype, "progress", 2);
__decorateClass([
  query("slot")
], ProgressCircleBase.prototype, "slotEl", 2);
//# sourceMappingURL=ProgressCircle.base.dev.js.map
