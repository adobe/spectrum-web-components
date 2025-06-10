/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html } from 'lit';
import { BadgeBase } from './badge.base.js';
import styles from './badge.styles.js';

/**
 * @element swan-badge
 * Adapted from Spectrum Web Components v1.x Badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export default class SwanBadge extends BadgeBase {
    static override styles = styles;

    protected override render() {
        return html`
            <slot
                name="icon"
                ?icon-only=${!this.slotHasContent}
                @slotchange=${this.handleSlotChange}
            ></slot>

            <div class="label">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}
