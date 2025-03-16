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

import { isOverlayOpen } from '../../overlay/stories/index.js';
import { Template } from './template.js';
import { Properties } from './index.js';

export default {
    title: 'Combobox/Sizes',
    component: 'sp-combobox',
    tags: ['!dev'],
};

export const s = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 's' }),
};

export const sOpen = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, open: true, size: 's' }),

    decorators: [isOverlayOpen],
};

export const m = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'm' }),
};

export const mOpen = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, open: true, size: 'm' }),

    decorators: [isOverlayOpen],
};

export const l = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'l' }),
};

export const lOpen = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, open: true, size: 'l' }),

    decorators: [isOverlayOpen],
};

export const xL = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, size: 'xl' }),
};

export const XLOpen = {
    render: (args: Properties): TemplateResult =>
        Template({ ...args, open: true, size: 'xl' }),

    decorators: [isOverlayOpen],
};
