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

import '@spectrum-web-components/divider/sp-divider.js';
import './typography-decorator.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-align-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-align-right.js';

export default {
    title: 'Divider',
    decorators: [
        (story: () => TemplateResult): TemplateResult => html`
            <typography-decorator .story=${story()}></typography-decorator>
        `,
    ],
};

export const large = (): TemplateResult => {
    return html`
        <h2 class="spectrum-Heading spectrum-Heading--sizeM">Large</h2>
        <sp-divider size="l"></sp-divider>
        <p class="spectrum-Body">Page or Section Titles.</p>
    `;
};

export const medium = (): TemplateResult => {
    return html`
        <h3 class="spectrum-Heading spectrum-Heading--sizeS">Medium</h3>
        <sp-divider size="m"></sp-divider>
        <p class="spectrum-Body">
            Divide subsections, or divide different groups of elements (between
            panels, rails, etc.)
        </p>
    `;
};

export const small = (): TemplateResult => {
    return html`
        <h4 class="spectrum-Heading spectrum-Heading--sizeXS">Small</h4>
        <sp-divider size="s"></sp-divider>
        <p class="spectrum-Body">
            Divide like-elements (tables, tool groups, elements within a panel,
            etc.)
        </p>
    `;
};

export const verticalSmall = (): TemplateResult => {
    return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                vertical
                size="s"
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};

export const verticalMedium = (): TemplateResult => {
    return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                size="m"
                vertical
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};

export const verticalLarge = (): TemplateResult => {
    return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                size="l"
                vertical
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};

export const staticBlack = (): TemplateResult => {
    return html`
        <div
            style="background-color: var(--spectrum-docs-static-black-background-color); padding: 20px"
        >
            <h2
                class="spectrum-Heading spectrum-Heading--sizeS"
                style="color: var(--spectrum-black)"
            >
                Static black on light background
            </h2>
            <sp-divider static-color="black" size="m"></sp-divider>
            <p class="spectrum-Body" style="color: var(--spectrum-black)">
                Use static black on light color or image backgrounds.
            </p>
        </div>
    `;
};

export const staticWhite = (): TemplateResult => {
    return html`
        <div
            style="background-color: var(--spectrum-docs-static-white-background-color); padding: 20px;"
        >
            <h2
                class="spectrum-Heading spectrum-Heading--sizeS"
                style="color: var(--spectrum-white)"
            >
                Static white on dark background
            </h2>
            <sp-divider static-color="white" size="m"></sp-divider>
            <p class="spectrum-Body" style="color: var(--spectrum-white)">
                Use static white on dark color or image backgrounds.
            </p>
        </div>
    `;
};
