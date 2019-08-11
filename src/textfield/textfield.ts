/*
Copyright 2018 Adobe. All rights reserved.
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

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Textfield extends Focusable {
    public static get styles(): CSSResultArray {
        return [textfieldStyles];
    }

    @query('#input')
    private inputElement!: HTMLElement;

    @property()
    public label = '';

    @property({ type: String })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public multiline = false;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    protected render(): TemplateResult {
        if (this.multiline) {
            return html`
                <textarea
                    id="input"
                    aria-label=${this.label}
                    placeholder=${this.label}
                    .value=${this.value}
                ></textarea>
            `;
        }
        return html`
            <input
                id="input"
                aria-label=${this.label}
                placeholder=${this.label}
                .value=${this.value}
            />
        `;
    }
}
