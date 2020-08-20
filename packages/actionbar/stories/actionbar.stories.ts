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

import '../sp-actionbar.js';
import { html } from '@open-wc/demoing-storybook';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/button/sp-action-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
import { EditIcon, MoreIcon } from '@spectrum-web-components/icons-workflow';

export default {
    component: 'sp-actionbar',
    title: 'Actionbar',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-actionbar open>
            <sp-checkbox indeterminate>228 Selected</sp-checkbox>
            <sp-button-group>
                <sp-action-button quiet>
                    <sp-icon size="s" slot="icon">
                        ${EditIcon()}
                    </sp-icon>
                </sp-action-button>
                <sp-action-button quiet>
                    <sp-icon size="s" slot="icon">
                        ${MoreIcon()}
                    </sp-icon>
                </sp-action-button>
            </sp-button-group>
        </sp-actionbar>
    `;
};
