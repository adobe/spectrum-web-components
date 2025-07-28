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
import styles from "./progress-bar.css.js";
export class ProgressBar extends SizedMixin(
  ObserveSlotText(SpectrumElement, ""),
  {
    noDefaultSize: true
  }
) {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.label = "";
    this.languageResolver = new LanguageResolutionController(this);
    this._overBackground = false;
    this.sideLabel = false;
    this.progress = 0;
  }
  static get styles() {
    return [styles];
  }
  get overBackground() {
    return this._overBackground ? "over-background" : "";
  }
  set overBackground(overBackground) {
    if (overBackground === true) {
      this.removeAttribute("over-background");
      this.staticColor = "white";
      if (true) {
        window.__swc.warn(
          this,
          `The "over-background" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
          "https://opensource.adobe.com/spectrum-web-components/components/progress-bar/#variants",
          {
            level: "deprecation"
          }
        );
      }
    }
  }
  render() {
    return html`
            ${this.slotHasContent || this.label ? html`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent ? html`` : this.label}

                          <slot @slotchange=${this.handleSlotchange}></slot>
                      </sp-field-label>
                  ` : html``}
            ${this.label ? html`
                      ${this.indeterminate ? nothing : html`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(
      this.languageResolver.language,
      {
        style: "percent",
        unitDisplay: "narrow"
      }
    ).format(this.progress / 100)}
                                </sp-field-label>
                            `}
                  ` : nothing}
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
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "progressbar");
    }
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("indeterminate")) {
      if (this.indeterminate) {
        this.removeAttribute("aria-valuemin");
        this.removeAttribute("aria-valuemax");
        this.removeAttribute("aria-valuenow");
      } else {
        this.setAttribute("aria-valuemin", "0");
        this.setAttribute("aria-valuemax", "100");
      }
    }
    if (!this.indeterminate && changes.has("progress")) {
      this.setAttribute("aria-valuenow", "" + this.progress);
    }
    if (changes.has("label")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else if (changes.get("label") === this.getAttribute("aria-label")) {
        this.removeAttribute("aria-label");
      }
    }
    if (true) {
      if (!this.label && !this.getAttribute("aria-label") && !this.getAttribute("aria-labelledby") && !this.slotHasContent) {
        window.__swc.warn(
          this,
          "<sp-progress-bar> elements need one of the following to be accessible:",
          "https://opensource.adobe.com/spectrum-web-components/components/progress-bar/#accessibility",
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
], ProgressBar.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: String, reflect: true })
], ProgressBar.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, attribute: "over-background" })
], ProgressBar.prototype, "overBackground", 1);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "side-label" })
], ProgressBar.prototype, "sideLabel", 2);
__decorateClass([
  property({ type: Number })
], ProgressBar.prototype, "progress", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ProgressBar.prototype, "staticColor", 2);
__decorateClass([
  query("slot")
], ProgressBar.prototype, "slotEl", 2);
//# sourceMappingURL=ProgressBar.dev.js.map
