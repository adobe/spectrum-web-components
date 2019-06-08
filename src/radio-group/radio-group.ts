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
        this.updateCheckedState(value);

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }

    private onSlotChange(): void {
        console.log('pls');
        this.updateCheckedState(this.selected);
    }

    private updateCheckedState(value: string): void {
        const previousChecked = this.querySelectorAll('[checked]');
        console.log(previousChecked);

        previousChecked.forEach((element) => {
            element.removeAttribute('checked');
        });

        if (value.length) {
            const currentChecked = this.querySelector(`[value=${value}]`);

            if (currentChecked) {
                currentChecked.setAttribute('checked', 'true');
            }
        }
    }
}
