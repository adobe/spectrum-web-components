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
import { Properties, renderButtonSet } from './index.js';
import { args, argTypes } from './index.js';

const variant = 'black';
const treatment = 'fill';
const pending = true;

export default {
    component: 'sp-button',
    title: 'Button/Black/Fill/Pending',
    args: {
        ...args,
        variant,
        treatment,
        pending,
    },
    argTypes,
};

export const s = {
    render: (args: Properties): TemplateResult => renderButtonSet(args),

    args: {
        size: 's',
    },
};

export const m = {
    render: (args: Properties): TemplateResult => renderButtonSet(args),

    args: {
        size: 'm',
    },
};

export const l = {
    render: (args: Properties): TemplateResult => renderButtonSet(args),

    args: {
        size: 'l',
    },
};

export const XL = {
    render: (args: Properties): TemplateResult => renderButtonSet(args),

    args: {
        size: 'xl',
    },
};
