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
  LitElement
} from "@spectrum-web-components/base";
import {
  customElement,
  property
} from "@spectrum-web-components/base/src/decorators.js";
import styles from "@spectrum-web-components/theme/src/typography.css.js";
export let Typography = class extends LitElement {
  render() {
    if (!this.story) return html``;
    return html`
            <div class="spectrum-Typography">${this.story}</div>
        `;
  }
};
Typography.styles = [styles];
__decorateClass([
  property({ attribute: false })
], Typography.prototype, "story", 2);
Typography = __decorateClass([
  customElement("typography-decorator")
], Typography);
//# sourceMappingURL=typography-decorator.js.map
