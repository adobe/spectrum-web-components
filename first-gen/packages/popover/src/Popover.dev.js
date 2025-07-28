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
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import popoverStyles from "./popover.css.js";
export class Popover extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.open = false;
    this.tip = false;
  }
  static get styles() {
    return [popoverStyles];
  }
  renderTip() {
    return html`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `;
  }
  render() {
    return html`
            <slot></slot>
            ${this.tip ? this.renderTip() : nothing}
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Popover.prototype, "open", 2);
__decorateClass([
  property({ reflect: true })
], Popover.prototype, "placement", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Popover.prototype, "tip", 2);
__decorateClass([
  query("#tip")
], Popover.prototype, "tipElement", 2);
//# sourceMappingURL=Popover.dev.js.map
