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

  /** Optional callback mirroring {@link selectionControllerChange}. */
  onSelectionChange?: (detail: SelectionControllerChangeDetail) => void;

  /**
   * Called **before** **`selectItem`** / **`deselectItem`** run for the proposed transition.
   * Return **`false`** to abort — mutators do not run, the selection stays unchanged, and no
   * change event is dispatched. Omit for unconditional commits.
   */
  confirmSelectionChange?: (
    detail: SelectionControllerConfirmDetail
  ) => boolean;
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
  /** Selection that would result if the transition is committed. */
  candidateItems: HTMLElement[];
  /** Selection before this transition. */
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
 * (**Enter** / **Space**) when **`keydownActivation`** is **`true`**. Pair with
 * **`FocusgroupNavigationController`** when the composite also needs roving **`tabindex`**,
 * arrow keys, Home/End, or focus memory; this controller does not implement those behaviors.
 *
 * Call **`setOptions({ mode })`** at any time to switch modes without reconstructing the
 * controller. When switching from **`multiple`** to a single-item mode and more than one item
 * is currently selected, all but the first item are deselected.
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
      >
    >,
    never
  > &
    Pick<
      SelectionControllerOptions,
      'onSelectionChange' | 'confirmSelectionChange'
    >;

  private selectedItems: Set<HTMLElement> = new Set();

  /**
   * Snapshot of the last non-empty raw item list. Used to support
   * `defaultToFirstSelectable` and stale-item cleanup when `getItems()`
   * returns `[]` (e.g. the host signals it is disabled).
   */
  private lastKnownRawItems: HTMLElement[] = [];

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
      onSelectionChange: options.onSelectionChange,
      confirmSelectionChange: options.confirmSelectionChange,
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
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
      confirmSelectionChange:
        partial.confirmSelectionChange ?? this.options.confirmSelectionChange,
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

    this.syncKeydownActivationListener();
    this.refresh();
  }

  /**
   * Asserts {@link item} as the selection in single / single-toggle modes, or adds it to the
   * set in multiple mode. Disabled or ineligible items are rejected (returns **`false`**).
   *
   * Passing **`null`** clears the selection; only works when the mode allows an empty selection
   * (**`single-toggle`** or **`multiple`**).
   */
  public setSelectedItem(item: HTMLElement | null): boolean {
    if (item === null) {
      if (this.options.mode === 'single') {
        return false;
      }
      return this.clearAll();
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
      return this.applySelectionTransition(next, []);
    }

    const prev = Array.from(this.selectedItems);
    const toRemove = prev.filter((el) => el !== item);
    return this.applySelectionTransition([item], toRemove);
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
   */
  public toggleItem(item: HTMLElement): boolean {
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
      return this.applySelectionTransition(next, [item]);
    } else {
      if (this.options.mode === 'multiple') {
        const next = [...Array.from(this.selectedItems), item];
        return this.applySelectionTransition(next, []);
      }
      const prev = Array.from(this.selectedItems);
      const toRemove = prev.filter((el) => el !== item);
      return this.applySelectionTransition([item], toRemove);
    }
  }

  /**
   * Selects all eligible items. Only meaningful in **`multiple`** mode; returns **`false`** in
   * single-item modes (does not throw).
   */
  public selectAll(): boolean {
    if (this.options.mode !== 'multiple') {
      return false;
    }
    const eligible = this.getEligibleItems();
    const toAdd = eligible.filter((el) => !this.selectedItems.has(el));
    if (toAdd.length === 0) {
      return true;
    }
    const next = [...Array.from(this.selectedItems), ...toAdd];
    return this.applySelectionTransition(next, []);
  }

  /**
   * Deselects all items. Works in **`single-toggle`** and **`multiple`** modes. In **`single`**
   * mode, returns **`false`** and leaves selection unchanged.
   */
  public clearAll(): boolean {
    if (this.options.mode === 'single') {
      return false;
    }
    if (this.selectedItems.size === 0) {
      return true;
    }
    const toRemove = Array.from(this.selectedItems);
    return this.applySelectionTransition([], toRemove);
  }

  /**
   * Re-applies bookkeeping after structural changes: removes stale selections, and selects the
   * first eligible item when **`defaultToFirstSelectable`** is **`true`** and nothing is selected
   * (single-item modes only).
   */
  public refresh(): void {
    // Call getScopedRawItems() once and derive eligible from it so we avoid a
    // redundant getItems() call inside getEligibleItems().
    const rawItems = this.getScopedRawItems();
    if (rawItems.length > 0) {
      this.lastKnownRawItems = rawItems;
    }
    const eligible = rawItems.filter((el) => this.isSelectableItem(el));

    // An item is stale when it is disconnected, or when the eligible list is
    // non-empty and does not include it. When eligible is empty (e.g. the host
    // signals it is disabled via getItems()→[]), only disconnected items are
    // removed — connected selections are preserved so aria-selected stays true.
    const stale = Array.from(this.selectedItems).filter(
      (el) => !el.isConnected || (eligible.length > 0 && !eligible.includes(el))
    );

    if (stale.length > 0) {
      const next = Array.from(this.selectedItems).filter(
        (el) => !stale.includes(el)
      );
      this.applySelectionTransition(next, stale);
    }

    const isSingle =
      this.options.mode === 'single' || this.options.mode === 'single-toggle';
    if (
      isSingle &&
      this.options.defaultToFirstSelectable &&
      this.selectedItems.size === 0
    ) {
      // For radio types one item must be selected even when the host is disabled.
      // Use the eligible list when available; fall back to the last known raw
      // items when getItems() returns [] (host disabled) so the first item
      // is still selected.
      const candidates =
        eligible.length > 0 ? eligible : this.lastKnownRawItems;
      if (candidates.length > 0) {
        this.applySelectionTransition([candidates[0]], []);
      }
    }
  }

  public hostConnected(): void {
    this.host.addEventListener('click', this.handleClickCapture, true);
    this.syncKeydownActivationListener();
    this.refresh();
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('click', this.handleClickCapture, true);
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
   * Runs **`confirmSelectionChange`** (if any), applies mutators, updates internal state, and
   * dispatches the change event.
   */
  private applySelectionTransition(
    next: HTMLElement[],
    removedItems: HTMLElement[]
  ): boolean {
    const priorItems = Array.from(this.selectedItems);
    const addedItems = next.filter((el) => !this.selectedItems.has(el));

    if (addedItems.length === 0 && removedItems.length === 0) {
      return true;
    }

    if (this.options.confirmSelectionChange) {
      const ok = this.options.confirmSelectionChange({
        candidateItems: next,
        priorItems,
      });
      if (!ok) {
        return false;
      }
    }

    this.applyMutators(next);
    this.selectedItems = new Set(next);

    this.dispatchChange({ selectedItems: next, addedItems, removedItems });
    return true;
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

  private dispatchChange(detail: SelectionControllerChangeDetail): void {
    this.options.onSelectionChange?.(detail);
    this.host.dispatchEvent(
      new CustomEvent<SelectionControllerChangeDetail>(
        selectionControllerChange,
        {
          bubbles: true,
          composed: true,
          detail,
        }
      )
    );
  }

  private syncKeydownActivationListener(): void {
    if (!this.host.isConnected) {
      return;
    }
    const want = this.options.keydownActivation;
    if (want && !this.keydownListenerAttached) {
      this.host.addEventListener('keydown', this.handleKeyDownCapture, true);
      this.keydownListenerAttached = true;
    } else if (!want && this.keydownListenerAttached) {
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
