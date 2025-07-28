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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export function LikeAnchor(constructor) {
  class LikeAnchorElement extends constructor {
    renderAnchor({
      id,
      className,
      ariaHidden,
      labelledby,
      tabindex,
      // prettier-ignore
      anchorContent = html`<slot></slot>`
    }) {
      return html`<a
                    id=${id}
                    class=${ifDefined(className)}
                    href=${ifDefined(this.href)}
                    download=${ifDefined(this.download)}
                    target=${ifDefined(this.target)}
                    aria-label=${ifDefined(this.label)}
                    aria-labelledby=${ifDefined(labelledby)}
                    aria-hidden=${ifDefined(ariaHidden ? "true" : void 0)}
                    tabindex=${ifDefined(tabindex)}
                    referrerpolicy=${ifDefined(this.referrerpolicy)}
                    rel=${ifDefined(this.rel)}
                >${anchorContent}</a>`;
    }
  }
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "download", 2);
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "label", 2);
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "href", 2);
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "target", 2);
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "referrerpolicy", 2);
  __decorateClass([
    property()
  ], LikeAnchorElement.prototype, "rel", 2);
  return LikeAnchorElement;
}
//# sourceMappingURL=like-anchor.dev.js.map
