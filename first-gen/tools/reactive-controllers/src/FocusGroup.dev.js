"use strict";
function ensureMethod(value, type, fallback) {
  if (typeof value === type) {
    return () => value;
  } else if (typeof value === "function") {
    return value;
  }
  return fallback;
}
export class FocusGroupController {
  constructor(host, {
    hostDelegatesFocus,
    direction,
    elementEnterAction,
    elements,
    focusInIndex,
    isFocusableElement,
    listenerScope
  } = { elements: () => [] }) {
    this._currentIndex = -1;
    this.prevIndex = -1;
    this._direction = () => "both";
    this.directionLength = 5;
    this.hostDelegatesFocus = false;
    this.elementEnterAction = (_el) => {
      return;
    };
    this._focused = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this._focusInIndex = (_elements) => 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.isFocusableElement = (_el) => true;
    this._listenerScope = () => this.host;
    // When elements are virtualized, the delta between the first element
    // and the first rendered element.
    this.offset = 0;
    this.recentlyConnected = false;
    this.handleFocusin = (event) => {
      if (!this.isEventWithinListenerScope(event)) return;
      const path = event.composedPath();
      let targetIndex = -1;
      path.find((el) => {
        targetIndex = this.elements.indexOf(el);
        return targetIndex !== -1;
      });
      this.prevIndex = this.currentIndex;
      this.currentIndex = targetIndex > -1 ? targetIndex : this.currentIndex;
      if (this.isRelatedTargetOrContainAnElement(event)) {
        this.hostContainsFocus();
      }
    };
    /**
     * handleClick - Finds the element that was clicked and sets the tabindex to 0
     * @returns void
     */
    this.handleClick = () => {
      var _a;
      const elements = this.elements;
      if (!elements.length) return;
      let focusElement = elements[this.currentIndex];
      if (this.currentIndex < 0) {
        return;
      }
      if (!focusElement || !this.isFocusableElement(focusElement)) {
        this.setCurrentIndexCircularly(1);
        focusElement = elements[this.currentIndex];
      }
      if (focusElement && this.isFocusableElement(focusElement)) {
        (_a = elements[this.prevIndex]) == null ? void 0 : _a.setAttribute("tabindex", "-1");
        focusElement.setAttribute("tabindex", "0");
      }
    };
    this.handleFocusout = (event) => {
      if (this.isRelatedTargetOrContainAnElement(event)) {
        this.hostNoLongerContainsFocus();
      }
    };
    this.handleKeydown = (event) => {
      if (!this.acceptsEventKey(event.key) || event.defaultPrevented) {
        return;
      }
      let diff = 0;
      this.prevIndex = this.currentIndex;
      switch (event.key) {
        case "ArrowRight":
          diff += 1;
          break;
        case "ArrowDown":
          diff += this.direction === "grid" ? this.directionLength : 1;
          break;
        case "ArrowLeft":
          diff -= 1;
          break;
        case "ArrowUp":
          diff -= this.direction === "grid" ? this.directionLength : 1;
          break;
        case "End":
          this.currentIndex = 0;
          diff -= 1;
          break;
        case "Home":
          this.currentIndex = this.elements.length - 1;
          diff += 1;
          break;
      }
      event.preventDefault();
      if (this.direction === "grid" && this.currentIndex + diff < 0) {
        this.currentIndex = 0;
      } else if (this.direction === "grid" && this.currentIndex + diff > this.elements.length - 1) {
        this.currentIndex = this.elements.length - 1;
      } else {
        this.setCurrentIndexCircularly(diff);
      }
      this.elementEnterAction(this.elements[this.currentIndex]);
      this.focus();
    };
    this.mutationObserver = new MutationObserver(() => {
      this.handleItemMutation();
    });
    this.hostDelegatesFocus = hostDelegatesFocus || false;
    this.host = host;
    this.host.addController(this);
    this._elements = elements;
    this.isFocusableElement = isFocusableElement || this.isFocusableElement;
    this._direction = ensureMethod(
      direction,
      "string",
      this._direction
    );
    this.elementEnterAction = elementEnterAction || this.elementEnterAction;
    this._focusInIndex = ensureMethod(
      focusInIndex,
      "number",
      this._focusInIndex
    );
    this._listenerScope = ensureMethod(
      listenerScope,
      "object",
      this._listenerScope
    );
  }
  get currentIndex() {
    if (this._currentIndex === -1) {
      this._currentIndex = this.focusInIndex;
    }
    return this._currentIndex - this.offset;
  }
  set currentIndex(currentIndex) {
    this._currentIndex = currentIndex + this.offset;
  }
  get direction() {
    return this._direction();
  }
  get elements() {
    if (!this.cachedElements) {
      this.cachedElements = this._elements();
    }
    return this.cachedElements;
  }
  set focused(focused) {
    if (focused === this.focused) return;
    this._focused = focused;
  }
  get focused() {
    return this._focused;
  }
  get focusInElement() {
    return this.elements[this.focusInIndex];
  }
  get focusInIndex() {
    return this._focusInIndex(this.elements);
  }
  isEventWithinListenerScope(event) {
    if (this._listenerScope() === this.host) return true;
    return event.composedPath().includes(this._listenerScope());
  }
  /*  In  handleItemMutation() method the first if condition is checking if the element is not focused or if the element's children's length is not decreasing then it means no element has been deleted and we must return.
      Then we are checking if the deleted element was the focused one before the deletion if so then we need to proceed else we casn return;
  */
  handleItemMutation() {
    if (this._currentIndex == -1 || this.elements.length <= this._elements().length)
      return;
    const focusedElement = this.elements[this.currentIndex];
    this.clearElementCache();
    if (this.elements.includes(focusedElement)) return;
    const moveToNextElement = this.currentIndex !== this.elements.length;
    const diff = moveToNextElement ? 1 : -1;
    if (moveToNextElement) {
      this.setCurrentIndexCircularly(-1);
    }
    this.setCurrentIndexCircularly(diff);
    this.focus();
  }
  update({ elements } = { elements: () => [] }) {
    this.unmanage();
    this._elements = elements;
    this.clearElementCache();
    this.manage();
  }
  /**
   * resets the focusedItem to initial item
   */
  reset() {
    var _a;
    const elements = this.elements;
    if (!elements.length) return;
    this.setCurrentIndexCircularly(this.focusInIndex - this.currentIndex);
    let focusElement = elements[this.currentIndex];
    if (this.currentIndex < 0) {
      return;
    }
    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      (_a = elements[this.prevIndex]) == null ? void 0 : _a.setAttribute("tabindex", "-1");
      focusElement.setAttribute("tabindex", "0");
    }
  }
  focusOnItem(item, options) {
    var _a;
    const elements = this.elements || [];
    const newIndex = !item || !this.isFocusableElement(item) ? -1 : elements.indexOf(item);
    if (newIndex > -1) {
      this.currentIndex = newIndex;
      (_a = elements[this.prevIndex]) == null ? void 0 : _a.setAttribute("tabindex", "-1");
    }
    this.focus(options);
  }
  focus(options) {
    var _a;
    const elements = this.elements;
    if (!elements.length) return;
    let focusElement = elements[this.currentIndex];
    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      if (!this.hostDelegatesFocus || elements[this.prevIndex] !== focusElement) {
        (_a = elements[this.prevIndex]) == null ? void 0 : _a.setAttribute("tabindex", "-1");
      }
      focusElement.tabIndex = 0;
      focusElement.focus(options);
      if (this.hostDelegatesFocus && !this.focused) {
        this.hostContainsFocus();
      }
    }
  }
  clearElementCache(offset = 0) {
    this.mutationObserver.disconnect();
    delete this.cachedElements;
    this.offset = offset;
    requestAnimationFrame(() => {
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true
        });
      });
    });
  }
  setCurrentIndexCircularly(diff) {
    const { length } = this.elements;
    let steps = length;
    this.prevIndex = this.currentIndex;
    let nextIndex = (length + this.currentIndex + diff) % length;
    while (
      // don't cycle the elements more than once
      steps && this.elements[nextIndex] && !this.isFocusableElement(this.elements[nextIndex])
    ) {
      nextIndex = (length + nextIndex + diff) % length;
      steps -= 1;
    }
    this.currentIndex = nextIndex;
  }
  hostContainsFocus() {
    this.host.addEventListener("focusout", this.handleFocusout);
    this.host.addEventListener("keydown", this.handleKeydown);
    this.focused = true;
  }
  hostNoLongerContainsFocus() {
    this.host.addEventListener("focusin", this.handleFocusin);
    this.host.removeEventListener("focusout", this.handleFocusout);
    this.host.removeEventListener("keydown", this.handleKeydown);
    this.focused = false;
  }
  isRelatedTargetOrContainAnElement(event) {
    const relatedTarget = event.relatedTarget;
    const isRelatedTargetAnElement = this.elements.includes(
      relatedTarget
    );
    const isRelatedTargetContainedWithinElements = this.elements.some(
      (el) => el.contains(relatedTarget)
    );
    return !(isRelatedTargetAnElement || isRelatedTargetContainedWithinElements);
  }
  acceptsEventKey(key) {
    if (key === "End" || key === "Home") {
      return true;
    }
    switch (this.direction) {
      case "horizontal":
        return key === "ArrowLeft" || key === "ArrowRight";
      case "vertical":
        return key === "ArrowUp" || key === "ArrowDown";
      case "both":
      case "grid":
        return key.startsWith("Arrow");
    }
  }
  manage() {
    this.addEventListeners();
  }
  unmanage() {
    this.removeEventListeners();
  }
  addEventListeners() {
    this.host.addEventListener("focusin", this.handleFocusin);
    this.host.addEventListener("click", this.handleClick);
  }
  removeEventListeners() {
    this.host.removeEventListener("focusin", this.handleFocusin);
    this.host.removeEventListener("focusout", this.handleFocusout);
    this.host.removeEventListener("keydown", this.handleKeydown);
    this.host.removeEventListener("click", this.handleClick);
  }
  hostConnected() {
    this.recentlyConnected = true;
    this.addEventListeners();
  }
  hostDisconnected() {
    this.mutationObserver.disconnect();
    this.removeEventListeners();
  }
  hostUpdated() {
    if (this.recentlyConnected) {
      this.recentlyConnected = false;
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true
        });
      });
    }
  }
}
//# sourceMappingURL=FocusGroup.dev.js.map
