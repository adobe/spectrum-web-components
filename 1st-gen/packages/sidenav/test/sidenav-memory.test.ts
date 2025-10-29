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

import { html } from '@open-wc/testing';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import { testForMemoryLeaks } from '../../../test/testing-helpers.js';

testForMemoryLeaks(html`
    <sp-sidenav>
        <sp-sidenav-heading label="CATEGORY 1">
            <sp-sidenav-item
                value="Section 1"
                label="Section 1"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 2"
                label="Section 2"
            ></sp-sidenav-item>
        </sp-sidenav-heading>
    </sp-sidenav>
`);
