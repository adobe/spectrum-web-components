/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { TemplateResult } from '@spectrum-web-components/base';

import { argTypes, Properties, Template } from './index.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';

export default {
    title: 'Picker Button/Sizes',
    component: 'sp-picker-button',
    argTypes,
    tags: ['!dev'],
};

export const SizeS = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 's' },
};

export const SizeM = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'm' },
};

export const SizeL = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'l' },
};

export const SizeXL = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'xl' },
};

export const SizeSLabel = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 's', label: true },
};

export const SizeMLabel = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'm', label: true },
};

export const SizeLLabel = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'l', label: true },
};

export const SizeXLLabel = {
    render: (args: Properties): TemplateResult => Template(args),
    args: { size: 'xl', label: true },
};
