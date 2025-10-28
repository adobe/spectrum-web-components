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

import {
    CSSResultArray,
    html,
    nothing,
    TemplateResult,
} from '@spectrum-web-components/base';

import { property } from '@spectrum-web-components/base/src/decorators.js';

import {
    BADGE_VARIANTS_COLOR_S1,
    BADGE_VARIANTS_S1,
    BadgeBase,
    type BadgeVariantS1,
    FIXED_VALUES as FIXED_VALUES_BASE,
    type FixedValues as FixedValuesBase,
} from '@spectrum-web-components/core/components/badge';

import styles from './badge.css.js';

/**
 * @deprecated The `BADGE_VARIANTS` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `Badge.VARIANTS` property from the constructor.
 */
export const BADGE_VARIANTS = BADGE_VARIANTS_S1;

/**
 * @deprecated The `FIXED_VALUES` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `Badge.FIXED_VALUES` property from the constructor.
 */
export const FIXED_VALUES = FIXED_VALUES_BASE;

/**
 * @deprecated The `BadgeVariant` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `Badge`
 * prototype as follows: `typeof Badge.prototype.variant`
 */
export type BadgeVariant = BadgeVariantS1;

/**
 * @deprecated The `FixedValues` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `Badge`
 * constructor as follows: `typeof Badge.FIXED_VALUES`
 */
export type FixedValues = FixedValuesBase;

/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export class Badge extends BadgeBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S1;

    /**
     * @internal
     */
    static override readonly VARIANTS = BADGE_VARIANTS_S1;

    /**
     * The variant of the badge.
     */
    @property({ type: String, reflect: true })
    public override variant: BadgeVariantS1 = 'informative';

    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        return html`
            ${this.hasIcon
                ? html`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `
                : nothing}
            <div class="label">
                <slot></slot>
            </div>
        `;
    }
}
