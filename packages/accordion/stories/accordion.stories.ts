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
import { AccordionMarkup } from './';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    title: 'Accordion',
    component: 'sp-accordion',
    args: {
        open: false,
        size: 'm',
        density: undefined,
    },
    argTypes: {
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the second accordion item is open.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        density: {
            name: 'density',
            type: { name: 'string', required: false },
            description: 'The density at which to display accordion items.',
            table: {
                defaultValue: { summary: undefined },
            },
            control: {
                options: ['compact', 'spacious', undefined],
                type: 'select',
            },
        },
        size: {
            name: 'size',
            type: { name: 'string', required: false },
            description: 'The size at which to display accordion items.',
            table: {
                defaultValue: { summary: 'm' },
            },
            control: {
                options: ['s', 'm', 'l', 'xl'],
                type: 'select',
            },
        },
    },
};

type Properties = {
    allowMultiple?: boolean;
    disabled?: boolean;
    open?: boolean;
    density?: 'compact' | 'spacious' | undefined;
    size?: 's' | 'm' | 'l' | 'xl';
};

export const Default = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);

export const Open = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
Open.args = {
    open: true,
    allowMultiple: false,
    disabled: false,
};

export const AllowMultiple = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
AllowMultiple.args = {
    allowMultiple: true,
};

export const Disabled = (args?: Properties): TemplateResult =>
    AccordionMarkup(args);
Disabled.args = {
    disabled: true,
};
