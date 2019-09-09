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
import { storiesOf } from '@storybook/polymer';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { html } from 'lit-html';

import '../lib';
import { Dropdown } from '../lib';
import '../../menu';
import '../../menu-item';

storiesOf('Dropdown', module).add('Default', () => {
    return html`
        <sp-dropdown
            ?disabled=${boolean('Is Disabled', false, 'Component')}
            ?invalid=${boolean('Is Invalid', false, 'Component')}
            ?quiet=${boolean('Is Quiet', false, 'Component')}
            @change="${(e: Event) => {
                const dropdown = e.target as Dropdown;
                action(`Change: ${dropdown.value}`)();
            }}"
        >
            Select a Country with a very long label, too long in fact
            <sp-menu slot="options" role="listbox">
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
        </sp-dropdown>
    `;
});
