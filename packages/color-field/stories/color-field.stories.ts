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
import '../sp-color-field.js';
import { Template } from './template.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field',
};

export const Default = (): TemplateResult => Template({});

export const Quiet = (): TemplateResult =>
    Template({
        quiet: true,
    });

export const ReadOnly = (): TemplateResult =>
    Template({
        readonly: true,
        value: 'rgb(255,255,255)',
    });

export const Disabled = (): TemplateResult =>
    Template({
        disabled: true,
    });

export const viewColor = (): TemplateResult =>
    Template({
        viewColor: true,
    });

export const WrongInput = (): TemplateResult =>
    Template({
        value: 'apple',
    });

export const RightInput = (): TemplateResult =>
    Template({
        value: '#a8323a',
    });
