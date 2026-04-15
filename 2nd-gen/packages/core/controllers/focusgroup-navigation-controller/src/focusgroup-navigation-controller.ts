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

import type { ReactiveController, ReactiveElement } from 'lit';

// ─────────────────────────
//     TYPES
// ─────────────────────────

/**
 * Spatial mode for arrow-key movement. Aligns with logical axes (inline/block) and a
 * 2D layout mode derived from element geometry.
 *
 * - **horizontal**: Arrow keys on the inline axis move focus (respects `dir`).
 * - **vertical**: Arrow keys on the block axis move focus.
 * - **both**: **ArrowLeft** / **ArrowRight** move along `getItems()` order like **horizontal**
 *   (respects `dir`); **ArrowUp** / **ArrowDown** move backward / forward in the same order.
 * - **grid**: Arrow keys move in rows and columns using bounding-rect layout; Ctrl+Home / Ctrl+End
 *   jump to the first cell of the first row or the last cell of the last row.
 */
export type FocusgroupDirection = 'horizontal' | 'vertical' | 'both' | 'grid';

/**
 * Options for {@link FocusgroupNavigationController}.
 */
export type FocusgroupNavigationOptions = {
  /**
   * Returns the current set of items that participate in roving tabindex and
   * directional navigation. Callers typically close over the host (for example
   * querying slotted or shadow DOM children).
   */
  getItems: () => HTMLElement[];

  /**
   * Determines which arrow keys move focus and how grid navigation is computed.
   * Use **`both`** when the same linear order should respond to horizontal and vertical arrow keys.
   */
  direction: FocusgroupDirection;

  /**
   * When true, arrow keys wrap from the last item to the first (and reverse).
   * Defaults to false.
   */
  wrap?: boolean;

  /**
   * When true, restoring focus into the composite (for example with Tab) targets
   * the item that was last focused, if it is still a member of the group.
   * Similar to the default memory behavior described for `focusgroup` in Open UI.
   * Defaults to true.
   */
  memory?: boolean;

  /**
   * When true, both natively `disabled` and `aria-disabled="true"` items are
   * skipped for arrow navigation and are not chosen as the roving tab stop.
   * When false (default), disabled items remain in sequence — useful for
   * patterns such as menus where disabled items may still be focusable per
   * APG guidance.
   *
   * **Note:** Regardless of this flag, natively `disabled` elements are never
   * chosen as the roving tab stop (`tabindex="0"`) because they cannot receive
   * browser focus; see {@link applyRovingTabindex}. A future revision may
   * decouple native `disabled` and `aria-disabled` into separate options if
   * component migrations surface the need.
   *
   * Defaults to false.
   */
  skipDisabled?: boolean;

  /**
   * Invoked after the active item changes and `tabindex` values are synchronized.
   * The argument is the new active element, or null when the group has no eligible items.
   */
  onActiveItemChange?: (active: HTMLElement | null) => void;

  /**
   * When set to a **non-zero** integer, **Page Up** / **Page Down** move focus by that many
   * positions in `getItems()` order for **`horizontal`**, **`vertical`**, and **`both`** modes
   * (respects **`wrap`** the same way as single-step arrows).
   * For **`grid`**, page keys move by that many **rows** (column index is clamped to each row’s
   * length). Omitted, `0`, `NaN`, and non-finite values disable page keys. The sign of the
   * number is ignored; only the magnitude is used.
   */
  pageStep?: number;
};

// ─────────────────────────
//     CONSTANTS
// ─────────────────────────

/**
 * Default boolean flags merged with the constructor `options` object.
 *
 * @internal
 */
const DEFAULT_OPTIONS = {
  wrap: false,
  memory: true,
  skipDisabled: false,
} as const;

/**
 * Tolerance in CSS pixels for grouping items into the same grid row when using
 * {@link FocusgroupDirection | `grid`} mode.
 *
 * @internal
 */
const GRID_ROW_TOLERANCE_PX = 6;

/**
 * Name of the `CustomEvent` dispatched on the host when the roving tabindex active item changes.
 *
 * The event `bubbles` and is `composed`. Handlers read
 * {@link FocusgroupNavigationActiveChangeDetail} from `event.detail`.
 */
export const focusgroupNavigationActiveChange =
  'swc-focusgroup-navigation-active-change';

/**
 * `detail` object for the {@link focusgroupNavigationActiveChange} event.
 */
export type FocusgroupNavigationActiveChangeDetail = {
  /**
   * Element that now has `tabindex="0"` among managed items, or null when the group is empty.
   */
  activeElement: HTMLElement | null;
};

