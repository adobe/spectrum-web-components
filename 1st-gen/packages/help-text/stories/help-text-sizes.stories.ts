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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/help-text/sp-help-text.js';

export default {
    title: 'Help Text/Sizes',
    component: 'sp-help-text',
};

export const s = (): TemplateResult => {
    return html`
        <sp-help-text size="s">
            Passwords must be at least 8 characters.
        </sp-help-text>
    `;
};

export const m = (): TemplateResult => {
    return html`
        <sp-help-text size="m">
            Passwords must be at least 8 characters.
        </sp-help-text>
    `;
};

export const l = (): TemplateResult => {
    return html`
        <sp-help-text size="l">
            Passwords must be at least 8 characters.
        </sp-help-text>
    `;
};

export const XL = (): TemplateResult => {
    return html`
        <sp-help-text size="xl">
            Passwords must be at least 8 characters.
        </sp-help-text>
    `;
};
