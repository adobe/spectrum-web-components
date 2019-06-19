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
const merge = require('webpack-merge');
const webpackBaseConfig = require('./utils/webpack-base.config');
const path = require('path');
const webpackConfig = merge(webpackBaseConfig(undefined, /documentation\/.*/), {
    mode: 'development',
    devtool: 'inline-source-map',
});

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
