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

import '@spectrum-web-components/progress-bar/sp-progress-bar.js';

export default {
    title: 'Progress Bar/Sizes',
    component: 'sp-progress-bar',
};

export const s = (): TemplateResult => {
    return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="s"
        ></sp-progress-bar>
    `;
};

export const m = (): TemplateResult => {
    return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="m"
        ></sp-progress-bar>
    `;
};

export const l = (): TemplateResult => {
    return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="l"
        ></sp-progress-bar>
    `;
};

export const XL = (): TemplateResult => {
    return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="xl"
        ></sp-progress-bar>
    `;
};
