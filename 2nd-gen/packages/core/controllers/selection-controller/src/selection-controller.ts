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
 * Controls how the roster handles selection.
 *
 * - **`single`**: at most one item selected at a time; clicking the active item has no effect.
 * - **`single-toggle`**: at most one item selected at a time; clicking the active item deselects it.
 * - **`multiple`**: any number of items may be selected; clicking an item toggles it.
 */
export type SelectionMode = 'single' | 'single-toggle' | 'multiple';

/**
 * Options for {@link SelectionController}.
 */
export type SelectionControllerOptions = {
  /**
   * Returns the current participant set. Items outside the host subtree (shadow-inclusive)
   * are ignored.
   */
  getItems: () => HTMLElement[];

  /**
   * Invoked when {@link item} enters the selected state.
   *
   * @param item - Item becoming selected.
   */
  selectItem: (item: HTMLElement) => void;

  /**
   * Invoked when {@link item} leaves the selected state.
   *
   * @param item - Item becoming deselected.
   */
  deselectItem: (item: HTMLElement) => void;

  /**
   * Controls how clicks change the selection.
   *
   * - **`single`** (default): at most one item; clicking the active item has no effect.
   * - **`single-toggle`**: at most one item; clicking the active item deselects it.
   * - **`multiple`**: any number; clicking an item toggles it.
   */
  mode?: SelectionMode;

  /**
   * When **`true`**, asserts the first eligible item after **`refresh`** when nothing is selected.
   * Only meaningful in `single` and `single-toggle` modes.
   */
  defaultToFirstSelectable?: boolean;

  /**
   * When **`true`**, **Enter** or **Space** on an eligible item toggles it using the current
   * **`mode`** rules. Pair with **`FocusgroupNavigationController`** for arrow-key focus moves;
   * this controller does not implement roving **`tabindex`** or arrow navigation.
   */
  keydownActivation?: boolean;

  /**
   * When **`false`**, this controller never attaches its own capture-phase **`click`** /
   * **`keydown`** listeners, so user interaction can never drive a transition. Use this when a
   * consumer's items already own their own interaction handling (their own click binding, their
   * own cancelable-event lifecycle) and the controller is only wanted for its mode-aware
   * selection bookkeeping — pair with **`observeEvent`** and **`readSelected`** so the controller
   * reacts to the item's own event instead. Defaults to **`true`**.
   */
  enableInteraction?: boolean;

  /**
   * When provided, the current selection is *read live from the items themselves* on every
   * decision (`toggleItem`, `setSelectedItem`, `setOptions` mode-switch normalization, `refresh`,
   * interactive clicks/keys) instead of from this controller's internal cache. Use this for
   * self-owning items — an accordion item with its own `open` property, a menu item with its own
   * `selected` state — where the item can change that state independently of this controller (its
   * own click handler, a direct property/attribute set). Without `readSelected`, the internal
   * cache can drift from what the items actually show, which is why `multiple` mode is unsafe to
   * drive through a cache-based controller for this kind of item: extending a stale cached set can
   * re-open an item a consumer already closed. With `readSelected`, there is no cache to drift —
   * every decision reflects what is true on the DOM right now. Pair with `observeEvent` so the
   * controller also reacts when an item changes itself.
   */
  readSelected?: (item: HTMLElement) => boolean;

  /**
   * Name of a bubbling custom event, dispatched by a self-owning item on its own initiative (for
   * example an accordion item's own cancelable toggle event), that this controller listens for
   * instead of capturing `click`/`keydown` itself. Pair with `readSelected` — required when this
   * option is set. On the event, this controller waits a microtask (so a cancelable event that the
   * item itself reverts has already settled), reads the item's live state via `readSelected`, and
   * — in `single` / `single-toggle` mode, when the item is now selected — asserts it as the sole
   * selection, closing every other live-selected item via the normal mutator rescan. In `multiple`
   * mode this is a no-op: a self-owning item toggling itself needs no cross-item enforcement, so
   * this controller does nothing. **Only takes effect when `enableInteraction` is `false`** —
   * enforced, not just documented: the two are alternative ways of learning about a selection
   * attempt, not additive, so a consumer that sets both never gets both paths firing for the same
   * click.
   */
  observeEvent?: string;

  /**
   * Optional callback with the `{ selectedItems, addedItems, removedItems }` shape of
   * {@link SelectionControllerChangeDetail} — this controller's only notification channel; it
   * never dispatches a DOM event (see {@link SelectionController.applySelectionTransition}).
   *
   * **Fires on every commit, including `{ silent: true }` transitions** — unlike
   * `confirmSelectionChange`, `silent` does not gate this callback. Silent transitions exist to
   * reconcile controller state from participants whose
   * selected-ish state changed independently (an external property write, a `defaultToFirstSelectable`
   * assertion during a silent `refresh`), and this callback is frequently the *only* channel a host
   * uses to mirror that reconciled selection into its own public property — see `swc-tabs`'
   * `onSelectionChange`, which is how a silently-applied default-selected tab reaches the host's
   * `selected` property. Gating this callback on `silent` would break that pattern. Keep it
   * idempotent and side-effect-light beyond mirroring state (safe: setting a property; risky: an
   * analytics call), since it may also run for a transition that a moment later gets rolled back by
   * `confirmSelectionChange` returning `false`.
   */
  onSelectionChange?: (detail: SelectionControllerChangeDetail) => void;

  /**
   * Called **after** **`selectItem`** / **`deselectItem`** have already run for the proposed
   * transition — so if you dispatch your own cancelable event from inside this callback (the
   * common pattern), listeners reading selected-ish state synchronously see the *new* value, not
   * the prior one. Return **`false`** to abort: the transition (mutators, internal state, and
   * the **`onSelectionChange`** mirror) is rolled back to the prior selection and no change event
   * is dispatched. Omit for unconditional commits. Not called for transitions committed with
   * **`{ silent: true }`** (see {@link SelectionController.setSelectedItem} and
   * {@link SelectionController.refresh}), nor for transitions this controller makes to enforce
   * its own invariants — removing a disconnected item on **`refresh`**, normalizing a **`mode`**
   * switch via **`setOptions`**, and asserting **`defaultToFirstSelectable`** are never vetoable,
   * since reverting any of them would leave the controller violating the invariant it was
   * enforcing.
   */
  confirmSelectionChange?: (
    detail: SelectionControllerConfirmDetail
  ) => boolean;

  /**
   * Optional override for the eligibility disabled check. When provided, called instead of the
   * built-in **`disabled`** property / **`aria-disabled="true"`** heuristic. Use this when a
   * consumer's disabled state cascades from an ancestor or is computed rather than reflected
   * directly on the participant itself (for example, a parent-disabled flag mirrored only onto
   * internal shadow DOM, not onto the participant element `getItems` returns).
   */
  isDisabled?: (item: HTMLElement) => boolean;

  /**
   * Optional override for the whole eligibility check — connected, not `inert`, not `hidden`,
   * not disabled, and CSS-visible. When provided, called instead of the built-in check, which
   * ends in a native `checkVisibility` call. Use this for a large or virtualized list that can
   * guarantee its items are never CSS-hidden, to skip that call entirely; the built-in default
   * stays correct for everyone else, since it only pays for `checkVisibility` after every cheaper
   * signal (connected, `hidden`, disabled, `inert`) has already passed.
   */
  isSelectable?: (item: HTMLElement) => boolean;
};

