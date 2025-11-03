/*
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
import { copy } from '@web/rollup-plugin-copy';
import { createBasicConfig } from '@open-wc/building-rollup';
import { injectManifest } from 'rollup-plugin-workbox';
import { minify } from 'html-minifier-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import path from 'path';
import Terser from 'terser';

const stringReplaceHtml = (source) => {
    return source
        .replace(
            /src="\//g,
            process.env.SWC_DIR ? `src="/${process.env.SWC_DIR}/` : 'src="/'
        )
        .replace(
            /href="\//g,
            process.env.SWC_DIR ? `href="/${process.env.SWC_DIR}/` : 'href="/'
        )
        .replace(
            '("/sw.js")',
            process.env.SWC_DIR
                ? `("/${process.env.SWC_DIR}/sw.js", {scope: "/${process.env.SWC_DIR}/"})`
                : '("/sw.js")'
        )
        .replace('type="module"', 'type="module" async')
        .replace(/ crossorigin="anonymous"/g, '');
};

const processAndReplaceHTML = (source) => {
    return stringReplaceHtml(source);
};

export default async () => {
    const mpaConfig = createBasicConfig({
        // development mode creates a non-minified build for debugging or development
        developmentMode: process.env.ROLLUP_WATCH === 'true',

        // set to true to inject the service worker registration into your index.html
        injectServiceWorker: false,
        workbox: false,
        nodeResolve: false,
    });

    mpaConfig.output.dir = 'dist';

    const mode =
        process.env.ROLLUP_WATCH !== 'true' ? 'production' : 'development';
    mpaConfig.plugins.unshift(
        nodeResolve({
            exportConditions: ['browser', 'import', mode],
        })
    );
    mpaConfig.plugins.push(
        html({
            transformHtml: [
                (html) =>
                    minify(html, {
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        removeComments: true,
                        caseSensitive: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true,
                        minifyCSS: true,
                        /** @param {string} code */
                        minifyJS: (code) => Terser.minify(code).code,
                    }),
                (html, { bundle: { entrypoints } }) => {
                    if (html.search('rel="modulepreload"') > -1) {
                        return html;
                    }
                    const modulepreloads = {};
                    entrypoints.forEach(({ importPath, chunk }) => {
                        modulepreloads[importPath] =
                            `<link rel="modulepreload" href="${importPath}">`;
                        for (const importPath of Object.values(chunk.imports)) {
                            const prefixedPath = process.env.SWC_DIR
                                ? `/${process.env.SWC_DIR}/${importPath}`
                                : `/${importPath}`;
                            modulepreloads[importPath] =
                                `<link rel="modulepreload" href="${prefixedPath}">`;
                        }
                        // Leverage when/if `importance` lands.
                        // modulepreloads.push(
                        //     ...Object.values(chunk.dynamicImports).map(
                        //         (importPath) =>
                        //             `<link rel="modulepreload" href="${importPath}" importance="low">`
                        //     )
                        // );
                    });
                    const fontPrefix = process.env.SWC_DIR
                        ? `/${process.env.SWC_DIR}`
                        : '';
                    modulepreloads['font1'] =
                        `<link rel="preload" href="${fontPrefix}/typekit/adobe-clean-normal-400.woff2" as="font" type="font/woff2" crossorigin/>`;
                    modulepreloads['font2'] =
                        `<link rel="preload" href="${fontPrefix}/typekit/adobe-clean-normal-700.woff2" as="font" type="font/woff2" crossorigin/>`;
                    const cssPreloadHref = process.env.SWC_DIR
                        ? `/${process.env.SWC_DIR}/styles.css`
                        : '/styles.css';
                    return html.replace(
                        `<link rel="preload" href="${cssPreloadHref}" as="style">`,
                        `<link rel="preload" href="${cssPreloadHref}" as="style">${[
                            ...Object.values(modulepreloads),
                        ].join('')}`
                    );
                },
                processAndReplaceHTML,
            ],
            rootDir: path.resolve('_site'),
            input: ['**/*.html'],
            flattenOutput: false,
            // minify: true,
            absoluteSocialMediaUrls: false,
            extractAssets: false,
        })
    );
    mpaConfig.output.assetFileNames = 'swc.[hash].[ext]';
    mpaConfig.output.chunkFileNames = 'swc.[hash].js';
    mpaConfig.output.entryFileNames = 'swc.[hash].js';
    mpaConfig.output.sourcemapFileNames = 'swc.[hash].js.map';
    mpaConfig.output.sourcemap = true;

    mpaConfig.moduleContext = {
        ['focus-visible']: 'window',
    };
    const {
        default: { default: minifyHTML },
    } = await import('rollup-plugin-minify-html-literals');
    mpaConfig.plugins.push(minifyHTML());
    mpaConfig.preserveEntrySignatures = false;

    mpaConfig.plugins.push(
        json(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify(mode),
        }),
        commonjs({
            exclude: [
                '../../node_modules/focus-visible/**',
                '../../node_modules/prismjs/**',
            ],
        })
    );
    if (process.env.ROLLUP_WATCH !== 'true') {
        mpaConfig.plugins.push(
            injectManifest({
                swSrc: path.join(process.cwd(), '_site', 'serviceWorker.js'),
                swDest: path.join(process.cwd(), 'dist', 'sw.js'),
                globDirectory: path.join(process.cwd(), 'dist'),
                globPatterns: ['**/*.{html,js,css,png,svg,ico,webmanifest}'],
                globIgnores: [
                    '*nomodule*',
                    // 'components/*/index.html',
                    'components/*/api/index.html',
                    'components/*/content/index.html',
                    'components/*/api-content/index.html',
                    'storybook/**/*',
                    'src/components/*.css',
                ],
                additionalManifestEntries: [
                    {
                        url: 'index.html?homescreen',
                        revision: '4',
                    },
                    {
                        url: 'searchIndex.json',
                        revision: `${Date.now()}`,
                    },
                ],
            })
        );
    }

    mpaConfig.plugins.push(
        copy({
            patterns: 'favicon.*',
            rootDir: './content',
        })
    );

    mpaConfig.plugins.push(
        copy({
            patterns: ['images/**/*', 'manifest.webmanifest'],
            rootDir: './_site',
        })
    );

    mpaConfig.plugins.push(
        copy({
            patterns: ['**/*.css'],
            rootDir: './_site',
        })
    );

    mpaConfig.plugins.push(
        copy({
            patterns: ['typekit/*.woff2'],
            rootDir: './_site',
        })
    );

    const {
        default: { default: visualizer },
    } = await import('rollup-plugin-visualizer');

    mpaConfig.plugins.push(
        visualizer({
            brotliSize: true,
            gzipSize: true,
        })
    );

    // Use the `@swc-packages-internal` alias to make SWC internal
    // files/assets available in the docs site build
    mpaConfig.plugins.push(
        alias({
            entries: [
                {
                    find: '@swc-packages-internal',
                    replacement: '../../packages/',
                },
                {
                    find: /^@spectrum-web-components\/core\/(.*)$/,
                    replacement: path.resolve(
                        '../../../2nd-gen/packages/core/dist/$1'
                    ),
                },
            ],
        })
    );
    return [mpaConfig];
};
