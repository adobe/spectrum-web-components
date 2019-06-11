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
import { RadioChangeDetail } from '../radio/radio-base';

export class RadioGroup extends LitElement {
    public static readonly is = 'sp-radio-group';

    public static get styles(): CSSResultArray {
        return [radioGroupStyles];
    }

    @property({ reflect: true })
    public name = '';

    private _selected = '';

    @property({ reflect: true })
    public get selected(): string {
        return this._selected;
    }

    public set selected(value: string) {
        const oldValue = this.selected;

        if (value === oldValue) {
            return;
        }

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }

    private onSlotChange(): void {
        this.addEventListener(
            'sp-radio:change',
            (ev: CustomEvent<RadioChangeDetail>) => {
                this.onRadioChange(ev.detail.value);
            }
        );
    }

    private onRadioChange(value: string): void {
        const previousChecked = this.querySelectorAll('sp-radio[checked]');
        console.log('test');

        previousChecked.forEach((element) => {
            element.removeAttribute('checked');
        });

        if (value.length) {
            const currentChecked = this.querySelector(
                `sp-radio[value=${value}]`
            );

            if (currentChecked) {
                currentChecked.setAttribute('checked', 'checked');
            }

            this.selected = value;
        }
    }
}
