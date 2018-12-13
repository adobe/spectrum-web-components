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
import cardQuietStyles from './card-quiet.css.js';
import cardStyles from './card.css.js';

const defaultTemplate = document.createElement('template');
const galleryTemplate = document.createElement('template');
const quietTemplate = document.createElement('template');
const baseTemplate = document.createElement('template');

baseTemplate.innerHTML = `
    <slot name="cover-photo"></slot>
    <slot name="preview"></slot>
    <div id="body">
        <div id="header">
            <slot name="title"></slot>
        </div>
        <div id="content">
            <div id="subtitle"><slot name="subtitle"></slot></div>
        </div>
    </div>
`;

defaultTemplate.innerHTML = `
    <style>
        ${cardStyles}
    </style>
    ${baseTemplate.innerHTML}
    <div id="footer"><slot name="footer"></slot></div>
`;

galleryTemplate.innerHTML = `
    <style>
        ${cardStyles}
        ${cardQuietStyles}
    </style>
    <slot name="cover-photo"></slot>
    <slot name="preview"></slot>
    <div id="body">
        <div id="header">
            <slot name="title"></slot>
            <slot name="subtitle"></slot>
            <slot name="description"></slot>
        </div>
    </div>
`;

quietTemplate.innerHTML = `
    <style>
        ${cardStyles}
        ${cardQuietStyles}
    </style>
    ${baseTemplate.innerHTML}
`;

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
        let template;

        switch (this.type) {
            case 'gallery':
                template = galleryTemplate;
                break;
            case 'quiet':
                template = quietTemplate;
                break;
            default:
                template = defaultTemplate;
        }

        return template.innerHTML;
    }
}

if (!customElements.get('spectrum-card')) {
    customElements.define('spectrum-card', SpectrumCard);
}
