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
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import panelStyles from "./tab-panel.css.js";
export class TabPanel extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.selected = false;
    this.value = "";
  }
  handleFocusin() {
    this.removeAttribute("tabindex");
  }
  handleFocusout() {
    this.tabIndex = this.selected ? 0 : -1;
  }
  render() {
    return html`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `;
  }
  firstUpdated() {
    this.slot = "tab-panel";
    this.setAttribute("role", "tabpanel");
    this.tabIndex = 0;
    if (!this.hasAttribute("id")) {
      this.id = `sp-tab-panel-${randomID()}`;
    }
  }
  updated(changes) {
    if (changes.has("selected")) {
      if (this.selected) {
        this.removeAttribute("aria-hidden");
        this.tabIndex = 0;
      } else {
        this.setAttribute("aria-hidden", "true");
        this.tabIndex = -1;
      }
    }
  }
}
TabPanel.styles = [panelStyles];
__decorateClass([
  property({ type: Boolean, reflect: true })
], TabPanel.prototype, "selected", 2);
__decorateClass([
  property({ type: String, reflect: true })
], TabPanel.prototype, "value", 2);
//# sourceMappingURL=TabPanel.dev.js.map
