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
import buttonStyles from "@spectrum-web-components/clear-button/src/clear-button.css.js";
import crossMediumStyles from "@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";
import { StyledButton } from "./StyledButton.dev.js";
const crossIcon = {
  s: () => html`
    <sp-icon-cross75
      slot="icon"
      class="icon spectrum-UIIcon-Cross75"
    ></sp-icon-cross75>
  `,
  m: () => html`
    <sp-icon-cross100
      slot="icon"
      class="icon spectrum-UIIcon-Cross100"
    ></sp-icon-cross100>
  `,
  l: () => html`
    <sp-icon-cross200
      slot="icon"
      class="icon spectrum-UIIcon-Cross200"
    ></sp-icon-cross200>
  `,
  xl: () => html`
    <sp-icon-cross300
      slot="icon"
      class="icon spectrum-UIIcon-Cross300"
    ></sp-icon-cross300>
  `
};
export class ClearButton extends SizedMixin(StyledButton, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.quiet = false;
  }
  static get styles() {
    return [...super.styles, buttonStyles, crossMediumStyles];
  }
  set variant(variant) {
    const oldValue = this._variant;
    const oldStaticColor = this.staticColor;
    if (variant !== "overBackground") {
      this.removeAttribute("variant");
      this._variant = void 0;
      this.staticColor = void 0;
      return;
    }
    this.setAttribute("variant", variant);
    this._variant = variant;
    this.staticColor = "white";
    if (true) {
      window.__swc.warn(
        this,
        'The overBackground variant is deprecated. Please use `static-color="white"` instead.',
        "https://opensource.adobe.com/spectrum-web-components/components/clear-button/",
        { level: "deprecation" }
      );
    }
    this.requestUpdate("variant", oldValue);
    this.requestUpdate("staticColor", oldStaticColor);
  }
  get variant() {
    return this._variant;
  }
  get buttonContent() {
    return [crossIcon[this.size]()];
  }
  render() {
    return html`
      <div class="fill">${super.render()}</div>
    `;
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    if ((_a = this.textContent) == null ? void 0 : _a.trim()) {
      window.__swc.warn(
        this,
        `The default slot for text content in <${this.localName}> has been deprecated and will be removed in a future release. The clear button is icon-only and does not render slot content. Use the "label" attribute instead to provide an accessible name.`,
        "https://opensource.adobe.com/spectrum-web-components/components/button/#clear-button",
        { level: "deprecation" }
      );
    }
    if (!this.label) {
      window.__swc.warn(
        this,
        `The "label" attribute is required on <${this.localName}> to provide an accessible name for screen readers. Please add a label attribute, e.g., <${this.localName} label="Clear">.`,
        "https://opensource.adobe.com/spectrum-web-components/components/button/#clear-button",
        { level: "high" }
      );
    }
  }
}
__decorateClass([
  property()
], ClearButton.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ClearButton.prototype, "quiet", 2);
__decorateClass([
  property({ reflect: true })
], ClearButton.prototype, "variant", 1);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ClearButton.prototype, "staticColor", 2);
//# sourceMappingURL=ClearButton.dev.js.map
