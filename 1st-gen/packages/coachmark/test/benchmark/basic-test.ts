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

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-coach-indicator id="trigger"></sp-coach-indicator>
    <sp-overlay
        trigger="trigger@hover"
        placement="right"
        .receivesFocus=${'false'}
        open
    >
        <sp-coachmark open primary-cta="Ok">
            <div slot="title">A single coachmark</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    </sp-overlay>
`);
