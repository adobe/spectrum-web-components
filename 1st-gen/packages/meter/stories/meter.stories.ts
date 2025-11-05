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

import '@spectrum-web-components/meter/sp-meter.js';

export default {
    title: 'Meter',
    component: 'sp-meter',
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
                    padding: var(--spectrum-font-size-100) var(--spectrum-font-size-400);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
    };

export const sideLabel = (): TemplateResult => {
    return html`
        <sp-meter side-label progress="50">Storage Space</sp-meter>
    `;
};

export const negative = (): TemplateResult => {
    return html`
        <sp-meter variant="negative" progress="95">Storage Space</sp-meter>
    `;
};

export const notice = (): TemplateResult => {
    return html`
        <sp-meter variant="notice" progress="73">Storage Space</sp-meter>
    `;
};

export const positive = (): TemplateResult => {
    return html`
        <sp-meter variant="positive" progress="50">Storage Space</sp-meter>
    `;
};

export const staticWhite = (): TemplateResult => {
    return makeOverBackground('white')(
        (): TemplateResult => html`
            <sp-meter static-color="white" progress="50">
                Storage Space
            </sp-meter>
        `
    );
};
