"use strict";
import { SpectrumElement } from "@spectrum-web-components/base";
import { reparentChildren } from "@spectrum-web-components/shared/src/reparent-children.js";
import { OverlayTimer } from "./overlay-timer.dev.js";
export const overlayTimer = new OverlayTimer();
export const noop = () => {
  return;
};
export const guaranteedAllTransitionend = (el, action, cb) => {
  const abortController = new AbortController();
  const runningTransitions = /* @__PURE__ */ new Map();
  const cleanup = () => {
    abortController.abort();
    cb();
  };
  let guarantee2;
  let guarantee3;
  const guarantee1 = requestAnimationFrame(() => {
    guarantee2 = requestAnimationFrame(() => {
      guarantee3 = requestAnimationFrame(() => {
        cleanup();
      });
    });
  });
  const handleTransitionend = (event) => {
    if (event.target !== el) {
      return;
    }
    runningTransitions.set(
      event.propertyName,
      runningTransitions.get(event.propertyName) - 1
    );
    if (!runningTransitions.get(event.propertyName)) {
      runningTransitions.delete(event.propertyName);
    }
    if (runningTransitions.size === 0) {
      cleanup();
    }
  };
  const handleTransitionrun = (event) => {
    if (event.target !== el) {
      return;
    }
    if (!runningTransitions.has(event.propertyName)) {
      runningTransitions.set(event.propertyName, 0);
    }
    runningTransitions.set(
      event.propertyName,
      runningTransitions.get(event.propertyName) + 1
    );
    cancelAnimationFrame(guarantee1);
    cancelAnimationFrame(guarantee2);
    cancelAnimationFrame(guarantee3);
  };
  el.addEventListener("transitionrun", handleTransitionrun, {
    signal: abortController.signal
  });
  el.addEventListener("transitionend", handleTransitionend, {
    signal: abortController.signal
  });
  el.addEventListener("transitioncancel", handleTransitionend, {
    signal: abortController.signal
  });
  action();
};
export function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
export class AbstractOverlay extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.dispose = noop;
    this.offset = 0;
    this.willPreventClose = false;
  }
  async applyFocus(_targetOpenState, _focusEl) {
    return;
  }
  /* c8 ignore next 6 */
  get delayed() {
    return false;
  }
  set delayed(_delayed) {
    return;
  }
  /* c8 ignore next 6 */
  get disabled() {
    return false;
  }
  set disabled(_disabled) {
    return;
  }
  get elementResolver() {
    return this._elementResolver;
  }
  set elementResolver(controller) {
    this._elementResolver = controller;
  }
  /* c8 ignore next 3 */
  async ensureOnDOM(_targetOpenState) {
    return;
  }
  /* c8 ignore next 5 */
  async makeTransition(_targetOpenState) {
    return null;
  }
  async manageDelay(_targetOpenState) {
    return;
  }
  /* c8 ignore next 3 */
  async managePopoverOpen() {
    return;
  }
  /* c8 ignore next 3 */
  managePosition() {
    return;
  }
  /* c8 ignore next 6 */
  get open() {
    return false;
  }
  set open(_open) {
    return;
  }
  get placementController() {
    return this._placementController;
  }
  set placementController(controller) {
    this._placementController = controller;
  }
  requestSlottable() {
  }
  returnFocus() {
    return;
  }
  /* c8 ignore next 6 */
  get state() {
    return "closed";
  }
  set state(_state) {
    return;
  }
  /* c8 ignore next 3 */
  manuallyKeepOpen() {
    return;
  }
  static update() {
    const overlayUpdateEvent = new CustomEvent("sp-update-overlays", {
      bubbles: true,
      composed: true,
      cancelable: true
    });
    document.dispatchEvent(overlayUpdateEvent);
  }
  static async open(triggerOrContent, interactionOrOptions, content, optionsV1) {
    await import("@spectrum-web-components/overlay/sp-overlay.js");
    const v2 = arguments.length === 2;
    const overlayContent = content || triggerOrContent;
    const overlay = new this();
    let restored = false;
    overlay.dispose = () => {
      overlay.addEventListener("sp-closed", () => {
        if (!restored) {
          restoreContent();
          restored = true;
        }
        requestAnimationFrame(() => {
          overlay.remove();
        });
      });
      overlay.open = false;
      overlay.dispose = noop;
    };
    const restoreContent = reparentChildren([overlayContent], overlay, {
      position: "beforeend",
      prepareCallback: (el) => {
        const slot = el.slot;
        el.removeAttribute("slot");
        return () => {
          el.slot = slot;
        };
      }
    });
    const v1 = !v2 && overlayContent && optionsV1;
    if (v1) {
      if (true) {
        window.__swc.warn(
          overlay,
          `You are interacting with an ${overlay.localName} element via a deprecated imperative API. This API will be removed in a future version of the SWC library. Consider leveraging an ${overlay.localName} directly.`,
          "https://opensource.adobe.com/spectrum-web-components/components/overlay/",
          { level: "deprecation" }
        );
      }
      const trigger = triggerOrContent;
      const interaction = interactionOrOptions;
      const options2 = optionsV1;
      AbstractOverlay.applyOptions(overlay, {
        ...options2,
        delayed: options2.delayed || overlayContent.hasAttribute("delayed"),
        trigger: options2.virtualTrigger || trigger,
        type: interaction === "modal" ? "modal" : interaction === "hover" ? "hint" : "auto"
      });
      trigger.insertAdjacentElement("afterend", overlay);
      await overlay.updateComplete;
      overlay.open = true;
      return overlay.dispose;
    }
    const options = interactionOrOptions;
    overlay.append(overlayContent);
    AbstractOverlay.applyOptions(overlay, {
      ...options,
      delayed: options.delayed || overlayContent.hasAttribute("delayed")
    });
    overlay.updateComplete.then(() => {
      overlay.open = true;
    });
    return overlay;
  }
  static applyOptions(overlay, options) {
    var _a, _b;
    overlay.delayed = !!options.delayed;
    overlay.receivesFocus = (_a = options.receivesFocus) != null ? _a : "auto";
    overlay.triggerElement = options.trigger || null;
    overlay.type = options.type || "modal";
    overlay.offset = (_b = options.offset) != null ? _b : 0;
    overlay.placement = options.placement;
    overlay.willPreventClose = !!options.notImmediatelyClosable;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
//# sourceMappingURL=AbstractOverlay.dev.js.map
