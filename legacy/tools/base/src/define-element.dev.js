"use strict";
export function defineElement(name, constructor) {
  if (window.__swc && true) {
    if (customElements.get(name)) {
      window.__swc.warn(
        void 0,
        `Attempted to redefine <${name}>. This usually indicates that multiple versions of the same web component were loaded onto a single page.`,
        "https://opensource.adobe.com/spectrum-web-components/registry-conflicts"
      );
    }
  }
  customElements.define(name, constructor);
}
//# sourceMappingURL=define-element.dev.js.map
