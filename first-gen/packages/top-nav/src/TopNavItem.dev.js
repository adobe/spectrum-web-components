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
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { Focusable, LikeAnchor } from "@spectrum-web-components/shared";
import itemStyles from "@spectrum-web-components/tabs/src/tab.css.js";
import topNavItemStyles from "./top-nav-item.css.js";
export class TopNavItem extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.selected = false;
    this.value = "";
  }
  static get styles() {
    return [itemStyles, topNavItemStyles];
  }
  get focusElement() {
    return this.anchor;
  }
  click() {
    this.anchor.click();
  }
  render() {
    return html`
            <a
                id="item-label"
                href=${ifDefined(this.href)}
                download=${ifDefined(this.download)}
                target=${ifDefined(this.target)}
                aria-label=${ifDefined(this.label)}
                aria-current=${ifDefined(
      this.selected && this.href ? "page" : void 0
    )}
                rel=${ifDefined(this.rel)}
            >
                <slot></slot>
            </a>
        `;
  }
  updated(changes) {
    super.updated(changes);
    this.value = this.anchor.href;
  }
}
__decorateClass([
  query("a")
], TopNavItem.prototype, "anchor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TopNavItem.prototype, "selected", 2);
//# sourceMappingURL=TopNavItem.dev.js.map
