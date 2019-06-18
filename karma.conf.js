/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const path = require('path');

const { postCSSPlugins } = require('./scripts/css-processing');
const transpilePackages = ['lit-html', 'lit-element'];

const webpackConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.css'],
    },
    module: {
        rules: [
            {
                // tweak babel-loader to transpile dependencies
                test: new RegExp(
                    `node_modules(\\/|\\\\)(${transpilePackages.join(
                        '|'
                    )})(.*)\\.js$`
                ),
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry',
                                    corejs: 2,
                                },
                            ],
                        ],
                        babelrc: false,
                    },
                },
            },
            {
                test: /\.ts$/,
                //include: srcPath,
                exclude: /documentation\/.*/,
                loader: 'ts-loader',
            },
            {
                // Package CSS up so that it can be consumed directly by lit-element
                test: /\.css$/,
                exclude: /documentation\/.*/,
                //include: srcPath,
                use: [
                    {
                        loader: path.resolve(
                            __dirname,
                            './.storybook/lit-css-typed-loader'
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
                            plugins: (loader) =>
                                postCSSPlugins(loader.resourcePath),
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = function(config) {
    config.set({
        plugins: ['karma-*'],
        frameworks: ['mocha', 'chai', 'sinon'],
        files: ['./test/test_index.ts'],
        preprocessors: {
            // add webpack as preprocessor
            'test/test_index.ts': ['webpack', 'sourcemap'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false,
            },
        },
        reporters: ['mocha'],
        browsers: [
            path.resolve(path.join(__dirname, 'scripts/firefox.sh')),
            path.resolve(path.join(__dirname, 'scripts/chrome.sh')),
        ],
    });
};
