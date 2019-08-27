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
} from 'lit-element';

import { Focusable } from '../shared/focusable';

import textfieldStyles from './textfield.css';
import { ifDefined } from 'lit-html/directives/if-defined';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Textfield extends Focusable {
    public static get styles(): CSSResultArray {
        return [textfieldStyles];
    }

    @query('#input')
    private inputElement!: HTMLElement;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label = '';

    @property()
    public pattern?: string;

    @property({ type: Boolean, reflect: true })
    public multiline = false;

    @property({ type: Boolean, reflect: true })
    public valid = false;

    @property({ type: String })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public required = false;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    protected render(): TemplateResult {
        if (this.multiline) {
            return html`
                <textarea
                    aria-label=${this.label}
                    id="input"
                    pattern=${ifDefined(this.pattern)}
                    placeholder=${this.label}
                    .value=${this.value}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                ></textarea>
            `;
        }
        return html`
            <input
                aria-label=${this.label}
                id="input"
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.label}
                .value=${this.value}
                ?disabled=${this.disabled}
                ?required=${this.required}
            />
        `;
    }
}
