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

import { TemplateResult } from '@spectrum-web-components/base';
import { argTypes } from './args';
import { StoryArgs, Template } from './template';

export default {
    title: 'Picker/Pending',
    component: 'sp-picker',
    argTypes,
    args: {
        pending: true,
    },
};

export const S = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 's' });

export const M = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'm' });

export const L = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'l' });

export const XL = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'xl' });
