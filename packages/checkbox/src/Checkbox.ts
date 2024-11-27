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
    ElementSize,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { CheckboxMixin } from './CheckboxMixin.js';
import checkboxStyles from './checkbox.css.js';
import '@spectrum-web-components/icon/sp-icon.js';
import { Checkmark75Icon } from '@spectrum-web-components/icons-ui';
import { Dash50Icon } from '@spectrum-web-components/icons-ui';

/** Note:
 *  The current logic deviates from the earlier design of the accordion
 *  Earlier the s-checkbox size would correspond to the --system-ui-icon-checkbox-75-icon-size=10px;
 *  Now its pointing to --spectrum-icon-size-s=16px; and similarly for other sizes
 *  Need to discuss with the design team to understand the correct size to be used
 *  and update the logic accordingly
 *
 *  Goal here is to avoid using the direct css of the checkbox icon and use the sp-icon component instead
 */
const checkmarkIcon = (size: ElementSize): TemplateResult => {
    return html`
        <sp-icon id="checkmark" class="spectrum-Icon" size=${size}>
            ${Checkmark75Icon()}
        </sp-icon>
    `;
};

const dashIcon = (size: ElementSize): TemplateResult => {
    return html`
        <sp-icon
            id="partialCheckmark"
            class="spectrum-Icon spectrum-UIIcon-Dash75"
            size=${size}
        >
            ${Dash50Icon()}
        </sp-icon>
    `;
};

/**
 * @element sp-checkbox
 * @slot - content to display as the label for the Checkbox
 * @fires change - Announces a change in the `checked` property of a Checkbox
 */
export class Checkbox extends SizedMixin(CheckboxMixin(SpectrumElement), {
    noDefaultSize: true,
}) {
    static override shadowRootOptions = {
        ...SpectrumElement.shadowRootOptions,
        delegatesFocus: true,
    };

    /**
     * Disable this control. It will not receive focus or events
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property({ reflect: true, type: Number, attribute: 'tabindex' })
    public override tabIndex = 0;

    public override connectedCallback(): void {
        super.connectedCallback();
        if (this.hasAttribute('autofocus')) {
            this.updateComplete.then(() => {
                this.focus();
            });
        }
    }

    public static override get styles(): CSSResultArray {
        return [checkboxStyles];
    }

    public override click(): void {
        if (this.disabled) {
            return;
        }

        this.inputElement?.click();
    }

    public override handleChange(): void {
        this.indeterminate = false;
        super.handleChange();
    }

    protected override render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="box">
                ${this.checked
                    ? checkmarkIcon(this.size as ElementSize)
                    : html``}
                ${this.indeterminate
                    ? dashIcon(this.size as ElementSize)
                    : html``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (
            changes.has('disabled') &&
            (typeof changes.get('disabled') !== 'undefined' || this.disabled)
        ) {
            if (this.disabled) {
                this.inputElement.tabIndex = this.tabIndex;
                this.tabIndex = -1;
            } else {
                this.tabIndex = this.inputElement.tabIndex;
                this.inputElement.removeAttribute('tabindex');
            }
            this.inputElement.disabled = this.disabled;
        }
        if (changes.has('indeterminate')) {
            this.inputElement.indeterminate = this.indeterminate;
        }
        if (changes.has('invalid')) {
            if (this.invalid) {
                this.inputElement.setAttribute('aria-invalid', 'true');
            } else {
                this.inputElement.removeAttribute('aria-invalid');
            }
        }
    }
}
