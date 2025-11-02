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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { makeOverBackground } from '../../button/stories/index.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';

export default {
    title: 'CoachIndicator',
    component: 'sp-coach-indicator',
    decorators: [makeOverBackground()],
};

export const staticWhite = (): TemplateResult => {
    return html`
        <sp-coach-indicator static-color="white"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="white"></sp-coach-indicator>
    `;
};

export const staticBlack = (): TemplateResult => {
    return html`
        <sp-coach-indicator static-color="black"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="black"></sp-coach-indicator>
    `;
};
