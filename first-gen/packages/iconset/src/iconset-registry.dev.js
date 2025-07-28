"use strict";
export class IconsetRegistry {
  constructor() {
    this.iconsetMap = /* @__PURE__ */ new Map();
  }
  // singleton getter
  static getInstance() {
    if (!IconsetRegistry.instance) {
      IconsetRegistry.instance = new IconsetRegistry();
    }
    return IconsetRegistry.instance;
  }
  addIconset(name, iconset) {
    this.iconsetMap.set(name, iconset);
    const event = new CustomEvent("sp-iconset-added", {
      bubbles: true,
      composed: true,
      detail: { name, iconset }
    });
    setTimeout(() => window.dispatchEvent(event), 0);
  }
  removeIconset(name) {
    this.iconsetMap.delete(name);
    const event = new CustomEvent("sp-iconset-removed", {
      bubbles: true,
      composed: true,
      detail: { name }
    });
    setTimeout(() => window.dispatchEvent(event), 0);
  }
  getIconset(name) {
    return this.iconsetMap.get(name);
  }
}
//# sourceMappingURL=iconset-registry.dev.js.map
