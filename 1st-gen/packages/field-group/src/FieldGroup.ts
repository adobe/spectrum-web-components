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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';

import styles from './field-group.css.js';

/**
 * @element sp-field-group
 * @slot - the form controls that make up the group
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export class FieldGroup extends ManageHelpText(SpectrumElement, {
    mode: 'external',
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public horizontal = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label = '';

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    protected handleSlotchange(): void {
        // Surface this functionality for easy composition in extensions.
        return;
    }

    protected override render(): TemplateResult {
        return html`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }
    }

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }
}
