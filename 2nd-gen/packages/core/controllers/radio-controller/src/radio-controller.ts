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
 * Options for {@link RadioController}.
 */
export type RadioControllerOptions = {
  /**
   * Returns mutually exclusive participants. Items outside the host subtree (shadow-inclusive)
   * are ignored.
   */
  getItems: () => HTMLElement[];

  /**
   * Invoked when {@link item} should read as asserted (for example `aria-checked="true"`).
   *
   * @param item - Becoming the exclusive winner.
   */
  selectItem: (item: HTMLElement) => void;

  /**
   * Invoked whenever {@link item} must read as inactive (unchecked or collapsed sibling).
   */
  deselectItem: (item: HTMLElement) => void;

  /**
   * When **`true`**, the roster may hold no asserted item: **`setSelectedItem(null)`** succeeds, a
   * primary **click** on the already-selected item clears selection, and **`toggleItem`** on that
   * item clears as well. When **`false`**, at least one item stays asserted whenever any eligible
   * item exists (unless **`defaultToFirstSelectable`** applies after structural changes).
   */
  toggles?: boolean;

  /**
   * When nothing is asserted after structural updates, asserts the earliest eligible sibling.
   */
  defaultToFirstSelectable?: boolean;

  /** Optional listener mirroring {@link radioControllerSelectionChange}. */
  onSelectionChange?: (detail: RadioControllerSelectionChangeDetail) => void;
};

/**
 * Name of the bubbling composed `CustomEvent` describing exclusive selection changes.
 */
export const radioControllerSelectionChange =
  'swc-radio-controller-selection-change';

/**
 * `detail` object for {@link radioControllerSelectionChange}.
 */
export type RadioControllerSelectionChangeDetail = {
  /** Active exclusive entry, or null after an intentional clear. */
  selectedItem: HTMLElement | null;
};

/**
 * Returns the deepest entry from {@link Event.composedPath} that participates in {@link items}.
 *
 * @param event - Interaction bubbling through shadow roots.
 * @param items - Pre-filtered collection (eligible slice).
 */
