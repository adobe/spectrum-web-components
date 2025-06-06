/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineWorkspace } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
    typeof __dirname !== 'undefined'
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
    // Unit tests (Node.js environment)
    'vite.config.ts',
    // E2E tests (Browser environment)
    {
        test: {
            name: 'e2e',
            include: ['src/**/*.e2e.ts'],
            browser: {
                enabled: true,
                headless: true,
                provider: 'playwright',
                instances: [{ browser: 'chromium' }],
            },
        },
    },
    // Storybook tests
    {
        extends: 'vite.config.ts',
        plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
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
]);
