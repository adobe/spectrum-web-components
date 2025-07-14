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
import styles from "./divider.css.js";
export class Divider extends SizedMixin(SpectrumElement, {
  validSizes: ["s", "m", "l"],
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  render() {
    return html``;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.setAttribute("role", "separator");
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("vertical")) {
      if (this.vertical) {
        this.setAttribute("aria-orientation", "vertical");
      } else {
        this.removeAttribute("aria-orientation");
      }
    }
  }
}
Divider.styles = [styles];
__decorateClass([
  property({ type: Boolean, reflect: true })
], Divider.prototype, "vertical", 2);
//# sourceMappingURL=Divider.dev.js.map
