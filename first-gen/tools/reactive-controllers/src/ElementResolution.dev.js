"use strict";
export const elementResolverUpdatedSymbol = Symbol("element resolver updated");
export class ElementResolutionController {
  constructor(host, { selector } = { selector: "" }) {
    this._element = null;
    this._selector = "";
    this.mutationCallback = (mutationList) => {
      let needsResolution = false;
      mutationList.forEach((mutation) => {
        if (needsResolution) return;
        if (mutation.type === "childList") {
          const currentElementRemoved = this.element && [...mutation.removedNodes].includes(this.element);
          const matchingElementAdded = !!this.selector && [...mutation.addedNodes].some(
            this.elementIsSelected
          );
          needsResolution = needsResolution || currentElementRemoved || matchingElementAdded;
        }
        if (mutation.type === "attributes") {
          const attributeChangedOnCurrentElement = mutation.target === this.element;
          const attributeChangedOnMatchingElement = !!this.selector && this.elementIsSelected(mutation.target);
          needsResolution = needsResolution || attributeChangedOnCurrentElement || attributeChangedOnMatchingElement;
        }
      });
      if (needsResolution) {
        this.resolveElement();
      }
    };
    this.elementIsSelected = (el) => {
      var _a;
      return this.selectorIsId ? (el == null ? void 0 : el.id) === this.selectorAsId : (_a = el == null ? void 0 : el.matches) == null ? void 0 : _a.call(el, this.selector);
    };
    this.host = host;
    this.selector = selector;
    this.observer = new MutationObserver(this.mutationCallback);
    this.host.addController(this);
  }
  get element() {
    return this._element;
  }
  set element(element) {
    if (element === this.element) return;
    const previous = this.element;
    this._element = element;
    this.host.requestUpdate(elementResolverUpdatedSymbol, previous);
  }
  get selector() {
    return this._selector;
  }
  set selector(selector) {
    if (selector === this.selector) return;
    this.releaseElement();
    this._selector = selector;
    this.resolveElement();
  }
  get selectorAsId() {
    return this.selector.slice(1);
  }
  get selectorIsId() {
    return !!this.selector && this.selector.startsWith("#");
  }
  hostConnected() {
    this.resolveElement();
    this.observer.observe(this.host.getRootNode(), {
      subtree: true,
      childList: true,
      attributes: true
    });
  }
  hostDisconnected() {
    this.releaseElement();
    this.observer.disconnect();
  }
  resolveElement() {
    if (!this.selector) {
      this.releaseElement();
      return;
    }
    const parent = this.host.getRootNode();
    this.element = this.selectorIsId ? parent.getElementById(this.selectorAsId) : parent.querySelector(this.selector);
  }
  releaseElement() {
    this.element = null;
  }
}
//# sourceMappingURL=ElementResolution.dev.js.map
