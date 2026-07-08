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
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  ACTION_BUTTON_VALID_SIZES,
  type ActionButtonSize,
  type ActionButtonStaticColor,
} from '@spectrum-web-components/core/components/action-button';
import { ButtonBase } from '@spectrum-web-components/core/components/button';

import { renderPendingSpinner } from '../button/pending-spinner.js';

import pendingSpinnerStyles from '../../stylesheets/_lit-styles/pending-spinner.css';
import styles from './action-button.css';

/**
 * A compact action button for toolbars, action groups, and icon-first chrome.
 *
 * @element swc-action-button
 * @since 2.0.0
 *
 * @slot - Visible button label.
 * @slot icon - Optional leading icon displayed before the label.
 *
 * @cssprop --swc-action-button-min-block-size - Minimum block size. Defaults to the medium component height token.
 * @cssprop --swc-action-button-border-radius - Corner radius applied to all four corners. Defaults to `corner-radius-medium-size-medium`.
 * @cssprop --swc-action-button-border-start-start-radius - Start-start corner radius override. Defaults to `--swc-action-button-border-radius`. Used by `swc-action-group` compact mode to reset interior corners.
 * @cssprop --swc-action-button-border-start-end-radius - Start-end corner radius override. Defaults to `--swc-action-button-border-radius`. Used by `swc-action-group` compact mode to reset interior corners.
 * @cssprop --swc-action-button-border-end-start-radius - End-start corner radius override. Defaults to `--swc-action-button-border-radius`. Used by `swc-action-group` compact mode to reset interior corners.
 * @cssprop --swc-action-button-border-end-end-radius - End-end corner radius override. Defaults to `--swc-action-button-border-radius`. Used by `swc-action-group` compact mode to reset interior corners.
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

  // aria-haspopup and aria-expanded are observed without @property to avoid
  // conflicting with ARIAMixin types on HTMLElement and appearing in the CEM.
  /** @internal */
  static override get observedAttributes(): string[] {
    return [
      ...super.observedAttributes,
      'aria-haspopup',
      'aria-expanded',
      'aria-disabled',
    ];
  }

  /**
   * Intercepts `aria-haspopup` and `aria-expanded` before Lit processes them.
   * These attributes are stripped from the host and stored as internal state so
   * they can be forwarded to the inner `<button>`, preventing duplicate ARIA
   * state from appearing on both the host and the native element. The
   * `_ariaForwardingInProgress` guard stops the re-entrant callback triggered
   * by `removeAttribute` from re-entering this branch.
   *
   * @internal
   */
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
    if (name === 'aria-disabled') {
      // Kept on the host (not stripped) — the host attribute is the CSS hook
      // for disabled appearance via :host([aria-disabled="true"]). The value
      // is also stored as reactive state so the inner <button> stays in sync.
      this._ariaDisabled = value ?? undefined;
    }
    super.attributeChangedCallback(name, old, value);
  }

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

  // Forwarded to the inner <button> for menu-trigger patterns; stripped from
  // the host after reading to avoid duplicate ARIA state on both elements.
  @state()
  private _ariaHasPopup?: string;

  @state()
  private _ariaExpanded?: string;

  @state()
  private _ariaDisabled?: string;

  // Guard against re-entrant attributeChangedCallback: removeAttribute fires a
  // second callback with value=null; the guard prevents that from clearing the
  // state we just set.
  private _ariaForwardingInProgress = false;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [pendingSpinnerStyles, styles];
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
          this.pending && !this.disabled ? 'true' : this._ariaDisabled
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
        ${renderPendingSpinner(this.pending, this.pendingActive)}
      </button>
    `;
  }
}
