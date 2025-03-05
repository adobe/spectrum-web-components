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

import '@spectrum-web-components/infield-button/sp-infield-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    chevronStyles.styleSheet as CSSStyleSheet,
];

export const Template = ({
    block,
    content,
    disabled,
    inline,
    label,
    size,
    quiet,
}: Properties): TemplateResult => {
    return html`
        <sp-infield-button
            block=${ifDefined(block)}
            ?disabled=${disabled}
            inline=${ifDefined(inline)}
            label=${ifDefined(label)}
            size=${ifDefined(size)}
            ?quiet=${quiet}
        >
            ${content
                ? content()
                : html`
                      <sp-icon-add></sp-icon-add>
                  `}
        </sp-infield-button>
    `;
};

export const chevronUp = (): TemplateResult => html`
    <sp-icon-chevron75 class="spectrum-UIIcon-ChevronUp75"></sp-icon-chevron75>
`;
export const chevronDown = (): TemplateResult => html`
    <sp-icon-chevron75
        class="spectrum-UIIcon-ChevronDown75"
    ></sp-icon-chevron75>
`;
