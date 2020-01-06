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
import { html, action, boolean, select } from '@open-wc/demoing-storybook';

import '../';
import { Dropdown } from '../';
import '../../menu';
import '../../menu-item';
import { TemplateResult } from 'lit-html';

export default {
    component: 'sp-dropdown',
    title: 'Dropdown',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-dropdown
            ?disabled=${boolean('Is Disabled', false, 'Component')}
            ?invalid=${boolean('Is Invalid', false, 'Component')}
            ?quiet=${boolean('Is Quiet', false, 'Component')}
            @change="${(event: Event) => {
                const dropdown = event.target as Dropdown;
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
};

export const initialValue = (): TemplateResult => {
    const values = [
        '',
        'item-1',
        'item-2',
        'item-3',
        'item-4',
        'item-5',
        'item-6',
    ];
    return html`
        <sp-dropdown
            ?disabled=${boolean('Is Disabled', false, 'Component')}
            ?invalid=${boolean('Is Invalid', false, 'Component')}
            ?quiet=${boolean('Is Quiet', false, 'Component')}
            @change="${(event: Event) => {
                const dropdown = event.target as Dropdown;
                action(`Change: ${dropdown.value}`)();
            }}"
            value=${select('Value', values, values[2], 'Component')}
        >
            Select a Country with a very long label, too long in fact
            <sp-menu slot="options" role="listbox">
                <sp-menu-item value="item-1">
                    Deselect
                </sp-menu-item>
                <sp-menu-item value="item-2">
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item value="item-3">
                    Feather...
                </sp-menu-item>
                <sp-menu-item value="item-4">
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item value="item-5">
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled value="item-6">
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-dropdown>
    `;
};
