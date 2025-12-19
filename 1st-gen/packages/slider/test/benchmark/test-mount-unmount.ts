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

/**
 * Tachometer Mount/Unmount Benchmark for sp-slider
 *
 * This benchmark measures a single mount/unmount cycle of 1000 sliders
 * for use with Tachometer performance comparison.
 *
 * Run with: yarn test:bench -p slider -f mount-unmount
 */

import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { html, LitElement, render } from 'lit';

// Helper to wait for all LitElement updates
async function waitForAllUpdates(container: Element): Promise<void> {
    const elements = container.querySelectorAll('*');
    let updates = [...elements].filter(
        (el) => 'updateComplete' in el
    ) as LitElement[];

    while (updates.length) {
        const results = await Promise.all(
            updates.map((el) => el.updateComplete)
        );
        updates = results.reduce((acc, result, index) => {
            if (!result) {
                acc.push(updates[index]);
            }
            return acc;
        }, [] as LitElement[]);
    }
}

async function runMountUnmountBenchmark(): Promise<void> {
    const componentCount = 1000;
    const templates = Array.from(
        { length: componentCount },
        (_, i) => html`
            <sp-slider
                value="${Math.floor(Math.random() * 100)}"
                step="1"
                min="0"
                max="100"
                label="Slider ${i}"
            ></sp-slider>
        `
    );

    const containerEl = document.createElement('div');
    document.body.appendChild(containerEl);

    const theme = document.createElement('sp-theme');
    theme.setAttribute('system', 'spectrum');
    theme.setAttribute('scale', 'medium');
    theme.setAttribute('color', 'light');
    containerEl.appendChild(theme);

    // Mount phase
    const mountStart = performance.now();
    render(templates, theme);
    await waitForAllUpdates(theme);
    const mountTime = performance.now() - mountStart;

    // Unmount phase
    render(html``, theme);

    // Report mount time to Tachometer
    window.tachometerResult = mountTime;

    // Clean up
    document.body.removeChild(containerEl);
}

runMountUnmountBenchmark();
