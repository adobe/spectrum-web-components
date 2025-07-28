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
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/underlay/sp-underlay.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { DialogBase } from "./DialogBase.dev.js";
export class DialogWrapper extends DialogBase {
  constructor() {
    super(...arguments);
    this.error = false;
    this.cancelLabel = "";
    this.confirmLabel = "";
    this.dismissLabel = "Close";
    this.footer = "";
    this.hero = "";
    this.heroLabel = "";
    this.noDivider = false;
    this.secondaryLabel = "";
    this.headline = "";
  }
  static get styles() {
    return [...super.styles];
  }
  get dialog() {
    return this.shadowRoot.querySelector("sp-dialog");
  }
  clickSecondary() {
    this.dispatchEvent(
      new Event("secondary", {
        bubbles: true
      })
    );
  }
  clickCancel() {
    this.dispatchEvent(
      new Event("cancel", {
        bubbles: true
      })
    );
  }
  clickConfirm() {
    this.dispatchEvent(
      new Event("confirm", {
        bubbles: true
      })
    );
  }
  renderDialog() {
    const hideDivider = this.noDivider || !this.headline || this.headlineVisibility === "none";
    if (true) {
      if (!this.headline) {
        window.__swc.warn(
          this,
          `<${this.localName}> elements will not be accessible to screen readers without a "headline" attribute or property.`,
          "https://opensource.adobe.com/spectrum-web-components/components/dialog-wrapper/#accessibility",
          {
            type: "accessibility"
          }
        );
      }
    }
    return html`
            <sp-dialog
                ?dismissable=${this.dismissable}
                dismiss-label=${this.dismissLabel}
                ?no-divider=${hideDivider}
                ?error=${this.error}
                mode=${ifDefined(this.mode)}
                size=${ifDefined(this.size)}
            >
                ${this.hero ? html`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${ifDefined(
      this.heroLabel ? void 0 : "true"
    )}
                              alt=${ifDefined(
      this.heroLabel ? this.heroLabel : void 0
    )}
                          />
                      ` : nothing}
                ${this.headline ? html`
                          <h2
                              slot="heading"
                              ?hidden=${this.headlineVisibility === "none"}
                          >
                              ${this.headline}
                          </h2>
                      ` : nothing}
                <slot></slot>
                ${this.footer ? html`
                          <div slot="footer">${this.footer}</div>
                      ` : nothing}
                ${this.cancelLabel ? html`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      ` : nothing}
                ${this.secondaryLabel ? html`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      ` : nothing}
                ${this.confirmLabel ? html`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      ` : nothing}
            </sp-dialog>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], DialogWrapper.prototype, "error", 2);
__decorateClass([
  property({ attribute: "cancel-label" })
], DialogWrapper.prototype, "cancelLabel", 2);
__decorateClass([
  property({ attribute: "confirm-label" })
], DialogWrapper.prototype, "confirmLabel", 2);
__decorateClass([
  property({ attribute: "dismiss-label" })
], DialogWrapper.prototype, "dismissLabel", 2);
__decorateClass([
  property()
], DialogWrapper.prototype, "footer", 2);
__decorateClass([
  property()
], DialogWrapper.prototype, "hero", 2);
__decorateClass([
  property({ attribute: "hero-label" })
], DialogWrapper.prototype, "heroLabel", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "no-divider" })
], DialogWrapper.prototype, "noDivider", 2);
__decorateClass([
  property({ type: String, reflect: true })
], DialogWrapper.prototype, "size", 2);
__decorateClass([
  property({ attribute: "secondary-label" })
], DialogWrapper.prototype, "secondaryLabel", 2);
__decorateClass([
  property()
], DialogWrapper.prototype, "headline", 2);
__decorateClass([
  property({ type: String, attribute: "headline-visibility" })
], DialogWrapper.prototype, "headlineVisibility", 2);
//# sourceMappingURL=DialogWrapper.dev.js.map
