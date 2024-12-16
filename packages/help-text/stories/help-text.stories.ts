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
import '@spectrum-web-components/help-text/sp-help-text.js';

export default {
    title: 'Help Text',
    component: 'sp-help-text',
    argTypes: {
        icon: {
            control: {
                type: 'boolean',
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
        },
        variant: {
            options: ['neutral', 'negative'],
        },
        size: {
            options: ['s', 'm', 'l', 'xl'],
        },
    },
    args: {
        size: 'm',
    },
};

interface Properties {
    content?: string;
    disabled?: boolean;
    icon?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    variant?: 'neutral' | 'negative';
}

const Template = (args: Properties): TemplateResult => html`
    <sp-help-text
        ?disabled=${args.disabled}
        ?icon=${args.icon}
        variant=${args.variant}
        size=${args.size}
    >
        ${args.content}
    </sp-help-text>
`;

export const neutral = (args: Properties = {}): TemplateResult =>
    Template({
        ...args,
        content: 'Passwords must be at least 8 characters.',
    });
neutral.args = {
    variant: 'neutral',
};

export const negative = (args: Properties = {}): TemplateResult =>
    Template({
        ...args,
        content: 'Create a password with at least 8 characters.',
    });
negative.args = {
    variant: 'negative',
};

export const negativeIcon = (args: Properties = {}): TemplateResult =>
    Template({
        ...args,
        content: 'Create a password with at least 8 characters.',
    });
negativeIcon.args = {
    icon: true,
    variant: 'negative',
};

export const disabled = (args: Properties = {}): TemplateResult =>
    Template({
        ...args,
        content: 'Passwords must be at least 8 characters.',
    });
disabled.args = {
    disabled: true,
    variant: 'neutral',
};
