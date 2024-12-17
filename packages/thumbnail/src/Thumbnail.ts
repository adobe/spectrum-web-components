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
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import opacityCheckerboardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';
import styles from './thumbnail.css.js';

/**
 * Array of valid sizes for the thumbnail component.
 */
const validSizes = [
    '50',
    '75',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000',
];

/**
 * Type representing the valid sizes for the thumbnail component.
 */
export type ThumbnailSize = (typeof validSizes)[number];

/**
 * Default size for the thumbnail component.
 */
const defaultSize = validSizes[6];

/**
 * The `Thumbnail` component is a custom web component that displays an image thumbnail.
 * It includes a slot for the image element to be presented within the thumbnail.
 *
 * @element sp-thumbnail
 *
 * @slot image - The image element to present in the Thumbnail.
 */
export class Thumbnail extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [opacityCheckerboardStyles, styles];
    }

    /**
     * The background color of the thumbnail.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: String, reflect: true })
    public background?: string;

    /**
     * Indicates whether the image should cover the thumbnail area.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public cover = false;

    /**
     * Indicates whether the thumbnail should display a layer effect.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public layer = false;

    /**
     * The size of the thumbnail.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: String, reflect: true })
    public get size(): ThumbnailSize {
        return this._size;
    }

    /**
     * Sets the size of the thumbnail.
     *
     * Validates the size to ensure it is one of the allowed values.
     * If the size is valid, it sets the attribute and updates the internal property.
     */
    public set size(value: ThumbnailSize) {
        const size = (
            validSizes.includes(value) ? value : defaultSize
        ) as ThumbnailSize;

        if (size) {
            this.setAttribute('size', `${size}`);
        }

        if (this._size === size) {
            return;
        }

        const oldSize = this._size;

        this._size = size;
        this.requestUpdate('size', oldSize);
    }

    /**
     * Internal property to store the size value.
     */
    private _size = defaultSize;

    /**
     * Lifecycle method called when the component updates.
     *
     * This method ensures the size attribute is set if it is not already present.
     */
    protected override update(changes: PropertyValues): void {
        if (!this.hasAttribute('size')) {
            this.setAttribute('size', this.size);
        }

        super.update(changes);
    }

    /**
     * Renders the content of the thumbnail component.
     *
     * This method returns a template result containing the appropriate wrapper
     * based on the background and layer properties.
     */
    protected override render(): TemplateResult {
        if (this.background) {
            return html`
                <div
                    class="opacity-checkerboard background"
                    style="background: ${this.background}"
                >
                    <div class="image-wrapper">
                        <slot></slot>
                    </div>
                </div>
            `;
        } else if (this.layer) {
            return html`
                <div class="opacity-checkerboard layer-inner">
                    <slot></slot>
                </div>
            `;
        } else {
            return html`
                <div class="opacity-checkerboard image-wrapper">
                    <slot></slot>
                </div>
            `;
        }
    }
}
