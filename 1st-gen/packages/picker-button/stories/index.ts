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

import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import {
    ifDefined,
    unsafeHTML,
} from '@spectrum-web-components/base/src/directives.js';

export type StoryArgs = {
    active: boolean;
    icon?: string | undefined;
    invalid: boolean;
    label: boolean | string;
    open: boolean;
    position?: 'right' | 'left';
    quiet: boolean;
    rounded: boolean;
    size: 's' | 'm' | 'l' | 'xl';
};

export const Template = ({
    active,
    icon,
    invalid,
    label,
    open,
    position,
    quiet,
    rounded,
    size,
}: StoryArgs): TemplateResult => {
    return html`
        <sp-picker-button
            ?active=${active}
            ?invalid=${invalid}
            ?open=${open}
            position=${ifDefined(position)}
            ?quiet=${quiet}
            ?rounded=${rounded}
            size=${size}
        >
            ${icon ? unsafeHTML(icon) : nothing}
            ${label
                ? html`
                      <span slot="label">
                          ${typeof label === 'string' ? label : 'All'}
                      </span>
                  `
                : nothing}
        </sp-picker-button>
    `;
};

export const argTypes = {
    argTypes: {
        open: {
            control: {
                type: 'boolean',
            },
        },
        position: {
            control: {
                type: 'inline-radio',
                options: ['right', 'left'],
            },
        },
        quiet: {
            control: {
                type: 'boolean',
            },
        },
        size: {
            control: {
                type: 'inline-radio',
                options: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};
