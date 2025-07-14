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
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import { when } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import chevronIconStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import styles from "./accordion-item.css.js";
const chevronIcon = {
  s: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
  m: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
  l: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
  xl: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `
};
export class AccordionItem extends SizedMixin(Focusable, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.open = false;
    this.label = "";
    this.disabled = false;
    this.renderChevronIcon = () => {
      return chevronIcon[this.size || "m"]();
    };
  }
  static get styles() {
    return [styles, chevronIconStyles];
  }
  get focusElement() {
    return this.shadowRoot.querySelector("#header");
  }
  onClick() {
    if (this.disabled) {
      return;
    }
    this.toggle();
  }
  toggle() {
    this.open = !this.open;
    const applyDefault = this.dispatchEvent(
      new CustomEvent("sp-accordion-item-toggle", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (!applyDefault) {
      this.open = !this.open;
    }
  }
  render() {
    return html`
            <h3 id="heading">
                ${when(this.size, this.renderChevronIcon)}
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </button>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `;
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], AccordionItem.prototype, "open", 2);
__decorateClass([
  property({ type: String, reflect: true })
], AccordionItem.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], AccordionItem.prototype, "disabled", 2);
//# sourceMappingURL=AccordionItem.dev.js.map
