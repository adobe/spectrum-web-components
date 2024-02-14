/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

export default {
    component: 'sp-textfield',
    title: 'Textarea/Sizes',
};

const template = ({
    size,
}: {
    size?: 's' | 'm' | 'l' | 'xl';
} = {}): TemplateResult => {
    return html`
        <sp-field-label for="name" size=${ifDefined(size)}>
            Enter your life story
        </sp-field-label>
        <sp-textfield
            id="name"
            multiline
            size=${ifDefined(size)}
            value="Sized Textarea"
        >
            <sp-help-text size=${ifDefined(size)} slot="help-text">
                Spare no expense.
            </sp-help-text>
        </sp-textfield>
    `;
};

export const s = (): TemplateResult => template({ size: 's' });
export const noSize = (): TemplateResult => template();
export const m = (): TemplateResult => template({ size: 'm' });
export const l = (): TemplateResult => template({ size: 'l' });
export const XL = (): TemplateResult => template({ size: 'xl' });
