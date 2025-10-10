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
import '@spectrum-web-components/color-field/sp-color-field.js';
import { ColorFieldMarkup } from './template.js';
import { argTypes } from './args.js';
import { DEFAULT_COLOR, DEMO_COLORS } from './colors.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field',
    args: {
        label: '',
        size: 'm',
    },
    argTypes,
};

type Properties = {
    quiet?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    viewColor?: boolean;
    value?: string;
    label?: string;
    size?: 's' | 'm' | 'l' | 'xl';
};

export const Default = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);

export const Quiet = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);
Quiet.args = {
    quiet: true,
};

export const ReadOnly = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);
ReadOnly.args = {
    readonly: true,
    value: 'rgb(255,255,255)',
};

export const Disabled = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);
Disabled.args = {
    disabled: true,
};
export const viewColor = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);
viewColor.args = {
    viewColor: true,
    value: 'rgb(255,255,0)',
};
export const Multiple = (args?: Properties): TemplateResult => {
    return html`
        <div
            style="width: 20%; padding: 20px; margin: 10px; display: flex; flex-direction: column; gap: 16px; height: 200px; overflow-y: auto;"
        >
            ${DEMO_COLORS.map((color, index) =>
                ColorFieldMarkup({
                    ...args,
                    label: `Color ${index + 1}`,
                    value: color,
                    viewColor: true,
                })
            )}
        </div>
    `;
};

Multiple.args = {
    viewColor: true,
    value: DEFAULT_COLOR,
};

export const WrongInput = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);

WrongInput.args = {
    value: 'apple',
};
export const RightInput = (args?: Properties): TemplateResult =>
    ColorFieldMarkup(args);
RightInput.args = {
    value: '#a8323a',
};
