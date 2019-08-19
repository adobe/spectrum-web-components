/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import cardStyles from './card.css';

/**
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot description - A description of the card
 * @slot footer - Footer text
 */
export class Card extends LitElement {
    @property({ reflect: true })
    public variant: 'default' | 'gallery' | 'quiet' = 'default';

    public static get styles(): CSSResultArray {
        return [cardStyles];
    }

    @property()
    public title = '';

    @property()
    public subtitle = '';

    protected renderGallery(): TemplateResult {
        return html`
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

    protected renderQuiet(): TemplateResult {
        return html`
            <slot name="preview"></slot>
            <div id="body">
                <div id="header"><div id="title">${this.title}</div></div>
                <div id="content">
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }

    protected renderDefault(): TemplateResult {
        return html`
            <slot name="cover-photo" id="cover-photo"></slot>
            <div id="body">
                <div id="header">
                    <div id="title">${this.title}</div>
                </div>
                <div id="content">
                    <div id="subtitle">${this.subtitle}</div>
                </div>
            </div>
            <div id="footer"><slot name="footer"></slot></div>
        `;
    }

    protected render(): TemplateResult {
        switch (this.variant) {
            case 'gallery':
                return this.renderGallery();
            case 'quiet':
                return this.renderQuiet();
            default:
                return this.renderDefault();
        }
    }
}
