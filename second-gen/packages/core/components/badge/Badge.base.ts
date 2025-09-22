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

export const FIXED_VALUES = [
    'inline-start',
    'inline-end',
    'block-start',
    'block-end',
] as const;
export type FixedValues = (typeof FIXED_VALUES)[number];

/**
 * @element sp-badge-base
 * @attribute {ElementSize} size - The size of the badge.
 * @attribute {BadgeVariant} variant - The variant of the badge.
 * @attribute {FixedValues} fixed - The fixed position of the badge.
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
    static readonly BADGE_VARIANTS_SEMANTIC: readonly string[] = [
        'accent',
        'neutral',
        'informative',
        'positive',
        'negative',
        'notice',
    ] as const;

    /**
     * @internal
     */
    static readonly BADGE_VARIANTS_COLOR: readonly string[] = [
        'fuchsia',
        'indigo',
        'magenta',
        'purple',
        'seafoam',
        'yellow',
        'gray',
        'red',
        'orange',
        'chartreuse',
        'celery',
        'green',
        'cyan',
        'blue',
    ] as const;

    /**
     * @internal
     */
    static readonly BADGE_VARIANTS: readonly string[] = [
        ...BadgeBase.BADGE_VARIANTS_SEMANTIC,
        ...BadgeBase.BADGE_VARIANTS_COLOR,
    ] as const;

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
            if (!constructor.BADGE_VARIANTS.includes(this.variant)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
                    {
                        issues: [...constructor.BADGE_VARIANTS],
                    }
                );
            }
        }
    }
}

// Export types and values for backward compatibility
export type BadgeVariant = (typeof BadgeBase.BADGE_VARIANTS)[number];

// Re-export constants as module-level exports for backward compatibility
export const BADGE_VARIANTS_SEMANTIC = BadgeBase.BADGE_VARIANTS_SEMANTIC;
export const BADGE_VARIANTS_COLOR = BadgeBase.BADGE_VARIANTS_COLOR;
export const BADGE_VARIANTS = BadgeBase.BADGE_VARIANTS;
