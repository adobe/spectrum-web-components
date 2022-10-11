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
    variant?: 'white' | 'black';
    holdAffordance?: boolean;
    icon?: TemplateResult;
    label?: string;
    [prop: string]: unknown;
}

export function renderButton(properties: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            variant="${ifDefined(properties.variant)}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            size=${properties.size || 'm'}
            ?hold-affordance=${!!properties.holdAffordance}
            ?active=${!!properties.active}
        >
            ${properties.icon}${properties.label}
        </sp-action-button>
    `;
}

function renderGroup(properties: Properties): TemplateResult {
    const label = 'Edit';
    const holdAffordance = true;
    const icon = html`
        <sp-icon-edit slot="icon"></sp-icon-edit>
    `;
    return html`
        <sp-action-group
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            size=${properties.size || 'm'}
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
    const selected = true;
    const disabled = true;
    return html`
        <div
            style="display: flex; flex-direction: column; gap: var(--spectrum-global-dimension-size-100);"
        >
            ${renderGroup({
                ...properties,
            })}
            ${renderGroup({
                ...properties,
                selected,
            })}
            ${renderGroup({
                ...properties,
                disabled,
            })}
            ${renderGroup({
                ...properties,
                disabled,
                selected,
            })}
        </div>
    `;
}
