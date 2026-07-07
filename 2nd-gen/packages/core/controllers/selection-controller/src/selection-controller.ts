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
   * selection bookkeeping, driven imperatively via **`{ silent: true }`** calls. Defaults to
   * **`true`**.
   */
  enableInteraction?: boolean;

  /** Optional callback mirroring {@link selectionControllerChange}. */
  onSelectionChange?: (detail: SelectionControllerChangeDetail) => void;

  /**
   * Called **after** **`selectItem`** / **`deselectItem`** have already run for the proposed
   * transition — so if you dispatch your own cancelable event from inside this callback (the
   * common pattern), listeners reading selected-ish state synchronously see the *new* value, not
   * the prior one. Return **`false`** to abort: the transition (mutators, internal state, and
   * the **`onSelectionChange`** mirror) is rolled back to the prior selection and no change event
   * is dispatched. Omit for unconditional commits. Not called for transitions committed with
   * **`{ silent: true }`** (see {@link SelectionController.setSelectedItem} and
   * {@link SelectionController.refresh}).
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
};

/**
 * Name of the bubbling composed `CustomEvent` dispatched when the selection changes.
 */
export const selectionControllerChange = 'swc-selection-controller-change';

/**
 * `detail` object for {@link selectionControllerChange}.
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
      'onSelectionChange' | 'confirmSelectionChange' | 'isDisabled'
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
    const items = this.getEligibleItems();
    const hit = deepestSelectionItemContaining(event, items);
    if (!hit || this.isDisabledParticipant(hit)) {
      return;
    }
    this.applyClickOrKey(hit);
  };

  private readonly handleKeyDownCapture = (event: KeyboardEvent): void => {
    if (!this.options.keydownActivation) {
      return;
    }
    if (event.code !== 'Enter' && event.code !== 'Space') {
      return;
    }
    if (event.repeat) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    const items = this.getEligibleItems();
    const hit = deepestSelectionItemContaining(event, items);
    if (!hit || this.isDisabledParticipant(hit)) {
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
      enableInteraction: options.enableInteraction ?? true,
      onSelectionChange: options.onSelectionChange,
      confirmSelectionChange: options.confirmSelectionChange,
      isDisabled: options.isDisabled,
    };

    host.addController(this);
  }

  /** Returns a snapshot of the current selection (ordered by insertion). */
  public getSelectedItems(): HTMLElement[] {
    return Array.from(this.selectedItems);
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
    };

    const nextMode = this.options.mode;
    const wasSingle = prevMode === 'single' || prevMode === 'single-toggle';
    const isNowSingle = nextMode === 'single' || nextMode === 'single-toggle';

    if (!wasSingle && isNowSingle && this.selectedItems.size > 1) {
      const [first] = this.selectedItems;
      const toRemove = Array.from(this.selectedItems).slice(1);
      const candidate = first ? [first] : [];
      this.applySelectionTransition(candidate, toRemove);
    }

    this.syncInteractionListeners();
    this.refresh();
  }

  /**
   * Asserts {@link item} as the selection in single / single-toggle modes, or adds it to the
   * set in multiple mode. Disabled or ineligible items are rejected (returns **`false`**).
   *
   * Passing **`null`** clears the selection; only works when the mode allows an empty selection
   * (**`single-toggle`** or **`multiple`**).
   *
   * Pass **`{ silent: true }`** to commit this transition without invoking
   * **`confirmSelectionChange`** or dispatching {@link selectionControllerChange} — used to
   * resync internal state from an external property change without raising a public event.
   */
  public setSelectedItem(
    item: HTMLElement | null,
    options?: { silent?: boolean }
  ): boolean {
    if (item === null) {
      if (this.options.mode === 'single') {
        return false;
      }
      return this.clearAll(options);
    }

    if (
      !this.getEligibleItems().includes(item) ||
      this.isDisabledParticipant(item)
    ) {
      return false;
    }

    if (this.options.mode === 'multiple') {
      if (this.selectedItems.has(item)) {
        return true;
      }
      const next = [...Array.from(this.selectedItems), item];
      return this.applySelectionTransition(next, [], options);
    }

    const prev = Array.from(this.selectedItems);
    const toRemove = prev.filter((el) => el !== item);
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
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`** or
   * dispatching {@link selectionControllerChange}.
   */
  public toggleItem(
    item: HTMLElement,
    options?: { silent?: boolean }
  ): boolean {
    if (
      !this.getEligibleItems().includes(item) ||
      this.isDisabledParticipant(item)
    ) {
      return false;
    }

    const isSelected = this.selectedItems.has(item);

    if (isSelected) {
      if (this.options.mode === 'single') {
        return false;
      }
      const next = Array.from(this.selectedItems).filter((el) => el !== item);
      return this.applySelectionTransition(next, [item], options);
    } else {
      if (this.options.mode === 'multiple') {
        const next = [...Array.from(this.selectedItems), item];
        return this.applySelectionTransition(next, [], options);
      }
      const prev = Array.from(this.selectedItems);
      const toRemove = prev.filter((el) => el !== item);
      return this.applySelectionTransition([item], toRemove, options);
    }
  }

  /**
   * Selects all eligible items. Only meaningful in **`multiple`** mode; returns **`false`** in
   * single-item modes (does not throw).
   *
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`** or
   * dispatching {@link selectionControllerChange}.
   */
  public selectAll(options?: { silent?: boolean }): boolean {
    if (this.options.mode !== 'multiple') {
      return false;
    }
    const eligible = this.getEligibleItems();
    const toAdd = eligible.filter((el) => !this.selectedItems.has(el));
    if (toAdd.length === 0) {
      return true;
    }
    const next = [...Array.from(this.selectedItems), ...toAdd];
    return this.applySelectionTransition(next, [], options);
  }

  /**
   * Deselects all items. Works in **`single-toggle`** and **`multiple`** modes. In **`single`**
   * mode, returns **`false`** and leaves selection unchanged.
   *
   * Pass **`{ silent: true }`** to commit without invoking **`confirmSelectionChange`** or
   * dispatching {@link selectionControllerChange}.
   */
  public clearAll(options?: { silent?: boolean }): boolean {
    if (this.options.mode === 'single') {
      return false;
    }
    if (this.selectedItems.size === 0) {
      return true;
    }
    const toRemove = Array.from(this.selectedItems);
    return this.applySelectionTransition([], toRemove, options);
  }

  /**
   * Re-applies bookkeeping after structural changes: removes stale selections, and selects the
   * first eligible item when **`defaultToFirstSelectable`** is **`true`** and nothing is selected
   * (single-item modes only). When nothing is currently eligible, no default selection is forced.
   *
   * Pass **`{ silent: true }`** to commit these transitions without invoking
   * **`confirmSelectionChange`** or dispatching {@link selectionControllerChange} — used to
   * resync internal state from an external property change without raising a public event.
   */
  public refresh(options?: { silent?: boolean }): void {
    const silent = options?.silent ?? false;
    const eligible = this.getEligibleItems();

    // An item is stale when it is disconnected, or when the eligible list is
    // non-empty and does not include it. When eligible is empty (e.g. the host
    // signals it is disabled), only disconnected items are removed — connected
    // selections are preserved so aria-selected stays true.
    const stale = Array.from(this.selectedItems).filter(
      (el) => !el.isConnected || (eligible.length > 0 && !eligible.includes(el))
    );

    if (stale.length > 0) {
      const next = Array.from(this.selectedItems).filter(
        (el) => !stale.includes(el)
      );
      this.applySelectionTransition(next, stale, { silent });
    }

    const isSingle =
      this.options.mode === 'single' || this.options.mode === 'single-toggle';
    if (
      isSingle &&
      this.options.defaultToFirstSelectable &&
      this.selectedItems.size === 0 &&
      eligible.length > 0
    ) {
      this.applySelectionTransition([eligible[0]], [], { silent });
    }
  }

  public hostConnected(): void {
    this.syncInteractionListeners();
    this.refresh();
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
    const isSelected = this.selectedItems.has(hit);

    if (mode === 'single') {
      if (isSelected) {
        return;
      }
      const prev = Array.from(this.selectedItems);
      this.applySelectionTransition([hit], prev);
    } else if (mode === 'single-toggle') {
      if (isSelected) {
        this.applySelectionTransition([], [hit]);
      } else {
        const prev = Array.from(this.selectedItems);
        this.applySelectionTransition([hit], prev);
      }
    } else {
      if (isSelected) {
        const next = Array.from(this.selectedItems).filter((el) => el !== hit);
        this.applySelectionTransition(next, [hit]);
      } else {
        const next = [...Array.from(this.selectedItems), hit];
        this.applySelectionTransition(next, []);
      }
    }
  }

  /**
   * Applies the transition optimistically, then runs **`confirmSelectionChange`** (if any) and
   * reverts if it returns **`false`**. Finally dispatches the change event when committed.
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
   * The added/removed short-circuit below is computed against this controller's own cached
   * **`selectedItems`**, which is only trustworthy when this controller is the sole mutator of
   * selected-ish state (true for interactive, non-silent transitions). Silent transitions exist
   * specifically to reconcile from participants whose state can change independently of this
   * controller, so that cache may be stale — silent calls always proceed to {@link applyMutators}
   * rather than trusting a diff against it.
   */
  private applySelectionTransition(
    next: HTMLElement[],
    removedItems: HTMLElement[],
    options?: { silent?: boolean }
  ): boolean {
    const silent = options?.silent ?? false;
    const priorItems = Array.from(this.selectedItems);
    const addedItems = next.filter((el) => !this.selectedItems.has(el));

    if (!silent && addedItems.length === 0 && removedItems.length === 0) {
      return true;
    }

    this.commit(next);
    this.options.onSelectionChange?.({
      selectedItems: next,
      addedItems,
      removedItems,
    });

    if (!silent && this.options.confirmSelectionChange) {
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

    if (!silent) {
      this.host.dispatchEvent(
        new CustomEvent<SelectionControllerChangeDetail>(
          selectionControllerChange,
          {
            bubbles: true,
            composed: true,
            detail: { selectedItems: next, addedItems, removedItems },
          }
        )
      );
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
   * Attaches or removes the capture-phase **`click`** and **`keydown`** listeners to match
   * **`enableInteraction`** / **`keydownActivation`**. Neither listener is attached when
   * **`enableInteraction`** is **`false`**, regardless of **`keydownActivation`**.
   */
  private syncInteractionListeners(): void {
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

  private isSelectableItem(participant: HTMLElement): boolean {
    if (!participant.isConnected) {
      return false;
    }
    if (participant.hasAttribute('inert') || participant.closest('[inert]')) {
      return false;
    }
    const style = getComputedStyle(participant);
    if (
      style.visibility === 'hidden' ||
      style.display === 'none' ||
      participant.hidden
    ) {
      return false;
    }
    if (this.isDisabledParticipant(participant)) {
      return false;
    }
    return true;
  }

  private getEligibleItems(): HTMLElement[] {
    return this.getScopedRawItems().filter((el) => this.isSelectableItem(el));
  }
}
