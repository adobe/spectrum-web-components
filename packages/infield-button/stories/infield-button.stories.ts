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
import { html, TemplateResult } from '@spectrum-web-components/base';

import {
    args,
    argTypes,
    chevronDown,
    chevronUp,
    Properties,
    Template,
} from './index.js';

export default {
    title: 'Infield Button',
    component: 'sp-infield-button',
    argTypes,
    args,
};

export const Default = {
    render: (args: Properties): TemplateResult => Template(args),
};

export const disabled = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        disabled: true,
    },
};

export const inlineStart = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        inline: 'start',
    },
};

export const inlineEnd = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        inline: 'end',
    },
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

export const quiet = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        quiet: true,
    },
};
