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

import popoverStyles from './popover.css.js';

export class Popover extends LitElement {
    public static is = 'sp-popover';

    public static get styles() {
        return [popoverStyles];
    }

    @property()
    public type = '';

    @property({ type: Boolean, reflect: true })
    public get open() {
        return this._open;
    }

    public set open(value: boolean) {
        const oldValue = this.open;

        if (value) {
            this.focus();
        }

        this._open = value;
        this.requestUpdate('open', oldValue);
    }

    private _open = false;

    constructor() {
        super();

        this.addEventListener('blur', (event) => {
            //this.open = false;
        });
    }

    connectedCallback() {
        super.connectedCallback();
        //Make popover focusavle
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
    }

    protected render() {
        return html`
            <slot></slot>
        `;
    }
}
