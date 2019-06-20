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
const { postCSSPlugins } = require('../scripts/css-processing');
const transpilePackages = ['lit-html', 'lit-element'];

module.exports = function(includeRegex, excludeRegex) {
    return {
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
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                            ],
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
                    include: includeRegex,
                    exclude: excludeRegex,
                    loader: 'ts-loader',
                },
                {
                    // Package CSS up so that it can be consumed directly by lit-element
                    test: /\.css$/,
                    include: includeRegex,
                    exclude: excludeRegex,
                    use: [
                        {
                            loader: path.resolve(
                                __dirname,
                                'lit-css-typed-loader'
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
};
