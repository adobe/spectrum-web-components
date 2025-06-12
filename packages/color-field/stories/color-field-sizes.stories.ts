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

import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import { ColorFieldMarkup } from './template.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field/Sizes',
};

export const s = (): TemplateResult => ColorFieldMarkup({ size: 's' });
export const m = (): TemplateResult => ColorFieldMarkup({ size: 'm' });
export const l = (): TemplateResult => ColorFieldMarkup({ size: 'l' });
export const xl = (): TemplateResult => ColorFieldMarkup({ size: 'xl' });
