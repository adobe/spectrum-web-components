/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import styles from './badge.css.js';

export const BADGE_VARIANTS = [
    'neutral',
    'informative',
    'positive',
    'negative',
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
] as const;
export type BadgeVariant = typeof BADGE_VARIANTS[number];

/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export class Badge extends SizedMixin(ObserveSlotText(SpectrumElement, '')) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: String, reflect: true })
    public variant: BadgeVariant = 'informative';

    protected override render(): TemplateResult {
        return html`
            <slot name="icon" ?icon-only=${!this.slotHasContent}></slot>
            <div id="label">
                <slot></slot>
            </div>
        `;
    }
}
