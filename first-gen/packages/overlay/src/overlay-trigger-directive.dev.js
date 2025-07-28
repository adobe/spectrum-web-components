"use strict";
import {
  nothing,
  render
} from "@spectrum-web-components/base";
import { directive } from "@spectrum-web-components/base/src/async-directive.js";
import { strategies } from "./strategies.dev.js";
import {
  removeSlottableRequest
} from "./slottable-request-event.dev.js";
import { SlottableRequestDirective } from "./slottable-request-directive.dev.js";
import { AbstractOverlay } from "./AbstractOverlay.dev.js";
import { InteractionTypes } from "./InteractionController.dev.js";
export class OverlayTriggerDirective extends SlottableRequestDirective {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      triggerInteraction: "click",
      overlayOptions: {
        type: "auto",
        offset: 0
      }
    };
    this.options = {
      ...this.defaultOptions.overlayOptions
    };
  }
  /* c8 ignore next 9 */
  render(_template, _options) {
    return nothing;
  }
  update(part, [template, options]) {
    var _a, _b, _c, _d;
    this.options = {
      ...this.defaultOptions.overlayOptions,
      ...options == null ? void 0 : options.overlayOptions
    };
    this.insertionOptions = options == null ? void 0 : options.insertionOptions;
    this.template = template;
    this.host = (_a = part.options) == null ? void 0 : _a.host;
    let newTarget = false;
    const triggerInteraction = (options == null ? void 0 : options.triggerInteraction) || this.defaultOptions.triggerInteraction;
    const newStrategy = InteractionTypes[(_b = this.strategy) == null ? void 0 : _b.type] !== triggerInteraction;
    if (this.target !== part.element) {
      this.target = part.element;
      newTarget = true;
    }
    if (newTarget || newStrategy) {
      (_c = this.strategy) == null ? void 0 : _c.abort();
      this.strategy = new strategies[triggerInteraction](this.target, {
        isPersistent: true,
        handleOverlayReady: (overlay) => {
          this.listenerHost = this.overlay = overlay;
          this.init();
        }
      });
    }
    this.strategy.open = (_d = options == null ? void 0 : options.open) != null ? _d : false;
  }
  handleSlottableRequest(event) {
    var _a, _b;
    if (event.target !== event.currentTarget) return;
    const willRemoveSlottable = event.data === removeSlottableRequest;
    const options = {};
    if (this.host) {
      options.host = this.host;
    }
    render(
      willRemoveSlottable ? void 0 : this.template(),
      this.overlay,
      options
    );
    if (willRemoveSlottable) {
      this.overlay.remove();
    } else {
      AbstractOverlay.applyOptions(this.overlay, {
        ...this.options,
        trigger: this.target
      });
      const insertionEl = typeof ((_a = this.insertionOptions) == null ? void 0 : _a.el) === "function" ? this.insertionOptions.el() : ((_b = this.insertionOptions) == null ? void 0 : _b.el) || this.target;
      const { where = "afterend" } = this.insertionOptions || {};
      insertionEl.insertAdjacentElement(where, this.overlay);
    }
  }
}
export const trigger = directive(OverlayTriggerDirective);
//# sourceMappingURL=overlay-trigger-directive.dev.js.map
