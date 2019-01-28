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

module.exports = function(config) {
    config.set({
        basePath: './src/',
        esModulesMiddleware: {
            paths: {
                '/': path.resolve(path.join(__dirname, 'lib')),
                '/styles': path.resolve(path.join(__dirname, 'styles')),
                '/node_modules': path.resolve(
                    path.join(__dirname, 'node_modules')
                ),
            },
        },
        plugins: ['karma-*', require('@adobe/es-modules-middleware')],
        frameworks: ['mocha', 'chai', 'sinon', 'web-components'],
        middleware: ['es-modules'],
        files: [
            {
                pattern: './**/*.test.html',
                watched: true,
                included: false,
                served: true,
            },
            {
                pattern: './**/*.ts',
                watched: true,
                included: false,
                served: false,
            },
        ],
        // proxy styles and node_modules paths to base so they get picked up by
        // the middleware
        proxies: {
            '/styles/': '/base/styles/',
            '/node_modules/': '/base/node_modules/',
        },
        reporters: ['mocha'],
        browsers: [
            path.resolve(path.join(__dirname, 'scripts/firefox.sh')),
            path.resolve(path.join(__dirname, 'scripts/chrome.sh')),
        ],
    });
};
