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

import { property, html, TemplateResult, query } from 'lit-element';
import { Focusable } from '../shared/focusable';

export class RadioBase extends Focusable {
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

    public handleChange(ev: PointerEvent): void {
        this.checked = this.inputElement.checked;
    }

    protected render(): TemplateResult {
        return html`
            <input
                id="input"
                type="radio"
                ?checked=${this.checked}
                name=${this.name}
                value=${this.value}
                @change=${this.handleChange}
            />
        `;
    }
}
