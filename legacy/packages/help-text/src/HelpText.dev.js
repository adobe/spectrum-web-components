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
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import styles from "./help-text.css.js";
export class HelpText extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.icon = false;
    this.variant = "neutral";
  }
  static get styles() {
    return [styles];
  }
  render() {
    return html`
            ${this.variant === "negative" && this.icon ? html`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  ` : nothing}
            <div class="text"><slot></slot></div>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], HelpText.prototype, "icon", 2);
__decorateClass([
  property({ reflect: true })
], HelpText.prototype, "variant", 2);
//# sourceMappingURL=HelpText.dev.js.map
