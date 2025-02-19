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

import path from 'node:path';

/* This plugin adds table markdown support for MDX files */
import remarkGfm from 'remark-gfm';
import fg from 'fast-glob';

import ViteCEM from 'vite-plugin-cem';
// import turbosnap from 'vite-plugin-turbosnap';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { esBuildConfig } from '../tasks/ts-tools.js';

const rootDir = process.cwd();
const esBuildSettings = esBuildConfig(
    fg.sync(
        [
            'packages/**/!(*.d).ts',
            'tools/**/!(*.d).ts',
            // 'test/plugins/**/!(*.d).ts',
            'projects/story-decorator/**/!(*.d).ts',
            // 'test/lit-helpers.ts',
            // 'test/testing-helpers.ts',
            // 'test/testing-helpers-a11y.ts',
            // 'test/visual/test.ts',
        ],
        { cwd: rootDir }
    ),
    {
        env: process.env.NODE_ENV,
        external: ['require', 'fs', 'path'],
    }
);

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
export default {
    rootDir,
    staticDirs: [],
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
    addons: [
        {
            name: '@storybook/addon-controls',
            options: {},
        },
        {
            name: '@storybook/addon-toolbars',
            options: {},
        },
        {
            name: '@storybook/addon-measure',
            options: {},
        },
        {
            name: '@storybook/addon-outline',
            options: {},
        },
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
        {
            name: '@storybook/addon-actions',
            options: {},
        },
        // https://github.com/storybookjs/storybook/tree/next/code/addons/a11y
        '@storybook/addon-a11y',
        // Conditionally add the addon-designs because Figma assets are not publicly available
        // https://storybook.js.org/addons/@storybook/addon-designs/
        ...(process.env.NODE_ENV === 'development'
            ? ['@storybook/addon-designs']
            : []),
        // https://docs.chromatic.com/docs/visual-tests-addon/
        '@chromatic-com/storybook',
    ],
    docs: {
        autodocs: false,
    },
    framework: '@storybook/web-components-vite',
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },
    async viteFinal(config, { configType }) {
        // Merge custom configuration into the default config
        const { mergeConfig } = await import('vite');

        /** @type { import('vite').UserConfig } */
        return mergeConfig(config, {
            publicDir: './assets',
            optimizeDeps: {
                include: [
                    '@storybook/blocks',
                    '@lit-labs/observers',
                    'cem-plugin-better-lit-types',
                    '@mdx-js/react',
                ],
                exclude: [
                    '../node_modules/.cache',
                    'node_modules/.cache',
                    'lit',
                    'lit-html',
                ],
            },
            plugins: [
                nodeResolve({
                    exportConditions: ['browser', configType?.toLowerCase()],
                    moduleDirectories: [
                        'node_modules',
                        'packages',
                        'projects',
                        'tools',
                    ],
                }),
                ViteCEM({
                    config: path.join(
                        rootDir,
                        'custom-elements-manifest.config.js'
                    ),
                }),
                // turbosnap({
                //     rootDir: './',
                // }),
                tsconfigPaths({
                    root: rootDir,
                    loose: true,
                }),
            ],
            build: {
                sourcemap: configType === 'DEVELOPMENT',
                manifest: true,
                minify: configType === 'PRODUCTION',
                commonjsOptions: {
                    requireReturnsDefault: 'preferred',
                    include: [
                        '**/node_modules/react-dom/**/*.js',
                        '**/node_modules/react/**/*.js',
                        '**/node_modules/memoizerific/**/*.js',
                        '**/node_modules/lodash/**/*.js',
                        '**/node_modules/@storybook/blocks/**/*.js',
                    ],
                },
            },
            esbuild: esBuildSettings,
        });
    },
    build: {
        test: {
            disabledAddons: ['@storybook/addon-designs'],
            disableBlocks: true,
            disableAutoDocs: true,
            disableMDXEntries: true,
            disableDocgen: true,
        },
    },
    typescript: {
        // Enables the `react-docgen-typescript` parser.
        // See https://storybook.js.org/docs/api/main-config/main-config-typescript for more information about this option.
        reactDocgen: 'react-docgen',
        check: true,
    },
    features: {
        /* Code splitting flag; load stories on-demand */
        storyStoreV7: true,
        /* Builds stories.json to help with on-demand loading */
        buildStoriesJson: true,
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
