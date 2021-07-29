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
    SpectrumElement,
    property,
    CSSResultArray,
    TemplateResult,
    ifDefined,
    PropertyValues,
} from '@spectrum-web-components/base';

import avatarStyles from './avatar.css.js';

export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
const validSizes = [50, 75, 100, 200, 300, 400, 500, 600, 700];

/**
 * Avatar component
 */
export class Avatar extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [avatarStyles];
    }

    @property()
    public label = '';

    @property()
    public src = '';

    @property({ type: Number, reflect: true })
    public get size(): AvatarSize {
        return this._size || 100;
    }

    public set size(value: AvatarSize) {
        const defaultSize = 100;
        const size = value;
        const validSize = (validSizes.includes(size)
            ? size
            : defaultSize) as AvatarSize;
        if (validSize) {
            this.setAttribute('size', `${validSize}`);
        }
        if (this._size === validSize) {
            return;
        }
        const oldSize = this._size;
        this._size = validSize;
        this.requestUpdate('size', oldSize);
    }

    private _size: AvatarSize | null = 100;

    protected render(): TemplateResult {
        return html`
            <img alt=${ifDefined(this.label || undefined)} src=${this.src} />
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('size')) {
            this.setAttribute('size', `${this.size}`);
        }
    }
}
