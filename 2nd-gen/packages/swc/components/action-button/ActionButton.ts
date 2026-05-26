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
  ActionButtonBase,
  type ActionButtonStaticColor,
} from '@spectrum-web-components/core/components/action-button';

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
 * @cssprop --swc-action-button-height - Block size of the button.
 * @cssprop --swc-action-button-min-width - Minimum inline size.
 * @cssprop --swc-action-button-edge-to-text - Inline padding from edge to text.
 * @cssprop --swc-action-button-edge-to-visual - Inline padding from edge to icon when label is present.
 * @cssprop --swc-action-button-edge-to-visual-only - Inline padding when only an icon is shown.
 * @cssprop --swc-action-button-focus-indicator-color - Color of the focus ring.
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
export class ActionButton extends ActionButtonBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Applies the quiet (low-emphasis) visual treatment.
   */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;

  /**
   * Submitted form value when the button is used inside a form. Mirrors the
   * native `<button value>` attribute.
   */
  @property({ type: String, reflect: true })
  public value: string = '';

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
}
