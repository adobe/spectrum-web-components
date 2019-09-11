/*
Copyright 2019 Adobe. All rights reserved.
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
} from 'lit-element';

import { Focusable } from '../shared/focusable';
import '../icon';
import '../icons';

import textfieldStyles from './textfield.css';
import { ifDefined } from 'lit-html/directives/if-defined';
import { nothing } from 'lit-html';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Textfield extends Focusable {
    public static get styles(): CSSResultArray {
        return [textfieldStyles];
    }

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

    @property({ type: Boolean, reflect: true })
    public multiline = false;

    @property({ type: Boolean, reflect: true })
    public valid = false;

    @property({ type: String })
    public get value(): string {
        return this.inputElement.value;
    }

    public set value(input: string): void {
        this.inputElement.value = input;
    }

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true })
    public required = false;

    public get focusElement(): HTMLInputElement | HTMLTextAreaElement {
        return this.inputElement;
    }

    protected onChange(): void {
        this.dispatchEvent(new Event('change', {
            bubbles:  true,
            composed: true,
        }));
    }

    protected renderStateIcons(): TemplateResult | {} {
        if (this.invalid) {
            return html`
                <sp-icons-large></sp-icons-large>
                <sp-icon id="invalid" name="ui:AlertSmall"></sp-icon>
            `;
        } else if (this.valid) {
            return html`
                <sp-icons-large></sp-icons-large>
                <sp-icon id="valid" name="ui:CheckmarkSmall"></sp-icon>
            `;
        }
        return nothing;
    }

    protected render(): TemplateResult {
        if (this.multiline) {
            return html`
                ${this.grows
                    ? html`
                          <div id="sizer">${this.value}</div>
                      `
                    : nothing}
                <textarea
                    aria-label=${this.label || this.placeholder}
                    id="input"
                    pattern=${ifDefined(this.pattern)}
                    placeholder=${this.placeholder}
                    @input=${this.onInput}
                    @change=${this.onChange}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                ></textarea>
                ${this.renderStateIcons()}
            `;
        }
        return html`
            <input
                aria-label=${this.label || this.placeholder}
                id="input"
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                @input=${this.onInput}
                @change=${this.onChange}
                ?disabled=${this.disabled}
                ?required=${this.required}
            />
            ${this.renderStateIcons()}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('value')) {
            this.checkValidity();
        }
    }

    public checkValidity(): boolean {
        if (this.value && (this.pattern || this.required)) {
            let validity = this.inputElement.checkValidity();
            if ((this.disabled || this.multiline) && this.pattern) {
                let regex = new RegExp(this.pattern);
                validity = regex.test(this.value);
            }
            if (validity) {
                this.valid = true;
                this.invalid = false;
            } else {
                this.valid = false;
                this.invalid = true;
            }

            return this.valid;
        }
        return true;
    }
}
