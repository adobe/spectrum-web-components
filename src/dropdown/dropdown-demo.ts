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

import { defineCustomElements, MenuItem } from '../index.js';

import { Dropdown } from './dropdown';

export class DropdownDemo extends LitElement {
    public static is = 'sp-dropdown-demo';

    constructor() {
        super();

        defineCustomElements(Dropdown, MenuItem);
    }

    @property()
    public value = '';

    public onSelect(ev: CustomEvent) {
        this.value = ev.detail;
    }

    protected render() {
        return html`
            <sp-dropdown @dropdown-select=${this.onSelect}>
                <sp-menu-item ?select=${this.value === 'Apple sauce'}>
                    Apple sauce
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Barbeque'}>
                    Barbeque
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Cherry Coke'}>
                    Cherry Coke
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Dragon Fruit'}>
                    Dragon Fruit
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Eggnog'}>
                    Eggnog
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Fennel Seeds'}>
                    Fennel Seeds
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Guava Juice'}>
                    Guava Juice
                </sp-menu-item>
                <sp-menu-item ?select=${this.value === 'Hashbrowns'}>
                    Hashbrowns
                </sp-menu-item>
            </sp-dropdown>
        `;
    }
}
