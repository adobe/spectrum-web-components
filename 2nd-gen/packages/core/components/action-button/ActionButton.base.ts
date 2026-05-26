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

import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { ButtonBase } from '@spectrum-web-components/core/components/button';

import {
  ACTION_BUTTON_VALID_SIZES,
  type ActionButtonSize,
} from './ActionButton.types.js';

/**
 * Abstract base class for action button components. Owns shared semantic
 * concerns inherited from ButtonBase (interaction state, slot-derived
 * icon/label state, accessible-name resolution, pending management) with
 * the action-button size range (`xs`–`xl`).
 *
 * Visual API (`quiet`, `emphasized`, `static-color`) is intentionally absent
 * so that future components can extend this base without inheriting the
 * `swc-action-button` visual surface.
 *
 * @attribute {ActionButtonSize} size - Size of the button. Supports `xs`–`xl`,
 * extending the base `ButtonBase` range with `xs`.
 */
export abstract class ActionButtonBase extends ButtonBase {
  static override readonly VALID_SIZES: readonly ActionButtonSize[] =
    ACTION_BUTTON_VALID_SIZES;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Size of the button. Supports the full `xs`–`xl` range; `xs` is an
   * action-button-specific addition not available on `swc-button`.
   */
  @property({ type: String })
  public override get size(): ActionButtonSize {
    return this._size ?? 'm';
  }

  public override set size(value: ActionButtonSize) {
    const normalized = (
      value ? (value as string).toLocaleLowerCase() : value
    ) as ActionButtonSize;
    const validSize: ActionButtonSize = ACTION_BUTTON_VALID_SIZES.includes(
      normalized
    )
      ? normalized
      : 'm';
    const oldSize = this._size ?? 'm';
    if (oldSize === validSize) {
      return;
    }
    this._size = validSize;
    this.setAttribute('size', validSize);
    this.requestUpdate('size', oldSize);
  }

  private _size: ActionButtonSize | null = null;

  protected override update(changes: PropertyValues): void {
    super.update(changes);
    // Counteracts SizedMixin's auto-reflect of size="m" when no size was explicitly set.
    if (this._size === null) {
      this.removeAttribute('size');
    }
  }
}
