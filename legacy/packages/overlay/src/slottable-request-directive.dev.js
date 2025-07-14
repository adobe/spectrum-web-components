"use strict";
import {
  nothing,
  render
} from "@spectrum-web-components/base";
import {
  AsyncDirective,
  directive
} from "@spectrum-web-components/base/src/async-directive.js";
import {
  removeSlottableRequest
} from "./slottable-request-event.dev.js";
export class SlottableRequestDirective extends AsyncDirective {
  /* c8 ignore next 9 */
  render(_template) {
    return nothing;
  }
  update(part, [template]) {
    this.template = template;
    if (this.target !== part.element) {
      this.target = part.element;
      this.renderBefore = this.target.children[0];
    }
    this.listenerHost = this.target;
    this.init();
  }
  handleSlottableRequest(event) {
    if (event.target !== event.currentTarget) return;
    const willRemoveSlottable = event.data === removeSlottableRequest;
    render(willRemoveSlottable ? void 0 : this.template(), this.target, {
      renderBefore: this.renderBefore
    });
  }
  init() {
    var _a;
    (_a = this.listeners) == null ? void 0 : _a.abort();
    this.listeners = new AbortController();
    const { signal } = this.listeners;
    this.listenerHost.addEventListener(
      "slottable-request",
      (event) => this.handleSlottableRequest(event),
      { signal }
    );
    if (true) {
      window.__swc.warn(
        void 0,
        `\u26A0\uFE0F  WARNING \u26A0\uFE0F : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.`,
        "https://opensource.adobe.com/spectrum-web-components/components/overlay",
        {
          level: "high",
          type: "api"
        }
      );
    }
  }
  disconnected() {
    var _a;
    (_a = this.listeners) == null ? void 0 : _a.abort();
  }
  /* c8 ignore next 3 */
  reconnected() {
    this.init();
  }
}
export const slottableRequest = directive(SlottableRequestDirective);
//# sourceMappingURL=slottable-request-directive.dev.js.map
