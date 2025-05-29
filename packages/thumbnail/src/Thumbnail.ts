/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
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
export type ThumbnailSize = (typeof validSizes)[number];

const defaultSize = validSizes[6];

/**
 * @element sp-thumbnail
 *
 * @slot image - image element to present in the Thumbnail
 */

export class Thumbnail extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [opacityCheckerboardStyles, styles];
    }

    @property({ type: String, reflect: true })
    public background?: string;

    @property({ type: Boolean, reflect: true })
    public cover = false;

    @property({ type: Boolean, reflect: true })
    public layer = false;

    @property({ type: String, reflect: true })
    public get size(): ThumbnailSize {
        return this._size;
    }

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

    private _size = defaultSize;

    protected override update(changes: PropertyValues): void {
        if (!this.hasAttribute('size')) {
            this.setAttribute('size', this.size);
        }
        super.update(changes);
    }

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
