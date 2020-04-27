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
} from 'lit-element';
import { CheckboxBase } from './checkbox-base.js';
import '@spectrum-web-components/icon';
import {
    CheckmarkSmallIcon,
    DashSmallIcon,
} from '@spectrum-web-components/icons-ui';
import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/lib/spectrum-icon-checkmark-small.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/lib/spectrum-icon-dash-small.css.js';

export class Checkbox extends CheckboxBase {
    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            checkboxStyles,
            checkmarkSmallStyles,
            dashSmallStyles,
        ];
    }

    protected get ariaCheckedState(): 'true' | 'false' | 'mixed' {
        return this.indeterminate ? 'mixed' : super.ariaCheckedState;
    }

    protected render(): TemplateResult {
        return html`
            <label id="root">
                ${super.render()}
                <span id="box">
                    <sp-icon id="checkmark" size="s" class="checkmark-small">
                        ${CheckmarkSmallIcon({ hidden: true })}
                    </sp-icon>
                    <sp-icon id="partialCheckmark" size="s" class="dash-small">
                        ${DashSmallIcon({ hidden: true })}
                    </sp-icon>
                </span>
                <span id="label"><slot></slot></span>
            </label>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (changes.has('invalid')) {
            if (this.invalid) {
                this.inputElement.setAttribute('aria-invalid', 'true');
            } else {
                this.inputElement.removeAttribute('aria-invalid');
            }
        }
    }
}
