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

import { html, LitElement, property, TemplateResult } from 'lit-element';

import { defineCustomElements } from '../index.js';

import '../radio';

import { RadioGroup } from './radio-group';

const pets = [
    {
        label: 'Kittens',
        value: 'kittens',
    },
    {
        label: 'Puppies',
        value: 'puppies',
    },
    {
        label: 'Bunnies',
        value: 'bunnies',
    },
    {
        label: 'Hamsters',
        value: 'hamsters',
    },
];

const genders = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    },
    {
        label: 'Other',
        value: 'other',
    },
];

export class RadioGroupDemo extends LitElement {
    public static readonly is = 'sp-radio-group-demo';

    @property()
    public pet = 'puppies';

    @property()
    public gender = 'invalid';

    public constructor() {
        super();

        defineCustomElements(RadioGroup);
    }

    public onPetClick(ev: Event): void {
        const target = ev.target as Element;

        if (target) {
            const value = target.getAttribute('value');

            if (value) {
                this.pet = value;
            }
        }
    }

    public onGenderClick(ev: Event): void {
        const target = ev.target as Element;

        if (target) {
            const value = target.getAttribute('value');

            if (value) {
                this.gender = value;
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <sp-radio-group
                name="pet"
                @click=${this.onPetClick}
                .selected=${this.pet}
            >
                ${pets.map(
                    (option) => html`
                        <sp-radio
                            value=${option.value}
                            label=${option.label}
                        ></sp-radio>
                    `
                )}
            </sp-radio-group>
            <sp-radio-group
                name="gender"
                @click=${this.onGenderClick}
                .selected=${this.gender}
            >
                ${genders.map(
                    (option) => html`
                        <sp-radio
                            value=${option.value}
                            label=${option.label}
                        ></sp-radio>
                    `
                )}
            </sp-radio-group>
        `;
    }
}
