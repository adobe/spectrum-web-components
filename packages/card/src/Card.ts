/*
Copyright 2020 Adobe. All rights reserved.
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
    PropertyValues,
} from 'lit-element';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';

import cardStyles from './card.css.js';

/**
 * @slot preview - This is the preview image for Gallery Cards
 * @slot title - HTML content to be listed as the title
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot description - A description of the card
 * @slot footer - Footer text
 */
export class Card extends FocusVisiblePolyfillMixin(LitElement) {
    public static get styles(): CSSResultArray {
        return [cardStyles];
    }

    @property({ reflect: true })
    public variant: 'default' | 'gallery' | 'quiet' = 'default';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property()
    public title = '';

    @property()
    public subtitle = '';

    protected get renderTitle(): TemplateResult {
        return html`
            <div id="title">
                <slot name="title">
                    ${this.title}
                </slot>
            </div>
        `;
    }

    protected get renderPreviewImage(): TemplateResult {
        return html`
            <div id="preview">
                <slot name="preview"></slot>
            </div>
        `;
    }

    protected renderGallery(): TemplateResult {
        return html`
            ${this.renderPreviewImage}
            <div id="body">
                <div id="header">
                    ${this.renderTitle}
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }

    protected renderQuiet(): TemplateResult {
        return html`
            ${this.renderPreviewImage}
            <div id="body">
                <div id="header">
                    ${this.renderTitle}
                </div>
                <div id="content">
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }

    protected renderDefault(): TemplateResult {
        return html`
            <div id="cover-photo">
                <slot name="cover-photo"></slot>
            </div>
            <div id="body">
                <div id="header">
                    ${this.renderTitle}
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

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'figure');
        this.tabIndex = 0;
    }
}
