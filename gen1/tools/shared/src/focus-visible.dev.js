"use strict";
let hasFocusVisible = true;
try {
  document.body.querySelector(":focus-visible");
} catch (error) {
  if (true) {
    window.__swc.warn(
      void 0,
      `The :focus-visible polyfill is not supported in this browser.`,
      "https://github.com/WICG/focus-visible/pull/196",
      {
        issues: [error instanceof Error ? error.message : "Unknown error"]
      }
    );
  }
  hasFocusVisible = false;
  import("focus-visible");
}
export const FocusVisiblePolyfillMixin = (SuperClass) => {
  var _a, _b;
  const coordinateWithPolyfill = (instance) => {
    if (instance.shadowRoot == null || instance.hasAttribute("data-js-focus-visible")) {
      return () => {
      };
    }
    if (self.applyFocusVisiblePolyfill) {
      self.applyFocusVisiblePolyfill(instance.shadowRoot);
      if (instance.manageAutoFocus) {
        instance.manageAutoFocus();
      }
    } else {
      const coordinationHandler = () => {
        if (self.applyFocusVisiblePolyfill && instance.shadowRoot) {
          self.applyFocusVisiblePolyfill(instance.shadowRoot);
        }
        if (instance.manageAutoFocus) {
          instance.manageAutoFocus();
        }
      };
      self.addEventListener(
        "focus-visible-polyfill-ready",
        coordinationHandler,
        { once: true }
      );
      return () => {
        self.removeEventListener(
          "focus-visible-polyfill-ready",
          coordinationHandler
        );
      };
    }
    return () => {
    };
  };
  const $endPolyfillCoordination = Symbol("endPolyfillCoordination");
  class FocusVisibleCoordinator extends (_b = SuperClass, _a = $endPolyfillCoordination, _b) {
    constructor() {
      super(...arguments);
      this[_a] = null;
    }
    // Attempt to coordinate with the polyfill when connected to the
    // document:
    connectedCallback() {
      var _a2;
      (_a2 = super.connectedCallback) == null ? void 0 : _a2.call(this);
      if (!hasFocusVisible) {
        requestAnimationFrame(() => {
          if (this[$endPolyfillCoordination] == null) {
            this[$endPolyfillCoordination] = coordinateWithPolyfill(this);
          }
        });
      }
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = super.disconnectedCallback) == null ? void 0 : _a2.call(this);
      if (!hasFocusVisible) {
        requestAnimationFrame(() => {
          if (this[$endPolyfillCoordination] != null) {
            this[$endPolyfillCoordination]();
            this[$endPolyfillCoordination] = null;
          }
        });
      }
    }
  }
  return FocusVisibleCoordinator;
};
//# sourceMappingURL=focus-visible.dev.js.map
