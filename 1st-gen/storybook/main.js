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

import { merge } from 'webpack-merge';
import { resolve } from 'path';

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
export default {
    stories: [
        '../packages/*/stories/*.stories.js',
        '../tools/*/stories/*.stories.js',
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
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {
            // builder: '@web/storybook-builder',
            fsCache: true,
            lazyCompilation: true,
        },
    },
    async webpackFinal(config) {
        return merge(config, {
            resolve: {
                conditionNames: ['development', 'browser'],
                modules: [
                    'node_modules',
                    'packages',
                    'projects',
                    'tools',
                    '../2nd-gen/packages',
                ],
                alias: {
                    '@spectrum-web-components/core': resolve(
                        '../2nd-gen/packages/core/dist'
                    ),
                    '@adobe/swc': resolve('../2nd-gen/packages/swc/dist'),
                },
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
