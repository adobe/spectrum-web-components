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

import '../sp-dropdown.js';
import { Dropdown } from '../';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-dropdown',
    title: 'Dropdown',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-dropdown
            @change="${(event: Event): void => {
                const dropdown = event.target as Dropdown;
                action(`Change: ${dropdown.value}`)();
            }}"
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu>
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
        <p>
            This is some text.
        </p>
        <p>
            This is some text.
        </p>
        <p>
            This is a
            <a href="#">link</a>
            .
        </p>
    `;
};

export const Open = (): TemplateResult => {
    return html`
        <style>
            fieldset {
                float: left;
                clear: left;
                display: inline-block;
                margin-bottom: 15px;
            }
        </style>
        <fieldset>
            <sp-dropdown
                label="Open dropdown"
                open
                @change="${(event: Event): void => {
                    const dropdown = event.target as Dropdown;
                    action(`Change: ${dropdown.value}`)();
                }}"
            >
                <span slot="label">
                    Select a Country with a very long label, too long in fact
                </span>
                <sp-menu>
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
        </fieldset>
        <fieldset>
            <sp-dropdown
                label="Dropdown that displays below the options"
                @change="${(event: Event): void => {
                    const dropdown = event.target as Dropdown;
                    action(`Change: ${dropdown.value}`)();
                }}"
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu>
                    <sp-menu-item>
                        Not so many options...
                    </sp-menu-item>
                </sp-menu>
            </sp-dropdown>
        </fieldset>
    `;
};

export const initialValue = (): TemplateResult => {
    return html`
        <sp-dropdown
            @change="${(event: Event): void => {
                const dropdown = event.target as Dropdown;
                action(`Change: ${dropdown.value}`)();
            }}"
            value="item-2"
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu>
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
