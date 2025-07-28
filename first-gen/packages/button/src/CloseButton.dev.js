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
import { StyledButton } from "./StyledButton.dev.js";
import buttonStyles from "@spectrum-web-components/close-button/src/close-button.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js";
import crossMediumStyles from "@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";
const crossIcon = {
  s: () => html`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,
  m: () => html`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `,
  l: () => html`
        <sp-icon-cross400
            slot="icon"
            class="icon spectrum-UIIcon-Cross400"
        ></sp-icon-cross400>
    `,
  xl: () => html`
        <sp-icon-cross500
            slot="icon"
            class="icon spectrum-UIIcon-Cross500"
        ></sp-icon-cross500>
    `
};
export class CloseButton extends SizedMixin(StyledButton, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.variant = "";
  }
  static get styles() {
    return [...super.styles, buttonStyles, crossMediumStyles];
  }
  get buttonContent() {
    return [crossIcon[this.size]()];
  }
}
__decorateClass([
  property({ reflect: true })
], CloseButton.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], CloseButton.prototype, "staticColor", 2);
//# sourceMappingURL=CloseButton.dev.js.map
