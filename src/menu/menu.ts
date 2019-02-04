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

import {
    defineCustomElements,
    MenuItem,
    IMenuItemEventDetail,
} from '../index.js';

import menuStyles from './menu.css.js';

export class Menu extends LitElement {
    public static is = 'sp-menu';

    public static get styles() {
        return [menuStyles];
    }

    constructor() {
        super();

        defineCustomElements(MenuItem);
    }

    @property()
    public type = '';

    @property({ type: Boolean, reflect: true })
    public open = '';

    @property()
    public value = '';

    public onClick(ev: CustomEvent<IMenuItemEventDetail>) {
        this.value = ev.detail;
    }

    protected render() {
        return html`
            <ul id="container">
                <slot @click=${this.onClick}></slot>
            </ul>
        `;
    }
}
