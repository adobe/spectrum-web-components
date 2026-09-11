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
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import avatarStyles from "./avatar.css.js";
const validSizes = [50, 75, 100, 200, 300, 400, 500, 600, 700];
const defaultSize = validSizes[2];
export class Avatar extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.src = "";
    this.isDecorative = false;
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
  /**
   * Renders the avatar image with appropriate accessibility attributes.
   * Label takes precedence over isDecorative. When decorative and has href,
   * aria-hidden is not set so the link remains accessible.
   */
  render() {
    let altValue = "";
    let ariaHidden;
    if (this.label) {
      altValue = this.label;
      ariaHidden = void 0;
    } else if (this.isDecorative) {
      altValue = "";
      ariaHidden = this.href ? void 0 : "true";
    } else {
      altValue = "";
      ariaHidden = void 0;
    }
    const avatar = html`
      <img
        class="image"
        alt=${altValue}
        aria-hidden=${ifDefined(ariaHidden)}
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
    this.warnMissingAlt();
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("label") || changes.has("isDecorative") || changes.has("href")) {
      this.warnMissingAlt();
    }
    if (true) {
      if (changes.has("label") && this.label) {
        window.__swc.warn(
          this,
          `<${this.localName}> the "label" attribute is deprecated and will be removed in Spectrum 2. Use the "alt" attribute instead.`,
          "https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/avatar-consumer-migration-guide--docs",
          { level: "deprecation" }
        );
      }
      if (changes.has("isDecorative") && this.isDecorative) {
        window.__swc.warn(
          this,
          `<${this.localName}> the "is-decorative" attribute is deprecated and will be removed in Spectrum 2. Use the "decorative" attribute instead.`,
          "https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/avatar-consumer-migration-guide--docs",
          { level: "deprecation" }
        );
      }
      if (changes.has("href") && this.href) {
        window.__swc.warn(
          this,
          `<${this.localName}> the "href" attribute is deprecated and will be removed in Spectrum 2. Wrap <${this.localName}> in an <a> element instead.`,
          "https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/avatar-consumer-migration-guide--docs",
          { level: "deprecation" }
        );
      }
    }
  }
  warnMissingAlt() {
    if (true) {
      if (!this.label && !this.isDecorative) {
        window.__swc.warn(
          this,
          `<${this.localName}> needs either a \`label\` attribute or \`is-decorative\` attribute to be accessible.`,
          "https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility",
          {
            type: "accessibility",
            issues: [
              "Provide a `label` attribute with meaningful alternative text for the avatar image, or",
              "Set `is-decorative` attribute to mark the avatar as decorative (hidden from screen readers)."
            ]
          }
        );
      } else if (this.isDecorative && this.href && !this.label) {
        window.__swc.warn(
          this,
          `<${this.localName}> with \`is-decorative\` and \`href\` requires a \`label\` attribute for the link to be accessible.`,
          "https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility",
          {
            type: "accessibility",
            issues: [
              "Provide a `label` attribute to give the link an accessible name.",
              "Decorative avatars should typically not be interactive links."
            ]
          }
        );
      }
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
  property({ type: Boolean, reflect: true, attribute: "is-decorative" })
], Avatar.prototype, "isDecorative", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], Avatar.prototype, "size", 1);
//# sourceMappingURL=Avatar.dev.js.map
