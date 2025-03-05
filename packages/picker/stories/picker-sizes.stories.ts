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

import { Properties } from '../../action-menu/stories/action-menu.stories';
import type { Meta } from '@storybook/web-components';
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/picker/sp-picker.js';
import { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { argTypes } from './args';
import type { Properties } from './args';

const meta: Meta<Properties> = {
    title: 'Picker/Sizes',
    component: 'sp-picker',
    argTypes,
};

const picker = ({
    onChange,
    open,
    size,
    pending,
    invalid,
}: Properties): TemplateResult => {
    return html`
        <sp-field-label for="picker-${size}" size=${size}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-${size}"
            size=${size}
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                onChange(picker.value);
            }}"
            label="Select a Country with a very long label, too long, in fact"
            ?pending="${pending}"
            ?invalid="${invalid}"
            ?open=${open}
        >
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};

export const s = (args: Properties): TemplateResult =>
    picker({ ...args, size: 's' });

export const sOpen = (args: Properties): TemplateResult =>
    picker({ ...args, open: true, size: 's' });

export const m = (args: Properties): TemplateResult =>
    picker({ ...args, size: 'm' });

export const mOpen = (args: Properties): TemplateResult =>
    picker({ ...args, open: true, size: 'm' });

export const l = (args: Properties): TemplateResult =>
    picker({ ...args, size: 'l' });

export const lOpen = (args: Properties): TemplateResult =>
    picker({ ...args, open: true, size: 'l' });

export const XL = (args: Properties): TemplateResult =>
    picker({ ...args, size: 'xl' });

export const XLOpen = (args: Properties): TemplateResult =>
    picker({ ...args, open: true, size: 'xl' });

export default meta;
