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
    html,
    property,
    CSSResultArray,
    query,
    TemplateResult,
    PropertyValues,
    nothing,
} from '@spectrum-web-components/base';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    AlertSmallIcon,
    CheckmarkSmallIcon,
} from '@spectrum-web-components/icons-ui';

import textfieldStyles from './textfield.css.js';
import checkmarkSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark-small.css.js';
import alertSmallStyles from '@spectrum-web-components/icon/src/spectrum-icon-alert-small.css.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class Textfield extends Focusable {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            textfieldStyles,
            checkmarkSmallStyles,
            alertSmallStyles,
        ];
    }

    @property({ attribute: 'allowed-keys' })
    allowedKeys = '';

    @query('#input')
    private inputElement!: HTMLInputElement | HTMLTextAreaElement;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label = '';

    @property()
    public placeholder = '';

    @property()
    public pattern?: string;

    @property({ type: Boolean, reflect: true })
    public grows = false;

    @property({ type: Number })
    public maxlength?: number;

    @property({ type: Number })
    public minlength?: number;

    @property({ type: Boolean, reflect: true })
    public multiline = false;

    @property({ type: Boolean, reflect: true })
    public valid = false;

    @property({ type: String })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true })
    public required = false;

    @property({ type: String, reflect: true })
    public autocomplete?:
        | HTMLInputElement['autocomplete']
        | HTMLTextAreaElement['autocomplete'];

    public get focusElement(): HTMLInputElement | HTMLTextAreaElement {
        return this.inputElement;
    }

    protected onInput(): void {
        if (this.allowedKeys && this.inputElement.value) {
            const regExp = new RegExp(`^[${this.allowedKeys}]*$`);
            if (!regExp.test(this.inputElement.value)) {
                const selectionStart = this.inputElement
                    .selectionStart as number;
                const nextSelectStart = selectionStart - 1;
                this.inputElement.value = this.value;
                this.inputElement.setSelectionRange(
                    nextSelectStart,
                    nextSelectStart
                );
                return;
            }
        }
        this.value = this.inputElement.value;
    }

    protected onChange(): void {
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected renderStateIcons(): TemplateResult | typeof nothing {
        if (this.invalid) {
            return html`
                <sp-icon id="invalid" class="icon alert-small">
                    ${AlertSmallIcon({ hidden: true })}
                </sp-icon>
            `;
        } else if (this.valid) {
            return html`
                <sp-icon id="valid" class="icon checkmark-small">
                    ${CheckmarkSmallIcon({ hidden: true })}
                </sp-icon>
            `;
        }
        return nothing;
    }

    private get renderMultiline(): TemplateResult {
        return html`
            ${this.grows
                ? html`
                      <div id="sizer">${this.value}</div>
                  `
                : nothing}
            <!-- @ts-ignore -->
            <textarea
                aria-label=${this.label || this.placeholder}
                id="input"
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.value}
                @change=${this.onChange}
                @input=${this.onInput}
                ?disabled=${this.disabled}
                ?required=${this.required}
                autocomplete=${ifDefined(this.autocomplete)}
            ></textarea>
        `;
    }

    private get renderInput(): TemplateResult {
        return html`
            <!-- @ts-ignore -->
            <input
                aria-label=${this.label || this.placeholder}
                id="input"
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.value}
                @change=${this.onChange}
                @input=${this.onInput}
                ?disabled=${this.disabled}
                ?required=${this.required}
                autocomplete=${ifDefined(this.autocomplete)}
            />
        `;
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            ${this.multiline ? this.renderMultiline : this.renderInput}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (
            changedProperties.has('value') ||
            (changedProperties.has('required') && this.required)
        ) {
            this.checkValidity();
        }
    }

    public checkValidity(): boolean {
        let validity = this.inputElement.checkValidity();
        if (this.required || (this.value && this.pattern)) {
            if ((this.disabled || this.multiline) && this.pattern) {
                const regex = new RegExp(this.pattern);
                validity = regex.test(this.value);
            }
            this.valid = validity;
            this.invalid = !validity;
        }
        return validity;
    }
}
