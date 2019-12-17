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
            coverageIstanbulReporter: {
                thresholds: {
                    global: {
                        statements: 95,
                        branches: 86,
                        functions: 97,
                        lines: 96,
                    },
                },
            },
        })
    );
    return config;
};
