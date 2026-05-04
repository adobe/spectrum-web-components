/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  CSSResultArray,
  html,
  PropertyValues,
  render,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  property,
  query,
  state,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Overlay } from '@spectrum-web-components/overlay';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow500.js';
import '../sp-menu-divider.js';

import menuStyles from './menu.css.js';
import type {
  MenuItemAddedOrUpdatedEvent,
  MenuItemKeydownEvent,
} from './MenuItem.js';
import { MenuItem } from './MenuItem.js';

export interface MenuChildItem {
  menuItem: MenuItem;
  managed: boolean;
  active: boolean;
  focusable: boolean;
  focusRoot: Menu;
}

type SelectsType = 'none' | 'ignore' | 'inherit' | 'multiple' | 'single';
type RoleType = 'group' | 'menu' | 'listbox' | 'none';

/**
 * Spectrum Menu Component
 *
 * @element sp-menu
 *
 * @slot - menu items to be listed in the menu
 * @fires change - Announces that the `value` of the element has changed
 * @attr selects - whether the element has a specific selection algorithm that it applies
 *   to its item descendants. `single` allows only one descendent to be selected at a time.
 *   `multiple` allows many descendants to be selected. `inherit` will be applied dynamically
 *   when an ancestor of this element is actively managing the selection of its descendents.
 *   When the `selects` attribute is not present a `value` will not be maintained and the Menu
 *   Item children of this Menu will not have their `selected` state managed.
 */
export class Menu extends SizedMixin(SpectrumElement, { noDefaultSize: true }) {
  public static override get styles(): CSSResultArray {
    return [menuStyles];
  }

  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private get isSubmenu(): boolean {
    return this.slot === 'submenu';
  }

  private asMenu(element: HTMLElement): Menu {
    return element as HTMLElement as Menu;
  }

  private get _mobileViewRoot(): Menu | null {
    return this.closest('sp-menu[mobile-view]') as Menu | null;
  }

  protected rovingTabindexController?: RovingTabindexController<MenuItem>;

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
  private touchStartY: number | undefined = undefined;
  private touchStartTime: number | undefined = undefined;
  private isCurrentlyScrolling = false;

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
  private scrollThreshold = 10; // pixels

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
  private scrollTimeThreshold = 300; // milliseconds

  /**
   * Public getter for scrolling state
   * Returns true if the component is currently in a scrolling state
   */
  public get isScrolling(): boolean {
    return this.isCurrentlyScrolling;
  }

  public set isScrolling(value: boolean) {
    // For testing purposes, allow setting the scrolling state
    this.isCurrentlyScrolling = value;
  }

  /**
   * Returns the MenuItem whose submenu is currently displayed at the
   * top of the mobile drill-down stack, or `undefined` when no submenu
   * is open.
   */
  public get currentMobileSubmenu(): MenuItem | undefined {
    return this._mobileSubmenuStack[this._mobileSubmenuStack.length - 1];
  }

  /**
   * Opens a mobile submenu by projecting its content into this menu's
   * light DOM, pushing it onto the submenu stack, triggering the
   * slide-in animation, and focusing the back button.
   *
   * @param item - The MenuItem whose submenu should be opened.
   */
  public openMobileSubmenu(item: MenuItem): void {
    this._projectMobileSubmenu(item);
    this._mobileSubmenuStack = [...this._mobileSubmenuStack, item];
    this._triggerMobileTransition('forward');
    this._focusProjectedSubmenu(item);
  }

  /**
   * Closes the topmost mobile submenu by restoring it to its original
   * parent MenuItem, popping it from the stack, and either re-focusing
   * the previous submenu's back button or returning focus to the
   * triggering MenuItem when no deeper level remains.
   */
  public closeMobileSubmenu(): void {
    const closedItem = this.currentMobileSubmenu;
    if (closedItem) {
      this._restoreMobileSubmenu(closedItem);
    }
    this._mobileSubmenuStack = this._mobileSubmenuStack.slice(0, -1);

    const previous = this.currentMobileSubmenu;
    if (previous?.submenuElement) {
      previous.submenuElement.setAttribute('slot', 'mobile-submenu');
      this._focusProjectedSubmenu(previous);
    } else if (closedItem) {
      this.updateComplete.then(() => {
        closedItem.focus();
      });
    }
    this._triggerMobileTransition('back');
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
  private async _focusProjectedSubmenu(item: MenuItem): Promise<void> {
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }
    const backItem = submenuEl.querySelector(
      '.mobile-back-button'
    ) as MenuItem | null;
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
      submenu.rovingTabindexController.currentIndex =
        submenu.childItems.indexOf(backItem);
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
  private _focusMobileBackRow(): void {
    const submenuEl = this.currentMobileSubmenu?.submenuElement;
    if (!submenuEl) {
      return;
    }
    const backItem = submenuEl.querySelector(
      '.mobile-back-button'
    ) as MenuItem | null;
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
      submenu.rovingTabindexController.currentIndex =
        submenu.childItems.indexOf(backItem);
    }
    backItem.focus();
  }

