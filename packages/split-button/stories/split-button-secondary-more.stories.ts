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

import { ElementSizes, TemplateResult } from '@spectrum-web-components/base';
import { args, argTypes, renderSplitButtonSet, splitbutton } from './index.js';
import type { Properties } from './index.js';
import { openSplitButtonDecorator } from './helpers.js';
import './helpers.js';

import '@spectrum-web-components/split-button/sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

const variant = 'secondary';
const type = 'more';

export default {
    title: 'Split Button/Secondary/More',
    component: 'sp-split-button',
    args: {
        ...args,
        variant,
        type,
    },
    argTypes,
};

export const s = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
s.args = { size: ElementSizes.s };
export const m = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
m.args = { size: ElementSizes.m };
export const l = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
l.args = { size: ElementSizes.l };
export const XL = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
XL.args = { size: ElementSizes.xl };
export const open = (args: Properties): TemplateResult => splitbutton(args);
open.args = { open: true };
open.decorators = [openSplitButtonDecorator];
