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
import styles from "./table-body.css.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
export class TableBody extends SpectrumElement {
  constructor() {
    super();
    this.role = "rowgroup";
    new MutationController(this, {
      config: {
        childList: true,
        subtree: true
      },
      callback: () => {
        requestAnimationFrame(() => {
          this.shouldHaveTabIndex();
        });
      }
    });
  }
  static get styles() {
    return [styles];
  }
  shouldHaveTabIndex() {
    if (this.offsetHeight < this.scrollHeight) {
      this.tabIndex = 0;
    } else {
      this.removeAttribute("tabindex");
    }
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
}
__decorateClass([
  property({ reflect: true })
], TableBody.prototype, "role", 2);
//# sourceMappingURL=TableBody.dev.js.map
