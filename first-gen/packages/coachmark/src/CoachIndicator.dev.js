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
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import styles from "./coach-indicator.css.js";
export class CoachIndicator extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.quiet = false;
  }
  static get styles() {
    return [styles];
  }
  render() {
    return html`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], CoachIndicator.prototype, "quiet", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], CoachIndicator.prototype, "staticColor", 2);
//# sourceMappingURL=CoachIndicator.dev.js.map
