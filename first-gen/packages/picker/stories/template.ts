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

import {
    ElementSize,
    html,
    type TemplateResult,
} from '@spectrum-web-components/base';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

import { spreadProps } from '../../../test/lit-helpers.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export interface StoryArgs {
    disabled?: boolean;
    invalid?: boolean;
    open?: boolean;
    quiet?: boolean;
    pending?: boolean;
    showText?: boolean;
    onChange?: (val: string) => void;
    [prop: string]: unknown;
    size?: ElementSize;
}

export const handleChange =
    ({ onChange }: StoryArgs) =>
    (event: Event): void => {
        const picker = event.target as Picker;
        if (onChange) onChange(picker.value);
    };

export const Template = (args: StoryArgs): TemplateResult => html`
    <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
        Where do you live?
    </sp-field-label>
    <sp-picker
        id="picker-1"
        @change=${handleChange(args)}
        label="Choose your neighborhood"
        ${spreadProps(args)}
    >
        <sp-menu-item value="option-1">Carol Gardens</sp-menu-item>
        <sp-menu-item value="option-2">Cobble Hill</sp-menu-item>
        <sp-menu-item value="option-3">Ft. Greene</sp-menu-item>
        <sp-menu-item value="option-4">Park Slope</sp-menu-item>
        <sp-menu-item disabled value="option-5">Prospect Park</sp-menu-item>
        <sp-menu-item value="option-6">Red Hook</sp-menu-item>
    </sp-picker>
`;
