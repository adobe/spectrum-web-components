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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import avatarStyles from './avatar.css.js';

export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
const validSizes: AvatarSize[] = [50, 75, 100, 200, 300, 400, 500, 600, 700];
const defaultSize = validSizes[2];

/**
 * @element sp-avatar
 */
export class Avatar extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [avatarStyles];
    }

    @property()
    public label = '';

    @property()
    public src = '';

    @property({ type: Number, reflect: true })
    public get size(): AvatarSize {
        return this._size;
    }

    public set size(value: AvatarSize) {
        const size = value;
        const validSize = (
            validSizes.includes(size) ? size : defaultSize
        ) as AvatarSize;
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

    private _size = defaultSize;

    protected override render(): TemplateResult {
        return html`
            <img
                class="image"
                alt=${ifDefined(this.label || undefined)}
                src=${this.src}
            />
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('size')) {
            this.setAttribute('size', `${this.size}`);
        }
    }
}
