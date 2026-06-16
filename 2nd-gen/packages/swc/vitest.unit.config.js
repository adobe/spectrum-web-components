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

/**
 * Standalone Vitest config for Storybook helper unit tests.
 *
 * Kept separate from `vitest.config.js` so `swc-unit` does not pull in the
 * Storybook/Chromatic preset chain used by the `storybook` project.
 */

import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        '@spectrum-web-components/core': path.resolve(dirname, '../core'),
        '@adobe/spectrum-wc': path.resolve(dirname, './components'),
        '@adobe/postcss-token': path.resolve(dirname, '../tools/postcss-token'),
        '@adobe/swc-tokens': path.resolve(dirname, '../tools/swc-tokens'),
      },
    },
    test: {
      name: 'swc-unit',
      include: ['.storybook/helpers/test/**/*.unit.test.ts'],
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [{ browser: 'chromium' }],
      },
      globals: true,
    },
  })
);
