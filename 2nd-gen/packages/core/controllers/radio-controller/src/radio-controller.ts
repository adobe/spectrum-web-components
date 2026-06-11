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

  /**
   * When **`true`**, **Enter** or **Space** on an eligible item (resolved like pointer hits via
   * {@link deepestRadioItemContaining}) asserts that item for manual keyboard activation (for
   * example a tablist paired with **`FocusgroupNavigationController`** for arrow keys). When
   * **`false`** (default), only capture-phase **click** changes selection (plus
   * **`setSelectedItem`** / **`toggleItem`**).
   */
  keydownActivation?: boolean;

  /** Optional listener mirroring {@link radioControllerSelectionChange}. */
  onSelectionChange?: (detail: RadioControllerSelectionChangeDetail) => void;

  /**
   * Called **before** **`selectItem`** / **`deselectItem`** run for the proposed transition.
   * Return **`false`** to abort — mutators do not run, **`selectedItem`** stays **`prior`**, and no
   * selection-change dispatch occurs. Omit for unconditional commits.
   */
  confirmSelectionChange?: (
    detail: RadioControllerConfirmSelectionChangeDetail
  ) => boolean;

  /**
   * Mirrors a string key (for example **`tab-id`**) alongside **`HTMLElement`** selection. When
   * set, {@link RadioController.getSelectedKey}, {@link RadioController.syncSelectedKey}, and
   * optional {@link RadioControllerSelectionKeyBinding.hostCommit} run on the controller.
   */
  selectionBinding?: RadioControllerSelectionKeyBinding;
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
 * Payload for {@link RadioControllerOptions.confirmSelectionChange}.
 */
export type RadioControllerConfirmSelectionChangeDetail = {
  /** Exclusive entry after roster normalization (applied next if confirm returns true). */
  candidate: HTMLElement | null;
  /** Exclusive entry before this transition. */
  prior: HTMLElement | null;
};

/**
 * Maps between exclusive **`HTMLElement`** participants and a host-facing string key (for example
 * **`tab-id`** on **`swc-tab`**).
 */
export type RadioControllerSelectionKeyBinding = {
  getKey: (item: HTMLElement) => string;
  /** Resolve **`key`** using the current **`getItems`** roster (return **`null`** when unknown). */
  resolveKey: (key: string) => HTMLElement | null;

  /**
   * Runs **before** mutators on user-driven transitions (**not** during {@link RadioController.syncSelectedKey}
   * with **`silent: true`**). Return **`false`** to abort. During this call, {@link RadioController.getSelectedKey}
   * temporarily reflects **`candidateKey`** so cancelable host **`change`** listeners see the pending value.
   */
  hostCommit?: (detail: RadioControllerHostCommitDetail) => boolean;
};

