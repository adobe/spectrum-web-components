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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import {
    landscape as landscapeImage,
    portrait as portraitImage,
    thumbnail,
} from './images.js';

export default {
    title: 'Thumbnail',
    component: 'sp-thumbnail',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-thumbnail>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const focused = (): TemplateResult => {
    return html`
        <sp-thumbnail focused>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const disabled = (): TemplateResult => {
    return html`
        <sp-thumbnail disabled>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const portrait = (): TemplateResult => {
    return html`
        <sp-thumbnail>
            <img src=${portraitImage} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};

export const landscape = (): TemplateResult => {
    return html`
        <sp-thumbnail>
            <img
                src=${landscapeImage}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};

export const layerSelected = (): TemplateResult => {
    return html`
        <sp-thumbnail layer selected>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const layer = (): TemplateResult => {
    return html`
        <sp-thumbnail layer>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const portraitCover = (): TemplateResult => {
    return html`
        <sp-thumbnail cover>
            <img src=${portraitImage} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};

export const landscapeCover = (): TemplateResult => {
    return html`
        <sp-thumbnail cover>
            <img
                src=${landscapeImage}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};

export const background = (): TemplateResult => {
    return html`
        <sp-thumbnail background="orange">
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
