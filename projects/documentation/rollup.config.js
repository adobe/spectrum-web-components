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
import commonjs from '@rollup/plugin-commonjs';
import styles from 'rollup-plugin-styles';
import litcss from 'rollup-plugin-lit-css';
import visualizer from 'rollup-plugin-visualizer';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { createBasicConfig } from '@open-wc/building-rollup';
import { injectManifest } from 'rollup-plugin-workbox';
import path from 'path';
import html from '@web/rollup-plugin-html';
import posthtml from 'posthtml';
import spectrumMarkdown from './src/utils/posthtml-spectrum-docs-markdown.js';
import Terser from 'terser';
const { postCSSPlugins } = require('../../scripts/css-processing.cjs');
import postCSSPrefixwrap from 'postcss-prefixwrap';
import postcss from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';

const injectUsedCss = (css) => {
    return (html) => {
        const initialHTML = processHtml(html);
        const htmlWithCSS = postcss([
            purgecss({
                content: [
                    {
                        extension: 'html',
                        raw: initialHTML,
                    },
                ],
            }),
        ])
            .process(css, {
                from: `${process.cwd()}/src/components/`,
            })
            .then((result) => {
                const processed = initialHTML.replace(
                    '<link rel="stylesheet" href="/styles.css">',
                    `<style>${result.css}</style>`
                );
                return stringReplaceHtml(processed);
            });
        return htmlWithCSS;
    };
};

const processHtml = (source) => {
    return posthtml().use(spectrumMarkdown()).process(source, { sync: true })
        .html;
};

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
    return stringReplaceHtml(processHtml(source));
};

module.exports = async () => {
    const mpaConfig = createBasicConfig({
        // development mode creates a non-minified build for debugging or development
        developmentMode: process.env.ROLLUP_WATCH === 'true',

        // set to true to inject the service worker registration into your index.html
        injectServiceWorker: false,
        workbox: false,
    });

    mpaConfig.output.dir = 'dist';
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
        [require.resolve('focus-visible')]: 'window',
    };
    mpaConfig.plugins.push(minifyHTML());
    mpaConfig.preserveEntrySignatures = false;

    mpaConfig.plugins.push(
        styles({
            mode: 'emit',
            minimize: true,
            plugins: [
                ...postCSSPlugins(),
                postCSSPrefixwrap('.light', {
                    whitelist: ['code-example-light.css'],
                }),
                postCSSPrefixwrap('.dark', {
                    whitelist: ['code-example-dark.css'],
                }),
            ],
        })
    );
    mpaConfig.plugins.push(litcss());
    mpaConfig.plugins.push(
        commonjs({
            exclude: [
                '../../node_modules/focus-visible/**',
                '../../node_modules/prismjs/**',
            ],
        })
    );
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
            mode: 'production',
        })
    );

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
        visualizer({
            brotliSize: true,
            gzipSize: true,
        })
    );
    return [mpaConfig];
};
