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
import { when } from 'lit/directives/when.js';

import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS,
  BADGE_VARIANTS_COLOR,
  BadgeBase,
  type BadgeVariant,
} from '@spectrum-web-components/core/components/badge';

import styles from './badge.css';

/**
 * Display short, color-coded status, category, or attribute metadata next to the content it describes.
 *
 * Similar to [status lights](/docs/components-status-light--readme), badges combine color and a short text label to communicate state without the visual weight of an interactive control.
 *
 * Badges come in three styles: bold fill (default), subtle fill, and outline.
 * Choose one style consistently within a product — `outline` and `subtle` fill draw similar attention levels.
 * Reserve bold fill for high-attention badging only.
 *
 * @element swc-badge
 * @summary Short, color-coded status or category indicator.
 * @genre component
 * @category status-display
 * @related status-light,tag
 * @RSPparity partial
 * @a11yPattern non-interactive-color-status
 * @status preview
 * @since 0.0.1
 *
 * @cssproperty --swc-badge-background-color - Background color of the badge. Applies to semantic variants only; non-semantic color variants set their own backgrounds and cannot be overridden here.
 * @cssproperty --swc-badge-label-icon-color - Color applied to the badge label and slotted icon.
 * @cssproperty --swc-badge-border-color - Border color of the badge.
 * @cssproperty --swc-badge-corner-radius - Corner radius of the badge. Fixed-edge positioning intentionally clamps the affected corners to `0`.
 * @cssproperty --swc-badge-font-size - Font size of the label.
 * @cssproperty --swc-badge-line-height - Line height of the label.
 * @cssproperty --swc-badge-height - Minimum block size (height) of the badge.
 * @cssproperty --swc-badge-gap - Gap between the slotted icon and the label.
 * @cssproperty --swc-badge-padding-block - Block-axis (top/bottom) padding inside the badge.
 * @cssproperty --swc-badge-padding-inline - Inline-axis (start/end) padding inside the badge.
 * @cssproperty --swc-badge-with-icon-padding-inline - Inline padding applied when the badge contains a slotted icon.
 * @cssproperty --swc-badge-icon-size - Size of the slotted icon.
 * @cssproperty --swc-badge-outline-background-color - Background color used when the `outline` attribute is set. Outline + semantic variants only.
 * @cssproperty --swc-badge-outline-label-icon-color - Label and icon color used when the `outline` attribute is set. Outline + semantic variants only.
 *
 * @example
 * <swc-badge variant="positive">New</swc-badge>
 *
 * @example
 * <swc-badge variant="neutral" fixed="block-start">
 *   <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
 *   Verified
 * </swc-badge>
 */
export class Badge extends BadgeBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * @internal
   */
  static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR;

  /**
   * @internal
   */
  static override readonly VARIANTS = BADGE_VARIANTS;

  /**
   * @internal
   */
  static override readonly VALID_SIZES = BADGE_VALID_SIZES;

  /**
   * The variant of the badge.
   */
  @property({ type: String, reflect: true })
  public override variant: BadgeVariant = 'informative';

  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Whether the badge is subtle.
   *
   * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
   */
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;

  /**
   * Whether the badge is outlined.
   *
   * Can only be used with semantic variants.
   *
   * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
   */
  @property({ type: Boolean, reflect: true })
  public outline: boolean = false;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          ['swc-Badge']: true,
          [`swc-Badge--${this.variant}`]: typeof this.variant !== 'undefined',
          [`swc-Badge--subtle`]: this.subtle,
          [`swc-Badge--outline`]: this.outline,
          [`swc-Badge--fixed-${this.fixed}`]: typeof this.fixed !== 'undefined',
        })}
      >
        ${when(
          this.hasIcon,
          () => html`
            <div
              class=${classMap({
                [`swc-Badge-icon`]: true,
              })}
            >
              <slot name="icon"></slot>
            </div>
          `
        )}
        <div class="swc-Badge-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
