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

import '../sp-quick-actions.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/underlay/sp-underlay.js';

export default {
    title: 'Quick Actions',
    component: 'sp-quick-actions',
};

export const iconButtons = (): TemplateResult => {
    return html`
        <div
            style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
        >
            <sp-quick-actions opened>
                <sp-action-button quiet label="Edit">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button quiet label="Copy">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                </sp-action-button>
                <sp-action-button quiet label="Delete">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                </sp-action-button>
            </sp-quick-actions>
        </div>
    `;
};

export const textOnly = (): TemplateResult => {
    return html`
        <div
            style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
        >
            <sp-quick-actions opened text-only>
                <sp-action-button quiet>Edit</sp-action-button>
                <sp-action-button quiet>Copy</sp-action-button>
                <sp-action-button quiet>Delete</sp-action-button>
            </sp-quick-actions>
        </div>
    `;
};
