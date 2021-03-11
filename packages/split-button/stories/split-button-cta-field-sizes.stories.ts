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
import { renderSplitButtonSet } from './index.js';

import '../sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Split Button/CTA/Field/Sizes',
    component: 'sp-split-button',
};

const variant = 'cta';
const type = 'field';

export const s = (): TemplateResult =>
    renderSplitButtonSet({ size: 's', variant, type });
export const m = (): TemplateResult =>
    renderSplitButtonSet({ size: 'm', variant, type });
export const l = (): TemplateResult =>
    renderSplitButtonSet({ size: 'l', variant, type });
export const XL = (): TemplateResult =>
    renderSplitButtonSet({ size: 'xl', variant, type });
