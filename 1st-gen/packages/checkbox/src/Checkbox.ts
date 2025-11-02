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
    DefaultElementSize,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { CheckboxMixin } from './CheckboxMixin.js';
import checkboxStyles from './checkbox.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import dashSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-dash.css.js';

const checkmarkIcon = {
    s: () => {
        return html`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `;
    },
    m: () => {
        return html`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `;
    },
    l: () => {
        return html`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `;
    },
    xl: () => {
        return html`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `;
    },
};

const dashIcon = {
    s: () => {
        return html`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `;
    },
    m: () => {
        return html`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `;
    },
    l: () => {
        return html`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `;
    },
    xl: () => {
        return html`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `;
    },
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
        return [checkboxStyles, checkmarkSmallStyles, dashSmallStyles];
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
                    ? checkmarkIcon[this.size as DefaultElementSize]()
                    : html``}
                ${this.indeterminate
                    ? dashIcon[this.size as DefaultElementSize]()
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
