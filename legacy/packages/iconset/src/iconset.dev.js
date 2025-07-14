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
import { IconsetRegistry } from "./iconset-registry.dev.js";
import { LitElement } from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
export class Iconset extends LitElement {
  constructor() {
    super(...arguments);
    this.registered = false;
    this.handleRemoved = ({
      detail
    }) => {
      if (detail.name === this.name) {
        this.registered = false;
        this.addIconset();
      }
    };
  }
  firstUpdated() {
    this.style.display = "none";
    if (true) {
      window.__swc.warn(
        this,
        "Iconsets have been deprecated and will be removed from the project in an upcoming version. For default Spectrum Icons, learn more about leveraging UI Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) or Workflow Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) as an alternative.",
        "https://opensource.adobe.com/spectrum-web-components/components/iconset/#deprecated",
        { level: "deprecation" }
      );
    }
  }
  set name(value) {
    if (this.registered) {
      if (this._name) {
        IconsetRegistry.getInstance().removeIconset(this._name);
      }
      if (value) {
        IconsetRegistry.getInstance().addIconset(value, this);
      }
    }
    this._name = value;
  }
  get name() {
    return this._name;
  }
  /**
   * On updated we register the iconset if we're not already registered
   */
  connectedCallback() {
    super.connectedCallback();
    this.addIconset();
    window.addEventListener("sp-iconset-removed", this.handleRemoved);
  }
  /**
   * On disconnected we remove the iconset
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("sp-iconset-removed", this.handleRemoved);
    this.removeIconset();
  }
  addIconset() {
    if (!this.name || this.registered) {
      return;
    }
    IconsetRegistry.getInstance().addIconset(this.name, this);
    this.registered = true;
  }
  removeIconset() {
    if (!this.name) {
      return;
    }
    IconsetRegistry.getInstance().removeIconset(this.name);
    this.registered = false;
  }
}
__decorateClass([
  property()
], Iconset.prototype, "name", 1);
//# sourceMappingURL=iconset.dev.js.map
