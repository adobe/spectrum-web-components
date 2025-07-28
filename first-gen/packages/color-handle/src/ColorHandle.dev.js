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
import "@spectrum-web-components/color-loupe/sp-color-loupe.js";
import opacityCheckerboardStyles from "@spectrum-web-components/opacity-checkerboard/src/is-opacity-checkerboard.css.js";
import styles from "./color-handle.css.js";
export class ColorHandle extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.focused = false;
    this.open = false;
    this.color = "rgba(255, 0, 0, 0.5)";
  }
  static get styles() {
    return [opacityCheckerboardStyles, styles];
  }
  handlePointerdown(event) {
    if (event.pointerType === "touch") {
      this.open = true;
    }
    this.setPointerCapture(event.pointerId);
  }
  handlePointerup(event) {
    this.open = false;
    this.releasePointerCapture(event.pointerId);
  }
  render() {
    return html`
            <div class="inner" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open && !this.disabled}
            ></sp-color-loupe>
        `;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.addEventListener("pointerdown", this.handlePointerdown);
    this.addEventListener("pointerup", this.handlePointerup);
    this.addEventListener("pointercancel", this.handlePointerup);
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorHandle.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorHandle.prototype, "focused", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorHandle.prototype, "open", 2);
__decorateClass([
  property({ type: String })
], ColorHandle.prototype, "color", 2);
//# sourceMappingURL=ColorHandle.dev.js.map