/**
 * **FocusgroupNavigation** — implements the roving `tabindex` pattern from the APG
 * keyboard guide and directional navigation similar to the proposed `focusgroup`
 * attribute (Open UI). The exported class name is `FocusgroupNavigationController`.
 *
 * The controller:
 * - Keeps exactly one item in the tab order (`tabindex="0"`) per composite; sets
 *   `tabindex="-1"` on other items it manages.
 * - Handles Arrow keys, Home, and End for focus movement (and optionally wrap). **`both`**
 *   direction accepts horizontal and vertical arrows on the same `getItems()` sequence.
 *   In **`grid`** mode only, **Ctrl+Home** / **Ctrl+End** move to the first cell of the first
 *   row or the last cell of the last row (by layout-derived rows).
 * - Optional **`pageStep`**: **Page Up** / **Page Down** move by that many items (linear modes)
 *   or rows (**`grid`**).
 * - Optional **`skipDisabled`**: omit **`disabled`** and **`aria-disabled="true"`** items from
 *   roving tabindex and arrow navigation.
 * - Supports optional last-focused memory when re-entering via Tab.
 * - Exposes {@link FocusgroupNavigationController.setActiveItem} to choose the roving tab stop
 *   without calling `focus()`, and {@link FocusgroupNavigationController.focusFirstItemByTextPrefix}
 *   for typeahead-style roving `tabindex` (call {@link FocusgroupNavigationController.getActiveItem}
 *   and `focus()` yourself when you want keyboard focus to move). Arrow-key handling calls
 *   `setActiveItem` and `focus()` together.
 *
 * Dispatches a bubbling, composed `CustomEvent` named
 * {@link focusgroupNavigationActiveChange} when the active item changes.
 *
 * This is not a browser `focusgroup` implementation; it is a Lit reactive controller
 * for custom elements until native `focusgroup` is available.
 *
 * @example
 * ```typescript
 * class MyToolbar extends LitElement {
 *   private readonly navigation = new FocusgroupNavigationController(this, {
 *     direction: 'horizontal',
 *     wrap: true,
 *     getItems: () =>
 *       Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
 *   });
 *
 *   protected override firstUpdated(): void {
 *     super.firstUpdated();
 *     this.navigation.refresh();
 *   }
 * }
 * ```
 *
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents
 * @see https://open-ui.org/components/scoped-focusgroup.explainer/
 *
 * **Native `focusgroup` (future):** The comment block immediately below this class lists which
 * parts of this file are the most likely candidates for deprecation or deletion once browsers
 * ship built-in focus-group behavior that covers the same cases (especially roving tabindex and
 * arrow-key focus moves). Some options (for example rect-based **grid**, **pageStep**, or
 * **skipDisabled**) may remain useful longer if the platform surface stays narrower.
 */
// ─────────────────────────────────────────────────────────────────────────────
// Native `focusgroup` (future) — likely deprecation candidates
//
// If/when browsers implement `focusgroup` (or equivalent) with behavior comparable to this
// controller for your targets, consider removing or shrinking the following areas first:
//
// 1. Roving tabindex — `applyRovingTabindex()`, the tabindex portions of `refresh()` and
//    `setActiveItem()`, and assigning `tabIndex` to ineligible raw items.
//
// 2. Host keyboard interception — `handleKeydown()`, `hostConnected` / `hostDisconnected`
//    `keydown` listeners, `resolveManagedKeydownTarget()` (shadow retargeting workaround), and
//    navigation helpers: `navigateLinear`, `navigateBothAxes`, `navigateGrid`, `navigatePage`,
//    `navigatePageLinearItems`, `navigatePageGridRows`, `getEffectivePageMagnitude`, plus
//    Home/End and Ctrl+Home/Ctrl+End branches inside `handleKeydown`.
//
// 3. JS “memory” for Tab re-entry — `lastFocused`, `handleFocusin` / `handleFocusout` memory
//    paths, and `refresh()`’s preference for `lastFocused` when native group memory replaces
//    this pattern.
//
// Often slower to retire (verify against shipped HTML/Open UI behavior): `buildRows` and
// geometry-based **grid** navigation; **pageStep** (Page Up/Down magnitude); **skipDisabled** and
// `isDisabledForSkip`; `isNodeWithinHostScope` / `getRawItems` if declarative scoping differs in
// shadow DOM; `dispatchActiveChange`, `onActiveItemChange`, and the exported event name if
// products still want a single composed integration hook; `focusFirstItemByTextPrefix` for
// typeahead roving tabindex (callers focus `getActiveItem()` unless the platform adds an equivalent).
// `isRtl()` may
// duplicate or diverge from native axis mapping — revisit when testing RTL with native focusgroup.
// ─────────────────────────────────────────────────────────────────────────────

export class FocusgroupNavigationController implements ReactiveController {
  /**
   * Lit reactive host this controller is attached to.
   */
  private host: ReactiveElement;

  /**
   * Effective options (defaults merged with the latest `setOptions` / constructor values).
   */
  private options: FocusgroupNavigationOptions;

  /**
   * Capture-phase `keydown` listener reference for removal on disconnect.
   */
  private readonly boundKeydown = this.handleKeydown.bind(this);

  /**
   * Capture-phase `focusin` listener reference for removal on disconnect.
   */
  private readonly boundFocusin = this.handleFocusin.bind(this);

  /**
   * Capture-phase `focusout` listener reference for removal on disconnect.
   */
  private readonly boundFocusout = this.handleFocusout.bind(this);

