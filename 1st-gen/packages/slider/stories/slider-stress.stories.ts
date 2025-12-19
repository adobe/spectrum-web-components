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

import { html } from '@spectrum-web-components/base';
import '@spectrum-web-components/slider/sp-slider.js';
import { createStressTestStory } from '../../../test/stress-test-helpers.js';

export default {
    title: 'Slider/Stress Tests',
    component: 'sp-slider',
};

/**
 * Mount/Unmount Stress Test for sp-slider
 *
 * Tests mounting and unmounting 1000 slider components
 * with performance budget checks.
 */
export const MountUnmountStressTest = createStressTestStory(
    'sp-slider',
    (i) => html`
        <sp-slider
            value="${Math.floor(Math.random() * 100)}"
            step="1"
            min="0"
            max="100"
            label="Slider ${i}"
            style="width: 200px; margin: 2px;"
        ></sp-slider>
    `,
    'sp-slider'
);
