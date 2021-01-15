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
import { renderButtonSet, bellIcon } from './index.js';
import { HelpIcon } from '@spectrum-web-components/icons-workflow';

export default {
    component: 'sp-button',
    title: 'Button/Warning',
};

const variant = 'negative';

export const quiet = (): TemplateResult =>
    renderButtonSet({
        variant,
        quiet: true,
    });

export const withIcon = (): TemplateResult => {
    return html`
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${renderButtonSet({
                variant,
                content: html`
                    <sp-icon slot="icon">
                        ${HelpIcon({ hidden: true })}
                    </sp-icon>
                    Help
                `,
            })}
        </div>
        <div class="row">
            ${renderButtonSet({
                variant,
                content: html`
                    ${bellIcon} Custom SVG
                `,
            })}
        </div>
    `;
};

export const iconSizeOverridden = (): TemplateResult => {
    return html`
        <sp-button label="Edit" size="xl" variant=${variant}>
            <sp-icon slot="icon" size="s">
                ${HelpIcon({ hidden: true })} Testing
            </sp-icon>
        </sp-button>
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};

export const minWidthButton = (): TemplateResult => {
    return html`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet({
            variant,
        })}
    `;
};

minWidthButton.story = {
    name: 'min-width',
};

const href = 'https://github.com/adobe/spectrum-web-components';

export const link = (): TemplateResult =>
    renderButtonSet({
        variant,
        href,
    });

link.story = {
    name: 'href',
};

export const linkWithTarget = (): TemplateResult =>
    renderButtonSet({
        variant,
        href,
        target: '_blank',
    });

linkWithTarget.story = {
    name: 'href with target="_blank"',
};
