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
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
    viteConfig,
    defineConfig({
        optimizeDeps: {
            exclude: ['playwright', 'playwright-core', '@playwright/test'],
        },
        test: {
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
            setupFiles: ['./utils/test-setup.ts'],
        },
        compilerOptions: {
            types: ['@vitest/browser/providers/playwright'],
        },
    })
);
