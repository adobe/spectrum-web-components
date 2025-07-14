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
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import linkStyles from "./link.css.js";
export class Link extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.quiet = false;
  }
  static get styles() {
    return [linkStyles];
  }
  get focusElement() {
    return this.anchorElement;
  }
  render() {
    return this.renderAnchor({ id: "anchor" });
  }
}
__decorateClass([
  query("#anchor")
], Link.prototype, "anchorElement", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Link.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], Link.prototype, "staticColor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "quiet" })
], Link.prototype, "quiet", 2);
//# sourceMappingURL=Link.dev.js.map
