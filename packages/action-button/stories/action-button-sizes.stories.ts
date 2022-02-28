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
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import type { Properties } from './index.js';

import '../src';
import '../sp-action-button.js';

function renderButton(properties: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
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

function renderButtonsSelected(properties: Properties): TemplateResult {
    const icon = html`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `;
    const label = 'Edit';
    const emphasized = true;
    const holdAffordance = true;
    const quiet = true;
    const selected = true;
    const disabled = true;
    const disabledArgs = Object.assign({}, properties, { disabled: true });
    const selectedArgs = Object.assign({}, properties, { selected: true });
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
                ...properties,
                icon,
                quiet,
                disabled,
            })}
            ${renderButton({
                ...properties,
                icon,
                quiet,
                disabled,
                selected,
            })}
            ${renderButton({
                ...selectedArgs,
                icon,
            })}
            ${renderButton({
                ...selectedArgs,
                emphasized,
                icon,
            })}
            ${renderButton({
                ...disabledArgs,
                icon,
            })}
        </div>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'Action Button/Sizes',
};

export const s = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
s.args = {
    size: 's',
};

export const m = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
m.args = {
    size: 'm',
};

export const l = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
l.args = {
    size: 'l',
};

export const XL = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
XL.args = {
    size: 'xl',
};
