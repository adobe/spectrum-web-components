import { createBasicConfig } from '@open-wc/building-rollup';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcssLit from './src/utils/postcss-lit-plugin';
import visualizer from 'rollup-plugin-visualizer';
import deepmerge from 'deepmerge';
const { injectManifest } = require('rollup-plugin-workbox');
const path = require('path');
const { createMpaConfig } = require('./_building-rollup/createMpaConfig.js');
import posthtml from 'posthtml';
import spectrumMarkdown from './src/utils/posthtml-spectrum-docs-markdown';
import load from './src/utils/posthtml-loading';
const Terser = require('terser');

const transform = (inputPath) => {
    const url = inputPath.split('_site/')[1];
    return (html, args) => {
        const preloadModules = [
            {
                regex: /sidenav/,
                options: {
                    method: 'modulepreload',
                    crossorigin: 'anonymous',
                },
            },
            {
                regex: /theme-dark\./,
                options: {
                    method: 'modulepreload',
                    media: 'screen and (prefers-color-scheme: dark)',
                    crossorigin: 'anonymous',
                },
            },
            {
                regex: /theme-light\./,
                options: {
                    method: 'modulepreload',
                    media: 'screen and (prefers-color-scheme: light)',
                    crossorigin: 'anonymous',
                },
            },
            {
                regex: /scale-medium\./,
                options: {
                    method: 'modulepreload',
                    crossorigin: 'anonymous',
                },
            },
        ];
        const bundle = args.bundles.module ? args.bundles.module : args.bundle;
        for (let path in bundle.bundle) {
            const module = bundle.bundle[path];
            if (module.modules) {
                preloadModules.map((preloadModule) => {
                    if (
                        Object.keys(module.modules).find((key) =>
                            preloadModule.regex.test(key)
                        )
                    ) {
                        preloadModule.fileName = module.fileName;
                    }
                });
            }
        }
        return posthtml()
            .use(
                spectrumMarkdown(url),
                ...preloadModules.map((preloadModule) =>
                    load([preloadModule.fileName], preloadModule.options)
                )
            )
            .process(html, { sync: true }).html;
    };
};

const optionsHTML = {
    inputPathBoundTransform: transform,
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

const configSW = deepmerge(
    createBasicConfig({
        legacyBuild: false,
        developmentMode: false,
    }),
    {
        input: path.join(process.cwd(), '_site', 'serviceWorker.js'),
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        ],
    }
);

module.exports = async () => {
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
    mpaConfig.plugins.push(json());
    mpaConfig.plugins.push(postcssLit());
    mpaConfig.plugins.push(
        commonjs({
            exclude: [
                '../../node_modules/focus-visible/**',
                '../../node_modules/prismjs/**',
            ],
        })
    );
    mpaConfig.plugins.push(
        replace({
            exclude: '*.css',
            values: {
                'process.env.NODE_ENV': '"production"',
            },
        })
    );
    mpaConfig.plugins.push(
        injectManifest({
            swSrc: path.join(process.cwd(), '_site', 'sw.js'),
            swDest: path.join(process.cwd(), 'dist', 'sw.js'),
            globDirectory: path.join(process.cwd(), 'dist'),
            globPatterns: ['**/*.{html,js,css,png,svg,ico,webmanifest}'],
            globIgnores: ['*nomodule*'],
            additionalManifestEntries: [
                {
                    url: 'index.html?homescreen',
                    revision: '3',
                },
            ],
        })
    );

    // mpaConfig.plugins.push(
    //     copy({
    //         targets: [
    //             { src: '_site-dev/styles.css', dest },
    //             { src: '_site-dev/demoing/demo/custom-elements.json', dest },
    //             { src: '_site-dev/manifest.json', dest },
    //             { src: '_site-dev/**/*.{png,gif}', dest },
    //         ],
    //         flatten: false,
    //     }),
    // );

    mpaConfig.plugins.push(
        visualizer({
            brotliSize: true,
            gzipSize: true,
        })
    );

    return [
        {
            ...configSW,
            output: {
                file: path.join(process.cwd(), '_site', 'sw.js'),
                format: 'es',
            },
        },
        mpaConfig,
    ];
};
