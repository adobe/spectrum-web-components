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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import { BadgeBase } from '@swc/core/components/badge';

import styles from './badge.css';

// Export types and values to avoid breaking changes

/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @element swc-badge
 * @since 1.0.0
 * @status stable
 * @github https://github.com/adobe/spectrum-web-components/tree/main/...
 * @figma https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2-%2F-Desktop?node-id=36806-6551
 *
 * @attribute {BadgeVariant} variant - The variant of the badge.
 * @attribute {boolean} subtle - Whether the badge is subtle.
 * @attribute {boolean} outline - Whether the badge is outlined.
 * @attribute {FixedValues} fixed - The fixed position of the badge.
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
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
    /**
     * @internal
     */
    static override readonly BADGE_VARIANTS_COLOR = [
        ...BadgeBase.BADGE_VARIANTS_COLOR,
        'pink',
        'turquoise',
        'brown',
        'cinnamon',
        'silver',
    ] as const;

    /**
     * @internal
     */
    static override readonly BADGE_VARIANTS = [
        ...Badge.BADGE_VARIANTS_SEMANTIC,
        ...Badge.BADGE_VARIANTS_COLOR,
    ] as const;

    @property({ type: Boolean, reflect: true })
    public subtle: boolean = false;

    @property({ type: Boolean, reflect: true })
    public outline: boolean = false;

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

    protected override update(changedProperties: PropertyValues): void {
        super.update(changedProperties);
        if (window.__swc?.DEBUG) {
            const constructor = this.constructor as typeof Badge;
            if (
                this.outline &&
                !constructor.BADGE_VARIANTS_SEMANTIC.includes(this.variant)
            ) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element only supports the outline styling if the variant is a semantic color variant.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
                    {
                        issues: [...constructor.BADGE_VARIANTS_SEMANTIC],
                    }
                );
            }
        }
    }
}

// Export types and constants for backward compatibility
export type BadgeVariant = (typeof Badge.BADGE_VARIANTS)[number];
export type { FixedValues } from '@swc/core/components/badge';

// Re-export constants as module-level exports for backward compatibility
export const FIXED_VALUES = BadgeBase.FIXED_VALUES;
export const BADGE_VARIANTS_SEMANTIC = Badge.BADGE_VARIANTS_SEMANTIC;
export const BADGE_VARIANTS_COLOR = Badge.BADGE_VARIANTS_COLOR;
export const BADGE_VARIANTS = Badge.BADGE_VARIANTS;
