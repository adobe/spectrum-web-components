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

import '../../lib';
import '../../../tab/lib';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers';

measureFixtureCreation(html`
    <sp-tab-list selected="first">
        <sp-tab label="Tab 1" value="first" tabindex="1"></sp-tab>
        <sp-tab label="Tab 2" value="second" tabindex="2"></sp-tab>
        <sp-tab label="Tab 3" value="third" tabindex="3"></sp-tab>
    </sp-tab-list>
`);
