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
import { html, action } from '@open-wc/demoing-storybook';

import '../sp-checkbox.js';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-checkbox',
    title: 'Checkbox/Sizes',
};

const checkbox = ({
    size,
    checked,
    indeterminate,
}: {
    size: 's' | 'm' | 'l' | 'xl';
    checked?: boolean;
    indeterminate?: boolean;
}): TemplateResult => {
    return html`
        <sp-checkbox
            size=${size}
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            @click="${action('Click')}"
            @change="${action('Change')}"
        >
            Checkbox
        </sp-checkbox>
    `;
};

export const s = (): TemplateResult => checkbox({ size: 's' });

export const sChecked = (): TemplateResult =>
    checkbox({ size: 's', checked: true });

export const sIndeterminate = (): TemplateResult =>
    checkbox({ size: 's', indeterminate: true });

export const m = (): TemplateResult => checkbox({ size: 'm' });

export const mChecked = (): TemplateResult =>
    checkbox({ size: 'm', checked: true });

export const mIndeterminate = (): TemplateResult =>
    checkbox({ size: 'm', indeterminate: true });

export const l = (): TemplateResult => checkbox({ size: 'l' });

export const lChecked = (): TemplateResult =>
    checkbox({ size: 'l', checked: true });

export const lIndeterminate = (): TemplateResult =>
    checkbox({ size: 'l', indeterminate: true });

export const XL = (): TemplateResult => checkbox({ size: 'xl' });

export const XLChecked = (): TemplateResult =>
    checkbox({ size: 'xl', checked: true });

export const XLIndeterminate = (): TemplateResult =>
    checkbox({ size: 'xl', indeterminate: true });
