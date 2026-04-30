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
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @element swc-badge
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
 *
 * @cssprop --swc-badge-height - Minimum block size of the badge.
 * @cssprop --swc-badge-corner-radius - Corner radius of the badge.
 * @cssprop --swc-badge-gap - Gap between the icon and label.
 * @cssprop --swc-badge-padding-block - Block padding.
 * @cssprop --swc-badge-padding-inline - Inline padding.
 * @cssprop --swc-badge-padding-inline-start - Inline-start padding; overrides the start side of `--swc-badge-padding-inline`.
 * @cssprop --swc-badge-font-size - Font size of the label.
 * @cssprop --swc-badge-line-height - Line height of the label.
 * @cssprop --swc-badge-icon-size - Size of the icon in the icon slot.
 * @cssprop --swc-badge-label-icon-color - Color of the label text and icon.
 * @cssprop --swc-badge-background-color - Background color of the badge.
 * @cssprop --swc-badge-border-color - Border color; visible on the outline variant.
 * @cssprop --swc-badge-with-icon-padding-inline - Inline padding when the badge has both an icon and a label.
 * @cssprop --swc-badge-with-icon-only-padding-inline - Inline padding for icon-only badges.
 * @cssprop --swc-badge-with-icon-only-padding-block - Block padding for icon-only badges.
 * @cssprop --swc-badge-outline-background-color - Background color override for the outline variant.
 * @cssprop --swc-badge-outline-label-icon-color - Label and icon color override for the outline variant.
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

  // Re-declare to ensure reflect: true is honoured on the concrete element class (inherited @property alone is insufficient in ES2022 class-field semantics).
  @property({ type: String, reflect: true })
  public override variant: BadgeVariant = 'neutral';

  // @todo - Implement new badge variants (notification, indicator) introduced in S2. Jira ticket: SWC-1831
  // Implement as separate component based on React https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/NotificationBadge.tsx

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
          ['swc-Badge--subtle']: this.subtle,
          ['swc-Badge--outline']: this.outline,
          [`swc-Badge--fixed-${this.fixed}`]: typeof this.fixed !== 'undefined',
          [`swc-Badge--no-label`]: !this.slotHasContent,
        })}
      >
        ${when(
          this.hasIcon,
          () => html`
            <div
              class=${classMap({
                ['swc-Badge-icon']: true,
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
