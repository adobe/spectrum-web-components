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
  html
} from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import styles from "./breadcrumb-item.css.js";
export class BreadcrumbItem extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.value = void 0;
    this.isLastOfType = false;
  }
  static get styles() {
    return [styles, chevronStyles];
  }
  get focusElement() {
    return this.shadowRoot.querySelector("#item-link");
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
  }
  announceSelected(value) {
    const selectDetail = {
      value
    };
    const selectionEvent = new CustomEvent("breadcrumb-select", {
      bubbles: true,
      composed: true,
      detail: selectDetail
    });
    this.dispatchEvent(selectionEvent);
  }
  handleClick(event) {
    if (!this.href && event) {
      event.preventDefault();
    }
    if (!this.href || (event == null ? void 0 : event.defaultPrevented)) {
      if (this.value && !this.isLastOfType) {
        this.announceSelected(this.value);
      }
    }
  }
  handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleClick(event);
    }
  }
  renderLink() {
    return html`
            <a
                id="item-link"
                href=${ifDefined(!this.isLastOfType ? this.href : void 0)}
                tabindex=${0}
                aria-current=${ifDefined(
      this.isLastOfType ? "page" : void 0
    )}
                @keydown=${this.handleKeyDown}
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `;
  }
  renderSeparator() {
    return html`
            <sp-icon-chevron100
                id="separator"
                size="xs"
                class="spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `;
  }
  render() {
    return html`
            ${this.renderLink()}
            <slot name="menu"></slot>
            ${this.renderSeparator()}
        `;
  }
  updated(changes) {
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
  property()
], BreadcrumbItem.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean })
], BreadcrumbItem.prototype, "isLastOfType", 2);
//# sourceMappingURL=BreadcrumbItem.dev.js.map
