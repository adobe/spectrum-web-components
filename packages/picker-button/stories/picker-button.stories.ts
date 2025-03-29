/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';

import { argTypes, Properties, Template } from './index.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';

export default {
    title: 'Picker Button',
    component: 'sp-picker-button',
    ...argTypes,
};

export const Active = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { active: true },
};

export const CustomIcon = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        icon: html`
            <sp-icon-add
                slot="icon"
                class="spectrum-PickerButton-icon spectrum-Icon"
            ></sp-icon-add>
        `,
    },
};

export const Invalid = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { invalid: true },
};

export const Quiet = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { label: true, quiet: true },
};

export const Label = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { label: true },
};

export const LabelCustom = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { label: 'Some' },
};

export const Open = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { open: true },
};

export const PositionLeft = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { position: 'left' },
};

export const PositionRight = {
    render: (args: Properties): TemplateResult => Template(args),

    args: { position: 'right' },
};

export const Rounded = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { rounded: true },
};

export const RoundedLabel = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        label: true,
        rounded: true,
    },
};
