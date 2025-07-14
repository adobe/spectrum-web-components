"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { PendingStateController } from "@spectrum-web-components/reactive-controllers/src/PendingState.js";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
import { Textfield } from "@spectrum-web-components/textfield";
export class ComboboxBase extends Textfield {
  /**
   * Initializes the `PendingStateController` for the Combobox component.
   * When the pending state changes to `true`, the `open` property of the Combobox is set to `false`.
   */
  constructor() {
    super();
    this.autocomplete = "none";
    this.availableOptions = [];
    this.open = false;
    this.pending = false;
    this.pendingLabel = "Pending";
    this.overlayOpen = false;
    this.itemValue = "";
    this.optionEls = [];
    this.applyFocusElementLabel = (value) => {
      this.appliedLabel = value;
    };
    this._returnItems = () => {
      return;
    };
    this.pendingStateController = new PendingStateController(this);
  }
  focus() {
    this.focusElement.focus();
  }
  click() {
    this.focus();
    this.focusElement.click();
  }
  scrollToActiveDescendant() {
    if (!this.activeDescendant) {
      return;
    }
    const activeEl = this.shadowRoot.getElementById(
      this.activeDescendant.value
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }
  handleComboboxKeydown(event) {
    if (this.readonly || this.pending) {
      return;
    }
    if (event.altKey && event.code === "ArrowDown") {
      this.open = true;
    } else if (event.code === "ArrowDown") {
      event.preventDefault();
      this.open = true;
      this.activateNextDescendant();
      this.scrollToActiveDescendant();
    } else if (event.code === "ArrowUp") {
      event.preventDefault();
      this.open = true;
      this.activatePreviousDescendant();
      this.scrollToActiveDescendant();
    } else if (event.code === "Escape") {
      if (!this.open) {
        this.value = "";
      }
      this.open = false;
    } else if (event.code === "Enter") {
      this.selectDescendant();
      this.open = false;
    } else if (event.code === "Home") {
      this.focusElement.setSelectionRange(0, 0);
      this.activeDescendant = void 0;
    } else if (event.code === "End") {
      const { length } = this.value;
      this.focusElement.setSelectionRange(length, length);
      this.activeDescendant = void 0;
    } else if (event.code === "ArrowLeft") {
      this.activeDescendant = void 0;
    } else if (event.code === "ArrowRight") {
      this.activeDescendant = void 0;
    }
  }
  /**
   * Convert the flattened array of assigned elements of `slot[name='option']` to
   * an array of `ComboboxOptions` for use in rendering options in the shadow DOM.s
   **/
  handleSlotchange() {
    this.setOptionsFromSlottedItems();
    this.itemObserver.disconnect();
    this.optionEls.map((item) => {
      this.itemObserver.observe(item, {
        attributes: true,
        attributeFilter: ["id"],
        childList: true
      });
    });
  }
  handleTooltipSlotchange(event) {
    this.tooltipEl = event.target.assignedElements()[0];
  }
  setOptionsFromSlottedItems() {
    const elements = this.optionSlot.assignedElements({
      flatten: true
    });
    this.optionEls = elements;
  }
  activateNextDescendant() {
    const activeIndex = !this.activeDescendant ? -1 : this.availableOptions.indexOf(this.activeDescendant);
    let nextActiveIndex = activeIndex;
    do {
      nextActiveIndex = (this.availableOptions.length + nextActiveIndex + 1) % this.availableOptions.length;
      if (nextActiveIndex === activeIndex) {
        break;
      }
    } while (this.availableOptions[nextActiveIndex].disabled);
    if (!this.availableOptions[nextActiveIndex].disabled) {
      this.activeDescendant = this.availableOptions[nextActiveIndex];
    }
    this.optionEls.forEach(
      (el) => {
        var _a;
        return el.setAttribute(
          "aria-selected",
          el.value === ((_a = this.activeDescendant) == null ? void 0 : _a.value) ? "true" : "false"
        );
      }
    );
  }
  activatePreviousDescendant() {
    const activeIndex = !this.activeDescendant ? 0 : this.availableOptions.indexOf(this.activeDescendant);
    let previousActiveIndex = activeIndex;
    do {
      previousActiveIndex = (this.availableOptions.length + previousActiveIndex - 1) % this.availableOptions.length;
      if (previousActiveIndex === activeIndex) {
        break;
      }
    } while (this.availableOptions[previousActiveIndex].disabled);
    if (!this.availableOptions[previousActiveIndex].disabled) {
      this.activeDescendant = this.availableOptions[previousActiveIndex];
    }
    this.optionEls.forEach(
      (el) => {
        var _a;
        return el.setAttribute(
          "aria-selected",
          el.value === ((_a = this.activeDescendant) == null ? void 0 : _a.value) ? "true" : "false"
        );
      }
    );
  }
  selectDescendant() {
    if (!this.activeDescendant) {
      return;
    }
    const activeEl = this.shadowRoot.getElementById(
      this.activeDescendant.value
    );
    if (activeEl) {
      activeEl.click();
    }
  }
  filterAvailableOptions() {
    if (this.autocomplete === "none" || this.pending) {
      return;
    }
    const valueLowerCase = this.value.toLowerCase();
    this.availableOptions = (this.options || this.optionEls).filter(
      (descendant) => {
        const itemTextLowerCase = descendant.itemText.toLowerCase();
        return itemTextLowerCase.startsWith(valueLowerCase);
      }
    );
  }
  handleInput(event) {
    super.handleInput(event);
    if (!this.pending) {
      this.activeDescendant = void 0;
      this.open = true;
    }
  }
  handleMenuChange(event) {
    const { target } = event;
    const selected = (this.options || this.optionEls).find(
      (item) => item.value === (target == null ? void 0 : target.value)
    );
    this.value = (selected == null ? void 0 : selected.itemText) || "";
    event.preventDefault();
    this.open = false;
    this._returnItems();
    this.focus();
  }
  handleClosed() {
    this.open = false;
    this.overlayOpen = false;
  }
  handleOpened() {
  }
  toggleOpen() {
    if (this.readonly || this.pending) {
      this.open = false;
      return;
    }
    this.open = !this.open;
    this.inputElement.focus();
  }
  shouldUpdate(changed) {
    var _a, _b;
    if (changed.has("open")) {
      if (!this.open) {
        this.activeDescendant = void 0;
      } else {
        this.overlayOpen = true;
      }
    }
    if (changed.has("value")) {
      this.filterAvailableOptions();
      this.itemValue = (_b = (_a = this.availableOptions.find(
        (option) => option.itemText === this.value
      )) == null ? void 0 : _a.value) != null ? _b : "";
    }
    return super.shouldUpdate(changed);
  }
  onBlur(event) {
    if (event.relatedTarget && (this.contains(event.relatedTarget) || this.shadowRoot.contains(event.relatedTarget))) {
      return;
    }
    super.onBlur(event);
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.addEventListener("focusout", (event) => {
      const isMenuItem = event.relatedTarget && this.contains(event.relatedTarget);
      if (event.target === this && !isMenuItem) {
        this.focused = false;
      }
    });
  }
  async manageListOverlay() {
    if (this.open) {
      this.focused = true;
      this.focus();
    }
  }
  updated(changed) {
    var _a;
    if (changed.has("open") && !this.pending) {
      this.manageListOverlay();
    }
    if (!this.focused && this.open) {
      this.open = false;
    }
    if (changed.has("pending") && this.pending) {
      this.open = false;
    }
    if (changed.has("activeDescendant")) {
      const previouslyActiveDescendant = changed.get(
        "activeDescendant"
      );
      if (previouslyActiveDescendant) {
        previouslyActiveDescendant.focused = false;
      }
      if (this.activeDescendant && typeof this.activeDescendant.focused !== "undefined") {
        this.activeDescendant.focused = true;
      }
    }
    if (changed.has("options") || changed.has("optionEls")) {
      if ((_a = this.options) == null ? void 0 : _a.every((option) => option.disabled)) {
        this.disabled = true;
      }
      this.availableOptions = this.options || this.optionEls;
    }
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    const list = this.shadowRoot.querySelector(
      "#listbox"
    );
    if (list) {
      const descendants = [...list.children];
      await Promise.all(
        descendants.map((descendant) => descendant.updateComplete)
      );
    }
    return complete;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.itemObserver) {
      this.itemObserver = new MutationObserver(
        this.setOptionsFromSlottedItems.bind(this)
      );
    }
  }
  disconnectedCallback() {
    this.itemObserver.disconnect();
    this.open = false;
    super.disconnectedCallback();
  }
}
__decorateClass([
  state()
], ComboboxBase.prototype, "activeDescendant", 2);
__decorateClass([
  property({ type: String })
], ComboboxBase.prototype, "autocomplete", 2);
__decorateClass([
  state()
], ComboboxBase.prototype, "availableOptions", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ComboboxBase.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ComboboxBase.prototype, "pending", 2);
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], ComboboxBase.prototype, "pendingLabel", 2);
__decorateClass([
  query("slot:not([name])")
], ComboboxBase.prototype, "optionSlot", 2);
__decorateClass([
  state()
], ComboboxBase.prototype, "overlayOpen", 2);
__decorateClass([
  query("#input")
], ComboboxBase.prototype, "input", 2);
__decorateClass([
  property({ type: Array })
], ComboboxBase.prototype, "options", 2);
__decorateClass([
  state()
], ComboboxBase.prototype, "optionEls", 2);
//# sourceMappingURL=combobox.base.dev.js.map
