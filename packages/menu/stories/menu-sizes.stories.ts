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
import { MenuMarkup } from './';

export default {
    component: 'sp-menu',
    title: 'Menu/Sizes',
};

export const S = (): TemplateResult => MenuMarkup({ size: 's' });
export const M = (): TemplateResult => MenuMarkup({ size: 'm' });
export const L = (): TemplateResult => MenuMarkup({ size: 'l' });
export const XL = (): TemplateResult => MenuMarkup({ size: 'xl' });
