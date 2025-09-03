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
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import { BadgeBase } from '@swc/core/components/badge';

import styles from './badge.css';

// Export types and values to avoid breaking changes
export { BADGE_VARIANTS, FIXED_VALUES } from '@swc/core/components/badge';
export type { BadgeVariant, FixedValues } from '@swc/core/components/badge';

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
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 *
 * @csspart label - The text content area of the badge
 * @csspart icon - The icon area of the badge (when present)
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
