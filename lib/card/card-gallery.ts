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

// @ts-ignore - css generated at build time
import cardBaseStyles from './card-base.css.js';
// @ts-ignore - css generated at build time
import cardGalleryStyles from './card-gallery.css.js';
// @ts-ignore - css generated at build time
import cardQuietStyles from './card-quiet.css.js';

export class CardGallery extends LitElement {
    public static is = 'sp-card-gallery';

    public static get styles() {
        return [cardBaseStyles, cardQuietStyles];
    }

    @property()
    public title = '';

    @property()
    public subtitle = '';

    protected render() {
        return html`
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
