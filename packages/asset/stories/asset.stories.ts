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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-asset.js';
import { portrait } from '@spectrum-web-components/card/stories/images';

export default {
    title: 'Asset',
    component: 'sp-asset',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-asset style="height: 128px">
            <img src=${portrait} alt="Demo Image" />
        </sp-asset>
    `;
};

export const File = (): TemplateResult => {
    return html`
        <sp-asset variant="file"></sp-asset>
    `;
};

export const Folder = (): TemplateResult => {
    return html`
        <sp-asset variant="folder"></sp-asset>
    `;
};
