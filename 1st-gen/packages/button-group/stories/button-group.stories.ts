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

import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icon/sp-icon.js';

export default {
    title: 'Button Group',
    component: 'sp-button-group',
};

export interface Properties {
    size?: 's' | 'm' | 'l' | 'xl';
}

interface Story<T> {
    (args: T): TemplateResult;
    args: Partial<T>;
    argTypes?: Record<string, unknown>;
}

export const buttons: Story<Properties> = (
    args: Properties
): TemplateResult => {
    return html`
        <sp-button-group size=${args.size || 'm'}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttons.args = {
    size: 'm',
};

export const buttonsVertical: Story<Properties> = (
    args: Properties
): TemplateResult => {
    return html`
        <sp-button-group vertical size=${args.size || 'm'}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttonsVertical.args = {
    size: 'm',
};
