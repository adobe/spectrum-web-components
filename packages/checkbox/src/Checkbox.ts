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
    SizedMixin,
    ElementSize,
} from '@spectrum-web-components/base';
import { CheckboxBase } from './CheckboxBase.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    Checkmark75Icon,
    Checkmark100Icon,
    Checkmark200Icon,
    Checkmark300Icon,
    Dash75Icon,
    Dash100Icon,
    Dash200Icon,
    Dash300Icon,
} from '@spectrum-web-components/icons-ui';
import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash.css.js';

const checkmarkClass = {
    s: 'spectrum-UIIcon-Checkmark75',
    m: 'spectrum-UIIcon-Checkmark100',
    l: 'spectrum-UIIcon-Checkmark200',
    xl: 'spectrum-UIIcon-Checkmark300',
};

const checkmarkIcon = {
    s: Checkmark75Icon,
    m: Checkmark100Icon,
    l: Checkmark200Icon,
    xl: Checkmark300Icon,
};

const dashClass = {
    s: 'spectrum-UIIcon-Dash75',
    m: 'spectrum-UIIcon-Dash100',
    l: 'spectrum-UIIcon-Dash200',
    xl: 'spectrum-UIIcon-Dash300',
};

const dashIcon = {
    s: Dash75Icon,
    m: Dash100Icon,
    l: Dash200Icon,
    xl: Dash300Icon,
};

type CheckboxSize = Exclude<ElementSize, 'xxl'>;

export class Checkbox extends SizedMixin(CheckboxBase) {
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
                <sp-icon
                    id="checkmark"
                    class=${checkmarkClass[this.size as CheckboxSize]}
                >
                    ${checkmarkIcon[this.size as CheckboxSize]()}
                </sp-icon>
                <sp-icon
                    id="partialCheckmark"
                    class=${dashClass[this.size as CheckboxSize]}
                >
                    ${dashIcon[this.size as CheckboxSize]()}
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
