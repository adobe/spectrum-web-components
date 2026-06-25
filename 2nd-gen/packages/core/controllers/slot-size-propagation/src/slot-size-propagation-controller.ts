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

export interface SlotSizePropagationControllerOptions {
  /** Returns the current size value to propagate. */
  getSize: () => string;
  /** Named slot to target. Omit for the default (unnamed) slot. */
  slotName?: string;

  /**
   * CSS selector used to filter assigned elements before propagating.
   * Omit to propagate to all assigned elements.
   */
  selector?: string;
}

// ─────────────────────────────────────────────────────────────────
//     CONTROLLER
// ─────────────────────────────────────────────────────────────────

/**
 * A Lit {@link ReactiveController} that propagates a `size` attribute from
 * the host element to elements assigned to one of its slots.
 *
 * The controller automatically re-propagates in `hostUpdated()` whenever
 * the value returned by `getSize` changes. Call `propagate()` from the
 * host's `slotchange` handler to cover elements inserted after the first
 * render.
 *
 * @example
 * ```ts
 * class MyBase extends SpectrumElement {
 *   @property({ type: String, reflect: true })
 *   public size: MySize = 'm';
 *
 *   private readonly sizePropagation = new SlotSizePropagationController(this, {
 *     slotName: 'actions',
 *     getSize: () => this.size,
 *   });
 *
 *   protected handleActionsSlotChange(): void {
 *     this.sizePropagation.propagate();
 *   }
 * }
 * ```
 */
export class SlotSizePropagationController implements ReactiveController {
  private readonly _host: ReactiveElement;
  private readonly _options: SlotSizePropagationControllerOptions;
  private _previousSize?: string;

  constructor(
    host: ReactiveElement,
    options: SlotSizePropagationControllerOptions
  ) {
    this._host = host;
    this._options = options;
    host.addController(this);
  }

  public hostDisconnected(): void {
    this._previousSize = undefined;
  }

  public hostUpdated(): void {
    const size = this._options.getSize();
    if (size !== this._previousSize) {
      this._previousSize = size;
      this._propagateToSlot(size);
    }
  }

  /**
   * Propagates the current size to all matching assigned elements.
   * Call this from the host's `slotchange` event handler.
   */
  public propagate(): void {
    this._propagateToSlot(this._options.getSize());
  }

  private _propagateToSlot(size: string): void {
    const slot = this._resolveSlot();
    if (!slot) {
      return;
    }
    const assigned = slot.assignedElements({ flatten: true });
    const targets = this._options.selector
      ? assigned.filter((el) => el.matches(this._options.selector!))
      : assigned;
    for (const el of targets) {
      el.setAttribute('size', size);
    }
  }

  private _resolveSlot(): HTMLSlotElement | null {
    const root = this._host.shadowRoot;
    if (!root) {
      return null;
    }
    const { slotName } = this._options;
    return slotName
      ? root.querySelector<HTMLSlotElement>(`slot[name="${slotName}"]`)
      : root.querySelector<HTMLSlotElement>('slot:not([name])');
  }
}
