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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-progress-bar.js';

export default {
    title: 'Progress Bar',
    component: 'sp-progress-bar',
};

export const label = (): TemplateResult => {
    return html`
        <sp-progress-bar label="Loading" progress="50"></sp-progress-bar>
    `;
};

export const indeterminate = (): TemplateResult => {
    return html`
        <sp-progress-bar label="Loading" indeterminate></sp-progress-bar>
    `;
};

export const sideLabel = (): TemplateResult => {
    return html`
        <sp-progress-bar
            side-label
            label="Loading"
            progress="50"
        ></sp-progress-bar>
    `;
};

export const sideIndeterminate = (): TemplateResult => {
    return html`
        <sp-progress-bar
            side-label
            label="Loading"
            indeterminate
        ></sp-progress-bar>
    `;
};

const makeOverBackground = (story: TemplateResult): TemplateResult => html`
    <div
        style="background-color: var(--spectrum-global-color-seafoam-600); color: var(--spectrum-global-color-seafoam-600); padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250); display: inline-block"
    >
        ${story}
    </div>
`;

export const overBackground = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-progress-bar progress="50" over-background></sp-progress-bar>
    `);
};

export const overBackgroundLabel = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            over-background
        ></sp-progress-bar>
    `);
};

export const overBackgroundIndeterminate = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-progress-bar
            label="Loading"
            indeterminate
            over-background
        ></sp-progress-bar>
    `);
};

export const overBackgroundSideLabel = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            over-background
            side-label
        ></sp-progress-bar>
    `);
};

export const overBackgroundSideLabelIndeterminate = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-progress-bar
            label="Loading"
            indeterminate
            over-background
            side-label
        ></sp-progress-bar>
    `);
};
