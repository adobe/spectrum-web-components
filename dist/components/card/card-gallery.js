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
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
import { html, LitElement, property } from '@polymer/lit-element';
// @ts-ignore - css generated at build time
import cardBaseStyles from './card-base.css.js';
// @ts-ignore - css generated at build time
import cardGalleryStyles from './card-gallery.css.js';
// @ts-ignore - css generated at build time
import cardQuietStyles from './card-quiet.css.js';
export class SpectrumGalleryCard extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.subtitle = '';
    }
    render() {
        return html`
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
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }
}
__decorate(
    [property({ type: String })],
    SpectrumGalleryCard.prototype,
    'title',
    void 0
);
__decorate(
    [property({ type: String })],
    SpectrumGalleryCard.prototype,
    'subtitle',
    void 0
);
if (!customElements.get('spectrum-card-gallery')) {
    customElements.define('spectrum-card-gallery', SpectrumGalleryCard);
}

//# sourceMappingURL=card-gallery.js.map
