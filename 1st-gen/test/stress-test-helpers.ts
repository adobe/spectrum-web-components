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

/**
 * Performance budgets for stress testing
 */
export interface StressTestBudgets {
    /** Max average mount time in ms (default: 200) */
    maxAvgMountTimeMs: number;
    /** Max performance degradation % (default: 20) */
    maxDegradationPercent: number;
    /** Max coefficient of variation % (default: 25) */
    maxVarianceCV: number;
}

/**
 * Stress test configuration
 */
export interface StressTestConfig {
    /** Number of components to mount per cycle (default: 1000) */
    componentCount: number;
    /** Interval between cycles in ms (default: 100) */
    intervalMs: number;
    /** Total number of mount/unmount cycles (default: 10) */
    totalCycles: number;
    /** Performance budgets */
    budgets: StressTestBudgets;
}

/**
 * Result of a single cycle
 */
export interface CycleResult {
    cycle: number;
    mountTime: number;
    unmountTime: number;
}

/**
 * Final stress test results
 */
export interface StressTestResult {
    passed: boolean;
    failures: string[];
    cycles: CycleResult[];
    avgMountTime: number;
    avgUnmountTime: number;
    variance: number;
    degradation: number;
    mountRate: number;
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: StressTestConfig = {
    componentCount: 1000,
    intervalMs: 100,
    totalCycles: 10,
    budgets: {
        maxAvgMountTimeMs: 200,
        maxDegradationPercent: 20,
        maxVarianceCV: 25,
    },
};

/**
 * Wait for all LitElement children to complete updates
 */
async function waitForUpdates(
    container: Element,
    selector: string
): Promise<void> {
    const elements = container.querySelectorAll(selector);
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

/**
 * Run a stress test on a component template
 *
 * @param templateFn - Function that generates component template(s)
 * @param selector - CSS selector to find mounted components
 * @param config - Optional configuration overrides
 */
export async function runStressTest(
    templateFn: (index: number) => TemplateResult,
    selector: string,
    config: Partial<StressTestConfig> = {}
): Promise<StressTestResult> {
    const cfg: StressTestConfig = {
        ...DEFAULT_CONFIG,
        ...config,
        budgets: { ...DEFAULT_CONFIG.budgets, ...config.budgets },
    };

    // Create templates
    const templates = Array.from({ length: cfg.componentCount }, (_, i) =>
        templateFn(i)
    );

    // Create container
    const container = document.createElement('div');
    document.body.appendChild(container);

    const results: CycleResult[] = [];

    try {
        for (let cycle = 0; cycle < cfg.totalCycles; cycle++) {
            // Mount
            const mountStart = performance.now();
            render(templates, container);
            await waitForUpdates(container, selector);
            const mountTime = performance.now() - mountStart;

            await new Promise((r) => setTimeout(r, cfg.intervalMs));

            // Unmount
            const unmountStart = performance.now();
            render(html``, container);
            const unmountTime = performance.now() - unmountStart;

            results.push({ cycle: cycle + 1, mountTime, unmountTime });

            if (cycle < cfg.totalCycles - 1) {
                await new Promise((r) => setTimeout(r, cfg.intervalMs));
            }
        }
    } finally {
        container.remove();
    }

    // Calculate metrics
    const avgMountTime =
        results.reduce((s, r) => s + r.mountTime, 0) / results.length;
    const avgUnmountTime =
        results.reduce((s, r) => s + r.unmountTime, 0) / results.length;

    const stdDev = Math.sqrt(
        results.reduce(
            (s, r) => s + Math.pow(r.mountTime - avgMountTime, 2),
            0
        ) / results.length
    );
    const variance = (stdDev / avgMountTime) * 100;

    let degradation = 0;
    if (results.length >= 6) {
        const first3 =
            results.slice(0, 3).reduce((s, r) => s + r.mountTime, 0) / 3;
        const last3 =
            results.slice(-3).reduce((s, r) => s + r.mountTime, 0) / 3;
        degradation = ((last3 - first3) / first3) * 100;
    }

    let totalMountTime = 0;
    for (const r of results) {
        totalMountTime += r.mountTime;
    }
    const mountRate =
        (cfg.componentCount * results.length) / (totalMountTime / 1000);

    // Check against budgets
    const failures: string[] = [];

    if (avgMountTime > cfg.budgets.maxAvgMountTimeMs) {
        failures.push(
            `mount ${avgMountTime.toFixed(0)}ms > ${cfg.budgets.maxAvgMountTimeMs}ms`
        );
    }
    if (degradation > cfg.budgets.maxDegradationPercent) {
        failures.push(
            `degradation ${degradation.toFixed(1)}% > ${cfg.budgets.maxDegradationPercent}%`
        );
    }
    if (variance > cfg.budgets.maxVarianceCV) {
        failures.push(
            `variance CV ${variance.toFixed(1)}% > ${cfg.budgets.maxVarianceCV}%`
        );
    }

    return {
        passed: failures.length === 0,
        failures,
        cycles: results,
        avgMountTime,
        avgUnmountTime,
        variance,
        degradation,
        mountRate,
    };
}

/**
 * Story function with optional storyName
 */
export interface StressTestStory {
    (): TemplateResult;
    storyName?: string;
}

/**
 * Create a Storybook stress test story for a component
 *
 * @param componentName - Display name of the component
 * @param templateFn - Function that generates a single component template
 * @param selector - CSS selector to find mounted components
 * @param config - Optional configuration overrides
 */
export function createStressTestStory(
    componentName: string,
    templateFn: (index: number) => TemplateResult,
    selector: string,
    config: Partial<StressTestConfig> = {}
): StressTestStory {
    const cfg: StressTestConfig = {
        ...DEFAULT_CONFIG,
        ...config,
        budgets: { ...DEFAULT_CONFIG.budgets, ...config.budgets },
    };

    return (): TemplateResult => {
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

            log(`${componentName} Stress Test`, 'info');
            log(
                `  ${cfg.componentCount} components × ${cfg.totalCycles} cycles`
            );
            log(
                `  Budgets: mount < ${cfg.budgets.maxAvgMountTimeMs}ms, degradation < ${cfg.budgets.maxDegradationPercent}%, CV < ${cfg.budgets.maxVarianceCV}%`
            );
            log('---');

            const templates = Array.from(
                { length: cfg.componentCount },
                (_, i) => templateFn(i)
            );

            const results: CycleResult[] = [];

            for (let cycle = 0; cycle < cfg.totalCycles; cycle++) {
                const mountStart = performance.now();
                render(templates, container);
                await waitForUpdates(container, selector);
                const mountTime = performance.now() - mountStart;

                await new Promise((r) => setTimeout(r, cfg.intervalMs));

                const unmountStart = performance.now();
                render(html``, container);
                const unmountTime = performance.now() - unmountStart;

                results.push({ cycle: cycle + 1, mountTime, unmountTime });
                log(
                    `Cycle ${cycle + 1}/${cfg.totalCycles}: ` +
                        `mount=${mountTime.toFixed(0)}ms, unmount=${unmountTime.toFixed(0)}ms`
                );

                if (cycle < cfg.totalCycles - 1) {
                    await new Promise((r) => setTimeout(r, cfg.intervalMs));
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
                const first3 =
                    first3Slice.reduce((s, r) => s + r.mountTime, 0) / 3;
                const last3 =
                    last3Slice.reduce((s, r) => s + r.mountTime, 0) / 3;
                degradation = ((last3 - first3) / first3) * 100;
            }

            let totalMountTime = 0;
            for (const r of results) {
                totalMountTime += r.mountTime;
            }
            const totalComponents = cfg.componentCount * results.length;
            const mountRate = totalComponents / (totalMountTime / 1000);

            // Verdict
            log('---');
            const failures: string[] = [];

            if (avgMount > cfg.budgets.maxAvgMountTimeMs) {
                failures.push(
                    `mount ${avgMount.toFixed(0)}ms > ${cfg.budgets.maxAvgMountTimeMs}ms`
                );
            }
            if (degradation > cfg.budgets.maxDegradationPercent) {
                failures.push(
                    `degradation ${degradation.toFixed(1)}% > ${cfg.budgets.maxDegradationPercent}%`
                );
            }
            if (cv > cfg.budgets.maxVarianceCV) {
                failures.push(
                    `variance CV ${cv.toFixed(1)}% > ${cfg.budgets.maxVarianceCV}%`
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
            const container = wrapper.querySelector(
                '.container'
            ) as HTMLElement;
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
                .note {
                    font-size: 12px;
                    color: #888;
                    margin-top: 12px;
                }
            </style>
            <div class="stress-wrapper">
                <h3>${componentName} - Mount/Unmount Stress Test</h3>
                <button @click=${handleStart}>Run Stress Test</button>
                <div class="log">Click button to start...</div>
                <div class="container"></div>
                <p class="note">
                    For memory leak testing, run:
                    <code>yarn test:focus memory</code>
                </p>
            </div>
        `;
    };
}
