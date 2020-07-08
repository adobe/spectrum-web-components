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

import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers';

measureFixtureCreation(html`
    <sp-tabs selected="first">
        <sp-tab label="Tab 1" value="first" tabindex="1"></sp-tab>
        <sp-tab label="Tab 2" value="second" tabindex="2"></sp-tab>
        <sp-tab label="Tab 3" value="third" tabindex="3"></sp-tab>
    </sp-tabs>
`);
