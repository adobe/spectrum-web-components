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

import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-action-group>
        <sp-action-button>Button 1</sp-action-button>
        <sp-action-button>Button 2</sp-action-button>
        <sp-action-button>Button 3</sp-action-button>
    </sp-action-group>
`);
