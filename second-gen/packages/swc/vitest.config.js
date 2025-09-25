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
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    optimizeDeps: {
        exclude: [
            'playwright',
            'playwright-core',
            '@playwright/test',
            'storybook',
            '@storybook/addon-vitest',
            'fs',
            'crypto',
        ],
    },
    test: {
        // Default test configuration
        browser: {
            enabled: true,
            provider: 'playwright',
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
        include: ['components/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: [
                'components/**/*.ts',
                '../core/components/**/*.ts',
                '../core/shared/**/*.ts',
            ],
            exclude: [
                '**/*.test.ts',
                '**/*.stories.ts',
                '**/node_modules/**',
                '**/dist/**',
                '**/*.d.ts',
            ],
        },
        globals: true,
        // Add projects for Storybook addon
        projects: [
            // Regular tests
            {
                name: 'default',
                test: {
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                    },
                    include: ['components/**/*.test.ts'],
                    globals: true,
                },
            },
            // Storybook tests (required for addon)
            {
                extends: 'vite.config.ts',
                plugins: [
                    // The plugin will run tests for the stories defined in our Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest(),
                ],
                define: {
                    global: 'globalThis',
                    process: {
                        env: {},
                    },
                },
                optimizeDeps: {
                    exclude: [
                        'playwright',
                        'playwright-core',
                        '@playwright/test',
                        'storybook',
                        '@storybook/addon-vitest',
                        'fs',
                        'crypto',
                        'path',
                        'os',
                    ],
                },
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    setupFiles: ['.storybook/vitest.setup.ts'],
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@swc/core': '../core',
            '@swc/components': '.',
        },
    },
});
