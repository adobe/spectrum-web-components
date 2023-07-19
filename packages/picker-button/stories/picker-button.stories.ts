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

import { argTypes, StoryArgs, Template } from './index.js';
import '../sp-picker-button.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';

export default {
    title: 'Picker Button',
    component: 'sp-picker-button',
    ...argTypes,
};

export const active = (args: StoryArgs): TemplateResult => Template(args);
active.args = { active: true };

export const customIcon = (args: StoryArgs): TemplateResult => Template(args);
customIcon.args = {
    icon: html`
        <sp-icon-add
            slot="icon"
            class="spectrum-PickerButton-icon spectrum-Icon"
        ></sp-icon-add>
    `,
};

export const invalid = (args: StoryArgs): TemplateResult => Template(args);
invalid.args = { invalid: true };

export const label = (args: StoryArgs): TemplateResult => Template(args);
label.args = { label: true };

export const labelCustom = (args: StoryArgs): TemplateResult => Template(args);
labelCustom.args = { label: 'Some' };

export const open = (args: StoryArgs): TemplateResult => Template(args);
open.args = { open: true };

export const positionLeft = (args: StoryArgs): TemplateResult => Template(args);
positionLeft.args = { position: 'left' };

export const positionRight = (args: StoryArgs): TemplateResult =>
    Template(args);
positionRight.args = { position: 'right' };

export const rounded = (args: StoryArgs): TemplateResult => Template(args);
rounded.args = { rounded: true };

export const roundedLabel = (args: StoryArgs): TemplateResult => Template(args);
roundedLabel.args = {
    label: true,
    rounded: true,
};
