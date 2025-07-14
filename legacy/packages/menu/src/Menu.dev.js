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
  html,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import menuStyles from "./menu.css.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
export class Menu extends SizedMixin(SpectrumElement, { noDefaultSize: true }) {
  constructor() {
    super();
    this.label = "";
    this.ignore = false;
    this.value = "";
    this.valueSeparator = ",";
    this._selected = [];
    this.selectedItems = [];
    this.childItemSet = /* @__PURE__ */ new Set();
    this.focusedItemIndex = 0;
    this.focusInItemIndex = 0;
    /**
     * Whether to support the pointerdown-drag-pointerup selection strategy.
     * Defaults to false to prevent click/touch events from being captured
     * behind the menu tray in mobile environments (since the menu closes
     * immediately on pointerup).
     */
    this.shouldSupportDragAndSelect = false;
    this.selectedItemsMap = /* @__PURE__ */ new Map();
    // if the click and pointerup events are on the same target, we should not
    // handle the click event.
    this.pointerUpTarget = null;
    this.descendentOverlays = /* @__PURE__ */ new Map();
    this.handleSubmenuClosed = (event) => {
      event.stopPropagation();
      const target = event.composedPath()[0];
      target.dispatchEvent(
        new Event("sp-menu-submenu-closed", {
          bubbles: true,
          composed: true
        })
      );
    };
    this.handleSubmenuOpened = (event) => {
      event.stopPropagation();
      const target = event.composedPath()[0];
      target.dispatchEvent(
        new Event("sp-menu-submenu-opened", {
          bubbles: true,
          composed: true
        })
      );
      const openedItem = event.composedPath().find((el) => this.childItemSet.has(el));
      if (!openedItem) return;
    };
    this._hasUpdatedSelectedItemIndex = false;
    this._willUpdateItems = false;
    this.cacheUpdated = Promise.resolve();
    /* c8 ignore next 3 */
    this.resolveCacheUpdated = () => {
      return;
    };
    if (!this.rovingTabindexController && this.controlsRovingTabindex) {
      this.rovingTabindexController = new RovingTabindexController(this, {
        direction: "vertical",
        focusInIndex: (elements) => {
          let firstEnabledIndex = -1;
          const firstSelectedIndex = elements == null ? void 0 : elements.findIndex(
            (el, index) => {
              if (!elements[firstEnabledIndex] && !el.disabled) {
                firstEnabledIndex = index;
              }
              return el.selected && !el.disabled;
            }
          );
          return elements && firstSelectedIndex && elements[firstSelectedIndex] ? firstSelectedIndex : firstEnabledIndex;
        },
        elements: () => this.childItems,
        isFocusableElement: this.isFocusableElement.bind(this),
        hostDelegatesFocus: true
      });
    }
    this.addEventListener(
      "sp-menu-item-added-or-updated",
      this.onSelectableItemAddedOrUpdated
    );
    this.addEventListener(
      "sp-menu-item-added-or-updated",
      this.onFocusableItemAddedOrUpdated,
      {
        capture: true
      }
    );
    this.addEventListener("click", this.handleClick);
    this.addEventListener("touchend", this.handlePointerup);
    this.addEventListener("focusout", this.handleFocusout);
    this.addEventListener("sp-menu-item-keydown", this.handleKeydown);
    this.addEventListener("pointerup", this.handlePointerup);
    this.addEventListener("sp-opened", this.handleSubmenuOpened);
    this.addEventListener("sp-closed", this.handleSubmenuClosed);
  }
  static get styles() {
    return [menuStyles];
  }
  get isSubmenu() {
    return this.slot === "submenu";
  }
  get selected() {
    return !this.selects ? [] : this._selected;
  }
  set selected(selected) {
    if (selected === this.selected) {
      return;
    }
    const old = this.selected;
    this._selected = selected;
    this.selectedItems = [];
    this.selectedItemsMap.clear();
    this.childItems.forEach((item) => {
      if (this !== item.menuData.selectionRoot) {
        return;
      }
      item.selected = this.selected.includes(item.value);
      if (item.selected) {
        this.selectedItems.push(item);
        this.selectedItemsMap.set(item, true);
      }
    });
    this.requestUpdate("selected", old);
  }
  get focusInItem() {
    var _a;
    return (_a = this.rovingTabindexController) == null ? void 0 : _a.focusInElement;
  }
  get controlsRovingTabindex() {
    return true;
  }
  /**
   * child items managed by menu
   */
  get childItems() {
    if (!this.cachedChildItems) {
      this.cachedChildItems = this.updateCachedMenuItems();
    }
    return this.cachedChildItems;
  }
  updateCachedMenuItems() {
    var _a;
    if (!this.menuSlot) {
      return [];
    }
    const itemsList = [];
    const slottedElements = this.menuSlot.assignedElements({
      flatten: true
    });
    for (const [i, slottedElement] of slottedElements.entries()) {
      if (this.childItemSet.has(slottedElement)) {
        itemsList.push(slottedElement);
        continue;
      }
      const isHTMLSlotElement = slottedElement.localName === "slot";
      const flattenedChildren = isHTMLSlotElement ? slottedElement.assignedElements({
        flatten: true
      }) : [...slottedElement.querySelectorAll(`:scope > *`)];
      slottedElements.splice(
        i,
        1,
        slottedElement,
        ...flattenedChildren
      );
    }
    this.cachedChildItems = [...itemsList];
    (_a = this.rovingTabindexController) == null ? void 0 : _a.clearElementCache();
    return this.cachedChildItems;
  }
  /**
   * Hide this getter from web-component-analyzer until
   * https://github.com/runem/web-component-analyzer/issues/131
   * has been addressed.
   *
   * @private
   */
  get childRole() {
    if (this.resolvedRole === "listbox") {
      return "option";
    }
    switch (this.resolvedSelects) {
      case "single":
        return "menuitemradio";
      case "multiple":
        return "menuitemcheckbox";
      default:
        return "menuitem";
    }
  }
  get ownRole() {
    return "menu";
  }
  /**
   * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
   * this event to announce its presence in the DOM. During the CAPTURE phase the first
   * Menu based element that the event encounters will manage the focus state of the
   * dispatching `<sp-menu-item>` element.
   * @param event
   */
  onFocusableItemAddedOrUpdated(event) {
    event.menuCascade.set(this, {
      hadFocusRoot: !!event.item.menuData.focusRoot,
      ancestorWithSelects: event.currentAncestorWithSelects
    });
    if (this.selects) {
      event.currentAncestorWithSelects = this;
    }
    event.item.menuData.focusRoot = event.item.menuData.focusRoot || this;
  }
  /**
   * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
   * this event to announce its presence in the DOM. During the BUBBLE phase the first
   * Menu based element that the event encounters that does not inherit selection will
   * manage the selection state of the dispatching `<sp-menu-item>` element.
   * @param event
   */
  onSelectableItemAddedOrUpdated(event) {
    var _a, _b;
    const cascadeData = event.menuCascade.get(this);
    if (!cascadeData) return;
    event.item.menuData.parentMenu = event.item.menuData.parentMenu || this;
    this.addChildItem(event.item);
    if (this.selects === "inherit") {
      this.resolvedSelects = "inherit";
      const ignoreMenu = (_a = event.currentAncestorWithSelects) == null ? void 0 : _a.ignore;
      this.resolvedRole = ignoreMenu ? "none" : ((_b = event.currentAncestorWithSelects) == null ? void 0 : _b.getAttribute("role")) || this.getAttribute("role") || void 0;
    } else if (this.selects) {
      this.resolvedRole = this.ignore ? "none" : this.getAttribute("role") || void 0;
      this.resolvedSelects = this.selects;
    } else {
      this.resolvedRole = this.ignore ? "none" : this.getAttribute("role") || void 0;
      this.resolvedSelects = this.resolvedRole === "none" ? "ignore" : "none";
    }
    if (this.resolvedRole === "none") {
      return;
    }
    const selects = this.resolvedSelects === "single" || this.resolvedSelects === "multiple";
    event.item.menuData.cleanupSteps.push(
      (item) => this.removeChildItem(item)
    );
    if ((selects || !this.selects && this.resolvedSelects !== "ignore") && !event.item.menuData.selectionRoot) {
      event.item.setRole(this.childRole);
      event.item.menuData.selectionRoot = event.item.menuData.selectionRoot || this;
      if (event.item.selected) {
        this.selectedItemsMap.set(event.item, true);
        this.selectedItems = [...this.selectedItems, event.item];
        this._selected = [...this.selected, event.item.value];
        this.value = this.selected.join(this.valueSeparator);
      }
    }
  }
  addChildItem(item) {
    this.childItemSet.add(item);
    this.handleItemsChanged();
  }
  async removeChildItem(item) {
    if (item.focused || item.hasAttribute("focused") || item.active) {
      this._updateFocus = this.getNeighboringFocusableElement(item);
    }
    this.childItemSet.delete(item);
    this.cachedChildItems = void 0;
  }
  /**
   * for picker elements, will set focus on first selected item
   */
  focusOnFirstSelectedItem({
    preventScroll
  } = {}) {
    var _a;
    if (!this.rovingTabindexController) return;
    const selectedItem = this.selectedItems.find(
      (el) => this.isFocusableElement(el)
    );
    if (!selectedItem) {
      this.focus({ preventScroll });
      return;
    }
    if (selectedItem && !preventScroll) {
      selectedItem.scrollIntoView({ block: "nearest" });
    }
    (_a = this.rovingTabindexController) == null ? void 0 : _a.focusOnItem(selectedItem);
  }
  focus({ preventScroll } = {}) {
    if (this.rovingTabindexController) {
      if (!this.childItems.length || this.childItems.every((childItem) => childItem.disabled)) {
        return;
      }
      if (this.childItems.some(
        (childItem) => childItem.menuData.focusRoot !== this
      )) {
        super.focus({ preventScroll });
        return;
      }
      this.rovingTabindexController.focus({ preventScroll });
    }
  }
  handleFocusout() {
    var _a;
    if (!this.matches(":focus-within"))
      (_a = this.rovingTabindexController) == null ? void 0 : _a.reset();
  }
  handleClick(event) {
    if (this.pointerUpTarget === event.target) {
      this.pointerUpTarget = null;
      return;
    }
    this.handlePointerBasedSelection(event);
  }
  handlePointerup(event) {
    if (!this.shouldSupportDragAndSelect) {
      return;
    }
    this.pointerUpTarget = event.target;
    this.handlePointerBasedSelection(event);
  }
  async handlePointerBasedSelection(event) {
    var _a, _b;
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }
    const path = event.composedPath();
    const target = path.find((el) => {
      if (!(el instanceof Element)) {
        return false;
      }
      return el.getAttribute("role") === this.childRole;
    });
    if (event.defaultPrevented) {
      const index = this.childItems.indexOf(target);
      if (((_a = target == null ? void 0 : target.menuData) == null ? void 0 : _a.focusRoot) === this && index > -1) {
        this.focusedItemIndex = index;
      }
      return;
    }
    if ((target == null ? void 0 : target.href) && target.href.length) {
      this.dispatchEvent(
        new Event("change", {
          bubbles: true,
          composed: true
        })
      );
      return;
    } else if (((_b = target == null ? void 0 : target.menuData) == null ? void 0 : _b.selectionRoot) === this && this.childItems.length) {
      event.preventDefault();
      if (target.hasSubmenu || target.open) {
        return;
      }
      this.selectOrToggleItem(target);
    } else {
      return;
    }
    this.prepareToCleanUp();
  }
  handleDescendentOverlayOpened(event) {
    const target = event.composedPath()[0];
    if (!target.overlayElement) return;
    this.descendentOverlays.set(
      target.overlayElement,
      target.overlayElement
    );
  }
  handleDescendentOverlayClosed(event) {
    const target = event.composedPath()[0];
    if (!target.overlayElement) return;
    this.descendentOverlays.delete(target.overlayElement);
  }
  /**
   * given a menu item, returns the next focusable menu item before or after it;
   * if no menu item is provided, returns the first focusable menu item
   * @param menuItem {MenuItem}
   * @param before {boolean} return the item before; default is false
   * @returns {MenuItem}
   */
  getNeighboringFocusableElement(menuItem, before = false) {
    var _a;
    const diff = before ? -1 : 1;
    const elements = ((_a = this.rovingTabindexController) == null ? void 0 : _a.elements) || [];
    const index = !!menuItem ? elements.indexOf(menuItem) : -1;
    let newIndex = Math.min(Math.max(0, index + diff), elements.length - 1);
    while (!this.isFocusableElement(elements[newIndex]) && 0 < newIndex && newIndex < elements.length - 1) {
      newIndex += diff;
    }
    return !!this.isFocusableElement(elements[newIndex]) ? elements[newIndex] : menuItem || elements[0];
  }
  async selectOrToggleItem(targetItem) {
    var _a;
    const resolvedSelects = this.resolvedSelects;
    const oldSelectedItemsMap = new Map(this.selectedItemsMap);
    const oldSelected = this.selected.slice();
    const oldSelectedItems = this.selectedItems.slice();
    const oldValue = this.value;
    if (targetItem.menuData.selectionRoot !== this) {
      return;
    }
    if (resolvedSelects === "multiple") {
      if (this.selectedItemsMap.has(targetItem)) {
        this.selectedItemsMap.delete(targetItem);
      } else {
        this.selectedItemsMap.set(targetItem, true);
      }
      const selected = [];
      const selectedItems = [];
      this.childItemSet.forEach((childItem) => {
        if (childItem.menuData.selectionRoot !== this) return;
        if (this.selectedItemsMap.has(childItem)) {
          selected.push(childItem.value);
          selectedItems.push(childItem);
        }
      });
      this._selected = selected;
      this.selectedItems = selectedItems;
      this.value = this.selected.join(this.valueSeparator);
    } else {
      this.selectedItemsMap.clear();
      this.selectedItemsMap.set(targetItem, true);
      this.value = targetItem.value;
      this._selected = [targetItem.value];
      this.selectedItems = [targetItem];
    }
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        cancelable: true,
        bubbles: true,
        composed: true
      })
    );
    if (!applyDefault) {
      this._selected = oldSelected;
      this.selectedItems = oldSelectedItems;
      this.selectedItemsMap = oldSelectedItemsMap;
      this.value = oldValue;
      return;
    }
    if (resolvedSelects === "single") {
      for (const oldItem of oldSelectedItemsMap.keys()) {
        if (oldItem !== targetItem) {
          oldItem.selected = false;
        }
      }
      targetItem.selected = true;
    } else if (resolvedSelects === "multiple") {
      targetItem.selected = !targetItem.selected;
    } else if (!targetItem.hasSubmenu && ((_a = targetItem == null ? void 0 : targetItem.menuData) == null ? void 0 : _a.focusRoot) === this) {
      this.dispatchEvent(new Event("close", { bubbles: true }));
    }
  }
  navigateBetweenRelatedMenus(event) {
    const { key, root } = event;
    const shouldOpenSubmenu = this.isLTR && key === "ArrowRight" || !this.isLTR && key === "ArrowLeft";
    const shouldCloseSelfAsSubmenu = this.isLTR && key === "ArrowLeft" || !this.isLTR && key === "ArrowRight" || key === "Escape";
    const lastFocusedItem = root;
    if (shouldOpenSubmenu) {
      if (lastFocusedItem == null ? void 0 : lastFocusedItem.hasSubmenu) {
        event.stopPropagation();
        lastFocusedItem.openOverlay(true);
      }
    } else if (shouldCloseSelfAsSubmenu && this.isSubmenu) {
      event.stopPropagation();
      this.dispatchEvent(new Event("close", { bubbles: true }));
      this.updateSelectedItemIndex();
    }
  }
  handleKeydown(event) {
    var _a;
    if (event.defaultPrevented || !this.rovingTabindexController) {
      return;
    }
    const { key, root, shiftKey, target } = event;
    const openSubmenuKey = ["Enter", " "].includes(key);
    if (shiftKey && target !== this && this.hasAttribute("tabindex")) {
      this.removeAttribute("tabindex");
      const replaceTabindex = (event2) => {
        if (!event2.shiftKey && !this.hasAttribute("tabindex")) {
          document.removeEventListener("keyup", replaceTabindex);
          this.removeEventListener("focusout", replaceTabindex);
        }
      };
      document.addEventListener("keyup", replaceTabindex);
      this.addEventListener("focusout", replaceTabindex);
    }
    if (key === "Tab") {
      this.closeDescendentOverlays();
      return;
    }
    if (openSubmenuKey && (root == null ? void 0 : root.hasSubmenu) && !root.open) {
      event.preventDefault();
      root.openOverlay(true);
      return;
    }
    if (key === " " || key === "Enter") {
      event.preventDefault();
      (_a = root == null ? void 0 : root.focusElement) == null ? void 0 : _a.click();
      if (root) this.selectOrToggleItem(root);
      return;
    }
    this.navigateBetweenRelatedMenus(event);
  }
  /**
   * on focus, removes focus from focus styling item, and updates the selected item index
   */
  prepareToCleanUp() {
    document.addEventListener(
      "focusout",
      () => {
        requestAnimationFrame(() => {
          const focusedItem = this.focusInItem;
          if (focusedItem) {
            focusedItem.focused = false;
          }
        });
      },
      { once: true }
    );
  }
  updateSelectedItemIndex() {
    let firstOrFirstSelectedIndex = 0;
    const selectedItemsMap = /* @__PURE__ */ new Map();
    const selected = [];
    const selectedItems = [];
    let itemIndex = this.childItems.length;
    while (itemIndex) {
      itemIndex -= 1;
      const childItem = this.childItems[itemIndex];
      if (childItem.menuData.selectionRoot === this) {
        if (childItem.selected || !this._hasUpdatedSelectedItemIndex && this.selected.includes(childItem.value)) {
          firstOrFirstSelectedIndex = itemIndex;
          selectedItemsMap.set(childItem, true);
          selected.unshift(childItem.value);
          selectedItems.unshift(childItem);
        }
        if (itemIndex !== firstOrFirstSelectedIndex) {
          childItem.focused = false;
        }
      }
    }
    this.selectedItemsMap = selectedItemsMap;
    this._selected = selected;
    this.selectedItems = selectedItems;
    this.value = this.selected.join(this.valueSeparator);
    this.focusedItemIndex = firstOrFirstSelectedIndex;
    this.focusInItemIndex = firstOrFirstSelectedIndex;
  }
  handleItemsChanged() {
    this.cachedChildItems = void 0;
    if (!this._willUpdateItems) {
      this._willUpdateItems = true;
      this.cacheUpdated = this.updateCache();
    }
  }
  async updateCache() {
    if (!this.hasUpdated) {
      await Promise.all([
        new Promise((res) => requestAnimationFrame(() => res(true))),
        this.updateComplete
      ]);
    } else {
      await new Promise((res) => requestAnimationFrame(() => res(true)));
    }
    if (this.cachedChildItems === void 0) {
      this.updateSelectedItemIndex();
      this.updateItemFocus();
    }
    this._willUpdateItems = false;
  }
  updateItemFocus() {
    var _a;
    (_a = this.focusInItem) == null ? void 0 : _a.setAttribute("tabindex", "0");
    if (this.childItems.length == 0) {
      return;
    }
  }
  closeDescendentOverlays() {
    this.descendentOverlays.forEach((overlay) => {
      overlay.open = false;
    });
    this.descendentOverlays = /* @__PURE__ */ new Map();
  }
  handleSlotchange({
    target
  }) {
    var _a;
    const assignedElements = target.assignedElements({
      flatten: true
    });
    if (this.childItems.length !== assignedElements.length) {
      assignedElements.forEach((item) => {
        if (typeof item.triggerUpdate !== "undefined") {
          item.triggerUpdate();
        } else if (typeof item.childItems !== "undefined") {
          item.childItems.forEach((child) => {
            child.triggerUpdate();
          });
        }
      });
    }
    if (!!this._updateFocus) {
      (_a = this.rovingTabindexController) == null ? void 0 : _a.focusOnItem(this._updateFocus);
      this._updateFocus = void 0;
    }
  }
  renderMenuItemSlot() {
    return html`
            <slot
                @sp-menu-submenu-opened=${this.handleDescendentOverlayOpened}
                @sp-menu-submenu-closed=${this.handleDescendentOverlayClosed}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `;
  }
  render() {
    return this.renderMenuItemSlot();
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    const updates = [
      new Promise((res) => requestAnimationFrame(() => res(true)))
    ];
    [...this.children].forEach((item) => {
      if (item.localName === "sp-menu-item") {
        updates.push(item.updateComplete);
      }
    });
    this.childItemsUpdated = Promise.all(updates);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("selects") && this.hasUpdated) {
      this.selectsChanged();
    }
    if (changes.has("label") && (this.label || typeof changes.get("label") !== "undefined")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
  selectsChanged() {
    const updates = [
      new Promise((res) => requestAnimationFrame(() => res(true)))
    ];
    this.childItemSet.forEach((childItem) => {
      updates.push(childItem.triggerUpdate());
    });
    this.childItemsUpdated = Promise.all(updates);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role") && !this.ignore) {
      this.setAttribute("role", this.ownRole);
    }
    this.updateComplete.then(() => this.updateItemFocus());
  }
  isFocusableElement(el) {
    return el ? !el.disabled : false;
  }
  disconnectedCallback() {
    this.cachedChildItems = void 0;
    this.selectedItems = [];
    this.selectedItemsMap.clear();
    this.childItemSet.clear();
    this.descendentOverlays = /* @__PURE__ */ new Map();
    super.disconnectedCallback();
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.childItemsUpdated;
    await this.cacheUpdated;
    return complete;
  }
}
Menu.shadowRootOptions = {
  ...SpectrumElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  property({ type: String, reflect: true })
], Menu.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Menu.prototype, "ignore", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Menu.prototype, "selects", 2);
__decorateClass([
  property({ type: String })
], Menu.prototype, "value", 2);
__decorateClass([
  property({ type: String, attribute: "value-separator" })
], Menu.prototype, "valueSeparator", 2);
__decorateClass([
  property({ attribute: false })
], Menu.prototype, "selected", 1);
__decorateClass([
  property({ attribute: false })
], Menu.prototype, "selectedItems", 2);
__decorateClass([
  query("slot:not([name])")
], Menu.prototype, "menuSlot", 2);
//# sourceMappingURL=Menu.dev.js.map
