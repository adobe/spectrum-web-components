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

import '@spectrum-web-components/tree-view/sp-tree-view.js';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-tree-view>
        <sp-tree-view-item>Item 1</sp-tree-view-item>
        <sp-tree-view-item>
            Item 2
            <sp-tree-view slot="children">
                <sp-tree-view-item>Child Item 1</sp-tree-view-item>
                <sp-tree-view-item>Child Item 2</sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
        <sp-tree-view-item>Item 3</sp-tree-view-item>
    </sp-tree-view>
`);
