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
import buttonStyles from './button.css.js';

export class SpectrumButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.shadowRoot) {
            throw new Error('Failed to attach ShadowRoot!');
        }
        this.shadowRoot.innerHTML = this.render();
    }

    /**
     * Getter for variant attribute
     */
    public get variant(): string | null {
        return this.getAttribute('variant');
    }

    /**
     * Setter for variant attribute
     */
    public set variant(value: string | null) {
        if (value) {
            this.setAttribute('variant', value);
        } else {
            this.removeAttribute('variant');
        }
    }

    protected render() {
        return /* html */ `
            <style>
                ${buttonStyles}
            </style>
            <div id="icon"><slot name="icon"></slot></div>
            <div id="label"><slot></slot></div>
        `;
    }
}

if (!customElements.get('spectrum-button')) {
    customElements.define('spectrum-button', SpectrumButton);
}
