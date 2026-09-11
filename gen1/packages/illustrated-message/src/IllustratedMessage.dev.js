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
import bodyStyles from "@spectrum-web-components/styles/body.js";
import headingStyles from "@spectrum-web-components/styles/heading.js";
import messageStyles from "./illustrated-message.css.js";
export class IllustratedMessage extends SpectrumElement {
  constructor() {
    super(...arguments);
    this._heading = "";
    this._description = "";
  }
  static get styles() {
    return [headingStyles, bodyStyles, messageStyles];
  }
  get heading() {
    return this._heading;
  }
  set heading(value) {
    if (value) {
      window.__swc.warn(
        this,
        `The "heading" property on <${this.localName}> has been deprecated and will be removed in a future release. Use <h2 slot="heading"> instead.`,
        "https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/",
        { level: "deprecation" }
      );
    }
    this._heading = value;
    this.requestUpdate("heading", this._heading);
  }
  get description() {
    return this._description;
  }
  set description(value) {
    if (value) {
      window.__swc.warn(
        this,
        `The "description" property on <${this.localName}> has been deprecated and will be removed in a future release. Use <span slot="description"> instead.`,
        "https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/",
        { level: "deprecation" }
      );
    }
    this._description = value;
    this.requestUpdate("description", this._description);
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
], IllustratedMessage.prototype, "heading", 1);
__decorateClass([
  property()
], IllustratedMessage.prototype, "description", 1);
//# sourceMappingURL=IllustratedMessage.dev.js.map
