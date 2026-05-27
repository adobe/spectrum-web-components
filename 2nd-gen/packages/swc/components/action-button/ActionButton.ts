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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  ACTION_BUTTON_VALID_SIZES,
  type ActionButtonSize,
  type ActionButtonStaticColor,
} from '@spectrum-web-components/core/components/action-button';
import { ButtonBase } from '@spectrum-web-components/core/components/button';

import styles from './action-button.css';

/**
 * A compact action button for toolbars, action groups, and icon-first chrome.
 *
 * @element swc-action-button
 * @since 0.0.1
 *
 * @slot - Visible button label.
 * @slot icon - Optional leading icon displayed before the label.
 *
 * @example
 * <swc-action-button>Edit</swc-action-button>
 *
 * @example
 * <swc-action-button quiet>
 *   <sp-icon-edit slot="icon"></sp-icon-edit>
 *   Edit
 * </swc-action-button>
 */
export class ActionButton extends ButtonBase {
  // ──────────────────────
  //     API OVERRIDES
  // ──────────────────────

  /** @internal */
  static override readonly VALID_SIZES: readonly ActionButtonSize[] =
    ACTION_BUTTON_VALID_SIZES;

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

  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Applies the quiet (low-emphasis) visual treatment.
   */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;

  /**
   * Static color treatment for display over colored or image backgrounds.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ActionButtonStaticColor;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'swc-ActionButton': true,
          'swc-ActionButton--hasIcon': this.hasIcon,
          'swc-ActionButton--iconOnly': this.hasIcon && !this.hasLabel,
          'swc-ActionButton--pendingActive': this.pendingActive,
        })}
        type="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-disabled=${ifDefined(
          this.pending && !this.disabled ? 'true' : undefined
        )}
        aria-label=${ifDefined(
          this.pending ? this.getPendingAccessibleName() : this.accessibleLabel
        )}
      >
        <slot name="icon"></slot>
        <span class="swc-ActionButton-label">
          <slot></slot>
        </span>
      </button>
    `;
  }

  protected override update(changes: PropertyValues): void {
    super.update(changes);
    // Counteracts SizedMixin's auto-reflect of size="m" when no size was explicitly set.
    if (this._size === null) {
      this.removeAttribute('size');
    }
  }
}
