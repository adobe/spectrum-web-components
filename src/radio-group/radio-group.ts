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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import radioGroupStyles from './radio-group.css';
import { RadioChangeDetail } from '../radio/radio';
import { Radio } from '../radio/radio';

export class RadioGroup extends LitElement {
    public static readonly is = 'sp-radio-group';

    public static get styles(): CSSResultArray {
        return [radioGroupStyles];
    }

    @property({ type: String, reflect: true })
    public name = '';

    @property({ type: String, reflect: true })
    public selected = '';

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(): void {
        const checkedRadio = this.querySelector('sp-radio[checked]') as Radio;
        this.selected = checkedRadio ? checkedRadio.value : '';

        this.addEventListener(
            'sp-radio:change',
            (ev: CustomEvent<RadioChangeDetail>) => {
                this.onRadioChange(ev.detail.value);
            }
        );
    }

    private onRadioChange(value: string): void {
        const previousChecked = this.querySelectorAll('sp-radio[checked]');

        previousChecked.forEach((element) => {
            const radio = element as Radio;
            radio.checked = false;
        });

        if (value.length) {
            this.selected = value;
        }
    }
}
