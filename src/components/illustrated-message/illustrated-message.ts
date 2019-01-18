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

import { html, LitElement, property } from '@polymer/lit-element';

// @ts-ignore - css generated at build time
import messageStyles from './illustrated-message.css.js';

export class IllustratedMessage extends LitElement {
    @property({ type: String })
    public heading = '';

    @property({ type: String })
    public description = '';

    protected render() {
        return html`
            <style>
                ${messageStyles}
            </style>
            <slot></slot>
            <div id="heading">${this.heading}</div>
            <div id="description">${this.description}</div>
        `;
    }
}

if (!customElements.get('illustrated-message')) {
    customElements.define('illustrated-message', IllustratedMessage);
}
