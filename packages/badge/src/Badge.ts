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

import { BadgeBase } from './Badge.base.js';
import styles from './badge.css.js';

// Export types and values to avoid breaking changes
export { BADGE_VARIANTS, FIXED_VALUES } from './Badge.base.js';
export type { BadgeVariant, FixedValues } from './Badge.base.js';

/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export class Badge extends BadgeBase {
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
