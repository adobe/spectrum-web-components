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
import { html, action } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icon/sp-icon.js';
import { EditIcon } from '@spectrum-web-components/icons-workflow';

import '../src';
import '../sp-action-button.js';

interface Properties {
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    holdAffordance?: boolean;
    icon?: TemplateResult;
    label?: string;
}

function renderButton(properties: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            @click=${action(`Action`)}
            size=${properties.size || 'm'}
            ?hold-affordance=${!!properties.holdAffordance}
        >
            ${properties.icon}${properties.label}
        </sp-action-button>
    `;
}

function renderButtonsSelected(properties: Properties): TemplateResult {
    const icon = html`
        <sp-icon slot="icon">
            ${EditIcon({ hidden: true })}
        </sp-icon>
    `;
    const label = 'Edit';
    const emphasized = true;
    const holdAffordance = true;
    const quiet = true;
    const disabled = Object.assign({}, properties, { disabled: true });
    const selected = Object.assign({}, properties, { selected: true });
    return html`
        <div>
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
            ${renderButton({
                ...properties,
                icon,
                quiet,
            })}
            ${renderButton({
                ...selected,
                icon,
            })}
            ${renderButton({
                ...selected,
                emphasized,
                icon,
            })}
            ${renderButton({
                ...disabled,
                icon,
            })}
        </div>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'Action Button/Sizes',
};

export const s = (): TemplateResult => {
    return renderButtonsSelected({
        size: 's',
    });
};

export const m = (): TemplateResult => {
    return renderButtonsSelected({
        size: 'm',
    });
};

export const l = (): TemplateResult => {
    return renderButtonsSelected({
        size: 'l',
    });
};

export const XL = (): TemplateResult => {
    return renderButtonsSelected({
        size: 'xl',
    });
};
