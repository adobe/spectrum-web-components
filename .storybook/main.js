/*!
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

import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import react from '@vitejs/plugin-react-swc';

// Get a list of all the folders in the components directory
const packages = fg
    .sync(
        [
            'packages/*/package.json',
            'tools/*/package.json',
            'projects/*/package.json',
        ],
        {
            cwd: path.resolve(__dirname, '..'),
            absolute: true,
        }
    )
    .map((pkgPath) => {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        return {
            name: pkg.name,
            replacement: path.dirname(pkgPath),
        };
    });

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
module.exports = {
    rootDir: '../',
    staticDirs: ['./assets', './assets/images'],
    stories: [
        {
            directory: '../packages',
            files: '*/stories/*.stories.ts',
            titlePrefix: 'Components',
        },
        {
            directory: '../tools',
            files: '*/stories/*.stories.ts',
            titlePrefix: 'Tools',
        },
        {
            directory: '../projects',
            files: '*/stories/*.stories.ts',
            titlePrefix: 'Projects',
        },
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        // Conditionally add the addon-designs addon temporarily
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
        // https://geometricpanda.github.io/storybook-addon-badges/
        '@geometricpanda/storybook-addon-badges',
    ],
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
        builder: '@storybook/builder-vite',
    },
    async viteFinal(config, { configType }) {
        const { mergeConfig } = await import('vite');

        return mergeConfig(config, {
            // Add dependencies to pre-optimization
            optimizeDeps: {
                include: [
                    '@whitespace/storybook-addon-html',
                    '@storybook/blocks',
                    '@storybook/theming',
                    '@storybook/components',
                ],
            },
            plugins: [react({ tsDecorators: true })],
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                ],
            },
            build: {
                sourcemap: configType === 'DEVELOPMENT',
                manifest: true,
                minify: configType === 'PRODUCTION',
            },
            css: {
                devSourcemap: configType === 'DEVELOPMENT',
            },
            resolve: {
                alias: [
                    ...packages.map(({ name, folder }) => ({
                        find: name,
                        replacement: folder,
                    })),
                ],
            },
        });
    },
    refs:
        process.env.NODE_ENV === 'development'
            ? {
                  'design-system': {
                      title: 'Spectrum CSS',
                      url: 'https://opensource.adobe.com/spectrum-css/preview/',
                      expanded: false, // Optional, true by default
                  },
              }
            : {},
};
