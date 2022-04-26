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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-tree-view.js';
import '../sp-tree-view-item.js';

export default {
    component: 'sp-tree-view',
    title: 'Tree View/Sizes',
};

const template = ({
    size,
}: {
    size: 's' | 'm' | 'l' | 'xl';
}): TemplateResult => {
    return html`
        <sp-tree-view size=${size} selects="single" style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const s = (): TemplateResult => template({ size: 's' });

export const m = (): TemplateResult => template({ size: 'm' });

export const l = (): TemplateResult => template({ size: 'l' });

export const XL = (): TemplateResult => template({ size: 'xl' });
