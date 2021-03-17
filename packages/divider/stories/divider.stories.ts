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

import '../sp-divider.js';
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
        <div
            style="height: var(--spectrum-global-dimension-size-400, 32px); display: flex;"
        >
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider vertical size="s"></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};

export const verticalMedium = (): TemplateResult => {
    return html`
        <div
            style="height: var(--spectrum-global-dimension-size-400, 32px); display: flex;"
        >
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider size="m" vertical></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};

export const verticalLarge = (): TemplateResult => {
    return html`
        <div
            style="height: var(--spectrum-global-dimension-size-400, 32px); display: flex;"
        >
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider size="l" vertical></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};
