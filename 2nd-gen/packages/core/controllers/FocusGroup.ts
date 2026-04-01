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

/**
 * The navigation axis for arrow-key movement within a focus group.
 *
 * - `'horizontal'` — Left/Right arrows only (maps to inline axis).
 * - `'vertical'` — Up/Down arrows only (maps to block axis).
 * - `'both'` — All four arrow keys navigate linearly through the list.
 * - `'grid'` — All four arrow keys navigate; Up/Down move by
 *   {@link FocusGroupController.directionLength} positions to simulate
 *   row-based 2-D movement (APG grid pattern).
 *
 * ### Relationship to the proposed `focusgroup` HTML attribute
 *
 * The `focusgroup` proposal (Open UI / WHATWG) uses `inline` and `block`
 * modifier tokens that map to CSS logical axes. When the native attribute
 * ships, `'horizontal'` here corresponds to `inline` (in horizontal
 * writing modes) and `'vertical'` to `block`. Grid-mode navigation is
 * **not yet specified** as a single `focusgroup` behavior token; it is
 * handled here via `'grid'` + {@link FocusGroupController.directionLength}.
 *
 * @see https://developer.chrome.com/blog/focusgroup-rfc
 * @see https://open-ui.org/components/focusgroup.explainer/
 */
type DirectionTypes = 'horizontal' | 'vertical' | 'both' | 'grid';

/**
 * Configuration object for {@link FocusGroupController}.
 *
 * All properties except `elements` are optional and fall back to sensible
 * defaults when omitted.
 *
 * @template T - The type of focusable elements managed by the controller.
 *                Must extend `HTMLElement`.
 *
 * @example
 * ```typescript
 * const config: FocusGroupConfig<HTMLButtonElement> = {
 *     elements: () => [...this.querySelectorAll('button')],
 *     direction: 'horizontal',
 *     isFocusableElement: (el) => !el.disabled,
 *     focusInIndex: (elements) => elements.findIndex((el) => el.selected),
 * };
 * ```
 */
export type FocusGroupConfig<T> = {
  /**
   * Whether the host element uses `delegatesFocus: true` in its shadow root.
   * When `true`, focus management adjusts for the browser's automatic focus
   * delegation behavior to avoid double-focusing.
   *
   * @default false
   */
  hostDelegatesFocus?: boolean;

  /**
   * Determines which element should receive focus when the group is first
   * entered via Tab. Accepts either a static index or a function that
   * receives the current elements array and returns an index.
   *
   * Common use cases:
   * - Return `0` (default) to always start at the first element.
   * - Return the index of a "selected" or "active" item (e.g. the active tab
   *   in a tablist).
   *
   * This is analogous to the `focusgroupstart` attribute in the proposed
   * `focusgroup` HTML specification.
   *
   * @default 0
   * @see https://developer.chrome.com/blog/focusgroup-rfc
   */
  focusInIndex?: (_elements: T[]) => number;

  /**
   * The navigation axis. Accepts a static value or a function that returns
   * one, allowing the direction to change dynamically (e.g. based on
   * viewport or layout).
   *
   * @default 'both'
   * @see {@link DirectionTypes}
   */
  direction?: DirectionTypes | (() => DirectionTypes);

  /**
   * Callback invoked when an element is about to receive focus via arrow-key
   * navigation. Called *before* the element is actually focused, allowing
   * the host to update selection state, expand panels, etc.
   *
   * For a tablist, this is where you'd update `aria-selected` and show/hide
   * the associated tabpanel before focus moves to the tab.
   */
  elementEnterAction?: (el: T) => void;

  /**
   * A function that returns the ordered array of elements participating in
   * the focus group. Called each time the internal cache is invalidated
   * (e.g. after DOM mutations).
   *
   * **Required.** There is no default; an empty-array fallback is used only
   * as a type-level guard.
   */
  elements: () => T[];

  /**
   * Predicate that determines whether an element should be included in
   * arrow-key navigation. Elements failing this check are skipped when
   * navigating circularly.
   *
   * Common use: skip `disabled` or `hidden` items.
   *
   * This mirrors the native `focusgroup` behavior of automatically skipping
   * disabled, hidden, and inert items.
   *
   * @default () => true  (all elements are focusable)
   */
  isFocusableElement?: (el: T) => boolean;

  /**
   * The DOM element (or a function returning one) that scopes which
   * `focusin` / `focusout` events this controller reacts to. Events
   * originating outside this scope are ignored.
   *
   * Useful when the host renders multiple independent groups and needs to
   * restrict navigation to a sub-tree.
   *
   * @default the host element itself
   */
  listenerScope?: HTMLElement | (() => HTMLElement);

  /**
   * When `true`, handled arrow-key events call `event.stopPropagation()` to
   * prevent parent composite widgets from also reacting to the same key.
   *
   * Set this when nesting one focus group inside another (e.g. a toolbar
   * inside a dialog) to avoid the outer group from intercepting arrows
   * meant for the inner group.
   *
   * @default false
   */
  stopKeyEventPropagation?: boolean;
};

