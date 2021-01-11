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
    TemplateResult,
    html,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';
import { CheckboxBase } from './CheckboxBase.js';
import '@spectrum-web-components/icon/sp-icon.js';
import { Checkmark75Icon, Dash75Icon } from '@spectrum-web-components/icons-ui';
import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash.css.js';

export class Checkbox extends CheckboxBase {
    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    public static get styles(): CSSResultArray {
        return [checkboxStyles, checkmarkSmallStyles, dashSmallStyles];
    }

    protected render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="box">
                <sp-icon id="checkmark" class="spectrum-UIIcon-Checkmark75">
                    ${Checkmark75Icon()}
                </sp-icon>
                <sp-icon id="partialCheckmark" class="spectrum-UIIcon-Dash75">
                    ${Dash75Icon()}
                </sp-icon>
            </span>
            <label id="label"><slot></slot></label>
        `;
    }

    protected updated(changes: PropertyValues): void {
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
