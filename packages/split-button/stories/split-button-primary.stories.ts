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

import { TemplateResult } from '@spectrum-web-components/base';
import { renderSplitButtonSet } from './index.js';
import type { Properties } from './index.js';
import { args, argTypes } from './index.js';

import '../sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Split Button/Primary',
    component: 'sp-split-button',
    args: {
        ...args,
        type: 'field',
        variant: 'primary',
    },
    argTypes,
};

export const field = (props: Properties, options = {}): TemplateResult =>
    renderSplitButtonSet(props, options);

export const more = (props: Properties, options = {}): TemplateResult =>
    renderSplitButtonSet(props, options);
more.args = {
    type: 'more',
};
