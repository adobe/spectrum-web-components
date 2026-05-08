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

import {
  FocusgroupNavigationController,
  type FocusgroupNavigationOptions,
} from '../../focusgroup-navigation-controller/index.js';

// ─────────────────────────
//     TYPES
// ─────────────────────────

/**
 * Options for {@link RadioController}.
 */
export type RadioControllerOptions = {
  /**
   * Returns mutually exclusive participants. Items outside the host subtree (shadow-inclusive)
   * are ignored, matching {@link FocusgroupNavigationController} scoping.
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

  /** When true, drops native `disabled` or `aria-disabled="true"` from eligibility checks. */
  skipDisabled?: boolean;

  /** When navigation is bundled, aligns exclusive state with whichever item gained arrow focus. */
  selectionFollowsFocus?: boolean;

  /**
   * When true (default mirrors navigation embedding), assigns {@link KeyboardEvent.key | Space}
   * on the focused item without moving focus — APG radios and menu radios.
   */
  handleSpaceActivatesSelection?: boolean;

  /** Allows clearing every asserted item through {@link RadioController.setSelectedItem}. */
  allowEmptySelection?: boolean;

  /**
   * When nothing is asserted after structural updates, asserts the earliest eligible sibling.
   */
  defaultToFirstSelectable?: boolean;

  /** Passed through to bundled {@link FocusgroupNavigationController}, or {@link false}. */
  navigation?:
    | false
    | Partial<
        Omit<FocusgroupNavigationOptions, 'getItems' | 'onActiveItemChange'>
      >;

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

const DEFAULT_NAVIGATION = {
  direction: 'horizontal' as const,
  wrap: true,
  memory: true,
} satisfies Partial<
  Omit<FocusgroupNavigationOptions, 'getItems' | 'onActiveItemChange'>
>;

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
 * Maintains mutually exclusive asserted state across sibling elements using supplied mutators while
 * sharing item discovery idioms from {@link FocusgroupNavigationController}. Optionally nests
 * roving tabindex through {@link FocusgroupNavigationController} for arrow-key composites.
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
        | 'skipDisabled'
        | 'selectionFollowsFocus'
        | 'handleSpaceActivatesSelection'
        | 'allowEmptySelection'
        | 'defaultToFirstSelectable'
      >
    >,
    never
  > &
    Pick<RadioControllerOptions, 'navigation' | 'onSelectionChange'>;

  private embeddedNavigation: FocusgroupNavigationController | null = null;

  private selectedItem: HTMLElement | null = null;

  /** Prevents recursion when syncing focusgroup bookkeeping. */
  private suppressEmbeddedActiveCallback = false;

  /**
   * Prevents reacting to stray focus pulses while rewriting selection from pointer / Space.
   */
  private syncingExclusiveState = false;

  private readonly handleClickCapture = (event: MouseEvent): void => {
    if (event.button !== 0) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    const items = this.getEligibleItems();
    const hit = deepestRadioItemContaining(event, items);
    if (!hit || this.isActivationDisabled(hit)) {
      return;
    }
    this.syncingExclusiveState = true;
    try {
      this.applyExclusiveSelection(hit, {
        propagateToEmbeddedNavigation: true,
      });
    } finally {
      this.syncingExclusiveState = false;
    }
  };

  private readonly handleKeyCapture = (event: KeyboardEvent): void => {
    if (!this.options.handleSpaceActivatesSelection) {
      return;
    }
    if (event.key !== ' ' || event.repeat || event.defaultPrevented) {
      return;
    }
    const items = new Set(this.getEligibleItems());

    /**
     * Matches composed-path participants first (shadow targets), otherwise the shadow root focus.
     *
     * @returns Focused selectable element participating in exclusivity.
     */
    const resolveParticipant = (): HTMLElement | null => {
      for (const node of event.composedPath()) {
        if (!(node instanceof HTMLElement)) {
          continue;
        }
        if (items.has(node)) {
          return node;
        }
      }
      const active = this.host.shadowRoot?.activeElement;
      return active instanceof HTMLElement && items.has(active) ? active : null;
    };

    const participant = resolveParticipant();
    if (!participant || this.isActivationDisabled(participant)) {
      return;
    }
    event.preventDefault();
    this.syncingExclusiveState = true;
    try {
      this.applyExclusiveSelection(participant, {
        propagateToEmbeddedNavigation: true,
      });
    } finally {
      this.syncingExclusiveState = false;
    }
  };

  constructor(host: ReactiveElement, options: RadioControllerOptions) {
    this.host = host;
    const navigationEnabled = options.navigation !== false;
    type NavigationPatchInput = Omit<
      FocusgroupNavigationOptions,
      'getItems' | 'onActiveItemChange'
    >;

    const navigationPatch: false | NavigationPatchInput =
      options.navigation === false
        ? false
        : {
            skipDisabled: options.skipDisabled ?? false,
            ...DEFAULT_NAVIGATION,
            ...(typeof options.navigation === 'object'
              ? options.navigation
              : {}),
          };

    this.options = {
      getItems: options.getItems,
      selectItem: options.selectItem,
      deselectItem: options.deselectItem,
      skipDisabled: options.skipDisabled ?? false,
      selectionFollowsFocus: options.selectionFollowsFocus ?? true,
      handleSpaceActivatesSelection:
        options.handleSpaceActivatesSelection ?? navigationEnabled,
      allowEmptySelection: options.allowEmptySelection ?? false,
      defaultToFirstSelectable: options.defaultToFirstSelectable ?? false,
      navigation: navigationEnabled === false ? false : navigationPatch,
      onSelectionChange: options.onSelectionChange,
    };

    if (navigationPatch) {
      this.embeddedNavigation = new FocusgroupNavigationController(host, {
        ...navigationPatch,
        getItems: () => this.getEligibleItems(),
        onActiveItemChange: (active) => {
          if (
            this.suppressEmbeddedActiveCallback ||
            this.syncingExclusiveState ||
            !active
          ) {
            return;
          }
          if (
            !this.options.selectionFollowsFocus ||
            this.isActivationDisabled(active)
          ) {
            return;
          }
          this.applyExclusiveSelection(active, {
            propagateToEmbeddedNavigation: false,
          });
        },
      });
    }

    host.addController(this);
  }

  /** Returns the last asserted exclusive sibling tracked by this controller instance. */
  public getSelectedItem(): HTMLElement | null {
    return this.selectedItem;
  }

  /** Merges deltas; rejects `navigation` changes because wiring is immutable post-construction. */
  public setOptions(partial: Partial<RadioControllerOptions>): void {
    if (partial.navigation !== undefined) {
      throw new Error(
        'RadioController does not permit mutating navigation options after creation.'
      );
    }

    const nextSkip = partial.skipDisabled ?? this.options.skipDisabled;

    const selectionFollowsFocusProvided =
      'selectionFollowsFocus' in partial &&
      typeof partial.selectionFollowsFocus === 'boolean';

    const spaceProvided =
      'handleSpaceActivatesSelection' in partial &&
      typeof partial.handleSpaceActivatesSelection === 'boolean';

    const allowEmptyProvided =
      'allowEmptySelection' in partial &&
      typeof partial.allowEmptySelection === 'boolean';

    const defaultFirstProvided =
      'defaultToFirstSelectable' in partial &&
      typeof partial.defaultToFirstSelectable === 'boolean';

    this.options = {
      ...this.options,
      ...partial,
      skipDisabled: nextSkip,
      selectionFollowsFocus: selectionFollowsFocusProvided
        ? partial.selectionFollowsFocus!
        : this.options.selectionFollowsFocus,
      handleSpaceActivatesSelection: spaceProvided
        ? partial.handleSpaceActivatesSelection!
        : this.options.handleSpaceActivatesSelection,
      allowEmptySelection: allowEmptyProvided
        ? partial.allowEmptySelection!
        : this.options.allowEmptySelection,
      defaultToFirstSelectable: defaultFirstProvided
        ? partial.defaultToFirstSelectable!
        : this.options.defaultToFirstSelectable,
      getItems: partial.getItems ?? this.options.getItems,
      selectItem: partial.selectItem ?? this.options.selectItem,
      deselectItem: partial.deselectItem ?? this.options.deselectItem,
      onSelectionChange:
        partial.onSelectionChange ?? this.options.onSelectionChange,
    };

    if (partial.skipDisabled !== undefined && this.embeddedNavigation) {
      this.embeddedNavigation.setOptions({ skipDisabled: nextSkip });
    }

    this.refresh();
  }

  /**
   * Programmatic assertion without synthetic clicks — returns {@link false} when {@link candidate}
   * cannot join the exclusive roster.
   */
  public setSelectedItem(
    candidate: HTMLElement | null,
    behavior?: { focus?: boolean }
  ): boolean {
    if (candidate !== null) {
      if (
        !this.getEligibleItems().includes(candidate) ||
        this.isActivationDisabled(candidate)
      ) {
        return false;
      }
    } else if (!this.options.allowEmptySelection) {
      return false;
    }

    this.applyExclusiveSelection(candidate, {
      propagateToEmbeddedNavigation: true,
    });

    if (candidate && behavior?.focus) {
      queueMicrotask(() => {
        candidate.focus();
      });
    }

    return true;
  }

  /** Re-applies bookkeeping after structural changes and refreshes optional navigation sibling. */
  public refresh(): void {
    const items = this.getEligibleItems();

    if (
      this.selectedItem !== null &&
      (!this.selectedItem.isConnected || !items.includes(this.selectedItem))
    ) {
      const replacement =
        items.length === 0
          ? null
          : this.options.allowEmptySelection &&
              !this.options.defaultToFirstSelectable
            ? null
            : (items[0] ?? null);
      this.applyExclusiveSelection(replacement, {
        propagateToEmbeddedNavigation: true,
      });
    } else if (
      this.selectedItem === null &&
      this.options.defaultToFirstSelectable &&
      items.length > 0
    ) {
      this.applyExclusiveSelection(items[0], {
        propagateToEmbeddedNavigation: true,
      });
    } else if (this.embeddedNavigation) {
      this.embeddedNavigation.refresh();
    }
  }

  public hostConnected(): void {
    this.host.addEventListener('click', this.handleClickCapture, true);
    this.host.addEventListener('keydown', this.handleKeyCapture, true);
    this.refresh();
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('click', this.handleClickCapture, true);
    this.host.removeEventListener('keydown', this.handleKeyCapture, true);
  }

  private applyExclusiveSelection(
    next: HTMLElement | null,
    flags: { propagateToEmbeddedNavigation: boolean }
  ): void {
    const roster = this.getEligibleItems();
    let asserted = next;
    if (
      asserted === null &&
      !this.options.allowEmptySelection &&
      roster.length > 0
    ) {
      asserted = roster[0];
    }

    if (this.selectedItem === asserted) {
      if (
        flags.propagateToEmbeddedNavigation &&
        asserted &&
        this.embeddedNavigation
      ) {
        this.propagateEmbeddedTabStop(asserted);
      } else {
        this.embeddedNavigation?.refresh();
      }
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

    if (
      flags.propagateToEmbeddedNavigation &&
      asserted &&
      this.embeddedNavigation
    ) {
      this.propagateEmbeddedTabStop(asserted);
    } else if (this.embeddedNavigation) {
      this.embeddedNavigation.refresh();
    }

    if (prior !== asserted) {
      this.dispatchSelectionChange();
    }
  }

  /** Ensures tabindex mirrors the asserted participant without reacting to programmatic sync. */
  private propagateEmbeddedTabStop(participant: HTMLElement): void {
    if (!this.embeddedNavigation) {
      return;
    }
    this.suppressEmbeddedActiveCallback = true;
    try {
      this.embeddedNavigation.setActiveItem(participant);
    } finally {
      this.suppressEmbeddedActiveCallback = false;
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
   * Mirrors {@link FocusgroupNavigationController}'s containment guard so callers can query arbitrary
   * slices without leaking into foreign shadow trees.
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

  /** Raw query filtered to elements owned by {@link RadioController}'s reactive host subtree. */
  private getScopedRawItems(): HTMLElement[] {
    return this.options
      .getItems()
      .filter((element) => this.isNodeWithinHostScope(element));
  }

  /**
   * Whether `participant` skips navigation when `{@link RadioControllerOptions.skipDisabled}` resolves true.
   *
   * @param participant - Potential radio sibling.
   */
  private skipsDisabledSemantics(participant: HTMLElement): boolean {
    if ('disabled' in participant) {
      if ((participant as HTMLButtonElement).disabled) {
        return true;
      }
    }
    return participant.getAttribute('aria-disabled') === 'true';
  }

  /**
   * Mirrors {@link FocusgroupNavigationController}'s eligibility filter for interactive composites.
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
    if (this.options.skipDisabled && this.skipsDisabledSemantics(participant)) {
      return false;
    }
    return true;
  }

  /**
   * Prevents asserting disabled controls even when callers forget to prune `getItems`.
   *
   * @param participant - Candidate asserting role states.
   */
  private isActivationDisabled(participant: HTMLElement): boolean {
    return (
      ('disabled' in participant &&
        (participant as HTMLButtonElement).disabled) ||
      participant.getAttribute('aria-disabled') === 'true'
    );
  }

  /** Eligible selectable siblings respecting skip rules and viewport visibility. */
  private getEligibleItems(): HTMLElement[] {
    return this.getScopedRawItems().filter((participant) =>
      this.isRadioNavigableItem(participant)
    );
  }
}