  /**
   * Focuses the first focusable item inside the currently visible
   * projected submenu, skipping the back row. Used when the user
   * presses ArrowDown from the back row. Manages `tabIndex`/`focused`
   * explicitly so only the focused item is in the tab order.
   */
  private _focusFirstItemInCurrentNestedSubmenu(): void {
    const submenuEl = this.currentMobileSubmenu?.submenuElement;
    if (!submenuEl) {
      return;
    }
    const submenu = this.asMenu(submenuEl);
    const firstItem = submenu.childItems.find(
      (child) =>
        !child.disabled && !child.classList.contains('mobile-back-button')
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
      submenu.rovingTabindexController.currentIndex =
        submenu.childItems.indexOf(firstItem);
    }
    firstItem.focus();
  }

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
  private handleMobileDrilldownKeydownCapture = (
    event: KeyboardEvent
  ): void => {
    if (event.defaultPrevented || !this.rovingTabindexController) {
      return;
    }
    const { key, target } = event;
    if (!(target instanceof MenuItem)) {
      return;
    }

    const mobileRoot = this._mobileViewRoot;

    if (mobileRoot?.currentMobileSubmenu && key === 'ArrowUp') {
      const items = this.childItems.filter((c) => this.isFocusableElement(c));
      const firstNonBack = items.find(
        (c) => !c.classList.contains('mobile-back-button')
      );
      if (firstNonBack === target) {
        event.preventDefault();
        event.stopImmediatePropagation();
        mobileRoot._focusMobileBackRow();
      }
      return;
    }

    if (
      this.mobileView &&
      this._mobileSubmenuStack.length > 0 &&
      key === 'ArrowDown' &&
      target.classList.contains('mobile-back-button')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._focusFirstItemInCurrentNestedSubmenu();
    }
  };

  /**
   * Triggers a CSS slide animation on the mobile submenu wrapper.
   * Waits for the current Lit update cycle, then sets the
   * `mobile-transition` attribute so the keyframe animation plays.
   *
   * @param direction - `'forward'` slides content in from the right,
   *   `'back'` slides content in from the left.
   */
  private _triggerMobileTransition(direction: 'forward' | 'back'): void {
    this.updateComplete.then(() => {
      const wrapper = this.shadowRoot?.querySelector(
        '.mobile-submenu-animation-wrapper'
      );
      if (!wrapper) {
        return;
      }
      wrapper.removeAttribute('mobile-transition');
      requestAnimationFrame(() => {
        wrapper.setAttribute('mobile-transition', direction);
      });
    });
  }

  /**
   * Cleans up the `mobile-transition` attribute once the CSS slide
   * animation finishes, preventing the animation from replaying on
   * subsequent layout changes. Bound declaratively via `@animationend`
   * on the wrapper, so it only fires for that element.
   */
  private _handleAnimationEnd = (event: AnimationEvent): void => {
    const target = event.currentTarget as HTMLElement;
    target?.removeAttribute('mobile-transition');
  };

  /**
   * Restores every projected submenu back to its original parent and
   * clears the submenu stack. Called during `disconnectedCallback` or
   * when the menu overlay closes to ensure a clean state.
   */
  public resetMobileSubmenus(): void {
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
  private _projectMobileSubmenu(item: MenuItem): void {
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }

    const currentlyVisible = this.currentMobileSubmenu?.submenuElement;
    if (currentlyVisible) {
      currentlyVisible.setAttribute('slot', 'mobile-submenu-stacked');
    }

    const parentElement = submenuEl.parentElement;
    if (!parentElement) {
      return;
    }

    item._mobileSubmenuProjected = true;
    this._mobileSubmenuOriginalParents.set(submenuEl, parentElement);

    const submenu = this.asMenu(submenuEl);
    const savedChildItems = new Set(submenu.childItemSet);

    submenuEl.setAttribute('slot', 'mobile-submenu');
    this.appendChild(submenuEl);

    this._restoreSubmenuChildState(submenu, savedChildItems);
    this._renderMobileBackElements(submenuEl);
  }

  /**
   * Restores the submenu element back to its original MenuItem parent
   * and resets the slot attribute.
   */
  private _restoreMobileSubmenu(item: MenuItem): void {
    const submenuEl = item.submenuElement;
    if (!submenuEl) {
      return;
    }

    this._removeMobileBackElements(submenuEl);

    const submenu = this.asMenu(submenuEl);
    const originalParent = this._mobileSubmenuOriginalParents.get(submenuEl);
    if (originalParent) {
      const savedChildItems = new Set(submenu.childItemSet);

      submenuEl.setAttribute('slot', 'submenu');
      originalParent.appendChild(submenuEl);
      this._mobileSubmenuOriginalParents.delete(submenuEl);

      this._restoreSubmenuChildState(submenu, savedChildItems);
    }
    item._mobileSubmenuProjected = false;
  }

