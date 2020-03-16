/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');
const merge = require('webpack-merge');
const { createDefaultConfig } = require('@open-wc/building-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');

const srcPath = path.resolve(__dirname, '../src');
const componentDir = path.resolve(__dirname, 'src/components');
const apiDocPath = path.resolve(__dirname, 'api-docs');

const litComponentDirectories = [
    componentDir,
    srcPath,
    path.dirname(require.resolve('prismjs/themes/prism-okaidia.css')),
];

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

module.exports = merge(openWcConfig, {
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
                exclude: litComponentDirectories,
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
                include: litComponentDirectories,
                use: [
                    babelLoader.use,
                    {
                        loader: path.resolve(
                            __dirname,
                            '../utils/lit-css-typed-loader'
                        ),
                    },
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
                                require('postcss-import')({
                                    root: loader.resourcePath,
                                }),
                                require('postcss-inherit')(),
                                require('postcss-preset-env')({
                                    stage: 0,
                                }),
                                // minify the css with cssnano presets
                                require('cssnano')({
                                    preset: [
                                        'default',
                                        {
                                            svgo: false,
                                        },
                                    ],
                                }),
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
                    },
                    {
                        loader: 'posthtml-loader',
                        options: {
                            ident: 'posthtml',
                            plugins: [
                                require('./src/utils/posthtml-spectrum-docs-markdown'),
                            ],
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
