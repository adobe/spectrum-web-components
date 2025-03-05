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

import type { Meta } from '@storybook/web-components';
import { TemplateResult } from '@spectrum-web-components/base';
import { renderTabsOverflowExample } from './index.js';
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';

const meta: Meta<Properties> = {
    title: 'Tabs Overflow/Sizes',
    component: 'sp-tabs-overflow',
    argTypes,
    args,
};

const Template = (args: Properties): TemplateResult => {
    return renderTabsOverflowExample(args);
};

export const s = Template.bind({});
s.args = {
    size: 's',
};
export const m = Template.bind({});
m.args = {
    size: 'm',
};
export const l = Template.bind({});
l.args = {
    size: 'l',
};
export const XL = Template.bind({});
XL.args = {
    size: 'xl',
};

export default meta;
