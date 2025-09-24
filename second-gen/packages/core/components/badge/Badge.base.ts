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
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SizedMixin, SpectrumElement } from '@swc/core/shared/base';
import { ObserveSlotPresence } from '@swc/core/shared/observe-slot-presence';
import { ObserveSlotText } from '@swc/core/shared/observe-slot-text';

import {
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BADGE_VARIANTS_SEMANTIC,
    type BadgeVariant,
    FIXED_VALUES,
    type FixedValues,
} from './Badge.types';

/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @attribute {ElementSize} size - The size of the badge.
 * @attribute {BadgeVariant} variant - The variant of the badge.
 * @attribute {FixedValues} fixed - The fixed position of the badge.
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export abstract class BadgeBase extends SizedMixin(
    ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
    {
        noDefaultSize: true,
    }
) {
    /**
     * @internal
     */
    static readonly FIXED_VALUES: readonly string[] = FIXED_VALUES;

    /**
     * @internal
     */
    static readonly VARIANTS_SEMANTIC: readonly string[] =
        BADGE_VARIANTS_SEMANTIC;

    /**
     * @internal
     */
    static readonly VARIANTS_COLOR: readonly string[] = BADGE_VARIANTS_COLOR_S2;

    /**
     * @internal
     */
    static readonly VARIANTS: readonly string[] = BADGE_VARIANTS_S2;

    @property({ type: String, reflect: true })
    public variant: BadgeVariant = 'informative';

    @property({ type: String, reflect: true })
    public fixed?: FixedValues;

    /**
     * @internal Used for rendering gap when the badge has an icon.
     */
    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    protected override update(changedProperties: PropertyValues): void {
        super.update(changedProperties);
        if (window.__swc?.DEBUG) {
            const constructor = this.constructor as typeof BadgeBase;
            if (!constructor.VARIANTS.includes(this.variant)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
                    {
                        issues: [...constructor.VARIANTS],
                    }
                );
            }
        }
    }
}
