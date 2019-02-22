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

import { defineCustomElements } from '../index.js';

import { Radio } from './radio';

export class RadioDemo extends LitElement {
    public static readonly is = 'sp-radio-demo';

    @property()
    public value = '';

    @property()
    public pet = '';

    @property()
    public gender = '';

    constructor() {
        super();

        defineCustomElements(Radio);
    }

    public onSelect(ev: Event) {
        const target = ev.target as Element;

        if (target) {
            const value = target.getAttribute('value');
            const name = target.getAttribute('name');

            if (value && name) {
                if (name === 'pet') {
                    this.pet = value;
                } else if (name === 'gender') {
                    this.gender = value;
                }
            }
        }
    }

    protected render() {
        return html`
            <form @click=${this.onSelect}>
                <sp-radio
                    value="kittens"
                    label="Kittens"
                    name="pet"
                    ?checked=${this.pet === 'kittens'}
                ></sp-radio>
                <sp-radio
                    value="puppies"
                    label="Puppies"
                    name="pet"
                    ?checked=${this.pet === 'puppies'}
                ></sp-radio>
            </form>
            <form @click=${this.onSelect}>
                <sp-radio
                    value="male"
                    label="Male"
                    name="gender"
                    ?checked=${this.gender === 'male'}
                ></sp-radio>
                <sp-radio
                    value="female"
                    label="Female"
                    name="gender"
                    ?checked=${this.gender === 'female'}
                ></sp-radio>
            </form>
        `;
    }
}
