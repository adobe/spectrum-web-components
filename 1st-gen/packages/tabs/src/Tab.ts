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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import tabItemStyles from './tab.css.js';

/**
 * @element sp-tab
 *
 * @slot - text label of the Tab
 * @slot icon - The icon that appears on the left of the label
 */
export class Tab extends FocusVisiblePolyfillMixin(
    ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), '')
) {
    public static override get styles(): CSSResultArray {
        return [tabItemStyles];
    }

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    protected get hasLabel(): boolean {
        return !!this.label || this.slotHasContent;
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: String, reflect: true })
    public value = '';

    protected override render(): TemplateResult {
        return html`
            ${this.hasIcon
                ? html`
                      <slot name="icon"></slot>
                  `
                : nothing}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent ? nothing : this.label}
                <slot>${this.label}</slot>
            </label>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'tab');
        if (!this.hasAttribute('id')) {
            this.id = `sp-tab-${randomID()}`;
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selected')) {
            this.setAttribute(
                'aria-selected',
                this.selected ? 'true' : 'false'
            );
            this.setAttribute('tabindex', this.selected ? '0' : '-1');
        }
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
