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
import remarkGfm from 'remark-gfm';

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
export default {
    stories: [
        {
            directory: '../packages',
            files: '*/stories/*.stories.js',
            titlePrefix: 'Components',
        },
        {
            directory: '../tools',
            files: '*/stories/*.stories.js',
            titlePrefix: 'Tools',
        },
    ],
    addons: [
        // '@storybook/addon-webpack5-compiler-babel',
        '@storybook/addon-links',
        '@storybook/addon-controls',
        '@storybook/addon-toolbars',
        '@storybook/addon-measure',
        '@storybook/addon-viewport',
        '@storybook/addon-outline',
        {
            name: '@storybook/addon-docs',
            options: {
                // Enables JSX support in MDX for projects that aren't configured to handle the format.
                configureJSX: true,
                // Support markdown in MDX files
                transcludeMarkdown: true,
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
        '@storybook/addon-actions',
        // https://github.com/storybookjs/storybook/tree/next/code/addons/a11y
        '@storybook/addon-a11y',
        // https://storybook.js.org/addons/@etchteam/storybook-addon-status
        '@etchteam/storybook-addon-status',
        // https://github.com/storybookjs/storybook/tree/next/code/addons/interactions
        '@storybook/addon-interactions',
        // https://docs.chromatic.com/docs/visual-tests-addon/
        '@chromatic-com/storybook',
        // addon-designs in development mode only
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
    ],
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {
            fsCache: true,
            lazyCompilation: true,
        },
    },
    async webpackFinal(config) {
        return merge(config, {
            resolve: {
                conditionNames: ['development', 'browser'],
                modules: ['node_modules', 'packages', 'projects', 'tools'],
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
