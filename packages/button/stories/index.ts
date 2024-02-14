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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import {
    ButtonTreatments,
    ButtonVariants,
} from '@spectrum-web-components/button/src/Button.js';

import type { Properties } from './template.js';
export type { Properties };

export const args = {
    disabled: false,
    variant: 'cta',
    pending: false,
};

export const argTypes = {
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
                'accent',
                'primary',
                'secondary',
                'negative',
                'overBackground',
                'black',
                'white',
            ],
        },
    },
    treatment: {
        name: 'treatment',
        type: { name: 'string', required: false },
        description: 'The visual treatment to apply to the button.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'fill' },
        },
        control: {
            type: 'inline-radio',
            options: ['fill', 'outline'],
        },
    },
    pending: {
        name: 'pending',
        type: { name: 'boolean', required: false },
        description: 'Shows the pending state of the button.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
};

export const makeOverBackground =
    (variant?: 'white' | 'black') =>
    (story: () => TemplateResult): TemplateResult => {
        const color =
            variant === 'black'
                ? 'rgb(181, 209, 211)'
                : 'var(--spectrum-global-color-seafoam-600)';
        return html`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    color: ${color};
                    padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
    };

export function renderButton(properties: Properties): TemplateResult {
    if (properties.variant) {
        return html`
            <sp-button
                variant="${properties.variant}"
                treatment="${properties.treatment}"
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                size=${properties.size || 'm'}
                href=${ifDefined(properties.href)}
                target=${ifDefined(properties.target)}
                ?warning=${properties.warning}
                ?pending=${!!properties.pending}
                ?icon-only=${properties.iconOnly}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    } else {
        return html`
            <sp-button
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                size=${properties.size}
                ?pending=${!!properties.pending}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    }
}

export function renderButtonSet(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, { disabled: true });
    const icon = Object.assign({}, properties, {
        content: html`
            <sp-icon-help slot="icon"></sp-icon-help>
            Click Me
        `,
    });
    return html`
        ${renderButton(properties)} ${renderButton(disabled)}
        ${renderButton(icon)}
    `;
}

export function renderIconButtonSet(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, {
        iconOnly: true,
        disabled: true,
    });
    const iconOnly = Object.assign({}, properties, {
        iconOnly: true,
        content: html`
            <sp-icon-help slot="icon"></sp-icon-help>
        `,
    });
    return html`
        ${renderButton(iconOnly)} ${renderButton(disabled)}
    `;
}

export const bellIcon = html`
    <svg slot="icon" viewBox="0 0 36 36" focusable="false" aria-hidden="true">
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
`;

export const renderWithIcon = (props: Properties): TemplateResult => {
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

export const renderWithIconOnly = (props: Properties): TemplateResult => {
    return html`
        ${renderIconButtonSet({
            ...props,
            content: html`
                <sp-icon-help slot="icon"></sp-icon-help>
            `,
        })}
    `;
};

export const renderIconSizeOverridden = (
    variant: ButtonVariants,
    treatment: ButtonTreatments
): TemplateResult => {
    return html`
        <sp-button
            label="Edit"
            size="xl"
            variant=${variant}
            treatment=${treatment}
        >
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

export const renderMinWidthButton = (props: Properties): TemplateResult => {
    return html`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet(props)}
    `;
};

const href = 'https://github.com/adobe/spectrum-web-components';

export const renderLink = (props: Properties): TemplateResult =>
    renderButtonSet({
        ...props,
        href,
    });

export const renderLinkWithTarget = (props: Properties): TemplateResult =>
    renderButtonSet({
        ...props,
        href,
        target: '_blank',
    });
