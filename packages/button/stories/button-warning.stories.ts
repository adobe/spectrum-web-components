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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';

export default {
    component: 'sp-button',
    title: 'Button/Warning',
    args: {
        disabled: false,
        quiet: false,
        variant: 'negative',
    },
    argTypes: {
        disabled: {
            name: 'disabled',
            type: { name: 'boolean', required: false },
            description:
                'Disable this control. It will not receive focus or events.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        variant: {
            name: 'variant',
            type: { name: 'string', required: false },
            description: 'The visual variant to apply to the button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'cta' },
            },
            control: {
                type: 'inline-radio',
                options: [
                    'cta',
                    'primary',
                    'secondary',
                    'negative',
                    'overBackground',
                ],
            },
        },
    },
};

const variant = 'negative';

interface Properties {
    content?: TemplateResult;
    disabled?: boolean;
    quiet?: boolean;
    variant?: 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
}

export const Default = (props: Properties): TemplateResult =>
    renderButtonSet(props);

export const quiet = (props: Properties): TemplateResult =>
    renderButtonSet(props);
quiet.args = {
    quiet: true,
};

export const withIcon = (props: Properties): TemplateResult => {
    return html`
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${renderButtonSet({
                ...props,
                content: html`
                    <sp-icon-help slot="icon"></sp-icon-help>
                    Help
                `,
            })}
        </div>
        <div class="row">
            ${renderButtonSet({
                ...props,
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
            <sp-icon-help slot="icon" size="s">Testing</sp-icon-help>
        </sp-button>
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};

export const minWidthButton = (props: Properties): TemplateResult => {
    return html`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet(props)}
    `;
};
minWidthButton.story = {
    name: 'min-width',
};

const href = 'https://github.com/adobe/spectrum-web-components';

export const link = (props: Properties): TemplateResult =>
    renderButtonSet({
        ...props,
        href,
    });
link.story = {
    name: 'href',
};

export const linkWithTarget = (props: Properties): TemplateResult =>
    renderButtonSet({
        ...props,
        href,
        target: '_blank',
    });
linkWithTarget.story = {
    name: 'href with target="_blank"',
};
