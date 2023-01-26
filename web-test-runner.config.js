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
import {
    a11ySnapshotPlugin,
    sendKeysPlugin,
} from '@web/test-runner-commands/plugins';
import { sendMousePlugin } from './test/plugins/send-mouse-plugin.js';
import {
    chromium,
    configuredVisualRegressionPlugin,
    firefox,
    packages,
    vrtGroups,
    webkit,
} from './web-test-runner.utils.js';
import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import rollupCommonjs from '@rollup/plugin-commonjs';

const commonjs = fromRollup(rollupCommonjs);
const json = fromRollup(rollupJson);

export default {
    plugins: [
        commonjs({
            include: ['**/node_modules/@formatjs/intl-numberformat/**/*.js'],
        }),
        sendKeysPlugin(),
        sendMousePlugin(),
        a11ySnapshotPlugin(),
        configuredVisualRegressionPlugin(),
        json({}),
    ],
    mimeTypes: {
        '**/*.json': 'js',
    },
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },
    http2: true,
    protocol: 'https:',
    concurrency: 4,
    concurrentBrowsers: 1,
    testsFinishTimeout: 60000,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        exclude: [
            'packages/*/stories/*',
            'packages/icons-ui/**',
            'packages/icons-workflow/**',
            // The following file is no longer used in Chrome where coverage is calculated.
            'test/**',
            '**/test/**',
            'tools/*/stories/*',
            'tools/shared/src/focus-visible.*',
            'tools/styles/**',
            '**/node_modules/**',
        ],
        threshold: {
            statements: 98.5,
            branches: 95.78,
            functions: 97.8,
            lines: 98.5,
        },
    },
    testFramework: {
        config: {
            timeout: 3000,
            retries: 1,
        },
    },
    groups: [
        {
            name: 'unit',
            files: ['packages/*/test/*.test.js', 'tools/*/test/*.test.js'],
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
                    files: `{packages,tools}/${pkg}/test/*.test.js`,
                });
            }
            return acc;
        }, []),
    ],
    group: 'unit',
    browsers: [chromium, firefox, webkit],
};
