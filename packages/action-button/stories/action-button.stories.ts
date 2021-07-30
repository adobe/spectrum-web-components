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
import { spreadProps } from '../../../test/lit-helpers.js';
import '@spectrum-web-components/action-group';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

import '../src';
import '../sp-action-button.js';

interface Properties {
    active?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    holdAffordance?: boolean;
    icon?: TemplateResult;
    label?: string;
    [prop: string]: any;
}

function renderButton(args: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!args.quiet}"
            ?emphasized="${!!args.emphasized}"
            ?disabled=${!!args.disabled}
            ?selected=${!!args.selected}
            ?toggles=${!!args.toggles}
            size=${args.size || 'm'}
        >
            Action
        </sp-action-button>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'Action Button',
};

function renderButtonsSelected(args: Properties): TemplateResult {
    const disabled = Object.assign({}, args, { disabled: true });
    const selected = Object.assign({}, args, { selected: true });
    return html`
        <sp-action-group>
            ${renderButton(args)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </sp-action-group>
    `;
}

export const emphasized = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
emphasized.args = {
    emphasized: true,
};

export const emphasizedAndQuiet = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
emphasizedAndQuiet.args = {
    emphasized: true,
    quiet: true,
};

export const quiet = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
quiet.args = {
    quiet: true,
};

export const toggles = (args: Properties): TemplateResult =>
    renderButtonsSelected(args);
toggles.args = {
    toggles: true,
};

export const wIconButton = (args: Properties): TemplateResult => {
    return html`
        <sp-action-button ${spreadProps(args)}>
            <sp-icon-edit slot="icon"></sp-icon-edit>
            This is an action button
        </sp-action-button>
    `;
};

wIconButton.story = {
    name: 'w/ Icon button',
};

export const iconOnlyButton = (args: Properties): TemplateResult => {
    return html`
        <sp-action-button label="Edit" ${spreadProps(args)}>
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
    `;
};

export const iconSizeOverridden = (): TemplateResult => {
    return html`
        <sp-action-button label="Edit" size="xl">
            <sp-icon-edit slot="icon" size="s"></sp-icon-edit>
        </sp-action-button>
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};

export const holdAffordance = ({
    holdAffordance,
}: Properties): TemplateResult => {
    return html`
        <sp-action-group>
            <sp-action-button label="Edit" ?hold-affordance=${holdAffordance}>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>

            <sp-action-button ?hold-affordance=${holdAffordance} quiet>
                <sp-icon-settings slot="icon"></sp-icon-settings>
            </sp-action-button>

            <sp-action-button ?hold-affordance=${holdAffordance} selected>
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-group>
    `;
};
holdAffordance.args = {
    holdAffordance: true,
};
