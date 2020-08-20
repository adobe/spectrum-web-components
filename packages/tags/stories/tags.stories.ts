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
import { html, action } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import '../sp-tag.js';
import '../sp-tags.js';
import '@spectrum-web-components/avatar/sp-avatar.js';
import { avatar } from '@spectrum-web-components/avatar/stories/images';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons/sp-icons-medium.js';

export default {
    title: 'Tags',
    component: 'sp-tags',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-icons-medium></sp-icons-medium>
        <sp-tags>
            <sp-tag>Tag 1</sp-tag>
            <sp-tag invalid>Tag 2</sp-tag>
            <sp-tag disabled>Tag 3</sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags>
            <sp-tag>
                Tag 1
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag invalid>
                Tag 2
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag disabled>
                Tag 3
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags>
            <sp-tag>
                Tag 1
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
            <sp-tag invalid>
                Tag 2
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
            <sp-tag disabled>
                Tag 3
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
        </sp-tags>
    `;
};

export const deletable = (): TemplateResult => {
    return html`
        <sp-icons-medium></sp-icons-medium>
        <sp-tags @delete=${action('delete')}>
            <sp-tag deletable>Tag 1</sp-tag>
            <sp-tag invalid deletable>Tag 2</sp-tag>
            <sp-tag disabled deletable>Tag 3</sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags @delete=${action('delete')}>
            <sp-tag deletable>
                Tag 1
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag invalid deletable>
                Tag 2
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag disabled deletable>
                Tag 3
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags @delete=${action('delete')}>
            <sp-tag deletable>
                Tag 1
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
            <sp-tag invalid deletable>
                Tag 2
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
            <sp-tag disabled deletable>
                Tag 3
                <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            </sp-tag>
        </sp-tags>
    `;
};
