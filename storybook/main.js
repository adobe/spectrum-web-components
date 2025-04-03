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
import rollupCommonjs from '@rollup/plugin-commonjs';
import fg from 'fast-glob';

const watchSWC = () => ({
    name: 'watch-swc-plugin',
    async serverStart({ fileWatcher }) {
        // register SWC output files to be watched
        const stream = fg.globStream(
            [
                '{packages,projects,tools}/**/*.js',
                '{packages,projects,tools}/**/spectrum-*.css',
            ],
            {
                ignore: ['**/*.map', '**/*.vrt.js', '**/spectrum-config.js'],
                absolute: true,
                cwd: process.cwd(),
                onlyFiles: true,
            }
        );

        for await (const file of stream) {
            // add the file to the file watcher which will
            // trigger a reload when the file changes
            fileWatcher.add(file.toString());
        }
    },
});

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
        // Conditionally add the addon-designs addon temporarily
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
        // https://geometricpanda.github.io/storybook-addon-badges/
        '@geometricpanda/storybook-addon-badges',
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
            mimeTypes: {
                '**/*.json': 'js',
            },
            plugins: [json(), watchSWC()],
            http2: true,
            watch: true,
        });
    },
    rollupFinal(config) {
        // add a new plugin to the build
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
};

if (process.env.NODE_ENV === 'development') {
    config.refs = {
        'design-system': {
            title: 'Spectrum CSS',
            url: 'https://opensource.adobe.com/spectrum-css/preview/',
            expanded: false, // Optional, true by default
        },
    };
}

export default config;
