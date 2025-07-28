"use strict";
var _a, _b, _c;
import { LitElement } from "lit";
import { version } from "@spectrum-web-components/base/src/version.js";
const observedForElements = /* @__PURE__ */ new Set();
const updateRTL = () => {
  const dir = document.documentElement.dir === "rtl" ? document.documentElement.dir : "ltr";
  observedForElements.forEach((el) => {
    el.setAttribute("dir", dir);
  });
};
const rtlObserver = new MutationObserver(updateRTL);
rtlObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["dir"]
});
const canManageContentDirection = (el) => typeof el.startManagingContentDirection !== "undefined" || el.tagName === "SP-THEME";
export function SpectrumMixin(constructor) {
  class SpectrumMixinElement extends constructor {
    /**
     * @private
     */
    get isLTR() {
      return this.dir === "ltr";
    }
    hasVisibleFocusInTree() {
      const getAncestors = (root = document) => {
        var _a2;
        let currentNode = root.activeElement;
        while ((currentNode == null ? void 0 : currentNode.shadowRoot) && currentNode.shadowRoot.activeElement) {
          currentNode = currentNode.shadowRoot.activeElement;
        }
        const ancestors = currentNode ? [currentNode] : [];
        while (currentNode) {
          const ancestor = currentNode.assignedSlot || currentNode.parentElement || ((_a2 = currentNode.getRootNode()) == null ? void 0 : _a2.host);
          if (ancestor) {
            ancestors.push(ancestor);
          }
          currentNode = ancestor;
        }
        return ancestors;
      };
      const activeElement = getAncestors(
        this.getRootNode()
      )[0];
      if (!activeElement) {
        return false;
      }
      try {
        return activeElement.matches(":focus-visible") || activeElement.matches(".focus-visible");
      } catch (error) {
        return activeElement.matches(".focus-visible");
      }
    }
    connectedCallback() {
      if (!this.hasAttribute("dir")) {
        let dirParent = this.assignedSlot || this.parentNode;
        while (dirParent !== document.documentElement && !canManageContentDirection(
          dirParent
        )) {
          dirParent = dirParent.assignedSlot || // step into the shadow DOM of the parent of a slotted node
          dirParent.parentNode || // DOM Element detected
          dirParent.host;
        }
        this.dir = dirParent.dir === "rtl" ? dirParent.dir : this.dir || "ltr";
        if (dirParent === document.documentElement) {
          observedForElements.add(this);
        } else {
          const { localName } = dirParent;
          if (localName.search("-") > -1 && !customElements.get(localName)) {
            customElements.whenDefined(localName).then(() => {
              dirParent.startManagingContentDirection(this);
            });
          } else {
            dirParent.startManagingContentDirection(
              this
            );
          }
        }
        this._dirParent = dirParent;
      }
      super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this._dirParent) {
        if (this._dirParent === document.documentElement) {
          observedForElements.delete(this);
        } else {
          this._dirParent.stopManagingContentDirection(
            this
          );
        }
        this.removeAttribute("dir");
      }
    }
  }
  return SpectrumMixinElement;
}
export class SpectrumElement extends SpectrumMixin(LitElement) {
}
SpectrumElement.VERSION = version;
if (true) {
  const ignoreWarningTypes = {
    default: false,
    accessibility: false,
    api: false
  };
  const ignoreWarningLevels = {
    default: false,
    low: false,
    medium: false,
    high: false,
    deprecation: false
  };
  window.__swc = {
    ...window.__swc,
    ignoreWarningLocalNames: {
      /* c8 ignore next 1 */
      ...((_a = window.__swc) == null ? void 0 : _a.ignoreWarningLocalNames) || {}
    },
    ignoreWarningTypes: {
      ...ignoreWarningTypes,
      /* c8 ignore next 1 */
      ...((_b = window.__swc) == null ? void 0 : _b.ignoreWarningTypes) || {}
    },
    ignoreWarningLevels: {
      ...ignoreWarningLevels,
      /* c8 ignore next 1 */
      ...((_c = window.__swc) == null ? void 0 : _c.ignoreWarningLevels) || {}
    },
    issuedWarnings: /* @__PURE__ */ new Set(),
    warn: (element, message, url, { type = "api", level = "default", issues } = {}) => {
      const { localName = "base" } = element || {};
      const id = `${localName}:${type}:${level}`;
      if (!window.__swc.verbose && window.__swc.issuedWarnings.has(id))
        return;
      if (window.__swc.ignoreWarningLocalNames[localName]) return;
      if (window.__swc.ignoreWarningTypes[type]) return;
      if (window.__swc.ignoreWarningLevels[level]) return;
      window.__swc.issuedWarnings.add(id);
      let listedIssues = "";
      if (issues && issues.length) {
        issues.unshift("");
        listedIssues = issues.join("\n    - ") + "\n";
      }
      const intro = level === "deprecation" ? "DEPRECATION NOTICE: " : "";
      const inspectElement = element ? "\nInspect this issue in the follow element:" : "";
      const displayURL = (element ? "\n\n" : "\n") + url + "\n";
      const messages = [];
      messages.push(
        intro + message + "\n" + listedIssues + inspectElement
      );
      if (element) {
        messages.push(element);
      }
      messages.push(displayURL, {
        data: {
          localName,
          type,
          level
        }
      });
      console.warn(...messages);
    }
  };
  window.__swc.warn(
    void 0,
    "Spectrum Web Components is in dev mode. Not recommended for production!",
    "https://opensource.adobe.com/spectrum-web-components/dev-mode/",
    { type: "default" }
  );
}
//# sourceMappingURL=Base.dev.js.map
