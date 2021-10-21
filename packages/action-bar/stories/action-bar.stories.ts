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

import { html, TemplateResult } from '@iliad-ui/base';

import '../sp-action-bar.js';
import '@iliad-ui/checkbox/sp-checkbox.js';
import '@iliad-ui/action-button/sp-action-button.js';
import '@iliad-ui/action-group/sp-action-group.js';
import '@iliad-ui/icons-workflow/icons/sp-icon-edit.js';
import '@iliad-ui/icons-workflow/icons/sp-icon-more.js';

export default {
    title: 'Action Bar',
    component: 'sp-action-bar',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-action-bar open>
            <sp-checkbox indeterminate>228 Selected</sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
    `;
};
