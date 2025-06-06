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
        extends: 'vite.config.ts',
        test: {
            name: 'e2e',
            include: ['src/**/*.e2e.ts'],
            exclude: [], // Don't inherit the exclude from main config
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
