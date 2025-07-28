"use strict";
export const systemResolverUpdatedSymbol = Symbol("system resolver updated");
export class SystemResolutionController {
  constructor(host) {
    this.system = "spectrum";
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    this.resolveSystem();
  }
  hostDisconnected() {
    var _a;
    (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
  }
  resolveSystem() {
    const querySystemEvent = new CustomEvent(
      "sp-system-context",
      {
        bubbles: true,
        composed: true,
        detail: {
          callback: (system, unsubscribe) => {
            const previous = this.system;
            this.system = system;
            this.unsubscribe = unsubscribe;
            this.host.requestUpdate(
              systemResolverUpdatedSymbol,
              previous
            );
          }
        },
        cancelable: true
      }
    );
    this.host.dispatchEvent(querySystemEvent);
  }
}
//# sourceMappingURL=SystemContextResolution.dev.js.map
