/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { html } from 'lit-html';
import '../src/popover';
import '../src/menu';
import '../src/menu-item';
import '../src/menu-group';
import { defineCustomElements } from '../src/define';
import '../src/icon';
import * as MediumIcons from '../src/icons/icons-medium';

defineCustomElements(...Object.values(MediumIcons));

storiesOf('Menu', module)
    .add('Default', () => {
        return html`
            <sp-popover open>
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
                    <sp-menu-item divider></sp-menu-item>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled aria-disabled="true">
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `;
    })
    .add('Headers and Icons', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-popover open>
                <sp-menu>
                    <sp-menu-group>
                        <span
                            class="spectrum-Menu-sectionHeading"
                            id="menu-heading-category-1"
                            aria-hidden="true"
                        >
                            Section Heading
                        </span>
                        <sp-menu-item>
                            Action 1
                        </sp-menu-item>
                        <sp-menu-item>
                            Action 2
                        </sp-menu-item>
                        <sp-menu-item>
                            Action 3
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-item divider></sp-menu-item>
                    <sp-menu-group>
                        <span
                            class="spectrum-Menu-sectionHeading"
                            id="menu-heading-category-1"
                            aria-hidden="true"
                        >
                            Section Heading
                        </span>
                        <sp-menu-item>
                            <sp-icon
                                name="ui:SuccessMedium"
                                size="s"
                                slot="icon"
                            ></sp-icon>
                            Save
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            <sp-icon
                                name="ui:SuccessMedium"
                                size="s"
                                slot="icon"
                            ></sp-icon>
                            Download
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        `;
    })
    .add('Selected', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-popover open style="width: 200px;">
                <sp-menu>
                    <sp-menu-group>
                        <span
                            class="spectrum-Menu-sectionHeading"
                            id="menu-heading-category-1"
                            aria-hidden="true"
                        >
                            San Francisco
                        </span>
                        <sp-menu-item>
                            Financial District
                        </sp-menu-item>
                        <sp-menu-item>
                            South of Market
                        </sp-menu-item>
                        <sp-menu-item>
                            North Beach
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-item divider></sp-menu-item>
                    <sp-menu-group>
                        <span
                            class="spectrum-Menu-sectionHeading"
                            id="menu-heading-category-1"
                            aria-hidden="true"
                        >
                            Oakland
                        </span>
                        <sp-menu-item>
                            City Center
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Jack London Square
                        </sp-menu-item>
                        <sp-menu-item selected>
                            My best friend's mom's house in the burbs just off
                            Silverado street
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        `;
    });