/** Payload for {@link RadioControllerSelectionKeyBinding.hostCommit}. */
export type RadioControllerHostCommitDetail = {
  candidateKey: string;
  priorKey: string;
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
 * selectable and primary clicks on them do not change selection.
 *
 * This controller handles capture-phase **`click`**, optional capture-phase **`keydown`** for
 * **Enter** / **Space** when **`keydownActivation`** is **`true`**, **`setSelectedItem`**, and
 * **`toggleItem`**. Optional **`confirmSelectionChange`** runs **before** mutators and may veto a
 * transition so DOM stays on **`prior`**. Pair with **`FocusgroupNavigationController`** when the
 * composite also needs roving **`tabindex`**, arrow keys, Home/End, or focus memory; this controller
 * does not implement those behaviors.
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
        | 'keydownActivation'
      >
    >,
    never
  > &
    Pick<
      RadioControllerOptions,
      'onSelectionChange' | 'confirmSelectionChange' | 'selectionBinding'
    >;

  private selectedItem: HTMLElement | null = null;

  /** Canonical key when {@link RadioControllerOptions.selectionBinding} is set. */
  private selectedKey = '';

  /**
   * Key waiting for a non-empty **`getItems`** roster (for example attribute **`selected`** before
   * slot assignment).
   */
  private pendingSelectedKey: string | null = null;

  /** So {@link getSelectedKey} matches pending selection during {@link RadioControllerSelectionKeyBinding.hostCommit}. */
  private previewSelectedKey: string | null = null;

  /** Skips **`hostCommit`** and **`confirmSelectionChange`** (programmatic **`syncSelectedKey`**). */
  private silentCommit = false;

  /** Temporarily hides **`getItems`** so **`refresh`** can clear assertion when **`toggles`** is false. */
  private suppressRawItems = false;

  private keydownListenerAttached = false;

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
    const hit = deepestRadioItemContaining(event, items);
    if (!hit || this.isDisabledParticipant(hit)) {
      return;
    }
    event.preventDefault();
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
      keydownActivation: options.keydownActivation ?? false,
      onSelectionChange: options.onSelectionChange,
      confirmSelectionChange: options.confirmSelectionChange,
      selectionBinding: options.selectionBinding,
    };

    host.addController(this);
  }

  /** Returns the last asserted exclusive sibling tracked by this controller instance. */
  public getSelectedItem(): HTMLElement | null {
    return this.selectedItem;
  }

  /**
   * When {@link RadioControllerOptions.selectionBinding} is set, returns the key for the current (or
   * previewed) selection; otherwise **`''`**.
   */
  public getSelectedKey(): string {
    if (!this.options.selectionBinding) {
      return '';
    }
    if (this.previewSelectedKey !== null) {
      return this.previewSelectedKey;
    }
    if (this.pendingSelectedKey !== null) {
      return this.pendingSelectedKey;
    }
    return this.selectedKey;
  }

  /**
   * Re-applies {@link pendingSelectedKey} after the item roster is populated (call from host
   * **`slotchange`** when **`getItems`** becomes non-empty).
   */
  public flushPendingSelectedKey(): void {
    if (this.pendingSelectedKey === null || !this.options.selectionBinding) {
      return;
    }
    if (this.callGetItems().length === 0) {
      return;
    }
    const key = this.pendingSelectedKey;
    const item = this.options.selectionBinding.resolveKey(key);
    if (item) {
      this.pendingSelectedKey = null;
      this.syncSelectedKey(key, { silent: true });
    } else {
      this.pendingSelectedKey = null;
      this.syncSelectedKey('', { silent: true });
    }
  }

  /**
   * Applies **`key`** through **`resolveKey`** / **`setSelectedItem`**, or clears the asserted item
   * when **`key`** is **`''`** (uses an empty roster pass when **`toggles`** is **`false`**).
   */
  public syncSelectedKey(key: string, options?: { silent?: boolean }): void {
    if (!this.options.selectionBinding) {
      return;
    }

    const silent = options?.silent ?? false;
    const wasSilent = this.silentCommit;
    this.silentCommit = silent;

    try {
      if (key === '') {
        this.pendingSelectedKey = null;
        this.clearExclusiveAssertionWhenEmptyKey();
        this.syncSelectedKeyFieldFromState();
        this.host.requestUpdate?.('selected');
        return;
      }

      let item = this.options.selectionBinding.resolveKey(key);
      if (!item && key !== '' && this.callGetItems().length === 0) {
        this.pendingSelectedKey = key;
        this.host.requestUpdate?.('selected');
        return;
      }
      if (!item) {
        this.pendingSelectedKey = null;
        this.clearExclusiveAssertionWhenEmptyKey();
        this.syncSelectedKeyFieldFromState();
        this.host.requestUpdate?.('selected');
        return;
      }

      this.setSelectedItem(item);
      this.host.requestUpdate?.('selected');
    } finally {
      this.silentCommit = wasSilent;
    }
  }

  /** Keeps {@link selectedKey} aligned with {@link selectedItem} after structural updates. */
  private syncSelectedKeyFieldFromState(): void {
    if (!this.options.selectionBinding) {
      return;
    }
    this.selectedKey = this.selectedItem
      ? this.options.selectionBinding.getKey(this.selectedItem)
      : '';
  }

  private clearExclusiveAssertionWhenEmptyKey(): void {
    if (this.canClearSelection()) {
      this.setSelectedItem(null);
      return;
    }
    this.suppressRawItems = true;
    try {
      this.refresh();
    } finally {
      this.suppressRawItems = false;
    }
    this.refresh();
  }

  private callGetItems(): HTMLElement[] {
    if (this.suppressRawItems) {
      return [];
    }
    return this.options.getItems();
  }

  /** Merges option deltas and reapplies {@link refresh}. */
  public setOptions(partial: Partial<RadioControllerOptions>): void {
    const defaultFirstProvided =
      'defaultToFirstSelectable' in partial &&
      typeof partial.defaultToFirstSelectable === 'boolean';

    const togglesProvided =
      'toggles' in partial && typeof partial.toggles === 'boolean';

    const keydownActivationProvided =
      'keydownActivation' in partial &&
      typeof partial.keydownActivation === 'boolean';

    this.options = {
      ...this.options,
      ...partial,
      toggles: togglesProvided ? partial.toggles! : this.options.toggles,
      defaultToFirstSelectable: defaultFirstProvided
        ? partial.defaultToFirstSelectable!
        : this.options.defaultToFirstSelectable,
      keydownActivation: keydownActivationProvided
        ? partial.keydownActivation!
        : this.options.keydownActivation,
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
      confirmSelectionChange:
        partial.confirmSelectionChange ?? this.options.confirmSelectionChange,
      selectionBinding:
        partial.selectionBinding ?? this.options.selectionBinding,
    };

    this.syncKeydownActivationListener();
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

  /** Adds or removes the capture-phase keydown listener when `keydownActivation` changes. */
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

    const binding = this.options.selectionBinding;

    if (binding?.hostCommit && !this.silentCommit) {
      const candidateKey = asserted ? binding.getKey(asserted) : '';
      const priorKey = prior ? binding.getKey(prior) : '';
      this.previewSelectedKey = candidateKey;
      try {
        const ok = binding.hostCommit({
          candidateKey,
          priorKey,
        });
        if (ok === false) {
          return;
        }
      } finally {
        this.previewSelectedKey = null;
      }
    }

    if (this.options.confirmSelectionChange && !this.silentCommit) {
      const ok = this.options.confirmSelectionChange({
        candidate: asserted,
        prior,
      });
      if (!ok) {
        return;
      }
    }

    this.applyExclusiveMutators(asserted);

    this.selectedItem = asserted;

    if (binding) {
      this.selectedKey = asserted ? binding.getKey(asserted) : '';
      this.pendingSelectedKey = null;
      this.host.requestUpdate?.('selected');
    }

    if (prior !== asserted) {
      this.dispatchSelectionChange();
    }
  }

  /** Applies **`selectItem`** / **`deselectItem`** so **`asserted`** is the exclusive winner. */
  private applyExclusiveMutators(asserted: HTMLElement | null): void {
    const raw = this.getScopedRawItems();

    for (const candidate of raw) {
      if (asserted !== null && candidate === asserted) {
        this.options.selectItem(candidate);
      } else {
        this.options.deselectItem(candidate);
      }
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
    return this.callGetItems().filter((element) =>
      this.isNodeWithinHostScope(element)
    );
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
   * Whether {@link participant} may be asserted as the exclusive selection.
   */
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

  /** Scoped roster members that may be selected. */
  private getEligibleItems(): HTMLElement[] {
    return this.getScopedRawItems().filter((participant) =>
      this.isSelectableItem(participant)
    );
  }

  /** Whether the roster may hold no asserted item (`null`). */
  private canClearSelection(): boolean {
    return this.options.toggles;
  }
}
