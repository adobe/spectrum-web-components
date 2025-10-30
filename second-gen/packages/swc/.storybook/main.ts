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
import type { StorybookConfig } from '@storybook/web-components-vite';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config: StorybookConfig = {
    stories: [
        {
            directory: 'guides',
            files: '*.@(md|mdx)',
            titlePrefix: 'Guides',
        },
        {
            directory: '../components',
            files: '*/stories/*.stories.ts',
            titlePrefix: 'Components',
        },
    ],
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
        '@storybook/addon-vitest',
    ],
    viteFinal: async (config) => {
        config.resolve = config.resolve ?? {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@swc/core': resolve(__dirname, '../../core'),
        };

        return config;
    },
    typescript: {
        check: true,
    },
};

export default config;
