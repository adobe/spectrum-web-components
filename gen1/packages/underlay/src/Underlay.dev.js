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
import styles from "./underlay.css.js";
export class Underlay extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.canClick = false;
    this.open = false;
  }
  static get styles() {
    return [styles];
  }
  click() {
    this.dispatchEvent(new Event("close"));
  }
  handlePointerdown() {
    this.canClick = true;
  }
  handlePointerup() {
    if (this.canClick) {
      this.click();
    }
    this.canClick = false;
  }
  render() {
    return html``;
  }
  firstUpdated() {
    this.addEventListener("pointerdown", this.handlePointerdown);
    this.addEventListener("pointerup", this.handlePointerup);
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Underlay.prototype, "open", 2);
//# sourceMappingURL=Underlay.dev.js.map
