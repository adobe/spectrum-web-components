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
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import avatarStyles from "./avatar.css.js";
const validSizes = [50, 75, 100, 200, 300, 400, 500, 600, 700];
const defaultSize = validSizes[2];
export class Avatar extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.src = "";
    this._size = defaultSize;
  }
  static get styles() {
    return [avatarStyles];
  }
  get focusElement() {
    return this.anchorElement || this;
  }
  get size() {
    return this._size;
  }
  set size(value) {
    const size = value;
    const validSize = validSizes.includes(size) ? size : defaultSize;
    if (validSize) {
      this.setAttribute("size", `${validSize}`);
    }
    if (this._size === validSize) {
      return;
    }
    const oldSize = this._size;
    this._size = validSize;
    this.requestUpdate("size", oldSize);
  }
  render() {
    const avatar = html`
            <img
                class="image"
                alt=${ifDefined(this.label || void 0)}
                src=${this.src}
            />
        `;
    if (this.href) {
      return this.renderAnchor({
        id: "link",
        className: "link",
        anchorContent: avatar
      });
    }
    return avatar;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", `${this.size}`);
    }
  }
}
__decorateClass([
  query("#link")
], Avatar.prototype, "anchorElement", 2);
__decorateClass([
  property()
], Avatar.prototype, "src", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], Avatar.prototype, "size", 1);
//# sourceMappingURL=Avatar.dev.js.map
