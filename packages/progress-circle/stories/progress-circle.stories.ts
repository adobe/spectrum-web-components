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

import '../sp-progress-circle.js';

export default {
    title: 'Progress Circle',
    component: 'sp-progress-circle',
};

export const Default = (): TemplateResult => {
    return html`
        <div
            style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle progress="27" size="small"></sp-progress-circle>
            <sp-progress-circle progress="27"></sp-progress-circle>
            <sp-progress-circle progress="27" size="large"></sp-progress-circle>
        </div>
    `;
};

export const overBackground = (): TemplateResult => {
    return html`
        <div
            style="width: 250px; height: 150px; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle
                progress="53"
                over-background
                size="small"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                over-background
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                over-background
                size="large"
            ></sp-progress-circle>
        </div>
    `;
};

overBackground.story = {
    name: 'Over background',
};
