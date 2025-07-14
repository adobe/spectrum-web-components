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
  nothing
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { Textfield } from "@spectrum-web-components/textfield";
import "@spectrum-web-components/button/sp-clear-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-search.js";
import searchStyles from "./search.css.js";
const stopPropagation = (event) => event.stopPropagation();
export class Search extends Textfield {
  constructor() {
    super(...arguments);
    this.action = "";
    this.label = "Search";
    this.placeholder = "Search";
  }
  static get styles() {
    return [...super.styles, searchStyles];
  }
  handleSubmit(event) {
    const applyDefault = this.dispatchEvent(
      new Event("submit", {
        cancelable: true,
        bubbles: true
      })
    );
    if (!applyDefault) {
      event.preventDefault();
    }
  }
  handleKeydown(event) {
    const { code } = event;
    if (code === "Escape" && this.holdValueOnEscape) {
      return;
    }
    if (!this.value || code !== "Escape") {
      return;
    }
    this.reset();
  }
  async reset() {
    this.value = "";
    await this.updateComplete;
    this.focusElement.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        composed: true
      })
    );
    this.focusElement.dispatchEvent(
      new InputEvent("change", {
        bubbles: true
      })
    );
  }
  renderField() {
    return html`
            <form
                action=${this.action}
                id="form"
                method=${ifDefined(this.method)}
                @submit=${this.handleSubmit}
                @reset=${this.reset}
                @keydown=${this.handleKeydown}
            >
                <sp-icon-search
                    size=${this.size}
                    class="icon magnifier icon-workflow icon-search"
                ></sp-icon-search>
                ${super.renderField()}
                ${this.value ? html`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              size=${ifDefined(this.size)}
                              @keydown=${stopPropagation}
                          ></sp-clear-button>
                      ` : nothing}
            </form>
        `;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (!this.hasAttribute("holdValueOnEscape")) {
      this.inputElement.setAttribute("type", "search");
    }
  }
  willUpdate() {
    this.multiline = false;
  }
}
__decorateClass([
  property()
], Search.prototype, "action", 2);
__decorateClass([
  property()
], Search.prototype, "label", 2);
__decorateClass([
  property()
], Search.prototype, "method", 2);
__decorateClass([
  property()
], Search.prototype, "placeholder", 2);
__decorateClass([
  property({ type: Boolean })
], Search.prototype, "holdValueOnEscape", 2);
__decorateClass([
  query("#form")
], Search.prototype, "form", 2);
//# sourceMappingURL=Search.dev.js.map
