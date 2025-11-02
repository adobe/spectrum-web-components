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

import '@spectrum-web-components/checkbox/sp-checkbox.js';

export default {
    component: 'sp-checkbox',
    title: 'Checkbox/Sizes',
    argTypes: {
        onClick: { action: 'click' },
        onChange: { action: 'change' },
    },
};

const checkbox = ({
    size,
    checked,
    indeterminate,
    onClick,
    onChange,
}: {
    size: 's' | 'm' | 'l' | 'xl';
    checked?: boolean;
    indeterminate?: boolean;
    onClick: () => void;
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-checkbox
            size=${size}
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            @click="${onClick}"
            @change="${onChange}"
        >
            Checkbox
        </sp-checkbox>
    `;
};

type StoryArgs = {
    onClick: () => void;
    onChange: () => void;
};

export const s = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 's' });

export const sChecked = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 's', checked: true });

export const sIndeterminate = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 's', indeterminate: true });

export const m = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'm' });

export const mChecked = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'm', checked: true });

export const mIndeterminate = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'm', indeterminate: true });

export const l = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'l' });

export const lChecked = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'l', checked: true });

export const lIndeterminate = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'l', indeterminate: true });

export const XL = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'xl' });

export const XLChecked = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'xl', checked: true });

export const XLIndeterminate = (args: StoryArgs): TemplateResult =>
    checkbox({ ...args, size: 'xl', indeterminate: true });
