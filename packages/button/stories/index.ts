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
import { action } from '@open-wc/demoing-storybook';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../sp-button.js';
import '@spectrum-web-components/icon/sp-icon.js';

interface Properties {
    variant?: 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
    quiet?: boolean;
    content?: TemplateResult;
    disabled?: boolean;
    iconRight?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
}

export const makeOverBackground = (
    story: () => TemplateResult
): TemplateResult => html`
    <div
        style="background-color: var(--spectrum-global-color-seafoam-600); color: var(--spectrum-global-color-seafoam-600); padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250); display: inline-block"
    >
        ${story()}
    </div>
`;

export function renderButton(properties: Properties): TemplateResult {
    if (properties.variant) {
        return html`
            <sp-button
                variant="${properties.variant}"
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                ?icon-right=${properties.iconRight}
                @click=${action(`Click ${properties.variant}`)}
                size=${properties.size || 'm'}
                href=${ifDefined(properties.href)}
                target=${ifDefined(properties.target)}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    } else {
        return html`
            <sp-button
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                @click=${action(`Click ${properties.variant}`)}
                size=${properties.size}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    }
}

export function renderButtonSet(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, { disabled: true });
    return html`
        ${renderButton(properties)} ${renderButton(disabled)}
    `;
}

export const bellIcon = html`
    <svg slot="icon" viewBox="0 0 36 36" focusable="false" aria-hidden="true">
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
`;
