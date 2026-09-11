"use strict";
var _a, _b, _c;
import { LitElement } from "lit";
import { coreVersion, version } from "./version.dev.js";
export function SpectrumMixin(constructor) {
  class SpectrumMixinElement extends constructor {
    get isLTR() {
      return getComputedStyle(this).direction !== "rtl";
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
      const activeElement = getAncestors(this.getRootNode())[0];
      if (!activeElement) {
        return false;
      }
      return activeElement.matches(":focus-visible") || activeElement.matches(".focus-visible");
    }
  }
  return SpectrumMixinElement;
}
export class SpectrumElement extends SpectrumMixin(LitElement) {
  get dir() {
    var _a2;
    return (_a2 = getComputedStyle(this).direction) != null ? _a2 : "ltr";
  }
}
/**
 * The version of the 1st-gen Spectrum Web Components library.
 */
SpectrumElement.VERSION = version;
/**
 * The version of the core base package.
 */
SpectrumElement.CORE_VERSION = coreVersion;
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
    DEBUG: true,
    ignoreWarningLocalNames: {
      ...((_a = window.__swc) == null ? void 0 : _a.ignoreWarningLocalNames) || {}
    },
    ignoreWarningTypes: {
      ...ignoreWarningTypes,
      ...((_b = window.__swc) == null ? void 0 : _b.ignoreWarningTypes) || {}
    },
    ignoreWarningLevels: {
      ...ignoreWarningLevels,
      ...((_c = window.__swc) == null ? void 0 : _c.ignoreWarningLevels) || {}
    },
    issuedWarnings: /* @__PURE__ */ new Set(),
    warn: (element, message, url, { type = "api", level = "default", issues } = {}) => {
      const { localName = "base" } = element || {};
      const id = `${localName}:${type}:${level}`;
      if (!window.__swc.verbose && window.__swc.issuedWarnings.has(id)) {
        return;
      }
      if (window.__swc.ignoreWarningLocalNames[localName]) {
        return;
      }
      if (window.__swc.ignoreWarningTypes[type]) {
        return;
      }
      if (window.__swc.ignoreWarningLevels[level]) {
        return;
      }
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
      messages.push(intro + message + "\n" + listedIssues + inspectElement);
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
