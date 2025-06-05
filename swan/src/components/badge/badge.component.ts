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

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './badge.styles.js';

/**
 * @summary Swan Badge component for displaying status, counts, or labels.
 * @since 1.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('swan-badge')
export default class SwanBadge extends LitElement {
    static override styles = styles;

    /**
     * The badge's variant.
     */
    @property({ reflect: true }) variant:
        | 'neutral'
        | 'positive'
        | 'negative'
        | 'notice'
        | 'accent' = 'neutral';

    /**
     * The badge's size.
     */
    @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /**
     * Makes the badge pill-shaped.
     */
    @property({ type: Boolean, reflect: true }) pill = false;

    /**
     * Makes the badge pulsate to draw attention.
     */
    @property({ type: Boolean, reflect: true }) pulse = false;

    override render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    badge: true,
                    'badge--neutral': this.variant === 'neutral',
                    'badge--positive': this.variant === 'positive',
                    'badge--negative': this.variant === 'negative',
                    'badge--notice': this.variant === 'notice',
                    'badge--accent': this.variant === 'accent',
                    'badge--small': this.size === 'small',
                    'badge--medium': this.size === 'medium',
                    'badge--large': this.size === 'large',
                    'badge--pill': this.pill,
                    'badge--pulse': this.pulse,
                })}
                role="status"
            >
                <slot></slot>
            </span>
        `;
    }
}
