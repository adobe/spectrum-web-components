/**
 * Copyright 2025 Adobe. All rights reserved.
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
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BadgeBase,
    type BadgeVariantS2 as BadgeVariant,
    VALID_SIZES,
} from '@spectrum-web-components/core/components/badge';

import styles from './badge.css';

/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 *
 * @element swc-badge
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
    static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S2;

    /**
     * @internal
     */
    static override readonly VARIANTS = BADGE_VARIANTS_S2;

    /**
     * @internal
     */
    static override readonly VALID_SIZES = VALID_SIZES;

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
                    ['spectrum-Badge']: true,
                    [`spectrum-Badge--size${this.size?.toUpperCase()}`]:
                        typeof this.size !== 'undefined',
                    [`spectrum-Badge--${this.variant}`]:
                        typeof this.variant !== 'undefined',
                    [`spectrum-Badge--subtle`]: this.subtle,
                    [`spectrum-Badge--outline`]: this.outline,
                    [`spectrum-Badge--fixed-${this.fixed}`]:
                        typeof this.fixed !== 'undefined',
                })}
            >
                ${when(
                    this.hasIcon,
                    () => html`
                        <div
                            class=${classMap({
                                [`spectrum-Badge-icon`]: true,
                                [`spectrum-Badge-icon--no-label`]:
                                    !this.slotHasContent,
                            })}
                        >
                            <slot name="icon"></slot>
                        </div>
                    `
                )}
                <div class="spectrum-Badge-label">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
