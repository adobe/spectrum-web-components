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

import '@spectrum-web-components/color-handle/sp-color-handle.js';

export default {
    title: 'Color/Handle',
    component: 'sp-color-handle',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-color-handle
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};

export const disabled = (): TemplateResult => {
    return html`
        <sp-color-handle
            disabled
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};

export const open = (): TemplateResult => {
    return html`
        <sp-color-handle
            open
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
