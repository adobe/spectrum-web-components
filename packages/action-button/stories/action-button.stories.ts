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
    const disabled = Object.assign({}, args, { disabled: true });
    const selected = Object.assign({}, args, { selected: true });
    return html`
        <sp-action-group
            ?emphasized="${!!args.emphasized}"
            ?quiet="${!!args.quiet}"
        >
            ${renderButton(args)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </sp-action-group>
    `;
}

export const toggles = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
toggles.args = {
    toggles: true,
    icon: html`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `,
};

export const iconSizeOverridden = (args: Properties): TemplateResult => {
    return html`
        ${renderButton(args)}
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};
iconSizeOverridden.args = {
    label: '',
    size: 'xl',
    icon: html`
        <sp-icon-edit slot="icon" size="s"></sp-icon-edit>
    `,
};
