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
import checkboxStyles from './checkbox.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash.css.js';
import { IconCheckmark75 } from '@spectrum-web-components/icons-ui/src/elements/IconCheckmark75.js';
import { IconCheckmark100 } from '@spectrum-web-components/icons-ui/src/elements/IconCheckmark100.js';
import { IconCheckmark200 } from '@spectrum-web-components/icons-ui/src/elements/IconCheckmark200.js';
import { IconCheckmark300 } from '@spectrum-web-components/icons-ui/src/elements/IconCheckmark300.js';
import { IconDash75 } from '@spectrum-web-components/icons-ui/src/elements/IconDash75.js';
import { IconDash100 } from '@spectrum-web-components/icons-ui/src/elements/IconDash100.js';
import { IconDash200 } from '@spectrum-web-components/icons-ui/src/elements/IconDash200.js';
import { IconDash300 } from '@spectrum-web-components/icons-ui/src/elements/IconDash300.js';

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

type CheckboxSize = Exclude<ElementSize, 'xxl'>;

/**
 * @element sp-checkbox
 * @slot - content to display as the label for the Checkbox
 */
export class Checkbox extends SizedMixin(CheckboxBase) {
    public static elementDefinitions = {
        'sp-icon-checkmark75': IconCheckmark75,
        'sp-icon-checkmark100': IconCheckmark100,
        'sp-icon-checkmark200': IconCheckmark200,
        'sp-icon-checkmark300': IconCheckmark300,
        'sp-icon-dash75': IconDash75,
        'sp-icon-dash100': IconDash100,
        'sp-icon-dash200': IconDash200,
        'sp-icon-dash300': IconDash300,
    };

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
                ${checkmarkIcon[this.size as CheckboxSize]}
                ${dashIcon[this.size as CheckboxSize]}
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
