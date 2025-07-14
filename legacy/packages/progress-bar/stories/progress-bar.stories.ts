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

const makeOverBackground =
    (variant?: 'white' | 'black') =>
    (story: () => TemplateResult): TemplateResult => {
        const color =
            variant === 'black'
                ? 'rgb(181, 209, 211)'
                : 'var(--spectrum-seafoam-900)';
        return html`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
    };

export const staticWhite = (): TemplateResult => {
    return makeOverBackground('white')(
        () => html`
            <sp-progress-bar
                progress="50"
                static-color="white"
            ></sp-progress-bar>
        `
    );
};

export const staticWhiteLabel = (): TemplateResult => {
    return makeOverBackground('white')(
        () => html`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static-color="white"
            ></sp-progress-bar>
        `
    );
};

export const staticWhiteIndeterminate = (): TemplateResult => {
    return makeOverBackground('white')(
        () => html`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static-color="white"
            ></sp-progress-bar>
        `
    );
};

export const staticWhiteSideLabel = (): TemplateResult => {
    return makeOverBackground('white')(
        () => html`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static-color="white"
                side-label
            ></sp-progress-bar>
        `
    );
};

export const staticWhiteSideLabelIndeterminate = (): TemplateResult => {
    return makeOverBackground('white')(
        () => html`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static-color="white"
                side-label
            ></sp-progress-bar>
        `
    );
};
