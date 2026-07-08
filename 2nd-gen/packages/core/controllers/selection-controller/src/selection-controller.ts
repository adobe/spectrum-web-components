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
 * Controls how the group handles selection.
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
   * Optional callback with the `{ selectedItems, addedItems, removedItems }` shape of
   * {@link SelectionControllerChangeDetail} — this controller's only notification channel; it
   * never dispatches a DOM event (see {@link SelectionController.applySelectionTransition}).
   *
   * **Fires on every commit, including `{ silent: true }` transitions** — unlike
   * `confirmSelectionChange`, `silent` does not gate this callback. Silent transitions exist to
   * resync internal state from an external property change without raising a vetoable
   * transition, and this callback is frequently the *only* channel a host uses to mirror that
   * resynced selection into its own public property — see `swc-tabs`' `onSelectionChange`,
   * which is how a silently-applied default-selected tab reaches the host's `selected` property.
   * Gating this callback on `silent` would break that pattern. Keep it idempotent and
   * side-effect-light beyond mirroring state (safe: setting a property; risky: an analytics
   * call), since it may also run for a transition that a moment later gets rolled back by
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
 * This controller always owns capture-phase **`click`** and, when **`keydownActivation`** is
 * **`true`**, capture-phase **`keydown`** (**Enter** / **Space**) on its host — that ownership is
 * this controller's whole reason for existing. Pair with **`FocusgroupNavigationController`**
 * when the composite also needs roving **`tabindex`**, arrow keys, Home/End, or focus memory;
 * this controller does not implement those behaviors.
 *
 * Call **`setOptions({ mode })`** at any time to switch modes without reconstructing the
 * controller. When switching from **`multiple`** to a single-item mode and more than one item
 * is currently selected, all but the first item are deselected.
 *
 * **This controller owns an internal cache and is the sole mutator of selected-ish state.**
 * {@link SelectionController.applyMutators}, called by every transition, walks a fresh
 * `getItems()` result and calls `selectItem` / `deselectItem` for every item based on
 * membership in the transition's `next` set. That cache is trustworthy exactly because nothing
 * other than this controller ever changes what counts as selected — good for items with no
 * state of their own (plain buttons, list rows, tabs, radio-style groups).
 *
 * **This controller is the wrong tool for self-owning items** — an accordion item with its own
 * public `open` property, a menu item with its own `selected` state, anything that can flip that
 * state on its own initiative (its own click handler, a direct property/attribute set). Driving
 * one of those through this controller's cache risks drift: the cache can go stale the moment an
 * item changes itself outside a transition this controller drove. Use `LiveSelectionController`
 * (a live-DOM-reading counterpart, tracked separately) for that case instead — see the per-unit
 * documentation page for a fuller comparison.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/radio/
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
    >;

  private selectedItems: Set<HTMLElement> = new Set();

  private clickListenerAttached = false;

  private keydownListenerAttached = false;

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

  constructor(host: ReactiveElement, options: SelectionControllerOptions) {
    this.host = host;
    this.options = {
      getItems: options.getItems,
      selectItem: options.selectItem,
      deselectItem: options.deselectItem,
      mode: options.mode ?? 'single',
      defaultToFirstSelectable: options.defaultToFirstSelectable ?? false,
      keydownActivation: options.keydownActivation ?? false,
      onSelectionChange: options.onSelectionChange,
      confirmSelectionChange: options.confirmSelectionChange,
      isDisabled: options.isDisabled,
      isSelectable: options.isSelectable,
    };

    host.addController(this);
  }

  /** Returns the current selection, a snapshot of the internal cache ordered by insertion. */
  private currentSelection(): HTMLElement[] {
    return Array.from(this.selectedItems);
  }

  /** Returns the current selection. See {@link SelectionController.currentSelection}. */
  public getSelectedItems(): HTMLElement[] {
    return this.currentSelection();
  }

  /** Returns **`true`** when {@link item} is currently selected. */
  public isSelected(item: HTMLElement): boolean {
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
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
      confirmSelectionChange:
        partial.confirmSelectionChange ?? this.options.confirmSelectionChange,
      isDisabled: partial.isDisabled ?? this.options.isDisabled,
      isSelectable: partial.isSelectable ?? this.options.isSelectable,
    };

    const nextMode = this.options.mode;
    const wasSingle = prevMode === 'single' || prevMode === 'single-toggle';
    const isNowSingle = nextMode === 'single' || nextMode === 'single-toggle';

    if (!wasSingle && isNowSingle) {
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
    // cheap since this runs on every structural change. When scope is empty
    // (e.g. the host signals it is disabled by returning `[]` from
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

    if (
      isSingle &&
      this.options.defaultToFirstSelectable &&
      // Recomputed rather than reusing `current`: the step above may have
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

  public hostDisconnected(): void {
    if (this.clickListenerAttached) {
      this.host.removeEventListener('click', this.handleClickCapture, true);
      this.clickListenerAttached = false;
    }
    if (this.keydownListenerAttached) {
      this.host.removeEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = false;
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
   * **Ordering matches native cancelable-event conventions, not a confirm-before-apply gate.**
   * Mutators, internal state, and the **`onSelectionChange`** mirror are all applied *before*
   * **`confirmSelectionChange`** runs, so a consumer's own cancelable event — typically dispatched
   * from inside **`confirmSelectionChange`** — sees the *new* state when read synchronously inside
   * its listener (e.g. a host's reflected selection property, or an item's own selected-ish
   * property). If **`confirmSelectionChange`** returns **`false`**, every one of those effects is
   * rolled back to **`priorItems`**, including a second **`onSelectionChange`** call so external
   * mirrors roll back too. Lit batches property updates into a microtask, so an
   * apply-then-synchronously-revert never paints the intermediate state.
   *
   * Because a revert restores **`priorItems`** exactly, **`selectItem`** / **`deselectItem`** (and
   * **`onSelectionChange`**) may run for a transition that a moment later turns out not to have
   * happened. Keep them idempotent and side-effect-light beyond reflecting state — safe for
   * something like setting an attribute, risky for something like an analytics call or a counter.
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

  /** Attaches or removes the capture-phase **`click`** / **`keydown`** listeners. */
  private syncListeners(): void {
    if (!this.host.isConnected) {
      return;
    }
    if (!this.clickListenerAttached) {
      this.host.addEventListener('click', this.handleClickCapture, true);
      this.clickListenerAttached = true;
    }

    const wantKeydown = this.options.keydownActivation;
    if (wantKeydown && !this.keydownListenerAttached) {
      this.host.addEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = true;
    } else if (!wantKeydown && this.keydownListenerAttached) {
      this.host.removeEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = false;
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
