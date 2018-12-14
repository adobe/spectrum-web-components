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
import cardBaseStyles from './card-base.css.js';
// @ts-ignore - css generated at build time
import cardGalleryStyles from './card-gallery.css.js';
// @ts-ignore - css generated at build time
import cardQuietStyles from './card-quiet.css.js';

export class SpectrumGalleryCard extends HTMLElement {
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
    public get title(): string {
        return this.getAttribute('title') || '';
    }

    /**
     * Setter for type attribute
     */
    public set title(value: string) {
        if (value) {
            this.setAttribute('title', value);
        } else {
            this.removeAttribute('title');
        }
    }

    private render() {
        return `
            <style>
                ${cardBaseStyles}
                ${cardQuietStyles}
                ${cardGalleryStyles}
            </style>
            <slot name="cover-photo"></slot>
            <slot name="preview"></slot>
            <div id="body">
                <div id="header">
                    <div id="title">${this.title}</div>
                    <slot name="subtitle"></slot>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('spectrum-card-gallery')) {
    customElements.define('spectrum-card-gallery', SpectrumGalleryCard);
}
