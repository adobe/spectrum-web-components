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
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

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
            esm: {
                nodeResolve: true,
                babelConfig: {
                    plugins: ['transform-node-env-inline'],
                },
                coverageExclude: ['packages/icons-ui/*'],
            },
            browsers: ['FirefoxHeadlessCustom'],
            customLaunchers: {
                FirefoxHeadlessCustom: {
                    base: 'Firefox',
                    flags: ['-headless'],
                    prefs: {
                        'toolkit.telemetry.reportingpolicy.firstRun': false,
                        'extensions.enabledScopes': 0,
                    },
                },
            },
            // our ci uses a 2 core 4 gb ram instance to run tests
            // higher concurrency reduces reliability of browser timeout
            // without a significant effect on testing speed
            concurrency: 1,
            // this timeout is primarily significant during browser startup
            // after browser startup we shouldn't be coming close to this limit
            browserNoActivityTimeout: 30000, // default value from karma
            coverageIstanbulReporter: {
                thresholds: {
                    global: {
                        statements: 97,
                        branches: 91,
                        functions: 97,
                        lines: 97,
                    },
                },
            },
        })
    );
    return config;
};
