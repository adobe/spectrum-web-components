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

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-accordion>
        <sp-accordion-item label="Heading 1">
            <div>Item 1</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 2">
            <div>Item 2</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 3">
            <div>Item 3</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 4">
            <div>Item 4</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 5">
            <div>Item 5</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 6">
            <div>Item 6</div>
        </sp-accordion-item>
    </sp-accordion>
`);
