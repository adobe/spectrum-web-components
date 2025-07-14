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
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/button/sp-close-button.js";
import "@spectrum-web-components/divider/sp-divider.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared";
import { AlertDialog } from "@spectrum-web-components/alert-dialog/src/AlertDialog.js";
import { classMap } from "@spectrum-web-components/base/src/directives.js";
import styles from "./dialog.css.js";
export class Dialog extends ObserveSlotPresence(AlertDialog, [
  '[slot="hero"]',
  '[slot="footer"]',
  '[slot="button"]'
]) {
  constructor() {
    super(...arguments);
    this.error = false;
    this.dismissable = false;
    this.dismissLabel = "Close";
    this.noDivider = false;
  }
  static get styles() {
    return [styles];
  }
  get hasFooter() {
    return this.getSlotContentPresence('[slot="footer"]');
  }
  get hasButtons() {
    return this.getSlotContentPresence('[slot="button"]');
  }
  /* c8 ignore next 3 */
  get hasHero() {
    return this.getSlotContentPresence('[slot="hero"]');
  }
  close() {
    this.dispatchEvent(
      new Event("close", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
  }
  renderHero() {
    return html`
            <slot name="hero"></slot>
        `;
  }
  renderFooter() {
    return html`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `;
  }
  renderButtons() {
    const classes = {
      "button-group": true,
      "button-group--noFooter": !this.hasFooter
    };
    return html`
            <sp-button-group class=${classMap(classes)}>
                <slot name="button"></slot>
            </sp-button-group>
        `;
  }
  renderDismiss() {
    return html`
            <sp-close-button
                class="close-button"
                label=${this.dismissLabel}
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `;
  }
  render() {
    return html`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error ? html`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      ` : nothing}
                ${this.noDivider ? nothing : html`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter ? this.renderFooter() : nothing}
                ${this.hasButtons ? this.renderButtons() : nothing}
                ${this.dismissable ? this.renderDismiss() : nothing}
            </div>
        `;
  }
  shouldUpdate(changes) {
    if (changes.has("mode") && !!this.mode) {
      this.dismissable = false;
    }
    if (changes.has("dismissable") && this.dismissable) {
      this.dismissable = !this.mode;
    }
    return super.shouldUpdate(changes);
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.setAttribute("role", "dialog");
  }
  updated(changes) {
    super.updated(changes);
  }
}
__decorateClass([
  query(".close-button")
], Dialog.prototype, "closeButton", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Dialog.prototype, "error", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Dialog.prototype, "dismissable", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "dismiss-label" })
], Dialog.prototype, "dismissLabel", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "no-divider" })
], Dialog.prototype, "noDivider", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Dialog.prototype, "mode", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Dialog.prototype, "size", 2);
//# sourceMappingURL=Dialog.dev.js.map
