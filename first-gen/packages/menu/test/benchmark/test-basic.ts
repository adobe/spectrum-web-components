/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-menu selects="multiple">
        <sp-menu-group selects="inherit">
            <span slot="header">Section Heading</span>
            <sp-menu-item>Action 1</sp-menu-item>
            <sp-menu-item>Action 2</sp-menu-item>
            <sp-menu-item>Action 3</sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group selects="inherit">
            <span slot="header">Section Heading</span>
            <sp-menu-item>Save</sp-menu-item>
            <sp-menu-item disabled>Download</sp-menu-item>
        </sp-menu-group>
    </sp-menu>
`);
