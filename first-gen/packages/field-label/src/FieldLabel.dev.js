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
  nothing,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js";
import asteriskIconStyles from "@spectrum-web-components/icon/src/spectrum-icon-asterisk.css.js";
import {
  conditionAttributeWithId,
  conditionAttributeWithoutId
} from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import {
  ElementResolutionController,
  elementResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/ElementResolution.js";
import styles from "./field-label.css.js";
export class FieldLabel extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.id = "";
    this.for = "";
    this.required = false;
    this.resolvedElement = new ElementResolutionController(this);
  }
  static get styles() {
    return [styles, asteriskIconStyles];
  }
  handleClick(event) {
    if (!this.target || this.disabled || event.defaultPrevented) return;
    this.target.focus();
    const parent = this.getRootNode();
    const target = this.target;
    const targetParent = target.getRootNode();
    const targetHost = targetParent.host;
    if (targetParent === parent && target.forceFocusVisible) {
      target.forceFocusVisible();
    } else if (targetHost && targetHost.forceFocusVisible) {
      targetHost.forceFocusVisible();
    }
  }
  applyTargetLabel(target) {
    this.target = target || this.target;
    if (this.target) {
      const applyLabel = this.target.applyFocusElementLabel;
      const focusable = this.target.focusElement || this.target;
      const targetParent = focusable.getRootNode();
      if (typeof applyLabel !== "undefined") {
        applyLabel(this.labelText, this);
      } else if (targetParent === this.getRootNode()) {
        const conditionAttribute = target ? conditionAttributeWithId : conditionAttributeWithoutId;
        conditionAttribute(focusable, "aria-labelledby", [this.id]);
      } else {
        if (target) {
          focusable.setAttribute("aria-label", this.labelText);
        } else {
          focusable.removeAttribute("aria-label");
        }
      }
    }
  }
  async manageTarget() {
    this.applyTargetLabel();
    const target = this.resolvedElement.element;
    if (!target) {
      this.target = target;
      return;
    }
    if (target.localName.search("-") > 0) {
      await customElements.whenDefined(target.localName);
    }
    if (typeof target.updateComplete !== "undefined") {
      await target.updateComplete;
    }
    this.applyTargetLabel(target);
  }
  get labelText() {
    const assignedNodes = this.slotEl.assignedNodes({ flatten: true });
    if (!assignedNodes.length) {
      return "";
    }
    const labelText = assignedNodes.map(
      (node) => (node.textContent || /* c8 ignore next */
      "").trim()
    );
    return labelText.join(" ");
  }
  render() {
    return html`
            <label>
                <slot></slot>
                ${this.required ? html`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      ` : nothing}
            </label>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.addEventListener("click", this.handleClick);
  }
  willUpdate(changes) {
    if (!this.hasAttribute("id")) {
      this.setAttribute(
        "id",
        `${this.tagName.toLowerCase()}-${randomID()}`
      );
    }
    if (changes.has("for")) {
      this.resolvedElement.selector = this.for ? `#${this.for}` : "";
    }
    if (changes.has("id") || changes.has(elementResolverUpdatedSymbol)) {
      this.manageTarget();
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], FieldLabel.prototype, "disabled", 2);
__decorateClass([
  property({ type: String })
], FieldLabel.prototype, "id", 2);
__decorateClass([
  property({ type: String })
], FieldLabel.prototype, "for", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], FieldLabel.prototype, "required", 2);
__decorateClass([
  query("slot")
], FieldLabel.prototype, "slotEl", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "side-aligned" })
], FieldLabel.prototype, "sideAligned", 2);
//# sourceMappingURL=FieldLabel.dev.js.map