  /**
   * Cached item for {@link FocusgroupNavigationOptions.memory} when the user moves focus
   * inside or out of the composite. Cleared when that node is no longer returned by
   * `getItems` or when the group becomes empty.
   */
  private lastFocused: HTMLElement | null = null;

  /**
   * Tracks the previously dispatched active item so that
   * {@link applyRovingTabindex} only fires the active-change event and
   * {@link FocusgroupNavigationOptions.onActiveItemChange} callback when the
   * active item actually changes.
   */
  private previousActive: HTMLElement | null = null;

  /**
   * Guard flag set during keyboard navigation so that the `focusin` triggered
   * by `item.focus()` does not redundantly call {@link applyRovingTabindex}.
   */
  private isNavigating = false;

  /**
   * Cached result of {@link getEligibleItems}, populated on first access within
   * a refresh cycle and cleared at the start of each entry point
   * ({@link refresh}, {@link handleFocusin}, {@link handleKeydown}).
   */
  private cachedEligibleItems: HTMLElement[] | null = null;

  /**
   * Cached result of {@link buildRows}, populated on first access within a
   * keydown cycle and cleared alongside {@link cachedEligibleItems}.
   */
  private cachedRows: HTMLElement[][] | null = null;

  // ─────────────────────────
  //     PUBLIC API
  // ─────────────────────────

  /**
   * Registers this instance on `host` via `addController` and merges `options` with defaults.
   *
   * @param host - Reactive element that owns the composite (arrow keys and tab order apply within its subtree).
   * @param options - `getItems`, `direction`, and optional behavior flags.
   */
  constructor(host: ReactiveElement, options: FocusgroupNavigationOptions) {
    this.host = host;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    host.addController(this);
  }

  /**
   * Merges `partial` into the current options and reapplies roving `tabindex` to the item set.
   *
   * @param partial - Fields to override; omitted keys keep their previous values.
   */
  public setOptions(partial: Partial<FocusgroupNavigationOptions>): void {
    this.options = { ...this.options, ...partial };
    this.refresh();
  }

  /**
   * Returns the eligible managed item that currently participates in the sequential focus order
   * (`tabindex="0"`), or null if no eligible item has tab index zero.
   *
   * @returns The active roving item, or null.
   */
  public getActiveItem(): HTMLElement | null {
    for (const el of this.getEligibleItems()) {
      if (el.tabIndex === 0) {
        return el;
      }
    }
    return null;
  }

  /**
   * Re-queries `getItems()`, recomputes eligibility, and syncs roving `tabindex`.
   *
   * Call after the item list or item eligibility changes (for example after Lit
   * `updated()` or slot changes). When {@link FocusgroupNavigationOptions.memory} is true,
   * prefers the stored last-focused item if it is still eligible; otherwise keeps the
   * current active item or falls back to the first eligible item.
   */
  public refresh(): void {
    this.cachedEligibleItems = null;
    this.cachedRows = null;
    const items = this.getEligibleItems();
    if (items.length === 0) {
      for (const el of this.getRawItems()) {
        el.tabIndex = -1;
      }
      this.lastFocused = null;
      if (this.previousActive !== null) {
        this.previousActive = null;
        this.dispatchActiveChange(null);
        this.options.onActiveItemChange?.(null);
      }
      return;
    }

    const preferred =
      (this.options.memory &&
      this.lastFocused &&
      items.includes(this.lastFocused)
        ? this.lastFocused
        : null) ??
      this.getActiveItem() ??
      items[0];

    this.applyRovingTabindex(preferred);
  }

  /**
   * Sets roving `tabindex` so `item` is the active tab stop (`tabindex="0"`) and others in the
   * group are `-1`. Does **not** call `focus()`. When {@link FocusgroupNavigationOptions.memory}
   * is true, updates the stored last-focused item so Tab re-entry can target this item.
   *
   * @param item - Item to mark active; must be returned by `getItems` and pass eligibility checks.
   * @returns False if `item` is not in the current eligible item list.
   */
  public setActiveItem(item: HTMLElement): boolean {
    const items = this.getEligibleItems();
    if (!items.includes(item)) {
      return false;
    }
    this.applyRovingTabindex(item);
    if (this.options.memory) {
      this.lastFocused = item;
    }
    return true;
  }

  /**
   * Updates roving `tabindex` so the first **eligible** item (same set as arrow navigation)
   * whose typeahead label starts with `prefix` becomes the active tab stop (`tabindex="0"`).
   * Matching is **case-insensitive**. The label is the first non-empty of: trimmed
   * **`aria-label`**, trimmed text from **`aria-labelledby`** references (in order, space-joined),
   * or trimmed **`textContent`**. Search order matches arrow-key traversal.
   *
   * Does **not** call `focus()`. After this returns `true`, call `focus()` on
   * {@link FocusgroupNavigationController.getActiveItem} (for example `getActiveItem()?.focus()`),
   * often from a **microtask** when the caller runs from a pointer handler so focus is not
   * overwritten by the clicked control.
   *
   * Typical use: menu typeahead; wire `keydown` or `input` at the host and debounce as needed.
   *
   * @param prefix - String to match as a leading substring after `trim`; whitespace-only yields
   *   no match and returns `false`.
   * @returns True if a matching item was found and roving tabindex was applied.
   */
  public focusFirstItemByTextPrefix(prefix: string): boolean {
    const trimmed = prefix.trim();
    if (trimmed === '') {
      return false;
    }
    const needle = trimmed.toLowerCase();
    const items = this.getEligibleItems();
    const match = items.find((el) => {
      const label = this.getItemTypeaheadLabel(el).toLowerCase();
      return label.startsWith(needle);
    });
    if (!match) {
      return false;
    }
    this.applyRovingTabindex(match);
    return true;
  }

