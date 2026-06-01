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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  ACTION_BUTTON_VALID_SIZES,
  type ActionButtonSize,
  type ActionButtonStaticColor,
} from '@spectrum-web-components/core/components/action-button';
import { ButtonBase } from '@spectrum-web-components/core/components/button';

import pendingSpinnerStyles from '../../stylesheets/_lit-styles/pending-spinner.css';
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
 * @cssprop --swc-action-button-min-block-size - Minimum block size. Defaults to the medium component height token.
 * @cssprop --swc-action-button-border-radius - Corner radius. Defaults to `corner-radius-medium-size-medium`.
 * @cssprop --swc-action-button-font-size - Font size of the label. Defaults to the medium font-size token.
 * @cssprop --swc-action-button-gap - Gap between icon and label.
 * @cssprop --swc-action-button-edge-to-text - Inline padding from edge to label text.
 * @cssprop --swc-action-button-edge-to-visual - Inline padding from edge to icon when a label is also present.
 * @cssprop --swc-action-button-edge-to-visual-only - Inline padding from edge to icon when no label is present.
 * @cssprop --swc-action-button-icon-size - Size (inline and block) of the slotted icon.
 * @cssprop --swc-action-button-icon-inline-size - Inline size override for the slotted icon.
 * @cssprop --swc-action-button-icon-block-size - Block size override for the slotted icon.
 * @cssprop --swc-action-button-focus-indicator-color - Color of the focus ring outline.
 * @cssprop --swc-action-button-background-color-default - Background color in the default state.
 * @cssprop --swc-action-button-border-color-default - Border color in the default state.
 * @cssprop --swc-action-button-content-color-default - Text and icon color in the default state.
 * @cssprop --swc-action-button-background-color-hover - Background color on hover.
 * @cssprop --swc-action-button-border-color-hover - Border color on hover.
 * @cssprop --swc-action-button-content-color-hover - Text and icon color on hover.
 * @cssprop --swc-action-button-background-color-focus - Background color when focused.
 * @cssprop --swc-action-button-border-color-focus - Border color when focused.
 * @cssprop --swc-action-button-content-color-focus - Text and icon color when focused.
 * @cssprop --swc-action-button-background-color-down - Background color when pressed.
 * @cssprop --swc-action-button-border-color-down - Border color when pressed.
 * @cssprop --swc-action-button-content-color-down - Text and icon color when pressed.
 * @cssprop --swc-action-button-background-color-disabled - Background color when disabled or pending.
 * @cssprop --swc-action-button-border-color-disabled - Border color when disabled or pending.
 * @cssprop --swc-action-button-content-color-disabled - Text and icon color when disabled or pending.
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
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /** @internal */
  static override readonly VALID_SIZES: readonly ActionButtonSize[] =
    ACTION_BUTTON_VALID_SIZES;

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
    return [pendingSpinnerStyles, styles];
  }

  // Observe aria-haspopup / aria-expanded without @property so they don't
  // conflict with ARIAMixin types on HTMLElement or appear in the public CEM.
  static override get observedAttributes(): string[] {
    return [...super.observedAttributes, 'aria-haspopup', 'aria-expanded'];
  }

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
    if (isAriaPassthrough) {
      if (name === 'aria-haspopup') {
        this._ariaHasPopup = value ?? undefined;
      } else {
        this._ariaExpanded = value ?? undefined;
      }
      if (value !== null) {
        this._ariaForwardingInProgress = true;
        this.removeAttribute(name);
        this._ariaForwardingInProgress = false;
      }
      return;
    }
    super.attributeChangedCallback(name, old, value);
  }

  // Forwarded to the inner <button> for menu-trigger patterns; stripped from
  // the host after reading to avoid duplicate ARIA state on both elements.
  @state()
  private _ariaHasPopup?: string;

  @state()
  private _ariaExpanded?: string;

  // Guard against re-entrant attributeChangedCallback: removeAttribute fires a
  // second callback with value=null; the guard prevents that from clearing the
  // state we just set.
  private _ariaForwardingInProgress = false;

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
        aria-haspopup=${ifDefined(this._ariaHasPopup)}
        aria-expanded=${ifDefined(this._ariaExpanded)}
      >
        <slot name="icon"></slot>
        <span class="swc-ActionButton-label">
          <slot></slot>
        </span>
        ${this.pending
          ? html`
              <svg
                class="swc-ActionButton-pendingSpinner"
                width="100%"
                height="100%"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  class="swc-ActionButton-pendingSpinner-track"
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 1px)"
                />
                <circle
                  class="swc-ActionButton-pendingSpinner-fill"
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 1px)"
                  pathLength="100"
                  stroke-dasharray="100 200"
                  stroke-dashoffset="75"
                  stroke-linecap="round"
                />
              </svg>
            `
          : nothing}
      </button>
    `;
  }
}
