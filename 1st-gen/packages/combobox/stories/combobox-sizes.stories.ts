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

import { isOverlayOpen } from '../../overlay/stories/index.js';
import { Template } from './template.js';
import { StoryArgs } from './index.js';

export default {
    title: 'Combobox/Sizes',
    component: 'sp-combobox',
};

export const s = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 's' });

export const sOpen = (args: StoryArgs): TemplateResult =>
    Template({ ...args, open: true, size: 's' });
sOpen.decorators = [isOverlayOpen];

export const m = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'm' });

export const mOpen = (args: StoryArgs): TemplateResult =>
    Template({ ...args, open: true, size: 'm' });
mOpen.decorators = [isOverlayOpen];

export const l = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'l' });

export const lOpen = (args: StoryArgs): TemplateResult =>
    Template({ ...args, open: true, size: 'l' });
lOpen.decorators = [isOverlayOpen];

export const xL = (args: StoryArgs): TemplateResult =>
    Template({ ...args, size: 'xl' });

export const XLOpen = (args: StoryArgs): TemplateResult =>
    Template({ ...args, open: true, size: 'xl' });
XLOpen.decorators = [isOverlayOpen];
