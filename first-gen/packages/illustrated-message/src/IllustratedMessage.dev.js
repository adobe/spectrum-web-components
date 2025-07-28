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
import messageStyles from "./illustrated-message.css.js";
import headingStyles from "@spectrum-web-components/styles/heading.js";
import bodyStyles from "@spectrum-web-components/styles/body.js";
export class IllustratedMessage extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.heading = "";
    this.description = "";
  }
  static get styles() {
    return [headingStyles, bodyStyles, messageStyles];
  }
  render() {
    return html`
            <div id="illustration"><slot></slot></div>
            <h2
                id="heading"
                class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
            >
                <slot name="heading">${this.heading}</slot>
            </h2>
            <div id="description" class="spectrum-Body spectrum-Body--sizeS">
                <slot name="description">${this.description}</slot>
            </div>
        `;
  }
}
IllustratedMessage.is = "sp-illustrated-message";
__decorateClass([
  property()
], IllustratedMessage.prototype, "heading", 2);
__decorateClass([
  property()
], IllustratedMessage.prototype, "description", 2);
//# sourceMappingURL=IllustratedMessage.dev.js.map
