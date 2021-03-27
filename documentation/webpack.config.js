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

import path from 'path';
import merge from 'webpack-merge';
import { createDefaultConfig } from '@open-wc/building-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';
import postCSSImport from 'postcss-import';
import postCSSInherit from 'postcss-inherit';
import postCSSPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import postCSSFocusVisible from 'postcss-focus-visible';
import postHTMLSpectrumPlugin from './src/utils/posthtml-spectrum-docs-markdown.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const srcPath = path.resolve(__dirname, '../src');
// const componentDir = path.resolve(__dirname, 'src/components');
const apiDocPath = path.resolve(__dirname, 'api-docs');

// const litComponentDirectories = [
//     componentDir,
//     srcPath,
//     path.dirname('/node_module/prismjs/themes/prism-okaidia.css'),
//     path.dirname('/node_module/prismjs/themes/prism.css'),
// ];

const mainCSS = [path.resolve(__dirname, '/src/main.css')];

const openWcConfig = createDefaultConfig({
    input: path.resolve(__dirname, './index.html'),
    webpackIndexHTMLPlugin: {
        polyfills: {
            webcomponents: true, // Needed until Chromium Edge is released
        },
    },
});

const babelLoader = openWcConfig.module.rules.find(
    (rule) => rule.use.loader === 'babel-loader'
);

export default merge(openWcConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    devServer: {
        historyApiFallback: true,
        stats: 'errors-warnings',
        compress: true,
    },
    stats: {
        optimizationBailout: true,
        maxModules: Infinity,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: mainCSS,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                // Package CSS up so that it can be consumed directly by lit-element
                test: /\.css$/,
                exclude: mainCSS,
                use: [
                    babelLoader.use,
                    './utils/lit-css-typed-loader.cjs',
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                postCSSImport({
                                    root: loader.resourcePath,
                                }),
                                postCSSInherit(),
                                postCSSPresetEnv({
                                    stage: 0,
                                    browsers: [
                                        'last 2 Chrome versions',
                                        'last 2 Firefox versions',
                                        'last 4 Safari versions',
                                        'last 4 iOS versions',
                                    ],
                                }),
                                // minify the css with cssnano presets
                                cssnano({
                                    preset: [
                                        'default',
                                        {
                                            svgo: false,
                                        },
                                    ],
                                }),
                                postCSSFocusVisible(),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: {
                                collapseWhitespace: false,
                                removeComments: true,
                                caseSensitive: true,
                                removeRedundantAttributes: true,
                                removeScriptTypeAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                useShortDoctype: true,
                                minifyCSS: true,
                                minifyJS: true,
                            },
                        },
                    },
                    {
                        loader: 'posthtml-loader',
                        options: {
                            ident: 'posthtml',
                            plugins: [postHTMLSpectrumPlugin],
                        },
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            /* your options here */
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                include: apiDocPath,
                loader: 'raw-loader',
            },
        ],
    },
    plugins: [
        new WebpackBar(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../report/report.html',
            statsFilename: '../report/stats.json',
            generateStatsFile: true,
            statsOptions: {
                chunkModules: true,
                children: false,
                source: false,
            },
        }),
    ],
});
