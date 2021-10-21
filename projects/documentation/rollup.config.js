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
import { copy } from '@web/rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import styles from 'rollup-plugin-styles';
import litcss from 'rollup-plugin-lit-css';
import visualizer from 'rollup-plugin-visualizer';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { injectManifest } from 'rollup-plugin-workbox';
import path from 'path';
import { createMpaConfig } from './_building-rollup/createMpaConfig.js';
import posthtml from 'posthtml';
import spectrumMarkdown from './src/utils/posthtml-spectrum-docs-markdown.js';
import Terser from 'terser';
const { postCSSPlugins } = require('../../scripts/css-processing.cjs');
import postCSSPrefixwrap from 'postcss-prefixwrap';
// import fs from 'fs';
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
            "('/sw.js')",
            process.env.SWC_DIR
                ? `('/${process.env.SWC_DIR}/sw.js')`
                : "('/sw.js')"
        )
        .replace('type="module"', 'type="module" async')
        .replace(/ crossorigin="anonymous"/g, '')
        .replace(/rel="preload" href="(?!\/s)/g, 'rel="modulepreload" href="');
};

const processAndReplaceHTML = (source) => {
    return stringReplaceHtml(processHtml(source));
};

module.exports = async () => {
    // const inputCss = fs.readFileSync(
    //     `${process.cwd()}/src/components/styles.css`,
    //     'utf8'
    // );
    // const { css } = await postcss([...postCSSPlugins()]).process(inputCss, {
    //     from: `${process.cwd()}/src/components/`,
    // });
    const optionsHTML = {
        // transform: injectUsedCss(css),
        transform: processAndReplaceHTML,
        minify: {
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
        },
    };

    const mpaConfig = await createMpaConfig({
        outputDir: 'dist',
        legacyBuild: false,
        inputGlob: '_site/**/*.html',
        rootPath: path.resolve('_site'),

        // development mode creates a non-minified build for debugging or development
        developmentMode: false, // process.env.ROLLUP_WATCH === 'true',

        injectServiceWorker: false,
        workbox: false,
        html: optionsHTML,
    });

    mpaConfig.output.sourcemap = true;

    mpaConfig.moduleContext = {
        [require.resolve('focus-visible')]: 'window',
    };
    mpaConfig.plugins.unshift(minifyHTML());
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
    // mpaConfig.plugins.push({
    //     // I used an object for the hook. For now, it contains moduleId and chunkId
    //     // but could receive additional properties in the future
    //     resolveImportMeta(property, { moduleId }) {
    //         // if (property === 'url') {
    //         //     return `import.meta.url`;
    //         // }
    //         return `import.meta.url`;
    //     },
    // });
    // mpaConfig.plugins.push(
    //     replace({
    //         exclude: '*.css',
    //         values: {
    //             'process.env.NODE_ENV': '"production"',
    //         },
    //     })
    // );
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
    return [
        // {
        //     ...configSW,
        //     output: {
        //         file: path.join(process.cwd(), '_site', 'sw.js'),
        //         format: 'es',
        //     },
        // },
        mpaConfig,
    ];
};
