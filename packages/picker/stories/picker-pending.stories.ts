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

import { TemplateResult } from '@spectrum-web-components/base';
import { argTypes } from './args';
import { Properties, Template } from './template';

export default {
    title: 'Picker/Pending',
    component: 'sp-picker',
    argTypes,
    args: {
        pending: true,
    },
};

export const S = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 's' }),
};

export const M = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'm' }),
};

export const L = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'l' }),
};

export const XL = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'xl' }),
};