  /**
   * Handles click on the mobile back button. Stops the event from
   * reaching parent menus and closes the current mobile submenu.
   */
  private handleMobileBackClick = (event: Event): void => {
    event.stopPropagation();
    event.preventDefault();
    this.closeMobileSubmenu();
  };

  /**
   * Maps each projected submenu element to its Lit render container so
   * that back button elements can be individually cleaned up when a
   * submenu is restored, without affecting other levels in the stack.
   */
  private _mobileBackContainers = new Map<HTMLElement, HTMLElement>();

  /**
   * Declaratively renders the mobile back button and divider into the
   * projected submenu element using Lit's `render()`, so the back button
   * lives inside the same `<sp-menu>` and participates in its
   * `RovingTabindexController` for keyboard navigation. Re-renders
   * whenever `dir` or `mobileBackLabel` change so the icon orientation
   * and label stay in sync.
   */
  private _renderMobileBackElements(submenuEl: HTMLElement): void {
    this._removeMobileBackElements(submenuEl);
    const container = document.createElement('div');
    container.className = 'mobile-back-container';
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
      '.mobile-back-button'
    ) as MenuItem | null;
    if (backItem) {
      submenu.childItemSet.add(backItem);
    }
    submenu.cachedChildItems = undefined;
    submenu.rovingTabindexController?.clearElementCache();
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
  private _refreshMobileBackElements(): void {
    this._mobileBackContainers.forEach((_container, submenuEl) => {
      this._renderMobileBackElements(submenuEl);
    });
  }

