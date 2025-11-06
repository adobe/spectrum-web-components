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
import { thumbnail as image } from './images.js';

export default {
    title: 'Thumbnail/Sizes',
    component: 'sp-thumbnail',
};

const thumbnail = ({
    size,
}: {
    size:
        | '50'
        | '75'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | '1000';
}): TemplateResult => {
    return html`
        <sp-thumbnail size=${size}>
            <img src=${image} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const size50 = (): TemplateResult => thumbnail({ size: '50' });

export const size75 = (): TemplateResult => thumbnail({ size: '75' });

export const size100 = (): TemplateResult => thumbnail({ size: '100' });

export const size200 = (): TemplateResult => thumbnail({ size: '200' });

export const size300 = (): TemplateResult => thumbnail({ size: '300' });

export const size400 = (): TemplateResult => thumbnail({ size: '400' });

export const size500 = (): TemplateResult => thumbnail({ size: '500' });

export const size600 = (): TemplateResult => thumbnail({ size: '600' });

export const size700 = (): TemplateResult => thumbnail({ size: '700' });

export const size800 = (): TemplateResult => thumbnail({ size: '800' });

export const size900 = (): TemplateResult => thumbnail({ size: '900' });

export const size1000 = (): TemplateResult => thumbnail({ size: '1000' });
