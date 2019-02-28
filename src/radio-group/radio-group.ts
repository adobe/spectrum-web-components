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

import { html, LitElement, property } from 'lit-element';

import radioGroupStyles from './radio-group.css';

export class RadioGroup extends LitElement {
    public static readonly is = 'sp-radio-group';

    public static get styles() {
        return [radioGroupStyles];
    }

    @property({ reflect: true })
    public name = '';

    @property({ reflect: true })
    public get selected() {
        return this._selected;
    }

    public set selected(value: string) {
        const oldValue = this.selected;

        if (value) {
            this.updateCheckedState(value);
        }

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    private _selected = '';

    constructor() {
        super();

        this.addEventListener('click', (ev: Event) => this.onClick(ev));
    }

    public onClick(ev: Event) {
        const target = ev.target as Element;

        if (target) {
            const value = target.getAttribute('value');

            if (value) {
                this.selected = value;
            }
        }
    }

    protected render() {
        return html`
            <slot @click=${this.onClick}></slot>
        `;
    }

    private updateCheckedState(value: string) {
        const previousChecked = this.querySelectorAll('[checked]');
        const currentChecked = this.querySelector(`[value=${value}]`);

        previousChecked.forEach((element) => {
            element.removeAttribute('checked');
        });
        if (currentChecked) {
            currentChecked.setAttribute('checked', 'true');
        }
    }
}
