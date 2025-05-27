/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { merge } from 'webpack-merge';

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
export default {
    stories: ['../src/**/*.stories.@(js|ts|mdx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
        '@geometricpanda/storybook-addon-badges',
    ],
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {
            fsCache: true,
            lazyCompilation: true,
        },
    },
    async webpackFinal(config) {
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];
        config.module.rules.push({
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        });
        return merge(config, {
            resolve: {
                conditionNames: ['development', 'browser'],
                modules: ['node_modules', '../src'],
            },
        });
    },
};
