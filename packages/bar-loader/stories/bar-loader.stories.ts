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

import '../sp-bar-loader.js';

export default {
    title: 'Bar Loader',
    component: 'sp-bar-loader',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-bar-loader progress="50"></sp-bar-loader>
    `;
};

export const label = (): TemplateResult => {
    return html`
        <sp-bar-loader label="Loading" progress="50"></sp-bar-loader>
    `;
};

export const labelSmall = (): TemplateResult => {
    return html`
        <sp-bar-loader label="Loading" progress="50" small></sp-bar-loader>
    `;
};

export const indeterminate = (): TemplateResult => {
    return html`
        <sp-bar-loader label="Loading" indeterminate></sp-bar-loader>
    `;
};

export const sideLabel = (): TemplateResult => {
    return html`
        <sp-bar-loader side-label label="Loading" progress="50"></sp-bar-loader>
    `;
};

export const sideIndeterminate = (): TemplateResult => {
    return html`
        <sp-bar-loader side-label label="Loading" indeterminate></sp-bar-loader>
    `;
};

const makeOverBackground = (story: TemplateResult): TemplateResult => html`
    <div
        style="background-color: rgb(15, 121, 125); color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block"
    >
        ${story}
    </div>
`;

export const overBackground = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-bar-loader progress="50" over-background></sp-bar-loader>
    `);
};

export const overBackgroundLabel = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-bar-loader
            label="Loading"
            progress="50"
            over-background
        ></sp-bar-loader>
    `);
};

export const overBackgroundIndeterminate = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-bar-loader
            label="Loading"
            indeterminate
            over-background
        ></sp-bar-loader>
    `);
};

export const overBackgroundSideLabel = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-bar-loader
            label="Loading"
            progress="50"
            over-background
            side-label
        ></sp-bar-loader>
    `);
};

export const overBackgroundSideLabelIndeterminate = (): TemplateResult => {
    return makeOverBackground(html`
        <sp-bar-loader
            label="Loading"
            indeterminate
            over-background
            side-label
        ></sp-bar-loader>
    `);
};
