/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License")
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { playwrightLauncher } from '@web/test-runner-playwright';
import { a11ySnapshotPlugin } from './test/a11y-snapshot-plugin.js';
import { sendKeysPlugin } from './test/send-keys-plugin.js';
import {
    packages,
    vrtGroups,
    configuredVisualRegressionPlugin,
} from './web-test-runner.utils.js';

export default {
    plugins: [
        sendKeysPlugin(),
        a11ySnapshotPlugin(),
        configuredVisualRegressionPlugin(),
    ],
    nodeResolve: true,
    concurrency: 4,
    concurrentBrowsers: 1,
    testsFinishTimeout: 200000,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        exclude: [
            'packages/*/stories/*',
            'packages/icons-ui/**',
            'packages/icons-workflow/**',
            // The following file is no longer used in Chrome where coverage is calculated.
            'packages/shared/src/focus-visible.*',
            'packages/styles/**',
            'test/**',
            'node_modules/**',
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
            timeout: 100000,
        },
    },
    groups: [
        {
            name: 'unit',
            files: 'packages/*/test/*.test.js',
        },
        ...vrtGroups,
        ...packages.reduce((acc, pkg) => {
            const skipPkgs = [
                'bundle',
                'icons-ui',
                'icons-workflow',
                'modal',
                'styles',
            ];
            if (!skipPkgs.includes(pkg)) {
                acc.push({
                    name: pkg,
                    files: `packages/${pkg}/test/*.test.js`,
                });
            }
            return acc;
        }, []),
    ],
    group: 'unit',
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