/**
 * Payload mirrored to {@link SelectionControllerOptions.onSelectionChange}. This controller has
 * no DOM event of its own — see {@link SelectionController.applySelectionTransition} for why —
 * so this shape only ever reaches consumers through that callback.
 */
export type SelectionControllerChangeDetail = {
  /** Current selection after the change. */
  selectedItems: HTMLElement[];
  /** Items that became selected in this transition. */
  addedItems: HTMLElement[];
  /** Items that became deselected in this transition. */
  removedItems: HTMLElement[];
};

/**
 * Payload for {@link SelectionControllerOptions.confirmSelectionChange}.
 */
export type SelectionControllerConfirmDetail = {
  /**
   * Selection for this transition — already applied (mutators have run, internal state
   * reflects it) by the time this callback is called. Reverted if this callback returns
   * **`false`**.
   */
  candidateItems: HTMLElement[];
  /** Selection before this transition; what state reverts to if this callback returns **`false`**. */
  priorItems: HTMLElement[];
};

/**
 * Returns the deepest entry from {@link Event.composedPath} that participates in {@link items}.
 *
 * @param event - Interaction bubbling through shadow roots.
 * @param items - Pre-filtered collection (eligible slice).
 */
export function deepestSelectionItemContaining(
  event: Event,
  items: HTMLElement[]
): HTMLElement | null {
  const set = new Set(items);
  for (const node of event.composedPath()) {
    if (node instanceof HTMLElement && set.has(node)) {
      return node;
    }
  }
  return null;
}

