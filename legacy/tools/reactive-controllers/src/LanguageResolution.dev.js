"use strict";
export const languageResolverUpdatedSymbol = Symbol(
  "language resolver updated"
);
export class LanguageResolutionController {
  constructor(host) {
    this.language = document.documentElement.lang || navigator.language;
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    this.resolveLanguage();
  }
  hostDisconnected() {
    var _a;
    (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
  }
  resolveLanguage() {
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
            this.host.requestUpdate(
              languageResolverUpdatedSymbol,
              previous
            );
          }
        },
        cancelable: true
      }
    );
    this.host.dispatchEvent(queryThemeEvent);
  }
}
//# sourceMappingURL=LanguageResolution.dev.js.map
