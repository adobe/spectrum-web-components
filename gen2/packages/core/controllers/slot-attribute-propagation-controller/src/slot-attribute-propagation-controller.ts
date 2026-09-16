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

  /**
   * Returns the current value to propagate. Return `null` to remove the
   * attribute from assigned elements, for attributes that are only
   * sometimes present on the host.
   */
  getValue: () => string | null;
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
 * `getValue` may return `null` for attributes that are only sometimes present
 * on the host; the controller removes the attribute from assigned elements
 * rather than setting it to an empty string.
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
  private _previousValue?: string | null;

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
      this._propagateToSlot(value);
    }
  }

  /**
   * Propagates the current value to all matching assigned elements
   * immediately, updating the value tracked for the `hostUpdated()` no-op
   * guard so it isn't repeated once the pending update runs. Call this from
   * the host's `slotchange` event handler.
   */
  public propagate(): void {
    this._propagateToSlot(this._options.getValue());
  }

  private _propagateToSlot(value: string | null): void {
    const slot = this._resolveSlot();
    if (!slot) {
      return;
    }
    // Tracked here (not just in hostUpdated()) so a propagate() call from a
    // slotchange handler also updates the no-op guard; otherwise a
    // subsequently-scheduled hostUpdated() with the same value would repeat
    // the same setAttribute()/removeAttribute() sweep over every target. Set
    // only once the slot resolves: if a call (from either hostUpdated() or
    // propagate()) can't resolve the slot yet, the value must not be marked
    // as applied, or a slot that resolves later with an unchanged value
    // would be silently skipped forever.
    this._previousValue = value;
    const assigned = slot.assignedElements({ flatten: true });
    const targets = this._options.selector
      ? assigned.filter((el) => el.matches(this._options.selector!))
      : assigned;
    for (const el of targets) {
      if (value === null) {
        el.removeAttribute(this._options.attribute);
      } else {
        el.setAttribute(this._options.attribute, value);
      }
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
