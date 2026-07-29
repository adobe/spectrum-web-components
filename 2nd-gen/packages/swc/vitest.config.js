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
const allowedBrowsers = new Set(['chromium', 'firefox', 'webkit']);
const browserInstances = (process.env.VITEST_BROWSER_INSTANCES ?? 'chromium')
  .split(',')
  .map((browser) => browser.trim().toLowerCase())
  .filter((browser) => allowedBrowsers.has(browser))
  .map((browser) => ({ browser }));
const resolvedBrowserInstances =
  browserInstances.length > 0 ? browserInstances : [{ browser: 'chromium' }];

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      exclude: ['playwright', 'playwright-core', '@playwright/test'],
    },
    test: {
      // Automatic mock hygiene between tests, per Vitest's official AI-authoring
      // guidance — prevents a class of agent-authored regressions where mocks
      // leak across tests in the same file.
      // https://vitest.dev/guide/learn/writing-tests-with-ai.html
      clearMocks: true,
      restoreMocks: true,
      // JUnit reporter for CI test results
      reporters: process.env.CI
        ? ['default', ['junit', { outputFile: './test-results/junit.xml' }]]
        : ['default'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        allowExternal: true,
        reportOnFailure: true,
        include: [
          'components/**/*.{ts,js}',
          '**/packages/core/components/**/*.{ts,js}',
          '**/packages/core/controllers/*.{ts,js}',
          '**/packages/core/element/*.{ts,js}',
          '**/packages/core/mixins/*.{ts,js}',
          '**/packages/core/utils/*.{ts,js}',
        ],
        exclude: [
          '**/*.test.ts',
          '**/*.stories.ts',
          '**/*.vrt.ts',
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
            lines: 98,
            functions: 98,
            statements: 98,
          },

          // Core component logic
          '**/packages/core/components/**/*.{ts,js}': {
            lines: 98,
            functions: 98,
            statements: 98,
          },

          // Shared utilities (lower bar while starting out)
          '**/packages/core/controllers/*.{ts,js}': {
            lines: 70,
            functions: 70,
            statements: 70,
          },
          '**/packages/core/element/*.{ts,js}': {
            lines: 70,
            functions: 70,
            statements: 70,
          },
          '**/packages/core/mixins/*.{ts,js}': {
            lines: 70,
            functions: 70,
            statements: 70,
          },
          '**/packages/core/utils/*.{ts,js}': {
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
              '@adobe/spectrum-wc-core': path.resolve(dirname, '../core'),
              '@adobe/spectrum-wc': path.resolve(dirname, './components'),
              '@adobe/postcss-token': path.resolve(
                dirname,
                '../tools/postcss-token'
              ),
              '@adobe/swc-tokens': path.resolve(dirname, '../tools/swc-tokens'),
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
              instances: resolvedBrowserInstances,
            },
            globals: true,
          },
        },
        // Below is what AI recommended but I noticed all of our tools also use
        // a node environment for their tests. So I wanted to leave this here to
        // modify so all our tools and utils can use a node environment for their tests.
        //
        // Slot for pure-logic Node tests in `@adobe/spectrum-wc-core`
        // (controllers, mixins, utils) that do not need a browser. These are
        // ~100x cheaper to run than the storybook project and are the right
        // home for any test that does not render Lit elements or dispatch DOM
        // events. The `include` glob is intentionally narrow so the project
        // is inert until a `__unit__/` directory exists alongside the source
        // being tested.
        //
        // Run a subset with: `vitest --project core-unit`
        //
        // To activate, drop a test at e.g.
        //   2nd-gen/packages/core/utils/test/__unit__/language-resolution.test.ts
        // and uncomment this block.
        //
        // {
        //   extends: true,
        //   test: {
        //     name: 'core-unit',
        //     environment: 'node',
        //     include: ['../core/**/test/__unit__/*.test.ts'],
        //     browser: { enabled: false },
        //   },
        // },
      ],
    },
    compilerOptions: {
      types: ['@vitest/browser/providers/playwright'],
    },
  })
);
