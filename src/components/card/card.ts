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

// @ts-ignore - css generated at build time
import cardStyles from './card.css.js';

export class SpectrumCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.shadowRoot) {
            throw new Error('Failed to attach ShadowRoot!');
        }
        this.shadowRoot.innerHTML = this.render();
    }

    /**
     * Getter for type attribute
     */
    public get type(): string | null {
        return this.getAttribute('type');
    }

    /**
     * Setter for type attribute
     */
    public set type(value: string | null) {
        if (value) {
            this.setAttribute('type', value);
        } else {
            this.removeAttribute('type');
        }
    }

    private render() {
        return /* html */ `
            <style>
                ${cardStyles}
            </style>
            <slot name="cover-photo"></slot>
            <div id="body">
                <div id="header">
                    <slot name="title"></slot>
                </div>
                <div id="content">
                    <div id="subtitle"><slot name="subtitle"></slot></div>
                </div>
            </div>
            <div id="footer"><slot name="footer"></slot></div>
            <slot></slot>
        `;
    }
}

if (!customElements.get('spectrum-card')) {
    customElements.define('spectrum-card', SpectrumCard);
}
