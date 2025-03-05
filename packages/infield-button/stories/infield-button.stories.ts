/*
Copyright 2023 Adobe. All rights reserved.
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

import {
    chevronDown,
    chevronUp,
    Template,
} from './index.js';
import {
    args,
    argTypes,
    Properties,
} from './args.js';

const meta: Meta<Properties> = {
    title: 'Infield Button',
    component: 'sp-infield-button',
    argTypes,
    args,
};

export const Default = (args: Properties): TemplateResult => Template(args);
export const disabled = (args: Properties): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
};

export const inlineStart = (args: Properties): TemplateResult => Template(args);
inlineStart.args = {
    inline: 'start',
};

export const inlineEnd = (args: Properties): TemplateResult => Template(args);
inlineEnd.args = {
    inline: 'end',
};

export const stacked = (): TemplateResult => html`
    ${Template({
        block: 'start',
        content: chevronUp,
        label: 'Increase',
    })}
    ${Template({
        block: 'end',
        content: chevronDown,
        label: 'Decrease',
    })}
`;

export const quiet = (args: Properties): TemplateResult => Template(args);
quiet.args = {
    quiet: true,
};

export default meta;
