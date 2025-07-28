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
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { CheckboxMixin } from "./CheckboxMixin.dev.js";
import checkboxStyles from "./checkbox.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js";
import checkmarkSmallStyles from "@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";
import dashSmallStyles from "@spectrum-web-components/icon/src/spectrum-icon-dash.css.js";
const checkmarkIcon = {
  s: () => {
    return html`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `;
  },
  m: () => {
    return html`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `;
  },
  l: () => {
    return html`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `;
  },
  xl: () => {
    return html`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `;
  }
};
const dashIcon = {
  s: () => {
    return html`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `;
  },
  m: () => {
    return html`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `;
  },
  l: () => {
    return html`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `;
  },
  xl: () => {
    return html`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `;
  }
};
export class Checkbox extends SizedMixin(CheckboxMixin(SpectrumElement), {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.indeterminate = false;
    this.invalid = false;
    this.emphasized = false;
    this.tabIndex = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasAttribute("autofocus")) {
      this.updateComplete.then(() => {
        this.focus();
      });
    }
  }
  static get styles() {
    return [checkboxStyles, checkmarkSmallStyles, dashSmallStyles];
  }
  click() {
    var _a;
    if (this.disabled) {
      return;
    }
    (_a = this.inputElement) == null ? void 0 : _a.click();
  }
  handleChange() {
    this.indeterminate = false;
    super.handleChange();
  }
  render() {
    return html`
            ${super.render()}
            <span id="box">
                ${this.checked ? checkmarkIcon[this.size]() : html``}
                ${this.indeterminate ? dashIcon[this.size]() : html``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `;
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("disabled") && (typeof changes.get("disabled") !== "undefined" || this.disabled)) {
      if (this.disabled) {
        this.inputElement.tabIndex = this.tabIndex;
        this.tabIndex = -1;
      } else {
        this.tabIndex = this.inputElement.tabIndex;
        this.inputElement.removeAttribute("tabindex");
      }
      this.inputElement.disabled = this.disabled;
    }
    if (changes.has("indeterminate")) {
      this.inputElement.indeterminate = this.indeterminate;
    }
    if (changes.has("invalid")) {
      if (this.invalid) {
        this.inputElement.setAttribute("aria-invalid", "true");
      } else {
        this.inputElement.removeAttribute("aria-invalid");
      }
    }
  }
}
Checkbox.shadowRootOptions = {
  ...SpectrumElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  property({ type: Boolean, reflect: true })
], Checkbox.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Checkbox.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Checkbox.prototype, "invalid", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Checkbox.prototype, "emphasized", 2);
__decorateClass([
  property({ reflect: true, type: Number, attribute: "tabindex" })
], Checkbox.prototype, "tabIndex", 2);
//# sourceMappingURL=Checkbox.dev.js.map
