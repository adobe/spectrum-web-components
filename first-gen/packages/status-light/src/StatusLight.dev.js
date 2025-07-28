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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import statusLightStyles from "./status-light.css.js";
export class StatusLight extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.variant = "info";
  }
  static get styles() {
    return [statusLightStyles];
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], StatusLight.prototype, "disabled", 2);
__decorateClass([
  property({ reflect: true })
], StatusLight.prototype, "variant", 2);
//# sourceMappingURL=StatusLight.dev.js.map
