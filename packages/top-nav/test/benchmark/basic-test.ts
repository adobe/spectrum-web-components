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

import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-top-nav>
        <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
        <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
            Page 1
        </sp-top-nav-item>
        <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
        <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
        <sp-top-nav-item href="#page-4">
            Page with Really Long Name
        </sp-top-nav-item>
    </sp-top-nav>
`);
