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
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import type { Properties } from './index.js';
import { renderButton } from './index.js';

import '@spectrum-web-components/action-button/sp-action-button.js';

export default {
    component: 'sp-action-button',
    title: 'Action Button',
};

function renderButtonsSelected(args: Properties): TemplateResult {
    return html`
        <sp-action-group
            ?emphasized="${!!args.emphasized}"
            ?quiet="${!!args.quiet}"
        >
            ${renderButton(args)} ${renderButton({ ...args, selected: true })}
            ${renderButton({ ...args, disabled: true })}
        </sp-action-group>
    `;
}

export const toggles = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
toggles.args = {
    toggles: true,
    icon: `<sp-icon-edit hidden slot="icon"></sp-icon-edit>`,
};

export const href = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
href.args = {
    href: 'https://github.com/adobe/spectrum-web-components',
    icon: `<sp-icon-edit hidden slot="icon"></sp-icon-edit>`,
};

export const hrefWithTarget = (): TemplateResult => html`
    <sp-action-button
        href="https://github.com/adobe/spectrum-web-components"
        target="_blank"
    >
        Click me
    </sp-action-button>
`;