/**
 * Manages item selection across a set of sibling elements in three modes: **`single`**,
 * **`single-toggle`**, and **`multiple`**. You supply **`getItems`** (who participates),
 * **`selectItem`** / **`deselectItem`** (how DOM or ARIA reflects state), and **`mode`**
 * (selection behavior).
 *
 * - **`single`**: one item may be selected; clicking the selected item has no effect.
 * - **`single-toggle`**: one item may be selected; clicking the selected item deselects it.
 * - **`multiple`**: any number of items may be selected; clicks toggle individual items.
 *
 * This controller handles capture-phase **`click`** and optional capture-phase **`keydown`**
 * (**Enter** / **Space**) when **`keydownActivation`** is **`true`**, unless
 * **`enableInteraction`** is **`false`**. Pair with **`FocusgroupNavigationController`** when
 * the composite also needs roving **`tabindex`**, arrow keys, Home/End, or focus memory; this
 * controller does not implement those behaviors.
 *
 * Call **`setOptions({ mode })`** at any time to switch modes without reconstructing the
 * controller. When switching from **`multiple`** to a single-item mode and more than one item
 * is currently selected, all but the first item are deselected.
 *
 * **Mutators always reflect a live scan, not the cached selection.** {@link
 * SelectionController.applyMutators}, called by every transition, walks a fresh
 * `getItems()` result and calls `selectItem` / `deselectItem` for every item based on
 * membership in the transition's `next` set — never based on what this controller previously
 * believed was selected. This is what makes **`{ silent: true }`** calls (see
 * {@link SelectionController.setSelectedItem} and {@link SelectionController.refresh}) safe to
 * use for reconciling from participants whose selected-ish state can also change independently
 * of this controller (for example, an item with its own public, freely settable `open`
 * property): even if this controller's cached notion of the selection has drifted, asserting a
 * transition still corrects every participant to match `next`.
 *
 * **Two ways to know what's selected.** By default this controller is the source of truth: it
 * owns an internal cache, and `selectItem` / `deselectItem` are the only way selected-ish state
 * changes. That works well for items with no state of their own (plain buttons, list rows). For
 * *self-owning* items — an accordion item with its own `open` property, a menu item with its own
 * `selected` state, anything that can change that state on its own initiative — pass
 * **`readSelected`** so this controller reads truth from the items on every decision instead of
 * trusting a cache that item can silently invalidate. Pair it with **`observeEvent`** so this
 * controller also reacts when an item changes itself, instead of (or in addition to)
 * **`enableInteraction`**-driven clicks. With `readSelected` in place, `multiple` mode becomes
 * safe for self-owning items too: there's no cache to extend with a stale, already-closed entry.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export class SelectionController implements ReactiveController {
  private readonly host: ReactiveElement;

  private options: Omit<
    Required<
      Pick<
        SelectionControllerOptions,
        | 'getItems'
        | 'selectItem'
        | 'deselectItem'
        | 'mode'
        | 'defaultToFirstSelectable'
        | 'keydownActivation'
        | 'enableInteraction'
      >
    >,
    never
  > &
    Pick<
      SelectionControllerOptions,
      | 'onSelectionChange'
      | 'confirmSelectionChange'
      | 'isDisabled'
      | 'isSelectable'
      | 'readSelected'
      | 'observeEvent'
    >;

  private selectedItems: Set<HTMLElement> = new Set();

  private clickListenerAttached = false;

  private keydownListenerAttached = false;

  private observedEventName: string | undefined;

  private readonly handleClickCapture = (event: MouseEvent): void => {
    if (event.button !== 0) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    // Find which item was hit from the cheap raw scan, then validate
    // eligibility on only that one item — this is an O(1) question
    // (`isSelectableItem`, ending in `checkVisibility`) about the hit, not an
    // O(n) one (`getEligibleItems`) about the whole list. Matters for a large
    // list: a picker with hundreds of items shouldn't force a visibility
    // check on every item for every click.
    const hit = deepestSelectionItemContaining(event, this.getScopedRawItems());
    if (!hit || !this.isSelectableItem(hit)) {
      return;
    }
    this.applyClickOrKey(hit);
  };

  private readonly handleKeyDownCapture = (event: KeyboardEvent): void => {
    if (!this.options.keydownActivation) {
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    if (event.repeat) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    // See `handleClickCapture` above for why this checks only the hit item.
    const hit = deepestSelectionItemContaining(event, this.getScopedRawItems());
    if (!hit || !this.isSelectableItem(hit)) {
      return;
    }
    event.preventDefault();
    this.applyClickOrKey(hit);
  };

  /**
   * Reacts to a self-owning item's own `observeEvent`, rather than capturing the interaction
   * directly. See {@link SelectionControllerOptions.observeEvent}.
   */
  private readonly handleObservedEvent = (event: Event): void => {
    const readSelected = this.options.readSelected;
    if (!readSelected) {
      return;
    }
    const target = deepestSelectionItemContaining(
      event,
      this.getScopedRawItems()
    );
    if (!target || !this.isSelectableItem(target)) {
      return;
    }
    // Defer until the item's own cancelable-event lifecycle settles — a
    // canceled change reverts the item's state synchronously, but only after
    // every bubble listener (including this one) has already run.
    queueMicrotask(() => {
      if (this.options.mode === 'multiple' || !readSelected(target)) {
        return;
      }
      this.setSelectedItem(target, { silent: true });
    });
  };

  constructor(host: ReactiveElement, options: SelectionControllerOptions) {
    this.host = host;
    this.options = {
      getItems: options.getItems,
      selectItem: options.selectItem,
      deselectItem: options.deselectItem,
      mode: options.mode ?? 'single',
      defaultToFirstSelectable: options.defaultToFirstSelectable ?? false,
      keydownActivation: options.keydownActivation ?? false,
      enableInteraction: options.enableInteraction ?? true,
      onSelectionChange: options.onSelectionChange,
      confirmSelectionChange: options.confirmSelectionChange,
      isDisabled: options.isDisabled,
      isSelectable: options.isSelectable,
      readSelected: options.readSelected,
      observeEvent: options.observeEvent,
    };

    host.addController(this);
  }

  /**
   * Returns the current selection. Read live from the items via `readSelected` when provided
   * (see {@link SelectionControllerOptions.readSelected}); otherwise a snapshot of the internal
   * cache, ordered by insertion.
   */
  private currentSelection(): HTMLElement[] {
    const { readSelected } = this.options;
    if (readSelected) {
      return this.getScopedRawItems().filter(readSelected);
    }
    return Array.from(this.selectedItems);
  }

  /** Returns the current selection. See {@link SelectionController.currentSelection}. */
  public getSelectedItems(): HTMLElement[] {
    return this.currentSelection();
  }

  /** Returns **`true`** when {@link item} is currently selected. */
  public isSelected(item: HTMLElement): boolean {
    if (this.options.readSelected) {
      return this.options.readSelected(item);
    }
    return this.selectedItems.has(item);
  }

  /** Returns the current selection mode. */
  public getMode(): SelectionMode {
    return this.options.mode;
  }

  /**
   * Merges option deltas, normalizes selection for a mode change, and calls {@link refresh}.
   *
   * When switching from **`multiple`** to a single-item mode with more than one item selected,
   * only the first selected item is retained.
   */
  public setOptions(partial: Partial<SelectionControllerOptions>): void {
    const prevMode = this.options.mode;
    this.options = {
      ...this.options,
      ...partial,
      mode: partial.mode ?? this.options.mode,
      defaultToFirstSelectable:
        typeof partial.defaultToFirstSelectable === 'boolean'
          ? partial.defaultToFirstSelectable
          : this.options.defaultToFirstSelectable,
      keydownActivation:
        typeof partial.keydownActivation === 'boolean'
          ? partial.keydownActivation
          : this.options.keydownActivation,
      enableInteraction:
        typeof partial.enableInteraction === 'boolean'
          ? partial.enableInteraction
          : this.options.enableInteraction,
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
      confirmSelectionChange:
        partial.confirmSelectionChange ?? this.options.confirmSelectionChange,
      isDisabled: partial.isDisabled ?? this.options.isDisabled,
      isSelectable: partial.isSelectable ?? this.options.isSelectable,
      readSelected: partial.readSelected ?? this.options.readSelected,
      observeEvent: partial.observeEvent ?? this.options.observeEvent,
    };

    const nextMode = this.options.mode;
    const wasSingle = prevMode === 'single' || prevMode === 'single-toggle';
    const isNowSingle = nextMode === 'single' || nextMode === 'single-toggle';

    if (!wasSingle && isNowSingle) {
      // Read live rather than trusting the pre-switch cache: with
      // `readSelected`, `multiple` mode never populates the cache (see its
      // docs), so this is the only way to see everything actually selected
      // going into the switch.
      const current = this.currentSelection();
      if (current.length > 1) {
        const [first] = current;
        const toRemove = current.slice(1);
        const candidate = first ? [first] : [];
        // force: normalizing for the new mode is this controller enforcing
        // its own invariant, not a selection a consumer should be able to
        // veto.
        this.applySelectionTransition(candidate, toRemove, { force: true });
      }
    }

    this.syncListeners();
    this.refresh();
  }

  /**
   * Asserts {@link item} as the selection in single / single-toggle modes, or adds it to the
   * set in multiple mode. Disabled or ineligible items are rejected (returns **`false`**).
   *
   * Passing **`null`** clears the selection; in **`single`** mode this normally returns
   * **`false`** and leaves the selection unchanged (interactively, a mandatory single-select
   * group can't be emptied by clicking). Pass **`{ silent: true }`** to clear it anyway — for
   * example when an external property is explicitly reset to represent "nothing selected,"
   * which a consumer may legitimately want to allow even in `single` mode.
   *
   * Pass **`{ silent: true }`** to commit this transition without invoking
   * **`confirmSelectionChange`** — used to resync internal state from an external property change
   * without raising a vetoable transition. **`onSelectionChange`** still runs (see its docs for
   * why).
   */
  public setSelectedItem(
    item: HTMLElement | null,
    options?: { silent?: boolean }
  ): boolean {
    if (item === null) {
      if (this.options.mode === 'single' && !options?.silent) {
        return false;
      }
      return this.clearAll(options);
    }

    if (
      !this.getScopedRawItems().includes(item) ||
      !this.isSelectableItem(item)
    ) {
      return false;
    }

    const current = this.currentSelection();

    if (this.options.mode === 'multiple') {
      if (current.includes(item)) {
        return true;
      }
      const next = [...current, item];
      return this.applySelectionTransition(next, [], options);
    }

    const toRemove = current.filter((el) => el !== item);
    return this.applySelectionTransition([item], toRemove, options);
  }

  /**
   * Toggles {@link item}: selects it when not selected, deselects when selected (mode allowing).
   *
   * - **`single`**: selects {@link item} (deselects previous); clicking the active item has no
   *   effect (returns **`false`**).
   * - **`single-toggle`**: selects {@link item} when deselected, deselects when selected.
   * - **`multiple`**: always toggles.
   *
   * @returns **`false`** when the item is ineligible or when the mode disallows the operation.
   *
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`**.
   * **`onSelectionChange`** still runs.
   */
  public toggleItem(
    item: HTMLElement,
    options?: { silent?: boolean }
  ): boolean {
    if (
      !this.getScopedRawItems().includes(item) ||
      !this.isSelectableItem(item)
    ) {
      return false;
    }

    const current = this.currentSelection();
    const isSelected = current.includes(item);

    if (isSelected) {
      if (this.options.mode === 'single') {
        return false;
      }
      const next = current.filter((el) => el !== item);
      return this.applySelectionTransition(next, [item], options);
    } else {
      if (this.options.mode === 'multiple') {
        const next = [...current, item];
        return this.applySelectionTransition(next, [], options);
      }
      const toRemove = current.filter((el) => el !== item);
      return this.applySelectionTransition([item], toRemove, options);
    }
  }

  /**
   * Selects all eligible items. Only meaningful in **`multiple`** mode; returns **`false`** in
   * single-item modes (does not throw).
   *
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`**.
   * **`onSelectionChange`** still runs.
   */
  public selectAll(options?: { silent?: boolean }): boolean {
    if (this.options.mode !== 'multiple') {
      return false;
    }
    const current = this.currentSelection();
    const eligible = this.getEligibleItems();
    const toAdd = eligible.filter((el) => !current.includes(el));
    if (toAdd.length === 0) {
      return true;
    }
    const next = [...current, ...toAdd];
    return this.applySelectionTransition(next, [], options);
  }

  /**
   * Deselects all items. Works in **`single-toggle`** and **`multiple`** modes. In **`single`**
   * mode, returns **`false`** and leaves the selection unchanged — unless **`{ silent: true }`**
   * is passed, which clears it anyway (see {@link SelectionController.setSelectedItem}).
   *
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`**.
   * **`onSelectionChange`** still runs.
   */
  public clearAll(options?: { silent?: boolean }): boolean {
    if (this.options.mode === 'single' && !options?.silent) {
      return false;
    }
    const current = this.currentSelection();
    if (current.length === 0) {
      return true;
    }
    return this.applySelectionTransition([], current, options);
  }

  /**
   * Re-applies bookkeeping after structural changes: removes stale selections, collapses an
   * over-selected single-item mode down to one, and selects the first eligible item when
   * **`defaultToFirstSelectable`** is **`true`** and nothing is selected (single-item modes only).
   * When nothing is currently eligible, no default selection is forced.
   *
   * Pass **`{ silent: true }`** to commit these transitions without invoking
   * **`confirmSelectionChange`** — used to resync internal state from an external property change
   * without raising a vetoable transition. **`onSelectionChange`** still runs — this is how
   * `swc-tabs` mirrors a silently-applied `defaultToFirstSelectable` selection into its own
   * `selected` property.
   */
  public refresh(options?: { silent?: boolean }): void {
    const silent = options?.silent ?? false;
    const scoped = this.getScopedRawItems();
    const current = this.currentSelection();

    // An item is stale when it is disconnected, or when the scope is
    // non-empty and no longer includes it — connectivity/membership, not
    // CSS-driven eligibility. A selected item that merely went
    // `display: none` (a collapsed panel, a media-query change) is still a
    // legitimate participant; forcing it out of the selection over a
    // transient visual state would be surprising. It also means this check
    // never pays for `getEligibleItems()`'s `checkVisibility` — worth keeping
    // cheap since this runs on every structural change, and, via
    // `hostUpdated`, on every render for `readSelected` consumers. When scope
    // is empty (e.g. the host signals it is disabled by returning `[]` from
    // `getItems`), only disconnected items are removed — connected selections
    // are preserved so `aria-selected` stays true.
    const stale = current.filter(
      (el) => !el.isConnected || (scoped.length > 0 && !scoped.includes(el))
    );

    if (stale.length > 0) {
      // force: removing a disconnected/out-of-scope item is this controller
      // enforcing its own invariant, not a selection a consumer should be
      // able to veto.
      const next = current.filter((el) => !stale.includes(el));
      this.applySelectionTransition(next, stale, { silent, force: true });
    }

    const isSingle =
      this.options.mode === 'single' || this.options.mode === 'single-toggle';

    if (isSingle && this.options.readSelected) {
      // Only meaningful with `readSelected`: without it, this controller is
      // the sole mutator of the cache, so more than one item selected in a
      // single-item mode can only happen mid-transition from `multiple`
      // (already normalized by `setOptions`). With `readSelected`, an item
      // can select itself independently of any transition this controller
      // drove — e.g. two items both declared `open` in markup — so this
      // catches that drift wherever `refresh` runs, including from
      // `hostUpdated` (see below).
      const overSelected = this.currentSelection();
      if (overSelected.length > 1) {
        const [first] = overSelected;
        const toRemove = overSelected.slice(1);
        // force: same reasoning as the stale-removal above — enforcing this
        // controller's own mode invariant, not a consumer's selection.
        this.applySelectionTransition([first], toRemove, {
          silent,
          force: true,
        });
      }
    }

    if (
      isSingle &&
      this.options.defaultToFirstSelectable &&
      // Recomputed rather than reusing `current`: the steps above may have
      // just changed what's actually selected.
      this.currentSelection().length === 0
    ) {
      // `getEligibleItems()` — the only place in `refresh` that needs the
      // full, `checkVisibility`-inclusive eligible set — is computed here,
      // lazily, only when there's actually nothing selected to default from.
      const eligible = this.getEligibleItems();
      if (eligible.length > 0) {
        // force: same reasoning — defaultToFirstSelectable exists
        // specifically to guarantee a selection exists; a veto would leave
        // that unmet.
        this.applySelectionTransition([eligible[0]], [], {
          silent,
          force: true,
        });
      }
    }
  }

  public hostConnected(): void {
    this.syncListeners();
    // Silent: this runs during connectedCallback, before the host's first
    // render — a consumer's confirmSelectionChange (and any event it
    // dispatches) firing this early would be surprising and premature.
    this.refresh({ silent: true });
  }

  /**
   * Best-effort backstop for `readSelected` consumers: a free, silent `refresh` after every
   * update of *this controller's host* — cheap, since Lit already schedules the pass.
   *
   * **This does not fire when only a descendant item updates.** `hostUpdated` is scoped to the
   * `ReactiveElement` this controller is attached to; an accordion item toggling its own `open`
   * property re-renders *that item*, a separate `ReactiveElement` with its own independent update
   * cycle — it does not, by itself, cause the accordion's `hostUpdated` to run. Real-time reaction
   * to a self-owning item's own change is `observeEvent`'s job, not this one. What this catches is
   * drift from a source that never announces itself at all — an `open` attribute set directly in
   * markup on two items, or a property write outside `toggle()` — reconciled the next time the
   * host happens to re-render for any reason. It is a supplement to `observeEvent`, not a
   * replacement for it.
   */
  public hostUpdated(): void {
    if (!this.options.readSelected) {
      return;
    }
    this.refresh({ silent: true });
  }

  public hostDisconnected(): void {
    if (this.clickListenerAttached) {
      this.host.removeEventListener('click', this.handleClickCapture, true);
      this.clickListenerAttached = false;
    }
    if (this.keydownListenerAttached) {
      this.host.removeEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = false;
    }
    if (this.observedEventName) {
      this.host.removeEventListener(
        this.observedEventName,
        this.handleObservedEvent
      );
      this.observedEventName = undefined;
    }
  }

  // ─────────────────────────
  //     PRIVATE
  // ─────────────────────────

  /** Applies the mode-appropriate selection logic for a pointer click or Enter/Space key. */
  private applyClickOrKey(hit: HTMLElement): void {
    const mode = this.options.mode;
    const current = this.currentSelection();
    const isSelected = current.includes(hit);

    if (mode === 'single') {
      if (isSelected) {
        return;
      }
      this.applySelectionTransition([hit], current);
    } else if (mode === 'single-toggle') {
      if (isSelected) {
        this.applySelectionTransition([], [hit]);
      } else {
        this.applySelectionTransition([hit], current);
      }
    } else {
      if (isSelected) {
        const next = current.filter((el) => el !== hit);
        this.applySelectionTransition(next, [hit]);
      } else {
        const next = [...current, hit];
        this.applySelectionTransition(next, []);
      }
    }
  }

  /**
   * Applies the transition optimistically, then runs **`confirmSelectionChange`** (if any) and
   * reverts if it returns **`false`**.
   *
   * **This controller notifies only through callbacks — `onSelectionChange` and
   * `confirmSelectionChange` — never a DOM event.** A DOM event dispatched here would bubble
   * (composed) out of every host's shadow root whether or not the host's own consumers want it,
   * which is exactly the kind of internal-controller detail a component's public event surface
   * should not leak. A host that wants a public event dispatches its own from
   * `confirmSelectionChange` (see `swc-tabs`' `change`) or `onSelectionChange`, on its own terms.
   *
   * **Ordering matches native cancelable-event conventions (and 1st-gen Tabs), not a
   * confirm-before-apply gate.** Mutators, internal state, and the **`onSelectionChange`** mirror
   * are all applied *before* **`confirmSelectionChange`** runs, so a consumer's own cancelable
   * event — typically dispatched from inside **`confirmSelectionChange`** — sees the *new* state
   * when read synchronously inside its listener (e.g. a host's reflected selection property, or
   * an item's own selected-ish property). If **`confirmSelectionChange`** returns **`false`**,
   * every one of those effects is rolled back to **`priorItems`**, including a second
   * **`onSelectionChange`** call so external mirrors roll back too. Lit batches property updates
   * into a microtask, so an apply-then-synchronously-revert never paints the intermediate state.
   *
   * Because a revert restores **`priorItems`** exactly, **`selectItem`** / **`deselectItem`** (and
   * **`onSelectionChange`**) may run for a transition that a moment later turns out not to have
   * happened. Keep them idempotent and side-effect-light beyond reflecting state — safe for
   * something like setting an attribute, risky for something like an analytics call or a counter.
   *
   * The added/removed short-circuit below is computed against **`currentSelection()`** — the
   * cache when no **`readSelected`** was given, or a live scan when it was. Without
   * **`readSelected`**, that cache is only trustworthy when this controller is the sole mutator of
   * selected-ish state (true for interactive, non-silent transitions); silent transitions exist
   * specifically to reconcile from participants whose state can change independently of this
   * controller, so the cache may be stale there — silent calls always proceed to
   * {@link applyMutators} rather than trusting a diff against it. With **`readSelected`**, there is
   * no cache to go stale in the first place.
   *
   * **`silent`** and **`force`** both skip **`confirmSelectionChange`** — the only thing left for
   * either to skip, now that there is no DOM event. **`force`** (internal only — never exposed on
   * the public **`{ silent }`** options bag) exists for transitions that enforce this controller's
   * *own* invariants (removing a disconnected item, normalizing a mode switch, asserting
   * **`defaultToFirstSelectable`**, collapsing an over-selected single-item mode) rather than
   * representing a selection a consumer chose to make. Those must never be vetoable: reverting one
   * would leave the controller violating the very invariant it was enforcing (for example more
   * than one item selected while **`mode: 'single'`**, or a disconnected element still in the
   * selection set).
   */
  private applySelectionTransition(
    next: HTMLElement[],
    removedItems: HTMLElement[],
    options?: { silent?: boolean; force?: boolean }
  ): boolean {
    const silent = options?.silent ?? false;
    const force = options?.force ?? false;
    const priorItems = this.currentSelection();
    const addedItems = next.filter((el) => !priorItems.includes(el));

    if (!silent && addedItems.length === 0 && removedItems.length === 0) {
      return true;
    }

    this.commit(next);
    this.options.onSelectionChange?.({
      selectedItems: next,
      addedItems,
      removedItems,
    });

    if (!silent && !force && this.options.confirmSelectionChange) {
      const ok = this.options.confirmSelectionChange({
        candidateItems: next,
        priorItems,
      });
      if (!ok) {
        this.commit(priorItems);
        this.options.onSelectionChange?.({
          selectedItems: priorItems,
          addedItems: removedItems,
          removedItems: addedItems,
        });
        return false;
      }
    }

    return true;
  }

  /** Applies mutators for {@link next} and updates the cached selection to match. */
  private commit(next: HTMLElement[]): void {
    this.applyMutators(next);
    this.selectedItems = new Set(next);
  }

  /**
   * Walks every scoped raw item and calls **`selectItem`** / **`deselectItem`** to align DOM
   * with **`next`**.
   */
  private applyMutators(next: HTMLElement[]): void {
    const nextSet = new Set(next);
    for (const item of this.getScopedRawItems()) {
      if (nextSet.has(item)) {
        this.options.selectItem(item);
      } else {
        this.options.deselectItem(item);
      }
    }
  }

  /**
   * Attaches or removes the capture-phase **`click`** / **`keydown`** listeners (per
   * **`enableInteraction`** / **`keydownActivation`**) and the bubble-phase **`observeEvent`**
   * listener (per {@link SelectionControllerOptions.observeEvent}).
   *
   * **`observeEvent` only ever attaches when `enableInteraction` is `false`.** They are
   * alternative ways of learning about a selection attempt — the click-owning path or the
   * item-owns-itself path — not additive; enforced here rather than left as a documentation-only
   * expectation, so a consumer that sets both never gets both paths firing for the same click.
   */
  private syncListeners(): void {
    if (!this.host.isConnected) {
      return;
    }
    const wantClick = this.options.enableInteraction;
    if (wantClick && !this.clickListenerAttached) {
      this.host.addEventListener('click', this.handleClickCapture, true);
      this.clickListenerAttached = true;
    } else if (!wantClick && this.clickListenerAttached) {
      this.host.removeEventListener('click', this.handleClickCapture, true);
      this.clickListenerAttached = false;
    }

    const wantKeydown =
      this.options.enableInteraction && this.options.keydownActivation;
    if (wantKeydown && !this.keydownListenerAttached) {
      this.host.addEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = true;
    } else if (!wantKeydown && this.keydownListenerAttached) {
      this.host.removeEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = false;
    }

    const wantObserved = this.options.enableInteraction
      ? undefined
      : this.options.observeEvent;
    if (wantObserved !== this.observedEventName) {
      if (this.observedEventName) {
        this.host.removeEventListener(
          this.observedEventName,
          this.handleObservedEvent
        );
      }
      if (wantObserved) {
        this.host.addEventListener(wantObserved, this.handleObservedEvent);
      }
      this.observedEventName = wantObserved;
    }
  }

  private isNodeWithinHostScope(node: Node | null): boolean {
    if (!node) {
      return false;
    }
    const rootHost = this.host;
    let current: Node | null = node;
    while (current) {
      if (current === rootHost) {
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

  private getScopedRawItems(): HTMLElement[] {
    return this.options
      .getItems()
      .filter((el) => this.isNodeWithinHostScope(el));
  }

  private isDisabledParticipant(participant: HTMLElement): boolean {
    if (this.options.isDisabled) {
      return this.options.isDisabled(participant);
    }
    if ('disabled' in participant) {
      if ((participant as HTMLButtonElement).disabled) {
        return true;
      }
    }
    return participant.getAttribute('aria-disabled') === 'true';
  }

  /**
   * Cheapest signals first, so the overwhelmingly common way SWC components exclude an item
   * (disabled, `hidden`, `inert`) never reaches the last check. `checkVisibility` is a native,
   * engine-optimized replacement for a hand-rolled `getComputedStyle` read, but it can still
   * force layout — worth reaching only when every cheaper property/attribute read has already
   * passed. `isSelectable` lets a consumer that can guarantee its items are never CSS-hidden (a
   * large or virtualized list) skip `checkVisibility` entirely.
   */
  private isSelectableItem(participant: HTMLElement): boolean {
    if (this.options.isSelectable) {
      return this.options.isSelectable(participant);
    }
    if (!participant.isConnected) {
      return false;
    }
    if (participant.hidden || this.isDisabledParticipant(participant)) {
      return false;
    }
    if (participant.hasAttribute('inert') || participant.closest('[inert]')) {
      return false;
    }
    return participant.checkVisibility({ checkVisibilityCSS: true });
  }

  private getEligibleItems(): HTMLElement[] {
    return this.getScopedRawItems().filter((el) => this.isSelectableItem(el));
  }
}