  /**
   * Removes the mobile back button render container from the given
   * projected submenu element.
   */
  private _removeMobileBackElements(submenuEl: HTMLElement): void {
    const container = this._mobileBackContainers.get(submenuEl);
    if (container) {
      const backItem = submenuEl.querySelector(
        '.mobile-back-button'
      ) as MenuItem | null;
      if (backItem) {
        this.asMenu(submenuEl).childItemSet.delete(backItem);
      }
      container.remove();
      this._mobileBackContainers.delete(submenuEl);
      const submenu = this.asMenu(submenuEl);
      submenu.cachedChildItems = undefined;
      submenu.rovingTabindexController?.clearElementCache();
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
  private _restoreSubmenuChildState(
    submenu: Menu,
    savedChildItems: Set<MenuItem>
  ): void {
    savedChildItems.forEach((child) => submenu.childItemSet.add(child));
    submenu.cachedChildItems = undefined;
    submenu.rovingTabindexController?.clearElementCache();
  }

  /**
   * Maps each projected submenu element to its original parent so the
   * element can be moved back when the submenu is closed.
   */
  private _mobileSubmenuOriginalParents = new Map<HTMLElement, HTMLElement>();

  /**
   * label of the menu
   */
  @property({ type: String, reflect: true })
  public label = '';

  /**
   * whether menu should be ignored by roving tabindex controller
   */
  @property({ type: Boolean, reflect: true })
  public ignore = false;

  /**
   * Enables mobile submenu navigation where tapping a submenu item replaces
   * the current menu content with the submenu's children (drill-down) instead
   * of opening a flyout overlay.
   */
  @property({ type: Boolean, attribute: 'mobile-view', reflect: true })
  public mobileView = false;

  /**
   * Label for the mobile back button, used for localization.
   */
  @property({ type: String, attribute: 'mobile-back-label' })
  public mobileBackLabel = 'Back';

  @state()
  private _mobileSubmenuStack: MenuItem[] = [];

  /**
   * how the menu allows selection of its items:
   * - `undefined` (default): no selection is allowed
   * - `"inherit"`: the selection behavior is managed from an ancestor
   * - `"single"`: only one item can be selected at a time
   *  - `"multiple"`: multiple items can be selected
   */
  @property({ type: String, reflect: true })
  public selects: undefined | 'inherit' | 'single' | 'multiple';

  /**
   * value of the selected item(s)
   */
  @property({ type: String })
  public value = '';

  // For the multiple select case, we'll join the value strings together
  // for the value property with this separator
  @property({ type: String, attribute: 'value-separator' })
  public valueSeparator = ',';

  /**
   * selected items values as string
   */
  @property({ attribute: false })
  public get selected(): string[] {
    return !this.selects ? [] : this._selected;
  }

  public set selected(selected: string[]) {
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
    this.requestUpdate('selected', old);
  }

  protected _selected = [] as string[];

  /**
   * array of selected menu items
   */
  @property({ attribute: false })
  public selectedItems = [] as MenuItem[];

  @query('slot:not([name])')
  public menuSlot!: HTMLSlotElement;

  private childItemSet = new Set<MenuItem>();
  public focusedItemIndex = 0;
  public focusInItemIndex = 0;

  /**
   * Whether to support the pointerdown-drag-pointerup selection strategy.
   * Defaults to false to prevent click/touch events from being captured
   * behind the menu tray in mobile environments (since the menu closes
   * immediately on pointerup).
   */

  public shouldSupportDragAndSelect = false;

  public get focusInItem(): MenuItem | undefined {
    return this.rovingTabindexController?.focusInElement;
  }

  protected get controlsRovingTabindex(): boolean {
    return true;
  }

  private selectedItemsMap = new Map<MenuItem, boolean>();

  /**
   * child items managed by menu
   */
  public get childItems(): MenuItem[] {
    if (!this.cachedChildItems) {
      this.cachedChildItems = this.updateCachedMenuItems();
    }
    return this.cachedChildItems;
  }

  private cachedChildItems: MenuItem[] | undefined;

  private updateCachedMenuItems(): MenuItem[] {
    if (!this.menuSlot) {
      return [];
    }
    const itemsList = [];
    const slottedElements = this.menuSlot.assignedElements({
      flatten: true,
    }) as HTMLElement[];
    // Recursively flatten <slot> and non-<sp-menu-item> elements assigned to the menu into a single array.
    for (const [i, slottedElement] of slottedElements.entries()) {
      if (this.childItemSet.has(slottedElement as MenuItem)) {
        // Assign <sp-menu-item> members of the array that are in this.childItemSet to this.chachedChildItems.
        itemsList.push(slottedElement as MenuItem);
        continue;
      }
      const isHTMLSlotElement = slottedElement.localName === 'slot';
      const flattenedChildren = isHTMLSlotElement
        ? (slottedElement as HTMLSlotElement).assignedElements({
            flatten: true,
          })
        : [...slottedElement.querySelectorAll(`:scope > *`)];
      slottedElements.splice(
        i,
        1,
        slottedElement,
        ...(flattenedChildren as HTMLElement[])
      );
    }

    this.cachedChildItems = [...itemsList];
    this.rovingTabindexController?.clearElementCache();

    return this.cachedChildItems;
  }

  /**
   * Hide this getter from web-component-analyzer until
   * https://github.com/runem/web-component-analyzer/issues/131
   * has been addressed.
   *
   * @private
   */
  public get childRole(): string {
    if (this.resolvedRole === 'listbox') {
      return 'option';
    }
    switch (this.resolvedSelects) {
      case 'single':
        return 'menuitemradio';
      case 'multiple':
        return 'menuitemcheckbox';
      default:
        return 'menuitem';
    }
  }

  protected get ownRole(): string {
    return 'menu';
  }

  /**
   * menuitem role based on selection type
   */
  private resolvedSelects?: SelectsType;

  /**
   * menu role based on selection type
   */
  private resolvedRole?: RoleType;

  /**
   * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
   * this event to announce its presence in the DOM. During the CAPTURE phase the first
   * Menu based element that the event encounters will manage the focus state of the
   * dispatching `<sp-menu-item>` element.
   *
   * @param event
   */
  private onFocusableItemAddedOrUpdated(
    event: MenuItemAddedOrUpdatedEvent
  ): void {
    event.menuCascade.set(this, {
      hadFocusRoot: !!event.item.menuData.focusRoot,
      ancestorWithSelects: event.currentAncestorWithSelects,
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
  private onSelectableItemAddedOrUpdated(
    event: MenuItemAddedOrUpdatedEvent
  ): void {
    const cascadeData = event.menuCascade.get(this);
    /* c8 ignore next 1 */
    if (!cascadeData) {
      return;
    }

    event.item.menuData.parentMenu = event.item.menuData.parentMenu || this;
    this.addChildItem(event.item);

    if (this.selects === 'inherit') {
      this.resolvedSelects = 'inherit';
      const ignoreMenu = event.currentAncestorWithSelects?.ignore;
      this.resolvedRole = ignoreMenu
        ? 'none'
        : ((event.currentAncestorWithSelects?.getAttribute('role') ||
            this.getAttribute('role') ||
            undefined) as RoleType);
    } else if (this.selects) {
      this.resolvedRole = this.ignore
        ? 'none'
        : ((this.getAttribute('role') || undefined) as RoleType);
      this.resolvedSelects = this.selects;
    } else {
      this.resolvedRole = this.ignore
        ? 'none'
        : ((this.getAttribute('role') || undefined) as RoleType);
      this.resolvedSelects = this.resolvedRole === 'none' ? 'ignore' : 'none';
    }

    if (this.resolvedRole === 'none') {
      return;
    }

    const selects =
      this.resolvedSelects === 'single' || this.resolvedSelects === 'multiple';
    event.item.menuData.cleanupSteps.push((item: MenuItem) =>
      this.removeChildItem(item)
    );
    if (
      (selects || (!this.selects && this.resolvedSelects !== 'ignore')) &&
      !event.item.menuData.selectionRoot
    ) {
      event.item.setRole(this.childRole);
      event.item.menuData.selectionRoot =
        event.item.menuData.selectionRoot || this;
      if (event.item.selected) {
        this.selectedItemsMap.set(event.item, true);
        this.selectedItems = [...this.selectedItems, event.item];
        this._selected = [...this.selected, event.item.value];
        this.value = this.selected.join(this.valueSeparator);
      }
    }
  }

  private addChildItem(item: MenuItem): void {
    this.childItemSet.add(item);
    this.handleItemsChanged();
  }

  private async removeChildItem(item: MenuItem): Promise<void> {
    if (item.focused || item.hasAttribute('focused') || item.active) {
      this._updateFocus = this.getNeighboringFocusableElement(item);
    }
    this.childItemSet.delete(item);
    this.cachedChildItems = undefined;
  }

  public constructor() {
    super();

    /**
     * only create an RTI if menu controls keyboard navigation and one does not already exist
     */
    if (!this.rovingTabindexController && this.controlsRovingTabindex) {
      this.rovingTabindexController = new RovingTabindexController<MenuItem>(
        this,
        {
          direction: 'vertical',
          focusInIndex: (elements: MenuItem[] | undefined) => {
            let firstEnabledIndex = -1;
            const firstSelectedIndex = elements?.findIndex((el, index) => {
              if (!elements[firstEnabledIndex] && !el.disabled) {
                firstEnabledIndex = index;
              }
              return el.selected && !el.disabled;
            });
            return elements &&
              firstSelectedIndex &&
              elements[firstSelectedIndex]
              ? firstSelectedIndex
              : firstEnabledIndex;
          },
          elements: () => this.childItems,
          isFocusableElement: this.isFocusableElement.bind(this),
          hostDelegatesFocus: true,
          stopKeyEventPropagation: true,
        }
      );
    }

    this.addEventListener(
      'sp-menu-item-added-or-updated',
      this.onSelectableItemAddedOrUpdated
    );
    this.addEventListener(
      'sp-menu-item-added-or-updated',
      this.onFocusableItemAddedOrUpdated,
      {
        capture: true,
      }
    );
    this.addEventListener('click', this.handleClick);
    this.addEventListener('touchend', this.handlePointerup);
    this.addEventListener('focusout', this.handleFocusout);
    this.addEventListener('sp-menu-item-keydown', this.handleKeydown);
    // Capture-phase keydown so mobile drill-down navigation between
    // the back row and the first nested item runs before the projected
    // submenu's `RovingTabindexController` (which would otherwise
    // wrap the focus within the nested menu).
    this.addEventListener(
      'keydown',
      this.handleMobileDrilldownKeydownCapture,
      true
    );
    this.addEventListener('pointerup', this.handlePointerup);
    this.addEventListener('sp-opened', this.handleSubmenuOpened);
    this.addEventListener('sp-closed', this.handleSubmenuClosed);

    // Add touch event listeners for iPad scroll detection
    this.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
    this.addEventListener('touchmove', this.handleTouchMove, {
      passive: true,
    });
  }

  /**
   * for picker elements, will set focus on first selected item
   */
  public focusOnFirstSelectedItem({ preventScroll }: FocusOptions = {}): void {
    if (!this.rovingTabindexController) {
      return;
    }
    const selectedItem = this.selectedItems.find((el) =>
      this.isFocusableElement(el)
    );
    if (!selectedItem) {
      this.focus({ preventScroll });
      return;
    }

    if (selectedItem && !preventScroll) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
    this.rovingTabindexController?.focusOnItem(selectedItem);
  }

  public override focus({ preventScroll }: FocusOptions = {}): void {
    if (this.rovingTabindexController) {
      if (
        !this.childItems.length ||
        this.childItems.every((childItem) => childItem.disabled)
      ) {
        return;
      }
      if (
        this.childItems.some(
          (childItem) => childItem.menuData.focusRoot !== this
        )
      ) {
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
  private handleTouchStart(event: TouchEvent): void {
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
  private handleTouchMove(event: TouchEvent): void {
    if (
      event.touches.length === 1 &&
      this.touchStartY !== undefined &&
      this.touchStartTime !== undefined
    ) {
      const currentY = event.touches[0].clientY;
      const deltaY = Math.abs(currentY - this.touchStartY);
      const deltaTime = Date.now() - this.touchStartTime;

      if (
        deltaY > this.scrollThreshold &&
        deltaTime < this.scrollTimeThreshold
      ) {
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
  private handleTouchEnd(): void {
    // Reset scrolling state after a short delay
    setTimeout(() => {
      this.isCurrentlyScrolling = false;
      this.touchStartY = undefined;
      this.touchStartTime = undefined;
    }, 100);
  }

  // if the click and pointerup events are on the same target, we should not
  // handle the click event.
  private pointerUpTarget = null as EventTarget | null;

  private handleFocusout(): void {
    if (!this.matches(':focus-within')) {
      this.rovingTabindexController?.reset();
    }
  }

  private handleClick(event: Event): void {
    if (this.pointerUpTarget === event.target) {
      this.pointerUpTarget = null;
      return;
    }
    this.handlePointerBasedSelection(event);
  }

  private handlePointerup(event: Event): void {
    // Reset scrolling state for iPad scroll detection
    // This ensures the scrolling state is properly reset for both touch
    // and pointer events, maintaining consistency across different input methods.
    this.handleTouchEnd();

    /*
     * early return if drag and select is not supported
     * in this case, selection will be handled by the click event
     */
    if (!this.shouldSupportDragAndSelect) {
      return;
    }
    this.pointerUpTarget = event.target;
    this.handlePointerBasedSelection(event);
  }

  private async handlePointerBasedSelection(event: Event): Promise<void> {
    // Only handle left clicks
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }

    // Prevent selection if we're currently scrolling (iPad fix)
    // This prevents accidental menu item selection when users are trying
    // to scroll through a long menu on iPad devices.
    if (this.isScrolling) {
      return;
    }

    const path = event.composedPath();
    const target = path.find((el) => {
      /* c8 ignore next 3 */
      if (!(el instanceof Element)) {
        return false;
      }
      return el.getAttribute('role') === this.childRole;
    }) as MenuItem;
    if (event.defaultPrevented) {
      const index = this.childItems.indexOf(target);
      if (target?.menuData?.focusRoot === this && index > -1) {
        this.focusedItemIndex = index;
      }
      return;
    }
    if (target?.href && target.href.length) {
      // This event will NOT ALLOW CANCELATION as link action
      // cancelation should occur on the `<sp-menu-item>` itself.
      this.dispatchEvent(
        new Event('change', {
          bubbles: true,
          composed: true,
        })
      );
      return;
    } else if (
      target?.menuData?.selectionRoot === this &&
      this.childItems.length
    ) {
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

  private descendentOverlays = new Map<Overlay, Overlay>();

  protected handleDescendentOverlayOpened(event: Event): void {
    const target = event.composedPath()[0] as MenuItem;
    /* c8 ignore next 1 */
    if (!target.overlayElement) {
      return;
    }
    this.descendentOverlays.set(target.overlayElement, target.overlayElement);
  }

  protected handleDescendentOverlayClosed(event: Event): void {
    const target = event.composedPath()[0] as MenuItem;
    /* c8 ignore next 1 */
    if (!target.overlayElement) {
      return;
    }
    this.descendentOverlays.delete(target.overlayElement);
  }

  public handleSubmenuClosed = (event: Event): void => {
    event.stopPropagation();
    if (this.mobileView) {
      this.resetMobileSubmenus();
      return;
    }
    const target = event.composedPath()[0] as Overlay;
    target.dispatchEvent(
      new Event('sp-menu-submenu-closed', {
        bubbles: true,
        composed: true,
      })
    );
  };

  /**
   * given a menu item, returns the next focusable menu item before or after it;
   * if no menu item is provided, returns the first focusable menu item
   *
   * @param menuItem {MenuItem}
   * @param before {boolean} return the item before; default is false
   * @returns {MenuItem}
   */
  public getNeighboringFocusableElement(
    menuItem?: MenuItem,
    before = false
  ): MenuItem {
    const diff = before ? -1 : 1;
    const elements = this.rovingTabindexController?.elements || [];
    const index = menuItem ? elements.indexOf(menuItem) : -1;
    let newIndex = Math.min(Math.max(0, index + diff), elements.length - 1);
    while (
      !this.isFocusableElement(elements[newIndex]) &&
      0 < newIndex &&
      newIndex < elements.length - 1
    ) {
      newIndex += diff;
    }
    return this.isFocusableElement(elements[newIndex])
      ? (elements[newIndex] as MenuItem)
      : menuItem || elements[0];
  }

  public handleSubmenuOpened = (event: Event): void => {
    event.stopPropagation();
    const target = event.composedPath()[0] as Overlay;
    target.dispatchEvent(
      new Event('sp-menu-submenu-opened', {
        bubbles: true,
        composed: true,
      })
    );

    const openedItem = event
      .composedPath()
      .find((el) => this.childItemSet.has(el as MenuItem));
    /* c8 ignore next 1 */
    if (!openedItem) {
      return;
    }
  };

  public async selectOrToggleItem(targetItem: MenuItem): Promise<void> {
    const resolvedSelects = this.resolvedSelects;
    const oldSelectedItemsMap = new Map(this.selectedItemsMap);
    const oldSelected = this.selected.slice();
    const oldSelectedItems = this.selectedItems.slice();
    const oldValue = this.value;

    if (targetItem.menuData.selectionRoot !== this) {
      return;
    }

    if (resolvedSelects === 'multiple') {
      if (this.selectedItemsMap.has(targetItem)) {
        this.selectedItemsMap.delete(targetItem);
      } else {
        this.selectedItemsMap.set(targetItem, true);
      }

      // Match HTML select and set the first selected
      // item as the value. Also set the selected array
      // in the order of the menu items.
      const selected: string[] = [];
      const selectedItems: MenuItem[] = [];

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
      new Event('change', {
        cancelable: true,
        bubbles: true,
        composed: true,
      })
    );

    if (!applyDefault) {
      // Cancel the event & don't apply the selection
      this._selected = oldSelected;
      this.selectedItems = oldSelectedItems;
      this.selectedItemsMap = oldSelectedItemsMap;
      this.value = oldValue;
      return;
    }
    // Apply the selection changes to the menu items
    if (resolvedSelects === 'single') {
      for (const oldItem of oldSelectedItemsMap.keys()) {
        if (oldItem !== targetItem) {
          oldItem.selected = false;
        }
      }
      targetItem.selected = true;
    } else if (resolvedSelects === 'multiple') {
      targetItem.selected = !targetItem.selected;
    } else if (
      !targetItem.hasSubmenu &&
      targetItem?.menuData?.focusRoot === this
    ) {
      this.dispatchEvent(new Event('close', { bubbles: true }));
    }
  }

  protected navigateBetweenRelatedMenus(event: MenuItemKeydownEvent): void {
    const { key, root } = event;
    const dir = this.dir;
    const shouldOpenSubmenu =
      (dir === 'ltr' && key === 'ArrowRight') ||
      (dir === 'rtl' && key === 'ArrowLeft');
    const shouldCloseSelfAsSubmenu =
      (dir === 'ltr' && key === 'ArrowLeft') ||
      (dir === 'rtl' && key === 'ArrowRight') ||
      key === 'Escape';
    const lastFocusedItem = root as MenuItem;

    if (this.mobileView) {
      if (shouldOpenSubmenu && lastFocusedItem?.hasSubmenu) {
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
      if (shouldOpenSubmenu && lastFocusedItem?.hasSubmenu) {
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
      if (lastFocusedItem?.hasSubmenu) {
        event.stopPropagation();
        lastFocusedItem.openOverlay(true);
      }
    } else if (shouldCloseSelfAsSubmenu && this.isSubmenu) {
      event.stopPropagation();
      this.dispatchEvent(new Event('close', { bubbles: true }));
      this.updateSelectedItemIndex();
    }
  }

  public handleKeydown(event: Event): void {
    if (event.defaultPrevented || !this.rovingTabindexController) {
      return;
    }
    if (this.mobileView && this._mobileSubmenuStack.length > 0) {
      const { key } = event as MenuItemKeydownEvent;
      const dir = this.dir;
      const shouldClose =
        (dir === 'ltr' && key === 'ArrowLeft') ||
        (dir === 'rtl' && key === 'ArrowRight') ||
        key === 'Escape';
      if (shouldClose) {
        event.stopPropagation();
        event.preventDefault();
        this.closeMobileSubmenu();
      }
      return;
    }
    const { key, root, shiftKey, target } = event as MenuItemKeydownEvent;
    const openSubmenuKey = ['Enter', ' '].includes(key);
    if (shiftKey && target !== this && this.hasAttribute('tabindex')) {
      this.removeAttribute('tabindex');
      const replaceTabindex = (event: FocusEvent | KeyboardEvent): void => {
        if (
          !(event as KeyboardEvent).shiftKey &&
          !this.hasAttribute('tabindex')
        ) {
          document.removeEventListener('keyup', replaceTabindex);
          this.removeEventListener('focusout', replaceTabindex);
        }
      };
      document.addEventListener('keyup', replaceTabindex);
      this.addEventListener('focusout', replaceTabindex);
    }
    if (key === 'Tab') {
      this.closeDescendentOverlays();
      return;
    }
    if (openSubmenuKey && root?.hasSubmenu && !root.open) {
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
    if (key === ' ' || key === 'Enter') {
      event.preventDefault();
      root?.focusElement?.click();
      if (root) {
        this.selectOrToggleItem(root);
      }
      return;
    }
    this.navigateBetweenRelatedMenus(event as MenuItemKeydownEvent);
  }

  private _hasUpdatedSelectedItemIndex = false;

  /**
   * on focus, removes focus from focus styling item, and updates the selected item index
   */
  private prepareToCleanUp(): void {
    document.addEventListener(
      'focusout',
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

  public updateSelectedItemIndex(): void {
    let firstOrFirstSelectedIndex = 0;
    const selectedItemsMap = new Map<MenuItem, boolean>();
    const selected: string[] = [];
    const selectedItems: MenuItem[] = [];
    let itemIndex = this.childItems.length;
    while (itemIndex) {
      itemIndex -= 1;
      const childItem = this.childItems[itemIndex];
      if (childItem.menuData.selectionRoot === this) {
        if (
          childItem.selected ||
          (!this._hasUpdatedSelectedItemIndex &&
            this.selected.includes(childItem.value))
        ) {
          firstOrFirstSelectedIndex = itemIndex;
          selectedItemsMap.set(childItem, true);
          selected.unshift(childItem.value);
          selectedItems.unshift(childItem);
        }
        // Remove "focused" from non-"selected" items ONLY
        // Preserve "focused" on index===0 when no selection
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

  private _willUpdateItems = false;
  private _updateFocus?: MenuItem;

  private handleItemsChanged(): void {
    this.cachedChildItems = undefined;
    if (!this._willUpdateItems) {
      this._willUpdateItems = true;
      this.cacheUpdated = this.updateCache();
    }
  }

  private async updateCache(): Promise<void> {
    if (!this.hasUpdated) {
      await Promise.all([
        new Promise((res) => requestAnimationFrame(() => res(true))),
        this.updateComplete,
      ]);
    } else {
      await new Promise((res) => requestAnimationFrame(() => res(true)));
    }
    if (this.cachedChildItems === undefined) {
      this.updateSelectedItemIndex();
      this.updateItemFocus();
    }

    this._willUpdateItems = false;
  }

  private updateItemFocus(): void {
    this.focusInItem?.setAttribute('tabindex', '0');
    if (this.childItems.length == 0) {
      return;
    }
  }

  public closeDescendentOverlays(): void {
    this.descendentOverlays.forEach((overlay) => {
      overlay.open = false;
    });
    this.descendentOverlays = new Map<Overlay, Overlay>();
  }

  private handleSlotchange({
    target,
  }: Event & { target: HTMLSlotElement }): void {
    const assignedElements = target.assignedElements({
      flatten: true,
    }) as MenuItem[];
    if (this.childItems.length !== assignedElements.length) {
      assignedElements.forEach((item) => {
        if (typeof item.triggerUpdate !== 'undefined') {
          item.triggerUpdate();
        } else if (typeof this.asMenu(item).childItems !== 'undefined') {
          this.asMenu(item).childItems.forEach((child) => {
            child.triggerUpdate();
          });
        }
      });
    }
    if (this._updateFocus) {
      this.rovingTabindexController?.focusOnItem(this._updateFocus);
      this._updateFocus = undefined;
    }
  }

  protected renderMenuItemSlot(): TemplateResult {
    return html`
      <slot
        @sp-menu-submenu-opened=${this.handleDescendentOverlayOpened}
        @sp-menu-submenu-closed=${this.handleDescendentOverlayClosed}
        @slotchange=${this.handleSlotchange}
      ></slot>
    `;
  }

  public override render(): TemplateResult {
    const hasMobileSubmenu =
      this.mobileView && this._mobileSubmenuStack.length > 0;
    return html`
      <div
        class=${hasMobileSubmenu ? 'mobile-slot-hidden' : 'mobile-slot-wrapper'}
      >
        ${this.renderMenuItemSlot()}
      </div>
      ${hasMobileSubmenu
        ? html`
            <div
              class="mobile-submenu-animation-wrapper"
              @animationend=${this._handleAnimationEnd}
            >
              <slot name="mobile-submenu"></slot>
            </div>
          `
        : ''}
    `;
  }

  protected override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    const updates: Promise<unknown>[] = [
      new Promise((res) => requestAnimationFrame(() => res(true))),
    ];
    [...this.children].forEach((item) => {
      if ((item as MenuItem).localName === 'sp-menu-item') {
        updates.push((item as MenuItem).updateComplete);
      }
    });
    this.childItemsUpdated = Promise.all(updates);
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (changes.has('selects') && this.hasUpdated) {
      this.selectsChanged();
    }
    if (
      changes.has('label') &&
      (this.label || typeof changes.get('label') !== 'undefined')
    ) {
      if (this.label) {
        this.setAttribute('aria-label', this.label);
        /* c8 ignore next 3 */
      } else {
        this.removeAttribute('aria-label');
      }
    }
    if (changes.has('mobileBackLabel') && this.hasUpdated) {
      this._refreshMobileBackElements();
    }
    if (changes.has('mobileView') && this.hasUpdated) {
      // When mobile view is turned off at runtime, restore any
      // projected submenus to their original parents so the menu
      // returns to a normal flyout layout cleanly.
      if (!this.mobileView && this._mobileSubmenuStack.length > 0) {
        this.resetMobileSubmenus();
      }
    }
  }

  protected selectsChanged(): void {
    const updates: Promise<unknown>[] = [
      new Promise((res) => requestAnimationFrame(() => res(true))),
    ];
    this.childItemSet.forEach((childItem) => {
      updates.push(childItem.triggerUpdate());
    });
    this.childItemsUpdated = Promise.all(updates);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role') && !this.ignore) {
      this.setAttribute('role', this.ownRole);
    }
    this.updateComplete.then(() => this.updateItemFocus());
  }

  private isFocusableElement(el: MenuItem): boolean {
    return el ? !el.disabled : false;
  }

  public override disconnectedCallback(): void {
    this.cachedChildItems = undefined;
    this.selectedItems = [];
    this.selectedItemsMap.clear();
    this.childItemSet.clear();
    this.descendentOverlays = new Map<Overlay, Overlay>();
    this.resetMobileSubmenus();
    this._mobileSubmenuOriginalParents.clear();
    super.disconnectedCallback();
  }

  protected childItemsUpdated!: Promise<unknown[]>;
  protected cacheUpdated = Promise.resolve();
  /* c8 ignore next 3 */
  protected resolveCacheUpdated = (): void => {
    return;
  };

  protected override async getUpdateComplete(): Promise<boolean> {
    const complete = (await super.getUpdateComplete()) as boolean;
    await this.childItemsUpdated;
    await this.cacheUpdated;
    return complete;
  }
}
