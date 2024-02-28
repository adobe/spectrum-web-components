/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { minify } from 'html-minifier-terser';
import { copy } from '@web/rollup-plugin-copy';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { createBasicConfig } from '@open-wc/building-rollup';
import { injectManifest } from 'rollup-plugin-workbox';
import path from 'path';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import Terser from 'terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
                        modulepreloads[
                            importPath
                        ] = `<link rel="modulepreload" href="${importPath}">`;
                        for (const importPath of Object.values(chunk.imports)) {
                            modulepreloads[
                                importPath
                            ] = `<link rel="modulepreload" href="/${importPath}">`;
                        }
                        // Leverage when/if `importance` lands.
                        // modulepreloads.push(
                        //     ...Object.values(chunk.dynamicImports).map(
                        //         (importPath) =>
                        //             `<link rel="modulepreload" href="${importPath}" importance="low">`
                        //     )
                        // );
                    });
                    modulepreloads[
                        'font1'
                    ] = `<link rel="preload" href="https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3" as="font" type="font/woff2" crossorigin/>`;
                    modulepreloads[
                        'font2'
                    ] = `<link rel="preload" href="https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3" as="font" type="font/woff2" crossorigin/>`;
                    return html.replace(
                        '</head>',
                        `${[...Object.values(modulepreloads)].join('')}</head>`
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
    mpaConfig.output.assetFileNames = '[hash][extname]';
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
            ],
        })
    );
    return [mpaConfig];
};
