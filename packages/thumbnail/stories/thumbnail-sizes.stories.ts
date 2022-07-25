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
    size: 'xxs' | 'xs' | 's' | 'm' | 'l';
}): TemplateResult => {
    return html`
        <sp-thumbnail size=${size}>
            <img src=${image} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};

export const XXS = (): TemplateResult => thumbnail({ size: 'xxs' });

export const XS = (): TemplateResult => thumbnail({ size: 'xs' });

export const s = (): TemplateResult => thumbnail({ size: 's' });

export const m = (): TemplateResult => thumbnail({ size: 'm' });

export const l = (): TemplateResult => thumbnail({ size: 'l' });
