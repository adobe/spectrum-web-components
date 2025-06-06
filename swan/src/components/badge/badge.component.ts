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

import { html, LitElement, nothing } from 'lit';
import {
    customElement,
    property,
    queryAssignedElements,
} from 'lit/decorators.js';
import styles from './badge.styles.js';

// Badge variants from 1.x - comprehensive color system
export const BADGE_VARIANTS = [
    'accent',
    'neutral',
    'informative',
    'positive',
    'negative',
    'notice',
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

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

// Fixed positioning values from 1.x
export const FIXED_VALUES = [
    'inline-start',
    'inline-end',
    'block-start',
    'block-end',
] as const;

export type FixedValues = (typeof FIXED_VALUES)[number];

/**
 * @element swan-badge
 * Adapted from Spectrum Web Components v1.x Badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
@customElement('swan-badge')
export default class SwanBadge extends LitElement {
    static override styles = styles;

    @property({ reflect: true })
    public get fixed(): FixedValues | undefined {
        return this._fixed;
    }

    public set fixed(fixed: FixedValues | undefined) {
        if (fixed === this.fixed) return;
        const oldValue = this.fixed;
        this._fixed = fixed;
        if (fixed) {
            this.setAttribute('fixed', fixed);
        } else {
            this.removeAttribute('fixed');
        }
        this.requestUpdate('fixed', oldValue);
    }

    private _fixed?: FixedValues;

    @property({ type: String, reflect: true })
    public variant: BadgeVariant = 'informative';

    // Size support for compatibility (using s,m,l,xl like 1.x)
    @property({ type: String, reflect: true })
    public size: 's' | 'm' | 'l' | 'xl' = 'm';

    // Track icon slot content
    @queryAssignedElements({ slot: 'icon' })
    private iconElements!: HTMLElement[];

    // Track default slot content to detect if we have text
    private _slotHasContent = false;

    protected get hasIcon(): boolean {
        return this.iconElements && this.iconElements.length > 0;
    }

    protected get slotHasContent(): boolean {
        return this._slotHasContent;
    }

    private handleSlotChange(event: Event) {
        const slot = event.target as HTMLSlotElement;
        const assignedNodes = slot.assignedNodes();

        // Check if there's meaningful text content
        this._slotHasContent = assignedNodes.some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim() !== '';
            }
            return true; // Element nodes count as content
        });

        this.requestUpdate();
    }

    protected override render() {
        // Development warnings like 1.x
        if (process.env.NODE_ENV === 'development') {
            if (!BADGE_VARIANTS.includes(this.variant)) {
                console.warn(
                    `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
                    BADGE_VARIANTS,
                    'Current variant:',
                    this.variant
                );
            }
        }

        return html`
            ${this.hasIcon
                ? html`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                          @slotchange=${this.handleSlotChange}
                      ></slot>
                  `
                : nothing}
            <div class="label">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}
