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
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import tabItemStyles from "./tab.css.js";
export class Tab extends FocusVisiblePolyfillMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), "")
) {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.label = "";
    this.selected = false;
    this.vertical = false;
    this.value = "";
  }
  static get styles() {
    return [tabItemStyles];
  }
  get hasIcon() {
    return this.slotContentIsPresent;
  }
  get hasLabel() {
    return !!this.label || this.slotHasContent;
  }
  render() {
    return html`
            ${this.hasIcon ? html`
                      <slot name="icon"></slot>
                  ` : nothing}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent ? nothing : this.label}
                <slot>${this.label}</slot>
            </label>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.setAttribute("role", "tab");
    if (!this.hasAttribute("id")) {
      this.id = `sp-tab-${randomID()}`;
    }
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("selected")) {
      this.setAttribute(
        "aria-selected",
        this.selected ? "true" : "false"
      );
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }
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
], Tab.prototype, "disabled", 2);
__decorateClass([
  property({ reflect: true })
], Tab.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tab.prototype, "selected", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tab.prototype, "vertical", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Tab.prototype, "value", 2);
//# sourceMappingURL=Tab.dev.js.map
