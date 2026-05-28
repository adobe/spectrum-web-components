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

import { CSSResultArray, html, TemplateResult } from 'lit';
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
 * Supports sizes `xs`–`xl`; `xs` is an action-button-specific addition not
 * available on `swc-button`.
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

  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /** Applies the quiet (low-emphasis) visual treatment. */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;

  /** Static color treatment for display over colored or image backgrounds. */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ActionButtonStaticColor;

  /**
   * @internal
   * Forwarded to the inner `<button>` for menu-trigger patterns. After the
   * attribute is read, it is stripped from the host so assistive technologies
   * in browse mode do not encounter duplicate ARIA state on both the host
   * element and the inner button.
   */
  @property({ type: String, attribute: 'aria-haspopup' })
  protected ariaHasPopup?: string;

  /**
   * @internal
   * Forwarded to the inner `<button>` for menu-trigger patterns. After the
   * attribute is read, it is stripped from the host so assistive technologies
   * in browse mode do not encounter duplicate ARIA state on both the host
   * element and the inner button.
   */
  @property({ type: String, attribute: 'aria-expanded' })
  protected ariaExpanded?: string;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // Guard against re-entrant attributeChangedCallback during ARIA passthrough:
  // removeAttribute fires a second callback with value=null; skipping super
  // there prevents Lit from clearing the property we just read.
  private _ariaForwardingInProgress = false;

  /** @internal */
  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    const isAriaPassthrough =
      name === 'aria-haspopup' || name === 'aria-expanded';
    if (isAriaPassthrough && this._ariaForwardingInProgress) {
      return;
    }
    super.attributeChangedCallback(name, old, value);
    if (isAriaPassthrough && value !== null) {
      this._ariaForwardingInProgress = true;
      this.removeAttribute(name);
      this._ariaForwardingInProgress = false;
    }
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
        aria-haspopup=${ifDefined(this.ariaHasPopup)}
        aria-expanded=${ifDefined(this.ariaExpanded)}
      >
        <slot name="icon"></slot>
        <span class="swc-ActionButton-label">
          <slot></slot>
        </span>
      </button>
    `;
  }
}
