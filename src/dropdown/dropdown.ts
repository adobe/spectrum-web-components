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

import { defineCustomElements, FieldButton, Popover, Menu } from '../index.js';

import dropdownSkinStyles from './dropdown-skin.css.js';
import dropdownStyles from './dropdown.css.js';

export class Dropdown extends LitElement {
    public static is = 'sp-dropdown';

    public static get styles() {
        return [dropdownStyles, dropdownSkinStyles];
    }

    constructor() {
        super();

        defineCustomElements(FieldButton, Popover, Menu);
    }

    @property()
    public type = '';

    @property()
    public options = '';

    @property()
    public value = '';

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property()
    public placeholder = 'Select an option';

    public onClick(ev: Event) {
        this.active = !this.active;
    }

    public onSelect(ev: CustomEvent) {
        this.value = ev.detail;
        this.active = false;
    }

    public onBlur(ev: Event) {
        this.active = false;
    }

    protected render() {
        return html`
            <sp-field-button
                ?select=${this.active}
                ?quiet=${this.quiet}
                @click=${this.onClick}
            >
                <div id="label" ?is-placeholder=${!this.value.length}>
                    ${this.label}
                </div>
                <svg slot="icon" id="chevron">
                    <use xlink:href="dropdown-icon.svg#icon" />
                </svg>
            </sp-field-button>
            <sp-popover ?open=${this.active} @blur=${this.onBlur}>
                <sp-menu @click=${this.onSelect}><slot></slot></sp-menu>
            </sp-popover>
        `;
    }

    private get label(): string {
        if (!this.value.length) {
            return this.placeholder;
        }
        return this.value;
    }
}
