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
        basePath: './src',
        plugins: ['karma-*', require('./es-modules-middleware')],
        frameworks: ['mocha', 'chai', 'sinon', 'web-components'],
        beforeMiddleware: ['es-modules'],
        files: [
            {
                pattern: '**/*.test.html',
                watched: false,
                included: false,
                served: true,
            },
            {
                pattern: '**/test/*.js',
                watched: true,
                included: false,
                served: false,
            },
        ],
        reporters: ['mocha'],
        browsers: [
            path.resolve(path.join(__dirname, 'scripts/firefox.sh')),
            path.resolve(path.join(__dirname, 'scripts/chrome.sh')),
        ],
    });
};
