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
import rollupJson from '@rollup/plugin-json';
import { mergeConfigs } from '@web/dev-server';
import { fromRollup } from '@web/dev-server-rollup';
import { watchSWC } from '../web-test-runner.utils.js';

/** @type { import('storybook-builder-wds').StorybookConfigWds } */
const config = {
    stories: [
        '../packages/*/stories/*.stories.js',
        '../tools/*/stories/*.stories.js',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        // "@storybook/addon-storysource"
    ],
    framework: {
        name: 'storybook-web-components-wds',
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
            watch: true,
            mimeTypes: {
                '**/*.json': 'js',
            },
            plugins: [json(), watchSWC()],
            http2: true,
            middleware: [
                async (ctx, next) => {
                    await next();
                    if (
                        // Icon packages
                        ctx.url.search('/icons-') > -1 ||
                        // Node modules
                        (ctx.url.search('/node_modules/') > -1 &&
                            ctx.url.search('/@spectrum-web-components') === -1)
                    ) {
                        ctx.set(
                            'Cache-Control',
                            'public, max-age=604800, stale-while-revalidate=86400'
                        );
                    }
                },
            ],
        });
    },
    rollupFinal(config) {
        // add a new plugin to the build
        config.plugins.push(rollupJson());
        return config;
    },
};

export default config;
