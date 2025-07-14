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
  SizedMixin
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ButtonBase } from "@spectrum-web-components/button/src/ButtonBase.js";
import styles from "./infield-button.css.js";
export class InfieldButton extends SizedMixin(ButtonBase, {
  noDefaultSize: true,
  validSizes: ["s", "m", "l", "xl"]
}) {
  constructor() {
    super(...arguments);
    this.quiet = false;
  }
  static get styles() {
    return [...super.styles, styles];
  }
  get buttonContent() {
    const buttonContent = html`
            <div class="fill">
                <slot></slot>
            </div>
        `;
    return [buttonContent];
  }
}
__decorateClass([
  property()
], InfieldButton.prototype, "block", 2);
__decorateClass([
  property()
], InfieldButton.prototype, "inline", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], InfieldButton.prototype, "quiet", 2);
//# sourceMappingURL=InfieldButton.dev.js.map
