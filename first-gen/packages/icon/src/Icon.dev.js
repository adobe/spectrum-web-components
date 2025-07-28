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
import { html } from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { IconsetRegistry } from "@spectrum-web-components/iconset/src/iconset-registry.js";
import { IconBase } from "./IconBase.dev.js";
export class Icon extends IconBase {
  constructor() {
    super(...arguments);
    this.iconsetListener = (event) => {
      if (!this.name) {
        return;
      }
      const icon = this.parseIcon(this.name);
      if (event.detail.name === icon.iconset) {
        this.updateIconPromise = this.updateIcon();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("sp-iconset-added", this.iconsetListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("sp-iconset-added", this.iconsetListener);
  }
  firstUpdated() {
    this.updateIconPromise = this.updateIcon();
  }
  attributeChangedCallback(name, old, value) {
    super.attributeChangedCallback(name, old, value);
    this.updateIconPromise = this.updateIcon();
  }
  announceIconImageSrcError() {
    this.dispatchEvent(
      new Event("error", {
        cancelable: false,
        bubbles: false,
        composed: false
      })
    );
  }
  render() {
    if (this.name) {
      return html`
                <div id="container"></div>
            `;
    } else if (this.src) {
      return html`
                <img
                    src="${this.src}"
                    alt=${ifDefined(this.label)}
                    @error=${this.announceIconImageSrcError}
                />
            `;
    }
    return super.render();
  }
  async updateIcon() {
    if (this.updateIconPromise) {
      await this.updateIconPromise;
    }
    if (!this.name) {
      return Promise.resolve();
    }
    const icon = this.parseIcon(this.name);
    const iconset = IconsetRegistry.getInstance().getIconset(icon.iconset);
    if (!iconset) {
      return Promise.resolve();
    }
    if (!this.iconContainer) {
      return Promise.resolve();
    }
    this.iconContainer.innerHTML = "";
    return iconset.applyIconToElement(
      this.iconContainer,
      icon.icon,
      this.size || "",
      this.label ? this.label : ""
    );
  }
  parseIcon(icon) {
    const iconParts = icon.split(":");
    let iconsetName = "default";
    let iconName = icon;
    if (iconParts.length > 1) {
      iconsetName = iconParts[0];
      iconName = iconParts[1];
    }
    return { iconset: iconsetName, icon: iconName };
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.updateIconPromise;
    return complete;
  }
}
__decorateClass([
  property()
], Icon.prototype, "src", 2);
__decorateClass([
  property()
], Icon.prototype, "name", 2);
__decorateClass([
  query("#container")
], Icon.prototype, "iconContainer", 2);
//# sourceMappingURL=Icon.dev.js.map
