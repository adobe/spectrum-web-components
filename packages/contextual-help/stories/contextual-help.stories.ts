/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { Meta } from '@storybook/web-components';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { argTypes, Properties } from './args.js';
import { Template } from './template.js';

const meta: Meta<Properties> = {
    title: 'Contextual Help',
    component: 'sp-contextual-help',
    args: {
        label: '',
        variant: 'info',
        placement: undefined,
    },
    argTypes,
};

export const Default = (args?: Properties): TemplateResult => Template(args);
Default.args = {
    open: true,
};

export const Help = (args?: Properties): TemplateResult => Template(args);
Help.args = {
    variant: 'help',
    open: true,
};

export const CustomPlacement = (args?: Properties): TemplateResult => {
    return html`
        <div
            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"
        >
            ${Template(args)}
        </div>
    `;
};

CustomPlacement.args = {
    placement: 'top',
    open: true,
};

export default meta;
