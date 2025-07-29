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

import { expect, fixture, html } from '@open-wc/testing';
import '@spectrum-web-components/slider/sp-slider.js';
import { Slider } from '@spectrum-web-components/slider/src/Slider.js';

describe('Slider - upgrade order', () => {
    it('loads both handles when document imports sp-slider-handle after sp-slider', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider variant="range" step="1" min="0" max="255">
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                ></sp-slider-handle>
            </sp-slider>
        `);

        import('../sp-slider-handle.js');

        const handles = el.shadowRoot.querySelectorAll('.handle');
        expect(handles).to.have.lengthOf(2);
    });
});
