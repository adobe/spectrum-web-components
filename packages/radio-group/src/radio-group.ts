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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import radioGroupStyles from './radio-group.css.js';
import { Radio } from '@spectrum-web-components/radio';

/**
 * Radio group component
 *
 * @attr column - arranges radio buttons vertically
 */
export class RadioGroup extends LitElement {
    public static get styles(): CSSResultArray {
        return [radioGroupStyles];
    }

    @property({ type: String, reflect: true })
    public name = '';

    private _selected = '';

    @property({ reflect: true })
    public get selected(): string {
        return this._selected;
    }

    public set selected(value: string) {
        const radio = value
            ? (this.querySelector(`sp-radio[value=${value}]`) as Radio)
            : undefined;

        this.deselectChecked();

        if (radio) {
            this._selected = value;
            radio.checked = true;
        } else {
            // If no matching radio, selected is reset to empty string
            this._selected = '';
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(): void {
        const checkedRadio = this.querySelector('sp-radio[checked]') as Radio;
        const checkedRadioValue = checkedRadio ? checkedRadio.value : '';

        // If selected already assigned, don't overwrite
        this.selected = this.selected || checkedRadioValue;

        this.addEventListener('change', (event: Event) => {
            const target = event.target as Radio;
            this.selected = target.value;
        });
    }

    private deselectChecked(): void {
        const previousChecked = this.querySelectorAll('sp-radio[checked]');

        previousChecked.forEach((element) => {
            const radio = element as Radio;
            radio.checked = false;
        });
    }
}
