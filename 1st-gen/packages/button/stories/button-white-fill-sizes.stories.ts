/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { TemplateResult } from '@spectrum-web-components/base';
import { makeOverBackground, Properties, renderButtonSet } from './index.js';
import { args, argTypes } from './index.js';

const variant = 'white';
const treatment = 'fill';

export default {
    component: 'sp-button',
    title: 'Button/White/Fill/Sizes',
    decorators: [makeOverBackground()],
    args: {
        ...args,
        variant,
        treatment,
    },
    argTypes,
};

export const s = (args: Properties): TemplateResult => renderButtonSet(args);
s.args = {
    size: 's',
};

export const m = (args: Properties): TemplateResult => renderButtonSet(args);
m.args = {
    size: 'm',
};

export const l = (args: Properties): TemplateResult => renderButtonSet(args);
l.args = {
    size: 'l',
};

export const XL = (args: Properties): TemplateResult => renderButtonSet(args);
XL.args = {
    size: 'xl',
};
