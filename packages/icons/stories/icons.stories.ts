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
import '@spectrum-web-components/icons/sp-icons-large.js';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '../../iconset/stories/icons-demo.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    title: 'Icons',
    argTypes: {
        color: { control: 'color' },
    },
    args: {
        color: '#000000',
    },
};

interface Properties {
    color: string;
}

export const listMedium = ({ color }: Properties): TemplateResult => html`
    <icons-demo style="color: ${color}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;

listMedium.storyName = 'UI Icons - Medium';

export const listLarge = ({ color }: Properties): TemplateResult => html`
    <icons-demo style="color: ${color}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;

listLarge.storyName = 'UI Icons - Large';
