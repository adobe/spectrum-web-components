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

// TODO: Field button should extend base button

import { html, LitElement, property } from 'lit-element';

import fieldButtonStyles from './field-button.css.js';

export class FieldButton extends LitElement {
    public static is = 'sp-field-button';

    public static get styles() {
        return [fieldButtonStyles];
    }

    @property()
    public label = '';

    @property({ type: Boolean, reflect: true })
    public select = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    protected render() {
        return html`
            <slot id="label"></slot>
            <slot name="icon"></slot>
        `;
    }
}
