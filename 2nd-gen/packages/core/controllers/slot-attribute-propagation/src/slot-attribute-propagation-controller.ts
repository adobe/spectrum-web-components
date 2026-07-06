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

export interface SlotAttributePropagationControllerOptions {
  /** The attribute name to propagate to assigned elements. */
  attribute: string;
  /** Returns the current value to propagate. */
  getValue: () => string;
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
 * A Lit {@link ReactiveController} that propagates an attribute from the host
 * element to elements assigned to one of its slots.
 *
 * The controller automatically re-propagates in `hostUpdated()` whenever the
 * value returned by `getValue` changes. Call `propagate()` from the host's
 * `slotchange` handler to cover elements inserted after the first render.
 *
 * @example
 * ```ts
 * class MyBase extends SpectrumElement {
 *   @property({ type: String, reflect: true })
 *   public size: MySize = 'm';
 *
 *   private readonly _sizePropagation = new SlotAttributePropagationController(this, {
 *     attribute: 'size',
 *     getValue: () => this.size,
 *     slotName: 'actions',
 *   });
 *
 *   protected handleActionsSlotChange(): void {
 *     this._sizePropagation.propagate();
 *   }
 * }
 * ```
 */
export class SlotAttributePropagationController implements ReactiveController {
  private readonly _host: ReactiveElement;
  private readonly _options: SlotAttributePropagationControllerOptions;
  private _previousValue?: string;

  constructor(
    host: ReactiveElement,
    options: SlotAttributePropagationControllerOptions
  ) {
    this._host = host;
    this._options = options;
    host.addController(this);
  }

  public hostDisconnected(): void {
    this._previousValue = undefined;
  }

  public hostUpdated(): void {
    const value = this._options.getValue();
    if (value !== this._previousValue) {
      this._previousValue = value;
      this._propagateToSlot(value);
    }
  }

  /**
   * Propagates the current value to all matching assigned elements.
   * Call this from the host's `slotchange` event handler.
   */
  public propagate(): void {
    this._propagateToSlot(this._options.getValue());
  }

  private _propagateToSlot(value: string): void {
    const slot = this._resolveSlot();
    if (!slot) {
      return;
    }
    const assigned = slot.assignedElements({ flatten: true });
    const targets = this._options.selector
      ? assigned.filter((el) => el.matches(this._options.selector!))
      : assigned;
    for (const el of targets) {
      el.setAttribute(this._options.attribute, value);
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
