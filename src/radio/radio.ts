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
    query,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import radioStyles from './radio.css';
import { Focusable } from '../shared/focusable';
import { strictCustomEvent } from '../events';

export interface RadioChangeDetail {
    value: string;
}

/**
 * Radio button component
 *
 * @attr quiet - uses the quiet style
 * @attr label-below - moves the label below the radio button
 * @attr invalid - uses the invalid style
 * @attr disabled - uses the disabled style
 * @attr checked - represents when the input is checked
 */
export class Radio extends Focusable {
    public static get styles(): CSSResultArray {
        return [radioStyles];
    }
    @property({ type: String, reflect: true })
    public name = '';

    @property({ type: String, reflect: true })
    public value = '';

    @property({ type: Boolean, reflect: true })
    public checked: boolean = false;

    @query('#input')
    private inputElement!: HTMLInputElement;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    public handleChange(): void {
        this.checked = this.inputElement.checked;
        this.dispatchEvent(
            strictCustomEvent('sp-radio:change', {
                bubbles: true,
                composed: true,
                detail: {
                    value: this.value,
                },
            })
        );
    }

    protected render(): TemplateResult {
        return html`
        <label id="root">
            <input
                id="input"
                type="radio"
                name=${this.name}
                value=${this.value}
                .checked=${this.checked}
                @change=${this.handleChange}
            />
            <span id="button"></span>
            <span id="label"><slot></slot></span>
        </div>
        `;
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-radio:change': CustomEvent<RadioChangeDetail>;
    }
}
