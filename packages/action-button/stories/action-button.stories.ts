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
import {
    EditIcon,
    MoreIcon,
    SettingsIcon,
} from '@spectrum-web-components/icons-workflow';

import '../';
import '../sp-action-button.js';

interface Properties {
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
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
        >
            Action
        </sp-action-button>
    `;
}

function renderButtonsSelected(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, { disabled: true });
    const selected = Object.assign({}, properties, { selected: true });
    return html`
        <div>
            ${renderButton(properties)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </div>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'ActionButton',
};

export const Default = (): TemplateResult => {
    return renderButtonsSelected({
        quiet: false,
        disabled: false,
        selected: false,
    });
};

export const emphasized = (): TemplateResult => {
    return renderButtonsSelected({
        emphasized: true,
        disabled: false,
        selected: false,
    });
};

export const emphasizedAndQuiet = (): TemplateResult => {
    return renderButtonsSelected({
        emphasized: true,
        quiet: true,
        disabled: false,
        selected: false,
    });
};

export const quiet = (): TemplateResult => {
    return renderButtonsSelected({
        quiet: true,
        disabled: false,
        selected: false,
    });
};

export const toggles = (): TemplateResult => {
    return renderButtonsSelected({
        toggles: true,
    });
};

export const wIconButton = (): TemplateResult => {
    return html`
        <sp-action-button>
            <sp-icon slot="icon">
                ${EditIcon({ hidden: true })}
            </sp-icon>
            This is an action button
        </sp-action-button>
    `;
};

wIconButton.story = {
    name: 'w/ Icon button',
};

export const iconOnlyButton = (): TemplateResult => {
    return html`
        <sp-action-button label="Edit">
            <sp-icon slot="icon">
                ${EditIcon({ hidden: true })}
            </sp-icon>
        </sp-action-button>
    `;
};

export const holdAffordance = (): TemplateResult => {
    return html`
        <sp-action-group>
            <sp-action-button label="Edit" hold-affordance>
                <sp-icon slot="icon">
                    ${EditIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>

            <sp-action-button hold-affordance quiet>
                <sp-icon slot="icon">
                    ${SettingsIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>

            <sp-action-button hold-affordance selected>
                <sp-icon slot="icon">
                    ${MoreIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
        </sp-action-group>
    `;
};
