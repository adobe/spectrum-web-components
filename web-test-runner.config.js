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
const { playwrightLauncher } = require('@web/test-runner-playwright');

module.exports = {
    files: ['packages/*/test/*.test.js'],
    nodeResolve: true,
    concurrency: 4,
    concurrentBrowsers: 1,
    testsFinishTimeout: 45000,
    coverage: true,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        exclude: [
            'packages/*/stories/*',
            'packages/icons-ui/**',
            'packages/icons-workflow/**',
            'test/**',
        ],
        threshold: {
            statements: 98,
            branches: 93,
            functions: 94,
            lines: 98,
        },
    },
    testFramework: {
        config: {
            timeout: 10000,
        },
    },
    browsers: [
        playwrightLauncher({ product: 'chromium' }),
        playwrightLauncher({ product: 'webkit' }),
        playwrightLauncher({
            product: 'firefox',
            launchOptions: {
                headless: false,
                args: ['-headless'],
                firefoxUserPrefs: {
                    'toolkit.telemetry.reportingpolicy.firstRun': false,
                    'browser.shell.checkDefaultBrowser': false,
                    'browser.bookmarks.restore_default_bookmarks': false,
                    'dom.disable_open_during_load': false,
                    'dom.max_script_run_time': 0,
                    'dom.min_background_timeout_value': 10,
                    'extensions.autoDisableScopes': 0,
                    'extensions.enabledScopes': 15,
                },
            },
        }),
    ],
};
