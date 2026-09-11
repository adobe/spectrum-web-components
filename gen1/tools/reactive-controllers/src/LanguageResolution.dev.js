"use strict";
export const languageResolverUpdatedSymbol = Symbol(
  "language resolver updated"
);
const listeners = /* @__PURE__ */ new Set();
let sharedObserver;
function addLangListener(listener) {
  listeners.add(listener);
  if (!sharedObserver) {
    sharedObserver = new MutationObserver(() => {
      for (const cb of listeners) {
        cb();
      }
    });
    sharedObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      sharedObserver == null ? void 0 : sharedObserver.disconnect();
      sharedObserver = void 0;
    }
  };
}
export class LanguageResolutionController {
  constructor(host) {
    /**
     * The currently resolved language/locale code (e.g., 'en-US', 'fr-FR').
     * Defaults to document language, browser language, or 'en-US'.
     */
    this.language = this.getDocumentLanguage();
    this.host = host;
    this.host.addController(this);
  }
  /**
   * Reads language from document and validates. Used for initial value and
   * when syncing from `<html lang>` changes.
   */
  getDocumentLanguage() {
    const raw = document.documentElement.lang || navigator.language || "en-US";
    try {
      Intl.DateTimeFormat.supportedLocalesOf([raw]);
      return raw;
    } catch (e) {
      return "en-US";
    }
  }
  hostConnected() {
    this.resolveLanguage();
    this.removeLangListener = addLangListener(this.handleLangChange.bind(this));
  }
  hostDisconnected() {
    var _a, _b;
    (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
    this.unsubscribe = void 0;
    (_b = this.removeLangListener) == null ? void 0 : _b.call(this);
    this.removeLangListener = void 0;
  }
  /**
   * Called by the shared observer when `<html lang>` changes.
   * Skipped when a provider (e.g. sp-theme) is the source of truth.
   */
  handleLangChange() {
    if (this.unsubscribe) {
      return;
    }
    const next = this.getDocumentLanguage();
    if (next === this.language) {
      return;
    }
    const previous = this.language;
    this.language = next;
    this.host.requestUpdate(languageResolverUpdatedSymbol, previous);
  }
  /**
   * Resolves the language: syncs from document, then queries for a provider
   * (e.g. sp-theme) via 'sp-language-context'. If a provider calls the
   * callback, it becomes the source of truth until disconnected.
   */
  resolveLanguage() {
    this.language = this.getDocumentLanguage();
    const queryThemeEvent = new CustomEvent(
      "sp-language-context",
      {
        bubbles: true,
        composed: true,
        detail: {
          callback: (lang, unsubscribe) => {
            const previous = this.language;
            this.language = lang;
            this.unsubscribe = unsubscribe;
            this.host.requestUpdate(languageResolverUpdatedSymbol, previous);
          }
        },
        cancelable: true
      }
    );
    this.host.dispatchEvent(queryThemeEvent);
  }
}
//# sourceMappingURL=LanguageResolution.dev.js.map
