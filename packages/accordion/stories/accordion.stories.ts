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

import type { Meta } from '@storybook/web-components';
import { TemplateResult } from '@spectrum-web-components/base';
import { AccordionMarkup } from './template';
import type { Properties } from './args';
import { args, argTypes } from './args';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/link/sp-link.js';

const meta: Meta<Properties> = {
    title: 'Accordion',
    component: 'sp-accordion',
    argTypes,
    args,
};

export const Default = (args?: Properties): TemplateResult => AccordionMarkup(args);

export const Open = Default.bind({});
Open.args = {
    open: true,
    allowMultiple: false,
    disabled: false,
};

export const AllowMultiple = Default.bind({});
AllowMultiple.args = {
    allowMultiple: true,
};

export const Disabled = Default.bind({});
Disabled.args = {
    disabled: true,
};

export default meta;
