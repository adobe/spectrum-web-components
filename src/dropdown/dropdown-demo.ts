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

import { defineCustomElements, MenuItem } from '../index.js';

import { Dropdown } from './dropdown';

const options = [
    { id: 'apple-sauce', label: 'Apple Sauce' },
    { id: 'banana', label: 'Banana' },
    { id: 'cherry-coke', label: 'Cherry Coke' },
    { id: 'dragon-fruit', label: 'Dragon Fruit' },
    { id: 'eggnog', label: 'Eggnog' },
    { id: 'fennel-seeds', label: 'Fennel Seeds' },
    { id: 'guava-juice', label: 'Guava Juice' },
    { id: 'apple-sauce-2', label: 'Apple Sauce' },
    { id: 'banana-2', label: 'Banana' },
    { id: 'cherry-coke-2', label: 'Cherry Coke' },
    { id: 'dragon-fruit-2', label: 'Dragon Fruit' },
    { id: 'eggnog-2', label: 'Eggnog' },
    { id: 'fennel-seeds-2', label: 'Fennel Seeds' },
    { id: 'guava-juice-2', label: 'Guava Juice' },
    { id: 'apple-sauce-3', label: 'Apple Sauce' },
    { id: 'banana-3', label: 'Banana' },
    { id: 'cherry-coke-3', label: 'Cherry Coke' },
    { id: 'dragon-fruit-3', label: 'Dragon Fruit' },
    { id: 'eggnog-3', label: 'Eggnog' },
    { id: 'fennel-seeds-3', label: 'Fennel Seeds' },
    { id: 'guava-juice-3', label: 'Guava Juice' },
];

export class DropdownDemo extends LitElement {
    public static is = 'sp-dropdown-demo';

    constructor() {
        super();

        defineCustomElements(Dropdown, MenuItem);
    }

    @property({ type: Boolean, reflect: true })
    public quiet = '';

    @property({ type: Boolean, reflect: true })
    public icon = '';

    @property({ type: Number, reflect: true })
    public count = options.length;

    @property()
    public value = '';

    @property()
    public label = '';

    public onSelect(ev: CustomEvent) {
        const target = ev.target as Element;

        if (target) {
            const value = target.getAttribute('data-id');
            const label = target.getAttribute('label');

            if (value) {
                this.value = value;
            }

            if (label) {
                this.label = label;
            }
        }
    }

    protected render() {
        const itemTemplates: Array<TemplateResult> = [];

        options.slice(0, this.count).forEach((option) => {
            const iconId = Math.floor(Math.random() * 100);
            const itemTemplate = html`
                <sp-menu-item
                    data-id=${option.id}
                    label=${option.label}
                    ?select=${this.value === option.id}
                >
                    ${option.label}
                    ${
                        this.icon
                            ? html`
                                  <img
                                      slot="icon"
                                      src="https://picsum.photos/20/20?id=${
                                          iconId
                                      }"
                                  />
                              `
                            : html``
                    }
                </sp-menu-item>
            `;
            itemTemplates.push(itemTemplate);
        });

        return html`
            <sp-dropdown .label=${this.label} ?quiet=${this.quiet}>
                <sp-menu @click=${this.onSelect}>${itemTemplates}</sp-menu>
            </sp-dropdown>
        `;
    }
}
