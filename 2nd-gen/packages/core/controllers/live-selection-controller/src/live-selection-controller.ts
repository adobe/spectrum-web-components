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
 * Whether the controller enforces an exclusive (single) selection or allows
 * multiple items to be selected at the same time.
 *
 * - **`single`**: at most one item may be selected at a time. When an item becomes
 *   selected, all other selected items are deselected.
 * - **`multiple`**: any number of items may be selected simultaneously; the
 *   controller imposes no constraint.
 */
export type LiveSelectionMode = 'single' | 'multiple';

/**
 * Constructor options for {@link LiveSelectionController}.
 *
 * @template T - The specific HTMLElement subclass used as items.
 */
export type LiveSelectionOptions<T extends HTMLElement = HTMLElement> = {
  /**
   * Returns the current list of items that participate in selection. Called
   * on each observed event and inside {@link LiveSelectionController.refresh}.
   * Returning live DOM each time means dynamically added or removed items are
   * always included.
   */
  getItems: () => T[];

  /**
   * Returns `true` when `item` is currently in the selected (open) state.
   * Called after a microtask so that any in-flight event cancellation has
   * already reverted the item's state before the controller reads it.
   */
  readSelected: (item: T) => boolean;

  /**
   * Deselects `item`. Called by the controller when enforcing the
   * single-selection constraint. Must be idempotent.
   */
  deselect: (item: T) => void;

  /**
   * The event name the controller listens for on the host. Items must dispatch
   * this event with `bubbles: true` and `composed: true` after their selection
   * state changes so the host (and therefore the controller) can observe it.
   */
  observeEvent: string;

  /**
   * Selection constraint. Accepts a static value or a getter function so the
   * mode can react to host property changes without re-constructing the
   * controller.
   *
   * Defaults to `'single'`.
   */
  mode?: LiveSelectionMode | (() => LiveSelectionMode);
};

// ─────────────────────────
//     CONTROLLER
// ─────────────────────────

/**
 * `LiveSelectionController` enforces a selection constraint on a group of
 * items that each **own their own selected state**. It is intentionally
 * minimal: items manage their own open/selected property and dispatch a
 * change event; this controller observes those events and deselects siblings
 * when the mode is `'single'`.
 *
 * Use this controller when:
 *
 * - Each item independently owns its own open/selected state (e.g. an
 *   accordion panel that tracks `open` itself).
 * - The host does not need to cache or confirm selection centrally.
 * - Items are heterogeneous or unknown at construction time (slotted children).
 *
 * For patterns where the host is the single source of truth for selection
 * (e.g. a tab strip with a `selected` property), a cache-authoritative
 * controller is a better fit.
 *
 * ### Read-your-write ordering
 *
 * The controller defers its sibling-close work by one microtask. This ensures
 * that a cancelable toggle event has already run `preventDefault()` and the
 * item has already reverted its state before the controller reads
 * `readSelected`. Consuming code that listens to `observeEvent` on the host
 * will therefore always see the final committed state of each item, not an
 * intermediate value.
 *
 * ### Canceled events
 *
 * If an item's toggle event is canceled (via `event.preventDefault()`), the
 * item reverts its state synchronously before the microtask runs. The
 * controller re-reads `readSelected` on the source item inside the microtask;
 * if the item is no longer selected, it exits without deselecting anyone.
 *
 * ### Dynamic mode switching
 *
 * Pass a getter function as `mode` to change the effective mode at runtime
 * without re-constructing the controller. When the mode switches from
 * `'multiple'` to `'single'`, call {@link refresh} to enforce the stricter
 * constraint over the current DOM state.
 *
 * @template T - The specific HTMLElement subclass used as items.
 *
 * @example
 * ```ts
 * class MyAccordion extends LitElement {
 *   @property({ type: Boolean }) allowMultiple = false;
 *
 *   private readonly selection = new LiveSelectionController(this, {
 *     getItems: () => this.slottedItems(),
 *     readSelected: (item) => item.open,
 *     deselect: (item) => { item.open = false; },
 *     observeEvent: 'my-item-toggle',
 *     mode: () => (this.allowMultiple ? 'multiple' : 'single'),
 *   });
 *
 *   protected override update(changed: PropertyValues) {
 *     super.update(changed);
 *     // Enforce single-select when switching away from allowMultiple.
 *     if (changed.has('allowMultiple') && !this.allowMultiple) {
 *       this.selection.refresh();
 *     }
 *   }
 * }
 * ```
 */
export class LiveSelectionController<
  T extends HTMLElement = HTMLElement,
> implements ReactiveController {
  private readonly host: ReactiveElement;
  private readonly options: Required<LiveSelectionOptions<T>>;

  constructor(host: ReactiveElement, options: LiveSelectionOptions<T>) {
    this.host = host;
    this.options = { mode: 'single', ...options };
    host.addController(this);
  }

  // ──────────────────────
  //     LIFECYCLE
  // ──────────────────────

  public hostConnected(): void {
    this.host.addEventListener(this.options.observeEvent, this.handleEvent);
  }

  public hostDisconnected(): void {
    this.host.removeEventListener(this.options.observeEvent, this.handleEvent);
  }

  // ──────────────────────
  //     PUBLIC API
  // ──────────────────────

  /**
   * Reads the current selected state of every item and enforces the active
   * mode. In `'single'` mode, the first selected item is kept and all
   * subsequent selected items are deselected. In `'multiple'` mode, this is a
   * no-op.
   *
   * Call `refresh()` after:
   * - Switching the mode from `'multiple'` to `'single'`
   * - Re-enabling a host that was disabled while items were open
   * - Any imperative DOM change that may have left the group in an invalid state
   */
  public refresh(): void {
    if (this.currentMode !== 'single') {
      return;
    }
    let foundSelected = false;
    for (const item of this.options.getItems()) {
      if (this.options.readSelected(item)) {
        if (foundSelected) {
          this.options.deselect(item);
        } else {
          foundSelected = true;
        }
      }
    }
  }

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private get currentMode(): LiveSelectionMode {
    const { mode } = this.options;
    return typeof mode === 'function' ? mode() : mode;
  }

  private readonly handleEvent = (event: Event): void => {
    if (this.currentMode !== 'single') {
      return;
    }
    // composedPath()[0] is the original dispatch target before any shadow-boundary
    // retargeting, ensuring we identify the correct item element.
    const source = event.composedPath()[0];
    if (!(source instanceof HTMLElement)) {
      return;
    }
    // Defer by one microtask so that a cancelable event has already run
    // preventDefault() and the item has already reverted its own state.
    queueMicrotask(() => {
      // Re-check mode: it may have changed since the event fired.
      if (this.currentMode !== 'single') {
        return;
      }
      // Re-read the source item's state after the potential revert.
      if (!this.options.readSelected(source as T)) {
        return;
      }
      // Only enforce the constraint if the source belongs to this group.
      // Events from nested groups (e.g. a nested accordion) bubble here too;
      // the membership check prevents the outer group from reacting to them.
      const items = this.options.getItems();
      if (!items.includes(source as T)) {
        return;
      }
      for (const item of items) {
        if (item !== source && this.options.readSelected(item)) {
          this.options.deselect(item);
        }
      }
    });
  };
}
