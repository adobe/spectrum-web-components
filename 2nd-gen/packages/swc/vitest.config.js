/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
    viteConfig,
    defineConfig({
        optimizeDeps: {
            exclude: ['playwright', 'playwright-core', '@playwright/test'],
        },
        test: {
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                allowExternal: true,
                include: [
                    'components/**/*.{ts,js}',
                    '**/packages/core/components/**/*.{ts,js}',
                    '**/packages/core/shared/**/*.{ts,js}',
                ],
                exclude: [
                    '**/*.test.ts',
                    '**/*.stories.ts',
                    '**/.storybook/**',
                    '**/utils/**',
                    '**/node_modules/**',
                    '**/dist/**',
                    '**/*.d.ts',
                ],
                thresholds: {
                    // Automatically ratchet thresholds upward when coverage improves.
                    // Uses Math.floor to avoid noisy decimal diffs in the config.
                    autoUpdate: (value) => Math.floor(value),

                    // SWC component implementations
                    'components/**/*.{ts,js}': {
                        lines: 100,
                        functions: 100,
                        statements: 100,
                    },

                    // Core component logic
                    '**/packages/core/components/**/*.{ts,js}': {
                        lines: 100,
                        functions: 100,
                        statements: 100,
                    },

                    // Shared utilities (lower bar while starting out)
                    '**/packages/core/shared/**/*.{ts,js}': {
                        lines: 70,
                        functions: 70,
                        statements: 70,
                    },
                },
            },
            projects: [
                {
                    extends: true,
                    plugins: [
                        storybookTest({
                            configDir: path.join(dirname, '.storybook'),
                            storybookScript: 'yarn storybook --no-open',
                        }),
                    ],
                    resolve: {
                        alias: {
                            // Keep the Vite aliases from `vite.config.ts` for Storybook/Vitest.
                            // Without these, imports can resolve to built output and/or be excluded from coverage.
                            '@spectrum-web-components/core': path.resolve(
                                dirname,
                                '../core'
                            ),
                            '@adobe/swc': path.resolve(dirname, './components'),
                            '@adobe/postcss-token': path.resolve(
                                dirname,
                                '../tools/postcss-token'
                            ),
                            '@adobe/swc-tokens': path.resolve(
                                dirname,
                                '../tools/swc-tokens'
                            ),
                            // Prevent Vite from trying to bundle Node.js built-ins
                            crypto: false,
                            fs: false,
                            path: false,
                            os: false,
                            util: false,
                            stream: false,
                            buffer: false,
                            events: false,
                        },
                    },
                    optimizeDeps: {
                        exclude: [
                            'storybook',
                            'playwright',
                            'playwright-core',
                            '@playwright/test',
                            'chromium-bidi',
                        ],
                    },
                    test: {
                        name: 'storybook',
                        browser: {
                            enabled: true,
                            provider: playwright(),
                            headless: true,
                            instances: [{ browser: 'chromium' }],
                        },
                        globals: true,
                        setupFiles: ['./.storybook/vitest.setup.ts'],
                    },
                },
            ],
        },
        compilerOptions: {
            types: ['@vitest/browser/providers/playwright'],
        },
    })
);
