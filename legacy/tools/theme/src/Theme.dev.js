"use strict";
import { version } from "@spectrum-web-components/base/src/version.js";
import {
  COLOR_VALUES,
  SCALE_VALUES,
  SYSTEM_VARIANT_VALUES
} from "./theme-interfaces.dev.js";
const _Theme = class _Theme extends HTMLElement {
  constructor() {
    super();
    this._dir = "";
    this._system = "spectrum";
    this._color = "";
    this._scale = "";
    this._systemContextConsumers = /* @__PURE__ */ new Map();
    this.trackedChildren = /* @__PURE__ */ new Set();
    this._updateRequested = false;
    this._contextConsumers = /* @__PURE__ */ new Map();
    this.attachShadow({ mode: "open" });
    const node = document.importNode(_Theme.template.content, true);
    this.shadowRoot.appendChild(node);
    this.shouldAdoptStyles();
    this.addEventListener(
      "sp-language-context",
      this._handleContextPresence
    );
    this.addEventListener(
      "sp-system-context",
      this._handleSystemContext
    );
    this.updateComplete = this.__createDeferredPromise();
  }
  static get observedAttributes() {
    return ["color", "scale", "lang", "dir", "system"];
  }
  set dir(dir) {
    if (dir === this.dir) return;
    this.setAttribute("dir", dir);
    this._dir = dir;
    const targetDir = dir === "rtl" ? dir : "ltr";
    this.trackedChildren.forEach((el) => {
      el.setAttribute("dir", targetDir);
    });
  }
  /**
   * Reading direction of the content scoped to this `sp-theme` element.
   * @type {"ltr" | "rtl" | ""}
   * @attr
   */
  get dir() {
    return this._dir;
  }
  attributeChangedCallback(attrName, old, value) {
    if (old === value) {
      return;
    }
    if (attrName === "color") {
      this.color = value;
    } else if (attrName === "scale") {
      this.scale = value;
    } else if (attrName === "lang" && !!value) {
      this.lang = value;
      this._provideContext();
    } else if (attrName === "system") {
      this.system = value;
      this._provideSystemContext();
    } else if (attrName === "dir") {
      this.dir = value;
    }
  }
  requestUpdate() {
    this.shouldAdoptStyles();
  }
  /**
   * The Spectrum system that is applied to the content scoped to this `sp-theme` element.
   *
   * A value is requried.
   * @type {"spectrum" | "express" }
   * @attr
   */
  get system() {
    const systemFragments = _Theme.themeFragmentsByKind.get("system");
    const { name } = systemFragments && systemFragments.get("default") || {};
    return this._system || name || "";
  }
  set system(newValue) {
    if (newValue === this._system) return;
    const system = !!newValue && SYSTEM_VARIANT_VALUES.includes(newValue) ? newValue : this.system;
    if (system !== this._system) {
      this._system = system;
      this.requestUpdate();
    }
    if (system) {
      this.setAttribute("system", system);
    } else {
      this.removeAttribute("system");
    }
  }
  /**
   * The Spectrum color stops to apply to content scoped by this `sp-theme` element.
   *
   * A value is requried.
   * @type {"lightest" | "light" | "dark" | "darkest" | ""}
   * @attr
   */
  get color() {
    const themeFragments = _Theme.themeFragmentsByKind.get("color");
    const { name } = themeFragments && themeFragments.get("default") || {};
    return this._color || name || "";
  }
  set color(newValue) {
    if (newValue === this._color) return;
    const color = !!newValue && COLOR_VALUES.includes(newValue) ? newValue : this.color;
    if (color !== this._color) {
      this._color = color;
      this.requestUpdate();
    }
    if (color) {
      this.setAttribute("color", color);
    } else {
      this.removeAttribute("color");
    }
  }
  /**
   * The Spectrum platform scale to apply to content scoped by this `sp-theme` element.
   *
   * A value is requried.
   * @type {"medium" | "large" | ""}
   * @attr
   */
  get scale() {
    const themeFragments = _Theme.themeFragmentsByKind.get("scale");
    const { name } = themeFragments && themeFragments.get("default") || {};
    return this._scale || name || "";
  }
  set scale(newValue) {
    if (newValue === this._scale) return;
    const scale = !!newValue && SCALE_VALUES.includes(newValue) ? newValue : this.scale;
    if (scale !== this._scale) {
      this._scale = scale;
      this.requestUpdate();
    }
    if (scale) {
      this.setAttribute("scale", scale);
    } else {
      this.removeAttribute("scale");
    }
  }
  get styles() {
    const themeKinds = [
      ..._Theme.themeFragmentsByKind.keys()
    ];
    const getStyle = (fragments, name, kind) => {
      const currentStyles = kind && kind !== "system" && this.system !== "spectrum" ? fragments.get(`${name}-${this.system}`) : fragments.get(name);
      const isAppliedFragment = name === "spectrum" || !kind || this.hasAttribute(kind);
      if (currentStyles && isAppliedFragment) {
        return currentStyles.styles;
      }
      return;
    };
    const styles = themeKinds.reduce((acc, kind) => {
      const kindFragments = _Theme.themeFragmentsByKind.get(
        kind
      );
      let style;
      if (kind === "app" || kind === "core") {
        style = getStyle(kindFragments, kind);
      } else {
        const { [kind]: name } = this;
        style = getStyle(kindFragments, name, kind);
      }
      if (style) {
        acc.push(style);
      }
      return acc;
    }, []);
    const themeFragmentsByKind = _Theme.themeFragmentsByKind;
    checkForIssues(
      this,
      this.system,
      this.color,
      this.scale,
      themeFragmentsByKind
    );
    return [...styles];
  }
  static get template() {
    if (!this.templateElement) {
      this.templateElement = document.createElement("template");
      this.templateElement.innerHTML = "<slot></slot>";
    }
    return this.templateElement;
  }
  _handleSystemContext(event) {
    event.stopPropagation();
    const target = event.composedPath()[0];
    if (this._systemContextConsumers.has(target)) {
      return;
    }
    const unsubscribe = () => this._systemContextConsumers.delete(target);
    this._systemContextConsumers.set(target, [
      event.detail.callback,
      unsubscribe
    ]);
    const [callback] = this._systemContextConsumers.get(target) || [];
    if (callback) {
      callback(this.system, unsubscribe);
    }
  }
  __createDeferredPromise() {
    return new Promise((resolve) => {
      this.__resolve = resolve;
    });
  }
  connectedCallback() {
    this.shouldAdoptStyles();
    _Theme.instances.add(this);
    if (!this.hasAttribute("dir")) {
      let dirParent = this.assignedSlot || this.parentNode;
      while (dirParent !== document.documentElement && !(dirParent instanceof _Theme)) {
        dirParent = dirParent.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        dirParent.parentNode || // DOM Element detected
        dirParent.host;
      }
      this.dir = dirParent.dir === "rtl" ? dirParent.dir : "ltr";
    }
  }
  disconnectedCallback() {
    _Theme.instances.delete(this);
  }
  startManagingContentDirection(el) {
    this.trackedChildren.add(el);
  }
  stopManagingContentDirection(el) {
    this.trackedChildren.delete(el);
  }
  async shouldAdoptStyles() {
    if (!this._updateRequested) {
      this.updateComplete = this.__createDeferredPromise();
      this._updateRequested = true;
      this._updateRequested = await false;
      this.adoptStyles();
      this.__resolve(true);
    }
  }
  adoptStyles() {
    const styles = this.styles;
    const styleSheets = [];
    for (const style of styles) {
      styleSheets.push(style.styleSheet);
    }
    this.shadowRoot.adoptedStyleSheets = styleSheets;
  }
  static registerThemeFragment(name, kind, styles) {
    const fragmentMap = _Theme.themeFragmentsByKind.get(kind) || /* @__PURE__ */ new Map();
    if (fragmentMap.size === 0) {
      _Theme.themeFragmentsByKind.set(kind, fragmentMap);
      fragmentMap.set("default", { name, styles });
      _Theme.defaultFragments.add(name);
    }
    fragmentMap.set(name, { name, styles });
    _Theme.instances.forEach((instance) => instance.shouldAdoptStyles());
  }
  /* c8 ignore next 5 */
  _provideContext() {
    this._contextConsumers.forEach(
      ([callback, unsubscribe]) => callback(this.lang, unsubscribe)
    );
  }
  _provideSystemContext() {
    this._systemContextConsumers.forEach(
      ([callback, unsubscribe]) => callback(this.system, unsubscribe)
    );
  }
  _handleContextPresence(event) {
    event.stopPropagation();
    const target = event.composedPath()[0];
    if (this._contextConsumers.has(target)) {
      return;
    }
    this._contextConsumers.set(target, [
      event.detail.callback,
      () => this._contextConsumers.delete(target)
    ]);
    const [callback, unsubscribe] = this._contextConsumers.get(target) || [];
    if (callback && unsubscribe) {
      callback(
        this.lang || document.documentElement.lang || navigator.language,
        unsubscribe
      );
    }
  }
};
_Theme.themeFragmentsByKind = /* @__PURE__ */ new Map();
_Theme.defaultFragments = /* @__PURE__ */ new Set(["spectrum"]);
_Theme.instances = /* @__PURE__ */ new Set();
_Theme.VERSION = version;
export let Theme = _Theme;
function checkForIssues(instance, system, color, scale, themeFragmentsByKind) {
  if (true) {
    const issues = [];
    const checkForAttribute = (name, resolvedValue, actualValue) => {
      var _a;
      const systemModifier = system && system !== "spectrum" ? `-${system}` : "";
      if (!resolvedValue) {
        issues.push(
          `You have not explicitly set the "${name}" attribute and there is no default value on which to fallback.`
        );
      } else if (!actualValue) {
        issues.push(
          `You have not explicitly set the "${name}" attribute, the default value ("${resolvedValue}") is being used as a fallback.`
        );
      } else if (!((_a = themeFragmentsByKind.get(name)) == null ? void 0 : _a.get(
        resolvedValue + (name === "system" ? "" : systemModifier)
      ))) {
        issues.push(
          `You have set "${name}='${resolvedValue}'" but the associated system fragment has not been loaded.`
        );
      }
    };
    if (["lightest", "darkest"].includes(color || "")) {
      issues.push(
        `DEPRECATION NOTICE: Color "lightest" and "darkest" are deprecated. For more information, see: https://opensource.adobe.com/spectrum-web-components/tools/theme/`
      );
    }
    checkForAttribute("system", system, instance.getAttribute("system"));
    checkForAttribute("color", color, instance.getAttribute("color"));
    checkForAttribute("scale", scale, instance.getAttribute("scale"));
    if (issues.length) {
      window.__swc.warn(
        instance,
        "You are leveraging an <sp-theme> element and the following issues may disrupt your theme delivery:",
        "https://opensource.adobe.com/spectrum-web-components/components/theme/#example",
        { issues }
      );
    }
  }
}
//# sourceMappingURL=Theme.dev.js.map
