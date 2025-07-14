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
import buttonStyles from "@spectrum-web-components/clear-button/src/clear-button.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";
import crossMediumStyles from "@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";
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
    this.variant = "";
  }
  static get styles() {
    return [...super.styles, buttonStyles, crossMediumStyles];
  }
  get buttonContent() {
    return [crossIcon[this.size]()];
  }
  render() {
    return html`
            <div class="fill">${super.render()}</div>
        `;
  }
}
__decorateClass([
  property({ reflect: true })
], ClearButton.prototype, "variant", 2);
//# sourceMappingURL=ClearButton.dev.js.map
