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
    DefaultElementSize,
    html,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { CheckboxBase } from './CheckboxBase.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';
import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash.css.js';

const checkmarkIcon = {
    s: html`
        <sp-icon-checkmark75
            id="checkmark"
            class="spectrum-UIIcon-Checkmark75"
        ></sp-icon-checkmark75>
    `,
    m: html`
        <sp-icon-checkmark100
            id="checkmark"
            class="spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `,
    l: html`
        <sp-icon-checkmark200
            id="checkmark"
            class="spectrum-UIIcon-Checkmark200"
        ></sp-icon-checkmark200>
    `,
    xl: html`
        <sp-icon-checkmark300
            id="checkmark"
            class="spectrum-UIIcon-Checkmark300"
        ></sp-icon-checkmark300>
    `,
};

const dashIcon = {
    s: html`
        <sp-icon-dash75
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,
    m: html`
        <sp-icon-dash100
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,
    l: html`
        <sp-icon-dash200
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,
    xl: html`
        <sp-icon-dash300
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `,
};

/**
 * @element sp-checkbox
 * @slot - content to display as the label for the Checkbox
 * @fires change - Announces a change in the `checked` property of a Checkbox
 */
export class Checkbox extends SizedMixin(CheckboxBase) {
    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    public static override get styles(): CSSResultArray {
        return [checkboxStyles, checkmarkSmallStyles, dashSmallStyles];
    }

    protected override render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="box">
                ${checkmarkIcon[this.size as DefaultElementSize]}
                ${dashIcon[this.size as DefaultElementSize]}
            </span>
            <label id="label"><slot></slot></label>
        `;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('invalid')) {
            if (this.invalid) {
                this.inputElement.setAttribute('aria-invalid', 'true');
            } else {
                this.inputElement.removeAttribute('aria-invalid');
            }
        }
        if (changes.has('indeterminate')) {
            if (this.indeterminate) {
                this.inputElement.setAttribute('aria-checked', 'mixed');
            } else {
                this.inputElement.removeAttribute('aria-checked');
            }
        }
    }
}
