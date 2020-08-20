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

import { html, select } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import '../sp-rule.js';
import './typography-decorator.js';
import '@spectrum-web-components/button/sp-action-button.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    AlignLeftIcon,
    AlignRightIcon,
} from '@spectrum-web-components/icons-workflow';

export default {
    title: 'Rule',
    decorators: [
        (story: () => TemplateResult): TemplateResult => html`
            <typography-decorator .story=${story()}></typography-decorator>
        `,
    ],
};

export const large = (): TemplateResult => {
    const size = select(
        'Size',
        ['small', 'medium', 'large'],
        'large',
        'Element'
    );
    return html`
        <h2 class="spectrum-Heading--subtitle1">Large</h2>
        <sp-rule size=${size}></sp-rule>
        <p class="spectrum-Body">Page or Section Titles.</p>
    `;
};

export const medium = (): TemplateResult => {
    const size = select(
        'Size',
        ['small', 'medium', 'large'],
        'medium',
        'Element'
    );
    return html`
        <h3 class="spectrum-Heading--subtitle2">Medium</h3>
        <sp-rule size=${size}></sp-rule>
        <p class="spectrum-Body">
            Divide subsections, or divide different groups of elements (between
            panels, rails, etc.)
        </p>
    `;
};

export const small = (): TemplateResult => {
    const size = select(
        'Size',
        ['small', 'medium', 'large'],
        'small',
        'Element'
    );
    return html`
        <h4 class="spectrum-Heading--subtitle3">Small</h4>
        <sp-rule size=${size}></sp-rule>
        <p class="spectrum-Body">
            Divide like-elements (tables, tool groups, elements within a panel,
            etc.)
        </p>
    `;
};

export const verticalSmall = (): TemplateResult => {
    const size = select('Size', ['small', 'medium'], 'small', 'Element');
    return html`
        <div style="height: 32px; display: flex;">
            <sp-action-button quiet>
                <sp-icon slot="icon">
                    ${AlignLeftIcon()}
                </sp-icon>
            </sp-action-button>
            <sp-rule size=${size} vertical></sp-rule>
            <sp-action-button quiet>
                <sp-icon slot="icon">
                    ${AlignRightIcon()}
                </sp-icon>
            </sp-action-button>
        </div>
    `;
};

export const verticalMedium = (): TemplateResult => {
    const size = select('Size', ['small', 'medium'], 'medium', 'Element');
    return html`
        <div style="height: 32px; display: flex;">
            <sp-action-button quiet>
                <sp-icon slot="icon">
                    ${AlignLeftIcon()}
                </sp-icon>
            </sp-action-button>
            <sp-rule size=${size} vertical></sp-rule>
            <sp-action-button quiet>
                <sp-icon slot="icon">
                    ${AlignRightIcon()}
                </sp-icon>
            </sp-action-button>
        </div>
    `;
};
