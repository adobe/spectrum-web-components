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
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');
const path = require('path');

module.exports = (config) => {
    config.set(
        merge(createDefaultConfig(config), {
            files: [
                {
                    pattern: config.grep
                        ? config.grep
                        : 'packages/*/test/**/*.test.js',
                    type: 'module',
                },
            ],
            reporters: ['junit'],

            esm: {
                nodeResolve: true,
            },
            browsers: [
                path.resolve(path.join(__dirname, 'scripts/firefox.sh')),
                path.resolve(path.join(__dirname, 'scripts/chrome.sh')),
            ],
            junitReporter: {
                outputDir: process.env.JUNIT_REPORT_PATH,
                outputFile: process.env.JUNIT_REPORT_NAME,
                useBrowserName: false,
            },
            coverageIstanbulReporter: {
                thresholds: {
                    global: {
                        statements: 86,
                        branches: 68,
                        functions: 90,
                        lines: 86,
                    },
                },
            },
        })
    );
    return config;
};
