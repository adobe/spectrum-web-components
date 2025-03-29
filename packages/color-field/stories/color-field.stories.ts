/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/color-field/sp-color-field.js';
import { ColorFieldMarkup } from './template.js';
import { argTypes } from './args.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field',
    args: {
        label: '',
        size: 'm',
    },
    argTypes,
};

export interface Properties {
    quiet?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    viewColor?: boolean;
    value?: string;
    label?: string;
    size?: 's' | 'm' | 'l' | 'xl';
}

export const Default = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),
};

export const Quiet = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        quiet: true,
    },
};

export const ReadOnly = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        readonly: true,
        value: 'rgb(255,255,255)',
    },
};

export const Disabled = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        disabled: true,
    },
};

export const viewColor = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        viewColor: true,
        value: 'rgb(255,255,0)',
    },
};

export const WrongInput = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        value: 'apple',
    },
};

export const RightInput = {
    render: (args?: Properties): TemplateResult => ColorFieldMarkup(args),

    args: {
        value: '#a8323a',
    },
};
