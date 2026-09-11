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
  render,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-arrow500.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import menuStyles from "./menu.css.js";
import { MenuItem } from "./MenuItem.dev.js";
export class Menu extends SizedMixin(SpectrumElement, { noDefaultSize: true }) {
  constructor() {
    super();
    /**
     * iPad scroll detection properties
     *
     * This feature prevents menu item selection during iPad scrolling to avoid
     * accidental selections when users are trying to scroll through a long menu.
     *
     * How it works:
     * 1. On touchstart: Record initial Y position and timestamp
     * 2. On touchmove: Calculate vertical movement and time elapsed
     * 3. If movement > threshold AND time < threshold: Mark as scrolling
     * 4. On touchend: Reset scrolling state after a delay
     * 5. During selection: Prevent selection if scrolling is detected
     *
     * This prevents the common iPad issue where users accidentally select menu
     * items while trying to scroll through the menu content.
     *
     * Threshold Values:
     * - Movement threshold: 10px (consistent with Card component click vs. drag detection)
     * - Time threshold: 300ms (consistent with longpress duration across the design system)
     * - Reset delay: 100ms (allows final touch events to be processed)
     *
     * These values are carefully chosen to balance preventing accidental triggers
     * while allowing intentional scroll gestures. They represent a common UX pattern
     * in mobile interfaces and are consistent with other components in the design system.
     */
    this.touchStartY = void 0;
    this.touchStartTime = void 0;
    this.isCurrentlyScrolling = false;
    /**
     * Minimum vertical movement (in pixels) required to trigger scrolling detection.
     *
     * This threshold is consistent with other components in the design system:
     * - Card component uses 10px for click vs. drag detection
     * - Menu component uses 10px for scroll vs. selection detection
     *
     * The 10px threshold is carefully chosen to:
     * - Allow for natural finger tremor and accidental touches
     * - Distinguish between intentional scroll gestures and taps
     * - Provide consistent behavior across the platform
     *
     * @see {@link packages/card/src/Card.ts} for similar threshold usage
     */
    this.scrollThreshold = 10;
    // pixels
    /**
     * Maximum time (in milliseconds) for a movement to be considered scrolling.
     *
     * This threshold is consistent with other timing values in the design system:
     * - Longpress duration: 300ms (ActionButton, LongpressController)
     * - Scroll detection: 300ms (Menu component)
     *
     * Quick movements within this timeframe are likely intentional scrolls,
     * while slower movements are more likely taps or selections.
     *
     * @see {@link packages/action-button/src/ActionButton.ts} for longpress duration
     * @see {@link packages/overlay/src/LongpressController.ts} for longpress duration
     */
    this.scrollTimeThreshold = 300;
    /**
     * Capture-phase keydown handler that overrides the default
     * `RovingTabindexController` wrap behavior at the mobile drill-down
     * boundary:
     *   - ArrowUp on the first nested item moves focus to the back row.
     *   - ArrowDown on the back row moves focus to the first nested item.
     *
     * Runs in the capture phase so it preempts the projected submenu's
     * controller, which handles arrow keys in the bubble phase.
     */
    this.handleMobileDrilldownKeydownCapture = (event) => {
      if (event.defaultPrevented || !this.rovingTabindexController) {
        return;
      }
      const { key, target } = event;
      if (!(target instanceof MenuItem)) {
        return;
      }
      const mobileRoot = this._mobileViewRoot;
      if ((mobileRoot == null ? void 0 : mobileRoot.currentMobileSubmenu) && key === "ArrowUp") {
        const items = this.childItems.filter((c) => this.isFocusableElement(c));
        const firstNonBack = items.find(
          (c) => !c.classList.contains("mobile-back-button")
        );
        if (firstNonBack === target) {
          event.preventDefault();
          event.stopImmediatePropagation();
          mobileRoot._focusMobileBackRow();
        }
        return;
      }
      if (this.mobileView && this._mobileSubmenuStack.length > 0 && key === "ArrowDown" && target.classList.contains("mobile-back-button")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this._focusFirstItemInCurrentNestedSubmenu();
      }
    };
    /**
     * Cleans up the `mobile-transition` attribute once the CSS slide
     * animation finishes, preventing the animation from replaying on
     * subsequent layout changes. Bound declaratively via `@animationend`
     * on the wrapper, so it only fires for that element.
     */
    this._handleAnimationEnd = (event) => {
      const target = event.currentTarget;
      target == null ? void 0 : target.removeAttribute("mobile-transition");
    };
    /**
     * Handles click on the mobile back button. Stops the event from
     * reaching parent menus and closes the current mobile submenu.
     */
    this.handleMobileBackClick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.closeMobileSubmenu();
    };
    /**
     * Maps each projected submenu element to its Lit render container so
     * that back button elements can be individually cleaned up when a
     * submenu is restored, without affecting other levels in the stack.
     */
    this._mobileBackContainers = /* @__PURE__ */ new Map();
    /**
     * Maps each projected submenu element to its original parent so the
     * element can be moved back when the submenu is closed.
     */
    this._mobileSubmenuOriginalParents = /* @__PURE__ */ new Map();
    this.label = "";
    this.ignore = false;
    this.mobileView = false;
    this.mobileBackLabel = "Back";
    this._mobileSubmenuStack = [];
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
      if (this.mobileView) {
        this.resetMobileSubmenus();
        return;
      }
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
      if (!openedItem) {
        return;
      }
    };
    this._hasUpdatedSelectedItemIndex = false;
    this._willUpdateItems = false;
    this.cacheUpdated = Promise.resolve();
    /* c8 ignore next 3 */
    this.resolveCacheUpdated = () => {
      return;
    };
    if (!this.rovingTabindexController && this.controlsRovingTabindex) {
      this.rovingTabindexController = new RovingTabindexController(
        this,
        {
          direction: "vertical",
          focusInIndex: (elements) => {
            let firstEnabledIndex = -1;
            const firstSelectedIndex = elements == null ? void 0 : elements.findIndex((el, index) => {
              if (!elements[firstEnabledIndex] && !el.disabled) {
                firstEnabledIndex = index;
              }
              return el.selected && !el.disabled;
            });
            return elements && firstSelectedIndex && elements[firstSelectedIndex] ? firstSelectedIndex : firstEnabledIndex;
          },
          elements: () => this.childItems,
          isFocusableElement: this.isFocusableElement.bind(this),
          hostDelegatesFocus: true,
          stopKeyEventPropagation: true
        }
      );
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
    this.addEventListener(
      "keydown",
      this.handleMobileDrilldownKeydownCapture,
      true
    );
    this.addEventListener("pointerup", this.handlePointerup);
    this.addEventListener("sp-opened", this.handleSubmenuOpened);
    this.addEventListener("sp-closed", this.handleSubmenuClosed);
    this.addEventListener("touchstart", this.handleTouchStart, {
      passive: true
    });
    this.addEventListener("touchmove", this.handleTouchMove, {
      passive: true
    });
  }
  static get styles() {
    return [menuStyles];
  }
  get isSubmenu() {
    return this.slot === "submenu";
  }
  asMenu(element) {
    return element;
  }
  get _mobileViewRoot() {
    return this.closest("sp-menu[mobile-view]");
  }
  // milliseconds
  /**
   * Public getter for scrolling state
   * Returns true if the component is currently in a scrolling state
   */
  get isScrolling() {
    return this.isCurrentlyScrolling;
  }
  set isScrolling(value) {
    this.isCurrentlyScrolling = value;
  }
  /**
   * Returns the MenuItem whose submenu is currently displayed at the
   * top of the mobile drill-down stack, or `undefined` when no submenu
   * is open.
   */
  get currentMobileSubmenu() {
    return this._mobileSubmenuStack[this._mobileSubmenuStack.length - 1];
  }
  /**
   * Opens a mobile submenu by projecting its content into this menu's
   * light DOM, pushing it onto the submenu stack, triggering the
   * slide-in animation, and focusing the back button.
   *
   * @param item - The MenuItem whose submenu should be opened.
   */
  openMobileSubmenu(item) {
    this._projectMobileSubmenu(item);
    this._mobileSubmenuStack = [...this._mobileSubmenuStack, item];
    this._triggerMobileTransition("forward");
    this._focusProjectedSubmenu(item);
  }
  /**
   * Closes the topmost mobile submenu by restoring it to its original
   * parent MenuItem, popping it from the stack, and either re-focusing
   * the previous submenu's back button or returning focus to the
   * triggering MenuItem when no deeper level remains.
   */
  closeMobileSubmenu() {
    const closedItem = this.currentMobileSubmenu;
    if (closedItem) {
      this._restoreMobileSubmenu(closedItem);
    }
    this._mobileSubmenuStack = this._mobileSubmenuStack.slice(0, -1);
    const previous = this.currentMobileSubmenu;
    if (previous == null ? void 0 : previous.submenuElement) {
      previous.submenuElement.setAttribute("slot", "mobile-submenu");
      this._focusProjectedSubmenu(previous);
    } else if (closedItem) {
      this.updateComplete.then(() => {
        closedItem.focus();
      });
    }
    this._triggerMobileTransition("back");
  }
  /**
   * Focuses the mobile back button inside the given item's projected
   * submenu. Explicitly resets `tabIndex` and `focused` on every other
   * child of the submenu so only the back row is in the tab order
   * after the drill-down opens. We avoid delegating to the projected
   * submenu's `RovingTabindexController` here because the back button
   * is appended dynamically via `render()` and may not yet be in the
   * controller's element cache when this runs, which would cause
   * focus to fall back to the first nested item instead.
   *
   * @param item - The MenuItem whose projected submenu should receive focus.
   */
  async _focusProjectedSubmenu(item) {
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }
    const backItem = submenuEl.querySelector(
      ".mobile-back-button"
    );
    if (!backItem) {
      return;
    }
    await backItem.updateComplete;
    const submenu = this.asMenu(submenuEl);
    await submenu.updateComplete;
    submenu.childItems.forEach((child) => {
      child.tabIndex = -1;
      child.focused = false;
    });
    backItem.tabIndex = 0;
    backItem.focused = true;
    if (submenu.rovingTabindexController) {
      submenu.rovingTabindexController.currentIndex = submenu.childItems.indexOf(backItem);
    }
    backItem.focus();
  }
  /**
   * Focuses the mobile back button of the currently visible projected
   * submenu. Used when the user presses ArrowUp from the first nested
   * item so focus moves to the back row instead of wrapping. Manages
   * `tabIndex`/`focused` explicitly to keep the back row as the only
   * tabbable element in the projected submenu.
   */
  _focusMobileBackRow() {
    var _a;
    const submenuEl = (_a = this.currentMobileSubmenu) == null ? void 0 : _a.submenuElement;
    if (!submenuEl) {
      return;
    }
    const backItem = submenuEl.querySelector(
      ".mobile-back-button"
    );
    if (!backItem) {
      return;
    }
    const submenu = this.asMenu(submenuEl);
    submenu.childItems.forEach((child) => {
      child.tabIndex = -1;
      child.focused = false;
    });
    backItem.tabIndex = 0;
    backItem.focused = true;
    if (submenu.rovingTabindexController) {
      submenu.rovingTabindexController.currentIndex = submenu.childItems.indexOf(backItem);
    }
    backItem.focus();
  }
  /**
   * Focuses the first focusable item inside the currently visible
   * projected submenu, skipping the back row. Used when the user
   * presses ArrowDown from the back row. Manages `tabIndex`/`focused`
   * explicitly so only the focused item is in the tab order.
   */
  _focusFirstItemInCurrentNestedSubmenu() {
    var _a;
    const submenuEl = (_a = this.currentMobileSubmenu) == null ? void 0 : _a.submenuElement;
    if (!submenuEl) {
      return;
    }
    const submenu = this.asMenu(submenuEl);
    const firstItem = submenu.childItems.find(
      (child) => !child.disabled && !child.classList.contains("mobile-back-button")
    );
    if (!firstItem) {
      return;
    }
    submenu.childItems.forEach((child) => {
      child.tabIndex = -1;
      child.focused = false;
    });
    firstItem.tabIndex = 0;
    firstItem.focused = true;
    if (submenu.rovingTabindexController) {
      submenu.rovingTabindexController.currentIndex = submenu.childItems.indexOf(firstItem);
    }
    firstItem.focus();
  }
  /**
   * Triggers a CSS slide animation on the mobile submenu wrapper.
   * Waits for the current Lit update cycle, then sets the
   * `mobile-transition` attribute so the keyframe animation plays.
   *
   * @param direction - `'forward'` slides content in from the right,
   *   `'back'` slides content in from the left.
   */
  _triggerMobileTransition(direction) {
    this.updateComplete.then(() => {
      var _a;
      const wrapper = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(
        ".mobile-submenu-animation-wrapper"
      );
      if (!wrapper) {
        return;
      }
      wrapper.removeAttribute("mobile-transition");
      requestAnimationFrame(() => {
        wrapper.setAttribute("mobile-transition", direction);
      });
    });
  }
  /**
   * Restores every projected submenu back to its original parent and
   * clears the submenu stack. Called during `disconnectedCallback` or
   * when the menu overlay closes to ensure a clean state.
   */
  resetMobileSubmenus() {
    for (let i = this._mobileSubmenuStack.length - 1; i >= 0; i--) {
      this._restoreMobileSubmenu(this._mobileSubmenuStack[i]);
    }
    this._mobileSubmenuStack = [];
  }
  /**
   * Moves the submenu element from its MenuItem parent into this Menu's
   * light DOM with a `mobile-submenu` slot, so it projects through the
   * named slot in the shadow DOM. Any previously visible projected submenu
   * is moved to a non-rendered slot to avoid both showing at once.
   */
  _projectMobileSubmenu(item) {
    var _a;
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }
    const currentlyVisible = (_a = this.currentMobileSubmenu) == null ? void 0 : _a.submenuElement;
    if (currentlyVisible) {
      currentlyVisible.setAttribute("slot", "mobile-submenu-stacked");
    }
    const parentElement = submenuEl.parentElement;
    if (!parentElement) {
      return;
    }
    item._mobileSubmenuProjected = true;
    this._mobileSubmenuOriginalParents.set(submenuEl, parentElement);
    const submenu = this.asMenu(submenuEl);
    const savedChildItems = new Set(submenu.childItemSet);
    submenuEl.setAttribute("slot", "mobile-submenu");
    this.appendChild(submenuEl);
    this._restoreSubmenuChildState(submenu, savedChildItems);
    this._renderMobileBackElements(submenuEl);
  }
  /**
   * Restores the submenu element back to its original MenuItem parent
   * and resets the slot attribute.
   */
  _restoreMobileSubmenu(item) {
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }
    this._removeMobileBackElements(submenuEl);
    const submenu = this.asMenu(submenuEl);
    const originalParent = this._mobileSubmenuOriginalParents.get(submenuEl);
    if (originalParent) {
      const savedChildItems = new Set(submenu.childItemSet);
      submenuEl.setAttribute("slot", "submenu");
      originalParent.appendChild(submenuEl);
      this._mobileSubmenuOriginalParents.delete(submenuEl);
      this._restoreSubmenuChildState(submenu, savedChildItems);
    }
    item._mobileSubmenuProjected = false;
  }
  /**
   * Declaratively renders the mobile back button and divider into the
   * projected submenu element using Lit's `render()`, so the back button
   * lives inside the same `<sp-menu>` and participates in its
   * `RovingTabindexController` for keyboard navigation. Re-renders
   * whenever `dir` or `mobileBackLabel` change so the icon orientation
   * and label stay in sync.
   */
  _renderMobileBackElements(submenuEl) {
    var _a;
    this._removeMobileBackElements(submenuEl);
    const container = document.createElement("div");
    container.className = "mobile-back-container";
    submenuEl.insertBefore(container, submenuEl.firstChild);
    this._mobileBackContainers.set(submenuEl, container);
    render(
      html`
        <sp-menu-item
          class="mobile-back-button"
          data-mobile-back
          @click=${this.handleMobileBackClick}
        >
          <sp-icon-arrow500
            slot="icon"
            class="mobile-back-icon"
          ></sp-icon-arrow500>
          ${this.mobileBackLabel}
        </sp-menu-item>
        <sp-menu-divider data-mobile-back></sp-menu-divider>
      `,
      container
    );
    const submenu = this.asMenu(submenuEl);
    const backItem = submenuEl.querySelector(
      ".mobile-back-button"
    );
    if (backItem) {
      submenu.childItemSet.add(backItem);
    }
    submenu.cachedChildItems = void 0;
    (_a = submenu.rovingTabindexController) == null ? void 0 : _a.clearElementCache();
    if (submenu.rovingTabindexController) {
      submenu.rovingTabindexController.currentIndex = 0;
    }
  }
  /**
   * Re-render any open mobile back containers so changes to
   * `mobileBackLabel` (and other reactive values consumed by the
   * back-button template) propagate without needing to close
   * and re-open the drill-down.
   */
  _refreshMobileBackElements() {
    this._mobileBackContainers.forEach((_container, submenuEl) => {
      this._renderMobileBackElements(submenuEl);
    });
  }
  /**
   * Removes the mobile back button render container from the given
   * projected submenu element.
   */
  _removeMobileBackElements(submenuEl) {
    var _a;
    const container = this._mobileBackContainers.get(submenuEl);
    if (container) {
      const backItem = submenuEl.querySelector(
        ".mobile-back-button"
      );
      if (backItem) {
        this.asMenu(submenuEl).childItemSet.delete(backItem);
      }
      container.remove();
      this._mobileBackContainers.delete(submenuEl);
      const submenu = this.asMenu(submenuEl);
      submenu.cachedChildItems = void 0;
      (_a = submenu.rovingTabindexController) == null ? void 0 : _a.clearElementCache();
      if (submenu.rovingTabindexController) {
        submenu.rovingTabindexController.currentIndex = 0;
      }
    }
  }
  /**
   * Re-adds saved child items to the submenu's `childItemSet` and
   * invalidates cached references after DOM re-parenting, so the
   * `RovingTabindexController` picks up the correct set of focusable
   * children.
   *
   * @param submenu - The submenu whose child state needs restoring.
   * @param savedChildItems - The set of MenuItem children captured
   *   before the DOM move.
   */
  _restoreSubmenuChildState(submenu, savedChildItems) {
    var _a;
    savedChildItems.forEach((child) => submenu.childItemSet.add(child));
    submenu.cachedChildItems = void 0;
    (_a = submenu.rovingTabindexController) == null ? void 0 : _a.clearElementCache();
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
   *
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
   *
   * @param event
   */
  onSelectableItemAddedOrUpdated(event) {
    var _a, _b;
    const cascadeData = event.menuCascade.get(this);
    if (!cascadeData) {
      return;
    }
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
  focusOnFirstSelectedItem({ preventScroll } = {}) {
    var _a;
    if (!this.rovingTabindexController) {
      return;
    }
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
  /**
   * Handles touchstart events for iPad scroll detection.
   *
   * Records the initial touch position and timestamp to establish a baseline
   * for detecting scroll gestures. Only processes single-touch events to
   * avoid interference with multi-touch gestures.
   *
   * @param event - The TouchEvent from the touchstart event
   */
  handleTouchStart(event) {
    if (event.touches.length === 1) {
      this.touchStartY = event.touches[0].clientY;
      this.touchStartTime = Date.now();
      this.isCurrentlyScrolling = false;
    }
  }
  /**
   * Handles touchmove events for iPad scroll detection.
   *
   * Calculates the vertical movement distance and time elapsed since touchstart.
   * If the movement exceeds the threshold (10px) and happens within the time
   * threshold (300ms), it marks the interaction as scrolling. This helps
   * distinguish between intentional scroll gestures and accidental touches.
   *
   * @param event - The TouchEvent from the touchmove event
   */
  handleTouchMove(event) {
    if (event.touches.length === 1 && this.touchStartY !== void 0 && this.touchStartTime !== void 0) {
      const currentY = event.touches[0].clientY;
      const deltaY = Math.abs(currentY - this.touchStartY);
      const deltaTime = Date.now() - this.touchStartTime;
      if (deltaY > this.scrollThreshold && deltaTime < this.scrollTimeThreshold) {
        this.isCurrentlyScrolling = true;
      }
    }
  }
  /**
   * Handles touchend events for iPad scroll detection.
   *
   * Resets the scrolling state after a short delay (100ms) to allow for
   * any final touch events to be processed. This delay prevents immediate
   * state changes that could interfere with the selection logic.
   *
   * The 100ms delay is consistent with the design system's approach to
   * touch event handling and ensures that any final touch events or
   * gesture recognition can complete before the scrolling state is reset.
   */
  handleTouchEnd() {
    setTimeout(() => {
      this.isCurrentlyScrolling = false;
      this.touchStartY = void 0;
      this.touchStartTime = void 0;
    }, 100);
  }
  handleFocusout() {
    var _a;
    if (!this.matches(":focus-within")) {
      (_a = this.rovingTabindexController) == null ? void 0 : _a.reset();
    }
  }
  handleClick(event) {
    if (this.pointerUpTarget === event.target) {
      this.pointerUpTarget = null;
      return;
    }
    this.handlePointerBasedSelection(event);
  }
  handlePointerup(event) {
    this.handleTouchEnd();
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
    if (this.isScrolling) {
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
    if (!target.overlayElement) {
      return;
    }
    this.descendentOverlays.set(target.overlayElement, target.overlayElement);
  }
  handleDescendentOverlayClosed(event) {
    const target = event.composedPath()[0];
    if (!target.overlayElement) {
      return;
    }
    this.descendentOverlays.delete(target.overlayElement);
  }
  /**
   * given a menu item, returns the next focusable menu item before or after it;
   * if no menu item is provided, returns the first focusable menu item
   *
   * @param menuItem {MenuItem}
   * @param before {boolean} return the item before; default is false
   * @returns {MenuItem}
   */
  getNeighboringFocusableElement(menuItem, before = false) {
    var _a;
    const diff = before ? -1 : 1;
    const elements = ((_a = this.rovingTabindexController) == null ? void 0 : _a.elements) || [];
    const index = menuItem ? elements.indexOf(menuItem) : -1;
    let newIndex = Math.min(Math.max(0, index + diff), elements.length - 1);
    while (!this.isFocusableElement(elements[newIndex]) && 0 < newIndex && newIndex < elements.length - 1) {
      newIndex += diff;
    }
    return this.isFocusableElement(elements[newIndex]) ? elements[newIndex] : menuItem || elements[0];
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
        if (childItem.menuData.selectionRoot !== this) {
          return;
        }
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
    const dir = this.dir;
    const shouldOpenSubmenu = dir === "ltr" && key === "ArrowRight" || dir === "rtl" && key === "ArrowLeft";
    const shouldCloseSelfAsSubmenu = dir === "ltr" && key === "ArrowLeft" || dir === "rtl" && key === "ArrowRight" || key === "Escape";
    const lastFocusedItem = root;
    if (this.mobileView) {
      if (shouldOpenSubmenu && (lastFocusedItem == null ? void 0 : lastFocusedItem.hasSubmenu)) {
        event.stopPropagation();
        this.openMobileSubmenu(lastFocusedItem);
        return;
      }
      if (shouldCloseSelfAsSubmenu && this._mobileSubmenuStack.length > 0) {
        event.stopPropagation();
        this.closeMobileSubmenu();
        return;
      }
      return;
    }
    const mobileRoot = this._mobileViewRoot;
    if (mobileRoot) {
      if (shouldOpenSubmenu && (lastFocusedItem == null ? void 0 : lastFocusedItem.hasSubmenu)) {
        event.stopPropagation();
        mobileRoot.openMobileSubmenu(lastFocusedItem);
        return;
      }
      if (shouldCloseSelfAsSubmenu) {
        event.stopPropagation();
        mobileRoot.closeMobileSubmenu();
        return;
      }
      return;
    }
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
    if (this.mobileView && this._mobileSubmenuStack.length > 0) {
      const { key: key2 } = event;
      const dir = this.dir;
      const shouldClose = dir === "ltr" && key2 === "ArrowLeft" || dir === "rtl" && key2 === "ArrowRight" || key2 === "Escape";
      if (shouldClose) {
        event.stopPropagation();
        event.preventDefault();
        this.closeMobileSubmenu();
      }
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
      const mobileRoot = this._mobileViewRoot;
      if (this.mobileView) {
        this.openMobileSubmenu(root);
      } else if (mobileRoot) {
        mobileRoot.openMobileSubmenu(root);
      } else {
        root.openOverlay(true);
      }
      return;
    }
    if (key === " " || key === "Enter") {
      event.preventDefault();
      (_a = root == null ? void 0 : root.focusElement) == null ? void 0 : _a.click();
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
        } else if (typeof this.asMenu(item).childItems !== "undefined") {
          this.asMenu(item).childItems.forEach((child) => {
            child.triggerUpdate();
          });
        }
      });
    }
    if (this._updateFocus) {
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
    const hasMobileSubmenu = this.mobileView && this._mobileSubmenuStack.length > 0;
    return html`
      <div
        class=${hasMobileSubmenu ? "mobile-slot-hidden" : "mobile-slot-wrapper"}
      >
        ${this.renderMenuItemSlot()}
      </div>
      ${hasMobileSubmenu ? html`
            <div
              class="mobile-submenu-animation-wrapper"
              @animationend=${this._handleAnimationEnd}
            >
              <slot name="mobile-submenu"></slot>
            </div>
          ` : ""}
    `;
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
    if (changes.has("mobileBackLabel") && this.hasUpdated) {
      this._refreshMobileBackElements();
    }
    if (changes.has("mobileView") && this.hasUpdated) {
      if (!this.mobileView && this._mobileSubmenuStack.length > 0) {
        this.resetMobileSubmenus();
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
    this.resetMobileSubmenus();
    this._mobileSubmenuOriginalParents.clear();
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
  property({ type: Boolean, attribute: "mobile-view", reflect: true })
], Menu.prototype, "mobileView", 2);
__decorateClass([
  property({ type: String, attribute: "mobile-back-label" })
], Menu.prototype, "mobileBackLabel", 2);
__decorateClass([
  state()
], Menu.prototype, "_mobileSubmenuStack", 2);
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
