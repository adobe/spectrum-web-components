/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult, when } from '@spectrum-web-components/base';

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';
import type { Properties } from './args.js';

export const Template = ({
    emphasized = false,
    variant,
    open = false,
    customStyles,
    content,
    tools,
}: Properties): TemplateResult => {
    return html`
        ${when(customStyles, () => html`<style>${customStyles}</style>`)}
        <sp-action-bar ?open=${open} ?emphasized=${emphasized} variant=${variant}>
            ${content}
            ${tools}
        </sp-action-bar>
    `;
};
