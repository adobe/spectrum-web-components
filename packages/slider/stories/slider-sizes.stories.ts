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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/slider/sp-slider.js';

export default {
    component: 'sp-slider',
    title: 'Slider/Sizes',
};

const template = ({
    editable,
    size,
}: {
    editable?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
} = {}): TemplateResult => {
    return html`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                ?editable=${editable}
                max="1"
                min="0"
                value=".5"
                step="0.01"
                size=${ifDefined(size)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};

export const s = (): TemplateResult => template({ size: 's' });
export const sEditable = (): TemplateResult =>
    template({ size: 's', editable: true });
export const m = (): TemplateResult => template();
export const mEditable = (): TemplateResult => template({ editable: true });
export const l = (): TemplateResult => template({ size: 'l' });
export const lEditable = (): TemplateResult =>
    template({ size: 'l', editable: true });
export const XL = (): TemplateResult => template({ size: 'xl' });
export const XLEditable = (): TemplateResult =>
    template({ size: 'xl', editable: true });