/**
 * Coerces a config value into a getter function. If the value is already a
 * function it is returned as-is; if it is a primitive of the expected `type`
 * it is wrapped in a closure; otherwise the `fallback` function is used.
 */
function ensureMethod<T, RT>(
  value: T | RT | undefined,
  type: string,
  fallback: T
): T {
  if (typeof value === type) {
    return (() => value) as T;
  } else if (typeof value === 'function') {
    return value as T;
  }
  return fallback;
}

/**
 * A Lit reactive controller that implements **focus-group** (roving focus)
 * keyboard navigation for composite widgets.
 *
 * This controller handles the shared keyboard interaction patterns described
 * in the WAI-ARIA Authoring Practices Guide (APG) for widgets such as
 * toolbars, tablists, menus, listboxes, radio groups, and grids:
 *
 * - **Arrow-key navigation** among a set of focusable elements, respecting
 *   a configurable axis (`horizontal`, `vertical`, `both`, or `grid`).
 * - **Home / End** keys jump to the first / last focusable element.
 * - **Circular wrapping** — navigation wraps from the last element back to
 *   the first (and vice versa) when moving linearly.
 * - **Skipping non-focusable items** — disabled, hidden, or otherwise
 *   non-participating elements are automatically bypassed.
 * - **Focus memory** — the last-focused element index is retained so that
 *   returning to the group (e.g. via Tab) restores the user's position.
 * - **Dynamic element lists** — a `MutationObserver` watches for attribute
 *   changes on participating elements and updates the internal cache;
 *   additions/removals are handled on the next cache invalidation.
 * - **Grid mode** — when `direction` is `'grid'`, Up/Down keys move by
 *   `directionLength` positions, enabling 2-D navigation across rows and
 *   columns per the APG grid pattern.
 *
 * ### How this relates to the proposed `focusgroup` HTML attribute
 *
 * The `focusgroup` attribute (Chromium experimental, Open UI proposal) aims
 * to make this class of behavior declarative and platform-native. When
 * `focusgroup` ships in stable browsers, components should prefer the native
 * attribute. Until then, this controller serves as the behavioral equivalent.
 *
 * Key mapping between this controller and the proposal:
 *
 * | Controller concept            | `focusgroup` equivalent              |
 * | ----------------------------- | ------------------------------------ |
 * | `direction: 'horizontal'`     | `focusgroup="<behavior> inline"`     |
 * | `direction: 'vertical'`       | `focusgroup="<behavior> block"`      |
 * | `direction: 'both'`           | `focusgroup="<behavior>"`            |
 * | `focusInIndex` / focus memory | `focusgroupstart` + default memory   |
 * | `isFocusableElement`          | Native skip of disabled/hidden/inert |
 * | `stopKeyEventPropagation`     | Nested focusgroup scoping            |
 * | `direction: 'grid'`           | Not yet in the proposal              |
 *
 * Feature detection for native support:
 * ```typescript
 * const hasNativeFocusgroup = 'focusgroup' in HTMLElement.prototype;
 * ```
 *
 * @template T - The type of elements managed by this controller.
 *               Must extend `HTMLElement`.
 *
 * @example
 * ```typescript
 * // Horizontal toolbar with disabled-item skipping
 * class MyToolbar extends LitElement {
 *     private focusGroup = new FocusGroupController<HTMLButtonElement>(this, {
 *         elements: () => [...this.querySelectorAll('button')],
 *         direction: 'horizontal',
 *         isFocusableElement: (el) => !el.disabled,
 *     });
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Grid layout (e.g. color swatches, 5 items per row)
 * class MyGrid extends LitElement {
 *     private focusGroup = new FocusGroupController<HTMLElement>(this, {
 *         elements: () => [...this.querySelectorAll('[role="gridcell"]')],
 *         direction: 'grid',
 *     });
 *
 *     protected override firstUpdated(): void {
 *         this.focusGroup.directionLength = 5; // items per row
 *     }
 * }
 * ```
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#keyboardinteraction
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/grid/
 * @see https://developer.chrome.com/blog/focusgroup-rfc
 */
