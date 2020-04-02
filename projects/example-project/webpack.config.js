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
'use strict';

const { resolve, join } = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ENV = process.argv.find((arg) => arg.includes('NODE_ENV=production'))
    ? 'production'
    : 'development';
const IS_DEV = ENV === 'development';

const IS_DEV_SERVER = process.argv.find((arg) =>
    arg.includes('webpack-dev-server')
);
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('src') : resolve('dist');

/**
 * === Copy static files configuration
 */
const copyStatics = {
    copyOthers: [
        {
            from: 'index.html',
            context: resolve('./src'),
            to: OUTPUT_PATH,
        },
    ],
};

/**
 * Plugin configuration
 */
const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([].concat(copyStatics.copyOthers)),
    new ExtractTextPlugin('[name].bundle.css'),
];

function srcPath(subdir) {
    return join(__dirname, 'src', subdir);
}

const shared = (env) => {
    if (!IS_DEV_SERVER) {
        plugins.push(
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
            })
        );
    }

    let cssLoaders = [
        {
            loader: 'css-loader',
            options: { importLoaders: 1 },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-preset-env')({
                        browsers: 'last 2 versions',
                    }),
                    ...(IS_DEV ? [] : [require('cssnano')()]),
                ],
            },
        },
    ];

    return {
        entry: {
            main: './src/index.js',
        },
        devtool: 'cheap-module-source-map',
        mode: ENV,
        output: {
            path: OUTPUT_PATH,
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: cssLoaders,
                    }),
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json'],
        },
        plugins,
        devServer: {
            contentBase: OUTPUT_PATH,
            compress: true,
            overlay: {
                errors: true,
            },
            port: 3000,
            host: '0.0.0.0',
            disableHostCheck: true,
        },
    };
};

module.exports = (env = {}) => {
    return [shared(env)];
};
