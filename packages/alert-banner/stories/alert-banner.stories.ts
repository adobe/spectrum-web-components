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
import { AlertBannerMarkup } from './template.js';
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';

const meta: Meta<Properties> = {
    title: 'Alert Banner',
    component: 'sp-alert-banner',
    args,
    argTypes,
};

export const Default = (args: Properties): TemplateResult =>
    AlertBannerMarkup(args);

export const Info = Default.bind({});
Info.args = {
    variant: 'info',
    text: 'Your trial will expire in 3 days',
};

export const Negative = Default.bind({});
Negative.args = {
    variant: 'negative',
    text: 'Connection interrupted. Check your network to continue',
};

export const TextWrapping = (args: Properties): TemplateResult => html`
    <div style="max-width:800px;">
        ${AlertBannerMarkup({
            ...args,
            variant: 'negative',
            text: ` Your trial has expired. Please purchase to continue.
Your work has been saved and is ready for you to open again once
you have purchased the software.`,
            actionLabel: 'Purchase',
        })}
    </div>
`;

export const Multilanguage = Default.bind({});
Multilanguage.args = {
    variant: 'info',
    text: `ستنتهي الفترة التجريبية الخاصة بك في الأسبوع المقبل`,
    actionLabel: `اشتري الآن`,
};

export default meta;
