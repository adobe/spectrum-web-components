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

import { html, TemplateResult } from 'lit-html';

import '../sp-quick-actions.js';
import {
    EditIcon,
    CopyIcon,
    DeleteIcon,
} from '@spectrum-web-components/icons-workflow';
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
                    <sp-icon slot="icon" size="s">
                        ${EditIcon({ hidden: true })}
                    </sp-icon>
                </sp-action-button>
                <sp-action-button quiet label="Copy">
                    <sp-icon slot="icon" size="s">
                        ${CopyIcon({ hidden: true })}
                    </sp-icon>
                </sp-action-button>
                <sp-action-button quiet label="Delete">
                    <sp-icon slot="icon" size="s">
                        ${DeleteIcon({ hidden: true })}
                    </sp-icon>
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
