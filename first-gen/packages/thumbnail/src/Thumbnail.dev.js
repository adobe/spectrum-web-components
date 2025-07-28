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
import opacityCheckerboardStyles from "@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";
import styles from "./thumbnail.css.js";
const validSizes = [
  "50",
  "75",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000"
];
const defaultSize = validSizes[6];
export class Thumbnail extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.cover = false;
    this.layer = false;
    this._size = defaultSize;
  }
  static get styles() {
    return [opacityCheckerboardStyles, styles];
  }
  get size() {
    return this._size;
  }
  set size(value) {
    const size = validSizes.includes(value) ? value : defaultSize;
    if (size) {
      this.setAttribute("size", `${size}`);
    }
    if (this._size === size) {
      return;
    }
    const oldSize = this._size;
    this._size = size;
    this.requestUpdate("size", oldSize);
  }
  update(changes) {
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", this.size);
    }
    super.update(changes);
  }
  render() {
    if (this.background) {
      return html`
                <div
                    class="opacity-checkerboard background"
                    style="background: ${this.background}"
                >
                    <div class="image-wrapper">
                        <slot></slot>
                    </div>
                </div>
            `;
    } else if (this.layer) {
      return html`
                <div class="opacity-checkerboard layer-inner">
                    <slot></slot>
                </div>
            `;
    } else {
      return html`
                <div class="opacity-checkerboard image-wrapper">
                    <slot></slot>
                </div>
            `;
    }
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], Thumbnail.prototype, "background", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Thumbnail.prototype, "cover", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Thumbnail.prototype, "layer", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Thumbnail.prototype, "size", 1);
//# sourceMappingURL=Thumbnail.dev.js.map