export function deepestRadioItemContaining(
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
 * Maintains mutually exclusive asserted state across sibling elements using supplied mutators.
 * Scoping follows the reactive host subtree (light DOM and shadow descendants). Items that are
 * disconnected, inert, not visible, native **`disabled`**, or **`aria-disabled="true"`** are never
 * eligible and primary clicks on them do not change selection. This controller only handles
 * capture-phase **`click`**, **`setSelectedItem`**, and **`toggleItem`** — it does not implement arrow keys, roving
 * **`tabindex`**, programmatic **`focus()`**, or an active-item/focus sync callback.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
 */
export class RadioController implements ReactiveController {
  private readonly host: ReactiveElement;

  private options: Omit<
    Required<
      Pick<
        RadioControllerOptions,
        | 'getItems'
        | 'selectItem'
        | 'deselectItem'
        | 'toggles'
        | 'defaultToFirstSelectable'
      >
    >,
    never
  > &
    Pick<RadioControllerOptions, 'onSelectionChange'>;

  private selectedItem: HTMLElement | null = null;

  private readonly handleClickCapture = (event: MouseEvent): void => {
    if (event.button !== 0) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    const items = this.getEligibleItems();
    const hit = deepestRadioItemContaining(event, items);
    if (!hit || this.isDisabledParticipant(hit)) {
      return;
    }
    if (this.options.toggles && hit === this.selectedItem) {
      this.applyExclusiveSelection(null);
      return;
    }
    this.applyExclusiveSelection(hit);
  };

  constructor(host: ReactiveElement, options: RadioControllerOptions) {
    this.host = host;
    this.options = {
      getItems: options.getItems,
      selectItem: options.selectItem,
      deselectItem: options.deselectItem,
      toggles: options.toggles ?? false,
      defaultToFirstSelectable: options.defaultToFirstSelectable ?? false,
      onSelectionChange: options.onSelectionChange,
    };

    host.addController(this);
  }

  /** Returns the last asserted exclusive sibling tracked by this controller instance. */
  public getSelectedItem(): HTMLElement | null {
    return this.selectedItem;
  }

  /** Merges option deltas and reapplies {@link refresh}. */
  public setOptions(partial: Partial<RadioControllerOptions>): void {
    const defaultFirstProvided =
      'defaultToFirstSelectable' in partial &&
      typeof partial.defaultToFirstSelectable === 'boolean';

    const togglesProvided =
      'toggles' in partial && typeof partial.toggles === 'boolean';

    this.options = {
      ...this.options,
      ...partial,
      toggles: togglesProvided ? partial.toggles! : this.options.toggles,
      defaultToFirstSelectable: defaultFirstProvided
        ? partial.defaultToFirstSelectable!
        : this.options.defaultToFirstSelectable,
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
    };

    this.refresh();
  }

  /**
   * Asserts exclusive state without synthetic pointer events — returns {@link false} when
   * {@link candidate} cannot join the exclusive roster. Clearing to **`null`** requires
   * **`toggles: true`**.
   */
  public setSelectedItem(candidate: HTMLElement | null): boolean {
    if (candidate !== null) {
      if (
        !this.getEligibleItems().includes(candidate) ||
        this.isDisabledParticipant(candidate)
      ) {
        return false;
      }
    } else if (!this.canClearSelection()) {
      return false;
    }

    this.applyExclusiveSelection(candidate);

    return true;
  }

  /**
   * Selects {@link item} when it is not the current exclusive choice. When **`toggles`** is
   * **`true`** and {@link item} is already selected, clears to **`null`**.
   *
   * @returns {@link false} when {@link item} is ineligible, or when it is already selected and
   * **`toggles`** is **`false`**.
   */
  public toggleItem(item: HTMLElement): boolean {
    if (
      !this.getEligibleItems().includes(item) ||
      this.isDisabledParticipant(item)
    ) {
      return false;
    }
    if (this.selectedItem !== item) {
      this.applyExclusiveSelection(item);
      return true;
    }
    if (!this.options.toggles) {
      return false;
    }
    this.applyExclusiveSelection(null);
    return true;
  }

  /** Re-applies bookkeeping after structural changes (stale selection or defaulting). */
  public refresh(): void {
    const items = this.getEligibleItems();

    if (
      this.selectedItem !== null &&
      (!this.selectedItem.isConnected || !items.includes(this.selectedItem))
    ) {
      const replacement =
        items.length === 0
          ? null
          : this.canClearSelection() && !this.options.defaultToFirstSelectable
            ? null
            : (items[0] ?? null);
      this.applyExclusiveSelection(replacement);
    } else if (
      this.selectedItem === null &&
      this.options.defaultToFirstSelectable &&
      items.length > 0
    ) {
      this.applyExclusiveSelection(items[0]);
    }
  }

  public hostConnected(): void {
    this.host.addEventListener('click', this.handleClickCapture, true);
    this.refresh();
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('click', this.handleClickCapture, true);
  }

  private applyExclusiveSelection(next: HTMLElement | null): void {
    const roster = this.getEligibleItems();
    let asserted = next;
    if (asserted === null && !this.canClearSelection() && roster.length > 0) {
      asserted = roster[0];
    }

    if (this.selectedItem === asserted) {
      return;
    }

    const prior = this.selectedItem;
    const raw = this.getScopedRawItems();

    for (const candidate of raw) {
      if (asserted !== null && candidate === asserted) {
        this.options.selectItem(candidate);
      } else {
        this.options.deselectItem(candidate);
      }
    }

    this.selectedItem = asserted;

    if (prior !== asserted) {
      this.dispatchSelectionChange();
    }
  }

  /** Mirrors `radioControllerSelectionChange` plus optional `onSelectionChange` hook. */
  private dispatchSelectionChange(): void {
    const detail: RadioControllerSelectionChangeDetail = {
      selectedItem: this.selectedItem,
    };
    this.options.onSelectionChange?.(detail);
    this.host.dispatchEvent(
      new CustomEvent<RadioControllerSelectionChangeDetail>(
        radioControllerSelectionChange,
        {
          bubbles: true,
          composed: true,
          detail,
        }
      )
    );
  }

  /**
   * Whether `node` is the host itself or reachable by walking ancestors and shadow hosts.
   *
   * @param node - Node under test (may be null).
   */
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

  /** Raw query filtered to elements owned by the reactive host subtree. */
  private getScopedRawItems(): HTMLElement[] {
    return this.options
      .getItems()
      .filter((element) => this.isNodeWithinHostScope(element));
  }

  /**
   * Native **`disabled`** or **`aria-disabled="true"`** — never eligible and never activated by
   * pointer or **`setSelectedItem`**.
   */
  private isDisabledParticipant(participant: HTMLElement): boolean {
    if ('disabled' in participant) {
      if ((participant as HTMLButtonElement).disabled) {
        return true;
      }
    }
    return participant.getAttribute('aria-disabled') === 'true';
  }

  /**
   * Eligibility filter: connected, visible, not inert, not disabled.
   */
  private isRadioNavigableItem(participant: HTMLElement): boolean {
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

  /** Eligible selectable siblings respecting visibility and disabled state. */
  private getEligibleItems(): HTMLElement[] {
    return this.getScopedRawItems().filter((participant) =>
      this.isRadioNavigableItem(participant)
    );
  }

  /** Whether the roster may hold no asserted item (`null`). */
  private canClearSelection(): boolean {
    return this.options.toggles;
  }
}
