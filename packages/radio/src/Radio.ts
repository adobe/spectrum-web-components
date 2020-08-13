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
    query,
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';

import radioStyles from './radio.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

/**
 * Spectrum Radio Button Component
 *
 * @attr quiet - Uses the quiet style
 * @attr label-below - Moves the label below the radio button
 * @attr invalid - Uses the invalid style
 * @attr disabled - Uses the disabled style
 * @attr checked - Represents when the input is checked
 * @attr name - Represents the group this radio is a part of
 * @attr value - Identifies this radio button within its radio group
 *
 * @event sp-radio:change - When the input is interacted with and its state is changed
 */
export class Radio extends Focusable {
    public static get styles(): CSSResultArray {
        return [...super.styles, radioStyles];
    }
    @property({ type: String, reflect: true })
    public name = '';

    @property({ type: String, reflect: true })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public checked = false;

    @query('#input')
    private inputElement!: HTMLInputElement;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    public handleChange(): void {
        this.checked = this.inputElement.checked;
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            <input
                id="input"
                aria-labelledby="label"
                type="radio"
                name=${this.name}
                value=${this.value}
                .checked=${this.checked}
                @change=${this.handleChange}
            />
            <span id="button"></span>
            <label id="label"><slot></slot></label>
        `;
    }
}
