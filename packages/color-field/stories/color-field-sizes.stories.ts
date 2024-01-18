/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

//import '@spectrum-web-components/color-field/sp-color-field.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

//import '../sp-color-field.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field/Sizes',
};

const template = ({
    size,
}: {
    size?: 's' | 'm' | 'l' | 'xl';
} = {}): TemplateResult => {
    return html`
        <sp-field-label for="name" size=${ifDefined(size)}>
            Enter your name
        </sp-field-label>
        <sp-color-field id="name" size=${ifDefined(size)} value="#f00">
            <sp-help-text size=${ifDefined(size)} slot="help-text">
                This is for the whole enchilada.
            </sp-help-text>
        </sp-color-field>
    `;
};

export const s = (): TemplateResult => template({ size: 's' });
export const noSize = (): TemplateResult => template();
export const m = (): TemplateResult => template({ size: 'm' });
export const l = (): TemplateResult => template({ size: 'l' });
export const XL = (): TemplateResult => template({ size: 'xl' });
