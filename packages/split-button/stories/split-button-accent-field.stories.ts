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

import '@spectrum-web-components/split-button/sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { SplitButtonTypes } from '@spectrum-web-components/split-button/src/SplitButton.js';
import { ButtonVariants } from '@spectrum-web-components/button';

const variant = 'accent' as ButtonVariants;
const type = 'field' as SplitButtonTypes;

export default {
    title: 'Split Button/Accent/Field',
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

export const sOpen = (args: Properties): TemplateResult => splitbutton(args);
sOpen.args = { size: ElementSizes.s, open: true };

export const m = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
m.args = { size: ElementSizes.m };

export const mOpen = (args: Properties): TemplateResult => splitbutton(args);
mOpen.args = { size: ElementSizes.m, open: true };

export const l = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
l.args = { size: ElementSizes.l };

export const lOpen = (args: Properties): TemplateResult => splitbutton(args);
lOpen.args = { size: ElementSizes.l, open: true };

export const XL = (args: Properties): TemplateResult =>
    renderSplitButtonSet(args);
XL.args = { size: ElementSizes.xl };

export const XLOpen = (args: Properties): TemplateResult => splitbutton(args);
XLOpen.args = { size: ElementSizes.xl, open: true };
