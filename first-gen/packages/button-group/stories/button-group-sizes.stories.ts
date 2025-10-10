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

import {
    buttons,
    buttonsVertical,
    Properties,
} from './button-group.stories.js';

export default {
    title: 'Button Group/Sizes',
    component: 'sp-button-group',
};

export const s = (args: Properties): TemplateResult => buttons(args);
s.args = { size: 's' };

export const m = (args: Properties): TemplateResult => buttons(args);
m.args = { size: 'm' };

export const l = (args: Properties): TemplateResult => buttons(args);
l.args = { size: 'l' };

export const XL = (args: Properties): TemplateResult => buttons(args);
XL.args = { size: 'XL' };

export const verticalS = (args: Properties): TemplateResult =>
    buttonsVertical(args);
verticalS.args = { size: 's' };

export const verticalM = (args: Properties): TemplateResult =>
    buttonsVertical(args);
verticalM.args = { size: 'm' };

export const verticalL = (args: Properties): TemplateResult =>
    buttonsVertical(args);
verticalL.args = { size: 'l' };

export const verticalXL = (args: Properties): TemplateResult =>
    buttonsVertical(args);
verticalXL.args = { size: 'XL' };
