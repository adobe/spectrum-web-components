/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { html, TemplateResult } from 'lit-html';

import '../';
import { ActionMenu } from '../';
import '../../menu';
import '../../menu-item';

export { Default } from './';

export default {
    title: 'Action menu',
};

export const knobyActionMenu = (): TemplateResult => {
    const ariaLabel = text('Arial Label', 'More Actions', 'Component');
    const visibleLabel = text('Visible Label', 'More Actions', 'Component');
    const disabled = boolean('Is Disabled', false, 'Component');
    return html`
        <sp-action-menu
            label=${ariaLabel}
            ?disabled=${disabled}
            @change="${(e: Event) => {
                const actionMenu = e.target as ActionMenu;
                action(`Change: ${actionMenu.value}`)();
            }}"
        >
            ${visibleLabel}
            <sp-menu slot="options">
                <sp-menu-item>
                    Deselect
                </sp-menu-item>
                <sp-menu-item>
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item>
                    Feather...
                </sp-menu-item>
                <sp-menu-item>
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled>
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-action-menu>
    `;
};

knobyActionMenu.story = {
    name: 'Customizable Action Menu',
};
