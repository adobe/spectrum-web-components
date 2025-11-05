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

import '@spectrum-web-components/number-field/sp-number-field.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

export default {
    component: 'sp-number-field',
    title: 'Number Field/Sizes',
};

const template = ({
    size,
}: {
    size?: 's' | 'm' | 'l' | 'xl';
} = {}): TemplateResult => {
    return html`
        <sp-number-field size=${ifDefined(size)} value="100">
            Pick a number
        </sp-number-field>
    `;
};

export const s = (): TemplateResult => template({ size: 's' });
export const noSize = (): TemplateResult => template();
export const m = (): TemplateResult => template({ size: 'm' });
export const l = (): TemplateResult => template({ size: 'l' });
export const XL = (): TemplateResult => template({ size: 'xl' });
