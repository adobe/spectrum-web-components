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
import { classMap } from "@spectrum-web-components/base/src/directives.js";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ButtonBase } from "@spectrum-web-components/button/src/ButtonBase.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import styles from "./picker-button.css.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
const chevronClass = {
  s: "spectrum-UIIcon-ChevronDown75",
  m: "spectrum-UIIcon-ChevronDown100",
  l: "spectrum-UIIcon-ChevronDown200",
  xl: "spectrum-UIIcon-ChevronDown300"
};
export class PickerButton extends SizedMixin(
  ObserveSlotPresence(ButtonBase, '[slot="label"]')
) {
  constructor() {
    super(...arguments);
    this.invalid = false;
    this.position = "right";
  }
  static get styles() {
    return [styles, chevronStyles];
  }
  get hasText() {
    return this.slotContentIsPresent;
  }
  render() {
    const rootClasses = {
      root: true,
      uiicononly: !this.hasText,
      textuiicon: this.hasText
    };
    return html`
            <div class=${classMap(rootClasses)}>
                <div class="spectrum-PickerButton-fill">
                    <span
                        class="spectrum-PickerButton-label is-placeholder"
                        ?hidden=${!this.hasText}
                    >
                        <slot name="label"></slot>
                    </span>
                    <slot name="icon">
                        <sp-icon-chevron100
                            class="spectrum-PickerButton-icon spectrum-Icon ${chevronClass[this.size]}"
                        ></sp-icon-chevron100>
                    </slot>
                </div>
            </div>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerButton.prototype, "invalid", 2);
__decorateClass([
  property({ reflect: true })
], PickerButton.prototype, "position", 2);
//# sourceMappingURL=PickerButton.dev.js.map
