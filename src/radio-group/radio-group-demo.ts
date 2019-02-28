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

import { html, LitElement } from 'lit-element';

import { defineCustomElements, Radio } from '../index.js';

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

    constructor() {
        super();

        defineCustomElements(Radio, RadioGroup);
    }

    protected render() {
        return html`
            <sp-radio-group name="pet">
                ${
                    pets.map(
                        (option) => html`
                            <sp-radio
                                value=${option.value}
                                label=${option.label}
                            ></sp-radio>
                        `
                    )
                }
            </sp-radio-group>
            <sp-radio-group name="gender">
                ${
                    genders.map(
                        (option) => html`
                            <sp-radio
                                value=${option.value}
                                label=${option.label}
                            ></sp-radio>
                        `
                    )
                }
            </sp-radio-group>
        `;
    }
}
