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

import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import {
    ifDefined,
    unsafeHTML,
} from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';

import '@spectrum-web-components/action-button/sp-action-button.js';

export interface Properties {
    active?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    staticColor?: 'white' | 'black';
    holdAffordance?: boolean;
    icon?: string;
    label?: string;
    [prop: string]: unknown;
    href: undefined;
}

export function renderButton({
    icon,
    label,
    ...properties
}: Properties): TemplateResult {
    return html`
        <sp-action-button
            href=${ifDefined(properties.href)}
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static-color="${ifDefined(properties.staticColor)}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            size=${properties.size || 'm'}
            ?hold-affordance=${!!properties.holdAffordance}
            ?active=${!!properties.active}
        >
            ${icon ? unsafeHTML(icon) : nothing}${label}
        </sp-action-button>
    `;
}

function renderGroup(properties: Properties): TemplateResult {
    const label = 'Edit';
    const holdAffordance = true;
    const icon = `<sp-icon-edit slot="icon"></sp-icon-edit>`;
    return html`
        <sp-action-group
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            size=${properties.size || 'm'}
            static-color="${ifDefined(properties.staticColor)}"
        >
            ${renderButton({
                ...properties,
                label,
            })}
            ${renderButton({
                ...properties,
                label,
                icon,
            })}
            ${renderButton({
                ...properties,
                icon,
            })}
            ${renderButton({
                ...properties,
                icon,
                holdAffordance,
            })}
        </sp-action-group>
    `;
}

export function renderButtons(properties: Properties): TemplateResult {
    return html`
        <div
            style="display: flex; flex-direction: column; gap: calc(var(--spectrum-spacing-100) * var(--swc-scale-factor));"
        >
            ${renderGroup(properties)}
            ${renderGroup({
                ...properties,
                selected: true,
            })}
            ${renderGroup({
                ...properties,
                disabled: true,
            })}
            ${renderGroup({
                ...properties,
                disabled: true,
                selected: true,
            })}
        </div>
    `;
}
