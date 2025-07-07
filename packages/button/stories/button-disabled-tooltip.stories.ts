/*
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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

interface StoryArgs {
    disabledReason?: string;
    variant?: 'accent' | 'primary' | 'secondary' | 'negative';
    treatment?: 'fill' | 'outline';
}

export default {
    title: 'Button/Disabled with Tooltip',
    component: 'sp-button',
    argTypes: {
        disabledReason: { control: 'text' },
        variant: {
            control: {
                type: 'select',
                options: ['accent', 'primary', 'secondary', 'negative'],
            },
        },
        treatment: {
            control: {
                type: 'select',
                options: ['fill', 'outline'],
            },
        },
    },
    args: {
        disabledReason:
            'This button is disabled because required fields are missing',
        variant: 'primary',
        treatment: 'fill',
    },
    parameters: {
        actions: {
            handles: ['click'],
        },
    },
};

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
                <!-- Regular disabled button -->
                <sp-button
                    disabled
                    variant=${ifDefined(args.variant)}
                    treatment=${ifDefined(args.treatment)}
                >
                    Regular Disabled
                </sp-button>

                <!-- Disabled button with tooltip -->
                <sp-button
                    disabled-reason=${ifDefined(args.disabledReason)}
                    variant=${ifDefined(args.variant)}
                    treatment=${ifDefined(args.treatment)}
                >
                    Disabled with Tooltip
                </sp-button>
            </div>
            <p>
                <em>
                    Try tabbing to the buttons. The second button will show a
                    tooltip when focused.
                </em>
            </p>
        </div>
    `;
};

export const FocusExample = (): TemplateResult => {
    return html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
                <sp-button>Regular Button</sp-button>

                <sp-button
                    disabled-reason="This button requires additional permissions"
                >
                    Focusable Disabled
                </sp-button>

                <sp-button disabled>Regular Disabled</sp-button>
            </div>
            <p>
                <em>Tab order demonstration:</em>
                <br />
                1. Regular Button (focusable)
                <br />
                2. Disabled with Tooltip (focusable, shows tooltip)
                <br />
                3. Regular Disabled (not focusable)
            </p>
        </div>
    `;
};
