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
import '../sp-icons-large.js';
import '../sp-icons-medium.js';
import '@spectrum-web-components/iconset/src/icons-demo.js';
import { html, color } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    title: 'Icons',
};

export const listMedium = (): TemplateResult => html`
    <icons-demo style="color: ${color('Color', '#000', 'Element')}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;

listMedium.story = {
    name: 'UI Icons - Medium',
};

export const listLarge = (): TemplateResult => html`
    <icons-demo style="color: ${color('Color', '#000', 'Element')}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;

listLarge.story = {
    name: 'UI Icons - Large',
};
