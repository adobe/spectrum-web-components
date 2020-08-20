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
import '@spectrum-web-components/dropdown/sp-dropdown.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers';

measureFixtureCreation(html`
    <sp-dropdown>
        Select a Country with a very long label, too long in fact
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
    </sp-dropdown>
`);