  /**
   * Lit `ReactiveController` hook: registers capture-phase listeners on `host` and runs
   * an initial {@link refresh}.
   */
  public hostConnected(): void {
    this.previousActive = null;
    this.cachedEligibleItems = null;
    this.cachedRows = null;
    this.host.addEventListener('keydown', this.boundKeydown, true);
    this.host.addEventListener('focusin', this.boundFocusin, true);
    this.host.addEventListener('focusout', this.boundFocusout, true);
    this.refresh();
  }

  /**
   * Lit `ReactiveController` hook: removes listeners registered in {@link hostConnected}.
   */
  public hostDisconnected(): void {
    this.host.removeEventListener('keydown', this.boundKeydown, true);
    this.host.removeEventListener('focusin', this.boundFocusin, true);
    this.host.removeEventListener('focusout', this.boundFocusout, true);
  }

  // ─────────────────────────
  //     IMPLEMENTATION
  // ─────────────────────────
  //
  // Which parts may become redundant under native `focusgroup` is summarized in the
  // “Native `focusgroup` (future)” comment block directly above the class declaration.

  /**
   * Resolves writing direction from the computed style of the host element.
   *
   * Uses `getComputedStyle` rather than walking `dir` attributes so that
   * CSS-inherited direction (the 2nd-gen default) is correctly detected.
   *
   * @returns True when horizontal arrow directions should follow RTL semantics.
   */
  private isRtl(): boolean {
    return getComputedStyle(this.host).direction === 'rtl';
  }

  /**
   * Whether `node` is the host or reachable from it by walking `parentNode` and
   * `ShadowRoot.host` (so shadow descendants count, including nested shadow roots).
   *
   * `Element.contains()` is not used because it returns false for nodes inside the
   * host's shadow tree, which would drop every item for typical Lit components.
   *
   * @param node - Node to test (may be null).
   * @returns True if `node` is in the host's shadow-inclusive subtree.
   */
  private isNodeWithinHostScope(node: Node | null): boolean {
    if (!node) {
      return false;
    }
    const host = this.host;
    let current: Node | null = node;
    while (current) {
      if (current === host) {
        return true;
      }
      const parent: Node | null = current.parentNode;
      if (parent) {
        current = parent;
      } else if (current instanceof ShadowRoot) {
        current = current.host;
      } else {
        return false;
      }
    }
    return false;
  }

  /**
   * Items returned by `getItems` that lie within `host` (shadow-inclusive tree).
   *
   * @returns Candidates before eligibility filtering.
   */
  private getRawItems(): HTMLElement[] {
    return this.options
      .getItems()
      .filter((el) => this.isNodeWithinHostScope(el));
  }

  /**
   * {@link getRawItems} filtered by {@link isNavigableItem}.
   *
   * @returns Items that participate in roving tabindex and arrow navigation.
   */
  private getEligibleItems(): HTMLElement[] {
    if (this.cachedEligibleItems) {
      return this.cachedEligibleItems;
    }
    this.cachedEligibleItems = this.getRawItems().filter((el) =>
      this.isNavigableItem(el)
    );
    return this.cachedEligibleItems;
  }

  /**
   * {@link buildRows} with per-cycle caching, cleared alongside
   * {@link cachedEligibleItems}.
   *
   * @param items - Eligible items to lay out as a grid.
   * @returns Cached row-major array of rows.
   */
  private getRows(items: HTMLElement[]): HTMLElement[][] {
    if (this.cachedRows) {
      return this.cachedRows;
    }
    this.cachedRows = this.buildRows(items);
    return this.cachedRows;
  }

