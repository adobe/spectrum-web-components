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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow500.js';
import '../sp-menu-divider.js';
import type { MenuItemKeydownEvent } from './MenuItem.js';
import { MenuItem } from './MenuItem.js';
export interface MenuChildItem {
    menuItem: MenuItem;
    managed: boolean;
    active: boolean;
    focusable: boolean;
    focusRoot: Menu;
}
declare const Menu_base: typeof SpectrumElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
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
export declare class Menu extends Menu_base {
    static get styles(): CSSResultArray;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    private get isSubmenu();
    private asMenu;
    private get _mobileViewRoot();
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
    private touchStartY;
    private touchStartTime;
    private isCurrentlyScrolling;
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
    private scrollThreshold;
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
    private scrollTimeThreshold;
    /**
     * Public getter for scrolling state
     * Returns true if the component is currently in a scrolling state
     */
    get isScrolling(): boolean;
    set isScrolling(value: boolean);
    /**
     * Returns the MenuItem whose submenu is currently displayed at the
     * top of the mobile drill-down stack, or `undefined` when no submenu
     * is open.
     */
    get currentMobileSubmenu(): MenuItem | undefined;
    /**
     * Opens a mobile submenu by projecting its content into this menu's
     * light DOM, pushing it onto the submenu stack, triggering the
     * slide-in animation, and focusing the back button.
     *
     * @param item - The MenuItem whose submenu should be opened.
     */
    openMobileSubmenu(item: MenuItem): void;
    /**
     * Closes the topmost mobile submenu by restoring it to its original
     * parent MenuItem, popping it from the stack, and either re-focusing
     * the previous submenu's back button or returning focus to the
     * triggering MenuItem when no deeper level remains.
     */
    closeMobileSubmenu(): void;
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
    private _focusProjectedSubmenu;
    /**
     * Focuses the mobile back button of the currently visible projected
     * submenu. Used when the user presses ArrowUp from the first nested
     * item so focus moves to the back row instead of wrapping. Manages
     * `tabIndex`/`focused` explicitly to keep the back row as the only
     * tabbable element in the projected submenu.
     */
    private _focusMobileBackRow;
    /**
     * Focuses the first focusable item inside the currently visible
     * projected submenu, skipping the back row. Used when the user
     * presses ArrowDown from the back row. Manages `tabIndex`/`focused`
     * explicitly so only the focused item is in the tab order.
     */
    private _focusFirstItemInCurrentNestedSubmenu;
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
    private handleMobileDrilldownKeydownCapture;
    /**
     * Triggers a CSS slide animation on the mobile submenu wrapper.
     * Waits for the current Lit update cycle, then sets the
     * `mobile-transition` attribute so the keyframe animation plays.
     *
     * @param direction - `'forward'` slides content in from the right,
     *   `'back'` slides content in from the left.
     */
    private _triggerMobileTransition;
    /**
     * Cleans up the `mobile-transition` attribute once the CSS slide
     * animation finishes, preventing the animation from replaying on
     * subsequent layout changes. Bound declaratively via `@animationend`
     * on the wrapper, so it only fires for that element.
     */
    private _handleAnimationEnd;
    /**
     * Restores every projected submenu back to its original parent and
     * clears the submenu stack. Called during `disconnectedCallback` or
     * when the menu overlay closes to ensure a clean state.
     */
    resetMobileSubmenus(): void;
    /**
     * Moves the submenu element from its MenuItem parent into this Menu's
     * light DOM with a `mobile-submenu` slot, so it projects through the
     * named slot in the shadow DOM. Any previously visible projected submenu
     * is moved to a non-rendered slot to avoid both showing at once.
     */
    private _projectMobileSubmenu;
    /**
     * Restores the submenu element back to its original MenuItem parent
     * and resets the slot attribute.
     */
    private _restoreMobileSubmenu;
    /**
     * Handles click on the mobile back button. Stops the event from
     * reaching parent menus and closes the current mobile submenu.
     */
    private handleMobileBackClick;
    /**
     * Maps each projected submenu element to its Lit render container so
     * that back button elements can be individually cleaned up when a
     * submenu is restored, without affecting other levels in the stack.
     */
    private _mobileBackContainers;
    /**
     * Declaratively renders the mobile back button and divider into the
     * projected submenu element using Lit's `render()`, so the back button
     * lives inside the same `<sp-menu>` and participates in its
     * `RovingTabindexController` for keyboard navigation. Re-renders
     * whenever `dir` or `mobileBackLabel` change so the icon orientation
     * and label stay in sync.
     */
    private _renderMobileBackElements;
    /**
     * Re-render any open mobile back containers so changes to
     * `mobileBackLabel` (and other reactive values consumed by the
     * back-button template) propagate without needing to close
     * and re-open the drill-down.
     */
    private _refreshMobileBackElements;
    /**
     * Removes the mobile back button render container from the given
     * projected submenu element.
     */
    private _removeMobileBackElements;
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
    private _restoreSubmenuChildState;
    /**
     * Maps each projected submenu element to its original parent so the
     * element can be moved back when the submenu is closed.
     */
    private _mobileSubmenuOriginalParents;
    /**
     * label of the menu
     */
    label: string;
    /**
     * whether menu should be ignored by roving tabindex controller
     */
    ignore: boolean;
    /**
     * Enables mobile submenu navigation where tapping a submenu item replaces
     * the current menu content with the submenu's children (drill-down) instead
     * of opening a flyout overlay.
     */
    mobileView: boolean;
    /**
     * Label for the mobile back button, used for localization.
     */
    mobileBackLabel: string;
    private _mobileSubmenuStack;
    /**
     * how the menu allows selection of its items:
     * - `undefined` (default): no selection is allowed
     * - `"inherit"`: the selection behavior is managed from an ancestor
     * - `"single"`: only one item can be selected at a time
     *  - `"multiple"`: multiple items can be selected
     */
    selects: undefined | 'inherit' | 'single' | 'multiple';
    /**
     * value of the selected item(s)
     */
    value: string;
    valueSeparator: string;
    /**
     * selected items values as string
     */
    get selected(): string[];
    set selected(selected: string[]);
    protected _selected: string[];
    /**
     * array of selected menu items
     */
    selectedItems: MenuItem[];
    menuSlot: HTMLSlotElement;
    private childItemSet;
    focusedItemIndex: number;
    focusInItemIndex: number;
    /**
     * Whether to support the pointerdown-drag-pointerup selection strategy.
     * Defaults to false to prevent click/touch events from being captured
     * behind the menu tray in mobile environments (since the menu closes
     * immediately on pointerup).
     */
    shouldSupportDragAndSelect: boolean;
    get focusInItem(): MenuItem | undefined;
    protected get controlsRovingTabindex(): boolean;
    private selectedItemsMap;
    /**
     * child items managed by menu
     */
    get childItems(): MenuItem[];
    private cachedChildItems;
    private updateCachedMenuItems;
    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    get childRole(): string;
    protected get ownRole(): string;
    /**
     * menuitem role based on selection type
     */
    private resolvedSelects?;
    /**
     * menu role based on selection type
     */
    private resolvedRole?;
    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the CAPTURE phase the first
     * Menu based element that the event encounters will manage the focus state of the
     * dispatching `<sp-menu-item>` element.
     *
     * @param event
     */
    private onFocusableItemAddedOrUpdated;
    /**
     * When a descendant `<sp-menu-item>` element is added or updated it will dispatch
     * this event to announce its presence in the DOM. During the BUBBLE phase the first
     * Menu based element that the event encounters that does not inherit selection will
     * manage the selection state of the dispatching `<sp-menu-item>` element.
     *
     * @param event
     */
    private onSelectableItemAddedOrUpdated;
    private addChildItem;
    private removeChildItem;
    constructor();
    /**
     * for picker elements, will set focus on first selected item
     */
    focusOnFirstSelectedItem({ preventScroll }?: FocusOptions): void;
    focus({ preventScroll }?: FocusOptions): void;
    /**
     * Handles touchstart events for iPad scroll detection.
     *
     * Records the initial touch position and timestamp to establish a baseline
     * for detecting scroll gestures. Only processes single-touch events to
     * avoid interference with multi-touch gestures.
     *
     * @param event - The TouchEvent from the touchstart event
     */
    private handleTouchStart;
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
    private handleTouchMove;
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
    private handleTouchEnd;
    private pointerUpTarget;
    private handleFocusout;
    private handleClick;
    private handlePointerup;
    private handlePointerBasedSelection;
    private descendentOverlays;
    protected handleDescendentOverlayOpened(event: Event): void;
    protected handleDescendentOverlayClosed(event: Event): void;
    handleSubmenuClosed: (event: Event) => void;
    /**
     * given a menu item, returns the next focusable menu item before or after it;
     * if no menu item is provided, returns the first focusable menu item
     *
     * @param menuItem {MenuItem}
     * @param before {boolean} return the item before; default is false
     * @returns {MenuItem}
     */
    getNeighboringFocusableElement(menuItem?: MenuItem, before?: boolean): MenuItem;
    handleSubmenuOpened: (event: Event) => void;
    selectOrToggleItem(targetItem: MenuItem): Promise<void>;
    protected navigateBetweenRelatedMenus(event: MenuItemKeydownEvent): void;
    handleKeydown(event: Event): void;
    private _hasUpdatedSelectedItemIndex;
    /**
     * on focus, removes focus from focus styling item, and updates the selected item index
     */
    private prepareToCleanUp;
    updateSelectedItemIndex(): void;
    private _willUpdateItems;
    private _updateFocus?;
    private handleItemsChanged;
    private updateCache;
    private updateItemFocus;
    closeDescendentOverlays(): void;
    private handleSlotchange;
    protected renderMenuItemSlot(): TemplateResult;
    render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues): void;
    protected updated(changes: PropertyValues<this>): void;
    protected selectsChanged(): void;
    connectedCallback(): void;
    private isFocusableElement;
    disconnectedCallback(): void;
    protected childItemsUpdated: Promise<unknown[]>;
    protected cacheUpdated: Promise<void>;
    protected resolveCacheUpdated: () => void;
    protected getUpdateComplete(): Promise<boolean>;
}
export {};
