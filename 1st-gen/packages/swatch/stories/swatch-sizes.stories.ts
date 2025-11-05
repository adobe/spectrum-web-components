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
    ElementSize,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/swatch/sp-swatch.js';

export default {
    title: 'Swatch/Sizes',
    component: 'sp-swatch',
};

const template = ({
    size,
    color = 'rgb(255 0 0 / 0.7)',
}: {
    size: ElementSize;
    color?: string;
}): TemplateResult => html`
    <div style="display: flex; gap: 5px;">
        <sp-swatch color=${color} size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="none" size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="full" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="light" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="none" size=${size}></sp-swatch>
        <sp-swatch nothing size=${size}></sp-swatch>
        <sp-swatch color=${color} shape="rectangle" size=${size}></sp-swatch>
        <sp-swatch
            color=${color}
            shape="rectangle"
            size=${size}
            disabled
        ></sp-swatch>
        <sp-swatch
            rounding="full"
            shape="rectangle"
            size=${size}
            mixed-value
        ></sp-swatch>
    </div>
`;

export const XS = (): TemplateResult => template({ size: 'xs' });

export const s = (): TemplateResult => template({ size: 's' });

export const m = (): TemplateResult => template({ size: 'm' });

export const l = (): TemplateResult => template({ size: 'l' });
