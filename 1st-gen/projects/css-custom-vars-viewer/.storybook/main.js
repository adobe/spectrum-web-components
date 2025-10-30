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
import rollupJson from '@rollup/plugin-json';
import { mergeConfigs } from '@web/dev-server';
import { fromRollup } from '@web/dev-server-rollup';

/** @type { import('storybook-builder-wds').StorybookConfigWds } */
const config = {
    stories: ['../dist/stories/*.stories.js'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@web/storybook-framework-web-components',
    },
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
            http2: true,
            watch: true,
            plugins: [json()],
            mimeTypes: {
                '**/*.json': 'js',
            },
        });
    },
    rollupFinal(config) {
        // add a new plugin to the build
        config.plugins.push(rollupJson());
        return config;
    },
};

export default config;
