/**!
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import rollupJson from '@rollup/plugin-json';
import { mergeConfigs } from '@web/dev-server';
import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import { watchSWC } from '../web-test-runner.utils.js';

const isDevelopment = process.env.NODE_ENV === 'development';

/** @type { import('@web/storybook-framework-web-components').StorybookConfig } */
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
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        // Conditionally add the addon-designs addon temporarily
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(isDevelopment ? ['@storybook/addon-designs'] : []),
        '@geometricpanda/storybook-addon-badges',
        '@chromatic-com/storybook',
    ],

    framework: {
        name: '@web/storybook-framework-web-components',
        options: {
            builder: {},
        },
    },

    core: {
        // Disabled callback due to Adobe privacy policy
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },

    // Optionally add Storybook-specific configuration for @web/dev-server
    wdsFinal(config) {
        const json = fromRollup(rollupJson);
        return mergeConfigs(config, {
            nodeResolve: {
                exportConditions: ['browser', 'development'],
                moduleDirectories: [
                    'node_modules',
                    'packages',
                    'projects',
                    'tools',
                ],
            },
            clearTerminalOnReload: false,
            mimeTypes: {
                '**/*.json': 'js',
            },
            plugins: [json(), watchSWC()],
            http2: true,
            watch: true,
        });
    },

    // Optionally add extra configuration for the static build
    async rollupFinal(config) {
        // add JSON plugin to the build
        config.plugins.push(rollupJson());
        config.plugins.push(
            rollupCommonjs({
                requireReturnsDefault: 'preferred',
                include: [
                    '**/node_modules/react-dom/**/*.js',
                    '**/node_modules/react/**/*.js',
                    '**/node_modules/memoizerific/**/*.js',
                    '**/node_modules/lodash/**/*.js',
                    '**/node_modules/@storybook/blocks/**/*.js',
                ],
            })
        );
        return config;
    },

    refs: {
        'design-system': {
            title: 'Spectrum CSS',
            url: 'https://opensource.adobe.com/spectrum-css/',
        },
    },

    docs: {
        autodocs: true,
    },
};
