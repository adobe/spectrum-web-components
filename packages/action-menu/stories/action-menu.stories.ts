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
import { TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenuMarkup } from './';
import { Story } from '../../../.storybook/types';

import { SettingsIcon } from '@spectrum-web-components/icons-workflow';

export default {
    component: 'sp-action-menu',
    title: 'Action menu',
    argTypes: {
        ariaLabel: { control: 'string' },
        visibleLabel: { control: 'string' },
        disabled: { control: 'boolean' },
        changeHandler: { action: 'change' },
    },
    args: {
        ariaLabel: 'More actions',
        visibleLabel: 'More Actions',
        disabled: false,
    },
};

interface StoryArgs {
    ariaLabel: string;
    visibleLabel: string;
    disabled: boolean;
    customIcon?: string | TemplateResult;
}

const Template: Story<StoryArgs> = (args) => ActionMenuMarkup(args);

export const Default = Template.bind({});

export const iconOnly = Template.bind({});

export const customIcon: (args: StoryArgs) => TemplateResult = (args) =>
    Template({ ...args, customIcon: SettingsIcon() });
