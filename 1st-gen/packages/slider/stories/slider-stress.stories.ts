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
import { render } from 'lit';
import '@spectrum-web-components/slider/sp-slider.js';

export default {
    title: 'Slider/Stress Tests',
    component: 'sp-slider',
};

// Performance budgets
const BUDGETS = {
    maxAvgMountTimeMs: 200,
    maxDegradationPercent: 20,
    maxVarianceCV: 25,
};

const COMPONENT_COUNT = 1000;
const TOTAL_CYCLES = 10;
const INTERVAL_MS = 100;

interface CycleResult {
    cycle: number;
    mountTime: number;
    unmountTime: number;
}

async function waitForUpdates(container: Element): Promise<void> {
    const elements = container.querySelectorAll('sp-slider');
    if (elements.length === 0) {
        return;
    }
    await Promise.all(
        [...elements].map(
            (el) =>
                (el as HTMLElement & { updateComplete: Promise<boolean> })
                    .updateComplete
        )
    );
}

export const MountUnmountStressTest = (): TemplateResult => {
    let running = false;

    const runTest = async (
        container: HTMLElement,
        logEl: HTMLElement
    ): Promise<void> => {
        if (running) {
            return;
        }
        running = true;
        logEl.innerHTML = '';

        const log = (msg: string, className = ''): void => {
            const line = document.createElement('div');
            line.textContent = msg;
            if (className) {
                line.className = className;
            }
            logEl.appendChild(line);
            logEl.scrollTop = logEl.scrollHeight;
        };

        log('sp-slider Stress Test', 'info');
        log(`  ${COMPONENT_COUNT} components × ${TOTAL_CYCLES} cycles`);
        log(
            `  Budgets: mount < ${BUDGETS.maxAvgMountTimeMs}ms, degradation < ${BUDGETS.maxDegradationPercent}%, CV < ${BUDGETS.maxVarianceCV}%`
        );
        log('---');

        const templates = Array.from(
            { length: COMPONENT_COUNT },
            (_, i) => html`
                <sp-slider
                    value="${Math.floor(Math.random() * 100)}"
                    step="1"
                    min="0"
                    max="100"
                    label="Slider ${i}"
                    style="width: 200px; margin: 2px;"
                ></sp-slider>
            `
        );

        const results: CycleResult[] = [];

        for (let cycle = 0; cycle < TOTAL_CYCLES; cycle++) {
            const mountStart = performance.now();
            render(templates, container);
            await waitForUpdates(container);
            const mountTime = performance.now() - mountStart;

            await new Promise((r) => setTimeout(r, INTERVAL_MS));

            const unmountStart = performance.now();
            render(html``, container);
            const unmountTime = performance.now() - unmountStart;

            results.push({ cycle: cycle + 1, mountTime, unmountTime });
            log(
                `Cycle ${cycle + 1}/${TOTAL_CYCLES}: ` +
                    `mount=${mountTime.toFixed(0)}ms, unmount=${unmountTime.toFixed(0)}ms`
            );

            if (cycle < TOTAL_CYCLES - 1) {
                await new Promise((r) => setTimeout(r, INTERVAL_MS));
            }
        }

        // Calculate metrics
        const avgMount =
            results.reduce((s, r) => s + r.mountTime, 0) / results.length;
        const avgUnmount =
            results.reduce((s, r) => s + r.unmountTime, 0) / results.length;
        const stdDev = Math.sqrt(
            results.reduce(
                (s, r) => s + Math.pow(r.mountTime - avgMount, 2),
                0
            ) / results.length
        );
        const cv = (stdDev / avgMount) * 100;

        let degradation = 0;
        if (results.length >= 6) {
            const first3Slice = results.slice(0, 3);
            const last3Slice = results.slice(-3);
            const first3 = first3Slice.reduce((s, r) => s + r.mountTime, 0) / 3;
            const last3 = last3Slice.reduce((s, r) => s + r.mountTime, 0) / 3;
            degradation = ((last3 - first3) / first3) * 100;
        }

        let totalMountTime = 0;
        for (const r of results) {
            totalMountTime += r.mountTime;
        }
        const mountRate =
            (COMPONENT_COUNT * results.length) / (totalMountTime / 1000);

        // Verdict
        log('---');
        const failures: string[] = [];

        if (avgMount > BUDGETS.maxAvgMountTimeMs) {
            failures.push(
                `mount ${avgMount.toFixed(0)}ms > ${BUDGETS.maxAvgMountTimeMs}ms`
            );
        }
        if (degradation > BUDGETS.maxDegradationPercent) {
            failures.push(
                `degradation ${degradation.toFixed(1)}% > ${BUDGETS.maxDegradationPercent}%`
            );
        }
        if (cv > BUDGETS.maxVarianceCV) {
            failures.push(
                `variance CV ${cv.toFixed(1)}% > ${BUDGETS.maxVarianceCV}%`
            );
        }

        log(
            `Avg mount: ${avgMount.toFixed(0)}ms | Avg unmount: ${avgUnmount.toFixed(0)}ms`
        );
        log(
            `Variance: CV=${cv.toFixed(1)}% | Degradation: ${degradation.toFixed(1)}%`
        );
        log(`Rate: ${mountRate.toFixed(0)} components/sec`);
        log('---');

        if (failures.length === 0) {
            log('✅ ALL CHECKS PASSED', 'pass');
        } else {
            log(`❌ FAILED: ${failures.join(', ')}`, 'fail');
        }

        container.innerHTML = '';
        running = false;
    };

    const handleStart = (event: Event): void => {
        const wrapper = (event.target as HTMLElement).closest(
            '.stress-wrapper'
        );
        if (!wrapper) {
            return;
        }
        const container = wrapper.querySelector('.container') as HTMLElement;
        const logEl = wrapper.querySelector('.log') as HTMLElement;
        const btn = wrapper.querySelector('button') as HTMLButtonElement;
        btn.disabled = true;
        runTest(container, logEl).then(() => {
            btn.disabled = false;
        });
    };

    return html`
        <style>
            .stress-wrapper {
                font-family: system-ui, sans-serif;
            }
            .log {
                font-family: monospace;
                font-size: 12px;
                background: #111;
                color: #fff;
                padding: 12px;
                border-radius: 4px;
                max-height: 350px;
                overflow-y: auto;
                margin: 12px 0;
            }
            .log .info {
                color: #60a5fa;
            }
            .log .pass {
                color: #4ade80;
            }
            .log .fail {
                color: #f87171;
            }
            .container {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                max-height: 300px;
                overflow: auto;
            }
            button {
                padding: 8px 16px;
                font-size: 14px;
                cursor: pointer;
            }
            button:disabled {
                opacity: 0.5;
            }
        </style>
        <div class="stress-wrapper">
            <h3>sp-slider - Mount/Unmount Stress Test</h3>
            <button @click=${handleStart}>Run Stress Test</button>
            <div class="log">Click button to start...</div>
            <div class="container"></div>
        </div>
    `;
};