export class FocusGroupController<
  T extends HTMLElement,
> implements ReactiveController {
  /** Lazily cached element list; cleared on mutation or manual invalidation. */
  protected cachedElements?: T[];

  /**
   * Watches for attribute changes on participating elements (e.g. `disabled`
   * toggling) so the controller can re-evaluate focusability.
   */
  private mutationObserver: MutationObserver;

  /**
   * The zero-based index of the currently focused element within
   * {@link elements}. Returns {@link focusInIndex} when no explicit index
   * has been set yet (i.e. the group has not been interacted with).
   *
   * The getter/setter pair accounts for a virtual `offset` used when
   * elements are virtualized (only a subset of the full list is rendered).
   */
  get currentIndex(): number {
    if (this._currentIndex === -1) {
      this._currentIndex = this.focusInIndex;
    }
    return this._currentIndex - this.offset;
  }

  set currentIndex(currentIndex) {
    this._currentIndex = currentIndex + this.offset;
  }

  private _currentIndex = -1;

  /** Tracks the previously focused index so tab-index cleanup can target it. */
  private prevIndex = -1;

  /**
   * The resolved navigation direction. When the config supplies a function,
   * this getter evaluates it on every access so direction can respond to
   * dynamic layout changes.
   */
  get direction(): DirectionTypes {
    return this._direction();
  }

  _direction = (): DirectionTypes => 'both';

  /**
   * The number of columns (items per row) when `direction` is `'grid'`.
   * Up/Down arrow keys move by this many positions.
   *
   * Has no effect when direction is not `'grid'`.
   *
   * @default 5
   */
  public directionLength = 5;

  /**
   * Whether the host's shadow root was created with `delegatesFocus: true`.
   * Adjusts internal focus bookkeeping accordingly.
   *
   * @default false
   */
  public hostDelegatesFocus = false;

  /**
   * Callback invoked when an element is about to receive focus during
   * arrow-key navigation. Runs *before* the element is focused.
   *
   * @see {@link FocusGroupConfig.elementEnterAction}
   */
  elementEnterAction = (_el: T): void => {
    return;
  };

  /**
   * The ordered list of elements participating in this focus group.
   * Results are cached after the first access; call
   * {@link clearElementCache} to force a refresh.
   */
  get elements(): T[] {
    if (!this.cachedElements) {
      this.cachedElements = this._elements();
    }
    return this.cachedElements;
  }

  private _elements!: () => T[];

  /**
   * Whether the host currently contains keyboard focus. While `true`, the
   * controller listens for `keydown` and `focusout` to handle navigation
   * and exit. Subclasses (e.g. {@link RovingTabindexController}) may
   * override the setter to trigger tabindex management when focus state
   * changes.
   */
  protected set focused(focused: boolean) {
    /* c8 ignore next 1 */
    if (focused === this.focused) {
      return;
    }
    this._focused = focused;
  }

  protected get focused(): boolean {
    return this._focused;
  }

  private _focused = false;

  /**
   * The element that should receive focus when the user Tabs into the group.
   * Determined by {@link focusInIndex}.
   */
  get focusInElement(): T {
    return this.elements[this.focusInIndex];
  }

  /**
   * The index of the element that should receive focus on initial Tab entry.
   * Evaluated by calling the configured `focusInIndex` function with the
   * current elements array.
   */
  get focusInIndex(): number {
    return this._focusInIndex(this.elements);
  }

  _focusInIndex = (_elements: T[]): number => 0;

  /** The host reactive element that owns this controller. */
  host: ReactiveElement;

  /**
   * Predicate that decides whether an element participates in arrow-key
   * navigation. Non-focusable elements are skipped during circular
   * index advancement.
   *
   * @default () => true
   */
  isFocusableElement = (_el: T): boolean => true;

  /**
   * Checks whether a given event originated within the configured listener
   * scope. Returns `true` if no custom scope is set (i.e. scope equals the
   * host). Used to filter out focus events from unrelated sub-trees.
   */
  isEventWithinListenerScope(event: Event): boolean {
    if (this._listenerScope() === this.host) {
      return true;
    }
    return event.composedPath().includes(this._listenerScope());
  }

  _listenerScope = (): HTMLElement => this.host;

  /**
   * Offset applied when the element list is virtualized. The delta between
   * the conceptual first element and the first *rendered* element.
   *
   * For non-virtualized lists this remains `0`.
   *
   * @default 0
   */
  offset = 0;

  /**
   * `true` during the first update cycle after `hostConnected`. Used to
   * defer mutation-observer setup until the host has rendered its children.
   */
  recentlyConnected = false;

  /**
   * When `true`, handled arrow-key events call `stopPropagation()`.
   *
   * @see {@link FocusGroupConfig.stopKeyEventPropagation}
   * @default false
   */
  stopKeyEventPropagation = false;

  /**
   * Creates a new `FocusGroupController` and registers it with the host.
   *
   * @param host - The Lit reactive element that owns this controller.
   * @param config - Configuration for the focus group behavior.
   * @param config.hostDelegatesFocus - Whether the host uses `delegatesFocus`.
   * @param config.direction - Navigation axis (`'horizontal'`, `'vertical'`, `'both'`, or `'grid'`).
   * @param config.elementEnterAction - Callback invoked before an element receives focus via arrow keys.
   * @param config.elements - Function returning the ordered array of participating elements.
   * @param config.focusInIndex - Determines the initial focus target on Tab entry.
   * @param config.isFocusableElement - Predicate to skip non-focusable items during navigation.
   * @param config.listenerScope - DOM scope for filtering focus events.
   * @param config.stopKeyEventPropagation - Whether to stop propagation on handled arrow keys.
   */
  constructor(
    host: ReactiveElement,
    {
      hostDelegatesFocus,
      direction,
      elementEnterAction,
      elements,
      focusInIndex,
      isFocusableElement,
      listenerScope,
      stopKeyEventPropagation,
    }: FocusGroupConfig<T> = { elements: () => [] }
  ) {
    this.mutationObserver = new MutationObserver(() => {
      this.handleItemMutation();
    });
    this.hostDelegatesFocus = hostDelegatesFocus || false;
    this.stopKeyEventPropagation = stopKeyEventPropagation || false;
    this.host = host;
    this.host.addController(this);
    this._elements = elements;
    this.isFocusableElement = isFocusableElement || this.isFocusableElement;
    this._direction = ensureMethod<() => DirectionTypes, DirectionTypes>(
      direction,
      'string',
      this._direction
    );
    this.elementEnterAction = elementEnterAction || this.elementEnterAction;
    this._focusInIndex = ensureMethod<(_elements: T[]) => number, number>(
      focusInIndex,
      'number',
      this._focusInIndex
    );
    this._listenerScope = ensureMethod<() => HTMLElement, HTMLElement>(
      listenerScope,
      'object',
      this._listenerScope
    );
  }

  /**
   * Responds to attribute mutations on participating elements (observed via
   * `MutationObserver`). When an element is removed from the DOM while it
   * held focus, the controller advances focus to the nearest valid sibling.
   */
  handleItemMutation(): void {
    if (
      this._currentIndex == -1 ||
      this.elements.length <= this._elements().length
    ) {
      return;
    }
    const focusedElement = this.elements[this.currentIndex];
    this.clearElementCache();
    if (this.elements.includes(focusedElement)) {
      return;
    }
    const moveToNextElement = this.currentIndex !== this.elements.length;
    const diff = moveToNextElement ? 1 : -1;
    if (moveToNextElement) {
      this.setCurrentIndexCircularly(-1);
    }
    this.setCurrentIndexCircularly(diff);
    this.focus();
  }

  /**
   * Replaces the element source function and re-initializes the controller.
   * Useful when the host swaps its item list at runtime (e.g. switching
   * between two sets of tabs).
   */
  update({ elements }: FocusGroupConfig<T> = { elements: () => [] }): void {
    this.unmanage();
    this._elements = elements;
    this.clearElementCache();
    this.manage();
  }

  /**
   * Resets the focus position back to the initial element (as determined by
   * `focusInIndex`). Updates tabindex attributes so the reset element is
   * tabbable and the previously focused element is not.
   */
  reset(): void {
    const elements = this.elements;
    if (!elements.length) {
      return;
    }
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
      elements[this.prevIndex]?.setAttribute('tabindex', '-1');
      focusElement.setAttribute('tabindex', '0');
    }
  }

  /**
   * Programmatically focuses a specific item in the group. Updates the
   * internal index and removes tabindex from the previously focused item.
   *
   * @param item - The element to focus. If `undefined` or not focusable,
   *               the call is effectively a no-op for index update but
   *               still calls {@link focus}.
   * @param options - Standard `FocusOptions` (e.g. `{ preventScroll: true }`).
   */
  focusOnItem(item?: T, options?: FocusOptions): void {
    const elements = this.elements || [];
    const newIndex: number =
      !item || !this.isFocusableElement(item) ? -1 : elements.indexOf(item);
    if (newIndex > -1) {
      this.currentIndex = newIndex;
      elements[this.prevIndex]?.setAttribute('tabindex', '-1');
    }
    this.focus(options);
  }

  /**
   * Moves DOM focus to the element at {@link currentIndex}. If that element
   * is not focusable, advances circularly to find the next valid candidate.
   * Also manages `tabindex` so only the focused element is tabbable.
   *
   * @param options - Standard `FocusOptions` forwarded to `element.focus()`.
   */
  focus(options?: FocusOptions): void {
    const elements = this.elements;
    if (!elements.length) {
      return;
    }
    let focusElement = elements[this.currentIndex];
    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      if (
        !this.hostDelegatesFocus ||
        elements[this.prevIndex] !== focusElement
      ) {
        elements[this.prevIndex]?.setAttribute('tabindex', '-1');
      }
      focusElement.tabIndex = 0;
      focusElement.focus(options);
      if (this.hostDelegatesFocus && !this.focused) {
        this.hostContainsFocus();
      }
    }
  }

  /**
   * Invalidates the cached element list and re-attaches the mutation
   * observer to the fresh set of elements. Call this after the host's
   * children change (items added/removed/reordered).
   *
   * @param offset - Virtual scroll offset. Defaults to `0`.
   */
  clearElementCache(offset = 0): void {
    this.mutationObserver.disconnect();
    delete this.cachedElements;
    this.offset = offset;
    requestAnimationFrame(() => {
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true,
        });
      });
    });
  }

  /**
   * Advances {@link currentIndex} by `diff` positions, wrapping circularly
   * and skipping elements that fail {@link isFocusableElement}. Guarantees
   * termination by limiting iterations to the element count.
   *
   * @param diff - Positive to move forward, negative to move backward.
   */
  setCurrentIndexCircularly(diff: number): void {
    const { length } = this.elements;
    let steps = length;
    this.prevIndex = this.currentIndex;
    let nextIndex = (length + this.currentIndex + diff) % length;
    while (
      steps &&
      this.elements[nextIndex] &&
      !this.isFocusableElement(this.elements[nextIndex])
    ) {
      nextIndex = (length + nextIndex + diff) % length;
      steps -= 1;
    }
    this.currentIndex = nextIndex;
  }

  /**
   * Called when focus enters the host. Attaches `keydown` and `focusout`
   * listeners so the controller can handle arrow-key navigation and
   * detect when focus leaves the group.
   */
  hostContainsFocus(): void {
    this.host.addEventListener('focusout', this.handleFocusout);
    this.host.addEventListener('keydown', this.handleKeydown);
    this.focused = true;
  }

  /**
   * Called when focus leaves the host. Removes navigation listeners and
   * re-attaches the `focusin` listener to detect future entry.
   */
  hostNoLongerContainsFocus(): void {
    this.host.addEventListener('focusin', this.handleFocusin);
    this.host.removeEventListener('focusout', this.handleFocusout);
    this.host.removeEventListener('keydown', this.handleKeydown);
    this.focused = false;
  }

  /**
   * Checks whether the `relatedTarget` of a `FocusEvent` is *not* one of
   * the managed elements (or contained within one). Used by `focusout` to
   * determine whether focus truly left the group or merely moved between
   * items.
   */
  isRelatedTargetOrContainAnElement(event: FocusEvent): boolean {
    const relatedTarget = event.relatedTarget as null | Element;

    const isRelatedTargetAnElement = this.elements.includes(relatedTarget as T);
    const isRelatedTargetContainedWithinElements = this.elements.some((el) =>
      el.contains(relatedTarget)
    );
    return !(
      isRelatedTargetAnElement || isRelatedTargetContainedWithinElements
    );
  }

  /**
   * `focusin` handler. Identifies which managed element received focus,
   * updates `currentIndex`, and transitions the controller into the
   * "focused" state (attaching keydown/focusout listeners).
   */
  handleFocusin = (event: FocusEvent): void => {
    if (!this.isEventWithinListenerScope(event)) {
      return;
    }

    const path = event.composedPath() as T[];
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
   * `click` handler. Ensures the clicked element becomes the tabbable item
   * in the group by updating its `tabindex` to `0` and the previous item's
   * to `-1`. Covers both keyboard-triggered clicks and pointer clicks.
   */
  handleClick = (): void => {
    const elements = this.elements;
    if (!elements.length) {
      return;
    }
    let focusElement = elements[this.currentIndex];
    if (this.currentIndex < 0) {
      return;
    }
    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      elements[this.prevIndex]?.setAttribute('tabindex', '-1');
      focusElement.setAttribute('tabindex', '0');
    }
  };

  /**
   * `focusout` handler. Detects when focus leaves the group entirely
   * (as opposed to moving between managed elements) and transitions to
   * the "unfocused" state.
   */
  handleFocusout = (event: FocusEvent): void => {
    if (this.isRelatedTargetOrContainAnElement(event)) {
      this.hostNoLongerContainsFocus();
    }
  };

  /**
   * Returns `true` if the given key is relevant to the current direction
   * configuration. Includes `Home` and `End` for all directions.
   *
   * @param key - The `KeyboardEvent.key` value.
   */
  acceptsEventKey(key: string): boolean {
    if (key === 'End' || key === 'Home') {
      return true;
    }
    switch (this.direction) {
      case 'horizontal':
        return key === 'ArrowLeft' || key === 'ArrowRight';
      case 'vertical':
        return key === 'ArrowUp' || key === 'ArrowDown';
      case 'both':
      case 'grid':
        return key.startsWith('Arrow');
    }
  }

  /**
   * Core `keydown` handler. Maps arrow keys, Home, and End to index changes:
   *
   * - **ArrowRight** / **ArrowDown** — move forward (Down moves by
   *   `directionLength` in grid mode).
   * - **ArrowLeft** / **ArrowUp** — move backward (Up moves by
   *   `directionLength` in grid mode).
   * - **Home** — jump to the first focusable element.
   * - **End** — jump to the last focusable element.
   *
   * In grid mode, movement clamps at the boundaries instead of wrapping
   * (matching the APG grid pattern expectation). In all other modes,
   * movement wraps circularly.
   *
   * After computing the new index, calls {@link elementEnterAction}
   * followed by {@link focus}.
   */
  handleKeydown = (event: KeyboardEvent): void => {
    if (!this.acceptsEventKey(event.key) || event.defaultPrevented) {
      return;
    }
    let diff = 0;
    this.prevIndex = this.currentIndex;
    switch (event.key) {
      case 'ArrowRight':
        diff += 1;
        break;
      case 'ArrowDown':
        diff += this.direction === 'grid' ? this.directionLength : 1;
        break;
      case 'ArrowLeft':
        diff -= 1;
        break;
      case 'ArrowUp':
        diff -= this.direction === 'grid' ? this.directionLength : 1;
        break;
      case 'End':
        this.currentIndex = 0;
        diff -= 1;
        break;
      case 'Home':
        this.currentIndex = this.elements.length - 1;
        diff += 1;
        break;
    }
    event.preventDefault();
    if (this.stopKeyEventPropagation) {
      event.stopPropagation();
    }
    if (this.direction === 'grid' && this.currentIndex + diff < 0) {
      this.currentIndex = 0;
    } else if (
      this.direction === 'grid' &&
      this.currentIndex + diff > this.elements.length - 1
    ) {
      this.currentIndex = this.elements.length - 1;
    } else {
      this.setCurrentIndexCircularly(diff);
    }
    this.elementEnterAction(this.elements[this.currentIndex]);
    this.focus();
  };

  /**
   * Activates the controller: attaches `focusin` and `click` listeners.
   * Called automatically during `hostConnected` and can be called manually
   * to re-enable navigation after {@link unmanage}.
   */
  manage(): void {
    this.addEventListeners();
  }

  /**
   * Deactivates the controller: removes all event listeners. The controller
   * stops responding to keyboard and focus events until {@link manage} is
   * called again.
   */
  unmanage(): void {
    this.removeEventListeners();
  }

  /** Attaches the baseline `focusin` and `click` listeners to the host. */
  addEventListeners(): void {
    this.host.addEventListener('focusin', this.handleFocusin);
    this.host.addEventListener('click', this.handleClick);
  }

  /** Removes all event listeners this controller may have attached. */
  removeEventListeners(): void {
    this.host.removeEventListener('focusin', this.handleFocusin);
    this.host.removeEventListener('focusout', this.handleFocusout);
    this.host.removeEventListener('keydown', this.handleKeydown);
    this.host.removeEventListener('click', this.handleClick);
  }

  /** Lifecycle: called when the host element is connected to the DOM. */
  hostConnected(): void {
    this.recentlyConnected = true;
    this.addEventListeners();
  }

  /** Lifecycle: called when the host element is disconnected from the DOM. */
  hostDisconnected(): void {
    this.mutationObserver.disconnect();
    this.removeEventListeners();
  }

  /**
   * Lifecycle: called after the host's `updated()`. On the first update
   * after connection, attaches the mutation observer to all managed
   * elements so attribute changes (e.g. `disabled`) trigger cache
   * invalidation.
   */
  hostUpdated(): void {
    if (this.recentlyConnected) {
      this.recentlyConnected = false;
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true,
        });
      });
    }
  }
}
