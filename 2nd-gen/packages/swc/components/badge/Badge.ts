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
 * Display small amounts of color-categorized metadata to get a user's attention.
 *
 * Similar to [status lights](/docs/components-status-light--readme), they use color and text to convey status or category information.
 *
 * Badges come in three styles: bold fill (default), subtle fill, and outline.
 * Choose one style consistently within a product — `outline` and `subtle` fill draw similar attention levels.
 * Reserve bold fill for high-attention badging only.
 *
 * @element swc-badge
 * @status preview
 * @since 0.0.1
 *
 * @example
 * <swc-badge variant="positive">New</swc-badge>
 *
 * @example
 * <swc-badge variant="neutral" fixed="fill">
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
