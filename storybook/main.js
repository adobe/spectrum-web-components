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

import path from 'node:path';

import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import { getPackagePath } from '../tasks/css-tools.js';

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
export default {
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
    ],
    rootDir: '../',
    addons: [
        {
            name: 'storybook-addon-swc',
            options: {
                enable: true,
                enableSwcLoader: true,
                enableSwcMinify: true,
                swcLoaderOptions: {
                    jsc: {
                        experimental: {
                            plugins: [],
                        },
                        parser: {
                            syntax: 'typescript',
                            decorators: true,
                        },
                        transform: {
                            legacyDecorator: true,
                            decoratorMetadata: true,
                        },
                    },
                },
                swcMinifyOptions: {},
            },
        },
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        // https://github.com/storybookjs/storybook/tree/next/code/addons/interactions
        '@storybook/addon-interactions',
        // https://github.com/storybookjs/storybook/tree/next/code/addons/a11y
        '@storybook/addon-a11y',
        // https://docs.chromatic.com/docs/visual-tests-addon/
        '@chromatic-com/storybook',
        // Conditionally add the addon-designs addon temporarily
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
        // https://storybook.js.org/addons/@etchteam/storybook-addon-status
        '@etchteam/storybook-addon-status',
    ],
    framework: '@storybook/web-components-vite',
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        // check: true,
        // checkOptions: {
        //     tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        //     checkUnreachableCode: true,
        // },
    },
    features: {
        developmentModeForBuild: true,
    },
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },
    async viteFinal(config, { configType }) {
        return mergeConfig(config, {
            resolve: {
                conditionNames: ['browser', 'development'],
                modules: ['node_modules', 'packages', 'projects', 'tools'],
            },
            build: {
                sourcemap: configType === 'DEVELOPMENT',
                manifest: true,
                minify: configType === 'PRODUCTION',
            },
            css: {
                transformer: 'lightningcss',
                lightningcss: {
                    minify: true,
                    errorRecovery: true,
                    resolver: {
                        // read(filePath) {
                        //     const file = fs.readFileSync(filePath, 'utf8');
                        //     return file;
                        // },
                        resolve(specifier, from) {
                            console.log({ specifier, from });
                            if (specifier.startsWith('./')) {
                                return path.resolve(from, '..', specifier);
                            } else {
                                return getPackagePath(specifier);
                            }
                        },
                    },
                },
            },
            watch: true,
            target: ['web', 'es5'],
            plugins: [
                viteTsConfigPaths({
                    root: '../',
                }),
            ],
        });
    },
    refs: process.env.NODE_ENV === 'development' && {
        'design-system': {
            title: 'Spectrum CSS',
            url: 'https://opensource.adobe.com/spectrum-css/preview/',
            expanded: false, // Optional, true by default
        },
    },
};