  /**
   * Whether `el` may participate in the focus group (connected, visible, not inert,
   * and not skipped when {@link FocusgroupNavigationOptions.skipDisabled} is true).
   *
   * @param el - Candidate from `getItems`.
   * @returns True if the element counts as navigable for this controller.
   */
  private isNavigableItem(el: HTMLElement): boolean {
    if (!el.isConnected) {
      return false;
    }
    if (el.hasAttribute('inert') || el.closest('[inert]')) {
      return false;
    }
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') {
      return false;
    }
    if (this.options.skipDisabled && this.isDisabledForSkip(el)) {
      return false;
    }
    return true;
  }

  /**
   * Whether `el` should be treated as disabled for {@link FocusgroupNavigationOptions.skipDisabled}.
   *
   * @param el - Element to test.
   * @returns True if the native `disabled` property is true or `aria-disabled` is `"true"`.
   */
  private isDisabledForSkip(el: HTMLElement): boolean {
    if ('disabled' in el && (el as HTMLButtonElement).disabled) {
      return true;
    }
    return el.getAttribute('aria-disabled') === 'true';
  }

  /**
   * String used for {@link focusFirstItemByTextPrefix}: prefers **`aria-label`**, then text from
   * **`aria-labelledby`** (IDs resolved in the shadow root or document), else **`textContent`**.
   * All branches are trimmed; empty strings fall through to the next source.
   */
  private getItemTypeaheadLabel(el: HTMLElement): string {
    const fromAria = el.getAttribute('aria-label')?.trim();
    if (fromAria) {
      return fromAria;
    }
    const labelledBy = el.getAttribute('aria-labelledby')?.trim();
    if (labelledBy) {
      const root = el.getRootNode();
      const chunks: string[] = [];
      for (const id of labelledBy.split(/\s+/)) {
        if (!id) {
          continue;
        }
        const ref =
          root instanceof ShadowRoot
            ? (root.getElementById(id) ?? el.ownerDocument.getElementById(id))
            : el.ownerDocument.getElementById(id);
        const t = ref?.textContent?.trim();
        if (t) {
          chunks.push(t);
        }
      }
      const joined = chunks.join(' ').trim();
      if (joined) {
        return joined;
      }
    }
    return el.textContent?.trim() ?? '';
  }

  /**
   * Whether `el` is natively disabled and therefore unable to receive focus
   * regardless of its `tabindex` value.
   */
  private isNativelyDisabled(el: HTMLElement): boolean {
    return 'disabled' in el && (el as HTMLButtonElement).disabled === true;
  }

  /**
   * Sets `tabindex="-1"` on ineligible raw items, then assigns `tabindex="0"` to
   * `active` (or the first eligible item if `active` is not eligible) and `-1` to the rest.
   *
   * When `skipDisabled` is false, natively disabled items remain in the eligible list
   * for arrow navigation but are never chosen as the roving tab stop because they
   * cannot receive focus. The tab stop falls through to the nearest non-disabled item.
   *
   * Dispatches the active-change event and {@link FocusgroupNavigationOptions.onActiveItemChange}.
   *
   * @param active - Preferred item to mark as the single tab stop when eligible.
   */
  private applyRovingTabindex(active: HTMLElement): void {
    const items = this.getEligibleItems();
    const eligibleSet = new Set(items);
    for (const el of this.getRawItems()) {
      if (!eligibleSet.has(el)) {
        el.tabIndex = -1;
      }
    }
    if (items.length === 0) {
      return;
    }

    let safeActive = eligibleSet.has(active) ? active : items[0];

    // Natively disabled elements cannot receive focus even with tabindex="0".
    // Fall through to the first non-disabled eligible item so the group
    // remains reachable via Tab.
    if (this.isNativelyDisabled(safeActive)) {
      safeActive =
        items.find((el) => !this.isNativelyDisabled(el)) ?? safeActive;
    }

    for (const el of items) {
      if (el === safeActive) {
        el.tabIndex = 0;
      } else {
        el.tabIndex = -1;
      }
    }
    if (safeActive !== this.previousActive) {
      this.previousActive = safeActive;
      this.dispatchActiveChange(safeActive);
      this.options.onActiveItemChange?.(safeActive);
    }
  }

  /**
   * Dispatches {@link focusgroupNavigationActiveChange} on the reactive host with the given detail.
   *
   * @param activeElement - New active item, or null when clearing selection.
   */
  private dispatchActiveChange(activeElement: HTMLElement | null): void {
    this.host.dispatchEvent(
      new CustomEvent<FocusgroupNavigationActiveChangeDetail>(
        focusgroupNavigationActiveChange,
        {
          bubbles: true,
          composed: true,
          detail: { activeElement },
        }
      )
    );
  }

  /**
   * Capture-phase `focusin` handler: syncs roving `tabindex` when focus moves to a managed item
   * (for example via pointer), and updates memory when enabled.
   *
   * @param event - Focus event whose target may be a group item.
   */
  private handleFocusin(event: FocusEvent): void {
    if (this.isNavigating) {
      return;
    }
    this.cachedEligibleItems = null;
    this.cachedRows = null;
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const items = this.getEligibleItems();
    if (!items.includes(target)) {
      return;
    }
    this.applyRovingTabindex(target);
    if (this.options.memory) {
      this.lastFocused = target;
    }
  }

  /**
   * Capture-phase `focusout` handler: when focus leaves the host subtree, stores the
   * previous target for {@link FocusgroupNavigationOptions.memory}.
   *
   * @param event - Focus event; `relatedTarget` stays inside the host when moving between items.
   */
  private handleFocusout(event: FocusEvent): void {
    const next = event.relatedTarget;
    if (next instanceof Node && this.isNodeWithinHostScope(next)) {
      return;
    }
    const target = event.target;
    if (
      this.options.memory &&
      target instanceof HTMLElement &&
      this.getRawItems().includes(target)
    ) {
      this.lastFocused = target;
    }
    // When memory is off, reset the roving tab stop to the first eligible
    // item so Tab re-entry always starts from the beginning.
    if (!this.options.memory) {
      this.cachedEligibleItems = null;
      this.cachedRows = null;
      const items = this.getEligibleItems();
      if (items.length > 0) {
        this.applyRovingTabindex(items[0]);
      }
    }
  }

  /**
   * Resolves which managed item should receive arrow, Home, End, or grid Ctrl+Home / Ctrl+End
   * handling for this key event.
   *
   * Listeners on the shadow **host** often see a **retargeted** {@link KeyboardEvent.target}
   * (the host) while focus is on a descendant inside the shadow tree, so matching
   * `event.target` against `getItems()` fails. {@link Event.composedPath} still includes the
   * focused node; we also fall back to {@link ShadowRoot.activeElement} when needed.
   *
   * @param event - Keyboard event dispatched while focus is in this composite.
   * @param items - Current eligible items from {@link getEligibleItems}.
   * @returns The managed element to treat as keydown target, or null.
   */
  private resolveManagedKeydownTarget(
    event: KeyboardEvent,
    items: HTMLElement[]
  ): HTMLElement | null {
    if (items.length === 0) {
      return null;
    }
    const set = new Set(items);
    for (const node of event.composedPath()) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }
      if (set.has(node)) {
        return node;
      }
      if (node === this.host) {
        break;
      }
    }
    const root = this.host.shadowRoot;
    const active = root?.activeElement;
    if (active instanceof HTMLElement && set.has(active)) {
      return active;
    }
    return null;
  }

  /**
   * Capture-phase `keydown` handler: arrow keys and Home/End move focus among eligible items
   * when the event target is managed; calls `preventDefault` when handling navigation.
   *
   * When {@link FocusgroupDirection | `direction`} is **`both`**, **ArrowLeft** / **ArrowRight**
   * and **ArrowUp** / **ArrowDown** all participate (see {@link navigateBothAxes}).
   *
   * When {@link FocusgroupDirection | `direction`} is **`grid`**, **Ctrl+Home** focuses the
   * first cell in the first row and **Ctrl+End** focuses the last cell in the last row (from
   * {@link buildRows}); other modifier combinations are ignored except plain Home/End.
   *
   * When {@link FocusgroupNavigationOptions.pageStep} is a non-zero finite number, **Page Up**
   * and **Page Down** are handled before arrow keys (see {@link navigatePage}).
   *
   * @param event - Keyboard event from the focused element inside the host.
   */
  private handleKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.altKey) {
      return;
    }

    this.cachedEligibleItems = null;
    this.cachedRows = null;
    const items = this.getEligibleItems();
    const target = this.resolveManagedKeydownTarget(event, items);
    if (!target) {
      return;
    }

    const isGrid = this.options.direction === 'grid';
    const rows = isGrid ? this.getRows(items) : null;

    if (
      isGrid &&
      event.ctrlKey &&
      !event.metaKey &&
      (event.key === 'Home' || event.key === 'End')
    ) {
      if (rows!.length > 0) {
        const firstRow = rows![0];
        const lastRow = rows![rows!.length - 1];
        const boundary =
          event.key === 'Home'
            ? (firstRow?.[0] ?? null)
            : (lastRow?.[lastRow.length - 1] ?? null);
        if (boundary && boundary !== target) {
          event.preventDefault();
          this.moveKeyNavigationFocusTo(boundary);
        }
      }
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    const pageMagnitude = this.getEffectivePageMagnitude();
    if (
      pageMagnitude !== null &&
      (event.key === 'PageUp' || event.key === 'PageDown')
    ) {
      const pageNext = this.navigatePage(
        items,
        target,
        event.key === 'PageDown' ? pageMagnitude : -pageMagnitude,
        rows
      );
      if (pageNext && pageNext !== target) {
        event.preventDefault();
        this.moveKeyNavigationFocusTo(pageNext);
      }
      return;
    }

    const rtl = this.isRtl();
    let next: HTMLElement | null = null;

    switch (this.options.direction) {
      case 'horizontal':
        next = this.navigateLinear(items, target, event.key, 'horizontal', rtl);
        break;
      case 'vertical':
        next = this.navigateLinear(items, target, event.key, 'vertical', rtl);
        break;
      case 'both':
        next = this.navigateBothAxes(items, target, event.key, rtl);
        break;
      case 'grid':
        next = this.navigateGrid(target, event.key, rtl, rows!);
        break;
      default:
        break;
    }

    if (next && next !== target) {
      event.preventDefault();
      this.moveKeyNavigationFocusTo(next);
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      if (isGrid) {
        // APG grid pattern: Home/End scope to the current row.
        // Ctrl+Home/End (entire grid) is handled above.
        const pos = this.findGridIndex(rows!, target);
        if (!pos) {
          return;
        }
        const currentRow = rows![pos.row];
        if (!currentRow?.length) {
          return;
        }
        const boundary =
          event.key === 'Home'
            ? currentRow[0]
            : currentRow[currentRow.length - 1];
        if (boundary && boundary !== target) {
          event.preventDefault();
          this.moveKeyNavigationFocusTo(boundary);
        }
      } else {
        if (items.length === 0) {
          return;
        }
        const boundary =
          event.key === 'Home' ? items[0] : items[items.length - 1];
        if (boundary && boundary !== target) {
          event.preventDefault();
          this.moveKeyNavigationFocusTo(boundary);
        }
      }
    }
  }

  /**
   * Applies roving tabindex to `item` and moves DOM focus; used for keyboard navigation only.
   */
  private moveKeyNavigationFocusTo(item: HTMLElement): void {
    this.isNavigating = true;
    try {
      if (this.setActiveItem(item)) {
        item.focus();
      }
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * Positive step count for {@link FocusgroupNavigationOptions.pageStep}, or null when page keys
   * are disabled.
   */
  private getEffectivePageMagnitude(): number | null {
    const raw = this.options.pageStep;
    if (raw === undefined) {
      return null;
    }
    const n = Math.trunc(Number(raw));
    if (!Number.isFinite(n) || n === 0) {
      return null;
    }
    return Math.abs(n);
  }

  /**
   * Target for **Page Up** / **Page Down** when {@link getEffectivePageMagnitude} is set.
   *
   * @param items - Eligible items.
   * @param current - Focused item.
   * @param signedDelta - `+magnitude` for Page Down or `-magnitude` for Page Up (items for
   *   linear modes, rows for `grid`).
   */
  private navigatePage(
    items: HTMLElement[],
    current: HTMLElement,
    signedDelta: number,
    rows: HTMLElement[][] | null
  ): HTMLElement | null {
    if (this.options.direction === 'grid') {
      return this.navigatePageGridRows(current, signedDelta, rows!);
    }
    return this.navigatePageLinearItems(items, current, signedDelta);
  }

  /**
   * Page Up/Down along `getItems()` order (used for `horizontal`, `vertical`, and `both`).
   */
  private navigatePageLinearItems(
    items: HTMLElement[],
    current: HTMLElement,
    deltaIdx: number
  ): HTMLElement | null {
    const idx = items.indexOf(current);
    if (idx < 0 || items.length === 0) {
      return null;
    }
    let nextIdx = idx + deltaIdx;
    if (this.options.wrap) {
      const len = items.length;
      nextIdx = ((nextIdx % len) + len) % len;
    } else {
      nextIdx = Math.max(0, Math.min(items.length - 1, nextIdx));
    }
    return items[nextIdx] ?? null;
  }

  /**
   * Page Up/Down by whole rows in `grid` mode (column clamped per {@link navigateGrid}).
   */
  private navigatePageGridRows(
    current: HTMLElement,
    rowDelta: number,
    grid: HTMLElement[][]
  ): HTMLElement | null {
    if (grid.length === 0) {
      return null;
    }
    const pos = this.findGridIndex(grid, current);
    if (!pos) {
      return null;
    }
    const { row, col } = pos;
    let nextRow = row + rowDelta;
    if (this.options.wrap) {
      const n = grid.length;
      nextRow = ((nextRow % n) + n) % n;
    } else {
      nextRow = Math.max(0, Math.min(grid.length - 1, nextRow));
    }
    const targetRow = grid[nextRow];
    if (!targetRow?.length) {
      return null;
    }
    const clampedCol = Math.min(col, targetRow.length - 1);
    return targetRow[clampedCol] ?? null;
  }

  /**
   * Computes the next focus target for linear {@link FocusgroupDirection} modes.
   *
   * @param items - Eligible items in traversal order.
   * @param current - Currently focused item.
   * @param key - `KeyboardEvent.key` value.
   * @param mode - `horizontal` (inline axis) or `vertical` (block axis).
   * @param rtl - When true, horizontal Left/Right swap forward/backward.
   * @returns Next item, or null if the key is not a navigation key or movement is blocked.
   */
  private navigateLinear(
    items: HTMLElement[],
    current: HTMLElement,
    key: string,
    mode: 'horizontal' | 'vertical',
    rtl: boolean
  ): HTMLElement | null {
    const idx = items.indexOf(current);
    if (idx < 0) {
      return null;
    }

    let delta = 0;
    if (mode === 'horizontal') {
      if (key === 'ArrowLeft') {
        delta = rtl ? 1 : -1;
      } else if (key === 'ArrowRight') {
        delta = rtl ? -1 : 1;
      }
    } else {
      if (key === 'ArrowUp') {
        delta = -1;
      } else if (key === 'ArrowDown') {
        delta = 1;
      }
    }

    if (delta === 0) {
      return null;
    }

    let nextIdx = idx + delta;
    if (this.options.wrap) {
      nextIdx = (nextIdx + items.length) % items.length;
    } else if (nextIdx < 0 || nextIdx >= items.length) {
      return null;
    }
    return items[nextIdx] ?? null;
  }

  /**
   * Computes the next focus target when {@link FocusgroupDirection | `direction`} is **`both`**:
   * inline arrows use the same deltas as {@link navigateLinear} `horizontal` mode; **ArrowUp** /
   * **ArrowDown** step backward / forward in `getItems()` order (not flipped by `dir`).
   *
   * @param items - Eligible items in traversal order.
   * @param current - Currently focused item.
   * @param key - `KeyboardEvent.key` value.
   * @param rtl - When true, horizontal Left/Right swap forward/backward.
   * @returns Next item, or null if the key is not handled or movement is blocked.
   */
  private navigateBothAxes(
    items: HTMLElement[],
    current: HTMLElement,
    key: string,
    rtl: boolean
  ): HTMLElement | null {
    const idx = items.indexOf(current);
    if (idx < 0) {
      return null;
    }

    let delta = 0;
    if (key === 'ArrowLeft') {
      delta = rtl ? 1 : -1;
    } else if (key === 'ArrowRight') {
      delta = rtl ? -1 : 1;
    } else if (key === 'ArrowUp') {
      delta = -1;
    } else if (key === 'ArrowDown') {
      delta = 1;
    }

    if (delta === 0) {
      return null;
    }

    let nextIdx = idx + delta;
    if (this.options.wrap) {
      nextIdx = (nextIdx + items.length) % items.length;
    } else if (nextIdx < 0 || nextIdx >= items.length) {
      return null;
    }
    return items[nextIdx] ?? null;
  }

  /**
   * Computes the next focus target for `grid` {@link FocusgroupDirection} mode using
   * row clustering and column indices.
   *
   * @param current - Currently focused item.
   * @param key - `KeyboardEvent.key` value.
   * @param rtl - When true, horizontal Left/Right swap column direction within a row.
   * @param grid - Pre-built row grid from {@link buildRows}.
   * @returns Next cell item, or null if the key is not handled or movement is blocked.
   */
  private navigateGrid(
    current: HTMLElement,
    key: string,
    rtl: boolean,
    grid: HTMLElement[][]
  ): HTMLElement | null {
    const pos = this.findGridIndex(grid, current);
    if (!pos) {
      return null;
    }
    const { row, col } = pos;
    const rowItems = grid[row] ?? [];
    let nextRow = row;
    let nextCol = col;

    switch (key) {
      case 'ArrowLeft':
        nextCol = rtl ? col + 1 : col - 1;
        break;
      case 'ArrowRight':
        nextCol = rtl ? col - 1 : col + 1;
        break;
      case 'ArrowUp':
        nextRow = row - 1;
        break;
      case 'ArrowDown':
        nextRow = row + 1;
        break;
      default:
        return null;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      if (nextCol >= 0 && nextCol < rowItems.length) {
        return rowItems[nextCol] ?? null;
      }
      if (this.options.wrap && rowItems.length > 0) {
        const wrappedCol = (nextCol + rowItems.length) % rowItems.length;
        return rowItems[wrappedCol] ?? null;
      }
      return null;
    }

    if (nextRow < 0 || nextRow >= grid.length) {
      if (this.options.wrap && grid.length > 0) {
        nextRow = (nextRow + grid.length) % grid.length;
      } else {
        return null;
      }
    }

    const targetRow = grid[nextRow];
    if (!targetRow?.length) {
      return null;
    }
    const clampedCol = Math.min(col, targetRow.length - 1);
    return targetRow[clampedCol] ?? null;
  }

  /**
   * Groups `items` into rows by similar `getBoundingClientRect().top`, then sorts each row by `left`.
   *
   * @param items - Eligible elements to lay out as a grid.
   * @returns Row-major array of rows; each row is left-to-right.
   */
  private buildRows(items: HTMLElement[]): HTMLElement[][] {
    type RowAcc = { top: number; elements: HTMLElement[] };
    const rows: RowAcc[] = [];

    for (const el of items) {
      const top = el.getBoundingClientRect().top;
      let row = rows.find(
        (r) => Math.abs(r.top - top) <= GRID_ROW_TOLERANCE_PX
      );
      if (!row) {
        row = { top, elements: [] };
        rows.push(row);
      }
      row.elements.push(el);
    }

    rows.sort((a, b) => a.top - b.top);
    return rows.map((r) =>
      r.elements.sort(
        (a, b) =>
          a.getBoundingClientRect().left - b.getBoundingClientRect().left
      )
    );
  }

  /**
   * Locates `el` in a row-major grid built by {@link buildRows}.
   *
   * @param grid - Rows of elements.
   * @param el - Element to find.
   * @returns Row and column indices, or null if absent.
   */
  private findGridIndex(
    grid: HTMLElement[][],
    el: HTMLElement
  ): { row: number; col: number } | null {
    for (let r = 0; r < grid.length; r++) {
      const c = grid[r].indexOf(el);
      if (c !== -1) {
        return { row: r, col: c };
      }
    }
    return null;
  }
}
